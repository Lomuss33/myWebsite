const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/androidBackgroundEngine-HmTe5YFf.js","assets/three-Dyw0HQ4s.js","assets/hourglassEngine-Dqm3jFyu.js","assets/physics-DDoeCzdI.js","assets/react-vendor-DdDVJuhO.js","assets/threeTunnelEngine-BYxOaRL9.js","assets/threePolygonDemo5Engine-J7VS_NUu.js","assets/prismFieldEngine-BvTSiE5I.js","assets/soupShaderEngine-BVaccG7j.js","assets/tardisWormholeEngine-Czkyopnk.js"])))=>i.map(i=>d[i]);
import{d as ut,i as Je,A as ze,_ as G}from"./index-CdY4JTNN.js";import{r as a,j as f,b as dt}from"./react-vendor-DdDVJuhO.js";/* empty css              */import"./bootstrap-BTe74g_4.js";import"./vendor-C2MEJuly.js";function ft({slides:p,onChange:m,onPin:y,onUnpin:d,pinnedIds:R=[],maxPinned:w=3,labels:I={},enabled:l=!0}){const[C,g]=a.useState(0),[k,v]=a.useState([0]),[h,o]=a.useState("initial"),e=a.useRef(null),r=a.useRef(null),t=a.useRef(null),[s,n]=a.useState(1),i=p.length,c=i?Math.min(C,i-1):0,u=p[c],b=i>1?(c+1)%i:null,x=i>1?(c-1+i)%i:null,M=R.map(T=>p.find(H=>H.id===T)).filter(T=>T&&T.id!==(u==null?void 0:u.id)),S=!!(u&&R.includes(u.id)),j=!!(y&&(u==null?void 0:u.pinnable)!==!1&&(S||R.length<w)),N=new Map;for(let T=k.length-1;T>=0;T--){const H=k[T];N.has(H)||N.set(H,k.length-1-T)}if(a.useLayoutEffect(()=>{const T=t.current;if(!T||!i)return;const H=()=>{const q=Math.max(1,Math.min(i,Math.floor((T.clientWidth+4)/26)));let Z=q;for(;Z>Math.ceil(q/2)&&i%Z!==0;)Z--;i%Z!==0&&(Z=Math.ceil(i/Math.ceil(i/q))),n(Z)},$=new ResizeObserver(H);return $.observe(T),H(),()=>$.disconnect()},[i]),!i)return null;const E=(T,H=!0)=>{if(!H||typeof document.startViewTransition!="function"||window.matchMedia("(prefers-reduced-motion: reduce)").matches){T();return}document.documentElement.dataset.webArtLayoutTransition="true";let $;try{$=document.startViewTransition(()=>dt.flushSync(T))}catch{delete document.documentElement.dataset.webArtLayoutTransition,T();return}r.current=$,$.finished.finally(()=>{r.current===$&&(delete document.documentElement.dataset.webArtLayoutTransition,r.current=null)}).catch(()=>{})},A=T=>{!l||T===null||T===c||!p[T]||(o(T===b?"next":T===x?"previous":"jump"),g(T),v(H=>[...H,T].slice(-8)),m==null||m(T,p[T]))},D=T=>{if(!l||T===null||T===c||!p[T])return;const H=S||R.includes(p[T].id);E(()=>A(T),H)},O=T=>{e.current=null,!(!l||T.pointerType==="mouse"||!T.isPrimary||T.target.closest(".article-web-art-gated-tile-open, button, a, input, select, textarea, [role='button']"))&&(e.current={id:T.pointerId,x:T.clientX,y:T.clientY})},B=T=>{const H=e.current;if(e.current=null,!H||H.id!==T.pointerId||!l)return;const $=T.clientX-H.x,q=T.clientY-H.y;Math.abs($)<58||Math.abs($)<Math.abs(q)*1.35||D($>0?x:b)},F=()=>{if(!(!u||!j)){if(S){E(()=>d==null?void 0:d(u.id));return}E(()=>{y==null||y(u.id);for(let T=1;T<i;T++){const H=(c+T)%i;if(!(p[H].pinnable===!1||R.includes(p[H].id))){A(H);break}}})}},U=(T,H)=>{var q;const $={ArrowLeft:(H-1+i)%i,ArrowRight:(H+1)%i,Home:0,End:i-1}[T.key];$!==void 0&&(T.preventDefault(),(q=T.currentTarget.parentElement.children[$])==null||q.focus(),D($))},V=(T,H)=>{var $,q;T.detail===0&&((q=($=T.currentTarget.closest(".layered-card-carousel"))==null?void 0:$.querySelector(".layered-card-carousel-index-button.is-current"))==null||q.focus()),E(()=>d==null?void 0:d(H))},re=(T,H)=>T===null?null:f.jsxs("button",{type:"button",className:`layered-card-carousel-side layered-card-carousel-side-${H}`,style:{"--carousel-preview-hue":(T*37+195)%360},onClick:()=>D(T),disabled:!l,"aria-label":`${H==="next"?I.next||"Next artwork":I.previous||"Previous artwork"}: ${T+1}, ${p[T].label}`,children:[f.jsx("span",{className:"layered-card-carousel-side-number","aria-hidden":"true",children:String(T+1).padStart(2,"0")}),f.jsx("span",{className:"layered-card-carousel-side-label","aria-hidden":"true",children:p[T].label})]});return f.jsxs("div",{className:`layered-card-carousel${M.length?" layered-card-carousel-multiview":""}`,"aria-label":I.gallery||"Artwork gallery",children:[f.jsxs("div",{className:"layered-card-carousel-workspace","data-view-count":M.length+1,children:[f.jsxs("div",{className:"layered-card-carousel-stage",onPointerDown:O,onPointerUp:B,onPointerCancel:()=>{e.current=null},children:[re(x,"previous"),re(b,"next"),f.jsx("div",{className:`layered-card-carousel-current layered-card-carousel-current-${h}`,style:{viewTransitionName:`web-art-window-${c}`,viewTransitionClass:"web-art-window"},role:"group","aria-label":`${c+1} / ${i}: ${u.label}`,children:u.content},u.id),l&&y&&u.pinnable!==!1&&f.jsx("button",{type:"button",className:`layered-card-carousel-pin${S?" is-pinned":""}`,onClick:F,disabled:!j,"aria-label":S?I.unpin||"Remove from simultaneous view":j?I.pin||"Add to simultaneous view":I.pinLimit||"Three extra artworks are already open",title:S?I.unpin||"Remove from simultaneous view":j?I.pin||"Add to simultaneous view":I.pinLimit||"Three extra artworks are already open",children:f.jsxs("svg",{viewBox:"0 0 20 20","aria-hidden":"true",focusable:"false",children:[f.jsx("rect",{x:"3.5",y:"3.5",width:"13",height:"13",rx:"2",fill:"none",stroke:"currentColor",strokeWidth:"1.5"}),S?f.jsx("path",{d:"M6.5 10h7"}):f.jsx("path",{d:"M6.5 10h7M10 6.5v7"})]})})]}),M.map(T=>f.jsxs("div",{className:"layered-card-carousel-pinned",style:{viewTransitionName:`web-art-window-${p.indexOf(T)}`,viewTransitionClass:"web-art-window"},role:"group","aria-label":`${I.pinned||"Open artwork"}: ${T.label}`,children:[T.content,f.jsx("button",{type:"button",className:"layered-card-carousel-unpin",onClick:H=>V(H,T.id),"aria-label":`${I.unpin||"Remove from simultaneous view"}: ${T.label}`,children:f.jsx("svg",{viewBox:"0 0 20 20","aria-hidden":"true",focusable:"false",children:f.jsx("path",{d:"M5 5 15 15M15 5 5 15"})})})]},T.id))]}),f.jsx("nav",{ref:t,className:"layered-card-carousel-index",style:{"--carousel-index-columns":s},"aria-label":I.jump||"Choose artwork",children:p.map((T,H)=>{const $=N.get(H)??-1,q=$>0&&$<=5;return f.jsx("button",{type:"button",className:`layered-card-carousel-index-button${H===c?" is-current":""}${q?" is-recent":""}`,style:{"--carousel-index-delay":`${Math.min(H,18)*20}ms`,...q?{"--carousel-trail-percent":`${Math.max(12,100-$*18)}%`}:{}},onClick:()=>D(H),onKeyDown:Z=>U(Z,H),tabIndex:H===c?0:-1,disabled:!l,"aria-current":H===c?"true":void 0,"aria-label":`${I.jumpTo||"Show artwork"} ${H+1}: ${T.label}`,children:H+1},T.id)})})]})}const ht=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`,bt=`function Mash(seed) {
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
`;function X(p,{timeoutMs:m=1200}={}){if(typeof window>"u")return p(),()=>{};if("requestIdleCallback"in window){const d=window.requestIdleCallback(()=>p(),{timeout:m});return()=>window.cancelIdleCallback(d)}const y=window.setTimeout(()=>p(),0);return()=>window.clearTimeout(y)}function $e(p){var l,C,g,k;if(!p)return{width:1,height:1};const m=p.getBoundingClientRect(),y=(C=(l=p.parentElement)==null?void 0:l.getBoundingClientRect)==null?void 0:C.call(l),d=(y==null?void 0:y.width)||((g=p.parentElement)==null?void 0:g.clientWidth)||1,R=(y==null?void 0:y.height)||((k=p.parentElement)==null?void 0:k.clientHeight)||d,w=Math.max(1,Math.round(m.width||p.clientWidth||d)),I=Math.max(1,Math.round(m.height||p.clientHeight||R));return{width:w,height:I}}function K(p,m,y=1){var l,C,g;const{width:d,height:R}=$e(p),w=typeof window<"u"&&((C=(l=window.matchMedia)==null?void 0:l.call(window,"(pointer: coarse)"))==null?void 0:C.matches),I=Math.min(w?1:1.5,Math.max(1,Number(y)||1));if((d<32||R<32)&&typeof window<"u"){window.requestAnimationFrame(()=>{var v;const k=$e(p);k.width>=32&&k.height>=32&&((v=m==null?void 0:m.setSize)==null||v.call(m,k.width,k.height,I))});return}(g=m==null?void 0:m.setSize)==null||g.call(m,d,R,I)}const Fe=248,mt=460,J={PREVIEW:"preview",EXPANDING:"expanding",OPEN:"open",COLLAPSING:"collapsing"};function qe(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ge(p){if(!p)return Fe;const m=window.getComputedStyle(p).getPropertyValue("--article-web-art-stage-preview-height"),y=Number.parseFloat(m);return Number.isFinite(y)&&y>0?Math.ceil(y):Fe}const pt=9,wt=9,xt=10,vt=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],Qe=6,yt=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function ke(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(pointer: coarse), (max-width: 767px)").matches}function Ve(p){const m=new Set(p);if(!ke())return m;for(;m.size>Qe;)m.delete(m.values().next().value);return m}function Pe(p){if(!ke())return new Set(p);const m=new Set;for(const y of p){if(m.size>=Qe)break;m.add(y)}return m}function Ge(p,m){if(m.size===0)return!1;for(const y of m)if(!p.has(y))return!1;return!0}function gt(p=pt,m=wt,y=xt){const d=p*m,R=Math.max(1,Math.min(y,d-1)),w=new Set;for(;w.size<R;)w.add(Math.floor(Math.random()*d));const I=new Array(d).fill(0);for(let l=0;l<d;l++){if(w.has(l)){I[l]=-1;continue}const C=l%m,g=Math.floor(l/m);let k=0;for(let v=-1;v<=1;v++)for(let h=-1;h<=1;h++){if(h===0&&v===0)continue;const o=C+h,e=g+v;o<0||e<0||o>=m||e>=p||w.has(e*m+o)&&(k+=1)}I[l]=k}return{rows:p,cols:m,mineCount:R,mines:w,counts:I}}function Mt(p,m,y,d){const R=new Set(y),w=[p];for(;w.length>0;){const I=w.pop();if(I==null||R.has(I)||d.has(I)||m.mines.has(I)||(R.add(I),m.counts[I]!==0))continue;const l=I%m.cols,C=Math.floor(I/m.cols);for(let g=-1;g<=1;g++)for(let k=-1;k<=1;k++){if(k===0&&g===0)continue;const v=l+k,h=C+g;v<0||h<0||v>=m.cols||h>=m.rows||w.push(h*m.cols+v)}}return R}function Ke(p,m,y){const d=p.rows*p.cols-p.mineCount;if(m.size>=d)return!0;if(y.size!==p.mineCount)return!1;for(const R of p.mines)if(!y.has(R))return!1;return!0}function Rt(p){return`Web art ${String(p||"tile").toLowerCase()} tile loading`}function Ct({seed:p,reduceMotion:m}){const y=JSON.stringify(bt.split("<\/script>").join("<\\/script>")),d=JSON.stringify(p);return`<!doctype html>
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
const moduleSource = ${y}
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
    reduceMotion: ${m?"true":"false"},
    seed: ${d}
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
</html>`}function Ye(p){return Array.isArray(p)?p.map((m,y)=>{const d=m!=null&&m.tone?` article-web-art-intro-guide-fragment-${m.tone}`:"";return f.jsx("span",{className:`article-web-art-intro-guide-fragment${d}`,children:m==null?void 0:m.text},`${(m==null?void 0:m.text)||"fragment"}-${y}`)}):p}function ar({dataWrapper:p,id:m}){var He;const y=ut(),d=Je(),R=`${p.uniqueId}-ambient-trace`,w=`${p.uniqueId}-ambient-hex`,I=`${p.uniqueId}-ambient-plop`,l=`${p.uniqueId}-ambient-julia`,C=`${p.uniqueId}-ambient-mines`,g=`${p.uniqueId}-ambient-rings`,k=`${p.uniqueId}-ambient-prism`,v=`${p.uniqueId}-ambient-rope`,h=`${p.uniqueId}-ambient-soup`,o=`${p.uniqueId}-ambient-tardis`,[e,r]=a.useState(null),[t,s]=a.useState(!0),n=p.settings.webArtPresentation!=="grid",i=a.useMemo(()=>p.orderedItems,[p.orderedItems]),c=a.useMemo(()=>{const P=[4,5,3,6,1,2,7,8,9,10,11,12,13,14,15],L=new Map(i.map(z=>[Number(z==null?void 0:z.id),z])),_=[];for(const z of P){const Y=L.get(z);Y&&_.push(Y)}for(const z of i){if(!z)continue;const Y=Number(z==null?void 0:z.id);P.includes(Y)||_.push(z)}return _},[i]),u=a.useRef(null),b=a.useRef(null),x=a.useRef(J.PREVIEW),M=a.useRef([]),S=a.useRef(null),j=a.useRef(new Set),N=a.useRef(null),[E,A]=a.useState(J.PREVIEW),[D,O]=a.useState(null),[B,F]=a.useState(!1),U=a.useRef(new Set),V=a.useRef(new Map),[re,T]=a.useState(0),[H,$]=a.useState(-1),[q,Z]=a.useState(()=>new Set),[fe,ne]=a.useState(()=>new Set),[he,be]=a.useState([]),[Ie,Me]=a.useState(null),[Se,oe]=a.useState(!1),le=a.useMemo(()=>{const P=c.map(L=>L==null?void 0:L.uniqueId).filter(Boolean);return P.push(R,w,I,l,C,k,g,v,h,o,"ambient-goldfish","ambient-patronus"),new Set(P)},[w,l,C,I,k,g,v,h,o,R,c]),Ne=a.useMemo(()=>Array.from(fe).filter(P=>P!=="ambient-goldfish"&&P!=="ambient-patronus"),[fe]),Q=t,me=y.selectedLanguageId||"en";a.useEffect(()=>{j.current=q},[q]);const ee=a.useCallback(P=>{x.current=P,A(P)},[]),te=a.useCallback(()=>{if(!(typeof window>"u")){for(const P of M.current)window.cancelAnimationFrame(P);M.current=[],S.current!==null&&(window.clearTimeout(S.current),S.current=null)}},[]);let ae=y.getString("send_yours");typeof ae=="string"&&ae.startsWith("locale:")&&(ae={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[me]||"Send yours!");let ue=y.getString("click");typeof ue=="string"&&ue.startsWith("locale:")&&(ue={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[me]||"Click");const je={en:{title:"Doors of the world behind an amazing art gallery.",guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",guide:{eyebrow:"So funktioniert es",lines:["Betritt die Galerie und schau dir die Karten in Ruhe an.","Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.","Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."]},button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",guide:{eyebrow:"Kako istraživati",lines:["Uđi u galeriju i istražuj kartice svojim tempom.","Klikni, dodirni ili pritisni karticu da otkriješ što skriva.","Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme."]},button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",guide:{eyebrow:"Nasıl gezilir",lines:["Galeriye girin ve kartları kendi temponuzda inceleyin.","İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.","Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir."]},button:"Gir",preparing:"Hazırlanıyor..."}}[me]||{guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter"},We="hide",W=a.useCallback(P=>{if(!P||U.current.has(P))return;U.current.add(P);const L=V.current.get(P);L!=null&&(window.clearTimeout(L),V.current.delete(P)),T(U.current.size)},[]),Ee=a.useCallback(P=>{P&&ne(L=>{if(L.has(P))return L;const _=new Set(L);return _.add(P),Ve(_)})},[]),pe=a.useCallback(()=>{Z(P=>P.size?new Set:P),ne(P=>P.size?new Set:P),oe(!1)},[]),ce=a.useCallback(()=>{for(const P of V.current.values())window.clearTimeout(P);V.current=new Map,U.current=new Set,T(0),$(-1),F(!1),Z(new Set),ne(new Set),be([]),Me(null),oe(!1)},[]),we=a.useCallback(()=>{te(),O(null),ee(J.OPEN)},[te,ee]),xe=a.useCallback(()=>{te(),ce(),O(null),ee(J.PREVIEW)},[te,ce,ee]),ve=a.useCallback(P=>{typeof window>"u"||(S.current!==null&&window.clearTimeout(S.current),S.current=window.setTimeout(()=>{S.current=null,x.current===P&&(P===J.EXPANDING?we():P===J.COLLAPSING&&xe())},mt))},[xe,we]),ye=a.useCallback(()=>{const P=Pe(le);ne(P),Z(new Set(P)),oe(!ke())},[le]),Re=a.useCallback(({openAll:P=!1}={})=>{var de;te();const L=qe(),_=b.current,z=ge(_);if(L?(O(null),ee(J.OPEN)):(O(Math.max(z,Math.ceil((_==null?void 0:_.offsetHeight)||z))),ee(J.EXPANDING)),s(!1),F(!0),$(c.length-1),n){const ie=(de=c[0])==null?void 0:de.uniqueId;be([]),Me(ie||null),Z(new Set(ie?[ie]:[])),ne(new Set(ie?[ie]:[])),oe(!1)}else P?ye():(Z(new Set),ne(new Set),oe(!1));if(L||typeof window>"u")return;const Y=window.requestAnimationFrame(()=>{const ie=window.requestAnimationFrame(()=>{const se=b.current,Be=ge(se),lt=Math.max(Be,Math.ceil((se==null?void 0:se.scrollHeight)||(se==null?void 0:se.offsetHeight)||Be));O(lt),ve(J.EXPANDING)});M.current.push(ie)});M.current.push(Y)},[te,c,ye,ve,ee,n]);a.useEffect(()=>{var L;if(typeof window>"u"||((L=d.targetSection)==null?void 0:L.id)!==p.sectionId||d.transitionStatus!=="transition_status_none")return;const P=window.__pendingSectionAction;if(P&&P.action==="enter"&&P.sectionId===p.sectionId&&!(P.targetArticleId&&P.targetArticleId!==p.uniqueId)){if(Date.now()-(P.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,Re({openAll:!0})}},[p.uniqueId,p.sectionId,(He=d.targetSection)==null?void 0:He.id,d.transitionStatus,Re]);const Te=a.useCallback(P=>{P&&(Ee(P),Z(L=>{if(L.has(P))return L;const _=new Set(L);return _.add(P),Ve(_)}))},[Ee]),Le=a.useCallback(P=>{P&&(Z(L=>{if(!L.has(P))return L;const _=new Set(L);return _.delete(P),_}),ne(L=>{if(!L.has(P))return L;const _=new Set(L);return _.delete(P),_}))},[]),et=Pe(le),tt=Ge(q,et),rt=a.useCallback(()=>{const P=Pe(le);if(Ge(q,P)){pe();return}ye()},[le,pe,ye,q]);a.useEffect(()=>{if(typeof window>"u"||!window.matchMedia||n||t||!q.size||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;const P=()=>{N.current!=null&&(window.clearTimeout(N.current),N.current=null)},L=()=>{P(),N.current=window.setTimeout(()=>{N.current=null,j.current.size&&pe()},180)},_=()=>L(),z=()=>P(),Y=()=>{document.hidden?L():P()};return window.addEventListener("blur",_),window.addEventListener("focus",z),document.addEventListener("visibilitychange",Y),()=>{P(),window.removeEventListener("blur",_),window.removeEventListener("focus",z),document.removeEventListener("visibilitychange",Y)}},[t,q,pe,n]);const nt=a.useCallback(()=>{if(te(),s(!0),qe()){ce(),O(null),ee(J.PREVIEW);return}const P=b.current,L=ge(P),_=Math.max(L,Math.ceil((P==null?void 0:P.offsetHeight)||(P==null?void 0:P.scrollHeight)||L));if(O(_),ee(J.COLLAPSING),typeof window>"u")return;const z=window.requestAnimationFrame(()=>{const Y=ge(b.current);O(Y),ve(J.COLLAPSING)});M.current.push(z)},[te,ce,ve,ee]),it=a.useCallback(P=>{P.target!==P.currentTarget||P.propertyName!=="height"||(x.current===J.EXPANDING?we():x.current===J.COLLAPSING&&xe())},[xe,we]),_e=(P,L)=>{const _=Number(P==null?void 0:P.id);return _===1?"Hover":_===2?"Wave":_===3?"3D":_===4?"Poly":_===5?"Click":_===6?"Orbit":_===7?"Spin":_===8?"Shape":_===9?"Hourglass":_===10?"Noice":_===11?"Distance":_===12?"Android":_===13?"Pulse":_===14?"Bars":_===15?"Deep":String(L+1)},Ae=c.map((P,L)=>{if(!B)return f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${L+1} loading`},P.uniqueId);const _=P.uniqueId,z=q.has(_),Y=fe.has(_)||z;return f.jsx(Xe,{label:_e(P,L),isOpen:z,onToggle:()=>{z?Le(_):Te(_)},shouldRender:Y,children:Y&&f.jsx(kt,{itemWrapper:P,index:L,locked:Q||!z,activate:L<=H,onReady:W})},_)}),De=[{key:"ambient-trace",tileId:R,label:"Trace",render:P=>f.jsx(Ft,{readyId:R,locked:Q||!P,onReady:W})},{key:"ambient-hex",tileId:w,label:"Hex",render:P=>f.jsx(qt,{readyId:w,locked:Q||!P,onReady:W})},{key:"ambient-plop",tileId:I,label:"Plop",render:P=>f.jsx(Vt,{readyId:I,locked:Q||!P,onReady:W})},{key:"ambient-julia",tileId:l,label:"Julia",render:P=>f.jsx(Gt,{readyId:l,locked:Q||!P,onReady:W})},{key:"ambient-mines",tileId:C,label:"Bomb",render:P=>f.jsx(Kt,{readyId:C,locked:Q||!P,onReady:W})},{key:"ambient-rings",tileId:g,label:"Fall",render:P=>f.jsx(Yt,{readyId:g,locked:Q||!P,onReady:W})},{key:"ambient-prism",tileId:k,label:"Prism",render:P=>f.jsx(Xt,{readyId:k,locked:Q||!P,onReady:W})},{key:"ambient-rope",tileId:v,label:"Rope",render:P=>f.jsx(Ut,{readyId:v,locked:Q||!P,onReady:W})},{key:"ambient-soup",tileId:h,label:"Soup",render:P=>f.jsx(Qt,{readyId:h,locked:Q||!P,onReady:W})},{key:"ambient-tardis",tileId:o,label:"Tardis",render:P=>f.jsx(Wt,{readyId:o,locked:Q||!P,onReady:W})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:P=>f.jsx(er,{readyId:"ambient-goldfish",locked:Q||!P,onReady:W})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:P=>f.jsx(tr,{locked:Q||!P})}],Ce=B?De.map(({key:P,tileId:L,label:_,render:z})=>{const Y=q.has(L),de=fe.has(L)||Y;return f.jsx(Xe,{label:_,isOpen:Y,onToggle:()=>{Y?Le(L):Te(L)},shouldRender:de,children:de&&z(Y)},P)}):[f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")],Oe=[...c.map((P,L)=>({id:P.uniqueId,tileId:P.uniqueId,label:_e(P,L),content:Ae[L]})),...De.slice(0,Ce.length).map(({key:P,tileId:L,label:_},z)=>({id:P,tileId:L,label:_,content:Ce[z]})),...B?[{id:"send-yours",tileId:null,pinnable:!1,label:ae,content:f.jsx(Ze,{label:ae,clickLabel:ue,previewRequested:Se})}]:[]],st={en:{gallery:"Web art gallery",next:"Next artwork",previous:"Previous artwork",last:"Last viewed artwork",jump:"Jump to artwork",jumpTo:"Show artwork",pin:"Open alongside current artwork",unpin:"Close extra window",pinLimit:"Three extra artworks are already open",pinned:"Extra artwork"},de:{gallery:"Webkunst-Galerie",next:"Nächstes Werk",previous:"Vorheriges Werk",last:"Zuletzt angesehenes Werk",jump:"Werk auswählen",jumpTo:"Werk anzeigen",pin:"Neben dem aktuellen Werk öffnen",unpin:"Zusätzliches Fenster schließen",pinLimit:"Drei zusätzliche Werke sind bereits offen",pinned:"Zusätzliches Werk"},hr:{gallery:"Galerija web umjetnosti",next:"Sljedeće djelo",previous:"Prethodno djelo",last:"Zadnje pregledano djelo",jump:"Odaberi djelo",jumpTo:"Prikaži djelo",pin:"Otvori uz trenutno djelo",unpin:"Zatvori dodatni prozor",pinLimit:"Već su otvorena tri dodatna djela",pinned:"Dodatno djelo"},tr:{gallery:"Web sanatı galerisi",next:"Sonraki eser",previous:"Önceki eser",last:"Son görüntülenen eser",jump:"Eser seç",jumpTo:"Eseri göster",pin:"Geçerli eserin yanında aç",unpin:"Ek pencereyi kapat",pinLimit:"Üç ek eser zaten açık",pinned:"Ek eser"}}[me],ot=(P,L)=>{const _=new Set([...he.map(({tileId:z})=>z),L.tileId].filter(Boolean));for(const[z,Y]of V.current)_.has(z)||(window.clearTimeout(Y),V.current.delete(z));Me(L.tileId),Z(_),ne(_),oe(!1)},at=P=>{const L=Oe.find(({id:_})=>_===P);L!=null&&L.tileId&&be(_=>_.some(({id:z})=>z===P)||_.length>=3?_:[..._,{id:P,tileId:L.tileId}])},ct=P=>{be(L=>L.filter(({id:_})=>_!==P))};return a.useEffect(()=>{if(!n||t||!B)return;const P=new Set([...he.map(({tileId:L})=>L),Ie].filter(Boolean));Z(P),ne(P);for(const[L,_]of V.current)P.has(L)||(window.clearTimeout(_),V.current.delete(L))},[Ie,he,B,t,n]),a.useEffect(()=>{te(),O(null),ee(J.PREVIEW),s(!0),ce()},[te,p.uniqueId,ce,ee]),a.useEffect(()=>()=>{te();for(const P of V.current.values())window.clearTimeout(P);V.current.clear()},[te]),a.useEffect(()=>{B&&$(c.length-1)},[B,c.length]),a.useEffect(()=>{if(B)for(const P of Ne){if(!P||U.current.has(P)||V.current.has(P))continue;const L=window.setTimeout(()=>{W(P)},12e3);V.current.set(P,L)}},[B,Ne,W]),f.jsx(ze,{id:p.uniqueId,type:ze.Types.SPACING_DEFAULT,dataWrapper:p,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:r,children:f.jsxs("div",{className:"article-web-art-shell",children:[f.jsx(Pt,{guide:je.guide,buttonLabel:t?je.button:We,hidden:!t,onEnter:t?Re:nt,secondaryButtonLabel:!t&&!n?"promaja":null,onSecondaryAction:!t&&!n?rt:null,secondaryPressed:tt}),f.jsx("div",{ref:b,className:["article-web-art-stage",n?"article-web-art-stage-carousel":"",t?"article-web-art-stage-preview":"",D!==null?"article-web-art-stage-measured":"",`article-web-art-stage-${E}`].filter(Boolean).join(" "),style:D!==null?{"--article-web-art-stage-height":`${D}px`}:void 0,onTransitionEnd:it,"aria-hidden":t,inert:t?"":void 0,children:n?f.jsx(ft,{slides:Oe,labels:st,enabled:!t,pinnedIds:he.map(({id:P})=>P),onChange:ot,onPin:at,onUnpin:ct},t?"preview":"open"):f.jsxs("div",{className:`article-web-art-items ${Q?"article-web-art-items-locked":""}`,ref:u,"aria-busy":t,children:[Ae,Ce,B&&f.jsx(Ze,{label:ae,clickLabel:ue,previewRequested:Se})]})})]})})}function Pt({guide:p,buttonLabel:m,hidden:y,onEnter:d,secondaryButtonLabel:R=null,onSecondaryAction:w=null,secondaryPressed:I=!1}){const l=C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),d())};return f.jsx("div",{className:`article-web-art-intro-cover ${y?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:f.jsx("div",{className:"article-web-art-intro-cover-inner",children:f.jsx("div",{className:"article-web-art-intro-cover-actions",children:f.jsx("div",{className:`article-web-art-intro-guide ${y?"article-web-art-intro-guide-hidden":"article-web-art-intro-guide-open"}`,children:f.jsxs("div",{className:"article-web-art-intro-guide-inner",children:[f.jsxs("div",{className:"article-web-art-intro-guide-top-row",children:[f.jsxs("div",{className:"article-web-art-intro-guide-top-copy",children:[f.jsx("span",{className:"article-web-art-intro-guide-eyebrow",children:p.eyebrow}),f.jsx("p",{className:"article-web-art-intro-guide-line article-web-art-intro-guide-line-primary",children:Ye(p.lines[0])})]}),f.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[R?f.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${I?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:w||void 0,"aria-pressed":I,"aria-label":R,children:R}):null,f.jsx("button",{type:"button",className:"article-web-art-intro-cover-button article-web-art-intro-cover-button-primary",onClick:d,onKeyDown:l,"aria-label":m,children:m})]})]}),f.jsx("div",{className:"article-web-art-intro-guide-lines",children:p.lines.slice(1).map((C,g)=>f.jsx("p",{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${g+2}`,children:Ye(C)},Array.isArray(C)?C.map(k=>k==null?void 0:k.text).join(""):C))})]})})})})})}function Xe({label:p,isOpen:m,onToggle:y,shouldRender:d=!0,children:R}){const w=a.useCallback(I=>{var l,C;m||I.defaultPrevented||(C=(l=I.target).closest)!=null&&C.call(l,"button")||y==null||y()},[m,y]);return f.jsxs("div",{className:`article-web-art-gated-tile ${m?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,onClick:m?void 0:w,children:[d?R:f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":Rt(p)}),f.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),f.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${m?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:y,"aria-label":`${m?"Hide":"Show"} ${p}`,children:p})]})}function kt({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){return Number(p.id)===1?f.jsx(Ot,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===2?f.jsx(Ht,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===3?f.jsx(Bt,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===4?f.jsx(zt,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===6?f.jsx($t,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===7?f.jsx(Nt,{itemWrapper:p,locked:d,onReady:R}):Number(p.id)===8?f.jsx(Et,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===9?f.jsx(Tt,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===10?f.jsx(Lt,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===11?f.jsx(It,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===12?f.jsx(St,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===13?f.jsx(Dt,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===14?f.jsx(jt,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):Number(p.id)===15?f.jsx(_t,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R}):f.jsx(At,{itemWrapper:p,index:m,activate:y,locked:d,onReady:R})}function It({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),g=a.useRef(!0),k=a.useRef(null),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),h=a.useMemo(()=>({seed:54013+(Number(p.id)||11)*7331,reduceMotion:v}),[p.id,v]);a.useEffect(()=>{if(!y)return;const e=w.current,r=I.current;if(!e||!r)return;let t=!1,s=null,n=null,i=null;const c=()=>{C.current||(C.current=!0,R==null||R(p.uniqueId))},u=X(async()=>{var b,x;try{const M=await G(()=>import("./distanceFieldEngine-DHTRwy4W.js"),[]);if(t)return;s=M.createDistanceFieldEngine(r,h),l.current=s;const S=()=>K(e,s,Math.min(1.5,window.devicePixelRatio||1));S(),(b=s.renderStatic)==null||b.call(s),d||(x=s.start)==null||x.call(s),c(),n=new ResizeObserver(()=>{S()}),n.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(j=>{var N,E,A,D;for(const O of j){if(g.current=!!O.isIntersecting,d){(N=s.setHoverActive)==null||N.call(s,!1),(E=s.stop)==null||E.call(s);continue}g.current?(A=s.start)==null||A.call(s):(D=s.stop)==null||D.call(s)}},{threshold:.25}),i.observe(e))}catch{c()}},{timeoutMs:220});return()=>{var b;t=!0,u==null||u(),i==null||i.disconnect(),n==null||n.disconnect(),(b=s==null?void 0:s.destroy)==null||b.call(s),l.current=null}},[y,h,p.uniqueId,d,R]),a.useEffect(()=>{var r,t,s,n;const e=l.current;if(e){if(d){(r=e.setHoverActive)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(s=e.stop)==null||s.call(e);return}g.current&&((n=e.start)==null||n.call(e))}},[d]);const o=e=>{const r=w.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${m+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,r,t,s;(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(s=(t=l.current)==null?void 0:t.start)==null||s.call(t)}),onPointerMove:d?void 0:(e=>{var t,s,n,i;const r=o(e);(s=(t=l.current)==null?void 0:t.setHoverActive)==null||s.call(t,!0),(i=(n=l.current)==null?void 0:n.setPointer)==null||i.call(n,r.x,r.y)}),onPointerLeave:d?void 0:(()=>{var e,r,t,s;k.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(s=(t=l.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onPointerDown:d?void 0:(e=>{var t,s,n,i,c,u;if(e.button!=null&&e.button!==0)return;k.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const r=o(e);(s=(t=l.current)==null?void 0:t.setHoverActive)==null||s.call(t,!0),(i=(n=l.current)==null?void 0:n.setPointer)==null||i.call(n,r.x,r.y),(u=(c=l.current)==null?void 0:c.boostPopulation)==null||u.call(c)}),onPointerUp:d?void 0:(e=>{k.current!=null&&e.pointerId!==k.current||(k.current=null)}),onPointerCancel:d?void 0:(()=>{var e,r,t,s;k.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(s=(t=l.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onFocus:d?void 0:(()=>{var e,r,t,s;(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(s=(t=l.current)==null?void 0:t.start)==null||s.call(t)}),onBlur:d?void 0:(()=>{var e,r,t,s;k.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(s=(t=l.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:d?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=l.current)==null?void 0:r.boostPopulation)==null||t.call(r))}),children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function St({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(null),g=a.useRef(null),k=a.useRef(!1),v=a.useRef(!0),h=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);a.useEffect(()=>{if(!y)return;const e=w.current,r=I.current,t=l.current;if(!e||!r||!t)return;let s=!1,n=null,i=null,c=null,u=null;const b=()=>{k.current||(k.current=!0,R==null||R(p.uniqueId))},x=X(async()=>{var M,S,j,N;try{const E=await G(()=>import("./androidBackgroundEngine-HmTe5YFf.js"),__vite__mapDeps([0,1])),A=await G(()=>import("./androidRobotEngine-CNxYykCI.js"),[]);if(s)return;n=E.createAndroidBackgroundEngine(r,{reduceMotion:h}),C.current=n,i=A.createAndroidRobotEngine(t,{reduceMotion:h}),g.current=i;const D=()=>{const O=Math.min(1.5,window.devicePixelRatio||1);K(e,n,O),K(e,i,O)};D(),(M=n.renderStatic)==null||M.call(n),(S=i.renderStatic)==null||S.call(i),d||(j=n.start)==null||j.call(n),d||(N=i.start)==null||N.call(i),b(),c=new ResizeObserver(()=>{D()}),c.observe(e),"IntersectionObserver"in window&&(u=new IntersectionObserver(O=>{var B,F,U,V,re,T;for(const H of O){if(v.current=!!H.isIntersecting,d){(B=n.stop)==null||B.call(n),(F=i.stop)==null||F.call(i);continue}v.current?((U=n.start)==null||U.call(n),(V=i.start)==null||V.call(i)):((re=n.stop)==null||re.call(n),(T=i.stop)==null||T.call(i))}},{threshold:.2}),u.observe(e))}catch{b()}},{timeoutMs:220});return()=>{var M,S;s=!0,x==null||x(),u==null||u.disconnect(),c==null||c.disconnect(),(M=n==null?void 0:n.destroy)==null||M.call(n),(S=i==null?void 0:i.destroy)==null||S.call(i),C.current=null,g.current=null}},[y,p.uniqueId,d,R,h]),a.useEffect(()=>{var t,s,n,i,c;const e=g.current,r=C.current;if(!(!e||!r)){if(d){(t=e.clearPointer)==null||t.call(e),(s=r.stop)==null||s.call(r),(n=e.stop)==null||n.call(e);return}v.current&&((i=r.start)==null||i.call(r),(c=e.start)==null||c.call(e))}},[d]);const o=e=>{const r=w.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android","aria-label":`Android web art tile ${m+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.start)==null||r.call(e)}),onPointerMove:d?void 0:(e=>{var t,s;const r=o(e);(s=(t=g.current)==null?void 0:t.setPointer)==null||s.call(t,r.x,r.y)}),onPointerLeave:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onFocus:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.start)==null||r.call(e)}),onBlur:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onClick:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.poke)==null||r.call(e)}),onKeyDown:d?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=g.current)==null?void 0:r.poke)==null||t.call(r))}),children:[f.jsx("canvas",{ref:I,className:"article-web-art-android-bg-canvas","aria-hidden":!0}),f.jsx("div",{className:"article-web-art-android-glow","aria-hidden":!0}),f.jsx("canvas",{ref:l,className:"article-web-art-android-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Android"})]})}function Nt({itemWrapper:p,locked:m,onReady:y}){const d=a.useRef(!1);a.useEffect(()=>{d.current||(d.current=!0,y==null||y(p.uniqueId))},[p.uniqueId,y]);const R=a.useMemo(()=>[{key:"stop",hoverMode:"stop",hoverDuration:"5s"},{key:"slow",hoverMode:"slow",hoverDuration:"18s"},{key:"super-fast",hoverMode:"super-fast",hoverDuration:"0.22s"},{key:"very-fast",hoverMode:"very-fast",hoverDuration:"0.55s"}],[]);return f.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${m?"article-web-art-spin-boxes-locked":""}`,children:f.jsx("div",{className:"article-web-art-spin-boxes-grid",children:R.map(({key:w,hoverDuration:I,hoverMode:l})=>f.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--spin-hover-duration":I},children:f.jsx("div",{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${l}`})},w))})})}function jt({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(!1),I=50,l=a.useMemo(()=>["level-1","level-2","level-3","level-4","level-5"],[]),[C,g]=a.useState(0),k=l[C],v=a.useMemo(()=>Array.from({length:I},(o,e)=>{const r=`${3/(I/2)*(e+1)}s`;return{key:e,style:{animationDelay:r,"--bar-index":e}}}),[]),h=a.useCallback(o=>{var e,r;(e=o==null?void 0:o.preventDefault)==null||e.call(o),(r=o==null?void 0:o.stopPropagation)==null||r.call(o),g(t=>(t+1)%l.length)},[l.length]);return a.useEffect(()=>{y&&(w.current||(w.current=!0,R==null||R(p.uniqueId)))},[y,p.uniqueId,R]),f.jsx("button",{type:"button",className:"article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable","aria-label":`Bars web art tile ${m+1}, ${k.replace("level-","mode ")}`,disabled:d,onClick:d?void 0:h,onKeyDown:d?void 0:o=>{(o.key==="Enter"||o.key===" ")&&h(o)},children:f.jsx("div",{className:`article-web-art-bars-stage article-web-art-bars-stage-${k}`,children:f.jsx("div",{className:`article-web-art-bars article-web-art-bars-${k}`,children:v.map(o=>f.jsx("div",{className:"article-web-art-bars-panel",style:o.style},o.key))})})})}function Et({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),g=a.useRef(!0),k=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=a.useMemo(()=>({seed:1729+(Number(p.id)||8)*4242,reduceMotion:k,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[p.id,k]);a.useEffect(()=>{if(!y)return;const t=w.current,s=I.current;if(!t||!s)return;let n=!1,i=null,c=null,u=null;const b=()=>{C.current||(C.current=!0,R==null||R(p.uniqueId))},x=X(async()=>{var M,S,j;try{const N=await G(()=>import("./shapeFieldEngine-B_ToSidK.js"),[]);if(n)return;i=N.createShapeFieldEngine(s,v),l.current=i;const E=()=>K(t,i,window.devicePixelRatio||1);E(),(M=i.renderStatic)==null||M.call(i),(S=i.triggerWave)==null||S.call(i),d||(j=i.start)==null||j.call(i),b(),c=new ResizeObserver(()=>{var A;E(),(A=i.renderStatic)==null||A.call(i)}),c.observe(t),"IntersectionObserver"in window&&(u=new IntersectionObserver(A=>{var D,O,B;for(const F of A){if(g.current=!!F.isIntersecting,d){(D=i.stop)==null||D.call(i);continue}g.current?(O=i.start)==null||O.call(i):(B=i.stop)==null||B.call(i)}},{threshold:.2}),u.observe(t))}catch{b()}});return()=>{var M;n=!0,x==null||x(),u==null||u.disconnect(),c==null||c.disconnect(),(M=i==null?void 0:i.destroy)==null||M.call(i),l.current=null}},[y,v,p.uniqueId,d,R]),a.useEffect(()=>{var s,n,i;const t=l.current;if(t){if(d){(s=t.clearPointer)==null||s.call(t),(n=t.stop)==null||n.call(t);return}g.current&&((i=t.start)==null||i.call(t))}},[d]);const h=t=>{const s=I.current||w.current;if(!s)return{x:0,y:0};const n=s.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}},o=t=>{var n,i;const s=h(t);(i=(n=l.current)==null?void 0:n.setPointer)==null||i.call(n,s.x,s.y)},e=t=>{var n,i,c,u;const s=h(t);(i=(n=l.current)==null?void 0:n.setPointer)==null||i.call(n,s.x,s.y),(u=(c=l.current)==null?void 0:c.triggerWave)==null||u.call(c,s.x,s.y)},r=t=>{var s,n;t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),(n=(s=l.current)==null?void 0:s.triggerWave)==null||n.call(s))};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${m+1}`,disabled:d,onPointerMove:d?void 0:o,onPointerDown:d?void 0:e,onPointerLeave:d?void 0:(()=>{var t,s;return(s=(t=l.current)==null?void 0:t.clearPointer)==null?void 0:s.call(t)}),onBlur:d?void 0:(()=>{var t,s;return(s=(t=l.current)==null?void 0:t.clearPointer)==null?void 0:s.call(t)}),onKeyDown:d?void 0:r,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function Tt({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),g=a.useRef(!0),[k,v]=a.useState(2.8),[h,o]=a.useState(.01);a.useEffect(()=>{if(!y)return;const i=w.current,c=I.current;if(!i||!c)return;let u=!1,b=null,x=null,M=null;const S=()=>{C.current||(C.current=!0,R==null||R(p.uniqueId))},j=X(async()=>{var N,E,A;try{const D=await G(()=>import("./hourglassEngine-Dqm3jFyu.js"),__vite__mapDeps([2,3,4]));if(u)return;b=D.createHourglassEngine(c),l.current=b;const O=(N=b.getState)==null?void 0:N.call(b);O&&(v(O.gravity),o(O.neckRatio));const B=()=>K(i,b,window.devicePixelRatio||1);B(),(E=b.renderStatic)==null||E.call(b),d||(A=b.start)==null||A.call(b),S(),x=new ResizeObserver(()=>{var F;B(),(F=b.renderStatic)==null||F.call(b)}),x.observe(i),"IntersectionObserver"in window&&(M=new IntersectionObserver(F=>{var U,V,re;for(const T of F){if(g.current=!!T.isIntersecting,d){(U=b.stop)==null||U.call(b);continue}g.current?(V=b.start)==null||V.call(b):(re=b.stop)==null||re.call(b)}},{threshold:.2}),M.observe(i))}catch{S()}});return()=>{var N;u=!0,j==null||j(),M==null||M.disconnect(),x==null||x.disconnect(),(N=b==null?void 0:b.destroy)==null||N.call(b),l.current=null}},[y,p.uniqueId,d,R]),a.useEffect(()=>{var c,u;const i=l.current;if(i){if(d){(c=i.stop)==null||c.call(i);return}g.current&&((u=i.start)==null||u.call(i))}},[d]);const e=i=>{var c,u;i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),(u=(c=l.current)==null?void 0:c.flip)==null||u.call(c))},r=i=>{i.stopPropagation()},t=i=>{i.stopPropagation()},s=i=>{var u,b;const c=Number(i.target.value);v(c),(b=(u=l.current)==null?void 0:u.setGravity)==null||b.call(u,c)},n=i=>{var u,b,x,M;const c=Number(i.target.value);o(c),(b=(u=l.current)==null?void 0:u.setNeckRatio)==null||b.call(u,c),!d&&g.current&&((M=(x=l.current)==null?void 0:x.start)==null||M.call(x))};return f.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass",role:d?void 0:"button",tabIndex:d?-1:0,"aria-label":`Hourglass web art tile ${m+1}`,onClick:d?void 0:(()=>{var i,c;return(c=(i=l.current)==null?void 0:i.flip)==null?void 0:c.call(i)}),onKeyDown:d?void 0:e,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsxs("div",{className:"article-web-art-hourglass-controls",onClickCapture:t,onPointerDownCapture:t,onPointerUpCapture:t,onClick:r,onPointerDown:r,onPointerUp:r,onKeyDown:r,children:[f.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-left",children:[f.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Neck"}),f.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.01",max:"0.22",step:"0.001",value:h,onChange:n,disabled:d,"aria-label":"Hourglass neck size"})]}),f.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-right",children:[f.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Gravity"}),f.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.45",max:"2.8",step:"0.01",value:k,onChange:s,disabled:d,"aria-label":"Hourglass gravity"})]})]}),f.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function Lt({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(null),g=a.useRef(!1),k=a.useRef(!0),[v,h]=a.useState(!1),o=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);a.useEffect(()=>{if(!y)return;const t=w.current,s=I.current,n=l.current;if(!t||!s||!n)return;let i=!1,c=null,u=null,b=null;const x=()=>{g.current||(g.current=!0,R==null||R(p.uniqueId))},M=N=>{i||(h(!0),x())},S=()=>{var N;return i?!1:((N=c==null?void 0:c.renderStatic)==null||N.call(c),c!=null&&c.hasVisibleFrame&&!c.hasVisibleFrame()?(M(),!1):(h(!1),x(),!0))},j=X(async()=>{var N;try{const E=await G(()=>import("./noiceShaderEngine-OW62H83V.js"),[]);if(i)return;c=E.createNoiceShaderEngine({backgroundCanvas:s,foregroundCanvas:n},{reduceMotion:o}),C.current=c;const A=()=>K(t,c,Math.min(1.5,window.devicePixelRatio||1));if(A(),!S())return;d||(N=c.start)==null||N.call(c),u=new ResizeObserver(()=>{var O;A(),(O=c==null?void 0:c.renderStatic)==null||O.call(c)}),u.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(O=>{var B,F,U;for(const V of O){if(k.current=!!V.isIntersecting,d){(B=c.stop)==null||B.call(c);continue}k.current?(F=c.start)==null||F.call(c):(U=c.stop)==null||U.call(c)}},{threshold:.25}),b.observe(t))}catch{M()}},{timeoutMs:220});return()=>{var N;i=!0,j==null||j(),b==null||b.disconnect(),u==null||u.disconnect(),(N=c==null?void 0:c.destroy)==null||N.call(c),C.current=null}},[y,p.uniqueId,d,R,o]),a.useEffect(()=>{var s,n,i;const t=C.current;if(t){if(d){(s=t.clearPointer)==null||s.call(t),(n=t.stop)==null||n.call(t);return}k.current&&((i=t.start)==null||i.call(t))}},[d]);const e=t=>{const s=w.current;if(!s)return{x:.5,y:.5};const n=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(t.clientY-n.top)/Math.max(1,n.height)))}},r=t=>{var n,i,c,u,b,x;const s=e(t);(i=(n=C.current)==null?void 0:n.setPointer)==null||i.call(n,s.x,s.y),(u=(c=C.current)==null?void 0:c.pulsePattern)==null||u.call(c),(x=(b=C.current)==null?void 0:b.start)==null||x.call(b)};return f.jsxs("button",{type:"button",ref:w,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice ${v?"article-web-art-tile-noice-fallback-active":""}`,"aria-label":`Noice web art tile ${m+1}`,disabled:d,onPointerMove:d?void 0:(t=>{var n,i;const s=e(t);(i=(n=C.current)==null?void 0:n.setPointer)==null||i.call(n,s.x,s.y)}),onPointerDown:d?void 0:(t=>{t.button!=null&&t.button!==0||r(t)}),onMouseLeave:d?void 0:(()=>{var t,s;(s=(t=C.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onBlur:d?void 0:(()=>{var t,s;(s=(t=C.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:d?void 0:(t=>{var s,n,i,c;(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),(n=(s=C.current)==null?void 0:s.pulsePattern)==null||n.call(s),(c=(i=C.current)==null?void 0:i.start)==null||c.call(i))}),children:[v&&f.jsxs("div",{className:"article-web-art-noice-fallback","aria-hidden":!0,children:[f.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-a"}),f.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-b"}),f.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-c"})]}),f.jsx("canvas",{ref:I,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-bg-canvas ${v?"article-web-art-canvas-hidden":""}`}),f.jsx("canvas",{ref:l,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-fg-canvas ${v?"article-web-art-canvas-hidden":""}`}),f.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function _t({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),g=a.useRef(!0),k=a.useRef(null),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);a.useEffect(()=>{if(!y)return;const o=w.current,e=I.current;if(!o||!e)return;let r=!1,t=null,s=null,n=null;const i=()=>{C.current||(C.current=!0,R==null||R(p.uniqueId))},c=X(async()=>{var u,b;try{const x=await G(()=>import("./deepShaderEngine-CuYCvQ1H.js"),[]);if(r)return;t=x.createDeepShaderEngine(e,{reduceMotion:v}),l.current=t;const M=()=>K(o,t,Math.min(1.5,window.devicePixelRatio||1));M(),(u=t.renderStatic)==null||u.call(t),d||(b=t.start)==null||b.call(t),i(),s=new ResizeObserver(()=>{var S;M(),(S=t.renderStatic)==null||S.call(t)}),s.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(S=>{var j,N,E;for(const A of S){if(g.current=!!A.isIntersecting,d){(j=t.stop)==null||j.call(t);continue}g.current?(N=t.start)==null||N.call(t):(E=t.stop)==null||E.call(t)}},{threshold:.25}),n.observe(o))}catch{i()}},{timeoutMs:220});return()=>{var u;r=!0,c==null||c(),n==null||n.disconnect(),s==null||s.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),l.current=null}},[y,p.uniqueId,d,R,v]),a.useEffect(()=>{var e,r,t;const o=l.current;if(o){if(d){k.current=null,(e=o.clearPointer)==null||e.call(o),(r=o.stop)==null||r.call(o);return}g.current&&((t=o.start)==null||t.call(o))}},[d]);const h=o=>{const e=I.current||w.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(o.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(o.clientY-r.top)/Math.max(1,r.height)))}};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-deep","aria-label":`Deep web art tile ${m+1}`,disabled:d,onPointerDown:d?void 0:o=>{var r,t,s,n;if(o.button!=null&&o.button!==0)return;k.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const e=h(o);(t=(r=l.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y),(n=(s=l.current)==null?void 0:s.start)==null||n.call(s)},onPointerMove:d?void 0:o=>{var r,t;if(k.current!=null&&o.pointerId!==k.current||k.current==null&&o.pointerType!=="mouse")return;const e=h(o);k.current!=null&&((t=(r=l.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y))},onPointerUp:d?void 0:o=>{var e,r;k.current!=null&&o.pointerId!==k.current||(k.current=null,(r=(e=l.current)==null?void 0:e.clearPointer)==null||r.call(e))},onPointerCancel:d?void 0:(()=>{var o,e;k.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onMouseLeave:d?void 0:(()=>{var o,e;k.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:d?void 0:(()=>{var o,e;k.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onKeyDown:d?void 0:(o=>{var e,r;(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),(r=(e=l.current)==null?void 0:e.start)==null||r.call(e))}),children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Deep"})]})}function At({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),g=a.useRef(!0),k=a.useRef(!1),v=Number(p==null?void 0:p.id)===5,h=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=a.useMemo(()=>{const n=Number(p.id)||m+1,i=.0026+n*8e-5,c=.0054+n*14e-5,u=n%2?1:2,b={kx:11+n*2,ky:n%2};return{refreshDelay:v?0:8e3,radiusMini:i,radiusMaxi:c,dHueStep:u,startGroup:b,seed:1337+n*1009,reduceMotion:h}},[v,p.id,m,h]);a.useEffect(()=>{if(!y)return;const n=w.current,i=I.current;if(!n||!i)return;let c=!1,u=null,b=null,x=null;const M=()=>{k.current||(k.current=!0,R==null||R(p.uniqueId))},S=X(async()=>{var j,N;try{const E=await G(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(c)return;u=E.createEmbroideryEngine(i,o),l.current=u;const A=()=>K(n,u,window.devicePixelRatio||1);A(),(j=u.renderStatic)==null||j.call(u),g.current&&((N=u.start)==null||N.call(u)),M(),b=new ResizeObserver(()=>{var D;A(),(D=u.renderStatic)==null||D.call(u)}),b.observe(n),"IntersectionObserver"in window&&(x=new IntersectionObserver(D=>{for(const O of D){if(g.current=!!O.isIntersecting,v){g.current||u.stop();continue}g.current&&C.current?u.start():u.stop()}},{threshold:.25}),x.observe(n))}catch{M()}});return()=>{c=!0,S==null||S(),x==null||x.disconnect(),b==null||b.disconnect(),u==null||u.destroy(),l.current=null}},[y,o,p.uniqueId,R]),a.useEffect(()=>{var i,c;const n=l.current;if(n){if(d){(i=n.stop)==null||i.call(n);return}g.current&&((c=n.start)==null||c.call(n))}},[d]),a.useEffect(()=>{var i,c;const n=l.current;if(n){if(d){(i=n.stop)==null||i.call(n);return}g.current&&((c=n.start)==null||c.call(n))}},[d]);const e=()=>{var n;C.current=!0,g.current&&((n=l.current)==null||n.start())},r=()=>{var n,i,c,u;C.current=!0,g.current?(i=(n=l.current)==null?void 0:n.start)==null||i.call(n):(u=(c=l.current)==null?void 0:c.stop)==null||u.call(c)},t=()=>{var n,i,c,u,b,x,M,S,j,N;if(v){(i=(n=l.current)==null?void 0:n.stop)==null||i.call(n),(u=(c=l.current)==null?void 0:c.reset)==null||u.call(c),(x=(b=l.current)==null?void 0:b.start)==null||x.call(b);return}(M=l.current)==null||M.reset(),(j=(S=l.current)==null?void 0:S.renderStatic)==null||j.call(S),g.current&&((N=l.current)==null||N.start())},s=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${m+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d||v?void 0:e,onMouseLeave:d||v?void 0:r,onFocus:d||v?void 0:e,onBlur:d||v?void 0:r,onKeyDown:d?void 0:s,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:v?"Click":Number.isFinite(Number(p==null?void 0:p.id))?Number(p.id):m+1})]})}function Dt({itemWrapper:p,index:m,activate:y,onReady:d}){const R=a.useRef(!1),w=a.useRef(null),I=a.useMemo(()=>`<!doctype html>
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
</html>`,[]);return a.useEffect(()=>{y&&(R.current||(R.current=!0,d==null||d(p.uniqueId)))},[y,p.uniqueId,d]),f.jsx("div",{className:"article-web-art-tile article-web-art-pulse-tile",role:"img","aria-label":`Pulse web art tile ${m+1}`,children:f.jsx("iframe",{ref:w,className:"article-web-art-pulse-frame",title:"Pulse web art",srcDoc:I,sandbox:"",scrolling:"no"})})}function Ot({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),g=a.useRef(null);a.useRef(null),a.useRef(!1);const k=a.useRef(!1),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),h=a.useMemo(()=>({seed:9001+(Number(p.id)||1)*1337,reduceMotion:v,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[p.id,v]);a.useEffect(()=>{if(!y)return;const u=w.current,b=I.current;if(!u||!b)return;let x=!1,M=null,S=null;const j=()=>{C.current||(C.current=!0,R==null||R(p.uniqueId))},N=X(async()=>{var E,A;try{const D=await G(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(x)return;M=D.createSpiralDotsEngine(b,h),l.current=M;const O=()=>K(u,M,window.devicePixelRatio||1);O(),(E=M.renderStatic)==null||E.call(M),(A=M.start)==null||A.call(M),j(),S=new ResizeObserver(()=>{var B;O(),M.rebuildDots(),(B=M.renderStatic)==null||B.call(M)}),S.observe(u)}catch{j()}});return()=>{x=!0,N==null||N(),S==null||S.disconnect(),M==null||M.destroy(),l.current=null}},[y,h,p.uniqueId,R]),a.useEffect(()=>{var b,x,M;const u=l.current;if(u){if(d){(b=u.clearMouse)==null||b.call(u),(x=u.stop)==null||x.call(u);return}(M=u.start)==null||M.call(u)}},[d]);const o=u=>{const b=I.current||w.current;if(!b)return{x:-1e4,y:-1e4};const x=b.getBoundingClientRect();return{x:u.clientX-x.left,y:u.clientY-x.top}},e=()=>{var u;(u=l.current)==null||u.start()},r=()=>{var u,b;(u=l.current)==null||u.clearMouse(),(b=l.current)==null||b.start()},t=()=>{e()},s=()=>{r()},n=u=>{var x;const b=o(u);(x=l.current)==null||x.setMouse(b.x,b.y)},i=()=>{e()},c=()=>{r()};return f.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-hover-only article-web-art-tile-hover-dots",role:"img",tabIndex:d?-1:0,"aria-label":`Spiral dots web art tile ${m+1}`,onPointerDown:d?void 0:u=>{var M;if(u.pointerType==="mouse")return;const b=w.current;if(!b)return;k.current=!0,g.current=u.pointerId;try{b.setPointerCapture(u.pointerId)}catch{}e();const x=o(u);(M=l.current)==null||M.setMouse(x.x,x.y)},onPointerMove:d?void 0:u=>{var x;if(!k.current||g.current!=null&&u.pointerId!==g.current)return;const b=o(u);(x=l.current)==null||x.setMouse(b.x,b.y)},onPointerUp:d?void 0:u=>{g.current!=null&&u.pointerId!==g.current||(k.current=!1,g.current=null,r())},onPointerCancel:d?void 0:()=>{k.current=!1,g.current=null,r()},onMouseEnter:d?void 0:t,onMouseLeave:d?void 0:s,onMouseMove:d?void 0:n,onFocus:d?void 0:i,onBlur:d?void 0:c,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function Ht({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),g=a.useRef(!0),k=a.useRef(!1),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),h=a.useMemo(()=>({seed:424242+(Number(p.id)||2)*2027,reduceMotion:v,targetCellSize:14,gapPx:1.4}),[p.id,v]);a.useEffect(()=>{if(!y)return;const n=w.current,i=I.current;if(!n||!i)return;let c=!1,u=null,b=null,x=null;const M=()=>{k.current||(k.current=!0,R==null||R(p.uniqueId))},S=X(async()=>{var j,N;try{const E=await G(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(c)return;u=E.createGridWaveEngine(i,h),l.current=u;const A=()=>K(n,u,window.devicePixelRatio||1);A(),(j=u.renderStatic)==null||j.call(u),g.current&&((N=u.start)==null||N.call(u)),M(),b=new ResizeObserver(()=>{var D;A(),(D=u.renderStatic)==null||D.call(u)}),b.observe(n),"IntersectionObserver"in window&&(x=new IntersectionObserver(D=>{for(const O of D)g.current=!!O.isIntersecting,g.current&&C.current?u.start():u.stop()},{threshold:.25}),x.observe(n))}catch{M()}});return()=>{c=!0,S==null||S(),x==null||x.disconnect(),b==null||b.disconnect(),u==null||u.destroy(),l.current=null}},[y,h,p.uniqueId,R]);const o=()=>{var n;C.current=!0,g.current&&((n=l.current)==null||n.start())},e=()=>{var n,i,c,u;C.current=!0,g.current?(i=(n=l.current)==null?void 0:n.start)==null||i.call(n):(u=(c=l.current)==null?void 0:c.stop)==null||u.call(c)},r=n=>{const i=I.current||w.current;if(!i)return{x:0,y:0};const c=i.getBoundingClientRect();return typeof(n==null?void 0:n.clientX)!="number"||typeof(n==null?void 0:n.clientY)!="number"?{x:c.width/2,y:c.height/2}:{x:n.clientX-c.left,y:n.clientY-c.top}},t=n=>{var c,u,b,x;const i=r(n);(c=l.current)==null||c.rippleAt(i.x,i.y),(b=(u=l.current)==null?void 0:u.renderStatic)==null||b.call(u),C.current&&g.current&&((x=l.current)==null||x.start())},s=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t(null))};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${m+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:o,onMouseLeave:d?void 0:e,onFocus:d?void 0:o,onBlur:d?void 0:e,onKeyDown:d?void 0:s,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function Bt({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),g=a.useRef(!0),k=a.useRef(!1),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),h=a.useMemo(()=>({reduceMotion:v,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[v]);a.useEffect(()=>{if(!y)return;const s=w.current,n=I.current;if(!s||!n)return;let i=!1,c=null,u=null,b=null,x=null;const M=()=>{k.current||(k.current=!0,R==null||R(p.uniqueId))},S=async()=>{var D;const N=await G(()=>import("./threeTunnelEngine-BYxOaRL9.js"),__vite__mapDeps([5,1]));if(i)return;c=N.createThreeTunnelEngine(n,h),l.current=c;const E=()=>K(s,c,Math.min(1.5,window.devicePixelRatio||1));return E(),c.reset(),g.current&&((D=c.start)==null||D.call(c)),M(),u=new ResizeObserver(()=>{E(),c.reset()}),u.observe(s),"IntersectionObserver"in window&&(b=new IntersectionObserver(O=>{for(const B of O)g.current=!!B.isIntersecting,g.current&&C.current?c.start():c.stop()},{threshold:.25}),b.observe(s)),()=>{b==null||b.disconnect(),u==null||u.disconnect(),c.destroy(),l.current=null}};let j=null;return x=X(()=>{S().then(N=>{j=N||null}).catch(()=>{M()})},{timeoutMs:300}),()=>{i=!0,x==null||x(),j==null||j()}},[y,h,p.uniqueId,R]),a.useEffect(()=>{var n,i,c;const s=l.current;if(s){if(d){(n=s.setHeld)==null||n.call(s,!1),(i=s.stop)==null||i.call(s);return}g.current&&((c=s.start)==null||c.call(s))}},[d]);const o=()=>{var s;C.current=!0,g.current&&((s=l.current)==null||s.start())},e=()=>{var s,n,i,c;C.current=!0,g.current?(n=(s=l.current)==null?void 0:s.start)==null||n.call(s):(c=(i=l.current)==null?void 0:i.stop)==null||c.call(i)},r=()=>{var s,n,i,c;(n=(s=l.current)==null?void 0:s.nextPalette)==null||n.call(s),(i=l.current)==null||i.reset(),g.current&&((c=l.current)==null||c.start())},t=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),r())};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${m+1}`,disabled:d,onClick:d?void 0:r,onMouseEnter:d?void 0:o,onMouseLeave:d?void 0:e,onFocus:d?void 0:o,onBlur:d?void 0:e,onKeyDown:d?void 0:t,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),f.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function zt({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),g=a.useRef(!0),k=a.useRef(!1),v=a.useRef(null),h=a.useRef(null),o=a.useRef(!1),e=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=a.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,d]);a.useEffect(()=>{if(!y)return;const n=w.current,i=I.current;if(!n||!i)return;let c=!1,u=null,b=null;const x=()=>{k.current||(k.current=!0,R==null||R(p.uniqueId))},M=async()=>{var D;const S=await G(()=>import("./threePolygonDemo5Engine-J7VS_NUu.js"),__vite__mapDeps([6,1]));if(c)return;const j=S.createThreePolygonDemo5Engine(i,r);l.current=j;const N=()=>K(n,j,Math.min(1.2,window.devicePixelRatio||1));N(),j.reset(),window.requestAnimationFrame(()=>{c||l.current!==j||(N(),j.reset())}),g.current&&((D=j.start)==null||D.call(j)),x();const E=new ResizeObserver(()=>{N()});E.observe(n);let A=null;"IntersectionObserver"in window&&(A=new IntersectionObserver(O=>{for(const B of O)g.current=!!B.isIntersecting,g.current&&C.current?j.start():j.stop()},{threshold:.25}),A.observe(n)),u=()=>{A==null||A.disconnect(),E.disconnect(),j.destroy(),l.current=null}};return b=X(()=>{M().catch(()=>{x()})},{timeoutMs:300}),()=>{c=!0,b==null||b(),h.current!=null&&window.clearTimeout(h.current),u==null||u()}},[y,r,p.uniqueId,R]);const t=()=>{var n,i,c;(i=(n=l.current)==null?void 0:n.boost)==null||i.call(n),g.current&&((c=l.current)==null||c.start())},s=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${m+1}`,disabled:d,onKeyDown:d?void 0:s,onPointerDown:d?void 0:n=>{var i;if(!(n.button!=null&&n.button!==0)){v.current=n.pointerId,o.current=!1;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}g.current&&((i=l.current)==null||i.start()),h.current!=null&&window.clearTimeout(h.current),h.current=window.setTimeout(()=>{var c,u;v.current!=null&&(o.current=!0,(u=(c=l.current)==null?void 0:c.setHeld)==null||u.call(c,!0))},140)}},onPointerUp:d?void 0:n=>{var i,c;v.current!=null&&n.pointerId!==v.current||(h.current!=null&&(window.clearTimeout(h.current),h.current=null),v.current=null,o.current?(o.current=!1,(c=(i=l.current)==null?void 0:i.setHeld)==null||c.call(i,!1)):t())},onPointerCancel:d?void 0:(()=>{var n,i;h.current!=null&&(window.clearTimeout(h.current),h.current=null),v.current=null,o.current=!1,(i=(n=l.current)==null?void 0:n.setHeld)==null||i.call(n,!1)}),onLostPointerCapture:d?void 0:(()=>{var n,i;h.current!=null&&(window.clearTimeout(h.current),h.current=null),v.current=null,o.current=!1,(i=(n=l.current)==null?void 0:n.setHeld)==null||i.call(n,!1)}),onMouseEnter:d?void 0:(()=>{var n;C.current=!0,g.current&&((n=l.current)==null||n.start())}),onMouseLeave:d?void 0:(()=>{var n,i,c,u;h.current!=null&&(window.clearTimeout(h.current),h.current=null),v.current=null,o.current=!1,(i=(n=l.current)==null?void 0:n.setHeld)==null||i.call(n,!1),C.current=!0,g.current?(c=l.current)==null||c.start():(u=l.current)==null||u.stop()}),onFocus:d?void 0:(()=>{var n;C.current=!0,g.current&&((n=l.current)==null||n.start())}),onBlur:d?void 0:(()=>{var n,i,c,u;h.current!=null&&(window.clearTimeout(h.current),h.current=null),v.current=null,o.current=!1,(i=(n=l.current)==null?void 0:n.setHeld)==null||i.call(n,!1),C.current=!0,g.current?(c=l.current)==null||c.start():(u=l.current)==null||u.stop()}),children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function $t({itemWrapper:p,index:m,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),g=a.useRef(!0),k=a.useRef(!1),v=a.useRef(0),h=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=a.useMemo(()=>({reduceMotion:h,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[h]);a.useEffect(()=>{if(!y)return;const n=w.current,i=I.current;if(!n||!i)return;let c=!1,u=null,b=null,x=null;const M=()=>{k.current||(k.current=!0,R==null||R(p.uniqueId))},S=X(async()=>{var j,N;try{const E=await G(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(c)return;u=E.createOrbitCirclesEngine(i,o),l.current=u;const A=()=>K(n,u,window.devicePixelRatio||1);A(),u.reset(),(j=u.renderStatic)==null||j.call(u),g.current&&((N=u.start)==null||N.call(u)),M(),b=new ResizeObserver(()=>{var D;A(),(D=u.renderStatic)==null||D.call(u)}),b.observe(n),"IntersectionObserver"in window&&(x=new IntersectionObserver(D=>{for(const O of D)g.current=!!O.isIntersecting,g.current&&C.current?u.start():u.stop()},{threshold:.25}),x.observe(n))}catch{M()}});return()=>{c=!0,S==null||S(),x==null||x.disconnect(),b==null||b.disconnect(),u==null||u.destroy(),l.current=null}},[y,o,p.uniqueId,R]),a.useEffect(()=>{var i,c;const n=l.current;if(n){if(d){(i=n.stop)==null||i.call(n);return}g.current&&((c=n.start)==null||c.call(n))}},[d]);const e=()=>{var n;C.current=!0,g.current&&((n=l.current)==null||n.start())},r=()=>{var n,i,c,u;C.current=!0,g.current?(i=(n=l.current)==null?void 0:n.start)==null||i.call(n):(u=(c=l.current)==null?void 0:c.stop)==null||u.call(c)},t=()=>{var b,x,M;const n=l.current;if(!n)return;const i=Math.max(1,((b=n.getTotalCircles)==null?void 0:b.call(n))||1),c=v.current%i,u=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`;(x=n.setCircleColor)==null||x.call(n,c,u),v.current+=1,g.current&&((M=n.start)==null||M.call(n))},s=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${m+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:e,onMouseLeave:d?void 0:r,onFocus:d?void 0:e,onBlur:d?void 0:r,onKeyDown:d?void 0:s,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function Ft({readyId:p,locked:m,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=a.useMemo(()=>({seed:20250414,reduceMotion:l,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[l]);a.useEffect(()=>{const v=d.current,h=R.current;if(!v||!h)return;let o=!1,e=null,r=null,t=null;const s=()=>{I.current||(I.current=!0,y==null||y(p))},n=X(async()=>{var i,c;try{const u=await G(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(o)return;e=u.createTortuosityTraceEngine(h,C),w.current=e;const b=()=>K(v,e,Math.min(1.5,window.devicePixelRatio||1));b(),(i=e.renderStatic)==null||i.call(e),(c=e.start)==null||c.call(e),s(),r=new ResizeObserver(()=>{var x;b(),(x=e.reset)==null||x.call(e)}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(x=>{var M,S;for(const j of x)j.isIntersecting?(M=e.start)==null||M.call(e):(S=e.stop)==null||S.call(e)},{threshold:.25}),t.observe(v))}catch{s()}},{timeoutMs:200});return()=>{var i;o=!0,n==null||n(),t==null||t.disconnect(),r==null||r.disconnect(),(i=e==null?void 0:e.destroy)==null||i.call(e),w.current=null}},[C,y,p]),a.useEffect(()=>{var h,o,e;const v=w.current;if(v){if(m){(h=v.setHeld)==null||h.call(v,!1),(o=v.stop)==null||o.call(v);return}(e=v.start)==null||e.call(v)}},[m]),a.useEffect(()=>{var h,o;const v=w.current;if(v){if(m){(h=v.stop)==null||h.call(v);return}(o=v.start)==null||o.call(v)}},[m]);const g=()=>{var v,h,o,e;(h=(v=w.current)==null?void 0:v.reset)==null||h.call(v),(e=(o=w.current)==null?void 0:o.start)==null||e.call(o)},k=v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g())};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:m,onClick:m?void 0:g,onKeyDown:m?void 0:k,children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function qt({readyId:p,locked:m,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=a.useMemo(()=>({seed:20250415,reduceMotion:C,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[C]);a.useEffect(()=>{const o=d.current,e=R.current;if(!o||!e)return;let r=!1,t=null,s=null,n=null;const i=()=>{I.current||(I.current=!0,y==null||y(p))},c=X(async()=>{var u,b;try{const x=await G(()=>import("./hexFlowBallsEngine-Bzfny-m0.js"),[]);if(r)return;t=x.createHexFlowBallsEngine(e,g),w.current=t;const M=()=>K(o,t,Math.min(1.5,window.devicePixelRatio||1));M(),(u=t.renderStatic)==null||u.call(t),(b=t.start)==null||b.call(t),i(),s=new ResizeObserver(()=>{var S;M(),(S=t.renderStatic)==null||S.call(t)}),s.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(S=>{var j,N;for(const E of S)E.isIntersecting?(j=t.start)==null||j.call(t):(N=t.stop)==null||N.call(t)},{threshold:.25}),n.observe(o))}catch{i()}},{timeoutMs:220});return()=>{var u;r=!0,c==null||c(),n==null||n.disconnect(),s==null||s.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),w.current=null}},[g,y,p]),a.useEffect(()=>{var e,r,t;const o=w.current;if(o){if(m){(e=o.clearPointer)==null||e.call(o),(r=o.stop)==null||r.call(o);return}(t=o.start)==null||t.call(o)}},[m]);const k=o=>{const e=d.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:r.width>0?(o.clientX-r.left)/r.width:.5,y:r.height>0?(o.clientY-r.top)/r.height:.5}},v=()=>{var o,e,r,t;(e=(o=w.current)==null?void 0:o.burst)==null||e.call(o),(t=(r=w.current)==null?void 0:r.start)==null||t.call(r)},h=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),v())};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:m,onClick:m?void 0:v,onPointerDown:m?void 0:(o=>{var r,t;l.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const e=k(o);(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerMove:m?void 0:(o=>{var r,t;if(l.current!=null&&o.pointerId!==l.current)return;const e=k(o);(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerUp:m?void 0:(o=>{l.current!=null&&o.pointerId!==l.current||(l.current=null)}),onPointerCancel:m?void 0:(()=>{var o,e;l.current=null,(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onMouseMove:m?void 0:(o=>{var r,t;const e=k(o);(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onMouseLeave:m?void 0:(()=>{var o,e;l.current=null,(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:m?void 0:(()=>{var o,e;l.current=null,(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onKeyDown:m?void 0:h,children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function Vt({readyId:p,locked:m,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=a.useMemo(()=>({seed:20250416,reduceMotion:l,step:6,side:5}),[l]);a.useEffect(()=>{const h=d.current,o=R.current;if(!h||!o)return;let e=!1,r=null,t=null,s=null;const n=()=>{I.current||(I.current=!0,y==null||y(p))},i=X(async()=>{var c,u;try{const b=await G(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;r=b.createPixelPlopEngine(o,C),w.current=r;const x=()=>K(h,r,Math.min(1.5,window.devicePixelRatio||1));x(),(c=r.renderStatic)==null||c.call(r),(u=r.start)==null||u.call(r),n(),t=new ResizeObserver(()=>{var M;x(),(M=r.reset)==null||M.call(r)}),t.observe(h),"IntersectionObserver"in window&&(s=new IntersectionObserver(M=>{var S,j;for(const N of M)N.isIntersecting?(S=r.start)==null||S.call(r):(j=r.stop)==null||j.call(r)},{threshold:.25}),s.observe(h))}catch{n()}},{timeoutMs:220});return()=>{var c;e=!0,i==null||i(),s==null||s.disconnect(),t==null||t.disconnect(),(c=r==null?void 0:r.destroy)==null||c.call(r),w.current=null}},[C,y,p]),a.useEffect(()=>{var o,e,r;const h=w.current;if(h){if(m){(o=h.clearPointer)==null||o.call(h),(e=h.stop)==null||e.call(h);return}(r=h.start)==null||r.call(h)}},[m]),a.useEffect(()=>{var o,e;const h=w.current;if(h){if(m){(o=h.stop)==null||o.call(h);return}(e=h.start)==null||e.call(h)}},[m]);const g=()=>{var h,o,e,r;(o=(h=w.current)==null?void 0:h.seedBurst)==null||o.call(h),(r=(e=w.current)==null?void 0:e.start)==null||r.call(e)},k=h=>{var r,t,s,n;const o=R.current||d.current;if(!o||typeof(h==null?void 0:h.clientX)!="number"||typeof(h==null?void 0:h.clientY)!="number"){g();return}const e=o.getBoundingClientRect();(t=(r=w.current)==null?void 0:r.burstAt)==null||t.call(r,h.clientX-e.left,h.clientY-e.top),(n=(s=w.current)==null?void 0:s.start)==null||n.call(s)},v=h=>{(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),g())};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:m,onPointerDown:m?void 0:(h=>{h.button!=null&&h.button!==0||k(h)}),onKeyDown:m?void 0:v,children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function Gt({readyId:p,locked:m,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useRef(!1),g=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=a.useMemo(()=>({reduceMotion:g,seed:20250417}),[g]);a.useEffect(()=>{const e=d.current,r=R.current;if(!e||!r)return;let t=!1,s=null,n=null,i=null;const c=()=>{I.current||(I.current=!0,y==null||y(p))},u=X(async()=>{var b,x;try{const M=await G(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(t)return;s=M.createJuliaLinesEngine(r,k),w.current=s;const S=()=>K(e,s,Math.min(1.5,window.devicePixelRatio||1));S(),(b=s.renderStatic)==null||b.call(s),(x=s.start)==null||x.call(s),c(),n=new ResizeObserver(()=>{S()}),n.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(j=>{var N,E;for(const A of j)A.isIntersecting?(N=s.start)==null||N.call(s):(E=s.stop)==null||E.call(s)},{threshold:.25}),i.observe(e))}catch{c()}},{timeoutMs:220});return()=>{var b;t=!0,u==null||u(),i==null||i.disconnect(),n==null||n.disconnect(),(b=s==null?void 0:s.destroy)==null||b.call(s),w.current=null}},[k,y,p]),a.useEffect(()=>{var r,t,s,n;const e=w.current;if(e){if(m){(r=e.setHeld)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(s=e.stop)==null||s.call(e);return}(n=e.start)==null||n.call(e)}},[m]),a.useEffect(()=>{var r,t,s;const e=w.current;if(e){if(m){(r=e.clearPointer)==null||r.call(e),(t=e.stop)==null||t.call(e);return}(s=e.start)==null||s.call(e)}},[m]);const v=e=>{const r=d.current;if(!r)return{x:.4,y:.5};const t=r.getBoundingClientRect(),s=(e.clientX-t.left)/Math.max(1,t.width),n=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,s)),y:Math.max(0,Math.min(1,n))}},h=()=>{var e,r,t,s;(r=(e=w.current)==null?void 0:e.reset)==null||r.call(e),(s=(t=w.current)==null?void 0:t.start)==null||s.call(t)},o=e=>{var t,s,n,i,c,u,b,x;const r=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(s=(t=w.current)==null?void 0:t.nudge)==null||s.call(t,0,-r)):e.key==="ArrowDown"?(e.preventDefault(),(i=(n=w.current)==null?void 0:n.nudge)==null||i.call(n,0,r)):e.key==="ArrowLeft"?(e.preventDefault(),(u=(c=w.current)==null?void 0:c.nudge)==null||u.call(c,-r,0)):e.key==="ArrowRight"?(e.preventDefault(),(x=(b=w.current)==null?void 0:b.nudge)==null||x.call(b,r,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),h())};return f.jsxs("div",{ref:d,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:m?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:m?void 0:e=>{var s,n;const r=d.current;if(!r)return;C.current=!0,l.current=e.pointerId;try{r.setPointerCapture(e.pointerId)}catch{}const t=v(e);(n=(s=w.current)==null?void 0:s.setPointer)==null||n.call(s,t.x,t.y)},onPointerMove:m?void 0:e=>{var t,s;if(C.current&&l.current!=null&&e.pointerId!==l.current)return;const r=v(e);(s=(t=w.current)==null?void 0:t.setPointer)==null||s.call(t,r.x,r.y)},onPointerUp:m?void 0:e=>{var r,t;l.current!=null&&e.pointerId!==l.current||(C.current=!1,l.current=null,(t=(r=w.current)==null?void 0:r.clearPointer)==null||t.call(r))},onPointerCancel:m?void 0:()=>{var e,r;C.current=!1,l.current=null,(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)},onMouseMove:m?void 0:e=>{var t,s;const r=v(e);(s=(t=w.current)==null?void 0:t.setPointer)==null||s.call(t,r.x,r.y)},onMouseLeave:m?void 0:(()=>{var e,r;(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:m?void 0:(()=>{var e,r;(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:m?void 0:o,onClick:m?void 0:h,children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function Kt({readyId:p,locked:m,onReady:y}){const[d,R]=a.useState(0),[w,I]=a.useState("mine"),[l,C]=a.useState(()=>new Set),[g,k]=a.useState(()=>new Set),[v,h]=a.useState("playing"),[o,e]=a.useState(null),[r,t]=a.useState(0),s=a.useMemo(()=>gt(),[d]);a.useEffect(()=>{y==null||y(p)},[y,p]),a.useEffect(()=>{I("mine"),C(new Set),k(new Set),h("playing"),e(null),t(0)},[d]),a.useEffect(()=>{if(o==null||v!=="playing")return;const x=()=>{t(Math.min(5999,Math.floor((Date.now()-o)/1e3)))};x();const M=window.setInterval(x,1e3);return()=>{window.clearInterval(M)}},[o,v]);const n=()=>{R(x=>x+1)},i=x=>{if(m||v!=="playing")return;if(o==null&&e(Date.now()),w==="flag"){if(l.has(x))return;const S=new Set(g);S.has(x)?S.delete(x):S.add(x),k(S),Ke(s,l,S)&&h("won");return}if(g.has(x)||l.has(x))return;if(s.mines.has(x)){const S=new Set(l);for(const j of s.mines)S.add(j);S.add(x),C(S),h("lost");return}const M=Mt(x,s,l,g);C(M),Ke(s,M,g)&&h("won")},c=s.mineCount-g.size,u=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`;let b="🤔";return v==="lost"?b="😣":v==="won"?b="😎":g.size>=s.mineCount?b="😕":g.size>=s.mineCount-1?b="🤓":g.size>=Math.round(s.mineCount*3/4)?b="😃":g.size>=Math.round(s.mineCount*2/3)?b="😊":g.size>=Math.round(s.mineCount/2)?b="🙂":g.size>=Math.round(s.mineCount/3)?b="😏":g.size>0&&(b="😐"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:f.jsxs("div",{className:"article-web-art-minesweeper",children:[f.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[f.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${w==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>I("mine"),disabled:m||v!=="playing","aria-pressed":w==="mine",children:"⛏"}),f.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${w==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>I("flag"),disabled:m||v!=="playing","aria-pressed":w==="flag",children:"🚩"})]}),f.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[s.counts.map((x,M)=>{const S=l.has(M),j=g.has(M),N=s.mines.has(M),E=v==="lost"&&N,A=x>0?vt[x-1]:void 0;return f.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${S?"article-web-art-minesweeper-cell-revealed":""} ${E?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>i(M),disabled:m||v!=="playing","aria-label":`Minesweeper cell ${M+1}`,children:[j&&!S?f.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,E?f.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,S&&!N&&x>0?f.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:A},children:x}):null]},`mine-${d}-${M}`)}),v==="lost"?f.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:n,children:["Ooohhh 🙁",f.jsx("br",{}),"Click to try again"]}):null,v==="won"?f.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:n,children:["👌👀✔💯💯💯",f.jsx("br",{}),"Click to restart"]}):null]}),f.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[f.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[f.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:b}),f.jsx("span",{children:c})]}),f.jsx("div",{className:"article-web-art-minesweeper-timer",children:u})]}),f.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function Yt({readyId:p,locked:m,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=a.useMemo(()=>({reduceMotion:C}),[C]);a.useEffect(()=>{const o=d.current,e=R.current;if(!o||!e)return;let r=!1,t=null,s=null,n=null;const i=()=>{I.current||(I.current=!0,y==null||y(p))},c=X(async()=>{var u,b;try{const x=await G(()=>import("./fallingRingsEngine-CgfU8E0P.js"),[]);if(r)return;t=x.createFallingRingsEngine(e,g),w.current=t;const M=()=>K(o,t,Math.min(1.5,window.devicePixelRatio||1));M(),(u=t.renderStatic)==null||u.call(t),(b=t.start)==null||b.call(t),i(),s=new ResizeObserver(()=>{M()}),s.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(S=>{var j,N;for(const E of S)E.isIntersecting?(j=t.start)==null||j.call(t):(N=t.stop)==null||N.call(t)},{threshold:.25}),n.observe(o))}catch{i()}},{timeoutMs:220});return()=>{var u;r=!0,c==null||c(),n==null||n.disconnect(),s==null||s.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),w.current=null}},[g,y,p]);const k=o=>{var e,r,t,s;(r=(e=w.current)==null?void 0:e.setHeld)==null||r.call(e,o),(s=(t=w.current)==null?void 0:t.start)==null||s.call(t)},v=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),k(!0))},h=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),k(!1))};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:m,onPointerDown:m?void 0:o=>{l.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}k(!0)},onPointerUp:m?void 0:o=>{l.current!=null&&o.pointerId!==l.current||(l.current=null,k(!1))},onPointerCancel:m?void 0:()=>{l.current=null,k(!1)},onLostPointerCapture:m?void 0:()=>{l.current=null,k(!1)},onMouseLeave:m?void 0:(()=>{l.current!=null&&k(!1)}),onBlur:m?void 0:(()=>{l.current=null,k(!1)}),onKeyDown:m?void 0:v,onKeyUp:m?void 0:h,children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function Xt({readyId:p,locked:m,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useRef("mouse"),g=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=a.useMemo(()=>({reduceMotion:g,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[g]);a.useEffect(()=>{const h=d.current,o=R.current;if(!h||!o)return;let e=!1,r=null,t=null,s=null;const n=()=>{I.current||(I.current=!0,y==null||y(p))},i=X(async()=>{var c,u;try{const b=await G(()=>import("./prismFieldEngine-BvTSiE5I.js"),__vite__mapDeps([7,1]));if(e)return;r=b.createPrismFieldEngine(o,k),w.current=r;const x=()=>K(h,r,Math.min(1.5,window.devicePixelRatio||1));x(),(c=r.renderStatic)==null||c.call(r),(u=r.start)==null||u.call(r),n(),t=new ResizeObserver(()=>{x()}),t.observe(h),"IntersectionObserver"in window&&(s=new IntersectionObserver(M=>{var S,j;for(const N of M)N.isIntersecting?(S=r.start)==null||S.call(r):(j=r.stop)==null||j.call(r)},{threshold:.25}),s.observe(h))}catch{n()}},{timeoutMs:220});return()=>{var c;e=!0,i==null||i(),s==null||s.disconnect(),t==null||t.disconnect(),(c=r==null?void 0:r.destroy)==null||c.call(r),w.current=null}},[k,y,p]);const v=h=>{const o=d.current;if(!o)return{x:.5,y:.5};const e=o.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(h.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(h.clientY-e.top)/Math.max(1,e.height)))}};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:m,onClick:m?void 0:(()=>{var h,o,e,r;(o=(h=w.current)==null?void 0:h.reset)==null||o.call(h),(r=(e=w.current)==null?void 0:e.start)==null||r.call(e)}),onPointerDown:m?void 0:h=>{var e,r;l.current=h.pointerId,C.current=h.pointerType||"mouse";try{h.currentTarget.setPointerCapture(h.pointerId)}catch{}const o=v(h);(r=(e=w.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onPointerMove:m?void 0:h=>{var e,r;if(l.current!=null&&h.pointerId!==l.current)return;const o=v(h);(r=(e=w.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onPointerUp:m?void 0:h=>{var o,e;l.current!=null&&h.pointerId!==l.current||(l.current=null,(h.pointerType||C.current)==="mouse"&&((e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)))},onPointerCancel:m?void 0:(()=>{var h,o;l.current=null,C.current==="mouse"&&((o=(h=w.current)==null?void 0:h.clearPointer)==null||o.call(h))}),onMouseMove:m?void 0:h=>{var e,r;const o=v(h);(r=(e=w.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onMouseLeave:m?void 0:(()=>{var h,o;l.current=null,(o=(h=w.current)==null?void 0:h.clearPointer)==null||o.call(h)}),onBlur:m?void 0:(()=>{var h,o;l.current=null,C.current="mouse",(o=(h=w.current)==null?void 0:h.clearPointer)==null||o.call(h)}),onKeyDown:m?void 0:(h=>{var o,e,r,t;(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),(e=(o=w.current)==null?void 0:o.reset)==null||e.call(o),(t=(r=w.current)==null?void 0:r.start)==null||t.call(r))}),children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function Ut({readyId:p,locked:m,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useRef(null),g=a.useRef(!1),k=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=a.useMemo(()=>({reduceMotion:k}),[k]);a.useEffect(()=>{const e=d.current,r=R.current;if(!e||!r)return;let t=!1,s=null,n=null,i=null;const c=()=>{I.current||(I.current=!0,y==null||y(p))},u=X(async()=>{var b,x;try{const M=await G(()=>import("./ropeLightEngine-ZZGO6u7c.js"),[]);if(t)return;s=M.createRopeLightEngine(r,v),w.current=s;const S=()=>K(e,s,Math.min(1.5,window.devicePixelRatio||1));S(),(b=s.renderStatic)==null||b.call(s),(x=s.start)==null||x.call(s),c(),n=new ResizeObserver(()=>{S()}),n.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(j=>{var N,E;for(const A of j)A.isIntersecting?(N=s.start)==null||N.call(s):(E=s.stop)==null||E.call(s)},{threshold:.25}),i.observe(e))}catch{c()}},{timeoutMs:220});return()=>{var b;t=!0,u==null||u(),i==null||i.disconnect(),n==null||n.disconnect(),(b=s==null?void 0:s.destroy)==null||b.call(s),w.current=null}},[v,y,p]);const h=e=>{const r=d.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}},o=e=>{var t,s,n,i;if(g.current){g.current=!1;return}const r=e?h(e):{x:.5,y:.18};(s=(t=w.current)==null?void 0:t.toggleHangAt)==null||s.call(t,r.x,r.y),(i=(n=w.current)==null?void 0:n.start)==null||i.call(n)};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:m,onClick:m?void 0:o,onPointerDown:m?void 0:e=>{var r,t;l.current=e.pointerId,g.current=!1,C.current=h(e);try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,C.current.x,C.current.y)},onPointerMove:m?void 0:e=>{var s,n;if(l.current!=null&&e.pointerId!==l.current)return;const r=h(e),t=C.current;t&&Math.hypot(r.x-t.x,r.y-t.y)>.025&&(g.current=!0),(n=(s=w.current)==null?void 0:s.setPointer)==null||n.call(s,r.x,r.y)},onPointerUp:m?void 0:e=>{var r,t;if(!(l.current!=null&&e.pointerId!==l.current)){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}l.current=null,C.current=null,(t=(r=w.current)==null?void 0:r.clearPointer)==null||t.call(r)}},onPointerCancel:m?void 0:(e=>{var r,t;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}l.current=null,C.current=null,g.current=!1,(t=(r=w.current)==null?void 0:r.clearPointer)==null||t.call(r)}),onMouseMove:m?void 0:e=>{var t,s;const r=h(e);(s=(t=w.current)==null?void 0:t.setPointer)==null||s.call(t,r.x,r.y)},onMouseLeave:m?void 0:(()=>{var e,r;l.current=null,C.current=null,(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:m?void 0:(()=>{var e,r;l.current=null,C.current=null,g.current=!1,(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:m?void 0:(e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),o())}),children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}const Zt=["rotateX(270deg) translateZ(0.5em)","rotateY(0deg) translateZ(0.5em)","rotateY(90deg) translateZ(0.5em)","rotateY(180deg) translateZ(0.5em)","rotateY(270deg) translateZ(0.5em)","rotateX(90deg) translateZ(0.5em)"],Ue=Array.from({length:28},(p,m)=>m);function Jt(){return f.jsx("div",{className:"article-web-art-soup-backdrop","aria-hidden":!0,children:Ue.map(p=>f.jsx("div",{className:"article-web-art-soup-cube",style:{animationDelay:`${p*.06}s`,fontSize:`${p+1}em`,"--soup-cube-depth":`${p/Math.max(1,Ue.length-1)}`},children:Zt.map((m,y)=>f.jsx("span",{className:"article-web-art-soup-face",style:{transform:m}},y))},p))})}function Qt({readyId:p,locked:m,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=a.useMemo(()=>({reduceMotion:C}),[C]);a.useEffect(()=>{const v=d.current,h=R.current;if(!v||!h)return;let o=!1,e=null,r=null,t=null;const s=()=>{I.current||(I.current=!0,y==null||y(p))},n=X(async()=>{var i,c;try{const u=await G(()=>import("./soupShaderEngine-BVaccG7j.js"),__vite__mapDeps([8,1]));if(o)return;e=u.createSoupShaderEngine(h,g),w.current=e;const b=()=>K(v,e,Math.min(1.5,window.devicePixelRatio||1));b(),(i=e.renderStatic)==null||i.call(e),(c=e.start)==null||c.call(e),s(),r=new ResizeObserver(()=>{b()}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(x=>{var M,S;for(const j of x)j.isIntersecting?(M=e.start)==null||M.call(e):(S=e.stop)==null||S.call(e)},{threshold:.25}),t.observe(v))}catch{s()}},{timeoutMs:220});return()=>{var i;o=!0,n==null||n(),t==null||t.disconnect(),r==null||r.disconnect(),(i=e==null?void 0:e.destroy)==null||i.call(e),w.current=null}},[g,y,p]);const k=v=>{const h=d.current;if(!h)return{x:.5,y:.5};const o=h.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(v.clientX-o.left)/Math.max(1,o.width))),y:Math.max(0,Math.min(1,(v.clientY-o.top)/Math.max(1,o.height)))}};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile","aria-label":"Soup shader web art tile",disabled:m,onPointerDown:m?void 0:v=>{var o,e,r,t;l.current=v.pointerId;try{v.currentTarget.setPointerCapture(v.pointerId)}catch{}const h=k(v);(e=(o=w.current)==null?void 0:o.setPointer)==null||e.call(o,h.x,h.y),(t=(r=w.current)==null?void 0:r.setHeld)==null||t.call(r,!0)},onPointerMove:m?void 0:v=>{var o,e;if(l.current!=null&&v.pointerId!==l.current)return;const h=k(v);(e=(o=w.current)==null?void 0:o.setPointer)==null||e.call(o,h.x,h.y)},onPointerUp:m?void 0:v=>{var h,o;l.current!=null&&v.pointerId!==l.current||(l.current=null,(o=(h=w.current)==null?void 0:h.setHeld)==null||o.call(h,!1))},onPointerCancel:m?void 0:(()=>{var v,h;l.current=null,(h=(v=w.current)==null?void 0:v.setHeld)==null||h.call(v,!1)}),onMouseMove:m?void 0:v=>{var o,e;const h=k(v);(e=(o=w.current)==null?void 0:o.setPointer)==null||e.call(o,h.x,h.y)},onMouseLeave:m?void 0:(()=>{var v,h,o,e;l.current=null,(h=(v=w.current)==null?void 0:v.setHeld)==null||h.call(v,!1),(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:m?void 0:(()=>{var v,h,o,e;l.current=null,(h=(v=w.current)==null?void 0:v.setHeld)==null||h.call(v,!1),(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),children:[f.jsx(Jt,{}),f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function Wt({readyId:p,locked:m,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useRef(null),g=a.useRef(0),[k,v]=a.useState(!1),[h,o]=a.useState([]),e=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=a.useMemo(()=>({reduceMotion:e}),[e]);a.useEffect(()=>{const i=d.current,c=R.current;if(!i||!c)return;let u=!1,b=null,x=null,M=null;const S=()=>{I.current||(I.current=!0,y==null||y(p))},j=X(async()=>{var N,E;try{const A=await G(()=>import("./tardisWormholeEngine-Czkyopnk.js"),__vite__mapDeps([9,1]));if(u)return;b=A.createTardisWormholeEngine(c,r),w.current=b;const D=()=>K(i,b,Math.min(1.5,window.devicePixelRatio||1));D(),(N=b.renderStatic)==null||N.call(b),(E=b.start)==null||E.call(b),S(),x=new ResizeObserver(()=>{D()}),x.observe(i),"IntersectionObserver"in window&&(M=new IntersectionObserver(O=>{var B,F;for(const U of O)U.isIntersecting?(B=b.start)==null||B.call(b):(F=b.stop)==null||F.call(b)},{threshold:.25}),M.observe(i))}catch{S()}},{timeoutMs:220});return()=>{var N;u=!0,j==null||j(),M==null||M.disconnect(),x==null||x.disconnect(),(N=b==null?void 0:b.destroy)==null||N.call(b),w.current=null}},[r,y,p]),a.useEffect(()=>{if(h.length===0)return;const i=window.setTimeout(()=>{o(c=>c.slice(1))},1e3);return()=>{window.clearTimeout(i)}},[h]),a.useEffect(()=>{var c,u,b;const i=w.current;if(i){if(m){v(!1),C.current=null,(c=i.clearPointer)==null||c.call(i),(u=i.stop)==null||u.call(i);return}(b=i.start)==null||b.call(i)}},[m]);const t=i=>{const c=d.current,u=R.current||c;if(!c||!u)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const b=u.getBoundingClientRect(),x=c.getBoundingClientRect(),M=Math.max(0,Math.min(x.width,i.clientX-x.left)),S=Math.max(0,Math.min(x.height,i.clientY-x.top)),j=Math.max(0,Math.min(b.width,i.clientX-b.left)),N=Math.max(0,Math.min(b.height,i.clientY-b.top)),E=C.current,A=E?j-E.px:0,D=E?N-E.py:0;return C.current={px:j,py:N},{x:b.width>0?j/b.width:.5,y:b.height>0?N/b.height:.5,px:M,py:S,dx:A,dy:D}},s=(i,c)=>{const u=g.current++;o(b=>[...b,{id:u,x:i,y:c}])},n=i=>{var u,b,x,M;const c=t(i);s(c.px,c.py),(b=(u=w.current)==null?void 0:u.boost)==null||b.call(u),(M=(x=w.current)==null?void 0:x.start)==null||M.call(x),v(!0),window.setTimeout(()=>{v(!1)},650)};return f.jsxs("button",{type:"button",ref:d,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${k?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:m,onClick:m?void 0:n,onContextMenu:m?void 0:(i=>{var u,b,x,M;i.preventDefault();const c=t(i);s(c.px,c.py),(b=(u=w.current)==null?void 0:u.reverseBurst)==null||b.call(u),(M=(x=w.current)==null?void 0:x.start)==null||M.call(x)}),onWheel:m?void 0:(i=>{var c,u;(u=(c=w.current)==null?void 0:c.addScrollBoost)==null||u.call(c,i.deltaY*.003)}),onPointerDown:m?void 0:i=>{var u,b;l.current=i.pointerId;try{i.currentTarget.setPointerCapture(i.pointerId)}catch{}const c=t(i);(b=(u=w.current)==null?void 0:u.setPointer)==null||b.call(u,c.x,c.y,c.dx,c.dy)},onPointerMove:m?void 0:i=>{var u,b,x,M;if(l.current!=null&&i.pointerId!==l.current)return;const c=t(i);(b=(u=w.current)==null?void 0:u.setPointer)==null||b.call(u,c.x,c.y,c.dx,c.dy),(i.buttons&1)===1&&((M=(x=w.current)==null?void 0:x.drag)==null||M.call(x,c.dx))},onPointerUp:m?void 0:i=>{l.current!=null&&i.pointerId!==l.current||(l.current=null)},onPointerCancel:m?void 0:(()=>{l.current=null}),onMouseMove:m?void 0:i=>{var u,b;const c=t(i);(b=(u=w.current)==null?void 0:u.setPointer)==null||b.call(u,c.x,c.y,c.dx,c.dy)},onMouseLeave:m?void 0:(()=>{var i,c;l.current=null,C.current=null,(c=(i=w.current)==null?void 0:i.clearPointer)==null||c.call(i)}),onBlur:m?void 0:(()=>{var i,c;l.current=null,C.current=null,(c=(i=w.current)==null?void 0:i.clearPointer)==null||c.call(i)}),onKeyDown:m?void 0:(i=>{var c,u,b,x;(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),(u=(c=w.current)==null?void 0:c.boost)==null||u.call(c),(x=(b=w.current)==null?void 0:b.start)==null||x.call(b))}),children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),f.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),f.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),f.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),f.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),h.map(i=>f.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${i.x}px`,top:`${i.y}px`},"aria-hidden":!0},i.id)),f.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function Ze({label:p,clickLabel:m,previewRequested:y=!1}){const d=Je(),R=a.useRef(null),[w,I]=a.useState(!1),[l,C]=a.useState(0),g=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=a.useCallback(()=>{C(Date.now()),I(!0)},[]),v=a.useCallback(()=>{d.navigateToSectionWithId("contact")},[d]),h=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),k())},o=a.useMemo(()=>w?Ct({seed:`${l||Date.now()}:${p}`,reduceMotion:g}):"",[p,w,l,g]);return a.useEffect(()=>{let e=0,r=0;return y?(e=window.requestAnimationFrame(()=>{r=window.requestAnimationFrame(()=>{C(Date.now()),I(!0)})}),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)}):(I(!1),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)})},[y]),f.jsxs("div",{ref:R,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${w?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":w?"Kontakt preview":p,"aria-pressed":w,onClick:k,onKeyDown:h,children:[f.jsxs("div",{className:`article-web-art-tile-cta-preview ${w?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[w&&f.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:o,sandbox:"allow-scripts"},`${l}-${p}`),f.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!w&&f.jsx("div",{className:`loader ${g?"loader-reduce-motion":""}`,"aria-hidden":!0,children:f.jsxs("div",{className:"loader-inner",children:[f.jsx("div",{className:"loader-line-wrap",children:f.jsx("div",{className:"loader-line"})}),f.jsx("div",{className:"loader-line-wrap",children:f.jsx("div",{className:"loader-line"})}),f.jsx("div",{className:"loader-line-wrap",children:f.jsx("div",{className:"loader-line"})}),f.jsx("div",{className:"loader-line-wrap",children:f.jsx("div",{className:"loader-line"})}),f.jsx("div",{className:"loader-line-wrap",children:f.jsx("div",{className:"loader-line"})})]})}),f.jsxs("div",{className:`article-web-art-tile-cta-content ${w?"article-web-art-tile-cta-content-hidden":""}`,children:[f.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:p}),f.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:m})]}),w&&f.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),v()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),v())},children:"Kontakt"})]})}function er({readyId:p,locked:m=!1,onReady:y}){const d=a.useRef(null),R=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),w=a.useRef(!1),I=a.useRef(0),l=a.useRef(null),C=a.useRef(null),g=a.useRef(1),k=a.useRef(null),v=a.useRef(null),h=a.useRef(null),o=a.useRef([]);return a.useEffect(()=>{y==null||y(p)},[y,p]),a.useEffect(()=>{const e=d.current;if(!e)return;const r=N=>{const E=Math.max(0,Math.min(1,N));return E*E*(3-2*E)},t=()=>{if(o.current.length)return o.current.filter(A=>A.playState!=="idle");const N=e.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),E=[];for(const A of N){const D=A.getAnimations?A.getAnimations():[];for(const O of D)E.push(O)}return o.current=E,o.current},s=N=>{const E=Math.max(1,Math.min(5.2,Number(N)||1));g.current=E;const A=t();for(const D of A)D.playbackRate=D.animationName==="wiggle-end"?Math.min(E,2.6):E},n=()=>{v.current!=null&&cancelAnimationFrame(v.current),h.current!=null&&window.clearTimeout(h.current),v.current=null,h.current=null},i=()=>{n(),s(5.2),h.current=window.setTimeout(()=>{const N=g.current,E=performance.now(),A=320,D=()=>{const O=(performance.now()-E)/A,B=r(O);s(N+(1-N)*B),O<1?v.current=requestAnimationFrame(D):v.current=null};v.current=requestAnimationFrame(D),h.current=null},2e3)},c=()=>{var B;const N=l.current;if(w.current=!1,l.current=null,e.classList.remove("article-web-art-tile-goldfish-held"),C.current!=null&&cancelAnimationFrame(C.current),C.current=null,N!=null&&((B=e.hasPointerCapture)!=null&&B.call(e,N)))try{e.releasePointerCapture(N)}catch{}const E=g.current,A=360,D=performance.now();k.current!=null&&cancelAnimationFrame(k.current);const O=()=>{const F=(performance.now()-D)/A,U=r(F);s(E+(1-E)*U),F<1?k.current=requestAnimationFrame(O):k.current=null};k.current=requestAnimationFrame(O)},u=()=>{w.current&&c()},b=()=>{if(!w.current)return;const N=performance.now()-I.current,E=1.2+4*r(N/2400);s(E),C.current=requestAnimationFrame(b)},x=N=>{if(!(R||m)&&!(N.button!=null&&N.button!==0)&&!(w.current&&l.current!==N.pointerId)){n(),w.current=!0,I.current=performance.now(),l.current=N.pointerId,e.classList.add("article-web-art-tile-goldfish-held");try{e.setPointerCapture(N.pointerId)}catch{}k.current!=null&&(cancelAnimationFrame(k.current),k.current=null),C.current==null&&(C.current=requestAnimationFrame(b))}},M=N=>{if(l.current!==N.pointerId)return;const E=performance.now()-I.current;c(),E<220&&i()},S=N=>{l.current===N.pointerId&&u()},j=N=>{l.current===N.pointerId&&u()};return e.addEventListener("pointerdown",x),e.addEventListener("pointerup",M),e.addEventListener("pointercancel",S),e.addEventListener("lostpointercapture",j),()=>{e.removeEventListener("pointerdown",x),e.removeEventListener("pointerup",M),e.removeEventListener("pointercancel",S),e.removeEventListener("lostpointercapture",j),u(),n(),k.current!=null&&cancelAnimationFrame(k.current),k.current=null,o.current=[]}},[m,R]),a.useEffect(()=>{const e=d.current;e&&e.classList.toggle("article-web-art-tile-goldfish-locked",m)},[m]),f.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:d,role:"img","aria-label":"Goldfish animation tile",children:[f.jsx("div",{className:"fish-stage",children:f.jsx("div",{className:"fish-wrapper",children:f.jsx("div",{className:"fish-container",children:f.jsxs("div",{className:"fish-parts",children:[f.jsx("div",{className:"fish-body front"}),f.jsx("div",{className:"fish-body back"}),f.jsx("div",{className:"fish-back-bottom-fin front"}),f.jsx("div",{className:"fish-back-bottom-fin back"}),f.jsx("div",{className:"fish-back-fin"}),f.jsx("div",{className:"fish-front-bottom-fin front"}),f.jsx("div",{className:"fish-front-bottom-fin back"}),f.jsx("div",{className:"fish-top-fin"})]})})})}),f.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function tr({locked:p=!1}){const m=a.useRef(null),y=a.useRef([]),d=a.useRef(0),R=a.useRef(0),w=yt,I=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return a.useEffect(()=>{const l=m.current;if(!l)return;const C=y.current.filter(Boolean);if(!C.length)return;let g=!0,k=!1,v=null,h=null;const o=(x,M)=>{const S=(x-.5)*30;for(let j=0;j<C.length;j++){const N=C[j],E=j*18,A=j*8,D=(x-.5)*E,O=(M-.5)*A;N.style.transform=`translate3d(${D}px, ${O}px, 0) rotateY(${S}deg)`}},e=(x,M)=>{const S=Math.max(-.55,Math.min(.55,(x-.5)*1.1)),j=Math.max(-.35,Math.min(.35,(M-.5)*.7));o(.5+S,.5+j)},r=x=>{const M=l.getBoundingClientRect(),S=(x.clientX-M.left)/Math.max(1,M.width),j=(x.clientY-M.top)/Math.max(1,M.height);g=!0,R.current=performance.now()+650,e(Math.max(0,Math.min(1,S)),Math.max(0,Math.min(1,j)))},t=x=>{const M=l.getBoundingClientRect(),S=(x.clientX-M.left)/Math.max(1,M.width),j=(x.clientY-M.top)/Math.max(1,M.height);return{x:Math.max(0,Math.min(1,S)),y:Math.max(0,Math.min(1,j))}},s=x=>{if(x.pointerType==="mouse")return;k=!0,v=x.pointerId,g=!0,R.current=performance.now()+900;const M=t(x);e(M.x,M.y),!I&&h==null&&(h=requestAnimationFrame(b))},n=x=>{if(!k||v!=null&&x.pointerId!==v)return;g=!0,R.current=performance.now()+900;const M=t(x);e(M.x,M.y)},i=x=>{v!=null&&(x==null?void 0:x.pointerId)!=null&&x.pointerId!==v||(k=!1,v=null,g=!0,!I&&h==null&&(h=requestAnimationFrame(b)))},c=()=>{g=!0,!I&&h==null&&(h=requestAnimationFrame(b))},u=()=>{g=!0,!I&&h==null&&(h=requestAnimationFrame(b))},b=()=>{if(g){if(!I&&performance.now()>=R.current){d.current+=.008;const x=Math.sin(d.current)*.5+.5;e(x,.5)}h=requestAnimationFrame(b)}};return g=!p,l.addEventListener("mouseenter",c),l.addEventListener("mousemove",r),l.addEventListener("mouseleave",u),l.addEventListener("pointerdown",s),l.addEventListener("pointermove",n),l.addEventListener("pointerup",i),l.addEventListener("pointercancel",i),e(.5,.5),!I&&!p&&(h=requestAnimationFrame(b)),()=>{l.removeEventListener("mouseenter",c),l.removeEventListener("mousemove",r),l.removeEventListener("mouseleave",u),l.removeEventListener("pointerdown",s),l.removeEventListener("pointermove",n),l.removeEventListener("pointerup",i),l.removeEventListener("pointercancel",i),h!=null&&cancelAnimationFrame(h)}},[I]),f.jsxs("div",{ref:m,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[f.jsxs("div",{className:"patronus-card",children:[f.jsx("div",{className:"patronus-layer patronus-bg",ref:l=>{y.current[0]=l},children:f.jsx("img",{alt:"",src:w[0]})}),f.jsx("div",{className:"patronus-layer",ref:l=>{y.current[1]=l},children:f.jsx("img",{alt:"",src:w[1]})}),f.jsx("div",{className:"patronus-layer",ref:l=>{y.current[2]=l},children:f.jsx("img",{alt:"",src:w[2]})}),f.jsx("div",{className:"patronus-layer patronus-svg",ref:l=>{y.current[3]=l},dangerouslySetInnerHTML:{__html:ht}}),f.jsx("div",{className:"patronus-layer",ref:l=>{y.current[4]=l},children:f.jsx("img",{alt:"",src:w[3]})}),f.jsx("div",{className:"patronus-layer",ref:l=>{y.current[5]=l},children:f.jsx("img",{alt:"",src:w[4]})}),f.jsx("div",{className:"patronus-layer",ref:l=>{y.current[6]=l},children:f.jsx("img",{alt:"",src:w[5]})})]}),f.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{ar as default};
