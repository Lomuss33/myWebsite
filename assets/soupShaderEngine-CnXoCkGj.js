import{W as O,S as U,r as Z,a as G,l as H,k as N,n as S,d as T}from"./three-Cmtw-h9o.js";const X=`
void main() {
    gl_Position = vec4(position, 1.0);
}
`,j=`
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

float bezierY(float t) {
    float inv = 1.0 - t;
    return 3.0 * inv * inv * t * -1.0 + 3.0 * inv * t * t * -1.0 + t * t * t;
}

vec3 rotateOriginalCube(vec3 p, float phase) {
    float local = phase;
    float rotY = 0.78539816339;
    float rotZ = 0.0;

    if(local < 0.5) {
        float k = clamp(bezierY(local * 2.0), 0.0, 1.0);
        rotY = mix(0.78539816339, 3.92699081699, k);
    }
    else {
        float k = clamp(bezierY((local - 0.5) * 2.0), 0.0, 1.0);
        rotY = mix(3.92699081699, 0.0, k);
        rotZ = mix(0.0, 1.57079632679, k);
    }

    p = rotateX(p, -1.57079632679);
    p = rotateY(p, rotY);
    p = rotateZ(p, rotZ);
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

float dottedFace(vec2 p, vec3 a, vec3 b, vec3 c, vec3 d, vec3 normal, float size, float phase, float radius) {
    float visible = smoothstep(-0.02, 0.12, rotatedNormal(normal, phase).z);
    float face = 0.0;

    face = max(face, dottedEdge(p, a, b, size, phase, radius));
    face = max(face, dottedEdge(p, b, c, size, phase, radius));
    face = max(face, dottedEdge(p, c, d, size, phase, radius));
    face = max(face, dottedEdge(p, d, a, size, phase, radius));

    return face * visible;
}

float cubeMask(vec2 p, float uTime) {
    float mask = 0.0;

    for(int i = 0; i < cubeCount; i++) {
        float fi = float(i);
        float depth = (fi + 1.0) / float(cubeCount);
        float size = (fi + 1.0) * 0.027;
        float phase = fract(uTime * 0.0317 - (fi + 1.0) * 0.008);
        float radius = size * 0.036;
        float cube = 0.0;

        cube = max(cube, dottedFace(p, vec3(-0.5, -0.5, 0.5), vec3(0.5, -0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(-0.5, 0.5, 0.5), vec3(0.0, 0.0, 1.0), size, phase, radius));
        cube = max(cube, dottedFace(p, vec3(0.5, -0.5, 0.5), vec3(0.5, -0.5, -0.5), vec3(0.5, 0.5, -0.5), vec3(0.5, 0.5, 0.5), vec3(1.0, 0.0, 0.0), size, phase, radius));
        cube = max(cube, dottedFace(p, vec3(0.5, -0.5, -0.5), vec3(-0.5, -0.5, -0.5), vec3(-0.5, 0.5, -0.5), vec3(0.5, 0.5, -0.5), vec3(0.0, 0.0, -1.0), size, phase, radius));
        cube = max(cube, dottedFace(p, vec3(-0.5, -0.5, -0.5), vec3(-0.5, -0.5, 0.5), vec3(-0.5, 0.5, 0.5), vec3(-0.5, 0.5, -0.5), vec3(-1.0, 0.0, 0.0), size, phase, radius));
        cube = max(cube, dottedFace(p, vec3(-0.5, -0.5, -0.5), vec3(0.5, -0.5, -0.5), vec3(0.5, -0.5, 0.5), vec3(-0.5, -0.5, 0.5), vec3(0.0, -1.0, 0.0), size, phase, radius));
        cube = max(cube, dottedFace(p, vec3(-0.5, 0.5, 0.5), vec3(0.5, 0.5, 0.5), vec3(0.5, 0.5, -0.5), vec3(-0.5, 0.5, -0.5), vec3(0.0, 1.0, 0.0), size, phase, radius));

        mask = max(mask, cube * smoothstep(0.02, 0.82, depth));
    }

    return clamp(mask, 0.0, 1.0);
}

void main() {
    vec2 baseUv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec2 uv = baseUv;
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

    vec3 waveColour = clamp(-colour + (abs(colour) * 0.5), 0.0, 1.0);
    waveColour = pow(clamp(waveColour * vec3(1.35, 1.48, 1.62), 0.0, 1.0), vec3(0.72));

    float mask = cubeMask(baseUv, u_time);
    gl_FragColor = vec4(waveColour * mask, 1.0);
}
`;function V(q,E={}){const z=!!E.reduceMotion;let t=null,m=null,d=null,a=null,i=null,u=!1,v=null,r=.5,p=.5,b=2001,x=!1,c=0,f=0;function _(){t=new O({canvas:q,antialias:!0,alpha:!1,powerPreference:"high-performance"}),t.setClearColor(0,1),t.outputColorSpace=U,m=new Z,m.position.z=1,d=new G;const e=new H(2,2);a=new N({depthWrite:!1,uniforms:{u_time:{value:b},u_resolution:{value:new S(1,1)},u_mouse:{value:new S(0,0)},u_complex:{value:!1}},vertexShader:X,fragmentShader:j}),i=new T(e,a),d.add(i)}function l(e=performance.now()){t||_(),f<=0&&(f=e);const o=Math.min(50,Math.max(0,e-f));f=e,x?c=Math.min(1,c+o/2400):c=Math.max(0,c-o/1800);const n=c*c*(3-2*c),s=.07*(1+r*5),g=.003+r*.004,h=s+(g-s)*n;b+=z?h*.15:h,a.uniforms.u_time.value=b,a.uniforms.u_mouse.value.set(r,p),a.uniforms.u_complex.value=!1,t.render(d,m)}function C(){u&&(l(performance.now()),v=requestAnimationFrame(C))}function w(e,o,n=1){const s=Math.max(1,Math.floor(e||1)),g=Math.max(1,Math.floor(o||1)),h=Math.max(1,Number(n)||1);t.setPixelRatio(h),t.setSize(s,g,!1),a.uniforms.u_resolution.value.set(t.domElement.width,t.domElement.height),l()}function k(e,o){r=Math.max(0,Math.min(1,e)),p=Math.max(0,Math.min(1,o))}function y(){r=.5,p=.5}function F(e){x=!!e,u||l(performance.now())}function P(){b=2001,x=!1,c=0,f=0,r=.5,p=.5,l()}function Y(){l()}function R(){if(z){l();return}u||(u=!0,v=requestAnimationFrame(C))}function M(){u=!1,v!=null&&cancelAnimationFrame(v),v=null}function A(){var e,o,n,s;M(),(o=(e=i==null?void 0:i.geometry)==null?void 0:e.dispose)==null||o.call(e),(n=a==null?void 0:a.dispose)==null||n.call(a),(s=t==null?void 0:t.dispose)==null||s.call(t),d=null,m=null,a=null,i=null}return _(),{start:R,stop:M,destroy:A,reset:P,renderStatic:Y,setSize:w,setPointer:k,clearPointer:y,setHeld:F}}export{V as createSoupShaderEngine};
