import {startupGuideLabels} from "../data/startupGuideI18n.js"

const APP_READY_CLASS = "body-theme"
const HOME_SECTION_SELECTOR = "section#section-about.section-shown"
const HOME_STATE_OBSERVE_ROOT_SELECTOR = "#root"
const STORAGE_PREFERENCES_KEY = "storage-preferences"
const DESKTOP_TARGET_SELECTOR = ".nav-tools"
const DESKTOP_RAIL_SELECTOR = ".nav-sidebar-card-wrapper"
const DESKTOP_RESUME_BAND_SELECTOR = ".nav-short-rail-resume-band"
const MOBILE_TOP_TARGET_SELECTOR = ".nav-link-pills-fixed-wrapper-shown"
const MOBILE_HEADER_SELECTOR = ".nav-header-mobile"
const MOBILE_BOTTOM_TARGET_SELECTOR = ".nav-tab-controller-wrapper"
const NAVIGATION_SELECTOR = ".layout-navigation-wrapper, .nav-sidebar, .nav-header-mobile, .nav-tab-controller-wrapper, .nav-link-pills-sticky-slot"
const TARGET_SELECTOR = [DESKTOP_TARGET_SELECTOR, DESKTOP_RAIL_SELECTOR, DESKTOP_RESUME_BAND_SELECTOR,
    MOBILE_TOP_TARGET_SELECTOR, MOBILE_HEADER_SELECTOR, MOBILE_BOTTOM_TARGET_SELECTOR].join(", ")
const ACTIVE_DIALOG_SELECTOR = '[role="dialog"][aria-modal="true"], .modal.show, .dropdown-menu.show'

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

function prefersReducedMotion() {
    return typeof window.matchMedia === "function"
        && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

let controller = null

export function destroyStartupGuide() {
    if(controller)
        destroyController(controller)
}

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
        heading: null,
        detail: null,
        topCaption: null,
        bottomCaption: null,
        observers: new Set(),
        timeouts: new Set(),
        cleanupHooks: new Set(),
        eventListeners: [],
        rafId: null,
        ambientRafId: null,
        geometryRafId: null,
        resizeObserver: null,
        observedTargets: [],
        targets: null,
        run: null,
        isDismissing: false,
        showRecorded: false,
        destroyed: false,
        isPaused: false,

        isHomeActive: false,
        isVisible: false,
        isAnimating: false,
        hasAttemptedInitialShow: false,
        hasShownGuideAtLeastOnce: false,
        initialMovementDistance: 0,
        lastPointerPosition: null,
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

    addWindowListener(state, "pointermove", (event) => {
        if(event.pointerType === "pen")
            handleMouseMove(state, event)
    }, { passive: true })

    addWindowListener(state, "wheel", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
    }, { passive: true })

    addWindowListener(state, "scroll", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
    }, { passive: true, capture: true })

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

    addWindowListener(state, "focusin", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
    }, { passive: true })

    addWindowListener(state, "keydown", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
    })

    addWindowListener(state, "pointerdown", () => {
        handleInteraction(state, { dismissVisibleGuide: true })
    }, { passive: true })

    addWindowListener(state, "resize", () => scheduleGeometryUpdate(state), { passive: true })
    addWindowListener(state, "storage", () => scheduleGeometryUpdate(state))
    const pause = () => {
        state.isPaused = true
        clearGuideTimers(state)
        hideGuide(state, { immediate: true })
    }
    const resume = () => {
        state.isPaused = false
        syncHomeState(state)
        scheduleGeometryUpdate(state)
    }
    addWindowListener(state, "app:pause", pause)
    addWindowListener(state, "app:resume", resume)
    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)")
    const updateMotion = () => {
        if(state.root && !state.isDismissing) {
            cancelGuideRun(state)
            stopAmbientMotion(state)
            completeGuideShow(state)
            state.root.style.setProperty("--startup-guide-opacity", "1")
            scheduleGeometryUpdate(state)
        }
    }
    motionQuery?.addEventListener?.("change", updateMotion)
    addCleanupHook(state, () => motionQuery?.removeEventListener?.("change", updateMotion))
    for(const type of ["resize", "scroll"]) {
        const updateGeometry = () => scheduleGeometryUpdate(state)
        window.visualViewport?.addEventListener(type, updateGeometry, { passive: true })
        addCleanupHook(state, () => window.visualViewport?.removeEventListener(type, updateGeometry))
    }

    addDocumentListener(state, "visibilitychange", () => {
        if(document.hidden)
            pause()
        else
            resume()
    })
}

