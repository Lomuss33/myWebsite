const APP_READY_CLASS = "body-theme"
const TARGET_SELECTOR = ".nav-tools"
const HOME_SECTION_SELECTOR = "section#section-about.section-shown"
const STORAGE_PREFERENCES_KEY = "storage-preferences"

const GUIDE_HINT_LABELS = {
    en: "hover + click around",
    de: "hovern + alles klicken",
    hr: "predji + klikni sve",
    tr: "uzerine gel + tikla",
}

const GUIDE_LABELS = {
    en: "please touch it",
    de: "bitte berühre es",
    hr: "molim te dotakni to",
    tr: "lütfen dokun",
}

const APP_READY_TIMEOUT_MS = 10000
const DOCUMENT_COMPLETE_TIMEOUT_MS = 10000
const INITIAL_SHOW_DELAY_MS = 1100
const INACTIVITY_REPLAY_START_MS = 5000
const INACTIVITY_REPLAY_STEP_MS = 5000

const INITIAL_MOVEMENT_THRESHOLD_PX = 28
const DISMISS_MOVEMENT_THRESHOLD_PX = 90

const FADE_IN_MS = 140
const TRAVEL_MS = 650
const FADE_OUT_MS = 160

const INITIAL_RADIUS_PX = 36
const MIN_TARGET_RADIUS_PX = 60
const MAX_TARGET_RADIUS_RATIO = 0.38
const TARGET_RADIUS_PADDING_PX = 14

let controller = null

export function initStartupGuide() {
    if(controller)
        return

    if(typeof window === "undefined" || typeof document === "undefined")
        return

    controller = createController()
    void startController(controller)
}

function createController() {
    return {
        root: null,
        overlay: null,
        label: null,
        observers: new Set(),
        timeouts: new Set(),
        cleanupHooks: new Set(),
        eventListeners: [],
        rafId: null,
        destroyed: false,

        isHomeActive: false,
        isVisible: false,
        isAnimating: false,
        hasAttemptedInitialShow: false,
        hasShownGuideAtLeastOnce: false,
        initialMovementDistance: 0,
        dismissMovementDistance: 0,
        lastPointerPosition: null,
        lastInteractionAt: performance.now(),
        inactivityReplayTimeoutId: null,
        initialShowTimeoutId: null,
        nextInactivityReplayMs: INACTIVITY_REPLAY_START_MS,
    }
}

async function startController(state) {
    const isAppReady = await waitForAppReady(state)
    if(!isAppReady || state.destroyed)
        return destroyController(state)

    const isDocumentComplete = await waitForDocumentComplete(state)
    if(!isDocumentComplete || state.destroyed)
        return destroyController(state)

    registerGlobalListeners(state)
    observeDomChanges(state)
    syncHomeState(state)
}

function waitForAppReady(state) {
    if(document.body?.classList.contains(APP_READY_CLASS))
        return Promise.resolve(true)

    if(!document.body)
        return Promise.resolve(false)

    return new Promise(resolve => {
        let settled = false

        const finish = (value) => {
            if(settled)
                return

            settled = true
            removeCleanupHook()
            observer.disconnect()
            state.observers.delete(observer)
            clearTrackedTimeout(state, timeoutId)
            resolve(value)
        }

        const observer = new MutationObserver(() => {
            if(document.body?.classList.contains(APP_READY_CLASS))
                finish(true)
        })

        state.observers.add(observer)
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"]
        })

        const removeCleanupHook = addCleanupHook(state, () => finish(false))
        const timeoutId = trackTimeout(state, () => {
            finish(document.body?.classList.contains(APP_READY_CLASS))
        }, APP_READY_TIMEOUT_MS)
    })
}

function waitForDocumentComplete(state) {
    if(document.readyState === "complete")
        return Promise.resolve(true)

    return new Promise(resolve => {
        let settled = false

        const finish = (value) => {
            if(settled)
                return

            settled = true
            removeCleanupHook()
            clearTrackedTimeout(state, timeoutId)
            window.removeEventListener("load", handleLoad)
            resolve(value)
        }

        const handleLoad = () => finish(true)

        const removeCleanupHook = addCleanupHook(state, () => finish(false))
        const timeoutId = trackTimeout(state, () => {
            finish(document.readyState === "complete")
        }, DOCUMENT_COMPLETE_TIMEOUT_MS)

        window.addEventListener("load", handleLoad, { once: true })
    })
}

function registerGlobalListeners(state) {
    addWindowListener(state, "mousemove", (event) => {
        handleMouseMove(state, event)
    }, { passive: true })

    addWindowListener(state, "mousedown", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
    }, { passive: true })

    addWindowListener(state, "click", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
    }, { passive: true })
}

