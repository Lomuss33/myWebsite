import "./ArticleWebArt.scss"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Article from "./base/Article.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"
import patronusSvgMarkup from "./webArt/patronus.svg?raw"
import sendYoursHexLoopSource from "./webArt/sendYoursHexLoopEngine.js?raw"

function _scheduleIdleWork(work, { timeoutMs = 1200 } = {}) {
    if(typeof window === "undefined") {
        work()
        return () => {}
    }

    if("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(() => work(), { timeout: timeoutMs })
        return () => window.cancelIdleCallback(id)
    }

    const id = window.setTimeout(() => work(), 0)
    return () => window.clearTimeout(id)
}

function _measureTileContentSize(element) {
    if(!element) {
        return { width: 1, height: 1 }
    }

    const rect = element.getBoundingClientRect()
    const parentRect = element.parentElement?.getBoundingClientRect?.()
    const fallbackWidth = parentRect?.width || element.parentElement?.clientWidth || 1
    const fallbackHeight = parentRect?.height || element.parentElement?.clientHeight || fallbackWidth
    const width = Math.max(1, Math.round(rect.width || element.clientWidth || fallbackWidth || 1))
    const height = Math.max(1, Math.round(rect.height || element.clientHeight || fallbackHeight || width || 1))
    return { width, height }
}

function _syncTileEngineSize(tile, engine, devicePixelRatio = 1) {
    const { width, height } = _measureTileContentSize(tile)
    const isCoarsePointer = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches
    const safeDevicePixelRatio = Math.min(isCoarsePointer ? 1 : 1.5, Math.max(1, Number(devicePixelRatio) || 1))
    if((width < 32 || height < 32) && typeof window !== "undefined") {
        window.requestAnimationFrame(() => {
            const retrySize = _measureTileContentSize(tile)
            if(retrySize.width >= 32 && retrySize.height >= 32) {
                engine?.setSize?.(retrySize.width, retrySize.height, safeDevicePixelRatio)
            }
        })
        return
    }
    engine?.setSize?.(width, height, safeDevicePixelRatio)
}

function _scrollArticleIntoSectionView(articleId, sectionId, behavior = "smooth") {
    if(typeof window === "undefined") return

    const articleEl = document.getElementById(articleId)
    const scrollableEl = document.getElementById(`scrollable-${sectionId}`)
    if(!articleEl || !scrollableEl) return

    const articleRect = articleEl.getBoundingClientRect()
    const scrollableRect = scrollableEl.getBoundingClientRect()
    const targetScrollTop = scrollableEl.scrollTop + (articleRect.top - scrollableRect.top)

    scrollableEl.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior
    })
}

const WEB_ART_STAGE_PREVIEW_HEIGHT = 248
const WEB_ART_STAGE_TRANSITION_FALLBACK_MS = 460
const WEB_ART_STAGE_PHASE = {
    PREVIEW: "preview",
    EXPANDING: "expanding",
    OPEN: "open",
    COLLAPSING: "collapsing"
}

