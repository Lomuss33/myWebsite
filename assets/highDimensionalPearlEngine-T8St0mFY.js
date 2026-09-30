var e=(e,t,n)=>{let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(r);throw e.deleteShader(r),Error(t||`Shader compilation failed`)}return r};function t(t,n={}){let r={maxPixelRatio:1.25,reduceMotion:!1,...n},i=t.getContext(`webgl2`,{alpha:!1,antialias:!1,powerPreference:`high-performance`});if(!i)throw Error(`WebGL2 unavailable`);let a=e(i,i.VERTEX_SHADER,`#version 300 es
in vec4 position;
void main() {
    gl_Position = position;
}`),o=e(i,i.FRAGMENT_SHADER,`#version 300 es
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
        float g=.11+clamp(clamp(p.y,.0,.2)/1.8,.0,1.)+clamp(clamp(-p.y,-.2,.2)*c/1.8,.0,1.);
        vec3 light=clamp(col+a*g+b*.46, .0, 1.);
        col=mix(background(uv),light,S(.0,1.,a+b)*.16);
    } else {
        col=background(uv);
    }
    col=mix(col,vec3(dot(col,vec3(.21,.71,.07))),S(.0,2.,clamp(length(uv),.0,1.)));
    uv=2.*FC/R-1.;
    uv*=.84;
    uv*=uv*uv*uv;
    col=mix(vec3(0),col,min(time*.3,1.));
    O=vec4(col,1);
}`),s=i.createProgram();if(i.attachShader(s,a),i.attachShader(s,o),i.linkProgram(s),!i.getProgramParameter(s,i.LINK_STATUS))throw Error(i.getProgramInfoLog(s)||`Shader link failed`);let c=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,c),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,1,-1,-1,1,1,1,-1]),i.STATIC_DRAW);let l=i.getAttribLocation(s,`position`),u={time:i.getUniformLocation(s,`time`),zoom:i.getUniformLocation(s,`zoom`),resolution:i.getUniformLocation(s,`resolution`),move:i.getUniformLocation(s,`move`),pointerCount:i.getUniformLocation(s,`pointerCount`)};i.enableVertexAttribArray(l),i.vertexAttribPointer(l,2,i.FLOAT,!1,0,0);let d=1,f=1,p=0,m=!1,h=!1,g=performance.now(),_=!1,v=!1,y=0,b=0,x=0,S=0,C=0,w=(e=performance.now())=>{h||(i.viewport(0,0,d,f),i.useProgram(s),i.uniform2f(u.resolution,d,f),i.uniform1f(u.time,(e-g)*.001),i.uniform1f(u.zoom,x),i.uniform2f(u.move,y,b),i.uniform1i(u.pointerCount,v||_?1:0),i.drawArrays(i.TRIANGLE_STRIP,0,4))},T=e=>{m&&!h&&(w(e),p=window.requestAnimationFrame(T))},E=e=>{let n=t.getBoundingClientRect(),r=e.clientX-n.left,i=e.clientY-n.top;v&&(y+=(r-S)*.5,b+=(C-i)*.5),S=r,C=i},D=e=>{_=!0,E(e)},O=e=>{_=!0,E(e)},k=()=>{_=!1,v=!1},A=e=>{v=!0,E(e)},j=()=>{v=!1},M=e=>{x=Math.max(-1,Math.min(1,x+e.deltaY*.0015))};return t.addEventListener(`pointerenter`,D,{passive:!0}),t.addEventListener(`pointermove`,O,{passive:!0}),t.addEventListener(`pointerleave`,k,{passive:!0}),t.addEventListener(`pointerdown`,A),t.addEventListener(`pointerup`,j),t.addEventListener(`pointercancel`,j),t.addEventListener(`wheel`,M,{passive:!0}),{start(){if(!(h||m)){if(r.reduceMotion){w();return}m=!0,p=window.requestAnimationFrame(T)}},stop(){!h&&m&&(m=!1,p&&window.cancelAnimationFrame(p),p=0)},reset(){h||(y=0,b=0,x=0,g=performance.now(),w())},destroy(){h||(this.stop(),h=!0,t.removeEventListener(`pointerenter`,D),t.removeEventListener(`pointermove`,O),t.removeEventListener(`pointerleave`,k),t.removeEventListener(`pointerdown`,A),t.removeEventListener(`pointerup`,j),t.removeEventListener(`pointercancel`,j),t.removeEventListener(`wheel`,M),i.deleteBuffer(c),i.deleteProgram(s),i.deleteShader(a),i.deleteShader(o))},setSize(e,n,i=1){if(h)return;let a=Math.min(r.maxPixelRatio,Math.max(1,i||1));d=Math.max(1,Math.round(e*a)),f=Math.max(1,Math.round(n*a)),t.width=d,t.height=f,t.style.width=`100%`,t.style.height=`100%`,w()},setInteractionEnabled(e){h||(t.style.pointerEvents=e?`auto`:`none`)}}}export{t as createHighDimensionalPearlEngine};