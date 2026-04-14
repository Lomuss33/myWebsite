function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function smoothstep(edge0, edge1, x) {
    const t = clamp((x - edge0) / Math.max(0.000001, edge1 - edge0), 0, 1)
    return t * t * (3 - 2 * t)
}

function compileShader(gl, shaderSource, shaderType) {
    const shader = gl.createShader(shaderType)
    gl.shaderSource(shader, shaderSource)
    gl.compileShader(shader)
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const message = gl.getShaderInfoLog(shader) || "Shader compile failed"
        gl.deleteShader(shader)
        throw new Error(message)
    }
    return shader
}

function getAttribLocation(gl, program, name) {
    const location = gl.getAttribLocation(program, name)
    if(location === -1) throw new Error(`Cannot find attribute ${name}.`)
    return location
}

function getUniformLocation(gl, program, name) {
    const location = gl.getUniformLocation(program, name)
    if(location === null) throw new Error(`Cannot find uniform ${name}.`)
    return location
}

const VERTEX_SHADER_SOURCE = `
precision mediump float;
attribute vec2 position;

void main () {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

const float PI = 3.14159265358979323846264;
const vec4 WHITE = vec4(0.9, 0.9, 0.9, 1.0);
const vec4 BLACK = vec4(0.0, 0.0, 0.0, 1.0);
const int MAX_RINGS = 100;

uniform float time;
uniform float width;
uniform float height;
uniform float ringDistance;
uniform float maxRings;
uniform float waveCount;
uniform float waveDepth;
uniform float yCenter;
uniform float direction;

void main(void) {
    float rot = time * 0.006;
    float vmin = min(width, height);
    vec2 position = vec2(-(width / 2.0) + gl_FragCoord.x, -(height / 2.0) + gl_FragCoord.y) / (vmin / 2.0);
    float x = position.x;
    float y = position.y;

    bool white = false;
    float prevRingDist = ringDistance;
    for (int i = 0; i < MAX_RINGS; i++) {
        vec2 center = vec2(0.0, yCenter - ringDistance * float(i) * direction);
        float radius = 0.5 + ringDistance / (pow(float(i + 5), 1.1) * 0.006);
        float dist = distance(center, position);
        dist = pow(dist, 1.0 / 3.0);
        float currentRingDist = abs(dist - radius);

        if (currentRingDist < ringDistance * prevRingDist * 7.0) {
            float angle = atan(y - center.y, x - center.x);
            float thickness = 1.1 * abs(dist - radius) / max(0.0001, prevRingDist);
            float depthFactor = waveDepth * sin((angle + rot * radius) * waveCount);
            if (dist > radius) {
                white = (thickness < ringDistance * 5.0 - depthFactor * 2.0);
            } else {
                white = (thickness < ringDistance * 5.0 + depthFactor);
            }
            break;
        }

        if (dist > radius || float(i) >= maxRings) break;
        prevRingDist = currentRingDist;
    }

    gl_FragColor = white ? WHITE : BLACK;
}
`

