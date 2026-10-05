import "./WritingDecorationSvg.scss"
import React, {useEffect, useRef} from 'react'

const FRAME_INTERVAL_MS = 96
const LOW_FRAME_RATE_INTERVAL_MS = 900
const LOW_FRAME_RATE_TIME_SCALE = 0.12
const MAX_DEVICE_PIXEL_RATIO = 1.15
const LOW_FRAME_RATE_MAX_DEVICE_PIXEL_RATIO = 0.55
const DEFAULT_BAND_EDGE_INSET = 6
const MAX_RENDER_PIXELS = 2_000_000
const MAX_RENDER_DIMENSION = 4096

const vertexSource = `#version 300 es
in vec4 position;
void main() {
    gl_Position = position;
}`

const fragmentSource = `#version 300 es
precision highp float;

out vec4 O;
uniform vec2 resolution;
uniform vec2 surfaceOffset;
uniform float time;
uniform vec4 activeBand;
uniform float lightMode;

#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define S smoothstep
#define MN min(R.x,R.y)

float hash(vec2 p) {
    p=fract(p*vec2(123.34,456.21));
    p+=dot(p,p+45.32);
    return fract(p.x*p.y);
}

float noise(vec2 p) {
    vec2 i=floor(p);
    vec2 f=fract(p);
    vec2 u=f*f*(3.-2.*f);

    float a=hash(i);
    float b=hash(i+vec2(1.,0.));
    float c=hash(i+vec2(0.,1.));
    float d=hash(i+vec2(1.,1.));

    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
    float value=.0;
    float amplitude=.5;
    mat2 m=mat2(1.62,1.12,-1.12,1.62);

    for(int i=0;i<5;i++) {
        value+=amplitude*noise(p);
        p=m*p+vec2(11.7,4.2);
        amplitude*=.5;
    }

    return value;
}

vec2 localBandCoord(vec2 fragmentCoord, vec4 band) {
    vec2 local=fragmentCoord-band.xy;
    return vec2(
        local.x/max(band.z,1.),
        local.y/max(band.w,1.)
    );
}

vec3 woodColor(float grain, float ring, float pore, float boardTone, float lightModeValue) {
    vec3 darkWood=vec3(.13,.065,.025);
    vec3 midWood=vec3(.42,.215,.075);
    vec3 warmWood=vec3(.62,.36,.15);
    vec3 dryHighlight=vec3(.78,.53,.28);

    vec3 col=mix(darkWood,midWood,grain);
    col=mix(col,warmWood,S(.24,.74,ring)*.7);
    col=mix(col,dryHighlight,S(.72,1.,ring)*.18);
    col*=mix(.78,1.18,boardTone);
    col-=pore*vec3(.2,.12,.055);

    vec3 lightCol=mix(vec3(.74,.56,.34),vec3(.47,.285,.13),grain);
    lightCol*=mix(.88,1.12,boardTone);
    lightCol-=pore*vec3(.13,.07,.035);

    return mix(col,lightCol,lightModeValue);
}

void main() {
    // Keep the original page-space grain while rendering only the visible crop.
    vec2 uv = (FC + surfaceOffset) / R;
    vec2 aspectUv = uv;
    aspectUv.x *= R.x / max(R.y, 1.0);

    float slow=T*.055;
    vec2 p=aspectUv;

    float plankTargetHeight = 34.0;
    float plankCount = clamp(floor(R.y / plankTargetHeight), 4.0, 40.0);
    float plankPosition = uv.y * plankCount;
    float plankIndex=floor(plankPosition);
    float plankUv=fract(plankPosition);

    float boardSeed=hash(vec2(plankIndex,17.0));
    float boardTone=.72+boardSeed*.56;

    float horizontalWarp=fbm(vec2(p.x*22.4+slow,p.y*.35+boardSeed))*0.18;
    float roughWarp=fbm(vec2(p.x*11.5+boardSeed*4.0,p.y*2.2))*0.055;
    float fineWarp=fbm(vec2(p.x*22.0,p.y*1.4+boardSeed))*0.228;

    float ringInput=p.y*12.0+horizontalWarp+roughWarp+fineWarp;
    float rings=sin(ringInput*19.0+fbm(vec2(p.x*4.8,p.y*4.2+boardSeed))*4.6);
    rings=.5+.5*rings;
    rings=pow(rings,1.35);

    float longGrain=fbm(vec2(p.x*14.0+slow*.08+boardSeed*8.0,p.y*.9));
    float fiber=abs(sin((p.y+roughWarp*.55)*210.0+longGrain*7.0));
    float thinLines=pow(1.0-fiber,9.0);

    float scratches=fbm(vec2(p.x*95.0+boardSeed*12.0,p.y*16.0));
    scratches=S(.54,.9,scratches)*.22;

    float pores=fbm(vec2(p.x*70.0,p.y*18.0+boardSeed*6.0));
    pores=S(.48,.88,pores)*.62+scratches;

    float seamTop = 1.0 - S(.0,.06,plankUv);
    float seamBottom = 1.0 - S(.0,.06,1.0-plankUv);
    float plankLine = max(seamTop, seamBottom);

    float boardEdgeShadow=S(.0,.16,plankUv)*S(.0,.16,1.0-plankUv);
    float outerEdgeShadow=S(.0,.12,uv.y)*S(.0,.12,1.-uv.y)*S(.0,.05,uv.x)*S(.0,.05,1.-uv.x);
    
    float grain=clamp(.12+longGrain*.38+rings*.32+thinLines*.24+scratches*.22,0.,1.);
    vec3 col=woodColor(grain,rings,pores,boardTone,lightMode);

    col-=plankLine*vec3(.24,.14,.065);
    col*=mix(.76,1.,boardEdgeShadow);
    col*=mix(.84,1.,outerEdgeShadow);

    float matteNoise=fbm(vec2(p.x*36.0,p.y*24.0+boardSeed))*0.08;
    col*=.94+matteNoise;

    float vignette=S(.0,.18,uv.x)*S(.0,.18,1.-uv.x);
    col*=mix(.24,1.,vignette);

    O=vec4(col,1.);
}`

