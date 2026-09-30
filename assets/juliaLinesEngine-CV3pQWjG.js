function e(e,t,n){return Math.max(t,Math.min(n,e))}function t(e){let t=e>>>0||1;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function n(e,t,n){let r=e.createShader(n);if(e.shaderSource(r,t),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r)||`Shader compile failed`;throw e.deleteShader(r),Error(t)}return r}function r(e,t,n){let r=e.getAttribLocation(t,n);if(r===-1)throw Error(`Cannot find attribute ${n}.`);return r}function i(e,t,n){let r=e.getUniformLocation(t,n);if(r===null)throw Error(`Cannot find uniform ${n}.`);return r}function a(a,o={}){let s=!!o.reduceMotion,c=t(o.seed>>>0||1),l=a.getContext(`webgl`,{antialias:!1,preserveDrawingBuffer:!1})||a.getContext(`experimental-webgl`,{antialias:!1,preserveDrawingBuffer:!1});if(!l)throw Error(`WebGL not available`);let u=null,d=null,f=null,p=null,m=null,h=!1,g=null,_=!1,v={x:.4,y:.5},y=c()*Math.PI*2,b=c()*Math.PI*2,x=.18+c()*.16,S=.08+c()*.18,C=[9999,9999];function w(){let e=n(l,`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,l.VERTEX_SHADER),t=n(l,`
precision mediump float;

#define ITER_MAX 250

uniform float width;
uniform float height;
uniform vec2 c0;

void main() {
  vec2 iResolution = vec2(width, height);
  float dist;
  float thismin;

  float zoom = 1.5;
  vec2 z = (gl_FragCoord.xy - 0.5 * iResolution.xy) / min(width, height) * 2.0 * zoom;
  vec2 grad = vec2(1.0, 0.0);
  dist = min(abs(z.x), abs(z.y));

  int k = 0;
  for (int kk = 0; kk < ITER_MAX; ++kk) {
    grad = 2.0 * vec2(z.x * grad.x - z.y * grad.y, z.x * grad.y + z.y * grad.x);
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c0;
    if (dot(z, z) > 4.0) break;
    thismin = abs(z.x) / length(grad);
    if (thismin < dist) {
      dist = thismin;
      k = kk - (kk / 6) * 6;
    }
  }

  vec3 s;
  if (k == 0) s = vec3(0.0, 0.0, 1.0);
  else if (k == 1) s = vec3(1.0, 1.0, 0.0);
  else if (k == 2) s = vec3(1.0, 0.0, 0.0);
  else if (k == 3) s = vec3(0.0, 1.0, 1.0);
  else if (k == 4) s = vec3(0.0, 1.0, 0.0);
  else s = vec3(1.0, 0.0, 1.0);

  float lineWidth = 0.003;
  float color = 1.0 - smoothstep(lineWidth, lineWidth + 0.005, dist);
  gl_FragColor = vec4(s * color, 1.0);
}
`,l.FRAGMENT_SHADER);if(p=l.createProgram(),l.attachShader(p,e),l.attachShader(p,t),l.linkProgram(p),!l.getProgramParameter(p,l.LINK_STATUS))throw Error(l.getProgramInfoLog(p)||`Program link failed`);l.useProgram(p);let a=new Float32Array([-1,1,-1,-1,1,1,1,-1]);m=l.createBuffer(),l.bindBuffer(l.ARRAY_BUFFER,m),l.bufferData(l.ARRAY_BUFFER,a,l.STATIC_DRAW);let o=r(l,p,`position`);l.enableVertexAttribArray(o),l.vertexAttribPointer(o,2,l.FLOAT,!1,8,0),u=i(l,p,`width`),d=i(l,p,`height`),f=i(l,p,`c0`)}function T(e,t){return[(e-.5)*2,(.5-t)*2]}function E(t){if(_)return T(v.x,v.y);if(s)return T(x,S);let n=t*45e-5,r=.5+Math.sin(n+y)*.18+Math.cos(n*.63+b)*.07,i=.5+Math.cos(n*.91+b)*.2+Math.sin(n*.52+y)*.06;return T(e(r,.12,.88),e(i,.12,.88))}function D(e=performance.now(),t=!1){if(!p)return;let n=E(e);!t&&Math.abs(n[0]-C[0])<5e-4&&Math.abs(n[1]-C[1])<5e-4||(C=n,l.uniform2fv(f,n),l.drawArrays(l.TRIANGLE_STRIP,0,4))}function O(e){h&&(D(e),g=requestAnimationFrame(O))}function k(e,t,n=1){let r=Math.max(1,Math.floor(e||1)),i=Math.max(1,Math.floor(t||1)),o=Math.max(1,Number(n)||1);a.width=Math.floor(r*o),a.height=Math.floor(i*o),l.viewport(0,0,a.width,a.height),l.uniform1f(u,a.width),l.uniform1f(d,a.height),C=[9999,9999],D(performance.now(),!0)}function A(t,n){_=!0,v.x=e(t,0,1),v.y=e(n,0,1)}function j(){_=!1}function M(t,n){_=!0,v.x=e(v.x+t,0,1),v.y=e(v.y+n,0,1),D(performance.now(),!0)}function N(){y=c()*Math.PI*2,b=c()*Math.PI*2,x=.18+c()*.16,S=.08+c()*.18,_=!1,C=[9999,9999],D(performance.now(),!0)}function P(){D(performance.now(),!0)}function F(){if(s){D(performance.now(),!0);return}h||(h=!0,g=requestAnimationFrame(O))}function I(){h=!1,g!=null&&cancelAnimationFrame(g),g=null}function L(){I(),m&&l.deleteBuffer(m),p&&l.deleteProgram(p)}return w(),{start:F,stop:I,destroy:L,reset:N,renderStatic:P,setSize:k,setPointer:A,clearPointer:j,nudge:M}}export{a as createJuliaLinesEngine};