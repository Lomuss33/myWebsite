const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/threeTunnelEngine-BK-XbrgQ.js","assets/three-BlU1xBTi.js","assets/threePolygonDemo5Engine-4Pp_pi6A.js","assets/prismFieldEngine-KqPIY648.js","assets/soupShaderEngine-2ZPMh_O2.js","assets/tardisWormholeEngine-BrcRshYT.js"])))=>i.map(i=>d[i]);
import{f as be,A as re,g as me,_ as z}from"./index-bDtG_JT-.js";import{r as o,j as u}from"./react-vendor-2W1ZdoTw.js";import"./swiper-6d2cWb7a.js";/* empty css              */import"./bootstrap-BU5GNOV_.js";import"./vendor-DO6Tlczl.js";const xe=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`,we=`function Mash(seed) {
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
`;function B(y,{timeoutMs:f=1200}={}){if(typeof window>"u")return y(),()=>{};if("requestIdleCallback"in window){const x=window.requestIdleCallback(()=>y(),{timeout:f});return()=>window.cancelIdleCallback(x)}const C=window.setTimeout(()=>y(),0);return()=>window.clearTimeout(C)}function ve(y){if(!y)return{width:1,height:1};const f=Math.max(1,Math.round(y.clientWidth||y.getBoundingClientRect().width||1)),C=Math.max(1,Math.round(y.clientHeight||y.getBoundingClientRect().height||1));return{width:f,height:C}}function F(y,f,C=1){var h;const{width:x,height:R}=ve(y);(h=f==null?void 0:f.setSize)==null||h.call(f,x,R,C)}const ye=9,ge=9,Ce=10,Me=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"];function ke(y=ye,f=ge,C=Ce){const x=y*f,R=Math.max(1,Math.min(C,x-1)),h=new Set;for(;h.size<R;)h.add(Math.floor(Math.random()*x));const M=new Array(x).fill(0);for(let d=0;d<x;d++){if(h.has(d)){M[d]=-1;continue}const P=d%f,g=Math.floor(d/f);let S=0;for(let a=-1;a<=1;a++)for(let t=-1;t<=1;t++){if(t===0&&a===0)continue;const s=P+t,e=g+a;s<0||e<0||s>=f||e>=y||h.has(e*f+s)&&(S+=1)}M[d]=S}return{rows:y,cols:f,mineCount:R,mines:h,counts:M}}function Re(y,f,C,x){const R=new Set(C),h=[y];for(;h.length>0;){const M=h.pop();if(M==null||R.has(M)||x.has(M)||f.mines.has(M)||(R.add(M),f.counts[M]!==0))continue;const d=M%f.cols,P=Math.floor(M/f.cols);for(let g=-1;g<=1;g++)for(let S=-1;S<=1;S++){if(S===0&&g===0)continue;const a=d+S,t=P+g;a<0||t<0||a>=f.cols||t>=f.rows||h.push(t*f.cols+a)}}return R}function se(y,f,C){const x=y.rows*y.cols-y.mineCount;if(f.size>=x)return!0;if(C.size!==y.mineCount)return!1;for(const R of y.mines)if(!C.has(R))return!1;return!0}function Pe(y){return`Web art ${String(y||"tile").toLowerCase()} tile loading`}function Se({seed:y,reduceMotion:f}){const C=JSON.stringify(we.split("<\/script>").join("<\\/script>")),x=JSON.stringify(y);return`<!doctype html>
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
const moduleSource = ${C}
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
    reduceMotion: ${f?"true":"false"},
    seed: ${x}
})

const render = () => renderer.render()
render()

document.addEventListener("click", () => {
    render()
})

