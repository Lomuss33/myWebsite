const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/hourglassEngine-BZmflguM.js","assets/vendor-BUjjXRU6.js","assets/react-vendor-D1LkQUJD.js","assets/threeTunnelEngine-DluWj-Nj.js","assets/three-BYTi_f6D.js","assets/threePolygonDemo5Engine-C8j4d7sj.js","assets/prismFieldEngine-Dkw-H_-R.js","assets/soupShaderEngine-DOT8TiBo.js","assets/tardisWormholeEngine-BSErFcgT.js"])))=>i.map(i=>d[i]);
import{c as ye,g as fe,A as ae,_ as B}from"./index-CRCWeWxh.js";import{r as u,j as b}from"./react-vendor-D1LkQUJD.js";import"./swiper-BJPGAhIX.js";/* empty css              */import"./bootstrap-jfx39s8c.js";import"./vendor-BUjjXRU6.js";const Me=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`,Re=`function Mash(seed) {
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
`;function z(v,{timeoutMs:m=1200}={}){if(typeof window>"u")return v(),()=>{};if("requestIdleCallback"in window){const f=window.requestIdleCallback(()=>v(),{timeout:m});return()=>window.cancelIdleCallback(f)}const R=window.setTimeout(()=>v(),0);return()=>window.clearTimeout(R)}function ge(v){if(!v)return{width:1,height:1};const m=v.getBoundingClientRect(),R=Math.max(1,Math.round(m.width||v.clientWidth||1)),f=Math.max(1,Math.round(m.height||v.clientHeight||1));return{width:R,height:f}}function $(v,m,R=1){var w;const{width:f,height:g}=ge(v);(w=m==null?void 0:m.setSize)==null||w.call(m,f,g,R)}function ce(v,m,R="smooth"){if(typeof window>"u")return;const f=document.getElementById(v),g=document.getElementById(`scrollable-${m}`);if(!f||!g)return;const w=f.getBoundingClientRect(),P=g.getBoundingClientRect(),a=g.scrollTop+(w.top-P.top);g.scrollTo({top:Math.max(0,a),behavior:R})}const Ce=9,Pe=9,ke=10,Se=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],Ie=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function Ne(v=Ce,m=Pe,R=ke){const f=v*m,g=Math.max(1,Math.min(R,f-1)),w=new Set;for(;w.size<g;)w.add(Math.floor(Math.random()*f));const P=new Array(f).fill(0);for(let a=0;a<f;a++){if(w.has(a)){P[a]=-1;continue}const C=a%m,M=Math.floor(a/m);let S=0;for(let x=-1;x<=1;x++)for(let s=-1;s<=1;s++){if(s===0&&x===0)continue;const t=C+s,e=M+x;t<0||e<0||t>=m||e>=v||w.has(e*m+t)&&(S+=1)}P[a]=S}return{rows:v,cols:m,mineCount:g,mines:w,counts:P}}function Ee(v,m,R,f){const g=new Set(R),w=[v];for(;w.length>0;){const P=w.pop();if(P==null||g.has(P)||f.has(P)||m.mines.has(P)||(g.add(P),m.counts[P]!==0))continue;const a=P%m.cols,C=Math.floor(P/m.cols);for(let M=-1;M<=1;M++)for(let S=-1;S<=1;S++){if(S===0&&M===0)continue;const x=a+S,s=C+M;x<0||s<0||x>=m.cols||s>=m.rows||w.push(s*m.cols+x)}}return g}function le(v,m,R){const f=v.rows*v.cols-v.mineCount;if(m.size>=f)return!0;if(R.size!==v.mineCount)return!1;for(const g of v.mines)if(!R.has(g))return!1;return!0}function je(v){return`Web art ${String(v||"tile").toLowerCase()} tile loading`}function _e({seed:v,reduceMotion:m}){const R=JSON.stringify(Re.split("<\/script>").join("<\\/script>")),f=JSON.stringify(v);return`<!doctype html>
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
const moduleSource = ${R}
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
    seed: ${f}
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
</html>`}function ue(v){return Array.isArray(v)?v.map((m,R)=>{const f=m!=null&&m.tone?` article-web-art-intro-guide-fragment-${m.tone}`:"";return b.jsx("span",{className:`article-web-art-intro-guide-fragment${f}`,children:m==null?void 0:m.text},`${(m==null?void 0:m.text)||"fragment"}-${R}`)}):v}function ft({dataWrapper:v,id:m}){var ie;const R=ye(),f=fe(),g=`${v.uniqueId}-ambient-trace`,w=`${v.uniqueId}-ambient-hex`,P=`${v.uniqueId}-ambient-plop`,a=`${v.uniqueId}-ambient-julia`,C=`${v.uniqueId}-ambient-mines`,M=`${v.uniqueId}-ambient-rings`,S=`${v.uniqueId}-ambient-prism`,x=`${v.uniqueId}-ambient-rope`,s=`${v.uniqueId}-ambient-soup`,t=`${v.uniqueId}-ambient-tardis`,[e,n]=u.useState(null),[r,l]=u.useState(!0),o=u.useMemo(()=>v.orderedItems,[v.orderedItems]),i=u.useMemo(()=>{const N=[4,5,3,6,1,2,7,8,9,10,11,12],T=new Map(o.map(O=>[Number(O==null?void 0:O.id),O])),D=[];for(const O of N){const q=T.get(O);q&&D.push(q)}for(const O of o){if(!O)continue;const q=Number(O==null?void 0:O.id);N.includes(q)||D.push(O)}return D},[o]),d=u.useRef(null),[c,h]=u.useState(!1),p=u.useRef(new Set),y=u.useRef(new Map),[k,I]=u.useState(0),[E,j]=u.useState(-1),[_,L]=u.useState(()=>new Set),[A,H]=u.useState(()=>new Set),[V,Y]=u.useState(!1),G=u.useMemo(()=>{const N=i.map(T=>T==null?void 0:T.uniqueId).filter(Boolean);return N.push(g,w,P,a,C,S,M,x,s,t,"ambient-goldfish","ambient-patronus"),new Set(N)},[w,a,C,P,S,M,x,s,t,g,i]),X=u.useMemo(()=>Array.from(A).filter(N=>N!=="ambient-goldfish"&&N!=="ambient-patronus"),[A]),F=r,W=R.selectedLanguageId||"en";let J=R.getString("send_yours");typeof J=="string"&&J.startsWith("locale:")&&(J={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[W]||"Send yours!");let Z=R.getString("click");typeof Z=="string"&&Z.startsWith("locale:")&&(Z={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[W]||"Click");const te={en:{title:"Doors of the world behind an amazing art gallery.",guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",guide:{eyebrow:"So funktioniert es",lines:["Betritt die Galerie und schau dir die Karten in Ruhe an.","Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.","Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."]},button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",guide:{eyebrow:"Kako istraživati",lines:["Uđi u galeriju i istražuj kartice svojim tempom.","Klikni, dodirni ili pritisni karticu da otkriješ što skriva.","Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme."]},button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",guide:{eyebrow:"Nasıl gezilir",lines:["Galeriye girin ve kartları kendi temponuzda inceleyin.","İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.","Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir."]},button:"Gir",preparing:"Hazırlanıyor..."}}[W]||{guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter"},he="hide",K=u.useCallback(N=>{if(!N||p.current.has(N))return;p.current.add(N);const T=y.current.get(N);T!=null&&(window.clearTimeout(T),y.current.delete(N)),I(p.current.size)},[]),ne=u.useCallback(N=>{N&&H(T=>{if(T.has(N))return T;const D=new Set(T);return D.add(N),D})},[]),Q=u.useCallback(()=>{for(const N of y.current.values())window.clearTimeout(N);y.current=new Map,p.current=new Set,I(0),j(-1),h(!1),L(new Set),H(new Set),Y(!1)},[]),ee=u.useCallback(()=>{l(!1),h(!0),j(i.length-1),L(new Set),H(new Set),Y(!1)},[i.length]);u.useEffect(()=>{var oe;if(typeof window>"u"||((oe=f.targetSection)==null?void 0:oe.id)!==v.sectionId||f.transitionStatus!=="transition_status_none")return;const N=window.__pendingSectionAction;if(!N||N.action!=="enter"||N.sectionId!==v.sectionId||N.targetArticleId&&N.targetArticleId!==v.uniqueId)return;if(Date.now()-(N.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,ee();const T=N.targetArticleId||v.uniqueId;let D=null,O=null,q=null,U=null;return D=window.setTimeout(()=>{O=window.requestAnimationFrame(()=>{ce(T,v.sectionId),q=window.setTimeout(()=>{U=window.requestAnimationFrame(()=>{ce(T,v.sectionId)})},220)})},90),()=>{D!==null&&window.clearTimeout(D),O!==null&&window.cancelAnimationFrame(O),q!==null&&window.clearTimeout(q),U!==null&&window.cancelAnimationFrame(U)}},[v.uniqueId,v.sectionId,(ie=f.targetSection)==null?void 0:ie.id,f.transitionStatus,ee]);const re=u.useCallback(N=>{N&&(ne(N),L(T=>{if(T.has(N))return T;const D=new Set(T);return D.add(N),D}))},[ne]),se=u.useCallback(N=>{N&&(L(T=>{if(!T.has(N))return T;const D=new Set(T);return D.delete(N),D}),H(T=>{if(!T.has(N))return T;const D=new Set(T);return D.delete(N),D}))},[]),be=G.size>0&&_.size>=G.size,pe=u.useCallback(()=>{if(G.size>0&&_.size>=G.size){L(new Set),H(new Set),Y(!1);return}H(new Set(G)),L(new Set(G)),Y(!0)},[G,_.size]),me=u.useCallback(()=>{Q(),l(!0)},[Q]),we=(N,T)=>{const D=Number(N==null?void 0:N.id);return D===1?"Hover":D===2?"Wave":D===3?"3D":D===4?"Poly":D===5?"Click":D===6?"Orbit":D===7?"Spin":D===8?"Shape":D===9?"Hourglass":D===10?"Noice":D===11?"Distance":D===12?"Android":String(T+1)},xe=i.map((N,T)=>{if(!c)return b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${T+1} loading`},N.uniqueId);const D=N.uniqueId,O=_.has(D),q=A.has(D)||O;return b.jsx(de,{label:we(N,T),isOpen:O,onToggle:()=>{O?se(D):re(D)},shouldRender:q,children:q&&b.jsx(Te,{itemWrapper:N,index:T,locked:F||!O,activate:T<=E,onReady:K})},D)}),ve=c?[{key:"ambient-trace",tileId:g,label:"Trace",render:N=>b.jsx(Ye,{readyId:g,locked:F||!N,onReady:K})},{key:"ambient-hex",tileId:w,label:"Hex",render:N=>b.jsx(Ue,{readyId:w,locked:F||!N,onReady:K})},{key:"ambient-plop",tileId:P,label:"Plop",render:N=>b.jsx(Xe,{readyId:P,locked:F||!N,onReady:K})},{key:"ambient-julia",tileId:a,label:"Julia",render:N=>b.jsx(Je,{readyId:a,locked:F||!N,onReady:K})},{key:"ambient-mines",tileId:C,label:"Bomb",render:N=>b.jsx(Ze,{readyId:C,locked:F||!N,onReady:K})},{key:"ambient-rings",tileId:M,label:"Fall",render:N=>b.jsx(Qe,{readyId:M,locked:F||!N,onReady:K})},{key:"ambient-prism",tileId:S,label:"Prism",render:N=>b.jsx(We,{readyId:S,locked:F||!N,onReady:K})},{key:"ambient-rope",tileId:x,label:"Rope",render:N=>b.jsx(et,{readyId:x,locked:F||!N,onReady:K})},{key:"ambient-soup",tileId:s,label:"Soup",render:N=>b.jsx(tt,{readyId:s,locked:F||!N,onReady:K})},{key:"ambient-tardis",tileId:t,label:"Tardis",render:N=>b.jsx(nt,{readyId:t,locked:F||!N,onReady:K})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:N=>b.jsx(st,{locked:F||!N})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:N=>b.jsx(it,{locked:F||!N})}].map(({key:N,tileId:T,label:D,render:O})=>{const q=_.has(T),U=A.has(T)||q;return b.jsx(de,{label:D,isOpen:q,onToggle:()=>{q?se(T):re(T)},shouldRender:U,children:U&&O(q)},N)}):[b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return u.useEffect(()=>{Q()},[v.uniqueId,Q]),u.useEffect(()=>{c&&j(i.length-1)},[c,i.length]),u.useEffect(()=>{if(c)for(const N of X){if(!N||p.current.has(N)||y.current.has(N))continue;const T=window.setTimeout(()=>{K(N)},12e3);y.current.set(N,T)}},[c,X,K]),b.jsx(ae,{id:v.uniqueId,type:ae.Types.SPACING_DEFAULT,dataWrapper:v,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:n,children:b.jsxs("div",{className:"article-web-art-shell",children:[b.jsx(Le,{guide:te.guide,buttonLabel:r?te.button:he,hidden:!r,onEnter:r?ee:me,secondaryButtonLabel:r?null:"promaja",onSecondaryAction:r?null:pe,secondaryPressed:be}),b.jsx("div",{className:`article-web-art-stage ${r?"article-web-art-stage-preview":""}`,"aria-hidden":r,children:b.jsxs("div",{className:`article-web-art-items ${F?"article-web-art-items-locked":""}`,ref:d,"aria-busy":r,children:[c&&b.jsx(rt,{label:J,clickLabel:Z,previewRequested:V}),xe,ve]})})]})})}function Le({guide:v,buttonLabel:m,hidden:R,onEnter:f,secondaryButtonLabel:g=null,onSecondaryAction:w=null,secondaryPressed:P=!1}){const a=C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),f())};return b.jsx("div",{className:`article-web-art-intro-cover ${R?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:b.jsx("div",{className:"article-web-art-intro-cover-inner",children:b.jsx("div",{className:"article-web-art-intro-cover-actions",children:b.jsx("div",{className:`article-web-art-intro-guide ${R?"article-web-art-intro-guide-hidden":"article-web-art-intro-guide-open"}`,children:b.jsxs("div",{className:"article-web-art-intro-guide-inner",children:[b.jsxs("div",{className:"article-web-art-intro-guide-top-row",children:[b.jsxs("div",{className:"article-web-art-intro-guide-top-copy",children:[b.jsx("span",{className:"article-web-art-intro-guide-eyebrow",children:v.eyebrow}),b.jsx("p",{className:"article-web-art-intro-guide-line article-web-art-intro-guide-line-primary",children:ue(v.lines[0])})]}),b.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[g?b.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${P?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:w||void 0,"aria-pressed":P,"aria-label":g,children:g}):null,b.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:f,onKeyDown:a,"aria-label":m,children:m})]})]}),b.jsx("div",{className:"article-web-art-intro-guide-lines",children:v.lines.slice(1).map((C,M)=>b.jsx("p",{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${M+2}`,children:ue(C)},Array.isArray(C)?C.map(S=>S==null?void 0:S.text).join(""):C))})]})})})})})}function de({label:v,isOpen:m,onToggle:R,shouldRender:f=!0,children:g}){return b.jsxs("div",{className:`article-web-art-gated-tile ${m?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[f?g:b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":je(v)}),b.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),b.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${m?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:R,"aria-label":`${m?"Hide":"Show"} ${v}`,children:v})]})}function Te({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){return Number(v.id)===1?b.jsx(Fe,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g}):Number(v.id)===2?b.jsx(qe,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g}):Number(v.id)===3?b.jsx(Ke,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g}):Number(v.id)===4?b.jsx(Ve,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g}):Number(v.id)===6?b.jsx(Ge,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g}):Number(v.id)===7?b.jsx(Oe,{itemWrapper:v,locked:f,onReady:g}):Number(v.id)===8?b.jsx(He,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g}):Number(v.id)===9?b.jsx(Be,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g}):Number(v.id)===10?b.jsx(ze,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g}):Number(v.id)===11?b.jsx(De,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g}):Number(v.id)===12?b.jsx(Ae,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g}):b.jsx($e,{itemWrapper:v,index:m,activate:R,locked:f,onReady:g})}function De({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!1),M=u.useRef(!0),S=u.useRef(null),x=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=u.useMemo(()=>({seed:54013+(Number(v.id)||11)*7331,reduceMotion:x}),[v.id,x]);u.useEffect(()=>{if(!R)return;const e=w.current,n=P.current;if(!e||!n)return;let r=!1,l=null,o=null,i=null;const d=()=>{C.current||(C.current=!0,g==null||g(v.uniqueId))},c=z(async()=>{var h,p;try{const y=await B(()=>import("./distanceFieldEngine-Qtz8TZwr.js"),[]);if(r)return;l=y.createDistanceFieldEngine(n,s),a.current=l;const k=()=>$(e,l,Math.min(1.5,window.devicePixelRatio||1));k(),(h=l.renderStatic)==null||h.call(l),f||(p=l.start)==null||p.call(l),d(),o=new ResizeObserver(()=>{k()}),o.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(I=>{var E,j,_,L;for(const A of I){if(M.current=!!A.isIntersecting,f){(E=l.setHoverActive)==null||E.call(l,!1),(j=l.stop)==null||j.call(l);continue}M.current?(_=l.start)==null||_.call(l):(L=l.stop)==null||L.call(l)}},{threshold:.25}),i.observe(e))}catch{d()}},{timeoutMs:220});return()=>{var h;r=!0,c==null||c(),i==null||i.disconnect(),o==null||o.disconnect(),(h=l==null?void 0:l.destroy)==null||h.call(l),a.current=null}},[R,s,v.uniqueId,f,g]),u.useEffect(()=>{var n,r,l,o;const e=a.current;if(e){if(f){(n=e.setHoverActive)==null||n.call(e,!1),(r=e.clearPointer)==null||r.call(e),(l=e.stop)==null||l.call(e);return}M.current&&((o=e.start)==null||o.call(e))}},[f]);const t=e=>{const n=w.current;if(!n)return{x:.5,y:.5};const r=n.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(e.clientY-r.top)/Math.max(1,r.height)))}};return b.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${m+1}`,disabled:f,onPointerEnter:f?void 0:(()=>{var e,n,r,l;(n=(e=a.current)==null?void 0:e.setHoverActive)==null||n.call(e,!0),(l=(r=a.current)==null?void 0:r.start)==null||l.call(r)}),onPointerMove:f?void 0:(e=>{var r,l,o,i;const n=t(e);(l=(r=a.current)==null?void 0:r.setHoverActive)==null||l.call(r,!0),(i=(o=a.current)==null?void 0:o.setPointer)==null||i.call(o,n.x,n.y)}),onPointerLeave:f?void 0:(()=>{var e,n,r,l;S.current=null,(n=(e=a.current)==null?void 0:e.setHoverActive)==null||n.call(e,!1),(l=(r=a.current)==null?void 0:r.clearPointer)==null||l.call(r)}),onPointerDown:f?void 0:(e=>{var r,l,o,i,d,c;if(e.button!=null&&e.button!==0)return;S.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const n=t(e);(l=(r=a.current)==null?void 0:r.setHoverActive)==null||l.call(r,!0),(i=(o=a.current)==null?void 0:o.setPointer)==null||i.call(o,n.x,n.y),(c=(d=a.current)==null?void 0:d.boostPopulation)==null||c.call(d)}),onPointerUp:f?void 0:(e=>{S.current!=null&&e.pointerId!==S.current||(S.current=null)}),onPointerCancel:f?void 0:(()=>{var e,n,r,l;S.current=null,(n=(e=a.current)==null?void 0:e.setHoverActive)==null||n.call(e,!1),(l=(r=a.current)==null?void 0:r.clearPointer)==null||l.call(r)}),onFocus:f?void 0:(()=>{var e,n,r,l;(n=(e=a.current)==null?void 0:e.setHoverActive)==null||n.call(e,!0),(l=(r=a.current)==null?void 0:r.start)==null||l.call(r)}),onBlur:f?void 0:(()=>{var e,n,r,l;S.current=null,(n=(e=a.current)==null?void 0:e.setHoverActive)==null||n.call(e,!1),(l=(r=a.current)==null?void 0:r.clearPointer)==null||l.call(r)}),onKeyDown:f?void 0:(e=>{var n,r;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(r=(n=a.current)==null?void 0:n.boostPopulation)==null||r.call(n))}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function Ae({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!1),M=u.useRef(!0),S=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);u.useEffect(()=>{if(!R)return;const s=w.current,t=P.current;if(!s||!t)return;let e=!1,n=null,r=null,l=null;const o=()=>{C.current||(C.current=!0,g==null||g(v.uniqueId))},i=z(async()=>{var d,c;try{const h=await B(()=>import("./androidRobotEngine-CNxYykCI.js"),[]);if(e)return;n=h.createAndroidRobotEngine(t,{reduceMotion:S}),a.current=n;const p=()=>$(s,n,Math.min(1.5,window.devicePixelRatio||1));p(),(d=n.renderStatic)==null||d.call(n),f||(c=n.start)==null||c.call(n),o(),r=new ResizeObserver(()=>{p()}),r.observe(s),"IntersectionObserver"in window&&(l=new IntersectionObserver(y=>{var k,I,E;for(const j of y){if(M.current=!!j.isIntersecting,f){(k=n.stop)==null||k.call(n);continue}M.current?(I=n.start)==null||I.call(n):(E=n.stop)==null||E.call(n)}},{threshold:.2}),l.observe(s))}catch{o()}},{timeoutMs:220});return()=>{var d;e=!0,i==null||i(),l==null||l.disconnect(),r==null||r.disconnect(),(d=n==null?void 0:n.destroy)==null||d.call(n),a.current=null}},[R,v.uniqueId,f,g,S]),u.useEffect(()=>{var t,e,n;const s=a.current;if(s){if(f){(t=s.clearPointer)==null||t.call(s),(e=s.stop)==null||e.call(s);return}M.current&&((n=s.start)==null||n.call(s))}},[f]);const x=s=>{const t=w.current;if(!t)return{x:.5,y:.5};const e=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(s.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(s.clientY-e.top)/Math.max(1,e.height)))}};return b.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android","aria-label":`Android web art tile ${m+1}`,disabled:f,onPointerEnter:f?void 0:(()=>{var s,t;(t=(s=a.current)==null?void 0:s.start)==null||t.call(s)}),onPointerMove:f?void 0:(s=>{var e,n;const t=x(s);(n=(e=a.current)==null?void 0:e.setPointer)==null||n.call(e,t.x,t.y)}),onPointerLeave:f?void 0:(()=>{var s,t;(t=(s=a.current)==null?void 0:s.clearPointer)==null||t.call(s)}),onFocus:f?void 0:(()=>{var s,t;(t=(s=a.current)==null?void 0:s.start)==null||t.call(s)}),onBlur:f?void 0:(()=>{var s,t;(t=(s=a.current)==null?void 0:s.clearPointer)==null||t.call(s)}),onClick:f?void 0:(()=>{var s,t;(t=(s=a.current)==null?void 0:s.poke)==null||t.call(s)}),onKeyDown:f?void 0:(s=>{var t,e;(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),(e=(t=a.current)==null?void 0:t.poke)==null||e.call(t))}),children:[b.jsx("div",{className:"article-web-art-android-glow","aria-hidden":!0}),b.jsx("canvas",{ref:P,className:"article-web-art-android-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Android"})]})}function Oe({itemWrapper:v,locked:m,onReady:R}){const f=u.useRef(!1);u.useEffect(()=>{f.current||(f.current=!0,R==null||R(v.uniqueId))},[v.uniqueId,R]);const g=u.useMemo(()=>[{speed:-4,controlDuration:"0.0001s",controlTurn:"0turn",hoverMode:"stop"},{speed:-2,controlDuration:"0.0001s",controlTurn:"0turn",hoverMode:"pause"},{speed:.5,controlDuration:"10s",controlTurn:"-1turn",hoverMode:"control"},{speed:4,controlDuration:"1s",controlTurn:"4turn",hoverMode:"control"}],[]);return b.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${m?"article-web-art-spin-boxes-locked":""}`,children:b.jsx("div",{className:"article-web-art-spin-boxes-grid",children:g.map(({speed:w,controlDuration:P,controlTurn:a,hoverMode:C})=>b.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--control-duration":P,"--control-turn":a},children:b.jsx("div",{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${C}`,"data-speed":w})},String(w)))})})}function He({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!1),M=u.useRef(!0),S=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),x=u.useMemo(()=>({seed:1729+(Number(v.id)||8)*4242,reduceMotion:S,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[v.id,S]);u.useEffect(()=>{if(!R)return;const r=w.current,l=P.current;if(!r||!l)return;let o=!1,i=null,d=null,c=null;const h=()=>{C.current||(C.current=!0,g==null||g(v.uniqueId))},p=z(async()=>{var y,k,I;try{const E=await B(()=>import("./shapeFieldEngine-B_ToSidK.js"),[]);if(o)return;i=E.createShapeFieldEngine(l,x),a.current=i;const j=()=>$(r,i,window.devicePixelRatio||1);j(),(y=i.renderStatic)==null||y.call(i),(k=i.triggerWave)==null||k.call(i),f||(I=i.start)==null||I.call(i),h(),d=new ResizeObserver(()=>{var _;j(),(_=i.renderStatic)==null||_.call(i)}),d.observe(r),"IntersectionObserver"in window&&(c=new IntersectionObserver(_=>{var L,A,H;for(const V of _){if(M.current=!!V.isIntersecting,f){(L=i.stop)==null||L.call(i);continue}M.current?(A=i.start)==null||A.call(i):(H=i.stop)==null||H.call(i)}},{threshold:.2}),c.observe(r))}catch{h()}});return()=>{var y;o=!0,p==null||p(),c==null||c.disconnect(),d==null||d.disconnect(),(y=i==null?void 0:i.destroy)==null||y.call(i),a.current=null}},[R,x,v.uniqueId,f,g]),u.useEffect(()=>{var l,o,i;const r=a.current;if(r){if(f){(l=r.clearPointer)==null||l.call(r),(o=r.stop)==null||o.call(r);return}M.current&&((i=r.start)==null||i.call(r))}},[f]);const s=r=>{const l=P.current||w.current;if(!l)return{x:0,y:0};const o=l.getBoundingClientRect();return{x:r.clientX-o.left,y:r.clientY-o.top}},t=r=>{var o,i;const l=s(r);(i=(o=a.current)==null?void 0:o.setPointer)==null||i.call(o,l.x,l.y)},e=r=>{var o,i,d,c;const l=s(r);(i=(o=a.current)==null?void 0:o.setPointer)==null||i.call(o,l.x,l.y),(c=(d=a.current)==null?void 0:d.triggerWave)==null||c.call(d,l.x,l.y)},n=r=>{var l,o;r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),(o=(l=a.current)==null?void 0:l.triggerWave)==null||o.call(l))};return b.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${m+1}`,disabled:f,onPointerMove:f?void 0:t,onPointerDown:f?void 0:e,onPointerLeave:f?void 0:(()=>{var r,l;return(l=(r=a.current)==null?void 0:r.clearPointer)==null?void 0:l.call(r)}),onBlur:f?void 0:(()=>{var r,l;return(l=(r=a.current)==null?void 0:r.clearPointer)==null?void 0:l.call(r)}),onKeyDown:f?void 0:n,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function Be({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!1),M=u.useRef(!0),[S,x]=u.useState(1.1),[s,t]=u.useState(.03);u.useEffect(()=>{if(!R)return;const i=w.current,d=P.current;if(!i||!d)return;let c=!1,h=null,p=null,y=null;const k=()=>{C.current||(C.current=!0,g==null||g(v.uniqueId))},I=z(async()=>{var E,j,_;try{const L=await B(()=>import("./hourglassEngine-BZmflguM.js"),__vite__mapDeps([0,1,2]));if(c)return;h=L.createHourglassEngine(d),a.current=h;const A=(E=h.getState)==null?void 0:E.call(h);A&&(x(A.gravity),t(A.neckRatio));const H=()=>$(i,h,window.devicePixelRatio||1);H(),(j=h.renderStatic)==null||j.call(h),f||(_=h.start)==null||_.call(h),k(),p=new ResizeObserver(()=>{var V;H(),(V=h.renderStatic)==null||V.call(h)}),p.observe(i),"IntersectionObserver"in window&&(y=new IntersectionObserver(V=>{var Y,G,X;for(const F of V){if(M.current=!!F.isIntersecting,f){(Y=h.stop)==null||Y.call(h);continue}M.current?(G=h.start)==null||G.call(h):(X=h.stop)==null||X.call(h)}},{threshold:.2}),y.observe(i))}catch{k()}});return()=>{var E;c=!0,I==null||I(),y==null||y.disconnect(),p==null||p.disconnect(),(E=h==null?void 0:h.destroy)==null||E.call(h),a.current=null}},[R,v.uniqueId,f,g]),u.useEffect(()=>{var d,c;const i=a.current;if(i){if(f){(d=i.stop)==null||d.call(i);return}M.current&&((c=i.start)==null||c.call(i))}},[f]);const e=i=>{var d,c;i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),(c=(d=a.current)==null?void 0:d.flip)==null||c.call(d))},n=i=>{i.stopPropagation()},r=i=>{i.stopPropagation()},l=i=>{var c,h;const d=Number(i.target.value);x(d),(h=(c=a.current)==null?void 0:c.setGravity)==null||h.call(c,d)},o=i=>{var c,h,p,y;const d=Number(i.target.value);t(d),(h=(c=a.current)==null?void 0:c.setNeckRatio)==null||h.call(c,d),!f&&M.current&&((y=(p=a.current)==null?void 0:p.start)==null||y.call(p))};return b.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass",role:f?void 0:"button",tabIndex:f?-1:0,"aria-label":`Hourglass web art tile ${m+1}`,onClick:f?void 0:(()=>{var i,d;return(d=(i=a.current)==null?void 0:i.flip)==null?void 0:d.call(i)}),onKeyDown:f?void 0:e,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsxs("div",{className:"article-web-art-hourglass-controls",onClickCapture:r,onPointerDownCapture:r,onPointerUpCapture:r,onClick:n,onPointerDown:n,onPointerUp:n,onKeyDown:n,children:[b.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-left",children:[b.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Neck"}),b.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.01",max:"0.22",step:"0.001",value:s,onInput:o,onChange:o,disabled:f,"aria-label":"Hourglass neck size"})]}),b.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-right",children:[b.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Gravity"}),b.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.45",max:"2.8",step:"0.01",value:S,onInput:l,onChange:l,disabled:f,"aria-label":"Hourglass gravity"})]})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function ze({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!1),M=u.useRef(!0),S=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);u.useEffect(()=>{if(!R)return;const t=w.current,e=P.current;if(!t||!e)return;let n=!1,r=null,l=null,o=null;const i=()=>{C.current||(C.current=!0,g==null||g(v.uniqueId))},d=z(async()=>{var c,h;try{const p=await B(()=>import("./noiceShaderEngine-6wwfZdln.js"),[]);if(n)return;r=p.createNoiceShaderEngine(e,{reduceMotion:S}),a.current=r;const y=()=>$(t,r,Math.min(1.5,window.devicePixelRatio||1));y(),(c=r.renderStatic)==null||c.call(r),f||(h=r.start)==null||h.call(r),i(),l=new ResizeObserver(()=>{var k;y(),(k=r.renderStatic)==null||k.call(r)}),l.observe(t),"IntersectionObserver"in window&&(o=new IntersectionObserver(k=>{var I,E,j;for(const _ of k){if(M.current=!!_.isIntersecting,f){(I=r.stop)==null||I.call(r);continue}M.current?(E=r.start)==null||E.call(r):(j=r.stop)==null||j.call(r)}},{threshold:.25}),o.observe(t))}catch{i()}},{timeoutMs:220});return()=>{var c;n=!0,d==null||d(),o==null||o.disconnect(),l==null||l.disconnect(),(c=r==null?void 0:r.destroy)==null||c.call(r),a.current=null}},[R,v.uniqueId,f,g,S]),u.useEffect(()=>{var e,n,r;const t=a.current;if(t){if(f){(e=t.clearPointer)==null||e.call(t),(n=t.stop)==null||n.call(t);return}M.current&&((r=t.start)==null||r.call(t))}},[f]);const x=t=>{const e=P.current||w.current;if(!e)return{x:.5,y:.5};const n=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(t.clientY-n.top)/Math.max(1,n.height)))}},s=t=>{var n,r,l,o,i,d;const e=x(t);(r=(n=a.current)==null?void 0:n.setPointer)==null||r.call(n,e.x,e.y),(o=(l=a.current)==null?void 0:l.pulsePattern)==null||o.call(l),(d=(i=a.current)==null?void 0:i.start)==null||d.call(i)};return b.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice","aria-label":`Noice web art tile ${m+1}`,disabled:f,onPointerMove:f?void 0:(t=>{var n,r;const e=x(t);(r=(n=a.current)==null?void 0:n.setPointer)==null||r.call(n,e.x,e.y)}),onPointerDown:f?void 0:(t=>{t.button!=null&&t.button!==0||s(t)}),onMouseLeave:f?void 0:(()=>{var t,e;(e=(t=a.current)==null?void 0:t.clearPointer)==null||e.call(t)}),onBlur:f?void 0:(()=>{var t,e;(e=(t=a.current)==null?void 0:t.clearPointer)==null||e.call(t)}),onKeyDown:f?void 0:(t=>{var e,n,r,l;(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),(n=(e=a.current)==null?void 0:e.pulsePattern)==null||n.call(e),(l=(r=a.current)==null?void 0:r.start)==null||l.call(r))}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function $e({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!0),M=u.useRef(!0),S=u.useRef(!1),x=Number(v==null?void 0:v.id)===5,s=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=u.useMemo(()=>{const o=Number(v.id)||m+1,i=.0026+o*8e-5,d=.0054+o*14e-5,c=o%2?1:2,h={kx:11+o*2,ky:o%2};return{refreshDelay:x?0:8e3,radiusMini:i,radiusMaxi:d,dHueStep:c,startGroup:h,seed:1337+o*1009,reduceMotion:s}},[x,v.id,m,s]);u.useEffect(()=>{if(!R)return;const o=w.current,i=P.current;if(!o||!i)return;let d=!1,c=null,h=null,p=null;const y=()=>{S.current||(S.current=!0,g==null||g(v.uniqueId))},k=z(async()=>{var I,E;try{const j=await B(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(d)return;c=j.createEmbroideryEngine(i,t),a.current=c;const _=()=>$(o,c,window.devicePixelRatio||1);_(),(I=c.renderStatic)==null||I.call(c),M.current&&((E=c.start)==null||E.call(c)),y(),h=new ResizeObserver(()=>{var L;_(),(L=c.renderStatic)==null||L.call(c)}),h.observe(o),"IntersectionObserver"in window&&(p=new IntersectionObserver(L=>{for(const A of L){if(M.current=!!A.isIntersecting,x){M.current||c.stop();continue}M.current&&C.current?c.start():c.stop()}},{threshold:.25}),p.observe(o))}catch{y()}});return()=>{d=!0,k==null||k(),p==null||p.disconnect(),h==null||h.disconnect(),c==null||c.destroy(),a.current=null}},[R,t,v.uniqueId,g]),u.useEffect(()=>{var i,d;const o=a.current;if(o){if(f){(i=o.stop)==null||i.call(o);return}M.current&&((d=o.start)==null||d.call(o))}},[f]),u.useEffect(()=>{var i,d;const o=a.current;if(o){if(f){(i=o.stop)==null||i.call(o);return}M.current&&((d=o.start)==null||d.call(o))}},[f]);const e=()=>{var o;C.current=!0,M.current&&((o=a.current)==null||o.start())},n=()=>{var o,i,d,c;C.current=!0,M.current?(i=(o=a.current)==null?void 0:o.start)==null||i.call(o):(c=(d=a.current)==null?void 0:d.stop)==null||c.call(d)},r=()=>{var o,i,d,c,h,p,y,k,I,E;if(x){(i=(o=a.current)==null?void 0:o.stop)==null||i.call(o),(c=(d=a.current)==null?void 0:d.reset)==null||c.call(d),(p=(h=a.current)==null?void 0:h.start)==null||p.call(h);return}(y=a.current)==null||y.reset(),(I=(k=a.current)==null?void 0:k.renderStatic)==null||I.call(k),M.current&&((E=a.current)==null||E.start())},l=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),r())};return b.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${m+1}`,disabled:f,onClick:f?void 0:r,onMouseEnter:f||x?void 0:e,onMouseLeave:f||x?void 0:n,onFocus:f||x?void 0:e,onBlur:f||x?void 0:n,onKeyDown:f?void 0:l,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:x?"Click":Number.isFinite(Number(v==null?void 0:v.id))?Number(v.id):m+1})]})}function Fe({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!1),M=u.useRef(null),S=u.useRef(!1),x=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=u.useMemo(()=>({seed:9001+(Number(v.id)||1)*1337,reduceMotion:x,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[v.id,x]);u.useEffect(()=>{if(!R)return;const c=w.current,h=P.current;if(!c||!h)return;let p=!1,y=null,k=null;const I=()=>{C.current||(C.current=!0,g==null||g(v.uniqueId))},E=z(async()=>{var j,_;try{const L=await B(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(p)return;y=L.createSpiralDotsEngine(h,s),a.current=y;const A=()=>$(c,y,window.devicePixelRatio||1);A(),(j=y.renderStatic)==null||j.call(y),(_=y.start)==null||_.call(y),I(),k=new ResizeObserver(()=>{var H;A(),y.rebuildDots(),(H=y.renderStatic)==null||H.call(y)}),k.observe(c)}catch{I()}});return()=>{p=!0,E==null||E(),k==null||k.disconnect(),y==null||y.destroy(),a.current=null}},[R,s,v.uniqueId,g]),u.useEffect(()=>{var h,p,y;const c=a.current;if(c){if(f){(h=c.clearMouse)==null||h.call(c),(p=c.stop)==null||p.call(c);return}(y=c.start)==null||y.call(c)}},[f]);const t=c=>{const h=P.current||w.current;if(!h)return{x:-1e4,y:-1e4};const p=h.getBoundingClientRect();return{x:c.clientX-p.left,y:c.clientY-p.top}},e=()=>{var c;(c=a.current)==null||c.start()},n=()=>{var c,h;(c=a.current)==null||c.clearMouse(),(h=a.current)==null||h.start()},r=()=>{e()},l=()=>{n()},o=c=>{var p;const h=t(c);(p=a.current)==null||p.setMouse(h.x,h.y)},i=()=>{e()},d=()=>{n()};return b.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:f?-1:0,"aria-label":`Spiral dots web art tile ${m+1}`,onPointerDown:f?void 0:c=>{var y;if(c.pointerType==="mouse")return;const h=w.current;if(!h)return;S.current=!0,M.current=c.pointerId;try{h.setPointerCapture(c.pointerId)}catch{}e();const p=t(c);(y=a.current)==null||y.setMouse(p.x,p.y)},onPointerMove:f?void 0:c=>{var p;if(!S.current||M.current!=null&&c.pointerId!==M.current)return;const h=t(c);(p=a.current)==null||p.setMouse(h.x,h.y)},onPointerUp:f?void 0:c=>{M.current!=null&&c.pointerId!==M.current||(S.current=!1,M.current=null,n())},onPointerCancel:f?void 0:()=>{S.current=!1,M.current=null,n()},onMouseEnter:f?void 0:r,onMouseLeave:f?void 0:l,onMouseMove:f?void 0:o,onFocus:f?void 0:i,onBlur:f?void 0:d,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function qe({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!0),M=u.useRef(!0),S=u.useRef(!1),x=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=u.useMemo(()=>({seed:424242+(Number(v.id)||2)*2027,reduceMotion:x,targetCellSize:14,gapPx:1.4}),[v.id,x]);u.useEffect(()=>{if(!R)return;const o=w.current,i=P.current;if(!o||!i)return;let d=!1,c=null,h=null,p=null;const y=()=>{S.current||(S.current=!0,g==null||g(v.uniqueId))},k=z(async()=>{var I,E;try{const j=await B(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(d)return;c=j.createGridWaveEngine(i,s),a.current=c;const _=()=>$(o,c,window.devicePixelRatio||1);_(),(I=c.renderStatic)==null||I.call(c),M.current&&((E=c.start)==null||E.call(c)),y(),h=new ResizeObserver(()=>{var L;_(),(L=c.renderStatic)==null||L.call(c)}),h.observe(o),"IntersectionObserver"in window&&(p=new IntersectionObserver(L=>{for(const A of L)M.current=!!A.isIntersecting,M.current&&C.current?c.start():c.stop()},{threshold:.25}),p.observe(o))}catch{y()}});return()=>{d=!0,k==null||k(),p==null||p.disconnect(),h==null||h.disconnect(),c==null||c.destroy(),a.current=null}},[R,s,v.uniqueId,g]);const t=()=>{var o;C.current=!0,M.current&&((o=a.current)==null||o.start())},e=()=>{var o,i,d,c;C.current=!0,M.current?(i=(o=a.current)==null?void 0:o.start)==null||i.call(o):(c=(d=a.current)==null?void 0:d.stop)==null||c.call(d)},n=o=>{const i=P.current||w.current;if(!i)return{x:0,y:0};const d=i.getBoundingClientRect();return typeof(o==null?void 0:o.clientX)!="number"||typeof(o==null?void 0:o.clientY)!="number"?{x:d.width/2,y:d.height/2}:{x:o.clientX-d.left,y:o.clientY-d.top}},r=o=>{var d,c,h,p;const i=n(o);(d=a.current)==null||d.rippleAt(i.x,i.y),(h=(c=a.current)==null?void 0:c.renderStatic)==null||h.call(c),C.current&&M.current&&((p=a.current)==null||p.start())},l=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),r(null))};return b.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${m+1}`,disabled:f,onClick:f?void 0:r,onMouseEnter:f?void 0:t,onMouseLeave:f?void 0:e,onFocus:f?void 0:t,onBlur:f?void 0:e,onKeyDown:f?void 0:l,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function Ke({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!0),M=u.useRef(!0),S=u.useRef(!1),x=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=u.useMemo(()=>({reduceMotion:x,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[x]);u.useEffect(()=>{if(!R)return;const l=w.current,o=P.current;if(!l||!o)return;let i=!1,d=null,c=null,h=null,p=null;const y=()=>{S.current||(S.current=!0,g==null||g(v.uniqueId))},k=async()=>{var L;const E=await B(()=>import("./threeTunnelEngine-DluWj-Nj.js"),__vite__mapDeps([3,4]));if(i)return;d=E.createThreeTunnelEngine(o,s),a.current=d;const j=()=>$(l,d,Math.min(1.5,window.devicePixelRatio||1));return j(),d.reset(),M.current&&((L=d.start)==null||L.call(d)),y(),c=new ResizeObserver(()=>{j(),d.reset()}),c.observe(l),"IntersectionObserver"in window&&(h=new IntersectionObserver(A=>{for(const H of A)M.current=!!H.isIntersecting,M.current&&C.current?d.start():d.stop()},{threshold:.25}),h.observe(l)),()=>{h==null||h.disconnect(),c==null||c.disconnect(),d.destroy(),a.current=null}};let I=null;return p=z(()=>{k().then(E=>{I=E||null}).catch(()=>{y()})},{timeoutMs:300}),()=>{i=!0,p==null||p(),I==null||I()}},[R,s,v.uniqueId,g]),u.useEffect(()=>{var o,i,d;const l=a.current;if(l){if(f){(o=l.setHeld)==null||o.call(l,!1),(i=l.stop)==null||i.call(l);return}M.current&&((d=l.start)==null||d.call(l))}},[f]);const t=()=>{var l;C.current=!0,M.current&&((l=a.current)==null||l.start())},e=()=>{var l,o,i,d;C.current=!0,M.current?(o=(l=a.current)==null?void 0:l.start)==null||o.call(l):(d=(i=a.current)==null?void 0:i.stop)==null||d.call(i)},n=()=>{var l,o,i,d;(o=(l=a.current)==null?void 0:l.nextPalette)==null||o.call(l),(i=a.current)==null||i.reset(),M.current&&((d=a.current)==null||d.start())},r=l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),n())};return b.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${m+1}`,disabled:f,onClick:f?void 0:n,onMouseEnter:f?void 0:t,onMouseLeave:f?void 0:e,onFocus:f?void 0:t,onBlur:f?void 0:e,onKeyDown:f?void 0:r,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),b.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Ve({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!0),M=u.useRef(!0),S=u.useRef(!1),x=u.useRef(null),s=u.useRef(null),t=u.useRef(!1),e=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=u.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,f]);u.useEffect(()=>{if(!R)return;const o=w.current,i=P.current;if(!o||!i)return;let d=!1,c=null,h=null;const p=()=>{S.current||(S.current=!0,g==null||g(v.uniqueId))},y=async()=>{var L;const k=await B(()=>import("./threePolygonDemo5Engine-C8j4d7sj.js"),__vite__mapDeps([5,4]));if(d)return;const I=k.createThreePolygonDemo5Engine(i,n);a.current=I;const E=()=>$(o,I,Math.min(1.2,window.devicePixelRatio||1));E(),I.reset(),window.requestAnimationFrame(()=>{d||a.current!==I||(E(),I.reset())}),M.current&&((L=I.start)==null||L.call(I)),p();const j=new ResizeObserver(()=>{E()});j.observe(o);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(A=>{for(const H of A)M.current=!!H.isIntersecting,M.current&&C.current?I.start():I.stop()},{threshold:.25}),_.observe(o)),c=()=>{_==null||_.disconnect(),j.disconnect(),I.destroy(),a.current=null}};return h=z(()=>{y().catch(()=>{p()})},{timeoutMs:300}),()=>{d=!0,h==null||h(),s.current!=null&&window.clearTimeout(s.current),c==null||c()}},[R,n,v.uniqueId,g]);const r=()=>{var o,i,d;(i=(o=a.current)==null?void 0:o.boost)==null||i.call(o),M.current&&((d=a.current)==null||d.start())},l=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),r())};return b.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${m+1}`,disabled:f,onKeyDown:f?void 0:l,onPointerDown:f?void 0:o=>{var i;if(!(o.button!=null&&o.button!==0)){x.current=o.pointerId,t.current=!1;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}M.current&&((i=a.current)==null||i.start()),s.current!=null&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{var d,c;x.current!=null&&(t.current=!0,(c=(d=a.current)==null?void 0:d.setHeld)==null||c.call(d,!0))},140)}},onPointerUp:f?void 0:o=>{var i,d;x.current!=null&&o.pointerId!==x.current||(s.current!=null&&(window.clearTimeout(s.current),s.current=null),x.current=null,t.current?(t.current=!1,(d=(i=a.current)==null?void 0:i.setHeld)==null||d.call(i,!1)):r())},onPointerCancel:f?void 0:(()=>{var o,i;s.current!=null&&(window.clearTimeout(s.current),s.current=null),x.current=null,t.current=!1,(i=(o=a.current)==null?void 0:o.setHeld)==null||i.call(o,!1)}),onLostPointerCapture:f?void 0:(()=>{var o,i;s.current!=null&&(window.clearTimeout(s.current),s.current=null),x.current=null,t.current=!1,(i=(o=a.current)==null?void 0:o.setHeld)==null||i.call(o,!1)}),onMouseEnter:f?void 0:(()=>{var o;C.current=!0,M.current&&((o=a.current)==null||o.start())}),onMouseLeave:f?void 0:(()=>{var o,i,d,c;s.current!=null&&(window.clearTimeout(s.current),s.current=null),x.current=null,t.current=!1,(i=(o=a.current)==null?void 0:o.setHeld)==null||i.call(o,!1),C.current=!0,M.current?(d=a.current)==null||d.start():(c=a.current)==null||c.stop()}),onFocus:f?void 0:(()=>{var o;C.current=!0,M.current&&((o=a.current)==null||o.start())}),onBlur:f?void 0:(()=>{var o,i,d,c;s.current!=null&&(window.clearTimeout(s.current),s.current=null),x.current=null,t.current=!1,(i=(o=a.current)==null?void 0:o.setHeld)==null||i.call(o,!1),C.current=!0,M.current?(d=a.current)==null||d.start():(c=a.current)==null||c.stop()}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function Ge({itemWrapper:v,index:m,activate:R,locked:f,onReady:g}){const w=u.useRef(null),P=u.useRef(null),a=u.useRef(null),C=u.useRef(!0),M=u.useRef(!0),S=u.useRef(!1),x=u.useRef(0),s=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=u.useMemo(()=>({reduceMotion:s,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[s]);u.useEffect(()=>{if(!R)return;const o=w.current,i=P.current;if(!o||!i)return;let d=!1,c=null,h=null,p=null;const y=()=>{S.current||(S.current=!0,g==null||g(v.uniqueId))},k=z(async()=>{var I,E;try{const j=await B(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(d)return;c=j.createOrbitCirclesEngine(i,t),a.current=c;const _=()=>$(o,c,window.devicePixelRatio||1);_(),c.reset(),(I=c.renderStatic)==null||I.call(c),M.current&&((E=c.start)==null||E.call(c)),y(),h=new ResizeObserver(()=>{var L;_(),(L=c.renderStatic)==null||L.call(c)}),h.observe(o),"IntersectionObserver"in window&&(p=new IntersectionObserver(L=>{for(const A of L)M.current=!!A.isIntersecting,M.current&&C.current?c.start():c.stop()},{threshold:.25}),p.observe(o))}catch{y()}});return()=>{d=!0,k==null||k(),p==null||p.disconnect(),h==null||h.disconnect(),c==null||c.destroy(),a.current=null}},[R,t,v.uniqueId,g]),u.useEffect(()=>{var i,d;const o=a.current;if(o){if(f){(i=o.stop)==null||i.call(o);return}M.current&&((d=o.start)==null||d.call(o))}},[f]);const e=()=>{var o;C.current=!0,M.current&&((o=a.current)==null||o.start())},n=()=>{var o,i,d,c;C.current=!0,M.current?(i=(o=a.current)==null?void 0:o.start)==null||i.call(o):(c=(d=a.current)==null?void 0:d.stop)==null||c.call(d)},r=()=>{var h,p,y;const o=a.current;if(!o)return;const i=Math.max(1,((h=o.getTotalCircles)==null?void 0:h.call(o))||1),d=x.current%i,c=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`;(p=o.setCircleColor)==null||p.call(o,d,c),x.current+=1,M.current&&((y=o.start)==null||y.call(o))},l=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),r())};return b.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${m+1}`,disabled:f,onClick:f?void 0:r,onMouseEnter:f?void 0:e,onMouseLeave:f?void 0:n,onFocus:f?void 0:e,onBlur:f?void 0:n,onKeyDown:f?void 0:l,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function Ye({readyId:v,locked:m,onReady:R}){const f=u.useRef(null),g=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),a=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=u.useMemo(()=>({seed:20250414,reduceMotion:a,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[a]);u.useEffect(()=>{const x=f.current,s=g.current;if(!x||!s)return;let t=!1,e=null,n=null,r=null;const l=()=>{P.current||(P.current=!0,R==null||R(v))},o=z(async()=>{var i,d;try{const c=await B(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(t)return;e=c.createTortuosityTraceEngine(s,C),w.current=e;const h=()=>$(x,e,Math.min(1.5,window.devicePixelRatio||1));h(),(i=e.renderStatic)==null||i.call(e),(d=e.start)==null||d.call(e),l(),n=new ResizeObserver(()=>{var p;h(),(p=e.reset)==null||p.call(e)}),n.observe(x),"IntersectionObserver"in window&&(r=new IntersectionObserver(p=>{var y,k;for(const I of p)I.isIntersecting?(y=e.start)==null||y.call(e):(k=e.stop)==null||k.call(e)},{threshold:.25}),r.observe(x))}catch{l()}},{timeoutMs:200});return()=>{var i;t=!0,o==null||o(),r==null||r.disconnect(),n==null||n.disconnect(),(i=e==null?void 0:e.destroy)==null||i.call(e),w.current=null}},[C,R,v]),u.useEffect(()=>{var s,t,e;const x=w.current;if(x){if(m){(s=x.setHeld)==null||s.call(x,!1),(t=x.stop)==null||t.call(x);return}(e=x.start)==null||e.call(x)}},[m]),u.useEffect(()=>{var s,t;const x=w.current;if(x){if(m){(s=x.stop)==null||s.call(x);return}(t=x.start)==null||t.call(x)}},[m]);const M=()=>{var x,s,t,e;(s=(x=w.current)==null?void 0:x.reset)==null||s.call(x),(e=(t=w.current)==null?void 0:t.start)==null||e.call(t)},S=x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),M())};return b.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:m,onClick:m?void 0:M,onKeyDown:m?void 0:S,children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function Ue({readyId:v,locked:m,onReady:R}){const f=u.useRef(null),g=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),a=u.useRef(null),C=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=u.useMemo(()=>({seed:20250415,reduceMotion:C,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[C]);u.useEffect(()=>{const t=f.current,e=g.current;if(!t||!e)return;let n=!1,r=null,l=null,o=null;const i=()=>{P.current||(P.current=!0,R==null||R(v))},d=z(async()=>{var c,h;try{const p=await B(()=>import("./hexFlowBallsEngine-Bzfny-m0.js"),[]);if(n)return;r=p.createHexFlowBallsEngine(e,M),w.current=r;const y=()=>$(t,r,Math.min(1.5,window.devicePixelRatio||1));y(),(c=r.renderStatic)==null||c.call(r),(h=r.start)==null||h.call(r),i(),l=new ResizeObserver(()=>{var k;y(),(k=r.renderStatic)==null||k.call(r)}),l.observe(t),"IntersectionObserver"in window&&(o=new IntersectionObserver(k=>{var I,E;for(const j of k)j.isIntersecting?(I=r.start)==null||I.call(r):(E=r.stop)==null||E.call(r)},{threshold:.25}),o.observe(t))}catch{i()}},{timeoutMs:220});return()=>{var c;n=!0,d==null||d(),o==null||o.disconnect(),l==null||l.disconnect(),(c=r==null?void 0:r.destroy)==null||c.call(r),w.current=null}},[M,R,v]),u.useEffect(()=>{var e,n,r;const t=w.current;if(t){if(m){(e=t.clearPointer)==null||e.call(t),(n=t.stop)==null||n.call(t);return}(r=t.start)==null||r.call(t)}},[m]);const S=t=>{const e=f.current;if(!e)return{x:.5,y:.5};const n=e.getBoundingClientRect();return{x:n.width>0?(t.clientX-n.left)/n.width:.5,y:n.height>0?(t.clientY-n.top)/n.height:.5}},x=()=>{var t,e,n,r;(e=(t=w.current)==null?void 0:t.burst)==null||e.call(t),(r=(n=w.current)==null?void 0:n.start)==null||r.call(n)},s=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),x())};return b.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:m,onClick:m?void 0:x,onPointerDown:m?void 0:(t=>{var n,r;a.current=t.pointerId;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const e=S(t);(r=(n=w.current)==null?void 0:n.setPointer)==null||r.call(n,e.x,e.y)}),onPointerMove:m?void 0:(t=>{var n,r;if(a.current!=null&&t.pointerId!==a.current)return;const e=S(t);(r=(n=w.current)==null?void 0:n.setPointer)==null||r.call(n,e.x,e.y)}),onPointerUp:m?void 0:(t=>{a.current!=null&&t.pointerId!==a.current||(a.current=null)}),onPointerCancel:m?void 0:(()=>{var t,e;a.current=null,(e=(t=w.current)==null?void 0:t.clearPointer)==null||e.call(t)}),onMouseMove:m?void 0:(t=>{var n,r;const e=S(t);(r=(n=w.current)==null?void 0:n.setPointer)==null||r.call(n,e.x,e.y)}),onMouseLeave:m?void 0:(()=>{var t,e;a.current=null,(e=(t=w.current)==null?void 0:t.clearPointer)==null||e.call(t)}),onBlur:m?void 0:(()=>{var t,e;a.current=null,(e=(t=w.current)==null?void 0:t.clearPointer)==null||e.call(t)}),onKeyDown:m?void 0:s,children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function Xe({readyId:v,locked:m,onReady:R}){const f=u.useRef(null),g=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),a=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=u.useMemo(()=>({seed:20250416,reduceMotion:a,step:6,side:5}),[a]);u.useEffect(()=>{const s=f.current,t=g.current;if(!s||!t)return;let e=!1,n=null,r=null,l=null;const o=()=>{P.current||(P.current=!0,R==null||R(v))},i=z(async()=>{var d,c;try{const h=await B(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;n=h.createPixelPlopEngine(t,C),w.current=n;const p=()=>$(s,n,Math.min(1.5,window.devicePixelRatio||1));p(),(d=n.renderStatic)==null||d.call(n),(c=n.start)==null||c.call(n),o(),r=new ResizeObserver(()=>{var y;p(),(y=n.reset)==null||y.call(n)}),r.observe(s),"IntersectionObserver"in window&&(l=new IntersectionObserver(y=>{var k,I;for(const E of y)E.isIntersecting?(k=n.start)==null||k.call(n):(I=n.stop)==null||I.call(n)},{threshold:.25}),l.observe(s))}catch{o()}},{timeoutMs:220});return()=>{var d;e=!0,i==null||i(),l==null||l.disconnect(),r==null||r.disconnect(),(d=n==null?void 0:n.destroy)==null||d.call(n),w.current=null}},[C,R,v]),u.useEffect(()=>{var t,e,n;const s=w.current;if(s){if(m){(t=s.clearPointer)==null||t.call(s),(e=s.stop)==null||e.call(s);return}(n=s.start)==null||n.call(s)}},[m]),u.useEffect(()=>{var t,e;const s=w.current;if(s){if(m){(t=s.stop)==null||t.call(s);return}(e=s.start)==null||e.call(s)}},[m]);const M=()=>{var s,t,e,n;(t=(s=w.current)==null?void 0:s.seedBurst)==null||t.call(s),(n=(e=w.current)==null?void 0:e.start)==null||n.call(e)},S=s=>{var n,r,l,o;const t=g.current||f.current;if(!t||typeof(s==null?void 0:s.clientX)!="number"||typeof(s==null?void 0:s.clientY)!="number"){M();return}const e=t.getBoundingClientRect();(r=(n=w.current)==null?void 0:n.burstAt)==null||r.call(n,s.clientX-e.left,s.clientY-e.top),(o=(l=w.current)==null?void 0:l.start)==null||o.call(l)},x=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),M())};return b.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:m,onPointerDown:m?void 0:(s=>{s.button!=null&&s.button!==0||S(s)}),onKeyDown:m?void 0:x,children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function Je({readyId:v,locked:m,onReady:R}){const f=u.useRef(null),g=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),a=u.useRef(null),C=u.useRef(!1),M=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),S=u.useMemo(()=>({reduceMotion:M,seed:20250417}),[M]);u.useEffect(()=>{const e=f.current,n=g.current;if(!e||!n)return;let r=!1,l=null,o=null,i=null;const d=()=>{P.current||(P.current=!0,R==null||R(v))},c=z(async()=>{var h,p;try{const y=await B(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(r)return;l=y.createJuliaLinesEngine(n,S),w.current=l;const k=()=>$(e,l,Math.min(1.5,window.devicePixelRatio||1));k(),(h=l.renderStatic)==null||h.call(l),(p=l.start)==null||p.call(l),d(),o=new ResizeObserver(()=>{k()}),o.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(I=>{var E,j;for(const _ of I)_.isIntersecting?(E=l.start)==null||E.call(l):(j=l.stop)==null||j.call(l)},{threshold:.25}),i.observe(e))}catch{d()}},{timeoutMs:220});return()=>{var h;r=!0,c==null||c(),i==null||i.disconnect(),o==null||o.disconnect(),(h=l==null?void 0:l.destroy)==null||h.call(l),w.current=null}},[S,R,v]),u.useEffect(()=>{var n,r,l,o;const e=w.current;if(e){if(m){(n=e.setHeld)==null||n.call(e,!1),(r=e.clearPointer)==null||r.call(e),(l=e.stop)==null||l.call(e);return}(o=e.start)==null||o.call(e)}},[m]),u.useEffect(()=>{var n,r,l;const e=w.current;if(e){if(m){(n=e.clearPointer)==null||n.call(e),(r=e.stop)==null||r.call(e);return}(l=e.start)==null||l.call(e)}},[m]);const x=e=>{const n=f.current;if(!n)return{x:.4,y:.5};const r=n.getBoundingClientRect(),l=(e.clientX-r.left)/Math.max(1,r.width),o=(e.clientY-r.top)/Math.max(1,r.height);return{x:Math.max(0,Math.min(1,l)),y:Math.max(0,Math.min(1,o))}},s=()=>{var e,n,r,l;(n=(e=w.current)==null?void 0:e.reset)==null||n.call(e),(l=(r=w.current)==null?void 0:r.start)==null||l.call(r)},t=e=>{var r,l,o,i,d,c,h,p;const n=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(l=(r=w.current)==null?void 0:r.nudge)==null||l.call(r,0,-n)):e.key==="ArrowDown"?(e.preventDefault(),(i=(o=w.current)==null?void 0:o.nudge)==null||i.call(o,0,n)):e.key==="ArrowLeft"?(e.preventDefault(),(c=(d=w.current)==null?void 0:d.nudge)==null||c.call(d,-n,0)):e.key==="ArrowRight"?(e.preventDefault(),(p=(h=w.current)==null?void 0:h.nudge)==null||p.call(h,n,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),s())};return b.jsxs("div",{ref:f,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:m?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:m?void 0:e=>{var l,o;const n=f.current;if(!n)return;C.current=!0,a.current=e.pointerId;try{n.setPointerCapture(e.pointerId)}catch{}const r=x(e);(o=(l=w.current)==null?void 0:l.setPointer)==null||o.call(l,r.x,r.y)},onPointerMove:m?void 0:e=>{var r,l;if(C.current&&a.current!=null&&e.pointerId!==a.current)return;const n=x(e);(l=(r=w.current)==null?void 0:r.setPointer)==null||l.call(r,n.x,n.y)},onPointerUp:m?void 0:e=>{var n,r;a.current!=null&&e.pointerId!==a.current||(C.current=!1,a.current=null,(r=(n=w.current)==null?void 0:n.clearPointer)==null||r.call(n))},onPointerCancel:m?void 0:()=>{var e,n;C.current=!1,a.current=null,(n=(e=w.current)==null?void 0:e.clearPointer)==null||n.call(e)},onMouseMove:m?void 0:e=>{var r,l;const n=x(e);(l=(r=w.current)==null?void 0:r.setPointer)==null||l.call(r,n.x,n.y)},onMouseLeave:m?void 0:(()=>{var e,n;(n=(e=w.current)==null?void 0:e.clearPointer)==null||n.call(e)}),onBlur:m?void 0:(()=>{var e,n;(n=(e=w.current)==null?void 0:e.clearPointer)==null||n.call(e)}),onKeyDown:m?void 0:t,onClick:m?void 0:s,children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function Ze({readyId:v,locked:m,onReady:R}){const[f,g]=u.useState(0),[w,P]=u.useState("mine"),[a,C]=u.useState(()=>new Set),[M,S]=u.useState(()=>new Set),[x,s]=u.useState("playing"),[t,e]=u.useState(null),[n,r]=u.useState(0),l=u.useMemo(()=>Ne(),[f]);u.useEffect(()=>{R==null||R(v)},[R,v]),u.useEffect(()=>{P("mine"),C(new Set),S(new Set),s("playing"),e(null),r(0)},[f]),u.useEffect(()=>{if(t==null||x!=="playing")return;const p=()=>{r(Math.min(5999,Math.floor((Date.now()-t)/1e3)))};p();const y=window.setInterval(p,1e3);return()=>{window.clearInterval(y)}},[t,x]);const o=()=>{g(p=>p+1)},i=p=>{if(m||x!=="playing")return;if(t==null&&e(Date.now()),w==="flag"){if(a.has(p))return;const k=new Set(M);k.has(p)?k.delete(p):k.add(p),S(k),le(l,a,k)&&s("won");return}if(M.has(p)||a.has(p))return;if(l.mines.has(p)){const k=new Set(a);for(const I of l.mines)k.add(I);k.add(p),C(k),s("lost");return}const y=Ee(p,l,a,M);C(y),le(l,y,M)&&s("won")},d=l.mineCount-M.size,c=`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`;let h="🤔";return x==="lost"?h="😣":x==="won"?h="😎":M.size>=l.mineCount?h="😕":M.size>=l.mineCount-1?h="🤓":M.size>=Math.round(l.mineCount*3/4)?h="😃":M.size>=Math.round(l.mineCount*2/3)?h="😊":M.size>=Math.round(l.mineCount/2)?h="🙂":M.size>=Math.round(l.mineCount/3)?h="😏":M.size>0&&(h="😐"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:b.jsxs("div",{className:"article-web-art-minesweeper",children:[b.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[b.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${w==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("mine"),disabled:m||x!=="playing","aria-pressed":w==="mine",children:"⛏"}),b.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${w==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("flag"),disabled:m||x!=="playing","aria-pressed":w==="flag",children:"🚩"})]}),b.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[l.counts.map((p,y)=>{const k=a.has(y),I=M.has(y),E=l.mines.has(y),j=x==="lost"&&E,_=p>0?Se[p-1]:void 0;return b.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${k?"article-web-art-minesweeper-cell-revealed":""} ${j?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>i(y),disabled:m||x!=="playing","aria-label":`Minesweeper cell ${y+1}`,children:[I&&!k?b.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,j?b.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,k&&!E&&p>0?b.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:p}):null]},`mine-${f}-${y}`)}),x==="lost"?b.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:o,children:["Ooohhh 🙁",b.jsx("br",{}),"Click to try again"]}):null,x==="won"?b.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:o,children:["👌👀✔💯💯💯",b.jsx("br",{}),"Click to restart"]}):null]}),b.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[b.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[b.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:h}),b.jsx("span",{children:d})]}),b.jsx("div",{className:"article-web-art-minesweeper-timer",children:c})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function Qe({readyId:v,locked:m,onReady:R}){const f=u.useRef(null),g=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),a=u.useRef(null),C=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=u.useMemo(()=>({reduceMotion:C}),[C]);u.useEffect(()=>{const t=f.current,e=g.current;if(!t||!e)return;let n=!1,r=null,l=null,o=null;const i=()=>{P.current||(P.current=!0,R==null||R(v))},d=z(async()=>{var c,h;try{const p=await B(()=>import("./fallingRingsEngine-CgfU8E0P.js"),[]);if(n)return;r=p.createFallingRingsEngine(e,M),w.current=r;const y=()=>$(t,r,Math.min(1.5,window.devicePixelRatio||1));y(),(c=r.renderStatic)==null||c.call(r),(h=r.start)==null||h.call(r),i(),l=new ResizeObserver(()=>{y()}),l.observe(t),"IntersectionObserver"in window&&(o=new IntersectionObserver(k=>{var I,E;for(const j of k)j.isIntersecting?(I=r.start)==null||I.call(r):(E=r.stop)==null||E.call(r)},{threshold:.25}),o.observe(t))}catch{i()}},{timeoutMs:220});return()=>{var c;n=!0,d==null||d(),o==null||o.disconnect(),l==null||l.disconnect(),(c=r==null?void 0:r.destroy)==null||c.call(r),w.current=null}},[M,R,v]);const S=t=>{var e,n,r,l;(n=(e=w.current)==null?void 0:e.setHeld)==null||n.call(e,t),(l=(r=w.current)==null?void 0:r.start)==null||l.call(r)},x=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),S(!0))},s=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),S(!1))};return b.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:m,onPointerDown:m?void 0:t=>{a.current=t.pointerId;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}S(!0)},onPointerUp:m?void 0:t=>{a.current!=null&&t.pointerId!==a.current||(a.current=null,S(!1))},onPointerCancel:m?void 0:()=>{a.current=null,S(!1)},onLostPointerCapture:m?void 0:()=>{a.current=null,S(!1)},onMouseLeave:m?void 0:(()=>{a.current!=null&&S(!1)}),onBlur:m?void 0:(()=>{a.current=null,S(!1)}),onKeyDown:m?void 0:x,onKeyUp:m?void 0:s,children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function We({readyId:v,locked:m,onReady:R}){const f=u.useRef(null),g=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),a=u.useRef(null),C=u.useRef("mouse"),M=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),S=u.useMemo(()=>({reduceMotion:M,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[M]);u.useEffect(()=>{const s=f.current,t=g.current;if(!s||!t)return;let e=!1,n=null,r=null,l=null;const o=()=>{P.current||(P.current=!0,R==null||R(v))},i=z(async()=>{var d,c;try{const h=await B(()=>import("./prismFieldEngine-Dkw-H_-R.js"),__vite__mapDeps([6,4]));if(e)return;n=h.createPrismFieldEngine(t,S),w.current=n;const p=()=>$(s,n,Math.min(1.5,window.devicePixelRatio||1));p(),(d=n.renderStatic)==null||d.call(n),(c=n.start)==null||c.call(n),o(),r=new ResizeObserver(()=>{p()}),r.observe(s),"IntersectionObserver"in window&&(l=new IntersectionObserver(y=>{var k,I;for(const E of y)E.isIntersecting?(k=n.start)==null||k.call(n):(I=n.stop)==null||I.call(n)},{threshold:.25}),l.observe(s))}catch{o()}},{timeoutMs:220});return()=>{var d;e=!0,i==null||i(),l==null||l.disconnect(),r==null||r.disconnect(),(d=n==null?void 0:n.destroy)==null||d.call(n),w.current=null}},[S,R,v]);const x=s=>{const t=f.current;if(!t)return{x:.5,y:.5};const e=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(s.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(s.clientY-e.top)/Math.max(1,e.height)))}};return b.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:m,onClick:m?void 0:(()=>{var s,t,e,n;(t=(s=w.current)==null?void 0:s.reset)==null||t.call(s),(n=(e=w.current)==null?void 0:e.start)==null||n.call(e)}),onPointerDown:m?void 0:s=>{var e,n;a.current=s.pointerId,C.current=s.pointerType||"mouse";try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}const t=x(s);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,t.x,t.y)},onPointerMove:m?void 0:s=>{var e,n;if(a.current!=null&&s.pointerId!==a.current)return;const t=x(s);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,t.x,t.y)},onPointerUp:m?void 0:s=>{var t,e;a.current!=null&&s.pointerId!==a.current||(a.current=null,(s.pointerType||C.current)==="mouse"&&((e=(t=w.current)==null?void 0:t.clearPointer)==null||e.call(t)))},onPointerCancel:m?void 0:(()=>{var s,t;a.current=null,C.current==="mouse"&&((t=(s=w.current)==null?void 0:s.clearPointer)==null||t.call(s))}),onMouseMove:m?void 0:s=>{var e,n;const t=x(s);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,t.x,t.y)},onMouseLeave:m?void 0:(()=>{var s,t;a.current=null,(t=(s=w.current)==null?void 0:s.clearPointer)==null||t.call(s)}),onBlur:m?void 0:(()=>{var s,t;a.current=null,C.current="mouse",(t=(s=w.current)==null?void 0:s.clearPointer)==null||t.call(s)}),onKeyDown:m?void 0:(s=>{var t,e,n,r;(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),(e=(t=w.current)==null?void 0:t.reset)==null||e.call(t),(r=(n=w.current)==null?void 0:n.start)==null||r.call(n))}),children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function et({readyId:v,locked:m,onReady:R}){const f=u.useRef(null),g=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),a=u.useRef(null),C=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=u.useMemo(()=>({reduceMotion:C}),[C]);u.useEffect(()=>{const s=f.current,t=g.current;if(!s||!t)return;let e=!1,n=null,r=null,l=null;const o=()=>{P.current||(P.current=!0,R==null||R(v))},i=z(async()=>{var d,c;try{const h=await B(()=>import("./ropeLightEngine-B3dT-ds-.js"),[]);if(e)return;n=h.createRopeLightEngine(t,M),w.current=n;const p=()=>$(s,n,Math.min(1.5,window.devicePixelRatio||1));p(),(d=n.renderStatic)==null||d.call(n),(c=n.start)==null||c.call(n),o(),r=new ResizeObserver(()=>{p()}),r.observe(s),"IntersectionObserver"in window&&(l=new IntersectionObserver(y=>{var k,I;for(const E of y)E.isIntersecting?(k=n.start)==null||k.call(n):(I=n.stop)==null||I.call(n)},{threshold:.25}),l.observe(s))}catch{o()}},{timeoutMs:220});return()=>{var d;e=!0,i==null||i(),l==null||l.disconnect(),r==null||r.disconnect(),(d=n==null?void 0:n.destroy)==null||d.call(n),w.current=null}},[M,R,v]);const S=s=>{const t=f.current;if(!t)return{x:.5,y:.5};const e=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(s.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(s.clientY-e.top)/Math.max(1,e.height)))}},x=()=>{var s,t,e,n;(t=(s=w.current)==null?void 0:s.reset)==null||t.call(s),(n=(e=w.current)==null?void 0:e.start)==null||n.call(e)};return b.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:m,onClick:m?void 0:x,onPointerDown:m?void 0:s=>{var e,n;a.current=s.pointerId;const t=S(s);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,t.x,t.y)},onPointerMove:m?void 0:s=>{var e,n;if(a.current!=null&&s.pointerId!==a.current)return;const t=S(s);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,t.x,t.y)},onPointerUp:m?void 0:s=>{var t,e;a.current!=null&&s.pointerId!==a.current||(a.current=null,(e=(t=w.current)==null?void 0:t.clearPointer)==null||e.call(t))},onPointerCancel:m?void 0:(()=>{var s,t;a.current=null,(t=(s=w.current)==null?void 0:s.clearPointer)==null||t.call(s)}),onMouseMove:m?void 0:s=>{var e,n;const t=S(s);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,t.x,t.y)},onMouseLeave:m?void 0:(()=>{var s,t;a.current=null,(t=(s=w.current)==null?void 0:s.clearPointer)==null||t.call(s)}),onBlur:m?void 0:(()=>{var s,t;a.current=null,(t=(s=w.current)==null?void 0:s.clearPointer)==null||t.call(s)}),onKeyDown:m?void 0:(s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),x())}),children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}function tt({readyId:v,locked:m,onReady:R}){const f=u.useRef(null),g=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),a=u.useRef(null),C=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=u.useMemo(()=>({reduceMotion:C}),[C]);u.useEffect(()=>{const x=f.current,s=g.current;if(!x||!s)return;let t=!1,e=null,n=null,r=null;const l=()=>{P.current||(P.current=!0,R==null||R(v))},o=z(async()=>{var i,d;try{const c=await B(()=>import("./soupShaderEngine-DOT8TiBo.js"),__vite__mapDeps([7,4]));if(t)return;e=c.createSoupShaderEngine(s,M),w.current=e;const h=()=>$(x,e,Math.min(1.5,window.devicePixelRatio||1));h(),(i=e.renderStatic)==null||i.call(e),(d=e.start)==null||d.call(e),l(),n=new ResizeObserver(()=>{h()}),n.observe(x),"IntersectionObserver"in window&&(r=new IntersectionObserver(p=>{var y,k;for(const I of p)I.isIntersecting?(y=e.start)==null||y.call(e):(k=e.stop)==null||k.call(e)},{threshold:.25}),r.observe(x))}catch{l()}},{timeoutMs:220});return()=>{var i;t=!0,o==null||o(),r==null||r.disconnect(),n==null||n.disconnect(),(i=e==null?void 0:e.destroy)==null||i.call(e),w.current=null}},[M,R,v]);const S=x=>{const s=f.current;if(!s)return{x:.5,y:.5};const t=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(x.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(x.clientY-t.top)/Math.max(1,t.height)))}};return b.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Soup shader web art tile",disabled:m,onPointerDown:m?void 0:x=>{var t,e,n,r;a.current=x.pointerId;try{x.currentTarget.setPointerCapture(x.pointerId)}catch{}const s=S(x);(e=(t=w.current)==null?void 0:t.setPointer)==null||e.call(t,s.x,s.y),(r=(n=w.current)==null?void 0:n.setHeld)==null||r.call(n,!0)},onPointerMove:m?void 0:x=>{var t,e;if(a.current!=null&&x.pointerId!==a.current)return;const s=S(x);(e=(t=w.current)==null?void 0:t.setPointer)==null||e.call(t,s.x,s.y)},onPointerUp:m?void 0:x=>{var s,t;a.current!=null&&x.pointerId!==a.current||(a.current=null,(t=(s=w.current)==null?void 0:s.setHeld)==null||t.call(s,!1))},onPointerCancel:m?void 0:(()=>{var x,s;a.current=null,(s=(x=w.current)==null?void 0:x.setHeld)==null||s.call(x,!1)}),onMouseMove:m?void 0:x=>{var t,e;const s=S(x);(e=(t=w.current)==null?void 0:t.setPointer)==null||e.call(t,s.x,s.y)},onMouseLeave:m?void 0:(()=>{var x,s,t,e;a.current=null,(s=(x=w.current)==null?void 0:x.setHeld)==null||s.call(x,!1),(e=(t=w.current)==null?void 0:t.clearPointer)==null||e.call(t)}),onBlur:m?void 0:(()=>{var x,s,t,e;a.current=null,(s=(x=w.current)==null?void 0:x.setHeld)==null||s.call(x,!1),(e=(t=w.current)==null?void 0:t.clearPointer)==null||e.call(t)}),children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function nt({readyId:v,locked:m,onReady:R}){const f=u.useRef(null),g=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),a=u.useRef(null),C=u.useRef(null),M=u.useRef(0),[S,x]=u.useState(!1),[s,t]=u.useState([]),e=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=u.useMemo(()=>({reduceMotion:e}),[e]);u.useEffect(()=>{const i=f.current,d=g.current;if(!i||!d)return;let c=!1,h=null,p=null,y=null;const k=()=>{P.current||(P.current=!0,R==null||R(v))},I=z(async()=>{var E,j;try{const _=await B(()=>import("./tardisWormholeEngine-BSErFcgT.js"),__vite__mapDeps([8,4]));if(c)return;h=_.createTardisWormholeEngine(d,n),w.current=h;const L=()=>$(i,h,Math.min(1.5,window.devicePixelRatio||1));L(),(E=h.renderStatic)==null||E.call(h),(j=h.start)==null||j.call(h),k(),p=new ResizeObserver(()=>{L()}),p.observe(i),"IntersectionObserver"in window&&(y=new IntersectionObserver(A=>{var H,V;for(const Y of A)Y.isIntersecting?(H=h.start)==null||H.call(h):(V=h.stop)==null||V.call(h)},{threshold:.25}),y.observe(i))}catch{k()}},{timeoutMs:220});return()=>{var E;c=!0,I==null||I(),y==null||y.disconnect(),p==null||p.disconnect(),(E=h==null?void 0:h.destroy)==null||E.call(h),w.current=null}},[n,R,v]),u.useEffect(()=>{if(s.length===0)return;const i=window.setTimeout(()=>{t(d=>d.slice(1))},1e3);return()=>{window.clearTimeout(i)}},[s]),u.useEffect(()=>{var d,c,h;const i=w.current;if(i){if(m){x(!1),C.current=null,(d=i.clearPointer)==null||d.call(i),(c=i.stop)==null||c.call(i);return}(h=i.start)==null||h.call(i)}},[m]);const r=i=>{const d=f.current,c=g.current||d;if(!d||!c)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const h=c.getBoundingClientRect(),p=d.getBoundingClientRect(),y=Math.max(0,Math.min(p.width,i.clientX-p.left)),k=Math.max(0,Math.min(p.height,i.clientY-p.top)),I=Math.max(0,Math.min(h.width,i.clientX-h.left)),E=Math.max(0,Math.min(h.height,i.clientY-h.top)),j=C.current,_=j?I-j.px:0,L=j?E-j.py:0;return C.current={px:I,py:E},{x:h.width>0?I/h.width:.5,y:h.height>0?E/h.height:.5,px:y,py:k,dx:_,dy:L}},l=(i,d)=>{const c=M.current++;t(h=>[...h,{id:c,x:i,y:d}])},o=i=>{var c,h,p,y;const d=r(i);l(d.px,d.py),(h=(c=w.current)==null?void 0:c.boost)==null||h.call(c),(y=(p=w.current)==null?void 0:p.start)==null||y.call(p),x(!0),window.setTimeout(()=>{x(!1)},650)};return b.jsxs("button",{type:"button",ref:f,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${S?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:m,onClick:m?void 0:o,onContextMenu:m?void 0:(i=>{var c,h,p,y;i.preventDefault();const d=r(i);l(d.px,d.py),(h=(c=w.current)==null?void 0:c.reverseBurst)==null||h.call(c),(y=(p=w.current)==null?void 0:p.start)==null||y.call(p)}),onWheel:m?void 0:(i=>{var d,c;(c=(d=w.current)==null?void 0:d.addScrollBoost)==null||c.call(d,i.deltaY*.003)}),onPointerDown:m?void 0:i=>{var c,h;a.current=i.pointerId;try{i.currentTarget.setPointerCapture(i.pointerId)}catch{}const d=r(i);(h=(c=w.current)==null?void 0:c.setPointer)==null||h.call(c,d.x,d.y,d.dx,d.dy)},onPointerMove:m?void 0:i=>{var c,h,p,y;if(a.current!=null&&i.pointerId!==a.current)return;const d=r(i);(h=(c=w.current)==null?void 0:c.setPointer)==null||h.call(c,d.x,d.y,d.dx,d.dy),(i.buttons&1)===1&&((y=(p=w.current)==null?void 0:p.drag)==null||y.call(p,d.dx))},onPointerUp:m?void 0:i=>{a.current!=null&&i.pointerId!==a.current||(a.current=null)},onPointerCancel:m?void 0:(()=>{a.current=null}),onMouseMove:m?void 0:i=>{var c,h;const d=r(i);(h=(c=w.current)==null?void 0:c.setPointer)==null||h.call(c,d.x,d.y,d.dx,d.dy)},onMouseLeave:m?void 0:(()=>{var i,d;a.current=null,C.current=null,(d=(i=w.current)==null?void 0:i.clearPointer)==null||d.call(i)}),onBlur:m?void 0:(()=>{var i,d;a.current=null,C.current=null,(d=(i=w.current)==null?void 0:i.clearPointer)==null||d.call(i)}),onKeyDown:m?void 0:(i=>{var d,c,h,p;(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),(c=(d=w.current)==null?void 0:d.boost)==null||c.call(d),(p=(h=w.current)==null?void 0:h.start)==null||p.call(h))}),children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),s.map(i=>b.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${i.x}px`,top:`${i.y}px`},"aria-hidden":!0},i.id)),b.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function rt({label:v,clickLabel:m,previewRequested:R=!1}){const f=fe(),g=u.useRef(null),[w,P]=u.useState(!1),[a,C]=u.useState(0),M=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),S=u.useCallback(()=>{C(Date.now()),P(!0)},[]),x=u.useCallback(()=>{f.navigateToSectionWithId("contact")},[f]),s=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),S())},t=u.useMemo(()=>w?_e({seed:`${a||Date.now()}:${v}`,reduceMotion:M}):"",[v,w,a,M]);return u.useEffect(()=>{let e=0,n=0;return R?(e=window.requestAnimationFrame(()=>{n=window.requestAnimationFrame(()=>{C(Date.now()),P(!0)})}),()=>{e&&window.cancelAnimationFrame(e),n&&window.cancelAnimationFrame(n)}):(P(!1),()=>{e&&window.cancelAnimationFrame(e),n&&window.cancelAnimationFrame(n)})},[R]),b.jsxs("div",{ref:g,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${w?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":w?"Kontakt preview":v,"aria-pressed":w,onClick:S,onKeyDown:s,children:[b.jsxs("div",{className:`article-web-art-tile-cta-preview ${w?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[w&&b.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:t,sandbox:"allow-scripts"},`${a}-${v}`),b.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!w&&b.jsx("div",{className:`loader ${M?"loader-reduce-motion":""}`,"aria-hidden":!0,children:b.jsxs("div",{className:"loader-inner",children:[b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})})]})}),b.jsxs("div",{className:`article-web-art-tile-cta-content ${w?"article-web-art-tile-cta-content-hidden":""}`,children:[b.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:v}),b.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:m})]}),w&&b.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),x()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),x())},children:"Kontakt"})]})}function st({locked:v=!1}){const m=u.useRef(null),R=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=u.useRef(!1),g=u.useRef(0),w=u.useRef(null),P=u.useRef(null),a=u.useRef(1),C=u.useRef(null),M=u.useRef(null),S=u.useRef(null);return u.useEffect(()=>{const x=m.current;if(!x)return;const s=p=>{const y=Math.max(0,Math.min(1,p));return y*y*(3-2*y)},t=()=>{const p=x.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),y=[];for(const k of p){const I=k.getAnimations?k.getAnimations():[];for(const E of I)y.push(E)}return y},e=p=>{const y=Math.max(1,Math.min(5.2,Number(p)||1));a.current=y;const k=t();for(const I of k)I.playbackRate=y},n=()=>{M.current!=null&&cancelAnimationFrame(M.current),S.current!=null&&window.clearTimeout(S.current),M.current=null,S.current=null},r=()=>{n(),e(5.2),S.current=window.setTimeout(()=>{const p=a.current,y=performance.now(),k=320,I=()=>{const E=(performance.now()-y)/k,j=s(E);e(p+(1-p)*j),E<1?M.current=requestAnimationFrame(I):M.current=null};M.current=requestAnimationFrame(I),S.current=null},2e3)},l=()=>{f.current=!1,w.current=null,x.classList.remove("article-web-art-tile-goldfish-held"),P.current!=null&&cancelAnimationFrame(P.current),P.current=null;const p=a.current,y=360,k=performance.now();C.current!=null&&cancelAnimationFrame(C.current);const I=()=>{const E=(performance.now()-k)/y,j=s(E);e(p+(1-p)*j),E<1?C.current=requestAnimationFrame(I):C.current=null};C.current=requestAnimationFrame(I)},o=()=>{if(!f.current)return;const p=performance.now()-g.current,y=1.2+4*s(p/2400);e(y),P.current=requestAnimationFrame(o)},i=p=>{if(!(R||v)&&!(p.button!=null&&p.button!==0)){n(),f.current=!0,g.current=performance.now(),w.current=p.pointerId,x.classList.add("article-web-art-tile-goldfish-held");try{x.setPointerCapture(p.pointerId)}catch{}C.current!=null&&(cancelAnimationFrame(C.current),C.current=null),P.current==null&&(P.current=requestAnimationFrame(o))}},d=()=>{const p=performance.now()-g.current;l(),p<220&&r()},c=()=>{l()},h=()=>{l()};return x.addEventListener("pointerdown",i),x.addEventListener("pointerup",d),x.addEventListener("pointercancel",c),x.addEventListener("lostpointercapture",h),()=>{x.removeEventListener("pointerdown",i),x.removeEventListener("pointerup",d),x.removeEventListener("pointercancel",c),x.removeEventListener("lostpointercapture",h),l(),n(),C.current!=null&&cancelAnimationFrame(C.current),C.current=null}},[v,R]),u.useEffect(()=>{const x=m.current;x&&x.classList.toggle("article-web-art-tile-goldfish-locked",v)},[v]),b.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:m,role:"img","aria-label":"Goldfish animation tile",children:[b.jsx("div",{className:"fish-stage",children:b.jsx("div",{className:"fish-wrapper",children:b.jsx("div",{className:"fish-container",children:b.jsxs("div",{className:"fish-parts",children:[b.jsx("div",{className:"fish-body front"}),b.jsx("div",{className:"fish-body back"}),b.jsx("div",{className:"fish-back-bottom-fin front"}),b.jsx("div",{className:"fish-back-bottom-fin back"}),b.jsx("div",{className:"fish-back-fin"}),b.jsx("div",{className:"fish-front-bottom-fin front"}),b.jsx("div",{className:"fish-front-bottom-fin back"}),b.jsx("div",{className:"fish-top-fin"})]})})})}),b.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function it({locked:v=!1}){const m=u.useRef(null),R=u.useRef([]),f=u.useRef(0),g=u.useRef(0),w=Ie,P=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return u.useEffect(()=>{const a=m.current;if(!a)return;const C=R.current.filter(Boolean);if(!C.length)return;let M=!0,S=!1,x=null,s=null;const t=(p,y)=>{const k=(p-.5)*30;for(let I=0;I<C.length;I++){const E=C[I],j=I*18,_=I*8,L=(p-.5)*j,A=(y-.5)*_;E.style.transform=`translate3d(${L}px, ${A}px, 0) rotateY(${k}deg)`}},e=(p,y)=>{const k=Math.max(-.55,Math.min(.55,(p-.5)*1.1)),I=Math.max(-.35,Math.min(.35,(y-.5)*.7));t(.5+k,.5+I)},n=p=>{const y=a.getBoundingClientRect(),k=(p.clientX-y.left)/Math.max(1,y.width),I=(p.clientY-y.top)/Math.max(1,y.height);M=!0,g.current=performance.now()+650,e(Math.max(0,Math.min(1,k)),Math.max(0,Math.min(1,I)))},r=p=>{const y=a.getBoundingClientRect(),k=(p.clientX-y.left)/Math.max(1,y.width),I=(p.clientY-y.top)/Math.max(1,y.height);return{x:Math.max(0,Math.min(1,k)),y:Math.max(0,Math.min(1,I))}},l=p=>{if(p.pointerType==="mouse")return;S=!0,x=p.pointerId,M=!0,g.current=performance.now()+900;const y=r(p);e(y.x,y.y),!P&&s==null&&(s=requestAnimationFrame(h))},o=p=>{if(!S||x!=null&&p.pointerId!==x)return;M=!0,g.current=performance.now()+900;const y=r(p);e(y.x,y.y)},i=p=>{x!=null&&(p==null?void 0:p.pointerId)!=null&&p.pointerId!==x||(S=!1,x=null,M=!0,!P&&s==null&&(s=requestAnimationFrame(h)))},d=()=>{M=!0,!P&&s==null&&(s=requestAnimationFrame(h))},c=()=>{M=!0,!P&&s==null&&(s=requestAnimationFrame(h))},h=()=>{if(M){if(!P&&performance.now()>=g.current){f.current+=.008;const p=Math.sin(f.current)*.5+.5;e(p,.5)}s=requestAnimationFrame(h)}};return M=!v,a.addEventListener("mouseenter",d),a.addEventListener("mousemove",n),a.addEventListener("mouseleave",c),a.addEventListener("pointerdown",l),a.addEventListener("pointermove",o),a.addEventListener("pointerup",i),a.addEventListener("pointercancel",i),e(.5,.5),!P&&!v&&(s=requestAnimationFrame(h)),()=>{a.removeEventListener("mouseenter",d),a.removeEventListener("mousemove",n),a.removeEventListener("mouseleave",c),a.removeEventListener("pointerdown",l),a.removeEventListener("pointermove",o),a.removeEventListener("pointerup",i),a.removeEventListener("pointercancel",i),s!=null&&cancelAnimationFrame(s)}},[P]),b.jsxs("div",{ref:m,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[b.jsxs("div",{className:"patronus-card",children:[b.jsx("div",{className:"patronus-layer patronus-bg",ref:a=>{R.current[0]=a},children:b.jsx("img",{alt:"",src:w[0]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[1]=a},children:b.jsx("img",{alt:"",src:w[1]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[2]=a},children:b.jsx("img",{alt:"",src:w[2]})}),b.jsx("div",{className:"patronus-layer patronus-svg",ref:a=>{R.current[3]=a},dangerouslySetInnerHTML:{__html:Me}}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[4]=a},children:b.jsx("img",{alt:"",src:w[3]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[5]=a},children:b.jsx("img",{alt:"",src:w[4]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[6]=a},children:b.jsx("img",{alt:"",src:w[5]})})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{ft as default};