function _prefersReducedMotion() {
    if(typeof window === "undefined" || !window.matchMedia) return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function _getWebArtStagePreviewHeight(stage) {
    if(!stage)
        return WEB_ART_STAGE_PREVIEW_HEIGHT

    const rawValue = window.getComputedStyle(stage).getPropertyValue("--article-web-art-stage-preview-height")
    const parsedValue = Number.parseFloat(rawValue)
    if(Number.isFinite(parsedValue) && parsedValue > 0)
        return Math.ceil(parsedValue)

    return WEB_ART_STAGE_PREVIEW_HEIGHT
}

const MINESWEEPER_ROWS = 9
const MINESWEEPER_COLS = 9
const MINESWEEPER_MINES = 10
const MINESWEEPER_COLORS = [
    "#0000ff",
    "#008100",
    "#ff1300",
    "#000083",
    "#810500",
    "#2a9494",
    "#000000",
    "#808080"
]

const INITIAL_WEB_ART_ITEM_MOUNT_COUNT = 2
const MOBILE_WEB_ART_OPEN_TILE_LIMIT = 6
const PATRONUS_LAYER_SRCS = [
    "/images/web_art/patronus/bg.png",
    "/images/web_art/patronus/layer-1.png",
    "/images/web_art/patronus/layer-2.png",
    "/images/web_art/patronus/layer-4.png",
    "/images/web_art/patronus/layer-5.png",
    "/images/web_art/patronus/layer-6.png"
]

function _isMobileWebArtLayout() {
    if(typeof window === "undefined" || !window.matchMedia)
        return false

    return window.matchMedia("(pointer: coarse), (max-width: 767px)").matches
}

function _limitWebArtTileSetForMobile(tileIds) {
    const next = new Set(tileIds)
    if(!_isMobileWebArtLayout())
        return next

    while(next.size > MOBILE_WEB_ART_OPEN_TILE_LIMIT) {
        next.delete(next.values().next().value)
    }

    return next
}

function _getOpenAllWebArtTileIds(tileIds) {
    if(!_isMobileWebArtLayout())
        return new Set(tileIds)

    const next = new Set()
    for(const tileId of tileIds) {
        if(next.size >= MOBILE_WEB_ART_OPEN_TILE_LIMIT)
            break
        next.add(tileId)
    }

    return next
}

function _tileSetContainsAll(tileIds, targetTileIds) {
    if(targetTileIds.size === 0)
        return false

    for(const tileId of targetTileIds) {
        if(!tileIds.has(tileId))
            return false
    }

    return true
}

function _createMinesweeperBoard(rows = MINESWEEPER_ROWS, cols = MINESWEEPER_COLS, mineCount = MINESWEEPER_MINES) {
    const total = rows * cols
    const safeMineCount = Math.max(1, Math.min(mineCount, total - 1))
    const mines = new Set()

    while(mines.size < safeMineCount) {
        mines.add(Math.floor(Math.random() * total))
    }

    const counts = new Array(total).fill(0)
    for(let index = 0; index < total; index++) {
        if(mines.has(index)) {
            counts[index] = -1
            continue
        }

        const x = index % cols
        const y = Math.floor(index / cols)
        let neighbours = 0

        for(let dy = -1; dy <= 1; dy++) {
            for(let dx = -1; dx <= 1; dx++) {
                if(dx === 0 && dy === 0) continue
                const nx = x + dx
                const ny = y + dy
                if(nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue
                if(mines.has(ny * cols + nx)) neighbours += 1
            }
        }

        counts[index] = neighbours
    }

    return {
        rows,
        cols,
        mineCount: safeMineCount,
        mines,
        counts
    }
}

function _floodRevealMinesweeper(index, board, revealed, flagged) {
    const next = new Set(revealed)
    const pending = [index]

    while(pending.length > 0) {
        const current = pending.pop()
        if(current == null) continue
        if(next.has(current) || flagged.has(current) || board.mines.has(current)) continue

        next.add(current)
        if(board.counts[current] !== 0) continue

        const x = current % board.cols
        const y = Math.floor(current / board.cols)

        for(let dy = -1; dy <= 1; dy++) {
            for(let dx = -1; dx <= 1; dx++) {
                if(dx === 0 && dy === 0) continue
                const nx = x + dx
                const ny = y + dy
                if(nx < 0 || ny < 0 || nx >= board.cols || ny >= board.rows) continue
                pending.push(ny * board.cols + nx)
            }
        }
    }

    return next
}

function _isMinesweeperVictory(board, revealed, flagged) {
    const safeCells = board.rows * board.cols - board.mineCount
    if(revealed.size >= safeCells) return true
    if(flagged.size !== board.mineCount) return false
    for(const mineIndex of board.mines) {
        if(!flagged.has(mineIndex)) return false
    }
    return true
}

function _makePlaceholderAriaLabel(label) {
    return `Web art ${String(label || "tile").toLowerCase()} tile loading`
}

function _buildSendYoursHexLoopSrcDoc({ seed, reduceMotion }) {
    const engineSource = JSON.stringify(
        sendYoursHexLoopSource.split("</script>").join("<\\/script>")
    )
    const safeSeed = JSON.stringify(seed)
    const motionFlag = reduceMotion ? "true" : "false"

    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            border: 0;
            overflow: hidden;
            background: #000;
        }

        body {
            position: relative;
        }

        canvas {
            position: absolute;
            inset: 0;
            display: block;
        }
    </style>
</head>
<body>
<script type="module">
const moduleSource = ${engineSource}
const moduleUrl = URL.createObjectURL(new Blob([moduleSource], { type: "text/javascript" }))
const { createHexLoopRenderer } = await import(moduleUrl)
URL.revokeObjectURL(moduleUrl)

const canvas = document.createElement("canvas")
canvas.style.position = "absolute"
canvas.style.inset = "0"
canvas.style.width = "100%"
canvas.style.height = "100%"
document.body.appendChild(canvas)

const renderer = createHexLoopRenderer(canvas, {
    reduceMotion: ${motionFlag},
    seed: ${safeSeed}
})

let rafId = 0
let retryTimerId = 0

const queueRender = () => {
    if(retryTimerId) {
        window.clearTimeout(retryTimerId)
        retryTimerId = 0
    }
    if(rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect()
        if(rect.width < 24 || rect.height < 24) {
            retryTimerId = window.setTimeout(queueRender, 60)
            return
        }
        renderer.render()
    })
}

const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(() => {
    queueRender()
}) : null

resizeObserver?.observe(document.documentElement)
resizeObserver?.observe(document.body)
resizeObserver?.observe(canvas)

queueRender()
requestAnimationFrame(() => requestAnimationFrame(queueRender))

document.addEventListener("click", () => {
    queueRender()
})

window.addEventListener("resize", () => {
    queueRender()
}, { passive: true })

window.addEventListener("pageshow", () => {
    queueRender()
})
</script>
</body>
</html>`
}

function _renderGuideLineContent(line) {
    if(!Array.isArray(line)) return line

    return line.map((fragment, index) => {
        const toneClass = fragment?.tone ? ` article-web-art-intro-guide-fragment-${fragment.tone}` : ""
        return (
            <span key={`${fragment?.text || "fragment"}-${index}`}
                  className={`article-web-art-intro-guide-fragment${toneClass}`}>
                {fragment?.text}
            </span>
        )
    })
}

function ArticleWebArt({ dataWrapper, id }) {
    const language = useLanguage()
    const navigation = useNavigation()
    const ambientTraceReadyId = `${dataWrapper.uniqueId}-ambient-trace`
    const ambientHexReadyId = `${dataWrapper.uniqueId}-ambient-hex`
    const ambientPlopReadyId = `${dataWrapper.uniqueId}-ambient-plop`
    const ambientJuliaReadyId = `${dataWrapper.uniqueId}-ambient-julia`
    const ambientMinesReadyId = `${dataWrapper.uniqueId}-ambient-mines`
    const ambientRingsReadyId = `${dataWrapper.uniqueId}-ambient-rings`
    const ambientPrismReadyId = `${dataWrapper.uniqueId}-ambient-prism`
    const ambientRopeReadyId = `${dataWrapper.uniqueId}-ambient-rope`
    const ambientSoupReadyId = `${dataWrapper.uniqueId}-ambient-soup`
    const ambientTardisReadyId = `${dataWrapper.uniqueId}-ambient-tardis`
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const [showIntroCover, setShowIntroCover] = useState(true)
    const rawItems = useMemo(() => dataWrapper.orderedItems, [dataWrapper.orderedItems])
    const items = useMemo(() => {
        // Desired visual order: Poly, 5, 3D, Orbit, Hover, Wave, Spin, Shape, Hourglass, Noice, Distance, Android, Pulse, Bars, Deep
        // Matches ids: 4 (Poly), 5 (Embroidery), 3 (3D tunnel), 6 (Orbit), 1 (Hover), 2 (Wave), 7 (Spin), 8 (Shape), 9 (Hourglass), 10 (Noice), 11 (Distance), 12 (Android), 13 (Pulse), 14 (Bars), 15 (Deep)
        const desiredOrder = [4, 5, 3, 6, 1, 2, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        const byId = new Map(rawItems.map((item) => [Number(item?.id), item]))
        const ordered = []

        for(const id of desiredOrder) {
            const item = byId.get(id)
            if(item) ordered.push(item)
        }

        for(const item of rawItems) {
            if(!item) continue
            const id = Number(item?.id)
            if(desiredOrder.includes(id)) continue
            ordered.push(item)
        }

        return ordered
    }, [rawItems])
    const tilesWrapperRef = useRef(null)
    const stageRef = useRef(null)
    const stagePhaseRef = useRef(WEB_ART_STAGE_PHASE.PREVIEW)
    const stageFrameIdsRef = useRef([])
    const stageTransitionTimeoutRef = useRef(null)
    const [stagePhase, setStagePhaseState] = useState(WEB_ART_STAGE_PHASE.PREVIEW)
    const [stageHeight, setStageHeight] = useState(null)
    const [shouldMountTiles, setShouldMountTiles] = useState(false)
    const readySetRef = useRef(new Set())
    const readyTimeoutsRef = useRef(new Map())
    const [readyCount, setReadyCount] = useState(0)
    const [activationIndex, setActivationIndex] = useState(-1)
    const [openTileIds, setOpenTileIds] = useState(() => new Set())
    const [mountedTileIds, setMountedTileIds] = useState(() => new Set())
    const [sendYoursPreviewOpen, setSendYoursPreviewOpen] = useState(false)
    const allTileIds = useMemo(() => {
        const ids = items.map((item) => item?.uniqueId).filter(Boolean)
        ids.push(
            ambientTraceReadyId,
            ambientHexReadyId,
            ambientPlopReadyId,
            ambientJuliaReadyId,
            ambientMinesReadyId,
            ambientPrismReadyId,
            ambientRingsReadyId,
            ambientRopeReadyId,
            ambientSoupReadyId,
            ambientTardisReadyId,
            "ambient-goldfish",
            "ambient-patronus"
        )
        return new Set(ids)
    }, [
        ambientHexReadyId,
        ambientJuliaReadyId,
        ambientMinesReadyId,
        ambientPlopReadyId,
        ambientPrismReadyId,
        ambientRingsReadyId,
        ambientRopeReadyId,
        ambientSoupReadyId,
        ambientTardisReadyId,
        ambientTraceReadyId,
        items
    ])
    const trackedReadyIds = useMemo(() => {
        return Array.from(mountedTileIds).filter((uniqueId) => {
            return uniqueId !== "ambient-goldfish" && uniqueId !== "ambient-patronus"
        })
    }, [mountedTileIds])
    const locked = showIntroCover
    const selectedLanguageId = language.selectedLanguageId || "en"

    const setStagePhase = useCallback((nextPhase) => {
        stagePhaseRef.current = nextPhase
        setStagePhaseState(nextPhase)
    }, [])

    const clearStageTransitionWork = useCallback(() => {
        if(typeof window === "undefined")
            return

        for(const frameId of stageFrameIdsRef.current)
            window.cancelAnimationFrame(frameId)
        stageFrameIdsRef.current = []

        if(stageTransitionTimeoutRef.current !== null) {
            window.clearTimeout(stageTransitionTimeoutRef.current)
            stageTransitionTimeoutRef.current = null
        }
    }, [])

    let submitTileLabel = language.getString("send_yours")
    if(typeof submitTileLabel === "string" && submitTileLabel.startsWith("locale:")) {
        const langId = selectedLanguageId
        submitTileLabel = {
            en: "Send yours!",
            de: "Sende deine!",
            hr: "Pošalji svoju!",
            tr: "Sen de gönder!",
        }[langId] || "Send yours!"
    }

    let clickTileLabel = language.getString("click")
    if(typeof clickTileLabel === "string" && clickTileLabel.startsWith("locale:")) {
        const langId = selectedLanguageId
        clickTileLabel = {
            en: "Click",
            de: "Klicken",
            hr: "Klikni",
            tr: "Tıkla",
        }[langId] || "Click"
    }

    const introCopy = {
        en: {
            title: "Doors of the world behind an amazing art gallery.",
            guide: {
                eyebrow: "How to explore",
                lines: [
                    [
                        { text: "Enter the gallery", tone: "hero" },
                        { text: " and browse the " },
                        { text: "cards", tone: "glow" },
                        { text: " at your own risk!", tone: "soft" }
                    ],
                    [
                        { text: "Click, hold, or drag", tone: "action" },
                        { text: " inside a card to have " },
                        { text: "some fun.", tone: "glow" }
                    ],
                    [
                        { text: "All pieces are unique, and beautiful.", tone: "hero" },
                        { text: " " },
                        { text: "Contact me to send or credit an idea.", tone: "soft" }
                    ]
                ]
            },
            button: "Enter",
            preparing: "Preparing..."
        },
        de: {
            title: "T\u00fcren der Welt hinter einer erstaunlichen Kunstgalerie.",
            guide: {
                eyebrow: "So funktioniert es",
                lines: [
                    "Betritt die Galerie und schau dir die Karten in Ruhe an.",
                    "Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.",
                    "Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."
                ]
            },
            button: "Eintreten",
            preparing: "Wird vorbereitet..."
        },
        hr: {
            title: "Vrata svijeta iza nevjerojatne umjetni\u010dke galerije.",
            guide: {
                eyebrow: "Kako istra\u017eivati",
                lines: [
                    "U\u0111i u galeriju i istra\u017euj kartice svojim tempom.",
                    "Klikni, dodirni ili pritisni karticu da otkrije\u0161 \u0161to skriva.",
                    "Neki radovi reagiraju druga\u010dije, a nekima treba trenutak da se pripreme."
                ]
            },
            button: "U\u0111i",
            preparing: "Priprema se..."
        },
        tr: {
            title: "Muhte\u015fem bir sanat galerisinin ard\u0131ndaki d\u00fcnyan\u0131n kap\u0131lar\u0131.",
            guide: {
                eyebrow: "Nas\u0131l gezilir",
                lines: [
                    "Galeriye girin ve kartlar\u0131 kendi temponuzda inceleyin.",
                    "\u0130\u00e7indekini ortaya \u00e7\u0131karmak i\u00e7in karta t\u0131klay\u0131n, dokunun veya bas\u0131l\u0131 tutun.",
                    "Baz\u0131 i\u015fler farkl\u0131 tepki verir ve baz\u0131lar\u0131n\u0131n haz\u0131rlanmas\u0131 biraz s\u00fcrebilir."
                ]
            },
            button: "Gir",
            preparing: "Haz\u0131rlan\u0131yor..."
        }
    }[selectedLanguageId] || {
        title: "Doors of the world behind an amazing art gallery.",
        guide: {
            eyebrow: "How to explore",
            lines: [
                [
                    { text: "Enter the gallery", tone: "hero" },
                    { text: " and browse the " },
                    { text: "cards", tone: "glow" },
                    { text: " at your own risk!", tone: "soft" }
                ],
                [
                    { text: "Click, hold, or drag", tone: "action" },
                    { text: " inside a card to have " },
                    { text: "some fun.", tone: "glow" }
                ],
                [
                    { text: "All pieces are unique, and beautiful.", tone: "hero" },
                    { text: " " },
                    { text: "Contact me to send or credit an idea.", tone: "soft" }
                ]
            ]
        },
        button: "Enter",
        preparing: "Preparing..."
    }
    const introHideLabel = "hide"

    const onTileReady = useCallback((uniqueId) => {
        if(!uniqueId) return
        if(readySetRef.current.has(uniqueId)) return
        readySetRef.current.add(uniqueId)

        const timeoutId = readyTimeoutsRef.current.get(uniqueId)
        if(timeoutId != null) {
            window.clearTimeout(timeoutId)
            readyTimeoutsRef.current.delete(uniqueId)
        }

        setReadyCount(readySetRef.current.size)
    }, [])

    const mountTile = useCallback((uniqueId) => {
        if(!uniqueId) return
        setMountedTileIds((current) => {
            if(current.has(uniqueId)) return current
            const next = new Set(current)
            next.add(uniqueId)
            return _limitWebArtTileSetForMobile(next)
        })
    }, [])

    const resetArtState = useCallback(() => {
        for(const timeoutId of readyTimeoutsRef.current.values()) {
            window.clearTimeout(timeoutId)
        }
        readyTimeoutsRef.current = new Map()
        readySetRef.current = new Set()
        setReadyCount(0)
        setActivationIndex(-1)
        setShouldMountTiles(false)
        setOpenTileIds(new Set())
        setMountedTileIds(new Set())
        setSendYoursPreviewOpen(false)
    }, [])

    const completeStageExpand = useCallback(() => {
        clearStageTransitionWork()
        setStageHeight(null)
        setStagePhase(WEB_ART_STAGE_PHASE.OPEN)
    }, [clearStageTransitionWork, setStagePhase])

    const completeStageCollapse = useCallback(() => {
        clearStageTransitionWork()
        resetArtState()
        setStageHeight(null)
        setStagePhase(WEB_ART_STAGE_PHASE.PREVIEW)
    }, [clearStageTransitionWork, resetArtState, setStagePhase])

    const scheduleStageTransitionFallback = useCallback((phase) => {
        if(typeof window === "undefined")
            return

        if(stageTransitionTimeoutRef.current !== null)
            window.clearTimeout(stageTransitionTimeoutRef.current)

        stageTransitionTimeoutRef.current = window.setTimeout(() => {
            stageTransitionTimeoutRef.current = null
            if(stagePhaseRef.current !== phase)
                return

            if(phase === WEB_ART_STAGE_PHASE.EXPANDING)
                completeStageExpand()
            else if(phase === WEB_ART_STAGE_PHASE.COLLAPSING)
                completeStageCollapse()
        }, WEB_ART_STAGE_TRANSITION_FALLBACK_MS)
    }, [completeStageCollapse, completeStageExpand])

    const openAllArtTiles = useCallback(() => {
        const nextTileIds = _getOpenAllWebArtTileIds(allTileIds)
        setMountedTileIds(nextTileIds)
        setOpenTileIds(new Set(nextTileIds))
        setSendYoursPreviewOpen(!_isMobileWebArtLayout())
    }, [allTileIds])

    const onIntroEnter = useCallback(({ openAll = false } = {}) => {
        clearStageTransitionWork()
        const shouldReduceMotion = _prefersReducedMotion()
        const stage = stageRef.current
        const previewHeight = _getWebArtStagePreviewHeight(stage)

        if(shouldReduceMotion) {
            setStageHeight(null)
            setStagePhase(WEB_ART_STAGE_PHASE.OPEN)
        }
        else {
            setStageHeight(Math.max(previewHeight, Math.ceil(stage?.offsetHeight || previewHeight)))
            setStagePhase(WEB_ART_STAGE_PHASE.EXPANDING)
        }

        setShowIntroCover(false)
        setShouldMountTiles(true)
        setActivationIndex(items.length - 1)
        if(openAll) {
            openAllArtTiles()
        }
        else {
            setOpenTileIds(new Set())
            setMountedTileIds(new Set())
            setSendYoursPreviewOpen(false)
        }

        if(shouldReduceMotion || typeof window === "undefined")
            return

        const firstFrameId = window.requestAnimationFrame(() => {
            const secondFrameId = window.requestAnimationFrame(() => {
                const nextStage = stageRef.current
                const nextPreviewHeight = _getWebArtStagePreviewHeight(nextStage)
                const openHeight = Math.max(
                    nextPreviewHeight,
                    Math.ceil(nextStage?.scrollHeight || nextStage?.offsetHeight || nextPreviewHeight)
                )

                setStageHeight(openHeight)
                scheduleStageTransitionFallback(WEB_ART_STAGE_PHASE.EXPANDING)
            })

            stageFrameIdsRef.current.push(secondFrameId)
        })

        stageFrameIdsRef.current.push(firstFrameId)
    }, [clearStageTransitionWork, items.length, openAllArtTiles, scheduleStageTransitionFallback, setStagePhase])

    useEffect(() => {
        if(typeof window === "undefined") return
        if(navigation.targetSection?.id !== dataWrapper.sectionId) return
        if(navigation.transitionStatus !== "transition_status_none") return

        const pending = window.__pendingSectionAction
        if(!pending) return
        if(pending.action !== "enter") return
        if(pending.sectionId !== dataWrapper.sectionId) return
        if(pending.targetArticleId && pending.targetArticleId !== dataWrapper.uniqueId) return
        if(Date.now() - (pending.requestedAt || 0) > 5000) {
            delete window.__pendingSectionAction
            return
        }

        delete window.__pendingSectionAction

        onIntroEnter({ openAll: true })

        const targetArticleId = pending.targetArticleId || dataWrapper.uniqueId
        let openTimeoutId = null
        let firstFrameId = null
        let retryTimeoutId = null
        let secondFrameId = null

        openTimeoutId = window.setTimeout(() => {
            firstFrameId = window.requestAnimationFrame(() => {
                _scrollArticleIntoSectionView(targetArticleId, dataWrapper.sectionId)

                retryTimeoutId = window.setTimeout(() => {
                    secondFrameId = window.requestAnimationFrame(() => {
                        _scrollArticleIntoSectionView(targetArticleId, dataWrapper.sectionId)
                    })
                }, 220)
            })
        }, 90)

        return () => {
            if(openTimeoutId !== null) window.clearTimeout(openTimeoutId)
            if(firstFrameId !== null) window.cancelAnimationFrame(firstFrameId)
            if(retryTimeoutId !== null) window.clearTimeout(retryTimeoutId)
            if(secondFrameId !== null) window.cancelAnimationFrame(secondFrameId)
        }
    }, [dataWrapper.uniqueId, dataWrapper.sectionId, navigation.targetSection?.id, navigation.transitionStatus, onIntroEnter])

    const openTile = useCallback((uniqueId) => {
        if(!uniqueId) return
        mountTile(uniqueId)
        setOpenTileIds((current) => {
            if(current.has(uniqueId)) return current
            const next = new Set(current)
            next.add(uniqueId)
            return _limitWebArtTileSetForMobile(next)
        })
    }, [mountTile])

    const closeTile = useCallback((uniqueId) => {
        if(!uniqueId) return
        setOpenTileIds((current) => {
            if(!current.has(uniqueId)) return current
            const next = new Set(current)
            next.delete(uniqueId)
            return next
        })
        setMountedTileIds((current) => {
            if(!current.has(uniqueId)) return current
            const next = new Set(current)
            next.delete(uniqueId)
            return next
        })
    }, [])

    const openAllTargetTileIds = _getOpenAllWebArtTileIds(allTileIds)
    const areAllArtTilesOpen = _tileSetContainsAll(openTileIds, openAllTargetTileIds)

    const toggleAllArtTiles = useCallback(() => {
        const nextTargetTileIds = _getOpenAllWebArtTileIds(allTileIds)
        if(_tileSetContainsAll(openTileIds, nextTargetTileIds)) {
            setOpenTileIds(new Set())
            setMountedTileIds(new Set())
            setSendYoursPreviewOpen(false)
            return
        }

        openAllArtTiles()
    }, [allTileIds, openAllArtTiles, openTileIds])

    const onIntroHide = useCallback(() => {
        clearStageTransitionWork()
        setShowIntroCover(true)

        if(_prefersReducedMotion()) {
            resetArtState()
            setStageHeight(null)
            setStagePhase(WEB_ART_STAGE_PHASE.PREVIEW)
            return
        }

        const stage = stageRef.current
        const previewHeight = _getWebArtStagePreviewHeight(stage)
        const currentHeight = Math.max(
            previewHeight,
            Math.ceil(stage?.offsetHeight || stage?.scrollHeight || previewHeight)
        )

        setStageHeight(currentHeight)
        setStagePhase(WEB_ART_STAGE_PHASE.COLLAPSING)

        if(typeof window === "undefined")
            return

        const frameId = window.requestAnimationFrame(() => {
            const nextPreviewHeight = _getWebArtStagePreviewHeight(stageRef.current)
            setStageHeight(nextPreviewHeight)
            scheduleStageTransitionFallback(WEB_ART_STAGE_PHASE.COLLAPSING)
        })

        stageFrameIdsRef.current.push(frameId)
    }, [clearStageTransitionWork, resetArtState, scheduleStageTransitionFallback, setStagePhase])

    const onStageTransitionEnd = useCallback((event) => {
        if(event.target !== event.currentTarget || event.propertyName !== "height")
            return

        if(stagePhaseRef.current === WEB_ART_STAGE_PHASE.EXPANDING)
            completeStageExpand()
        else if(stagePhaseRef.current === WEB_ART_STAGE_PHASE.COLLAPSING)
            completeStageCollapse()
    }, [completeStageCollapse, completeStageExpand])

    const getItemTileLabel = (itemWrapper, index) => {
        const itemId = Number(itemWrapper?.id)
        if(itemId === 1) return "Hover"
        if(itemId === 2) return "Wave"
        if(itemId === 3) return "3D"
        if(itemId === 4) return "Poly"
        if(itemId === 5) return "Click"
        if(itemId === 6) return "Orbit"
        if(itemId === 7) return "Spin"
        if(itemId === 8) return "Shape"
        if(itemId === 9) return "Hourglass"
        if(itemId === 10) return "Noice"
        if(itemId === 11) return "Distance"
        if(itemId === 12) return "Android"
        if(itemId === 13) return "Pulse"
        if(itemId === 14) return "Bars"
        if(itemId === 15) return "Deep"
        return String(index + 1)
    }

    const itemTiles = items.map((itemWrapper, index) => {
        if(!shouldMountTiles) {
            return (
                <div key={itemWrapper.uniqueId}
                     className={`article-web-art-tile article-web-art-tile-placeholder`}
                     aria-label={`Web art tile ${index + 1} loading`}/>
            )
        }

        const tileId = itemWrapper.uniqueId
        const isOpen = openTileIds.has(tileId)
        const shouldRenderTile = mountedTileIds.has(tileId) || isOpen
        return (
            <GatedWebArtTile key={tileId}
                             label={getItemTileLabel(itemWrapper, index)}
                             isOpen={isOpen}
                             onToggle={() => {
                                 if(isOpen) closeTile(tileId)
                                 else openTile(tileId)
                             }}
                             shouldRender={shouldRenderTile}>
                {shouldRenderTile && (
                    <WebArtTile itemWrapper={itemWrapper}
                                index={index}
                                locked={locked || !isOpen}
                                activate={index <= activationIndex}
                                onReady={onTileReady}/>
                )}
            </GatedWebArtTile>
        )
    })

    const ambientTiles = shouldMountTiles ? [
        {
            key: "ambient-trace",
            tileId: ambientTraceReadyId,
            label: "Trace",
            render: (isOpen) => <TortuosityTraceTile readyId={ambientTraceReadyId} locked={locked || !isOpen} onReady={onTileReady}/>
        },
        {
            key: "ambient-hex",
            tileId: ambientHexReadyId,
            label: "Hex",
            render: (isOpen) => <HexFlowBallsTile readyId={ambientHexReadyId} locked={locked || !isOpen} onReady={onTileReady}/>
        },
        {
            key: "ambient-plop",
            tileId: ambientPlopReadyId,
            label: "Plop",
            render: (isOpen) => <PixelPlopTile readyId={ambientPlopReadyId} locked={locked || !isOpen} onReady={onTileReady}/>
        },
        {
            key: "ambient-julia",
            tileId: ambientJuliaReadyId,
            label: "Julia",
            render: (isOpen) => <JuliaLinesTile readyId={ambientJuliaReadyId} locked={locked || !isOpen} onReady={onTileReady}/>
        },
        {
            key: "ambient-mines",
            tileId: ambientMinesReadyId,
            label: "Bomb",
            render: (isOpen) => <MinesweeperTile readyId={ambientMinesReadyId} locked={locked || !isOpen} onReady={onTileReady}/>
        },
        {
            key: "ambient-rings",
            tileId: ambientRingsReadyId,
            label: "Fall",
            render: (isOpen) => <FallingRingsTile readyId={ambientRingsReadyId} locked={locked || !isOpen} onReady={onTileReady}/>
        },
        {
            key: "ambient-prism",
            tileId: ambientPrismReadyId,
            label: "Prism",
            render: (isOpen) => <PrismFieldTile readyId={ambientPrismReadyId} locked={locked || !isOpen} onReady={onTileReady}/>
        },
        {
            key: "ambient-rope",
            tileId: ambientRopeReadyId,
            label: "Rope",
            render: (isOpen) => <RopeLightTile readyId={ambientRopeReadyId} locked={locked || !isOpen} onReady={onTileReady}/>
        },
        {
            key: "ambient-soup",
            tileId: ambientSoupReadyId,
            label: "Soup",
            render: (isOpen) => <SoupShaderTile readyId={ambientSoupReadyId} locked={locked || !isOpen} onReady={onTileReady}/>
        },
        {
            key: "ambient-tardis",
            tileId: ambientTardisReadyId,
            label: "Tardis",
            render: (isOpen) => <TardisTile readyId={ambientTardisReadyId} locked={locked || !isOpen} onReady={onTileReady}/>
        },
        {
            key: "ambient-goldfish",
            tileId: "ambient-goldfish",
            label: "Fish",
            render: (isOpen) => <GoldfishTile locked={locked || !isOpen} />
        },
        {
            key: "ambient-patronus",
            tileId: "ambient-patronus",
            label: "Patronus",
            render: (isOpen) => <PatronusTile locked={locked || !isOpen} />
        }
    ].map(({ key, tileId, label, render }) => {
        const isOpen = openTileIds.has(tileId)
        const shouldRenderTile = mountedTileIds.has(tileId) || isOpen
        return (
            <GatedWebArtTile key={key}
                             label={label}
                             isOpen={isOpen}
                             onToggle={() => {
                                 if(isOpen) closeTile(tileId)
                                 else openTile(tileId)
                             }}
                             shouldRender={shouldRenderTile}>
                {shouldRenderTile && render(isOpen)}
            </GatedWebArtTile>
        )
    }) : [
        <div key={"ambient-trace"}
             className={`article-web-art-tile article-web-art-tile-placeholder`}
             aria-label={`Web art trace tile loading`}/>,
        <div key={"ambient-hex"}
             className={`article-web-art-tile article-web-art-tile-placeholder`}
             aria-label={`Web art hex tile loading`}/>,
        <div key={"ambient-plop"}
             className={`article-web-art-tile article-web-art-tile-placeholder`}
             aria-label={`Web art plop tile loading`}/>,
        <div key={"ambient-julia"}
             className={`article-web-art-tile article-web-art-tile-placeholder`}
             aria-label={`Web art julia tile loading`}/>,
        <div key={"ambient-mines"}
             className={`article-web-art-tile article-web-art-tile-placeholder`}
             aria-label={`Web art mines tile loading`}/>,
        <div key={"ambient-rings"}
             className={`article-web-art-tile article-web-art-tile-placeholder`}
             aria-label={`Web art rings tile loading`}/>,
        <div key={"ambient-prism"}
             className={`article-web-art-tile article-web-art-tile-placeholder`}
             aria-label={`Web art prism tile loading`}/>,
        <div key={"ambient-rope"}
             className={`article-web-art-tile article-web-art-tile-placeholder`}
             aria-label={`Web art rope tile loading`}/>,
        <div key={"ambient-soup"}
             className={`article-web-art-tile article-web-art-tile-placeholder`}
             aria-label={`Web art soup tile loading`}/>,
        <div key={"ambient-tardis"}
             className={`article-web-art-tile article-web-art-tile-placeholder`}
             aria-label={`Web art tardis tile loading`}/>
    ]

    useEffect(() => {
        clearStageTransitionWork()
        setStageHeight(null)
        setStagePhase(WEB_ART_STAGE_PHASE.PREVIEW)
        setShowIntroCover(true)
        resetArtState()
    }, [clearStageTransitionWork, dataWrapper.uniqueId, resetArtState, setStagePhase])

    useEffect(() => {
        return () => {
            clearStageTransitionWork()
        }
    }, [clearStageTransitionWork])

    useEffect(() => {
        if(!shouldMountTiles) return

        setActivationIndex(items.length - 1)
    }, [shouldMountTiles, items.length])

    useEffect(() => {
        if(!shouldMountTiles) return

        // Safety timeouts so a single WebGL hiccup can't keep everything locked forever.
        for(const uid of trackedReadyIds) {
            if(!uid) continue
            if(readySetRef.current.has(uid)) continue
            if(readyTimeoutsRef.current.has(uid)) continue

            const timeoutId = window.setTimeout(() => {
                onTileReady(uid)
            }, 12000)
            readyTimeoutsRef.current.set(uid, timeoutId)
        }
    }, [shouldMountTiles, trackedReadyIds, onTileReady])

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-web-art`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <div className={`article-web-art-shell`}>
                <WebArtIntroCover guide={introCopy.guide}
                                  buttonLabel={showIntroCover ? introCopy.button : introHideLabel}
                                  hidden={!showIntroCover}
                                  onEnter={showIntroCover ? onIntroEnter : onIntroHide}
                                  secondaryButtonLabel={!showIntroCover ? "promaja" : null}
                                  onSecondaryAction={!showIntroCover ? toggleAllArtTiles : null}
                                  secondaryPressed={areAllArtTilesOpen}/>

                <div ref={stageRef}
                     className={[
                         "article-web-art-stage",
                         showIntroCover ? "article-web-art-stage-preview" : "",
                         stageHeight !== null ? "article-web-art-stage-measured" : "",
                         `article-web-art-stage-${stagePhase}`
                     ].filter(Boolean).join(" ")}
                     style={stageHeight !== null ? { "--article-web-art-stage-height": `${stageHeight}px` } : undefined}
                     onTransitionEnd={onStageTransitionEnd}
                     aria-hidden={showIntroCover}>
                    <div className={`article-web-art-items ${locked ? "article-web-art-items-locked" : ""}`}
                         ref={tilesWrapperRef}
                         aria-busy={showIntroCover}>
                        {shouldMountTiles && (
                            <SendYourFunAnimationTile label={submitTileLabel}
                                                      clickLabel={clickTileLabel}
                                                      previewRequested={sendYoursPreviewOpen}/>
                        )}
                        {itemTiles}
                        {ambientTiles}
                    </div>
                </div>
            </div>
        </Article>
    )
}

