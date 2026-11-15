import assert from "node:assert/strict"
import test from "node:test"
import {
    buildGoogleSearchUrl,
    extractProbeQuerySource,
    formatBytes,
    formatSeconds,
    getCollapsedText,
    getDisplayText,
    getProbeBadgeInfo,
    HIDDEN_TEXT,
    normalizeQuerySource,
    PROBE_WHAT,
    truncateText,
} from "../src/components/articles/dataProbe/dataProbeUtils.js"
import {
    PASSIVE_PROBES,
    PUBLIC_IP_PROBES,
    REQUEST_PROBES,
} from "../src/components/articles/dataProbe/dataProbeDefinitions.js"

test("formatBytes formats byte counts across unit tiers and rejects invalid values", () => {
    assert.equal(formatBytes(-1), null)
    assert.equal(formatBytes("not-a-number"), null)
    assert.equal(formatBytes(0), "0 B")
    assert.equal(formatBytes(512), "512 B")
    assert.equal(formatBytes(2048), "2.00 KB")
    assert.equal(formatBytes(15 * 1024 * 1024), "15.0 MB")
    assert.equal(formatBytes(250 * 1024 * 1024 * 1024), "250 GB")
})

test("formatSeconds formats seconds, minutes, and infinite durations", () => {
    assert.equal(formatSeconds(NaN), null)
    assert.equal(formatSeconds(Infinity), "infinite")
    assert.equal(formatSeconds(45), "45s")
    assert.equal(formatSeconds(125), "2m 5s")
})

test("extractProbeQuerySource and normalizeQuerySource strip boilerplate annotations", () => {
    assert.equal(
        extractProbeQuerySource({
            id: "ua_ch_basic",
            how: "Read from navigator.userAgentData (if supported).",
        }),
        "navigator.userAgentData"
    )
    assert.equal(
        extractProbeQuerySource({
            id: "camera_mic_labels",
            how: "Requests getUserMedia, then reads enumerateDevices() labels.",
        }),
        "getUserMedia enumerateDevices()"
    )
    assert.equal(
        normalizeQuerySource("navigator.clipboard.readText() (user gesture)"),
        "navigator.clipboard.readText()"
    )
    assert.equal(
        buildGoogleSearchUrl("User-Agent navigator.userAgent"),
        "https://www.google.com/search?q=User-Agent%20navigator.userAgent"
    )
})

test("getDisplayText, getCollapsedText, and getProbeBadgeInfo handle status and multi-line truncation", () => {
    assert.deepEqual(getProbeBadgeInfo("ok"), { badge: "AVAILABLE", badgeClass: "badge-ok" })
    assert.deepEqual(getProbeBadgeInfo("pending"), { badge: "CHECKING", badgeClass: "badge-wait" })
    assert.deepEqual(getProbeBadgeInfo("idle"), { badge: "READY", badgeClass: "badge-ready" })
    assert.deepEqual(getProbeBadgeInfo("unsupported"), { badge: "NOT SUPPORTED", badgeClass: "badge-unsupported" })
    assert.deepEqual(getProbeBadgeInfo("hidden"), { badge: "DENIED/HIDDEN", badgeClass: "badge-hidden" })

    assert.equal(getDisplayText("hidden", null), HIDDEN_TEXT)
    assert.equal(
        getDisplayText("idle", null, { thirdParty: true }),
        "No external request has been sent yet. Use the button to fetch it deliberately."
    )

    const multiLine = ["line 1", "line 2", "line 3", "line 4", "line 5"].join("\n")
    assert.equal(getCollapsedText("ok", multiLine), "line 1\nline 2\nline 3\n… (+2 lines)")
    assert.equal(truncateText("abcdef", 4), "abc…")
})

test("dataProbeDefinitions preserve all 39 probes with unique IDs and PROBE_WHAT coverage", () => {
    assert.equal(PASSIVE_PROBES.length, 24)
    assert.equal(REQUEST_PROBES.length, 13)
    assert.equal(PUBLIC_IP_PROBES.length, 2)

    const allProbes = [...PASSIVE_PROBES, ...REQUEST_PROBES, ...PUBLIC_IP_PROBES]
    const seenIds = new Set()

    for (const probe of allProbes) {
        assert.ok(probe.id, "probe must have an id")
        assert.ok(!seenIds.has(probe.id), `duplicate probe id: ${probe.id}`)
        seenIds.add(probe.id)
        assert.ok(probe.title, `probe ${probe.id} must have a title`)
        assert.ok(probe.icon, `probe ${probe.id} must have an icon`)
        assert.ok(PROBE_WHAT[probe.id], `probe ${probe.id} must have a PROBE_WHAT description`)
    }
})
