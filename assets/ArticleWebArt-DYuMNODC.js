const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/threeTunnelEngine-YAbz1VnK.js","assets/three-BYTi_f6D.js","assets/threePolygonDemo5Engine-BcBzJu0K.js","assets/prismFieldEngine-Dkw-H_-R.js","assets/soupShaderEngine-DOT8TiBo.js","assets/tardisWormholeEngine-BSErFcgT.js"])))=>i.map(i=>d[i]);
import{e as be,A as re,f as me,_ as B}from"./index-BS8sBfef.js";import{r as o,j as d}from"./react-vendor-2W1ZdoTw.js";import"./swiper-BmTDCiFM.js";/* empty css              */import"./bootstrap-DrwCqbJV.js";import"./vendor-AY_MXivX.js";const xe=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`;function z(y,{timeoutMs:f=1200}={}){if(typeof window>"u")return y(),()=>{};if("requestIdleCallback"in window){const w=window.requestIdleCallback(()=>y(),{timeout:f});return()=>window.cancelIdleCallback(w)}const C=window.setTimeout(()=>y(),0);return()=>window.clearTimeout(C)}function ve(y){if(!y)return{width:1,height:1};const f=Math.max(1,Math.round(y.clientWidth||y.getBoundingClientRect().width||1)),C=Math.max(1,Math.round(y.clientHeight||y.getBoundingClientRect().height||1));return{width:f,height:C}}function $(y,f,C=1){var h;const{width:w,height:k}=ve(y);(h=f==null?void 0:f.setSize)==null||h.call(f,w,k,C)}const ye=9,ge=9,Ce=10,Me=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],ke=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function Re(y=ye,f=ge,C=Ce){const w=y*f,k=Math.max(1,Math.min(C,w-1)),h=new Set;for(;h.size<k;)h.add(Math.floor(Math.random()*w));const P=new Array(w).fill(0);for(let a=0;a<w;a++){if(h.has(a)){P[a]=-1;continue}const R=a%f,g=Math.floor(a/f);let E=0;for(let c=-1;c<=1;c++)for(let t=-1;t<=1;t++){if(t===0&&c===0)continue;const s=R+t,e=g+c;s<0||e<0||s>=f||e>=y||h.has(e*f+s)&&(E+=1)}P[a]=E}return{rows:y,cols:f,mineCount:k,mines:h,counts:P}}function Pe(y,f,C,w){const k=new Set(C),h=[y];for(;h.length>0;){const P=h.pop();if(P==null||k.has(P)||w.has(P)||f.mines.has(P)||(k.add(P),f.counts[P]!==0))continue;const a=P%f.cols,R=Math.floor(P/f.cols);for(let g=-1;g<=1;g++)for(let E=-1;E<=1;E++){if(E===0&&g===0)continue;const c=a+E,t=R+g;c<0||t<0||c>=f.cols||t>=f.rows||h.push(t*f.cols+c)}}return k}function se(y,f,C){const w=y.rows*y.cols-y.mineCount;if(f.size>=w)return!0;if(C.size!==y.mineCount)return!1;for(const k of y.mines)if(!C.has(k))return!1;return!0}function Se(y){return`Web art ${String(y||"tile").toLowerCase()} tile loading`}function Ee({seed:y,reduceMotion:f}){const C=JSON.stringify(we.split("<\/script>").join("<\\/script>")),w=JSON.stringify(y);return`<!doctype html>
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
    seed: ${w}
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
</html>`}function nt({dataWrapper:y,id:f}){const C=be(),w=`${y.uniqueId}-ambient-trace`,k=`${y.uniqueId}-ambient-hex`,h=`${y.uniqueId}-ambient-plop`,P=`${y.uniqueId}-ambient-julia`,a=`${y.uniqueId}-ambient-mines`,R=`${y.uniqueId}-ambient-rings`,g=`${y.uniqueId}-ambient-prism`,E=`${y.uniqueId}-ambient-rope`,c=`${y.uniqueId}-ambient-soup`,t=`${y.uniqueId}-ambient-tardis`,[s,e]=o.useState(null),[i,v]=o.useState(!0),b=o.useMemo(()=>y.orderedItems.slice(0,6),[y.orderedItems]),r=o.useMemo(()=>{const N=[4,5,3,6,1,2],L=new Map(b.map(O=>[Number(O==null?void 0:O.id),O])),D=[];for(const O of N){const q=L.get(O);q&&D.push(q)}for(const O of b){if(!O)continue;const q=Number(O==null?void 0:O.id);N.includes(q)||D.push(O)}return D},[b]),m=o.useRef(null),[p,n]=o.useState(!1),u=o.useRef(new Set),l=o.useRef(new Map),[x,M]=o.useState(0),[S,j]=o.useState(-1),[I,_]=o.useState(()=>new Set),[T,A]=o.useState(()=>new Set),[K,G]=o.useState(!1),V=o.useMemo(()=>{const N=r.map(L=>L==null?void 0:L.uniqueId).filter(Boolean);return N.push(w,k,h,P,a,g,R,E,c,t,"ambient-goldfish","ambient-patronus"),new Set(N)},[k,P,a,h,g,R,E,c,t,w,r]),Y=o.useMemo(()=>Array.from(T).filter(N=>N!=="ambient-goldfish"&&N!=="ambient-patronus"),[T]),H=i,U=C.selectedLanguageId||"en";let X=C.getString("send_yours");typeof X=="string"&&X.startsWith("locale:")&&(X={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[U]||"Send yours!");let J=C.getString("click");typeof J=="string"&&J.startsWith("locale:")&&(J={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[U]||"Click");const Q={en:{title:"Doors of the world behind an amazing art gallery.",note:"At your own risk",revealNote:"At your own risk click on the card to reveal it!",button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",note:"Auf eigenes Risiko",button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",note:"Na vlastiti rizik",button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",note:"Tüm risk size ait",button:"Gir",preparing:"Hazırlanıyor..."}}[U]||{note:"At your own risk",button:"Enter"},oe=U==="de"?"Auf eigenes Risiko klicke auf die Karte, um sie zu öffnen!":U==="hr"?"Na vlastiti rizik klikni karticu da je otkriješ!":U==="tr"?"Tüm risk size ait, göstermek için karta tıklayın!":"At your own risk click on the card to reveal it!",ae="hide",F=o.useCallback(N=>{if(!N||u.current.has(N))return;u.current.add(N);const L=l.current.get(N);L!=null&&(window.clearTimeout(L),l.current.delete(N)),M(u.current.size)},[]),W=o.useCallback(N=>{N&&A(L=>{if(L.has(N))return L;const D=new Set(L);return D.add(N),D})},[]),Z=o.useCallback(()=>{for(const N of l.current.values())window.clearTimeout(N);l.current=new Map,u.current=new Set,M(0),j(-1),n(!1),_(new Set),A(new Set),G(!1)},[]),ce=o.useCallback(()=>{v(!1),n(!0),j(r.length-1),_(new Set),A(new Set),G(!1)},[r.length]),ee=o.useCallback(N=>{N&&(W(N),_(L=>{if(L.has(N))return L;const D=new Set(L);return D.add(N),D}))},[W]),te=o.useCallback(N=>{N&&(_(L=>{if(!L.has(N))return L;const D=new Set(L);return D.delete(N),D}),A(L=>{if(!L.has(N))return L;const D=new Set(L);return D.delete(N),D}))},[]),le=V.size>0&&I.size>=V.size,ue=o.useCallback(()=>{if(V.size>0&&I.size>=V.size){_(new Set),A(new Set),G(!1);return}A(new Set(V)),_(new Set(V)),G(!0)},[V,I.size]),de=o.useCallback(()=>{Z(),v(!0)},[Z]),fe=(N,L)=>{const D=Number(N==null?void 0:N.id);return D===1?"Hover":D===2?"Wave":D===3?"3D":D===4?"Poly":D===5?"Click":D===6?"Orbit":String(L+1)},he=r.map((N,L)=>{if(!p)return d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${L+1} loading`},N.uniqueId);const D=N.uniqueId,O=I.has(D),q=T.has(D)||O;return d.jsx(ie,{label:fe(N,L),isOpen:O,onToggle:()=>{O?te(D):ee(D)},shouldRender:q,children:q&&d.jsx(je,{itemWrapper:N,index:L,locked:H||!O,activate:L<=S,onReady:F})},D)}),pe=p?[{key:"ambient-trace",tileId:w,label:"Trace",render:N=>d.jsx(Oe,{readyId:w,locked:H||!N,onReady:F})},{key:"ambient-hex",tileId:k,label:"Hex",render:N=>d.jsx(He,{readyId:k,locked:H||!N,onReady:F})},{key:"ambient-plop",tileId:h,label:"Plop",render:N=>d.jsx(Be,{readyId:h,locked:H||!N,onReady:F})},{key:"ambient-julia",tileId:P,label:"Julia",render:N=>d.jsx(ze,{readyId:P,locked:H||!N,onReady:F})},{key:"ambient-mines",tileId:a,label:"Bomb",render:N=>d.jsx($e,{readyId:a,locked:H||!N,onReady:F})},{key:"ambient-rings",tileId:R,label:"Fall",render:N=>d.jsx(Fe,{readyId:R,locked:H||!N,onReady:F})},{key:"ambient-prism",tileId:g,label:"Prism",render:N=>d.jsx(qe,{readyId:g,locked:H||!N,onReady:F})},{key:"ambient-rope",tileId:E,label:"Rope",render:N=>d.jsx(Ke,{readyId:E,locked:H||!N,onReady:F})},{key:"ambient-soup",tileId:c,label:"Soup",render:N=>d.jsx(Ve,{readyId:c,locked:H||!N,onReady:F})},{key:"ambient-tardis",tileId:t,label:"Tardis",render:N=>d.jsx(Ge,{readyId:t,locked:H||!N,onReady:F})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:N=>d.jsx(Ye,{locked:H||!N})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:N=>d.jsx(Xe,{locked:H||!N})}].map(({key:N,tileId:L,label:D,render:O})=>{const q=I.has(L),ne=T.has(L)||q;return d.jsx(ie,{label:D,isOpen:q,onToggle:()=>{q?te(L):ee(L)},shouldRender:ne,children:ne&&O(q)},N)}):[d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return o.useEffect(()=>{Z(),v(!0)},[y.uniqueId,Z]),o.useEffect(()=>{p&&j(r.length-1)},[p,r.length]),o.useEffect(()=>{if(p)for(const N of Y){if(!N||u.current.has(N)||l.current.has(N))continue;const L=window.setTimeout(()=>{F(N)},12e3);l.current.set(N,L)}},[p,Y,F]),d.jsx(re,{id:y.uniqueId,type:re.Types.SPACING_DEFAULT,dataWrapper:y,className:"article-web-art",selectedItemCategoryId:s,setSelectedItemCategoryId:e,children:d.jsxs("div",{className:"article-web-art-shell",children:[d.jsx(Ne,{note:i?Q.note:oe,buttonLabel:i?Q.button:ae,hidden:!i,onEnter:i?ce:de,secondaryButtonLabel:i?null:"promaja",onSecondaryAction:i?null:ue,secondaryPressed:le}),!i&&d.jsx("div",{className:"article-web-art-stage",children:d.jsxs("div",{className:`article-web-art-items ${H?"article-web-art-items-locked":""}`,ref:m,"aria-busy":i,children:[d.jsx(Ue,{label:X,clickLabel:J,previewRequested:K}),he,pe]})})]})})}function Ne({note:y,buttonLabel:f,hidden:C,onEnter:w,secondaryButtonLabel:k=null,onSecondaryAction:h=null,secondaryPressed:P=!1}){const a=R=>{(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),w())};return d.jsx("div",{className:`article-web-art-intro-cover ${C?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:d.jsxs("div",{className:"article-web-art-intro-cover-inner",children:[d.jsx("div",{className:"article-web-art-intro-cover-actions",children:d.jsx("span",{className:`article-web-art-intro-cover-note ${C?"article-web-art-intro-cover-note-compact":"article-web-art-intro-cover-note-expanded"}`,children:y})}),d.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[k?d.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${P?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:h||void 0,"aria-pressed":P,"aria-label":k,children:k}):null,d.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:w,onKeyDown:a,"aria-label":f,children:f})]})]})})}function ie({label:y,isOpen:f,onToggle:C,shouldRender:w=!0,children:k}){return d.jsxs("div",{className:`article-web-art-gated-tile ${f?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[w?k:d.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":Se(y)}),d.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),d.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${f?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:C,"aria-label":`${f?"Hide":"Show"} ${y}`,children:y})]})}function je({itemWrapper:y,index:f,activate:C,locked:w,onReady:k}){return Number(y.id)===1?d.jsx(Le,{itemWrapper:y,index:f,activate:C,locked:w,onReady:k}):Number(y.id)===2?d.jsx(_e,{itemWrapper:y,index:f,activate:C,locked:w,onReady:k}):Number(y.id)===3?d.jsx(Te,{itemWrapper:y,index:f,activate:C,locked:w,onReady:k}):Number(y.id)===4?d.jsx(De,{itemWrapper:y,index:f,activate:C,locked:w,onReady:k}):Number(y.id)===6?d.jsx(Ae,{itemWrapper:y,index:f,activate:C,locked:w,onReady:k}):d.jsx(Ie,{itemWrapper:y,index:f,activate:C,locked:w,onReady:k})}function Ie({itemWrapper:y,index:f,activate:C,locked:w,onReady:k}){const h=o.useRef(null),P=o.useRef(null),a=o.useRef(null),R=o.useRef(!0),g=o.useRef(!0),E=o.useRef(!1),c=Number(y==null?void 0:y.id)===5,t=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=o.useMemo(()=>{const r=Number(y.id)||f+1,m=.0026+r*8e-5,p=.0054+r*14e-5,n=r%2?1:2,u={kx:11+r*2,ky:r%2};return{refreshDelay:c?0:8e3,radiusMini:m,radiusMaxi:p,dHueStep:n,startGroup:u,seed:1337+r*1009,reduceMotion:t}},[c,y.id,f,t]);o.useEffect(()=>{if(!C)return;const r=h.current,m=P.current;if(!r||!m)return;let p=!1,n=null,u=null,l=null;const x=()=>{E.current||(E.current=!0,k==null||k(y.uniqueId))},M=z(async()=>{var S,j;try{const I=await B(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(p)return;n=I.createEmbroideryEngine(m,s),a.current=n;const _=()=>$(r,n,window.devicePixelRatio||1);_(),(S=n.renderStatic)==null||S.call(n),g.current&&((j=n.start)==null||j.call(n)),x(),u=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),u.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const A of T){if(g.current=!!A.isIntersecting,c){g.current||n.stop();continue}g.current&&R.current?n.start():n.stop()}},{threshold:.05}),l.observe(r))}catch{x()}});return()=>{p=!0,M==null||M(),l==null||l.disconnect(),u==null||u.disconnect(),n==null||n.destroy(),a.current=null}},[C,s,y.uniqueId,k]),o.useEffect(()=>{var m,p;const r=a.current;if(r){if(w){(m=r.stop)==null||m.call(r);return}g.current&&((p=r.start)==null||p.call(r))}},[w]),o.useEffect(()=>{var m,p;const r=a.current;if(r){if(w){(m=r.stop)==null||m.call(r);return}g.current&&((p=r.start)==null||p.call(r))}},[w]);const e=()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())},i=()=>{var r,m,p,n;R.current=!0,g.current?(m=(r=a.current)==null?void 0:r.start)==null||m.call(r):(n=(p=a.current)==null?void 0:p.stop)==null||n.call(p)},v=()=>{var r,m,p,n,u,l,x,M,S,j;if(c){(m=(r=a.current)==null?void 0:r.stop)==null||m.call(r),(n=(p=a.current)==null?void 0:p.reset)==null||n.call(p),(l=(u=a.current)==null?void 0:u.start)==null||l.call(u);return}(x=a.current)==null||x.reset(),(S=(M=a.current)==null?void 0:M.renderStatic)==null||S.call(M),g.current&&((j=a.current)==null||j.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),v())};return d.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${f+1}`,disabled:w,onClick:w?void 0:v,onMouseEnter:w||c?void 0:e,onMouseLeave:w||c?void 0:i,onFocus:w||c?void 0:e,onBlur:w||c?void 0:i,onKeyDown:w?void 0:b,children:[d.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:c?"Click":Number.isFinite(Number(y==null?void 0:y.id))?Number(y.id):f+1})]})}function Le({itemWrapper:y,index:f,activate:C,locked:w,onReady:k}){const h=o.useRef(null),P=o.useRef(null),a=o.useRef(null),R=o.useRef(!1),g=o.useRef(null),E=o.useRef(!1),c=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=o.useMemo(()=>({seed:9001+(Number(y.id)||1)*1337,reduceMotion:c,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:120,introDurationMs:950}),[y.id,c]);o.useEffect(()=>{if(!C)return;const n=h.current,u=P.current;if(!n||!u)return;let l=!1,x=null,M=null;const S=()=>{R.current||(R.current=!0,k==null||k(y.uniqueId))},j=z(async()=>{var I,_;try{const T=await B(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(l)return;x=T.createSpiralDotsEngine(u,t),a.current=x;const A=()=>$(n,x,window.devicePixelRatio||1);A(),(I=x.renderStatic)==null||I.call(x),(_=x.start)==null||_.call(x),S(),M=new ResizeObserver(()=>{var K;A(),x.rebuildDots(),(K=x.renderStatic)==null||K.call(x)}),M.observe(n)}catch{S()}});return()=>{l=!0,j==null||j(),M==null||M.disconnect(),x==null||x.destroy(),a.current=null}},[C,t,y.uniqueId,k]),o.useEffect(()=>{var u,l,x;const n=a.current;if(n){if(w){(u=n.clearMouse)==null||u.call(n),(l=n.stop)==null||l.call(n);return}(x=n.start)==null||x.call(n)}},[w]);const s=n=>{const u=h.current;if(!u)return{x:-1e4,y:-1e4};const l=u.getBoundingClientRect();return{x:n.clientX-l.left,y:n.clientY-l.top}},e=()=>{var n;(n=a.current)==null||n.start()},i=()=>{var n,u;(n=a.current)==null||n.clearMouse(),(u=a.current)==null||u.start()},v=()=>{e()},b=()=>{i()},r=n=>{var l;const u=s(n);(l=a.current)==null||l.setMouse(u.x,u.y)},m=()=>{e()},p=()=>{i()};return d.jsxs("div",{ref:h,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:w?-1:0,"aria-label":`Spiral dots web art tile ${f+1}`,onPointerDown:w?void 0:n=>{var x;if(n.pointerType==="mouse")return;const u=h.current;if(!u)return;E.current=!0,g.current=n.pointerId;try{u.setPointerCapture(n.pointerId)}catch{}e();const l=s(n);(x=a.current)==null||x.setMouse(l.x,l.y)},onPointerMove:w?void 0:n=>{var l;if(!E.current||g.current!=null&&n.pointerId!==g.current)return;const u=s(n);(l=a.current)==null||l.setMouse(u.x,u.y)},onPointerUp:w?void 0:n=>{g.current!=null&&n.pointerId!==g.current||(E.current=!1,g.current=null,i())},onPointerCancel:w?void 0:()=>{E.current=!1,g.current=null,i()},onMouseEnter:w?void 0:v,onMouseLeave:w?void 0:b,onMouseMove:w?void 0:r,onFocus:w?void 0:m,onBlur:w?void 0:p,children:[d.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function _e({itemWrapper:y,index:f,activate:C,locked:w,onReady:k}){const h=o.useRef(null),P=o.useRef(null),a=o.useRef(null),R=o.useRef(!0),g=o.useRef(!0),E=o.useRef(!1),c=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=o.useMemo(()=>({seed:424242+(Number(y.id)||2)*2027,reduceMotion:c,targetCellSize:14,gapPx:1.4}),[y.id,c]);o.useEffect(()=>{if(!C)return;const r=h.current,m=P.current;if(!r||!m)return;let p=!1,n=null,u=null,l=null;const x=()=>{E.current||(E.current=!0,k==null||k(y.uniqueId))},M=z(async()=>{var S,j;try{const I=await B(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(p)return;n=I.createGridWaveEngine(m,t),a.current=n;const _=()=>$(r,n,window.devicePixelRatio||1);_(),(S=n.renderStatic)==null||S.call(n),g.current&&((j=n.start)==null||j.call(n)),x(),u=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),u.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const A of T)g.current=!!A.isIntersecting,g.current&&R.current?n.start():n.stop()},{threshold:.05}),l.observe(r))}catch{x()}});return()=>{p=!0,M==null||M(),l==null||l.disconnect(),u==null||u.disconnect(),n==null||n.destroy(),a.current=null}},[C,t,y.uniqueId,k]);const s=()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())},e=()=>{var r,m,p,n;R.current=!0,g.current?(m=(r=a.current)==null?void 0:r.start)==null||m.call(r):(n=(p=a.current)==null?void 0:p.stop)==null||n.call(p)},i=r=>{const m=h.current;if(!m)return{x:0,y:0};const p=m.getBoundingClientRect();return typeof(r==null?void 0:r.clientX)!="number"||typeof(r==null?void 0:r.clientY)!="number"?{x:p.width/2,y:p.height/2}:{x:r.clientX-p.left,y:r.clientY-p.top}},v=r=>{var p,n,u,l;const m=i(r);(p=a.current)==null||p.rippleAt(m.x,m.y),(u=(n=a.current)==null?void 0:n.renderStatic)==null||u.call(n),R.current&&g.current&&((l=a.current)==null||l.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),v(null))};return d.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${f+1}`,disabled:w,onClick:w?void 0:v,onMouseEnter:w?void 0:s,onMouseLeave:w?void 0:e,onFocus:w?void 0:s,onBlur:w?void 0:e,onKeyDown:w?void 0:b,children:[d.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function Te({itemWrapper:y,index:f,activate:C,locked:w,onReady:k}){const h=o.useRef(null),P=o.useRef(null),a=o.useRef(null),R=o.useRef(!0),g=o.useRef(!0),E=o.useRef(!1),c=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=o.useMemo(()=>({reduceMotion:c,ringCount:9,cubesPerRing:10,ringSpacing:82,tunnelRadius:58,speed:4.6,exposure:1.45}),[c]);o.useEffect(()=>{if(!C)return;const b=h.current,r=P.current;if(!b||!r)return;let m=!1,p=null,n=null,u=null,l=null;const x=()=>{E.current||(E.current=!0,k==null||k(y.uniqueId))},M=async()=>{var T;const j=await B(()=>import("./threeTunnelEngine-YAbz1VnK.js"),__vite__mapDeps([0,1]));if(m)return;p=j.createThreeTunnelEngine(r,t),a.current=p;const I=()=>$(b,p,Math.min(1.5,window.devicePixelRatio||1));return I(),p.reset(),g.current&&((T=p.start)==null||T.call(p)),x(),n=new ResizeObserver(()=>{I(),p.reset()}),n.observe(b),"IntersectionObserver"in window&&(u=new IntersectionObserver(A=>{for(const K of A)g.current=!!K.isIntersecting,g.current&&R.current?p.start():p.stop()},{threshold:.05}),u.observe(b)),()=>{u==null||u.disconnect(),n==null||n.disconnect(),p.destroy(),a.current=null}};let S=null;return l=z(()=>{M().then(j=>{S=j||null}).catch(()=>{x()})},{timeoutMs:300}),()=>{m=!0,l==null||l(),S==null||S()}},[C,t,y.uniqueId,k]),o.useEffect(()=>{var r,m,p;const b=a.current;if(b){if(w){(r=b.setHeld)==null||r.call(b,!1),(m=b.stop)==null||m.call(b);return}g.current&&((p=b.start)==null||p.call(b))}},[w]);const s=()=>{var b;R.current=!0,g.current&&((b=a.current)==null||b.start())},e=()=>{var b,r,m,p;R.current=!0,g.current?(r=(b=a.current)==null?void 0:b.start)==null||r.call(b):(p=(m=a.current)==null?void 0:m.stop)==null||p.call(m)},i=()=>{var b,r,m,p;(r=(b=a.current)==null?void 0:b.nextPalette)==null||r.call(b),(m=a.current)==null||m.reset(),g.current&&((p=a.current)==null||p.start())},v=b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),i())};return d.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${f+1}`,disabled:w,onClick:w?void 0:i,onMouseEnter:w?void 0:s,onMouseLeave:w?void 0:e,onFocus:w?void 0:s,onBlur:w?void 0:e,onKeyDown:w?void 0:v,children:[d.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),d.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),d.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function De({itemWrapper:y,index:f,activate:C,locked:w,onReady:k}){const h=o.useRef(null),P=o.useRef(null),a=o.useRef(null),R=o.useRef(!0),g=o.useRef(!0),E=o.useRef(!1),c=o.useRef(null),t=o.useRef(null),s=o.useRef(!1),e=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),i=o.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,w]);o.useEffect(()=>{if(!C)return;const r=h.current,m=P.current;if(!r||!m)return;let p=!1,n=null,u=null;const l=()=>{E.current||(E.current=!0,k==null||k(y.uniqueId))},x=async()=>{var T;const M=await B(()=>import("./threePolygonDemo5Engine-BcBzJu0K.js"),__vite__mapDeps([2,1]));if(p)return;const S=M.createThreePolygonDemo5Engine(m,i);a.current=S;const j=()=>$(r,S,Math.min(1.2,window.devicePixelRatio||1));j(),S.reset(),g.current&&((T=S.start)==null||T.call(S)),l();const I=new ResizeObserver(()=>{j()});I.observe(r);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(A=>{for(const K of A)g.current=!!K.isIntersecting,g.current&&R.current?S.start():S.stop()},{threshold:.05}),_.observe(r)),n=()=>{_==null||_.disconnect(),I.disconnect(),S.destroy(),a.current=null}};return u=z(()=>{x().catch(()=>{l()})},{timeoutMs:300}),()=>{p=!0,u==null||u(),t.current!=null&&window.clearTimeout(t.current),n==null||n()}},[C,i,y.uniqueId,k]);const v=()=>{var r,m,p;(m=(r=a.current)==null?void 0:r.boost)==null||m.call(r),g.current&&((p=a.current)==null||p.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),v())};return d.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${f+1}`,disabled:w,onKeyDown:w?void 0:b,onPointerDown:w?void 0:r=>{var m;if(!(r.button!=null&&r.button!==0)){c.current=r.pointerId,s.current=!1;try{r.currentTarget.setPointerCapture(r.pointerId)}catch{}g.current&&((m=a.current)==null||m.start()),t.current!=null&&window.clearTimeout(t.current),t.current=window.setTimeout(()=>{var p,n;c.current!=null&&(s.current=!0,(n=(p=a.current)==null?void 0:p.setHeld)==null||n.call(p,!0))},140)}},onPointerUp:w?void 0:r=>{var m,p;c.current!=null&&r.pointerId!==c.current||(t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current?(s.current=!1,(p=(m=a.current)==null?void 0:m.setHeld)==null||p.call(m,!1)):v())},onPointerCancel:w?void 0:(()=>{var r,m;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(m=(r=a.current)==null?void 0:r.setHeld)==null||m.call(r,!1)}),onLostPointerCapture:w?void 0:(()=>{var r,m;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(m=(r=a.current)==null?void 0:r.setHeld)==null||m.call(r,!1)}),onMouseEnter:w?void 0:(()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())}),onMouseLeave:w?void 0:(()=>{var r,m,p,n;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(m=(r=a.current)==null?void 0:r.setHeld)==null||m.call(r,!1),R.current=!0,g.current?(p=a.current)==null||p.start():(n=a.current)==null||n.stop()}),onFocus:w?void 0:(()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())}),onBlur:w?void 0:(()=>{var r,m,p,n;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(m=(r=a.current)==null?void 0:r.setHeld)==null||m.call(r,!1),R.current=!0,g.current?(p=a.current)==null||p.start():(n=a.current)==null||n.stop()}),children:[d.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function Ae({itemWrapper:y,index:f,activate:C,locked:w,onReady:k}){const h=o.useRef(null),P=o.useRef(null),a=o.useRef(null),R=o.useRef(!0),g=o.useRef(!0),E=o.useRef(!1),c=o.useRef(0),t=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=o.useMemo(()=>({reduceMotion:t,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[t]);o.useEffect(()=>{if(!C)return;const r=h.current,m=P.current;if(!r||!m)return;let p=!1,n=null,u=null,l=null;const x=()=>{E.current||(E.current=!0,k==null||k(y.uniqueId))},M=z(async()=>{var S,j;try{const I=await B(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(p)return;n=I.createOrbitCirclesEngine(m,s),a.current=n;const _=()=>$(r,n,window.devicePixelRatio||1);_(),n.reset(),(S=n.renderStatic)==null||S.call(n),g.current&&((j=n.start)==null||j.call(n)),x(),u=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),u.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const A of T)g.current=!!A.isIntersecting,g.current&&R.current?n.start():n.stop()},{threshold:.05}),l.observe(r))}catch{x()}});return()=>{p=!0,M==null||M(),l==null||l.disconnect(),u==null||u.disconnect(),n==null||n.destroy(),a.current=null}},[C,s,y.uniqueId,k]),o.useEffect(()=>{var m,p;const r=a.current;if(r){if(w){(m=r.stop)==null||m.call(r);return}g.current&&((p=r.start)==null||p.call(r))}},[w]);const e=()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())},i=()=>{var r,m,p,n;R.current=!0,g.current?(m=(r=a.current)==null?void 0:r.start)==null||m.call(r):(n=(p=a.current)==null?void 0:p.stop)==null||n.call(p)},v=()=>{var n,u;const r=a.current;if(!r)return;const m=[{palette:["#A8DA00","#76C700","#D9FF6A"],bgColor:"#06130a"},{palette:["#DD0F7E","#FF4FAE","#7B2CFF"],bgColor:"#200018"},{palette:["#009BBE","#00D5FF","#2B7BFF"],bgColor:"#001018"},{palette:["#F2E205","#FFB703","#EE5A02"],bgColor:"#1a0f00"},{palette:["#8A2BFF","#C300FF","#FF00C8"],bgColor:"#07000f"}],p=m[c.current%m.length];c.current=(c.current+1)%m.length,(n=r.setPalette)==null||n.call(r,p.palette,p.bgColor),g.current&&((u=r.start)==null||u.call(r))},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),v())};return d.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${f+1}`,disabled:w,onClick:w?void 0:v,onMouseEnter:w?void 0:e,onMouseLeave:w?void 0:i,onFocus:w?void 0:e,onBlur:w?void 0:i,onKeyDown:w?void 0:b,children:[d.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function Oe({readyId:y,locked:f,onReady:C}){const w=o.useRef(null),k=o.useRef(null),h=o.useRef(null),P=o.useRef(!1),a=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=o.useMemo(()=>({seed:20250414,reduceMotion:a,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[a]);o.useEffect(()=>{const c=w.current,t=k.current;if(!c||!t)return;let s=!1,e=null,i=null,v=null;const b=()=>{P.current||(P.current=!0,C==null||C(y))},r=z(async()=>{var m,p;try{const n=await B(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(s)return;e=n.createTortuosityTraceEngine(t,R),h.current=e;const u=()=>$(c,e,Math.min(1.5,window.devicePixelRatio||1));u(),(m=e.renderStatic)==null||m.call(e),(p=e.start)==null||p.call(e),b(),i=new ResizeObserver(()=>{var l;u(),(l=e.reset)==null||l.call(e)}),i.observe(c),"IntersectionObserver"in window&&(v=new IntersectionObserver(l=>{var x,M;for(const S of l)S.isIntersecting?(x=e.start)==null||x.call(e):(M=e.stop)==null||M.call(e)},{threshold:.05}),v.observe(c))}catch{b()}},{timeoutMs:200});return()=>{var m;s=!0,r==null||r(),v==null||v.disconnect(),i==null||i.disconnect(),(m=e==null?void 0:e.destroy)==null||m.call(e),h.current=null}},[R,C,y]),o.useEffect(()=>{var t,s,e;const c=h.current;if(c){if(f){(t=c.setHeld)==null||t.call(c,!1),(s=c.stop)==null||s.call(c);return}(e=c.start)==null||e.call(c)}},[f]),o.useEffect(()=>{var t,s;const c=h.current;if(c){if(f){(t=c.stop)==null||t.call(c);return}(s=c.start)==null||s.call(c)}},[f]);const g=()=>{var c,t,s,e;(t=(c=h.current)==null?void 0:c.reset)==null||t.call(c),(e=(s=h.current)==null?void 0:s.start)==null||e.call(s)},E=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),g())};return d.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:f,onClick:f?void 0:g,onKeyDown:f?void 0:E,children:[d.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function He({readyId:y,locked:f,onReady:C}){const w=o.useRef(null),k=o.useRef(null),h=o.useRef(null),P=o.useRef(!1),a=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=o.useMemo(()=>({seed:20250415,reduceMotion:a,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[a]);o.useEffect(()=>{const c=w.current,t=k.current;if(!c||!t)return;let s=!1,e=null,i=null,v=null;const b=()=>{P.current||(P.current=!0,C==null||C(y))},r=z(async()=>{var m,p;try{const n=await B(()=>import("./hexFlowBallsEngine-C4hMgqMS.js"),[]);if(s)return;e=n.createHexFlowBallsEngine(t,R),h.current=e;const u=()=>$(c,e,Math.min(1.5,window.devicePixelRatio||1));u(),(m=e.renderStatic)==null||m.call(e),(p=e.start)==null||p.call(e),b(),i=new ResizeObserver(()=>{var l;u(),(l=e.reset)==null||l.call(e)}),i.observe(c),"IntersectionObserver"in window&&(v=new IntersectionObserver(l=>{var x,M;for(const S of l)S.isIntersecting?(x=e.start)==null||x.call(e):(M=e.stop)==null||M.call(e)},{threshold:.05}),v.observe(c))}catch{b()}},{timeoutMs:220});return()=>{var m;s=!0,r==null||r(),v==null||v.disconnect(),i==null||i.disconnect(),(m=e==null?void 0:e.destroy)==null||m.call(e),h.current=null}},[R,C,y]),o.useEffect(()=>{var t,s,e;const c=h.current;if(c){if(f){(t=c.clearPointer)==null||t.call(c),(s=c.stop)==null||s.call(c);return}(e=c.start)==null||e.call(c)}},[f]),o.useEffect(()=>{var t,s;const c=h.current;if(c){if(f){(t=c.stop)==null||t.call(c);return}(s=c.start)==null||s.call(c)}},[f]);const g=()=>{var c,t,s,e;(t=(c=h.current)==null?void 0:c.toggleGridContrast)==null||t.call(c),(e=(s=h.current)==null?void 0:s.start)==null||e.call(s)},E=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),g())};return d.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:f,onClick:f?void 0:g,onKeyDown:f?void 0:E,children:[d.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function Be({readyId:y,locked:f,onReady:C}){const w=o.useRef(null),k=o.useRef(null),h=o.useRef(null),P=o.useRef(!1),a=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=o.useMemo(()=>({seed:20250416,reduceMotion:a,step:6,side:5}),[a]);o.useEffect(()=>{const t=w.current,s=k.current;if(!t||!s)return;let e=!1,i=null,v=null,b=null;const r=()=>{P.current||(P.current=!0,C==null||C(y))},m=z(async()=>{var p,n;try{const u=await B(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;i=u.createPixelPlopEngine(s,R),h.current=i;const l=()=>$(t,i,Math.min(1.5,window.devicePixelRatio||1));l(),(p=i.renderStatic)==null||p.call(i),(n=i.start)==null||n.call(i),r(),v=new ResizeObserver(()=>{var x;l(),(x=i.reset)==null||x.call(i)}),v.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(x=>{var M,S;for(const j of x)j.isIntersecting?(M=i.start)==null||M.call(i):(S=i.stop)==null||S.call(i)},{threshold:.05}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var p;e=!0,m==null||m(),b==null||b.disconnect(),v==null||v.disconnect(),(p=i==null?void 0:i.destroy)==null||p.call(i),h.current=null}},[R,C,y]),o.useEffect(()=>{var s,e,i;const t=h.current;if(t){if(f){(s=t.clearPointer)==null||s.call(t),(e=t.stop)==null||e.call(t);return}(i=t.start)==null||i.call(t)}},[f]),o.useEffect(()=>{var s,e;const t=h.current;if(t){if(f){(s=t.stop)==null||s.call(t);return}(e=t.start)==null||e.call(t)}},[f]);const g=()=>{var t,s,e,i;(s=(t=h.current)==null?void 0:t.seedBurst)==null||s.call(t),(i=(e=h.current)==null?void 0:e.start)==null||i.call(e)},E=t=>{var i,v,b,r;const s=w.current;if(!s||typeof(t==null?void 0:t.clientX)!="number"||typeof(t==null?void 0:t.clientY)!="number"){g();return}const e=s.getBoundingClientRect();(v=(i=h.current)==null?void 0:i.burstAt)==null||v.call(i,t.clientX-e.left,t.clientY-e.top),(r=(b=h.current)==null?void 0:b.start)==null||r.call(b)},c=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),g())};return d.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:f,onPointerDown:f?void 0:(t=>{t.button!=null&&t.button!==0||E(t)}),onKeyDown:f?void 0:c,children:[d.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function ze({readyId:y,locked:f,onReady:C}){const w=o.useRef(null),k=o.useRef(null),h=o.useRef(null),P=o.useRef(!1),a=o.useRef(null),R=o.useRef(!1),g=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),E=o.useMemo(()=>({reduceMotion:g,seed:20250417}),[g]);o.useEffect(()=>{const e=w.current,i=k.current;if(!e||!i)return;let v=!1,b=null,r=null,m=null;const p=()=>{P.current||(P.current=!0,C==null||C(y))},n=z(async()=>{var u,l;try{const x=await B(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(v)return;b=x.createJuliaLinesEngine(i,E),h.current=b;const M=()=>$(e,b,Math.min(1.5,window.devicePixelRatio||1));M(),(u=b.renderStatic)==null||u.call(b),(l=b.start)==null||l.call(b),p(),r=new ResizeObserver(()=>{M()}),r.observe(e),"IntersectionObserver"in window&&(m=new IntersectionObserver(S=>{var j,I;for(const _ of S)_.isIntersecting?(j=b.start)==null||j.call(b):(I=b.stop)==null||I.call(b)},{threshold:.05}),m.observe(e))}catch{p()}},{timeoutMs:220});return()=>{var u;v=!0,n==null||n(),m==null||m.disconnect(),r==null||r.disconnect(),(u=b==null?void 0:b.destroy)==null||u.call(b),h.current=null}},[E,C,y]),o.useEffect(()=>{var i,v,b,r;const e=h.current;if(e){if(f){(i=e.setHeld)==null||i.call(e,!1),(v=e.clearPointer)==null||v.call(e),(b=e.stop)==null||b.call(e);return}(r=e.start)==null||r.call(e)}},[f]),o.useEffect(()=>{var i,v,b;const e=h.current;if(e){if(f){(i=e.clearPointer)==null||i.call(e),(v=e.stop)==null||v.call(e);return}(b=e.start)==null||b.call(e)}},[f]);const c=e=>{const i=w.current;if(!i)return{x:.4,y:.5};const v=i.getBoundingClientRect(),b=(e.clientX-v.left)/Math.max(1,v.width),r=(e.clientY-v.top)/Math.max(1,v.height);return{x:Math.max(0,Math.min(1,b)),y:Math.max(0,Math.min(1,r))}},t=()=>{var e,i,v,b;(i=(e=h.current)==null?void 0:e.reset)==null||i.call(e),(b=(v=h.current)==null?void 0:v.start)==null||b.call(v)},s=e=>{var v,b,r,m,p,n,u,l;const i=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(b=(v=h.current)==null?void 0:v.nudge)==null||b.call(v,0,-i)):e.key==="ArrowDown"?(e.preventDefault(),(m=(r=h.current)==null?void 0:r.nudge)==null||m.call(r,0,i)):e.key==="ArrowLeft"?(e.preventDefault(),(n=(p=h.current)==null?void 0:p.nudge)==null||n.call(p,-i,0)):e.key==="ArrowRight"?(e.preventDefault(),(l=(u=h.current)==null?void 0:u.nudge)==null||l.call(u,i,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),t())};return d.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:f?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:f?void 0:e=>{var b,r;const i=w.current;if(!i)return;R.current=!0,a.current=e.pointerId;try{i.setPointerCapture(e.pointerId)}catch{}const v=c(e);(r=(b=h.current)==null?void 0:b.setPointer)==null||r.call(b,v.x,v.y)},onPointerMove:f?void 0:e=>{var v,b;if(R.current&&a.current!=null&&e.pointerId!==a.current)return;const i=c(e);(b=(v=h.current)==null?void 0:v.setPointer)==null||b.call(v,i.x,i.y)},onPointerUp:f?void 0:e=>{var i,v;a.current!=null&&e.pointerId!==a.current||(R.current=!1,a.current=null,(v=(i=h.current)==null?void 0:i.clearPointer)==null||v.call(i))},onPointerCancel:f?void 0:()=>{var e,i;R.current=!1,a.current=null,(i=(e=h.current)==null?void 0:e.clearPointer)==null||i.call(e)},onMouseMove:f?void 0:e=>{var v,b;const i=c(e);(b=(v=h.current)==null?void 0:v.setPointer)==null||b.call(v,i.x,i.y)},onMouseLeave:f?void 0:(()=>{var e,i;(i=(e=h.current)==null?void 0:e.clearPointer)==null||i.call(e)}),onBlur:f?void 0:(()=>{var e,i;(i=(e=h.current)==null?void 0:e.clearPointer)==null||i.call(e)}),onKeyDown:f?void 0:s,onClick:f?void 0:t,children:[d.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function $e({readyId:y,locked:f,onReady:C}){const[w,k]=o.useState(0),[h,P]=o.useState("mine"),[a,R]=o.useState(()=>new Set),[g,E]=o.useState(()=>new Set),[c,t]=o.useState("playing"),[s,e]=o.useState(null),[i,v]=o.useState(0),b=o.useMemo(()=>Re(),[w]);o.useEffect(()=>{C==null||C(y)},[C,y]),o.useEffect(()=>{P("mine"),R(new Set),E(new Set),t("playing"),e(null),v(0)},[w]),o.useEffect(()=>{if(s==null||c!=="playing")return;const l=()=>{v(Math.min(5999,Math.floor((Date.now()-s)/1e3)))};l();const x=window.setInterval(l,1e3);return()=>{window.clearInterval(x)}},[s,c]);const r=()=>{k(l=>l+1)},m=l=>{if(f||c!=="playing")return;if(s==null&&e(Date.now()),h==="flag"){if(a.has(l))return;const M=new Set(g);M.has(l)?M.delete(l):M.add(l),E(M),se(b,a,M)&&t("won");return}if(g.has(l)||a.has(l))return;if(b.mines.has(l)){const M=new Set(a);for(const S of b.mines)M.add(S);M.add(l),R(M),t("lost");return}const x=Pe(l,b,a,g);R(x),se(b,x,g)&&t("won")},p=b.mineCount-g.size,n=`${String(Math.floor(i/60)).padStart(2,"0")}:${String(i%60).padStart(2,"0")}`;let u="🤔";return c==="lost"?u="😣":c==="won"?u="😎":g.size>=b.mineCount?u="😕":g.size>=b.mineCount-1?u="🤓":g.size>=Math.round(b.mineCount*3/4)?u="😃":g.size>=Math.round(b.mineCount*2/3)?u="😊":g.size>=Math.round(b.mineCount/2)?u="🙂":g.size>=Math.round(b.mineCount/3)?u="😏":g.size>0&&(u="😐"),d.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:d.jsxs("div",{className:"article-web-art-minesweeper",children:[d.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[d.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${h==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("mine"),disabled:f||c!=="playing","aria-pressed":h==="mine",children:"⛏"}),d.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${h==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("flag"),disabled:f||c!=="playing","aria-pressed":h==="flag",children:"🚩"})]}),d.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[b.counts.map((l,x)=>{const M=a.has(x),S=g.has(x),j=b.mines.has(x),I=c==="lost"&&j,_=l>0?Me[l-1]:void 0;return d.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${M?"article-web-art-minesweeper-cell-revealed":""} ${I?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>m(x),disabled:f||c!=="playing","aria-label":`Minesweeper cell ${x+1}`,children:[S&&!M?d.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,I?d.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,M&&!j&&l>0?d.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:l}):null]},`mine-${w}-${x}`)}),c==="lost"?d.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:r,children:["Ooohhh 🙁",d.jsx("br",{}),"Click to try again"]}):null,c==="won"?d.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:r,children:["👌👀✔💯💯💯",d.jsx("br",{}),"Click to restart"]}):null]}),d.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[d.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[d.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:u}),d.jsx("span",{children:p})]}),d.jsx("div",{className:"article-web-art-minesweeper-timer",children:n})]}),d.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function Fe({readyId:y,locked:f,onReady:C}){const w=o.useRef(null),k=o.useRef(null),h=o.useRef(null),P=o.useRef(!1),a=o.useRef(null),R=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=o.useMemo(()=>({reduceMotion:R}),[R]);o.useEffect(()=>{const s=w.current,e=k.current;if(!s||!e)return;let i=!1,v=null,b=null,r=null;const m=()=>{P.current||(P.current=!0,C==null||C(y))},p=z(async()=>{var n,u;try{const l=await B(()=>import("./fallingRingsEngine-C9a7CL1C.js"),[]);if(i)return;v=l.createFallingRingsEngine(e,g),h.current=v;const x=()=>$(s,v,Math.min(1.5,window.devicePixelRatio||1));x(),(n=v.renderStatic)==null||n.call(v),(u=v.start)==null||u.call(v),m(),b=new ResizeObserver(()=>{x()}),b.observe(s),"IntersectionObserver"in window&&(r=new IntersectionObserver(M=>{var S,j;for(const I of M)I.isIntersecting?(S=v.start)==null||S.call(v):(j=v.stop)==null||j.call(v)},{threshold:.05}),r.observe(s))}catch{m()}},{timeoutMs:220});return()=>{var n;i=!0,p==null||p(),r==null||r.disconnect(),b==null||b.disconnect(),(n=v==null?void 0:v.destroy)==null||n.call(v),h.current=null}},[g,C,y]);const E=s=>{var e,i,v,b;(i=(e=h.current)==null?void 0:e.setHeld)==null||i.call(e,s),(b=(v=h.current)==null?void 0:v.start)==null||b.call(v)},c=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),E(!0))},t=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),E(!1))};return d.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:f,onPointerDown:f?void 0:s=>{a.current=s.pointerId;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}E(!0)},onPointerUp:f?void 0:s=>{a.current!=null&&s.pointerId!==a.current||(a.current=null,E(!1))},onPointerCancel:f?void 0:()=>{a.current=null,E(!1)},onLostPointerCapture:f?void 0:()=>{a.current=null,E(!1)},onMouseLeave:f?void 0:(()=>{a.current!=null&&E(!1)}),onBlur:f?void 0:(()=>{a.current=null,E(!1)}),onKeyDown:f?void 0:c,onKeyUp:f?void 0:t,children:[d.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function qe({readyId:y,locked:f,onReady:C}){const w=o.useRef(null),k=o.useRef(null),h=o.useRef(null),P=o.useRef(!1),a=o.useRef(null),R=o.useRef("mouse"),g=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),E=o.useMemo(()=>({reduceMotion:g,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[g]);o.useEffect(()=>{const t=w.current,s=k.current;if(!t||!s)return;let e=!1,i=null,v=null,b=null;const r=()=>{P.current||(P.current=!0,C==null||C(y))},m=z(async()=>{var p,n;try{const u=await B(()=>import("./prismFieldEngine-Dkw-H_-R.js"),__vite__mapDeps([3,1]));if(e)return;i=u.createPrismFieldEngine(s,E),h.current=i;const l=()=>$(t,i,Math.min(1.5,window.devicePixelRatio||1));l(),(p=i.renderStatic)==null||p.call(i),(n=i.start)==null||n.call(i),r(),v=new ResizeObserver(()=>{l()}),v.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(x=>{var M,S;for(const j of x)j.isIntersecting?(M=i.start)==null||M.call(i):(S=i.stop)==null||S.call(i)},{threshold:.05}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var p;e=!0,m==null||m(),b==null||b.disconnect(),v==null||v.disconnect(),(p=i==null?void 0:i.destroy)==null||p.call(i),h.current=null}},[E,C,y]);const c=t=>{const s=w.current;if(!s)return{x:.5,y:.5};const e=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(t.clientY-e.top)/Math.max(1,e.height)))}};return d.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:f,onPointerDown:f?void 0:t=>{var e,i;a.current=t.pointerId,R.current=t.pointerType||"mouse";try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const s=c(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerMove:f?void 0:t=>{var e,i;if(a.current!=null&&t.pointerId!==a.current)return;const s=c(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerUp:f?void 0:t=>{var s,e;a.current!=null&&t.pointerId!==a.current||(a.current=null,(t.pointerType||R.current)==="mouse"&&((e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s)))},onPointerCancel:f?void 0:(()=>{var t,s;a.current=null,R.current==="mouse"&&((s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t))}),onMouseMove:f?void 0:t=>{var e,i;const s=c(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onMouseLeave:f?void 0:(()=>{var t,s;a.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onBlur:f?void 0:(()=>{var t,s;a.current=null,R.current="mouse",(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:f?void 0:(t=>{var s,e,i,v;(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),(e=(s=h.current)==null?void 0:s.reset)==null||e.call(s),(v=(i=h.current)==null?void 0:i.start)==null||v.call(i))}),children:[d.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function Ke({readyId:y,locked:f,onReady:C}){const w=o.useRef(null),k=o.useRef(null),h=o.useRef(null),P=o.useRef(!1),a=o.useRef(null),R=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=o.useMemo(()=>({reduceMotion:R}),[R]);o.useEffect(()=>{const t=w.current,s=k.current;if(!t||!s)return;let e=!1,i=null,v=null,b=null;const r=()=>{P.current||(P.current=!0,C==null||C(y))},m=z(async()=>{var p,n;try{const u=await B(()=>import("./ropeLightEngine-B3dT-ds-.js"),[]);if(e)return;i=u.createRopeLightEngine(s,g),h.current=i;const l=()=>$(t,i,Math.min(1.5,window.devicePixelRatio||1));l(),(p=i.renderStatic)==null||p.call(i),(n=i.start)==null||n.call(i),r(),v=new ResizeObserver(()=>{l()}),v.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(x=>{var M,S;for(const j of x)j.isIntersecting?(M=i.start)==null||M.call(i):(S=i.stop)==null||S.call(i)},{threshold:.05}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var p;e=!0,m==null||m(),b==null||b.disconnect(),v==null||v.disconnect(),(p=i==null?void 0:i.destroy)==null||p.call(i),h.current=null}},[g,C,y]);const E=t=>{const s=w.current;if(!s)return{x:.5,y:.5};const e=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(t.clientY-e.top)/Math.max(1,e.height)))}},c=()=>{var t,s,e,i;(s=(t=h.current)==null?void 0:t.reset)==null||s.call(t),(i=(e=h.current)==null?void 0:e.start)==null||i.call(e)};return d.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:f,onClick:f?void 0:c,onPointerDown:f?void 0:t=>{var e,i;a.current=t.pointerId;const s=E(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerMove:f?void 0:t=>{var e,i;if(a.current!=null&&t.pointerId!==a.current)return;const s=E(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerUp:f?void 0:t=>{var s,e;a.current!=null&&t.pointerId!==a.current||(a.current=null,(e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s))},onPointerCancel:f?void 0:(()=>{var t,s;a.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onMouseMove:f?void 0:t=>{var e,i;const s=E(t);(i=(e=h.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onMouseLeave:f?void 0:(()=>{var t,s;a.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onBlur:f?void 0:(()=>{var t,s;a.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:f?void 0:(t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),c())}),children:[d.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}function Ve({readyId:y,locked:f,onReady:C}){const w=o.useRef(null),k=o.useRef(null),h=o.useRef(null),P=o.useRef(!1),a=o.useRef(null),R=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=o.useMemo(()=>({reduceMotion:R}),[R]);o.useEffect(()=>{const c=w.current,t=k.current;if(!c||!t)return;let s=!1,e=null,i=null,v=null;const b=()=>{P.current||(P.current=!0,C==null||C(y))},r=z(async()=>{var m,p;try{const n=await B(()=>import("./soupShaderEngine-DOT8TiBo.js"),__vite__mapDeps([4,1]));if(s)return;e=n.createSoupShaderEngine(t,g),h.current=e;const u=()=>$(c,e,Math.min(1.5,window.devicePixelRatio||1));u(),(m=e.renderStatic)==null||m.call(e),(p=e.start)==null||p.call(e),b(),i=new ResizeObserver(()=>{u()}),i.observe(c),"IntersectionObserver"in window&&(v=new IntersectionObserver(l=>{var x,M;for(const S of l)S.isIntersecting?(x=e.start)==null||x.call(e):(M=e.stop)==null||M.call(e)},{threshold:.05}),v.observe(c))}catch{b()}},{timeoutMs:220});return()=>{var m;s=!0,r==null||r(),v==null||v.disconnect(),i==null||i.disconnect(),(m=e==null?void 0:e.destroy)==null||m.call(e),h.current=null}},[g,C,y]);const E=c=>{const t=w.current;if(!t)return{x:.5,y:.5};const s=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(c.clientX-s.left)/Math.max(1,s.width))),y:Math.max(0,Math.min(1,(c.clientY-s.top)/Math.max(1,s.height)))}};return d.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Soup shader web art tile",disabled:f,onPointerDown:f?void 0:c=>{var s,e,i,v;a.current=c.pointerId;try{c.currentTarget.setPointerCapture(c.pointerId)}catch{}const t=E(c);(e=(s=h.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y),(v=(i=h.current)==null?void 0:i.setHeld)==null||v.call(i,!0)},onPointerMove:f?void 0:c=>{var s,e;if(a.current!=null&&c.pointerId!==a.current)return;const t=E(c);(e=(s=h.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y)},onPointerUp:f?void 0:c=>{var t,s;a.current!=null&&c.pointerId!==a.current||(a.current=null,(s=(t=h.current)==null?void 0:t.setHeld)==null||s.call(t,!1))},onPointerCancel:f?void 0:(()=>{var c,t;a.current=null,(t=(c=h.current)==null?void 0:c.setHeld)==null||t.call(c,!1)}),onMouseMove:f?void 0:c=>{var s,e;const t=E(c);(e=(s=h.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y)},onMouseLeave:f?void 0:(()=>{var c,t,s,e;a.current=null,(t=(c=h.current)==null?void 0:c.setHeld)==null||t.call(c,!1),(e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s)}),onBlur:f?void 0:(()=>{var c,t,s,e;a.current=null,(t=(c=h.current)==null?void 0:c.setHeld)==null||t.call(c,!1),(e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s)}),children:[d.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),d.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function Ge({readyId:y,locked:f,onReady:C}){const w=o.useRef(null),k=o.useRef(null),h=o.useRef(null),P=o.useRef(!1),a=o.useRef(null),R=o.useRef(null),g=o.useRef(0),[E,c]=o.useState(!1),[t,s]=o.useState(!1),[e,i]=o.useState([]),v=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),b=o.useMemo(()=>({reduceMotion:v}),[v]);o.useEffect(()=>{const n=w.current,u=k.current;if(!n||!u)return;let l=!1,x=null,M=null,S=null;const j=()=>{P.current||(P.current=!0,C==null||C(y))},I=z(async()=>{var _,T;try{const A=await B(()=>import("./tardisWormholeEngine-BSErFcgT.js"),__vite__mapDeps([5,1]));if(l)return;x=A.createTardisWormholeEngine(u,b),h.current=x;const K=()=>$(n,x,Math.min(1.5,window.devicePixelRatio||1));K(),(_=x.renderStatic)==null||_.call(x),(T=x.start)==null||T.call(x),j(),M=new ResizeObserver(()=>{K()}),M.observe(n),"IntersectionObserver"in window&&(S=new IntersectionObserver(G=>{var V,Y;for(const H of G)H.isIntersecting?(V=x.start)==null||V.call(x):(Y=x.stop)==null||Y.call(x)},{threshold:.05}),S.observe(n))}catch{j()}},{timeoutMs:220});return()=>{var _;l=!0,I==null||I(),S==null||S.disconnect(),M==null||M.disconnect(),(_=x==null?void 0:x.destroy)==null||_.call(x),h.current=null}},[b,C,y]),o.useEffect(()=>{if(e.length===0)return;const n=window.setTimeout(()=>{i(u=>u.slice(1))},1e3);return()=>{window.clearTimeout(n)}},[e]),o.useEffect(()=>{var u,l,x;const n=h.current;if(n){if(f){s(!1),c(!1),R.current=null,(u=n.clearPointer)==null||u.call(n),(l=n.stop)==null||l.call(n);return}(x=n.start)==null||x.call(n)}},[f]);const r=n=>{const u=w.current;if(!u)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const l=u.getBoundingClientRect(),x=Math.max(0,Math.min(l.width,n.clientX-l.left)),M=Math.max(0,Math.min(l.height,n.clientY-l.top)),S=R.current,j=S?x-S.px:0,I=S?M-S.py:0;return R.current={px:x,py:M},u.style.setProperty("--tardis-cursor-x",`${x}px`),u.style.setProperty("--tardis-cursor-y",`${M}px`),{x:l.width>0?x/l.width:.5,y:l.height>0?M/l.height:.5,px:x,py:M,dx:j,dy:I}},m=(n,u)=>{const l=g.current++;i(x=>[...x,{id:l,x:n,y:u}])},p=n=>{var l,x,M,S;const u=r(n);m(u.px,u.py),(x=(l=h.current)==null?void 0:l.boost)==null||x.call(l),(S=(M=h.current)==null?void 0:M.start)==null||S.call(M),s(!0),window.setTimeout(()=>{s(!1)},650)};return d.jsxs("button",{type:"button",ref:w,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${E?"article-web-art-tile-tardis-active":""} ${t?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:f,onClick:f?void 0:p,onContextMenu:f?void 0:(n=>{var l,x,M,S;n.preventDefault();const u=r(n);m(u.px,u.py),(x=(l=h.current)==null?void 0:l.reverseBurst)==null||x.call(l),(S=(M=h.current)==null?void 0:M.start)==null||S.call(M)}),onWheel:f?void 0:(n=>{var u,l;(l=(u=h.current)==null?void 0:u.addScrollBoost)==null||l.call(u,n.deltaY*.003)}),onPointerDown:f?void 0:n=>{var l,x;a.current=n.pointerId;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}const u=r(n);(x=(l=h.current)==null?void 0:l.setPointer)==null||x.call(l,u.x,u.y,u.dx,u.dy)},onPointerMove:f?void 0:n=>{var l,x,M,S;if(a.current!=null&&n.pointerId!==a.current)return;const u=r(n);(x=(l=h.current)==null?void 0:l.setPointer)==null||x.call(l,u.x,u.y,u.dx,u.dy),(n.buttons&1)===1&&((S=(M=h.current)==null?void 0:M.drag)==null||S.call(M,u.dx))},onPointerUp:f?void 0:n=>{a.current!=null&&n.pointerId!==a.current||(a.current=null)},onPointerCancel:f?void 0:(()=>{a.current=null}),onMouseEnter:f?void 0:(()=>{c(!0)}),onMouseMove:f?void 0:n=>{var l,x;const u=r(n);(x=(l=h.current)==null?void 0:l.setPointer)==null||x.call(l,u.x,u.y,u.dx,u.dy)},onMouseLeave:f?void 0:(()=>{var n,u;a.current=null,R.current=null,c(!1),(u=(n=h.current)==null?void 0:n.clearPointer)==null||u.call(n)}),onBlur:f?void 0:(()=>{var n,u;a.current=null,R.current=null,c(!1),(u=(n=h.current)==null?void 0:n.clearPointer)==null||u.call(n)}),onKeyDown:f?void 0:(n=>{var u,l,x,M;(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),(l=(u=h.current)==null?void 0:u.boost)==null||l.call(u),(M=(x=h.current)==null?void 0:x.start)==null||M.call(x))}),children:[d.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),d.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),d.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),d.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),d.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),d.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),d.jsx("div",{className:"article-web-art-tardis-cursor","aria-hidden":!0}),d.jsx("div",{className:"article-web-art-tardis-cursor-dot","aria-hidden":!0}),d.jsxs("div",{className:"article-web-art-tardis-hud","aria-hidden":!0,children:[d.jsx("div",{className:"article-web-art-tardis-hud-label",children:"Traversing Singularity"}),d.jsx("div",{className:"article-web-art-tardis-hud-bar"})]}),e.map(n=>d.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${n.x}px`,top:`${n.y}px`},"aria-hidden":!0},n.id)),d.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function Ue({label:y,clickLabel:f,previewRequested:C=!1}){const w=me(),k=o.useRef(null),[h,P]=o.useState(!1),[a,R]=o.useState(0),g=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),E=o.useCallback(()=>{R(Date.now()),P(!0)},[]),c=o.useCallback(()=>{w.navigateToSectionWithId("contact")},[w]),t=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),E())},s=o.useMemo(()=>h?Ee({seed:`${a||Date.now()}:${y}`,reduceMotion:g}):"",[y,h,a,g]);return o.useEffect(()=>{if(C){R(Date.now()),P(!0);return}P(!1)},[C]),d.jsxs("div",{ref:k,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${h?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":h?"Kontakt preview":y,"aria-pressed":h,onClick:E,onKeyDown:t,children:[d.jsxs("div",{className:`article-web-art-tile-cta-preview ${h?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[h&&d.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:s,sandbox:"allow-scripts"},`${a}-${y}`),d.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!h&&d.jsx("div",{className:`loader ${g?"loader-reduce-motion":""}`,"aria-hidden":!0,children:d.jsxs("div",{className:"loader-inner",children:[d.jsx("div",{className:"loader-line-wrap",children:d.jsx("div",{className:"loader-line"})}),d.jsx("div",{className:"loader-line-wrap",children:d.jsx("div",{className:"loader-line"})}),d.jsx("div",{className:"loader-line-wrap",children:d.jsx("div",{className:"loader-line"})}),d.jsx("div",{className:"loader-line-wrap",children:d.jsx("div",{className:"loader-line"})}),d.jsx("div",{className:"loader-line-wrap",children:d.jsx("div",{className:"loader-line"})})]})}),d.jsxs("div",{className:`article-web-art-tile-cta-content ${h?"article-web-art-tile-cta-content-hidden":""}`,children:[d.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:y}),d.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:f})]}),h&&d.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),c()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),c())},children:"Kontakt"})]})}function Ye({locked:y=!1}){const f=o.useRef(null),C=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),w=o.useRef(!1),k=o.useRef(0),h=o.useRef(null),P=o.useRef(null),a=o.useRef(1),R=o.useRef(null);return o.useEffect(()=>{const g=f.current;if(!g)return;const E=m=>{const p=Math.max(0,Math.min(1,m));return p*p*(3-2*p)},c=()=>{const m=g.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),p=[];for(const n of m){const u=n.getAnimations?n.getAnimations():[];for(const l of u)p.push(l)}return p},t=m=>{const p=Math.max(1,Math.min(5.2,Number(m)||1));a.current=p;const n=c();for(const u of n)u.playbackRate=p},s=()=>{w.current=!1,h.current=null,g.classList.remove("article-web-art-tile-goldfish-held"),P.current!=null&&cancelAnimationFrame(P.current),P.current=null;const m=a.current,p=360,n=performance.now();R.current!=null&&cancelAnimationFrame(R.current);const u=()=>{const l=(performance.now()-n)/p,x=E(l);t(m+(1-m)*x),l<1?R.current=requestAnimationFrame(u):R.current=null};R.current=requestAnimationFrame(u)},e=()=>{if(!w.current)return;const m=performance.now()-k.current,p=1.2+4*E(m/2400);t(p),P.current=requestAnimationFrame(e)},i=m=>{if(!C&&!(m.button!=null&&m.button!==0)){w.current=!0,k.current=performance.now(),h.current=m.pointerId,g.classList.add("article-web-art-tile-goldfish-held");try{g.setPointerCapture(m.pointerId)}catch{}R.current!=null&&(cancelAnimationFrame(R.current),R.current=null),P.current==null&&(P.current=requestAnimationFrame(e))}},v=()=>{s()},b=()=>{s()},r=()=>{s()};return g.addEventListener("pointerdown",i),g.addEventListener("pointerup",v),g.addEventListener("pointercancel",b),g.addEventListener("lostpointercapture",r),()=>{g.removeEventListener("pointerdown",i),g.removeEventListener("pointerup",v),g.removeEventListener("pointercancel",b),g.removeEventListener("lostpointercapture",r),s(),R.current!=null&&cancelAnimationFrame(R.current),R.current=null}},[C]),o.useEffect(()=>{const g=f.current;g&&g.classList.toggle("article-web-art-tile-goldfish-locked",y)},[y]),d.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:f,role:"img","aria-label":"Goldfish animation tile",children:[d.jsx("div",{className:"fish-stage",children:d.jsx("div",{className:"fish-wrapper",children:d.jsx("div",{className:"fish-container",children:d.jsxs("div",{className:"fish-parts",children:[d.jsx("div",{className:"fish-body front"}),d.jsx("div",{className:"fish-body back"}),d.jsx("div",{className:"fish-back-bottom-fin front"}),d.jsx("div",{className:"fish-back-bottom-fin back"}),d.jsx("div",{className:"fish-back-fin"}),d.jsx("div",{className:"fish-front-bottom-fin front"}),d.jsx("div",{className:"fish-front-bottom-fin back"}),d.jsx("div",{className:"fish-top-fin"})]})})})}),d.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function Xe({locked:y=!1}){const f=o.useRef(null),C=o.useRef([]),w=o.useRef(0),k=o.useRef(0),h=ke,P=o.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return o.useEffect(()=>{const a=f.current;if(!a)return;const R=C.current.filter(Boolean);if(!R.length)return;let g=!0,E=!1,c=null,t=null;const s=(l,x)=>{const M=(l-.5)*30;for(let S=0;S<R.length;S++){const j=R[S],I=S*18,_=S*8,T=(l-.5)*I,A=(x-.5)*_;j.style.transform=`translate3d(${T}px, ${A}px, 0) rotateY(${M}deg)`}},e=(l,x)=>{const M=Math.max(-.55,Math.min(.55,(l-.5)*1.1)),S=Math.max(-.35,Math.min(.35,(x-.5)*.7));s(.5+M,.5+S)},i=l=>{const x=a.getBoundingClientRect(),M=(l.clientX-x.left)/Math.max(1,x.width),S=(l.clientY-x.top)/Math.max(1,x.height);g=!0,k.current=performance.now()+650,e(Math.max(0,Math.min(1,M)),Math.max(0,Math.min(1,S)))},v=l=>{const x=a.getBoundingClientRect(),M=(l.clientX-x.left)/Math.max(1,x.width),S=(l.clientY-x.top)/Math.max(1,x.height);return{x:Math.max(0,Math.min(1,M)),y:Math.max(0,Math.min(1,S))}},b=l=>{if(l.pointerType==="mouse")return;E=!0,c=l.pointerId,g=!0,k.current=performance.now()+900;const x=v(l);e(x.x,x.y),!P&&t==null&&(t=requestAnimationFrame(u))},r=l=>{if(!E||c!=null&&l.pointerId!==c)return;g=!0,k.current=performance.now()+900;const x=v(l);e(x.x,x.y)},m=l=>{c!=null&&(l==null?void 0:l.pointerId)!=null&&l.pointerId!==c||(E=!1,c=null,g=!0,!P&&t==null&&(t=requestAnimationFrame(u)))},p=()=>{g=!0,!P&&t==null&&(t=requestAnimationFrame(u))},n=()=>{g=!0,!P&&t==null&&(t=requestAnimationFrame(u))},u=()=>{if(g){if(!P&&performance.now()>=k.current){w.current+=.008;const l=Math.sin(w.current)*.5+.5;e(l,.5)}t=requestAnimationFrame(u)}};return g=!y,a.addEventListener("mouseenter",p),a.addEventListener("mousemove",i),a.addEventListener("mouseleave",n),a.addEventListener("pointerdown",b),a.addEventListener("pointermove",r),a.addEventListener("pointerup",m),a.addEventListener("pointercancel",m),e(.5,.5),!P&&!y&&(t=requestAnimationFrame(u)),()=>{a.removeEventListener("mouseenter",p),a.removeEventListener("mousemove",i),a.removeEventListener("mouseleave",n),a.removeEventListener("pointerdown",b),a.removeEventListener("pointermove",r),a.removeEventListener("pointerup",m),a.removeEventListener("pointercancel",m),t!=null&&cancelAnimationFrame(t)}},[P]),d.jsxs("div",{ref:f,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[d.jsxs("div",{className:"patronus-card",children:[d.jsx("div",{className:"patronus-layer patronus-bg",ref:a=>{C.current[0]=a},children:d.jsx("img",{alt:"",src:h[0]})}),d.jsx("div",{className:"patronus-layer",ref:a=>{C.current[1]=a},children:d.jsx("img",{alt:"",src:h[1]})}),d.jsx("div",{className:"patronus-layer",ref:a=>{C.current[2]=a},children:d.jsx("img",{alt:"",src:h[2]})}),d.jsx("div",{className:"patronus-layer patronus-svg",ref:a=>{C.current[3]=a},dangerouslySetInnerHTML:{__html:xe}}),d.jsx("div",{className:"patronus-layer",ref:a=>{C.current[4]=a},children:d.jsx("img",{alt:"",src:h[3]})}),d.jsx("div",{className:"patronus-layer",ref:a=>{C.current[5]=a},children:d.jsx("img",{alt:"",src:h[4]})}),d.jsx("div",{className:"patronus-layer",ref:a=>{C.current[6]=a},children:d.jsx("img",{alt:"",src:h[5]})})]}),d.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{nt as default};
