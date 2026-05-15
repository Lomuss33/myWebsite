const APP_READY_CLASS = "body-theme"
const HOME_SECTION_SELECTOR = "section#section-about.section-shown"
const STORAGE_PREFERENCES_KEY = "storage-preferences"
const DESKTOP_TARGET_SELECTOR = ".nav-tools"
const DESKTOP_RAIL_SELECTOR = ".nav-sidebar-card-wrapper"
const DESKTOP_RESUME_BAND_SELECTOR = ".nav-short-rail-resume-band"
const MOBILE_TOP_TARGET_SELECTOR = ".nav-link-pills-fixed-wrapper-shown"
const MOBILE_BOTTOM_TARGET_SELECTOR = ".nav-tab-controller-wrapper"

const GUIDE_HINT_LABELS = {
    en: {
        desktop: "Look around.",
        mobile: "Explore the edges.",
    },
    de: {
        desktop: "Schau dich um.",
        mobile: "Kanten erkunden.",
    },
    hr: {
        desktop: "Pogledaj oko sebe.",
        mobile: "Istrazi rubove.",
    },
    tr: {
        desktop: "Etrafa bak.",
        mobile: "Kenarlari kesfet.",
    },
}

const GUIDE_LABELS = {
    en: "Tap here",
    de: "bitte berühre es",
    hr: "Dodirni ovdje",
    tr: "lütfen dokun",
}

const APP_READY_TIMEOUT_MS = 10000
const DOCUMENT_COMPLETE_TIMEOUT_MS = 10000
const INITIAL_SHOW_DELAY_MS = 1100
const INACTIVITY_REPLAY_START_MS = 5000
const INACTIVITY_REPLAY_STEP_MS = 5000

const INITIAL_MOVEMENT_THRESHOLD_PX = 28

const FADE_IN_MS = 140
const TRAVEL_MS = 650
const FADE_OUT_MS = 160
const AMBIENT_START_DIP_MS = 900
const AMBIENT_START_DIP_PX = 14

