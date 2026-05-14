const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/hourglassEngine-B2tBAn_O.js","assets/vendor-BUjjXRU6.js","assets/react-vendor-D1LkQUJD.js","assets/threeTunnelEngine-YAbz1VnK.js","assets/three-BYTi_f6D.js","assets/threePolygonDemo5Engine-BcBzJu0K.js","assets/prismFieldEngine-Dkw-H_-R.js","assets/soupShaderEngine-DOT8TiBo.js","assets/tardisWormholeEngine-BSErFcgT.js"])))=>i.map(i=>d[i]);
import{c as ye,g as de,A as ae,_ as B}from"./index-BXZGLcEq.js";import{r as l,j as h}from"./react-vendor-D1LkQUJD.js";import"./swiper-BJPGAhIX.js";/* empty css              */import"./bootstrap-jfx39s8c.js";import"./vendor-BUjjXRU6.js";const Me=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`;function z(y,{timeoutMs:x=1200}={}){if(typeof window>"u")return y(),()=>{};if("requestIdleCallback"in window){const f=window.requestIdleCallback(()=>y(),{timeout:x});return()=>window.cancelIdleCallback(f)}const C=window.setTimeout(()=>y(),0);return()=>window.clearTimeout(C)}function Re(y){if(!y)return{width:1,height:1};const x=y.getBoundingClientRect(),C=Math.max(1,Math.round(x.width||y.clientWidth||1)),f=Math.max(1,Math.round(x.height||y.clientHeight||1));return{width:C,height:f}}function F(y,x,C=1){var m;const{width:f,height:R}=Re(y);(m=x==null?void 0:x.setSize)==null||m.call(x,f,R,C)}function ce(y,x,C="smooth"){if(typeof window>"u")return;const f=document.getElementById(y),R=document.getElementById(`scrollable-${x}`);if(!f||!R)return;const m=f.getBoundingClientRect(),P=R.getBoundingClientRect(),c=R.scrollTop+(m.top-P.top);R.scrollTo({top:Math.max(0,c),behavior:C})}const ge=9,Pe=9,ke=10,Se=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],Ie=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function Ee(y=ge,x=Pe,C=ke){const f=y*x,R=Math.max(1,Math.min(C,f-1)),m=new Set;for(;m.size<R;)m.add(Math.floor(Math.random()*f));const P=new Array(f).fill(0);for(let c=0;c<f;c++){if(m.has(c)){P[c]=-1;continue}const k=c%x,M=Math.floor(c/x);let I=0;for(let d=-1;d<=1;d++)for(let n=-1;n<=1;n++){if(n===0&&d===0)continue;const s=k+n,e=M+d;s<0||e<0||s>=x||e>=y||m.has(e*x+s)&&(I+=1)}P[c]=I}return{rows:y,cols:x,mineCount:R,mines:m,counts:P}}function Ne(y,x,C,f){const R=new Set(C),m=[y];for(;m.length>0;){const P=m.pop();if(P==null||R.has(P)||f.has(P)||x.mines.has(P)||(R.add(P),x.counts[P]!==0))continue;const c=P%x.cols,k=Math.floor(P/x.cols);for(let M=-1;M<=1;M++)for(let I=-1;I<=1;I++){if(I===0&&M===0)continue;const d=c+I,n=k+M;d<0||n<0||d>=x.cols||n>=x.rows||m.push(n*x.cols+d)}}return R}function le(y,x,C){const f=y.rows*y.cols-y.mineCount;if(x.size>=f)return!0;if(C.size!==y.mineCount)return!1;for(const R of y.mines)if(!C.has(R))return!1;return!0}function je(y){return`Web art ${String(y||"tile").toLowerCase()} tile loading`}function _e({seed:y,reduceMotion:x}){const C=JSON.stringify(Ce.split("<\/script>").join("<\\/script>")),f=JSON.stringify(y);return`<!doctype html>
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
    reduceMotion: ${x?"true":"false"},
    seed: ${f}
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
</html>`}function dt({dataWrapper:y,id:x}){var ie;const C=ye(),f=de(),R=`${y.uniqueId}-ambient-trace`,m=`${y.uniqueId}-ambient-hex`,P=`${y.uniqueId}-ambient-plop`,c=`${y.uniqueId}-ambient-julia`,k=`${y.uniqueId}-ambient-mines`,M=`${y.uniqueId}-ambient-rings`,I=`${y.uniqueId}-ambient-prism`,d=`${y.uniqueId}-ambient-rope`,n=`${y.uniqueId}-ambient-soup`,s=`${y.uniqueId}-ambient-tardis`,[e,i]=l.useState(null),[r,a]=l.useState(!0),t=l.useMemo(()=>y.orderedItems,[y.orderedItems]),u=l.useMemo(()=>{const E=[4,5,3,6,1,2,7,8,9,10,11],T=new Map(t.map(O=>[Number(O==null?void 0:O.id),O])),D=[];for(const O of E){const $=T.get(O);$&&D.push($)}for(const O of t){if(!O)continue;const $=Number(O==null?void 0:O.id);E.includes($)||D.push(O)}return D},[t]),w=l.useRef(null),[o,b]=l.useState(!1),p=l.useRef(new Set),v=l.useRef(new Map),[g,S]=l.useState(0),[N,_]=l.useState(-1),[j,L]=l.useState(()=>new Set),[A,H]=l.useState(()=>new Set),[X,G]=l.useState(!1),V=l.useMemo(()=>{const E=u.map(T=>T==null?void 0:T.uniqueId).filter(Boolean);return E.push(R,m,P,c,k,I,M,d,n,s,"ambient-goldfish","ambient-patronus"),new Set(E)},[m,c,k,P,I,M,d,n,s,R,u]),J=l.useMemo(()=>Array.from(A).filter(E=>E!=="ambient-goldfish"&&E!=="ambient-patronus"),[A]),q=r,Y=C.selectedLanguageId||"en";let Z=C.getString("send_yours");typeof Z=="string"&&Z.startsWith("locale:")&&(Z={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[Y]||"Send yours!");let Q=C.getString("click");typeof Q=="string"&&Q.startsWith("locale:")&&(Q={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[Y]||"Click");const te={en:{title:"Doors of the world behind an amazing art gallery.",note:"At your own risk",revealNote:"At your own risk click on the card to reveal it!",button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",note:"Auf eigenes Risiko",button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",note:"Na vlastiti rizik",button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",note:"Tüm risk size ait",button:"Gir",preparing:"Hazırlanıyor..."}}[Y]||{note:"At your own risk",button:"Enter"},fe=Y==="de"?"Auf eigenes Risiko klicke auf die Karte, um sie zu öffnen!":Y==="hr"?"Na vlastiti rizik klikni karticu da je otkriješ!":Y==="tr"?"Tüm risk size ait, göstermek için karta tıklayın!":"At your own risk click on the card to reveal it!",he="hide",K=l.useCallback(E=>{if(!E||p.current.has(E))return;p.current.add(E);const T=v.current.get(E);T!=null&&(window.clearTimeout(T),v.current.delete(E)),S(p.current.size)},[]),ne=l.useCallback(E=>{E&&H(T=>{if(T.has(E))return T;const D=new Set(T);return D.add(E),D})},[]),W=l.useCallback(()=>{for(const E of v.current.values())window.clearTimeout(E);v.current=new Map,p.current=new Set,S(0),_(-1),b(!1),L(new Set),H(new Set),G(!1)},[]),ee=l.useCallback(()=>{a(!1),b(!0),_(u.length-1),L(new Set),H(new Set),G(!1)},[u.length]);l.useEffect(()=>{var oe;if(typeof window>"u"||((oe=f.targetSection)==null?void 0:oe.id)!==y.sectionId||f.transitionStatus!=="transition_status_none")return;const E=window.__pendingSectionAction;if(!E||E.action!=="enter"||E.sectionId!==y.sectionId||E.targetArticleId&&E.targetArticleId!==y.uniqueId)return;if(Date.now()-(E.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,ee();const T=E.targetArticleId||y.uniqueId;let D=null,O=null,$=null,U=null;return D=window.setTimeout(()=>{O=window.requestAnimationFrame(()=>{ce(T,y.sectionId),$=window.setTimeout(()=>{U=window.requestAnimationFrame(()=>{ce(T,y.sectionId)})},220)})},90),()=>{D!==null&&window.clearTimeout(D),O!==null&&window.cancelAnimationFrame(O),$!==null&&window.clearTimeout($),U!==null&&window.cancelAnimationFrame(U)}},[y.uniqueId,y.sectionId,(ie=f.targetSection)==null?void 0:ie.id,f.transitionStatus,ee]);const re=l.useCallback(E=>{E&&(ne(E),L(T=>{if(T.has(E))return T;const D=new Set(T);return D.add(E),D}))},[ne]),se=l.useCallback(E=>{E&&(L(T=>{if(!T.has(E))return T;const D=new Set(T);return D.delete(E),D}),H(T=>{if(!T.has(E))return T;const D=new Set(T);return D.delete(E),D}))},[]),be=V.size>0&&j.size>=V.size,pe=l.useCallback(()=>{if(V.size>0&&j.size>=V.size){L(new Set),H(new Set),G(!1);return}H(new Set(V)),L(new Set(V)),G(!0)},[V,j.size]),me=l.useCallback(()=>{W(),a(!0)},[W]),we=(E,T)=>{const D=Number(E==null?void 0:E.id);return D===1?"Hover":D===2?"Wave":D===3?"3D":D===4?"Poly":D===5?"Click":D===6?"Orbit":D===7?"Spin":D===8?"Shape":D===9?"Hourglass":D===10?"Noice":D===11?"Distance":String(T+1)},xe=u.map((E,T)=>{if(!o)return h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${T+1} loading`},E.uniqueId);const D=E.uniqueId,O=j.has(D),$=A.has(D)||O;return h.jsx(ue,{label:we(E,T),isOpen:O,onToggle:()=>{O?se(D):re(D)},shouldRender:$,children:$&&h.jsx(Te,{itemWrapper:E,index:T,locked:q||!O,activate:T<=N,onReady:K})},D)}),ve=o?[{key:"ambient-trace",tileId:R,label:"Trace",render:E=>h.jsx(Ge,{readyId:R,locked:q||!E,onReady:K})},{key:"ambient-hex",tileId:m,label:"Hex",render:E=>h.jsx(Ye,{readyId:m,locked:q||!E,onReady:K})},{key:"ambient-plop",tileId:P,label:"Plop",render:E=>h.jsx(Ue,{readyId:P,locked:q||!E,onReady:K})},{key:"ambient-julia",tileId:c,label:"Julia",render:E=>h.jsx(Xe,{readyId:c,locked:q||!E,onReady:K})},{key:"ambient-mines",tileId:k,label:"Bomb",render:E=>h.jsx(Je,{readyId:k,locked:q||!E,onReady:K})},{key:"ambient-rings",tileId:M,label:"Fall",render:E=>h.jsx(Ze,{readyId:M,locked:q||!E,onReady:K})},{key:"ambient-prism",tileId:I,label:"Prism",render:E=>h.jsx(Qe,{readyId:I,locked:q||!E,onReady:K})},{key:"ambient-rope",tileId:d,label:"Rope",render:E=>h.jsx(We,{readyId:d,locked:q||!E,onReady:K})},{key:"ambient-soup",tileId:n,label:"Soup",render:E=>h.jsx(et,{readyId:n,locked:q||!E,onReady:K})},{key:"ambient-tardis",tileId:s,label:"Tardis",render:E=>h.jsx(tt,{readyId:s,locked:q||!E,onReady:K})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:E=>h.jsx(rt,{locked:q||!E})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:E=>h.jsx(st,{locked:q||!E})}].map(({key:E,tileId:T,label:D,render:O})=>{const $=j.has(T),U=A.has(T)||$;return h.jsx(ue,{label:D,isOpen:$,onToggle:()=>{$?se(T):re(T)},shouldRender:U,children:U&&O($)},E)}):[h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return l.useEffect(()=>{W()},[y.uniqueId,W]),l.useEffect(()=>{o&&_(u.length-1)},[o,u.length]),l.useEffect(()=>{if(o)for(const E of J){if(!E||p.current.has(E)||v.current.has(E))continue;const T=window.setTimeout(()=>{K(E)},12e3);v.current.set(E,T)}},[o,J,K]),h.jsx(ae,{id:y.uniqueId,type:ae.Types.SPACING_DEFAULT,dataWrapper:y,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:i,children:h.jsxs("div",{className:"article-web-art-shell",children:[h.jsx(Le,{note:r?te.note:fe,buttonLabel:r?te.button:he,hidden:!r,onEnter:r?ee:me,secondaryButtonLabel:r?null:"promaja",onSecondaryAction:r?null:pe,secondaryPressed:be}),h.jsx("div",{className:`article-web-art-stage ${r?"article-web-art-stage-preview":""}`,"aria-hidden":r,children:h.jsxs("div",{className:`article-web-art-items ${q?"article-web-art-items-locked":""}`,ref:w,"aria-busy":r,children:[o&&h.jsx(nt,{label:Z,clickLabel:Q,previewRequested:X}),xe,ve]})})]})})}function Le({note:y,buttonLabel:x,hidden:C,onEnter:f,secondaryButtonLabel:R=null,onSecondaryAction:m=null,secondaryPressed:P=!1}){const c=k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),f())};return h.jsx("div",{className:`article-web-art-intro-cover ${C?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:h.jsxs("div",{className:"article-web-art-intro-cover-inner",children:[h.jsx("div",{className:"article-web-art-intro-cover-actions",children:h.jsx("span",{className:`article-web-art-intro-cover-note ${C?"article-web-art-intro-cover-note-compact":"article-web-art-intro-cover-note-expanded"}`,children:y})}),h.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[R?h.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${P?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:m||void 0,"aria-pressed":P,"aria-label":R,children:R}):null,h.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:f,onKeyDown:c,"aria-label":x,children:x})]})]})})}function ue({label:y,isOpen:x,onToggle:C,shouldRender:f=!0,children:R}){return h.jsxs("div",{className:`article-web-art-gated-tile ${x?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[f?R:h.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":je(y)}),h.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),h.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${x?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:C,"aria-label":`${x?"Hide":"Show"} ${y}`,children:y})]})}function Te({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){return Number(y.id)===1?h.jsx(Fe,{itemWrapper:y,index:x,activate:C,locked:f,onReady:R}):Number(y.id)===2?h.jsx($e,{itemWrapper:y,index:x,activate:C,locked:f,onReady:R}):Number(y.id)===3?h.jsx(qe,{itemWrapper:y,index:x,activate:C,locked:f,onReady:R}):Number(y.id)===4?h.jsx(Ke,{itemWrapper:y,index:x,activate:C,locked:f,onReady:R}):Number(y.id)===6?h.jsx(Ve,{itemWrapper:y,index:x,activate:C,locked:f,onReady:R}):Number(y.id)===7?h.jsx(Ae,{itemWrapper:y,locked:f,onReady:R}):Number(y.id)===8?h.jsx(Oe,{itemWrapper:y,index:x,activate:C,locked:f,onReady:R}):Number(y.id)===9?h.jsx(He,{itemWrapper:y,index:x,activate:C,locked:f,onReady:R}):Number(y.id)===10?h.jsx(Be,{itemWrapper:y,index:x,activate:C,locked:f,onReady:R}):Number(y.id)===11?h.jsx(De,{itemWrapper:y,index:x,activate:C,locked:f,onReady:R}):h.jsx(ze,{itemWrapper:y,index:x,activate:C,locked:f,onReady:R})}function De({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){const m=l.useRef(null),P=l.useRef(null),c=l.useRef(null),k=l.useRef(!1),M=l.useRef(!0),I=l.useRef(null),d=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=l.useMemo(()=>({seed:54013+(Number(y.id)||11)*7331,reduceMotion:d}),[y.id,d]);l.useEffect(()=>{if(!C)return;const e=m.current,i=P.current;if(!e||!i)return;let r=!1,a=null,t=null,u=null;const w=()=>{k.current||(k.current=!0,R==null||R(y.uniqueId))},o=z(async()=>{var b,p;try{const v=await B(()=>import("./distanceFieldEngine-Qtz8TZwr.js"),[]);if(r)return;a=v.createDistanceFieldEngine(i,n),c.current=a;const g=()=>F(e,a,Math.min(1.5,window.devicePixelRatio||1));g(),(b=a.renderStatic)==null||b.call(a),f||(p=a.start)==null||p.call(a),w(),t=new ResizeObserver(()=>{g()}),t.observe(e),"IntersectionObserver"in window&&(u=new IntersectionObserver(S=>{var N,_,j,L;for(const A of S){if(M.current=!!A.isIntersecting,f){(N=a.setHoverActive)==null||N.call(a,!1),(_=a.stop)==null||_.call(a);continue}M.current?(j=a.start)==null||j.call(a):(L=a.stop)==null||L.call(a)}},{threshold:.25}),u.observe(e))}catch{w()}},{timeoutMs:220});return()=>{var b;r=!0,o==null||o(),u==null||u.disconnect(),t==null||t.disconnect(),(b=a==null?void 0:a.destroy)==null||b.call(a),c.current=null}},[C,n,y.uniqueId,f,R]),l.useEffect(()=>{var i,r,a,t;const e=c.current;if(e){if(f){(i=e.setHoverActive)==null||i.call(e,!1),(r=e.clearPointer)==null||r.call(e),(a=e.stop)==null||a.call(e);return}M.current&&((t=e.start)==null||t.call(e))}},[f]);const s=e=>{const i=m.current;if(!i)return{x:.5,y:.5};const r=i.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(e.clientY-r.top)/Math.max(1,r.height)))}};return h.jsxs("button",{type:"button",ref:m,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${x+1}`,disabled:f,onPointerEnter:f?void 0:(()=>{var e,i,r,a;(i=(e=c.current)==null?void 0:e.setHoverActive)==null||i.call(e,!0),(a=(r=c.current)==null?void 0:r.start)==null||a.call(r)}),onPointerMove:f?void 0:(e=>{var r,a,t,u;const i=s(e);(a=(r=c.current)==null?void 0:r.setHoverActive)==null||a.call(r,!0),(u=(t=c.current)==null?void 0:t.setPointer)==null||u.call(t,i.x,i.y)}),onPointerLeave:f?void 0:(()=>{var e,i,r,a;I.current=null,(i=(e=c.current)==null?void 0:e.setHoverActive)==null||i.call(e,!1),(a=(r=c.current)==null?void 0:r.clearPointer)==null||a.call(r)}),onPointerDown:f?void 0:(e=>{var r,a,t,u,w,o;if(e.button!=null&&e.button!==0)return;I.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const i=s(e);(a=(r=c.current)==null?void 0:r.setHoverActive)==null||a.call(r,!0),(u=(t=c.current)==null?void 0:t.setPointer)==null||u.call(t,i.x,i.y),(o=(w=c.current)==null?void 0:w.boostPopulation)==null||o.call(w)}),onPointerUp:f?void 0:(e=>{I.current!=null&&e.pointerId!==I.current||(I.current=null)}),onPointerCancel:f?void 0:(()=>{var e,i,r,a;I.current=null,(i=(e=c.current)==null?void 0:e.setHoverActive)==null||i.call(e,!1),(a=(r=c.current)==null?void 0:r.clearPointer)==null||a.call(r)}),onFocus:f?void 0:(()=>{var e,i,r,a;(i=(e=c.current)==null?void 0:e.setHoverActive)==null||i.call(e,!0),(a=(r=c.current)==null?void 0:r.start)==null||a.call(r)}),onBlur:f?void 0:(()=>{var e,i,r,a;I.current=null,(i=(e=c.current)==null?void 0:e.setHoverActive)==null||i.call(e,!1),(a=(r=c.current)==null?void 0:r.clearPointer)==null||a.call(r)}),onKeyDown:f?void 0:(e=>{var i,r;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(r=(i=c.current)==null?void 0:i.boostPopulation)==null||r.call(i))}),children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function Ae({itemWrapper:y,locked:x,onReady:C}){const f=l.useRef(!1);l.useEffect(()=>{f.current||(f.current=!0,C==null||C(y.uniqueId))},[y.uniqueId,C]);const R=l.useMemo(()=>[-4,-2,.5,4].map(m=>{const P=m-1,c=Math.abs(5/P),k=P>=0?"1turn":"-1turn";return{speed:m,controlDuration:`${c}s`,controlTurn:k}}),[]);return h.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${x?"article-web-art-spin-boxes-locked":""}`,children:h.jsx("div",{className:"article-web-art-spin-boxes-grid",children:R.map(({speed:m,controlDuration:P,controlTurn:c})=>h.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--control-duration":P,"--control-turn":c},children:h.jsx("div",{className:"article-web-art-spin-box-core","data-speed":m})},String(m)))})})}function Oe({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){const m=l.useRef(null),P=l.useRef(null),c=l.useRef(null),k=l.useRef(!1),M=l.useRef(!0),I=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),d=l.useMemo(()=>({seed:1729+(Number(y.id)||8)*4242,reduceMotion:I}),[y.id,I]);l.useEffect(()=>{if(!C)return;const r=m.current,a=P.current;if(!r||!a)return;let t=!1,u=null,w=null,o=null;const b=()=>{k.current||(k.current=!0,R==null||R(y.uniqueId))},p=z(async()=>{var v,g,S;try{const N=await B(()=>import("./shapeFieldEngine-B7md70TY.js"),[]);if(t)return;u=N.createShapeFieldEngine(a,d),c.current=u;const _=()=>F(r,u,window.devicePixelRatio||1);_(),(v=u.renderStatic)==null||v.call(u),(g=u.triggerWave)==null||g.call(u),f||(S=u.start)==null||S.call(u),b(),w=new ResizeObserver(()=>{var j;_(),(j=u.renderStatic)==null||j.call(u)}),w.observe(r),"IntersectionObserver"in window&&(o=new IntersectionObserver(j=>{var L,A,H;for(const X of j){if(M.current=!!X.isIntersecting,f){(L=u.stop)==null||L.call(u);continue}M.current?(A=u.start)==null||A.call(u):(H=u.stop)==null||H.call(u)}},{threshold:.2}),o.observe(r))}catch{b()}});return()=>{var v;t=!0,p==null||p(),o==null||o.disconnect(),w==null||w.disconnect(),(v=u==null?void 0:u.destroy)==null||v.call(u),c.current=null}},[C,d,y.uniqueId,f,R]),l.useEffect(()=>{var a,t,u;const r=c.current;if(r){if(f){(a=r.clearPointer)==null||a.call(r),(t=r.stop)==null||t.call(r);return}M.current&&((u=r.start)==null||u.call(r))}},[f]);const n=r=>{const a=P.current||m.current;if(!a)return{x:0,y:0};const t=a.getBoundingClientRect();return{x:r.clientX-t.left,y:r.clientY-t.top}},s=r=>{var t,u;const a=n(r);(u=(t=c.current)==null?void 0:t.setPointer)==null||u.call(t,a.x,a.y)},e=r=>{var t,u,w,o;const a=n(r);(u=(t=c.current)==null?void 0:t.setPointer)==null||u.call(t,a.x,a.y),(o=(w=c.current)==null?void 0:w.triggerWave)==null||o.call(w,a.x,a.y)},i=r=>{var a,t;r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),(t=(a=c.current)==null?void 0:a.triggerWave)==null||t.call(a))};return h.jsxs("button",{type:"button",ref:m,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${x+1}`,disabled:f,onPointerMove:f?void 0:s,onPointerDown:f?void 0:e,onPointerLeave:f?void 0:(()=>{var r,a;return(a=(r=c.current)==null?void 0:r.clearPointer)==null?void 0:a.call(r)}),onBlur:f?void 0:(()=>{var r,a;return(a=(r=c.current)==null?void 0:r.clearPointer)==null?void 0:a.call(r)}),onKeyDown:f?void 0:i,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function He({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){const m=l.useRef(null),P=l.useRef(null),c=l.useRef(null),k=l.useRef(!1),M=l.useRef(!0);l.useEffect(()=>{if(!C)return;const d=m.current,n=P.current;if(!d||!n)return;let s=!1,e=null,i=null,r=null;const a=()=>{k.current||(k.current=!0,R==null||R(y.uniqueId))},t=z(async()=>{var u,w;try{const o=await B(()=>import("./hourglassEngine-B2tBAn_O.js"),__vite__mapDeps([0,1,2]));if(s)return;e=o.createHourglassEngine(n),c.current=e;const b=()=>F(d,e,window.devicePixelRatio||1);b(),(u=e.renderStatic)==null||u.call(e),f||(w=e.start)==null||w.call(e),a(),i=new ResizeObserver(()=>{var p;b(),(p=e.renderStatic)==null||p.call(e)}),i.observe(d),"IntersectionObserver"in window&&(r=new IntersectionObserver(p=>{var v,g,S;for(const N of p){if(M.current=!!N.isIntersecting,f){(v=e.stop)==null||v.call(e);continue}M.current?(g=e.start)==null||g.call(e):(S=e.stop)==null||S.call(e)}},{threshold:.2}),r.observe(d))}catch{a()}});return()=>{var u;s=!0,t==null||t(),r==null||r.disconnect(),i==null||i.disconnect(),(u=e==null?void 0:e.destroy)==null||u.call(e),c.current=null}},[C,y.uniqueId,f,R]),l.useEffect(()=>{var n,s;const d=c.current;if(d){if(f){(n=d.stop)==null||n.call(d);return}M.current&&((s=d.start)==null||s.call(d))}},[f]);const I=d=>{var n,s;d.key!=="Enter"&&d.key!==" "||(d.preventDefault(),(s=(n=c.current)==null?void 0:n.flip)==null||s.call(n))};return h.jsxs("button",{type:"button",ref:m,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass","aria-label":`Hourglass web art tile ${x+1}`,disabled:f,onClick:f?void 0:(()=>{var d,n;return(n=(d=c.current)==null?void 0:d.flip)==null?void 0:n.call(d)}),onKeyDown:f?void 0:I,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function Be({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){const m=l.useRef(null),P=l.useRef(null),c=l.useRef(null),k=l.useRef(!1),M=l.useRef(!0),I=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);l.useEffect(()=>{if(!C)return;const s=m.current,e=P.current;if(!s||!e)return;let i=!1,r=null,a=null,t=null;const u=()=>{k.current||(k.current=!0,R==null||R(y.uniqueId))},w=z(async()=>{var o,b;try{const p=await B(()=>import("./noiceShaderEngine-6wwfZdln.js"),[]);if(i)return;r=p.createNoiceShaderEngine(e,{reduceMotion:I}),c.current=r;const v=()=>F(s,r,Math.min(1.5,window.devicePixelRatio||1));v(),(o=r.renderStatic)==null||o.call(r),f||(b=r.start)==null||b.call(r),u(),a=new ResizeObserver(()=>{var g;v(),(g=r.renderStatic)==null||g.call(r)}),a.observe(s),"IntersectionObserver"in window&&(t=new IntersectionObserver(g=>{var S,N,_;for(const j of g){if(M.current=!!j.isIntersecting,f){(S=r.stop)==null||S.call(r);continue}M.current?(N=r.start)==null||N.call(r):(_=r.stop)==null||_.call(r)}},{threshold:.25}),t.observe(s))}catch{u()}},{timeoutMs:220});return()=>{var o;i=!0,w==null||w(),t==null||t.disconnect(),a==null||a.disconnect(),(o=r==null?void 0:r.destroy)==null||o.call(r),c.current=null}},[C,y.uniqueId,f,R,I]),l.useEffect(()=>{var e,i,r;const s=c.current;if(s){if(f){(e=s.clearPointer)==null||e.call(s),(i=s.stop)==null||i.call(s);return}M.current&&((r=s.start)==null||r.call(s))}},[f]);const d=s=>{const e=P.current||m.current;if(!e)return{x:.5,y:.5};const i=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(s.clientX-i.left)/Math.max(1,i.width))),y:Math.max(0,Math.min(1,(s.clientY-i.top)/Math.max(1,i.height)))}},n=s=>{var i,r,a,t,u,w;const e=d(s);(r=(i=c.current)==null?void 0:i.setPointer)==null||r.call(i,e.x,e.y),(t=(a=c.current)==null?void 0:a.pulsePattern)==null||t.call(a),(w=(u=c.current)==null?void 0:u.start)==null||w.call(u)};return h.jsxs("button",{type:"button",ref:m,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice","aria-label":`Noice web art tile ${x+1}`,disabled:f,onPointerMove:f?void 0:(s=>{var i,r;const e=d(s);(r=(i=c.current)==null?void 0:i.setPointer)==null||r.call(i,e.x,e.y)}),onPointerDown:f?void 0:(s=>{s.button!=null&&s.button!==0||n(s)}),onMouseLeave:f?void 0:(()=>{var s,e;(e=(s=c.current)==null?void 0:s.clearPointer)==null||e.call(s)}),onBlur:f?void 0:(()=>{var s,e;(e=(s=c.current)==null?void 0:s.clearPointer)==null||e.call(s)}),onKeyDown:f?void 0:(s=>{var e,i,r,a;(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),(i=(e=c.current)==null?void 0:e.pulsePattern)==null||i.call(e),(a=(r=c.current)==null?void 0:r.start)==null||a.call(r))}),children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function ze({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){const m=l.useRef(null),P=l.useRef(null),c=l.useRef(null),k=l.useRef(!0),M=l.useRef(!0),I=l.useRef(!1),d=Number(y==null?void 0:y.id)===5,n=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=l.useMemo(()=>{const t=Number(y.id)||x+1,u=.0026+t*8e-5,w=.0054+t*14e-5,o=t%2?1:2,b={kx:11+t*2,ky:t%2};return{refreshDelay:d?0:8e3,radiusMini:u,radiusMaxi:w,dHueStep:o,startGroup:b,seed:1337+t*1009,reduceMotion:n}},[d,y.id,x,n]);l.useEffect(()=>{if(!C)return;const t=m.current,u=P.current;if(!t||!u)return;let w=!1,o=null,b=null,p=null;const v=()=>{I.current||(I.current=!0,R==null||R(y.uniqueId))},g=z(async()=>{var S,N;try{const _=await B(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(w)return;o=_.createEmbroideryEngine(u,s),c.current=o;const j=()=>F(t,o,window.devicePixelRatio||1);j(),(S=o.renderStatic)==null||S.call(o),M.current&&((N=o.start)==null||N.call(o)),v(),b=new ResizeObserver(()=>{var L;j(),(L=o.renderStatic)==null||L.call(o)}),b.observe(t),"IntersectionObserver"in window&&(p=new IntersectionObserver(L=>{for(const A of L){if(M.current=!!A.isIntersecting,d){M.current||o.stop();continue}M.current&&k.current?o.start():o.stop()}},{threshold:.25}),p.observe(t))}catch{v()}});return()=>{w=!0,g==null||g(),p==null||p.disconnect(),b==null||b.disconnect(),o==null||o.destroy(),c.current=null}},[C,s,y.uniqueId,R]),l.useEffect(()=>{var u,w;const t=c.current;if(t){if(f){(u=t.stop)==null||u.call(t);return}M.current&&((w=t.start)==null||w.call(t))}},[f]),l.useEffect(()=>{var u,w;const t=c.current;if(t){if(f){(u=t.stop)==null||u.call(t);return}M.current&&((w=t.start)==null||w.call(t))}},[f]);const e=()=>{var t;k.current=!0,M.current&&((t=c.current)==null||t.start())},i=()=>{var t,u,w,o;k.current=!0,M.current?(u=(t=c.current)==null?void 0:t.start)==null||u.call(t):(o=(w=c.current)==null?void 0:w.stop)==null||o.call(w)},r=()=>{var t,u,w,o,b,p,v,g,S,N;if(d){(u=(t=c.current)==null?void 0:t.stop)==null||u.call(t),(o=(w=c.current)==null?void 0:w.reset)==null||o.call(w),(p=(b=c.current)==null?void 0:b.start)==null||p.call(b);return}(v=c.current)==null||v.reset(),(S=(g=c.current)==null?void 0:g.renderStatic)==null||S.call(g),M.current&&((N=c.current)==null||N.start())},a=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),r())};return h.jsxs("button",{type:"button",ref:m,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${x+1}`,disabled:f,onClick:f?void 0:r,onMouseEnter:f||d?void 0:e,onMouseLeave:f||d?void 0:i,onFocus:f||d?void 0:e,onBlur:f||d?void 0:i,onKeyDown:f?void 0:a,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:d?"Click":Number.isFinite(Number(y==null?void 0:y.id))?Number(y.id):x+1})]})}function Fe({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){const m=l.useRef(null),P=l.useRef(null),c=l.useRef(null),k=l.useRef(!1),M=l.useRef(null),I=l.useRef(!1),d=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=l.useMemo(()=>({seed:9001+(Number(y.id)||1)*1337,reduceMotion:d,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:120,introDurationMs:950}),[y.id,d]);l.useEffect(()=>{if(!C)return;const o=m.current,b=P.current;if(!o||!b)return;let p=!1,v=null,g=null;const S=()=>{k.current||(k.current=!0,R==null||R(y.uniqueId))},N=z(async()=>{var _,j;try{const L=await B(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(p)return;v=L.createSpiralDotsEngine(b,n),c.current=v;const A=()=>F(o,v,window.devicePixelRatio||1);A(),(_=v.renderStatic)==null||_.call(v),(j=v.start)==null||j.call(v),S(),g=new ResizeObserver(()=>{var H;A(),v.rebuildDots(),(H=v.renderStatic)==null||H.call(v)}),g.observe(o)}catch{S()}});return()=>{p=!0,N==null||N(),g==null||g.disconnect(),v==null||v.destroy(),c.current=null}},[C,n,y.uniqueId,R]),l.useEffect(()=>{var b,p,v;const o=c.current;if(o){if(f){(b=o.clearMouse)==null||b.call(o),(p=o.stop)==null||p.call(o);return}(v=o.start)==null||v.call(o)}},[f]);const s=o=>{const b=P.current||m.current;if(!b)return{x:-1e4,y:-1e4};const p=b.getBoundingClientRect();return{x:o.clientX-p.left,y:o.clientY-p.top}},e=()=>{var o;(o=c.current)==null||o.start()},i=()=>{var o,b;(o=c.current)==null||o.clearMouse(),(b=c.current)==null||b.start()},r=()=>{e()},a=()=>{i()},t=o=>{var p;const b=s(o);(p=c.current)==null||p.setMouse(b.x,b.y)},u=()=>{e()},w=()=>{i()};return h.jsxs("div",{ref:m,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:f?-1:0,"aria-label":`Spiral dots web art tile ${x+1}`,onPointerDown:f?void 0:o=>{var v;if(o.pointerType==="mouse")return;const b=m.current;if(!b)return;I.current=!0,M.current=o.pointerId;try{b.setPointerCapture(o.pointerId)}catch{}e();const p=s(o);(v=c.current)==null||v.setMouse(p.x,p.y)},onPointerMove:f?void 0:o=>{var p;if(!I.current||M.current!=null&&o.pointerId!==M.current)return;const b=s(o);(p=c.current)==null||p.setMouse(b.x,b.y)},onPointerUp:f?void 0:o=>{M.current!=null&&o.pointerId!==M.current||(I.current=!1,M.current=null,i())},onPointerCancel:f?void 0:()=>{I.current=!1,M.current=null,i()},onMouseEnter:f?void 0:r,onMouseLeave:f?void 0:a,onMouseMove:f?void 0:t,onFocus:f?void 0:u,onBlur:f?void 0:w,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function $e({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){const m=l.useRef(null),P=l.useRef(null),c=l.useRef(null),k=l.useRef(!0),M=l.useRef(!0),I=l.useRef(!1),d=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=l.useMemo(()=>({seed:424242+(Number(y.id)||2)*2027,reduceMotion:d,targetCellSize:14,gapPx:1.4}),[y.id,d]);l.useEffect(()=>{if(!C)return;const t=m.current,u=P.current;if(!t||!u)return;let w=!1,o=null,b=null,p=null;const v=()=>{I.current||(I.current=!0,R==null||R(y.uniqueId))},g=z(async()=>{var S,N;try{const _=await B(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(w)return;o=_.createGridWaveEngine(u,n),c.current=o;const j=()=>F(t,o,window.devicePixelRatio||1);j(),(S=o.renderStatic)==null||S.call(o),M.current&&((N=o.start)==null||N.call(o)),v(),b=new ResizeObserver(()=>{var L;j(),(L=o.renderStatic)==null||L.call(o)}),b.observe(t),"IntersectionObserver"in window&&(p=new IntersectionObserver(L=>{for(const A of L)M.current=!!A.isIntersecting,M.current&&k.current?o.start():o.stop()},{threshold:.25}),p.observe(t))}catch{v()}});return()=>{w=!0,g==null||g(),p==null||p.disconnect(),b==null||b.disconnect(),o==null||o.destroy(),c.current=null}},[C,n,y.uniqueId,R]);const s=()=>{var t;k.current=!0,M.current&&((t=c.current)==null||t.start())},e=()=>{var t,u,w,o;k.current=!0,M.current?(u=(t=c.current)==null?void 0:t.start)==null||u.call(t):(o=(w=c.current)==null?void 0:w.stop)==null||o.call(w)},i=t=>{const u=P.current||m.current;if(!u)return{x:0,y:0};const w=u.getBoundingClientRect();return typeof(t==null?void 0:t.clientX)!="number"||typeof(t==null?void 0:t.clientY)!="number"?{x:w.width/2,y:w.height/2}:{x:t.clientX-w.left,y:t.clientY-w.top}},r=t=>{var w,o,b,p;const u=i(t);(w=c.current)==null||w.rippleAt(u.x,u.y),(b=(o=c.current)==null?void 0:o.renderStatic)==null||b.call(o),k.current&&M.current&&((p=c.current)==null||p.start())},a=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),r(null))};return h.jsxs("button",{type:"button",ref:m,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${x+1}`,disabled:f,onClick:f?void 0:r,onMouseEnter:f?void 0:s,onMouseLeave:f?void 0:e,onFocus:f?void 0:s,onBlur:f?void 0:e,onKeyDown:f?void 0:a,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function qe({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){const m=l.useRef(null),P=l.useRef(null),c=l.useRef(null),k=l.useRef(!0),M=l.useRef(!0),I=l.useRef(!1),d=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=l.useMemo(()=>({reduceMotion:d,ringCount:9,cubesPerRing:10,ringSpacing:82,tunnelRadius:58,speed:4.6,exposure:1.45}),[d]);l.useEffect(()=>{if(!C)return;const a=m.current,t=P.current;if(!a||!t)return;let u=!1,w=null,o=null,b=null,p=null;const v=()=>{I.current||(I.current=!0,R==null||R(y.uniqueId))},g=async()=>{var L;const N=await B(()=>import("./threeTunnelEngine-YAbz1VnK.js"),__vite__mapDeps([3,4]));if(u)return;w=N.createThreeTunnelEngine(t,n),c.current=w;const _=()=>F(a,w,Math.min(1.5,window.devicePixelRatio||1));return _(),w.reset(),M.current&&((L=w.start)==null||L.call(w)),v(),o=new ResizeObserver(()=>{_(),w.reset()}),o.observe(a),"IntersectionObserver"in window&&(b=new IntersectionObserver(A=>{for(const H of A)M.current=!!H.isIntersecting,M.current&&k.current?w.start():w.stop()},{threshold:.25}),b.observe(a)),()=>{b==null||b.disconnect(),o==null||o.disconnect(),w.destroy(),c.current=null}};let S=null;return p=z(()=>{g().then(N=>{S=N||null}).catch(()=>{v()})},{timeoutMs:300}),()=>{u=!0,p==null||p(),S==null||S()}},[C,n,y.uniqueId,R]),l.useEffect(()=>{var t,u,w;const a=c.current;if(a){if(f){(t=a.setHeld)==null||t.call(a,!1),(u=a.stop)==null||u.call(a);return}M.current&&((w=a.start)==null||w.call(a))}},[f]);const s=()=>{var a;k.current=!0,M.current&&((a=c.current)==null||a.start())},e=()=>{var a,t,u,w;k.current=!0,M.current?(t=(a=c.current)==null?void 0:a.start)==null||t.call(a):(w=(u=c.current)==null?void 0:u.stop)==null||w.call(u)},i=()=>{var a,t,u,w;(t=(a=c.current)==null?void 0:a.nextPalette)==null||t.call(a),(u=c.current)==null||u.reset(),M.current&&((w=c.current)==null||w.start())},r=a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),i())};return h.jsxs("button",{type:"button",ref:m,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${x+1}`,disabled:f,onClick:f?void 0:i,onMouseEnter:f?void 0:s,onMouseLeave:f?void 0:e,onFocus:f?void 0:s,onBlur:f?void 0:e,onKeyDown:f?void 0:r,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),h.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Ke({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){const m=l.useRef(null),P=l.useRef(null),c=l.useRef(null),k=l.useRef(!0),M=l.useRef(!0),I=l.useRef(!1),d=l.useRef(null),n=l.useRef(null),s=l.useRef(!1),e=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),i=l.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,f]);l.useEffect(()=>{if(!C)return;const t=m.current,u=P.current;if(!t||!u)return;let w=!1,o=null,b=null;const p=()=>{I.current||(I.current=!0,R==null||R(y.uniqueId))},v=async()=>{var L;const g=await B(()=>import("./threePolygonDemo5Engine-BcBzJu0K.js"),__vite__mapDeps([5,4]));if(w)return;const S=g.createThreePolygonDemo5Engine(u,i);c.current=S;const N=()=>F(t,S,Math.min(1.2,window.devicePixelRatio||1));N(),S.reset(),M.current&&((L=S.start)==null||L.call(S)),p();const _=new ResizeObserver(()=>{N()});_.observe(t);let j=null;"IntersectionObserver"in window&&(j=new IntersectionObserver(A=>{for(const H of A)M.current=!!H.isIntersecting,M.current&&k.current?S.start():S.stop()},{threshold:.25}),j.observe(t)),o=()=>{j==null||j.disconnect(),_.disconnect(),S.destroy(),c.current=null}};return b=z(()=>{v().catch(()=>{p()})},{timeoutMs:300}),()=>{w=!0,b==null||b(),n.current!=null&&window.clearTimeout(n.current),o==null||o()}},[C,i,y.uniqueId,R]);const r=()=>{var t,u,w;(u=(t=c.current)==null?void 0:t.boost)==null||u.call(t),M.current&&((w=c.current)==null||w.start())},a=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),r())};return h.jsxs("button",{type:"button",ref:m,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${x+1}`,disabled:f,onKeyDown:f?void 0:a,onPointerDown:f?void 0:t=>{var u;if(!(t.button!=null&&t.button!==0)){d.current=t.pointerId,s.current=!1;try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}M.current&&((u=c.current)==null||u.start()),n.current!=null&&window.clearTimeout(n.current),n.current=window.setTimeout(()=>{var w,o;d.current!=null&&(s.current=!0,(o=(w=c.current)==null?void 0:w.setHeld)==null||o.call(w,!0))},140)}},onPointerUp:f?void 0:t=>{var u,w;d.current!=null&&t.pointerId!==d.current||(n.current!=null&&(window.clearTimeout(n.current),n.current=null),d.current=null,s.current?(s.current=!1,(w=(u=c.current)==null?void 0:u.setHeld)==null||w.call(u,!1)):r())},onPointerCancel:f?void 0:(()=>{var t,u;n.current!=null&&(window.clearTimeout(n.current),n.current=null),d.current=null,s.current=!1,(u=(t=c.current)==null?void 0:t.setHeld)==null||u.call(t,!1)}),onLostPointerCapture:f?void 0:(()=>{var t,u;n.current!=null&&(window.clearTimeout(n.current),n.current=null),d.current=null,s.current=!1,(u=(t=c.current)==null?void 0:t.setHeld)==null||u.call(t,!1)}),onMouseEnter:f?void 0:(()=>{var t;k.current=!0,M.current&&((t=c.current)==null||t.start())}),onMouseLeave:f?void 0:(()=>{var t,u,w,o;n.current!=null&&(window.clearTimeout(n.current),n.current=null),d.current=null,s.current=!1,(u=(t=c.current)==null?void 0:t.setHeld)==null||u.call(t,!1),k.current=!0,M.current?(w=c.current)==null||w.start():(o=c.current)==null||o.stop()}),onFocus:f?void 0:(()=>{var t;k.current=!0,M.current&&((t=c.current)==null||t.start())}),onBlur:f?void 0:(()=>{var t,u,w,o;n.current!=null&&(window.clearTimeout(n.current),n.current=null),d.current=null,s.current=!1,(u=(t=c.current)==null?void 0:t.setHeld)==null||u.call(t,!1),k.current=!0,M.current?(w=c.current)==null||w.start():(o=c.current)==null||o.stop()}),children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function Ve({itemWrapper:y,index:x,activate:C,locked:f,onReady:R}){const m=l.useRef(null),P=l.useRef(null),c=l.useRef(null),k=l.useRef(!0),M=l.useRef(!0),I=l.useRef(!1),d=l.useRef(0),n=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=l.useMemo(()=>({reduceMotion:n,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[n]);l.useEffect(()=>{if(!C)return;const t=m.current,u=P.current;if(!t||!u)return;let w=!1,o=null,b=null,p=null;const v=()=>{I.current||(I.current=!0,R==null||R(y.uniqueId))},g=z(async()=>{var S,N;try{const _=await B(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(w)return;o=_.createOrbitCirclesEngine(u,s),c.current=o;const j=()=>F(t,o,window.devicePixelRatio||1);j(),o.reset(),(S=o.renderStatic)==null||S.call(o),M.current&&((N=o.start)==null||N.call(o)),v(),b=new ResizeObserver(()=>{var L;j(),(L=o.renderStatic)==null||L.call(o)}),b.observe(t),"IntersectionObserver"in window&&(p=new IntersectionObserver(L=>{for(const A of L)M.current=!!A.isIntersecting,M.current&&k.current?o.start():o.stop()},{threshold:.25}),p.observe(t))}catch{v()}});return()=>{w=!0,g==null||g(),p==null||p.disconnect(),b==null||b.disconnect(),o==null||o.destroy(),c.current=null}},[C,s,y.uniqueId,R]),l.useEffect(()=>{var u,w;const t=c.current;if(t){if(f){(u=t.stop)==null||u.call(t);return}M.current&&((w=t.start)==null||w.call(t))}},[f]);const e=()=>{var t;k.current=!0,M.current&&((t=c.current)==null||t.start())},i=()=>{var t,u,w,o;k.current=!0,M.current?(u=(t=c.current)==null?void 0:t.start)==null||u.call(t):(o=(w=c.current)==null?void 0:w.stop)==null||o.call(w)},r=()=>{var o,b;const t=c.current;if(!t)return;const u=[{palette:["#A8DA00","#76C700","#D9FF6A"],bgColor:"#06130a"},{palette:["#DD0F7E","#FF4FAE","#7B2CFF"],bgColor:"#200018"},{palette:["#009BBE","#00D5FF","#2B7BFF"],bgColor:"#001018"},{palette:["#F2E205","#FFB703","#EE5A02"],bgColor:"#1a0f00"},{palette:["#8A2BFF","#C300FF","#FF00C8"],bgColor:"#07000f"}],w=u[d.current%u.length];d.current=(d.current+1)%u.length,(o=t.setPalette)==null||o.call(t,w.palette,w.bgColor),M.current&&((b=t.start)==null||b.call(t))},a=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),r())};return h.jsxs("button",{type:"button",ref:m,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${x+1}`,disabled:f,onClick:f?void 0:r,onMouseEnter:f?void 0:e,onMouseLeave:f?void 0:i,onFocus:f?void 0:e,onBlur:f?void 0:i,onKeyDown:f?void 0:a,children:[h.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function Ge({readyId:y,locked:x,onReady:C}){const f=l.useRef(null),R=l.useRef(null),m=l.useRef(null),P=l.useRef(!1),c=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=l.useMemo(()=>({seed:20250414,reduceMotion:c,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[c]);l.useEffect(()=>{const d=f.current,n=R.current;if(!d||!n)return;let s=!1,e=null,i=null,r=null;const a=()=>{P.current||(P.current=!0,C==null||C(y))},t=z(async()=>{var u,w;try{const o=await B(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(s)return;e=o.createTortuosityTraceEngine(n,k),m.current=e;const b=()=>F(d,e,Math.min(1.5,window.devicePixelRatio||1));b(),(u=e.renderStatic)==null||u.call(e),(w=e.start)==null||w.call(e),a(),i=new ResizeObserver(()=>{var p;b(),(p=e.reset)==null||p.call(e)}),i.observe(d),"IntersectionObserver"in window&&(r=new IntersectionObserver(p=>{var v,g;for(const S of p)S.isIntersecting?(v=e.start)==null||v.call(e):(g=e.stop)==null||g.call(e)},{threshold:.25}),r.observe(d))}catch{a()}},{timeoutMs:200});return()=>{var u;s=!0,t==null||t(),r==null||r.disconnect(),i==null||i.disconnect(),(u=e==null?void 0:e.destroy)==null||u.call(e),m.current=null}},[k,C,y]),l.useEffect(()=>{var n,s,e;const d=m.current;if(d){if(x){(n=d.setHeld)==null||n.call(d,!1),(s=d.stop)==null||s.call(d);return}(e=d.start)==null||e.call(d)}},[x]),l.useEffect(()=>{var n,s;const d=m.current;if(d){if(x){(n=d.stop)==null||n.call(d);return}(s=d.start)==null||s.call(d)}},[x]);const M=()=>{var d,n,s,e;(n=(d=m.current)==null?void 0:d.reset)==null||n.call(d),(e=(s=m.current)==null?void 0:s.start)==null||e.call(s)},I=d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),M())};return h.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:x,onClick:x?void 0:M,onKeyDown:x?void 0:I,children:[h.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function Ye({readyId:y,locked:x,onReady:C}){const f=l.useRef(null),R=l.useRef(null),m=l.useRef(null),P=l.useRef(!1),c=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=l.useMemo(()=>({seed:20250415,reduceMotion:c,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[c]);l.useEffect(()=>{const d=f.current,n=R.current;if(!d||!n)return;let s=!1,e=null,i=null,r=null;const a=()=>{P.current||(P.current=!0,C==null||C(y))},t=z(async()=>{var u,w;try{const o=await B(()=>import("./hexFlowBallsEngine-C4hMgqMS.js"),[]);if(s)return;e=o.createHexFlowBallsEngine(n,k),m.current=e;const b=()=>F(d,e,Math.min(1.5,window.devicePixelRatio||1));b(),(u=e.renderStatic)==null||u.call(e),(w=e.start)==null||w.call(e),a(),i=new ResizeObserver(()=>{var p;b(),(p=e.reset)==null||p.call(e)}),i.observe(d),"IntersectionObserver"in window&&(r=new IntersectionObserver(p=>{var v,g;for(const S of p)S.isIntersecting?(v=e.start)==null||v.call(e):(g=e.stop)==null||g.call(e)},{threshold:.25}),r.observe(d))}catch{a()}},{timeoutMs:220});return()=>{var u;s=!0,t==null||t(),r==null||r.disconnect(),i==null||i.disconnect(),(u=e==null?void 0:e.destroy)==null||u.call(e),m.current=null}},[k,C,y]),l.useEffect(()=>{var n,s,e;const d=m.current;if(d){if(x){(n=d.clearPointer)==null||n.call(d),(s=d.stop)==null||s.call(d);return}(e=d.start)==null||e.call(d)}},[x]),l.useEffect(()=>{var n,s;const d=m.current;if(d){if(x){(n=d.stop)==null||n.call(d);return}(s=d.start)==null||s.call(d)}},[x]);const M=()=>{var d,n,s,e;(n=(d=m.current)==null?void 0:d.toggleGridContrast)==null||n.call(d),(e=(s=m.current)==null?void 0:s.start)==null||e.call(s)},I=d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),M())};return h.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:x,onClick:x?void 0:M,onKeyDown:x?void 0:I,children:[h.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function Ue({readyId:y,locked:x,onReady:C}){const f=l.useRef(null),R=l.useRef(null),m=l.useRef(null),P=l.useRef(!1),c=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=l.useMemo(()=>({seed:20250416,reduceMotion:c,step:6,side:5}),[c]);l.useEffect(()=>{const n=f.current,s=R.current;if(!n||!s)return;let e=!1,i=null,r=null,a=null;const t=()=>{P.current||(P.current=!0,C==null||C(y))},u=z(async()=>{var w,o;try{const b=await B(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;i=b.createPixelPlopEngine(s,k),m.current=i;const p=()=>F(n,i,Math.min(1.5,window.devicePixelRatio||1));p(),(w=i.renderStatic)==null||w.call(i),(o=i.start)==null||o.call(i),t(),r=new ResizeObserver(()=>{var v;p(),(v=i.reset)==null||v.call(i)}),r.observe(n),"IntersectionObserver"in window&&(a=new IntersectionObserver(v=>{var g,S;for(const N of v)N.isIntersecting?(g=i.start)==null||g.call(i):(S=i.stop)==null||S.call(i)},{threshold:.25}),a.observe(n))}catch{t()}},{timeoutMs:220});return()=>{var w;e=!0,u==null||u(),a==null||a.disconnect(),r==null||r.disconnect(),(w=i==null?void 0:i.destroy)==null||w.call(i),m.current=null}},[k,C,y]),l.useEffect(()=>{var s,e,i;const n=m.current;if(n){if(x){(s=n.clearPointer)==null||s.call(n),(e=n.stop)==null||e.call(n);return}(i=n.start)==null||i.call(n)}},[x]),l.useEffect(()=>{var s,e;const n=m.current;if(n){if(x){(s=n.stop)==null||s.call(n);return}(e=n.start)==null||e.call(n)}},[x]);const M=()=>{var n,s,e,i;(s=(n=m.current)==null?void 0:n.seedBurst)==null||s.call(n),(i=(e=m.current)==null?void 0:e.start)==null||i.call(e)},I=n=>{var i,r,a,t;const s=R.current||f.current;if(!s||typeof(n==null?void 0:n.clientX)!="number"||typeof(n==null?void 0:n.clientY)!="number"){M();return}const e=s.getBoundingClientRect();(r=(i=m.current)==null?void 0:i.burstAt)==null||r.call(i,n.clientX-e.left,n.clientY-e.top),(t=(a=m.current)==null?void 0:a.start)==null||t.call(a)},d=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),M())};return h.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:x,onPointerDown:x?void 0:(n=>{n.button!=null&&n.button!==0||I(n)}),onKeyDown:x?void 0:d,children:[h.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function Xe({readyId:y,locked:x,onReady:C}){const f=l.useRef(null),R=l.useRef(null),m=l.useRef(null),P=l.useRef(!1),c=l.useRef(null),k=l.useRef(!1),M=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=l.useMemo(()=>({reduceMotion:M,seed:20250417}),[M]);l.useEffect(()=>{const e=f.current,i=R.current;if(!e||!i)return;let r=!1,a=null,t=null,u=null;const w=()=>{P.current||(P.current=!0,C==null||C(y))},o=z(async()=>{var b,p;try{const v=await B(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(r)return;a=v.createJuliaLinesEngine(i,I),m.current=a;const g=()=>F(e,a,Math.min(1.5,window.devicePixelRatio||1));g(),(b=a.renderStatic)==null||b.call(a),(p=a.start)==null||p.call(a),w(),t=new ResizeObserver(()=>{g()}),t.observe(e),"IntersectionObserver"in window&&(u=new IntersectionObserver(S=>{var N,_;for(const j of S)j.isIntersecting?(N=a.start)==null||N.call(a):(_=a.stop)==null||_.call(a)},{threshold:.25}),u.observe(e))}catch{w()}},{timeoutMs:220});return()=>{var b;r=!0,o==null||o(),u==null||u.disconnect(),t==null||t.disconnect(),(b=a==null?void 0:a.destroy)==null||b.call(a),m.current=null}},[I,C,y]),l.useEffect(()=>{var i,r,a,t;const e=m.current;if(e){if(x){(i=e.setHeld)==null||i.call(e,!1),(r=e.clearPointer)==null||r.call(e),(a=e.stop)==null||a.call(e);return}(t=e.start)==null||t.call(e)}},[x]),l.useEffect(()=>{var i,r,a;const e=m.current;if(e){if(x){(i=e.clearPointer)==null||i.call(e),(r=e.stop)==null||r.call(e);return}(a=e.start)==null||a.call(e)}},[x]);const d=e=>{const i=f.current;if(!i)return{x:.4,y:.5};const r=i.getBoundingClientRect(),a=(e.clientX-r.left)/Math.max(1,r.width),t=(e.clientY-r.top)/Math.max(1,r.height);return{x:Math.max(0,Math.min(1,a)),y:Math.max(0,Math.min(1,t))}},n=()=>{var e,i,r,a;(i=(e=m.current)==null?void 0:e.reset)==null||i.call(e),(a=(r=m.current)==null?void 0:r.start)==null||a.call(r)},s=e=>{var r,a,t,u,w,o,b,p;const i=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(a=(r=m.current)==null?void 0:r.nudge)==null||a.call(r,0,-i)):e.key==="ArrowDown"?(e.preventDefault(),(u=(t=m.current)==null?void 0:t.nudge)==null||u.call(t,0,i)):e.key==="ArrowLeft"?(e.preventDefault(),(o=(w=m.current)==null?void 0:w.nudge)==null||o.call(w,-i,0)):e.key==="ArrowRight"?(e.preventDefault(),(p=(b=m.current)==null?void 0:b.nudge)==null||p.call(b,i,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),n())};return h.jsxs("div",{ref:f,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:x?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:x?void 0:e=>{var a,t;const i=f.current;if(!i)return;k.current=!0,c.current=e.pointerId;try{i.setPointerCapture(e.pointerId)}catch{}const r=d(e);(t=(a=m.current)==null?void 0:a.setPointer)==null||t.call(a,r.x,r.y)},onPointerMove:x?void 0:e=>{var r,a;if(k.current&&c.current!=null&&e.pointerId!==c.current)return;const i=d(e);(a=(r=m.current)==null?void 0:r.setPointer)==null||a.call(r,i.x,i.y)},onPointerUp:x?void 0:e=>{var i,r;c.current!=null&&e.pointerId!==c.current||(k.current=!1,c.current=null,(r=(i=m.current)==null?void 0:i.clearPointer)==null||r.call(i))},onPointerCancel:x?void 0:()=>{var e,i;k.current=!1,c.current=null,(i=(e=m.current)==null?void 0:e.clearPointer)==null||i.call(e)},onMouseMove:x?void 0:e=>{var r,a;const i=d(e);(a=(r=m.current)==null?void 0:r.setPointer)==null||a.call(r,i.x,i.y)},onMouseLeave:x?void 0:(()=>{var e,i;(i=(e=m.current)==null?void 0:e.clearPointer)==null||i.call(e)}),onBlur:x?void 0:(()=>{var e,i;(i=(e=m.current)==null?void 0:e.clearPointer)==null||i.call(e)}),onKeyDown:x?void 0:s,onClick:x?void 0:n,children:[h.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function Je({readyId:y,locked:x,onReady:C}){const[f,R]=l.useState(0),[m,P]=l.useState("mine"),[c,k]=l.useState(()=>new Set),[M,I]=l.useState(()=>new Set),[d,n]=l.useState("playing"),[s,e]=l.useState(null),[i,r]=l.useState(0),a=l.useMemo(()=>Ee(),[f]);l.useEffect(()=>{C==null||C(y)},[C,y]),l.useEffect(()=>{P("mine"),k(new Set),I(new Set),n("playing"),e(null),r(0)},[f]),l.useEffect(()=>{if(s==null||d!=="playing")return;const p=()=>{r(Math.min(5999,Math.floor((Date.now()-s)/1e3)))};p();const v=window.setInterval(p,1e3);return()=>{window.clearInterval(v)}},[s,d]);const t=()=>{R(p=>p+1)},u=p=>{if(x||d!=="playing")return;if(s==null&&e(Date.now()),m==="flag"){if(c.has(p))return;const g=new Set(M);g.has(p)?g.delete(p):g.add(p),I(g),le(a,c,g)&&n("won");return}if(M.has(p)||c.has(p))return;if(a.mines.has(p)){const g=new Set(c);for(const S of a.mines)g.add(S);g.add(p),k(g),n("lost");return}const v=Ne(p,a,c,M);k(v),le(a,v,M)&&n("won")},w=a.mineCount-M.size,o=`${String(Math.floor(i/60)).padStart(2,"0")}:${String(i%60).padStart(2,"0")}`;let b="🤔";return d==="lost"?b="😣":d==="won"?b="😎":M.size>=a.mineCount?b="😕":M.size>=a.mineCount-1?b="🤓":M.size>=Math.round(a.mineCount*3/4)?b="😃":M.size>=Math.round(a.mineCount*2/3)?b="😊":M.size>=Math.round(a.mineCount/2)?b="🙂":M.size>=Math.round(a.mineCount/3)?b="😏":M.size>0&&(b="😐"),h.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:h.jsxs("div",{className:"article-web-art-minesweeper",children:[h.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[h.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${m==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("mine"),disabled:x||d!=="playing","aria-pressed":m==="mine",children:"⛏"}),h.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${m==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("flag"),disabled:x||d!=="playing","aria-pressed":m==="flag",children:"🚩"})]}),h.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[a.counts.map((p,v)=>{const g=c.has(v),S=M.has(v),N=a.mines.has(v),_=d==="lost"&&N,j=p>0?Se[p-1]:void 0;return h.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${g?"article-web-art-minesweeper-cell-revealed":""} ${_?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>u(v),disabled:x||d!=="playing","aria-label":`Minesweeper cell ${v+1}`,children:[S&&!g?h.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,_?h.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,g&&!N&&p>0?h.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:j},children:p}):null]},`mine-${f}-${v}`)}),d==="lost"?h.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:t,children:["Ooohhh 🙁",h.jsx("br",{}),"Click to try again"]}):null,d==="won"?h.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:t,children:["👌👀✔💯💯💯",h.jsx("br",{}),"Click to restart"]}):null]}),h.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[h.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[h.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:b}),h.jsx("span",{children:w})]}),h.jsx("div",{className:"article-web-art-minesweeper-timer",children:o})]}),h.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function Ze({readyId:y,locked:x,onReady:C}){const f=l.useRef(null),R=l.useRef(null),m=l.useRef(null),P=l.useRef(!1),c=l.useRef(null),k=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=l.useMemo(()=>({reduceMotion:k}),[k]);l.useEffect(()=>{const s=f.current,e=R.current;if(!s||!e)return;let i=!1,r=null,a=null,t=null;const u=()=>{P.current||(P.current=!0,C==null||C(y))},w=z(async()=>{var o,b;try{const p=await B(()=>import("./fallingRingsEngine-C9a7CL1C.js"),[]);if(i)return;r=p.createFallingRingsEngine(e,M),m.current=r;const v=()=>F(s,r,Math.min(1.5,window.devicePixelRatio||1));v(),(o=r.renderStatic)==null||o.call(r),(b=r.start)==null||b.call(r),u(),a=new ResizeObserver(()=>{v()}),a.observe(s),"IntersectionObserver"in window&&(t=new IntersectionObserver(g=>{var S,N;for(const _ of g)_.isIntersecting?(S=r.start)==null||S.call(r):(N=r.stop)==null||N.call(r)},{threshold:.25}),t.observe(s))}catch{u()}},{timeoutMs:220});return()=>{var o;i=!0,w==null||w(),t==null||t.disconnect(),a==null||a.disconnect(),(o=r==null?void 0:r.destroy)==null||o.call(r),m.current=null}},[M,C,y]);const I=s=>{var e,i,r,a;(i=(e=m.current)==null?void 0:e.setHeld)==null||i.call(e,s),(a=(r=m.current)==null?void 0:r.start)==null||a.call(r)},d=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),I(!0))},n=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),I(!1))};return h.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:x,onPointerDown:x?void 0:s=>{c.current=s.pointerId;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}I(!0)},onPointerUp:x?void 0:s=>{c.current!=null&&s.pointerId!==c.current||(c.current=null,I(!1))},onPointerCancel:x?void 0:()=>{c.current=null,I(!1)},onLostPointerCapture:x?void 0:()=>{c.current=null,I(!1)},onMouseLeave:x?void 0:(()=>{c.current!=null&&I(!1)}),onBlur:x?void 0:(()=>{c.current=null,I(!1)}),onKeyDown:x?void 0:d,onKeyUp:x?void 0:n,children:[h.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function Qe({readyId:y,locked:x,onReady:C}){const f=l.useRef(null),R=l.useRef(null),m=l.useRef(null),P=l.useRef(!1),c=l.useRef(null),k=l.useRef("mouse"),M=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=l.useMemo(()=>({reduceMotion:M,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[M]);l.useEffect(()=>{const n=f.current,s=R.current;if(!n||!s)return;let e=!1,i=null,r=null,a=null;const t=()=>{P.current||(P.current=!0,C==null||C(y))},u=z(async()=>{var w,o;try{const b=await B(()=>import("./prismFieldEngine-Dkw-H_-R.js"),__vite__mapDeps([6,4]));if(e)return;i=b.createPrismFieldEngine(s,I),m.current=i;const p=()=>F(n,i,Math.min(1.5,window.devicePixelRatio||1));p(),(w=i.renderStatic)==null||w.call(i),(o=i.start)==null||o.call(i),t(),r=new ResizeObserver(()=>{p()}),r.observe(n),"IntersectionObserver"in window&&(a=new IntersectionObserver(v=>{var g,S;for(const N of v)N.isIntersecting?(g=i.start)==null||g.call(i):(S=i.stop)==null||S.call(i)},{threshold:.25}),a.observe(n))}catch{t()}},{timeoutMs:220});return()=>{var w;e=!0,u==null||u(),a==null||a.disconnect(),r==null||r.disconnect(),(w=i==null?void 0:i.destroy)==null||w.call(i),m.current=null}},[I,C,y]);const d=n=>{const s=f.current;if(!s)return{x:.5,y:.5};const e=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(n.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(n.clientY-e.top)/Math.max(1,e.height)))}};return h.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:x,onPointerDown:x?void 0:n=>{var e,i;c.current=n.pointerId,k.current=n.pointerType||"mouse";try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}const s=d(n);(i=(e=m.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerMove:x?void 0:n=>{var e,i;if(c.current!=null&&n.pointerId!==c.current)return;const s=d(n);(i=(e=m.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerUp:x?void 0:n=>{var s,e;c.current!=null&&n.pointerId!==c.current||(c.current=null,(n.pointerType||k.current)==="mouse"&&((e=(s=m.current)==null?void 0:s.clearPointer)==null||e.call(s)))},onPointerCancel:x?void 0:(()=>{var n,s;c.current=null,k.current==="mouse"&&((s=(n=m.current)==null?void 0:n.clearPointer)==null||s.call(n))}),onMouseMove:x?void 0:n=>{var e,i;const s=d(n);(i=(e=m.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onMouseLeave:x?void 0:(()=>{var n,s;c.current=null,(s=(n=m.current)==null?void 0:n.clearPointer)==null||s.call(n)}),onBlur:x?void 0:(()=>{var n,s;c.current=null,k.current="mouse",(s=(n=m.current)==null?void 0:n.clearPointer)==null||s.call(n)}),onKeyDown:x?void 0:(n=>{var s,e,i,r;(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),(e=(s=m.current)==null?void 0:s.reset)==null||e.call(s),(r=(i=m.current)==null?void 0:i.start)==null||r.call(i))}),children:[h.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function We({readyId:y,locked:x,onReady:C}){const f=l.useRef(null),R=l.useRef(null),m=l.useRef(null),P=l.useRef(!1),c=l.useRef(null),k=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=l.useMemo(()=>({reduceMotion:k}),[k]);l.useEffect(()=>{const n=f.current,s=R.current;if(!n||!s)return;let e=!1,i=null,r=null,a=null;const t=()=>{P.current||(P.current=!0,C==null||C(y))},u=z(async()=>{var w,o;try{const b=await B(()=>import("./ropeLightEngine-B3dT-ds-.js"),[]);if(e)return;i=b.createRopeLightEngine(s,M),m.current=i;const p=()=>F(n,i,Math.min(1.5,window.devicePixelRatio||1));p(),(w=i.renderStatic)==null||w.call(i),(o=i.start)==null||o.call(i),t(),r=new ResizeObserver(()=>{p()}),r.observe(n),"IntersectionObserver"in window&&(a=new IntersectionObserver(v=>{var g,S;for(const N of v)N.isIntersecting?(g=i.start)==null||g.call(i):(S=i.stop)==null||S.call(i)},{threshold:.25}),a.observe(n))}catch{t()}},{timeoutMs:220});return()=>{var w;e=!0,u==null||u(),a==null||a.disconnect(),r==null||r.disconnect(),(w=i==null?void 0:i.destroy)==null||w.call(i),m.current=null}},[M,C,y]);const I=n=>{const s=f.current;if(!s)return{x:.5,y:.5};const e=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(n.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(n.clientY-e.top)/Math.max(1,e.height)))}},d=()=>{var n,s,e,i;(s=(n=m.current)==null?void 0:n.reset)==null||s.call(n),(i=(e=m.current)==null?void 0:e.start)==null||i.call(e)};return h.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:x,onClick:x?void 0:d,onPointerDown:x?void 0:n=>{var e,i;c.current=n.pointerId;const s=I(n);(i=(e=m.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerMove:x?void 0:n=>{var e,i;if(c.current!=null&&n.pointerId!==c.current)return;const s=I(n);(i=(e=m.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onPointerUp:x?void 0:n=>{var s,e;c.current!=null&&n.pointerId!==c.current||(c.current=null,(e=(s=m.current)==null?void 0:s.clearPointer)==null||e.call(s))},onPointerCancel:x?void 0:(()=>{var n,s;c.current=null,(s=(n=m.current)==null?void 0:n.clearPointer)==null||s.call(n)}),onMouseMove:x?void 0:n=>{var e,i;const s=I(n);(i=(e=m.current)==null?void 0:e.setPointer)==null||i.call(e,s.x,s.y)},onMouseLeave:x?void 0:(()=>{var n,s;c.current=null,(s=(n=m.current)==null?void 0:n.clearPointer)==null||s.call(n)}),onBlur:x?void 0:(()=>{var n,s;c.current=null,(s=(n=m.current)==null?void 0:n.clearPointer)==null||s.call(n)}),onKeyDown:x?void 0:(n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),d())}),children:[h.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}function et({readyId:y,locked:x,onReady:C}){const f=l.useRef(null),R=l.useRef(null),m=l.useRef(null),P=l.useRef(!1),c=l.useRef(null),k=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=l.useMemo(()=>({reduceMotion:k}),[k]);l.useEffect(()=>{const d=f.current,n=R.current;if(!d||!n)return;let s=!1,e=null,i=null,r=null;const a=()=>{P.current||(P.current=!0,C==null||C(y))},t=z(async()=>{var u,w;try{const o=await B(()=>import("./soupShaderEngine-DOT8TiBo.js"),__vite__mapDeps([7,4]));if(s)return;e=o.createSoupShaderEngine(n,M),m.current=e;const b=()=>F(d,e,Math.min(1.5,window.devicePixelRatio||1));b(),(u=e.renderStatic)==null||u.call(e),(w=e.start)==null||w.call(e),a(),i=new ResizeObserver(()=>{b()}),i.observe(d),"IntersectionObserver"in window&&(r=new IntersectionObserver(p=>{var v,g;for(const S of p)S.isIntersecting?(v=e.start)==null||v.call(e):(g=e.stop)==null||g.call(e)},{threshold:.25}),r.observe(d))}catch{a()}},{timeoutMs:220});return()=>{var u;s=!0,t==null||t(),r==null||r.disconnect(),i==null||i.disconnect(),(u=e==null?void 0:e.destroy)==null||u.call(e),m.current=null}},[M,C,y]);const I=d=>{const n=f.current;if(!n)return{x:.5,y:.5};const s=n.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(d.clientX-s.left)/Math.max(1,s.width))),y:Math.max(0,Math.min(1,(d.clientY-s.top)/Math.max(1,s.height)))}};return h.jsxs("button",{type:"button",ref:f,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Soup shader web art tile",disabled:x,onPointerDown:x?void 0:d=>{var s,e,i,r;c.current=d.pointerId;try{d.currentTarget.setPointerCapture(d.pointerId)}catch{}const n=I(d);(e=(s=m.current)==null?void 0:s.setPointer)==null||e.call(s,n.x,n.y),(r=(i=m.current)==null?void 0:i.setHeld)==null||r.call(i,!0)},onPointerMove:x?void 0:d=>{var s,e;if(c.current!=null&&d.pointerId!==c.current)return;const n=I(d);(e=(s=m.current)==null?void 0:s.setPointer)==null||e.call(s,n.x,n.y)},onPointerUp:x?void 0:d=>{var n,s;c.current!=null&&d.pointerId!==c.current||(c.current=null,(s=(n=m.current)==null?void 0:n.setHeld)==null||s.call(n,!1))},onPointerCancel:x?void 0:(()=>{var d,n;c.current=null,(n=(d=m.current)==null?void 0:d.setHeld)==null||n.call(d,!1)}),onMouseMove:x?void 0:d=>{var s,e;const n=I(d);(e=(s=m.current)==null?void 0:s.setPointer)==null||e.call(s,n.x,n.y)},onMouseLeave:x?void 0:(()=>{var d,n,s,e;c.current=null,(n=(d=m.current)==null?void 0:d.setHeld)==null||n.call(d,!1),(e=(s=m.current)==null?void 0:s.clearPointer)==null||e.call(s)}),onBlur:x?void 0:(()=>{var d,n,s,e;c.current=null,(n=(d=m.current)==null?void 0:d.setHeld)==null||n.call(d,!1),(e=(s=m.current)==null?void 0:s.clearPointer)==null||e.call(s)}),children:[h.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),h.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function tt({readyId:y,locked:x,onReady:C}){const f=l.useRef(null),R=l.useRef(null),m=l.useRef(null),P=l.useRef(!1),c=l.useRef(null),k=l.useRef(null),M=l.useRef(0),[I,d]=l.useState(!1),[n,s]=l.useState(!1),[e,i]=l.useState([]),r=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),a=l.useMemo(()=>({reduceMotion:r}),[r]);l.useEffect(()=>{const o=f.current,b=R.current;if(!o||!b)return;let p=!1,v=null,g=null,S=null;const N=()=>{P.current||(P.current=!0,C==null||C(y))},_=z(async()=>{var j,L;try{const A=await B(()=>import("./tardisWormholeEngine-BSErFcgT.js"),__vite__mapDeps([8,4]));if(p)return;v=A.createTardisWormholeEngine(b,a),m.current=v;const H=()=>F(o,v,Math.min(1.5,window.devicePixelRatio||1));H(),(j=v.renderStatic)==null||j.call(v),(L=v.start)==null||L.call(v),N(),g=new ResizeObserver(()=>{H()}),g.observe(o),"IntersectionObserver"in window&&(S=new IntersectionObserver(X=>{var G,V;for(const J of X)J.isIntersecting?(G=v.start)==null||G.call(v):(V=v.stop)==null||V.call(v)},{threshold:.25}),S.observe(o))}catch{N()}},{timeoutMs:220});return()=>{var j;p=!0,_==null||_(),S==null||S.disconnect(),g==null||g.disconnect(),(j=v==null?void 0:v.destroy)==null||j.call(v),m.current=null}},[a,C,y]),l.useEffect(()=>{if(e.length===0)return;const o=window.setTimeout(()=>{i(b=>b.slice(1))},1e3);return()=>{window.clearTimeout(o)}},[e]),l.useEffect(()=>{var b,p,v;const o=m.current;if(o){if(x){s(!1),d(!1),k.current=null,(b=o.clearPointer)==null||b.call(o),(p=o.stop)==null||p.call(o);return}(v=o.start)==null||v.call(o)}},[x]);const t=o=>{const b=f.current,p=R.current||b;if(!b||!p)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const v=p.getBoundingClientRect(),g=b.getBoundingClientRect(),S=Math.max(0,Math.min(g.width,o.clientX-g.left)),N=Math.max(0,Math.min(g.height,o.clientY-g.top)),_=Math.max(0,Math.min(v.width,o.clientX-v.left)),j=Math.max(0,Math.min(v.height,o.clientY-v.top)),L=k.current,A=L?_-L.px:0,H=L?j-L.py:0;return k.current={px:_,py:j},b.style.setProperty("--tardis-cursor-x",`${S}px`),b.style.setProperty("--tardis-cursor-y",`${N}px`),{x:v.width>0?_/v.width:.5,y:v.height>0?j/v.height:.5,px:S,py:N,dx:A,dy:H}},u=(o,b)=>{const p=M.current++;i(v=>[...v,{id:p,x:o,y:b}])},w=o=>{var p,v,g,S;const b=t(o);u(b.px,b.py),(v=(p=m.current)==null?void 0:p.boost)==null||v.call(p),(S=(g=m.current)==null?void 0:g.start)==null||S.call(g),s(!0),window.setTimeout(()=>{s(!1)},650)};return h.jsxs("button",{type:"button",ref:f,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${I?"article-web-art-tile-tardis-active":""} ${n?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:x,onClick:x?void 0:w,onContextMenu:x?void 0:(o=>{var p,v,g,S;o.preventDefault();const b=t(o);u(b.px,b.py),(v=(p=m.current)==null?void 0:p.reverseBurst)==null||v.call(p),(S=(g=m.current)==null?void 0:g.start)==null||S.call(g)}),onWheel:x?void 0:(o=>{var b,p;(p=(b=m.current)==null?void 0:b.addScrollBoost)==null||p.call(b,o.deltaY*.003)}),onPointerDown:x?void 0:o=>{var p,v;c.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const b=t(o);(v=(p=m.current)==null?void 0:p.setPointer)==null||v.call(p,b.x,b.y,b.dx,b.dy)},onPointerMove:x?void 0:o=>{var p,v,g,S;if(c.current!=null&&o.pointerId!==c.current)return;const b=t(o);(v=(p=m.current)==null?void 0:p.setPointer)==null||v.call(p,b.x,b.y,b.dx,b.dy),(o.buttons&1)===1&&((S=(g=m.current)==null?void 0:g.drag)==null||S.call(g,b.dx))},onPointerUp:x?void 0:o=>{c.current!=null&&o.pointerId!==c.current||(c.current=null)},onPointerCancel:x?void 0:(()=>{c.current=null}),onMouseEnter:x?void 0:(()=>{d(!0)}),onMouseMove:x?void 0:o=>{var p,v;const b=t(o);(v=(p=m.current)==null?void 0:p.setPointer)==null||v.call(p,b.x,b.y,b.dx,b.dy)},onMouseLeave:x?void 0:(()=>{var o,b;c.current=null,k.current=null,d(!1),(b=(o=m.current)==null?void 0:o.clearPointer)==null||b.call(o)}),onBlur:x?void 0:(()=>{var o,b;c.current=null,k.current=null,d(!1),(b=(o=m.current)==null?void 0:o.clearPointer)==null||b.call(o)}),onKeyDown:x?void 0:(o=>{var b,p,v,g;(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),(p=(b=m.current)==null?void 0:b.boost)==null||p.call(b),(g=(v=m.current)==null?void 0:v.start)==null||g.call(v))}),children:[h.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),h.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-cursor","aria-hidden":!0}),h.jsx("div",{className:"article-web-art-tardis-cursor-dot","aria-hidden":!0}),h.jsxs("div",{className:"article-web-art-tardis-hud","aria-hidden":!0,children:[h.jsx("div",{className:"article-web-art-tardis-hud-label",children:"Traversing Singularity"}),h.jsx("div",{className:"article-web-art-tardis-hud-bar"})]}),e.map(o=>h.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${o.x}px`,top:`${o.y}px`},"aria-hidden":!0},o.id)),h.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function nt({label:y,clickLabel:x,previewRequested:C=!1}){const f=de(),R=l.useRef(null),[m,P]=l.useState(!1),[c,k]=l.useState(0),M=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=l.useCallback(()=>{k(Date.now()),P(!0)},[]),d=l.useCallback(()=>{f.navigateToSectionWithId("contact")},[f]),n=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),I())},s=l.useMemo(()=>m?_e({seed:`${c||Date.now()}:${y}`,reduceMotion:M}):"",[y,m,c,M]);return l.useEffect(()=>{if(C){k(Date.now()),P(!0);return}P(!1)},[C]),h.jsxs("div",{ref:R,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${m?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":m?"Kontakt preview":y,"aria-pressed":m,onClick:I,onKeyDown:n,children:[h.jsxs("div",{className:`article-web-art-tile-cta-preview ${m?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[m&&h.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:s,sandbox:"allow-scripts"},`${c}-${y}`),h.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!m&&h.jsx("div",{className:`loader ${M?"loader-reduce-motion":""}`,"aria-hidden":!0,children:h.jsxs("div",{className:"loader-inner",children:[h.jsx("div",{className:"loader-line-wrap",children:h.jsx("div",{className:"loader-line"})}),h.jsx("div",{className:"loader-line-wrap",children:h.jsx("div",{className:"loader-line"})}),h.jsx("div",{className:"loader-line-wrap",children:h.jsx("div",{className:"loader-line"})}),h.jsx("div",{className:"loader-line-wrap",children:h.jsx("div",{className:"loader-line"})}),h.jsx("div",{className:"loader-line-wrap",children:h.jsx("div",{className:"loader-line"})})]})}),h.jsxs("div",{className:`article-web-art-tile-cta-content ${m?"article-web-art-tile-cta-content-hidden":""}`,children:[h.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:y}),h.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:x})]}),m&&h.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),d()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),d())},children:"Kontakt"})]})}function rt({locked:y=!1}){const x=l.useRef(null),C=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=l.useRef(!1),R=l.useRef(0),m=l.useRef(null),P=l.useRef(null),c=l.useRef(1),k=l.useRef(null);return l.useEffect(()=>{const M=x.current;if(!M)return;const I=u=>{const w=Math.max(0,Math.min(1,u));return w*w*(3-2*w)},d=()=>{const u=M.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),w=[];for(const o of u){const b=o.getAnimations?o.getAnimations():[];for(const p of b)w.push(p)}return w},n=u=>{const w=Math.max(1,Math.min(5.2,Number(u)||1));c.current=w;const o=d();for(const b of o)b.playbackRate=w},s=()=>{f.current=!1,m.current=null,M.classList.remove("article-web-art-tile-goldfish-held"),P.current!=null&&cancelAnimationFrame(P.current),P.current=null;const u=c.current,w=360,o=performance.now();k.current!=null&&cancelAnimationFrame(k.current);const b=()=>{const p=(performance.now()-o)/w,v=I(p);n(u+(1-u)*v),p<1?k.current=requestAnimationFrame(b):k.current=null};k.current=requestAnimationFrame(b)},e=()=>{if(!f.current)return;const u=performance.now()-R.current,w=1.2+4*I(u/2400);n(w),P.current=requestAnimationFrame(e)},i=u=>{if(!C&&!(u.button!=null&&u.button!==0)){f.current=!0,R.current=performance.now(),m.current=u.pointerId,M.classList.add("article-web-art-tile-goldfish-held");try{M.setPointerCapture(u.pointerId)}catch{}k.current!=null&&(cancelAnimationFrame(k.current),k.current=null),P.current==null&&(P.current=requestAnimationFrame(e))}},r=()=>{s()},a=()=>{s()},t=()=>{s()};return M.addEventListener("pointerdown",i),M.addEventListener("pointerup",r),M.addEventListener("pointercancel",a),M.addEventListener("lostpointercapture",t),()=>{M.removeEventListener("pointerdown",i),M.removeEventListener("pointerup",r),M.removeEventListener("pointercancel",a),M.removeEventListener("lostpointercapture",t),s(),k.current!=null&&cancelAnimationFrame(k.current),k.current=null}},[C]),l.useEffect(()=>{const M=x.current;M&&M.classList.toggle("article-web-art-tile-goldfish-locked",y)},[y]),h.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:x,role:"img","aria-label":"Goldfish animation tile",children:[h.jsx("div",{className:"fish-stage",children:h.jsx("div",{className:"fish-wrapper",children:h.jsx("div",{className:"fish-container",children:h.jsxs("div",{className:"fish-parts",children:[h.jsx("div",{className:"fish-body front"}),h.jsx("div",{className:"fish-body back"}),h.jsx("div",{className:"fish-back-bottom-fin front"}),h.jsx("div",{className:"fish-back-bottom-fin back"}),h.jsx("div",{className:"fish-back-fin"}),h.jsx("div",{className:"fish-front-bottom-fin front"}),h.jsx("div",{className:"fish-front-bottom-fin back"}),h.jsx("div",{className:"fish-top-fin"})]})})})}),h.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function st({locked:y=!1}){const x=l.useRef(null),C=l.useRef([]),f=l.useRef(0),R=l.useRef(0),m=Ie,P=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return l.useEffect(()=>{const c=x.current;if(!c)return;const k=C.current.filter(Boolean);if(!k.length)return;let M=!0,I=!1,d=null,n=null;const s=(p,v)=>{const g=(p-.5)*30;for(let S=0;S<k.length;S++){const N=k[S],_=S*18,j=S*8,L=(p-.5)*_,A=(v-.5)*j;N.style.transform=`translate3d(${L}px, ${A}px, 0) rotateY(${g}deg)`}},e=(p,v)=>{const g=Math.max(-.55,Math.min(.55,(p-.5)*1.1)),S=Math.max(-.35,Math.min(.35,(v-.5)*.7));s(.5+g,.5+S)},i=p=>{const v=c.getBoundingClientRect(),g=(p.clientX-v.left)/Math.max(1,v.width),S=(p.clientY-v.top)/Math.max(1,v.height);M=!0,R.current=performance.now()+650,e(Math.max(0,Math.min(1,g)),Math.max(0,Math.min(1,S)))},r=p=>{const v=c.getBoundingClientRect(),g=(p.clientX-v.left)/Math.max(1,v.width),S=(p.clientY-v.top)/Math.max(1,v.height);return{x:Math.max(0,Math.min(1,g)),y:Math.max(0,Math.min(1,S))}},a=p=>{if(p.pointerType==="mouse")return;I=!0,d=p.pointerId,M=!0,R.current=performance.now()+900;const v=r(p);e(v.x,v.y),!P&&n==null&&(n=requestAnimationFrame(b))},t=p=>{if(!I||d!=null&&p.pointerId!==d)return;M=!0,R.current=performance.now()+900;const v=r(p);e(v.x,v.y)},u=p=>{d!=null&&(p==null?void 0:p.pointerId)!=null&&p.pointerId!==d||(I=!1,d=null,M=!0,!P&&n==null&&(n=requestAnimationFrame(b)))},w=()=>{M=!0,!P&&n==null&&(n=requestAnimationFrame(b))},o=()=>{M=!0,!P&&n==null&&(n=requestAnimationFrame(b))},b=()=>{if(M){if(!P&&performance.now()>=R.current){f.current+=.008;const p=Math.sin(f.current)*.5+.5;e(p,.5)}n=requestAnimationFrame(b)}};return M=!y,c.addEventListener("mouseenter",w),c.addEventListener("mousemove",i),c.addEventListener("mouseleave",o),c.addEventListener("pointerdown",a),c.addEventListener("pointermove",t),c.addEventListener("pointerup",u),c.addEventListener("pointercancel",u),e(.5,.5),!P&&!y&&(n=requestAnimationFrame(b)),()=>{c.removeEventListener("mouseenter",w),c.removeEventListener("mousemove",i),c.removeEventListener("mouseleave",o),c.removeEventListener("pointerdown",a),c.removeEventListener("pointermove",t),c.removeEventListener("pointerup",u),c.removeEventListener("pointercancel",u),n!=null&&cancelAnimationFrame(n)}},[P]),h.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[h.jsxs("div",{className:"patronus-card",children:[h.jsx("div",{className:"patronus-layer patronus-bg",ref:c=>{C.current[0]=c},children:h.jsx("img",{alt:"",src:m[0]})}),h.jsx("div",{className:"patronus-layer",ref:c=>{C.current[1]=c},children:h.jsx("img",{alt:"",src:m[1]})}),h.jsx("div",{className:"patronus-layer",ref:c=>{C.current[2]=c},children:h.jsx("img",{alt:"",src:m[2]})}),h.jsx("div",{className:"patronus-layer patronus-svg",ref:c=>{C.current[3]=c},dangerouslySetInnerHTML:{__html:Me}}),h.jsx("div",{className:"patronus-layer",ref:c=>{C.current[4]=c},children:h.jsx("img",{alt:"",src:m[3]})}),h.jsx("div",{className:"patronus-layer",ref:c=>{C.current[5]=c},children:h.jsx("img",{alt:"",src:m[4]})}),h.jsx("div",{className:"patronus-layer",ref:c=>{C.current[6]=c},children:h.jsx("img",{alt:"",src:m[5]})})]}),h.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{dt as default};
