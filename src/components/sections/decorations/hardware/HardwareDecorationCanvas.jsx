import "./HardwareDecorationCanvas.scss"
import React, {useEffect, useRef} from 'react'

const FRAME_INTERVAL_MS = 72
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
uniform vec4 bottomBand;
uniform vec4 activeBand;
uniform float hasBottomBand;
uniform float lightMode;

#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define MN min(R.x,R.y)
#define S smoothstep
#define beat(a) pow(S(.4,.6,sin(3.1415/a*T)*.5+.5),5.)

float rnd(vec2 p) {
    p=fract(p*vec2(12.9898,78.233));
    p+=dot(p,p+34.56);
    return fract(p.x*p.y);
}

float spirals(vec2 uv) {
    float c=.0, d=.0, k=.35;
    for(float i=1.;i<8.;i++) {
        c+=abs(sin(T/i)*.05)/length(vec2(uv.y,sin(uv.y+T*i)*k)-uv.yx);
        vec2 p=uv;
        p.x-=sin(p.y+T*i)*k;
        p.y+=T*1.5;
        p.y=mod(p.y,.5)-.25;
        d+=.008/length(p);
    }
    c*=abs(d);
    return c;
}

vec3 pattern(vec2 uv, vec2 sourceResolution) {
    float k=4./min(sourceResolution.x,sourceResolution.y);
    vec3 raw=sqrt(spirals(uv*.95)*vec3(
        spirals(uv-k),
        spirals(uv),
        spirals(uv+k)
    ));
    float neutral=min(min(raw.r,raw.g),raw.b);
    vec3 colorOnly=max(raw-vec3(neutral*.72),vec3(0));
    return colorOnly*vec3(1.9,1.35,2.15)+raw*.16;
}

float bottomMask(vec2 p) {
    vec4 b=bottomBand;
    return hasBottomBand*
        step(b.x,p.x)*
        step(b.y,p.y)*
        step(p.x,b.x+b.z)*
        step(p.y,b.y+b.w);
}

vec3 renderLayer(vec2 fragmentCoord, vec2 sourceResolution, bool includeSpirals) {
    vec3 col=vec3(0);
    float tt=beat(3.);
    float t=beat(6.);
    float m=S(1e-3,.5,1./(10.+90.*(1.-tt)));
    float n=S(1e-3,.5,1./(7.+93.*tt));
    vec2 uv=(fragmentCoord-.5*sourceResolution)/min(sourceResolution.x,sourceResolution.y);

    if(sourceResolution.x>sourceResolution.y)
        uv=vec2(uv.y,-uv.x);

    uv*=2.75+sqrt(t*.55);
    vec2 p=uv*(1.+.12*sqrt(t));
    uv-=uv*mix(.05,.22,rnd(uv))*n*.32;
    p-=p*mix(.08,.22,rnd(fragmentCoord*.35))*m*.28;

    float wave=sin(p.x*16.)*cos(p.y*16.);
    vec2 cell=fract(p*2.45)-.5;
    float squareEdge=max(abs(cell.x),abs(cell.y));
    float squareLine=S(.425,.49,squareEdge);
    float squareTone=rnd(floor(p*2.45));
    col+=vec3(pow(abs(wave),.32))*.1;
    col+=vec3(squareLine)*.36;
    col+=vec3(squareTone)*.045;

    if(includeSpirals)
        col=max(col,pattern(uv,sourceResolution));

    return col;
}

vec2 localBandCoord(vec2 p, vec4 band, vec2 sourceResolution) {
    vec2 local=p-band.xy;
    return vec2(
        local.x/max(band.z,1.)*sourceResolution.x,
        local.y/max(band.w,1.)*sourceResolution.y
    );
}

