function R(o,f,a){return Math.max(f,Math.min(a,o))}function I(o,f,a){const e=o.createShader(f);if(o.shaderSource(e,a),o.compileShader(e),!o.getShaderParameter(e,o.COMPILE_STATUS))throw new Error(`Shader compile failed: ${o.getShaderInfoLog(e)||"unknown error"}`);return e}function Y(o,f,a){const e=o.getAttribLocation(f,a);if(e===-1)throw new Error(`Cannot find attribute ${a}.`);return e}function x(o,f,a){const e=o.getUniformLocation(f,a);if(e==null)throw new Error(`Cannot find uniform ${a}.`);return e}const K=`#version 300 es
precision mediump float;
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,X=`#version 300 es
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
`;function J(o,f={}){const a=!!f.reduceMotion,e=o.getContext("webgl2",{alpha:!1,antialias:!0,depth:!1,stencil:!1,preserveDrawingBuffer:!1});if(!e)throw new Error("WebGL2 not available");let p=1,y=1,s=!1,m=null,A=0,g=performance.now(),d={x:.5,y:.5},w=!0,v=-1,c=new Float32Array(45);const b=I(e,e.VERTEX_SHADER,K),S=I(e,e.FRAGMENT_SHADER,X),i=e.createProgram();if(e.attachShader(i,b),e.attachShader(i,S),e.linkProgram(i),!e.getProgramParameter(i,e.LINK_STATUS))throw new Error(`Program link failed: ${e.getProgramInfoLog(i)||"unknown error"}`);e.useProgram(i);const L=new Float32Array([-1,1,-1,-1,1,1,1,-1]),z=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,z),e.bufferData(e.ARRAY_BUFFER,L,e.STATIC_DRAW);const P=Y(e,i,"position");e.enableVertexAttribArray(P),e.vertexAttribPointer(P,2,e.FLOAT,!1,8,0);const T=x(e,i,"width"),k=x(e,i,"height"),D=x(e,i,"time"),H=x(e,i,"scale"),B=x(e,i,"pattern"),U=x(e,i,"hueTb");function _(){const r=[0,1,Math.random()];let n=Math.floor(3*Math.random());return[r[2],r[n]]=[r[n],r[2]],n=Math.floor(2*Math.random()),[r[1],r[n]]=[r[n],r[1]],r}function N(r){c=new Float32Array(45);let n,u;do n=Math.floor(4*Math.random()),u=Math.random()>.5,w&&(n=0,u=!0);while(r===0&&(n===0||n===2)&&!u);switch(n){case 0:c.fill(1);break;case 1:for(let t=0;t<45;t++)c[t]=Math.floor(t/3)&1;break;case 2:{const t=_();for(let l=0;l<15;l++)c[3*l]=t[0],c[3*l+1]=t[1],c[3*l+2]=t[2];break}case 3:for(let t=0;t<15;t++){const l=_();c[3*t]=l[0],c[3*t+1]=l[1],c[3*t+2]=l[2]}break}if(u)for(let t=0;t<45;t++)(Math.floor(t/3)<7||Math.floor(t/3)>=10)&&(c[t]=0);e.uniform3fv(U,c)}function M(){e.uniform1f(H,1+6*(1-d.x))}function C(){v=(v+1)%3,w&&(v=1),e.uniform1i(B,v),N(v),w=!1}function h(){const r=performance.now(),n=Math.min(r-g,100);g=r,A+=n*.001*d.y,e.uniform1f(D,A),e.drawArrays(e.TRIANGLE_STRIP,0,4)}function E(){s&&(h(),m=requestAnimationFrame(E))}function q(r,n,u=1){p=Math.max(1,Math.floor(r||1)),y=Math.max(1,Math.floor(n||1));const t=Math.max(1,Math.min(Number(u)||1,2));o.width=Math.floor(p*t),o.height=Math.floor(y*t),e.viewport(0,0,o.width,o.height),e.uniform1f(T,o.width),e.uniform1f(k,o.height),h()}function $(r,n){d={x:R(r,0,1),y:R(n,0,1)},M(),s||h()}function j(){d={x:.5,y:.5},M(),s||h()}function G(){C(),s||h()}function O(){h()}function V(){if(a){h();return}s||(s=!0,g=performance.now(),m=requestAnimationFrame(E))}function F(){s=!1,m!=null&&cancelAnimationFrame(m),m=null}function W(){F(),z&&e.deleteBuffer(z),i&&e.deleteProgram(i),b&&e.deleteShader(b),S&&e.deleteShader(S)}return e.clearColor(0,0,0,1),e.uniform1f(T,p),e.uniform1f(k,y),M(),C(),{setSize:q,setPointer:$,clearPointer:j,pulsePattern:G,renderStatic:O,start:V,stop:F,destroy:W}}export{J as createNoiceShaderEngine};
