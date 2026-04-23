import "./ImageView.scss"
import React, {useEffect, useRef, useState} from 'react'
import {useConstants} from "../../hooks/constants.js"
import {Spinner} from "react-bootstrap"
import {useUtils} from "../../hooks/utils.js"

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
    fetchPriority = "auto"
}) {
    const [loadStatus, setLoadStatus] = useState(ImageView.LoadStatus.LOADING)
    const [loadedSrc, setLoadedSrc] = useState(null)
    const [errorSrc, setErrorSrc] = useState(null)

    /** @listens src **/
    useEffect(() => {
        if(src && src.length > 0) setLoadStatus(ImageView.LoadStatus.LOADING)
        else setLoadStatus(ImageView.LoadStatus.ERROR)
    }, [src])

    /** @listens loadedSrc|errorSrc **/
    useEffect(() => {
        if(loadedSrc && src === loadedSrc)
            setLoadStatus(ImageView.LoadStatus.LOADED)
        else if(errorSrc && src === errorSrc)
            setLoadStatus(ImageView.LoadStatus.ERROR)
        else if(src && src.length > 0)
            setLoadStatus(ImageView.LoadStatus.LOADING)
    }, [loadedSrc, errorSrc])

    /** @listens loadStatus **/
    useEffect(() => {
        onStatus && onStatus(loadStatus)
    }, [loadStatus])

    const spinnerVisible = loadStatus === ImageView.LoadStatus.LOADING && !hideSpinner
    const containerVisible = loadStatus === ImageView.LoadStatus.LOADED
    const errorVisible = loadStatus === ImageView.LoadStatus.ERROR

    const _onLoad = () => {
        setLoadedSrc(src)
        setErrorSrc(null)
    }

    const _onError = () => {
        setLoadedSrc(null)
        setErrorSrc(src)
    }

    return (
        <div className={`image-view ${className}`}
             id={id}
             style={style}>
            <ImageViewContainer src={src}
                                alt={alt}
                                visible={containerVisible}
                                loadStatus={loadStatus}
                                loading={loading}
                                decoding={decoding}
                                fetchPriority={fetchPriority}
                                onLoad={_onLoad}
                                onError={_onError}/>

            <ImageViewSpinner visible={spinnerVisible}/>
            <ImageViewError visible={errorVisible}
                            hideIcon={hideSpinner}/>
        </div>
    )
}

ImageView.LoadStatus = {
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error"
}

function ImageViewContainer({ src, alt, visible, loadStatus, loading, decoding, fetchPriority, onLoad, onError }) {
    const constants = useConstants()
    const utils = useUtils()
    const imageRef = useRef(null)

    const resolvedSrc = utils.file.resolvePath(src)
    const visibleClass = visible ? `visible` : `invisible`

    useEffect(() => {
        if(!imageRef.current)
            return

        if(fetchPriority && fetchPriority !== "auto") {
            imageRef.current.setAttribute("fetchpriority", fetchPriority)
        }
        else {
            imageRef.current.removeAttribute("fetchpriority")
        }
    }, [fetchPriority])

    return (
        <img className={`image-view-img ${visibleClass} ${constants.HTML_CLASSES.imageView} ${constants.HTML_CLASSES.imageView}-${loadStatus}`}
             ref={imageRef}
             src={resolvedSrc}
             alt={alt}
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
        <div className={`image-view-error-wrapper`}>
            {!hideIcon && (
                <i className={`fa-solid fa-eye-slash`}/>
            )}
        </div>
    )

}

export default ImageView
