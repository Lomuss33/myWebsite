function p(e,f,a){return Math.max(f,Math.min(a,e))}function lt(e){let f=e>>>0||1;return function(){f|=0,f=f+1831565813|0;let a=Math.imul(f^f>>>15,1|f);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}const V=1,ct=9,W=42e-5,X=6e3,st=`
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
  return 0.42 + 0.58 * cos(6.28318 * (vec3(0.0, 0.33, 0.67) + t));
}

float hashIndex(float n) {
  return fract(sin(n * 127.1 + 311.7) * 43758.5453123);
}

void main() {
  vec2 resolution = vec2(width, height);
  vec2 uv = (gl_FragCoord.xy / resolution) - 0.5;

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
  vec3 hue = palette(hashIndex(hueId));
  gl_FragColor = vec4(bands * hue, 1.0);
}
`}function Y(e,f,a){const l=e.createShader(a);if(e.shaderSource(l,f),e.compileShader(l),!e.getShaderParameter(l,e.COMPILE_STATUS)){const t=e.getShaderInfoLog(l)||"Shader compile failed";throw e.deleteShader(l),new Error(t)}return l}function mt(e,f){const a=Y(e,st,e.VERTEX_SHADER),l=Y(e,ut(f),e.FRAGMENT_SHADER),t=e.createProgram();if(e.attachShader(t,a),e.attachShader(t,l),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){const o=e.getProgramInfoLog(t)||"Program link failed";throw e.deleteProgram(t),e.deleteShader(a),e.deleteShader(l),new Error(o)}return e.deleteShader(a),e.deleteShader(l),{program:t,widthHandle:e.getUniformLocation(t,"width"),heightHandle:e.getUniformLocation(t,"height"),frqHandle:e.getUniformLocation(t,"frq"),dotsHandle:e.getUniformLocation(t,"dots")}}function dt(e){return{x:p(e.x-.5,-.5,.5),y:p(.5-e.y,-.5,.5)}}function ht(e,f={}){const a=!!f.reduceMotion,l=lt(f.seed>>>0||1),t=e.getContext("webgl",{antialias:!1,preserveDrawingBuffer:!1})||e.getContext("experimental-webgl",{antialias:!1,preserveDrawingBuffer:!1});if(!t)throw new Error("WebGL not available");let o=null,M=null,x=1,A=1,E=!1,v=null,F=0;const z=Number(t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS))||128,B=Math.max(2,Math.min(2**ct,2**Math.floor(Math.log2(Math.max(2,z-16))))),$=Math.floor(Math.log2(B));let S=V,d=2**S,c=new Float32Array(d*2),m=new Float32Array(d*2),R=!1,L={x:.5,y:.5},_=!1,U=0,P=1,b=0;function K(){const r=new Float32Array([-1,1,-1,-1,1,1,1,-1]);M=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,M),t.bufferData(t.ARRAY_BUFFER,r,t.STATIC_DRAW)}function Q(){o!=null&&o.program&&t.deleteProgram(o.program),o=mt(t,d),t.useProgram(o.program),t.bindBuffer(t.ARRAY_BUFFER,M);const r=t.getAttribLocation(o.program,"position");t.enableVertexAttribArray(r),t.vertexAttribPointer(r,2,t.FLOAT,!1,8,0),t.uniform1f(o.widthHandle,x),t.uniform1f(o.heightHandle,A)}function j(){c=new Float32Array(d*2),m=new Float32Array(d*2);for(let r=0;r<d;r++){const n=r*2;c[n]=l()-.5,c[n+1]=l()-.5;const s=l()*Math.PI*2,u=.8+l()*.4;m[n]=Math.cos(s)*u,m[n+1]=Math.sin(s)*u}}function C(){d=2**S,Q(),j(),b=1,D()}function J(r){const n=.5-.5*Math.cos(r%X/X*Math.PI*2),s=96+S*56,u=44*Math.max(0,P-1);return n*(s+u)}function Z(r){if(a)return W*.7;let n=1;if(_){const s=Math.max(0,r-U);n=1+Math.log2(1+s/220)}return P+=(n-P)*.08,b*=.94,W*P*(1+b*1.25)}function tt(r,n){const s=Z(n)*r,u=dt(L);for(let w=0;w<d;w++){const i=w*2;let h=m[i],g=m[i+1];if(R){const y=u.x-c[i],I=u.y-c[i+1],ft=Math.max(4e-4,y*y+I*I),G=Math.min(.0018,85e-6/ft);h+=y*G*r,g+=I*G*r;const T=Math.hypot(h,g)||1,H=2.3+P*.85;T>H&&(h=h/T*H,g=g/T*H),m[i]=h,m[i+1]=g}c[i]+=h*s,c[i+1]+=g*s,Math.abs(c[i])>.5&&(c[i]=p(c[i],-.5,.5),m[i]=-h),Math.abs(c[i+1])>.5&&(c[i+1]=p(c[i+1],-.5,.5),m[i+1]=-g)}}function O(r=performance.now(),n=!1){if(o!=null&&o.program){if(!n){const s=p(r-F,8,40);tt(s,r)}F=r,t.useProgram(o.program),t.uniform1f(o.frqHandle,J(r)),t.uniform2fv(o.dotsHandle,c),t.drawArrays(t.TRIANGLE_STRIP,0,4)}}function k(r){E&&(O(r),v=requestAnimationFrame(k))}function et(r,n,s=1){const u=Math.max(1,Number(s)||1),w=Math.max(1,Math.floor(r||1)),i=Math.max(1,Math.floor(n||1));x=Math.floor(w*u),A=Math.floor(i*u),e.width=x,e.height=A,t.viewport(0,0,x,A),o!=null&&o.program&&(t.useProgram(o.program),t.uniform1f(o.widthHandle,x),t.uniform1f(o.heightHandle,A)),D()}function rt(r,n){L={x:p(r,0,1),y:p(n,0,1)},R=!0}function ot(){R=!1}function nt(r){const n=!!r;n&&!_&&(U=performance.now()),_=n}function at(){S=S>=$?V:S+1,C(),q()}function D(){O(performance.now(),!0)}function q(){E||(E=!0,F=performance.now(),v=requestAnimationFrame(k))}function N(){E=!1,v!=null&&cancelAnimationFrame(v),v=null}function it(){N(),o!=null&&o.program&&t.deleteProgram(o.program),o=null,M&&t.deleteBuffer(M),M=null}return K(),C(),{start:q,stop:N,destroy:it,renderStatic:D,setSize:et,setPointer:rt,clearPointer:ot,setHoverActive:nt,boostPopulation:at,getDotLimit:()=>B}}export{ht as createDistanceFieldEngine};
