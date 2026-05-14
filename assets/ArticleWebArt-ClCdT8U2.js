const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/hourglassEngine-BZmflguM.js","assets/vendor-BUjjXRU6.js","assets/react-vendor-D1LkQUJD.js","assets/threeTunnelEngine-DluWj-Nj.js","assets/three-BYTi_f6D.js","assets/threePolygonDemo5Engine-C8j4d7sj.js","assets/prismFieldEngine-Dkw-H_-R.js","assets/soupShaderEngine-DOT8TiBo.js","assets/tardisWormholeEngine-BSErFcgT.js"])))=>i.map(i=>d[i]);
import{c as ye,g as fe,A as ae,_ as B}from"./index-3fdLMjXC.js";import{r as u,j as p}from"./react-vendor-D1LkQUJD.js";import"./swiper-BJPGAhIX.js";/* empty css              */import"./bootstrap-jfx39s8c.js";import"./vendor-BUjjXRU6.js";const ge=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`;function z(v,{timeoutMs:m=1200}={}){if(typeof window>"u")return v(),()=>{};if("requestIdleCallback"in window){const h=window.requestIdleCallback(()=>v(),{timeout:m});return()=>window.cancelIdleCallback(h)}const R=window.setTimeout(()=>v(),0);return()=>window.clearTimeout(R)}function Me(v){if(!v)return{width:1,height:1};const m=v.getBoundingClientRect(),R=Math.max(1,Math.round(m.width||v.clientWidth||1)),h=Math.max(1,Math.round(m.height||v.clientHeight||1));return{width:R,height:h}}function $(v,m,R=1){var w;const{width:h,height:M}=Me(v);(w=m==null?void 0:m.setSize)==null||w.call(m,h,M,R)}function ce(v,m,R="smooth"){if(typeof window>"u")return;const h=document.getElementById(v),M=document.getElementById(`scrollable-${m}`);if(!h||!M)return;const w=h.getBoundingClientRect(),P=M.getBoundingClientRect(),c=M.scrollTop+(w.top-P.top);M.scrollTo({top:Math.max(0,c),behavior:R})}const Ce=9,Pe=9,ke=10,Se=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],Ie=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function Ne(v=Ce,m=Pe,R=ke){const h=v*m,M=Math.max(1,Math.min(R,h-1)),w=new Set;for(;w.size<M;)w.add(Math.floor(Math.random()*h));const P=new Array(h).fill(0);for(let c=0;c<h;c++){if(w.has(c)){P[c]=-1;continue}const C=c%m,g=Math.floor(c/m);let S=0;for(let x=-1;x<=1;x++)for(let o=-1;o<=1;o++){if(o===0&&x===0)continue;const r=C+o,e=g+x;r<0||e<0||r>=m||e>=v||w.has(e*m+r)&&(S+=1)}P[c]=S}return{rows:v,cols:m,mineCount:M,mines:w,counts:P}}function Ee(v,m,R,h){const M=new Set(R),w=[v];for(;w.length>0;){const P=w.pop();if(P==null||M.has(P)||h.has(P)||m.mines.has(P)||(M.add(P),m.counts[P]!==0))continue;const c=P%m.cols,C=Math.floor(P/m.cols);for(let g=-1;g<=1;g++)for(let S=-1;S<=1;S++){if(S===0&&g===0)continue;const x=c+S,o=C+g;x<0||o<0||x>=m.cols||o>=m.rows||w.push(o*m.cols+x)}}return M}function le(v,m,R){const h=v.rows*v.cols-v.mineCount;if(m.size>=h)return!0;if(R.size!==v.mineCount)return!1;for(const M of v.mines)if(!R.has(M))return!1;return!0}function je(v){return`Web art ${String(v||"tile").toLowerCase()} tile loading`}function Le({seed:v,reduceMotion:m}){const R=JSON.stringify(Re.split("<\/script>").join("<\\/script>")),h=JSON.stringify(v);return`<!doctype html>
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
    seed: ${h}
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
</html>`}function ue(v){return Array.isArray(v)?v.map((m,R)=>{const h=m!=null&&m.tone?` article-web-art-intro-guide-fragment-${m.tone}`:"";return p.jsx("span",{className:`article-web-art-intro-guide-fragment${h}`,children:m==null?void 0:m.text},`${(m==null?void 0:m.text)||"fragment"}-${R}`)}):v}function dt({dataWrapper:v,id:m}){var ie;const R=ye(),h=fe(),M=`${v.uniqueId}-ambient-trace`,w=`${v.uniqueId}-ambient-hex`,P=`${v.uniqueId}-ambient-plop`,c=`${v.uniqueId}-ambient-julia`,C=`${v.uniqueId}-ambient-mines`,g=`${v.uniqueId}-ambient-rings`,S=`${v.uniqueId}-ambient-prism`,x=`${v.uniqueId}-ambient-rope`,o=`${v.uniqueId}-ambient-soup`,r=`${v.uniqueId}-ambient-tardis`,[e,n]=u.useState(null),[t,l]=u.useState(!0),i=u.useMemo(()=>v.orderedItems,[v.orderedItems]),s=u.useMemo(()=>{const N=[4,5,3,6,1,2,7,8,9,10,11],T=new Map(i.map(O=>[Number(O==null?void 0:O.id),O])),D=[];for(const O of N){const q=T.get(O);q&&D.push(q)}for(const O of i){if(!O)continue;const q=Number(O==null?void 0:O.id);N.includes(q)||D.push(O)}return D},[i]),d=u.useRef(null),[a,f]=u.useState(!1),b=u.useRef(new Set),y=u.useRef(new Map),[k,I]=u.useState(0),[E,j]=u.useState(-1),[L,_]=u.useState(()=>new Set),[A,H]=u.useState(()=>new Set),[V,U]=u.useState(!1),G=u.useMemo(()=>{const N=s.map(T=>T==null?void 0:T.uniqueId).filter(Boolean);return N.push(M,w,P,c,C,S,g,x,o,r,"ambient-goldfish","ambient-patronus"),new Set(N)},[w,c,C,P,S,g,x,o,r,M,s]),X=u.useMemo(()=>Array.from(A).filter(N=>N!=="ambient-goldfish"&&N!=="ambient-patronus"),[A]),F=t,W=R.selectedLanguageId||"en";let J=R.getString("send_yours");typeof J=="string"&&J.startsWith("locale:")&&(J={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[W]||"Send yours!");let Z=R.getString("click");typeof Z=="string"&&Z.startsWith("locale:")&&(Z={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[W]||"Click");const te={en:{title:"Doors of the world behind an amazing art gallery.",guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",guide:{eyebrow:"So funktioniert es",lines:["Betritt die Galerie und schau dir die Karten in Ruhe an.","Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.","Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."]},button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",guide:{eyebrow:"Kako istraživati",lines:["Uđi u galeriju i istražuj kartice svojim tempom.","Klikni, dodirni ili pritisni karticu da otkriješ što skriva.","Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme."]},button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",guide:{eyebrow:"Nasıl gezilir",lines:["Galeriye girin ve kartları kendi temponuzda inceleyin.","İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.","Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir."]},button:"Gir",preparing:"Hazırlanıyor..."}}[W]||{guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter"},he="hide",K=u.useCallback(N=>{if(!N||b.current.has(N))return;b.current.add(N);const T=y.current.get(N);T!=null&&(window.clearTimeout(T),y.current.delete(N)),I(b.current.size)},[]),ne=u.useCallback(N=>{N&&H(T=>{if(T.has(N))return T;const D=new Set(T);return D.add(N),D})},[]),Q=u.useCallback(()=>{for(const N of y.current.values())window.clearTimeout(N);y.current=new Map,b.current=new Set,I(0),j(-1),f(!1),_(new Set),H(new Set),U(!1)},[]),ee=u.useCallback(()=>{l(!1),f(!0),j(s.length-1),_(new Set),H(new Set),U(!1)},[s.length]);u.useEffect(()=>{var oe;if(typeof window>"u"||((oe=h.targetSection)==null?void 0:oe.id)!==v.sectionId||h.transitionStatus!=="transition_status_none")return;const N=window.__pendingSectionAction;if(!N||N.action!=="enter"||N.sectionId!==v.sectionId||N.targetArticleId&&N.targetArticleId!==v.uniqueId)return;if(Date.now()-(N.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,ee();const T=N.targetArticleId||v.uniqueId;let D=null,O=null,q=null,Y=null;return D=window.setTimeout(()=>{O=window.requestAnimationFrame(()=>{ce(T,v.sectionId),q=window.setTimeout(()=>{Y=window.requestAnimationFrame(()=>{ce(T,v.sectionId)})},220)})},90),()=>{D!==null&&window.clearTimeout(D),O!==null&&window.cancelAnimationFrame(O),q!==null&&window.clearTimeout(q),Y!==null&&window.cancelAnimationFrame(Y)}},[v.uniqueId,v.sectionId,(ie=h.targetSection)==null?void 0:ie.id,h.transitionStatus,ee]);const re=u.useCallback(N=>{N&&(ne(N),_(T=>{if(T.has(N))return T;const D=new Set(T);return D.add(N),D}))},[ne]),se=u.useCallback(N=>{N&&(_(T=>{if(!T.has(N))return T;const D=new Set(T);return D.delete(N),D}),H(T=>{if(!T.has(N))return T;const D=new Set(T);return D.delete(N),D}))},[]),pe=G.size>0&&L.size>=G.size,be=u.useCallback(()=>{if(G.size>0&&L.size>=G.size){_(new Set),H(new Set),U(!1);return}H(new Set(G)),_(new Set(G)),U(!0)},[G,L.size]),me=u.useCallback(()=>{Q(),l(!0)},[Q]),we=(N,T)=>{const D=Number(N==null?void 0:N.id);return D===1?"Hover":D===2?"Wave":D===3?"3D":D===4?"Poly":D===5?"Click":D===6?"Orbit":D===7?"Spin":D===8?"Shape":D===9?"Hourglass":D===10?"Noice":D===11?"Distance":String(T+1)},xe=s.map((N,T)=>{if(!a)return p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${T+1} loading`},N.uniqueId);const D=N.uniqueId,O=L.has(D),q=A.has(D)||O;return p.jsx(de,{label:we(N,T),isOpen:O,onToggle:()=>{O?se(D):re(D)},shouldRender:q,children:q&&p.jsx(Te,{itemWrapper:N,index:T,locked:F||!O,activate:T<=E,onReady:K})},D)}),ve=a?[{key:"ambient-trace",tileId:M,label:"Trace",render:N=>p.jsx(Ge,{readyId:M,locked:F||!N,onReady:K})},{key:"ambient-hex",tileId:w,label:"Hex",render:N=>p.jsx(Ue,{readyId:w,locked:F||!N,onReady:K})},{key:"ambient-plop",tileId:P,label:"Plop",render:N=>p.jsx(Ye,{readyId:P,locked:F||!N,onReady:K})},{key:"ambient-julia",tileId:c,label:"Julia",render:N=>p.jsx(Xe,{readyId:c,locked:F||!N,onReady:K})},{key:"ambient-mines",tileId:C,label:"Bomb",render:N=>p.jsx(Je,{readyId:C,locked:F||!N,onReady:K})},{key:"ambient-rings",tileId:g,label:"Fall",render:N=>p.jsx(Ze,{readyId:g,locked:F||!N,onReady:K})},{key:"ambient-prism",tileId:S,label:"Prism",render:N=>p.jsx(Qe,{readyId:S,locked:F||!N,onReady:K})},{key:"ambient-rope",tileId:x,label:"Rope",render:N=>p.jsx(We,{readyId:x,locked:F||!N,onReady:K})},{key:"ambient-soup",tileId:o,label:"Soup",render:N=>p.jsx(et,{readyId:o,locked:F||!N,onReady:K})},{key:"ambient-tardis",tileId:r,label:"Tardis",render:N=>p.jsx(tt,{readyId:r,locked:F||!N,onReady:K})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:N=>p.jsx(rt,{locked:F||!N})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:N=>p.jsx(st,{locked:F||!N})}].map(({key:N,tileId:T,label:D,render:O})=>{const q=L.has(T),Y=A.has(T)||q;return p.jsx(de,{label:D,isOpen:q,onToggle:()=>{q?se(T):re(T)},shouldRender:Y,children:Y&&O(q)},N)}):[p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return u.useEffect(()=>{Q()},[v.uniqueId,Q]),u.useEffect(()=>{a&&j(s.length-1)},[a,s.length]),u.useEffect(()=>{if(a)for(const N of X){if(!N||b.current.has(N)||y.current.has(N))continue;const T=window.setTimeout(()=>{K(N)},12e3);y.current.set(N,T)}},[a,X,K]),p.jsx(ae,{id:v.uniqueId,type:ae.Types.SPACING_DEFAULT,dataWrapper:v,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:n,children:p.jsxs("div",{className:"article-web-art-shell",children:[p.jsx(_e,{guide:te.guide,buttonLabel:t?te.button:he,hidden:!t,onEnter:t?ee:me,secondaryButtonLabel:t?null:"promaja",onSecondaryAction:t?null:be,secondaryPressed:pe}),p.jsx("div",{className:`article-web-art-stage ${t?"article-web-art-stage-preview":""}`,"aria-hidden":t,children:p.jsxs("div",{className:`article-web-art-items ${F?"article-web-art-items-locked":""}`,ref:d,"aria-busy":t,children:[a&&p.jsx(nt,{label:J,clickLabel:Z,previewRequested:V}),xe,ve]})})]})})}function _e({guide:v,buttonLabel:m,hidden:R,onEnter:h,secondaryButtonLabel:M=null,onSecondaryAction:w=null,secondaryPressed:P=!1}){const c=C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),h())};return p.jsx("div",{className:`article-web-art-intro-cover ${R?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:p.jsx("div",{className:"article-web-art-intro-cover-inner",children:p.jsx("div",{className:"article-web-art-intro-cover-actions",children:p.jsx("div",{className:`article-web-art-intro-guide ${R?"article-web-art-intro-guide-hidden":"article-web-art-intro-guide-open"}`,children:p.jsxs("div",{className:"article-web-art-intro-guide-inner",children:[p.jsxs("div",{className:"article-web-art-intro-guide-top-row",children:[p.jsxs("div",{className:"article-web-art-intro-guide-top-copy",children:[p.jsx("span",{className:"article-web-art-intro-guide-eyebrow",children:v.eyebrow}),p.jsx("p",{className:"article-web-art-intro-guide-line article-web-art-intro-guide-line-primary",children:ue(v.lines[0])})]}),p.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[M?p.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${P?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:w||void 0,"aria-pressed":P,"aria-label":M,children:M}):null,p.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:h,onKeyDown:c,"aria-label":m,children:m})]})]}),p.jsx("div",{className:"article-web-art-intro-guide-lines",children:v.lines.slice(1).map((C,g)=>p.jsx("p",{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${g+2}`,children:ue(C)},Array.isArray(C)?C.map(S=>S==null?void 0:S.text).join(""):C))})]})})})})})}function de({label:v,isOpen:m,onToggle:R,shouldRender:h=!0,children:M}){return p.jsxs("div",{className:`article-web-art-gated-tile ${m?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[h?M:p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":je(v)}),p.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),p.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${m?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:R,"aria-label":`${m?"Hide":"Show"} ${v}`,children:v})]})}function Te({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){return Number(v.id)===1?p.jsx($e,{itemWrapper:v,index:m,activate:R,locked:h,onReady:M}):Number(v.id)===2?p.jsx(Fe,{itemWrapper:v,index:m,activate:R,locked:h,onReady:M}):Number(v.id)===3?p.jsx(qe,{itemWrapper:v,index:m,activate:R,locked:h,onReady:M}):Number(v.id)===4?p.jsx(Ke,{itemWrapper:v,index:m,activate:R,locked:h,onReady:M}):Number(v.id)===6?p.jsx(Ve,{itemWrapper:v,index:m,activate:R,locked:h,onReady:M}):Number(v.id)===7?p.jsx(Ae,{itemWrapper:v,locked:h,onReady:M}):Number(v.id)===8?p.jsx(Oe,{itemWrapper:v,index:m,activate:R,locked:h,onReady:M}):Number(v.id)===9?p.jsx(He,{itemWrapper:v,index:m,activate:R,locked:h,onReady:M}):Number(v.id)===10?p.jsx(Be,{itemWrapper:v,index:m,activate:R,locked:h,onReady:M}):Number(v.id)===11?p.jsx(De,{itemWrapper:v,index:m,activate:R,locked:h,onReady:M}):p.jsx(ze,{itemWrapper:v,index:m,activate:R,locked:h,onReady:M})}function De({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){const w=u.useRef(null),P=u.useRef(null),c=u.useRef(null),C=u.useRef(!1),g=u.useRef(!0),S=u.useRef(null),x=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=u.useMemo(()=>({seed:54013+(Number(v.id)||11)*7331,reduceMotion:x}),[v.id,x]);u.useEffect(()=>{if(!R)return;const e=w.current,n=P.current;if(!e||!n)return;let t=!1,l=null,i=null,s=null;const d=()=>{C.current||(C.current=!0,M==null||M(v.uniqueId))},a=z(async()=>{var f,b;try{const y=await B(()=>import("./distanceFieldEngine-Qtz8TZwr.js"),[]);if(t)return;l=y.createDistanceFieldEngine(n,o),c.current=l;const k=()=>$(e,l,Math.min(1.5,window.devicePixelRatio||1));k(),(f=l.renderStatic)==null||f.call(l),h||(b=l.start)==null||b.call(l),d(),i=new ResizeObserver(()=>{k()}),i.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var E,j,L,_;for(const A of I){if(g.current=!!A.isIntersecting,h){(E=l.setHoverActive)==null||E.call(l,!1),(j=l.stop)==null||j.call(l);continue}g.current?(L=l.start)==null||L.call(l):(_=l.stop)==null||_.call(l)}},{threshold:.25}),s.observe(e))}catch{d()}},{timeoutMs:220});return()=>{var f;t=!0,a==null||a(),s==null||s.disconnect(),i==null||i.disconnect(),(f=l==null?void 0:l.destroy)==null||f.call(l),c.current=null}},[R,o,v.uniqueId,h,M]),u.useEffect(()=>{var n,t,l,i;const e=c.current;if(e){if(h){(n=e.setHoverActive)==null||n.call(e,!1),(t=e.clearPointer)==null||t.call(e),(l=e.stop)==null||l.call(e);return}g.current&&((i=e.start)==null||i.call(e))}},[h]);const r=e=>{const n=w.current;if(!n)return{x:.5,y:.5};const t=n.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${m+1}`,disabled:h,onPointerEnter:h?void 0:(()=>{var e,n,t,l;(n=(e=c.current)==null?void 0:e.setHoverActive)==null||n.call(e,!0),(l=(t=c.current)==null?void 0:t.start)==null||l.call(t)}),onPointerMove:h?void 0:(e=>{var t,l,i,s;const n=r(e);(l=(t=c.current)==null?void 0:t.setHoverActive)==null||l.call(t,!0),(s=(i=c.current)==null?void 0:i.setPointer)==null||s.call(i,n.x,n.y)}),onPointerLeave:h?void 0:(()=>{var e,n,t,l;S.current=null,(n=(e=c.current)==null?void 0:e.setHoverActive)==null||n.call(e,!1),(l=(t=c.current)==null?void 0:t.clearPointer)==null||l.call(t)}),onPointerDown:h?void 0:(e=>{var t,l,i,s,d,a;if(e.button!=null&&e.button!==0)return;S.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const n=r(e);(l=(t=c.current)==null?void 0:t.setHoverActive)==null||l.call(t,!0),(s=(i=c.current)==null?void 0:i.setPointer)==null||s.call(i,n.x,n.y),(a=(d=c.current)==null?void 0:d.boostPopulation)==null||a.call(d)}),onPointerUp:h?void 0:(e=>{S.current!=null&&e.pointerId!==S.current||(S.current=null)}),onPointerCancel:h?void 0:(()=>{var e,n,t,l;S.current=null,(n=(e=c.current)==null?void 0:e.setHoverActive)==null||n.call(e,!1),(l=(t=c.current)==null?void 0:t.clearPointer)==null||l.call(t)}),onFocus:h?void 0:(()=>{var e,n,t,l;(n=(e=c.current)==null?void 0:e.setHoverActive)==null||n.call(e,!0),(l=(t=c.current)==null?void 0:t.start)==null||l.call(t)}),onBlur:h?void 0:(()=>{var e,n,t,l;S.current=null,(n=(e=c.current)==null?void 0:e.setHoverActive)==null||n.call(e,!1),(l=(t=c.current)==null?void 0:t.clearPointer)==null||l.call(t)}),onKeyDown:h?void 0:(e=>{var n,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(n=c.current)==null?void 0:n.boostPopulation)==null||t.call(n))}),children:[p.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function Ae({itemWrapper:v,locked:m,onReady:R}){const h=u.useRef(!1);u.useEffect(()=>{h.current||(h.current=!0,R==null||R(v.uniqueId))},[v.uniqueId,R]);const M=u.useMemo(()=>[{speed:-4,controlDuration:"0.0001s",controlTurn:"0turn",hoverMode:"stop"},{speed:-2,controlDuration:"0.0001s",controlTurn:"0turn",hoverMode:"pause"},{speed:.5,controlDuration:"10s",controlTurn:"-1turn",hoverMode:"control"},{speed:4,controlDuration:"1s",controlTurn:"4turn",hoverMode:"control"}],[]);return p.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${m?"article-web-art-spin-boxes-locked":""}`,children:p.jsx("div",{className:"article-web-art-spin-boxes-grid",children:M.map(({speed:w,controlDuration:P,controlTurn:c,hoverMode:C})=>p.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--control-duration":P,"--control-turn":c},children:p.jsx("div",{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${C}`,"data-speed":w})},String(w)))})})}function Oe({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){const w=u.useRef(null),P=u.useRef(null),c=u.useRef(null),C=u.useRef(!1),g=u.useRef(!0),S=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),x=u.useMemo(()=>({seed:1729+(Number(v.id)||8)*4242,reduceMotion:S,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[v.id,S]);u.useEffect(()=>{if(!R)return;const t=w.current,l=P.current;if(!t||!l)return;let i=!1,s=null,d=null,a=null;const f=()=>{C.current||(C.current=!0,M==null||M(v.uniqueId))},b=z(async()=>{var y,k,I;try{const E=await B(()=>import("./shapeFieldEngine-B_ToSidK.js"),[]);if(i)return;s=E.createShapeFieldEngine(l,x),c.current=s;const j=()=>$(t,s,window.devicePixelRatio||1);j(),(y=s.renderStatic)==null||y.call(s),(k=s.triggerWave)==null||k.call(s),h||(I=s.start)==null||I.call(s),f(),d=new ResizeObserver(()=>{var L;j(),(L=s.renderStatic)==null||L.call(s)}),d.observe(t),"IntersectionObserver"in window&&(a=new IntersectionObserver(L=>{var _,A,H;for(const V of L){if(g.current=!!V.isIntersecting,h){(_=s.stop)==null||_.call(s);continue}g.current?(A=s.start)==null||A.call(s):(H=s.stop)==null||H.call(s)}},{threshold:.2}),a.observe(t))}catch{f()}});return()=>{var y;i=!0,b==null||b(),a==null||a.disconnect(),d==null||d.disconnect(),(y=s==null?void 0:s.destroy)==null||y.call(s),c.current=null}},[R,x,v.uniqueId,h,M]),u.useEffect(()=>{var l,i,s;const t=c.current;if(t){if(h){(l=t.clearPointer)==null||l.call(t),(i=t.stop)==null||i.call(t);return}g.current&&((s=t.start)==null||s.call(t))}},[h]);const o=t=>{const l=P.current||w.current;if(!l)return{x:0,y:0};const i=l.getBoundingClientRect();return{x:t.clientX-i.left,y:t.clientY-i.top}},r=t=>{var i,s;const l=o(t);(s=(i=c.current)==null?void 0:i.setPointer)==null||s.call(i,l.x,l.y)},e=t=>{var i,s,d,a;const l=o(t);(s=(i=c.current)==null?void 0:i.setPointer)==null||s.call(i,l.x,l.y),(a=(d=c.current)==null?void 0:d.triggerWave)==null||a.call(d,l.x,l.y)},n=t=>{var l,i;t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),(i=(l=c.current)==null?void 0:l.triggerWave)==null||i.call(l))};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${m+1}`,disabled:h,onPointerMove:h?void 0:r,onPointerDown:h?void 0:e,onPointerLeave:h?void 0:(()=>{var t,l;return(l=(t=c.current)==null?void 0:t.clearPointer)==null?void 0:l.call(t)}),onBlur:h?void 0:(()=>{var t,l;return(l=(t=c.current)==null?void 0:t.clearPointer)==null?void 0:l.call(t)}),onKeyDown:h?void 0:n,children:[p.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function He({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){const w=u.useRef(null),P=u.useRef(null),c=u.useRef(null),C=u.useRef(!1),g=u.useRef(!0),[S,x]=u.useState(1.1),[o,r]=u.useState(.03);u.useEffect(()=>{if(!R)return;const s=w.current,d=P.current;if(!s||!d)return;let a=!1,f=null,b=null,y=null;const k=()=>{C.current||(C.current=!0,M==null||M(v.uniqueId))},I=z(async()=>{var E,j,L;try{const _=await B(()=>import("./hourglassEngine-BZmflguM.js"),__vite__mapDeps([0,1,2]));if(a)return;f=_.createHourglassEngine(d),c.current=f;const A=(E=f.getState)==null?void 0:E.call(f);A&&(x(A.gravity),r(A.neckRatio));const H=()=>$(s,f,window.devicePixelRatio||1);H(),(j=f.renderStatic)==null||j.call(f),h||(L=f.start)==null||L.call(f),k(),b=new ResizeObserver(()=>{var V;H(),(V=f.renderStatic)==null||V.call(f)}),b.observe(s),"IntersectionObserver"in window&&(y=new IntersectionObserver(V=>{var U,G,X;for(const F of V){if(g.current=!!F.isIntersecting,h){(U=f.stop)==null||U.call(f);continue}g.current?(G=f.start)==null||G.call(f):(X=f.stop)==null||X.call(f)}},{threshold:.2}),y.observe(s))}catch{k()}});return()=>{var E;a=!0,I==null||I(),y==null||y.disconnect(),b==null||b.disconnect(),(E=f==null?void 0:f.destroy)==null||E.call(f),c.current=null}},[R,v.uniqueId,h,M]),u.useEffect(()=>{var d,a;const s=c.current;if(s){if(h){(d=s.stop)==null||d.call(s);return}g.current&&((a=s.start)==null||a.call(s))}},[h]);const e=s=>{var d,a;s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),(a=(d=c.current)==null?void 0:d.flip)==null||a.call(d))},n=s=>{s.stopPropagation()},t=s=>{s.stopPropagation()},l=s=>{var a,f;const d=Number(s.target.value);x(d),(f=(a=c.current)==null?void 0:a.setGravity)==null||f.call(a,d)},i=s=>{var a,f,b,y;const d=Number(s.target.value);r(d),(f=(a=c.current)==null?void 0:a.setNeckRatio)==null||f.call(a,d),!h&&g.current&&((y=(b=c.current)==null?void 0:b.start)==null||y.call(b))};return p.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass",role:h?void 0:"button",tabIndex:h?-1:0,"aria-label":`Hourglass web art tile ${m+1}`,onClick:h?void 0:(()=>{var s,d;return(d=(s=c.current)==null?void 0:s.flip)==null?void 0:d.call(s)}),onKeyDown:h?void 0:e,children:[p.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),p.jsxs("div",{className:"article-web-art-hourglass-controls",onClickCapture:t,onPointerDownCapture:t,onPointerUpCapture:t,onClick:n,onPointerDown:n,onPointerUp:n,onKeyDown:n,children:[p.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-left",children:[p.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Neck"}),p.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.01",max:"0.22",step:"0.001",value:o,onInput:i,onChange:i,disabled:h,"aria-label":"Hourglass neck size"})]}),p.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-right",children:[p.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Gravity"}),p.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.45",max:"2.8",step:"0.01",value:S,onInput:l,onChange:l,disabled:h,"aria-label":"Hourglass gravity"})]})]}),p.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function Be({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){const w=u.useRef(null),P=u.useRef(null),c=u.useRef(null),C=u.useRef(!1),g=u.useRef(!0),S=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);u.useEffect(()=>{if(!R)return;const r=w.current,e=P.current;if(!r||!e)return;let n=!1,t=null,l=null,i=null;const s=()=>{C.current||(C.current=!0,M==null||M(v.uniqueId))},d=z(async()=>{var a,f;try{const b=await B(()=>import("./noiceShaderEngine-6wwfZdln.js"),[]);if(n)return;t=b.createNoiceShaderEngine(e,{reduceMotion:S}),c.current=t;const y=()=>$(r,t,Math.min(1.5,window.devicePixelRatio||1));y(),(a=t.renderStatic)==null||a.call(t),h||(f=t.start)==null||f.call(t),s(),l=new ResizeObserver(()=>{var k;y(),(k=t.renderStatic)==null||k.call(t)}),l.observe(r),"IntersectionObserver"in window&&(i=new IntersectionObserver(k=>{var I,E,j;for(const L of k){if(g.current=!!L.isIntersecting,h){(I=t.stop)==null||I.call(t);continue}g.current?(E=t.start)==null||E.call(t):(j=t.stop)==null||j.call(t)}},{threshold:.25}),i.observe(r))}catch{s()}},{timeoutMs:220});return()=>{var a;n=!0,d==null||d(),i==null||i.disconnect(),l==null||l.disconnect(),(a=t==null?void 0:t.destroy)==null||a.call(t),c.current=null}},[R,v.uniqueId,h,M,S]),u.useEffect(()=>{var e,n,t;const r=c.current;if(r){if(h){(e=r.clearPointer)==null||e.call(r),(n=r.stop)==null||n.call(r);return}g.current&&((t=r.start)==null||t.call(r))}},[h]);const x=r=>{const e=P.current||w.current;if(!e)return{x:.5,y:.5};const n=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(r.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(r.clientY-n.top)/Math.max(1,n.height)))}},o=r=>{var n,t,l,i,s,d;const e=x(r);(t=(n=c.current)==null?void 0:n.setPointer)==null||t.call(n,e.x,e.y),(i=(l=c.current)==null?void 0:l.pulsePattern)==null||i.call(l),(d=(s=c.current)==null?void 0:s.start)==null||d.call(s)};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice","aria-label":`Noice web art tile ${m+1}`,disabled:h,onPointerMove:h?void 0:(r=>{var n,t;const e=x(r);(t=(n=c.current)==null?void 0:n.setPointer)==null||t.call(n,e.x,e.y)}),onPointerDown:h?void 0:(r=>{r.button!=null&&r.button!==0||o(r)}),onMouseLeave:h?void 0:(()=>{var r,e;(e=(r=c.current)==null?void 0:r.clearPointer)==null||e.call(r)}),onBlur:h?void 0:(()=>{var r,e;(e=(r=c.current)==null?void 0:r.clearPointer)==null||e.call(r)}),onKeyDown:h?void 0:(r=>{var e,n,t,l;(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),(n=(e=c.current)==null?void 0:e.pulsePattern)==null||n.call(e),(l=(t=c.current)==null?void 0:t.start)==null||l.call(t))}),children:[p.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function ze({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){const w=u.useRef(null),P=u.useRef(null),c=u.useRef(null),C=u.useRef(!0),g=u.useRef(!0),S=u.useRef(!1),x=Number(v==null?void 0:v.id)===5,o=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=u.useMemo(()=>{const i=Number(v.id)||m+1,s=.0026+i*8e-5,d=.0054+i*14e-5,a=i%2?1:2,f={kx:11+i*2,ky:i%2};return{refreshDelay:x?0:8e3,radiusMini:s,radiusMaxi:d,dHueStep:a,startGroup:f,seed:1337+i*1009,reduceMotion:o}},[x,v.id,m,o]);u.useEffect(()=>{if(!R)return;const i=w.current,s=P.current;if(!i||!s)return;let d=!1,a=null,f=null,b=null;const y=()=>{S.current||(S.current=!0,M==null||M(v.uniqueId))},k=z(async()=>{var I,E;try{const j=await B(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(d)return;a=j.createEmbroideryEngine(s,r),c.current=a;const L=()=>$(i,a,window.devicePixelRatio||1);L(),(I=a.renderStatic)==null||I.call(a),g.current&&((E=a.start)==null||E.call(a)),y(),f=new ResizeObserver(()=>{var _;L(),(_=a.renderStatic)==null||_.call(a)}),f.observe(i),"IntersectionObserver"in window&&(b=new IntersectionObserver(_=>{for(const A of _){if(g.current=!!A.isIntersecting,x){g.current||a.stop();continue}g.current&&C.current?a.start():a.stop()}},{threshold:.25}),b.observe(i))}catch{y()}});return()=>{d=!0,k==null||k(),b==null||b.disconnect(),f==null||f.disconnect(),a==null||a.destroy(),c.current=null}},[R,r,v.uniqueId,M]),u.useEffect(()=>{var s,d;const i=c.current;if(i){if(h){(s=i.stop)==null||s.call(i);return}g.current&&((d=i.start)==null||d.call(i))}},[h]),u.useEffect(()=>{var s,d;const i=c.current;if(i){if(h){(s=i.stop)==null||s.call(i);return}g.current&&((d=i.start)==null||d.call(i))}},[h]);const e=()=>{var i;C.current=!0,g.current&&((i=c.current)==null||i.start())},n=()=>{var i,s,d,a;C.current=!0,g.current?(s=(i=c.current)==null?void 0:i.start)==null||s.call(i):(a=(d=c.current)==null?void 0:d.stop)==null||a.call(d)},t=()=>{var i,s,d,a,f,b,y,k,I,E;if(x){(s=(i=c.current)==null?void 0:i.stop)==null||s.call(i),(a=(d=c.current)==null?void 0:d.reset)==null||a.call(d),(b=(f=c.current)==null?void 0:f.start)==null||b.call(f);return}(y=c.current)==null||y.reset(),(I=(k=c.current)==null?void 0:k.renderStatic)==null||I.call(k),g.current&&((E=c.current)==null||E.start())},l=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),t())};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${m+1}`,disabled:h,onClick:h?void 0:t,onMouseEnter:h||x?void 0:e,onMouseLeave:h||x?void 0:n,onFocus:h||x?void 0:e,onBlur:h||x?void 0:n,onKeyDown:h?void 0:l,children:[p.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:x?"Click":Number.isFinite(Number(v==null?void 0:v.id))?Number(v.id):m+1})]})}function $e({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){const w=u.useRef(null),P=u.useRef(null),c=u.useRef(null),C=u.useRef(!1),g=u.useRef(null),S=u.useRef(!1),x=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=u.useMemo(()=>({seed:9001+(Number(v.id)||1)*1337,reduceMotion:x,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[v.id,x]);u.useEffect(()=>{if(!R)return;const a=w.current,f=P.current;if(!a||!f)return;let b=!1,y=null,k=null;const I=()=>{C.current||(C.current=!0,M==null||M(v.uniqueId))},E=z(async()=>{var j,L;try{const _=await B(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(b)return;y=_.createSpiralDotsEngine(f,o),c.current=y;const A=()=>$(a,y,window.devicePixelRatio||1);A(),(j=y.renderStatic)==null||j.call(y),(L=y.start)==null||L.call(y),I(),k=new ResizeObserver(()=>{var H;A(),y.rebuildDots(),(H=y.renderStatic)==null||H.call(y)}),k.observe(a)}catch{I()}});return()=>{b=!0,E==null||E(),k==null||k.disconnect(),y==null||y.destroy(),c.current=null}},[R,o,v.uniqueId,M]),u.useEffect(()=>{var f,b,y;const a=c.current;if(a){if(h){(f=a.clearMouse)==null||f.call(a),(b=a.stop)==null||b.call(a);return}(y=a.start)==null||y.call(a)}},[h]);const r=a=>{const f=P.current||w.current;if(!f)return{x:-1e4,y:-1e4};const b=f.getBoundingClientRect();return{x:a.clientX-b.left,y:a.clientY-b.top}},e=()=>{var a;(a=c.current)==null||a.start()},n=()=>{var a,f;(a=c.current)==null||a.clearMouse(),(f=c.current)==null||f.start()},t=()=>{e()},l=()=>{n()},i=a=>{var b;const f=r(a);(b=c.current)==null||b.setMouse(f.x,f.y)},s=()=>{e()},d=()=>{n()};return p.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:h?-1:0,"aria-label":`Spiral dots web art tile ${m+1}`,onPointerDown:h?void 0:a=>{var y;if(a.pointerType==="mouse")return;const f=w.current;if(!f)return;S.current=!0,g.current=a.pointerId;try{f.setPointerCapture(a.pointerId)}catch{}e();const b=r(a);(y=c.current)==null||y.setMouse(b.x,b.y)},onPointerMove:h?void 0:a=>{var b;if(!S.current||g.current!=null&&a.pointerId!==g.current)return;const f=r(a);(b=c.current)==null||b.setMouse(f.x,f.y)},onPointerUp:h?void 0:a=>{g.current!=null&&a.pointerId!==g.current||(S.current=!1,g.current=null,n())},onPointerCancel:h?void 0:()=>{S.current=!1,g.current=null,n()},onMouseEnter:h?void 0:t,onMouseLeave:h?void 0:l,onMouseMove:h?void 0:i,onFocus:h?void 0:s,onBlur:h?void 0:d,children:[p.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function Fe({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){const w=u.useRef(null),P=u.useRef(null),c=u.useRef(null),C=u.useRef(!0),g=u.useRef(!0),S=u.useRef(!1),x=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=u.useMemo(()=>({seed:424242+(Number(v.id)||2)*2027,reduceMotion:x,targetCellSize:14,gapPx:1.4}),[v.id,x]);u.useEffect(()=>{if(!R)return;const i=w.current,s=P.current;if(!i||!s)return;let d=!1,a=null,f=null,b=null;const y=()=>{S.current||(S.current=!0,M==null||M(v.uniqueId))},k=z(async()=>{var I,E;try{const j=await B(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(d)return;a=j.createGridWaveEngine(s,o),c.current=a;const L=()=>$(i,a,window.devicePixelRatio||1);L(),(I=a.renderStatic)==null||I.call(a),g.current&&((E=a.start)==null||E.call(a)),y(),f=new ResizeObserver(()=>{var _;L(),(_=a.renderStatic)==null||_.call(a)}),f.observe(i),"IntersectionObserver"in window&&(b=new IntersectionObserver(_=>{for(const A of _)g.current=!!A.isIntersecting,g.current&&C.current?a.start():a.stop()},{threshold:.25}),b.observe(i))}catch{y()}});return()=>{d=!0,k==null||k(),b==null||b.disconnect(),f==null||f.disconnect(),a==null||a.destroy(),c.current=null}},[R,o,v.uniqueId,M]);const r=()=>{var i;C.current=!0,g.current&&((i=c.current)==null||i.start())},e=()=>{var i,s,d,a;C.current=!0,g.current?(s=(i=c.current)==null?void 0:i.start)==null||s.call(i):(a=(d=c.current)==null?void 0:d.stop)==null||a.call(d)},n=i=>{const s=P.current||w.current;if(!s)return{x:0,y:0};const d=s.getBoundingClientRect();return typeof(i==null?void 0:i.clientX)!="number"||typeof(i==null?void 0:i.clientY)!="number"?{x:d.width/2,y:d.height/2}:{x:i.clientX-d.left,y:i.clientY-d.top}},t=i=>{var d,a,f,b;const s=n(i);(d=c.current)==null||d.rippleAt(s.x,s.y),(f=(a=c.current)==null?void 0:a.renderStatic)==null||f.call(a),C.current&&g.current&&((b=c.current)==null||b.start())},l=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),t(null))};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${m+1}`,disabled:h,onClick:h?void 0:t,onMouseEnter:h?void 0:r,onMouseLeave:h?void 0:e,onFocus:h?void 0:r,onBlur:h?void 0:e,onKeyDown:h?void 0:l,children:[p.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function qe({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){const w=u.useRef(null),P=u.useRef(null),c=u.useRef(null),C=u.useRef(!0),g=u.useRef(!0),S=u.useRef(!1),x=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=u.useMemo(()=>({reduceMotion:x,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[x]);u.useEffect(()=>{if(!R)return;const l=w.current,i=P.current;if(!l||!i)return;let s=!1,d=null,a=null,f=null,b=null;const y=()=>{S.current||(S.current=!0,M==null||M(v.uniqueId))},k=async()=>{var _;const E=await B(()=>import("./threeTunnelEngine-DluWj-Nj.js"),__vite__mapDeps([3,4]));if(s)return;d=E.createThreeTunnelEngine(i,o),c.current=d;const j=()=>$(l,d,Math.min(1.5,window.devicePixelRatio||1));return j(),d.reset(),g.current&&((_=d.start)==null||_.call(d)),y(),a=new ResizeObserver(()=>{j(),d.reset()}),a.observe(l),"IntersectionObserver"in window&&(f=new IntersectionObserver(A=>{for(const H of A)g.current=!!H.isIntersecting,g.current&&C.current?d.start():d.stop()},{threshold:.25}),f.observe(l)),()=>{f==null||f.disconnect(),a==null||a.disconnect(),d.destroy(),c.current=null}};let I=null;return b=z(()=>{k().then(E=>{I=E||null}).catch(()=>{y()})},{timeoutMs:300}),()=>{s=!0,b==null||b(),I==null||I()}},[R,o,v.uniqueId,M]),u.useEffect(()=>{var i,s,d;const l=c.current;if(l){if(h){(i=l.setHeld)==null||i.call(l,!1),(s=l.stop)==null||s.call(l);return}g.current&&((d=l.start)==null||d.call(l))}},[h]);const r=()=>{var l;C.current=!0,g.current&&((l=c.current)==null||l.start())},e=()=>{var l,i,s,d;C.current=!0,g.current?(i=(l=c.current)==null?void 0:l.start)==null||i.call(l):(d=(s=c.current)==null?void 0:s.stop)==null||d.call(s)},n=()=>{var l,i,s,d;(i=(l=c.current)==null?void 0:l.nextPalette)==null||i.call(l),(s=c.current)==null||s.reset(),g.current&&((d=c.current)==null||d.start())},t=l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),n())};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${m+1}`,disabled:h,onClick:h?void 0:n,onMouseEnter:h?void 0:r,onMouseLeave:h?void 0:e,onFocus:h?void 0:r,onBlur:h?void 0:e,onKeyDown:h?void 0:t,children:[p.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),p.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),p.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Ke({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){const w=u.useRef(null),P=u.useRef(null),c=u.useRef(null),C=u.useRef(!0),g=u.useRef(!0),S=u.useRef(!1),x=u.useRef(null),o=u.useRef(null),r=u.useRef(!1),e=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=u.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,h]);u.useEffect(()=>{if(!R)return;const i=w.current,s=P.current;if(!i||!s)return;let d=!1,a=null,f=null;const b=()=>{S.current||(S.current=!0,M==null||M(v.uniqueId))},y=async()=>{var _;const k=await B(()=>import("./threePolygonDemo5Engine-C8j4d7sj.js"),__vite__mapDeps([5,4]));if(d)return;const I=k.createThreePolygonDemo5Engine(s,n);c.current=I;const E=()=>$(i,I,Math.min(1.2,window.devicePixelRatio||1));E(),I.reset(),window.requestAnimationFrame(()=>{d||c.current!==I||(E(),I.reset())}),g.current&&((_=I.start)==null||_.call(I)),b();const j=new ResizeObserver(()=>{E()});j.observe(i);let L=null;"IntersectionObserver"in window&&(L=new IntersectionObserver(A=>{for(const H of A)g.current=!!H.isIntersecting,g.current&&C.current?I.start():I.stop()},{threshold:.25}),L.observe(i)),a=()=>{L==null||L.disconnect(),j.disconnect(),I.destroy(),c.current=null}};return f=z(()=>{y().catch(()=>{b()})},{timeoutMs:300}),()=>{d=!0,f==null||f(),o.current!=null&&window.clearTimeout(o.current),a==null||a()}},[R,n,v.uniqueId,M]);const t=()=>{var i,s,d;(s=(i=c.current)==null?void 0:i.boost)==null||s.call(i),g.current&&((d=c.current)==null||d.start())},l=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),t())};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${m+1}`,disabled:h,onKeyDown:h?void 0:l,onPointerDown:h?void 0:i=>{var s;if(!(i.button!=null&&i.button!==0)){x.current=i.pointerId,r.current=!1;try{i.currentTarget.setPointerCapture(i.pointerId)}catch{}g.current&&((s=c.current)==null||s.start()),o.current!=null&&window.clearTimeout(o.current),o.current=window.setTimeout(()=>{var d,a;x.current!=null&&(r.current=!0,(a=(d=c.current)==null?void 0:d.setHeld)==null||a.call(d,!0))},140)}},onPointerUp:h?void 0:i=>{var s,d;x.current!=null&&i.pointerId!==x.current||(o.current!=null&&(window.clearTimeout(o.current),o.current=null),x.current=null,r.current?(r.current=!1,(d=(s=c.current)==null?void 0:s.setHeld)==null||d.call(s,!1)):t())},onPointerCancel:h?void 0:(()=>{var i,s;o.current!=null&&(window.clearTimeout(o.current),o.current=null),x.current=null,r.current=!1,(s=(i=c.current)==null?void 0:i.setHeld)==null||s.call(i,!1)}),onLostPointerCapture:h?void 0:(()=>{var i,s;o.current!=null&&(window.clearTimeout(o.current),o.current=null),x.current=null,r.current=!1,(s=(i=c.current)==null?void 0:i.setHeld)==null||s.call(i,!1)}),onMouseEnter:h?void 0:(()=>{var i;C.current=!0,g.current&&((i=c.current)==null||i.start())}),onMouseLeave:h?void 0:(()=>{var i,s,d,a;o.current!=null&&(window.clearTimeout(o.current),o.current=null),x.current=null,r.current=!1,(s=(i=c.current)==null?void 0:i.setHeld)==null||s.call(i,!1),C.current=!0,g.current?(d=c.current)==null||d.start():(a=c.current)==null||a.stop()}),onFocus:h?void 0:(()=>{var i;C.current=!0,g.current&&((i=c.current)==null||i.start())}),onBlur:h?void 0:(()=>{var i,s,d,a;o.current!=null&&(window.clearTimeout(o.current),o.current=null),x.current=null,r.current=!1,(s=(i=c.current)==null?void 0:i.setHeld)==null||s.call(i,!1),C.current=!0,g.current?(d=c.current)==null||d.start():(a=c.current)==null||a.stop()}),children:[p.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function Ve({itemWrapper:v,index:m,activate:R,locked:h,onReady:M}){const w=u.useRef(null),P=u.useRef(null),c=u.useRef(null),C=u.useRef(!0),g=u.useRef(!0),S=u.useRef(!1),x=u.useRef(0),o=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=u.useMemo(()=>({reduceMotion:o,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[o]);u.useEffect(()=>{if(!R)return;const i=w.current,s=P.current;if(!i||!s)return;let d=!1,a=null,f=null,b=null;const y=()=>{S.current||(S.current=!0,M==null||M(v.uniqueId))},k=z(async()=>{var I,E;try{const j=await B(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(d)return;a=j.createOrbitCirclesEngine(s,r),c.current=a;const L=()=>$(i,a,window.devicePixelRatio||1);L(),a.reset(),(I=a.renderStatic)==null||I.call(a),g.current&&((E=a.start)==null||E.call(a)),y(),f=new ResizeObserver(()=>{var _;L(),(_=a.renderStatic)==null||_.call(a)}),f.observe(i),"IntersectionObserver"in window&&(b=new IntersectionObserver(_=>{for(const A of _)g.current=!!A.isIntersecting,g.current&&C.current?a.start():a.stop()},{threshold:.25}),b.observe(i))}catch{y()}});return()=>{d=!0,k==null||k(),b==null||b.disconnect(),f==null||f.disconnect(),a==null||a.destroy(),c.current=null}},[R,r,v.uniqueId,M]),u.useEffect(()=>{var s,d;const i=c.current;if(i){if(h){(s=i.stop)==null||s.call(i);return}g.current&&((d=i.start)==null||d.call(i))}},[h]);const e=()=>{var i;C.current=!0,g.current&&((i=c.current)==null||i.start())},n=()=>{var i,s,d,a;C.current=!0,g.current?(s=(i=c.current)==null?void 0:i.start)==null||s.call(i):(a=(d=c.current)==null?void 0:d.stop)==null||a.call(d)},t=()=>{var f,b,y;const i=c.current;if(!i)return;const s=Math.max(1,((f=i.getTotalCircles)==null?void 0:f.call(i))||1),d=x.current%s,a=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`;(b=i.setCircleColor)==null||b.call(i,d,a),x.current+=1,g.current&&((y=i.start)==null||y.call(i))},l=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),t())};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${m+1}`,disabled:h,onClick:h?void 0:t,onMouseEnter:h?void 0:e,onMouseLeave:h?void 0:n,onFocus:h?void 0:e,onBlur:h?void 0:n,onKeyDown:h?void 0:l,children:[p.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function Ge({readyId:v,locked:m,onReady:R}){const h=u.useRef(null),M=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),c=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=u.useMemo(()=>({seed:20250414,reduceMotion:c,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[c]);u.useEffect(()=>{const x=h.current,o=M.current;if(!x||!o)return;let r=!1,e=null,n=null,t=null;const l=()=>{P.current||(P.current=!0,R==null||R(v))},i=z(async()=>{var s,d;try{const a=await B(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(r)return;e=a.createTortuosityTraceEngine(o,C),w.current=e;const f=()=>$(x,e,Math.min(1.5,window.devicePixelRatio||1));f(),(s=e.renderStatic)==null||s.call(e),(d=e.start)==null||d.call(e),l(),n=new ResizeObserver(()=>{var b;f(),(b=e.reset)==null||b.call(e)}),n.observe(x),"IntersectionObserver"in window&&(t=new IntersectionObserver(b=>{var y,k;for(const I of b)I.isIntersecting?(y=e.start)==null||y.call(e):(k=e.stop)==null||k.call(e)},{threshold:.25}),t.observe(x))}catch{l()}},{timeoutMs:200});return()=>{var s;r=!0,i==null||i(),t==null||t.disconnect(),n==null||n.disconnect(),(s=e==null?void 0:e.destroy)==null||s.call(e),w.current=null}},[C,R,v]),u.useEffect(()=>{var o,r,e;const x=w.current;if(x){if(m){(o=x.setHeld)==null||o.call(x,!1),(r=x.stop)==null||r.call(x);return}(e=x.start)==null||e.call(x)}},[m]),u.useEffect(()=>{var o,r;const x=w.current;if(x){if(m){(o=x.stop)==null||o.call(x);return}(r=x.start)==null||r.call(x)}},[m]);const g=()=>{var x,o,r,e;(o=(x=w.current)==null?void 0:x.reset)==null||o.call(x),(e=(r=w.current)==null?void 0:r.start)==null||e.call(r)},S=x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),g())};return p.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:m,onClick:m?void 0:g,onKeyDown:m?void 0:S,children:[p.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function Ue({readyId:v,locked:m,onReady:R}){const h=u.useRef(null),M=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),c=u.useRef(null),C=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=u.useMemo(()=>({seed:20250415,reduceMotion:C,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[C]);u.useEffect(()=>{const r=h.current,e=M.current;if(!r||!e)return;let n=!1,t=null,l=null,i=null;const s=()=>{P.current||(P.current=!0,R==null||R(v))},d=z(async()=>{var a,f;try{const b=await B(()=>import("./hexFlowBallsEngine-Bzfny-m0.js"),[]);if(n)return;t=b.createHexFlowBallsEngine(e,g),w.current=t;const y=()=>$(r,t,Math.min(1.5,window.devicePixelRatio||1));y(),(a=t.renderStatic)==null||a.call(t),(f=t.start)==null||f.call(t),s(),l=new ResizeObserver(()=>{var k;y(),(k=t.renderStatic)==null||k.call(t)}),l.observe(r),"IntersectionObserver"in window&&(i=new IntersectionObserver(k=>{var I,E;for(const j of k)j.isIntersecting?(I=t.start)==null||I.call(t):(E=t.stop)==null||E.call(t)},{threshold:.25}),i.observe(r))}catch{s()}},{timeoutMs:220});return()=>{var a;n=!0,d==null||d(),i==null||i.disconnect(),l==null||l.disconnect(),(a=t==null?void 0:t.destroy)==null||a.call(t),w.current=null}},[g,R,v]),u.useEffect(()=>{var e,n,t;const r=w.current;if(r){if(m){(e=r.clearPointer)==null||e.call(r),(n=r.stop)==null||n.call(r);return}(t=r.start)==null||t.call(r)}},[m]);const S=r=>{const e=h.current;if(!e)return{x:.5,y:.5};const n=e.getBoundingClientRect();return{x:n.width>0?(r.clientX-n.left)/n.width:.5,y:n.height>0?(r.clientY-n.top)/n.height:.5}},x=()=>{var r,e,n,t;(e=(r=w.current)==null?void 0:r.burst)==null||e.call(r),(t=(n=w.current)==null?void 0:n.start)==null||t.call(n)},o=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),x())};return p.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:m,onClick:m?void 0:x,onPointerDown:m?void 0:(r=>{var n,t;c.current=r.pointerId;try{r.currentTarget.setPointerCapture(r.pointerId)}catch{}const e=S(r);(t=(n=w.current)==null?void 0:n.setPointer)==null||t.call(n,e.x,e.y)}),onPointerMove:m?void 0:(r=>{var n,t;if(c.current!=null&&r.pointerId!==c.current)return;const e=S(r);(t=(n=w.current)==null?void 0:n.setPointer)==null||t.call(n,e.x,e.y)}),onPointerUp:m?void 0:(r=>{c.current!=null&&r.pointerId!==c.current||(c.current=null)}),onPointerCancel:m?void 0:(()=>{var r,e;c.current=null,(e=(r=w.current)==null?void 0:r.clearPointer)==null||e.call(r)}),onMouseMove:m?void 0:(r=>{var n,t;const e=S(r);(t=(n=w.current)==null?void 0:n.setPointer)==null||t.call(n,e.x,e.y)}),onMouseLeave:m?void 0:(()=>{var r,e;c.current=null,(e=(r=w.current)==null?void 0:r.clearPointer)==null||e.call(r)}),onBlur:m?void 0:(()=>{var r,e;c.current=null,(e=(r=w.current)==null?void 0:r.clearPointer)==null||e.call(r)}),onKeyDown:m?void 0:o,children:[p.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function Ye({readyId:v,locked:m,onReady:R}){const h=u.useRef(null),M=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),c=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=u.useMemo(()=>({seed:20250416,reduceMotion:c,step:6,side:5}),[c]);u.useEffect(()=>{const o=h.current,r=M.current;if(!o||!r)return;let e=!1,n=null,t=null,l=null;const i=()=>{P.current||(P.current=!0,R==null||R(v))},s=z(async()=>{var d,a;try{const f=await B(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;n=f.createPixelPlopEngine(r,C),w.current=n;const b=()=>$(o,n,Math.min(1.5,window.devicePixelRatio||1));b(),(d=n.renderStatic)==null||d.call(n),(a=n.start)==null||a.call(n),i(),t=new ResizeObserver(()=>{var y;b(),(y=n.reset)==null||y.call(n)}),t.observe(o),"IntersectionObserver"in window&&(l=new IntersectionObserver(y=>{var k,I;for(const E of y)E.isIntersecting?(k=n.start)==null||k.call(n):(I=n.stop)==null||I.call(n)},{threshold:.25}),l.observe(o))}catch{i()}},{timeoutMs:220});return()=>{var d;e=!0,s==null||s(),l==null||l.disconnect(),t==null||t.disconnect(),(d=n==null?void 0:n.destroy)==null||d.call(n),w.current=null}},[C,R,v]),u.useEffect(()=>{var r,e,n;const o=w.current;if(o){if(m){(r=o.clearPointer)==null||r.call(o),(e=o.stop)==null||e.call(o);return}(n=o.start)==null||n.call(o)}},[m]),u.useEffect(()=>{var r,e;const o=w.current;if(o){if(m){(r=o.stop)==null||r.call(o);return}(e=o.start)==null||e.call(o)}},[m]);const g=()=>{var o,r,e,n;(r=(o=w.current)==null?void 0:o.seedBurst)==null||r.call(o),(n=(e=w.current)==null?void 0:e.start)==null||n.call(e)},S=o=>{var n,t,l,i;const r=M.current||h.current;if(!r||typeof(o==null?void 0:o.clientX)!="number"||typeof(o==null?void 0:o.clientY)!="number"){g();return}const e=r.getBoundingClientRect();(t=(n=w.current)==null?void 0:n.burstAt)==null||t.call(n,o.clientX-e.left,o.clientY-e.top),(i=(l=w.current)==null?void 0:l.start)==null||i.call(l)},x=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),g())};return p.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:m,onPointerDown:m?void 0:(o=>{o.button!=null&&o.button!==0||S(o)}),onKeyDown:m?void 0:x,children:[p.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function Xe({readyId:v,locked:m,onReady:R}){const h=u.useRef(null),M=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),c=u.useRef(null),C=u.useRef(!1),g=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),S=u.useMemo(()=>({reduceMotion:g,seed:20250417}),[g]);u.useEffect(()=>{const e=h.current,n=M.current;if(!e||!n)return;let t=!1,l=null,i=null,s=null;const d=()=>{P.current||(P.current=!0,R==null||R(v))},a=z(async()=>{var f,b;try{const y=await B(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(t)return;l=y.createJuliaLinesEngine(n,S),w.current=l;const k=()=>$(e,l,Math.min(1.5,window.devicePixelRatio||1));k(),(f=l.renderStatic)==null||f.call(l),(b=l.start)==null||b.call(l),d(),i=new ResizeObserver(()=>{k()}),i.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var E,j;for(const L of I)L.isIntersecting?(E=l.start)==null||E.call(l):(j=l.stop)==null||j.call(l)},{threshold:.25}),s.observe(e))}catch{d()}},{timeoutMs:220});return()=>{var f;t=!0,a==null||a(),s==null||s.disconnect(),i==null||i.disconnect(),(f=l==null?void 0:l.destroy)==null||f.call(l),w.current=null}},[S,R,v]),u.useEffect(()=>{var n,t,l,i;const e=w.current;if(e){if(m){(n=e.setHeld)==null||n.call(e,!1),(t=e.clearPointer)==null||t.call(e),(l=e.stop)==null||l.call(e);return}(i=e.start)==null||i.call(e)}},[m]),u.useEffect(()=>{var n,t,l;const e=w.current;if(e){if(m){(n=e.clearPointer)==null||n.call(e),(t=e.stop)==null||t.call(e);return}(l=e.start)==null||l.call(e)}},[m]);const x=e=>{const n=h.current;if(!n)return{x:.4,y:.5};const t=n.getBoundingClientRect(),l=(e.clientX-t.left)/Math.max(1,t.width),i=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,l)),y:Math.max(0,Math.min(1,i))}},o=()=>{var e,n,t,l;(n=(e=w.current)==null?void 0:e.reset)==null||n.call(e),(l=(t=w.current)==null?void 0:t.start)==null||l.call(t)},r=e=>{var t,l,i,s,d,a,f,b;const n=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(l=(t=w.current)==null?void 0:t.nudge)==null||l.call(t,0,-n)):e.key==="ArrowDown"?(e.preventDefault(),(s=(i=w.current)==null?void 0:i.nudge)==null||s.call(i,0,n)):e.key==="ArrowLeft"?(e.preventDefault(),(a=(d=w.current)==null?void 0:d.nudge)==null||a.call(d,-n,0)):e.key==="ArrowRight"?(e.preventDefault(),(b=(f=w.current)==null?void 0:f.nudge)==null||b.call(f,n,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),o())};return p.jsxs("div",{ref:h,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:m?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:m?void 0:e=>{var l,i;const n=h.current;if(!n)return;C.current=!0,c.current=e.pointerId;try{n.setPointerCapture(e.pointerId)}catch{}const t=x(e);(i=(l=w.current)==null?void 0:l.setPointer)==null||i.call(l,t.x,t.y)},onPointerMove:m?void 0:e=>{var t,l;if(C.current&&c.current!=null&&e.pointerId!==c.current)return;const n=x(e);(l=(t=w.current)==null?void 0:t.setPointer)==null||l.call(t,n.x,n.y)},onPointerUp:m?void 0:e=>{var n,t;c.current!=null&&e.pointerId!==c.current||(C.current=!1,c.current=null,(t=(n=w.current)==null?void 0:n.clearPointer)==null||t.call(n))},onPointerCancel:m?void 0:()=>{var e,n;C.current=!1,c.current=null,(n=(e=w.current)==null?void 0:e.clearPointer)==null||n.call(e)},onMouseMove:m?void 0:e=>{var t,l;const n=x(e);(l=(t=w.current)==null?void 0:t.setPointer)==null||l.call(t,n.x,n.y)},onMouseLeave:m?void 0:(()=>{var e,n;(n=(e=w.current)==null?void 0:e.clearPointer)==null||n.call(e)}),onBlur:m?void 0:(()=>{var e,n;(n=(e=w.current)==null?void 0:e.clearPointer)==null||n.call(e)}),onKeyDown:m?void 0:r,onClick:m?void 0:o,children:[p.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function Je({readyId:v,locked:m,onReady:R}){const[h,M]=u.useState(0),[w,P]=u.useState("mine"),[c,C]=u.useState(()=>new Set),[g,S]=u.useState(()=>new Set),[x,o]=u.useState("playing"),[r,e]=u.useState(null),[n,t]=u.useState(0),l=u.useMemo(()=>Ne(),[h]);u.useEffect(()=>{R==null||R(v)},[R,v]),u.useEffect(()=>{P("mine"),C(new Set),S(new Set),o("playing"),e(null),t(0)},[h]),u.useEffect(()=>{if(r==null||x!=="playing")return;const b=()=>{t(Math.min(5999,Math.floor((Date.now()-r)/1e3)))};b();const y=window.setInterval(b,1e3);return()=>{window.clearInterval(y)}},[r,x]);const i=()=>{M(b=>b+1)},s=b=>{if(m||x!=="playing")return;if(r==null&&e(Date.now()),w==="flag"){if(c.has(b))return;const k=new Set(g);k.has(b)?k.delete(b):k.add(b),S(k),le(l,c,k)&&o("won");return}if(g.has(b)||c.has(b))return;if(l.mines.has(b)){const k=new Set(c);for(const I of l.mines)k.add(I);k.add(b),C(k),o("lost");return}const y=Ee(b,l,c,g);C(y),le(l,y,g)&&o("won")},d=l.mineCount-g.size,a=`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`;let f="🤔";return x==="lost"?f="😣":x==="won"?f="😎":g.size>=l.mineCount?f="😕":g.size>=l.mineCount-1?f="🤓":g.size>=Math.round(l.mineCount*3/4)?f="😃":g.size>=Math.round(l.mineCount*2/3)?f="😊":g.size>=Math.round(l.mineCount/2)?f="🙂":g.size>=Math.round(l.mineCount/3)?f="😏":g.size>0&&(f="😐"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:p.jsxs("div",{className:"article-web-art-minesweeper",children:[p.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[p.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${w==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("mine"),disabled:m||x!=="playing","aria-pressed":w==="mine",children:"⛏"}),p.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${w==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("flag"),disabled:m||x!=="playing","aria-pressed":w==="flag",children:"🚩"})]}),p.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[l.counts.map((b,y)=>{const k=c.has(y),I=g.has(y),E=l.mines.has(y),j=x==="lost"&&E,L=b>0?Se[b-1]:void 0;return p.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${k?"article-web-art-minesweeper-cell-revealed":""} ${j?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>s(y),disabled:m||x!=="playing","aria-label":`Minesweeper cell ${y+1}`,children:[I&&!k?p.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,j?p.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,k&&!E&&b>0?p.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:L},children:b}):null]},`mine-${h}-${y}`)}),x==="lost"?p.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:i,children:["Ooohhh 🙁",p.jsx("br",{}),"Click to try again"]}):null,x==="won"?p.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:i,children:["👌👀✔💯💯💯",p.jsx("br",{}),"Click to restart"]}):null]}),p.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[p.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[p.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:f}),p.jsx("span",{children:d})]}),p.jsx("div",{className:"article-web-art-minesweeper-timer",children:a})]}),p.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function Ze({readyId:v,locked:m,onReady:R}){const h=u.useRef(null),M=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),c=u.useRef(null),C=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=u.useMemo(()=>({reduceMotion:C}),[C]);u.useEffect(()=>{const r=h.current,e=M.current;if(!r||!e)return;let n=!1,t=null,l=null,i=null;const s=()=>{P.current||(P.current=!0,R==null||R(v))},d=z(async()=>{var a,f;try{const b=await B(()=>import("./fallingRingsEngine-CgfU8E0P.js"),[]);if(n)return;t=b.createFallingRingsEngine(e,g),w.current=t;const y=()=>$(r,t,Math.min(1.5,window.devicePixelRatio||1));y(),(a=t.renderStatic)==null||a.call(t),(f=t.start)==null||f.call(t),s(),l=new ResizeObserver(()=>{y()}),l.observe(r),"IntersectionObserver"in window&&(i=new IntersectionObserver(k=>{var I,E;for(const j of k)j.isIntersecting?(I=t.start)==null||I.call(t):(E=t.stop)==null||E.call(t)},{threshold:.25}),i.observe(r))}catch{s()}},{timeoutMs:220});return()=>{var a;n=!0,d==null||d(),i==null||i.disconnect(),l==null||l.disconnect(),(a=t==null?void 0:t.destroy)==null||a.call(t),w.current=null}},[g,R,v]);const S=r=>{var e,n,t,l;(n=(e=w.current)==null?void 0:e.setHeld)==null||n.call(e,r),(l=(t=w.current)==null?void 0:t.start)==null||l.call(t)},x=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),S(!0))},o=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),S(!1))};return p.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:m,onPointerDown:m?void 0:r=>{c.current=r.pointerId;try{r.currentTarget.setPointerCapture(r.pointerId)}catch{}S(!0)},onPointerUp:m?void 0:r=>{c.current!=null&&r.pointerId!==c.current||(c.current=null,S(!1))},onPointerCancel:m?void 0:()=>{c.current=null,S(!1)},onLostPointerCapture:m?void 0:()=>{c.current=null,S(!1)},onMouseLeave:m?void 0:(()=>{c.current!=null&&S(!1)}),onBlur:m?void 0:(()=>{c.current=null,S(!1)}),onKeyDown:m?void 0:x,onKeyUp:m?void 0:o,children:[p.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function Qe({readyId:v,locked:m,onReady:R}){const h=u.useRef(null),M=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),c=u.useRef(null),C=u.useRef("mouse"),g=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),S=u.useMemo(()=>({reduceMotion:g,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[g]);u.useEffect(()=>{const o=h.current,r=M.current;if(!o||!r)return;let e=!1,n=null,t=null,l=null;const i=()=>{P.current||(P.current=!0,R==null||R(v))},s=z(async()=>{var d,a;try{const f=await B(()=>import("./prismFieldEngine-Dkw-H_-R.js"),__vite__mapDeps([6,4]));if(e)return;n=f.createPrismFieldEngine(r,S),w.current=n;const b=()=>$(o,n,Math.min(1.5,window.devicePixelRatio||1));b(),(d=n.renderStatic)==null||d.call(n),(a=n.start)==null||a.call(n),i(),t=new ResizeObserver(()=>{b()}),t.observe(o),"IntersectionObserver"in window&&(l=new IntersectionObserver(y=>{var k,I;for(const E of y)E.isIntersecting?(k=n.start)==null||k.call(n):(I=n.stop)==null||I.call(n)},{threshold:.25}),l.observe(o))}catch{i()}},{timeoutMs:220});return()=>{var d;e=!0,s==null||s(),l==null||l.disconnect(),t==null||t.disconnect(),(d=n==null?void 0:n.destroy)==null||d.call(n),w.current=null}},[S,R,v]);const x=o=>{const r=h.current;if(!r)return{x:.5,y:.5};const e=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(o.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(o.clientY-e.top)/Math.max(1,e.height)))}};return p.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:m,onClick:m?void 0:(()=>{var o,r,e,n;(r=(o=w.current)==null?void 0:o.reset)==null||r.call(o),(n=(e=w.current)==null?void 0:e.start)==null||n.call(e)}),onPointerDown:m?void 0:o=>{var e,n;c.current=o.pointerId,C.current=o.pointerType||"mouse";try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const r=x(o);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,r.x,r.y)},onPointerMove:m?void 0:o=>{var e,n;if(c.current!=null&&o.pointerId!==c.current)return;const r=x(o);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,r.x,r.y)},onPointerUp:m?void 0:o=>{var r,e;c.current!=null&&o.pointerId!==c.current||(c.current=null,(o.pointerType||C.current)==="mouse"&&((e=(r=w.current)==null?void 0:r.clearPointer)==null||e.call(r)))},onPointerCancel:m?void 0:(()=>{var o,r;c.current=null,C.current==="mouse"&&((r=(o=w.current)==null?void 0:o.clearPointer)==null||r.call(o))}),onMouseMove:m?void 0:o=>{var e,n;const r=x(o);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,r.x,r.y)},onMouseLeave:m?void 0:(()=>{var o,r;c.current=null,(r=(o=w.current)==null?void 0:o.clearPointer)==null||r.call(o)}),onBlur:m?void 0:(()=>{var o,r;c.current=null,C.current="mouse",(r=(o=w.current)==null?void 0:o.clearPointer)==null||r.call(o)}),onKeyDown:m?void 0:(o=>{var r,e,n,t;(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),(e=(r=w.current)==null?void 0:r.reset)==null||e.call(r),(t=(n=w.current)==null?void 0:n.start)==null||t.call(n))}),children:[p.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function We({readyId:v,locked:m,onReady:R}){const h=u.useRef(null),M=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),c=u.useRef(null),C=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=u.useMemo(()=>({reduceMotion:C}),[C]);u.useEffect(()=>{const o=h.current,r=M.current;if(!o||!r)return;let e=!1,n=null,t=null,l=null;const i=()=>{P.current||(P.current=!0,R==null||R(v))},s=z(async()=>{var d,a;try{const f=await B(()=>import("./ropeLightEngine-B3dT-ds-.js"),[]);if(e)return;n=f.createRopeLightEngine(r,g),w.current=n;const b=()=>$(o,n,Math.min(1.5,window.devicePixelRatio||1));b(),(d=n.renderStatic)==null||d.call(n),(a=n.start)==null||a.call(n),i(),t=new ResizeObserver(()=>{b()}),t.observe(o),"IntersectionObserver"in window&&(l=new IntersectionObserver(y=>{var k,I;for(const E of y)E.isIntersecting?(k=n.start)==null||k.call(n):(I=n.stop)==null||I.call(n)},{threshold:.25}),l.observe(o))}catch{i()}},{timeoutMs:220});return()=>{var d;e=!0,s==null||s(),l==null||l.disconnect(),t==null||t.disconnect(),(d=n==null?void 0:n.destroy)==null||d.call(n),w.current=null}},[g,R,v]);const S=o=>{const r=h.current;if(!r)return{x:.5,y:.5};const e=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(o.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(o.clientY-e.top)/Math.max(1,e.height)))}},x=()=>{var o,r,e,n;(r=(o=w.current)==null?void 0:o.reset)==null||r.call(o),(n=(e=w.current)==null?void 0:e.start)==null||n.call(e)};return p.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:m,onClick:m?void 0:x,onPointerDown:m?void 0:o=>{var e,n;c.current=o.pointerId;const r=S(o);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,r.x,r.y)},onPointerMove:m?void 0:o=>{var e,n;if(c.current!=null&&o.pointerId!==c.current)return;const r=S(o);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,r.x,r.y)},onPointerUp:m?void 0:o=>{var r,e;c.current!=null&&o.pointerId!==c.current||(c.current=null,(e=(r=w.current)==null?void 0:r.clearPointer)==null||e.call(r))},onPointerCancel:m?void 0:(()=>{var o,r;c.current=null,(r=(o=w.current)==null?void 0:o.clearPointer)==null||r.call(o)}),onMouseMove:m?void 0:o=>{var e,n;const r=S(o);(n=(e=w.current)==null?void 0:e.setPointer)==null||n.call(e,r.x,r.y)},onMouseLeave:m?void 0:(()=>{var o,r;c.current=null,(r=(o=w.current)==null?void 0:o.clearPointer)==null||r.call(o)}),onBlur:m?void 0:(()=>{var o,r;c.current=null,(r=(o=w.current)==null?void 0:o.clearPointer)==null||r.call(o)}),onKeyDown:m?void 0:(o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),x())}),children:[p.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}function et({readyId:v,locked:m,onReady:R}){const h=u.useRef(null),M=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),c=u.useRef(null),C=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=u.useMemo(()=>({reduceMotion:C}),[C]);u.useEffect(()=>{const x=h.current,o=M.current;if(!x||!o)return;let r=!1,e=null,n=null,t=null;const l=()=>{P.current||(P.current=!0,R==null||R(v))},i=z(async()=>{var s,d;try{const a=await B(()=>import("./soupShaderEngine-DOT8TiBo.js"),__vite__mapDeps([7,4]));if(r)return;e=a.createSoupShaderEngine(o,g),w.current=e;const f=()=>$(x,e,Math.min(1.5,window.devicePixelRatio||1));f(),(s=e.renderStatic)==null||s.call(e),(d=e.start)==null||d.call(e),l(),n=new ResizeObserver(()=>{f()}),n.observe(x),"IntersectionObserver"in window&&(t=new IntersectionObserver(b=>{var y,k;for(const I of b)I.isIntersecting?(y=e.start)==null||y.call(e):(k=e.stop)==null||k.call(e)},{threshold:.25}),t.observe(x))}catch{l()}},{timeoutMs:220});return()=>{var s;r=!0,i==null||i(),t==null||t.disconnect(),n==null||n.disconnect(),(s=e==null?void 0:e.destroy)==null||s.call(e),w.current=null}},[g,R,v]);const S=x=>{const o=h.current;if(!o)return{x:.5,y:.5};const r=o.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(x.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(x.clientY-r.top)/Math.max(1,r.height)))}};return p.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Soup shader web art tile",disabled:m,onPointerDown:m?void 0:x=>{var r,e,n,t;c.current=x.pointerId;try{x.currentTarget.setPointerCapture(x.pointerId)}catch{}const o=S(x);(e=(r=w.current)==null?void 0:r.setPointer)==null||e.call(r,o.x,o.y),(t=(n=w.current)==null?void 0:n.setHeld)==null||t.call(n,!0)},onPointerMove:m?void 0:x=>{var r,e;if(c.current!=null&&x.pointerId!==c.current)return;const o=S(x);(e=(r=w.current)==null?void 0:r.setPointer)==null||e.call(r,o.x,o.y)},onPointerUp:m?void 0:x=>{var o,r;c.current!=null&&x.pointerId!==c.current||(c.current=null,(r=(o=w.current)==null?void 0:o.setHeld)==null||r.call(o,!1))},onPointerCancel:m?void 0:(()=>{var x,o;c.current=null,(o=(x=w.current)==null?void 0:x.setHeld)==null||o.call(x,!1)}),onMouseMove:m?void 0:x=>{var r,e;const o=S(x);(e=(r=w.current)==null?void 0:r.setPointer)==null||e.call(r,o.x,o.y)},onMouseLeave:m?void 0:(()=>{var x,o,r,e;c.current=null,(o=(x=w.current)==null?void 0:x.setHeld)==null||o.call(x,!1),(e=(r=w.current)==null?void 0:r.clearPointer)==null||e.call(r)}),onBlur:m?void 0:(()=>{var x,o,r,e;c.current=null,(o=(x=w.current)==null?void 0:x.setHeld)==null||o.call(x,!1),(e=(r=w.current)==null?void 0:r.clearPointer)==null||e.call(r)}),children:[p.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function tt({readyId:v,locked:m,onReady:R}){const h=u.useRef(null),M=u.useRef(null),w=u.useRef(null),P=u.useRef(!1),c=u.useRef(null),C=u.useRef(null),g=u.useRef(0),[S,x]=u.useState(!1),[o,r]=u.useState([]),e=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=u.useMemo(()=>({reduceMotion:e}),[e]);u.useEffect(()=>{const s=h.current,d=M.current;if(!s||!d)return;let a=!1,f=null,b=null,y=null;const k=()=>{P.current||(P.current=!0,R==null||R(v))},I=z(async()=>{var E,j;try{const L=await B(()=>import("./tardisWormholeEngine-BSErFcgT.js"),__vite__mapDeps([8,4]));if(a)return;f=L.createTardisWormholeEngine(d,n),w.current=f;const _=()=>$(s,f,Math.min(1.5,window.devicePixelRatio||1));_(),(E=f.renderStatic)==null||E.call(f),(j=f.start)==null||j.call(f),k(),b=new ResizeObserver(()=>{_()}),b.observe(s),"IntersectionObserver"in window&&(y=new IntersectionObserver(A=>{var H,V;for(const U of A)U.isIntersecting?(H=f.start)==null||H.call(f):(V=f.stop)==null||V.call(f)},{threshold:.25}),y.observe(s))}catch{k()}},{timeoutMs:220});return()=>{var E;a=!0,I==null||I(),y==null||y.disconnect(),b==null||b.disconnect(),(E=f==null?void 0:f.destroy)==null||E.call(f),w.current=null}},[n,R,v]),u.useEffect(()=>{if(o.length===0)return;const s=window.setTimeout(()=>{r(d=>d.slice(1))},1e3);return()=>{window.clearTimeout(s)}},[o]),u.useEffect(()=>{var d,a,f;const s=w.current;if(s){if(m){x(!1),C.current=null,(d=s.clearPointer)==null||d.call(s),(a=s.stop)==null||a.call(s);return}(f=s.start)==null||f.call(s)}},[m]);const t=s=>{const d=h.current,a=M.current||d;if(!d||!a)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const f=a.getBoundingClientRect(),b=d.getBoundingClientRect(),y=Math.max(0,Math.min(b.width,s.clientX-b.left)),k=Math.max(0,Math.min(b.height,s.clientY-b.top)),I=Math.max(0,Math.min(f.width,s.clientX-f.left)),E=Math.max(0,Math.min(f.height,s.clientY-f.top)),j=C.current,L=j?I-j.px:0,_=j?E-j.py:0;return C.current={px:I,py:E},{x:f.width>0?I/f.width:.5,y:f.height>0?E/f.height:.5,px:y,py:k,dx:L,dy:_}},l=(s,d)=>{const a=g.current++;r(f=>[...f,{id:a,x:s,y:d}])},i=s=>{var a,f,b,y;const d=t(s);l(d.px,d.py),(f=(a=w.current)==null?void 0:a.boost)==null||f.call(a),(y=(b=w.current)==null?void 0:b.start)==null||y.call(b),x(!0),window.setTimeout(()=>{x(!1)},650)};return p.jsxs("button",{type:"button",ref:h,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${S?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:m,onClick:m?void 0:i,onContextMenu:m?void 0:(s=>{var a,f,b,y;s.preventDefault();const d=t(s);l(d.px,d.py),(f=(a=w.current)==null?void 0:a.reverseBurst)==null||f.call(a),(y=(b=w.current)==null?void 0:b.start)==null||y.call(b)}),onWheel:m?void 0:(s=>{var d,a;(a=(d=w.current)==null?void 0:d.addScrollBoost)==null||a.call(d,s.deltaY*.003)}),onPointerDown:m?void 0:s=>{var a,f;c.current=s.pointerId;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}const d=t(s);(f=(a=w.current)==null?void 0:a.setPointer)==null||f.call(a,d.x,d.y,d.dx,d.dy)},onPointerMove:m?void 0:s=>{var a,f,b,y;if(c.current!=null&&s.pointerId!==c.current)return;const d=t(s);(f=(a=w.current)==null?void 0:a.setPointer)==null||f.call(a,d.x,d.y,d.dx,d.dy),(s.buttons&1)===1&&((y=(b=w.current)==null?void 0:b.drag)==null||y.call(b,d.dx))},onPointerUp:m?void 0:s=>{c.current!=null&&s.pointerId!==c.current||(c.current=null)},onPointerCancel:m?void 0:(()=>{c.current=null}),onMouseMove:m?void 0:s=>{var a,f;const d=t(s);(f=(a=w.current)==null?void 0:a.setPointer)==null||f.call(a,d.x,d.y,d.dx,d.dy)},onMouseLeave:m?void 0:(()=>{var s,d;c.current=null,C.current=null,(d=(s=w.current)==null?void 0:s.clearPointer)==null||d.call(s)}),onBlur:m?void 0:(()=>{var s,d;c.current=null,C.current=null,(d=(s=w.current)==null?void 0:s.clearPointer)==null||d.call(s)}),onKeyDown:m?void 0:(s=>{var d,a,f,b;(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),(a=(d=w.current)==null?void 0:d.boost)==null||a.call(d),(b=(f=w.current)==null?void 0:f.start)==null||b.call(f))}),children:[p.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),p.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),o.map(s=>p.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${s.x}px`,top:`${s.y}px`},"aria-hidden":!0},s.id)),p.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function nt({label:v,clickLabel:m,previewRequested:R=!1}){const h=fe(),M=u.useRef(null),[w,P]=u.useState(!1),[c,C]=u.useState(0),g=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),S=u.useCallback(()=>{C(Date.now()),P(!0)},[]),x=u.useCallback(()=>{h.navigateToSectionWithId("contact")},[h]),o=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),S())},r=u.useMemo(()=>w?Le({seed:`${c||Date.now()}:${v}`,reduceMotion:g}):"",[v,w,c,g]);return u.useEffect(()=>{let e=0,n=0;return R?(e=window.requestAnimationFrame(()=>{n=window.requestAnimationFrame(()=>{C(Date.now()),P(!0)})}),()=>{e&&window.cancelAnimationFrame(e),n&&window.cancelAnimationFrame(n)}):(P(!1),()=>{e&&window.cancelAnimationFrame(e),n&&window.cancelAnimationFrame(n)})},[R]),p.jsxs("div",{ref:M,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${w?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":w?"Kontakt preview":v,"aria-pressed":w,onClick:S,onKeyDown:o,children:[p.jsxs("div",{className:`article-web-art-tile-cta-preview ${w?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[w&&p.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:r,sandbox:"allow-scripts"},`${c}-${v}`),p.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!w&&p.jsx("div",{className:`loader ${g?"loader-reduce-motion":""}`,"aria-hidden":!0,children:p.jsxs("div",{className:"loader-inner",children:[p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})})]})}),p.jsxs("div",{className:`article-web-art-tile-cta-content ${w?"article-web-art-tile-cta-content-hidden":""}`,children:[p.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:v}),p.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:m})]}),w&&p.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),x()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),x())},children:"Kontakt"})]})}function rt({locked:v=!1}){const m=u.useRef(null),R=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),h=u.useRef(!1),M=u.useRef(0),w=u.useRef(null),P=u.useRef(null),c=u.useRef(1),C=u.useRef(null),g=u.useRef(null),S=u.useRef(null);return u.useEffect(()=>{const x=m.current;if(!x)return;const o=b=>{const y=Math.max(0,Math.min(1,b));return y*y*(3-2*y)},r=()=>{const b=x.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),y=[];for(const k of b){const I=k.getAnimations?k.getAnimations():[];for(const E of I)y.push(E)}return y},e=b=>{const y=Math.max(1,Math.min(5.2,Number(b)||1));c.current=y;const k=r();for(const I of k)I.playbackRate=y},n=()=>{g.current!=null&&cancelAnimationFrame(g.current),S.current!=null&&window.clearTimeout(S.current),g.current=null,S.current=null},t=()=>{n(),e(5.2),S.current=window.setTimeout(()=>{const b=c.current,y=performance.now(),k=320,I=()=>{const E=(performance.now()-y)/k,j=o(E);e(b+(1-b)*j),E<1?g.current=requestAnimationFrame(I):g.current=null};g.current=requestAnimationFrame(I),S.current=null},2e3)},l=()=>{h.current=!1,w.current=null,x.classList.remove("article-web-art-tile-goldfish-held"),P.current!=null&&cancelAnimationFrame(P.current),P.current=null;const b=c.current,y=360,k=performance.now();C.current!=null&&cancelAnimationFrame(C.current);const I=()=>{const E=(performance.now()-k)/y,j=o(E);e(b+(1-b)*j),E<1?C.current=requestAnimationFrame(I):C.current=null};C.current=requestAnimationFrame(I)},i=()=>{if(!h.current)return;const b=performance.now()-M.current,y=1.2+4*o(b/2400);e(y),P.current=requestAnimationFrame(i)},s=b=>{if(!(R||v)&&!(b.button!=null&&b.button!==0)){n(),h.current=!0,M.current=performance.now(),w.current=b.pointerId,x.classList.add("article-web-art-tile-goldfish-held");try{x.setPointerCapture(b.pointerId)}catch{}C.current!=null&&(cancelAnimationFrame(C.current),C.current=null),P.current==null&&(P.current=requestAnimationFrame(i))}},d=()=>{const b=performance.now()-M.current;l(),b<220&&t()},a=()=>{l()},f=()=>{l()};return x.addEventListener("pointerdown",s),x.addEventListener("pointerup",d),x.addEventListener("pointercancel",a),x.addEventListener("lostpointercapture",f),()=>{x.removeEventListener("pointerdown",s),x.removeEventListener("pointerup",d),x.removeEventListener("pointercancel",a),x.removeEventListener("lostpointercapture",f),l(),n(),C.current!=null&&cancelAnimationFrame(C.current),C.current=null}},[v,R]),u.useEffect(()=>{const x=m.current;x&&x.classList.toggle("article-web-art-tile-goldfish-locked",v)},[v]),p.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:m,role:"img","aria-label":"Goldfish animation tile",children:[p.jsx("div",{className:"fish-stage",children:p.jsx("div",{className:"fish-wrapper",children:p.jsx("div",{className:"fish-container",children:p.jsxs("div",{className:"fish-parts",children:[p.jsx("div",{className:"fish-body front"}),p.jsx("div",{className:"fish-body back"}),p.jsx("div",{className:"fish-back-bottom-fin front"}),p.jsx("div",{className:"fish-back-bottom-fin back"}),p.jsx("div",{className:"fish-back-fin"}),p.jsx("div",{className:"fish-front-bottom-fin front"}),p.jsx("div",{className:"fish-front-bottom-fin back"}),p.jsx("div",{className:"fish-top-fin"})]})})})}),p.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function st({locked:v=!1}){const m=u.useRef(null),R=u.useRef([]),h=u.useRef(0),M=u.useRef(0),w=Ie,P=u.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return u.useEffect(()=>{const c=m.current;if(!c)return;const C=R.current.filter(Boolean);if(!C.length)return;let g=!0,S=!1,x=null,o=null;const r=(b,y)=>{const k=(b-.5)*30;for(let I=0;I<C.length;I++){const E=C[I],j=I*18,L=I*8,_=(b-.5)*j,A=(y-.5)*L;E.style.transform=`translate3d(${_}px, ${A}px, 0) rotateY(${k}deg)`}},e=(b,y)=>{const k=Math.max(-.55,Math.min(.55,(b-.5)*1.1)),I=Math.max(-.35,Math.min(.35,(y-.5)*.7));r(.5+k,.5+I)},n=b=>{const y=c.getBoundingClientRect(),k=(b.clientX-y.left)/Math.max(1,y.width),I=(b.clientY-y.top)/Math.max(1,y.height);g=!0,M.current=performance.now()+650,e(Math.max(0,Math.min(1,k)),Math.max(0,Math.min(1,I)))},t=b=>{const y=c.getBoundingClientRect(),k=(b.clientX-y.left)/Math.max(1,y.width),I=(b.clientY-y.top)/Math.max(1,y.height);return{x:Math.max(0,Math.min(1,k)),y:Math.max(0,Math.min(1,I))}},l=b=>{if(b.pointerType==="mouse")return;S=!0,x=b.pointerId,g=!0,M.current=performance.now()+900;const y=t(b);e(y.x,y.y),!P&&o==null&&(o=requestAnimationFrame(f))},i=b=>{if(!S||x!=null&&b.pointerId!==x)return;g=!0,M.current=performance.now()+900;const y=t(b);e(y.x,y.y)},s=b=>{x!=null&&(b==null?void 0:b.pointerId)!=null&&b.pointerId!==x||(S=!1,x=null,g=!0,!P&&o==null&&(o=requestAnimationFrame(f)))},d=()=>{g=!0,!P&&o==null&&(o=requestAnimationFrame(f))},a=()=>{g=!0,!P&&o==null&&(o=requestAnimationFrame(f))},f=()=>{if(g){if(!P&&performance.now()>=M.current){h.current+=.008;const b=Math.sin(h.current)*.5+.5;e(b,.5)}o=requestAnimationFrame(f)}};return g=!v,c.addEventListener("mouseenter",d),c.addEventListener("mousemove",n),c.addEventListener("mouseleave",a),c.addEventListener("pointerdown",l),c.addEventListener("pointermove",i),c.addEventListener("pointerup",s),c.addEventListener("pointercancel",s),e(.5,.5),!P&&!v&&(o=requestAnimationFrame(f)),()=>{c.removeEventListener("mouseenter",d),c.removeEventListener("mousemove",n),c.removeEventListener("mouseleave",a),c.removeEventListener("pointerdown",l),c.removeEventListener("pointermove",i),c.removeEventListener("pointerup",s),c.removeEventListener("pointercancel",s),o!=null&&cancelAnimationFrame(o)}},[P]),p.jsxs("div",{ref:m,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[p.jsxs("div",{className:"patronus-card",children:[p.jsx("div",{className:"patronus-layer patronus-bg",ref:c=>{R.current[0]=c},children:p.jsx("img",{alt:"",src:w[0]})}),p.jsx("div",{className:"patronus-layer",ref:c=>{R.current[1]=c},children:p.jsx("img",{alt:"",src:w[1]})}),p.jsx("div",{className:"patronus-layer",ref:c=>{R.current[2]=c},children:p.jsx("img",{alt:"",src:w[2]})}),p.jsx("div",{className:"patronus-layer patronus-svg",ref:c=>{R.current[3]=c},dangerouslySetInnerHTML:{__html:ge}}),p.jsx("div",{className:"patronus-layer",ref:c=>{R.current[4]=c},children:p.jsx("img",{alt:"",src:w[3]})}),p.jsx("div",{className:"patronus-layer",ref:c=>{R.current[5]=c},children:p.jsx("img",{alt:"",src:w[4]})}),p.jsx("div",{className:"patronus-layer",ref:c=>{R.current[6]=c},children:p.jsx("img",{alt:"",src:w[5]})})]}),p.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{dt as default};
