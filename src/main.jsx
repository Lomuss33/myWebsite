import "@fortawesome/fontawesome-free/css/all.min.css"
import "./styles/app.scss"
import {Component, useEffect, useRef, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {useConstants} from "./hooks/constants.js"
import {useUtils} from "./hooks/utils.js"
import {initStartupGuide} from "./hooks/startupGuide.js"
import Preloader from "./components/loaders/Preloader.jsx"
import DataProvider, {useData} from "./providers/DataProvider.jsx"
import LanguageProvider from "./providers/LanguageProvider.jsx"
import ViewportProvider from "./providers/ViewportProvider.jsx"
import ThemeProvider from "./providers/ThemeProvider.jsx"
import LocationProvider from "./providers/LocationProvider.jsx"
import FeedbacksProvider from "./providers/FeedbacksProvider.jsx"
import InputProvider from "./providers/InputProvider.jsx"
import NavigationProvider from "./providers/NavigationProvider.jsx"
import Portfolio from "./components/Portfolio.jsx"

const createDefaultSettings = () => ({
    developerSettings: {
        debugMode: false,
        fakeEmailRequests: false,
        stayOnThePreloaderScreen: false,
        version: ""
    },
    preloaderSettings: {
        enabled: true,
        title: "",
        subtitle: "",
        logoOffset: {
            right: 0,
            top: 0,
            bottom: 0
        }
    },
    templateSettings: {
        animatedCursorEnabled: true,
        defaultLanguageId: "en",
        defaultThemeId: "dark",
        fullscreenEnabled: true,
        showSpinnerOnThemeChange: false
    },
    supportedLanguages: [],
    supportedThemes: [],
    imagesToCache: []
})

/** Initialization Script... **/
let container = null
let reactRoot = null
const ERROR_PREVIEW_PATH = "/error-preview"
const ERROR_PREVIEW_HASH = "#error-preview"

const _applyEnvironmentClasses = () => {
    if(typeof navigator === "undefined" || typeof document === "undefined") return
    const ua = navigator.userAgent || ""
    const isEdge = ua.includes("Edg/")
    const isLowPerf = isEdge || (navigator.hardwareConcurrency || 8) <= 4
    document.documentElement.classList.toggle("is-edge", isEdge)
    document.documentElement.classList.toggle("low-perf", isLowPerf)
}

_applyEnvironmentClasses()

const _isChunkLoadError = (error) => {
    const message = `${error?.name || ""} ${error?.message || ""}`.toLowerCase()
    return (
        message.includes("chunkloaderror") ||
        message.includes("loading chunk") ||
        message.includes("failed to fetch dynamically imported module") ||
        message.includes("importing a module script failed")
    )
}

const _tryReloadAfterChunkLoadError = (error) => {
    if(typeof window === "undefined" || !_isChunkLoadError(error))
        return false

    const reloadKey = "app:chunk-load-error-reloaded"
    const runtimeId = document.querySelector('script[type="module"][src*="/assets/index-"]')?.getAttribute("src") ||
        window.location.href

    try {
        if(window.sessionStorage?.getItem(reloadKey) === runtimeId)
            return false

        window.sessionStorage?.setItem(reloadKey, runtimeId)
    }
    catch {
        return false
    }

    window.location.reload()
    return true
}

const _getBaseRelativePathname = () => {
    if(typeof window === "undefined")
        return "/"

    const baseUrl = import.meta.env.BASE_URL || "/"
    const basePath = new URL(baseUrl, window.location.origin).pathname
    const pathname = window.location.pathname
    const relativePathname = basePath !== "/" && pathname.startsWith(basePath) ?
        `/${pathname.slice(basePath.length)}` :
        pathname

    return relativePathname.replace(/\/+$/, "") || "/"
}

const _isErrorPreviewRoute = () => {
    if(typeof window === "undefined")
        return false

    return _getBaseRelativePathname() === ERROR_PREVIEW_PATH ||
        window.location.hash === ERROR_PREVIEW_HASH
}

const _goHome = () => {
    if(typeof window === "undefined")
        return

    window.location.assign(`${import.meta.env.BASE_URL || "/"}#home`)
}

const _dispatchAppLifecycleEvent = (name, detail = {}) => {
    if(typeof window === "undefined")
        return

    window.dispatchEvent(new CustomEvent(name, {
        detail: {
            ...detail,
            timestamp: Date.now()
        }
    }))
}

const _renderApp = () => {
    if(reactRoot)
        return

    container = document.getElementById('root')
    if(!container)
        return

    reactRoot = createRoot(container)
    reactRoot.render(
        <AppErrorBoundary>
            <App/>
        </AppErrorBoundary>
    )
}

class AppErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    static getDerivedStateFromError(error) {
        return { error }
    }

    componentDidCatch(error, errorInfo) {
        console.error("AppErrorBoundary", error, errorInfo)
        _tryReloadAfterChunkLoadError(error)
    }

    _reloadPage = () => {
        window.location.reload()
    }

    _goHome = () => {
        _goHome()
    }

    render() {
        const error = this.state.error
        if(!error)
            return this.props.children

        const isChunkLoadError = _isChunkLoadError(error)
        const description = isChunkLoadError ?
            "A site update or interrupted lazy-loaded file stopped the page from restoring. Reload to fetch the latest files and continue." :
            "The app stopped while restoring this page. Reloading starts a fresh session and usually clears the issue."

        return (
            <AppErrorFallback description={description}
                              onReload={this._reloadPage}
                              onGoHome={this._goHome}/>
        )
    }
}

