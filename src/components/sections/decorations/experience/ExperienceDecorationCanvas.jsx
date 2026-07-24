import "./ExperienceDecorationCanvas.scss"
import React, {useEffect, useRef} from 'react'

const FRAME_INTERVAL_MS = 40
const TIME_SCALE = 0.242
const TREE_SPEED_SCALE = 1.1
const TREE_BOTTOM_OFFSET_RATIO = 0.18
const TREE_SIDE_HEIGHT_RATIO = 0.72
const TREE_CENTER_HEIGHT_RATIO = 0.88
const TREE_WIDTH_SCALE = 0.8
const MAX_DEVICE_PIXEL_RATIO = 1.15
const BRANCH_MAX_DEVICE_PIXEL_RATIO = 1.25
const MAX_SHADER_RENDER_WIDTH = 2304
const MAX_SHADER_RENDER_HEIGHT = 4096
const MAX_BRANCH_RENDER_WIDTH = 2048
const MAX_BRANCH_RENDER_HEIGHT = 2048

const vertexSource = `#version 300 es
in vec4 position;
void main() {
    gl_Position = position;
}`

const fragmentSource = `#version 300 es
precision highp float;

out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform float lightMode;

#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define MN min(R.x,R.y)
#define rot(a) mat2(cos((a)-vec4(0,11,33,0)))

float rnd(vec2 p) {
    p=fract(p*vec2(12.9898,78.233));
    p+=dot(p,p+34.56);
    return fract(p.x*p.y);
}

float noise(vec2 p) {
    vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
    float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float fbm(vec2 p) {
    float t=.0, a=1.;
    mat2 m=mat2(.5,-1.5,.75,.25);
    for(float i=.0; i++<5.;) {
        t+=a*noise(p);
        p=2.*p*m;
        a*=.5;
    }
    return t;
}

void main() {
    vec2 uv=((FC-.5*R)/MN)+.5, p=uv-vec2(.5,.8);
    p*=rot(noise(T-(p-12.)*.2));
    vec3 col=vec3(0);
    p*=fbm(p*6.*fbm(p*12.));
    col.r+=(sin(T)*.5+1.5)*fbm(p+vec2(.1,0));
    col.g+=1.5*fbm(p*1.1);
    col.b+=(cos(T)*.5+1.5)*fbm(p+vec2(0,.2));
    col/=1.+exp(-col*col);
    col=sqrt(col);
    float s=3., e=9e-3;
    uv+=uv.x;
    uv*=rot(-.42)*(p.y*.75-.75)+.25;
    col+=e/(sin(uv.x*s)*cos(uv.y*s));
    col=max(1.-col,.08);
    col=mix(col,1.-col,lightMode);
    O=vec4(col,1);
}`

function compileShader(gl, shader, source) {
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader) || "Experience decoration shader compile failed")
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
        throw new Error(gl.getProgramInfoLog(program) || "Experience decoration shader link failed")

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
            left: bottomBand.x,
            top: bottomBand.y,
            width: bottomBand.width,
            height: bottomBand.height
        } : null
    }
}

