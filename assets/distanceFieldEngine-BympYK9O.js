function e(e,t,n){return Math.max(t,Math.min(n,e))}function t(e){let t=e>>>0||1;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var n=42e-5,r=6e3;function i(e){return`
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
`}function a(e,t,n){let r=e.createShader(n);if(e.shaderSource(r,t),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r)||`Shader compile failed`;throw e.deleteShader(r),Error(t)}return r}function o(e,t){let n=a(e,`
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,e.VERTEX_SHADER),r=a(e,i(t),e.FRAGMENT_SHADER),o=e.createProgram();if(e.attachShader(o,n),e.attachShader(o,r),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)){let t=e.getProgramInfoLog(o)||`Program link failed`;throw e.deleteProgram(o),e.deleteShader(n),e.deleteShader(r),Error(t)}return e.deleteShader(n),e.deleteShader(r),{program:o,widthHandle:e.getUniformLocation(o,`width`),heightHandle:e.getUniformLocation(o,`height`),frqHandle:e.getUniformLocation(o,`frq`),dotsHandle:e.getUniformLocation(o,`dots`)}}function s(t){return{x:e(t.x-.5,-.5,.5),y:e(.5-t.y,-.5,.5)}}function c(i,a={}){let c=!!a.reduceMotion,l=t(a.seed>>>0||1),u=i.getContext(`webgl`,{antialias:!1,preserveDrawingBuffer:!1})||i.getContext(`experimental-webgl`,{antialias:!1,preserveDrawingBuffer:!1});if(!u)throw Error(`WebGL not available`);let d=null,f=null,p=1,m=1,h=!1,g=null,_=0,v=Number(u.getParameter(u.MAX_FRAGMENT_UNIFORM_VECTORS))||128,y=Math.max(2,Math.min(512,2**Math.floor(Math.log2(Math.max(2,v-16))))),b=Math.floor(Math.log2(y)),x=4,S=2**x,C=new Float32Array(S*2),w=new Float32Array(S*2),T=!1,E={x:.5,y:.5},D=!1,O=0,k=1,A=0;function j(){u.clearColor(.015,.02,.045,1);let e=new Float32Array([-1,1,-1,-1,1,1,1,-1]);f=u.createBuffer(),u.bindBuffer(u.ARRAY_BUFFER,f),u.bufferData(u.ARRAY_BUFFER,e,u.STATIC_DRAW)}function M(){d!=null&&d.program&&u.deleteProgram(d.program),d=o(u,S),u.useProgram(d.program),u.bindBuffer(u.ARRAY_BUFFER,f);let e=u.getAttribLocation(d.program,`position`);u.enableVertexAttribArray(e),u.vertexAttribPointer(e,2,u.FLOAT,!1,8,0),u.uniform1f(d.widthHandle,p),u.uniform1f(d.heightHandle,m)}function N(){C=new Float32Array(S*2),w=new Float32Array(S*2);for(let e=0;e<S;e++){let t=e*2;C[t]=l()-.5,C[t+1]=l()-.5;let n=l()*Math.PI*2,r=.8+l()*.4;w[t]=Math.cos(n)*r,w[t+1]=Math.sin(n)*r}}function P(){S=2**x,M(),N(),A=1,G()}function F(e){return(.5-.5*Math.cos(e%r/r*Math.PI*2))*(96+x*56+44*Math.max(0,k-1))}function I(e){if(c)return n*.7;let t=1;if(D){let n=Math.max(0,e-O);t=1+Math.log2(1+n/220)}return k+=(t-k)*.08,A*=.94,n*k*(1+A*1.25)}function L(t,n){let r=I(n)*t,i=s(E);for(let n=0;n<S;n++){let a=n*2,o=w[a],s=w[a+1];if(T){let e=i.x-C[a],n=i.y-C[a+1],r=Math.max(4e-4,e*e+n*n),c=Math.min(.0018,85e-6/r);o+=e*c*t,s+=n*c*t;let l=Math.hypot(o,s)||1,u=2.3+k*.85;l>u&&(o=o/l*u,s=s/l*u),w[a]=o,w[a+1]=s}C[a]+=o*r,C[a+1]+=s*r,Math.abs(C[a])>.5&&(C[a]=e(C[a],-.5,.5),w[a]=-o),Math.abs(C[a+1])>.5&&(C[a+1]=e(C[a+1],-.5,.5),w[a+1]=-s)}}function R(t=performance.now(),n=!1){d!=null&&d.program&&(n||L(e(t-_,8,40),t),_=t,u.useProgram(d.program),u.clear(u.COLOR_BUFFER_BIT),u.uniform1f(d.frqHandle,F(t)),u.uniform2fv(d.dotsHandle,C),u.drawArrays(u.TRIANGLE_STRIP,0,4))}function z(e){h&&(R(e),g=requestAnimationFrame(z))}function B(e,t,n=1){let r=Math.max(1,Number(n)||1),a=Math.max(1,Math.floor(e||1)),o=Math.max(1,Math.floor(t||1));p=Math.floor(a*r),m=Math.floor(o*r),i.width=p,i.height=m,u.viewport(0,0,p,m),d!=null&&d.program&&(u.useProgram(d.program),u.uniform1f(d.widthHandle,p),u.uniform1f(d.heightHandle,m)),G()}function V(t,n){E={x:e(t,0,1),y:e(n,0,1)},T=!0}function H(){T=!1}function U(e){let t=!!e;t&&!D&&(O=performance.now()),D=t}function W(){x=x>=b?4:x+1,P(),K()}function G(){R(performance.now(),!0)}function K(){h||(h=!0,_=performance.now(),g=requestAnimationFrame(z))}function q(){h=!1,g!=null&&cancelAnimationFrame(g),g=null}function J(){q(),d!=null&&d.program&&u.deleteProgram(d.program),d=null,f&&u.deleteBuffer(f),f=null}return j(),P(),{start:K,stop:q,destroy:J,renderStatic:G,setSize:B,setPointer:V,clearPointer:H,setHoverActive:U,boostPopulation:W,getDotLimit:()=>y}}export{c as createDistanceFieldEngine};