function observeDomChanges(state) {
    const observerTarget = document.body || document.documentElement
    if(!observerTarget)
        return

    const observer = new MutationObserver(() => {
        syncHomeState(state)
    })

    state.observers.add(observer)
    observer.observe(observerTarget, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"]
    })
}

function syncHomeState(state) {
    if(state.destroyed)
        return

    const isHomeActive = Boolean(document.querySelector(HOME_SECTION_SELECTOR))
    const didChange = state.isHomeActive !== isHomeActive
    state.isHomeActive = isHomeActive

    if(!isHomeActive) {
        state.lastPointerPosition = null
        state.initialMovementDistance = 0
        state.dismissMovementDistance = 0
        clearTrackedTimeout(state, state.initialShowTimeoutId)
        state.initialShowTimeoutId = null
        clearTrackedTimeout(state, state.inactivityReplayTimeoutId)
        state.inactivityReplayTimeoutId = null
        hideGuide(state, { immediate: true })
        return
    }

    const navTools = getNavTools()
    if(!navTools) {
        hideGuide(state, { immediate: true })
        return
    }

    if(didChange) {
        state.lastInteractionAt = performance.now()
        state.lastPointerPosition = null
        state.dismissMovementDistance = 0
    }

    if(!state.hasAttemptedInitialShow) {
        scheduleInitialShow(state)
        return
    }

    scheduleInactivityReplay(state)
}

function scheduleInitialShow(state) {
    if(state.destroyed || !state.isHomeActive || state.hasAttemptedInitialShow)
        return

    clearTrackedTimeout(state, state.initialShowTimeoutId)
    state.initialShowTimeoutId = trackTimeout(state, async () => {
        state.initialShowTimeoutId = null
        state.hasAttemptedInitialShow = true

        if(!state.isHomeActive || state.isVisible || state.isAnimating)
            return

        if(state.initialMovementDistance > INITIAL_MOVEMENT_THRESHOLD_PX) {
            scheduleInactivityReplay(state)
            return
        }

        await showGuide(state)
        scheduleInactivityReplay(state)
    }, INITIAL_SHOW_DELAY_MS)
}

function scheduleInactivityReplay(state) {
    if(state.destroyed || !state.isHomeActive || state.isVisible || state.isAnimating)
        return

    const replayDelayMs = state.nextInactivityReplayMs
    clearTrackedTimeout(state, state.inactivityReplayTimeoutId)
    state.inactivityReplayTimeoutId = trackTimeout(state, async () => {
        state.inactivityReplayTimeoutId = null

        if(!state.isHomeActive || state.isVisible || state.isAnimating)
            return

        await showGuide(state)
        if(!state.isVisible)
            scheduleInactivityReplay(state)
    }, replayDelayMs)
}

function handleMouseMove(state, event) {
    const point = {
        x: event.clientX,
        y: event.clientY
    }

    const previousPoint = state.lastPointerPosition
    state.lastPointerPosition = point

    if(previousPoint) {
        const distance = getDistance(previousPoint, point)

        if(!state.hasAttemptedInitialShow)
            state.initialMovementDistance += distance

        if(state.isVisible || state.isAnimating) {
            state.dismissMovementDistance += distance

            if(state.dismissMovementDistance >= DISMISS_MOVEMENT_THRESHOLD_PX) {
                handleInteraction(state, { dismissVisibleGuide: true })
                return
            }
        }
    }

    handleInteraction(state, {
        dismissVisibleGuide: false
    })
}

function handleInteraction(state, { dismissVisibleGuide }) {
    state.lastInteractionAt = performance.now()

    if(state.isVisible && dismissVisibleGuide) {
        hideGuide(state)
    }

    if(state.isHomeActive && !state.isVisible && !state.isAnimating)
        scheduleInactivityReplay(state)
}

async function showGuide(state) {
    if(state.destroyed || !state.isHomeActive || state.isVisible || state.isAnimating)
        return

    const navTools = getNavTools()
    if(!navTools)
        return

    const targetRect = navTools.getBoundingClientRect()
    if(targetRect.width <= 0 || targetRect.height <= 0)
        return

    const root = ensureGuideElements(state)
    if(!root)
        return

    state.isAnimating = true
    state.dismissMovementDistance = 0

    const startSpotlight = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        radius: INITIAL_RADIUS_PX,
        opacity: 0,
    }

    const endSpotlight = resolveTargetSpotlight(targetRect)
    if(!endSpotlight) {
        state.isAnimating = false
        return
    }

    applySpotlight(state, startSpotlight)
    if(!await waitForNextFrame(state))
        return

    setOverlayOpacityTransition(state, FADE_IN_MS, "ease-out")
    applySpotlight(state, {
        ...startSpotlight,
        opacity: 1,
    })
    if(!await waitForDuration(state, FADE_IN_MS))
        return

    if(!await animateSpotlight(state, {
        from: {
            ...startSpotlight,
            opacity: 1,
        },
        to: endSpotlight,
        durationMs: TRAVEL_MS
    })) {
        return
    }

    state.isAnimating = false
    state.isVisible = true
    state.dismissMovementDistance = 0
    clearTrackedTimeout(state, state.inactivityReplayTimeoutId)
    state.inactivityReplayTimeoutId = null

    if(state.hasShownGuideAtLeastOnce) {
        state.nextInactivityReplayMs += INACTIVITY_REPLAY_STEP_MS
    }

    state.hasShownGuideAtLeastOnce = true
}

