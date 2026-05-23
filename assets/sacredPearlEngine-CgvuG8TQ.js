import{j as ee,W as te,S as oe,a as ae,P as re,k as ne,G as I,c as se,b as ie,d as _,l as q,m as T,n as O,o as ce,T as le,p as $,q as W,r as me,g as X,s as Y,V as b,t as B,u as ve,C as E,v as Z,w as ue,x as U,y as pe,z as fe,D as xe,I as de,O as he,J as k,e as ye,K as ge,Q as we,R as be,U as ze,X as Ce,Y as Me,Z as Se,_ as Pe,$ as V}from"./three-Dyw0HQ4s.js";const L=`
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
`,Ae=`
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
`,De=`
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
`,H=2.399963229728653;function j(i,e,a){return Math.max(e,Math.min(a,i))}function A(i,e,a,r){const o=Number(i);return Number.isFinite(o)?Math.max(e,Math.min(a,Math.floor(o))):r}function G(i){var a;if(!i)return;["map","normalMap","alphaMap","bumpMap","roughnessMap","metalnessMap","emissiveMap","envMap"].forEach(r=>{var o,n;return(n=(o=i[r])==null?void 0:o.dispose)==null?void 0:n.call(o)}),Object.values(i.userData||{}).forEach(r=>{var o;return(o=r==null?void 0:r.dispose)==null?void 0:o.call(r)}),(a=i.dispose)==null||a.call(i)}function Fe(i){var e;(e=i==null?void 0:i.traverse)==null||e.call(i,a=>{var o,n;(n=(o=a.geometry)==null?void 0:o.dispose)==null||n.call(o);const r=a.material;Array.isArray(r)?r.forEach(G):G(r)})}function K(i){const e=new ze(new Float32Array(i),i.length/4,1,Ce,Me);return e.wrapS=Se,e.minFilter=e.magFilter=Pe,e.needsUpdate=!0,e}class _e extends me{constructor(e,a){const r=new X().moveTo(1,0).bezierCurveTo(1.5,1,.25,1,.05,3).getSpacedPoints(512).map(t=>[t.x,t.y-.5,0,0]).flat(),o=K(r),n=[],v=new Y().setFromPoints(Array.from({length:e},()=>(n.push(Math.random(),Math.random(),Math.random()),new b)));v.setAttribute("inits",new B(n,3));const l=new ve({size:.034,transparent:!0,color:new E(1,.75,.25),depthWrite:!1,onBeforeCompile:t=>{t.uniforms.time=a.time,t.uniforms.curveTexture={value:o},t.vertexShader=`
                    uniform float time;
                    uniform sampler2D curveTexture;
                    attribute vec3 inits;
                    varying float vOpacity;
                    varying float vBlur;
                    ${L}
                    ${t.vertexShader}
                `.replace("#include <begin_vertex>",`#include <begin_vertex>
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
                    vBlur = smoothstep(0.25, 1.0, currentU);`).replace("gl_PointSize = size;","gl_PointSize = size * (1.0 + 3.0 * smoothstep(0.0, 1.0, currentU));"),t.fragmentShader=`
                    varying float vOpacity;
                    varying float vBlur;
                    ${t.fragmentShader}
                `.replace("vec4 diffuseColor = vec4( diffuse, opacity );",`float dist = length(gl_PointCoord.xy - 0.5);
                    if (dist > 0.5) discard;
                    float fOpacity = 1.0 - smoothstep(0.25 - (0.25 * vBlur), 0.5, dist);
                    vec4 diffuseColor = vec4(diffuse, opacity * vOpacity * fOpacity);`)}});l.userData.curveTexture=o,super(v,l)}}class Ne{constructor(){this.points=[],this.widths=[];const e=2,a=2,r=24,o=9,n=e/r,v=a/o;for(let l=0;l<r;l++){const t=1-Math.abs(l/(r-1)-.5)/.5,h=-23*.5+l,u=new Z(Array.from({length:o},(s,c)=>new b(h+(Math.random()-.5)*3,c,0))),d=s=>1-Math.sqrt(1- --s*s),m=84,f=m-Math.floor(m*.75*d(t)),p=[];for(let s=0;s<f;s++)p.push(u.getPointAt(s/(m-1)));for(let s=0;s<f-1;s++)this.widths.push((s/(f-2))**16*.5+.5);p.forEach(s=>{s.x*=n,s.y*=v,s.y<=a*.5&&(s.x*=V.smoothstep(s.y,0,a*.5)),s.z+=Math.pow(V.smoothstep(s.y,0,a),4);const c=2;s.z+=c-Math.sqrt(c**2-s.x**2)}),this.points.push(...p.map((s,c)=>{const g=[s.clone()];return c!==0&&c!==p.length-1&&g.push(s.clone()),g}).flat())}}}class Re extends I{constructor(e,a,r){var h;super();const o=Array.from({length:e},(u,d)=>{const m=e<=1?0:d/(e-1),f=1-.25*m,p=new Ne,s=new Y().setFromPoints(p.points).scale(f,f,f).rotateX(Math.PI*-.5+Math.PI*.1*m).translate(0,0,-m*.2).rotateY(H*d);return s.setAttribute("widths",new B(p.widths,1)),s}),n=(h=U(o))==null?void 0:h.translate(0,-.9,0);if(o.forEach(u=>u.dispose()),!n)return;const v=new ye(n),l=new ge().fromLineSegments(v);l.setAttribute("widths",new k(n.attributes.widths.array,1));const t=new we({color:new E(1,.375,0),worldUnits:!0,linewidth:.0375,transparent:!0,onBeforeCompile:u=>{u.uniforms.time=a.time,u.vertexShader=`
                    uniform float time;
                    attribute float widths;
                    varying float vWidths;
                    varying vec2 vUv;
                    ${u.vertexShader}
                `.replace("float hw = linewidth * 0.5;",`float hw = linewidth * widths * 0.5;
                    vWidths = widths;
                    vUv = uv;`),u.fragmentShader=`
                    varying float vWidths;
                    varying vec2 vUv;
                    ${u.fragmentShader}
                `.replace("float norm = len / linewidth;","float norm = len / (linewidth * vWidths);").replace("vec4 diffuseColor = vec4( diffuse, alpha );",`vec3 brightCol = vec3(1.0, 0.75, 0.25);
                    float fw = length(fwidth(vUv));
                    vec3 col = mix(diffuse, brightCol, 1.0 - smoothstep(0.0, fw, abs(vUv.x)));
                    col = mix(col, brightCol, smoothstep(0.95, 1.0, vWidths));
                    vec4 diffuseColor = vec4(col, alpha);`)}});r.push(t),this.add(new be(l,t)),n.dispose()}}class Ue extends I{constructor(e,a,r,o){super(),this.add(this.createRoots(a,o)),this.add(this.createFlorals(e,a,r))}createRoots(e,a){const r=e.rootsAmount,o=Math.PI*2/r,n=new b(0,1,0),v=Array.from({length:r},(h,u)=>{let d=H*u,m=(Math.random()*.5+.5)*.5;const f=new Z([new b,...Array.from({length:Math.floor(Math.random()*4)+5},()=>{d+=(Math.random()-.5)*o;const w=new b(1,0,0).applyAxisAngle(n,d).setLength(m);return m+=(Math.random()*.5+.5)*.25,w})].map(w=>w.setY(-1))),p=new ue(f,e.rootTubeSegments,1,e.rootRadialSegments),s=p.attributes.position,c=p.attributes.normal,g=p.attributes.uv,x=new b,z=new b,C=new $;for(let w=0;w<=e.rootTubeSegments;w++)for(let D=0;D<=e.rootRadialSegments;D++){const S=(e.rootRadialSegments+1)*w+D;x.fromBufferAttribute(s,S),z.fromBufferAttribute(c,S),C.fromBufferAttribute(g,S);let P=1-C.x;const N=Math.sqrt(1- --P*P),R=a.noise3d(x.x*.5,x.y*.5,x.z*.5)*.01,F=.05*(N+R);x.addScaledVector(z,-1).addScaledVector(z,F),x.y+=F,s.setXYZ(S,x.x,x.y,x.z)}return p}),l=U(v);v.forEach(h=>h.dispose());const t=new W({color:new E(1,.375,0)});return t.defines={USE_UV:""},new _(l,t)}createFlorals(e,a,r){const o=new pe(e).build(),n=Array.from({length:5},(c,g)=>{const x=new fe(2,1,1,14).translate(0,.5,0).rotateX(Math.PI*.5);return x.setAttribute("geometryID",new B(new Array(x.attributes.position.count).fill(g),1)),x}),v=U(n);n.forEach(c=>c.dispose());const l=K(new X().moveTo(0,0).bezierCurveTo(1,0,-.5,1,1.5,1).getSpacedPoints(255).map(c=>[c.x,c.y,0,0]).flat()),t=new T({side:xe,forceSinglePass:!0,onBeforeCompile:c=>{c.uniforms.time=r.time,c.uniforms.petalCurve={value:l},c.vertexShader=`
                    uniform float time;
                    uniform sampler2D petalCurve;
                    attribute float geometryID;
                    attribute vec4 floralRot;
                    varying float vDist;
                    mat2 rot(float a){return mat2(cos(a), -sin(a), sin(a), cos(a));}
                    float circular(float val){return 1.0 - sqrt(1.0 - val * val);}
                    ${Ae}
                    ${c.vertexShader}
                `.replace("#include <begin_vertex>",`#include <begin_vertex>
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
                    transformed = pos;`),c.fragmentShader=`
                    varying float vDist;
                    ${c.fragmentShader}
                `.replace("#include <opaque_fragment>",`#include <opaque_fragment>
                    vec3 mainCol = gl_FragColor.rgb;
                    vec3 baseCol = mix(vec3(0.75, 0.2, 0.0), vec3(1.0, 0.375, 0.0), smoothstep(0.0, 0.5, abs(vUv.y - 0.5)));
                    baseCol = mix(baseCol, vec3(0.5, 0.1, 0.0), sin(abs(vUv.x - 0.5) * PI2 * 2.0));
                    vec3 col = mix(gl_FragColor.rgb, baseCol, smoothstep(0.5, 1.0, vUv.y));
                    gl_FragColor.rgb = gl_FrontFacing ? baseCol : col;
                    gl_FragColor.rgb = mix(gl_FragColor.rgb * 0.875, mainCol, smoothstep(1.5, 2.75, vDist));`)}});t.defines={USE_UV:""},t.userData.curveTexture=l;const h=new de(v,t,a.floralPointCount),u=new b,d=new b,m=new he,f=[];let p=0,s=0;for(;p<a.floralPointCount&&s<a.floralPointCount*8;){s++,o.sample(u,d);const c=u.length();c>2.75||c<1.5||(f.push(Math.random()*2-1,Math.random()*2-1,Math.random()*2-1,Math.random()*2-1),m.position.copy(u),m.lookAt(u.clone().addScaledVector(d,-1)),m.scale.setScalar((Math.random()*.5+.5)**1*.1),m.updateMatrix(),h.setMatrixAt(p,m.matrix),p++)}return v.setAttribute("floralRot",new k(new Float32Array(f),4)),h}}class Ie extends _{constructor(e){const a=new W({color:"#000",onBeforeCompile:r=>{r.uniforms.time=e.time,r.vertexShader=`
                    varying vec3 vPos;
                    varying vec3 mvPos;
                    varying vec3 vNor;
                    ${r.vertexShader}
                `.replace("#include <begin_vertex>",`#include <begin_vertex>
                    vPos = position;
                    mvPos = -vec3(modelViewMatrix * vec4(position, 1.0));
                    vNor = normalMatrix * normal;`),r.fragmentShader=`
                    uniform float time;
                    varying vec3 vPos;
                    varying vec3 mvPos;
                    varying vec3 vNor;
                    ${L}
                    ${De}
                    ${r.fragmentShader}
                `.replace("#include <color_fragment>",`#include <color_fragment>
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
                    diffuseColor.rgb = col;`)}});a.defines={USE_UV:""},super(new q(.75,48,24),a),this.position.y=-.2}}class Te extends _{constructor(e){const a=new ce(3,3,6,3,1,!0).rotateX(Math.PI*.5).rotateZ(Math.PI).translate(0,.5,0).toNonIndexed();a.computeVertexNormals();const r=new T({color:"#fff",side:O,normalMap:new le,normalScale:new $().setScalar(.25),onBeforeCompile:o=>{o.uniforms.time=e.time,o.fragmentShader=`
                    uniform float time;
                    ${L}
                    float getNoise(vec2 p){
                        return snoise(vec3(p, time * 0.4));
                    }
                    ${o.fragmentShader}
                `.replace("#include <normal_fragment_maps>",`vec2 nMapUv = vNormalMapUv.xy * vec2(PI, 1.0) * 10.0;
                    vec3 mapN = vec3(getNoise(nMapUv), getNoise(nMapUv + 100.0), 1.0);
                    mapN = normalize(mapN);
                    mapN.xy *= normalScale;
                    normal = normalize(tbn * mapN);`)}});super(a,r)}}class Be extends I{constructor(e,a,r,o){super();const n=new se(16760970,3.7,3,4);n.position.set(0,-.25,0),this.add(n),this.add(new ie(16766122,.075)),this.add(new _(new q(200,24,12),new T({color:"#f3f0ea",side:O})));const v=new Te(a);this.add(v),this.add(new Ie(a)),this.add(new _e(e.vaporParticleCount,a)),this.add(new Ue(v,e,a,o)),this.add(new Re(e.petalLayerCount,a,r))}}function Le(i,e={}){const a=!!e.reduceMotion,r={vaporParticleCount:A(e.vaporParticleCount,200,5e3,1800),floralPointCount:A(e.floralPointCount,200,5e3,1600),petalLayerCount:A(e.petalLayerCount,3,12,7),rootsAmount:A(e.rootsAmount,4,24,12),rootTubeSegments:A(e.rootTubeSegments,24,150,70),rootRadialSegments:A(e.rootRadialSegments,4,16,7),maxPixelRatio:Number.isFinite(e.maxPixelRatio)?j(e.maxPixelRatio,1,2):1.25},o={time:{value:0},timeDelta:{value:0}};let n=null,v=null,l=null,t=null,h=null,u=!1,d=null,m=0,f=1,p=1,s=0,c=!0,g=[],x=null;function z(){n||(x=new ee,n=new te({canvas:i,antialias:!0,alpha:!1,powerPreference:"high-performance"}),n.setClearColor(15986922,1),n.outputColorSpace=oe,v=new ae,l=new re(45,1,.1,1e3),l.position.set(0,1,.12).setLength(4.4),t=new ne(l,i),t.enableDamping=!0,t.enablePan=!1,t.minDistance=3,t.maxDistance=6,t.maxPolarAngle=Math.PI*.5,t.enabled=c,h=new Be(r,o,g,x),v.add(h))}function C(){!n||!v||!l||(g.forEach(y=>{y.resolution.set(f,p)}),t==null||t.update(),n.render(v,l))}function w(y){if(!u)return;m<=0&&(m=y);const M=Math.min(.05,Math.max(.001,(y-m)/1e3));m=y,s+=M,o.time.value=s,o.timeDelta.value=M,C(),d=requestAnimationFrame(w)}function D(y,M,J=1){f=Math.max(1,Math.floor(y||1)),p=Math.max(1,Math.floor(M||1));const Q=j(Number(J)||1,1,r.maxPixelRatio);z(),n.setPixelRatio(Q),n.setSize(f,p,!1),l.aspect=f/p,l.updateProjectionMatrix(),C()}function S(){if(z(),a){C();return}u||(u=!0,m=0,d=requestAnimationFrame(w))}function P(){u=!1,m=0,d!=null&&cancelAnimationFrame(d),d=null}function N(){z(),P(),s=0,o.time.value=0,o.timeDelta.value=0,l.position.set(0,1,.12).setLength(4.4),t==null||t.target.set(0,0,0),C()}function R(y){c=!!y,t&&(t.enabled=c)}function F(){var y,M;P(),(y=t==null?void 0:t.dispose)==null||y.call(t),Fe(v),g=[],(M=n==null?void 0:n.dispose)==null||M.call(n),n=null,v=null,l=null,t=null,h=null,x=null}return{start:S,stop:P,reset:N,destroy:F,setSize:D,setInteractionEnabled:R}}export{Le as createSacredPearlEngine};
