import "./EducationDecorationCanvas.scss"
import React, {useEffect, useRef} from 'react'

const FRAME_INTERVAL_MS = 96
const MAX_DEVICE_PIXEL_RATIO = 1.15
const MAX_BANDS = 12

const vertexSource = `#version 300 es
in vec4 position;
void main() {
    gl_Position = position;
}`

const bottomFragmentSource = `#version 300 es
precision highp float;

out vec4 O;
uniform float time;
uniform vec2 resolution;

#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define S smoothstep
#define MN min(R.x,R.y)
#define SE(v,s) S(s+1./MN,s-1./MN,v)

float pattern(vec2 uv) {
    float d=.0;
    for(float i=.0; i<3.; i++) {
        uv.x+=sin(T*(1.+i)+uv.y*1.5)*.2;
        d+=.005/abs(uv.x);
    }
    return d;
}

vec3 scene(vec2 uv) {
    vec3 col=vec3(0);
    uv=vec2(atan(uv.x,uv.y)*2./6.28318,-log(length(uv))-T);
    for(float i=.0; i<3.; i++) {
        int k=int(mod(i,3.));
        col[k]+=pattern(uv+i*6./MN);
    }
    return col;
}

void main() {
    vec2 uv=vec2(FC.x-.5*R.x,R.y-FC.y)/MN;
    vec3 col=vec3(0);
    col+=scene(uv);
    float alpha=clamp(max(max(col.r,col.g),col.b)*2.4,0.,.72);
    O=vec4(col,alpha);
}`

const fragmentSource = `#version 300 es
precision highp float;

out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform float darkMode;
uniform int bandCount;
uniform vec4 bands[12];

#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define S smoothstep
#define MN min(R.x,R.y)
#define SE(v,a) S(a+1./MN,a-1./MN,v)
#define PI radians(180.)
#define A (PI/4.)

mat2 rot(float a) {
    float c=cos(a), s=sin(a);
    return mat2(c,-s,s,c);
}

float rnd(vec2 p) {
    p=fract(p*vec2(12.9898,78.233));
    p+=dot(p,p+34.56);
    return fract(p.x*p.y);
}

float noise(vec2 p) {
    vec2 i=floor(p), u=S(i,i+1.,p), k=vec2(1,0);
    float a=rnd(i), b=rnd(i+k), c=rnd(i+k.yx), d=rnd(i+k.xx);
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float box(vec2 p, float s, float r) {
    p=abs(p)-s+r;
    return length(max(p,.0))+min(.0,max(p.x,p.y))-r;
}

float bandMask(vec2 p) {
    float mask=0.;
    for(int i=0; i<12; i++) {
        if(i>=bandCount)
            break;

        vec4 b=bands[i];
        float inside=step(b.x,p.x)*step(b.y,p.y)*step(p.x,b.x+b.z)*step(p.y,b.y+b.w);
        mask=max(mask,inside);
    }
    return mask;
}

void main() {
    const float n=2.;
    vec3 col=vec3(1);

    for(float dx=0.; dx<n; dx++) {
    for(float dy=0.; dy<n; dy++) {
        vec2 coord=FC+vec2(dx,dy)*.5;
        vec2 uv=(coord-.5*R)/MN, p=uv;
        p*=34.5;
        p*=rot(A);
        p=fract(p+.5)-.5;
        vec2 q=p;
        q=q-vec2(.4,-.4);
        float cir=max(SE(length(q),.2),.0);
        float bbx=SE(box(p,.42,.0),.0);
        float rs=S(.55,.45,sin(PI+22.*atan(q.y,q.x))*.5+.5);
        rs=-max(-max(rs,cir),-bbx);
        col=mix(col,vec3(0),SE(box(p,.45,.0),.0)-SE(box(p,.42,.0),.0));
        col=mix(col,vec3(max(dx,dy))*.1,rs);
    }}

    vec2 uv=FC/MN;
    float k=noise(uv+T*0.8+noise(uv*4.+noise(uv*8.)));
    k=mix(.1,k,0.9);
    vec3 glow=mix(vec3(.7,.6,.1)*1.4,vec3(.36,.3,.07),k);
    col=max(col,glow);

    float brightness=max(max(col.r,col.g),col.b);
    float chroma=brightness-min(min(col.r,col.g),col.b);
    float neutralWhiteMask=smoothstep(.72,.96,brightness)*(1.-smoothstep(.04,.2,chroma));
    col=mix(col,mix(col,vec3(0),neutralWhiteMask),darkMode);

    float mask=bandMask(FC);
    O=vec4(col*mask,mask);
}`

function compileShader(gl, shader, source) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader) || "Education decoration shader compile failed")
}

function createShaderProgram(gl, source = fragmentSource) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    const program = gl.createProgram()

    compileShader(gl, vertexShader, vertexSource)
    compileShader(gl, fragmentShader, source)

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if(!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(program) || "Education decoration shader link failed")

    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)

    return program
}

