/**
 * @author Lovro Music
 * @date 2025-05-10
 * @description This provider tracks the viewport size and scroll position, and provides utility functions to manage breakpoints and layout constraints.
 */

import React, {createContext, useContext, useEffect, useRef, useState, useSyncExternalStore} from 'react'
import {useUtils} from "../hooks/utils.js"
import {useScheduler} from "../hooks/scheduler.js"
import {useData} from "./DataProvider.jsx"

const getScrollPositionSnapshot = () => {
    if(typeof window === "undefined") {
        return { x: 0, y: 0 }
    }

    return {
        x: window.scrollX || 0,
        y: window.scrollY || 0
    }
}

const scrollStore = {
    position: getScrollPositionSnapshot(),
    listeners: new Set()
}

const subscribeToScrollStore = (listener) => {
    scrollStore.listeners.add(listener)
    return () => {
        scrollStore.listeners.delete(listener)
    }
}

const updateScrollStore = (nextPosition) => {
    scrollStore.position = nextPosition
    for(const listener of scrollStore.listeners) {
        listener()
    }
}

function ViewportProvider({ children }) {
    const data = useData()
    const utils = useUtils()
    const scheduler = useScheduler()

    const bootstrapBreakpoints = utils.css.BREAKPOINTS
    const tag = "viewport-provider"
    const resizeTag = `${tag}-resize`

    const scrollPositionRef = useRef(getScrollPositionSnapshot())
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    const [clipboardText, setClipboardText] = useState(null)

    useEffect(() => {
        _createListeners()
        if(utils.device.isTouchDevice() && utils.device.isAndroid())
             document.body.classList.add("body-android")

        return () => _destroyListeners()
    }, [])

    const _createListeners = () => {
        window.addEventListener('scroll', _onScroll, { passive: true })
        window.addEventListener('resize', _onResize)
        window.visualViewport?.addEventListener('resize', _onVisualViewportChange)
        window.visualViewport?.addEventListener('scroll', _onVisualViewportChange)

        _onScroll()
        _applyResize()
    }

    const _destroyListeners = () => {
        window.removeEventListener('scroll', _onScroll)
        window.removeEventListener('resize', _onResize)
        window.visualViewport?.removeEventListener('resize', _onVisualViewportChange)
        window.visualViewport?.removeEventListener('scroll', _onVisualViewportChange)

        scheduler.clearAllWithTag(tag)
        scheduler.clearAllWithTag(resizeTag)
        _clearVisualViewportMetrics()
    }

    const _onScroll = () => {
        const nextPosition = {
            x: window.scrollX || 0,
            y: window.scrollY || 0
        }

        scrollPositionRef.current = nextPosition
        updateScrollStore(nextPosition)
        _syncVisualViewportMetrics()
    }

    const _applyResize = () => {
        setInnerWidth(window.innerWidth)
        setInnerHeight(window.innerHeight)
        _syncVisualViewportMetrics()
    }

    const _onResize = () => {
        scheduler.clearAllWithTag(resizeTag)
        scheduler.schedule(() => {
            _applyResize()
        }, 120, resizeTag)
    }

    const _onVisualViewportChange = () => {
        _syncVisualViewportMetrics()
    }

    const _syncVisualViewportMetrics = () => {
        const rootStyle = document?.documentElement?.style
        if(!rootStyle)
            return

        const visualViewport = window.visualViewport
        const viewportOffsetTop = Math.max(0, Math.round(visualViewport?.offsetTop || 0))
        const visualViewportHeight = Math.max(0, Math.round(visualViewport?.height || window.innerHeight || 0))
        const viewportOffsetBottom = Math.max(0, Math.round((window.innerHeight || visualViewportHeight) - visualViewportHeight - viewportOffsetTop))

        rootStyle.setProperty("--mobile-viewport-offset-top", `${viewportOffsetTop}px`)
        rootStyle.setProperty("--mobile-viewport-offset-bottom", `${viewportOffsetBottom}px`)
        rootStyle.setProperty("--mobile-visual-viewport-height", `${visualViewportHeight}px`)
    }

    const _clearVisualViewportMetrics = () => {
        const rootStyle = document?.documentElement?.style
        if(!rootStyle)
            return

        rootStyle.removeProperty("--mobile-viewport-offset-top")
        rootStyle.removeProperty("--mobile-viewport-offset-bottom")
        rootStyle.removeProperty("--mobile-visual-viewport-height")
    }

    const isBreakpoint = (breakpoint) => {
        return innerWidth >= bootstrapBreakpoints[breakpoint]
    }

    const getBreakpoint = () => {
        const width = innerWidth
        if (width < bootstrapBreakpoints.sm) return 'xs'
        if (width < bootstrapBreakpoints.md) return 'sm'
        if (width < bootstrapBreakpoints.lg) return 'md'
        if (width < bootstrapBreakpoints.xl) return 'lg'
        if (width < bootstrapBreakpoints.xxl) return 'xl'
        return 'xxl'
    }

    const isMobileLayout = () => {
        const mobileBreakpoint = utils.css.getRootSCSSVariable("--max-breakpoint-for-tabbed-interface")
        return !isBreakpoint(mobileBreakpoint)
    }

    const isDesktopLayout = () => {
        return !isMobileLayout()
    }

    const isShortDesktopLayout = () => {
        const expandedRailWidth = 224
        const minimumScrollableWidthForExpandedRail = 820
        const minimumViewportWidthForExpandedRail = expandedRailWidth + minimumScrollableWidthForExpandedRail

        return innerWidth >= bootstrapBreakpoints.lg && innerWidth < minimumViewportWidthForExpandedRail
    }

    const getValueFromBreakpointHash = (hash) => {
        for(let i in hash)
            if(isBreakpoint(i)) return hash[i]
        return hash['default']
    }

    const getCustomBreakpoint = (breakpointHash) => {
        const matchedKey = Object.keys(breakpointHash)
            .map(Number)
            .filter(bp => innerWidth >= bp)
            .sort((a, b) => b - a)[0]
        return breakpointHash[matchedKey] || null
    }

    const getLayoutConstraints = () => {
        return {
            canToggleFullscreen: data.getSettings().templateSettings.fullscreenEnabled && !isMobileLayout() && !utils.device.isIOS() && !utils.device.isSafari(),
            shouldAddFooterOffset: utils.device.isIOS() && utils.device.isChrome()
        }
    }

    const copyToClipboard = async (text) => {
        if(isCopiedToClipboard(text))
            return

        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            window.lastCopiedToClipboardText = text
            setClipboardText(text)
            return
        }

        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "absolute"
        textArea.style.visibility = "hidden"
        document.body.append(textArea)
        textArea.select()

        try {
            document.execCommand('copy')
            window.lastCopiedToClipboardText = text
            setClipboardText(text)
        }
        catch (error) {
            // Ignore fallback clipboard failures and leave the state unchanged.
        }
        finally {
            textArea.remove()
        }
    }

    const isCopiedToClipboard = (text) => {
        return clipboardText === text
    }

        return (
        <ViewportContext.Provider value={{
            innerWidth,
            innerHeight,

            isBreakpoint,
            getBreakpoint,
            isMobileLayout,
            isDesktopLayout,
            isShortDesktopLayout,
            getValueFromBreakpointHash,
            getLayoutConstraints,
            getCustomBreakpoint,
            copyToClipboard,
            isCopiedToClipboard
        }}>
            {children}
        </ViewportContext.Provider>
    )
}

const ViewportContext = createContext(null)

/**
 * @return {{
 *    innerWidth: Number,
 *    innerHeight: Number,
 *
 *    isBreakpoint: Function,
 *    getBreakpoint: Function,
 *    isMobileLayout: Function,
 *    isDesktopLayout: Function,
 *    isShortDesktopLayout: Function,
 *    getValueFromBreakpointHash: Function,
 *    getLayoutConstraints: Function,
 *    getCustomBreakpoint: Function,
 *    copyToClipboard: Function,
 *    isCopiedToClipboard: Function
 * }}
 */
export const useViewport = () => useContext(ViewportContext)

export const useViewportScroll = () => {
    return useSyncExternalStore(
        subscribeToScrollStore,
        () => scrollStore.position,
        () => ({ x: 0, y: 0 })
    )
}

export const getViewportScrollPosition = () => {
    return scrollStore.position
}

export default ViewportProvider
