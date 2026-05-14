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
precision mediump float;
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentSource = `#version 300 es
precision mediump float;

out vec4 fragColor;

#define PI 3.14159265358979323846

uniform float width;
uniform float height;
uniform float time;
uniform float scale;
uniform int pattern;
uniform vec3 hueTb[15];

vec2 resolution;

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2  C = vec2(1.0/6.0, 1.0/3.0);
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main(){
  resolution = vec2(width, height);
  vec2 uv = (gl_FragCoord.xy - resolution / 2.0) / min(resolution.x, resolution.y);
  vec3 hue = vec3(0.0);

  float light = (snoise(vec3(uv * scale, time)) + 1.0) / 2.0;
  light = 15.0 * light;

  hue = hueTb[int(floor(light))];
  switch (pattern) {
    case 0: light = 1.0; break;
    case 1: light = (1.0 - cos(light * 2.0 * PI)) * 0.5; break;
    case 2: if (fract(light) < 0.3) light = 1.0; else light = 0.0; break;
  }

  fragColor = vec4(light * hue, 1.0);
}
`

export function createNoiceShaderEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const gl = canvas.getContext("webgl2", {
        alpha: false,
        antialias: true,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false
    })
    if(!gl) throw new Error("WebGL2 not available")

    let width = 1
    let height = 1
    let running = false
    let rafId = null
    let runTime = 0
    let prevT = performance.now()
    let mousePos = { x: 0.5, y: 0.5 }
    let firstRun = true
    let pattern = -1
    let hueTb = new Float32Array(45)

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
        -1.0, 1.0,
        -1.0, -1.0,
        1.0, 1.0,
        1.0, -1.0
    ])

    const vertexDataBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)

    const positionHandle = getAttribLocation(gl, program, "position")
    gl.enableVertexAttribArray(positionHandle)
    gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 2 * 4, 0)

    const widthHandle = getUniformLocation(gl, program, "width")
    const heightHandle = getUniformLocation(gl, program, "height")
    const timeHandle = getUniformLocation(gl, program, "time")
    const scaleHandle = getUniformLocation(gl, program, "scale")
    const patternHandle = getUniformLocation(gl, program, "pattern")
    const hueTbHandle = getUniformLocation(gl, program, "hueTb")

    function returnSat() {
        const col = [0, 1, Math.random()]
        let k = Math.floor(3 * Math.random())
        ;[col[2], col[k]] = [col[k], col[2]]
        k = Math.floor(2 * Math.random())
        ;[col[1], col[k]] = [col[k], col[1]]
        return col
    }

    function setHueTb(nextPattern) {
        hueTb = new Float32Array(45)
        let colPatt
        let limit
        do {
            colPatt = Math.floor(4 * Math.random())
            limit = Math.random() > 0.5
            if(firstRun) {
                colPatt = 0
                limit = true
            }
        } while(nextPattern === 0 && (colPatt === 0 || colPatt === 2) && !limit)

        switch(colPatt) {
            case 0:
                hueTb.fill(1)
                break
            case 1:
                for(let k = 0; k < 45; k++) hueTb[k] = (Math.floor(k / 3) & 1)
                break
            case 2: {
                const col = returnSat()
                for(let k = 0; k < 15; k++) {
                    hueTb[3 * k] = col[0]
                    hueTb[3 * k + 1] = col[1]
                    hueTb[3 * k + 2] = col[2]
                }
                break
            }
            case 3:
                for(let k = 0; k < 15; k++) {
                    const col = returnSat()
                    hueTb[3 * k] = col[0]
                    hueTb[3 * k + 1] = col[1]
                    hueTb[3 * k + 2] = col[2]
                }
                break
        }

        if(limit) {
            for(let k = 0; k < 45; k++) {
                if(Math.floor(k / 3) < 7 || Math.floor(k / 3) >= 10) hueTb[k] = 0
            }
        }

        gl.uniform3fv(hueTbHandle, hueTb)
    }

    function setScale() {
        gl.uniform1f(scaleHandle, 1.0 + 6 * (1 - mousePos.x))
    }

    function changePattern() {
        pattern = (pattern + 1) % 3
        if(firstRun) pattern = 1
        gl.uniform1i(patternHandle, pattern)
        setHueTb(pattern)
        firstRun = false
    }

    function drawFrame() {
        const nt = performance.now()
        const dt = Math.min(nt - prevT, 100)
        prevT = nt
        runTime += dt * 0.001 * mousePos.y
        gl.uniform1f(timeHandle, runTime)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    function tick() {
        if(!running) return
        drawFrame()
        rafId = requestAnimationFrame(tick)
    }

    function setSize(nextWidth, nextHeight, devicePixelRatio = 1) {
        width = Math.max(1, Math.floor(nextWidth || 1))
        height = Math.max(1, Math.floor(nextHeight || 1))
        const dpr = Math.max(1, Math.min(Number(devicePixelRatio) || 1, 2))

        canvas.width = Math.floor(width * dpr)
        canvas.height = Math.floor(height * dpr)
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.uniform1f(widthHandle, canvas.width)
        gl.uniform1f(heightHandle, canvas.height)
        drawFrame()
    }

    function setPointer(x, y) {
        mousePos = {
            x: clamp(x, 0, 1),
            y: clamp(y, 0, 1)
        }
        setScale()
        if(!running) drawFrame()
    }

    function clearPointer() {
        mousePos = { x: 0.5, y: 0.5 }
        setScale()
        if(!running) drawFrame()
    }

    function pulsePattern() {
        changePattern()
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
        if(vertexDataBuffer) gl.deleteBuffer(vertexDataBuffer)
        if(program) gl.deleteProgram(program)
        if(vertexShader) gl.deleteShader(vertexShader)
        if(fragmentShader) gl.deleteShader(fragmentShader)
    }

    gl.clearColor(0, 0, 0, 1)
    gl.uniform1f(widthHandle, width)
    gl.uniform1f(heightHandle, height)
    setScale()
    changePattern()

    return {
        setSize,
        setPointer,
        clearPointer,
        pulsePattern,
        renderStatic,
        start,
        stop,
        destroy
    }
}
