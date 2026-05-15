import * as THREE from "three"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

export function createAndroidBackgroundEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)

    let scene = null
    let camera = null
    let renderer = null
    let composer = null
    let material = null
    let mesh = null
    let rafId = null
    let running = false
    let width = 1
    let height = 1

    const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
        }
    `

    const fragmentShader = `
        uniform vec3 resolution;
        uniform float time;
        varying vec2 vUv;
        void main() {
            vec2 r_xy = resolution.xy;
            float t = time * 0.7;
            vec2 uv = (gl_FragCoord.xy - 0.5 * r_xy) / r_xy.y;
            vec3 rd = normalize(vec3(uv, 1.0));
            float z = 0.0;
            vec4 o = vec4(0.0);
            for (float i = 0.0; i < 90.0; i++) {
                vec3 p = z * rd;
                p.z += t * 8.0;
                float angle = atan(p.y, p.x);
                float radius = length(p.xy);
                p.x += 0.4 * cos(p.z * 0.2 + radius * 0.6);
                p.y += 0.4 * sin(p.z * 0.2 + radius * 0.6);
                p.x += 0.25 * sin(angle * 9.0 + p.z * 0.4);
                p.y += 0.25 * cos(angle * 9.0 + p.z * 0.4);
                p.x += 0.1 * sin(angle * 20.0 + p.z * 1.0);
                p.y += 0.1 * cos(angle * 20.0 + p.z * 1.0);
                angle = atan(p.y, p.x);
                radius = length(p.xy);
                float d = abs(radius - (1.3 + 0.1 * sin(angle * 6.0 + p.z * 0.1)));
                d += 0.25 * abs(sin(radius * 5.0 - p.z * 0.4 - t * 4.0));
                d += 0.1 * abs(sin(radius * 15.0 - p.z * 1.0 - t * 3.0));
                d = pow(d, 2.2);
                d = max(0.01, d);
                vec3 col = 0.5 + 0.5 * cos(z * 0.15 - t * 2.5 + vec3(0.0, 2.1, 4.2));
                float shade = 0.6 + 0.4 * (p.y / max(0.01, radius));
                col *= shade;
                o += vec4(col, 1.0) / (d * 50.0);
                z += d;
                if (z > 100.0 || o.x > 5.0) break;
            }
            o = tanh(o / 22.0);
            gl_FragColor = vec4(o.rgb, 1.0);
        }
    `

    function setup() {
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        })
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.setClearColor(0x000000, 1)
        renderer.setPixelRatio(1)

        scene = new THREE.Scene()
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
        material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                resolution: { value: new THREE.Vector3(1, 1, 1) }
            },
            vertexShader,
            fragmentShader
        })
        mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
        scene.add(mesh)

        composer = new EffectComposer(renderer)
        composer.addPass(new RenderPass(scene, camera))
        composer.addPass(new UnrealBloomPass(
            new THREE.Vector2(1, 1),
            1.5,
            0.8,
            0.5
        ))
    }

    function renderFrame(now = performance.now()) {
        if(!renderer) setup()
        if(!material || !composer) return

        material.uniforms.time.value = reduceMotion ? 0 : now * 0.001
        material.uniforms.resolution.value.set(width, height, 1)
        composer.render()
    }

    function tick(now) {
        if(!running) return
        renderFrame(now)
        rafId = requestAnimationFrame(tick)
    }

    function setSize(nextWidth, nextHeight, devicePixelRatio = 1) {
        width = Math.max(1, Math.floor(nextWidth || 1))
        height = Math.max(1, Math.floor(nextHeight || 1))
        if(!renderer || !composer) setup()
        const dpr = clamp(Number(devicePixelRatio) || 1, 1, 2)
        renderer.setPixelRatio(dpr)
        renderer.setSize(width, height, false)
        composer.setSize(width, height)
        material.uniforms.resolution.value.set(width, height, 1)
        renderFrame()
    }

    function start() {
        if(running) return
        if(reduceMotion) {
            renderFrame()
            return
        }
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
        mesh?.material?.dispose?.()
        composer?.dispose?.()
        renderer?.dispose?.()
        material = null
        mesh = null
        composer = null
        renderer = null
        scene = null
        camera = null
    }

    return {
        start,
        stop,
        destroy,
        renderStatic: renderFrame,
        setSize
    }
}
