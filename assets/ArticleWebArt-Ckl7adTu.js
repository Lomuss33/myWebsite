const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/androidBackgroundEngine-BgHFFw8C.js","assets/three-Cmtw-h9o.js","assets/hourglassEngine-Dxe9DVtS.js","assets/vendor-BUjjXRU6.js","assets/react-vendor-D1LkQUJD.js","assets/threeTunnelEngine-BFDBX4Fw.js","assets/threePolygonDemo5Engine-CF_GI828.js","assets/prismFieldEngine-C_dFOJLi.js","assets/soupShaderEngine-Bv-83sLo.js","assets/tardisWormholeEngine-BwhuWVx_.js"])))=>i.map(i=>d[i]);
import{c as Re,g as me,A as ce,_ as B}from"./index-CploEf41.js";import{r as c,j as b}from"./react-vendor-D1LkQUJD.js";import"./swiper-BJPGAhIX.js";/* empty css              */import"./bootstrap-jfx39s8c.js";import"./vendor-BUjjXRU6.js";const Ce=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`;function $(w,{timeoutMs:m=1200}={}){if(typeof window>"u")return w(),()=>{};if("requestIdleCallback"in window){const d=window.requestIdleCallback(()=>w(),{timeout:m});return()=>window.cancelIdleCallback(d)}const M=window.setTimeout(()=>w(),0);return()=>window.clearTimeout(M)}function le(w){var a,C,g,k;if(!w)return{width:1,height:1};const m=w.getBoundingClientRect(),M=(C=(a=w.parentElement)==null?void 0:a.getBoundingClientRect)==null?void 0:C.call(a),d=(M==null?void 0:M.width)||((g=w.parentElement)==null?void 0:g.clientWidth)||1,R=(M==null?void 0:M.height)||((k=w.parentElement)==null?void 0:k.clientHeight)||d,x=Math.max(1,Math.round(m.width||w.clientWidth||d)),P=Math.max(1,Math.round(m.height||w.clientHeight||R));return{width:x,height:P}}function z(w,m,M=1){var a,C,g;const{width:d,height:R}=le(w),x=typeof window<"u"&&((C=(a=window.matchMedia)==null?void 0:a.call(window,"(pointer: coarse)"))==null?void 0:C.matches),P=Math.min(x?1:1.5,Math.max(1,Number(M)||1));if((d<32||R<32)&&typeof window<"u"){window.requestAnimationFrame(()=>{var v;const k=le(w);k.width>=32&&k.height>=32&&((v=m==null?void 0:m.setSize)==null||v.call(m,k.width,k.height,P))});return}(g=m==null?void 0:m.setSize)==null||g.call(m,d,R,P)}function ue(w,m,M="smooth"){if(typeof window>"u")return;const d=document.getElementById(w),R=document.getElementById(`scrollable-${m}`);if(!d||!R)return;const x=d.getBoundingClientRect(),P=R.getBoundingClientRect(),a=R.scrollTop+(x.top-P.top);R.scrollTo({top:Math.max(0,a),behavior:M})}const ke=9,Se=9,Ie=10,Ne=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],je=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function Ee(w=ke,m=Se,M=Ie){const d=w*m,R=Math.max(1,Math.min(M,d-1)),x=new Set;for(;x.size<R;)x.add(Math.floor(Math.random()*d));const P=new Array(d).fill(0);for(let a=0;a<d;a++){if(x.has(a)){P[a]=-1;continue}const C=a%m,g=Math.floor(a/m);let k=0;for(let v=-1;v<=1;v++)for(let f=-1;f<=1;f++){if(f===0&&v===0)continue;const i=C+f,e=g+v;i<0||e<0||i>=m||e>=w||x.has(e*m+i)&&(k+=1)}P[a]=k}return{rows:w,cols:m,mineCount:R,mines:x,counts:P}}function _e(w,m,M,d){const R=new Set(M),x=[w];for(;x.length>0;){const P=x.pop();if(P==null||R.has(P)||d.has(P)||m.mines.has(P)||(R.add(P),m.counts[P]!==0))continue;const a=P%m.cols,C=Math.floor(P/m.cols);for(let g=-1;g<=1;g++)for(let k=-1;k<=1;k++){if(k===0&&g===0)continue;const v=a+k,f=C+g;v<0||f<0||v>=m.cols||f>=m.rows||x.push(f*m.cols+v)}}return R}function de(w,m,M){const d=w.rows*w.cols-w.mineCount;if(m.size>=d)return!0;if(M.size!==w.mineCount)return!1;for(const R of w.mines)if(!M.has(R))return!1;return!0}function Le(w){return`Web art ${String(w||"tile").toLowerCase()} tile loading`}function Te({seed:w,reduceMotion:m}){const M=JSON.stringify(Pe.split("<\/script>").join("<\\/script>")),d=JSON.stringify(w);return`<!doctype html>
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
    reduceMotion: ${m?"true":"false"},
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
</html>`}function fe(w){return Array.isArray(w)?w.map((m,M)=>{const d=m!=null&&m.tone?` article-web-art-intro-guide-fragment-${m.tone}`:"";return b.jsx("span",{className:`article-web-art-intro-guide-fragment${d}`,children:m==null?void 0:m.text},`${(m==null?void 0:m.text)||"fragment"}-${M}`)}):w}function xt({dataWrapper:w,id:m}){var oe;const M=Re(),d=me(),R=`${w.uniqueId}-ambient-trace`,x=`${w.uniqueId}-ambient-hex`,P=`${w.uniqueId}-ambient-plop`,a=`${w.uniqueId}-ambient-julia`,C=`${w.uniqueId}-ambient-mines`,g=`${w.uniqueId}-ambient-rings`,k=`${w.uniqueId}-ambient-prism`,v=`${w.uniqueId}-ambient-rope`,f=`${w.uniqueId}-ambient-soup`,i=`${w.uniqueId}-ambient-tardis`,[e,r]=c.useState(null),[t,o]=c.useState(!0),n=c.useMemo(()=>w.orderedItems,[w.orderedItems]),s=c.useMemo(()=>{const N=[4,5,3,6,1,2,7,8,9,10,11,12,13,14],D=new Map(n.map(H=>[Number(H==null?void 0:H.id),H])),T=[];for(const H of N){const q=D.get(H);q&&T.push(q)}for(const H of n){if(!H)continue;const q=Number(H==null?void 0:H.id);N.includes(q)||T.push(H)}return T},[n]),u=c.useRef(null),[l,h]=c.useState(!1),p=c.useRef(new Set),y=c.useRef(new Map),[S,I]=c.useState(0),[j,E]=c.useState(-1),[_,L]=c.useState(()=>new Set),[A,O]=c.useState(()=>new Set),[K,Y]=c.useState(!1),V=c.useMemo(()=>{const N=s.map(D=>D==null?void 0:D.uniqueId).filter(Boolean);return N.push(R,x,P,a,C,k,g,v,f,i,"ambient-goldfish","ambient-patronus"),new Set(N)},[x,a,C,P,k,g,v,f,i,R,s]),U=c.useMemo(()=>Array.from(A).filter(N=>N!=="ambient-goldfish"&&N!=="ambient-patronus"),[A]),F=t,Z=M.selectedLanguageId||"en";let J=M.getString("send_yours");typeof J=="string"&&J.startsWith("locale:")&&(J={en:"Send yours!",de:"Sende deine!",hr:"PoÅ¡alji svoju!",tr:"Sen de gÃ¶nder!"}[Z]||"Send yours!");let Q=M.getString("click");typeof Q=="string"&&Q.startsWith("locale:")&&(Q={en:"Click",de:"Klicken",hr:"Klikni",tr:"TÄ±kla"}[Z]||"Click");const re={en:{title:"Doors of the world behind an amazing art gallery.",guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",guide:{eyebrow:"So funktioniert es",lines:["Betritt die Galerie und schau dir die Karten in Ruhe an.","Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.","Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."]},button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",guide:{eyebrow:"Kako istraživati",lines:["Uđi u galeriju i istražuj kartice svojim tempom.","Klikni, dodirni ili pritisni karticu da otkriješ što skriva.","Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme."]},button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",guide:{eyebrow:"Nasıl gezilir",lines:["Galeriye girin ve kartları kendi temponuzda inceleyin.","İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.","Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir."]},button:"Gir",preparing:"Hazırlanıyor..."}}[Z]||{guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter"},pe="hide",G=c.useCallback(N=>{if(!N||p.current.has(N))return;p.current.add(N);const D=y.current.get(N);D!=null&&(window.clearTimeout(D),y.current.delete(N)),I(p.current.size)},[]),ne=c.useCallback(N=>{N&&O(D=>{if(D.has(N))return D;const T=new Set(D);return T.add(N),T})},[]),W=c.useCallback(()=>{for(const N of y.current.values())window.clearTimeout(N);y.current=new Map,p.current=new Set,I(0),E(-1),h(!1),L(new Set),O(new Set),Y(!1)},[]),ee=c.useCallback(()=>{O(new Set(V)),L(new Set(V)),Y(!0)},[V]),te=c.useCallback(({openAll:N=!1}={})=>{if(o(!1),h(!0),E(s.length-1),N){ee();return}L(new Set),O(new Set),Y(!1)},[s.length,ee]);c.useEffect(()=>{var ae;if(typeof window>"u"||((ae=d.targetSection)==null?void 0:ae.id)!==w.sectionId||d.transitionStatus!=="transition_status_none")return;const N=window.__pendingSectionAction;if(!N||N.action!=="enter"||N.sectionId!==w.sectionId||N.targetArticleId&&N.targetArticleId!==w.uniqueId)return;if(Date.now()-(N.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,te({openAll:!0});const D=N.targetArticleId||w.uniqueId;let T=null,H=null,q=null,X=null;return T=window.setTimeout(()=>{H=window.requestAnimationFrame(()=>{ue(D,w.sectionId),q=window.setTimeout(()=>{X=window.requestAnimationFrame(()=>{ue(D,w.sectionId)})},220)})},90),()=>{T!==null&&window.clearTimeout(T),H!==null&&window.cancelAnimationFrame(H),q!==null&&window.clearTimeout(q),X!==null&&window.cancelAnimationFrame(X)}},[w.uniqueId,w.sectionId,(oe=d.targetSection)==null?void 0:oe.id,d.transitionStatus,te]);const se=c.useCallback(N=>{N&&(ne(N),L(D=>{if(D.has(N))return D;const T=new Set(D);return T.add(N),T}))},[ne]),ie=c.useCallback(N=>{N&&(L(D=>{if(!D.has(N))return D;const T=new Set(D);return T.delete(N),T}),O(D=>{if(!D.has(N))return D;const T=new Set(D);return T.delete(N),T}))},[]),we=V.size>0&&_.size>=V.size,xe=c.useCallback(()=>{if(V.size>0&&_.size>=V.size){L(new Set),O(new Set),Y(!1);return}ee()},[V,ee,_.size]),ve=c.useCallback(()=>{W(),o(!0)},[W]),ye=(N,D)=>{const T=Number(N==null?void 0:N.id);return T===1?"Hover":T===2?"Wave":T===3?"3D":T===4?"Poly":T===5?"Click":T===6?"Orbit":T===7?"Spin":T===8?"Shape":T===9?"Hourglass":T===10?"Noice":T===11?"Distance":T===12?"Android":T===13?"Pulse":T===14?"Bars":String(D+1)},ge=s.map((N,D)=>{if(!l)return b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${D+1} loading`},N.uniqueId);const T=N.uniqueId,H=_.has(T),q=A.has(T)||H;return b.jsx(he,{label:ye(N,D),isOpen:H,onToggle:()=>{H?ie(T):se(T)},shouldRender:q,children:q&&b.jsx(Ae,{itemWrapper:N,index:D,locked:F||!H,activate:D<=j,onReady:G})},T)}),Me=l?[{key:"ambient-trace",tileId:R,label:"Trace",render:N=>b.jsx(Je,{readyId:R,locked:F||!N,onReady:G})},{key:"ambient-hex",tileId:x,label:"Hex",render:N=>b.jsx(Qe,{readyId:x,locked:F||!N,onReady:G})},{key:"ambient-plop",tileId:P,label:"Plop",render:N=>b.jsx(We,{readyId:P,locked:F||!N,onReady:G})},{key:"ambient-julia",tileId:a,label:"Julia",render:N=>b.jsx(et,{readyId:a,locked:F||!N,onReady:G})},{key:"ambient-mines",tileId:C,label:"Bomb",render:N=>b.jsx(tt,{readyId:C,locked:F||!N,onReady:G})},{key:"ambient-rings",tileId:g,label:"Fall",render:N=>b.jsx(rt,{readyId:g,locked:F||!N,onReady:G})},{key:"ambient-prism",tileId:k,label:"Prism",render:N=>b.jsx(nt,{readyId:k,locked:F||!N,onReady:G})},{key:"ambient-rope",tileId:v,label:"Rope",render:N=>b.jsx(st,{readyId:v,locked:F||!N,onReady:G})},{key:"ambient-soup",tileId:f,label:"Soup",render:N=>b.jsx(at,{readyId:f,locked:F||!N,onReady:G})},{key:"ambient-tardis",tileId:i,label:"Tardis",render:N=>b.jsx(ct,{readyId:i,locked:F||!N,onReady:G})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:N=>b.jsx(ut,{locked:F||!N})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:N=>b.jsx(dt,{locked:F||!N})}].map(({key:N,tileId:D,label:T,render:H})=>{const q=_.has(D),X=A.has(D)||q;return b.jsx(he,{label:T,isOpen:q,onToggle:()=>{q?ie(D):se(D)},shouldRender:X,children:X&&H(q)},N)}):[b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return c.useEffect(()=>{W()},[w.uniqueId,W]),c.useEffect(()=>{l&&E(s.length-1)},[l,s.length]),c.useEffect(()=>{if(l)for(const N of U){if(!N||p.current.has(N)||y.current.has(N))continue;const D=window.setTimeout(()=>{G(N)},12e3);y.current.set(N,D)}},[l,U,G]),b.jsx(ce,{id:w.uniqueId,type:ce.Types.SPACING_DEFAULT,dataWrapper:w,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:r,children:b.jsxs("div",{className:"article-web-art-shell",children:[b.jsx(De,{guide:re.guide,buttonLabel:t?re.button:pe,hidden:!t,onEnter:t?te:ve,secondaryButtonLabel:t?null:"promaja",onSecondaryAction:t?null:xe,secondaryPressed:we}),b.jsx("div",{className:`article-web-art-stage ${t?"article-web-art-stage-preview":""}`,"aria-hidden":t,children:b.jsxs("div",{className:`article-web-art-items ${F?"article-web-art-items-locked":""}`,ref:u,"aria-busy":t,children:[l&&b.jsx(lt,{label:J,clickLabel:Q,previewRequested:K}),ge,Me]})})]})})}function De({guide:w,buttonLabel:m,hidden:M,onEnter:d,secondaryButtonLabel:R=null,onSecondaryAction:x=null,secondaryPressed:P=!1}){const a=C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),d())};return b.jsx("div",{className:`article-web-art-intro-cover ${M?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:b.jsx("div",{className:"article-web-art-intro-cover-inner",children:b.jsx("div",{className:"article-web-art-intro-cover-actions",children:b.jsx("div",{className:`article-web-art-intro-guide ${M?"article-web-art-intro-guide-hidden":"article-web-art-intro-guide-open"}`,children:b.jsxs("div",{className:"article-web-art-intro-guide-inner",children:[b.jsxs("div",{className:"article-web-art-intro-guide-top-row",children:[b.jsxs("div",{className:"article-web-art-intro-guide-top-copy",children:[b.jsx("span",{className:"article-web-art-intro-guide-eyebrow",children:w.eyebrow}),b.jsx("p",{className:"article-web-art-intro-guide-line article-web-art-intro-guide-line-primary",children:fe(w.lines[0])})]}),b.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[R?b.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${P?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:x||void 0,"aria-pressed":P,"aria-label":R,children:R}):null,b.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:d,onKeyDown:a,"aria-label":m,children:m})]})]}),b.jsx("div",{className:"article-web-art-intro-guide-lines",children:w.lines.slice(1).map((C,g)=>b.jsx("p",{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${g+2}`,children:fe(C)},Array.isArray(C)?C.map(k=>k==null?void 0:k.text).join(""):C))})]})})})})})}function he({label:w,isOpen:m,onToggle:M,shouldRender:d=!0,children:R}){return b.jsxs("div",{className:`article-web-art-gated-tile ${m?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[d?R:b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":Le(w)}),b.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),b.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${m?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:M,"aria-label":`${m?"Hide":"Show"} ${w}`,children:w})]})}function Ae({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){return Number(w.id)===1?b.jsx(Ge,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===2?b.jsx(Ye,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===3?b.jsx(Ue,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===4?b.jsx(Xe,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===6?b.jsx(Ze,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===7?b.jsx(Be,{itemWrapper:w,locked:d,onReady:R}):Number(w.id)===8?b.jsx($e,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===9?b.jsx(Fe,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===10?b.jsx(qe,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===11?b.jsx(Oe,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===12?b.jsx(He,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===13?b.jsx(Ve,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):Number(w.id)===14?b.jsx(ze,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R}):b.jsx(Ke,{itemWrapper:w,index:m,activate:M,locked:d,onReady:R})}function Oe({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),g=c.useRef(!0),k=c.useRef(null),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:54013+(Number(w.id)||11)*7331,reduceMotion:v}),[w.id,v]);c.useEffect(()=>{if(!M)return;const e=x.current,r=P.current;if(!e||!r)return;let t=!1,o=null,n=null,s=null;const u=()=>{C.current||(C.current=!0,R==null||R(w.uniqueId))},l=$(async()=>{var h,p;try{const y=await B(()=>import("./distanceFieldEngine-DHTRwy4W.js"),[]);if(t)return;o=y.createDistanceFieldEngine(r,f),a.current=o;const S=()=>z(e,o,Math.min(1.5,window.devicePixelRatio||1));S(),(h=o.renderStatic)==null||h.call(o),d||(p=o.start)==null||p.call(o),u(),n=new ResizeObserver(()=>{S()}),n.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var j,E,_,L;for(const A of I){if(g.current=!!A.isIntersecting,d){(j=o.setHoverActive)==null||j.call(o,!1),(E=o.stop)==null||E.call(o);continue}g.current?(_=o.start)==null||_.call(o):(L=o.stop)==null||L.call(o)}},{threshold:.25}),s.observe(e))}catch{u()}},{timeoutMs:220});return()=>{var h;t=!0,l==null||l(),s==null||s.disconnect(),n==null||n.disconnect(),(h=o==null?void 0:o.destroy)==null||h.call(o),a.current=null}},[M,f,w.uniqueId,d,R]),c.useEffect(()=>{var r,t,o,n;const e=a.current;if(e){if(d){(r=e.setHoverActive)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(o=e.stop)==null||o.call(e);return}g.current&&((n=e.start)==null||n.call(e))}},[d]);const i=e=>{const r=x.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${m+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,r,t,o;(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(o=(t=a.current)==null?void 0:t.start)==null||o.call(t)}),onPointerMove:d?void 0:(e=>{var t,o,n,s;const r=i(e);(o=(t=a.current)==null?void 0:t.setHoverActive)==null||o.call(t,!0),(s=(n=a.current)==null?void 0:n.setPointer)==null||s.call(n,r.x,r.y)}),onPointerLeave:d?void 0:(()=>{var e,r,t,o;k.current=null,(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(o=(t=a.current)==null?void 0:t.clearPointer)==null||o.call(t)}),onPointerDown:d?void 0:(e=>{var t,o,n,s,u,l;if(e.button!=null&&e.button!==0)return;k.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const r=i(e);(o=(t=a.current)==null?void 0:t.setHoverActive)==null||o.call(t,!0),(s=(n=a.current)==null?void 0:n.setPointer)==null||s.call(n,r.x,r.y),(l=(u=a.current)==null?void 0:u.boostPopulation)==null||l.call(u)}),onPointerUp:d?void 0:(e=>{k.current!=null&&e.pointerId!==k.current||(k.current=null)}),onPointerCancel:d?void 0:(()=>{var e,r,t,o;k.current=null,(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(o=(t=a.current)==null?void 0:t.clearPointer)==null||o.call(t)}),onFocus:d?void 0:(()=>{var e,r,t,o;(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!0),(o=(t=a.current)==null?void 0:t.start)==null||o.call(t)}),onBlur:d?void 0:(()=>{var e,r,t,o;k.current=null,(r=(e=a.current)==null?void 0:e.setHoverActive)==null||r.call(e,!1),(o=(t=a.current)==null?void 0:t.clearPointer)==null||o.call(t)}),onKeyDown:d?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=a.current)==null?void 0:r.boostPopulation)==null||t.call(r))}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function He({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(null),g=c.useRef(null),k=c.useRef(!1),v=c.useRef(!0),f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!M)return;const e=x.current,r=P.current,t=a.current;if(!e||!r||!t)return;let o=!1,n=null,s=null,u=null,l=null;const h=()=>{k.current||(k.current=!0,R==null||R(w.uniqueId))},p=$(async()=>{var y,S,I,j;try{const E=await B(()=>import("./androidBackgroundEngine-BgHFFw8C.js"),__vite__mapDeps([0,1])),_=await B(()=>import("./androidRobotEngine-CNxYykCI.js"),[]);if(o)return;n=E.createAndroidBackgroundEngine(r,{reduceMotion:f}),C.current=n,s=_.createAndroidRobotEngine(t,{reduceMotion:f}),g.current=s;const L=()=>{const A=Math.min(1.5,window.devicePixelRatio||1);z(e,n,A),z(e,s,A)};L(),(y=n.renderStatic)==null||y.call(n),(S=s.renderStatic)==null||S.call(s),d||(I=n.start)==null||I.call(n),d||(j=s.start)==null||j.call(s),h(),u=new ResizeObserver(()=>{L()}),u.observe(e),"IntersectionObserver"in window&&(l=new IntersectionObserver(A=>{var O,K,Y,V,U,F;for(const Z of A){if(v.current=!!Z.isIntersecting,d){(O=n.stop)==null||O.call(n),(K=s.stop)==null||K.call(s);continue}v.current?((Y=n.start)==null||Y.call(n),(V=s.start)==null||V.call(s)):((U=n.stop)==null||U.call(n),(F=s.stop)==null||F.call(s))}},{threshold:.2}),l.observe(e))}catch{h()}},{timeoutMs:220});return()=>{var y,S;o=!0,p==null||p(),l==null||l.disconnect(),u==null||u.disconnect(),(y=n==null?void 0:n.destroy)==null||y.call(n),(S=s==null?void 0:s.destroy)==null||S.call(s),C.current=null,g.current=null}},[M,w.uniqueId,d,R,f]),c.useEffect(()=>{var t,o,n,s,u;const e=g.current,r=C.current;if(!(!e||!r)){if(d){(t=e.clearPointer)==null||t.call(e),(o=r.stop)==null||o.call(r),(n=e.stop)==null||n.call(e);return}v.current&&((s=r.start)==null||s.call(r),(u=e.start)==null||u.call(e))}},[d]);const i=e=>{const r=x.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android","aria-label":`Android web art tile ${m+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.start)==null||r.call(e)}),onPointerMove:d?void 0:(e=>{var t,o;const r=i(e);(o=(t=g.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)}),onPointerLeave:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onFocus:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.start)==null||r.call(e)}),onBlur:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onClick:d?void 0:(()=>{var e,r;(r=(e=g.current)==null?void 0:e.poke)==null||r.call(e)}),onKeyDown:d?void 0:(e=>{var r,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(r=g.current)==null?void 0:r.poke)==null||t.call(r))}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-android-bg-canvas","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-android-glow","aria-hidden":!0}),b.jsx("canvas",{ref:a,className:"article-web-art-android-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Android"})]})}function Be({itemWrapper:w,locked:m,onReady:M}){const d=c.useRef(!1);c.useEffect(()=>{d.current||(d.current=!0,M==null||M(w.uniqueId))},[w.uniqueId,M]);const R=c.useMemo(()=>[{key:"stop",hoverMode:"stop",hoverDuration:"5s"},{key:"slow",hoverMode:"slow",hoverDuration:"18s"},{key:"super-fast",hoverMode:"super-fast",hoverDuration:"0.22s"},{key:"very-fast",hoverMode:"very-fast",hoverDuration:"0.55s"}],[]);return b.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${m?"article-web-art-spin-boxes-locked":""}`,children:b.jsx("div",{className:"article-web-art-spin-boxes-grid",children:R.map(({key:x,hoverDuration:P,hoverMode:a})=>b.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--spin-hover-duration":P},children:b.jsx("div",{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${a}`})},x))})})}function ze({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(!1),P=50,a=c.useMemo(()=>["level-1","level-2","level-3","level-4","level-5"],[]),[C,g]=c.useState(0),k=a[C],v=c.useMemo(()=>Array.from({length:P},(i,e)=>{const r=`${3/(P/2)*(e+1)}s`,t=e%5;return{key:e,style:{animationDelay:r,"--bar-index":e,"--bar-band":t,"--bar-hue":`${Math.round(e/Math.max(1,P-1)*360)}deg`}}}),[]),f=c.useCallback(i=>{var e,r;(e=i==null?void 0:i.preventDefault)==null||e.call(i),(r=i==null?void 0:i.stopPropagation)==null||r.call(i),g(t=>(t+1)%a.length)},[a.length]);return c.useEffect(()=>{M&&(x.current||(x.current=!0,R==null||R(w.uniqueId)))},[M,w.uniqueId,R]),b.jsx("button",{type:"button",className:"article-web-art-tile article-web-art-bars-tile article-web-art-tile-clickable","aria-label":`Bars web art tile ${m+1}, ${k.replace("level-","mode ")}`,disabled:d,onClick:d?void 0:f,onKeyDown:d?void 0:i=>{(i.key==="Enter"||i.key===" ")&&f(i)},children:b.jsx("div",{className:"article-web-art-bars-stage",children:b.jsx("div",{className:`article-web-art-bars article-web-art-bars-${k}`,children:v.map(i=>b.jsx("div",{className:"article-web-art-bars-panel",style:i.style},i.key))})})})}function $e({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),g=c.useRef(!0),k=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=c.useMemo(()=>({seed:1729+(Number(w.id)||8)*4242,reduceMotion:k,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[w.id,k]);c.useEffect(()=>{if(!M)return;const t=x.current,o=P.current;if(!t||!o)return;let n=!1,s=null,u=null,l=null;const h=()=>{C.current||(C.current=!0,R==null||R(w.uniqueId))},p=$(async()=>{var y,S,I;try{const j=await B(()=>import("./shapeFieldEngine-B_ToSidK.js"),[]);if(n)return;s=j.createShapeFieldEngine(o,v),a.current=s;const E=()=>z(t,s,window.devicePixelRatio||1);E(),(y=s.renderStatic)==null||y.call(s),(S=s.triggerWave)==null||S.call(s),d||(I=s.start)==null||I.call(s),h(),u=new ResizeObserver(()=>{var _;E(),(_=s.renderStatic)==null||_.call(s)}),u.observe(t),"IntersectionObserver"in window&&(l=new IntersectionObserver(_=>{var L,A,O;for(const K of _){if(g.current=!!K.isIntersecting,d){(L=s.stop)==null||L.call(s);continue}g.current?(A=s.start)==null||A.call(s):(O=s.stop)==null||O.call(s)}},{threshold:.2}),l.observe(t))}catch{h()}});return()=>{var y;n=!0,p==null||p(),l==null||l.disconnect(),u==null||u.disconnect(),(y=s==null?void 0:s.destroy)==null||y.call(s),a.current=null}},[M,v,w.uniqueId,d,R]),c.useEffect(()=>{var o,n,s;const t=a.current;if(t){if(d){(o=t.clearPointer)==null||o.call(t),(n=t.stop)==null||n.call(t);return}g.current&&((s=t.start)==null||s.call(t))}},[d]);const f=t=>{const o=P.current||x.current;if(!o)return{x:0,y:0};const n=o.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}},i=t=>{var n,s;const o=f(t);(s=(n=a.current)==null?void 0:n.setPointer)==null||s.call(n,o.x,o.y)},e=t=>{var n,s,u,l;const o=f(t);(s=(n=a.current)==null?void 0:n.setPointer)==null||s.call(n,o.x,o.y),(l=(u=a.current)==null?void 0:u.triggerWave)==null||l.call(u,o.x,o.y)},r=t=>{var o,n;t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),(n=(o=a.current)==null?void 0:o.triggerWave)==null||n.call(o))};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${m+1}`,disabled:d,onPointerMove:d?void 0:i,onPointerDown:d?void 0:e,onPointerLeave:d?void 0:(()=>{var t,o;return(o=(t=a.current)==null?void 0:t.clearPointer)==null?void 0:o.call(t)}),onBlur:d?void 0:(()=>{var t,o;return(o=(t=a.current)==null?void 0:t.clearPointer)==null?void 0:o.call(t)}),onKeyDown:d?void 0:r,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function Fe({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),g=c.useRef(!0),[k,v]=c.useState(2.8),[f,i]=c.useState(.01);c.useEffect(()=>{if(!M)return;const s=x.current,u=P.current;if(!s||!u)return;let l=!1,h=null,p=null,y=null;const S=()=>{C.current||(C.current=!0,R==null||R(w.uniqueId))},I=$(async()=>{var j,E,_;try{const L=await B(()=>import("./hourglassEngine-Dxe9DVtS.js"),__vite__mapDeps([2,3,4]));if(l)return;h=L.createHourglassEngine(u),a.current=h;const A=(j=h.getState)==null?void 0:j.call(h);A&&(v(A.gravity),i(A.neckRatio));const O=()=>z(s,h,window.devicePixelRatio||1);O(),(E=h.renderStatic)==null||E.call(h),d||(_=h.start)==null||_.call(h),S(),p=new ResizeObserver(()=>{var K;O(),(K=h.renderStatic)==null||K.call(h)}),p.observe(s),"IntersectionObserver"in window&&(y=new IntersectionObserver(K=>{var Y,V,U;for(const F of K){if(g.current=!!F.isIntersecting,d){(Y=h.stop)==null||Y.call(h);continue}g.current?(V=h.start)==null||V.call(h):(U=h.stop)==null||U.call(h)}},{threshold:.2}),y.observe(s))}catch{S()}});return()=>{var j;l=!0,I==null||I(),y==null||y.disconnect(),p==null||p.disconnect(),(j=h==null?void 0:h.destroy)==null||j.call(h),a.current=null}},[M,w.uniqueId,d,R]),c.useEffect(()=>{var u,l;const s=a.current;if(s){if(d){(u=s.stop)==null||u.call(s);return}g.current&&((l=s.start)==null||l.call(s))}},[d]);const e=s=>{var u,l;s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),(l=(u=a.current)==null?void 0:u.flip)==null||l.call(u))},r=s=>{s.stopPropagation()},t=s=>{s.stopPropagation()},o=s=>{var l,h;const u=Number(s.target.value);v(u),(h=(l=a.current)==null?void 0:l.setGravity)==null||h.call(l,u)},n=s=>{var l,h,p,y;const u=Number(s.target.value);i(u),(h=(l=a.current)==null?void 0:l.setNeckRatio)==null||h.call(l,u),!d&&g.current&&((y=(p=a.current)==null?void 0:p.start)==null||y.call(p))};return b.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass",role:d?void 0:"button",tabIndex:d?-1:0,"aria-label":`Hourglass web art tile ${m+1}`,onClick:d?void 0:(()=>{var s,u;return(u=(s=a.current)==null?void 0:s.flip)==null?void 0:u.call(s)}),onKeyDown:d?void 0:e,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsxs("div",{className:"article-web-art-hourglass-controls",onClickCapture:t,onPointerDownCapture:t,onPointerUpCapture:t,onClick:r,onPointerDown:r,onPointerUp:r,onKeyDown:r,children:[b.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-left",children:[b.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Neck"}),b.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.01",max:"0.22",step:"0.001",value:f,onChange:n,disabled:d,"aria-label":"Hourglass neck size"})]}),b.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-right",children:[b.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Gravity"}),b.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.45",max:"2.8",step:"0.01",value:k,onChange:o,disabled:d,"aria-label":"Hourglass gravity"})]})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function qe({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),g=c.useRef(!0),k=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);c.useEffect(()=>{if(!M)return;const i=x.current,e=P.current;if(!i||!e)return;let r=!1,t=null,o=null,n=null;const s=()=>{C.current||(C.current=!0,R==null||R(w.uniqueId))},u=$(async()=>{var l,h;try{const p=await B(()=>import("./noiceShaderEngine-6wwfZdln.js"),[]);if(r)return;t=p.createNoiceShaderEngine(e,{reduceMotion:k}),a.current=t;const y=()=>z(i,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),d||(h=t.start)==null||h.call(t),s(),o=new ResizeObserver(()=>{var S;y(),(S=t.renderStatic)==null||S.call(t)}),o.observe(i),"IntersectionObserver"in window&&(n=new IntersectionObserver(S=>{var I,j,E;for(const _ of S){if(g.current=!!_.isIntersecting,d){(I=t.stop)==null||I.call(t);continue}g.current?(j=t.start)==null||j.call(t):(E=t.stop)==null||E.call(t)}},{threshold:.25}),n.observe(i))}catch{s()}},{timeoutMs:220});return()=>{var l;r=!0,u==null||u(),n==null||n.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),a.current=null}},[M,w.uniqueId,d,R,k]),c.useEffect(()=>{var e,r,t;const i=a.current;if(i){if(d){(e=i.clearPointer)==null||e.call(i),(r=i.stop)==null||r.call(i);return}g.current&&((t=i.start)==null||t.call(i))}},[d]);const v=i=>{const e=P.current||x.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(i.clientX-r.left)/Math.max(1,r.width))),y:Math.max(0,Math.min(1,(i.clientY-r.top)/Math.max(1,r.height)))}},f=i=>{var r,t,o,n,s,u;const e=v(i);(t=(r=a.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y),(n=(o=a.current)==null?void 0:o.pulsePattern)==null||n.call(o),(u=(s=a.current)==null?void 0:s.start)==null||u.call(s)};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice","aria-label":`Noice web art tile ${m+1}`,disabled:d,onPointerMove:d?void 0:(i=>{var r,t;const e=v(i);(t=(r=a.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerDown:d?void 0:(i=>{i.button!=null&&i.button!==0||f(i)}),onMouseLeave:d?void 0:(()=>{var i,e;(e=(i=a.current)==null?void 0:i.clearPointer)==null||e.call(i)}),onBlur:d?void 0:(()=>{var i,e;(e=(i=a.current)==null?void 0:i.clearPointer)==null||e.call(i)}),onKeyDown:d?void 0:(i=>{var e,r,t,o;(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),(r=(e=a.current)==null?void 0:e.pulsePattern)==null||r.call(e),(o=(t=a.current)==null?void 0:t.start)==null||o.call(t))}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function Ke({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),g=c.useRef(!0),k=c.useRef(!1),v=Number(w==null?void 0:w.id)===5,f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),i=c.useMemo(()=>{const n=Number(w.id)||m+1,s=.0026+n*8e-5,u=.0054+n*14e-5,l=n%2?1:2,h={kx:11+n*2,ky:n%2};return{refreshDelay:v?0:8e3,radiusMini:s,radiusMaxi:u,dHueStep:l,startGroup:h,seed:1337+n*1009,reduceMotion:f}},[v,w.id,m,f]);c.useEffect(()=>{if(!M)return;const n=x.current,s=P.current;if(!n||!s)return;let u=!1,l=null,h=null,p=null;const y=()=>{k.current||(k.current=!0,R==null||R(w.uniqueId))},S=$(async()=>{var I,j;try{const E=await B(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(u)return;l=E.createEmbroideryEngine(s,i),a.current=l;const _=()=>z(n,l,window.devicePixelRatio||1);_(),(I=l.renderStatic)==null||I.call(l),g.current&&((j=l.start)==null||j.call(l)),y(),h=new ResizeObserver(()=>{var L;_(),(L=l.renderStatic)==null||L.call(l)}),h.observe(n),"IntersectionObserver"in window&&(p=new IntersectionObserver(L=>{for(const A of L){if(g.current=!!A.isIntersecting,v){g.current||l.stop();continue}g.current&&C.current?l.start():l.stop()}},{threshold:.25}),p.observe(n))}catch{y()}});return()=>{u=!0,S==null||S(),p==null||p.disconnect(),h==null||h.disconnect(),l==null||l.destroy(),a.current=null}},[M,i,w.uniqueId,R]),c.useEffect(()=>{var s,u;const n=a.current;if(n){if(d){(s=n.stop)==null||s.call(n);return}g.current&&((u=n.start)==null||u.call(n))}},[d]),c.useEffect(()=>{var s,u;const n=a.current;if(n){if(d){(s=n.stop)==null||s.call(n);return}g.current&&((u=n.start)==null||u.call(n))}},[d]);const e=()=>{var n;C.current=!0,g.current&&((n=a.current)==null||n.start())},r=()=>{var n,s,u,l;C.current=!0,g.current?(s=(n=a.current)==null?void 0:n.start)==null||s.call(n):(l=(u=a.current)==null?void 0:u.stop)==null||l.call(u)},t=()=>{var n,s,u,l,h,p,y,S,I,j;if(v){(s=(n=a.current)==null?void 0:n.stop)==null||s.call(n),(l=(u=a.current)==null?void 0:u.reset)==null||l.call(u),(p=(h=a.current)==null?void 0:h.start)==null||p.call(h);return}(y=a.current)==null||y.reset(),(I=(S=a.current)==null?void 0:S.renderStatic)==null||I.call(S),g.current&&((j=a.current)==null||j.start())},o=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${m+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d||v?void 0:e,onMouseLeave:d||v?void 0:r,onFocus:d||v?void 0:e,onBlur:d||v?void 0:r,onKeyDown:d?void 0:o,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:v?"Click":Number.isFinite(Number(w==null?void 0:w.id))?Number(w.id):m+1})]})}function Ve({itemWrapper:w,index:m,activate:M,onReady:d}){const R=c.useRef(!1),x=c.useRef(null),P=c.useMemo(()=>`<!doctype html>
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
</html>`,[]);return c.useEffect(()=>{M&&(R.current||(R.current=!0,d==null||d(w.uniqueId)))},[M,w.uniqueId,d]),b.jsx("div",{className:"article-web-art-tile article-web-art-pulse-tile",role:"img","aria-label":`Pulse web art tile ${m+1}`,children:b.jsx("iframe",{ref:x,className:"article-web-art-pulse-frame",title:"Pulse web art",srcDoc:P,sandbox:"",scrolling:"no"})})}function Ge({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(!1),g=c.useRef(null);c.useRef(null),c.useRef(!1);const k=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:9001+(Number(w.id)||1)*1337,reduceMotion:v,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[w.id,v]);c.useEffect(()=>{if(!M)return;const l=x.current,h=P.current;if(!l||!h)return;let p=!1,y=null,S=null;const I=()=>{C.current||(C.current=!0,R==null||R(w.uniqueId))},j=$(async()=>{var E,_;try{const L=await B(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(p)return;y=L.createSpiralDotsEngine(h,f),a.current=y;const A=()=>z(l,y,window.devicePixelRatio||1);A(),(E=y.renderStatic)==null||E.call(y),(_=y.start)==null||_.call(y),I(),S=new ResizeObserver(()=>{var O;A(),y.rebuildDots(),(O=y.renderStatic)==null||O.call(y)}),S.observe(l)}catch{I()}});return()=>{p=!0,j==null||j(),S==null||S.disconnect(),y==null||y.destroy(),a.current=null}},[M,f,w.uniqueId,R]),c.useEffect(()=>{var h,p,y;const l=a.current;if(l){if(d){(h=l.clearMouse)==null||h.call(l),(p=l.stop)==null||p.call(l);return}(y=l.start)==null||y.call(l)}},[d]);const i=l=>{const h=P.current||x.current;if(!h)return{x:-1e4,y:-1e4};const p=h.getBoundingClientRect();return{x:l.clientX-p.left,y:l.clientY-p.top}},e=()=>{var l;(l=a.current)==null||l.start()},r=()=>{var l,h;(l=a.current)==null||l.clearMouse(),(h=a.current)==null||h.start()},t=()=>{e()},o=()=>{r()},n=l=>{var p;const h=i(l);(p=a.current)==null||p.setMouse(h.x,h.y)},s=()=>{e()},u=()=>{r()};return b.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:d?-1:0,"aria-label":`Spiral dots web art tile ${m+1}`,onPointerDown:d?void 0:l=>{var y;if(l.pointerType==="mouse")return;const h=x.current;if(!h)return;k.current=!0,g.current=l.pointerId;try{h.setPointerCapture(l.pointerId)}catch{}e();const p=i(l);(y=a.current)==null||y.setMouse(p.x,p.y)},onPointerMove:d?void 0:l=>{var p;if(!k.current||g.current!=null&&l.pointerId!==g.current)return;const h=i(l);(p=a.current)==null||p.setMouse(h.x,h.y)},onPointerUp:d?void 0:l=>{g.current!=null&&l.pointerId!==g.current||(k.current=!1,g.current=null,r())},onPointerCancel:d?void 0:()=>{k.current=!1,g.current=null,r()},onMouseEnter:d?void 0:t,onMouseLeave:d?void 0:o,onMouseMove:d?void 0:n,onFocus:d?void 0:s,onBlur:d?void 0:u,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function Ye({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),g=c.useRef(!0),k=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({seed:424242+(Number(w.id)||2)*2027,reduceMotion:v,targetCellSize:14,gapPx:1.4}),[w.id,v]);c.useEffect(()=>{if(!M)return;const n=x.current,s=P.current;if(!n||!s)return;let u=!1,l=null,h=null,p=null;const y=()=>{k.current||(k.current=!0,R==null||R(w.uniqueId))},S=$(async()=>{var I,j;try{const E=await B(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(u)return;l=E.createGridWaveEngine(s,f),a.current=l;const _=()=>z(n,l,window.devicePixelRatio||1);_(),(I=l.renderStatic)==null||I.call(l),g.current&&((j=l.start)==null||j.call(l)),y(),h=new ResizeObserver(()=>{var L;_(),(L=l.renderStatic)==null||L.call(l)}),h.observe(n),"IntersectionObserver"in window&&(p=new IntersectionObserver(L=>{for(const A of L)g.current=!!A.isIntersecting,g.current&&C.current?l.start():l.stop()},{threshold:.25}),p.observe(n))}catch{y()}});return()=>{u=!0,S==null||S(),p==null||p.disconnect(),h==null||h.disconnect(),l==null||l.destroy(),a.current=null}},[M,f,w.uniqueId,R]);const i=()=>{var n;C.current=!0,g.current&&((n=a.current)==null||n.start())},e=()=>{var n,s,u,l;C.current=!0,g.current?(s=(n=a.current)==null?void 0:n.start)==null||s.call(n):(l=(u=a.current)==null?void 0:u.stop)==null||l.call(u)},r=n=>{const s=P.current||x.current;if(!s)return{x:0,y:0};const u=s.getBoundingClientRect();return typeof(n==null?void 0:n.clientX)!="number"||typeof(n==null?void 0:n.clientY)!="number"?{x:u.width/2,y:u.height/2}:{x:n.clientX-u.left,y:n.clientY-u.top}},t=n=>{var u,l,h,p;const s=r(n);(u=a.current)==null||u.rippleAt(s.x,s.y),(h=(l=a.current)==null?void 0:l.renderStatic)==null||h.call(l),C.current&&g.current&&((p=a.current)==null||p.start())},o=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t(null))};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${m+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:i,onMouseLeave:d?void 0:e,onFocus:d?void 0:i,onBlur:d?void 0:e,onKeyDown:d?void 0:o,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function Ue({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),g=c.useRef(!0),k=c.useRef(!1),v=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=c.useMemo(()=>({reduceMotion:v,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[v]);c.useEffect(()=>{if(!M)return;const o=x.current,n=P.current;if(!o||!n)return;let s=!1,u=null,l=null,h=null,p=null;const y=()=>{k.current||(k.current=!0,R==null||R(w.uniqueId))},S=async()=>{var L;const j=await B(()=>import("./threeTunnelEngine-BFDBX4Fw.js"),__vite__mapDeps([5,1]));if(s)return;u=j.createThreeTunnelEngine(n,f),a.current=u;const E=()=>z(o,u,Math.min(1.5,window.devicePixelRatio||1));return E(),u.reset(),g.current&&((L=u.start)==null||L.call(u)),y(),l=new ResizeObserver(()=>{E(),u.reset()}),l.observe(o),"IntersectionObserver"in window&&(h=new IntersectionObserver(A=>{for(const O of A)g.current=!!O.isIntersecting,g.current&&C.current?u.start():u.stop()},{threshold:.25}),h.observe(o)),()=>{h==null||h.disconnect(),l==null||l.disconnect(),u.destroy(),a.current=null}};let I=null;return p=$(()=>{S().then(j=>{I=j||null}).catch(()=>{y()})},{timeoutMs:300}),()=>{s=!0,p==null||p(),I==null||I()}},[M,f,w.uniqueId,R]),c.useEffect(()=>{var n,s,u;const o=a.current;if(o){if(d){(n=o.setHeld)==null||n.call(o,!1),(s=o.stop)==null||s.call(o);return}g.current&&((u=o.start)==null||u.call(o))}},[d]);const i=()=>{var o;C.current=!0,g.current&&((o=a.current)==null||o.start())},e=()=>{var o,n,s,u;C.current=!0,g.current?(n=(o=a.current)==null?void 0:o.start)==null||n.call(o):(u=(s=a.current)==null?void 0:s.stop)==null||u.call(s)},r=()=>{var o,n,s,u;(n=(o=a.current)==null?void 0:o.nextPalette)==null||n.call(o),(s=a.current)==null||s.reset(),g.current&&((u=a.current)==null||u.start())},t=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),r())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${m+1}`,disabled:d,onClick:d?void 0:r,onMouseEnter:d?void 0:i,onMouseLeave:d?void 0:e,onFocus:d?void 0:i,onBlur:d?void 0:e,onKeyDown:d?void 0:t,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),b.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Xe({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),g=c.useRef(!0),k=c.useRef(!1),v=c.useRef(null),f=c.useRef(null),i=c.useRef(!1),e=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=c.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,d]);c.useEffect(()=>{if(!M)return;const n=x.current,s=P.current;if(!n||!s)return;let u=!1,l=null,h=null;const p=()=>{k.current||(k.current=!0,R==null||R(w.uniqueId))},y=async()=>{var L;const S=await B(()=>import("./threePolygonDemo5Engine-CF_GI828.js"),__vite__mapDeps([6,1]));if(u)return;const I=S.createThreePolygonDemo5Engine(s,r);a.current=I;const j=()=>z(n,I,Math.min(1.2,window.devicePixelRatio||1));j(),I.reset(),window.requestAnimationFrame(()=>{u||a.current!==I||(j(),I.reset())}),g.current&&((L=I.start)==null||L.call(I)),p();const E=new ResizeObserver(()=>{j()});E.observe(n);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(A=>{for(const O of A)g.current=!!O.isIntersecting,g.current&&C.current?I.start():I.stop()},{threshold:.25}),_.observe(n)),l=()=>{_==null||_.disconnect(),E.disconnect(),I.destroy(),a.current=null}};return h=$(()=>{y().catch(()=>{p()})},{timeoutMs:300}),()=>{u=!0,h==null||h(),f.current!=null&&window.clearTimeout(f.current),l==null||l()}},[M,r,w.uniqueId,R]);const t=()=>{var n,s,u;(s=(n=a.current)==null?void 0:n.boost)==null||s.call(n),g.current&&((u=a.current)==null||u.start())},o=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${m+1}`,disabled:d,onKeyDown:d?void 0:o,onPointerDown:d?void 0:n=>{var s;if(!(n.button!=null&&n.button!==0)){v.current=n.pointerId,i.current=!1;try{n.currentTarget.setPointerCapture(n.pointerId)}catch{}g.current&&((s=a.current)==null||s.start()),f.current!=null&&window.clearTimeout(f.current),f.current=window.setTimeout(()=>{var u,l;v.current!=null&&(i.current=!0,(l=(u=a.current)==null?void 0:u.setHeld)==null||l.call(u,!0))},140)}},onPointerUp:d?void 0:n=>{var s,u;v.current!=null&&n.pointerId!==v.current||(f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,i.current?(i.current=!1,(u=(s=a.current)==null?void 0:s.setHeld)==null||u.call(s,!1)):t())},onPointerCancel:d?void 0:(()=>{var n,s;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,i.current=!1,(s=(n=a.current)==null?void 0:n.setHeld)==null||s.call(n,!1)}),onLostPointerCapture:d?void 0:(()=>{var n,s;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,i.current=!1,(s=(n=a.current)==null?void 0:n.setHeld)==null||s.call(n,!1)}),onMouseEnter:d?void 0:(()=>{var n;C.current=!0,g.current&&((n=a.current)==null||n.start())}),onMouseLeave:d?void 0:(()=>{var n,s,u,l;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,i.current=!1,(s=(n=a.current)==null?void 0:n.setHeld)==null||s.call(n,!1),C.current=!0,g.current?(u=a.current)==null||u.start():(l=a.current)==null||l.stop()}),onFocus:d?void 0:(()=>{var n;C.current=!0,g.current&&((n=a.current)==null||n.start())}),onBlur:d?void 0:(()=>{var n,s,u,l;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,i.current=!1,(s=(n=a.current)==null?void 0:n.setHeld)==null||s.call(n,!1),C.current=!0,g.current?(u=a.current)==null||u.start():(l=a.current)==null||l.stop()}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function Ze({itemWrapper:w,index:m,activate:M,locked:d,onReady:R}){const x=c.useRef(null),P=c.useRef(null),a=c.useRef(null),C=c.useRef(!0),g=c.useRef(!0),k=c.useRef(!1),v=c.useRef(0),f=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),i=c.useMemo(()=>({reduceMotion:f,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[f]);c.useEffect(()=>{if(!M)return;const n=x.current,s=P.current;if(!n||!s)return;let u=!1,l=null,h=null,p=null;const y=()=>{k.current||(k.current=!0,R==null||R(w.uniqueId))},S=$(async()=>{var I,j;try{const E=await B(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(u)return;l=E.createOrbitCirclesEngine(s,i),a.current=l;const _=()=>z(n,l,window.devicePixelRatio||1);_(),l.reset(),(I=l.renderStatic)==null||I.call(l),g.current&&((j=l.start)==null||j.call(l)),y(),h=new ResizeObserver(()=>{var L;_(),(L=l.renderStatic)==null||L.call(l)}),h.observe(n),"IntersectionObserver"in window&&(p=new IntersectionObserver(L=>{for(const A of L)g.current=!!A.isIntersecting,g.current&&C.current?l.start():l.stop()},{threshold:.25}),p.observe(n))}catch{y()}});return()=>{u=!0,S==null||S(),p==null||p.disconnect(),h==null||h.disconnect(),l==null||l.destroy(),a.current=null}},[M,i,w.uniqueId,R]),c.useEffect(()=>{var s,u;const n=a.current;if(n){if(d){(s=n.stop)==null||s.call(n);return}g.current&&((u=n.start)==null||u.call(n))}},[d]);const e=()=>{var n;C.current=!0,g.current&&((n=a.current)==null||n.start())},r=()=>{var n,s,u,l;C.current=!0,g.current?(s=(n=a.current)==null?void 0:n.start)==null||s.call(n):(l=(u=a.current)==null?void 0:u.stop)==null||l.call(u)},t=()=>{var h,p,y;const n=a.current;if(!n)return;const s=Math.max(1,((h=n.getTotalCircles)==null?void 0:h.call(n))||1),u=v.current%s,l=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`;(p=n.setCircleColor)==null||p.call(n,u,l),v.current+=1,g.current&&((y=n.start)==null||y.call(n))},o=n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${m+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:e,onMouseLeave:d?void 0:r,onFocus:d?void 0:e,onBlur:d?void 0:r,onKeyDown:d?void 0:o,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function Je({readyId:w,locked:m,onReady:M}){const d=c.useRef(null),R=c.useRef(null),x=c.useRef(null),P=c.useRef(!1),a=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=c.useMemo(()=>({seed:20250414,reduceMotion:a,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[a]);c.useEffect(()=>{const v=d.current,f=R.current;if(!v||!f)return;let i=!1,e=null,r=null,t=null;const o=()=>{P.current||(P.current=!0,M==null||M(w))},n=$(async()=>{var s,u;try{const l=await B(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(i)return;e=l.createTortuosityTraceEngine(f,C),x.current=e;const h=()=>z(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(s=e.renderStatic)==null||s.call(e),(u=e.start)==null||u.call(e),o(),r=new ResizeObserver(()=>{var p;h(),(p=e.reset)==null||p.call(e)}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(p=>{var y,S;for(const I of p)I.isIntersecting?(y=e.start)==null||y.call(e):(S=e.stop)==null||S.call(e)},{threshold:.25}),t.observe(v))}catch{o()}},{timeoutMs:200});return()=>{var s;i=!0,n==null||n(),t==null||t.disconnect(),r==null||r.disconnect(),(s=e==null?void 0:e.destroy)==null||s.call(e),x.current=null}},[C,M,w]),c.useEffect(()=>{var f,i,e;const v=x.current;if(v){if(m){(f=v.setHeld)==null||f.call(v,!1),(i=v.stop)==null||i.call(v);return}(e=v.start)==null||e.call(v)}},[m]),c.useEffect(()=>{var f,i;const v=x.current;if(v){if(m){(f=v.stop)==null||f.call(v);return}(i=v.start)==null||i.call(v)}},[m]);const g=()=>{var v,f,i,e;(f=(v=x.current)==null?void 0:v.reset)==null||f.call(v),(e=(i=x.current)==null?void 0:i.start)==null||e.call(i)},k=v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g())};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:m,onClick:m?void 0:g,onKeyDown:m?void 0:k,children:[b.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function Qe({readyId:w,locked:m,onReady:M}){const d=c.useRef(null),R=c.useRef(null),x=c.useRef(null),P=c.useRef(!1),a=c.useRef(null),C=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=c.useMemo(()=>({seed:20250415,reduceMotion:C,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[C]);c.useEffect(()=>{const i=d.current,e=R.current;if(!i||!e)return;let r=!1,t=null,o=null,n=null;const s=()=>{P.current||(P.current=!0,M==null||M(w))},u=$(async()=>{var l,h;try{const p=await B(()=>import("./hexFlowBallsEngine-Bzfny-m0.js"),[]);if(r)return;t=p.createHexFlowBallsEngine(e,g),x.current=t;const y=()=>z(i,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),(h=t.start)==null||h.call(t),s(),o=new ResizeObserver(()=>{var S;y(),(S=t.renderStatic)==null||S.call(t)}),o.observe(i),"IntersectionObserver"in window&&(n=new IntersectionObserver(S=>{var I,j;for(const E of S)E.isIntersecting?(I=t.start)==null||I.call(t):(j=t.stop)==null||j.call(t)},{threshold:.25}),n.observe(i))}catch{s()}},{timeoutMs:220});return()=>{var l;r=!0,u==null||u(),n==null||n.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),x.current=null}},[g,M,w]),c.useEffect(()=>{var e,r,t;const i=x.current;if(i){if(m){(e=i.clearPointer)==null||e.call(i),(r=i.stop)==null||r.call(i);return}(t=i.start)==null||t.call(i)}},[m]);const k=i=>{const e=d.current;if(!e)return{x:.5,y:.5};const r=e.getBoundingClientRect();return{x:r.width>0?(i.clientX-r.left)/r.width:.5,y:r.height>0?(i.clientY-r.top)/r.height:.5}},v=()=>{var i,e,r,t;(e=(i=x.current)==null?void 0:i.burst)==null||e.call(i),(t=(r=x.current)==null?void 0:r.start)==null||t.call(r)},f=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),v())};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:m,onClick:m?void 0:v,onPointerDown:m?void 0:(i=>{var r,t;a.current=i.pointerId;try{i.currentTarget.setPointerCapture(i.pointerId)}catch{}const e=k(i);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerMove:m?void 0:(i=>{var r,t;if(a.current!=null&&i.pointerId!==a.current)return;const e=k(i);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onPointerUp:m?void 0:(i=>{a.current!=null&&i.pointerId!==a.current||(a.current=null)}),onPointerCancel:m?void 0:(()=>{var i,e;a.current=null,(e=(i=x.current)==null?void 0:i.clearPointer)==null||e.call(i)}),onMouseMove:m?void 0:(i=>{var r,t;const e=k(i);(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,e.x,e.y)}),onMouseLeave:m?void 0:(()=>{var i,e;a.current=null,(e=(i=x.current)==null?void 0:i.clearPointer)==null||e.call(i)}),onBlur:m?void 0:(()=>{var i,e;a.current=null,(e=(i=x.current)==null?void 0:i.clearPointer)==null||e.call(i)}),onKeyDown:m?void 0:f,children:[b.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function We({readyId:w,locked:m,onReady:M}){const d=c.useRef(null),R=c.useRef(null),x=c.useRef(null),P=c.useRef(!1),a=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=c.useMemo(()=>({seed:20250416,reduceMotion:a,step:6,side:5}),[a]);c.useEffect(()=>{const f=d.current,i=R.current;if(!f||!i)return;let e=!1,r=null,t=null,o=null;const n=()=>{P.current||(P.current=!0,M==null||M(w))},s=$(async()=>{var u,l;try{const h=await B(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;r=h.createPixelPlopEngine(i,C),x.current=r;const p=()=>z(f,r,Math.min(1.5,window.devicePixelRatio||1));p(),(u=r.renderStatic)==null||u.call(r),(l=r.start)==null||l.call(r),n(),t=new ResizeObserver(()=>{var y;p(),(y=r.reset)==null||y.call(r)}),t.observe(f),"IntersectionObserver"in window&&(o=new IntersectionObserver(y=>{var S,I;for(const j of y)j.isIntersecting?(S=r.start)==null||S.call(r):(I=r.stop)==null||I.call(r)},{threshold:.25}),o.observe(f))}catch{n()}},{timeoutMs:220});return()=>{var u;e=!0,s==null||s(),o==null||o.disconnect(),t==null||t.disconnect(),(u=r==null?void 0:r.destroy)==null||u.call(r),x.current=null}},[C,M,w]),c.useEffect(()=>{var i,e,r;const f=x.current;if(f){if(m){(i=f.clearPointer)==null||i.call(f),(e=f.stop)==null||e.call(f);return}(r=f.start)==null||r.call(f)}},[m]),c.useEffect(()=>{var i,e;const f=x.current;if(f){if(m){(i=f.stop)==null||i.call(f);return}(e=f.start)==null||e.call(f)}},[m]);const g=()=>{var f,i,e,r;(i=(f=x.current)==null?void 0:f.seedBurst)==null||i.call(f),(r=(e=x.current)==null?void 0:e.start)==null||r.call(e)},k=f=>{var r,t,o,n;const i=R.current||d.current;if(!i||typeof(f==null?void 0:f.clientX)!="number"||typeof(f==null?void 0:f.clientY)!="number"){g();return}const e=i.getBoundingClientRect();(t=(r=x.current)==null?void 0:r.burstAt)==null||t.call(r,f.clientX-e.left,f.clientY-e.top),(n=(o=x.current)==null?void 0:o.start)==null||n.call(o)},v=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g())};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:m,onPointerDown:m?void 0:(f=>{f.button!=null&&f.button!==0||k(f)}),onKeyDown:m?void 0:v,children:[b.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function et({readyId:w,locked:m,onReady:M}){const d=c.useRef(null),R=c.useRef(null),x=c.useRef(null),P=c.useRef(!1),a=c.useRef(null),C=c.useRef(!1),g=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=c.useMemo(()=>({reduceMotion:g,seed:20250417}),[g]);c.useEffect(()=>{const e=d.current,r=R.current;if(!e||!r)return;let t=!1,o=null,n=null,s=null;const u=()=>{P.current||(P.current=!0,M==null||M(w))},l=$(async()=>{var h,p;try{const y=await B(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(t)return;o=y.createJuliaLinesEngine(r,k),x.current=o;const S=()=>z(e,o,Math.min(1.5,window.devicePixelRatio||1));S(),(h=o.renderStatic)==null||h.call(o),(p=o.start)==null||p.call(o),u(),n=new ResizeObserver(()=>{S()}),n.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var j,E;for(const _ of I)_.isIntersecting?(j=o.start)==null||j.call(o):(E=o.stop)==null||E.call(o)},{threshold:.25}),s.observe(e))}catch{u()}},{timeoutMs:220});return()=>{var h;t=!0,l==null||l(),s==null||s.disconnect(),n==null||n.disconnect(),(h=o==null?void 0:o.destroy)==null||h.call(o),x.current=null}},[k,M,w]),c.useEffect(()=>{var r,t,o,n;const e=x.current;if(e){if(m){(r=e.setHeld)==null||r.call(e,!1),(t=e.clearPointer)==null||t.call(e),(o=e.stop)==null||o.call(e);return}(n=e.start)==null||n.call(e)}},[m]),c.useEffect(()=>{var r,t,o;const e=x.current;if(e){if(m){(r=e.clearPointer)==null||r.call(e),(t=e.stop)==null||t.call(e);return}(o=e.start)==null||o.call(e)}},[m]);const v=e=>{const r=d.current;if(!r)return{x:.4,y:.5};const t=r.getBoundingClientRect(),o=(e.clientX-t.left)/Math.max(1,t.width),n=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,o)),y:Math.max(0,Math.min(1,n))}},f=()=>{var e,r,t,o;(r=(e=x.current)==null?void 0:e.reset)==null||r.call(e),(o=(t=x.current)==null?void 0:t.start)==null||o.call(t)},i=e=>{var t,o,n,s,u,l,h,p;const r=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(o=(t=x.current)==null?void 0:t.nudge)==null||o.call(t,0,-r)):e.key==="ArrowDown"?(e.preventDefault(),(s=(n=x.current)==null?void 0:n.nudge)==null||s.call(n,0,r)):e.key==="ArrowLeft"?(e.preventDefault(),(l=(u=x.current)==null?void 0:u.nudge)==null||l.call(u,-r,0)):e.key==="ArrowRight"?(e.preventDefault(),(p=(h=x.current)==null?void 0:h.nudge)==null||p.call(h,r,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),f())};return b.jsxs("div",{ref:d,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:m?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:m?void 0:e=>{var o,n;const r=d.current;if(!r)return;C.current=!0,a.current=e.pointerId;try{r.setPointerCapture(e.pointerId)}catch{}const t=v(e);(n=(o=x.current)==null?void 0:o.setPointer)==null||n.call(o,t.x,t.y)},onPointerMove:m?void 0:e=>{var t,o;if(C.current&&a.current!=null&&e.pointerId!==a.current)return;const r=v(e);(o=(t=x.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)},onPointerUp:m?void 0:e=>{var r,t;a.current!=null&&e.pointerId!==a.current||(C.current=!1,a.current=null,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r))},onPointerCancel:m?void 0:()=>{var e,r;C.current=!1,a.current=null,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)},onMouseMove:m?void 0:e=>{var t,o;const r=v(e);(o=(t=x.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)},onMouseLeave:m?void 0:(()=>{var e,r;(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:m?void 0:(()=>{var e,r;(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:m?void 0:i,onClick:m?void 0:f,children:[b.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function tt({readyId:w,locked:m,onReady:M}){const[d,R]=c.useState(0),[x,P]=c.useState("mine"),[a,C]=c.useState(()=>new Set),[g,k]=c.useState(()=>new Set),[v,f]=c.useState("playing"),[i,e]=c.useState(null),[r,t]=c.useState(0),o=c.useMemo(()=>Ee(),[d]);c.useEffect(()=>{M==null||M(w)},[M,w]),c.useEffect(()=>{P("mine"),C(new Set),k(new Set),f("playing"),e(null),t(0)},[d]),c.useEffect(()=>{if(i==null||v!=="playing")return;const p=()=>{t(Math.min(5999,Math.floor((Date.now()-i)/1e3)))};p();const y=window.setInterval(p,1e3);return()=>{window.clearInterval(y)}},[i,v]);const n=()=>{R(p=>p+1)},s=p=>{if(m||v!=="playing")return;if(i==null&&e(Date.now()),x==="flag"){if(a.has(p))return;const S=new Set(g);S.has(p)?S.delete(p):S.add(p),k(S),de(o,a,S)&&f("won");return}if(g.has(p)||a.has(p))return;if(o.mines.has(p)){const S=new Set(a);for(const I of o.mines)S.add(I);S.add(p),C(S),f("lost");return}const y=_e(p,o,a,g);C(y),de(o,y,g)&&f("won")},u=o.mineCount-g.size,l=`${String(Math.floor(r/60)).padStart(2,"0")}:${String(r%60).padStart(2,"0")}`;let h="🤔";return v==="lost"?h="😣":v==="won"?h="😎":g.size>=o.mineCount?h="😕":g.size>=o.mineCount-1?h="🤓":g.size>=Math.round(o.mineCount*3/4)?h="😃":g.size>=Math.round(o.mineCount*2/3)?h="😊":g.size>=Math.round(o.mineCount/2)?h="🙂":g.size>=Math.round(o.mineCount/3)?h="😏":g.size>0&&(h="😐"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:b.jsxs("div",{className:"article-web-art-minesweeper",children:[b.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[b.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${x==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("mine"),disabled:m||v!=="playing","aria-pressed":x==="mine",children:"⛏"}),b.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${x==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("flag"),disabled:m||v!=="playing","aria-pressed":x==="flag",children:"🚩"})]}),b.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[o.counts.map((p,y)=>{const S=a.has(y),I=g.has(y),j=o.mines.has(y),E=v==="lost"&&j,_=p>0?Ne[p-1]:void 0;return b.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${S?"article-web-art-minesweeper-cell-revealed":""} ${E?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>s(y),disabled:m||v!=="playing","aria-label":`Minesweeper cell ${y+1}`,children:[I&&!S?b.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,E?b.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,S&&!j&&p>0?b.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:p}):null]},`mine-${d}-${y}`)}),v==="lost"?b.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:n,children:["Ooohhh 🙁",b.jsx("br",{}),"Click to try again"]}):null,v==="won"?b.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:n,children:["👌👀✔💯💯💯",b.jsx("br",{}),"Click to restart"]}):null]}),b.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[b.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[b.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:h}),b.jsx("span",{children:u})]}),b.jsx("div",{className:"article-web-art-minesweeper-timer",children:l})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function rt({readyId:w,locked:m,onReady:M}){const d=c.useRef(null),R=c.useRef(null),x=c.useRef(null),P=c.useRef(!1),a=c.useRef(null),C=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=c.useMemo(()=>({reduceMotion:C}),[C]);c.useEffect(()=>{const i=d.current,e=R.current;if(!i||!e)return;let r=!1,t=null,o=null,n=null;const s=()=>{P.current||(P.current=!0,M==null||M(w))},u=$(async()=>{var l,h;try{const p=await B(()=>import("./fallingRingsEngine-CgfU8E0P.js"),[]);if(r)return;t=p.createFallingRingsEngine(e,g),x.current=t;const y=()=>z(i,t,Math.min(1.5,window.devicePixelRatio||1));y(),(l=t.renderStatic)==null||l.call(t),(h=t.start)==null||h.call(t),s(),o=new ResizeObserver(()=>{y()}),o.observe(i),"IntersectionObserver"in window&&(n=new IntersectionObserver(S=>{var I,j;for(const E of S)E.isIntersecting?(I=t.start)==null||I.call(t):(j=t.stop)==null||j.call(t)},{threshold:.25}),n.observe(i))}catch{s()}},{timeoutMs:220});return()=>{var l;r=!0,u==null||u(),n==null||n.disconnect(),o==null||o.disconnect(),(l=t==null?void 0:t.destroy)==null||l.call(t),x.current=null}},[g,M,w]);const k=i=>{var e,r,t,o;(r=(e=x.current)==null?void 0:e.setHeld)==null||r.call(e,i),(o=(t=x.current)==null?void 0:t.start)==null||o.call(t)},v=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),k(!0))},f=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),k(!1))};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:m,onPointerDown:m?void 0:i=>{a.current=i.pointerId;try{i.currentTarget.setPointerCapture(i.pointerId)}catch{}k(!0)},onPointerUp:m?void 0:i=>{a.current!=null&&i.pointerId!==a.current||(a.current=null,k(!1))},onPointerCancel:m?void 0:()=>{a.current=null,k(!1)},onLostPointerCapture:m?void 0:()=>{a.current=null,k(!1)},onMouseLeave:m?void 0:(()=>{a.current!=null&&k(!1)}),onBlur:m?void 0:(()=>{a.current=null,k(!1)}),onKeyDown:m?void 0:v,onKeyUp:m?void 0:f,children:[b.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function nt({readyId:w,locked:m,onReady:M}){const d=c.useRef(null),R=c.useRef(null),x=c.useRef(null),P=c.useRef(!1),a=c.useRef(null),C=c.useRef("mouse"),g=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=c.useMemo(()=>({reduceMotion:g,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[g]);c.useEffect(()=>{const f=d.current,i=R.current;if(!f||!i)return;let e=!1,r=null,t=null,o=null;const n=()=>{P.current||(P.current=!0,M==null||M(w))},s=$(async()=>{var u,l;try{const h=await B(()=>import("./prismFieldEngine-C_dFOJLi.js"),__vite__mapDeps([7,1]));if(e)return;r=h.createPrismFieldEngine(i,k),x.current=r;const p=()=>z(f,r,Math.min(1.5,window.devicePixelRatio||1));p(),(u=r.renderStatic)==null||u.call(r),(l=r.start)==null||l.call(r),n(),t=new ResizeObserver(()=>{p()}),t.observe(f),"IntersectionObserver"in window&&(o=new IntersectionObserver(y=>{var S,I;for(const j of y)j.isIntersecting?(S=r.start)==null||S.call(r):(I=r.stop)==null||I.call(r)},{threshold:.25}),o.observe(f))}catch{n()}},{timeoutMs:220});return()=>{var u;e=!0,s==null||s(),o==null||o.disconnect(),t==null||t.disconnect(),(u=r==null?void 0:r.destroy)==null||u.call(r),x.current=null}},[k,M,w]);const v=f=>{const i=d.current;if(!i)return{x:.5,y:.5};const e=i.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(f.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(f.clientY-e.top)/Math.max(1,e.height)))}};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:m,onClick:m?void 0:(()=>{var f,i,e,r;(i=(f=x.current)==null?void 0:f.reset)==null||i.call(f),(r=(e=x.current)==null?void 0:e.start)==null||r.call(e)}),onPointerDown:m?void 0:f=>{var e,r;a.current=f.pointerId,C.current=f.pointerType||"mouse";try{f.currentTarget.setPointerCapture(f.pointerId)}catch{}const i=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,i.x,i.y)},onPointerMove:m?void 0:f=>{var e,r;if(a.current!=null&&f.pointerId!==a.current)return;const i=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,i.x,i.y)},onPointerUp:m?void 0:f=>{var i,e;a.current!=null&&f.pointerId!==a.current||(a.current=null,(f.pointerType||C.current)==="mouse"&&((e=(i=x.current)==null?void 0:i.clearPointer)==null||e.call(i)))},onPointerCancel:m?void 0:(()=>{var f,i;a.current=null,C.current==="mouse"&&((i=(f=x.current)==null?void 0:f.clearPointer)==null||i.call(f))}),onMouseMove:m?void 0:f=>{var e,r;const i=v(f);(r=(e=x.current)==null?void 0:e.setPointer)==null||r.call(e,i.x,i.y)},onMouseLeave:m?void 0:(()=>{var f,i;a.current=null,(i=(f=x.current)==null?void 0:f.clearPointer)==null||i.call(f)}),onBlur:m?void 0:(()=>{var f,i;a.current=null,C.current="mouse",(i=(f=x.current)==null?void 0:f.clearPointer)==null||i.call(f)}),onKeyDown:m?void 0:(f=>{var i,e,r,t;(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),(e=(i=x.current)==null?void 0:i.reset)==null||e.call(i),(t=(r=x.current)==null?void 0:r.start)==null||t.call(r))}),children:[b.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function st({readyId:w,locked:m,onReady:M}){const d=c.useRef(null),R=c.useRef(null),x=c.useRef(null),P=c.useRef(!1),a=c.useRef(null),C=c.useRef(null),g=c.useRef(!1),k=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=c.useMemo(()=>({reduceMotion:k}),[k]);c.useEffect(()=>{const e=d.current,r=R.current;if(!e||!r)return;let t=!1,o=null,n=null,s=null;const u=()=>{P.current||(P.current=!0,M==null||M(w))},l=$(async()=>{var h,p;try{const y=await B(()=>import("./ropeLightEngine-ZZGO6u7c.js"),[]);if(t)return;o=y.createRopeLightEngine(r,v),x.current=o;const S=()=>z(e,o,Math.min(1.5,window.devicePixelRatio||1));S(),(h=o.renderStatic)==null||h.call(o),(p=o.start)==null||p.call(o),u(),n=new ResizeObserver(()=>{S()}),n.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var j,E;for(const _ of I)_.isIntersecting?(j=o.start)==null||j.call(o):(E=o.stop)==null||E.call(o)},{threshold:.25}),s.observe(e))}catch{u()}},{timeoutMs:220});return()=>{var h;t=!0,l==null||l(),s==null||s.disconnect(),n==null||n.disconnect(),(h=o==null?void 0:o.destroy)==null||h.call(o),x.current=null}},[v,M,w]);const f=e=>{const r=d.current;if(!r)return{x:.5,y:.5};const t=r.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}},i=e=>{var t,o,n,s;if(g.current){g.current=!1;return}const r=e?f(e):{x:.5,y:.18};(o=(t=x.current)==null?void 0:t.toggleHangAt)==null||o.call(t,r.x,r.y),(s=(n=x.current)==null?void 0:n.start)==null||s.call(n)};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:m,onClick:m?void 0:i,onPointerDown:m?void 0:e=>{var r,t;a.current=e.pointerId,g.current=!1,C.current=f(e);try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}(t=(r=x.current)==null?void 0:r.setPointer)==null||t.call(r,C.current.x,C.current.y)},onPointerMove:m?void 0:e=>{var o,n;if(a.current!=null&&e.pointerId!==a.current)return;const r=f(e),t=C.current;t&&Math.hypot(r.x-t.x,r.y-t.y)>.025&&(g.current=!0),(n=(o=x.current)==null?void 0:o.setPointer)==null||n.call(o,r.x,r.y)},onPointerUp:m?void 0:e=>{var r,t;if(!(a.current!=null&&e.pointerId!==a.current)){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}a.current=null,C.current=null,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r)}},onPointerCancel:m?void 0:(e=>{var r,t;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}a.current=null,C.current=null,g.current=!1,(t=(r=x.current)==null?void 0:r.clearPointer)==null||t.call(r)}),onMouseMove:m?void 0:e=>{var t,o;const r=f(e);(o=(t=x.current)==null?void 0:t.setPointer)==null||o.call(t,r.x,r.y)},onMouseLeave:m?void 0:(()=>{var e,r;a.current=null,C.current=null,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onBlur:m?void 0:(()=>{var e,r;a.current=null,C.current=null,g.current=!1,(r=(e=x.current)==null?void 0:e.clearPointer)==null||r.call(e)}),onKeyDown:m?void 0:(e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),i())}),children:[b.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}const it=["rotateX(270deg) translateZ(0.5em)","rotateY(0deg) translateZ(0.5em)","rotateY(90deg) translateZ(0.5em)","rotateY(180deg) translateZ(0.5em)","rotateY(270deg) translateZ(0.5em)","rotateX(90deg) translateZ(0.5em)"],be=Array.from({length:28},(w,m)=>m);function ot(){return b.jsx("div",{className:"article-web-art-soup-backdrop","aria-hidden":!0,children:be.map(w=>b.jsx("div",{className:"article-web-art-soup-cube",style:{animationDelay:`${w*.06}s`,fontSize:`${w+1}em`,"--soup-cube-depth":`${w/Math.max(1,be.length-1)}`},children:it.map((m,M)=>b.jsx("span",{className:"article-web-art-soup-face",style:{transform:m}},M))},w))})}function at({readyId:w,locked:m,onReady:M}){const d=c.useRef(null),R=c.useRef(null),x=c.useRef(null),P=c.useRef(!1),a=c.useRef(null),C=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=c.useMemo(()=>({reduceMotion:C}),[C]);c.useEffect(()=>{const v=d.current,f=R.current;if(!v||!f)return;let i=!1,e=null,r=null,t=null;const o=()=>{P.current||(P.current=!0,M==null||M(w))},n=$(async()=>{var s,u;try{const l=await B(()=>import("./soupShaderEngine-Bv-83sLo.js"),__vite__mapDeps([8,1]));if(i)return;e=l.createSoupShaderEngine(f,g),x.current=e;const h=()=>z(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(s=e.renderStatic)==null||s.call(e),(u=e.start)==null||u.call(e),o(),r=new ResizeObserver(()=>{h()}),r.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(p=>{var y,S;for(const I of p)I.isIntersecting?(y=e.start)==null||y.call(e):(S=e.stop)==null||S.call(e)},{threshold:.25}),t.observe(v))}catch{o()}},{timeoutMs:220});return()=>{var s;i=!0,n==null||n(),t==null||t.disconnect(),r==null||r.disconnect(),(s=e==null?void 0:e.destroy)==null||s.call(e),x.current=null}},[g,M,w]);const k=v=>{const f=d.current;if(!f)return{x:.5,y:.5};const i=f.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(v.clientX-i.left)/Math.max(1,i.width))),y:Math.max(0,Math.min(1,(v.clientY-i.top)/Math.max(1,i.height)))}};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile","aria-label":"Soup shader web art tile",disabled:m,onPointerDown:m?void 0:v=>{var i,e,r,t;a.current=v.pointerId;try{v.currentTarget.setPointerCapture(v.pointerId)}catch{}const f=k(v);(e=(i=x.current)==null?void 0:i.setPointer)==null||e.call(i,f.x,f.y),(t=(r=x.current)==null?void 0:r.setHeld)==null||t.call(r,!0)},onPointerMove:m?void 0:v=>{var i,e;if(a.current!=null&&v.pointerId!==a.current)return;const f=k(v);(e=(i=x.current)==null?void 0:i.setPointer)==null||e.call(i,f.x,f.y)},onPointerUp:m?void 0:v=>{var f,i;a.current!=null&&v.pointerId!==a.current||(a.current=null,(i=(f=x.current)==null?void 0:f.setHeld)==null||i.call(f,!1))},onPointerCancel:m?void 0:(()=>{var v,f;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1)}),onMouseMove:m?void 0:v=>{var i,e;const f=k(v);(e=(i=x.current)==null?void 0:i.setPointer)==null||e.call(i,f.x,f.y)},onMouseLeave:m?void 0:(()=>{var v,f,i,e;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(i=x.current)==null?void 0:i.clearPointer)==null||e.call(i)}),onBlur:m?void 0:(()=>{var v,f,i,e;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(i=x.current)==null?void 0:i.clearPointer)==null||e.call(i)}),children:[b.jsx(ot,{}),b.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function ct({readyId:w,locked:m,onReady:M}){const d=c.useRef(null),R=c.useRef(null),x=c.useRef(null),P=c.useRef(!1),a=c.useRef(null),C=c.useRef(null),g=c.useRef(0),[k,v]=c.useState(!1),[f,i]=c.useState([]),e=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),r=c.useMemo(()=>({reduceMotion:e}),[e]);c.useEffect(()=>{const s=d.current,u=R.current;if(!s||!u)return;let l=!1,h=null,p=null,y=null;const S=()=>{P.current||(P.current=!0,M==null||M(w))},I=$(async()=>{var j,E;try{const _=await B(()=>import("./tardisWormholeEngine-BwhuWVx_.js"),__vite__mapDeps([9,1]));if(l)return;h=_.createTardisWormholeEngine(u,r),x.current=h;const L=()=>z(s,h,Math.min(1.5,window.devicePixelRatio||1));L(),(j=h.renderStatic)==null||j.call(h),(E=h.start)==null||E.call(h),S(),p=new ResizeObserver(()=>{L()}),p.observe(s),"IntersectionObserver"in window&&(y=new IntersectionObserver(A=>{var O,K;for(const Y of A)Y.isIntersecting?(O=h.start)==null||O.call(h):(K=h.stop)==null||K.call(h)},{threshold:.25}),y.observe(s))}catch{S()}},{timeoutMs:220});return()=>{var j;l=!0,I==null||I(),y==null||y.disconnect(),p==null||p.disconnect(),(j=h==null?void 0:h.destroy)==null||j.call(h),x.current=null}},[r,M,w]),c.useEffect(()=>{if(f.length===0)return;const s=window.setTimeout(()=>{i(u=>u.slice(1))},1e3);return()=>{window.clearTimeout(s)}},[f]),c.useEffect(()=>{var u,l,h;const s=x.current;if(s){if(m){v(!1),C.current=null,(u=s.clearPointer)==null||u.call(s),(l=s.stop)==null||l.call(s);return}(h=s.start)==null||h.call(s)}},[m]);const t=s=>{const u=d.current,l=R.current||u;if(!u||!l)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const h=l.getBoundingClientRect(),p=u.getBoundingClientRect(),y=Math.max(0,Math.min(p.width,s.clientX-p.left)),S=Math.max(0,Math.min(p.height,s.clientY-p.top)),I=Math.max(0,Math.min(h.width,s.clientX-h.left)),j=Math.max(0,Math.min(h.height,s.clientY-h.top)),E=C.current,_=E?I-E.px:0,L=E?j-E.py:0;return C.current={px:I,py:j},{x:h.width>0?I/h.width:.5,y:h.height>0?j/h.height:.5,px:y,py:S,dx:_,dy:L}},o=(s,u)=>{const l=g.current++;i(h=>[...h,{id:l,x:s,y:u}])},n=s=>{var l,h,p,y;const u=t(s);o(u.px,u.py),(h=(l=x.current)==null?void 0:l.boost)==null||h.call(l),(y=(p=x.current)==null?void 0:p.start)==null||y.call(p),v(!0),window.setTimeout(()=>{v(!1)},650)};return b.jsxs("button",{type:"button",ref:d,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${k?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:m,onClick:m?void 0:n,onContextMenu:m?void 0:(s=>{var l,h,p,y;s.preventDefault();const u=t(s);o(u.px,u.py),(h=(l=x.current)==null?void 0:l.reverseBurst)==null||h.call(l),(y=(p=x.current)==null?void 0:p.start)==null||y.call(p)}),onWheel:m?void 0:(s=>{var u,l;(l=(u=x.current)==null?void 0:u.addScrollBoost)==null||l.call(u,s.deltaY*.003)}),onPointerDown:m?void 0:s=>{var l,h;a.current=s.pointerId;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}const u=t(s);(h=(l=x.current)==null?void 0:l.setPointer)==null||h.call(l,u.x,u.y,u.dx,u.dy)},onPointerMove:m?void 0:s=>{var l,h,p,y;if(a.current!=null&&s.pointerId!==a.current)return;const u=t(s);(h=(l=x.current)==null?void 0:l.setPointer)==null||h.call(l,u.x,u.y,u.dx,u.dy),(s.buttons&1)===1&&((y=(p=x.current)==null?void 0:p.drag)==null||y.call(p,u.dx))},onPointerUp:m?void 0:s=>{a.current!=null&&s.pointerId!==a.current||(a.current=null)},onPointerCancel:m?void 0:(()=>{a.current=null}),onMouseMove:m?void 0:s=>{var l,h;const u=t(s);(h=(l=x.current)==null?void 0:l.setPointer)==null||h.call(l,u.x,u.y,u.dx,u.dy)},onMouseLeave:m?void 0:(()=>{var s,u;a.current=null,C.current=null,(u=(s=x.current)==null?void 0:s.clearPointer)==null||u.call(s)}),onBlur:m?void 0:(()=>{var s,u;a.current=null,C.current=null,(u=(s=x.current)==null?void 0:s.clearPointer)==null||u.call(s)}),onKeyDown:m?void 0:(s=>{var u,l,h,p;(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),(l=(u=x.current)==null?void 0:u.boost)==null||l.call(u),(p=(h=x.current)==null?void 0:h.start)==null||p.call(h))}),children:[b.jsx("canvas",{ref:R,className:"article-web-art-canvas"}),b.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),f.map(s=>b.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${s.x}px`,top:`${s.y}px`},"aria-hidden":!0},s.id)),b.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function lt({label:w,clickLabel:m,previewRequested:M=!1}){const d=me(),R=c.useRef(null),[x,P]=c.useState(!1),[a,C]=c.useState(0),g=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=c.useCallback(()=>{C(Date.now()),P(!0)},[]),v=c.useCallback(()=>{d.navigateToSectionWithId("contact")},[d]),f=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),k())},i=c.useMemo(()=>x?Te({seed:`${a||Date.now()}:${w}`,reduceMotion:g}):"",[w,x,a,g]);return c.useEffect(()=>{let e=0,r=0;return M?(e=window.requestAnimationFrame(()=>{r=window.requestAnimationFrame(()=>{C(Date.now()),P(!0)})}),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)}):(P(!1),()=>{e&&window.cancelAnimationFrame(e),r&&window.cancelAnimationFrame(r)})},[M]),b.jsxs("div",{ref:R,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${x?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":x?"Kontakt preview":w,"aria-pressed":x,onClick:k,onKeyDown:f,children:[b.jsxs("div",{className:`article-web-art-tile-cta-preview ${x?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[x&&b.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:i,sandbox:"allow-scripts"},`${a}-${w}`),b.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!x&&b.jsx("div",{className:`loader ${g?"loader-reduce-motion":""}`,"aria-hidden":!0,children:b.jsxs("div",{className:"loader-inner",children:[b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})})]})}),b.jsxs("div",{className:`article-web-art-tile-cta-content ${x?"article-web-art-tile-cta-content-hidden":""}`,children:[b.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:w}),b.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:m})]}),x&&b.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),v()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),v())},children:"Kontakt"})]})}function ut({locked:w=!1}){const m=c.useRef(null),M=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),d=c.useRef(!1),R=c.useRef(0),x=c.useRef(null),P=c.useRef(null),a=c.useRef(1),C=c.useRef(null),g=c.useRef(null),k=c.useRef(null);return c.useEffect(()=>{const v=m.current;if(!v)return;const f=p=>{const y=Math.max(0,Math.min(1,p));return y*y*(3-2*y)},i=()=>{const p=v.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),y=[];for(const S of p){const I=S.getAnimations?S.getAnimations():[];for(const j of I)y.push(j)}return y},e=p=>{const y=Math.max(1,Math.min(5.2,Number(p)||1));a.current=y;const S=i();for(const I of S)I.playbackRate=y},r=()=>{g.current!=null&&cancelAnimationFrame(g.current),k.current!=null&&window.clearTimeout(k.current),g.current=null,k.current=null},t=()=>{r(),e(5.2),k.current=window.setTimeout(()=>{const p=a.current,y=performance.now(),S=320,I=()=>{const j=(performance.now()-y)/S,E=f(j);e(p+(1-p)*E),j<1?g.current=requestAnimationFrame(I):g.current=null};g.current=requestAnimationFrame(I),k.current=null},2e3)},o=()=>{d.current=!1,x.current=null,v.classList.remove("article-web-art-tile-goldfish-held"),P.current!=null&&cancelAnimationFrame(P.current),P.current=null;const p=a.current,y=360,S=performance.now();C.current!=null&&cancelAnimationFrame(C.current);const I=()=>{const j=(performance.now()-S)/y,E=f(j);e(p+(1-p)*E),j<1?C.current=requestAnimationFrame(I):C.current=null};C.current=requestAnimationFrame(I)},n=()=>{if(!d.current)return;const p=performance.now()-R.current,y=1.2+4*f(p/2400);e(y),P.current=requestAnimationFrame(n)},s=p=>{if(!(M||w)&&!(p.button!=null&&p.button!==0)){r(),d.current=!0,R.current=performance.now(),x.current=p.pointerId,v.classList.add("article-web-art-tile-goldfish-held");try{v.setPointerCapture(p.pointerId)}catch{}C.current!=null&&(cancelAnimationFrame(C.current),C.current=null),P.current==null&&(P.current=requestAnimationFrame(n))}},u=()=>{const p=performance.now()-R.current;o(),p<220&&t()},l=()=>{o()},h=()=>{o()};return v.addEventListener("pointerdown",s),v.addEventListener("pointerup",u),v.addEventListener("pointercancel",l),v.addEventListener("lostpointercapture",h),()=>{v.removeEventListener("pointerdown",s),v.removeEventListener("pointerup",u),v.removeEventListener("pointercancel",l),v.removeEventListener("lostpointercapture",h),o(),r(),C.current!=null&&cancelAnimationFrame(C.current),C.current=null}},[w,M]),c.useEffect(()=>{const v=m.current;v&&v.classList.toggle("article-web-art-tile-goldfish-locked",w)},[w]),b.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:m,role:"img","aria-label":"Goldfish animation tile",children:[b.jsx("div",{className:"fish-stage",children:b.jsx("div",{className:"fish-wrapper",children:b.jsx("div",{className:"fish-container",children:b.jsxs("div",{className:"fish-parts",children:[b.jsx("div",{className:"fish-body front"}),b.jsx("div",{className:"fish-body back"}),b.jsx("div",{className:"fish-back-bottom-fin front"}),b.jsx("div",{className:"fish-back-bottom-fin back"}),b.jsx("div",{className:"fish-back-fin"}),b.jsx("div",{className:"fish-front-bottom-fin front"}),b.jsx("div",{className:"fish-front-bottom-fin back"}),b.jsx("div",{className:"fish-top-fin"})]})})})}),b.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function dt({locked:w=!1}){const m=c.useRef(null),M=c.useRef([]),d=c.useRef(0),R=c.useRef(0),x=je,P=c.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return c.useEffect(()=>{const a=m.current;if(!a)return;const C=M.current.filter(Boolean);if(!C.length)return;let g=!0,k=!1,v=null,f=null;const i=(p,y)=>{const S=(p-.5)*30;for(let I=0;I<C.length;I++){const j=C[I],E=I*18,_=I*8,L=(p-.5)*E,A=(y-.5)*_;j.style.transform=`translate3d(${L}px, ${A}px, 0) rotateY(${S}deg)`}},e=(p,y)=>{const S=Math.max(-.55,Math.min(.55,(p-.5)*1.1)),I=Math.max(-.35,Math.min(.35,(y-.5)*.7));i(.5+S,.5+I)},r=p=>{const y=a.getBoundingClientRect(),S=(p.clientX-y.left)/Math.max(1,y.width),I=(p.clientY-y.top)/Math.max(1,y.height);g=!0,R.current=performance.now()+650,e(Math.max(0,Math.min(1,S)),Math.max(0,Math.min(1,I)))},t=p=>{const y=a.getBoundingClientRect(),S=(p.clientX-y.left)/Math.max(1,y.width),I=(p.clientY-y.top)/Math.max(1,y.height);return{x:Math.max(0,Math.min(1,S)),y:Math.max(0,Math.min(1,I))}},o=p=>{if(p.pointerType==="mouse")return;k=!0,v=p.pointerId,g=!0,R.current=performance.now()+900;const y=t(p);e(y.x,y.y),!P&&f==null&&(f=requestAnimationFrame(h))},n=p=>{if(!k||v!=null&&p.pointerId!==v)return;g=!0,R.current=performance.now()+900;const y=t(p);e(y.x,y.y)},s=p=>{v!=null&&(p==null?void 0:p.pointerId)!=null&&p.pointerId!==v||(k=!1,v=null,g=!0,!P&&f==null&&(f=requestAnimationFrame(h)))},u=()=>{g=!0,!P&&f==null&&(f=requestAnimationFrame(h))},l=()=>{g=!0,!P&&f==null&&(f=requestAnimationFrame(h))},h=()=>{if(g){if(!P&&performance.now()>=R.current){d.current+=.008;const p=Math.sin(d.current)*.5+.5;e(p,.5)}f=requestAnimationFrame(h)}};return g=!w,a.addEventListener("mouseenter",u),a.addEventListener("mousemove",r),a.addEventListener("mouseleave",l),a.addEventListener("pointerdown",o),a.addEventListener("pointermove",n),a.addEventListener("pointerup",s),a.addEventListener("pointercancel",s),e(.5,.5),!P&&!w&&(f=requestAnimationFrame(h)),()=>{a.removeEventListener("mouseenter",u),a.removeEventListener("mousemove",r),a.removeEventListener("mouseleave",l),a.removeEventListener("pointerdown",o),a.removeEventListener("pointermove",n),a.removeEventListener("pointerup",s),a.removeEventListener("pointercancel",s),f!=null&&cancelAnimationFrame(f)}},[P]),b.jsxs("div",{ref:m,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[b.jsxs("div",{className:"patronus-card",children:[b.jsx("div",{className:"patronus-layer patronus-bg",ref:a=>{M.current[0]=a},children:b.jsx("img",{alt:"",src:x[0]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{M.current[1]=a},children:b.jsx("img",{alt:"",src:x[1]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{M.current[2]=a},children:b.jsx("img",{alt:"",src:x[2]})}),b.jsx("div",{className:"patronus-layer patronus-svg",ref:a=>{M.current[3]=a},dangerouslySetInnerHTML:{__html:Ce}}),b.jsx("div",{className:"patronus-layer",ref:a=>{M.current[4]=a},children:b.jsx("img",{alt:"",src:x[3]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{M.current[5]=a},children:b.jsx("img",{alt:"",src:x[4]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{M.current[6]=a},children:b.jsx("img",{alt:"",src:x[5]})})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{xt as default};
