import * as THREE from "three"

const VERTEX_SHADER_SOURCE = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform bool u_complex;

const int octaves = 6;
const float seed = 43758.5453123;
const float seed2 = 73156.8473192;

vec2 random2(vec2 st, float seed){
    st = vec2(dot(st, vec2(127.1,311.7)), dot(st, vec2(269.5,183.3)));
    return -1.0 + 2.0 * fract(sin(st) * seed);
}

float noise(vec2 st, float seed) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
        mix(dot(random2(i + vec2(0.0,0.0), seed), f - vec2(0.0,0.0)),
            dot(random2(i + vec2(1.0,0.0), seed), f - vec2(1.0,0.0)), u.x),
        mix(dot(random2(i + vec2(0.0,1.0), seed), f - vec2(0.0,1.0)),
            dot(random2(i + vec2(1.0,1.0), seed), f - vec2(1.0,1.0)), u.x),
        u.y
    );
}

float fbm1(in vec2 _st, float seed) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < octaves; ++i) {
        v += a * noise(_st, seed);
        _st = rot * _st * 2.0 + shift;
        a *= 0.4;
    }
    return v;
}

float pattern(vec2 uv, float seed, float time, inout vec2 q, inout vec2 r) {
    q = vec2(fbm1(uv * .1 + vec2(0.0,0.0), seed), fbm1(uv + vec2(5.2,1.3), seed));
    r = vec2(fbm1(uv * .1 + 4.0 * q + vec2(1.7 - time / 2., 9.2), seed),
             fbm1(uv + 4.0 * q + vec2(8.3 - time / 2., 2.8), seed));
    vec2 s = vec2(fbm1(uv + 5.0 * r + vec2(21.7 - time / 2., 90.2), seed),
                  fbm1(uv * .05 + 5.0 * r + vec2(80.3 - time / 2., 20.8), seed));
    return fbm1(uv * .05 + 4.0 * s, seed);
}

