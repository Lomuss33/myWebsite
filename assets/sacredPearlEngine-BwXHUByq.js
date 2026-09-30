import{$ as e,C as t,F as n,H as r,I as i,M as a,O as o,R as s,S as c,U as l,V as u,W as d,X as f,Z as p,_t as m,a as h,b as g,ct as _,d as v,dt as y,et as b,f as x,ft as S,g as C,gt as w,ht as T,i as E,it as D,k as O,n as k,nt as A,o as j,ot as M,q as N,r as P,s as F,st as I,t as L,tt as R,v as z,z as B}from"./three-B_u8Y0V2.js";var V=`
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`,H=`
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

vec4 grad4(float j, vec4 ip){
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;
  p.xyz = floor(fract(vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz * 2.0 - 1.0) * s.www;
  return p;
}

float snoise(vec4 v){
  const vec2 C = vec2(0.138196601125010504, 0.309016994374947451);
  vec4 i = floor(v + dot(v, C.yyyy));
  vec4 x0 = v - i + dot(i, C.xxxx);
  vec4 i0;
  vec3 isX = step(x0.yzw, x0.xxx);
  vec3 isYZ = step(x0.zww, x0.yyz);
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;
  vec4 i3 = clamp(i0, 0.0, 1.0);
  vec4 i2 = clamp(i0 - 1.0, 0.0, 1.0);
  vec4 i1 = clamp(i0 - 2.0, 0.0, 1.0);
  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
  vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
  vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;
  i = mod(i, 289.0);
  float j0 = permute(permute(permute(permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute(permute(permute(permute(
    i.w + vec4(i1.w, i2.w, i3.w, 1.0))
    + i.z + vec4(i1.z, i2.z, i3.z, 1.0))
    + i.y + vec4(i1.y, i2.y, i3.y, 1.0))
    + i.x + vec4(i1.x, i2.x, i3.x, 1.0));
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0);
  vec4 p0 = grad4(j0, ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * (dot(m0*m0, vec3(dot(p0,x0), dot(p1,x1), dot(p2,x2))) + dot(m1*m1, vec2(dot(p3,x3), dot(p4,x4))));
}
`,U=`
#define NUM_OCTAVES 5

float fbm(vec3 x) {
  float v = 0.0;
  float a = 0.5;
  vec3 shift = vec3(100.0);
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * snoise(x);
    x = x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}
`,W=2.399963229728653;function G(e,t,n){return Math.max(t,Math.min(n,e))}function K(e,t,n,r){let i=Number(e);return Number.isFinite(i)?Math.max(t,Math.min(n,Math.floor(i))):r}function q(e){var t;e&&([`map`,`normalMap`,`alphaMap`,`bumpMap`,`roughnessMap`,`metalnessMap`,`emissiveMap`,`envMap`].forEach(t=>{var n,r;return(n=e[t])==null||(r=n.dispose)==null?void 0:r.call(n)}),Object.values(e.userData||{}).forEach(e=>{var t;return e==null||(t=e.dispose)==null?void 0:t.call(e)}),(t=e.dispose)==null||t.call(e))}function J(e){var t;e==null||(t=e.traverse)==null||t.call(e,e=>{var t,n;(t=e.geometry)==null||(n=t.dispose)==null||n.call(t);let r=e.material;Array.isArray(r)?r.forEach(q):q(r)})}function Y(e){let n=new t(new Float32Array(e),e.length/4,1,D,O);return n.wrapS=M,n.minFilter=n.magFilter=B,n.needsUpdate=!0,n}var X=class extends R{constructor(e,t){let n=Y(new f().moveTo(1,0).bezierCurveTo(1.5,1,.25,1,.05,3).getSpacedPoints(512).map(e=>[e.x,e.y-.5,0,0]).flat()),r=[],i=new C().setFromPoints(Array.from({length:e},()=>(r.push(Math.random(),Math.random(),Math.random()),new m)));i.setAttribute(`inits`,new o(r,3));let a=new A({size:.034,transparent:!0,color:new g(1,.75,.25),depthWrite:!1,onBeforeCompile:e=>{e.uniforms.time=t.time,e.uniforms.curveTexture={value:n},e.vertexShader=`
                    uniform float time;
                    uniform sampler2D curveTexture;
                    attribute vec3 inits;
                    varying float vOpacity;
                    varying float vBlur;
                    ${V}
                    ${e.vertexShader}
                `.replace(`#include <begin_vertex>`,`#include <begin_vertex>
                    float currentU = fract(inits.x + time * 0.08 * (inits.z * 0.9 + 0.1));
                    vec4 curveData = texture(curveTexture, vec2(currentU, 0.5));
                    float r = curveData.x + inits.z * 0.2 * curveData.y;
                    float a = inits.y * PI2;
                    float x = cos(a);
                    float y = curveData.y;
                    float z = sin(a);
                    float n = snoise(vec3(vec2(x, z) * r, (y * 0.25 - time * 0.08)));
                    n = (pow(abs(n), 0.75) * 0.25) * sign(n);
                    float sway = smoothstep(0.0, 0.5, currentU);
                    a += PI * 0.5 * n * sway;
                    x = cos(a) * r;
                    z = sin(a) * r;
                    transformed = vec3(x, y, z);
                    float of = 1.0 - sqrt(1.0 - (inits.z - 1.0) * inits.z);
                    vOpacity = smoothstep(0.0, 0.25, currentU) - smoothstep(0.5, 1.0 - of * 0.25, currentU);
                    vBlur = smoothstep(0.25, 1.0, currentU);`).replace(`gl_PointSize = size;`,`gl_PointSize = size * (1.0 + 3.0 * smoothstep(0.0, 1.0, currentU));`),e.fragmentShader=`
                    varying float vOpacity;
                    varying float vBlur;
                    ${e.fragmentShader}
                `.replace(`vec4 diffuseColor = vec4( diffuse, opacity );`,`float dist = length(gl_PointCoord.xy - 0.5);
                    if (dist > 0.5) discard;
                    float fOpacity = 1.0 - smoothstep(0.25 - (0.25 * vBlur), 0.5, dist);
                    vec4 diffuseColor = vec4(diffuse, opacity * vOpacity * fOpacity);`)}});a.userData.curveTexture=n,super(i,a)}},Z=class{constructor(){this.points=[],this.widths=[];for(let e=0;e<24;e++){let t=1-Math.abs(e/23-.5)/.5,n=-11.5+e,r=new z(Array.from({length:9},(e,t)=>new m(n+(Math.random()-.5)*3,t,0))),i=84-Math.floor(63*(e=>1-Math.sqrt(1- --e*e))(t)),a=[];for(let e=0;e<i;e++)a.push(r.getPointAt(e/83));for(let e=0;e<i-1;e++)this.widths.push((e/(i-2))**16*.5+.5);a.forEach(e=>{e.x*=.08333333333333333,e.y*=.2222222222222222,e.y<=1&&(e.x*=u.smoothstep(e.y,0,1)),e.z+=u.smoothstep(e.y,0,2)**4,e.z+=2-Math.sqrt(4-e.x**2)}),this.points.push(...a.map((e,t)=>{let n=[e.clone()];return t!==0&&t!==a.length-1&&n.push(e.clone()),n}).flat())}}},Q=class extends a{constructor(e,t,r){var i;super();let a=Array.from({length:e},(t,n)=>{let r=e<=1?0:n/(e-1),i=1-.25*r,a=new Z,s=new C().setFromPoints(a.points).scale(i,i,i).rotateX(Math.PI*-.5+Math.PI*.1*r).translate(0,0,-r*.2).rotateY(W*n);return s.setAttribute(`widths`,new o(a.widths,1)),s}),c=(i=j(a))==null?void 0:i.translate(0,-.9,0);if(a.forEach(e=>e.dispose()),!c)return;let l=new s(c),u=new E().fromLineSegments(l);u.setAttribute(`widths`,new n(c.attributes.widths.array,1));let d=new P({color:new g(1,.375,0),worldUnits:!0,linewidth:.0375,transparent:!0,onBeforeCompile:e=>{e.uniforms.time=t.time,e.vertexShader=`
                    uniform float time;
                    attribute float widths;
                    varying float vWidths;
                    varying vec2 vUv;
                    ${e.vertexShader}
                `.replace(`float hw = linewidth * 0.5;`,`float hw = linewidth * widths * 0.5;
                    vWidths = widths;
                    vUv = uv;`),e.fragmentShader=`
                    varying float vWidths;
                    varying vec2 vUv;
                    ${e.fragmentShader}
                `.replace(`float norm = len / linewidth;`,`float norm = len / (linewidth * vWidths);`).replace(`vec4 diffuseColor = vec4( diffuse, alpha );`,`vec3 brightCol = vec3(1.0, 0.75, 0.25);
                    float fw = length(fwidth(vUv));
                    vec3 col = mix(diffuse, brightCol, 1.0 - smoothstep(0.0, fw, abs(vUv.x)));
                    col = mix(col, brightCol, smoothstep(0.95, 1.0, vWidths));
                    vec4 diffuseColor = vec4(col, alpha);`)}});r.push(d),this.add(new k(u,d)),c.dispose()}},$=class extends a{constructor(e,t,n,r){super(),this.add(this.createRoots(t,r)),this.add(this.createFlorals(e,t,n))}createRoots(e,t){let n=e.rootsAmount,i=Math.PI*2/n,a=new m(0,1,0),o=Array.from({length:n},(n,r)=>{let o=W*r,s=(Math.random()*.5+.5)*.5,c=new z([new m,...Array.from({length:Math.floor(Math.random()*4)+5},()=>{o+=(Math.random()-.5)*i;let e=new m(1,0,0).applyAxisAngle(a,o).setLength(s);return s+=(Math.random()*.5+.5)*.25,e})].map(e=>e.setY(-1))),l=new T(c,e.rootTubeSegments,1,e.rootRadialSegments),u=l.attributes.position,d=l.attributes.normal,f=l.attributes.uv,p=new m,h=new m,g=new w;for(let n=0;n<=e.rootTubeSegments;n++)for(let r=0;r<=e.rootRadialSegments;r++){let i=(e.rootRadialSegments+1)*n+r;p.fromBufferAttribute(u,i),h.fromBufferAttribute(d,i),g.fromBufferAttribute(f,i);let a=1-g.x,o=.05*(Math.sqrt(1- --a*a)+t.noise3d(p.x*.5,p.y*.5,p.z*.5)*.01);p.addScaledVector(h,-1).addScaledVector(h,o),p.y+=o,u.setXYZ(i,p.x,p.y,p.z)}return l}),s=j(o);o.forEach(e=>e.dispose());let c=new l({color:new g(1,.375,0)});return c.defines={USE_UV:``},new r(s,c)}createFlorals(t,r,a){let s=new L(t).build(),c=Array.from({length:5},(t,n)=>{let r=new e(2,1,1,14).translate(0,.5,0).rotateX(Math.PI*.5);return r.setAttribute(`geometryID`,new o(Array(r.attributes.position.count).fill(n),1)),r}),l=j(c);c.forEach(e=>e.dispose());let u=Y(new f().moveTo(0,0).bezierCurveTo(1,0,-.5,1,1.5,1).getSpacedPoints(255).map(e=>[e.x,e.y,0,0]).flat()),p=new d({side:2,forceSinglePass:!0,onBeforeCompile:e=>{e.uniforms.time=a.time,e.uniforms.petalCurve={value:u},e.vertexShader=`
                    uniform float time;
                    uniform sampler2D petalCurve;
                    attribute float geometryID;
                    attribute vec4 floralRot;
                    varying float vDist;
                    mat2 rot(float a){return mat2(cos(a), -sin(a), sin(a), cos(a));}
                    float circular(float val){return 1.0 - sqrt(1.0 - val * val);}
                    ${H}
                    ${e.vertexShader}
                `.replace(`#include <begin_vertex>`,`#include <begin_vertex>
                    vec3 pos = position;
                    vec3 instPos = instanceMatrix[3].xyz;
                    vDist = length(instPos);
                    float growthRatio = snoise(vec4(instPos * 2.0, time * 0.08));
                    growthRatio = clamp(growthRatio, 0.0, 1.0) * 0.85 + 0.15;
                    float localGrowthRatio = uv.y * growthRatio;
                    vec4 petalCurveData = texture(petalCurve, vec2(localGrowthRatio, 0.5));
                    pos.x *= smoothstep(0.0, 0.5, uv.y) - circular(clamp((uv.y - 0.5), 0.0, 0.5) / 0.5);
                    pos.x *= localGrowthRatio;
                    pos.y = petalCurveData.y * 1.5;
                    pos.z = petalCurveData.x;
                    pos.xy *= rot((geometryID * (2.0 / 5.0) + floralRot.x) * PI);
                    transformed = pos;`),e.fragmentShader=`
                    varying float vDist;
                    ${e.fragmentShader}
                `.replace(`#include <opaque_fragment>`,`#include <opaque_fragment>
                    vec3 mainCol = gl_FragColor.rgb;
                    vec3 baseCol = mix(vec3(0.75, 0.2, 0.0), vec3(1.0, 0.375, 0.0), smoothstep(0.0, 0.5, abs(vUv.y - 0.5)));
                    baseCol = mix(baseCol, vec3(0.5, 0.1, 0.0), sin(abs(vUv.x - 0.5) * PI2 * 2.0));
                    vec3 col = mix(gl_FragColor.rgb, baseCol, smoothstep(0.5, 1.0, vUv.y));
                    gl_FragColor.rgb = gl_FrontFacing ? baseCol : col;
                    gl_FragColor.rgb = mix(gl_FragColor.rgb * 0.875, mainCol, smoothstep(1.5, 2.75, vDist));`)}});p.defines={USE_UV:``},p.userData.curveTexture=u;let h=new i(l,p,r.floralPointCount),g=new m,_=new m,v=new N,y=[],b=0,x=0;for(;b<r.floralPointCount&&x<r.floralPointCount*8;){x++,s.sample(g,_);let e=g.length();e>2.75||e<1.5||(y.push(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1,Math.random()*2-1),v.position.copy(g),v.lookAt(g.clone().addScaledVector(_,-1)),v.scale.setScalar((Math.random()*.5+.5)**1*.1),v.updateMatrix(),h.setMatrixAt(b,v.matrix),b++)}return l.setAttribute(`floralRot`,new n(new Float32Array(y),4)),h}},ee=class extends r{constructor(e){let t=new l({color:`#000`,onBeforeCompile:t=>{t.uniforms.time=e.time,t.vertexShader=`
                    varying vec3 vPos;
                    varying vec3 mvPos;
                    varying vec3 vNor;
                    ${t.vertexShader}
                `.replace(`#include <begin_vertex>`,`#include <begin_vertex>
                    vPos = position;
                    mvPos = -vec3(modelViewMatrix * vec4(position, 1.0));
                    vNor = normalMatrix * normal;`),t.fragmentShader=`
                    uniform float time;
                    varying vec3 vPos;
                    varying vec3 mvPos;
                    varying vec3 vNor;
                    ${V}
                    ${U}
                    ${t.fragmentShader}
                `.replace(`#include <color_fragment>`,`#include <color_fragment>
                    vec3 baseCol = vec3(1.0, 0.375, 0.0);
                    vec3 col = vec3(0.0);
                    float fDot = dot(normalize(mvPos), normalize(vNor));
                    float pNoise = fbm(vPos * 0.5 - vec3(0.0, time * 0.05, 0.0));
                    pNoise = 1.0 - pow(abs(pNoise), 0.5);
                    pNoise = smoothstep(0.0, 0.95, pNoise);
                    pNoise = pow(pNoise, 4.0);
                    float fPattern = pNoise * smoothstep(0.0, 0.4, fDot);
                    col = mix(col, vec3(1.0, 0.75, 0.0), fPattern);
                    float haloF = smoothstep(-0.25, 0.4, fDot) - smoothstep(0.4, 0.95, fDot);
                    haloF = pow(haloF, 2.0);
                    col = mix(col, mix(baseCol, vec3(1.0, 0.75, 0.0), pow(smoothstep(0.5, 1.0, haloF), 2.0)), haloF);
                    float fN = snoise(vec3(vPos.xz * 3.0, time * 0.5)) * 0.1;
                    float colF = 1.0 - smoothstep(-0.7 + fN, 0.75, vPos.y);
                    colF = pow(colF, 0.75);
                    colF = 0.1 + colF * 0.9;
                    col = mix(col, baseCol, colF);
                    diffuseColor.rgb = col;`)}});t.defines={USE_UV:``},super(new y(.75,48,24),t),this.position.y=-.2}},te=class extends r{constructor(e){let t=new c(3,3,6,3,1,!0).rotateX(Math.PI*.5).rotateZ(Math.PI).translate(0,.5,0).toNonIndexed();t.computeVertexNormals();let n=new d({color:`#fff`,side:1,normalMap:new S,normalScale:new w().setScalar(.25),onBeforeCompile:t=>{t.uniforms.time=e.time,t.fragmentShader=`
                    uniform float time;
                    ${V}
                    float getNoise(vec2 p){
                        return snoise(vec3(p, time * 0.4));
                    }
                    ${t.fragmentShader}
                `.replace(`#include <normal_fragment_maps>`,`vec2 nMapUv = vNormalMapUv.xy * vec2(PI, 1.0) * 10.0;
                    vec3 mapN = vec3(getNoise(nMapUv), getNoise(nMapUv + 100.0), 1.0);
                    mapN = normalize(mapN);
                    mapN.xy *= normalScale;
                    normal = normalize(tbn * mapN);`)}});super(t,n)}},ne=class extends a{constructor(e,t,n,i){super();let a=new b(16760970,3.7,3,4);a.position.set(0,-.25,0),this.add(a),this.add(new x(16766122,.075)),this.add(new r(new y(200,24,12),new d({color:`#f3f0ea`,side:1})));let o=new te(t);this.add(o),this.add(new ee(t)),this.add(new X(e.vaporParticleCount,t)),this.add(new $(o,e,t,i)),this.add(new Q(e.petalLayerCount,t,n))}};function re(e,t={}){let n=!!t.reduceMotion,r={vaporParticleCount:K(t.vaporParticleCount,200,5e3,1800),floralPointCount:K(t.floralPointCount,200,5e3,1600),petalLayerCount:K(t.petalLayerCount,3,12,7),rootsAmount:K(t.rootsAmount,4,24,12),rootTubeSegments:K(t.rootTubeSegments,24,150,70),rootRadialSegments:K(t.rootRadialSegments,4,16,7),maxPixelRatio:Number.isFinite(t.maxPixelRatio)?G(t.maxPixelRatio,1,2):1.25},i={time:{value:0},timeDelta:{value:0}},a=null,o=null,s=null,c=null,l=null,u=!1,d=null,f=0,m=1,g=1,y=0,b=!0,x=[],S=null;function C(){a||(S=new h,a=new v({canvas:e,antialias:!0,alpha:!1,powerPreference:`high-performance`}),a.setClearColor(15986922,1),a.outputColorSpace=I,o=new _,s=new p(45,1,.1,1e3),s.position.set(0,1,.12).setLength(4.4),c=new F(s,e),c.enableDamping=!0,c.enablePan=!1,c.minDistance=3,c.maxDistance=6,c.maxPolarAngle=Math.PI*.5,c.enabled=b,l=new ne(r,i,x,S),o.add(l))}function w(){a&&o&&s&&(x.forEach(e=>{e.resolution.set(m,g)}),c==null||c.update(),a.render(o,s))}function T(e){if(!u)return;f<=0&&(f=e);let t=Math.min(.05,Math.max(.001,(e-f)/1e3));f=e,y+=t,i.time.value=y,i.timeDelta.value=t,w(),d=requestAnimationFrame(T)}function E(e,t,n=1){m=Math.max(1,Math.floor(e||1)),g=Math.max(1,Math.floor(t||1));let i=G(Number(n)||1,1,r.maxPixelRatio);C(),a.setPixelRatio(i),a.setSize(m,g,!1),s.aspect=m/g,s.updateProjectionMatrix(),w()}function D(){if(C(),n){w();return}u||(u=!0,f=0,d=requestAnimationFrame(T))}function O(){u=!1,f=0,d!=null&&cancelAnimationFrame(d),d=null}function k(){C(),O(),y=0,i.time.value=0,i.timeDelta.value=0,s.position.set(0,1,.12).setLength(4.4),c==null||c.target.set(0,0,0),w()}function A(e){b=!!e,c&&(c.enabled=b)}function j(){var e,t;O(),c==null||(e=c.dispose)==null||e.call(c),J(o),x=[],a==null||(t=a.dispose)==null||t.call(a),a=null,o=null,s=null,c=null,l=null,S=null}return{start:D,stop:O,reset:k,destroy:j,setSize:E,setInteractionEnabled:A}}export{re as createSacredPearlEngine};