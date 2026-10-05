const gpuLimits = new WeakMap()

// A long article must not turn a decorative surface into an oversized GPU buffer.
// Keep CSS geometry and artwork coordinates unchanged; limit backing resolution.
export function getDecorationPixelRatio(width, height, preferredRatio, gl = null, maxWidth = 4096, maxHeight = 4096) {
    if(gl) {
        if(!gpuLimits.has(gl)) {
            const viewport = gl.getParameter(gl.MAX_VIEWPORT_DIMS)
            const renderbuffer = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE)
            gpuLimits.set(gl, [Math.min(renderbuffer, viewport[0]), Math.min(renderbuffer, viewport[1])])
        }
        const limits = gpuLimits.get(gl)
        maxWidth = Math.min(maxWidth, limits[0])
        maxHeight = Math.min(maxHeight, limits[1])
    }

    const surfaceWidth = Math.max(1, width)
    const surfaceHeight = Math.max(1, height)
    return Math.min(preferredRatio, maxWidth / surfaceWidth, maxHeight / surfaceHeight,
        Math.sqrt(4_000_000 / (surfaceWidth * surfaceHeight)))
}