export function createFallingRingsEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const gl =
        canvas.getContext("webgl", { antialias: false, preserveDrawingBuffer: false }) ||
        canvas.getContext("experimental-webgl", { antialias: false, preserveDrawingBuffer: false })

    if(!gl) throw new Error("WebGL not available")

    const ambientPreset = {
        ringDistance: 0.04,
        maxRings: 50,
        waveCount: 100,
        waveDepth: 0.2,
        yCenter: 0.3,
        direction: 3.0
    }

    const holdPreset = {
        ringDistance: 0.06,
        maxRings: 0.0,
        waveCount: 2,
        waveDepth: 0.01,
        yCenter: 0.0,
        direction: 0.0
    }

    let widthHandle = null
    let heightHandle = null
    let timeHandle = null
    let ringDistanceHandle = null
    let maxRingsHandle = null
    let waveCountHandle = null
    let waveDepthHandle = null
    let yCenterHandle = null
    let directionHandle = null
    let program = null
    let positionBuffer = null
    let running = false
    let rafId = null
    let simTime = 0
    let lastFrameMs = 0
    let holdMix = 0
    let held = false

    function initShaders() {
        const vertexShader = compileShader(gl, VERTEX_SHADER_SOURCE, gl.VERTEX_SHADER)
        const fragmentShader = compileShader(gl, FRAGMENT_SHADER_SOURCE, gl.FRAGMENT_SHADER)

        program = gl.createProgram()
        gl.attachShader(program, vertexShader)
        gl.attachShader(program, fragmentShader)
        gl.linkProgram(program)
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program) || "Program link failed")
        }

        gl.useProgram(program)

        const vertexData = new Float32Array([
            -1, -1,
            -1, 1,
            1, -1,
            1, -1,
            -1, 1,
            1, 1
        ])

        positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)

        const positionHandle = getAttribLocation(gl, program, "position")
        gl.enableVertexAttribArray(positionHandle)
        gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 8, 0)

        widthHandle = getUniformLocation(gl, program, "width")
        heightHandle = getUniformLocation(gl, program, "height")
        timeHandle = getUniformLocation(gl, program, "time")
        ringDistanceHandle = getUniformLocation(gl, program, "ringDistance")
        maxRingsHandle = getUniformLocation(gl, program, "maxRings")
        waveCountHandle = getUniformLocation(gl, program, "waveCount")
        waveDepthHandle = getUniformLocation(gl, program, "waveDepth")
        yCenterHandle = getUniformLocation(gl, program, "yCenter")
        directionHandle = getUniformLocation(gl, program, "direction")
    }

    function mixSettings(a, b, t) {
        return {
            ringDistance: a.ringDistance + (b.ringDistance - a.ringDistance) * t,
            maxRings: a.maxRings + (b.maxRings - a.maxRings) * t,
            waveCount: a.waveCount + (b.waveCount - a.waveCount) * t,
            waveDepth: a.waveDepth + (b.waveDepth - a.waveDepth) * t,
            yCenter: a.yCenter + (b.yCenter - a.yCenter) * t,
            direction: a.direction + (b.direction - a.direction) * t
        }
    }

    function draw(nowMs = performance.now()) {
        if(!program) return

        if(lastFrameMs <= 0) lastFrameMs = nowMs
        const dt = Math.min(50, Math.max(0, nowMs - lastFrameMs))
        lastFrameMs = nowMs

        if(held) {
            holdMix = Math.min(1, holdMix + dt / 4000)
        }
        else {
            holdMix = Math.max(0, holdMix - dt / 650)
        }

        const easedHoldMix = smoothstep(0, 1, holdMix)
        const settings = mixSettings(ambientPreset, holdPreset, easedHoldMix)

        const ambientSpeed = 0.12
        const holdSpeed = 0.012
        const speedMix = ambientSpeed + (holdSpeed - ambientSpeed) * easedHoldMix
        simTime += dt * speedMix * (reduceMotion ? 0.1 : 1.0)

        gl.uniform1f(timeHandle, simTime)
        gl.uniform1f(ringDistanceHandle, settings.ringDistance)
        gl.uniform1f(maxRingsHandle, settings.maxRings)
        gl.uniform1f(waveCountHandle, settings.waveCount)
        gl.uniform1f(waveDepthHandle, settings.waveDepth)
        gl.uniform1f(yCenterHandle, settings.yCenter)
        gl.uniform1f(directionHandle, settings.direction)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    function tick(nowMs) {
        if(!running) return
        draw(nowMs)
        rafId = requestAnimationFrame(tick)
    }

    function setSize(width, height, devicePixelRatio = 1) {
        const w = Math.max(1, Math.floor(width || 1))
        const h = Math.max(1, Math.floor(height || 1))
        const dpr = Math.max(1, Number(devicePixelRatio) || 1)

        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`

        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform1f(widthHandle, canvas.width)
        gl.uniform1f(heightHandle, canvas.height)
        draw(performance.now())
    }

    function setHeld(nextHeld) {
        held = Boolean(nextHeld)
        if(!running) draw(performance.now())
    }

    function renderStatic() {
        draw(performance.now())
    }

    function reset() {
        held = false
        holdMix = 0
        simTime = 0
        lastFrameMs = 0
        draw(performance.now())
    }

    function start() {
        if(reduceMotion) {
            draw(performance.now())
            return
        }
        if(running) return
        running = true
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function destroy() {
        stop()
        if(positionBuffer) gl.deleteBuffer(positionBuffer)
        if(program) gl.deleteProgram(program)
    }

    initShaders()

    return {
        start,
        stop,
        destroy,
        reset,
        renderStatic,
        setSize,
        setHeld
    }
}
