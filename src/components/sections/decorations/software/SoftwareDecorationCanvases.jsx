import "./SoftwareDecorationCanvases.scss"
import React, {useEffect, useRef} from 'react'

const RAIN_FRAME_INTERVAL_MS = 72
const SHADER_FRAME_INTERVAL_MS = 84
const REDUCED_MOTION_FRAME_INTERVAL_MS = 320
const RAIN_MAX_DEVICE_PIXEL_RATIO = 1.25
const SHADER_MAX_DEVICE_PIXEL_RATIO = 1.25
const LEGACY_SOFTWARE_RAIN_CHARS = [
    ..."ã‚¢ã‚¤ã‚¦ã‚¨ã‚ªã‚«ã‚­ã‚¯ã‚±ã‚³ã‚µã‚·ã‚¹ã‚»ã‚½ã‚¿ãƒãƒ„ãƒ†ãƒˆãƒŠãƒ‹ãƒŒãƒãƒŽãƒãƒ’ãƒ•ãƒ˜ãƒ›ãƒžãƒŸãƒ ãƒ¡ãƒ¢ãƒ¤ãƒ¦ãƒ¨ãƒ©ãƒªãƒ«ãƒ¬ãƒ­ãƒ¯ãƒ²ãƒ³",
    ..."0123456789",
    ..."<>[]{}#@$%&*+=?/\\|"
]
const SOFTWARE_RAIN_CHARS = [
    ..."xyzXYZ",
    ..."üäöÜÄÖ",
    ..."čšćđžČŠĆĐŽ",
    ..."çğışÇĞİŞ"
]

const vertexSource = `#version 300 es
in vec4 position;
void main() {
    gl_Position = position;
}`

const fragmentSource = `#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

out vec4 O;
uniform float time;
uniform vec2 resolution;

#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define S smoothstep
#define MN min(R.x,R.y)
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define hue(a) (.24+.6*cos(a+vec3(0,83,21)))

float rnd(float a) {
    vec2 p=fract(a*vec2(12.9898,78.233));
    p+=dot(p,p+34.56);
    return fract(p.x*p.y);
}

float noise(float p) {
    float i=floor(p), u=S(i,i+1.,p);
    float a=rnd(i), b=rnd(i+1.);
    return mix(a,b,u);
}

vec2 pmod(vec2 p, float n) {
    float a=atan(p.x,p.y), b=6.28318/n;
    a=floor(.5+a/b)*b;
    return rot(-a)*p;
}

float poly(vec2 p, float n) {
    float a=atan(p.x,p.y), b=6.28318/n;
    return cos(floor(.5+a/b)*b-a)*length(p);
}

vec2 smin(vec2 a, vec2 b, float k) {
    vec2 h=clamp(.5+.5*(b-a)/k,.0,1.);
    return mix(b,a,h)-k*h*(1.-h);
}

void main() {
    float t=T*9., f=step(.9,noise(t));
    vec2 uv=(FC-.5*R)/MN, k=mix(R,vec2(100),f);
    uv=floor(uv*k)/k;
    uv.x+=rnd(T+uv.y)*.09*f;
    vec3 col=vec3(0);
    uv=pmod(uv*1.62,6.);
    uv.y-=.0;
    uv=smin(uv,-uv,.08);
    vec2 p=vec2(log(poly(uv,3.))+T,1);
    p=mod(p,2.)-1.;
    col+=.034/hue(dot(p,p));
    col-=sin(FC.y)*.5+.55;
    col=max(col,vec3(0));
    col=vec3(col.r*.22,col.g,col.b*.32);
    float alpha=clamp(max(max(col.r,col.g),col.b)*1.35,0.,.64);
    O=vec4(col,alpha);
}`

function getRandomInt(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from
}

function getRandomChar() {
    return SOFTWARE_RAIN_CHARS[getRandomInt(0, SOFTWARE_RAIN_CHARS.length - 1)]
}

function getVisibleCellSize() {
    if(typeof window === "undefined")
        return 18

    const vmax = Math.max(window.innerWidth, window.innerHeight) / 100
    return Math.max(14, Math.min(26, vmax * 2))
}

