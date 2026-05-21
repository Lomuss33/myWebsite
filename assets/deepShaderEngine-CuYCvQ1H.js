function P(o,n,t){return Math.max(n,Math.min(t,o))}function R(o,n,t){const e=o.createShader(n);if(o.shaderSource(e,t),o.compileShader(e),!o.getShaderParameter(e,o.COMPILE_STATUS))throw new Error(`Shader compile failed: ${o.getShaderInfoLog(e)||"unknown error"}`);return e}function N(o,n,t){const e=o.getAttribLocation(n,t);if(e===-1)throw new Error(`Cannot find attribute ${t}.`);return e}function m(o,n,t){const e=o.getUniformLocation(n,t);if(e==null)throw new Error(`Cannot find uniform ${t}.`);return e}const O=`#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

in vec2 position;

void main(void) {
    gl_Position = vec4(position, 0.0, 1.0);
}
`,k=`#version 300 es
/*
 * made by Matthias Hurrle (@atzedent)
 */

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 touch;
uniform int pointerCount;

out vec4 fragColor;

#define PI 3.14159
#define TAU 6.28318
#define THETA 1.57079
#define T (17.0+time)
#define mouse (touch/resolution)
#define hue(a) (0.25+0.4*cos((a)*11.3+vec3(0,83,21)))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

void main(void) {
    float mn = min(resolution.x, resolution.y);
    vec2 uv = (
        gl_FragCoord.xy - 0.5 * resolution
    ) / mn;

    vec3 col = vec3(0.0),
    lp = vec3(9.0,5.0,2.0),
    rp = vec3(9.0,6.0,7.0),
    ro = vec3(0.7,0.9,3.0),
    rd = normalize(vec3(uv, 1.0)),
    ax = normalize(vec3(8.0,-3.0,-5.0)),
    p;

    float g = 0.0, angle = sin(T * 0.1) * PI;

    if(pointerCount > 0) {
        ax = normalize(vec3(1.0,-5.0,5.0));
        ax.xz *= rot(mouse.x * TAU);
        angle = mouse.y * PI;
    } else {
        ax.xz *= rot(T * 0.05);
    }

    for(float i = 1.0; i < 40.0; i++) {
        p = g * rd - ro;
        p = mix(
            dot(p, ax) * ax,
            p,
            cos(angle)
        ) * THETA - cross(p, ax);
        float d = 1.0, e = 0.0;

        for(float j = 0.0; j < 16.0; j++) {
            p = lp - abs(p - rp);
            e = 9.0 / clamp(dot(p,p), 0.0, 16.0);
            d *= e * 1.01;
            p = abs(p) * e;
        }

        e = p.y / d;
        e += 3e-4;
        g += e * 0.5;

        col += mix(
            vec3(1.0),
            hue(-log(d) * 0.25),
            0.75
        ) / e * 5e-5;
    }

    col = 1.0 - exp(-col * 1.8);
    col = pow(col, vec3(1.45));
    vec2 z = (gl_FragCoord.xy - 0.5 * resolution.xy) / mn;
    col *= 1.0 - dot(z, z);

    fragColor = vec4(col, 1.0);
}
`;function $(o,n={}){const t=!!n.reduceMotion,e=o.getContext("webgl2",{alpha:!1,antialias:!0,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:"high-performance"});if(!e)throw new Error("WebGL2 not available");let i=!1,f=null,p=0,h=performance.now(),d={x:.5,y:.5},g=!1,l=1,u=1;const x=R(e,e.VERTEX_SHADER,O),A=R(e,e.FRAGMENT_SHADER,k),r=e.createProgram();if(e.attachShader(r,x),e.attachShader(r,A),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))throw new Error(`Program link failed: ${e.getProgramInfoLog(r)||"unknown error"}`);e.useProgram(r);const F=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),v=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,v),e.bufferData(e.ARRAY_BUFFER,F,e.STATIC_DRAW);const S=N(e,r,"position");e.enableVertexAttribArray(S),e.vertexAttribPointer(S,2,e.FLOAT,!1,0,0);const _=m(e,r,"time"),C=m(e,r,"touch"),I=m(e,r,"pointerCount"),M=m(e,r,"resolution");function a(c=performance.now()){const s=Math.min(c-h,100);h=c,(!t||p===0)&&(p+=s*.001),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(r),e.bindBuffer(e.ARRAY_BUFFER,v),e.uniform1f(_,p),e.uniform2f(C,d.x*l,(1-d.y)*u),e.uniform1i(I,g?1:0),e.uniform2f(M,l,u),e.drawArrays(e.TRIANGLES,0,6)}function w(){i&&(a(performance.now()),f=requestAnimationFrame(w))}function b(c,s,U=1){const G=Math.max(1,Math.floor(c||1)),D=Math.max(1,Math.floor(s||1)),E=Math.max(.5,Math.min(Number(U)||1,1.5));l=Math.floor(G*E),u=Math.floor(D*E),o.width=l,o.height=u,e.viewport(0,0,l,u),a()}function y(c,s){d={x:P(c,0,1),y:P(s,0,1)},g=!0,i||a()}function H(){g=!1,d={x:.5,y:.5},i||a()}function L(){a()}function B(){if(t){a();return}i||(i=!0,h=performance.now(),f=requestAnimationFrame(w))}function T(){i=!1,f!=null&&cancelAnimationFrame(f),f=null}function z(){T(),e.deleteBuffer(v),e.deleteProgram(r),e.deleteShader(x),e.deleteShader(A)}return{setSize:b,setPointer:y,clearPointer:H,renderStatic:L,start:B,stop:T,destroy:z}}export{$ as createDeepShaderEngine};