function setupShader(canvas, source = fragmentSource) {
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

    const program = createShaderProgram(gl, source)
    const buffer = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    program.resolution = gl.getUniformLocation(program, "resolution")
    program.time = gl.getUniformLocation(program, "time")
    program.darkMode = gl.getUniformLocation(program, "darkMode")
    program.bandCount = gl.getUniformLocation(program, "bandCount")
    program.bands = gl.getUniformLocation(program, "bands[0]")

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
    const bands = bandRects.slice(0, MAX_BANDS).map(rect => ({
        x: rect.x - layerLeft,
        y: rect.y,
        width: rect.width,
        height: rect.height
    }))

    return {
        scale: safeScale,
        left: layerLeft,
        width: bandRects[0].width,
        height: layerHeight,
        bands,
        bottomBand: bottomBand ? {
            left: bottomBand.x,
            top: bottomBand.y,
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

function resizeBottomCanvas(canvas, gl, layout) {
    if(!layout.bottomBand)
        return null

    const pixelRatio = Math.max(1, Math.min(MAX_DEVICE_PIXEL_RATIO, (window.devicePixelRatio || 1) * 0.75))
    const band = layout.bottomBand
    const width = Math.max(1, Math.round(band.width * pixelRatio))
    const height = Math.max(1, Math.round(band.height * pixelRatio))

    canvas.style.left = `${band.left}px`
    canvas.style.top = `${band.top}px`
    canvas.style.width = `${band.width}px`
    canvas.style.height = `${band.height}px`

    if(canvas.width !== width)
        canvas.width = width
    if(canvas.height !== height)
        canvas.height = height

    gl.viewport(0, 0, width, height)
    return true
}

function getBandUniforms(layout, pixelRatio) {
    const values = new Float32Array(MAX_BANDS * 4)

    layout.bands.forEach((band, index) => {
        const offset = index * 4
        values[offset] = band.x * pixelRatio
        values[offset + 1] = (layout.height - band.y - band.height) * pixelRatio
        values[offset + 2] = band.width * pixelRatio
        values[offset + 3] = band.height * pixelRatio
    })

    return values
}

function drawShader(shaderState, layout, bandUniforms, now) {
    const { gl, program, buffer } = shaderState
    const bandCount = Math.min(layout.bands.length, MAX_BANDS)
    const isDarkMode = document.documentElement.getAttribute("data-theme") !== "light"

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(program.resolution, gl.canvas.width, gl.canvas.height)
    gl.uniform1f(program.time, now * 0.001)
    gl.uniform1f(program.darkMode, isDarkMode ? 1 : 0)
    gl.uniform1i(program.bandCount, bandCount)
    gl.uniform4fv(program.bands, bandUniforms)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

function drawBottomShader(shaderState, now) {
    const { gl, program, buffer } = shaderState

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(program.resolution, gl.canvas.width, gl.canvas.height)
    gl.uniform1f(program.time, now * 0.001 * 1)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

function EducationDecorationCanvas() {
    const shaderCanvasRef = useRef(null)
    const bottomCanvasRef = useRef(null)

    useEffect(() => {
        const shaderCanvas = shaderCanvasRef.current
        const bottomCanvas = bottomCanvasRef.current
        const wrapper = shaderCanvas?.parentElement
        if(!shaderCanvas || !bottomCanvas || !wrapper)
            return

        let animationFrameId = null
        let rebuildFrameId = null
        let layout = null
        let shaderState = null
        let bottomShaderState = null
        let bandUniforms = null
        let hasBottomShaderLayout = false
        let lastFrameTime = 0
        let isIntersecting = false
        const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null

        try {
            shaderState = setupShader(shaderCanvas)
            bottomShaderState = setupShader(bottomCanvas, bottomFragmentSource)
        }
        catch(error) {
            console.error(error)
            shaderState = null
            bottomShaderState = null
        }

        if(!shaderState || !bottomShaderState)
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
            if(layout && bandUniforms)
                drawShader(shaderState, layout, bandUniforms, 0)
            if(hasBottomShaderLayout)
                drawBottomShader(bottomShaderState, 0)
        }

        const step = (timestamp) => {
            if(!shouldAnimate()) {
                stopLoop()
                return
            }

            if(layout && bandUniforms && timestamp - lastFrameTime >= FRAME_INTERVAL_MS) {
                lastFrameTime = timestamp
                drawShader(shaderState, layout, bandUniforms, timestamp)
                if(hasBottomShaderLayout)
                    drawBottomShader(bottomShaderState, timestamp)
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
            const nextLayout = measureLayout(shaderCanvas)
            if(!nextLayout)
                return

            layout = nextLayout
            const pixelRatio = resizeCanvas(shaderCanvas, shaderState.gl, layout)
            bandUniforms = getBandUniforms(layout, pixelRatio)
            hasBottomShaderLayout = resizeBottomCanvas(bottomCanvas, bottomShaderState.gl, layout) === true
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
            intersectionObserver?.disconnect()
            window.removeEventListener("resize", scheduleRebuild)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            reducedMotionQuery?.removeEventListener?.("change", scheduleRebuild)

            if(shaderState?.buffer)
                shaderState.gl.deleteBuffer(shaderState.buffer)
            if(shaderState?.program)
                shaderState.gl.deleteProgram(shaderState.program)
            if(bottomShaderState?.buffer)
                bottomShaderState.gl.deleteBuffer(bottomShaderState.buffer)
            if(bottomShaderState?.program)
                bottomShaderState.gl.deleteProgram(bottomShaderState.program)
        }
    }, [])

    return (
        <>
            <canvas
                ref={shaderCanvasRef}
                className="section-decoration-canvas section-decoration-canvas-education"
                aria-hidden={true}
            />
            <canvas
                ref={bottomCanvasRef}
                className="section-decoration-canvas section-decoration-canvas-education-bottom"
                aria-hidden={true}
            />
        </>
    )
}

export default EducationDecorationCanvas
