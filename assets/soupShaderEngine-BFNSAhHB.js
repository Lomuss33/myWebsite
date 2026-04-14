import{W as z,S as V,m as B,a as D,n as H,o as N,j as q,d as O}from"./three.module-BHNaTqMO.js";const T=`
void main() {
    gl_Position = vec4(position, 1.0);
}
`,U=`
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
`;function X(S,g={}){const _=!!g.reduceMotion;let e=null,v=null,a=null,o=null,n=null,m=!1,c=null,i=.5,l=.5,f=2001,r=!1;function x(){e=new z({canvas:S,antialias:!0,alpha:!1,powerPreference:"high-performance"}),e.setClearColor(0,1),e.outputColorSpace=V,v=new B,v.position.z=1,a=new D;const t=new H(2,2);o=new N({uniforms:{u_time:{value:f},u_resolution:{value:new q(1,1)},u_mouse:{value:new q(0,0)},u_complex:{value:r}},vertexShader:T,fragmentShader:U}),n=new O(t,o),a.add(n)}function u(){e||x();const t=.05*(1+i*5);f+=_?t*.15:t,o.uniforms.u_time.value=f,o.uniforms.u_mouse.value.set(i,l),o.uniforms.u_complex.value=r,e.render(a,v)}function b(){m&&(u(),c=requestAnimationFrame(b))}function M(t,s,d=1){const p=Math.max(1,Math.floor(t||1)),P=Math.max(1,Math.floor(s||1)),G=Math.max(1,Number(d)||1);e.setPixelRatio(G),e.setSize(p,P,!1),o.uniforms.u_resolution.value.set(e.domElement.width,e.domElement.height),u()}function w(t,s){i=Math.max(0,Math.min(1,t)),l=Math.max(0,Math.min(1,s))}function C(){i=.5,l=.5}function E(){r=!r,u()}function y(){f=2001,r=!1,i=.5,l=.5,u()}function R(){u()}function F(){if(_){u();return}m||(m=!0,c=requestAnimationFrame(b))}function h(){m=!1,c!=null&&cancelAnimationFrame(c),c=null}function A(){var t,s,d,p;h(),(s=(t=n==null?void 0:n.geometry)==null?void 0:t.dispose)==null||s.call(t),(d=o==null?void 0:o.dispose)==null||d.call(o),(p=e==null?void 0:e.dispose)==null||p.call(e),a=null,v=null,o=null,n=null}return x(),{start:F,stop:h,destroy:A,reset:y,renderStatic:R,setSize:M,setPointer:w,clearPointer:C,toggleComplex:E}}export{X as createSoupShaderEngine};
