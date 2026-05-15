import{W as R,S as _,a as U,j as k,k as A,V as B,d as G,l as V,m as q,R as E,U as W,n as j}from"./three-Cmtw-h9o.js";function I(v,g,u){return Math.max(g,Math.min(u,v))}function N(v,g={}){const u=!!g.reduceMotion;let c=null,x=null,e=null,a=null,o=null,t=null,r=null,d=!1,i=1,s=1;const M=`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
        }
    `,P=`
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
    `;function h(){e=new R({canvas:v,antialias:!0,alpha:!1,powerPreference:"high-performance"}),e.outputColorSpace=_,e.setClearColor(0,1),e.setPixelRatio(1),c=new U,x=new k(-1,1,1,-1,0,1),o=new A({uniforms:{time:{value:0},resolution:{value:new B(1,1,1)}},vertexShader:M,fragmentShader:P}),t=new G(new V(2,2),o),c.add(t),a=new q(e),a.addPass(new E(c,x)),a.addPass(new W(new j(1,1),1.5,.8,.5))}function f(n=performance.now()){e||h(),!(!o||!a)&&(o.uniforms.time.value=u?0:n*.001,o.uniforms.resolution.value.set(i,s,1),a.render())}function y(n){d&&(f(n),r=requestAnimationFrame(y))}function C(n,p,l=1){i=Math.max(1,Math.floor(n||1)),s=Math.max(1,Math.floor(p||1)),(!e||!a)&&h();const m=I(Number(l)||1,1,2);e.setPixelRatio(m),e.setSize(i,s,!1),a.setSize(i,s),o.uniforms.resolution.value.set(i,s,1),f()}function b(){if(!d){if(u){f();return}d=!0,r=requestAnimationFrame(y)}}function z(){d=!1,r!=null&&cancelAnimationFrame(r),r=null}function F(){var n,p,l,m,w,S;z(),(p=(n=t==null?void 0:t.geometry)==null?void 0:n.dispose)==null||p.call(n),(m=(l=t==null?void 0:t.material)==null?void 0:l.dispose)==null||m.call(l),(w=a==null?void 0:a.dispose)==null||w.call(a),(S=e==null?void 0:e.dispose)==null||S.call(e),o=null,t=null,a=null,e=null,c=null,x=null}return{start:b,stop:z,destroy:F,renderStatic:f,setSize:C}}export{N as createAndroidBackgroundEngine};
