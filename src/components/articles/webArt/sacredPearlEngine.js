import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import * as BGU from "three/addons/utils/BufferGeometryUtils.js"
import {SimplexNoise} from "three/addons/math/SimplexNoise.js"
import {LineSegmentsGeometry} from "three/addons/lines/LineSegmentsGeometry.js"
import {LineMaterial} from "three/addons/lines/LineMaterial.js"
import {LineSegments2} from "three/addons/lines/LineSegments2.js"
import {MeshSurfaceSampler} from "three/addons/math/MeshSurfaceSampler.js"

const NOISE_3D = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
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
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

const NOISE_4D = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

vec4 grad4(float j, vec4 ip){
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;
  p.xyz = floor(fract(vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz * 2.0 - 1.0) * s.www;
  return p;
}

float snoise(vec4 v){
  const vec2 C = vec2(0.138196601125010504, 0.309016994374947451);
  vec4 i = floor(v + dot(v, C.yyyy));
  vec4 x0 = v - i + dot(i, C.xxxx);
  vec4 i0;
  vec3 isX = step(x0.yzw, x0.xxx);
  vec3 isYZ = step(x0.zww, x0.yyz);
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;
  vec4 i3 = clamp(i0, 0.0, 1.0);
  vec4 i2 = clamp(i0 - 1.0, 0.0, 1.0);
  vec4 i1 = clamp(i0 - 2.0, 0.0, 1.0);
  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
  vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
  vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;
  i = mod(i, 289.0);
  float j0 = permute(permute(permute(permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute(permute(permute(permute(
    i.w + vec4(i1.w, i2.w, i3.w, 1.0))
    + i.z + vec4(i1.z, i2.z, i3.z, 1.0))
    + i.y + vec4(i1.y, i2.y, i3.y, 1.0))
    + i.x + vec4(i1.x, i2.x, i3.x, 1.0));
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0);
  vec4 p0 = grad4(j0, ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * (dot(m0*m0, vec3(dot(p0,x0), dot(p1,x1), dot(p2,x2))) + dot(m1*m1, vec2(dot(p3,x3), dot(p4,x4))));
}
`

const FBM = `
#define NUM_OCTAVES 5

float fbm(vec3 x) {
  float v = 0.0;
  float a = 0.5;
  vec3 shift = vec3(100.0);
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * snoise(x);
    x = x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}
`

const goldenAngle = 2.399963229728653

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function clampInt(value, min, max, fallback) {
    const n = Number(value)
    if(!Number.isFinite(n)) return fallback
    return Math.max(min, Math.min(max, Math.floor(n)))
}

function disposeMaterial(material) {
    if(!material) return
    const textureKeys = ["map", "normalMap", "alphaMap", "bumpMap", "roughnessMap", "metalnessMap", "emissiveMap", "envMap"]
    textureKeys.forEach((key) => material[key]?.dispose?.())
    Object.values(material.userData || {}).forEach((value) => value?.dispose?.())
    material.dispose?.()
}

function disposeObjectTree(root) {
    root?.traverse?.((obj) => {
        obj.geometry?.dispose?.()
        const material = obj.material
        if(Array.isArray(material)) material.forEach(disposeMaterial)
        else disposeMaterial(material)
    })
}

function makeCurveTexture(points) {
    const texture = new THREE.DataTexture(new Float32Array(points), points.length / 4, 1, THREE.RGBAFormat, THREE.FloatType)
    texture.wrapS = THREE.RepeatWrapping
    texture.minFilter = texture.magFilter = THREE.LinearFilter
    texture.needsUpdate = true
    return texture
}

class Vapourizing extends THREE.Points {
    constructor(amount, uniforms) {
        const baseCurveData = new THREE.Path()
            .moveTo(1, 0)
            .bezierCurveTo(1.5, 1, 0.25, 1, 0.05, 3)
            .getSpacedPoints(512)
            .map(p => [p.x, p.y - 0.5, 0, 0])
            .flat()
        const baseCurveTexture = makeCurveTexture(baseCurveData)
        const inits = []
        const geometry = new THREE.BufferGeometry().setFromPoints(Array.from({length: amount}, () => {
            inits.push(Math.random(), Math.random(), Math.random())
            return new THREE.Vector3()
        }))
        geometry.setAttribute("inits", new THREE.Float32BufferAttribute(inits, 3))

        const material = new THREE.PointsMaterial({
            size: 0.028,
            transparent: true,
            color: new THREE.Color(1, 0.75, 0.25),
            depthWrite: false,
            onBeforeCompile: shader => {
                shader.uniforms.time = uniforms.time
                shader.uniforms.curveTexture = { value: baseCurveTexture }
                shader.vertexShader = `
                    uniform float time;
                    uniform sampler2D curveTexture;
                    attribute vec3 inits;
                    varying float vOpacity;
                    varying float vBlur;
                    ${NOISE_3D}
                    ${shader.vertexShader}
                `.replace(
                    "#include <begin_vertex>",
                    `#include <begin_vertex>
                    float currentU = fract(inits.x + time * 0.08 * (inits.z * 0.9 + 0.1));
                    vec4 curveData = texture(curveTexture, vec2(currentU, 0.5));
                    float r = curveData.x + inits.z * 0.2 * curveData.y;
                    float a = inits.y * PI2;
                    float x = cos(a);
                    float y = curveData.y;
                    float z = sin(a);
                    float n = snoise(vec3(vec2(x, z) * r, (y * 0.25 - time * 0.08)));
                    n = (pow(abs(n), 0.75) * 0.25) * sign(n);
                    float sway = smoothstep(0.0, 0.5, currentU);
                    a += PI * 0.5 * n * sway;
                    x = cos(a) * r;
                    z = sin(a) * r;
                    transformed = vec3(x, y, z);
                    float of = 1.0 - sqrt(1.0 - (inits.z - 1.0) * inits.z);
                    vOpacity = smoothstep(0.0, 0.25, currentU) - smoothstep(0.5, 1.0 - of * 0.25, currentU);
                    vBlur = smoothstep(0.25, 1.0, currentU);`
                ).replace(
                    "gl_PointSize = size;",
                    "gl_PointSize = size * (1.0 + 3.0 * smoothstep(0.0, 1.0, currentU));"
                )
                shader.fragmentShader = `
                    varying float vOpacity;
                    varying float vBlur;
                    ${shader.fragmentShader}
                `.replace(
                    "vec4 diffuseColor = vec4( diffuse, opacity );",
                    `float dist = length(gl_PointCoord.xy - 0.5);
                    if (dist > 0.5) discard;
                    float fOpacity = 1.0 - smoothstep(0.25 - (0.25 * vBlur), 0.5, dist);
                    vec4 diffuseColor = vec4(diffuse, opacity * vOpacity * fOpacity);`
                )
            }
        })
        material.userData.curveTexture = baseCurveTexture
        super(geometry, material)
    }
}

class PetalLines {
    constructor() {
        this.points = []
        this.widths = []
        const desiredWidth = 2
        const desiredHeight = 2
        const curvesAmount = 24
        const curvePointsAmount = 9
        const ratioWidth = desiredWidth / curvesAmount
        const ratioHeight = desiredHeight / curvePointsAmount

        for(let curveIdx = 0; curveIdx < curvesAmount; curveIdx++) {
            const peripheralRatio = 1 - (Math.abs((curveIdx / (curvesAmount - 1)) - 0.5) / 0.5)
            const baseX = -(curvesAmount - 1) * 0.5 + curveIdx
            const curve = new THREE.CatmullRomCurve3(
                Array.from({length: curvePointsAmount}, (_, pointIdx) => new THREE.Vector3(
                    baseX + (Math.random() - 0.5) * 3,
                    pointIdx,
                    0
                ))
            )

            const circularF = (val) => 1 - Math.sqrt(1 - --val * val)
            const pointsMaxValue = 84
            const pointsMax = pointsMaxValue - Math.floor((pointsMaxValue * 0.75) * circularF(peripheralRatio))
            const points = []
            for(let i = 0; i < pointsMax; i++) points.push(curve.getPointAt(i / (pointsMaxValue - 1)))
            for(let i = 0; i < pointsMax - 1; i++) this.widths.push(((i / (pointsMax - 2)) ** 16) * 0.5 + 0.5)

            points.forEach(p => {
                p.x *= ratioWidth
                p.y *= ratioHeight
                if(p.y <= desiredHeight * 0.5) p.x *= THREE.MathUtils.smoothstep(p.y, 0, desiredHeight * 0.5)
                p.z += Math.pow(THREE.MathUtils.smoothstep(p.y, 0, desiredHeight), 4)
                const concavityR = 2
                p.z += concavityR - Math.sqrt((concavityR ** 2) - (p.x ** 2))
            })

            this.points.push(...points.map((p, pIdx) => {
                const retVal = [p.clone()]
                if(pIdx !== 0 && pIdx !== points.length - 1) retVal.push(p.clone())
                return retVal
            }).flat())
        }
    }
}

class Petals extends THREE.Group {
    constructor(amount, uniforms, lineMaterials) {
        super()
        const geometries = Array.from({length: amount}, (_, petalIdx) => {
            const petalRatio = amount <= 1 ? 0 : petalIdx / (amount - 1)
            const scale = 1 - 0.25 * petalRatio
            const petalsData = new PetalLines()
            const gPetal = new THREE.BufferGeometry()
                .setFromPoints(petalsData.points)
                .scale(scale, scale, scale)
                .rotateX(Math.PI * -0.5 + Math.PI * 0.1 * petalRatio)
                .translate(0, 0, -petalRatio * 0.2)
                .rotateY(goldenAngle * petalIdx)
            gPetal.setAttribute("widths", new THREE.Float32BufferAttribute(petalsData.widths, 1))
            return gPetal
        })
        const merged = BGU.mergeGeometries(geometries)?.translate(0, -0.9, 0)
        geometries.forEach(g => g.dispose())
        if(!merged) return

        const lineSegments = new THREE.LineSegments(merged)
        const fatGeometry = new LineSegmentsGeometry().fromLineSegments(lineSegments)
        fatGeometry.setAttribute("widths", new THREE.InstancedBufferAttribute(merged.attributes.widths.array, 1))
        const material = new LineMaterial({
            color: new THREE.Color(1, 0.375, 0),
            worldUnits: true,
            linewidth: 0.0375,
            transparent: true,
            onBeforeCompile: shader => {
                shader.uniforms.time = uniforms.time
                shader.vertexShader = `
                    uniform float time;
                    attribute float widths;
                    varying float vWidths;
                    varying vec2 vUv;
                    ${shader.vertexShader}
                `.replace(
                    "float hw = linewidth * 0.5;",
                    `float hw = linewidth * widths * 0.5;
                    vWidths = widths;
                    vUv = uv;`
                )
                shader.fragmentShader = `
                    varying float vWidths;
                    varying vec2 vUv;
                    ${shader.fragmentShader}
                `.replace(
                    "float norm = len / linewidth;",
                    "float norm = len / (linewidth * vWidths);"
                ).replace(
                    "vec4 diffuseColor = vec4( diffuse, alpha );",
                    `vec3 brightCol = vec3(1.0, 0.75, 0.25);
                    float fw = length(fwidth(vUv));
                    vec3 col = mix(diffuse, brightCol, 1.0 - smoothstep(0.0, fw, abs(vUv.x)));
                    col = mix(col, brightCol, smoothstep(0.95, 1.0, vWidths));
                    vec4 diffuseColor = vec4(col, alpha);`
                )
            }
        })
        lineMaterials.push(material)
        this.add(new LineSegments2(fatGeometry, material))
        merged.dispose()
    }
}

class Vegetation extends THREE.Group {
    constructor(hut, options, uniforms, simplex) {
        super()
        this.add(this.createRoots(options, simplex))
        this.add(this.createFlorals(hut, options, uniforms))
    }

    createRoots(options, simplex) {
        const rootsAmount = options.rootsAmount
        const aStep = (Math.PI * 2) / rootsAmount
        const axis = new THREE.Vector3(0, 1, 0)
        const roots = Array.from({length: rootsAmount}, (_, rootIdx) => {
            let aBase = goldenAngle * rootIdx
            let lBase = (Math.random() * 0.5 + 0.5) * 0.5
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3(),
                ...Array.from({length: Math.floor(Math.random() * 4) + 5}, () => {
                    aBase += (Math.random() - 0.5) * aStep
                    const v = new THREE.Vector3(1, 0, 0).applyAxisAngle(axis, aBase).setLength(lBase)
                    lBase += (Math.random() * 0.5 + 0.5) * 0.25
                    return v
                })
            ].map(v => v.setY(-1)))
            const tube = new THREE.TubeGeometry(curve, options.rootTubeSegments, 1, options.rootRadialSegments)
            const pos = tube.attributes.position
            const nor = tube.attributes.normal
            const uvs = tube.attributes.uv
            const p = new THREE.Vector3()
            const n = new THREE.Vector3()
            const u = new THREE.Vector2()
            for(let i = 0; i <= options.rootTubeSegments; i++) {
                for(let j = 0; j <= options.rootRadialSegments; j++) {
                    const idx = (options.rootRadialSegments + 1) * i + j
                    p.fromBufferAttribute(pos, idx)
                    n.fromBufferAttribute(nor, idx)
                    u.fromBufferAttribute(uvs, idx)
                    let uVal = 1 - u.x
                    const uF = Math.sqrt(1 - --uVal * uVal)
                    const nF = simplex.noise3d(p.x * 0.5, p.y * 0.5, p.z * 0.5) * 0.01
                    const shift = 0.05 * (uF + nF)
                    p.addScaledVector(n, -1).addScaledVector(n, shift)
                    p.y += shift
                    pos.setXYZ(idx, p.x, p.y, p.z)
                }
            }
            return tube
        })
        const merged = BGU.mergeGeometries(roots)
        roots.forEach(g => g.dispose())
        const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.375, 0) })
        material.defines = { USE_UV: "" }
        return new THREE.Mesh(merged, material)
    }

    createFlorals(hut, options, uniforms) {
        const sampler = new MeshSurfaceSampler(hut).build()
        const planeGeometries = Array.from({length: 5}, (_, gIdx) => {
            const g = new THREE.PlaneGeometry(2, 1, 1, 14).translate(0, 0.5, 0).rotateX(Math.PI * 0.5)
            g.setAttribute("geometryID", new THREE.Float32BufferAttribute(new Array(g.attributes.position.count).fill(gIdx), 1))
            return g
        })
        const geometry = BGU.mergeGeometries(planeGeometries)
        planeGeometries.forEach(g => g.dispose())
        const curveTexture = makeCurveTexture(new THREE.Path()
            .moveTo(0, 0)
            .bezierCurveTo(1, 0, -0.5, 1, 1.5, 1)
            .getSpacedPoints(255)
            .map(p => [p.x, p.y, 0, 0])
            .flat())
        const material = new THREE.MeshLambertMaterial({
            side: THREE.DoubleSide,
            forceSinglePass: true,
            onBeforeCompile: shader => {
                shader.uniforms.time = uniforms.time
                shader.uniforms.petalCurve = { value: curveTexture }
                shader.vertexShader = `
                    uniform float time;
                    uniform sampler2D petalCurve;
                    attribute float geometryID;
                    attribute vec4 floralRot;
                    varying float vDist;
                    mat2 rot(float a){return mat2(cos(a), -sin(a), sin(a), cos(a));}
                    float circular(float val){return 1.0 - sqrt(1.0 - val * val);}
                    ${NOISE_4D}
                    ${shader.vertexShader}
                `.replace(
                    "#include <begin_vertex>",
                    `#include <begin_vertex>
                    vec3 pos = position;
                    vec3 instPos = instanceMatrix[3].xyz;
                    vDist = length(instPos);
                    float growthRatio = snoise(vec4(instPos * 2.0, time * 0.08));
                    growthRatio = clamp(growthRatio, 0.0, 1.0) * 0.85 + 0.15;
                    float localGrowthRatio = uv.y * growthRatio;
                    vec4 petalCurveData = texture(petalCurve, vec2(localGrowthRatio, 0.5));
                    pos.x *= smoothstep(0.0, 0.5, uv.y) - circular(clamp((uv.y - 0.5), 0.0, 0.5) / 0.5);
                    pos.x *= localGrowthRatio;
                    pos.y = petalCurveData.y * 1.5;
                    pos.z = petalCurveData.x;
                    pos.xy *= rot((geometryID * (2.0 / 5.0) + floralRot.x) * PI);
                    transformed = pos;`
                )
                shader.fragmentShader = `
                    varying float vDist;
                    ${shader.fragmentShader}
                `.replace(
                    "#include <opaque_fragment>",
                    `#include <opaque_fragment>
                    vec3 mainCol = gl_FragColor.rgb;
                    vec3 baseCol = mix(vec3(0.75, 0.2, 0.0), vec3(1.0, 0.375, 0.0), smoothstep(0.0, 0.5, abs(vUv.y - 0.5)));
                    baseCol = mix(baseCol, vec3(0.5, 0.1, 0.0), sin(abs(vUv.x - 0.5) * PI2 * 2.0));
                    vec3 col = mix(gl_FragColor.rgb, baseCol, smoothstep(0.5, 1.0, vUv.y));
                    gl_FragColor.rgb = gl_FrontFacing ? baseCol : col;
                    gl_FragColor.rgb = mix(gl_FragColor.rgb * 0.875, mainCol, smoothstep(1.5, 2.75, vDist));`
                )
            }
        })
        material.defines = { USE_UV: "" }
        material.userData.curveTexture = curveTexture
        const florals = new THREE.InstancedMesh(geometry, material, options.floralPointCount)
        const pos = new THREE.Vector3()
        const nor = new THREE.Vector3()
        const dummy = new THREE.Object3D()
        const floralRot = []
        let accepted = 0
        let attempts = 0
        while(accepted < options.floralPointCount && attempts < options.floralPointCount * 8) {
            attempts++
            sampler.sample(pos, nor)
            const len = pos.length()
            if(len > 2.75 || len < 1.5) continue
            floralRot.push(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
            dummy.position.copy(pos)
            dummy.lookAt(pos.clone().addScaledVector(nor, -1))
            dummy.scale.setScalar(((Math.random() * 0.5 + 0.5) ** 1) * 0.1)
            dummy.updateMatrix()
            florals.setMatrixAt(accepted, dummy.matrix)
            accepted++
        }
        geometry.setAttribute("floralRot", new THREE.InstancedBufferAttribute(new Float32Array(floralRot), 4))
        return florals
    }
}

class Central extends THREE.Mesh {
    constructor(uniforms) {
        const material = new THREE.MeshBasicMaterial({
            color: "#000",
            onBeforeCompile: shader => {
                shader.uniforms.time = uniforms.time
                shader.vertexShader = `
                    varying vec3 vPos;
                    varying vec3 mvPos;
                    varying vec3 vNor;
                    ${shader.vertexShader}
                `.replace(
                    "#include <begin_vertex>",
                    `#include <begin_vertex>
                    vPos = position;
                    mvPos = -vec3(modelViewMatrix * vec4(position, 1.0));
                    vNor = normalMatrix * normal;`
                )
                shader.fragmentShader = `
                    uniform float time;
                    varying vec3 vPos;
                    varying vec3 mvPos;
                    varying vec3 vNor;
                    ${NOISE_3D}
                    ${FBM}
                    ${shader.fragmentShader}
                `.replace(
                    "#include <color_fragment>",
                    `#include <color_fragment>
                    vec3 baseCol = vec3(1.0, 0.375, 0.0);
                    vec3 col = vec3(0.0);
                    float fDot = dot(normalize(mvPos), normalize(vNor));
                    float pNoise = fbm(vPos * 0.5 - vec3(0.0, time * 0.05, 0.0));
                    pNoise = 1.0 - pow(abs(pNoise), 0.5);
                    pNoise = smoothstep(0.0, 0.95, pNoise);
                    pNoise = pow(pNoise, 4.0);
                    float fPattern = pNoise * smoothstep(0.0, 0.4, fDot);
                    col = mix(col, vec3(1.0, 0.75, 0.0), fPattern);
                    float haloF = smoothstep(-0.25, 0.4, fDot) - smoothstep(0.4, 0.95, fDot);
                    haloF = pow(haloF, 2.0);
                    col = mix(col, mix(baseCol, vec3(1.0, 0.75, 0.0), pow(smoothstep(0.5, 1.0, haloF), 2.0)), haloF);
                    float fN = snoise(vec3(vPos.xz * 3.0, time * 0.5)) * 0.1;
                    float colF = 1.0 - smoothstep(-0.7 + fN, 0.75, vPos.y);
                    colF = pow(colF, 0.75);
                    colF = 0.1 + colF * 0.9;
                    col = mix(col, baseCol, colF);
                    diffuseColor.rgb = col;`
                )
            }
        })
        material.defines = { USE_UV: "" }
        super(new THREE.SphereGeometry(0.75, 48, 24), material)
        this.position.y = -0.2
    }
}

class Hut extends THREE.Mesh {
    constructor(uniforms) {
        const geometry = new THREE.CylinderGeometry(3, 3, 6, 3, 1, true)
            .rotateX(Math.PI * 0.5)
            .rotateZ(Math.PI)
            .translate(0, 0.5, 0)
            .toNonIndexed()
        geometry.computeVertexNormals()
        const material = new THREE.MeshLambertMaterial({
            color: "#fff",
            side: THREE.BackSide,
            normalMap: new THREE.Texture(),
            normalScale: new THREE.Vector2().setScalar(0.25),
            onBeforeCompile: shader => {
                shader.uniforms.time = uniforms.time
                shader.fragmentShader = `
                    uniform float time;
                    ${NOISE_3D}
                    float getNoise(vec2 p){
                        return snoise(vec3(p, time * 0.4));
                    }
                    ${shader.fragmentShader}
                `.replace(
                    "#include <normal_fragment_maps>",
                    `vec2 nMapUv = vNormalMapUv.xy * vec2(PI, 1.0) * 10.0;
                    vec3 mapN = vec3(getNoise(nMapUv), getNoise(nMapUv + 100.0), 1.0);
                    mapN = normalize(mapN);
                    mapN.xy *= normalScale;
                    normal = normalize(tbn * mapN);`
                )
            }
        })
        super(geometry, material)
    }
}

class Sketch extends THREE.Group {
    constructor(options, uniforms, lineMaterials, simplex) {
        super()
        const pointLight = new THREE.PointLight(0xff8800, 5, 3, 4)
        pointLight.position.set(0, -0.25, 0)
        this.add(pointLight)
        this.add(new THREE.AmbientLight(0xff8800, 0.1))
        this.add(new THREE.Mesh(
            new THREE.SphereGeometry(200, 24, 12),
            new THREE.MeshLambertMaterial({ color: "#fff", side: THREE.BackSide })
        ))

        const hut = new Hut(uniforms)
        this.add(hut)
        this.add(new Central(uniforms))
        this.add(new Vapourizing(options.vaporParticleCount, uniforms))
        this.add(new Vegetation(hut, options, uniforms, simplex))
        this.add(new Petals(options.petalLayerCount, uniforms, lineMaterials))
    }
}

export function createSacredPearlEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const config = {
        vaporParticleCount: clampInt(options.vaporParticleCount, 200, 5000, 1800),
        floralPointCount: clampInt(options.floralPointCount, 200, 5000, 1600),
        petalLayerCount: clampInt(options.petalLayerCount, 3, 12, 7),
        rootsAmount: clampInt(options.rootsAmount, 4, 24, 12),
        rootTubeSegments: clampInt(options.rootTubeSegments, 24, 150, 70),
        rootRadialSegments: clampInt(options.rootRadialSegments, 4, 16, 7),
        maxPixelRatio: Number.isFinite(options.maxPixelRatio) ? clamp(options.maxPixelRatio, 1, 2) : 1.25
    }
    const uniforms = {
        time: { value: 0 },
        timeDelta: { value: 0 }
    }

    let renderer = null
    let scene = null
    let camera = null
    let controls = null
    let sketch = null
    let running = false
    let rafId = null
    let lastFrameMs = 0
    let width = 1
    let height = 1
    let elapsed = 0
    let interactionEnabled = true
    let lineMaterials = []
    let simplex = null

    function setup() {
        if(renderer) return

        simplex = new SimplexNoise()
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        })
        renderer.setClearColor(0xffffff, 1)
        renderer.outputColorSpace = THREE.SRGBColorSpace

        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
        camera.position.set(0, 0.25, 1).setLength(4)

        controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true
        controls.enablePan = false
        controls.minDistance = 3
        controls.maxDistance = 6
        controls.maxPolarAngle = Math.PI * 0.5
        controls.enabled = interactionEnabled

        sketch = new Sketch(config, uniforms, lineMaterials, simplex)
        scene.add(sketch)
    }

    function renderFrame() {
        if(!renderer || !scene || !camera) return
        lineMaterials.forEach((material) => {
            material.resolution.set(width, height)
        })
        controls?.update()
        renderer.render(scene, camera)
    }

    function tick(nowMs) {
        if(!running) return
        if(lastFrameMs <= 0) lastFrameMs = nowMs
        const dt = Math.min(0.05, Math.max(0.001, (nowMs - lastFrameMs) / 1000))
        lastFrameMs = nowMs
        elapsed += dt
        uniforms.time.value = elapsed
        uniforms.timeDelta.value = dt
        renderFrame()
        rafId = requestAnimationFrame(tick)
    }

    function setSize(w, h, devicePixelRatio = 1) {
        width = Math.max(1, Math.floor(w || 1))
        height = Math.max(1, Math.floor(h || 1))
        const dpr = clamp(Number(devicePixelRatio) || 1, 1, config.maxPixelRatio)
        setup()
        renderer.setPixelRatio(dpr)
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderFrame()
    }

    function start() {
        setup()
        if(reduceMotion) {
            renderFrame()
            return
        }
        if(running) return
        running = true
        lastFrameMs = 0
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        lastFrameMs = 0
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function reset() {
        setup()
        stop()
        elapsed = 0
        uniforms.time.value = 0
        uniforms.timeDelta.value = 0
        camera.position.set(0, 0.25, 1).setLength(4)
        controls?.target.set(0, 0, 0)
        renderFrame()
    }

    function setInteractionEnabled(enabled) {
        interactionEnabled = Boolean(enabled)
        if(controls) controls.enabled = interactionEnabled
    }

    function destroy() {
        stop()
        controls?.dispose?.()
        disposeObjectTree(scene)
        lineMaterials = []
        renderer?.dispose?.()
        renderer = null
        scene = null
        camera = null
        controls = null
        sketch = null
        simplex = null
    }

    return {
        start,
        stop,
        reset,
        destroy,
        setSize,
        setInteractionEnabled
    }
}
