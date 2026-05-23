const N=`#version 300 es
in vec4 position;
void main() {
    gl_Position = position;
}`,D=`#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform float zoom;
uniform vec2 resolution;
uniform vec2 move;
uniform int pointerCount;
#define P pointerCount
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define MN min(R.x,R.y)
#define S smoothstep
#define SE(v,a) S(a+10./MN,a-10./MN,v)
#define rot(a) mat2(cos((a)-vec4(0,11,33,0)))
#define hue(a) (.5+.5*sin(3.14*(a)+vec3(1,2,3)))
float rnd(vec2 p) {
    p=fract(p*vec2(12.9898,78.233));
    p+=dot(p,p+34.56);
    return fract(p.x*p.y);
}
float noise(vec2 p) {
    vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f), k=vec2(1,0);
    float a=rnd(i), b=rnd(i+k), c=rnd(i+k.yx), d=rnd(i+1.);
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
vec3 background(vec2 uv) {
    uv-=.2;
    float d=noise(uv+noise(uv*rot(.78)*4.-noise(uv*rot(.39)*133.)));
    vec3 deep=vec3(.015,.012,.026);
    vec3 fluid=hue(dot(sin(d*8.-T*.42)/7.2,d)-.9)*mix(.10,.22,rnd(uv));
    vec3 col=deep+fluid;
    vec2 vignetteUv=2.*FC/R-1.;
    vignetteUv*=.92;
    float v=dot(vignetteUv,vignetteUv);
    return mix(col,vec3(.02,.018,.034),S(.18,1.2,v));
}
void main() {
    vec2 uv=(FC-.5*R)/MN;
    float z=1.7+S(-10.,10.,zoom*10.);
    uv*=z*S(-2.,2.,pow(tanh(-cos(P>0?.0:T*.1)+z*length(uv)),5.));
    vec2 p=uv-z*move/MN;
    p.y-=P>0?.0:pow(sin(T*.125),7.);
    p*=rot(.78);
    p.x-=P>0?.0:pow(sin(T*.25),9.);
    p=mod(p*3.,.75)-.375;
    float d=pow(length(p),9.),
        a=clamp((1.-d*1e4)*8.,.0,1.),
        b=clamp((.95-d*95e2)*16.,.0,1.)-clamp(pow(.9-d*95e2,1.)*16.,.0,1.),
        c=clamp((1.5-d*105e2)*2.,.0,1.)-clamp(pow(1.-d*105e2,1.)*2.,.0,1.);
    vec3 col=vec3(0);
    if ((a+b)>.0) {
        vec2 lens=(uv+.01)*(1.-d*5e3);
        col+=background(lens);
        float g=.08+clamp(clamp(p.y,.0,.2)/2.,.0,1.)+clamp(clamp(-p.y,-.2,.2)*c/2.,.0,1.);
        vec3 light=clamp(col+a*g+b*.3,.0,1.);
        col=mix(background(uv),light,S(.0,1.,a+b)*.08);
    } else {
        col=background(uv);
    }
    col=mix(col,vec3(dot(col,vec3(.21,.71,.07))),S(.0,2.,clamp(length(uv),.0,1.)));
    uv=2.*FC/R-1.;
    uv*=.84;
    uv*=uv*uv*uv;
    col=mix(vec3(0),col,min(time*.3,1.));
    O=vec4(col,1);
}`,I=(t,S,d)=>{const e=t.createShader(S);if(t.shaderSource(e,d),t.compileShader(e),!t.getShaderParameter(e,t.COMPILE_STATUS)){const f=t.getShaderInfoLog(e);throw t.deleteShader(e),new Error(f||"Shader compilation failed")}return e};function B(t,S={}){const d={maxPixelRatio:1.25,reduceMotion:!1,...S},e=t.getContext("webgl2",{alpha:!1,antialias:!1,powerPreference:"high-performance"});if(!e)throw new Error("WebGL2 unavailable");const f=I(e,e.VERTEX_SHADER,N),P=I(e,e.FRAGMENT_SHADER,D),r=e.createProgram();if(e.attachShader(r,f),e.attachShader(r,P),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS))throw new Error(e.getProgramInfoLog(r)||"Shader link failed");const A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,1,-1,-1,1,1,1,-1]),e.STATIC_DRAW);const b=e.getAttribLocation(r,"position"),i={time:e.getUniformLocation(r,"time"),zoom:e.getUniformLocation(r,"zoom"),resolution:e.getUniformLocation(r,"resolution"),move:e.getUniformLocation(r,"move"),pointerCount:e.getUniformLocation(r,"pointerCount")};e.enableVertexAttribArray(b),e.vertexAttribPointer(b,2,e.FLOAT,!1,0,0);let s=1,u=1,a=0,l=!1,n=!1,M=performance.now(),p=!1,c=!1,x=0,L=0,v=0,T=0,F=0;const h=(o=performance.now())=>{n||(e.viewport(0,0,s,u),e.useProgram(r),e.uniform2f(i.resolution,s,u),e.uniform1f(i.time,(o-M)*.001),e.uniform1f(i.zoom,v),e.uniform2f(i.move,x,L),e.uniform1i(i.pointerCount,c||p?1:0),e.drawArrays(e.TRIANGLE_STRIP,0,4))},y=o=>{!l||n||(h(o),a=window.requestAnimationFrame(y))},R=o=>{const E=t.getBoundingClientRect(),w=o.clientX-E.left,m=o.clientY-E.top;c&&(x+=(w-T)*.5,L+=(F-m)*.5),T=w,F=m},C=o=>{p=!0,R(o)},U=o=>{p=!0,R(o)},_=()=>{p=!1,c=!1},z=o=>{c=!0,R(o)},g=()=>{c=!1},k=o=>{v=Math.max(-1,Math.min(1,v+o.deltaY*.0015))};return t.addEventListener("pointerenter",C,{passive:!0}),t.addEventListener("pointermove",U,{passive:!0}),t.addEventListener("pointerleave",_,{passive:!0}),t.addEventListener("pointerdown",z),t.addEventListener("pointerup",g),t.addEventListener("pointercancel",g),t.addEventListener("wheel",k,{passive:!0}),{start(){if(!(n||l)){if(d.reduceMotion){h();return}l=!0,a=window.requestAnimationFrame(y)}},stop(){n||!l||(l=!1,a&&window.cancelAnimationFrame(a),a=0)},reset(){n||(x=0,L=0,v=0,M=performance.now(),h())},destroy(){n||(this.stop(),n=!0,t.removeEventListener("pointerenter",C),t.removeEventListener("pointermove",U),t.removeEventListener("pointerleave",_),t.removeEventListener("pointerdown",z),t.removeEventListener("pointerup",g),t.removeEventListener("pointercancel",g),t.removeEventListener("wheel",k),e.deleteBuffer(A),e.deleteProgram(r),e.deleteShader(f),e.deleteShader(P))},setSize(o,E,w=1){if(n)return;const m=Math.min(d.maxPixelRatio,Math.max(1,w||1));s=Math.max(1,Math.round(o*m)),u=Math.max(1,Math.round(E*m)),t.width=s,t.height=u,t.style.width="100%",t.style.height="100%",h()},setInteractionEnabled(o){n||(t.style.pointerEvents=o?"auto":"none")}}}export{B as createHighDimensionalPearlEngine};
