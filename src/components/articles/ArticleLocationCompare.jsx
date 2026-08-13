import "./ArticleLocationCompare.scss"
import "leaflet/dist/leaflet.css"
import React, {useEffect, useMemo, useRef, useState} from "react"
import L from "leaflet"
import {layoutWithLines, prepareWithSegments} from "@chenglou/pretext"
import Article from "./base/Article.jsx"

const EARTH_CIRCUMFERENCE_METERS = 40075016.686
const MAP_TILE_SIZE = 256
const STARTING_ZOOM = 14.35
const SCALE_PRESETS = [
    {id: "street", scale: 1.2, icon: "fa-road"},
    {id: "city", scale: 4.2, icon: "fa-city"},
    {id: "region", scale: 12, icon: "fa-mountain-sun"}
]

const LOCATION_GROUPS = [
    {
        id: "balkan",
        accent: "#62e6ff",
        lightAccent: "#087f96",
        defaultLocationId: "tomislavgrad",
        locations: [
            {id: "tomislavgrad", city: "Tomislavgrad", country: "bih", coordinates: [17.2267, 43.7185]},
            {id: "mrkodol", city: "Mrkodol", country: "bih", coordinates: [17.2506, 43.6275]},
            {id: "posusje", city: "Posušje", country: "bih", coordinates: [17.3262, 43.4705]},
            {id: "mostar", city: "Mostar", country: "bih", coordinates: [17.8078, 43.3438]},
            {id: "split", city: "Split", country: "croatia", coordinates: [16.4402, 43.5081]},
            {id: "zagreb", city: "Zagreb", country: "croatia", coordinates: [15.9819, 45.8150]},
            {id: "sarajevo", city: "Sarajevo", country: "bih", coordinates: [18.4131, 43.8563]},
            {id: "beograd", city: "Beograd", country: "serbia", coordinates: [20.4489, 44.7866]}
        ]
    },
    {
        id: "germany",
        accent: "#ffca70",
        lightAccent: "#a95b00",
        defaultLocationId: "frankfurt",
        locations: [
            {id: "frankfurt", city: "Frankfurt am Main", country: "germany", coordinates: [8.6821, 50.1109]},
            {id: "kelkheim", city: "Kelkheim", country: "germany", coordinates: [8.4503, 50.1377]},
            {id: "giessen", city: "Gießen", country: "germany", coordinates: [8.6784, 50.5841]},
            {id: "eppstein", city: "Eppstein", country: "germany", coordinates: [8.3924, 50.1407]},
            {id: "offenbach", city: "Offenbach am Main", country: "germany", coordinates: [8.7761, 50.0956]},
            {id: "mainz", city: "Mainz", country: "germany", coordinates: [8.2473, 49.9929]},
            {id: "wiesbaden", city: "Wiesbaden", country: "germany", coordinates: [8.2398, 50.0782]},
            {id: "essen", city: "Essen", country: "germany", coordinates: [7.0116, 51.4556]}
        ]
    }
]

const SATELLITE_TILE_URL = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

function metersPerPixel(latitude, zoom) {
    const latitudeRadians = latitude * Math.PI / 180
    return (EARTH_CIRCUMFERENCE_METERS * Math.cos(latitudeRadians)) /
        (MAP_TILE_SIZE * (2 ** zoom))
}

function zoomForMetersPerPixel(latitude, scale) {
    const latitudeRadians = latitude * Math.PI / 180
    return Math.log2(
        (EARTH_CIRCUMFERENCE_METERS * Math.cos(latitudeRadians)) /
        (MAP_TILE_SIZE * scale)
    )
}

function formatScale(scale) {
    if(scale < 1) return `${Math.round(scale * 100)} cm / px`
    if(scale < 10) return `${scale.toFixed(1)} m / px`
    return `${Math.round(scale)} m / px`
}