function AppErrorFallback({ description, onReload, onGoHome }) {
    return (
        <div className={`app-error-boundary`}
             role={`alert`}
             aria-labelledby={`app-error-boundary-title`}
             aria-describedby={`app-error-boundary-description`}>
            <div className={`app-error-boundary__ambient`}
                 aria-hidden={`true`}/>

            <main className={`app-error-boundary__panel`}>
                <div className={`app-error-boundary__topline`}>
                    <span className={`app-error-boundary__accent`}
                          aria-hidden={`true`}/>

                    <div className={`app-error-boundary__status`}>
                        <span className={`app-error-boundary__mark`}
                              aria-hidden={`true`}>
                            <span/>
                        </span>
                        <p className={`app-error-boundary__eyebrow`}>Runtime issue</p>
                    </div>
                </div>

                <h1 id={`app-error-boundary-title`}>Recovery paused</h1>
                <p id={`app-error-boundary-description`}>{description}</p>

                <div className={`app-error-boundary__actions`}>
                    <button className={`app-error-boundary__button app-error-boundary__button--primary`}
                            type={`button`}
                            onClick={onReload}>
                        <i className={`fa-solid fa-rotate-right`}
                           aria-hidden={`true`}/>
                        <span>Reload page</span>
                    </button>

                    <button className={`app-error-boundary__button app-error-boundary__button--secondary`}
                            type={`button`}
                            onClick={onGoHome}>
                        <i className={`fa-solid fa-house`}
                           aria-hidden={`true`}/>
                        <span>Go home</span>
                    </button>
                </div>
            </main>
        </div>
    )
}

function AppLifecycleBridge() {
    const lastDispatchRef = useRef({ name: null, timestamp: 0 })

    useEffect(() => {
        const DUPLICATE_WINDOW_MS = 120

        const dispatchLifecycleEvent = (name, detail = {}) => {
            const now = Date.now()
            if(
                lastDispatchRef.current.name === name &&
                now - lastDispatchRef.current.timestamp < DUPLICATE_WINDOW_MS
            ) {
                return
            }

            lastDispatchRef.current = {
                name,
                timestamp: now
            }
            _dispatchAppLifecycleEvent(name, detail)
        }

        const onPageShow = (event) => {
            dispatchLifecycleEvent("app:resume", {
                source: "pageshow",
                persisted: Boolean(event?.persisted)
            })
        }

        const onPageHide = (event) => {
            dispatchLifecycleEvent("app:pause", {
                source: "pagehide",
                persisted: Boolean(event?.persisted)
            })
        }

        const onVisibilityChange = () => {
            if(document.visibilityState === "visible") {
                dispatchLifecycleEvent("app:resume", {
                    source: "visibilitychange",
                    persisted: false
                })
            }
            else {
                dispatchLifecycleEvent("app:pause", {
                    source: "visibilitychange",
                    persisted: false
                })
            }
        }

        window.addEventListener("pageshow", onPageShow)
        window.addEventListener("pagehide", onPageHide)
        document.addEventListener("visibilitychange", onVisibilityChange)

        return () => {
            window.removeEventListener("pageshow", onPageShow)
            window.removeEventListener("pagehide", onPageHide)
            document.removeEventListener("visibilitychange", onVisibilityChange)
        }
    }, [])

    useEffect(() => {
        if(typeof window === "undefined")
            return

        const onUnhandledRejection = (event) => {
            if(_tryReloadAfterChunkLoadError(event?.reason))
                event.preventDefault?.()
        }

        window.addEventListener("unhandledrejection", onUnhandledRejection)

        return () => {
            window.removeEventListener("unhandledrejection", onUnhandledRejection)
        }
    }, [])

    return null
}

