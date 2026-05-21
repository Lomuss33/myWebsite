import "./WritingDecorationSvg.scss"
import React, {useEffect, useRef} from 'react'

const FRAME_INTERVAL_MS = 96
const MAX_DEVICE_PIXEL_RATIO = 1.15

const vertexSource = `#version 300 es
in vec4 position;
void main() {
    gl_Position = position;
}`

const fragmentSource = `#version 300 es
precision highp float;

out vec4 O;
uniform vec2 resolution;
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
    vec2 uv = FC / R;
    vec2 aspectUv = uv;
    aspectUv.x *= R.x / max(R.y, 1.0);

    float slow=T*.055;
    vec2 p=aspectUv;

    float plankTargetHeight = 34.0;
    float plankCount = clamp(floor(R.y / plankTargetHeight), 4.0, 40.0);    float plankIndex=floor(plankPosition);
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

    float seamTop = S(.06,.0,plankUv);
    float seamBottom = S(.06,.0,1.0-plankUv);
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

    compileShader(gl, vertexShader, vertexSource)
    compileShader(gl, fragmentShader, fragmentSource)

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if(!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(program) || "Writing decoration shader link failed")

    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)

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
    program.activeBand = gl.getUniformLocation(program, "activeBand")
    program.lightMode = gl.getUniformLocation(program, "lightMode")

    return { gl, program, buffer }
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
            return {
                x: (rect.left - wrapperRect.left) / safeScale,
                y: (rect.top - wrapperRect.top) / safeScale,
                width: rect.width / safeScale,
                height: rect.height / safeScale
            }
        })
        .filter(rect => rect.width > 0 && rect.height > 0)

    if(bandRects.length === 0)
        return null

    const layerLeft = Math.min(...bandRects.map(rect => rect.x))
    const layerRight = Math.max(...bandRects.map(rect => rect.x + rect.width))
    const layerTop = Math.min(...bandRects.map(rect => rect.y))
    const layerBottom = Math.max(...bandRects.map(rect => rect.y + rect.height))

    return {
        scale: safeScale,
        left: layerLeft,
        top: layerTop,
        width: layerRight - layerLeft,
        height: layerBottom - layerTop,
        bands: bandRects.map(rect => ({
            x: rect.x - layerLeft,
            y: rect.y - layerTop,
            width: rect.width,
            height: rect.height
        }))
    }
}

function resizeCanvas(canvas, gl, layout) {
    const pixelRatio = Math.max(1, Math.min(MAX_DEVICE_PIXEL_RATIO, (window.devicePixelRatio || 1) * 0.75))
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

    return pixelRatio
}

function getScissorRects(layout, pixelRatio) {
    return layout.bands.map(band => ({
        x: Math.max(0, Math.round(band.x * pixelRatio)),
        y: Math.max(0, Math.round((layout.height - band.y - band.height) * pixelRatio)),
        width: Math.max(1, Math.round(band.width * pixelRatio)),
        height: Math.max(1, Math.round(band.height * pixelRatio))
    }))
}

function drawShader(shaderState, scissorRects, now) {
    const { gl, program, buffer } = shaderState
    const isLightMode = document.documentElement.getAttribute("data-theme") === "light"

    gl.disable(gl.SCISSOR_TEST)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(program.resolution, gl.canvas.width, gl.canvas.height)
    gl.uniform1f(program.time, now * 0.001)
    gl.uniform1f(program.lightMode, isLightMode ? 1 : 0)
    gl.enable(gl.SCISSOR_TEST)

    for(const rect of scissorRects) {
        gl.scissor(rect.x, rect.y, rect.width, rect.height)
        gl.uniform4f(program.activeBand, rect.x, rect.y, rect.width, rect.height)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    gl.disable(gl.SCISSOR_TEST)
}

function WritingDecorationSvg() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const wrapper = canvas?.parentElement
        if(!canvas || !wrapper)
            return

        let animationFrameId = null
        let rebuildFrameId = null
        let shaderState = null
        let scissorRects = []
        let lastFrameTime = 0
        let isIntersecting = false
        const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null

        try {
            shaderState = setupShader(canvas)
        }
        catch(error) {
            console.error(error)
            shaderState = null
        }

        if(!shaderState)
            return

        const isReducedMotion = () => Boolean(reducedMotionQuery?.matches)
        const shouldAnimate = () => isIntersecting && !document.hidden && !isReducedMotion()

        const stopLoop = () => {
            if(animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId)
                animationFrameId = null
            }
        }

        const drawStatic = () => {
            if(scissorRects.length > 0)
                drawShader(shaderState, scissorRects, 0)
        }

        const step = (timestamp) => {
            if(!shouldAnimate()) {
                stopLoop()
                return
            }

            if(scissorRects.length > 0 && timestamp - lastFrameTime >= FRAME_INTERVAL_MS) {
                lastFrameTime = timestamp
                drawShader(shaderState, scissorRects, timestamp)
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
            const layout = measureLayout(canvas)
            if(!layout)
                return

            const pixelRatio = resizeCanvas(canvas, shaderState.gl, layout)
            scissorRects = getScissorRects(layout, pixelRatio)
            lastFrameTime = 0
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

        const handleVisibilityChange = () => {
            if(document.hidden) {
                stopLoop()
                return
            }
            startLoop()
        }

        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleRebuild)
        const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(scheduleRebuild)
        const themeObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(() => {
            drawStatic()
            startLoop()
        })
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
        themeObserver?.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
        intersectionObserver?.observe(wrapper)
        window.addEventListener("resize", scheduleRebuild, { passive: true })
        document.addEventListener("visibilitychange", handleVisibilityChange)
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
            themeObserver?.disconnect()
            intersectionObserver?.disconnect()
            window.removeEventListener("resize", scheduleRebuild)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            reducedMotionQuery?.removeEventListener?.("change", scheduleRebuild)

            if(shaderState?.buffer)
                shaderState.gl.deleteBuffer(shaderState.buffer)
            if(shaderState?.program)
                shaderState.gl.deleteProgram(shaderState.program)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="section-decoration-canvas section-decoration-canvas-writing"
            aria-hidden={true}
        />
    )
}

export default WritingDecorationSvg
