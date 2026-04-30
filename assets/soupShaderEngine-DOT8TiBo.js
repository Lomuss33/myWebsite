import{W as B,S as V,m as D,a as N,n as O,o as T,l as w,d as U}from"./three-BYTi_f6D.js";const W=`
void main() {
    gl_Position = vec4(position, 1.0);
}
`,X=`
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
`;function I(E,y={}){const M=!!y.reduceMotion;let t=null,f=null,d=null,o=null,i=null,l=!1,m=null,u=.5,p=.5,h=2001,_=!1,s=0,v=0;function S(){t=new B({canvas:E,antialias:!0,alpha:!1,powerPreference:"high-performance"}),t.setClearColor(0,1),t.outputColorSpace=V,f=new D,f.position.z=1,d=new N;const e=new O(2,2);o=new T({uniforms:{u_time:{value:h},u_resolution:{value:new w(1,1)},u_mouse:{value:new w(0,0)},u_complex:{value:!1}},vertexShader:W,fragmentShader:X}),i=new U(e,o),d.add(i)}function a(e=performance.now()){t||S(),v<=0&&(v=e);const n=Math.min(50,Math.max(0,e-v));v=e,_?s=Math.min(1,s+n/2400):s=Math.max(0,s-n/1800);const r=s*s*(3-2*s),c=.07*(1+u*5),b=.003+u*.004,x=c+(b-c)*r;h+=M?x*.15:x,o.uniforms.u_time.value=h,o.uniforms.u_mouse.value.set(u,p),o.uniforms.u_complex.value=!1,t.render(d,f)}function q(){l&&(a(performance.now()),m=requestAnimationFrame(q))}function C(e,n,r=1){const c=Math.max(1,Math.floor(e||1)),b=Math.max(1,Math.floor(n||1)),x=Math.max(1,Number(r)||1);t.setPixelRatio(x),t.setSize(c,b,!1),o.uniforms.u_resolution.value.set(t.domElement.width,t.domElement.height),a()}function R(e,n){u=Math.max(0,Math.min(1,e)),p=Math.max(0,Math.min(1,n))}function F(){u=.5,p=.5}function A(e){_=!!e,l||a(performance.now())}function P(){h=2001,_=!1,s=0,v=0,u=.5,p=.5,a()}function G(){a()}function H(){if(M){a();return}l||(l=!0,m=requestAnimationFrame(q))}function g(){l=!1,m!=null&&cancelAnimationFrame(m),m=null}function z(){var e,n,r,c;g(),(n=(e=i==null?void 0:i.geometry)==null?void 0:e.dispose)==null||n.call(e),(r=o==null?void 0:o.dispose)==null||r.call(o),(c=t==null?void 0:t.dispose)==null||c.call(t),d=null,f=null,o=null,i=null}return S(),{start:H,stop:g,destroy:z,reset:P,renderStatic:G,setSize:C,setPointer:R,clearPointer:F,setHeld:A}}export{I as createSoupShaderEngine};
