const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/androidBackgroundEngine-B8Cq2xl0.js","assets/three-vm8gaJoa.js","assets/hourglassEngine-ARqfGTAI.js","assets/rolldown-runtime-CbXtAM7H.js","assets/physics-BZDnuuvL.js","assets/embroideryEngine-Dj8tyjYC.js","assets/swiper-D8bnRNt8.js","assets/swiper-CLFQvsl_.css","assets/threeTunnelEngine-Caj-Dg_r.js","assets/threePolygonDemo5Engine-uBhy1gSh.js","assets/prismFieldEngine-DKfBiTCD.js","assets/soupShaderEngine-CWSET0tn.js","assets/tardisWormholeEngine-BS0spwg9.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{s as t}from"./swiper-D8bnRNt8.js";import{t as n}from"./react-vendor-BygNPKvf.js";import{n as r}from"./LanguageProvider-CpZMAOvG.js";import{t as i}from"./preload-helper-BN5zhLjG.js";import{o as a,s as o}from"./index-C6xPz5sr.js";var s=e(t(),1),c=n(),l=[190,214,268,322,164,232,286,340];function u({slides:e,onChange:t,onPin:n,onUnpin:r,onReplacePinned:i,onWindowsSettled:a,pinnedIds:o=[],maxPinned:u=3,labels:d={},enabled:f=!0}){let[p,m]=(0,s.useState)(0),[h,g]=(0,s.useState)([0]),[_,v]=(0,s.useState)(`initial`),y=(0,s.useRef)(null),b=(0,s.useRef)(null),x=(0,s.useRef)(null),[S,C]=(0,s.useState)(null),w=(0,s.useRef)(a),T=(0,s.useRef)([]),E=(0,s.useRef)(null),[ee,D]=(0,s.useState)(1),O=e.length;w.current=a;let k=O?Math.min(p,O-1):0,A=e[k],te=O>1?(k+1)%O:null,j=O>1?(k-1+O)%O:null,M=o.map(t=>e.find(e=>e.id===t)).filter(e=>e&&e.id!==(A==null?void 0:A.id)),ne=!!(A&&o.includes(A.id)),re=!!(n&&(A==null?void 0:A.pinnable)!==!1&&(ne||o.length<u)),ie=new Map;for(let e=h.length-1;e>=0;e--){let t=h[e];ie.has(t)||ie.set(t,h.length-1-e)}if((0,s.useLayoutEffect)(()=>{let e=b.current;if(!e||!O)return;let t=()=>{var t,n;let r=e.clientWidth<=560||(t=(n=window).matchMedia)!=null&&(t=t.call(n,`(pointer: coarse)`))!=null&&t.matches?44:26,i=Math.max(1,Math.min(O,Math.floor((e.clientWidth+4)/r))),a=i;for(;a>Math.ceil(i/2)&&O%a!==0;)a--;O%a!==0&&(a=Math.ceil(O/Math.ceil(O/i))),D(a)},n=new ResizeObserver(t);return n.observe(e),t(),()=>n.disconnect()},[O]),(0,s.useEffect)(()=>()=>{for(let e of T.current)window.cancelAnimationFrame(e);E.current!==null&&window.clearTimeout(E.current)},[]),!O)return null;let N=e=>{x.current=e,C(e)},P=()=>{var e,t;for(let e of T.current)window.cancelAnimationFrame(e);if(T.current=[],E.current!==null&&window.clearTimeout(E.current),E.current=null,typeof window>`u`){var n;(n=w.current)==null||n.call(w);return}let r=(e=(t=window).matchMedia)!=null&&(e=e.call(t,`(prefers-reduced-motion: reduce)`))!=null&&e.matches?80:680,i=window.requestAnimationFrame(()=>{let e=window.requestAnimationFrame(()=>{T.current=[],E.current=window.setTimeout(()=>{var e;E.current=null,(e=w.current)==null||e.call(w)},r)});T.current=[e]});T.current=[i]},F=(n,{preserveInteractionTarget:r=!1}={})=>{f&&n!==null&&n!==k&&e[n]&&(v(n===te?`next`:n===j?`previous`:`jump`),m(n),g(e=>[...e,n].slice(-8)),r||N(e[n].id),t==null||t(n,e[n]))},I=t=>{if(!f||t===null||!e[t])return;let n=e[t],r=x.current||(A==null?void 0:A.id);if(r&&r!==(A==null?void 0:A.id)&&o.includes(r)){if(n.id===r)return;i==null||i(r,n,A==null?void 0:A.id),P(),g(e=>[...e,t].slice(-8)),N(n.id===(A==null?void 0:A.id)?A.id:n.id);return}if(t===k){N(n.id);return}F(t)},L=()=>{if(f&&n)for(let t=1;t<O;t++){let r=(k+t)%O;if(!(e[r].id===(A==null?void 0:A.id)||e[r].pinnable===!1||o.includes(e[r].id))){o.length<u?n(e[r].id):F(r),N(e[r].id),o.length<u&&P();return}}},R=e=>{y.current=null,f&&e.pointerType!==`mouse`&&e.isPrimary&&!e.target.closest(`.layered-card-carousel-pin, .layered-card-carousel-unpin, .article-web-art-gated-tile-pill, a, input, select, textarea`)&&(y.current={id:e.pointerId,x:e.clientX,y:e.clientY})},ae=e=>{let t=y.current;if(y.current=null,!t||t.id!==e.pointerId||!f)return;let n=e.clientX-t.x,r=e.clientY-t.y;Math.abs(n)<58||Math.abs(n)<Math.abs(r)*1.35||I(n>0?j:te)},z=()=>{if(A&&re){if(ne){r==null||r(A.id),P();return}n==null||n(A.id),P();for(let t=1;t<O;t++){let n=(k+t)%O;if(!(e[n].pinnable===!1||o.includes(e[n].id))){F(n,{preserveInteractionTarget:!0});break}}}},oe=(e,t)=>{var n;let r={ArrowLeft:(t-1+O)%O,ArrowRight:(t+1)%O,Home:0,End:O-1}[e.key];r!==void 0&&(e.preventDefault(),(n=e.currentTarget.parentElement.children[r])==null||n.focus(),I(r))},se=(e,t)=>{if(e.detail===0){var n;(n=e.currentTarget.closest(`.layered-card-carousel`))==null||(n=n.querySelector(`.layered-card-carousel-index-button.is-current`))==null||n.focus()}r==null||r(t),P(),x.current===t&&N((A==null?void 0:A.id)||null)},ce=(t,n)=>t===null?null:(0,c.jsxs)(`button`,{type:`button`,className:`layered-card-carousel-side layered-card-carousel-side-${n}`,style:{"--carousel-preview-hue":l[t%l.length]},onClick:()=>I(t),disabled:!f,"aria-label":`${n===`next`?d.next||`Next artwork`:d.previous||`Previous artwork`}: ${t+1}, ${e[t].label}`,children:[(0,c.jsx)(`span`,{className:`layered-card-carousel-side-number`,"aria-hidden":`true`,children:String(t+1).padStart(2,`0`)}),(0,c.jsx)(`span`,{className:`layered-card-carousel-side-label`,"aria-hidden":`true`,children:e[t].label})]});return(0,c.jsxs)(`div`,{className:`layered-card-carousel${M.length?` layered-card-carousel-multiview`:``}`,"aria-label":d.gallery||`Artwork gallery`,children:[(0,c.jsxs)(`div`,{className:`layered-card-carousel-workspace`,"data-view-count":M.length+1,children:[ce(j,`previous`),ce(te,`next`),[A,...M].map(t=>{let r=e.indexOf(t),i=t.id===A.id;return(0,c.jsxs)(`div`,{className:[i?`layered-card-carousel-current layered-card-carousel-current-${_}`:`layered-card-carousel-pinned`,i&&t.transition===`fade`?`layered-card-carousel-current-fade`:``,(S||(A==null?void 0:A.id))===t.id?`is-last-interacted`:``].filter(Boolean).join(` `),role:`group`,"aria-label":i?`${r+1} / ${O}: ${t.label}`:`${d.pinned||`Open artwork`}: ${t.label}`,onPointerDownCapture:()=>N(t.id),onFocusCapture:()=>N(t.id),onClickCapture:()=>N(t.id),onPointerDown:i?R:void 0,onPointerUp:i?ae:void 0,onPointerCancel:i?()=>{y.current=null}:void 0,children:[t.content,i&&f&&n&&t.pinnable!==!1&&(0,c.jsx)(`button`,{type:`button`,className:`layered-card-carousel-pin${ne?` is-pinned`:``}`,onClick:z,disabled:!re,"aria-label":ne?d.unpin||`Remove from simultaneous view`:re?d.pin||`Add to simultaneous view`:d.pinLimit||`Three extra artworks are already open`,title:ne?d.unpin||`Remove from simultaneous view`:re?d.pin||`Add to simultaneous view`:d.pinLimit||`Three extra artworks are already open`,children:(0,c.jsxs)(`svg`,{viewBox:`0 0 20 20`,"aria-hidden":`true`,focusable:`false`,children:[(0,c.jsx)(`rect`,{x:`3.5`,y:`3.5`,width:`13`,height:`13`,rx:`2`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`}),ne?(0,c.jsx)(`path`,{d:`M6.5 10h7`}):(0,c.jsx)(`path`,{d:`M6.5 10h7M10 6.5v7`})]})}),!i&&(0,c.jsx)(`button`,{type:`button`,className:`layered-card-carousel-unpin`,onClick:e=>se(e,t.id),"aria-label":`${d.unpin||`Remove from simultaneous view`}: ${t.label}`,children:(0,c.jsx)(`svg`,{viewBox:`0 0 20 20`,"aria-hidden":`true`,focusable:`false`,children:(0,c.jsx)(`path`,{d:`M5 5 15 15M15 5 5 15`})})})]},t.id)}),M.length===2&&n&&(0,c.jsxs)(`button`,{type:`button`,className:`layered-card-carousel-add-slot`,onClick:L,disabled:!f||!e.some(e=>e.id!==(A==null?void 0:A.id)&&e.pinnable!==!1&&!o.includes(e.id)),"aria-label":d.addNext||d.pin||`Add next artwork`,title:d.addNext||d.pin||`Add next artwork`,children:[(0,c.jsx)(`span`,{className:`layered-card-carousel-add-slot-icon`,"aria-hidden":`true`,children:(0,c.jsx)(`svg`,{viewBox:`0 0 24 24`,focusable:`false`,children:(0,c.jsx)(`path`,{d:`M12 5v14M5 12h14`})})}),(0,c.jsx)(`span`,{className:`layered-card-carousel-add-slot-label`,"aria-hidden":`true`,children:d.addNext||`Add artwork`})]})]}),(0,c.jsx)(`nav`,{ref:b,className:`layered-card-carousel-index`,style:{"--carousel-index-columns":ee},"aria-label":d.jump||`Choose artwork`,children:e.map((e,t)=>{let n=ie.get(t)??-1,r=n>0&&n<=5;return(0,c.jsx)(`button`,{type:`button`,className:`layered-card-carousel-index-button${t===k?` is-current`:``}${r?` is-recent`:``}`,style:{"--carousel-index-delay":`${Math.min(t,18)*20}ms`,...r?{"--carousel-trail-percent":`${Math.max(12,100-n*18)}%`}:{}},onClick:()=>I(t),onKeyDown:e=>oe(e,t),tabIndex:t===k?0:-1,disabled:!f,"aria-current":t===k?`true`:void 0,"aria-label":`${d.jumpTo||`Show artwork`} ${t+1}: ${e.label}`,children:t+1},e.id)})})]})}var d=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`,f=`function Mash(seed) {
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
`,p=[`#0000ff`,`#008100`,`#ff1300`,`#000083`,`#810500`,`#2a9494`,`#000000`,`#808080`];function m(e=9,t=9,n=10){let r=e*t,i=Math.max(1,Math.min(n,r-1)),a=new Set;for(;a.size<i;)a.add(Math.floor(Math.random()*r));let o=Array(r).fill(0);for(let n=0;n<r;n++){if(a.has(n)){o[n]=-1;continue}let r=n%t,i=Math.floor(n/t),s=0;for(let n=-1;n<=1;n++)for(let o=-1;o<=1;o++){if(o===0&&n===0)continue;let c=r+o,l=i+n;c<0||l<0||c>=t||l>=e||a.has(l*t+c)&&(s+=1)}o[n]=s}return{rows:e,cols:t,mineCount:i,mines:a,counts:o}}function h(e,t,n,r){let i=new Set(n),a=[e];for(;a.length>0;){let e=a.pop();if(e==null||i.has(e)||r.has(e)||t.mines.has(e)||(i.add(e),t.counts[e]!==0))continue;let n=e%t.cols,o=Math.floor(e/t.cols);for(let e=-1;e<=1;e++)for(let r=-1;r<=1;r++){if(r===0&&e===0)continue;let i=n+r,s=o+e;i<0||s<0||i>=t.cols||s>=t.rows||a.push(s*t.cols+i)}}return i}function g(e,t,n){let r=e.rows*e.cols-e.mineCount;if(t.size>=r)return!0;if(n.size!==e.mineCount)return!1;for(let t of e.mines)if(!n.has(t))return!1;return!0}function _(e,{timeoutMs:t=1200}={}){if(typeof window>`u`)return e(),()=>{};if(`requestIdleCallback`in window){let n=window.requestIdleCallback(()=>e(),{timeout:t});return()=>window.cancelIdleCallback(n)}let n=window.setTimeout(()=>e(),0);return()=>window.clearTimeout(n)}function v(e){var t,n,r,i;if(!e)return{width:1,height:1};let a=e.getBoundingClientRect(),o=(t=e.parentElement)==null||(n=t.getBoundingClientRect)==null?void 0:n.call(t),s=(o==null?void 0:o.width)||((r=e.parentElement)==null?void 0:r.clientWidth)||1,c=(o==null?void 0:o.height)||((i=e.parentElement)==null?void 0:i.clientHeight)||s,l=Math.max(1,Math.round(a.width||e.clientWidth||s||1));return{width:l,height:Math.max(1,Math.round(a.height||e.clientHeight||c||l||1))}}function y(e,t,n=1){var r,i,a;let{width:o,height:s}=v(e),c=typeof window<`u`&&((r=(i=window).matchMedia)==null||(r=r.call(i,`(pointer: coarse)`))==null?void 0:r.matches),l=Math.min(c?1:1.5,Math.max(1,Number(n)||1));if((o<32||s<32)&&typeof window<`u`){window.requestAnimationFrame(()=>{let n=v(e);if(n.width>=32&&n.height>=32){var r;t==null||(r=t.setSize)==null||r.call(t,n.width,n.height,l)}});return}t==null||(a=t.setSize)==null||a.call(t,o,s,l)}var b=248,x=460,S={PREVIEW:`preview`,EXPANDING:`expanding`,OPEN:`open`,COLLAPSING:`collapsing`};function C(){return typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}function w(e){if(!e)return b;let t=window.getComputedStyle(e).getPropertyValue(`--article-web-art-stage-preview-height`),n=Number.parseFloat(t);return Number.isFinite(n)&&n>0?Math.ceil(n):b}var T=6,E=[`/images/web_art/patronus/bg.png`,`/images/web_art/patronus/layer-1.png`,`/images/web_art/patronus/layer-2.png`,`/images/web_art/patronus/layer-4.png`,`/images/web_art/patronus/layer-5.png`,`/images/web_art/patronus/layer-6.png`];function ee(){return typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(pointer: coarse), (max-width: 767px)`).matches}function D(e){let t=new Set(e);if(!ee())return t;for(;t.size>T;)t.delete(t.values().next().value);return t}function O(e){if(!ee())return new Set(e);let t=new Set;for(let n of e){if(t.size>=T)break;t.add(n)}return t}function k(e,t){if(t.size===0)return!1;for(let n of t)if(!e.has(n))return!1;return!0}function A(e){return`Web art ${String(e||`tile`).toLowerCase()} tile loading`}function te({seed:e,reduceMotion:t}){let n=JSON.stringify(f.split(`<\/script>`).join(`<\\/script>`)),r=JSON.stringify(e);return`<!doctype html>
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
</html>`}function j(e){return Array.isArray(e)?e.map((e,t)=>{let n=e!=null&&e.tone?` article-web-art-intro-guide-fragment-${e.tone}`:``;return(0,c.jsx)(`span`,{className:`article-web-art-intro-guide-fragment${n}`,children:e==null?void 0:e.text},`${(e==null?void 0:e.text)||`fragment`}-${t}`)}):e}function M({dataWrapper:e,id:t}){var n;let i=r(),l=a(),d=`${e.uniqueId}-ambient-trace`,f=`${e.uniqueId}-ambient-hex`,p=`${e.uniqueId}-ambient-plop`,m=`${e.uniqueId}-ambient-julia`,h=`${e.uniqueId}-ambient-mines`,g=`${e.uniqueId}-ambient-rings`,_=`${e.uniqueId}-ambient-prism`,v=`${e.uniqueId}-ambient-rope`,y=`${e.uniqueId}-ambient-soup`,b=`${e.uniqueId}-ambient-tardis`,[T,E]=(0,s.useState)(null),[A,te]=(0,s.useState)(!0),j=e.settings.webArtPresentation!==`grid`,M=(0,s.useMemo)(()=>e.orderedItems,[e.orderedItems]),N=(0,s.useMemo)(()=>{let e=[4,5,3,6,1,2,7,8,9,10,11,12,13,14,15],t=new Map(M.map(e=>[Number(e==null?void 0:e.id),e])),n=[];for(let r of e){let e=t.get(r);e&&n.push(e)}for(let t of M){if(!t)continue;let r=Number(t==null?void 0:t.id);e.includes(r)||n.push(t)}return n},[M]),P=(0,s.useRef)(null),F=(0,s.useRef)(null),I=(0,s.useRef)(S.PREVIEW),L=(0,s.useRef)([]),R=(0,s.useRef)(null),ae=(0,s.useRef)(new Set),z=(0,s.useRef)(null),[oe,se]=(0,s.useState)(S.PREVIEW),[ce,B]=(0,s.useState)(null),[V,le]=(0,s.useState)(!1),ue=(0,s.useRef)(new Set),H=(0,s.useRef)(new Map),[ye,be]=(0,s.useState)(0),[Ee,De]=(0,s.useState)(-1),[U,W]=(0,s.useState)(()=>new Set),[Oe,G]=(0,s.useState)(()=>new Set),[ke,Ae]=(0,s.useState)([]),K=(0,s.useRef)([]),[je,q]=(0,s.useState)(()=>new Set),J=(0,s.useRef)(new Set),[Me,Ne]=(0,s.useState)(null),[Pe,Fe]=(0,s.useState)(!1),Ie=(0,s.useMemo)(()=>{let e=N.map(e=>e==null?void 0:e.uniqueId).filter(Boolean);return e.push(d,f,p,m,h,_,g,v,y,b,`ambient-goldfish`,`ambient-patronus`),new Set(e)},[f,m,h,p,_,g,v,y,b,d,N]),Le=(0,s.useMemo)(()=>Array.from(Oe).filter(e=>e!==`ambient-goldfish`&&e!==`ambient-patronus`),[Oe]),Y=A,Re=i.selectedLanguageId||`en`;(0,s.useEffect)(()=>{ae.current=U},[U]);let X=(0,s.useCallback)(e=>{I.current=e,se(e)},[]),Z=(0,s.useCallback)(()=>{if(typeof window<`u`){for(let e of L.current)window.cancelAnimationFrame(e);L.current=[],R.current!==null&&(window.clearTimeout(R.current),R.current=null)}},[]),ze=i.getString(`send_yours`);typeof ze==`string`&&ze.startsWith(`locale:`)&&(ze={en:`Send yours!`,de:`Sende deine!`,hr:`Pošalji svoju!`,tr:`Sen de gönder!`}[Re]||`Send yours!`);let Be=i.getString(`click`);typeof Be==`string`&&Be.startsWith(`locale:`)&&(Be={en:`Click`,de:`Klicken`,hr:`Klikni`,tr:`Tıkla`}[Re]||`Click`);let Ve={en:{title:`Doors of the world behind an amazing art gallery.`,guide:{eyebrow:`How to explore`,lines:[[{text:`Enter the gallery`,tone:`hero`},{text:` and browse the `},{text:`cards`,tone:`glow`},{text:` at your own risk!`,tone:`soft`}],[{text:`Click, hold, or drag`,tone:`action`},{text:` inside a card to have `},{text:`some fun.`,tone:`glow`}],[{text:`All pieces are unique, and beautiful.`,tone:`hero`},{text:` `},{text:`Contact me to send or credit an idea.`,tone:`soft`}]]},button:`Enter`,preparing:`Preparing...`},de:{title:`Türen der Welt hinter einer erstaunlichen Kunstgalerie.`,guide:{eyebrow:`So funktioniert es`,lines:[`Betritt die Galerie und schau dir die Karten in Ruhe an.`,`Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.`,`Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden.`]},button:`Eintreten`,preparing:`Wird vorbereitet...`},hr:{title:`Vrata svijeta iza nevjerojatne umjetničke galerije.`,guide:{eyebrow:`Kako istraživati`,lines:[`Uđi u galeriju i istražuj kartice svojim tempom.`,`Klikni, dodirni ili pritisni karticu da otkriješ što skriva.`,`Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme.`]},button:`Uđi`,preparing:`Priprema se...`},tr:{title:`Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.`,guide:{eyebrow:`Nasıl gezilir`,lines:[`Galeriye girin ve kartları kendi temponuzda inceleyin.`,`İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.`,`Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir.`]},button:`Gir`,preparing:`Hazırlanıyor...`}}[Re]||{title:`Doors of the world behind an amazing art gallery.`,guide:{eyebrow:`How to explore`,lines:[[{text:`Enter the gallery`,tone:`hero`},{text:` and browse the `},{text:`cards`,tone:`glow`},{text:` at your own risk!`,tone:`soft`}],[{text:`Click, hold, or drag`,tone:`action`},{text:` inside a card to have `},{text:`some fun.`,tone:`glow`}],[{text:`All pieces are unique, and beautiful.`,tone:`hero`},{text:` `},{text:`Contact me to send or credit an idea.`,tone:`soft`}]]},button:`Enter`,preparing:`Preparing...`},Q=(0,s.useCallback)(e=>{if(!e||ue.current.has(e))return;ue.current.add(e);let t=H.current.get(e);t!=null&&(window.clearTimeout(t),H.current.delete(e)),be(ue.current.size)},[]),He=(0,s.useCallback)(e=>{e&&G(t=>{if(t.has(e))return t;let n=new Set(t);return n.add(e),D(n)})},[]),Ue=(0,s.useCallback)(()=>{W(e=>e.size?new Set:e),G(e=>e.size?new Set:e),Fe(!1)},[]),We=(0,s.useCallback)(()=>{for(let e of H.current.values())window.clearTimeout(e);H.current=new Map,ue.current=new Set,be(0),De(-1),le(!1),W(new Set),G(new Set),K.current=[],Ae([]),J.current=new Set,q(new Set),Ne(null),Fe(!1)},[]),Ge=(0,s.useCallback)(()=>{Z(),B(null),X(S.OPEN)},[Z,X]),Ke=(0,s.useCallback)(()=>{Z(),We(),B(null),X(S.PREVIEW)},[Z,We,X]),qe=(0,s.useCallback)(e=>{typeof window<`u`&&(R.current!==null&&window.clearTimeout(R.current),R.current=window.setTimeout(()=>{R.current=null,I.current===e&&(e===S.EXPANDING?Ge():e===S.COLLAPSING&&Ke())},x))},[Ke,Ge]),Je=(0,s.useCallback)(()=>{let e=O(Ie);G(e),W(new Set(e)),Fe(!ee())},[Ie]),Ye=(0,s.useCallback)(({openAll:e=!1}={})=>{Z();let t=C(),n=F.current,r=w(n);if(t?(B(null),X(S.OPEN)):(B(Math.max(r,Math.ceil((n==null?void 0:n.offsetHeight)||r))),X(S.EXPANDING)),te(!1),le(!0),De(N.length-1),j){let e=m;K.current=[],Ae([]),J.current=new Set,q(new Set),Ne(e||null),W(new Set(e?[e]:[])),G(new Set(e?[e]:[])),Fe(!1)}else e?Je():(W(new Set),G(new Set),Fe(!1));if(t||typeof window>`u`)return;let i=window.requestAnimationFrame(()=>{let e=window.requestAnimationFrame(()=>{let e=F.current,t=w(e),n=Math.max(t,Math.ceil((e==null?void 0:e.scrollHeight)||(e==null?void 0:e.offsetHeight)||t));B(n),qe(S.EXPANDING)});L.current.push(e)});L.current.push(i)},[m,Z,N,Je,qe,X,j]);(0,s.useEffect)(()=>{var t;if(typeof window>`u`||!l||((t=l.targetSection)==null?void 0:t.id)!==e.sectionId||l.transitionStatus!==`transition_status_none`)return;let n=window.__pendingSectionAction;if(n&&n.action===`enter`&&n.sectionId===e.sectionId&&!(n.targetArticleId&&n.targetArticleId!==e.uniqueId)){if(Date.now()-(n.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,Ye({openAll:!0})}},[e.uniqueId,e.sectionId,l==null||(n=l.targetSection)==null?void 0:n.id,l==null?void 0:l.transitionStatus,Ye]);let Xe=(0,s.useCallback)(e=>{e&&(He(e),W(t=>{if(t.has(e))return t;let n=new Set(t);return n.add(e),D(n)}))},[He]),Ze=(0,s.useCallback)(e=>{e&&(W(t=>{if(!t.has(e))return t;let n=new Set(t);return n.delete(e),n}),G(t=>{if(!t.has(e))return t;let n=new Set(t);return n.delete(e),n}))},[]),Qe=k(U,O(Ie)),$e=(0,s.useCallback)(()=>{let e=O(Ie);if(k(U,e)){Ue();return}Je()},[Ie,Ue,Je,U]);(0,s.useEffect)(()=>{if(typeof window>`u`||!window.matchMedia||j||A||!U.size||!window.matchMedia(`(hover: hover) and (pointer: fine)`).matches)return;let e=()=>{z.current!=null&&(window.clearTimeout(z.current),z.current=null)},t=()=>{e(),z.current=window.setTimeout(()=>{z.current=null,ae.current.size&&Ue()},180)},n=()=>t(),r=()=>e(),i=()=>{document.hidden?t():e()};return window.addEventListener(`blur`,n),window.addEventListener(`focus`,r),document.addEventListener(`visibilitychange`,i),()=>{e(),window.removeEventListener(`blur`,n),window.removeEventListener(`focus`,r),document.removeEventListener(`visibilitychange`,i)}},[A,U,Ue,j]);let et=(0,s.useCallback)(()=>{if(Z(),te(!0),C()){We(),B(null),X(S.PREVIEW);return}let e=F.current,t=w(e),n=Math.max(t,Math.ceil((e==null?void 0:e.offsetHeight)||(e==null?void 0:e.scrollHeight)||t));if(B(n),X(S.COLLAPSING),typeof window>`u`)return;let r=window.requestAnimationFrame(()=>{let e=w(F.current);B(e),qe(S.COLLAPSING)});L.current.push(r)},[Z,We,qe,X]),tt=(0,s.useCallback)(e=>{e.target===e.currentTarget&&e.propertyName===`height`&&(I.current===S.EXPANDING?Ge():I.current===S.COLLAPSING&&Ke())},[Ke,Ge]),nt=(e,t)=>{let n=Number(e==null?void 0:e.id);return n===1?`Hover`:n===2?`Wave`:n===3?`3D`:n===4?`Poly`:n===5?`Click`:n===6?`Orbit`:n===7?`Spin`:n===8?`Shape`:n===9?`Hourglass`:n===10?`Noice`:n===11?`Distance`:n===12?`Android`:n===13?`Pulse`:n===14?`Bars`:n===15?`Deep`:String(t+1)},rt=N.map((e,t)=>{if(!V)return(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art tile ${t+1} loading`},e.uniqueId);let n=e.uniqueId,r=U.has(n),i=je.has(n),a=Oe.has(n)||r&&!i;return(0,c.jsx)(re,{label:nt(e,t),isOpen:r,isStaging:i,onToggle:()=>{i||(r?Ze(n):Xe(n))},shouldRender:a,children:a&&(0,c.jsx)(ie,{itemWrapper:e,index:t,locked:Y||!r,activate:t<=Ee,onReady:Q})},n)}),it=[{key:`ambient-trace`,tileId:d,label:`Trace`,render:e=>(0,c.jsx)(de,{readyId:d,locked:Y||!e,onReady:Q})},{key:`ambient-hex`,tileId:f,label:`Hex`,render:e=>(0,c.jsx)(fe,{readyId:f,locked:Y||!e,onReady:Q})},{key:`ambient-plop`,tileId:p,label:`Plop`,render:e=>(0,c.jsx)(pe,{readyId:p,locked:Y||!e,onReady:Q})},{key:`ambient-julia`,tileId:m,label:`Julia`,render:e=>(0,c.jsx)(me,{readyId:m,locked:Y||!e,onReady:Q})},{key:`ambient-mines`,tileId:h,label:`Bomb`,render:e=>(0,c.jsx)(he,{readyId:h,locked:Y||!e,onReady:Q})},{key:`ambient-rings`,tileId:g,label:`Fall`,render:e=>(0,c.jsx)(ge,{readyId:g,locked:Y||!e,onReady:Q})},{key:`ambient-prism`,tileId:_,label:`Prism`,render:e=>(0,c.jsx)(_e,{readyId:_,locked:Y||!e,onReady:Q})},{key:`ambient-rope`,tileId:v,label:`Rope`,render:e=>(0,c.jsx)(ve,{readyId:v,locked:Y||!e,onReady:Q})},{key:`ambient-soup`,tileId:y,label:`Soup`,render:e=>(0,c.jsx)(xe,{readyId:y,locked:Y||!e,onReady:Q})},{key:`ambient-tardis`,tileId:b,label:`Tardis`,render:e=>(0,c.jsx)(Se,{readyId:b,locked:Y||!e,onReady:Q})},{key:`ambient-goldfish`,tileId:`ambient-goldfish`,label:`Fish`,render:e=>(0,c.jsx)(we,{readyId:`ambient-goldfish`,locked:Y||!e,onReady:Q})},{key:`ambient-patronus`,tileId:`ambient-patronus`,label:`Patronus`,render:e=>(0,c.jsx)(Te,{locked:Y||!e})}],at=V?it.map(({key:e,tileId:t,label:n,render:r})=>{let i=U.has(t),a=je.has(e),o=Oe.has(t)||i&&!a;return(0,c.jsx)(re,{label:n,isOpen:i,isStaging:a,onToggle:()=>{a||(i?Ze(t):Xe(t))},shouldRender:o,children:o&&r(i)},e)}):[(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art trace tile loading`},`ambient-trace`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art hex tile loading`},`ambient-hex`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art plop tile loading`},`ambient-plop`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art julia tile loading`},`ambient-julia`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art mines tile loading`},`ambient-mines`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art rings tile loading`},`ambient-rings`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art prism tile loading`},`ambient-prism`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art rope tile loading`},`ambient-rope`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art soup tile loading`},`ambient-soup`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":`Web art tardis tile loading`},`ambient-tardis`)],$=[...N.map((e,t)=>({id:e.uniqueId,tileId:e.uniqueId,label:nt(e,t),transition:nt(e,t)===`Wave`?`fade`:void 0,content:rt[t]})),...it.slice(0,at.length).map(({key:e,tileId:t,label:n},r)=>({id:e,tileId:t,label:n,content:at[r]})),...V?[{id:`send-yours`,tileId:null,pinnable:!1,label:ze,content:(0,c.jsx)(Ce,{label:ze,clickLabel:Be,previewRequested:Pe})}]:[]],ot=(e,t)=>{let n=$.findIndex(({label:t})=>t===e),r=$.findIndex(({label:e})=>e===t);if(n<0||r<0)return;let i=$[n];$[n]=$[r],$[r]=i};ot(`Wave`,`Julia`),ot(`Julia`,`Poly`),ot(`Plop`,`Click`);let st={en:{gallery:`Web art gallery`,next:`Next artwork`,previous:`Previous artwork`,last:`Last viewed artwork`,jump:`Jump to artwork`,jumpTo:`Show artwork`,pin:`Open alongside current artwork`,unpin:`Close extra window`,pinLimit:`Three extra artworks are already open`,pinned:`Extra artwork`,addNext:`Add artwork`},de:{gallery:`Webkunst-Galerie`,next:`Nächstes Werk`,previous:`Vorheriges Werk`,last:`Zuletzt angesehenes Werk`,jump:`Werk auswählen`,jumpTo:`Werk anzeigen`,pin:`Neben dem aktuellen Werk öffnen`,unpin:`Zusätzliches Fenster schließen`,pinLimit:`Drei zusätzliche Werke sind bereits offen`,pinned:`Zusätzliches Werk`,addNext:`Werk hinzufügen`},hr:{gallery:`Galerija web umjetnosti`,next:`Sljedeće djelo`,previous:`Prethodno djelo`,last:`Zadnje pregledano djelo`,jump:`Odaberi djelo`,jumpTo:`Prikaži djelo`,pin:`Otvori uz trenutno djelo`,unpin:`Zatvori dodatni prozor`,pinLimit:`Već su otvorena tri dodatna djela`,pinned:`Dodatno djelo`,addNext:`Dodaj djelo`},tr:{gallery:`Web sanatı galerisi`,next:`Sonraki eser`,previous:`Önceki eser`,last:`Son görüntülenen eser`,jump:`Eser seç`,jumpTo:`Eseri göster`,pin:`Geçerli eserin yanında aç`,unpin:`Ek pencereyi kapat`,pinLimit:`Üç ek eser zaten açık`,pinned:`Ek eser`,addNext:`Eser ekle`}}[Re];return(0,s.useEffect)(()=>{if(!j||A||!V)return;let e=new Set([...ke.filter(({id:e})=>!je.has(e)).map(({tileId:e})=>e),Me].filter(Boolean));W(e),G(e);for(let[t,n]of H.current)e.has(t)||(window.clearTimeout(n),H.current.delete(t))},[Me,ke,V,A,je,j]),(0,s.useEffect)(()=>{Z(),B(null),X(S.PREVIEW),te(!0),We()},[Z,e.uniqueId,We,X]),(0,s.useEffect)(()=>()=>{Z();for(let e of H.current.values())window.clearTimeout(e);H.current.clear()},[Z]),(0,s.useEffect)(()=>{V&&De(N.length-1)},[V,N.length]),(0,s.useEffect)(()=>{if(V)for(let e of Le){if(!e||ue.current.has(e)||H.current.has(e))continue;let t=window.setTimeout(()=>{Q(e)},12e3);H.current.set(e,t)}},[V,Le,Q]),(0,c.jsx)(o,{id:e.uniqueId,type:o.Types.SPACING_DEFAULT,dataWrapper:e,className:`article-web-art`,selectedItemCategoryId:T,setSelectedItemCategoryId:E,children:(0,c.jsxs)(`div`,{className:`article-web-art-shell`,children:[(0,c.jsx)(ne,{guide:Ve.guide,buttonLabel:A?Ve.button:`hide`,hidden:!A,onEnter:A?Ye:et,secondaryButtonLabel:!A&&!j?`promaja`:null,onSecondaryAction:!A&&!j?$e:null,secondaryPressed:Qe}),(0,c.jsx)(`div`,{ref:F,className:[`article-web-art-stage`,j?`article-web-art-stage-carousel`:``,A?`article-web-art-stage-preview`:``,ce===null?``:`article-web-art-stage-measured`,`article-web-art-stage-${oe}`].filter(Boolean).join(` `),style:ce===null?void 0:{"--article-web-art-stage-height":`${ce}px`},onTransitionEnd:tt,"aria-hidden":A,inert:A||void 0,children:j?(0,c.jsx)(u,{slides:$,labels:st,enabled:!A,pinnedIds:ke.map(({id:e})=>e),onChange:(e,t)=>{let n=new Set([...K.current.filter(({id:e})=>!J.current.has(e)).map(({tileId:e})=>e),t.tileId].filter(Boolean));for(let[e,t]of H.current)n.has(e)||(window.clearTimeout(t),H.current.delete(e));Ne(t.tileId),W(n),G(n),Fe(!1)},onPin:e=>{let t=$.find(({id:t})=>t===e);if(!(t!=null&&t.tileId))return;let n=K.current;if(n.some(({id:t})=>t===e)||n.length>=3)return;let r=[...n,{id:e,tileId:t.tileId}],i=new Set(J.current);i.add(e),J.current=i,q(i),K.current=r,Ae(r)},onUnpin:e=>{let t=K.current.filter(({id:t})=>t!==e);if(t.length===K.current.length)return;let n=new Set(J.current);n.delete(e),J.current=n,q(n),K.current=t,Ae(t)},onReplacePinned:(e,t,n)=>{let r=K.current,i=r.findIndex(({id:t})=>t===e);if(i<0||!t)return;let a=[...r],o=a.findIndex(({id:e})=>e===t.id);if(t.id===n){a.splice(i,1);let t=new Set(J.current);t.delete(e),J.current=t,q(t)}else if(o>=0)[a[i],a[o]]=[a[o],a[i]];else{a[i]={id:t.id,tileId:t.tileId};let n=new Set(J.current);n.delete(e),n.add(t.id),J.current=n,q(n)}K.current=a,Ae(a);let s=new Set([...a.map(({tileId:e})=>e),Me].filter(Boolean));for(let[e,t]of H.current)s.has(e)||(window.clearTimeout(t),H.current.delete(e));W(s),G(s),t.id===n&&Fe(!1)},onWindowsSettled:()=>{if(!J.current.size)return;J.current=new Set,q(new Set);let e=new Set([...K.current.map(({tileId:e})=>e),Me].filter(Boolean));for(let[t,n]of H.current)e.has(t)||(window.clearTimeout(n),H.current.delete(t));W(e),G(e)}},A?`preview`:`open`):(0,c.jsxs)(`div`,{className:`article-web-art-items ${Y?`article-web-art-items-locked`:``}`,ref:P,"aria-busy":A,children:[rt,at,V&&(0,c.jsx)(Ce,{label:ze,clickLabel:Be,previewRequested:Pe})]})})]})})}function ne({guide:e,buttonLabel:t,hidden:n,onEnter:r,secondaryButtonLabel:i=null,onSecondaryAction:a=null,secondaryPressed:o=!1}){return(0,c.jsx)(`div`,{className:`article-web-art-intro-cover ${n?`article-web-art-intro-cover-hidden`:`article-web-art-intro-cover-open`}`,children:(0,c.jsx)(`div`,{className:`article-web-art-intro-cover-inner`,children:(0,c.jsx)(`div`,{className:`article-web-art-intro-cover-actions`,children:(0,c.jsx)(`div`,{className:`article-web-art-intro-guide ${n?`article-web-art-intro-guide-hidden`:`article-web-art-intro-guide-open`}`,children:(0,c.jsx)(`div`,{className:`article-web-art-intro-guide-inner`,children:(0,c.jsxs)(`div`,{className:`article-web-art-intro-guide-top-row`,children:[(0,c.jsx)(`div`,{className:`article-web-art-intro-guide-lines`,children:e.lines.slice(1).map((e,t)=>(0,c.jsx)(`p`,{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${t+2}`,children:j(e)},Array.isArray(e)?e.map(e=>e==null?void 0:e.text).join(``):e))}),(0,c.jsxs)(`div`,{className:`article-web-art-intro-cover-buttons`,children:[i?(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${o?`article-web-art-intro-cover-button-secondary-active`:``}`,onClick:a||void 0,"aria-pressed":o,"aria-label":i,children:i}):null,(0,c.jsxs)(`button`,{type:`button`,className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-primary`,onClick:r,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),r())},"aria-label":t,children:[(0,c.jsx)(`span`,{className:`article-web-art-intro-glass-layer article-web-art-intro-glass-layer-blur`,"aria-hidden":`true`}),(0,c.jsx)(`span`,{className:`article-web-art-intro-glass-layer article-web-art-intro-glass-layer-rim`,"aria-hidden":`true`}),(0,c.jsx)(`span`,{className:`article-web-art-intro-cover-button-text`,children:t})]})]})]})})})})})})}function re({label:e,isOpen:t,isStaging:n=!1,onToggle:r,shouldRender:i=!0,children:a}){let o=(0,s.useCallback)(e=>{var i,a;t||n||e.defaultPrevented||(i=(a=e.target).closest)!=null&&i.call(a,`button`)||r==null||r()},[t,n,r]);return(0,c.jsxs)(`div`,{className:`article-web-art-gated-tile ${t?`article-web-art-gated-tile-open`:`article-web-art-gated-tile-closed`}`,"aria-busy":n||void 0,onClick:t?void 0:o,children:[i?a:(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-placeholder`,"aria-label":A(e)}),(0,c.jsx)(`div`,{className:`article-web-art-gated-tile-sheet`,"aria-hidden":!0}),(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-gated-tile-pill ${t?`article-web-art-gated-tile-pill-open`:`article-web-art-gated-tile-pill-closed`}`,disabled:n,onClick:r,"aria-label":`${t?`Hide`:`Show`} ${e}`,children:e})]})}function ie({itemWrapper:e,index:t,activate:n,locked:r,onReady:i}){return Number(e.id)===1?(0,c.jsx)(ce,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===2?(0,c.jsx)(B,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===3?(0,c.jsx)(V,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===4?(0,c.jsx)(le,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===6?(0,c.jsx)(ue,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===7?(0,c.jsx)(F,{itemWrapper:e,locked:r,onReady:i}):Number(e.id)===8?(0,c.jsx)(L,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===9?(0,c.jsx)(R,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===10?(0,c.jsx)(ae,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===11?(0,c.jsx)(N,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===12?(0,c.jsx)(P,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===13?(0,c.jsx)(se,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===14?(0,c.jsx)(I,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):Number(e.id)===15?(0,c.jsx)(z,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i}):(0,c.jsx)(oe,{itemWrapper:e,index:t,activate:n,locked:r,onReady:i})}function N({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!1),f=(0,s.useRef)(!0),p=(0,s.useRef)(null),m=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),h=(0,s.useMemo)(()=>({seed:54013+(Number(e.id)||11)*7331,reduceMotion:m}),[e.id,m]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,s=l.current;if(!t||!s)return;let c=!1,p=null,m=null,g=null,v=()=>{d.current||(d.current=!0,a==null||a(e.uniqueId))},b=_(async()=>{try{var e,n;let a=await i(()=>import(`./distanceFieldEngine-BympYK9O.js`),[]);if(c)return;p=a.createDistanceFieldEngine(s,h),u.current=p;let o=()=>y(t,p,Math.min(1.5,window.devicePixelRatio||1));o(),(e=p.renderStatic)==null||e.call(p),r||(n=p.start)==null||n.call(p),v(),m=new ResizeObserver(()=>{o()}),m.observe(t),`IntersectionObserver`in window&&(g=new IntersectionObserver(e=>{for(let o of e){var t,n;if(f.current=!!o.isIntersecting,r){var i,a;(i=p.setHoverActive)==null||i.call(p,!1),(a=p.stop)==null||a.call(p);continue}f.current?(t=p.start)==null||t.call(p):(n=p.stop)==null||n.call(p)}},{threshold:.25}),g.observe(t))}catch{v()}},{timeoutMs:220});return()=>{var e;c=!0,b==null||b(),g==null||g.disconnect(),m==null||m.disconnect(),p==null||(e=p.destroy)==null||e.call(p),u.current=null}},[n,h,e.uniqueId,r,a]),(0,s.useEffect)(()=>{var e;let t=u.current;if(t){if(r){var n,i,a;(n=t.setHoverActive)==null||n.call(t,!1),(i=t.clearPointer)==null||i.call(t),(a=t.stop)==null||a.call(t);return}f.current&&((e=t.start)==null||e.call(t))}},[r]);let g=e=>{let t=o.current;if(!t)return{x:.5,y:.5};let n=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(e.clientY-n.top)/Math.max(1,n.height)))}};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Distance web art tile ${t+1}`,disabled:r,onPointerEnter:r?void 0:(()=>{var e,t,n,r;(e=u.current)==null||(t=e.setHoverActive)==null||t.call(e,!0),(n=u.current)==null||(r=n.start)==null||r.call(n)}),onPointerMove:r?void 0:(e=>{var t,n,r,i;let a=g(e);(t=u.current)==null||(n=t.setHoverActive)==null||n.call(t,!0),(r=u.current)==null||(i=r.setPointer)==null||i.call(r,a.x,a.y)}),onPointerLeave:r?void 0:(()=>{var e,t,n,r;p.current=null,(e=u.current)==null||(t=e.setHoverActive)==null||t.call(e,!1),(n=u.current)==null||(r=n.clearPointer)==null||r.call(n)}),onPointerDown:r?void 0:(e=>{var t,n,r,i,a,o;if(e.button!=null&&e.button!==0)return;p.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let s=g(e);(t=u.current)==null||(n=t.setHoverActive)==null||n.call(t,!0),(r=u.current)==null||(i=r.setPointer)==null||i.call(r,s.x,s.y),(a=u.current)==null||(o=a.boostPopulation)==null||o.call(a)}),onPointerUp:r?void 0:(e=>{(p.current==null||e.pointerId===p.current)&&(p.current=null)}),onPointerCancel:r?void 0:(()=>{var e,t,n,r;p.current=null,(e=u.current)==null||(t=e.setHoverActive)==null||t.call(e,!1),(n=u.current)==null||(r=n.clearPointer)==null||r.call(n)}),onFocus:r?void 0:(()=>{var e,t,n,r;(e=u.current)==null||(t=e.setHoverActive)==null||t.call(e,!0),(n=u.current)==null||(r=n.start)==null||r.call(n)}),onBlur:r?void 0:(()=>{var e,t,n,r;p.current=null,(e=u.current)==null||(t=e.setHoverActive)==null||t.call(e,!1),(n=u.current)==null||(r=n.clearPointer)==null||r.call(n)}),onKeyDown:r?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n;e.preventDefault(),(t=u.current)==null||(n=t.boostPopulation)==null||n.call(t)}}),children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Distance`})]})}function P({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(null),f=(0,s.useRef)(null),p=(0,s.useRef)(!1),m=(0,s.useRef)(!0),h=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,s=l.current,c=u.current;if(!t||!s||!c)return;let g=!1,v=null,b=null,x=null,S=null,C=()=>{p.current||(p.current=!0,a==null||a(e.uniqueId))},w=_(async()=>{try{var e,n,a,o;let l=await i(()=>import(`./androidBackgroundEngine-B8Cq2xl0.js`),__vite__mapDeps([0,1])),u=await i(()=>import(`./androidRobotEngine-Dw3cHeAy.js`),[]);if(g)return;v=l.createAndroidBackgroundEngine(s,{reduceMotion:h}),d.current=v,b=u.createAndroidRobotEngine(c,{reduceMotion:h}),f.current=b;let p=()=>{let e=Math.min(1.5,window.devicePixelRatio||1);y(t,v,e),y(t,b,e)};p(),(e=v.renderStatic)==null||e.call(v),(n=b.renderStatic)==null||n.call(b),r||(a=v.start)==null||a.call(v),r||(o=b.start)==null||o.call(b),C(),x=new ResizeObserver(()=>{p()}),x.observe(t),`IntersectionObserver`in window&&(S=new IntersectionObserver(e=>{for(let c of e){if(m.current=!!c.isIntersecting,r){var t,n;(t=v.stop)==null||t.call(v),(n=b.stop)==null||n.call(b);continue}if(m.current){var i,a;(i=v.start)==null||i.call(v),(a=b.start)==null||a.call(b)}else{var o,s;(o=v.stop)==null||o.call(v),(s=b.stop)==null||s.call(b)}}},{threshold:.2}),S.observe(t))}catch{C()}},{timeoutMs:220});return()=>{var e,t;g=!0,w==null||w(),S==null||S.disconnect(),x==null||x.disconnect(),v==null||(e=v.destroy)==null||e.call(v),b==null||(t=b.destroy)==null||t.call(b),d.current=null,f.current=null}},[n,e.uniqueId,r,a,h]),(0,s.useEffect)(()=>{let e=f.current,t=d.current;if(e&&t){if(r){var n,i,a;(n=e.clearPointer)==null||n.call(e),(i=t.stop)==null||i.call(t),(a=e.stop)==null||a.call(e);return}if(m.current){var o,s;(o=t.start)==null||o.call(t),(s=e.start)==null||s.call(e)}}},[r]);let g=e=>{let t=o.current;if(!t)return{x:.5,y:.5};let n=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(e.clientY-n.top)/Math.max(1,n.height)))}};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android`,"aria-label":`Android web art tile ${t+1}`,disabled:r,onPointerEnter:r?void 0:(()=>{var e,t;(e=f.current)==null||(t=e.start)==null||t.call(e)}),onPointerMove:r?void 0:(e=>{var t,n;let r=g(e);(t=f.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)}),onPointerLeave:r?void 0:(()=>{var e,t;(e=f.current)==null||(t=e.clearPointer)==null||t.call(e)}),onFocus:r?void 0:(()=>{var e,t;(e=f.current)==null||(t=e.start)==null||t.call(e)}),onBlur:r?void 0:(()=>{var e,t;(e=f.current)==null||(t=e.clearPointer)==null||t.call(e)}),onClick:r?void 0:(()=>{var e,t;(e=f.current)==null||(t=e.poke)==null||t.call(e)}),onKeyDown:r?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n;e.preventDefault(),(t=f.current)==null||(n=t.poke)==null||n.call(t)}}),children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-android-bg-canvas`,"aria-hidden":!0}),(0,c.jsx)(`div`,{className:`article-web-art-android-glow`,"aria-hidden":!0}),(0,c.jsx)(`canvas`,{ref:u,className:`article-web-art-android-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Android`})]})}function F({itemWrapper:e,locked:t,onReady:n}){let r=(0,s.useRef)(!1);(0,s.useEffect)(()=>{r.current||(r.current=!0,n==null||n(e.uniqueId))},[e.uniqueId,n]);let i=(0,s.useMemo)(()=>[{key:`stop`,hoverMode:`stop`,hoverDuration:`5s`},{key:`slow`,hoverMode:`slow`,hoverDuration:`18s`},{key:`super-fast`,hoverMode:`super-fast`,hoverDuration:`0.22s`},{key:`very-fast`,hoverMode:`very-fast`,hoverDuration:`0.55s`}],[]);return(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-spin-boxes ${t?`article-web-art-spin-boxes-locked`:``}`,children:(0,c.jsx)(`div`,{className:`article-web-art-spin-boxes-grid`,children:i.map(({key:e,hoverDuration:t,hoverMode:n})=>(0,c.jsx)(`div`,{className:`article-web-art-spin-box`,style:{"--spin-duration":`5s`,"--spin-hover-duration":t},children:(0,c.jsx)(`div`,{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${n}`})},e))})})}function I({itemWrapper:e,index:t,activate:n,locked:r,onReady:i}){let a=(0,s.useRef)(!1),o=(0,s.useMemo)(()=>[`level-1`,`level-2`,`level-3`,`level-4`,`level-5`],[]),[l,u]=(0,s.useState)(0),d=o[l],f=(0,s.useMemo)(()=>Array.from({length:50},(e,t)=>({key:t,style:{animationDelay:`${3/25*(t+1)}s`,"--bar-index":t}})),[]),p=(0,s.useCallback)(e=>{var t,n;e==null||(t=e.preventDefault)==null||t.call(e),e==null||(n=e.stopPropagation)==null||n.call(e),u(e=>(e+1)%o.length)},[o.length]);return(0,s.useEffect)(()=>{n&&(a.current||(a.current=!0,i==null||i(e.uniqueId)))},[n,e.uniqueId,i]),(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable`,"aria-label":`Bars web art tile ${t+1}, ${d.replace(`level-`,`mode `)}`,disabled:r,onClick:r?void 0:p,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&p(e)},children:(0,c.jsx)(`div`,{className:`article-web-art-bars-stage article-web-art-bars-stage-${d}`,children:(0,c.jsx)(`div`,{className:`article-web-art-bars article-web-art-bars-${d}`,children:f.map(e=>(0,c.jsx)(`div`,{className:`article-web-art-bars-panel`,style:e.style},e.key))})})})}function L({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!1),f=(0,s.useRef)(!0),p=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),m=(0,s.useMemo)(()=>({seed:1729+(Number(e.id)||8)*4242,reduceMotion:p,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[e.id,p]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,s=l.current;if(!t||!s)return;let c=!1,p=null,h=null,g=null,v=()=>{d.current||(d.current=!0,a==null||a(e.uniqueId))},b=_(async()=>{try{var e,n,a;let o=await i(()=>import(`./shapeFieldEngine-Bs5ZxjQp.js`),[]);if(c)return;p=o.createShapeFieldEngine(s,m),u.current=p;let l=()=>y(t,p,window.devicePixelRatio||1);l(),(e=p.renderStatic)==null||e.call(p),(n=p.triggerWave)==null||n.call(p),r||(a=p.start)==null||a.call(p),v(),h=new ResizeObserver(()=>{var e;l(),(e=p.renderStatic)==null||e.call(p)}),h.observe(t),`IntersectionObserver`in window&&(g=new IntersectionObserver(e=>{for(let a of e){var t,n;if(f.current=!!a.isIntersecting,r){var i;(i=p.stop)==null||i.call(p);continue}f.current?(t=p.start)==null||t.call(p):(n=p.stop)==null||n.call(p)}},{threshold:.2}),g.observe(t))}catch{v()}});return()=>{var e;c=!0,b==null||b(),g==null||g.disconnect(),h==null||h.disconnect(),p==null||(e=p.destroy)==null||e.call(p),u.current=null}},[n,m,e.uniqueId,r,a]),(0,s.useEffect)(()=>{var e;let t=u.current;if(t){if(r){var n,i;(n=t.clearPointer)==null||n.call(t),(i=t.stop)==null||i.call(t);return}f.current&&((e=t.start)==null||e.call(t))}},[r]);let h=e=>{let t=l.current||o.current;if(!t)return{x:0,y:0};let n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape`,"aria-label":`Shape web art tile ${t+1}`,disabled:r,onPointerMove:r?void 0:e=>{var t,n;let r=h(e);(t=u.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onPointerDown:r?void 0:e=>{var t,n,r,i;let a=h(e);(t=u.current)==null||(n=t.setPointer)==null||n.call(t,a.x,a.y),(r=u.current)==null||(i=r.triggerWave)==null||i.call(r,a.x,a.y)},onPointerLeave:r?void 0:(()=>{var e,t;return(e=u.current)==null||(t=e.clearPointer)==null?void 0:t.call(e)}),onBlur:r?void 0:(()=>{var e,t;return(e=u.current)==null||(t=e.clearPointer)==null?void 0:t.call(e)}),onKeyDown:r?void 0:e=>{var t,n;(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),(t=u.current)==null||(n=t.triggerWave)==null||n.call(t))},children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Shape`})]})}function R({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!1),f=(0,s.useRef)(!0),[p,m]=(0,s.useState)(1.15),[h,g]=(0,s.useState)(.065);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,s=l.current;if(!t||!s)return;let c=!1,p=null,h=null,v=null,b=()=>{d.current||(d.current=!0,a==null||a(e.uniqueId))},x=_(async()=>{try{var e,n;let a=await i(()=>import(`./hourglassEngine-ARqfGTAI.js`),__vite__mapDeps([2,3,4]));if(c)return;p=a.createHourglassEngine(s),u.current=p;let o=(e=p.getState)==null?void 0:e.call(p);o&&(m(o.gravity),g(o.neckRatio));let l=()=>y(t,p,window.devicePixelRatio||1);l(),r||(n=p.start)==null||n.call(p),b(),h=new ResizeObserver(()=>{l()}),h.observe(t),`IntersectionObserver`in window&&(v=new IntersectionObserver(e=>{for(let a of e){var t,n;if(f.current=!!a.isIntersecting,r){var i;(i=p.stop)==null||i.call(p);continue}f.current?(t=p.start)==null||t.call(p):(n=p.stop)==null||n.call(p)}},{threshold:.2}),v.observe(t))}catch{b()}});return()=>{var e;c=!0,x==null||x(),v==null||v.disconnect(),h==null||h.disconnect(),p==null||(e=p.destroy)==null||e.call(p),u.current=null}},[n,e.uniqueId,r,a]),(0,s.useEffect)(()=>{var e;let t=u.current;if(t){if(r){var n;(n=t.stop)==null||n.call(t);return}f.current&&((e=t.start)==null||e.call(t))}},[r]);let v=e=>{var t,n;(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),(t=u.current)==null||(n=t.flip)==null||n.call(t))},b=e=>{e.stopPropagation()};return(0,c.jsxs)(`div`,{ref:o,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass`,role:r?void 0:`button`,tabIndex:r?-1:0,"aria-label":`Hourglass web art tile ${t+1}`,onClick:r?void 0:(()=>{var e,t;return(e=u.current)==null||(t=e.flip)==null?void 0:t.call(e)}),onKeyDown:r?void 0:v,children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsxs)(`div`,{className:`article-web-art-hourglass-controls`,onClick:b,onPointerDown:b,onPointerUp:b,onKeyDown:b,children:[(0,c.jsxs)(`label`,{className:`article-web-art-hourglass-control article-web-art-hourglass-control-left`,children:[(0,c.jsxs)(`span`,{className:`article-web-art-hourglass-control-name`,children:[(0,c.jsx)(`span`,{children:`Neck`}),(0,c.jsxs)(`output`,{children:[Math.round(h*100),`%`]})]}),(0,c.jsx)(`input`,{className:`article-web-art-hourglass-slider`,type:`range`,min:`0.025`,max:`0.17`,step:`0.001`,value:h,onChange:e=>{var t,n,i,a;let o=Number(e.target.value);g(o),(t=u.current)==null||(n=t.setNeckRatio)==null||n.call(t,o),!r&&f.current&&((i=u.current)==null||(a=i.start)==null||a.call(i))},disabled:r,"aria-label":`Hourglass neck size`})]}),(0,c.jsxs)(`label`,{className:`article-web-art-hourglass-control article-web-art-hourglass-control-right`,children:[(0,c.jsxs)(`span`,{className:`article-web-art-hourglass-control-name`,children:[(0,c.jsx)(`span`,{children:`Gravity`}),(0,c.jsxs)(`output`,{children:[p.toFixed(2),`×`]})]}),(0,c.jsx)(`input`,{className:`article-web-art-hourglass-slider`,type:`range`,min:`0.5`,max:`1.9`,step:`0.01`,value:p,onChange:e=>{var t,n;let r=Number(e.target.value);m(r),(t=u.current)==null||(n=t.setGravity)==null||n.call(t,r)},disabled:r,"aria-label":`Hourglass gravity`})]})]}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Hourglass`})]})}function ae({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(null),f=(0,s.useRef)(!1),p=(0,s.useRef)(!0),[m,h]=(0,s.useState)(!1),g=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,s=l.current,c=u.current;if(!t||!s||!c)return;let m=!1,v=null,b=null,x=null,S=()=>{f.current||(f.current=!0,a==null||a(e.uniqueId))},C=e=>{m||(h(!0),S())},w=()=>{var e;return!m&&(v==null||(e=v.renderStatic)==null||e.call(v),v!=null&&v.hasVisibleFrame&&!v.hasVisibleFrame()?(C(`Canvas rendered no visible Noice frame`),!1):(h(!1),S(),!0))},T=_(async()=>{try{var e;let n=await i(()=>import(`./noiceShaderEngine-C8iO9Dle.js`),[]);if(m)return;v=n.createNoiceShaderEngine({backgroundCanvas:s,foregroundCanvas:c},{reduceMotion:g}),d.current=v;let a=()=>y(t,v,Math.min(1.5,window.devicePixelRatio||1));if(a(),!w())return;r||(e=v.start)==null||e.call(v),b=new ResizeObserver(()=>{var e;a(),v==null||(e=v.renderStatic)==null||e.call(v)}),b.observe(t),`IntersectionObserver`in window&&(x=new IntersectionObserver(e=>{for(let a of e){var t,n;if(p.current=!!a.isIntersecting,r){var i;(i=v.stop)==null||i.call(v);continue}p.current?(t=v.start)==null||t.call(v):(n=v.stop)==null||n.call(v)}},{threshold:.25}),x.observe(t))}catch(e){C(e)}},{timeoutMs:220});return()=>{var e;m=!0,T==null||T(),x==null||x.disconnect(),b==null||b.disconnect(),v==null||(e=v.destroy)==null||e.call(v),d.current=null}},[n,e.uniqueId,r,a,g]),(0,s.useEffect)(()=>{var e;let t=d.current;if(t){if(r){var n,i;(n=t.clearPointer)==null||n.call(t),(i=t.stop)==null||i.call(t);return}p.current&&((e=t.start)==null||e.call(t))}},[r]);let v=e=>{let t=o.current;if(!t)return{x:.5,y:.5};let n=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(e.clientY-n.top)/Math.max(1,n.height)))}},b=e=>{var t,n,r,i,a,o;let s=v(e);(t=d.current)==null||(n=t.setPointer)==null||n.call(t,s.x,s.y),(r=d.current)==null||(i=r.pulsePattern)==null||i.call(r),(a=d.current)==null||(o=a.start)==null||o.call(a)};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice ${m?`article-web-art-tile-noice-fallback-active`:``}`,"aria-label":`Noice web art tile ${t+1}`,disabled:r,onPointerMove:r?void 0:(e=>{var t,n;let r=v(e);(t=d.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)}),onPointerDown:r?void 0:(e=>{(e.button==null||e.button===0)&&b(e)}),onMouseLeave:r?void 0:(()=>{var e,t;(e=d.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:r?void 0:(()=>{var e,t;(e=d.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:r?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n,r,i;e.preventDefault(),(t=d.current)==null||(n=t.pulsePattern)==null||n.call(t),(r=d.current)==null||(i=r.start)==null||i.call(r)}}),children:[m&&(0,c.jsxs)(`div`,{className:`article-web-art-noice-fallback`,"aria-hidden":!0,children:[(0,c.jsx)(`span`,{className:`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-a`}),(0,c.jsx)(`span`,{className:`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-b`}),(0,c.jsx)(`span`,{className:`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-c`})]}),(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-bg-canvas ${m?`article-web-art-canvas-hidden`:``}`}),(0,c.jsx)(`canvas`,{ref:u,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-fg-canvas ${m?`article-web-art-canvas-hidden`:``}`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Noice`})]})}function z({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!1),f=(0,s.useRef)(!0),p=(0,s.useRef)(null),m=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,s=l.current;if(!t||!s)return;let c=!1,p=null,h=null,g=null,v=()=>{d.current||(d.current=!0,a==null||a(e.uniqueId))},b=_(async()=>{try{var e,n;let a=await i(()=>import(`./deepShaderEngine-DU7yctA0.js`),[]);if(c)return;p=a.createDeepShaderEngine(s,{reduceMotion:m}),u.current=p;let o=()=>y(t,p,Math.min(1.5,window.devicePixelRatio||1));o(),(e=p.renderStatic)==null||e.call(p),r||(n=p.start)==null||n.call(p),v(),h=new ResizeObserver(()=>{var e;o(),(e=p.renderStatic)==null||e.call(p)}),h.observe(t),`IntersectionObserver`in window&&(g=new IntersectionObserver(e=>{for(let a of e){var t,n;if(f.current=!!a.isIntersecting,r){var i;(i=p.stop)==null||i.call(p);continue}f.current?(t=p.start)==null||t.call(p):(n=p.stop)==null||n.call(p)}},{threshold:.25}),g.observe(t))}catch{v()}},{timeoutMs:220});return()=>{var e;c=!0,b==null||b(),g==null||g.disconnect(),h==null||h.disconnect(),p==null||(e=p.destroy)==null||e.call(p),u.current=null}},[n,e.uniqueId,r,a,m]),(0,s.useEffect)(()=>{var e;let t=u.current;if(t){if(r){var n,i;p.current=null,(n=t.clearPointer)==null||n.call(t),(i=t.stop)==null||i.call(t);return}f.current&&((e=t.start)==null||e.call(t))}},[r]);let h=e=>{let t=l.current||o.current;if(!t)return{x:.5,y:.5};let n=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(e.clientY-n.top)/Math.max(1,n.height)))}};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-deep`,"aria-label":`Deep web art tile ${t+1}`,disabled:r,onPointerDown:r?void 0:e=>{var t,n,r,i;if(e.button!=null&&e.button!==0)return;p.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let a=h(e);(t=u.current)==null||(n=t.setPointer)==null||n.call(t,a.x,a.y),(r=u.current)==null||(i=r.start)==null||i.call(r)},onPointerMove:r?void 0:e=>{var t,n;if(p.current!=null&&e.pointerId!==p.current||p.current==null&&e.pointerType!==`mouse`)return;let r=h(e);p.current!=null&&((t=u.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y))},onPointerUp:r?void 0:e=>{var t,n;(p.current==null||e.pointerId===p.current)&&(p.current=null,(t=u.current)==null||(n=t.clearPointer)==null||n.call(t))},onPointerCancel:r?void 0:(()=>{var e,t;p.current=null,(e=u.current)==null||(t=e.clearPointer)==null||t.call(e)}),onMouseLeave:r?void 0:(()=>{var e,t;p.current=null,(e=u.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:r?void 0:(()=>{var e,t;p.current=null,(e=u.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:r?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n;e.preventDefault(),(t=u.current)==null||(n=t.start)==null||n.call(t)}}),children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Deep`})]})}function oe({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!0),f=(0,s.useRef)(!0),p=(0,s.useRef)(!1),m=Number(e==null?void 0:e.id)===5,h=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),g=(0,s.useMemo)(()=>{let n=Number(e.id)||t+1,r=.0026+n*8e-5,i=.0054+n*14e-5,a=n%2?1:2,o={kx:11+n*2,ky:n%2};return{refreshDelay:m?0:8e3,radiusMini:r,radiusMaxi:i,dHueStep:a,startGroup:o,seed:1337+n*1009,reduceMotion:h}},[m,e.id,t,h]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,r=l.current;if(!t||!r)return;let s=!1,c=null,h=null,v=null,b=()=>{p.current||(p.current=!0,a==null||a(e.uniqueId))},x=_(async()=>{try{var e,n;let a=await i(()=>import(`./embroideryEngine-Dj8tyjYC.js`),__vite__mapDeps([5,6,3,7]));if(s)return;c=a.createEmbroideryEngine(r,g),u.current=c;let o=()=>y(t,c,window.devicePixelRatio||1);o(),(e=c.renderStatic)==null||e.call(c),f.current&&((n=c.start)==null||n.call(c)),b(),h=new ResizeObserver(()=>{var e;o(),(e=c.renderStatic)==null||e.call(c)}),h.observe(t),`IntersectionObserver`in window&&(v=new IntersectionObserver(e=>{for(let t of e){if(f.current=!!t.isIntersecting,m){f.current||c.stop();continue}f.current&&d.current?c.start():c.stop()}},{threshold:.25}),v.observe(t))}catch{b()}});return()=>{s=!0,x==null||x(),v==null||v.disconnect(),h==null||h.disconnect(),c==null||c.destroy(),u.current=null}},[n,g,e.uniqueId,a]),(0,s.useEffect)(()=>{var e;let t=u.current;if(t){if(r){var n;(n=t.stop)==null||n.call(t);return}f.current&&((e=t.start)==null||e.call(t))}},[r]),(0,s.useEffect)(()=>{var e;let t=u.current;if(t){if(r){var n;(n=t.stop)==null||n.call(t);return}f.current&&((e=t.start)==null||e.call(t))}},[r]);let v=()=>{var e;d.current=!0,f.current&&((e=u.current)==null||e.start())},b=()=>{var e,t,n,r;d.current=!0,f.current?(e=u.current)==null||(t=e.start)==null||t.call(e):(n=u.current)==null||(r=n.stop)==null||r.call(n)},x=()=>{var e,t,n,r;if(m){var i,a,o,s,c,l;(i=u.current)==null||(a=i.stop)==null||a.call(i),(o=u.current)==null||(s=o.reset)==null||s.call(o),(c=u.current)==null||(l=c.start)==null||l.call(c);return}(e=u.current)==null||e.reset(),(t=u.current)==null||(n=t.renderStatic)==null||n.call(t),f.current&&((r=u.current)==null||r.start())};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Web art tile ${t+1}`,disabled:r,onClick:r?void 0:x,onMouseEnter:r||m?void 0:v,onMouseLeave:r||m?void 0:b,onFocus:r||m?void 0:v,onBlur:r||m?void 0:b,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),x())},children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:m?`Click`:Number.isFinite(Number(e==null?void 0:e.id))?Number(e.id):t+1})]})}function se({itemWrapper:e,index:t,activate:n,onReady:r}){let i=(0,s.useRef)(!1),a=(0,s.useRef)(null),o=(0,s.useMemo)(()=>`<!doctype html>
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
</html>`,[]);return(0,s.useEffect)(()=>{n&&(i.current||(i.current=!0,r==null||r(e.uniqueId)))},[n,e.uniqueId,r]),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-pulse-tile`,role:`img`,"aria-label":`Pulse web art tile ${t+1}`,children:(0,c.jsx)(`iframe`,{ref:a,className:`article-web-art-pulse-frame`,title:`Pulse web art`,srcDoc:o,sandbox:``,scrolling:`no`})})}function ce({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!1),f=(0,s.useRef)(null);(0,s.useRef)(null),(0,s.useRef)(!1);let p=(0,s.useRef)(!1),m=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),h=(0,s.useMemo)(()=>({seed:9001+(Number(e.id)||1)*1337,reduceMotion:m,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[e.id,m]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,r=l.current;if(!t||!r)return;let s=!1,c=null,f=null,p=()=>{d.current||(d.current=!0,a==null||a(e.uniqueId))},m=_(async()=>{try{var e,n;let a=await i(()=>import(`./spiralDotsEngine-BGFS-Jxk.js`),[]);if(s)return;c=a.createSpiralDotsEngine(r,h),u.current=c;let o=()=>y(t,c,window.devicePixelRatio||1);o(),(e=c.renderStatic)==null||e.call(c),(n=c.start)==null||n.call(c),p(),f=new ResizeObserver(()=>{var e;o(),c.rebuildDots(),(e=c.renderStatic)==null||e.call(c)}),f.observe(t)}catch{p()}});return()=>{s=!0,m==null||m(),f==null||f.disconnect(),c==null||c.destroy(),u.current=null}},[n,h,e.uniqueId,a]),(0,s.useEffect)(()=>{var e;let t=u.current;if(t){if(r){var n,i;(n=t.clearMouse)==null||n.call(t),(i=t.stop)==null||i.call(t);return}(e=t.start)==null||e.call(t)}},[r]);let g=e=>{let t=l.current||o.current;if(!t)return{x:-1e4,y:-1e4};let n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}},v=()=>{var e;(e=u.current)==null||e.start()},b=()=>{var e,t;(e=u.current)==null||e.clearMouse(),(t=u.current)==null||t.start()};return(0,c.jsxs)(`div`,{ref:o,className:`article-web-art-tile article-web-art-tile-hover-only article-web-art-tile-hover-dots`,role:`img`,tabIndex:r?-1:0,"aria-label":`Spiral dots web art tile ${t+1}`,onPointerDown:r?void 0:e=>{var t;if(e.pointerType===`mouse`)return;let n=o.current;if(!n)return;p.current=!0,f.current=e.pointerId;try{n.setPointerCapture(e.pointerId)}catch{}v();let r=g(e);(t=u.current)==null||t.setMouse(r.x,r.y)},onPointerMove:r?void 0:e=>{var t;if(!p.current||f.current!=null&&e.pointerId!==f.current)return;let n=g(e);(t=u.current)==null||t.setMouse(n.x,n.y)},onPointerUp:r?void 0:e=>{(f.current==null||e.pointerId===f.current)&&(p.current=!1,f.current=null,b())},onPointerCancel:r?void 0:()=>{p.current=!1,f.current=null,b()},onMouseEnter:r?void 0:()=>{v()},onMouseLeave:r?void 0:()=>{b()},onMouseMove:r?void 0:e=>{var t;let n=g(e);(t=u.current)==null||t.setMouse(n.x,n.y)},onFocus:r?void 0:()=>{v()},onBlur:r?void 0:()=>{b()},children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Hover`})]})}function B({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!0),f=(0,s.useRef)(!0),p=(0,s.useRef)(!1),m=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),h=(0,s.useMemo)(()=>({seed:424242+(Number(e.id)||2)*2027,reduceMotion:m,targetCellSize:14,gapPx:1.4}),[e.id,m]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,r=l.current;if(!t||!r)return;let s=!1,c=null,m=null,g=null,v=()=>{p.current||(p.current=!0,a==null||a(e.uniqueId))},b=_(async()=>{try{var e,n;let a=await i(()=>import(`./gridWaveEngine-CKcG6jKX.js`),[]);if(s)return;c=a.createGridWaveEngine(r,h),u.current=c;let o=()=>y(t,c,window.devicePixelRatio||1);o(),(e=c.renderStatic)==null||e.call(c),f.current&&((n=c.start)==null||n.call(c)),v(),m=new ResizeObserver(()=>{var e;o(),(e=c.renderStatic)==null||e.call(c)}),m.observe(t),`IntersectionObserver`in window&&(g=new IntersectionObserver(e=>{for(let t of e)f.current=!!t.isIntersecting,f.current&&d.current?c.start():c.stop()},{threshold:.25}),g.observe(t))}catch{v()}});return()=>{s=!0,b==null||b(),g==null||g.disconnect(),m==null||m.disconnect(),c==null||c.destroy(),u.current=null}},[n,h,e.uniqueId,a]);let g=()=>{var e;d.current=!0,f.current&&((e=u.current)==null||e.start())},v=()=>{var e,t,n,r;d.current=!0,f.current?(e=u.current)==null||(t=e.start)==null||t.call(e):(n=u.current)==null||(r=n.stop)==null||r.call(n)},b=e=>{let t=l.current||o.current;if(!t)return{x:0,y:0};let n=t.getBoundingClientRect();return typeof(e==null?void 0:e.clientX)!=`number`||typeof(e==null?void 0:e.clientY)!=`number`?{x:n.width/2,y:n.height/2}:{x:e.clientX-n.left,y:e.clientY-n.top}},x=e=>{var t,n,r,i;let a=b(e);(t=u.current)==null||t.rippleAt(a.x,a.y),(n=u.current)==null||(r=n.renderStatic)==null||r.call(n),d.current&&f.current&&((i=u.current)==null||i.start())};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Grid wave web art tile ${t+1}`,disabled:r,onClick:r?void 0:x,onMouseEnter:r?void 0:g,onMouseLeave:r?void 0:v,onFocus:r?void 0:g,onBlur:r?void 0:v,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),x(null))},children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Wave`})]})}function V({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!0),f=(0,s.useRef)(!0),p=(0,s.useRef)(!1),m=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),h=(0,s.useMemo)(()=>({reduceMotion:m,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[m]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,r=l.current;if(!t||!r)return;let s=!1,c=null,m=null,g=null,v=null,b=()=>{p.current||(p.current=!0,a==null||a(e.uniqueId))},x=async()=>{var e;let n=await i(()=>import(`./threeTunnelEngine-Caj-Dg_r.js`),__vite__mapDeps([8,1]));if(s)return;c=n.createThreeTunnelEngine(r,h),u.current=c;let a=()=>y(t,c,Math.min(1.5,window.devicePixelRatio||1));return a(),c.reset(),f.current&&((e=c.start)==null||e.call(c)),b(),m=new ResizeObserver(()=>{a(),c.reset()}),m.observe(t),`IntersectionObserver`in window&&(g=new IntersectionObserver(e=>{for(let t of e)f.current=!!t.isIntersecting,f.current&&d.current?c.start():c.stop()},{threshold:.25}),g.observe(t)),()=>{g==null||g.disconnect(),m==null||m.disconnect(),c.destroy(),u.current=null}},S=null;return v=_(()=>{x().then(e=>{S=e||null}).catch(()=>{b()})},{timeoutMs:300}),()=>{s=!0,v==null||v(),S==null||S()}},[n,h,e.uniqueId,a]),(0,s.useEffect)(()=>{var e;let t=u.current;if(t){if(r){var n,i;(n=t.setHeld)==null||n.call(t,!1),(i=t.stop)==null||i.call(t);return}f.current&&((e=t.start)==null||e.call(t))}},[r]);let g=()=>{var e;d.current=!0,f.current&&((e=u.current)==null||e.start())},v=()=>{var e,t,n,r;d.current=!0,f.current?(e=u.current)==null||(t=e.start)==null||t.call(e):(n=u.current)==null||(r=n.stop)==null||r.call(n)},b=()=>{var e,t,n,r;(e=u.current)==null||(t=e.nextPalette)==null||t.call(e),(n=u.current)==null||n.reset(),f.current&&((r=u.current)==null||r.start())};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel`,"aria-label":`3D tunnel web art tile ${t+1}`,disabled:r,onClick:r?void 0:b,onMouseEnter:r?void 0:g,onMouseLeave:r?void 0:v,onFocus:r?void 0:g,onBlur:r?void 0:v,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),b())},children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`div`,{className:`article-web-art-tunnel-room-shade`,"aria-hidden":!0}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`3D`})]})}function le({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!0),f=(0,s.useRef)(!0),p=(0,s.useRef)(!1),m=(0,s.useRef)(null),h=(0,s.useRef)(null),g=(0,s.useRef)(!1),v=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),b=(0,s.useMemo)(()=>({reduceMotion:v,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[v,r]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,r=l.current;if(!t||!r)return;let s=!1,c=null,m=null,g=()=>{p.current||(p.current=!0,a==null||a(e.uniqueId))},v=async()=>{var e;let n=await i(()=>import(`./threePolygonDemo5Engine-uBhy1gSh.js`),__vite__mapDeps([9,1]));if(s)return;let a=n.createThreePolygonDemo5Engine(r,b);u.current=a;let o=()=>y(t,a,Math.min(1.2,window.devicePixelRatio||1));o(),a.reset(),window.requestAnimationFrame(()=>{s||u.current!==a||(o(),a.reset())}),f.current&&((e=a.start)==null||e.call(a)),g();let l=new ResizeObserver(()=>{o()});l.observe(t);let p=null;`IntersectionObserver`in window&&(p=new IntersectionObserver(e=>{for(let t of e)f.current=!!t.isIntersecting,f.current&&d.current?a.start():a.stop()},{threshold:.25}),p.observe(t)),c=()=>{p==null||p.disconnect(),l.disconnect(),a.destroy(),u.current=null}};return m=_(()=>{v().catch(()=>{g()})},{timeoutMs:300}),()=>{s=!0,m==null||m(),h.current!=null&&window.clearTimeout(h.current),c==null||c()}},[n,b,e.uniqueId,a]);let x=()=>{var e,t,n;(e=u.current)==null||(t=e.boost)==null||t.call(e),f.current&&((n=u.current)==null||n.start())};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Polygon demo 5 web art tile ${t+1}`,disabled:r,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),x())},onPointerDown:r?void 0:e=>{var t;if(e.button==null||e.button===0){m.current=e.pointerId,g.current=!1;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}f.current&&((t=u.current)==null||t.start()),h.current!=null&&window.clearTimeout(h.current),h.current=window.setTimeout(()=>{var e,t;m.current!=null&&(g.current=!0,(e=u.current)==null||(t=e.setHeld)==null||t.call(e,!0))},140)}},onPointerUp:r?void 0:e=>{if(m.current==null||e.pointerId===m.current){if(h.current!=null&&(window.clearTimeout(h.current),h.current=null),m.current=null,g.current){var t,n;g.current=!1,(t=u.current)==null||(n=t.setHeld)==null||n.call(t,!1)}else x()}},onPointerCancel:r?void 0:(()=>{var e,t;h.current!=null&&(window.clearTimeout(h.current),h.current=null),m.current=null,g.current=!1,(e=u.current)==null||(t=e.setHeld)==null||t.call(e,!1)}),onLostPointerCapture:r?void 0:(()=>{var e,t;h.current!=null&&(window.clearTimeout(h.current),h.current=null),m.current=null,g.current=!1,(e=u.current)==null||(t=e.setHeld)==null||t.call(e,!1)}),onMouseEnter:r?void 0:(()=>{var e;d.current=!0,f.current&&((e=u.current)==null||e.start())}),onMouseLeave:r?void 0:(()=>{var e,t,n,r;h.current!=null&&(window.clearTimeout(h.current),h.current=null),m.current=null,g.current=!1,(e=u.current)==null||(t=e.setHeld)==null||t.call(e,!1),d.current=!0,f.current?(n=u.current)==null||n.start():(r=u.current)==null||r.stop()}),onFocus:r?void 0:(()=>{var e;d.current=!0,f.current&&((e=u.current)==null||e.start())}),onBlur:r?void 0:(()=>{var e,t,n,r;h.current!=null&&(window.clearTimeout(h.current),h.current=null),m.current=null,g.current=!1,(e=u.current)==null||(t=e.setHeld)==null||t.call(e,!1),d.current=!0,f.current?(n=u.current)==null||n.start():(r=u.current)==null||r.stop()}),children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Poly`})]})}function ue({itemWrapper:e,index:t,activate:n,locked:r,onReady:a}){let o=(0,s.useRef)(null),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(!0),f=(0,s.useRef)(!0),p=(0,s.useRef)(!1),m=(0,s.useRef)(0),h=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),g=(0,s.useMemo)(()=>({reduceMotion:h,palette:[`#DD0F7E`,`#009BBE`,`#A8DA00`,`#F2E205`,`#EE5A02`],bgColor:`#200018`,totalCircles:22,timeScale:.0017}),[h]);(0,s.useEffect)(()=>{if(!n)return;let t=o.current,r=l.current;if(!t||!r)return;let s=!1,c=null,m=null,h=null,v=()=>{p.current||(p.current=!0,a==null||a(e.uniqueId))},b=_(async()=>{try{var e,n;let a=await i(()=>import(`./orbitCirclesEngine-CD4igzj0.js`),[]);if(s)return;c=a.createOrbitCirclesEngine(r,g),u.current=c;let o=()=>y(t,c,window.devicePixelRatio||1);o(),c.reset(),(e=c.renderStatic)==null||e.call(c),f.current&&((n=c.start)==null||n.call(c)),v(),m=new ResizeObserver(()=>{var e;o(),(e=c.renderStatic)==null||e.call(c)}),m.observe(t),`IntersectionObserver`in window&&(h=new IntersectionObserver(e=>{for(let t of e)f.current=!!t.isIntersecting,f.current&&d.current?c.start():c.stop()},{threshold:.25}),h.observe(t))}catch{v()}});return()=>{s=!0,b==null||b(),h==null||h.disconnect(),m==null||m.disconnect(),c==null||c.destroy(),u.current=null}},[n,g,e.uniqueId,a]),(0,s.useEffect)(()=>{var e;let t=u.current;if(t){if(r){var n;(n=t.stop)==null||n.call(t);return}f.current&&((e=t.start)==null||e.call(t))}},[r]);let v=()=>{var e;d.current=!0,f.current&&((e=u.current)==null||e.start())},b=()=>{var e,t,n,r;d.current=!0,f.current?(e=u.current)==null||(t=e.start)==null||t.call(e):(n=u.current)==null||(r=n.stop)==null||r.call(n)},x=()=>{var e,t,n;let r=u.current;if(!r)return;let i=Math.max(1,((e=r.getTotalCircles)==null?void 0:e.call(r))||1),a=m.current%i,o=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,`0`)}`;(t=r.setCircleColor)==null||t.call(r,a,o),m.current+=1,f.current&&((n=r.start)==null||n.call(r))};return(0,c.jsxs)(`button`,{type:`button`,ref:o,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Orbit circles web art tile ${t+1}`,disabled:r,onClick:r?void 0:x,onMouseEnter:r?void 0:v,onMouseLeave:r?void 0:b,onFocus:r?void 0:v,onBlur:r?void 0:b,onKeyDown:r?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),x())},children:[(0,c.jsx)(`canvas`,{ref:l,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Orbit`})]})}function de({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(null),l=(0,s.useRef)(!1),u=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),d=(0,s.useMemo)(()=>({seed:20250414,reduceMotion:u,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[u]);(0,s.useEffect)(()=>{let t=r.current,s=a.current;if(!t||!s)return;let c=!1,u=null,f=null,p=null,m=()=>{l.current||(l.current=!0,n==null||n(e))},h=_(async()=>{try{var e,n;let r=await i(()=>import(`./tortuosityTraceEngine-W_tb0lis.js`),[]);if(c)return;u=r.createTortuosityTraceEngine(s,d),o.current=u;let a=()=>y(t,u,Math.min(1.5,window.devicePixelRatio||1));a(),(e=u.renderStatic)==null||e.call(u),(n=u.start)==null||n.call(u),m(),f=new ResizeObserver(()=>{var e;a(),(e=u.reset)==null||e.call(u)}),f.observe(t),`IntersectionObserver`in window&&(p=new IntersectionObserver(e=>{for(let r of e){var t,n;r.isIntersecting?(t=u.start)==null||t.call(u):(n=u.stop)==null||n.call(u)}},{threshold:.25}),p.observe(t))}catch{m()}},{timeoutMs:200});return()=>{var e;c=!0,h==null||h(),p==null||p.disconnect(),f==null||f.disconnect(),u==null||(e=u.destroy)==null||e.call(u),o.current=null}},[d,n,e]),(0,s.useEffect)(()=>{var e;let n=o.current;if(n){if(t){var r,i;(r=n.setHeld)==null||r.call(n,!1),(i=n.stop)==null||i.call(n);return}(e=n.start)==null||e.call(n)}},[t]),(0,s.useEffect)(()=>{var e;let n=o.current;if(n){if(t){var r;(r=n.stop)==null||r.call(n);return}(e=n.start)==null||e.call(n)}},[t]);let f=()=>{var e,t,n,r;(e=o.current)==null||(t=e.reset)==null||t.call(e),(n=o.current)==null||(r=n.start)==null||r.call(n)};return(0,c.jsxs)(`button`,{type:`button`,ref:r,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Trace web art tile`,disabled:t,onClick:t?void 0:f,onKeyDown:t?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),f())},children:[(0,c.jsx)(`canvas`,{ref:a,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Trace`})]})}function fe({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(null),l=(0,s.useRef)(!1),u=(0,s.useRef)(null),d=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),f=(0,s.useMemo)(()=>({seed:20250415,reduceMotion:d,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[d]);(0,s.useEffect)(()=>{let t=r.current,s=a.current;if(!t||!s)return;let c=!1,u=null,d=null,p=null,m=()=>{l.current||(l.current=!0,n==null||n(e))},h=_(async()=>{try{var e,n;let r=await i(()=>import(`./hexFlowBallsEngine-BctyaQq6.js`),[]);if(c)return;u=r.createHexFlowBallsEngine(s,f),o.current=u;let a=()=>y(t,u,Math.min(1.5,window.devicePixelRatio||1));a(),(e=u.renderStatic)==null||e.call(u),(n=u.start)==null||n.call(u),m(),d=new ResizeObserver(()=>{var e;a(),(e=u.renderStatic)==null||e.call(u)}),d.observe(t),`IntersectionObserver`in window&&(p=new IntersectionObserver(e=>{for(let r of e){var t,n;r.isIntersecting?(t=u.start)==null||t.call(u):(n=u.stop)==null||n.call(u)}},{threshold:.25}),p.observe(t))}catch{m()}},{timeoutMs:220});return()=>{var e;c=!0,h==null||h(),p==null||p.disconnect(),d==null||d.disconnect(),u==null||(e=u.destroy)==null||e.call(u),o.current=null}},[f,n,e]),(0,s.useEffect)(()=>{var e;let n=o.current;if(n){if(t){var r,i;(r=n.clearPointer)==null||r.call(n),(i=n.stop)==null||i.call(n);return}(e=n.start)==null||e.call(n)}},[t]);let p=e=>{let t=r.current;if(!t)return{x:.5,y:.5};let n=t.getBoundingClientRect();return{x:n.width>0?(e.clientX-n.left)/n.width:.5,y:n.height>0?(e.clientY-n.top)/n.height:.5}},m=()=>{var e,t,n,r;(e=o.current)==null||(t=e.burst)==null||t.call(e),(n=o.current)==null||(r=n.start)==null||r.call(n)};return(0,c.jsxs)(`button`,{type:`button`,ref:r,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Hex flow web art tile`,disabled:t,onClick:t?void 0:m,onPointerDown:t?void 0:(e=>{var t,n;u.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let r=p(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)}),onPointerMove:t?void 0:(e=>{var t,n;if(u.current!=null&&e.pointerId!==u.current)return;let r=p(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)}),onPointerUp:t?void 0:(e=>{(u.current==null||e.pointerId===u.current)&&(u.current=null)}),onPointerCancel:t?void 0:(()=>{var e,t;u.current=null,(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onMouseMove:t?void 0:(e=>{var t,n;let r=p(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)}),onMouseLeave:t?void 0:(()=>{var e,t;u.current=null,(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:t?void 0:(()=>{var e,t;u.current=null,(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:t?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),m())},children:[(0,c.jsx)(`canvas`,{ref:a,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Hex`})]})}function pe({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(null),l=(0,s.useRef)(!1),u=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),d=(0,s.useMemo)(()=>({seed:20250416,reduceMotion:u,step:6,side:5}),[u]);(0,s.useEffect)(()=>{let t=r.current,s=a.current;if(!t||!s)return;let c=!1,u=null,f=null,p=null,m=()=>{l.current||(l.current=!0,n==null||n(e))},h=_(async()=>{try{var e,n;let r=await i(()=>import(`./pixelPlopEngine-FMjZgkGg.js`),[]);if(c)return;u=r.createPixelPlopEngine(s,d),o.current=u;let a=()=>y(t,u,Math.min(1.5,window.devicePixelRatio||1));a(),(e=u.renderStatic)==null||e.call(u),(n=u.start)==null||n.call(u),m(),f=new ResizeObserver(()=>{var e;a(),(e=u.reset)==null||e.call(u)}),f.observe(t),`IntersectionObserver`in window&&(p=new IntersectionObserver(e=>{for(let r of e){var t,n;r.isIntersecting?(t=u.start)==null||t.call(u):(n=u.stop)==null||n.call(u)}},{threshold:.25}),p.observe(t))}catch{m()}},{timeoutMs:220});return()=>{var e;c=!0,h==null||h(),p==null||p.disconnect(),f==null||f.disconnect(),u==null||(e=u.destroy)==null||e.call(u),o.current=null}},[d,n,e]),(0,s.useEffect)(()=>{var e;let n=o.current;if(n){if(t){var r,i;(r=n.clearPointer)==null||r.call(n),(i=n.stop)==null||i.call(n);return}(e=n.start)==null||e.call(n)}},[t]),(0,s.useEffect)(()=>{var e;let n=o.current;if(n){if(t){var r;(r=n.stop)==null||r.call(n);return}(e=n.start)==null||e.call(n)}},[t]);let f=()=>{var e,t,n,r;(e=o.current)==null||(t=e.seedBurst)==null||t.call(e),(n=o.current)==null||(r=n.start)==null||r.call(n)},p=e=>{var t,n,i,s;let c=a.current||r.current;if(!c||typeof(e==null?void 0:e.clientX)!=`number`||typeof(e==null?void 0:e.clientY)!=`number`){f();return}let l=c.getBoundingClientRect();(t=o.current)==null||(n=t.burstAt)==null||n.call(t,e.clientX-l.left,e.clientY-l.top),(i=o.current)==null||(s=i.start)==null||s.call(i)};return(0,c.jsxs)(`button`,{type:`button`,ref:r,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Pixel plop web art tile`,disabled:t,onPointerDown:t?void 0:(e=>{(e.button==null||e.button===0)&&p(e)}),onKeyDown:t?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),f())},children:[(0,c.jsx)(`canvas`,{ref:a,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Plop`})]})}function me({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(null),l=(0,s.useRef)(!1),u=(0,s.useRef)(null),d=(0,s.useRef)(!1),f=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),p=(0,s.useMemo)(()=>({reduceMotion:f,seed:20250417}),[f]);(0,s.useEffect)(()=>{let t=r.current,s=a.current;if(!t||!s)return;let c=!1,u=null,d=null,f=null,m=()=>{l.current||(l.current=!0,n==null||n(e))},h=_(async()=>{try{var e,n;let r=await i(()=>import(`./juliaLinesEngine-CV3pQWjG.js`),[]);if(c)return;u=r.createJuliaLinesEngine(s,p),o.current=u;let a=()=>y(t,u,Math.min(1.5,window.devicePixelRatio||1));a(),(e=u.renderStatic)==null||e.call(u),(n=u.start)==null||n.call(u),m(),d=new ResizeObserver(()=>{a()}),d.observe(t),`IntersectionObserver`in window&&(f=new IntersectionObserver(e=>{for(let r of e){var t,n;r.isIntersecting?(t=u.start)==null||t.call(u):(n=u.stop)==null||n.call(u)}},{threshold:.25}),f.observe(t))}catch{m()}},{timeoutMs:220});return()=>{var e;c=!0,h==null||h(),f==null||f.disconnect(),d==null||d.disconnect(),u==null||(e=u.destroy)==null||e.call(u),o.current=null}},[p,n,e]),(0,s.useEffect)(()=>{var e;let n=o.current;if(n){if(t){var r,i,a;(r=n.setHeld)==null||r.call(n,!1),(i=n.clearPointer)==null||i.call(n),(a=n.stop)==null||a.call(n);return}(e=n.start)==null||e.call(n)}},[t]),(0,s.useEffect)(()=>{var e;let n=o.current;if(n){if(t){var r,i;(r=n.clearPointer)==null||r.call(n),(i=n.stop)==null||i.call(n);return}(e=n.start)==null||e.call(n)}},[t]);let m=e=>{let t=r.current;if(!t)return{x:.4,y:.5};let n=t.getBoundingClientRect(),i=(e.clientX-n.left)/Math.max(1,n.width),a=(e.clientY-n.top)/Math.max(1,n.height);return{x:Math.max(0,Math.min(1,i)),y:Math.max(0,Math.min(1,a))}},h=()=>{var e,t,n,r;(e=o.current)==null||(t=e.reset)==null||t.call(e),(n=o.current)==null||(r=n.start)==null||r.call(n)};return(0,c.jsxs)(`div`,{ref:r,className:`article-web-art-tile article-web-art-tile-hover-only`,role:`img`,tabIndex:t?-1:0,"aria-label":`Julia lines web art tile`,onPointerDown:t?void 0:e=>{var t,n;let i=r.current;if(!i)return;d.current=!0,u.current=e.pointerId;try{i.setPointerCapture(e.pointerId)}catch{}let a=m(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,a.x,a.y)},onPointerMove:t?void 0:e=>{var t,n;if(d.current&&u.current!=null&&e.pointerId!==u.current)return;let r=m(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onPointerUp:t?void 0:e=>{var t,n;(u.current==null||e.pointerId===u.current)&&(d.current=!1,u.current=null,(t=o.current)==null||(n=t.clearPointer)==null||n.call(t))},onPointerCancel:t?void 0:()=>{var e,t;d.current=!1,u.current=null,(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)},onMouseMove:t?void 0:e=>{var t,n;let r=m(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onMouseLeave:t?void 0:(()=>{var e,t;(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:t?void 0:(()=>{var e,t;(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:t?void 0:e=>{let t=e.shiftKey?.01:.04;if(e.key===`ArrowUp`){var n,r;e.preventDefault(),(n=o.current)==null||(r=n.nudge)==null||r.call(n,0,-t)}else if(e.key===`ArrowDown`){var i,a;e.preventDefault(),(i=o.current)==null||(a=i.nudge)==null||a.call(i,0,t)}else if(e.key===`ArrowLeft`){var s,c;e.preventDefault(),(s=o.current)==null||(c=s.nudge)==null||c.call(s,-t,0)}else if(e.key===`ArrowRight`){var l,u;e.preventDefault(),(l=o.current)==null||(u=l.nudge)==null||u.call(l,t,0)}else(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),h())},onClick:t?void 0:h,children:[(0,c.jsx)(`canvas`,{ref:a,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Julia`})]})}function he({readyId:e,locked:t,onReady:n}){let[r,i]=(0,s.useState)(0),[a,o]=(0,s.useState)(`mine`),[l,u]=(0,s.useState)(()=>new Set),[d,f]=(0,s.useState)(()=>new Set),[_,v]=(0,s.useState)(`playing`),[y,b]=(0,s.useState)(null),[x,S]=(0,s.useState)(0),C=(0,s.useMemo)(()=>m(),[r]);(0,s.useEffect)(()=>{n==null||n(e)},[n,e]),(0,s.useEffect)(()=>{o(`mine`),u(new Set),f(new Set),v(`playing`),b(null),S(0)},[r]),(0,s.useEffect)(()=>{if(y==null||_!==`playing`)return;let e=()=>{S(Math.min(5999,Math.floor((Date.now()-y)/1e3)))};e();let t=window.setInterval(e,1e3);return()=>{window.clearInterval(t)}},[y,_]);let w=()=>{i(e=>e+1)},T=e=>{if(t||_!==`playing`)return;if(y??b(Date.now()),a===`flag`){if(l.has(e))return;let t=new Set(d);t.has(e)?t.delete(e):t.add(e),f(t),g(C,l,t)&&v(`won`);return}if(d.has(e)||l.has(e))return;if(C.mines.has(e)){let t=new Set(l);for(let e of C.mines)t.add(e);t.add(e),u(t),v(`lost`);return}let n=h(e,C,l,d);u(n),g(C,n,d)&&v(`won`)},E=C.mineCount-d.size,ee=`${String(Math.floor(x/60)).padStart(2,`0`)}:${String(x%60).padStart(2,`0`)}`,D=`🤔`;return _===`lost`?D=`😣`:_===`won`?D=`😎`:d.size>=C.mineCount?D=`😕`:d.size>=C.mineCount-1?D=`🤓`:d.size>=Math.round(C.mineCount*3/4)?D=`😃`:d.size>=Math.round(C.mineCount*2/3)?D=`😊`:d.size>=Math.round(C.mineCount/2)?D=`🙂`:d.size>=Math.round(C.mineCount/3)?D=`😏`:d.size>0&&(D=`😐`),(0,c.jsx)(`div`,{className:`article-web-art-tile article-web-art-tile-minesweeper`,role:`group`,"aria-label":`Minesweeper web art tile`,children:(0,c.jsxs)(`div`,{className:`article-web-art-minesweeper`,children:[(0,c.jsxs)(`div`,{className:`article-web-art-minesweeper-action-selector`,children:[(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-minesweeper-mode ${a===`mine`?`article-web-art-minesweeper-mode-active`:``}`,onClick:()=>o(`mine`),disabled:t||_!==`playing`,"aria-label":`Pickaxe tool`,title:`Reveal cells`,"aria-pressed":a===`mine`,children:(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-mode-icon`,"aria-hidden":!0,children:`⛏`})}),(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-minesweeper-mode ${a===`flag`?`article-web-art-minesweeper-mode-active`:``}`,onClick:()=>o(`flag`),disabled:t||_!==`playing`,"aria-label":`Flag tool`,title:`Place flags`,"aria-pressed":a===`flag`,children:(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-mode-icon`,"aria-hidden":!0,children:`🚩`})})]}),(0,c.jsxs)(`div`,{className:`article-web-art-minesweeper-grid`,children:[C.counts.map((e,n)=>{let i=l.has(n),a=d.has(n),o=C.mines.has(n),s=_===`lost`&&o,u=e>0?p[e-1]:void 0;return(0,c.jsxs)(`button`,{type:`button`,className:`article-web-art-minesweeper-cell ${i?`article-web-art-minesweeper-cell-revealed`:``} ${s?`article-web-art-minesweeper-cell-mine`:``}`,onClick:()=>T(n),disabled:t||_!==`playing`,"aria-label":`Minesweeper cell ${n+1}`,children:[a&&!i?(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-cell-flag`,children:`🚩`}):null,s?(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-cell-mine-icon`,children:`💣`}):null,i&&!o&&e>0?(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-cell-count`,style:{color:u},children:e}):null]},`mine-${r}-${n}`)}),_===`lost`?(0,c.jsxs)(`button`,{type:`button`,className:`article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost`,onClick:w,children:[`Ooohhh 🙁`,(0,c.jsx)(`br`,{}),`Click to try again`]}):null,_===`won`?(0,c.jsxs)(`button`,{type:`button`,className:`article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won`,onClick:w,children:[`👌👀✔💯💯💯`,(0,c.jsx)(`br`,{}),`Click to restart`]}):null]}),(0,c.jsxs)(`div`,{className:`article-web-art-minesweeper-infos`,children:[(0,c.jsxs)(`div`,{className:`article-web-art-minesweeper-counter`,children:[(0,c.jsx)(`span`,{className:`article-web-art-minesweeper-counter-face`,children:D}),(0,c.jsx)(`span`,{children:E})]}),(0,c.jsx)(`div`,{className:`article-web-art-minesweeper-timer`,children:ee})]}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Bomb`})]})})}function ge({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(null),l=(0,s.useRef)(!1),u=(0,s.useRef)(null),d=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),f=(0,s.useMemo)(()=>({reduceMotion:d}),[d]);(0,s.useEffect)(()=>{let t=r.current,s=a.current;if(!t||!s)return;let c=!1,u=null,d=null,p=null,m=()=>{l.current||(l.current=!0,n==null||n(e))},h=_(async()=>{try{var e,n;let r=await i(()=>import(`./fallingRingsEngine-Ct1D9JsP.js`),[]);if(c)return;u=r.createFallingRingsEngine(s,f),o.current=u;let a=()=>y(t,u,Math.min(1.5,window.devicePixelRatio||1));a(),(e=u.renderStatic)==null||e.call(u),(n=u.start)==null||n.call(u),m(),d=new ResizeObserver(()=>{a()}),d.observe(t),`IntersectionObserver`in window&&(p=new IntersectionObserver(e=>{for(let r of e){var t,n;r.isIntersecting?(t=u.start)==null||t.call(u):(n=u.stop)==null||n.call(u)}},{threshold:.25}),p.observe(t))}catch{m()}},{timeoutMs:220});return()=>{var e;c=!0,h==null||h(),p==null||p.disconnect(),d==null||d.disconnect(),u==null||(e=u.destroy)==null||e.call(u),o.current=null}},[f,n,e]);let p=e=>{var t,n,r,i;(t=o.current)==null||(n=t.setHeld)==null||n.call(t,e),(r=o.current)==null||(i=r.start)==null||i.call(r)};return(0,c.jsxs)(`button`,{type:`button`,ref:r,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Falling rings web art tile`,disabled:t,onPointerDown:t?void 0:e=>{u.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}p(!0)},onPointerUp:t?void 0:e=>{(u.current==null||e.pointerId===u.current)&&(u.current=null,p(!1))},onPointerCancel:t?void 0:()=>{u.current=null,p(!1)},onLostPointerCapture:t?void 0:()=>{u.current=null,p(!1)},onMouseEnter:t?void 0:(()=>{var e,t;(e=o.current)==null||(t=e.setHovered)==null||t.call(e,!0)}),onMouseLeave:t?void 0:(()=>{var e,t;(e=o.current)==null||(t=e.setHovered)==null||t.call(e,!1),u.current!=null&&(u.current=null,p(!1))}),onBlur:t?void 0:(()=>{u.current=null,p(!1)}),onKeyDown:t?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),p(!0))},onKeyUp:t?void 0:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),p(!1))},children:[(0,c.jsx)(`canvas`,{ref:a,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Fall`})]})}function _e({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(null),l=(0,s.useRef)(!1),u=(0,s.useRef)(null),d=(0,s.useRef)(`mouse`),f=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),p=(0,s.useMemo)(()=>({reduceMotion:f,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.78,interactionLift:4.5,interactionScale:.15,interactionEmissiveBoost:.72}),[f]);(0,s.useEffect)(()=>{let t=r.current,s=a.current;if(!t||!s)return;let c=!1,u=null,d=null,f=null,m=()=>{l.current||(l.current=!0,n==null||n(e))},h=_(async()=>{try{var e,n;let r=await i(()=>import(`./prismFieldEngine-DKfBiTCD.js`),__vite__mapDeps([10,1]));if(c)return;u=r.createPrismFieldEngine(s,p),o.current=u;let a=()=>y(t,u,Math.min(1.5,window.devicePixelRatio||1));a(),(e=u.renderStatic)==null||e.call(u),(n=u.start)==null||n.call(u),m(),d=new ResizeObserver(()=>{a()}),d.observe(t),`IntersectionObserver`in window&&(f=new IntersectionObserver(e=>{for(let r of e){var t,n;r.isIntersecting?(t=u.start)==null||t.call(u):(n=u.stop)==null||n.call(u)}},{threshold:.25}),f.observe(t))}catch{m()}},{timeoutMs:220});return()=>{var e;c=!0,h==null||h(),f==null||f.disconnect(),d==null||d.disconnect(),u==null||(e=u.destroy)==null||e.call(u),o.current=null}},[p,n,e]);let m=e=>{let t=r.current;if(!t)return{x:.5,y:.5};let n=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(e.clientY-n.top)/Math.max(1,n.height)))}};return(0,c.jsxs)(`button`,{type:`button`,ref:r,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Prism field web art tile`,disabled:t,onClick:t?void 0:(()=>{var e,t,n,r;(e=o.current)==null||(t=e.reset)==null||t.call(e),(n=o.current)==null||(r=n.start)==null||r.call(n)}),onPointerDown:t?void 0:e=>{var t,n;u.current=e.pointerId,d.current=e.pointerType||`mouse`;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let r=m(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onPointerMove:t?void 0:e=>{var t,n;if(u.current!=null&&e.pointerId!==u.current)return;let r=m(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onPointerUp:t?void 0:e=>{if((u.current==null||e.pointerId===u.current)&&(u.current=null,(e.pointerType||d.current)===`mouse`)){var t,n;(t=o.current)==null||(n=t.clearPointer)==null||n.call(t)}},onPointerCancel:t?void 0:(()=>{if(u.current=null,d.current===`mouse`){var e,t;(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}}),onMouseMove:t?void 0:e=>{var t,n;let r=m(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onMouseLeave:t?void 0:(()=>{var e,t;u.current=null,(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:t?void 0:(()=>{var e,t;u.current=null,d.current=`mouse`,(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:t?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n,r,i;e.preventDefault(),(t=o.current)==null||(n=t.reset)==null||n.call(t),(r=o.current)==null||(i=r.start)==null||i.call(r)}}),children:[(0,c.jsx)(`canvas`,{ref:a,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Prism`})]})}function ve({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(null),l=(0,s.useRef)(!1),u=(0,s.useRef)(null),d=(0,s.useRef)(null),f=(0,s.useRef)(!1),p=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),m=(0,s.useMemo)(()=>({reduceMotion:p}),[p]);(0,s.useEffect)(()=>{let t=r.current,s=a.current;if(!t||!s)return;let c=!1,u=null,d=null,f=null,p=()=>{l.current||(l.current=!0,n==null||n(e))},h=_(async()=>{try{var e,n;let r=await i(()=>import(`./ropeLightEngine-6FuqqwKi.js`),[]);if(c)return;u=r.createRopeLightEngine(s,m),o.current=u;let a=()=>y(t,u,Math.min(1.5,window.devicePixelRatio||1));a(),(e=u.renderStatic)==null||e.call(u),(n=u.start)==null||n.call(u),p(),d=new ResizeObserver(()=>{a()}),d.observe(t),`IntersectionObserver`in window&&(f=new IntersectionObserver(e=>{for(let r of e){var t,n;r.isIntersecting?(t=u.start)==null||t.call(u):(n=u.stop)==null||n.call(u)}},{threshold:.25}),f.observe(t))}catch{p()}},{timeoutMs:220});return()=>{var e;c=!0,h==null||h(),f==null||f.disconnect(),d==null||d.disconnect(),u==null||(e=u.destroy)==null||e.call(u),o.current=null}},[m,n,e]);let h=e=>{let t=r.current;if(!t)return{x:.5,y:.5};let n=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(e.clientY-n.top)/Math.max(1,n.height)))}},g=e=>{var t,n,r,i;if(f.current){f.current=!1;return}let a=e?h(e):{x:.5,y:.18};(t=o.current)==null||(n=t.toggleHangAt)==null||n.call(t,a.x,a.y),(r=o.current)==null||(i=r.start)==null||i.call(r)};return(0,c.jsxs)(`button`,{type:`button`,ref:r,className:`article-web-art-tile article-web-art-tile-clickable`,"aria-label":`Rope light web art tile`,disabled:t,onClick:t?void 0:g,onPointerDown:t?void 0:e=>{var t,n;u.current=e.pointerId,f.current=!1,d.current=h(e);try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}(t=o.current)==null||(n=t.setPointer)==null||n.call(t,d.current.x,d.current.y)},onPointerMove:t?void 0:e=>{var t,n;if(u.current!=null&&e.pointerId!==u.current)return;let r=h(e),i=d.current;i&&Math.hypot(r.x-i.x,r.y-i.y)>.025&&(f.current=!0),(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onPointerUp:t?void 0:e=>{var t,n;if(u.current==null||e.pointerId===u.current){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}u.current=null,d.current=null,(t=o.current)==null||(n=t.clearPointer)==null||n.call(t)}},onPointerCancel:t?void 0:(e=>{var t,n;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}u.current=null,d.current=null,f.current=!1,(t=o.current)==null||(n=t.clearPointer)==null||n.call(t)}),onMouseMove:t?void 0:e=>{var t,n;let r=h(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onMouseLeave:t?void 0:(()=>{var e,t;u.current=null,d.current=null,(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:t?void 0:(()=>{var e,t;u.current=null,d.current=null,f.current=!1,(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:t?void 0:(e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),g())}),children:[(0,c.jsx)(`canvas`,{ref:a,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Rope`})]})}var H=[`rotateX(270deg) translateZ(0.5em)`,`rotateY(0deg) translateZ(0.5em)`,`rotateY(90deg) translateZ(0.5em)`,`rotateY(180deg) translateZ(0.5em)`,`rotateY(270deg) translateZ(0.5em)`,`rotateX(90deg) translateZ(0.5em)`],ye=Array.from({length:28},(e,t)=>t);function be(){return(0,c.jsx)(`div`,{className:`article-web-art-soup-backdrop`,"aria-hidden":!0,children:ye.map(e=>(0,c.jsx)(`div`,{className:`article-web-art-soup-cube`,style:{animationDelay:`${e*.06}s`,fontSize:`${e+1}em`,"--soup-cube-depth":`${e/Math.max(1,ye.length-1)}`},children:H.map((e,t)=>(0,c.jsx)(`span`,{className:`article-web-art-soup-face`,style:{transform:e}},t))},e))})}function xe({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(null),l=(0,s.useRef)(!1),u=(0,s.useRef)(null),d=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),f=(0,s.useMemo)(()=>({reduceMotion:d}),[d]);(0,s.useEffect)(()=>{let t=r.current,s=a.current;if(!t||!s)return;let c=!1,u=null,d=null,p=null,m=()=>{l.current||(l.current=!0,n==null||n(e))},h=_(async()=>{try{var e,n;let r=await i(()=>import(`./soupShaderEngine-CWSET0tn.js`),__vite__mapDeps([11,1]));if(c)return;u=r.createSoupShaderEngine(s,f),o.current=u;let a=()=>y(t,u,Math.min(1.5,window.devicePixelRatio||1));a(),(e=u.renderStatic)==null||e.call(u),(n=u.start)==null||n.call(u),m(),d=new ResizeObserver(()=>{a()}),d.observe(t),`IntersectionObserver`in window&&(p=new IntersectionObserver(e=>{for(let r of e){var t,n;r.isIntersecting?(t=u.start)==null||t.call(u):(n=u.stop)==null||n.call(u)}},{threshold:.25}),p.observe(t))}catch{m()}},{timeoutMs:220});return()=>{var e;c=!0,h==null||h(),p==null||p.disconnect(),d==null||d.disconnect(),u==null||(e=u.destroy)==null||e.call(u),o.current=null}},[f,n,e]);let p=e=>{let t=r.current;if(!t)return{x:.5,y:.5};let n=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(e.clientY-n.top)/Math.max(1,n.height)))}};return(0,c.jsxs)(`button`,{type:`button`,ref:r,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile`,"aria-label":`Soup shader web art tile`,disabled:t,onPointerDown:t?void 0:e=>{var t,n,r,i;u.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let a=p(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,a.x,a.y),(r=o.current)==null||(i=r.setHeld)==null||i.call(r,!0)},onPointerMove:t?void 0:e=>{var t,n;if(u.current!=null&&e.pointerId!==u.current)return;let r=p(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onPointerUp:t?void 0:e=>{var t,n;(u.current==null||e.pointerId===u.current)&&(u.current=null,(t=o.current)==null||(n=t.setHeld)==null||n.call(t,!1))},onPointerCancel:t?void 0:(()=>{var e,t;u.current=null,(e=o.current)==null||(t=e.setHeld)==null||t.call(e,!1)}),onMouseMove:t?void 0:e=>{var t,n;let r=p(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y)},onMouseLeave:t?void 0:(()=>{var e,t,n,r;u.current=null,(e=o.current)==null||(t=e.setHeld)==null||t.call(e,!1),(n=o.current)==null||(r=n.clearPointer)==null||r.call(n)}),onBlur:t?void 0:(()=>{var e,t,n,r;u.current=null,(e=o.current)==null||(t=e.setHeld)==null||t.call(e,!1),(n=o.current)==null||(r=n.clearPointer)==null||r.call(n)}),children:[(0,c.jsx)(be,{}),(0,c.jsx)(`canvas`,{ref:a,className:`article-web-art-canvas`}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Soup`})]})}function Se({readyId:e,locked:t,onReady:n}){let r=(0,s.useRef)(null),a=(0,s.useRef)(null),o=(0,s.useRef)(null),l=(0,s.useRef)(!1),u=(0,s.useRef)(null),d=(0,s.useRef)(null),f=(0,s.useRef)(0),[p,m]=(0,s.useState)(!1),[h,g]=(0,s.useState)([]),v=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),b=(0,s.useMemo)(()=>({reduceMotion:v}),[v]);(0,s.useEffect)(()=>{let t=r.current,s=a.current;if(!t||!s)return;let c=!1,u=null,d=null,f=null,p=()=>{l.current||(l.current=!0,n==null||n(e))},m=_(async()=>{try{var e,n;let r=await i(()=>import(`./tardisWormholeEngine-BS0spwg9.js`),__vite__mapDeps([12,1]));if(c)return;u=r.createTardisWormholeEngine(s,b),o.current=u;let a=()=>y(t,u,Math.min(1.5,window.devicePixelRatio||1));a(),(e=u.renderStatic)==null||e.call(u),(n=u.start)==null||n.call(u),p(),d=new ResizeObserver(()=>{a()}),d.observe(t),`IntersectionObserver`in window&&(f=new IntersectionObserver(e=>{for(let r of e){var t,n;r.isIntersecting?(t=u.start)==null||t.call(u):(n=u.stop)==null||n.call(u)}},{threshold:.25}),f.observe(t))}catch{p()}},{timeoutMs:220});return()=>{var e;c=!0,m==null||m(),f==null||f.disconnect(),d==null||d.disconnect(),u==null||(e=u.destroy)==null||e.call(u),o.current=null}},[b,n,e]),(0,s.useEffect)(()=>{if(h.length===0)return;let e=window.setTimeout(()=>{g(e=>e.slice(1))},1e3);return()=>{window.clearTimeout(e)}},[h]),(0,s.useEffect)(()=>{var e;let n=o.current;if(n){if(t){var r,i;m(!1),d.current=null,(r=n.clearPointer)==null||r.call(n),(i=n.stop)==null||i.call(n);return}(e=n.start)==null||e.call(n)}},[t]);let x=e=>{let t=r.current,n=a.current||t;if(!t||!n)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};let i=n.getBoundingClientRect(),o=t.getBoundingClientRect(),s=Math.max(0,Math.min(o.width,e.clientX-o.left)),c=Math.max(0,Math.min(o.height,e.clientY-o.top)),l=Math.max(0,Math.min(i.width,e.clientX-i.left)),u=Math.max(0,Math.min(i.height,e.clientY-i.top)),f=d.current,p=f?l-f.px:0,m=f?u-f.py:0;return d.current={px:l,py:u},{x:i.width>0?l/i.width:.5,y:i.height>0?u/i.height:.5,px:s,py:c,dx:p,dy:m}},S=(e,t)=>{let n=f.current++;g(r=>[...r,{id:n,x:e,y:t}])};return(0,c.jsxs)(`button`,{type:`button`,ref:r,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${p?`article-web-art-tile-tardis-boost`:``}`,"aria-label":`Tardis wormhole web art tile`,disabled:t,onClick:t?void 0:e=>{var t,n,r,i;let a=x(e);S(a.px,a.py),(t=o.current)==null||(n=t.boost)==null||n.call(t),(r=o.current)==null||(i=r.start)==null||i.call(r),m(!0),window.setTimeout(()=>{m(!1)},650)},onContextMenu:t?void 0:(e=>{var t,n,r,i;e.preventDefault();let a=x(e);S(a.px,a.py),(t=o.current)==null||(n=t.reverseBurst)==null||n.call(t),(r=o.current)==null||(i=r.start)==null||i.call(r)}),onWheel:t?void 0:(e=>{var t,n;(t=o.current)==null||(n=t.addScrollBoost)==null||n.call(t,e.deltaY*.003)}),onPointerDown:t?void 0:e=>{var t,n;u.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}let r=x(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y,r.dx,r.dy)},onPointerMove:t?void 0:e=>{var t,n;if(u.current!=null&&e.pointerId!==u.current)return;let r=x(e);if((t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y,r.dx,r.dy),(e.buttons&1)==1){var i,a;(i=o.current)==null||(a=i.drag)==null||a.call(i,r.dx)}},onPointerUp:t?void 0:e=>{(u.current==null||e.pointerId===u.current)&&(u.current=null)},onPointerCancel:t?void 0:(()=>{u.current=null}),onMouseMove:t?void 0:e=>{var t,n;let r=x(e);(t=o.current)==null||(n=t.setPointer)==null||n.call(t,r.x,r.y,r.dx,r.dy)},onMouseLeave:t?void 0:(()=>{var e,t;u.current=null,d.current=null,(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onBlur:t?void 0:(()=>{var e,t;u.current=null,d.current=null,(e=o.current)==null||(t=e.clearPointer)==null||t.call(e)}),onKeyDown:t?void 0:(e=>{if(e.key===`Enter`||e.key===` `){var t,n,r,i;e.preventDefault(),(t=o.current)==null||(n=t.boost)==null||n.call(t),(r=o.current)==null||(i=r.start)==null||i.call(r)}}),children:[(0,c.jsx)(`canvas`,{ref:a,className:`article-web-art-canvas`}),(0,c.jsx)(`div`,{className:`article-web-art-tardis-overlay`,"aria-hidden":!0}),(0,c.jsx)(`div`,{className:`article-web-art-tardis-scanlines`,"aria-hidden":!0}),(0,c.jsx)(`div`,{className:`article-web-art-tardis-grain`,"aria-hidden":!0}),(0,c.jsx)(`div`,{className:`article-web-art-tardis-speed-lines`,"aria-hidden":!0}),(0,c.jsx)(`div`,{className:`article-web-art-tardis-boost-vignette`,"aria-hidden":!0}),h.map(e=>(0,c.jsx)(`div`,{className:`article-web-art-tardis-ripple`,style:{left:`${e.x}px`,top:`${e.y}px`},"aria-hidden":!0},e.id)),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Tardis`})]})}function Ce({label:e,clickLabel:t,previewRequested:n=!1}){let r=a(),i=(0,s.useRef)(null),[o,l]=(0,s.useState)(!1),[u,d]=(0,s.useState)(0),f=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),p=(0,s.useCallback)(()=>{d(Date.now()),l(!0)},[]),m=(0,s.useCallback)(()=>{var e;r==null||(e=r.navigateToSectionWithId)==null||e.call(r,`contact`)},[r]),h=e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),p())},g=(0,s.useMemo)(()=>o?te({seed:`${u||Date.now()}:${e}`,reduceMotion:f}):``,[e,o,u,f]);return(0,s.useEffect)(()=>{let e=0,t=0;return n?(e=window.requestAnimationFrame(()=>{t=window.requestAnimationFrame(()=>{d(Date.now()),l(!0)})}),()=>{e&&window.cancelAnimationFrame(e),t&&window.cancelAnimationFrame(t)}):(l(!1),()=>{e&&window.cancelAnimationFrame(e),t&&window.cancelAnimationFrame(t)})},[n]),(0,c.jsxs)(`div`,{ref:i,role:`button`,tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${o?`article-web-art-tile-cta-open`:`article-web-art-tile-cta-closed`}`,"aria-label":o?`Kontakt preview`:e,"aria-pressed":o,onClick:p,onKeyDown:h,children:[(0,c.jsxs)(`div`,{className:`article-web-art-tile-cta-preview ${o?`article-web-art-tile-cta-preview-visible`:``}`,"aria-hidden":!0,children:[o&&(0,c.jsx)(`iframe`,{className:`article-web-art-tile-cta-preview-frame`,title:`Send yours preview`,srcDoc:g,sandbox:`allow-scripts`},`${u}-${e}`),(0,c.jsx)(`div`,{className:`article-web-art-tile-cta-preview-vignette`})]}),!o&&(0,c.jsx)(`div`,{className:`loader ${f?`loader-reduce-motion`:``}`,"aria-hidden":!0,children:(0,c.jsxs)(`div`,{className:`loader-inner`,children:[(0,c.jsx)(`div`,{className:`loader-line-wrap`,children:(0,c.jsx)(`div`,{className:`loader-line`})}),(0,c.jsx)(`div`,{className:`loader-line-wrap`,children:(0,c.jsx)(`div`,{className:`loader-line`})}),(0,c.jsx)(`div`,{className:`loader-line-wrap`,children:(0,c.jsx)(`div`,{className:`loader-line`})}),(0,c.jsx)(`div`,{className:`loader-line-wrap`,children:(0,c.jsx)(`div`,{className:`loader-line`})}),(0,c.jsx)(`div`,{className:`loader-line-wrap`,children:(0,c.jsx)(`div`,{className:`loader-line`})})]})}),(0,c.jsxs)(`div`,{className:`article-web-art-tile-cta-content ${o?`article-web-art-tile-cta-content-hidden`:``}`,children:[(0,c.jsx)(`div`,{className:`article-web-art-tile-cta-title article-web-art-tile-cta-title-top`,children:e}),(0,c.jsx)(`div`,{className:`article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom`,children:t})]}),o&&(0,c.jsx)(`button`,{type:`button`,className:`article-web-art-tile-cta-contact-pill`,onClick:e=>{e.stopPropagation(),m()},onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),e.stopPropagation(),m())},children:`Kontakt`})]})}function we({readyId:e,locked:t=!1,onReady:n}){let r=(0,s.useRef)(null),i=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]),a=(0,s.useRef)(!1),o=(0,s.useRef)(0),l=(0,s.useRef)(null),u=(0,s.useRef)(null),d=(0,s.useRef)(1),f=(0,s.useRef)(null),p=(0,s.useRef)(null),m=(0,s.useRef)(null),h=(0,s.useRef)([]);return(0,s.useEffect)(()=>{n==null||n(e)},[n,e]),(0,s.useEffect)(()=>{let e=r.current;if(!e)return;let n=e=>{let t=Math.max(0,Math.min(1,e));return t*t*(3-2*t)},s=()=>{if(h.current.length)return h.current.filter(e=>e.playState!==`idle`);let t=e.querySelectorAll(`.fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin`),n=[];for(let e of t){let t=e.getAnimations?e.getAnimations():[];for(let e of t)n.push(e)}return h.current=n,h.current},c=e=>{let t=Math.max(1,Math.min(5.2,Number(e)||1));d.current=t;let n=s();for(let e of n)e.playbackRate=e.animationName===`wiggle-end`?Math.min(t,2.6):t},g=()=>{p.current!=null&&cancelAnimationFrame(p.current),m.current!=null&&window.clearTimeout(m.current),p.current=null,m.current=null},_=()=>{g(),c(5.2),m.current=window.setTimeout(()=>{let e=d.current,t=performance.now(),r=()=>{let i=(performance.now()-t)/320,a=n(i);c(e+(1-e)*a),i<1?p.current=requestAnimationFrame(r):p.current=null};p.current=requestAnimationFrame(r),m.current=null},2e3)},v=()=>{var t;let r=l.current;if(a.current=!1,l.current=null,e.classList.remove(`article-web-art-tile-goldfish-held`),u.current!=null&&cancelAnimationFrame(u.current),u.current=null,r!=null&&(t=e.hasPointerCapture)!=null&&t.call(e,r))try{e.releasePointerCapture(r)}catch{}let i=d.current,o=performance.now();f.current!=null&&cancelAnimationFrame(f.current);let s=()=>{let e=(performance.now()-o)/360,t=n(e);c(i+(1-i)*t),e<1?f.current=requestAnimationFrame(s):f.current=null};f.current=requestAnimationFrame(s)},y=()=>{a.current&&v()},b=()=>{if(!a.current)return;let e=performance.now()-o.current,t=1.2+4*n(e/2400);c(t),u.current=requestAnimationFrame(b)},x=n=>{if(!(i||t)&&(n.button==null||n.button===0)&&!(a.current&&l.current!==n.pointerId)){g(),a.current=!0,o.current=performance.now(),l.current=n.pointerId,e.classList.add(`article-web-art-tile-goldfish-held`);try{e.setPointerCapture(n.pointerId)}catch{}f.current!=null&&(cancelAnimationFrame(f.current),f.current=null),u.current??(u.current=requestAnimationFrame(b))}},S=e=>{if(l.current!==e.pointerId)return;let t=performance.now()-o.current;v(),t<220&&_()},C=e=>{l.current===e.pointerId&&y()},w=e=>{l.current===e.pointerId&&y()};return e.addEventListener(`pointerdown`,x),e.addEventListener(`pointerup`,S),e.addEventListener(`pointercancel`,C),e.addEventListener(`lostpointercapture`,w),()=>{e.removeEventListener(`pointerdown`,x),e.removeEventListener(`pointerup`,S),e.removeEventListener(`pointercancel`,C),e.removeEventListener(`lostpointercapture`,w),y(),g(),f.current!=null&&cancelAnimationFrame(f.current),f.current=null,h.current=[]}},[t,i]),(0,s.useEffect)(()=>{let e=r.current;e&&e.classList.toggle(`article-web-art-tile-goldfish-locked`,t)},[t]),(0,c.jsxs)(`div`,{className:`article-web-art-tile article-web-art-tile-goldfish`,ref:r,role:`img`,"aria-label":`Goldfish animation tile`,children:[(0,c.jsx)(`div`,{className:`fish-stage`,children:(0,c.jsx)(`div`,{className:`fish-wrapper`,children:(0,c.jsx)(`div`,{className:`fish-container`,children:(0,c.jsxs)(`div`,{className:`fish-parts`,children:[(0,c.jsx)(`div`,{className:`fish-body front`}),(0,c.jsx)(`div`,{className:`fish-body back`}),(0,c.jsx)(`div`,{className:`fish-back-bottom-fin front`}),(0,c.jsx)(`div`,{className:`fish-back-bottom-fin back`}),(0,c.jsx)(`div`,{className:`fish-back-fin`}),(0,c.jsx)(`div`,{className:`fish-front-bottom-fin front`}),(0,c.jsx)(`div`,{className:`fish-front-bottom-fin back`}),(0,c.jsx)(`div`,{className:`fish-top-fin`})]})})})}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Fish`})]})}function Te({locked:e=!1}){let t=(0,s.useRef)(null),n=(0,s.useRef)([]),r=(0,s.useRef)(0),i=(0,s.useRef)(0),a=E,o=(0,s.useMemo)(()=>typeof window>`u`||!window.matchMedia?!1:window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,[]);return(0,s.useEffect)(()=>{let a=t.current;if(!a)return;let s=n.current.filter(Boolean);if(!s.length)return;let c=!0,l=!1,u=null,d=null,f=(e,t)=>{let n=(e-.5)*30;for(let r=0;r<s.length;r++){let i=s[r],a=r*18,o=r*8,c=(e-.5)*a,l=(t-.5)*o;i.style.transform=`translate3d(${c}px, ${l}px, 0) rotateY(${n}deg)`}},p=(e,t)=>{let n=Math.max(-.55,Math.min(.55,(e-.5)*1.1)),r=Math.max(-.35,Math.min(.35,(t-.5)*.7));f(.5+n,.5+r)},m=e=>{let t=a.getBoundingClientRect(),n=(e.clientX-t.left)/Math.max(1,t.width),r=(e.clientY-t.top)/Math.max(1,t.height);c=!0,i.current=performance.now()+650,p(Math.max(0,Math.min(1,n)),Math.max(0,Math.min(1,r)))},h=e=>{let t=a.getBoundingClientRect(),n=(e.clientX-t.left)/Math.max(1,t.width),r=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,n)),y:Math.max(0,Math.min(1,r))}},g=e=>{if(e.pointerType===`mouse`)return;l=!0,u=e.pointerId,c=!0,i.current=performance.now()+900;let t=h(e);p(t.x,t.y),!o&&d==null&&(d=requestAnimationFrame(x))},_=e=>{if(!l||u!=null&&e.pointerId!==u)return;c=!0,i.current=performance.now()+900;let t=h(e);p(t.x,t.y)},v=e=>{(u==null||(e==null?void 0:e.pointerId)==null||e.pointerId===u)&&(l=!1,u=null,c=!0,!o&&d==null&&(d=requestAnimationFrame(x)))},y=()=>{c=!0,!o&&d==null&&(d=requestAnimationFrame(x))},b=()=>{c=!0,!o&&d==null&&(d=requestAnimationFrame(x))},x=()=>{if(c){if(!o&&performance.now()>=i.current){r.current+=.008;let e=Math.sin(r.current)*.5+.5;p(e,.5)}d=requestAnimationFrame(x)}};return c=!e,a.addEventListener(`mouseenter`,y),a.addEventListener(`mousemove`,m),a.addEventListener(`mouseleave`,b),a.addEventListener(`pointerdown`,g),a.addEventListener(`pointermove`,_),a.addEventListener(`pointerup`,v),a.addEventListener(`pointercancel`,v),p(.5,.5),!o&&!e&&(d=requestAnimationFrame(x)),()=>{a.removeEventListener(`mouseenter`,y),a.removeEventListener(`mousemove`,m),a.removeEventListener(`mouseleave`,b),a.removeEventListener(`pointerdown`,g),a.removeEventListener(`pointermove`,_),a.removeEventListener(`pointerup`,v),a.removeEventListener(`pointercancel`,v),d!=null&&cancelAnimationFrame(d)}},[o]),(0,c.jsxs)(`div`,{ref:t,className:`article-web-art-tile article-web-art-tile-patronus`,role:`img`,"aria-label":`Patronus parallax tile`,children:[(0,c.jsxs)(`div`,{className:`patronus-card`,children:[(0,c.jsx)(`div`,{className:`patronus-layer patronus-bg`,ref:e=>{n.current[0]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[0]})}),(0,c.jsx)(`div`,{className:`patronus-layer`,ref:e=>{n.current[1]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[1]})}),(0,c.jsx)(`div`,{className:`patronus-layer`,ref:e=>{n.current[2]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[2]})}),(0,c.jsx)(`div`,{className:`patronus-layer patronus-svg`,ref:e=>{n.current[3]=e},dangerouslySetInnerHTML:{__html:d}}),(0,c.jsx)(`div`,{className:`patronus-layer`,ref:e=>{n.current[4]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[3]})}),(0,c.jsx)(`div`,{className:`patronus-layer`,ref:e=>{n.current[5]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[4]})}),(0,c.jsx)(`div`,{className:`patronus-layer`,ref:e=>{n.current[6]=e},children:(0,c.jsx)(`img`,{alt:``,src:a[5]})})]}),(0,c.jsx)(`span`,{className:`article-web-art-tile-label`,children:`Patronus`})]})}export{M as default};