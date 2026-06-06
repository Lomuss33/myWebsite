const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/androidBackgroundEngine-HmTe5YFf.js","assets/three-Dyw0HQ4s.js","assets/hourglassEngine-PtKKZ_Fz.js","assets/physics-hk55N7G6.js","assets/react-vendor-D1LkQUJD.js","assets/threeTunnelEngine-BYxOaRL9.js","assets/threePolygonDemo5Engine-J7VS_NUu.js","assets/prismFieldEngine-BQpxImA_.js","assets/soupShaderEngine-BVaccG7j.js","assets/tardisWormholeEngine-Czkyopnk.js"])))=>i.map(i=>d[i]);
import{d as Ne,i as ve,A as ue,n as H}from"./index-B8OHBKuK.js";import{r as c,j as p}from"./react-vendor-D1LkQUJD.js";/* empty css              */import"./bootstrap-D4PVSYgB.js";import"./vendor-BWbgyn18.js";const je=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`,Ee=`function Mash(seed) {
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
`;function $(m,{timeoutMs:h=1200}={}){if(typeof window>"u")return m(),()=>{};if("requestIdleCallback"in window){const u=window.requestIdleCallback(()=>m(),{timeout:h});return()=>window.cancelIdleCallback(u)}const R=window.setTimeout(()=>m(),0);return()=>window.clearTimeout(R)}function de(m){var a,C,M,P;if(!m)return{width:1,height:1};const h=m.getBoundingClientRect(),R=(C=(a=m.parentElement)==null?void 0:a.getBoundingClientRect)==null?void 0:C.call(a),u=(R==null?void 0:R.width)||((M=m.parentElement)==null?void 0:M.clientWidth)||1,g=(R==null?void 0:R.height)||((P=m.parentElement)==null?void 0:P.clientHeight)||u,x=Math.max(1,Math.round(h.width||m.clientWidth||u)),I=Math.max(1,Math.round(h.height||m.clientHeight||g));return{width:x,height:I}}function z(m,h,R=1){var a,C,M;const{width:u,height:g}=de(m),x=typeof window<"u"&&((C=(a=window.matchMedia)==null?void 0:a.call(window,"(pointer: coarse)"))==null?void 0:C.matches),I=Math.min(x?1:1.5,Math.max(1,Number(R)||1));if((u<32||g<32)&&typeof window<"u"){window.requestAnimationFrame(()=>{var v;const P=de(m);P.width>=32&&P.height>=32&&((v=h==null?void 0:h.setSize)==null||v.call(h,P.width,P.height,I))});return}(M=h==null?void 0:h.setSize)==null||M.call(h,u,g,I)}function fe(m,h,R="smooth"){if(typeof window>"u")return;const u=document.getElementById(m),g=document.getElementById(`scrollable-${h}`);if(!u||!g)return;const x=u.getBoundingClientRect(),I=g.getBoundingClientRect(),a=g.scrollTop+(x.top-I.top);g.scrollTo({top:Math.max(0,a),behavior:R})}const _e=9,Te=9,Le=10,De=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],ye=6,Ae=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function ne(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(pointer: coarse), (max-width: 767px)").matches}function he(m){const h=new Set(m);if(!ne())return h;for(;h.size>ye;)h.delete(h.values().next().value);return h}function re(m){if(!ne())return new Set(m);const h=new Set;for(const R of m){if(h.size>=ye)break;h.add(R)}return h}function be(m,h){if(h.size===0)return!1;for(const R of h)if(!m.has(R))return!1;return!0}function Oe(m=_e,h=Te,R=Le){const u=m*h,g=Math.max(1,Math.min(R,u-1)),x=new Set;for(;x.size<g;)x.add(Math.floor(Math.random()*u));const I=new Array(u).fill(0);for(let a=0;a<u;a++){if(x.has(a)){I[a]=-1;continue}const C=a%h,M=Math.floor(a/h);let P=0;for(let v=-1;v<=1;v++)for(let f=-1;f<=1;f++){if(f===0&&v===0)continue;const n=C+f,e=M+v;n<0||e<0||n>=h||e>=m||x.has(e*h+n)&&(P+=1)}I[a]=P}return{rows:m,cols:h,mineCount:g,mines:x,counts:I}}function Be(m,h,R,u){const g=new Set(R),x=[m];for(;x.length>0;){const I=x.pop();if(I==null||g.has(I)||u.has(I)||h.mines.has(I)||(g.add(I),h.counts[I]!==0))continue;const a=I%h.cols,C=Math.floor(I/h.cols);for(let M=-1;M<=1;M++)for(let P=-1;P<=1;P++){if(P===0&&M===0)continue;const v=a+P,f=C+M;v<0||f<0||v>=h.cols||f>=h.rows||x.push(f*h.cols+v)}}return g}function pe(m,h,R){const u=m.rows*m.cols-m.mineCount;if(h.size>=u)return!0;if(R.size!==m.mineCount)return!1;for(const g of m.mines)if(!R.has(g))return!1;return!0}function He(m){return`Web art ${String(m||"tile").toLowerCase()} tile loading`}function ze({seed:m,reduceMotion:h}){const R=JSON.stringify(Ee.split("<\/script>").join("<\\/script>")),u=JSON.stringify(m);return`<!doctype html>
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
    reduceMotion: ${h?"true":"false"},
    seed: ${u}
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
</html>`}function me(m){return Array.isArray(m)?m.map((h,R)=>{const u=h!=null&&h.tone?` article-web-art-intro-guide-fragment-${h.tone}`:"";return p.jsx("span",{className:`article-web-art-intro-guide-fragment${u}`,children:h==null?void 0:h.text},`${(h==null?void 0:h.text)||"fragment"}-${R}`)}):m}function Ct({dataWrapper:m,id:h}){var ce;const R=Ne(),u=ve(),g=`${m.uniqueId}-ambient-trace`,x=`${m.uniqueId}-ambient-hex`,I=`${m.uniqueId}-ambient-plop`,a=`${m.uniqueId}-ambient-julia`,C=`${m.uniqueId}-ambient-mines`,M=`${m.uniqueId}-ambient-rings`,P=`${m.uniqueId}-ambient-prism`,v=`${m.uniqueId}-ambient-rope`,f=`${m.uniqueId}-ambient-soup`,n=`${m.uniqueId}-ambient-tardis`,[e,r]=c.useState(null),[t,o]=c.useState(!0),s=c.useMemo(()=>m.orderedItems,[m.orderedItems]),i=c.useMemo(()=>{const N=[4,5,3,6,1,2,7,8,9,10,11,12,13,14,15],D=new Map(s.map(B=>[Number(B==null?void 0:B.id),B])),L=[];for(const B of N){const q=D.get(B);q&&L.push(q)}for(const B of s){if(!B)continue;const q=Number(B==null?void 0:B.id);N.includes(q)||L.push(B)}return L},[s]),d=c.useRef(null),[l,b]=c.useState(!1),w=c.useRef(new Set),y=c.useRef(new Map),[k,S]=c.useState(0),[j,E]=c.useState(-1),[_,T]=c.useState(()=>new Set),[A,O]=c.useState(()=>new Set),[K,G]=c.useState(!1),Y=c.useMemo(()=>{const N=i.map(D=>D==null?void 0:D.uniqueId).filter(Boolean);return N.push(g,x,I,a,C,P,M,v,f,n,"ambient-goldfish","ambient-patronus"),new Set(N)},[x,a,C,I,P,M,v,f,n,g,i]),U=c.useMemo(()=>Array.from(A).filter(N=>N!=="ambient-goldfish"&&N!=="ambient-patronus"),[A]),F=t,Z=R.selectedLanguageId||"en";let J=R.getString("send_yours");typeof J=="string"&&J.startsWith("locale:")&&(J={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[Z]||"Send yours!");let Q=R.getString("click");typeof Q=="string"&&Q.startsWith("locale:")&&(Q={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[Z]||"Click");const se={en:{title:"Doors of the world behind an amazing art gallery.",guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",guide:{eyebrow:"So funktioniert es",lines:["Betritt die Galerie und schau dir die Karten in Ruhe an.","Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.","Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."]},button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",guide:{eyebrow:"Kako istraživati",lines:["Uđi u galeriju i istražuj kartice svojim tempom.","Klikni, dodirni ili pritisni karticu da otkriješ što skriva.","Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme."]},button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",guide:{eyebrow:"Nasıl gezilir",lines:["Galeriye girin ve kartları kendi temponuzda inceleyin.","İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.","Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir."]},button:"Gir",preparing:"Hazırlanıyor..."}}[Z]||{guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter"},Me="hide",V=c.useCallback(N=>{if(!N||w.current.has(N))return;w.current.add(N);const D=y.current.get(N);D!=null&&(window.clearTimeout(D),y.current.delete(N)),S(w.current.size)},[]),ie=c.useCallback(N=>{N&&O(D=>{if(D.has(N))return D;const L=new Set(D);return L.add(N),he(L)})},[]),W=c.useCallback(()=>{for(const N of y.current.values())window.clearTimeout(N);y.current=new Map,w.current=new Set,S(0),E(-1),b(!1),T(new Set),O(new Set),G(!1)},[]),ee=c.useCallback(()=>{const N=re(Y);O(N),T(new Set(N)),G(!ne())},[Y]),te=c.useCallback(({openAll:N=!1}={})=>{if(o(!1),b(!0),E(i.length-1),N){ee();return}T(new Set),O(new Set),G(!1)},[i.length,ee]);c.useEffect(()=>{var le;if(typeof window>"u"||((le=u.targetSection)==null?void 0:le.id)!==m.sectionId||u.transitionStatus!=="transition_status_none")return;const N=window.__pendingSectionAction;if(!N||N.action!=="enter"||N.sectionId!==m.sectionId||N.targetArticleId&&N.targetArticleId!==m.uniqueId)return;if(Date.now()-(N.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,te({openAll:!0});const D=N.targetArticleId||m.uniqueId;let L=null,B=null,q=null,X=null;return L=window.setTimeout(()=>{B=window.requestAnimationFrame(()=>{fe(D,m.sectionId),q=window.setTimeout(()=>{X=window.requestAnimationFrame(()=>{fe(D,m.sectionId)})},220)})},90),()=>{L!==null&&window.clearTimeout(L),B!==null&&window.cancelAnimationFrame(B),q!==null&&window.clearTimeout(q),X!==null&&window.cancelAnimationFrame(X)}},[m.uniqueId,m.sectionId,(ce=u.targetSection)==null?void 0:ce.id,u.transitionStatus,te]);const oe=c.useCallback(N=>{N&&(ie(N),T(D=>{if(D.has(N))return D;const L=new Set(D);return L.add(N),he(L)}))},[ie]),ae=c.useCallback(N=>{N&&(T(D=>{if(!D.has(N))return D;const L=new Set(D);return L.delete(N),L}),O(D=>{if(!D.has(N))return D;const L=new Set(D);return L.delete(N),L}))},[]),Re=re(Y),ge=be(_,Re),Ce=c.useCallback(()=>{const N=re(Y);if(be(_,N)){T(new Set),O(new Set),G(!1);return}ee()},[Y,ee,_]),Pe=c.useCallback(()=>{W(),o(!0)},[W]),Ie=(N,D)=>{const L=Number(N==null?void 0:N.id);return L===1?"Hover":L===2?"Wave":L===3?"3D":L===4?"Poly":L===5?"Click":L===6?"Orbit":L===7?"Spin":L===8?"Shape":L===9?"Hourglass":L===10?"Noice":L===11?"Distance":L===12?"Android":L===13?"Pulse":L===14?"Bars":L===15?"Deep":String(D+1)},ke=i.map((N,D)=>{if(!l)return p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${D+1} loading`},N.uniqueId);const L=N.uniqueId,B=_.has(L),q=A.has(L)||B;return p.jsx(we,{label:Ie(N,D),isOpen:B,onToggle:()=>{B?ae(L):oe(L)},shouldRender:q,children:q&&p.jsx(Fe,{itemWrapper:N,index:D,locked:F||!B,activate:D<=j,onReady:V})},L)}),Se=l?[{key:"ambient-trace",tileId:g,label:"Trace",render:N=>p.jsx(st,{readyId:g,locked:F||!N,onReady:V})},{key:"ambient-hex",tileId:x,label:"Hex",render:N=>p.jsx(it,{readyId:x,locked:F||!N,onReady:V})},{key:"ambient-plop",tileId:I,label:"Plop",render:N=>p.jsx(ot,{readyId:I,locked:F||!N,onReady:V})},{key:"ambient-julia",tileId:a,label:"Julia",render:N=>p.jsx(at,{readyId:a,locked:F||!N,onReady:V})},{key:"ambient-mines",tileId:C,label:"Bomb",render:N=>p.jsx(ct,{readyId:C,locked:F||!N,onReady:V})},{key:"ambient-rings",tileId:M,label:"Fall",render:N=>p.jsx(lt,{readyId:M,locked:F||!N,onReady:V})},{key:"ambient-prism",tileId:P,label:"Prism",render:N=>p.jsx(ut,{readyId:P,locked:F||!N,onReady:V})},{key:"ambient-rope",tileId:v,label:"Rope",render:N=>p.jsx(dt,{readyId:v,locked:F||!N,onReady:V})},{key:"ambient-soup",tileId:f,label:"Soup",render:N=>p.jsx(bt,{readyId:f,locked:F||!N,onReady:V})},{key:"ambient-tardis",tileId:n,label:"Tardis",render:N=>p.jsx(pt,{readyId:n,locked:F||!N,onReady:V})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:N=>p.jsx(wt,{locked:F||!N})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:N=>p.jsx(xt,{locked:F||!N})}].map(({key:N,tileId:D,label:L,render:B})=>{const q=_.has(D),X=A.has(D)||q;return p.jsx(we,{label:L,isOpen:q,onToggle:()=>{q?ae(D):oe(D)},shouldRender:X,children:X&&B(q)},N)}):[p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return c.useEffect(()=>{W()},[m.uniqueId,W]),c.useEffect(()=>{l&&E(i.length-1)},[l,i.length]),c.useEffect(()=>{if(l)for(const N of U){if(!N||w.current.has(N)||y.current.has(N))continue;const D=window.setTimeout(()=>{V(N)},12e3);y.current.set(N,D)}},[l,U,V]),p.jsx(ue,{id:m.uniqueId,type:ue.Types.SPACING_DEFAULT,dataWrapper:m,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:r,children:p.jsxs("div",{className:"article-web-art-shell",children:[p.jsx($e,{guide:se.guide,buttonLabel:t?se.button:Me,hidden:!t,onEnter:t?te:Pe,secondaryButtonLabel:t?null:"promaja",onSecondaryAction:t?null:Ce,secondaryPressed:ge}),p.jsx("div",{className:`article-web-art-stage ${t?"article-web-art-stage-preview":""}`,"aria-hidden":t,children:p.jsxs("div",{className:`article-web-art-items ${F?"article-web-art-items-locked":""}`,ref:d,"aria-busy":t,children:[l&&p.jsx(mt,{label:J,clickLabel:Q,previewRequested:K}),ke,Se]})})]})})}function $e({guide:m,buttonLabel:h,hidden:R,onEnter:u,secondaryButtonLabel:g=null,onSecondaryAction:x=null,secondaryPressed:I=!1}){const a=C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),u())};return p.jsx("div",{className:`article-web-art-intro-cover ${R?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:p.jsx("div",{className:"article-web-art-intro-cover-inner",children:p.jsx("div",{className:"article-web-art-intro-cover-actions",children:p.jsx("div",{className:`article-web-art-intro-guide ${R?"article-web-art-intro-guide-hidden":"article-web-art-intro-guide-open"}`,children:p.jsxs("div",{className:"article-web-art-intro-guide-inner",children:[p.jsxs("div",{className:"article-web-art-intro-guide-top-row",children:[p.jsxs("div",{className:"article-web-art-intro-guide-top-copy",children:[p.jsx("span",{className:"article-web-art-intro-guide-eyebrow",children:m.eyebrow}),p.jsx("p",{className:"article-web-art-intro-guide-line article-web-art-intro-guide-line-primary",children:me(m.lines[0])})]}),p.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[g?p.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${I?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:x||void 0,"aria-pressed":I,"aria-label":g,children:g}):null,p.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:u,onKeyDown:a,"aria-label":h,children:h})]})]}),p.jsx("div",{className:"article-web-art-intro-guide-lines",children:m.lines.slice(1).map((C,M)=>p.jsx("p",{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${M+2}`,children:me(C)},Array.isArray(C)?C.map(P=>P==null?void 0:P.text).join(""):C))})]})})})})})}function we({label:m,isOpen:h,onToggle:R,shouldRender:u=!0,children:g}){return p.jsxs("div",{className:`article-web-art-gated-tile ${h?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[u?g:p.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":He(m)}),p.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),p.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${h?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:R,"aria-label":`${h?"Hide":"Show"} ${m}`,children:m})]})}function Fe({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){return Number(m.id)===1?p.jsx(We,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===2?p.jsx(et,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===3?p.jsx(tt,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===4?p.jsx(rt,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===6?p.jsx(nt,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===7?p.jsx(Ve,{itemWrapper:m,locked:u,onReady:g}):Number(m.id)===8?p.jsx(Ye,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===9?p.jsx(Ue,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===10?p.jsx(Xe,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===11?p.jsx(qe,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===12?p.jsx(Ke,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===13?p.jsx(Qe,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===14?p.jsx(Ge,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):Number(m.id)===15?p.jsx(Ze,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g}):p.jsx(Je,{itemWrapper:m,index:h,activate:R,locked:u,onReady:g})}function qe({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(!0),P=c.useRef(null),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:54013+(Number(m.id)||11)*7331,reduceMotion:v}),[m.id,v]);c.useEffect(()=>{if(!R)return;const e=x.current,r=I.current;if(!e||!r)return;let t=!1,o=null,s=null,i=null;const d=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},l=$(async()=>{var b,w;try{const y=await H(()=>import("./distanceFieldEngine-DHTRwy4W.js"),[]);if(t)return;o=y.createDistanceFieldEngine(r,f),a.current=o;const k=()=>z(e,o,Math.min(1.5,window.devicePixelRatio||1));k(),(b=o.renderStatic)==null||b.call(o),u||(w=o.start)==null||w.call(o),d(),s=new ResizeObserver(()=>{k()}),s.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(S=>{var j,E,_,T;for(const A of S){if(M.current=!!A.isIntersecting,u){(j=o.setHoverActive)==null||j.call(o,!1),(E=o.stop)==null||E.call(o);continue}M.current?(_=o.start)==null||_.call(o):(T=o.stop)==null||T.call(o)}},{threshold:.25}),i.observe(e))}catch{d()}},{timeoutMs:220});return()=>{var b;t=!0,l==null||l(),i==null||i.disconnect(),s==null||s.disconnect(),(b=o==null?void 0:o.destroy)==null||b.call(o),a.current=null}},[R,f,m.uniqueId,u,g]),c.useEffect(()=>{var r,t,o,s;const e=a.current;if(e){if(u){(r=e.setHoverActive)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(o=e.stop)==null||o.call(e);return}M.current&&((s=e.start)==null||s.call(e))}},[u]);const n=e=>{const r=x.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return p.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${h+1}`,disabled:u,onPointerEnter:u?void 0:(()=>{var e,r,t,o;(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(o=(t=a.current)==null?void 0:t.start)==null||o.call(t)}),onPointerMove:u?void 0:(e=>{var t,o,s,i;const r=n(e);(o=(t=a.current)==null?void 0:t.setHoverActive)==null||o.call(t,!0),(i=(s=a.current)==null?void 0:s.setPointer)==null||i.call(s,r.x,r.y)}),onPointerLeave:u?void 0:(()=>{var e,r,t,o;P.current=null,(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(o=(t=a.current)==null?void 0:t.clearPointer)==null||o.call(t)}),onPointerDown:u?void 0:(e=>{var t,o,s,i,d,l;if(e.button!=null&&e.button!==0)return;P.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const r=n(e);(o=(t=a.current)==null?void 0:t.setHoverActive)==null||o.call(t,!0),(i=(s=a.current)==null?void 0:s.setPointer)==null||i.call(s,r.x,r.y),(l=(d=a.current)==null?void 0:d.boostPopulation)==null||l.call(d)}),onPointerUp:u?void 0:(e=>{P.current!=null&&e.pointerId!==P.current||(P.current=null)}),onPointerCancel:u?void 0:(()=>{var e,r,t,o;P.current=null,(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(o=(t=a.current)==null?void 0:t.clearPointer)==null||o.call(t)}),onFocus:u?void 0:(()=>{var e,r,t,o;(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(o=(t=a.current)==null?void 0:t.start)==null||o.call(t)}),onBlur:u?void 0:(()=>{var e,r,t,o;P.current=null,(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(o=(t=a.current)==null?void 0:t.clearPointer)==null||o.call(t)}),onKeyDown:u?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=a.current)==null?void 0:r.boostPopulation)==null||t.call(r))}),children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function Ke({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(null),M=c.useRef(null),P=c.useRef(!1),v=c.useRef(!0),f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!R)return;const e=x.current,r=I.current,t=a.current;if(!e||!r||!t)return;let o=!1,s=null,i=null,d=null,l=null;const b=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},w=$(async()=>{var y,k,S,j;try{const E=await H(()=>import("./androidBackgroundEngine-HmTe5YFf.js"),__vite__mapDeps([0,1])),_=await H(()=>import("./androidRobotEngine-CNxYykCI.js"),[]);if(o)return;s=E.createAndroidBackgroundEngine(r,{reduceMotion:f}),C.current=s,i=_.createAndroidRobotEngine(t,{reduceMotion:f}),M.current=i;const T=()=>{const A=Math.min(1.5,window.devicePixelRatio||1);z(e,s,A),z(e,i,A)};T(),(y=s.renderStatic)==null||y.call(s),(k=i.renderStatic)==null||k.call(i),u||(S=s.start)==null||S.call(s),u||(j=i.start)==null||j.call(i),b(),d=new ResizeObserver(()=>{T()}),d.observe(e),"IntersectionObserver"in window&&(l=new IntersectionObserver(A=>{var O,K,G,Y,U,F;for(const Z of A){if(v.current=!!Z.isIntersecting,u){(O=s.stop)==null||O.call(s),(K=i.stop)==null||K.call(i);continue}v.current?((G=s.start)==null||G.call(s),(Y=i.start)==null||Y.call(i)):((U=s.stop)==null||U.call(s),(F=i.stop)==null||F.call(i))}},{threshold:.2}),l.observe(e))}catch{b()}},{timeoutMs:220});return()=>{var y,k;o=!0,w==null||w(),l==null||l.disconnect(),d==null||d.disconnect(),(y=s==null?void 0:s.destroy)==null||y.call(s),(k=i==null?void 0:i.destroy)==null||k.call(i),C.current=null,M.current=null}},[R,m.uniqueId,u,g,f]),c.useEffect(()=>{var t,o,s,i,d;const e=M.current,r=C.current;if(!(!e||!r)){if(u){(t=e.clearPointer)==null||t.call(e),(o=r.stop)==null||o.call(r),(s=e.stop)==null||s.call(e);return}v.current&&((i=r.start)==null||i.call(r),(d=e.start)==null||d.call(e))}},[u]);const n=e=>{const r=x.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return p.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android","aria-label":`Android web art tile ${h+1}`,disabled:u,onPointerEnter:u?void 0:(()=>{var e,r;(r=(e=M.current)==null?void 0:e.start)==null||r.call(e)}),onPointerMove:u?void 0:(e=>{var t,o;const r=n(e);(o=(t=M.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)}),onPointerLeave:u?void 0:(()=>{var e,r;(r=(e=M.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onFocus:u?void 0:(()=>{var e,r;(r=(e=M.current)==null?void 0:e.start)==null||r.call(e)}),onBlur:u?void 0:(()=>{var e,r;(r=(e=M.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onClick:u?void 0:(()=>{var e,r;(r=(e=M.current)==null?void 0:e.poke)==null||r.call(e)}),onKeyDown:u?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=M.current)==null?void 0:r.poke)==null||t.call(r))}),children:[p.jsx("canvas",{ref:I,className:"article-web-art-android-bg-canvas","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-android-glow","aria-hidden":!0}),p.jsx("canvas",{ref:a,className:"article-web-art-android-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Android"})]})}function Ve({itemWrapper:m,locked:h,onReady:R}){const u=c.useRef(!1);c.useEffect(()=>{u.current||(u.current=!0,R==null||R(m.uniqueId))},[m.uniqueId,R]);const g=c.useMemo(()=>[{key:"stop",hoverMode:"stop",hoverDuration:"5s"},{key:"slow",hoverMode:"slow",hoverDuration:"18s"},{key:"super-fast",hoverMode:"super-fast",hoverDuration:"0.22s"},{key:"very-fast",hoverMode:"very-fast",hoverDuration:"0.55s"}],[]);return p.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${h?"article-web-art-spin-boxes-locked":""}`,children:p.jsx("div",{className:"article-web-art-spin-boxes-grid",children:g.map(({key:x,hoverDuration:I,hoverMode:a})=>p.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--spin-hover-duration":I},children:p.jsx("div",{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${a}`})},x))})})}function Ge({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(!1),I=50,a=c.useMemo(()=>["level-1","level-2","level-3","level-4","level-5"],[]),[C,M]=c.useState(0),P=a[C],v=c.useMemo(()=>Array.from({length:I},(n,e)=>{const r=`${3/(I/2)*(e+1)}s`;return{key:e,style:{animationDelay:r,"--bar-index":e}}}),[]),f=c.useCallback(n=>{var e,r;(e=n==null?void 0:n.preventDefault)==null||e.call(n),(r=n==null?void 0:n.stopPropagation)==null||r.call(n),M(t=>(t+1)%a.length)},[a.length]);return c.useEffect(()=>{R&&(x.current||(x.current=!0,g==null||g(m.uniqueId)))},[R,m.uniqueId,g]),p.jsx("button",{type:"button",className:"article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable","aria-label":`Bars web art tile ${h+1}, ${P.replace("level-","mode ")}`,disabled:u,onClick:u?void 0:f,onKeyDown:u?void 0:n=>{(n.key==="Enter"||n.key===" ")&&f(n)},children:p.jsx("div",{className:`article-web-art-bars-stage article-web-art-bars-stage-${P}`,children:p.jsx("div",{className:`article-web-art-bars article-web-art-bars-${P}`,children:v.map(n=>p.jsx("div",{className:"article-web-art-bars-panel",style:n.style},n.key))})})})}function Ye({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(!0),P=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=c.useMemo(()=>({seed:1729+(Number(m.id)||8)*4242,reduceMotion:P,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[m.id,P]);c.useEffect(()=>{if(!R)return;const t=x.current,o=I.current;if(!t||!o)return;let s=!1,i=null,d=null,l=null;const b=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},w=$(async()=>{var y,k,S;try{const j=await H(()=>import("./shapeFieldEngine-B_ToSidK.js"),[]);if(s)return;i=j.createShapeFieldEngine(o,v),a.current=i;const E=()=>z(t,i,window.devicePixelRatio||1);E(),(y=i.renderStatic)==null||y.call(i),(k=i.triggerWave)==null||k.call(i),u||(S=i.start)==null||S.call(i),b(),d=new ResizeObserver(()=>{var _;E(),(_=i.renderStatic)==null||_.call(i)}),d.observe(t),"IntersectionObserver"in window&&(l=new IntersectionObserver(_=>{var T,A,O;for(const K of _){if(M.current=!!K.isIntersecting,u){(T=i.stop)==null||T.call(i);continue}M.current?(A=i.start)==null||A.call(i):(O=i.stop)==null||O.call(i)}},{threshold:.2}),l.observe(t))}catch{b()}});return()=>{var y;s=!0,w==null||w(),l==null||l.disconnect(),d==null||d.disconnect(),(y=i==null?void 0:i.destroy)==null||y.call(i),a.current=null}},[R,v,m.uniqueId,u,g]),c.useEffect(()=>{var o,s,i;const t=a.current;if(t){if(u){(o=t.clearPointer)==null||o.call(t),(s=t.stop)==null||s.call(t);return}M.current&&((i=t.start)==null||i.call(t))}},[u]);const f=t=>{const o=I.current||x.current;if(!o)return{x:0,y:0};const s=o.getBoundingClientRect();return{x:t.clientX-s.left,y:t.clientY-s.top}},n=t=>{var s,i;const o=f(t);(i=(s=a.current)==null?void 0:s.setPointer)==null||i.call(s,o.x,o.y)},e=t=>{var s,i,d,l;const o=f(t);(i=(s=a.current)==null?void 0:s.setPointer)==null||i.call(s,o.x,o.y),(l=(d=a.current)==null?void 0:d.triggerWave)==null||l.call(d,o.x,o.y)},r=t=>{var o,s;t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),(s=(o=a.current)==null?void 0:o.triggerWave)==null||s.call(o))};return p.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${h+1}`,disabled:u,onPointerMove:u?void 0:n,onPointerDown:u?void 0:e,onPointerLeave:u?void 0:(()=>{var t,o;return(o=(t=a.current)==null?void 0:t.clearPointer)==null?void 0:o.call(t)}),onBlur:u?void 0:(()=>{var t,o;return(o=(t=a.current)==null?void 0:t.clearPointer)==null?void 0:o.call(t)}),onKeyDown:u?void 0:r,children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function Ue({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(!0),[P,v]=c.useState(2.8),[f,n]=c.useState(.01);c.useEffect(()=>{if(!R)return;const i=x.current,d=I.current;if(!i||!d)return;let l=!1,b=null,w=null,y=null;const k=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},S=$(async()=>{var j,E,_;try{const T=await H(()=>import("./hourglassEngine-PtKKZ_Fz.js"),__vite__mapDeps([2,3,4]));if(l)return;b=T.createHourglassEngine(d),a.current=b;const A=(j=b.getState)==null?void 0:j.call(b);A&&(v(A.gravity),n(A.neckRatio));const O=()=>z(i,b,window.devicePixelRatio||1);O(),(E=b.renderStatic)==null||E.call(b),u||(_=b.start)==null||_.call(b),k(),w=new ResizeObserver(()=>{var K;O(),(K=b.renderStatic)==null||K.call(b)}),w.observe(i),"IntersectionObserver"in window&&(y=new IntersectionObserver(K=>{var G,Y,U;for(const F of K){if(M.current=!!F.isIntersecting,u){(G=b.stop)==null||G.call(b);continue}M.current?(Y=b.start)==null||Y.call(b):(U=b.stop)==null||U.call(b)}},{threshold:.2}),y.observe(i))}catch{k()}});return()=>{var j;l=!0,S==null||S(),y==null||y.disconnect(),w==null||w.disconnect(),(j=b==null?void 0:b.destroy)==null||j.call(b),a.current=null}},[R,m.uniqueId,u,g]),c.useEffect(()=>{var d,l;const i=a.current;if(i){if(u){(d=i.stop)==null||d.call(i);return}M.current&&((l=i.start)==null||l.call(i))}},[u]);const e=i=>{var d,l;i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),(l=(d=a.current)==null?void 0:d.flip)==null||l.call(d))},r=i=>{i.stopPropagation()},t=i=>{i.stopPropagation()},o=i=>{var l,b;const d=Number(i.target.value);v(d),(b=(l=a.current)==null?void 0:l.setGravity)==null||b.call(l,d)},s=i=>{var l,b,w,y;const d=Number(i.target.value);n(d),(b=(l=a.current)==null?void 0:l.setNeckRatio)==null||b.call(l,d),!u&&M.current&&((y=(w=a.current)==null?void 0:w.start)==null||y.call(w))};return p.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass",role:u?void 0:"button",tabIndex:u?-1:0,"aria-label":`Hourglass web art tile ${h+1}`,onClick:u?void 0:(()=>{var i,d;return(d=(i=a.current)==null?void 0:i.flip)==null?void 0:d.call(i)}),onKeyDown:u?void 0:e,children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsxs("div",{className:"article-web-art-hourglass-controls",onClickCapture:t,onPointerDownCapture:t,onPointerUpCapture:t,onClick:r,onPointerDown:r,onPointerUp:r,onKeyDown:r,children:[p.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-left",children:[p.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Neck"}),p.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.01",max:"0.22",step:"0.001",value:f,onChange:s,disabled:u,"aria-label":"Hourglass neck size"})]}),p.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-right",children:[p.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Gravity"}),p.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.45",max:"2.8",step:"0.01",value:P,onChange:o,disabled:u,"aria-label":"Hourglass gravity"})]})]}),p.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function Xe({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(!0),P=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!R)return;const n=x.current,e=I.current;if(!n||!e)return;let r=!1,t=null,o=null,s=null;const i=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},d=$(async()=>{var l,b;try{const w=await H(()=>import("./noiceShaderEngine-6wwfZdln.js"),[]);if(r)return;t=w.createNoiceShaderEngine(e,{reduceMotion:P}),a.current=t;const y=()=>z(n,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),u||(b=t.start)==null||b.call(t),i(),o=new ResizeObserver(()=>{var k;y(),(k=t.renderStatic)==null||k.call(t)}),o.observe(n),"IntersectionObserver"in window&&(s=new IntersectionObserver(k=>{var S,j,E;for(const _ of k){if(M.current=!!_.isIntersecting,u){(S=t.stop)==null||S.call(t);continue}M.current?(j=t.start)==null||j.call(t):(E=t.stop)==null||E.call(t)}},{threshold:.25}),s.observe(n))}catch{i()}},{timeoutMs:220});return()=>{var l;r=!0,d==null||d(),s==null||s.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),a.current=null}},[R,m.uniqueId,u,g,P]),c.useEffect(()=>{var e,r,t;const n=a.current;if(n){if(u){(e=n.clearPointer)==null||e.call(n),(r=n.stop)==null||r.call(n);return}M.current&&((t=n.start)==null||t.call(n))}},[u]);const v=n=>{const e=I.current||x.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(n.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(n.clientY-r.top)/Math.max(1,r.height)))}},f=n=>{var r,t,o,s,i,d;const e=v(n);(t=(r=a.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y),(s=(o=a.current)==null?void 0:o.pulsePattern)==null||s.call(o),(d=(i=a.current)==null?void 0:i.start)==null||d.call(i)};return p.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice","aria-label":`Noice web art tile ${h+1}`,disabled:u,onPointerMove:u?void 0:(n=>{var r,t;const e=v(n);(t=(r=a.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerDown:u?void 0:(n=>{n.button!=null&&n.button!==0||f(n)}),onMouseLeave:u?void 0:(()=>{var n,e;(e=(n=a.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onBlur:u?void 0:(()=>{var n,e;(e=(n=a.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onKeyDown:u?void 0:(n=>{var e,r,t,o;(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),(r=(e=a.current)==null?void 0:e.pulsePattern)==null||r.call(e),(o=(t=a.current)==null?void 0:t.start)==null||o.call(t))}),children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function Ze({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(!0),P=c.useRef(null),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!R)return;const n=x.current,e=I.current;if(!n||!e)return;let r=!1,t=null,o=null,s=null;const i=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},d=$(async()=>{var l,b;try{const w=await H(()=>import("./deepShaderEngine-CuYCvQ1H.js"),[]);if(r)return;t=w.createDeepShaderEngine(e,{reduceMotion:v}),a.current=t;const y=()=>z(n,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),u||(b=t.start)==null||b.call(t),i(),o=new ResizeObserver(()=>{var k;y(),(k=t.renderStatic)==null||k.call(t)}),o.observe(n),"IntersectionObserver"in window&&(s=new IntersectionObserver(k=>{var S,j,E;for(const _ of k){if(M.current=!!_.isIntersecting,u){(S=t.stop)==null||S.call(t);continue}M.current?(j=t.start)==null||j.call(t):(E=t.stop)==null||E.call(t)}},{threshold:.25}),s.observe(n))}catch{i()}},{timeoutMs:220});return()=>{var l;r=!0,d==null||d(),s==null||s.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),a.current=null}},[R,m.uniqueId,u,g,v]),c.useEffect(()=>{var e,r,t;const n=a.current;if(n){if(u){P.current=null,(e=n.clearPointer)==null||e.call(n),(r=n.stop)==null||r.call(n);return}M.current&&((t=n.start)==null||t.call(n))}},[u]);const f=n=>{const e=I.current||x.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(n.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(n.clientY-r.top)/Math.max(1,r.height)))}};return p.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-deep","aria-label":`Deep web art tile ${h+1}`,disabled:u,onPointerDown:u?void 0:n=>{var r,t,o,s;if(n.button!=null&&n.button!==0)return;P.current=n.pointerId;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}const e=f(n);(t=(r=a.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y),(s=(o=a.current)==null?void 0:o.start)==null||s.call(o)},onPointerMove:u?void 0:n=>{var r,t;if(P.current!=null&&n.pointerId!==P.current||P.current==null&&n.pointerType!=="mouse")return;const e=f(n);P.current!=null&&((t=(r=a.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y))},onPointerUp:u?void 0:n=>{var e,r;P.current!=null&&n.pointerId!==P.current||(P.current=null,(r=(e=a.current)==null?void 0:e.clearPointer)==null||r.call(e))},onPointerCancel:u?void 0:(()=>{var n,e;P.current=null,(e=(n=a.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onMouseLeave:u?void 0:(()=>{var n,e;P.current=null,(e=(n=a.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onBlur:u?void 0:(()=>{var n,e;P.current=null,(e=(n=a.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onKeyDown:u?void 0:(n=>{var e,r;(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),(r=(e=a.current)==null?void 0:e.start)==null||r.call(e))}),children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Deep"})]})}function Je({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),M=c.useRef(!0),P=c.useRef(!1),v=Number(m==null?void 0:m.id)===5,f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=c.useMemo(()=>{const s=Number(m.id)||h+1,i=.0026+s*8e-5,d=.0054+s*14e-5,l=s%2?1:2,b={kx:11+s*2,ky:s%2};return{refreshDelay:v?0:8e3,radiusMini:i,radiusMaxi:d,dHueStep:l,startGroup:b,seed:1337+s*1009,reduceMotion:f}},[v,m.id,h,f]);c.useEffect(()=>{if(!R)return;const s=x.current,i=I.current;if(!s||!i)return;let d=!1,l=null,b=null,w=null;const y=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},k=$(async()=>{var S,j;try{const E=await H(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(d)return;l=E.createEmbroideryEngine(i,n),a.current=l;const _=()=>z(s,l,window.devicePixelRatio||1);_(),(S=l.renderStatic)==null||S.call(l),M.current&&((j=l.start)==null||j.call(l)),y(),b=new ResizeObserver(()=>{var T;_(),(T=l.renderStatic)==null||T.call(l)}),b.observe(s),"IntersectionObserver"in window&&(w=new IntersectionObserver(T=>{for(const A of T){if(M.current=!!A.isIntersecting,v){M.current||l.stop();continue}M.current&&C.current?l.start():l.stop()}},{threshold:.25}),w.observe(s))}catch{y()}});return()=>{d=!0,k==null||k(),w==null||w.disconnect(),b==null||b.disconnect(),l==null||l.destroy(),a.current=null}},[R,n,m.uniqueId,g]),c.useEffect(()=>{var i,d;const s=a.current;if(s){if(u){(i=s.stop)==null||i.call(s);return}M.current&&((d=s.start)==null||d.call(s))}},[u]),c.useEffect(()=>{var i,d;const s=a.current;if(s){if(u){(i=s.stop)==null||i.call(s);return}M.current&&((d=s.start)==null||d.call(s))}},[u]);const e=()=>{var s;C.current=!0,M.current&&((s=a.current)==null||s.start())},r=()=>{var s,i,d,l;C.current=!0,M.current?(i=(s=a.current)==null?void 0:s.start)==null||i.call(s):(l=(d=a.current)==null?void 0:d.stop)==null||l.call(d)},t=()=>{var s,i,d,l,b,w,y,k,S,j;if(v){(i=(s=a.current)==null?void 0:s.stop)==null||i.call(s),(l=(d=a.current)==null?void 0:d.reset)==null||l.call(d),(w=(b=a.current)==null?void 0:b.start)==null||w.call(b);return}(y=a.current)==null||y.reset(),(S=(k=a.current)==null?void 0:k.renderStatic)==null||S.call(k),M.current&&((j=a.current)==null||j.start())},o=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),t())};return p.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${h+1}`,disabled:u,onClick:u?void 0:t,onMouseEnter:u||v?void 0:e,onMouseLeave:u||v?void 0:r,onFocus:u||v?void 0:e,onBlur:u||v?void 0:r,onKeyDown:u?void 0:o,children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:v?"Click":Number.isFinite(Number(m==null?void 0:m.id))?Number(m.id):h+1})]})}function Qe({itemWrapper:m,index:h,activate:R,onReady:u}){const g=c.useRef(!1),x=c.useRef(null),I=c.useMemo(()=>`<!doctype html>
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
</html>`,[]);return c.useEffect(()=>{R&&(g.current||(g.current=!0,u==null||u(m.uniqueId)))},[R,m.uniqueId,u]),p.jsx("div",{className:"article-web-art-tile article-web-art-pulse-tile",role:"img","aria-label":`Pulse web art tile ${h+1}`,children:p.jsx("iframe",{ref:x,className:"article-web-art-pulse-frame",title:"Pulse web art",srcDoc:I,sandbox:"",scrolling:"no"})})}function We({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(null);c.useRef(null),c.useRef(!1);const P=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:9001+(Number(m.id)||1)*1337,reduceMotion:v,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[m.id,v]);c.useEffect(()=>{if(!R)return;const l=x.current,b=I.current;if(!l||!b)return;let w=!1,y=null,k=null;const S=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},j=$(async()=>{var E,_;try{const T=await H(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(w)return;y=T.createSpiralDotsEngine(b,f),a.current=y;const A=()=>z(l,y,window.devicePixelRatio||1);A(),(E=y.renderStatic)==null||E.call(y),(_=y.start)==null||_.call(y),S(),k=new ResizeObserver(()=>{var O;A(),y.rebuildDots(),(O=y.renderStatic)==null||O.call(y)}),k.observe(l)}catch{S()}});return()=>{w=!0,j==null||j(),k==null||k.disconnect(),y==null||y.destroy(),a.current=null}},[R,f,m.uniqueId,g]),c.useEffect(()=>{var b,w,y;const l=a.current;if(l){if(u){(b=l.clearMouse)==null||b.call(l),(w=l.stop)==null||w.call(l);return}(y=l.start)==null||y.call(l)}},[u]);const n=l=>{const b=I.current||x.current;if(!b)return{x:-1e4,y:-1e4};const w=b.getBoundingClientRect();return{x:l.clientX-w.left,y:l.clientY-w.top}},e=()=>{var l;(l=a.current)==null||l.start()},r=()=>{var l,b;(l=a.current)==null||l.clearMouse(),(b=a.current)==null||b.start()},t=()=>{e()},o=()=>{r()},s=l=>{var w;const b=n(l);(w=a.current)==null||w.setMouse(b.x,b.y)},i=()=>{e()},d=()=>{r()};return p.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-hover-only article-web-art-tile-hover-dots",role:"img",tabIndex:u?-1:0,"aria-label":`Spiral dots web art tile ${h+1}`,onPointerDown:u?void 0:l=>{var y;if(l.pointerType==="mouse")return;const b=x.current;if(!b)return;P.current=!0,M.current=l.pointerId;try{b.setPointerCapture(l.pointerId)}catch{}e();const w=n(l);(y=a.current)==null||y.setMouse(w.x,w.y)},onPointerMove:u?void 0:l=>{var w;if(!P.current||M.current!=null&&l.pointerId!==M.current)return;const b=n(l);(w=a.current)==null||w.setMouse(b.x,b.y)},onPointerUp:u?void 0:l=>{M.current!=null&&l.pointerId!==M.current||(P.current=!1,M.current=null,r())},onPointerCancel:u?void 0:()=>{P.current=!1,M.current=null,r()},onMouseEnter:u?void 0:t,onMouseLeave:u?void 0:o,onMouseMove:u?void 0:s,onFocus:u?void 0:i,onBlur:u?void 0:d,children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function et({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),M=c.useRef(!0),P=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:424242+(Number(m.id)||2)*2027,reduceMotion:v,targetCellSize:14,gapPx:1.4}),[m.id,v]);c.useEffect(()=>{if(!R)return;const s=x.current,i=I.current;if(!s||!i)return;let d=!1,l=null,b=null,w=null;const y=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},k=$(async()=>{var S,j;try{const E=await H(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(d)return;l=E.createGridWaveEngine(i,f),a.current=l;const _=()=>z(s,l,window.devicePixelRatio||1);_(),(S=l.renderStatic)==null||S.call(l),M.current&&((j=l.start)==null||j.call(l)),y(),b=new ResizeObserver(()=>{var T;_(),(T=l.renderStatic)==null||T.call(l)}),b.observe(s),"IntersectionObserver"in window&&(w=new IntersectionObserver(T=>{for(const A of T)M.current=!!A.isIntersecting,M.current&&C.current?l.start():l.stop()},{threshold:.25}),w.observe(s))}catch{y()}});return()=>{d=!0,k==null||k(),w==null||w.disconnect(),b==null||b.disconnect(),l==null||l.destroy(),a.current=null}},[R,f,m.uniqueId,g]);const n=()=>{var s;C.current=!0,M.current&&((s=a.current)==null||s.start())},e=()=>{var s,i,d,l;C.current=!0,M.current?(i=(s=a.current)==null?void 0:s.start)==null||i.call(s):(l=(d=a.current)==null?void 0:d.stop)==null||l.call(d)},r=s=>{const i=I.current||x.current;if(!i)return{x:0,y:0};const d=i.getBoundingClientRect();return typeof(s==null?void 0:s.clientX)!="number"||typeof(s==null?void 0:s.clientY)!="number"?{x:d.width/2,y:d.height/2}:{x:s.clientX-d.left,y:s.clientY-d.top}},t=s=>{var d,l,b,w;const i=r(s);(d=a.current)==null||d.rippleAt(i.x,i.y),(b=(l=a.current)==null?void 0:l.renderStatic)==null||b.call(l),C.current&&M.current&&((w=a.current)==null||w.start())},o=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),t(null))};return p.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${h+1}`,disabled:u,onClick:u?void 0:t,onMouseEnter:u?void 0:n,onMouseLeave:u?void 0:e,onFocus:u?void 0:n,onBlur:u?void 0:e,onKeyDown:u?void 0:o,children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function tt({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),M=c.useRef(!0),P=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({reduceMotion:v,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[v]);c.useEffect(()=>{if(!R)return;const o=x.current,s=I.current;if(!o||!s)return;let i=!1,d=null,l=null,b=null,w=null;const y=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},k=async()=>{var T;const j=await H(()=>import("./threeTunnelEngine-BYxOaRL9.js"),__vite__mapDeps([5,1]));if(i)return;d=j.createThreeTunnelEngine(s,f),a.current=d;const E=()=>z(o,d,Math.min(1.5,window.devicePixelRatio||1));return E(),d.reset(),M.current&&((T=d.start)==null||T.call(d)),y(),l=new ResizeObserver(()=>{E(),d.reset()}),l.observe(o),"IntersectionObserver"in window&&(b=new IntersectionObserver(A=>{for(const O of A)M.current=!!O.isIntersecting,M.current&&C.current?d.start():d.stop()},{threshold:.25}),b.observe(o)),()=>{b==null||b.disconnect(),l==null||l.disconnect(),d.destroy(),a.current=null}};let S=null;return w=$(()=>{k().then(j=>{S=j||null}).catch(()=>{y()})},{timeoutMs:300}),()=>{i=!0,w==null||w(),S==null||S()}},[R,f,m.uniqueId,g]),c.useEffect(()=>{var s,i,d;const o=a.current;if(o){if(u){(s=o.setHeld)==null||s.call(o,!1),(i=o.stop)==null||i.call(o);return}M.current&&((d=o.start)==null||d.call(o))}},[u]);const n=()=>{var o;C.current=!0,M.current&&((o=a.current)==null||o.start())},e=()=>{var o,s,i,d;C.current=!0,M.current?(s=(o=a.current)==null?void 0:o.start)==null||s.call(o):(d=(i=a.current)==null?void 0:i.stop)==null||d.call(i)},r=()=>{var o,s,i,d;(s=(o=a.current)==null?void 0:o.nextPalette)==null||s.call(o),(i=a.current)==null||i.reset(),M.current&&((d=a.current)==null||d.start())},t=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),r())};return p.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${h+1}`,disabled:u,onClick:u?void 0:r,onMouseEnter:u?void 0:n,onMouseLeave:u?void 0:e,onFocus:u?void 0:n,onBlur:u?void 0:e,onKeyDown:u?void 0:t,children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),p.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function rt({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),M=c.useRef(!0),P=c.useRef(!1),v=c.useRef(null),f=c.useRef(null),n=c.useRef(!1),e=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=c.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,u]);c.useEffect(()=>{if(!R)return;const s=x.current,i=I.current;if(!s||!i)return;let d=!1,l=null,b=null;const w=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},y=async()=>{var T;const k=await H(()=>import("./threePolygonDemo5Engine-J7VS_NUu.js"),__vite__mapDeps([6,1]));if(d)return;const S=k.createThreePolygonDemo5Engine(i,r);a.current=S;const j=()=>z(s,S,Math.min(1.2,window.devicePixelRatio||1));j(),S.reset(),window.requestAnimationFrame(()=>{d||a.current!==S||(j(),S.reset())}),M.current&&((T=S.start)==null||T.call(S)),w();const E=new ResizeObserver(()=>{j()});E.observe(s);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(A=>{for(const O of A)M.current=!!O.isIntersecting,M.current&&C.current?S.start():S.stop()},{threshold:.25}),_.observe(s)),l=()=>{_==null||_.disconnect(),E.disconnect(),S.destroy(),a.current=null}};return b=$(()=>{y().catch(()=>{w()})},{timeoutMs:300}),()=>{d=!0,b==null||b(),f.current!=null&&window.clearTimeout(f.current),l==null||l()}},[R,r,m.uniqueId,g]);const t=()=>{var s,i,d;(i=(s=a.current)==null?void 0:s.boost)==null||i.call(s),M.current&&((d=a.current)==null||d.start())},o=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),t())};return p.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${h+1}`,disabled:u,onKeyDown:u?void 0:o,onPointerDown:u?void 0:s=>{var i;if(!(s.button!=null&&s.button!==0)){v.current=s.pointerId,n.current=!1;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}M.current&&((i=a.current)==null||i.start()),f.current!=null&&window.clearTimeout(f.current),f.current=window.setTimeout(()=>{var d,l;v.current!=null&&(n.current=!0,(l=(d=a.current)==null?void 0:d.setHeld)==null||l.call(d,!0))},140)}},onPointerUp:u?void 0:s=>{var i,d;v.current!=null&&s.pointerId!==v.current||(f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,n.current?(n.current=!1,(d=(i=a.current)==null?void 0:i.setHeld)==null||d.call(i,!1)):t())},onPointerCancel:u?void 0:(()=>{var s,i;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,n.current=!1,(i=(s=a.current)==null?void 0:s.setHeld)==null||i.call(s,!1)}),onLostPointerCapture:u?void 0:(()=>{var s,i;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,n.current=!1,(i=(s=a.current)==null?void 0:s.setHeld)==null||i.call(s,!1)}),onMouseEnter:u?void 0:(()=>{var s;C.current=!0,M.current&&((s=a.current)==null||s.start())}),onMouseLeave:u?void 0:(()=>{var s,i,d,l;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,n.current=!1,(i=(s=a.current)==null?void 0:s.setHeld)==null||i.call(s,!1),C.current=!0,M.current?(d=a.current)==null||d.start():(l=a.current)==null||l.stop()}),onFocus:u?void 0:(()=>{var s;C.current=!0,M.current&&((s=a.current)==null||s.start())}),onBlur:u?void 0:(()=>{var s,i,d,l;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,n.current=!1,(i=(s=a.current)==null?void 0:s.setHeld)==null||i.call(s,!1),C.current=!0,M.current?(d=a.current)==null||d.start():(l=a.current)==null||l.stop()}),children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function nt({itemWrapper:m,index:h,activate:R,locked:u,onReady:g}){const x=c.useRef(null),I=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),M=c.useRef(!0),P=c.useRef(!1),v=c.useRef(0),f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=c.useMemo(()=>({reduceMotion:f,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[f]);c.useEffect(()=>{if(!R)return;const s=x.current,i=I.current;if(!s||!i)return;let d=!1,l=null,b=null,w=null;const y=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},k=$(async()=>{var S,j;try{const E=await H(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(d)return;l=E.createOrbitCirclesEngine(i,n),a.current=l;const _=()=>z(s,l,window.devicePixelRatio||1);_(),l.reset(),(S=l.renderStatic)==null||S.call(l),M.current&&((j=l.start)==null||j.call(l)),y(),b=new ResizeObserver(()=>{var T;_(),(T=l.renderStatic)==null||T.call(l)}),b.observe(s),"IntersectionObserver"in window&&(w=new IntersectionObserver(T=>{for(const A of T)M.current=!!A.isIntersecting,M.current&&C.current?l.start():l.stop()},{threshold:.25}),w.observe(s))}catch{y()}});return()=>{d=!0,k==null||k(),w==null||w.disconnect(),b==null||b.disconnect(),l==null||l.destroy(),a.current=null}},[R,n,m.uniqueId,g]),c.useEffect(()=>{var i,d;const s=a.current;if(s){if(u){(i=s.stop)==null||i.call(s);return}M.current&&((d=s.start)==null||d.call(s))}},[u]);const e=()=>{var s;C.current=!0,M.current&&((s=a.current)==null||s.start())},r=()=>{var s,i,d,l;C.current=!0,M.current?(i=(s=a.current)==null?void 0:s.start)==null||i.call(s):(l=(d=a.current)==null?void 0:d.stop)==null||l.call(d)},t=()=>{var b,w,y;const s=a.current;if(!s)return;const i=Math.max(1,((b=s.getTotalCircles)==null?void 0:b.call(s))||1),d=v.current%i,l=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`;(w=s.setCircleColor)==null||w.call(s,d,l),v.current+=1,M.current&&((y=s.start)==null||y.call(s))},o=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),t())};return p.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${h+1}`,disabled:u,onClick:u?void 0:t,onMouseEnter:u?void 0:e,onMouseLeave:u?void 0:r,onFocus:u?void 0:e,onBlur:u?void 0:r,onKeyDown:u?void 0:o,children:[p.jsx("canvas",{ref:I,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function st({readyId:m,locked:h,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),I=c.useRef(!1),a=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=c.useMemo(()=>({seed:20250414,reduceMotion:a,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[a]);c.useEffect(()=>{const v=u.current,f=g.current;if(!v||!f)return;let n=!1,e=null,r=null,t=null;const o=()=>{I.current||(I.current=!0,R==null||R(m))},s=$(async()=>{var i,d;try{const l=await H(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(n)return;e=l.createTortuosityTraceEngine(f,C),x.current=e;const b=()=>z(v,e,Math.min(1.5,window.devicePixelRatio||1));b(),(i=e.renderStatic)==null||i.call(e),(d=e.start)==null||d.call(e),o(),r=new ResizeObserver(()=>{var w;b(),(w=e.reset)==null||w.call(e)}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(w=>{var y,k;for(const S of w)S.isIntersecting?(y=e.start)==null||y.call(e):(k=e.stop)==null||k.call(e)},{threshold:.25}),t.observe(v))}catch{o()}},{timeoutMs:200});return()=>{var i;n=!0,s==null||s(),t==null||t.disconnect(),r==null||r.disconnect(),(i=e==null?void 0:e.destroy)==null||i.call(e),x.current=null}},[C,R,m]),c.useEffect(()=>{var f,n,e;const v=x.current;if(v){if(h){(f=v.setHeld)==null||f.call(v,!1),(n=v.stop)==null||n.call(v);return}(e=v.start)==null||e.call(v)}},[h]),c.useEffect(()=>{var f,n;const v=x.current;if(v){if(h){(f=v.stop)==null||f.call(v);return}(n=v.start)==null||n.call(v)}},[h]);const M=()=>{var v,f,n,e;(f=(v=x.current)==null?void 0:v.reset)==null||f.call(v),(e=(n=x.current)==null?void 0:n.start)==null||e.call(n)},P=v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),M())};return p.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:h,onClick:h?void 0:M,onKeyDown:h?void 0:P,children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function it({readyId:m,locked:h,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),I=c.useRef(!1),a=c.useRef(null),C=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=c.useMemo(()=>({seed:20250415,reduceMotion:C,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[C]);c.useEffect(()=>{const n=u.current,e=g.current;if(!n||!e)return;let r=!1,t=null,o=null,s=null;const i=()=>{I.current||(I.current=!0,R==null||R(m))},d=$(async()=>{var l,b;try{const w=await H(()=>import("./hexFlowBallsEngine-Bzfny-m0.js"),[]);if(r)return;t=w.createHexFlowBallsEngine(e,M),x.current=t;const y=()=>z(n,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),(b=t.start)==null||b.call(t),i(),o=new ResizeObserver(()=>{var k;y(),(k=t.renderStatic)==null||k.call(t)}),o.observe(n),"IntersectionObserver"in window&&(s=new IntersectionObserver(k=>{var S,j;for(const E of k)E.isIntersecting?(S=t.start)==null||S.call(t):(j=t.stop)==null||j.call(t)},{threshold:.25}),s.observe(n))}catch{i()}},{timeoutMs:220});return()=>{var l;r=!0,d==null||d(),s==null||s.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),x.current=null}},[M,R,m]),c.useEffect(()=>{var e,r,t;const n=x.current;if(n){if(h){(e=n.clearPointer)==null||e.call(n),(r=n.stop)==null||r.call(n);return}(t=n.start)==null||t.call(n)}},[h]);const P=n=>{const e=u.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:r.width>0?(n.clientX-r.left)/r.width:.5,y:r.height>0?(n.clientY-r.top)/r.height:.5}},v=()=>{var n,e,r,t;(e=(n=x.current)==null?void 0:n.burst)==null||e.call(n),(t=(r=x.current)==null?void 0:r.start)==null||t.call(r)},f=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),v())};return p.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:h,onClick:h?void 0:v,onPointerDown:h?void 0:(n=>{var r,t;a.current=n.pointerId;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}const e=P(n);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerMove:h?void 0:(n=>{var r,t;if(a.current!=null&&n.pointerId!==a.current)return;const e=P(n);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerUp:h?void 0:(n=>{a.current!=null&&n.pointerId!==a.current||(a.current=null)}),onPointerCancel:h?void 0:(()=>{var n,e;a.current=null,(e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onMouseMove:h?void 0:(n=>{var r,t;const e=P(n);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onMouseLeave:h?void 0:(()=>{var n,e;a.current=null,(e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onBlur:h?void 0:(()=>{var n,e;a.current=null,(e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onKeyDown:h?void 0:f,children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function ot({readyId:m,locked:h,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),I=c.useRef(!1),a=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=c.useMemo(()=>({seed:20250416,reduceMotion:a,step:6,side:5}),[a]);c.useEffect(()=>{const f=u.current,n=g.current;if(!f||!n)return;let e=!1,r=null,t=null,o=null;const s=()=>{I.current||(I.current=!0,R==null||R(m))},i=$(async()=>{var d,l;try{const b=await H(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;r=b.createPixelPlopEngine(n,C),x.current=r;const w=()=>z(f,r,Math.min(1.5,window.devicePixelRatio||1));w(),(d=r.renderStatic)==null||d.call(r),(l=r.start)==null||l.call(r),s(),t=new ResizeObserver(()=>{var y;w(),(y=r.reset)==null||y.call(r)}),t.observe(f),"IntersectionObserver"in window&&(o=new IntersectionObserver(y=>{var k,S;for(const j of y)j.isIntersecting?(k=r.start)==null||k.call(r):(S=r.stop)==null||S.call(r)},{threshold:.25}),o.observe(f))}catch{s()}},{timeoutMs:220});return()=>{var d;e=!0,i==null||i(),o==null||o.disconnect(),t==null||t.disconnect(),(d=r==null?void 0:r.destroy)==null||d.call(r),x.current=null}},[C,R,m]),c.useEffect(()=>{var n,e,r;const f=x.current;if(f){if(h){(n=f.clearPointer)==null||n.call(f),(e=f.stop)==null||e.call(f);return}(r=f.start)==null||r.call(f)}},[h]),c.useEffect(()=>{var n,e;const f=x.current;if(f){if(h){(n=f.stop)==null||n.call(f);return}(e=f.start)==null||e.call(f)}},[h]);const M=()=>{var f,n,e,r;(n=(f=x.current)==null?void 0:f.seedBurst)==null||n.call(f),(r=(e=x.current)==null?void 0:e.start)==null||r.call(e)},P=f=>{var r,t,o,s;const n=g.current||u.current;if(!n||typeof(f==null?void 0:f.clientX)!="number"||typeof(f==null?void 0:f.clientY)!="number"){M();return}const e=n.getBoundingClientRect();(t=(r=x.current)==null?void 0:r.burstAt)==null||t.call(r,f.clientX-e.left,f.clientY-e.top),(s=(o=x.current)==null?void 0:o.start)==null||s.call(o)},v=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),M())};return p.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:h,onPointerDown:h?void 0:(f=>{f.button!=null&&f.button!==0||P(f)}),onKeyDown:h?void 0:v,children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function at({readyId:m,locked:h,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),I=c.useRef(!1),a=c.useRef(null),C=c.useRef(!1),M=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=c.useMemo(()=>({reduceMotion:M,seed:20250417}),[M]);c.useEffect(()=>{const e=u.current,r=g.current;if(!e||!r)return;let t=!1,o=null,s=null,i=null;const d=()=>{I.current||(I.current=!0,R==null||R(m))},l=$(async()=>{var b,w;try{const y=await H(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(t)return;o=y.createJuliaLinesEngine(r,P),x.current=o;const k=()=>z(e,o,Math.min(1.5,window.devicePixelRatio||1));k(),(b=o.renderStatic)==null||b.call(o),(w=o.start)==null||w.call(o),d(),s=new ResizeObserver(()=>{k()}),s.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(S=>{var j,E;for(const _ of S)_.isIntersecting?(j=o.start)==null||j.call(o):(E=o.stop)==null||E.call(o)},{threshold:.25}),i.observe(e))}catch{d()}},{timeoutMs:220});return()=>{var b;t=!0,l==null||l(),i==null||i.disconnect(),s==null||s.disconnect(),(b=o==null?void 0:o.destroy)==null||b.call(o),x.current=null}},[P,R,m]),c.useEffect(()=>{var r,t,o,s;const e=x.current;if(e){if(h){(r=e.setHeld)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(o=e.stop)==null||o.call(e);return}(s=e.start)==null||s.call(e)}},[h]),c.useEffect(()=>{var r,t,o;const e=x.current;if(e){if(h){(r=e.clearPointer)==null||r.call(e),(t=e.stop)==null||t.call(e);return}(o=e.start)==null||o.call(e)}},[h]);const v=e=>{const r=u.current;if(!r)return{x:.4,y:.5};const t=r.getBoundingClientRect(),o=(e.clientX-t.left)/Math.max(1,t.width),s=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,o)),y:Math.max(0,Math.min(1,s))}},f=()=>{var e,r,t,o;(r=(e=x.current)==null?void 0:e.reset)==null||r.call(e),(o=(t=x.current)==null?void 0:t.start)==null||o.call(t)},n=e=>{var t,o,s,i,d,l,b,w;const r=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(o=(t=x.current)==null?void 0:t.nudge)==null||o.call(t,0,-r)):e.key==="ArrowDown"?(e.preventDefault(),(i=(s=x.current)==null?void 0:s.nudge)==null||i.call(s,0,r)):e.key==="ArrowLeft"?(e.preventDefault(),(l=(d=x.current)==null?void 0:d.nudge)==null||l.call(d,-r,0)):e.key==="ArrowRight"?(e.preventDefault(),(w=(b=x.current)==null?void 0:b.nudge)==null||w.call(b,r,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),f())};return p.jsxs("div",{ref:u,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:h?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:h?void 0:e=>{var o,s;const r=u.current;if(!r)return;C.current=!0,a.current=e.pointerId;try{r.setPointerCapture(e.pointerId)}catch{}const t=v(e);(s=(o=x.current)==null?void 0:o.setPointer)==null||s.call(o,t.x,t.y)},onPointerMove:h?void 0:e=>{var t,o;if(C.current&&a.current!=null&&e.pointerId!==a.current)return;const r=v(e);(o=(t=x.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)},onPointerUp:h?void 0:e=>{var r,t;a.current!=null&&e.pointerId!==a.current||(C.current=!1,a.current=null,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r))},onPointerCancel:h?void 0:()=>{var e,r;C.current=!1,a.current=null,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)},onMouseMove:h?void 0:e=>{var t,o;const r=v(e);(o=(t=x.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)},onMouseLeave:h?void 0:(()=>{var e,r;(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:h?void 0:(()=>{var e,r;(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:h?void 0:n,onClick:h?void 0:f,children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function ct({readyId:m,locked:h,onReady:R}){const[u,g]=c.useState(0),[x,I]=c.useState("mine"),[a,C]=c.useState(()=>new Set),[M,P]=c.useState(()=>new Set),[v,f]=c.useState("playing"),[n,e]=c.useState(null),[r,t]=c.useState(0),o=c.useMemo(()=>Oe(),[u]);c.useEffect(()=>{R==null||R(m)},[R,m]),c.useEffect(()=>{I("mine"),C(new Set),P(new Set),f("playing"),e(null),t(0)},[u]),c.useEffect(()=>{if(n==null||v!=="playing")return;const w=()=>{t(Math.min(5999,Math.floor((Date.now()-n)/1e3)))};w();const y=window.setInterval(w,1e3);return()=>{window.clearInterval(y)}},[n,v]);const s=()=>{g(w=>w+1)},i=w=>{if(h||v!=="playing")return;if(n==null&&e(Date.now()),x==="flag"){if(a.has(w))return;const k=new Set(M);k.has(w)?k.delete(w):k.add(w),P(k),pe(o,a,k)&&f("won");return}if(M.has(w)||a.has(w))return;if(o.mines.has(w)){const k=new Set(a);for(const S of o.mines)k.add(S);k.add(w),C(k),f("lost");return}const y=Be(w,o,a,M);C(y),pe(o,y,M)&&f("won")},d=o.mineCount-M.size,l=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`;let b="🤔";return v==="lost"?b="😣":v==="won"?b="😎":M.size>=o.mineCount?b="😕":M.size>=o.mineCount-1?b="🤓":M.size>=Math.round(o.mineCount*3/4)?b="😃":M.size>=Math.round(o.mineCount*2/3)?b="😊":M.size>=Math.round(o.mineCount/2)?b="🙂":M.size>=Math.round(o.mineCount/3)?b="😏":M.size>0&&(b="😐"),p.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:p.jsxs("div",{className:"article-web-art-minesweeper",children:[p.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[p.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${x==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>I("mine"),disabled:h||v!=="playing","aria-pressed":x==="mine",children:"⛏"}),p.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${x==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>I("flag"),disabled:h||v!=="playing","aria-pressed":x==="flag",children:"🚩"})]}),p.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[o.counts.map((w,y)=>{const k=a.has(y),S=M.has(y),j=o.mines.has(y),E=v==="lost"&&j,_=w>0?De[w-1]:void 0;return p.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${k?"article-web-art-minesweeper-cell-revealed":""} ${E?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>i(y),disabled:h||v!=="playing","aria-label":`Minesweeper cell ${y+1}`,children:[S&&!k?p.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,E?p.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,k&&!j&&w>0?p.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:w}):null]},`mine-${u}-${y}`)}),v==="lost"?p.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:s,children:["Ooohhh 🙁",p.jsx("br",{}),"Click to try again"]}):null,v==="won"?p.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:s,children:["👌👀✔💯💯💯",p.jsx("br",{}),"Click to restart"]}):null]}),p.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[p.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[p.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:b}),p.jsx("span",{children:d})]}),p.jsx("div",{className:"article-web-art-minesweeper-timer",children:l})]}),p.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function lt({readyId:m,locked:h,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),I=c.useRef(!1),a=c.useRef(null),C=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=c.useMemo(()=>({reduceMotion:C}),[C]);c.useEffect(()=>{const n=u.current,e=g.current;if(!n||!e)return;let r=!1,t=null,o=null,s=null;const i=()=>{I.current||(I.current=!0,R==null||R(m))},d=$(async()=>{var l,b;try{const w=await H(()=>import("./fallingRingsEngine-CgfU8E0P.js"),[]);if(r)return;t=w.createFallingRingsEngine(e,M),x.current=t;const y=()=>z(n,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),(b=t.start)==null||b.call(t),i(),o=new ResizeObserver(()=>{y()}),o.observe(n),"IntersectionObserver"in window&&(s=new IntersectionObserver(k=>{var S,j;for(const E of k)E.isIntersecting?(S=t.start)==null||S.call(t):(j=t.stop)==null||j.call(t)},{threshold:.25}),s.observe(n))}catch{i()}},{timeoutMs:220});return()=>{var l;r=!0,d==null||d(),s==null||s.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),x.current=null}},[M,R,m]);const P=n=>{var e,r,t,o;(r=(e=x.current)==null?void 0:e.setHeld)==null||r.call(e,n),(o=(t=x.current)==null?void 0:t.start)==null||o.call(t)},v=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),P(!0))},f=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),P(!1))};return p.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:h,onPointerDown:h?void 0:n=>{a.current=n.pointerId;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}P(!0)},onPointerUp:h?void 0:n=>{a.current!=null&&n.pointerId!==a.current||(a.current=null,P(!1))},onPointerCancel:h?void 0:()=>{a.current=null,P(!1)},onLostPointerCapture:h?void 0:()=>{a.current=null,P(!1)},onMouseLeave:h?void 0:(()=>{a.current!=null&&P(!1)}),onBlur:h?void 0:(()=>{a.current=null,P(!1)}),onKeyDown:h?void 0:v,onKeyUp:h?void 0:f,children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function ut({readyId:m,locked:h,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),I=c.useRef(!1),a=c.useRef(null),C=c.useRef("mouse"),M=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=c.useMemo(()=>({reduceMotion:M,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[M]);c.useEffect(()=>{const f=u.current,n=g.current;if(!f||!n)return;let e=!1,r=null,t=null,o=null;const s=()=>{I.current||(I.current=!0,R==null||R(m))},i=$(async()=>{var d,l;try{const b=await H(()=>import("./prismFieldEngine-BQpxImA_.js"),__vite__mapDeps([7,1]));if(e)return;r=b.createPrismFieldEngine(n,P),x.current=r;const w=()=>z(f,r,Math.min(1.5,window.devicePixelRatio||1));w(),(d=r.renderStatic)==null||d.call(r),(l=r.start)==null||l.call(r),s(),t=new ResizeObserver(()=>{w()}),t.observe(f),"IntersectionObserver"in window&&(o=new IntersectionObserver(y=>{var k,S;for(const j of y)j.isIntersecting?(k=r.start)==null||k.call(r):(S=r.stop)==null||S.call(r)},{threshold:.25}),o.observe(f))}catch{s()}},{timeoutMs:220});return()=>{var d;e=!0,i==null||i(),o==null||o.disconnect(),t==null||t.disconnect(),(d=r==null?void 0:r.destroy)==null||d.call(r),x.current=null}},[P,R,m]);const v=f=>{const n=u.current;if(!n)return{x:.5,y:.5};const e=n.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(f.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(f.clientY-e.top)/Math.max(1,e.height)))}};return p.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:h,onClick:h?void 0:(()=>{var f,n,e,r;(n=(f=x.current)==null?void 0:f.reset)==null||n.call(f),(r=(e=x.current)==null?void 0:e.start)==null||r.call(e)}),onPointerDown:h?void 0:f=>{var e,r;a.current=f.pointerId,C.current=f.pointerType||"mouse";try{f.currentTarget.setPointerCapture(f.pointerId)}catch{}const n=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,n.x,n.y)},onPointerMove:h?void 0:f=>{var e,r;if(a.current!=null&&f.pointerId!==a.current)return;const n=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,n.x,n.y)},onPointerUp:h?void 0:f=>{var n,e;a.current!=null&&f.pointerId!==a.current||(a.current=null,(f.pointerType||C.current)==="mouse"&&((e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)))},onPointerCancel:h?void 0:(()=>{var f,n;a.current=null,C.current==="mouse"&&((n=(f=x.current)==null?void 0:f.clearPointer)==null||n.call(f))}),onMouseMove:h?void 0:f=>{var e,r;const n=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,n.x,n.y)},onMouseLeave:h?void 0:(()=>{var f,n;a.current=null,(n=(f=x.current)==null?void 0:f.clearPointer)==null||n.call(f)}),onBlur:h?void 0:(()=>{var f,n;a.current=null,C.current="mouse",(n=(f=x.current)==null?void 0:f.clearPointer)==null||n.call(f)}),onKeyDown:h?void 0:(f=>{var n,e,r,t;(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),(e=(n=x.current)==null?void 0:n.reset)==null||e.call(n),(t=(r=x.current)==null?void 0:r.start)==null||t.call(r))}),children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function dt({readyId:m,locked:h,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),I=c.useRef(!1),a=c.useRef(null),C=c.useRef(null),M=c.useRef(!1),P=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=c.useMemo(()=>({reduceMotion:P}),[P]);c.useEffect(()=>{const e=u.current,r=g.current;if(!e||!r)return;let t=!1,o=null,s=null,i=null;const d=()=>{I.current||(I.current=!0,R==null||R(m))},l=$(async()=>{var b,w;try{const y=await H(()=>import("./ropeLightEngine-ZZGO6u7c.js"),[]);if(t)return;o=y.createRopeLightEngine(r,v),x.current=o;const k=()=>z(e,o,Math.min(1.5,window.devicePixelRatio||1));k(),(b=o.renderStatic)==null||b.call(o),(w=o.start)==null||w.call(o),d(),s=new ResizeObserver(()=>{k()}),s.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(S=>{var j,E;for(const _ of S)_.isIntersecting?(j=o.start)==null||j.call(o):(E=o.stop)==null||E.call(o)},{threshold:.25}),i.observe(e))}catch{d()}},{timeoutMs:220});return()=>{var b;t=!0,l==null||l(),i==null||i.disconnect(),s==null||s.disconnect(),(b=o==null?void 0:o.destroy)==null||b.call(o),x.current=null}},[v,R,m]);const f=e=>{const r=u.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}},n=e=>{var t,o,s,i;if(M.current){M.current=!1;return}const r=e?f(e):{x:.5,y:.18};(o=(t=x.current)==null?void 0:t.toggleHangAt)==null||o.call(t,r.x,r.y),(i=(s=x.current)==null?void 0:s.start)==null||i.call(s)};return p.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:h,onClick:h?void 0:n,onPointerDown:h?void 0:e=>{var r,t;a.current=e.pointerId,M.current=!1,C.current=f(e);try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,C.current.x,C.current.y)},onPointerMove:h?void 0:e=>{var o,s;if(a.current!=null&&e.pointerId!==a.current)return;const r=f(e),t=C.current;t&&Math.hypot(r.x-t.x,r.y-t.y)>.025&&(M.current=!0),(s=(o=x.current)==null?void 0:o.setPointer)==null||s.call(o,r.x,r.y)},onPointerUp:h?void 0:e=>{var r,t;if(!(a.current!=null&&e.pointerId!==a.current)){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}a.current=null,C.current=null,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r)}},onPointerCancel:h?void 0:(e=>{var r,t;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}a.current=null,C.current=null,M.current=!1,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r)}),onMouseMove:h?void 0:e=>{var t,o;const r=f(e);(o=(t=x.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)},onMouseLeave:h?void 0:(()=>{var e,r;a.current=null,C.current=null,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:h?void 0:(()=>{var e,r;a.current=null,C.current=null,M.current=!1,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:h?void 0:(e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),n())}),children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}const ft=["rotateX(270deg) translateZ(0.5em)","rotateY(0deg) translateZ(0.5em)","rotateY(90deg) translateZ(0.5em)","rotateY(180deg) translateZ(0.5em)","rotateY(270deg) translateZ(0.5em)","rotateX(90deg) translateZ(0.5em)"],xe=Array.from({length:28},(m,h)=>h);function ht(){return p.jsx("div",{className:"article-web-art-soup-backdrop","aria-hidden":!0,children:xe.map(m=>p.jsx("div",{className:"article-web-art-soup-cube",style:{animationDelay:`${m*.06}s`,fontSize:`${m+1}em`,"--soup-cube-depth":`${m/Math.max(1,xe.length-1)}`},children:ft.map((h,R)=>p.jsx("span",{className:"article-web-art-soup-face",style:{transform:h}},R))},m))})}function bt({readyId:m,locked:h,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),I=c.useRef(!1),a=c.useRef(null),C=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=c.useMemo(()=>({reduceMotion:C}),[C]);c.useEffect(()=>{const v=u.current,f=g.current;if(!v||!f)return;let n=!1,e=null,r=null,t=null;const o=()=>{I.current||(I.current=!0,R==null||R(m))},s=$(async()=>{var i,d;try{const l=await H(()=>import("./soupShaderEngine-BVaccG7j.js"),__vite__mapDeps([8,1]));if(n)return;e=l.createSoupShaderEngine(f,M),x.current=e;const b=()=>z(v,e,Math.min(1.5,window.devicePixelRatio||1));b(),(i=e.renderStatic)==null||i.call(e),(d=e.start)==null||d.call(e),o(),r=new ResizeObserver(()=>{b()}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(w=>{var y,k;for(const S of w)S.isIntersecting?(y=e.start)==null||y.call(e):(k=e.stop)==null||k.call(e)},{threshold:.25}),t.observe(v))}catch{o()}},{timeoutMs:220});return()=>{var i;n=!0,s==null||s(),t==null||t.disconnect(),r==null||r.disconnect(),(i=e==null?void 0:e.destroy)==null||i.call(e),x.current=null}},[M,R,m]);const P=v=>{const f=u.current;if(!f)return{x:.5,y:.5};const n=f.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(v.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(v.clientY-n.top)/Math.max(1,n.height)))}};return p.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile","aria-label":"Soup shader web art tile",disabled:h,onPointerDown:h?void 0:v=>{var n,e,r,t;a.current=v.pointerId;try{v.currentTarget.setPointerCapture(v.pointerId)}catch{}const f=P(v);(e=(n=x.current)==null?void 0:n.setPointer)==null||e.call(n,f.x,f.y),(t=(r=x.current)==null?void 0:r.setHeld)==null||t.call(r,!0)},onPointerMove:h?void 0:v=>{var n,e;if(a.current!=null&&v.pointerId!==a.current)return;const f=P(v);(e=(n=x.current)==null?void 0:n.setPointer)==null||e.call(n,f.x,f.y)},onPointerUp:h?void 0:v=>{var f,n;a.current!=null&&v.pointerId!==a.current||(a.current=null,(n=(f=x.current)==null?void 0:f.setHeld)==null||n.call(f,!1))},onPointerCancel:h?void 0:(()=>{var v,f;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1)}),onMouseMove:h?void 0:v=>{var n,e;const f=P(v);(e=(n=x.current)==null?void 0:n.setPointer)==null||e.call(n,f.x,f.y)},onMouseLeave:h?void 0:(()=>{var v,f,n,e;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onBlur:h?void 0:(()=>{var v,f,n,e;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)}),children:[p.jsx(ht,{}),p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function pt({readyId:m,locked:h,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),I=c.useRef(!1),a=c.useRef(null),C=c.useRef(null),M=c.useRef(0),[P,v]=c.useState(!1),[f,n]=c.useState([]),e=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=c.useMemo(()=>({reduceMotion:e}),[e]);c.useEffect(()=>{const i=u.current,d=g.current;if(!i||!d)return;let l=!1,b=null,w=null,y=null;const k=()=>{I.current||(I.current=!0,R==null||R(m))},S=$(async()=>{var j,E;try{const _=await H(()=>import("./tardisWormholeEngine-Czkyopnk.js"),__vite__mapDeps([9,1]));if(l)return;b=_.createTardisWormholeEngine(d,r),x.current=b;const T=()=>z(i,b,Math.min(1.5,window.devicePixelRatio||1));T(),(j=b.renderStatic)==null||j.call(b),(E=b.start)==null||E.call(b),k(),w=new ResizeObserver(()=>{T()}),w.observe(i),"IntersectionObserver"in window&&(y=new IntersectionObserver(A=>{var O,K;for(const G of A)G.isIntersecting?(O=b.start)==null||O.call(b):(K=b.stop)==null||K.call(b)},{threshold:.25}),y.observe(i))}catch{k()}},{timeoutMs:220});return()=>{var j;l=!0,S==null||S(),y==null||y.disconnect(),w==null||w.disconnect(),(j=b==null?void 0:b.destroy)==null||j.call(b),x.current=null}},[r,R,m]),c.useEffect(()=>{if(f.length===0)return;const i=window.setTimeout(()=>{n(d=>d.slice(1))},1e3);return()=>{window.clearTimeout(i)}},[f]),c.useEffect(()=>{var d,l,b;const i=x.current;if(i){if(h){v(!1),C.current=null,(d=i.clearPointer)==null||d.call(i),(l=i.stop)==null||l.call(i);return}(b=i.start)==null||b.call(i)}},[h]);const t=i=>{const d=u.current,l=g.current||d;if(!d||!l)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const b=l.getBoundingClientRect(),w=d.getBoundingClientRect(),y=Math.max(0,Math.min(w.width,i.clientX-w.left)),k=Math.max(0,Math.min(w.height,i.clientY-w.top)),S=Math.max(0,Math.min(b.width,i.clientX-b.left)),j=Math.max(0,Math.min(b.height,i.clientY-b.top)),E=C.current,_=E?S-E.px:0,T=E?j-E.py:0;return C.current={px:S,py:j},{x:b.width>0?S/b.width:.5,y:b.height>0?j/b.height:.5,px:y,py:k,dx:_,dy:T}},o=(i,d)=>{const l=M.current++;n(b=>[...b,{id:l,x:i,y:d}])},s=i=>{var l,b,w,y;const d=t(i);o(d.px,d.py),(b=(l=x.current)==null?void 0:l.boost)==null||b.call(l),(y=(w=x.current)==null?void 0:w.start)==null||y.call(w),v(!0),window.setTimeout(()=>{v(!1)},650)};return p.jsxs("button",{type:"button",ref:u,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${P?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:h,onClick:h?void 0:s,onContextMenu:h?void 0:(i=>{var l,b,w,y;i.preventDefault();const d=t(i);o(d.px,d.py),(b=(l=x.current)==null?void 0:l.reverseBurst)==null||b.call(l),(y=(w=x.current)==null?void 0:w.start)==null||y.call(w)}),onWheel:h?void 0:(i=>{var d,l;(l=(d=x.current)==null?void 0:d.addScrollBoost)==null||l.call(d,i.deltaY*.003)}),onPointerDown:h?void 0:i=>{var l,b;a.current=i.pointerId;try{i.currentTarget.setPointerCapture(i.pointerId)}catch{}const d=t(i);(b=(l=x.current)==null?void 0:l.setPointer)==null||b.call(l,d.x,d.y,d.dx,d.dy)},onPointerMove:h?void 0:i=>{var l,b,w,y;if(a.current!=null&&i.pointerId!==a.current)return;const d=t(i);(b=(l=x.current)==null?void 0:l.setPointer)==null||b.call(l,d.x,d.y,d.dx,d.dy),(i.buttons&1)===1&&((y=(w=x.current)==null?void 0:w.drag)==null||y.call(w,d.dx))},onPointerUp:h?void 0:i=>{a.current!=null&&i.pointerId!==a.current||(a.current=null)},onPointerCancel:h?void 0:(()=>{a.current=null}),onMouseMove:h?void 0:i=>{var l,b;const d=t(i);(b=(l=x.current)==null?void 0:l.setPointer)==null||b.call(l,d.x,d.y,d.dx,d.dy)},onMouseLeave:h?void 0:(()=>{var i,d;a.current=null,C.current=null,(d=(i=x.current)==null?void 0:i.clearPointer)==null||d.call(i)}),onBlur:h?void 0:(()=>{var i,d;a.current=null,C.current=null,(d=(i=x.current)==null?void 0:i.clearPointer)==null||d.call(i)}),onKeyDown:h?void 0:(i=>{var d,l,b,w;(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),(l=(d=x.current)==null?void 0:d.boost)==null||l.call(d),(w=(b=x.current)==null?void 0:b.start)==null||w.call(b))}),children:[p.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),p.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),p.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),f.map(i=>p.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${i.x}px`,top:`${i.y}px`},"aria-hidden":!0},i.id)),p.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function mt({label:m,clickLabel:h,previewRequested:R=!1}){const u=ve(),g=c.useRef(null),[x,I]=c.useState(!1),[a,C]=c.useState(0),M=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=c.useCallback(()=>{C(Date.now()),I(!0)},[]),v=c.useCallback(()=>{u.navigateToSectionWithId("contact")},[u]),f=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),P())},n=c.useMemo(()=>x?ze({seed:`${a||Date.now()}:${m}`,reduceMotion:M}):"",[m,x,a,M]);return c.useEffect(()=>{let e=0,r=0;return R?(e=window.requestAnimationFrame(()=>{r=window.requestAnimationFrame(()=>{C(Date.now()),I(!0)})}),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)}):(I(!1),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)})},[R]),p.jsxs("div",{ref:g,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${x?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":x?"Kontakt preview":m,"aria-pressed":x,onClick:P,onKeyDown:f,children:[p.jsxs("div",{className:`article-web-art-tile-cta-preview ${x?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[x&&p.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:n,sandbox:"allow-scripts"},`${a}-${m}`),p.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!x&&p.jsx("div",{className:`loader ${M?"loader-reduce-motion":""}`,"aria-hidden":!0,children:p.jsxs("div",{className:"loader-inner",children:[p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})}),p.jsx("div",{className:"loader-line-wrap",children:p.jsx("div",{className:"loader-line"})})]})}),p.jsxs("div",{className:`article-web-art-tile-cta-content ${x?"article-web-art-tile-cta-content-hidden":""}`,children:[p.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:m}),p.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:h})]}),x&&p.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),v()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),v())},children:"Kontakt"})]})}function wt({locked:m=!1}){const h=c.useRef(null),R=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),u=c.useRef(!1),g=c.useRef(0),x=c.useRef(null),I=c.useRef(null),a=c.useRef(1),C=c.useRef(null),M=c.useRef(null),P=c.useRef(null);return c.useEffect(()=>{const v=h.current;if(!v)return;const f=w=>{const y=Math.max(0,Math.min(1,w));return y*y*(3-2*y)},n=()=>{const w=v.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),y=[];for(const k of w){const S=k.getAnimations?k.getAnimations():[];for(const j of S)y.push(j)}return y},e=w=>{const y=Math.max(1,Math.min(5.2,Number(w)||1));a.current=y;const k=n();for(const S of k)S.playbackRate=y},r=()=>{M.current!=null&&cancelAnimationFrame(M.current),P.current!=null&&window.clearTimeout(P.current),M.current=null,P.current=null},t=()=>{r(),e(5.2),P.current=window.setTimeout(()=>{const w=a.current,y=performance.now(),k=320,S=()=>{const j=(performance.now()-y)/k,E=f(j);e(w+(1-w)*E),j<1?M.current=requestAnimationFrame(S):M.current=null};M.current=requestAnimationFrame(S),P.current=null},2e3)},o=()=>{u.current=!1,x.current=null,v.classList.remove("article-web-art-tile-goldfish-held"),I.current!=null&&cancelAnimationFrame(I.current),I.current=null;const w=a.current,y=360,k=performance.now();C.current!=null&&cancelAnimationFrame(C.current);const S=()=>{const j=(performance.now()-k)/y,E=f(j);e(w+(1-w)*E),j<1?C.current=requestAnimationFrame(S):C.current=null};C.current=requestAnimationFrame(S)},s=()=>{if(!u.current)return;const w=performance.now()-g.current,y=1.2+4*f(w/2400);e(y),I.current=requestAnimationFrame(s)},i=w=>{if(!(R||m)&&!(w.button!=null&&w.button!==0)){r(),u.current=!0,g.current=performance.now(),x.current=w.pointerId,v.classList.add("article-web-art-tile-goldfish-held");try{v.setPointerCapture(w.pointerId)}catch{}C.current!=null&&(cancelAnimationFrame(C.current),C.current=null),I.current==null&&(I.current=requestAnimationFrame(s))}},d=()=>{const w=performance.now()-g.current;o(),w<220&&t()},l=()=>{o()},b=()=>{o()};return v.addEventListener("pointerdown",i),v.addEventListener("pointerup",d),v.addEventListener("pointercancel",l),v.addEventListener("lostpointercapture",b),()=>{v.removeEventListener("pointerdown",i),v.removeEventListener("pointerup",d),v.removeEventListener("pointercancel",l),v.removeEventListener("lostpointercapture",b),o(),r(),C.current!=null&&cancelAnimationFrame(C.current),C.current=null}},[m,R]),c.useEffect(()=>{const v=h.current;v&&v.classList.toggle("article-web-art-tile-goldfish-locked",m)},[m]),p.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:h,role:"img","aria-label":"Goldfish animation tile",children:[p.jsx("div",{className:"fish-stage",children:p.jsx("div",{className:"fish-wrapper",children:p.jsx("div",{className:"fish-container",children:p.jsxs("div",{className:"fish-parts",children:[p.jsx("div",{className:"fish-body front"}),p.jsx("div",{className:"fish-body back"}),p.jsx("div",{className:"fish-back-bottom-fin front"}),p.jsx("div",{className:"fish-back-bottom-fin back"}),p.jsx("div",{className:"fish-back-fin"}),p.jsx("div",{className:"fish-front-bottom-fin front"}),p.jsx("div",{className:"fish-front-bottom-fin back"}),p.jsx("div",{className:"fish-top-fin"})]})})})}),p.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function xt({locked:m=!1}){const h=c.useRef(null),R=c.useRef([]),u=c.useRef(0),g=c.useRef(0),x=Ae,I=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return c.useEffect(()=>{const a=h.current;if(!a)return;const C=R.current.filter(Boolean);if(!C.length)return;let M=!0,P=!1,v=null,f=null;const n=(w,y)=>{const k=(w-.5)*30;for(let S=0;S<C.length;S++){const j=C[S],E=S*18,_=S*8,T=(w-.5)*E,A=(y-.5)*_;j.style.transform=`translate3d(${T}px, ${A}px, 0) rotateY(${k}deg)`}},e=(w,y)=>{const k=Math.max(-.55,Math.min(.55,(w-.5)*1.1)),S=Math.max(-.35,Math.min(.35,(y-.5)*.7));n(.5+k,.5+S)},r=w=>{const y=a.getBoundingClientRect(),k=(w.clientX-y.left)/Math.max(1,y.width),S=(w.clientY-y.top)/Math.max(1,y.height);M=!0,g.current=performance.now()+650,e(Math.max(0,Math.min(1,k)),Math.max(0,Math.min(1,S)))},t=w=>{const y=a.getBoundingClientRect(),k=(w.clientX-y.left)/Math.max(1,y.width),S=(w.clientY-y.top)/Math.max(1,y.height);return{x:Math.max(0,Math.min(1,k)),y:Math.max(0,Math.min(1,S))}},o=w=>{if(w.pointerType==="mouse")return;P=!0,v=w.pointerId,M=!0,g.current=performance.now()+900;const y=t(w);e(y.x,y.y),!I&&f==null&&(f=requestAnimationFrame(b))},s=w=>{if(!P||v!=null&&w.pointerId!==v)return;M=!0,g.current=performance.now()+900;const y=t(w);e(y.x,y.y)},i=w=>{v!=null&&(w==null?void 0:w.pointerId)!=null&&w.pointerId!==v||(P=!1,v=null,M=!0,!I&&f==null&&(f=requestAnimationFrame(b)))},d=()=>{M=!0,!I&&f==null&&(f=requestAnimationFrame(b))},l=()=>{M=!0,!I&&f==null&&(f=requestAnimationFrame(b))},b=()=>{if(M){if(!I&&performance.now()>=g.current){u.current+=.008;const w=Math.sin(u.current)*.5+.5;e(w,.5)}f=requestAnimationFrame(b)}};return M=!m,a.addEventListener("mouseenter",d),a.addEventListener("mousemove",r),a.addEventListener("mouseleave",l),a.addEventListener("pointerdown",o),a.addEventListener("pointermove",s),a.addEventListener("pointerup",i),a.addEventListener("pointercancel",i),e(.5,.5),!I&&!m&&(f=requestAnimationFrame(b)),()=>{a.removeEventListener("mouseenter",d),a.removeEventListener("mousemove",r),a.removeEventListener("mouseleave",l),a.removeEventListener("pointerdown",o),a.removeEventListener("pointermove",s),a.removeEventListener("pointerup",i),a.removeEventListener("pointercancel",i),f!=null&&cancelAnimationFrame(f)}},[I]),p.jsxs("div",{ref:h,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[p.jsxs("div",{className:"patronus-card",children:[p.jsx("div",{className:"patronus-layer patronus-bg",ref:a=>{R.current[0]=a},children:p.jsx("img",{alt:"",src:x[0]})}),p.jsx("div",{className:"patronus-layer",ref:a=>{R.current[1]=a},children:p.jsx("img",{alt:"",src:x[1]})}),p.jsx("div",{className:"patronus-layer",ref:a=>{R.current[2]=a},children:p.jsx("img",{alt:"",src:x[2]})}),p.jsx("div",{className:"patronus-layer patronus-svg",ref:a=>{R.current[3]=a},dangerouslySetInnerHTML:{__html:je}}),p.jsx("div",{className:"patronus-layer",ref:a=>{R.current[4]=a},children:p.jsx("img",{alt:"",src:x[3]})}),p.jsx("div",{className:"patronus-layer",ref:a=>{R.current[5]=a},children:p.jsx("img",{alt:"",src:x[4]})}),p.jsx("div",{className:"patronus-layer",ref:a=>{R.current[6]=a},children:p.jsx("img",{alt:"",src:x[5]})})]}),p.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{Ct as default};
