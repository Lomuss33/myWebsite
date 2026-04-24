import{a as Pe,p as Fe,P as Ae,W as _e,A as ke,S as Be,l as Ue,o as m,q as We,d as p,r as De,s as q,t as d,u as Ge,G as Ie,D as k,T as se,n as ce,I as Xe,v as ve,w as Ve,x as ue,C as Ye,y as je}from"./three.module-BHNaTqMO.js";const Ee=`
varying vec2  vUv;
varying float vDepth;
uniform float uTime;
uniform float uSpeed;
uniform float uWarpX;
uniform float uWarpY;
void main() {
    vUv = uv;
    vec3 pos = position;
    float warpTime = uTime * 0.35 * uSpeed;
    pos.x += sin(pos.z * 0.018 + warpTime) * (5.5 + uWarpX * 4.0);
    pos.y += cos(pos.z * 0.018 + warpTime) * (5.5 + uWarpY * 4.0);
    pos.x += sin(pos.z * 0.055 + warpTime * 1.7) * (1.8 + uWarpX * 2.0);
    pos.y += cos(pos.z * 0.055 + warpTime * 1.7) * (1.8 + uWarpY * 2.0);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    vDepth = -mvPosition.z;
}
`,Re=`
uniform float uTime;
uniform float uSpeed;
uniform float uBurst;
varying vec2  vUv;
varying float vDepth;

vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289v4(((x*34.)+10.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);
    const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289v3(i);
    vec4 p=permute(permute(permute(
        i.z+vec4(0.,i1.z,i2.z,1.))
        +i.y+vec4(0.,i1.y,i2.y,1.))
        +i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.;
    vec4 s1=floor(b1)*2.+1.;
    vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
    m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){
    float f=0.; float a=0.5;
    for(int i=0;i<6;i++){ f+=a*snoise(p); p*=2.02; a*=0.5; }
    return f;
}
float ridge(float h){ h=abs(h); h=1.-h; return h*h; }

void main() {
    float t = uTime * 0.9 * uSpeed;
    float z = vUv.y * 14.0 - t * 3.5;
    float angle = vUv.x * 6.2831853;
    angle += sin(z * 0.18) * 2.2 + cos(z * 0.08) * 1.1;

    vec3 p = vec3(cos(angle), sin(angle), z);
    vec3 color = vec3(0.0);

    float nBase = snoise(p * 0.35 + vec3(0., 0., t * 0.18));
    vec3 baseA = vec3(0.01, 0.005, 0.06);
    vec3 baseB = vec3(0.06, 0.02, 0.18);
    color += mix(baseA, baseB, nBase * 0.5 + 0.5);

    vec3 pFib = vec3(cos(angle)*4.5, sin(angle)*4.5, z * 0.13);
    float nFib = snoise(pFib + vec3(0., 0., t * 1.1));
    float nFib2 = snoise(pFib * 1.5 - vec3(0., 0., t * 0.7));
    float fib = pow(smoothstep(0.32, 0.82, nFib), 2.2);
    float fib2 = pow(smoothstep(0.38, 0.88, nFib2), 2.0);
    color += vec3(0.0, 0.85, 1.0) * fib * 2.2;
    color += vec3(1.0, 0.12, 0.72) * fib2 * 2.0;
    color += vec3(0.65, 0.25, 1.0) * fib * fib2 * 2.8;

    float zD1 = z * 2.6 + snoise(p * 1.4 - vec3(0., 0., t)) * 2.2;
    float zD2 = z * 3.8 + snoise(p * 2.0 + vec3(0., 0., t * 1.3)) * 1.5;
    float rings1 = smoothstep(0.94, 1.0, abs(sin(zD1)));
    float rings2 = smoothstep(0.96, 1.0, abs(sin(zD2)));
    rings1 *= smoothstep(0.2, 1.0, snoise(p*2.0+vec3(t))*0.5+0.5);
    rings2 *= smoothstep(0.3, 1.0, snoise(p*2.5-vec3(t*0.8))*0.5+0.5);
    color += vec3(1.0, 0.75, 0.25) * rings1 * 2.5;
    color += vec3(0.15, 1.0, 0.82) * rings2 * 2.2;
    float rings = rings1 + rings2;

    float betweenMask = 1.0 - smoothstep(0.01, 0.20, rings);
    betweenMask *= 1.0 - smoothstep(0.03, 0.28, fib + fib2);
    betweenMask = clamp(betweenMask, 0.0, 1.0);

    float cloud1 = fbm(vec3(cos(angle)*1.3, sin(angle)*1.3, z*0.40 - t*0.07));
    float cloud2 = fbm(vec3(cos(angle*2.)*2.2, sin(angle*2.)*2.2, z*0.90 + t*0.04));
    float clouds = smoothstep(-0.18, 0.72, cloud1*0.65 + cloud2*0.35);
    vec3 cloudCol = mix(vec3(0.02, 0.01, 0.07), vec3(0.10, 0.04, 0.20), clouds);
    cloudCol = mix(cloudCol, vec3(0.04, 0.06, 0.22), smoothstep(0.5, 1.0, clouds));
    cloudCol += vec3(0.0, 0.04, 0.12) * smoothstep(0.6, 1.0, clouds);
    color += cloudCol * betweenMask * 0.7;

    float fil1 = ridge(snoise(vec3(cos(angle)*3.5, sin(angle)*3.5, z*0.70 - t*0.4)));
    float fil2 = ridge(snoise(vec3(cos(angle)*7.0, sin(angle)*7.0, z*1.30 + t*0.16)));
    float fil3 = ridge(snoise(vec3(cos(angle)*12., sin(angle)*12., z*2.20 - t*0.55)));
    float filaments = smoothstep(0.68, 0.90, fil1*0.5 + fil2*0.32 + fil3*0.18);
    vec3 filCol = mix(vec3(0.3, 0.1, 0.8), vec3(0.0, 0.8, 1.0), 0.5 + 0.5*sin(z*0.7 - t*0.45));
    filCol = mix(filCol, vec3(1.0, 0.3, 0.7), 0.5+0.5*cos(z*0.5 + t*0.3));
    color += filCol * filaments * betweenMask * 0.38;

    float dustA = snoise(vec3(cos(angle)*20., sin(angle)*20., z*4.5 - t*2.8));
    float dustB = snoise(vec3(cos(angle)*32., sin(angle)*32., z*7.0 + t*3.2));
    float dustC = snoise(vec3(cos(angle*3.)*15., sin(angle*3.)*15., z*5.5 - t*1.9));
    float dustSpark = smoothstep(0.88, 0.99, dustA) + smoothstep(0.90, 0.99, dustB) * 0.6 + smoothstep(0.91, 0.99, dustC) * 0.4;
    vec3 sparkCol = mix(vec3(1.0, 0.7, 0.3), vec3(0.5, 0.9, 1.0), fract(angle + z * 0.2));
    color += sparkCol * dustSpark * betweenMask * 0.65;

    float nS = snoise(p * 28.0 - vec3(0., 0., t * 4.5));
    float nS2 = snoise(p * 42.0 + vec3(0., 0., t * 6.0));
    color += vec3(0.88, 0.92, 1.0) * smoothstep(0.90, 1.0, nS) * 1.4;
    color += vec3(1.0, 0.72, 0.88) * smoothstep(0.92, 1.0, nS2) * 1.1;

    float edgeGlow = smoothstep(0.88, 0.97, abs(sin(zD1 + 0.05)));
    color += vec3(0.0, 1.0, 0.9) * edgeGlow * 0.5;

    float radial = 1.0 - abs(vUv.x - 0.5) * 1.8;
    radial = max(radial, 0.0);
    color += vec3(0.05, 0.02, 0.12) * radial * 0.5;

    color = max(color, 0.0);
    color = pow(color, vec3(1.08));
    float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
    color = mix(vec3(lum), color, 1.25);
    float fog = smoothstep(18.0, 140.0, vDepth);
    color = mix(color, vec3(0.0), fog);
    color += vec3(0.7, 0.5, 1.0) * uBurst * (1.0 - fog) * 0.9;
    gl_FragColor = vec4(color, 1.0);
}
`,B=`
varying vec2 vUv; varying vec3 vPos;
void main() { vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,pe=`
uniform float uTime;
varying vec2 vUv;
void main() {
    float t = uTime;
    float band = sin(vUv.x * 55.0 - t * 6.0) * 0.5 + 0.5;
    float band2 = sin(vUv.x * 23.0 + t * 3.5) * 0.5 + 0.5;
    float band3 = sin(vUv.x * 8.0 - t * 1.2) * 0.5 + 0.5;
    float rim = pow(abs(sin(vUv.y * 3.14159)), 2.5);
    float pulse = 0.55 + 0.45 * sin(t * 2.8);
    vec3 c1 = vec3(0.0, 0.85, 1.0);
    vec3 c2 = vec3(0.95, 0.10, 0.80);
    vec3 c3 = vec3(1.00, 0.80, 0.20);
    vec3 c4 = vec3(0.40, 0.15, 1.0);
    vec3 col = mix(c1, c2, band);
    col = mix(col, c3, band2 * 0.45);
    col = mix(col, c4, band3 * 0.3);
    col += vec3(1.0) * rim * pulse * 2.5;
    col *= 0.8 + 0.4 * pulse;
    gl_FragColor = vec4(col, 1.0);
}
`,qe=`
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
void main() {
    float rim = pow(abs(sin(vUv.y * 3.14159)), 2.2);
    float pulse = 0.5 + 0.5 * sin(uTime * 2.2 + vUv.x * 12.0);
    float shimmer = 0.5 + 0.5 * sin(uTime * 5.0 + vUv.x * 40.0);
    vec3 col = uColor * (2.0 + 0.8 * pulse) + uColor * shimmer * 0.4;
    float alpha = rim * (0.65 + 0.35 * pulse);
    gl_FragColor = vec4(col, alpha);
}
`,Ke=`
uniform float uTime;
varying vec2 vUv;
void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    float t = uTime;
    float petals = pow(cos(a * 16.0 - t * 0.9) * 0.5 + 0.5, 3.5);
    float petals2 = pow(cos(a * 7.0 + t * 1.3) * 0.5 + 0.5, 4.0);
    float rings = smoothstep(0.78, 1.0, abs(sin(r * 24.0 - t * 3.0)));
    float mask = smoothstep(1.0, 0.82, r) * smoothstep(0.0, 0.10, r);
    vec3 c1 = vec3(0.0, 0.8, 1.0);
    vec3 c2 = vec3(1.0, 0.2, 0.9);
    vec3 c3 = vec3(1.0, 0.9, 0.3);
    vec3 col = mix(c1, c2, r);
    col = mix(col, c3, petals2 * 0.35);
    col += vec3(1.0, 0.85, 0.5) * rings * 3.0;
    col *= (petals * 0.6 + petals2 * 0.4) * mask;
    float alpha = (petals * 0.5 + petals2 * 0.3 + rings * 1.1) * mask;
    gl_FragColor = vec4(col, alpha);
}
`,Le=`
uniform float uTime;
varying vec2 vUv;
void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    float p1 = 0.5 + 0.5 * sin(uTime * 1.6 + a * 3.0);
    float p2 = 0.5 + 0.5 * sin(uTime * 2.4 - a * 5.0);
    float glow = exp(-r * 2.8) * (0.5 + 0.5 * p1);
    float rim = exp(-(r - 0.78) * (r - 0.78) * 40.0) * (0.6 + 0.4 * p2);
    vec3 colA = vec3(0.1, 0.05, 0.9);
    vec3 colB = vec3(0.0, 0.8, 1.0);
    vec3 colC = vec3(1.0, 0.15, 0.7);
    vec3 col = mix(colA, colB, r * 0.8);
    col = mix(col, colC, p2 * 0.4);
    float alpha = (glow + rim) * 0.7;
    gl_FragColor = vec4(col * (glow + rim), alpha);
}
`,Ne=`
attribute float aSpeed;
attribute float aSize;
attribute vec3 aColor;
uniform float uTime;
uniform float uSpeed;
varying vec3 vColor;
varying float vAlpha;
void main() {
    vColor = aColor;
    vec3 pos = position;
    float z = mod(pos.z + uTime * aSpeed * 60.0 * uSpeed, 220.0) - 110.0;
    pos.z = z;
    float alpha = 1.0 - smoothstep(0.0, 30.0, abs(z + 50.0));
    vAlpha = alpha * 0.9;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (280.0 / -mv.z) * (0.8 + uSpeed * 0.5);
    gl_Position = projectionMatrix * mv;
}
`,Oe=`
varying vec3 vColor;
varying float vAlpha;
void main() {
    vec2 uv = gl_PointCoord * 2.0 - 1.0;
    float dist = length(uv);
    float glow = exp(-dist * dist * 3.0);
    float hard = smoothstep(0.8, 0.2, dist);
    gl_FragColor = vec4(vColor, (glow + hard * 0.4) * vAlpha);
}
`;function He(fe,me={}){const de=!!me.reduceMotion;let x=null,s=null,i=null,f=null,U=null,W=null,K=null,D=null,c=[],L=null,N=null,G=null,I=null,O=[],a=null,b=new ue,h=!1,M=null,S=1,C=1,Z=0,H=0,X=0,V=0,T=0,P=0,g=1,v=1,Y=0,F=0,j=0,w=0;function xe(){x=new Pe,x.fog=new Fe(0,.0045),s=new Ae(72,1,.1,1e3),s.position.set(0,0,50),i=new _e({canvas:fe,antialias:!0,powerPreference:"high-performance"}),i.toneMapping=ke,i.toneMappingExposure=.88,i.outputColorSpace=Be;const e=new Ue(13,13,260,80,160,!0);e.rotateX(Math.PI/2),e.translate(0,0,-55),f=new m({vertexShader:Ee,fragmentShader:Re,uniforms:{uTime:{value:0},uSpeed:{value:1},uWarpX:{value:0},uWarpY:{value:0},uBurst:{value:0}},side:We}),U=new p(e,f),x.add(U);const n=2600,r=new Float32Array(n*3),u=new Float32Array(n),t=new Float32Array(n),l=new Float32Array(n*3),ae=[[0,.85,1],[1,.15,.72],[.7,.3,1],[1,.75,.25],[.15,1,.75],[1,1,1]];for(let o=0;o<n;o++){const E=3+Math.random()*9.5,R=Math.random()*Math.PI*2;r[o*3+0]=Math.cos(R)*E,r[o*3+1]=Math.sin(R)*E,r[o*3+2]=(Math.random()-.5)*220,u[o]=.3+Math.random()*.9,t[o]=1.5+Math.random()*3.5;const _=ae[Math.floor(Math.random()*ae.length)];l[o*3+0]=_[0],l[o*3+1]=_[1],l[o*3+2]=_[2]}const A=new De;A.setAttribute("position",new q(r,3)),A.setAttribute("aSpeed",new q(u,1)),A.setAttribute("aSize",new q(t,1)),A.setAttribute("aColor",new q(l,3)),W=new m({vertexShader:Ne,fragmentShader:Oe,uniforms:{uTime:{value:0},uSpeed:{value:1}},transparent:!0,blending:d,depthWrite:!1,vertexColors:!0}),x.add(new Ge(A,W)),a=new Ie,a.position.set(0,0,-165),x.add(a);const ne=new m({vertexShader:B,fragmentShader:pe,uniforms:{uTime:{value:0}},side:k});K=new p(new se(9.5,.85,320,32,3,5),ne),a.add(K);const le=new m({vertexShader:B,fragmentShader:pe,uniforms:{uTime:{value:1.2}},side:k,transparent:!0,blending:d,depthWrite:!1,opacity:.45});D=new p(new se(12,.5,260,24,2,7),le),a.add(D);function z(o,E,R,_,Ce){const Te=new m({vertexShader:B,fragmentShader:qe,uniforms:{uTime:{value:0},uColor:{value:new Ye(R)}},transparent:!0,blending:d,depthWrite:!1,side:k}),$=new p(new je(o,E,8,160),Te);return $.rotation.x=_,$.rotation.y=Ce,$}c=[z(14,.1,55551,0,0),z(14,.1,16720072,Math.PI/2,0),z(14,.1,16762930,Math.PI/4,Math.PI/4),z(10.5,.08,6967551,0,Math.PI/3),z(17.5,.07,2162636,Math.PI/3,Math.PI/6),z(17.5,.07,16728160,Math.PI*.6,Math.PI/5)];for(const o of c)a.add(o);L=new m({vertexShader:B,fragmentShader:Ke,uniforms:{uTime:{value:0}},transparent:!0,blending:d,depthWrite:!1,side:k});const ie=new p(new ce(38,38),L);ie.position.z=-1,a.add(ie),G=new p(new Xe(5.5,1),new ve({color:11206655,wireframe:!0,blending:d,depthWrite:!1,transparent:!0,opacity:.5})),a.add(G),I=new p(new Ve(7.5,1),new ve({color:16744703,wireframe:!0,blending:d,depthWrite:!1,transparent:!0,opacity:.35})),a.add(I),N=new m({vertexShader:B,fragmentShader:Le,uniforms:{uTime:{value:0}},transparent:!0,blending:d,depthWrite:!1,side:k});const re=new p(new ce(80,80),N);re.position.z=-4,a.add(re),O=[ne,le,L,N,...c.map(o=>o.material)],b=new ue}function y(){const e=b.getElapsedTime();Math.min(b.getDelta(),.05),w*=.93;const n=g+w;v+=(n-v)*.06,Y*=.93,T+=(X*.012-T)*.08,P+=(V*.012-P)*.08,X*=.85,V*=.85,s.position.x=Z*.15,s.position.y=H*.15;const r=Math.max(0,v-1)*6;s.position.z=50-r+Math.sin(e*.22)*4,s.lookAt(0,0,0);const u=e*1.85+Math.max(0,v-1)*.75;f.uniforms.uTime.value=u,f.uniforms.uSpeed.value=Math.max(.1,v),f.uniforms.uWarpX.value=T,f.uniforms.uWarpY.value=P,f.uniforms.uBurst.value=Y,W.uniforms.uTime.value=e*1.25,W.uniforms.uSpeed.value=Math.max(.1,v),U&&(U.rotation.z=e*.04*v);for(let l=0;l<O.length;l++)O[l].uniforms.uTime.value=u+l*.3;F*=.92,j+=F;const t=.8+v*.5;a.rotation.z=j+e*.08*t,a.rotation.x=Math.sin(e*.14)*(.14+Math.abs(P)*.5),a.rotation.y=Math.cos(e*.1)*(.14+Math.abs(T)*.5),K.rotation.z=e*.28*t,D.rotation.z=-e*.18*t,D.rotation.x=e*.1,G.rotation.x=e*.5*t,G.rotation.y=e*.35,I.rotation.x=-e*.42*t,I.rotation.z=e*.28,c[0].rotation.z=e*.2*t,c[1].rotation.z=-e*.17*t,c[2].rotation.z=e*.13,c[3].rotation.z=-e*.25*t,c[4].rotation.z=e*.09,c[5].rotation.z=-e*.11*t,i.render(x,s)}function ee(){h&&(y(),M=requestAnimationFrame(ee))}function he(e,n,r=1){S=Math.max(1,Math.floor(e||1)),C=Math.max(1,Math.floor(n||1));const u=Math.max(1,Math.min(Number(r)||1,2));s.aspect=S/C,s.updateProjectionMatrix(),i.setPixelRatio(u),i.setSize(S,C,!1),y()}function ge(e,n,r=0,u=0){const t=e*S,l=n*C;Z=(t/S-.5)*14,H=(l/C-.5)*-9,X=r,V=u,h||y()}function oe(){Z=0,H=0}function J(){Y=1.2,g=3.5,window.clearTimeout(J.__timer),J.__timer=window.setTimeout(()=>{g=1},600)}function Q(){g=-1.5,window.clearTimeout(Q.__timer),Q.__timer=window.setTimeout(()=>{g=1},700)}function we(e){w+=e,w=Math.max(-2.5,Math.min(4,w))}function ye(e){F=e*.008,j+=F}function ze(){g=1,v=1,Y=0,X=0,V=0,T=0,P=0,F=0,j=0,w=0,oe(),h||y()}function be(){y()}function Me(){if(de){y();return}h||(b.start(),h=!0,M=requestAnimationFrame(ee))}function te(){h=!1,M!=null&&cancelAnimationFrame(M),M=null,b.stop()}function Se(){te(),i==null||i.dispose()}return xe(),{start:Me,stop:te,destroy:Se,reset:ze,renderStatic:be,setSize:he,setPointer:ge,clearPointer:oe,boost:J,reverseBurst:Q,addScrollBoost:we,drag:ye}}export{He as createTardisWormholeEngine};
