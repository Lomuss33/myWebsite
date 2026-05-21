function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(`Shader compile failed: ${gl.getShaderInfoLog(shader) || "unknown error"}`)
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
    if(location == null) throw new Error(`Cannot find uniform ${name}.`)
    return location
}

const vertexSource = `#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

in vec2 position;

void main(void) {
    gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentSource = `#version 300 es
/*
 * made by Matthias Hurrle (@atzedent)
 */

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 touch;
uniform int pointerCount;

out vec4 fragColor;

#define PI 3.14159
#define TAU 6.28318
#define THETA 1.57079
#define T (17.0+time)
#define mouse (touch/resolution)
#define hue(a) (0.25+0.4*cos((a)*11.3+vec3(0,83,21)))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

void main(void) {
    float mn = min(resolution.x, resolution.y);
    vec2 uv = (
        gl_FragCoord.xy - 0.5 * resolution
    ) / mn;

    vec3 col = vec3(0.0),
    lp = vec3(9.0,5.0,2.0),
    rp = vec3(9.0,6.0,7.0),
    ro = vec3(0.7,0.9,3.0),
    rd = normalize(vec3(uv, 1.0)),
    ax = normalize(vec3(8.0,-3.0,-5.0)),
    p;

    float g = 0.0, angle = sin(T * 0.1) * PI;

    if(pointerCount > 0) {
        ax = normalize(vec3(1.0,-5.0,5.0));
        ax.xz *= rot(mouse.x * TAU);
        angle = mouse.y * PI;
    } else {
        ax.xz *= rot(T * 0.05);
    }

    for(float i = 1.0; i < 40.0; i++) {
        p = g * rd - ro;
        p = mix(
            dot(p, ax) * ax,
            p,
            cos(angle)
        ) * THETA - cross(p, ax);
        float d = 1.0, e = 0.0;

        for(float j = 0.0; j < 16.0; j++) {
            p = lp - abs(p - rp);
            e = 9.0 / clamp(dot(p,p), 0.0, 16.0);
            d *= e * 1.01;
            p = abs(p) * e;
        }

        e = p.y / d;
        e += 3e-4;
        g += e * 0.5;

        col += mix(
            vec3(1.0),
            hue(-log(d) * 0.25),
            0.75
        ) / e * 5e-5;
    }

    col = 1.0 - exp(-col * 1.8);
    col = pow(col, vec3(1.45));
    vec2 z = (gl_FragCoord.xy - 0.5 * resolution.xy) / mn;
    col *= 1.0 - dot(z, z);

    fragColor = vec4(col, 1.0);
}
`

export function createDeepShaderEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const gl = canvas.getContext("webgl2", {
        alpha: false,
        antialias: true,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance"
    })
    if(!gl) throw new Error("WebGL2 not available")

    let running = false
    let rafId = null
    let runTime = 0
    let prevT = performance.now()
    let pointer = { x: 0.5, y: 0.5 }
    let pointerActive = false
    let width = 1
    let height = 1

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(`Program link failed: ${gl.getProgramInfoLog(program) || "unknown error"}`)
    }
    gl.useProgram(program)

    const vertexData = new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0
    ])

    const vertexDataBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)

    const positionHandle = getAttribLocation(gl, program, "position")
    gl.enableVertexAttribArray(positionHandle)
    gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 0, 0)

    const timeHandle = getUniformLocation(gl, program, "time")
    const touchHandle = getUniformLocation(gl, program, "touch")
    const pointerCountHandle = getUniformLocation(gl, program, "pointerCount")
    const resolutionHandle = getUniformLocation(gl, program, "resolution")

    function drawFrame(nowMs = performance.now()) {
        const dt = Math.min(nowMs - prevT, 100)
        prevT = nowMs
        if(!reduceMotion || runTime === 0) {
            runTime += dt * 0.001
        }

        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.useProgram(program)
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer)

        gl.uniform1f(timeHandle, runTime)
        gl.uniform2f(touchHandle, pointer.x * width, (1 - pointer.y) * height)
        gl.uniform1i(pointerCountHandle, pointerActive ? 1 : 0)
        gl.uniform2f(resolutionHandle, width, height)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    function tick() {
        if(!running) return
        drawFrame(performance.now())
        rafId = requestAnimationFrame(tick)
    }

    function setSize(nextWidth, nextHeight, devicePixelRatio = 1) {
        const cssWidth = Math.max(1, Math.floor(nextWidth || 1))
        const cssHeight = Math.max(1, Math.floor(nextHeight || 1))
        const dpr = Math.max(0.5, Math.min(Number(devicePixelRatio) || 1, 1.5))

        width = Math.floor(cssWidth * dpr)
        height = Math.floor(cssHeight * dpr)
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
        drawFrame()
    }

    function setPointer(x, y) {
        pointer = {
            x: clamp(x, 0, 1),
            y: clamp(y, 0, 1)
        }
        pointerActive = true
        if(!running) drawFrame()
    }

    function clearPointer() {
        pointerActive = false
        pointer = { x: 0.5, y: 0.5 }
        if(!running) drawFrame()
    }

    function renderStatic() {
        drawFrame()
    }

    function start() {
        if(reduceMotion) {
            drawFrame()
            return
        }
        if(running) return
        running = true
        prevT = performance.now()
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function destroy() {
        stop()
        gl.deleteBuffer(vertexDataBuffer)
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
    }

    return {
        setSize,
        setPointer,
        clearPointer,
        renderStatic,
        start,
        stop,
        destroy
    }
}
