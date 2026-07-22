import "./GalleryModal.scss"
import "swiper/swiper-bundle.css"
import React, {useEffect, useState} from 'react'
import {ModalWrapper, ModalWrapperTitle, ModalWrapperBody} from "./base/ModalWrapper"
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Pagination} from "swiper/modules"
import {useUtils} from "../../hooks/utils.js"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {Spinner} from "react-bootstrap"
import {BaseImage} from "../generic/ImageView.jsx"
import {IMAGE_LIFECYCLE_STATUS} from "../../hooks/useImageStatus.js"

function GalleryModal({ target, onDismiss }) {
    const utils = useUtils()
    const viewport = useViewport()
    const images = target?.images || []
    const type = target?.type
    const title = target?.title
    const isMobile = !viewport.isBreakpoint("lg")

    const [activeIndex, setActiveIndex] = useState(0)
    const [didLoadInitialImages, setDidLoadInitialImages] = useState(false)
    const [imageStates, setImageStates] = useState({})
    const [imageDimensions, setImageDimensions] = useState({})
    const [shouldDismiss, setShouldDismiss] = useState(false)
    const parameterOptions = [
        {id: "9:16", suffix: "portrait", direction: "horizontal"},
        {id: "16:9", suffix: "landscape", direction: isMobile ? "vertical" : "horizontal"},
        {id: "1:1", suffix: "default", direction: isMobile ? "vertical" : "horizontal"},
    ]
    const fallbackParameters = parameterOptions.find(item => item.id === "1:1")
    const parameters = target ?
        utils.array.withId(parameterOptions, type, "default") || fallbackParameters :
        fallbackParameters

    const initialReadyIndices = _getInitialReadyIndices(parameters.direction, images.length)
    const shouldShowSpinner = images.length > 0 && !didLoadInitialImages
    const modalCustomClass = shouldShowSpinner ? `gallery-modal-loading` : ``

    useEffect(() => {
        setActiveIndex(0)
        setDidLoadInitialImages(false)
        setImageStates({})
        setImageDimensions({})
    }, [target])

    useEffect(() => {
        setShouldDismiss(false)
    }, [target])

    useEffect(() => {
        if(!target || parameters.direction !== "horizontal" || typeof document === "undefined")
            return

        document.body.classList.add("gallery-modal-horizontal-open")

        return () => {
            document.body.classList.remove("gallery-modal-horizontal-open")
        }
    }, [target, parameters.direction])

    useEffect(() => {
        if(didLoadInitialImages)
            return

        if(!initialReadyIndices.length) {
            setDidLoadInitialImages(true)
            return
        }

        const didSettleEveryInitialImage = initialReadyIndices.every(index => {
            const state = imageStates[index]
            return state === IMAGE_LIFECYCLE_STATUS.LOADED || state === IMAGE_LIFECYCLE_STATUS.ERROR
        })

        if(didSettleEveryInitialImage) {
            setDidLoadInitialImages(true)
        }
    }, [didLoadInitialImages, imageStates, initialReadyIndices])

    useEffect(() => {
        if(!images.length)
            return

        const candidates = [
            images[activeIndex - 1],
            images[activeIndex + 1]
        ].filter(Boolean)

        candidates.forEach(candidate => {
            const prewarm = new window.Image()
            prewarm.decoding = "async"
            prewarm.src = utils.file.resolvePath(candidate)
        })
    }, [activeIndex, images, utils.file])

    useEffect(() => {
        if(!images.length)
            return

        let cancelled = false
        const loaders = images.map((image, index) => {
            const loader = new window.Image()
            loader.decoding = "async"
            loader.onload = () => {
                if(cancelled || loader.naturalWidth <= 0 || loader.naturalHeight <= 0)
                    return

                setImageDimensions(previousDimensions => {
                    const previous = previousDimensions[index]
                    const next = {
                        width: loader.naturalWidth,
                        height: loader.naturalHeight
                    }

                    if(previous?.width === next.width && previous?.height === next.height)
                        return previousDimensions

                    return {
                        ...previousDimensions,
                        [index]: next
                    }
                })
            }
            loader.src = utils.file.resolvePath(image)
            return loader
        })

        return () => {
            cancelled = true
            for(const loader of loaders) {
                loader.onload = null
                loader.onerror = null
            }
        }
    }, [images, utils.file])

    if(!target)
        return <></>

    const visibilityClassName = didLoadInitialImages ?
        `visible` :
        `invisible`

    const _onImageStatus = (index, nextStatus) => {
        const settledStatus = nextStatus === IMAGE_LIFECYCLE_STATUS.IDLE ?
            IMAGE_LIFECYCLE_STATUS.ERROR :
            nextStatus

        setImageStates(previousState => {
            if(previousState[index] === settledStatus) {
                return previousState
            }

            return {
                ...previousState,
                [index]: settledStatus
            }
        })
    }

    const _onClose = () => {
        setShouldDismiss(true)
    }

    const _onHorizontalChromeClick = (event) => {
        if(parameters.direction !== "horizontal")
            return

        const clickedSafeControl = event.target?.closest?.(
            ".gallery-modal-image-surface, .swiper-button-prev, .swiper-button-next"
        )

        if(clickedSafeControl)
            return

        _onClose()
    }

    return (
        <ModalWrapper id={`gallery-modal`}
                      className={`${modalCustomClass} gallery-modal-${parameters.direction}`}
                      dialogClassName={`modal-fullscreen`}
                      shouldDismiss={shouldDismiss}
                      onDismiss={onDismiss}>
            <ModalWrapperTitle title={title}
                               faIcon={`fa-regular fa-image`}
                               onClose={_onClose}
                               tooltip={"hidden"}
                               className={parameters.direction === "horizontal" ? `gallery-modal-dismiss-zone` : ``}
                               onClick={parameters.direction === "horizontal" ? _onHorizontalChromeClick : null}/>

            <ModalWrapperBody className={`gallery-modal-body`}
                              onClick={_onHorizontalChromeClick}>
                {parameters.direction === "horizontal" && (
                    <GalleryModalSwiper className={visibilityClassName}
                                        images={images}
                                        type={parameters.suffix}
                                        imageDimensions={imageDimensions}
                                        activeIndex={activeIndex}
                                        onActiveIndexChange={setActiveIndex}
                                        onImageStatus={_onImageStatus}/>
                )}

                {parameters.direction === "vertical" && (
                    <GalleryModalImageStack className={visibilityClassName}
                                            images={images}
                                            onImageStatus={_onImageStatus}/>
                )}

                {shouldShowSpinner && (
                    <GalleryModalSpinner/>
                )}
            </ModalWrapperBody>
        </ModalWrapper>
    )
}

