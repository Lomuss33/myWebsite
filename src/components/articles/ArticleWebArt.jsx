import "./ArticleWebArt.scss"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Article from "./base/Article.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"
import patronusSvgMarkup from "./webArt/patronus.svg?raw"

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

    const width = Math.max(1, Math.round(element.clientWidth || element.getBoundingClientRect().width || 1))
    const height = Math.max(1, Math.round(element.clientHeight || element.getBoundingClientRect().height || 1))
    return { width, height }
}

function _syncTileEngineSize(tile, engine, devicePixelRatio = 1) {
    const { width, height } = _measureTileContentSize(tile)
    engine?.setSize?.(width, height, devicePixelRatio)
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

function ArticleWebArt({ dataWrapper, id }) {
    const language = useLanguage()
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
    const rawItems = useMemo(() => dataWrapper.orderedItems.slice(0, 6), [dataWrapper.orderedItems])
    const items = useMemo(() => {
        // Desired visual order: Poly, 5, 3D, Orbit, Hover, Wave
        // Matches ids: 4 (Poly), 5 (Embroidery), 3 (3D tunnel), 6 (Orbit), 1 (Hover), 2 (Wave)
        const desiredOrder = [4, 5, 3, 6, 1, 2]
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
    const [shouldMountTiles, setShouldMountTiles] = useState(false)
    const readySetRef = useRef(new Set())
    const readyTimeoutsRef = useRef(new Map())
    const [readyCount, setReadyCount] = useState(0)
    const [activationIndex, setActivationIndex] = useState(-1)
    const [openTileIds, setOpenTileIds] = useState(() => new Set())
    const [mountedTileIds, setMountedTileIds] = useState(() => new Set())
    const eagerItemTileIds = useMemo(() => {
        return new Set(items.slice(0, INITIAL_WEB_ART_ITEM_MOUNT_COUNT).map((item) => item?.uniqueId).filter(Boolean))
    }, [items])
    const trackedReadyIds = useMemo(() => {
        return Array.from(mountedTileIds).filter((uniqueId) => {
            return uniqueId !== "ambient-goldfish" && uniqueId !== "ambient-patronus"
        })
    }, [mountedTileIds])
    const locked = showIntroCover
    const selectedLanguageId = language.selectedLanguageId || "en"

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
            note: "At your own risk",
            button: "Enter",
            preparing: "Preparing..."
        },
        de: {
            title: "Türen der Welt hinter einer erstaunlichen Kunstgalerie.",
            note: "Auf eigenes Risiko",
            button: "Eintreten",
            preparing: "Wird vorbereitet..."
        },
        hr: {
            title: "Vrata svijeta iza nevjerojatne umjetničke galerije.",
            note: "Na vlastiti rizik",
            button: "Uđi",
            preparing: "Priprema se..."
        },
        tr: {
            title: "Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",
            note: "Tüm risk size ait",
            button: "Gir",
            preparing: "Hazırlanıyor..."
        }
    }[selectedLanguageId] || {
        title: "Doors of the world behind an amazing art gallery.",
        note: "At your own risk",
        button: "Enter",
        preparing: "Preparing..."
    }
    const introTitle = selectedLanguageId === "de" ? "Hier ist etwas Web-Kunst zum Spaß" : "Here is some web art for fun."
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
            return next
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
    }, [])

    const onIntroEnter = useCallback(() => {
        setShowIntroCover(false)
        setShouldMountTiles(true)
        setActivationIndex(items.length - 1)
        setOpenTileIds(new Set())
        setMountedTileIds(new Set(eagerItemTileIds))
    }, [eagerItemTileIds, items.length])

    const openTile = useCallback((uniqueId) => {
        if(!uniqueId) return
        mountTile(uniqueId)
        setOpenTileIds((current) => {
            if(current.has(uniqueId)) return current
            const next = new Set(current)
            next.add(uniqueId)
            return next
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
    }, [])

    const onIntroHide = useCallback(() => {
        resetArtState()
        setShowIntroCover(true)
    }, [resetArtState])

    const getItemTileLabel = (itemWrapper, index) => {
        const itemId = Number(itemWrapper?.id)
        if(itemId === 1) return "Hover"
        if(itemId === 2) return "Wave"
        if(itemId === 3) return "3D"
        if(itemId === 4) return "Poly"
        if(itemId === 5) return "Click"
        if(itemId === 6) return "Orbit"
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
        resetArtState()
        setShowIntroCover(true)
    }, [dataWrapper.uniqueId, resetArtState])

    useEffect(() => {
        if(!shouldMountTiles) return

        setActivationIndex(items.length - 1)
    }, [shouldMountTiles, items.length])

    useEffect(() => {
        if(!shouldMountTiles) return

        const deferredItemIds = items
            .map((item) => item?.uniqueId)
            .filter((uniqueId) => uniqueId && !eagerItemTileIds.has(uniqueId))

        const cancelers = deferredItemIds.map((uniqueId, index) => {
            return _scheduleIdleWork(() => {
                mountTile(uniqueId)
            }, { timeoutMs: 400 + index * 180 })
        })

        return () => {
            for(const cancel of cancelers) {
                cancel?.()
            }
        }
    }, [eagerItemTileIds, items, mountTile, shouldMountTiles])

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
                <WebArtIntroCover title={introTitle}
                                  note={introCopy.note}
                                  buttonLabel={showIntroCover ? introCopy.button : introHideLabel}
                                  hidden={!showIntroCover}
                                  onEnter={showIntroCover ? onIntroEnter : onIntroHide}/>

                {!showIntroCover && (
                    <div className={`article-web-art-stage`}>
                        <div className={`article-web-art-items ${locked ? "article-web-art-items-locked" : ""}`}
                             ref={tilesWrapperRef}
                             aria-busy={showIntroCover}>
                            {itemTiles}
                            {ambientTiles}
                            <SendYourFunAnimationTile label={submitTileLabel} clickLabel={clickTileLabel}/>
                        </div>
                    </div>
                )}
            </div>
        </Article>
    )
}

