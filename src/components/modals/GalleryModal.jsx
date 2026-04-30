import "./GalleryModal.scss"
import React, {useEffect, useRef, useState} from 'react'
import {ModalWrapper, ModalWrapperTitle, ModalWrapperBody} from "./base/ModalWrapper"
import { Swiper, SwiperSlide } from 'swiper/react'
import {Navigation, Pagination} from "swiper/modules"
import {useUtils} from "../../hooks/utils.js"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {Spinner} from "react-bootstrap"

function GalleryModal({ target, onDismiss }) {
    const utils = useUtils()
    const viewport = useViewport()
    const images = target?.images || []
    const type = target?.type
    const title = target?.title
    const isMobile = !viewport.isBreakpoint("lg")

    const [activeIndex, setActiveIndex] = useState(0)
    const [didLoadInitialImages, setDidLoadInitialImages] = useState(false)
    const [loadedImages, setLoadedImages] = useState({})
    const [shouldDismiss, setShouldDismiss] = useState(false)
    const parameterOptions = [
        { id: "9:16",   suffix: "portrait",     direction: "horizontal" },
        { id: "16:9",   suffix: "landscape",    direction: isMobile ? "vertical" : "horizontal" },
        { id: "1:1",    suffix: "default",      direction: isMobile ? "vertical" : "horizontal" },
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
        setLoadedImages({})
    }, [target])

    useEffect(() => {
        setShouldDismiss(false)
    }, [target])

    useEffect(() => {
        if(didLoadInitialImages)
            return

        if(!initialReadyIndices.length) {
            setDidLoadInitialImages(true)
            return
        }

        const didLoadEveryInitialImage = initialReadyIndices.every(index => loadedImages[index])
        if(didLoadEveryInitialImage) {
            setDidLoadInitialImages(true)
        }
    }, [didLoadInitialImages, initialReadyIndices, loadedImages])

    if(!target)
        return <></>

    const visibilityClassName = didLoadInitialImages ?
        `visible` :
        `invisible`

    const _onImageReady = (index) => {
        setLoadedImages(previousState => {
            if(previousState[index]) {
                return previousState
            }

            return {
                ...previousState,
                [index]: true
            }
        })
    }

    const _onClose = () => {
        setShouldDismiss(true)
    }

    return (
        <ModalWrapper id={`gallery-modal`}
                      className={`${modalCustomClass} gallery-modal-${parameters.direction}`}
                      dialogClassName={`modal-fullscreen`}
                      shouldDismiss={shouldDismiss}
                      onDismiss={onDismiss}>
            <ModalWrapperTitle title={title}
                               faIcon={`fa-regular fa-image`}
                               onClose={_onClose} tooltip={"hidden"}/>

            <ModalWrapperBody className={`gallery-modal-body`}>
                {parameters.direction === "horizontal" && (
                    <GalleryModalSwiper className={visibilityClassName}
                                        images={images}
                                        type={parameters.suffix}
                                        activeIndex={activeIndex}
                                        onActiveIndexChange={setActiveIndex}
                                        onImageReady={_onImageReady}/>
                )}

                {parameters.direction === "vertical" && (
                    <GalleryModalImageStack className={visibilityClassName}
                                            images={images}
                                            onImageReady={_onImageReady}/>
                )}

                {shouldShowSpinner && (
                    <GalleryModalSpinner/>
                )}
            </ModalWrapperBody>
        </ModalWrapper>
    )
}

function GalleryModalSwiper({ className, images, type, activeIndex, onActiveIndexChange, onImageReady }) {
    const utils = useUtils()

    return (
        <Swiper slidesPerView={"auto"}
                direction={"horizontal"}
                spaceBetween={15}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Navigation]}
                onSlideChange={swiper => onActiveIndexChange(swiper.activeIndex)}
                className={`gallery-swiper gallery-swiper-${type} ${className}`}>
            {images.map((image, key) => {
                const shouldPrioritize = Math.abs(key - activeIndex) <= 1

                return (
                    <SwiperSlide key={key}
                                 className={`gallery-swiper-slide`}>
                        <GalleryModalImage className={`swiper-image`}
                                           alt={`img-` + key}
                                           src={utils.file.resolvePath(image)}
                                           shouldPrioritize={shouldPrioritize}
                                           onReady={() => onImageReady(key)}/>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

function GalleryModalImageStack({ className, images, onImageReady }) {
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
                                       onReady={() => onImageReady(key)}/>
                </div>
            ))}
        </div>
    )
}

function GalleryModalImage({ className, alt, src, shouldPrioritize, onReady }) {
    const imageRef = useRef(null)
    const onReadyRef = useRef(onReady)
    const didNotifyReadyRef = useRef(false)

    useEffect(() => {
        onReadyRef.current = onReady
    }, [onReady])

    useEffect(() => {
        didNotifyReadyRef.current = false

        if(imageRef.current?.complete) {
            didNotifyReadyRef.current = true
            onReadyRef.current?.()
        }
    }, [src])

    const _onReady = () => {
        if(didNotifyReadyRef.current)
            return

        didNotifyReadyRef.current = true
        onReadyRef.current?.()
    }

    return (
        <img ref={imageRef}
             className={className}
             alt={alt}
             src={src}
             loading={shouldPrioritize ? "eager" : "lazy"}
             decoding={`async`}
             fetchPriority={shouldPrioritize ? "high" : "auto"}
             onLoad={_onReady}
             onError={_onReady}/>
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