float pattern2(vec2 uv, float seed, float time, inout vec2 q, inout vec2 r) {
    q = vec2(fbm1(uv + vec2(0.0,0.0), seed), fbm1(uv + vec2(5.2,1.3), seed));
    r = vec2(fbm1(uv + 4.0 * q + vec2(1.7 - time / 2., 9.2), seed),
             fbm1(uv + 4.0 * q + vec2(8.3 - time / 2., 2.8), seed));
    vec2 s = vec2(fbm1(uv + 5.0 * r + vec2(21.7 - time / 2., 90.2), seed),
                  fbm1(uv + 5.0 * r + vec2(80.3 - time / 2., 20.8), seed));
    vec2 t = vec2(fbm1(uv + 4.0 * s + vec2(121.7 - time / 2., 190.2), seed),
                  fbm1(uv + 4.0 * s + vec2(180.3 - time / 2., 120.8), seed));
    vec2 u = vec2(fbm1(uv + 3.0 * t + vec2(221.7 - time / 2., 290.2), seed),
                  fbm1(uv + 3.0 * t + vec2(280.3 - time / 2., 220.8), seed));
    vec2 v = vec2(fbm1(uv + 2.0 * u + vec2(221.7 - time / 2., 290.2), seed),
                  fbm1(uv + 2.0 * u + vec2(280.3 - time / 2., 220.8), seed));
    return fbm1(uv + 4.0 * v, seed);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    float time = u_time / 10.0;
    mat2 rot = mat2(cos(time / 10.0), sin(time / 10.0), -sin(time / 10.0), cos(time / 10.0));
    uv = rot * uv;
    uv *= 0.9 * sin(u_time / 20.0) + 3.0;
    uv.x -= time / 5.0;

    vec2 q = vec2(0.0);
    vec2 r = vec2(0.0);
    float p = u_complex ? pattern2(uv, seed, time, q, r) : pattern(uv, seed, time, q, r);

    vec3 colour = vec3(p) * 2.0;
    colour.r -= dot(q, r) * 15.0;
    colour = mix(colour, vec3(pattern(r, seed2, time, q, r), dot(q, r) * 15.0, -0.1), 0.5);
    colour -= q.y * 1.5;
    colour = mix(colour, vec3(0.2, 0.2, 0.2), clamp(q.x, -1.0, 0.0) * 3.0);

    gl_FragColor = vec4(-colour + (abs(colour) * 0.5), 1.0);
}
`

export function createSoupShaderEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)

    let renderer = null
    let camera = null
    let scene = null
    let material = null
    let mesh = null
    let running = false
    let rafId = null
    let mouseX = 0.5
    let mouseY = 0.5
    let timeValue = 2001.0
    let held = false
    let holdMix = 0
    let lastFrameMs = 0

    function setup() {
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        })
        renderer.setClearColor(0x000000, 1)
        renderer.outputColorSpace = THREE.SRGBColorSpace

        camera = new THREE.Camera()
        camera.position.z = 1
        scene = new THREE.Scene()

        const geometry = new THREE.PlaneGeometry(2, 2)
        material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { value: timeValue },
                u_resolution: { value: new THREE.Vector2(1, 1) },
                u_mouse: { value: new THREE.Vector2(0, 0) },
                u_complex: { value: false }
            },
            vertexShader: VERTEX_SHADER_SOURCE,
            fragmentShader: FRAGMENT_SHADER_SOURCE
        })

        mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
    }

    function renderFrame(nowMs = performance.now()) {
        if(!renderer) setup()
        if(lastFrameMs <= 0) lastFrameMs = nowMs
        const dt = Math.min(50, Math.max(0, nowMs - lastFrameMs))
        lastFrameMs = nowMs

        if(held) {
            holdMix = Math.min(1, holdMix + dt / 2400)
        }
        else {
            holdMix = Math.max(0, holdMix - dt / 1800)
        }

        const easedHoldMix = holdMix * holdMix * (3 - 2 * holdMix)
        const ambientSpeed = 0.05 * (1 + mouseX * 5)
        const heldSpeed = 0.003 + mouseX * 0.004
        const speed = ambientSpeed + (heldSpeed - ambientSpeed) * easedHoldMix
        timeValue += reduceMotion ? speed * 0.15 : speed
        material.uniforms.u_time.value = timeValue
        material.uniforms.u_mouse.value.set(mouseX, mouseY)
        material.uniforms.u_complex.value = false
        renderer.render(scene, camera)
    }

    function tick() {
        if(!running) return
        renderFrame(performance.now())
        rafId = requestAnimationFrame(tick)
    }

    function setSize(width, height, devicePixelRatio = 1) {
        const w = Math.max(1, Math.floor(width || 1))
        const h = Math.max(1, Math.floor(height || 1))
        const dpr = Math.max(1, Number(devicePixelRatio) || 1)
        renderer.setPixelRatio(dpr)
        renderer.setSize(w, h, false)
        material.uniforms.u_resolution.value.set(renderer.domElement.width, renderer.domElement.height)
        renderFrame()
    }

    function setPointer(x, y) {
        mouseX = Math.max(0, Math.min(1, x))
        mouseY = Math.max(0, Math.min(1, y))
    }

    function clearPointer() {
        mouseX = 0.5
        mouseY = 0.5
    }

    function setHeld(nextHeld) {
        held = Boolean(nextHeld)
        if(!running) renderFrame(performance.now())
    }

    function reset() {
        timeValue = 2001.0
        held = false
        holdMix = 0
        lastFrameMs = 0
        mouseX = 0.5
        mouseY = 0.5
        renderFrame()
    }

    function renderStatic() {
        renderFrame()
    }

    function start() {
        if(reduceMotion) {
            renderFrame()
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
        mesh?.geometry?.dispose?.()
        material?.dispose?.()
        renderer?.dispose?.()
        scene = null
        camera = null
        material = null
        mesh = null
    }

    setup()

    return {
        start,
        stop,
        destroy,
        reset,
        renderStatic,
        setSize,
        setPointer,
        clearPointer,
        setHeld
    }
}