function createColumns(width, height, cellSize) {
    const columnSpacing = cellSize * 0.64
    const columnCount = Math.max(1, Math.ceil(width / columnSpacing))
    const rowCount = Math.max(1, Math.ceil(height / cellSize))

    return Array.from({ length: columnCount }, (_, columnIndex) => ({
        x: columnIndex * columnSpacing,
        y: getRandomInt(-rowCount, rowCount) * cellSize,
        delay: getRandomInt(18, 78),
        elapsed: getRandomInt(0, 78),
        trailSize: getRandomInt(16, 40),
        chars: Array.from({ length: rowCount + 48 }, getRandomChar)
    }))
}

function compileShader(gl, shader, source) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader) || "Software decoration shader compile failed")
}

function createShaderProgram(gl) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    const program = gl.createProgram()

    compileShader(gl, vertexShader, vertexSource)
    compileShader(gl, fragmentShader, fragmentSource)

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if(!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(program) || "Software decoration shader link failed")

    return program
}

function measureLayout(rainCanvas, shaderCanvas) {
    const wrapper = rainCanvas?.parentElement
    if(!wrapper)
        return null

    const wrapperRect = wrapper.getBoundingClientRect()
    const scale = wrapper.offsetWidth > 0 ? wrapperRect.width / wrapper.offsetWidth : 1
    const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1
    const bandElements = Array.from(wrapper.querySelectorAll(".section-decoration-band"))
    const bandRects = bandElements
        .map((band) => {
            const rect = band.getBoundingClientRect()
            return {
                element: band,
                x: (rect.left - wrapperRect.left) / safeScale,
                y: (rect.top - wrapperRect.top) / safeScale,
                width: rect.width / safeScale,
                height: rect.height / safeScale
            }
        })
        .filter(rect => rect.width > 0 && rect.height > 0)

    if(bandRects.length === 0)
        return null

    const firstBand = bandRects[0]
    const layerLeft = firstBand.x
    const bottomBand = bandRects.find(rect => rect.element.classList.contains("section-decoration-band-page-bottom")) || null

    return {
        scale: safeScale,
        rain: {
            left: layerLeft,
            width: firstBand.width,
            height: Math.max(...bandRects.map(rect => rect.y + rect.height)),
            bands: bandRects.map(rect => ({
                x: rect.x - layerLeft,
                y: rect.y,
                width: rect.width,
                height: rect.height
            }))
        },
        shader: bottomBand && shaderCanvas ? {
            left: bottomBand.x,
            top: bottomBand.y,
            width: bottomBand.width,
            height: bottomBand.height
        } : null
    }
}

function resize2dCanvas(canvas, layout) {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, RAIN_MAX_DEVICE_PIXEL_RATIO)
    const pixelWidth = Math.max(1, Math.round(layout.width * pixelRatio))
    const pixelHeight = Math.max(1, Math.round(layout.height * pixelRatio))

    canvas.style.left = `${layout.left}px`
    canvas.style.width = `${layout.width}px`
    canvas.style.height = `${layout.height}px`

    if(canvas.width !== pixelWidth)
        canvas.width = pixelWidth
    if(canvas.height !== pixelHeight)
        canvas.height = pixelHeight

    const context = canvas.getContext("2d", { alpha: true })
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    return context
}

function resizeWebGlCanvas(canvas, gl, layout) {
    const pixelRatio = Math.max(1, Math.min(SHADER_MAX_DEVICE_PIXEL_RATIO, window.devicePixelRatio * 0.5))
    const width = Math.max(1, Math.round(layout.width * pixelRatio))
    const height = Math.max(1, Math.round(layout.height * pixelRatio))

    canvas.style.left = `${layout.left}px`
    canvas.style.top = `${layout.top}px`
    canvas.style.width = `${layout.width}px`
    canvas.style.height = `${layout.height}px`

    if(canvas.width !== width)
        canvas.width = width
    if(canvas.height !== height)
        canvas.height = height

    gl.viewport(0, 0, width, height)
}

function getVisibleBandBounds(canvas, scale) {
    const rect = canvas.getBoundingClientRect()
    const top = Math.max(0, (0 - rect.top) / scale - 96)
    const bottom = Math.min(rect.height / scale, (window.innerHeight - rect.top) / scale + 96)
    return { top, bottom }
}

