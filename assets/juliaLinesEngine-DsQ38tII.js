function h(t,i,r){return Math.max(i,Math.min(r,t))}function W(t){let i=t>>>0||1;return function(){i|=0,i=i+1831565813|0;let r=Math.imul(i^i>>>15,1|i);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296}}const G=`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,O=`
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
`;function _(t,i,r){const n=t.createShader(r);if(t.shaderSource(n,i),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS)){const e=t.getShaderInfoLog(n)||"Shader compile failed";throw t.deleteShader(n),new Error(e)}return n}function Y(t,i,r){const n=t.getAttribLocation(i,r);if(n===-1)throw new Error(`Cannot find attribute ${r}.`);return n}function S(t,i,r){const n=t.getUniformLocation(i,r);if(n===null)throw new Error(`Cannot find uniform ${r}.`);return n}function V(t,i={}){const r=!!i.reduceMotion,n=W(i.seed>>>0||1),e=t.getContext("webgl",{antialias:!1,preserveDrawingBuffer:!1})||t.getContext("experimental-webgl",{antialias:!1,preserveDrawingBuffer:!1});if(!e)throw new Error("WebGL not available");let b=null,E=null,R=null,f=null,w=null,p=!1,d=null,m=!1,c={x:.4,y:.5},x=n()*Math.PI*2,A=n()*Math.PI*2,v=.18+n()*.16,k=.08+n()*.18,g=[9999,9999];function T(){const a=_(e,G,e.VERTEX_SHADER),o=_(e,O,e.FRAGMENT_SHADER);if(f=e.createProgram(),e.attachShader(f,a),e.attachShader(f,o),e.linkProgram(f),!e.getProgramParameter(f,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(f)||"Program link failed");e.useProgram(f);const l=new Float32Array([-1,1,-1,-1,1,1,1,-1]);w=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,w),e.bufferData(e.ARRAY_BUFFER,l,e.STATIC_DRAW);const u=Y(e,f,"position");e.enableVertexAttribArray(u),e.vertexAttribPointer(u,2,e.FLOAT,!1,8,0),b=S(e,f,"width"),E=S(e,f,"height"),R=S(e,f,"c0")}function M(a,o){return[(a-.5)*2,(.5-o)*2]}function F(a){if(m)return M(c.x,c.y);if(r)return M(v,k);const o=a*45e-5,l=.5+Math.sin(o+x)*.18+Math.cos(o*.63+A)*.07,u=.5+Math.cos(o*.91+A)*.2+Math.sin(o*.52+x)*.06;return M(h(l,.12,.88),h(u,.12,.88))}function s(a=performance.now(),o=!1){if(!f)return;const l=F(a);!o&&Math.abs(l[0]-g[0])<5e-4&&Math.abs(l[1]-g[1])<5e-4||(g=l,e.uniform2fv(R,l),e.drawArrays(e.TRIANGLE_STRIP,0,4))}function y(a){p&&(s(a),d=requestAnimationFrame(y))}function I(a,o,l=1){const u=Math.max(1,Math.floor(a||1)),N=Math.max(1,Math.floor(o||1)),z=Math.max(1,Number(l)||1);t.width=Math.floor(u*z),t.height=Math.floor(N*z),e.viewport(0,0,t.width,t.height),e.uniform1f(b,t.width),e.uniform1f(E,t.height),g=[9999,9999],s(performance.now(),!0)}function C(a,o){m=!0,c.x=h(a,0,1),c.y=h(o,0,1)}function B(){m=!1}function L(a,o){m=!0,c.x=h(c.x+a,0,1),c.y=h(c.y+o,0,1),s(performance.now(),!0)}function D(){x=n()*Math.PI*2,A=n()*Math.PI*2,v=.18+n()*.16,k=.08+n()*.18,m=!1,g=[9999,9999],s(performance.now(),!0)}function H(){s(performance.now(),!0)}function U(){if(r){s(performance.now(),!0);return}p||(p=!0,d=requestAnimationFrame(y))}function P(){p=!1,d!=null&&cancelAnimationFrame(d),d=null}function X(){P(),w&&e.deleteBuffer(w),f&&e.deleteProgram(f)}return T(),{start:U,stop:P,destroy:X,reset:D,renderStatic:H,setSize:I,setPointer:C,clearPointer:B,nudge:L}}export{V as createJuliaLinesEngine};