function observeDomChanges(state) {
    const observerTarget = document.querySelector(HOME_STATE_OBSERVE_ROOT_SELECTOR)
        || document.body
        || document.documentElement
    if(!observerTarget)
        return

    const observer = new MutationObserver((records) => {
        const relevant = records.some(record => {
            const target = record.target.nodeType === 1 ? record.target : record.target.parentElement
            if(target?.closest?.(".text-typer"))
                return false
            if(record.type === "attributes")
                return target?.matches?.("section#section-about, " + TARGET_SELECTOR + ", .nav-sidebar, .modal, .dropdown-menu")
            if(target?.closest?.(NAVIGATION_SELECTOR) && !target?.closest?.(".layout-navigation-children-wrapper"))
                return true
            return [...record.addedNodes, ...record.removedNodes].some(node =>
                node.nodeType === 1 && (node.matches?.("section#section-about, " + TARGET_SELECTOR) ||
                    node.querySelector?.("section#section-about, " + TARGET_SELECTOR)))
        })
        if(relevant)
            scheduleGeometryUpdate(state)
    })

    state.observers.add(observer)
    observer.observe(observerTarget, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"]
    })

    const layoutObserver = new MutationObserver(() => scheduleGeometryUpdate(state))
    state.observers.add(layoutObserver)
    layoutObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-layout", "data-theme", "lang"],
    })
    state.resizeObserver = typeof ResizeObserver === "function" ?
        new ResizeObserver(() => scheduleGeometryUpdate(state)) : null
    document.fonts?.ready?.then?.(() => scheduleGeometryUpdate(state))
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
        clearGuideTimers(state)
        hideGuide(state, { immediate: true })
        return
    }

    state.targets = resolveGuideTargets()
    syncTargetObservers(state)
    if(!state.targets) {
        // Layout mode changes before React replaces the navigation. Retain the
        // visible guide during that gap; the navigation observer measures again.
        if(state.root && !state.isDismissing)
            return
        hideGuide(state, { immediate: true })
        return
    }

    if(didChange) {
        state.lastPointerPosition = null
    }

    if(!state.hasAttemptedInitialShow) {
        scheduleInitialShow(state)
        return
    }

    scheduleInactivityReplay(state)
}

function scheduleInitialShow(state) {
    if(state.destroyed || !state.isHomeActive || state.hasAttemptedInitialShow ||
        state.initialShowTimeoutId !== null || document.hidden || state.isPaused)
        return

    state.initialShowTimeoutId = trackTimeout(state, async () => {
        state.initialShowTimeoutId = null
        state.hasAttemptedInitialShow = true

        if(!canShowGuide(state)) {
            scheduleInactivityReplay(state)
            return
        }

        if(state.initialMovementDistance > INITIAL_MOVEMENT_THRESHOLD_PX) {
            scheduleInactivityReplay(state)
            return
        }

        await showGuide(state)
        scheduleInactivityReplay(state)
    }, INITIAL_SHOW_DELAY_MS)
}

