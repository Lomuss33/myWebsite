function X(t,l,r){return Math.max(l,Math.min(r,t))}function K(t,l,r){const e=X((r-t)/Math.max(1e-6,l-t),0,1);return e*e*(3-2*e)}function P(t,l,r){const e=t.createShader(r);if(t.shaderSource(e,l),t.compileShader(e),!t.getShaderParameter(e,t.COMPILE_STATUS)){const p=t.getShaderInfoLog(e)||"Shader compile failed";throw t.deleteShader(e),new Error(p)}return e}function V(t,l,r){const e=t.getAttribLocation(l,r);if(e===-1)throw new Error(`Cannot find attribute ${r}.`);return e}function s(t,l,r){const e=t.getUniformLocation(l,r);if(e===null)throw new Error(`Cannot find uniform ${r}.`);return e}const q=`
precision mediump float;
attribute vec2 position;

void main () {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Y=`
precision highp float;

const float PI = 3.14159265358979323846264;
const vec4 WHITE = vec4(0.9, 0.9, 0.9, 1.0);
const vec4 BLACK = vec4(0.0, 0.0, 0.0, 1.0);
const int MAX_RINGS = 100;

uniform float time;
uniform float width;
uniform float height;
uniform float ringDistance;
uniform float maxRings;
uniform float waveCount;
uniform float waveDepth;
uniform float yCenter;
uniform float direction;

void main(void) {
    float rot = time * 0.006;
    float vmin = min(width, height);
    vec2 position = vec2(-(width / 2.0) + gl_FragCoord.x, -(height / 2.0) + gl_FragCoord.y) / (vmin / 2.0);
    float x = position.x;
    float y = position.y;

    bool white = false;
    float prevRingDist = ringDistance;
    for (int i = 0; i < MAX_RINGS; i++) {
        vec2 center = vec2(0.0, yCenter - ringDistance * float(i) * direction);
        float radius = 0.5 + ringDistance / (pow(float(i + 5), 1.1) * 0.006);
        float dist = distance(center, position);
        dist = pow(dist, 1.0 / 3.0);
        float currentRingDist = abs(dist - radius);

        if (currentRingDist < ringDistance * prevRingDist * 7.0) {
            float angle = atan(y - center.y, x - center.x);
            float thickness = 1.1 * abs(dist - radius) / max(0.0001, prevRingDist);
            float depthFactor = waveDepth * sin((angle + rot * radius) * waveCount);
            if (dist > radius) {
                white = (thickness < ringDistance * 5.0 - depthFactor * 2.0);
            } else {
                white = (thickness < ringDistance * 5.0 + depthFactor);
            }
            break;
        }

        if (dist > radius || float(i) >= maxRings) break;
        prevRingDist = currentRingDist;
    }

    gl_FragColor = white ? WHITE : BLACK;
}
`;function $(t,l={}){const r=!!l.reduceMotion,e=t.getContext("webgl",{antialias:!1,preserveDrawingBuffer:!1})||t.getContext("experimental-webgl",{antialias:!1,preserveDrawingBuffer:!1});if(!e)throw new Error("WebGL not available");const p={ringDistance:.04,maxRings:50,waveCount:100,waveDepth:.2,yCenter:.3,direction:3},T={ringDistance:.06,maxRings:0,waveCount:2,waveDepth:.01,yCenter:0,direction:0};let x=null,C=null,S=null,A=null,E=null,M=null,y=null,F=null,H=null,i=null,g=null,d=!1,h=null,D=0,m=0,c=0,v=!1;function L(){const n=P(e,q,e.VERTEX_SHADER),o=P(e,Y,e.FRAGMENT_SHADER);if(i=e.createProgram(),e.attachShader(i,n),e.attachShader(i,o),e.linkProgram(i),!e.getProgramParameter(i,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(i)||"Program link failed");e.useProgram(i);const a=new Float32Array([-1,-1,-1,1,1,-1,1,-1,-1,1,1,1]);g=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,g),e.bufferData(e.ARRAY_BUFFER,a,e.STATIC_DRAW);const f=V(e,i,"position");e.enableVertexAttribArray(f),e.vertexAttribPointer(f,2,e.FLOAT,!1,8,0),x=s(e,i,"width"),C=s(e,i,"height"),S=s(e,i,"time"),A=s(e,i,"ringDistance"),E=s(e,i,"maxRings"),M=s(e,i,"waveCount"),y=s(e,i,"waveDepth"),F=s(e,i,"yCenter"),H=s(e,i,"direction")}function B(n,o,a){return{ringDistance:n.ringDistance+(o.ringDistance-n.ringDistance)*a,maxRings:n.maxRings+(o.maxRings-n.maxRings)*a,waveCount:n.waveCount+(o.waveCount-n.waveCount)*a,waveDepth:n.waveDepth+(o.waveDepth-n.waveDepth)*a,yCenter:n.yCenter+(o.yCenter-n.yCenter)*a,direction:n.direction+(o.direction-n.direction)*a}}function u(n=performance.now()){if(!i)return;m<=0&&(m=n);const o=Math.min(50,Math.max(0,n-m));m=n,v?c=Math.min(1,c+o/3e3):c=Math.max(0,c-o/650);const a=K(0,1,c),f=B(p,T,a),w=.12,W=w+(.012-w)*a;D+=o*W*(r?.1:1),e.uniform1f(S,D),e.uniform1f(A,f.ringDistance),e.uniform1f(E,f.maxRings),e.uniform1f(M,f.waveCount),e.uniform1f(y,f.waveDepth),e.uniform1f(F,f.yCenter),e.uniform1f(H,f.direction),e.drawArrays(e.TRIANGLES,0,6)}function _(n){d&&(u(n),h=requestAnimationFrame(_))}function I(n,o,a=1){const f=Math.max(1,Math.floor(n||1)),w=Math.max(1,Math.floor(o||1)),R=Math.max(1,Number(a)||1);t.width=Math.floor(f*R),t.height=Math.floor(w*R),e.viewport(0,0,t.width,t.height),e.uniform1f(x,t.width),e.uniform1f(C,t.height),u(performance.now())}function k(n){v=!!n,d||u(performance.now())}function U(){u(performance.now())}function N(){v=!1,c=0,D=0,m=0,u(performance.now())}function G(){if(r){u(performance.now());return}d||(d=!0,h=requestAnimationFrame(_))}function b(){d=!1,h!=null&&cancelAnimationFrame(h),h=null}function O(){b(),g&&e.deleteBuffer(g),i&&e.deleteProgram(i)}return L(),{start:G,stop:b,destroy:O,reset:N,renderStatic:U,setSize:I,setHeld:k}}export{$ as createFallingRingsEngine};