function hideGuide(state, { immediate = false } = {}) {
    if(!state.root)
        return

    state.isVisible = false

    if(immediate || state.destroyed) {
        removeGuideElements(state)
        state.isAnimating = false
        if(state.isHomeActive)
            scheduleInactivityReplay(state)
        return
    }

    if(state.isAnimating) {
        removeGuideElements(state)
        state.isAnimating = false
        if(state.isHomeActive)
            scheduleInactivityReplay(state)
        return
    }

    state.isAnimating = true
    setOverlayOpacityTransition(state, FADE_OUT_MS, "ease-in")
    applySpotlight(state, {
        ...resolveCurrentSpotlight(state),
        opacity: 0,
    })

    const fadeOutTimeoutId = trackTimeout(state, () => {
        removeGuideElements(state)
        state.isAnimating = false
        if(state.isHomeActive)
            scheduleInactivityReplay(state)
    }, FADE_OUT_MS)

    addCleanupHook(state, () => clearTrackedTimeout(state, fadeOutTimeoutId))
}

function ensureGuideElements(state) {
    if(state.root?.isConnected)
        return state.root

    if(!document.body)
        return null

    const root = document.createElement("div")
    root.className = "startup-guide-root"
    root.setAttribute("aria-hidden", "true")

    const overlay = document.createElement("div")
    overlay.className = "startup-guide-overlay"

    const label = document.createElement("div")
    label.className = "startup-guide-overlay-label"
    label.textContent = getGuideLabel()

    root.appendChild(overlay)
    root.appendChild(label)
    document.body.appendChild(root)

    state.root = root
    state.overlay = overlay
    state.label = label
    return root
}

function removeGuideElements(state) {
    if(state.root?.parentNode)
        state.root.parentNode.removeChild(state.root)
    state.root = null
    state.overlay = null
    state.label = null
}

function getNavTools() {
    return document.querySelector(TARGET_SELECTOR)
}

function getGuideLabel() {
    const selectedLanguageId = getPreferredLanguageId()
    return GUIDE_HINT_LABELS[selectedLanguageId] || GUIDE_HINT_LABELS.en
}

function getPreferredLanguageId() {
    try {
        const raw = window.localStorage.getItem(STORAGE_PREFERENCES_KEY)
        if(raw) {
            const parsed = JSON.parse(raw)
            const preferredLanguageId = parsed?.preferredLanguage
            if(typeof preferredLanguageId === "string" && GUIDE_HINT_LABELS[preferredLanguageId])
                return preferredLanguageId
        }
    }
    catch {
        // Ignore storage parsing issues and fall back to browser language.
    }

    const browserLanguage = String(navigator.language || "en").trim().toLowerCase().split("-")[0]
    return GUIDE_HINT_LABELS[browserLanguage] ? browserLanguage : "en"
}

function applySpotlight(state, { x, y, radius, opacity }) {
    if(!state.root)
        return

    state.root.style.setProperty("--spotlight-x", `${roundTo(x, 2)}px`)
    state.root.style.setProperty("--spotlight-y", `${roundTo(y, 2)}px`)
    state.root.style.setProperty("--spotlight-radius", `${roundTo(radius, 2)}px`)
    state.root.style.setProperty("--startup-guide-opacity", `${clamp(opacity, 0, 1)}`)
}

function resolveTargetSpotlight(targetRect) {
    if(!targetRect || targetRect.width <= 0 || targetRect.height <= 0)
        return null

    const centerX = targetRect.left + (targetRect.width / 2)
    const centerY = targetRect.top + (targetRect.height / 2)
    const halfDiagonal = Math.sqrt((targetRect.width ** 2) + (targetRect.height ** 2)) / 2
    const rawRadius = halfDiagonal + TARGET_RADIUS_PADDING_PX
    const maxRadius = Math.min(window.innerWidth, window.innerHeight) * MAX_TARGET_RADIUS_RATIO

    return {
        x: centerX,
        y: centerY,
        radius: clamp(rawRadius, MIN_TARGET_RADIUS_PX, maxRadius),
        opacity: 1,
    }
}

