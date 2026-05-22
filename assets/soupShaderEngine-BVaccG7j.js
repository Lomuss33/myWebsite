import{W as B,S as N,ah as X,a as j,z as Y,ab as O,p as w,d as T}from"./three-Dyw0HQ4s.js";const U=`
void main() {
    gl_Position = vec4(position, 1.0);
}
`,V=`
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform bool u_complex;

const int octaves = 6;
const int cubeCount = 28;
const int dotsPerEdge = 8;
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

vec3 rotateX(vec3 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec3(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
}

vec3 rotateY(vec3 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
}

vec3 rotateZ(vec3 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec3(c * p.x - s * p.y, s * p.x + c * p.y, p.z);
}

float cubicBezier(float x) {
    float t = x;

    for(int i = 0; i < 6; i++) {
        float inv = 1.0 - t;
        float currentX = 3.0 * inv * inv * t * 0.5 + 3.0 * inv * t * t * 0.25 + t * t * t;
        float derivativeX = 3.0 * inv * inv * 0.5 + 6.0 * inv * t * (0.25 - 0.5) + 3.0 * t * t * (1.0 - 0.25);
        t -= (currentX - x) / max(derivativeX, 0.0001);
        t = clamp(t, 0.0, 1.0);
    }

    float inv = 1.0 - t;
    return 3.0 * inv * inv * t * -1.0 + 3.0 * inv * t * t * -1.0 + t * t * t;
}

vec3 rotateOriginalCube(vec3 p, float phase) {
    float local = phase;
    float rotY = 0.78539816339;
    float rotZ = 0.0;

    if(local < 0.5) {
        float k = cubicBezier(local * 2.0);
        rotY = mix(0.78539816339, 3.92699081699, k);
    }
    else {
        float k = cubicBezier((local - 0.5) * 2.0);
        rotY = mix(3.92699081699, 0.0, k);
        rotZ = mix(0.0, 1.57079632679, k);
    }

    p = rotateZ(p, rotZ);
    p = rotateY(p, rotY);
    p = rotateX(p, -1.57079632679);
    return p;
}

vec2 projectCubePoint(vec3 p, float size, float phase) {
    p = rotateOriginalCube(p, phase) * size;
    float perspective = 2.4 / max(0.4, 2.4 - p.z);
    return p.xy * perspective;
}

vec3 rotatedNormal(vec3 n, float phase) {
    return normalize(rotateOriginalCube(n, phase));
}

float dotCircle(vec2 p, vec2 center, float radius) {
    float dist = length(p - center);
    return 1.0 - smoothstep(radius, radius * 1.55, dist);
}

float cross2(vec2 a, vec2 b) {
    return a.x * b.y - a.y * b.x;
}

float softHalfPlane(vec2 p, vec2 a, vec2 b, float side, float feather) {
    float edgeLength = max(length(b - a), 0.0001);
    float dist = cross2(b - a, p - a) * side / edgeLength;
    return smoothstep(-feather, feather, dist);
}

float quadMask(vec2 p, vec2 a, vec2 b, vec2 c, vec2 d, float feather) {
    float winding = cross2(b - a, d - a);
    float side = mix(-1.0, 1.0, step(0.0, winding));

    return softHalfPlane(p, a, b, side, feather)
         * softHalfPlane(p, b, c, side, feather)
         * softHalfPlane(p, c, d, side, feather)
         * softHalfPlane(p, d, a, side, feather);
}

float dottedEdge(vec2 p, vec3 a, vec3 b, float size, float phase, float radius) {
    vec2 pa = projectCubePoint(a, size, phase);
    vec2 pb = projectCubePoint(b, size, phase);
    float edge = 0.0;

    for(int i = 0; i < dotsPerEdge; i++) {
        float t = (float(i) + 0.5) / float(dotsPerEdge);
        edge = max(edge, dotCircle(p, mix(pa, pb, t), radius));
    }

    return edge;
}

vec3 dottedFace(vec2 p, vec3 a, vec3 b, vec3 c, vec3 d, vec3 normal, float size, float phase, float radius) {
    vec3 faceNormal = rotatedNormal(normal, phase);
    float visible = smoothstep(-0.02, 0.12, faceNormal.z);
    float light = clamp(dot(faceNormal, normalize(vec3(-0.42, -0.58, 0.82))) * 0.5 + 0.5, 0.0, 1.0);
    float facing = smoothstep(-0.02, 0.92, faceNormal.z);
    float shade = mix(0.12, 1.0, pow(light, 2.15)) * mix(0.22, 1.0, pow(facing, 1.35));

    vec2 pa = projectCubePoint(a, size, phase);
    vec2 pb = projectCubePoint(b, size, phase);
    vec2 pc = projectCubePoint(c, size, phase);
    vec2 pd = projectCubePoint(d, size, phase);
    float fill = quadMask(p, pa, pb, pc, pd, max(radius * 0.75, 0.00035)) * visible;
    float face = 0.0;

    face = max(face, dottedEdge(p, a, b, size, phase, radius));
    face = max(face, dottedEdge(p, b, c, size, phase, radius));
    face = max(face, dottedEdge(p, c, d, size, phase, radius));
    face = max(face, dottedEdge(p, d, a, size, phase, radius));

    return vec3(face * visible, face * visible * shade, fill);
}

vec3 cubeMask(vec2 p, float uTime) {
    vec3 mask = vec3(0.0);

    for(int i = 0; i < cubeCount; i++) {
        float fi = float(i);
        float depth = (fi + 1.0) / float(cubeCount);
        float size = (fi + 1.0) * 0.02835;
        float delay = (fi + 1.0) * 0.06;
        float phase = uTime < delay ? 0.0 : fract((uTime - delay) / 7.5);
        float radius = size * 0.029;
        float depthFade = mix(0.045, 1.0, pow(depth, 0.82));
        vec3 cube = vec3(0.0);

        cube = max(cube, dottedFace(p, vec3(-0.5, -0.5, 0.5), vec3(0.5, -0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(-0.5, 0.5, 0.5), vec3(0.0, 0.0, 1.0), size, phase, radius));
        cube = max(cube, dottedFace(p, vec3(0.5, -0.5, 0.5), vec3(0.5, -0.5, -0.5), vec3(0.5, 0.5, -0.5), vec3(0.5, 0.5, 0.5), vec3(1.0, 0.0, 0.0), size, phase, radius));
        cube = max(cube, dottedFace(p, vec3(0.5, -0.5, -0.5), vec3(-0.5, -0.5, -0.5), vec3(-0.5, 0.5, -0.5), vec3(0.5, 0.5, -0.5), vec3(0.0, 0.0, -1.0), size, phase, radius));
        cube = max(cube, dottedFace(p, vec3(-0.5, -0.5, -0.5), vec3(-0.5, -0.5, 0.5), vec3(-0.5, 0.5, 0.5), vec3(-0.5, 0.5, -0.5), vec3(-1.0, 0.0, 0.0), size, phase, radius));
        cube = max(cube, dottedFace(p, vec3(-0.5, -0.5, -0.5), vec3(0.5, -0.5, -0.5), vec3(0.5, -0.5, 0.5), vec3(-0.5, -0.5, 0.5), vec3(0.0, -1.0, 0.0), size, phase, radius));
        cube = max(cube, dottedFace(p, vec3(-0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, -0.5), vec3(-0.5, 0.5, -0.5), vec3(0.0, 1.0, 0.0), size, phase, radius));

        mask = max(mask, cube * vec3(depthFade, depthFade, depthFade * 0.92));
    }

    return clamp(mask, 0.0, 1.0);
}

void main() {
    vec2 baseUv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec2 uv = baseUv;
    float time = u_time * 1.55;
    mat2 rot = mat2(cos(time / 10.0), sin(time / 10.0), -sin(time / 10.0), cos(time / 10.0));
    uv = rot * uv;
    uv *= 0.9 * sin(time * 0.5) + 3.0;
    uv.x -= time / 5.0;

    vec2 q = vec2(0.0);
    vec2 r = vec2(0.0);
    float p = u_complex ? pattern2(uv, seed, time, q, r) : pattern(uv, seed, time, q, r);

    vec3 colour = vec3(p) * 2.0;
    colour.r -= dot(q, r) * 15.0;
    colour = mix(colour, vec3(pattern(r, seed2, time, q, r), dot(q, r) * 15.0, -0.1), 0.5);
    colour -= q.y * 1.5;
    colour = mix(colour, vec3(0.2, 0.2, 0.2), clamp(q.x, -1.0, 0.0) * 3.0);

    vec3 waveColour = clamp(-colour + (abs(colour) * 0.5), 0.0, 1.0);
    waveColour = pow(clamp(waveColour * vec3(1.35, 1.48, 1.62), 0.0, 1.0), vec3(0.72));
    float waveValue = max(max(waveColour.r, waveColour.g), waveColour.b);
    float palette = fract(p * 1.7 + dot(q, r) * 0.025 + time * 0.035);
    vec3 accentA = mix(vec3(0.0, 0.92, 0.82), vec3(0.96, 0.08, 0.48), smoothstep(0.12, 0.72, palette));
    vec3 accentB = mix(accentA, vec3(1.0, 0.16, 0.04), smoothstep(0.68, 1.0, palette));
    waveColour = mix(waveColour, accentB * waveValue, 0.46);

    vec3 cube = cubeMask(baseUv, u_time);
    float edgeMask = cube.x;
    float shadedEdge = cube.y;
    float faceCover = cube.z;
    float dotShade = shadedEdge / max(edgeMask, 0.0001);
    float shadedDots = edgeMask * mix(0.22, 1.24, dotShade);
    float colourStrength = pow(clamp(shadedDots, 0.0, 1.0), 1.08);
    float blackShade = clamp(faceCover * (1.0 - dotShade) * 0.16, 0.0, 0.42);
    vec3 shadedColour = waveColour * colourStrength;
    shadedColour = mix(shadedColour, vec3(0.0), blackShade);

    gl_FragColor = vec4(shadedColour, 1.0);
}
`;function D(M,_={}){const x=!!_.reduceMotion;let t=null,f=null,d=null,a=null,s=null,r=!1,v=null,m=.5,p=.5,h=0,b=!1,c=0,n=0;function g(){t=new B({canvas:M,antialias:!0,alpha:!1,powerPreference:"high-performance"}),t.setClearColor(0,1),t.outputColorSpace=N,f=new X,f.position.z=1,d=new j;const e=new Y(2,2);a=new O({depthWrite:!1,uniforms:{u_time:{value:h},u_resolution:{value:new w(1,1)},u_mouse:{value:new w(0,0)},u_complex:{value:!1}},vertexShader:U,fragmentShader:V}),s=new T(e,a),d.add(s)}function i(e=performance.now()){t||g(),n<=0&&(n=e);const o=Math.min(50,Math.max(0,e-n));n=e,b?c=Math.min(1,c+o/2400):c=Math.max(0,c-o/1800);const l=1-c*c*(3-2*c);x||(h+=o/1e3*l),a.uniforms.u_time.value=h,a.uniforms.u_mouse.value.set(m,p),a.uniforms.u_complex.value=!1,t.render(d,f)}function z(){r&&(i(performance.now()),v=requestAnimationFrame(z))}function S(e,o,u=1){const l=Math.max(1,Math.floor(e||1)),R=Math.max(1,Math.floor(o||1)),A=Math.max(1,Number(u)||1);t.setPixelRatio(A),t.setSize(l,R,!1),a.uniforms.u_resolution.value.set(t.domElement.width,t.domElement.height),i()}function q(e,o){m=Math.max(0,Math.min(1,e)),p=Math.max(0,Math.min(1,o))}function y(){m=.5,p=.5}function P(e){b=!!e,r||i(performance.now())}function E(){h=0,b=!1,c=0,n=0,m=.5,p=.5,i()}function k(){i()}function F(){if(x){i();return}r||(r=!0,v=requestAnimationFrame(z))}function C(){r=!1,v!=null&&cancelAnimationFrame(v),v=null}function H(){var e,o,u,l;C(),(o=(e=s==null?void 0:s.geometry)==null?void 0:e.dispose)==null||o.call(e),(u=a==null?void 0:a.dispose)==null||u.call(a),(l=t==null?void 0:t.dispose)==null||l.call(t),d=null,f=null,a=null,s=null}return g(),{start:F,stop:C,destroy:H,reset:E,renderStatic:k,setSize:S,setPointer:q,clearPointer:y,setHeld:P}}export{D as createSoupShaderEngine};
