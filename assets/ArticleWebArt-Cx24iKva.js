const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/androidBackgroundEngine-BloJcAus.js","assets/three-DH8sYDUq.js","assets/hourglassEngine-CEGlumjW.js","assets/rolldown-runtime-WkwZ5CU-.js","assets/physics-D-rSCjTz.js","assets/embroideryEngine-BxVJh5hl.js","assets/swiper-C1vswJ75.js","assets/swiper-DZRUSE2g.css","assets/threeTunnelEngine-CGfBMksz.js","assets/threePolygonDemo5Engine-gxOZu2e0.js","assets/prismFieldEngine-BwS8GEGW.js","assets/soupShaderEngine-GfL7GxYo.js","assets/tardisWormholeEngine-DcnX_f8M.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-WkwZ5CU-.js";import{c as t}from"./swiper-C1vswJ75.js";import{t as n}from"./react-vendor-XCC07dJM.js";import{n as r}from"./LanguageProvider-BauWk_YN.js";import{t as i}from"./preload-helper-BDPrMDWa.js";import{o as a,s as o}from"./index-BP9nZJRb.js";var s=e(t(),1),c=n(),l=[190,214,268,322,164,232,286,340];function u({slides:e,onChange:t,onPin:n,onUnpin:r,onReplacePinned:i,onWindowsSettled:a,pinnedIds:o=[],maxPinned:u=3,labels:d={},enabled:f=!0}){let[p,m]=(0,s.useState)(0),[h,g]=(0,s.useState)([0]),[_,v]=(0,s.useState)(`initial`),y=(0,s.useRef)(null),b=(0,s.useRef)(null),x=(0,s.useRef)(null),[S,C]=(0,s.useState)(null),w=(0,s.useRef)(a),T=(0,s.useRef)([]),E=(0,s.useRef)(null),[D,ee]=(0,s.useState)(1),O=e.length;w.current=a;let k=O?Math.min(p,O-1):0,A=e[k],te=O>1?(k+1)%O:null,j=O>1?(k-1+O)%O:null,M=o.map(t=>e.find(e=>e.id===t)).filter(e=>e&&e.id!==(A==null?void 0:A.id)),N=!!(A&&o.includes(A.id)),P=!!(n&&(A==null?void 0:A.pinnable)!==!1&&(N||o.length<u)),F=new Map;for(let e=h.length-1;e>=0;e--){let t=h[e];F.has(t)||F.set(t,h.length-1-e)}if((0,s.useLayoutEffect)(()=>{let e=b.current;if(!e||!O)return;let t=()=>{var t,n;let r=e.clientWidth<=560||(t=(n=window).matchMedia)!=null&&(t=t.call(n,`(pointer: coarse)`))!=null&&t.matches?44:26,i=Math.max(1,Math.min(O,Math.floor((e.clientWidth+4)/r))),a=i;for(;a>Math.ceil(i/2)&&O%a!==0;)a--;O%a!==0&&(a=Math.ceil(O/Math.ceil(O/i))),ee(a)},n=new ResizeObserver(t);return n.observe(e),t(),()=>n.disconnect()},[O]),(0,s.useEffect)(()=>()=>{for(let e of T.current)window.cancelAnimationFrame(e);E.current!==null&&window.clearTimeout(E.current)},[]),!O)return null;let I=e=>{x.current=e,C(e)},L=()=>{var e,t;for(let e of T.current)window.cancelAnimationFrame(e);if(T.current=[],E.current!==null&&window.clearTimeout(E.current),E.current=null,typeof window>`u`){var n;(n=w.current)==null||n.call(w);return}let r=(e=(t=window).matchMedia)!=null&&(e=e.call(t,`(prefers-reduced-motion: reduce)`))!=null&&e.matches?80:680,i=window.requestAnimationFrame(()=>{let e=window.requestAnimationFrame(()=>{T.current=[],E.current=window.setTimeout(()=>{var e;E.current=null,(e=w.current)==null||e.call(w)},r)});T.current=[e]});T.current=[i]},R=(n,{preserveInteractionTarget:r=!1}={})=>{f&&n!==null&&n!==k&&e[n]&&(v(n===te?`next`:n===j?`previous`:`jump`),m(n),g(e=>[...e,n].slice(-8)),r||I(e[n].id),t==null||t(n,e[n]))},z=t=>{if(!f||t===null||!e[t])return;let n=e[t],r=x.current||(A==null?void 0:A.id);if(r&&r!==(A==null?void 0:A.id)&&o.includes(r)){if(n.id===r)return;i==null||i(r,n,A==null?void 0:A.id),L(),g(e=>[...e,t].slice(-8)),I(n.id===(A==null?void 0:A.id)?A.id:n.id)}else t===k?I(n.id):R(t)},B=()=>{if(f&&n)for(let t=1;t<O;t++){let r=(k+t)%O;if(!(e[r].id===(A==null?void 0:A.id)||e[r].pinnable===!1||o.includes(e[r].id))){o.length<u?n(e[r].id):R(r),I(e[r].id),o.length<u&&L();return}}},V=e=>{y.current=null,f&&e.pointerType!==`mouse`&&e.isPrimary&&!e.target.closest(`.layered-card-carousel-pin, .layered-card-carousel-unpin, .article-web-art-gated-tile-pill, a, input, select, textarea`)&&(y.current={id:e.pointerId,x:e.clientX,y:e.clientY})},H=e=>{let t=y.current;if(y.current=null,!t||t.id!==e.pointerId||!f)return;let n=e.clientX-t.x,r=e.clientY-t.y;Math.abs(n)<58||Math.abs(n)<Math.abs(r)*1.35||z(n>0?j:te)},ne=()=>{if(A&&P){if(N)r==null||r(A.id),L();else{n==null||n(A.id),L();for(let t=1;t<O;t++){let n=(k+t)%O;if(!(e[n].pinnable===!1||o.includes(e[n].id))){R(n,{preserveInteractionTarget:!0});break}}}}},re=(e,t)=>{var n;let r={ArrowLeft:(t-1+O)%O,ArrowRight:(t+1)%O,Home:0,End:O-1}[e.key];r!==void 0&&(e.preventDefault(),(n=e.currentTarget.parentElement.children[r])==null||n.focus(),z(r))},U=(e,t)=>{if(e.detail===0){var n;(n=e.currentTarget.closest(`.layered-card-carousel`))==null||(n=n.querySelector(`.layered-card-carousel-index-button.is-current`))==null||n.focus()}r==null||r(t),L(),x.current===t&&I((A==null?void 0:A.id)||null)},W=(t,n)=>t===null?null:(0,c.jsxs)(`button`,{type:`button`,className:`layered-card-carousel-side layered-card-carousel-side-${n}`,style:{"--carousel-preview-hue":l[t%l.length]},onClick:()=>z(t),disabled:!f,"aria-label":`${n===`next`?d.next||`Next artwork`:d.previous||`Previous artwork`}: ${t+1}, ${e[t].label}`,children:[(0,c.jsx)(`span`,{className:`layered-card-carousel-side-number`,"aria-hidden":`true`,children:String(t+1).padStart(2,`0`)}),(0,c.jsx)(`span`,{className:`layered-card-carousel-side-label`,"aria-hidden":`true`,children:e[t].label})]});return(0,c.jsxs)(`div`,{className:`layered-card-carousel${M.length?` layered-card-carousel-multiview`:``}`,"aria-label":d.gallery||`Artwork gallery`,children:[(0,c.jsxs)(`div`,{className:`layered-card-carousel-workspace`,"data-view-count":M.length+1,children:[W(j,`previous`),W(te,`next`),[A,...M].map(t=>{let r=e.indexOf(t),i=t.id===A.id;return(0,c.jsxs)(`div`,{className:[i?`layered-card-carousel-current layered-card-carousel-current-${_}`:`layered-card-carousel-pinned`,i&&t.transition===`fade`?`layered-card-carousel-current-fade`:``,(S||(A==null?void 0:A.id))===t.id?`is-last-interacted`:``].filter(Boolean).join(` `),role:`group`,"aria-label":i?`${r+1} / ${O}: ${t.label}`:`${d.pinned||`Open artwork`}: ${t.label}`,onPointerDownCapture:()=>I(t.id),onFocusCapture:()=>I(t.id),onClickCapture:()=>I(t.id),onPointerDown:i?V:void 0,onPointerUp:i?H:void 0,onPointerCancel:i?()=>{y.current=null}:void 0,children:[t.content,i&&f&&n&&t.pinnable!==!1&&(0,c.jsx)(`button`,{type:`button`,className:`layered-card-carousel-pin${N?` is-pinned`:``}`,onClick:ne,disabled:!P,"aria-label":N?d.unpin||`Remove from simultaneous view`:P?d.pin||`Add to simultaneous view`:d.pinLimit||`Three extra artworks are already open`,title:N?d.unpin||`Remove from simultaneous view`:P?d.pin||`Add to simultaneous view`:d.pinLimit||`Three extra artworks are already open`,children:(0,c.jsxs)(`svg`,{viewBox:`0 0 20 20`,"aria-hidden":`true`,focusable:`false`,children:[(0,c.jsx)(`rect`,{x:`3.5`,y:`3.5`,width:`13`,height:`13`,rx:`2`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`}),N?(0,c.jsx)(`path`,{d:`M6.5 10h7`}):(0,c.jsx)(`path`,{d:`M6.5 10h7M10 6.5v7`})]})}),!i&&(0,c.jsx)(`button`,{type:`button`,className:`layered-card-carousel-unpin`,onClick:e=>U(e,t.id),"aria-label":`${d.unpin||`Remove from simultaneous view`}: ${t.label}`,children:(0,c.jsx)(`svg`,{viewBox:`0 0 20 20`,"aria-hidden":`true`,focusable:`false`,children:(0,c.jsx)(`path`,{d:`M5 5 15 15M15 5 5 15`})})})]},t.id)}),M.length===2&&n&&(0,c.jsxs)(`button`,{type:`button`,className:`layered-card-carousel-add-slot`,onClick:B,disabled:!f||!e.some(e=>e.id!==(A==null?void 0:A.id)&&e.pinnable!==!1&&!o.includes(e.id)),"aria-label":d.addNext||d.pin||`Add next artwork`,title:d.addNext||d.pin||`Add next artwork`,children:[(0,c.jsx)(`span`,{className:`layered-card-carousel-add-slot-icon`,"aria-hidden":`true`,children:(0,c.jsx)(`svg`,{viewBox:`0 0 24 24`,focusable:`false`,children:(0,c.jsx)(`path`,{d:`M12 5v14M5 12h14`})})}),(0,c.jsx)(`span`,{className:`layered-card-carousel-add-slot-label`,"aria-hidden":`true`,children:d.addNext||`Add artwork`})]})]}),(0,c.jsx)(`nav`,{ref:b,className:`layered-card-carousel-index`,style:{"--carousel-index-columns":D},"aria-label":d.jump||`Choose artwork`,children:e.map((e,t)=>{let n=F.get(t)??-1,r=n>0&&n<=5;return(0,c.jsx)(`button`,{type:`button`,className:`layered-card-carousel-index-button${t===k?` is-current`:``}${r?` is-recent`:``}`,style:{"--carousel-index-delay":`${Math.min(t,18)*20}ms`,...r?{"--carousel-trail-percent":`${Math.max(12,100-n*18)}%`}:{}},onClick:()=>z(t),onKeyDown:e=>re(e,t),tabIndex:t===k?0:-1,disabled:!f,"aria-current":t===k?`true`:void 0,"aria-label":`${d.jumpTo||`Show artwork`} ${t+1}: ${e.label}`,children:t+1},e.id)})})]})}function d(e){return Array.isArray(e)?e.map((e,t)=>{let n=e!=null&&e.tone?` article-web-art-intro-guide-fragment-${e.tone}`:``;return(0,c.jsx)(`span`,{className:`article-web-art-intro-guide-fragment${n}`,children:e==null?void 0:e.text},`${(e==null?void 0:e.text)||`fragment`}-${t}`)}):e}function f({guide:e,buttonLabel:t,hidden:n,onEnter:r,secondaryButtonLabel:i=null,onSecondaryAction:a=null,secondaryPressed:o=!1}){return(0,c.jsx)(`div`,{className:`article-web-art-intro-cover ${n?`article-web-art-intro-cover-hidden`:`article-web-art-intro-cover-open`}`,children:(0,c.jsx)(`div`,{className:`article-web-art-intro-cover-inner`,children:(0,c.jsx)(`div`,{className:`article-web-art-intro-cover-actions`,children:(0,c.jsx)(`div`,{className:`article-web-art-intro-guide ${n?`article-web-art-intro-guide-hidden`:`article-web-art-intro-guide-open`}`,children:(0,c.jsx)(`div`,{className:`article-web-art-intro-guide-inner`,children:(0,c.jsxs)(`div`,{className:`article-web-art-intro-guide-top-row`,children:[(0,c.jsx)(`div`,{className:`article-web-art-intro-guide-lines`,children:e.lines.slice(1).map((e,t)=>(0,c.jsx)(`p`,{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${t+2}`,children:d(e)},Array.isArray(e)?e.map(e=>e==null?void 0:e.text).join(``):e))}),(0,c.jsxs)(`div`,{className:`article-web-art-intro-cover-buttons`,children:[i?(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${o?`article-web-art-intro-cover-button-secondary-active`:``}`,onClick:a||void 0,"aria-pressed":o,"aria-label":i,children:i}):null,(0,c.jsxs)(`button`,{type:`button`,className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-primary`,onClick:r,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),r())},"aria-label":t,children:[(0,c.jsx)(`span`,{className:`article-web-art-intro-glass-layer article-web-art-intro-glass-layer-blur`,"aria-hidden":`true`}),(0,c.jsx)(`span`,{className:`article-web-art-intro-glass-layer article-web-art-intro-glass-layer-rim`,"aria-hidden":`true`}),(0,c.jsx)(`span`,{className:`article-web-art-intro-cover-button-text`,children:t})]})]})]})})})})})})}var p={PREVIEW:`preview`,EXPANDING:`expanding`,OPEN:`open`,COLLAPSING:`collapsing`};function m(e,{timeoutMs:t=1200}={}){if(typeof window>`u`)return e(),()=>{};if(`requestIdleCallback`in window){let n=window.requestIdleCallback(()=>e(),{timeout:t});return()=>window.cancelIdleCallback(n)}let n=window.setTimeout(()=>e(),0);return()=>window.clearTimeout(n)}function h(e){var t,n,r,i;if(!e)return{width:1,height:1};let a=e.getBoundingClientRect(),o=(t=e.parentElement)==null||(n=t.getBoundingClientRect)==null?void 0:n.call(t),s=(o==null?void 0:o.width)||((r=e.parentElement)==null?void 0:r.clientWidth)||1,c=(o==null?void 0:o.height)||((i=e.parentElement)==null?void 0:i.clientHeight)||s,l=Math.max(1,Math.round(a.width||e.clientWidth||s||1));return{width:l,height:Math.max(1,Math.round(a.height||e.clientHeight||c||l||1))}}function g(e,t,n=1){var r,i,a;let{width:o,height:s}=h(e),c=typeof window<`u`&&((r=(i=window).matchMedia)==null||(r=r.call(i,`(pointer: coarse)`))==null?void 0:r.matches),l=Math.min(c?1:1.5,Math.max(1,Number(n)||1));(o<32||s<32)&&typeof window<`u`?window.requestAnimationFrame(()=>{let n=h(e);if(n.width>=32&&n.height>=32){var r;t==null||(r=t.setSize)==null||r.call(t,n.width,n.height,l)}}):t==null||(a=t.setSize)==null||a.call(t,o,s,l)}function _(){return typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}function v(e){if(!e||typeof window>`u`)return 248;let t=window.getComputedStyle(e).getPropertyValue(`--article-web-art-stage-preview-height`),n=Number.parseFloat(t);return Number.isFinite(n)&&n>0?Math.ceil(n):248}function y(){return typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(pointer: coarse), (max-width: 767px)`).matches}function b(e,t=y()){let n=new Set(e);if(!t)return n;for(;n.size>6;)n.delete(n.values().next().value);return n}function x(e,t=y()){if(!t)return new Set(e);let n=new Set;for(let t of e){if(n.size>=6)break;n.add(t)}return n}function S(e,t){if(t.size===0)return!1;for(let n of t)if(!e.has(n))return!1;return!0}function C(e){return`Web art ${String(e||`tile`).toLowerCase()} tile loading`}function w(e,t,n={x:.5,y:.5}){if(!e||!t)return n;let r=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(t.clientY-r.top)/Math.max(1,r.height)))}}function T(e,t,n={x:0,y:0}){if(!e||!t)return n;let r=e.getBoundingClientRect();return{x:t.clientX-r.left,y:t.clientY-r.top}}function E({label:e,isOpen:t,isStaging:n=!1,onToggle:r,shouldRender:i=!0,children:a}){let o=(0,s.useCallback)(e=>{var i,a;t||n||e.defaultPrevented||(i=(a=e.target).closest)!=null&&i.call(a,`button`)||r==null||r()},[t,n,r]);return(0,c.jsxs)(`div`,{className:`article-web-art-gated-tile ${t?`article-web-art-gated-tile-open`:`article-web-art-gated-tile-closed`}`,"aria-busy":n||void 0,onClick:t?void 0:o,children:[i?a:(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":C(e)}),(0,c.jsx)(`div`,{className:`article-web-art-gated-tile-sheet`,"aria-hidden":!0}),(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-gated-tile-pill ${t?`article-web-art-gated-tile-pill-open`:`article-web-art-gated-tile-pill-closed`}`,disabled:n,onClick:r,"aria-label":`${t?`Hide`:`Show`} ${e}`,children:e})]})}var D=`function Mash(seed) {
    let n = 0xefc8249d
    const intSeed = (seed || Math.random()).toString()

    function mash(data) {
        if(data) {
            data = data.toString()
            for(let i = 0; i < data.length; i++) {
                n += data.charCodeAt(i)
                let h = 0.02519603282416938 * n
                n = h >>> 0
                h -= n
                h *= n
                n = h >>> 0
                h -= n
                n += h * 0x100000000
            }
            return (n >>> 0) * 2.3283064365386963e-10
        } else {
            n = 0xefc8249d
        }
    }

    mash(intSeed)
    const mmash = () => mash("A")
    mmash.reset = () => {
        mash()
        mash(intSeed)
    }
    Object.defineProperty(mmash, "seed", { get: () => intSeed })
    mmash.intAlea = function (min, max) {
        if(typeof max === "undefined") {
            max = min
            min = 0
        }
        return Math.floor(min + (max - min) * this())
    }
    mmash.alea = function (min, max) {
        if(typeof max === "undefined") return min * this()
        return min + (max - min) * this()
    }
    return mmash
}

function intermediate(p0, p1, alpha) {
    return [
        (1 - alpha) * p0[0] + alpha * p1[0],
        (1 - alpha) * p0[1] + alpha * p1[1]
    ]
}

function distance(p0, p1) {
    return Math.hypot(p0[0] - p1[0], p0[1] - p1[1])
}

class Hexagon {
    constructor(kx, ky) {
        this.kx = kx
        this.ky = ky
    }

    size() {
        this.xc = this._orgx + this.kx * 1.5 * this._rayHex
        this.yc = this._orgy + this.ky * this._rayHex * this._rac3
        if(this.kx & 1) this.yc -= this._rayHex * this._rac3s2

        this.vertices = [[], [], [], [], [], []]
        this.vertices[3][0] = this.xc + this._vertices[3][0]
        this.vertices[2][0] = this.vertices[4][0] = this.xc + this._vertices[2][0]
        this.vertices[1][0] = this.vertices[5][0] = this.xc + this._vertices[1][0]
        this.vertices[0][0] = this.xc + this._vertices[0][0]
        this.vertices[4][1] = this.vertices[5][1] = this.yc + this._vertices[4][1]
        this.vertices[0][1] = this.vertices[3][1] = this.yc + this._vertices[0][1]
        this.vertices[1][1] = this.vertices[2][1] = this.yc + this._vertices[1][1]

        this.points = []
        this.nbPPSide.forEach((nbPoints, kcote) => {
            const p0 = this.vertices[kcote]
            const p1 = this.vertices[(kcote + 1) % 6]
            switch(nbPoints) {
                case 0:
                    break
                case 1:
                    this.points.push(intermediate(p0, p1, 1 / 2))
                    break
                case 2:
                    this.points.push(intermediate(p0, p1, 3 / 8))
                    this.points.push(intermediate(p0, p1, 5 / 8))
                    break
                case 3:
                    this.points.push(intermediate(p0, p1, 9 / 32))
                    this.points.push(intermediate(p0, p1, 1 / 2))
                    this.points.push(intermediate(p0, p1, 23 / 32))
                    break
            }
        })
    }

    connect(kin, kout) {
        let kcon = 0
        while(true) {
            const k0 = this.connectables[kcon].indexOf(kin)
            if(k0 >= 0) {
                let k1 = this.connectables[kcon].indexOf(kout)
                let [i0, i1] = k1 < k0 ? [k1, k0] : [k0, k1]
                const narr = this.connectables[kcon].splice(i0, i1 + 1 - i0)
                narr.shift()
                narr.pop()
                if(narr.length > 0) this.connectables.push(narr)
                if(this.connectables[kcon].length === 0) this.connectables.splice(kcon, 1)
                return
            }
            ++kcon
        }
    }

    neighbour(side) {
        if(this.kx & 1) {
            return {
                kx: this.kx + [1, 0, -1, -1, 0, 1][side],
                ky: this.ky + [0, 1, 0, -1, -1, -1][side]
            }
        }
        return {
            kx: this.kx + [1, 0, -1, -1, 0, 1][side],
            ky: this.ky + [1, 1, 1, 0, -1, 0][side]
        }
    }
}

export function createHexLoopRenderer(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const baseSeed = options.seed || \`\${Date.now()}\`

    let ctx = canvas.getContext("2d", { alpha: false })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let maxx = 1
    let maxy = 1
    let rayHex = 1
    let regularity = 5
    let lineWidth = 2
    let contrast = 24
    let saturation = 92
    let withMargins = true
    let orgx = 0
    let orgy = 0
    let nbx = 0
    let nby = 0
    let grid = []
    let tbLoops = []
    let cptLoops = 0
    let hierar = null
    let perpendicular = []
    let vertices = []
    let tbNbPoints = []
    const tbRelProbaNbPoints = [0, 1, 3, 1]
    let rndStruct = Mash(\`\${baseSeed}:struct\`)
    let rndCol = Mash(\`\${baseSeed}:col\`)
    let rndGen = Mash(\`\${baseSeed}:gen\`)
    const rac3 = Math.sqrt(3)
    const rac3s2 = rac3 / 2

    const resize = () => {
        const rect = canvas.getBoundingClientRect()
        const nextWidth = Math.max(1, Math.round(rect.width || canvas.clientWidth || 1))
        const nextHeight = Math.max(1, Math.round(rect.height || canvas.clientHeight || 1))
        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
        if(nextWidth !== maxx || nextHeight !== maxy || canvas.width !== Math.round(nextWidth * dpr) || canvas.height !== Math.round(nextHeight * dpr)) {
            maxx = nextWidth
            maxy = nextHeight
            canvas.width = Math.round(maxx * dpr)
            canvas.height = Math.round(maxy * dpr)
            canvas.style.width = \`\${maxx}px\`
            canvas.style.height = \`\${maxy}px\`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
    }

    function affectNeighbour(hexa, side) {
        const { kx, ky } = hexa.neighbour(side)
        if(kx < 0 || ky < 0 || kx >= nbx || ky >= nby) return
        const neighb = grid[ky][kx]
        neighb.nbPPSide[(side + 3) % 6] = hexa.nbPPSide[side]
    }

    function createGrid() {
        grid = []
        tbNbPoints = []
        tbRelProbaNbPoints.forEach((frq, nb) => {
            for(let k = 0; k < frq; ++k) tbNbPoints.push(nb)
        })
        for(let ky = 0; ky < nby; ++ky) {
            grid[ky] = []
            for(let kx = 0; kx < nbx; ++kx) {
                const hexa = new Hexagon(kx, ky)
                hexa.nbPPSide = []
                hexa._rayHex = rayHex
                hexa._rac3 = rac3
                hexa._rac3s2 = rac3s2
                hexa._orgx = orgx
                hexa._orgy = orgy
                hexa._vertices = vertices
                grid[ky][kx] = hexa
            }
        }

        for(let ky = 1; ky < nby - 1; ++ky) {
            for(let kx = 1; kx < nbx - 1; ++kx) {
                let reRoll = -1
                const hexa = grid[ky][kx]
                let sum = 0
                for(let side = 0; side < 6; ++side) {
                    if(typeof hexa.nbPPSide[side] === "undefined") {
                        hexa.nbPPSide[side] = tbNbPoints[rndStruct.intAlea(tbNbPoints.length)]
                        affectNeighbour(hexa, side)
                        reRoll = side
                    }
                    sum += hexa.nbPPSide[side]
                }
                if(sum & 1) {
                    const oldVal = hexa.nbPPSide[reRoll]
                    let newVal
                    do {
                        newVal = tbNbPoints[rndStruct.intAlea(tbNbPoints.length)]
                    } while(((oldVal + newVal) & 1) === 0)
                    hexa.nbPPSide[reRoll] = newVal
                    affectNeighbour(hexa, reRoll)
                }
            }
        }

        for(let ky = 0; ky < nby; ++ky) {
            for(let kx = 0; kx < nbx; ++kx) {
                if(ky !== 0 && ky !== nby - 1 && kx !== 0 && kx !== nbx - 1) continue
                const hexa = grid[ky][kx]
                if(ky === 0) {
                    hexa.nbPPSide[4] = 0
                    if(kx & 1) {
                        hexa.nbPPSide[3] = 0
                        hexa.nbPPSide[5] = 0
                    }
                }
                if(ky === nby - 1) {
                    hexa.nbPPSide[1] = 0
                    if((kx & 1) === 0) {
                        hexa.nbPPSide[0] = 0
                        hexa.nbPPSide[2] = 0
                    }
                }
                if(kx === 0) {
                    hexa.nbPPSide[2] = 0
                    hexa.nbPPSide[3] = 0
                }
                if(kx === nbx - 1) {
                    hexa.nbPPSide[5] = 0
                    hexa.nbPPSide[0] = 0
                }
                let reRoll = -1
                let sum = 0
                for(let side = 0; side < 6; ++side) {
                    if(typeof hexa.nbPPSide[side] === "undefined") {
                        hexa.nbPPSide[side] = tbNbPoints[rndStruct.intAlea(tbNbPoints.length)]
                        affectNeighbour(hexa, side)
                        reRoll = side
                    }
                    sum += hexa.nbPPSide[side]
                }
                if(sum & 1) {
                    const oldVal = hexa.nbPPSide[reRoll]
                    let newVal
                    if((oldVal & 1) === 0 || tbRelProbaNbPoints[0] > 0 || tbRelProbaNbPoints[2] > 0) {
                        do {
                            newVal = tbNbPoints[rndStruct.intAlea(tbNbPoints.length)]
                        } while(((oldVal + newVal) & 1) === 0)
                    } else newVal = 0
                    hexa.nbPPSide[reRoll] = newVal
                    affectNeighbour(hexa, reRoll)
                }
            }
        }

        grid.forEach((line) => {
            line.forEach((hexa) => {
                hexa.nbPoints = hexa.nbPPSide.reduce((cumul, valeur) => cumul + valeur, 0)
                hexa.sideOfPoint = []
                for(let kCote = 0; kCote < 6; ++kCote) {
                    for(let k = 0; k < hexa.nbPPSide[kCote]; ++k) hexa.sideOfPoint.push(kCote)
                }
                hexa.pointsOfSide = [[], [], [], [], [], []]
                for(let k = 0; k < hexa.nbPoints; ++k) hexa.pointsOfSide[hexa.sideOfPoint[k]].push(k)
                hexa.connectables = [[]]
                for(let kin = 0; kin < hexa.nbPoints; ++kin) hexa.connectables[0][kin] = kin
            })
        })
    }

    function analyseLoops() {
        tbLoops = []
        cptLoops = 0
        grid.forEach((line) => {
            line.forEach((hexa) => {
                hexa.passe = []
                hexa.entry = []
                hexa.tbCrossings = []
                hexa.angleCrossing = []
            })
        })

        let hexa = grid[rndStruct.intAlea(nby)][rndStruct.intAlea(nbx)]
        while(hexa.nbPoints === 0) hexa = grid[rndStruct.intAlea(nby)][rndStruct.intAlea(nbx)]
        analyseOneLoop(hexa, Math.floor(hexa.nbPoints / 2))

        for(let kLoop = 0; kLoop < cptLoops; ++kLoop) {
            const loop = tbLoops[kLoop]
            loop.crossings.forEach((crossing) => {
                const hexa = crossing.hexagon
                analyseOneLoop(hexa, (crossing.kin - 1 + hexa.nbPoints) % hexa.nbPoints)
                analyseOneLoop(hexa, (crossing.kin + 1) % hexa.nbPoints)
                analyseOneLoop(hexa, (crossing.kout - 1 + hexa.nbPoints) % hexa.nbPoints)
                analyseOneLoop(hexa, (crossing.kout + 1) % hexa.nbPoints)
            })
        }

        function analyseOneLoop(hexa, kin) {
            let loop, kout, exitSide, kconn, idxconn, ncrossing
            const internRegularity = regularity <= 5 ? regularity : 5 + (95 / 5) * (regularity - 5)
            if(hexa.nbPoints === 0) return
            if(typeof hexa.passe[kin] !== "undefined") return
            loop = { crossings: [], angle: 0 }
            while(typeof hexa.passe[kin] === "undefined") {
                for(kconn = 0; kconn < hexa.connectables.length; ++kconn) {
                    if((idxconn = hexa.connectables[kconn].indexOf(kin)) !== -1) break
                }
                if(rndStruct.intAlea(internRegularity) !== 0) {
                    idxconn = (idxconn + 1) % hexa.connectables[kconn].length
                } else {
                    idxconn = rndStruct.intAlea(hexa.connectables[kconn].length / 2) * 2 + ((idxconn & 1) ^ 1)
                }
                kout = hexa.connectables[kconn][idxconn]
                hexa.tbCrossings[kin] = kout
                hexa.tbCrossings[kout] = kin
                hexa.connect(kin, kout)
                let angle
                switch((hexa.sideOfPoint[kout] - hexa.sideOfPoint[kin] + 6) % 6) {
                    case 0:
                        angle = kout > kin ? -3 : +3
                        break
                    case 1:
                        angle = -2
                        break
                    case 2:
                        angle = -1
                        break
                    case 3:
                        angle = 0
                        break
                    case 4:
                        angle = 1
                        break
                    case 5:
                        angle = 2
                        break
                }
                hexa.angleCrossing[kin] = angle
                hexa.angleCrossing[kout] = -angle
                loop.angle += angle
                loop.crossings.push({ hexagon: hexa, kin, kout })
                hexa.passe[kin] = hexa.passe[kout] = cptLoops
                hexa.entry[kin] = true
                hexa.entry[kout] = false
                exitSide = hexa.sideOfPoint[kout]
                let { kx, ky } = hexa.neighbour(exitSide)
                const idxs = hexa.pointsOfSide[exitSide].indexOf(kout)
                const idxEntry = hexa.nbPPSide[exitSide] - 1 - idxs
                hexa = grid[ky][kx]
                kin = hexa.pointsOfSide[(exitSide + 3) % 6][idxEntry]
            }
            tbLoops[cptLoops++] = loop
            if(loop.angle < 0) {
                const nloop = { crossings: [], angle: -loop.angle }
                for(let k = loop.crossings.length - 1; k >= 0; --k) {
                    const { hexagon, kin, kout } = loop.crossings[k]
                    ncrossing = { hexagon, kin: kout, kout: kin }
                    nloop.crossings.push(ncrossing)
                    hexagon.entry[kout] = !hexagon.entry[kout]
                    hexagon.entry[kin] = !hexagon.entry[kin]
                }
                tbLoops[tbLoops.length - 1] = nloop
            }
        }
    }

    function calculatePGradient() {
        tbLoops.forEach((loop) => {
            let minDiff = 1e99
            let maxDiff = -1e99
            loop.crossings.forEach((crossing) => {
                if(crossing.pin[0] - crossing.pin[1] < minDiff) {
                    minDiff = crossing.pin[0] - crossing.pin[1]
                    loop.p0grad = crossing.pin
                }
                if(crossing.pin[0] - crossing.pin[1] > maxDiff) {
                    maxDiff = crossing.pin[0] - crossing.pin[1]
                    loop.p1grad = crossing.pin
                }
            })
            loop.loopB = loopToBezier(loop.crossings)
        })
    }

    function prioritizeLoops() {
        function apeerb(a, b) {
            a.parent.innerHier.push(b.found)
        }
        function asurroundsb(a, b) {
            a.found.innerHier.push(b.found)
        }
        function bsurroundsa(a, b) {
            const par = a.parent
            while(par.innerHier.length > 0) {
                b.found.innerHier.push(par.innerHier.shift())
            }
            par.innerHier.push(b.found)
        }
        function find(included, kb) {
            let result
            const parent = included
            for(let k = 0; k < parent.innerHier.length; ++k) {
                if(parent.innerHier[k].kLoop === kb) return { parent, found: parent.innerHier[k] }
                if((result = find(parent.innerHier[k], kb))) return result
            }
            return false
        }

        const toBeExamined = [0]
        hierar = { kLoop: -1, innerHier: [{ kLoop: 0, innerHier: [] }] }
        for(let kb = 0; kb < toBeExamined.length; ++kb) {
            const kLoopa = toBeExamined[kb]
            const loopa = tbLoops[kLoopa]
            loopa.crossings.forEach((crossing) => {
                for(let sens = 0; sens < 2; ++sens) {
                    const kentry = [crossing.kin, crossing.hexagon.tbCrossings[crossing.kin]][sens]
                    let anglea = loopa.angle * (crossing.hexagon.entry[kentry] ? 1 : -1)
                    const nbPts = crossing.hexagon.nbPoints
                    let kentryn = (kentry + 1) % nbPts
                    let kLoopb = crossing.hexagon.passe[kentryn]
                    let loopb = tbLoops[kLoopb]
                    if(toBeExamined.indexOf(kLoopb) === -1) {
                        const descHierA = find(hierar, kLoopa)
                        toBeExamined.push(kLoopb)
                        const descHierB = { found: { kLoop: kLoopb, innerHier: [] } }
                        const angleb = loopb.angle * (crossing.hexagon.entry[kentryn] ? 1 : -1)
                        switch(angleb) {
                            case -6:
                                if(anglea === -6) asurroundsb(descHierA, descHierB)
                                else apeerb(descHierA, descHierB)
                                break
                            case +6:
                                bsurroundsa(descHierA, descHierB)
                                break
                        }
                    }

                    kentryn = (kentry + nbPts - 1) % nbPts
                    kLoopb = crossing.hexagon.passe[kentryn]
                    loopb = tbLoops[kLoopb]
                    if(toBeExamined.indexOf(kLoopb) === -1) {
                        const descHierA = find(hierar, kLoopa)
                        toBeExamined.push(kLoopb)
                        const descHierB = { found: { kLoop: kLoopb, innerHier: [] } }
                        const angleb = loopb.angle * (crossing.hexagon.entry[kentryn] ? 1 : -1)
                        switch(angleb) {
                            case -6:
                                bsurroundsa(descHierA, descHierB)
                                break
                            case +6:
                                if(anglea === -6) apeerb(descHierA, descHierB)
                                else asurroundsb(descHierA, descHierB)
                                break
                        }
                    }
                }
            })
        }

        ;(function analyseDepth(hier, level) {
            hier.depth = level
            let maxDepth = level
            hier.innerHier.forEach((inHier) => {
                analyseDepth(inHier, level + 1)
                maxDepth = Math.max(maxDepth, inHier.maxDepth)
            })
            hier.maxDepth = maxDepth
        })(hierar, 0)
    }

    function sizeEverything() {
        let crossing, nextCrossing
        for(let ky = 0; ky < nby; ++ky) {
            for(let kx = 0; kx < nbx; ++kx) {
                grid[ky][kx].size()
            }
        }
        tbLoops.forEach((loop) => {
            for(let k = loop.crossings.length - 1; k >= 0; --k) {
                crossing = loop.crossings[k]
                crossing.pin = crossing.hexagon.points[crossing.kin]
                crossing.ksidein = crossing.hexagon.sideOfPoint[crossing.kin]
                crossing.ksideout = crossing.hexagon.sideOfPoint[crossing.kout]
                nextCrossing = loop.crossings[(k + 1) % loop.crossings.length]
                crossing.pout = crossing.hexagon.points[crossing.kout] =
                    nextCrossing.hexagon.points[nextCrossing.kin]
                crossing.angle = crossing.hexagon.angleCrossing[crossing.kin]
            }
        })
    }

    function toBezier(crossing) {
        const ztd = 1
        const zdt = 0.2
        let pa, pb, dx, dy, dd, kCommVert, din, dout
        const { hexagon: hexa, pin: p0, ksidein: kside0, pout: p1, ksideout: kside1 } = crossing
        const bin = kside0
        const bout = kside1
        const tp = perpendicular
        switch(bout - bin) {
            case 3:
            case -3:
                dd = ztd * rayHex
                pa = [p0[0] + tp[bin][0] * dd, p0[1] + tp[bin][1] * dd]
                pb = [p1[0] + tp[bout][0] * dd, p1[1] + tp[bout][1] * dd]
                break
            case 1:
            case -1:
            case 5:
            case -5:
                if(bout - bin === -1 || bout - bin === 5) kCommVert = bin
                else kCommVert = bout
                din = distance(hexa.vertices[kCommVert], p0)
                dout = distance(hexa.vertices[kCommVert], p1)
                dd = 0.75
                pa = [p0[0] + tp[bin][0] * dd * dout, p0[1] + tp[bin][1] * dd * dout]
                pb = [p1[0] + tp[bout][0] * dd * din, p1[1] + tp[bout][1] * dd * din]
                break
            case 2:
            case -2:
            case 4:
            case -4:
                dd = 0.6 * rayHex
                pa = [p0[0] + tp[bin][0] * dd, p0[1] + tp[bin][1] * dd]
                pb = [p1[0] + tp[bout][0] * dd, p1[1] + tp[bout][1] * dd]
                break
            case 0:
                dx = p1[0] - p0[0]
                dy = p1[1] - p0[1]
                dd = zdt * rayHex
                pa = [p0[0] + tp[bin][0] * dd, p0[1] + tp[bin][1] * dd]
                pb = [p1[0] + tp[bin][0] * dd, p1[1] + tp[bin][1] * dd]
                break
        }
        return [p0, pa, pb, p1]
    }

    function drawBezier(points, first) {
        const [p0, pa, pb, p1] = points
        if(first) ctx.moveTo(p0[0], p0[1])
        ctx.bezierCurveTo(pa[0], pa[1], pb[0], pb[1], p1[0], p1[1])
    }

    function loopToBezier(crossings) {
        const loopB = []
        crossings.forEach((crossing) => loopB.push(toBezier(crossing)))
        return loopB
    }

    function drawBezierLoop(loop, par) {
        let first = true
        const hue = rndCol.intAlea(360)
        ctx.beginPath()
        loop.loopB.forEach((points) => {
            drawBezier(points, first)
            first = false
        })
        ctx.closePath()
        const gr = ctx.createLinearGradient(loop.p0grad[0], loop.p0grad[1], loop.p1grad[0], loop.p1grad[1])
        gr.addColorStop(par, \`hsl(\${hue},100%,\${50 + contrast}%)\`)
        gr.addColorStop(0.5, \`hsl(\${hue},\${saturation}%,50%)\`)
        gr.addColorStop(1 - par, \`hsl(\${hue},100%,\${50 - contrast}%)\`)
        ctx.fillStyle = gr
        ctx.fill()
        ctx.lineWidth = 2
        ctx.strokeStyle = "#000"
        ctx.stroke()
    }

    function drawLoop(loop, par) {
        ctx.lineWidth = lineWidth
        drawBezierLoop(loop, par)
    }

    function drawBackGround(par) {
        const loop = {}
        loop.p0grad = [-1, maxy + 1]
        loop.p1grad = [maxx + 1, -1]
        loop.loopB = []
        loop.loopB[0] = [[-1, -1], [0, -1], [maxx, -1], [maxx + 1, -1]]
        loop.loopB[1] = [[maxx + 1, -1], [maxx + 1, 0], [maxx + 1, maxy], [maxx + 1, maxy + 1]]
        loop.loopB[2] = [[maxx + 1, maxy + 1], [maxx, maxy + 1], [0, maxy + 1], [-1, maxy + 1]]
        loop.loopB[3] = [[-1, maxy + 1], [-1, maxy], [-1, 0], [-1, -1]]
        drawBezierLoop(loop, par)
    }

    function drawEverything() {
        ;(function drawHierar(hier, par) {
            if(hier.kLoop === -1) drawBackGround(par)
            else drawLoop(tbLoops[hier.kLoop], par)
            hier.innerHier.forEach((child) => drawHierar(child, 1 - par))
        })(hierar, 0)
    }

    function startOver() {
        maxx = Math.max(1, Math.round(canvas.clientWidth || canvas.getBoundingClientRect().width || 1))
        maxy = Math.max(1, Math.round(canvas.clientHeight || canvas.getBoundingClientRect().height || 1))
        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
        canvas.width = Math.round(maxx * dpr)
        canvas.height = Math.round(maxy * dpr)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const orgLeft = 0
        const orgTop = 0
        canvas.style.left = \`\${orgLeft}px\`
        canvas.style.top = \`\${orgTop}px\`

        rayHex = Math.sqrt((maxx * maxy) / rndStruct.intAlea(100, 300))
        nbx = Math.floor((maxx / rayHex + 0.5) / 1.5)
        nby = Math.floor((maxy / rayHex + 1) / rac3)
        if(!withMargins) {
            nbx += 2
            nby += 2
        }
        if(nbx < 1 || nby < 1) return
        if(nbx <= 1 && nby <= 1) return
        orgx = (maxx - rayHex * (1.5 * nbx + 0.5)) / 2 + rayHex
        orgy = (maxy - rayHex * rac3 * (nby + 0.5)) / 2 + rayHex * rac3

        vertices = [[], [], [], [], [], []]
        vertices[3][0] = -rayHex
        vertices[2][0] = vertices[4][0] = -rayHex / 2
        vertices[1][0] = vertices[5][0] = +rayHex / 2
        vertices[0][0] = rayHex
        vertices[4][1] = vertices[5][1] = -rayHex * rac3s2
        vertices[0][1] = vertices[3][1] = 0
        vertices[1][1] = vertices[2][1] = rayHex * rac3s2

        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, maxx, maxy)
        createGrid()
        analyseLoops()
        prioritizeLoops()
        sizeEverything()
        calculatePGradient()
        drawEverything()
    }

    const render = () => {
        rndStruct = Mash(\`\${baseSeed}:\${Math.random()}\`)
        rndCol = Mash(\`\${baseSeed}:\${Math.random()}:col\`)
        rndGen = Mash(\`\${baseSeed}:\${Math.random()}:gen\`)
        regularity = rndGen.intAlea(0, 11)
        withMargins = rndGen.alea(1) > 0.3
        lineWidth = rndGen.intAlea(10, 30) / 10
        contrast = rndCol.intAlea(20, 35)
        saturation = rndCol.intAlea(100 - contrast, 100)
        perpendicular = [
            [-Math.sqrt(3) / 2, -1 / 2],
            [0, -1],
            [Math.sqrt(3) / 2, -1 / 2],
            [Math.sqrt(3) / 2, 1 / 2],
            [0, 1],
            [-Math.sqrt(3) / 2, 1 / 2]
        ]
        if(reduceMotion) {
            regularity = 4
            lineWidth = 1.8
        }
        startOver()
    }

    const dispose = () => {}

    return { render, dispose, resize }
}
`;function ee({seed:e,reduceMotion:t}){let n=JSON.stringify(D.split(`<\/script>`).join(`<\\/script>`)),r=JSON.stringify(e);return`<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            border: 0;
            overflow: hidden;
            background: #000;
        }

        body {
            position: relative;
        }

        canvas {
            position: absolute;
            inset: 0;
            display: block;
        }
    </style>
</head>
<body>
<script type="module">
const moduleSource = ${n}
const moduleUrl = URL.createObjectURL(new Blob([moduleSource], { type: "text/javascript" }))
const { createHexLoopRenderer } = await import(moduleUrl)
URL.revokeObjectURL(moduleUrl)

const canvas = document.createElement("canvas")
canvas.style.position = "absolute"
canvas.style.inset = "0"
canvas.style.width = "100%"
canvas.style.height = "100%"
document.body.appendChild(canvas)

const renderer = createHexLoopRenderer(canvas, {
    reduceMotion: ${t?`true`:`false`},
    seed: ${r}
})

let rafId = 0
let retryTimerId = 0

const queueRender = () => {
    if(retryTimerId) {
        window.clearTimeout(retryTimerId)
        retryTimerId = 0
    }
    if(rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect()
        if(rect.width < 24 || rect.height < 24) {
            retryTimerId = window.setTimeout(queueRender, 60)
            return
        }
        renderer.render()
    })
}

const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(() => {
    queueRender()
}) : null

resizeObserver?.observe(document.documentElement)
resizeObserver?.observe(document.body)
resizeObserver?.observe(canvas)

queueRender()
requestAnimationFrame(() => requestAnimationFrame(queueRender))

document.addEventListener("click", () => {
    queueRender()
})

window.addEventListener("resize", () => {
    queueRender()
}, { passive: true })

window.addEventListener("pageshow", () => {
    queueRender()
})
<\/script>
</body>
</html>`}function O({label:e,clickLabel:t,previewRequested:n=!1}){let r=a(),i=(0,s.useRef)(null),[o,l]=(0,s.useState)(!1),[u,d]=(0,s.useState)(0),f=(0,s.useMemo)(()=>_(),[]),p=(0,s.useCallback)(()=>{d(Date.now()),l(!0)},[]),m=(0,s.useCallback)(()=>{var e;r==null||(e=r.navigateToSectionWithId)==null||e.call(r,`contact`)},[r]),h=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),p())},g=(0,s.useMemo)(()=>o?ee({seed:`${u||Date.now()}:${e}`,reduceMotion:f}):``,[e,o,u,f]);return(0,s.useEffect)(()=>{let e=0,t=0;return n?(e=window.requestAnimationFrame(()=>{t=window.requestAnimationFrame(()=>{d(Date.now()),l(!0)})}),()=>{e&&window.cancelAnimationFrame(e),t&&window.cancelAnimationFrame(t)}):(l(!1),()=>{e&&window.cancelAnimationFrame(e),t&&window.cancelAnimationFrame(t)})},[n]),(0,c.jsxs)(`div`,{ref:i,role:`button`,tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${o?`article-web-art-tile-cta-open`:`article-web-art-tile-cta-closed`}`,"aria-label":o?`Kontakt preview`:e,"aria-pressed":o,onClick:p,onKeyDown:h,children:[(0,c.jsxs)(`div`,{className:`article-web-art-tile-cta-preview ${o?`article-web-art-tile-cta-preview-visible`:``}`,"aria-hidden":!0,children:[o&&(0,c.jsx)(`iframe`,{className:`article-web-art-tile-cta-preview-frame`,title:`Send yours preview`,srcDoc:g,sandbox:`allow-scripts`},`${u}-${e}`),(0,c.jsx)(`div`,{className:`article-web-art-tile-cta-preview-vignette`})]}),!o&&(0,c.jsx)(`div`,{className:`loader ${f?`loader-reduce-motion`:``}`,"aria-hidden":!0,children:(0,c.jsxs)(`div`,{className:`loader-inner`,children:[(0,c.jsx)(`div`,{className:`loader-line-wrap`,children:(0,c.jsx)(`div`,{className:`loader-line`})}),(0,c.jsx)(`div`,{className:`loader-line-wrap`,children:(0,c.jsx)(`div`,{className:`loader-line`})}),(0,c.jsx)(`div`,{className:`loader-line-wrap`,children:(0,c.jsx)(`div`,{className:`loader-line`})}),(0,c.jsx)(`div`,{className:`loader-line-wrap`,children:(0,c.jsx)(`div`,{className:`loader-line`})}),(0,c.jsx)(`div`,{className:`loader-line-wrap`,children:(0,c.jsx)(`div`,{className:`loader-line`})})]})}),(0,c.jsxs)(`div`,{className:`article-web-art-tile-cta-content ${o?`article-web-art-tile-cta-content-hidden`:``}`,children:[(0,c.jsx)(`div`,{className:`article-web-art-tile-cta-title article-web-art-tile-cta-title-top`,children:e}),(0,c.jsx)(`div`,{className:`article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom`,children:t})]}),o&&(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-tile-cta-contact-pill`,onClick:e=>{e.stopPropagation(),m()},onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),e.stopPropagation(),m())},children:`Kontakt`})]})}var k={title:`Doors of the world behind an amazing art gallery.`,guide:{eyebrow:`How to explore`,lines:[[{text:`Enter the gallery`,tone:`hero`},{text:` and browse the `},{text:`cards`,tone:`glow`},{text:` at your own risk!`,tone:`soft`}],[{text:`Click, hold, or drag`,tone:`action`},{text:` inside a card to have `},{text:`some fun.`,tone:`glow`}],[{text:`All pieces are unique, and beautiful.`,tone:`hero`},{text:` `},{text:`Contact me to send or credit an idea.`,tone:`soft`}]]},button:`Enter`,preparing:`Preparing...`},A={en:k,de:{title:`Türen der Welt hinter einer erstaunlichen Kunstgalerie.`,guide:{eyebrow:`So funktioniert es`,lines:[`Betritt die Galerie und schau dir die Karten in Ruhe an.`,`Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.`,`Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden.`]},button:`Eintreten`,preparing:`Wird vorbereitet...`},hr:{title:`Vrata svijeta iza nevjerojatne umjetničke galerije.`,guide:{eyebrow:`Kako istraživati`,lines:[`Uđi u galeriju i istražuj kartice svojim tempom.`,`Klikni, dodirni ili pritisni karticu da otkriješ što skriva.`,`Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme.`]},button:`Uđi`,preparing:`Priprema se...`},tr:{title:`Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.`,guide:{eyebrow:`Nasıl gezilir`,lines:[`Galeriye girin ve kartları kendi temponuzda inceleyin.`,`İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.`,`Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir.`]},button:`Gir`,preparing:`Hazırlanıyor...`}},te={en:{gallery:`Web art gallery`,next:`Next artwork`,previous:`Previous artwork`,last:`Last viewed artwork`,jump:`Jump to artwork`,jumpTo:`Show artwork`,pin:`Open alongside current artwork`,unpin:`Close extra window`,pinLimit:`Three extra artworks are already open`,pinned:`Extra artwork`,addNext:`Add artwork`},de:{gallery:`Webkunst-Galerie`,next:`Nächstes Werk`,previous:`Vorheriges Werk`,last:`Zuletzt angesehenes Werk`,jump:`Werk auswählen`,jumpTo:`Werk anzeigen`,pin:`Neben dem aktuellen Werk öffnen`,unpin:`Zusätzliches Fenster schließen`,pinLimit:`Drei zusätzliche Werke sind bereits offen`,pinned:`Zusätzliches Werk`,addNext:`Werk hinzufügen`},hr:{gallery:`Galerija web umjetnosti`,next:`Sljedeće djelo`,previous:`Prethodno djelo`,last:`Zadnje pregledano djelo`,jump:`Odaberi djelo`,jumpTo:`Prikaži djelo`,pin:`Otvori uz trenutno djelo`,unpin:`Zatvori dodatni prozor`,pinLimit:`Već su otvorena tri dodatna djela`,pinned:`Dodatno djelo`,addNext:`Dodaj djelo`},tr:{gallery:`Web sanatı galerisi`,next:`Sonraki eser`,previous:`Önceki eser`,last:`Son görüntülenen eser`,jump:`Eser seç`,jumpTo:`Eseri göster`,pin:`Geçerli eserin yanında aç`,unpin:`Ek pencereyi kapat`,pinLimit:`Üç ek eser zaten açık`,pinned:`Ek eser`,addNext:`Eser ekle`}},j={en:`Send yours!`,de:`Sende deine!`,hr:`Pošalji svoju!`,tr:`Sen de gönder!`},M={en:`Click`,de:`Klicken`,hr:`Klikni`,tr:`Tıkla`};function N(e=`en`){return A[e]||k}function P(e=`en`){return te[e]}function F(e,t=`en`){var n,r;let i=e==null||(n=e.getString)==null?void 0:n.call(e,`send_yours`);(typeof i!=`string`||i.startsWith(`locale:`))&&(i=j[t]||j.en);let a=e==null||(r=e.getString)==null?void 0:r.call(e,`click`);return(typeof a!=`string`||a.startsWith(`locale:`))&&(a=M[t]||M.en),{submitTileLabel:i,clickTileLabel:a,introHideLabel:`hide`}}var I=[4,5,3,6,1,2,7,8,9,10,11,12,13,14,15],L={1:`Hover`,2:`Wave`,3:`3D`,4:`Poly`,5:`Click`,6:`Orbit`,7:`Spin`,8:`Shape`,9:`Hourglass`,10:`Noice`,11:`Distance`,12:`Android`,13:`Pulse`,14:`Bars`,15:`Deep`},R=[{key:`ambient-trace`,suffix:`ambient-trace`,label:`Trace`,placeholderKey:`trace`,trackedReady:!0},{key:`ambient-hex`,suffix:`ambient-hex`,label:`Hex`,placeholderKey:`hex`,trackedReady:!0},{key:`ambient-plop`,suffix:`ambient-plop`,label:`Plop`,placeholderKey:`plop`,trackedReady:!0},{key:`ambient-julia`,suffix:`ambient-julia`,label:`Julia`,placeholderKey:`julia`,trackedReady:!0},{key:`ambient-mines`,suffix:`ambient-mines`,label:`Bomb`,placeholderKey:`mines`,trackedReady:!0},{key:`ambient-rings`,suffix:`ambient-rings`,label:`Fall`,placeholderKey:`rings`,trackedReady:!0},{key:`ambient-prism`,suffix:`ambient-prism`,label:`Prism`,placeholderKey:`prism`,trackedReady:!0},{key:`ambient-rope`,suffix:`ambient-rope`,label:`Rope`,placeholderKey:`rope`,trackedReady:!0},{key:`ambient-soup`,suffix:`ambient-soup`,label:`Soup`,placeholderKey:`soup`,trackedReady:!0},{key:`ambient-tardis`,suffix:`ambient-tardis`,label:`Tardis`,placeholderKey:`tardis`,trackedReady:!0},{key:`ambient-goldfish`,staticTileId:`ambient-goldfish`,label:`Fish`,placeholderKey:null,trackedReady:!1},{key:`ambient-patronus`,staticTileId:`ambient-patronus`,label:`Patronus`,placeholderKey:null,trackedReady:!1}],z=[[`Wave`,`Julia`],[`Julia`,`Poly`],[`Plop`,`Click`]];function B(e=[]){let t=new Map(e.map(e=>[Number(e==null?void 0:e.id),e])),n=[];for(let e of I){let r=t.get(e);r&&n.push(r)}for(let t of e){if(!t)continue;let e=Number(t==null?void 0:t.id);I.includes(e)||n.push(t)}return n}function V(e,t){let n=Number(e==null?void 0:e.id);return L[n]?L[n]:String(t+1)}function H(e,t){return t.staticTileId?t.staticTileId:`${e}-${t.suffix}`}function ne(e,t=[]){let n=t.map(e=>e==null?void 0:e.uniqueId).filter(Boolean),r=new Map(R.map(t=>[t.key,H(e,t)]));return n.push(r.get(`ambient-trace`),r.get(`ambient-hex`),r.get(`ambient-plop`),r.get(`ambient-julia`),r.get(`ambient-mines`),r.get(`ambient-prism`),r.get(`ambient-rings`),r.get(`ambient-rope`),r.get(`ambient-soup`),r.get(`ambient-tardis`),r.get(`ambient-goldfish`),r.get(`ambient-patronus`)),new Set(n.filter(Boolean))}function re(e,t=z){let n=[...e];for(let[e,r]of t){let t=n.findIndex(({label:t})=>t===e),i=n.findIndex(({label:e})=>e===r);if(t<0||i<0)continue;let a=n[t];n[t]=n[i],n[i]=a}return n}var U=[`#0000ff`,`#008100`,`#ff1300`,`#000083`,`#810500`,`#2a9494`,`#000000`,`#808080`];function W(e=9,t=9,n=10){let r=e*t,i=Math.max(1,Math.min(n,r-1)),a=new Set;for(;a.size<i;)a.add(Math.floor(Math.random()*r));let o=Array(r).fill(0);for(let n=0;n<r;n++){if(a.has(n)){o[n]=-1;continue}let r=n%t,i=Math.floor(n/t),s=0;for(let n=-1;n<=1;n++)for(let o=-1;o<=1;o++){if(o===0&&n===0)continue;let c=r+o,l=i+n;c<0||l<0||c>=t||l>=e||a.has(l*t+c)&&(s+=1)}o[n]=s}return{rows:e,cols:t,mineCount:i,mines:a,counts:o}}function ie(e,t,n,r){let i=new Set(n),a=[e];for(;a.length>0;){let e=a.pop();if(e==null||i.has(e)||r.has(e)||t.mines.has(e)||(i.add(e),t.counts[e]!==0))continue;let n=e%t.cols,o=Math.floor(e/t.cols);for(let e=-1;e<=1;e++)for(let r=-1;r<=1;r++){if(r===0&&e===0)continue;let i=n+r,s=o+e;i<0||s<0||i>=t.cols||s>=t.rows||a.push(s*t.cols+i)}}return i}function G(e,t,n){let r=e.rows*e.cols-e.mineCount;if(t.size>=r)return!0;if(n.size!==e.mineCount)return!1;for(let t of e.mines)if(!n.has(t))return!1;return!0}function K({readyId:e,locked:t,onReady:n}){let[r,i]=(0,s.useState)(0),[a,o]=(0,s.useState)(`mine`),[l,u]=(0,s.useState)(()=>new Set),[d,f]=(0,s.useState)(()=>new Set),[p,m]=(0,s.useState)(`playing`),[h,g]=(0,s.useState)(null),[_,v]=(0,s.useState)(0),y=(0,s.useMemo)(()=>W(),[r]);(0,s.useEffect)(()=>{n==null||n(e)},[n,e]),(0,s.useEffect)(()=>{o(`mine`),u(new Set),f(new Set),m(`playing`),g(null),v(0)},[r]),(0,s.useEffect)(()=>{if(h==null||p!==`playing`)return;let e=()=>{v(Math.min(5999,Math.floor((Date.now()-h)/1e3)))};e();let t=window.setInterval(e,1e3);return()=>{window.clearInterval(t)}},[h,p]);let b=()=>{i(e=>e+1)},x=e=>{if(t||p!==`playing`)return;if(h??g(Date.now()),a===`flag`){if(l.has(e))return;let t=new Set(d);t.has(e)?t.delete(e):t.add(e),f(t),G(y,l,t)&&m(`won`);return}if(d.has(e)||l.has(e))return;if(y.mines.has(e)){let t=new Set(l);for(let e of y.mines)t.add(e);t.add(e),u(t),m(`lost`);return}let n=ie(e,y,l,d);u(n),G(y,n,d)&&m(`won`)},S=y.mineCount-d.size,C=`${String(Math.floor(_/60)).padStart(2,`0`)}:${String(_%60).padStart(2,`0`)}`,w=`🤔`;return p===`lost`?w=`😣`:p===`won`?w=`😎`:d.size>=y.mineCount?w=`😕`:d.size>=y.mineCount-1?w=`🤓`:d.size>=Math.round(y.mineCount*3/4)?w=`😃`:d.size>=Math.round(y.mineCount*2/3)?w=`😊`:d.size>=Math.round(y.mineCount/2)?w=`🙂`:d.size>=Math.round(y.mineCount/3)?w=`😏`:d.size>0&&(w=`😐`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-minesweeper`,role:`group`,"aria-label":`Minesweeper web art tile`,children:(0,c.jsxs)(`div`,{className:`article-web-art-minesweeper`,children:[(0,c.jsxs)(`div`,{className:`article-web-art-minesweeper-action-selector`,children:[(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-minesweeper-mode ${a===`mine`?`article-web-art-minesweeper-mode-active`:``}`,onClick:()=>o(`mine`),disabled:t||p!==`playing`,"aria-label":`Pickaxe tool`,title:`Reveal cells`,"aria-pressed":a===`mine`,children:(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-mode-icon`,"aria-hidden":!0,children:`⛏`})}),(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-minesweeper-mode ${a===`flag`?`article-web-art-minesweeper-mode-active`:``}`,onClick:()=>o(`flag`),disabled:t||p!==`playing`,"aria-label":`Flag tool`,title:`Place flags`,"aria-pressed":a===`flag`,children:(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-mode-icon`,"aria-hidden":!0,children:`🚩`})})]}),(0,c.jsxs)(`div`,{className:`article-web-art-minesweeper-grid`,children:[y.counts.map((e,n)=>{let i=l.has(n),a=d.has(n),o=y.mines.has(n),s=p===`lost`&&o,u=e>0?U[e-1]:void 0;return(0,c.jsxs)(`button`,{type:`button`,className:`article-web-art-minesweeper-cell ${i?`article-web-art-minesweeper-cell-revealed`:``} ${s?`article-web-art-minesweeper-cell-mine`:``}`,onClick:()=>x(n),disabled:t||p!==`playing`,"aria-label":`Minesweeper cell ${n+1}`,children:[a&&!i?(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-cell-flag`,children:`🚩`}):null,s?(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-cell-mine-icon`,children:`💣`}):null,i&&!o&&e>0?(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-cell-count`,style:{color:u},children:e}):null]},`mine-${r}-${n}`)}),p===`lost`?(0,c.jsxs)(`button`,{type:`button`,className:`article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost`,onClick:b,children:[`Ooohhh 🙁`,(0,c.jsx)(`br`,{}),`Click to try again`]}):null,p===`won`?(0,c.jsxs)(`button`,{type:`button`,className:`article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won`,onClick:b,children:[`👌👀✔💯💯💯`,(0,c.jsx)(`br`,{}),`Click to restart`]}):null]}),(0,c.jsxs)(`div`,{className:`article-web-art-minesweeper-infos`,children:[(0,c.jsxs)(`div`,{className:`article-web-art-minesweeper-counter`,children:[(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-counter-face`,children:w}),(0,c.jsx)(`span`,{children:S})]}),(0,c.jsx)(`div`,{className:`article-web-art-minesweeper-timer`,children:C})]}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Bomb`})]})})}function ae({readyId:e,locked:t=!1,onReady:n}){let r=(0,s.useRef)(null),i=(0,s.useMemo)(()=>_(),[]),a=(0,s.useRef)(!1),o=(0,s.useRef)(0),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(1),f=(0,s.useRef)(null),p=(0,s.useRef)(null),m=(0,s.useRef)(null),h=(0,s.useRef)([]);return(0,s.useEffect)(()=>{n==null||n(e)},[n,e]),(0,s.useEffect)(()=>{let e=r.current;if(!e)return;let n=e=>{let t=Math.max(0,Math.min(1,e));return t*t*(3-2*t)},s=()=>{if(h.current.length)return h.current.filter(e=>e.playState!==`idle`);let t=e.querySelectorAll(`.fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin`),n=[];for(let e of t){let t=e.getAnimations?e.getAnimations():[];for(let e of t)n.push(e)}return h.current=n,h.current},c=e=>{let t=Math.max(1,Math.min(5.2,Number(e)||1));d.current=t;let n=s();for(let e of n)e.playbackRate=e.animationName===`wiggle-end`?Math.min(t,2.6):t},g=()=>{p.current!=null&&cancelAnimationFrame(p.current),m.current!=null&&window.clearTimeout(m.current),p.current=null,m.current=null},_=()=>{g(),c(5.2),m.current=window.setTimeout(()=>{let e=d.current,t=performance.now(),r=()=>{let i=(performance.now()-t)/320,a=n(i);c(e+(1-e)*a),i<1?p.current=requestAnimationFrame(r):p.current=null};p.current=requestAnimationFrame(r),m.current=null},2e3)},v=()=>{var t;let r=l.current;if(a.current=!1,l.current=null,e.classList.remove(`article-web-art-tile-goldfish-held`),u.current!=null&&cancelAnimationFrame(u.current),u.current=null,r!=null&&(t=e.hasPointerCapture)!=null&&t.call(e,r))try{e.releasePointerCapture(r)}catch{}let i=d.current,o=performance.now();f.current!=null&&cancelAnimationFrame(f.current);let s=()=>{let e=(performance.now()-o)/360,t=n(e);c(i+(1-i)*t),e<1?f.current=requestAnimationFrame(s):f.current=null};f.current=requestAnimationFrame(s)},y=()=>{a.current&&v()},b=()=>{if(!a.current)return;let e=performance.now()-o.current,t=1.2+4*n(e/2400);c(t),u.current=requestAnimationFrame(b)},x=n=>{if(!(i||t)&&(n.button==null||n.button===0)&&!(a.current&&l.current!==n.pointerId)){g(),a.current=!0,o.current=performance.now(),l.current=n.pointerId,e.classList.add(`article-web-art-tile-goldfish-held`);try{e.setPointerCapture(n.pointerId)}catch{}f.current!=null&&(cancelAnimationFrame(f.current),f.current=null),u.current??(u.current=requestAnimationFrame(b))}},S=e=>{if(l.current!==e.pointerId)return;let t=performance.now()-o.current;v(),t<220&&_()},C=e=>{l.current===e.pointerId&&y()},w=e=>{l.current===e.pointerId&&y()};return e.addEventListener(`pointerdown`,x),e.addEventListener(`pointerup`,S),e.addEventListener(`pointercancel`,C),e.addEventListener(`lostpointercapture`,w),()=>{e.removeEventListener(`pointerdown`,x),e.removeEventListener(`pointerup`,S),e.removeEventListener(`pointercancel`,C),e.removeEventListener(`lostpointercapture`,w),y(),g(),f.current!=null&&cancelAnimationFrame(f.current),f.current=null,h.current=[]}},[t,i]),(0,s.useEffect)(()=>{let e=r.current;e&&e.classList.toggle(`article-web-art-tile-goldfish-locked`,t)},[t]),(0,c.jsxs)(`div`,{className:`article-web-art-tile article-web-art-tile-goldfish`,ref:r,role:`img`,"aria-label":`Goldfish animation tile`,children:[(0,c.jsx)(`div`,{className:`fish-stage`,children:(0,c.jsx)(`div`,{className:`fish-wrapper`,children:(0,c.jsx)(`div`,{className:`fish-container`,children:(0,c.jsxs)(`div`,{className:`fish-parts`,children:[(0,c.jsx)(`div`,{className:`fish-body front`}),(0,c.jsx)(`div`,{className:`fish-body back`}),(0,c.jsx)(`div`,{className:`fish-back-bottom-fin front`}),(0,c.jsx)(`div`,{className:`fish-back-bottom-fin back`}),(0,c.jsx)(`div`,{className:`fish-back-fin`}),(0,c.jsx)(`div`,{className:`fish-front-bottom-fin front`}),(0,c.jsx)(`div`,{className:`fish-front-bottom-fin back`}),(0,c.jsx)(`div`,{className:`fish-top-fin`})]})})})}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Fish`})]})}var oe=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
  <filter id='inset-shadow'>
    <feOffset dx='0' dy='0' />
    <feGaussianBlur stdDeviation='5' result='offset-blur' />
    <feComposite operator='out' in='SourceGraphic' in2='offset-blur' result='inverse' />
    <feFlood flood-color='white' flood-opacity='1' result='color' />
    <feComposite operator='in' in='color' in2='inverse' result='shadow' />
    <feComposite operator='over' in='shadow' in2='SourceGraphic' />
  </filter>
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="0" result="turbulence">
      <animate attributeName="baseFrequency" from="0.02" to="0.06" dur="10s" repeatCount="indefinite" />
    </feTurbulence>
    <feColorMatrix in="turbulence" type="matrix" values="1 1 1 0 0 1 1 1 0 0 1 1 1 0 0 0 0 0 1 0" result="colorNoise" />
    <feComposite operator="in" in2="SourceGraphic" in="colorNoise" result="monoNoise" />
    <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
  </filter>
  <filter id="smokeFilter" x="0" y="0" width="100%" height="100%">
    <feTurbulence id="turbulence" type="fractalNoise" baseFrequency="0.01" numOctaves="40">
      <animate attributeName="baseFrequency" from="0.01" to="0.02" dur="10s" repeatCount="indefinite" />
      <animate attributeName="seed" from="0" to="1" dur="30s" repeatCount="indefinite" />
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" scale="40" xChannelSelector="R" yChannelSelector="G" />
  </filter>
  <g id="effect" transform="matrix(1,0,0,1,15.1726,-41.0841)">
    <path d="M290.42,254.479C284.663,262.21 282.91,269.7 283.625,276.208C281.596,275.964 278.379,275.392 275.894,274.076C271.974,272.001 268.285,269.233 264.826,258.396C264.434,274.66 279.987,279.918 284.679,281.135C284.944,281.954 285.237,282.757 285.577,283.529C286.856,286.428 288.896,289.231 291.175,291.778C288.414,293.007 279.352,296.209 272.205,289.062C270.392,296.768 287.962,301.355 294.473,295.156C297.436,297.965 300.405,300.267 302.409,301.744C305.542,304.053 309.077,307.361 310.876,309.093C310.281,309.488 309.685,309.893 309.083,310.38C309.083,310.38 303.214,305.164 296.366,307.12C301.257,318.206 307.779,315.271 309.083,320.162C310.387,325.053 309.735,326.685 307.779,331.902C305.823,337.119 303.54,362.878 315.604,378.203C327.669,393.528 340.059,397.441 339.733,405.919C339.407,414.397 342.017,452.873 339.082,458.09C336.147,463.307 333.212,470.481 333.212,470.481L343.32,469.502C343.32,469.502 343.646,464.937 345.603,462.002C347.559,459.067 348.212,455.482 348.212,450.917C348.212,446.352 350.168,429.069 351.146,421.243C352.124,413.417 357.016,402.331 357.016,402.331C357.016,402.331 362.886,455.807 360.603,459.068C358.321,462.329 354.082,470.155 354.082,470.155L365.82,469.829C365.82,469.829 363.864,465.262 365.82,462.002C367.777,458.741 367.45,455.155 367.124,452.547C366.798,449.938 369.081,406.245 372.015,400.376C389.297,404.615 399.078,400.376 399.078,400.376C399.078,400.376 407.555,412.767 413.424,414.397C419.293,416.027 411.469,452.874 410.164,457.439C408.86,462.004 404.294,468.852 404.294,468.852L416.36,469.178C416.36,469.178 414.077,456.136 416.36,450.919C418.642,445.702 429.403,413.746 429.077,410.812C428.751,407.877 428.098,404.942 429.403,405.921C430.707,406.899 442.12,417.66 443.098,424.508C444.076,431.355 446.033,458.418 445.706,460.701C445.38,462.984 443.098,469.833 443.098,469.833L454.836,468.201C454.836,468.201 453.858,436.573 450.923,428.096C447.988,419.618 449.293,408.205 447.989,405.596C446.685,402.988 439.511,396.791 437.881,388.639C436.251,380.487 437.881,366.466 436.577,359.618C444.729,365.487 448.968,362.554 448.968,362.554C448.968,362.554 442.12,347.555 435.273,343.316C428.426,339.077 409.186,337.119 399.078,339.076C388.97,341.033 374.622,343.641 367.775,341.685C360.928,339.728 342.994,342.337 339.408,335.164C335.821,327.99 331.582,321.796 335.495,319.513C339.408,317.23 348.864,313.317 349.19,306.143C338.103,306.143 332.233,310.056 332.233,310.056C332.233,310.056 331.673,309.621 330.839,309.079C332.642,307.343 336.165,304.049 339.291,301.746C341.295,300.269 344.264,297.966 347.228,295.158C353.738,301.357 371.309,296.77 369.496,289.064C362.349,296.211 353.287,293.009 350.526,291.78C352.806,289.233 354.845,286.43 356.124,283.531C356.465,282.759 356.757,281.956 357.022,281.137C361.713,279.92 377.267,274.662 376.875,258.398C373.417,269.235 369.727,272.002 365.807,274.078C363.321,275.394 360.104,275.966 358.076,276.21C358.791,269.702 357.038,262.211 351.281,254.48C356.844,267.196 355.47,276.887 351.959,283.895C350.494,282.549 347.735,279.505 346.901,275.001C345.259,279.015 347.949,285.767 349.599,287.84C348.52,289.369 347.363,290.724 346.211,291.91C344.614,290.389 340.713,285.991 339.983,278.69C339.061,269.467 339.523,264.855 334.22,261.166C337.909,268.314 337.448,274.079 337.217,279.151C337.024,283.394 342.106,291.589 343.79,294.183C342.134,295.606 340.62,296.662 339.523,297.364C336.42,299.35 333.281,302.049 331.016,304.138C333.609,298.416 336.108,288.908 330.07,280.072C331.787,291.661 330.904,302.047 326.498,306.963C323.49,305.923 319.53,305.397 315.17,306.927C310.792,301.997 309.918,291.633 311.631,280.072C305.593,288.908 308.092,298.416 310.685,304.138C308.42,302.049 305.281,299.35 302.178,297.364C301.081,296.662 299.567,295.606 297.911,294.183C299.595,291.589 304.677,283.394 304.484,279.151C304.253,274.079 303.792,268.313 307.481,261.166C302.178,264.855 302.641,269.467 301.718,278.69C300.988,285.991 297.087,290.389 295.49,291.91C294.338,290.724 293.181,289.369 292.102,287.84C293.753,285.766 296.443,279.015 294.8,275.001C293.966,279.505 291.208,282.55 289.742,283.895C286.23,276.886 284.856,267.195 290.42,254.479Z" style="stroke:rgba(122,166,203,1);fill-rule:nonzero; stroke-width: 1px; fill: rgba(122,166,203,0.2)" />
  </g>
  <g id="patronus" transform="matrix(1,0,0,1,15.1726,-41.0841)">
    <path d="M290.42,254.479C284.663,262.21 282.91,269.7 283.625,276.208C281.596,275.964 278.379,275.392 275.894,274.076C271.974,272.001 268.285,269.233 264.826,258.396C264.434,274.66 279.987,279.918 284.679,281.135C284.944,281.954 285.237,282.757 285.577,283.529C286.856,286.428 288.896,289.231 291.175,291.778C288.414,293.007 279.352,296.209 272.205,289.062C270.392,296.768 287.962,301.355 294.473,295.156C297.436,297.965 300.405,300.267 302.409,301.744C305.542,304.053 309.077,307.361 310.876,309.093C310.281,309.488 309.685,309.893 309.083,310.38C309.083,310.38 303.214,305.164 296.366,307.12C301.257,318.206 307.779,315.271 309.083,320.162C310.387,325.053 309.735,326.685 307.779,331.902C305.823,337.119 303.54,362.878 315.604,378.203C327.669,393.528 340.059,397.441 339.733,405.919C339.407,414.397 342.017,452.873 339.082,458.09C336.147,463.307 333.212,470.481 333.212,470.481L343.32,469.502C343.32,469.502 343.646,464.937 345.603,462.002C347.559,459.067 348.212,455.482 348.212,450.917C348.212,446.352 350.168,429.069 351.146,421.243C352.124,413.417 357.016,402.331 357.016,402.331C357.016,402.331 362.886,455.807 360.603,459.068C358.321,462.329 354.082,470.155 354.082,470.155L365.82,469.829C365.82,469.829 363.864,465.262 365.82,462.002C367.777,458.741 367.45,455.155 367.124,452.547C366.798,449.938 369.081,406.245 372.015,400.376C389.297,404.615 399.078,400.376 399.078,400.376C399.078,400.376 407.555,412.767 413.424,414.397C419.293,416.027 411.469,452.874 410.164,457.439C408.86,462.004 404.294,468.852 404.294,468.852L416.36,469.178C416.36,469.178 414.077,456.136 416.36,450.919C418.642,445.702 429.403,413.746 429.077,410.812C428.751,407.877 428.098,404.942 429.403,405.921C430.707,406.899 442.12,417.66 443.098,424.508C444.076,431.355 446.033,458.418 445.706,460.701C445.38,462.984 443.098,469.833 443.098,469.833L454.836,468.201C454.836,468.201 453.858,436.573 450.923,428.096C447.988,419.618 449.293,408.205 447.989,405.596C446.685,402.988 439.511,396.791 437.881,388.639C436.251,380.487 437.881,366.466 436.577,359.618C444.729,365.487 448.968,362.554 448.968,362.554C448.968,362.554 442.12,347.555 435.273,343.316C428.426,339.077 409.186,337.119 399.078,339.076C388.97,341.033 374.622,343.641 367.775,341.685C360.928,339.728 342.994,342.337 339.408,335.164C335.821,327.99 331.582,321.796 335.495,319.513C339.408,317.23 348.864,313.317 349.19,306.143C338.103,306.143 332.233,310.056 332.233,310.056C332.233,310.056 331.673,309.621 330.839,309.079C332.642,307.343 336.165,304.049 339.291,301.746C341.295,300.269 344.264,297.966 347.228,295.158C353.738,301.357 371.309,296.77 369.496,289.064C362.349,296.211 353.287,293.009 350.526,291.78C352.806,289.233 354.845,286.43 356.124,283.531C356.465,282.759 356.757,281.956 357.022,281.137C361.713,279.92 377.267,274.662 376.875,258.398C373.417,269.235 369.727,272.002 365.807,274.078C363.321,275.394 360.104,275.966 358.076,276.21C358.791,269.702 357.038,262.211 351.281,254.48C356.844,267.196 355.47,276.887 351.959,283.895C350.494,282.549 347.735,279.505 346.901,275.001C345.259,279.015 347.949,285.767 349.599,287.84C348.52,289.369 347.363,290.724 346.211,291.91C344.614,290.389 340.713,285.991 339.983,278.69C339.061,269.467 339.523,264.855 334.22,261.166C337.909,268.314 337.448,274.079 337.217,279.151C337.024,283.394 342.106,291.589 343.79,294.183C342.134,295.606 340.62,296.662 339.523,297.364C336.42,299.35 333.281,302.049 331.016,304.138C333.609,298.416 336.108,288.908 330.07,280.072C331.787,291.661 330.904,302.047 326.498,306.963C323.49,305.923 319.53,305.397 315.17,306.927C310.792,301.997 309.918,291.633 311.631,280.072C305.593,288.908 308.092,298.416 310.685,304.138C308.42,302.049 305.281,299.35 302.178,297.364C301.081,296.662 299.567,295.606 297.911,294.183C299.595,291.589 304.677,283.394 304.484,279.151C304.253,274.079 303.792,268.313 307.481,261.166C302.178,264.855 302.641,269.467 301.718,278.69C300.988,285.991 297.087,290.389 295.49,291.91C294.338,290.724 293.181,289.369 292.102,287.84C293.753,285.766 296.443,279.015 294.8,275.001C293.966,279.505 291.208,282.55 289.742,283.895C286.23,276.886 284.856,267.195 290.42,254.479Z" style="fill:rgba(122,166,203,0.8);fill-rule:nonzero;" />
  </g>
</svg>
`,q=[`/images/web_art/patronus/bg.png`,`/images/web_art/patronus/layer-1.png`,`/images/web_art/patronus/layer-2.png`,`/images/web_art/patronus/layer-4.png`,`/images/web_art/patronus/layer-5.png`,`/images/web_art/patronus/layer-6.png`];function J({locked:e=!1}){let t=(0,s.useRef)(null),n=(0,s.useRef)([]),r=(0,s.useRef)(0),i=(0,s.useRef)(0),a=q,o=(0,s.useMemo)(()=>_(),[]);return(0,s.useEffect)(()=>{let a=t.current;if(!a)return;let s=n.current.filter(Boolean);if(!s.length)return;let c=!0,l=!1,u=null,d=null,f=(e,t)=>{let n=(e-.5)*30;for(let r=0;r<s.length;r++){let i=s[r],a=r*18,o=r*8,c=(e-.5)*a,l=(t-.5)*o;i.style.transform=`translate3d(${c}px, ${l}px, 0) rotateY(${n}deg)`}},p=(e,t)=>{let n=Math.max(-.55,Math.min(.55,(e-.5)*1.1)),r=Math.max(-.35,Math.min(.35,(t-.5)*.7));f(.5+n,.5+r)},m=e=>{let t=a.getBoundingClientRect(),n=(e.clientX-t.left)/Math.max(1,t.width),r=(e.clientY-t.top)/Math.max(1,t.height);c=!0,i.current=performance.now()+650,p(Math.max(0,Math.min(1,n)),Math.max(0,Math.min(1,r)))},h=e=>{let t=a.getBoundingClientRect(),n=(e.clientX-t.left)/Math.max(1,t.width),r=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,n)),y:Math.max(0,Math.min(1,r))}},g=e=>{if(e.pointerType===`mouse`)return;l=!0,u=e.pointerId,c=!0,i.current=performance.now()+900;let t=h(e);p(t.x,t.y),!o&&d==null&&(d=requestAnimationFrame(x))},_=e=>{if(!l||u!=null&&e.pointerId!==u)return;c=!0,i.current=performance.now()+900;let t=h(e);p(t.x,t.y)},v=e=>{(u==null||(e==null?void 0:e.pointerId)==null||e.pointerId===u)&&(l=!1,u=null,c=!0,!o&&d==null&&(d=requestAnimationFrame(x)))},y=()=>{c=!0,!o&&d==null&&(d=requestAnimationFrame(x))},b=()=>{c=!0,!o&&d==null&&(d=requestAnimationFrame(x))},x=()=>{if(c){if(!o&&performance.now()>=i.current){r.current+=.008;let e=Math.sin(r.current)*.5+.5;p(e,.5)}d=requestAnimationFrame(x)}};return c=!e,a.addEventListener(`mouseenter`,y),a.addEventListener(`mousemove`,m),a.addEventListener(`mouseleave`,b),a.addEventListener(`pointerdown`,g),a.addEventListener(`pointermove`,_),a.addEventListener(`pointerup`,v),a.addEventListener(`pointercancel`,v),p(.5,.5),!o&&!e&&(d=requestAnimationFrame(x)),()=>{a.removeEventListener(`mouseenter`,y),a.removeEventListener(`mousemove`,m),a.removeEventListener(`mouseleave`,b),a.removeEventListener(`pointerdown`,g),a.removeEventListener(`pointermove`,_),a.removeEventListener(`pointerup`,v),a.removeEventListener(`pointercancel`,v),d!=null&&cancelAnimationFrame(d)}},[e,o]),(0,c.jsxs)(`div`,{ref:t,className:`article-web-art-tile article-web-art-tile-patronus`,role:`img`,"aria-label":`Patronus parallax tile`,children:[(0,c.jsxs)(`div`,{className:`patronus-card`,children:[(0,c.jsx)(`div`,{className:`patronus-layer patronus-bg`,ref:e=>{n.current[0]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[0]})}),(0,c.jsx)(`div`,{className:`patronus-layer`,ref:e=>{n.current[1]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[1]})}),(0,c.jsx)(`div`,{className:`patronus-layer`,ref:e=>{n.current[2]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[2]})}),(0,c.jsx)(`div`,{className:`patronus-layer patronus-svg`,ref:e=>{n.current[3]=e},dangerouslySetInnerHTML:{__html:oe}}),(0,c.jsx)(`div`,{className:`patronus-layer`,ref:e=>{n.current[4]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[3]})}),(0,c.jsx)(`div`,{className:`patronus-layer`,ref:e=>{n.current[5]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[4]})}),(0,c.jsx)(`div`,{className:`patronus-layer`,ref:e=>{n.current[6]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[5]})})]}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Patronus`})]})}function Y({itemWrapper:e,locked:t,onReady:n}){let r=(0,s.useRef)(!1);(0,s.useEffect)(()=>{r.current||(r.current=!0,n==null||n(e.uniqueId))},[e.uniqueId,n]);let i=(0,s.useMemo)(()=>[{key:`stop`,hoverMode:`stop`,hoverDuration:`5s`},{key:`slow`,hoverMode:`slow`,hoverDuration:`18s`},{key:`super-fast`,hoverMode:`super-fast`,hoverDuration:`0.22s`},{key:`very-fast`,hoverMode:`very-fast`,hoverDuration:`0.55s`}],[]);return(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-spin-boxes ${t?`article-web-art-spin-boxes-locked`:``}`,children:(0,c.jsx)(`div`,{className:`article-web-art-spin-boxes-grid`,children:i.map(({key:e,hoverDuration:t,hoverMode:n})=>(0,c.jsx)(`div`,{className:`article-web-art-spin-box`,style:{"--spin-duration":`5s`,"--spin-hover-duration":t},children:(0,c.jsx)(`div`,{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${n}`})},e))})})}function se({itemWrapper:e,index:t,activate:n,locked:r,onReady:i}){let a=(0,s.useRef)(!1),o=(0,s.useMemo)(()=>[`level-1`,`level-2`,`level-3`,`level-4`,`level-5`],[]),[l,u]=(0,s.useState)(0),d=o[l],f=(0,s.useMemo)(()=>Array.from({length:50},(e,t)=>({key:t,style:{animationDelay:`${3/25*(t+1)}s`,"--bar-index":t}})),[]),p=(0,s.useCallback)(e=>{var t,n;e==null||(t=e.preventDefault)==null||t.call(e),e==null||(n=e.stopPropagation)==null||n.call(e),u(e=>(e+1)%o.length)},[o.length]);return(0,s.useEffect)(()=>{n&&(a.current||(a.current=!0,i==null||i(e.uniqueId)))},[n,e.uniqueId,i]),(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable`,"aria-label":`Bars web art tile ${t+1}, ${d.replace(`level-`,`mode `)}`,disabled:r,onClick:r?void 0:p,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&p(e)},children:(0,c.jsx)(`div`,{className:`article-web-art-bars-stage article-web-art-bars-stage-${d}`,children:(0,c.jsx)(`div`,{className:`article-web-art-bars article-web-art-bars-${d}`,children:f.map(e=>(0,c.jsx)(`div`,{className:`article-web-art-bars-panel`,style:e.style},e.key))})})})}var ce=`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #212121;
}

@keyframes pulse {
  70% {
    background-color: #e6e6ff;
  }
}

.box {
  -webkit-filter: contrast(30);
  filter: contrast(30);
  box-shadow: 0 0 100px black;
  background-color: black;
  font-size: min(10em, 48vmin);
  padding: 0.5em;
  position: relative;
  z-index: 0;
  color: #808080;
  border: 2px solid #555;
  width: 1em;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
  transition: background-color 2s linear;
}

.box:hover {
  background-color: #d580ff;
  animation: pulse 5s ease-in infinite;
}

.box:active {
  background-color: black;
  -webkit-filter: contrast(50) invert(1);
  filter: contrast(50) invert(1);
  animation: none;
}

@keyframes swayx {
  50% {
    left: 75%;
  }
}

@keyframes swayy {
  50% {
    top: 75%;
  }
}

@keyframes color {
  14.2857142857% { background-color: hsl(14.2857142857deg 100% 50%); }
  28.5714285714% { background-color: hsl(28.5714285714deg 100% 50%); }
  42.8571428571% { background-color: hsl(42.8571428571deg 100% 50%); }
  57.1428571429% { background-color: hsl(57.1428571429deg 100% 50%); }
  71.4285714286% { background-color: hsl(71.4285714286deg 100% 50%); }
  85.7142857143% { background-color: hsl(85.7142857143deg 100% 50%); }
  100% { background-color: hsl(100deg 100% 50%); }
}

.circle {
  border-radius: 50%;
  height: 1em;
  width: 1em;
  -webkit-filter: blur(25px);
  filter: blur(25px);
  position: absolute;
  background-color: white;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.one {
  animation: color 12s linear infinite alternate;
}

.two {
  font-size: 0.75em;
  left: -75%;
  top: -75%;
  animation:
    swayx 3s ease-in-out infinite,
    swayy 3.3s ease-in-out infinite,
    color 16s linear infinite alternate-reverse;
}
  </style>
</head>
<body>
  <div class="box">
    <div class="one circle"></div>
    <div class="two circle"></div>
  </div>
</body>
</html>`;function le({itemWrapper:e,index:t,activate:n,onReady:r}){let i=(0,s.useRef)(!1),a=(0,s.useRef)(null);return(0,s.useEffect)(()=>{n&&(i.current||(i.current=!0,r==null||r(e.uniqueId)))},[n,e.uniqueId,r]),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-pulse-tile`,role:`img`,"aria-label":`Pulse web art tile ${t+1}`,children:(0,c.jsx)(`iframe`,{ref:a,className:`article-web-art-pulse-frame`,title:`Pulse web art`,srcDoc:ce,sandbox:``,scrolling:`no`})})}function X(){return(0,s.useMemo)(()=>_(),[])}function Z({readyId:e,activate:t=!0,locked:n=!1,onReady:r,config:i,createEngine:a,maxDpr:o=1.5,idleTimeoutMs:c=220,intersectionThreshold:l=.25,renderStaticOnInit:u=!0,startWhenLocked:d=!1,onAfterInit:f=null,onResize:p=null,onLocked:h=null,shouldStartOnIntersect:_=null}){let v=(0,s.useRef)(null),y=(0,s.useRef)(null),b=(0,s.useRef)(null),x=(0,s.useRef)(!1),S=(0,s.useRef)(!0),C=(0,s.useRef)(n),w=(0,s.useRef)({createEngine:a,onAfterInit:f,onResize:p,onLocked:h,shouldStartOnIntersect:_});return(0,s.useEffect)(()=>{C.current=n},[n]),(0,s.useEffect)(()=>{w.current={createEngine:a,onAfterInit:f,onResize:p,onLocked:h,shouldStartOnIntersect:_}}),(0,s.useEffect)(()=>{if(!t)return;let n=v.current,a=y.current;if(!n||!a)return;let s=!1,f=null,p=null,h=null,_=()=>{x.current||(x.current=!0,r==null||r(e))},T=m(async()=>{try{var e,t;if(f=await w.current.createEngine(a,i,{tile:n}),s||!f){s||_();return}b.current=f;let m=()=>{let e=typeof window<`u`&&window.devicePixelRatio||1;g(n,f,o==null?e:Math.min(o,e))};if(m(),u){var r;(r=f.renderStatic)==null||r.call(f)}if(((e=(t=w.current).onAfterInit)==null?void 0:e.call(t,f,{tile:n,canvas:a,updateSize:m,isCanceled:()=>s}))===!1){_();return}if((!C.current||d)&&S.current){var c;(c=f.start)==null||c.call(f)}_(),p=new ResizeObserver(()=>{var e,t;m(),(e=(t=w.current).onResize)==null||e.call(t,f)}),p.observe(n),l!=null&&typeof window<`u`&&`IntersectionObserver`in window&&(h=new IntersectionObserver(e=>{for(let o of e){var t,n;if(S.current=!!o.isIntersecting,!(w.current.shouldStartOnIntersect&&w.current.shouldStartOnIntersect(f,S.current,C.current)===`handled`)){if(C.current&&!d){var r,i,a;(r=(i=w.current).onLocked)==null||r.call(i,f),(a=f.stop)==null||a.call(f)}else S.current?(t=f.start)==null||t.call(f):(n=f.stop)==null||n.call(f)}}},{threshold:l}),h.observe(n))}catch{_()}},{timeoutMs:c});return()=>{var e;s=!0,T==null||T(),h==null||h.disconnect(),p==null||p.disconnect(),f==null||(e=f.destroy)==null||e.call(f),b.current=null}},[t,i,c,l,o,r,e,u,d]),(0,s.useEffect)(()=>{var e;let t=b.current;if(t){if(n){var r,i,a,o,s,c,l;(r=(i=w.current).onLocked)==null||r.call(i,t),(a=t.clearPointer)==null||a.call(t),(o=t.clearMouse)==null||o.call(t),(s=t.setHeld)==null||s.call(t,!1),(c=t.setHoverActive)==null||c.call(t,!1),(l=t.stop)==null||l.call(t)}else S.current&&((e=t.start)==null||e.call(t))}},[n]),{tileRef:v,canvasRef:y,engineRef:b,visibleRef:S}}function Q(e,t={x:.5,y:.5}){return(0,s.useCallback)(n=>w(e.current,n,t),[t,e])}function ue(e,t={x:0,y:0}){return(0,s.useCallback)(n=>T(e.current,n,t),[t,e])}function de({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=X(),u=(0,s.useMemo)(()=>({seed:54013+(Number(e.id)||11)*7331,reduceMotion:l}),[e.id,l]),{tileRef:d,canvasRef:f,engineRef:p}=Z({readyId:e.uniqueId,activate:n,locked:r,onReady:a,config:u,maxDpr:1.5,idleTimeoutMs:220,intersectionThreshold:.25,createEngine:async(e,t)=>(await i(()=>import(`./distanceFieldEngine-BympYK9O.js`),[])).createDistanceFieldEngine(e,t)}),m=Q(d);return(0,c.jsxs)(`button`,{type:`button`,ref:d,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Distance web art tile ${t+1}`,disabled:r,onPointerEnter:r?void 0:(()=>{var e,t,n,r;(e=p.current)==null||(t=e.setHoverActive)==null||t.call(e,!0),(n=p.current)==null||(r=n.start)==null||r.call(n)}),onPointerMove:r?void 0:(e=>{var t,n,r,i;let a=m(e);(t=p.current)==null||(n=t.setHoverActive)==null||n.call(t,!0),(r=p.current)==null||(i=r.setPointer)==null||i.call(r,a.x,a.y)}),onPointerLeave:r?void 0:(()=>{var e,t,n,r;o.current=null,(e=p.current)==null||(t=e.setHoverActive)==null||t.call(e,!1),(n=p.current)==null||(r=n.clearPointer)==null||r.call(n)}),onPointerDown:r?void 0:(e=>{var t,n,r,i,a,s;if(e.button!=null&&e.button!==0)return;o.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let c=m(e);(t=p.current)==null||(n=t.setHoverActive)==null||n.call(t,!0),(r=p.current)==null||(i=r.setPointer)==null||i.call(r,c.x,c.y),(a=p.current)==null||(s=a.boostPopulation)==null||s.call(a)}),onPointerUp:r?void 0:(e=>{(o.current==null||e.pointerId===o.current)&&(o.current=null)}),onPointerCancel:r?void 0:(()=>{var e,t,n,r;o.current=null,(e=p.current)==null||(t=e.setHoverActive)==null||t.call(e,!1),(n=p.current)==null||(r=n.clearPointer)==null||r.call(n)}),onFocus:r?void 0:(()=>{var e,t,n,r;(e=p.current)==null||(t=e.setHoverActive)==null||t.call(e,!0),(n=p.current)==null||(r=n.start)==null||r.call(n)}),onBlur:r?void 0:(()=>{var e,t,n,r;o.current=null,(e=p.current)==null||(t=e.setHoverActive)==null||t.call(e,!1),(n=p.current)==null||(r=n.clearPointer)==null||r.call(n)}),onKeyDown:r?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n;e.preventDefault(),(t=p.current)==null||(n=t.boostPopulation)==null||n.call(t)}}),children:[(0,c.jsx)(`canvas`,{ref:f,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Distance`})]})}function fe({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(null),f=(0,s.useRef)(null),p=(0,s.useRef)(!1),h=(0,s.useRef)(!0),_=X();(0,s.useEffect)(()=>{if(!n)return;let t=o.current,s=l.current,c=u.current;if(!t||!s||!c)return;let v=!1,y=null,b=null,x=null,S=null,C=()=>{p.current||(p.current=!0,a==null||a(e.uniqueId))},w=m(async()=>{try{var e,n,a,o;let l=await i(()=>import(`./androidBackgroundEngine-BloJcAus.js`),__vite__mapDeps([0,1])),u=await i(()=>import(`./androidRobotEngine-OOLFd8Bk.js`),[]);if(v)return;y=l.createAndroidBackgroundEngine(s,{reduceMotion:_}),d.current=y,b=u.createAndroidRobotEngine(c,{reduceMotion:_}),f.current=b;let p=()=>{let e=Math.min(1.5,window.devicePixelRatio||1);g(t,y,e),g(t,b,e)};p(),(e=y.renderStatic)==null||e.call(y),(n=b.renderStatic)==null||n.call(b),r||(a=y.start)==null||a.call(y),r||(o=b.start)==null||o.call(b),C(),x=new ResizeObserver(()=>{p()}),x.observe(t),`IntersectionObserver`in window&&(S=new IntersectionObserver(e=>{for(let c of e)if(h.current=!!c.isIntersecting,r){var t,n;(t=y.stop)==null||t.call(y),(n=b.stop)==null||n.call(b)}else if(h.current){var i,a;(i=y.start)==null||i.call(y),(a=b.start)==null||a.call(b)}else{var o,s;(o=y.stop)==null||o.call(y),(s=b.stop)==null||s.call(b)}},{threshold:.2}),S.observe(t))}catch{C()}},{timeoutMs:220});return()=>{var e,t;v=!0,w==null||w(),S==null||S.disconnect(),x==null||x.disconnect(),y==null||(e=y.destroy)==null||e.call(y),b==null||(t=b.destroy)==null||t.call(b),d.current=null,f.current=null}},[n,e.uniqueId,r,a,_]),(0,s.useEffect)(()=>{let e=f.current,t=d.current;if(e&&t){if(r){var n,i,a;(n=e.clearPointer)==null||n.call(e),(i=t.stop)==null||i.call(t),(a=e.stop)==null||a.call(e)}else if(h.current){var o,s;(o=t.start)==null||o.call(t),(s=e.start)==null||s.call(e)}}},[r]);let v=Q(o);return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android`,"aria-label":`Android web art tile ${t+1}`,disabled:r,onPointerEnter:r?void 0:(()=>{var e,t;(e=f.current)==null||(t=e.start)==null||t.call(e)}),onPointerMove:r?void 0:(e=>{var t,n;let r=v(e);(t=f.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)}),onPointerLeave:r?void 0:(()=>{var e,t;(e=f.current)==null||(t=e.clearPointer)==null||t.call(e)}),onFocus:r?void 0:(()=>{var e,t;(e=f.current)==null||(t=e.start)==null||t.call(e)}),onBlur:r?void 0:(()=>{var e,t;(e=f.current)==null||(t=e.clearPointer)==null||t.call(e)}),onClick:r?void 0:(()=>{var e,t;(e=f.current)==null||(t=e.poke)==null||t.call(e)}),onKeyDown:r?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n;e.preventDefault(),(t=f.current)==null||(n=t.poke)==null||n.call(t)}}),children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-android-bg-canvas`,"aria-hidden":!0}),(0,c.jsx)(`div`,{className:`article-web-art-android-glow`,"aria-hidden":!0}),(0,c.jsx)(`canvas`,{ref:u,className:`article-web-art-android-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Android`})]})}function pe({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=X(),l=(0,s.useMemo)(()=>({seed:1729+(Number(e.id)||8)*4242,reduceMotion:o,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[e.id,o]),{tileRef:u,canvasRef:d,engineRef:f}=Z({readyId:e.uniqueId,activate:n,locked:r,onReady:a,config:l,maxDpr:null,idleTimeoutMs:1200,intersectionThreshold:.2,createEngine:async(e,t)=>(await i(()=>import(`./shapeFieldEngine-CBxQMvZn.js`),[])).createShapeFieldEngine(e,t),onAfterInit:e=>{var t;(t=e.triggerWave)==null||t.call(e)},onResize:e=>{var t;(t=e.renderStatic)==null||t.call(e)}}),p=ue(d);return(0,c.jsxs)(`button`,{type:`button`,ref:u,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape`,"aria-label":`Shape web art tile ${t+1}`,disabled:r,onPointerMove:r?void 0:e=>{var t,n;let r=p(e);(t=f.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onPointerDown:r?void 0:e=>{var t,n,r,i;let a=p(e);(t=f.current)==null||(n=t.setPointer)==null||n.call(t,a.x,a.y),(r=f.current)==null||(i=r.triggerWave)==null||i.call(r,a.x,a.y)},onPointerLeave:r?void 0:(()=>{var e,t;return(e=f.current)==null||(t=e.clearPointer)==null?void 0:t.call(e)}),onBlur:r?void 0:(()=>{var e,t;return(e=f.current)==null||(t=e.clearPointer)==null?void 0:t.call(e)}),onKeyDown:r?void 0:e=>{var t,n;(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),(t=f.current)==null||(n=t.triggerWave)==null||n.call(t))},children:[(0,c.jsx)(`canvas`,{ref:d,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Shape`})]})}function $({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let[o,l]=(0,s.useState)(1.15),[u,d]=(0,s.useState)(.065),{tileRef:f,canvasRef:p,engineRef:m,visibleRef:h}=Z({readyId:e.uniqueId,activate:n,locked:r,onReady:a,config:null,maxDpr:null,idleTimeoutMs:1200,intersectionThreshold:.2,renderStaticOnInit:!1,createEngine:async e=>(await i(()=>import(`./hourglassEngine-CEGlumjW.js`),__vite__mapDeps([2,3,4]))).createHourglassEngine(e),onAfterInit:e=>{var t;let n=(t=e.getState)==null?void 0:t.call(e);n&&(l(n.gravity),d(n.neckRatio))}}),g=e=>{var t,n;(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),(t=m.current)==null||(n=t.flip)==null||n.call(t))},_=e=>{e.stopPropagation()};return(0,c.jsxs)(`div`,{ref:f,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass`,role:r?void 0:`button`,tabIndex:r?-1:0,"aria-label":`Hourglass web art tile ${t+1}`,onClick:r?void 0:(()=>{var e,t;return(e=m.current)==null||(t=e.flip)==null?void 0:t.call(e)}),onKeyDown:r?void 0:g,children:[(0,c.jsx)(`canvas`,{ref:p,className:`article-web-art-canvas`}),(0,c.jsxs)(`div`,{className:`article-web-art-hourglass-controls`,onClick:_,onPointerDown:_,onPointerUp:_,onKeyDown:_,children:[(0,c.jsxs)(`label`,{className:`article-web-art-hourglass-control article-web-art-hourglass-control-left`,children:[(0,c.jsxs)(`span`,{className:`article-web-art-hourglass-control-name`,children:[(0,c.jsx)(`span`,{children:`Neck`}),(0,c.jsxs)(`output`,{children:[Math.round(u*100),`%`]})]}),(0,c.jsx)(`input`,{className:`article-web-art-hourglass-slider`,type:`range`,min:`0.025`,max:`0.17`,step:`0.001`,value:u,onChange:e=>{var t,n,i,a;let o=Number(e.target.value);d(o),(t=m.current)==null||(n=t.setNeckRatio)==null||n.call(t,o),!r&&h.current&&((i=m.current)==null||(a=i.start)==null||a.call(i))},disabled:r,"aria-label":`Hourglass neck size`})]}),(0,c.jsxs)(`label`,{className:`article-web-art-hourglass-control article-web-art-hourglass-control-right`,children:[(0,c.jsxs)(`span`,{className:`article-web-art-hourglass-control-name`,children:[(0,c.jsx)(`span`,{children:`Gravity`}),(0,c.jsxs)(`output`,{children:[o.toFixed(2),`×`]})]}),(0,c.jsx)(`input`,{className:`article-web-art-hourglass-slider`,type:`range`,min:`0.5`,max:`1.9`,step:`0.01`,value:o,onChange:e=>{var t,n;let r=Number(e.target.value);l(r),(t=m.current)==null||(n=t.setGravity)==null||n.call(t,r)},disabled:r,"aria-label":`Hourglass gravity`})]})]}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Hourglass`})]})}function me({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(null),f=(0,s.useRef)(!1),p=(0,s.useRef)(!0),[h,_]=(0,s.useState)(!1),v=X();(0,s.useEffect)(()=>{if(!n)return;let t=o.current,s=l.current,c=u.current;if(!t||!s||!c)return;let h=!1,y=null,b=null,x=null,S=()=>{f.current||(f.current=!0,a==null||a(e.uniqueId))},C=e=>{h||(_(!0),S())},w=()=>{var e;return!h&&(y==null||(e=y.renderStatic)==null||e.call(y),y!=null&&y.hasVisibleFrame&&!y.hasVisibleFrame()?(C(`Canvas rendered no visible Noice frame`),!1):(_(!1),S(),!0))},T=m(async()=>{try{var e;let n=await i(()=>import(`./noiceShaderEngine-B-tmSHVT.js`),[]);if(h)return;y=n.createNoiceShaderEngine({backgroundCanvas:s,foregroundCanvas:c},{reduceMotion:v}),d.current=y;let a=()=>g(t,y,Math.min(1.5,window.devicePixelRatio||1));if(a(),!w())return;r||(e=y.start)==null||e.call(y),b=new ResizeObserver(()=>{var e;a(),y==null||(e=y.renderStatic)==null||e.call(y)}),b.observe(t),`IntersectionObserver`in window&&(x=new IntersectionObserver(e=>{for(let a of e){var t,n;if(p.current=!!a.isIntersecting,r){var i;(i=y.stop)==null||i.call(y)}else p.current?(t=y.start)==null||t.call(y):(n=y.stop)==null||n.call(y)}},{threshold:.25}),x.observe(t))}catch(e){C(e)}},{timeoutMs:220});return()=>{var e;h=!0,T==null||T(),x==null||x.disconnect(),b==null||b.disconnect(),y==null||(e=y.destroy)==null||e.call(y),d.current=null}},[n,e.uniqueId,r,a,v]),(0,s.useEffect)(()=>{var e;let t=d.current;if(t){if(r){var n,i;(n=t.clearPointer)==null||n.call(t),(i=t.stop)==null||i.call(t)}else p.current&&((e=t.start)==null||e.call(t))}},[r]);let y=Q(o),b=e=>{var t,n,r,i,a,o;let s=y(e);(t=d.current)==null||(n=t.setPointer)==null||n.call(t,s.x,s.y),(r=d.current)==null||(i=r.pulsePattern)==null||i.call(r),(a=d.current)==null||(o=a.start)==null||o.call(a)};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice ${h?`article-web-art-tile-noice-fallback-active`:``}`,"aria-label":`Noice web art tile ${t+1}`,disabled:r,onPointerMove:r?void 0:(e=>{var t,n;let r=y(e);(t=d.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)}),onPointerDown:r?void 0:(e=>{(e.button==null||e.button===0)&&b(e)}),onMouseLeave:r?void 0:(()=>{var e,t;(e=d.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:r?void 0:(()=>{var e,t;(e=d.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:r?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n,r,i;e.preventDefault(),(t=d.current)==null||(n=t.pulsePattern)==null||n.call(t),(r=d.current)==null||(i=r.start)==null||i.call(r)}}),children:[h&&(0,c.jsxs)(`div`,{className:`article-web-art-noice-fallback`,"aria-hidden":!0,children:[(0,c.jsx)(`span`,{className:`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-a`}),(0,c.jsx)(`span`,{className:`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-b`}),(0,c.jsx)(`span`,{className:`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-c`})]}),(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-bg-canvas ${h?`article-web-art-canvas-hidden`:``}`}),(0,c.jsx)(`canvas`,{ref:u,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-fg-canvas ${h?`article-web-art-canvas-hidden`:``}`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Noice`})]})}function he({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=X(),u=(0,s.useMemo)(()=>({reduceMotion:l}),[l]),{tileRef:d,canvasRef:f,engineRef:p}=Z({readyId:e.uniqueId,activate:n,locked:r,onReady:a,config:u,maxDpr:1.5,idleTimeoutMs:220,intersectionThreshold:.25,createEngine:async(e,t)=>(await i(()=>import(`./deepShaderEngine-QIOiqslc.js`),[])).createDeepShaderEngine(e,t),onResize:e=>{var t;(t=e.renderStatic)==null||t.call(e)},onLocked:()=>{o.current=null}}),m=Q(f);return(0,c.jsxs)(`button`,{type:`button`,ref:d,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-deep`,"aria-label":`Deep web art tile ${t+1}`,disabled:r,onPointerDown:r?void 0:e=>{var t,n,r,i;if(e.button!=null&&e.button!==0)return;o.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let a=m(e);(t=p.current)==null||(n=t.setPointer)==null||n.call(t,a.x,a.y),(r=p.current)==null||(i=r.start)==null||i.call(r)},onPointerMove:r?void 0:e=>{var t,n;if(o.current!=null&&e.pointerId!==o.current||o.current==null&&e.pointerType!==`mouse`)return;let r=m(e);o.current!=null&&((t=p.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y))},onPointerUp:r?void 0:e=>{var t,n;(o.current==null||e.pointerId===o.current)&&(o.current=null,(t=p.current)==null||(n=t.clearPointer)==null||n.call(t))},onPointerCancel:r?void 0:(()=>{var e,t;o.current=null,(e=p.current)==null||(t=e.clearPointer)==null||t.call(e)}),onMouseLeave:r?void 0:(()=>{var e,t;o.current=null,(e=p.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:r?void 0:(()=>{var e,t;o.current=null,(e=p.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:r?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n;e.preventDefault(),(t=p.current)==null||(n=t.start)==null||n.call(t)}}),children:[(0,c.jsx)(`canvas`,{ref:f,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Deep`})]})}function ge({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(!0),l=Number(e==null?void 0:e.id)===5,u=X(),d=(0,s.useMemo)(()=>{let n=Number(e.id)||t+1,r=.0026+n*8e-5,i=.0054+n*14e-5,a=n%2?1:2,o={kx:11+n*2,ky:n%2};return{refreshDelay:l?0:8e3,radiusMini:r,radiusMaxi:i,dHueStep:a,startGroup:o,seed:1337+n*1009,reduceMotion:u}},[l,e.id,t,u]),{tileRef:f,canvasRef:p,engineRef:m,visibleRef:h}=Z({readyId:e.uniqueId,activate:n,locked:r,onReady:a,config:d,maxDpr:null,idleTimeoutMs:1200,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./embroideryEngine-BxVJh5hl.js`),__vite__mapDeps([5,6,3,7]))).createEmbroideryEngine(e,t),onResize:e=>{var t;(t=e.renderStatic)==null||t.call(e)},shouldStartOnIntersect:(e,t)=>l?(t||e.stop(),`handled`):(t&&o.current?e.start():e.stop(),`handled`)}),g=()=>{var e;o.current=!0,h.current&&((e=m.current)==null||e.start())},_=()=>{var e,t,n,r;o.current=!0,h.current?(e=m.current)==null||(t=e.start)==null||t.call(e):(n=m.current)==null||(r=n.stop)==null||r.call(n)},v=()=>{var e,t,n,r;if(l){var i,a,o,s,c,u;(i=m.current)==null||(a=i.stop)==null||a.call(i),(o=m.current)==null||(s=o.reset)==null||s.call(o),(c=m.current)==null||(u=c.start)==null||u.call(c)}else(e=m.current)==null||e.reset(),(t=m.current)==null||(n=t.renderStatic)==null||n.call(t),h.current&&((r=m.current)==null||r.start())};return(0,c.jsxs)(`button`,{type:`button`,ref:f,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Web art tile ${t+1}`,disabled:r,onClick:r?void 0:v,onMouseEnter:r||l?void 0:g,onMouseLeave:r||l?void 0:_,onFocus:r||l?void 0:g,onBlur:r||l?void 0:_,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),v())},children:[(0,c.jsx)(`canvas`,{ref:p,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:l?`Click`:Number.isFinite(Number(e==null?void 0:e.id))?Number(e.id):t+1})]})}function _e({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(!1),u=X(),d=(0,s.useMemo)(()=>({seed:9001+(Number(e.id)||1)*1337,reduceMotion:u,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[e.id,u]),{tileRef:f,canvasRef:p,engineRef:m}=Z({readyId:e.uniqueId,activate:n,locked:r,onReady:a,config:d,maxDpr:null,idleTimeoutMs:1200,intersectionThreshold:null,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./spiralDotsEngine-BJH5PKR6.js`),[])).createSpiralDotsEngine(e,t),onResize:e=>{var t;e.rebuildDots(),(t=e.renderStatic)==null||t.call(e)}}),h=ue(p,{x:-1e4,y:-1e4}),g=()=>{var e;(e=m.current)==null||e.start()},_=()=>{var e,t;(e=m.current)==null||e.clearMouse(),(t=m.current)==null||t.start()};return(0,c.jsxs)(`div`,{ref:f,className:`article-web-art-tile article-web-art-tile-hover-only article-web-art-tile-hover-dots`,role:`img`,tabIndex:r?-1:0,"aria-label":`Spiral dots web art tile ${t+1}`,onPointerDown:r?void 0:e=>{var t;if(e.pointerType===`mouse`)return;let n=f.current;if(!n)return;l.current=!0,o.current=e.pointerId;try{n.setPointerCapture(e.pointerId)}catch{}g();let r=h(e);(t=m.current)==null||t.setMouse(r.x,r.y)},onPointerMove:r?void 0:e=>{var t;if(!l.current||o.current!=null&&e.pointerId!==o.current)return;let n=h(e);(t=m.current)==null||t.setMouse(n.x,n.y)},onPointerUp:r?void 0:e=>{(o.current==null||e.pointerId===o.current)&&(l.current=!1,o.current=null,_())},onPointerCancel:r?void 0:()=>{l.current=!1,o.current=null,_()},onMouseEnter:r?void 0:g,onMouseLeave:r?void 0:_,onMouseMove:r?void 0:e=>{var t;let n=h(e);(t=m.current)==null||t.setMouse(n.x,n.y)},onFocus:r?void 0:g,onBlur:r?void 0:_,children:[(0,c.jsx)(`canvas`,{ref:p,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Hover`})]})}function ve({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(!0),l=X(),u=(0,s.useMemo)(()=>({seed:424242+(Number(e.id)||2)*2027,reduceMotion:l,targetCellSize:14,gapPx:1.4}),[e.id,l]),{tileRef:d,canvasRef:f,engineRef:p,visibleRef:m}=Z({readyId:e.uniqueId,activate:n,locked:r,onReady:a,config:u,maxDpr:null,idleTimeoutMs:1200,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./gridWaveEngine-CKcG6jKX.js`),[])).createGridWaveEngine(e,t),onResize:e=>{var t;(t=e.renderStatic)==null||t.call(e)},shouldStartOnIntersect:(e,t)=>(t&&o.current?e.start():e.stop(),`handled`)}),h=()=>{var e;o.current=!0,m.current&&((e=p.current)==null||e.start())},g=()=>{var e,t,n,r;o.current=!0,m.current?(e=p.current)==null||(t=e.start)==null||t.call(e):(n=p.current)==null||(r=n.stop)==null||r.call(n)},_=e=>{let t=f.current||d.current;if(!t)return{x:0,y:0};let n=t.getBoundingClientRect();return typeof(e==null?void 0:e.clientX)!=`number`||typeof(e==null?void 0:e.clientY)!=`number`?{x:n.width/2,y:n.height/2}:{x:e.clientX-n.left,y:e.clientY-n.top}},v=e=>{var t,n,r,i;let a=_(e);(t=p.current)==null||t.rippleAt(a.x,a.y),(n=p.current)==null||(r=n.renderStatic)==null||r.call(n),o.current&&m.current&&((i=p.current)==null||i.start())};return(0,c.jsxs)(`button`,{type:`button`,ref:d,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Grid wave web art tile ${t+1}`,disabled:r,onClick:r?void 0:v,onMouseEnter:r?void 0:h,onMouseLeave:r?void 0:g,onFocus:r?void 0:h,onBlur:r?void 0:g,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),v(null))},children:[(0,c.jsx)(`canvas`,{ref:f,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Wave`})]})}function ye({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(!0),l=X(),u=(0,s.useMemo)(()=>({reduceMotion:l,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[l]),{tileRef:d,canvasRef:f,engineRef:p,visibleRef:m}=Z({readyId:e.uniqueId,activate:n,locked:r,onReady:a,config:u,maxDpr:1.5,idleTimeoutMs:300,intersectionThreshold:.25,renderStaticOnInit:!1,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./threeTunnelEngine-CGfBMksz.js`),__vite__mapDeps([8,1]))).createThreeTunnelEngine(e,t),onAfterInit:e=>{e.reset()},onResize:e=>{e.reset()},shouldStartOnIntersect:(e,t)=>(t&&o.current?e.start():e.stop(),`handled`)}),h=()=>{var e;o.current=!0,m.current&&((e=p.current)==null||e.start())},g=()=>{var e,t,n,r;o.current=!0,m.current?(e=p.current)==null||(t=e.start)==null||t.call(e):(n=p.current)==null||(r=n.stop)==null||r.call(n)},_=()=>{var e,t,n,r;(e=p.current)==null||(t=e.nextPalette)==null||t.call(e),(n=p.current)==null||n.reset(),m.current&&((r=p.current)==null||r.start())};return(0,c.jsxs)(`button`,{type:`button`,ref:d,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel`,"aria-label":`3D tunnel web art tile ${t+1}`,disabled:r,onClick:r?void 0:_,onMouseEnter:r?void 0:h,onMouseLeave:r?void 0:g,onFocus:r?void 0:h,onBlur:r?void 0:g,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),_())},children:[(0,c.jsx)(`canvas`,{ref:f,className:`article-web-art-canvas`}),(0,c.jsx)(`div`,{className:`article-web-art-tunnel-room-shade`,"aria-hidden":!0}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`3D`})]})}function be({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(!0),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!1),f=X(),p=(0,s.useMemo)(()=>({reduceMotion:f,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[f]),{tileRef:m,canvasRef:h,engineRef:g,visibleRef:_}=Z({readyId:e.uniqueId,activate:n,locked:r,onReady:a,config:p,maxDpr:1.2,idleTimeoutMs:300,intersectionThreshold:.25,renderStaticOnInit:!1,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./threePolygonDemo5Engine-gxOZu2e0.js`),__vite__mapDeps([9,1]))).createThreePolygonDemo5Engine(e,t),onAfterInit:(e,{updateSize:t,isCanceled:n})=>{e.reset(),window.requestAnimationFrame(()=>{n()||g.current!==e||(t(),e.reset())})},shouldStartOnIntersect:(e,t)=>(t&&o.current?e.start():e.stop(),`handled`)});(0,s.useEffect)(()=>()=>{u.current!=null&&window.clearTimeout(u.current)},[]);let v=()=>{var e,t,n;(e=g.current)==null||(t=e.boost)==null||t.call(e),_.current&&((n=g.current)==null||n.start())};return(0,c.jsxs)(`button`,{type:`button`,ref:m,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Polygon demo 5 web art tile ${t+1}`,disabled:r,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),v())},onPointerDown:r?void 0:e=>{var t;if(e.button==null||e.button===0){l.current=e.pointerId,d.current=!1;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}_.current&&((t=g.current)==null||t.start()),u.current!=null&&window.clearTimeout(u.current),u.current=window.setTimeout(()=>{var e,t;l.current!=null&&(d.current=!0,(e=g.current)==null||(t=e.setHeld)==null||t.call(e,!0))},140)}},onPointerUp:r?void 0:e=>{if(l.current==null||e.pointerId===l.current){if(u.current!=null&&(window.clearTimeout(u.current),u.current=null),l.current=null,d.current){var t,n;d.current=!1,(t=g.current)==null||(n=t.setHeld)==null||n.call(t,!1)}else v()}},onPointerCancel:r?void 0:(()=>{var e,t;u.current!=null&&(window.clearTimeout(u.current),u.current=null),l.current=null,d.current=!1,(e=g.current)==null||(t=e.setHeld)==null||t.call(e,!1)}),onLostPointerCapture:r?void 0:(()=>{var e,t;u.current!=null&&(window.clearTimeout(u.current),u.current=null),l.current=null,d.current=!1,(e=g.current)==null||(t=e.setHeld)==null||t.call(e,!1)}),onMouseEnter:r?void 0:(()=>{var e;o.current=!0,_.current&&((e=g.current)==null||e.start())}),onMouseLeave:r?void 0:(()=>{var e,t,n,r;u.current!=null&&(window.clearTimeout(u.current),u.current=null),l.current=null,d.current=!1,(e=g.current)==null||(t=e.setHeld)==null||t.call(e,!1),o.current=!0,_.current?(n=g.current)==null||n.start():(r=g.current)==null||r.stop()}),onFocus:r?void 0:(()=>{var e;o.current=!0,_.current&&((e=g.current)==null||e.start())}),onBlur:r?void 0:(()=>{var e,t,n,r;u.current!=null&&(window.clearTimeout(u.current),u.current=null),l.current=null,d.current=!1,(e=g.current)==null||(t=e.setHeld)==null||t.call(e,!1),o.current=!0,_.current?(n=g.current)==null||n.start():(r=g.current)==null||r.stop()}),children:[(0,c.jsx)(`canvas`,{ref:h,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Poly`})]})}function xe({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(!0),l=(0,s.useRef)(0),u=X(),d=(0,s.useMemo)(()=>({reduceMotion:u,palette:[`#DD0F7E`,`#009BBE`,`#A8DA00`,`#F2E205`,`#EE5A02`],bgColor:`#200018`,totalCircles:22,timeScale:.0017}),[u]),{tileRef:f,canvasRef:p,engineRef:m,visibleRef:h}=Z({readyId:e.uniqueId,activate:n,locked:r,onReady:a,config:d,maxDpr:null,idleTimeoutMs:1200,intersectionThreshold:.25,renderStaticOnInit:!1,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./orbitCirclesEngine-CD4igzj0.js`),[])).createOrbitCirclesEngine(e,t),onAfterInit:e=>{var t;e.reset(),(t=e.renderStatic)==null||t.call(e)},onResize:e=>{var t;(t=e.renderStatic)==null||t.call(e)},shouldStartOnIntersect:(e,t)=>(t&&o.current?e.start():e.stop(),`handled`)}),g=()=>{var e;o.current=!0,h.current&&((e=m.current)==null||e.start())},_=()=>{var e,t,n,r;o.current=!0,h.current?(e=m.current)==null||(t=e.start)==null||t.call(e):(n=m.current)==null||(r=n.stop)==null||r.call(n)},v=()=>{var e,t,n;let r=m.current;if(!r)return;let i=Math.max(1,((e=r.getTotalCircles)==null?void 0:e.call(r))||1),a=l.current%i,o=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,`0`)}`;(t=r.setCircleColor)==null||t.call(r,a,o),l.current+=1,h.current&&((n=r.start)==null||n.call(r))};return(0,c.jsxs)(`button`,{type:`button`,ref:f,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Orbit circles web art tile ${t+1}`,disabled:r,onClick:r?void 0:v,onMouseEnter:r?void 0:g,onMouseLeave:r?void 0:_,onFocus:r?void 0:g,onBlur:r?void 0:_,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),v())},children:[(0,c.jsx)(`canvas`,{ref:p,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Orbit`})]})}function Se({readyId:e,locked:t,onReady:n}){let r=X(),{tileRef:a,canvasRef:o,engineRef:l}=Z({readyId:e,locked:t,onReady:n,config:(0,s.useMemo)(()=>({seed:20250414,reduceMotion:r,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[r]),maxDpr:1.5,idleTimeoutMs:200,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./tortuosityTraceEngine-B_KPZIex.js`),[])).createTortuosityTraceEngine(e,t),onResize:e=>{var t;(t=e.reset)==null||t.call(e)}}),u=()=>{var e,t,n,r;(e=l.current)==null||(t=e.reset)==null||t.call(e),(n=l.current)==null||(r=n.start)==null||r.call(n)};return(0,c.jsxs)(`button`,{type:`button`,ref:a,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Trace web art tile`,disabled:t,onClick:t?void 0:u,onKeyDown:t?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u())},children:[(0,c.jsx)(`canvas`,{ref:o,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Trace`})]})}function Ce({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=X(),{tileRef:o,canvasRef:l,engineRef:u}=Z({readyId:e,locked:t,onReady:n,config:(0,s.useMemo)(()=>({seed:20250415,reduceMotion:a,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[a]),maxDpr:1.5,idleTimeoutMs:220,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./hexFlowBallsEngine-DyB1vY7o.js`),[])).createHexFlowBallsEngine(e,t),onResize:e=>{var t;(t=e.renderStatic)==null||t.call(e)}}),d=e=>{let t=o.current;if(!t)return{x:.5,y:.5};let n=t.getBoundingClientRect();return{x:n.width>0?(e.clientX-n.left)/n.width:.5,y:n.height>0?(e.clientY-n.top)/n.height:.5}},f=()=>{var e,t,n,r;(e=u.current)==null||(t=e.burst)==null||t.call(e),(n=u.current)==null||(r=n.start)==null||r.call(n)};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Hex flow web art tile`,disabled:t,onClick:t?void 0:f,onPointerDown:t?void 0:(e=>{var t,n;r.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let i=d(e);(t=u.current)==null||(n=t.setPointer)==null||n.call(t,i.x,i.y)}),onPointerMove:t?void 0:(e=>{var t,n;if(r.current!=null&&e.pointerId!==r.current)return;let i=d(e);(t=u.current)==null||(n=t.setPointer)==null||n.call(t,i.x,i.y)}),onPointerUp:t?void 0:(e=>{(r.current==null||e.pointerId===r.current)&&(r.current=null)}),onPointerCancel:t?void 0:(()=>{var e,t;r.current=null,(e=u.current)==null||(t=e.clearPointer)==null||t.call(e)}),onMouseMove:t?void 0:(e=>{var t,n;let r=d(e);(t=u.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)}),onMouseLeave:t?void 0:(()=>{var e,t;r.current=null,(e=u.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:t?void 0:(()=>{var e,t;r.current=null,(e=u.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:t?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),f())},children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Hex`})]})}function we({readyId:e,locked:t,onReady:n}){let r=X(),{tileRef:a,canvasRef:o,engineRef:l}=Z({readyId:e,locked:t,onReady:n,config:(0,s.useMemo)(()=>({seed:20250416,reduceMotion:r,step:6,side:5}),[r]),maxDpr:1.5,idleTimeoutMs:220,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./pixelPlopEngine-D2aEtI8w.js`),[])).createPixelPlopEngine(e,t),onResize:e=>{var t;(t=e.reset)==null||t.call(e)}}),u=()=>{var e,t,n,r;(e=l.current)==null||(t=e.seedBurst)==null||t.call(e),(n=l.current)==null||(r=n.start)==null||r.call(n)},d=e=>{var t,n,r,i;let s=o.current||a.current;if(!s||typeof(e==null?void 0:e.clientX)!=`number`||typeof(e==null?void 0:e.clientY)!=`number`){u();return}let c=s.getBoundingClientRect();(t=l.current)==null||(n=t.burstAt)==null||n.call(t,e.clientX-c.left,e.clientY-c.top),(r=l.current)==null||(i=r.start)==null||i.call(r)};return(0,c.jsxs)(`button`,{type:`button`,ref:a,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Pixel plop web art tile`,disabled:t,onPointerDown:t?void 0:(e=>{(e.button==null||e.button===0)&&d(e)}),onKeyDown:t?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),u())},children:[(0,c.jsx)(`canvas`,{ref:o,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Plop`})]})}function Te({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(!1),o=X(),{tileRef:l,canvasRef:u,engineRef:d}=Z({readyId:e,locked:t,onReady:n,config:(0,s.useMemo)(()=>({reduceMotion:o,seed:20250417}),[o]),maxDpr:1.5,idleTimeoutMs:220,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./juliaLinesEngine-me8AoSmR.js`),[])).createJuliaLinesEngine(e,t)}),f=Q(l,{x:.4,y:.5}),p=()=>{var e,t,n,r;(e=d.current)==null||(t=e.reset)==null||t.call(e),(n=d.current)==null||(r=n.start)==null||r.call(n)};return(0,c.jsxs)(`div`,{ref:l,className:`article-web-art-tile article-web-art-tile-hover-only`,role:`img`,tabIndex:t?-1:0,"aria-label":`Julia lines web art tile`,onPointerDown:t?void 0:e=>{var t,n;let i=l.current;if(!i)return;a.current=!0,r.current=e.pointerId;try{i.setPointerCapture(e.pointerId)}catch{}let o=f(e);(t=d.current)==null||(n=t.setPointer)==null||n.call(t,o.x,o.y)},onPointerMove:t?void 0:e=>{var t,n;if(a.current&&r.current!=null&&e.pointerId!==r.current)return;let i=f(e);(t=d.current)==null||(n=t.setPointer)==null||n.call(t,i.x,i.y)},onPointerUp:t?void 0:e=>{var t,n;(r.current==null||e.pointerId===r.current)&&(a.current=!1,r.current=null,(t=d.current)==null||(n=t.clearPointer)==null||n.call(t))},onPointerCancel:t?void 0:()=>{var e,t;a.current=!1,r.current=null,(e=d.current)==null||(t=e.clearPointer)==null||t.call(e)},onMouseMove:t?void 0:e=>{var t,n;let r=f(e);(t=d.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onMouseLeave:t?void 0:(()=>{var e,t;(e=d.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:t?void 0:(()=>{var e,t;(e=d.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:t?void 0:e=>{let t=e.shiftKey?.01:.04;if(e.key===`ArrowUp`){var n,r;e.preventDefault(),(n=d.current)==null||(r=n.nudge)==null||r.call(n,0,-t)}else if(e.key===`ArrowDown`){var i,a;e.preventDefault(),(i=d.current)==null||(a=i.nudge)==null||a.call(i,0,t)}else if(e.key===`ArrowLeft`){var o,s;e.preventDefault(),(o=d.current)==null||(s=o.nudge)==null||s.call(o,-t,0)}else if(e.key===`ArrowRight`){var c,l;e.preventDefault(),(c=d.current)==null||(l=c.nudge)==null||l.call(c,t,0)}else(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),p())},onClick:t?void 0:p,children:[(0,c.jsx)(`canvas`,{ref:u,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Julia`})]})}function Ee({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=X(),{tileRef:o,canvasRef:l,engineRef:u}=Z({readyId:e,locked:t,onReady:n,config:(0,s.useMemo)(()=>({reduceMotion:a}),[a]),maxDpr:1.5,idleTimeoutMs:220,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./fallingRingsEngine-CvEermgo.js`),[])).createFallingRingsEngine(e,t)}),d=e=>{var t,n,r,i;(t=u.current)==null||(n=t.setHeld)==null||n.call(t,e),(r=u.current)==null||(i=r.start)==null||i.call(r)};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Falling rings web art tile`,disabled:t,onPointerDown:t?void 0:e=>{r.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}d(!0)},onPointerUp:t?void 0:e=>{(r.current==null||e.pointerId===r.current)&&(r.current=null,d(!1))},onPointerCancel:t?void 0:()=>{r.current=null,d(!1)},onLostPointerCapture:t?void 0:()=>{r.current=null,d(!1)},onMouseEnter:t?void 0:(()=>{var e,t;(e=u.current)==null||(t=e.setHovered)==null||t.call(e,!0)}),onMouseLeave:t?void 0:(()=>{var e,t;(e=u.current)==null||(t=e.setHovered)==null||t.call(e,!1),r.current!=null&&(r.current=null,d(!1))}),onBlur:t?void 0:(()=>{r.current=null,d(!1)}),onKeyDown:t?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),d(!0))},onKeyUp:t?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),d(!1))},children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Fall`})]})}function De({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(`mouse`),o=X(),{tileRef:l,canvasRef:u,engineRef:d}=Z({readyId:e,locked:t,onReady:n,config:(0,s.useMemo)(()=>({reduceMotion:o,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.78,interactionLift:4.5,interactionScale:.15,interactionEmissiveBoost:.72}),[o]),maxDpr:1.5,idleTimeoutMs:220,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./prismFieldEngine-BwS8GEGW.js`),__vite__mapDeps([10,1]))).createPrismFieldEngine(e,t)}),f=Q(l);return(0,c.jsxs)(`button`,{type:`button`,ref:l,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Prism field web art tile`,disabled:t,onClick:t?void 0:(()=>{var e,t,n,r;(e=d.current)==null||(t=e.reset)==null||t.call(e),(n=d.current)==null||(r=n.start)==null||r.call(n)}),onPointerDown:t?void 0:e=>{var t,n;r.current=e.pointerId,a.current=e.pointerType||`mouse`;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let i=f(e);(t=d.current)==null||(n=t.setPointer)==null||n.call(t,i.x,i.y)},onPointerMove:t?void 0:e=>{var t,n;if(r.current!=null&&e.pointerId!==r.current)return;let i=f(e);(t=d.current)==null||(n=t.setPointer)==null||n.call(t,i.x,i.y)},onPointerUp:t?void 0:e=>{if((r.current==null||e.pointerId===r.current)&&(r.current=null,(e.pointerType||a.current)===`mouse`)){var t,n;(t=d.current)==null||(n=t.clearPointer)==null||n.call(t)}},onPointerCancel:t?void 0:(()=>{if(r.current=null,a.current===`mouse`){var e,t;(e=d.current)==null||(t=e.clearPointer)==null||t.call(e)}}),onMouseMove:t?void 0:e=>{var t,n;let r=f(e);(t=d.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onMouseLeave:t?void 0:(()=>{var e,t;r.current=null,(e=d.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:t?void 0:(()=>{var e,t;r.current=null,a.current=`mouse`,(e=d.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:t?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n,r,i;e.preventDefault(),(t=d.current)==null||(n=t.reset)==null||n.call(t),(r=d.current)==null||(i=r.start)==null||i.call(r)}}),children:[(0,c.jsx)(`canvas`,{ref:u,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Prism`})]})}function Oe({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(!1),l=X(),{tileRef:u,canvasRef:d,engineRef:f}=Z({readyId:e,locked:t,onReady:n,config:(0,s.useMemo)(()=>({reduceMotion:l}),[l]),maxDpr:1.5,idleTimeoutMs:220,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./ropeLightEngine-CiNrcBnU.js`),[])).createRopeLightEngine(e,t)}),p=Q(u),m=e=>{var t,n,r,i;if(o.current){o.current=!1;return}let a=e?p(e):{x:.5,y:.18};(t=f.current)==null||(n=t.toggleHangAt)==null||n.call(t,a.x,a.y),(r=f.current)==null||(i=r.start)==null||i.call(r)};return(0,c.jsxs)(`button`,{type:`button`,ref:u,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Rope light web art tile`,disabled:t,onClick:t?void 0:m,onPointerDown:t?void 0:e=>{var t,n;r.current=e.pointerId,o.current=!1,a.current=p(e);try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}(t=f.current)==null||(n=t.setPointer)==null||n.call(t,a.current.x,a.current.y)},onPointerMove:t?void 0:e=>{var t,n;if(r.current!=null&&e.pointerId!==r.current)return;let i=p(e),s=a.current;s&&Math.hypot(i.x-s.x,i.y-s.y)>.025&&(o.current=!0),(t=f.current)==null||(n=t.setPointer)==null||n.call(t,i.x,i.y)},onPointerUp:t?void 0:e=>{var t,n;if(r.current==null||e.pointerId===r.current){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}r.current=null,a.current=null,(t=f.current)==null||(n=t.clearPointer)==null||n.call(t)}},onPointerCancel:t?void 0:(e=>{var t,n;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}r.current=null,a.current=null,o.current=!1,(t=f.current)==null||(n=t.clearPointer)==null||n.call(t)}),onMouseMove:t?void 0:e=>{var t,n;let r=p(e);(t=f.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onMouseLeave:t?void 0:(()=>{var e,t;r.current=null,a.current=null,(e=f.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:t?void 0:(()=>{var e,t;r.current=null,a.current=null,o.current=!1,(e=f.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:t?void 0:(e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),m())}),children:[(0,c.jsx)(`canvas`,{ref:d,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Rope`})]})}var ke=[`rotateX(270deg) translateZ(0.5em)`,`rotateY(0deg) translateZ(0.5em)`,`rotateY(90deg) translateZ(0.5em)`,`rotateY(180deg) translateZ(0.5em)`,`rotateY(270deg) translateZ(0.5em)`,`rotateX(90deg) translateZ(0.5em)`],Ae=Array.from({length:28},(e,t)=>t);function je(){return(0,c.jsx)(`div`,{className:`article-web-art-soup-backdrop`,"aria-hidden":!0,children:Ae.map(e=>(0,c.jsx)(`div`,{className:`article-web-art-soup-cube`,style:{animationDelay:`${e*.06}s`,fontSize:`${e+1}em`,"--soup-cube-depth":`${e/Math.max(1,Ae.length-1)}`},children:ke.map((e,t)=>(0,c.jsx)(`span`,{className:`article-web-art-soup-face`,style:{transform:e}},t))},e))})}function Me({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=X(),{tileRef:o,canvasRef:l,engineRef:u}=Z({readyId:e,locked:t,onReady:n,config:(0,s.useMemo)(()=>({reduceMotion:a}),[a]),maxDpr:1.5,idleTimeoutMs:220,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./soupShaderEngine-GfL7GxYo.js`),__vite__mapDeps([11,1]))).createSoupShaderEngine(e,t)}),d=Q(o);return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile`,"aria-label":`Soup shader web art tile`,disabled:t,onPointerDown:t?void 0:e=>{var t,n,i,a;r.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let o=d(e);(t=u.current)==null||(n=t.setPointer)==null||n.call(t,o.x,o.y),(i=u.current)==null||(a=i.setHeld)==null||a.call(i,!0)},onPointerMove:t?void 0:e=>{var t,n;if(r.current!=null&&e.pointerId!==r.current)return;let i=d(e);(t=u.current)==null||(n=t.setPointer)==null||n.call(t,i.x,i.y)},onPointerUp:t?void 0:e=>{var t,n;(r.current==null||e.pointerId===r.current)&&(r.current=null,(t=u.current)==null||(n=t.setHeld)==null||n.call(t,!1))},onPointerCancel:t?void 0:(()=>{var e,t;r.current=null,(e=u.current)==null||(t=e.setHeld)==null||t.call(e,!1)}),onMouseMove:t?void 0:e=>{var t,n;let r=d(e);(t=u.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onMouseLeave:t?void 0:(()=>{var e,t,n,i;r.current=null,(e=u.current)==null||(t=e.setHeld)==null||t.call(e,!1),(n=u.current)==null||(i=n.clearPointer)==null||i.call(n)}),onBlur:t?void 0:(()=>{var e,t,n,i;r.current=null,(e=u.current)==null||(t=e.setHeld)==null||t.call(e,!1),(n=u.current)==null||(i=n.clearPointer)==null||i.call(n)}),children:[(0,c.jsx)(je,{}),(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Soup`})]})}function Ne({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(0),[l,u]=(0,s.useState)(!1),[d,f]=(0,s.useState)([]),p=X(),{tileRef:m,canvasRef:h,engineRef:g}=Z({readyId:e,locked:t,onReady:n,config:(0,s.useMemo)(()=>({reduceMotion:p}),[p]),maxDpr:1.5,idleTimeoutMs:220,intersectionThreshold:.25,startWhenLocked:!0,createEngine:async(e,t)=>(await i(()=>import(`./tardisWormholeEngine-DcnX_f8M.js`),__vite__mapDeps([12,1]))).createTardisWormholeEngine(e,t),onLocked:()=>{u(!1),a.current=null}});(0,s.useEffect)(()=>{if(d.length===0)return;let e=window.setTimeout(()=>{f(e=>e.slice(1))},1e3);return()=>{window.clearTimeout(e)}},[d]);let _=e=>{let t=m.current,n=h.current||t;if(!t||!n)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};let r=n.getBoundingClientRect(),i=t.getBoundingClientRect(),o=Math.max(0,Math.min(i.width,e.clientX-i.left)),s=Math.max(0,Math.min(i.height,e.clientY-i.top)),c=Math.max(0,Math.min(r.width,e.clientX-r.left)),l=Math.max(0,Math.min(r.height,e.clientY-r.top)),u=a.current,d=u?c-u.px:0,f=u?l-u.py:0;return a.current={px:c,py:l},{x:r.width>0?c/r.width:.5,y:r.height>0?l/r.height:.5,px:o,py:s,dx:d,dy:f}},v=(e,t)=>{let n=o.current++;f(r=>[...r,{id:n,x:e,y:t}])};return(0,c.jsxs)(`button`,{type:`button`,ref:m,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${l?`article-web-art-tile-tardis-boost`:``}`,"aria-label":`Tardis wormhole web art tile`,disabled:t,onClick:t?void 0:e=>{var t,n,r,i;let a=_(e);v(a.px,a.py),(t=g.current)==null||(n=t.boost)==null||n.call(t),(r=g.current)==null||(i=r.start)==null||i.call(r),u(!0),window.setTimeout(()=>{u(!1)},650)},onContextMenu:t?void 0:(e=>{var t,n,r,i;e.preventDefault();let a=_(e);v(a.px,a.py),(t=g.current)==null||(n=t.reverseBurst)==null||n.call(t),(r=g.current)==null||(i=r.start)==null||i.call(r)}),onWheel:t?void 0:(e=>{var t,n;(t=g.current)==null||(n=t.addScrollBoost)==null||n.call(t,e.deltaY*.003)}),onPointerDown:t?void 0:e=>{var t,n;r.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let i=_(e);(t=g.current)==null||(n=t.setPointer)==null||n.call(t,i.x,i.y,i.dx,i.dy)},onPointerMove:t?void 0:e=>{var t,n;if(r.current!=null&&e.pointerId!==r.current)return;let i=_(e);if((t=g.current)==null||(n=t.setPointer)==null||n.call(t,i.x,i.y,i.dx,i.dy),(e.buttons&1)==1){var a,o;(a=g.current)==null||(o=a.drag)==null||o.call(a,i.dx)}},onPointerUp:t?void 0:e=>{(r.current==null||e.pointerId===r.current)&&(r.current=null)},onPointerCancel:t?void 0:(()=>{r.current=null}),onMouseMove:t?void 0:e=>{var t,n;let r=_(e);(t=g.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y,r.dx,r.dy)},onMouseLeave:t?void 0:(()=>{var e,t;r.current=null,a.current=null,(e=g.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:t?void 0:(()=>{var e,t;r.current=null,a.current=null,(e=g.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:t?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n,r,i;e.preventDefault(),(t=g.current)==null||(n=t.boost)==null||n.call(t),(r=g.current)==null||(i=r.start)==null||i.call(r)}}),children:[(0,c.jsx)(`canvas`,{ref:h,className:`article-web-art-canvas`}),(0,c.jsx)(`div`,{className:`article-web-art-tardis-overlay`,"aria-hidden":!0}),(0,c.jsx)(`div`,{className:`article-web-art-tardis-scanlines`,"aria-hidden":!0}),(0,c.jsx)(`div`,{className:`article-web-art-tardis-grain`,"aria-hidden":!0}),(0,c.jsx)(`div`,{className:`article-web-art-tardis-speed-lines`,"aria-hidden":!0}),(0,c.jsx)(`div`,{className:`article-web-art-tardis-boost-vignette`,"aria-hidden":!0}),d.map(e=>(0,c.jsx)(`div`,{className:`article-web-art-tardis-ripple`,style:{left:`${e.x}px`,top:`${e.y}px`},"aria-hidden":!0},e.id)),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Tardis`})]})}var Pe={1:_e,2:ve,3:ye,4:be,6:xe,7:Y,8:pe,9:$,10:me,11:de,12:fe,13:le,14:se,15:he},Fe={"ambient-trace":Se,"ambient-hex":Ce,"ambient-plop":we,"ambient-julia":Te,"ambient-mines":K,"ambient-rings":Ee,"ambient-prism":De,"ambient-rope":Oe,"ambient-soup":Me,"ambient-tardis":Ne,"ambient-goldfish":ae,"ambient-patronus":J};function Ie({itemWrapper:e,index:t,activate:n,locked:r,onReady:i}){let a=Pe[Number(e==null?void 0:e.id)]||ge;return(0,c.jsx)(a,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i})}function Le({articleUniqueId:e,locked:t,onTileReady:n}){return R.map(r=>{let i=H(e,r),a=Fe[r.key];return{key:r.key,tileId:i,label:r.label,placeholderKey:r.placeholderKey,render:e=>r.key===`ambient-patronus`?(0,c.jsx)(a,{locked:t||!e}):(0,c.jsx)(a,{readyId:i,locked:t||!e,onReady:n})}})}function Re({dataWrapper:e,navigation:t,useCarousel:n,items:r,allTileIds:i,firstCarouselTileId:a}){let[o,c]=(0,s.useState)(!0),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(p.PREVIEW),f=(0,s.useRef)([]),m=(0,s.useRef)(null),h=(0,s.useRef)(new Set),g=(0,s.useRef)(null),[C,w]=(0,s.useState)(p.PREVIEW),[T,E]=(0,s.useState)(null),[D,ee]=(0,s.useState)(!1),O=(0,s.useRef)(new Set),k=(0,s.useRef)(new Map),[,A]=(0,s.useState)(0),[te,j]=(0,s.useState)(-1),[M,N]=(0,s.useState)(()=>new Set),[P,F]=(0,s.useState)(()=>new Set),[I,L]=(0,s.useState)([]),R=(0,s.useRef)([]),[z,B]=(0,s.useState)(()=>new Set),V=(0,s.useRef)(new Set),[H,ne]=(0,s.useState)(null),[re,U]=(0,s.useState)(!1),W=(0,s.useMemo)(()=>Array.from(P).filter(e=>e!==`ambient-goldfish`&&e!==`ambient-patronus`),[P]),ie=o;(0,s.useEffect)(()=>{h.current=M},[M]);let G=(0,s.useCallback)(e=>{d.current=e,w(e)},[]),K=(0,s.useCallback)(()=>{if(typeof window<`u`){for(let e of f.current)window.cancelAnimationFrame(e);f.current=[],m.current!==null&&(window.clearTimeout(m.current),m.current=null)}},[]),ae=(0,s.useCallback)(e=>{if(!e||O.current.has(e))return;O.current.add(e);let t=k.current.get(e);t!=null&&(window.clearTimeout(t),k.current.delete(e)),A(O.current.size)},[]),oe=(0,s.useCallback)(e=>{e&&F(t=>{if(t.has(e))return t;let n=new Set(t);return n.add(e),b(n)})},[]),q=(0,s.useCallback)(()=>{N(e=>e.size?new Set:e),F(e=>e.size?new Set:e),U(!1)},[]),J=(0,s.useCallback)(()=>{for(let e of k.current.values())window.clearTimeout(e);k.current=new Map,O.current=new Set,A(0),j(-1),ee(!1),N(new Set),F(new Set),R.current=[],L([]),V.current=new Set,B(new Set),ne(null),U(!1)},[]),Y=(0,s.useCallback)(()=>{K(),E(null),G(p.OPEN)},[K,G]),se=(0,s.useCallback)(()=>{K(),J(),E(null),G(p.PREVIEW)},[K,J,G]),ce=(0,s.useCallback)(e=>{typeof window<`u`&&(m.current!==null&&window.clearTimeout(m.current),m.current=window.setTimeout(()=>{m.current=null,d.current===e&&(e===p.EXPANDING?Y():e===p.COLLAPSING&&se())},460))},[se,Y]),le=(0,s.useCallback)(()=>{let e=x(i);F(e),N(new Set(e)),U(!y())},[i]),X=(0,s.useCallback)(({openAll:e=!1}={})=>{K();let t=_(),i=u.current,o=v(i);if(t?(E(null),G(p.OPEN)):(E(Math.max(o,Math.ceil((i==null?void 0:i.offsetHeight)||o))),G(p.EXPANDING)),c(!1),ee(!0),j(r.length-1),n){let e=a;R.current=[],L([]),V.current=new Set,B(new Set),ne(e||null),N(new Set(e?[e]:[])),F(new Set(e?[e]:[])),U(!1)}else e?le():(N(new Set),F(new Set),U(!1));if(t||typeof window>`u`)return;let s=window.requestAnimationFrame(()=>{let e=window.requestAnimationFrame(()=>{let e=u.current,t=v(e),n=Math.max(t,Math.ceil((e==null?void 0:e.scrollHeight)||(e==null?void 0:e.offsetHeight)||t));E(n),ce(p.EXPANDING)});f.current.push(e)});f.current.push(s)},[K,a,r.length,le,ce,G,n]);(0,s.useEffect)(()=>{var n;if(typeof window>`u`||!t||((n=t.targetSection)==null?void 0:n.id)!==e.sectionId||t.transitionStatus!==`transition_status_none`)return;let r=window.__pendingSectionAction;r&&r.action===`enter`&&r.sectionId===e.sectionId&&(r.targetArticleId&&r.targetArticleId!==e.uniqueId||(Date.now()-(r.requestedAt||0)>5e3?delete window.__pendingSectionAction:(delete window.__pendingSectionAction,X({openAll:!0}))))},[e.uniqueId,e.sectionId,t,X]);let Z=(0,s.useCallback)(e=>{e&&(oe(e),N(t=>{if(t.has(e))return t;let n=new Set(t);return n.add(e),b(n)}))},[oe]),Q=(0,s.useCallback)(e=>{e&&(N(t=>{if(!t.has(e))return t;let n=new Set(t);return n.delete(e),n}),F(t=>{if(!t.has(e))return t;let n=new Set(t);return n.delete(e),n}))},[]),ue=S(M,x(i)),de=(0,s.useCallback)(()=>{let e=x(i);S(M,e)?q():le()},[i,q,le,M]);(0,s.useEffect)(()=>{if(typeof window>`u`||!window.matchMedia||n||o||!M.size||!window.matchMedia(`(hover: hover) and (pointer: fine)`).matches)return;let e=()=>{g.current!=null&&(window.clearTimeout(g.current),g.current=null)},t=()=>{e(),g.current=window.setTimeout(()=>{g.current=null,h.current.size&&q()},180)},r=()=>t(),i=()=>e(),a=()=>{document.hidden?t():e()};return window.addEventListener(`blur`,r),window.addEventListener(`focus`,i),document.addEventListener(`visibilitychange`,a),()=>{e(),window.removeEventListener(`blur`,r),window.removeEventListener(`focus`,i),document.removeEventListener(`visibilitychange`,a)}},[o,M,q,n]);let fe=(0,s.useCallback)(()=>{if(K(),c(!0),_()){J(),E(null),G(p.PREVIEW);return}let e=u.current,t=v(e),n=Math.max(t,Math.ceil((e==null?void 0:e.offsetHeight)||(e==null?void 0:e.scrollHeight)||t));if(E(n),G(p.COLLAPSING),typeof window>`u`)return;let r=window.requestAnimationFrame(()=>{let e=v(u.current);E(e),ce(p.COLLAPSING)});f.current.push(r)},[K,J,ce,G]),pe=(0,s.useCallback)(e=>{e.target===e.currentTarget&&e.propertyName===`height`&&(d.current===p.EXPANDING?Y():d.current===p.COLLAPSING&&se())},[se,Y]),$=(0,s.useCallback)(e=>{for(let[t,n]of k.current)e.has(t)||(window.clearTimeout(n),k.current.delete(t))},[]),me=(0,s.useCallback)((e,t)=>{let n=new Set([...R.current.filter(({id:e})=>!V.current.has(e)).map(({tileId:e})=>e),t.tileId].filter(Boolean));$(n),ne(t.tileId),N(n),F(n),U(!1)},[$]),he=(0,s.useCallback)(e=>t=>{let n=e.find(({id:e})=>e===t);if(!(n!=null&&n.tileId))return;let r=R.current;if(r.some(({id:e})=>e===t)||r.length>=3)return;let i=[...r,{id:t,tileId:n.tileId}],a=new Set(V.current);a.add(t),V.current=a,B(a),R.current=i,L(i)},[]),ge=(0,s.useCallback)(e=>{let t=R.current.filter(({id:t})=>t!==e);if(t.length===R.current.length)return;let n=new Set(V.current);n.delete(e),V.current=n,B(n),R.current=t,L(t)},[]),_e=(0,s.useCallback)((e,t,n)=>{let r=R.current,i=r.findIndex(({id:t})=>t===e);if(i<0||!t)return;let a=[...r],o=a.findIndex(({id:e})=>e===t.id);if(t.id===n){a.splice(i,1);let t=new Set(V.current);t.delete(e),V.current=t,B(t)}else if(o>=0)[a[i],a[o]]=[a[o],a[i]];else{a[i]={id:t.id,tileId:t.tileId};let n=new Set(V.current);n.delete(e),n.add(t.id),V.current=n,B(n)}R.current=a,L(a);let s=new Set([...a.map(({tileId:e})=>e),H].filter(Boolean));$(s),N(s),F(s),t.id===n&&U(!1)},[H,$]),ve=(0,s.useCallback)(()=>{if(!V.current.size)return;V.current=new Set,B(new Set);let e=new Set([...R.current.map(({tileId:e})=>e),H].filter(Boolean));$(e),N(e),F(e)},[H,$]);return(0,s.useEffect)(()=>{if(!n||o||!D)return;let e=new Set([...I.filter(({id:e})=>!z.has(e)).map(({tileId:e})=>e),H].filter(Boolean));N(e),F(e),$(e)},[H,$,I,D,o,z,n]),(0,s.useEffect)(()=>{K(),E(null),G(p.PREVIEW),c(!0),J()},[K,e.uniqueId,J,G]),(0,s.useEffect)(()=>()=>{K();for(let e of k.current.values())window.clearTimeout(e);k.current.clear()},[K]),(0,s.useEffect)(()=>{D&&j(r.length-1)},[D,r.length]),(0,s.useEffect)(()=>{if(D)for(let e of W){if(!e||O.current.has(e)||k.current.has(e))continue;let t=window.setTimeout(()=>{ae(e)},12e3);k.current.set(e,t)}},[D,W,ae]),{locked:ie,showIntroCover:o,tilesWrapperRef:l,stageRef:u,stagePhase:C,stageHeight:T,shouldMountTiles:D,activationIndex:te,openTileIds:M,mountedTileIds:P,pinnedSlides:I,stagedPinnedSlideIds:z,sendYoursPreviewOpen:re,areAllArtTilesOpen:ue,onTileReady:ae,openTile:Z,closeTile:Q,toggleAllArtTiles:de,onIntroEnter:X,onIntroHide:fe,onStageTransitionEnd:pe,onCarouselChange:me,createCarouselPinHandler:he,onCarouselUnpin:ge,onCarouselReplacePinned:_e,onCarouselWindowsSettled:ve}}function ze({dataWrapper:e}){let t=r(),n=a(),[i,l]=(0,s.useState)(null),d=e.settings.webArtPresentation!==`grid`,p=(0,s.useMemo)(()=>e.orderedItems,[e.orderedItems]),m=(0,s.useMemo)(()=>B(p),[p]),h=(0,s.useMemo)(()=>ne(e.uniqueId,m),[e.uniqueId,m]),g=(0,s.useMemo)(()=>H(e.uniqueId,{suffix:`ambient-julia`}),[e.uniqueId]),_=t.selectedLanguageId||`en`,v=(0,s.useMemo)(()=>N(_),[_]),y=(0,s.useMemo)(()=>P(_),[_]),{submitTileLabel:b,clickTileLabel:x,introHideLabel:S}=(0,s.useMemo)(()=>F(t,_),[t,_]),{locked:C,showIntroCover:w,tilesWrapperRef:T,stageRef:D,stagePhase:ee,stageHeight:k,shouldMountTiles:A,activationIndex:te,openTileIds:j,mountedTileIds:M,pinnedSlides:I,stagedPinnedSlideIds:L,sendYoursPreviewOpen:z,areAllArtTilesOpen:U,onTileReady:W,openTile:ie,closeTile:G,toggleAllArtTiles:K,onIntroEnter:ae,onIntroHide:oe,onStageTransitionEnd:q,onCarouselChange:J,createCarouselPinHandler:Y,onCarouselUnpin:se,onCarouselReplacePinned:ce,onCarouselWindowsSettled:le}=Re({dataWrapper:e,navigation:n,useCarousel:d,items:m,allTileIds:h,firstCarouselTileId:g}),X=m.map((e,t)=>{if(!A)return(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art tile ${t+1} loading`},e.uniqueId);let n=e.uniqueId,r=j.has(n),i=L.has(n),a=M.has(n)||r&&!i;return(0,c.jsx)(E,{label:V(e,t),isOpen:r,isStaging:i,onToggle:()=>{i||(r?G(n):ie(n))},shouldRender:a,children:a&&(0,c.jsx)(Ie,{itemWrapper:e,index:t,locked:C||!r,activate:t<=te,onReady:W})},n)}),Z=Le({articleUniqueId:e.uniqueId,locked:C,onTileReady:W}),Q=A?Z.map(({key:e,tileId:t,label:n,render:r})=>{let i=j.has(t),a=L.has(e),o=M.has(t)||i&&!a;return(0,c.jsx)(E,{label:n,isOpen:i,isStaging:a,onToggle:()=>{a||(i?G(t):ie(t))},shouldRender:o,children:o&&r(i)},e)}):R.filter(e=>e.placeholderKey!=null).map(e=>(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art ${e.placeholderKey} tile loading`},e.key)),ue=re([...m.map((e,t)=>({id:e.uniqueId,tileId:e.uniqueId,label:V(e,t),transition:V(e,t)===`Wave`?`fade`:void 0,content:X[t]})),...Z.slice(0,Q.length).map(({key:e,tileId:t,label:n},r)=>({id:e,tileId:t,label:n,content:Q[r]})),...A?[{id:`send-yours`,tileId:null,pinnable:!1,label:b,content:(0,c.jsx)(O,{label:b,clickLabel:x,previewRequested:z})}]:[]]),de=Y(ue);return(0,c.jsx)(o,{id:e.uniqueId,type:o.Types.SPACING_DEFAULT,dataWrapper:e,className:`article-web-art`,selectedItemCategoryId:i,setSelectedItemCategoryId:l,children:(0,c.jsxs)(`div`,{className:`article-web-art-shell`,children:[(0,c.jsx)(f,{guide:v.guide,buttonLabel:w?v.button:S,hidden:!w,onEnter:w?ae:oe,secondaryButtonLabel:!w&&!d?`promaja`:null,onSecondaryAction:!w&&!d?K:null,secondaryPressed:U}),(0,c.jsx)(`div`,{ref:D,className:[`article-web-art-stage`,d?`article-web-art-stage-carousel`:``,w?`article-web-art-stage-preview`:``,k===null?``:`article-web-art-stage-measured`,`article-web-art-stage-${ee}`].filter(Boolean).join(` `),style:k===null?void 0:{"--article-web-art-stage-height":`${k}px`},onTransitionEnd:q,"aria-hidden":w,inert:w||void 0,children:d?(0,c.jsx)(u,{slides:ue,labels:y,enabled:!w,pinnedIds:I.map(({id:e})=>e),onChange:J,onPin:de,onUnpin:se,onReplacePinned:ce,onWindowsSettled:le},w?`preview`:`open`):(0,c.jsxs)(`div`,{className:`article-web-art-items ${C?`article-web-art-items-locked`:``}`,ref:T,"aria-busy":w,children:[X,Q,A&&(0,c.jsx)(O,{label:b,clickLabel:x,previewRequested:z})]})})]})})}export{ze as default};