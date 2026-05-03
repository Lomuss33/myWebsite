import "./ImageView.scss"
import React, {useEffect, useRef} from 'react'
import {useConstants} from "../../hooks/constants.js"
import {Spinner} from "react-bootstrap"
import {IMAGE_LIFECYCLE_STATUS, useImageStatus} from "../../hooks/useImageStatus.js"

function ImageView({
    src,
    alt = "",
    className = "",
    id = null,
    hideSpinner = false,
    style = null,
    onStatus = null,
    loading = "lazy",
    decoding = "async",
    fetchPriority = "auto",
    sizes = null
}) {
    const imageStatus = useImageStatus(src)
    const loadStatus = imageStatus.status

    useEffect(() => {
        onStatus && onStatus(loadStatus)
    }, [loadStatus, onStatus])

    const spinnerVisible = loadStatus === ImageView.LoadStatus.LOADING && !hideSpinner
    const containerVisible = loadStatus === ImageView.LoadStatus.LOADED
    const errorVisible =
        loadStatus === ImageView.LoadStatus.ERROR ||
        loadStatus === ImageView.LoadStatus.IDLE

    return (
        <div className={`image-view ${className}`}
             id={id}
             style={style}>
            <ImageViewContainer resolvedSrc={imageStatus.resolvedSrc}
                                resolvedSrcSet={imageStatus.normalizedSource.srcSet}
                                sizes={sizes || imageStatus.normalizedSource.sizes}
                                width={imageStatus.normalizedSource.width}
                                height={imageStatus.normalizedSource.height}
                                alt={alt}
                                visible={containerVisible}
                                loadStatus={loadStatus}
                                canRenderImg={imageStatus.canRenderImg}
                                loading={loading}
                                decoding={decoding}
                                fetchPriority={fetchPriority}
                                syncFromElement={imageStatus.syncFromElement}
                                onLoad={() => imageStatus.setLoaded(imageStatus.resolvedSrc)}
                                onError={() => imageStatus.setError(imageStatus.resolvedSrc)}/>

            <ImageViewSpinner visible={spinnerVisible}/>
            <ImageViewError visible={errorVisible}
                            hideIcon={hideSpinner}/>
        </div>
    )
}

ImageView.LoadStatus = {
    IDLE: IMAGE_LIFECYCLE_STATUS.IDLE,
    LOADING: IMAGE_LIFECYCLE_STATUS.LOADING,
    LOADED: IMAGE_LIFECYCLE_STATUS.LOADED,
    ERROR: IMAGE_LIFECYCLE_STATUS.ERROR
}

function ImageViewContainer({ resolvedSrc, resolvedSrcSet, sizes, width, height, alt, visible, loadStatus, canRenderImg, loading, decoding, fetchPriority, syncFromElement, onLoad, onError }) {
    const constants = useConstants()
    const imageRef = useRef(null)
    const visibilityClass = visible ? `image-view-img-visible` : `image-view-img-hidden`

    useEffect(() => {
        if(!imageRef.current)
            return

        if(fetchPriority && fetchPriority !== "auto") {
            imageRef.current.setAttribute("fetchpriority", fetchPriority)
        }
        else {
            imageRef.current.removeAttribute("fetchpriority")
        }
    }, [fetchPriority, resolvedSrc])

    useEffect(() => {
        syncFromElement(imageRef.current)
    }, [resolvedSrc, syncFromElement])

    if(!canRenderImg || !resolvedSrc)
        return <></>

    return (
        <img className={`image-view-img ${visibilityClass} ${constants.HTML_CLASSES.imageView} ${constants.HTML_CLASSES.imageView}-${loadStatus}`}
             ref={imageRef}
             src={resolvedSrc}
             srcSet={resolvedSrcSet || undefined}
             sizes={sizes || undefined}
             alt={alt}
             width={width || undefined}
             height={height || undefined}
             loading={loading}
             decoding={decoding}
             onLoad={onLoad}
             onError={onError}/>
    )
}

function ImageViewSpinner({ visible }) {
    if(!visible)
        return <></>

    return (
        <div className={`image-view-spinner-wrapper`}>
            <Spinner/>
        </div>
    )
}

function ImageViewError({ visible, hideIcon }) {
    if(!visible)
        return <></>

    return (
        <div className={`image-view-error-wrapper`}
             aria-hidden={true}>
            <div className={`image-view-error-content ${hideIcon ? "image-view-error-content-subtle" : ""}`}>
                <i className={`fa-regular fa-image image-view-error-icon`}/>
                {!hideIcon && (
                    <span className={`image-view-error-label`}>Image unavailable</span>
                )}
            </div>
        </div>
    )

}

export function BaseImage({
    src,
    alt = "",
    className = "",
    loading = "lazy",
    decoding = "async",
    fetchPriority = "auto",
    sizes = null,
    onStatus = null,
    renderError = null,
    renderLoading = null
}) {
    const imageStatus = useImageStatus(src)
    const imageRef = useRef(null)

    useEffect(() => {
        onStatus && onStatus(imageStatus.status)
    }, [imageStatus.status, onStatus])

    useEffect(() => {
        if(!imageRef.current)
            return

        if(fetchPriority && fetchPriority !== "auto") {
            imageRef.current.setAttribute("fetchpriority", fetchPriority)
        }
        else {
            imageRef.current.removeAttribute("fetchpriority")
        }
    }, [fetchPriority, imageStatus.resolvedSrc])

    useEffect(() => {
        imageStatus.syncFromElement(imageRef.current)
    }, [imageStatus.resolvedSrc, imageStatus.syncFromElement])

    const loadingVisible = imageStatus.status === IMAGE_LIFECYCLE_STATUS.LOADING
    const errorVisible =
        imageStatus.status === IMAGE_LIFECYCLE_STATUS.ERROR ||
        imageStatus.status === IMAGE_LIFECYCLE_STATUS.IDLE

    return (
        <div className={`image-frame ${className}`}>
            {imageStatus.canRenderImg && imageStatus.resolvedSrc && (
                <img ref={imageRef}
                     className={`image-frame-img ${loadingVisible || errorVisible ? "image-frame-img-hidden" : "image-frame-img-visible"}`}
                     src={imageStatus.resolvedSrc}
                     srcSet={imageStatus.normalizedSource.srcSet || undefined}
                     sizes={sizes || imageStatus.normalizedSource.sizes || undefined}
                     alt={alt}
                     width={imageStatus.normalizedSource.width || undefined}
                     height={imageStatus.normalizedSource.height || undefined}
                     loading={loading}
                     decoding={decoding}
                     onLoad={() => imageStatus.setLoaded(imageStatus.resolvedSrc)}
                     onError={() => imageStatus.setError(imageStatus.resolvedSrc)}/>
            )}

            {loadingVisible && renderLoading?.()}
            {errorVisible && renderError?.(imageStatus.status)}
        </div>
    )
}

export default ImageView