function compileShader(gl, shader, source) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader) || "Writing decoration shader compile failed")
}

function createShaderProgram(gl) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    const program = gl.createProgram()

    try {
        compileShader(gl, vertexShader, vertexSource)
        compileShader(gl, fragmentShader, fragmentSource)
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        if(!gl.getProgramParameter(program, gl.LINK_STATUS))
            throw new Error(gl.getProgramInfoLog(program) || "Writing decoration shader link failed")
    }
    catch(error) {
        gl.deleteProgram(program)
        throw error
    }
    finally {
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
    }

    return program
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

    if(!gl || gl.isContextLost())
        return null

    const program = createShaderProgram(gl)
    const buffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    program.resolution = gl.getUniformLocation(program, "resolution")
    program.surfaceOffset = gl.getUniformLocation(program, "surfaceOffset")
    program.time = gl.getUniformLocation(program, "time")
    program.activeBand = gl.getUniformLocation(program, "activeBand")
    program.lightMode = gl.getUniformLocation(program, "lightMode")

    const viewportLimits = gl.getParameter(gl.MAX_VIEWPORT_DIMS)
    const maxDimension = Math.min(MAX_RENDER_DIMENSION, gl.getParameter(gl.MAX_RENDERBUFFER_SIZE), ...viewportLimits)
    return { gl, program, buffer, maxDimension }
}

function resolveBandEdgeInset(referenceElement) {
    const sectionContent = referenceElement?.closest?.(".section-content")
    const cssInset = Number.parseFloat(
        sectionContent ? window.getComputedStyle(sectionContent).getPropertyValue("--section-separator-band-inset") : ""
    )

    return Number.isFinite(cssInset) ? cssInset : DEFAULT_BAND_EDGE_INSET
}

function insetBandRect(rect) {
    const inset = Math.min(resolveBandEdgeInset(rect.element), Math.max(0, (rect.height - 2) / 2))
    return {
        ...rect,
        y: rect.y + inset,
        height: Math.max(1, rect.height - (inset * 2))
    }
}

