const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/androidBackgroundEngine-HmTe5YFf.js","assets/three-Dyw0HQ4s.js","assets/hourglassEngine-Dqm3jFyu.js","assets/physics-DDoeCzdI.js","assets/react-vendor-DdDVJuhO.js","assets/threeTunnelEngine-BYxOaRL9.js","assets/threePolygonDemo5Engine-J7VS_NUu.js","assets/prismFieldEngine-BvTSiE5I.js","assets/soupShaderEngine-BVaccG7j.js","assets/tardisWormholeEngine-Czkyopnk.js"])))=>i.map(i=>d[i]);
import{d as ut,i as Je,A as ze,_ as z}from"./index-BZJpSXwh.js";import{r as a,j as f}from"./react-vendor-DdDVJuhO.js";/* empty css              */import"./bootstrap-BTe74g_4.js";import"./vendor-C2MEJuly.js";function dt({slides:m,onChange:p,onPin:y,onUnpin:d,pinnedIds:R=[],maxPinned:w=3,labels:I={},enabled:l=!0}){const[C,g]=a.useState(0),[k,v]=a.useState([0]),[b,o]=a.useState("initial"),e=a.useRef(null),r=m.length,t=r?Math.min(C,r-1):0,i=m[t],n=r>1?(t+1)%r:null,s=[...k].reverse().find(j=>j!==t&&j<r),c=s??(r>1?(t-1+r)%r:null),u=R.map(j=>m.find(L=>L.id===j)).filter(j=>j&&j.id!==(i==null?void 0:i.id)),h=!!(i&&R.includes(i.id)),x=!!(y&&(i==null?void 0:i.pinnable)!==!1&&(h||R.length<w));if(!r)return null;const M=j=>{!l||j===null||j===t||!m[j]||(o(j===n?"next":j===c?"last":"jump"),g(j),v(L=>[...L,j].slice(-8)),p==null||p(j,m[j]))},N=j=>{!l||j.pointerType==="mouse"||(e.current={x:j.clientX,y:j.clientY})},E=j=>{const L=e.current;if(e.current=null,!L||!l)return;const D=j.clientX-L.x,O=j.clientY-L.y;Math.abs(D)<58||Math.abs(D)<Math.abs(O)*1.35||M(D>0?n:c)},S=()=>{if(!(!i||!x)){if(h){d==null||d(i.id);return}y==null||y(i.id);for(let j=1;j<r;j++){const L=(t+j)%r;if(!(m[L].pinnable===!1||R.includes(m[L].id))){M(L);break}}}},_=(j,L)=>j===null?null:f.jsxs("button",{type:"button",className:`layered-card-carousel-side layered-card-carousel-side-${L}`,style:{"--carousel-preview-hue":(j*37+195)%360},onClick:()=>M(j),disabled:!l,"aria-label":`${L==="next"?I.next||"Next artwork":s===void 0?I.previous||"Previous artwork":I.last||"Last viewed artwork"}: ${j+1}, ${m[j].label}`,children:[f.jsx("span",{className:"layered-card-carousel-side-number","aria-hidden":"true",children:String(j+1).padStart(2,"0")}),f.jsx("span",{className:"layered-card-carousel-side-label","aria-hidden":"true",children:m[j].label})]},`${L}-${m[j].id}`);return f.jsxs("div",{className:`layered-card-carousel${u.length?" layered-card-carousel-multiview":""}`,"aria-label":I.gallery||"Artwork gallery",children:[f.jsxs("div",{className:"layered-card-carousel-workspace","data-view-count":u.length+1,children:[f.jsxs("div",{className:"layered-card-carousel-stage",onPointerDown:N,onPointerUp:E,onPointerCancel:()=>{e.current=null},children:[_(n,"next"),_(c,"last"),f.jsx("div",{className:`layered-card-carousel-current layered-card-carousel-current-${b}`,role:"group","aria-label":`${t+1} / ${r}: ${i.label}`,children:i.content},i.id),l&&y&&i.pinnable!==!1&&f.jsx("button",{type:"button",className:`layered-card-carousel-pin${h?" is-pinned":""}`,onClick:S,disabled:!x,"aria-label":h?I.unpin||"Remove from simultaneous view":x?I.pin||"Add to simultaneous view":I.pinLimit||"Three extra artworks are already open",title:h?I.unpin||"Remove from simultaneous view":x?I.pin||"Add to simultaneous view":I.pinLimit||"Three extra artworks are already open",children:f.jsxs("svg",{viewBox:"0 0 20 20","aria-hidden":"true",focusable:"false",children:[f.jsx("rect",{x:"3.5",y:"3.5",width:"13",height:"13",rx:"2",fill:"none",stroke:"currentColor",strokeWidth:"1.5"}),h?f.jsx("path",{d:"M6.5 10h7"}):f.jsx("path",{d:"M6.5 10h7M10 6.5v7"})]})})]}),u.map(j=>f.jsxs("div",{className:"layered-card-carousel-pinned",role:"group","aria-label":`${I.pinned||"Open artwork"}: ${j.label}`,children:[j.content,f.jsx("button",{type:"button",className:"layered-card-carousel-unpin",onClick:()=>d==null?void 0:d(j.id),"aria-label":`${I.unpin||"Remove from simultaneous view"}: ${j.label}`,children:f.jsx("svg",{viewBox:"0 0 20 20","aria-hidden":"true",focusable:"false",children:f.jsx("path",{d:"M5 5 15 15M15 5 5 15"})})})]},j.id))]}),f.jsx("nav",{className:"layered-card-carousel-index","aria-label":I.jump||"Choose artwork",children:m.map((j,L)=>{const D=[...k].reverse().indexOf(L),O=D>0&&D<=5;return f.jsx("button",{type:"button",className:`layered-card-carousel-index-button${L===t?" is-current":""}${O?" is-recent":""}`,style:O?{"--carousel-trail-percent":`${Math.max(12,100-D*18)}%`}:void 0,onClick:()=>M(L),"aria-current":L===t?"true":void 0,"aria-label":`${I.jumpTo||"Show artwork"} ${L+1}: ${j.label}`,children:L+1},j.id)})})]})}const ft=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`,ht=`function Mash(seed) {
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
`;function q(m,{timeoutMs:p=1200}={}){if(typeof window>"u")return m(),()=>{};if("requestIdleCallback"in window){const d=window.requestIdleCallback(()=>m(),{timeout:p});return()=>window.cancelIdleCallback(d)}const y=window.setTimeout(()=>m(),0);return()=>window.clearTimeout(y)}function $e(m){var l,C,g,k;if(!m)return{width:1,height:1};const p=m.getBoundingClientRect(),y=(C=(l=m.parentElement)==null?void 0:l.getBoundingClientRect)==null?void 0:C.call(l),d=(y==null?void 0:y.width)||((g=m.parentElement)==null?void 0:g.clientWidth)||1,R=(y==null?void 0:y.height)||((k=m.parentElement)==null?void 0:k.clientHeight)||d,w=Math.max(1,Math.round(p.width||m.clientWidth||d)),I=Math.max(1,Math.round(p.height||m.clientHeight||R));return{width:w,height:I}}function $(m,p,y=1){var l,C,g;const{width:d,height:R}=$e(m),w=typeof window<"u"&&((C=(l=window.matchMedia)==null?void 0:l.call(window,"(pointer: coarse)"))==null?void 0:C.matches),I=Math.min(w?1:1.5,Math.max(1,Number(y)||1));if((d<32||R<32)&&typeof window<"u"){window.requestAnimationFrame(()=>{var v;const k=$e(m);k.width>=32&&k.height>=32&&((v=p==null?void 0:p.setSize)==null||v.call(p,k.width,k.height,I))});return}(g=p==null?void 0:p.setSize)==null||g.call(p,d,R,I)}const Fe=248,bt=460,K={PREVIEW:"preview",EXPANDING:"expanding",OPEN:"open",COLLAPSING:"collapsing"};function qe(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function ve(m){if(!m)return Fe;const p=window.getComputedStyle(m).getPropertyValue("--article-web-art-stage-preview-height"),y=Number.parseFloat(p);return Number.isFinite(y)&&y>0?Math.ceil(y):Fe}const pt=9,mt=9,wt=10,xt=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],Qe=6,vt=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function ke(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(pointer: coarse), (max-width: 767px)").matches}function Ve(m){const p=new Set(m);if(!ke())return p;for(;p.size>Qe;)p.delete(p.values().next().value);return p}function Pe(m){if(!ke())return new Set(m);const p=new Set;for(const y of m){if(p.size>=Qe)break;p.add(y)}return p}function Ge(m,p){if(p.size===0)return!1;for(const y of p)if(!m.has(y))return!1;return!0}function yt(m=pt,p=mt,y=wt){const d=m*p,R=Math.max(1,Math.min(y,d-1)),w=new Set;for(;w.size<R;)w.add(Math.floor(Math.random()*d));const I=new Array(d).fill(0);for(let l=0;l<d;l++){if(w.has(l)){I[l]=-1;continue}const C=l%p,g=Math.floor(l/p);let k=0;for(let v=-1;v<=1;v++)for(let b=-1;b<=1;b++){if(b===0&&v===0)continue;const o=C+b,e=g+v;o<0||e<0||o>=p||e>=m||w.has(e*p+o)&&(k+=1)}I[l]=k}return{rows:m,cols:p,mineCount:R,mines:w,counts:I}}function gt(m,p,y,d){const R=new Set(y),w=[m];for(;w.length>0;){const I=w.pop();if(I==null||R.has(I)||d.has(I)||p.mines.has(I)||(R.add(I),p.counts[I]!==0))continue;const l=I%p.cols,C=Math.floor(I/p.cols);for(let g=-1;g<=1;g++)for(let k=-1;k<=1;k++){if(k===0&&g===0)continue;const v=l+k,b=C+g;v<0||b<0||v>=p.cols||b>=p.rows||w.push(b*p.cols+v)}}return R}function Ke(m,p,y){const d=m.rows*m.cols-m.mineCount;if(p.size>=d)return!0;if(y.size!==m.mineCount)return!1;for(const R of m.mines)if(!y.has(R))return!1;return!0}function Mt(m){return`Web art ${String(m||"tile").toLowerCase()} tile loading`}function Rt({seed:m,reduceMotion:p}){const y=JSON.stringify(ht.split("<\/script>").join("<\\/script>")),d=JSON.stringify(m);return`<!doctype html>
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
    reduceMotion: ${p?"true":"false"},
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
</html>`}function Ye(m){return Array.isArray(m)?m.map((p,y)=>{const d=p!=null&&p.tone?` article-web-art-intro-guide-fragment-${p.tone}`:"";return f.jsx("span",{className:`article-web-art-intro-guide-fragment${d}`,children:p==null?void 0:p.text},`${(p==null?void 0:p.text)||"fragment"}-${y}`)}):m}function or({dataWrapper:m,id:p}){var He;const y=ut(),d=Je(),R=`${m.uniqueId}-ambient-trace`,w=`${m.uniqueId}-ambient-hex`,I=`${m.uniqueId}-ambient-plop`,l=`${m.uniqueId}-ambient-julia`,C=`${m.uniqueId}-ambient-mines`,g=`${m.uniqueId}-ambient-rings`,k=`${m.uniqueId}-ambient-prism`,v=`${m.uniqueId}-ambient-rope`,b=`${m.uniqueId}-ambient-soup`,o=`${m.uniqueId}-ambient-tardis`,[e,r]=a.useState(null),[t,i]=a.useState(!0),n=m.settings.webArtPresentation!=="grid",s=a.useMemo(()=>m.orderedItems,[m.orderedItems]),c=a.useMemo(()=>{const P=[4,5,3,6,1,2,7,8,9,10,11,12,13,14,15],T=new Map(s.map(H=>[Number(H==null?void 0:H.id),H])),A=[];for(const H of P){const F=T.get(H);F&&A.push(F)}for(const H of s){if(!H)continue;const F=Number(H==null?void 0:H.id);P.includes(F)||A.push(H)}return A},[s]),u=a.useRef(null),h=a.useRef(null),x=a.useRef(K.PREVIEW),M=a.useRef([]),N=a.useRef(null),E=a.useRef(new Set),S=a.useRef(null),[_,j]=a.useState(K.PREVIEW),[L,D]=a.useState(null),[O,B]=a.useState(!1),V=a.useRef(new Set),G=a.useRef(new Map),[ne,ee]=a.useState(0),[ye,ge]=a.useState(-1),[J,Q]=a.useState(()=>new Set),[ue,W]=a.useState(()=>new Set),[de,fe]=a.useState([]),[Ie,Me]=a.useState(null),[Se,ie]=a.useState(!1),ae=a.useMemo(()=>{const P=c.map(T=>T==null?void 0:T.uniqueId).filter(Boolean);return P.push(R,w,I,l,C,k,g,v,b,o,"ambient-goldfish","ambient-patronus"),new Set(P)},[w,l,C,I,k,g,v,b,o,R,c]),Ne=a.useMemo(()=>Array.from(ue).filter(P=>P!=="ambient-goldfish"&&P!=="ambient-patronus"),[ue]),Y=t,he=y.selectedLanguageId||"en";a.useEffect(()=>{E.current=J},[J]);const U=a.useCallback(P=>{x.current=P,j(P)},[]),Z=a.useCallback(()=>{if(!(typeof window>"u")){for(const P of M.current)window.cancelAnimationFrame(P);M.current=[],N.current!==null&&(window.clearTimeout(N.current),N.current=null)}},[]);let se=y.getString("send_yours");typeof se=="string"&&se.startsWith("locale:")&&(se={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[he]||"Send yours!");let ce=y.getString("click");typeof ce=="string"&&ce.startsWith("locale:")&&(ce={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[he]||"Click");const je={en:{title:"Doors of the world behind an amazing art gallery.",guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",guide:{eyebrow:"So funktioniert es",lines:["Betritt die Galerie und schau dir die Karten in Ruhe an.","Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.","Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."]},button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",guide:{eyebrow:"Kako istraživati",lines:["Uđi u galeriju i istražuj kartice svojim tempom.","Klikni, dodirni ili pritisni karticu da otkriješ što skriva.","Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme."]},button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",guide:{eyebrow:"Nasıl gezilir",lines:["Galeriye girin ve kartları kendi temponuzda inceleyin.","İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.","Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir."]},button:"Gir",preparing:"Hazırlanıyor..."}}[he]||{guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter"},We="hide",X=a.useCallback(P=>{if(!P||V.current.has(P))return;V.current.add(P);const T=G.current.get(P);T!=null&&(window.clearTimeout(T),G.current.delete(P)),ee(V.current.size)},[]),Ee=a.useCallback(P=>{P&&W(T=>{if(T.has(P))return T;const A=new Set(T);return A.add(P),Ve(A)})},[]),be=a.useCallback(()=>{Q(P=>P.size?new Set:P),W(P=>P.size?new Set:P),ie(!1)},[]),oe=a.useCallback(()=>{for(const P of G.current.values())window.clearTimeout(P);G.current=new Map,V.current=new Set,ee(0),ge(-1),B(!1),Q(new Set),W(new Set),fe([]),Me(null),ie(!1)},[]),pe=a.useCallback(()=>{Z(),D(null),U(K.OPEN)},[Z,U]),me=a.useCallback(()=>{Z(),oe(),D(null),U(K.PREVIEW)},[Z,oe,U]),we=a.useCallback(P=>{typeof window>"u"||(N.current!==null&&window.clearTimeout(N.current),N.current=window.setTimeout(()=>{N.current=null,x.current===P&&(P===K.EXPANDING?pe():P===K.COLLAPSING&&me())},bt))},[me,pe]),xe=a.useCallback(()=>{const P=Pe(ae);W(P),Q(new Set(P)),ie(!ke())},[ae]),Re=a.useCallback(({openAll:P=!1}={})=>{var le;Z();const T=qe(),A=h.current,H=ve(A);if(T?(D(null),U(K.OPEN)):(D(Math.max(H,Math.ceil((A==null?void 0:A.offsetHeight)||H))),U(K.EXPANDING)),i(!1),B(!0),ge(c.length-1),n){const te=(le=c[0])==null?void 0:le.uniqueId;fe([]),Me(te||null),Q(new Set(te?[te]:[])),W(new Set(te?[te]:[])),ie(!1)}else P?xe():(Q(new Set),W(new Set),ie(!1));if(T||typeof window>"u")return;const F=window.requestAnimationFrame(()=>{const te=window.requestAnimationFrame(()=>{const re=h.current,Be=ve(re),lt=Math.max(Be,Math.ceil((re==null?void 0:re.scrollHeight)||(re==null?void 0:re.offsetHeight)||Be));D(lt),we(K.EXPANDING)});M.current.push(te)});M.current.push(F)},[Z,c,xe,we,U,n]);a.useEffect(()=>{var T;if(typeof window>"u"||((T=d.targetSection)==null?void 0:T.id)!==m.sectionId||d.transitionStatus!=="transition_status_none")return;const P=window.__pendingSectionAction;if(P&&P.action==="enter"&&P.sectionId===m.sectionId&&!(P.targetArticleId&&P.targetArticleId!==m.uniqueId)){if(Date.now()-(P.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,Re({openAll:!0})}},[m.uniqueId,m.sectionId,(He=d.targetSection)==null?void 0:He.id,d.transitionStatus,Re]);const _e=a.useCallback(P=>{P&&(Ee(P),Q(T=>{if(T.has(P))return T;const A=new Set(T);return A.add(P),Ve(A)}))},[Ee]),Le=a.useCallback(P=>{P&&(Q(T=>{if(!T.has(P))return T;const A=new Set(T);return A.delete(P),A}),W(T=>{if(!T.has(P))return T;const A=new Set(T);return A.delete(P),A}))},[]),et=Pe(ae),tt=Ge(J,et),rt=a.useCallback(()=>{const P=Pe(ae);if(Ge(J,P)){be();return}xe()},[ae,be,xe,J]);a.useEffect(()=>{if(typeof window>"u"||!window.matchMedia||n||t||!J.size||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;const P=()=>{S.current!=null&&(window.clearTimeout(S.current),S.current=null)},T=()=>{P(),S.current=window.setTimeout(()=>{S.current=null,E.current.size&&be()},180)},A=()=>T(),H=()=>P(),F=()=>{document.hidden?T():P()};return window.addEventListener("blur",A),window.addEventListener("focus",H),document.addEventListener("visibilitychange",F),()=>{P(),window.removeEventListener("blur",A),window.removeEventListener("focus",H),document.removeEventListener("visibilitychange",F)}},[t,J,be,n]);const nt=a.useCallback(()=>{if(Z(),i(!0),qe()){oe(),D(null),U(K.PREVIEW);return}const P=h.current,T=ve(P),A=Math.max(T,Math.ceil((P==null?void 0:P.offsetHeight)||(P==null?void 0:P.scrollHeight)||T));if(D(A),U(K.COLLAPSING),typeof window>"u")return;const H=window.requestAnimationFrame(()=>{const F=ve(h.current);D(F),we(K.COLLAPSING)});M.current.push(H)},[Z,oe,we,U]),it=a.useCallback(P=>{P.target!==P.currentTarget||P.propertyName!=="height"||(x.current===K.EXPANDING?pe():x.current===K.COLLAPSING&&me())},[me,pe]),Te=(P,T)=>{const A=Number(P==null?void 0:P.id);return A===1?"Hover":A===2?"Wave":A===3?"3D":A===4?"Poly":A===5?"Click":A===6?"Orbit":A===7?"Spin":A===8?"Shape":A===9?"Hourglass":A===10?"Noice":A===11?"Distance":A===12?"Android":A===13?"Pulse":A===14?"Bars":A===15?"Deep":String(T+1)},Ae=c.map((P,T)=>{if(!O)return f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${T+1} loading`},P.uniqueId);const A=P.uniqueId,H=J.has(A),F=ue.has(A)||H;return f.jsx(Xe,{label:Te(P,T),isOpen:H,onToggle:()=>{H?Le(A):_e(A)},shouldRender:F,children:F&&f.jsx(Pt,{itemWrapper:P,index:T,locked:Y||!H,activate:T<=ye,onReady:X})},A)}),De=[{key:"ambient-trace",tileId:R,label:"Trace",render:P=>f.jsx($t,{readyId:R,locked:Y||!P,onReady:X})},{key:"ambient-hex",tileId:w,label:"Hex",render:P=>f.jsx(Ft,{readyId:w,locked:Y||!P,onReady:X})},{key:"ambient-plop",tileId:I,label:"Plop",render:P=>f.jsx(qt,{readyId:I,locked:Y||!P,onReady:X})},{key:"ambient-julia",tileId:l,label:"Julia",render:P=>f.jsx(Vt,{readyId:l,locked:Y||!P,onReady:X})},{key:"ambient-mines",tileId:C,label:"Bomb",render:P=>f.jsx(Gt,{readyId:C,locked:Y||!P,onReady:X})},{key:"ambient-rings",tileId:g,label:"Fall",render:P=>f.jsx(Kt,{readyId:g,locked:Y||!P,onReady:X})},{key:"ambient-prism",tileId:k,label:"Prism",render:P=>f.jsx(Yt,{readyId:k,locked:Y||!P,onReady:X})},{key:"ambient-rope",tileId:v,label:"Rope",render:P=>f.jsx(Xt,{readyId:v,locked:Y||!P,onReady:X})},{key:"ambient-soup",tileId:b,label:"Soup",render:P=>f.jsx(Jt,{readyId:b,locked:Y||!P,onReady:X})},{key:"ambient-tardis",tileId:o,label:"Tardis",render:P=>f.jsx(Qt,{readyId:o,locked:Y||!P,onReady:X})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:P=>f.jsx(Wt,{readyId:"ambient-goldfish",locked:Y||!P,onReady:X})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:P=>f.jsx(er,{locked:Y||!P})}],Ce=O?De.map(({key:P,tileId:T,label:A,render:H})=>{const F=J.has(T),le=ue.has(T)||F;return f.jsx(Xe,{label:A,isOpen:F,onToggle:()=>{F?Le(T):_e(T)},shouldRender:le,children:le&&H(F)},P)}):[f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")],Oe=[...c.map((P,T)=>({id:P.uniqueId,tileId:P.uniqueId,label:Te(P,T),content:Ae[T]})),...De.slice(0,Ce.length).map(({key:P,tileId:T,label:A},H)=>({id:P,tileId:T,label:A,content:Ce[H]})),...O?[{id:"send-yours",tileId:null,pinnable:!1,label:se,content:f.jsx(Ze,{label:se,clickLabel:ce,previewRequested:Se})}]:[]],st={en:{gallery:"Web art gallery",next:"Next artwork",previous:"Previous artwork",last:"Last viewed artwork",jump:"Jump to artwork",jumpTo:"Show artwork",pin:"Open alongside current artwork",unpin:"Close extra window",pinLimit:"Three extra artworks are already open",pinned:"Extra artwork"},de:{gallery:"Webkunst-Galerie",next:"Nächstes Werk",previous:"Vorheriges Werk",last:"Zuletzt angesehenes Werk",jump:"Werk auswählen",jumpTo:"Werk anzeigen",pin:"Neben dem aktuellen Werk öffnen",unpin:"Zusätzliches Fenster schließen",pinLimit:"Drei zusätzliche Werke sind bereits offen",pinned:"Zusätzliches Werk"},hr:{gallery:"Galerija web umjetnosti",next:"Sljedeće djelo",previous:"Prethodno djelo",last:"Zadnje pregledano djelo",jump:"Odaberi djelo",jumpTo:"Prikaži djelo",pin:"Otvori uz trenutno djelo",unpin:"Zatvori dodatni prozor",pinLimit:"Već su otvorena tri dodatna djela",pinned:"Dodatno djelo"},tr:{gallery:"Web sanatı galerisi",next:"Sonraki eser",previous:"Önceki eser",last:"Son görüntülenen eser",jump:"Eser seç",jumpTo:"Eseri göster",pin:"Geçerli eserin yanında aç",unpin:"Ek pencereyi kapat",pinLimit:"Üç ek eser zaten açık",pinned:"Ek eser"}}[he],ot=(P,T)=>{const A=new Set([...de.map(({tileId:H})=>H),T.tileId].filter(Boolean));for(const[H,F]of G.current)A.has(H)||(window.clearTimeout(F),G.current.delete(H));Me(T.tileId),Q(A),W(A),ie(!1)},at=P=>{const T=Oe.find(({id:A})=>A===P);T!=null&&T.tileId&&fe(A=>A.some(({id:H})=>H===P)||A.length>=3?A:[...A,{id:P,tileId:T.tileId}])},ct=P=>{fe(T=>T.filter(({id:A})=>A!==P))};return a.useEffect(()=>{if(!n||t||!O)return;const P=new Set([...de.map(({tileId:T})=>T),Ie].filter(Boolean));Q(P),W(P);for(const[T,A]of G.current)P.has(T)||(window.clearTimeout(A),G.current.delete(T))},[Ie,de,O,t,n]),a.useEffect(()=>{Z(),D(null),U(K.PREVIEW),i(!0),oe()},[Z,m.uniqueId,oe,U]),a.useEffect(()=>()=>{Z()},[Z]),a.useEffect(()=>{O&&ge(c.length-1)},[O,c.length]),a.useEffect(()=>{if(O)for(const P of Ne){if(!P||V.current.has(P)||G.current.has(P))continue;const T=window.setTimeout(()=>{X(P)},12e3);G.current.set(P,T)}},[O,Ne,X]),f.jsx(ze,{id:m.uniqueId,type:ze.Types.SPACING_DEFAULT,dataWrapper:m,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:r,children:f.jsxs("div",{className:"article-web-art-shell",children:[f.jsx(Ct,{guide:je.guide,buttonLabel:t?je.button:We,hidden:!t,onEnter:t?Re:nt,secondaryButtonLabel:!t&&!n?"promaja":null,onSecondaryAction:!t&&!n?rt:null,secondaryPressed:tt}),f.jsx("div",{ref:h,className:["article-web-art-stage",n?"article-web-art-stage-carousel":"",t?"article-web-art-stage-preview":"",L!==null?"article-web-art-stage-measured":"",`article-web-art-stage-${_}`].filter(Boolean).join(" "),style:L!==null?{"--article-web-art-stage-height":`${L}px`}:void 0,onTransitionEnd:it,"aria-hidden":t,inert:t?"":void 0,children:n?f.jsx(dt,{slides:Oe,labels:st,enabled:!t,pinnedIds:de.map(({id:P})=>P),onChange:ot,onPin:at,onUnpin:ct},t?"preview":"open"):f.jsxs("div",{className:`article-web-art-items ${Y?"article-web-art-items-locked":""}`,ref:u,"aria-busy":t,children:[Ae,Ce,O&&f.jsx(Ze,{label:se,clickLabel:ce,previewRequested:Se})]})})]})})}function Ct({guide:m,buttonLabel:p,hidden:y,onEnter:d,secondaryButtonLabel:R=null,onSecondaryAction:w=null,secondaryPressed:I=!1}){const l=C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),d())};return f.jsx("div",{className:`article-web-art-intro-cover ${y?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:f.jsx("div",{className:"article-web-art-intro-cover-inner",children:f.jsx("div",{className:"article-web-art-intro-cover-actions",children:f.jsx("div",{className:`article-web-art-intro-guide ${y?"article-web-art-intro-guide-hidden":"article-web-art-intro-guide-open"}`,children:f.jsxs("div",{className:"article-web-art-intro-guide-inner",children:[f.jsxs("div",{className:"article-web-art-intro-guide-top-row",children:[f.jsxs("div",{className:"article-web-art-intro-guide-top-copy",children:[f.jsx("span",{className:"article-web-art-intro-guide-eyebrow",children:m.eyebrow}),f.jsx("p",{className:"article-web-art-intro-guide-line article-web-art-intro-guide-line-primary",children:Ye(m.lines[0])})]}),f.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[R?f.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${I?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:w||void 0,"aria-pressed":I,"aria-label":R,children:R}):null,f.jsx("button",{type:"button",className:"article-web-art-intro-cover-button article-web-art-intro-cover-button-primary",onClick:d,onKeyDown:l,"aria-label":p,children:p})]})]}),f.jsx("div",{className:"article-web-art-intro-guide-lines",children:m.lines.slice(1).map((C,g)=>f.jsx("p",{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${g+2}`,children:Ye(C)},Array.isArray(C)?C.map(k=>k==null?void 0:k.text).join(""):C))})]})})})})})}function Xe({label:m,isOpen:p,onToggle:y,shouldRender:d=!0,children:R}){const w=a.useCallback(I=>{var l,C;p||I.defaultPrevented||(C=(l=I.target).closest)!=null&&C.call(l,"button")||y==null||y()},[p,y]);return f.jsxs("div",{className:`article-web-art-gated-tile ${p?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,onClick:p?void 0:w,children:[d?R:f.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":Mt(m)}),f.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),f.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${p?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:y,"aria-label":`${p?"Hide":"Show"} ${m}`,children:m})]})}function Pt({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){return Number(m.id)===1?f.jsx(Dt,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===2?f.jsx(Ot,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===3?f.jsx(Ht,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===4?f.jsx(Bt,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===6?f.jsx(zt,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===7?f.jsx(St,{itemWrapper:m,locked:d,onReady:R}):Number(m.id)===8?f.jsx(jt,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===9?f.jsx(Et,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===10?f.jsx(_t,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===11?f.jsx(kt,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===12?f.jsx(It,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===13?f.jsx(At,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===14?f.jsx(Nt,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):Number(m.id)===15?f.jsx(Lt,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R}):f.jsx(Tt,{itemWrapper:m,index:p,activate:y,locked:d,onReady:R})}function kt({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),g=a.useRef(!0),k=a.useRef(null),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),b=a.useMemo(()=>({seed:54013+(Number(m.id)||11)*7331,reduceMotion:v}),[m.id,v]);a.useEffect(()=>{if(!y)return;const e=w.current,r=I.current;if(!e||!r)return;let t=!1,i=null,n=null,s=null;const c=()=>{C.current||(C.current=!0,R==null||R(m.uniqueId))},u=q(async()=>{var h,x;try{const M=await z(()=>import("./distanceFieldEngine-DHTRwy4W.js"),[]);if(t)return;i=M.createDistanceFieldEngine(r,b),l.current=i;const N=()=>$(e,i,Math.min(1.5,window.devicePixelRatio||1));N(),(h=i.renderStatic)==null||h.call(i),d||(x=i.start)==null||x.call(i),c(),n=new ResizeObserver(()=>{N()}),n.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(E=>{var S,_,j,L;for(const D of E){if(g.current=!!D.isIntersecting,d){(S=i.setHoverActive)==null||S.call(i,!1),(_=i.stop)==null||_.call(i);continue}g.current?(j=i.start)==null||j.call(i):(L=i.stop)==null||L.call(i)}},{threshold:.25}),s.observe(e))}catch{c()}},{timeoutMs:220});return()=>{var h;t=!0,u==null||u(),s==null||s.disconnect(),n==null||n.disconnect(),(h=i==null?void 0:i.destroy)==null||h.call(i),l.current=null}},[y,b,m.uniqueId,d,R]),a.useEffect(()=>{var r,t,i,n;const e=l.current;if(e){if(d){(r=e.setHoverActive)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(i=e.stop)==null||i.call(e);return}g.current&&((n=e.start)==null||n.call(e))}},[d]);const o=e=>{const r=w.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${p+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,r,t,i;(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(i=(t=l.current)==null?void 0:t.start)==null||i.call(t)}),onPointerMove:d?void 0:(e=>{var t,i,n,s;const r=o(e);(i=(t=l.current)==null?void 0:t.setHoverActive)==null||i.call(t,!0),(s=(n=l.current)==null?void 0:n.setPointer)==null||s.call(n,r.x,r.y)}),onPointerLeave:d?void 0:(()=>{var e,r,t,i;k.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(i=(t=l.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onPointerDown:d?void 0:(e=>{var t,i,n,s,c,u;if(e.button!=null&&e.button!==0)return;k.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const r=o(e);(i=(t=l.current)==null?void 0:t.setHoverActive)==null||i.call(t,!0),(s=(n=l.current)==null?void 0:n.setPointer)==null||s.call(n,r.x,r.y),(u=(c=l.current)==null?void 0:c.boostPopulation)==null||u.call(c)}),onPointerUp:d?void 0:(e=>{k.current!=null&&e.pointerId!==k.current||(k.current=null)}),onPointerCancel:d?void 0:(()=>{var e,r,t,i;k.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(i=(t=l.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onFocus:d?void 0:(()=>{var e,r,t,i;(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(i=(t=l.current)==null?void 0:t.start)==null||i.call(t)}),onBlur:d?void 0:(()=>{var e,r,t,i;k.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(i=(t=l.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onKeyDown:d?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=l.current)==null?void 0:r.boostPopulation)==null||t.call(r))}),children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function It({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(null),g=a.useRef(null),k=a.useRef(!1),v=a.useRef(!0),b=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);a.useEffect(()=>{if(!y)return;const e=w.current,r=I.current,t=l.current;if(!e||!r||!t)return;let i=!1,n=null,s=null,c=null,u=null;const h=()=>{k.current||(k.current=!0,R==null||R(m.uniqueId))},x=q(async()=>{var M,N,E,S;try{const _=await z(()=>import("./androidBackgroundEngine-HmTe5YFf.js"),__vite__mapDeps([0,1])),j=await z(()=>import("./androidRobotEngine-CNxYykCI.js"),[]);if(i)return;n=_.createAndroidBackgroundEngine(r,{reduceMotion:b}),C.current=n,s=j.createAndroidRobotEngine(t,{reduceMotion:b}),g.current=s;const L=()=>{const D=Math.min(1.5,window.devicePixelRatio||1);$(e,n,D),$(e,s,D)};L(),(M=n.renderStatic)==null||M.call(n),(N=s.renderStatic)==null||N.call(s),d||(E=n.start)==null||E.call(n),d||(S=s.start)==null||S.call(s),h(),c=new ResizeObserver(()=>{L()}),c.observe(e),"IntersectionObserver"in window&&(u=new IntersectionObserver(D=>{var O,B,V,G,ne,ee;for(const ye of D){if(v.current=!!ye.isIntersecting,d){(O=n.stop)==null||O.call(n),(B=s.stop)==null||B.call(s);continue}v.current?((V=n.start)==null||V.call(n),(G=s.start)==null||G.call(s)):((ne=n.stop)==null||ne.call(n),(ee=s.stop)==null||ee.call(s))}},{threshold:.2}),u.observe(e))}catch{h()}},{timeoutMs:220});return()=>{var M,N;i=!0,x==null||x(),u==null||u.disconnect(),c==null||c.disconnect(),(M=n==null?void 0:n.destroy)==null||M.call(n),(N=s==null?void 0:s.destroy)==null||N.call(s),C.current=null,g.current=null}},[y,m.uniqueId,d,R,b]),a.useEffect(()=>{var t,i,n,s,c;const e=g.current,r=C.current;if(!(!e||!r)){if(d){(t=e.clearPointer)==null||t.call(e),(i=r.stop)==null||i.call(r),(n=e.stop)==null||n.call(e);return}v.current&&((s=r.start)==null||s.call(r),(c=e.start)==null||c.call(e))}},[d]);const o=e=>{const r=w.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android","aria-label":`Android web art tile ${p+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.start)==null||r.call(e)}),onPointerMove:d?void 0:(e=>{var t,i;const r=o(e);(i=(t=g.current)==null?void 0:t.setPointer)==null||i.call(t,r.x,r.y)}),onPointerLeave:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onFocus:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.start)==null||r.call(e)}),onBlur:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onClick:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.poke)==null||r.call(e)}),onKeyDown:d?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=g.current)==null?void 0:r.poke)==null||t.call(r))}),children:[f.jsx("canvas",{ref:I,className:"article-web-art-android-bg-canvas","aria-hidden":!0}),f.jsx("div",{className:"article-web-art-android-glow","aria-hidden":!0}),f.jsx("canvas",{ref:l,className:"article-web-art-android-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Android"})]})}function St({itemWrapper:m,locked:p,onReady:y}){const d=a.useRef(!1);a.useEffect(()=>{d.current||(d.current=!0,y==null||y(m.uniqueId))},[m.uniqueId,y]);const R=a.useMemo(()=>[{key:"stop",hoverMode:"stop",hoverDuration:"5s"},{key:"slow",hoverMode:"slow",hoverDuration:"18s"},{key:"super-fast",hoverMode:"super-fast",hoverDuration:"0.22s"},{key:"very-fast",hoverMode:"very-fast",hoverDuration:"0.55s"}],[]);return f.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${p?"article-web-art-spin-boxes-locked":""}`,children:f.jsx("div",{className:"article-web-art-spin-boxes-grid",children:R.map(({key:w,hoverDuration:I,hoverMode:l})=>f.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--spin-hover-duration":I},children:f.jsx("div",{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${l}`})},w))})})}function Nt({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(!1),I=50,l=a.useMemo(()=>["level-1","level-2","level-3","level-4","level-5"],[]),[C,g]=a.useState(0),k=l[C],v=a.useMemo(()=>Array.from({length:I},(o,e)=>{const r=`${3/(I/2)*(e+1)}s`;return{key:e,style:{animationDelay:r,"--bar-index":e}}}),[]),b=a.useCallback(o=>{var e,r;(e=o==null?void 0:o.preventDefault)==null||e.call(o),(r=o==null?void 0:o.stopPropagation)==null||r.call(o),g(t=>(t+1)%l.length)},[l.length]);return a.useEffect(()=>{y&&(w.current||(w.current=!0,R==null||R(m.uniqueId)))},[y,m.uniqueId,R]),f.jsx("button",{type:"button",className:"article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable","aria-label":`Bars web art tile ${p+1}, ${k.replace("level-","mode ")}`,disabled:d,onClick:d?void 0:b,onKeyDown:d?void 0:o=>{(o.key==="Enter"||o.key===" ")&&b(o)},children:f.jsx("div",{className:`article-web-art-bars-stage article-web-art-bars-stage-${k}`,children:f.jsx("div",{className:`article-web-art-bars article-web-art-bars-${k}`,children:v.map(o=>f.jsx("div",{className:"article-web-art-bars-panel",style:o.style},o.key))})})})}function jt({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),g=a.useRef(!0),k=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=a.useMemo(()=>({seed:1729+(Number(m.id)||8)*4242,reduceMotion:k,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[m.id,k]);a.useEffect(()=>{if(!y)return;const t=w.current,i=I.current;if(!t||!i)return;let n=!1,s=null,c=null,u=null;const h=()=>{C.current||(C.current=!0,R==null||R(m.uniqueId))},x=q(async()=>{var M,N,E;try{const S=await z(()=>import("./shapeFieldEngine-B_ToSidK.js"),[]);if(n)return;s=S.createShapeFieldEngine(i,v),l.current=s;const _=()=>$(t,s,window.devicePixelRatio||1);_(),(M=s.renderStatic)==null||M.call(s),(N=s.triggerWave)==null||N.call(s),d||(E=s.start)==null||E.call(s),h(),c=new ResizeObserver(()=>{var j;_(),(j=s.renderStatic)==null||j.call(s)}),c.observe(t),"IntersectionObserver"in window&&(u=new IntersectionObserver(j=>{var L,D,O;for(const B of j){if(g.current=!!B.isIntersecting,d){(L=s.stop)==null||L.call(s);continue}g.current?(D=s.start)==null||D.call(s):(O=s.stop)==null||O.call(s)}},{threshold:.2}),u.observe(t))}catch{h()}});return()=>{var M;n=!0,x==null||x(),u==null||u.disconnect(),c==null||c.disconnect(),(M=s==null?void 0:s.destroy)==null||M.call(s),l.current=null}},[y,v,m.uniqueId,d,R]),a.useEffect(()=>{var i,n,s;const t=l.current;if(t){if(d){(i=t.clearPointer)==null||i.call(t),(n=t.stop)==null||n.call(t);return}g.current&&((s=t.start)==null||s.call(t))}},[d]);const b=t=>{const i=I.current||w.current;if(!i)return{x:0,y:0};const n=i.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}},o=t=>{var n,s;const i=b(t);(s=(n=l.current)==null?void 0:n.setPointer)==null||s.call(n,i.x,i.y)},e=t=>{var n,s,c,u;const i=b(t);(s=(n=l.current)==null?void 0:n.setPointer)==null||s.call(n,i.x,i.y),(u=(c=l.current)==null?void 0:c.triggerWave)==null||u.call(c,i.x,i.y)},r=t=>{var i,n;t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),(n=(i=l.current)==null?void 0:i.triggerWave)==null||n.call(i))};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${p+1}`,disabled:d,onPointerMove:d?void 0:o,onPointerDown:d?void 0:e,onPointerLeave:d?void 0:(()=>{var t,i;return(i=(t=l.current)==null?void 0:t.clearPointer)==null?void 0:i.call(t)}),onBlur:d?void 0:(()=>{var t,i;return(i=(t=l.current)==null?void 0:t.clearPointer)==null?void 0:i.call(t)}),onKeyDown:d?void 0:r,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function Et({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),g=a.useRef(!0),[k,v]=a.useState(2.8),[b,o]=a.useState(.01);a.useEffect(()=>{if(!y)return;const s=w.current,c=I.current;if(!s||!c)return;let u=!1,h=null,x=null,M=null;const N=()=>{C.current||(C.current=!0,R==null||R(m.uniqueId))},E=q(async()=>{var S,_,j;try{const L=await z(()=>import("./hourglassEngine-Dqm3jFyu.js"),__vite__mapDeps([2,3,4]));if(u)return;h=L.createHourglassEngine(c),l.current=h;const D=(S=h.getState)==null?void 0:S.call(h);D&&(v(D.gravity),o(D.neckRatio));const O=()=>$(s,h,window.devicePixelRatio||1);O(),(_=h.renderStatic)==null||_.call(h),d||(j=h.start)==null||j.call(h),N(),x=new ResizeObserver(()=>{var B;O(),(B=h.renderStatic)==null||B.call(h)}),x.observe(s),"IntersectionObserver"in window&&(M=new IntersectionObserver(B=>{var V,G,ne;for(const ee of B){if(g.current=!!ee.isIntersecting,d){(V=h.stop)==null||V.call(h);continue}g.current?(G=h.start)==null||G.call(h):(ne=h.stop)==null||ne.call(h)}},{threshold:.2}),M.observe(s))}catch{N()}});return()=>{var S;u=!0,E==null||E(),M==null||M.disconnect(),x==null||x.disconnect(),(S=h==null?void 0:h.destroy)==null||S.call(h),l.current=null}},[y,m.uniqueId,d,R]),a.useEffect(()=>{var c,u;const s=l.current;if(s){if(d){(c=s.stop)==null||c.call(s);return}g.current&&((u=s.start)==null||u.call(s))}},[d]);const e=s=>{var c,u;s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),(u=(c=l.current)==null?void 0:c.flip)==null||u.call(c))},r=s=>{s.stopPropagation()},t=s=>{s.stopPropagation()},i=s=>{var u,h;const c=Number(s.target.value);v(c),(h=(u=l.current)==null?void 0:u.setGravity)==null||h.call(u,c)},n=s=>{var u,h,x,M;const c=Number(s.target.value);o(c),(h=(u=l.current)==null?void 0:u.setNeckRatio)==null||h.call(u,c),!d&&g.current&&((M=(x=l.current)==null?void 0:x.start)==null||M.call(x))};return f.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass",role:d?void 0:"button",tabIndex:d?-1:0,"aria-label":`Hourglass web art tile ${p+1}`,onClick:d?void 0:(()=>{var s,c;return(c=(s=l.current)==null?void 0:s.flip)==null?void 0:c.call(s)}),onKeyDown:d?void 0:e,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsxs("div",{className:"article-web-art-hourglass-controls",onClickCapture:t,onPointerDownCapture:t,onPointerUpCapture:t,onClick:r,onPointerDown:r,onPointerUp:r,onKeyDown:r,children:[f.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-left",children:[f.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Neck"}),f.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.01",max:"0.22",step:"0.001",value:b,onChange:n,disabled:d,"aria-label":"Hourglass neck size"})]}),f.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-right",children:[f.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Gravity"}),f.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.45",max:"2.8",step:"0.01",value:k,onChange:i,disabled:d,"aria-label":"Hourglass gravity"})]})]}),f.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function _t({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(null),g=a.useRef(!1),k=a.useRef(!0),[v,b]=a.useState(!1),o=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);a.useEffect(()=>{if(!y)return;const t=w.current,i=I.current,n=l.current;if(!t||!i||!n)return;let s=!1,c=null,u=null,h=null;const x=()=>{g.current||(g.current=!0,R==null||R(m.uniqueId))},M=S=>{s||(b(!0),x())},N=()=>{var S;return s?!1:((S=c==null?void 0:c.renderStatic)==null||S.call(c),c!=null&&c.hasVisibleFrame&&!c.hasVisibleFrame()?(M(),!1):(b(!1),x(),!0))},E=q(async()=>{var S;try{const _=await z(()=>import("./noiceShaderEngine-OW62H83V.js"),[]);if(s)return;c=_.createNoiceShaderEngine({backgroundCanvas:i,foregroundCanvas:n},{reduceMotion:o}),C.current=c;const j=()=>$(t,c,Math.min(1.5,window.devicePixelRatio||1));if(j(),!N())return;d||(S=c.start)==null||S.call(c),u=new ResizeObserver(()=>{var D;j(),(D=c==null?void 0:c.renderStatic)==null||D.call(c)}),u.observe(t),"IntersectionObserver"in window&&(h=new IntersectionObserver(D=>{var O,B,V;for(const G of D){if(k.current=!!G.isIntersecting,d){(O=c.stop)==null||O.call(c);continue}k.current?(B=c.start)==null||B.call(c):(V=c.stop)==null||V.call(c)}},{threshold:.25}),h.observe(t))}catch{M()}},{timeoutMs:220});return()=>{var S;s=!0,E==null||E(),h==null||h.disconnect(),u==null||u.disconnect(),(S=c==null?void 0:c.destroy)==null||S.call(c),C.current=null}},[y,m.uniqueId,d,R,o]),a.useEffect(()=>{var i,n,s;const t=C.current;if(t){if(d){(i=t.clearPointer)==null||i.call(t),(n=t.stop)==null||n.call(t);return}k.current&&((s=t.start)==null||s.call(t))}},[d]);const e=t=>{const i=w.current;if(!i)return{x:.5,y:.5};const n=i.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(t.clientY-n.top)/Math.max(1,n.height)))}},r=t=>{var n,s,c,u,h,x;const i=e(t);(s=(n=C.current)==null?void 0:n.setPointer)==null||s.call(n,i.x,i.y),(u=(c=C.current)==null?void 0:c.pulsePattern)==null||u.call(c),(x=(h=C.current)==null?void 0:h.start)==null||x.call(h)};return f.jsxs("button",{type:"button",ref:w,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice ${v?"article-web-art-tile-noice-fallback-active":""}`,"aria-label":`Noice web art tile ${p+1}`,disabled:d,onPointerMove:d?void 0:(t=>{var n,s;const i=e(t);(s=(n=C.current)==null?void 0:n.setPointer)==null||s.call(n,i.x,i.y)}),onPointerDown:d?void 0:(t=>{t.button!=null&&t.button!==0||r(t)}),onMouseLeave:d?void 0:(()=>{var t,i;(i=(t=C.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onBlur:d?void 0:(()=>{var t,i;(i=(t=C.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onKeyDown:d?void 0:(t=>{var i,n,s,c;(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),(n=(i=C.current)==null?void 0:i.pulsePattern)==null||n.call(i),(c=(s=C.current)==null?void 0:s.start)==null||c.call(s))}),children:[v&&f.jsxs("div",{className:"article-web-art-noice-fallback","aria-hidden":!0,children:[f.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-a"}),f.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-b"}),f.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-c"})]}),f.jsx("canvas",{ref:I,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-bg-canvas ${v?"article-web-art-canvas-hidden":""}`}),f.jsx("canvas",{ref:l,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-fg-canvas ${v?"article-web-art-canvas-hidden":""}`}),f.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function Lt({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),g=a.useRef(!0),k=a.useRef(null),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);a.useEffect(()=>{if(!y)return;const o=w.current,e=I.current;if(!o||!e)return;let r=!1,t=null,i=null,n=null;const s=()=>{C.current||(C.current=!0,R==null||R(m.uniqueId))},c=q(async()=>{var u,h;try{const x=await z(()=>import("./deepShaderEngine-CuYCvQ1H.js"),[]);if(r)return;t=x.createDeepShaderEngine(e,{reduceMotion:v}),l.current=t;const M=()=>$(o,t,Math.min(1.5,window.devicePixelRatio||1));M(),(u=t.renderStatic)==null||u.call(t),d||(h=t.start)==null||h.call(t),s(),i=new ResizeObserver(()=>{var N;M(),(N=t.renderStatic)==null||N.call(t)}),i.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(N=>{var E,S,_;for(const j of N){if(g.current=!!j.isIntersecting,d){(E=t.stop)==null||E.call(t);continue}g.current?(S=t.start)==null||S.call(t):(_=t.stop)==null||_.call(t)}},{threshold:.25}),n.observe(o))}catch{s()}},{timeoutMs:220});return()=>{var u;r=!0,c==null||c(),n==null||n.disconnect(),i==null||i.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),l.current=null}},[y,m.uniqueId,d,R,v]),a.useEffect(()=>{var e,r,t;const o=l.current;if(o){if(d){k.current=null,(e=o.clearPointer)==null||e.call(o),(r=o.stop)==null||r.call(o);return}g.current&&((t=o.start)==null||t.call(o))}},[d]);const b=o=>{const e=I.current||w.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(o.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(o.clientY-r.top)/Math.max(1,r.height)))}};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-deep","aria-label":`Deep web art tile ${p+1}`,disabled:d,onPointerDown:d?void 0:o=>{var r,t,i,n;if(o.button!=null&&o.button!==0)return;k.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const e=b(o);(t=(r=l.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y),(n=(i=l.current)==null?void 0:i.start)==null||n.call(i)},onPointerMove:d?void 0:o=>{var r,t;if(k.current!=null&&o.pointerId!==k.current||k.current==null&&o.pointerType!=="mouse")return;const e=b(o);k.current!=null&&((t=(r=l.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y))},onPointerUp:d?void 0:o=>{var e,r;k.current!=null&&o.pointerId!==k.current||(k.current=null,(r=(e=l.current)==null?void 0:e.clearPointer)==null||r.call(e))},onPointerCancel:d?void 0:(()=>{var o,e;k.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onMouseLeave:d?void 0:(()=>{var o,e;k.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:d?void 0:(()=>{var o,e;k.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onKeyDown:d?void 0:(o=>{var e,r;(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),(r=(e=l.current)==null?void 0:e.start)==null||r.call(e))}),children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Deep"})]})}function Tt({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),g=a.useRef(!0),k=a.useRef(!1),v=Number(m==null?void 0:m.id)===5,b=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=a.useMemo(()=>{const n=Number(m.id)||p+1,s=.0026+n*8e-5,c=.0054+n*14e-5,u=n%2?1:2,h={kx:11+n*2,ky:n%2};return{refreshDelay:v?0:8e3,radiusMini:s,radiusMaxi:c,dHueStep:u,startGroup:h,seed:1337+n*1009,reduceMotion:b}},[v,m.id,p,b]);a.useEffect(()=>{if(!y)return;const n=w.current,s=I.current;if(!n||!s)return;let c=!1,u=null,h=null,x=null;const M=()=>{k.current||(k.current=!0,R==null||R(m.uniqueId))},N=q(async()=>{var E,S;try{const _=await z(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(c)return;u=_.createEmbroideryEngine(s,o),l.current=u;const j=()=>$(n,u,window.devicePixelRatio||1);j(),(E=u.renderStatic)==null||E.call(u),g.current&&((S=u.start)==null||S.call(u)),M(),h=new ResizeObserver(()=>{var L;j(),(L=u.renderStatic)==null||L.call(u)}),h.observe(n),"IntersectionObserver"in window&&(x=new IntersectionObserver(L=>{for(const D of L){if(g.current=!!D.isIntersecting,v){g.current||u.stop();continue}g.current&&C.current?u.start():u.stop()}},{threshold:.25}),x.observe(n))}catch{M()}});return()=>{c=!0,N==null||N(),x==null||x.disconnect(),h==null||h.disconnect(),u==null||u.destroy(),l.current=null}},[y,o,m.uniqueId,R]),a.useEffect(()=>{var s,c;const n=l.current;if(n){if(d){(s=n.stop)==null||s.call(n);return}g.current&&((c=n.start)==null||c.call(n))}},[d]),a.useEffect(()=>{var s,c;const n=l.current;if(n){if(d){(s=n.stop)==null||s.call(n);return}g.current&&((c=n.start)==null||c.call(n))}},[d]);const e=()=>{var n;C.current=!0,g.current&&((n=l.current)==null||n.start())},r=()=>{var n,s,c,u;C.current=!0,g.current?(s=(n=l.current)==null?void 0:n.start)==null||s.call(n):(u=(c=l.current)==null?void 0:c.stop)==null||u.call(c)},t=()=>{var n,s,c,u,h,x,M,N,E,S;if(v){(s=(n=l.current)==null?void 0:n.stop)==null||s.call(n),(u=(c=l.current)==null?void 0:c.reset)==null||u.call(c),(x=(h=l.current)==null?void 0:h.start)==null||x.call(h);return}(M=l.current)==null||M.reset(),(E=(N=l.current)==null?void 0:N.renderStatic)==null||E.call(N),g.current&&((S=l.current)==null||S.start())},i=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${p+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d||v?void 0:e,onMouseLeave:d||v?void 0:r,onFocus:d||v?void 0:e,onBlur:d||v?void 0:r,onKeyDown:d?void 0:i,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:v?"Click":Number.isFinite(Number(m==null?void 0:m.id))?Number(m.id):p+1})]})}function At({itemWrapper:m,index:p,activate:y,onReady:d}){const R=a.useRef(!1),w=a.useRef(null),I=a.useMemo(()=>`<!doctype html>
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
</html>`,[]);return a.useEffect(()=>{y&&(R.current||(R.current=!0,d==null||d(m.uniqueId)))},[y,m.uniqueId,d]),f.jsx("div",{className:"article-web-art-tile article-web-art-pulse-tile",role:"img","aria-label":`Pulse web art tile ${p+1}`,children:f.jsx("iframe",{ref:w,className:"article-web-art-pulse-frame",title:"Pulse web art",srcDoc:I,sandbox:"",scrolling:"no"})})}function Dt({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),g=a.useRef(null);a.useRef(null),a.useRef(!1);const k=a.useRef(!1),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),b=a.useMemo(()=>({seed:9001+(Number(m.id)||1)*1337,reduceMotion:v,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[m.id,v]);a.useEffect(()=>{if(!y)return;const u=w.current,h=I.current;if(!u||!h)return;let x=!1,M=null,N=null;const E=()=>{C.current||(C.current=!0,R==null||R(m.uniqueId))},S=q(async()=>{var _,j;try{const L=await z(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(x)return;M=L.createSpiralDotsEngine(h,b),l.current=M;const D=()=>$(u,M,window.devicePixelRatio||1);D(),(_=M.renderStatic)==null||_.call(M),(j=M.start)==null||j.call(M),E(),N=new ResizeObserver(()=>{var O;D(),M.rebuildDots(),(O=M.renderStatic)==null||O.call(M)}),N.observe(u)}catch{E()}});return()=>{x=!0,S==null||S(),N==null||N.disconnect(),M==null||M.destroy(),l.current=null}},[y,b,m.uniqueId,R]),a.useEffect(()=>{var h,x,M;const u=l.current;if(u){if(d){(h=u.clearMouse)==null||h.call(u),(x=u.stop)==null||x.call(u);return}(M=u.start)==null||M.call(u)}},[d]);const o=u=>{const h=I.current||w.current;if(!h)return{x:-1e4,y:-1e4};const x=h.getBoundingClientRect();return{x:u.clientX-x.left,y:u.clientY-x.top}},e=()=>{var u;(u=l.current)==null||u.start()},r=()=>{var u,h;(u=l.current)==null||u.clearMouse(),(h=l.current)==null||h.start()},t=()=>{e()},i=()=>{r()},n=u=>{var x;const h=o(u);(x=l.current)==null||x.setMouse(h.x,h.y)},s=()=>{e()},c=()=>{r()};return f.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-hover-only article-web-art-tile-hover-dots",role:"img",tabIndex:d?-1:0,"aria-label":`Spiral dots web art tile ${p+1}`,onPointerDown:d?void 0:u=>{var M;if(u.pointerType==="mouse")return;const h=w.current;if(!h)return;k.current=!0,g.current=u.pointerId;try{h.setPointerCapture(u.pointerId)}catch{}e();const x=o(u);(M=l.current)==null||M.setMouse(x.x,x.y)},onPointerMove:d?void 0:u=>{var x;if(!k.current||g.current!=null&&u.pointerId!==g.current)return;const h=o(u);(x=l.current)==null||x.setMouse(h.x,h.y)},onPointerUp:d?void 0:u=>{g.current!=null&&u.pointerId!==g.current||(k.current=!1,g.current=null,r())},onPointerCancel:d?void 0:()=>{k.current=!1,g.current=null,r()},onMouseEnter:d?void 0:t,onMouseLeave:d?void 0:i,onMouseMove:d?void 0:n,onFocus:d?void 0:s,onBlur:d?void 0:c,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function Ot({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),g=a.useRef(!0),k=a.useRef(!1),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),b=a.useMemo(()=>({seed:424242+(Number(m.id)||2)*2027,reduceMotion:v,targetCellSize:14,gapPx:1.4}),[m.id,v]);a.useEffect(()=>{if(!y)return;const n=w.current,s=I.current;if(!n||!s)return;let c=!1,u=null,h=null,x=null;const M=()=>{k.current||(k.current=!0,R==null||R(m.uniqueId))},N=q(async()=>{var E,S;try{const _=await z(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(c)return;u=_.createGridWaveEngine(s,b),l.current=u;const j=()=>$(n,u,window.devicePixelRatio||1);j(),(E=u.renderStatic)==null||E.call(u),g.current&&((S=u.start)==null||S.call(u)),M(),h=new ResizeObserver(()=>{var L;j(),(L=u.renderStatic)==null||L.call(u)}),h.observe(n),"IntersectionObserver"in window&&(x=new IntersectionObserver(L=>{for(const D of L)g.current=!!D.isIntersecting,g.current&&C.current?u.start():u.stop()},{threshold:.25}),x.observe(n))}catch{M()}});return()=>{c=!0,N==null||N(),x==null||x.disconnect(),h==null||h.disconnect(),u==null||u.destroy(),l.current=null}},[y,b,m.uniqueId,R]);const o=()=>{var n;C.current=!0,g.current&&((n=l.current)==null||n.start())},e=()=>{var n,s,c,u;C.current=!0,g.current?(s=(n=l.current)==null?void 0:n.start)==null||s.call(n):(u=(c=l.current)==null?void 0:c.stop)==null||u.call(c)},r=n=>{const s=I.current||w.current;if(!s)return{x:0,y:0};const c=s.getBoundingClientRect();return typeof(n==null?void 0:n.clientX)!="number"||typeof(n==null?void 0:n.clientY)!="number"?{x:c.width/2,y:c.height/2}:{x:n.clientX-c.left,y:n.clientY-c.top}},t=n=>{var c,u,h,x;const s=r(n);(c=l.current)==null||c.rippleAt(s.x,s.y),(h=(u=l.current)==null?void 0:u.renderStatic)==null||h.call(u),C.current&&g.current&&((x=l.current)==null||x.start())},i=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t(null))};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${p+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:o,onMouseLeave:d?void 0:e,onFocus:d?void 0:o,onBlur:d?void 0:e,onKeyDown:d?void 0:i,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function Ht({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),g=a.useRef(!0),k=a.useRef(!1),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),b=a.useMemo(()=>({reduceMotion:v,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[v]);a.useEffect(()=>{if(!y)return;const i=w.current,n=I.current;if(!i||!n)return;let s=!1,c=null,u=null,h=null,x=null;const M=()=>{k.current||(k.current=!0,R==null||R(m.uniqueId))},N=async()=>{var L;const S=await z(()=>import("./threeTunnelEngine-BYxOaRL9.js"),__vite__mapDeps([5,1]));if(s)return;c=S.createThreeTunnelEngine(n,b),l.current=c;const _=()=>$(i,c,Math.min(1.5,window.devicePixelRatio||1));return _(),c.reset(),g.current&&((L=c.start)==null||L.call(c)),M(),u=new ResizeObserver(()=>{_(),c.reset()}),u.observe(i),"IntersectionObserver"in window&&(h=new IntersectionObserver(D=>{for(const O of D)g.current=!!O.isIntersecting,g.current&&C.current?c.start():c.stop()},{threshold:.25}),h.observe(i)),()=>{h==null||h.disconnect(),u==null||u.disconnect(),c.destroy(),l.current=null}};let E=null;return x=q(()=>{N().then(S=>{E=S||null}).catch(()=>{M()})},{timeoutMs:300}),()=>{s=!0,x==null||x(),E==null||E()}},[y,b,m.uniqueId,R]),a.useEffect(()=>{var n,s,c;const i=l.current;if(i){if(d){(n=i.setHeld)==null||n.call(i,!1),(s=i.stop)==null||s.call(i);return}g.current&&((c=i.start)==null||c.call(i))}},[d]);const o=()=>{var i;C.current=!0,g.current&&((i=l.current)==null||i.start())},e=()=>{var i,n,s,c;C.current=!0,g.current?(n=(i=l.current)==null?void 0:i.start)==null||n.call(i):(c=(s=l.current)==null?void 0:s.stop)==null||c.call(s)},r=()=>{var i,n,s,c;(n=(i=l.current)==null?void 0:i.nextPalette)==null||n.call(i),(s=l.current)==null||s.reset(),g.current&&((c=l.current)==null||c.start())},t=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),r())};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${p+1}`,disabled:d,onClick:d?void 0:r,onMouseEnter:d?void 0:o,onMouseLeave:d?void 0:e,onFocus:d?void 0:o,onBlur:d?void 0:e,onKeyDown:d?void 0:t,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),f.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Bt({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),g=a.useRef(!0),k=a.useRef(!1),v=a.useRef(null),b=a.useRef(null),o=a.useRef(!1),e=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=a.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,d]);a.useEffect(()=>{if(!y)return;const n=w.current,s=I.current;if(!n||!s)return;let c=!1,u=null,h=null;const x=()=>{k.current||(k.current=!0,R==null||R(m.uniqueId))},M=async()=>{var L;const N=await z(()=>import("./threePolygonDemo5Engine-J7VS_NUu.js"),__vite__mapDeps([6,1]));if(c)return;const E=N.createThreePolygonDemo5Engine(s,r);l.current=E;const S=()=>$(n,E,Math.min(1.2,window.devicePixelRatio||1));S(),E.reset(),window.requestAnimationFrame(()=>{c||l.current!==E||(S(),E.reset())}),g.current&&((L=E.start)==null||L.call(E)),x();const _=new ResizeObserver(()=>{S()});_.observe(n);let j=null;"IntersectionObserver"in window&&(j=new IntersectionObserver(D=>{for(const O of D)g.current=!!O.isIntersecting,g.current&&C.current?E.start():E.stop()},{threshold:.25}),j.observe(n)),u=()=>{j==null||j.disconnect(),_.disconnect(),E.destroy(),l.current=null}};return h=q(()=>{M().catch(()=>{x()})},{timeoutMs:300}),()=>{c=!0,h==null||h(),b.current!=null&&window.clearTimeout(b.current),u==null||u()}},[y,r,m.uniqueId,R]);const t=()=>{var n,s,c;(s=(n=l.current)==null?void 0:n.boost)==null||s.call(n),g.current&&((c=l.current)==null||c.start())},i=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${p+1}`,disabled:d,onKeyDown:d?void 0:i,onPointerDown:d?void 0:n=>{var s;if(!(n.button!=null&&n.button!==0)){v.current=n.pointerId,o.current=!1;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}g.current&&((s=l.current)==null||s.start()),b.current!=null&&window.clearTimeout(b.current),b.current=window.setTimeout(()=>{var c,u;v.current!=null&&(o.current=!0,(u=(c=l.current)==null?void 0:c.setHeld)==null||u.call(c,!0))},140)}},onPointerUp:d?void 0:n=>{var s,c;v.current!=null&&n.pointerId!==v.current||(b.current!=null&&(window.clearTimeout(b.current),b.current=null),v.current=null,o.current?(o.current=!1,(c=(s=l.current)==null?void 0:s.setHeld)==null||c.call(s,!1)):t())},onPointerCancel:d?void 0:(()=>{var n,s;b.current!=null&&(window.clearTimeout(b.current),b.current=null),v.current=null,o.current=!1,(s=(n=l.current)==null?void 0:n.setHeld)==null||s.call(n,!1)}),onLostPointerCapture:d?void 0:(()=>{var n,s;b.current!=null&&(window.clearTimeout(b.current),b.current=null),v.current=null,o.current=!1,(s=(n=l.current)==null?void 0:n.setHeld)==null||s.call(n,!1)}),onMouseEnter:d?void 0:(()=>{var n;C.current=!0,g.current&&((n=l.current)==null||n.start())}),onMouseLeave:d?void 0:(()=>{var n,s,c,u;b.current!=null&&(window.clearTimeout(b.current),b.current=null),v.current=null,o.current=!1,(s=(n=l.current)==null?void 0:n.setHeld)==null||s.call(n,!1),C.current=!0,g.current?(c=l.current)==null||c.start():(u=l.current)==null||u.stop()}),onFocus:d?void 0:(()=>{var n;C.current=!0,g.current&&((n=l.current)==null||n.start())}),onBlur:d?void 0:(()=>{var n,s,c,u;b.current!=null&&(window.clearTimeout(b.current),b.current=null),v.current=null,o.current=!1,(s=(n=l.current)==null?void 0:n.setHeld)==null||s.call(n,!1),C.current=!0,g.current?(c=l.current)==null||c.start():(u=l.current)==null||u.stop()}),children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function zt({itemWrapper:m,index:p,activate:y,locked:d,onReady:R}){const w=a.useRef(null),I=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),g=a.useRef(!0),k=a.useRef(!1),v=a.useRef(0),b=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=a.useMemo(()=>({reduceMotion:b,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[b]);a.useEffect(()=>{if(!y)return;const n=w.current,s=I.current;if(!n||!s)return;let c=!1,u=null,h=null,x=null;const M=()=>{k.current||(k.current=!0,R==null||R(m.uniqueId))},N=q(async()=>{var E,S;try{const _=await z(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(c)return;u=_.createOrbitCirclesEngine(s,o),l.current=u;const j=()=>$(n,u,window.devicePixelRatio||1);j(),u.reset(),(E=u.renderStatic)==null||E.call(u),g.current&&((S=u.start)==null||S.call(u)),M(),h=new ResizeObserver(()=>{var L;j(),(L=u.renderStatic)==null||L.call(u)}),h.observe(n),"IntersectionObserver"in window&&(x=new IntersectionObserver(L=>{for(const D of L)g.current=!!D.isIntersecting,g.current&&C.current?u.start():u.stop()},{threshold:.25}),x.observe(n))}catch{M()}});return()=>{c=!0,N==null||N(),x==null||x.disconnect(),h==null||h.disconnect(),u==null||u.destroy(),l.current=null}},[y,o,m.uniqueId,R]),a.useEffect(()=>{var s,c;const n=l.current;if(n){if(d){(s=n.stop)==null||s.call(n);return}g.current&&((c=n.start)==null||c.call(n))}},[d]);const e=()=>{var n;C.current=!0,g.current&&((n=l.current)==null||n.start())},r=()=>{var n,s,c,u;C.current=!0,g.current?(s=(n=l.current)==null?void 0:n.start)==null||s.call(n):(u=(c=l.current)==null?void 0:c.stop)==null||u.call(c)},t=()=>{var h,x,M;const n=l.current;if(!n)return;const s=Math.max(1,((h=n.getTotalCircles)==null?void 0:h.call(n))||1),c=v.current%s,u=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`;(x=n.setCircleColor)==null||x.call(n,c,u),v.current+=1,g.current&&((M=n.start)==null||M.call(n))},i=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return f.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${p+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:e,onMouseLeave:d?void 0:r,onFocus:d?void 0:e,onBlur:d?void 0:r,onKeyDown:d?void 0:i,children:[f.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function $t({readyId:m,locked:p,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=a.useMemo(()=>({seed:20250414,reduceMotion:l,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[l]);a.useEffect(()=>{const v=d.current,b=R.current;if(!v||!b)return;let o=!1,e=null,r=null,t=null;const i=()=>{I.current||(I.current=!0,y==null||y(m))},n=q(async()=>{var s,c;try{const u=await z(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(o)return;e=u.createTortuosityTraceEngine(b,C),w.current=e;const h=()=>$(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(s=e.renderStatic)==null||s.call(e),(c=e.start)==null||c.call(e),i(),r=new ResizeObserver(()=>{var x;h(),(x=e.reset)==null||x.call(e)}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(x=>{var M,N;for(const E of x)E.isIntersecting?(M=e.start)==null||M.call(e):(N=e.stop)==null||N.call(e)},{threshold:.25}),t.observe(v))}catch{i()}},{timeoutMs:200});return()=>{var s;o=!0,n==null||n(),t==null||t.disconnect(),r==null||r.disconnect(),(s=e==null?void 0:e.destroy)==null||s.call(e),w.current=null}},[C,y,m]),a.useEffect(()=>{var b,o,e;const v=w.current;if(v){if(p){(b=v.setHeld)==null||b.call(v,!1),(o=v.stop)==null||o.call(v);return}(e=v.start)==null||e.call(v)}},[p]),a.useEffect(()=>{var b,o;const v=w.current;if(v){if(p){(b=v.stop)==null||b.call(v);return}(o=v.start)==null||o.call(v)}},[p]);const g=()=>{var v,b,o,e;(b=(v=w.current)==null?void 0:v.reset)==null||b.call(v),(e=(o=w.current)==null?void 0:o.start)==null||e.call(o)},k=v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g())};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:p,onClick:p?void 0:g,onKeyDown:p?void 0:k,children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function Ft({readyId:m,locked:p,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=a.useMemo(()=>({seed:20250415,reduceMotion:C,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[C]);a.useEffect(()=>{const o=d.current,e=R.current;if(!o||!e)return;let r=!1,t=null,i=null,n=null;const s=()=>{I.current||(I.current=!0,y==null||y(m))},c=q(async()=>{var u,h;try{const x=await z(()=>import("./hexFlowBallsEngine-Bzfny-m0.js"),[]);if(r)return;t=x.createHexFlowBallsEngine(e,g),w.current=t;const M=()=>$(o,t,Math.min(1.5,window.devicePixelRatio||1));M(),(u=t.renderStatic)==null||u.call(t),(h=t.start)==null||h.call(t),s(),i=new ResizeObserver(()=>{var N;M(),(N=t.renderStatic)==null||N.call(t)}),i.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(N=>{var E,S;for(const _ of N)_.isIntersecting?(E=t.start)==null||E.call(t):(S=t.stop)==null||S.call(t)},{threshold:.25}),n.observe(o))}catch{s()}},{timeoutMs:220});return()=>{var u;r=!0,c==null||c(),n==null||n.disconnect(),i==null||i.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),w.current=null}},[g,y,m]),a.useEffect(()=>{var e,r,t;const o=w.current;if(o){if(p){(e=o.clearPointer)==null||e.call(o),(r=o.stop)==null||r.call(o);return}(t=o.start)==null||t.call(o)}},[p]);const k=o=>{const e=d.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:r.width>0?(o.clientX-r.left)/r.width:.5,y:r.height>0?(o.clientY-r.top)/r.height:.5}},v=()=>{var o,e,r,t;(e=(o=w.current)==null?void 0:o.burst)==null||e.call(o),(t=(r=w.current)==null?void 0:r.start)==null||t.call(r)},b=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),v())};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:p,onClick:p?void 0:v,onPointerDown:p?void 0:(o=>{var r,t;l.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const e=k(o);(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerMove:p?void 0:(o=>{var r,t;if(l.current!=null&&o.pointerId!==l.current)return;const e=k(o);(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerUp:p?void 0:(o=>{l.current!=null&&o.pointerId!==l.current||(l.current=null)}),onPointerCancel:p?void 0:(()=>{var o,e;l.current=null,(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onMouseMove:p?void 0:(o=>{var r,t;const e=k(o);(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onMouseLeave:p?void 0:(()=>{var o,e;l.current=null,(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:p?void 0:(()=>{var o,e;l.current=null,(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onKeyDown:p?void 0:b,children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function qt({readyId:m,locked:p,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=a.useMemo(()=>({seed:20250416,reduceMotion:l,step:6,side:5}),[l]);a.useEffect(()=>{const b=d.current,o=R.current;if(!b||!o)return;let e=!1,r=null,t=null,i=null;const n=()=>{I.current||(I.current=!0,y==null||y(m))},s=q(async()=>{var c,u;try{const h=await z(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;r=h.createPixelPlopEngine(o,C),w.current=r;const x=()=>$(b,r,Math.min(1.5,window.devicePixelRatio||1));x(),(c=r.renderStatic)==null||c.call(r),(u=r.start)==null||u.call(r),n(),t=new ResizeObserver(()=>{var M;x(),(M=r.reset)==null||M.call(r)}),t.observe(b),"IntersectionObserver"in window&&(i=new IntersectionObserver(M=>{var N,E;for(const S of M)S.isIntersecting?(N=r.start)==null||N.call(r):(E=r.stop)==null||E.call(r)},{threshold:.25}),i.observe(b))}catch{n()}},{timeoutMs:220});return()=>{var c;e=!0,s==null||s(),i==null||i.disconnect(),t==null||t.disconnect(),(c=r==null?void 0:r.destroy)==null||c.call(r),w.current=null}},[C,y,m]),a.useEffect(()=>{var o,e,r;const b=w.current;if(b){if(p){(o=b.clearPointer)==null||o.call(b),(e=b.stop)==null||e.call(b);return}(r=b.start)==null||r.call(b)}},[p]),a.useEffect(()=>{var o,e;const b=w.current;if(b){if(p){(o=b.stop)==null||o.call(b);return}(e=b.start)==null||e.call(b)}},[p]);const g=()=>{var b,o,e,r;(o=(b=w.current)==null?void 0:b.seedBurst)==null||o.call(b),(r=(e=w.current)==null?void 0:e.start)==null||r.call(e)},k=b=>{var r,t,i,n;const o=R.current||d.current;if(!o||typeof(b==null?void 0:b.clientX)!="number"||typeof(b==null?void 0:b.clientY)!="number"){g();return}const e=o.getBoundingClientRect();(t=(r=w.current)==null?void 0:r.burstAt)==null||t.call(r,b.clientX-e.left,b.clientY-e.top),(n=(i=w.current)==null?void 0:i.start)==null||n.call(i)},v=b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),g())};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:p,onPointerDown:p?void 0:(b=>{b.button!=null&&b.button!==0||k(b)}),onKeyDown:p?void 0:v,children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function Vt({readyId:m,locked:p,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useRef(!1),g=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=a.useMemo(()=>({reduceMotion:g,seed:20250417}),[g]);a.useEffect(()=>{const e=d.current,r=R.current;if(!e||!r)return;let t=!1,i=null,n=null,s=null;const c=()=>{I.current||(I.current=!0,y==null||y(m))},u=q(async()=>{var h,x;try{const M=await z(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(t)return;i=M.createJuliaLinesEngine(r,k),w.current=i;const N=()=>$(e,i,Math.min(1.5,window.devicePixelRatio||1));N(),(h=i.renderStatic)==null||h.call(i),(x=i.start)==null||x.call(i),c(),n=new ResizeObserver(()=>{N()}),n.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(E=>{var S,_;for(const j of E)j.isIntersecting?(S=i.start)==null||S.call(i):(_=i.stop)==null||_.call(i)},{threshold:.25}),s.observe(e))}catch{c()}},{timeoutMs:220});return()=>{var h;t=!0,u==null||u(),s==null||s.disconnect(),n==null||n.disconnect(),(h=i==null?void 0:i.destroy)==null||h.call(i),w.current=null}},[k,y,m]),a.useEffect(()=>{var r,t,i,n;const e=w.current;if(e){if(p){(r=e.setHeld)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(i=e.stop)==null||i.call(e);return}(n=e.start)==null||n.call(e)}},[p]),a.useEffect(()=>{var r,t,i;const e=w.current;if(e){if(p){(r=e.clearPointer)==null||r.call(e),(t=e.stop)==null||t.call(e);return}(i=e.start)==null||i.call(e)}},[p]);const v=e=>{const r=d.current;if(!r)return{x:.4,y:.5};const t=r.getBoundingClientRect(),i=(e.clientX-t.left)/Math.max(1,t.width),n=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,i)),y:Math.max(0,Math.min(1,n))}},b=()=>{var e,r,t,i;(r=(e=w.current)==null?void 0:e.reset)==null||r.call(e),(i=(t=w.current)==null?void 0:t.start)==null||i.call(t)},o=e=>{var t,i,n,s,c,u,h,x;const r=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(i=(t=w.current)==null?void 0:t.nudge)==null||i.call(t,0,-r)):e.key==="ArrowDown"?(e.preventDefault(),(s=(n=w.current)==null?void 0:n.nudge)==null||s.call(n,0,r)):e.key==="ArrowLeft"?(e.preventDefault(),(u=(c=w.current)==null?void 0:c.nudge)==null||u.call(c,-r,0)):e.key==="ArrowRight"?(e.preventDefault(),(x=(h=w.current)==null?void 0:h.nudge)==null||x.call(h,r,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),b())};return f.jsxs("div",{ref:d,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:p?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:p?void 0:e=>{var i,n;const r=d.current;if(!r)return;C.current=!0,l.current=e.pointerId;try{r.setPointerCapture(e.pointerId)}catch{}const t=v(e);(n=(i=w.current)==null?void 0:i.setPointer)==null||n.call(i,t.x,t.y)},onPointerMove:p?void 0:e=>{var t,i;if(C.current&&l.current!=null&&e.pointerId!==l.current)return;const r=v(e);(i=(t=w.current)==null?void 0:t.setPointer)==null||i.call(t,r.x,r.y)},onPointerUp:p?void 0:e=>{var r,t;l.current!=null&&e.pointerId!==l.current||(C.current=!1,l.current=null,(t=(r=w.current)==null?void 0:r.clearPointer)==null||t.call(r))},onPointerCancel:p?void 0:()=>{var e,r;C.current=!1,l.current=null,(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)},onMouseMove:p?void 0:e=>{var t,i;const r=v(e);(i=(t=w.current)==null?void 0:t.setPointer)==null||i.call(t,r.x,r.y)},onMouseLeave:p?void 0:(()=>{var e,r;(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:p?void 0:(()=>{var e,r;(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:p?void 0:o,onClick:p?void 0:b,children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function Gt({readyId:m,locked:p,onReady:y}){const[d,R]=a.useState(0),[w,I]=a.useState("mine"),[l,C]=a.useState(()=>new Set),[g,k]=a.useState(()=>new Set),[v,b]=a.useState("playing"),[o,e]=a.useState(null),[r,t]=a.useState(0),i=a.useMemo(()=>yt(),[d]);a.useEffect(()=>{y==null||y(m)},[y,m]),a.useEffect(()=>{I("mine"),C(new Set),k(new Set),b("playing"),e(null),t(0)},[d]),a.useEffect(()=>{if(o==null||v!=="playing")return;const x=()=>{t(Math.min(5999,Math.floor((Date.now()-o)/1e3)))};x();const M=window.setInterval(x,1e3);return()=>{window.clearInterval(M)}},[o,v]);const n=()=>{R(x=>x+1)},s=x=>{if(p||v!=="playing")return;if(o==null&&e(Date.now()),w==="flag"){if(l.has(x))return;const N=new Set(g);N.has(x)?N.delete(x):N.add(x),k(N),Ke(i,l,N)&&b("won");return}if(g.has(x)||l.has(x))return;if(i.mines.has(x)){const N=new Set(l);for(const E of i.mines)N.add(E);N.add(x),C(N),b("lost");return}const M=gt(x,i,l,g);C(M),Ke(i,M,g)&&b("won")},c=i.mineCount-g.size,u=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`;let h="🤔";return v==="lost"?h="😣":v==="won"?h="😎":g.size>=i.mineCount?h="😕":g.size>=i.mineCount-1?h="🤓":g.size>=Math.round(i.mineCount*3/4)?h="😃":g.size>=Math.round(i.mineCount*2/3)?h="😊":g.size>=Math.round(i.mineCount/2)?h="🙂":g.size>=Math.round(i.mineCount/3)?h="😏":g.size>0&&(h="😐"),f.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:f.jsxs("div",{className:"article-web-art-minesweeper",children:[f.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[f.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${w==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>I("mine"),disabled:p||v!=="playing","aria-pressed":w==="mine",children:"⛏"}),f.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${w==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>I("flag"),disabled:p||v!=="playing","aria-pressed":w==="flag",children:"🚩"})]}),f.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[i.counts.map((x,M)=>{const N=l.has(M),E=g.has(M),S=i.mines.has(M),_=v==="lost"&&S,j=x>0?xt[x-1]:void 0;return f.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${N?"article-web-art-minesweeper-cell-revealed":""} ${_?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>s(M),disabled:p||v!=="playing","aria-label":`Minesweeper cell ${M+1}`,children:[E&&!N?f.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,_?f.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,N&&!S&&x>0?f.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:j},children:x}):null]},`mine-${d}-${M}`)}),v==="lost"?f.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:n,children:["Ooohhh 🙁",f.jsx("br",{}),"Click to try again"]}):null,v==="won"?f.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:n,children:["👌👀✔💯💯💯",f.jsx("br",{}),"Click to restart"]}):null]}),f.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[f.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[f.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:h}),f.jsx("span",{children:c})]}),f.jsx("div",{className:"article-web-art-minesweeper-timer",children:u})]}),f.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function Kt({readyId:m,locked:p,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=a.useMemo(()=>({reduceMotion:C}),[C]);a.useEffect(()=>{const o=d.current,e=R.current;if(!o||!e)return;let r=!1,t=null,i=null,n=null;const s=()=>{I.current||(I.current=!0,y==null||y(m))},c=q(async()=>{var u,h;try{const x=await z(()=>import("./fallingRingsEngine-CgfU8E0P.js"),[]);if(r)return;t=x.createFallingRingsEngine(e,g),w.current=t;const M=()=>$(o,t,Math.min(1.5,window.devicePixelRatio||1));M(),(u=t.renderStatic)==null||u.call(t),(h=t.start)==null||h.call(t),s(),i=new ResizeObserver(()=>{M()}),i.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(N=>{var E,S;for(const _ of N)_.isIntersecting?(E=t.start)==null||E.call(t):(S=t.stop)==null||S.call(t)},{threshold:.25}),n.observe(o))}catch{s()}},{timeoutMs:220});return()=>{var u;r=!0,c==null||c(),n==null||n.disconnect(),i==null||i.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),w.current=null}},[g,y,m]);const k=o=>{var e,r,t,i;(r=(e=w.current)==null?void 0:e.setHeld)==null||r.call(e,o),(i=(t=w.current)==null?void 0:t.start)==null||i.call(t)},v=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),k(!0))},b=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),k(!1))};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:p,onPointerDown:p?void 0:o=>{l.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}k(!0)},onPointerUp:p?void 0:o=>{l.current!=null&&o.pointerId!==l.current||(l.current=null,k(!1))},onPointerCancel:p?void 0:()=>{l.current=null,k(!1)},onLostPointerCapture:p?void 0:()=>{l.current=null,k(!1)},onMouseLeave:p?void 0:(()=>{l.current!=null&&k(!1)}),onBlur:p?void 0:(()=>{l.current=null,k(!1)}),onKeyDown:p?void 0:v,onKeyUp:p?void 0:b,children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function Yt({readyId:m,locked:p,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useRef("mouse"),g=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=a.useMemo(()=>({reduceMotion:g,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[g]);a.useEffect(()=>{const b=d.current,o=R.current;if(!b||!o)return;let e=!1,r=null,t=null,i=null;const n=()=>{I.current||(I.current=!0,y==null||y(m))},s=q(async()=>{var c,u;try{const h=await z(()=>import("./prismFieldEngine-BvTSiE5I.js"),__vite__mapDeps([7,1]));if(e)return;r=h.createPrismFieldEngine(o,k),w.current=r;const x=()=>$(b,r,Math.min(1.5,window.devicePixelRatio||1));x(),(c=r.renderStatic)==null||c.call(r),(u=r.start)==null||u.call(r),n(),t=new ResizeObserver(()=>{x()}),t.observe(b),"IntersectionObserver"in window&&(i=new IntersectionObserver(M=>{var N,E;for(const S of M)S.isIntersecting?(N=r.start)==null||N.call(r):(E=r.stop)==null||E.call(r)},{threshold:.25}),i.observe(b))}catch{n()}},{timeoutMs:220});return()=>{var c;e=!0,s==null||s(),i==null||i.disconnect(),t==null||t.disconnect(),(c=r==null?void 0:r.destroy)==null||c.call(r),w.current=null}},[k,y,m]);const v=b=>{const o=d.current;if(!o)return{x:.5,y:.5};const e=o.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(b.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(b.clientY-e.top)/Math.max(1,e.height)))}};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:p,onClick:p?void 0:(()=>{var b,o,e,r;(o=(b=w.current)==null?void 0:b.reset)==null||o.call(b),(r=(e=w.current)==null?void 0:e.start)==null||r.call(e)}),onPointerDown:p?void 0:b=>{var e,r;l.current=b.pointerId,C.current=b.pointerType||"mouse";try{b.currentTarget.setPointerCapture(b.pointerId)}catch{}const o=v(b);(r=(e=w.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onPointerMove:p?void 0:b=>{var e,r;if(l.current!=null&&b.pointerId!==l.current)return;const o=v(b);(r=(e=w.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onPointerUp:p?void 0:b=>{var o,e;l.current!=null&&b.pointerId!==l.current||(l.current=null,(b.pointerType||C.current)==="mouse"&&((e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)))},onPointerCancel:p?void 0:(()=>{var b,o;l.current=null,C.current==="mouse"&&((o=(b=w.current)==null?void 0:b.clearPointer)==null||o.call(b))}),onMouseMove:p?void 0:b=>{var e,r;const o=v(b);(r=(e=w.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onMouseLeave:p?void 0:(()=>{var b,o;l.current=null,(o=(b=w.current)==null?void 0:b.clearPointer)==null||o.call(b)}),onBlur:p?void 0:(()=>{var b,o;l.current=null,C.current="mouse",(o=(b=w.current)==null?void 0:b.clearPointer)==null||o.call(b)}),onKeyDown:p?void 0:(b=>{var o,e,r,t;(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),(e=(o=w.current)==null?void 0:o.reset)==null||e.call(o),(t=(r=w.current)==null?void 0:r.start)==null||t.call(r))}),children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function Xt({readyId:m,locked:p,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useRef(null),g=a.useRef(!1),k=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=a.useMemo(()=>({reduceMotion:k}),[k]);a.useEffect(()=>{const e=d.current,r=R.current;if(!e||!r)return;let t=!1,i=null,n=null,s=null;const c=()=>{I.current||(I.current=!0,y==null||y(m))},u=q(async()=>{var h,x;try{const M=await z(()=>import("./ropeLightEngine-ZZGO6u7c.js"),[]);if(t)return;i=M.createRopeLightEngine(r,v),w.current=i;const N=()=>$(e,i,Math.min(1.5,window.devicePixelRatio||1));N(),(h=i.renderStatic)==null||h.call(i),(x=i.start)==null||x.call(i),c(),n=new ResizeObserver(()=>{N()}),n.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(E=>{var S,_;for(const j of E)j.isIntersecting?(S=i.start)==null||S.call(i):(_=i.stop)==null||_.call(i)},{threshold:.25}),s.observe(e))}catch{c()}},{timeoutMs:220});return()=>{var h;t=!0,u==null||u(),s==null||s.disconnect(),n==null||n.disconnect(),(h=i==null?void 0:i.destroy)==null||h.call(i),w.current=null}},[v,y,m]);const b=e=>{const r=d.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}},o=e=>{var t,i,n,s;if(g.current){g.current=!1;return}const r=e?b(e):{x:.5,y:.18};(i=(t=w.current)==null?void 0:t.toggleHangAt)==null||i.call(t,r.x,r.y),(s=(n=w.current)==null?void 0:n.start)==null||s.call(n)};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:p,onClick:p?void 0:o,onPointerDown:p?void 0:e=>{var r,t;l.current=e.pointerId,g.current=!1,C.current=b(e);try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,C.current.x,C.current.y)},onPointerMove:p?void 0:e=>{var i,n;if(l.current!=null&&e.pointerId!==l.current)return;const r=b(e),t=C.current;t&&Math.hypot(r.x-t.x,r.y-t.y)>.025&&(g.current=!0),(n=(i=w.current)==null?void 0:i.setPointer)==null||n.call(i,r.x,r.y)},onPointerUp:p?void 0:e=>{var r,t;if(!(l.current!=null&&e.pointerId!==l.current)){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}l.current=null,C.current=null,(t=(r=w.current)==null?void 0:r.clearPointer)==null||t.call(r)}},onPointerCancel:p?void 0:(e=>{var r,t;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}l.current=null,C.current=null,g.current=!1,(t=(r=w.current)==null?void 0:r.clearPointer)==null||t.call(r)}),onMouseMove:p?void 0:e=>{var t,i;const r=b(e);(i=(t=w.current)==null?void 0:t.setPointer)==null||i.call(t,r.x,r.y)},onMouseLeave:p?void 0:(()=>{var e,r;l.current=null,C.current=null,(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:p?void 0:(()=>{var e,r;l.current=null,C.current=null,g.current=!1,(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:p?void 0:(e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),o())}),children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}const Ut=["rotateX(270deg) translateZ(0.5em)","rotateY(0deg) translateZ(0.5em)","rotateY(90deg) translateZ(0.5em)","rotateY(180deg) translateZ(0.5em)","rotateY(270deg) translateZ(0.5em)","rotateX(90deg) translateZ(0.5em)"],Ue=Array.from({length:28},(m,p)=>p);function Zt(){return f.jsx("div",{className:"article-web-art-soup-backdrop","aria-hidden":!0,children:Ue.map(m=>f.jsx("div",{className:"article-web-art-soup-cube",style:{animationDelay:`${m*.06}s`,fontSize:`${m+1}em`,"--soup-cube-depth":`${m/Math.max(1,Ue.length-1)}`},children:Ut.map((p,y)=>f.jsx("span",{className:"article-web-art-soup-face",style:{transform:p}},y))},m))})}function Jt({readyId:m,locked:p,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=a.useMemo(()=>({reduceMotion:C}),[C]);a.useEffect(()=>{const v=d.current,b=R.current;if(!v||!b)return;let o=!1,e=null,r=null,t=null;const i=()=>{I.current||(I.current=!0,y==null||y(m))},n=q(async()=>{var s,c;try{const u=await z(()=>import("./soupShaderEngine-BVaccG7j.js"),__vite__mapDeps([8,1]));if(o)return;e=u.createSoupShaderEngine(b,g),w.current=e;const h=()=>$(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(s=e.renderStatic)==null||s.call(e),(c=e.start)==null||c.call(e),i(),r=new ResizeObserver(()=>{h()}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(x=>{var M,N;for(const E of x)E.isIntersecting?(M=e.start)==null||M.call(e):(N=e.stop)==null||N.call(e)},{threshold:.25}),t.observe(v))}catch{i()}},{timeoutMs:220});return()=>{var s;o=!0,n==null||n(),t==null||t.disconnect(),r==null||r.disconnect(),(s=e==null?void 0:e.destroy)==null||s.call(e),w.current=null}},[g,y,m]);const k=v=>{const b=d.current;if(!b)return{x:.5,y:.5};const o=b.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(v.clientX-o.left)/Math.max(1,o.width))),y:Math.max(0,Math.min(1,(v.clientY-o.top)/Math.max(1,o.height)))}};return f.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile","aria-label":"Soup shader web art tile",disabled:p,onPointerDown:p?void 0:v=>{var o,e,r,t;l.current=v.pointerId;try{v.currentTarget.setPointerCapture(v.pointerId)}catch{}const b=k(v);(e=(o=w.current)==null?void 0:o.setPointer)==null||e.call(o,b.x,b.y),(t=(r=w.current)==null?void 0:r.setHeld)==null||t.call(r,!0)},onPointerMove:p?void 0:v=>{var o,e;if(l.current!=null&&v.pointerId!==l.current)return;const b=k(v);(e=(o=w.current)==null?void 0:o.setPointer)==null||e.call(o,b.x,b.y)},onPointerUp:p?void 0:v=>{var b,o;l.current!=null&&v.pointerId!==l.current||(l.current=null,(o=(b=w.current)==null?void 0:b.setHeld)==null||o.call(b,!1))},onPointerCancel:p?void 0:(()=>{var v,b;l.current=null,(b=(v=w.current)==null?void 0:v.setHeld)==null||b.call(v,!1)}),onMouseMove:p?void 0:v=>{var o,e;const b=k(v);(e=(o=w.current)==null?void 0:o.setPointer)==null||e.call(o,b.x,b.y)},onMouseLeave:p?void 0:(()=>{var v,b,o,e;l.current=null,(b=(v=w.current)==null?void 0:v.setHeld)==null||b.call(v,!1),(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:p?void 0:(()=>{var v,b,o,e;l.current=null,(b=(v=w.current)==null?void 0:v.setHeld)==null||b.call(v,!1),(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),children:[f.jsx(Zt,{}),f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function Qt({readyId:m,locked:p,onReady:y}){const d=a.useRef(null),R=a.useRef(null),w=a.useRef(null),I=a.useRef(!1),l=a.useRef(null),C=a.useRef(null),g=a.useRef(0),[k,v]=a.useState(!1),[b,o]=a.useState([]),e=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=a.useMemo(()=>({reduceMotion:e}),[e]);a.useEffect(()=>{const s=d.current,c=R.current;if(!s||!c)return;let u=!1,h=null,x=null,M=null;const N=()=>{I.current||(I.current=!0,y==null||y(m))},E=q(async()=>{var S,_;try{const j=await z(()=>import("./tardisWormholeEngine-Czkyopnk.js"),__vite__mapDeps([9,1]));if(u)return;h=j.createTardisWormholeEngine(c,r),w.current=h;const L=()=>$(s,h,Math.min(1.5,window.devicePixelRatio||1));L(),(S=h.renderStatic)==null||S.call(h),(_=h.start)==null||_.call(h),N(),x=new ResizeObserver(()=>{L()}),x.observe(s),"IntersectionObserver"in window&&(M=new IntersectionObserver(D=>{var O,B;for(const V of D)V.isIntersecting?(O=h.start)==null||O.call(h):(B=h.stop)==null||B.call(h)},{threshold:.25}),M.observe(s))}catch{N()}},{timeoutMs:220});return()=>{var S;u=!0,E==null||E(),M==null||M.disconnect(),x==null||x.disconnect(),(S=h==null?void 0:h.destroy)==null||S.call(h),w.current=null}},[r,y,m]),a.useEffect(()=>{if(b.length===0)return;const s=window.setTimeout(()=>{o(c=>c.slice(1))},1e3);return()=>{window.clearTimeout(s)}},[b]),a.useEffect(()=>{var c,u,h;const s=w.current;if(s){if(p){v(!1),C.current=null,(c=s.clearPointer)==null||c.call(s),(u=s.stop)==null||u.call(s);return}(h=s.start)==null||h.call(s)}},[p]);const t=s=>{const c=d.current,u=R.current||c;if(!c||!u)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const h=u.getBoundingClientRect(),x=c.getBoundingClientRect(),M=Math.max(0,Math.min(x.width,s.clientX-x.left)),N=Math.max(0,Math.min(x.height,s.clientY-x.top)),E=Math.max(0,Math.min(h.width,s.clientX-h.left)),S=Math.max(0,Math.min(h.height,s.clientY-h.top)),_=C.current,j=_?E-_.px:0,L=_?S-_.py:0;return C.current={px:E,py:S},{x:h.width>0?E/h.width:.5,y:h.height>0?S/h.height:.5,px:M,py:N,dx:j,dy:L}},i=(s,c)=>{const u=g.current++;o(h=>[...h,{id:u,x:s,y:c}])},n=s=>{var u,h,x,M;const c=t(s);i(c.px,c.py),(h=(u=w.current)==null?void 0:u.boost)==null||h.call(u),(M=(x=w.current)==null?void 0:x.start)==null||M.call(x),v(!0),window.setTimeout(()=>{v(!1)},650)};return f.jsxs("button",{type:"button",ref:d,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${k?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:p,onClick:p?void 0:n,onContextMenu:p?void 0:(s=>{var u,h,x,M;s.preventDefault();const c=t(s);i(c.px,c.py),(h=(u=w.current)==null?void 0:u.reverseBurst)==null||h.call(u),(M=(x=w.current)==null?void 0:x.start)==null||M.call(x)}),onWheel:p?void 0:(s=>{var c,u;(u=(c=w.current)==null?void 0:c.addScrollBoost)==null||u.call(c,s.deltaY*.003)}),onPointerDown:p?void 0:s=>{var u,h;l.current=s.pointerId;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}const c=t(s);(h=(u=w.current)==null?void 0:u.setPointer)==null||h.call(u,c.x,c.y,c.dx,c.dy)},onPointerMove:p?void 0:s=>{var u,h,x,M;if(l.current!=null&&s.pointerId!==l.current)return;const c=t(s);(h=(u=w.current)==null?void 0:u.setPointer)==null||h.call(u,c.x,c.y,c.dx,c.dy),(s.buttons&1)===1&&((M=(x=w.current)==null?void 0:x.drag)==null||M.call(x,c.dx))},onPointerUp:p?void 0:s=>{l.current!=null&&s.pointerId!==l.current||(l.current=null)},onPointerCancel:p?void 0:(()=>{l.current=null}),onMouseMove:p?void 0:s=>{var u,h;const c=t(s);(h=(u=w.current)==null?void 0:u.setPointer)==null||h.call(u,c.x,c.y,c.dx,c.dy)},onMouseLeave:p?void 0:(()=>{var s,c;l.current=null,C.current=null,(c=(s=w.current)==null?void 0:s.clearPointer)==null||c.call(s)}),onBlur:p?void 0:(()=>{var s,c;l.current=null,C.current=null,(c=(s=w.current)==null?void 0:s.clearPointer)==null||c.call(s)}),onKeyDown:p?void 0:(s=>{var c,u,h,x;(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),(u=(c=w.current)==null?void 0:c.boost)==null||u.call(c),(x=(h=w.current)==null?void 0:h.start)==null||x.call(h))}),children:[f.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),f.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),f.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),f.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),f.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),f.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),b.map(s=>f.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${s.x}px`,top:`${s.y}px`},"aria-hidden":!0},s.id)),f.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function Ze({label:m,clickLabel:p,previewRequested:y=!1}){const d=Je(),R=a.useRef(null),[w,I]=a.useState(!1),[l,C]=a.useState(0),g=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=a.useCallback(()=>{C(Date.now()),I(!0)},[]),v=a.useCallback(()=>{d.navigateToSectionWithId("contact")},[d]),b=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),k())},o=a.useMemo(()=>w?Rt({seed:`${l||Date.now()}:${m}`,reduceMotion:g}):"",[m,w,l,g]);return a.useEffect(()=>{let e=0,r=0;return y?(e=window.requestAnimationFrame(()=>{r=window.requestAnimationFrame(()=>{C(Date.now()),I(!0)})}),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)}):(I(!1),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)})},[y]),f.jsxs("div",{ref:R,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${w?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":w?"Kontakt preview":m,"aria-pressed":w,onClick:k,onKeyDown:b,children:[f.jsxs("div",{className:`article-web-art-tile-cta-preview ${w?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[w&&f.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:o,sandbox:"allow-scripts"},`${l}-${m}`),f.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!w&&f.jsx("div",{className:`loader ${g?"loader-reduce-motion":""}`,"aria-hidden":!0,children:f.jsxs("div",{className:"loader-inner",children:[f.jsx("div",{className:"loader-line-wrap",children:f.jsx("div",{className:"loader-line"})}),f.jsx("div",{className:"loader-line-wrap",children:f.jsx("div",{className:"loader-line"})}),f.jsx("div",{className:"loader-line-wrap",children:f.jsx("div",{className:"loader-line"})}),f.jsx("div",{className:"loader-line-wrap",children:f.jsx("div",{className:"loader-line"})}),f.jsx("div",{className:"loader-line-wrap",children:f.jsx("div",{className:"loader-line"})})]})}),f.jsxs("div",{className:`article-web-art-tile-cta-content ${w?"article-web-art-tile-cta-content-hidden":""}`,children:[f.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:m}),f.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:p})]}),w&&f.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),v()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),v())},children:"Kontakt"})]})}function Wt({readyId:m,locked:p=!1,onReady:y}){const d=a.useRef(null),R=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),w=a.useRef(!1),I=a.useRef(0),l=a.useRef(null),C=a.useRef(null),g=a.useRef(1),k=a.useRef(null),v=a.useRef(null),b=a.useRef(null),o=a.useRef([]);return a.useEffect(()=>{y==null||y(m)},[y,m]),a.useEffect(()=>{const e=d.current;if(!e)return;const r=S=>{const _=Math.max(0,Math.min(1,S));return _*_*(3-2*_)},t=()=>{if(o.current.length)return o.current.filter(j=>j.playState!=="idle");const S=e.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),_=[];for(const j of S){const L=j.getAnimations?j.getAnimations():[];for(const D of L)_.push(D)}return o.current=_,o.current},i=S=>{const _=Math.max(1,Math.min(5.2,Number(S)||1));g.current=_;const j=t();for(const L of j)L.playbackRate=L.animationName==="wiggle-end"?Math.min(_,2.6):_},n=()=>{v.current!=null&&cancelAnimationFrame(v.current),b.current!=null&&window.clearTimeout(b.current),v.current=null,b.current=null},s=()=>{n(),i(5.2),b.current=window.setTimeout(()=>{const S=g.current,_=performance.now(),j=320,L=()=>{const D=(performance.now()-_)/j,O=r(D);i(S+(1-S)*O),D<1?v.current=requestAnimationFrame(L):v.current=null};v.current=requestAnimationFrame(L),b.current=null},2e3)},c=()=>{var O;const S=l.current;if(w.current=!1,l.current=null,e.classList.remove("article-web-art-tile-goldfish-held"),C.current!=null&&cancelAnimationFrame(C.current),C.current=null,S!=null&&((O=e.hasPointerCapture)!=null&&O.call(e,S)))try{e.releasePointerCapture(S)}catch{}const _=g.current,j=360,L=performance.now();k.current!=null&&cancelAnimationFrame(k.current);const D=()=>{const B=(performance.now()-L)/j,V=r(B);i(_+(1-_)*V),B<1?k.current=requestAnimationFrame(D):k.current=null};k.current=requestAnimationFrame(D)},u=()=>{w.current&&c()},h=()=>{if(!w.current)return;const S=performance.now()-I.current,_=1.2+4*r(S/2400);i(_),C.current=requestAnimationFrame(h)},x=S=>{if(!(R||p)&&!(S.button!=null&&S.button!==0)&&!(w.current&&l.current!==S.pointerId)){n(),w.current=!0,I.current=performance.now(),l.current=S.pointerId,e.classList.add("article-web-art-tile-goldfish-held");try{e.setPointerCapture(S.pointerId)}catch{}k.current!=null&&(cancelAnimationFrame(k.current),k.current=null),C.current==null&&(C.current=requestAnimationFrame(h))}},M=S=>{if(l.current!==S.pointerId)return;const _=performance.now()-I.current;c(),_<220&&s()},N=S=>{l.current===S.pointerId&&u()},E=S=>{l.current===S.pointerId&&u()};return e.addEventListener("pointerdown",x),e.addEventListener("pointerup",M),e.addEventListener("pointercancel",N),e.addEventListener("lostpointercapture",E),()=>{e.removeEventListener("pointerdown",x),e.removeEventListener("pointerup",M),e.removeEventListener("pointercancel",N),e.removeEventListener("lostpointercapture",E),u(),n(),k.current!=null&&cancelAnimationFrame(k.current),k.current=null,o.current=[]}},[p,R]),a.useEffect(()=>{const e=d.current;e&&e.classList.toggle("article-web-art-tile-goldfish-locked",p)},[p]),f.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:d,role:"img","aria-label":"Goldfish animation tile",children:[f.jsx("div",{className:"fish-stage",children:f.jsx("div",{className:"fish-wrapper",children:f.jsx("div",{className:"fish-container",children:f.jsxs("div",{className:"fish-parts",children:[f.jsx("div",{className:"fish-body front"}),f.jsx("div",{className:"fish-body back"}),f.jsx("div",{className:"fish-back-bottom-fin front"}),f.jsx("div",{className:"fish-back-bottom-fin back"}),f.jsx("div",{className:"fish-back-fin"}),f.jsx("div",{className:"fish-front-bottom-fin front"}),f.jsx("div",{className:"fish-front-bottom-fin back"}),f.jsx("div",{className:"fish-top-fin"})]})})})}),f.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function er({locked:m=!1}){const p=a.useRef(null),y=a.useRef([]),d=a.useRef(0),R=a.useRef(0),w=vt,I=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return a.useEffect(()=>{const l=p.current;if(!l)return;const C=y.current.filter(Boolean);if(!C.length)return;let g=!0,k=!1,v=null,b=null;const o=(x,M)=>{const N=(x-.5)*30;for(let E=0;E<C.length;E++){const S=C[E],_=E*18,j=E*8,L=(x-.5)*_,D=(M-.5)*j;S.style.transform=`translate3d(${L}px, ${D}px, 0) rotateY(${N}deg)`}},e=(x,M)=>{const N=Math.max(-.55,Math.min(.55,(x-.5)*1.1)),E=Math.max(-.35,Math.min(.35,(M-.5)*.7));o(.5+N,.5+E)},r=x=>{const M=l.getBoundingClientRect(),N=(x.clientX-M.left)/Math.max(1,M.width),E=(x.clientY-M.top)/Math.max(1,M.height);g=!0,R.current=performance.now()+650,e(Math.max(0,Math.min(1,N)),Math.max(0,Math.min(1,E)))},t=x=>{const M=l.getBoundingClientRect(),N=(x.clientX-M.left)/Math.max(1,M.width),E=(x.clientY-M.top)/Math.max(1,M.height);return{x:Math.max(0,Math.min(1,N)),y:Math.max(0,Math.min(1,E))}},i=x=>{if(x.pointerType==="mouse")return;k=!0,v=x.pointerId,g=!0,R.current=performance.now()+900;const M=t(x);e(M.x,M.y),!I&&b==null&&(b=requestAnimationFrame(h))},n=x=>{if(!k||v!=null&&x.pointerId!==v)return;g=!0,R.current=performance.now()+900;const M=t(x);e(M.x,M.y)},s=x=>{v!=null&&(x==null?void 0:x.pointerId)!=null&&x.pointerId!==v||(k=!1,v=null,g=!0,!I&&b==null&&(b=requestAnimationFrame(h)))},c=()=>{g=!0,!I&&b==null&&(b=requestAnimationFrame(h))},u=()=>{g=!0,!I&&b==null&&(b=requestAnimationFrame(h))},h=()=>{if(g){if(!I&&performance.now()>=R.current){d.current+=.008;const x=Math.sin(d.current)*.5+.5;e(x,.5)}b=requestAnimationFrame(h)}};return g=!m,l.addEventListener("mouseenter",c),l.addEventListener("mousemove",r),l.addEventListener("mouseleave",u),l.addEventListener("pointerdown",i),l.addEventListener("pointermove",n),l.addEventListener("pointerup",s),l.addEventListener("pointercancel",s),e(.5,.5),!I&&!m&&(b=requestAnimationFrame(h)),()=>{l.removeEventListener("mouseenter",c),l.removeEventListener("mousemove",r),l.removeEventListener("mouseleave",u),l.removeEventListener("pointerdown",i),l.removeEventListener("pointermove",n),l.removeEventListener("pointerup",s),l.removeEventListener("pointercancel",s),b!=null&&cancelAnimationFrame(b)}},[I]),f.jsxs("div",{ref:p,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[f.jsxs("div",{className:"patronus-card",children:[f.jsx("div",{className:"patronus-layer patronus-bg",ref:l=>{y.current[0]=l},children:f.jsx("img",{alt:"",src:w[0]})}),f.jsx("div",{className:"patronus-layer",ref:l=>{y.current[1]=l},children:f.jsx("img",{alt:"",src:w[1]})}),f.jsx("div",{className:"patronus-layer",ref:l=>{y.current[2]=l},children:f.jsx("img",{alt:"",src:w[2]})}),f.jsx("div",{className:"patronus-layer patronus-svg",ref:l=>{y.current[3]=l},dangerouslySetInnerHTML:{__html:ft}}),f.jsx("div",{className:"patronus-layer",ref:l=>{y.current[4]=l},children:f.jsx("img",{alt:"",src:w[3]})}),f.jsx("div",{className:"patronus-layer",ref:l=>{y.current[5]=l},children:f.jsx("img",{alt:"",src:w[4]})}),f.jsx("div",{className:"patronus-layer",ref:l=>{y.current[6]=l},children:f.jsx("img",{alt:"",src:w[5]})})]}),f.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{or as default};