function drawRain(context, layout, columns, cellSize, reducedMotion) {
    const visibleBounds = getVisibleBandBounds(context.canvas, layout.scale)
    const visibleBands = layout.rain.bands.filter(band =>
        band.y + band.height >= visibleBounds.top && band.y <= visibleBounds.bottom
    )

    if(visibleBands.length === 0)
        return

    const bandBackground = document.documentElement.getAttribute("data-theme") === "light" ? "#fff" : "#000"
    context.save()
    context.beginPath()
    for(const band of visibleBands) {
        context.clearRect(band.x, band.y, band.width, band.height)
        context.fillStyle = bandBackground
        context.fillRect(band.x, band.y, band.width, band.height)
        context.rect(band.x, band.y, band.width, band.height)
    }
    context.clip()

    context.font = `${cellSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`
    context.textAlign = "center"
    context.textBaseline = "top"
    context.shadowBlur = 0

    for(const column of columns) {
        for(let trailIndex = 0; trailIndex < column.trailSize; trailIndex++) {
            const y = column.y - trailIndex * cellSize
            if(y < visibleBounds.top - cellSize || y > visibleBounds.bottom + cellSize)
                continue

            const charIndex = Math.abs(Math.floor(y / cellSize)) % column.chars.length
            const lightness = trailIndex === 0 ? 88 : Math.max(26, 82 - trailIndex * 1.45)
            context.fillStyle = `hsl(136, 100%, ${lightness}%)`
            context.shadowBlur = !reducedMotion && trailIndex === 0 ? 8 : 0
            context.shadowColor = trailIndex === 0 ? "#9bff9b" : "transparent"
            context.fillText(column.chars[charIndex], column.x + cellSize / 2, y)
        }
    }

    context.restore()
}

function updateColumns(columns, layout, cellSize, delta) {
    for(const column of columns) {
        column.elapsed += delta
        if(column.elapsed < column.delay)
            continue

        column.elapsed = 0
        column.y += cellSize
        if(column.y - column.trailSize * cellSize > layout.rain.height) {
            column.y = getRandomInt(-24, 0) * cellSize
            column.trailSize = getRandomInt(16, 40)
        }
        if(Math.random() < 0.24) {
            const charIndex = Math.abs(Math.floor(column.y / cellSize)) % column.chars.length
            column.chars[charIndex] = getRandomChar()
        }
    }
}

function setupShader(canvas) {
    const gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false
    })

    if(!gl)
        return null

    const program = createShaderProgram(gl)
    const buffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    program.resolution = gl.getUniformLocation(program, "resolution")
    program.time = gl.getUniformLocation(program, "time")

    return { gl, program, buffer }
}

