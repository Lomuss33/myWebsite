import {useEffect, useMemo, useRef, useState} from "react"
import {_imageUtils} from "./utils/_image-utils.js"

export const IMAGE_LIFECYCLE_STATUS = {
    IDLE: "idle",
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error"
}

export function useImageStatus(src) {
    const normalizedSource = useMemo(() => {
        return _imageUtils.normalizeSource(src)
    }, [src])

    const resolvedSrc = normalizedSource.resolvedSrc
    const canRenderImg = normalizedSource.isValid
    const activeSrcRef = useRef(resolvedSrc)
    const [status, setStatus] = useState(() => {
        return canRenderImg ?
            IMAGE_LIFECYCLE_STATUS.LOADING :
            IMAGE_LIFECYCLE_STATUS.IDLE
    })

    useEffect(() => {
        activeSrcRef.current = resolvedSrc
        setStatus(canRenderImg ? IMAGE_LIFECYCLE_STATUS.LOADING : IMAGE_LIFECYCLE_STATUS.IDLE)
    }, [resolvedSrc, canRenderImg])

    const setLoaded = (srcToConfirm = resolvedSrc) => {
        if(srcToConfirm !== activeSrcRef.current)
            return

        setStatus(IMAGE_LIFECYCLE_STATUS.LOADED)
    }

    const setError = (srcToConfirm = resolvedSrc) => {
        if(srcToConfirm !== activeSrcRef.current)
            return

        setStatus(IMAGE_LIFECYCLE_STATUS.ERROR)
    }

    const syncFromElement = (element) => {
        if(!element || !activeSrcRef.current || !element.complete)
            return

        if(element.naturalWidth > 0 && element.naturalHeight > 0) {
            setLoaded(activeSrcRef.current)
            return
        }

        setError(activeSrcRef.current)
    }

    return {
        normalizedSource,
        resolvedSrc,
        canRenderImg,
        status,
        setLoaded,
        setError,
        syncFromElement
    }
}
