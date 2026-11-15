export const HIDDEN_TEXT = "No data returned. Access may be blocked, denied, or intentionally hidden."
export const LIST_PREVIEW_COUNT = 2
export const PROBE_POPUP_THEME_VAR_NAMES = [
    "--probe-popup-backdrop",
    "--probe-popup-surface",
    "--probe-popup-border",
    "--probe-popup-shadow",
    "--probe-popup-text",
    "--probe-popup-text-soft",
    "--probe-popup-query-bg",
    "--probe-popup-query-border",
    "--probe-popup-go-bg",
    "--probe-popup-go-text",
    "--probe-popup-cancel-bg",
    "--probe-popup-cancel-text",
    "--probe-accent",
]

export const PROBE_WHAT = {
    secure_context: "Whether the page runs in a trusted browser mode that unlocks restricted web capabilities.",
    user_agent: "The legacy browser identification string sent for compatibility with old sites and servers.",
    ua_ch_basic: "A structured browser identity summary with brand, platform, and mobile hints.",
    ua_ch_entropy: "A richer set of client hints that may expose architecture, bitness, model, and exact version info.",
    languages: "Your preferred language list as reported by the browser.",
    timezone: "The named region your system clock is configured to use.",
    local_time: "The current date-time string generated from your device clock.",
    referrer: "The page or site that led the browser here, if one was sent.",
    do_not_track: "A browser privacy preference flag requesting reduced tracking.",
    cookies: "Whether the browser currently allows small site data files for sessions and state.",
    online: "The browser's basic guess about whether network access exists.",
    screen: "The full size of the connected display in CSS pixels.",
    viewport: "The usable page area inside the browser window right now.",
    dpr: "The ratio between CSS pixels and physical screen pixels.",
    touch_points: "How many simultaneous touch contacts the device reports it can handle.",
    cpu_cores: "The number of logical processing threads the browser exposes.",
    device_memory: "A coarse memory tier used by browsers for performance decisions.",
    network_hints: "Approximate connection quality signals like speed class, latency, and data saver state.",
    storage_estimate: "An estimate of browser-managed disk usage and remaining quota for this site.",
    persistent_storage: "Whether site data is protected from automatic eviction when storage gets tight.",
    battery: "Current power and charging information from the device battery subsystem.",
    media_device_counts: "How many audio and video input/output devices the browser can enumerate.",
    gpu_renderer: "The graphics adapter and driver identity exposed through WebGL.",
    local_fingerprint: "A locally computed signature derived from several visible browser and device traits.",
    geolocation: "Your physical position estimate derived from location services.",
    notifications: "Permission to let the site show system-level alerts outside the page.",
    clipboard_read: "The current text content sitting in the system copy buffer.",
    camera_mic_labels: "The names of connected capture devices after access is granted.",
    screen_share: "Metadata about the display, window, or tab you choose to share.",
    bluetooth: "A chooser for nearby short-range wireless devices the browser can talk to.",
    webusb: "A chooser for directly attached peripherals exposed over USB.",
    webserial: "A chooser for hardware that communicates over serial ports.",
    webhid: "A chooser for generic human-interface peripherals like controllers or input devices.",
    file_picker: "The names and sizes of files you explicitly choose from your device.",
    directory_picker: "The name of a folder you explicitly choose from your device.",
    contacts: "Selected people entries from the device address book.",
    midi: "Connected music input and output gear visible through the browser.",
    public_ip_v4: "Your outward-facing network address on the older internet routing standard.",
    public_ip_v6: "Your outward-facing network address on the newer internet routing standard.",
}

