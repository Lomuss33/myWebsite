const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/threeTunnelEngine-YAbz1VnK.js","assets/three-BYTi_f6D.js","assets/threePolygonDemo5Engine-BcBzJu0K.js","assets/prismFieldEngine-Dkw-H_-R.js","assets/soupShaderEngine-DOT8TiBo.js","assets/tardisWormholeEngine-BSErFcgT.js"])))=>i.map(i=>d[i]);
import{c as ye,g as de,A as ae,_ as z}from"./index-BhQZaOzR.js";import{r as s,j as h}from"./react-vendor-D1LkQUJD.js";import"./swiper-BJPGAhIX.js";/* empty css              */import"./bootstrap-jfx39s8c.js";import"./vendor-BUjjXRU6.js";const ge=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`,Ce=`function Mash(seed) {
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
`;function F(y,{timeoutMs:m=1200}={}){if(typeof window>"u")return y(),()=>{};if("requestIdleCallback"in window){const x=window.requestIdleCallback(()=>y(),{timeout:m});return()=>window.cancelIdleCallback(x)}const C=window.setTimeout(()=>y(),0);return()=>window.clearTimeout(C)}function Me(y){if(!y)return{width:1,height:1};const m=Math.max(1,Math.round(y.clientWidth||y.getBoundingClientRect().width||1)),C=Math.max(1,Math.round(y.clientHeight||y.getBoundingClientRect().height||1));return{width:m,height:C}}function $(y,m,C=1){var p;const{width:x,height:M}=Me(y);(p=m==null?void 0:m.setSize)==null||p.call(m,x,M,C)}function ce(y,m,C="smooth"){if(typeof window>"u")return;const x=document.getElementById(y),M=document.getElementById(`scrollable-${m}`);if(!x||!M)return;const p=x.getBoundingClientRect(),P=M.getBoundingClientRect(),o=M.scrollTop+(p.top-P.top);M.scrollTo({top:Math.max(0,o),behavior:C})}const Re=9,ke=9,Pe=10,Se=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],Ee=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function Ie(y=Re,m=ke,C=Pe){const x=y*m,M=Math.max(1,Math.min(C,x-1)),p=new Set;for(;p.size<M;)p.add(Math.floor(Math.random()*x));const P=new Array(x).fill(0);for(let o=0;o<x;o++){if(p.has(o)){P[o]=-1;continue}const k=o%m,g=Math.floor(o/m);let I=0;for(let l=-1;l<=1;l++)for(let t=-1;t<=1;t++){if(t===0&&l===0)continue;const i=k+t,e=g+l;i<0||e<0||i>=m||e>=y||p.has(e*m+i)&&(I+=1)}P[o]=I}return{rows:y,cols:m,mineCount:M,mines:p,counts:P}}function Ne(y,m,C,x){const M=new Set(C),p=[y];for(;p.length>0;){const P=p.pop();if(P==null||M.has(P)||x.has(P)||m.mines.has(P)||(M.add(P),m.counts[P]!==0))continue;const o=P%m.cols,k=Math.floor(P/m.cols);for(let g=-1;g<=1;g++)for(let I=-1;I<=1;I++){if(I===0&&g===0)continue;const l=o+I,t=k+g;l<0||t<0||l>=m.cols||t>=m.rows||p.push(t*m.cols+l)}}return M}function le(y,m,C){const x=y.rows*y.cols-y.mineCount;if(m.size>=x)return!0;if(C.size!==y.mineCount)return!1;for(const M of y.mines)if(!C.has(M))return!1;return!0}function je(y){return`Web art ${String(y||"tile").toLowerCase()} tile loading`}function Le({seed:y,reduceMotion:m}){const C=JSON.stringify(Ce.split("<\/script>").join("<\\/script>")),x=JSON.stringify(y);return`<!doctype html>
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
    reduceMotion: ${m?"true":"false"},
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
</html>`}function ct({dataWrapper:y,id:m}){var ie;const C=ye(),x=de(),M=`${y.uniqueId}-ambient-trace`,p=`${y.uniqueId}-ambient-hex`,P=`${y.uniqueId}-ambient-plop`,o=`${y.uniqueId}-ambient-julia`,k=`${y.uniqueId}-ambient-mines`,g=`${y.uniqueId}-ambient-rings`,I=`${y.uniqueId}-ambient-prism`,l=`${y.uniqueId}-ambient-rope`,t=`${y.uniqueId}-ambient-soup`,i=`${y.uniqueId}-ambient-tardis`,[e,a]=s.useState(null),[u,f]=s.useState(!0),n=s.useMemo(()=>y.orderedItems,[y.orderedItems]),c=s.useMemo(()=>{const E=[4,5,3,6,1,2,7,8],L=new Map(n.map(O=>[Number(O==null?void 0:O.id),O])),D=[];for(const O of E){const H=L.get(O);H&&D.push(H)}for(const O of n){if(!O)continue;const H=Number(O==null?void 0:O.id);E.includes(H)||D.push(O)}return D},[n]),w=s.useRef(null),[r,b]=s.useState(!1),d=s.useRef(new Set),v=s.useRef(new Map),[R,S]=s.useState(0),[N,_]=s.useState(-1),[j,T]=s.useState(()=>new Set),[A,B]=s.useState(()=>new Set),[X,G]=s.useState(!1),V=s.useMemo(()=>{const E=c.map(L=>L==null?void 0:L.uniqueId).filter(Boolean);return E.push(M,p,P,o,k,I,g,l,t,i,"ambient-goldfish","ambient-patronus"),new Set(E)},[p,o,k,P,I,g,l,t,i,M,c]),J=s.useMemo(()=>Array.from(A).filter(E=>E!=="ambient-goldfish"&&E!=="ambient-patronus"),[A]),q=u,Y=C.selectedLanguageId||"en";let Z=C.getString("send_yours");typeof Z=="string"&&Z.startsWith("locale:")&&(Z={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[Y]||"Send yours!");let Q=C.getString("click");typeof Q=="string"&&Q.startsWith("locale:")&&(Q={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[Y]||"Click");const te={en:{title:"Doors of the world behind an amazing art gallery.",note:"At your own risk",revealNote:"At your own risk click on the card to reveal it!",button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",note:"Auf eigenes Risiko",button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",note:"Na vlastiti rizik",button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",note:"Tüm risk size ait",button:"Gir",preparing:"Hazırlanıyor..."}}[Y]||{note:"At your own risk",button:"Enter"},fe=Y==="de"?"Auf eigenes Risiko klicke auf die Karte, um sie zu öffnen!":Y==="hr"?"Na vlastiti rizik klikni karticu da je otkriješ!":Y==="tr"?"Tüm risk size ait, göstermek için karta tıklayın!":"At your own risk click on the card to reveal it!",he="hide",K=s.useCallback(E=>{if(!E||d.current.has(E))return;d.current.add(E);const L=v.current.get(E);L!=null&&(window.clearTimeout(L),v.current.delete(E)),S(d.current.size)},[]),ne=s.useCallback(E=>{E&&B(L=>{if(L.has(E))return L;const D=new Set(L);return D.add(E),D})},[]),W=s.useCallback(()=>{for(const E of v.current.values())window.clearTimeout(E);v.current=new Map,d.current=new Set,S(0),_(-1),b(!1),T(new Set),B(new Set),G(!1)},[]),ee=s.useCallback(()=>{f(!1),b(!0),_(c.length-1),T(new Set),B(new Set),G(!1)},[c.length]);s.useEffect(()=>{var oe;if(typeof window>"u"||((oe=x.targetSection)==null?void 0:oe.id)!==y.sectionId||x.transitionStatus!=="transition_status_none")return;const E=window.__pendingSectionAction;if(!E||E.action!=="enter"||E.sectionId!==y.sectionId||E.targetArticleId&&E.targetArticleId!==y.uniqueId)return;if(Date.now()-(E.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,ee();const L=E.targetArticleId||y.uniqueId;let D=null,O=null,H=null,U=null;return D=window.setTimeout(()=>{O=window.requestAnimationFrame(()=>{ce(L,y.sectionId),H=window.setTimeout(()=>{U=window.requestAnimationFrame(()=>{ce(L,y.sectionId)})},220)})},90),()=>{D!==null&&window.clearTimeout(D),O!==null&&window.cancelAnimationFrame(O),H!==null&&window.clearTimeout(H),U!==null&&window.cancelAnimationFrame(U)}},[y.uniqueId,y.sectionId,(ie=x.targetSection)==null?void 0:ie.id,x.transitionStatus,ee]);const re=s.useCallback(E=>{E&&(ne(E),T(L=>{if(L.has(E))return L;const D=new Set(L);return D.add(E),D}))},[ne]),se=s.useCallback(E=>{E&&(T(L=>{if(!L.has(E))return L;const D=new Set(L);return D.delete(E),D}),B(L=>{if(!L.has(E))return L;const D=new Set(L);return D.delete(E),D}))},[]),pe=V.size>0&&j.size>=V.size,be=s.useCallback(()=>{if(V.size>0&&j.size>=V.size){T(new Set),B(new Set),G(!1);return}B(new Set(V)),T(new Set(V)),G(!0)},[V,j.size]),me=s.useCallback(()=>{W(),f(!0)},[W]),we=(E,L)=>{const D=Number(E==null?void 0:E.id);return D===1?"Hover":D===2?"Wave":D===3?"3D":D===4?"Poly":D===5?"Click":D===6?"Orbit":D===7?"Spin":D===8?"Shape":String(L+1)},xe=c.map((E,L)=>{if(!r)return h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${L+1} loading`},E.uniqueId);const D=E.uniqueId,O=j.has(D),H=A.has(D)||O;return h.jsx(ue,{label:we(E,L),isOpen:O,onToggle:()=>{O?se(D):re(D)},shouldRender:H,children:H&&h.jsx(Te,{itemWrapper:E,index:L,locked:q||!O,activate:L<=N,onReady:K})},D)}),ve=r?[{key:"ambient-trace",tileId:M,label:"Trace",render:E=>h.jsx(qe,{readyId:M,locked:q||!E,onReady:K})},{key:"ambient-hex",tileId:p,label:"Hex",render:E=>h.jsx(Ke,{readyId:p,locked:q||!E,onReady:K})},{key:"ambient-plop",tileId:P,label:"Plop",render:E=>h.jsx(Ve,{readyId:P,locked:q||!E,onReady:K})},{key:"ambient-julia",tileId:o,label:"Julia",render:E=>h.jsx(Ge,{readyId:o,locked:q||!E,onReady:K})},{key:"ambient-mines",tileId:k,label:"Bomb",render:E=>h.jsx(Ye,{readyId:k,locked:q||!E,onReady:K})},{key:"ambient-rings",tileId:g,label:"Fall",render:E=>h.jsx(Ue,{readyId:g,locked:q||!E,onReady:K})},{key:"ambient-prism",tileId:I,label:"Prism",render:E=>h.jsx(Xe,{readyId:I,locked:q||!E,onReady:K})},{key:"ambient-rope",tileId:l,label:"Rope",render:E=>h.jsx(Je,{readyId:l,locked:q||!E,onReady:K})},{key:"ambient-soup",tileId:t,label:"Soup",render:E=>h.jsx(Ze,{readyId:t,locked:q||!E,onReady:K})},{key:"ambient-tardis",tileId:i,label:"Tardis",render:E=>h.jsx(Qe,{readyId:i,locked:q||!E,onReady:K})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:E=>h.jsx(et,{locked:q||!E})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:E=>h.jsx(tt,{locked:q||!E})}].map(({key:E,tileId:L,label:D,render:O})=>{const H=j.has(L),U=A.has(L)||H;return h.jsx(ue,{label:D,isOpen:H,onToggle:()=>{H?se(L):re(L)},shouldRender:U,children:U&&O(H)},E)}):[h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return s.useEffect(()=>{W()},[y.uniqueId,W]),s.useEffect(()=>{r&&_(c.length-1)},[r,c.length]),s.useEffect(()=>{if(r)for(const E of J){if(!E||d.current.has(E)||v.current.has(E))continue;const L=window.setTimeout(()=>{K(E)},12e3);v.current.set(E,L)}},[r,J,K]),h.jsx(ae,{id:y.uniqueId,type:ae.Types.SPACING_DEFAULT,dataWrapper:y,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:a,children:h.jsxs("div",{className:"article-web-art-shell",children:[h.jsx(_e,{note:u?te.note:fe,buttonLabel:u?te.button:he,hidden:!u,onEnter:u?ee:me,secondaryButtonLabel:u?null:"promaja",onSecondaryAction:u?null:be,secondaryPressed:pe}),h.jsx("div",{className:`article-web-art-stage ${u?"article-web-art-stage-preview":""}`,"aria-hidden":u,children:h.jsxs("div",{className:`article-web-art-items ${q?"article-web-art-items-locked":""}`,ref:w,"aria-busy":u,children:[r&&h.jsx(We,{label:Z,clickLabel:Q,previewRequested:X}),xe,ve]})})]})})}function _e({note:y,buttonLabel:m,hidden:C,onEnter:x,secondaryButtonLabel:M=null,onSecondaryAction:p=null,secondaryPressed:P=!1}){const o=k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),x())};return h.jsx("div",{className:`article-web-art-intro-cover ${C?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:h.jsxs("div",{className:"article-web-art-intro-cover-inner",children:[h.jsx("div",{className:"article-web-art-intro-cover-actions",children:h.jsx("span",{className:`article-web-art-intro-cover-note ${C?"article-web-art-intro-cover-note-compact":"article-web-art-intro-cover-note-expanded"}`,children:y})}),h.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[M?h.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${P?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:p||void 0,"aria-pressed":P,"aria-label":M,children:M}):null,h.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:x,onKeyDown:o,"aria-label":m,children:m})]})]})})}function ue({label:y,isOpen:m,onToggle:C,shouldRender:x=!0,children:M}){return h.jsxs("div",{className:`article-web-art-gated-tile ${m?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[x?M:h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":je(y)}),h.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),h.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${m?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:C,"aria-label":`${m?"Hide":"Show"} ${y}`,children:y})]})}function Te({itemWrapper:y,index:m,activate:C,locked:x,onReady:M}){return Number(y.id)===1?h.jsx(Be,{itemWrapper:y,index:m,activate:C,locked:x,onReady:M}):Number(y.id)===2?h.jsx(He,{itemWrapper:y,index:m,activate:C,locked:x,onReady:M}):Number(y.id)===3?h.jsx(ze,{itemWrapper:y,index:m,activate:C,locked:x,onReady:M}):Number(y.id)===4?h.jsx(Fe,{itemWrapper:y,index:m,activate:C,locked:x,onReady:M}):Number(y.id)===6?h.jsx($e,{itemWrapper:y,index:m,activate:C,locked:x,onReady:M}):Number(y.id)===7?h.jsx(De,{itemWrapper:y,locked:x,onReady:M}):Number(y.id)===8?h.jsx(Ae,{itemWrapper:y,index:m,activate:C,locked:x,onReady:M}):h.jsx(Oe,{itemWrapper:y,index:m,activate:C,locked:x,onReady:M})}function De({itemWrapper:y,locked:m,onReady:C}){const x=s.useRef(!1);s.useEffect(()=>{x.current||(x.current=!0,C==null||C(y.uniqueId))},[y.uniqueId,C]);const M=s.useMemo(()=>[-4,-2,.5,4].map(p=>{const P=p-1,o=Math.abs(5/P),k=P>=0?"1turn":"-1turn";return{speed:p,controlDuration:`${o}s`,controlTurn:k}}),[]);return h.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${m?"article-web-art-spin-boxes-locked":""}`,children:h.jsx("div",{className:"article-web-art-spin-boxes-grid",children:M.map(({speed:p,controlDuration:P,controlTurn:o})=>h.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--control-duration":P,"--control-turn":o},children:h.jsx("div",{className:"article-web-art-spin-box-core","data-speed":p})},String(p)))})})}function Ae({itemWrapper:y,index:m,activate:C,locked:x,onReady:M}){const p=s.useRef(null),P=s.useRef(null),o=s.useRef(null),k=s.useRef(!1),g=s.useRef(!0),I=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),l=s.useMemo(()=>({seed:1729+(Number(y.id)||8)*4242,reduceMotion:I}),[y.id,I]);s.useEffect(()=>{if(!C)return;const u=p.current,f=P.current;if(!u||!f)return;let n=!1,c=null,w=null,r=null;const b=()=>{k.current||(k.current=!0,M==null||M(y.uniqueId))},d=F(async()=>{var v,R,S;try{const N=await z(()=>import("./shapeFieldEngine-B7md70TY.js"),[]);if(n)return;c=N.createShapeFieldEngine(f,l),o.current=c;const _=()=>$(u,c,window.devicePixelRatio||1);_(),(v=c.renderStatic)==null||v.call(c),(R=c.triggerWave)==null||R.call(c),x||(S=c.start)==null||S.call(c),b(),w=new ResizeObserver(()=>{var j;_(),(j=c.renderStatic)==null||j.call(c)}),w.observe(u),"IntersectionObserver"in window&&(r=new IntersectionObserver(j=>{var T,A,B;for(const X of j){if(g.current=!!X.isIntersecting,x){(T=c.stop)==null||T.call(c);continue}g.current?(A=c.start)==null||A.call(c):(B=c.stop)==null||B.call(c)}},{threshold:.2}),r.observe(u))}catch{b()}});return()=>{var v;n=!0,d==null||d(),r==null||r.disconnect(),w==null||w.disconnect(),(v=c==null?void 0:c.destroy)==null||v.call(c),o.current=null}},[C,l,y.uniqueId,x,M]),s.useEffect(()=>{var f,n,c;const u=o.current;if(u){if(x){(f=u.clearPointer)==null||f.call(u),(n=u.stop)==null||n.call(u);return}g.current&&((c=u.start)==null||c.call(u))}},[x]);const t=u=>{const f=p.current;if(!f)return{x:0,y:0};const n=f.getBoundingClientRect();return{x:u.clientX-n.left,y:u.clientY-n.top}},i=u=>{var n,c;const f=t(u);(c=(n=o.current)==null?void 0:n.setPointer)==null||c.call(n,f.x,f.y)},e=u=>{var n,c,w,r;const f=t(u);(c=(n=o.current)==null?void 0:n.setPointer)==null||c.call(n,f.x,f.y),(r=(w=o.current)==null?void 0:w.triggerWave)==null||r.call(w,f.x,f.y)},a=u=>{var f,n;u.key!=="Enter"&&u.key!==" "||(u.preventDefault(),(n=(f=o.current)==null?void 0:f.triggerWave)==null||n.call(f))};return h.jsxs("button",{type:"button",ref:p,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${m+1}`,disabled:x,onPointerMove:x?void 0:i,onPointerDown:x?void 0:e,onPointerLeave:x?void 0:(()=>{var u,f;return(f=(u=o.current)==null?void 0:u.clearPointer)==null?void 0:f.call(u)}),onBlur:x?void 0:(()=>{var u,f;return(f=(u=o.current)==null?void 0:u.clearPointer)==null?void 0:f.call(u)}),onKeyDown:x?void 0:a,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function Oe({itemWrapper:y,index:m,activate:C,locked:x,onReady:M}){const p=s.useRef(null),P=s.useRef(null),o=s.useRef(null),k=s.useRef(!0),g=s.useRef(!0),I=s.useRef(!1),l=Number(y==null?void 0:y.id)===5,t=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),i=s.useMemo(()=>{const n=Number(y.id)||m+1,c=.0026+n*8e-5,w=.0054+n*14e-5,r=n%2?1:2,b={kx:11+n*2,ky:n%2};return{refreshDelay:l?0:8e3,radiusMini:c,radiusMaxi:w,dHueStep:r,startGroup:b,seed:1337+n*1009,reduceMotion:t}},[l,y.id,m,t]);s.useEffect(()=>{if(!C)return;const n=p.current,c=P.current;if(!n||!c)return;let w=!1,r=null,b=null,d=null;const v=()=>{I.current||(I.current=!0,M==null||M(y.uniqueId))},R=F(async()=>{var S,N;try{const _=await z(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(w)return;r=_.createEmbroideryEngine(c,i),o.current=r;const j=()=>$(n,r,window.devicePixelRatio||1);j(),(S=r.renderStatic)==null||S.call(r),g.current&&((N=r.start)==null||N.call(r)),v(),b=new ResizeObserver(()=>{var T;j(),(T=r.renderStatic)==null||T.call(r)}),b.observe(n),"IntersectionObserver"in window&&(d=new IntersectionObserver(T=>{for(const A of T){if(g.current=!!A.isIntersecting,l){g.current||r.stop();continue}g.current&&k.current?r.start():r.stop()}},{threshold:.25}),d.observe(n))}catch{v()}});return()=>{w=!0,R==null||R(),d==null||d.disconnect(),b==null||b.disconnect(),r==null||r.destroy(),o.current=null}},[C,i,y.uniqueId,M]),s.useEffect(()=>{var c,w;const n=o.current;if(n){if(x){(c=n.stop)==null||c.call(n);return}g.current&&((w=n.start)==null||w.call(n))}},[x]),s.useEffect(()=>{var c,w;const n=o.current;if(n){if(x){(c=n.stop)==null||c.call(n);return}g.current&&((w=n.start)==null||w.call(n))}},[x]);const e=()=>{var n;k.current=!0,g.current&&((n=o.current)==null||n.start())},a=()=>{var n,c,w,r;k.current=!0,g.current?(c=(n=o.current)==null?void 0:n.start)==null||c.call(n):(r=(w=o.current)==null?void 0:w.stop)==null||r.call(w)},u=()=>{var n,c,w,r,b,d,v,R,S,N;if(l){(c=(n=o.current)==null?void 0:n.stop)==null||c.call(n),(r=(w=o.current)==null?void 0:w.reset)==null||r.call(w),(d=(b=o.current)==null?void 0:b.start)==null||d.call(b);return}(v=o.current)==null||v.reset(),(S=(R=o.current)==null?void 0:R.renderStatic)==null||S.call(R),g.current&&((N=o.current)==null||N.start())},f=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),u())};return h.jsxs("button",{type:"button",ref:p,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${m+1}`,disabled:x,onClick:x?void 0:u,onMouseEnter:x||l?void 0:e,onMouseLeave:x||l?void 0:a,onFocus:x||l?void 0:e,onBlur:x||l?void 0:a,onKeyDown:x?void 0:f,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:l?"Click":Number.isFinite(Number(y==null?void 0:y.id))?Number(y.id):m+1})]})}function Be({itemWrapper:y,index:m,activate:C,locked:x,onReady:M}){const p=s.useRef(null),P=s.useRef(null),o=s.useRef(null),k=s.useRef(!1),g=s.useRef(null),I=s.useRef(!1),l=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=s.useMemo(()=>({seed:9001+(Number(y.id)||1)*1337,reduceMotion:l,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:120,introDurationMs:950}),[y.id,l]);s.useEffect(()=>{if(!C)return;const r=p.current,b=P.current;if(!r||!b)return;let d=!1,v=null,R=null;const S=()=>{k.current||(k.current=!0,M==null||M(y.uniqueId))},N=F(async()=>{var _,j;try{const T=await z(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(d)return;v=T.createSpiralDotsEngine(b,t),o.current=v;const A=()=>$(r,v,window.devicePixelRatio||1);A(),(_=v.renderStatic)==null||_.call(v),(j=v.start)==null||j.call(v),S(),R=new ResizeObserver(()=>{var B;A(),v.rebuildDots(),(B=v.renderStatic)==null||B.call(v)}),R.observe(r)}catch{S()}});return()=>{d=!0,N==null||N(),R==null||R.disconnect(),v==null||v.destroy(),o.current=null}},[C,t,y.uniqueId,M]),s.useEffect(()=>{var b,d,v;const r=o.current;if(r){if(x){(b=r.clearMouse)==null||b.call(r),(d=r.stop)==null||d.call(r);return}(v=r.start)==null||v.call(r)}},[x]);const i=r=>{const b=p.current;if(!b)return{x:-1e4,y:-1e4};const d=b.getBoundingClientRect();return{x:r.clientX-d.left,y:r.clientY-d.top}},e=()=>{var r;(r=o.current)==null||r.start()},a=()=>{var r,b;(r=o.current)==null||r.clearMouse(),(b=o.current)==null||b.start()},u=()=>{e()},f=()=>{a()},n=r=>{var d;const b=i(r);(d=o.current)==null||d.setMouse(b.x,b.y)},c=()=>{e()},w=()=>{a()};return h.jsxs("div",{ref:p,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:x?-1:0,"aria-label":`Spiral dots web art tile ${m+1}`,onPointerDown:x?void 0:r=>{var v;if(r.pointerType==="mouse")return;const b=p.current;if(!b)return;I.current=!0,g.current=r.pointerId;try{b.setPointerCapture(r.pointerId)}catch{}e();const d=i(r);(v=o.current)==null||v.setMouse(d.x,d.y)},onPointerMove:x?void 0:r=>{var d;if(!I.current||g.current!=null&&r.pointerId!==g.current)return;const b=i(r);(d=o.current)==null||d.setMouse(b.x,b.y)},onPointerUp:x?void 0:r=>{g.current!=null&&r.pointerId!==g.current||(I.current=!1,g.current=null,a())},onPointerCancel:x?void 0:()=>{I.current=!1,g.current=null,a()},onMouseEnter:x?void 0:u,onMouseLeave:x?void 0:f,onMouseMove:x?void 0:n,onFocus:x?void 0:c,onBlur:x?void 0:w,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function He({itemWrapper:y,index:m,activate:C,locked:x,onReady:M}){const p=s.useRef(null),P=s.useRef(null),o=s.useRef(null),k=s.useRef(!0),g=s.useRef(!0),I=s.useRef(!1),l=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=s.useMemo(()=>({seed:424242+(Number(y.id)||2)*2027,reduceMotion:l,targetCellSize:14,gapPx:1.4}),[y.id,l]);s.useEffect(()=>{if(!C)return;const n=p.current,c=P.current;if(!n||!c)return;let w=!1,r=null,b=null,d=null;const v=()=>{I.current||(I.current=!0,M==null||M(y.uniqueId))},R=F(async()=>{var S,N;try{const _=await z(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(w)return;r=_.createGridWaveEngine(c,t),o.current=r;const j=()=>$(n,r,window.devicePixelRatio||1);j(),(S=r.renderStatic)==null||S.call(r),g.current&&((N=r.start)==null||N.call(r)),v(),b=new ResizeObserver(()=>{var T;j(),(T=r.renderStatic)==null||T.call(r)}),b.observe(n),"IntersectionObserver"in window&&(d=new IntersectionObserver(T=>{for(const A of T)g.current=!!A.isIntersecting,g.current&&k.current?r.start():r.stop()},{threshold:.25}),d.observe(n))}catch{v()}});return()=>{w=!0,R==null||R(),d==null||d.disconnect(),b==null||b.disconnect(),r==null||r.destroy(),o.current=null}},[C,t,y.uniqueId,M]);const i=()=>{var n;k.current=!0,g.current&&((n=o.current)==null||n.start())},e=()=>{var n,c,w,r;k.current=!0,g.current?(c=(n=o.current)==null?void 0:n.start)==null||c.call(n):(r=(w=o.current)==null?void 0:w.stop)==null||r.call(w)},a=n=>{const c=p.current;if(!c)return{x:0,y:0};const w=c.getBoundingClientRect();return typeof(n==null?void 0:n.clientX)!="number"||typeof(n==null?void 0:n.clientY)!="number"?{x:w.width/2,y:w.height/2}:{x:n.clientX-w.left,y:n.clientY-w.top}},u=n=>{var w,r,b,d;const c=a(n);(w=o.current)==null||w.rippleAt(c.x,c.y),(b=(r=o.current)==null?void 0:r.renderStatic)==null||b.call(r),k.current&&g.current&&((d=o.current)==null||d.start())},f=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),u(null))};return h.jsxs("button",{type:"button",ref:p,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${m+1}`,disabled:x,onClick:x?void 0:u,onMouseEnter:x?void 0:i,onMouseLeave:x?void 0:e,onFocus:x?void 0:i,onBlur:x?void 0:e,onKeyDown:x?void 0:f,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function ze({itemWrapper:y,index:m,activate:C,locked:x,onReady:M}){const p=s.useRef(null),P=s.useRef(null),o=s.useRef(null),k=s.useRef(!0),g=s.useRef(!0),I=s.useRef(!1),l=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=s.useMemo(()=>({reduceMotion:l,ringCount:9,cubesPerRing:10,ringSpacing:82,tunnelRadius:58,speed:4.6,exposure:1.45}),[l]);s.useEffect(()=>{if(!C)return;const f=p.current,n=P.current;if(!f||!n)return;let c=!1,w=null,r=null,b=null,d=null;const v=()=>{I.current||(I.current=!0,M==null||M(y.uniqueId))},R=async()=>{var T;const N=await z(()=>import("./threeTunnelEngine-YAbz1VnK.js"),__vite__mapDeps([0,1]));if(c)return;w=N.createThreeTunnelEngine(n,t),o.current=w;const _=()=>$(f,w,Math.min(1.5,window.devicePixelRatio||1));return _(),w.reset(),g.current&&((T=w.start)==null||T.call(w)),v(),r=new ResizeObserver(()=>{_(),w.reset()}),r.observe(f),"IntersectionObserver"in window&&(b=new IntersectionObserver(A=>{for(const B of A)g.current=!!B.isIntersecting,g.current&&k.current?w.start():w.stop()},{threshold:.25}),b.observe(f)),()=>{b==null||b.disconnect(),r==null||r.disconnect(),w.destroy(),o.current=null}};let S=null;return d=F(()=>{R().then(N=>{S=N||null}).catch(()=>{v()})},{timeoutMs:300}),()=>{c=!0,d==null||d(),S==null||S()}},[C,t,y.uniqueId,M]),s.useEffect(()=>{var n,c,w;const f=o.current;if(f){if(x){(n=f.setHeld)==null||n.call(f,!1),(c=f.stop)==null||c.call(f);return}g.current&&((w=f.start)==null||w.call(f))}},[x]);const i=()=>{var f;k.current=!0,g.current&&((f=o.current)==null||f.start())},e=()=>{var f,n,c,w;k.current=!0,g.current?(n=(f=o.current)==null?void 0:f.start)==null||n.call(f):(w=(c=o.current)==null?void 0:c.stop)==null||w.call(c)},a=()=>{var f,n,c,w;(n=(f=o.current)==null?void 0:f.nextPalette)==null||n.call(f),(c=o.current)==null||c.reset(),g.current&&((w=o.current)==null||w.start())},u=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),a())};return h.jsxs("button",{type:"button",ref:p,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${m+1}`,disabled:x,onClick:x?void 0:a,onMouseEnter:x?void 0:i,onMouseLeave:x?void 0:e,onFocus:x?void 0:i,onBlur:x?void 0:e,onKeyDown:x?void 0:u,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),h.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Fe({itemWrapper:y,index:m,activate:C,locked:x,onReady:M}){const p=s.useRef(null),P=s.useRef(null),o=s.useRef(null),k=s.useRef(!0),g=s.useRef(!0),I=s.useRef(!1),l=s.useRef(null),t=s.useRef(null),i=s.useRef(!1),e=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),a=s.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,x]);s.useEffect(()=>{if(!C)return;const n=p.current,c=P.current;if(!n||!c)return;let w=!1,r=null,b=null;const d=()=>{I.current||(I.current=!0,M==null||M(y.uniqueId))},v=async()=>{var T;const R=await z(()=>import("./threePolygonDemo5Engine-BcBzJu0K.js"),__vite__mapDeps([2,1]));if(w)return;const S=R.createThreePolygonDemo5Engine(c,a);o.current=S;const N=()=>$(n,S,Math.min(1.2,window.devicePixelRatio||1));N(),S.reset(),g.current&&((T=S.start)==null||T.call(S)),d();const _=new ResizeObserver(()=>{N()});_.observe(n);let j=null;"IntersectionObserver"in window&&(j=new IntersectionObserver(A=>{for(const B of A)g.current=!!B.isIntersecting,g.current&&k.current?S.start():S.stop()},{threshold:.25}),j.observe(n)),r=()=>{j==null||j.disconnect(),_.disconnect(),S.destroy(),o.current=null}};return b=F(()=>{v().catch(()=>{d()})},{timeoutMs:300}),()=>{w=!0,b==null||b(),t.current!=null&&window.clearTimeout(t.current),r==null||r()}},[C,a,y.uniqueId,M]);const u=()=>{var n,c,w;(c=(n=o.current)==null?void 0:n.boost)==null||c.call(n),g.current&&((w=o.current)==null||w.start())},f=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),u())};return h.jsxs("button",{type:"button",ref:p,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${m+1}`,disabled:x,onKeyDown:x?void 0:f,onPointerDown:x?void 0:n=>{var c;if(!(n.button!=null&&n.button!==0)){l.current=n.pointerId,i.current=!1;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}g.current&&((c=o.current)==null||c.start()),t.current!=null&&window.clearTimeout(t.current),t.current=window.setTimeout(()=>{var w,r;l.current!=null&&(i.current=!0,(r=(w=o.current)==null?void 0:w.setHeld)==null||r.call(w,!0))},140)}},onPointerUp:x?void 0:n=>{var c,w;l.current!=null&&n.pointerId!==l.current||(t.current!=null&&(window.clearTimeout(t.current),t.current=null),l.current=null,i.current?(i.current=!1,(w=(c=o.current)==null?void 0:c.setHeld)==null||w.call(c,!1)):u())},onPointerCancel:x?void 0:(()=>{var n,c;t.current!=null&&(window.clearTimeout(t.current),t.current=null),l.current=null,i.current=!1,(c=(n=o.current)==null?void 0:n.setHeld)==null||c.call(n,!1)}),onLostPointerCapture:x?void 0:(()=>{var n,c;t.current!=null&&(window.clearTimeout(t.current),t.current=null),l.current=null,i.current=!1,(c=(n=o.current)==null?void 0:n.setHeld)==null||c.call(n,!1)}),onMouseEnter:x?void 0:(()=>{var n;k.current=!0,g.current&&((n=o.current)==null||n.start())}),onMouseLeave:x?void 0:(()=>{var n,c,w,r;t.current!=null&&(window.clearTimeout(t.current),t.current=null),l.current=null,i.current=!1,(c=(n=o.current)==null?void 0:n.setHeld)==null||c.call(n,!1),k.current=!0,g.current?(w=o.current)==null||w.start():(r=o.current)==null||r.stop()}),onFocus:x?void 0:(()=>{var n;k.current=!0,g.current&&((n=o.current)==null||n.start())}),onBlur:x?void 0:(()=>{var n,c,w,r;t.current!=null&&(window.clearTimeout(t.current),t.current=null),l.current=null,i.current=!1,(c=(n=o.current)==null?void 0:n.setHeld)==null||c.call(n,!1),k.current=!0,g.current?(w=o.current)==null||w.start():(r=o.current)==null||r.stop()}),children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function $e({itemWrapper:y,index:m,activate:C,locked:x,onReady:M}){const p=s.useRef(null),P=s.useRef(null),o=s.useRef(null),k=s.useRef(!0),g=s.useRef(!0),I=s.useRef(!1),l=s.useRef(0),t=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),i=s.useMemo(()=>({reduceMotion:t,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[t]);s.useEffect(()=>{if(!C)return;const n=p.current,c=P.current;if(!n||!c)return;let w=!1,r=null,b=null,d=null;const v=()=>{I.current||(I.current=!0,M==null||M(y.uniqueId))},R=F(async()=>{var S,N;try{const _=await z(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(w)return;r=_.createOrbitCirclesEngine(c,i),o.current=r;const j=()=>$(n,r,window.devicePixelRatio||1);j(),r.reset(),(S=r.renderStatic)==null||S.call(r),g.current&&((N=r.start)==null||N.call(r)),v(),b=new ResizeObserver(()=>{var T;j(),(T=r.renderStatic)==null||T.call(r)}),b.observe(n),"IntersectionObserver"in window&&(d=new IntersectionObserver(T=>{for(const A of T)g.current=!!A.isIntersecting,g.current&&k.current?r.start():r.stop()},{threshold:.25}),d.observe(n))}catch{v()}});return()=>{w=!0,R==null||R(),d==null||d.disconnect(),b==null||b.disconnect(),r==null||r.destroy(),o.current=null}},[C,i,y.uniqueId,M]),s.useEffect(()=>{var c,w;const n=o.current;if(n){if(x){(c=n.stop)==null||c.call(n);return}g.current&&((w=n.start)==null||w.call(n))}},[x]);const e=()=>{var n;k.current=!0,g.current&&((n=o.current)==null||n.start())},a=()=>{var n,c,w,r;k.current=!0,g.current?(c=(n=o.current)==null?void 0:n.start)==null||c.call(n):(r=(w=o.current)==null?void 0:w.stop)==null||r.call(w)},u=()=>{var r,b;const n=o.current;if(!n)return;const c=[{palette:["#A8DA00","#76C700","#D9FF6A"],bgColor:"#06130a"},{palette:["#DD0F7E","#FF4FAE","#7B2CFF"],bgColor:"#200018"},{palette:["#009BBE","#00D5FF","#2B7BFF"],bgColor:"#001018"},{palette:["#F2E205","#FFB703","#EE5A02"],bgColor:"#1a0f00"},{palette:["#8A2BFF","#C300FF","#FF00C8"],bgColor:"#07000f"}],w=c[l.current%c.length];l.current=(l.current+1)%c.length,(r=n.setPalette)==null||r.call(n,w.palette,w.bgColor),g.current&&((b=n.start)==null||b.call(n))},f=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),u())};return h.jsxs("button",{type:"button",ref:p,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${m+1}`,disabled:x,onClick:x?void 0:u,onMouseEnter:x?void 0:e,onMouseLeave:x?void 0:a,onFocus:x?void 0:e,onBlur:x?void 0:a,onKeyDown:x?void 0:f,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function qe({readyId:y,locked:m,onReady:C}){const x=s.useRef(null),M=s.useRef(null),p=s.useRef(null),P=s.useRef(!1),o=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=s.useMemo(()=>({seed:20250414,reduceMotion:o,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[o]);s.useEffect(()=>{const l=x.current,t=M.current;if(!l||!t)return;let i=!1,e=null,a=null,u=null;const f=()=>{P.current||(P.current=!0,C==null||C(y))},n=F(async()=>{var c,w;try{const r=await z(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(i)return;e=r.createTortuosityTraceEngine(t,k),p.current=e;const b=()=>$(l,e,Math.min(1.5,window.devicePixelRatio||1));b(),(c=e.renderStatic)==null||c.call(e),(w=e.start)==null||w.call(e),f(),a=new ResizeObserver(()=>{var d;b(),(d=e.reset)==null||d.call(e)}),a.observe(l),"IntersectionObserver"in window&&(u=new IntersectionObserver(d=>{var v,R;for(const S of d)S.isIntersecting?(v=e.start)==null||v.call(e):(R=e.stop)==null||R.call(e)},{threshold:.25}),u.observe(l))}catch{f()}},{timeoutMs:200});return()=>{var c;i=!0,n==null||n(),u==null||u.disconnect(),a==null||a.disconnect(),(c=e==null?void 0:e.destroy)==null||c.call(e),p.current=null}},[k,C,y]),s.useEffect(()=>{var t,i,e;const l=p.current;if(l){if(m){(t=l.setHeld)==null||t.call(l,!1),(i=l.stop)==null||i.call(l);return}(e=l.start)==null||e.call(l)}},[m]),s.useEffect(()=>{var t,i;const l=p.current;if(l){if(m){(t=l.stop)==null||t.call(l);return}(i=l.start)==null||i.call(l)}},[m]);const g=()=>{var l,t,i,e;(t=(l=p.current)==null?void 0:l.reset)==null||t.call(l),(e=(i=p.current)==null?void 0:i.start)==null||e.call(i)},I=l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),g())};return h.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:m,onClick:m?void 0:g,onKeyDown:m?void 0:I,children:[h.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function Ke({readyId:y,locked:m,onReady:C}){const x=s.useRef(null),M=s.useRef(null),p=s.useRef(null),P=s.useRef(!1),o=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=s.useMemo(()=>({seed:20250415,reduceMotion:o,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[o]);s.useEffect(()=>{const l=x.current,t=M.current;if(!l||!t)return;let i=!1,e=null,a=null,u=null;const f=()=>{P.current||(P.current=!0,C==null||C(y))},n=F(async()=>{var c,w;try{const r=await z(()=>import("./hexFlowBallsEngine-C4hMgqMS.js"),[]);if(i)return;e=r.createHexFlowBallsEngine(t,k),p.current=e;const b=()=>$(l,e,Math.min(1.5,window.devicePixelRatio||1));b(),(c=e.renderStatic)==null||c.call(e),(w=e.start)==null||w.call(e),f(),a=new ResizeObserver(()=>{var d;b(),(d=e.reset)==null||d.call(e)}),a.observe(l),"IntersectionObserver"in window&&(u=new IntersectionObserver(d=>{var v,R;for(const S of d)S.isIntersecting?(v=e.start)==null||v.call(e):(R=e.stop)==null||R.call(e)},{threshold:.25}),u.observe(l))}catch{f()}},{timeoutMs:220});return()=>{var c;i=!0,n==null||n(),u==null||u.disconnect(),a==null||a.disconnect(),(c=e==null?void 0:e.destroy)==null||c.call(e),p.current=null}},[k,C,y]),s.useEffect(()=>{var t,i,e;const l=p.current;if(l){if(m){(t=l.clearPointer)==null||t.call(l),(i=l.stop)==null||i.call(l);return}(e=l.start)==null||e.call(l)}},[m]),s.useEffect(()=>{var t,i;const l=p.current;if(l){if(m){(t=l.stop)==null||t.call(l);return}(i=l.start)==null||i.call(l)}},[m]);const g=()=>{var l,t,i,e;(t=(l=p.current)==null?void 0:l.toggleGridContrast)==null||t.call(l),(e=(i=p.current)==null?void 0:i.start)==null||e.call(i)},I=l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),g())};return h.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:m,onClick:m?void 0:g,onKeyDown:m?void 0:I,children:[h.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function Ve({readyId:y,locked:m,onReady:C}){const x=s.useRef(null),M=s.useRef(null),p=s.useRef(null),P=s.useRef(!1),o=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=s.useMemo(()=>({seed:20250416,reduceMotion:o,step:6,side:5}),[o]);s.useEffect(()=>{const t=x.current,i=M.current;if(!t||!i)return;let e=!1,a=null,u=null,f=null;const n=()=>{P.current||(P.current=!0,C==null||C(y))},c=F(async()=>{var w,r;try{const b=await z(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;a=b.createPixelPlopEngine(i,k),p.current=a;const d=()=>$(t,a,Math.min(1.5,window.devicePixelRatio||1));d(),(w=a.renderStatic)==null||w.call(a),(r=a.start)==null||r.call(a),n(),u=new ResizeObserver(()=>{var v;d(),(v=a.reset)==null||v.call(a)}),u.observe(t),"IntersectionObserver"in window&&(f=new IntersectionObserver(v=>{var R,S;for(const N of v)N.isIntersecting?(R=a.start)==null||R.call(a):(S=a.stop)==null||S.call(a)},{threshold:.25}),f.observe(t))}catch{n()}},{timeoutMs:220});return()=>{var w;e=!0,c==null||c(),f==null||f.disconnect(),u==null||u.disconnect(),(w=a==null?void 0:a.destroy)==null||w.call(a),p.current=null}},[k,C,y]),s.useEffect(()=>{var i,e,a;const t=p.current;if(t){if(m){(i=t.clearPointer)==null||i.call(t),(e=t.stop)==null||e.call(t);return}(a=t.start)==null||a.call(t)}},[m]),s.useEffect(()=>{var i,e;const t=p.current;if(t){if(m){(i=t.stop)==null||i.call(t);return}(e=t.start)==null||e.call(t)}},[m]);const g=()=>{var t,i,e,a;(i=(t=p.current)==null?void 0:t.seedBurst)==null||i.call(t),(a=(e=p.current)==null?void 0:e.start)==null||a.call(e)},I=t=>{var a,u,f,n;const i=x.current;if(!i||typeof(t==null?void 0:t.clientX)!="number"||typeof(t==null?void 0:t.clientY)!="number"){g();return}const e=i.getBoundingClientRect();(u=(a=p.current)==null?void 0:a.burstAt)==null||u.call(a,t.clientX-e.left,t.clientY-e.top),(n=(f=p.current)==null?void 0:f.start)==null||n.call(f)},l=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),g())};return h.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:m,onPointerDown:m?void 0:(t=>{t.button!=null&&t.button!==0||I(t)}),onKeyDown:m?void 0:l,children:[h.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function Ge({readyId:y,locked:m,onReady:C}){const x=s.useRef(null),M=s.useRef(null),p=s.useRef(null),P=s.useRef(!1),o=s.useRef(null),k=s.useRef(!1),g=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=s.useMemo(()=>({reduceMotion:g,seed:20250417}),[g]);s.useEffect(()=>{const e=x.current,a=M.current;if(!e||!a)return;let u=!1,f=null,n=null,c=null;const w=()=>{P.current||(P.current=!0,C==null||C(y))},r=F(async()=>{var b,d;try{const v=await z(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(u)return;f=v.createJuliaLinesEngine(a,I),p.current=f;const R=()=>$(e,f,Math.min(1.5,window.devicePixelRatio||1));R(),(b=f.renderStatic)==null||b.call(f),(d=f.start)==null||d.call(f),w(),n=new ResizeObserver(()=>{R()}),n.observe(e),"IntersectionObserver"in window&&(c=new IntersectionObserver(S=>{var N,_;for(const j of S)j.isIntersecting?(N=f.start)==null||N.call(f):(_=f.stop)==null||_.call(f)},{threshold:.25}),c.observe(e))}catch{w()}},{timeoutMs:220});return()=>{var b;u=!0,r==null||r(),c==null||c.disconnect(),n==null||n.disconnect(),(b=f==null?void 0:f.destroy)==null||b.call(f),p.current=null}},[I,C,y]),s.useEffect(()=>{var a,u,f,n;const e=p.current;if(e){if(m){(a=e.setHeld)==null||a.call(e,!1),(u=e.clearPointer)==null||u.call(e),(f=e.stop)==null||f.call(e);return}(n=e.start)==null||n.call(e)}},[m]),s.useEffect(()=>{var a,u,f;const e=p.current;if(e){if(m){(a=e.clearPointer)==null||a.call(e),(u=e.stop)==null||u.call(e);return}(f=e.start)==null||f.call(e)}},[m]);const l=e=>{const a=x.current;if(!a)return{x:.4,y:.5};const u=a.getBoundingClientRect(),f=(e.clientX-u.left)/Math.max(1,u.width),n=(e.clientY-u.top)/Math.max(1,u.height);return{x:Math.max(0,Math.min(1,f)),y:Math.max(0,Math.min(1,n))}},t=()=>{var e,a,u,f;(a=(e=p.current)==null?void 0:e.reset)==null||a.call(e),(f=(u=p.current)==null?void 0:u.start)==null||f.call(u)},i=e=>{var u,f,n,c,w,r,b,d;const a=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(f=(u=p.current)==null?void 0:u.nudge)==null||f.call(u,0,-a)):e.key==="ArrowDown"?(e.preventDefault(),(c=(n=p.current)==null?void 0:n.nudge)==null||c.call(n,0,a)):e.key==="ArrowLeft"?(e.preventDefault(),(r=(w=p.current)==null?void 0:w.nudge)==null||r.call(w,-a,0)):e.key==="ArrowRight"?(e.preventDefault(),(d=(b=p.current)==null?void 0:b.nudge)==null||d.call(b,a,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),t())};return h.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:m?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:m?void 0:e=>{var f,n;const a=x.current;if(!a)return;k.current=!0,o.current=e.pointerId;try{a.setPointerCapture(e.pointerId)}catch{}const u=l(e);(n=(f=p.current)==null?void 0:f.setPointer)==null||n.call(f,u.x,u.y)},onPointerMove:m?void 0:e=>{var u,f;if(k.current&&o.current!=null&&e.pointerId!==o.current)return;const a=l(e);(f=(u=p.current)==null?void 0:u.setPointer)==null||f.call(u,a.x,a.y)},onPointerUp:m?void 0:e=>{var a,u;o.current!=null&&e.pointerId!==o.current||(k.current=!1,o.current=null,(u=(a=p.current)==null?void 0:a.clearPointer)==null||u.call(a))},onPointerCancel:m?void 0:()=>{var e,a;k.current=!1,o.current=null,(a=(e=p.current)==null?void 0:e.clearPointer)==null||a.call(e)},onMouseMove:m?void 0:e=>{var u,f;const a=l(e);(f=(u=p.current)==null?void 0:u.setPointer)==null||f.call(u,a.x,a.y)},onMouseLeave:m?void 0:(()=>{var e,a;(a=(e=p.current)==null?void 0:e.clearPointer)==null||a.call(e)}),onBlur:m?void 0:(()=>{var e,a;(a=(e=p.current)==null?void 0:e.clearPointer)==null||a.call(e)}),onKeyDown:m?void 0:i,onClick:m?void 0:t,children:[h.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function Ye({readyId:y,locked:m,onReady:C}){const[x,M]=s.useState(0),[p,P]=s.useState("mine"),[o,k]=s.useState(()=>new Set),[g,I]=s.useState(()=>new Set),[l,t]=s.useState("playing"),[i,e]=s.useState(null),[a,u]=s.useState(0),f=s.useMemo(()=>Ie(),[x]);s.useEffect(()=>{C==null||C(y)},[C,y]),s.useEffect(()=>{P("mine"),k(new Set),I(new Set),t("playing"),e(null),u(0)},[x]),s.useEffect(()=>{if(i==null||l!=="playing")return;const d=()=>{u(Math.min(5999,Math.floor((Date.now()-i)/1e3)))};d();const v=window.setInterval(d,1e3);return()=>{window.clearInterval(v)}},[i,l]);const n=()=>{M(d=>d+1)},c=d=>{if(m||l!=="playing")return;if(i==null&&e(Date.now()),p==="flag"){if(o.has(d))return;const R=new Set(g);R.has(d)?R.delete(d):R.add(d),I(R),le(f,o,R)&&t("won");return}if(g.has(d)||o.has(d))return;if(f.mines.has(d)){const R=new Set(o);for(const S of f.mines)R.add(S);R.add(d),k(R),t("lost");return}const v=Ne(d,f,o,g);k(v),le(f,v,g)&&t("won")},w=f.mineCount-g.size,r=`${String(Math.floor(a/60)).padStart(2,"0")}:${String(a%60).padStart(2,"0")}`;let b="🤔";return l==="lost"?b="😣":l==="won"?b="😎":g.size>=f.mineCount?b="😕":g.size>=f.mineCount-1?b="🤓":g.size>=Math.round(f.mineCount*3/4)?b="😃":g.size>=Math.round(f.mineCount*2/3)?b="😊":g.size>=Math.round(f.mineCount/2)?b="🙂":g.size>=Math.round(f.mineCount/3)?b="😏":g.size>0&&(b="😐"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:h.jsxs("div",{className:"article-web-art-minesweeper",children:[h.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[h.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${p==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("mine"),disabled:m||l!=="playing","aria-pressed":p==="mine",children:"⛏"}),h.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${p==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("flag"),disabled:m||l!=="playing","aria-pressed":p==="flag",children:"🚩"})]}),h.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[f.counts.map((d,v)=>{const R=o.has(v),S=g.has(v),N=f.mines.has(v),_=l==="lost"&&N,j=d>0?Se[d-1]:void 0;return h.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${R?"article-web-art-minesweeper-cell-revealed":""} ${_?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>c(v),disabled:m||l!=="playing","aria-label":`Minesweeper cell ${v+1}`,children:[S&&!R?h.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,_?h.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,R&&!N&&d>0?h.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:j},children:d}):null]},`mine-${x}-${v}`)}),l==="lost"?h.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:n,children:["Ooohhh 🙁",h.jsx("br",{}),"Click to try again"]}):null,l==="won"?h.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:n,children:["👌👀✔💯💯💯",h.jsx("br",{}),"Click to restart"]}):null]}),h.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[h.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[h.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:b}),h.jsx("span",{children:w})]}),h.jsx("div",{className:"article-web-art-minesweeper-timer",children:r})]}),h.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function Ue({readyId:y,locked:m,onReady:C}){const x=s.useRef(null),M=s.useRef(null),p=s.useRef(null),P=s.useRef(!1),o=s.useRef(null),k=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=s.useMemo(()=>({reduceMotion:k}),[k]);s.useEffect(()=>{const i=x.current,e=M.current;if(!i||!e)return;let a=!1,u=null,f=null,n=null;const c=()=>{P.current||(P.current=!0,C==null||C(y))},w=F(async()=>{var r,b;try{const d=await z(()=>import("./fallingRingsEngine-C9a7CL1C.js"),[]);if(a)return;u=d.createFallingRingsEngine(e,g),p.current=u;const v=()=>$(i,u,Math.min(1.5,window.devicePixelRatio||1));v(),(r=u.renderStatic)==null||r.call(u),(b=u.start)==null||b.call(u),c(),f=new ResizeObserver(()=>{v()}),f.observe(i),"IntersectionObserver"in window&&(n=new IntersectionObserver(R=>{var S,N;for(const _ of R)_.isIntersecting?(S=u.start)==null||S.call(u):(N=u.stop)==null||N.call(u)},{threshold:.25}),n.observe(i))}catch{c()}},{timeoutMs:220});return()=>{var r;a=!0,w==null||w(),n==null||n.disconnect(),f==null||f.disconnect(),(r=u==null?void 0:u.destroy)==null||r.call(u),p.current=null}},[g,C,y]);const I=i=>{var e,a,u,f;(a=(e=p.current)==null?void 0:e.setHeld)==null||a.call(e,i),(f=(u=p.current)==null?void 0:u.start)==null||f.call(u)},l=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),I(!0))},t=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),I(!1))};return h.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:m,onPointerDown:m?void 0:i=>{o.current=i.pointerId;try{i.currentTarget.setPointerCapture(i.pointerId)}catch{}I(!0)},onPointerUp:m?void 0:i=>{o.current!=null&&i.pointerId!==o.current||(o.current=null,I(!1))},onPointerCancel:m?void 0:()=>{o.current=null,I(!1)},onLostPointerCapture:m?void 0:()=>{o.current=null,I(!1)},onMouseLeave:m?void 0:(()=>{o.current!=null&&I(!1)}),onBlur:m?void 0:(()=>{o.current=null,I(!1)}),onKeyDown:m?void 0:l,onKeyUp:m?void 0:t,children:[h.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function Xe({readyId:y,locked:m,onReady:C}){const x=s.useRef(null),M=s.useRef(null),p=s.useRef(null),P=s.useRef(!1),o=s.useRef(null),k=s.useRef("mouse"),g=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=s.useMemo(()=>({reduceMotion:g,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[g]);s.useEffect(()=>{const t=x.current,i=M.current;if(!t||!i)return;let e=!1,a=null,u=null,f=null;const n=()=>{P.current||(P.current=!0,C==null||C(y))},c=F(async()=>{var w,r;try{const b=await z(()=>import("./prismFieldEngine-Dkw-H_-R.js"),__vite__mapDeps([3,1]));if(e)return;a=b.createPrismFieldEngine(i,I),p.current=a;const d=()=>$(t,a,Math.min(1.5,window.devicePixelRatio||1));d(),(w=a.renderStatic)==null||w.call(a),(r=a.start)==null||r.call(a),n(),u=new ResizeObserver(()=>{d()}),u.observe(t),"IntersectionObserver"in window&&(f=new IntersectionObserver(v=>{var R,S;for(const N of v)N.isIntersecting?(R=a.start)==null||R.call(a):(S=a.stop)==null||S.call(a)},{threshold:.25}),f.observe(t))}catch{n()}},{timeoutMs:220});return()=>{var w;e=!0,c==null||c(),f==null||f.disconnect(),u==null||u.disconnect(),(w=a==null?void 0:a.destroy)==null||w.call(a),p.current=null}},[I,C,y]);const l=t=>{const i=x.current;if(!i)return{x:.5,y:.5};const e=i.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(t.clientY-e.top)/Math.max(1,e.height)))}};return h.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:m,onPointerDown:m?void 0:t=>{var e,a;o.current=t.pointerId,k.current=t.pointerType||"mouse";try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const i=l(t);(a=(e=p.current)==null?void 0:e.setPointer)==null||a.call(e,i.x,i.y)},onPointerMove:m?void 0:t=>{var e,a;if(o.current!=null&&t.pointerId!==o.current)return;const i=l(t);(a=(e=p.current)==null?void 0:e.setPointer)==null||a.call(e,i.x,i.y)},onPointerUp:m?void 0:t=>{var i,e;o.current!=null&&t.pointerId!==o.current||(o.current=null,(t.pointerType||k.current)==="mouse"&&((e=(i=p.current)==null?void 0:i.clearPointer)==null||e.call(i)))},onPointerCancel:m?void 0:(()=>{var t,i;o.current=null,k.current==="mouse"&&((i=(t=p.current)==null?void 0:t.clearPointer)==null||i.call(t))}),onMouseMove:m?void 0:t=>{var e,a;const i=l(t);(a=(e=p.current)==null?void 0:e.setPointer)==null||a.call(e,i.x,i.y)},onMouseLeave:m?void 0:(()=>{var t,i;o.current=null,(i=(t=p.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onBlur:m?void 0:(()=>{var t,i;o.current=null,k.current="mouse",(i=(t=p.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onKeyDown:m?void 0:(t=>{var i,e,a,u;(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),(e=(i=p.current)==null?void 0:i.reset)==null||e.call(i),(u=(a=p.current)==null?void 0:a.start)==null||u.call(a))}),children:[h.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function Je({readyId:y,locked:m,onReady:C}){const x=s.useRef(null),M=s.useRef(null),p=s.useRef(null),P=s.useRef(!1),o=s.useRef(null),k=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=s.useMemo(()=>({reduceMotion:k}),[k]);s.useEffect(()=>{const t=x.current,i=M.current;if(!t||!i)return;let e=!1,a=null,u=null,f=null;const n=()=>{P.current||(P.current=!0,C==null||C(y))},c=F(async()=>{var w,r;try{const b=await z(()=>import("./ropeLightEngine-B3dT-ds-.js"),[]);if(e)return;a=b.createRopeLightEngine(i,g),p.current=a;const d=()=>$(t,a,Math.min(1.5,window.devicePixelRatio||1));d(),(w=a.renderStatic)==null||w.call(a),(r=a.start)==null||r.call(a),n(),u=new ResizeObserver(()=>{d()}),u.observe(t),"IntersectionObserver"in window&&(f=new IntersectionObserver(v=>{var R,S;for(const N of v)N.isIntersecting?(R=a.start)==null||R.call(a):(S=a.stop)==null||S.call(a)},{threshold:.25}),f.observe(t))}catch{n()}},{timeoutMs:220});return()=>{var w;e=!0,c==null||c(),f==null||f.disconnect(),u==null||u.disconnect(),(w=a==null?void 0:a.destroy)==null||w.call(a),p.current=null}},[g,C,y]);const I=t=>{const i=x.current;if(!i)return{x:.5,y:.5};const e=i.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(t.clientY-e.top)/Math.max(1,e.height)))}},l=()=>{var t,i,e,a;(i=(t=p.current)==null?void 0:t.reset)==null||i.call(t),(a=(e=p.current)==null?void 0:e.start)==null||a.call(e)};return h.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:m,onClick:m?void 0:l,onPointerDown:m?void 0:t=>{var e,a;o.current=t.pointerId;const i=I(t);(a=(e=p.current)==null?void 0:e.setPointer)==null||a.call(e,i.x,i.y)},onPointerMove:m?void 0:t=>{var e,a;if(o.current!=null&&t.pointerId!==o.current)return;const i=I(t);(a=(e=p.current)==null?void 0:e.setPointer)==null||a.call(e,i.x,i.y)},onPointerUp:m?void 0:t=>{var i,e;o.current!=null&&t.pointerId!==o.current||(o.current=null,(e=(i=p.current)==null?void 0:i.clearPointer)==null||e.call(i))},onPointerCancel:m?void 0:(()=>{var t,i;o.current=null,(i=(t=p.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onMouseMove:m?void 0:t=>{var e,a;const i=I(t);(a=(e=p.current)==null?void 0:e.setPointer)==null||a.call(e,i.x,i.y)},onMouseLeave:m?void 0:(()=>{var t,i;o.current=null,(i=(t=p.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onBlur:m?void 0:(()=>{var t,i;o.current=null,(i=(t=p.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onKeyDown:m?void 0:(t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),l())}),children:[h.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}function Ze({readyId:y,locked:m,onReady:C}){const x=s.useRef(null),M=s.useRef(null),p=s.useRef(null),P=s.useRef(!1),o=s.useRef(null),k=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=s.useMemo(()=>({reduceMotion:k}),[k]);s.useEffect(()=>{const l=x.current,t=M.current;if(!l||!t)return;let i=!1,e=null,a=null,u=null;const f=()=>{P.current||(P.current=!0,C==null||C(y))},n=F(async()=>{var c,w;try{const r=await z(()=>import("./soupShaderEngine-DOT8TiBo.js"),__vite__mapDeps([4,1]));if(i)return;e=r.createSoupShaderEngine(t,g),p.current=e;const b=()=>$(l,e,Math.min(1.5,window.devicePixelRatio||1));b(),(c=e.renderStatic)==null||c.call(e),(w=e.start)==null||w.call(e),f(),a=new ResizeObserver(()=>{b()}),a.observe(l),"IntersectionObserver"in window&&(u=new IntersectionObserver(d=>{var v,R;for(const S of d)S.isIntersecting?(v=e.start)==null||v.call(e):(R=e.stop)==null||R.call(e)},{threshold:.25}),u.observe(l))}catch{f()}},{timeoutMs:220});return()=>{var c;i=!0,n==null||n(),u==null||u.disconnect(),a==null||a.disconnect(),(c=e==null?void 0:e.destroy)==null||c.call(e),p.current=null}},[g,C,y]);const I=l=>{const t=x.current;if(!t)return{x:.5,y:.5};const i=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(l.clientX-i.left)/Math.max(1,i.width))),y:Math.max(0,Math.min(1,(l.clientY-i.top)/Math.max(1,i.height)))}};return h.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Soup shader web art tile",disabled:m,onPointerDown:m?void 0:l=>{var i,e,a,u;o.current=l.pointerId;try{l.currentTarget.setPointerCapture(l.pointerId)}catch{}const t=I(l);(e=(i=p.current)==null?void 0:i.setPointer)==null||e.call(i,t.x,t.y),(u=(a=p.current)==null?void 0:a.setHeld)==null||u.call(a,!0)},onPointerMove:m?void 0:l=>{var i,e;if(o.current!=null&&l.pointerId!==o.current)return;const t=I(l);(e=(i=p.current)==null?void 0:i.setPointer)==null||e.call(i,t.x,t.y)},onPointerUp:m?void 0:l=>{var t,i;o.current!=null&&l.pointerId!==o.current||(o.current=null,(i=(t=p.current)==null?void 0:t.setHeld)==null||i.call(t,!1))},onPointerCancel:m?void 0:(()=>{var l,t;o.current=null,(t=(l=p.current)==null?void 0:l.setHeld)==null||t.call(l,!1)}),onMouseMove:m?void 0:l=>{var i,e;const t=I(l);(e=(i=p.current)==null?void 0:i.setPointer)==null||e.call(i,t.x,t.y)},onMouseLeave:m?void 0:(()=>{var l,t,i,e;o.current=null,(t=(l=p.current)==null?void 0:l.setHeld)==null||t.call(l,!1),(e=(i=p.current)==null?void 0:i.clearPointer)==null||e.call(i)}),onBlur:m?void 0:(()=>{var l,t,i,e;o.current=null,(t=(l=p.current)==null?void 0:l.setHeld)==null||t.call(l,!1),(e=(i=p.current)==null?void 0:i.clearPointer)==null||e.call(i)}),children:[h.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function Qe({readyId:y,locked:m,onReady:C}){const x=s.useRef(null),M=s.useRef(null),p=s.useRef(null),P=s.useRef(!1),o=s.useRef(null),k=s.useRef(null),g=s.useRef(0),[I,l]=s.useState(!1),[t,i]=s.useState(!1),[e,a]=s.useState([]),u=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=s.useMemo(()=>({reduceMotion:u}),[u]);s.useEffect(()=>{const r=x.current,b=M.current;if(!r||!b)return;let d=!1,v=null,R=null,S=null;const N=()=>{P.current||(P.current=!0,C==null||C(y))},_=F(async()=>{var j,T;try{const A=await z(()=>import("./tardisWormholeEngine-BSErFcgT.js"),__vite__mapDeps([5,1]));if(d)return;v=A.createTardisWormholeEngine(b,f),p.current=v;const B=()=>$(r,v,Math.min(1.5,window.devicePixelRatio||1));B(),(j=v.renderStatic)==null||j.call(v),(T=v.start)==null||T.call(v),N(),R=new ResizeObserver(()=>{B()}),R.observe(r),"IntersectionObserver"in window&&(S=new IntersectionObserver(X=>{var G,V;for(const J of X)J.isIntersecting?(G=v.start)==null||G.call(v):(V=v.stop)==null||V.call(v)},{threshold:.25}),S.observe(r))}catch{N()}},{timeoutMs:220});return()=>{var j;d=!0,_==null||_(),S==null||S.disconnect(),R==null||R.disconnect(),(j=v==null?void 0:v.destroy)==null||j.call(v),p.current=null}},[f,C,y]),s.useEffect(()=>{if(e.length===0)return;const r=window.setTimeout(()=>{a(b=>b.slice(1))},1e3);return()=>{window.clearTimeout(r)}},[e]),s.useEffect(()=>{var b,d,v;const r=p.current;if(r){if(m){i(!1),l(!1),k.current=null,(b=r.clearPointer)==null||b.call(r),(d=r.stop)==null||d.call(r);return}(v=r.start)==null||v.call(r)}},[m]);const n=r=>{const b=x.current;if(!b)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const d=b.getBoundingClientRect(),v=Math.max(0,Math.min(d.width,r.clientX-d.left)),R=Math.max(0,Math.min(d.height,r.clientY-d.top)),S=k.current,N=S?v-S.px:0,_=S?R-S.py:0;return k.current={px:v,py:R},b.style.setProperty("--tardis-cursor-x",`${v}px`),b.style.setProperty("--tardis-cursor-y",`${R}px`),{x:d.width>0?v/d.width:.5,y:d.height>0?R/d.height:.5,px:v,py:R,dx:N,dy:_}},c=(r,b)=>{const d=g.current++;a(v=>[...v,{id:d,x:r,y:b}])},w=r=>{var d,v,R,S;const b=n(r);c(b.px,b.py),(v=(d=p.current)==null?void 0:d.boost)==null||v.call(d),(S=(R=p.current)==null?void 0:R.start)==null||S.call(R),i(!0),window.setTimeout(()=>{i(!1)},650)};return h.jsxs("button",{type:"button",ref:x,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${I?"article-web-art-tile-tardis-active":""} ${t?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:m,onClick:m?void 0:w,onContextMenu:m?void 0:(r=>{var d,v,R,S;r.preventDefault();const b=n(r);c(b.px,b.py),(v=(d=p.current)==null?void 0:d.reverseBurst)==null||v.call(d),(S=(R=p.current)==null?void 0:R.start)==null||S.call(R)}),onWheel:m?void 0:(r=>{var b,d;(d=(b=p.current)==null?void 0:b.addScrollBoost)==null||d.call(b,r.deltaY*.003)}),onPointerDown:m?void 0:r=>{var d,v;o.current=r.pointerId;try{r.currentTarget.setPointerCapture(r.pointerId)}catch{}const b=n(r);(v=(d=p.current)==null?void 0:d.setPointer)==null||v.call(d,b.x,b.y,b.dx,b.dy)},onPointerMove:m?void 0:r=>{var d,v,R,S;if(o.current!=null&&r.pointerId!==o.current)return;const b=n(r);(v=(d=p.current)==null?void 0:d.setPointer)==null||v.call(d,b.x,b.y,b.dx,b.dy),(r.buttons&1)===1&&((S=(R=p.current)==null?void 0:R.drag)==null||S.call(R,b.dx))},onPointerUp:m?void 0:r=>{o.current!=null&&r.pointerId!==o.current||(o.current=null)},onPointerCancel:m?void 0:(()=>{o.current=null}),onMouseEnter:m?void 0:(()=>{l(!0)}),onMouseMove:m?void 0:r=>{var d,v;const b=n(r);(v=(d=p.current)==null?void 0:d.setPointer)==null||v.call(d,b.x,b.y,b.dx,b.dy)},onMouseLeave:m?void 0:(()=>{var r,b;o.current=null,k.current=null,l(!1),(b=(r=p.current)==null?void 0:r.clearPointer)==null||b.call(r)}),onBlur:m?void 0:(()=>{var r,b;o.current=null,k.current=null,l(!1),(b=(r=p.current)==null?void 0:r.clearPointer)==null||b.call(r)}),onKeyDown:m?void 0:(r=>{var b,d,v,R;(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),(d=(b=p.current)==null?void 0:b.boost)==null||d.call(b),(R=(v=p.current)==null?void 0:v.start)==null||R.call(v))}),children:[h.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),h.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-cursor","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-cursor-dot","aria-hidden":!0}),h.jsxs("div",{className:"article-web-art-tardis-hud","aria-hidden":!0,children:[h.jsx("div",{className:"article-web-art-tardis-hud-label",children:"Traversing Singularity"}),h.jsx("div",{className:"article-web-art-tardis-hud-bar"})]}),e.map(r=>h.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${r.x}px`,top:`${r.y}px`},"aria-hidden":!0},r.id)),h.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function We({label:y,clickLabel:m,previewRequested:C=!1}){const x=de(),M=s.useRef(null),[p,P]=s.useState(!1),[o,k]=s.useState(0),g=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=s.useCallback(()=>{k(Date.now()),P(!0)},[]),l=s.useCallback(()=>{x.navigateToSectionWithId("contact")},[x]),t=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),I())},i=s.useMemo(()=>p?Le({seed:`${o||Date.now()}:${y}`,reduceMotion:g}):"",[y,p,o,g]);return s.useEffect(()=>{if(C){k(Date.now()),P(!0);return}P(!1)},[C]),h.jsxs("div",{ref:M,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${p?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":p?"Kontakt preview":y,"aria-pressed":p,onClick:I,onKeyDown:t,children:[h.jsxs("div",{className:`article-web-art-tile-cta-preview ${p?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[p&&h.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:i,sandbox:"allow-scripts"},`${o}-${y}`),h.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!p&&h.jsx("div",{className:`loader ${g?"loader-reduce-motion":""}`,"aria-hidden":!0,children:h.jsxs("div",{className:"loader-inner",children:[h.jsx("div",{className:"loader-line-wrap",children:h.jsx("div",{className:"loader-line"})}),h.jsx("div",{className:"loader-line-wrap",children:h.jsx("div",{className:"loader-line"})}),h.jsx("div",{className:"loader-line-wrap",children:h.jsx("div",{className:"loader-line"})}),h.jsx("div",{className:"loader-line-wrap",children:h.jsx("div",{className:"loader-line"})}),h.jsx("div",{className:"loader-line-wrap",children:h.jsx("div",{className:"loader-line"})})]})}),h.jsxs("div",{className:`article-web-art-tile-cta-content ${p?"article-web-art-tile-cta-content-hidden":""}`,children:[h.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:y}),h.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:m})]}),p&&h.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),l()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),l())},children:"Kontakt"})]})}function et({locked:y=!1}){const m=s.useRef(null),C=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),x=s.useRef(!1),M=s.useRef(0),p=s.useRef(null),P=s.useRef(null),o=s.useRef(1),k=s.useRef(null);return s.useEffect(()=>{const g=m.current;if(!g)return;const I=c=>{const w=Math.max(0,Math.min(1,c));return w*w*(3-2*w)},l=()=>{const c=g.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),w=[];for(const r of c){const b=r.getAnimations?r.getAnimations():[];for(const d of b)w.push(d)}return w},t=c=>{const w=Math.max(1,Math.min(5.2,Number(c)||1));o.current=w;const r=l();for(const b of r)b.playbackRate=w},i=()=>{x.current=!1,p.current=null,g.classList.remove("article-web-art-tile-goldfish-held"),P.current!=null&&cancelAnimationFrame(P.current),P.current=null;const c=o.current,w=360,r=performance.now();k.current!=null&&cancelAnimationFrame(k.current);const b=()=>{const d=(performance.now()-r)/w,v=I(d);t(c+(1-c)*v),d<1?k.current=requestAnimationFrame(b):k.current=null};k.current=requestAnimationFrame(b)},e=()=>{if(!x.current)return;const c=performance.now()-M.current,w=1.2+4*I(c/2400);t(w),P.current=requestAnimationFrame(e)},a=c=>{if(!C&&!(c.button!=null&&c.button!==0)){x.current=!0,M.current=performance.now(),p.current=c.pointerId,g.classList.add("article-web-art-tile-goldfish-held");try{g.setPointerCapture(c.pointerId)}catch{}k.current!=null&&(cancelAnimationFrame(k.current),k.current=null),P.current==null&&(P.current=requestAnimationFrame(e))}},u=()=>{i()},f=()=>{i()},n=()=>{i()};return g.addEventListener("pointerdown",a),g.addEventListener("pointerup",u),g.addEventListener("pointercancel",f),g.addEventListener("lostpointercapture",n),()=>{g.removeEventListener("pointerdown",a),g.removeEventListener("pointerup",u),g.removeEventListener("pointercancel",f),g.removeEventListener("lostpointercapture",n),i(),k.current!=null&&cancelAnimationFrame(k.current),k.current=null}},[C]),s.useEffect(()=>{const g=m.current;g&&g.classList.toggle("article-web-art-tile-goldfish-locked",y)},[y]),h.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:m,role:"img","aria-label":"Goldfish animation tile",children:[h.jsx("div",{className:"fish-stage",children:h.jsx("div",{className:"fish-wrapper",children:h.jsx("div",{className:"fish-container",children:h.jsxs("div",{className:"fish-parts",children:[h.jsx("div",{className:"fish-body front"}),h.jsx("div",{className:"fish-body back"}),h.jsx("div",{className:"fish-back-bottom-fin front"}),h.jsx("div",{className:"fish-back-bottom-fin back"}),h.jsx("div",{className:"fish-back-fin"}),h.jsx("div",{className:"fish-front-bottom-fin front"}),h.jsx("div",{className:"fish-front-bottom-fin back"}),h.jsx("div",{className:"fish-top-fin"})]})})})}),h.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function tt({locked:y=!1}){const m=s.useRef(null),C=s.useRef([]),x=s.useRef(0),M=s.useRef(0),p=Ee,P=s.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return s.useEffect(()=>{const o=m.current;if(!o)return;const k=C.current.filter(Boolean);if(!k.length)return;let g=!0,I=!1,l=null,t=null;const i=(d,v)=>{const R=(d-.5)*30;for(let S=0;S<k.length;S++){const N=k[S],_=S*18,j=S*8,T=(d-.5)*_,A=(v-.5)*j;N.style.transform=`translate3d(${T}px, ${A}px, 0) rotateY(${R}deg)`}},e=(d,v)=>{const R=Math.max(-.55,Math.min(.55,(d-.5)*1.1)),S=Math.max(-.35,Math.min(.35,(v-.5)*.7));i(.5+R,.5+S)},a=d=>{const v=o.getBoundingClientRect(),R=(d.clientX-v.left)/Math.max(1,v.width),S=(d.clientY-v.top)/Math.max(1,v.height);g=!0,M.current=performance.now()+650,e(Math.max(0,Math.min(1,R)),Math.max(0,Math.min(1,S)))},u=d=>{const v=o.getBoundingClientRect(),R=(d.clientX-v.left)/Math.max(1,v.width),S=(d.clientY-v.top)/Math.max(1,v.height);return{x:Math.max(0,Math.min(1,R)),y:Math.max(0,Math.min(1,S))}},f=d=>{if(d.pointerType==="mouse")return;I=!0,l=d.pointerId,g=!0,M.current=performance.now()+900;const v=u(d);e(v.x,v.y),!P&&t==null&&(t=requestAnimationFrame(b))},n=d=>{if(!I||l!=null&&d.pointerId!==l)return;g=!0,M.current=performance.now()+900;const v=u(d);e(v.x,v.y)},c=d=>{l!=null&&(d==null?void 0:d.pointerId)!=null&&d.pointerId!==l||(I=!1,l=null,g=!0,!P&&t==null&&(t=requestAnimationFrame(b)))},w=()=>{g=!0,!P&&t==null&&(t=requestAnimationFrame(b))},r=()=>{g=!0,!P&&t==null&&(t=requestAnimationFrame(b))},b=()=>{if(g){if(!P&&performance.now()>=M.current){x.current+=.008;const d=Math.sin(x.current)*.5+.5;e(d,.5)}t=requestAnimationFrame(b)}};return g=!y,o.addEventListener("mouseenter",w),o.addEventListener("mousemove",a),o.addEventListener("mouseleave",r),o.addEventListener("pointerdown",f),o.addEventListener("pointermove",n),o.addEventListener("pointerup",c),o.addEventListener("pointercancel",c),e(.5,.5),!P&&!y&&(t=requestAnimationFrame(b)),()=>{o.removeEventListener("mouseenter",w),o.removeEventListener("mousemove",a),o.removeEventListener("mouseleave",r),o.removeEventListener("pointerdown",f),o.removeEventListener("pointermove",n),o.removeEventListener("pointerup",c),o.removeEventListener("pointercancel",c),t!=null&&cancelAnimationFrame(t)}},[P]),h.jsxs("div",{ref:m,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[h.jsxs("div",{className:"patronus-card",children:[h.jsx("div",{className:"patronus-layer patronus-bg",ref:o=>{C.current[0]=o},children:h.jsx("img",{alt:"",src:p[0]})}),h.jsx("div",{className:"patronus-layer",ref:o=>{C.current[1]=o},children:h.jsx("img",{alt:"",src:p[1]})}),h.jsx("div",{className:"patronus-layer",ref:o=>{C.current[2]=o},children:h.jsx("img",{alt:"",src:p[2]})}),h.jsx("div",{className:"patronus-layer patronus-svg",ref:o=>{C.current[3]=o},dangerouslySetInnerHTML:{__html:ge}}),h.jsx("div",{className:"patronus-layer",ref:o=>{C.current[4]=o},children:h.jsx("img",{alt:"",src:p[3]})}),h.jsx("div",{className:"patronus-layer",ref:o=>{C.current[5]=o},children:h.jsx("img",{alt:"",src:p[4]})}),h.jsx("div",{className:"patronus-layer",ref:o=>{C.current[6]=o},children:h.jsx("img",{alt:"",src:p[5]})})]}),h.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{ct as default};
