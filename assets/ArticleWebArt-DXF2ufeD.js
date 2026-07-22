const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/androidBackgroundEngine-HmTe5YFf.js","assets/three-Dyw0HQ4s.js","assets/hourglassEngine-PtKKZ_Fz.js","assets/physics-hk55N7G6.js","assets/react-vendor-D1LkQUJD.js","assets/threeTunnelEngine-BYxOaRL9.js","assets/threePolygonDemo5Engine-J7VS_NUu.js","assets/prismFieldEngine-BQpxImA_.js","assets/soupShaderEngine-BVaccG7j.js","assets/tardisWormholeEngine-Czkyopnk.js"])))=>i.map(i=>d[i]);
import{d as Ne,i as ve,A as ue,n as H}from"./index-C_8jTop3.js";import{r as c,j as m}from"./react-vendor-D1LkQUJD.js";/* empty css              */import"./bootstrap-CZ9Xp6WG.js";import"./vendor-BWbgyn18.js";const je=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`;function $(p,{timeoutMs:b=1200}={}){if(typeof window>"u")return p(),()=>{};if("requestIdleCallback"in window){const d=window.requestIdleCallback(()=>p(),{timeout:b});return()=>window.cancelIdleCallback(d)}const M=window.setTimeout(()=>p(),0);return()=>window.clearTimeout(M)}function de(p){var l,g,R,P;if(!p)return{width:1,height:1};const b=p.getBoundingClientRect(),M=(g=(l=p.parentElement)==null?void 0:l.getBoundingClientRect)==null?void 0:g.call(l),d=(M==null?void 0:M.width)||((R=p.parentElement)==null?void 0:R.clientWidth)||1,C=(M==null?void 0:M.height)||((P=p.parentElement)==null?void 0:P.clientHeight)||d,x=Math.max(1,Math.round(b.width||p.clientWidth||d)),k=Math.max(1,Math.round(b.height||p.clientHeight||C));return{width:x,height:k}}function z(p,b,M=1){var l,g,R;const{width:d,height:C}=de(p),x=typeof window<"u"&&((g=(l=window.matchMedia)==null?void 0:l.call(window,"(pointer: coarse)"))==null?void 0:g.matches),k=Math.min(x?1:1.5,Math.max(1,Number(M)||1));if((d<32||C<32)&&typeof window<"u"){window.requestAnimationFrame(()=>{var v;const P=de(p);P.width>=32&&P.height>=32&&((v=b==null?void 0:b.setSize)==null||v.call(b,P.width,P.height,k))});return}(R=b==null?void 0:b.setSize)==null||R.call(b,d,C,k)}function fe(p,b,M="smooth"){if(typeof window>"u")return;const d=document.getElementById(p),C=document.getElementById(`scrollable-${b}`);if(!d||!C)return;const x=d.getBoundingClientRect(),k=C.getBoundingClientRect(),l=C.scrollTop+(x.top-k.top);C.scrollTo({top:Math.max(0,l),behavior:M})}const _e=9,Le=9,Te=10,Ae=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],ye=6,De=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function ne(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(pointer: coarse), (max-width: 767px)").matches}function he(p){const b=new Set(p);if(!ne())return b;for(;b.size>ye;)b.delete(b.values().next().value);return b}function re(p){if(!ne())return new Set(p);const b=new Set;for(const M of p){if(b.size>=ye)break;b.add(M)}return b}function be(p,b){if(b.size===0)return!1;for(const M of b)if(!p.has(M))return!1;return!0}function Oe(p=_e,b=Le,M=Te){const d=p*b,C=Math.max(1,Math.min(M,d-1)),x=new Set;for(;x.size<C;)x.add(Math.floor(Math.random()*d));const k=new Array(d).fill(0);for(let l=0;l<d;l++){if(x.has(l)){k[l]=-1;continue}const g=l%b,R=Math.floor(l/b);let P=0;for(let v=-1;v<=1;v++)for(let f=-1;f<=1;f++){if(f===0&&v===0)continue;const o=g+f,e=R+v;o<0||e<0||o>=b||e>=p||x.has(e*b+o)&&(P+=1)}k[l]=P}return{rows:p,cols:b,mineCount:C,mines:x,counts:k}}function Be(p,b,M,d){const C=new Set(M),x=[p];for(;x.length>0;){const k=x.pop();if(k==null||C.has(k)||d.has(k)||b.mines.has(k)||(C.add(k),b.counts[k]!==0))continue;const l=k%b.cols,g=Math.floor(k/b.cols);for(let R=-1;R<=1;R++)for(let P=-1;P<=1;P++){if(P===0&&R===0)continue;const v=l+P,f=g+R;v<0||f<0||v>=b.cols||f>=b.rows||x.push(f*b.cols+v)}}return C}function me(p,b,M){const d=p.rows*p.cols-p.mineCount;if(b.size>=d)return!0;if(M.size!==p.mineCount)return!1;for(const C of p.mines)if(!M.has(C))return!1;return!0}function He(p){return`Web art ${String(p||"tile").toLowerCase()} tile loading`}function ze({seed:p,reduceMotion:b}){const M=JSON.stringify(Ee.split("<\/script>").join("<\\/script>")),d=JSON.stringify(p);return`<!doctype html>
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
const moduleSource = ${M}
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
</html>`}function pe(p){return Array.isArray(p)?p.map((b,M)=>{const d=b!=null&&b.tone?` article-web-art-intro-guide-fragment-${b.tone}`:"";return m.jsx("span",{className:`article-web-art-intro-guide-fragment${d}`,children:b==null?void 0:b.text},`${(b==null?void 0:b.text)||"fragment"}-${M}`)}):p}function gt({dataWrapper:p,id:b}){var ce;const M=Ne(),d=ve(),C=`${p.uniqueId}-ambient-trace`,x=`${p.uniqueId}-ambient-hex`,k=`${p.uniqueId}-ambient-plop`,l=`${p.uniqueId}-ambient-julia`,g=`${p.uniqueId}-ambient-mines`,R=`${p.uniqueId}-ambient-rings`,P=`${p.uniqueId}-ambient-prism`,v=`${p.uniqueId}-ambient-rope`,f=`${p.uniqueId}-ambient-soup`,o=`${p.uniqueId}-ambient-tardis`,[e,r]=c.useState(null),[t,i]=c.useState(!0),n=c.useMemo(()=>p.orderedItems,[p.orderedItems]),s=c.useMemo(()=>{const j=[4,5,3,6,1,2,7,8,9,10,11,12,13,14,15],A=new Map(n.map(B=>[Number(B==null?void 0:B.id),B])),T=[];for(const B of j){const K=A.get(B);K&&T.push(K)}for(const B of n){if(!B)continue;const K=Number(B==null?void 0:B.id);j.includes(K)||T.push(B)}return T},[n]),a=c.useRef(null),[u,h]=c.useState(!1),w=c.useRef(new Set),y=c.useRef(new Map),[I,S]=c.useState(0),[N,E]=c.useState(-1),[_,L]=c.useState(()=>new Set),[D,O]=c.useState(()=>new Set),[q,V]=c.useState(!1),G=c.useMemo(()=>{const j=s.map(A=>A==null?void 0:A.uniqueId).filter(Boolean);return j.push(C,x,k,l,g,P,R,v,f,o,"ambient-goldfish","ambient-patronus"),new Set(j)},[x,l,g,k,P,R,v,f,o,C,s]),U=c.useMemo(()=>Array.from(D).filter(j=>j!=="ambient-goldfish"&&j!=="ambient-patronus"),[D]),F=t,Z=M.selectedLanguageId||"en";let J=M.getString("send_yours");typeof J=="string"&&J.startsWith("locale:")&&(J={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[Z]||"Send yours!");let Q=M.getString("click");typeof Q=="string"&&Q.startsWith("locale:")&&(Q={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[Z]||"Click");const se={en:{title:"Doors of the world behind an amazing art gallery.",guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",guide:{eyebrow:"So funktioniert es",lines:["Betritt die Galerie und schau dir die Karten in Ruhe an.","Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.","Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."]},button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",guide:{eyebrow:"Kako istraživati",lines:["Uđi u galeriju i istražuj kartice svojim tempom.","Klikni, dodirni ili pritisni karticu da otkriješ što skriva.","Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme."]},button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",guide:{eyebrow:"Nasıl gezilir",lines:["Galeriye girin ve kartları kendi temponuzda inceleyin.","İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.","Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir."]},button:"Gir",preparing:"Hazırlanıyor..."}}[Z]||{guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter"},Me="hide",Y=c.useCallback(j=>{if(!j||w.current.has(j))return;w.current.add(j);const A=y.current.get(j);A!=null&&(window.clearTimeout(A),y.current.delete(j)),S(w.current.size)},[]),ie=c.useCallback(j=>{j&&O(A=>{if(A.has(j))return A;const T=new Set(A);return T.add(j),he(T)})},[]),W=c.useCallback(()=>{for(const j of y.current.values())window.clearTimeout(j);y.current=new Map,w.current=new Set,S(0),E(-1),h(!1),L(new Set),O(new Set),V(!1)},[]),ee=c.useCallback(()=>{const j=re(G);O(j),L(new Set(j)),V(!ne())},[G]),te=c.useCallback(({openAll:j=!1}={})=>{if(i(!1),h(!0),E(s.length-1),j){ee();return}L(new Set),O(new Set),V(!1)},[s.length,ee]);c.useEffect(()=>{var le;if(typeof window>"u"||((le=d.targetSection)==null?void 0:le.id)!==p.sectionId||d.transitionStatus!=="transition_status_none")return;const j=window.__pendingSectionAction;if(!j||j.action!=="enter"||j.sectionId!==p.sectionId||j.targetArticleId&&j.targetArticleId!==p.uniqueId)return;if(Date.now()-(j.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,te({openAll:!0});const A=j.targetArticleId||p.uniqueId;let T=null,B=null,K=null,X=null;return T=window.setTimeout(()=>{B=window.requestAnimationFrame(()=>{fe(A,p.sectionId),K=window.setTimeout(()=>{X=window.requestAnimationFrame(()=>{fe(A,p.sectionId)})},220)})},90),()=>{T!==null&&window.clearTimeout(T),B!==null&&window.cancelAnimationFrame(B),K!==null&&window.clearTimeout(K),X!==null&&window.cancelAnimationFrame(X)}},[p.uniqueId,p.sectionId,(ce=d.targetSection)==null?void 0:ce.id,d.transitionStatus,te]);const oe=c.useCallback(j=>{j&&(ie(j),L(A=>{if(A.has(j))return A;const T=new Set(A);return T.add(j),he(T)}))},[ie]),ae=c.useCallback(j=>{j&&(L(A=>{if(!A.has(j))return A;const T=new Set(A);return T.delete(j),T}),O(A=>{if(!A.has(j))return A;const T=new Set(A);return T.delete(j),T}))},[]),Re=re(G),Ce=be(_,Re),ge=c.useCallback(()=>{const j=re(G);if(be(_,j)){L(new Set),O(new Set),V(!1);return}ee()},[G,ee,_]),Pe=c.useCallback(()=>{W(),i(!0)},[W]),ke=(j,A)=>{const T=Number(j==null?void 0:j.id);return T===1?"Hover":T===2?"Wave":T===3?"3D":T===4?"Poly":T===5?"Click":T===6?"Orbit":T===7?"Spin":T===8?"Shape":T===9?"Hourglass":T===10?"Noice":T===11?"Distance":T===12?"Android":T===13?"Pulse":T===14?"Bars":T===15?"Deep":String(A+1)},Ie=s.map((j,A)=>{if(!u)return m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${A+1} loading`},j.uniqueId);const T=j.uniqueId,B=_.has(T),K=D.has(T)||B;return m.jsx(we,{label:ke(j,A),isOpen:B,onToggle:()=>{B?ae(T):oe(T)},shouldRender:K,children:K&&m.jsx(Fe,{itemWrapper:j,index:A,locked:F||!B,activate:A<=N,onReady:Y})},T)}),Se=u?[{key:"ambient-trace",tileId:C,label:"Trace",render:j=>m.jsx(st,{readyId:C,locked:F||!j,onReady:Y})},{key:"ambient-hex",tileId:x,label:"Hex",render:j=>m.jsx(it,{readyId:x,locked:F||!j,onReady:Y})},{key:"ambient-plop",tileId:k,label:"Plop",render:j=>m.jsx(ot,{readyId:k,locked:F||!j,onReady:Y})},{key:"ambient-julia",tileId:l,label:"Julia",render:j=>m.jsx(at,{readyId:l,locked:F||!j,onReady:Y})},{key:"ambient-mines",tileId:g,label:"Bomb",render:j=>m.jsx(ct,{readyId:g,locked:F||!j,onReady:Y})},{key:"ambient-rings",tileId:R,label:"Fall",render:j=>m.jsx(lt,{readyId:R,locked:F||!j,onReady:Y})},{key:"ambient-prism",tileId:P,label:"Prism",render:j=>m.jsx(ut,{readyId:P,locked:F||!j,onReady:Y})},{key:"ambient-rope",tileId:v,label:"Rope",render:j=>m.jsx(dt,{readyId:v,locked:F||!j,onReady:Y})},{key:"ambient-soup",tileId:f,label:"Soup",render:j=>m.jsx(bt,{readyId:f,locked:F||!j,onReady:Y})},{key:"ambient-tardis",tileId:o,label:"Tardis",render:j=>m.jsx(mt,{readyId:o,locked:F||!j,onReady:Y})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:j=>m.jsx(wt,{locked:F||!j})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:j=>m.jsx(xt,{locked:F||!j})}].map(({key:j,tileId:A,label:T,render:B})=>{const K=_.has(A),X=D.has(A)||K;return m.jsx(we,{label:T,isOpen:K,onToggle:()=>{K?ae(A):oe(A)},shouldRender:X,children:X&&B(K)},j)}):[m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return c.useEffect(()=>{W()},[p.uniqueId,W]),c.useEffect(()=>{u&&E(s.length-1)},[u,s.length]),c.useEffect(()=>{if(u)for(const j of U){if(!j||w.current.has(j)||y.current.has(j))continue;const A=window.setTimeout(()=>{Y(j)},12e3);y.current.set(j,A)}},[u,U,Y]),m.jsx(ue,{id:p.uniqueId,type:ue.Types.SPACING_DEFAULT,dataWrapper:p,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:r,children:m.jsxs("div",{className:"article-web-art-shell",children:[m.jsx($e,{guide:se.guide,buttonLabel:t?se.button:Me,hidden:!t,onEnter:t?te:Pe,secondaryButtonLabel:t?null:"promaja",onSecondaryAction:t?null:ge,secondaryPressed:Ce}),m.jsx("div",{className:`article-web-art-stage ${t?"article-web-art-stage-preview":""}`,"aria-hidden":t,children:m.jsxs("div",{className:`article-web-art-items ${F?"article-web-art-items-locked":""}`,ref:a,"aria-busy":t,children:[u&&m.jsx(pt,{label:J,clickLabel:Q,previewRequested:q}),Ie,Se]})})]})})}function $e({guide:p,buttonLabel:b,hidden:M,onEnter:d,secondaryButtonLabel:C=null,onSecondaryAction:x=null,secondaryPressed:k=!1}){const l=g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),d())};return m.jsx("div",{className:`article-web-art-intro-cover ${M?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:m.jsx("div",{className:"article-web-art-intro-cover-inner",children:m.jsx("div",{className:"article-web-art-intro-cover-actions",children:m.jsx("div",{className:`article-web-art-intro-guide ${M?"article-web-art-intro-guide-hidden":"article-web-art-intro-guide-open"}`,children:m.jsxs("div",{className:"article-web-art-intro-guide-inner",children:[m.jsxs("div",{className:"article-web-art-intro-guide-top-row",children:[m.jsxs("div",{className:"article-web-art-intro-guide-top-copy",children:[m.jsx("span",{className:"article-web-art-intro-guide-eyebrow",children:p.eyebrow}),m.jsx("p",{className:"article-web-art-intro-guide-line article-web-art-intro-guide-line-primary",children:pe(p.lines[0])})]}),m.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[C?m.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${k?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:x||void 0,"aria-pressed":k,"aria-label":C,children:C}):null,m.jsx("button",{type:"button",className:"article-web-art-intro-cover-button article-web-art-intro-cover-button-primary",onClick:d,onKeyDown:l,"aria-label":b,children:b})]})]}),m.jsx("div",{className:"article-web-art-intro-guide-lines",children:p.lines.slice(1).map((g,R)=>m.jsx("p",{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${R+2}`,children:pe(g)},Array.isArray(g)?g.map(P=>P==null?void 0:P.text).join(""):g))})]})})})})})}function we({label:p,isOpen:b,onToggle:M,shouldRender:d=!0,children:C}){const x=c.useCallback(k=>{var l,g;b||k.defaultPrevented||(g=(l=k.target).closest)!=null&&g.call(l,"button")||M==null||M()},[b,M]);return m.jsxs("div",{className:`article-web-art-gated-tile ${b?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,onClick:b?void 0:x,children:[d?C:m.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":He(p)}),m.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),m.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${b?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:M,"aria-label":`${b?"Hide":"Show"} ${p}`,children:p})]})}function Fe({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){return Number(p.id)===1?m.jsx(We,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===2?m.jsx(et,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===3?m.jsx(tt,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===4?m.jsx(rt,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===6?m.jsx(nt,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===7?m.jsx(Ve,{itemWrapper:p,locked:d,onReady:C}):Number(p.id)===8?m.jsx(Ye,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===9?m.jsx(Ue,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===10?m.jsx(Xe,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===11?m.jsx(qe,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===12?m.jsx(Ke,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===13?m.jsx(Qe,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===14?m.jsx(Ge,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):Number(p.id)===15?m.jsx(Ze,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C}):m.jsx(Je,{itemWrapper:p,index:b,activate:M,locked:d,onReady:C})}function qe({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(!1),R=c.useRef(!0),P=c.useRef(null),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:54013+(Number(p.id)||11)*7331,reduceMotion:v}),[p.id,v]);c.useEffect(()=>{if(!M)return;const e=x.current,r=k.current;if(!e||!r)return;let t=!1,i=null,n=null,s=null;const a=()=>{g.current||(g.current=!0,C==null||C(p.uniqueId))},u=$(async()=>{var h,w;try{const y=await H(()=>import("./distanceFieldEngine-DHTRwy4W.js"),[]);if(t)return;i=y.createDistanceFieldEngine(r,f),l.current=i;const I=()=>z(e,i,Math.min(1.5,window.devicePixelRatio||1));I(),(h=i.renderStatic)==null||h.call(i),d||(w=i.start)==null||w.call(i),a(),n=new ResizeObserver(()=>{I()}),n.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(S=>{var N,E,_,L;for(const D of S){if(R.current=!!D.isIntersecting,d){(N=i.setHoverActive)==null||N.call(i,!1),(E=i.stop)==null||E.call(i);continue}R.current?(_=i.start)==null||_.call(i):(L=i.stop)==null||L.call(i)}},{threshold:.25}),s.observe(e))}catch{a()}},{timeoutMs:220});return()=>{var h;t=!0,u==null||u(),s==null||s.disconnect(),n==null||n.disconnect(),(h=i==null?void 0:i.destroy)==null||h.call(i),l.current=null}},[M,f,p.uniqueId,d,C]),c.useEffect(()=>{var r,t,i,n;const e=l.current;if(e){if(d){(r=e.setHoverActive)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(i=e.stop)==null||i.call(e);return}R.current&&((n=e.start)==null||n.call(e))}},[d]);const o=e=>{const r=x.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return m.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${b+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,r,t,i;(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(i=(t=l.current)==null?void 0:t.start)==null||i.call(t)}),onPointerMove:d?void 0:(e=>{var t,i,n,s;const r=o(e);(i=(t=l.current)==null?void 0:t.setHoverActive)==null||i.call(t,!0),(s=(n=l.current)==null?void 0:n.setPointer)==null||s.call(n,r.x,r.y)}),onPointerLeave:d?void 0:(()=>{var e,r,t,i;P.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(i=(t=l.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onPointerDown:d?void 0:(e=>{var t,i,n,s,a,u;if(e.button!=null&&e.button!==0)return;P.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const r=o(e);(i=(t=l.current)==null?void 0:t.setHoverActive)==null||i.call(t,!0),(s=(n=l.current)==null?void 0:n.setPointer)==null||s.call(n,r.x,r.y),(u=(a=l.current)==null?void 0:a.boostPopulation)==null||u.call(a)}),onPointerUp:d?void 0:(e=>{P.current!=null&&e.pointerId!==P.current||(P.current=null)}),onPointerCancel:d?void 0:(()=>{var e,r,t,i;P.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(i=(t=l.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onFocus:d?void 0:(()=>{var e,r,t,i;(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(i=(t=l.current)==null?void 0:t.start)==null||i.call(t)}),onBlur:d?void 0:(()=>{var e,r,t,i;P.current=null,(r=(e=l.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(i=(t=l.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onKeyDown:d?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=l.current)==null?void 0:r.boostPopulation)==null||t.call(r))}),children:[m.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function Ke({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(null),R=c.useRef(null),P=c.useRef(!1),v=c.useRef(!0),f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!M)return;const e=x.current,r=k.current,t=l.current;if(!e||!r||!t)return;let i=!1,n=null,s=null,a=null,u=null;const h=()=>{P.current||(P.current=!0,C==null||C(p.uniqueId))},w=$(async()=>{var y,I,S,N;try{const E=await H(()=>import("./androidBackgroundEngine-HmTe5YFf.js"),__vite__mapDeps([0,1])),_=await H(()=>import("./androidRobotEngine-CNxYykCI.js"),[]);if(i)return;n=E.createAndroidBackgroundEngine(r,{reduceMotion:f}),g.current=n,s=_.createAndroidRobotEngine(t,{reduceMotion:f}),R.current=s;const L=()=>{const D=Math.min(1.5,window.devicePixelRatio||1);z(e,n,D),z(e,s,D)};L(),(y=n.renderStatic)==null||y.call(n),(I=s.renderStatic)==null||I.call(s),d||(S=n.start)==null||S.call(n),d||(N=s.start)==null||N.call(s),h(),a=new ResizeObserver(()=>{L()}),a.observe(e),"IntersectionObserver"in window&&(u=new IntersectionObserver(D=>{var O,q,V,G,U,F;for(const Z of D){if(v.current=!!Z.isIntersecting,d){(O=n.stop)==null||O.call(n),(q=s.stop)==null||q.call(s);continue}v.current?((V=n.start)==null||V.call(n),(G=s.start)==null||G.call(s)):((U=n.stop)==null||U.call(n),(F=s.stop)==null||F.call(s))}},{threshold:.2}),u.observe(e))}catch{h()}},{timeoutMs:220});return()=>{var y,I;i=!0,w==null||w(),u==null||u.disconnect(),a==null||a.disconnect(),(y=n==null?void 0:n.destroy)==null||y.call(n),(I=s==null?void 0:s.destroy)==null||I.call(s),g.current=null,R.current=null}},[M,p.uniqueId,d,C,f]),c.useEffect(()=>{var t,i,n,s,a;const e=R.current,r=g.current;if(!(!e||!r)){if(d){(t=e.clearPointer)==null||t.call(e),(i=r.stop)==null||i.call(r),(n=e.stop)==null||n.call(e);return}v.current&&((s=r.start)==null||s.call(r),(a=e.start)==null||a.call(e))}},[d]);const o=e=>{const r=x.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return m.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android","aria-label":`Android web art tile ${b+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,r;(r=(e=R.current)==null?void 0:e.start)==null||r.call(e)}),onPointerMove:d?void 0:(e=>{var t,i;const r=o(e);(i=(t=R.current)==null?void 0:t.setPointer)==null||i.call(t,r.x,r.y)}),onPointerLeave:d?void 0:(()=>{var e,r;(r=(e=R.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onFocus:d?void 0:(()=>{var e,r;(r=(e=R.current)==null?void 0:e.start)==null||r.call(e)}),onBlur:d?void 0:(()=>{var e,r;(r=(e=R.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onClick:d?void 0:(()=>{var e,r;(r=(e=R.current)==null?void 0:e.poke)==null||r.call(e)}),onKeyDown:d?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=R.current)==null?void 0:r.poke)==null||t.call(r))}),children:[m.jsx("canvas",{ref:k,className:"article-web-art-android-bg-canvas","aria-hidden":!0}),m.jsx("div",{className:"article-web-art-android-glow","aria-hidden":!0}),m.jsx("canvas",{ref:l,className:"article-web-art-android-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Android"})]})}function Ve({itemWrapper:p,locked:b,onReady:M}){const d=c.useRef(!1);c.useEffect(()=>{d.current||(d.current=!0,M==null||M(p.uniqueId))},[p.uniqueId,M]);const C=c.useMemo(()=>[{key:"stop",hoverMode:"stop",hoverDuration:"5s"},{key:"slow",hoverMode:"slow",hoverDuration:"18s"},{key:"super-fast",hoverMode:"super-fast",hoverDuration:"0.22s"},{key:"very-fast",hoverMode:"very-fast",hoverDuration:"0.55s"}],[]);return m.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${b?"article-web-art-spin-boxes-locked":""}`,children:m.jsx("div",{className:"article-web-art-spin-boxes-grid",children:C.map(({key:x,hoverDuration:k,hoverMode:l})=>m.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--spin-hover-duration":k},children:m.jsx("div",{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${l}`})},x))})})}function Ge({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(!1),k=50,l=c.useMemo(()=>["level-1","level-2","level-3","level-4","level-5"],[]),[g,R]=c.useState(0),P=l[g],v=c.useMemo(()=>Array.from({length:k},(o,e)=>{const r=`${3/(k/2)*(e+1)}s`;return{key:e,style:{animationDelay:r,"--bar-index":e}}}),[]),f=c.useCallback(o=>{var e,r;(e=o==null?void 0:o.preventDefault)==null||e.call(o),(r=o==null?void 0:o.stopPropagation)==null||r.call(o),R(t=>(t+1)%l.length)},[l.length]);return c.useEffect(()=>{M&&(x.current||(x.current=!0,C==null||C(p.uniqueId)))},[M,p.uniqueId,C]),m.jsx("button",{type:"button",className:"article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable","aria-label":`Bars web art tile ${b+1}, ${P.replace("level-","mode ")}`,disabled:d,onClick:d?void 0:f,onKeyDown:d?void 0:o=>{(o.key==="Enter"||o.key===" ")&&f(o)},children:m.jsx("div",{className:`article-web-art-bars-stage article-web-art-bars-stage-${P}`,children:m.jsx("div",{className:`article-web-art-bars article-web-art-bars-${P}`,children:v.map(o=>m.jsx("div",{className:"article-web-art-bars-panel",style:o.style},o.key))})})})}function Ye({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(!1),R=c.useRef(!0),P=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=c.useMemo(()=>({seed:1729+(Number(p.id)||8)*4242,reduceMotion:P,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[p.id,P]);c.useEffect(()=>{if(!M)return;const t=x.current,i=k.current;if(!t||!i)return;let n=!1,s=null,a=null,u=null;const h=()=>{g.current||(g.current=!0,C==null||C(p.uniqueId))},w=$(async()=>{var y,I,S;try{const N=await H(()=>import("./shapeFieldEngine-B_ToSidK.js"),[]);if(n)return;s=N.createShapeFieldEngine(i,v),l.current=s;const E=()=>z(t,s,window.devicePixelRatio||1);E(),(y=s.renderStatic)==null||y.call(s),(I=s.triggerWave)==null||I.call(s),d||(S=s.start)==null||S.call(s),h(),a=new ResizeObserver(()=>{var _;E(),(_=s.renderStatic)==null||_.call(s)}),a.observe(t),"IntersectionObserver"in window&&(u=new IntersectionObserver(_=>{var L,D,O;for(const q of _){if(R.current=!!q.isIntersecting,d){(L=s.stop)==null||L.call(s);continue}R.current?(D=s.start)==null||D.call(s):(O=s.stop)==null||O.call(s)}},{threshold:.2}),u.observe(t))}catch{h()}});return()=>{var y;n=!0,w==null||w(),u==null||u.disconnect(),a==null||a.disconnect(),(y=s==null?void 0:s.destroy)==null||y.call(s),l.current=null}},[M,v,p.uniqueId,d,C]),c.useEffect(()=>{var i,n,s;const t=l.current;if(t){if(d){(i=t.clearPointer)==null||i.call(t),(n=t.stop)==null||n.call(t);return}R.current&&((s=t.start)==null||s.call(t))}},[d]);const f=t=>{const i=k.current||x.current;if(!i)return{x:0,y:0};const n=i.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}},o=t=>{var n,s;const i=f(t);(s=(n=l.current)==null?void 0:n.setPointer)==null||s.call(n,i.x,i.y)},e=t=>{var n,s,a,u;const i=f(t);(s=(n=l.current)==null?void 0:n.setPointer)==null||s.call(n,i.x,i.y),(u=(a=l.current)==null?void 0:a.triggerWave)==null||u.call(a,i.x,i.y)},r=t=>{var i,n;t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),(n=(i=l.current)==null?void 0:i.triggerWave)==null||n.call(i))};return m.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${b+1}`,disabled:d,onPointerMove:d?void 0:o,onPointerDown:d?void 0:e,onPointerLeave:d?void 0:(()=>{var t,i;return(i=(t=l.current)==null?void 0:t.clearPointer)==null?void 0:i.call(t)}),onBlur:d?void 0:(()=>{var t,i;return(i=(t=l.current)==null?void 0:t.clearPointer)==null?void 0:i.call(t)}),onKeyDown:d?void 0:r,children:[m.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function Ue({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(!1),R=c.useRef(!0),[P,v]=c.useState(2.8),[f,o]=c.useState(.01);c.useEffect(()=>{if(!M)return;const s=x.current,a=k.current;if(!s||!a)return;let u=!1,h=null,w=null,y=null;const I=()=>{g.current||(g.current=!0,C==null||C(p.uniqueId))},S=$(async()=>{var N,E,_;try{const L=await H(()=>import("./hourglassEngine-PtKKZ_Fz.js"),__vite__mapDeps([2,3,4]));if(u)return;h=L.createHourglassEngine(a),l.current=h;const D=(N=h.getState)==null?void 0:N.call(h);D&&(v(D.gravity),o(D.neckRatio));const O=()=>z(s,h,window.devicePixelRatio||1);O(),(E=h.renderStatic)==null||E.call(h),d||(_=h.start)==null||_.call(h),I(),w=new ResizeObserver(()=>{var q;O(),(q=h.renderStatic)==null||q.call(h)}),w.observe(s),"IntersectionObserver"in window&&(y=new IntersectionObserver(q=>{var V,G,U;for(const F of q){if(R.current=!!F.isIntersecting,d){(V=h.stop)==null||V.call(h);continue}R.current?(G=h.start)==null||G.call(h):(U=h.stop)==null||U.call(h)}},{threshold:.2}),y.observe(s))}catch{I()}});return()=>{var N;u=!0,S==null||S(),y==null||y.disconnect(),w==null||w.disconnect(),(N=h==null?void 0:h.destroy)==null||N.call(h),l.current=null}},[M,p.uniqueId,d,C]),c.useEffect(()=>{var a,u;const s=l.current;if(s){if(d){(a=s.stop)==null||a.call(s);return}R.current&&((u=s.start)==null||u.call(s))}},[d]);const e=s=>{var a,u;s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),(u=(a=l.current)==null?void 0:a.flip)==null||u.call(a))},r=s=>{s.stopPropagation()},t=s=>{s.stopPropagation()},i=s=>{var u,h;const a=Number(s.target.value);v(a),(h=(u=l.current)==null?void 0:u.setGravity)==null||h.call(u,a)},n=s=>{var u,h,w,y;const a=Number(s.target.value);o(a),(h=(u=l.current)==null?void 0:u.setNeckRatio)==null||h.call(u,a),!d&&R.current&&((y=(w=l.current)==null?void 0:w.start)==null||y.call(w))};return m.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass",role:d?void 0:"button",tabIndex:d?-1:0,"aria-label":`Hourglass web art tile ${b+1}`,onClick:d?void 0:(()=>{var s,a;return(a=(s=l.current)==null?void 0:s.flip)==null?void 0:a.call(s)}),onKeyDown:d?void 0:e,children:[m.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),m.jsxs("div",{className:"article-web-art-hourglass-controls",onClickCapture:t,onPointerDownCapture:t,onPointerUpCapture:t,onClick:r,onPointerDown:r,onPointerUp:r,onKeyDown:r,children:[m.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-left",children:[m.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Neck"}),m.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.01",max:"0.22",step:"0.001",value:f,onChange:n,disabled:d,"aria-label":"Hourglass neck size"})]}),m.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-right",children:[m.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Gravity"}),m.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.45",max:"2.8",step:"0.01",value:P,onChange:i,disabled:d,"aria-label":"Hourglass gravity"})]})]}),m.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function Xe({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(null),R=c.useRef(!1),P=c.useRef(!0),[v,f]=c.useState(!1),o=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!M)return;const t=x.current,i=k.current,n=l.current;if(!t||!i||!n)return;let s=!1,a=null,u=null,h=null;const w=()=>{R.current||(R.current=!0,C==null||C(p.uniqueId))},y=N=>{s||(f(!0),w())},I=()=>{var N;return s?!1:((N=a==null?void 0:a.renderStatic)==null||N.call(a),a!=null&&a.hasVisibleFrame&&!a.hasVisibleFrame()?(y(),!1):(f(!1),w(),!0))},S=$(async()=>{var N;try{const E=await H(()=>import("./noiceShaderEngine-OW62H83V.js"),[]);if(s)return;a=E.createNoiceShaderEngine({backgroundCanvas:i,foregroundCanvas:n},{reduceMotion:o}),g.current=a;const _=()=>z(t,a,Math.min(1.5,window.devicePixelRatio||1));if(_(),!I())return;d||(N=a.start)==null||N.call(a),u=new ResizeObserver(()=>{var D;_(),(D=a==null?void 0:a.renderStatic)==null||D.call(a)}),u.observe(t),"IntersectionObserver"in window&&(h=new IntersectionObserver(D=>{var O,q,V;for(const G of D){if(P.current=!!G.isIntersecting,d){(O=a.stop)==null||O.call(a);continue}P.current?(q=a.start)==null||q.call(a):(V=a.stop)==null||V.call(a)}},{threshold:.25}),h.observe(t))}catch{y()}},{timeoutMs:220});return()=>{var N;s=!0,S==null||S(),h==null||h.disconnect(),u==null||u.disconnect(),(N=a==null?void 0:a.destroy)==null||N.call(a),g.current=null}},[M,p.uniqueId,d,C,o]),c.useEffect(()=>{var i,n,s;const t=g.current;if(t){if(d){(i=t.clearPointer)==null||i.call(t),(n=t.stop)==null||n.call(t);return}P.current&&((s=t.start)==null||s.call(t))}},[d]);const e=t=>{const i=x.current;if(!i)return{x:.5,y:.5};const n=i.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(t.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(t.clientY-n.top)/Math.max(1,n.height)))}},r=t=>{var n,s,a,u,h,w;const i=e(t);(s=(n=g.current)==null?void 0:n.setPointer)==null||s.call(n,i.x,i.y),(u=(a=g.current)==null?void 0:a.pulsePattern)==null||u.call(a),(w=(h=g.current)==null?void 0:h.start)==null||w.call(h)};return m.jsxs("button",{type:"button",ref:x,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice ${v?"article-web-art-tile-noice-fallback-active":""}`,"aria-label":`Noice web art tile ${b+1}`,disabled:d,onPointerMove:d?void 0:(t=>{var n,s;const i=e(t);(s=(n=g.current)==null?void 0:n.setPointer)==null||s.call(n,i.x,i.y)}),onPointerDown:d?void 0:(t=>{t.button!=null&&t.button!==0||r(t)}),onMouseLeave:d?void 0:(()=>{var t,i;(i=(t=g.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onBlur:d?void 0:(()=>{var t,i;(i=(t=g.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onKeyDown:d?void 0:(t=>{var i,n,s,a;(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),(n=(i=g.current)==null?void 0:i.pulsePattern)==null||n.call(i),(a=(s=g.current)==null?void 0:s.start)==null||a.call(s))}),children:[v&&m.jsxs("div",{className:"article-web-art-noice-fallback","aria-hidden":!0,children:[m.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-a"}),m.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-b"}),m.jsx("span",{className:"article-web-art-noice-fallback-line article-web-art-noice-fallback-line-c"})]}),m.jsx("canvas",{ref:k,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-bg-canvas ${v?"article-web-art-canvas-hidden":""}`}),m.jsx("canvas",{ref:l,className:`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-fg-canvas ${v?"article-web-art-canvas-hidden":""}`}),m.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function Ze({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(!1),R=c.useRef(!0),P=c.useRef(null),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!M)return;const o=x.current,e=k.current;if(!o||!e)return;let r=!1,t=null,i=null,n=null;const s=()=>{g.current||(g.current=!0,C==null||C(p.uniqueId))},a=$(async()=>{var u,h;try{const w=await H(()=>import("./deepShaderEngine-CuYCvQ1H.js"),[]);if(r)return;t=w.createDeepShaderEngine(e,{reduceMotion:v}),l.current=t;const y=()=>z(o,t,Math.min(1.5,window.devicePixelRatio||1));y(),(u=t.renderStatic)==null||u.call(t),d||(h=t.start)==null||h.call(t),s(),i=new ResizeObserver(()=>{var I;y(),(I=t.renderStatic)==null||I.call(t)}),i.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(I=>{var S,N,E;for(const _ of I){if(R.current=!!_.isIntersecting,d){(S=t.stop)==null||S.call(t);continue}R.current?(N=t.start)==null||N.call(t):(E=t.stop)==null||E.call(t)}},{threshold:.25}),n.observe(o))}catch{s()}},{timeoutMs:220});return()=>{var u;r=!0,a==null||a(),n==null||n.disconnect(),i==null||i.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),l.current=null}},[M,p.uniqueId,d,C,v]),c.useEffect(()=>{var e,r,t;const o=l.current;if(o){if(d){P.current=null,(e=o.clearPointer)==null||e.call(o),(r=o.stop)==null||r.call(o);return}R.current&&((t=o.start)==null||t.call(o))}},[d]);const f=o=>{const e=k.current||x.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(o.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(o.clientY-r.top)/Math.max(1,r.height)))}};return m.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-deep","aria-label":`Deep web art tile ${b+1}`,disabled:d,onPointerDown:d?void 0:o=>{var r,t,i,n;if(o.button!=null&&o.button!==0)return;P.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const e=f(o);(t=(r=l.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y),(n=(i=l.current)==null?void 0:i.start)==null||n.call(i)},onPointerMove:d?void 0:o=>{var r,t;if(P.current!=null&&o.pointerId!==P.current||P.current==null&&o.pointerType!=="mouse")return;const e=f(o);P.current!=null&&((t=(r=l.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y))},onPointerUp:d?void 0:o=>{var e,r;P.current!=null&&o.pointerId!==P.current||(P.current=null,(r=(e=l.current)==null?void 0:e.clearPointer)==null||r.call(e))},onPointerCancel:d?void 0:(()=>{var o,e;P.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onMouseLeave:d?void 0:(()=>{var o,e;P.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:d?void 0:(()=>{var o,e;P.current=null,(e=(o=l.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onKeyDown:d?void 0:(o=>{var e,r;(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),(r=(e=l.current)==null?void 0:e.start)==null||r.call(e))}),children:[m.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Deep"})]})}function Je({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(!0),R=c.useRef(!0),P=c.useRef(!1),v=Number(p==null?void 0:p.id)===5,f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=c.useMemo(()=>{const n=Number(p.id)||b+1,s=.0026+n*8e-5,a=.0054+n*14e-5,u=n%2?1:2,h={kx:11+n*2,ky:n%2};return{refreshDelay:v?0:8e3,radiusMini:s,radiusMaxi:a,dHueStep:u,startGroup:h,seed:1337+n*1009,reduceMotion:f}},[v,p.id,b,f]);c.useEffect(()=>{if(!M)return;const n=x.current,s=k.current;if(!n||!s)return;let a=!1,u=null,h=null,w=null;const y=()=>{P.current||(P.current=!0,C==null||C(p.uniqueId))},I=$(async()=>{var S,N;try{const E=await H(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(a)return;u=E.createEmbroideryEngine(s,o),l.current=u;const _=()=>z(n,u,window.devicePixelRatio||1);_(),(S=u.renderStatic)==null||S.call(u),R.current&&((N=u.start)==null||N.call(u)),y(),h=new ResizeObserver(()=>{var L;_(),(L=u.renderStatic)==null||L.call(u)}),h.observe(n),"IntersectionObserver"in window&&(w=new IntersectionObserver(L=>{for(const D of L){if(R.current=!!D.isIntersecting,v){R.current||u.stop();continue}R.current&&g.current?u.start():u.stop()}},{threshold:.25}),w.observe(n))}catch{y()}});return()=>{a=!0,I==null||I(),w==null||w.disconnect(),h==null||h.disconnect(),u==null||u.destroy(),l.current=null}},[M,o,p.uniqueId,C]),c.useEffect(()=>{var s,a;const n=l.current;if(n){if(d){(s=n.stop)==null||s.call(n);return}R.current&&((a=n.start)==null||a.call(n))}},[d]),c.useEffect(()=>{var s,a;const n=l.current;if(n){if(d){(s=n.stop)==null||s.call(n);return}R.current&&((a=n.start)==null||a.call(n))}},[d]);const e=()=>{var n;g.current=!0,R.current&&((n=l.current)==null||n.start())},r=()=>{var n,s,a,u;g.current=!0,R.current?(s=(n=l.current)==null?void 0:n.start)==null||s.call(n):(u=(a=l.current)==null?void 0:a.stop)==null||u.call(a)},t=()=>{var n,s,a,u,h,w,y,I,S,N;if(v){(s=(n=l.current)==null?void 0:n.stop)==null||s.call(n),(u=(a=l.current)==null?void 0:a.reset)==null||u.call(a),(w=(h=l.current)==null?void 0:h.start)==null||w.call(h);return}(y=l.current)==null||y.reset(),(S=(I=l.current)==null?void 0:I.renderStatic)==null||S.call(I),R.current&&((N=l.current)==null||N.start())},i=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return m.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${b+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d||v?void 0:e,onMouseLeave:d||v?void 0:r,onFocus:d||v?void 0:e,onBlur:d||v?void 0:r,onKeyDown:d?void 0:i,children:[m.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:v?"Click":Number.isFinite(Number(p==null?void 0:p.id))?Number(p.id):b+1})]})}function Qe({itemWrapper:p,index:b,activate:M,onReady:d}){const C=c.useRef(!1),x=c.useRef(null),k=c.useMemo(()=>`<!doctype html>
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
</html>`,[]);return c.useEffect(()=>{M&&(C.current||(C.current=!0,d==null||d(p.uniqueId)))},[M,p.uniqueId,d]),m.jsx("div",{className:"article-web-art-tile article-web-art-pulse-tile",role:"img","aria-label":`Pulse web art tile ${b+1}`,children:m.jsx("iframe",{ref:x,className:"article-web-art-pulse-frame",title:"Pulse web art",srcDoc:k,sandbox:"",scrolling:"no"})})}function We({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(!1),R=c.useRef(null);c.useRef(null),c.useRef(!1);const P=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:9001+(Number(p.id)||1)*1337,reduceMotion:v,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[p.id,v]);c.useEffect(()=>{if(!M)return;const u=x.current,h=k.current;if(!u||!h)return;let w=!1,y=null,I=null;const S=()=>{g.current||(g.current=!0,C==null||C(p.uniqueId))},N=$(async()=>{var E,_;try{const L=await H(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(w)return;y=L.createSpiralDotsEngine(h,f),l.current=y;const D=()=>z(u,y,window.devicePixelRatio||1);D(),(E=y.renderStatic)==null||E.call(y),(_=y.start)==null||_.call(y),S(),I=new ResizeObserver(()=>{var O;D(),y.rebuildDots(),(O=y.renderStatic)==null||O.call(y)}),I.observe(u)}catch{S()}});return()=>{w=!0,N==null||N(),I==null||I.disconnect(),y==null||y.destroy(),l.current=null}},[M,f,p.uniqueId,C]),c.useEffect(()=>{var h,w,y;const u=l.current;if(u){if(d){(h=u.clearMouse)==null||h.call(u),(w=u.stop)==null||w.call(u);return}(y=u.start)==null||y.call(u)}},[d]);const o=u=>{const h=k.current||x.current;if(!h)return{x:-1e4,y:-1e4};const w=h.getBoundingClientRect();return{x:u.clientX-w.left,y:u.clientY-w.top}},e=()=>{var u;(u=l.current)==null||u.start()},r=()=>{var u,h;(u=l.current)==null||u.clearMouse(),(h=l.current)==null||h.start()},t=()=>{e()},i=()=>{r()},n=u=>{var w;const h=o(u);(w=l.current)==null||w.setMouse(h.x,h.y)},s=()=>{e()},a=()=>{r()};return m.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-hover-only article-web-art-tile-hover-dots",role:"img",tabIndex:d?-1:0,"aria-label":`Spiral dots web art tile ${b+1}`,onPointerDown:d?void 0:u=>{var y;if(u.pointerType==="mouse")return;const h=x.current;if(!h)return;P.current=!0,R.current=u.pointerId;try{h.setPointerCapture(u.pointerId)}catch{}e();const w=o(u);(y=l.current)==null||y.setMouse(w.x,w.y)},onPointerMove:d?void 0:u=>{var w;if(!P.current||R.current!=null&&u.pointerId!==R.current)return;const h=o(u);(w=l.current)==null||w.setMouse(h.x,h.y)},onPointerUp:d?void 0:u=>{R.current!=null&&u.pointerId!==R.current||(P.current=!1,R.current=null,r())},onPointerCancel:d?void 0:()=>{P.current=!1,R.current=null,r()},onMouseEnter:d?void 0:t,onMouseLeave:d?void 0:i,onMouseMove:d?void 0:n,onFocus:d?void 0:s,onBlur:d?void 0:a,children:[m.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function et({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(!0),R=c.useRef(!0),P=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:424242+(Number(p.id)||2)*2027,reduceMotion:v,targetCellSize:14,gapPx:1.4}),[p.id,v]);c.useEffect(()=>{if(!M)return;const n=x.current,s=k.current;if(!n||!s)return;let a=!1,u=null,h=null,w=null;const y=()=>{P.current||(P.current=!0,C==null||C(p.uniqueId))},I=$(async()=>{var S,N;try{const E=await H(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(a)return;u=E.createGridWaveEngine(s,f),l.current=u;const _=()=>z(n,u,window.devicePixelRatio||1);_(),(S=u.renderStatic)==null||S.call(u),R.current&&((N=u.start)==null||N.call(u)),y(),h=new ResizeObserver(()=>{var L;_(),(L=u.renderStatic)==null||L.call(u)}),h.observe(n),"IntersectionObserver"in window&&(w=new IntersectionObserver(L=>{for(const D of L)R.current=!!D.isIntersecting,R.current&&g.current?u.start():u.stop()},{threshold:.25}),w.observe(n))}catch{y()}});return()=>{a=!0,I==null||I(),w==null||w.disconnect(),h==null||h.disconnect(),u==null||u.destroy(),l.current=null}},[M,f,p.uniqueId,C]);const o=()=>{var n;g.current=!0,R.current&&((n=l.current)==null||n.start())},e=()=>{var n,s,a,u;g.current=!0,R.current?(s=(n=l.current)==null?void 0:n.start)==null||s.call(n):(u=(a=l.current)==null?void 0:a.stop)==null||u.call(a)},r=n=>{const s=k.current||x.current;if(!s)return{x:0,y:0};const a=s.getBoundingClientRect();return typeof(n==null?void 0:n.clientX)!="number"||typeof(n==null?void 0:n.clientY)!="number"?{x:a.width/2,y:a.height/2}:{x:n.clientX-a.left,y:n.clientY-a.top}},t=n=>{var a,u,h,w;const s=r(n);(a=l.current)==null||a.rippleAt(s.x,s.y),(h=(u=l.current)==null?void 0:u.renderStatic)==null||h.call(u),g.current&&R.current&&((w=l.current)==null||w.start())},i=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t(null))};return m.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${b+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:o,onMouseLeave:d?void 0:e,onFocus:d?void 0:o,onBlur:d?void 0:e,onKeyDown:d?void 0:i,children:[m.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function tt({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(!0),R=c.useRef(!0),P=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({reduceMotion:v,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[v]);c.useEffect(()=>{if(!M)return;const i=x.current,n=k.current;if(!i||!n)return;let s=!1,a=null,u=null,h=null,w=null;const y=()=>{P.current||(P.current=!0,C==null||C(p.uniqueId))},I=async()=>{var L;const N=await H(()=>import("./threeTunnelEngine-BYxOaRL9.js"),__vite__mapDeps([5,1]));if(s)return;a=N.createThreeTunnelEngine(n,f),l.current=a;const E=()=>z(i,a,Math.min(1.5,window.devicePixelRatio||1));return E(),a.reset(),R.current&&((L=a.start)==null||L.call(a)),y(),u=new ResizeObserver(()=>{E(),a.reset()}),u.observe(i),"IntersectionObserver"in window&&(h=new IntersectionObserver(D=>{for(const O of D)R.current=!!O.isIntersecting,R.current&&g.current?a.start():a.stop()},{threshold:.25}),h.observe(i)),()=>{h==null||h.disconnect(),u==null||u.disconnect(),a.destroy(),l.current=null}};let S=null;return w=$(()=>{I().then(N=>{S=N||null}).catch(()=>{y()})},{timeoutMs:300}),()=>{s=!0,w==null||w(),S==null||S()}},[M,f,p.uniqueId,C]),c.useEffect(()=>{var n,s,a;const i=l.current;if(i){if(d){(n=i.setHeld)==null||n.call(i,!1),(s=i.stop)==null||s.call(i);return}R.current&&((a=i.start)==null||a.call(i))}},[d]);const o=()=>{var i;g.current=!0,R.current&&((i=l.current)==null||i.start())},e=()=>{var i,n,s,a;g.current=!0,R.current?(n=(i=l.current)==null?void 0:i.start)==null||n.call(i):(a=(s=l.current)==null?void 0:s.stop)==null||a.call(s)},r=()=>{var i,n,s,a;(n=(i=l.current)==null?void 0:i.nextPalette)==null||n.call(i),(s=l.current)==null||s.reset(),R.current&&((a=l.current)==null||a.start())},t=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),r())};return m.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${b+1}`,disabled:d,onClick:d?void 0:r,onMouseEnter:d?void 0:o,onMouseLeave:d?void 0:e,onFocus:d?void 0:o,onBlur:d?void 0:e,onKeyDown:d?void 0:t,children:[m.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),m.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),m.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function rt({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(!0),R=c.useRef(!0),P=c.useRef(!1),v=c.useRef(null),f=c.useRef(null),o=c.useRef(!1),e=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=c.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,d]);c.useEffect(()=>{if(!M)return;const n=x.current,s=k.current;if(!n||!s)return;let a=!1,u=null,h=null;const w=()=>{P.current||(P.current=!0,C==null||C(p.uniqueId))},y=async()=>{var L;const I=await H(()=>import("./threePolygonDemo5Engine-J7VS_NUu.js"),__vite__mapDeps([6,1]));if(a)return;const S=I.createThreePolygonDemo5Engine(s,r);l.current=S;const N=()=>z(n,S,Math.min(1.2,window.devicePixelRatio||1));N(),S.reset(),window.requestAnimationFrame(()=>{a||l.current!==S||(N(),S.reset())}),R.current&&((L=S.start)==null||L.call(S)),w();const E=new ResizeObserver(()=>{N()});E.observe(n);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(D=>{for(const O of D)R.current=!!O.isIntersecting,R.current&&g.current?S.start():S.stop()},{threshold:.25}),_.observe(n)),u=()=>{_==null||_.disconnect(),E.disconnect(),S.destroy(),l.current=null}};return h=$(()=>{y().catch(()=>{w()})},{timeoutMs:300}),()=>{a=!0,h==null||h(),f.current!=null&&window.clearTimeout(f.current),u==null||u()}},[M,r,p.uniqueId,C]);const t=()=>{var n,s,a;(s=(n=l.current)==null?void 0:n.boost)==null||s.call(n),R.current&&((a=l.current)==null||a.start())},i=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return m.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${b+1}`,disabled:d,onKeyDown:d?void 0:i,onPointerDown:d?void 0:n=>{var s;if(!(n.button!=null&&n.button!==0)){v.current=n.pointerId,o.current=!1;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}R.current&&((s=l.current)==null||s.start()),f.current!=null&&window.clearTimeout(f.current),f.current=window.setTimeout(()=>{var a,u;v.current!=null&&(o.current=!0,(u=(a=l.current)==null?void 0:a.setHeld)==null||u.call(a,!0))},140)}},onPointerUp:d?void 0:n=>{var s,a;v.current!=null&&n.pointerId!==v.current||(f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current?(o.current=!1,(a=(s=l.current)==null?void 0:s.setHeld)==null||a.call(s,!1)):t())},onPointerCancel:d?void 0:(()=>{var n,s;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(s=(n=l.current)==null?void 0:n.setHeld)==null||s.call(n,!1)}),onLostPointerCapture:d?void 0:(()=>{var n,s;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(s=(n=l.current)==null?void 0:n.setHeld)==null||s.call(n,!1)}),onMouseEnter:d?void 0:(()=>{var n;g.current=!0,R.current&&((n=l.current)==null||n.start())}),onMouseLeave:d?void 0:(()=>{var n,s,a,u;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(s=(n=l.current)==null?void 0:n.setHeld)==null||s.call(n,!1),g.current=!0,R.current?(a=l.current)==null||a.start():(u=l.current)==null||u.stop()}),onFocus:d?void 0:(()=>{var n;g.current=!0,R.current&&((n=l.current)==null||n.start())}),onBlur:d?void 0:(()=>{var n,s,a,u;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(s=(n=l.current)==null?void 0:n.setHeld)==null||s.call(n,!1),g.current=!0,R.current?(a=l.current)==null||a.start():(u=l.current)==null||u.stop()}),children:[m.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function nt({itemWrapper:p,index:b,activate:M,locked:d,onReady:C}){const x=c.useRef(null),k=c.useRef(null),l=c.useRef(null),g=c.useRef(!0),R=c.useRef(!0),P=c.useRef(!1),v=c.useRef(0),f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=c.useMemo(()=>({reduceMotion:f,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[f]);c.useEffect(()=>{if(!M)return;const n=x.current,s=k.current;if(!n||!s)return;let a=!1,u=null,h=null,w=null;const y=()=>{P.current||(P.current=!0,C==null||C(p.uniqueId))},I=$(async()=>{var S,N;try{const E=await H(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(a)return;u=E.createOrbitCirclesEngine(s,o),l.current=u;const _=()=>z(n,u,window.devicePixelRatio||1);_(),u.reset(),(S=u.renderStatic)==null||S.call(u),R.current&&((N=u.start)==null||N.call(u)),y(),h=new ResizeObserver(()=>{var L;_(),(L=u.renderStatic)==null||L.call(u)}),h.observe(n),"IntersectionObserver"in window&&(w=new IntersectionObserver(L=>{for(const D of L)R.current=!!D.isIntersecting,R.current&&g.current?u.start():u.stop()},{threshold:.25}),w.observe(n))}catch{y()}});return()=>{a=!0,I==null||I(),w==null||w.disconnect(),h==null||h.disconnect(),u==null||u.destroy(),l.current=null}},[M,o,p.uniqueId,C]),c.useEffect(()=>{var s,a;const n=l.current;if(n){if(d){(s=n.stop)==null||s.call(n);return}R.current&&((a=n.start)==null||a.call(n))}},[d]);const e=()=>{var n;g.current=!0,R.current&&((n=l.current)==null||n.start())},r=()=>{var n,s,a,u;g.current=!0,R.current?(s=(n=l.current)==null?void 0:n.start)==null||s.call(n):(u=(a=l.current)==null?void 0:a.stop)==null||u.call(a)},t=()=>{var h,w,y;const n=l.current;if(!n)return;const s=Math.max(1,((h=n.getTotalCircles)==null?void 0:h.call(n))||1),a=v.current%s,u=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`;(w=n.setCircleColor)==null||w.call(n,a,u),v.current+=1,R.current&&((y=n.start)==null||y.call(n))},i=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return m.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${b+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:e,onMouseLeave:d?void 0:r,onFocus:d?void 0:e,onBlur:d?void 0:r,onKeyDown:d?void 0:i,children:[m.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function st({readyId:p,locked:b,onReady:M}){const d=c.useRef(null),C=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),l=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=c.useMemo(()=>({seed:20250414,reduceMotion:l,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[l]);c.useEffect(()=>{const v=d.current,f=C.current;if(!v||!f)return;let o=!1,e=null,r=null,t=null;const i=()=>{k.current||(k.current=!0,M==null||M(p))},n=$(async()=>{var s,a;try{const u=await H(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(o)return;e=u.createTortuosityTraceEngine(f,g),x.current=e;const h=()=>z(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(s=e.renderStatic)==null||s.call(e),(a=e.start)==null||a.call(e),i(),r=new ResizeObserver(()=>{var w;h(),(w=e.reset)==null||w.call(e)}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(w=>{var y,I;for(const S of w)S.isIntersecting?(y=e.start)==null||y.call(e):(I=e.stop)==null||I.call(e)},{threshold:.25}),t.observe(v))}catch{i()}},{timeoutMs:200});return()=>{var s;o=!0,n==null||n(),t==null||t.disconnect(),r==null||r.disconnect(),(s=e==null?void 0:e.destroy)==null||s.call(e),x.current=null}},[g,M,p]),c.useEffect(()=>{var f,o,e;const v=x.current;if(v){if(b){(f=v.setHeld)==null||f.call(v,!1),(o=v.stop)==null||o.call(v);return}(e=v.start)==null||e.call(v)}},[b]),c.useEffect(()=>{var f,o;const v=x.current;if(v){if(b){(f=v.stop)==null||f.call(v);return}(o=v.start)==null||o.call(v)}},[b]);const R=()=>{var v,f,o,e;(f=(v=x.current)==null?void 0:v.reset)==null||f.call(v),(e=(o=x.current)==null?void 0:o.start)==null||e.call(o)},P=v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),R())};return m.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:b,onClick:b?void 0:R,onKeyDown:b?void 0:P,children:[m.jsx("canvas",{ref:C,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function it({readyId:p,locked:b,onReady:M}){const d=c.useRef(null),C=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),l=c.useRef(null),g=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=c.useMemo(()=>({seed:20250415,reduceMotion:g,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[g]);c.useEffect(()=>{const o=d.current,e=C.current;if(!o||!e)return;let r=!1,t=null,i=null,n=null;const s=()=>{k.current||(k.current=!0,M==null||M(p))},a=$(async()=>{var u,h;try{const w=await H(()=>import("./hexFlowBallsEngine-Bzfny-m0.js"),[]);if(r)return;t=w.createHexFlowBallsEngine(e,R),x.current=t;const y=()=>z(o,t,Math.min(1.5,window.devicePixelRatio||1));y(),(u=t.renderStatic)==null||u.call(t),(h=t.start)==null||h.call(t),s(),i=new ResizeObserver(()=>{var I;y(),(I=t.renderStatic)==null||I.call(t)}),i.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(I=>{var S,N;for(const E of I)E.isIntersecting?(S=t.start)==null||S.call(t):(N=t.stop)==null||N.call(t)},{threshold:.25}),n.observe(o))}catch{s()}},{timeoutMs:220});return()=>{var u;r=!0,a==null||a(),n==null||n.disconnect(),i==null||i.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),x.current=null}},[R,M,p]),c.useEffect(()=>{var e,r,t;const o=x.current;if(o){if(b){(e=o.clearPointer)==null||e.call(o),(r=o.stop)==null||r.call(o);return}(t=o.start)==null||t.call(o)}},[b]);const P=o=>{const e=d.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:r.width>0?(o.clientX-r.left)/r.width:.5,y:r.height>0?(o.clientY-r.top)/r.height:.5}},v=()=>{var o,e,r,t;(e=(o=x.current)==null?void 0:o.burst)==null||e.call(o),(t=(r=x.current)==null?void 0:r.start)==null||t.call(r)},f=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),v())};return m.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:b,onClick:b?void 0:v,onPointerDown:b?void 0:(o=>{var r,t;l.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const e=P(o);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerMove:b?void 0:(o=>{var r,t;if(l.current!=null&&o.pointerId!==l.current)return;const e=P(o);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerUp:b?void 0:(o=>{l.current!=null&&o.pointerId!==l.current||(l.current=null)}),onPointerCancel:b?void 0:(()=>{var o,e;l.current=null,(e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onMouseMove:b?void 0:(o=>{var r,t;const e=P(o);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onMouseLeave:b?void 0:(()=>{var o,e;l.current=null,(e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:b?void 0:(()=>{var o,e;l.current=null,(e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onKeyDown:b?void 0:f,children:[m.jsx("canvas",{ref:C,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function ot({readyId:p,locked:b,onReady:M}){const d=c.useRef(null),C=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),l=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=c.useMemo(()=>({seed:20250416,reduceMotion:l,step:6,side:5}),[l]);c.useEffect(()=>{const f=d.current,o=C.current;if(!f||!o)return;let e=!1,r=null,t=null,i=null;const n=()=>{k.current||(k.current=!0,M==null||M(p))},s=$(async()=>{var a,u;try{const h=await H(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;r=h.createPixelPlopEngine(o,g),x.current=r;const w=()=>z(f,r,Math.min(1.5,window.devicePixelRatio||1));w(),(a=r.renderStatic)==null||a.call(r),(u=r.start)==null||u.call(r),n(),t=new ResizeObserver(()=>{var y;w(),(y=r.reset)==null||y.call(r)}),t.observe(f),"IntersectionObserver"in window&&(i=new IntersectionObserver(y=>{var I,S;for(const N of y)N.isIntersecting?(I=r.start)==null||I.call(r):(S=r.stop)==null||S.call(r)},{threshold:.25}),i.observe(f))}catch{n()}},{timeoutMs:220});return()=>{var a;e=!0,s==null||s(),i==null||i.disconnect(),t==null||t.disconnect(),(a=r==null?void 0:r.destroy)==null||a.call(r),x.current=null}},[g,M,p]),c.useEffect(()=>{var o,e,r;const f=x.current;if(f){if(b){(o=f.clearPointer)==null||o.call(f),(e=f.stop)==null||e.call(f);return}(r=f.start)==null||r.call(f)}},[b]),c.useEffect(()=>{var o,e;const f=x.current;if(f){if(b){(o=f.stop)==null||o.call(f);return}(e=f.start)==null||e.call(f)}},[b]);const R=()=>{var f,o,e,r;(o=(f=x.current)==null?void 0:f.seedBurst)==null||o.call(f),(r=(e=x.current)==null?void 0:e.start)==null||r.call(e)},P=f=>{var r,t,i,n;const o=C.current||d.current;if(!o||typeof(f==null?void 0:f.clientX)!="number"||typeof(f==null?void 0:f.clientY)!="number"){R();return}const e=o.getBoundingClientRect();(t=(r=x.current)==null?void 0:r.burstAt)==null||t.call(r,f.clientX-e.left,f.clientY-e.top),(n=(i=x.current)==null?void 0:i.start)==null||n.call(i)},v=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),R())};return m.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:b,onPointerDown:b?void 0:(f=>{f.button!=null&&f.button!==0||P(f)}),onKeyDown:b?void 0:v,children:[m.jsx("canvas",{ref:C,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function at({readyId:p,locked:b,onReady:M}){const d=c.useRef(null),C=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),l=c.useRef(null),g=c.useRef(!1),R=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=c.useMemo(()=>({reduceMotion:R,seed:20250417}),[R]);c.useEffect(()=>{const e=d.current,r=C.current;if(!e||!r)return;let t=!1,i=null,n=null,s=null;const a=()=>{k.current||(k.current=!0,M==null||M(p))},u=$(async()=>{var h,w;try{const y=await H(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(t)return;i=y.createJuliaLinesEngine(r,P),x.current=i;const I=()=>z(e,i,Math.min(1.5,window.devicePixelRatio||1));I(),(h=i.renderStatic)==null||h.call(i),(w=i.start)==null||w.call(i),a(),n=new ResizeObserver(()=>{I()}),n.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(S=>{var N,E;for(const _ of S)_.isIntersecting?(N=i.start)==null||N.call(i):(E=i.stop)==null||E.call(i)},{threshold:.25}),s.observe(e))}catch{a()}},{timeoutMs:220});return()=>{var h;t=!0,u==null||u(),s==null||s.disconnect(),n==null||n.disconnect(),(h=i==null?void 0:i.destroy)==null||h.call(i),x.current=null}},[P,M,p]),c.useEffect(()=>{var r,t,i,n;const e=x.current;if(e){if(b){(r=e.setHeld)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(i=e.stop)==null||i.call(e);return}(n=e.start)==null||n.call(e)}},[b]),c.useEffect(()=>{var r,t,i;const e=x.current;if(e){if(b){(r=e.clearPointer)==null||r.call(e),(t=e.stop)==null||t.call(e);return}(i=e.start)==null||i.call(e)}},[b]);const v=e=>{const r=d.current;if(!r)return{x:.4,y:.5};const t=r.getBoundingClientRect(),i=(e.clientX-t.left)/Math.max(1,t.width),n=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,i)),y:Math.max(0,Math.min(1,n))}},f=()=>{var e,r,t,i;(r=(e=x.current)==null?void 0:e.reset)==null||r.call(e),(i=(t=x.current)==null?void 0:t.start)==null||i.call(t)},o=e=>{var t,i,n,s,a,u,h,w;const r=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(i=(t=x.current)==null?void 0:t.nudge)==null||i.call(t,0,-r)):e.key==="ArrowDown"?(e.preventDefault(),(s=(n=x.current)==null?void 0:n.nudge)==null||s.call(n,0,r)):e.key==="ArrowLeft"?(e.preventDefault(),(u=(a=x.current)==null?void 0:a.nudge)==null||u.call(a,-r,0)):e.key==="ArrowRight"?(e.preventDefault(),(w=(h=x.current)==null?void 0:h.nudge)==null||w.call(h,r,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),f())};return m.jsxs("div",{ref:d,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:b?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:b?void 0:e=>{var i,n;const r=d.current;if(!r)return;g.current=!0,l.current=e.pointerId;try{r.setPointerCapture(e.pointerId)}catch{}const t=v(e);(n=(i=x.current)==null?void 0:i.setPointer)==null||n.call(i,t.x,t.y)},onPointerMove:b?void 0:e=>{var t,i;if(g.current&&l.current!=null&&e.pointerId!==l.current)return;const r=v(e);(i=(t=x.current)==null?void 0:t.setPointer)==null||i.call(t,r.x,r.y)},onPointerUp:b?void 0:e=>{var r,t;l.current!=null&&e.pointerId!==l.current||(g.current=!1,l.current=null,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r))},onPointerCancel:b?void 0:()=>{var e,r;g.current=!1,l.current=null,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)},onMouseMove:b?void 0:e=>{var t,i;const r=v(e);(i=(t=x.current)==null?void 0:t.setPointer)==null||i.call(t,r.x,r.y)},onMouseLeave:b?void 0:(()=>{var e,r;(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:b?void 0:(()=>{var e,r;(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:b?void 0:o,onClick:b?void 0:f,children:[m.jsx("canvas",{ref:C,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function ct({readyId:p,locked:b,onReady:M}){const[d,C]=c.useState(0),[x,k]=c.useState("mine"),[l,g]=c.useState(()=>new Set),[R,P]=c.useState(()=>new Set),[v,f]=c.useState("playing"),[o,e]=c.useState(null),[r,t]=c.useState(0),i=c.useMemo(()=>Oe(),[d]);c.useEffect(()=>{M==null||M(p)},[M,p]),c.useEffect(()=>{k("mine"),g(new Set),P(new Set),f("playing"),e(null),t(0)},[d]),c.useEffect(()=>{if(o==null||v!=="playing")return;const w=()=>{t(Math.min(5999,Math.floor((Date.now()-o)/1e3)))};w();const y=window.setInterval(w,1e3);return()=>{window.clearInterval(y)}},[o,v]);const n=()=>{C(w=>w+1)},s=w=>{if(b||v!=="playing")return;if(o==null&&e(Date.now()),x==="flag"){if(l.has(w))return;const I=new Set(R);I.has(w)?I.delete(w):I.add(w),P(I),me(i,l,I)&&f("won");return}if(R.has(w)||l.has(w))return;if(i.mines.has(w)){const I=new Set(l);for(const S of i.mines)I.add(S);I.add(w),g(I),f("lost");return}const y=Be(w,i,l,R);g(y),me(i,y,R)&&f("won")},a=i.mineCount-R.size,u=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`;let h="🤔";return v==="lost"?h="😣":v==="won"?h="😎":R.size>=i.mineCount?h="😕":R.size>=i.mineCount-1?h="🤓":R.size>=Math.round(i.mineCount*3/4)?h="😃":R.size>=Math.round(i.mineCount*2/3)?h="😊":R.size>=Math.round(i.mineCount/2)?h="🙂":R.size>=Math.round(i.mineCount/3)?h="😏":R.size>0&&(h="😐"),m.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:m.jsxs("div",{className:"article-web-art-minesweeper",children:[m.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[m.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${x==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>k("mine"),disabled:b||v!=="playing","aria-pressed":x==="mine",children:"⛏"}),m.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${x==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>k("flag"),disabled:b||v!=="playing","aria-pressed":x==="flag",children:"🚩"})]}),m.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[i.counts.map((w,y)=>{const I=l.has(y),S=R.has(y),N=i.mines.has(y),E=v==="lost"&&N,_=w>0?Ae[w-1]:void 0;return m.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${I?"article-web-art-minesweeper-cell-revealed":""} ${E?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>s(y),disabled:b||v!=="playing","aria-label":`Minesweeper cell ${y+1}`,children:[S&&!I?m.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,E?m.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,I&&!N&&w>0?m.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:w}):null]},`mine-${d}-${y}`)}),v==="lost"?m.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:n,children:["Ooohhh 🙁",m.jsx("br",{}),"Click to try again"]}):null,v==="won"?m.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:n,children:["👌👀✔💯💯💯",m.jsx("br",{}),"Click to restart"]}):null]}),m.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[m.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[m.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:h}),m.jsx("span",{children:a})]}),m.jsx("div",{className:"article-web-art-minesweeper-timer",children:u})]}),m.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function lt({readyId:p,locked:b,onReady:M}){const d=c.useRef(null),C=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),l=c.useRef(null),g=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=c.useMemo(()=>({reduceMotion:g}),[g]);c.useEffect(()=>{const o=d.current,e=C.current;if(!o||!e)return;let r=!1,t=null,i=null,n=null;const s=()=>{k.current||(k.current=!0,M==null||M(p))},a=$(async()=>{var u,h;try{const w=await H(()=>import("./fallingRingsEngine-CgfU8E0P.js"),[]);if(r)return;t=w.createFallingRingsEngine(e,R),x.current=t;const y=()=>z(o,t,Math.min(1.5,window.devicePixelRatio||1));y(),(u=t.renderStatic)==null||u.call(t),(h=t.start)==null||h.call(t),s(),i=new ResizeObserver(()=>{y()}),i.observe(o),"IntersectionObserver"in window&&(n=new IntersectionObserver(I=>{var S,N;for(const E of I)E.isIntersecting?(S=t.start)==null||S.call(t):(N=t.stop)==null||N.call(t)},{threshold:.25}),n.observe(o))}catch{s()}},{timeoutMs:220});return()=>{var u;r=!0,a==null||a(),n==null||n.disconnect(),i==null||i.disconnect(),(u=t==null?void 0:t.destroy)==null||u.call(t),x.current=null}},[R,M,p]);const P=o=>{var e,r,t,i;(r=(e=x.current)==null?void 0:e.setHeld)==null||r.call(e,o),(i=(t=x.current)==null?void 0:t.start)==null||i.call(t)},v=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),P(!0))},f=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),P(!1))};return m.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:b,onPointerDown:b?void 0:o=>{l.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}P(!0)},onPointerUp:b?void 0:o=>{l.current!=null&&o.pointerId!==l.current||(l.current=null,P(!1))},onPointerCancel:b?void 0:()=>{l.current=null,P(!1)},onLostPointerCapture:b?void 0:()=>{l.current=null,P(!1)},onMouseLeave:b?void 0:(()=>{l.current!=null&&P(!1)}),onBlur:b?void 0:(()=>{l.current=null,P(!1)}),onKeyDown:b?void 0:v,onKeyUp:b?void 0:f,children:[m.jsx("canvas",{ref:C,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function ut({readyId:p,locked:b,onReady:M}){const d=c.useRef(null),C=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),l=c.useRef(null),g=c.useRef("mouse"),R=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=c.useMemo(()=>({reduceMotion:R,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[R]);c.useEffect(()=>{const f=d.current,o=C.current;if(!f||!o)return;let e=!1,r=null,t=null,i=null;const n=()=>{k.current||(k.current=!0,M==null||M(p))},s=$(async()=>{var a,u;try{const h=await H(()=>import("./prismFieldEngine-BQpxImA_.js"),__vite__mapDeps([7,1]));if(e)return;r=h.createPrismFieldEngine(o,P),x.current=r;const w=()=>z(f,r,Math.min(1.5,window.devicePixelRatio||1));w(),(a=r.renderStatic)==null||a.call(r),(u=r.start)==null||u.call(r),n(),t=new ResizeObserver(()=>{w()}),t.observe(f),"IntersectionObserver"in window&&(i=new IntersectionObserver(y=>{var I,S;for(const N of y)N.isIntersecting?(I=r.start)==null||I.call(r):(S=r.stop)==null||S.call(r)},{threshold:.25}),i.observe(f))}catch{n()}},{timeoutMs:220});return()=>{var a;e=!0,s==null||s(),i==null||i.disconnect(),t==null||t.disconnect(),(a=r==null?void 0:r.destroy)==null||a.call(r),x.current=null}},[P,M,p]);const v=f=>{const o=d.current;if(!o)return{x:.5,y:.5};const e=o.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(f.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(f.clientY-e.top)/Math.max(1,e.height)))}};return m.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:b,onClick:b?void 0:(()=>{var f,o,e,r;(o=(f=x.current)==null?void 0:f.reset)==null||o.call(f),(r=(e=x.current)==null?void 0:e.start)==null||r.call(e)}),onPointerDown:b?void 0:f=>{var e,r;l.current=f.pointerId,g.current=f.pointerType||"mouse";try{f.currentTarget.setPointerCapture(f.pointerId)}catch{}const o=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onPointerMove:b?void 0:f=>{var e,r;if(l.current!=null&&f.pointerId!==l.current)return;const o=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onPointerUp:b?void 0:f=>{var o,e;l.current!=null&&f.pointerId!==l.current||(l.current=null,(f.pointerType||g.current)==="mouse"&&((e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)))},onPointerCancel:b?void 0:(()=>{var f,o;l.current=null,g.current==="mouse"&&((o=(f=x.current)==null?void 0:f.clearPointer)==null||o.call(f))}),onMouseMove:b?void 0:f=>{var e,r;const o=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,o.x,o.y)},onMouseLeave:b?void 0:(()=>{var f,o;l.current=null,(o=(f=x.current)==null?void 0:f.clearPointer)==null||o.call(f)}),onBlur:b?void 0:(()=>{var f,o;l.current=null,g.current="mouse",(o=(f=x.current)==null?void 0:f.clearPointer)==null||o.call(f)}),onKeyDown:b?void 0:(f=>{var o,e,r,t;(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),(e=(o=x.current)==null?void 0:o.reset)==null||e.call(o),(t=(r=x.current)==null?void 0:r.start)==null||t.call(r))}),children:[m.jsx("canvas",{ref:C,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function dt({readyId:p,locked:b,onReady:M}){const d=c.useRef(null),C=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),l=c.useRef(null),g=c.useRef(null),R=c.useRef(!1),P=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=c.useMemo(()=>({reduceMotion:P}),[P]);c.useEffect(()=>{const e=d.current,r=C.current;if(!e||!r)return;let t=!1,i=null,n=null,s=null;const a=()=>{k.current||(k.current=!0,M==null||M(p))},u=$(async()=>{var h,w;try{const y=await H(()=>import("./ropeLightEngine-ZZGO6u7c.js"),[]);if(t)return;i=y.createRopeLightEngine(r,v),x.current=i;const I=()=>z(e,i,Math.min(1.5,window.devicePixelRatio||1));I(),(h=i.renderStatic)==null||h.call(i),(w=i.start)==null||w.call(i),a(),n=new ResizeObserver(()=>{I()}),n.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(S=>{var N,E;for(const _ of S)_.isIntersecting?(N=i.start)==null||N.call(i):(E=i.stop)==null||E.call(i)},{threshold:.25}),s.observe(e))}catch{a()}},{timeoutMs:220});return()=>{var h;t=!0,u==null||u(),s==null||s.disconnect(),n==null||n.disconnect(),(h=i==null?void 0:i.destroy)==null||h.call(i),x.current=null}},[v,M,p]);const f=e=>{const r=d.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}},o=e=>{var t,i,n,s;if(R.current){R.current=!1;return}const r=e?f(e):{x:.5,y:.18};(i=(t=x.current)==null?void 0:t.toggleHangAt)==null||i.call(t,r.x,r.y),(s=(n=x.current)==null?void 0:n.start)==null||s.call(n)};return m.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:b,onClick:b?void 0:o,onPointerDown:b?void 0:e=>{var r,t;l.current=e.pointerId,R.current=!1,g.current=f(e);try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,g.current.x,g.current.y)},onPointerMove:b?void 0:e=>{var i,n;if(l.current!=null&&e.pointerId!==l.current)return;const r=f(e),t=g.current;t&&Math.hypot(r.x-t.x,r.y-t.y)>.025&&(R.current=!0),(n=(i=x.current)==null?void 0:i.setPointer)==null||n.call(i,r.x,r.y)},onPointerUp:b?void 0:e=>{var r,t;if(!(l.current!=null&&e.pointerId!==l.current)){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}l.current=null,g.current=null,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r)}},onPointerCancel:b?void 0:(e=>{var r,t;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}l.current=null,g.current=null,R.current=!1,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r)}),onMouseMove:b?void 0:e=>{var t,i;const r=f(e);(i=(t=x.current)==null?void 0:t.setPointer)==null||i.call(t,r.x,r.y)},onMouseLeave:b?void 0:(()=>{var e,r;l.current=null,g.current=null,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:b?void 0:(()=>{var e,r;l.current=null,g.current=null,R.current=!1,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:b?void 0:(e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),o())}),children:[m.jsx("canvas",{ref:C,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}const ft=["rotateX(270deg) translateZ(0.5em)","rotateY(0deg) translateZ(0.5em)","rotateY(90deg) translateZ(0.5em)","rotateY(180deg) translateZ(0.5em)","rotateY(270deg) translateZ(0.5em)","rotateX(90deg) translateZ(0.5em)"],xe=Array.from({length:28},(p,b)=>b);function ht(){return m.jsx("div",{className:"article-web-art-soup-backdrop","aria-hidden":!0,children:xe.map(p=>m.jsx("div",{className:"article-web-art-soup-cube",style:{animationDelay:`${p*.06}s`,fontSize:`${p+1}em`,"--soup-cube-depth":`${p/Math.max(1,xe.length-1)}`},children:ft.map((b,M)=>m.jsx("span",{className:"article-web-art-soup-face",style:{transform:b}},M))},p))})}function bt({readyId:p,locked:b,onReady:M}){const d=c.useRef(null),C=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),l=c.useRef(null),g=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),R=c.useMemo(()=>({reduceMotion:g}),[g]);c.useEffect(()=>{const v=d.current,f=C.current;if(!v||!f)return;let o=!1,e=null,r=null,t=null;const i=()=>{k.current||(k.current=!0,M==null||M(p))},n=$(async()=>{var s,a;try{const u=await H(()=>import("./soupShaderEngine-BVaccG7j.js"),__vite__mapDeps([8,1]));if(o)return;e=u.createSoupShaderEngine(f,R),x.current=e;const h=()=>z(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(s=e.renderStatic)==null||s.call(e),(a=e.start)==null||a.call(e),i(),r=new ResizeObserver(()=>{h()}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(w=>{var y,I;for(const S of w)S.isIntersecting?(y=e.start)==null||y.call(e):(I=e.stop)==null||I.call(e)},{threshold:.25}),t.observe(v))}catch{i()}},{timeoutMs:220});return()=>{var s;o=!0,n==null||n(),t==null||t.disconnect(),r==null||r.disconnect(),(s=e==null?void 0:e.destroy)==null||s.call(e),x.current=null}},[R,M,p]);const P=v=>{const f=d.current;if(!f)return{x:.5,y:.5};const o=f.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(v.clientX-o.left)/Math.max(1,o.width))),y:Math.max(0,Math.min(1,(v.clientY-o.top)/Math.max(1,o.height)))}};return m.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile","aria-label":"Soup shader web art tile",disabled:b,onPointerDown:b?void 0:v=>{var o,e,r,t;l.current=v.pointerId;try{v.currentTarget.setPointerCapture(v.pointerId)}catch{}const f=P(v);(e=(o=x.current)==null?void 0:o.setPointer)==null||e.call(o,f.x,f.y),(t=(r=x.current)==null?void 0:r.setHeld)==null||t.call(r,!0)},onPointerMove:b?void 0:v=>{var o,e;if(l.current!=null&&v.pointerId!==l.current)return;const f=P(v);(e=(o=x.current)==null?void 0:o.setPointer)==null||e.call(o,f.x,f.y)},onPointerUp:b?void 0:v=>{var f,o;l.current!=null&&v.pointerId!==l.current||(l.current=null,(o=(f=x.current)==null?void 0:f.setHeld)==null||o.call(f,!1))},onPointerCancel:b?void 0:(()=>{var v,f;l.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1)}),onMouseMove:b?void 0:v=>{var o,e;const f=P(v);(e=(o=x.current)==null?void 0:o.setPointer)==null||e.call(o,f.x,f.y)},onMouseLeave:b?void 0:(()=>{var v,f,o,e;l.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:b?void 0:(()=>{var v,f,o,e;l.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)}),children:[m.jsx(ht,{}),m.jsx("canvas",{ref:C,className:"article-web-art-canvas"}),m.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function mt({readyId:p,locked:b,onReady:M}){const d=c.useRef(null),C=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),l=c.useRef(null),g=c.useRef(null),R=c.useRef(0),[P,v]=c.useState(!1),[f,o]=c.useState([]),e=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=c.useMemo(()=>({reduceMotion:e}),[e]);c.useEffect(()=>{const s=d.current,a=C.current;if(!s||!a)return;let u=!1,h=null,w=null,y=null;const I=()=>{k.current||(k.current=!0,M==null||M(p))},S=$(async()=>{var N,E;try{const _=await H(()=>import("./tardisWormholeEngine-Czkyopnk.js"),__vite__mapDeps([9,1]));if(u)return;h=_.createTardisWormholeEngine(a,r),x.current=h;const L=()=>z(s,h,Math.min(1.5,window.devicePixelRatio||1));L(),(N=h.renderStatic)==null||N.call(h),(E=h.start)==null||E.call(h),I(),w=new ResizeObserver(()=>{L()}),w.observe(s),"IntersectionObserver"in window&&(y=new IntersectionObserver(D=>{var O,q;for(const V of D)V.isIntersecting?(O=h.start)==null||O.call(h):(q=h.stop)==null||q.call(h)},{threshold:.25}),y.observe(s))}catch{I()}},{timeoutMs:220});return()=>{var N;u=!0,S==null||S(),y==null||y.disconnect(),w==null||w.disconnect(),(N=h==null?void 0:h.destroy)==null||N.call(h),x.current=null}},[r,M,p]),c.useEffect(()=>{if(f.length===0)return;const s=window.setTimeout(()=>{o(a=>a.slice(1))},1e3);return()=>{window.clearTimeout(s)}},[f]),c.useEffect(()=>{var a,u,h;const s=x.current;if(s){if(b){v(!1),g.current=null,(a=s.clearPointer)==null||a.call(s),(u=s.stop)==null||u.call(s);return}(h=s.start)==null||h.call(s)}},[b]);const t=s=>{const a=d.current,u=C.current||a;if(!a||!u)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const h=u.getBoundingClientRect(),w=a.getBoundingClientRect(),y=Math.max(0,Math.min(w.width,s.clientX-w.left)),I=Math.max(0,Math.min(w.height,s.clientY-w.top)),S=Math.max(0,Math.min(h.width,s.clientX-h.left)),N=Math.max(0,Math.min(h.height,s.clientY-h.top)),E=g.current,_=E?S-E.px:0,L=E?N-E.py:0;return g.current={px:S,py:N},{x:h.width>0?S/h.width:.5,y:h.height>0?N/h.height:.5,px:y,py:I,dx:_,dy:L}},i=(s,a)=>{const u=R.current++;o(h=>[...h,{id:u,x:s,y:a}])},n=s=>{var u,h,w,y;const a=t(s);i(a.px,a.py),(h=(u=x.current)==null?void 0:u.boost)==null||h.call(u),(y=(w=x.current)==null?void 0:w.start)==null||y.call(w),v(!0),window.setTimeout(()=>{v(!1)},650)};return m.jsxs("button",{type:"button",ref:d,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${P?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:b,onClick:b?void 0:n,onContextMenu:b?void 0:(s=>{var u,h,w,y;s.preventDefault();const a=t(s);i(a.px,a.py),(h=(u=x.current)==null?void 0:u.reverseBurst)==null||h.call(u),(y=(w=x.current)==null?void 0:w.start)==null||y.call(w)}),onWheel:b?void 0:(s=>{var a,u;(u=(a=x.current)==null?void 0:a.addScrollBoost)==null||u.call(a,s.deltaY*.003)}),onPointerDown:b?void 0:s=>{var u,h;l.current=s.pointerId;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}const a=t(s);(h=(u=x.current)==null?void 0:u.setPointer)==null||h.call(u,a.x,a.y,a.dx,a.dy)},onPointerMove:b?void 0:s=>{var u,h,w,y;if(l.current!=null&&s.pointerId!==l.current)return;const a=t(s);(h=(u=x.current)==null?void 0:u.setPointer)==null||h.call(u,a.x,a.y,a.dx,a.dy),(s.buttons&1)===1&&((y=(w=x.current)==null?void 0:w.drag)==null||y.call(w,a.dx))},onPointerUp:b?void 0:s=>{l.current!=null&&s.pointerId!==l.current||(l.current=null)},onPointerCancel:b?void 0:(()=>{l.current=null}),onMouseMove:b?void 0:s=>{var u,h;const a=t(s);(h=(u=x.current)==null?void 0:u.setPointer)==null||h.call(u,a.x,a.y,a.dx,a.dy)},onMouseLeave:b?void 0:(()=>{var s,a;l.current=null,g.current=null,(a=(s=x.current)==null?void 0:s.clearPointer)==null||a.call(s)}),onBlur:b?void 0:(()=>{var s,a;l.current=null,g.current=null,(a=(s=x.current)==null?void 0:s.clearPointer)==null||a.call(s)}),onKeyDown:b?void 0:(s=>{var a,u,h,w;(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),(u=(a=x.current)==null?void 0:a.boost)==null||u.call(a),(w=(h=x.current)==null?void 0:h.start)==null||w.call(h))}),children:[m.jsx("canvas",{ref:C,className:"article-web-art-canvas"}),m.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),m.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),m.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),m.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),m.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),f.map(s=>m.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${s.x}px`,top:`${s.y}px`},"aria-hidden":!0},s.id)),m.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function pt({label:p,clickLabel:b,previewRequested:M=!1}){const d=ve(),C=c.useRef(null),[x,k]=c.useState(!1),[l,g]=c.useState(0),R=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=c.useCallback(()=>{g(Date.now()),k(!0)},[]),v=c.useCallback(()=>{d.navigateToSectionWithId("contact")},[d]),f=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),P())},o=c.useMemo(()=>x?ze({seed:`${l||Date.now()}:${p}`,reduceMotion:R}):"",[p,x,l,R]);return c.useEffect(()=>{let e=0,r=0;return M?(e=window.requestAnimationFrame(()=>{r=window.requestAnimationFrame(()=>{g(Date.now()),k(!0)})}),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)}):(k(!1),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)})},[M]),m.jsxs("div",{ref:C,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${x?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":x?"Kontakt preview":p,"aria-pressed":x,onClick:P,onKeyDown:f,children:[m.jsxs("div",{className:`article-web-art-tile-cta-preview ${x?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[x&&m.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:o,sandbox:"allow-scripts"},`${l}-${p}`),m.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!x&&m.jsx("div",{className:`loader ${R?"loader-reduce-motion":""}`,"aria-hidden":!0,children:m.jsxs("div",{className:"loader-inner",children:[m.jsx("div",{className:"loader-line-wrap",children:m.jsx("div",{className:"loader-line"})}),m.jsx("div",{className:"loader-line-wrap",children:m.jsx("div",{className:"loader-line"})}),m.jsx("div",{className:"loader-line-wrap",children:m.jsx("div",{className:"loader-line"})}),m.jsx("div",{className:"loader-line-wrap",children:m.jsx("div",{className:"loader-line"})}),m.jsx("div",{className:"loader-line-wrap",children:m.jsx("div",{className:"loader-line"})})]})}),m.jsxs("div",{className:`article-web-art-tile-cta-content ${x?"article-web-art-tile-cta-content-hidden":""}`,children:[m.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:p}),m.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:b})]}),x&&m.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),v()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),v())},children:"Kontakt"})]})}function wt({locked:p=!1}){const b=c.useRef(null),M=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),d=c.useRef(!1),C=c.useRef(0),x=c.useRef(null),k=c.useRef(null),l=c.useRef(1),g=c.useRef(null),R=c.useRef(null),P=c.useRef(null);return c.useEffect(()=>{const v=b.current;if(!v)return;const f=w=>{const y=Math.max(0,Math.min(1,w));return y*y*(3-2*y)},o=()=>{const w=v.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),y=[];for(const I of w){const S=I.getAnimations?I.getAnimations():[];for(const N of S)y.push(N)}return y},e=w=>{const y=Math.max(1,Math.min(5.2,Number(w)||1));l.current=y;const I=o();for(const S of I)S.playbackRate=y},r=()=>{R.current!=null&&cancelAnimationFrame(R.current),P.current!=null&&window.clearTimeout(P.current),R.current=null,P.current=null},t=()=>{r(),e(5.2),P.current=window.setTimeout(()=>{const w=l.current,y=performance.now(),I=320,S=()=>{const N=(performance.now()-y)/I,E=f(N);e(w+(1-w)*E),N<1?R.current=requestAnimationFrame(S):R.current=null};R.current=requestAnimationFrame(S),P.current=null},2e3)},i=()=>{d.current=!1,x.current=null,v.classList.remove("article-web-art-tile-goldfish-held"),k.current!=null&&cancelAnimationFrame(k.current),k.current=null;const w=l.current,y=360,I=performance.now();g.current!=null&&cancelAnimationFrame(g.current);const S=()=>{const N=(performance.now()-I)/y,E=f(N);e(w+(1-w)*E),N<1?g.current=requestAnimationFrame(S):g.current=null};g.current=requestAnimationFrame(S)},n=()=>{if(!d.current)return;const w=performance.now()-C.current,y=1.2+4*f(w/2400);e(y),k.current=requestAnimationFrame(n)},s=w=>{if(!(M||p)&&!(w.button!=null&&w.button!==0)){r(),d.current=!0,C.current=performance.now(),x.current=w.pointerId,v.classList.add("article-web-art-tile-goldfish-held");try{v.setPointerCapture(w.pointerId)}catch{}g.current!=null&&(cancelAnimationFrame(g.current),g.current=null),k.current==null&&(k.current=requestAnimationFrame(n))}},a=()=>{const w=performance.now()-C.current;i(),w<220&&t()},u=()=>{i()},h=()=>{i()};return v.addEventListener("pointerdown",s),v.addEventListener("pointerup",a),v.addEventListener("pointercancel",u),v.addEventListener("lostpointercapture",h),()=>{v.removeEventListener("pointerdown",s),v.removeEventListener("pointerup",a),v.removeEventListener("pointercancel",u),v.removeEventListener("lostpointercapture",h),i(),r(),g.current!=null&&cancelAnimationFrame(g.current),g.current=null}},[p,M]),c.useEffect(()=>{const v=b.current;v&&v.classList.toggle("article-web-art-tile-goldfish-locked",p)},[p]),m.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:b,role:"img","aria-label":"Goldfish animation tile",children:[m.jsx("div",{className:"fish-stage",children:m.jsx("div",{className:"fish-wrapper",children:m.jsx("div",{className:"fish-container",children:m.jsxs("div",{className:"fish-parts",children:[m.jsx("div",{className:"fish-body front"}),m.jsx("div",{className:"fish-body back"}),m.jsx("div",{className:"fish-back-bottom-fin front"}),m.jsx("div",{className:"fish-back-bottom-fin back"}),m.jsx("div",{className:"fish-back-fin"}),m.jsx("div",{className:"fish-front-bottom-fin front"}),m.jsx("div",{className:"fish-front-bottom-fin back"}),m.jsx("div",{className:"fish-top-fin"})]})})})}),m.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function xt({locked:p=!1}){const b=c.useRef(null),M=c.useRef([]),d=c.useRef(0),C=c.useRef(0),x=De,k=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return c.useEffect(()=>{const l=b.current;if(!l)return;const g=M.current.filter(Boolean);if(!g.length)return;let R=!0,P=!1,v=null,f=null;const o=(w,y)=>{const I=(w-.5)*30;for(let S=0;S<g.length;S++){const N=g[S],E=S*18,_=S*8,L=(w-.5)*E,D=(y-.5)*_;N.style.transform=`translate3d(${L}px, ${D}px, 0) rotateY(${I}deg)`}},e=(w,y)=>{const I=Math.max(-.55,Math.min(.55,(w-.5)*1.1)),S=Math.max(-.35,Math.min(.35,(y-.5)*.7));o(.5+I,.5+S)},r=w=>{const y=l.getBoundingClientRect(),I=(w.clientX-y.left)/Math.max(1,y.width),S=(w.clientY-y.top)/Math.max(1,y.height);R=!0,C.current=performance.now()+650,e(Math.max(0,Math.min(1,I)),Math.max(0,Math.min(1,S)))},t=w=>{const y=l.getBoundingClientRect(),I=(w.clientX-y.left)/Math.max(1,y.width),S=(w.clientY-y.top)/Math.max(1,y.height);return{x:Math.max(0,Math.min(1,I)),y:Math.max(0,Math.min(1,S))}},i=w=>{if(w.pointerType==="mouse")return;P=!0,v=w.pointerId,R=!0,C.current=performance.now()+900;const y=t(w);e(y.x,y.y),!k&&f==null&&(f=requestAnimationFrame(h))},n=w=>{if(!P||v!=null&&w.pointerId!==v)return;R=!0,C.current=performance.now()+900;const y=t(w);e(y.x,y.y)},s=w=>{v!=null&&(w==null?void 0:w.pointerId)!=null&&w.pointerId!==v||(P=!1,v=null,R=!0,!k&&f==null&&(f=requestAnimationFrame(h)))},a=()=>{R=!0,!k&&f==null&&(f=requestAnimationFrame(h))},u=()=>{R=!0,!k&&f==null&&(f=requestAnimationFrame(h))},h=()=>{if(R){if(!k&&performance.now()>=C.current){d.current+=.008;const w=Math.sin(d.current)*.5+.5;e(w,.5)}f=requestAnimationFrame(h)}};return R=!p,l.addEventListener("mouseenter",a),l.addEventListener("mousemove",r),l.addEventListener("mouseleave",u),l.addEventListener("pointerdown",i),l.addEventListener("pointermove",n),l.addEventListener("pointerup",s),l.addEventListener("pointercancel",s),e(.5,.5),!k&&!p&&(f=requestAnimationFrame(h)),()=>{l.removeEventListener("mouseenter",a),l.removeEventListener("mousemove",r),l.removeEventListener("mouseleave",u),l.removeEventListener("pointerdown",i),l.removeEventListener("pointermove",n),l.removeEventListener("pointerup",s),l.removeEventListener("pointercancel",s),f!=null&&cancelAnimationFrame(f)}},[k]),m.jsxs("div",{ref:b,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[m.jsxs("div",{className:"patronus-card",children:[m.jsx("div",{className:"patronus-layer patronus-bg",ref:l=>{M.current[0]=l},children:m.jsx("img",{alt:"",src:x[0]})}),m.jsx("div",{className:"patronus-layer",ref:l=>{M.current[1]=l},children:m.jsx("img",{alt:"",src:x[1]})}),m.jsx("div",{className:"patronus-layer",ref:l=>{M.current[2]=l},children:m.jsx("img",{alt:"",src:x[2]})}),m.jsx("div",{className:"patronus-layer patronus-svg",ref:l=>{M.current[3]=l},dangerouslySetInnerHTML:{__html:je}}),m.jsx("div",{className:"patronus-layer",ref:l=>{M.current[4]=l},children:m.jsx("img",{alt:"",src:x[3]})}),m.jsx("div",{className:"patronus-layer",ref:l=>{M.current[5]=l},children:m.jsx("img",{alt:"",src:x[4]})}),m.jsx("div",{className:"patronus-layer",ref:l=>{M.current[6]=l},children:m.jsx("img",{alt:"",src:x[5]})})]}),m.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{gt as default};