function resolveCurrentSpotlight(state) {
    if(!state.root) {
        return {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            radius: INITIAL_RADIUS_PX,
            opacity: 0,
        }
    }

    const style = getComputedStyle(state.root)
    return {
        x: parseFloat(style.getPropertyValue("--spotlight-x")) || (window.innerWidth / 2),
        y: parseFloat(style.getPropertyValue("--spotlight-y")) || (window.innerHeight / 2),
        radius: parseFloat(style.getPropertyValue("--spotlight-radius")) || INITIAL_RADIUS_PX,
        opacity: parseFloat(style.getPropertyValue("--startup-guide-opacity")) || 0,
    }
}

function setOverlayOpacityTransition(state, durationMs, timingFunction) {
    if(!state.overlay)
        return

    state.overlay.style.transition = `opacity ${durationMs}ms ${timingFunction}`
}

function animateSpotlight(state, { from, to, durationMs }) {
    return new Promise(resolve => {
        if(state.destroyed) {
            resolve(false)
            return
        }

        let settled = false
        const startedAt = performance.now()

        const finish = (value) => {
            if(settled)
                return

            settled = true
            removeCleanupHook()
            if(state.rafId !== null) {
                cancelAnimationFrame(state.rafId)
                state.rafId = null
            }
            resolve(value)
        }

        const removeCleanupHook = addCleanupHook(state, () => finish(false))

        const tick = (now) => {
            if(state.destroyed || !state.root || !state.overlay || !state.isHomeActive) {
                finish(false)
                return
            }

            const elapsed = now - startedAt
            const progress = clamp(elapsed / durationMs, 0, 1)
            const easedProgress = easeOutCubic(progress)

            applySpotlight(state, {
                x: interpolate(from.x, to.x, easedProgress),
                y: interpolate(from.y, to.y, easedProgress),
                radius: interpolate(from.radius, to.radius, easedProgress),
                opacity: interpolate(from.opacity, to.opacity, easedProgress),
            })

            if(progress >= 1) {
                finish(true)
                return
            }

            state.rafId = requestAnimationFrame(tick)
        }

        state.rafId = requestAnimationFrame(tick)
    })
}

function waitForNextFrame(state) {
    return new Promise(resolve => {
        if(state.destroyed) {
            resolve(false)
            return
        }

        let settled = false

        const finish = (value) => {
            if(settled)
                return

            settled = true
            removeCleanupHook()
            if(state.rafId !== null) {
                cancelAnimationFrame(state.rafId)
                state.rafId = null
            }
            resolve(value)
        }

        const removeCleanupHook = addCleanupHook(state, () => finish(false))
        state.rafId = requestAnimationFrame(() => finish(true))
    })
}

function waitForDuration(state, durationMs) {
    return new Promise(resolve => {
        if(state.destroyed) {
            resolve(false)
            return
        }

        let settled = false

        const finish = (value) => {
            if(settled)
                return

            settled = true
            removeCleanupHook()
            clearTrackedTimeout(state, timeoutId)
            resolve(value)
        }

        const removeCleanupHook = addCleanupHook(state, () => finish(false))
        const timeoutId = trackTimeout(state, () => finish(true), durationMs)
    })
}

function addWindowListener(state, type, handler, options = {}) {
    window.addEventListener(type, handler, options)
    state.eventListeners.push({ type, handler, options })
}

function addCleanupHook(state, callback) {
    state.cleanupHooks.add(callback)
    return () => {
        state.cleanupHooks.delete(callback)
    }
}

function trackTimeout(state, callback, delay) {
    const timeoutId = window.setTimeout(() => {
        state.timeouts.delete(timeoutId)
        callback()
    }, delay)

    state.timeouts.add(timeoutId)
    return timeoutId
}

function clearTrackedTimeout(state, timeoutId) {
    if(timeoutId == null)
        return

    window.clearTimeout(timeoutId)
    state.timeouts.delete(timeoutId)
}

function destroyController(state) {
    if(!state || state.destroyed)
        return

    state.destroyed = true

    for(const callback of state.cleanupHooks)
        callback()
    state.cleanupHooks.clear()

    for(const observer of state.observers)
        observer.disconnect()
    state.observers.clear()

    for(const timeoutId of state.timeouts)
        window.clearTimeout(timeoutId)
    state.timeouts.clear()

    if(state.rafId !== null) {
        cancelAnimationFrame(state.rafId)
        state.rafId = null
    }

    for(const listener of state.eventListeners)
        window.removeEventListener(listener.type, listener.handler, listener.options)
    state.eventListeners = []

    removeGuideElements(state)
    controller = null
}

function getDistance(from, to) {
    const deltaX = to.x - from.x
    const deltaY = to.y - from.y
    return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))
}

function interpolate(from, to, progress) {
    return from + ((to - from) * progress)
}

function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3)
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

function roundTo(value, decimals) {
    const multiplier = 10 ** decimals
    return Math.round(value * multiplier) / multiplier
}