function scheduleInactivityReplay(state, { restart = false } = {}) {
    if(state.destroyed || !state.isHomeActive || state.isVisible || state.isAnimating || document.hidden || state.isPaused)
        return

    const replayDelayMs = state.nextInactivityReplayMs
    if(state.inactivityReplayTimeoutId !== null && !restart)
        return
    clearTrackedTimeout(state, state.inactivityReplayTimeoutId)
    state.inactivityReplayTimeoutId = trackTimeout(state, async () => {
        state.inactivityReplayTimeoutId = null

        if(!canShowGuide(state)) {
            scheduleInactivityReplay(state)
            return
        }

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
    if(state.destroyed)
        return
    if(dismissVisibleGuide && !state.hasAttemptedInitialShow)
        state.initialMovementDistance = INITIAL_MOVEMENT_THRESHOLD_PX + 1
    if((state.isVisible || state.isAnimating) && dismissVisibleGuide) {
        hideGuide(state)
    }

    if(state.isHomeActive && !state.isVisible && !state.isAnimating)
        scheduleInactivityReplay(state, { restart: true })
}

async function showGuide(state) {
    if(!canShowGuide(state))
        return

    const guideTargets = resolveGuideTargets()
    if(!guideTargets)
        return

    const root = ensureGuideElements(state)
    if(!root)
        return
    setGuideLayoutMode(state, guideTargets.layoutMode)
    state.targets = guideTargets
    syncTargetObservers(state)
    const isReplay = state.hasShownGuideAtLeastOnce
    state.root.toggleAttribute("data-replay", isReplay)

    state.isAnimating = true
    state.isDismissing = false
    const run = beginGuideRun(state)

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

    const useSimpleFade = guideTargets.layoutMode === "mobile" || prefersReducedMotion() || isReplay
    const finalSpotlight = spotlightSteps[spotlightSteps.length - 1].spotlight
    updateGuideLabels(state, guideTargets.layoutMode)
    applyMobileLighting(state, guideTargets)
    applyLabelPosition(state, guideTargets, finalSpotlight)

    applySpotlight(state, startSpotlight)
    if(!await waitForNextFrame(state, run))
        return

    setOverlayOpacityTransition(state, FADE_IN_MS, "ease-out")

    if(useSimpleFade) {
        applySpotlight(state, {
            ...finalSpotlight,
            opacity: 1,
        })
        if(!await waitForDuration(state, FADE_IN_MS, run))
            return
    }
    else {
        applySpotlight(state, {
            ...startSpotlight,
            opacity: 1,
        })
        if(!await waitForDuration(state, FADE_IN_MS, run))
            return

        let currentSpotlight = {
            ...startSpotlight,
            opacity: 1,
        }

        for(const step of spotlightSteps) {
            if(!await animateSpotlight(state, {
                from: currentSpotlight,
                to: step.spotlight,
                durationMs: step.durationMs,
                run,
            })) {
                return
            }

            currentSpotlight = step.spotlight

            if(step.pauseMs > 0 && !await waitForDuration(state, step.pauseMs, run))
                return
        }
    }

    if(!isGuideRunActive(state, run))
        return
    completeGuideShow(state)

    if(!useSimpleFade)
        startAmbientMotion(state, guideTargets)

}

function completeGuideShow(state) {
    state.isAnimating = false
    state.isVisible = true
    clearTrackedTimeout(state, state.inactivityReplayTimeoutId)
    state.inactivityReplayTimeoutId = null
    if(!state.showRecorded) {
        if(state.hasShownGuideAtLeastOnce)
            state.nextInactivityReplayMs += INACTIVITY_REPLAY_STEP_MS
        state.hasShownGuideAtLeastOnce = true
        state.showRecorded = true
    }
}

async function hideGuide(state, { immediate = false } = {}) {
    if(state.isDismissing && !immediate)
        return
    cancelGuideRun(state)
    state.isVisible = false
    stopAmbientMotion(state)

    if(immediate || state.destroyed || !state.root) {
        removeGuideElements(state)
        state.isAnimating = false
        state.isDismissing = false
        if(state.isHomeActive)
            scheduleInactivityReplay(state)
        return
    }

    state.isAnimating = true
    state.isDismissing = true
    const run = beginGuideRun(state)
    setOverlayOpacityTransition(state, FADE_OUT_MS, "ease-in")
    state.root.style.setProperty("--startup-guide-opacity", "0")
    if(!await waitForDuration(state, FADE_OUT_MS, run))
        return
    removeGuideElements(state)
    state.isAnimating = false
    state.isDismissing = false
    if(state.isHomeActive)
        scheduleInactivityReplay(state)
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
    const heading = document.createElement("span")
    heading.className = "startup-guide-heading"
    const detail = document.createElement("span")
    detail.className = "startup-guide-detail"
    label.append(heading, detail)
    const topCaption = document.createElement("div")
    topCaption.className = "startup-guide-edge-caption startup-guide-edge-caption-top"
    const bottomCaption = document.createElement("div")
    bottomCaption.className = "startup-guide-edge-caption startup-guide-edge-caption-bottom"

    root.appendChild(overlay)
    root.appendChild(label)
    root.append(topCaption, bottomCaption)
    document.body.appendChild(root)

    state.root = root
    state.overlay = overlay
    state.label = label
    state.heading = heading
    state.detail = detail
    state.topCaption = topCaption
    state.bottomCaption = bottomCaption
    state.showRecorded = false
    return root
}

function removeGuideElements(state) {
    stopAmbientMotion(state)

    if(state.root?.parentNode)
        state.root.parentNode.removeChild(state.root)
    state.root = null
    state.overlay = null
    state.label = null
    state.heading = null
    state.detail = null
    state.topCaption = null
    state.bottomCaption = null
    syncTargetObservers(state)
}

function setGuideLayoutMode(state, layoutMode) {
    if(!state.root)
        return

    state.root.setAttribute("data-layout", layoutMode === "mobile" ? "mobile" : "desktop")
}

function applyLabelPosition(state, targets, spotlight) {
    if(!state.root || !spotlight)
        return

    const bounds = targets.viewport
    const margin = Math.min(20, bounds.width * 0.04)
    state.root.style.setProperty("--startup-guide-label-max-width", `${Math.max(1, bounds.width - margin * 2)}px`)
    const labelRect = state.label.getBoundingClientRect()
    const mobile = targets.layoutMode === "mobile"
    const desiredX = mobile ? bounds.left + (bounds.width - labelRect.width) / 2 : spotlight.x + spotlight.radius + 22
    const contentTop = targets.topRect?.bottom ?? bounds.top
    const contentBottom = targets.bottomRect?.top ?? bounds.bottom
    const desiredY = mobile ? (contentTop + contentBottom) / 2 : spotlight.y
    const labelX = clamp(desiredX, bounds.left + margin, Math.max(bounds.left + margin, bounds.right - labelRect.width - margin))
    const labelY = clamp(desiredY, bounds.top + margin + labelRect.height / 2,
        Math.max(bounds.top + margin + labelRect.height / 2, bounds.bottom - margin - labelRect.height / 2))
    state.root.style.setProperty("--startup-guide-label-x", `${roundTo(labelX, 2)}px`)
    state.root.style.setProperty("--startup-guide-label-y", `${roundTo(labelY, 2)}px`)
    const edgeInset = resolveMobileFeather(targets)
    for(const [caption, edge, offset] of [[state.topCaption, targets.topRect?.bottom, edgeInset],
        [state.bottomCaption, targets.bottomRect?.top, -edgeInset]]) {
        if(!caption)
            continue
        caption.hidden = !mobile || edge === undefined
        if(caption.hidden)
            continue
        const rect = caption.getBoundingClientRect()
        const y = edge + offset + (offset > 0 ? rect.height / 2 : -rect.height / 2)
        // Keep captions separate from the main message on very short screens.
        caption.hidden = Math.abs(y - labelY) < (rect.height + labelRect.height) / 2 + 16
        caption.style.left = `${bounds.left + bounds.width / 2}px`
        caption.style.top = `${clamp(y, bounds.top + rect.height / 2 + margin, bounds.bottom - rect.height / 2 - margin)}px`
    }
}

function canShowGuide(state) {
    if(state.destroyed || !state.isHomeActive || state.isVisible || state.isAnimating || document.hidden || state.isPaused)
        return false

    if(document.querySelector(ACTIVE_DIALOG_SELECTOR))
        return false

    const activeElement = document.activeElement
    return !activeElement?.matches?.("input, textarea, select, [contenteditable='true']")
}

function updateGuideLabels(state, layoutMode) {
    const labels = startupGuideLabels[getPreferredLanguageId()] || startupGuideLabels.en
    state.heading.textContent = labels[layoutMode] || labels.desktop
    state.detail.textContent = layoutMode === "mobile" ? labels.mobileDetail : labels.desktopDetail
    state.detail.hidden = !state.detail.textContent
    state.topCaption.textContent = labels.top
    state.bottomCaption.textContent = labels.bottom
}

function getPreferredLanguageId() {
    try {
        const raw = window.localStorage.getItem(STORAGE_PREFERENCES_KEY)
        if(raw) {
            const parsed = JSON.parse(raw)
            const preferredLanguageId = parsed?.preferredLanguage
            if(typeof preferredLanguageId === "string" && startupGuideLabels[preferredLanguageId])
                return preferredLanguageId
        }
    }
    catch {
        // Ignore storage parsing issues and fall back to browser language.
    }

    const browserLanguage = String(navigator.language || "en").trim().toLowerCase().split("-")[0]
    return startupGuideLabels[browserLanguage] ? browserLanguage : "en"
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
    return document.documentElement.dataset.layout === "mobile" ? "mobile" : "desktop"
}

function resolveGuideTargets() {
    const layoutMode = resolveLayoutMode()
    const viewport = getViewportRect()
    const elements = []
    const measure = (selector) => {
        const element = document.querySelector(selector)
        const rect = getElementRect(element, viewport)
        if(rect)
            elements.push(element)
        return rect
    }

    if(layoutMode === "mobile") {
        const topRect = mergeRects(measure(MOBILE_HEADER_SELECTOR), measure(MOBILE_TOP_TARGET_SELECTOR))
        const bottomRect = measure(MOBILE_BOTTOM_TARGET_SELECTOR)

        if(!topRect && !bottomRect)
            return null

        return {
            layoutMode,
            viewport,
            elements,
            topRect,
            bottomRect,
        }
    }

    const railRect = measure(DESKTOP_RAIL_SELECTOR)
    const lowerRailRect = mergeRects(measure(DESKTOP_TARGET_SELECTOR), measure(DESKTOP_RESUME_BAND_SELECTOR))

    if(!railRect && !lowerRailRect)
        return null

    return {
        layoutMode,
        viewport,
        elements,
        railRect,
        lowerRailRect: lowerRailRect || railRect,
    }
}

function getViewportRect() {
    const viewport = window.visualViewport
    const left = viewport?.offsetLeft || 0
    const top = viewport?.offsetTop || 0
    const width = viewport?.width || window.innerWidth
    const height = viewport?.height || window.innerHeight
    return { left, top, width, height, right: left + width, bottom: top + height }
}

function targetSignature(targets) {
    if(!targets)
        return ""
    return [targets.layoutMode, ...[targets.viewport, targets.topRect, targets.bottomRect,
        targets.railRect, targets.lowerRailRect].flatMap(rect => rect ?
        [rect.left, rect.top, rect.width, rect.height].map(value => roundTo(value, 2)) : [null])].join("|")
}

function syncTargetObservers(state) {
    if(!state.resizeObserver || state.destroyed)
        return
    const elements = [...(state.targets?.elements || []), ...(state.label ? [state.label] : [])]
    state.observedTargets.filter(element => !elements.includes(element))
        .forEach(element => state.resizeObserver.unobserve(element))
    elements.filter(element => !state.observedTargets.includes(element))
        .forEach(element => state.resizeObserver.observe(element))
    state.observedTargets = elements
}

function scheduleGeometryUpdate(state) {
    if(state.destroyed || state.geometryRafId !== null)
        return
    state.geometryRafId = requestAnimationFrame(() => {
        state.geometryRafId = null
        if(document.hidden || state.isPaused)
            return
        const previousSignature = targetSignature(state.targets)
        syncHomeState(state)
        if(!state.root || !state.targets || state.isDismissing)
            return
        const changed = previousSignature !== targetSignature(state.targets)
        if(changed) {
            cancelGuideRun(state)
            stopAmbientMotion(state)
        }
        setGuideLayoutMode(state, state.targets.layoutMode)
        updateGuideLabels(state, state.targets.layoutMode)
        applyMobileLighting(state, state.targets)
        const steps = resolveSpotlightSteps(state.targets)
        const finalSpotlight = steps[steps.length - 1]?.spotlight
        if(!finalSpotlight)
            return
        applyLabelPosition(state, state.targets, finalSpotlight)
        if(changed) {
            applySpotlight(state, { ...finalSpotlight, opacity: 1 })
            completeGuideShow(state)
        }
        if(state.isVisible && !state.root.hasAttribute("data-replay"))
            startAmbientMotion(state)
    })
}

function resolveMobileFeather(targets) {
    const top = targets.topRect?.bottom ?? targets.viewport.top
    const bottom = targets.bottomRect?.top ?? targets.viewport.bottom
    return Math.min(clamp(targets.viewport.height * 0.085, 48, 112), Math.max(0, (bottom - top) / 2))
}

function applyMobileLighting(state, targets) {
    if(targets.layoutMode !== "mobile" || !state.root)
        return
    const top = targets.topRect?.bottom ?? targets.viewport.top
    const bottom = targets.bottomRect?.top ?? targets.viewport.bottom
    const feather = resolveMobileFeather(targets)
    for(const [property, value] of Object.entries({
        "top-clear": top,
        "top-soft": top + feather * 0.4,
        "top-shade": top + feather,
        "bottom-shade": bottom - feather,
        "bottom-soft": bottom - feather * 0.4,
        "bottom-clear": bottom,
    }))
        state.root.style.setProperty(`--startup-guide-${property}`, `${roundTo(value, 2)}px`)
}

function clearGuideTimers(state) {
    clearTrackedTimeout(state, state.initialShowTimeoutId)
    clearTrackedTimeout(state, state.inactivityReplayTimeoutId)
    state.initialShowTimeoutId = null
    state.inactivityReplayTimeoutId = null
}

function beginGuideRun(state) {
    cancelGuideRun(state)
    const run = new AbortController()
    state.run = run
    return run
}

function cancelGuideRun(state) {
    state.run?.abort()
    state.run = null
}

function isGuideRunActive(state, run) {
    return !state.destroyed && state.run === run && !run.signal.aborted && Boolean(state.root) && state.isHomeActive
}

function resolveSpotlightSteps(targets) {
    if(!targets)
        return []

    if(targets.layoutMode === "mobile")
        return resolveMobileSpotlightSteps(targets)

    return resolveDesktopSpotlightSteps(targets)
}

function startAmbientMotion(state, initialTargets) {
    if(state.ambientRafId !== null || prefersReducedMotion())
        return

    const targets = initialTargets || state.targets
    if(!targets || !state.root)
        return
    if(targets.layoutMode === "mobile")
        return

    const startedAt = performance.now()

    const tick = (now) => {
        if(state.destroyed || !state.root || !state.isVisible || state.isAnimating || !state.isHomeActive ||
            document.hidden || state.isPaused || prefersReducedMotion() || state.targets?.layoutMode !== "desktop") {
            stopAmbientMotion(state)
            return
        }

        const freshTargets = state.targets || targets
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

function getElementRect(element, viewport = getViewportRect()) {
    if(!element)
        return null

    const rect = element.getBoundingClientRect()
    const style = getComputedStyle(element)
    if(rect.width <= 0 || rect.height <= 0 || style.visibility === "hidden" || style.display === "none")
        return null

    const left = Math.max(rect.left, viewport.left)
    const top = Math.max(rect.top, viewport.top)
    const right = Math.min(rect.right, viewport.right)
    const bottom = Math.min(rect.bottom, viewport.bottom)
    return right > left && bottom > top ? { left, top, right, bottom, width: right - left, height: bottom - top } : null
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

function setOverlayOpacityTransition(state, durationMs, timingFunction) {
    if(!state.root)
        return

    state.root.style.transition = `opacity ${durationMs}ms ${timingFunction}`
}

function animateSpotlight(state, { from, to, durationMs, run }) {
    return new Promise(resolve => {
        if(!isGuideRunActive(state, run)) {
            resolve(false)
            return
        }

        let settled = false
        let frameId = null
        const startedAt = performance.now()

        const finish = (value) => {
            if(settled)
                return

            settled = true
            run.signal.removeEventListener("abort", abort)
            if(frameId !== null)
                cancelAnimationFrame(frameId)
            if(state.rafId === frameId)
                state.rafId = null
            resolve(value && isGuideRunActive(state, run))
        }

        const abort = () => finish(false)
        run.signal.addEventListener("abort", abort, { once: true })

        const tick = (now) => {
            if(!isGuideRunActive(state, run)) {
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

            frameId = requestAnimationFrame(tick)
            state.rafId = frameId
        }

        frameId = requestAnimationFrame(tick)
        state.rafId = frameId
    })
}

function waitForNextFrame(state, run) {
    return new Promise(resolve => {
        if(!isGuideRunActive(state, run)) {
            resolve(false)
            return
        }

        let settled = false
        let frameId = null

        const finish = (value) => {
            if(settled)
                return

            settled = true
            run.signal.removeEventListener("abort", abort)
            if(frameId !== null)
                cancelAnimationFrame(frameId)
            if(state.rafId === frameId)
                state.rafId = null
            resolve(value && isGuideRunActive(state, run))
        }

        const abort = () => finish(false)
        run.signal.addEventListener("abort", abort, { once: true })
        frameId = requestAnimationFrame(() => finish(true))
        state.rafId = frameId
    })
}

function waitForDuration(state, durationMs, run) {
    return new Promise(resolve => {
        if(!isGuideRunActive(state, run)) {
            resolve(false)
            return
        }

        let settled = false

        const finish = (value) => {
            if(settled)
                return

            settled = true
            run.signal.removeEventListener("abort", abort)
            clearTrackedTimeout(state, timeoutId)
            resolve(value && isGuideRunActive(state, run))
        }

        const abort = () => finish(false)
        run.signal.addEventListener("abort", abort, { once: true })
        const timeoutId = trackTimeout(state, () => finish(true), durationMs)
    })
}

function addWindowListener(state, type, handler, options = {}) {
    window.addEventListener(type, handler, options)
    state.eventListeners.push({ target: window, type, handler, options })
}

function addDocumentListener(state, type, handler, options = {}) {
    document.addEventListener(type, handler, options)
    state.eventListeners.push({ target: document, type, handler, options })
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
    cancelGuideRun(state)
    state.resizeObserver?.disconnect()
    if(state.geometryRafId !== null)
        cancelAnimationFrame(state.geometryRafId)

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
        listener.target.removeEventListener(listener.type, listener.handler, listener.options)
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