function WebArtIntroCover({ guide, buttonLabel, hidden, onEnter, secondaryButtonLabel = null, onSecondaryAction = null, secondaryPressed = false }) {
    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onEnter()
        }
    }

    return (
        <div className={`article-web-art-intro-cover ${hidden ? "article-web-art-intro-cover-hidden" : "article-web-art-intro-cover-open"}`}>
            <div className={`article-web-art-intro-cover-inner`}>
                <div className={`article-web-art-intro-cover-actions`}>
                    <div className={`article-web-art-intro-guide ${hidden ? "article-web-art-intro-guide-hidden" : "article-web-art-intro-guide-open"}`}>
                        <div className={`article-web-art-intro-guide-inner`}>
                            <div className={`article-web-art-intro-guide-top-row`}>
                                <div className={`article-web-art-intro-guide-top-copy`}>
                                    <span className={`article-web-art-intro-guide-eyebrow`}>
                                        {guide.eyebrow}
                                    </span>

                                    <p className={`article-web-art-intro-guide-line article-web-art-intro-guide-line-primary`}>
                                        {_renderGuideLineContent(guide.lines[0])}
                                    </p>
                                </div>

                                <div className={`article-web-art-intro-cover-buttons`}>
                                    {secondaryButtonLabel ? (
                                        <button type={"button"}
                                                className={`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${secondaryPressed ? "article-web-art-intro-cover-button-secondary-active" : ""}`}
                                                onClick={onSecondaryAction || undefined}
                                                aria-pressed={secondaryPressed}
                                                aria-label={secondaryButtonLabel}>
                                            {secondaryButtonLabel}
                                        </button>
                                    ) : null}

                                    <button type={"button"}
                                            className={`article-web-art-intro-cover-button article-web-art-intro-cover-button-primary`}
                                            onClick={onEnter}
                                            onKeyDown={onKeyDown}
                                            aria-label={buttonLabel}>
                                        {buttonLabel}
                                    </button>
                                </div>
                            </div>

                            <div className={`article-web-art-intro-guide-lines`}>
                                {guide.lines.slice(1).map((line, index) => {
                                    return (
                                        <p key={Array.isArray(line) ? line.map((fragment) => fragment?.text).join("") : line}
                                           className={`article-web-art-intro-guide-line article-web-art-intro-guide-line-${index + 2}`}>
                                            {_renderGuideLineContent(line)}
                                        </p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function GatedWebArtTile({ label, isOpen, onToggle, shouldRender = true, children }) {
    const onClosedTileClick = useCallback((event) => {
        if(isOpen || event.defaultPrevented) return
        if(event.target.closest?.("button")) return
        onToggle?.()
    }, [isOpen, onToggle])

    return (
        <div className={`article-web-art-gated-tile ${isOpen ? "article-web-art-gated-tile-open" : "article-web-art-gated-tile-closed"}`}
             onClick={isOpen ? undefined : onClosedTileClick}>
            {shouldRender ? children : (
                <div className={`article-web-art-tile article-web-art-tile-placeholder`}
                     aria-label={_makePlaceholderAriaLabel(label)}/>
            )}
            <div className={`article-web-art-gated-tile-sheet`} aria-hidden={true}/>
            <button type={"button"}
                    className={`article-web-art-gated-tile-pill ${isOpen ? "article-web-art-gated-tile-pill-open" : "article-web-art-gated-tile-pill-closed"}`}
                    onClick={onToggle}
                    aria-label={`${isOpen ? "Hide" : "Show"} ${label}`}>
                {label}
            </button>
        </div>
    )
}

function WebArtTile({ itemWrapper, index, activate, locked, onReady }) {
    if(Number(itemWrapper.id) === 1) {
        return <SpiralDotsTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 2) {
        return <GridWaveTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 3) {
        return <ThreeTunnelTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 4) {
        return <ThreePolygonDemo5Tile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 6) {
        return <OrbitCirclesTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 7) {
        return <SpinBoxesTile itemWrapper={itemWrapper} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 8) {
        return <ShapeFieldTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 9) {
        return <HourglassTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 10) {
        return <NoiceTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 11) {
        return <DistanceTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 12) {
        return <AndroidTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 13) {
        return <PulseBoxTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 14) {
        return <BarsTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 15) {
        return <DeepTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    return <EmbroideryTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
}

function DistanceTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const visibleRef = useRef(true)
    const pointerIdRef = useRef(null)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            seed: 54013 + (Number(itemWrapper.id) || 11) * 7331,
            reduceMotion
        }
    }, [itemWrapper.id, reduceMotion])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/distanceFieldEngine.js")
                if(canceled) return

                engine = mod.createDistanceFieldEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                if(!locked) engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(locked) {
                                engine.setHoverActive?.(false)
                                engine.stop?.()
                                continue
                            }

                            if(visibleRef.current) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [activate, config, itemWrapper.uniqueId, locked, onReady])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.setHoverActive?.(false)
            engine.clearPointer?.()
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    const pointerPosition = (event) => {
        const tile = tileRef.current
        if(!tile) return { x: 0.5, y: 0.5 }
        const rect = tile.getBoundingClientRect()
        return {
            x: Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width))),
            y: Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)))
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Distance web art tile ${index + 1}`}
                disabled={locked}
                onPointerEnter={locked ? undefined : (() => {
                    engineRef.current?.setHoverActive?.(true)
                    engineRef.current?.start?.()
                })}
                onPointerMove={locked ? undefined : ((event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setHoverActive?.(true)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                })}
                onPointerLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHoverActive?.(false)
                    engineRef.current?.clearPointer?.()
                })}
                onPointerDown={locked ? undefined : ((event) => {
                    if(event.button != null && event.button !== 0) return
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setHoverActive?.(true)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                    engineRef.current?.boostPopulation?.()
                })}
                onPointerUp={locked ? undefined : ((event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                })}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHoverActive?.(false)
                    engineRef.current?.clearPointer?.()
                })}
                onFocus={locked ? undefined : (() => {
                    engineRef.current?.setHoverActive?.(true)
                    engineRef.current?.start?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHoverActive?.(false)
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.boostPopulation?.()
                    }
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Distance
            </span>
        </button>
    )
}

function AndroidTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const backgroundCanvasRef = useRef(null)
    const canvasRef = useRef(null)
    const backgroundEngineRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const visibleRef = useRef(true)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const backgroundCanvas = backgroundCanvasRef.current
        const canvas = canvasRef.current
        if(!tile || !backgroundCanvas || !canvas) return

        let canceled = false
        let backgroundEngine = null
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const bgMod = await import("./webArt/androidBackgroundEngine.js")
                const mod = await import("./webArt/androidRobotEngine.js")
                if(canceled) return

                backgroundEngine = bgMod.createAndroidBackgroundEngine(backgroundCanvas, { reduceMotion })
                backgroundEngineRef.current = backgroundEngine
                engine = mod.createAndroidRobotEngine(canvas, { reduceMotion })
                engineRef.current = engine

                const updateSize = () => {
                    const devicePixelRatio = Math.min(1.5, window.devicePixelRatio || 1)
                    _syncTileEngineSize(tile, backgroundEngine, devicePixelRatio)
                    _syncTileEngineSize(tile, engine, devicePixelRatio)
                }

                updateSize()
                backgroundEngine.renderStatic?.()
                engine.renderStatic?.()
                if(!locked) backgroundEngine.start?.()
                if(!locked) engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(locked) {
                                backgroundEngine.stop?.()
                                engine.stop?.()
                                continue
                            }

                            if(visibleRef.current) {
                                backgroundEngine.start?.()
                                engine.start?.()
                            }
                            else {
                                backgroundEngine.stop?.()
                                engine.stop?.()
                            }
                        }
                    }, { threshold: 0.2 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            backgroundEngine?.destroy?.()
            engine?.destroy?.()
            backgroundEngineRef.current = null
            engineRef.current = null
        }
    }, [activate, itemWrapper.uniqueId, locked, onReady, reduceMotion])

    useEffect(() => {
        const engine = engineRef.current
        const backgroundEngine = backgroundEngineRef.current
        if(!engine || !backgroundEngine) return
        if(locked) {
            engine.clearPointer?.()
            backgroundEngine.stop?.()
            engine.stop?.()
            return
        }
        if(visibleRef.current) {
            backgroundEngine.start?.()
            engine.start?.()
        }
    }, [locked])

    const pointerPosition = (event) => {
        const tile = tileRef.current
        if(!tile) return { x: 0.5, y: 0.5 }
        const rect = tile.getBoundingClientRect()
        return {
            x: Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width))),
            y: Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)))
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
            className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android`}
                aria-label={`Android web art tile ${index + 1}`}
                disabled={locked}
                onPointerEnter={locked ? undefined : (() => {
                    engineRef.current?.start?.()
                })}
                onPointerMove={locked ? undefined : ((event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                })}
                onPointerLeave={locked ? undefined : (() => {
                    engineRef.current?.clearPointer?.()
                })}
                onFocus={locked ? undefined : (() => {
                    engineRef.current?.start?.()
                })}
                onBlur={locked ? undefined : (() => {
                    engineRef.current?.clearPointer?.()
                })}
                onClick={locked ? undefined : (() => {
                    engineRef.current?.poke?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.poke?.()
                    }
                })}>
            <canvas ref={backgroundCanvasRef}
                    className={`article-web-art-android-bg-canvas`}
                    aria-hidden={true}/>
            <div className={`article-web-art-android-glow`} aria-hidden={true}/>
            <canvas ref={canvasRef}
                    className={`article-web-art-android-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Android
            </span>
        </button>
    )
}

function SpinBoxesTile({ itemWrapper, locked, onReady }) {
    const didReadyRef = useRef(false)

    useEffect(() => {
        if(didReadyRef.current) return
        didReadyRef.current = true
        onReady?.(itemWrapper.uniqueId)
    }, [itemWrapper.uniqueId, onReady])

    const boxes = useMemo(() => {
        // Grid order: top-left, top-right, bottom-left, bottom-right
        return [
            { key: "stop", hoverMode: "stop", hoverDuration: "5s" },
            { key: "slow", hoverMode: "slow", hoverDuration: "18s" },
            { key: "super-fast", hoverMode: "super-fast", hoverDuration: "0.22s" },
            { key: "very-fast", hoverMode: "very-fast", hoverDuration: "0.55s" }
        ]
    }, [])

    return (
        <div className={`article-web-art-tile article-web-art-spin-boxes ${locked ? "article-web-art-spin-boxes-locked" : ""}`}>
            <div className={`article-web-art-spin-boxes-grid`}>
                {boxes.map(({ key, hoverDuration, hoverMode }) => (
                    <div key={key}
                         className={`article-web-art-spin-box`}
                         style={{
                             "--spin-duration": "5s",
                             "--spin-hover-duration": hoverDuration
                         }}>
                        <div className={`article-web-art-spin-box-core article-web-art-spin-box-core-${hoverMode}`}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

function BarsTile({ itemWrapper, index, activate, locked, onReady }) {
    const didReadyRef = useRef(false)
    const panelCount = 50
    const levels = useMemo(() => ["level-1", "level-2", "level-3", "level-4", "level-5"], [])
    const [levelIndex, setLevelIndex] = useState(0)
    const level = levels[levelIndex]

    const panels = useMemo(() => {
        return Array.from({ length: panelCount }, (_, panelIndex) => {
            const animationDelay = `${(3 / (panelCount / 2)) * (panelIndex + 1)}s`
            return {
                key: panelIndex,
                style: {
                    animationDelay,
                    "--bar-index": panelIndex
                }
            }
        })
    }, [])

    const toggleLevel = useCallback((event) => {
        event?.preventDefault?.()
        event?.stopPropagation?.()
        setLevelIndex((current) => (current + 1) % levels.length)
    }, [levels.length])

    useEffect(() => {
        if(!activate) return
        if(didReadyRef.current) return
        didReadyRef.current = true
        onReady?.(itemWrapper.uniqueId)
    }, [activate, itemWrapper.uniqueId, onReady])

    return (
        <button type={"button"}
                className={`article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable`}
                aria-label={`Bars web art tile ${index + 1}, ${level.replace("level-", "mode ")}`}
                disabled={locked}
                onClick={locked ? undefined : toggleLevel}
                onKeyDown={locked ? undefined : (event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        toggleLevel(event)
                    }
                }}>
            <div className={`article-web-art-bars-stage article-web-art-bars-stage-${level}`}>
                <div className={`article-web-art-bars article-web-art-bars-${level}`}>
                    {panels.map((panel) => (
                        <div key={panel.key}
                             className={`article-web-art-bars-panel`}
                             style={panel.style}/>
                    ))}
                </div>
            </div>
        </button>
    )
}

function ShapeFieldTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const visibleRef = useRef(true)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            seed: 1729 + (Number(itemWrapper.id) || 8) * 4242,
            reduceMotion,
            gap: 18,
            radiusRatio: 0.4,
            restScale: 0.28,
            minHoverScale: 1.65,
            maxHoverScale: 5.4,
            waveWidth: 260
        }
    }, [itemWrapper.id, reduceMotion])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/shapeFieldEngine.js")
                if(canceled) return

                engine = mod.createShapeFieldEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, window.devicePixelRatio || 1)

                updateSize()
                engine.renderStatic?.()
                engine.triggerWave?.()
                if(!locked) engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(locked) {
                                engine.stop?.()
                                continue
                            }

                            if(visibleRef.current) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.2 })
                    io.observe(tile)
                }
            }
            catch(e) {
                markReady()
            }
        })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [activate, config, itemWrapper.uniqueId, locked, onReady])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.clearPointer?.()
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    const getLocalPoint = (event) => {
        const surface = canvasRef.current || tileRef.current
        if(!surface) return { x: 0, y: 0 }
        const rect = surface.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    const onPointerMove = (event) => {
        const point = getLocalPoint(event)
        engineRef.current?.setPointer?.(point.x, point.y)
    }

    const onPointerDown = (event) => {
        const point = getLocalPoint(event)
        engineRef.current?.setPointer?.(point.x, point.y)
        engineRef.current?.triggerWave?.(point.x, point.y)
    }

    const onKeyDown = (event) => {
        if(event.key !== "Enter" && event.key !== " ") return
        event.preventDefault()
        engineRef.current?.triggerWave?.()
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape`}
                aria-label={`Shape web art tile ${index + 1}`}
                disabled={locked}
                onPointerMove={locked ? undefined : onPointerMove}
                onPointerDown={locked ? undefined : onPointerDown}
                onPointerLeave={locked ? undefined : (() => engineRef.current?.clearPointer?.())}
                onBlur={locked ? undefined : (() => engineRef.current?.clearPointer?.())}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Shape
            </span>
        </button>
    )
}

function HourglassTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const visibleRef = useRef(true)
    const [gravity, setGravity] = useState(2.8)
    const [neckRatio, setNeckRatio] = useState(0.01)

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/hourglassEngine.js")
                if(canceled) return

                engine = mod.createHourglassEngine(canvas)
                engineRef.current = engine
                const state = engine.getState?.()
                if(state) {
                    setGravity(state.gravity)
                    setNeckRatio(state.neckRatio)
                }

                const updateSize = () => _syncTileEngineSize(tile, engine, window.devicePixelRatio || 1)

                updateSize()
                engine.renderStatic?.()
                if(!locked) engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(locked) {
                                engine.stop?.()
                                continue
                            }

                            if(visibleRef.current) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.2 })
                    io.observe(tile)
                }
            }
            catch(e) {
                markReady()
            }
        })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [activate, itemWrapper.uniqueId, locked, onReady])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    const onKeyDown = (event) => {
        if(event.key !== "Enter" && event.key !== " ") return
        event.preventDefault()
        engineRef.current?.flip?.()
    }

      const stopControlEvent = (event) => {
          event.stopPropagation()
      }

      const stopControlEventCapture = (event) => {
          event.stopPropagation()
      }

      const onGravityChange = (event) => {
          const nextValue = Number(event.target.value)
          setGravity(nextValue)
          engineRef.current?.setGravity?.(nextValue)
      }

      const onNeckRatioChange = (event) => {
          const nextValue = Number(event.target.value)
          setNeckRatio(nextValue)
          engineRef.current?.setNeckRatio?.(nextValue)
          if(!locked && visibleRef.current) engineRef.current?.start?.()
      }

    return (
        <div ref={tileRef}
             className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass`}
             role={locked ? undefined : "button"}
             tabIndex={locked ? -1 : 0}
             aria-label={`Hourglass web art tile ${index + 1}`}
             onClick={locked ? undefined : (() => engineRef.current?.flip?.())}
             onKeyDown={locked ? undefined : onKeyDown}>
              <canvas ref={canvasRef}
                      className={`article-web-art-canvas`}/>
                <div className={`article-web-art-hourglass-controls`}
                     onClickCapture={stopControlEventCapture}
                     onPointerDownCapture={stopControlEventCapture}
                     onPointerUpCapture={stopControlEventCapture}
                     onClick={stopControlEvent}
                     onPointerDown={stopControlEvent}
                     onPointerUp={stopControlEvent}
                     onKeyDown={stopControlEvent}>
                    <label className={`article-web-art-hourglass-control article-web-art-hourglass-control-left`}>
                        <span className={`article-web-art-hourglass-control-name`}>Neck</span>
                        <input className={`article-web-art-hourglass-slider`}
                               type={"range"}
                               min={"0.01"}
                               max={"0.22"}
                               step={"0.001"}
                               value={neckRatio}
                               onChange={onNeckRatioChange}
                               disabled={locked}
                               aria-label={"Hourglass neck size"}/>
                    </label>
                    <label className={`article-web-art-hourglass-control article-web-art-hourglass-control-right`}>
                        <span className={`article-web-art-hourglass-control-name`}>Gravity</span>
                        <input className={`article-web-art-hourglass-slider`}
                               type={"range"}
                               min={"0.45"}
                               max={"2.8"}
                               step={"0.01"}
                               value={gravity}
                               onChange={onGravityChange}
                               disabled={locked}
                               aria-label={"Hourglass gravity"}/>
                  </label>
              </div>
              <span className={`article-web-art-tile-label`}>
                  Hourglass
              </span>
          </div>
    )
}

function NoiceTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const backgroundCanvasRef = useRef(null)
    const foregroundCanvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const visibleRef = useRef(true)
    const [fallbackActive, setFallbackActive] = useState(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const backgroundCanvas = backgroundCanvasRef.current
        const foregroundCanvas = foregroundCanvasRef.current
        if(!tile || !backgroundCanvas || !foregroundCanvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const activateFallback = (reason) => {
            if(canceled) return
            setFallbackActive(true)
            if(import.meta.env.DEV && reason) {
                console.warn("Noice web art fallback active", reason)
            }
            markReady()
        }

        const commitVisibleFrame = () => {
            if(canceled) return false
            engine?.renderStatic?.()
            if(engine?.hasVisibleFrame && !engine.hasVisibleFrame()) {
                activateFallback("Canvas rendered no visible Noice frame")
                return false
            }
            setFallbackActive(false)
            markReady()
            return true
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/noiceShaderEngine.js")
                if(canceled) return

                engine = mod.createNoiceShaderEngine({
                    backgroundCanvas,
                    foregroundCanvas
                }, { reduceMotion })
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                const hasReadyFrame = commitVisibleFrame()
                if(!hasReadyFrame) return
                if(!locked) engine.start?.()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine?.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(locked) {
                                engine.stop?.()
                                continue
                            }

                            if(visibleRef.current) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                activateFallback(err)
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [activate, itemWrapper.uniqueId, locked, onReady, reduceMotion])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.clearPointer?.()
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    const pointerPosition = (event) => {
        const surface = tileRef.current
        if(!surface) return { x: 0.5, y: 0.5 }
        const rect = surface.getBoundingClientRect()
        return {
            x: Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width))),
            y: Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)))
        }
    }

    const pulse = (event) => {
        const pos = pointerPosition(event)
        engineRef.current?.setPointer?.(pos.x, pos.y)
        engineRef.current?.pulsePattern?.()
        engineRef.current?.start?.()
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice ${fallbackActive ? "article-web-art-tile-noice-fallback-active" : ""}`}
                aria-label={`Noice web art tile ${index + 1}`}
                disabled={locked}
                onPointerMove={locked ? undefined : ((event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                })}
                onPointerDown={locked ? undefined : ((event) => {
                    if(event.button != null && event.button !== 0) return
                    pulse(event)
                })}
                onMouseLeave={locked ? undefined : (() => {
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.pulsePattern?.()
                        engineRef.current?.start?.()
                    }
                })}>
            {fallbackActive && (
                <div className={`article-web-art-noice-fallback`} aria-hidden={true}>
                    <span className={`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-a`}/>
                    <span className={`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-b`}/>
                    <span className={`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-c`}/>
                </div>
            )}
            <canvas ref={backgroundCanvasRef}
                    className={`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-bg-canvas ${fallbackActive ? "article-web-art-canvas-hidden" : ""}`}/>
            <canvas ref={foregroundCanvasRef}
                    className={`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-fg-canvas ${fallbackActive ? "article-web-art-canvas-hidden" : ""}`}/>
            <span className={`article-web-art-tile-label`}>
                Noice
            </span>
        </button>
    )
}

function DeepTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const visibleRef = useRef(true)
    const pointerIdRef = useRef(null)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/deepShaderEngine.js")
                if(canceled) return

                engine = mod.createDeepShaderEngine(canvas, { reduceMotion })
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                if(!locked) engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(locked) {
                                engine.stop?.()
                                continue
                            }

                            if(visibleRef.current) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [activate, itemWrapper.uniqueId, locked, onReady, reduceMotion])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            pointerIdRef.current = null
            engine.clearPointer?.()
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    const pointerPosition = (event) => {
        const surface = canvasRef.current || tileRef.current
        if(!surface) return { x: 0.5, y: 0.5 }
        const rect = surface.getBoundingClientRect()
        return {
            x: Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width))),
            y: Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)))
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-deep`}
                aria-label={`Deep web art tile ${index + 1}`}
                disabled={locked}
                onPointerDown={locked ? undefined : (event) => {
                    if(event.button != null && event.button !== 0) return
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                    engineRef.current?.start?.()
                }}
                onPointerMove={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    if(pointerIdRef.current == null && event.pointerType !== "mouse") return
                    const pos = pointerPosition(event)
                    if(pointerIdRef.current != null) engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                }}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.start?.()
                    }
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Deep
            </span>
        </button>
    )
}

function EmbroideryTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(true)
    const visibleRef = useRef(true)
    const didReadyRef = useRef(false)
    const isClickTile = Number(itemWrapper?.id) === 5

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        const id = Number(itemWrapper.id) || (index + 1)
        const radiusMini = 0.0026 + id * 0.00008
        const radiusMaxi = 0.0054 + id * 0.00014
        const dHueStep = (id % 2) ? 1 : 2
        const startGroup = {
            kx: 11 + id * 2,
            ky: id % 2
        }

        return {
            refreshDelay: isClickTile ? 0 : 8000,
            radiusMini,
            radiusMaxi,
            dHueStep,
            startGroup,
            seed: 1337 + id * 1009,
            reduceMotion
        }
    }, [isClickTile, itemWrapper.id, index, reduceMotion])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/embroideryEngine.js")
                if(canceled) return

                engine = mod.createEmbroideryEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, window.devicePixelRatio || 1)

                updateSize()
                engine.renderStatic?.()
                if(visibleRef.current) engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(isClickTile) {
                                if(!visibleRef.current) engine.stop()
                                continue
                            }

                            if(visibleRef.current && hoverRef.current) engine.start()
                            else engine.stop()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(e) {
                markReady()
            }
        })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy()
            engineRef.current = null
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start?.()
        else engineRef.current?.stop?.()
    }

    const _restart = () => {
        if(isClickTile) {
            engineRef.current?.stop?.()
            engineRef.current?.reset?.()
            engineRef.current?.start?.()
            return
        }

        engineRef.current?.reset()
        engineRef.current?.renderStatic?.()
        if(visibleRef.current) engineRef.current?.start()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            _restart()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Web art tile ${index + 1}`}
                disabled={locked}
                onClick={locked ? undefined : _restart}
                onMouseEnter={(locked || isClickTile) ? undefined : _start}
                onMouseLeave={(locked || isClickTile) ? undefined : _stop}
                onFocus={(locked || isClickTile) ? undefined : _start}
                onBlur={(locked || isClickTile) ? undefined : _stop}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                {isClickTile ? "Click" : (Number.isFinite(Number(itemWrapper?.id)) ? Number(itemWrapper.id) : (index + 1))}
            </span>
        </button>
    )
}

function PulseBoxTile({ itemWrapper, index, activate, onReady }) {
    const didReadyRef = useRef(false)
    const iframeRef = useRef(null)

    const srcDoc = useMemo(() => {
        return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #212121;
}

@keyframes pulse {
  70% {
    background-color: #e6e6ff;
  }
}

.box {
  -webkit-filter: contrast(30);
  filter: contrast(30);
  box-shadow: 0 0 100px black;
  background-color: black;
  font-size: min(10em, 48vmin);
  padding: 0.5em;
  position: relative;
  z-index: 0;
  color: #808080;
  border: 2px solid #555;
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
  transition: background-color 2s linear;
}

.box:hover {
  background-color: #d580ff;
  animation: pulse 5s ease-in infinite;
}

.box:active {
  background-color: black;
  -webkit-filter: contrast(50) invert(1);
  filter: contrast(50) invert(1);
  animation: none;
}

@keyframes swayx {
  50% {
    left: 75%;
  }
}

@keyframes swayy {
  50% {
    top: 75%;
  }
}

@keyframes color {
  14.2857142857% { background-color: hsl(14.2857142857deg 100% 50%); }
  28.5714285714% { background-color: hsl(28.5714285714deg 100% 50%); }
  42.8571428571% { background-color: hsl(42.8571428571deg 100% 50%); }
  57.1428571429% { background-color: hsl(57.1428571429deg 100% 50%); }
  71.4285714286% { background-color: hsl(71.4285714286deg 100% 50%); }
  85.7142857143% { background-color: hsl(85.7142857143deg 100% 50%); }
  100% { background-color: hsl(100deg 100% 50%); }
}

.circle {
  border-radius: 50%;
  height: 1em;
  width: 1em;
  -webkit-filter: blur(25px);
  filter: blur(25px);
  position: absolute;
  background-color: white;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.one {
  animation: color 12s linear infinite alternate;
}

.two {
  font-size: 0.75em;
  left: -75%;
  top: -75%;
  animation:
    swayx 3s ease-in-out infinite,
    swayy 3.3s ease-in-out infinite,
    color 16s linear infinite alternate-reverse;
}
  </style>
</head>
<body>
  <div class="box">
    <div class="one circle"></div>
    <div class="two circle"></div>
  </div>
</body>
</html>`
    }, [])

    useEffect(() => {
        if(!activate) return
        if(didReadyRef.current) return
        didReadyRef.current = true
        onReady?.(itemWrapper.uniqueId)
    }, [activate, itemWrapper.uniqueId, onReady])

    return (
        <div className={`article-web-art-tile article-web-art-pulse-tile`}
             role={"img"}
             aria-label={`Pulse web art tile ${index + 1}`}>
            <iframe ref={iframeRef}
                    className={`article-web-art-pulse-frame`}
                    title={"Pulse web art"}
                    srcDoc={srcDoc}
                    sandbox={""}
                    scrolling={"no"}/>
        </div>
    )
}

function SpiralDotsTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const pointerIdRef = useRef(null)
    const pointerStartRef = useRef(null)
    const didDragRef = useRef(false)
    const pointerActiveRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            seed: 9001 + (Number(itemWrapper.id) || 1) * 1337,
            reduceMotion,
            dotsCount: 180,
            dotsMouseDistanceSensitivity: 115,
            dotsMaxEscapeRouteLength: 60,
            introDurationMs: 950
        }
    }, [itemWrapper.id, reduceMotion])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/spiralDotsEngine.js")
                if(canceled) return

                engine = mod.createSpiralDotsEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, window.devicePixelRatio || 1)

                updateSize()
                engine.renderStatic?.()
                engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.rebuildDots()
                    engine.renderStatic?.()
                })
                ro.observe(tile)
            }
            catch(e) {
                markReady()
            }
        })

        return () => {
            canceled = true
            cancelWork?.()
            ro?.disconnect()
            engine?.destroy()
            engineRef.current = null
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.clearMouse?.()
            engine.stop?.()
            return
        }
        engine.start?.()
    }, [locked])

    const _mousePosFromEvent = (event) => {
        const surface = canvasRef.current || tileRef.current
        if(!surface) return { x: -10000, y: -10000 }
        const rect = surface.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    const _start = () => {
        engineRef.current?.start()
    }

    const _stop = () => {
        engineRef.current?.clearMouse()
        engineRef.current?.start()
    }

    const onMouseEnter = () => {
        _start()
    }

    const onMouseLeave = () => {
        _stop()
    }

    const onMouseMove = (event) => {
        const pos = _mousePosFromEvent(event)
        engineRef.current?.setMouse(pos.x, pos.y)
    }

    const onFocus = () => {
        _start()
    }

    const onBlur = () => {
        _stop()
    }

    return (
        <div ref={tileRef}
             className={`article-web-art-tile article-web-art-tile-hover-only article-web-art-tile-hover-dots`}
             role={"img"}
             tabIndex={locked ? -1 : 0}
             aria-label={`Spiral dots web art tile ${index + 1}`}
             onPointerDown={locked ? undefined : (event) => {
                 if(event.pointerType === "mouse") return
                 const tile = tileRef.current
                 if(!tile) return
                 pointerActiveRef.current = true
                 pointerIdRef.current = event.pointerId
                try { tile.setPointerCapture(event.pointerId) } catch (e) { void e }
                 _start()
                 const pos = _mousePosFromEvent(event)
                 engineRef.current?.setMouse(pos.x, pos.y)
             }}
             onPointerMove={locked ? undefined : (event) => {
                 if(!pointerActiveRef.current) return
                 if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                 const pos = _mousePosFromEvent(event)
                 engineRef.current?.setMouse(pos.x, pos.y)
             }}
             onPointerUp={locked ? undefined : (event) => {
                 if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                 pointerActiveRef.current = false
                 pointerIdRef.current = null
                 _stop()
             }}
             onPointerCancel={locked ? undefined : () => {
                 pointerActiveRef.current = false
                 pointerIdRef.current = null
                 _stop()
             }}
             onMouseEnter={locked ? undefined : onMouseEnter}
             onMouseLeave={locked ? undefined : onMouseLeave}
             onMouseMove={locked ? undefined : onMouseMove}
             onFocus={locked ? undefined : onFocus}
             onBlur={locked ? undefined : onBlur}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Hover
            </span>
        </div>
    )
}

function GridWaveTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(true)
    const visibleRef = useRef(true)
    const didReadyRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            seed: 424242 + (Number(itemWrapper.id) || 2) * 2027,
            reduceMotion,
            targetCellSize: 14,
            gapPx: 1.4
        }
    }, [itemWrapper.id, reduceMotion])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/gridWaveEngine.js")
                if(canceled) return

                engine = mod.createGridWaveEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, window.devicePixelRatio || 1)

                updateSize()
                engine.renderStatic?.()
                if(visibleRef.current) engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(visibleRef.current && hoverRef.current) engine.start()
                            else engine.stop()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(e) {
                markReady()
            }
        })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy()
            engineRef.current = null
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start?.()
        else engineRef.current?.stop?.()
    }

    const _posFromEvent = (event) => {
        const surface = canvasRef.current || tileRef.current
        if(!surface) return { x: 0, y: 0 }
        const rect = surface.getBoundingClientRect()

        if(typeof event?.clientX !== "number" || typeof event?.clientY !== "number") {
            return { x: rect.width / 2, y: rect.height / 2 }
        }

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    const _ripple = (event) => {
        const pos = _posFromEvent(event)
        engineRef.current?.rippleAt(pos.x, pos.y)
        engineRef.current?.renderStatic?.()
        if(hoverRef.current && visibleRef.current) engineRef.current?.start()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            _ripple(null)
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Grid wave web art tile ${index + 1}`}
                disabled={locked}
                onClick={locked ? undefined : _ripple}
                onMouseEnter={locked ? undefined : _start}
                onMouseLeave={locked ? undefined : _stop}
                onFocus={locked ? undefined : _start}
                onBlur={locked ? undefined : _stop}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Wave
            </span>
        </button>
    )
}

function ThreeTunnelTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(true)
    const visibleRef = useRef(true)
    const didReadyRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            ringCount: 13,
            cubesPerRing: 12,
            ringSpacing: 62,
            tunnelRadius: 54,
            speed: 6.4,
            exposure: 1.58
        }
    }, [reduceMotion])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null
        let cancelWork = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const load = async () => {
            const mod = await import("./webArt/threeTunnelEngine.js")
            if(canceled) return
            engine = mod.createThreeTunnelEngine(canvas, config)
            engineRef.current = engine

            const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

            updateSize()
            engine.reset()
            if(visibleRef.current) engine.start?.()
            markReady()

            ro = new ResizeObserver(() => {
                updateSize()
                engine.reset()
            })
            ro.observe(tile)

            if("IntersectionObserver" in window) {
                io = new IntersectionObserver((entries) => {
                    for(const entry of entries) {
                        visibleRef.current = Boolean(entry.isIntersecting)
                        if(visibleRef.current && hoverRef.current) engine.start()
                        else engine.stop()
                    }
                }, { threshold: 0.25 })
                io.observe(tile)
            }

            const cleanup = () => {
                io?.disconnect()
                ro?.disconnect()
                engine.destroy()
                engineRef.current = null
            }

            return cleanup
        }

        let cleanup = null
        cancelWork = _scheduleIdleWork(() => {
            load().then((fn) => {
                cleanup = fn || null
            }).catch(() => {
                markReady()
            })
        }, { timeoutMs: 300 })

        return () => {
            canceled = true
            cancelWork?.()
            cleanup?.()
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.setHeld?.(false)
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start?.()
        else engineRef.current?.stop?.()
    }

    const _restart = () => {
        engineRef.current?.nextPalette?.()
        engineRef.current?.reset()
        if(visibleRef.current) engineRef.current?.start()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            _restart()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel`}
                aria-label={`3D tunnel web art tile ${index + 1}`}
                disabled={locked}
                onClick={locked ? undefined : _restart}
                onMouseEnter={locked ? undefined : _start}
                onMouseLeave={locked ? undefined : _stop}
                onFocus={locked ? undefined : _start}
                onBlur={locked ? undefined : _stop}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <div className={`article-web-art-tunnel-room-shade`}
                 aria-hidden={true}/>
            <span className={`article-web-art-tile-label`}>
                3D
            </span>
        </button>
    )
}

function ThreePolygonDemo5Tile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(true)
    const visibleRef = useRef(true)
    const didReadyRef = useRef(false)
    const pointerIdRef = useRef(null)
    const holdTimerRef = useRef(null)
    const holdActiveRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            nbObjects: 12,
            animationDuration: 7,
            animationDelay: 0.1,
            cameraZ: 75,
            fitFactor: 1.04
        }
    }, [reduceMotion, locked])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let cleanup = null
        let cancelWork = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const load = async () => {
            const mod = await import("./webArt/threePolygonDemo5Engine.js")
            if(canceled) return

            const engine = mod.createThreePolygonDemo5Engine(canvas, config)
            engineRef.current = engine

            const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.2, window.devicePixelRatio || 1))

            updateSize()
            engine.reset()
            window.requestAnimationFrame(() => {
                if(canceled || engineRef.current !== engine) return
                updateSize()
                engine.reset()
            })
            if(visibleRef.current) engine.start?.()
            markReady()

            const ro = new ResizeObserver(() => {
                updateSize()
            })
            ro.observe(tile)

            let io = null
            if("IntersectionObserver" in window) {
                io = new IntersectionObserver((entries) => {
                    for(const entry of entries) {
                        visibleRef.current = Boolean(entry.isIntersecting)
                        if(visibleRef.current && hoverRef.current) engine.start()
                        else engine.stop()
                    }
                }, { threshold: 0.25 })
                io.observe(tile)
            }

            cleanup = () => {
                io?.disconnect()
                ro.disconnect()
                engine.destroy()
                engineRef.current = null
            }
        }

        cancelWork = _scheduleIdleWork(() => {
            load().catch(() => {
                markReady()
            })
        }, { timeoutMs: 300 })

        return () => {
            canceled = true
            cancelWork?.()
            if(holdTimerRef.current != null) window.clearTimeout(holdTimerRef.current)
            cleanup?.()
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    const _boost = () => {
        engineRef.current?.boost?.()
        if(visibleRef.current) engineRef.current?.start()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            _boost()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Polygon demo 5 web art tile ${index + 1}`}
                disabled={locked}
                onKeyDown={locked ? undefined : onKeyDown}
                onPointerDown={locked ? undefined : (event) => {
                    if(event.button != null && event.button !== 0) return
                    pointerIdRef.current = event.pointerId
                    holdActiveRef.current = false
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    if(visibleRef.current) engineRef.current?.start()
                    if(holdTimerRef.current != null) window.clearTimeout(holdTimerRef.current)
                    holdTimerRef.current = window.setTimeout(() => {
                        if(pointerIdRef.current == null) return
                        holdActiveRef.current = true
                        engineRef.current?.setHeld?.(true)
                    }, 140)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    if(holdTimerRef.current != null) {
                        window.clearTimeout(holdTimerRef.current)
                        holdTimerRef.current = null
                    }
                    pointerIdRef.current = null
                    if(holdActiveRef.current) {
                        holdActiveRef.current = false
                        engineRef.current?.setHeld?.(false)
                    }
                    else {
                        _boost()
                    }
                }}
                onPointerCancel={locked ? undefined : (() => {
                    if(holdTimerRef.current != null) {
                        window.clearTimeout(holdTimerRef.current)
                        holdTimerRef.current = null
                    }
                    pointerIdRef.current = null
                    holdActiveRef.current = false
                    engineRef.current?.setHeld?.(false)
                })}
                onLostPointerCapture={locked ? undefined : (() => {
                    if(holdTimerRef.current != null) {
                        window.clearTimeout(holdTimerRef.current)
                        holdTimerRef.current = null
                    }
                    pointerIdRef.current = null
                    holdActiveRef.current = false
                    engineRef.current?.setHeld?.(false)
                })}
                onMouseEnter={locked ? undefined : (() => {
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                })}
                onMouseLeave={locked ? undefined : (() => {
                    if(holdTimerRef.current != null) {
                        window.clearTimeout(holdTimerRef.current)
                        holdTimerRef.current = null
                    }
                    pointerIdRef.current = null
                    holdActiveRef.current = false
                    engineRef.current?.setHeld?.(false)
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                    else engineRef.current?.stop()
                })}
                onFocus={locked ? undefined : (() => {
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                })}
                onBlur={locked ? undefined : (() => {
                    if(holdTimerRef.current != null) {
                        window.clearTimeout(holdTimerRef.current)
                        holdTimerRef.current = null
                    }
                    pointerIdRef.current = null
                    holdActiveRef.current = false
                    engineRef.current?.setHeld?.(false)
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                    else engineRef.current?.stop()
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Poly
            </span>
        </button>
    )
}

function OrbitCirclesTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(true)
    const visibleRef = useRef(true)
    const didReadyRef = useRef(false)
    const ringColorIndexRef = useRef(0)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            palette: ["#DD0F7E", "#009BBE", "#A8DA00", "#F2E205", "#EE5A02"],
            bgColor: "#200018",
            totalCircles: 22,
            timeScale: 0.0017
        }
    }, [reduceMotion])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/orbitCirclesEngine.js")
                if(canceled) return

                engine = mod.createOrbitCirclesEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, window.devicePixelRatio || 1)

                updateSize()
                engine.reset()
                engine.renderStatic?.()
                if(visibleRef.current) engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(visibleRef.current && hoverRef.current) engine.start()
                            else engine.stop()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(e) {
                markReady()
            }
        })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy()
            engineRef.current = null
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start?.()
        else engineRef.current?.stop?.()
    }

    const _restart = () => {
        const engine = engineRef.current
        if(!engine) return

        const totalRings = Math.max(1, engine.getTotalCircles?.() || 1)
        const ringIndex = ringColorIndexRef.current % totalRings
        const nextColor = `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, "0")}`

        engine.setCircleColor?.(ringIndex, nextColor)

        ringColorIndexRef.current += 1

        if(visibleRef.current) engine.start?.()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            _restart()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Orbit circles web art tile ${index + 1}`}
                disabled={locked}
                onClick={locked ? undefined : _restart}
                onMouseEnter={locked ? undefined : _start}
                onMouseLeave={locked ? undefined : _stop}
                onFocus={locked ? undefined : _start}
                onBlur={locked ? undefined : _stop}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Orbit
            </span>
        </button>
    )
}

function TortuosityTraceTile({ readyId, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            seed: 20250414,
            reduceMotion,
            winding: 0.5,
            step: 10,
            speed: 0,
            radius: 30,
            strokeCycleMs: 1000
        }
    }, [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(readyId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/tortuosityTraceEngine.js")
                if(canceled) return

                engine = mod.createTortuosityTraceEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.reset?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            if(entry.isIntersecting) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 200 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [config, onReady, readyId])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.setHeld?.(false)
            engine.stop?.()
            return
        }
        engine.start?.()
    }, [locked])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.stop?.()
            return
        }
        engine.start?.()
    }, [locked])

    const reset = () => {
        engineRef.current?.reset?.()
        engineRef.current?.start?.()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            reset()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Trace web art tile`}
                disabled={locked}
                onClick={locked ? undefined : reset}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Trace
            </span>
        </button>
    )
}

function HexFlowBallsTile({ readyId, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const pointerIdRef = useRef(null)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            seed: 20250415,
            reduceMotion,
            nbCells: 5,
            rayBallMin: 0.3,
            rayBallMax: 0.8,
            speed: 0.03
        }
    }, [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(readyId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/hexFlowBallsEngine.js")
                if(canceled) return

                engine = mod.createHexFlowBallsEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                engine.start?.()
                markReady()

                  ro = new ResizeObserver(() => {
                      updateSize()
                      engine.renderStatic?.()
                  })
                  ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            if(entry.isIntersecting) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [config, onReady, readyId])

      useEffect(() => {
          const engine = engineRef.current
          if(!engine) return
          if(locked) {
              engine.clearPointer?.()
            engine.stop?.()
            return
        }
          engine.start?.()
      }, [locked])

      const pointerPosition = (event) => {
          const tile = tileRef.current
          if(!tile) return { x: 0.5, y: 0.5 }
          const rect = tile.getBoundingClientRect()
          return {
              x: rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0.5,
              y: rect.height > 0 ? (event.clientY - rect.top) / rect.height : 0.5
          }
      }

      const boostHex = () => {
          engineRef.current?.burst?.()
          engineRef.current?.start?.()
      }

      const onKeyDown = (event) => {
          if(event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              boostHex()
          }
      }

    return (
        <button type={"button"}
                ref={tileRef}
                  className={`article-web-art-tile article-web-art-tile-clickable`}
                  aria-label={`Hex flow web art tile`}
                  disabled={locked}
                  onClick={locked ? undefined : boostHex}
                  onPointerDown={locked ? undefined : (event => {
                      pointerIdRef.current = event.pointerId
                      try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                      const pos = pointerPosition(event)
                      engineRef.current?.setPointer?.(pos.x, pos.y)
                  })}
                  onPointerMove={locked ? undefined : (event => {
                      if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                      const pos = pointerPosition(event)
                      engineRef.current?.setPointer?.(pos.x, pos.y)
                  })}
                  onPointerUp={locked ? undefined : (event => {
                      if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                      pointerIdRef.current = null
                  })}
                  onPointerCancel={locked ? undefined : (() => {
                      pointerIdRef.current = null
                      engineRef.current?.clearPointer?.()
                  })}
                  onMouseMove={locked ? undefined : (event => {
                      const pos = pointerPosition(event)
                      engineRef.current?.setPointer?.(pos.x, pos.y)
                  })}
                  onMouseLeave={locked ? undefined : (() => {
                      pointerIdRef.current = null
                      engineRef.current?.clearPointer?.()
                  })}
                  onBlur={locked ? undefined : (() => {
                      pointerIdRef.current = null
                      engineRef.current?.clearPointer?.()
                  })}
                  onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Hex
            </span>
        </button>
    )
}

function PixelPlopTile({ readyId, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            seed: 20250416,
            reduceMotion,
            step: 6,
            side: 5
        }
    }, [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(readyId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/pixelPlopEngine.js")
                if(canceled) return

                engine = mod.createPixelPlopEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.reset?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            if(entry.isIntersecting) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [config, onReady, readyId])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.clearPointer?.()
            engine.stop?.()
            return
        }
        engine.start?.()
    }, [locked])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.stop?.()
            return
        }
        engine.start?.()
    }, [locked])

    const seed = () => {
        engineRef.current?.seedBurst?.()
        engineRef.current?.start?.()
    }

    const burstAtEvent = (event) => {
        const surface = canvasRef.current || tileRef.current
        if(!surface || typeof event?.clientX !== "number" || typeof event?.clientY !== "number") {
            seed()
            return
        }

        const rect = surface.getBoundingClientRect()
        engineRef.current?.burstAt?.(event.clientX - rect.left, event.clientY - rect.top)
        engineRef.current?.start?.()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            seed()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Pixel plop web art tile`}
                disabled={locked}
                onPointerDown={locked ? undefined : ((event) => {
                    if(event.button != null && event.button !== 0) return
                    burstAtEvent(event)
                })}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Plop
            </span>
        </button>
    )
}

function JuliaLinesTile({ readyId, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const pointerIdRef = useRef(null)
    const pointerActiveRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            seed: 20250417
        }
    }, [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(readyId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/juliaLinesEngine.js")
                if(canceled) return

                engine = mod.createJuliaLinesEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            if(entry.isIntersecting) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [config, onReady, readyId])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.setHeld?.(false)
            engine.clearPointer?.()
            engine.stop?.()
            return
        }
        engine.start?.()
    }, [locked])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.clearPointer?.()
            engine.stop?.()
            return
        }
        engine.start?.()
    }, [locked])

    const pointerPosition = (event) => {
        const tile = tileRef.current
        if(!tile) return { x: 0.4, y: 0.5 }
        const rect = tile.getBoundingClientRect()
        const x = (event.clientX - rect.left) / Math.max(1, rect.width)
        const y = (event.clientY - rect.top) / Math.max(1, rect.height)
        return {
            x: Math.max(0, Math.min(1, x)),
            y: Math.max(0, Math.min(1, y))
        }
    }

    const reset = () => {
        engineRef.current?.reset?.()
        engineRef.current?.start?.()
    }

    const onKeyDown = (event) => {
        const step = event.shiftKey ? 0.01 : 0.04
        if(event.key === "ArrowUp") {
            event.preventDefault()
            engineRef.current?.nudge?.(0, -step)
        }
        else if(event.key === "ArrowDown") {
            event.preventDefault()
            engineRef.current?.nudge?.(0, step)
        }
        else if(event.key === "ArrowLeft") {
            event.preventDefault()
            engineRef.current?.nudge?.(-step, 0)
        }
        else if(event.key === "ArrowRight") {
            event.preventDefault()
            engineRef.current?.nudge?.(step, 0)
        }
        else if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            reset()
        }
    }

    return (
        <div ref={tileRef}
             className={`article-web-art-tile article-web-art-tile-hover-only`}
             role={"img"}
             tabIndex={locked ? -1 : 0}
             aria-label={`Julia lines web art tile`}
             onPointerDown={locked ? undefined : (event) => {
                 const tile = tileRef.current
                 if(!tile) return
                 pointerActiveRef.current = true
                 pointerIdRef.current = event.pointerId
                 try { tile.setPointerCapture(event.pointerId) } catch(err) { void err }
                 const pos = pointerPosition(event)
                 engineRef.current?.setPointer?.(pos.x, pos.y)
             }}
             onPointerMove={locked ? undefined : (event) => {
                 if(pointerActiveRef.current && pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                 const pos = pointerPosition(event)
                 engineRef.current?.setPointer?.(pos.x, pos.y)
             }}
             onPointerUp={locked ? undefined : (event) => {
                 if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                 pointerActiveRef.current = false
                 pointerIdRef.current = null
                 engineRef.current?.clearPointer?.()
             }}
             onPointerCancel={locked ? undefined : () => {
                 pointerActiveRef.current = false
                 pointerIdRef.current = null
                 engineRef.current?.clearPointer?.()
             }}
             onMouseMove={locked ? undefined : (event) => {
                 const pos = pointerPosition(event)
                 engineRef.current?.setPointer?.(pos.x, pos.y)
             }}
             onMouseLeave={locked ? undefined : (() => {
                 engineRef.current?.clearPointer?.()
             })}
             onBlur={locked ? undefined : (() => {
                 engineRef.current?.clearPointer?.()
             })}
             onKeyDown={locked ? undefined : onKeyDown}
             onClick={locked ? undefined : reset}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Julia
            </span>
        </div>
    )
}

function MinesweeperTile({ readyId, locked, onReady }) {
    const [gameId, setGameId] = useState(0)
    const [mode, setMode] = useState("mine")
    const [revealed, setRevealed] = useState(() => new Set())
    const [flagged, setFlagged] = useState(() => new Set())
    const [status, setStatus] = useState("playing")
    const [startedAt, setStartedAt] = useState(null)
    const [elapsedSeconds, setElapsedSeconds] = useState(0)

    const board = useMemo(() => _createMinesweeperBoard(), [gameId])

    useEffect(() => {
        onReady?.(readyId)
    }, [onReady, readyId])

    useEffect(() => {
        setMode("mine")
        setRevealed(new Set())
        setFlagged(new Set())
        setStatus("playing")
        setStartedAt(null)
        setElapsedSeconds(0)
    }, [gameId])

    useEffect(() => {
        if(startedAt == null || status !== "playing") return
        const tick = () => {
            setElapsedSeconds(Math.min(5999, Math.floor((Date.now() - startedAt) / 1000)))
        }
        tick()
        const intervalId = window.setInterval(tick, 1000)
        return () => {
            window.clearInterval(intervalId)
        }
    }, [startedAt, status])

    const reset = () => {
        setGameId((prev) => prev + 1)
    }

    const handleCellAction = (index) => {
        if(locked || status !== "playing") return

        if(startedAt == null) {
            setStartedAt(Date.now())
        }

        if(mode === "flag") {
            if(revealed.has(index)) return

            const nextFlagged = new Set(flagged)
            if(nextFlagged.has(index)) nextFlagged.delete(index)
            else nextFlagged.add(index)

            setFlagged(nextFlagged)
            if(_isMinesweeperVictory(board, revealed, nextFlagged)) {
                setStatus("won")
            }
            return
        }

        if(flagged.has(index) || revealed.has(index)) return

        if(board.mines.has(index)) {
            const nextRevealed = new Set(revealed)
            for(const mineIndex of board.mines) nextRevealed.add(mineIndex)
            nextRevealed.add(index)
            setRevealed(nextRevealed)
            setStatus("lost")
            return
        }

        const nextRevealed = _floodRevealMinesweeper(index, board, revealed, flagged)
        setRevealed(nextRevealed)
        if(_isMinesweeperVictory(board, nextRevealed, flagged)) {
            setStatus("won")
        }
    }

    const minesLeft = board.mineCount - flagged.size
    const timerText = `${String(Math.floor(elapsedSeconds / 60)).padStart(2, "0")}:${String(elapsedSeconds % 60).padStart(2, "0")}`

    let mood = "🤔"
    if(status === "lost") mood = "😣"
    else if(status === "won") mood = "😎"
    else if(flagged.size >= board.mineCount) mood = "😕"
    else if(flagged.size >= board.mineCount - 1) mood = "🤓"
    else if(flagged.size >= Math.round(board.mineCount * 3 / 4)) mood = "😃"
    else if(flagged.size >= Math.round(board.mineCount * 2 / 3)) mood = "😊"
    else if(flagged.size >= Math.round(board.mineCount / 2)) mood = "🙂"
    else if(flagged.size >= Math.round(board.mineCount / 3)) mood = "😏"
    else if(flagged.size > 0) mood = "😐"

    return (
        <div className={`article-web-art-tile article-web-art-tile-minesweeper`}
             role={"group"}
             aria-label={`Minesweeper web art tile`}>
            <div className={`article-web-art-minesweeper`}>
                <div className={`article-web-art-minesweeper-action-selector`}>
                    <button type={"button"}
                            className={`article-web-art-minesweeper-mode ${mode === "mine" ? "article-web-art-minesweeper-mode-active" : ""}`}
                            onClick={() => setMode("mine")}
                            disabled={locked || status !== "playing"}
                            aria-pressed={mode === "mine"}>
                        ⛏
                    </button>
                    <button type={"button"}
                            className={`article-web-art-minesweeper-mode ${mode === "flag" ? "article-web-art-minesweeper-mode-active" : ""}`}
                            onClick={() => setMode("flag")}
                            disabled={locked || status !== "playing"}
                            aria-pressed={mode === "flag"}>
                        🚩
                    </button>
                </div>

                <div className={`article-web-art-minesweeper-grid`}>
                    {board.counts.map((cellValue, index) => {
                        const isRevealed = revealed.has(index)
                        const isFlagged = flagged.has(index)
                        const isMine = board.mines.has(index)
                        const showMine = status === "lost" && isMine
                        const cellColor = cellValue > 0 ? MINESWEEPER_COLORS[cellValue - 1] : undefined

                        return (
                            <button key={`mine-${gameId}-${index}`}
                                    type={"button"}
                                    className={`article-web-art-minesweeper-cell ${isRevealed ? "article-web-art-minesweeper-cell-revealed" : ""} ${showMine ? "article-web-art-minesweeper-cell-mine" : ""}`}
                                    onClick={() => handleCellAction(index)}
                                    disabled={locked || status !== "playing"}
                                    aria-label={`Minesweeper cell ${index + 1}`}>
                                {isFlagged && !isRevealed ? (
                                    <span className={`article-web-art-minesweeper-cell-flag`}>🚩</span>
                                ) : null}

                                {showMine ? (
                                    <span className={`article-web-art-minesweeper-cell-mine-icon`}>💣</span>
                                ) : null}

                                {isRevealed && !isMine && cellValue > 0 ? (
                                    <span className={`article-web-art-minesweeper-cell-count`}
                                          style={{ color: cellColor }}>
                                        {cellValue}
                                    </span>
                                ) : null}
                            </button>
                        )
                    })}

                    {status === "lost" ? (
                        <button type={"button"}
                                className={`article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost`}
                                onClick={reset}>
                            Ooohhh 🙁
                            <br/>
                            Click to try again
                        </button>
                    ) : null}

                    {status === "won" ? (
                        <button type={"button"}
                                className={`article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won`}
                                onClick={reset}>
                            👌👀✔💯💯💯
                            <br/>
                            Click to restart
                        </button>
                    ) : null}
                </div>

                <div className={`article-web-art-minesweeper-infos`}>
                    <div className={`article-web-art-minesweeper-counter`}>
                        <span className={`article-web-art-minesweeper-counter-face`}>{mood}</span>
                        <span>{minesLeft}</span>
                    </div>
                    <div className={`article-web-art-minesweeper-timer`}>
                        {timerText}
                    </div>
                </div>

                <span className={`article-web-art-tile-label`}>
                    Bomb
                </span>
            </div>
        </div>
    )
}

function FallingRingsTile({ readyId, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const pointerIdRef = useRef(null)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion
        }
    }, [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(readyId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/fallingRingsEngine.js")
                if(canceled) return

                engine = mod.createFallingRingsEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            if(entry.isIntersecting) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [config, onReady, readyId])

    const setHeld = (held) => {
        engineRef.current?.setHeld?.(held)
        engineRef.current?.start?.()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            setHeld(true)
        }
    }

    const onKeyUp = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            setHeld(false)
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Falling rings web art tile`}
                disabled={locked}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    setHeld(true)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                    setHeld(false)
                }}
                onPointerCancel={locked ? undefined : () => {
                    pointerIdRef.current = null
                    setHeld(false)
                }}
                onLostPointerCapture={locked ? undefined : () => {
                    pointerIdRef.current = null
                    setHeld(false)
                }}
                onMouseLeave={locked ? undefined : (() => {
                    if(pointerIdRef.current == null) return
                    setHeld(false)
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    setHeld(false)
                })}
                onKeyDown={locked ? undefined : onKeyDown}
                onKeyUp={locked ? undefined : onKeyUp}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Fall
            </span>
        </button>
    )
}