function measureLayout(canvas) {
    const wrapper = canvas?.parentElement
    if(!wrapper)
        return null

    const wrapperRect = wrapper.getBoundingClientRect()
    const scale = wrapper.offsetWidth > 0 ? wrapperRect.width / wrapper.offsetWidth : 1
    const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1
    const bandRects = Array.from(wrapper.querySelectorAll(".section-decoration-band"))
        .map((band) => {
            const rect = band.getBoundingClientRect()
            return insetBandRect({
                element: band,
                x: (rect.left - wrapperRect.left) / safeScale,
                y: (rect.top - wrapperRect.top) / safeScale,
                width: rect.width / safeScale,
                height: rect.height / safeScale
            })
        })
        .filter(rect => rect.width > 0 && rect.height > 0)

    if(bandRects.length === 0)
        return null

    const layerLeft = Math.min(...bandRects.map(rect => rect.x))
    const layerRight = Math.max(...bandRects.map(rect => rect.x + rect.width))
    const layerTop = Math.min(...bandRects.map(rect => rect.y))
    const layerBottom = Math.max(...bandRects.map(rect => rect.y + rect.height))
    const viewportTop = window.visualViewport?.offsetTop || 0
    const viewportBottom = viewportTop + (window.visualViewport?.height || window.innerHeight)
    const scrollable = wrapper.closest(".scrollable")
    const scrollRect = scrollable?.getBoundingClientRect()
    const usesInnerScroll = scrollable && !scrollable.classList.contains("scrollable-mobile-native")
    const visibleTop = Math.max(viewportTop, usesInnerScroll ? scrollRect.top : viewportTop)
    const visibleBottom = Math.min(viewportBottom, usesInnerScroll ? scrollRect.bottom : viewportBottom)
    const renderTop = Math.max(layerTop, (visibleTop - wrapperRect.top) / safeScale)
    const renderBottom = Math.min(layerBottom, (visibleBottom - wrapperRect.top) / safeScale)

    return {
        scale: safeScale,
        left: layerLeft,
        top: layerTop,
        width: layerRight - layerLeft,
        height: layerBottom - layerTop,
        renderTop: renderTop - layerTop,
        renderHeight: Math.max(0, renderBottom - renderTop),
        bands: bandRects.map(rect => ({
            x: rect.x - layerLeft,
            y: rect.y - layerTop,
            width: rect.width,
            height: rect.height
        }))
    }
}

function resizeCanvas(canvas, shaderState, layout, maxDevicePixelRatio = MAX_DEVICE_PIXEL_RATIO, minDevicePixelRatio = 1) {
    const preferredRatio = Math.max(minDevicePixelRatio, Math.min(maxDevicePixelRatio, (window.devicePixelRatio || 1) * 0.75))
    const pixelRatio = Math.min(preferredRatio,
        shaderState.maxDimension / Math.max(layout.width, layout.renderHeight),
        Math.sqrt(MAX_RENDER_PIXELS / (layout.width * layout.renderHeight)))
    const width = Math.max(1, Math.floor(layout.width * pixelRatio))
    const height = Math.max(1, Math.floor(layout.renderHeight * pixelRatio))

    canvas.style.left = `${layout.left}px`
    canvas.style.top = `${layout.top + layout.renderTop}px`
    canvas.style.width = `${layout.width}px`
    canvas.style.height = `${layout.renderHeight}px`

    if(canvas.width !== width)
        canvas.width = width
    if(canvas.height !== height)
        canvas.height = height

    shaderState.gl.viewport(0, 0, width, height)
    shaderState.resolution = [layout.width * pixelRatio, layout.height * pixelRatio]
    shaderState.surfaceOffset = [0, (layout.height - layout.renderTop - layout.renderHeight) * pixelRatio]

    return pixelRatio
}

function getScissorRects(layout, pixelRatio) {
    return layout.bands.map(band => ({ ...band,
        y: Math.max(band.y, layout.renderTop),
        height: Math.min(band.y + band.height, layout.renderTop + layout.renderHeight) - Math.max(band.y, layout.renderTop)
    })).filter(band => band.height > 0).map(band => ({
        x: Math.max(0, Math.round(band.x * pixelRatio)),
        y: Math.max(0, Math.round((layout.renderTop + layout.renderHeight - band.y - band.height) * pixelRatio)),
        width: Math.max(1, Math.round(band.width * pixelRatio)),
        height: Math.max(1, Math.round(band.height * pixelRatio))
    }))
}