const INITIAL_RADIUS_PX = 36
const MIN_TARGET_RADIUS_PX = 60
const MAX_TARGET_RADIUS_RATIO = 0.38
const TARGET_RADIUS_PADDING_PX = 14
const GUIDE_PAUSE_MS = 220

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
        ambientRafId: null,
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

    addWindowListener(state, "wheel", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
    }, { passive: true })

    addWindowListener(state, "scroll", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
    }, { passive: true })

    addWindowListener(state, "touchstart", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
    }, { passive: true })

    addWindowListener(state, "touchmove", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
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

    if(!resolveGuideTargets()) {
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

    if(state.isVisible || state.isAnimating) {
        state.lastPointerPosition = point
        handleInteraction(state, { dismissVisibleGuide: true })
        return
    }

    const previousPoint = state.lastPointerPosition
    state.lastPointerPosition = point

    if(previousPoint) {
        const distance = getDistance(previousPoint, point)

        if(!state.hasAttemptedInitialShow)
            state.initialMovementDistance += distance

        if(state.isVisible || state.isAnimating) {
            handleInteraction(state, { dismissVisibleGuide: true })
            return
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

    const guideTargets = resolveGuideTargets()
    if(!guideTargets)
        return

    const root = ensureGuideElements(state)
    if(!root)
        return
    setGuideLayoutMode(state, guideTargets.layoutMode)

    state.isAnimating = true
    state.dismissMovementDistance = 0

    const startSpotlight = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        radius: INITIAL_RADIUS_PX,
        opacity: 0,
    }

    const spotlightSteps = resolveSpotlightSteps(guideTargets)
    if(!spotlightSteps.length) {
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

    let currentSpotlight = {
        ...startSpotlight,
        opacity: 1,
    }

    for(const step of spotlightSteps) {
        if(!await animateSpotlight(state, {
            from: currentSpotlight,
            to: step.spotlight,
            durationMs: step.durationMs
        })) {
            return
        }

        currentSpotlight = step.spotlight

        if(step.pauseMs > 0 && !await waitForDuration(state, step.pauseMs))
            return
    }

    state.isAnimating = false
    state.isVisible = true
    state.dismissMovementDistance = 0
    clearTrackedTimeout(state, state.inactivityReplayTimeoutId)
    state.inactivityReplayTimeoutId = null
    startAmbientMotion(state, guideTargets)

    if(state.hasShownGuideAtLeastOnce) {
        state.nextInactivityReplayMs += INACTIVITY_REPLAY_STEP_MS
    }

    state.hasShownGuideAtLeastOnce = true
}

function hideGuide(state, { immediate = false } = {}) {
    if(!state.root)
        return

    state.isVisible = false
    stopAmbientMotion(state)

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
    label.textContent = getGuideLabel(resolveLayoutMode())

    root.appendChild(overlay)
    root.appendChild(label)
    document.body.appendChild(root)

    state.root = root
    state.overlay = overlay
    state.label = label
    return root
}

function removeGuideElements(state) {
    stopAmbientMotion(state)

    if(state.root?.parentNode)
        state.root.parentNode.removeChild(state.root)
    state.root = null
    state.overlay = null
    state.label = null
}

function setGuideLayoutMode(state, layoutMode) {
    if(!state.root)
        return

    state.root.setAttribute("data-layout", layoutMode === "mobile" ? "mobile" : "desktop")
}

function getGuideLabel(layoutMode) {
    const selectedLanguageId = getPreferredLanguageId()
    const labels = GUIDE_HINT_LABELS[selectedLanguageId] || GUIDE_HINT_LABELS.en
    return labels[layoutMode] || labels.desktop || GUIDE_HINT_LABELS.en.desktop
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

function resolveLayoutMode() {
    const topTarget = getVisibleElement(MOBILE_TOP_TARGET_SELECTOR)
    const bottomTarget = getVisibleElement(MOBILE_BOTTOM_TARGET_SELECTOR)
    return topTarget || bottomTarget ? "mobile" : "desktop"
}

function resolveGuideTargets() {
    const layoutMode = resolveLayoutMode()

    if(layoutMode === "mobile") {
        const topTarget = getVisibleElement(MOBILE_TOP_TARGET_SELECTOR)
        const bottomTarget = getVisibleElement(MOBILE_BOTTOM_TARGET_SELECTOR)

        if(!topTarget && !bottomTarget)
            return null

        return {
            layoutMode,
            topRect: getElementRect(topTarget),
            bottomRect: getElementRect(bottomTarget),
        }
    }

    const rail = getVisibleElement(DESKTOP_RAIL_SELECTOR)
    const navTools = getVisibleElement(DESKTOP_TARGET_SELECTOR)
    const resumeBand = getVisibleElement(DESKTOP_RESUME_BAND_SELECTOR)
    const railRect = getElementRect(rail)
    const toolsRect = getElementRect(navTools)
    const lowerRailRect = mergeRects(toolsRect, getElementRect(resumeBand))

    if(!railRect && !lowerRailRect)
        return null

    return {
        layoutMode,
        railRect,
        lowerRailRect: lowerRailRect || railRect,
    }
}

function resolveSpotlightSteps(targets) {
    if(!targets)
        return []

    if(targets.layoutMode === "mobile")
        return resolveMobileSpotlightSteps(targets)

    return resolveDesktopSpotlightSteps(targets)
}

function startAmbientMotion(state, initialTargets) {
    stopAmbientMotion(state)

    const targets = initialTargets || resolveGuideTargets()
    if(!targets || !state.root)
        return
    if(targets.layoutMode === "mobile")
        return

    const startedAt = performance.now()

    const tick = (now) => {
        if(state.destroyed || !state.root || !state.isVisible || state.isAnimating || !state.isHomeActive) {
            stopAmbientMotion(state)
            return
        }

        const freshTargets = resolveGuideTargets() || targets
        const elapsedMs = now - startedAt
        const ambientSpotlight = resolveAmbientSpotlight(freshTargets, elapsedMs)
        if(ambientSpotlight)
            applySpotlight(state, ambientSpotlight)

        state.ambientRafId = requestAnimationFrame(tick)
    }

    state.ambientRafId = requestAnimationFrame(tick)
}

function stopAmbientMotion(state) {
    if(state.ambientRafId !== null) {
        cancelAnimationFrame(state.ambientRafId)
        state.ambientRafId = null
    }
}

function resolveAmbientSpotlight(targets, elapsedMs) {
    if(!targets)
        return null

    if(targets.layoutMode === "mobile")
        return null

    return resolveDesktopAmbientSpotlight(targets, elapsedMs)
}

function resolveDesktopSpotlightSteps({ railRect, lowerRailRect }) {
    const driftRect = railRect || lowerRailRect
    const finalRect = lowerRailRect || railRect
    if(!driftRect || !finalRect)
        return []

    const driftSpotlight = resolveWeightedSpotlight(driftRect, {
        anchorX: 0.42,
        anchorY: 0.7,
        radiusScale: 1.22,
        minRadius: 78,
        maxRadiusRatio: 0.32,
    })
    const finalSpotlight = resolveWeightedSpotlight(finalRect, {
        anchorX: 0.32,
        anchorY: 0.82,
        radiusScale: 1.12,
        minRadius: 74,
        maxRadiusRatio: 0.3,
    })

    return compactSpotlightSteps([
        {
            spotlight: driftSpotlight,
            durationMs: Math.round(TRAVEL_MS * 0.66),
            pauseMs: 0,
        },
        {
            spotlight: finalSpotlight,
            durationMs: Math.round(TRAVEL_MS * 0.48),
            pauseMs: GUIDE_PAUSE_MS,
        },
    ])
}

function resolveDesktopAmbientSpotlight({ railRect, lowerRailRect }, elapsedMs) {
    const upperRailSpotlight = resolveWeightedSpotlight(railRect || lowerRailRect, {
        anchorX: 0.34,
        anchorY: 0.28,
        radiusScale: 1.32,
        minRadius: 86,
        maxRadiusRatio: 0.34,
    })
    const lowerRailSpotlight = resolveWeightedSpotlight(lowerRailRect || railRect, {
        anchorX: 0.32,
        anchorY: 0.82,
        radiusScale: 1.12,
        minRadius: 74,
        maxRadiusRatio: 0.3,
    })

    if(!upperRailSpotlight || !lowerRailSpotlight)
        return null

    const travel = easeInOutSine((Math.cos(elapsedMs * 0.00052) + 1) / 2)
    const glow = (Math.sin((elapsedMs * 0.0011) + 0.85) + 1) / 2
    const startDipProgress = clamp(elapsedMs / AMBIENT_START_DIP_MS, 0, 1)
    const startDip = Math.sin(startDipProgress * Math.PI) * AMBIENT_START_DIP_PX

    return {
        x: interpolate(upperRailSpotlight.x, lowerRailSpotlight.x, travel),
        y: interpolate(upperRailSpotlight.y, lowerRailSpotlight.y, travel) + startDip,
        radius: interpolate(upperRailSpotlight.radius, lowerRailSpotlight.radius, travel) + interpolate(-3, 6, glow),
        opacity: 0.9 + (glow * 0.1),
    }
}

function resolveMobileSpotlightSteps({ topRect, bottomRect }) {
    if(!topRect && !bottomRect)
        return []

    return [{
        spotlight: {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            radius: Math.min(window.innerWidth, window.innerHeight) * 0.12,
            opacity: 1,
        },
        durationMs: Math.round(TRAVEL_MS * 0.5),
        pauseMs: GUIDE_PAUSE_MS,
    }]
}

function breatheSpotlight(spotlight, elapsedMs, baseOpacity = 0.9) {
    if(!spotlight)
        return null

    const glow = (Math.sin((elapsedMs * 0.00105) + 0.45) + 1) / 2
    return {
        x: spotlight.x,
        y: spotlight.y,
        radius: spotlight.radius + interpolate(-3, 4, glow),
        opacity: baseOpacity + (glow * 0.08),
    }
}

function compactSpotlightSteps(steps) {
    return steps.filter(step => Boolean(step?.spotlight))
}

function resolveWeightedSpotlight(targetRect, {
    anchorX = 0.5,
    anchorY = 0.5,
    radiusScale = 1,
    minRadius = MIN_TARGET_RADIUS_PX,
    maxRadiusRatio = MAX_TARGET_RADIUS_RATIO,
} = {}) {
    if(!targetRect || targetRect.width <= 0 || targetRect.height <= 0)
        return null

    const centerX = targetRect.left + (targetRect.width * clamp(anchorX, 0, 1))
    const centerY = targetRect.top + (targetRect.height * clamp(anchorY, 0, 1))
    const halfDiagonal = Math.sqrt((targetRect.width ** 2) + (targetRect.height ** 2)) / 2
    const rawRadius = (halfDiagonal + TARGET_RADIUS_PADDING_PX) * radiusScale
    const maxRadius = Math.min(window.innerWidth, window.innerHeight) * maxRadiusRatio

    return {
        x: centerX,
        y: centerY,
        radius: clamp(rawRadius, minRadius, maxRadius),
        opacity: 1,
    }
}

function getVisibleElement(selector) {
    const element = document.querySelector(selector)
    const rect = getElementRect(element)
    return rect ? element : null
}

function getElementRect(element) {
    if(!element)
        return null

    const rect = element.getBoundingClientRect()
    if(rect.width <= 0 || rect.height <= 0)
        return null

    return rect
}

function mergeRects(rectA, rectB) {
    if(rectA && !rectB)
        return rectA
    if(rectB && !rectA)
        return rectB
    if(!rectA || !rectB)
        return null

    const left = Math.min(rectA.left, rectB.left)
    const top = Math.min(rectA.top, rectB.top)
    const right = Math.max(rectA.right, rectB.right)
    const bottom = Math.max(rectA.bottom, rectB.bottom)

    return {
        left,
        top,
        right,
        bottom,
        width: right - left,
        height: bottom - top,
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

function easeInOutSine(progress) {
    return -(Math.cos(Math.PI * progress) - 1) / 2
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
