const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/threeTunnelEngine-YAbz1VnK.js","assets/three-BYTi_f6D.js","assets/threePolygonDemo5Engine-BcBzJu0K.js","assets/prismFieldEngine-Dkw-H_-R.js","assets/soupShaderEngine-DOT8TiBo.js","assets/tardisWormholeEngine-BSErFcgT.js"])))=>i.map(i=>d[i]);
import{c as ye,f as de,A as ae,_ as z}from"./index-DnktefQ5.js";import{r as i,j as u}from"./react-vendor-D1LkQUJD.js";import"./swiper-BJPGAhIX.js";/* empty css              */import"./bootstrap-jfx39s8c.js";import"./vendor-BUjjXRU6.js";const ge=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`;function F(y,{timeoutMs:f=1200}={}){if(typeof window>"u")return y(),()=>{};if("requestIdleCallback"in window){const v=window.requestIdleCallback(()=>y(),{timeout:f});return()=>window.cancelIdleCallback(v)}const C=window.setTimeout(()=>y(),0);return()=>window.clearTimeout(C)}function Me(y){if(!y)return{width:1,height:1};const f=Math.max(1,Math.round(y.clientWidth||y.getBoundingClientRect().width||1)),C=Math.max(1,Math.round(y.clientHeight||y.getBoundingClientRect().height||1));return{width:f,height:C}}function $(y,f,C=1){var h;const{width:v,height:k}=Me(y);(h=f==null?void 0:f.setSize)==null||h.call(f,v,k,C)}function ce(y,f,C="smooth"){if(typeof window>"u")return;const v=document.getElementById(y),k=document.getElementById(`scrollable-${f}`);if(!v||!k)return;const h=v.getBoundingClientRect(),P=k.getBoundingClientRect(),a=k.scrollTop+(h.top-P.top);k.scrollTo({top:Math.max(0,a),behavior:C})}const ke=9,Re=9,Pe=10,Se=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],Ee=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function Ie(y=ke,f=Re,C=Pe){const v=y*f,k=Math.max(1,Math.min(C,v-1)),h=new Set;for(;h.size<k;)h.add(Math.floor(Math.random()*v));const P=new Array(v).fill(0);for(let a=0;a<v;a++){if(h.has(a)){P[a]=-1;continue}const R=a%f,g=Math.floor(a/f);let I=0;for(let c=-1;c<=1;c++)for(let t=-1;t<=1;t++){if(t===0&&c===0)continue;const s=R+t,e=g+c;s<0||e<0||s>=f||e>=y||h.has(e*f+s)&&(I+=1)}P[a]=I}return{rows:y,cols:f,mineCount:k,mines:h,counts:P}}function Ne(y,f,C,v){const k=new Set(C),h=[y];for(;h.length>0;){const P=h.pop();if(P==null||k.has(P)||v.has(P)||f.mines.has(P)||(k.add(P),f.counts[P]!==0))continue;const a=P%f.cols,R=Math.floor(P/f.cols);for(let g=-1;g<=1;g++)for(let I=-1;I<=1;I++){if(I===0&&g===0)continue;const c=a+I,t=R+g;c<0||t<0||c>=f.cols||t>=f.rows||h.push(t*f.cols+c)}}return k}function le(y,f,C){const v=y.rows*y.cols-y.mineCount;if(f.size>=v)return!0;if(C.size!==y.mineCount)return!1;for(const k of y.mines)if(!C.has(k))return!1;return!0}function je(y){return`Web art ${String(y||"tile").toLowerCase()} tile loading`}function Le({seed:y,reduceMotion:f}){const C=JSON.stringify(Ce.split("<\/script>").join("<\\/script>")),v=JSON.stringify(y);return`<!doctype html>
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
    seed: ${v}
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
</html>`}function ot({dataWrapper:y,id:f}){var ie;const C=ye(),v=de(),k=`${y.uniqueId}-ambient-trace`,h=`${y.uniqueId}-ambient-hex`,P=`${y.uniqueId}-ambient-plop`,a=`${y.uniqueId}-ambient-julia`,R=`${y.uniqueId}-ambient-mines`,g=`${y.uniqueId}-ambient-rings`,I=`${y.uniqueId}-ambient-prism`,c=`${y.uniqueId}-ambient-rope`,t=`${y.uniqueId}-ambient-soup`,s=`${y.uniqueId}-ambient-tardis`,[e,o]=i.useState(null),[x,b]=i.useState(!0),r=i.useMemo(()=>y.orderedItems.slice(0,6),[y.orderedItems]),p=i.useMemo(()=>{const E=[4,5,3,6,1,2],j=new Map(r.map(D=>[Number(D==null?void 0:D.id),D])),A=[];for(const D of E){const B=j.get(D);B&&A.push(B)}for(const D of r){if(!D)continue;const B=Number(D==null?void 0:D.id);E.includes(B)||A.push(D)}return A},[r]),m=i.useRef(null),[n,d]=i.useState(!1),l=i.useRef(new Set),w=i.useRef(new Map),[M,S]=i.useState(0),[N,L]=i.useState(-1),[_,T]=i.useState(()=>new Set),[O,H]=i.useState(()=>new Set),[W,G]=i.useState(!1),V=i.useMemo(()=>{const E=p.map(j=>j==null?void 0:j.uniqueId).filter(Boolean);return E.push(k,h,P,a,R,I,g,c,t,s,"ambient-goldfish","ambient-patronus"),new Set(E)},[h,a,R,P,I,g,c,t,s,k,p]),X=i.useMemo(()=>Array.from(O).filter(E=>E!=="ambient-goldfish"&&E!=="ambient-patronus"),[O]),q=x,U=C.selectedLanguageId||"en";let J=C.getString("send_yours");typeof J=="string"&&J.startsWith("locale:")&&(J={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[U]||"Send yours!");let Z=C.getString("click");typeof Z=="string"&&Z.startsWith("locale:")&&(Z={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[U]||"Click");const te={en:{title:"Doors of the world behind an amazing art gallery.",note:"At your own risk",revealNote:"At your own risk click on the card to reveal it!",button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",note:"Auf eigenes Risiko",button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",note:"Na vlastiti rizik",button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",note:"Tüm risk size ait",button:"Gir",preparing:"Hazırlanıyor..."}}[U]||{note:"At your own risk",button:"Enter"},fe=U==="de"?"Auf eigenes Risiko klicke auf die Karte, um sie zu öffnen!":U==="hr"?"Na vlastiti rizik klikni karticu da je otkriješ!":U==="tr"?"Tüm risk size ait, göstermek için karta tıklayın!":"At your own risk click on the card to reveal it!",he="hide",K=i.useCallback(E=>{if(!E||l.current.has(E))return;l.current.add(E);const j=w.current.get(E);j!=null&&(window.clearTimeout(j),w.current.delete(E)),S(l.current.size)},[]),ne=i.useCallback(E=>{E&&H(j=>{if(j.has(E))return j;const A=new Set(j);return A.add(E),A})},[]),Q=i.useCallback(()=>{for(const E of w.current.values())window.clearTimeout(E);w.current=new Map,l.current=new Set,S(0),L(-1),d(!1),T(new Set),H(new Set),G(!1)},[]),ee=i.useCallback(()=>{b(!1),d(!0),L(p.length-1),T(new Set),H(new Set),G(!1)},[p.length]);i.useEffect(()=>{var oe;if(typeof window>"u"||((oe=v.targetSection)==null?void 0:oe.id)!==y.sectionId||v.transitionStatus!=="transition_status_none")return;const E=window.__pendingSectionAction;if(!E||E.action!=="enter"||E.sectionId!==y.sectionId||E.targetArticleId&&E.targetArticleId!==y.uniqueId)return;if(Date.now()-(E.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,ee();const j=E.targetArticleId||y.uniqueId;let A=null,D=null,B=null,Y=null;return A=window.setTimeout(()=>{D=window.requestAnimationFrame(()=>{ce(j,y.sectionId),B=window.setTimeout(()=>{Y=window.requestAnimationFrame(()=>{ce(j,y.sectionId)})},220)})},90),()=>{A!==null&&window.clearTimeout(A),D!==null&&window.cancelAnimationFrame(D),B!==null&&window.clearTimeout(B),Y!==null&&window.cancelAnimationFrame(Y)}},[y.uniqueId,y.sectionId,(ie=v.targetSection)==null?void 0:ie.id,v.transitionStatus,ee]);const re=i.useCallback(E=>{E&&(ne(E),T(j=>{if(j.has(E))return j;const A=new Set(j);return A.add(E),A}))},[ne]),se=i.useCallback(E=>{E&&(T(j=>{if(!j.has(E))return j;const A=new Set(j);return A.delete(E),A}),H(j=>{if(!j.has(E))return j;const A=new Set(j);return A.delete(E),A}))},[]),pe=V.size>0&&_.size>=V.size,be=i.useCallback(()=>{if(V.size>0&&_.size>=V.size){T(new Set),H(new Set),G(!1);return}H(new Set(V)),T(new Set(V)),G(!0)},[V,_.size]),me=i.useCallback(()=>{Q(),b(!0)},[Q]),we=(E,j)=>{const A=Number(E==null?void 0:E.id);return A===1?"Hover":A===2?"Wave":A===3?"3D":A===4?"Poly":A===5?"Click":A===6?"Orbit":String(j+1)},xe=p.map((E,j)=>{if(!n)return u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${j+1} loading`},E.uniqueId);const A=E.uniqueId,D=_.has(A),B=O.has(A)||D;return u.jsx(ue,{label:we(E,j),isOpen:D,onToggle:()=>{D?se(A):re(A)},shouldRender:B,children:B&&u.jsx(Te,{itemWrapper:E,index:j,locked:q||!D,activate:j<=N,onReady:K})},A)}),ve=n?[{key:"ambient-trace",tileId:k,label:"Trace",render:E=>u.jsx(Fe,{readyId:k,locked:q||!E,onReady:K})},{key:"ambient-hex",tileId:h,label:"Hex",render:E=>u.jsx($e,{readyId:h,locked:q||!E,onReady:K})},{key:"ambient-plop",tileId:P,label:"Plop",render:E=>u.jsx(qe,{readyId:P,locked:q||!E,onReady:K})},{key:"ambient-julia",tileId:a,label:"Julia",render:E=>u.jsx(Ke,{readyId:a,locked:q||!E,onReady:K})},{key:"ambient-mines",tileId:R,label:"Bomb",render:E=>u.jsx(Ve,{readyId:R,locked:q||!E,onReady:K})},{key:"ambient-rings",tileId:g,label:"Fall",render:E=>u.jsx(Ge,{readyId:g,locked:q||!E,onReady:K})},{key:"ambient-prism",tileId:I,label:"Prism",render:E=>u.jsx(Ue,{readyId:I,locked:q||!E,onReady:K})},{key:"ambient-rope",tileId:c,label:"Rope",render:E=>u.jsx(Ye,{readyId:c,locked:q||!E,onReady:K})},{key:"ambient-soup",tileId:t,label:"Soup",render:E=>u.jsx(Xe,{readyId:t,locked:q||!E,onReady:K})},{key:"ambient-tardis",tileId:s,label:"Tardis",render:E=>u.jsx(Je,{readyId:s,locked:q||!E,onReady:K})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:E=>u.jsx(Qe,{locked:q||!E})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:E=>u.jsx(We,{locked:q||!E})}].map(({key:E,tileId:j,label:A,render:D})=>{const B=_.has(j),Y=O.has(j)||B;return u.jsx(ue,{label:A,isOpen:B,onToggle:()=>{B?se(j):re(j)},shouldRender:Y,children:Y&&D(B)},E)}):[u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return i.useEffect(()=>{Q()},[y.uniqueId,Q]),i.useEffect(()=>{n&&L(p.length-1)},[n,p.length]),i.useEffect(()=>{if(n)for(const E of X){if(!E||l.current.has(E)||w.current.has(E))continue;const j=window.setTimeout(()=>{K(E)},12e3);w.current.set(E,j)}},[n,X,K]),u.jsx(ae,{id:y.uniqueId,type:ae.Types.SPACING_DEFAULT,dataWrapper:y,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:o,children:u.jsxs("div",{className:"article-web-art-shell",children:[u.jsx(_e,{note:x?te.note:fe,buttonLabel:x?te.button:he,hidden:!x,onEnter:x?ee:me,secondaryButtonLabel:x?null:"promaja",onSecondaryAction:x?null:be,secondaryPressed:pe}),!x&&u.jsx("div",{className:"article-web-art-stage",children:u.jsxs("div",{className:`article-web-art-items ${q?"article-web-art-items-locked":""}`,ref:m,"aria-busy":x,children:[u.jsx(Ze,{label:J,clickLabel:Z,previewRequested:W}),xe,ve]})})]})})}function _e({note:y,buttonLabel:f,hidden:C,onEnter:v,secondaryButtonLabel:k=null,onSecondaryAction:h=null,secondaryPressed:P=!1}){const a=R=>{(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),v())};return u.jsx("div",{className:`article-web-art-intro-cover ${C?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:u.jsxs("div",{className:"article-web-art-intro-cover-inner",children:[u.jsx("div",{className:"article-web-art-intro-cover-actions",children:u.jsx("span",{className:`article-web-art-intro-cover-note ${C?"article-web-art-intro-cover-note-compact":"article-web-art-intro-cover-note-expanded"}`,children:y})}),u.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[k?u.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${P?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:h||void 0,"aria-pressed":P,"aria-label":k,children:k}):null,u.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:v,onKeyDown:a,"aria-label":f,children:f})]})]})})}function ue({label:y,isOpen:f,onToggle:C,shouldRender:v=!0,children:k}){return u.jsxs("div",{className:`article-web-art-gated-tile ${f?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[v?k:u.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":je(y)}),u.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),u.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${f?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:C,"aria-label":`${f?"Hide":"Show"} ${y}`,children:y})]})}function Te({itemWrapper:y,index:f,activate:C,locked:v,onReady:k}){return Number(y.id)===1?u.jsx(De,{itemWrapper:y,index:f,activate:C,locked:v,onReady:k}):Number(y.id)===2?u.jsx(Oe,{itemWrapper:y,index:f,activate:C,locked:v,onReady:k}):Number(y.id)===3?u.jsx(He,{itemWrapper:y,index:f,activate:C,locked:v,onReady:k}):Number(y.id)===4?u.jsx(Be,{itemWrapper:y,index:f,activate:C,locked:v,onReady:k}):Number(y.id)===6?u.jsx(ze,{itemWrapper:y,index:f,activate:C,locked:v,onReady:k}):u.jsx(Ae,{itemWrapper:y,index:f,activate:C,locked:v,onReady:k})}function Ae({itemWrapper:y,index:f,activate:C,locked:v,onReady:k}){const h=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!0),g=i.useRef(!0),I=i.useRef(!1),c=Number(y==null?void 0:y.id)===5,t=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=i.useMemo(()=>{const r=Number(y.id)||f+1,p=.0026+r*8e-5,m=.0054+r*14e-5,n=r%2?1:2,d={kx:11+r*2,ky:r%2};return{refreshDelay:c?0:8e3,radiusMini:p,radiusMaxi:m,dHueStep:n,startGroup:d,seed:1337+r*1009,reduceMotion:t}},[c,y.id,f,t]);i.useEffect(()=>{if(!C)return;const r=h.current,p=P.current;if(!r||!p)return;let m=!1,n=null,d=null,l=null;const w=()=>{I.current||(I.current=!0,k==null||k(y.uniqueId))},M=F(async()=>{var S,N;try{const L=await z(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(m)return;n=L.createEmbroideryEngine(p,s),a.current=n;const _=()=>$(r,n,window.devicePixelRatio||1);_(),(S=n.renderStatic)==null||S.call(n),g.current&&((N=n.start)==null||N.call(n)),w(),d=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),d.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const O of T){if(g.current=!!O.isIntersecting,c){g.current||n.stop();continue}g.current&&R.current?n.start():n.stop()}},{threshold:.25}),l.observe(r))}catch{w()}});return()=>{m=!0,M==null||M(),l==null||l.disconnect(),d==null||d.disconnect(),n==null||n.destroy(),a.current=null}},[C,s,y.uniqueId,k]),i.useEffect(()=>{var p,m;const r=a.current;if(r){if(v){(p=r.stop)==null||p.call(r);return}g.current&&((m=r.start)==null||m.call(r))}},[v]),i.useEffect(()=>{var p,m;const r=a.current;if(r){if(v){(p=r.stop)==null||p.call(r);return}g.current&&((m=r.start)==null||m.call(r))}},[v]);const e=()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())},o=()=>{var r,p,m,n;R.current=!0,g.current?(p=(r=a.current)==null?void 0:r.start)==null||p.call(r):(n=(m=a.current)==null?void 0:m.stop)==null||n.call(m)},x=()=>{var r,p,m,n,d,l,w,M,S,N;if(c){(p=(r=a.current)==null?void 0:r.stop)==null||p.call(r),(n=(m=a.current)==null?void 0:m.reset)==null||n.call(m),(l=(d=a.current)==null?void 0:d.start)==null||l.call(d);return}(w=a.current)==null||w.reset(),(S=(M=a.current)==null?void 0:M.renderStatic)==null||S.call(M),g.current&&((N=a.current)==null||N.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),x())};return u.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${f+1}`,disabled:v,onClick:v?void 0:x,onMouseEnter:v||c?void 0:e,onMouseLeave:v||c?void 0:o,onFocus:v||c?void 0:e,onBlur:v||c?void 0:o,onKeyDown:v?void 0:b,children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:c?"Click":Number.isFinite(Number(y==null?void 0:y.id))?Number(y.id):f+1})]})}function De({itemWrapper:y,index:f,activate:C,locked:v,onReady:k}){const h=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!1),g=i.useRef(null),I=i.useRef(!1),c=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=i.useMemo(()=>({seed:9001+(Number(y.id)||1)*1337,reduceMotion:c,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:120,introDurationMs:950}),[y.id,c]);i.useEffect(()=>{if(!C)return;const n=h.current,d=P.current;if(!n||!d)return;let l=!1,w=null,M=null;const S=()=>{R.current||(R.current=!0,k==null||k(y.uniqueId))},N=F(async()=>{var L,_;try{const T=await z(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(l)return;w=T.createSpiralDotsEngine(d,t),a.current=w;const O=()=>$(n,w,window.devicePixelRatio||1);O(),(L=w.renderStatic)==null||L.call(w),(_=w.start)==null||_.call(w),S(),M=new ResizeObserver(()=>{var H;O(),w.rebuildDots(),(H=w.renderStatic)==null||H.call(w)}),M.observe(n)}catch{S()}});return()=>{l=!0,N==null||N(),M==null||M.disconnect(),w==null||w.destroy(),a.current=null}},[C,t,y.uniqueId,k]),i.useEffect(()=>{var d,l,w;const n=a.current;if(n){if(v){(d=n.clearMouse)==null||d.call(n),(l=n.stop)==null||l.call(n);return}(w=n.start)==null||w.call(n)}},[v]);const s=n=>{const d=h.current;if(!d)return{x:-1e4,y:-1e4};const l=d.getBoundingClientRect();return{x:n.clientX-l.left,y:n.clientY-l.top}},e=()=>{var n;(n=a.current)==null||n.start()},o=()=>{var n,d;(n=a.current)==null||n.clearMouse(),(d=a.current)==null||d.start()},x=()=>{e()},b=()=>{o()},r=n=>{var l;const d=s(n);(l=a.current)==null||l.setMouse(d.x,d.y)},p=()=>{e()},m=()=>{o()};return u.jsxs("div",{ref:h,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:v?-1:0,"aria-label":`Spiral dots web art tile ${f+1}`,onPointerDown:v?void 0:n=>{var w;if(n.pointerType==="mouse")return;const d=h.current;if(!d)return;I.current=!0,g.current=n.pointerId;try{d.setPointerCapture(n.pointerId)}catch{}e();const l=s(n);(w=a.current)==null||w.setMouse(l.x,l.y)},onPointerMove:v?void 0:n=>{var l;if(!I.current||g.current!=null&&n.pointerId!==g.current)return;const d=s(n);(l=a.current)==null||l.setMouse(d.x,d.y)},onPointerUp:v?void 0:n=>{g.current!=null&&n.pointerId!==g.current||(I.current=!1,g.current=null,o())},onPointerCancel:v?void 0:()=>{I.current=!1,g.current=null,o()},onMouseEnter:v?void 0:x,onMouseLeave:v?void 0:b,onMouseMove:v?void 0:r,onFocus:v?void 0:p,onBlur:v?void 0:m,children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function Oe({itemWrapper:y,index:f,activate:C,locked:v,onReady:k}){const h=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!0),g=i.useRef(!0),I=i.useRef(!1),c=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=i.useMemo(()=>({seed:424242+(Number(y.id)||2)*2027,reduceMotion:c,targetCellSize:14,gapPx:1.4}),[y.id,c]);i.useEffect(()=>{if(!C)return;const r=h.current,p=P.current;if(!r||!p)return;let m=!1,n=null,d=null,l=null;const w=()=>{I.current||(I.current=!0,k==null||k(y.uniqueId))},M=F(async()=>{var S,N;try{const L=await z(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(m)return;n=L.createGridWaveEngine(p,t),a.current=n;const _=()=>$(r,n,window.devicePixelRatio||1);_(),(S=n.renderStatic)==null||S.call(n),g.current&&((N=n.start)==null||N.call(n)),w(),d=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),d.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const O of T)g.current=!!O.isIntersecting,g.current&&R.current?n.start():n.stop()},{threshold:.25}),l.observe(r))}catch{w()}});return()=>{m=!0,M==null||M(),l==null||l.disconnect(),d==null||d.disconnect(),n==null||n.destroy(),a.current=null}},[C,t,y.uniqueId,k]);const s=()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())},e=()=>{var r,p,m,n;R.current=!0,g.current?(p=(r=a.current)==null?void 0:r.start)==null||p.call(r):(n=(m=a.current)==null?void 0:m.stop)==null||n.call(m)},o=r=>{const p=h.current;if(!p)return{x:0,y:0};const m=p.getBoundingClientRect();return typeof(r==null?void 0:r.clientX)!="number"||typeof(r==null?void 0:r.clientY)!="number"?{x:m.width/2,y:m.height/2}:{x:r.clientX-m.left,y:r.clientY-m.top}},x=r=>{var m,n,d,l;const p=o(r);(m=a.current)==null||m.rippleAt(p.x,p.y),(d=(n=a.current)==null?void 0:n.renderStatic)==null||d.call(n),R.current&&g.current&&((l=a.current)==null||l.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),x(null))};return u.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${f+1}`,disabled:v,onClick:v?void 0:x,onMouseEnter:v?void 0:s,onMouseLeave:v?void 0:e,onFocus:v?void 0:s,onBlur:v?void 0:e,onKeyDown:v?void 0:b,children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function He({itemWrapper:y,index:f,activate:C,locked:v,onReady:k}){const h=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!0),g=i.useRef(!0),I=i.useRef(!1),c=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),t=i.useMemo(()=>({reduceMotion:c,ringCount:9,cubesPerRing:10,ringSpacing:82,tunnelRadius:58,speed:4.6,exposure:1.45}),[c]);i.useEffect(()=>{if(!C)return;const b=h.current,r=P.current;if(!b||!r)return;let p=!1,m=null,n=null,d=null,l=null;const w=()=>{I.current||(I.current=!0,k==null||k(y.uniqueId))},M=async()=>{var T;const N=await z(()=>import("./threeTunnelEngine-YAbz1VnK.js"),__vite__mapDeps([0,1]));if(p)return;m=N.createThreeTunnelEngine(r,t),a.current=m;const L=()=>$(b,m,Math.min(1.5,window.devicePixelRatio||1));return L(),m.reset(),g.current&&((T=m.start)==null||T.call(m)),w(),n=new ResizeObserver(()=>{L(),m.reset()}),n.observe(b),"IntersectionObserver"in window&&(d=new IntersectionObserver(O=>{for(const H of O)g.current=!!H.isIntersecting,g.current&&R.current?m.start():m.stop()},{threshold:.25}),d.observe(b)),()=>{d==null||d.disconnect(),n==null||n.disconnect(),m.destroy(),a.current=null}};let S=null;return l=F(()=>{M().then(N=>{S=N||null}).catch(()=>{w()})},{timeoutMs:300}),()=>{p=!0,l==null||l(),S==null||S()}},[C,t,y.uniqueId,k]),i.useEffect(()=>{var r,p,m;const b=a.current;if(b){if(v){(r=b.setHeld)==null||r.call(b,!1),(p=b.stop)==null||p.call(b);return}g.current&&((m=b.start)==null||m.call(b))}},[v]);const s=()=>{var b;R.current=!0,g.current&&((b=a.current)==null||b.start())},e=()=>{var b,r,p,m;R.current=!0,g.current?(r=(b=a.current)==null?void 0:b.start)==null||r.call(b):(m=(p=a.current)==null?void 0:p.stop)==null||m.call(p)},o=()=>{var b,r,p,m;(r=(b=a.current)==null?void 0:b.nextPalette)==null||r.call(b),(p=a.current)==null||p.reset(),g.current&&((m=a.current)==null||m.start())},x=b=>{(b.key==="Enter"||b.key===" ")&&(b.preventDefault(),o())};return u.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${f+1}`,disabled:v,onClick:v?void 0:o,onMouseEnter:v?void 0:s,onMouseLeave:v?void 0:e,onFocus:v?void 0:s,onBlur:v?void 0:e,onKeyDown:v?void 0:x,children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),u.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Be({itemWrapper:y,index:f,activate:C,locked:v,onReady:k}){const h=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!0),g=i.useRef(!0),I=i.useRef(!1),c=i.useRef(null),t=i.useRef(null),s=i.useRef(!1),e=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=i.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,v]);i.useEffect(()=>{if(!C)return;const r=h.current,p=P.current;if(!r||!p)return;let m=!1,n=null,d=null;const l=()=>{I.current||(I.current=!0,k==null||k(y.uniqueId))},w=async()=>{var T;const M=await z(()=>import("./threePolygonDemo5Engine-BcBzJu0K.js"),__vite__mapDeps([2,1]));if(m)return;const S=M.createThreePolygonDemo5Engine(p,o);a.current=S;const N=()=>$(r,S,Math.min(1.2,window.devicePixelRatio||1));N(),S.reset(),g.current&&((T=S.start)==null||T.call(S)),l();const L=new ResizeObserver(()=>{N()});L.observe(r);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(O=>{for(const H of O)g.current=!!H.isIntersecting,g.current&&R.current?S.start():S.stop()},{threshold:.25}),_.observe(r)),n=()=>{_==null||_.disconnect(),L.disconnect(),S.destroy(),a.current=null}};return d=F(()=>{w().catch(()=>{l()})},{timeoutMs:300}),()=>{m=!0,d==null||d(),t.current!=null&&window.clearTimeout(t.current),n==null||n()}},[C,o,y.uniqueId,k]);const x=()=>{var r,p,m;(p=(r=a.current)==null?void 0:r.boost)==null||p.call(r),g.current&&((m=a.current)==null||m.start())},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),x())};return u.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${f+1}`,disabled:v,onKeyDown:v?void 0:b,onPointerDown:v?void 0:r=>{var p;if(!(r.button!=null&&r.button!==0)){c.current=r.pointerId,s.current=!1;try{r.currentTarget.setPointerCapture(r.pointerId)}catch{}g.current&&((p=a.current)==null||p.start()),t.current!=null&&window.clearTimeout(t.current),t.current=window.setTimeout(()=>{var m,n;c.current!=null&&(s.current=!0,(n=(m=a.current)==null?void 0:m.setHeld)==null||n.call(m,!0))},140)}},onPointerUp:v?void 0:r=>{var p,m;c.current!=null&&r.pointerId!==c.current||(t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current?(s.current=!1,(m=(p=a.current)==null?void 0:p.setHeld)==null||m.call(p,!1)):x())},onPointerCancel:v?void 0:(()=>{var r,p;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(p=(r=a.current)==null?void 0:r.setHeld)==null||p.call(r,!1)}),onLostPointerCapture:v?void 0:(()=>{var r,p;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(p=(r=a.current)==null?void 0:r.setHeld)==null||p.call(r,!1)}),onMouseEnter:v?void 0:(()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())}),onMouseLeave:v?void 0:(()=>{var r,p,m,n;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(p=(r=a.current)==null?void 0:r.setHeld)==null||p.call(r,!1),R.current=!0,g.current?(m=a.current)==null||m.start():(n=a.current)==null||n.stop()}),onFocus:v?void 0:(()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())}),onBlur:v?void 0:(()=>{var r,p,m,n;t.current!=null&&(window.clearTimeout(t.current),t.current=null),c.current=null,s.current=!1,(p=(r=a.current)==null?void 0:r.setHeld)==null||p.call(r,!1),R.current=!0,g.current?(m=a.current)==null||m.start():(n=a.current)==null||n.stop()}),children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function ze({itemWrapper:y,index:f,activate:C,locked:v,onReady:k}){const h=i.useRef(null),P=i.useRef(null),a=i.useRef(null),R=i.useRef(!0),g=i.useRef(!0),I=i.useRef(!1),c=i.useRef(0),t=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),s=i.useMemo(()=>({reduceMotion:t,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[t]);i.useEffect(()=>{if(!C)return;const r=h.current,p=P.current;if(!r||!p)return;let m=!1,n=null,d=null,l=null;const w=()=>{I.current||(I.current=!0,k==null||k(y.uniqueId))},M=F(async()=>{var S,N;try{const L=await z(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(m)return;n=L.createOrbitCirclesEngine(p,s),a.current=n;const _=()=>$(r,n,window.devicePixelRatio||1);_(),n.reset(),(S=n.renderStatic)==null||S.call(n),g.current&&((N=n.start)==null||N.call(n)),w(),d=new ResizeObserver(()=>{var T;_(),(T=n.renderStatic)==null||T.call(n)}),d.observe(r),"IntersectionObserver"in window&&(l=new IntersectionObserver(T=>{for(const O of T)g.current=!!O.isIntersecting,g.current&&R.current?n.start():n.stop()},{threshold:.25}),l.observe(r))}catch{w()}});return()=>{m=!0,M==null||M(),l==null||l.disconnect(),d==null||d.disconnect(),n==null||n.destroy(),a.current=null}},[C,s,y.uniqueId,k]),i.useEffect(()=>{var p,m;const r=a.current;if(r){if(v){(p=r.stop)==null||p.call(r);return}g.current&&((m=r.start)==null||m.call(r))}},[v]);const e=()=>{var r;R.current=!0,g.current&&((r=a.current)==null||r.start())},o=()=>{var r,p,m,n;R.current=!0,g.current?(p=(r=a.current)==null?void 0:r.start)==null||p.call(r):(n=(m=a.current)==null?void 0:m.stop)==null||n.call(m)},x=()=>{var n,d;const r=a.current;if(!r)return;const p=[{palette:["#A8DA00","#76C700","#D9FF6A"],bgColor:"#06130a"},{palette:["#DD0F7E","#FF4FAE","#7B2CFF"],bgColor:"#200018"},{palette:["#009BBE","#00D5FF","#2B7BFF"],bgColor:"#001018"},{palette:["#F2E205","#FFB703","#EE5A02"],bgColor:"#1a0f00"},{palette:["#8A2BFF","#C300FF","#FF00C8"],bgColor:"#07000f"}],m=p[c.current%p.length];c.current=(c.current+1)%p.length,(n=r.setPalette)==null||n.call(r,m.palette,m.bgColor),g.current&&((d=r.start)==null||d.call(r))},b=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),x())};return u.jsxs("button",{type:"button",ref:h,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${f+1}`,disabled:v,onClick:v?void 0:x,onMouseEnter:v?void 0:e,onMouseLeave:v?void 0:o,onFocus:v?void 0:e,onBlur:v?void 0:o,onKeyDown:v?void 0:b,children:[u.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function Fe({readyId:y,locked:f,onReady:C}){const v=i.useRef(null),k=i.useRef(null),h=i.useRef(null),P=i.useRef(!1),a=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=i.useMemo(()=>({seed:20250414,reduceMotion:a,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[a]);i.useEffect(()=>{const c=v.current,t=k.current;if(!c||!t)return;let s=!1,e=null,o=null,x=null;const b=()=>{P.current||(P.current=!0,C==null||C(y))},r=F(async()=>{var p,m;try{const n=await z(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(s)return;e=n.createTortuosityTraceEngine(t,R),h.current=e;const d=()=>$(c,e,Math.min(1.5,window.devicePixelRatio||1));d(),(p=e.renderStatic)==null||p.call(e),(m=e.start)==null||m.call(e),b(),o=new ResizeObserver(()=>{var l;d(),(l=e.reset)==null||l.call(e)}),o.observe(c),"IntersectionObserver"in window&&(x=new IntersectionObserver(l=>{var w,M;for(const S of l)S.isIntersecting?(w=e.start)==null||w.call(e):(M=e.stop)==null||M.call(e)},{threshold:.25}),x.observe(c))}catch{b()}},{timeoutMs:200});return()=>{var p;s=!0,r==null||r(),x==null||x.disconnect(),o==null||o.disconnect(),(p=e==null?void 0:e.destroy)==null||p.call(e),h.current=null}},[R,C,y]),i.useEffect(()=>{var t,s,e;const c=h.current;if(c){if(f){(t=c.setHeld)==null||t.call(c,!1),(s=c.stop)==null||s.call(c);return}(e=c.start)==null||e.call(c)}},[f]),i.useEffect(()=>{var t,s;const c=h.current;if(c){if(f){(t=c.stop)==null||t.call(c);return}(s=c.start)==null||s.call(c)}},[f]);const g=()=>{var c,t,s,e;(t=(c=h.current)==null?void 0:c.reset)==null||t.call(c),(e=(s=h.current)==null?void 0:s.start)==null||e.call(s)},I=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),g())};return u.jsxs("button",{type:"button",ref:v,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:f,onClick:f?void 0:g,onKeyDown:f?void 0:I,children:[u.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function $e({readyId:y,locked:f,onReady:C}){const v=i.useRef(null),k=i.useRef(null),h=i.useRef(null),P=i.useRef(!1),a=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=i.useMemo(()=>({seed:20250415,reduceMotion:a,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[a]);i.useEffect(()=>{const c=v.current,t=k.current;if(!c||!t)return;let s=!1,e=null,o=null,x=null;const b=()=>{P.current||(P.current=!0,C==null||C(y))},r=F(async()=>{var p,m;try{const n=await z(()=>import("./hexFlowBallsEngine-C4hMgqMS.js"),[]);if(s)return;e=n.createHexFlowBallsEngine(t,R),h.current=e;const d=()=>$(c,e,Math.min(1.5,window.devicePixelRatio||1));d(),(p=e.renderStatic)==null||p.call(e),(m=e.start)==null||m.call(e),b(),o=new ResizeObserver(()=>{var l;d(),(l=e.reset)==null||l.call(e)}),o.observe(c),"IntersectionObserver"in window&&(x=new IntersectionObserver(l=>{var w,M;for(const S of l)S.isIntersecting?(w=e.start)==null||w.call(e):(M=e.stop)==null||M.call(e)},{threshold:.25}),x.observe(c))}catch{b()}},{timeoutMs:220});return()=>{var p;s=!0,r==null||r(),x==null||x.disconnect(),o==null||o.disconnect(),(p=e==null?void 0:e.destroy)==null||p.call(e),h.current=null}},[R,C,y]),i.useEffect(()=>{var t,s,e;const c=h.current;if(c){if(f){(t=c.clearPointer)==null||t.call(c),(s=c.stop)==null||s.call(c);return}(e=c.start)==null||e.call(c)}},[f]),i.useEffect(()=>{var t,s;const c=h.current;if(c){if(f){(t=c.stop)==null||t.call(c);return}(s=c.start)==null||s.call(c)}},[f]);const g=()=>{var c,t,s,e;(t=(c=h.current)==null?void 0:c.toggleGridContrast)==null||t.call(c),(e=(s=h.current)==null?void 0:s.start)==null||e.call(s)},I=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),g())};return u.jsxs("button",{type:"button",ref:v,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:f,onClick:f?void 0:g,onKeyDown:f?void 0:I,children:[u.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function qe({readyId:y,locked:f,onReady:C}){const v=i.useRef(null),k=i.useRef(null),h=i.useRef(null),P=i.useRef(!1),a=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=i.useMemo(()=>({seed:20250416,reduceMotion:a,step:6,side:5}),[a]);i.useEffect(()=>{const t=v.current,s=k.current;if(!t||!s)return;let e=!1,o=null,x=null,b=null;const r=()=>{P.current||(P.current=!0,C==null||C(y))},p=F(async()=>{var m,n;try{const d=await z(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;o=d.createPixelPlopEngine(s,R),h.current=o;const l=()=>$(t,o,Math.min(1.5,window.devicePixelRatio||1));l(),(m=o.renderStatic)==null||m.call(o),(n=o.start)==null||n.call(o),r(),x=new ResizeObserver(()=>{var w;l(),(w=o.reset)==null||w.call(o)}),x.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(w=>{var M,S;for(const N of w)N.isIntersecting?(M=o.start)==null||M.call(o):(S=o.stop)==null||S.call(o)},{threshold:.25}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var m;e=!0,p==null||p(),b==null||b.disconnect(),x==null||x.disconnect(),(m=o==null?void 0:o.destroy)==null||m.call(o),h.current=null}},[R,C,y]),i.useEffect(()=>{var s,e,o;const t=h.current;if(t){if(f){(s=t.clearPointer)==null||s.call(t),(e=t.stop)==null||e.call(t);return}(o=t.start)==null||o.call(t)}},[f]),i.useEffect(()=>{var s,e;const t=h.current;if(t){if(f){(s=t.stop)==null||s.call(t);return}(e=t.start)==null||e.call(t)}},[f]);const g=()=>{var t,s,e,o;(s=(t=h.current)==null?void 0:t.seedBurst)==null||s.call(t),(o=(e=h.current)==null?void 0:e.start)==null||o.call(e)},I=t=>{var o,x,b,r;const s=v.current;if(!s||typeof(t==null?void 0:t.clientX)!="number"||typeof(t==null?void 0:t.clientY)!="number"){g();return}const e=s.getBoundingClientRect();(x=(o=h.current)==null?void 0:o.burstAt)==null||x.call(o,t.clientX-e.left,t.clientY-e.top),(r=(b=h.current)==null?void 0:b.start)==null||r.call(b)},c=t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),g())};return u.jsxs("button",{type:"button",ref:v,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:f,onPointerDown:f?void 0:(t=>{t.button!=null&&t.button!==0||I(t)}),onKeyDown:f?void 0:c,children:[u.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function Ke({readyId:y,locked:f,onReady:C}){const v=i.useRef(null),k=i.useRef(null),h=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useRef(!1),g=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=i.useMemo(()=>({reduceMotion:g,seed:20250417}),[g]);i.useEffect(()=>{const e=v.current,o=k.current;if(!e||!o)return;let x=!1,b=null,r=null,p=null;const m=()=>{P.current||(P.current=!0,C==null||C(y))},n=F(async()=>{var d,l;try{const w=await z(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(x)return;b=w.createJuliaLinesEngine(o,I),h.current=b;const M=()=>$(e,b,Math.min(1.5,window.devicePixelRatio||1));M(),(d=b.renderStatic)==null||d.call(b),(l=b.start)==null||l.call(b),m(),r=new ResizeObserver(()=>{M()}),r.observe(e),"IntersectionObserver"in window&&(p=new IntersectionObserver(S=>{var N,L;for(const _ of S)_.isIntersecting?(N=b.start)==null||N.call(b):(L=b.stop)==null||L.call(b)},{threshold:.25}),p.observe(e))}catch{m()}},{timeoutMs:220});return()=>{var d;x=!0,n==null||n(),p==null||p.disconnect(),r==null||r.disconnect(),(d=b==null?void 0:b.destroy)==null||d.call(b),h.current=null}},[I,C,y]),i.useEffect(()=>{var o,x,b,r;const e=h.current;if(e){if(f){(o=e.setHeld)==null||o.call(e,!1),(x=e.clearPointer)==null||x.call(e),(b=e.stop)==null||b.call(e);return}(r=e.start)==null||r.call(e)}},[f]),i.useEffect(()=>{var o,x,b;const e=h.current;if(e){if(f){(o=e.clearPointer)==null||o.call(e),(x=e.stop)==null||x.call(e);return}(b=e.start)==null||b.call(e)}},[f]);const c=e=>{const o=v.current;if(!o)return{x:.4,y:.5};const x=o.getBoundingClientRect(),b=(e.clientX-x.left)/Math.max(1,x.width),r=(e.clientY-x.top)/Math.max(1,x.height);return{x:Math.max(0,Math.min(1,b)),y:Math.max(0,Math.min(1,r))}},t=()=>{var e,o,x,b;(o=(e=h.current)==null?void 0:e.reset)==null||o.call(e),(b=(x=h.current)==null?void 0:x.start)==null||b.call(x)},s=e=>{var x,b,r,p,m,n,d,l;const o=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(b=(x=h.current)==null?void 0:x.nudge)==null||b.call(x,0,-o)):e.key==="ArrowDown"?(e.preventDefault(),(p=(r=h.current)==null?void 0:r.nudge)==null||p.call(r,0,o)):e.key==="ArrowLeft"?(e.preventDefault(),(n=(m=h.current)==null?void 0:m.nudge)==null||n.call(m,-o,0)):e.key==="ArrowRight"?(e.preventDefault(),(l=(d=h.current)==null?void 0:d.nudge)==null||l.call(d,o,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),t())};return u.jsxs("div",{ref:v,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:f?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:f?void 0:e=>{var b,r;const o=v.current;if(!o)return;R.current=!0,a.current=e.pointerId;try{o.setPointerCapture(e.pointerId)}catch{}const x=c(e);(r=(b=h.current)==null?void 0:b.setPointer)==null||r.call(b,x.x,x.y)},onPointerMove:f?void 0:e=>{var x,b;if(R.current&&a.current!=null&&e.pointerId!==a.current)return;const o=c(e);(b=(x=h.current)==null?void 0:x.setPointer)==null||b.call(x,o.x,o.y)},onPointerUp:f?void 0:e=>{var o,x;a.current!=null&&e.pointerId!==a.current||(R.current=!1,a.current=null,(x=(o=h.current)==null?void 0:o.clearPointer)==null||x.call(o))},onPointerCancel:f?void 0:()=>{var e,o;R.current=!1,a.current=null,(o=(e=h.current)==null?void 0:e.clearPointer)==null||o.call(e)},onMouseMove:f?void 0:e=>{var x,b;const o=c(e);(b=(x=h.current)==null?void 0:x.setPointer)==null||b.call(x,o.x,o.y)},onMouseLeave:f?void 0:(()=>{var e,o;(o=(e=h.current)==null?void 0:e.clearPointer)==null||o.call(e)}),onBlur:f?void 0:(()=>{var e,o;(o=(e=h.current)==null?void 0:e.clearPointer)==null||o.call(e)}),onKeyDown:f?void 0:s,onClick:f?void 0:t,children:[u.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function Ve({readyId:y,locked:f,onReady:C}){const[v,k]=i.useState(0),[h,P]=i.useState("mine"),[a,R]=i.useState(()=>new Set),[g,I]=i.useState(()=>new Set),[c,t]=i.useState("playing"),[s,e]=i.useState(null),[o,x]=i.useState(0),b=i.useMemo(()=>Ie(),[v]);i.useEffect(()=>{C==null||C(y)},[C,y]),i.useEffect(()=>{P("mine"),R(new Set),I(new Set),t("playing"),e(null),x(0)},[v]),i.useEffect(()=>{if(s==null||c!=="playing")return;const l=()=>{x(Math.min(5999,Math.floor((Date.now()-s)/1e3)))};l();const w=window.setInterval(l,1e3);return()=>{window.clearInterval(w)}},[s,c]);const r=()=>{k(l=>l+1)},p=l=>{if(f||c!=="playing")return;if(s==null&&e(Date.now()),h==="flag"){if(a.has(l))return;const M=new Set(g);M.has(l)?M.delete(l):M.add(l),I(M),le(b,a,M)&&t("won");return}if(g.has(l)||a.has(l))return;if(b.mines.has(l)){const M=new Set(a);for(const S of b.mines)M.add(S);M.add(l),R(M),t("lost");return}const w=Ne(l,b,a,g);R(w),le(b,w,g)&&t("won")},m=b.mineCount-g.size,n=`${String(Math.floor(o/60)).padStart(2,"0")}:${String(o%60).padStart(2,"0")}`;let d="🤔";return c==="lost"?d="😣":c==="won"?d="😎":g.size>=b.mineCount?d="😕":g.size>=b.mineCount-1?d="🤓":g.size>=Math.round(b.mineCount*3/4)?d="😃":g.size>=Math.round(b.mineCount*2/3)?d="😊":g.size>=Math.round(b.mineCount/2)?d="🙂":g.size>=Math.round(b.mineCount/3)?d="😏":g.size>0&&(d="😐"),u.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:u.jsxs("div",{className:"article-web-art-minesweeper",children:[u.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[u.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${h==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("mine"),disabled:f||c!=="playing","aria-pressed":h==="mine",children:"⛏"}),u.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${h==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("flag"),disabled:f||c!=="playing","aria-pressed":h==="flag",children:"🚩"})]}),u.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[b.counts.map((l,w)=>{const M=a.has(w),S=g.has(w),N=b.mines.has(w),L=c==="lost"&&N,_=l>0?Se[l-1]:void 0;return u.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${M?"article-web-art-minesweeper-cell-revealed":""} ${L?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>p(w),disabled:f||c!=="playing","aria-label":`Minesweeper cell ${w+1}`,children:[S&&!M?u.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,L?u.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,M&&!N&&l>0?u.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:l}):null]},`mine-${v}-${w}`)}),c==="lost"?u.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:r,children:["Ooohhh 🙁",u.jsx("br",{}),"Click to try again"]}):null,c==="won"?u.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:r,children:["👌👀✔💯💯💯",u.jsx("br",{}),"Click to restart"]}):null]}),u.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[u.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[u.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:d}),u.jsx("span",{children:m})]}),u.jsx("div",{className:"article-web-art-minesweeper-timer",children:n})]}),u.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function Ge({readyId:y,locked:f,onReady:C}){const v=i.useRef(null),k=i.useRef(null),h=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=i.useMemo(()=>({reduceMotion:R}),[R]);i.useEffect(()=>{const s=v.current,e=k.current;if(!s||!e)return;let o=!1,x=null,b=null,r=null;const p=()=>{P.current||(P.current=!0,C==null||C(y))},m=F(async()=>{var n,d;try{const l=await z(()=>import("./fallingRingsEngine-C9a7CL1C.js"),[]);if(o)return;x=l.createFallingRingsEngine(e,g),h.current=x;const w=()=>$(s,x,Math.min(1.5,window.devicePixelRatio||1));w(),(n=x.renderStatic)==null||n.call(x),(d=x.start)==null||d.call(x),p(),b=new ResizeObserver(()=>{w()}),b.observe(s),"IntersectionObserver"in window&&(r=new IntersectionObserver(M=>{var S,N;for(const L of M)L.isIntersecting?(S=x.start)==null||S.call(x):(N=x.stop)==null||N.call(x)},{threshold:.25}),r.observe(s))}catch{p()}},{timeoutMs:220});return()=>{var n;o=!0,m==null||m(),r==null||r.disconnect(),b==null||b.disconnect(),(n=x==null?void 0:x.destroy)==null||n.call(x),h.current=null}},[g,C,y]);const I=s=>{var e,o,x,b;(o=(e=h.current)==null?void 0:e.setHeld)==null||o.call(e,s),(b=(x=h.current)==null?void 0:x.start)==null||b.call(x)},c=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),I(!0))},t=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),I(!1))};return u.jsxs("button",{type:"button",ref:v,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:f,onPointerDown:f?void 0:s=>{a.current=s.pointerId;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}I(!0)},onPointerUp:f?void 0:s=>{a.current!=null&&s.pointerId!==a.current||(a.current=null,I(!1))},onPointerCancel:f?void 0:()=>{a.current=null,I(!1)},onLostPointerCapture:f?void 0:()=>{a.current=null,I(!1)},onMouseLeave:f?void 0:(()=>{a.current!=null&&I(!1)}),onBlur:f?void 0:(()=>{a.current=null,I(!1)}),onKeyDown:f?void 0:c,onKeyUp:f?void 0:t,children:[u.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function Ue({readyId:y,locked:f,onReady:C}){const v=i.useRef(null),k=i.useRef(null),h=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useRef("mouse"),g=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=i.useMemo(()=>({reduceMotion:g,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[g]);i.useEffect(()=>{const t=v.current,s=k.current;if(!t||!s)return;let e=!1,o=null,x=null,b=null;const r=()=>{P.current||(P.current=!0,C==null||C(y))},p=F(async()=>{var m,n;try{const d=await z(()=>import("./prismFieldEngine-Dkw-H_-R.js"),__vite__mapDeps([3,1]));if(e)return;o=d.createPrismFieldEngine(s,I),h.current=o;const l=()=>$(t,o,Math.min(1.5,window.devicePixelRatio||1));l(),(m=o.renderStatic)==null||m.call(o),(n=o.start)==null||n.call(o),r(),x=new ResizeObserver(()=>{l()}),x.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(w=>{var M,S;for(const N of w)N.isIntersecting?(M=o.start)==null||M.call(o):(S=o.stop)==null||S.call(o)},{threshold:.25}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var m;e=!0,p==null||p(),b==null||b.disconnect(),x==null||x.disconnect(),(m=o==null?void 0:o.destroy)==null||m.call(o),h.current=null}},[I,C,y]);const c=t=>{const s=v.current;if(!s)return{x:.5,y:.5};const e=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(t.clientY-e.top)/Math.max(1,e.height)))}};return u.jsxs("button",{type:"button",ref:v,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:f,onPointerDown:f?void 0:t=>{var e,o;a.current=t.pointerId,R.current=t.pointerType||"mouse";try{t.currentTarget.setPointerCapture(t.pointerId)}catch{}const s=c(t);(o=(e=h.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onPointerMove:f?void 0:t=>{var e,o;if(a.current!=null&&t.pointerId!==a.current)return;const s=c(t);(o=(e=h.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onPointerUp:f?void 0:t=>{var s,e;a.current!=null&&t.pointerId!==a.current||(a.current=null,(t.pointerType||R.current)==="mouse"&&((e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s)))},onPointerCancel:f?void 0:(()=>{var t,s;a.current=null,R.current==="mouse"&&((s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t))}),onMouseMove:f?void 0:t=>{var e,o;const s=c(t);(o=(e=h.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onMouseLeave:f?void 0:(()=>{var t,s;a.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onBlur:f?void 0:(()=>{var t,s;a.current=null,R.current="mouse",(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:f?void 0:(t=>{var s,e,o,x;(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),(e=(s=h.current)==null?void 0:s.reset)==null||e.call(s),(x=(o=h.current)==null?void 0:o.start)==null||x.call(o))}),children:[u.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function Ye({readyId:y,locked:f,onReady:C}){const v=i.useRef(null),k=i.useRef(null),h=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=i.useMemo(()=>({reduceMotion:R}),[R]);i.useEffect(()=>{const t=v.current,s=k.current;if(!t||!s)return;let e=!1,o=null,x=null,b=null;const r=()=>{P.current||(P.current=!0,C==null||C(y))},p=F(async()=>{var m,n;try{const d=await z(()=>import("./ropeLightEngine-B3dT-ds-.js"),[]);if(e)return;o=d.createRopeLightEngine(s,g),h.current=o;const l=()=>$(t,o,Math.min(1.5,window.devicePixelRatio||1));l(),(m=o.renderStatic)==null||m.call(o),(n=o.start)==null||n.call(o),r(),x=new ResizeObserver(()=>{l()}),x.observe(t),"IntersectionObserver"in window&&(b=new IntersectionObserver(w=>{var M,S;for(const N of w)N.isIntersecting?(M=o.start)==null||M.call(o):(S=o.stop)==null||S.call(o)},{threshold:.25}),b.observe(t))}catch{r()}},{timeoutMs:220});return()=>{var m;e=!0,p==null||p(),b==null||b.disconnect(),x==null||x.disconnect(),(m=o==null?void 0:o.destroy)==null||m.call(o),h.current=null}},[g,C,y]);const I=t=>{const s=v.current;if(!s)return{x:.5,y:.5};const e=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(t.clientY-e.top)/Math.max(1,e.height)))}},c=()=>{var t,s,e,o;(s=(t=h.current)==null?void 0:t.reset)==null||s.call(t),(o=(e=h.current)==null?void 0:e.start)==null||o.call(e)};return u.jsxs("button",{type:"button",ref:v,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:f,onClick:f?void 0:c,onPointerDown:f?void 0:t=>{var e,o;a.current=t.pointerId;const s=I(t);(o=(e=h.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onPointerMove:f?void 0:t=>{var e,o;if(a.current!=null&&t.pointerId!==a.current)return;const s=I(t);(o=(e=h.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onPointerUp:f?void 0:t=>{var s,e;a.current!=null&&t.pointerId!==a.current||(a.current=null,(e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s))},onPointerCancel:f?void 0:(()=>{var t,s;a.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onMouseMove:f?void 0:t=>{var e,o;const s=I(t);(o=(e=h.current)==null?void 0:e.setPointer)==null||o.call(e,s.x,s.y)},onMouseLeave:f?void 0:(()=>{var t,s;a.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onBlur:f?void 0:(()=>{var t,s;a.current=null,(s=(t=h.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:f?void 0:(t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),c())}),children:[u.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}function Xe({readyId:y,locked:f,onReady:C}){const v=i.useRef(null),k=i.useRef(null),h=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=i.useMemo(()=>({reduceMotion:R}),[R]);i.useEffect(()=>{const c=v.current,t=k.current;if(!c||!t)return;let s=!1,e=null,o=null,x=null;const b=()=>{P.current||(P.current=!0,C==null||C(y))},r=F(async()=>{var p,m;try{const n=await z(()=>import("./soupShaderEngine-DOT8TiBo.js"),__vite__mapDeps([4,1]));if(s)return;e=n.createSoupShaderEngine(t,g),h.current=e;const d=()=>$(c,e,Math.min(1.5,window.devicePixelRatio||1));d(),(p=e.renderStatic)==null||p.call(e),(m=e.start)==null||m.call(e),b(),o=new ResizeObserver(()=>{d()}),o.observe(c),"IntersectionObserver"in window&&(x=new IntersectionObserver(l=>{var w,M;for(const S of l)S.isIntersecting?(w=e.start)==null||w.call(e):(M=e.stop)==null||M.call(e)},{threshold:.25}),x.observe(c))}catch{b()}},{timeoutMs:220});return()=>{var p;s=!0,r==null||r(),x==null||x.disconnect(),o==null||o.disconnect(),(p=e==null?void 0:e.destroy)==null||p.call(e),h.current=null}},[g,C,y]);const I=c=>{const t=v.current;if(!t)return{x:.5,y:.5};const s=t.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(c.clientX-s.left)/Math.max(1,s.width))),y:Math.max(0,Math.min(1,(c.clientY-s.top)/Math.max(1,s.height)))}};return u.jsxs("button",{type:"button",ref:v,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Soup shader web art tile",disabled:f,onPointerDown:f?void 0:c=>{var s,e,o,x;a.current=c.pointerId;try{c.currentTarget.setPointerCapture(c.pointerId)}catch{}const t=I(c);(e=(s=h.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y),(x=(o=h.current)==null?void 0:o.setHeld)==null||x.call(o,!0)},onPointerMove:f?void 0:c=>{var s,e;if(a.current!=null&&c.pointerId!==a.current)return;const t=I(c);(e=(s=h.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y)},onPointerUp:f?void 0:c=>{var t,s;a.current!=null&&c.pointerId!==a.current||(a.current=null,(s=(t=h.current)==null?void 0:t.setHeld)==null||s.call(t,!1))},onPointerCancel:f?void 0:(()=>{var c,t;a.current=null,(t=(c=h.current)==null?void 0:c.setHeld)==null||t.call(c,!1)}),onMouseMove:f?void 0:c=>{var s,e;const t=I(c);(e=(s=h.current)==null?void 0:s.setPointer)==null||e.call(s,t.x,t.y)},onMouseLeave:f?void 0:(()=>{var c,t,s,e;a.current=null,(t=(c=h.current)==null?void 0:c.setHeld)==null||t.call(c,!1),(e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s)}),onBlur:f?void 0:(()=>{var c,t,s,e;a.current=null,(t=(c=h.current)==null?void 0:c.setHeld)==null||t.call(c,!1),(e=(s=h.current)==null?void 0:s.clearPointer)==null||e.call(s)}),children:[u.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),u.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function Je({readyId:y,locked:f,onReady:C}){const v=i.useRef(null),k=i.useRef(null),h=i.useRef(null),P=i.useRef(!1),a=i.useRef(null),R=i.useRef(null),g=i.useRef(0),[I,c]=i.useState(!1),[t,s]=i.useState(!1),[e,o]=i.useState([]),x=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),b=i.useMemo(()=>({reduceMotion:x}),[x]);i.useEffect(()=>{const n=v.current,d=k.current;if(!n||!d)return;let l=!1,w=null,M=null,S=null;const N=()=>{P.current||(P.current=!0,C==null||C(y))},L=F(async()=>{var _,T;try{const O=await z(()=>import("./tardisWormholeEngine-BSErFcgT.js"),__vite__mapDeps([5,1]));if(l)return;w=O.createTardisWormholeEngine(d,b),h.current=w;const H=()=>$(n,w,Math.min(1.5,window.devicePixelRatio||1));H(),(_=w.renderStatic)==null||_.call(w),(T=w.start)==null||T.call(w),N(),M=new ResizeObserver(()=>{H()}),M.observe(n),"IntersectionObserver"in window&&(S=new IntersectionObserver(W=>{var G,V;for(const X of W)X.isIntersecting?(G=w.start)==null||G.call(w):(V=w.stop)==null||V.call(w)},{threshold:.25}),S.observe(n))}catch{N()}},{timeoutMs:220});return()=>{var _;l=!0,L==null||L(),S==null||S.disconnect(),M==null||M.disconnect(),(_=w==null?void 0:w.destroy)==null||_.call(w),h.current=null}},[b,C,y]),i.useEffect(()=>{if(e.length===0)return;const n=window.setTimeout(()=>{o(d=>d.slice(1))},1e3);return()=>{window.clearTimeout(n)}},[e]),i.useEffect(()=>{var d,l,w;const n=h.current;if(n){if(f){s(!1),c(!1),R.current=null,(d=n.clearPointer)==null||d.call(n),(l=n.stop)==null||l.call(n);return}(w=n.start)==null||w.call(n)}},[f]);const r=n=>{const d=v.current;if(!d)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const l=d.getBoundingClientRect(),w=Math.max(0,Math.min(l.width,n.clientX-l.left)),M=Math.max(0,Math.min(l.height,n.clientY-l.top)),S=R.current,N=S?w-S.px:0,L=S?M-S.py:0;return R.current={px:w,py:M},d.style.setProperty("--tardis-cursor-x",`${w}px`),d.style.setProperty("--tardis-cursor-y",`${M}px`),{x:l.width>0?w/l.width:.5,y:l.height>0?M/l.height:.5,px:w,py:M,dx:N,dy:L}},p=(n,d)=>{const l=g.current++;o(w=>[...w,{id:l,x:n,y:d}])},m=n=>{var l,w,M,S;const d=r(n);p(d.px,d.py),(w=(l=h.current)==null?void 0:l.boost)==null||w.call(l),(S=(M=h.current)==null?void 0:M.start)==null||S.call(M),s(!0),window.setTimeout(()=>{s(!1)},650)};return u.jsxs("button",{type:"button",ref:v,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${I?"article-web-art-tile-tardis-active":""} ${t?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:f,onClick:f?void 0:m,onContextMenu:f?void 0:(n=>{var l,w,M,S;n.preventDefault();const d=r(n);p(d.px,d.py),(w=(l=h.current)==null?void 0:l.reverseBurst)==null||w.call(l),(S=(M=h.current)==null?void 0:M.start)==null||S.call(M)}),onWheel:f?void 0:(n=>{var d,l;(l=(d=h.current)==null?void 0:d.addScrollBoost)==null||l.call(d,n.deltaY*.003)}),onPointerDown:f?void 0:n=>{var l,w;a.current=n.pointerId;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}const d=r(n);(w=(l=h.current)==null?void 0:l.setPointer)==null||w.call(l,d.x,d.y,d.dx,d.dy)},onPointerMove:f?void 0:n=>{var l,w,M,S;if(a.current!=null&&n.pointerId!==a.current)return;const d=r(n);(w=(l=h.current)==null?void 0:l.setPointer)==null||w.call(l,d.x,d.y,d.dx,d.dy),(n.buttons&1)===1&&((S=(M=h.current)==null?void 0:M.drag)==null||S.call(M,d.dx))},onPointerUp:f?void 0:n=>{a.current!=null&&n.pointerId!==a.current||(a.current=null)},onPointerCancel:f?void 0:(()=>{a.current=null}),onMouseEnter:f?void 0:(()=>{c(!0)}),onMouseMove:f?void 0:n=>{var l,w;const d=r(n);(w=(l=h.current)==null?void 0:l.setPointer)==null||w.call(l,d.x,d.y,d.dx,d.dy)},onMouseLeave:f?void 0:(()=>{var n,d;a.current=null,R.current=null,c(!1),(d=(n=h.current)==null?void 0:n.clearPointer)==null||d.call(n)}),onBlur:f?void 0:(()=>{var n,d;a.current=null,R.current=null,c(!1),(d=(n=h.current)==null?void 0:n.clearPointer)==null||d.call(n)}),onKeyDown:f?void 0:(n=>{var d,l,w,M;(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),(l=(d=h.current)==null?void 0:d.boost)==null||l.call(d),(M=(w=h.current)==null?void 0:w.start)==null||M.call(w))}),children:[u.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),u.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-cursor","aria-hidden":!0}),u.jsx("div",{className:"article-web-art-tardis-cursor-dot","aria-hidden":!0}),u.jsxs("div",{className:"article-web-art-tardis-hud","aria-hidden":!0,children:[u.jsx("div",{className:"article-web-art-tardis-hud-label",children:"Traversing Singularity"}),u.jsx("div",{className:"article-web-art-tardis-hud-bar"})]}),e.map(n=>u.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${n.x}px`,top:`${n.y}px`},"aria-hidden":!0},n.id)),u.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function Ze({label:y,clickLabel:f,previewRequested:C=!1}){const v=de(),k=i.useRef(null),[h,P]=i.useState(!1),[a,R]=i.useState(0),g=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),I=i.useCallback(()=>{R(Date.now()),P(!0)},[]),c=i.useCallback(()=>{v.navigateToSectionWithId("contact")},[v]),t=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),I())},s=i.useMemo(()=>h?Le({seed:`${a||Date.now()}:${y}`,reduceMotion:g}):"",[y,h,a,g]);return i.useEffect(()=>{if(C){R(Date.now()),P(!0);return}P(!1)},[C]),u.jsxs("div",{ref:k,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${h?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":h?"Kontakt preview":y,"aria-pressed":h,onClick:I,onKeyDown:t,children:[u.jsxs("div",{className:`article-web-art-tile-cta-preview ${h?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[h&&u.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:s,sandbox:"allow-scripts"},`${a}-${y}`),u.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!h&&u.jsx("div",{className:`loader ${g?"loader-reduce-motion":""}`,"aria-hidden":!0,children:u.jsxs("div",{className:"loader-inner",children:[u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})}),u.jsx("div",{className:"loader-line-wrap",children:u.jsx("div",{className:"loader-line"})})]})}),u.jsxs("div",{className:`article-web-art-tile-cta-content ${h?"article-web-art-tile-cta-content-hidden":""}`,children:[u.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:y}),u.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:f})]}),h&&u.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),c()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),c())},children:"Kontakt"})]})}function Qe({locked:y=!1}){const f=i.useRef(null),C=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=i.useRef(!1),k=i.useRef(0),h=i.useRef(null),P=i.useRef(null),a=i.useRef(1),R=i.useRef(null);return i.useEffect(()=>{const g=f.current;if(!g)return;const I=p=>{const m=Math.max(0,Math.min(1,p));return m*m*(3-2*m)},c=()=>{const p=g.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),m=[];for(const n of p){const d=n.getAnimations?n.getAnimations():[];for(const l of d)m.push(l)}return m},t=p=>{const m=Math.max(1,Math.min(5.2,Number(p)||1));a.current=m;const n=c();for(const d of n)d.playbackRate=m},s=()=>{v.current=!1,h.current=null,g.classList.remove("article-web-art-tile-goldfish-held"),P.current!=null&&cancelAnimationFrame(P.current),P.current=null;const p=a.current,m=360,n=performance.now();R.current!=null&&cancelAnimationFrame(R.current);const d=()=>{const l=(performance.now()-n)/m,w=I(l);t(p+(1-p)*w),l<1?R.current=requestAnimationFrame(d):R.current=null};R.current=requestAnimationFrame(d)},e=()=>{if(!v.current)return;const p=performance.now()-k.current,m=1.2+4*I(p/2400);t(m),P.current=requestAnimationFrame(e)},o=p=>{if(!C&&!(p.button!=null&&p.button!==0)){v.current=!0,k.current=performance.now(),h.current=p.pointerId,g.classList.add("article-web-art-tile-goldfish-held");try{g.setPointerCapture(p.pointerId)}catch{}R.current!=null&&(cancelAnimationFrame(R.current),R.current=null),P.current==null&&(P.current=requestAnimationFrame(e))}},x=()=>{s()},b=()=>{s()},r=()=>{s()};return g.addEventListener("pointerdown",o),g.addEventListener("pointerup",x),g.addEventListener("pointercancel",b),g.addEventListener("lostpointercapture",r),()=>{g.removeEventListener("pointerdown",o),g.removeEventListener("pointerup",x),g.removeEventListener("pointercancel",b),g.removeEventListener("lostpointercapture",r),s(),R.current!=null&&cancelAnimationFrame(R.current),R.current=null}},[C]),i.useEffect(()=>{const g=f.current;g&&g.classList.toggle("article-web-art-tile-goldfish-locked",y)},[y]),u.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:f,role:"img","aria-label":"Goldfish animation tile",children:[u.jsx("div",{className:"fish-stage",children:u.jsx("div",{className:"fish-wrapper",children:u.jsx("div",{className:"fish-container",children:u.jsxs("div",{className:"fish-parts",children:[u.jsx("div",{className:"fish-body front"}),u.jsx("div",{className:"fish-body back"}),u.jsx("div",{className:"fish-back-bottom-fin front"}),u.jsx("div",{className:"fish-back-bottom-fin back"}),u.jsx("div",{className:"fish-back-fin"}),u.jsx("div",{className:"fish-front-bottom-fin front"}),u.jsx("div",{className:"fish-front-bottom-fin back"}),u.jsx("div",{className:"fish-top-fin"})]})})})}),u.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function We({locked:y=!1}){const f=i.useRef(null),C=i.useRef([]),v=i.useRef(0),k=i.useRef(0),h=Ee,P=i.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return i.useEffect(()=>{const a=f.current;if(!a)return;const R=C.current.filter(Boolean);if(!R.length)return;let g=!0,I=!1,c=null,t=null;const s=(l,w)=>{const M=(l-.5)*30;for(let S=0;S<R.length;S++){const N=R[S],L=S*18,_=S*8,T=(l-.5)*L,O=(w-.5)*_;N.style.transform=`translate3d(${T}px, ${O}px, 0) rotateY(${M}deg)`}},e=(l,w)=>{const M=Math.max(-.55,Math.min(.55,(l-.5)*1.1)),S=Math.max(-.35,Math.min(.35,(w-.5)*.7));s(.5+M,.5+S)},o=l=>{const w=a.getBoundingClientRect(),M=(l.clientX-w.left)/Math.max(1,w.width),S=(l.clientY-w.top)/Math.max(1,w.height);g=!0,k.current=performance.now()+650,e(Math.max(0,Math.min(1,M)),Math.max(0,Math.min(1,S)))},x=l=>{const w=a.getBoundingClientRect(),M=(l.clientX-w.left)/Math.max(1,w.width),S=(l.clientY-w.top)/Math.max(1,w.height);return{x:Math.max(0,Math.min(1,M)),y:Math.max(0,Math.min(1,S))}},b=l=>{if(l.pointerType==="mouse")return;I=!0,c=l.pointerId,g=!0,k.current=performance.now()+900;const w=x(l);e(w.x,w.y),!P&&t==null&&(t=requestAnimationFrame(d))},r=l=>{if(!I||c!=null&&l.pointerId!==c)return;g=!0,k.current=performance.now()+900;const w=x(l);e(w.x,w.y)},p=l=>{c!=null&&(l==null?void 0:l.pointerId)!=null&&l.pointerId!==c||(I=!1,c=null,g=!0,!P&&t==null&&(t=requestAnimationFrame(d)))},m=()=>{g=!0,!P&&t==null&&(t=requestAnimationFrame(d))},n=()=>{g=!0,!P&&t==null&&(t=requestAnimationFrame(d))},d=()=>{if(g){if(!P&&performance.now()>=k.current){v.current+=.008;const l=Math.sin(v.current)*.5+.5;e(l,.5)}t=requestAnimationFrame(d)}};return g=!y,a.addEventListener("mouseenter",m),a.addEventListener("mousemove",o),a.addEventListener("mouseleave",n),a.addEventListener("pointerdown",b),a.addEventListener("pointermove",r),a.addEventListener("pointerup",p),a.addEventListener("pointercancel",p),e(.5,.5),!P&&!y&&(t=requestAnimationFrame(d)),()=>{a.removeEventListener("mouseenter",m),a.removeEventListener("mousemove",o),a.removeEventListener("mouseleave",n),a.removeEventListener("pointerdown",b),a.removeEventListener("pointermove",r),a.removeEventListener("pointerup",p),a.removeEventListener("pointercancel",p),t!=null&&cancelAnimationFrame(t)}},[P]),u.jsxs("div",{ref:f,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[u.jsxs("div",{className:"patronus-card",children:[u.jsx("div",{className:"patronus-layer patronus-bg",ref:a=>{C.current[0]=a},children:u.jsx("img",{alt:"",src:h[0]})}),u.jsx("div",{className:"patronus-layer",ref:a=>{C.current[1]=a},children:u.jsx("img",{alt:"",src:h[1]})}),u.jsx("div",{className:"patronus-layer",ref:a=>{C.current[2]=a},children:u.jsx("img",{alt:"",src:h[2]})}),u.jsx("div",{className:"patronus-layer patronus-svg",ref:a=>{C.current[3]=a},dangerouslySetInnerHTML:{__html:ge}}),u.jsx("div",{className:"patronus-layer",ref:a=>{C.current[4]=a},children:u.jsx("img",{alt:"",src:h[3]})}),u.jsx("div",{className:"patronus-layer",ref:a=>{C.current[5]=a},children:u.jsx("img",{alt:"",src:h[4]})}),u.jsx("div",{className:"patronus-layer",ref:a=>{C.current[6]=a},children:u.jsx("img",{alt:"",src:h[5]})})]}),u.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{ot as default};