function drawShader(shaderState, now) {
    const { gl, program, buffer } = shaderState
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(program.resolution, gl.canvas.width, gl.canvas.height)
    gl.uniform1f(program.time, now * 0.001)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

function SoftwareDecorationCanvases() {
    const rainCanvasRef = useRef(null)
    const shaderCanvasRef = useRef(null)

    useEffect(() => {
        const rainCanvas = rainCanvasRef.current
        const shaderCanvas = shaderCanvasRef.current
        const wrapper = rainCanvas?.parentElement
        if(!rainCanvas || !shaderCanvas || !wrapper)
            return

        let animationFrameId = null
        let rebuildFrameId = null
        let layout = null
        let context = null
        let shaderState = null
        let columns = []
        let cellSize = 18
        let lastRainTime = 0
        let lastShaderTime = 0
        let isIntersecting = false
        let isShaderContextLost = false
        const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null

        try {
            shaderState = setupShader(shaderCanvas)
        }
        catch(error) {
            console.error(error)
            shaderState = null
        }

        const isReducedMotion = () => Boolean(reducedMotionQuery?.matches)
        const shouldAnimate = () => isIntersecting && !document.hidden && !isReducedMotion()

        const stopLoop = () => {
            if(animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId)
                animationFrameId = null
            }
        }

        const drawStatic = () => {
            if(!context || !layout)
                return

            drawRain(context, layout, columns, cellSize, true)
            if(shaderState && !isShaderContextLost)
                drawShader(shaderState, 0)
        }

        const step = (timestamp) => {
            if(isShaderContextLost) {
                stopLoop()
                return
            }

            if(!shouldAnimate()) {
                stopLoop()
                return
            }

            if(context && layout && timestamp - lastRainTime >= RAIN_FRAME_INTERVAL_MS) {
                const delta = lastRainTime === 0 ? RAIN_FRAME_INTERVAL_MS : timestamp - lastRainTime
                lastRainTime = timestamp
                updateColumns(columns, layout, cellSize, delta)
                drawRain(context, layout, columns, cellSize, false)
            }

            if(shaderState && timestamp - lastShaderTime >= SHADER_FRAME_INTERVAL_MS) {
                lastShaderTime = timestamp
                drawShader(shaderState, timestamp)
            }

            animationFrameId = window.requestAnimationFrame(step)
        }

        const startLoop = () => {
            if(isShaderContextLost) {
                drawStatic()
                return
            }

            if(!shouldAnimate()) {
                drawStatic()
                return
            }

            if(animationFrameId === null)
                animationFrameId = window.requestAnimationFrame(step)
        }

        const rebuild = () => {
            const nextLayout = measureLayout(rainCanvas, shaderCanvas)
            if(!nextLayout)
                return

            layout = nextLayout
            context = resize2dCanvas(rainCanvas, layout.rain)
            cellSize = getVisibleCellSize() / layout.scale
            columns = createColumns(layout.rain.width, layout.rain.height, cellSize)

            if(shaderState && !isShaderContextLost && layout.shader)
                resizeWebGlCanvas(shaderCanvas, shaderState.gl, layout.shader)

            lastRainTime = 0
            lastShaderTime = 0
            drawStatic()
            startLoop()
        }

        const scheduleRebuild = () => {
            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)

            rebuildFrameId = window.requestAnimationFrame(() => {
                rebuildFrameId = null
                rebuild()
            })
        }

        const handleContextLost = (event) => {
            event.preventDefault()
            isShaderContextLost = true
            stopLoop()
            if(rebuildFrameId !== null) {
                window.cancelAnimationFrame(rebuildFrameId)
                rebuildFrameId = null
            }
        }

        const handleContextRestored = () => {
            isShaderContextLost = false

            try {
                shaderState = setupShader(shaderCanvas)
            }
            catch(error) {
                console.error(error)
                shaderState = null
                return
            }

            scheduleRebuild()
        }

        const handleVisibilityChange = () => {
            if(document.hidden) {
                stopLoop()
                return
            }
            startLoop()
        }

        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleRebuild)
        const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(scheduleRebuild)
        const intersectionObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
            isIntersecting = entries.some(entry => entry.isIntersecting)
            if(isIntersecting) startLoop()
            else stopLoop()
        }, { rootMargin: "160px" })

        resizeObserver?.observe(wrapper)
        mutationObserver?.observe(wrapper, { childList: true })
        const sectionBody = wrapper.querySelector(".section-body")
        if(sectionBody)
            mutationObserver?.observe(sectionBody, { childList: true })
        intersectionObserver?.observe(wrapper)
        window.addEventListener("resize", scheduleRebuild, { passive: true })
        window.addEventListener("app:resume", scheduleRebuild)
        document.addEventListener("visibilitychange", handleVisibilityChange)
        shaderCanvas.addEventListener("webglcontextlost", handleContextLost)
        shaderCanvas.addEventListener("webglcontextrestored", handleContextRestored)
        reducedMotionQuery?.addEventListener?.("change", scheduleRebuild)

        rebuild()

        if(!intersectionObserver) {
            isIntersecting = true
            startLoop()
        }

        return () => {
            stopLoop()
            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)
            resizeObserver?.disconnect()
            mutationObserver?.disconnect()
            intersectionObserver?.disconnect()
            window.removeEventListener("resize", scheduleRebuild)
            window.removeEventListener("app:resume", scheduleRebuild)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            shaderCanvas.removeEventListener("webglcontextlost", handleContextLost)
            shaderCanvas.removeEventListener("webglcontextrestored", handleContextRestored)
            reducedMotionQuery?.removeEventListener?.("change", scheduleRebuild)

            if(shaderState?.buffer)
                shaderState.gl.deleteBuffer(shaderState.buffer)
            if(shaderState?.program)
                shaderState.gl.deleteProgram(shaderState.program)
        }
    }, [])

    return (
        <>
            <canvas
                ref={rainCanvasRef}
                className="section-decoration-canvas section-decoration-canvas-software"
                aria-hidden={true}
            />
            <canvas
                ref={shaderCanvasRef}
                className="section-decoration-canvas section-decoration-canvas-software-bottom"
                aria-hidden={true}
            />
        </>
    )
}

export default SoftwareDecorationCanvases
