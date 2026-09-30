function e(e,t,n){return Math.max(t,Math.min(n,e))}function t(e,t,n){let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error(`Shader compile failed: ${e.getShaderInfoLog(r)||`unknown error`}`);return r}function n(e,t,n){let r=e.getAttribLocation(t,n);if(r===-1)throw Error(`Cannot find attribute ${n}.`);return r}function r(e,t,n){let r=e.getUniformLocation(t,n);if(r==null)throw Error(`Cannot find uniform ${n}.`);return r}function i(i,a={}){let o=!!a.reduceMotion,s=i.getContext(`webgl2`,{alpha:!1,antialias:!0,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:`high-performance`});if(!s)throw Error(`WebGL2 not available`);let c=!1,l=null,u=0,d=performance.now(),f={x:.5,y:.5},p=!1,m=1,h=1,g=t(s,s.VERTEX_SHADER,`#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

in vec2 position;

void main(void) {
    gl_Position = vec4(position, 0.0, 1.0);
}
`),_=t(s,s.FRAGMENT_SHADER,`#version 300 es
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
`),v=s.createProgram();if(s.attachShader(v,g),s.attachShader(v,_),s.linkProgram(v),!s.getProgramParameter(v,s.LINK_STATUS))throw Error(`Program link failed: ${s.getProgramInfoLog(v)||`unknown error`}`);s.useProgram(v);let y=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),b=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,b),s.bufferData(s.ARRAY_BUFFER,y,s.STATIC_DRAW);let x=n(s,v,`position`);s.enableVertexAttribArray(x),s.vertexAttribPointer(x,2,s.FLOAT,!1,0,0);let S=r(s,v,`time`),C=r(s,v,`touch`),w=r(s,v,`pointerCount`),T=r(s,v,`resolution`);function E(e=performance.now()){let t=Math.min(e-d,100);d=e,(!o||u===0)&&(u+=t*.001),s.clearColor(0,0,0,1),s.clear(s.COLOR_BUFFER_BIT),s.useProgram(v),s.bindBuffer(s.ARRAY_BUFFER,b),s.uniform1f(S,u),s.uniform2f(C,f.x*m,(1-f.y)*h),s.uniform1i(w,+!!p),s.uniform2f(T,m,h),s.drawArrays(s.TRIANGLES,0,6)}function D(){c&&(E(performance.now()),l=requestAnimationFrame(D))}function O(e,t,n=1){let r=Math.max(1,Math.floor(e||1)),a=Math.max(1,Math.floor(t||1)),o=Math.max(.5,Math.min(Number(n)||1,1.5));m=Math.floor(r*o),h=Math.floor(a*o),i.width=m,i.height=h,s.viewport(0,0,m,h),E()}function k(t,n){f={x:e(t,0,1),y:e(n,0,1)},p=!0,c||E()}function A(){p=!1,f={x:.5,y:.5},c||E()}function j(){E()}function M(){if(o){E();return}c||(c=!0,d=performance.now(),l=requestAnimationFrame(D))}function N(){c=!1,l!=null&&cancelAnimationFrame(l),l=null}function P(){N(),s.deleteBuffer(b),s.deleteProgram(v),s.deleteShader(g),s.deleteShader(_)}return{setSize:O,setPointer:k,clearPointer:A,renderStatic:j,start:M,stop:N,destroy:P}}export{i as createDeepShaderEngine};