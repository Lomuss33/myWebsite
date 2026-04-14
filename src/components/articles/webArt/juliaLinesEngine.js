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

const VERTEX_SHADER_SOURCE = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER_SOURCE = `
precision mediump float;

#define ITER_MAX 250

uniform float width;
uniform float height;
uniform vec2 c0;

void main() {
  vec2 iResolution = vec2(width, height);
  float dist;
  float thismin;

  float zoom = 1.5;
  vec2 z = (gl_FragCoord.xy - 0.5 * iResolution.xy) / min(width, height) * 2.0 * zoom;
  vec2 grad = vec2(1.0, 0.0);
  dist = min(abs(z.x), abs(z.y));

  int k = 0;
  for (int kk = 0; kk < ITER_MAX; ++kk) {
    grad = 2.0 * vec2(z.x * grad.x - z.y * grad.y, z.x * grad.y + z.y * grad.x);
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c0;
    if (dot(z, z) > 4.0) break;
    thismin = abs(z.x) / length(grad);
    if (thismin < dist) {
      dist = thismin;
      k = kk - (kk / 6) * 6;
    }
  }

  vec3 s;
  if (k == 0) s = vec3(0.0, 0.0, 1.0);
  else if (k == 1) s = vec3(1.0, 1.0, 0.0);
  else if (k == 2) s = vec3(1.0, 0.0, 0.0);
  else if (k == 3) s = vec3(0.0, 1.0, 1.0);
  else if (k == 4) s = vec3(0.0, 1.0, 0.0);
  else s = vec3(1.0, 0.0, 1.0);

  float lineWidth = 0.003;
  float color = 1.0 - smoothstep(lineWidth, lineWidth + 0.005, dist);
  gl_FragColor = vec4(s * color, 1.0);
}
`

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

export function createJuliaLinesEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const random = mulberry32((options.seed >>> 0) || 1)

    const gl =
        canvas.getContext("webgl", { antialias: false, preserveDrawingBuffer: false }) ||
        canvas.getContext("experimental-webgl", { antialias: false, preserveDrawingBuffer: false })

    if(!gl) throw new Error("WebGL not available")

    let widthHandle = null
    let heightHandle = null
    let c0Handle = null
    let program = null
    let positionBuffer = null
    let running = false
    let rafId = null
    let maxx = 1
    let maxy = 1

    let pointerActive = false
    let pointer = { x: 0.4, y: 0.5 }
    let ambientPhaseX = random() * Math.PI * 2
    let ambientPhaseY = random() * Math.PI * 2
    let ambientBaseX = 0.18 + random() * 0.16
    let ambientBaseY = 0.08 + random() * 0.18
    let lastC0 = [9999, 9999]

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
            -1,  1,
            -1, -1,
             1,  1,
             1, -1
        ])

        positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)

        const positionHandle = getAttribLocation(gl, program, "position")
        gl.enableVertexAttribArray(positionHandle)
        gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 8, 0)

        widthHandle = getUniformLocation(gl, program, "width")
        heightHandle = getUniformLocation(gl, program, "height")
        c0Handle = getUniformLocation(gl, program, "c0")
    }

    function pointerToC0(px, py) {
        return [
            (px - 0.5) * 2,
            (0.5 - py) * 2
        ]
    }

    function currentC0(nowMs) {
        if(pointerActive) return pointerToC0(pointer.x, pointer.y)

        if(reduceMotion) {
            return pointerToC0(ambientBaseX, ambientBaseY)
        }

        const t = nowMs * 0.00045
        const px = 0.5 + Math.sin(t + ambientPhaseX) * 0.18 + Math.cos(t * 0.63 + ambientPhaseY) * 0.07
        const py = 0.5 + Math.cos(t * 0.91 + ambientPhaseY) * 0.2 + Math.sin(t * 0.52 + ambientPhaseX) * 0.06
        return pointerToC0(clamp(px, 0.12, 0.88), clamp(py, 0.12, 0.88))
    }

    function draw(nowMs = performance.now(), force = false) {
        if(!program) return
        const c0 = currentC0(nowMs)
        if(!force && Math.abs(c0[0] - lastC0[0]) < 0.0005 && Math.abs(c0[1] - lastC0[1]) < 0.0005) return

        lastC0 = c0
        gl.uniform2fv(c0Handle, c0)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
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

        maxx = w
        maxy = h
        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`

        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform1f(widthHandle, canvas.width)
        gl.uniform1f(heightHandle, canvas.height)
        lastC0 = [9999, 9999]
        draw(performance.now(), true)
    }

    function setPointer(x, y) {
        pointerActive = true
        pointer.x = clamp(x, 0, 1)
        pointer.y = clamp(y, 0, 1)
    }

    function clearPointer() {
        pointerActive = false
    }

    function nudge(dx, dy) {
        pointerActive = true
        pointer.x = clamp(pointer.x + dx, 0, 1)
        pointer.y = clamp(pointer.y + dy, 0, 1)
        draw(performance.now(), true)
    }

    function reset() {
        ambientPhaseX = random() * Math.PI * 2
        ambientPhaseY = random() * Math.PI * 2
        ambientBaseX = 0.18 + random() * 0.16
        ambientBaseY = 0.08 + random() * 0.18
        pointerActive = false
        lastC0 = [9999, 9999]
        draw(performance.now(), true)
    }

    function renderStatic() {
        draw(performance.now(), true)
    }

    function start() {
        if(reduceMotion) {
            draw(performance.now(), true)
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
        setPointer,
        clearPointer,
        nudge
    }
}
