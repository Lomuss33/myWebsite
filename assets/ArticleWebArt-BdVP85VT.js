const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/androidBackgroundEngine-HmTe5YFf.js","assets/three-Dyw0HQ4s.js","assets/hourglassEngine-Dxe9DVtS.js","assets/vendor-BUjjXRU6.js","assets/react-vendor-D1LkQUJD.js","assets/threeTunnelEngine-BYxOaRL9.js","assets/threePolygonDemo5Engine-J7VS_NUu.js","assets/prismFieldEngine-BQpxImA_.js","assets/soupShaderEngine-BVaccG7j.js","assets/tardisWormholeEngine-Czkyopnk.js"])))=>i.map(i=>d[i]);
import{c as ge,g as pe,A as ce,_ as B}from"./index-piY6JOss.js";import{r as c,j as b}from"./react-vendor-D1LkQUJD.js";import"./swiper-BJPGAhIX.js";/* empty css              */import"./bootstrap-jfx39s8c.js";import"./vendor-BUjjXRU6.js";const Ce=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`,Pe=`function Mash(seed) {
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
`;function $(m,{timeoutMs:p=1200}={}){if(typeof window>"u")return m(),()=>{};if("requestIdleCallback"in window){const u=window.requestIdleCallback(()=>m(),{timeout:p});return()=>window.cancelIdleCallback(u)}const R=window.setTimeout(()=>m(),0);return()=>window.clearTimeout(R)}function le(m){var a,C,M,P;if(!m)return{width:1,height:1};const p=m.getBoundingClientRect(),R=(C=(a=m.parentElement)==null?void 0:a.getBoundingClientRect)==null?void 0:C.call(a),u=(R==null?void 0:R.width)||((M=m.parentElement)==null?void 0:M.clientWidth)||1,g=(R==null?void 0:R.height)||((P=m.parentElement)==null?void 0:P.clientHeight)||u,x=Math.max(1,Math.round(p.width||m.clientWidth||u)),k=Math.max(1,Math.round(p.height||m.clientHeight||g));return{width:x,height:k}}function z(m,p,R=1){var a,C,M;const{width:u,height:g}=le(m),x=typeof window<"u"&&((C=(a=window.matchMedia)==null?void 0:a.call(window,"(pointer: coarse)"))==null?void 0:C.matches),k=Math.min(x?1:1.5,Math.max(1,Number(R)||1));if((u<32||g<32)&&typeof window<"u"){window.requestAnimationFrame(()=>{var v;const P=le(m);P.width>=32&&P.height>=32&&((v=p==null?void 0:p.setSize)==null||v.call(p,P.width,P.height,k))});return}(M=p==null?void 0:p.setSize)==null||M.call(p,u,g,k)}function ue(m,p,R="smooth"){if(typeof window>"u")return;const u=document.getElementById(m),g=document.getElementById(`scrollable-${p}`);if(!u||!g)return;const x=u.getBoundingClientRect(),k=g.getBoundingClientRect(),a=g.scrollTop+(x.top-k.top);g.scrollTo({top:Math.max(0,a),behavior:R})}const ke=9,Ie=9,Se=10,Ne=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],je=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function Ee(m=ke,p=Ie,R=Se){const u=m*p,g=Math.max(1,Math.min(R,u-1)),x=new Set;for(;x.size<g;)x.add(Math.floor(Math.random()*u));const k=new Array(u).fill(0);for(let a=0;a<u;a++){if(x.has(a)){k[a]=-1;continue}const C=a%p,M=Math.floor(a/p);let P=0;for(let v=-1;v<=1;v++)for(let f=-1;f<=1;f++){if(f===0&&v===0)continue;const n=C+f,e=M+v;n<0||e<0||n>=p||e>=m||x.has(e*p+n)&&(P+=1)}k[a]=P}return{rows:m,cols:p,mineCount:g,mines:x,counts:k}}function _e(m,p,R,u){const g=new Set(R),x=[m];for(;x.length>0;){const k=x.pop();if(k==null||g.has(k)||u.has(k)||p.mines.has(k)||(g.add(k),p.counts[k]!==0))continue;const a=k%p.cols,C=Math.floor(k/p.cols);for(let M=-1;M<=1;M++)for(let P=-1;P<=1;P++){if(P===0&&M===0)continue;const v=a+P,f=C+M;v<0||f<0||v>=p.cols||f>=p.rows||x.push(f*p.cols+v)}}return g}function de(m,p,R){const u=m.rows*m.cols-m.mineCount;if(p.size>=u)return!0;if(R.size!==m.mineCount)return!1;for(const g of m.mines)if(!R.has(g))return!1;return!0}function Le(m){return`Web art ${String(m||"tile").toLowerCase()} tile loading`}function Te({seed:m,reduceMotion:p}){const R=JSON.stringify(Pe.split("<\/script>").join("<\\/script>")),u=JSON.stringify(m);return`<!doctype html>
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
    reduceMotion: ${p?"true":"false"},
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
</html>`}function fe(m){return Array.isArray(m)?m.map((p,R)=>{const u=p!=null&&p.tone?` article-web-art-intro-guide-fragment-${p.tone}`:"";return b.jsx("span",{className:`article-web-art-intro-guide-fragment${u}`,children:p==null?void 0:p.text},`${(p==null?void 0:p.text)||"fragment"}-${R}`)}):m}function vt({dataWrapper:m,id:p}){var oe;const R=ge(),u=pe(),g=`${m.uniqueId}-ambient-trace`,x=`${m.uniqueId}-ambient-hex`,k=`${m.uniqueId}-ambient-plop`,a=`${m.uniqueId}-ambient-julia`,C=`${m.uniqueId}-ambient-mines`,M=`${m.uniqueId}-ambient-rings`,P=`${m.uniqueId}-ambient-prism`,v=`${m.uniqueId}-ambient-rope`,f=`${m.uniqueId}-ambient-soup`,n=`${m.uniqueId}-ambient-tardis`,[e,r]=c.useState(null),[t,o]=c.useState(!0),s=c.useMemo(()=>m.orderedItems,[m.orderedItems]),i=c.useMemo(()=>{const j=[4,5,3,6,1,2,7,8,9,10,11,12,13,14,15],D=new Map(s.map(H=>[Number(H==null?void 0:H.id),H])),T=[];for(const H of j){const q=D.get(H);q&&T.push(q)}for(const H of s){if(!H)continue;const q=Number(H==null?void 0:H.id);j.includes(q)||T.push(H)}return T},[s]),d=c.useRef(null),[l,h]=c.useState(!1),w=c.useRef(new Set),y=c.useRef(new Map),[I,S]=c.useState(0),[N,E]=c.useState(-1),[_,L]=c.useState(()=>new Set),[A,O]=c.useState(()=>new Set),[K,Y]=c.useState(!1),V=c.useMemo(()=>{const j=i.map(D=>D==null?void 0:D.uniqueId).filter(Boolean);return j.push(g,x,k,a,C,P,M,v,f,n,"ambient-goldfish","ambient-patronus"),new Set(j)},[x,a,C,k,P,M,v,f,n,g,i]),U=c.useMemo(()=>Array.from(A).filter(j=>j!=="ambient-goldfish"&&j!=="ambient-patronus"),[A]),F=t,Z=R.selectedLanguageId||"en";let J=R.getString("send_yours");typeof J=="string"&&J.startsWith("locale:")&&(J={en:"Send yours!",de:"Sende deine!",hr:"PoÅ¡alji svoju!",tr:"Sen de gÃ¶nder!"}[Z]||"Send yours!");let Q=R.getString("click");typeof Q=="string"&&Q.startsWith("locale:")&&(Q={en:"Click",de:"Klicken",hr:"Klikni",tr:"TÄ±kla"}[Z]||"Click");const re={en:{title:"Doors of the world behind an amazing art gallery.",guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",guide:{eyebrow:"So funktioniert es",lines:["Betritt die Galerie und schau dir die Karten in Ruhe an.","Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.","Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."]},button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",guide:{eyebrow:"Kako istraživati",lines:["Uđi u galeriju i istražuj kartice svojim tempom.","Klikni, dodirni ili pritisni karticu da otkriješ što skriva.","Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme."]},button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",guide:{eyebrow:"Nasıl gezilir",lines:["Galeriye girin ve kartları kendi temponuzda inceleyin.","İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.","Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir."]},button:"Gir",preparing:"Hazırlanıyor..."}}[Z]||{guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter"},me="hide",G=c.useCallback(j=>{if(!j||w.current.has(j))return;w.current.add(j);const D=y.current.get(j);D!=null&&(window.clearTimeout(D),y.current.delete(j)),S(w.current.size)},[]),ne=c.useCallback(j=>{j&&O(D=>{if(D.has(j))return D;const T=new Set(D);return T.add(j),T})},[]),W=c.useCallback(()=>{for(const j of y.current.values())window.clearTimeout(j);y.current=new Map,w.current=new Set,S(0),E(-1),h(!1),L(new Set),O(new Set),Y(!1)},[]),ee=c.useCallback(()=>{O(new Set(V)),L(new Set(V)),Y(!0)},[V]),te=c.useCallback(({openAll:j=!1}={})=>{if(o(!1),h(!0),E(i.length-1),j){ee();return}L(new Set),O(new Set),Y(!1)},[i.length,ee]);c.useEffect(()=>{var ae;if(typeof window>"u"||((ae=u.targetSection)==null?void 0:ae.id)!==m.sectionId||u.transitionStatus!=="transition_status_none")return;const j=window.__pendingSectionAction;if(!j||j.action!=="enter"||j.sectionId!==m.sectionId||j.targetArticleId&&j.targetArticleId!==m.uniqueId)return;if(Date.now()-(j.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,te({openAll:!0});const D=j.targetArticleId||m.uniqueId;let T=null,H=null,q=null,X=null;return T=window.setTimeout(()=>{H=window.requestAnimationFrame(()=>{ue(D,m.sectionId),q=window.setTimeout(()=>{X=window.requestAnimationFrame(()=>{ue(D,m.sectionId)})},220)})},90),()=>{T!==null&&window.clearTimeout(T),H!==null&&window.cancelAnimationFrame(H),q!==null&&window.clearTimeout(q),X!==null&&window.cancelAnimationFrame(X)}},[m.uniqueId,m.sectionId,(oe=u.targetSection)==null?void 0:oe.id,u.transitionStatus,te]);const se=c.useCallback(j=>{j&&(ne(j),L(D=>{if(D.has(j))return D;const T=new Set(D);return T.add(j),T}))},[ne]),ie=c.useCallback(j=>{j&&(L(D=>{if(!D.has(j))return D;const T=new Set(D);return T.delete(j),T}),O(D=>{if(!D.has(j))return D;const T=new Set(D);return T.delete(j),T}))},[]),we=V.size>0&&_.size>=V.size,xe=c.useCallback(()=>{if(V.size>0&&_.size>=V.size){L(new Set),O(new Set),Y(!1);return}ee()},[V,ee,_.size]),ve=c.useCallback(()=>{W(),o(!0)},[W]),ye=(j,D)=>{const T=Number(j==null?void 0:j.id);return T===1?"Hover":T===2?"Wave":T===3?"3D":T===4?"Poly":T===5?"Click":T===6?"Orbit":T===7?"Spin":T===8?"Shape":T===9?"Hourglass":T===10?"Noice":T===11?"Distance":T===12?"Android":T===13?"Pulse":T===14?"Bars":T===15?"Deep":String(D+1)},Me=i.map((j,D)=>{if(!l)return b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${D+1} loading`},j.uniqueId);const T=j.uniqueId,H=_.has(T),q=A.has(T)||H;return b.jsx(he,{label:ye(j,D),isOpen:H,onToggle:()=>{H?ie(T):se(T)},shouldRender:q,children:q&&b.jsx(Ae,{itemWrapper:j,index:D,locked:F||!H,activate:D<=N,onReady:G})},T)}),Re=l?[{key:"ambient-trace",tileId:g,label:"Trace",render:j=>b.jsx(Qe,{readyId:g,locked:F||!j,onReady:G})},{key:"ambient-hex",tileId:x,label:"Hex",render:j=>b.jsx(We,{readyId:x,locked:F||!j,onReady:G})},{key:"ambient-plop",tileId:k,label:"Plop",render:j=>b.jsx(et,{readyId:k,locked:F||!j,onReady:G})},{key:"ambient-julia",tileId:a,label:"Julia",render:j=>b.jsx(tt,{readyId:a,locked:F||!j,onReady:G})},{key:"ambient-mines",tileId:C,label:"Bomb",render:j=>b.jsx(rt,{readyId:C,locked:F||!j,onReady:G})},{key:"ambient-rings",tileId:M,label:"Fall",render:j=>b.jsx(nt,{readyId:M,locked:F||!j,onReady:G})},{key:"ambient-prism",tileId:P,label:"Prism",render:j=>b.jsx(st,{readyId:P,locked:F||!j,onReady:G})},{key:"ambient-rope",tileId:v,label:"Rope",render:j=>b.jsx(it,{readyId:v,locked:F||!j,onReady:G})},{key:"ambient-soup",tileId:f,label:"Soup",render:j=>b.jsx(ct,{readyId:f,locked:F||!j,onReady:G})},{key:"ambient-tardis",tileId:n,label:"Tardis",render:j=>b.jsx(lt,{readyId:n,locked:F||!j,onReady:G})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:j=>b.jsx(dt,{locked:F||!j})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:j=>b.jsx(ft,{locked:F||!j})}].map(({key:j,tileId:D,label:T,render:H})=>{const q=_.has(D),X=A.has(D)||q;return b.jsx(he,{label:T,isOpen:q,onToggle:()=>{q?ie(D):se(D)},shouldRender:X,children:X&&H(q)},j)}):[b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return c.useEffect(()=>{W()},[m.uniqueId,W]),c.useEffect(()=>{l&&E(i.length-1)},[l,i.length]),c.useEffect(()=>{if(l)for(const j of U){if(!j||w.current.has(j)||y.current.has(j))continue;const D=window.setTimeout(()=>{G(j)},12e3);y.current.set(j,D)}},[l,U,G]),b.jsx(ce,{id:m.uniqueId,type:ce.Types.SPACING_DEFAULT,dataWrapper:m,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:r,children:b.jsxs("div",{className:"article-web-art-shell",children:[b.jsx(De,{guide:re.guide,buttonLabel:t?re.button:me,hidden:!t,onEnter:t?te:ve,secondaryButtonLabel:t?null:"promaja",onSecondaryAction:t?null:xe,secondaryPressed:we}),b.jsx("div",{className:`article-web-art-stage ${t?"article-web-art-stage-preview":""}`,"aria-hidden":t,children:b.jsxs("div",{className:`article-web-art-items ${F?"article-web-art-items-locked":""}`,ref:d,"aria-busy":t,children:[l&&b.jsx(ut,{label:J,clickLabel:Q,previewRequested:K}),Me,Re]})})]})})}function De({guide:m,buttonLabel:p,hidden:R,onEnter:u,secondaryButtonLabel:g=null,onSecondaryAction:x=null,secondaryPressed:k=!1}){const a=C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),u())};return b.jsx("div",{className:`article-web-art-intro-cover ${R?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:b.jsx("div",{className:"article-web-art-intro-cover-inner",children:b.jsx("div",{className:"article-web-art-intro-cover-actions",children:b.jsx("div",{className:`article-web-art-intro-guide ${R?"article-web-art-intro-guide-hidden":"article-web-art-intro-guide-open"}`,children:b.jsxs("div",{className:"article-web-art-intro-guide-inner",children:[b.jsxs("div",{className:"article-web-art-intro-guide-top-row",children:[b.jsxs("div",{className:"article-web-art-intro-guide-top-copy",children:[b.jsx("span",{className:"article-web-art-intro-guide-eyebrow",children:m.eyebrow}),b.jsx("p",{className:"article-web-art-intro-guide-line article-web-art-intro-guide-line-primary",children:fe(m.lines[0])})]}),b.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[g?b.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${k?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:x||void 0,"aria-pressed":k,"aria-label":g,children:g}):null,b.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:u,onKeyDown:a,"aria-label":p,children:p})]})]}),b.jsx("div",{className:"article-web-art-intro-guide-lines",children:m.lines.slice(1).map((C,M)=>b.jsx("p",{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${M+2}`,children:fe(C)},Array.isArray(C)?C.map(P=>P==null?void 0:P.text).join(""):C))})]})})})})})}function he({label:m,isOpen:p,onToggle:R,shouldRender:u=!0,children:g}){return b.jsxs("div",{className:`article-web-art-gated-tile ${p?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[u?g:b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":Le(m)}),b.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),b.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${p?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:R,"aria-label":`${p?"Hide":"Show"} ${m}`,children:m})]})}function Ae({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){return Number(m.id)===1?b.jsx(Ye,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===2?b.jsx(Ue,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===3?b.jsx(Xe,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===4?b.jsx(Ze,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===6?b.jsx(Je,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===7?b.jsx(Be,{itemWrapper:m,locked:u,onReady:g}):Number(m.id)===8?b.jsx($e,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===9?b.jsx(Fe,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===10?b.jsx(qe,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===11?b.jsx(Oe,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===12?b.jsx(He,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===13?b.jsx(Ge,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===14?b.jsx(ze,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):Number(m.id)===15?b.jsx(Ke,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g}):b.jsx(Ve,{itemWrapper:m,index:p,activate:R,locked:u,onReady:g})}function Oe({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(!0),P=c.useRef(null),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:54013+(Number(m.id)||11)*7331,reduceMotion:v}),[m.id,v]);c.useEffect(()=>{if(!R)return;const e=x.current,r=k.current;if(!e||!r)return;let t=!1,o=null,s=null,i=null;const d=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},l=$(async()=>{var h,w;try{const y=await B(()=>import("./distanceFieldEngine-DHTRwy4W.js"),[]);if(t)return;o=y.createDistanceFieldEngine(r,f),a.current=o;const I=()=>z(e,o,Math.min(1.5,window.devicePixelRatio||1));I(),(h=o.renderStatic)==null||h.call(o),u||(w=o.start)==null||w.call(o),d(),s=new ResizeObserver(()=>{I()}),s.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(S=>{var N,E,_,L;for(const A of S){if(M.current=!!A.isIntersecting,u){(N=o.setHoverActive)==null||N.call(o,!1),(E=o.stop)==null||E.call(o);continue}M.current?(_=o.start)==null||_.call(o):(L=o.stop)==null||L.call(o)}},{threshold:.25}),i.observe(e))}catch{d()}},{timeoutMs:220});return()=>{var h;t=!0,l==null||l(),i==null||i.disconnect(),s==null||s.disconnect(),(h=o==null?void 0:o.destroy)==null||h.call(o),a.current=null}},[R,f,m.uniqueId,u,g]),c.useEffect(()=>{var r,t,o,s;const e=a.current;if(e){if(u){(r=e.setHoverActive)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(o=e.stop)==null||o.call(e);return}M.current&&((s=e.start)==null||s.call(e))}},[u]);const n=e=>{const r=x.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${p+1}`,disabled:u,onPointerEnter:u?void 0:(()=>{var e,r,t,o;(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(o=(t=a.current)==null?void 0:t.start)==null||o.call(t)}),onPointerMove:u?void 0:(e=>{var t,o,s,i;const r=n(e);(o=(t=a.current)==null?void 0:t.setHoverActive)==null||o.call(t,!0),(i=(s=a.current)==null?void 0:s.setPointer)==null||i.call(s,r.x,r.y)}),onPointerLeave:u?void 0:(()=>{var e,r,t,o;P.current=null,(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(o=(t=a.current)==null?void 0:t.clearPointer)==null||o.call(t)}),onPointerDown:u?void 0:(e=>{var t,o,s,i,d,l;if(e.button!=null&&e.button!==0)return;P.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const r=n(e);(o=(t=a.current)==null?void 0:t.setHoverActive)==null||o.call(t,!0),(i=(s=a.current)==null?void 0:s.setPointer)==null||i.call(s,r.x,r.y),(l=(d=a.current)==null?void 0:d.boostPopulation)==null||l.call(d)}),onPointerUp:u?void 0:(e=>{P.current!=null&&e.pointerId!==P.current||(P.current=null)}),onPointerCancel:u?void 0:(()=>{var e,r,t,o;P.current=null,(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(o=(t=a.current)==null?void 0:t.clearPointer)==null||o.call(t)}),onFocus:u?void 0:(()=>{var e,r,t,o;(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(o=(t=a.current)==null?void 0:t.start)==null||o.call(t)}),onBlur:u?void 0:(()=>{var e,r,t,o;P.current=null,(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(o=(t=a.current)==null?void 0:t.clearPointer)==null||o.call(t)}),onKeyDown:u?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=a.current)==null?void 0:r.boostPopulation)==null||t.call(r))}),children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function He({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(null),M=c.useRef(null),P=c.useRef(!1),v=c.useRef(!0),f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!R)return;const e=x.current,r=k.current,t=a.current;if(!e||!r||!t)return;let o=!1,s=null,i=null,d=null,l=null;const h=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},w=$(async()=>{var y,I,S,N;try{const E=await B(()=>import("./androidBackgroundEngine-HmTe5YFf.js"),__vite__mapDeps([0,1])),_=await B(()=>import("./androidRobotEngine-CNxYykCI.js"),[]);if(o)return;s=E.createAndroidBackgroundEngine(r,{reduceMotion:f}),C.current=s,i=_.createAndroidRobotEngine(t,{reduceMotion:f}),M.current=i;const L=()=>{const A=Math.min(1.5,window.devicePixelRatio||1);z(e,s,A),z(e,i,A)};L(),(y=s.renderStatic)==null||y.call(s),(I=i.renderStatic)==null||I.call(i),u||(S=s.start)==null||S.call(s),u||(N=i.start)==null||N.call(i),h(),d=new ResizeObserver(()=>{L()}),d.observe(e),"IntersectionObserver"in window&&(l=new IntersectionObserver(A=>{var O,K,Y,V,U,F;for(const Z of A){if(v.current=!!Z.isIntersecting,u){(O=s.stop)==null||O.call(s),(K=i.stop)==null||K.call(i);continue}v.current?((Y=s.start)==null||Y.call(s),(V=i.start)==null||V.call(i)):((U=s.stop)==null||U.call(s),(F=i.stop)==null||F.call(i))}},{threshold:.2}),l.observe(e))}catch{h()}},{timeoutMs:220});return()=>{var y,I;o=!0,w==null||w(),l==null||l.disconnect(),d==null||d.disconnect(),(y=s==null?void 0:s.destroy)==null||y.call(s),(I=i==null?void 0:i.destroy)==null||I.call(i),C.current=null,M.current=null}},[R,m.uniqueId,u,g,f]),c.useEffect(()=>{var t,o,s,i,d;const e=M.current,r=C.current;if(!(!e||!r)){if(u){(t=e.clearPointer)==null||t.call(e),(o=r.stop)==null||o.call(r),(s=e.stop)==null||s.call(e);return}v.current&&((i=r.start)==null||i.call(r),(d=e.start)==null||d.call(e))}},[u]);const n=e=>{const r=x.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android","aria-label":`Android web art tile ${p+1}`,disabled:u,onPointerEnter:u?void 0:(()=>{var e,r;(r=(e=M.current)==null?void 0:e.start)==null||r.call(e)}),onPointerMove:u?void 0:(e=>{var t,o;const r=n(e);(o=(t=M.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)}),onPointerLeave:u?void 0:(()=>{var e,r;(r=(e=M.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onFocus:u?void 0:(()=>{var e,r;(r=(e=M.current)==null?void 0:e.start)==null||r.call(e)}),onBlur:u?void 0:(()=>{var e,r;(r=(e=M.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onClick:u?void 0:(()=>{var e,r;(r=(e=M.current)==null?void 0:e.poke)==null||r.call(e)}),onKeyDown:u?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=M.current)==null?void 0:r.poke)==null||t.call(r))}),children:[b.jsx("canvas",{ref:k,className:"article-web-art-android-bg-canvas","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-android-glow","aria-hidden":!0}),b.jsx("canvas",{ref:a,className:"article-web-art-android-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Android"})]})}function Be({itemWrapper:m,locked:p,onReady:R}){const u=c.useRef(!1);c.useEffect(()=>{u.current||(u.current=!0,R==null||R(m.uniqueId))},[m.uniqueId,R]);const g=c.useMemo(()=>[{key:"stop",hoverMode:"stop",hoverDuration:"5s"},{key:"slow",hoverMode:"slow",hoverDuration:"18s"},{key:"super-fast",hoverMode:"super-fast",hoverDuration:"0.22s"},{key:"very-fast",hoverMode:"very-fast",hoverDuration:"0.55s"}],[]);return b.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${p?"article-web-art-spin-boxes-locked":""}`,children:b.jsx("div",{className:"article-web-art-spin-boxes-grid",children:g.map(({key:x,hoverDuration:k,hoverMode:a})=>b.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--spin-hover-duration":k},children:b.jsx("div",{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${a}`})},x))})})}function ze({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(!1),k=50,a=c.useMemo(()=>["level-1","level-2","level-3","level-4","level-5"],[]),[C,M]=c.useState(0),P=a[C],v=c.useMemo(()=>Array.from({length:k},(n,e)=>{const r=`${3/(k/2)*(e+1)}s`;return{key:e,style:{animationDelay:r,"--bar-index":e}}}),[]),f=c.useCallback(n=>{var e,r;(e=n==null?void 0:n.preventDefault)==null||e.call(n),(r=n==null?void 0:n.stopPropagation)==null||r.call(n),M(t=>(t+1)%a.length)},[a.length]);return c.useEffect(()=>{R&&(x.current||(x.current=!0,g==null||g(m.uniqueId)))},[R,m.uniqueId,g]),b.jsx("button",{type:"button",className:"article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable","aria-label":`Bars web art tile ${p+1}, ${P.replace("level-","mode ")}`,disabled:u,onClick:u?void 0:f,onKeyDown:u?void 0:n=>{(n.key==="Enter"||n.key===" ")&&f(n)},children:b.jsx("div",{className:`article-web-art-bars-stage article-web-art-bars-stage-${P}`,children:b.jsx("div",{className:`article-web-art-bars article-web-art-bars-${P}`,children:v.map(n=>b.jsx("div",{className:"article-web-art-bars-panel",style:n.style},n.key))})})})}function $e({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(!0),P=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=c.useMemo(()=>({seed:1729+(Number(m.id)||8)*4242,reduceMotion:P,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[m.id,P]);c.useEffect(()=>{if(!R)return;const t=x.current,o=k.current;if(!t||!o)return;let s=!1,i=null,d=null,l=null;const h=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},w=$(async()=>{var y,I,S;try{const N=await B(()=>import("./shapeFieldEngine-B_ToSidK.js"),[]);if(s)return;i=N.createShapeFieldEngine(o,v),a.current=i;const E=()=>z(t,i,window.devicePixelRatio||1);E(),(y=i.renderStatic)==null||y.call(i),(I=i.triggerWave)==null||I.call(i),u||(S=i.start)==null||S.call(i),h(),d=new ResizeObserver(()=>{var _;E(),(_=i.renderStatic)==null||_.call(i)}),d.observe(t),"IntersectionObserver"in window&&(l=new IntersectionObserver(_=>{var L,A,O;for(const K of _){if(M.current=!!K.isIntersecting,u){(L=i.stop)==null||L.call(i);continue}M.current?(A=i.start)==null||A.call(i):(O=i.stop)==null||O.call(i)}},{threshold:.2}),l.observe(t))}catch{h()}});return()=>{var y;s=!0,w==null||w(),l==null||l.disconnect(),d==null||d.disconnect(),(y=i==null?void 0:i.destroy)==null||y.call(i),a.current=null}},[R,v,m.uniqueId,u,g]),c.useEffect(()=>{var o,s,i;const t=a.current;if(t){if(u){(o=t.clearPointer)==null||o.call(t),(s=t.stop)==null||s.call(t);return}M.current&&((i=t.start)==null||i.call(t))}},[u]);const f=t=>{const o=k.current||x.current;if(!o)return{x:0,y:0};const s=o.getBoundingClientRect();return{x:t.clientX-s.left,y:t.clientY-s.top}},n=t=>{var s,i;const o=f(t);(i=(s=a.current)==null?void 0:s.setPointer)==null||i.call(s,o.x,o.y)},e=t=>{var s,i,d,l;const o=f(t);(i=(s=a.current)==null?void 0:s.setPointer)==null||i.call(s,o.x,o.y),(l=(d=a.current)==null?void 0:d.triggerWave)==null||l.call(d,o.x,o.y)},r=t=>{var o,s;t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),(s=(o=a.current)==null?void 0:o.triggerWave)==null||s.call(o))};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${p+1}`,disabled:u,onPointerMove:u?void 0:n,onPointerDown:u?void 0:e,onPointerLeave:u?void 0:(()=>{var t,o;return(o=(t=a.current)==null?void 0:t.clearPointer)==null?void 0:o.call(t)}),onBlur:u?void 0:(()=>{var t,o;return(o=(t=a.current)==null?void 0:t.clearPointer)==null?void 0:o.call(t)}),onKeyDown:u?void 0:r,children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function Fe({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(!0),[P,v]=c.useState(2.8),[f,n]=c.useState(.01);c.useEffect(()=>{if(!R)return;const i=x.current,d=k.current;if(!i||!d)return;let l=!1,h=null,w=null,y=null;const I=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},S=$(async()=>{var N,E,_;try{const L=await B(()=>import("./hourglassEngine-Dxe9DVtS.js"),__vite__mapDeps([2,3,4]));if(l)return;h=L.createHourglassEngine(d),a.current=h;const A=(N=h.getState)==null?void 0:N.call(h);A&&(v(A.gravity),n(A.neckRatio));const O=()=>z(i,h,window.devicePixelRatio||1);O(),(E=h.renderStatic)==null||E.call(h),u||(_=h.start)==null||_.call(h),I(),w=new ResizeObserver(()=>{var K;O(),(K=h.renderStatic)==null||K.call(h)}),w.observe(i),"IntersectionObserver"in window&&(y=new IntersectionObserver(K=>{var Y,V,U;for(const F of K){if(M.current=!!F.isIntersecting,u){(Y=h.stop)==null||Y.call(h);continue}M.current?(V=h.start)==null||V.call(h):(U=h.stop)==null||U.call(h)}},{threshold:.2}),y.observe(i))}catch{I()}});return()=>{var N;l=!0,S==null||S(),y==null||y.disconnect(),w==null||w.disconnect(),(N=h==null?void 0:h.destroy)==null||N.call(h),a.current=null}},[R,m.uniqueId,u,g]),c.useEffect(()=>{var d,l;const i=a.current;if(i){if(u){(d=i.stop)==null||d.call(i);return}M.current&&((l=i.start)==null||l.call(i))}},[u]);const e=i=>{var d,l;i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),(l=(d=a.current)==null?void 0:d.flip)==null||l.call(d))},r=i=>{i.stopPropagation()},t=i=>{i.stopPropagation()},o=i=>{var l,h;const d=Number(i.target.value);v(d),(h=(l=a.current)==null?void 0:l.setGravity)==null||h.call(l,d)},s=i=>{var l,h,w,y;const d=Number(i.target.value);n(d),(h=(l=a.current)==null?void 0:l.setNeckRatio)==null||h.call(l,d),!u&&M.current&&((y=(w=a.current)==null?void 0:w.start)==null||y.call(w))};return b.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass",role:u?void 0:"button",tabIndex:u?-1:0,"aria-label":`Hourglass web art tile ${p+1}`,onClick:u?void 0:(()=>{var i,d;return(d=(i=a.current)==null?void 0:i.flip)==null?void 0:d.call(i)}),onKeyDown:u?void 0:e,children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsxs("div",{className:"article-web-art-hourglass-controls",onClickCapture:t,onPointerDownCapture:t,onPointerUpCapture:t,onClick:r,onPointerDown:r,onPointerUp:r,onKeyDown:r,children:[b.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-left",children:[b.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Neck"}),b.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.01",max:"0.22",step:"0.001",value:f,onChange:s,disabled:u,"aria-label":"Hourglass neck size"})]}),b.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-right",children:[b.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Gravity"}),b.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.45",max:"2.8",step:"0.01",value:P,onChange:o,disabled:u,"aria-label":"Hourglass gravity"})]})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function qe({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(!0),P=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!R)return;const n=x.current,e=k.current;if(!n||!e)return;let r=!1,t=null,o=null,s=null;const i=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},d=$(async()=>{var l,h;try{const w=await B(()=>import("./noiceShaderEngine-6wwfZdln.js"),[]);if(r)return;t=w.createNoiceShaderEngine(e,{reduceMotion:P}),a.current=t;const y=()=>z(n,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),u||(h=t.start)==null||h.call(t),i(),o=new ResizeObserver(()=>{var I;y(),(I=t.renderStatic)==null||I.call(t)}),o.observe(n),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var S,N,E;for(const _ of I){if(M.current=!!_.isIntersecting,u){(S=t.stop)==null||S.call(t);continue}M.current?(N=t.start)==null||N.call(t):(E=t.stop)==null||E.call(t)}},{threshold:.25}),s.observe(n))}catch{i()}},{timeoutMs:220});return()=>{var l;r=!0,d==null||d(),s==null||s.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),a.current=null}},[R,m.uniqueId,u,g,P]),c.useEffect(()=>{var e,r,t;const n=a.current;if(n){if(u){(e=n.clearPointer)==null||e.call(n),(r=n.stop)==null||r.call(n);return}M.current&&((t=n.start)==null||t.call(n))}},[u]);const v=n=>{const e=k.current||x.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(n.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(n.clientY-r.top)/Math.max(1,r.height)))}},f=n=>{var r,t,o,s,i,d;const e=v(n);(t=(r=a.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y),(s=(o=a.current)==null?void 0:o.pulsePattern)==null||s.call(o),(d=(i=a.current)==null?void 0:i.start)==null||d.call(i)};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice","aria-label":`Noice web art tile ${p+1}`,disabled:u,onPointerMove:u?void 0:(n=>{var r,t;const e=v(n);(t=(r=a.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerDown:u?void 0:(n=>{n.button!=null&&n.button!==0||f(n)}),onMouseLeave:u?void 0:(()=>{var n,e;(e=(n=a.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onBlur:u?void 0:(()=>{var n,e;(e=(n=a.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onKeyDown:u?void 0:(n=>{var e,r,t,o;(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),(r=(e=a.current)==null?void 0:e.pulsePattern)==null||r.call(e),(o=(t=a.current)==null?void 0:t.start)==null||o.call(t))}),children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function Ke({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(!0),P=c.useRef(null),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!R)return;const n=x.current,e=k.current;if(!n||!e)return;let r=!1,t=null,o=null,s=null;const i=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},d=$(async()=>{var l,h;try{const w=await B(()=>import("./deepShaderEngine-CuYCvQ1H.js"),[]);if(r)return;t=w.createDeepShaderEngine(e,{reduceMotion:v}),a.current=t;const y=()=>z(n,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),u||(h=t.start)==null||h.call(t),i(),o=new ResizeObserver(()=>{var I;y(),(I=t.renderStatic)==null||I.call(t)}),o.observe(n),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var S,N,E;for(const _ of I){if(M.current=!!_.isIntersecting,u){(S=t.stop)==null||S.call(t);continue}M.current?(N=t.start)==null||N.call(t):(E=t.stop)==null||E.call(t)}},{threshold:.25}),s.observe(n))}catch{i()}},{timeoutMs:220});return()=>{var l;r=!0,d==null||d(),s==null||s.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),a.current=null}},[R,m.uniqueId,u,g,v]),c.useEffect(()=>{var e,r,t;const n=a.current;if(n){if(u){P.current=null,(e=n.clearPointer)==null||e.call(n),(r=n.stop)==null||r.call(n);return}M.current&&((t=n.start)==null||t.call(n))}},[u]);const f=n=>{const e=k.current||x.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(n.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(n.clientY-r.top)/Math.max(1,r.height)))}};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-deep","aria-label":`Deep web art tile ${p+1}`,disabled:u,onPointerDown:u?void 0:n=>{var r,t,o,s;if(n.button!=null&&n.button!==0)return;P.current=n.pointerId;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}const e=f(n);(t=(r=a.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y),(s=(o=a.current)==null?void 0:o.start)==null||s.call(o)},onPointerMove:u?void 0:n=>{var r,t;if(P.current!=null&&n.pointerId!==P.current||P.current==null&&n.pointerType!=="mouse")return;const e=f(n);P.current!=null&&((t=(r=a.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y))},onPointerUp:u?void 0:n=>{var e,r;P.current!=null&&n.pointerId!==P.current||(P.current=null,(r=(e=a.current)==null?void 0:e.clearPointer)==null||r.call(e))},onPointerCancel:u?void 0:(()=>{var n,e;P.current=null,(e=(n=a.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onMouseLeave:u?void 0:(()=>{var n,e;P.current=null,(e=(n=a.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onBlur:u?void 0:(()=>{var n,e;P.current=null,(e=(n=a.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onKeyDown:u?void 0:(n=>{var e,r;(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),(r=(e=a.current)==null?void 0:e.start)==null||r.call(e))}),children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Deep"})]})}function Ve({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),M=c.useRef(!0),P=c.useRef(!1),v=Number(m==null?void 0:m.id)===5,f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=c.useMemo(()=>{const s=Number(m.id)||p+1,i=.0026+s*8e-5,d=.0054+s*14e-5,l=s%2?1:2,h={kx:11+s*2,ky:s%2};return{refreshDelay:v?0:8e3,radiusMini:i,radiusMaxi:d,dHueStep:l,startGroup:h,seed:1337+s*1009,reduceMotion:f}},[v,m.id,p,f]);c.useEffect(()=>{if(!R)return;const s=x.current,i=k.current;if(!s||!i)return;let d=!1,l=null,h=null,w=null;const y=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},I=$(async()=>{var S,N;try{const E=await B(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(d)return;l=E.createEmbroideryEngine(i,n),a.current=l;const _=()=>z(s,l,window.devicePixelRatio||1);_(),(S=l.renderStatic)==null||S.call(l),M.current&&((N=l.start)==null||N.call(l)),y(),h=new ResizeObserver(()=>{var L;_(),(L=l.renderStatic)==null||L.call(l)}),h.observe(s),"IntersectionObserver"in window&&(w=new IntersectionObserver(L=>{for(const A of L){if(M.current=!!A.isIntersecting,v){M.current||l.stop();continue}M.current&&C.current?l.start():l.stop()}},{threshold:.25}),w.observe(s))}catch{y()}});return()=>{d=!0,I==null||I(),w==null||w.disconnect(),h==null||h.disconnect(),l==null||l.destroy(),a.current=null}},[R,n,m.uniqueId,g]),c.useEffect(()=>{var i,d;const s=a.current;if(s){if(u){(i=s.stop)==null||i.call(s);return}M.current&&((d=s.start)==null||d.call(s))}},[u]),c.useEffect(()=>{var i,d;const s=a.current;if(s){if(u){(i=s.stop)==null||i.call(s);return}M.current&&((d=s.start)==null||d.call(s))}},[u]);const e=()=>{var s;C.current=!0,M.current&&((s=a.current)==null||s.start())},r=()=>{var s,i,d,l;C.current=!0,M.current?(i=(s=a.current)==null?void 0:s.start)==null||i.call(s):(l=(d=a.current)==null?void 0:d.stop)==null||l.call(d)},t=()=>{var s,i,d,l,h,w,y,I,S,N;if(v){(i=(s=a.current)==null?void 0:s.stop)==null||i.call(s),(l=(d=a.current)==null?void 0:d.reset)==null||l.call(d),(w=(h=a.current)==null?void 0:h.start)==null||w.call(h);return}(y=a.current)==null||y.reset(),(S=(I=a.current)==null?void 0:I.renderStatic)==null||S.call(I),M.current&&((N=a.current)==null||N.start())},o=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),t())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${p+1}`,disabled:u,onClick:u?void 0:t,onMouseEnter:u||v?void 0:e,onMouseLeave:u||v?void 0:r,onFocus:u||v?void 0:e,onBlur:u||v?void 0:r,onKeyDown:u?void 0:o,children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:v?"Click":Number.isFinite(Number(m==null?void 0:m.id))?Number(m.id):p+1})]})}function Ge({itemWrapper:m,index:p,activate:R,onReady:u}){const g=c.useRef(!1),x=c.useRef(null),k=c.useMemo(()=>`<!doctype html>
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
</html>`,[]);return c.useEffect(()=>{R&&(g.current||(g.current=!0,u==null||u(m.uniqueId)))},[R,m.uniqueId,u]),b.jsx("div",{className:"article-web-art-tile article-web-art-pulse-tile",role:"img","aria-label":`Pulse web art tile ${p+1}`,children:b.jsx("iframe",{ref:x,className:"article-web-art-pulse-frame",title:"Pulse web art",srcDoc:k,sandbox:"",scrolling:"no"})})}function Ye({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),M=c.useRef(null);c.useRef(null),c.useRef(!1);const P=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:9001+(Number(m.id)||1)*1337,reduceMotion:v,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[m.id,v]);c.useEffect(()=>{if(!R)return;const l=x.current,h=k.current;if(!l||!h)return;let w=!1,y=null,I=null;const S=()=>{C.current||(C.current=!0,g==null||g(m.uniqueId))},N=$(async()=>{var E,_;try{const L=await B(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(w)return;y=L.createSpiralDotsEngine(h,f),a.current=y;const A=()=>z(l,y,window.devicePixelRatio||1);A(),(E=y.renderStatic)==null||E.call(y),(_=y.start)==null||_.call(y),S(),I=new ResizeObserver(()=>{var O;A(),y.rebuildDots(),(O=y.renderStatic)==null||O.call(y)}),I.observe(l)}catch{S()}});return()=>{w=!0,N==null||N(),I==null||I.disconnect(),y==null||y.destroy(),a.current=null}},[R,f,m.uniqueId,g]),c.useEffect(()=>{var h,w,y;const l=a.current;if(l){if(u){(h=l.clearMouse)==null||h.call(l),(w=l.stop)==null||w.call(l);return}(y=l.start)==null||y.call(l)}},[u]);const n=l=>{const h=k.current||x.current;if(!h)return{x:-1e4,y:-1e4};const w=h.getBoundingClientRect();return{x:l.clientX-w.left,y:l.clientY-w.top}},e=()=>{var l;(l=a.current)==null||l.start()},r=()=>{var l,h;(l=a.current)==null||l.clearMouse(),(h=a.current)==null||h.start()},t=()=>{e()},o=()=>{r()},s=l=>{var w;const h=n(l);(w=a.current)==null||w.setMouse(h.x,h.y)},i=()=>{e()},d=()=>{r()};return b.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-hover-only article-web-art-tile-hover-dots",role:"img",tabIndex:u?-1:0,"aria-label":`Spiral dots web art tile ${p+1}`,onPointerDown:u?void 0:l=>{var y;if(l.pointerType==="mouse")return;const h=x.current;if(!h)return;P.current=!0,M.current=l.pointerId;try{h.setPointerCapture(l.pointerId)}catch{}e();const w=n(l);(y=a.current)==null||y.setMouse(w.x,w.y)},onPointerMove:u?void 0:l=>{var w;if(!P.current||M.current!=null&&l.pointerId!==M.current)return;const h=n(l);(w=a.current)==null||w.setMouse(h.x,h.y)},onPointerUp:u?void 0:l=>{M.current!=null&&l.pointerId!==M.current||(P.current=!1,M.current=null,r())},onPointerCancel:u?void 0:()=>{P.current=!1,M.current=null,r()},onMouseEnter:u?void 0:t,onMouseLeave:u?void 0:o,onMouseMove:u?void 0:s,onFocus:u?void 0:i,onBlur:u?void 0:d,children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function Ue({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),M=c.useRef(!0),P=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:424242+(Number(m.id)||2)*2027,reduceMotion:v,targetCellSize:14,gapPx:1.4}),[m.id,v]);c.useEffect(()=>{if(!R)return;const s=x.current,i=k.current;if(!s||!i)return;let d=!1,l=null,h=null,w=null;const y=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},I=$(async()=>{var S,N;try{const E=await B(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(d)return;l=E.createGridWaveEngine(i,f),a.current=l;const _=()=>z(s,l,window.devicePixelRatio||1);_(),(S=l.renderStatic)==null||S.call(l),M.current&&((N=l.start)==null||N.call(l)),y(),h=new ResizeObserver(()=>{var L;_(),(L=l.renderStatic)==null||L.call(l)}),h.observe(s),"IntersectionObserver"in window&&(w=new IntersectionObserver(L=>{for(const A of L)M.current=!!A.isIntersecting,M.current&&C.current?l.start():l.stop()},{threshold:.25}),w.observe(s))}catch{y()}});return()=>{d=!0,I==null||I(),w==null||w.disconnect(),h==null||h.disconnect(),l==null||l.destroy(),a.current=null}},[R,f,m.uniqueId,g]);const n=()=>{var s;C.current=!0,M.current&&((s=a.current)==null||s.start())},e=()=>{var s,i,d,l;C.current=!0,M.current?(i=(s=a.current)==null?void 0:s.start)==null||i.call(s):(l=(d=a.current)==null?void 0:d.stop)==null||l.call(d)},r=s=>{const i=k.current||x.current;if(!i)return{x:0,y:0};const d=i.getBoundingClientRect();return typeof(s==null?void 0:s.clientX)!="number"||typeof(s==null?void 0:s.clientY)!="number"?{x:d.width/2,y:d.height/2}:{x:s.clientX-d.left,y:s.clientY-d.top}},t=s=>{var d,l,h,w;const i=r(s);(d=a.current)==null||d.rippleAt(i.x,i.y),(h=(l=a.current)==null?void 0:l.renderStatic)==null||h.call(l),C.current&&M.current&&((w=a.current)==null||w.start())},o=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),t(null))};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${p+1}`,disabled:u,onClick:u?void 0:t,onMouseEnter:u?void 0:n,onMouseLeave:u?void 0:e,onFocus:u?void 0:n,onBlur:u?void 0:e,onKeyDown:u?void 0:o,children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function Xe({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),M=c.useRef(!0),P=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({reduceMotion:v,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[v]);c.useEffect(()=>{if(!R)return;const o=x.current,s=k.current;if(!o||!s)return;let i=!1,d=null,l=null,h=null,w=null;const y=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},I=async()=>{var L;const N=await B(()=>import("./threeTunnelEngine-BYxOaRL9.js"),__vite__mapDeps([5,1]));if(i)return;d=N.createThreeTunnelEngine(s,f),a.current=d;const E=()=>z(o,d,Math.min(1.5,window.devicePixelRatio||1));return E(),d.reset(),M.current&&((L=d.start)==null||L.call(d)),y(),l=new ResizeObserver(()=>{E(),d.reset()}),l.observe(o),"IntersectionObserver"in window&&(h=new IntersectionObserver(A=>{for(const O of A)M.current=!!O.isIntersecting,M.current&&C.current?d.start():d.stop()},{threshold:.25}),h.observe(o)),()=>{h==null||h.disconnect(),l==null||l.disconnect(),d.destroy(),a.current=null}};let S=null;return w=$(()=>{I().then(N=>{S=N||null}).catch(()=>{y()})},{timeoutMs:300}),()=>{i=!0,w==null||w(),S==null||S()}},[R,f,m.uniqueId,g]),c.useEffect(()=>{var s,i,d;const o=a.current;if(o){if(u){(s=o.setHeld)==null||s.call(o,!1),(i=o.stop)==null||i.call(o);return}M.current&&((d=o.start)==null||d.call(o))}},[u]);const n=()=>{var o;C.current=!0,M.current&&((o=a.current)==null||o.start())},e=()=>{var o,s,i,d;C.current=!0,M.current?(s=(o=a.current)==null?void 0:o.start)==null||s.call(o):(d=(i=a.current)==null?void 0:i.stop)==null||d.call(i)},r=()=>{var o,s,i,d;(s=(o=a.current)==null?void 0:o.nextPalette)==null||s.call(o),(i=a.current)==null||i.reset(),M.current&&((d=a.current)==null||d.start())},t=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),r())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${p+1}`,disabled:u,onClick:u?void 0:r,onMouseEnter:u?void 0:n,onMouseLeave:u?void 0:e,onFocus:u?void 0:n,onBlur:u?void 0:e,onKeyDown:u?void 0:t,children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),b.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Ze({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),M=c.useRef(!0),P=c.useRef(!1),v=c.useRef(null),f=c.useRef(null),n=c.useRef(!1),e=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=c.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,u]);c.useEffect(()=>{if(!R)return;const s=x.current,i=k.current;if(!s||!i)return;let d=!1,l=null,h=null;const w=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},y=async()=>{var L;const I=await B(()=>import("./threePolygonDemo5Engine-J7VS_NUu.js"),__vite__mapDeps([6,1]));if(d)return;const S=I.createThreePolygonDemo5Engine(i,r);a.current=S;const N=()=>z(s,S,Math.min(1.2,window.devicePixelRatio||1));N(),S.reset(),window.requestAnimationFrame(()=>{d||a.current!==S||(N(),S.reset())}),M.current&&((L=S.start)==null||L.call(S)),w();const E=new ResizeObserver(()=>{N()});E.observe(s);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(A=>{for(const O of A)M.current=!!O.isIntersecting,M.current&&C.current?S.start():S.stop()},{threshold:.25}),_.observe(s)),l=()=>{_==null||_.disconnect(),E.disconnect(),S.destroy(),a.current=null}};return h=$(()=>{y().catch(()=>{w()})},{timeoutMs:300}),()=>{d=!0,h==null||h(),f.current!=null&&window.clearTimeout(f.current),l==null||l()}},[R,r,m.uniqueId,g]);const t=()=>{var s,i,d;(i=(s=a.current)==null?void 0:s.boost)==null||i.call(s),M.current&&((d=a.current)==null||d.start())},o=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),t())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${p+1}`,disabled:u,onKeyDown:u?void 0:o,onPointerDown:u?void 0:s=>{var i;if(!(s.button!=null&&s.button!==0)){v.current=s.pointerId,n.current=!1;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}M.current&&((i=a.current)==null||i.start()),f.current!=null&&window.clearTimeout(f.current),f.current=window.setTimeout(()=>{var d,l;v.current!=null&&(n.current=!0,(l=(d=a.current)==null?void 0:d.setHeld)==null||l.call(d,!0))},140)}},onPointerUp:u?void 0:s=>{var i,d;v.current!=null&&s.pointerId!==v.current||(f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,n.current?(n.current=!1,(d=(i=a.current)==null?void 0:i.setHeld)==null||d.call(i,!1)):t())},onPointerCancel:u?void 0:(()=>{var s,i;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,n.current=!1,(i=(s=a.current)==null?void 0:s.setHeld)==null||i.call(s,!1)}),onLostPointerCapture:u?void 0:(()=>{var s,i;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,n.current=!1,(i=(s=a.current)==null?void 0:s.setHeld)==null||i.call(s,!1)}),onMouseEnter:u?void 0:(()=>{var s;C.current=!0,M.current&&((s=a.current)==null||s.start())}),onMouseLeave:u?void 0:(()=>{var s,i,d,l;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,n.current=!1,(i=(s=a.current)==null?void 0:s.setHeld)==null||i.call(s,!1),C.current=!0,M.current?(d=a.current)==null||d.start():(l=a.current)==null||l.stop()}),onFocus:u?void 0:(()=>{var s;C.current=!0,M.current&&((s=a.current)==null||s.start())}),onBlur:u?void 0:(()=>{var s,i,d,l;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,n.current=!1,(i=(s=a.current)==null?void 0:s.setHeld)==null||i.call(s,!1),C.current=!0,M.current?(d=a.current)==null||d.start():(l=a.current)==null||l.stop()}),children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function Je({itemWrapper:m,index:p,activate:R,locked:u,onReady:g}){const x=c.useRef(null),k=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),M=c.useRef(!0),P=c.useRef(!1),v=c.useRef(0),f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=c.useMemo(()=>({reduceMotion:f,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[f]);c.useEffect(()=>{if(!R)return;const s=x.current,i=k.current;if(!s||!i)return;let d=!1,l=null,h=null,w=null;const y=()=>{P.current||(P.current=!0,g==null||g(m.uniqueId))},I=$(async()=>{var S,N;try{const E=await B(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(d)return;l=E.createOrbitCirclesEngine(i,n),a.current=l;const _=()=>z(s,l,window.devicePixelRatio||1);_(),l.reset(),(S=l.renderStatic)==null||S.call(l),M.current&&((N=l.start)==null||N.call(l)),y(),h=new ResizeObserver(()=>{var L;_(),(L=l.renderStatic)==null||L.call(l)}),h.observe(s),"IntersectionObserver"in window&&(w=new IntersectionObserver(L=>{for(const A of L)M.current=!!A.isIntersecting,M.current&&C.current?l.start():l.stop()},{threshold:.25}),w.observe(s))}catch{y()}});return()=>{d=!0,I==null||I(),w==null||w.disconnect(),h==null||h.disconnect(),l==null||l.destroy(),a.current=null}},[R,n,m.uniqueId,g]),c.useEffect(()=>{var i,d;const s=a.current;if(s){if(u){(i=s.stop)==null||i.call(s);return}M.current&&((d=s.start)==null||d.call(s))}},[u]);const e=()=>{var s;C.current=!0,M.current&&((s=a.current)==null||s.start())},r=()=>{var s,i,d,l;C.current=!0,M.current?(i=(s=a.current)==null?void 0:s.start)==null||i.call(s):(l=(d=a.current)==null?void 0:d.stop)==null||l.call(d)},t=()=>{var h,w,y;const s=a.current;if(!s)return;const i=Math.max(1,((h=s.getTotalCircles)==null?void 0:h.call(s))||1),d=v.current%i,l=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`;(w=s.setCircleColor)==null||w.call(s,d,l),v.current+=1,M.current&&((y=s.start)==null||y.call(s))},o=s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),t())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${p+1}`,disabled:u,onClick:u?void 0:t,onMouseEnter:u?void 0:e,onMouseLeave:u?void 0:r,onFocus:u?void 0:e,onBlur:u?void 0:r,onKeyDown:u?void 0:o,children:[b.jsx("canvas",{ref:k,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function Qe({readyId:m,locked:p,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),a=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=c.useMemo(()=>({seed:20250414,reduceMotion:a,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[a]);c.useEffect(()=>{const v=u.current,f=g.current;if(!v||!f)return;let n=!1,e=null,r=null,t=null;const o=()=>{k.current||(k.current=!0,R==null||R(m))},s=$(async()=>{var i,d;try{const l=await B(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(n)return;e=l.createTortuosityTraceEngine(f,C),x.current=e;const h=()=>z(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(i=e.renderStatic)==null||i.call(e),(d=e.start)==null||d.call(e),o(),r=new ResizeObserver(()=>{var w;h(),(w=e.reset)==null||w.call(e)}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(w=>{var y,I;for(const S of w)S.isIntersecting?(y=e.start)==null||y.call(e):(I=e.stop)==null||I.call(e)},{threshold:.25}),t.observe(v))}catch{o()}},{timeoutMs:200});return()=>{var i;n=!0,s==null||s(),t==null||t.disconnect(),r==null||r.disconnect(),(i=e==null?void 0:e.destroy)==null||i.call(e),x.current=null}},[C,R,m]),c.useEffect(()=>{var f,n,e;const v=x.current;if(v){if(p){(f=v.setHeld)==null||f.call(v,!1),(n=v.stop)==null||n.call(v);return}(e=v.start)==null||e.call(v)}},[p]),c.useEffect(()=>{var f,n;const v=x.current;if(v){if(p){(f=v.stop)==null||f.call(v);return}(n=v.start)==null||n.call(v)}},[p]);const M=()=>{var v,f,n,e;(f=(v=x.current)==null?void 0:v.reset)==null||f.call(v),(e=(n=x.current)==null?void 0:n.start)==null||e.call(n)},P=v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),M())};return b.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:p,onClick:p?void 0:M,onKeyDown:p?void 0:P,children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function We({readyId:m,locked:p,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),a=c.useRef(null),C=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=c.useMemo(()=>({seed:20250415,reduceMotion:C,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[C]);c.useEffect(()=>{const n=u.current,e=g.current;if(!n||!e)return;let r=!1,t=null,o=null,s=null;const i=()=>{k.current||(k.current=!0,R==null||R(m))},d=$(async()=>{var l,h;try{const w=await B(()=>import("./hexFlowBallsEngine-Bzfny-m0.js"),[]);if(r)return;t=w.createHexFlowBallsEngine(e,M),x.current=t;const y=()=>z(n,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),(h=t.start)==null||h.call(t),i(),o=new ResizeObserver(()=>{var I;y(),(I=t.renderStatic)==null||I.call(t)}),o.observe(n),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var S,N;for(const E of I)E.isIntersecting?(S=t.start)==null||S.call(t):(N=t.stop)==null||N.call(t)},{threshold:.25}),s.observe(n))}catch{i()}},{timeoutMs:220});return()=>{var l;r=!0,d==null||d(),s==null||s.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),x.current=null}},[M,R,m]),c.useEffect(()=>{var e,r,t;const n=x.current;if(n){if(p){(e=n.clearPointer)==null||e.call(n),(r=n.stop)==null||r.call(n);return}(t=n.start)==null||t.call(n)}},[p]);const P=n=>{const e=u.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:r.width>0?(n.clientX-r.left)/r.width:.5,y:r.height>0?(n.clientY-r.top)/r.height:.5}},v=()=>{var n,e,r,t;(e=(n=x.current)==null?void 0:n.burst)==null||e.call(n),(t=(r=x.current)==null?void 0:r.start)==null||t.call(r)},f=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),v())};return b.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:p,onClick:p?void 0:v,onPointerDown:p?void 0:(n=>{var r,t;a.current=n.pointerId;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}const e=P(n);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerMove:p?void 0:(n=>{var r,t;if(a.current!=null&&n.pointerId!==a.current)return;const e=P(n);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerUp:p?void 0:(n=>{a.current!=null&&n.pointerId!==a.current||(a.current=null)}),onPointerCancel:p?void 0:(()=>{var n,e;a.current=null,(e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onMouseMove:p?void 0:(n=>{var r,t;const e=P(n);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onMouseLeave:p?void 0:(()=>{var n,e;a.current=null,(e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onBlur:p?void 0:(()=>{var n,e;a.current=null,(e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onKeyDown:p?void 0:f,children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function et({readyId:m,locked:p,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),a=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=c.useMemo(()=>({seed:20250416,reduceMotion:a,step:6,side:5}),[a]);c.useEffect(()=>{const f=u.current,n=g.current;if(!f||!n)return;let e=!1,r=null,t=null,o=null;const s=()=>{k.current||(k.current=!0,R==null||R(m))},i=$(async()=>{var d,l;try{const h=await B(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;r=h.createPixelPlopEngine(n,C),x.current=r;const w=()=>z(f,r,Math.min(1.5,window.devicePixelRatio||1));w(),(d=r.renderStatic)==null||d.call(r),(l=r.start)==null||l.call(r),s(),t=new ResizeObserver(()=>{var y;w(),(y=r.reset)==null||y.call(r)}),t.observe(f),"IntersectionObserver"in window&&(o=new IntersectionObserver(y=>{var I,S;for(const N of y)N.isIntersecting?(I=r.start)==null||I.call(r):(S=r.stop)==null||S.call(r)},{threshold:.25}),o.observe(f))}catch{s()}},{timeoutMs:220});return()=>{var d;e=!0,i==null||i(),o==null||o.disconnect(),t==null||t.disconnect(),(d=r==null?void 0:r.destroy)==null||d.call(r),x.current=null}},[C,R,m]),c.useEffect(()=>{var n,e,r;const f=x.current;if(f){if(p){(n=f.clearPointer)==null||n.call(f),(e=f.stop)==null||e.call(f);return}(r=f.start)==null||r.call(f)}},[p]),c.useEffect(()=>{var n,e;const f=x.current;if(f){if(p){(n=f.stop)==null||n.call(f);return}(e=f.start)==null||e.call(f)}},[p]);const M=()=>{var f,n,e,r;(n=(f=x.current)==null?void 0:f.seedBurst)==null||n.call(f),(r=(e=x.current)==null?void 0:e.start)==null||r.call(e)},P=f=>{var r,t,o,s;const n=g.current||u.current;if(!n||typeof(f==null?void 0:f.clientX)!="number"||typeof(f==null?void 0:f.clientY)!="number"){M();return}const e=n.getBoundingClientRect();(t=(r=x.current)==null?void 0:r.burstAt)==null||t.call(r,f.clientX-e.left,f.clientY-e.top),(s=(o=x.current)==null?void 0:o.start)==null||s.call(o)},v=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),M())};return b.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:p,onPointerDown:p?void 0:(f=>{f.button!=null&&f.button!==0||P(f)}),onKeyDown:p?void 0:v,children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function tt({readyId:m,locked:p,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),a=c.useRef(null),C=c.useRef(!1),M=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=c.useMemo(()=>({reduceMotion:M,seed:20250417}),[M]);c.useEffect(()=>{const e=u.current,r=g.current;if(!e||!r)return;let t=!1,o=null,s=null,i=null;const d=()=>{k.current||(k.current=!0,R==null||R(m))},l=$(async()=>{var h,w;try{const y=await B(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(t)return;o=y.createJuliaLinesEngine(r,P),x.current=o;const I=()=>z(e,o,Math.min(1.5,window.devicePixelRatio||1));I(),(h=o.renderStatic)==null||h.call(o),(w=o.start)==null||w.call(o),d(),s=new ResizeObserver(()=>{I()}),s.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(S=>{var N,E;for(const _ of S)_.isIntersecting?(N=o.start)==null||N.call(o):(E=o.stop)==null||E.call(o)},{threshold:.25}),i.observe(e))}catch{d()}},{timeoutMs:220});return()=>{var h;t=!0,l==null||l(),i==null||i.disconnect(),s==null||s.disconnect(),(h=o==null?void 0:o.destroy)==null||h.call(o),x.current=null}},[P,R,m]),c.useEffect(()=>{var r,t,o,s;const e=x.current;if(e){if(p){(r=e.setHeld)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(o=e.stop)==null||o.call(e);return}(s=e.start)==null||s.call(e)}},[p]),c.useEffect(()=>{var r,t,o;const e=x.current;if(e){if(p){(r=e.clearPointer)==null||r.call(e),(t=e.stop)==null||t.call(e);return}(o=e.start)==null||o.call(e)}},[p]);const v=e=>{const r=u.current;if(!r)return{x:.4,y:.5};const t=r.getBoundingClientRect(),o=(e.clientX-t.left)/Math.max(1,t.width),s=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,o)),y:Math.max(0,Math.min(1,s))}},f=()=>{var e,r,t,o;(r=(e=x.current)==null?void 0:e.reset)==null||r.call(e),(o=(t=x.current)==null?void 0:t.start)==null||o.call(t)},n=e=>{var t,o,s,i,d,l,h,w;const r=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(o=(t=x.current)==null?void 0:t.nudge)==null||o.call(t,0,-r)):e.key==="ArrowDown"?(e.preventDefault(),(i=(s=x.current)==null?void 0:s.nudge)==null||i.call(s,0,r)):e.key==="ArrowLeft"?(e.preventDefault(),(l=(d=x.current)==null?void 0:d.nudge)==null||l.call(d,-r,0)):e.key==="ArrowRight"?(e.preventDefault(),(w=(h=x.current)==null?void 0:h.nudge)==null||w.call(h,r,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),f())};return b.jsxs("div",{ref:u,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:p?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:p?void 0:e=>{var o,s;const r=u.current;if(!r)return;C.current=!0,a.current=e.pointerId;try{r.setPointerCapture(e.pointerId)}catch{}const t=v(e);(s=(o=x.current)==null?void 0:o.setPointer)==null||s.call(o,t.x,t.y)},onPointerMove:p?void 0:e=>{var t,o;if(C.current&&a.current!=null&&e.pointerId!==a.current)return;const r=v(e);(o=(t=x.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)},onPointerUp:p?void 0:e=>{var r,t;a.current!=null&&e.pointerId!==a.current||(C.current=!1,a.current=null,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r))},onPointerCancel:p?void 0:()=>{var e,r;C.current=!1,a.current=null,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)},onMouseMove:p?void 0:e=>{var t,o;const r=v(e);(o=(t=x.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)},onMouseLeave:p?void 0:(()=>{var e,r;(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:p?void 0:(()=>{var e,r;(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:p?void 0:n,onClick:p?void 0:f,children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function rt({readyId:m,locked:p,onReady:R}){const[u,g]=c.useState(0),[x,k]=c.useState("mine"),[a,C]=c.useState(()=>new Set),[M,P]=c.useState(()=>new Set),[v,f]=c.useState("playing"),[n,e]=c.useState(null),[r,t]=c.useState(0),o=c.useMemo(()=>Ee(),[u]);c.useEffect(()=>{R==null||R(m)},[R,m]),c.useEffect(()=>{k("mine"),C(new Set),P(new Set),f("playing"),e(null),t(0)},[u]),c.useEffect(()=>{if(n==null||v!=="playing")return;const w=()=>{t(Math.min(5999,Math.floor((Date.now()-n)/1e3)))};w();const y=window.setInterval(w,1e3);return()=>{window.clearInterval(y)}},[n,v]);const s=()=>{g(w=>w+1)},i=w=>{if(p||v!=="playing")return;if(n==null&&e(Date.now()),x==="flag"){if(a.has(w))return;const I=new Set(M);I.has(w)?I.delete(w):I.add(w),P(I),de(o,a,I)&&f("won");return}if(M.has(w)||a.has(w))return;if(o.mines.has(w)){const I=new Set(a);for(const S of o.mines)I.add(S);I.add(w),C(I),f("lost");return}const y=_e(w,o,a,M);C(y),de(o,y,M)&&f("won")},d=o.mineCount-M.size,l=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`;let h="🤔";return v==="lost"?h="😣":v==="won"?h="😎":M.size>=o.mineCount?h="😕":M.size>=o.mineCount-1?h="🤓":M.size>=Math.round(o.mineCount*3/4)?h="😃":M.size>=Math.round(o.mineCount*2/3)?h="😊":M.size>=Math.round(o.mineCount/2)?h="🙂":M.size>=Math.round(o.mineCount/3)?h="😏":M.size>0&&(h="😐"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:b.jsxs("div",{className:"article-web-art-minesweeper",children:[b.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[b.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${x==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>k("mine"),disabled:p||v!=="playing","aria-pressed":x==="mine",children:"⛏"}),b.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${x==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>k("flag"),disabled:p||v!=="playing","aria-pressed":x==="flag",children:"🚩"})]}),b.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[o.counts.map((w,y)=>{const I=a.has(y),S=M.has(y),N=o.mines.has(y),E=v==="lost"&&N,_=w>0?Ne[w-1]:void 0;return b.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${I?"article-web-art-minesweeper-cell-revealed":""} ${E?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>i(y),disabled:p||v!=="playing","aria-label":`Minesweeper cell ${y+1}`,children:[S&&!I?b.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,E?b.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,I&&!N&&w>0?b.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:w}):null]},`mine-${u}-${y}`)}),v==="lost"?b.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:s,children:["Ooohhh 🙁",b.jsx("br",{}),"Click to try again"]}):null,v==="won"?b.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:s,children:["👌👀✔💯💯💯",b.jsx("br",{}),"Click to restart"]}):null]}),b.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[b.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[b.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:h}),b.jsx("span",{children:d})]}),b.jsx("div",{className:"article-web-art-minesweeper-timer",children:l})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function nt({readyId:m,locked:p,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),a=c.useRef(null),C=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=c.useMemo(()=>({reduceMotion:C}),[C]);c.useEffect(()=>{const n=u.current,e=g.current;if(!n||!e)return;let r=!1,t=null,o=null,s=null;const i=()=>{k.current||(k.current=!0,R==null||R(m))},d=$(async()=>{var l,h;try{const w=await B(()=>import("./fallingRingsEngine-CgfU8E0P.js"),[]);if(r)return;t=w.createFallingRingsEngine(e,M),x.current=t;const y=()=>z(n,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),(h=t.start)==null||h.call(t),i(),o=new ResizeObserver(()=>{y()}),o.observe(n),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var S,N;for(const E of I)E.isIntersecting?(S=t.start)==null||S.call(t):(N=t.stop)==null||N.call(t)},{threshold:.25}),s.observe(n))}catch{i()}},{timeoutMs:220});return()=>{var l;r=!0,d==null||d(),s==null||s.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),x.current=null}},[M,R,m]);const P=n=>{var e,r,t,o;(r=(e=x.current)==null?void 0:e.setHeld)==null||r.call(e,n),(o=(t=x.current)==null?void 0:t.start)==null||o.call(t)},v=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),P(!0))},f=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),P(!1))};return b.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:p,onPointerDown:p?void 0:n=>{a.current=n.pointerId;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}P(!0)},onPointerUp:p?void 0:n=>{a.current!=null&&n.pointerId!==a.current||(a.current=null,P(!1))},onPointerCancel:p?void 0:()=>{a.current=null,P(!1)},onLostPointerCapture:p?void 0:()=>{a.current=null,P(!1)},onMouseLeave:p?void 0:(()=>{a.current!=null&&P(!1)}),onBlur:p?void 0:(()=>{a.current=null,P(!1)}),onKeyDown:p?void 0:v,onKeyUp:p?void 0:f,children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function st({readyId:m,locked:p,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),a=c.useRef(null),C=c.useRef("mouse"),M=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=c.useMemo(()=>({reduceMotion:M,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[M]);c.useEffect(()=>{const f=u.current,n=g.current;if(!f||!n)return;let e=!1,r=null,t=null,o=null;const s=()=>{k.current||(k.current=!0,R==null||R(m))},i=$(async()=>{var d,l;try{const h=await B(()=>import("./prismFieldEngine-BQpxImA_.js"),__vite__mapDeps([7,1]));if(e)return;r=h.createPrismFieldEngine(n,P),x.current=r;const w=()=>z(f,r,Math.min(1.5,window.devicePixelRatio||1));w(),(d=r.renderStatic)==null||d.call(r),(l=r.start)==null||l.call(r),s(),t=new ResizeObserver(()=>{w()}),t.observe(f),"IntersectionObserver"in window&&(o=new IntersectionObserver(y=>{var I,S;for(const N of y)N.isIntersecting?(I=r.start)==null||I.call(r):(S=r.stop)==null||S.call(r)},{threshold:.25}),o.observe(f))}catch{s()}},{timeoutMs:220});return()=>{var d;e=!0,i==null||i(),o==null||o.disconnect(),t==null||t.disconnect(),(d=r==null?void 0:r.destroy)==null||d.call(r),x.current=null}},[P,R,m]);const v=f=>{const n=u.current;if(!n)return{x:.5,y:.5};const e=n.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(f.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(f.clientY-e.top)/Math.max(1,e.height)))}};return b.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:p,onClick:p?void 0:(()=>{var f,n,e,r;(n=(f=x.current)==null?void 0:f.reset)==null||n.call(f),(r=(e=x.current)==null?void 0:e.start)==null||r.call(e)}),onPointerDown:p?void 0:f=>{var e,r;a.current=f.pointerId,C.current=f.pointerType||"mouse";try{f.currentTarget.setPointerCapture(f.pointerId)}catch{}const n=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,n.x,n.y)},onPointerMove:p?void 0:f=>{var e,r;if(a.current!=null&&f.pointerId!==a.current)return;const n=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,n.x,n.y)},onPointerUp:p?void 0:f=>{var n,e;a.current!=null&&f.pointerId!==a.current||(a.current=null,(f.pointerType||C.current)==="mouse"&&((e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)))},onPointerCancel:p?void 0:(()=>{var f,n;a.current=null,C.current==="mouse"&&((n=(f=x.current)==null?void 0:f.clearPointer)==null||n.call(f))}),onMouseMove:p?void 0:f=>{var e,r;const n=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,n.x,n.y)},onMouseLeave:p?void 0:(()=>{var f,n;a.current=null,(n=(f=x.current)==null?void 0:f.clearPointer)==null||n.call(f)}),onBlur:p?void 0:(()=>{var f,n;a.current=null,C.current="mouse",(n=(f=x.current)==null?void 0:f.clearPointer)==null||n.call(f)}),onKeyDown:p?void 0:(f=>{var n,e,r,t;(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),(e=(n=x.current)==null?void 0:n.reset)==null||e.call(n),(t=(r=x.current)==null?void 0:r.start)==null||t.call(r))}),children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function it({readyId:m,locked:p,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),a=c.useRef(null),C=c.useRef(null),M=c.useRef(!1),P=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=c.useMemo(()=>({reduceMotion:P}),[P]);c.useEffect(()=>{const e=u.current,r=g.current;if(!e||!r)return;let t=!1,o=null,s=null,i=null;const d=()=>{k.current||(k.current=!0,R==null||R(m))},l=$(async()=>{var h,w;try{const y=await B(()=>import("./ropeLightEngine-ZZGO6u7c.js"),[]);if(t)return;o=y.createRopeLightEngine(r,v),x.current=o;const I=()=>z(e,o,Math.min(1.5,window.devicePixelRatio||1));I(),(h=o.renderStatic)==null||h.call(o),(w=o.start)==null||w.call(o),d(),s=new ResizeObserver(()=>{I()}),s.observe(e),"IntersectionObserver"in window&&(i=new IntersectionObserver(S=>{var N,E;for(const _ of S)_.isIntersecting?(N=o.start)==null||N.call(o):(E=o.stop)==null||E.call(o)},{threshold:.25}),i.observe(e))}catch{d()}},{timeoutMs:220});return()=>{var h;t=!0,l==null||l(),i==null||i.disconnect(),s==null||s.disconnect(),(h=o==null?void 0:o.destroy)==null||h.call(o),x.current=null}},[v,R,m]);const f=e=>{const r=u.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}},n=e=>{var t,o,s,i;if(M.current){M.current=!1;return}const r=e?f(e):{x:.5,y:.18};(o=(t=x.current)==null?void 0:t.toggleHangAt)==null||o.call(t,r.x,r.y),(i=(s=x.current)==null?void 0:s.start)==null||i.call(s)};return b.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:p,onClick:p?void 0:n,onPointerDown:p?void 0:e=>{var r,t;a.current=e.pointerId,M.current=!1,C.current=f(e);try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,C.current.x,C.current.y)},onPointerMove:p?void 0:e=>{var o,s;if(a.current!=null&&e.pointerId!==a.current)return;const r=f(e),t=C.current;t&&Math.hypot(r.x-t.x,r.y-t.y)>.025&&(M.current=!0),(s=(o=x.current)==null?void 0:o.setPointer)==null||s.call(o,r.x,r.y)},onPointerUp:p?void 0:e=>{var r,t;if(!(a.current!=null&&e.pointerId!==a.current)){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}a.current=null,C.current=null,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r)}},onPointerCancel:p?void 0:(e=>{var r,t;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}a.current=null,C.current=null,M.current=!1,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r)}),onMouseMove:p?void 0:e=>{var t,o;const r=f(e);(o=(t=x.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)},onMouseLeave:p?void 0:(()=>{var e,r;a.current=null,C.current=null,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:p?void 0:(()=>{var e,r;a.current=null,C.current=null,M.current=!1,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:p?void 0:(e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),n())}),children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}const ot=["rotateX(270deg) translateZ(0.5em)","rotateY(0deg) translateZ(0.5em)","rotateY(90deg) translateZ(0.5em)","rotateY(180deg) translateZ(0.5em)","rotateY(270deg) translateZ(0.5em)","rotateX(90deg) translateZ(0.5em)"],be=Array.from({length:28},(m,p)=>p);function at(){return b.jsx("div",{className:"article-web-art-soup-backdrop","aria-hidden":!0,children:be.map(m=>b.jsx("div",{className:"article-web-art-soup-cube",style:{animationDelay:`${m*.06}s`,fontSize:`${m+1}em`,"--soup-cube-depth":`${m/Math.max(1,be.length-1)}`},children:ot.map((p,R)=>b.jsx("span",{className:"article-web-art-soup-face",style:{transform:p}},R))},m))})}function ct({readyId:m,locked:p,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),a=c.useRef(null),C=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),M=c.useMemo(()=>({reduceMotion:C}),[C]);c.useEffect(()=>{const v=u.current,f=g.current;if(!v||!f)return;let n=!1,e=null,r=null,t=null;const o=()=>{k.current||(k.current=!0,R==null||R(m))},s=$(async()=>{var i,d;try{const l=await B(()=>import("./soupShaderEngine-BVaccG7j.js"),__vite__mapDeps([8,1]));if(n)return;e=l.createSoupShaderEngine(f,M),x.current=e;const h=()=>z(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(i=e.renderStatic)==null||i.call(e),(d=e.start)==null||d.call(e),o(),r=new ResizeObserver(()=>{h()}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(w=>{var y,I;for(const S of w)S.isIntersecting?(y=e.start)==null||y.call(e):(I=e.stop)==null||I.call(e)},{threshold:.25}),t.observe(v))}catch{o()}},{timeoutMs:220});return()=>{var i;n=!0,s==null||s(),t==null||t.disconnect(),r==null||r.disconnect(),(i=e==null?void 0:e.destroy)==null||i.call(e),x.current=null}},[M,R,m]);const P=v=>{const f=u.current;if(!f)return{x:.5,y:.5};const n=f.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(v.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(v.clientY-n.top)/Math.max(1,n.height)))}};return b.jsxs("button",{type:"button",ref:u,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile","aria-label":"Soup shader web art tile",disabled:p,onPointerDown:p?void 0:v=>{var n,e,r,t;a.current=v.pointerId;try{v.currentTarget.setPointerCapture(v.pointerId)}catch{}const f=P(v);(e=(n=x.current)==null?void 0:n.setPointer)==null||e.call(n,f.x,f.y),(t=(r=x.current)==null?void 0:r.setHeld)==null||t.call(r,!0)},onPointerMove:p?void 0:v=>{var n,e;if(a.current!=null&&v.pointerId!==a.current)return;const f=P(v);(e=(n=x.current)==null?void 0:n.setPointer)==null||e.call(n,f.x,f.y)},onPointerUp:p?void 0:v=>{var f,n;a.current!=null&&v.pointerId!==a.current||(a.current=null,(n=(f=x.current)==null?void 0:f.setHeld)==null||n.call(f,!1))},onPointerCancel:p?void 0:(()=>{var v,f;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1)}),onMouseMove:p?void 0:v=>{var n,e;const f=P(v);(e=(n=x.current)==null?void 0:n.setPointer)==null||e.call(n,f.x,f.y)},onMouseLeave:p?void 0:(()=>{var v,f,n,e;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)}),onBlur:p?void 0:(()=>{var v,f,n,e;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(n=x.current)==null?void 0:n.clearPointer)==null||e.call(n)}),children:[b.jsx(at,{}),b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function lt({readyId:m,locked:p,onReady:R}){const u=c.useRef(null),g=c.useRef(null),x=c.useRef(null),k=c.useRef(!1),a=c.useRef(null),C=c.useRef(null),M=c.useRef(0),[P,v]=c.useState(!1),[f,n]=c.useState([]),e=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=c.useMemo(()=>({reduceMotion:e}),[e]);c.useEffect(()=>{const i=u.current,d=g.current;if(!i||!d)return;let l=!1,h=null,w=null,y=null;const I=()=>{k.current||(k.current=!0,R==null||R(m))},S=$(async()=>{var N,E;try{const _=await B(()=>import("./tardisWormholeEngine-Czkyopnk.js"),__vite__mapDeps([9,1]));if(l)return;h=_.createTardisWormholeEngine(d,r),x.current=h;const L=()=>z(i,h,Math.min(1.5,window.devicePixelRatio||1));L(),(N=h.renderStatic)==null||N.call(h),(E=h.start)==null||E.call(h),I(),w=new ResizeObserver(()=>{L()}),w.observe(i),"IntersectionObserver"in window&&(y=new IntersectionObserver(A=>{var O,K;for(const Y of A)Y.isIntersecting?(O=h.start)==null||O.call(h):(K=h.stop)==null||K.call(h)},{threshold:.25}),y.observe(i))}catch{I()}},{timeoutMs:220});return()=>{var N;l=!0,S==null||S(),y==null||y.disconnect(),w==null||w.disconnect(),(N=h==null?void 0:h.destroy)==null||N.call(h),x.current=null}},[r,R,m]),c.useEffect(()=>{if(f.length===0)return;const i=window.setTimeout(()=>{n(d=>d.slice(1))},1e3);return()=>{window.clearTimeout(i)}},[f]),c.useEffect(()=>{var d,l,h;const i=x.current;if(i){if(p){v(!1),C.current=null,(d=i.clearPointer)==null||d.call(i),(l=i.stop)==null||l.call(i);return}(h=i.start)==null||h.call(i)}},[p]);const t=i=>{const d=u.current,l=g.current||d;if(!d||!l)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const h=l.getBoundingClientRect(),w=d.getBoundingClientRect(),y=Math.max(0,Math.min(w.width,i.clientX-w.left)),I=Math.max(0,Math.min(w.height,i.clientY-w.top)),S=Math.max(0,Math.min(h.width,i.clientX-h.left)),N=Math.max(0,Math.min(h.height,i.clientY-h.top)),E=C.current,_=E?S-E.px:0,L=E?N-E.py:0;return C.current={px:S,py:N},{x:h.width>0?S/h.width:.5,y:h.height>0?N/h.height:.5,px:y,py:I,dx:_,dy:L}},o=(i,d)=>{const l=M.current++;n(h=>[...h,{id:l,x:i,y:d}])},s=i=>{var l,h,w,y;const d=t(i);o(d.px,d.py),(h=(l=x.current)==null?void 0:l.boost)==null||h.call(l),(y=(w=x.current)==null?void 0:w.start)==null||y.call(w),v(!0),window.setTimeout(()=>{v(!1)},650)};return b.jsxs("button",{type:"button",ref:u,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${P?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:p,onClick:p?void 0:s,onContextMenu:p?void 0:(i=>{var l,h,w,y;i.preventDefault();const d=t(i);o(d.px,d.py),(h=(l=x.current)==null?void 0:l.reverseBurst)==null||h.call(l),(y=(w=x.current)==null?void 0:w.start)==null||y.call(w)}),onWheel:p?void 0:(i=>{var d,l;(l=(d=x.current)==null?void 0:d.addScrollBoost)==null||l.call(d,i.deltaY*.003)}),onPointerDown:p?void 0:i=>{var l,h;a.current=i.pointerId;try{i.currentTarget.setPointerCapture(i.pointerId)}catch{}const d=t(i);(h=(l=x.current)==null?void 0:l.setPointer)==null||h.call(l,d.x,d.y,d.dx,d.dy)},onPointerMove:p?void 0:i=>{var l,h,w,y;if(a.current!=null&&i.pointerId!==a.current)return;const d=t(i);(h=(l=x.current)==null?void 0:l.setPointer)==null||h.call(l,d.x,d.y,d.dx,d.dy),(i.buttons&1)===1&&((y=(w=x.current)==null?void 0:w.drag)==null||y.call(w,d.dx))},onPointerUp:p?void 0:i=>{a.current!=null&&i.pointerId!==a.current||(a.current=null)},onPointerCancel:p?void 0:(()=>{a.current=null}),onMouseMove:p?void 0:i=>{var l,h;const d=t(i);(h=(l=x.current)==null?void 0:l.setPointer)==null||h.call(l,d.x,d.y,d.dx,d.dy)},onMouseLeave:p?void 0:(()=>{var i,d;a.current=null,C.current=null,(d=(i=x.current)==null?void 0:i.clearPointer)==null||d.call(i)}),onBlur:p?void 0:(()=>{var i,d;a.current=null,C.current=null,(d=(i=x.current)==null?void 0:i.clearPointer)==null||d.call(i)}),onKeyDown:p?void 0:(i=>{var d,l,h,w;(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),(l=(d=x.current)==null?void 0:d.boost)==null||l.call(d),(w=(h=x.current)==null?void 0:h.start)==null||w.call(h))}),children:[b.jsx("canvas",{ref:g,className:"article-web-art-canvas"}),b.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),f.map(i=>b.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${i.x}px`,top:`${i.y}px`},"aria-hidden":!0},i.id)),b.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function ut({label:m,clickLabel:p,previewRequested:R=!1}){const u=pe(),g=c.useRef(null),[x,k]=c.useState(!1),[a,C]=c.useState(0),M=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),P=c.useCallback(()=>{C(Date.now()),k(!0)},[]),v=c.useCallback(()=>{u.navigateToSectionWithId("contact")},[u]),f=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),P())},n=c.useMemo(()=>x?Te({seed:`${a||Date.now()}:${m}`,reduceMotion:M}):"",[m,x,a,M]);return c.useEffect(()=>{let e=0,r=0;return R?(e=window.requestAnimationFrame(()=>{r=window.requestAnimationFrame(()=>{C(Date.now()),k(!0)})}),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)}):(k(!1),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)})},[R]),b.jsxs("div",{ref:g,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${x?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":x?"Kontakt preview":m,"aria-pressed":x,onClick:P,onKeyDown:f,children:[b.jsxs("div",{className:`article-web-art-tile-cta-preview ${x?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[x&&b.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:n,sandbox:"allow-scripts"},`${a}-${m}`),b.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!x&&b.jsx("div",{className:`loader ${M?"loader-reduce-motion":""}`,"aria-hidden":!0,children:b.jsxs("div",{className:"loader-inner",children:[b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})})]})}),b.jsxs("div",{className:`article-web-art-tile-cta-content ${x?"article-web-art-tile-cta-content-hidden":""}`,children:[b.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:m}),b.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:p})]}),x&&b.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),v()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),v())},children:"Kontakt"})]})}function dt({locked:m=!1}){const p=c.useRef(null),R=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),u=c.useRef(!1),g=c.useRef(0),x=c.useRef(null),k=c.useRef(null),a=c.useRef(1),C=c.useRef(null),M=c.useRef(null),P=c.useRef(null);return c.useEffect(()=>{const v=p.current;if(!v)return;const f=w=>{const y=Math.max(0,Math.min(1,w));return y*y*(3-2*y)},n=()=>{const w=v.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),y=[];for(const I of w){const S=I.getAnimations?I.getAnimations():[];for(const N of S)y.push(N)}return y},e=w=>{const y=Math.max(1,Math.min(5.2,Number(w)||1));a.current=y;const I=n();for(const S of I)S.playbackRate=y},r=()=>{M.current!=null&&cancelAnimationFrame(M.current),P.current!=null&&window.clearTimeout(P.current),M.current=null,P.current=null},t=()=>{r(),e(5.2),P.current=window.setTimeout(()=>{const w=a.current,y=performance.now(),I=320,S=()=>{const N=(performance.now()-y)/I,E=f(N);e(w+(1-w)*E),N<1?M.current=requestAnimationFrame(S):M.current=null};M.current=requestAnimationFrame(S),P.current=null},2e3)},o=()=>{u.current=!1,x.current=null,v.classList.remove("article-web-art-tile-goldfish-held"),k.current!=null&&cancelAnimationFrame(k.current),k.current=null;const w=a.current,y=360,I=performance.now();C.current!=null&&cancelAnimationFrame(C.current);const S=()=>{const N=(performance.now()-I)/y,E=f(N);e(w+(1-w)*E),N<1?C.current=requestAnimationFrame(S):C.current=null};C.current=requestAnimationFrame(S)},s=()=>{if(!u.current)return;const w=performance.now()-g.current,y=1.2+4*f(w/2400);e(y),k.current=requestAnimationFrame(s)},i=w=>{if(!(R||m)&&!(w.button!=null&&w.button!==0)){r(),u.current=!0,g.current=performance.now(),x.current=w.pointerId,v.classList.add("article-web-art-tile-goldfish-held");try{v.setPointerCapture(w.pointerId)}catch{}C.current!=null&&(cancelAnimationFrame(C.current),C.current=null),k.current==null&&(k.current=requestAnimationFrame(s))}},d=()=>{const w=performance.now()-g.current;o(),w<220&&t()},l=()=>{o()},h=()=>{o()};return v.addEventListener("pointerdown",i),v.addEventListener("pointerup",d),v.addEventListener("pointercancel",l),v.addEventListener("lostpointercapture",h),()=>{v.removeEventListener("pointerdown",i),v.removeEventListener("pointerup",d),v.removeEventListener("pointercancel",l),v.removeEventListener("lostpointercapture",h),o(),r(),C.current!=null&&cancelAnimationFrame(C.current),C.current=null}},[m,R]),c.useEffect(()=>{const v=p.current;v&&v.classList.toggle("article-web-art-tile-goldfish-locked",m)},[m]),b.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:p,role:"img","aria-label":"Goldfish animation tile",children:[b.jsx("div",{className:"fish-stage",children:b.jsx("div",{className:"fish-wrapper",children:b.jsx("div",{className:"fish-container",children:b.jsxs("div",{className:"fish-parts",children:[b.jsx("div",{className:"fish-body front"}),b.jsx("div",{className:"fish-body back"}),b.jsx("div",{className:"fish-back-bottom-fin front"}),b.jsx("div",{className:"fish-back-bottom-fin back"}),b.jsx("div",{className:"fish-back-fin"}),b.jsx("div",{className:"fish-front-bottom-fin front"}),b.jsx("div",{className:"fish-front-bottom-fin back"}),b.jsx("div",{className:"fish-top-fin"})]})})})}),b.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function ft({locked:m=!1}){const p=c.useRef(null),R=c.useRef([]),u=c.useRef(0),g=c.useRef(0),x=je,k=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return c.useEffect(()=>{const a=p.current;if(!a)return;const C=R.current.filter(Boolean);if(!C.length)return;let M=!0,P=!1,v=null,f=null;const n=(w,y)=>{const I=(w-.5)*30;for(let S=0;S<C.length;S++){const N=C[S],E=S*18,_=S*8,L=(w-.5)*E,A=(y-.5)*_;N.style.transform=`translate3d(${L}px, ${A}px, 0) rotateY(${I}deg)`}},e=(w,y)=>{const I=Math.max(-.55,Math.min(.55,(w-.5)*1.1)),S=Math.max(-.35,Math.min(.35,(y-.5)*.7));n(.5+I,.5+S)},r=w=>{const y=a.getBoundingClientRect(),I=(w.clientX-y.left)/Math.max(1,y.width),S=(w.clientY-y.top)/Math.max(1,y.height);M=!0,g.current=performance.now()+650,e(Math.max(0,Math.min(1,I)),Math.max(0,Math.min(1,S)))},t=w=>{const y=a.getBoundingClientRect(),I=(w.clientX-y.left)/Math.max(1,y.width),S=(w.clientY-y.top)/Math.max(1,y.height);return{x:Math.max(0,Math.min(1,I)),y:Math.max(0,Math.min(1,S))}},o=w=>{if(w.pointerType==="mouse")return;P=!0,v=w.pointerId,M=!0,g.current=performance.now()+900;const y=t(w);e(y.x,y.y),!k&&f==null&&(f=requestAnimationFrame(h))},s=w=>{if(!P||v!=null&&w.pointerId!==v)return;M=!0,g.current=performance.now()+900;const y=t(w);e(y.x,y.y)},i=w=>{v!=null&&(w==null?void 0:w.pointerId)!=null&&w.pointerId!==v||(P=!1,v=null,M=!0,!k&&f==null&&(f=requestAnimationFrame(h)))},d=()=>{M=!0,!k&&f==null&&(f=requestAnimationFrame(h))},l=()=>{M=!0,!k&&f==null&&(f=requestAnimationFrame(h))},h=()=>{if(M){if(!k&&performance.now()>=g.current){u.current+=.008;const w=Math.sin(u.current)*.5+.5;e(w,.5)}f=requestAnimationFrame(h)}};return M=!m,a.addEventListener("mouseenter",d),a.addEventListener("mousemove",r),a.addEventListener("mouseleave",l),a.addEventListener("pointerdown",o),a.addEventListener("pointermove",s),a.addEventListener("pointerup",i),a.addEventListener("pointercancel",i),e(.5,.5),!k&&!m&&(f=requestAnimationFrame(h)),()=>{a.removeEventListener("mouseenter",d),a.removeEventListener("mousemove",r),a.removeEventListener("mouseleave",l),a.removeEventListener("pointerdown",o),a.removeEventListener("pointermove",s),a.removeEventListener("pointerup",i),a.removeEventListener("pointercancel",i),f!=null&&cancelAnimationFrame(f)}},[k]),b.jsxs("div",{ref:p,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[b.jsxs("div",{className:"patronus-card",children:[b.jsx("div",{className:"patronus-layer patronus-bg",ref:a=>{R.current[0]=a},children:b.jsx("img",{alt:"",src:x[0]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[1]=a},children:b.jsx("img",{alt:"",src:x[1]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[2]=a},children:b.jsx("img",{alt:"",src:x[2]})}),b.jsx("div",{className:"patronus-layer patronus-svg",ref:a=>{R.current[3]=a},dangerouslySetInnerHTML:{__html:Ce}}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[4]=a},children:b.jsx("img",{alt:"",src:x[3]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[5]=a},children:b.jsx("img",{alt:"",src:x[4]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[6]=a},children:b.jsx("img",{alt:"",src:x[5]})})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{vt as default};