function drawShader(shaderState, scissorRects, now) {
    const { gl, program, buffer } = shaderState
    if(gl.isContextLost())
        return
    const isLightMode = document.documentElement.getAttribute("data-theme") === "light"

    gl.disable(gl.SCISSOR_TEST)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(program.resolution, ...shaderState.resolution)
    gl.uniform2f(program.surfaceOffset, ...shaderState.surfaceOffset)
    gl.uniform1f(program.time, now * 0.001)
    gl.uniform1f(program.lightMode, isLightMode ? 1 : 0)
    gl.enable(gl.SCISSOR_TEST)

    for(const rect of scissorRects) {
        gl.scissor(rect.x, rect.y, rect.width, rect.height)
        gl.uniform4f(program.activeBand, rect.x, rect.y, rect.width, rect.height)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    gl.disable(gl.SCISSOR_TEST)
    if(!gl.isContextLost())
        gl.canvas.style.visibility = "visible"
}

function WritingDecorationSvg({ lowFrameRateMode = false }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const wrapper = canvas?.parentElement
        if(!canvas || !wrapper)
            return

        let animationFrameId = null
        let rebuildFrameId = null
        let delayedRebuildId = null
        let shaderState = null
        let scissorRects = []
        let lastFrameTime = 0
        let lastAnimationTime = 0
        let isIntersecting = false
        let isPaused = document.hidden
        let isContextLost = false
        let disposed = false
        let observedBandElements = []
        const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null

        const initializeShader = () => {
            try {
                shaderState = setupShader(canvas)
            }
            catch(error) {
                console.error(error)
                shaderState = null
            }
        }
        initializeShader()

        const isReducedMotion = () => Boolean(reducedMotionQuery?.matches)
        const canRender = () => !disposed && !isPaused && !document.hidden && !isContextLost && shaderState && !shaderState.gl.isContextLost()
        const shouldAnimate = () => canRender() && isIntersecting && !isReducedMotion() && scissorRects.length > 0
        const getFrameInterval = () => lowFrameRateMode ? LOW_FRAME_RATE_INTERVAL_MS : FRAME_INTERVAL_MS
        const getAnimationTime = (timestamp) => lowFrameRateMode ? timestamp * LOW_FRAME_RATE_TIME_SCALE : timestamp

        const stopLoop = () => {
            if(animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId)
                animationFrameId = null
            }
        }

        const drawStatic = () => {
            if(canRender() && scissorRects.length > 0)
                drawShader(shaderState, scissorRects, isReducedMotion() ? 0 : lastAnimationTime)
        }

        const step = (timestamp) => {
            if(!shouldAnimate()) {
                stopLoop()
                return
            }

            if(scissorRects.length > 0 && timestamp - lastFrameTime >= getFrameInterval()) {
                const animationTime = getAnimationTime(timestamp)
                lastFrameTime = timestamp
                lastAnimationTime = animationTime
                drawShader(shaderState, scissorRects, animationTime)
            }

            animationFrameId = window.requestAnimationFrame(step)
        }

        const startLoop = () => {
            if(!shouldAnimate()) {
                drawStatic()
                return
            }

            if(animationFrameId === null)
                animationFrameId = window.requestAnimationFrame(step)
        }

        const rebuild = () => {
            if(!canRender())
                return
            const layout = measureLayout(canvas)
            const hasVisibleBand = layout?.bands.some(band =>
                band.y < layout.renderTop + layout.renderHeight && band.y + band.height > layout.renderTop)
            if(!layout || layout.renderHeight <= 0 || !hasVisibleBand) {
                scissorRects = []
                stopLoop()
                canvas.style.visibility = "hidden"
                canvas.width = 1
                canvas.height = 1
                return
            }

            const pixelRatio = resizeCanvas(
                canvas,
                shaderState,
                layout,
                lowFrameRateMode ? LOW_FRAME_RATE_MAX_DEVICE_PIXEL_RATIO : MAX_DEVICE_PIXEL_RATIO,
                lowFrameRateMode ? LOW_FRAME_RATE_MAX_DEVICE_PIXEL_RATIO : 1
            )
            scissorRects = getScissorRects(layout, pixelRatio)
            lastFrameTime = 0
            drawStatic()
            startLoop()
        }

        const scheduleRebuild = () => {
            if(!canRender())
                return
            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)

            rebuildFrameId = window.requestAnimationFrame(() => {
                rebuildFrameId = null
                rebuild()
            })
        }

        const scheduleDelayedRebuild = () => {
            if(disposed || isPaused || document.hidden)
                return
            if(delayedRebuildId !== null)
                window.clearTimeout(delayedRebuildId)

            delayedRebuildId = window.setTimeout(() => {
                delayedRebuildId = null
                scheduleRebuild()
            }, 180)
        }

        const syncBandObservers = (resizeObserver) => {
            if(!resizeObserver)
                return false

            const nextBandElements = Array.from(wrapper.querySelectorAll(".section-decoration-band"))
            const hasSameBandElements = observedBandElements.length === nextBandElements.length &&
                observedBandElements.every((element, index) => element === nextBandElements[index])

            if(hasSameBandElements)
                return false

            observedBandElements.forEach(element => resizeObserver.unobserve(element))
            nextBandElements.forEach(element => resizeObserver.observe(element))
            observedBandElements = nextBandElements
            return true
        }

        const cancelPendingWork = () => {
            stopLoop()
            if(rebuildFrameId !== null) {
                window.cancelAnimationFrame(rebuildFrameId)
                rebuildFrameId = null
            }
            if(delayedRebuildId !== null) {
                window.clearTimeout(delayedRebuildId)
                delayedRebuildId = null
            }
        }

        const handleAppPause = () => {
            isPaused = true
            cancelPendingWork()
            // Release the drawing surface while Android backgrounds the tab.
            canvas.style.visibility = "hidden"
            canvas.width = 1
            canvas.height = 1
        }

        const handleAppResume = () => {
            if(disposed || document.hidden)
                return
            isPaused = false
            if(!shaderState && !isContextLost)
                initializeShader()
            scheduleRebuild()
            scheduleDelayedRebuild()
        }

        const handleContextLost = (event) => {
            event.preventDefault()
            isContextLost = true
            shaderState = null
            cancelPendingWork()
            canvas.style.visibility = "hidden"
        }

        const handleContextRestored = () => {
            if(disposed)
                return
            isContextLost = false
            // Restored contexts invalidate every old program, buffer and uniform.
            initializeShader()
            scheduleRebuild()
        }

        const handleVisibilityChange = () => {
            if(document.hidden) handleAppPause()
            else handleAppResume()
        }

        const handleWindowLoad = () => scheduleDelayedRebuild()

        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => scheduleRebuild())
        const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(() => {
            if(!resizeObserver || syncBandObservers(resizeObserver))
                scheduleRebuild()
            scheduleDelayedRebuild()
        })
        const themeObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(() => {
            drawStatic()
            startLoop()
        })
        const intersectionObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
            isIntersecting = entries.some(entry => entry.isIntersecting)
            if(isIntersecting) scheduleRebuild()
            else stopLoop()
        }, { rootMargin: "160px" })

        resizeObserver?.observe(wrapper)
        syncBandObservers(resizeObserver)
        mutationObserver?.observe(wrapper, { childList: true })
        const sectionBody = wrapper.querySelector(".section-body")
        if(sectionBody)
            mutationObserver?.observe(sectionBody, { childList: true })
        themeObserver?.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
        intersectionObserver?.observe(wrapper)
        window.addEventListener("resize", scheduleRebuild, { passive: true })
        window.addEventListener("scroll", scheduleRebuild, { passive: true, capture: true })
        window.visualViewport?.addEventListener("resize", scheduleRebuild)
        window.visualViewport?.addEventListener("scroll", scheduleRebuild)
        window.addEventListener("load", handleWindowLoad)
        window.addEventListener("app:pause", handleAppPause)
        window.addEventListener("app:resume", handleAppResume)
        document.addEventListener("visibilitychange", handleVisibilityChange)
        canvas.addEventListener("webglcontextlost", handleContextLost)
        canvas.addEventListener("webglcontextrestored", handleContextRestored)
        reducedMotionQuery?.addEventListener?.("change", scheduleRebuild)
        document.fonts?.ready?.then?.(() => {
            scheduleDelayedRebuild()
        })

        rebuild()
        scheduleDelayedRebuild()

        if(!intersectionObserver) {
            isIntersecting = true
            startLoop()
        }

        return () => {
            disposed = true
            cancelPendingWork()
            resizeObserver?.disconnect()
            mutationObserver?.disconnect()
            themeObserver?.disconnect()
            intersectionObserver?.disconnect()
            window.removeEventListener("resize", scheduleRebuild)
            window.removeEventListener("scroll", scheduleRebuild, true)
            window.visualViewport?.removeEventListener("resize", scheduleRebuild)
            window.visualViewport?.removeEventListener("scroll", scheduleRebuild)
            window.removeEventListener("load", handleWindowLoad)
            window.removeEventListener("app:pause", handleAppPause)
            window.removeEventListener("app:resume", handleAppResume)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            canvas.removeEventListener("webglcontextlost", handleContextLost)
            canvas.removeEventListener("webglcontextrestored", handleContextRestored)
            reducedMotionQuery?.removeEventListener?.("change", scheduleRebuild)
            observedBandElements = []

            if(shaderState?.buffer)
                shaderState.gl.deleteBuffer(shaderState.buffer)
            if(shaderState?.program)
                shaderState.gl.deleteProgram(shaderState.program)
            canvas.width = 1
            canvas.height = 1
        }
    }, [lowFrameRateMode])

    return (
        <canvas
            ref={canvasRef}
            className="section-decoration-canvas section-decoration-canvas-writing"
            aria-hidden={true}
        />
    )
}

export default WritingDecorationSvg
