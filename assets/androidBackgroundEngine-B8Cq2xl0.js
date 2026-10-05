import{U as e,X as t,_t as n,c as r,ct as i,et as a,f as o,l as s,lt as c,u as l,ut as u,vt as d}from"./three-vm8gaJoa.js";function f(e,t,n){return Math.max(t,Math.min(n,e))}function p(p,m={}){let h=!!m.reduceMotion,g=null,_=null,v=null,y=null,b=null,x=null,S=null,C=!1,w=1,T=1;function E(){v=new o({canvas:p,antialias:!0,alpha:!1,powerPreference:`high-performance`}),v.outputColorSpace=i,v.setClearColor(0,1),v.setPixelRatio(1),g=new c,_=new t(-1,1,1,-1,0,1),b=new u({uniforms:{time:{value:0},resolution:{value:new d(1,1,1)}},vertexShader:`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
        }
    `,fragmentShader:`
        uniform vec3 resolution;
        uniform float time;
        varying vec2 vUv;
        void main() {
            vec2 r_xy = resolution.xy;
            float t = time * 0.7;
            vec2 uv = (gl_FragCoord.xy - 0.5 * r_xy) / r_xy.y;
            vec3 rd = normalize(vec3(uv, 1.0));
            float z = 0.0;
            vec4 o = vec4(0.0);
            for (float i = 0.0; i < 90.0; i++) {
                vec3 p = z * rd;
                p.z += t * 8.0;
                float angle = atan(p.y, p.x);
                float radius = length(p.xy);
                p.x += 0.4 * cos(p.z * 0.2 + radius * 0.6);
                p.y += 0.4 * sin(p.z * 0.2 + radius * 0.6);
                p.x += 0.25 * sin(angle * 9.0 + p.z * 0.4);
                p.y += 0.25 * cos(angle * 9.0 + p.z * 0.4);
                p.x += 0.1 * sin(angle * 20.0 + p.z * 1.0);
                p.y += 0.1 * cos(angle * 20.0 + p.z * 1.0);
                angle = atan(p.y, p.x);
                radius = length(p.xy);
                float d = abs(radius - (1.3 + 0.1 * sin(angle * 6.0 + p.z * 0.1)));
                d += 0.25 * abs(sin(radius * 5.0 - p.z * 0.4 - t * 4.0));
                d += 0.1 * abs(sin(radius * 15.0 - p.z * 1.0 - t * 3.0));
                d = pow(d, 2.2);
                d = max(0.01, d);
                vec3 col = 0.5 + 0.5 * cos(z * 0.15 - t * 2.5 + vec3(0.0, 2.1, 4.2));
                float shade = 0.6 + 0.4 * (p.y / max(0.01, radius));
                col *= shade;
                o += vec4(col, 1.0) / (d * 50.0);
                z += d;
                if (z > 100.0 || o.x > 5.0) break;
            }
            o = tanh(o / 22.0);
            gl_FragColor = vec4(o.rgb, 1.0);
        }
    `}),x=new e(new a(2,2),b),g.add(x),y=new l(v),y.addPass(new s(g,_)),y.addPass(new r(new n(1,1),1.5,.8,.5))}function D(e=performance.now()){v||E(),b&&y&&(b.uniforms.time.value=h?0:e*.001,b.uniforms.resolution.value.set(w,T,1),y.render())}function O(e){C&&(D(e),S=requestAnimationFrame(O))}function k(e,t,n=1){w=Math.max(1,Math.floor(e||1)),T=Math.max(1,Math.floor(t||1)),(!v||!y)&&E();let r=f(Number(n)||1,1,2);v.setPixelRatio(r),v.setSize(w,T,!1),y.setSize(w,T),b.uniforms.resolution.value.set(w,T,1),D()}function A(){if(!C){if(h){D();return}C=!0,S=requestAnimationFrame(O)}}function j(){C=!1,S!=null&&cancelAnimationFrame(S),S=null}function M(){var e,t,n,r,i,a;j(),x==null||(e=x.geometry)==null||(t=e.dispose)==null||t.call(e),x==null||(n=x.material)==null||(r=n.dispose)==null||r.call(n),y==null||(i=y.dispose)==null||i.call(y),v==null||(a=v.dispose)==null||a.call(v),b=null,x=null,y=null,v=null,g=null,_=null}return{start:A,stop:j,destroy:M,renderStatic:D,setSize:k}}export{p as createAndroidBackgroundEngine};