/**
 * This is the main app component. It wraps the content of the app with AppEssentialsWrapper and AppCapabilitiesWrapper.
 * @return {JSX.Element}
 * @constructor
 */
const App = () => {
    if(_isErrorPreviewRoute()) {
        return (
            <AppErrorFallback description={`The app stopped while restoring this page. Reloading starts a fresh session and usually clears the issue.`}
                              onReload={() => window.location.reload()}
                              onGoHome={_goHome}/>
        )
    }

    return (
        <>
            <AppLifecycleBridge/>
            <AppEssentialsWrapper>
                <AppCapabilitiesWrapper>
                    <Portfolio/>
                </AppCapabilitiesWrapper>
            </AppEssentialsWrapper>
        </>
    )
}

/**
 * This stack will wrap the entire app - these are considered essential components for the app booting up.
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
const AppEssentialsWrapper = ({children}) => {
    const utils = useUtils()
    const constants = useConstants()

    const [settings, setSettings] = useState(() => createDefaultSettings())

    useEffect(() => {
        if (window.location.pathname !== utils.file.BASE_URL) {
            const normalizedUrl = `${utils.file.BASE_URL}${window.location.search}${window.location.hash}`
            window.history.replaceState({}, '', normalizedUrl)
        }

        utils.file.loadJSON("/data/settings.json").then(response => {
            const resolvedSettings = response || createDefaultSettings()
            _applyDeveloperSettings(resolvedSettings)
            setSettings(resolvedSettings)

            const consoleMessageForDevelopers = resolvedSettings?.consoleMessageForDevelopers
            if(consoleMessageForDevelopers) {
                const primaryColor = utils.css.getRootSCSSVariable('--bs-primary')
                const languageId = _resolveConsoleLanguageId(resolvedSettings)
                const resolvedItems = (consoleMessageForDevelopers.items || []).map(item => ({
                    ...item,
                    description: _resolveLocalizedConsoleField(item.description, languageId)
                }))

                utils.log.info(
                    _resolveLocalizedConsoleField(consoleMessageForDevelopers.title, languageId),
                    resolvedItems,
                    primaryColor
                )
            }
        }).catch(() => {
            setSettings(createDefaultSettings())
        })
    }, [])

    const _resolveConsoleLanguageId = (settings) => {
        const supportedLanguages = settings?.supportedLanguages || []
        const defaultLanguageId = settings?.templateSettings?.defaultLanguageId || "en"

        const normalize = (tag) => {
            if(!tag) return null
            return String(tag).trim().toLowerCase().replaceAll('_', '-')
        }

        const tags = [
            ...(Array.isArray(navigator.languages) ? navigator.languages : []),
            navigator.language
        ]
            .map(normalize)
            .filter(Boolean)

        const candidates = []
        for(const tag of tags) {
            const primary = tag.split('-')[0]
            if(primary && !candidates.includes(primary)) candidates.push(primary)
            if(!candidates.includes(tag)) candidates.push(tag)
        }

        const supportedIds = supportedLanguages.map(l => l.id)

        // 1) Direct match.
        const direct = supportedIds.find(id => candidates.includes(id))
        if(direct) return direct

        // 2) Alias pools (keep in sync with LanguageProvider.jsx).
        const aliasPools = {
            hr: ["hr", "bs", "sr", "sh", "me", "mk", "sq", "sl"],
            de: ["de", "lb", "gsw"],
            tr: ["tr", "az"],
            en: ["en"]
        }

        for(const supportedId of supportedIds) {
            const pool = aliasPools[supportedId]
            if(!pool) continue
            if(pool.some(code => candidates.includes(code)))
                return supportedId
        }

        return defaultLanguageId
    }

    const _resolveLocalizedConsoleField = (field, languageId) => {
        if(typeof field === "string")
            return field

        if(field && typeof field === "object")
            return field[languageId] || field.en || Object.values(field)[0]

        return ""
    }

    const _applyDeveloperSettings = (settings) => {
        const developerSettings = settings?.developerSettings
        const debugMode = developerSettings?.debugMode
        const fakeEmailRequests = developerSettings?.fakeEmailRequests
        const stayOnThePreloaderScreen = developerSettings?.stayOnThePreloaderScreen

        if(constants.PRODUCTION_MODE)
            return settings

        utils.storage.setWindowVariable("suspendAnimations", false)
        utils.storage.setWindowVariable("fakeEmailRequests", false)
        utils.storage.setWindowVariable("stayOnThePreloaderScreen", false)

        if(debugMode) {
            settings.preloaderSettings.enabled = stayOnThePreloaderScreen
            utils.storage.setWindowVariable("suspendAnimations", true)
            utils.log.warn("DataProvider", "Debug Mode is enabled, so transitions and animated content such as the preloader screen and role text typing will be skipped. You can disable it manually in settings.json or by running the app in PROD_MODE, which disables it by default.")
        }

        if(fakeEmailRequests) {
            utils.storage.setWindowVariable("fakeEmailRequests", true)
            utils.log.warn("DataProvider", "Fake email requests are enabled. This is only for development purposes and will be disabled automatically in production.")
        }

        if(stayOnThePreloaderScreen) {
            utils.storage.setWindowVariable("stayOnThePreloaderScreen", true)
            utils.log.warn("DataProvider", "Preloader screen will be displayed indefinitely because the developer flag 'stayOnThePreloaderScreen' is on. This is only for development purposes and will be disabled automatically in production.")
        }
    }

    return (
        <Preloader preloaderSettings={settings?.preloaderSettings}>
            <DataProvider settings={settings}>
                {children}
            </DataProvider>
        </Preloader>
    )
}

/**
 * This stack will wrap the app capabilities - these will be initialized after the app has booted up and loaded its essential components.
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
const AppCapabilitiesWrapper = ({ children }) => {
    const data = useData()

    const [selectedThemeId, setSelectedThemeId] = useState(null)

    const appSettings = data.getSettings() || {}
    const appStrings = data.getStrings()
    const appSections = data.getSections()
    const appCategories = data.getCategories()

    const supportedLanguages = appSettings?.supportedLanguages || []
    const supportedThemes = appSettings?.supportedThemes || []
    const templateSettings = appSettings?.templateSettings || {}
    const defaultLanguageId = templateSettings.defaultLanguageId || "en"
    const defaultThemeId = templateSettings.defaultThemeId || "dark"
    const animatedCursorEnabled = Boolean(templateSettings.animatedCursorEnabled)
    const showSpinnerOnThemeChange = Boolean(templateSettings.showSpinnerOnThemeChange)

    useEffect(() => {
        initStartupGuide()
    }, [])

    return (
        <LanguageProvider supportedLanguages={supportedLanguages}
                          defaultLanguageId={defaultLanguageId}
                          appStrings={appStrings}
                          selectedThemeId={selectedThemeId}>
            <ViewportProvider>
                <InputProvider>
                    <FeedbacksProvider canHaveAnimatedCursor={animatedCursorEnabled}>
                        <ThemeProvider supportedThemes={supportedThemes}
                                       defaultThemeId={defaultThemeId}
                                       showSpinnerOnThemeChange={showSpinnerOnThemeChange}
                                       onThemeChanged={setSelectedThemeId}>
                            <LocationProvider sections={appSections}
                                              categories={appCategories}>
                                <NavigationProvider sections={appSections}
                                                    categories={appCategories}>
                                    {children}
                                </NavigationProvider>
                            </LocationProvider>
                        </ThemeProvider>
                    </FeedbacksProvider>
                </InputProvider>
            </ViewportProvider>
        </LanguageProvider>
    )
}

if(document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", _renderApp, { once: true })
else
    _renderApp()