window.addEventListener("resize", () => {
    render()
}, { passive: true })
<\/script>
</body>
</html>`}function tt({dataWrapper:y,id:f}){const C=be(),x=`${y.uniqueId}-ambient-trace`,R=`${y.uniqueId}-ambient-hex`,h=`${y.uniqueId}-ambient-plop`,M=`${y.uniqueId}-ambient-julia`,d=`${y.uniqueId}-ambient-mines`,P=`${y.uniqueId}-ambient-rings`,g=`${y.uniqueId}-ambient-prism`,S=`${y.uniqueId}-ambient-rope`,a=`${y.uniqueId}-ambient-soup`,t=`${y.uniqueId}-ambient-tardis`,[s,e]=o.useState(null),[i,w]=o.useState(!0),b=o.useMemo(()=>y.orderedItems.slice(0,6),[y.orderedItems]),r=o.useMemo(()=>{const N=[4,5,3,6,1,2],L=new Map(b.map(O=>[Number(O==null?void 0:O.id),O])),D=[];for(const O of N){const K=L.get(O);K&&D.push(K)}for(const O of b){if(!O)continue;const K=Number(O==null?void 0:O.id);N.includes(K)||D.push(O)}return D},[b]),m=o.useRef(null),[p,n]=o.useState(!1),c=o.useRef(new Set),l=o.useRef(new Map),[v,k]=o.useState(0),[E,j]=o.useState(-1),[I,_]=o.useState(()=>new Set),[T,A]=o.useState(()=>new Set),[q,V]=o.useState(!1),G=o.useMemo(()=>{const N=r.map(L=>L==null?void 0:L.uniqueId).filter(Boolean);return N.push(x,R,h,M,d,g,P,S,a,t,"ambient-goldfish","ambient-patronus"),new Set(N)},[R,M,d,h,g,P,S,a,t,x,r]),U=o.useMemo(()=>Array.from(T).filter(N=>N!=="ambient-goldfish"&&N!=="ambient-patronus"),[T]),H=i,Y=C.selectedLanguageId||"en";let X=C.getString("send_yours");typeof X=="string"&&X.startsWith("locale:")&&(X={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[Y]||"Send yours!");let J=C.getString("click");typeof J=="string"&&J.startsWith("locale:")&&(J={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[Y]||"Click");const Z={en:{title:"Doors of the world behind an amazing art gallery.",note:"At your own risk",revealNote:"At your own risk click on the card to reveal it!",button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",note:"Auf eigenes Risiko",button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",note:"Na vlastiti rizik",button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",note:"Tüm risk size ait",button:"Gir",preparing:"Hazırlanıyor..."}}[Y]||{note:"At your own risk",button:"Enter"},oe=Y==="de"?"Auf eigenes Risiko klicke auf die Karte, um sie zu öffnen!":Y==="hr"?"Na vlastiti rizik klikni karticu da je otkriješ!":Y==="tr"?"Tüm risk size ait, göstermek için karta tıklayın!":"At your own risk click on the card to reveal it!",ae="hide",$=o.useCallback(N=>{if(!N||c.current.has(N))return;c.current.add(N);const L=l.current.get(N);L!=null&&(window.clearTimeout(L),l.current.delete(N)),k(c.current.size)},[]),W=o.useCallback(N=>{N&&A(L=>{if(L.has(N))return L;const D=new Set(L);return D.add(N),D})},[]),Q=o.useCallback(()=>{for(const N of l.current.values())window.clearTimeout(N);l.current=new Map,c.current=new Set,k(0),j(-1),n(!1),_(new Set),A(new Set),V(!1)},[]),ce=o.useCallback(()=>{w(!1),n(!0),j(r.length-1),_(new Set),A(new Set),V(!1)},[r.length]),ee=o.useCallback(N=>{N&&(W(N),_(L=>{if(L.has(N))return L;const D=new Set(L);return D.add(N),D}))},[W]),te=o.useCallback(N=>{N&&(_(L=>{if(!L.has(N))return L;const D=new Set(L);return D.delete(N),D}),A(L=>{if(!L.has(N))return L;const D=new Set(L);return D.delete(N),D}))},[]),le=G.size>0&&I.size>=G.size,ue=o.useCallback(()=>{if(G.size>0&&I.size>=G.size){_(new Set),A(new Set),V(!1);return}A(new Set(G)),_(new Set(G)),V(!0)},[G,I.size]),de=o.useCallback(()=>{Q(),w(!0)},[Q]),fe=(N,L)=>{const D=Number(N==null?void 0:N.id);return D===1?"Hover":D===2?"Wave":D===3?"3D":D===4?"Poly":D===5?"Click":D===6?"Orbit":String(L+1)},he=r.map((N,L)=>{if(!p)return u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${L+1} loading`},N.uniqueId);const D=N.uniqueId,O=I.has(D),K=T.has(D)||O;return u.jsx(ie,{label:fe(N,L),isOpen:O,onToggle:()=>{O?te(D):ee(D)},shouldRender:K,children:K&&u.jsx(Ne,{itemWrapper:N,index:L,locked:H||!O,activate:L<=E,onReady:$})},D)}),pe=p?[{key:"ambient-trace",tileId:x,label:"Trace",render:N=>u.jsx(Ae,{readyId:x,locked:H||!N,onReady:$})},{key:"ambient-hex",tileId:R,label:"Hex",render:N=>u.jsx(Oe,{readyId:R,locked:H||!N,onReady:$})},{key:"ambient-plop",tileId:h,label:"Plop",render:N=>u.jsx(He,{readyId:h,locked:H||!N,onReady:$})},{key:"ambient-julia",tileId:M,label:"Julia",render:N=>u.jsx(ze,{readyId:M,locked:H||!N,onReady:$})},{key:"ambient-mines",tileId:d,label:"Bomb",render:N=>u.jsx(Be,{readyId:d,locked:H||!N,onReady:$})},{key:"ambient-rings",tileId:P,label:"Fall",render:N=>u.jsx(Fe,{readyId:P,locked:H||!N,onReady:$})},{key:"ambient-prism",tileId:g,label:"Prism",render:N=>u.jsx($e,{readyId:g,locked:H||!N,onReady:$})},{key:"ambient-rope",tileId:S,label:"Rope",render:N=>u.jsx(Ke,{readyId:S,locked:H||!N,onReady:$})},{key:"ambient-soup",tileId:a,label:"Soup",render:N=>u.jsx(qe,{readyId:a,locked:H||!N,onReady:$})},{key:"ambient-tardis",tileId:t,label:"Tardis",render:N=>u.jsx(Ge,{readyId:t,locked:H||!N,onReady:$})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:N=>u.jsx(Ye,{locked:H||!N})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:N=>u.jsx(Ue,{locked:H||!N})}].map(({key:N,tileId:L,label:D,render:O})=>{const K=I.has(L),ne=T.has(L)||K;return u.jsx(ie,{label:D,isOpen:K,onToggle:()=>{K?te(L):ee(L)},shouldRender:ne,children:ne&&O(K)},N)}):[u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return o.useEffect(()=>{Q(),w(!0)},[y.uniqueId,Q]),o.useEffect(()=>{p&&j(r.length-1)},[p,r.length]),o.useEffect(()=>{if(p)for(const N of U){if(!N||c.current.has(N)||l.current.has(N))continue;const L=window.setTimeout(()=>{$(N)},12e3);l.current.set(N,L)}},[p,U,$]),u.jsx(re,{id:y.uniqueId,type:re.Types.SPACING_DEFAULT,dataWrapper:y,className:"article-web-art",selectedItemCategoryId:s,setSelectedItemCategoryId:e,children:u.jsxs("div",{className:"article-web-art-shell",children:[u.jsx(Ee,{note:i?Z.note:oe,buttonLabel:i?Z.button:ae,hidden:!i,onEnter:i?ce:de,secondaryButtonLabel:i?null:"promaja",onSecondaryAction:i?null:ue,secondaryPressed:le}),!i&&u.jsx("div",{className:"article-web-art-stage",children:u.jsxs("div",{className:`article-web-art-items ${H?"article-web-art-items-locked":""}`,ref:m,"aria-busy":i,children:[u.jsx(Ve,{label:X,clickLabel:J,previewRequested:q}),he,pe]})})]})})}function Ee({note:y,buttonLabel:f,hidden:C,onEnter:x,secondaryButtonLabel:R=null,onSecondaryAction:h=null,secondaryPressed:M=!1}){const d=P=>{(P.key==="Enter"||P.key===" ")&&(P.preventDefault(),x())};return u.jsx("div",{className:`article-web-art-intro-cover ${C?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:u.jsxs("div",{className:"article-web-art-intro-cover-inner",children:[u.jsx("div",{className:"article-web-art-intro-cover-actions",children:u.jsx("span",{className:`article-web-art-intro-cover-note ${C?"article-web-art-intro-cover-note-compact":"article-web-art-intro-cover-note-expanded"}`,children:y})}),u.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[R?u.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${M?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:h||void 0,"aria-pressed":M,"aria-label":R,children:R}):null,u.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:x,onKeyDown:d,"aria-label":f,children:f})]})]})})}function ie({label:y,isOpen:f,onToggle:C,shouldRender:x=!0,children:R}){return u.jsxs("div",{className:`article-web-art-gated-tile ${f?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[x?R:u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":Pe(y)}),u.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),u.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${f?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:C,"aria-label":`${f?"Hide":"Show"} ${y}`,children:y})]})}function Ne({itemWrapper:y,index:f,activate:C,locked:x,onReady:R}){return Number(y.id)===1?u.jsx(Ie,{itemWrapper:y,index:f,activate:C,locked:x,onReady:R}):Number(y.id)===2?u.jsx(Le,{itemWrapper:y,index:f,activate:C,locked:x,onReady:R}):Number(y.id)===3?u.jsx(_e,{itemWrapper:y,index:f,activate:C,locked:x,onReady:R}):Number(y.id)===4?u.jsx(Te,{itemWrapper:y,index:f,activate:C,locked:x,onReady:R}):Number(y.id)===6?u.jsx(De,{itemWrapper:y,index:f,activate:C,locked:x,onReady:R}):u.jsx(je,{itemWrapper:y,index:f,activate:C,locked:x,onReady:R})}function je({itemWrapper:y,index:f,activate:C,locked:x,onReady:R}){const h=o.useRef(null),M=o.useRef(null),d=o.useRef(null),P=o.useRef(!0),g=o.useRef(!0),S=o.useRef(!1),a=Number(y==null?void 0:y.id)===5,t=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=o.useMemo(()=>{const r=Number(y.id)||f+1,m=.0026+r*8e-5,p=.0054+r*14e-5,n=r%2?1:2,c={kx:11+r*2,ky:r%2};return{refreshDelay:a?0:8e3,radiusMini:m,radiusMaxi:p,dHueStep:n,startGroup:c,seed:1337+r*1009,reduceMotion:t}},[a,y.id,f,t]);o.useEffect(()=>{if(!C)return;const r=h.current,m=M.current;if(!r||!m)return;let p=!1,n=null,c=null,l=null;const v=()=>{S.current||(S.current=!0,R==null||R(y.uniqueId))},k=B(async()=>{var E,j;try{const I=await z(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(p)return;n=I.createEmbroideryEngine(m,s),d.current=n;const _=()=>F(r,n,window.devicePixelRatio||1);_(),(E=n.renderStatic)==null||E.call(n),g.current&&((j=n.start)==null||j.call(n)),v(),c=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),c.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const A of T){if(g.current=!!A.isIntersecting,a){g.current||n.stop();continue}g.current&&P.current?n.start():n.stop()}},{threshold:.05}),l.observe(r))}catch{v()}});return()=>{p=!0,k==null||k(),l==null||l.disconnect(),c==null||c.disconnect(),n==null||n.destroy(),d.current=null}},[C,s,y.uniqueId,R]),o.useEffect(()=>{var m,p;const r=d.current;if(r){if(x){(m=r.stop)==null||m.call(r);return}g.current&&((p=r.start)==null||p.call(r))}},[x]),o.useEffect(()=>{var m,p;const r=d.current;if(r){if(x){(m=r.stop)==null||m.call(r);return}g.current&&((p=r.start)==null||p.call(r))}},[x]);const e=()=>{var r;P.current=!0,g.current&&((r=d.current)==null||r.start())},i=()=>{var r,m,p,n;P.current=!0,g.current?(m=(r=d.current)==null?void 0:r.start)==null||m.call(r):(n=(p=d.current)==null?void 0:p.stop)==null||n.call(p)},w=()=>{var r,m,p,n,c,l,v,k,E,j;if(a){(m=(r=d.current)==null?void 0:r.stop)==null||m.call(r),(n=(p=d.current)==null?void 0:p.reset)==null||n.call(p),(l=(c=d.current)==null?void 0:c.start)==null||l.call(c);return}(v=d.current)==null||v.reset(),(E=(k=d.current)==null?void 0:k.renderStatic)==null||E.call(k),g.current&&((j=d.current)==null||j.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),w())};return u.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${f+1}`,disabled:x,onClick:x?void 0:w,onMouseEnter:x||a?void 0:e,onMouseLeave:x||a?void 0:i,onFocus:x||a?void 0:e,onBlur:x||a?void 0:i,onKeyDown:x?void 0:b,children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:a?"Click":Number.isFinite(Number(y==null?void 0:y.id))?Number(y.id):f+1})]})}function Ie({itemWrapper:y,index:f,activate:C,locked:x,onReady:R}){const h=o.useRef(null),M=o.useRef(null),d=o.useRef(null),P=o.useRef(!1),g=o.useRef(null),S=o.useRef(!1),a=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=o.useMemo(()=>({seed:9001+(Number(y.id)||1)*1337,reduceMotion:a,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:120,introDurationMs:950}),[y.id,a]);o.useEffect(()=>{if(!C)return;const n=h.current,c=M.current;if(!n||!c)return;let l=!1,v=null,k=null;const E=()=>{P.current||(P.current=!0,R==null||R(y.uniqueId))},j=B(async()=>{var I,_;try{const T=await z(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(l)return;v=T.createSpiralDotsEngine(c,t),d.current=v;const A=()=>F(n,v,window.devicePixelRatio||1);A(),(I=v.renderStatic)==null||I.call(v),(_=v.start)==null||_.call(v),E(),k=new ResizeObserver(()=>{var q;A(),v.rebuildDots(),(q=v.renderStatic)==null||q.call(v)}),k.observe(n)}catch{E()}});return()=>{l=!0,j==null||j(),k==null||k.disconnect(),v==null||v.destroy(),d.current=null}},[C,t,y.uniqueId,R]),o.useEffect(()=>{var c,l,v;const n=d.current;if(n){if(x){(c=n.clearMouse)==null||c.call(n),(l=n.stop)==null||l.call(n);return}(v=n.start)==null||v.call(n)}},[x]);const s=n=>{const c=h.current;if(!c)return{x:-1e4,y:-1e4};const l=c.getBoundingClientRect();return{x:n.clientX-l.left,y:n.clientY-l.top}},e=()=>{var n;(n=d.current)==null||n.start()},i=()=>{var n,c;(n=d.current)==null||n.clearMouse(),(c=d.current)==null||c.start()},w=()=>{e()},b=()=>{i()},r=n=>{var l;const c=s(n);(l=d.current)==null||l.setMouse(c.x,c.y)},m=()=>{e()},p=()=>{i()};return u.jsxs("div",{ref:h,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:x?-1:0,"aria-label":`Spiral dots web art tile ${f+1}`,onPointerDown:x?void 0:n=>{var v;if(n.pointerType==="mouse")return;const c=h.current;if(!c)return;S.current=!0,g.current=n.pointerId;try{c.setPointerCapture(n.pointerId)}catch{}e();const l=s(n);(v=d.current)==null||v.setMouse(l.x,l.y)},onPointerMove:x?void 0:n=>{var l;if(!S.current||g.current!=null&&n.pointerId!==g.current)return;const c=s(n);(l=d.current)==null||l.setMouse(c.x,c.y)},onPointerUp:x?void 0:n=>{g.current!=null&&n.pointerId!==g.current||(S.current=!1,g.current=null,i())},onPointerCancel:x?void 0:()=>{S.current=!1,g.current=null,i()},onMouseEnter:x?void 0:w,onMouseLeave:x?void 0:b,onMouseMove:x?void 0:r,onFocus:x?void 0:m,onBlur:x?void 0:p,children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function Le({itemWrapper:y,index:f,activate:C,locked:x,onReady:R}){const h=o.useRef(null),M=o.useRef(null),d=o.useRef(null),P=o.useRef(!0),g=o.useRef(!0),S=o.useRef(!1),a=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=o.useMemo(()=>({seed:424242+(Number(y.id)||2)*2027,reduceMotion:a,targetCellSize:14,gapPx:1.4}),[y.id,a]);o.useEffect(()=>{if(!C)return;const r=h.current,m=M.current;if(!r||!m)return;let p=!1,n=null,c=null,l=null;const v=()=>{S.current||(S.current=!0,R==null||R(y.uniqueId))},k=B(async()=>{var E,j;try{const I=await z(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(p)return;n=I.createGridWaveEngine(m,t),d.current=n;const _=()=>F(r,n,window.devicePixelRatio||1);_(),(E=n.renderStatic)==null||E.call(n),g.current&&((j=n.start)==null||j.call(n)),v(),c=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),c.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const A of T)g.current=!!A.isIntersecting,g.current&&P.current?n.start():n.stop()},{threshold:.05}),l.observe(r))}catch{v()}});return()=>{p=!0,k==null||k(),l==null||l.disconnect(),c==null||c.disconnect(),n==null||n.destroy(),d.current=null}},[C,t,y.uniqueId,R]);const s=()=>{var r;P.current=!0,g.current&&((r=d.current)==null||r.start())},e=()=>{var r,m,p,n;P.current=!0,g.current?(m=(r=d.current)==null?void 0:r.start)==null||m.call(r):(n=(p=d.current)==null?void 0:p.stop)==null||n.call(p)},i=r=>{const m=h.current;if(!m)return{x:0,y:0};const p=m.getBoundingClientRect();return typeof(r==null?void 0:r.clientX)!="number"||typeof(r==null?void 0:r.clientY)!="number"?{x:p.width/2,y:p.height/2}:{x:r.clientX-p.left,y:r.clientY-p.top}},w=r=>{var p,n,c,l;const m=i(r);(p=d.current)==null||p.rippleAt(m.x,m.y),(c=(n=d.current)==null?void 0:n.renderStatic)==null||c.call(n),P.current&&g.current&&((l=d.current)==null||l.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),w(null))};return u.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${f+1}`,disabled:x,onClick:x?void 0:w,onMouseEnter:x?void 0:s,onMouseLeave:x?void 0:e,onFocus:x?void 0:s,onBlur:x?void 0:e,onKeyDown:x?void 0:b,children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function _e({itemWrapper:y,index:f,activate:C,locked:x,onReady:R}){const h=o.useRef(null),M=o.useRef(null),d=o.useRef(null),P=o.useRef(!0),g=o.useRef(!0),S=o.useRef(!1),a=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=o.useMemo(()=>({reduceMotion:a,ringCount:9,cubesPerRing:10,ringSpacing:82,tunnelRadius:58,speed:4.6,exposure:1.45}),[a]);o.useEffect(()=>{if(!C)return;const b=h.current,r=M.current;if(!b||!r)return;let m=!1,p=null,n=null,c=null,l=null;const v=()=>{S.current||(S.current=!0,R==null||R(y.uniqueId))},k=async()=>{var T;const j=await z(()=>import("./threeTunnelEngine-BK-XbrgQ.js"),__vite__mapDeps([0,1]));if(m)return;p=j.createThreeTunnelEngine(r,t),d.current=p;const I=()=>F(b,p,Math.min(1.5,window.devicePixelRatio||1));return I(),p.reset(),g.current&&((T=p.start)==null||T.call(p)),v(),n=new ResizeObserver(()=>{I(),p.reset()}),n.observe(b),"IntersectionObserver"in window&&(c=new IntersectionObserver(A=>{for(const q of A)g.current=!!q.isIntersecting,g.current&&P.current?p.start():p.stop()},{threshold:.05}),c.observe(b)),()=>{c==null||c.disconnect(),n==null||n.disconnect(),p.destroy(),d.current=null}};let E=null;return l=B(()=>{k().then(j=>{E=j||null}).catch(()=>{v()})},{timeoutMs:300}),()=>{m=!0,l==null||l(),E==null||E()}},[C,t,y.uniqueId,R]),o.useEffect(()=>{var r,m,p;const b=d.current;if(b){if(x){(r=b.setHeld)==null||r.call(b,!1),(m=b.stop)==null||m.call(b);return}g.current&&((p=b.start)==null||p.call(b))}},[x]);const s=()=>{var b;P.current=!0,g.current&&((b=d.current)==null||b.start())},e=()=>{var b,r,m,p;P.current=!0,g.current?(r=(b=d.current)==null?void 0:b.start)==null||r.call(b):(p=(m=d.current)==null?void 0:m.stop)==null||p.call(m)},i=()=>{var b,r,m,p;(r=(b=d.current)==null?void 0:b.nextPalette)==null||r.call(b),(m=d.current)==null||m.reset(),g.current&&((p=d.current)==null||p.start())},w=b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),i())};return u.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${f+1}`,disabled:x,onClick:x?void 0:i,onMouseEnter:x?void 0:s,onMouseLeave:x?void 0:e,onFocus:x?void 0:s,onBlur:x?void 0:e,onKeyDown:x?void 0:w,children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),u.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Te({itemWrapper:y,index:f,activate:C,locked:x,onReady:R}){const h=o.useRef(null),M=o.useRef(null),d=o.useRef(null),P=o.useRef(!0),g=o.useRef(!0),S=o.useRef(!1),a=o.useRef(null),t=o.useRef(null),s=o.useRef(!1),e=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),i=o.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,x]);o.useEffect(()=>{if(!C)return;const r=h.current,m=M.current;if(!r||!m)return;let p=!1,n=null,c=null;const l=()=>{S.current||(S.current=!0,R==null||R(y.uniqueId))},v=async()=>{var T;const k=await z(()=>import("./threePolygonDemo5Engine-4Pp_pi6A.js"),__vite__mapDeps([2,1]));if(p)return;const E=k.createThreePolygonDemo5Engine(m,i);d.current=E;const j=()=>F(r,E,Math.min(1.2,window.devicePixelRatio||1));j(),E.reset(),g.current&&((T=E.start)==null||T.call(E)),l();const I=new ResizeObserver(()=>{j()});I.observe(r);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(A=>{for(const q of A)g.current=!!q.isIntersecting,g.current&&P.current?E.start():E.stop()},{threshold:.05}),_.observe(r)),n=()=>{_==null||_.disconnect(),I.disconnect(),E.destroy(),d.current=null}};return c=B(()=>{v().catch(()=>{l()})},{timeoutMs:300}),()=>{p=!0,c==null||c(),t.current!=null&&window.clearTimeout(t.current),n==null||n()}},[C,i,y.uniqueId,R]);const w=()=>{var r,m,p;(m=(r=d.current)==null?void 0:r.boost)==null||m.call(r),g.current&&((p=d.current)==null||p.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),w())};return u.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${f+1}`,disabled:x,onKeyDown:x?void 0:b,onPointerDown:x?void 0:r=>{var m;if(!(r.button!=null&&r.button!==0)){a.current=r.pointerId,s.current=!1;try{r.currentTarget.setPointerCapture(r.pointerId)}catch{}g.current&&((m=d.current)==null||m.start()),t.current!=null&&window.clearTimeout(t.current),t.current=window.setTimeout(()=>{var p,n;a.current!=null&&(s.current=!0,(n=(p=d.current)==null?void 0:p.setHeld)==null||n.call(p,!0))},140)}},onPointerUp:x?void 0:r=>{var m,p;a.current!=null&&r.pointerId!==a.current||(t.current!=null&&(window.clearTimeout(t.current),t.current=null),a.current=null,s.current?(s.current=!1,(p=(m=d.current)==null?void 0:m.setHeld)==null||p.call(m,!1)):w())},onPointerCancel:x?void 0:(()=>{var r,m;t.current!=null&&(window.clearTimeout(t.current),t.current=null),a.current=null,s.current=!1,(m=(r=d.current)==null?void 0:r.setHeld)==null||m.call(r,!1)}),onLostPointerCapture:x?void 0:(()=>{var r,m;t.current!=null&&(window.clearTimeout(t.current),t.current=null),a.current=null,s.current=!1,(m=(r=d.current)==null?void 0:r.setHeld)==null||m.call(r,!1)}),onMouseEnter:x?void 0:(()=>{var r;P.current=!0,g.current&&((r=d.current)==null||r.start())}),onMouseLeave:x?void 0:(()=>{var r,m,p,n;t.current!=null&&(window.clearTimeout(t.current),t.current=null),a.current=null,s.current=!1,(m=(r=d.current)==null?void 0:r.setHeld)==null||m.call(r,!1),P.current=!0,g.current?(p=d.current)==null||p.start():(n=d.current)==null||n.stop()}),onFocus:x?void 0:(()=>{var r;P.current=!0,g.current&&((r=d.current)==null||r.start())}),onBlur:x?void 0:(()=>{var r,m,p,n;t.current!=null&&(window.clearTimeout(t.current),t.current=null),a.current=null,s.current=!1,(m=(r=d.current)==null?void 0:r.setHeld)==null||m.call(r,!1),P.current=!0,g.current?(p=d.current)==null||p.start():(n=d.current)==null||n.stop()}),children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function De({itemWrapper:y,index:f,activate:C,locked:x,onReady:R}){const h=o.useRef(null),M=o.useRef(null),d=o.useRef(null),P=o.useRef(!0),g=o.useRef(!0),S=o.useRef(!1),a=o.useRef(0),t=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=o.useMemo(()=>({reduceMotion:t,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[t]);o.useEffect(()=>{if(!C)return;const r=h.current,m=M.current;if(!r||!m)return;let p=!1,n=null,c=null,l=null;const v=()=>{S.current||(S.current=!0,R==null||R(y.uniqueId))},k=B(async()=>{var E,j;try{const I=await z(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(p)return;n=I.createOrbitCirclesEngine(m,s),d.current=n;const _=()=>F(r,n,window.devicePixelRatio||1);_(),n.reset(),(E=n.renderStatic)==null||E.call(n),g.current&&((j=n.start)==null||j.call(n)),v(),c=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),c.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const A of T)g.current=!!A.isIntersecting,g.current&&P.current?n.start():n.stop()},{threshold:.05}),l.observe(r))}catch{v()}});return()=>{p=!0,k==null||k(),l==null||l.disconnect(),c==null||c.disconnect(),n==null||n.destroy(),d.current=null}},[C,s,y.uniqueId,R]),o.useEffect(()=>{var m,p;const r=d.current;if(r){if(x){(m=r.stop)==null||m.call(r);return}g.current&&((p=r.start)==null||p.call(r))}},[x]);const e=()=>{var r;P.current=!0,g.current&&((r=d.current)==null||r.start())},i=()=>{var r,m,p,n;P.current=!0,g.current?(m=(r=d.current)==null?void 0:r.start)==null||m.call(r):(n=(p=d.current)==null?void 0:p.stop)==null||n.call(p)},w=()=>{var n,c;const r=d.current;if(!r)return;const m=[{palette:["#A8DA00","#76C700","#D9FF6A"],bgColor:"#06130a"},{palette:["#DD0F7E","#FF4FAE","#7B2CFF"],bgColor:"#200018"},{palette:["#009BBE","#00D5FF","#2B7BFF"],bgColor:"#001018"},{palette:["#F2E205","#FFB703","#EE5A02"],bgColor:"#1a0f00"},{palette:["#8A2BFF","#C300FF","#FF00C8"],bgColor:"#07000f"}],p=m[a.current%m.length];a.current=(a.current+1)%m.length,(n=r.setPalette)==null||n.call(r,p.palette,p.bgColor),g.current&&((c=r.start)==null||c.call(r))},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),w())};return u.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${f+1}`,disabled:x,onClick:x?void 0:w,onMouseEnter:x?void 0:e,onMouseLeave:x?void 0:i,onFocus:x?void 0:e,onBlur:x?void 0:i,onKeyDown:x?void 0:b,children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function Ae({readyId:y,locked:f,onReady:C}){const x=o.useRef(null),R=o.useRef(null),h=o.useRef(null),M=o.useRef(!1),d=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=o.useMemo(()=>({seed:20250414,reduceMotion:d,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[d]);o.useEffect(()=>{const a=x.current,t=R.current;if(!a||!t)return;let s=!1,e=null,i=null,w=null;const b=()=>{M.current||(M.current=!0,C==null||C(y))},r=B(async()=>{var m,p;try{const n=await z(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(s)return;e=n.createTortuosityTraceEngine(t,P),h.current=e;const c=()=>F(a,e,Math.min(1.5,window.devicePixelRatio||1));c(),(m=e.renderStatic)==null||m.call(e),(p=e.start)==null||p.call(e),b(),i=new ResizeObserver(()=>{var l;c(),(l=e.reset)==null||l.call(e)}),i.observe(a),"IntersectionObserver"in window&&(w=new IntersectionObserver(l=>{var v,k;for(const E of l)E.isIntersecting?(v=e.start)==null||v.call(e):(k=e.stop)==null||k.call(e)},{threshold:.05}),w.observe(a))}catch{b()}},{timeoutMs:200});return()=>{var m;s=!0,r==null||r(),w==null||w.disconnect(),i==null||i.disconnect(),(m=e==null?void 0:e.destroy)==null||m.call(e),h.current=null}},[P,C,y]),o.useEffect(()=>{var t,s,e;const a=h.current;if(a){if(f){(t=a.setHeld)==null||t.call(a,!1),(s=a.stop)==null||s.call(a);return}(e=a.start)==null||e.call(a)}},[f]),o.useEffect(()=>{var t,s;const a=h.current;if(a){if(f){(t=a.stop)==null||t.call(a);return}(s=a.start)==null||s.call(a)}},[f]);const g=()=>{var a,t,s,e;(t=(a=h.current)==null?void 0:a.reset)==null||t.call(a),(e=(s=h.current)==null?void 0:s.start)==null||e.call(s)},S=a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),g())};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:f,onClick:f?void 0:g,onKeyDown:f?void 0:S,children:[u.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function Oe({readyId:y,locked:f,onReady:C}){const x=o.useRef(null),R=o.useRef(null),h=o.useRef(null),M=o.useRef(!1),d=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=o.useMemo(()=>({seed:20250415,reduceMotion:d,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[d]);o.useEffect(()=>{const a=x.current,t=R.current;if(!a||!t)return;let s=!1,e=null,i=null,w=null;const b=()=>{M.current||(M.current=!0,C==null||C(y))},r=B(async()=>{var m,p;try{const n=await z(()=>import("./hexFlowBallsEngine-C4hMgqMS.js"),[]);if(s)return;e=n.createHexFlowBallsEngine(t,P),h.current=e;const c=()=>F(a,e,Math.min(1.5,window.devicePixelRatio||1));c(),(m=e.renderStatic)==null||m.call(e),(p=e.start)==null||p.call(e),b(),i=new ResizeObserver(()=>{var l;c(),(l=e.reset)==null||l.call(e)}),i.observe(a),"IntersectionObserver"in window&&(w=new IntersectionObserver(l=>{var v,k;for(const E of l)E.isIntersecting?(v=e.start)==null||v.call(e):(k=e.stop)==null||k.call(e)},{threshold:.05}),w.observe(a))}catch{b()}},{timeoutMs:220});return()=>{var m;s=!0,r==null||r(),w==null||w.disconnect(),i==null||i.disconnect(),(m=e==null?void 0:e.destroy)==null||m.call(e),h.current=null}},[P,C,y]),o.useEffect(()=>{var t,s,e;const a=h.current;if(a){if(f){(t=a.clearPointer)==null||t.call(a),(s=a.stop)==null||s.call(a);return}(e=a.start)==null||e.call(a)}},[f]),o.useEffect(()=>{var t,s;const a=h.current;if(a){if(f){(t=a.stop)==null||t.call(a);return}(s=a.start)==null||s.call(a)}},[f]);const g=()=>{var a,t,s,e;(t=(a=h.current)==null?void 0:a.toggleGridContrast)==null||t.call(a),(e=(s=h.current)==null?void 0:s.start)==null||e.call(s)},S=a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),g())};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:f,onClick:f?void 0:g,onKeyDown:f?void 0:S,children:[u.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function He({readyId:y,locked:f,onReady:C}){const x=o.useRef(null),R=o.useRef(null),h=o.useRef(null),M=o.useRef(!1),d=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=o.useMemo(()=>({seed:20250416,reduceMotion:d,step:6,side:5}),[d]);o.useEffect(()=>{const t=x.current,s=R.current;if(!t||!s)return;let e=!1,i=null,w=null,b=null;const r=()=>{M.current||(M.current=!0,C==null||C(y))},m=B(async()=>{var p,n;try{const c=await z(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;i=c.createPixelPlopEngine(s,P),h.current=i;const l=()=>F(t,i,Math.min(1.5,window.devicePixelRatio||1));l(),(p=i.renderStatic)==null||p.call(i),(n=i.start)==null||n.call(i),r(),w=new ResizeObserver(()=>{var v;l(),(v=i.reset)==null||v.call(i)}),w.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(v=>{var k,E;for(const j of v)j.isIntersecting?(k=i.start)==null||k.call(i):(E=i.stop)==null||E.call(i)},{threshold:.05}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var p;e=!0,m==null||m(),b==null||b.disconnect(),w==null||w.disconnect(),(p=i==null?void 0:i.destroy)==null||p.call(i),h.current=null}},[P,C,y]),o.useEffect(()=>{var s,e,i;const t=h.current;if(t){if(f){(s=t.clearPointer)==null||s.call(t),(e=t.stop)==null||e.call(t);return}(i=t.start)==null||i.call(t)}},[f]),o.useEffect(()=>{var s,e;const t=h.current;if(t){if(f){(s=t.stop)==null||s.call(t);return}(e=t.start)==null||e.call(t)}},[f]);const g=()=>{var t,s,e,i;(s=(t=h.current)==null?void 0:t.seedBurst)==null||s.call(t),(i=(e=h.current)==null?void 0:e.start)==null||i.call(e)},S=t=>{var i,w,b,r;const s=x.current;if(!s||typeof(t==null?void 0:t.clientX)!="number"||typeof(t==null?void 0:t.clientY)!="number"){g();return}const e=s.getBoundingClientRect();(w=(i=h.current)==null?void 0:i.burstAt)==null||w.call(i,t.clientX-e.left,t.clientY-e.top),(r=(b=h.current)==null?void 0:b.start)==null||r.call(b)},a=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),g())};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:f,onPointerDown:f?void 0:(t=>{t.button!=null&&t.button!==0||S(t)}),onKeyDown:f?void 0:a,children:[u.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function ze({readyId:y,locked:f,onReady:C}){const x=o.useRef(null),R=o.useRef(null),h=o.useRef(null),M=o.useRef(!1),d=o.useRef(null),P=o.useRef(!1),g=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),S=o.useMemo(()=>({reduceMotion:g,seed:20250417}),[g]);o.useEffect(()=>{const e=x.current,i=R.current;if(!e||!i)return;let w=!1,b=null,r=null,m=null;const p=()=>{M.current||(M.current=!0,C==null||C(y))},n=B(async()=>{var c,l;try{const v=await z(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(w)return;b=v.createJuliaLinesEngine(i,S),h.current=b;const k=()=>F(e,b,Math.min(1.5,window.devicePixelRatio||1));k(),(c=b.renderStatic)==null||c.call(b),(l=b.start)==null||l.call(b),p(),r=new ResizeObserver(()=>{k()}),r.observe(e),"IntersectionObserver"in window&&(m=new IntersectionObserver(E=>{var j,I;for(const _ of E)_.isIntersecting?(j=b.start)==null||j.call(b):(I=b.stop)==null||I.call(b)},{threshold:.05}),m.observe(e))}catch{p()}},{timeoutMs:220});return()=>{var c;w=!0,n==null||n(),m==null||m.disconnect(),r==null||r.disconnect(),(c=b==null?void 0:b.destroy)==null||c.call(b),h.current=null}},[S,C,y]),o.useEffect(()=>{var i,w,b,r;const e=h.current;if(e){if(f){(i=e.setHeld)==null||i.call(e,!1),(w=e.clearPointer)==null||w.call(e),(b=e.stop)==null||b.call(e);return}(r=e.start)==null||r.call(e)}},[f]),o.useEffect(()=>{var i,w,b;const e=h.current;if(e){if(f){(i=e.clearPointer)==null||i.call(e),(w=e.stop)==null||w.call(e);return}(b=e.start)==null||b.call(e)}},[f]);const a=e=>{const i=x.current;if(!i)return{x:.4,y:.5};const w=i.getBoundingClientRect(),b=(e.clientX-w.left)/Math.max(1,w.width),r=(e.clientY-w.top)/Math.max(1,w.height);return{x:Math.max(0,Math.min(1,b)),y:Math.max(0,Math.min(1,r))}},t=()=>{var e,i,w,b;(i=(e=h.current)==null?void 0:e.reset)==null||i.call(e),(b=(w=h.current)==null?void 0:w.start)==null||b.call(w)},s=e=>{var w,b,r,m,p,n,c,l;const i=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(b=(w=h.current)==null?void 0:w.nudge)==null||b.call(w,0,-i)):e.key==="ArrowDown"?(e.preventDefault(),(m=(r=h.current)==null?void 0:r.nudge)==null||m.call(r,0,i)):e.key==="ArrowLeft"?(e.preventDefault(),(n=(p=h.current)==null?void 0:p.nudge)==null||n.call(p,-i,0)):e.key==="ArrowRight"?(e.preventDefault(),(l=(c=h.current)==null?void 0:c.nudge)==null||l.call(c,i,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),t())};return u.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:f?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:f?void 0:e=>{var b,r;const i=x.current;if(!i)return;P.current=!0,d.current=e.pointerId;try{i.setPointerCapture(e.pointerId)}catch{}const w=a(e);(r=(b=h.current)==null?void 0:b.setPointer)==null||r.call(b,w.x,w.y)},onPointerMove:f?void 0:e=>{var w,b;if(P.current&&d.current!=null&&e.pointerId!==d.current)return;const i=a(e);(b=(w=h.current)==null?void 0:w.setPointer)==null||b.call(w,i.x,i.y)},onPointerUp:f?void 0:e=>{var i,w;d.current!=null&&e.pointerId!==d.current||(P.current=!1,d.current=null,(w=(i=h.current)==null?void 0:i.clearPointer)==null||w.call(i))},onPointerCancel:f?void 0:()=>{var e,i;P.current=!1,d.current=null,(i=(e=h.current)==null?void 0:e.clearPointer)==null||i.call(e)},onMouseMove:f?void 0:e=>{var w,b;const i=a(e);(b=(w=h.current)==null?void 0:w.setPointer)==null||b.call(w,i.x,i.y)},onMouseLeave:f?void 0:(()=>{var e,i;(i=(e=h.current)==null?void 0:e.clearPointer)==null||i.call(e)}),onBlur:f?void 0:(()=>{var e,i;(i=(e=h.current)==null?void 0:e.clearPointer)==null||i.call(e)}),onKeyDown:f?void 0:s,onClick:f?void 0:t,children:[u.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function Be({readyId:y,locked:f,onReady:C}){const[x,R]=o.useState(0),[h,M]=o.useState("mine"),[d,P]=o.useState(()=>new Set),[g,S]=o.useState(()=>new Set),[a,t]=o.useState("playing"),[s,e]=o.useState(null),[i,w]=o.useState(0),b=o.useMemo(()=>ke(),[x]);o.useEffect(()=>{C==null||C(y)},[C,y]),o.useEffect(()=>{M("mine"),P(new Set),S(new Set),t("playing"),e(null),w(0)},[x]),o.useEffect(()=>{if(s==null||a!=="playing")return;const l=()=>{w(Math.min(5999,Math.floor((Date.now()-s)/1e3)))};l();const v=window.setInterval(l,1e3);return()=>{window.clearInterval(v)}},[s,a]);const r=()=>{R(l=>l+1)},m=l=>{if(f||a!=="playing")return;if(s==null&&e(Date.now()),h==="flag"){if(d.has(l))return;const k=new Set(g);k.has(l)?k.delete(l):k.add(l),S(k),se(b,d,k)&&t("won");return}if(g.has(l)||d.has(l))return;if(b.mines.has(l)){const k=new Set(d);for(const E of b.mines)k.add(E);k.add(l),P(k),t("lost");return}const v=Re(l,b,d,g);P(v),se(b,v,g)&&t("won")},p=b.mineCount-g.size,n=`${String(Math.floor(i/60)).padStart(2,"0")}:${String(i%60).padStart(2,"0")}`;let c="🤔";return a==="lost"?c="😣":a==="won"?c="😎":g.size>=b.mineCount?c="😕":g.size>=b.mineCount-1?c="🤓":g.size>=Math.round(b.mineCount*3/4)?c="😃":g.size>=Math.round(b.mineCount*2/3)?c="😊":g.size>=Math.round(b.mineCount/2)?c="🙂":g.size>=Math.round(b.mineCount/3)?c="😏":g.size>0&&(c="😐"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:u.jsxs("div",{className:"article-web-art-minesweeper",children:[u.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[u.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${h==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>M("mine"),disabled:f||a!=="playing","aria-pressed":h==="mine",children:"⛏"}),u.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${h==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>M("flag"),disabled:f||a!=="playing","aria-pressed":h==="flag",children:"🚩"})]}),u.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[b.counts.map((l,v)=>{const k=d.has(v),E=g.has(v),j=b.mines.has(v),I=a==="lost"&&j,_=l>0?Me[l-1]:void 0;return u.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${k?"article-web-art-minesweeper-cell-revealed":""} ${I?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>m(v),disabled:f||a!=="playing","aria-label":`Minesweeper cell ${v+1}`,children:[E&&!k?u.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,I?u.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,k&&!j&&l>0?u.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:l}):null]},`mine-${x}-${v}`)}),a==="lost"?u.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:r,children:["Ooohhh 🙁",u.jsx("br",{}),"Click to try again"]}):null,a==="won"?u.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:r,children:["👌👀✔💯💯💯",u.jsx("br",{}),"Click to restart"]}):null]}),u.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[u.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[u.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:c}),u.jsx("span",{children:p})]}),u.jsx("div",{className:"article-web-art-minesweeper-timer",children:n})]}),u.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function Fe({readyId:y,locked:f,onReady:C}){const x=o.useRef(null),R=o.useRef(null),h=o.useRef(null),M=o.useRef(!1),d=o.useRef(null),P=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=o.useMemo(()=>({reduceMotion:P}),[P]);o.useEffect(()=>{const s=x.current,e=R.current;if(!s||!e)return;let i=!1,w=null,b=null,r=null;const m=()=>{M.current||(M.current=!0,C==null||C(y))},p=B(async()=>{var n,c;try{const l=await z(()=>import("./fallingRingsEngine-C9a7CL1C.js"),[]);if(i)return;w=l.createFallingRingsEngine(e,g),h.current=w;const v=()=>F(s,w,Math.min(1.5,window.devicePixelRatio||1));v(),(n=w.renderStatic)==null||n.call(w),(c=w.start)==null||c.call(w),m(),b=new ResizeObserver(()=>{v()}),b.observe(s),"IntersectionObserver"in window&&(r=new IntersectionObserver(k=>{var E,j;for(const I of k)I.isIntersecting?(E=w.start)==null||E.call(w):(j=w.stop)==null||j.call(w)},{threshold:.05}),r.observe(s))}catch{m()}},{timeoutMs:220});return()=>{var n;i=!0,p==null||p(),r==null||r.disconnect(),b==null||b.disconnect(),(n=w==null?void 0:w.destroy)==null||n.call(w),h.current=null}},[g,C,y]);const S=s=>{var e,i,w,b;(i=(e=h.current)==null?void 0:e.setHeld)==null||i.call(e,s),(b=(w=h.current)==null?void 0:w.start)==null||b.call(w)},a=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),S(!0))},t=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),S(!1))};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:f,onPointerDown:f?void 0:s=>{d.current=s.pointerId;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}S(!0)},onPointerUp:f?void 0:s=>{d.current!=null&&s.pointerId!==d.current||(d.current=null,S(!1))},onPointerCancel:f?void 0:()=>{d.current=null,S(!1)},onLostPointerCapture:f?void 0:()=>{d.current=null,S(!1)},onMouseLeave:f?void 0:(()=>{d.current!=null&&S(!1)}),onBlur:f?void 0:(()=>{d.current=null,S(!1)}),onKeyDown:f?void 0:a,onKeyUp:f?void 0:t,children:[u.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function $e({readyId:y,locked:f,onReady:C}){const x=o.useRef(null),R=o.useRef(null),h=o.useRef(null),M=o.useRef(!1),d=o.useRef(null),P=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=o.useMemo(()=>({reduceMotion:P,objectRadius:2.5,objectDepth:1,lookAtZ:40}),[P]);o.useEffect(()=>{const t=x.current,s=R.current;if(!t||!s)return;let e=!1,i=null,w=null,b=null;const r=()=>{M.current||(M.current=!0,C==null||C(y))},m=B(async()=>{var p,n;try{const c=await z(()=>import("./prismFieldEngine-KqPIY648.js"),__vite__mapDeps([3,1]));if(e)return;i=c.createPrismFieldEngine(s,g),h.current=i;const l=()=>F(t,i,Math.min(1.5,window.devicePixelRatio||1));l(),(p=i.renderStatic)==null||p.call(i),(n=i.start)==null||n.call(i),r(),w=new ResizeObserver(()=>{l()}),w.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(v=>{var k,E;for(const j of v)j.isIntersecting?(k=i.start)==null||k.call(i):(E=i.stop)==null||E.call(i)},{threshold:.05}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var p;e=!0,m==null||m(),b==null||b.disconnect(),w==null||w.disconnect(),(p=i==null?void 0:i.destroy)==null||p.call(i),h.current=null}},[g,C,y]);const S=t=>{const s=x.current;if(!s)return{x:.5,y:.5};const e=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(t.clientY-e.top)/Math.max(1,e.height)))}},a=()=>{var t,s,e,i;(s=(t=h.current)==null?void 0:t.reset)==null||s.call(t),(i=(e=h.current)==null?void 0:e.start)==null||i.call(e)};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:f,onClick:f?void 0:a,onPointerDown:f?void 0:t=>{var e,i;d.current=t.pointerId;const s=S(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerMove:f?void 0:t=>{var e,i;if(d.current!=null&&t.pointerId!==d.current)return;const s=S(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerUp:f?void 0:t=>{var s,e;d.current!=null&&t.pointerId!==d.current||(d.current=null,(e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s))},onPointerCancel:f?void 0:(()=>{var t,s;d.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onMouseMove:f?void 0:t=>{var e,i;const s=S(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onMouseLeave:f?void 0:(()=>{var t,s;d.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onBlur:f?void 0:(()=>{var t,s;d.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:f?void 0:(t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),a())}),children:[u.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function Ke({readyId:y,locked:f,onReady:C}){const x=o.useRef(null),R=o.useRef(null),h=o.useRef(null),M=o.useRef(!1),d=o.useRef(null),P=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=o.useMemo(()=>({reduceMotion:P}),[P]);o.useEffect(()=>{const t=x.current,s=R.current;if(!t||!s)return;let e=!1,i=null,w=null,b=null;const r=()=>{M.current||(M.current=!0,C==null||C(y))},m=B(async()=>{var p,n;try{const c=await z(()=>import("./ropeLightEngine-D9eJUX0t.js"),[]);if(e)return;i=c.createRopeLightEngine(s,g),h.current=i;const l=()=>F(t,i,Math.min(1.5,window.devicePixelRatio||1));l(),(p=i.renderStatic)==null||p.call(i),(n=i.start)==null||n.call(i),r(),w=new ResizeObserver(()=>{l()}),w.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(v=>{var k,E;for(const j of v)j.isIntersecting?(k=i.start)==null||k.call(i):(E=i.stop)==null||E.call(i)},{threshold:.05}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var p;e=!0,m==null||m(),b==null||b.disconnect(),w==null||w.disconnect(),(p=i==null?void 0:i.destroy)==null||p.call(i),h.current=null}},[g,C,y]);const S=t=>{const s=x.current;if(!s)return{x:.5,y:.5};const e=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(t.clientY-e.top)/Math.max(1,e.height)))}},a=()=>{var t,s,e,i;(s=(t=h.current)==null?void 0:t.reset)==null||s.call(t),(i=(e=h.current)==null?void 0:e.start)==null||i.call(e)};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:f,onClick:f?void 0:a,onPointerDown:f?void 0:t=>{var e,i;d.current=t.pointerId;const s=S(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerMove:f?void 0:t=>{var e,i;if(d.current!=null&&t.pointerId!==d.current)return;const s=S(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerUp:f?void 0:t=>{var s,e;d.current!=null&&t.pointerId!==d.current||(d.current=null,(e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s))},onPointerCancel:f?void 0:(()=>{var t,s;d.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onMouseMove:f?void 0:t=>{var e,i;const s=S(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onMouseLeave:f?void 0:(()=>{var t,s;d.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onBlur:f?void 0:(()=>{var t,s;d.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:f?void 0:(t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),a())}),children:[u.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}function qe({readyId:y,locked:f,onReady:C}){const x=o.useRef(null),R=o.useRef(null),h=o.useRef(null),M=o.useRef(!1),d=o.useRef(null),P=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=o.useMemo(()=>({reduceMotion:P}),[P]);o.useEffect(()=>{const a=x.current,t=R.current;if(!a||!t)return;let s=!1,e=null,i=null,w=null;const b=()=>{M.current||(M.current=!0,C==null||C(y))},r=B(async()=>{var m,p;try{const n=await z(()=>import("./soupShaderEngine-2ZPMh_O2.js"),__vite__mapDeps([4,1]));if(s)return;e=n.createSoupShaderEngine(t,g),h.current=e;const c=()=>F(a,e,Math.min(1.5,window.devicePixelRatio||1));c(),(m=e.renderStatic)==null||m.call(e),(p=e.start)==null||p.call(e),b(),i=new ResizeObserver(()=>{c()}),i.observe(a),"IntersectionObserver"in window&&(w=new IntersectionObserver(l=>{var v,k;for(const E of l)E.isIntersecting?(v=e.start)==null||v.call(e):(k=e.stop)==null||k.call(e)},{threshold:.05}),w.observe(a))}catch{b()}},{timeoutMs:220});return()=>{var m;s=!0,r==null||r(),w==null||w.disconnect(),i==null||i.disconnect(),(m=e==null?void 0:e.destroy)==null||m.call(e),h.current=null}},[g,C,y]);const S=a=>{const t=x.current;if(!t)return{x:.5,y:.5};const s=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(a.clientX-s.left)/Math.max(1,s.width))),y:Math.max(0,Math.min(1,(a.clientY-s.top)/Math.max(1,s.height)))}};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Soup shader web art tile",disabled:f,onPointerDown:f?void 0:a=>{var s,e,i,w;d.current=a.pointerId;try{a.currentTarget.setPointerCapture(a.pointerId)}catch{}const t=S(a);(e=(s=h.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y),(w=(i=h.current)==null?void 0:i.setHeld)==null||w.call(i,!0)},onPointerMove:f?void 0:a=>{var s,e;if(d.current!=null&&a.pointerId!==d.current)return;const t=S(a);(e=(s=h.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y)},onPointerUp:f?void 0:a=>{var t,s;d.current!=null&&a.pointerId!==d.current||(d.current=null,(s=(t=h.current)==null?void 0:t.setHeld)==null||s.call(t,!1))},onPointerCancel:f?void 0:(()=>{var a,t;d.current=null,(t=(a=h.current)==null?void 0:a.setHeld)==null||t.call(a,!1)}),onMouseMove:f?void 0:a=>{var s,e;const t=S(a);(e=(s=h.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y)},onMouseLeave:f?void 0:(()=>{var a,t,s,e;d.current=null,(t=(a=h.current)==null?void 0:a.setHeld)==null||t.call(a,!1),(e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s)}),onBlur:f?void 0:(()=>{var a,t,s,e;d.current=null,(t=(a=h.current)==null?void 0:a.setHeld)==null||t.call(a,!1),(e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s)}),children:[u.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function Ge({readyId:y,locked:f,onReady:C}){const x=o.useRef(null),R=o.useRef(null),h=o.useRef(null),M=o.useRef(!1),d=o.useRef(null),P=o.useRef(null),g=o.useRef(0),[S,a]=o.useState(!1),[t,s]=o.useState(!1),[e,i]=o.useState([]),w=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),b=o.useMemo(()=>({reduceMotion:w}),[w]);o.useEffect(()=>{const n=x.current,c=R.current;if(!n||!c)return;let l=!1,v=null,k=null,E=null;const j=()=>{M.current||(M.current=!0,C==null||C(y))},I=B(async()=>{var _,T;try{const A=await z(()=>import("./tardisWormholeEngine-BrcRshYT.js"),__vite__mapDeps([5,1]));if(l)return;v=A.createTardisWormholeEngine(c,b),h.current=v;const q=()=>F(n,v,Math.min(1.5,window.devicePixelRatio||1));q(),(_=v.renderStatic)==null||_.call(v),(T=v.start)==null||T.call(v),j(),k=new ResizeObserver(()=>{q()}),k.observe(n),"IntersectionObserver"in window&&(E=new IntersectionObserver(V=>{var G,U;for(const H of V)H.isIntersecting?(G=v.start)==null||G.call(v):(U=v.stop)==null||U.call(v)},{threshold:.05}),E.observe(n))}catch{j()}},{timeoutMs:220});return()=>{var _;l=!0,I==null||I(),E==null||E.disconnect(),k==null||k.disconnect(),(_=v==null?void 0:v.destroy)==null||_.call(v),h.current=null}},[b,C,y]),o.useEffect(()=>{if(e.length===0)return;const n=window.setTimeout(()=>{i(c=>c.slice(1))},1e3);return()=>{window.clearTimeout(n)}},[e]),o.useEffect(()=>{var c,l,v;const n=h.current;if(n){if(f){s(!1),a(!1),P.current=null,(c=n.clearPointer)==null||c.call(n),(l=n.stop)==null||l.call(n);return}(v=n.start)==null||v.call(n)}},[f]);const r=n=>{const c=x.current;if(!c)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const l=c.getBoundingClientRect(),v=Math.max(0,Math.min(l.width,n.clientX-l.left)),k=Math.max(0,Math.min(l.height,n.clientY-l.top)),E=P.current,j=E?v-E.px:0,I=E?k-E.py:0;return P.current={px:v,py:k},c.style.setProperty("--tardis-cursor-x",`${v}px`),c.style.setProperty("--tardis-cursor-y",`${k}px`),{x:l.width>0?v/l.width:.5,y:l.height>0?k/l.height:.5,px:v,py:k,dx:j,dy:I}},m=(n,c)=>{const l=g.current++;i(v=>[...v,{id:l,x:n,y:c}])},p=n=>{var l,v,k,E;const c=r(n);m(c.px,c.py),(v=(l=h.current)==null?void 0:l.boost)==null||v.call(l),(E=(k=h.current)==null?void 0:k.start)==null||E.call(k),s(!0),window.setTimeout(()=>{s(!1)},650)};return u.jsxs("button",{type:"button",ref:x,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${S?"article-web-art-tile-tardis-active":""} ${t?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:f,onClick:f?void 0:p,onContextMenu:f?void 0:(n=>{var l,v,k,E;n.preventDefault();const c=r(n);m(c.px,c.py),(v=(l=h.current)==null?void 0:l.reverseBurst)==null||v.call(l),(E=(k=h.current)==null?void 0:k.start)==null||E.call(k)}),onWheel:f?void 0:(n=>{var c,l;(l=(c=h.current)==null?void 0:c.addScrollBoost)==null||l.call(c,n.deltaY*.003)}),onPointerDown:f?void 0:n=>{var l,v;d.current=n.pointerId;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}const c=r(n);(v=(l=h.current)==null?void 0:l.setPointer)==null||v.call(l,c.x,c.y,c.dx,c.dy)},onPointerMove:f?void 0:n=>{var l,v,k,E;if(d.current!=null&&n.pointerId!==d.current)return;const c=r(n);(v=(l=h.current)==null?void 0:l.setPointer)==null||v.call(l,c.x,c.y,c.dx,c.dy),(n.buttons&1)===1&&((E=(k=h.current)==null?void 0:k.drag)==null||E.call(k,c.dx))},onPointerUp:f?void 0:n=>{d.current!=null&&n.pointerId!==d.current||(d.current=null)},onPointerCancel:f?void 0:(()=>{d.current=null}),onMouseEnter:f?void 0:(()=>{a(!0)}),onMouseMove:f?void 0:n=>{var l,v;const c=r(n);(v=(l=h.current)==null?void 0:l.setPointer)==null||v.call(l,c.x,c.y,c.dx,c.dy)},onMouseLeave:f?void 0:(()=>{var n,c;d.current=null,P.current=null,a(!1),(c=(n=h.current)==null?void 0:n.clearPointer)==null||c.call(n)}),onBlur:f?void 0:(()=>{var n,c;d.current=null,P.current=null,a(!1),(c=(n=h.current)==null?void 0:n.clearPointer)==null||c.call(n)}),onKeyDown:f?void 0:(n=>{var c,l,v,k;(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),(l=(c=h.current)==null?void 0:c.boost)==null||l.call(c),(k=(v=h.current)==null?void 0:v.start)==null||k.call(v))}),children:[u.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),u.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-cursor","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-cursor-dot","aria-hidden":!0}),u.jsxs("div",{className:"article-web-art-tardis-hud","aria-hidden":!0,children:[u.jsx("div",{className:"article-web-art-tardis-hud-label",children:"Traversing Singularity"}),u.jsx("div",{className:"article-web-art-tardis-hud-bar"})]}),e.map(n=>u.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${n.x}px`,top:`${n.y}px`},"aria-hidden":!0},n.id)),u.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function Ve({label:y,clickLabel:f,previewRequested:C=!1}){const x=me(),R=o.useRef(null),[h,M]=o.useState(!1),[d,P]=o.useState(0),g=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),S=o.useCallback(()=>{P(Date.now()),M(!0)},[]),a=o.useCallback(()=>{x.navigateToSectionWithId("contact")},[x]),t=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),S())},s=o.useMemo(()=>h?Se({seed:`${d||Date.now()}:${y}`,reduceMotion:g}):"",[y,h,d,g]);return o.useEffect(()=>{if(C){P(Date.now()),M(!0);return}M(!1)},[C]),u.jsxs("div",{ref:R,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${h?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":h?"Kontakt preview":y,"aria-pressed":h,onClick:S,onKeyDown:t,children:[u.jsxs("div",{className:`article-web-art-tile-cta-preview ${h?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[h&&u.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:s,sandbox:"allow-scripts"},`${d}-${y}`),u.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!h&&u.jsx("div",{className:`loader ${g?"loader-reduce-motion":""}`,"aria-hidden":!0,children:u.jsxs("div",{className:"loader-inner",children:[u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})})]})}),u.jsxs("div",{className:`article-web-art-tile-cta-content ${h?"article-web-art-tile-cta-content-hidden":""}`,children:[u.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:y}),u.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:f})]}),h&&u.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),a()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),a())},children:"Kontakt"})]})}function Ye({locked:y=!1}){const f=o.useRef(null),C=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),x=o.useRef(!1),R=o.useRef(0),h=o.useRef(null),M=o.useRef(null),d=o.useRef(1),P=o.useRef(null);return o.useEffect(()=>{const g=f.current;if(!g)return;const S=m=>{const p=Math.max(0,Math.min(1,m));return p*p*(3-2*p)},a=()=>{const m=g.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),p=[];for(const n of m){const c=n.getAnimations?n.getAnimations():[];for(const l of c)p.push(l)}return p},t=m=>{const p=Math.max(1,Math.min(5.2,Number(m)||1));d.current=p;const n=a();for(const c of n)c.playbackRate=p},s=()=>{x.current=!1,h.current=null,g.classList.remove("article-web-art-tile-goldfish-held"),M.current!=null&&cancelAnimationFrame(M.current),M.current=null;const m=d.current,p=360,n=performance.now();P.current!=null&&cancelAnimationFrame(P.current);const c=()=>{const l=(performance.now()-n)/p,v=S(l);t(m+(1-m)*v),l<1?P.current=requestAnimationFrame(c):P.current=null};P.current=requestAnimationFrame(c)},e=()=>{if(!x.current)return;const m=performance.now()-R.current,p=1.2+4*S(m/2400);t(p),M.current=requestAnimationFrame(e)},i=m=>{if(!C&&!(m.button!=null&&m.button!==0)){x.current=!0,R.current=performance.now(),h.current=m.pointerId,g.classList.add("article-web-art-tile-goldfish-held");try{g.setPointerCapture(m.pointerId)}catch{}P.current!=null&&(cancelAnimationFrame(P.current),P.current=null),M.current==null&&(M.current=requestAnimationFrame(e))}},w=()=>{s()},b=()=>{s()},r=()=>{s()};return g.addEventListener("pointerdown",i),g.addEventListener("pointerup",w),g.addEventListener("pointercancel",b),g.addEventListener("lostpointercapture",r),()=>{g.removeEventListener("pointerdown",i),g.removeEventListener("pointerup",w),g.removeEventListener("pointercancel",b),g.removeEventListener("lostpointercapture",r),s(),P.current!=null&&cancelAnimationFrame(P.current),P.current=null}},[C]),o.useEffect(()=>{const g=f.current;g&&g.classList.toggle("article-web-art-tile-goldfish-locked",y)},[y]),u.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:f,role:"img","aria-label":"Goldfish animation tile",children:[u.jsx("div",{className:"fish-stage",children:u.jsx("div",{className:"fish-wrapper",children:u.jsx("div",{className:"fish-container",children:u.jsxs("div",{className:"fish-parts",children:[u.jsx("div",{className:"fish-body front"}),u.jsx("div",{className:"fish-body back"}),u.jsx("div",{className:"fish-back-bottom-fin front"}),u.jsx("div",{className:"fish-back-bottom-fin back"}),u.jsx("div",{className:"fish-back-fin"}),u.jsx("div",{className:"fish-front-bottom-fin front"}),u.jsx("div",{className:"fish-front-bottom-fin back"}),u.jsx("div",{className:"fish-top-fin"})]})})})}),u.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function Ue({locked:y=!1}){const f=o.useRef(null),C=o.useRef([]),x=o.useRef(0),R=o.useRef(0),h=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return o.useEffect(()=>{const M=f.current;if(!M)return;const d=C.current.filter(Boolean);if(!d.length)return;let P=!0,g=!1,S=null,a=null;const t=(c,l)=>{const v=(c-.5)*30;for(let k=0;k<d.length;k++){const E=d[k],j=k*18,I=k*8,_=(c-.5)*j,T=(l-.5)*I;E.style.transform=`translate3d(${_}px, ${T}px, 0) rotateY(${v}deg)`}},s=(c,l)=>{const v=Math.max(-.55,Math.min(.55,(c-.5)*1.1)),k=Math.max(-.35,Math.min(.35,(l-.5)*.7));t(.5+v,.5+k)},e=c=>{const l=M.getBoundingClientRect(),v=(c.clientX-l.left)/Math.max(1,l.width),k=(c.clientY-l.top)/Math.max(1,l.height);P=!0,R.current=performance.now()+650,s(Math.max(0,Math.min(1,v)),Math.max(0,Math.min(1,k)))},i=c=>{const l=M.getBoundingClientRect(),v=(c.clientX-l.left)/Math.max(1,l.width),k=(c.clientY-l.top)/Math.max(1,l.height);return{x:Math.max(0,Math.min(1,v)),y:Math.max(0,Math.min(1,k))}},w=c=>{if(c.pointerType==="mouse")return;g=!0,S=c.pointerId,P=!0,R.current=performance.now()+900;const l=i(c);s(l.x,l.y),!h&&a==null&&(a=requestAnimationFrame(n))},b=c=>{if(!g||S!=null&&c.pointerId!==S)return;P=!0,R.current=performance.now()+900;const l=i(c);s(l.x,l.y)},r=c=>{S!=null&&(c==null?void 0:c.pointerId)!=null&&c.pointerId!==S||(g=!1,S=null,P=!0,!h&&a==null&&(a=requestAnimationFrame(n)))},m=()=>{P=!0,!h&&a==null&&(a=requestAnimationFrame(n))},p=()=>{P=!0,!h&&a==null&&(a=requestAnimationFrame(n))},n=()=>{if(P){if(!h&&performance.now()>=R.current){x.current+=.008;const c=Math.sin(x.current)*.5+.5;s(c,.5)}a=requestAnimationFrame(n)}};return P=!y,M.addEventListener("mouseenter",m),M.addEventListener("mousemove",e),M.addEventListener("mouseleave",p),M.addEventListener("pointerdown",w),M.addEventListener("pointermove",b),M.addEventListener("pointerup",r),M.addEventListener("pointercancel",r),s(.5,.5),!h&&!y&&(a=requestAnimationFrame(n)),()=>{M.removeEventListener("mouseenter",m),M.removeEventListener("mousemove",e),M.removeEventListener("mouseleave",p),M.removeEventListener("pointerdown",w),M.removeEventListener("pointermove",b),M.removeEventListener("pointerup",r),M.removeEventListener("pointercancel",r),a!=null&&cancelAnimationFrame(a)}},[h]),u.jsxs("div",{ref:f,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[u.jsxs("div",{className:"patronus-card",children:[u.jsx("div",{className:"patronus-layer patronus-bg",ref:M=>{C.current[0]=M},children:u.jsx("img",{alt:"",src:"https://drive.google.com/thumbnail?id=1gjk_fcB6iho1oHmzY-10eSKIE9TpQisx&sz=w1000"})}),u.jsx("div",{className:"patronus-layer",ref:M=>{C.current[1]=M},children:u.jsx("img",{alt:"",src:"https://drive.google.com/thumbnail?id=1TK9pzfnoR_AHoyGopthRaQZsQWjbwMHH&sz=w1000"})}),u.jsx("div",{className:"patronus-layer",ref:M=>{C.current[2]=M},children:u.jsx("img",{alt:"",src:"https://drive.google.com/thumbnail?id=1yKj48wNNwg17-JecguxMASwDNvp65tCb&sz=w1000"})}),u.jsx("div",{className:"patronus-layer patronus-svg",ref:M=>{C.current[3]=M},dangerouslySetInnerHTML:{__html:xe}}),u.jsx("div",{className:"patronus-layer",ref:M=>{C.current[4]=M},children:u.jsx("img",{alt:"",src:"https://drive.google.com/thumbnail?id=1jkpUucNkaQOPCLClpZKMdTdEzAYEszsn&sz=w1000"})}),u.jsx("div",{className:"patronus-layer",ref:M=>{C.current[5]=M},children:u.jsx("img",{alt:"",src:"https://drive.google.com/thumbnail?id=1G58IxzEgQnnWnd1vAdRmtQHfWpvb1Ipt&sz=w1000"})}),u.jsx("div",{className:"patronus-layer",ref:M=>{C.current[6]=M},children:u.jsx("img",{alt:"",src:"https://drive.google.com/thumbnail?id=1I7mg1tYxTI3EBpbNoRAXhzSua6n0XDDF&sz=w1000"})})]}),u.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{tt as default};