function PrismFieldTile({ readyId, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const pointerIdRef = useRef(null)
    const pointerTypeRef = useRef("mouse")

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            objectRadius: 2.5,
            objectDepth: 1,
            lookAtZ: 40,
            pointerInfluence: 1,
            pointerDepth: 18,
            pointerSmoothing: 0.22,
            interactionRadiusRatio: 0.15,
            interactionLift: 7.5,
            interactionScale: 0.26,
            interactionEmissiveBoost: 1.25
        }
    }, [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(readyId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/prismFieldEngine.js")
                if(canceled) return

                engine = mod.createPrismFieldEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            if(entry.isIntersecting) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [config, onReady, readyId])

    const pointerPosition = (event) => {
        const tile = tileRef.current
        if(!tile) return { x: 0.5, y: 0.5 }
        const rect = tile.getBoundingClientRect()
        return {
            x: Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width))),
            y: Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)))
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Prism field web art tile`}
                disabled={locked}
                onClick={locked ? undefined : (() => {
                    engineRef.current?.reset?.()
                    engineRef.current?.start?.()
                })}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
                    pointerTypeRef.current = event.pointerType || "mouse"
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onPointerMove={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                    if((event.pointerType || pointerTypeRef.current) === "mouse") {
                        engineRef.current?.clearPointer?.()
                    }
                }}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    if(pointerTypeRef.current === "mouse") {
                        engineRef.current?.clearPointer?.()
                    }
                })}
                onMouseMove={locked ? undefined : (event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    pointerTypeRef.current = "mouse"
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.reset?.()
                        engineRef.current?.start?.()
                    }
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Prism
            </span>
        </button>
    )
}

function RopeLightTile({ readyId, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const pointerIdRef = useRef(null)
    const pointerStartRef = useRef(null)
    const didDragRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => ({ reduceMotion }), [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(readyId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/ropeLightEngine.js")
                if(canceled) return

                engine = mod.createRopeLightEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            if(entry.isIntersecting) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [config, onReady, readyId])

    const pointerPosition = (event) => {
        const tile = tileRef.current
        if(!tile) return { x: 0.5, y: 0.5 }
        const rect = tile.getBoundingClientRect()
        return {
            x: Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width))),
            y: Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)))
        }
    }

    const toggleHang = (event) => {
        if(didDragRef.current) {
            didDragRef.current = false
            return
        }
        const pos = event ? pointerPosition(event) : { x: 0.5, y: 0.18 }
        engineRef.current?.toggleHangAt?.(pos.x, pos.y)
        engineRef.current?.start?.()
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Rope light web art tile`}
                disabled={locked}
                onClick={locked ? undefined : toggleHang}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
                    didDragRef.current = false
                    pointerStartRef.current = pointerPosition(event)
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    engineRef.current?.setPointer?.(pointerStartRef.current.x, pointerStartRef.current.y)
                }}
                onPointerMove={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    const pos = pointerPosition(event)
                    const start = pointerStartRef.current
                    if(start && Math.hypot(pos.x - start.x, pos.y - start.y) > 0.025) {
                        didDragRef.current = true
                    }
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    try { event.currentTarget.releasePointerCapture(event.pointerId) } catch(err) { void err }
                    pointerIdRef.current = null
                    pointerStartRef.current = null
                    engineRef.current?.clearPointer?.()
                }}
                onPointerCancel={locked ? undefined : ((event) => {
                    try { event.currentTarget.releasePointerCapture(event.pointerId) } catch(err) { void err }
                    pointerIdRef.current = null
                    pointerStartRef.current = null
                    didDragRef.current = false
                    engineRef.current?.clearPointer?.()
                })}
                onMouseMove={locked ? undefined : (event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    pointerStartRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    pointerStartRef.current = null
                    didDragRef.current = false
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        toggleHang()
                    }
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Rope
            </span>
        </button>
    )
}

const SOUP_CUBE_FACE_TRANSFORMS = [
    "rotateX(270deg) translateZ(0.5em)",
    "rotateY(0deg) translateZ(0.5em)",
    "rotateY(90deg) translateZ(0.5em)",
    "rotateY(180deg) translateZ(0.5em)",
    "rotateY(270deg) translateZ(0.5em)",
    "rotateX(90deg) translateZ(0.5em)"
]

const SOUP_CUBE_INDICES = Array.from({ length: 28 }, (_, index) => index)

function SoupCubeBackdrop() {
    return (
        <div className={`article-web-art-soup-backdrop`} aria-hidden={true}>
            {SOUP_CUBE_INDICES.map((index) => (
                <div key={index}
                     className={`article-web-art-soup-cube`}
                     style={{
                         animationDelay: `${index * 0.06}s`,
                         fontSize: `${index + 1}em`,
                         "--soup-cube-depth": `${index / Math.max(1, SOUP_CUBE_INDICES.length - 1)}`
                     }}>
                    {SOUP_CUBE_FACE_TRANSFORMS.map((transform, faceIndex) => (
                        <span key={faceIndex}
                              className={`article-web-art-soup-face`}
                              style={{ transform }}/>
                    ))}
                </div>
            ))}
        </div>
    )
}

function SoupShaderTile({ readyId, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const pointerIdRef = useRef(null)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => ({ reduceMotion }), [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(readyId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/soupShaderEngine.js")
                if(canceled) return

                engine = mod.createSoupShaderEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            if(entry.isIntersecting) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [config, onReady, readyId])

    const pointerPosition = (event) => {
        const tile = tileRef.current
        if(!tile) return { x: 0.5, y: 0.5 }
        const rect = tile.getBoundingClientRect()
        return {
            x: Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width))),
            y: Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)))
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile`}
                aria-label={`Soup shader web art tile`}
                disabled={locked}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                    engineRef.current?.setHeld?.(true)
                }}
                onPointerMove={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                    engineRef.current?.setHeld?.(false)
                }}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHeld?.(false)
                })}
                onMouseMove={locked ? undefined : (event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHeld?.(false)
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHeld?.(false)
                    engineRef.current?.clearPointer?.()
                })}>
            <SoupCubeBackdrop/>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Soup
            </span>
        </button>
    )
}

function TardisTile({ readyId, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const pointerIdRef = useRef(null)
    const lastPointerRef = useRef(null)
    const rippleIdRef = useRef(0)
    const [boosting, setBoosting] = useState(false)
    const [ripples, setRipples] = useState([])

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => ({ reduceMotion }), [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(readyId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/tardisWormholeEngine.js")
                if(canceled) return

                engine = mod.createTardisWormholeEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => _syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                engine.renderStatic?.()
                engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            if(entry.isIntersecting) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [config, onReady, readyId])

    useEffect(() => {
        if(ripples.length === 0) return
        const timeoutId = window.setTimeout(() => {
            setRipples((current) => current.slice(1))
        }, 1000)
        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [ripples])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            setBoosting(false)
            lastPointerRef.current = null
            engine.clearPointer?.()
            engine.stop?.()
            return
        }
        engine.start?.()
    }, [locked])

    const pointerPosition = (event) => {
        const tile = tileRef.current
        const surface = canvasRef.current || tile
        if(!tile || !surface) return { x: 0.5, y: 0.5, px: 0, py: 0, dx: 0, dy: 0 }
        const surfaceRect = surface.getBoundingClientRect()
        const tileRect = tile.getBoundingClientRect()
        const px = Math.max(0, Math.min(tileRect.width, event.clientX - tileRect.left))
        const py = Math.max(0, Math.min(tileRect.height, event.clientY - tileRect.top))
        const surfacePx = Math.max(0, Math.min(surfaceRect.width, event.clientX - surfaceRect.left))
        const surfacePy = Math.max(0, Math.min(surfaceRect.height, event.clientY - surfaceRect.top))
        const prev = lastPointerRef.current
          const dx = prev ? surfacePx - prev.px : 0
          const dy = prev ? surfacePy - prev.py : 0
          lastPointerRef.current = { px: surfacePx, py: surfacePy }
          return {
              x: surfaceRect.width > 0 ? surfacePx / surfaceRect.width : 0.5,
              y: surfaceRect.height > 0 ? surfacePy / surfaceRect.height : 0.5,
            px,
            py,
            dx,
            dy
        }
    }

    const spawnRipple = (px, py) => {
        const id = rippleIdRef.current++
        setRipples((current) => [...current, { id, x: px, y: py }])
    }

    const triggerBoost = (event) => {
        const pos = pointerPosition(event)
        spawnRipple(pos.px, pos.py)
        engineRef.current?.boost?.()
        engineRef.current?.start?.()
        setBoosting(true)
        window.setTimeout(() => {
            setBoosting(false)
        }, 650)
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${boosting ? "article-web-art-tile-tardis-boost" : ""}`}
                aria-label={`Tardis wormhole web art tile`}
                disabled={locked}
                onClick={locked ? undefined : triggerBoost}
                onContextMenu={locked ? undefined : ((event) => {
                    event.preventDefault()
                    const pos = pointerPosition(event)
                    spawnRipple(pos.px, pos.py)
                    engineRef.current?.reverseBurst?.()
                    engineRef.current?.start?.()
                })}
                onWheel={locked ? undefined : ((event) => {
                    engineRef.current?.addScrollBoost?.(event.deltaY * 0.003)
                })}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y, pos.dx, pos.dy)
                }}
                onPointerMove={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y, pos.dx, pos.dy)
                    if((event.buttons & 1) === 1) {
                        engineRef.current?.drag?.(pos.dx)
                    }
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                }}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                })}
                onMouseMove={locked ? undefined : (event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y, pos.dx, pos.dy)
                }}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    lastPointerRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    lastPointerRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.boost?.()
                        engineRef.current?.start?.()
                    }
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <div className={`article-web-art-tardis-overlay`} aria-hidden={true}/>
            <div className={`article-web-art-tardis-scanlines`} aria-hidden={true}/>
            <div className={`article-web-art-tardis-grain`} aria-hidden={true}/>
            <div className={`article-web-art-tardis-speed-lines`} aria-hidden={true}/>
            <div className={`article-web-art-tardis-boost-vignette`} aria-hidden={true}/>
            {ripples.map((ripple) => (
                <div key={ripple.id}
                     className={`article-web-art-tardis-ripple`}
                     style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
                     aria-hidden={true}/>
            ))}
            <span className={`article-web-art-tile-label`}>
                Tardis
            </span>
        </button>
    )
}

