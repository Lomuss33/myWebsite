const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/threeTunnelEngine-YAbz1VnK.js","assets/three-BYTi_f6D.js","assets/threePolygonDemo5Engine-BcBzJu0K.js","assets/prismFieldEngine-Dkw-H_-R.js","assets/soupShaderEngine-DOT8TiBo.js","assets/tardisWormholeEngine-BSErFcgT.js"])))=>i.map(i=>d[i]);
import{c as ye,g as de,A as ae,_ as z}from"./index-Bmdtl0i6.js";import{r as i,j as u}from"./react-vendor-D1LkQUJD.js";import"./swiper-BJPGAhIX.js";/* empty css              */import"./bootstrap-jfx39s8c.js";import"./vendor-BUjjXRU6.js";const ge=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`;function F(y,{timeoutMs:h=1200}={}){if(typeof window>"u")return y(),()=>{};if("requestIdleCallback"in window){const x=window.requestIdleCallback(()=>y(),{timeout:h});return()=>window.cancelIdleCallback(x)}const C=window.setTimeout(()=>y(),0);return()=>window.clearTimeout(C)}function Me(y){if(!y)return{width:1,height:1};const h=Math.max(1,Math.round(y.clientWidth||y.getBoundingClientRect().width||1)),C=Math.max(1,Math.round(y.clientHeight||y.getBoundingClientRect().height||1));return{width:h,height:C}}function $(y,h,C=1){var d;const{width:x,height:M}=Me(y);(d=h==null?void 0:h.setSize)==null||d.call(h,x,M,C)}function ce(y,h,C="smooth"){if(typeof window>"u")return;const x=document.getElementById(y),M=document.getElementById(`scrollable-${h}`);if(!x||!M)return;const d=x.getBoundingClientRect(),P=M.getBoundingClientRect(),a=M.scrollTop+(d.top-P.top);M.scrollTo({top:Math.max(0,a),behavior:C})}const ke=9,Re=9,Pe=10,Se=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],Ee=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function Ie(y=ke,h=Re,C=Pe){const x=y*h,M=Math.max(1,Math.min(C,x-1)),d=new Set;for(;d.size<M;)d.add(Math.floor(Math.random()*x));const P=new Array(x).fill(0);for(let a=0;a<x;a++){if(d.has(a)){P[a]=-1;continue}const R=a%h,g=Math.floor(a/h);let I=0;for(let c=-1;c<=1;c++)for(let t=-1;t<=1;t++){if(t===0&&c===0)continue;const s=R+t,e=g+c;s<0||e<0||s>=h||e>=y||d.has(e*h+s)&&(I+=1)}P[a]=I}return{rows:y,cols:h,mineCount:M,mines:d,counts:P}}function Ne(y,h,C,x){const M=new Set(C),d=[y];for(;d.length>0;){const P=d.pop();if(P==null||M.has(P)||x.has(P)||h.mines.has(P)||(M.add(P),h.counts[P]!==0))continue;const a=P%h.cols,R=Math.floor(P/h.cols);for(let g=-1;g<=1;g++)for(let I=-1;I<=1;I++){if(I===0&&g===0)continue;const c=a+I,t=R+g;c<0||t<0||c>=h.cols||t>=h.rows||d.push(t*h.cols+c)}}return M}function le(y,h,C){const x=y.rows*y.cols-y.mineCount;if(h.size>=x)return!0;if(C.size!==y.mineCount)return!1;for(const M of y.mines)if(!C.has(M))return!1;return!0}function je(y){return`Web art ${String(y||"tile").toLowerCase()} tile loading`}function Le({seed:y,reduceMotion:h}){const C=JSON.stringify(Ce.split("<\/script>").join("<\\/script>")),x=JSON.stringify(y);return`<!doctype html>
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
    reduceMotion: ${h?"true":"false"},
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
</html>`}function at({dataWrapper:y,id:h}){var ie;const C=ye(),x=de(),M=`${y.uniqueId}-ambient-trace`,d=`${y.uniqueId}-ambient-hex`,P=`${y.uniqueId}-ambient-plop`,a=`${y.uniqueId}-ambient-julia`,R=`${y.uniqueId}-ambient-mines`,g=`${y.uniqueId}-ambient-rings`,I=`${y.uniqueId}-ambient-prism`,c=`${y.uniqueId}-ambient-rope`,t=`${y.uniqueId}-ambient-soup`,s=`${y.uniqueId}-ambient-tardis`,[e,o]=i.useState(null),[v,b]=i.useState(!0),r=i.useMemo(()=>y.orderedItems,[y.orderedItems]),p=i.useMemo(()=>{const E=[4,5,3,6,1,2,7],j=new Map(r.map(A=>[Number(A==null?void 0:A.id),A])),D=[];for(const A of E){const B=j.get(A);B&&D.push(B)}for(const A of r){if(!A)continue;const B=Number(A==null?void 0:A.id);E.includes(B)||D.push(A)}return D},[r]),m=i.useRef(null),[n,f]=i.useState(!1),l=i.useRef(new Set),w=i.useRef(new Map),[k,S]=i.useState(0),[N,L]=i.useState(-1),[_,T]=i.useState(()=>new Set),[O,H]=i.useState(()=>new Set),[W,G]=i.useState(!1),V=i.useMemo(()=>{const E=p.map(j=>j==null?void 0:j.uniqueId).filter(Boolean);return E.push(M,d,P,a,R,I,g,c,t,s,"ambient-goldfish","ambient-patronus"),new Set(E)},[d,a,R,P,I,g,c,t,s,M,p]),X=i.useMemo(()=>Array.from(O).filter(E=>E!=="ambient-goldfish"&&E!=="ambient-patronus"),[O]),q=v,U=C.selectedLanguageId||"en";let J=C.getString("send_yours");typeof J=="string"&&J.startsWith("locale:")&&(J={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[U]||"Send yours!");let Z=C.getString("click");typeof Z=="string"&&Z.startsWith("locale:")&&(Z={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[U]||"Click");const te={en:{title:"Doors of the world behind an amazing art gallery.",note:"At your own risk",revealNote:"At your own risk click on the card to reveal it!",button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",note:"Auf eigenes Risiko",button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",note:"Na vlastiti rizik",button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",note:"Tüm risk size ait",button:"Gir",preparing:"Hazırlanıyor..."}}[U]||{note:"At your own risk",button:"Enter"},fe=U==="de"?"Auf eigenes Risiko klicke auf die Karte, um sie zu öffnen!":U==="hr"?"Na vlastiti rizik klikni karticu da je otkriješ!":U==="tr"?"Tüm risk size ait, göstermek için karta tıklayın!":"At your own risk click on the card to reveal it!",he="hide",K=i.useCallback(E=>{if(!E||l.current.has(E))return;l.current.add(E);const j=w.current.get(E);j!=null&&(window.clearTimeout(j),w.current.delete(E)),S(l.current.size)},[]),ne=i.useCallback(E=>{E&&H(j=>{if(j.has(E))return j;const D=new Set(j);return D.add(E),D})},[]),Q=i.useCallback(()=>{for(const E of w.current.values())window.clearTimeout(E);w.current=new Map,l.current=new Set,S(0),L(-1),f(!1),T(new Set),H(new Set),G(!1)},[]),ee=i.useCallback(()=>{b(!1),f(!0),L(p.length-1),T(new Set),H(new Set),G(!1)},[p.length]);i.useEffect(()=>{var oe;if(typeof window>"u"||((oe=x.targetSection)==null?void 0:oe.id)!==y.sectionId||x.transitionStatus!=="transition_status_none")return;const E=window.__pendingSectionAction;if(!E||E.action!=="enter"||E.sectionId!==y.sectionId||E.targetArticleId&&E.targetArticleId!==y.uniqueId)return;if(Date.now()-(E.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,ee();const j=E.targetArticleId||y.uniqueId;let D=null,A=null,B=null,Y=null;return D=window.setTimeout(()=>{A=window.requestAnimationFrame(()=>{ce(j,y.sectionId),B=window.setTimeout(()=>{Y=window.requestAnimationFrame(()=>{ce(j,y.sectionId)})},220)})},90),()=>{D!==null&&window.clearTimeout(D),A!==null&&window.cancelAnimationFrame(A),B!==null&&window.clearTimeout(B),Y!==null&&window.cancelAnimationFrame(Y)}},[y.uniqueId,y.sectionId,(ie=x.targetSection)==null?void 0:ie.id,x.transitionStatus,ee]);const re=i.useCallback(E=>{E&&(ne(E),T(j=>{if(j.has(E))return j;const D=new Set(j);return D.add(E),D}))},[ne]),se=i.useCallback(E=>{E&&(T(j=>{if(!j.has(E))return j;const D=new Set(j);return D.delete(E),D}),H(j=>{if(!j.has(E))return j;const D=new Set(j);return D.delete(E),D}))},[]),pe=V.size>0&&_.size>=V.size,be=i.useCallback(()=>{if(V.size>0&&_.size>=V.size){T(new Set),H(new Set),G(!1);return}H(new Set(V)),T(new Set(V)),G(!0)},[V,_.size]),me=i.useCallback(()=>{Q(),b(!0)},[Q]),we=(E,j)=>{const D=Number(E==null?void 0:E.id);return D===1?"Hover":D===2?"Wave":D===3?"3D":D===4?"Poly":D===5?"Click":D===6?"Orbit":D===7?"Spin":String(j+1)},xe=p.map((E,j)=>{if(!n)return u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${j+1} loading`},E.uniqueId);const D=E.uniqueId,A=_.has(D),B=O.has(D)||A;return u.jsx(ue,{label:we(E,j),isOpen:A,onToggle:()=>{A?se(D):re(D)},shouldRender:B,children:B&&u.jsx(Te,{itemWrapper:E,index:j,locked:q||!A,activate:j<=N,onReady:K})},D)}),ve=n?[{key:"ambient-trace",tileId:M,label:"Trace",render:E=>u.jsx($e,{readyId:M,locked:q||!E,onReady:K})},{key:"ambient-hex",tileId:d,label:"Hex",render:E=>u.jsx(qe,{readyId:d,locked:q||!E,onReady:K})},{key:"ambient-plop",tileId:P,label:"Plop",render:E=>u.jsx(Ke,{readyId:P,locked:q||!E,onReady:K})},{key:"ambient-julia",tileId:a,label:"Julia",render:E=>u.jsx(Ve,{readyId:a,locked:q||!E,onReady:K})},{key:"ambient-mines",tileId:R,label:"Bomb",render:E=>u.jsx(Ge,{readyId:R,locked:q||!E,onReady:K})},{key:"ambient-rings",tileId:g,label:"Fall",render:E=>u.jsx(Ue,{readyId:g,locked:q||!E,onReady:K})},{key:"ambient-prism",tileId:I,label:"Prism",render:E=>u.jsx(Ye,{readyId:I,locked:q||!E,onReady:K})},{key:"ambient-rope",tileId:c,label:"Rope",render:E=>u.jsx(Xe,{readyId:c,locked:q||!E,onReady:K})},{key:"ambient-soup",tileId:t,label:"Soup",render:E=>u.jsx(Je,{readyId:t,locked:q||!E,onReady:K})},{key:"ambient-tardis",tileId:s,label:"Tardis",render:E=>u.jsx(Ze,{readyId:s,locked:q||!E,onReady:K})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:E=>u.jsx(We,{locked:q||!E})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:E=>u.jsx(et,{locked:q||!E})}].map(({key:E,tileId:j,label:D,render:A})=>{const B=_.has(j),Y=O.has(j)||B;return u.jsx(ue,{label:D,isOpen:B,onToggle:()=>{B?se(j):re(j)},shouldRender:Y,children:Y&&A(B)},E)}):[u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return i.useEffect(()=>{Q()},[y.uniqueId,Q]),i.useEffect(()=>{n&&L(p.length-1)},[n,p.length]),i.useEffect(()=>{if(n)for(const E of X){if(!E||l.current.has(E)||w.current.has(E))continue;const j=window.setTimeout(()=>{K(E)},12e3);w.current.set(E,j)}},[n,X,K]),u.jsx(ae,{id:y.uniqueId,type:ae.Types.SPACING_DEFAULT,dataWrapper:y,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:o,children:u.jsxs("div",{className:"article-web-art-shell",children:[u.jsx(_e,{note:v?te.note:fe,buttonLabel:v?te.button:he,hidden:!v,onEnter:v?ee:me,secondaryButtonLabel:v?null:"promaja",onSecondaryAction:v?null:be,secondaryPressed:pe}),u.jsx("div",{className:`article-web-art-stage ${v?"article-web-art-stage-preview":""}`,"aria-hidden":v,children:u.jsxs("div",{className:`article-web-art-items ${q?"article-web-art-items-locked":""}`,ref:m,"aria-busy":v,children:[n&&u.jsx(Qe,{label:J,clickLabel:Z,previewRequested:W}),xe,ve]})})]})})}function _e({note:y,buttonLabel:h,hidden:C,onEnter:x,secondaryButtonLabel:M=null,onSecondaryAction:d=null,secondaryPressed:P=!1}){const a=R=>{(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),x())};return u.jsx("div",{className:`article-web-art-intro-cover ${C?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:u.jsxs("div",{className:"article-web-art-intro-cover-inner",children:[u.jsx("div",{className:"article-web-art-intro-cover-actions",children:u.jsx("span",{className:`article-web-art-intro-cover-note ${C?"article-web-art-intro-cover-note-compact":"article-web-art-intro-cover-note-expanded"}`,children:y})}),u.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[M?u.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${P?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:d||void 0,"aria-pressed":P,"aria-label":M,children:M}):null,u.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:x,onKeyDown:a,"aria-label":h,children:h})]})]})})}function ue({label:y,isOpen:h,onToggle:C,shouldRender:x=!0,children:M}){return u.jsxs("div",{className:`article-web-art-gated-tile ${h?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[x?M:u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":je(y)}),u.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),u.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${h?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:C,"aria-label":`${h?"Hide":"Show"} ${y}`,children:y})]})}function Te({itemWrapper:y,index:h,activate:C,locked:x,onReady:M}){return Number(y.id)===1?u.jsx(Oe,{itemWrapper:y,index:h,activate:C,locked:x,onReady:M}):Number(y.id)===2?u.jsx(He,{itemWrapper:y,index:h,activate:C,locked:x,onReady:M}):Number(y.id)===3?u.jsx(Be,{itemWrapper:y,index:h,activate:C,locked:x,onReady:M}):Number(y.id)===4?u.jsx(ze,{itemWrapper:y,index:h,activate:C,locked:x,onReady:M}):Number(y.id)===6?u.jsx(Fe,{itemWrapper:y,index:h,activate:C,locked:x,onReady:M}):Number(y.id)===7?u.jsx(De,{itemWrapper:y,locked:x,onReady:M}):u.jsx(Ae,{itemWrapper:y,index:h,activate:C,locked:x,onReady:M})}function De({itemWrapper:y,locked:h,onReady:C}){const x=i.useRef(!1);i.useEffect(()=>{x.current||(x.current=!0,C==null||C(y.uniqueId))},[y.uniqueId,C]);const M=i.useMemo(()=>[2,4,.5,.2].map(d=>{const P=d-1,a=Math.abs(5/P),R=P>=0?"1turn":"-1turn";return{speed:d,controlDuration:`${a}s`,controlTurn:R}}),[]);return u.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${h?"article-web-art-spin-boxes-locked":""}`,children:u.jsx("div",{className:"article-web-art-spin-boxes-grid",children:M.map(({speed:d,controlDuration:P,controlTurn:a})=>u.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--control-duration":P,"--control-turn":a},children:u.jsx("div",{className:"article-web-art-spin-box-core","data-speed":d})},String(d)))})})}function Ae({itemWrapper:y,index:h,activate:C,locked:x,onReady:M}){const d=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!0),g=i.useRef(!0),I=i.useRef(!1),c=Number(y==null?void 0:y.id)===5,t=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=i.useMemo(()=>{const r=Number(y.id)||h+1,p=.0026+r*8e-5,m=.0054+r*14e-5,n=r%2?1:2,f={kx:11+r*2,ky:r%2};return{refreshDelay:c?0:8e3,radiusMini:p,radiusMaxi:m,dHueStep:n,startGroup:f,seed:1337+r*1009,reduceMotion:t}},[c,y.id,h,t]);i.useEffect(()=>{if(!C)return;const r=d.current,p=P.current;if(!r||!p)return;let m=!1,n=null,f=null,l=null;const w=()=>{I.current||(I.current=!0,M==null||M(y.uniqueId))},k=F(async()=>{var S,N;try{const L=await z(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(m)return;n=L.createEmbroideryEngine(p,s),a.current=n;const _=()=>$(r,n,window.devicePixelRatio||1);_(),(S=n.renderStatic)==null||S.call(n),g.current&&((N=n.start)==null||N.call(n)),w(),f=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),f.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const O of T){if(g.current=!!O.isIntersecting,c){g.current||n.stop();continue}g.current&&R.current?n.start():n.stop()}},{threshold:.25}),l.observe(r))}catch{w()}});return()=>{m=!0,k==null||k(),l==null||l.disconnect(),f==null||f.disconnect(),n==null||n.destroy(),a.current=null}},[C,s,y.uniqueId,M]),i.useEffect(()=>{var p,m;const r=a.current;if(r){if(x){(p=r.stop)==null||p.call(r);return}g.current&&((m=r.start)==null||m.call(r))}},[x]),i.useEffect(()=>{var p,m;const r=a.current;if(r){if(x){(p=r.stop)==null||p.call(r);return}g.current&&((m=r.start)==null||m.call(r))}},[x]);const e=()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())},o=()=>{var r,p,m,n;R.current=!0,g.current?(p=(r=a.current)==null?void 0:r.start)==null||p.call(r):(n=(m=a.current)==null?void 0:m.stop)==null||n.call(m)},v=()=>{var r,p,m,n,f,l,w,k,S,N;if(c){(p=(r=a.current)==null?void 0:r.stop)==null||p.call(r),(n=(m=a.current)==null?void 0:m.reset)==null||n.call(m),(l=(f=a.current)==null?void 0:f.start)==null||l.call(f);return}(w=a.current)==null||w.reset(),(S=(k=a.current)==null?void 0:k.renderStatic)==null||S.call(k),g.current&&((N=a.current)==null||N.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),v())};return u.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${h+1}`,disabled:x,onClick:x?void 0:v,onMouseEnter:x||c?void 0:e,onMouseLeave:x||c?void 0:o,onFocus:x||c?void 0:e,onBlur:x||c?void 0:o,onKeyDown:x?void 0:b,children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:c?"Click":Number.isFinite(Number(y==null?void 0:y.id))?Number(y.id):h+1})]})}function Oe({itemWrapper:y,index:h,activate:C,locked:x,onReady:M}){const d=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!1),g=i.useRef(null),I=i.useRef(!1),c=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=i.useMemo(()=>({seed:9001+(Number(y.id)||1)*1337,reduceMotion:c,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:120,introDurationMs:950}),[y.id,c]);i.useEffect(()=>{if(!C)return;const n=d.current,f=P.current;if(!n||!f)return;let l=!1,w=null,k=null;const S=()=>{R.current||(R.current=!0,M==null||M(y.uniqueId))},N=F(async()=>{var L,_;try{const T=await z(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(l)return;w=T.createSpiralDotsEngine(f,t),a.current=w;const O=()=>$(n,w,window.devicePixelRatio||1);O(),(L=w.renderStatic)==null||L.call(w),(_=w.start)==null||_.call(w),S(),k=new ResizeObserver(()=>{var H;O(),w.rebuildDots(),(H=w.renderStatic)==null||H.call(w)}),k.observe(n)}catch{S()}});return()=>{l=!0,N==null||N(),k==null||k.disconnect(),w==null||w.destroy(),a.current=null}},[C,t,y.uniqueId,M]),i.useEffect(()=>{var f,l,w;const n=a.current;if(n){if(x){(f=n.clearMouse)==null||f.call(n),(l=n.stop)==null||l.call(n);return}(w=n.start)==null||w.call(n)}},[x]);const s=n=>{const f=d.current;if(!f)return{x:-1e4,y:-1e4};const l=f.getBoundingClientRect();return{x:n.clientX-l.left,y:n.clientY-l.top}},e=()=>{var n;(n=a.current)==null||n.start()},o=()=>{var n,f;(n=a.current)==null||n.clearMouse(),(f=a.current)==null||f.start()},v=()=>{e()},b=()=>{o()},r=n=>{var l;const f=s(n);(l=a.current)==null||l.setMouse(f.x,f.y)},p=()=>{e()},m=()=>{o()};return u.jsxs("div",{ref:d,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:x?-1:0,"aria-label":`Spiral dots web art tile ${h+1}`,onPointerDown:x?void 0:n=>{var w;if(n.pointerType==="mouse")return;const f=d.current;if(!f)return;I.current=!0,g.current=n.pointerId;try{f.setPointerCapture(n.pointerId)}catch{}e();const l=s(n);(w=a.current)==null||w.setMouse(l.x,l.y)},onPointerMove:x?void 0:n=>{var l;if(!I.current||g.current!=null&&n.pointerId!==g.current)return;const f=s(n);(l=a.current)==null||l.setMouse(f.x,f.y)},onPointerUp:x?void 0:n=>{g.current!=null&&n.pointerId!==g.current||(I.current=!1,g.current=null,o())},onPointerCancel:x?void 0:()=>{I.current=!1,g.current=null,o()},onMouseEnter:x?void 0:v,onMouseLeave:x?void 0:b,onMouseMove:x?void 0:r,onFocus:x?void 0:p,onBlur:x?void 0:m,children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function He({itemWrapper:y,index:h,activate:C,locked:x,onReady:M}){const d=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!0),g=i.useRef(!0),I=i.useRef(!1),c=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=i.useMemo(()=>({seed:424242+(Number(y.id)||2)*2027,reduceMotion:c,targetCellSize:14,gapPx:1.4}),[y.id,c]);i.useEffect(()=>{if(!C)return;const r=d.current,p=P.current;if(!r||!p)return;let m=!1,n=null,f=null,l=null;const w=()=>{I.current||(I.current=!0,M==null||M(y.uniqueId))},k=F(async()=>{var S,N;try{const L=await z(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(m)return;n=L.createGridWaveEngine(p,t),a.current=n;const _=()=>$(r,n,window.devicePixelRatio||1);_(),(S=n.renderStatic)==null||S.call(n),g.current&&((N=n.start)==null||N.call(n)),w(),f=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),f.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const O of T)g.current=!!O.isIntersecting,g.current&&R.current?n.start():n.stop()},{threshold:.25}),l.observe(r))}catch{w()}});return()=>{m=!0,k==null||k(),l==null||l.disconnect(),f==null||f.disconnect(),n==null||n.destroy(),a.current=null}},[C,t,y.uniqueId,M]);const s=()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())},e=()=>{var r,p,m,n;R.current=!0,g.current?(p=(r=a.current)==null?void 0:r.start)==null||p.call(r):(n=(m=a.current)==null?void 0:m.stop)==null||n.call(m)},o=r=>{const p=d.current;if(!p)return{x:0,y:0};const m=p.getBoundingClientRect();return typeof(r==null?void 0:r.clientX)!="number"||typeof(r==null?void 0:r.clientY)!="number"?{x:m.width/2,y:m.height/2}:{x:r.clientX-m.left,y:r.clientY-m.top}},v=r=>{var m,n,f,l;const p=o(r);(m=a.current)==null||m.rippleAt(p.x,p.y),(f=(n=a.current)==null?void 0:n.renderStatic)==null||f.call(n),R.current&&g.current&&((l=a.current)==null||l.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),v(null))};return u.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${h+1}`,disabled:x,onClick:x?void 0:v,onMouseEnter:x?void 0:s,onMouseLeave:x?void 0:e,onFocus:x?void 0:s,onBlur:x?void 0:e,onKeyDown:x?void 0:b,children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function Be({itemWrapper:y,index:h,activate:C,locked:x,onReady:M}){const d=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!0),g=i.useRef(!0),I=i.useRef(!1),c=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=i.useMemo(()=>({reduceMotion:c,ringCount:9,cubesPerRing:10,ringSpacing:82,tunnelRadius:58,speed:4.6,exposure:1.45}),[c]);i.useEffect(()=>{if(!C)return;const b=d.current,r=P.current;if(!b||!r)return;let p=!1,m=null,n=null,f=null,l=null;const w=()=>{I.current||(I.current=!0,M==null||M(y.uniqueId))},k=async()=>{var T;const N=await z(()=>import("./threeTunnelEngine-YAbz1VnK.js"),__vite__mapDeps([0,1]));if(p)return;m=N.createThreeTunnelEngine(r,t),a.current=m;const L=()=>$(b,m,Math.min(1.5,window.devicePixelRatio||1));return L(),m.reset(),g.current&&((T=m.start)==null||T.call(m)),w(),n=new ResizeObserver(()=>{L(),m.reset()}),n.observe(b),"IntersectionObserver"in window&&(f=new IntersectionObserver(O=>{for(const H of O)g.current=!!H.isIntersecting,g.current&&R.current?m.start():m.stop()},{threshold:.25}),f.observe(b)),()=>{f==null||f.disconnect(),n==null||n.disconnect(),m.destroy(),a.current=null}};let S=null;return l=F(()=>{k().then(N=>{S=N||null}).catch(()=>{w()})},{timeoutMs:300}),()=>{p=!0,l==null||l(),S==null||S()}},[C,t,y.uniqueId,M]),i.useEffect(()=>{var r,p,m;const b=a.current;if(b){if(x){(r=b.setHeld)==null||r.call(b,!1),(p=b.stop)==null||p.call(b);return}g.current&&((m=b.start)==null||m.call(b))}},[x]);const s=()=>{var b;R.current=!0,g.current&&((b=a.current)==null||b.start())},e=()=>{var b,r,p,m;R.current=!0,g.current?(r=(b=a.current)==null?void 0:b.start)==null||r.call(b):(m=(p=a.current)==null?void 0:p.stop)==null||m.call(p)},o=()=>{var b,r,p,m;(r=(b=a.current)==null?void 0:b.nextPalette)==null||r.call(b),(p=a.current)==null||p.reset(),g.current&&((m=a.current)==null||m.start())},v=b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),o())};return u.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${h+1}`,disabled:x,onClick:x?void 0:o,onMouseEnter:x?void 0:s,onMouseLeave:x?void 0:e,onFocus:x?void 0:s,onBlur:x?void 0:e,onKeyDown:x?void 0:v,children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),u.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function ze({itemWrapper:y,index:h,activate:C,locked:x,onReady:M}){const d=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!0),g=i.useRef(!0),I=i.useRef(!1),c=i.useRef(null),t=i.useRef(null),s=i.useRef(!1),e=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=i.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,x]);i.useEffect(()=>{if(!C)return;const r=d.current,p=P.current;if(!r||!p)return;let m=!1,n=null,f=null;const l=()=>{I.current||(I.current=!0,M==null||M(y.uniqueId))},w=async()=>{var T;const k=await z(()=>import("./threePolygonDemo5Engine-BcBzJu0K.js"),__vite__mapDeps([2,1]));if(m)return;const S=k.createThreePolygonDemo5Engine(p,o);a.current=S;const N=()=>$(r,S,Math.min(1.2,window.devicePixelRatio||1));N(),S.reset(),g.current&&((T=S.start)==null||T.call(S)),l();const L=new ResizeObserver(()=>{N()});L.observe(r);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(O=>{for(const H of O)g.current=!!H.isIntersecting,g.current&&R.current?S.start():S.stop()},{threshold:.25}),_.observe(r)),n=()=>{_==null||_.disconnect(),L.disconnect(),S.destroy(),a.current=null}};return f=F(()=>{w().catch(()=>{l()})},{timeoutMs:300}),()=>{m=!0,f==null||f(),t.current!=null&&window.clearTimeout(t.current),n==null||n()}},[C,o,y.uniqueId,M]);const v=()=>{var r,p,m;(p=(r=a.current)==null?void 0:r.boost)==null||p.call(r),g.current&&((m=a.current)==null||m.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),v())};return u.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${h+1}`,disabled:x,onKeyDown:x?void 0:b,onPointerDown:x?void 0:r=>{var p;if(!(r.button!=null&&r.button!==0)){c.current=r.pointerId,s.current=!1;try{r.currentTarget.setPointerCapture(r.pointerId)}catch{}g.current&&((p=a.current)==null||p.start()),t.current!=null&&window.clearTimeout(t.current),t.current=window.setTimeout(()=>{var m,n;c.current!=null&&(s.current=!0,(n=(m=a.current)==null?void 0:m.setHeld)==null||n.call(m,!0))},140)}},onPointerUp:x?void 0:r=>{var p,m;c.current!=null&&r.pointerId!==c.current||(t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current?(s.current=!1,(m=(p=a.current)==null?void 0:p.setHeld)==null||m.call(p,!1)):v())},onPointerCancel:x?void 0:(()=>{var r,p;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(p=(r=a.current)==null?void 0:r.setHeld)==null||p.call(r,!1)}),onLostPointerCapture:x?void 0:(()=>{var r,p;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(p=(r=a.current)==null?void 0:r.setHeld)==null||p.call(r,!1)}),onMouseEnter:x?void 0:(()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())}),onMouseLeave:x?void 0:(()=>{var r,p,m,n;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(p=(r=a.current)==null?void 0:r.setHeld)==null||p.call(r,!1),R.current=!0,g.current?(m=a.current)==null||m.start():(n=a.current)==null||n.stop()}),onFocus:x?void 0:(()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())}),onBlur:x?void 0:(()=>{var r,p,m,n;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(p=(r=a.current)==null?void 0:r.setHeld)==null||p.call(r,!1),R.current=!0,g.current?(m=a.current)==null||m.start():(n=a.current)==null||n.stop()}),children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function Fe({itemWrapper:y,index:h,activate:C,locked:x,onReady:M}){const d=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!0),g=i.useRef(!0),I=i.useRef(!1),c=i.useRef(0),t=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=i.useMemo(()=>({reduceMotion:t,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[t]);i.useEffect(()=>{if(!C)return;const r=d.current,p=P.current;if(!r||!p)return;let m=!1,n=null,f=null,l=null;const w=()=>{I.current||(I.current=!0,M==null||M(y.uniqueId))},k=F(async()=>{var S,N;try{const L=await z(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(m)return;n=L.createOrbitCirclesEngine(p,s),a.current=n;const _=()=>$(r,n,window.devicePixelRatio||1);_(),n.reset(),(S=n.renderStatic)==null||S.call(n),g.current&&((N=n.start)==null||N.call(n)),w(),f=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),f.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const O of T)g.current=!!O.isIntersecting,g.current&&R.current?n.start():n.stop()},{threshold:.25}),l.observe(r))}catch{w()}});return()=>{m=!0,k==null||k(),l==null||l.disconnect(),f==null||f.disconnect(),n==null||n.destroy(),a.current=null}},[C,s,y.uniqueId,M]),i.useEffect(()=>{var p,m;const r=a.current;if(r){if(x){(p=r.stop)==null||p.call(r);return}g.current&&((m=r.start)==null||m.call(r))}},[x]);const e=()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())},o=()=>{var r,p,m,n;R.current=!0,g.current?(p=(r=a.current)==null?void 0:r.start)==null||p.call(r):(n=(m=a.current)==null?void 0:m.stop)==null||n.call(m)},v=()=>{var n,f;const r=a.current;if(!r)return;const p=[{palette:["#A8DA00","#76C700","#D9FF6A"],bgColor:"#06130a"},{palette:["#DD0F7E","#FF4FAE","#7B2CFF"],bgColor:"#200018"},{palette:["#009BBE","#00D5FF","#2B7BFF"],bgColor:"#001018"},{palette:["#F2E205","#FFB703","#EE5A02"],bgColor:"#1a0f00"},{palette:["#8A2BFF","#C300FF","#FF00C8"],bgColor:"#07000f"}],m=p[c.current%p.length];c.current=(c.current+1)%p.length,(n=r.setPalette)==null||n.call(r,m.palette,m.bgColor),g.current&&((f=r.start)==null||f.call(r))},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),v())};return u.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${h+1}`,disabled:x,onClick:x?void 0:v,onMouseEnter:x?void 0:e,onMouseLeave:x?void 0:o,onFocus:x?void 0:e,onBlur:x?void 0:o,onKeyDown:x?void 0:b,children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function $e({readyId:y,locked:h,onReady:C}){const x=i.useRef(null),M=i.useRef(null),d=i.useRef(null),P=i.useRef(!1),a=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=i.useMemo(()=>({seed:20250414,reduceMotion:a,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[a]);i.useEffect(()=>{const c=x.current,t=M.current;if(!c||!t)return;let s=!1,e=null,o=null,v=null;const b=()=>{P.current||(P.current=!0,C==null||C(y))},r=F(async()=>{var p,m;try{const n=await z(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(s)return;e=n.createTortuosityTraceEngine(t,R),d.current=e;const f=()=>$(c,e,Math.min(1.5,window.devicePixelRatio||1));f(),(p=e.renderStatic)==null||p.call(e),(m=e.start)==null||m.call(e),b(),o=new ResizeObserver(()=>{var l;f(),(l=e.reset)==null||l.call(e)}),o.observe(c),"IntersectionObserver"in window&&(v=new IntersectionObserver(l=>{var w,k;for(const S of l)S.isIntersecting?(w=e.start)==null||w.call(e):(k=e.stop)==null||k.call(e)},{threshold:.25}),v.observe(c))}catch{b()}},{timeoutMs:200});return()=>{var p;s=!0,r==null||r(),v==null||v.disconnect(),o==null||o.disconnect(),(p=e==null?void 0:e.destroy)==null||p.call(e),d.current=null}},[R,C,y]),i.useEffect(()=>{var t,s,e;const c=d.current;if(c){if(h){(t=c.setHeld)==null||t.call(c,!1),(s=c.stop)==null||s.call(c);return}(e=c.start)==null||e.call(c)}},[h]),i.useEffect(()=>{var t,s;const c=d.current;if(c){if(h){(t=c.stop)==null||t.call(c);return}(s=c.start)==null||s.call(c)}},[h]);const g=()=>{var c,t,s,e;(t=(c=d.current)==null?void 0:c.reset)==null||t.call(c),(e=(s=d.current)==null?void 0:s.start)==null||e.call(s)},I=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),g())};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:h,onClick:h?void 0:g,onKeyDown:h?void 0:I,children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function qe({readyId:y,locked:h,onReady:C}){const x=i.useRef(null),M=i.useRef(null),d=i.useRef(null),P=i.useRef(!1),a=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=i.useMemo(()=>({seed:20250415,reduceMotion:a,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[a]);i.useEffect(()=>{const c=x.current,t=M.current;if(!c||!t)return;let s=!1,e=null,o=null,v=null;const b=()=>{P.current||(P.current=!0,C==null||C(y))},r=F(async()=>{var p,m;try{const n=await z(()=>import("./hexFlowBallsEngine-C4hMgqMS.js"),[]);if(s)return;e=n.createHexFlowBallsEngine(t,R),d.current=e;const f=()=>$(c,e,Math.min(1.5,window.devicePixelRatio||1));f(),(p=e.renderStatic)==null||p.call(e),(m=e.start)==null||m.call(e),b(),o=new ResizeObserver(()=>{var l;f(),(l=e.reset)==null||l.call(e)}),o.observe(c),"IntersectionObserver"in window&&(v=new IntersectionObserver(l=>{var w,k;for(const S of l)S.isIntersecting?(w=e.start)==null||w.call(e):(k=e.stop)==null||k.call(e)},{threshold:.25}),v.observe(c))}catch{b()}},{timeoutMs:220});return()=>{var p;s=!0,r==null||r(),v==null||v.disconnect(),o==null||o.disconnect(),(p=e==null?void 0:e.destroy)==null||p.call(e),d.current=null}},[R,C,y]),i.useEffect(()=>{var t,s,e;const c=d.current;if(c){if(h){(t=c.clearPointer)==null||t.call(c),(s=c.stop)==null||s.call(c);return}(e=c.start)==null||e.call(c)}},[h]),i.useEffect(()=>{var t,s;const c=d.current;if(c){if(h){(t=c.stop)==null||t.call(c);return}(s=c.start)==null||s.call(c)}},[h]);const g=()=>{var c,t,s,e;(t=(c=d.current)==null?void 0:c.toggleGridContrast)==null||t.call(c),(e=(s=d.current)==null?void 0:s.start)==null||e.call(s)},I=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),g())};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:h,onClick:h?void 0:g,onKeyDown:h?void 0:I,children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function Ke({readyId:y,locked:h,onReady:C}){const x=i.useRef(null),M=i.useRef(null),d=i.useRef(null),P=i.useRef(!1),a=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=i.useMemo(()=>({seed:20250416,reduceMotion:a,step:6,side:5}),[a]);i.useEffect(()=>{const t=x.current,s=M.current;if(!t||!s)return;let e=!1,o=null,v=null,b=null;const r=()=>{P.current||(P.current=!0,C==null||C(y))},p=F(async()=>{var m,n;try{const f=await z(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;o=f.createPixelPlopEngine(s,R),d.current=o;const l=()=>$(t,o,Math.min(1.5,window.devicePixelRatio||1));l(),(m=o.renderStatic)==null||m.call(o),(n=o.start)==null||n.call(o),r(),v=new ResizeObserver(()=>{var w;l(),(w=o.reset)==null||w.call(o)}),v.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(w=>{var k,S;for(const N of w)N.isIntersecting?(k=o.start)==null||k.call(o):(S=o.stop)==null||S.call(o)},{threshold:.25}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var m;e=!0,p==null||p(),b==null||b.disconnect(),v==null||v.disconnect(),(m=o==null?void 0:o.destroy)==null||m.call(o),d.current=null}},[R,C,y]),i.useEffect(()=>{var s,e,o;const t=d.current;if(t){if(h){(s=t.clearPointer)==null||s.call(t),(e=t.stop)==null||e.call(t);return}(o=t.start)==null||o.call(t)}},[h]),i.useEffect(()=>{var s,e;const t=d.current;if(t){if(h){(s=t.stop)==null||s.call(t);return}(e=t.start)==null||e.call(t)}},[h]);const g=()=>{var t,s,e,o;(s=(t=d.current)==null?void 0:t.seedBurst)==null||s.call(t),(o=(e=d.current)==null?void 0:e.start)==null||o.call(e)},I=t=>{var o,v,b,r;const s=x.current;if(!s||typeof(t==null?void 0:t.clientX)!="number"||typeof(t==null?void 0:t.clientY)!="number"){g();return}const e=s.getBoundingClientRect();(v=(o=d.current)==null?void 0:o.burstAt)==null||v.call(o,t.clientX-e.left,t.clientY-e.top),(r=(b=d.current)==null?void 0:b.start)==null||r.call(b)},c=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),g())};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:h,onPointerDown:h?void 0:(t=>{t.button!=null&&t.button!==0||I(t)}),onKeyDown:h?void 0:c,children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function Ve({readyId:y,locked:h,onReady:C}){const x=i.useRef(null),M=i.useRef(null),d=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useRef(!1),g=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=i.useMemo(()=>({reduceMotion:g,seed:20250417}),[g]);i.useEffect(()=>{const e=x.current,o=M.current;if(!e||!o)return;let v=!1,b=null,r=null,p=null;const m=()=>{P.current||(P.current=!0,C==null||C(y))},n=F(async()=>{var f,l;try{const w=await z(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(v)return;b=w.createJuliaLinesEngine(o,I),d.current=b;const k=()=>$(e,b,Math.min(1.5,window.devicePixelRatio||1));k(),(f=b.renderStatic)==null||f.call(b),(l=b.start)==null||l.call(b),m(),r=new ResizeObserver(()=>{k()}),r.observe(e),"IntersectionObserver"in window&&(p=new IntersectionObserver(S=>{var N,L;for(const _ of S)_.isIntersecting?(N=b.start)==null||N.call(b):(L=b.stop)==null||L.call(b)},{threshold:.25}),p.observe(e))}catch{m()}},{timeoutMs:220});return()=>{var f;v=!0,n==null||n(),p==null||p.disconnect(),r==null||r.disconnect(),(f=b==null?void 0:b.destroy)==null||f.call(b),d.current=null}},[I,C,y]),i.useEffect(()=>{var o,v,b,r;const e=d.current;if(e){if(h){(o=e.setHeld)==null||o.call(e,!1),(v=e.clearPointer)==null||v.call(e),(b=e.stop)==null||b.call(e);return}(r=e.start)==null||r.call(e)}},[h]),i.useEffect(()=>{var o,v,b;const e=d.current;if(e){if(h){(o=e.clearPointer)==null||o.call(e),(v=e.stop)==null||v.call(e);return}(b=e.start)==null||b.call(e)}},[h]);const c=e=>{const o=x.current;if(!o)return{x:.4,y:.5};const v=o.getBoundingClientRect(),b=(e.clientX-v.left)/Math.max(1,v.width),r=(e.clientY-v.top)/Math.max(1,v.height);return{x:Math.max(0,Math.min(1,b)),y:Math.max(0,Math.min(1,r))}},t=()=>{var e,o,v,b;(o=(e=d.current)==null?void 0:e.reset)==null||o.call(e),(b=(v=d.current)==null?void 0:v.start)==null||b.call(v)},s=e=>{var v,b,r,p,m,n,f,l;const o=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(b=(v=d.current)==null?void 0:v.nudge)==null||b.call(v,0,-o)):e.key==="ArrowDown"?(e.preventDefault(),(p=(r=d.current)==null?void 0:r.nudge)==null||p.call(r,0,o)):e.key==="ArrowLeft"?(e.preventDefault(),(n=(m=d.current)==null?void 0:m.nudge)==null||n.call(m,-o,0)):e.key==="ArrowRight"?(e.preventDefault(),(l=(f=d.current)==null?void 0:f.nudge)==null||l.call(f,o,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),t())};return u.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:h?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:h?void 0:e=>{var b,r;const o=x.current;if(!o)return;R.current=!0,a.current=e.pointerId;try{o.setPointerCapture(e.pointerId)}catch{}const v=c(e);(r=(b=d.current)==null?void 0:b.setPointer)==null||r.call(b,v.x,v.y)},onPointerMove:h?void 0:e=>{var v,b;if(R.current&&a.current!=null&&e.pointerId!==a.current)return;const o=c(e);(b=(v=d.current)==null?void 0:v.setPointer)==null||b.call(v,o.x,o.y)},onPointerUp:h?void 0:e=>{var o,v;a.current!=null&&e.pointerId!==a.current||(R.current=!1,a.current=null,(v=(o=d.current)==null?void 0:o.clearPointer)==null||v.call(o))},onPointerCancel:h?void 0:()=>{var e,o;R.current=!1,a.current=null,(o=(e=d.current)==null?void 0:e.clearPointer)==null||o.call(e)},onMouseMove:h?void 0:e=>{var v,b;const o=c(e);(b=(v=d.current)==null?void 0:v.setPointer)==null||b.call(v,o.x,o.y)},onMouseLeave:h?void 0:(()=>{var e,o;(o=(e=d.current)==null?void 0:e.clearPointer)==null||o.call(e)}),onBlur:h?void 0:(()=>{var e,o;(o=(e=d.current)==null?void 0:e.clearPointer)==null||o.call(e)}),onKeyDown:h?void 0:s,onClick:h?void 0:t,children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function Ge({readyId:y,locked:h,onReady:C}){const[x,M]=i.useState(0),[d,P]=i.useState("mine"),[a,R]=i.useState(()=>new Set),[g,I]=i.useState(()=>new Set),[c,t]=i.useState("playing"),[s,e]=i.useState(null),[o,v]=i.useState(0),b=i.useMemo(()=>Ie(),[x]);i.useEffect(()=>{C==null||C(y)},[C,y]),i.useEffect(()=>{P("mine"),R(new Set),I(new Set),t("playing"),e(null),v(0)},[x]),i.useEffect(()=>{if(s==null||c!=="playing")return;const l=()=>{v(Math.min(5999,Math.floor((Date.now()-s)/1e3)))};l();const w=window.setInterval(l,1e3);return()=>{window.clearInterval(w)}},[s,c]);const r=()=>{M(l=>l+1)},p=l=>{if(h||c!=="playing")return;if(s==null&&e(Date.now()),d==="flag"){if(a.has(l))return;const k=new Set(g);k.has(l)?k.delete(l):k.add(l),I(k),le(b,a,k)&&t("won");return}if(g.has(l)||a.has(l))return;if(b.mines.has(l)){const k=new Set(a);for(const S of b.mines)k.add(S);k.add(l),R(k),t("lost");return}const w=Ne(l,b,a,g);R(w),le(b,w,g)&&t("won")},m=b.mineCount-g.size,n=`${String(Math.floor(o/60)).padStart(2,"0")}:${String(o%60).padStart(2,"0")}`;let f="🤔";return c==="lost"?f="😣":c==="won"?f="😎":g.size>=b.mineCount?f="😕":g.size>=b.mineCount-1?f="🤓":g.size>=Math.round(b.mineCount*3/4)?f="😃":g.size>=Math.round(b.mineCount*2/3)?f="😊":g.size>=Math.round(b.mineCount/2)?f="🙂":g.size>=Math.round(b.mineCount/3)?f="😏":g.size>0&&(f="😐"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:u.jsxs("div",{className:"article-web-art-minesweeper",children:[u.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[u.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${d==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("mine"),disabled:h||c!=="playing","aria-pressed":d==="mine",children:"⛏"}),u.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${d==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("flag"),disabled:h||c!=="playing","aria-pressed":d==="flag",children:"🚩"})]}),u.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[b.counts.map((l,w)=>{const k=a.has(w),S=g.has(w),N=b.mines.has(w),L=c==="lost"&&N,_=l>0?Se[l-1]:void 0;return u.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${k?"article-web-art-minesweeper-cell-revealed":""} ${L?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>p(w),disabled:h||c!=="playing","aria-label":`Minesweeper cell ${w+1}`,children:[S&&!k?u.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,L?u.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,k&&!N&&l>0?u.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:l}):null]},`mine-${x}-${w}`)}),c==="lost"?u.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:r,children:["Ooohhh 🙁",u.jsx("br",{}),"Click to try again"]}):null,c==="won"?u.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:r,children:["👌👀✔💯💯💯",u.jsx("br",{}),"Click to restart"]}):null]}),u.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[u.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[u.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:f}),u.jsx("span",{children:m})]}),u.jsx("div",{className:"article-web-art-minesweeper-timer",children:n})]}),u.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function Ue({readyId:y,locked:h,onReady:C}){const x=i.useRef(null),M=i.useRef(null),d=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=i.useMemo(()=>({reduceMotion:R}),[R]);i.useEffect(()=>{const s=x.current,e=M.current;if(!s||!e)return;let o=!1,v=null,b=null,r=null;const p=()=>{P.current||(P.current=!0,C==null||C(y))},m=F(async()=>{var n,f;try{const l=await z(()=>import("./fallingRingsEngine-C9a7CL1C.js"),[]);if(o)return;v=l.createFallingRingsEngine(e,g),d.current=v;const w=()=>$(s,v,Math.min(1.5,window.devicePixelRatio||1));w(),(n=v.renderStatic)==null||n.call(v),(f=v.start)==null||f.call(v),p(),b=new ResizeObserver(()=>{w()}),b.observe(s),"IntersectionObserver"in window&&(r=new IntersectionObserver(k=>{var S,N;for(const L of k)L.isIntersecting?(S=v.start)==null||S.call(v):(N=v.stop)==null||N.call(v)},{threshold:.25}),r.observe(s))}catch{p()}},{timeoutMs:220});return()=>{var n;o=!0,m==null||m(),r==null||r.disconnect(),b==null||b.disconnect(),(n=v==null?void 0:v.destroy)==null||n.call(v),d.current=null}},[g,C,y]);const I=s=>{var e,o,v,b;(o=(e=d.current)==null?void 0:e.setHeld)==null||o.call(e,s),(b=(v=d.current)==null?void 0:v.start)==null||b.call(v)},c=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),I(!0))},t=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),I(!1))};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:h,onPointerDown:h?void 0:s=>{a.current=s.pointerId;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}I(!0)},onPointerUp:h?void 0:s=>{a.current!=null&&s.pointerId!==a.current||(a.current=null,I(!1))},onPointerCancel:h?void 0:()=>{a.current=null,I(!1)},onLostPointerCapture:h?void 0:()=>{a.current=null,I(!1)},onMouseLeave:h?void 0:(()=>{a.current!=null&&I(!1)}),onBlur:h?void 0:(()=>{a.current=null,I(!1)}),onKeyDown:h?void 0:c,onKeyUp:h?void 0:t,children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function Ye({readyId:y,locked:h,onReady:C}){const x=i.useRef(null),M=i.useRef(null),d=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useRef("mouse"),g=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=i.useMemo(()=>({reduceMotion:g,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[g]);i.useEffect(()=>{const t=x.current,s=M.current;if(!t||!s)return;let e=!1,o=null,v=null,b=null;const r=()=>{P.current||(P.current=!0,C==null||C(y))},p=F(async()=>{var m,n;try{const f=await z(()=>import("./prismFieldEngine-Dkw-H_-R.js"),__vite__mapDeps([3,1]));if(e)return;o=f.createPrismFieldEngine(s,I),d.current=o;const l=()=>$(t,o,Math.min(1.5,window.devicePixelRatio||1));l(),(m=o.renderStatic)==null||m.call(o),(n=o.start)==null||n.call(o),r(),v=new ResizeObserver(()=>{l()}),v.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(w=>{var k,S;for(const N of w)N.isIntersecting?(k=o.start)==null||k.call(o):(S=o.stop)==null||S.call(o)},{threshold:.25}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var m;e=!0,p==null||p(),b==null||b.disconnect(),v==null||v.disconnect(),(m=o==null?void 0:o.destroy)==null||m.call(o),d.current=null}},[I,C,y]);const c=t=>{const s=x.current;if(!s)return{x:.5,y:.5};const e=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(t.clientY-e.top)/Math.max(1,e.height)))}};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:h,onPointerDown:h?void 0:t=>{var e,o;a.current=t.pointerId,R.current=t.pointerType||"mouse";try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const s=c(t);(o=(e=d.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onPointerMove:h?void 0:t=>{var e,o;if(a.current!=null&&t.pointerId!==a.current)return;const s=c(t);(o=(e=d.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onPointerUp:h?void 0:t=>{var s,e;a.current!=null&&t.pointerId!==a.current||(a.current=null,(t.pointerType||R.current)==="mouse"&&((e=(s=d.current)==null?void 0:s.clearPointer)==null||e.call(s)))},onPointerCancel:h?void 0:(()=>{var t,s;a.current=null,R.current==="mouse"&&((s=(t=d.current)==null?void 0:t.clearPointer)==null||s.call(t))}),onMouseMove:h?void 0:t=>{var e,o;const s=c(t);(o=(e=d.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onMouseLeave:h?void 0:(()=>{var t,s;a.current=null,(s=(t=d.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onBlur:h?void 0:(()=>{var t,s;a.current=null,R.current="mouse",(s=(t=d.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:h?void 0:(t=>{var s,e,o,v;(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),(e=(s=d.current)==null?void 0:s.reset)==null||e.call(s),(v=(o=d.current)==null?void 0:o.start)==null||v.call(o))}),children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function Xe({readyId:y,locked:h,onReady:C}){const x=i.useRef(null),M=i.useRef(null),d=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=i.useMemo(()=>({reduceMotion:R}),[R]);i.useEffect(()=>{const t=x.current,s=M.current;if(!t||!s)return;let e=!1,o=null,v=null,b=null;const r=()=>{P.current||(P.current=!0,C==null||C(y))},p=F(async()=>{var m,n;try{const f=await z(()=>import("./ropeLightEngine-B3dT-ds-.js"),[]);if(e)return;o=f.createRopeLightEngine(s,g),d.current=o;const l=()=>$(t,o,Math.min(1.5,window.devicePixelRatio||1));l(),(m=o.renderStatic)==null||m.call(o),(n=o.start)==null||n.call(o),r(),v=new ResizeObserver(()=>{l()}),v.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(w=>{var k,S;for(const N of w)N.isIntersecting?(k=o.start)==null||k.call(o):(S=o.stop)==null||S.call(o)},{threshold:.25}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var m;e=!0,p==null||p(),b==null||b.disconnect(),v==null||v.disconnect(),(m=o==null?void 0:o.destroy)==null||m.call(o),d.current=null}},[g,C,y]);const I=t=>{const s=x.current;if(!s)return{x:.5,y:.5};const e=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(t.clientY-e.top)/Math.max(1,e.height)))}},c=()=>{var t,s,e,o;(s=(t=d.current)==null?void 0:t.reset)==null||s.call(t),(o=(e=d.current)==null?void 0:e.start)==null||o.call(e)};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:h,onClick:h?void 0:c,onPointerDown:h?void 0:t=>{var e,o;a.current=t.pointerId;const s=I(t);(o=(e=d.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onPointerMove:h?void 0:t=>{var e,o;if(a.current!=null&&t.pointerId!==a.current)return;const s=I(t);(o=(e=d.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onPointerUp:h?void 0:t=>{var s,e;a.current!=null&&t.pointerId!==a.current||(a.current=null,(e=(s=d.current)==null?void 0:s.clearPointer)==null||e.call(s))},onPointerCancel:h?void 0:(()=>{var t,s;a.current=null,(s=(t=d.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onMouseMove:h?void 0:t=>{var e,o;const s=I(t);(o=(e=d.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onMouseLeave:h?void 0:(()=>{var t,s;a.current=null,(s=(t=d.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onBlur:h?void 0:(()=>{var t,s;a.current=null,(s=(t=d.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:h?void 0:(t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),c())}),children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}function Je({readyId:y,locked:h,onReady:C}){const x=i.useRef(null),M=i.useRef(null),d=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=i.useMemo(()=>({reduceMotion:R}),[R]);i.useEffect(()=>{const c=x.current,t=M.current;if(!c||!t)return;let s=!1,e=null,o=null,v=null;const b=()=>{P.current||(P.current=!0,C==null||C(y))},r=F(async()=>{var p,m;try{const n=await z(()=>import("./soupShaderEngine-DOT8TiBo.js"),__vite__mapDeps([4,1]));if(s)return;e=n.createSoupShaderEngine(t,g),d.current=e;const f=()=>$(c,e,Math.min(1.5,window.devicePixelRatio||1));f(),(p=e.renderStatic)==null||p.call(e),(m=e.start)==null||m.call(e),b(),o=new ResizeObserver(()=>{f()}),o.observe(c),"IntersectionObserver"in window&&(v=new IntersectionObserver(l=>{var w,k;for(const S of l)S.isIntersecting?(w=e.start)==null||w.call(e):(k=e.stop)==null||k.call(e)},{threshold:.25}),v.observe(c))}catch{b()}},{timeoutMs:220});return()=>{var p;s=!0,r==null||r(),v==null||v.disconnect(),o==null||o.disconnect(),(p=e==null?void 0:e.destroy)==null||p.call(e),d.current=null}},[g,C,y]);const I=c=>{const t=x.current;if(!t)return{x:.5,y:.5};const s=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(c.clientX-s.left)/Math.max(1,s.width))),y:Math.max(0,Math.min(1,(c.clientY-s.top)/Math.max(1,s.height)))}};return u.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Soup shader web art tile",disabled:h,onPointerDown:h?void 0:c=>{var s,e,o,v;a.current=c.pointerId;try{c.currentTarget.setPointerCapture(c.pointerId)}catch{}const t=I(c);(e=(s=d.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y),(v=(o=d.current)==null?void 0:o.setHeld)==null||v.call(o,!0)},onPointerMove:h?void 0:c=>{var s,e;if(a.current!=null&&c.pointerId!==a.current)return;const t=I(c);(e=(s=d.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y)},onPointerUp:h?void 0:c=>{var t,s;a.current!=null&&c.pointerId!==a.current||(a.current=null,(s=(t=d.current)==null?void 0:t.setHeld)==null||s.call(t,!1))},onPointerCancel:h?void 0:(()=>{var c,t;a.current=null,(t=(c=d.current)==null?void 0:c.setHeld)==null||t.call(c,!1)}),onMouseMove:h?void 0:c=>{var s,e;const t=I(c);(e=(s=d.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y)},onMouseLeave:h?void 0:(()=>{var c,t,s,e;a.current=null,(t=(c=d.current)==null?void 0:c.setHeld)==null||t.call(c,!1),(e=(s=d.current)==null?void 0:s.clearPointer)==null||e.call(s)}),onBlur:h?void 0:(()=>{var c,t,s,e;a.current=null,(t=(c=d.current)==null?void 0:c.setHeld)==null||t.call(c,!1),(e=(s=d.current)==null?void 0:s.clearPointer)==null||e.call(s)}),children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function Ze({readyId:y,locked:h,onReady:C}){const x=i.useRef(null),M=i.useRef(null),d=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useRef(null),g=i.useRef(0),[I,c]=i.useState(!1),[t,s]=i.useState(!1),[e,o]=i.useState([]),v=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),b=i.useMemo(()=>({reduceMotion:v}),[v]);i.useEffect(()=>{const n=x.current,f=M.current;if(!n||!f)return;let l=!1,w=null,k=null,S=null;const N=()=>{P.current||(P.current=!0,C==null||C(y))},L=F(async()=>{var _,T;try{const O=await z(()=>import("./tardisWormholeEngine-BSErFcgT.js"),__vite__mapDeps([5,1]));if(l)return;w=O.createTardisWormholeEngine(f,b),d.current=w;const H=()=>$(n,w,Math.min(1.5,window.devicePixelRatio||1));H(),(_=w.renderStatic)==null||_.call(w),(T=w.start)==null||T.call(w),N(),k=new ResizeObserver(()=>{H()}),k.observe(n),"IntersectionObserver"in window&&(S=new IntersectionObserver(W=>{var G,V;for(const X of W)X.isIntersecting?(G=w.start)==null||G.call(w):(V=w.stop)==null||V.call(w)},{threshold:.25}),S.observe(n))}catch{N()}},{timeoutMs:220});return()=>{var _;l=!0,L==null||L(),S==null||S.disconnect(),k==null||k.disconnect(),(_=w==null?void 0:w.destroy)==null||_.call(w),d.current=null}},[b,C,y]),i.useEffect(()=>{if(e.length===0)return;const n=window.setTimeout(()=>{o(f=>f.slice(1))},1e3);return()=>{window.clearTimeout(n)}},[e]),i.useEffect(()=>{var f,l,w;const n=d.current;if(n){if(h){s(!1),c(!1),R.current=null,(f=n.clearPointer)==null||f.call(n),(l=n.stop)==null||l.call(n);return}(w=n.start)==null||w.call(n)}},[h]);const r=n=>{const f=x.current;if(!f)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const l=f.getBoundingClientRect(),w=Math.max(0,Math.min(l.width,n.clientX-l.left)),k=Math.max(0,Math.min(l.height,n.clientY-l.top)),S=R.current,N=S?w-S.px:0,L=S?k-S.py:0;return R.current={px:w,py:k},f.style.setProperty("--tardis-cursor-x",`${w}px`),f.style.setProperty("--tardis-cursor-y",`${k}px`),{x:l.width>0?w/l.width:.5,y:l.height>0?k/l.height:.5,px:w,py:k,dx:N,dy:L}},p=(n,f)=>{const l=g.current++;o(w=>[...w,{id:l,x:n,y:f}])},m=n=>{var l,w,k,S;const f=r(n);p(f.px,f.py),(w=(l=d.current)==null?void 0:l.boost)==null||w.call(l),(S=(k=d.current)==null?void 0:k.start)==null||S.call(k),s(!0),window.setTimeout(()=>{s(!1)},650)};return u.jsxs("button",{type:"button",ref:x,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${I?"article-web-art-tile-tardis-active":""} ${t?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:h,onClick:h?void 0:m,onContextMenu:h?void 0:(n=>{var l,w,k,S;n.preventDefault();const f=r(n);p(f.px,f.py),(w=(l=d.current)==null?void 0:l.reverseBurst)==null||w.call(l),(S=(k=d.current)==null?void 0:k.start)==null||S.call(k)}),onWheel:h?void 0:(n=>{var f,l;(l=(f=d.current)==null?void 0:f.addScrollBoost)==null||l.call(f,n.deltaY*.003)}),onPointerDown:h?void 0:n=>{var l,w;a.current=n.pointerId;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}const f=r(n);(w=(l=d.current)==null?void 0:l.setPointer)==null||w.call(l,f.x,f.y,f.dx,f.dy)},onPointerMove:h?void 0:n=>{var l,w,k,S;if(a.current!=null&&n.pointerId!==a.current)return;const f=r(n);(w=(l=d.current)==null?void 0:l.setPointer)==null||w.call(l,f.x,f.y,f.dx,f.dy),(n.buttons&1)===1&&((S=(k=d.current)==null?void 0:k.drag)==null||S.call(k,f.dx))},onPointerUp:h?void 0:n=>{a.current!=null&&n.pointerId!==a.current||(a.current=null)},onPointerCancel:h?void 0:(()=>{a.current=null}),onMouseEnter:h?void 0:(()=>{c(!0)}),onMouseMove:h?void 0:n=>{var l,w;const f=r(n);(w=(l=d.current)==null?void 0:l.setPointer)==null||w.call(l,f.x,f.y,f.dx,f.dy)},onMouseLeave:h?void 0:(()=>{var n,f;a.current=null,R.current=null,c(!1),(f=(n=d.current)==null?void 0:n.clearPointer)==null||f.call(n)}),onBlur:h?void 0:(()=>{var n,f;a.current=null,R.current=null,c(!1),(f=(n=d.current)==null?void 0:n.clearPointer)==null||f.call(n)}),onKeyDown:h?void 0:(n=>{var f,l,w,k;(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),(l=(f=d.current)==null?void 0:f.boost)==null||l.call(f),(k=(w=d.current)==null?void 0:w.start)==null||k.call(w))}),children:[u.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),u.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-cursor","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-cursor-dot","aria-hidden":!0}),u.jsxs("div",{className:"article-web-art-tardis-hud","aria-hidden":!0,children:[u.jsx("div",{className:"article-web-art-tardis-hud-label",children:"Traversing Singularity"}),u.jsx("div",{className:"article-web-art-tardis-hud-bar"})]}),e.map(n=>u.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${n.x}px`,top:`${n.y}px`},"aria-hidden":!0},n.id)),u.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function Qe({label:y,clickLabel:h,previewRequested:C=!1}){const x=de(),M=i.useRef(null),[d,P]=i.useState(!1),[a,R]=i.useState(0),g=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=i.useCallback(()=>{R(Date.now()),P(!0)},[]),c=i.useCallback(()=>{x.navigateToSectionWithId("contact")},[x]),t=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),I())},s=i.useMemo(()=>d?Le({seed:`${a||Date.now()}:${y}`,reduceMotion:g}):"",[y,d,a,g]);return i.useEffect(()=>{if(C){R(Date.now()),P(!0);return}P(!1)},[C]),u.jsxs("div",{ref:M,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${d?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":d?"Kontakt preview":y,"aria-pressed":d,onClick:I,onKeyDown:t,children:[u.jsxs("div",{className:`article-web-art-tile-cta-preview ${d?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[d&&u.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:s,sandbox:"allow-scripts"},`${a}-${y}`),u.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!d&&u.jsx("div",{className:`loader ${g?"loader-reduce-motion":""}`,"aria-hidden":!0,children:u.jsxs("div",{className:"loader-inner",children:[u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})})]})}),u.jsxs("div",{className:`article-web-art-tile-cta-content ${d?"article-web-art-tile-cta-content-hidden":""}`,children:[u.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:y}),u.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:h})]}),d&&u.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),c()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),c())},children:"Kontakt"})]})}function We({locked:y=!1}){const h=i.useRef(null),C=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),x=i.useRef(!1),M=i.useRef(0),d=i.useRef(null),P=i.useRef(null),a=i.useRef(1),R=i.useRef(null);return i.useEffect(()=>{const g=h.current;if(!g)return;const I=p=>{const m=Math.max(0,Math.min(1,p));return m*m*(3-2*m)},c=()=>{const p=g.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),m=[];for(const n of p){const f=n.getAnimations?n.getAnimations():[];for(const l of f)m.push(l)}return m},t=p=>{const m=Math.max(1,Math.min(5.2,Number(p)||1));a.current=m;const n=c();for(const f of n)f.playbackRate=m},s=()=>{x.current=!1,d.current=null,g.classList.remove("article-web-art-tile-goldfish-held"),P.current!=null&&cancelAnimationFrame(P.current),P.current=null;const p=a.current,m=360,n=performance.now();R.current!=null&&cancelAnimationFrame(R.current);const f=()=>{const l=(performance.now()-n)/m,w=I(l);t(p+(1-p)*w),l<1?R.current=requestAnimationFrame(f):R.current=null};R.current=requestAnimationFrame(f)},e=()=>{if(!x.current)return;const p=performance.now()-M.current,m=1.2+4*I(p/2400);t(m),P.current=requestAnimationFrame(e)},o=p=>{if(!C&&!(p.button!=null&&p.button!==0)){x.current=!0,M.current=performance.now(),d.current=p.pointerId,g.classList.add("article-web-art-tile-goldfish-held");try{g.setPointerCapture(p.pointerId)}catch{}R.current!=null&&(cancelAnimationFrame(R.current),R.current=null),P.current==null&&(P.current=requestAnimationFrame(e))}},v=()=>{s()},b=()=>{s()},r=()=>{s()};return g.addEventListener("pointerdown",o),g.addEventListener("pointerup",v),g.addEventListener("pointercancel",b),g.addEventListener("lostpointercapture",r),()=>{g.removeEventListener("pointerdown",o),g.removeEventListener("pointerup",v),g.removeEventListener("pointercancel",b),g.removeEventListener("lostpointercapture",r),s(),R.current!=null&&cancelAnimationFrame(R.current),R.current=null}},[C]),i.useEffect(()=>{const g=h.current;g&&g.classList.toggle("article-web-art-tile-goldfish-locked",y)},[y]),u.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:h,role:"img","aria-label":"Goldfish animation tile",children:[u.jsx("div",{className:"fish-stage",children:u.jsx("div",{className:"fish-wrapper",children:u.jsx("div",{className:"fish-container",children:u.jsxs("div",{className:"fish-parts",children:[u.jsx("div",{className:"fish-body front"}),u.jsx("div",{className:"fish-body back"}),u.jsx("div",{className:"fish-back-bottom-fin front"}),u.jsx("div",{className:"fish-back-bottom-fin back"}),u.jsx("div",{className:"fish-back-fin"}),u.jsx("div",{className:"fish-front-bottom-fin front"}),u.jsx("div",{className:"fish-front-bottom-fin back"}),u.jsx("div",{className:"fish-top-fin"})]})})})}),u.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function et({locked:y=!1}){const h=i.useRef(null),C=i.useRef([]),x=i.useRef(0),M=i.useRef(0),d=Ee,P=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return i.useEffect(()=>{const a=h.current;if(!a)return;const R=C.current.filter(Boolean);if(!R.length)return;let g=!0,I=!1,c=null,t=null;const s=(l,w)=>{const k=(l-.5)*30;for(let S=0;S<R.length;S++){const N=R[S],L=S*18,_=S*8,T=(l-.5)*L,O=(w-.5)*_;N.style.transform=`translate3d(${T}px, ${O}px, 0) rotateY(${k}deg)`}},e=(l,w)=>{const k=Math.max(-.55,Math.min(.55,(l-.5)*1.1)),S=Math.max(-.35,Math.min(.35,(w-.5)*.7));s(.5+k,.5+S)},o=l=>{const w=a.getBoundingClientRect(),k=(l.clientX-w.left)/Math.max(1,w.width),S=(l.clientY-w.top)/Math.max(1,w.height);g=!0,M.current=performance.now()+650,e(Math.max(0,Math.min(1,k)),Math.max(0,Math.min(1,S)))},v=l=>{const w=a.getBoundingClientRect(),k=(l.clientX-w.left)/Math.max(1,w.width),S=(l.clientY-w.top)/Math.max(1,w.height);return{x:Math.max(0,Math.min(1,k)),y:Math.max(0,Math.min(1,S))}},b=l=>{if(l.pointerType==="mouse")return;I=!0,c=l.pointerId,g=!0,M.current=performance.now()+900;const w=v(l);e(w.x,w.y),!P&&t==null&&(t=requestAnimationFrame(f))},r=l=>{if(!I||c!=null&&l.pointerId!==c)return;g=!0,M.current=performance.now()+900;const w=v(l);e(w.x,w.y)},p=l=>{c!=null&&(l==null?void 0:l.pointerId)!=null&&l.pointerId!==c||(I=!1,c=null,g=!0,!P&&t==null&&(t=requestAnimationFrame(f)))},m=()=>{g=!0,!P&&t==null&&(t=requestAnimationFrame(f))},n=()=>{g=!0,!P&&t==null&&(t=requestAnimationFrame(f))},f=()=>{if(g){if(!P&&performance.now()>=M.current){x.current+=.008;const l=Math.sin(x.current)*.5+.5;e(l,.5)}t=requestAnimationFrame(f)}};return g=!y,a.addEventListener("mouseenter",m),a.addEventListener("mousemove",o),a.addEventListener("mouseleave",n),a.addEventListener("pointerdown",b),a.addEventListener("pointermove",r),a.addEventListener("pointerup",p),a.addEventListener("pointercancel",p),e(.5,.5),!P&&!y&&(t=requestAnimationFrame(f)),()=>{a.removeEventListener("mouseenter",m),a.removeEventListener("mousemove",o),a.removeEventListener("mouseleave",n),a.removeEventListener("pointerdown",b),a.removeEventListener("pointermove",r),a.removeEventListener("pointerup",p),a.removeEventListener("pointercancel",p),t!=null&&cancelAnimationFrame(t)}},[P]),u.jsxs("div",{ref:h,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[u.jsxs("div",{className:"patronus-card",children:[u.jsx("div",{className:"patronus-layer patronus-bg",ref:a=>{C.current[0]=a},children:u.jsx("img",{alt:"",src:d[0]})}),u.jsx("div",{className:"patronus-layer",ref:a=>{C.current[1]=a},children:u.jsx("img",{alt:"",src:d[1]})}),u.jsx("div",{className:"patronus-layer",ref:a=>{C.current[2]=a},children:u.jsx("img",{alt:"",src:d[2]})}),u.jsx("div",{className:"patronus-layer patronus-svg",ref:a=>{C.current[3]=a},dangerouslySetInnerHTML:{__html:ge}}),u.jsx("div",{className:"patronus-layer",ref:a=>{C.current[4]=a},children:u.jsx("img",{alt:"",src:d[3]})}),u.jsx("div",{className:"patronus-layer",ref:a=>{C.current[5]=a},children:u.jsx("img",{alt:"",src:d[4]})}),u.jsx("div",{className:"patronus-layer",ref:a=>{C.current[6]=a},children:u.jsx("img",{alt:"",src:d[5]})})]}),u.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{at as default};
