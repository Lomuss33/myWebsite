const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/androidBackgroundEngine-HmTe5YFf.js","assets/three-Dyw0HQ4s.js","assets/hourglassEngine-Dqm3jFyu.js","assets/physics-DDoeCzdI.js","assets/react-vendor-DdDVJuhO.js","assets/threeTunnelEngine-BYxOaRL9.js","assets/threePolygonDemo5Engine-J7VS_NUu.js","assets/prismFieldEngine-BQpxImA_.js","assets/soupShaderEngine-BVaccG7j.js","assets/tardisWormholeEngine-Czkyopnk.js"])))=>i.map(i=>d[i]);
import{d as Je,i as He,A as Se,_ as z}from"./index-BRJUUACc.js";import{r as a,j as p}from"./react-vendor-DdDVJuhO.js";/* empty css              */import"./bootstrap-BTe74g_4.js";import"./vendor-C2MEJuly.js";const Qe=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`,We=`function Mash(seed) {
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
`;function F(m,{timeoutMs:b=1200}={}){if(typeof window>"u")return m(),()=>{};if("requestIdleCallback"in window){const d=window.requestIdleCallback(()=>m(),{timeout:b});return()=>window.cancelIdleCallback(d)}const y=window.setTimeout(()=>m(),0);return()=>window.clearTimeout(y)}function Ne(m){var l,C,R,P;if(!m)return{width:1,height:1};const b=m.getBoundingClientRect(),y=(C=(l=m.parentElement)==null?void 0:l.getBoundingClientRect)==null?void 0:C.call(l),d=(y==null?void 0:y.width)||((R=m.parentElement)==null?void 0:R.clientWidth)||1,g=(y==null?void 0:y.height)||((P=m.parentElement)==null?void 0:P.clientHeight)||d,w=Math.max(1,Math.round(b.width||m.clientWidth||d)),k=Math.max(1,Math.round(b.height||m.clientHeight||g));return{width:w,height:k}}function $(m,b,y=1){var l,C,R;const{width:d,height:g}=Ne(m),w=typeof window<"u"&&((C=(l=window.matchMedia)==null?void 0:l.call(window,"(pointer: coarse)"))==null?void 0:C.matches),k=Math.min(w?1:1.5,Math.max(1,Number(y)||1));if((d<32||g<32)&&typeof window<"u"){window.requestAnimationFrame(()=>{var v;const P=Ne(m);P.width>=32&&P.height>=32&&((v=b==null?void 0:b.setSize)==null||v.call(b,P.width,P.height,k))});return}(R=b==null?void 0:b.setSize)==null||R.call(b,d,g,k)}const Ee=248,et=460,G={PREVIEW:"preview",EXPANDING:"expanding",OPEN:"open",COLLAPSING:"collapsing"};function je(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function me(m){if(!m)return Ee;const b=window.getComputedStyle(m).getPropertyValue("--article-web-art-stage-preview-height"),y=Number.parseFloat(b);return Number.isFinite(y)&&y>0?Math.ceil(y):Ee}const tt=9,rt=9,nt=10,it=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],Be=6,st=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function ye(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(pointer: coarse), (max-width: 767px)").matches}function _e(m){const b=new Set(m);if(!ye())return b;for(;b.size>Be;)b.delete(b.values().next().value);return b}function ve(m){if(!ye())return new Set(m);const b=new Set;for(const y of m){if(b.size>=Be)break;b.add(y)}return b}function Le(m,b){if(b.size===0)return!1;for(const y of b)if(!m.has(y))return!1;return!0}function ot(m=tt,b=rt,y=nt){const d=m*b,g=Math.max(1,Math.min(y,d-1)),w=new Set;for(;w.size<g;)w.add(Math.floor(Math.random()*d));const k=new Array(d).fill(0);for(let l=0;l<d;l++){if(w.has(l)){k[l]=-1;continue}const C=l%b,R=Math.floor(l/b);let P=0;for(let v=-1;v<=1;v++)for(let f=-1;f<=1;f++){if(f===0&&v===0)continue;const o=C+f,e=R+v;o<0||e<0||o>=b||e>=m||w.has(e*b+o)&&(P+=1)}k[l]=P}return{rows:m,cols:b,mineCount:g,mines:w,counts:k}}function at(m,b,y,d){const g=new Set(y),w=[m];for(;w.length>0;){const k=w.pop();if(k==null||g.has(k)||d.has(k)||b.mines.has(k)||(g.add(k),b.counts[k]!==0))continue;const l=k%b.cols,C=Math.floor(k/b.cols);for(let R=-1;R<=1;R++)for(let P=-1;P<=1;P++){if(P===0&&R===0)continue;const v=l+P,f=C+R;v<0||f<0||v>=b.cols||f>=b.rows||w.push(f*b.cols+v)}}return g}function Te(m,b,y){const d=m.rows*m.cols-m.mineCount;if(b.size>=d)return!0;if(y.size!==m.mineCount)return!1;for(const g of m.mines)if(!y.has(g))return!1;return!0}function ct(m){return`Web art ${String(m||"tile").toLowerCase()} tile loading`}function lt({seed:m,reduceMotion:b}){const y=JSON.stringify(We.split("<\/script>").join("<\\/script>")),d=JSON.stringify(m);return`<!doctype html>
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
    reduceMotion: ${b?"true":"false"},
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
</html>`}function Ae(m){return Array.isArray(m)?m.map((b,y)=>{const d=b!=null&&b.tone?` article-web-art-intro-guide-fragment-${b.tone}`:"";return p.jsx("span",{className:`article-web-art-intro-guide-fragment${d}`,children:b==null?void 0:b.text},`${(b==null?void 0:b.text)||"fragment"}-${y}`)}):m}function Yt({dataWrapper:m,id:b}){var ke;const y=Je(),d=He(),g=`${m.uniqueId}-ambient-trace`,w=`${m.uniqueId}-ambient-hex`,k=`${m.uniqueId}-ambient-plop`,l=`${m.uniqueId}-ambient-julia`,C=`${m.uniqueId}-ambient-mines`,R=`${m.uniqueId}-ambient-rings`,P=`${m.uniqueId}-ambient-prism`,v=`${m.uniqueId}-ambient-rope`,f=`${m.uniqueId}-ambient-soup`,o=`${m.uniqueId}-ambient-tardis`,[e,r]=a.useState(null),[t,s]=a.useState(!0),n=a.useMemo(()=>m.orderedItems,[m.orderedItems]),i=a.useMemo(()=>{const I=[4,5,3,6,1,2,7,8,9,10,11,12,13,14,15],A=new Map(n.map(H=>[Number(H==null?void 0:H.id),H])),D=[];for(const H of I){const V=A.get(H);V&&D.push(V)}for(const H of n){if(!H)continue;const V=Number(H==null?void 0:H.id);I.includes(V)||D.push(H)}return D},[n]),c=a.useRef(null),u=a.useRef(null),h=a.useRef(G.PREVIEW),x=a.useRef([]),M=a.useRef(null),N=a.useRef(new Set),E=a.useRef(null),[S,j]=a.useState(G.PREVIEW),[_,L]=a.useState(null),[T,O]=a.useState(!1),B=a.useRef(new Set),q=a.useRef(new Map),[J,Q]=a.useState(0),[ee,ie]=a.useState(-1),[Z,te]=a.useState(()=>new Set),[oe,re]=a.useState(()=>new Set),[ze,ae]=a.useState(!1),se=a.useMemo(()=>{const I=i.map(A=>A==null?void 0:A.uniqueId).filter(Boolean);return I.push(g,w,k,l,C,P,R,v,f,o,"ambient-goldfish","ambient-patronus"),new Set(I)},[w,l,C,k,P,R,v,f,o,g,i]),Re=a.useMemo(()=>Array.from(oe).filter(I=>I!=="ambient-goldfish"&&I!=="ambient-patronus"),[oe]),K=t,we=y.selectedLanguageId||"en";a.useEffect(()=>{N.current=Z},[Z]);const U=a.useCallback(I=>{h.current=I,j(I)},[]),X=a.useCallback(()=>{if(!(typeof window>"u")){for(const I of x.current)window.cancelAnimationFrame(I);x.current=[],M.current!==null&&(window.clearTimeout(M.current),M.current=null)}},[]);let ce=y.getString("send_yours");typeof ce=="string"&&ce.startsWith("locale:")&&(ce={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[we]||"Send yours!");let le=y.getString("click");typeof le=="string"&&le.startsWith("locale:")&&(le={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[we]||"Click");const Me={en:{title:"Doors of the world behind an amazing art gallery.",guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",guide:{eyebrow:"So funktioniert es",lines:["Betritt die Galerie und schau dir die Karten in Ruhe an.","Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.","Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."]},button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",guide:{eyebrow:"Kako istraživati",lines:["Uđi u galeriju i istražuj kartice svojim tempom.","Klikni, dodirni ili pritisni karticu da otkriješ što skriva.","Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme."]},button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",guide:{eyebrow:"Nasıl gezilir",lines:["Galeriye girin ve kartları kendi temponuzda inceleyin.","İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.","Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir."]},button:"Gir",preparing:"Hazırlanıyor..."}}[we]||{guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter"},$e="hide",Y=a.useCallback(I=>{if(!I||B.current.has(I))return;B.current.add(I);const A=q.current.get(I);A!=null&&(window.clearTimeout(A),q.current.delete(I)),Q(B.current.size)},[]),ge=a.useCallback(I=>{I&&re(A=>{if(A.has(I))return A;const D=new Set(A);return D.add(I),_e(D)})},[]),ue=a.useCallback(()=>{te(I=>I.size?new Set:I),re(I=>I.size?new Set:I),ae(!1)},[]),ne=a.useCallback(()=>{for(const I of q.current.values())window.clearTimeout(I);q.current=new Map,B.current=new Set,Q(0),ie(-1),O(!1),te(new Set),re(new Set),ae(!1)},[]),de=a.useCallback(()=>{X(),L(null),U(G.OPEN)},[X,U]),fe=a.useCallback(()=>{X(),ne(),L(null),U(G.PREVIEW)},[X,ne,U]),he=a.useCallback(I=>{typeof window>"u"||(M.current!==null&&window.clearTimeout(M.current),M.current=window.setTimeout(()=>{M.current=null,h.current===I&&(I===G.EXPANDING?de():I===G.COLLAPSING&&fe())},et))},[fe,de]),be=a.useCallback(()=>{const I=ve(se);re(I),te(new Set(I)),ae(!ye())},[se]),xe=a.useCallback(({openAll:I=!1}={})=>{X();const A=je(),D=u.current,H=me(D);if(A?(L(null),U(G.OPEN)):(L(Math.max(H,Math.ceil((D==null?void 0:D.offsetHeight)||H))),U(G.EXPANDING)),s(!1),O(!0),ie(i.length-1),I?be():(te(new Set),re(new Set),ae(!1)),A||typeof window>"u")return;const V=window.requestAnimationFrame(()=>{const pe=window.requestAnimationFrame(()=>{const W=u.current,Ie=me(W),Ze=Math.max(Ie,Math.ceil((W==null?void 0:W.scrollHeight)||(W==null?void 0:W.offsetHeight)||Ie));L(Ze),he(G.EXPANDING)});x.current.push(pe)});x.current.push(V)},[X,i.length,be,he,U]);a.useEffect(()=>{var A;if(typeof window>"u"||((A=d.targetSection)==null?void 0:A.id)!==m.sectionId||d.transitionStatus!=="transition_status_none")return;const I=window.__pendingSectionAction;if(I&&I.action==="enter"&&I.sectionId===m.sectionId&&!(I.targetArticleId&&I.targetArticleId!==m.uniqueId)){if(Date.now()-(I.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,xe({openAll:!0})}},[m.uniqueId,m.sectionId,(ke=d.targetSection)==null?void 0:ke.id,d.transitionStatus,xe]);const Ce=a.useCallback(I=>{I&&(ge(I),te(A=>{if(A.has(I))return A;const D=new Set(A);return D.add(I),_e(D)}))},[ge]),Pe=a.useCallback(I=>{I&&(te(A=>{if(!A.has(I))return A;const D=new Set(A);return D.delete(I),D}),re(A=>{if(!A.has(I))return A;const D=new Set(A);return D.delete(I),D}))},[]),Fe=ve(se),qe=Le(Z,Fe),Ve=a.useCallback(()=>{const I=ve(se);if(Le(Z,I)){ue();return}be()},[se,ue,be,Z]);a.useEffect(()=>{if(typeof window>"u"||!window.matchMedia||t||!Z.size||!window.matchMedia("(hover: hover) and (pointer: fine)").matches)return;const I=()=>{E.current!=null&&(window.clearTimeout(E.current),E.current=null)},A=()=>{I(),E.current=window.setTimeout(()=>{E.current=null,N.current.size&&ue()},180)},D=()=>A(),H=()=>I(),V=()=>{document.hidden?A():I()};return window.addEventListener("blur",D),window.addEventListener("focus",H),document.addEventListener("visibilitychange",V),()=>{I(),window.removeEventListener("blur",D),window.removeEventListener("focus",H),document.removeEventListener("visibilitychange",V)}},[t,Z,ue]);const Ge=a.useCallback(()=>{if(X(),s(!0),je()){ne(),L(null),U(G.PREVIEW);return}const I=u.current,A=me(I),D=Math.max(A,Math.ceil((I==null?void 0:I.offsetHeight)||(I==null?void 0:I.scrollHeight)||A));if(L(D),U(G.COLLAPSING),typeof window>"u")return;const H=window.requestAnimationFrame(()=>{const V=me(u.current);L(V),he(G.COLLAPSING)});x.current.push(H)},[X,ne,he,U]),Ke=a.useCallback(I=>{I.target!==I.currentTarget||I.propertyName!=="height"||(h.current===G.EXPANDING?de():h.current===G.COLLAPSING&&fe())},[fe,de]),Ye=(I,A)=>{const D=Number(I==null?void 0:I.id);return D===1?"Hover":D===2?"Wave":D===3?"3D":D===4?"Poly":D===5?"Click":D===6?"Orbit":D===7?"Spin":D===8?"Shape":D===9?"Hourglass":D===10?"Noice":D===11?"Distance":D===12?"Android":D===13?"Pulse":D===14?"Bars":D===15?"Deep":String(A+1)},Ue=i.map((I,A)=>{if(!T)return p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${A+1} loading`},I.uniqueId);const D=I.uniqueId,H=Z.has(D),V=oe.has(D)||H;return p.jsx(De,{label:Ye(I,A),isOpen:H,onToggle:()=>{H?Pe(D):Ce(D)},shouldRender:V,children:V&&p.jsx(dt,{itemWrapper:I,index:A,locked:K||!H,activate:A<=ee,onReady:Y})},D)}),Xe=T?[{key:"ambient-trace",tileId:g,label:"Trace",render:I=>p.jsx(It,{readyId:g,locked:K||!I,onReady:Y})},{key:"ambient-hex",tileId:w,label:"Hex",render:I=>p.jsx(St,{readyId:w,locked:K||!I,onReady:Y})},{key:"ambient-plop",tileId:k,label:"Plop",render:I=>p.jsx(Nt,{readyId:k,locked:K||!I,onReady:Y})},{key:"ambient-julia",tileId:l,label:"Julia",render:I=>p.jsx(Et,{readyId:l,locked:K||!I,onReady:Y})},{key:"ambient-mines",tileId:C,label:"Bomb",render:I=>p.jsx(jt,{readyId:C,locked:K||!I,onReady:Y})},{key:"ambient-rings",tileId:R,label:"Fall",render:I=>p.jsx(_t,{readyId:R,locked:K||!I,onReady:Y})},{key:"ambient-prism",tileId:P,label:"Prism",render:I=>p.jsx(Lt,{readyId:P,locked:K||!I,onReady:Y})},{key:"ambient-rope",tileId:v,label:"Rope",render:I=>p.jsx(Tt,{readyId:v,locked:K||!I,onReady:Y})},{key:"ambient-soup",tileId:f,label:"Soup",render:I=>p.jsx(Ot,{readyId:f,locked:K||!I,onReady:Y})},{key:"ambient-tardis",tileId:o,label:"Tardis",render:I=>p.jsx(Ht,{readyId:o,locked:K||!I,onReady:Y})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:I=>p.jsx(zt,{readyId:"ambient-goldfish",locked:K||!I,onReady:Y})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:I=>p.jsx($t,{locked:K||!I})}].map(({key:I,tileId:A,label:D,render:H})=>{const V=Z.has(A),pe=oe.has(A)||V;return p.jsx(De,{label:D,isOpen:V,onToggle:()=>{V?Pe(A):Ce(A)},shouldRender:pe,children:pe&&H(V)},I)}):[p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return a.useEffect(()=>{X(),L(null),U(G.PREVIEW),s(!0),ne()},[X,m.uniqueId,ne,U]),a.useEffect(()=>()=>{X()},[X]),a.useEffect(()=>{T&&ie(i.length-1)},[T,i.length]),a.useEffect(()=>{if(T)for(const I of Re){if(!I||B.current.has(I)||q.current.has(I))continue;const A=window.setTimeout(()=>{Y(I)},12e3);q.current.set(I,A)}},[T,Re,Y]),p.jsx(Se,{id:m.uniqueId,type:Se.Types.SPACING_DEFAULT,dataWrapper:m,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:r,children:p.jsxs("div",{className:"article-web-art-shell",children:[p.jsx(ut,{guide:Me.guide,buttonLabel:t?Me.button:$e,hidden:!t,onEnter:t?xe:Ge,secondaryButtonLabel:t?null:"promaja",onSecondaryAction:t?null:Ve,secondaryPressed:qe}),p.jsx("div",{ref:u,className:["article-web-art-stage",t?"article-web-art-stage-preview":"",_!==null?"article-web-art-stage-measured":"",`article-web-art-stage-${S}`].filter(Boolean).join(" "),style:_!==null?{"--article-web-art-stage-height":`${_}px`}:void 0,onTransitionEnd:Ke,"aria-hidden":t,children:p.jsxs("div",{className:`article-web-art-items ${K?"article-web-art-items-locked":""}`,ref:c,"aria-busy":t,children:[Ue,Xe,T&&p.jsx(Bt,{label:ce,clickLabel:le,previewRequested:ze})]})})]})})}function ut({guide:m,buttonLabel:b,hidden:y,onEnter:d,secondaryButtonLabel:g=null,onSecondaryAction:w=null,secondaryPressed:k=!1}){const l=C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),d())};return p.jsx("div",{className:`article-web-art-intro-cover ${y?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:p.jsx("div",{className:"article-web-art-intro-cover-inner",children:p.jsx("div",{className:"article-web-art-intro-cover-actions",children:p.jsx("div",{className:`article-web-art-intro-guide ${y?"article-web-art-intro-guide-hidden":"article-web-art-intro-guide-open"}`,children:p.jsxs("div",{className:"article-web-art-intro-guide-inner",children:[p.jsxs("div",{className:"article-web-art-intro-guide-top-row",children:[p.jsxs("div",{className:"article-web-art-intro-guide-top-copy",children:[p.jsx("span",{className:"article-web-art-intro-guide-eyebrow",children:m.eyebrow}),p.jsx("p",{className:"article-web-art-intro-guide-line article-web-art-intro-guide-line-primary",children:Ae(m.lines[0])})]}),p.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[g?p.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${k?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:w||void 0,"aria-pressed":k,"aria-label":g,children:g}):null,p.jsx("button",{type:"button",className:"article-web-art-intro-cover-button article-web-art-intro-cover-button-primary",onClick:d,onKeyDown:l,"aria-label":b,children:b})]})]}),p.jsx("div",{className:"article-web-art-intro-guide-lines",children:m.lines.slice(1).map((C,R)=>p.jsx("p",{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${R+2}`,children:Ae(C)},Array.isArray(C)?C.map(P=>P==null?void 0:P.text).join(""):C))})]})})})})})}function De({label:m,isOpen:b,onToggle:y,shouldRender:d=!0,children:g}){const w=a.useCallback(k=>{var l,C;b||k.defaultPrevented||(C=(l=k.target).closest)!=null&&C.call(l,"button")||y==null||y()},[b,y]);return p.jsxs("div",{className:`article-web-art-gated-tile ${b?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,onClick:b?void 0:w,children:[d?g:p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":ct(m)}),p.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),p.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${b?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:y,"aria-label":`${b?"Hide":"Show"} ${m}`,children:m})]})}function dt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){return Number(m.id)===1?p.jsx(Mt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===2?p.jsx(gt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===3?p.jsx(Ct,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===4?p.jsx(Pt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===6?p.jsx(kt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===7?p.jsx(bt,{itemWrapper:m,locked:d,onReady:g}):Number(m.id)===8?p.jsx(mt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===9?p.jsx(wt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===10?p.jsx(xt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===11?p.jsx(ft,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===12?p.jsx(ht,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===13?p.jsx(Rt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===14?p.jsx(pt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):Number(m.id)===15?p.jsx(vt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g}):p.jsx(yt,{itemWrapper:m,index:b,activate:y,locked:d,onReady:g})}function ft({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),R=a.useRef(!0),P=a.useRef(null),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=a.useMemo(()=>({seed:54013+(Number(m.id)||11)*7331,reduceMotion:v}),[m.id,v]);a.useEffect(()=>{if(!y)return;const e=w.current,r=k.current;if(!e||!r)return;let t=!1,s=null,n=null,i=null;const c=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},u=F(async()=>{var h,x;try{const M=await z(()=>import("./distanceFieldEngine-DHTRwy4W.js"),[]);if(t)return;s=M.createDistanceFieldEngine(r,f),l.current=s;const N=()=>$(e,s,Math.min(1.5,window.devicePixelRatio||1));N(),(h=s.renderStatic)==null||h.call(s),d||(x=s.start)==null||x.call(s),c(),n=new ResizeObserver(()=>{N()}),n.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(E=>{var S,j,_,L;for(const T of E){if(R.current=!!T.isIntersecting,d){(S=s.setHoverActive)==null||S.call(s,!1),(j=s.stop)==null||j.call(s);continue}R.current?(_=s.start)==null||_.call(s):(L=s.stop)==null||L.call(s)}},{threshold:.25}),i.observe(e))}catch{c()}},{timeoutMs:220});return()=>{var h;t=!0,u==null||u(),i==null||i.disconnect(),n==null||n.disconnect(),(h=s==null?void 0:s.destroy)==null||h.call(s),l.current=null}},[y,f,m.uniqueId,d,g]),a.useEffect(()=>{var r,t,s,n;const e=l.current;if(e){if(d){(r=e.setHoverActive)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(s=e.stop)==null||s.call(e);return}R.current&&((n=e.start)==null||n.call(e))}},[d]);const o=e=>{const r=w.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${b+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,r,t,s;(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(s=(t=l.current)==null?void 0:t.start)==null||s.call(t)}),onPointerMove:d?void 0:(e=>{var t,s,n,i;const r=o(e);(s=(t=l.current)==null?void 0:t.setHoverActive)==null||s.call(t,!0),(i=(n=l.current)==null?void 0:n.setPointer)==null||i.call(n,r.x,r.y)}),onPointerLeave:d?void 0:(()=>{var e,r,t,s;P.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(s=(t=l.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onPointerDown:d?void 0:(e=>{var t,s,n,i,c,u;if(e.button!=null&&e.button!==0)return;P.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const r=o(e);(s=(t=l.current)==null?void 0:t.setHoverActive)==null||s.call(t,!0),(i=(n=l.current)==null?void 0:n.setPointer)==null||i.call(n,r.x,r.y),(u=(c=l.current)==null?void 0:c.boostPopulation)==null||u.call(c)}),onPointerUp:d?void 0:(e=>{P.current!=null&&e.pointerId!==P.current||(P.current=null)}),onPointerCancel:d?void 0:(()=>{var e,r,t,s;P.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(s=(t=l.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onFocus:d?void 0:(()=>{var e,r,t,s;(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(s=(t=l.current)==null?void 0:t.start)==null||s.call(t)}),onBlur:d?void 0:(()=>{var e,r,t,s;P.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(s=(t=l.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:d?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=l.current)==null?void 0:r.boostPopulation)==null||t.call(r))}),children:[p.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function ht({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(null),R=a.useRef(null),P=a.useRef(!1),v=a.useRef(!0),f=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);a.useEffect(()=>{if(!y)return;const e=w.current,r=k.current,t=l.current;if(!e||!r||!t)return;let s=!1,n=null,i=null,c=null,u=null;const h=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},x=F(async()=>{var M,N,E,S;try{const j=await z(()=>import("./androidBackgroundEngine-HmTe5YFf.js"),__vite__mapDeps([0,1])),_=await z(()=>import("./androidRobotEngine-CNxYykCI.js"),[]);if(s)return;n=j.createAndroidBackgroundEngine(r,{reduceMotion:f}),C.current=n,i=_.createAndroidRobotEngine(t,{reduceMotion:f}),R.current=i;const L=()=>{const T=Math.min(1.5,window.devicePixelRatio||1);$(e,n,T),$(e,i,T)};L(),(M=n.renderStatic)==null||M.call(n),(N=i.renderStatic)==null||N.call(i),d||(E=n.start)==null||E.call(n),d||(S=i.start)==null||S.call(i),h(),c=new ResizeObserver(()=>{L()}),c.observe(e),"IntersectionObserver"in window&&(u=new IntersectionObserver(T=>{var O,B,q,J,Q,ee;for(const ie of T){if(v.current=!!ie.isIntersecting,d){(O=n.stop)==null||O.call(n),(B=i.stop)==null||B.call(i);continue}v.current?((q=n.start)==null||q.call(n),(J=i.start)==null||J.call(i)):((Q=n.stop)==null||Q.call(n),(ee=i.stop)==null||ee.call(i))}},{threshold:.2}),u.observe(e))}catch{h()}},{timeoutMs:220});return()=>{var M,N;s=!0,x==null||x(),u==null||u.disconnect(),c==null||c.disconnect(),(M=n==null?void 0:n.destroy)==null||M.call(n),(N=i==null?void 0:i.destroy)==null||N.call(i),C.current=null,R.current=null}},[y,m.uniqueId,d,g,f]),a.useEffect(()=>{var t,s,n,i,c;const e=R.current,r=C.current;if(!(!e||!r)){if(d){(t=e.clearPointer)==null||t.call(e),(s=r.stop)==null||s.call(r),(n=e.stop)==null||n.call(e);return}v.current&&((i=r.start)==null||i.call(r),(c=e.start)==null||c.call(e))}},[d]);const o=e=>{const r=w.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android","aria-label":`Android web art tile ${b+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,r;(r=(e=R.current)==null?void 0:e.start)==null||r.call(e)}),onPointerMove:d?void 0:(e=>{var t,s;const r=o(e);(s=(t=R.current)==null?void 0:t.setPointer)==null||s.call(t,r.x,r.y)}),onPointerLeave:d?void 0:(()=>{var e,r;(r=(e=R.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onFocus:d?void 0:(()=>{var e,r;(r=(e=R.current)==null?void 0:e.start)==null||r.call(e)}),onBlur:d?void 0:(()=>{var e,r;(r=(e=R.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onClick:d?void 0:(()=>{var e,r;(r=(e=R.current)==null?void 0:e.poke)==null||r.call(e)}),onKeyDown:d?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=R.current)==null?void 0:r.poke)==null||t.call(r))}),children:[p.jsx("canvas",{ref:k,className:"article-web-art-android-bg-canvas","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-android-glow","aria-hidden":!0}),p.jsx("canvas",{ref:l,className:"article-web-art-android-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Android"})]})}function bt({itemWrapper:m,locked:b,onReady:y}){const d=a.useRef(!1);a.useEffect(()=>{d.current||(d.current=!0,y==null||y(m.uniqueId))},[m.uniqueId,y]);const g=a.useMemo(()=>[{key:"stop",hoverMode:"stop",hoverDuration:"5s"},{key:"slow",hoverMode:"slow",hoverDuration:"18s"},{key:"super-fast",hoverMode:"super-fast",hoverDuration:"0.22s"},{key:"very-fast",hoverMode:"very-fast",hoverDuration:"0.55s"}],[]);return p.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${b?"article-web-art-spin-boxes-locked":""}`,children:p.jsx("div",{className:"article-web-art-spin-boxes-grid",children:g.map(({key:w,hoverDuration:k,hoverMode:l})=>p.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--spin-hover-duration":k},children:p.jsx("div",{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${l}`})},w))})})}function pt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(!1),k=50,l=a.useMemo(()=>["level-1","level-2","level-3","level-4","level-5"],[]),[C,R]=a.useState(0),P=l[C],v=a.useMemo(()=>Array.from({length:k},(o,e)=>{const r=`${3/(k/2)*(e+1)}s`;return{key:e,style:{animationDelay:r,"--bar-index":e}}}),[]),f=a.useCallback(o=>{var e,r;(e=o==null?void 0:o.preventDefault)==null||e.call(o),(r=o==null?void 0:o.stopPropagation)==null||r.call(o),R(t=>(t+1)%l.length)},[l.length]);return a.useEffect(()=>{y&&(w.current||(w.current=!0,g==null||g(m.uniqueId)))},[y,m.uniqueId,g]),p.jsx("button",{type:"button",className:"article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable","aria-label":`Bars web art tile ${b+1}, ${P.replace("level-","mode ")}`,disabled:d,onClick:d?void 0:f,onKeyDown:d?void 0:o=>{(o.key==="Enter"||o.key===" ")&&f(o)},children:p.jsx("div",{className:`article-web-art-bars-stage article-web-art-bars-stage-${P}`,children:p.jsx("div",{className:`article-web-art-bars article-web-art-bars-${P}`,children:v.map(o=>p.jsx("div",{className:"article-web-art-bars-panel",style:o.style},o.key))})})})}function mt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),R=a.useRef(!0),P=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=a.useMemo(()=>({seed:1729+(Number(m.id)||8)*4242,reduceMotion:P,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[m.id,P]);a.useEffect(()=>{if(!y)return;const t=w.current,s=k.current;if(!t||!s)return;let n=!1,i=null,c=null,u=null;const h=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},x=F(async()=>{var M,N,E;try{const S=await z(()=>import("./shapeFieldEngine-B_ToSidK.js"),[]);if(n)return;i=S.createShapeFieldEngine(s,v),l.current=i;const j=()=>$(t,i,window.devicePixelRatio||1);j(),(M=i.renderStatic)==null||M.call(i),(N=i.triggerWave)==null||N.call(i),d||(E=i.start)==null||E.call(i),h(),c=new ResizeObserver(()=>{var _;j(),(_=i.renderStatic)==null||_.call(i)}),c.observe(t),"IntersectionObserver"in window&&(u=new IntersectionObserver(_=>{var L,T,O;for(const B of _){if(R.current=!!B.isIntersecting,d){(L=i.stop)==null||L.call(i);continue}R.current?(T=i.start)==null||T.call(i):(O=i.stop)==null||O.call(i)}},{threshold:.2}),u.observe(t))}catch{h()}});return()=>{var M;n=!0,x==null||x(),u==null||u.disconnect(),c==null||c.disconnect(),(M=i==null?void 0:i.destroy)==null||M.call(i),l.current=null}},[y,v,m.uniqueId,d,g]),a.useEffect(()=>{var s,n,i;const t=l.current;if(t){if(d){(s=t.clearPointer)==null||s.call(t),(n=t.stop)==null||n.call(t);return}R.current&&((i=t.start)==null||i.call(t))}},[d]);const f=t=>{const s=k.current||w.current;if(!s)return{x:0,y:0};const n=s.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}},o=t=>{var n,i;const s=f(t);(i=(n=l.current)==null?void 0:n.setPointer)==null||i.call(n,s.x,s.y)},e=t=>{var n,i,c,u;const s=f(t);(i=(n=l.current)==null?void 0:n.setPointer)==null||i.call(n,s.x,s.y),(u=(c=l.current)==null?void 0:c.triggerWave)==null||u.call(c,s.x,s.y)},r=t=>{var s,n;t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),(n=(s=l.current)==null?void 0:s.triggerWave)==null||n.call(s))};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${b+1}`,disabled:d,onPointerMove:d?void 0:o,onPointerDown:d?void 0:e,onPointerLeave:d?void 0:(()=>{var t,s;return(s=(t=l.current)==null?void 0:t.clearPointer)==null?void 0:s.call(t)}),onBlur:d?void 0:(()=>{var t,s;return(s=(t=l.current)==null?void 0:t.clearPointer)==null?void 0:s.call(t)}),onKeyDown:d?void 0:r,children:[p.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function wt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),R=a.useRef(!0),[P,v]=a.useState(2.8),[f,o]=a.useState(.01);a.useEffect(()=>{if(!y)return;const i=w.current,c=k.current;if(!i||!c)return;let u=!1,h=null,x=null,M=null;const N=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},E=F(async()=>{var S,j,_;try{const L=await z(()=>import("./hourglassEngine-Dqm3jFyu.js"),__vite__mapDeps([2,3,4]));if(u)return;h=L.createHourglassEngine(c),l.current=h;const T=(S=h.getState)==null?void 0:S.call(h);T&&(v(T.gravity),o(T.neckRatio));const O=()=>$(i,h,window.devicePixelRatio||1);O(),(j=h.renderStatic)==null||j.call(h),d||(_=h.start)==null||_.call(h),N(),x=new ResizeObserver(()=>{var B;O(),(B=h.renderStatic)==null||B.call(h)}),x.observe(i),"IntersectionObserver"in window&&(M=new IntersectionObserver(B=>{var q,J,Q;for(const ee of B){if(R.current=!!ee.isIntersecting,d){(q=h.stop)==null||q.call(h);continue}R.current?(J=h.start)==null||J.call(h):(Q=h.stop)==null||Q.call(h)}},{threshold:.2}),M.observe(i))}catch{N()}});return()=>{var S;u=!0,E==null||E(),M==null||M.disconnect(),x==null||x.disconnect(),(S=h==null?void 0:h.destroy)==null||S.call(h),l.current=null}},[y,m.uniqueId,d,g]),a.useEffect(()=>{var c,u;const i=l.current;if(i){if(d){(c=i.stop)==null||c.call(i);return}R.current&&((u=i.start)==null||u.call(i))}},[d]);const e=i=>{var c,u;i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),(u=(c=l.current)==null?void 0:c.flip)==null||u.call(c))},r=i=>{i.stopPropagation()},t=i=>{i.stopPropagation()},s=i=>{var u,h;const c=Number(i.target.value);v(c),(h=(u=l.current)==null?void 0:u.setGravity)==null||h.call(u,c)},n=i=>{var u,h,x,M;const c=Number(i.target.value);o(c),(h=(u=l.current)==null?void 0:u.setNeckRatio)==null||h.call(u,c),!d&&R.current&&((M=(x=l.current)==null?void 0:x.start)==null||M.call(x))};return p.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass",role:d?void 0:"button",tabIndex:d?-1:0,"aria-label":`Hourglass web art tile ${b+1}`,onClick:d?void 0:(()=>{var i,c;return(c=(i=l.current)==null?void 0:i.flip)==null?void 0:c.call(i)}),onKeyDown:d?void 0:e,children:[p.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),p.jsxs("div",{className:"article-web-art-hourglass-controls",onClickCapture:t,onPointerDownCapture:t,onPointerUpCapture:t,onClick:r,onPointerDown:r,onPointerUp:r,onKeyDown:r,children:[p.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-left",children:[p.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Neck"}),p.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.01",max:"0.22",step:"0.001",value:f,onChange:n,disabled:d,"aria-label":"Hourglass neck size"})]}),p.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-right",children:[p.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Gravity"}),p.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.45",max:"2.8",step:"0.01",value:P,onChange:s,disabled:d,"aria-label":"Hourglass gravity"})]})]}),p.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function xt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(null),R=a.useRef(!1),P=a.useRef(!0),[v,f]=a.useState(!1),o=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);a.useEffect(()=>{if(!y)return;const t=w.current,s=k.current,n=l.current;if(!t||!s||!n)return;let i=!1,c=null,u=null,h=null;const x=()=>{R.current||(R.current=!0,g==null||g(m.uniqueId))},M=S=>{i||(f(!0),x())},N=()=>{var S;return i?!1:((S=c==null?void 0:c.renderStatic)==null||S.call(c),c!=null&&c.hasVisibleFrame&&!c.hasVisibleFrame()?(M(),!1):(f(!1),x(),!0))},E=F(async()=>{var S;try{const j=await z(()=>import("./noiceShaderEngine-OW62H83V.js"),[]);if(i)return;c=j.createNoiceShaderEngine({backgroundCanvas:s,foregroundCanvas:n},{reduceMotion:o}),C.current=c;const _=()=>$(t,c,Math.min(1.5,window.devicePixelRatio||1));if(_(),!N())return;d||(S=c.start)==null||S.call(c),u=new ResizeObserver(()=>{var T;_(),(T=c==null?void 0:c.renderStatic)==null||T.call(c)}),u.observe(t),"IntersectionObserver"in window&&(h=new IntersectionObserver(T=>{var O,B,q;for(const J of T){if(P.current=!!J.isIntersecting,d){(O=c.stop)==null||O.call(c);continue}P.current?(B=c.start)==null||B.call(c):(q=c.stop)==null||q.call(c)}},{threshold:.25}),h.observe(t))}catch{M()}},{timeoutMs:220});return()=>{var S;i=!0,E==null||E(),h==null||h.disconnect(),u==null||u.disconnect(),(S=c==null?void 0:c.destroy)==null||S.call(c),C.current=null}},[y,m.uniqueId,d,g,o]),a.useEffect(()=>{var s,n,i;const t=C.current;if(t){if(d){(s=t.clearPointer)==null||s.call(t),(n=t.stop)==null||n.call(t);return}P.current&&((i=t.start)==null||i.call(t))}},[d]);const e=t=>{const s=w.current;if(!s)return{x:.5,y:.5};const n=s.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(t.clientY-n.top)/Math.max(1,n.height)))}},r=t=>{var n,i,c,u,h,x;const s=e(t);(i=(n=C.current)==null?void 0:n.setPointer)==null||i.call(n,s.x,s.y),(u=(c=C.current)==null?void 0:c.pulsePattern)==null||u.call(c),(x=(h=C.current)==null?void 0:h.start)==null||x.call(h)};return p.jsxs("button",{type:"button",ref:w,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice ${v?"article-web-art-tile-noice-fallback-active":""}`,"aria-label":`Noice web art tile ${b+1}`,disabled:d,onPointerMove:d?void 0:(t=>{var n,i;const s=e(t);(i=(n=C.current)==null?void 0:n.setPointer)==null||i.call(n,s.x,s.y)}),onPointerDown:d?void 0:(t=>{t.button!=null&&t.button!==0||r(t)}),onMouseLeave:d?void 0:(()=>{var t,s;(s=(t=C.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onBlur:d?void 0:(()=>{var t,s;(s=(t=C.current)==null?void 0:t.clearPointer)==null||s.call(t)}),onKeyDown:d?void 0:(t=>{var s,n,i,c;(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),(n=(s=C.current)==null?void 0:s.pulsePattern)==null||n.call(s),(c=(i=C.current)==null?void 0:i.start)==null||c.call(i))}),children:[v&&p.jsxs("div",{className:"article-web-art-noice-fallback","aria-hidden":!0,children:[p.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-a"}),p.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-b"}),p.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-c"})]}),p.jsx("canvas",{ref:k,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-bg-canvas ${v?"article-web-art-canvas-hidden":""}`}),p.jsx("canvas",{ref:l,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-fg-canvas ${v?"article-web-art-canvas-hidden":""}`}),p.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function vt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),R=a.useRef(!0),P=a.useRef(null),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);a.useEffect(()=>{if(!y)return;const o=w.current,e=k.current;if(!o||!e)return;let r=!1,t=null,s=null,n=null;const i=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},c=F(async()=>{var u,h;try{const x=await z(()=>import("./deepShaderEngine-CuYCvQ1H.js"),[]);if(r)return;t=x.createDeepShaderEngine(e,{reduceMotion:v}),l.current=t;const M=()=>$(o,t,Math.min(1.5,window.devicePixelRatio||1));M(),(u=t.renderStatic)==null||u.call(t),d||(h=t.start)==null||h.call(t),i(),s=new ResizeObserver(()=>{var N;M(),(N=t.renderStatic)==null||N.call(t)}),s.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(N=>{var E,S,j;for(const _ of N){if(R.current=!!_.isIntersecting,d){(E=t.stop)==null||E.call(t);continue}R.current?(S=t.start)==null||S.call(t):(j=t.stop)==null||j.call(t)}},{threshold:.25}),n.observe(o))}catch{i()}},{timeoutMs:220});return()=>{var u;r=!0,c==null||c(),n==null||n.disconnect(),s==null||s.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),l.current=null}},[y,m.uniqueId,d,g,v]),a.useEffect(()=>{var e,r,t;const o=l.current;if(o){if(d){P.current=null,(e=o.clearPointer)==null||e.call(o),(r=o.stop)==null||r.call(o);return}R.current&&((t=o.start)==null||t.call(o))}},[d]);const f=o=>{const e=k.current||w.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(o.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(o.clientY-r.top)/Math.max(1,r.height)))}};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-deep","aria-label":`Deep web art tile ${b+1}`,disabled:d,onPointerDown:d?void 0:o=>{var r,t,s,n;if(o.button!=null&&o.button!==0)return;P.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const e=f(o);(t=(r=l.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y),(n=(s=l.current)==null?void 0:s.start)==null||n.call(s)},onPointerMove:d?void 0:o=>{var r,t;if(P.current!=null&&o.pointerId!==P.current||P.current==null&&o.pointerType!=="mouse")return;const e=f(o);P.current!=null&&((t=(r=l.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y))},onPointerUp:d?void 0:o=>{var e,r;P.current!=null&&o.pointerId!==P.current||(P.current=null,(r=(e=l.current)==null?void 0:e.clearPointer)==null||r.call(e))},onPointerCancel:d?void 0:(()=>{var o,e;P.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onMouseLeave:d?void 0:(()=>{var o,e;P.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:d?void 0:(()=>{var o,e;P.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onKeyDown:d?void 0:(o=>{var e,r;(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),(r=(e=l.current)==null?void 0:e.start)==null||r.call(e))}),children:[p.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Deep"})]})}function yt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),R=a.useRef(!0),P=a.useRef(!1),v=Number(m==null?void 0:m.id)===5,f=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=a.useMemo(()=>{const n=Number(m.id)||b+1,i=.0026+n*8e-5,c=.0054+n*14e-5,u=n%2?1:2,h={kx:11+n*2,ky:n%2};return{refreshDelay:v?0:8e3,radiusMini:i,radiusMaxi:c,dHueStep:u,startGroup:h,seed:1337+n*1009,reduceMotion:f}},[v,m.id,b,f]);a.useEffect(()=>{if(!y)return;const n=w.current,i=k.current;if(!n||!i)return;let c=!1,u=null,h=null,x=null;const M=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},N=F(async()=>{var E,S;try{const j=await z(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(c)return;u=j.createEmbroideryEngine(i,o),l.current=u;const _=()=>$(n,u,window.devicePixelRatio||1);_(),(E=u.renderStatic)==null||E.call(u),R.current&&((S=u.start)==null||S.call(u)),M(),h=new ResizeObserver(()=>{var L;_(),(L=u.renderStatic)==null||L.call(u)}),h.observe(n),"IntersectionObserver"in window&&(x=new IntersectionObserver(L=>{for(const T of L){if(R.current=!!T.isIntersecting,v){R.current||u.stop();continue}R.current&&C.current?u.start():u.stop()}},{threshold:.25}),x.observe(n))}catch{M()}});return()=>{c=!0,N==null||N(),x==null||x.disconnect(),h==null||h.disconnect(),u==null||u.destroy(),l.current=null}},[y,o,m.uniqueId,g]),a.useEffect(()=>{var i,c;const n=l.current;if(n){if(d){(i=n.stop)==null||i.call(n);return}R.current&&((c=n.start)==null||c.call(n))}},[d]),a.useEffect(()=>{var i,c;const n=l.current;if(n){if(d){(i=n.stop)==null||i.call(n);return}R.current&&((c=n.start)==null||c.call(n))}},[d]);const e=()=>{var n;C.current=!0,R.current&&((n=l.current)==null||n.start())},r=()=>{var n,i,c,u;C.current=!0,R.current?(i=(n=l.current)==null?void 0:n.start)==null||i.call(n):(u=(c=l.current)==null?void 0:c.stop)==null||u.call(c)},t=()=>{var n,i,c,u,h,x,M,N,E,S;if(v){(i=(n=l.current)==null?void 0:n.stop)==null||i.call(n),(u=(c=l.current)==null?void 0:c.reset)==null||u.call(c),(x=(h=l.current)==null?void 0:h.start)==null||x.call(h);return}(M=l.current)==null||M.reset(),(E=(N=l.current)==null?void 0:N.renderStatic)==null||E.call(N),R.current&&((S=l.current)==null||S.start())},s=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${b+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d||v?void 0:e,onMouseLeave:d||v?void 0:r,onFocus:d||v?void 0:e,onBlur:d||v?void 0:r,onKeyDown:d?void 0:s,children:[p.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:v?"Click":Number.isFinite(Number(m==null?void 0:m.id))?Number(m.id):b+1})]})}function Rt({itemWrapper:m,index:b,activate:y,onReady:d}){const g=a.useRef(!1),w=a.useRef(null),k=a.useMemo(()=>`<!doctype html>
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
</html>`,[]);return a.useEffect(()=>{y&&(g.current||(g.current=!0,d==null||d(m.uniqueId)))},[y,m.uniqueId,d]),p.jsx("div",{className:"article-web-art-tile article-web-art-pulse-tile",role:"img","aria-label":`Pulse web art tile ${b+1}`,children:p.jsx("iframe",{ref:w,className:"article-web-art-pulse-frame",title:"Pulse web art",srcDoc:k,sandbox:"",scrolling:"no"})})}function Mt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(!1),R=a.useRef(null);a.useRef(null),a.useRef(!1);const P=a.useRef(!1),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=a.useMemo(()=>({seed:9001+(Number(m.id)||1)*1337,reduceMotion:v,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[m.id,v]);a.useEffect(()=>{if(!y)return;const u=w.current,h=k.current;if(!u||!h)return;let x=!1,M=null,N=null;const E=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},S=F(async()=>{var j,_;try{const L=await z(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(x)return;M=L.createSpiralDotsEngine(h,f),l.current=M;const T=()=>$(u,M,window.devicePixelRatio||1);T(),(j=M.renderStatic)==null||j.call(M),(_=M.start)==null||_.call(M),E(),N=new ResizeObserver(()=>{var O;T(),M.rebuildDots(),(O=M.renderStatic)==null||O.call(M)}),N.observe(u)}catch{E()}});return()=>{x=!0,S==null||S(),N==null||N.disconnect(),M==null||M.destroy(),l.current=null}},[y,f,m.uniqueId,g]),a.useEffect(()=>{var h,x,M;const u=l.current;if(u){if(d){(h=u.clearMouse)==null||h.call(u),(x=u.stop)==null||x.call(u);return}(M=u.start)==null||M.call(u)}},[d]);const o=u=>{const h=k.current||w.current;if(!h)return{x:-1e4,y:-1e4};const x=h.getBoundingClientRect();return{x:u.clientX-x.left,y:u.clientY-x.top}},e=()=>{var u;(u=l.current)==null||u.start()},r=()=>{var u,h;(u=l.current)==null||u.clearMouse(),(h=l.current)==null||h.start()},t=()=>{e()},s=()=>{r()},n=u=>{var x;const h=o(u);(x=l.current)==null||x.setMouse(h.x,h.y)},i=()=>{e()},c=()=>{r()};return p.jsxs("div",{ref:w,className:"article-web-art-tile article-web-art-tile-hover-only article-web-art-tile-hover-dots",role:"img",tabIndex:d?-1:0,"aria-label":`Spiral dots web art tile ${b+1}`,onPointerDown:d?void 0:u=>{var M;if(u.pointerType==="mouse")return;const h=w.current;if(!h)return;P.current=!0,R.current=u.pointerId;try{h.setPointerCapture(u.pointerId)}catch{}e();const x=o(u);(M=l.current)==null||M.setMouse(x.x,x.y)},onPointerMove:d?void 0:u=>{var x;if(!P.current||R.current!=null&&u.pointerId!==R.current)return;const h=o(u);(x=l.current)==null||x.setMouse(h.x,h.y)},onPointerUp:d?void 0:u=>{R.current!=null&&u.pointerId!==R.current||(P.current=!1,R.current=null,r())},onPointerCancel:d?void 0:()=>{P.current=!1,R.current=null,r()},onMouseEnter:d?void 0:t,onMouseLeave:d?void 0:s,onMouseMove:d?void 0:n,onFocus:d?void 0:i,onBlur:d?void 0:c,children:[p.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function gt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),R=a.useRef(!0),P=a.useRef(!1),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=a.useMemo(()=>({seed:424242+(Number(m.id)||2)*2027,reduceMotion:v,targetCellSize:14,gapPx:1.4}),[m.id,v]);a.useEffect(()=>{if(!y)return;const n=w.current,i=k.current;if(!n||!i)return;let c=!1,u=null,h=null,x=null;const M=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},N=F(async()=>{var E,S;try{const j=await z(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(c)return;u=j.createGridWaveEngine(i,f),l.current=u;const _=()=>$(n,u,window.devicePixelRatio||1);_(),(E=u.renderStatic)==null||E.call(u),R.current&&((S=u.start)==null||S.call(u)),M(),h=new ResizeObserver(()=>{var L;_(),(L=u.renderStatic)==null||L.call(u)}),h.observe(n),"IntersectionObserver"in window&&(x=new IntersectionObserver(L=>{for(const T of L)R.current=!!T.isIntersecting,R.current&&C.current?u.start():u.stop()},{threshold:.25}),x.observe(n))}catch{M()}});return()=>{c=!0,N==null||N(),x==null||x.disconnect(),h==null||h.disconnect(),u==null||u.destroy(),l.current=null}},[y,f,m.uniqueId,g]);const o=()=>{var n;C.current=!0,R.current&&((n=l.current)==null||n.start())},e=()=>{var n,i,c,u;C.current=!0,R.current?(i=(n=l.current)==null?void 0:n.start)==null||i.call(n):(u=(c=l.current)==null?void 0:c.stop)==null||u.call(c)},r=n=>{const i=k.current||w.current;if(!i)return{x:0,y:0};const c=i.getBoundingClientRect();return typeof(n==null?void 0:n.clientX)!="number"||typeof(n==null?void 0:n.clientY)!="number"?{x:c.width/2,y:c.height/2}:{x:n.clientX-c.left,y:n.clientY-c.top}},t=n=>{var c,u,h,x;const i=r(n);(c=l.current)==null||c.rippleAt(i.x,i.y),(h=(u=l.current)==null?void 0:u.renderStatic)==null||h.call(u),C.current&&R.current&&((x=l.current)==null||x.start())},s=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t(null))};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${b+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:o,onMouseLeave:d?void 0:e,onFocus:d?void 0:o,onBlur:d?void 0:e,onKeyDown:d?void 0:s,children:[p.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function Ct({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),R=a.useRef(!0),P=a.useRef(!1),v=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=a.useMemo(()=>({reduceMotion:v,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[v]);a.useEffect(()=>{if(!y)return;const s=w.current,n=k.current;if(!s||!n)return;let i=!1,c=null,u=null,h=null,x=null;const M=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},N=async()=>{var L;const S=await z(()=>import("./threeTunnelEngine-BYxOaRL9.js"),__vite__mapDeps([5,1]));if(i)return;c=S.createThreeTunnelEngine(n,f),l.current=c;const j=()=>$(s,c,Math.min(1.5,window.devicePixelRatio||1));return j(),c.reset(),R.current&&((L=c.start)==null||L.call(c)),M(),u=new ResizeObserver(()=>{j(),c.reset()}),u.observe(s),"IntersectionObserver"in window&&(h=new IntersectionObserver(T=>{for(const O of T)R.current=!!O.isIntersecting,R.current&&C.current?c.start():c.stop()},{threshold:.25}),h.observe(s)),()=>{h==null||h.disconnect(),u==null||u.disconnect(),c.destroy(),l.current=null}};let E=null;return x=F(()=>{N().then(S=>{E=S||null}).catch(()=>{M()})},{timeoutMs:300}),()=>{i=!0,x==null||x(),E==null||E()}},[y,f,m.uniqueId,g]),a.useEffect(()=>{var n,i,c;const s=l.current;if(s){if(d){(n=s.setHeld)==null||n.call(s,!1),(i=s.stop)==null||i.call(s);return}R.current&&((c=s.start)==null||c.call(s))}},[d]);const o=()=>{var s;C.current=!0,R.current&&((s=l.current)==null||s.start())},e=()=>{var s,n,i,c;C.current=!0,R.current?(n=(s=l.current)==null?void 0:s.start)==null||n.call(s):(c=(i=l.current)==null?void 0:i.stop)==null||c.call(i)},r=()=>{var s,n,i,c;(n=(s=l.current)==null?void 0:s.nextPalette)==null||n.call(s),(i=l.current)==null||i.reset(),R.current&&((c=l.current)==null||c.start())},t=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),r())};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${b+1}`,disabled:d,onClick:d?void 0:r,onMouseEnter:d?void 0:o,onMouseLeave:d?void 0:e,onFocus:d?void 0:o,onBlur:d?void 0:e,onKeyDown:d?void 0:t,children:[p.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),p.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),p.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Pt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),R=a.useRef(!0),P=a.useRef(!1),v=a.useRef(null),f=a.useRef(null),o=a.useRef(!1),e=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=a.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,d]);a.useEffect(()=>{if(!y)return;const n=w.current,i=k.current;if(!n||!i)return;let c=!1,u=null,h=null;const x=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},M=async()=>{var L;const N=await z(()=>import("./threePolygonDemo5Engine-J7VS_NUu.js"),__vite__mapDeps([6,1]));if(c)return;const E=N.createThreePolygonDemo5Engine(i,r);l.current=E;const S=()=>$(n,E,Math.min(1.2,window.devicePixelRatio||1));S(),E.reset(),window.requestAnimationFrame(()=>{c||l.current!==E||(S(),E.reset())}),R.current&&((L=E.start)==null||L.call(E)),x();const j=new ResizeObserver(()=>{S()});j.observe(n);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(T=>{for(const O of T)R.current=!!O.isIntersecting,R.current&&C.current?E.start():E.stop()},{threshold:.25}),_.observe(n)),u=()=>{_==null||_.disconnect(),j.disconnect(),E.destroy(),l.current=null}};return h=F(()=>{M().catch(()=>{x()})},{timeoutMs:300}),()=>{c=!0,h==null||h(),f.current!=null&&window.clearTimeout(f.current),u==null||u()}},[y,r,m.uniqueId,g]);const t=()=>{var n,i,c;(i=(n=l.current)==null?void 0:n.boost)==null||i.call(n),R.current&&((c=l.current)==null||c.start())},s=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${b+1}`,disabled:d,onKeyDown:d?void 0:s,onPointerDown:d?void 0:n=>{var i;if(!(n.button!=null&&n.button!==0)){v.current=n.pointerId,o.current=!1;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}R.current&&((i=l.current)==null||i.start()),f.current!=null&&window.clearTimeout(f.current),f.current=window.setTimeout(()=>{var c,u;v.current!=null&&(o.current=!0,(u=(c=l.current)==null?void 0:c.setHeld)==null||u.call(c,!0))},140)}},onPointerUp:d?void 0:n=>{var i,c;v.current!=null&&n.pointerId!==v.current||(f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current?(o.current=!1,(c=(i=l.current)==null?void 0:i.setHeld)==null||c.call(i,!1)):t())},onPointerCancel:d?void 0:(()=>{var n,i;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(i=(n=l.current)==null?void 0:n.setHeld)==null||i.call(n,!1)}),onLostPointerCapture:d?void 0:(()=>{var n,i;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(i=(n=l.current)==null?void 0:n.setHeld)==null||i.call(n,!1)}),onMouseEnter:d?void 0:(()=>{var n;C.current=!0,R.current&&((n=l.current)==null||n.start())}),onMouseLeave:d?void 0:(()=>{var n,i,c,u;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(i=(n=l.current)==null?void 0:n.setHeld)==null||i.call(n,!1),C.current=!0,R.current?(c=l.current)==null||c.start():(u=l.current)==null||u.stop()}),onFocus:d?void 0:(()=>{var n;C.current=!0,R.current&&((n=l.current)==null||n.start())}),onBlur:d?void 0:(()=>{var n,i,c,u;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(i=(n=l.current)==null?void 0:n.setHeld)==null||i.call(n,!1),C.current=!0,R.current?(c=l.current)==null||c.start():(u=l.current)==null||u.stop()}),children:[p.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function kt({itemWrapper:m,index:b,activate:y,locked:d,onReady:g}){const w=a.useRef(null),k=a.useRef(null),l=a.useRef(null),C=a.useRef(!0),R=a.useRef(!0),P=a.useRef(!1),v=a.useRef(0),f=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=a.useMemo(()=>({reduceMotion:f,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[f]);a.useEffect(()=>{if(!y)return;const n=w.current,i=k.current;if(!n||!i)return;let c=!1,u=null,h=null,x=null;const M=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},N=F(async()=>{var E,S;try{const j=await z(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(c)return;u=j.createOrbitCirclesEngine(i,o),l.current=u;const _=()=>$(n,u,window.devicePixelRatio||1);_(),u.reset(),(E=u.renderStatic)==null||E.call(u),R.current&&((S=u.start)==null||S.call(u)),M(),h=new ResizeObserver(()=>{var L;_(),(L=u.renderStatic)==null||L.call(u)}),h.observe(n),"IntersectionObserver"in window&&(x=new IntersectionObserver(L=>{for(const T of L)R.current=!!T.isIntersecting,R.current&&C.current?u.start():u.stop()},{threshold:.25}),x.observe(n))}catch{M()}});return()=>{c=!0,N==null||N(),x==null||x.disconnect(),h==null||h.disconnect(),u==null||u.destroy(),l.current=null}},[y,o,m.uniqueId,g]),a.useEffect(()=>{var i,c;const n=l.current;if(n){if(d){(i=n.stop)==null||i.call(n);return}R.current&&((c=n.start)==null||c.call(n))}},[d]);const e=()=>{var n;C.current=!0,R.current&&((n=l.current)==null||n.start())},r=()=>{var n,i,c,u;C.current=!0,R.current?(i=(n=l.current)==null?void 0:n.start)==null||i.call(n):(u=(c=l.current)==null?void 0:c.stop)==null||u.call(c)},t=()=>{var h,x,M;const n=l.current;if(!n)return;const i=Math.max(1,((h=n.getTotalCircles)==null?void 0:h.call(n))||1),c=v.current%i,u=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`;(x=n.setCircleColor)==null||x.call(n,c,u),v.current+=1,R.current&&((M=n.start)==null||M.call(n))},s=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return p.jsxs("button",{type:"button",ref:w,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${b+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:e,onMouseLeave:d?void 0:r,onFocus:d?void 0:e,onBlur:d?void 0:r,onKeyDown:d?void 0:s,children:[p.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function It({readyId:m,locked:b,onReady:y}){const d=a.useRef(null),g=a.useRef(null),w=a.useRef(null),k=a.useRef(!1),l=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=a.useMemo(()=>({seed:20250414,reduceMotion:l,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[l]);a.useEffect(()=>{const v=d.current,f=g.current;if(!v||!f)return;let o=!1,e=null,r=null,t=null;const s=()=>{k.current||(k.current=!0,y==null||y(m))},n=F(async()=>{var i,c;try{const u=await z(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(o)return;e=u.createTortuosityTraceEngine(f,C),w.current=e;const h=()=>$(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(i=e.renderStatic)==null||i.call(e),(c=e.start)==null||c.call(e),s(),r=new ResizeObserver(()=>{var x;h(),(x=e.reset)==null||x.call(e)}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(x=>{var M,N;for(const E of x)E.isIntersecting?(M=e.start)==null||M.call(e):(N=e.stop)==null||N.call(e)},{threshold:.25}),t.observe(v))}catch{s()}},{timeoutMs:200});return()=>{var i;o=!0,n==null||n(),t==null||t.disconnect(),r==null||r.disconnect(),(i=e==null?void 0:e.destroy)==null||i.call(e),w.current=null}},[C,y,m]),a.useEffect(()=>{var f,o,e;const v=w.current;if(v){if(b){(f=v.setHeld)==null||f.call(v,!1),(o=v.stop)==null||o.call(v);return}(e=v.start)==null||e.call(v)}},[b]),a.useEffect(()=>{var f,o;const v=w.current;if(v){if(b){(f=v.stop)==null||f.call(v);return}(o=v.start)==null||o.call(v)}},[b]);const R=()=>{var v,f,o,e;(f=(v=w.current)==null?void 0:v.reset)==null||f.call(v),(e=(o=w.current)==null?void 0:o.start)==null||e.call(o)},P=v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),R())};return p.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:b,onClick:b?void 0:R,onKeyDown:b?void 0:P,children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function St({readyId:m,locked:b,onReady:y}){const d=a.useRef(null),g=a.useRef(null),w=a.useRef(null),k=a.useRef(!1),l=a.useRef(null),C=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=a.useMemo(()=>({seed:20250415,reduceMotion:C,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[C]);a.useEffect(()=>{const o=d.current,e=g.current;if(!o||!e)return;let r=!1,t=null,s=null,n=null;const i=()=>{k.current||(k.current=!0,y==null||y(m))},c=F(async()=>{var u,h;try{const x=await z(()=>import("./hexFlowBallsEngine-Bzfny-m0.js"),[]);if(r)return;t=x.createHexFlowBallsEngine(e,R),w.current=t;const M=()=>$(o,t,Math.min(1.5,window.devicePixelRatio||1));M(),(u=t.renderStatic)==null||u.call(t),(h=t.start)==null||h.call(t),i(),s=new ResizeObserver(()=>{var N;M(),(N=t.renderStatic)==null||N.call(t)}),s.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(N=>{var E,S;for(const j of N)j.isIntersecting?(E=t.start)==null||E.call(t):(S=t.stop)==null||S.call(t)},{threshold:.25}),n.observe(o))}catch{i()}},{timeoutMs:220});return()=>{var u;r=!0,c==null||c(),n==null||n.disconnect(),s==null||s.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),w.current=null}},[R,y,m]),a.useEffect(()=>{var e,r,t;const o=w.current;if(o){if(b){(e=o.clearPointer)==null||e.call(o),(r=o.stop)==null||r.call(o);return}(t=o.start)==null||t.call(o)}},[b]);const P=o=>{const e=d.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:r.width>0?(o.clientX-r.left)/r.width:.5,y:r.height>0?(o.clientY-r.top)/r.height:.5}},v=()=>{var o,e,r,t;(e=(o=w.current)==null?void 0:o.burst)==null||e.call(o),(t=(r=w.current)==null?void 0:r.start)==null||t.call(r)},f=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),v())};return p.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:b,onClick:b?void 0:v,onPointerDown:b?void 0:(o=>{var r,t;l.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const e=P(o);(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerMove:b?void 0:(o=>{var r,t;if(l.current!=null&&o.pointerId!==l.current)return;const e=P(o);(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerUp:b?void 0:(o=>{l.current!=null&&o.pointerId!==l.current||(l.current=null)}),onPointerCancel:b?void 0:(()=>{var o,e;l.current=null,(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onMouseMove:b?void 0:(o=>{var r,t;const e=P(o);(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onMouseLeave:b?void 0:(()=>{var o,e;l.current=null,(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:b?void 0:(()=>{var o,e;l.current=null,(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onKeyDown:b?void 0:f,children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function Nt({readyId:m,locked:b,onReady:y}){const d=a.useRef(null),g=a.useRef(null),w=a.useRef(null),k=a.useRef(!1),l=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=a.useMemo(()=>({seed:20250416,reduceMotion:l,step:6,side:5}),[l]);a.useEffect(()=>{const f=d.current,o=g.current;if(!f||!o)return;let e=!1,r=null,t=null,s=null;const n=()=>{k.current||(k.current=!0,y==null||y(m))},i=F(async()=>{var c,u;try{const h=await z(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;r=h.createPixelPlopEngine(o,C),w.current=r;const x=()=>$(f,r,Math.min(1.5,window.devicePixelRatio||1));x(),(c=r.renderStatic)==null||c.call(r),(u=r.start)==null||u.call(r),n(),t=new ResizeObserver(()=>{var M;x(),(M=r.reset)==null||M.call(r)}),t.observe(f),"IntersectionObserver"in window&&(s=new IntersectionObserver(M=>{var N,E;for(const S of M)S.isIntersecting?(N=r.start)==null||N.call(r):(E=r.stop)==null||E.call(r)},{threshold:.25}),s.observe(f))}catch{n()}},{timeoutMs:220});return()=>{var c;e=!0,i==null||i(),s==null||s.disconnect(),t==null||t.disconnect(),(c=r==null?void 0:r.destroy)==null||c.call(r),w.current=null}},[C,y,m]),a.useEffect(()=>{var o,e,r;const f=w.current;if(f){if(b){(o=f.clearPointer)==null||o.call(f),(e=f.stop)==null||e.call(f);return}(r=f.start)==null||r.call(f)}},[b]),a.useEffect(()=>{var o,e;const f=w.current;if(f){if(b){(o=f.stop)==null||o.call(f);return}(e=f.start)==null||e.call(f)}},[b]);const R=()=>{var f,o,e,r;(o=(f=w.current)==null?void 0:f.seedBurst)==null||o.call(f),(r=(e=w.current)==null?void 0:e.start)==null||r.call(e)},P=f=>{var r,t,s,n;const o=g.current||d.current;if(!o||typeof(f==null?void 0:f.clientX)!="number"||typeof(f==null?void 0:f.clientY)!="number"){R();return}const e=o.getBoundingClientRect();(t=(r=w.current)==null?void 0:r.burstAt)==null||t.call(r,f.clientX-e.left,f.clientY-e.top),(n=(s=w.current)==null?void 0:s.start)==null||n.call(s)},v=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),R())};return p.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:b,onPointerDown:b?void 0:(f=>{f.button!=null&&f.button!==0||P(f)}),onKeyDown:b?void 0:v,children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function Et({readyId:m,locked:b,onReady:y}){const d=a.useRef(null),g=a.useRef(null),w=a.useRef(null),k=a.useRef(!1),l=a.useRef(null),C=a.useRef(!1),R=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=a.useMemo(()=>({reduceMotion:R,seed:20250417}),[R]);a.useEffect(()=>{const e=d.current,r=g.current;if(!e||!r)return;let t=!1,s=null,n=null,i=null;const c=()=>{k.current||(k.current=!0,y==null||y(m))},u=F(async()=>{var h,x;try{const M=await z(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(t)return;s=M.createJuliaLinesEngine(r,P),w.current=s;const N=()=>$(e,s,Math.min(1.5,window.devicePixelRatio||1));N(),(h=s.renderStatic)==null||h.call(s),(x=s.start)==null||x.call(s),c(),n=new ResizeObserver(()=>{N()}),n.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(E=>{var S,j;for(const _ of E)_.isIntersecting?(S=s.start)==null||S.call(s):(j=s.stop)==null||j.call(s)},{threshold:.25}),i.observe(e))}catch{c()}},{timeoutMs:220});return()=>{var h;t=!0,u==null||u(),i==null||i.disconnect(),n==null||n.disconnect(),(h=s==null?void 0:s.destroy)==null||h.call(s),w.current=null}},[P,y,m]),a.useEffect(()=>{var r,t,s,n;const e=w.current;if(e){if(b){(r=e.setHeld)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(s=e.stop)==null||s.call(e);return}(n=e.start)==null||n.call(e)}},[b]),a.useEffect(()=>{var r,t,s;const e=w.current;if(e){if(b){(r=e.clearPointer)==null||r.call(e),(t=e.stop)==null||t.call(e);return}(s=e.start)==null||s.call(e)}},[b]);const v=e=>{const r=d.current;if(!r)return{x:.4,y:.5};const t=r.getBoundingClientRect(),s=(e.clientX-t.left)/Math.max(1,t.width),n=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,s)),y:Math.max(0,Math.min(1,n))}},f=()=>{var e,r,t,s;(r=(e=w.current)==null?void 0:e.reset)==null||r.call(e),(s=(t=w.current)==null?void 0:t.start)==null||s.call(t)},o=e=>{var t,s,n,i,c,u,h,x;const r=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(s=(t=w.current)==null?void 0:t.nudge)==null||s.call(t,0,-r)):e.key==="ArrowDown"?(e.preventDefault(),(i=(n=w.current)==null?void 0:n.nudge)==null||i.call(n,0,r)):e.key==="ArrowLeft"?(e.preventDefault(),(u=(c=w.current)==null?void 0:c.nudge)==null||u.call(c,-r,0)):e.key==="ArrowRight"?(e.preventDefault(),(x=(h=w.current)==null?void 0:h.nudge)==null||x.call(h,r,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),f())};return p.jsxs("div",{ref:d,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:b?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:b?void 0:e=>{var s,n;const r=d.current;if(!r)return;C.current=!0,l.current=e.pointerId;try{r.setPointerCapture(e.pointerId)}catch{}const t=v(e);(n=(s=w.current)==null?void 0:s.setPointer)==null||n.call(s,t.x,t.y)},onPointerMove:b?void 0:e=>{var t,s;if(C.current&&l.current!=null&&e.pointerId!==l.current)return;const r=v(e);(s=(t=w.current)==null?void 0:t.setPointer)==null||s.call(t,r.x,r.y)},onPointerUp:b?void 0:e=>{var r,t;l.current!=null&&e.pointerId!==l.current||(C.current=!1,l.current=null,(t=(r=w.current)==null?void 0:r.clearPointer)==null||t.call(r))},onPointerCancel:b?void 0:()=>{var e,r;C.current=!1,l.current=null,(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)},onMouseMove:b?void 0:e=>{var t,s;const r=v(e);(s=(t=w.current)==null?void 0:t.setPointer)==null||s.call(t,r.x,r.y)},onMouseLeave:b?void 0:(()=>{var e,r;(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:b?void 0:(()=>{var e,r;(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:b?void 0:o,onClick:b?void 0:f,children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function jt({readyId:m,locked:b,onReady:y}){const[d,g]=a.useState(0),[w,k]=a.useState("mine"),[l,C]=a.useState(()=>new Set),[R,P]=a.useState(()=>new Set),[v,f]=a.useState("playing"),[o,e]=a.useState(null),[r,t]=a.useState(0),s=a.useMemo(()=>ot(),[d]);a.useEffect(()=>{y==null||y(m)},[y,m]),a.useEffect(()=>{k("mine"),C(new Set),P(new Set),f("playing"),e(null),t(0)},[d]),a.useEffect(()=>{if(o==null||v!=="playing")return;const x=()=>{t(Math.min(5999,Math.floor((Date.now()-o)/1e3)))};x();const M=window.setInterval(x,1e3);return()=>{window.clearInterval(M)}},[o,v]);const n=()=>{g(x=>x+1)},i=x=>{if(b||v!=="playing")return;if(o==null&&e(Date.now()),w==="flag"){if(l.has(x))return;const N=new Set(R);N.has(x)?N.delete(x):N.add(x),P(N),Te(s,l,N)&&f("won");return}if(R.has(x)||l.has(x))return;if(s.mines.has(x)){const N=new Set(l);for(const E of s.mines)N.add(E);N.add(x),C(N),f("lost");return}const M=at(x,s,l,R);C(M),Te(s,M,R)&&f("won")},c=s.mineCount-R.size,u=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`;let h="🤔";return v==="lost"?h="😣":v==="won"?h="😎":R.size>=s.mineCount?h="😕":R.size>=s.mineCount-1?h="🤓":R.size>=Math.round(s.mineCount*3/4)?h="😃":R.size>=Math.round(s.mineCount*2/3)?h="😊":R.size>=Math.round(s.mineCount/2)?h="🙂":R.size>=Math.round(s.mineCount/3)?h="😏":R.size>0&&(h="😐"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:p.jsxs("div",{className:"article-web-art-minesweeper",children:[p.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[p.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${w==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>k("mine"),disabled:b||v!=="playing","aria-pressed":w==="mine",children:"⛏"}),p.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${w==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>k("flag"),disabled:b||v!=="playing","aria-pressed":w==="flag",children:"🚩"})]}),p.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[s.counts.map((x,M)=>{const N=l.has(M),E=R.has(M),S=s.mines.has(M),j=v==="lost"&&S,_=x>0?it[x-1]:void 0;return p.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${N?"article-web-art-minesweeper-cell-revealed":""} ${j?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>i(M),disabled:b||v!=="playing","aria-label":`Minesweeper cell ${M+1}`,children:[E&&!N?p.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,j?p.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,N&&!S&&x>0?p.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:x}):null]},`mine-${d}-${M}`)}),v==="lost"?p.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:n,children:["Ooohhh 🙁",p.jsx("br",{}),"Click to try again"]}):null,v==="won"?p.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:n,children:["👌👀✔💯💯💯",p.jsx("br",{}),"Click to restart"]}):null]}),p.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[p.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[p.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:h}),p.jsx("span",{children:c})]}),p.jsx("div",{className:"article-web-art-minesweeper-timer",children:u})]}),p.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function _t({readyId:m,locked:b,onReady:y}){const d=a.useRef(null),g=a.useRef(null),w=a.useRef(null),k=a.useRef(!1),l=a.useRef(null),C=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=a.useMemo(()=>({reduceMotion:C}),[C]);a.useEffect(()=>{const o=d.current,e=g.current;if(!o||!e)return;let r=!1,t=null,s=null,n=null;const i=()=>{k.current||(k.current=!0,y==null||y(m))},c=F(async()=>{var u,h;try{const x=await z(()=>import("./fallingRingsEngine-CgfU8E0P.js"),[]);if(r)return;t=x.createFallingRingsEngine(e,R),w.current=t;const M=()=>$(o,t,Math.min(1.5,window.devicePixelRatio||1));M(),(u=t.renderStatic)==null||u.call(t),(h=t.start)==null||h.call(t),i(),s=new ResizeObserver(()=>{M()}),s.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(N=>{var E,S;for(const j of N)j.isIntersecting?(E=t.start)==null||E.call(t):(S=t.stop)==null||S.call(t)},{threshold:.25}),n.observe(o))}catch{i()}},{timeoutMs:220});return()=>{var u;r=!0,c==null||c(),n==null||n.disconnect(),s==null||s.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),w.current=null}},[R,y,m]);const P=o=>{var e,r,t,s;(r=(e=w.current)==null?void 0:e.setHeld)==null||r.call(e,o),(s=(t=w.current)==null?void 0:t.start)==null||s.call(t)},v=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),P(!0))},f=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),P(!1))};return p.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:b,onPointerDown:b?void 0:o=>{l.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}P(!0)},onPointerUp:b?void 0:o=>{l.current!=null&&o.pointerId!==l.current||(l.current=null,P(!1))},onPointerCancel:b?void 0:()=>{l.current=null,P(!1)},onLostPointerCapture:b?void 0:()=>{l.current=null,P(!1)},onMouseLeave:b?void 0:(()=>{l.current!=null&&P(!1)}),onBlur:b?void 0:(()=>{l.current=null,P(!1)}),onKeyDown:b?void 0:v,onKeyUp:b?void 0:f,children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function Lt({readyId:m,locked:b,onReady:y}){const d=a.useRef(null),g=a.useRef(null),w=a.useRef(null),k=a.useRef(!1),l=a.useRef(null),C=a.useRef("mouse"),R=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=a.useMemo(()=>({reduceMotion:R,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[R]);a.useEffect(()=>{const f=d.current,o=g.current;if(!f||!o)return;let e=!1,r=null,t=null,s=null;const n=()=>{k.current||(k.current=!0,y==null||y(m))},i=F(async()=>{var c,u;try{const h=await z(()=>import("./prismFieldEngine-BQpxImA_.js"),__vite__mapDeps([7,1]));if(e)return;r=h.createPrismFieldEngine(o,P),w.current=r;const x=()=>$(f,r,Math.min(1.5,window.devicePixelRatio||1));x(),(c=r.renderStatic)==null||c.call(r),(u=r.start)==null||u.call(r),n(),t=new ResizeObserver(()=>{x()}),t.observe(f),"IntersectionObserver"in window&&(s=new IntersectionObserver(M=>{var N,E;for(const S of M)S.isIntersecting?(N=r.start)==null||N.call(r):(E=r.stop)==null||E.call(r)},{threshold:.25}),s.observe(f))}catch{n()}},{timeoutMs:220});return()=>{var c;e=!0,i==null||i(),s==null||s.disconnect(),t==null||t.disconnect(),(c=r==null?void 0:r.destroy)==null||c.call(r),w.current=null}},[P,y,m]);const v=f=>{const o=d.current;if(!o)return{x:.5,y:.5};const e=o.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(f.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(f.clientY-e.top)/Math.max(1,e.height)))}};return p.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:b,onClick:b?void 0:(()=>{var f,o,e,r;(o=(f=w.current)==null?void 0:f.reset)==null||o.call(f),(r=(e=w.current)==null?void 0:e.start)==null||r.call(e)}),onPointerDown:b?void 0:f=>{var e,r;l.current=f.pointerId,C.current=f.pointerType||"mouse";try{f.currentTarget.setPointerCapture(f.pointerId)}catch{}const o=v(f);(r=(e=w.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onPointerMove:b?void 0:f=>{var e,r;if(l.current!=null&&f.pointerId!==l.current)return;const o=v(f);(r=(e=w.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onPointerUp:b?void 0:f=>{var o,e;l.current!=null&&f.pointerId!==l.current||(l.current=null,(f.pointerType||C.current)==="mouse"&&((e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)))},onPointerCancel:b?void 0:(()=>{var f,o;l.current=null,C.current==="mouse"&&((o=(f=w.current)==null?void 0:f.clearPointer)==null||o.call(f))}),onMouseMove:b?void 0:f=>{var e,r;const o=v(f);(r=(e=w.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onMouseLeave:b?void 0:(()=>{var f,o;l.current=null,(o=(f=w.current)==null?void 0:f.clearPointer)==null||o.call(f)}),onBlur:b?void 0:(()=>{var f,o;l.current=null,C.current="mouse",(o=(f=w.current)==null?void 0:f.clearPointer)==null||o.call(f)}),onKeyDown:b?void 0:(f=>{var o,e,r,t;(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),(e=(o=w.current)==null?void 0:o.reset)==null||e.call(o),(t=(r=w.current)==null?void 0:r.start)==null||t.call(r))}),children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function Tt({readyId:m,locked:b,onReady:y}){const d=a.useRef(null),g=a.useRef(null),w=a.useRef(null),k=a.useRef(!1),l=a.useRef(null),C=a.useRef(null),R=a.useRef(!1),P=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=a.useMemo(()=>({reduceMotion:P}),[P]);a.useEffect(()=>{const e=d.current,r=g.current;if(!e||!r)return;let t=!1,s=null,n=null,i=null;const c=()=>{k.current||(k.current=!0,y==null||y(m))},u=F(async()=>{var h,x;try{const M=await z(()=>import("./ropeLightEngine-ZZGO6u7c.js"),[]);if(t)return;s=M.createRopeLightEngine(r,v),w.current=s;const N=()=>$(e,s,Math.min(1.5,window.devicePixelRatio||1));N(),(h=s.renderStatic)==null||h.call(s),(x=s.start)==null||x.call(s),c(),n=new ResizeObserver(()=>{N()}),n.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(E=>{var S,j;for(const _ of E)_.isIntersecting?(S=s.start)==null||S.call(s):(j=s.stop)==null||j.call(s)},{threshold:.25}),i.observe(e))}catch{c()}},{timeoutMs:220});return()=>{var h;t=!0,u==null||u(),i==null||i.disconnect(),n==null||n.disconnect(),(h=s==null?void 0:s.destroy)==null||h.call(s),w.current=null}},[v,y,m]);const f=e=>{const r=d.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}},o=e=>{var t,s,n,i;if(R.current){R.current=!1;return}const r=e?f(e):{x:.5,y:.18};(s=(t=w.current)==null?void 0:t.toggleHangAt)==null||s.call(t,r.x,r.y),(i=(n=w.current)==null?void 0:n.start)==null||i.call(n)};return p.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:b,onClick:b?void 0:o,onPointerDown:b?void 0:e=>{var r,t;l.current=e.pointerId,R.current=!1,C.current=f(e);try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}(t=(r=w.current)==null?void 0:r.setPointer)==null||t.call(r,C.current.x,C.current.y)},onPointerMove:b?void 0:e=>{var s,n;if(l.current!=null&&e.pointerId!==l.current)return;const r=f(e),t=C.current;t&&Math.hypot(r.x-t.x,r.y-t.y)>.025&&(R.current=!0),(n=(s=w.current)==null?void 0:s.setPointer)==null||n.call(s,r.x,r.y)},onPointerUp:b?void 0:e=>{var r,t;if(!(l.current!=null&&e.pointerId!==l.current)){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}l.current=null,C.current=null,(t=(r=w.current)==null?void 0:r.clearPointer)==null||t.call(r)}},onPointerCancel:b?void 0:(e=>{var r,t;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}l.current=null,C.current=null,R.current=!1,(t=(r=w.current)==null?void 0:r.clearPointer)==null||t.call(r)}),onMouseMove:b?void 0:e=>{var t,s;const r=f(e);(s=(t=w.current)==null?void 0:t.setPointer)==null||s.call(t,r.x,r.y)},onMouseLeave:b?void 0:(()=>{var e,r;l.current=null,C.current=null,(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:b?void 0:(()=>{var e,r;l.current=null,C.current=null,R.current=!1,(r=(e=w.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:b?void 0:(e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),o())}),children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}const At=["rotateX(270deg) translateZ(0.5em)","rotateY(0deg) translateZ(0.5em)","rotateY(90deg) translateZ(0.5em)","rotateY(180deg) translateZ(0.5em)","rotateY(270deg) translateZ(0.5em)","rotateX(90deg) translateZ(0.5em)"],Oe=Array.from({length:28},(m,b)=>b);function Dt(){return p.jsx("div",{className:"article-web-art-soup-backdrop","aria-hidden":!0,children:Oe.map(m=>p.jsx("div",{className:"article-web-art-soup-cube",style:{animationDelay:`${m*.06}s`,fontSize:`${m+1}em`,"--soup-cube-depth":`${m/Math.max(1,Oe.length-1)}`},children:At.map((b,y)=>p.jsx("span",{className:"article-web-art-soup-face",style:{transform:b}},y))},m))})}function Ot({readyId:m,locked:b,onReady:y}){const d=a.useRef(null),g=a.useRef(null),w=a.useRef(null),k=a.useRef(!1),l=a.useRef(null),C=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=a.useMemo(()=>({reduceMotion:C}),[C]);a.useEffect(()=>{const v=d.current,f=g.current;if(!v||!f)return;let o=!1,e=null,r=null,t=null;const s=()=>{k.current||(k.current=!0,y==null||y(m))},n=F(async()=>{var i,c;try{const u=await z(()=>import("./soupShaderEngine-BVaccG7j.js"),__vite__mapDeps([8,1]));if(o)return;e=u.createSoupShaderEngine(f,R),w.current=e;const h=()=>$(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(i=e.renderStatic)==null||i.call(e),(c=e.start)==null||c.call(e),s(),r=new ResizeObserver(()=>{h()}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(x=>{var M,N;for(const E of x)E.isIntersecting?(M=e.start)==null||M.call(e):(N=e.stop)==null||N.call(e)},{threshold:.25}),t.observe(v))}catch{s()}},{timeoutMs:220});return()=>{var i;o=!0,n==null||n(),t==null||t.disconnect(),r==null||r.disconnect(),(i=e==null?void 0:e.destroy)==null||i.call(e),w.current=null}},[R,y,m]);const P=v=>{const f=d.current;if(!f)return{x:.5,y:.5};const o=f.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(v.clientX-o.left)/Math.max(1,o.width))),y:Math.max(0,Math.min(1,(v.clientY-o.top)/Math.max(1,o.height)))}};return p.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile","aria-label":"Soup shader web art tile",disabled:b,onPointerDown:b?void 0:v=>{var o,e,r,t;l.current=v.pointerId;try{v.currentTarget.setPointerCapture(v.pointerId)}catch{}const f=P(v);(e=(o=w.current)==null?void 0:o.setPointer)==null||e.call(o,f.x,f.y),(t=(r=w.current)==null?void 0:r.setHeld)==null||t.call(r,!0)},onPointerMove:b?void 0:v=>{var o,e;if(l.current!=null&&v.pointerId!==l.current)return;const f=P(v);(e=(o=w.current)==null?void 0:o.setPointer)==null||e.call(o,f.x,f.y)},onPointerUp:b?void 0:v=>{var f,o;l.current!=null&&v.pointerId!==l.current||(l.current=null,(o=(f=w.current)==null?void 0:f.setHeld)==null||o.call(f,!1))},onPointerCancel:b?void 0:(()=>{var v,f;l.current=null,(f=(v=w.current)==null?void 0:v.setHeld)==null||f.call(v,!1)}),onMouseMove:b?void 0:v=>{var o,e;const f=P(v);(e=(o=w.current)==null?void 0:o.setPointer)==null||e.call(o,f.x,f.y)},onMouseLeave:b?void 0:(()=>{var v,f,o,e;l.current=null,(f=(v=w.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:b?void 0:(()=>{var v,f,o,e;l.current=null,(f=(v=w.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(o=w.current)==null?void 0:o.clearPointer)==null||e.call(o)}),children:[p.jsx(Dt,{}),p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function Ht({readyId:m,locked:b,onReady:y}){const d=a.useRef(null),g=a.useRef(null),w=a.useRef(null),k=a.useRef(!1),l=a.useRef(null),C=a.useRef(null),R=a.useRef(0),[P,v]=a.useState(!1),[f,o]=a.useState([]),e=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=a.useMemo(()=>({reduceMotion:e}),[e]);a.useEffect(()=>{const i=d.current,c=g.current;if(!i||!c)return;let u=!1,h=null,x=null,M=null;const N=()=>{k.current||(k.current=!0,y==null||y(m))},E=F(async()=>{var S,j;try{const _=await z(()=>import("./tardisWormholeEngine-Czkyopnk.js"),__vite__mapDeps([9,1]));if(u)return;h=_.createTardisWormholeEngine(c,r),w.current=h;const L=()=>$(i,h,Math.min(1.5,window.devicePixelRatio||1));L(),(S=h.renderStatic)==null||S.call(h),(j=h.start)==null||j.call(h),N(),x=new ResizeObserver(()=>{L()}),x.observe(i),"IntersectionObserver"in window&&(M=new IntersectionObserver(T=>{var O,B;for(const q of T)q.isIntersecting?(O=h.start)==null||O.call(h):(B=h.stop)==null||B.call(h)},{threshold:.25}),M.observe(i))}catch{N()}},{timeoutMs:220});return()=>{var S;u=!0,E==null||E(),M==null||M.disconnect(),x==null||x.disconnect(),(S=h==null?void 0:h.destroy)==null||S.call(h),w.current=null}},[r,y,m]),a.useEffect(()=>{if(f.length===0)return;const i=window.setTimeout(()=>{o(c=>c.slice(1))},1e3);return()=>{window.clearTimeout(i)}},[f]),a.useEffect(()=>{var c,u,h;const i=w.current;if(i){if(b){v(!1),C.current=null,(c=i.clearPointer)==null||c.call(i),(u=i.stop)==null||u.call(i);return}(h=i.start)==null||h.call(i)}},[b]);const t=i=>{const c=d.current,u=g.current||c;if(!c||!u)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const h=u.getBoundingClientRect(),x=c.getBoundingClientRect(),M=Math.max(0,Math.min(x.width,i.clientX-x.left)),N=Math.max(0,Math.min(x.height,i.clientY-x.top)),E=Math.max(0,Math.min(h.width,i.clientX-h.left)),S=Math.max(0,Math.min(h.height,i.clientY-h.top)),j=C.current,_=j?E-j.px:0,L=j?S-j.py:0;return C.current={px:E,py:S},{x:h.width>0?E/h.width:.5,y:h.height>0?S/h.height:.5,px:M,py:N,dx:_,dy:L}},s=(i,c)=>{const u=R.current++;o(h=>[...h,{id:u,x:i,y:c}])},n=i=>{var u,h,x,M;const c=t(i);s(c.px,c.py),(h=(u=w.current)==null?void 0:u.boost)==null||h.call(u),(M=(x=w.current)==null?void 0:x.start)==null||M.call(x),v(!0),window.setTimeout(()=>{v(!1)},650)};return p.jsxs("button",{type:"button",ref:d,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${P?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:b,onClick:b?void 0:n,onContextMenu:b?void 0:(i=>{var u,h,x,M;i.preventDefault();const c=t(i);s(c.px,c.py),(h=(u=w.current)==null?void 0:u.reverseBurst)==null||h.call(u),(M=(x=w.current)==null?void 0:x.start)==null||M.call(x)}),onWheel:b?void 0:(i=>{var c,u;(u=(c=w.current)==null?void 0:c.addScrollBoost)==null||u.call(c,i.deltaY*.003)}),onPointerDown:b?void 0:i=>{var u,h;l.current=i.pointerId;try{i.currentTarget.setPointerCapture(i.pointerId)}catch{}const c=t(i);(h=(u=w.current)==null?void 0:u.setPointer)==null||h.call(u,c.x,c.y,c.dx,c.dy)},onPointerMove:b?void 0:i=>{var u,h,x,M;if(l.current!=null&&i.pointerId!==l.current)return;const c=t(i);(h=(u=w.current)==null?void 0:u.setPointer)==null||h.call(u,c.x,c.y,c.dx,c.dy),(i.buttons&1)===1&&((M=(x=w.current)==null?void 0:x.drag)==null||M.call(x,c.dx))},onPointerUp:b?void 0:i=>{l.current!=null&&i.pointerId!==l.current||(l.current=null)},onPointerCancel:b?void 0:(()=>{l.current=null}),onMouseMove:b?void 0:i=>{var u,h;const c=t(i);(h=(u=w.current)==null?void 0:u.setPointer)==null||h.call(u,c.x,c.y,c.dx,c.dy)},onMouseLeave:b?void 0:(()=>{var i,c;l.current=null,C.current=null,(c=(i=w.current)==null?void 0:i.clearPointer)==null||c.call(i)}),onBlur:b?void 0:(()=>{var i,c;l.current=null,C.current=null,(c=(i=w.current)==null?void 0:i.clearPointer)==null||c.call(i)}),onKeyDown:b?void 0:(i=>{var c,u,h,x;(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),(u=(c=w.current)==null?void 0:c.boost)==null||u.call(c),(x=(h=w.current)==null?void 0:h.start)==null||x.call(h))}),children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),f.map(i=>p.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${i.x}px`,top:`${i.y}px`},"aria-hidden":!0},i.id)),p.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function Bt({label:m,clickLabel:b,previewRequested:y=!1}){const d=He(),g=a.useRef(null),[w,k]=a.useState(!1),[l,C]=a.useState(0),R=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=a.useCallback(()=>{C(Date.now()),k(!0)},[]),v=a.useCallback(()=>{d.navigateToSectionWithId("contact")},[d]),f=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),P())},o=a.useMemo(()=>w?lt({seed:`${l||Date.now()}:${m}`,reduceMotion:R}):"",[m,w,l,R]);return a.useEffect(()=>{let e=0,r=0;return y?(e=window.requestAnimationFrame(()=>{r=window.requestAnimationFrame(()=>{C(Date.now()),k(!0)})}),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)}):(k(!1),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)})},[y]),p.jsxs("div",{ref:g,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${w?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":w?"Kontakt preview":m,"aria-pressed":w,onClick:P,onKeyDown:f,children:[p.jsxs("div",{className:`article-web-art-tile-cta-preview ${w?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[w&&p.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:o,sandbox:"allow-scripts"},`${l}-${m}`),p.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!w&&p.jsx("div",{className:`loader ${R?"loader-reduce-motion":""}`,"aria-hidden":!0,children:p.jsxs("div",{className:"loader-inner",children:[p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})})]})}),p.jsxs("div",{className:`article-web-art-tile-cta-content ${w?"article-web-art-tile-cta-content-hidden":""}`,children:[p.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:m}),p.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:b})]}),w&&p.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),v()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),v())},children:"Kontakt"})]})}function zt({readyId:m,locked:b=!1,onReady:y}){const d=a.useRef(null),g=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),w=a.useRef(!1),k=a.useRef(0),l=a.useRef(null),C=a.useRef(null),R=a.useRef(1),P=a.useRef(null),v=a.useRef(null),f=a.useRef(null),o=a.useRef([]);return a.useEffect(()=>{y==null||y(m)},[y,m]),a.useEffect(()=>{const e=d.current;if(!e)return;const r=S=>{const j=Math.max(0,Math.min(1,S));return j*j*(3-2*j)},t=()=>{if(o.current.length)return o.current.filter(_=>_.playState!=="idle");const S=e.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),j=[];for(const _ of S){const L=_.getAnimations?_.getAnimations():[];for(const T of L)j.push(T)}return o.current=j,o.current},s=S=>{const j=Math.max(1,Math.min(5.2,Number(S)||1));R.current=j;const _=t();for(const L of _)L.playbackRate=L.animationName==="wiggle-end"?Math.min(j,2.6):j},n=()=>{v.current!=null&&cancelAnimationFrame(v.current),f.current!=null&&window.clearTimeout(f.current),v.current=null,f.current=null},i=()=>{n(),s(5.2),f.current=window.setTimeout(()=>{const S=R.current,j=performance.now(),_=320,L=()=>{const T=(performance.now()-j)/_,O=r(T);s(S+(1-S)*O),T<1?v.current=requestAnimationFrame(L):v.current=null};v.current=requestAnimationFrame(L),f.current=null},2e3)},c=()=>{var O;const S=l.current;if(w.current=!1,l.current=null,e.classList.remove("article-web-art-tile-goldfish-held"),C.current!=null&&cancelAnimationFrame(C.current),C.current=null,S!=null&&((O=e.hasPointerCapture)!=null&&O.call(e,S)))try{e.releasePointerCapture(S)}catch{}const j=R.current,_=360,L=performance.now();P.current!=null&&cancelAnimationFrame(P.current);const T=()=>{const B=(performance.now()-L)/_,q=r(B);s(j+(1-j)*q),B<1?P.current=requestAnimationFrame(T):P.current=null};P.current=requestAnimationFrame(T)},u=()=>{w.current&&c()},h=()=>{if(!w.current)return;const S=performance.now()-k.current,j=1.2+4*r(S/2400);s(j),C.current=requestAnimationFrame(h)},x=S=>{if(!(g||b)&&!(S.button!=null&&S.button!==0)&&!(w.current&&l.current!==S.pointerId)){n(),w.current=!0,k.current=performance.now(),l.current=S.pointerId,e.classList.add("article-web-art-tile-goldfish-held");try{e.setPointerCapture(S.pointerId)}catch{}P.current!=null&&(cancelAnimationFrame(P.current),P.current=null),C.current==null&&(C.current=requestAnimationFrame(h))}},M=S=>{if(l.current!==S.pointerId)return;const j=performance.now()-k.current;c(),j<220&&i()},N=S=>{l.current===S.pointerId&&u()},E=S=>{l.current===S.pointerId&&u()};return e.addEventListener("pointerdown",x),e.addEventListener("pointerup",M),e.addEventListener("pointercancel",N),e.addEventListener("lostpointercapture",E),()=>{e.removeEventListener("pointerdown",x),e.removeEventListener("pointerup",M),e.removeEventListener("pointercancel",N),e.removeEventListener("lostpointercapture",E),u(),n(),P.current!=null&&cancelAnimationFrame(P.current),P.current=null,o.current=[]}},[b,g]),a.useEffect(()=>{const e=d.current;e&&e.classList.toggle("article-web-art-tile-goldfish-locked",b)},[b]),p.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:d,role:"img","aria-label":"Goldfish animation tile",children:[p.jsx("div",{className:"fish-stage",children:p.jsx("div",{className:"fish-wrapper",children:p.jsx("div",{className:"fish-container",children:p.jsxs("div",{className:"fish-parts",children:[p.jsx("div",{className:"fish-body front"}),p.jsx("div",{className:"fish-body back"}),p.jsx("div",{className:"fish-back-bottom-fin front"}),p.jsx("div",{className:"fish-back-bottom-fin back"}),p.jsx("div",{className:"fish-back-fin"}),p.jsx("div",{className:"fish-front-bottom-fin front"}),p.jsx("div",{className:"fish-front-bottom-fin back"}),p.jsx("div",{className:"fish-top-fin"})]})})})}),p.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function $t({locked:m=!1}){const b=a.useRef(null),y=a.useRef([]),d=a.useRef(0),g=a.useRef(0),w=st,k=a.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return a.useEffect(()=>{const l=b.current;if(!l)return;const C=y.current.filter(Boolean);if(!C.length)return;let R=!0,P=!1,v=null,f=null;const o=(x,M)=>{const N=(x-.5)*30;for(let E=0;E<C.length;E++){const S=C[E],j=E*18,_=E*8,L=(x-.5)*j,T=(M-.5)*_;S.style.transform=`translate3d(${L}px, ${T}px, 0) rotateY(${N}deg)`}},e=(x,M)=>{const N=Math.max(-.55,Math.min(.55,(x-.5)*1.1)),E=Math.max(-.35,Math.min(.35,(M-.5)*.7));o(.5+N,.5+E)},r=x=>{const M=l.getBoundingClientRect(),N=(x.clientX-M.left)/Math.max(1,M.width),E=(x.clientY-M.top)/Math.max(1,M.height);R=!0,g.current=performance.now()+650,e(Math.max(0,Math.min(1,N)),Math.max(0,Math.min(1,E)))},t=x=>{const M=l.getBoundingClientRect(),N=(x.clientX-M.left)/Math.max(1,M.width),E=(x.clientY-M.top)/Math.max(1,M.height);return{x:Math.max(0,Math.min(1,N)),y:Math.max(0,Math.min(1,E))}},s=x=>{if(x.pointerType==="mouse")return;P=!0,v=x.pointerId,R=!0,g.current=performance.now()+900;const M=t(x);e(M.x,M.y),!k&&f==null&&(f=requestAnimationFrame(h))},n=x=>{if(!P||v!=null&&x.pointerId!==v)return;R=!0,g.current=performance.now()+900;const M=t(x);e(M.x,M.y)},i=x=>{v!=null&&(x==null?void 0:x.pointerId)!=null&&x.pointerId!==v||(P=!1,v=null,R=!0,!k&&f==null&&(f=requestAnimationFrame(h)))},c=()=>{R=!0,!k&&f==null&&(f=requestAnimationFrame(h))},u=()=>{R=!0,!k&&f==null&&(f=requestAnimationFrame(h))},h=()=>{if(R){if(!k&&performance.now()>=g.current){d.current+=.008;const x=Math.sin(d.current)*.5+.5;e(x,.5)}f=requestAnimationFrame(h)}};return R=!m,l.addEventListener("mouseenter",c),l.addEventListener("mousemove",r),l.addEventListener("mouseleave",u),l.addEventListener("pointerdown",s),l.addEventListener("pointermove",n),l.addEventListener("pointerup",i),l.addEventListener("pointercancel",i),e(.5,.5),!k&&!m&&(f=requestAnimationFrame(h)),()=>{l.removeEventListener("mouseenter",c),l.removeEventListener("mousemove",r),l.removeEventListener("mouseleave",u),l.removeEventListener("pointerdown",s),l.removeEventListener("pointermove",n),l.removeEventListener("pointerup",i),l.removeEventListener("pointercancel",i),f!=null&&cancelAnimationFrame(f)}},[k]),p.jsxs("div",{ref:b,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[p.jsxs("div",{className:"patronus-card",children:[p.jsx("div",{className:"patronus-layer patronus-bg",ref:l=>{y.current[0]=l},children:p.jsx("img",{alt:"",src:w[0]})}),p.jsx("div",{className:"patronus-layer",ref:l=>{y.current[1]=l},children:p.jsx("img",{alt:"",src:w[1]})}),p.jsx("div",{className:"patronus-layer",ref:l=>{y.current[2]=l},children:p.jsx("img",{alt:"",src:w[2]})}),p.jsx("div",{className:"patronus-layer patronus-svg",ref:l=>{y.current[3]=l},dangerouslySetInnerHTML:{__html:Qe}}),p.jsx("div",{className:"patronus-layer",ref:l=>{y.current[4]=l},children:p.jsx("img",{alt:"",src:w[3]})}),p.jsx("div",{className:"patronus-layer",ref:l=>{y.current[5]=l},children:p.jsx("img",{alt:"",src:w[4]})}),p.jsx("div",{className:"patronus-layer",ref:l=>{y.current[6]=l},children:p.jsx("img",{alt:"",src:w[5]})})]}),p.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{Yt as default};