function ArticleLocationCompare({dataWrapper}) {
    const containerRefs = useRef([])
    const mapsRef = useRef([])
    const markersRef = useRef([])
    const syncingRef = useRef(false)
    const panSyncRef = useRef(null)
    const isPanLinkedRef = useRef(true)
    const menuRootRef = useRef(null)
    const [selectedLocationIds, setSelectedLocationIds] = useState(() => LOCATION_GROUPS.map(group => group.defaultLocationId))
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const selectedLocations = useMemo(() => LOCATION_GROUPS.map((group, index) => (
        group.locations.find(location => location.id === selectedLocationIds[index]) || group.locations[0]
    )), [selectedLocationIds])
    const selectedLocationsRef = useRef(selectedLocations)
    const [scale, setScale] = useState(() => metersPerPixel(selectedLocations[0].coordinates[1], STARTING_ZOOM))
    const [mapsReady, setMapsReady] = useState(false)
    const [isPanLinked, setIsPanLinked] = useState(true)

    selectedLocationsRef.current = selectedLocations
    isPanLinkedRef.current = isPanLinked

    const updateScaleReadout = (nextScale) => {
        setScale(nextScale)
    }

    const syncScaleFrom = (sourceIndex) => {
        if(syncingRef.current || mapsRef.current.length !== LOCATION_GROUPS.length) return

        const sourceMap = mapsRef.current[sourceIndex]
        const targetMap = mapsRef.current[sourceIndex === 0 ? 1 : 0]
        if(!sourceMap || !targetMap) return

        const sourceScale = metersPerPixel(sourceMap.getCenter().lat, sourceMap.getZoom())
        const targetZoom = zoomForMetersPerPixel(targetMap.getCenter().lat, sourceScale)

        syncingRef.current = true
        targetMap.setZoom(targetZoom, {animate: false})
        syncingRef.current = false
        updateScaleReadout(sourceScale)
    }

    useEffect(() => {
        const initialLocations = selectedLocationsRef.current
        const initialScale = metersPerPixel(initialLocations[0].coordinates[1], STARTING_ZOOM)
        const maps = initialLocations.map((location, index) => {
            const map = L.map(containerRefs.current[index], {
                center: [location.coordinates[1], location.coordinates[0]],
                zoom: zoomForMetersPerPixel(location.coordinates[1], initialScale),
                minZoom: 3,
                maxZoom: 18.75,
                zoomSnap: 0,
                zoomDelta: 0.25,
                zoomControl: false,
                attributionControl: false,
                boxZoom: false
            })

            L.tileLayer(SATELLITE_TILE_URL, {
                minZoom: 3,
                maxZoom: 18.75,
                maxNativeZoom: 19,
                tileSize: 256,
                attribution: "Imagery © Esri"
            }).addTo(map)

            const markerIcon = L.divIcon({
                className: "location-compare-marker-shell",
                html: `<span class="location-compare-marker" style="--location-marker-accent:${LOCATION_GROUPS[index].accent}"></span>`,
                iconSize: [15, 15],
                iconAnchor: [7.5, 7.5]
            })
            const marker = L.marker([location.coordinates[1], location.coordinates[0]], {
                icon: markerIcon,
                keyboard: false,
                interactive: false,
                title: location.city
            })
                .addTo(map)
            markersRef.current[index] = marker

            map.on("zoom", () => syncScaleFrom(index))
            map.on("dragstart", () => {
                if(!isPanLinkedRef.current) return
                const targetIndex = index === 0 ? 1 : 0
                const targetMap = mapsRef.current[targetIndex]
                if(!targetMap) return

                panSyncRef.current = {
                    sourceIndex: index,
                    sourceStartPoint: map.project(map.getCenter(), map.getZoom()),
                    targetStartPoint: targetMap.project(targetMap.getCenter(), targetMap.getZoom())
                }
            })
            map.on("drag", () => {
                const session = panSyncRef.current
                if(!isPanLinkedRef.current || session?.sourceIndex !== index) return
                const targetMap = mapsRef.current[index === 0 ? 1 : 0]
                if(!targetMap) return

                const sourcePoint = map.project(map.getCenter(), map.getZoom())
                const delta = sourcePoint.subtract(session.sourceStartPoint)
                const targetCenter = targetMap.unproject(session.targetStartPoint.add(delta), targetMap.getZoom())
                targetMap.panTo(targetCenter, {animate: false, noMoveStart: true})
            })
            map.on("dragend", () => {
                if(panSyncRef.current?.sourceIndex === index) panSyncRef.current = null
            })
            return map
        })

        mapsRef.current = maps
        maps.forEach(map => map.invalidateSize())
        setMapsReady(true)

        return () => {
            maps.forEach(map => map.remove())
            mapsRef.current = []
            markersRef.current = []
        }
    }, [])

    useEffect(() => {
        const closeMenu = (event) => {
            if(event.key === "Escape" || (event.type === "pointerdown" && !menuRootRef.current?.contains(event.target))) {
                setOpenMenuIndex(null)
            }
        }
        document.addEventListener("pointerdown", closeMenu)
        document.addEventListener("keydown", closeMenu)
        return () => {
            document.removeEventListener("pointerdown", closeMenu)
            document.removeEventListener("keydown", closeMenu)
        }
    }, [])

    const changeZoom = (delta) => {
        const sourceMap = mapsRef.current[0]
        if(!sourceMap) return
        sourceMap.setZoom(sourceMap.getZoom() + delta, {animate: false})
    }

    const setScalePreset = (nextScale) => {
        if(mapsRef.current.length !== LOCATION_GROUPS.length) return

        syncingRef.current = true
        mapsRef.current.forEach(map => {
            map.setZoom(zoomForMetersPerPixel(map.getCenter().lat, nextScale), {animate: false})
        })
        syncingRef.current = false
        updateScaleReadout(nextScale)
    }

    const getPresetLabel = (presetId) => ({
        street: dataWrapper.locales.locationPresetStreetLabel,
        city: dataWrapper.locales.locationPresetCityLabel,
        region: dataWrapper.locales.locationPresetRegionLabel
    })[presetId]

    const togglePanLink = () => {
        panSyncRef.current = null
        setIsPanLinked(current => !current)
    }

    const resetMaps = () => {
        const defaults = LOCATION_GROUPS.map(group => group.locations.find(location => location.id === group.defaultLocationId))
        const initialScale = metersPerPixel(defaults[0].coordinates[1], STARTING_ZOOM)
        setSelectedLocationIds(defaults.map(location => location.id))
        syncingRef.current = true
        mapsRef.current.forEach((map, index) => {
            markersRef.current[index]?.setLatLng([defaults[index].coordinates[1], defaults[index].coordinates[0]])
            map.setView(
                [defaults[index].coordinates[1], defaults[index].coordinates[0]],
                zoomForMetersPerPixel(defaults[index].coordinates[1], initialScale),
                {animate: false}
            )
        })
        syncingRef.current = false
        updateScaleReadout(initialScale)
    }

    const selectLocation = (groupIndex, location) => {
        const map = mapsRef.current[groupIndex]
        if(!map) return
        if(selectedLocationIds[groupIndex] === location.id) {
            setOpenMenuIndex(null)
            return
        }

        const currentScale = metersPerPixel(map.getCenter().lat, map.getZoom())
        setSelectedLocationIds(currentIds => currentIds.map((id, index) => index === groupIndex ? location.id : id))
        setOpenMenuIndex(null)
        markersRef.current[groupIndex]?.setLatLng([location.coordinates[1], location.coordinates[0]])
        syncingRef.current = true
        map.once("moveend", () => {
            syncingRef.current = false
            updateScaleReadout(currentScale)
        })
        map.flyTo(
            [location.coordinates[1], location.coordinates[0]],
            zoomForMetersPerPixel(location.coordinates[1], currentScale),
            {duration: 0.85, easeLinearity: 0.22, noMoveStart: true}
        )
    }

    const getCountryLabel = (country) => ({
        bih: dataWrapper.locales.locationCountryBih,
        croatia: dataWrapper.locales.locationCountryCroatia,
        serbia: dataWrapper.locales.locationCountrySerbia,
        germany: dataWrapper.locales.locationCountryGermany
    })[country]

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className="article-location-compare">
            <div className="location-compare-intro">
                <span className="location-compare-kicker">{dataWrapper.locales.locationKicker}</span>
                <PretextLocationNarrative text={dataWrapper.locales.description}/>
            </div>

            <div className="location-compare-toolbar" aria-label={dataWrapper.locales.locationScaleLabel}>
                <div className="location-compare-lock">
                    <span className="location-compare-lock-signal" aria-hidden="true">
                        <i className="fa-solid fa-link"/>
                        <span className="location-compare-lock-dot"/>
                    </span>
                    <span className="location-compare-lock-copy">
                        <small>{dataWrapper.locales.locationScaleLabel}</small>
                        <strong>{formatScale(scale)}</strong>
                    </span>
                </div>
                <div className="location-compare-presets" aria-label={dataWrapper.locales.locationPresetsLabel}>
                    <span className="location-compare-presets-title"
                          title={dataWrapper.locales.locationPresetsLabel}
                          aria-hidden="true"><i className="fa-solid fa-ruler-combined"/></span>
                    <div className="location-compare-preset-list">
                        {SCALE_PRESETS.map(preset => {
                            const isActive = Math.abs(Math.log2(scale / preset.scale)) < 0.32
                            return (
                                <button type="button"
                                        key={preset.id}
                                        className={`location-compare-preset ${isActive ? "is-active" : ""}`}
                                        aria-pressed={isActive}
                                        onClick={() => setScalePreset(preset.scale)}>
                                    <i className={`fa-solid ${preset.icon}`} aria-hidden="true"/>
                                    <span>{getPresetLabel(preset.id)}</span>
                                    <em>{formatScale(preset.scale)}</em>
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="location-compare-actions">
                    <button type="button"
                            className={`location-compare-pan-link ${isPanLinked ? "is-active" : ""}`}
                            aria-pressed={isPanLinked}
                            onClick={togglePanLink}
                            aria-label={isPanLinked ? dataWrapper.locales.locationPanLinkedLabel : dataWrapper.locales.locationPanLinkLabel}>
                        <span className="location-compare-pan-link-icon" aria-hidden="true">
                            <i className={`fa-solid ${isPanLinked ? "fa-link" : "fa-link-slash"}`}/>
                        </span>
                        <span>{isPanLinked ? dataWrapper.locales.locationPanLinkedLabel : dataWrapper.locales.locationPanLinkLabel}</span>
                    </button>
                    <button type="button" className="location-compare-control location-compare-control--out" onClick={() => changeZoom(-1)} aria-label={dataWrapper.locales.locationZoomOutLabel}>
                        <span className="location-compare-control-orbit" aria-hidden="true"/>
                        <span className="location-compare-control-icon" aria-hidden="true"><i className="fa-solid fa-minus"/></span>
                        <small>{dataWrapper.locales.locationZoomOutLabel}</small>
                    </button>
                    <button type="button" className="location-compare-control location-compare-control--in" onClick={() => changeZoom(1)} aria-label={dataWrapper.locales.locationZoomInLabel}>
                        <span className="location-compare-control-orbit" aria-hidden="true"/>
                        <span className="location-compare-control-icon" aria-hidden="true"><i className="fa-solid fa-plus"/></span>
                        <small>{dataWrapper.locales.locationZoomInLabel}</small>
                    </button>
                    <button type="button" className="location-compare-reset" onClick={resetMaps}>
                        <span className="location-compare-reset-glow" aria-hidden="true"/>
                        <i className="fa-solid fa-location-crosshairs" aria-hidden="true"/>
                        <span>{dataWrapper.locales.locationResetLabel}</span>
                    </button>
                </div>
            </div>

            <div ref={menuRootRef} className={`location-compare-grid ${mapsReady ? "location-compare-grid--ready" : ""}`}>
                {selectedLocations.map((location, index) => (
                    <section className={`location-compare-card ${openMenuIndex === index ? "location-compare-card--menu-open" : ""}`}
                             key={LOCATION_GROUPS[index].id}
                             style={{
                                 "--location-accent-dark": LOCATION_GROUPS[index].accent,
                                 "--location-accent-light": LOCATION_GROUPS[index].lightAccent
                             }}>
                        <button type="button"
                                className="location-compare-label"
                                aria-haspopup="listbox"
                                aria-expanded={openMenuIndex === index}
                                onClick={() => setOpenMenuIndex(currentIndex => currentIndex === index ? null : index)}>
                            <span className="location-compare-index">0{index + 1}</span>
                            <span>
                                <small>{dataWrapper.locales.locationViewLabel}</small>
                                <strong>{location.city}</strong>
                                <em>{getCountryLabel(location.country)}</em>
                            </span>
                            <span className="location-compare-band-action">
                                <small>{dataWrapper.locales.locationChooseLabel}</small>
                                <i className="fa-solid fa-chevron-down" aria-hidden="true"/>
                            </span>
                        </button>
                        <div className="location-compare-viewport">
                            <div className="location-compare-map" ref={element => { containerRefs.current[index] = element }}/>
                            <div className={`location-compare-menu ${openMenuIndex === index ? "location-compare-menu--open" : ""}`}
                                 role="listbox"
                                 aria-label={dataWrapper.locales.locationChooseLabel}>
                                <div className="location-compare-menu-heading">
                                    <span><i className="fa-solid fa-satellite-dish"/> {index === 0 ? dataWrapper.locales.locationBalkanMenuLabel : dataWrapper.locales.locationGermanyMenuLabel}</span>
                                    <small>{LOCATION_GROUPS[index].locations.length} {dataWrapper.locales.locationPlacesLabel}</small>
                                </div>
                                <div className="location-compare-menu-grid">
                                    {LOCATION_GROUPS[index].locations.map((option, optionIndex) => (
                                        <button type="button"
                                                key={option.id}
                                                role="option"
                                                aria-selected={option.id === location.id}
                                                className={option.id === location.id ? "is-active" : ""}
                                                style={{"--location-option-index": optionIndex}}
                                                onClick={() => selectLocation(index, option)}>
                                            <span className="location-compare-option-marker"><i/></span>
                                            <span><strong>{option.city}</strong><small>{getCountryLabel(option.country)}</small></span>
                                            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"/>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <span className="location-compare-live"><i/> LIVE VIEW</span>
                        </div>
                    </section>
                ))}
                <div className="location-compare-bridge" aria-hidden="true">
                    <span className="location-compare-bridge-line"/>
                    <span className="location-compare-bridge-core">
                        <i className="fa-solid fa-arrows-left-right"/>
                        <strong>1:1</strong>
                    </span>
                    <span className="location-compare-bridge-line"/>
                </div>
            </div>

            <footer className="location-compare-footer">
                <span><i className="fa-solid fa-arrows-left-right"/> {dataWrapper.locales.locationHint}</span>
                <span>Satellite imagery © Esri</span>
            </footer>
        </Article>
    )
}

function PretextLocationNarrative({text}) {
    const elementRef = useRef(null)
    const [lines, setLines] = useState([text])

    useEffect(() => {
        const element = elementRef.current
        if(!element) return

        const layoutText = () => {
            const styles = window.getComputedStyle(element)
            const font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`
            const lineHeight = Number.parseFloat(styles.lineHeight) || Number.parseFloat(styles.fontSize) * 1.62
            const letterSpacing = Number.parseFloat(styles.letterSpacing) || 0
            const width = Math.max(1, element.clientWidth)
            const prepared = prepareWithSegments(text, font, {letterSpacing})
            const nextLines = layoutWithLines(prepared, width, lineHeight).lines.map(line => line.text)
            setLines(nextLines.length ? nextLines : [text])
        }

        layoutText()
        const observer = new ResizeObserver(layoutText)
        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [text])

    return (
        <p ref={elementRef} className="location-compare-pretext">
            {lines.map((line, index) => (
                <span key={`${index}-${line}`} style={{"--location-line-index": index}}>{line}</span>
            ))}
        </p>
    )
}

export default ArticleLocationCompare
