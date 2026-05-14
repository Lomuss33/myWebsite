function p(e,f,a){return Math.max(f,Math.min(a,e))}function lt(e){let f=e>>>0||1;return function(){f|=0,f=f+1831565813|0;let a=Math.imul(f^f>>>15,1|f);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}const V=4,ct=9,W=42e-5,X=6e3,st=`
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;function ut(e){return`
precision mediump float;

uniform float width;
uniform float height;
uniform float frq;
uniform vec2 dots[${e}];

vec3 palette(float t) {
  return 0.52 + 0.48 * cos(6.28318 * (vec3(0.0, 0.25, 0.55) + t));
}

float hashIndex(float n) {
  return fract(sin(n * 127.1 + 311.7) * 43758.5453123);
}

void main() {
  vec2 resolution = vec2(width, height);
  vec2 uv = (gl_FragCoord.xy / resolution) - 0.5;
  uv.x *= resolution.x / max(resolution.y, 1.0);

  float nearest = 100000000.0;
  float dist;
  float hueId = 0.0;

  for (int k = 0; k < ${e}; ++k) {
    dist = length(uv - dots[k]);
    if (dist < nearest) {
      nearest = dist;
      hueId = float(k);
    }
  }

  float bands = (cos(nearest * frq) + 1.0) * 0.5;
  float ring = smoothstep(0.12, 1.0, bands);
  float core = smoothstep(0.045, 0.0, nearest);
  vec3 hue = palette(hashIndex(hueId));
  vec3 base = vec3(0.015, 0.02, 0.045);
  vec3 glow = hue * (0.22 + ring * 0.82) + core * vec3(1.0, 0.92, 0.64);
  gl_FragColor = vec4(base + glow, 1.0);
}
`}function Y(e,f,a){const l=e.createShader(a);if(e.shaderSource(l,f),e.compileShader(l),!e.getShaderParameter(l,e.COMPILE_STATUS)){const t=e.getShaderInfoLog(l)||"Shader compile failed";throw e.deleteShader(l),new Error(t)}return l}function mt(e,f){const a=Y(e,st,e.VERTEX_SHADER),l=Y(e,ut(f),e.FRAGMENT_SHADER),t=e.createProgram();if(e.attachShader(t,a),e.attachShader(t,l),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){const o=e.getProgramInfoLog(t)||"Program link failed";throw e.deleteProgram(t),e.deleteShader(a),e.deleteShader(l),new Error(o)}return e.deleteShader(a),e.deleteShader(l),{program:t,widthHandle:e.getUniformLocation(t,"width"),heightHandle:e.getUniformLocation(t,"height"),frqHandle:e.getUniformLocation(t,"frq"),dotsHandle:e.getUniformLocation(t,"dots")}}function dt(e){return{x:p(e.x-.5,-.5,.5),y:p(.5-e.y,-.5,.5)}}function ht(e,f={}){const a=!!f.reduceMotion,l=lt(f.seed>>>0||1),t=e.getContext("webgl",{antialias:!1,preserveDrawingBuffer:!1})||e.getContext("experimental-webgl",{antialias:!1,preserveDrawingBuffer:!1});if(!t)throw new Error("WebGL not available");let o=null,M=null,S=1,v=1,F=!1,A=null,R=0;const z=Number(t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS))||128,H=Math.max(2,Math.min(2**ct,2**Math.floor(Math.log2(Math.max(2,z-16))))),$=Math.floor(Math.log2(H));let x=V,d=2**x,c=new Float32Array(d*2),m=new Float32Array(d*2),E=!1,L={x:.5,y:.5},_=!1,U=0,w=1,b=0;function K(){t.clearColor(.015,.02,.045,1);const r=new Float32Array([-1,1,-1,-1,1,1,1,-1]);M=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,M),t.bufferData(t.ARRAY_BUFFER,r,t.STATIC_DRAW)}function Q(){o!=null&&o.program&&t.deleteProgram(o.program),o=mt(t,d),t.useProgram(o.program),t.bindBuffer(t.ARRAY_BUFFER,M);const r=t.getAttribLocation(o.program,"position");t.enableVertexAttribArray(r),t.vertexAttribPointer(r,2,t.FLOAT,!1,8,0),t.uniform1f(o.widthHandle,S),t.uniform1f(o.heightHandle,v)}function j(){c=new Float32Array(d*2),m=new Float32Array(d*2);for(let r=0;r<d;r++){const n=r*2;c[n]=l()-.5,c[n+1]=l()-.5;const s=l()*Math.PI*2,u=.8+l()*.4;m[n]=Math.cos(s)*u,m[n+1]=Math.sin(s)*u}}function C(){d=2**x,Q(),j(),b=1,y()}function J(r){const n=.5-.5*Math.cos(r%X/X*Math.PI*2),s=96+x*56,u=44*Math.max(0,w-1);return n*(s+u)}function Z(r){if(a)return W*.7;let n=1;if(_){const s=Math.max(0,r-U);n=1+Math.log2(1+s/220)}return w+=(n-w)*.08,b*=.94,W*w*(1+b*1.25)}function tt(r,n){const s=Z(n)*r,u=dt(L);for(let P=0;P<d;P++){const i=P*2;let h=m[i],g=m[i+1];if(E){const D=u.x-c[i],I=u.y-c[i+1],ft=Math.max(4e-4,D*D+I*I),G=Math.min(.0018,85e-6/ft);h+=D*G*r,g+=I*G*r;const T=Math.hypot(h,g)||1,B=2.3+w*.85;T>B&&(h=h/T*B,g=g/T*B),m[i]=h,m[i+1]=g}c[i]+=h*s,c[i+1]+=g*s,Math.abs(c[i])>.5&&(c[i]=p(c[i],-.5,.5),m[i]=-h),Math.abs(c[i+1])>.5&&(c[i+1]=p(c[i+1],-.5,.5),m[i+1]=-g)}}function O(r=performance.now(),n=!1){if(o!=null&&o.program){if(!n){const s=p(r-R,8,40);tt(s,r)}R=r,t.useProgram(o.program),t.clear(t.COLOR_BUFFER_BIT),t.uniform1f(o.frqHandle,J(r)),t.uniform2fv(o.dotsHandle,c),t.drawArrays(t.TRIANGLE_STRIP,0,4)}}function k(r){F&&(O(r),A=requestAnimationFrame(k))}function et(r,n,s=1){const u=Math.max(1,Number(s)||1),P=Math.max(1,Math.floor(r||1)),i=Math.max(1,Math.floor(n||1));S=Math.floor(P*u),v=Math.floor(i*u),e.width=S,e.height=v,t.viewport(0,0,S,v),o!=null&&o.program&&(t.useProgram(o.program),t.uniform1f(o.widthHandle,S),t.uniform1f(o.heightHandle,v)),y()}function rt(r,n){L={x:p(r,0,1),y:p(n,0,1)},E=!0}function ot(){E=!1}function nt(r){const n=!!r;n&&!_&&(U=performance.now()),_=n}function at(){x=x>=$?V:x+1,C(),q()}function y(){O(performance.now(),!0)}function q(){F||(F=!0,R=performance.now(),A=requestAnimationFrame(k))}function N(){F=!1,A!=null&&cancelAnimationFrame(A),A=null}function it(){N(),o!=null&&o.program&&t.deleteProgram(o.program),o=null,M&&t.deleteBuffer(M),M=null}return K(),C(),{start:q,stop:N,destroy:it,renderStatic:y,setSize:et,setPointer:rt,clearPointer:ot,setHoverActive:nt,boostPopulation:at,getDotLimit:()=>H}}export{ht as createDistanceFieldEngine};
