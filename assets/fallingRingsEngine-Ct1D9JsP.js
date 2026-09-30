function e(e,t,n){return Math.max(t,Math.min(n,e))}function t(t,n,r){let i=e((r-t)/Math.max(1e-6,n-t),0,1);return i*i*(3-2*i)}function n(e,t,n){let r=e.createShader(n);if(e.shaderSource(r,t),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r)||`Shader compile failed`;throw e.deleteShader(r),Error(t)}return r}function r(e,t,n){let r=e.getAttribLocation(t,n);if(r===-1)throw Error(`Cannot find attribute ${n}.`);return r}function i(e,t,n){let r=e.getUniformLocation(t,n);if(r===null)throw Error(`Cannot find uniform ${n}.`);return r}function a(e,a={}){let o=!!a.reduceMotion,s=e.getContext(`webgl`,{antialias:!1,preserveDrawingBuffer:!1})||e.getContext(`experimental-webgl`,{antialias:!1,preserveDrawingBuffer:!1});if(!s)throw Error(`WebGL not available`);let c={ringDistance:.04,maxRings:50,waveCount:100,waveDepth:.2,yCenter:.3,direction:3},l={ringDistance:.06,maxRings:0,waveCount:2,waveDepth:.01,yCenter:0,direction:0},u=null,d=null,f=null,p=null,m=null,h=null,g=null,_=null,v=null,y=null,b=null,x=!1,S=null,C=0,w=0,T=0,E=!1,D=0,O=!1;function k(){let e=n(s,`
precision mediump float;
attribute vec2 position;

void main () {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,s.VERTEX_SHADER),t=n(s,`
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
`,s.FRAGMENT_SHADER);if(y=s.createProgram(),s.attachShader(y,e),s.attachShader(y,t),s.linkProgram(y),!s.getProgramParameter(y,s.LINK_STATUS))throw Error(s.getProgramInfoLog(y)||`Program link failed`);s.useProgram(y);let a=new Float32Array([-1,-1,-1,1,1,-1,1,-1,-1,1,1,1]);b=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,b),s.bufferData(s.ARRAY_BUFFER,a,s.STATIC_DRAW);let o=r(s,y,`position`);s.enableVertexAttribArray(o),s.vertexAttribPointer(o,2,s.FLOAT,!1,8,0),u=i(s,y,`width`),d=i(s,y,`height`),f=i(s,y,`time`),p=i(s,y,`ringDistance`),m=i(s,y,`maxRings`),h=i(s,y,`waveCount`),g=i(s,y,`waveDepth`),_=i(s,y,`yCenter`),v=i(s,y,`direction`)}function A(e,t,n){return{ringDistance:e.ringDistance+(t.ringDistance-e.ringDistance)*n,maxRings:e.maxRings+(t.maxRings-e.maxRings)*n,waveCount:e.waveCount+(t.waveCount-e.waveCount)*n,waveDepth:e.waveDepth+(t.waveDepth-e.waveDepth)*n,yCenter:e.yCenter+(t.yCenter-e.yCenter)*n,direction:e.direction+(t.direction-e.direction)*n}}function j(e=performance.now()){if(!y)return;w<=0&&(w=e);let n=Math.min(50,Math.max(0,e-w));w=e,T=E?Math.min(1,T+n/1500):Math.max(0,T-n/650);let r=t(0,1,T),i=A(c,l,r),a=O&&!E?1:0,u=1-.85**(n/(1e3/60));D+=(a-D)*u;let d=t(0,1,D),b=.12+-.108*r,x=b+(.0036-b)*d;C+=n*x*(o?.1:1),s.uniform1f(f,C),s.uniform1f(p,i.ringDistance),s.uniform1f(m,i.maxRings),s.uniform1f(h,i.waveCount),s.uniform1f(g,i.waveDepth),s.uniform1f(_,i.yCenter),s.uniform1f(v,i.direction),s.drawArrays(s.TRIANGLES,0,6)}function M(e){x&&(j(e),S=requestAnimationFrame(M))}function N(t,n,r=1){let i=Math.max(1,Math.floor(t||1)),a=Math.max(1,Math.floor(n||1)),o=Math.max(1,Number(r)||1);e.width=Math.floor(i*o),e.height=Math.floor(a*o),s.viewport(0,0,e.width,e.height),s.uniform1f(u,e.width),s.uniform1f(d,e.height),j(performance.now())}function P(e){E=!!e,x||j(performance.now())}function F(e){O=!!e,x||j(performance.now())}function I(){j(performance.now())}function L(){E=!1,T=0,C=0,w=0,j(performance.now())}function R(){if(o){j(performance.now());return}x||(x=!0,S=requestAnimationFrame(M))}function z(){x=!1,S!=null&&cancelAnimationFrame(S),S=null}function B(){z(),b&&s.deleteBuffer(b),y&&s.deleteProgram(y)}return k(),{start:R,stop:z,destroy:B,reset:L,renderStatic:I,setSize:N,setHeld:P,setHovered:F}}export{a as createFallingRingsEngine};