function SendYourFunAnimationTile({ label, clickLabel, previewRequested = false }) {
    const navigation = useNavigation()
    const tileRef = useRef(null)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewSeed, setPreviewSeed] = useState(0)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const openPreview = useCallback(() => {
        setPreviewSeed(Date.now())
        setPreviewOpen(true)
    }, [])

    const goToContact = useCallback(() => {
        navigation.navigateToSectionWithId("contact")
    }, [navigation])

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            openPreview()
        }
    }

    const iframeSrcDoc = useMemo(() => {
        if(!previewOpen) return ""
        return _buildSendYoursHexLoopSrcDoc({
            seed: `${previewSeed || Date.now()}:${label}`,
            reduceMotion
        })
    }, [label, previewOpen, previewSeed, reduceMotion])

    useEffect(() => {
        let frameOneId = 0
        let frameTwoId = 0

        if(previewRequested) {
            frameOneId = window.requestAnimationFrame(() => {
                frameTwoId = window.requestAnimationFrame(() => {
                    setPreviewSeed(Date.now())
                    setPreviewOpen(true)
                })
            })

            return () => {
                if(frameOneId) window.cancelAnimationFrame(frameOneId)
                if(frameTwoId) window.cancelAnimationFrame(frameTwoId)
            }
        }

        setPreviewOpen(false)
        return () => {
            if(frameOneId) window.cancelAnimationFrame(frameOneId)
            if(frameTwoId) window.cancelAnimationFrame(frameTwoId)
        }
    }, [previewRequested])

    return (
        <div ref={tileRef}
             role={"button"}
             tabIndex={0}
            className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${previewOpen ? "article-web-art-tile-cta-open" : "article-web-art-tile-cta-closed"}`}
            aria-label={previewOpen ? "Kontakt preview" : label}
            aria-pressed={previewOpen}
            onClick={openPreview}
            onKeyDown={onKeyDown}>
            <div className={`article-web-art-tile-cta-preview ${previewOpen ? "article-web-art-tile-cta-preview-visible" : ""}`}
                 aria-hidden={true}>
                {previewOpen && (
                    <iframe key={`${previewSeed}-${label}`}
                            className={`article-web-art-tile-cta-preview-frame`}
                            title={"Send yours preview"}
                            srcDoc={iframeSrcDoc}
                            sandbox={"allow-scripts"}/>
                )}
                <div className={`article-web-art-tile-cta-preview-vignette`}/>
            </div>

            {!previewOpen && (
                <div className={`loader ${reduceMotion ? "loader-reduce-motion" : ""}`}
                     aria-hidden={true}>
                    <div className={`loader-inner`}>
                        <div className={`loader-line-wrap`}>
                            <div className={`loader-line`}/>
                        </div>
                        <div className={`loader-line-wrap`}>
                            <div className={`loader-line`}/>
                        </div>
                        <div className={`loader-line-wrap`}>
                            <div className={`loader-line`}/>
                        </div>
                        <div className={`loader-line-wrap`}>
                            <div className={`loader-line`}/>
                        </div>
                        <div className={`loader-line-wrap`}>
                            <div className={`loader-line`}/>
                        </div>
                    </div>
                </div>
            )}

            <div className={`article-web-art-tile-cta-content ${previewOpen ? "article-web-art-tile-cta-content-hidden" : ""}`}>
                <div className={`article-web-art-tile-cta-title article-web-art-tile-cta-title-top`}>{label}</div>
                <div className={`article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom`}>{clickLabel}</div>
            </div>

            {previewOpen && (
                <button type={"button"}
                        className={`article-web-art-tile-cta-contact-pill`}
                        onClick={(event) => {
                            event.stopPropagation()
                            goToContact()
                        }}
                        onKeyDown={(event) => {
                            if(event.key === "Enter" || event.key === " ") {
                                event.preventDefault()
                                event.stopPropagation()
                                goToContact()
                            }
                        }}>
                    Kontakt
                </button>
            )}
        </div>
    )
}

function GoldfishTile({ locked = false }) {
    const tileRef = useRef(null)
    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const holdRef = useRef(false)
    const holdStartRef = useRef(0)
    const pointerIdRef = useRef(null)
    const rafRef = useRef(null)
    const rateRef = useRef(1)
    const releaseRafRef = useRef(null)
    const burstRafRef = useRef(null)
    const burstTimeoutRef = useRef(null)

    useEffect(() => {
        const tile = tileRef.current
        if(!tile) return

        const smoothstep01 = (t) => {
            const x = Math.max(0, Math.min(1, t))
            return x * x * (3 - 2 * x)
        }

        const collectAnimations = () => {
            const nodes = tile.querySelectorAll(
                ".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"
            )
            const all = []
            for(const node of nodes) {
                const anims = node.getAnimations ? node.getAnimations() : []
                for(const a of anims) all.push(a)
            }
            return all
        }

          const setRate = (rate) => {
              const r = Math.max(1, Math.min(5.2, Number(rate) || 1))
              rateRef.current = r
            const anims = collectAnimations()
            for(const a of anims) {
                a.playbackRate = r
              }
          }

          const clearBurst = () => {
              if(burstRafRef.current != null) cancelAnimationFrame(burstRafRef.current)
              if(burstTimeoutRef.current != null) window.clearTimeout(burstTimeoutRef.current)
              burstRafRef.current = null
              burstTimeoutRef.current = null
          }

          const triggerClickBurst = () => {
              clearBurst()
              setRate(5.2)
              burstTimeoutRef.current = window.setTimeout(() => {
                  const from = rateRef.current
                  const start = performance.now()
                  const dur = 320
                  const burstRelease = () => {
                      const t = (performance.now() - start) / dur
                      const k = smoothstep01(t)
                      setRate(from + (1 - from) * k)
                      if(t < 1) burstRafRef.current = requestAnimationFrame(burstRelease)
                      else burstRafRef.current = null
                  }
                  burstRafRef.current = requestAnimationFrame(burstRelease)
                  burstTimeoutRef.current = null
              }, 2000)
          }

          const stopHold = () => {
              holdRef.current = false
              pointerIdRef.current = null
              tile.classList.remove("article-web-art-tile-goldfish-held")
              if(rafRef.current != null) cancelAnimationFrame(rafRef.current)
              rafRef.current = null

            const from = rateRef.current
            const dur = 360
            const start = performance.now()
            if(releaseRafRef.current != null) cancelAnimationFrame(releaseRafRef.current)

            const tickRelease = () => {
                const t = (performance.now() - start) / dur
                const k = smoothstep01(t)
                setRate(from + (1 - from) * k)
                if(t < 1) releaseRafRef.current = requestAnimationFrame(tickRelease)
                else releaseRafRef.current = null
            }
            releaseRafRef.current = requestAnimationFrame(tickRelease)
        }

        const tick = () => {
            if(!holdRef.current) return
            const t = performance.now() - holdStartRef.current
            const mult = 1.2 + 4.0 * smoothstep01(t / 2400)
            setRate(mult)
            rafRef.current = requestAnimationFrame(tick)
        }

          const onPointerDown = (e) => {
              if(reduceMotion || locked) return
              if(e.button != null && e.button !== 0) return
              clearBurst()
              holdRef.current = true
              holdStartRef.current = performance.now()
              pointerIdRef.current = e.pointerId
            tile.classList.add("article-web-art-tile-goldfish-held")

            try { tile.setPointerCapture(e.pointerId) } catch (err) { void err }
            if(releaseRafRef.current != null) {
                cancelAnimationFrame(releaseRafRef.current)
                releaseRafRef.current = null
            }
            if(rafRef.current == null) rafRef.current = requestAnimationFrame(tick)
        }

          const onPointerUp = () => {
              const heldForMs = performance.now() - holdStartRef.current
              stopHold()
              if(heldForMs < 220) {
                  triggerClickBurst()
              }
          }

        const onPointerCancel = () => {
            stopHold()
        }

        const onLostCapture = () => {
            stopHold()
        }

        tile.addEventListener("pointerdown", onPointerDown)
        tile.addEventListener("pointerup", onPointerUp)
        tile.addEventListener("pointercancel", onPointerCancel)
        tile.addEventListener("lostpointercapture", onLostCapture)

          return () => {
              tile.removeEventListener("pointerdown", onPointerDown)
              tile.removeEventListener("pointerup", onPointerUp)
              tile.removeEventListener("pointercancel", onPointerCancel)
              tile.removeEventListener("lostpointercapture", onLostCapture)
              stopHold()
              clearBurst()
              if(releaseRafRef.current != null) cancelAnimationFrame(releaseRafRef.current)
              releaseRafRef.current = null
          }
      }, [locked, reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        if(!tile) return
        tile.classList.toggle("article-web-art-tile-goldfish-locked", locked)
    }, [locked])

    return (
        <div className={`article-web-art-tile article-web-art-tile-goldfish`}
             ref={tileRef}
             role={"img"}
             aria-label={`Goldfish animation tile`}>
            <div className={`fish-stage`}>
                <div className={`fish-wrapper`}>
                    <div className={`fish-container`}>
                        <div className={`fish-parts`}>
                            <div className={`fish-body front`}/>
                            <div className={`fish-body back`}/>
                            <div className={`fish-back-bottom-fin front`}/>
                            <div className={`fish-back-bottom-fin back`}/>
                            <div className={`fish-back-fin`}/>
                            <div className={`fish-front-bottom-fin front`}/>
                            <div className={`fish-front-bottom-fin back`}/>
                            <div className={`fish-top-fin`}/>
                        </div>
                    </div>
                </div>
            </div>
            <span className={`article-web-art-tile-label`}>
                Fish
            </span>
        </div>
    )
}

function PatronusTile({ locked = false }) {
    const tileRef = useRef(null)
    const layerRefs = useRef([])
    const progressRef = useRef(0)
    const manualUntilRef = useRef(0)
    const sceneLayerSrcs = PATRONUS_LAYER_SRCS

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    useEffect(() => {
        const tile = tileRef.current
        if(!tile) return

        const layers = layerRefs.current.filter(Boolean)
        if(!layers.length) return

        let hovered = true
        let touchActive = false
        let touchPointerId = null
        let rafId = null

        const apply = (x, y) => {
            const tiltY = (x - 0.5) * 30
            for(let index = 0; index < layers.length; index++) {
                const layer = layers[index]
                const depthX = index * 18
                const depthY = index * 8
                const moveX = (x - 0.5) * depthX
                const moveY = (y - 0.5) * depthY
                layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateY(${tiltY}deg)`
            }
        }

        const applyLimited = (xRaw, yRaw) => {
            // Vertical movement: reduce by ~30%. Horizontal movement: expand by ~10%.
            const dx = Math.max(-0.55, Math.min(0.55, (xRaw - 0.5) * 1.10))
            const dy = Math.max(-0.35, Math.min(0.35, (yRaw - 0.5) * 0.70))
            apply(0.5 + dx, 0.5 + dy)
        }

        const onMove = (e) => {
            const rect = tile.getBoundingClientRect()
            const x = (e.clientX - rect.left) / Math.max(1, rect.width)
            const y = (e.clientY - rect.top) / Math.max(1, rect.height)
            hovered = true
            manualUntilRef.current = performance.now() + 650
            applyLimited(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)))
        }

        const _posFromPointer = (e) => {
            const rect = tile.getBoundingClientRect()
            const x = (e.clientX - rect.left) / Math.max(1, rect.width)
            const y = (e.clientY - rect.top) / Math.max(1, rect.height)
            return {
                x: Math.max(0, Math.min(1, x)),
                y: Math.max(0, Math.min(1, y))
            }
        }

        const onPointerDown = (e) => {
            if(e.pointerType === "mouse") return
            touchActive = true
            touchPointerId = e.pointerId
            hovered = true
            manualUntilRef.current = performance.now() + 900
            const pos = _posFromPointer(e)
            applyLimited(pos.x, pos.y)
            if(reduceMotion) return
            if(rafId != null) return
            rafId = requestAnimationFrame(tick)
        }

        const onPointerMove = (e) => {
            if(!touchActive) return
            if(touchPointerId != null && e.pointerId !== touchPointerId) return
            hovered = true
            manualUntilRef.current = performance.now() + 900
            const pos = _posFromPointer(e)
            applyLimited(pos.x, pos.y)
        }

        const endTouch = (e) => {
            if(touchPointerId != null && e?.pointerId != null && e.pointerId !== touchPointerId) return
            touchActive = false
            touchPointerId = null
            hovered = true
            if(!reduceMotion && rafId == null) rafId = requestAnimationFrame(tick)
        }

        const onEnter = () => {
            hovered = true
            if(reduceMotion) return
            if(rafId != null) return
            rafId = requestAnimationFrame(tick)
        }

        const onLeave = () => {
            hovered = true
            if(!reduceMotion && rafId == null) rafId = requestAnimationFrame(tick)
        }

        const tick = () => {
            if(!hovered) return
            if(!reduceMotion && performance.now() >= manualUntilRef.current) {
                progressRef.current += 0.008
                const x = Math.sin(progressRef.current) * 0.5 + 0.5
                applyLimited(x, 0.5)
            }
            rafId = requestAnimationFrame(tick)
        }

        hovered = !locked

        tile.addEventListener("mouseenter", onEnter)
        tile.addEventListener("mousemove", onMove)
        tile.addEventListener("mouseleave", onLeave)
        tile.addEventListener("pointerdown", onPointerDown)
        tile.addEventListener("pointermove", onPointerMove)
        tile.addEventListener("pointerup", endTouch)
        tile.addEventListener("pointercancel", endTouch)
        applyLimited(0.5, 0.5)
        if(!reduceMotion && !locked) {
            rafId = requestAnimationFrame(tick)
        }

        return () => {
            tile.removeEventListener("mouseenter", onEnter)
            tile.removeEventListener("mousemove", onMove)
            tile.removeEventListener("mouseleave", onLeave)
            tile.removeEventListener("pointerdown", onPointerDown)
            tile.removeEventListener("pointermove", onPointerMove)
            tile.removeEventListener("pointerup", endTouch)
            tile.removeEventListener("pointercancel", endTouch)
            if(rafId != null) cancelAnimationFrame(rafId)
        }
    }, [reduceMotion])

    return (
        <div ref={tileRef}
             className={`article-web-art-tile article-web-art-tile-patronus`}
             role={"img"}
             aria-label={`Patronus parallax tile`}>
            <div className={`patronus-card`}>
                <div className={`patronus-layer patronus-bg`}
                     ref={(el) => { layerRefs.current[0] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[0]}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[1] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[1]}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[2] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[2]}/>
                </div>
                <div className={`patronus-layer patronus-svg`}
                     ref={(el) => { layerRefs.current[3] = el }}
                     dangerouslySetInnerHTML={{
                         __html: patronusSvgMarkup
                     }}/>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[4] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[3]}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[5] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[4]}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[6] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[5]}/>
                </div>
            </div>
            <span className={`article-web-art-tile-label`}>
                Patronus
            </span>
        </div>
    )
}

export default ArticleWebArt
