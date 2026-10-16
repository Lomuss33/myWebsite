import "./GalleryModal.scss"
import "swiper/css"
import "swiper/css/zoom"
import React, {useCallback, useId, useLayoutEffect, useRef, useState} from "react"
import {createPortal} from "react-dom"
import {Swiper, SwiperSlide} from "swiper/react"
import {A11y, Zoom} from "swiper/modules"
import {Spinner} from "react-bootstrap"
import {BaseImage} from "../generic/ImageView.jsx"
import {useUtils} from "../../hooks/utils.js"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {galleryLabels} from "../../data/galleryI18n.js"
import {IMAGE_LIFECYCLE_STATUS} from "../../hooks/useImageStatus.js"

// Every album uses this viewer, independent of image shape, page or viewport.
export default function GalleryModal({target, onDismiss}) {
    const utils = useUtils()
    const language = useLanguage()
    const labels = galleryLabels[language.selectedLanguageId] || galleryLabels.en
    const images = target.images
    const title = utils.string.stripHTMLTags(target.title || language.getString("gallery"))
    const titleId = useId()
    const dialogRef = useRef(null)
    const swiperRef = useRef(null)
    const pointerRef = useRef(null)
    const touchPointersRef = useRef(new Set())
    const pinchingRef = useRef(false)
    const historyIdRef = useRef(null)
    const closingRef = useRef(false)
    const dismissRef = useRef(onDismiss)
    const [activeIndex, setActiveIndex] = useState(0)
    const [zoomed, setZoomed] = useState(false)
    const [imageStates, setImageStates] = useState({})
    const canZoom = imageStates[activeIndex] === IMAGE_LIFECYCLE_STATUS.LOADED

    useLayoutEffect(() => { dismissRef.current = onDismiss }, [onDismiss])

    const close = useCallback(() => {
        // History traversal is asynchronous. Ignore extra taps/Escape events
        // until the first close completes, rather than leaving the album page.
        if(closingRef.current) return
        closingRef.current = true
        if(historyIdRef.current && history.state?.galleryViewer === historyIdRef.current) {
            // Back closes the viewer before leaving the current page.
            history.back()
        } else {
            dismissRef.current()
        }
    }, [])

    useLayoutEffect(() => {
        const dialog = dialogRef.current
        const opener = target.opener || document.activeElement
        const historyId = crypto.randomUUID()
        closingRef.current = false
        historyIdRef.current = historyId
        history.pushState({...history.state, galleryViewer: historyId}, "")
        const onBack = () => {
            if(history.state?.galleryViewer !== historyId) {
                closingRef.current = true
                dismissRef.current()
            }
        }
        window.addEventListener("popstate", onBack)
        document.documentElement.classList.add("gallery-modal-open")
        dialog.showModal()
        dialog.querySelector(".gallery-close").focus({preventScroll: true})
        return () => {
            window.removeEventListener("popstate", onBack)
            dialog.close()
            document.documentElement.classList.remove("gallery-modal-open")
            if(history.state?.galleryViewer === historyId)
                history.back()
            if(opener?.isConnected)
                opener.focus({preventScroll: true})
        }
    }, [target])

    const onPointerDown = event => {
        // A second finger starts a pinch, never a dismissal gesture.
        if(event.pointerType === "touch")
            touchPointersRef.current.add(event.pointerId)
        if(touchPointersRef.current.size > 1) {
            pinchingRef.current = true
            swiperRef.current.allowTouchMove = false
            pointerRef.current = null
            return
        }
        if(!event.isPrimary) {
            pointerRef.current = null
            return
        }
        pointerRef.current = {x: event.clientX, y: event.clientY, type: event.pointerType}
    }
    const releasePinch = event => {
        touchPointersRef.current.delete(event.pointerId)
        if(pinchingRef.current && touchPointersRef.current.size === 0) {
            // Keep slide navigation disabled through both pointer-up handlers.
            // Otherwise the first finger's travel can advance the album when
            // the pinch ends, immediately throwing away its zoom.
            requestAnimationFrame(() => {
                pinchingRef.current = false
                if(swiperRef.current && !swiperRef.current.destroyed)
                    swiperRef.current.allowTouchMove = true
            })
        }
    }
    const onPointerUp = event => {
        releasePinch(event)
        if(pinchingRef.current) return
        const start = pointerRef.current
        if(!start) return
        const dx = Math.abs(event.clientX - start.x)
        const dy = Math.abs(event.clientY - start.y)
        // Keep the delta through click so a swipe cannot become a backdrop tap.
        pointerRef.current = {...start, moved: dx > 8 || dy > 8}
        if(start.type === "touch" && dy > 80 && dy > dx * 1.5 && !zoomed)
            close()
    }
    const onStageClick = event => {
        const pointer = pointerRef.current
        pointerRef.current = null
        if(pointer?.moved || swiperRef.current?.allowClick === false || zoomed)
            return
        const image = event.target.closest(".swiper-slide-active")?.querySelector("img")
        if(image) {
            const rect = image.getBoundingClientRect()
            if(event.clientX >= rect.left && event.clientX <= rect.right &&
                event.clientY >= rect.top && event.clientY <= rect.bottom)
                return
        }
        close()
    }
    const navigate = delta => {
        const swiper = swiperRef.current
        if(!swiper || swiper.destroyed || closingRef.current) return
        swiper.zoom.out()
        // Explicit indices avoid slidePrev's fractional snap rounding skipping
        // an image in Firefox/WebKit. Buttons and keys share the same step.
        swiper.slideTo(Math.max(0, Math.min(images.length - 1, swiper.activeIndex + delta)))
    }
    const onSlideChange = swiper => {
        setActiveIndex(swiper.activeIndex)
        setZoomed(false)
        const focused = document.activeElement
        // Disabling the focused arrow can send focus to the document body,
        // where dialog shortcuts no longer receive keyboard events.
        if((swiper.activeIndex === 0 && focused?.classList.contains("gallery-previous")) ||
            (swiper.activeIndex === images.length - 1 && focused?.classList.contains("gallery-next")))
            dialogRef.current.querySelector(".gallery-close").focus({preventScroll: true})
    }

    return createPortal(
        <dialog id="gallery-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId}
                onKeyDown={event => {
                    if(event.altKey || event.ctrlKey || event.metaKey) return
                    if(event.key === "Tab") {
                        // Keep cycling through the viewer controls, including
                        // when loading/boundary states disable a button.
                        const controls = event.currentTarget.querySelectorAll("button:not(:disabled)")
                        const first = controls[0]
                        const last = controls[controls.length - 1]
                        if(event.shiftKey && document.activeElement === first) {
                            event.preventDefault()
                            last.focus()
                        } else if(!event.shiftKey && document.activeElement === last) {
                            event.preventDefault()
                            first.focus()
                        }
                        return
                    }
                    const key = event.key.toLowerCase()
                    const direction = {arrowleft: -1, a: -1, arrowright: 1, d: 1}[key]
                    const shouldClose = key === " " || key === "escape"
                    if(!direction && !shouldClose) return
                    event.preventDefault()
                    event.stopPropagation()
                    // Space closes even when an arrow/zoom button has focus;
                    // prevent its default button activation before dismissing.
                    if(shouldClose) close()
                    else navigate(direction)
                }}
                onCancel={event => { event.preventDefault(); close() }}>
            <div className="gallery-viewer">
                <header className="gallery-toolbar">
                    <h2 id={titleId}>{title}</h2>
                    <button type="button" className="gallery-zoom" aria-label={zoomed ? labels.zoomOut : labels.zoomIn}
                            aria-pressed={zoomed} disabled={!canZoom} onClick={() => swiperRef.current?.zoom.toggle()}>
                        <i className={zoomed ? "fa-solid fa-magnifying-glass-minus" : "fa-solid fa-magnifying-glass-plus"} aria-hidden="true"/>
                    </button>
                    <button type="button" className="gallery-close" aria-label={language.getString("close_window")}
                            aria-keyshortcuts="Escape Space"
                            onClick={close} autoFocus>
                        <i className="fa-solid fa-xmark" aria-hidden="true"/>
                    </button>
                </header>
                <div className="gallery-stage" onPointerDownCapture={onPointerDown}
                     onPointerUpCapture={onPointerUp} onPointerCancel={event => { releasePinch(event); pointerRef.current = null }}
                     onDragStart={event => event.preventDefault()}
                     onClick={onStageClick}>
                    <Swiper className="gallery-swiper" slidesPerView={1} spaceBetween={16}
                            direction="horizontal" modules={[A11y, Zoom]}
                            zoom={{maxRatio: 4, toggle: false}}
                            a11y={{containerMessage: title, slideLabelMessage: "{{index}} / {{slidesLength}}"}}
                            speed={window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220}
                            onSwiper={swiper => { swiperRef.current = swiper }}
                            onDoubleTap={swiper => { if(canZoom) swiper.zoom.toggle() }}
                            onZoomChange={(_swiper, scale) => setZoomed(scale > 1)}
                            onSlideChange={onSlideChange}>
                        {images.map((image, index) => (
                            <SwiperSlide key={index} className="gallery-slide">
                                {Math.abs(index - activeIndex) <= 1 && (
                                    <div className="swiper-zoom-container">
                                        <BaseImage src={utils.file.resolvePath(image)} alt={title + " — " + (index + 1) + " / " + images.length}
                                                   className="gallery-image" loading="eager" decoding="async"
                                                   fetchPriority={index === activeIndex ? "high" : "auto"} sizes="100vw"
                                                   onStatus={status => setImageStates(previous => previous[index] === status ? previous : {...previous, [index]: status})}
                                                   renderLoading={() => <div className="gallery-image-state" role="status" aria-label={language.getString("loading")}><Spinner/></div>}
                                                   renderError={() => <div className="gallery-image-state" role="status"><i className="fa-regular fa-image" aria-hidden="true"/><span>{labels.unavailable}</span></div>}/>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <footer className="gallery-controls">
                    <button type="button" className="gallery-previous" aria-label={labels.previous}
                            aria-keyshortcuts="ArrowLeft A"
                            disabled={activeIndex === 0} onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-chevron-left" aria-hidden="true"/>
                    </button>
                    <output aria-live="polite" aria-atomic="true">{activeIndex + 1} / {images.length}</output>
                    <button type="button" className="gallery-next" aria-label={labels.next}
                            aria-keyshortcuts="ArrowRight D"
                            disabled={activeIndex === images.length - 1} onClick={() => navigate(1)}>
                        <i className="fa-solid fa-chevron-right" aria-hidden="true"/>
                    </button>
                </footer>
            </div>
        </dialog>, document.body)
}
