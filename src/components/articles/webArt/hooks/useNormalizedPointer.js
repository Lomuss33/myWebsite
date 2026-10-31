import { useCallback } from 'react'
import { getLocalPointerPosition, getNormalizedPointerPosition } from "./webArtDomUtils.js"

export function useNormalizedPointer(surfaceRef, fallback = { x: 0.5, y: 0.5 }) {
    return useCallback((event) => {
        return getNormalizedPointerPosition(surfaceRef.current, event, fallback)
    }, [fallback, surfaceRef])
}

export function useLocalPointer(surfaceRef, fallback = { x: 0, y: 0 }) {
    return useCallback((event) => {
        return getLocalPointerPosition(surfaceRef.current, event, fallback)
    }, [fallback, surfaceRef])
}
