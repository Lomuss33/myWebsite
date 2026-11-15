import {useEffect, useRef, useState} from "react"
import {
    PASSIVE_PROBES,
    PUBLIC_IP_PROBES,
    REQUEST_PROBES,
} from "./dataProbeDefinitions.js"
import {
    buildGoogleSearchUrl,
    LIST_PREVIEW_COUNT,
    readProbePopupThemeVars,
    safeBool,
} from "./dataProbeUtils.js"

export function useDataProbeController() {
    const [unlocked, setUnlocked] = useState(false)
    const [probeStates, setProbeStates] = useState({})
    const [expanded, setExpanded] = useState({})
    const [listExpanded, setListExpanded] = useState({})
    const [passiveInitReady, setPassiveInitReady] = useState(false)
    const [searchConfirmTarget, setSearchConfirmTarget] = useState(null)
    const didInitRef = useRef(false)
    const searchConfirmTriggerRef = useRef(null)

    const passiveProbes = PASSIVE_PROBES
    const requestProbes = REQUEST_PROBES
    const publicIpProbes = PUBLIC_IP_PROBES

    useEffect(() => {
        if (passiveInitReady)
            return

        let timeoutId = null
        let idleId = null
        const trigger = () => setPassiveInitReady(true)

        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(trigger, { timeout: 700 })
        }
        else {
            timeoutId = window.setTimeout(trigger, 220)
        }

        return () => {
            if (timeoutId !== null) window.clearTimeout(timeoutId)
            if (idleId !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId)
            }
        }
    }, [passiveInitReady])

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

    useEffect(() => {
        if (!passiveInitReady || didInitRef.current) return
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
    }, [passiveInitReady, passiveProbes])

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

    const toggleListExpanded = (id) => {
        setListExpanded(prev => ({ ...prev, [id]: !prev?.[id] }))
    }

    const openSearchConfirm = ({ title, variableId, querySource = "", scopeLabel, triggerElement = null }) => {
        if (!title || !(querySource || variableId)) return

        const queryTail = querySource || variableId
        const query = `${title} ${queryTail}`
        const searchUrl = buildGoogleSearchUrl(query)
        const description = scopeLabel === "section" ?
            "This will open a new tab to research this signal group." :
            "This will open a new tab to research this signal."

        if (typeof HTMLElement !== "undefined" && triggerElement instanceof HTMLElement) {
            searchConfirmTriggerRef.current = triggerElement
        }

        setSearchConfirmTarget({
            key: `${title}:${queryTail}`,
            title: "Search Google?",
            description,
            query,
            searchUrl,
            themeVars: readProbePopupThemeVars(triggerElement)
        })
    }

    const closeSearchConfirm = () => {
        setSearchConfirmTarget(null)

        const triggerElement = searchConfirmTriggerRef.current
        searchConfirmTriggerRef.current = null
        if (typeof HTMLElement !== "undefined" && triggerElement instanceof HTMLElement && document.contains(triggerElement)) {
            window.requestAnimationFrame(() => {
                triggerElement.focus()
            })
        }
    }

    const confirmSearchAndOpen = () => {
        if (searchConfirmTarget?.searchUrl && typeof window?.open === "function") {
            window.open(searchConfirmTarget.searchUrl, "_blank", "noopener,noreferrer")
        }
        closeSearchConfirm()
    }

    const autoCount = passiveProbes.length
    const requestCount = requestProbes.length
    const publicCount = publicIpProbes.length
    const requestListExpanded = Boolean(listExpanded?.permission_gated)
    const passiveListExpanded = Boolean(listExpanded?.passive_reads)
    const visibleRequestProbes = requestListExpanded ? requestProbes : requestProbes.slice(0, LIST_PREVIEW_COUNT)
    const visiblePassiveProbes = passiveListExpanded ? passiveProbes : passiveProbes.slice(0, LIST_PREVIEW_COUNT)

    return {
        unlocked,
        setUnlocked,
        probeStates,
        expanded,
        passiveInitReady,
        searchConfirmTarget,
        passiveProbes,
        requestProbes,
        publicIpProbes,
        autoCount,
        requestCount,
        publicCount,
        requestListExpanded,
        passiveListExpanded,
        visibleRequestProbes,
        visiblePassiveProbes,
        runRequestProbe,
        runExtraAction,
        runPublicIp,
        toggleExpanded,
        toggleListExpanded,
        openSearchConfirm,
        closeSearchConfirm,
        confirmSearchAndOpen,
    }
}