export function buildGoogleSearchUrl(query) {
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`
}

export function readProbePopupThemeVars(triggerElement) {
    if (typeof HTMLElement === "undefined" || !(triggerElement instanceof HTMLElement)) return undefined

    const articleElement = triggerElement.closest("article.article-data-probe")
    if (!(articleElement instanceof HTMLElement)) return undefined

    const computedStyles = window.getComputedStyle(articleElement)
    return PROBE_POPUP_THEME_VAR_NAMES.reduce((acc, name) => {
        const value = computedStyles.getPropertyValue(name)?.trim()
        if (value) {
            acc[name] = value
        }
        return acc
    }, {})
}

export function extractProbeQuerySource(probe) {
    const how = String(probe?.how || "").trim()
    if (!how) return probe?.id || ""

    const match = how.match(/(?:Read from|Requested via|Generated from|Fetched from|Counted via)\s+(.+?)(?:\s+\([^)]*\))?\.$/i)
    if (match?.[1]) {
        return normalizeQuerySource(match[1])
    }

    const requestThenReadMatch = how.match(/Requests?\s+(.+?),\s+then reads?\s+(.+?)\.$/i)
    if (requestThenReadMatch) {
        return normalizeQuerySource(`${requestThenReadMatch[1]} ${requestThenReadMatch[2]}`)
    }

    return normalizeQuerySource(how.replace(/\.$/, "")) || probe?.id || ""
}

export function normalizeQuerySource(value) {
    return String(value || "")
        .replace(/\blabels?\b/gi, "")
        .replace(/\(if supported\)/gi, "")
        .replace(/\(secure context\)/gi, "")
        .replace(/\(if exposed\)/gi, "")
        .replace(/\(you choose\)/gi, "")
        .replace(/\(chooser\)/gi, "")
        .replace(/\(user gesture\)/gi, "")
        .replace(/\s+/g, " ")
        .trim()
}

export function safePretty(value) {
    try {
        return JSON.stringify(value, null, 2)
    }
    catch (_) {
        return null
    }
}

export function safeBool(value) {
    try {
        return Boolean(value)
    }
    catch (_) {
        return false
    }
}

export function formatBytes(bytes) {
    const b = Number(bytes)
    if (!Number.isFinite(b) || b < 0) return null
    const units = ["B", "KB", "MB", "GB", "TB"]
    let i = 0
    let v = b
    while (v >= 1024 && i < units.length - 1) {
        v /= 1024
        i += 1
    }
    const digits = i === 0 ? 0 : v < 10 ? 2 : v < 100 ? 1 : 0
    return `${v.toFixed(digits)} ${units[i]}`
}

export function formatSeconds(seconds) {
    const s = Number(seconds)
    if (s === Infinity) return "infinite"
    if (!Number.isFinite(s) || s < 0) return null
    const m = Math.floor(s / 60)
    const r = Math.floor(s % 60)
    if (m <= 0) return `${r}s`
    return `${m}m ${r}s`
}

export async function sha256Hex(text) {
    try {
        if (!window?.crypto?.subtle || typeof TextEncoder === "undefined") return null
        const data = new TextEncoder().encode(String(text))
        const digest = await window.crypto.subtle.digest("SHA-256", data)
        const bytes = new Uint8Array(digest)
        return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("")
    }
    catch (_) {
        return null
    }
}

export function getWebglRendererInfo() {
    try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        if (!gl) return null
        const ext = gl.getExtension("WEBGL_debug_renderer_info")
        if (!ext) return null
        const vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL)
        const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
        const out = []
        if (vendor) out.push(`vendor: ${vendor}`)
        if (renderer) out.push(`renderer: ${renderer}`)
        return out.join("\n") || null
    }
    catch (_) {
        return null
    }
}

export function getProbeBadgeInfo(status) {
    const badge = status === "ok" ? "AVAILABLE" :
        status === "pending" ? "CHECKING" :
            status === "idle" ? "READY" :
                status === "unsupported" ? "NOT SUPPORTED" :
                    "DENIED/HIDDEN"
    const badgeClass = status === "ok" ? "badge-ok" :
        status === "pending" ? "badge-wait" :
            status === "idle" ? "badge-ready" :
                status === "unsupported" ? "badge-unsupported" :
                    "badge-hidden"
    return { badge, badgeClass }
}

export function getDisplayText(status, value, options = {}) {
    const { showRequest = false, thirdParty = false } = options
    if (status === "ok" && value) return String(value)
    if (status === "pending") {
        return showRequest ? "Request in progress..." : "Collecting locally exposed values..."
    }
    if (status === "idle") {
        return thirdParty ?
            "No external request has been sent yet. Use the button to fetch it deliberately." :
            "Waiting for your click. Nothing is requested until you trigger it."
    }
    if (status === "unsupported") return "This browser or context does not expose this capability."
    return HIDDEN_TEXT
}

export function getCollapsedText(status, value, options = {}) {
    if (status === "ok" && value) {
        const text = String(value)
        const lines = text.split("\n")
        const shown = lines.slice(0, 3)
        let joined = shown.join("\n")
        if (joined.length > 420) {
            joined = truncateText(joined, 420)
        }
        const remaining = Math.max(0, lines.length - shown.length)
        if (remaining > 0) {
            joined = `${joined}\n… (+${remaining} lines)`
        }
        return joined
    }
    return getDisplayText(status, value, options)
}

export function truncateText(text, maxChars) {
    const s = String(text || "")
    if (s.length <= maxChars) return s
    const cut = Math.max(0, maxChars - 1)
    return s.slice(0, cut) + "…"
}