function resizeCanvas(canvas, gl, layout) {
    const basePixelRatio = Math.max(1, Math.min(MAX_DEVICE_PIXEL_RATIO, (window.devicePixelRatio || 1) * 0.75))
    const widthRatioLimit = MAX_SHADER_RENDER_WIDTH / Math.max(layout.width, 1)
    const heightRatioLimit = MAX_SHADER_RENDER_HEIGHT / Math.max(layout.height, 1)
    const pixelRatio = Math.max(0.35, Math.min(basePixelRatio, widthRatioLimit, heightRatioLimit))
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
    gl.uniform1f(program.time, now * 0.0001 * TIME_SCALE)
    gl.uniform1f(program.lightMode, isLightMode ? 1 : 0)
    gl.enable(gl.SCISSOR_TEST)

    for(const rect of scissorRects) {
        gl.scissor(rect.x, rect.y, rect.width, rect.height)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    gl.disable(gl.SCISSOR_TEST)
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min
}

function createBranch(length, angle, generation, maxGeneration) {
    const branch = {
        length,
        angle,
        generation,
        limbs: [],
        sway: 0,
        multiplier: getRandomFloat(0.01, 0.1),
        spawn: 0,
        velocity: 0
    }

    if(generation < maxGeneration) {
        branch.limbs.push(createBranch(length * getRandomFloat(0.8, 0.99), getRandomFloat(0, Math.PI / 6), generation + 1, maxGeneration))
        branch.limbs.push(createBranch(length * getRandomFloat(0.8, 0.99), getRandomFloat(0, -Math.PI / 6), generation + 1, maxGeneration))
    }

    return branch
}

function drawBranch(context, branch, hue, reducedMotion) {
    branch.sway += (reducedMotion ? 0.16 : 1) * TREE_SPEED_SCALE
    context.save()

    branch.velocity *= 0.9
    branch.velocity += (1 - branch.spawn) * 0.1
    branch.spawn += branch.velocity

    context.strokeStyle = `hsla(${hue % 360},100%,50%,1)`
    context.lineWidth = 1
    context.beginPath()
    context.rotate(branch.angle + Math.sin(branch.sway * branch.multiplier) * Math.PI / 128)
    context.moveTo(0, 0)
    context.lineTo(branch.length * branch.spawn, 0)
    context.stroke()
    context.translate(branch.length * branch.spawn, 0)

    if(branch.spawn > 0.6) {
        for(const limb of branch.limbs)
            drawBranch(context, limb, hue, reducedMotion)
    }

    context.restore()
}

function updateBranchBounds(bounds, x, y) {
    bounds.minX = Math.min(bounds.minX, x)
    bounds.maxX = Math.max(bounds.maxX, x)
    bounds.minY = Math.min(bounds.minY, y)
    bounds.maxY = Math.max(bounds.maxY, y)
}

function measureBranchBounds(branch, originX = 0, originY = 0, parentAngle = 0, bounds = {
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0
}) {
    const angle = parentAngle + branch.angle
    const endX = originX + Math.cos(angle) * branch.length
    const endY = originY + Math.sin(angle) * branch.length

    updateBranchBounds(bounds, originX, originY)
    updateBranchBounds(bounds, endX, endY)

    for(const limb of branch.limbs)
        measureBranchBounds(limb, endX, endY, angle, bounds)

    return bounds
}

function createBottomBranches(layout) {
    const baseLength = 100
    const centerY = layout.height * (1 + TREE_BOTTOM_OFFSET_RATIO)
    const sideXOffset = Math.max(0, layout.width * 0.21)
    const centerX = layout.width * 0.5

    return [
        {
            branch: createBranch(baseLength * 0.6, 0, 0, 7),
            x: sideXOffset,
            y: centerY,
            targetHeight: layout.height * TREE_SIDE_HEIGHT_RATIO
        },
        {
            branch: createBranch(baseLength * 0.544, 0, 0, 8),
            x: centerX,
            y: centerY,
            targetHeight: layout.height * TREE_CENTER_HEIGHT_RATIO
        },
        {
            branch: createBranch(baseLength * 0.6, 0, 0, 7),
            x: layout.width - sideXOffset,
            y: centerY,
            targetHeight: layout.height * TREE_SIDE_HEIGHT_RATIO
        }
    ].map((item) => {
        const bounds = measureBranchBounds(item.branch)
        const localHeight = Math.max(1, bounds.maxX - bounds.minX)
        const scaleX = item.targetHeight / localHeight

        return {
            ...item,
            scaleX,
            scaleY: scaleX * TREE_WIDTH_SCALE
        }
    })
}

function resizeBottomCanvas(canvas, layout) {
    if(!layout.bottomBand)
        return null

    const basePixelRatio = Math.max(1, Math.min(BRANCH_MAX_DEVICE_PIXEL_RATIO, window.devicePixelRatio || 1))
    const band = layout.bottomBand
    const widthRatioLimit = MAX_BRANCH_RENDER_WIDTH / Math.max(band.width, 1)
    const heightRatioLimit = MAX_BRANCH_RENDER_HEIGHT / Math.max(band.height, 1)
    const pixelRatio = Math.max(0.35, Math.min(basePixelRatio, widthRatioLimit, heightRatioLimit))
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

    const context = canvas.getContext("2d", { alpha: true })
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

    return {
        context,
        width: band.width,
        height: band.height
    }
}

function drawBottomBranches(branchState, now, reducedMotion) {
    if(!branchState)
        return

    const { context, width, height, branches } = branchState
    const restrictedHues = [24, 8, 342, 286, 236, 194]
    const hueProgress = reducedMotion ? 4 : (now * 0.00018 * TREE_SPEED_SCALE) % restrictedHues.length
    const hueIndex = Math.floor(hueProgress)
    const hueMix = hueProgress - hueIndex
    const hueStart = restrictedHues[hueIndex]
    const hueEnd = restrictedHues[(hueIndex + 1) % restrictedHues.length]
    const hue = hueStart + (hueEnd - hueStart) * hueMix

    context.clearRect(0, 0, width, height)
    context.save()
    context.globalCompositeOperation = "lighter"

    for(const item of branches) {
        context.save()
        context.translate(item.x, item.y)
        context.rotate(-Math.PI * 0.5)
        context.scale(item.scaleX, item.scaleY)
        drawBranch(context, item.branch, hue, reducedMotion)
        context.restore()
    }

    context.restore()
}

function ExperienceDecorationCanvas({ staticMode = false }) {
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
        let scissorRects = []
        let bottomBranchState = null
        let lastFrameTime = 0
        let isIntersecting = false
        const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null

        try {
            shaderState = setupShader(shaderCanvas)
        }
        catch(error) {
            console.error(error)
            shaderState = null
        }

        if(!shaderState)
            return

        const isReducedMotion = () => staticMode || Boolean(reducedMotionQuery?.matches)
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
            drawBottomBranches(bottomBranchState, 0, true)
        }

        const step = (timestamp) => {
            if(!shouldAnimate()) {
                stopLoop()
                return
            }

            if(scissorRects.length > 0 && timestamp - lastFrameTime >= FRAME_INTERVAL_MS) {
                lastFrameTime = timestamp
                drawShader(shaderState, scissorRects, timestamp)
                drawBottomBranches(bottomBranchState, timestamp, false)
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
            scissorRects = getScissorRects(layout, pixelRatio)
            const bottomCanvasState = resizeBottomCanvas(bottomCanvas, layout)
            bottomBranchState = bottomCanvasState ? {
                ...bottomCanvasState,
                branches: createBottomBranches(bottomCanvasState)
            } : null
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
    }, [staticMode])

    return (
        <>
            <canvas
                ref={shaderCanvasRef}
                className="section-decoration-canvas section-decoration-canvas-experience"
                aria-hidden={true}
            />
            <canvas
                ref={bottomCanvasRef}
                className="section-decoration-canvas section-decoration-canvas-experience-bottom"
                aria-hidden={true}
            />
        </>
    )
}

export default ExperienceDecorationCanvas
