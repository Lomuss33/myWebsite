import "./SoftwareBottomShaderCanvas.scss"
import React, {useEffect, useRef} from 'react'

const MAX_DEVICE_PIXEL_RATIO = 1.5

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
    uv=pmod(uv*3.,6.);
    uv.y-=.5;
    uv=smin(uv,-uv,.08);
    vec2 p=vec2(log(poly(uv,3.))+T,1);
    p=mod(p,2.)-1.;
    col+=.05/hue(dot(p,p));
    col-=sin(FC.y)*.5+.55;
    col=max(col,vec3(0));
    col=vec3(col.r*.22,col.g,col.b*.32);
    float alpha=clamp(max(max(col.r,col.g),col.b)*1.55,0.,.82);
    O=vec4(col,alpha);
}`

function compileShader(gl, shader, source) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader) || "Software bottom shader compile failed")
}

function createProgram(gl) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    const program = gl.createProgram()

    compileShader(gl, vertexShader, vertexSource)
    compileShader(gl, fragmentShader, fragmentSource)

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if(!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(program) || "Software bottom shader link failed")

    return program
}

function measureBottomBand(canvas) {
    const wrapper = canvas?.parentElement
    const band = wrapper?.querySelector(".section-decoration-band-page-bottom")
    if(!wrapper || !band)
        return null

    const wrapperRect = wrapper.getBoundingClientRect()
    const bandRect = band.getBoundingClientRect()
    const scale = wrapper.offsetWidth > 0 ? wrapperRect.width / wrapper.offsetWidth : 1
    const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1

    return {
        scale: safeScale,
        left: (bandRect.left - wrapperRect.left) / safeScale,
        top: (bandRect.top - wrapperRect.top) / safeScale,
        width: bandRect.width / safeScale,
        height: bandRect.height / safeScale
    }
}

function resizeCanvas(canvas, gl, layout) {
    const dpr = Math.max(1, Math.min(MAX_DEVICE_PIXEL_RATIO, window.devicePixelRatio * 0.5))
    const width = Math.max(1, Math.round(layout.width * dpr))
    const height = Math.max(1, Math.round(layout.height * dpr))

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

function SoftwareBottomShaderCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const wrapper = canvas?.parentElement
        if(!canvas || !wrapper)
            return

        const gl = canvas.getContext("webgl2", {
            alpha: true,
            antialias: false,
            depth: false,
            stencil: false,
            premultipliedAlpha: false,
            preserveDrawingBuffer: false
        })

        if(!gl)
            return

        let program = null
        let buffer = null
        let animationFrameId = null
        let rebuildFrameId = null
        let isVisible = true

        try {
            program = createProgram(gl)
            buffer = gl.createBuffer()

            gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW)

            const position = gl.getAttribLocation(program, "position")
            gl.enableVertexAttribArray(position)
            gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

            program.resolution = gl.getUniformLocation(program, "resolution")
            program.time = gl.getUniformLocation(program, "time")
        }
        catch(error) {
            console.error(error)
            return
        }

        const draw = (now) => {
            if(isVisible) {
                gl.clearColor(0, 0, 0, 0)
                gl.clear(gl.COLOR_BUFFER_BIT)
                gl.useProgram(program)
                gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
                gl.uniform2f(program.resolution, canvas.width, canvas.height)
                gl.uniform1f(program.time, now * 0.001)
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
            }

            animationFrameId = window.requestAnimationFrame(draw)
        }

        const rebuild = () => {
            const layout = measureBottomBand(canvas)
            if(layout)
                resizeCanvas(canvas, gl, layout)
        }

        const scheduleRebuild = () => {
            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)

            rebuildFrameId = window.requestAnimationFrame(() => {
                rebuildFrameId = null
                rebuild()
            })
        }

        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleRebuild)
        const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(scheduleRebuild)
        const intersectionObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
            isVisible = entries.some(entry => entry.isIntersecting)
        }, { rootMargin: "180px" })

        resizeObserver?.observe(wrapper)
        mutationObserver?.observe(wrapper, { childList: true, subtree: true })
        intersectionObserver?.observe(canvas)
        window.addEventListener("resize", scheduleRebuild)

        rebuild()
        animationFrameId = window.requestAnimationFrame(draw)

        return () => {
            if(animationFrameId !== null)
                window.cancelAnimationFrame(animationFrameId)
            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)
            resizeObserver?.disconnect()
            mutationObserver?.disconnect()
            intersectionObserver?.disconnect()
            window.removeEventListener("resize", scheduleRebuild)

            if(buffer)
                gl.deleteBuffer(buffer)
            if(program)
                gl.deleteProgram(program)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="section-decoration-canvas section-decoration-canvas-software-bottom"
            aria-hidden={true}
        />
    )
}

export default SoftwareBottomShaderCanvas