function WebArtIntroCover({ title, note, buttonLabel, hidden, onEnter }) {
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
                    <p className={`article-web-art-intro-cover-title`}>
                        {title}
                    </p>

                    <span className={`article-web-art-intro-cover-note`}>
                        {note}
                    </span>
                </div>

                <button type={"button"}
                        className={`article-web-art-intro-cover-button`}
                        onClick={onEnter}
                        onKeyDown={onKeyDown}
                        aria-label={buttonLabel}>
                    {buttonLabel}
                </button>
            </div>
        </div>
    )
}

function GatedWebArtTile({ label, isOpen, onToggle, shouldRender = true, children }) {
    return (
        <div className={`article-web-art-gated-tile ${isOpen ? "article-web-art-gated-tile-open" : "article-web-art-gated-tile-closed"}`}>
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

    return <EmbroideryTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
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
                    }, { threshold: 0.05 })
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

function SpiralDotsTile({ itemWrapper, index, activate, locked, onReady }) {
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
            seed: 9001 + (Number(itemWrapper.id) || 1) * 1337,
            reduceMotion,
            dotsCount: 180,
            dotsMouseDistanceSensitivity: 115,
            dotsMaxEscapeRouteLength: 120,
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
        const tile = tileRef.current
        if(!tile) return { x: -10000, y: -10000 }
        const rect = tile.getBoundingClientRect()
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
             className={`article-web-art-tile article-web-art-tile-hover-only`}
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
                    }, { threshold: 0.05 })
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
        const tile = tileRef.current
        if(!tile) return { x: 0, y: 0 }
        const rect = tile.getBoundingClientRect()

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
            ringCount: 9,
            cubesPerRing: 10,
            ringSpacing: 82,
            tunnelRadius: 58,
            speed: 4.6,
            exposure: 1.45
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
                }, { threshold: 0.05 })
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
                }, { threshold: 0.05 })
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
    const paletteIndexRef = useRef(0)

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
                    }, { threshold: 0.05 })
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

        const palettes = [
            { palette: ["#A8DA00", "#76C700", "#D9FF6A"], bgColor: "#06130a" }, // green
            { palette: ["#DD0F7E", "#FF4FAE", "#7B2CFF"], bgColor: "#200018" }, // pink/purple
            { palette: ["#009BBE", "#00D5FF", "#2B7BFF"], bgColor: "#001018" }, // cyan/blue
            { palette: ["#F2E205", "#FFB703", "#EE5A02"], bgColor: "#1a0f00" }, // yellow/orange
            { palette: ["#8A2BFF", "#C300FF", "#FF00C8"], bgColor: "#07000f" }, // violet/neon
        ]

        const next = palettes[paletteIndexRef.current % palettes.length]
        paletteIndexRef.current = (paletteIndexRef.current + 1) % palettes.length
        engine.setPalette?.(next.palette, next.bgColor)

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
                    }, { threshold: 0.05 })
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
                    engine.reset?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            if(entry.isIntersecting) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.05 })
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

    const toggleGrid = () => {
        engineRef.current?.toggleGridContrast?.()
        engineRef.current?.start?.()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            toggleGrid()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Hex flow web art tile`}
                disabled={locked}
                onClick={locked ? undefined : toggleGrid}
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
                    }, { threshold: 0.05 })
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
        const tile = tileRef.current
        if(!tile || typeof event?.clientX !== "number" || typeof event?.clientY !== "number") {
            seed()
            return
        }

        const rect = tile.getBoundingClientRect()
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
                    }, { threshold: 0.05 })
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
                    }, { threshold: 0.05 })
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

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            objectRadius: 2.5,
            objectDepth: 1,
            lookAtZ: 40
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
                    }, { threshold: 0.05 })
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

    const reset = () => {
        engineRef.current?.reset?.()
        engineRef.current?.start?.()
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Prism field web art tile`}
                disabled={locked}
                onClick={locked ? undefined : reset}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
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
                    engineRef.current?.clearPointer?.()
                }}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
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
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        reset()
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
                    }, { threshold: 0.05 })
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

    const reset = () => {
        engineRef.current?.reset?.()
        engineRef.current?.start?.()
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Rope light web art tile`}
                disabled={locked}
                onClick={locked ? undefined : reset}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
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
                    engineRef.current?.clearPointer?.()
                }}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
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
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        reset()
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
                    }, { threshold: 0.05 })
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
    const [cursorActive, setCursorActive] = useState(false)
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
                    }, { threshold: 0.05 })
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
            setCursorActive(false)
            lastPointerRef.current = null
            engine.clearPointer?.()
            engine.stop?.()
            return
        }
        engine.start?.()
    }, [locked])

    const pointerPosition = (event) => {
        const tile = tileRef.current
        if(!tile) return { x: 0.5, y: 0.5, px: 0, py: 0, dx: 0, dy: 0 }
        const rect = tile.getBoundingClientRect()
        const px = Math.max(0, Math.min(rect.width, event.clientX - rect.left))
        const py = Math.max(0, Math.min(rect.height, event.clientY - rect.top))
        const prev = lastPointerRef.current
        const dx = prev ? px - prev.px : 0
        const dy = prev ? py - prev.py : 0
        lastPointerRef.current = { px, py }
        tile.style.setProperty("--tardis-cursor-x", `${px}px`)
        tile.style.setProperty("--tardis-cursor-y", `${py}px`)
        return {
            x: rect.width > 0 ? px / rect.width : 0.5,
            y: rect.height > 0 ? py / rect.height : 0.5,
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
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${cursorActive ? "article-web-art-tile-tardis-active" : ""} ${boosting ? "article-web-art-tile-tardis-boost" : ""}`}
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
                onMouseEnter={locked ? undefined : (() => {
                    setCursorActive(true)
                })}
                onMouseMove={locked ? undefined : (event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y, pos.dx, pos.dy)
                }}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    lastPointerRef.current = null
                    setCursorActive(false)
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    lastPointerRef.current = null
                    setCursorActive(false)
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
            <div className={`article-web-art-tardis-cursor`} aria-hidden={true}/>
            <div className={`article-web-art-tardis-cursor-dot`} aria-hidden={true}/>
            <div className={`article-web-art-tardis-hud`} aria-hidden={true}>
                <div className={`article-web-art-tardis-hud-label`}>Traversing Singularity</div>
                <div className={`article-web-art-tardis-hud-bar`}/>
            </div>
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