function GalleryModalSwiper({ className, images, type, imageDimensions, activeIndex, onActiveIndexChange, onImageStatus }) {
    const utils = useUtils()

    return (
        <Swiper slidesPerView={"auto"}
                direction={"horizontal"}
                spaceBetween={15}
                centeredSlides={true}
                pagination={{clickable: true}}
                navigation={true}
                modules={[Pagination, Navigation]}
                onSlideChange={swiper => onActiveIndexChange(swiper.activeIndex)}
                className={`gallery-swiper gallery-swiper-${type} ${className}`}>
            {images.map((image, key) => {
                const shouldPrioritize = Math.abs(key - activeIndex) <= 1
                const dimensions = imageDimensions?.[key]
                const slideStyle = getGallerySlideStyle(dimensions)

                return (
                    <SwiperSlide key={key}
                                 className={`gallery-swiper-slide`}
                                 style={slideStyle}>
                        <GalleryModalImage className={`swiper-image`}
                                           alt={`img-` + key}
                                           src={utils.file.resolvePath(image)}
                                           shouldPrioritize={shouldPrioritize}
                                           onStatus={(status) => onImageStatus(key, status)}/>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

function GalleryModalImageStack({ className, images, onImageStatus }) {
    const utils = useUtils()

    return (
        <div className={`gallery-modal-image-stack ${className}`}>
            {images.map((image, key) => (
                <div key={key}
                     className={`gallery-modal-image-stack-item`}>
                    <GalleryModalImage className={`swiper-image`}
                                       alt={`img-` + key}
                                       src={utils.file.resolvePath(image)}
                                       shouldPrioritize={key === 0}
                                       onStatus={(status) => onImageStatus(key, status)}/>
                </div>
            ))}
        </div>
    )
}

function GalleryModalImage({ className, alt, src, shouldPrioritize, onStatus }) {
    const sizes = getGalleryImageSizes(className)

    return (
        <BaseImage src={src}
                   alt={alt}
                   className={`gallery-modal-image-surface ${className}`}
                    loading={shouldPrioritize ? "eager" : "lazy"}
                   decoding={`async`}
                   fetchPriority={shouldPrioritize ? "high" : "auto"}
                   sizes={sizes}
                   onStatus={onStatus}
                   renderLoading={() => (
                       <div className={`gallery-modal-image-state gallery-modal-image-state-loading`}>
                           <Spinner/>
                       </div>
                   )}
                   renderError={() => (
                       <div className={`gallery-modal-image-state gallery-modal-image-state-error`}
                            aria-hidden={true}>
                           <i className={`fa-regular fa-image`}/>
                           <span>Image unavailable</span>
                       </div>
                   )}/>
    )
}

function GalleryModalSpinner() {
    return (
        <div className={`gallery-modal-spinner`}>
            <Spinner/>
        </div>
    )
}

export default GalleryModal

function _getInitialReadyIndices(direction, imageCount) {
    if(imageCount <= 0)
        return []

    if(direction === "horizontal")
        return imageCount === 1 ? [0] : [0, 1]

    return [0]
}

function getGalleryImageSizes(className) {
    if(className.includes("portrait"))
        return "(max-width: 991.98px) 100vw, 56vw"

    if(className.includes("landscape"))
        return "(max-width: 991.98px) 100vw, 90vw"

    return "(max-width: 991.98px) 100vw, 70vw"
}

function getGallerySlideStyle(dimensions) {
    const width = Number(dimensions?.width)
    const height = Number(dimensions?.height)

    if(!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0)
        return undefined

    return {
        "--gallery-image-aspect-ratio": `${width} / ${height}`,
        "--gallery-image-aspect-ratio-value": width / height
    }
}