void main(){
    vec2 sourceResolution=hasBottomBand>.5?bottomBand.zw:activeBand.zw;
    vec2 cubeCoord=hasBottomBand>.5?FC-bottomBand.xy:localBandCoord(FC,activeBand,sourceResolution);
    vec3 col=renderLayer(cubeCoord,sourceResolution,false);
    float isBottom=bottomMask(FC);

    if(isBottom>.5) {
        vec2 bottomCoord=FC-bottomBand.xy;
        vec2 bottomResolution=bottomBand.zw;
        col=max(col,renderLayer(bottomCoord,bottomResolution,true));
    }

    float brightness=max(max(col.r,col.g),col.b);
    float blackMask=1.-S(.025,.16,brightness);
    vec3 lightCol=min(vec3(1),pow(max(col,vec3(0)),vec3(.62))*1.18+vec3(.12));
    lightCol=mix(lightCol,vec3(1),blackMask);
    col=mix(col,lightCol,lightMode);

    O=vec4(col,1);
}`

function compileShader(gl, shader, source) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader) || "Art decoration shader compile failed")
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
        throw new Error(gl.getProgramInfoLog(program) || "Art decoration shader link failed")

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
    program.bottomBand = gl.getUniformLocation(program, "bottomBand")
    program.activeBand = gl.getUniformLocation(program, "activeBand")
    program.hasBottomBand = gl.getUniformLocation(program, "hasBottomBand")
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

    const layerLeft = bandRects[0].x
    const layerHeight = Math.max(...bandRects.map(rect => rect.y + rect.height))
    const bottomBand = bandRects.find(rect => rect.element.classList.contains("section-decoration-band-page-bottom")) || null

    return {
        scale: safeScale,
        left: layerLeft,
        width: bandRects[0].width,
        height: layerHeight,
        bands: bandRects.map(rect => ({
            x: rect.x - layerLeft,
            y: rect.y,
            width: rect.width,
            height: rect.height
        })),
        bottomBand: bottomBand ? {
            x: bottomBand.x - layerLeft,
            y: bottomBand.y,
            width: bottomBand.width,
            height: bottomBand.height
        } : null
    }
}

function resizeCanvas(canvas, gl, layout) {
    const pixelRatio = Math.max(1, Math.min(MAX_DEVICE_PIXEL_RATIO, (window.devicePixelRatio || 1) * 0.75))
    const width = Math.max(1, Math.round(layout.width * pixelRatio))
    const height = Math.max(1, Math.round(layout.height * pixelRatio))

    canvas.style.left = `${layout.left}px`
    canvas.style.top = "0px"
    canvas.style.width = `${layout.width}px`
    canvas.style.height = `${layout.height}px`

    if(canvas.width !== width)
        canvas.width = width
    if(canvas.height !== height)
        canvas.height = height

    gl.viewport(0, 0, width, height)

    return pixelRatio
}

function getRenderRegions(layout, pixelRatio) {
    const scissorRects = layout.bands.map(band => ({
        x: Math.max(0, Math.round(band.x * pixelRatio)),
        y: Math.max(0, Math.round((layout.height - band.y - band.height) * pixelRatio)),
        width: Math.max(1, Math.round(band.width * pixelRatio)),
        height: Math.max(1, Math.round(band.height * pixelRatio))
    }))

    const bottomBand = layout.bottomBand ? {
        x: layout.bottomBand.x * pixelRatio,
        y: (layout.height - layout.bottomBand.y - layout.bottomBand.height) * pixelRatio,
        width: layout.bottomBand.width * pixelRatio,
        height: layout.bottomBand.height * pixelRatio
    } : null

    return { scissorRects, bottomBand }
}

function drawShader(shaderState, regions, now) {
    const { gl, program, buffer } = shaderState
    const bottomBand = regions.bottomBand || { x: 0, y: 0, width: 0, height: 0 }
    const isLightMode = document.documentElement.getAttribute("data-theme") === "light"

    gl.disable(gl.SCISSOR_TEST)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(program.resolution, gl.canvas.width, gl.canvas.height)
    gl.uniform1f(program.time, now * 0.001)
    gl.uniform4f(program.bottomBand, bottomBand.x, bottomBand.y, bottomBand.width, bottomBand.height)
    gl.uniform1f(program.hasBottomBand, regions.bottomBand ? 1 : 0)
    gl.uniform1f(program.lightMode, isLightMode ? 1 : 0)
    gl.enable(gl.SCISSOR_TEST)

    for(const rect of regions.scissorRects) {
        gl.scissor(rect.x, rect.y, rect.width, rect.height)
        gl.uniform4f(program.activeBand, rect.x, rect.y, rect.width, rect.height)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    gl.disable(gl.SCISSOR_TEST)
}

function HardwareDecorationCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const wrapper = canvas?.parentElement
        if(!canvas || !wrapper)
            return

        let animationFrameId = null
        let rebuildFrameId = null
        let shaderState = null
        let regions = null
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
            if(regions)
                drawShader(shaderState, regions, 0)
        }

        const step = (timestamp) => {
            if(!shouldAnimate()) {
                stopLoop()
                return
            }

            if(regions && timestamp - lastFrameTime >= FRAME_INTERVAL_MS) {
                lastFrameTime = timestamp
                drawShader(shaderState, regions, timestamp)
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
            regions = getRenderRegions(layout, pixelRatio)
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
            className="section-decoration-canvas section-decoration-canvas-hardware"
            aria-hidden={true}
        />
    )
}

export default HardwareDecorationCanvas