function SendYourFunAnimationTile({ label, clickLabel }) {
    const navigation = useNavigation()

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const onClick = () => {
        navigation.navigateToSectionWithId("contact")
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onClick()
        }
    }

    return (
        <button type={"button"}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta`}
                aria-label={label}
                onClick={onClick}
                onKeyDown={onKeyDown}>
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
            <div className={`article-web-art-tile-cta-content`}>
                <div className={`article-web-art-tile-cta-title article-web-art-tile-cta-title-top`}>{label}</div>
                <div className={`article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom`}>{clickLabel}</div>
            </div>
        </button>
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
            if(reduceMotion) return
            if(e.button != null && e.button !== 0) return
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
            stopHold()
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
            if(releaseRafRef.current != null) cancelAnimationFrame(releaseRafRef.current)
            releaseRafRef.current = null
        }
    }, [reduceMotion])

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
                         src={"https://drive.google.com/thumbnail?id=1gjk_fcB6iho1oHmzY-10eSKIE9TpQisx&sz=w1000"}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[1] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1TK9pzfnoR_AHoyGopthRaQZsQWjbwMHH&sz=w1000"}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[2] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1yKj48wNNwg17-JecguxMASwDNvp65tCb&sz=w1000"}/>
                </div>
                <div className={`patronus-layer patronus-svg`}
                     ref={(el) => { layerRefs.current[3] = el }}
                     dangerouslySetInnerHTML={{
                         __html: patronusSvgMarkup
                     }}/>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[4] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1jkpUucNkaQOPCLClpZKMdTdEzAYEszsn&sz=w1000"}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[5] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1G58IxzEgQnnWnd1vAdRmtQHfWpvb1Ipt&sz=w1000"}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[6] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1I7mg1tYxTI3EBpbNoRAXhzSua6n0XDDF&sz=w1000"}/>
                </div>
            </div>
            <span className={`article-web-art-tile-label`}>
                Patronus
            </span>
        </div>
    )
}

export default ArticleWebArt
