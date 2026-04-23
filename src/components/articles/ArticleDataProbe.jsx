import "./ArticleDataProbe.scss"
import React, {useEffect, useMemo, useRef, useState} from "react"
import Article from "./base/Article.jsx"
import StandardButton from "../buttons/StandardButton.jsx"
import CopyButton from "../buttons/CopyButton.jsx"

const HIDDEN_TEXT = "No data returned. Access may be blocked, denied, or intentionally hidden."
const PROBE_WHAT = {
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

function ArticleDataProbe({ dataWrapper }) {
    const [unlocked, setUnlocked] = useState(false)
    const [probeStates, setProbeStates] = useState({})
    const [expanded, setExpanded] = useState({})
    const didInitRef = useRef(false)

    const passiveProbes = useMemo(() => ([
        {
            id: "secure_context",
            icon: "fa-solid fa-lock",
            title: "Secure context",
            how: "Read from window.isSecureContext.",
            why: "A lot of hardware-adjacent APIs (USB/Bluetooth/clipboard/media) only work on HTTPS.",
            run: async () => String(Boolean(window.isSecureContext))
        },
        {
            id: "user_agent",
            icon: "fa-solid fa-id-card",
            title: "User-Agent",
            how: "Read from navigator.userAgent.",
            why: "Leaky compatibility string; often hints OS + browser builds and device class.",
            run: async () => navigator?.userAgent || null
        },
        {
            id: "ua_ch_basic",
            icon: "fa-solid fa-fingerprint",
            title: "UA-CH (basic)",
            how: "Read from navigator.userAgentData (if supported).",
            why: "More structured than User-Agent; can reveal platform and brand versions.",
            supported: () => Boolean(navigator?.userAgentData),
            run: async () => {
                const uad = navigator?.userAgentData
                if (!uad) return null
                const brands = Array.isArray(uad.brands) ? uad.brands : []
                const brandsText = brands.map(b => `${b.brand} ${b.version}`).join(", ")
                const out = []
                if (brandsText) out.push(`brands: ${brandsText}`)
                if (uad.platform) out.push(`platform: ${uad.platform}`)
                if (typeof uad.mobile === "boolean") out.push(`mobile: ${uad.mobile}`)
                return out.join("\n") || null
            }
        },
        {
            id: "ua_ch_entropy",
            icon: "fa-solid fa-microchip",
            title: "UA-CH (high entropy)",
            how: "Requested via navigator.userAgentData.getHighEntropyValues().",
            why: "More precise device hints like architecture/bitness/model on some browsers.",
            supported: () => Boolean(navigator?.userAgentData?.getHighEntropyValues),
            run: async () => {
                const uad = navigator?.userAgentData
                if (!uad?.getHighEntropyValues) return null
                const values = await uad.getHighEntropyValues([
                    "platformVersion",
                    "architecture",
                    "model",
                    "uaFullVersion",
                    "bitness",
                    "wow64",
                ])
                return safePretty(values)
            }
        },
        {
            id: "languages",
            icon: "fa-solid fa-language",
            title: "Languages",
            how: "Read from navigator.languages.",
            why: "Often matches OS + keyboard setup; can hint region and user preferences.",
            run: async () => {
                const langs = navigator?.languages
                return (Array.isArray(langs) && langs.length) ? langs.join(", ") : null
            }
        },
        {
            id: "timezone",
            icon: "fa-regular fa-clock",
            title: "Time zone",
            how: "Read from Intl.DateTimeFormat().resolvedOptions().timeZone.",
            why: "Great at inferring region and affects timestamps/logs (debugging + privacy).",
            run: async () => Intl.DateTimeFormat().resolvedOptions().timeZone || null
        },
        {
            id: "local_time",
            icon: "fa-solid fa-calendar-day",
            title: "Local time",
            how: "Generated from new Date().toString().",
            why: "Can reveal clock drift and locale formatting; useful for debugging time sync issues.",
            run: async () => new Date().toString()
        },
        {
            id: "referrer",
            icon: "fa-solid fa-link",
            title: "Referrer",
            how: "Read from document.referrer.",
            why: "Shows navigation path; useful for debugging but can be privacy sensitive.",
            run: async () => document?.referrer || null
        },
        {
            id: "do_not_track",
            icon: "fa-solid fa-user-shield",
            title: "Do Not Track",
            how: "Read from navigator.doNotTrack.",
            why: "A legacy privacy signal (not consistently honored) but still a preference hint.",
            run: async () => navigator?.doNotTrack || null
        },
        {
            id: "cookies",
            icon: "fa-solid fa-cookie-bite",
            title: "Cookies enabled",
            how: "Read from navigator.cookieEnabled.",
            why: "Storage capability gate; affects sessions, auth, and tracking.",
            run: async () => String(Boolean(navigator?.cookieEnabled))
        },
        {
            id: "online",
            icon: "fa-solid fa-wifi",
            title: "Online",
            how: "Read from navigator.onLine.",
            why: "Only a hint; still useful for UX and diagnosing offline failures.",
            run: async () => String(Boolean(navigator?.onLine))
        },
        {
            id: "screen",
            icon: "fa-solid fa-display",
            title: "Screen",
            how: "Read from screen.width / screen.height.",
            why: "Panel + scaling hints; common in device fingerprinting and layout decisions.",
            run: async () => {
                const w = window?.screen?.width
                const h = window?.screen?.height
                return (w && h) ? `${w} x ${h}` : null
            }
        },
        {
            id: "viewport",
            icon: "fa-solid fa-up-right-and-down-left-from-center",
            title: "Viewport",
            how: "Read from window.innerWidth / window.innerHeight.",
            why: "What the page can actually use; changes with browser UI, zoom, split-screen.",
            run: async () => {
                const w = window?.innerWidth
                const h = window?.innerHeight
                return (w && h) ? `${w} x ${h}` : null
            }
        },
        {
            id: "dpr",
            icon: "fa-solid fa-maximize",
            title: "Device pixel ratio",
            how: "Read from window.devicePixelRatio.",
            why: "High-DPI + scaling hint; affects rendering sharpness and performance.",
            run: async () => String(window?.devicePixelRatio || 1)
        },
        {
            id: "touch_points",
            icon: "fa-regular fa-hand-pointer",
            title: "Touch points",
            how: "Read from navigator.maxTouchPoints.",
            why: "Touch hardware presence; helps infer phone/tablet/2-in-1 devices.",
            run: async () => String(navigator?.maxTouchPoints ?? 0)
        },
        {
            id: "cpu_cores",
            icon: "fa-solid fa-cubes",
            title: "CPU cores (logical)",
            how: "Read from navigator.hardwareConcurrency.",
            why: "Rough CPU tier hint; affects performance/parallel workload decisions.",
            run: async () => {
                const c = navigator?.hardwareConcurrency
                return Number.isFinite(Number(c)) ? String(c) : null
            }
        },
        {
            id: "device_memory",
            icon: "fa-solid fa-memory",
            title: "Device memory (approx.)",
            how: "Read from navigator.deviceMemory (if supported).",
            why: "Very rough RAM class; used for performance heuristics and fingerprinting.",
            run: async () => {
                const m = navigator?.deviceMemory
                return Number.isFinite(Number(m)) ? `${m} GB` : null
            }
        },
        {
            id: "network_hints",
            icon: "fa-solid fa-signal",
            title: "Network hints",
            how: "Read from navigator.connection (if supported).",
            why: "Radio/link quality hints; often indicates mobile vs wired and data-saving mode.",
            supported: () => Boolean(navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection),
            run: async () => {
                const c = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection
                if (!c) return null
                const out = []
                if (c.effectiveType) out.push(`effectiveType: ${c.effectiveType}`)
                if (Number.isFinite(Number(c.downlink))) out.push(`downlink: ${c.downlink} Mbps`)
                if (Number.isFinite(Number(c.rtt))) out.push(`rtt: ${c.rtt} ms`)
                if (typeof c.saveData === "boolean") out.push(`saveData: ${c.saveData}`)
                return out.join("\n") || null
            }
        },
        {
            id: "storage_estimate",
            icon: "fa-solid fa-database",
            title: "Storage estimate",
            how: "Read from navigator.storage.estimate() (if supported).",
            why: "How much disk the browser can use; impacts caching, offline, and large apps.",
            supported: () => Boolean(navigator?.storage?.estimate),
            run: async () => {
                if (!navigator?.storage?.estimate) return null
                const est = await navigator.storage.estimate()
                const usage = Number.isFinite(Number(est?.usage)) ? formatBytes(est.usage) : null
                const quota = Number.isFinite(Number(est?.quota)) ? formatBytes(est.quota) : null
                const out = []
                if (usage) out.push(`usage: ${usage}`)
                if (quota) out.push(`quota: ${quota}`)
                return out.join("\n") || null
            }
        },
        {
            id: "persistent_storage",
            icon: "fa-solid fa-warehouse",
            title: "Persistent storage",
            how: "Read from navigator.storage.persisted() (if supported).",
            why: "If false, the browser may evict storage under pressure.",
            supported: () => Boolean(navigator?.storage?.persisted),
            run: async () => {
                if (!navigator?.storage?.persisted) return null
                return String(Boolean(await navigator.storage.persisted()))
            }
        },
        {
            id: "battery",
            icon: "fa-solid fa-battery-half",
            title: "Battery",
            how: "Read from navigator.getBattery() (if supported).",
            why: "Power state hint (mostly mobile/laptop); can influence performance modes.",
            supported: () => Boolean(navigator?.getBattery),
            run: async () => {
                if (!navigator?.getBattery) return null
                const b = await navigator.getBattery()
                if (!b) return null
                const out = [
                    `charging: ${Boolean(b.charging)}`,
                    `level: ${Math.round((b.level ?? 0) * 100)}%`,
                ]
                if (Number.isFinite(Number(b.chargingTime))) out.push(`chargingTime: ${formatSeconds(b.chargingTime)}`)
                if (Number.isFinite(Number(b.dischargingTime))) out.push(`dischargingTime: ${formatSeconds(b.dischargingTime)}`)
                return out.join("\n") || null
            }
        },
        {
            id: "media_device_counts",
            icon: "fa-solid fa-video",
            title: "Media devices (counts)",
            how: "Counted via navigator.mediaDevices.enumerateDevices() (secure context).",
            why: "Peripheral hints (mics/cams/output devices); can be surprisingly identifying.",
            supported: () => Boolean(window?.isSecureContext && navigator?.mediaDevices?.enumerateDevices),
            run: async () => {
                if (!window?.isSecureContext) return null
                if (!navigator?.mediaDevices?.enumerateDevices) return null
                const devices = await navigator.mediaDevices.enumerateDevices()
                const counts = devices.reduce((acc, d) => {
                    acc[d.kind] = (acc[d.kind] || 0) + 1
                    return acc
                }, {})
                const out = []
                if (counts.audioinput) out.push(`audio inputs: ${counts.audioinput}`)
                if (counts.videoinput) out.push(`video inputs: ${counts.videoinput}`)
                if (counts.audiooutput) out.push(`audio outputs: ${counts.audiooutput}`)
                return out.join("\n") || null
            }
        },
        {
            id: "gpu_renderer",
            icon: "fa-solid fa-meteor",
            title: "GPU renderer/vendor",
            how: "Read via WebGL + WEBGL_debug_renderer_info (if exposed).",
            why: "GPU model hints are very fingerprintable and correlate with performance tier.",
            supported: () => {
                try {
                    const canvas = document.createElement("canvas")
                    return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
                }
                catch (_) {
                    return false
                }
            },
            run: async () => getWebglRendererInfo()
        },
        {
            id: "local_fingerprint",
            icon: "fa-solid fa-skull",
            title: "Local fingerprint hash",
            how: "SHA-256 of a bundle of values shown above (computed locally).",
            why: "Demonstrates how unique you can look even without asking for permissions.",
            run: async () => {
                const parts = [
                    `ua=${navigator?.userAgent || ""}`,
                    `langs=${Array.isArray(navigator?.languages) ? navigator.languages.join(",") : ""}`,
                    `tz=${Intl.DateTimeFormat().resolvedOptions().timeZone || ""}`,
                    `screen=${window?.screen?.width || ""}x${window?.screen?.height || ""}`,
                    `vp=${window?.innerWidth || ""}x${window?.innerHeight || ""}`,
                    `dpr=${window?.devicePixelRatio || 1}`,
                    `cores=${navigator?.hardwareConcurrency || ""}`,
                    `mem=${navigator?.deviceMemory || ""}`,
                    `touch=${navigator?.maxTouchPoints ?? 0}`,
                    `secure=${Boolean(window?.isSecureContext)}`,
                ].join("|")

                const hex = await sha256Hex(parts)
                return hex ? `${hex.slice(0, 16)}...` : null
            }
        },
    ]), [])

    const requestProbes = useMemo(() => ([
        {
            id: "geolocation",
            icon: "fa-solid fa-location-dot",
            title: "Geolocation",
            how: "Requested via navigator.geolocation.getCurrentPosition().",
            why: "Usually GPS/Wi-Fi/cell triangulation. Very sensitive and very real-world.",
            supported: () => "geolocation" in navigator,
            request: async () => {
                const pos = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 0,
                    })
                })
                const c = pos?.coords
                if (!c) return null
                return [
                    `lat: ${c.latitude}`,
                    `lng: ${c.longitude}`,
                    Number.isFinite(Number(c.accuracy)) ? `accuracy: ${Math.round(c.accuracy)} m` : null,
                ].filter(Boolean).join("\n")
            }
        },
        {
            id: "notifications",
            icon: "fa-regular fa-bell",
            title: "Notifications",
            how: "Requested via Notification.requestPermission().",
            why: "Persistent permission. Great UX feature, also a spam/abuse vector.",
            supported: () => "Notification" in window,
            request: async () => {
                const perm = await Notification.requestPermission()
                return `permission: ${perm}`
            },
            extraAction: {
                label: "Send test",
                icon: "fa-solid fa-paper-plane",
                run: async () => {
                    if (!("Notification" in window)) return null
                    if (Notification.permission !== "granted") return null
                    try {
                        new Notification("You allowed me to see this", { body: "Triggered by your click." })
                        return "sent"
                    }
                    catch (_) {
                        return null
                    }
                }
            }
        },
        {
            id: "clipboard_read",
            icon: "fa-solid fa-clipboard",
            title: "Clipboard read",
            how: "Requested via navigator.clipboard.readText() (user gesture).",
            why: "Clipboard can contain passwords, keys, and private messages. Extremely sensitive.",
            supported: () => Boolean(navigator?.clipboard?.readText),
            request: async () => {
                const text = await navigator.clipboard.readText()
                const trimmed = String(text ?? "")
                if (!trimmed) return null
                const preview = trimmed.length > 400 ? `${trimmed.slice(0, 400)}...` : trimmed
                return `length: ${trimmed.length}\n\n${preview}`
            }
        },
        {
            id: "camera_mic_labels",
            icon: "fa-solid fa-camera",
            title: "Camera + microphone labels",
            how: "Requests getUserMedia, then reads enumerateDevices() labels.",
            why: "Reveals capture hardware (headsets/webcams). Useful for setup, fingerprintable too.",
            supported: () => Boolean(navigator?.mediaDevices?.getUserMedia && navigator?.mediaDevices?.enumerateDevices),
            request: async () => {
                if (!window?.isSecureContext) return null
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                try {
                    const devices = await navigator.mediaDevices.enumerateDevices()
                    const aud = devices.filter(d => d.kind === "audioinput").map(d => d.label).filter(Boolean)
                    const vid = devices.filter(d => d.kind === "videoinput").map(d => d.label).filter(Boolean)
                    const out = []
                    out.push(`audio inputs: ${aud.length}`)
                    if (aud.length) out.push(...aud.slice(0, 6).map(l => `- ${l}`))
                    out.push(`video inputs: ${vid.length}`)
                    if (vid.length) out.push(...vid.slice(0, 6).map(l => `- ${l}`))
                    return out.join("\n") || null
                }
                finally {
                    stream.getTracks().forEach(t => t.stop())
                }
            }
        },
        {
            id: "screen_share",
            icon: "fa-solid fa-desktop",
            title: "Screen share metadata",
            how: "Requested via navigator.mediaDevices.getDisplayMedia().",
            why: "Shows what surface you chose. Still sensitive even without reading pixels.",
            supported: () => Boolean(navigator?.mediaDevices?.getDisplayMedia),
            request: async () => {
                if (!window?.isSecureContext) return null
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
                try {
                    const track = stream.getVideoTracks()[0]
                    if (!track) return null
                    const settings = typeof track.getSettings === "function" ? track.getSettings() : {}
                    const out = []
                    if (track.label) out.push(`label: ${track.label}`)
                    if (settings.displaySurface) out.push(`displaySurface: ${settings.displaySurface}`)
                    if (settings.width && settings.height) out.push(`resolution: ${settings.width} x ${settings.height}`)
                    return out.join("\n") || null
                }
                finally {
                    stream.getTracks().forEach(t => t.stop())
                }
            }
        },
        {
            id: "bluetooth",
            icon: "fa-brands fa-bluetooth",
            title: "Bluetooth device chooser",
            how: "Requested via navigator.bluetooth.requestDevice() (chooser).",
            why: "Nearby hardware is a huge context leak. Powerful for IoT, scary for privacy.",
            supported: () => Boolean(navigator?.bluetooth?.requestDevice),
            request: async () => {
                if (!window?.isSecureContext) return null
                const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true })
                return device ? `name: ${device.name || "(no name)"}` : null
            }
        },
        {
            id: "webusb",
            icon: "fa-brands fa-usb",
            title: "WebUSB chooser",
            how: "Requested via navigator.usb.requestDevice() (chooser).",
            why: "Direct USB access for dev boards/hardware tools. Very powerful when enabled.",
            supported: () => Boolean(navigator?.usb?.requestDevice),
            request: async () => {
                if (!window?.isSecureContext) return null
                const device = await navigator.usb.requestDevice({ filters: [] })
                if (!device) return null
                const out = []
                if (device.manufacturerName) out.push(`manufacturer: ${device.manufacturerName}`)
                if (device.productName) out.push(`product: ${device.productName}`)
                if (Number.isFinite(Number(device.vendorId))) out.push(`vendorId: ${device.vendorId}`)
                if (Number.isFinite(Number(device.productId))) out.push(`productId: ${device.productId}`)
                return out.join("\n") || null
            }
        },
        {
            id: "webserial",
            icon: "fa-solid fa-terminal",
            title: "WebSerial chooser",
            how: "Requested via navigator.serial.requestPort() (chooser).",
            why: "Serial consoles for embedded devices (Arduino/ESP/routers). Great for hardware hacking.",
            supported: () => Boolean(navigator?.serial?.requestPort),
            request: async () => {
                if (!window?.isSecureContext) return null
                const port = await navigator.serial.requestPort()
                const info = typeof port?.getInfo === "function" ? port.getInfo() : null
                return info ? safePretty(info) : "selected"
            }
        },
        {
            id: "webhid",
            icon: "fa-solid fa-gamepad",
            title: "WebHID chooser",
            how: "Requested via navigator.hid.requestDevice() (chooser).",
            why: "HID = keyboards, mice, gamepads. Can reveal connected peripherals.",
            supported: () => Boolean(navigator?.hid?.requestDevice),
            request: async () => {
                if (!window?.isSecureContext) return null
                const devices = await navigator.hid.requestDevice({ filters: [] })
                const d = devices?.[0]
                if (!d) return null
                const out = []
                if (d.productName) out.push(`product: ${d.productName}`)
                if (Number.isFinite(Number(d.vendorId))) out.push(`vendorId: ${d.vendorId}`)
                if (Number.isFinite(Number(d.productId))) out.push(`productId: ${d.productId}`)
                return out.join("\n") || null
            }
        },
        {
            id: "file_picker",
            icon: "fa-regular fa-file",
            title: "File picker",
            how: "Requested via showOpenFilePicker() (you choose).",
            why: "Even metadata like filename/size can leak context. Contents are not read here.",
            supported: () => typeof window?.showOpenFilePicker === "function",
            request: async () => {
                const handles = await window.showOpenFilePicker({ multiple: true })
                if (!handles?.length) return null
                const lines = []
                for (const h of handles.slice(0, 5)) {
                    try {
                        const f = await h.getFile()
                        lines.push(`${f.name} (${formatBytes(f.size)})`)
                    }
                    catch (_) {
                        lines.push(`${h.name || "file"} (metadata hidden)`)
                    }
                }
                return lines.join("\n") || null
            }
        },
        {
            id: "directory_picker",
            icon: "fa-regular fa-folder-open",
            title: "Directory picker",
            how: "Requested via showDirectoryPicker() (you choose).",
            why: "Directory names can reveal project/company context. We only show the name.",
            supported: () => typeof window?.showDirectoryPicker === "function",
            request: async () => {
                const handle = await window.showDirectoryPicker()
                return handle?.name || null
            }
        },
        {
            id: "contacts",
            icon: "fa-solid fa-address-book",
            title: "Contacts picker",
            how: "Requested via navigator.contacts.select() (if supported).",
            why: "Social graph + phone/email exposure. Very sensitive by design.",
            supported: () => Boolean(navigator?.contacts?.select),
            request: async () => {
                const props = ["name", "email", "tel", "address"]
                const result = await navigator.contacts.select(props, { multiple: true })
                if (!Array.isArray(result) || result.length === 0) return null
                const first = result[0] || {}
                return safePretty({
                    count: result.length,
                    first: {
                        name: first.name?.[0],
                        email: first.email?.[0],
                        tel: first.tel?.[0],
                    }
                })
            }
        },
        {
            id: "midi",
            icon: "fa-solid fa-music",
            title: "MIDI devices",
            how: "Requested via navigator.requestMIDIAccess() (if supported).",
            why: "Music hardware/peripheral hint. Fun and surprisingly identifying.",
            supported: () => typeof navigator?.requestMIDIAccess === "function",
            request: async () => {
                const access = await navigator.requestMIDIAccess({ sysex: false })
                const inputs = Array.from(access.inputs?.values?.() || [])
                const outputs = Array.from(access.outputs?.values?.() || [])
                const out = []
                out.push(`inputs: ${inputs.length}`)
                if (inputs.length) out.push(...inputs.slice(0, 6).map(i => `- ${i.name || "input"}`))
                out.push(`outputs: ${outputs.length}`)
                if (outputs.length) out.push(...outputs.slice(0, 6).map(o => `- ${o.name || "output"}`))
                return out.join("\n") || null
            }
        },
    ]), [])

    const publicIpProbes = useMemo(() => ([
        {
            id: "public_ip_v4",
            icon: "fa-solid fa-globe",
            title: "Public IP (IPv4)",
            how: "Fetched from https://api.ipify.org?format=json.",
            why: "Your internet-facing address (not your LAN IP). This is the one servers see.",
            buttonLabel: "Fetch public IPv4",
            url: "https://api.ipify.org?format=json"
        },
        {
            id: "public_ip_v6",
            icon: "fa-solid fa-earth-europe",
            title: "Public IP (IPv6)",
            how: "Fetched from https://api64.ipify.org?format=json.",
            why: "If your network supports IPv6, this can be stable/unique per device or per network.",
            buttonLabel: "Fetch public IPv6",
            url: "https://api64.ipify.org?format=json"
        },
    ]), [])

    useEffect(() => {
        if (didInitRef.current) return
        didInitRef.current = true
        const init = {}
        for (const p of passiveProbes) init[p.id] = { status: "pending", value: null }
        setProbeStates(prev => ({ ...init, ...prev }))
        Promise.allSettled(passiveProbes.map(p => {
            if (typeof p.supported === "function" && !safeBool(p.supported())) {
                setProbeStates(prev => ({ ...prev, [p.id]: { status: "unsupported", value: null } }))
                return Promise.resolve()
            }
            return runProbe(p.id, p.run, true)
        }))
    }, [passiveProbes])

    const runProbe = async (id, fn, markPending = true) => {
        if (markPending) setProbeStates(prev => ({ ...prev, [id]: { status: "pending", value: null } }))
        try {
            const value = await fn()
            if (!value || String(value).trim().length === 0) {
                setProbeStates(prev => ({ ...prev, [id]: { status: "hidden", value: null } }))
                return
            }
            setProbeStates(prev => ({ ...prev, [id]: { status: "ok", value: String(value) } }))
        }
        catch (_) {
            setProbeStates(prev => ({ ...prev, [id]: { status: "error", value: null } }))
        }
    }

    const runRequestProbe = async (probe) => {
        if (!safeBool(probe?.supported?.())) {
            setProbeStates(prev => ({ ...prev, [probe.id]: { status: "unsupported", value: null } }))
            return
        }

        await runProbe(probe.id, probe.request, true)
    }

    const runExtraAction = async (probe) => {
        if (!probe?.extraAction?.run) return
        await runProbe(`${probe.id}__extra`, probe.extraAction.run, true)
    }

    const runPublicIp = async (probe) => {
        if (typeof fetch !== "function") {
            setProbeStates(prev => ({ ...prev, [probe.id]: { status: "unsupported", value: null } }))
            return
        }
        await runProbe(probe.id, async () => {
            const res = await fetch(probe.url, { method: "GET" })
            if (!res.ok) return null
            const json = await res.json().catch(() => null)
            return json?.ip || null
        }, true)
    }

    const toggleExpanded = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev?.[id] }))
    }

    const autoCount = passiveProbes.length
    const requestCount = requestProbes.length
    const publicCount = publicIpProbes.length

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-data-probe`}>
            <div className={`article-data-probe-summary`}>
                <div className={`article-data-probe-summary-chip`}>
                    <i className={`fa-solid fa-eye`}/>
                    <span className={`article-data-probe-summary-value`}>{autoCount}</span>
                    <span className={`article-data-probe-summary-label`}>Auto-visible signals</span>
                </div>

                <div className={`article-data-probe-summary-chip`}>
                    <i className={`fa-solid fa-hand-pointer`}/>
                    <span className={`article-data-probe-summary-value`}>{requestCount}</span>
                    <span className={`article-data-probe-summary-label`}>Click-to-request probes</span>
                </div>

                <div className={`article-data-probe-summary-chip`}>
                    <i className={`fa-solid fa-globe`}/>
                    <span className={`article-data-probe-summary-value`}>{publicCount}</span>
                    <span className={`article-data-probe-summary-label`}>External IP checks</span>
                </div>
            </div>

            <ProbeSection
                icon={`fa-solid fa-globe`}
                eyebrow={`External lookup`}
                title={`Public IP`}
                description={`Shows the address that outside services see. Nothing is fetched until you click one of the buttons.`}
                count={publicCount}
                accent={`accent-external`}>
                <div className={`article-data-probe-grid article-data-probe-grid-compact`}>
                    {publicIpProbes.map(p => (
                        <ProbeItem key={p.id}
                                   probe={p}
                                   state={probeStates[p.id]}
                                   showRequest={true}
                                   requestLabel={p.buttonLabel}
                                   onRequest={() => runPublicIp(p)}
                                   thirdParty={true}
                                   expanded={Boolean(expanded?.[p.id])}
                                   onToggleExpand={() => toggleExpanded(p.id)}/>
                    ))}
                </div>
            </ProbeSection>

            <ProbeSection
                icon={`fa-solid fa-hand`}
                eyebrow={`Permission gated`}
                title={`Ask for more`}
                description={`These checks stay dormant until you unlock the section and explicitly ask for each permission or hardware chooser.`}
                count={requestCount}
                accent={`accent-interactive`}
                actions={!unlocked ? (
                    <StandardButton variant={`contrast`}
                                    className={`article-data-probe-unlock-btn`}
                                    label={`Unlock interactions`}
                                    faIcon={`fa-solid fa-unlock`}
                                    onClick={() => setUnlocked(true)}/>
                ) : null}>
                {unlocked && (
                    <div className={`article-data-probe-grid`}>
                        {requestProbes.map(p => (
                            <ProbeItem key={p.id}
                                       probe={p}
                                       state={probeStates[p.id]}
                                       showRequest={true}
                                       requestLabel={`Request`}
                                       onRequest={() => runRequestProbe(p)}
                                       extraAction={p.extraAction ? () => runExtraAction(p) : null}
                                       extraLabel={p.extraAction?.label}
                                       extraIcon={p.extraAction?.icon}
                                       extraState={probeStates[`${p.id}__extra`]}
                                       expanded={Boolean(expanded?.[p.id])}
                                       onToggleExpand={() => toggleExpanded(p.id)}/>
                        ))}
                    </div>
                )}
            </ProbeSection>

            <ProbeSection
                icon={`fa-solid fa-eye`}
                eyebrow={`Passive reads`}
                title={`Visible without asking`}
                description={`These values are exposed by the browser immediately, without prompts, and are enough to describe a device surprisingly well.`}
                count={autoCount}
                accent={`accent-passive`}>
                <div className={`article-data-probe-grid`}>
                    {passiveProbes.map(p => (
                        <ProbeItem key={p.id}
                                   probe={p}
                                   state={probeStates[p.id]}
                                   expanded={Boolean(expanded?.[p.id])}
                                   onToggleExpand={() => toggleExpanded(p.id)}/>
                    ))}
                </div>
            </ProbeSection>
        </Article>
    )
}

function ProbeSection({ icon, eyebrow, title, description, count, accent, actions = null, children }) {
    return (
        <section className={`article-data-probe-block ${accent || ""}`}>
            <div className={`article-data-probe-block-header`}>
                <div className={`article-data-probe-block-lead`}>
                    <div className={`article-data-probe-block-icon`}>
                        <i className={icon}/>
                    </div>

                    <div className={`article-data-probe-block-copy`}>
                        {eyebrow && (
                            <div className={`article-data-probe-block-eyebrow text-4`}>{eyebrow}</div>
                        )}

                        <h5 className={`article-data-probe-block-title mb-0`}>{title}</h5>

                        {description && (
                            <div className={`article-data-probe-block-description text-3`}>{description}</div>
                        )}

                    </div>
                </div>

                <div className={`article-data-probe-block-controls`}>
                    <div className={`article-data-probe-block-count`}>
                        <span className={`article-data-probe-block-count-value`}>{count}</span>
                        <span className={`article-data-probe-block-count-label`}>signals</span>
                    </div>

                    {actions}
                </div>
            </div>

            <div className={`article-data-probe-block-body`}>
                {children}
            </div>
        </section>
    )
}

function ProbeItem({
    probe,
    state,
    showRequest = false,
    requestLabel = "Request",
    onRequest = null,
    thirdParty = false,
    extraAction = null,
    extraLabel = null,
    extraIcon = null,
    extraState = null,
    expanded = false,
    onToggleExpand = null,
}) {
    const status = state?.status || (showRequest ? "idle" : "pending")
    const value = state?.value || null
    const whatText = probe?.what || PROBE_WHAT[probe?.id] || "Explanation unavailable."

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

    const fullText = getDisplayText(status, value, { showRequest, thirdParty })
    const collapsedText = getCollapsedText(status, value, { showRequest, thirdParty })
    const hasExtraDetails = Boolean(extraState?.status === "ok" && extraState?.value)
    const canExpand = Boolean(
        (status === "ok" && value && (String(value).length > 140 || String(value).includes("\n"))) ||
        hasExtraDetails
    )

    const requestIcon = thirdParty ? "fa-solid fa-globe" : "fa-solid fa-wand-magic-sparkles"

    return (
        <div className={`article-data-probe-item ${thirdParty ? "item-third-party" : ""} ${expanded ? "item-expanded" : ""}`}>
            <div className={`article-data-probe-item-head`}>
                <div className={`article-data-probe-item-icon`}>
                    <i className={`${probe.icon}`}/>
                </div>

                <div className={`article-data-probe-item-head-content`}>
                    <div className={`article-data-probe-item-title`}>{probe.title}</div>
                    <div className={`article-data-probe-item-badge ${badgeClass}`}>{badge}</div>
                </div>
            </div>

            <div className={`article-data-probe-item-body`}>
                <div className={`article-data-probe-item-meta text-3`}>
                    <div className={`article-data-probe-item-meta-row`}>
                        <span className={`article-data-probe-item-meta-key`}>What</span>
                        <span className={`article-data-probe-item-meta-value`}>{whatText}</span>
                    </div>
                    {probe?.how && (
                        <div className={`article-data-probe-item-meta-row`}>
                            <span className={`article-data-probe-item-meta-key`}>How</span>
                            <span className={`article-data-probe-item-meta-value`}>{probe.how}</span>
                        </div>
                    )}
                    {probe?.why && (
                        <div className={`article-data-probe-item-meta-row`}>
                            <span className={`article-data-probe-item-meta-key`}>Why</span>
                            <span className={`article-data-probe-item-meta-value`}>{probe.why}</span>
                        </div>
                    )}
                </div>

                <div className={`article-data-probe-item-value-toolbar`}>
                    <div className={`article-data-probe-item-value-label`}>Details</div>

                    <div className={`article-data-probe-item-value-actions`}>
                        {(status === "ok" && value) && (
                            <CopyButton text={value}
                                        label={`Copy`}
                                        variant={`pill`}
                                        buttonClassName={`article-data-probe-item-copy`}/>
                        )}

                        {canExpand && onToggleExpand && (
                            <StandardButton variant={`contrast`}
                                            className={`article-data-probe-action-btn article-data-probe-expand-btn`}
                                            label={expanded ? "Hide" : "More"}
                                            faIcon={expanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}
                                            onClick={onToggleExpand}/>
                        )}
                    </div>
                </div>

                <pre className={`article-data-probe-item-value`}>
                    {expanded ? fullText : collapsedText}
                </pre>

                {expanded && extraState?.status === "ok" && extraState?.value && (
                    <pre className={`article-data-probe-item-value article-data-probe-item-extra`}>{extraState.value}</pre>
                )}

                <div className={`article-data-probe-item-footer`}>
                    {showRequest && onRequest && (
                        <StandardButton variant={`contrast`}
                                        className={`article-data-probe-action-btn`}
                                        label={requestLabel}
                                        faIcon={requestIcon}
                                        onClick={onRequest}/>
                    )}

                    {showRequest && extraAction && extraLabel && (
                        <StandardButton variant={`contrast`}
                                        className={`article-data-probe-action-btn`}
                                        label={extraLabel}
                                        faIcon={extraIcon || "fa-solid fa-bolt"}
                                        onClick={extraAction}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArticleDataProbe

function safePretty(value) {
    try {
        return JSON.stringify(value, null, 2)
    }
    catch (_) {
        return null
    }
}

function safeBool(value) {
    try {
        return Boolean(value)
    }
    catch (_) {
        return false
    }
}

function formatBytes(bytes) {
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

function formatSeconds(seconds) {
    const s = Number(seconds)
    if (!Number.isFinite(s)) return null
    if (s === Infinity) return "infinite"
    const m = Math.floor(s / 60)
    const r = Math.floor(s % 60)
    if (m <= 0) return `${r}s`
    return `${m}m ${r}s`
}

async function sha256Hex(text) {
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

function getWebglRendererInfo() {
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

function getDisplayText(status, value, options = {}) {
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

function getCollapsedText(status, value, options = {}) {
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

function truncateText(text, maxChars) {
    const s = String(text || "")
    if (s.length <= maxChars) return s
    const cut = Math.max(0, maxChars - 1)
    return s.slice(0, cut) + "…"
}
