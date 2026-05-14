function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function mulberry32(seed) {
    let a = (seed >>> 0) || 1
    return function () {
        a |= 0
        a = (a + 0x6D2B79F5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

const MIN_DOT_POWER = 1
const MAX_DOT_POWER = 9
const BASE_SPEED = 0.00042
const FRQ_PERIOD_MS = 6000

const VERTEX_SHADER_SOURCE = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

function buildFragmentShaderSource(dotCount) {
    return `
precision mediump float;

uniform float width;
uniform float height;
uniform float frq;
uniform vec2 dots[${dotCount}];

vec3 palette(float t) {
  return 0.42 + 0.58 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + t));
}

float hashIndex(float n) {
  return fract(sin(n * 127.1 + 311.7) * 43758.5453123);
}

void main() {
  vec2 resolution = vec2(width, height);
  vec2 uv = (gl_FragCoord.xy / resolution) - 0.5;

  float nearest = 100000000.0;
  float dist;
  float hueId = 0.0;

  for (int k = 0; k < ${dotCount}; ++k) {
    dist = length(uv - dots[k]);
    if (dist < nearest) {
      nearest = dist;
      hueId = float(k);
    }
  }

  float bands = (cos(nearest * frq) + 1.0) * 0.5;
  vec3 hue = palette(hashIndex(hueId));
  gl_FragColor = vec4(bands * hue, 1.0);
}
`
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

function createProgram(gl, dotCount) {
    const vertexShader = compileShader(gl, VERTEX_SHADER_SOURCE, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(gl, buildFragmentShaderSource(dotCount), gl.FRAGMENT_SHADER)
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const message = gl.getProgramInfoLog(program) || "Program link failed"
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
        throw new Error(message)
    }

    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)

    return {
        program,
        widthHandle: gl.getUniformLocation(program, "width"),
        heightHandle: gl.getUniformLocation(program, "height"),
        frqHandle: gl.getUniformLocation(program, "frq"),
        dotsHandle: gl.getUniformLocation(program, "dots")
    }
}

function normalizedPointer(pointer) {
    return {
        x: clamp(pointer.x - 0.5, -0.5, 0.5),
        y: clamp(0.5 - pointer.y, -0.5, 0.5)
    }
}

export function createDistanceFieldEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const random = mulberry32((options.seed >>> 0) || 1)
    const gl =
        canvas.getContext("webgl", { antialias: false, preserveDrawingBuffer: false }) ||
        canvas.getContext("experimental-webgl", { antialias: false, preserveDrawingBuffer: false })

    if(!gl) throw new Error("WebGL not available")

    let resources = null
    let vertexBuffer = null
    let width = 1
    let height = 1
    let running = false
    let rafId = null
    let lastTime = 0

    const maxUniformVectors = Number(gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS)) || 128
    const maxDotCountFromUniforms = Math.max(2, Math.min(
        2 ** MAX_DOT_POWER,
        2 ** Math.floor(Math.log2(Math.max(2, maxUniformVectors - 16)))
    ))
    const maxDotPower = Math.floor(Math.log2(maxDotCountFromUniforms))

    let dotPower = MIN_DOT_POWER
    let dotCount = 2 ** dotPower
    let dots = new Float32Array(dotCount * 2)
    let velocities = new Float32Array(dotCount * 2)

    let pointerActive = false
    let pointer = { x: 0.5, y: 0.5 }
    let hoverActive = false
    let hoverStartMs = 0
    let hoverMomentum = 1
    let clickImpulse = 0

    function initGeometry() {
        const vertexData = new Float32Array([
            -1,  1,
            -1, -1,
             1,  1,
             1, -1
        ])

        vertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)
    }

    function rebuildProgram() {
        if(resources?.program) {
            gl.deleteProgram(resources.program)
        }

        resources = createProgram(gl, dotCount)
        gl.useProgram(resources.program)
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

        const positionHandle = gl.getAttribLocation(resources.program, "position")
        gl.enableVertexAttribArray(positionHandle)
        gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 8, 0)
        gl.uniform1f(resources.widthHandle, width)
        gl.uniform1f(resources.heightHandle, height)
    }

    function seedDots() {
        dots = new Float32Array(dotCount * 2)
        velocities = new Float32Array(dotCount * 2)

        for(let index = 0; index < dotCount; index++) {
            const ix = index * 2
            dots[ix] = random() - 0.5
            dots[ix + 1] = random() - 0.5

            const dir = random() * Math.PI * 2
            const drift = 0.8 + random() * 0.4
            velocities[ix] = Math.cos(dir) * drift
            velocities[ix + 1] = Math.sin(dir) * drift
        }
    }

    function rebuildDots() {
        dotCount = 2 ** dotPower
        rebuildProgram()
        seedDots()
        clickImpulse = 1
        renderStatic()
    }

    function currentFrq(nowMs) {
        const swing = 0.5 - 0.5 * Math.cos((nowMs % FRQ_PERIOD_MS) / FRQ_PERIOD_MS * Math.PI * 2)
        const dotScale = 96 + dotPower * 56
        const hoverScale = 44 * Math.max(0, hoverMomentum - 1)
        return swing * (dotScale + hoverScale)
    }

    function currentSpeed(nowMs) {
        if(reduceMotion) return BASE_SPEED * 0.7

        let targetMomentum = 1
        if(hoverActive) {
            const hoverMs = Math.max(0, nowMs - hoverStartMs)
            targetMomentum = 1 + Math.log2(1 + hoverMs / 220)
        }

        hoverMomentum += (targetMomentum - hoverMomentum) * 0.08
        clickImpulse *= 0.94

        return BASE_SPEED * hoverMomentum * (1 + clickImpulse * 1.25)
    }

    function updateDots(deltaMs, nowMs) {
        const speed = currentSpeed(nowMs) * deltaMs
        const pointerCenter = normalizedPointer(pointer)

        for(let index = 0; index < dotCount; index++) {
            const ix = index * 2
            let vx = velocities[ix]
            let vy = velocities[ix + 1]

            if(pointerActive) {
                const dx = pointerCenter.x - dots[ix]
                const dy = pointerCenter.y - dots[ix + 1]
                const distSq = Math.max(0.0004, dx * dx + dy * dy)
                const force = Math.min(0.0018, 0.000085 / distSq)
                vx += dx * force * deltaMs
                vy += dy * force * deltaMs

                const mag = Math.hypot(vx, vy) || 1
                const limit = 2.3 + hoverMomentum * 0.85
                if(mag > limit) {
                    vx = (vx / mag) * limit
                    vy = (vy / mag) * limit
                }

                velocities[ix] = vx
                velocities[ix + 1] = vy
            }

            dots[ix] += vx * speed
            dots[ix + 1] += vy * speed

            if(Math.abs(dots[ix]) > 0.5) {
                dots[ix] = clamp(dots[ix], -0.5, 0.5)
                velocities[ix] = -vx
            }
            if(Math.abs(dots[ix + 1]) > 0.5) {
                dots[ix + 1] = clamp(dots[ix + 1], -0.5, 0.5)
                velocities[ix + 1] = -vy
            }
        }
    }

    function draw(nowMs = performance.now(), force = false) {
        if(!resources?.program) return

        if(!force) {
            const deltaMs = clamp(nowMs - lastTime, 8, 40)
            updateDots(deltaMs, nowMs)
        }

        lastTime = nowMs
        gl.useProgram(resources.program)
        gl.uniform1f(resources.frqHandle, currentFrq(nowMs))
        gl.uniform2fv(resources.dotsHandle, dots)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    function tick(nowMs) {
        if(!running) return
        draw(nowMs)
        rafId = requestAnimationFrame(tick)
    }

    function setSize(nextWidth, nextHeight, devicePixelRatio = 1) {
        const dpr = Math.max(1, Number(devicePixelRatio) || 1)
        const w = Math.max(1, Math.floor(nextWidth || 1))
        const h = Math.max(1, Math.floor(nextHeight || 1))

        width = Math.floor(w * dpr)
        height = Math.floor(h * dpr)
        canvas.width = width
        canvas.height = height

        gl.viewport(0, 0, width, height)
        if(resources?.program) {
            gl.useProgram(resources.program)
            gl.uniform1f(resources.widthHandle, width)
            gl.uniform1f(resources.heightHandle, height)
        }
        renderStatic()
    }

    function setPointer(x, y) {
        pointer = {
            x: clamp(x, 0, 1),
            y: clamp(y, 0, 1)
        }
        pointerActive = true
    }

    function clearPointer() {
        pointerActive = false
    }

    function setHoverActive(active) {
        const next = Boolean(active)
        if(next && !hoverActive) {
            hoverStartMs = performance.now()
        }
        hoverActive = next
    }

    function boostPopulation() {
        dotPower = dotPower >= maxDotPower ? MIN_DOT_POWER : dotPower + 1
        rebuildDots()
        start()
    }

    function renderStatic() {
        draw(performance.now(), true)
    }

    function start() {
        if(running) return
        running = true
        lastTime = performance.now()
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function destroy() {
        stop()
        if(resources?.program) gl.deleteProgram(resources.program)
        resources = null
        if(vertexBuffer) gl.deleteBuffer(vertexBuffer)
        vertexBuffer = null
    }

    initGeometry()
    rebuildDots()

    return {
        start,
        stop,
        destroy,
        renderStatic,
        setSize,
        setPointer,
        clearPointer,
        setHoverActive,
        boostPopulation,
        getDotLimit: () => maxDotCountFromUniforms
    }
}
