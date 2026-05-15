const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/androidBackgroundEngine-BgHFFw8C.js","assets/three-Cmtw-h9o.js","assets/hourglassEngine-Dxe9DVtS.js","assets/vendor-BUjjXRU6.js","assets/react-vendor-D1LkQUJD.js","assets/threeTunnelEngine-BFDBX4Fw.js","assets/threePolygonDemo5Engine-CF_GI828.js","assets/prismFieldEngine-C_dFOJLi.js","assets/soupShaderEngine-CnXoCkGj.js","assets/tardisWormholeEngine-BwhuWVx_.js"])))=>i.map(i=>d[i]);
import{c as Ce,g as me,A as le,_ as B}from"./index-CIgbYSgO.js";import{r as l,j as b}from"./react-vendor-D1LkQUJD.js";import"./swiper-BJPGAhIX.js";/* empty css              */import"./bootstrap-jfx39s8c.js";import"./vendor-BUjjXRU6.js";const Pe=`<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
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
`,ke=`function Mash(seed) {
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
`;function $(w,{timeoutMs:p=1200}={}){if(typeof window>"u")return w(),()=>{};if("requestIdleCallback"in window){const d=window.requestIdleCallback(()=>w(),{timeout:p});return()=>window.cancelIdleCallback(d)}const R=window.setTimeout(()=>w(),0);return()=>window.clearTimeout(R)}function ue(w){var a,C,g,k;if(!w)return{width:1,height:1};const p=w.getBoundingClientRect(),R=(C=(a=w.parentElement)==null?void 0:a.getBoundingClientRect)==null?void 0:C.call(a),d=(R==null?void 0:R.width)||((g=w.parentElement)==null?void 0:g.clientWidth)||1,M=(R==null?void 0:R.height)||((k=w.parentElement)==null?void 0:k.clientHeight)||d,x=Math.max(1,Math.round(p.width||w.clientWidth||d)),P=Math.max(1,Math.round(p.height||w.clientHeight||M));return{width:x,height:P}}function z(w,p,R=1){var a,C,g;const{width:d,height:M}=ue(w),x=typeof window<"u"&&((C=(a=window.matchMedia)==null?void 0:a.call(window,"(pointer: coarse)"))==null?void 0:C.matches),P=Math.min(x?1:1.5,Math.max(1,Number(R)||1));if((d<32||M<32)&&typeof window<"u"){window.requestAnimationFrame(()=>{var v;const k=ue(w);k.width>=32&&k.height>=32&&((v=p==null?void 0:p.setSize)==null||v.call(p,k.width,k.height,P))});return}(g=p==null?void 0:p.setSize)==null||g.call(p,d,M,P)}function de(w,p,R="smooth"){if(typeof window>"u")return;const d=document.getElementById(w),M=document.getElementById(`scrollable-${p}`);if(!d||!M)return;const x=d.getBoundingClientRect(),P=M.getBoundingClientRect(),a=M.scrollTop+(x.top-P.top);M.scrollTo({top:Math.max(0,a),behavior:R})}const Se=9,Ie=9,Ne=10,je=["#0000ff","#008100","#ff1300","#000083","#810500","#2a9494","#000000","#808080"],Ee=["/images/web_art/patronus/bg.png","/images/web_art/patronus/layer-1.png","/images/web_art/patronus/layer-2.png","/images/web_art/patronus/layer-4.png","/images/web_art/patronus/layer-5.png","/images/web_art/patronus/layer-6.png"];function _e(w=Se,p=Ie,R=Ne){const d=w*p,M=Math.max(1,Math.min(R,d-1)),x=new Set;for(;x.size<M;)x.add(Math.floor(Math.random()*d));const P=new Array(d).fill(0);for(let a=0;a<d;a++){if(x.has(a)){P[a]=-1;continue}const C=a%p,g=Math.floor(a/p);let k=0;for(let v=-1;v<=1;v++)for(let f=-1;f<=1;f++){if(f===0&&v===0)continue;const o=C+f,e=g+v;o<0||e<0||o>=p||e>=w||x.has(e*p+o)&&(k+=1)}P[a]=k}return{rows:w,cols:p,mineCount:M,mines:x,counts:P}}function Te(w,p,R,d){const M=new Set(R),x=[w];for(;x.length>0;){const P=x.pop();if(P==null||M.has(P)||d.has(P)||p.mines.has(P)||(M.add(P),p.counts[P]!==0))continue;const a=P%p.cols,C=Math.floor(P/p.cols);for(let g=-1;g<=1;g++)for(let k=-1;k<=1;k++){if(k===0&&g===0)continue;const v=a+k,f=C+g;v<0||f<0||v>=p.cols||f>=p.rows||x.push(f*p.cols+v)}}return M}function fe(w,p,R){const d=w.rows*w.cols-w.mineCount;if(p.size>=d)return!0;if(R.size!==w.mineCount)return!1;for(const M of w.mines)if(!R.has(M))return!1;return!0}function Le(w){return`Web art ${String(w||"tile").toLowerCase()} tile loading`}function Ae({seed:w,reduceMotion:p}){const R=JSON.stringify(ke.split("<\/script>").join("<\\/script>")),d=JSON.stringify(w);return`<!doctype html>
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
</html>`}function he(w){return Array.isArray(w)?w.map((p,R)=>{const d=p!=null&&p.tone?` article-web-art-intro-guide-fragment-${p.tone}`:"";return b.jsx("span",{className:`article-web-art-intro-guide-fragment${d}`,children:p==null?void 0:p.text},`${(p==null?void 0:p.text)||"fragment"}-${R}`)}):w}function xt({dataWrapper:w,id:p}){var ae;const R=Ce(),d=me(),M=`${w.uniqueId}-ambient-trace`,x=`${w.uniqueId}-ambient-hex`,P=`${w.uniqueId}-ambient-plop`,a=`${w.uniqueId}-ambient-julia`,C=`${w.uniqueId}-ambient-mines`,g=`${w.uniqueId}-ambient-rings`,k=`${w.uniqueId}-ambient-prism`,v=`${w.uniqueId}-ambient-rope`,f=`${w.uniqueId}-ambient-soup`,o=`${w.uniqueId}-ambient-tardis`,[e,n]=l.useState(null),[t,i]=l.useState(!0),r=l.useMemo(()=>w.orderedItems,[w.orderedItems]),s=l.useMemo(()=>{const N=[4,5,3,6,1,2,7,8,9,10,11,12,13],L=new Map(r.map(H=>[Number(H==null?void 0:H.id),H])),A=[];for(const H of N){const q=L.get(H);q&&A.push(q)}for(const H of r){if(!H)continue;const q=Number(H==null?void 0:H.id);N.includes(q)||A.push(H)}return A},[r]),u=l.useRef(null),[c,h]=l.useState(!1),m=l.useRef(new Set),y=l.useRef(new Map),[S,I]=l.useState(0),[j,E]=l.useState(-1),[_,T]=l.useState(()=>new Set),[D,O]=l.useState(()=>new Set),[K,Y]=l.useState(!1),V=l.useMemo(()=>{const N=s.map(L=>L==null?void 0:L.uniqueId).filter(Boolean);return N.push(M,x,P,a,C,k,g,v,f,o,"ambient-goldfish","ambient-patronus"),new Set(N)},[x,a,C,P,k,g,v,f,o,M,s]),U=l.useMemo(()=>Array.from(D).filter(N=>N!=="ambient-goldfish"&&N!=="ambient-patronus"),[D]),F=t,X=R.selectedLanguageId||"en";let W=R.getString("send_yours");typeof W=="string"&&W.startsWith("locale:")&&(W={en:"Send yours!",de:"Sende deine!",hr:"Pošalji svoju!",tr:"Sen de gönder!"}[X]||"Send yours!");let ee=R.getString("click");typeof ee=="string"&&ee.startsWith("locale:")&&(ee={en:"Click",de:"Klicken",hr:"Klikni",tr:"Tıkla"}[X]||"Click");const ne={en:{top:"Send me",bottom:"one idea"},de:{top:"Sende mir",bottom:"eine Idee"},hr:{top:"Pošalji mi",bottom:"jednu ideju"},tr:{top:"Bana gönder",bottom:"bir fikir"}}[X]||{top:"Send me",bottom:"one idea"},re={en:{title:"Doors of the world behind an amazing art gallery.",guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter",preparing:"Preparing..."},de:{title:"Türen der Welt hinter einer erstaunlichen Kunstgalerie.",guide:{eyebrow:"So funktioniert es",lines:["Betritt die Galerie und schau dir die Karten in Ruhe an.","Klicke, tippe oder halte eine Karte, um das Werk darin sichtbar zu machen.","Manche Werke reagieren anders, und einige brauchen einen kurzen Moment zum Laden."]},button:"Eintreten",preparing:"Wird vorbereitet..."},hr:{title:"Vrata svijeta iza nevjerojatne umjetničke galerije.",guide:{eyebrow:"Kako istraživati",lines:["Uđi u galeriju i istražuj kartice svojim tempom.","Klikni, dodirni ili pritisni karticu da otkriješ što skriva.","Neki radovi reagiraju drugačije, a nekima treba trenutak da se pripreme."]},button:"Uđi",preparing:"Priprema se..."},tr:{title:"Muhteşem bir sanat galerisinin ardındaki dünyanın kapıları.",guide:{eyebrow:"Nasıl gezilir",lines:["Galeriye girin ve kartları kendi temponuzda inceleyin.","İçindekini ortaya çıkarmak için karta tıklayın, dokunun veya basılı tutun.","Bazı işler farklı tepki verir ve bazılarının hazırlanması biraz sürebilir."]},button:"Gir",preparing:"Hazırlanıyor..."}}[X]||{guide:{eyebrow:"How to explore",lines:[[{text:"Enter the gallery",tone:"hero"},{text:" and browse the "},{text:"cards",tone:"glow"},{text:" at your own risk!",tone:"soft"}],[{text:"Click, hold, or drag",tone:"action"},{text:" inside a card to have "},{text:"some fun.",tone:"glow"}],[{text:"All pieces are unique, and beautiful.",tone:"hero"},{text:" "},{text:"Contact me to send or credit an idea.",tone:"soft"}]]},button:"Enter"},we="hide",G=l.useCallback(N=>{if(!N||m.current.has(N))return;m.current.add(N);const L=y.current.get(N);L!=null&&(window.clearTimeout(L),y.current.delete(N)),I(m.current.size)},[]),se=l.useCallback(N=>{N&&O(L=>{if(L.has(N))return L;const A=new Set(L);return A.add(N),A})},[]),J=l.useCallback(()=>{for(const N of y.current.values())window.clearTimeout(N);y.current=new Map,m.current=new Set,I(0),E(-1),h(!1),T(new Set),O(new Set),Y(!1)},[]),Q=l.useCallback(()=>{O(new Set(V)),T(new Set(V)),Y(!0)},[V]),te=l.useCallback(({openAll:N=!1}={})=>{if(i(!1),h(!0),E(s.length-1),N){Q();return}T(new Set),O(new Set),Y(!1)},[s.length,Q]);l.useEffect(()=>{var ce;if(typeof window>"u"||((ce=d.targetSection)==null?void 0:ce.id)!==w.sectionId||d.transitionStatus!=="transition_status_none")return;const N=window.__pendingSectionAction;if(!N||N.action!=="enter"||N.sectionId!==w.sectionId||N.targetArticleId&&N.targetArticleId!==w.uniqueId)return;if(Date.now()-(N.requestedAt||0)>5e3){delete window.__pendingSectionAction;return}delete window.__pendingSectionAction,te({openAll:!0});const L=N.targetArticleId||w.uniqueId;let A=null,H=null,q=null,Z=null;return A=window.setTimeout(()=>{H=window.requestAnimationFrame(()=>{de(L,w.sectionId),q=window.setTimeout(()=>{Z=window.requestAnimationFrame(()=>{de(L,w.sectionId)})},220)})},90),()=>{A!==null&&window.clearTimeout(A),H!==null&&window.cancelAnimationFrame(H),q!==null&&window.clearTimeout(q),Z!==null&&window.cancelAnimationFrame(Z)}},[w.uniqueId,w.sectionId,(ae=d.targetSection)==null?void 0:ae.id,d.transitionStatus,te]);const ie=l.useCallback(N=>{N&&(se(N),T(L=>{if(L.has(N))return L;const A=new Set(L);return A.add(N),A}))},[se]),oe=l.useCallback(N=>{N&&(T(L=>{if(!L.has(N))return L;const A=new Set(L);return A.delete(N),A}),O(L=>{if(!L.has(N))return L;const A=new Set(L);return A.delete(N),A}))},[]),xe=V.size>0&&_.size>=V.size,ve=l.useCallback(()=>{if(V.size>0&&_.size>=V.size){T(new Set),O(new Set),Y(!1);return}Q()},[V,Q,_.size]),ye=l.useCallback(()=>{J(),i(!0)},[J]),ge=(N,L)=>{const A=Number(N==null?void 0:N.id);return A===1?"Hover":A===2?"Wave":A===3?"3D":A===4?"Poly":A===5?"Click":A===6?"Orbit":A===7?"Spin":A===8?"Shape":A===9?"Hourglass":A===10?"Noice":A===11?"Distance":A===12?"Android":A===13?"Pulse":String(L+1)},Re=s.map((N,L)=>{if(!c)return b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":`Web art tile ${L+1} loading`},N.uniqueId);const A=N.uniqueId,H=_.has(A),q=D.has(A)||H;return b.jsx(be,{label:ge(N,L),isOpen:H,onToggle:()=>{H?oe(A):ie(A)},shouldRender:q,children:q&&b.jsx(Oe,{itemWrapper:N,index:L,locked:F||!H,activate:L<=j,onReady:G})},A)}),Me=c?[{key:"ambient-trace",tileId:M,label:"Trace",render:N=>b.jsx(Je,{readyId:M,locked:F||!N,onReady:G})},{key:"ambient-hex",tileId:x,label:"Hex",render:N=>b.jsx(Qe,{readyId:x,locked:F||!N,onReady:G})},{key:"ambient-plop",tileId:P,label:"Plop",render:N=>b.jsx(We,{readyId:P,locked:F||!N,onReady:G})},{key:"ambient-julia",tileId:a,label:"Julia",render:N=>b.jsx(et,{readyId:a,locked:F||!N,onReady:G})},{key:"ambient-mines",tileId:C,label:"Bomb",render:N=>b.jsx(tt,{readyId:C,locked:F||!N,onReady:G})},{key:"ambient-rings",tileId:g,label:"Fall",render:N=>b.jsx(nt,{readyId:g,locked:F||!N,onReady:G})},{key:"ambient-prism",tileId:k,label:"Prism",render:N=>b.jsx(rt,{readyId:k,locked:F||!N,onReady:G})},{key:"ambient-rope",tileId:v,label:"Rope",render:N=>b.jsx(st,{readyId:v,locked:F||!N,onReady:G})},{key:"ambient-soup",tileId:f,label:"Soup",render:N=>b.jsx(at,{readyId:f,locked:F||!N,onReady:G})},{key:"ambient-tardis",tileId:o,label:"Tardis",render:N=>b.jsx(ct,{readyId:o,locked:F||!N,onReady:G})},{key:"ambient-goldfish",tileId:"ambient-goldfish",label:"Fish",render:N=>b.jsx(ut,{locked:F||!N})},{key:"ambient-patronus",tileId:"ambient-patronus",label:"Patronus",render:N=>b.jsx(dt,{locked:F||!N})}].map(({key:N,tileId:L,label:A,render:H})=>{const q=_.has(L),Z=D.has(L)||q;return b.jsx(be,{label:A,isOpen:q,onToggle:()=>{q?oe(L):ie(L)},shouldRender:Z,children:Z&&H(q)},N)}):[b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art trace tile loading"},"ambient-trace"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art hex tile loading"},"ambient-hex"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art plop tile loading"},"ambient-plop"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art julia tile loading"},"ambient-julia"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art mines tile loading"},"ambient-mines"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rings tile loading"},"ambient-rings"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art prism tile loading"},"ambient-prism"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art rope tile loading"},"ambient-rope"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art soup tile loading"},"ambient-soup"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":"Web art tardis tile loading"},"ambient-tardis")];return l.useEffect(()=>{J()},[w.uniqueId,J]),l.useEffect(()=>{c&&E(s.length-1)},[c,s.length]),l.useEffect(()=>{if(c)for(const N of U){if(!N||m.current.has(N)||y.current.has(N))continue;const L=window.setTimeout(()=>{G(N)},12e3);y.current.set(N,L)}},[c,U,G]),b.jsx(le,{id:w.uniqueId,type:le.Types.SPACING_DEFAULT,dataWrapper:w,className:"article-web-art",selectedItemCategoryId:e,setSelectedItemCategoryId:n,children:b.jsxs("div",{className:"article-web-art-shell",children:[b.jsx(De,{guide:re.guide,buttonLabel:t?re.button:we,hidden:!t,onEnter:t?te:ye,secondaryButtonLabel:t?null:"promaja",onSecondaryAction:t?null:ve,secondaryPressed:xe}),b.jsx("div",{className:`article-web-art-stage ${t?"article-web-art-stage-preview":""}`,"aria-hidden":t,children:b.jsxs("div",{className:`article-web-art-items ${F?"article-web-art-items-locked":""}`,ref:u,"aria-busy":t,children:[c&&b.jsx(lt,{submitLabelTop:ne.top,submitLabelBottom:ne.bottom,previewRequested:K}),Re,Me]})})]})})}function De({guide:w,buttonLabel:p,hidden:R,onEnter:d,secondaryButtonLabel:M=null,onSecondaryAction:x=null,secondaryPressed:P=!1}){const a=C=>{(C.key==="Enter"||C.key===" ")&&(C.preventDefault(),d())};return b.jsx("div",{className:`article-web-art-intro-cover ${R?"article-web-art-intro-cover-hidden":"article-web-art-intro-cover-open"}`,children:b.jsx("div",{className:"article-web-art-intro-cover-inner",children:b.jsx("div",{className:"article-web-art-intro-cover-actions",children:b.jsx("div",{className:`article-web-art-intro-guide ${R?"article-web-art-intro-guide-hidden":"article-web-art-intro-guide-open"}`,children:b.jsxs("div",{className:"article-web-art-intro-guide-inner",children:[b.jsxs("div",{className:"article-web-art-intro-guide-top-row",children:[b.jsxs("div",{className:"article-web-art-intro-guide-top-copy",children:[b.jsx("span",{className:"article-web-art-intro-guide-eyebrow",children:w.eyebrow}),b.jsx("p",{className:"article-web-art-intro-guide-line article-web-art-intro-guide-line-primary",children:he(w.lines[0])})]}),b.jsxs("div",{className:"article-web-art-intro-cover-buttons",children:[M?b.jsx("button",{type:"button",className:`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${P?"article-web-art-intro-cover-button-secondary-active":""}`,onClick:x||void 0,"aria-pressed":P,"aria-label":M,children:M}):null,b.jsx("button",{type:"button",className:"article-web-art-intro-cover-button",onClick:d,onKeyDown:a,"aria-label":p,children:p})]})]}),b.jsx("div",{className:"article-web-art-intro-guide-lines",children:w.lines.slice(1).map((C,g)=>b.jsx("p",{className:`article-web-art-intro-guide-line article-web-art-intro-guide-line-${g+2}`,children:he(C)},Array.isArray(C)?C.map(k=>k==null?void 0:k.text).join(""):C))})]})})})})})}function be({label:w,isOpen:p,onToggle:R,shouldRender:d=!0,children:M}){return b.jsxs("div",{className:`article-web-art-gated-tile ${p?"article-web-art-gated-tile-open":"article-web-art-gated-tile-closed"}`,children:[d?M:b.jsx("div",{className:"article-web-art-tile article-web-art-tile-placeholder","aria-label":Le(w)}),b.jsx("div",{className:"article-web-art-gated-tile-sheet","aria-hidden":!0}),b.jsx("button",{type:"button",className:`article-web-art-gated-tile-pill ${p?"article-web-art-gated-tile-pill-open":"article-web-art-gated-tile-pill-closed"}`,onClick:R,"aria-label":`${p?"Hide":"Show"} ${w}`,children:w})]})}function Oe({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){return Number(w.id)===1?b.jsx(Ge,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):Number(w.id)===2?b.jsx(Ye,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):Number(w.id)===3?b.jsx(Ue,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):Number(w.id)===4?b.jsx(Xe,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):Number(w.id)===6?b.jsx(Ze,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):Number(w.id)===7?b.jsx(ze,{itemWrapper:w,locked:d,onReady:M}):Number(w.id)===8?b.jsx($e,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):Number(w.id)===9?b.jsx(Fe,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):Number(w.id)===10?b.jsx(qe,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):Number(w.id)===11?b.jsx(He,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):Number(w.id)===12?b.jsx(Be,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):Number(w.id)===13?b.jsx(Ve,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M}):b.jsx(Ke,{itemWrapper:w,index:p,activate:R,locked:d,onReady:M})}function He({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(!1),g=l.useRef(!0),k=l.useRef(null),v=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=l.useMemo(()=>({seed:54013+(Number(w.id)||11)*7331,reduceMotion:v}),[w.id,v]);l.useEffect(()=>{if(!R)return;const e=x.current,n=P.current;if(!e||!n)return;let t=!1,i=null,r=null,s=null;const u=()=>{C.current||(C.current=!0,M==null||M(w.uniqueId))},c=$(async()=>{var h,m;try{const y=await B(()=>import("./distanceFieldEngine-DHTRwy4W.js"),[]);if(t)return;i=y.createDistanceFieldEngine(n,f),a.current=i;const S=()=>z(e,i,Math.min(1.5,window.devicePixelRatio||1));S(),(h=i.renderStatic)==null||h.call(i),d||(m=i.start)==null||m.call(i),u(),r=new ResizeObserver(()=>{S()}),r.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var j,E,_,T;for(const D of I){if(g.current=!!D.isIntersecting,d){(j=i.setHoverActive)==null||j.call(i,!1),(E=i.stop)==null||E.call(i);continue}g.current?(_=i.start)==null||_.call(i):(T=i.stop)==null||T.call(i)}},{threshold:.25}),s.observe(e))}catch{u()}},{timeoutMs:220});return()=>{var h;t=!0,c==null||c(),s==null||s.disconnect(),r==null||r.disconnect(),(h=i==null?void 0:i.destroy)==null||h.call(i),a.current=null}},[R,f,w.uniqueId,d,M]),l.useEffect(()=>{var n,t,i,r;const e=a.current;if(e){if(d){(n=e.setHoverActive)==null||n.call(e,!1),(t=e.clearPointer)==null||t.call(e),(i=e.stop)==null||i.call(e);return}g.current&&((r=e.start)==null||r.call(e))}},[d]);const o=e=>{const n=x.current;if(!n)return{x:.5,y:.5};const t=n.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Distance web art tile ${p+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,n,t,i;(n=(e=a.current)==null?void 0:e.setHoverActive)==null||n.call(e,!0),(i=(t=a.current)==null?void 0:t.start)==null||i.call(t)}),onPointerMove:d?void 0:(e=>{var t,i,r,s;const n=o(e);(i=(t=a.current)==null?void 0:t.setHoverActive)==null||i.call(t,!0),(s=(r=a.current)==null?void 0:r.setPointer)==null||s.call(r,n.x,n.y)}),onPointerLeave:d?void 0:(()=>{var e,n,t,i;k.current=null,(n=(e=a.current)==null?void 0:e.setHoverActive)==null||n.call(e,!1),(i=(t=a.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onPointerDown:d?void 0:(e=>{var t,i,r,s,u,c;if(e.button!=null&&e.button!==0)return;k.current=e.pointerId;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}const n=o(e);(i=(t=a.current)==null?void 0:t.setHoverActive)==null||i.call(t,!0),(s=(r=a.current)==null?void 0:r.setPointer)==null||s.call(r,n.x,n.y),(c=(u=a.current)==null?void 0:u.boostPopulation)==null||c.call(u)}),onPointerUp:d?void 0:(e=>{k.current!=null&&e.pointerId!==k.current||(k.current=null)}),onPointerCancel:d?void 0:(()=>{var e,n,t,i;k.current=null,(n=(e=a.current)==null?void 0:e.setHoverActive)==null||n.call(e,!1),(i=(t=a.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onFocus:d?void 0:(()=>{var e,n,t,i;(n=(e=a.current)==null?void 0:e.setHoverActive)==null||n.call(e,!0),(i=(t=a.current)==null?void 0:t.start)==null||i.call(t)}),onBlur:d?void 0:(()=>{var e,n,t,i;k.current=null,(n=(e=a.current)==null?void 0:e.setHoverActive)==null||n.call(e,!1),(i=(t=a.current)==null?void 0:t.clearPointer)==null||i.call(t)}),onKeyDown:d?void 0:(e=>{var n,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(n=a.current)==null?void 0:n.boostPopulation)==null||t.call(n))}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Distance"})]})}function Be({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(null),g=l.useRef(null),k=l.useRef(!1),v=l.useRef(!0),f=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);l.useEffect(()=>{if(!R)return;const e=x.current,n=P.current,t=a.current;if(!e||!n||!t)return;let i=!1,r=null,s=null,u=null,c=null;const h=()=>{k.current||(k.current=!0,M==null||M(w.uniqueId))},m=$(async()=>{var y,S,I,j;try{const E=await B(()=>import("./androidBackgroundEngine-BgHFFw8C.js"),__vite__mapDeps([0,1])),_=await B(()=>import("./androidRobotEngine-CNxYykCI.js"),[]);if(i)return;r=E.createAndroidBackgroundEngine(n,{reduceMotion:f}),C.current=r,s=_.createAndroidRobotEngine(t,{reduceMotion:f}),g.current=s;const T=()=>{const D=Math.min(1.5,window.devicePixelRatio||1);z(e,r,D),z(e,s,D)};T(),(y=r.renderStatic)==null||y.call(r),(S=s.renderStatic)==null||S.call(s),d||(I=r.start)==null||I.call(r),d||(j=s.start)==null||j.call(s),h(),u=new ResizeObserver(()=>{T()}),u.observe(e),"IntersectionObserver"in window&&(c=new IntersectionObserver(D=>{var O,K,Y,V,U,F;for(const X of D){if(v.current=!!X.isIntersecting,d){(O=r.stop)==null||O.call(r),(K=s.stop)==null||K.call(s);continue}v.current?((Y=r.start)==null||Y.call(r),(V=s.start)==null||V.call(s)):((U=r.stop)==null||U.call(r),(F=s.stop)==null||F.call(s))}},{threshold:.2}),c.observe(e))}catch{h()}},{timeoutMs:220});return()=>{var y,S;i=!0,m==null||m(),c==null||c.disconnect(),u==null||u.disconnect(),(y=r==null?void 0:r.destroy)==null||y.call(r),(S=s==null?void 0:s.destroy)==null||S.call(s),C.current=null,g.current=null}},[R,w.uniqueId,d,M,f]),l.useEffect(()=>{var t,i,r,s,u;const e=g.current,n=C.current;if(!(!e||!n)){if(d){(t=e.clearPointer)==null||t.call(e),(i=n.stop)==null||i.call(n),(r=e.stop)==null||r.call(e);return}v.current&&((s=n.start)==null||s.call(n),(u=e.start)==null||u.call(e))}},[d]);const o=e=>{const n=x.current;if(!n)return{x:.5,y:.5};const t=n.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android","aria-label":`Android web art tile ${p+1}`,disabled:d,onPointerEnter:d?void 0:(()=>{var e,n;(n=(e=g.current)==null?void 0:e.start)==null||n.call(e)}),onPointerMove:d?void 0:(e=>{var t,i;const n=o(e);(i=(t=g.current)==null?void 0:t.setPointer)==null||i.call(t,n.x,n.y)}),onPointerLeave:d?void 0:(()=>{var e,n;(n=(e=g.current)==null?void 0:e.clearPointer)==null||n.call(e)}),onFocus:d?void 0:(()=>{var e,n;(n=(e=g.current)==null?void 0:e.start)==null||n.call(e)}),onBlur:d?void 0:(()=>{var e,n;(n=(e=g.current)==null?void 0:e.clearPointer)==null||n.call(e)}),onClick:d?void 0:(()=>{var e,n;(n=(e=g.current)==null?void 0:e.poke)==null||n.call(e)}),onKeyDown:d?void 0:(e=>{var n,t;(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),(t=(n=g.current)==null?void 0:n.poke)==null||t.call(n))}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-android-bg-canvas","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-android-glow","aria-hidden":!0}),b.jsx("canvas",{ref:a,className:"article-web-art-android-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Android"})]})}function ze({itemWrapper:w,locked:p,onReady:R}){const d=l.useRef(!1);l.useEffect(()=>{d.current||(d.current=!0,R==null||R(w.uniqueId))},[w.uniqueId,R]);const M=l.useMemo(()=>[{key:"stop",hoverMode:"stop",hoverDuration:"5s"},{key:"slow",hoverMode:"slow",hoverDuration:"18s"},{key:"super-fast",hoverMode:"super-fast",hoverDuration:"0.22s"},{key:"very-fast",hoverMode:"very-fast",hoverDuration:"0.55s"}],[]);return b.jsx("div",{className:`article-web-art-tile article-web-art-spin-boxes ${p?"article-web-art-spin-boxes-locked":""}`,children:b.jsx("div",{className:"article-web-art-spin-boxes-grid",children:M.map(({key:x,hoverDuration:P,hoverMode:a})=>b.jsx("div",{className:"article-web-art-spin-box",style:{"--spin-duration":"5s","--spin-hover-duration":P},children:b.jsx("div",{className:`article-web-art-spin-box-core article-web-art-spin-box-core-${a}`})},x))})})}function $e({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(!1),g=l.useRef(!0),k=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=l.useMemo(()=>({seed:1729+(Number(w.id)||8)*4242,reduceMotion:k,gap:18,radiusRatio:.4,restScale:.28,minHoverScale:1.65,maxHoverScale:5.4,waveWidth:260}),[w.id,k]);l.useEffect(()=>{if(!R)return;const t=x.current,i=P.current;if(!t||!i)return;let r=!1,s=null,u=null,c=null;const h=()=>{C.current||(C.current=!0,M==null||M(w.uniqueId))},m=$(async()=>{var y,S,I;try{const j=await B(()=>import("./shapeFieldEngine-B_ToSidK.js"),[]);if(r)return;s=j.createShapeFieldEngine(i,v),a.current=s;const E=()=>z(t,s,window.devicePixelRatio||1);E(),(y=s.renderStatic)==null||y.call(s),(S=s.triggerWave)==null||S.call(s),d||(I=s.start)==null||I.call(s),h(),u=new ResizeObserver(()=>{var _;E(),(_=s.renderStatic)==null||_.call(s)}),u.observe(t),"IntersectionObserver"in window&&(c=new IntersectionObserver(_=>{var T,D,O;for(const K of _){if(g.current=!!K.isIntersecting,d){(T=s.stop)==null||T.call(s);continue}g.current?(D=s.start)==null||D.call(s):(O=s.stop)==null||O.call(s)}},{threshold:.2}),c.observe(t))}catch{h()}});return()=>{var y;r=!0,m==null||m(),c==null||c.disconnect(),u==null||u.disconnect(),(y=s==null?void 0:s.destroy)==null||y.call(s),a.current=null}},[R,v,w.uniqueId,d,M]),l.useEffect(()=>{var i,r,s;const t=a.current;if(t){if(d){(i=t.clearPointer)==null||i.call(t),(r=t.stop)==null||r.call(t);return}g.current&&((s=t.start)==null||s.call(t))}},[d]);const f=t=>{const i=P.current||x.current;if(!i)return{x:0,y:0};const r=i.getBoundingClientRect();return{x:t.clientX-r.left,y:t.clientY-r.top}},o=t=>{var r,s;const i=f(t);(s=(r=a.current)==null?void 0:r.setPointer)==null||s.call(r,i.x,i.y)},e=t=>{var r,s,u,c;const i=f(t);(s=(r=a.current)==null?void 0:r.setPointer)==null||s.call(r,i.x,i.y),(c=(u=a.current)==null?void 0:u.triggerWave)==null||c.call(u,i.x,i.y)},n=t=>{var i,r;t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),(r=(i=a.current)==null?void 0:i.triggerWave)==null||r.call(i))};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape","aria-label":`Shape web art tile ${p+1}`,disabled:d,onPointerMove:d?void 0:o,onPointerDown:d?void 0:e,onPointerLeave:d?void 0:(()=>{var t,i;return(i=(t=a.current)==null?void 0:t.clearPointer)==null?void 0:i.call(t)}),onBlur:d?void 0:(()=>{var t,i;return(i=(t=a.current)==null?void 0:t.clearPointer)==null?void 0:i.call(t)}),onKeyDown:d?void 0:n,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Shape"})]})}function Fe({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(!1),g=l.useRef(!0),[k,v]=l.useState(2.8),[f,o]=l.useState(.01);l.useEffect(()=>{if(!R)return;const s=x.current,u=P.current;if(!s||!u)return;let c=!1,h=null,m=null,y=null;const S=()=>{C.current||(C.current=!0,M==null||M(w.uniqueId))},I=$(async()=>{var j,E,_;try{const T=await B(()=>import("./hourglassEngine-Dxe9DVtS.js"),__vite__mapDeps([2,3,4]));if(c)return;h=T.createHourglassEngine(u),a.current=h;const D=(j=h.getState)==null?void 0:j.call(h);D&&(v(D.gravity),o(D.neckRatio));const O=()=>z(s,h,window.devicePixelRatio||1);O(),(E=h.renderStatic)==null||E.call(h),d||(_=h.start)==null||_.call(h),S(),m=new ResizeObserver(()=>{var K;O(),(K=h.renderStatic)==null||K.call(h)}),m.observe(s),"IntersectionObserver"in window&&(y=new IntersectionObserver(K=>{var Y,V,U;for(const F of K){if(g.current=!!F.isIntersecting,d){(Y=h.stop)==null||Y.call(h);continue}g.current?(V=h.start)==null||V.call(h):(U=h.stop)==null||U.call(h)}},{threshold:.2}),y.observe(s))}catch{S()}});return()=>{var j;c=!0,I==null||I(),y==null||y.disconnect(),m==null||m.disconnect(),(j=h==null?void 0:h.destroy)==null||j.call(h),a.current=null}},[R,w.uniqueId,d,M]),l.useEffect(()=>{var u,c;const s=a.current;if(s){if(d){(u=s.stop)==null||u.call(s);return}g.current&&((c=s.start)==null||c.call(s))}},[d]);const e=s=>{var u,c;s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),(c=(u=a.current)==null?void 0:u.flip)==null||c.call(u))},n=s=>{s.stopPropagation()},t=s=>{s.stopPropagation()},i=s=>{var c,h;const u=Number(s.target.value);v(u),(h=(c=a.current)==null?void 0:c.setGravity)==null||h.call(c,u)},r=s=>{var c,h,m,y;const u=Number(s.target.value);o(u),(h=(c=a.current)==null?void 0:c.setNeckRatio)==null||h.call(c,u),!d&&g.current&&((y=(m=a.current)==null?void 0:m.start)==null||y.call(m))};return b.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass",role:d?void 0:"button",tabIndex:d?-1:0,"aria-label":`Hourglass web art tile ${p+1}`,onClick:d?void 0:(()=>{var s,u;return(u=(s=a.current)==null?void 0:s.flip)==null?void 0:u.call(s)}),onKeyDown:d?void 0:e,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsxs("div",{className:"article-web-art-hourglass-controls",onClickCapture:t,onPointerDownCapture:t,onPointerUpCapture:t,onClick:n,onPointerDown:n,onPointerUp:n,onKeyDown:n,children:[b.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-left",children:[b.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Neck"}),b.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.01",max:"0.22",step:"0.001",value:f,onChange:r,disabled:d,"aria-label":"Hourglass neck size"})]}),b.jsxs("label",{className:"article-web-art-hourglass-control article-web-art-hourglass-control-right",children:[b.jsx("span",{className:"article-web-art-hourglass-control-name",children:"Gravity"}),b.jsx("input",{className:"article-web-art-hourglass-slider",type:"range",min:"0.45",max:"2.8",step:"0.01",value:k,onChange:i,disabled:d,"aria-label":"Hourglass gravity"})]})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hourglass"})]})}function qe({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(!1),g=l.useRef(!0),k=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);l.useEffect(()=>{if(!R)return;const o=x.current,e=P.current;if(!o||!e)return;let n=!1,t=null,i=null,r=null;const s=()=>{C.current||(C.current=!0,M==null||M(w.uniqueId))},u=$(async()=>{var c,h;try{const m=await B(()=>import("./noiceShaderEngine-6wwfZdln.js"),[]);if(n)return;t=m.createNoiceShaderEngine(e,{reduceMotion:k}),a.current=t;const y=()=>z(o,t,Math.min(1.5,window.devicePixelRatio||1));y(),(c=t.renderStatic)==null||c.call(t),d||(h=t.start)==null||h.call(t),s(),i=new ResizeObserver(()=>{var S;y(),(S=t.renderStatic)==null||S.call(t)}),i.observe(o),"IntersectionObserver"in window&&(r=new IntersectionObserver(S=>{var I,j,E;for(const _ of S){if(g.current=!!_.isIntersecting,d){(I=t.stop)==null||I.call(t);continue}g.current?(j=t.start)==null||j.call(t):(E=t.stop)==null||E.call(t)}},{threshold:.25}),r.observe(o))}catch{s()}},{timeoutMs:220});return()=>{var c;n=!0,u==null||u(),r==null||r.disconnect(),i==null||i.disconnect(),(c=t==null?void 0:t.destroy)==null||c.call(t),a.current=null}},[R,w.uniqueId,d,M,k]),l.useEffect(()=>{var e,n,t;const o=a.current;if(o){if(d){(e=o.clearPointer)==null||e.call(o),(n=o.stop)==null||n.call(o);return}g.current&&((t=o.start)==null||t.call(o))}},[d]);const v=o=>{const e=P.current||x.current;if(!e)return{x:.5,y:.5};const n=e.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(o.clientX-n.left)/Math.max(1,n.width))),y:Math.max(0,Math.min(1,(o.clientY-n.top)/Math.max(1,n.height)))}},f=o=>{var n,t,i,r,s,u;const e=v(o);(t=(n=a.current)==null?void 0:n.setPointer)==null||t.call(n,e.x,e.y),(r=(i=a.current)==null?void 0:i.pulsePattern)==null||r.call(i),(u=(s=a.current)==null?void 0:s.start)==null||u.call(s)};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice","aria-label":`Noice web art tile ${p+1}`,disabled:d,onPointerMove:d?void 0:(o=>{var n,t;const e=v(o);(t=(n=a.current)==null?void 0:n.setPointer)==null||t.call(n,e.x,e.y)}),onPointerDown:d?void 0:(o=>{o.button!=null&&o.button!==0||f(o)}),onMouseLeave:d?void 0:(()=>{var o,e;(e=(o=a.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:d?void 0:(()=>{var o,e;(e=(o=a.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onKeyDown:d?void 0:(o=>{var e,n,t,i;(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),(n=(e=a.current)==null?void 0:e.pulsePattern)==null||n.call(e),(i=(t=a.current)==null?void 0:t.start)==null||i.call(t))}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Noice"})]})}function Ke({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(!0),g=l.useRef(!0),k=l.useRef(!1),v=Number(w==null?void 0:w.id)===5,f=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=l.useMemo(()=>{const r=Number(w.id)||p+1,s=.0026+r*8e-5,u=.0054+r*14e-5,c=r%2?1:2,h={kx:11+r*2,ky:r%2};return{refreshDelay:v?0:8e3,radiusMini:s,radiusMaxi:u,dHueStep:c,startGroup:h,seed:1337+r*1009,reduceMotion:f}},[v,w.id,p,f]);l.useEffect(()=>{if(!R)return;const r=x.current,s=P.current;if(!r||!s)return;let u=!1,c=null,h=null,m=null;const y=()=>{k.current||(k.current=!0,M==null||M(w.uniqueId))},S=$(async()=>{var I,j;try{const E=await B(()=>import("./embroideryEngine-Bph2I_eq.js"),[]);if(u)return;c=E.createEmbroideryEngine(s,o),a.current=c;const _=()=>z(r,c,window.devicePixelRatio||1);_(),(I=c.renderStatic)==null||I.call(c),g.current&&((j=c.start)==null||j.call(c)),y(),h=new ResizeObserver(()=>{var T;_(),(T=c.renderStatic)==null||T.call(c)}),h.observe(r),"IntersectionObserver"in window&&(m=new IntersectionObserver(T=>{for(const D of T){if(g.current=!!D.isIntersecting,v){g.current||c.stop();continue}g.current&&C.current?c.start():c.stop()}},{threshold:.25}),m.observe(r))}catch{y()}});return()=>{u=!0,S==null||S(),m==null||m.disconnect(),h==null||h.disconnect(),c==null||c.destroy(),a.current=null}},[R,o,w.uniqueId,M]),l.useEffect(()=>{var s,u;const r=a.current;if(r){if(d){(s=r.stop)==null||s.call(r);return}g.current&&((u=r.start)==null||u.call(r))}},[d]),l.useEffect(()=>{var s,u;const r=a.current;if(r){if(d){(s=r.stop)==null||s.call(r);return}g.current&&((u=r.start)==null||u.call(r))}},[d]);const e=()=>{var r;C.current=!0,g.current&&((r=a.current)==null||r.start())},n=()=>{var r,s,u,c;C.current=!0,g.current?(s=(r=a.current)==null?void 0:r.start)==null||s.call(r):(c=(u=a.current)==null?void 0:u.stop)==null||c.call(u)},t=()=>{var r,s,u,c,h,m,y,S,I,j;if(v){(s=(r=a.current)==null?void 0:r.stop)==null||s.call(r),(c=(u=a.current)==null?void 0:u.reset)==null||c.call(u),(m=(h=a.current)==null?void 0:h.start)==null||m.call(h);return}(y=a.current)==null||y.reset(),(I=(S=a.current)==null?void 0:S.renderStatic)==null||I.call(S),g.current&&((j=a.current)==null||j.start())},i=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),t())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Web art tile ${p+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d||v?void 0:e,onMouseLeave:d||v?void 0:n,onFocus:d||v?void 0:e,onBlur:d||v?void 0:n,onKeyDown:d?void 0:i,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:v?"Click":Number.isFinite(Number(w==null?void 0:w.id))?Number(w.id):p+1})]})}function Ve({itemWrapper:w,index:p,activate:R,onReady:d}){const M=l.useRef(!1),x=l.useRef(null),P=l.useMemo(()=>`<!doctype html>
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
</html>`,[]);return l.useEffect(()=>{R&&(M.current||(M.current=!0,d==null||d(w.uniqueId)))},[R,w.uniqueId,d]),b.jsx("div",{className:"article-web-art-tile article-web-art-pulse-tile",role:"img","aria-label":`Pulse web art tile ${p+1}`,children:b.jsx("iframe",{ref:x,className:"article-web-art-pulse-frame",title:"Pulse web art",srcDoc:P,sandbox:"",scrolling:"no"})})}function Ge({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(!1),g=l.useRef(null);l.useRef(null),l.useRef(!1);const k=l.useRef(!1),v=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=l.useMemo(()=>({seed:9001+(Number(w.id)||1)*1337,reduceMotion:v,dotsCount:180,dotsMouseDistanceSensitivity:115,dotsMaxEscapeRouteLength:60,introDurationMs:950}),[w.id,v]);l.useEffect(()=>{if(!R)return;const c=x.current,h=P.current;if(!c||!h)return;let m=!1,y=null,S=null;const I=()=>{C.current||(C.current=!0,M==null||M(w.uniqueId))},j=$(async()=>{var E,_;try{const T=await B(()=>import("./spiralDotsEngine-BfYc4Z1H.js"),[]);if(m)return;y=T.createSpiralDotsEngine(h,f),a.current=y;const D=()=>z(c,y,window.devicePixelRatio||1);D(),(E=y.renderStatic)==null||E.call(y),(_=y.start)==null||_.call(y),I(),S=new ResizeObserver(()=>{var O;D(),y.rebuildDots(),(O=y.renderStatic)==null||O.call(y)}),S.observe(c)}catch{I()}});return()=>{m=!0,j==null||j(),S==null||S.disconnect(),y==null||y.destroy(),a.current=null}},[R,f,w.uniqueId,M]),l.useEffect(()=>{var h,m,y;const c=a.current;if(c){if(d){(h=c.clearMouse)==null||h.call(c),(m=c.stop)==null||m.call(c);return}(y=c.start)==null||y.call(c)}},[d]);const o=c=>{const h=P.current||x.current;if(!h)return{x:-1e4,y:-1e4};const m=h.getBoundingClientRect();return{x:c.clientX-m.left,y:c.clientY-m.top}},e=()=>{var c;(c=a.current)==null||c.start()},n=()=>{var c,h;(c=a.current)==null||c.clearMouse(),(h=a.current)==null||h.start()},t=()=>{e()},i=()=>{n()},r=c=>{var m;const h=o(c);(m=a.current)==null||m.setMouse(h.x,h.y)},s=()=>{e()},u=()=>{n()};return b.jsxs("div",{ref:x,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:d?-1:0,"aria-label":`Spiral dots web art tile ${p+1}`,onPointerDown:d?void 0:c=>{var y;if(c.pointerType==="mouse")return;const h=x.current;if(!h)return;k.current=!0,g.current=c.pointerId;try{h.setPointerCapture(c.pointerId)}catch{}e();const m=o(c);(y=a.current)==null||y.setMouse(m.x,m.y)},onPointerMove:d?void 0:c=>{var m;if(!k.current||g.current!=null&&c.pointerId!==g.current)return;const h=o(c);(m=a.current)==null||m.setMouse(h.x,h.y)},onPointerUp:d?void 0:c=>{g.current!=null&&c.pointerId!==g.current||(k.current=!1,g.current=null,n())},onPointerCancel:d?void 0:()=>{k.current=!1,g.current=null,n()},onMouseEnter:d?void 0:t,onMouseLeave:d?void 0:i,onMouseMove:d?void 0:r,onFocus:d?void 0:s,onBlur:d?void 0:u,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hover"})]})}function Ye({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(!0),g=l.useRef(!0),k=l.useRef(!1),v=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=l.useMemo(()=>({seed:424242+(Number(w.id)||2)*2027,reduceMotion:v,targetCellSize:14,gapPx:1.4}),[w.id,v]);l.useEffect(()=>{if(!R)return;const r=x.current,s=P.current;if(!r||!s)return;let u=!1,c=null,h=null,m=null;const y=()=>{k.current||(k.current=!0,M==null||M(w.uniqueId))},S=$(async()=>{var I,j;try{const E=await B(()=>import("./gridWaveEngine-DGabl-_v.js"),[]);if(u)return;c=E.createGridWaveEngine(s,f),a.current=c;const _=()=>z(r,c,window.devicePixelRatio||1);_(),(I=c.renderStatic)==null||I.call(c),g.current&&((j=c.start)==null||j.call(c)),y(),h=new ResizeObserver(()=>{var T;_(),(T=c.renderStatic)==null||T.call(c)}),h.observe(r),"IntersectionObserver"in window&&(m=new IntersectionObserver(T=>{for(const D of T)g.current=!!D.isIntersecting,g.current&&C.current?c.start():c.stop()},{threshold:.25}),m.observe(r))}catch{y()}});return()=>{u=!0,S==null||S(),m==null||m.disconnect(),h==null||h.disconnect(),c==null||c.destroy(),a.current=null}},[R,f,w.uniqueId,M]);const o=()=>{var r;C.current=!0,g.current&&((r=a.current)==null||r.start())},e=()=>{var r,s,u,c;C.current=!0,g.current?(s=(r=a.current)==null?void 0:r.start)==null||s.call(r):(c=(u=a.current)==null?void 0:u.stop)==null||c.call(u)},n=r=>{const s=P.current||x.current;if(!s)return{x:0,y:0};const u=s.getBoundingClientRect();return typeof(r==null?void 0:r.clientX)!="number"||typeof(r==null?void 0:r.clientY)!="number"?{x:u.width/2,y:u.height/2}:{x:r.clientX-u.left,y:r.clientY-u.top}},t=r=>{var u,c,h,m;const s=n(r);(u=a.current)==null||u.rippleAt(s.x,s.y),(h=(c=a.current)==null?void 0:c.renderStatic)==null||h.call(c),C.current&&g.current&&((m=a.current)==null||m.start())},i=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),t(null))};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Grid wave web art tile ${p+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:o,onMouseLeave:d?void 0:e,onFocus:d?void 0:o,onBlur:d?void 0:e,onKeyDown:d?void 0:i,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Wave"})]})}function Ue({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(!0),g=l.useRef(!0),k=l.useRef(!1),v=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),f=l.useMemo(()=>({reduceMotion:v,ringCount:13,cubesPerRing:12,ringSpacing:62,tunnelRadius:54,speed:6.4,exposure:1.58}),[v]);l.useEffect(()=>{if(!R)return;const i=x.current,r=P.current;if(!i||!r)return;let s=!1,u=null,c=null,h=null,m=null;const y=()=>{k.current||(k.current=!0,M==null||M(w.uniqueId))},S=async()=>{var T;const j=await B(()=>import("./threeTunnelEngine-BFDBX4Fw.js"),__vite__mapDeps([5,1]));if(s)return;u=j.createThreeTunnelEngine(r,f),a.current=u;const E=()=>z(i,u,Math.min(1.5,window.devicePixelRatio||1));return E(),u.reset(),g.current&&((T=u.start)==null||T.call(u)),y(),c=new ResizeObserver(()=>{E(),u.reset()}),c.observe(i),"IntersectionObserver"in window&&(h=new IntersectionObserver(D=>{for(const O of D)g.current=!!O.isIntersecting,g.current&&C.current?u.start():u.stop()},{threshold:.25}),h.observe(i)),()=>{h==null||h.disconnect(),c==null||c.disconnect(),u.destroy(),a.current=null}};let I=null;return m=$(()=>{S().then(j=>{I=j||null}).catch(()=>{y()})},{timeoutMs:300}),()=>{s=!0,m==null||m(),I==null||I()}},[R,f,w.uniqueId,M]),l.useEffect(()=>{var r,s,u;const i=a.current;if(i){if(d){(r=i.setHeld)==null||r.call(i,!1),(s=i.stop)==null||s.call(i);return}g.current&&((u=i.start)==null||u.call(i))}},[d]);const o=()=>{var i;C.current=!0,g.current&&((i=a.current)==null||i.start())},e=()=>{var i,r,s,u;C.current=!0,g.current?(r=(i=a.current)==null?void 0:i.start)==null||r.call(i):(u=(s=a.current)==null?void 0:s.stop)==null||u.call(s)},n=()=>{var i,r,s,u;(r=(i=a.current)==null?void 0:i.nextPalette)==null||r.call(i),(s=a.current)==null||s.reset(),g.current&&((u=a.current)==null||u.start())},t=i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),n())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel","aria-label":`3D tunnel web art tile ${p+1}`,disabled:d,onClick:d?void 0:n,onMouseEnter:d?void 0:o,onMouseLeave:d?void 0:e,onFocus:d?void 0:o,onBlur:d?void 0:e,onKeyDown:d?void 0:t,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("div",{className:"article-web-art-tunnel-room-shade","aria-hidden":!0}),b.jsx("span",{className:"article-web-art-tile-label",children:"3D"})]})}function Xe({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(!0),g=l.useRef(!0),k=l.useRef(!1),v=l.useRef(null),f=l.useRef(null),o=l.useRef(!1),e=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=l.useMemo(()=>({reduceMotion:e,nbObjects:12,animationDuration:7,animationDelay:.1,cameraZ:75,fitFactor:1.04}),[e,d]);l.useEffect(()=>{if(!R)return;const r=x.current,s=P.current;if(!r||!s)return;let u=!1,c=null,h=null;const m=()=>{k.current||(k.current=!0,M==null||M(w.uniqueId))},y=async()=>{var T;const S=await B(()=>import("./threePolygonDemo5Engine-CF_GI828.js"),__vite__mapDeps([6,1]));if(u)return;const I=S.createThreePolygonDemo5Engine(s,n);a.current=I;const j=()=>z(r,I,Math.min(1.2,window.devicePixelRatio||1));j(),I.reset(),window.requestAnimationFrame(()=>{u||a.current!==I||(j(),I.reset())}),g.current&&((T=I.start)==null||T.call(I)),m();const E=new ResizeObserver(()=>{j()});E.observe(r);let _=null;"IntersectionObserver"in window&&(_=new IntersectionObserver(D=>{for(const O of D)g.current=!!O.isIntersecting,g.current&&C.current?I.start():I.stop()},{threshold:.25}),_.observe(r)),c=()=>{_==null||_.disconnect(),E.disconnect(),I.destroy(),a.current=null}};return h=$(()=>{y().catch(()=>{m()})},{timeoutMs:300}),()=>{u=!0,h==null||h(),f.current!=null&&window.clearTimeout(f.current),c==null||c()}},[R,n,w.uniqueId,M]);const t=()=>{var r,s,u;(s=(r=a.current)==null?void 0:r.boost)==null||s.call(r),g.current&&((u=a.current)==null||u.start())},i=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),t())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Polygon demo 5 web art tile ${p+1}`,disabled:d,onKeyDown:d?void 0:i,onPointerDown:d?void 0:r=>{var s;if(!(r.button!=null&&r.button!==0)){v.current=r.pointerId,o.current=!1;try{r.currentTarget.setPointerCapture(r.pointerId)}catch{}g.current&&((s=a.current)==null||s.start()),f.current!=null&&window.clearTimeout(f.current),f.current=window.setTimeout(()=>{var u,c;v.current!=null&&(o.current=!0,(c=(u=a.current)==null?void 0:u.setHeld)==null||c.call(u,!0))},140)}},onPointerUp:d?void 0:r=>{var s,u;v.current!=null&&r.pointerId!==v.current||(f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current?(o.current=!1,(u=(s=a.current)==null?void 0:s.setHeld)==null||u.call(s,!1)):t())},onPointerCancel:d?void 0:(()=>{var r,s;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(s=(r=a.current)==null?void 0:r.setHeld)==null||s.call(r,!1)}),onLostPointerCapture:d?void 0:(()=>{var r,s;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(s=(r=a.current)==null?void 0:r.setHeld)==null||s.call(r,!1)}),onMouseEnter:d?void 0:(()=>{var r;C.current=!0,g.current&&((r=a.current)==null||r.start())}),onMouseLeave:d?void 0:(()=>{var r,s,u,c;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(s=(r=a.current)==null?void 0:r.setHeld)==null||s.call(r,!1),C.current=!0,g.current?(u=a.current)==null||u.start():(c=a.current)==null||c.stop()}),onFocus:d?void 0:(()=>{var r;C.current=!0,g.current&&((r=a.current)==null||r.start())}),onBlur:d?void 0:(()=>{var r,s,u,c;f.current!=null&&(window.clearTimeout(f.current),f.current=null),v.current=null,o.current=!1,(s=(r=a.current)==null?void 0:r.setHeld)==null||s.call(r,!1),C.current=!0,g.current?(u=a.current)==null||u.start():(c=a.current)==null||c.stop()}),children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Poly"})]})}function Ze({itemWrapper:w,index:p,activate:R,locked:d,onReady:M}){const x=l.useRef(null),P=l.useRef(null),a=l.useRef(null),C=l.useRef(!0),g=l.useRef(!0),k=l.useRef(!1),v=l.useRef(0),f=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),o=l.useMemo(()=>({reduceMotion:f,palette:["#DD0F7E","#009BBE","#A8DA00","#F2E205","#EE5A02"],bgColor:"#200018",totalCircles:22,timeScale:.0017}),[f]);l.useEffect(()=>{if(!R)return;const r=x.current,s=P.current;if(!r||!s)return;let u=!1,c=null,h=null,m=null;const y=()=>{k.current||(k.current=!0,M==null||M(w.uniqueId))},S=$(async()=>{var I,j;try{const E=await B(()=>import("./orbitCirclesEngine-D3vBwud_.js"),[]);if(u)return;c=E.createOrbitCirclesEngine(s,o),a.current=c;const _=()=>z(r,c,window.devicePixelRatio||1);_(),c.reset(),(I=c.renderStatic)==null||I.call(c),g.current&&((j=c.start)==null||j.call(c)),y(),h=new ResizeObserver(()=>{var T;_(),(T=c.renderStatic)==null||T.call(c)}),h.observe(r),"IntersectionObserver"in window&&(m=new IntersectionObserver(T=>{for(const D of T)g.current=!!D.isIntersecting,g.current&&C.current?c.start():c.stop()},{threshold:.25}),m.observe(r))}catch{y()}});return()=>{u=!0,S==null||S(),m==null||m.disconnect(),h==null||h.disconnect(),c==null||c.destroy(),a.current=null}},[R,o,w.uniqueId,M]),l.useEffect(()=>{var s,u;const r=a.current;if(r){if(d){(s=r.stop)==null||s.call(r);return}g.current&&((u=r.start)==null||u.call(r))}},[d]);const e=()=>{var r;C.current=!0,g.current&&((r=a.current)==null||r.start())},n=()=>{var r,s,u,c;C.current=!0,g.current?(s=(r=a.current)==null?void 0:r.start)==null||s.call(r):(c=(u=a.current)==null?void 0:u.stop)==null||c.call(u)},t=()=>{var h,m,y;const r=a.current;if(!r)return;const s=Math.max(1,((h=r.getTotalCircles)==null?void 0:h.call(r))||1),u=v.current%s,c=`#${Math.floor(Math.random()*16777216).toString(16).padStart(6,"0")}`;(m=r.setCircleColor)==null||m.call(r,u,c),v.current+=1,g.current&&((y=r.start)==null||y.call(r))},i=r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),t())};return b.jsxs("button",{type:"button",ref:x,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":`Orbit circles web art tile ${p+1}`,disabled:d,onClick:d?void 0:t,onMouseEnter:d?void 0:e,onMouseLeave:d?void 0:n,onFocus:d?void 0:e,onBlur:d?void 0:n,onKeyDown:d?void 0:i,children:[b.jsx("canvas",{ref:P,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Orbit"})]})}function Je({readyId:w,locked:p,onReady:R}){const d=l.useRef(null),M=l.useRef(null),x=l.useRef(null),P=l.useRef(!1),a=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=l.useMemo(()=>({seed:20250414,reduceMotion:a,winding:.5,step:10,speed:0,radius:30,strokeCycleMs:1e3}),[a]);l.useEffect(()=>{const v=d.current,f=M.current;if(!v||!f)return;let o=!1,e=null,n=null,t=null;const i=()=>{P.current||(P.current=!0,R==null||R(w))},r=$(async()=>{var s,u;try{const c=await B(()=>import("./tortuosityTraceEngine-4gmjeK0O.js"),[]);if(o)return;e=c.createTortuosityTraceEngine(f,C),x.current=e;const h=()=>z(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(s=e.renderStatic)==null||s.call(e),(u=e.start)==null||u.call(e),i(),n=new ResizeObserver(()=>{var m;h(),(m=e.reset)==null||m.call(e)}),n.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(m=>{var y,S;for(const I of m)I.isIntersecting?(y=e.start)==null||y.call(e):(S=e.stop)==null||S.call(e)},{threshold:.25}),t.observe(v))}catch{i()}},{timeoutMs:200});return()=>{var s;o=!0,r==null||r(),t==null||t.disconnect(),n==null||n.disconnect(),(s=e==null?void 0:e.destroy)==null||s.call(e),x.current=null}},[C,R,w]),l.useEffect(()=>{var f,o,e;const v=x.current;if(v){if(p){(f=v.setHeld)==null||f.call(v,!1),(o=v.stop)==null||o.call(v);return}(e=v.start)==null||e.call(v)}},[p]),l.useEffect(()=>{var f,o;const v=x.current;if(v){if(p){(f=v.stop)==null||f.call(v);return}(o=v.start)==null||o.call(v)}},[p]);const g=()=>{var v,f,o,e;(f=(v=x.current)==null?void 0:v.reset)==null||f.call(v),(e=(o=x.current)==null?void 0:o.start)==null||e.call(o)},k=v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),g())};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Trace web art tile",disabled:p,onClick:p?void 0:g,onKeyDown:p?void 0:k,children:[b.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Trace"})]})}function Qe({readyId:w,locked:p,onReady:R}){const d=l.useRef(null),M=l.useRef(null),x=l.useRef(null),P=l.useRef(!1),a=l.useRef(null),C=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=l.useMemo(()=>({seed:20250415,reduceMotion:C,nbCells:5,rayBallMin:.3,rayBallMax:.8,speed:.03}),[C]);l.useEffect(()=>{const o=d.current,e=M.current;if(!o||!e)return;let n=!1,t=null,i=null,r=null;const s=()=>{P.current||(P.current=!0,R==null||R(w))},u=$(async()=>{var c,h;try{const m=await B(()=>import("./hexFlowBallsEngine-Bzfny-m0.js"),[]);if(n)return;t=m.createHexFlowBallsEngine(e,g),x.current=t;const y=()=>z(o,t,Math.min(1.5,window.devicePixelRatio||1));y(),(c=t.renderStatic)==null||c.call(t),(h=t.start)==null||h.call(t),s(),i=new ResizeObserver(()=>{var S;y(),(S=t.renderStatic)==null||S.call(t)}),i.observe(o),"IntersectionObserver"in window&&(r=new IntersectionObserver(S=>{var I,j;for(const E of S)E.isIntersecting?(I=t.start)==null||I.call(t):(j=t.stop)==null||j.call(t)},{threshold:.25}),r.observe(o))}catch{s()}},{timeoutMs:220});return()=>{var c;n=!0,u==null||u(),r==null||r.disconnect(),i==null||i.disconnect(),(c=t==null?void 0:t.destroy)==null||c.call(t),x.current=null}},[g,R,w]),l.useEffect(()=>{var e,n,t;const o=x.current;if(o){if(p){(e=o.clearPointer)==null||e.call(o),(n=o.stop)==null||n.call(o);return}(t=o.start)==null||t.call(o)}},[p]);const k=o=>{const e=d.current;if(!e)return{x:.5,y:.5};const n=e.getBoundingClientRect();return{x:n.width>0?(o.clientX-n.left)/n.width:.5,y:n.height>0?(o.clientY-n.top)/n.height:.5}},v=()=>{var o,e,n,t;(e=(o=x.current)==null?void 0:o.burst)==null||e.call(o),(t=(n=x.current)==null?void 0:n.start)==null||t.call(n)},f=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),v())};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Hex flow web art tile",disabled:p,onClick:p?void 0:v,onPointerDown:p?void 0:(o=>{var n,t;a.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}const e=k(o);(t=(n=x.current)==null?void 0:n.setPointer)==null||t.call(n,e.x,e.y)}),onPointerMove:p?void 0:(o=>{var n,t;if(a.current!=null&&o.pointerId!==a.current)return;const e=k(o);(t=(n=x.current)==null?void 0:n.setPointer)==null||t.call(n,e.x,e.y)}),onPointerUp:p?void 0:(o=>{a.current!=null&&o.pointerId!==a.current||(a.current=null)}),onPointerCancel:p?void 0:(()=>{var o,e;a.current=null,(e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onMouseMove:p?void 0:(o=>{var n,t;const e=k(o);(t=(n=x.current)==null?void 0:n.setPointer)==null||t.call(n,e.x,e.y)}),onMouseLeave:p?void 0:(()=>{var o,e;a.current=null,(e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:p?void 0:(()=>{var o,e;a.current=null,(e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onKeyDown:p?void 0:f,children:[b.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Hex"})]})}function We({readyId:w,locked:p,onReady:R}){const d=l.useRef(null),M=l.useRef(null),x=l.useRef(null),P=l.useRef(!1),a=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),C=l.useMemo(()=>({seed:20250416,reduceMotion:a,step:6,side:5}),[a]);l.useEffect(()=>{const f=d.current,o=M.current;if(!f||!o)return;let e=!1,n=null,t=null,i=null;const r=()=>{P.current||(P.current=!0,R==null||R(w))},s=$(async()=>{var u,c;try{const h=await B(()=>import("./pixelPlopEngine-BYhGnnle.js"),[]);if(e)return;n=h.createPixelPlopEngine(o,C),x.current=n;const m=()=>z(f,n,Math.min(1.5,window.devicePixelRatio||1));m(),(u=n.renderStatic)==null||u.call(n),(c=n.start)==null||c.call(n),r(),t=new ResizeObserver(()=>{var y;m(),(y=n.reset)==null||y.call(n)}),t.observe(f),"IntersectionObserver"in window&&(i=new IntersectionObserver(y=>{var S,I;for(const j of y)j.isIntersecting?(S=n.start)==null||S.call(n):(I=n.stop)==null||I.call(n)},{threshold:.25}),i.observe(f))}catch{r()}},{timeoutMs:220});return()=>{var u;e=!0,s==null||s(),i==null||i.disconnect(),t==null||t.disconnect(),(u=n==null?void 0:n.destroy)==null||u.call(n),x.current=null}},[C,R,w]),l.useEffect(()=>{var o,e,n;const f=x.current;if(f){if(p){(o=f.clearPointer)==null||o.call(f),(e=f.stop)==null||e.call(f);return}(n=f.start)==null||n.call(f)}},[p]),l.useEffect(()=>{var o,e;const f=x.current;if(f){if(p){(o=f.stop)==null||o.call(f);return}(e=f.start)==null||e.call(f)}},[p]);const g=()=>{var f,o,e,n;(o=(f=x.current)==null?void 0:f.seedBurst)==null||o.call(f),(n=(e=x.current)==null?void 0:e.start)==null||n.call(e)},k=f=>{var n,t,i,r;const o=M.current||d.current;if(!o||typeof(f==null?void 0:f.clientX)!="number"||typeof(f==null?void 0:f.clientY)!="number"){g();return}const e=o.getBoundingClientRect();(t=(n=x.current)==null?void 0:n.burstAt)==null||t.call(n,f.clientX-e.left,f.clientY-e.top),(r=(i=x.current)==null?void 0:i.start)==null||r.call(i)},v=f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),g())};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Pixel plop web art tile",disabled:p,onPointerDown:p?void 0:(f=>{f.button!=null&&f.button!==0||k(f)}),onKeyDown:p?void 0:v,children:[b.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Plop"})]})}function et({readyId:w,locked:p,onReady:R}){const d=l.useRef(null),M=l.useRef(null),x=l.useRef(null),P=l.useRef(!1),a=l.useRef(null),C=l.useRef(!1),g=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=l.useMemo(()=>({reduceMotion:g,seed:20250417}),[g]);l.useEffect(()=>{const e=d.current,n=M.current;if(!e||!n)return;let t=!1,i=null,r=null,s=null;const u=()=>{P.current||(P.current=!0,R==null||R(w))},c=$(async()=>{var h,m;try{const y=await B(()=>import("./juliaLinesEngine-DsQ38tII.js"),[]);if(t)return;i=y.createJuliaLinesEngine(n,k),x.current=i;const S=()=>z(e,i,Math.min(1.5,window.devicePixelRatio||1));S(),(h=i.renderStatic)==null||h.call(i),(m=i.start)==null||m.call(i),u(),r=new ResizeObserver(()=>{S()}),r.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var j,E;for(const _ of I)_.isIntersecting?(j=i.start)==null||j.call(i):(E=i.stop)==null||E.call(i)},{threshold:.25}),s.observe(e))}catch{u()}},{timeoutMs:220});return()=>{var h;t=!0,c==null||c(),s==null||s.disconnect(),r==null||r.disconnect(),(h=i==null?void 0:i.destroy)==null||h.call(i),x.current=null}},[k,R,w]),l.useEffect(()=>{var n,t,i,r;const e=x.current;if(e){if(p){(n=e.setHeld)==null||n.call(e,!1),(t=e.clearPointer)==null||t.call(e),(i=e.stop)==null||i.call(e);return}(r=e.start)==null||r.call(e)}},[p]),l.useEffect(()=>{var n,t,i;const e=x.current;if(e){if(p){(n=e.clearPointer)==null||n.call(e),(t=e.stop)==null||t.call(e);return}(i=e.start)==null||i.call(e)}},[p]);const v=e=>{const n=d.current;if(!n)return{x:.4,y:.5};const t=n.getBoundingClientRect(),i=(e.clientX-t.left)/Math.max(1,t.width),r=(e.clientY-t.top)/Math.max(1,t.height);return{x:Math.max(0,Math.min(1,i)),y:Math.max(0,Math.min(1,r))}},f=()=>{var e,n,t,i;(n=(e=x.current)==null?void 0:e.reset)==null||n.call(e),(i=(t=x.current)==null?void 0:t.start)==null||i.call(t)},o=e=>{var t,i,r,s,u,c,h,m;const n=e.shiftKey?.01:.04;e.key==="ArrowUp"?(e.preventDefault(),(i=(t=x.current)==null?void 0:t.nudge)==null||i.call(t,0,-n)):e.key==="ArrowDown"?(e.preventDefault(),(s=(r=x.current)==null?void 0:r.nudge)==null||s.call(r,0,n)):e.key==="ArrowLeft"?(e.preventDefault(),(c=(u=x.current)==null?void 0:u.nudge)==null||c.call(u,-n,0)):e.key==="ArrowRight"?(e.preventDefault(),(m=(h=x.current)==null?void 0:h.nudge)==null||m.call(h,n,0)):(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),f())};return b.jsxs("div",{ref:d,className:"article-web-art-tile article-web-art-tile-hover-only",role:"img",tabIndex:p?-1:0,"aria-label":"Julia lines web art tile",onPointerDown:p?void 0:e=>{var i,r;const n=d.current;if(!n)return;C.current=!0,a.current=e.pointerId;try{n.setPointerCapture(e.pointerId)}catch{}const t=v(e);(r=(i=x.current)==null?void 0:i.setPointer)==null||r.call(i,t.x,t.y)},onPointerMove:p?void 0:e=>{var t,i;if(C.current&&a.current!=null&&e.pointerId!==a.current)return;const n=v(e);(i=(t=x.current)==null?void 0:t.setPointer)==null||i.call(t,n.x,n.y)},onPointerUp:p?void 0:e=>{var n,t;a.current!=null&&e.pointerId!==a.current||(C.current=!1,a.current=null,(t=(n=x.current)==null?void 0:n.clearPointer)==null||t.call(n))},onPointerCancel:p?void 0:()=>{var e,n;C.current=!1,a.current=null,(n=(e=x.current)==null?void 0:e.clearPointer)==null||n.call(e)},onMouseMove:p?void 0:e=>{var t,i;const n=v(e);(i=(t=x.current)==null?void 0:t.setPointer)==null||i.call(t,n.x,n.y)},onMouseLeave:p?void 0:(()=>{var e,n;(n=(e=x.current)==null?void 0:e.clearPointer)==null||n.call(e)}),onBlur:p?void 0:(()=>{var e,n;(n=(e=x.current)==null?void 0:e.clearPointer)==null||n.call(e)}),onKeyDown:p?void 0:o,onClick:p?void 0:f,children:[b.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Julia"})]})}function tt({readyId:w,locked:p,onReady:R}){const[d,M]=l.useState(0),[x,P]=l.useState("mine"),[a,C]=l.useState(()=>new Set),[g,k]=l.useState(()=>new Set),[v,f]=l.useState("playing"),[o,e]=l.useState(null),[n,t]=l.useState(0),i=l.useMemo(()=>_e(),[d]);l.useEffect(()=>{R==null||R(w)},[R,w]),l.useEffect(()=>{P("mine"),C(new Set),k(new Set),f("playing"),e(null),t(0)},[d]),l.useEffect(()=>{if(o==null||v!=="playing")return;const m=()=>{t(Math.min(5999,Math.floor((Date.now()-o)/1e3)))};m();const y=window.setInterval(m,1e3);return()=>{window.clearInterval(y)}},[o,v]);const r=()=>{M(m=>m+1)},s=m=>{if(p||v!=="playing")return;if(o==null&&e(Date.now()),x==="flag"){if(a.has(m))return;const S=new Set(g);S.has(m)?S.delete(m):S.add(m),k(S),fe(i,a,S)&&f("won");return}if(g.has(m)||a.has(m))return;if(i.mines.has(m)){const S=new Set(a);for(const I of i.mines)S.add(I);S.add(m),C(S),f("lost");return}const y=Te(m,i,a,g);C(y),fe(i,y,g)&&f("won")},u=i.mineCount-g.size,c=`${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`;let h="🤔";return v==="lost"?h="😣":v==="won"?h="😎":g.size>=i.mineCount?h="😕":g.size>=i.mineCount-1?h="🤓":g.size>=Math.round(i.mineCount*3/4)?h="😃":g.size>=Math.round(i.mineCount*2/3)?h="😊":g.size>=Math.round(i.mineCount/2)?h="🙂":g.size>=Math.round(i.mineCount/3)?h="😏":g.size>0&&(h="😐"),b.jsx("div",{className:"article-web-art-tile article-web-art-tile-minesweeper",role:"group","aria-label":"Minesweeper web art tile",children:b.jsxs("div",{className:"article-web-art-minesweeper",children:[b.jsxs("div",{className:"article-web-art-minesweeper-action-selector",children:[b.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${x==="mine"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("mine"),disabled:p||v!=="playing","aria-pressed":x==="mine",children:"⛏"}),b.jsx("button",{type:"button",className:`article-web-art-minesweeper-mode ${x==="flag"?"article-web-art-minesweeper-mode-active":""}`,onClick:()=>P("flag"),disabled:p||v!=="playing","aria-pressed":x==="flag",children:"🚩"})]}),b.jsxs("div",{className:"article-web-art-minesweeper-grid",children:[i.counts.map((m,y)=>{const S=a.has(y),I=g.has(y),j=i.mines.has(y),E=v==="lost"&&j,_=m>0?je[m-1]:void 0;return b.jsxs("button",{type:"button",className:`article-web-art-minesweeper-cell ${S?"article-web-art-minesweeper-cell-revealed":""} ${E?"article-web-art-minesweeper-cell-mine":""}`,onClick:()=>s(y),disabled:p||v!=="playing","aria-label":`Minesweeper cell ${y+1}`,children:[I&&!S?b.jsx("span",{className:"article-web-art-minesweeper-cell-flag",children:"🚩"}):null,E?b.jsx("span",{className:"article-web-art-minesweeper-cell-mine-icon",children:"💣"}):null,S&&!j&&m>0?b.jsx("span",{className:"article-web-art-minesweeper-cell-count",style:{color:_},children:m}):null]},`mine-${d}-${y}`)}),v==="lost"?b.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-lost",onClick:r,children:["Ooohhh 🙁",b.jsx("br",{}),"Click to try again"]}):null,v==="won"?b.jsxs("button",{type:"button",className:"article-web-art-minesweeper-overlay article-web-art-minesweeper-overlay-won",onClick:r,children:["👌👀✔💯💯💯",b.jsx("br",{}),"Click to restart"]}):null]}),b.jsxs("div",{className:"article-web-art-minesweeper-infos",children:[b.jsxs("div",{className:"article-web-art-minesweeper-counter",children:[b.jsx("span",{className:"article-web-art-minesweeper-counter-face",children:h}),b.jsx("span",{children:u})]}),b.jsx("div",{className:"article-web-art-minesweeper-timer",children:c})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Bomb"})]})})}function nt({readyId:w,locked:p,onReady:R}){const d=l.useRef(null),M=l.useRef(null),x=l.useRef(null),P=l.useRef(!1),a=l.useRef(null),C=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=l.useMemo(()=>({reduceMotion:C}),[C]);l.useEffect(()=>{const o=d.current,e=M.current;if(!o||!e)return;let n=!1,t=null,i=null,r=null;const s=()=>{P.current||(P.current=!0,R==null||R(w))},u=$(async()=>{var c,h;try{const m=await B(()=>import("./fallingRingsEngine-CgfU8E0P.js"),[]);if(n)return;t=m.createFallingRingsEngine(e,g),x.current=t;const y=()=>z(o,t,Math.min(1.5,window.devicePixelRatio||1));y(),(c=t.renderStatic)==null||c.call(t),(h=t.start)==null||h.call(t),s(),i=new ResizeObserver(()=>{y()}),i.observe(o),"IntersectionObserver"in window&&(r=new IntersectionObserver(S=>{var I,j;for(const E of S)E.isIntersecting?(I=t.start)==null||I.call(t):(j=t.stop)==null||j.call(t)},{threshold:.25}),r.observe(o))}catch{s()}},{timeoutMs:220});return()=>{var c;n=!0,u==null||u(),r==null||r.disconnect(),i==null||i.disconnect(),(c=t==null?void 0:t.destroy)==null||c.call(t),x.current=null}},[g,R,w]);const k=o=>{var e,n,t,i;(n=(e=x.current)==null?void 0:e.setHeld)==null||n.call(e,o),(i=(t=x.current)==null?void 0:t.start)==null||i.call(t)},v=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),k(!0))},f=o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),k(!1))};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Falling rings web art tile",disabled:p,onPointerDown:p?void 0:o=>{a.current=o.pointerId;try{o.currentTarget.setPointerCapture(o.pointerId)}catch{}k(!0)},onPointerUp:p?void 0:o=>{a.current!=null&&o.pointerId!==a.current||(a.current=null,k(!1))},onPointerCancel:p?void 0:()=>{a.current=null,k(!1)},onLostPointerCapture:p?void 0:()=>{a.current=null,k(!1)},onMouseLeave:p?void 0:(()=>{a.current!=null&&k(!1)}),onBlur:p?void 0:(()=>{a.current=null,k(!1)}),onKeyDown:p?void 0:v,onKeyUp:p?void 0:f,children:[b.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Fall"})]})}function rt({readyId:w,locked:p,onReady:R}){const d=l.useRef(null),M=l.useRef(null),x=l.useRef(null),P=l.useRef(!1),a=l.useRef(null),C=l.useRef("mouse"),g=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=l.useMemo(()=>({reduceMotion:g,objectRadius:2.5,objectDepth:1,lookAtZ:40,pointerInfluence:1,pointerDepth:18,pointerSmoothing:.22,interactionRadiusRatio:.15,interactionLift:7.5,interactionScale:.26,interactionEmissiveBoost:1.25}),[g]);l.useEffect(()=>{const f=d.current,o=M.current;if(!f||!o)return;let e=!1,n=null,t=null,i=null;const r=()=>{P.current||(P.current=!0,R==null||R(w))},s=$(async()=>{var u,c;try{const h=await B(()=>import("./prismFieldEngine-C_dFOJLi.js"),__vite__mapDeps([7,1]));if(e)return;n=h.createPrismFieldEngine(o,k),x.current=n;const m=()=>z(f,n,Math.min(1.5,window.devicePixelRatio||1));m(),(u=n.renderStatic)==null||u.call(n),(c=n.start)==null||c.call(n),r(),t=new ResizeObserver(()=>{m()}),t.observe(f),"IntersectionObserver"in window&&(i=new IntersectionObserver(y=>{var S,I;for(const j of y)j.isIntersecting?(S=n.start)==null||S.call(n):(I=n.stop)==null||I.call(n)},{threshold:.25}),i.observe(f))}catch{r()}},{timeoutMs:220});return()=>{var u;e=!0,s==null||s(),i==null||i.disconnect(),t==null||t.disconnect(),(u=n==null?void 0:n.destroy)==null||u.call(n),x.current=null}},[k,R,w]);const v=f=>{const o=d.current;if(!o)return{x:.5,y:.5};const e=o.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(f.clientX-e.left)/Math.max(1,e.width))),y:Math.max(0,Math.min(1,(f.clientY-e.top)/Math.max(1,e.height)))}};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Prism field web art tile",disabled:p,onClick:p?void 0:(()=>{var f,o,e,n;(o=(f=x.current)==null?void 0:f.reset)==null||o.call(f),(n=(e=x.current)==null?void 0:e.start)==null||n.call(e)}),onPointerDown:p?void 0:f=>{var e,n;a.current=f.pointerId,C.current=f.pointerType||"mouse";try{f.currentTarget.setPointerCapture(f.pointerId)}catch{}const o=v(f);(n=(e=x.current)==null?void 0:e.setPointer)==null||n.call(e,o.x,o.y)},onPointerMove:p?void 0:f=>{var e,n;if(a.current!=null&&f.pointerId!==a.current)return;const o=v(f);(n=(e=x.current)==null?void 0:e.setPointer)==null||n.call(e,o.x,o.y)},onPointerUp:p?void 0:f=>{var o,e;a.current!=null&&f.pointerId!==a.current||(a.current=null,(f.pointerType||C.current)==="mouse"&&((e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)))},onPointerCancel:p?void 0:(()=>{var f,o;a.current=null,C.current==="mouse"&&((o=(f=x.current)==null?void 0:f.clearPointer)==null||o.call(f))}),onMouseMove:p?void 0:f=>{var e,n;const o=v(f);(n=(e=x.current)==null?void 0:e.setPointer)==null||n.call(e,o.x,o.y)},onMouseLeave:p?void 0:(()=>{var f,o;a.current=null,(o=(f=x.current)==null?void 0:f.clearPointer)==null||o.call(f)}),onBlur:p?void 0:(()=>{var f,o;a.current=null,C.current="mouse",(o=(f=x.current)==null?void 0:f.clearPointer)==null||o.call(f)}),onKeyDown:p?void 0:(f=>{var o,e,n,t;(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),(e=(o=x.current)==null?void 0:o.reset)==null||e.call(o),(t=(n=x.current)==null?void 0:n.start)==null||t.call(n))}),children:[b.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Prism"})]})}function st({readyId:w,locked:p,onReady:R}){const d=l.useRef(null),M=l.useRef(null),x=l.useRef(null),P=l.useRef(!1),a=l.useRef(null),C=l.useRef(null),g=l.useRef(!1),k=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),v=l.useMemo(()=>({reduceMotion:k}),[k]);l.useEffect(()=>{const e=d.current,n=M.current;if(!e||!n)return;let t=!1,i=null,r=null,s=null;const u=()=>{P.current||(P.current=!0,R==null||R(w))},c=$(async()=>{var h,m;try{const y=await B(()=>import("./ropeLightEngine-ZZGO6u7c.js"),[]);if(t)return;i=y.createRopeLightEngine(n,v),x.current=i;const S=()=>z(e,i,Math.min(1.5,window.devicePixelRatio||1));S(),(h=i.renderStatic)==null||h.call(i),(m=i.start)==null||m.call(i),u(),r=new ResizeObserver(()=>{S()}),r.observe(e),"IntersectionObserver"in window&&(s=new IntersectionObserver(I=>{var j,E;for(const _ of I)_.isIntersecting?(j=i.start)==null||j.call(i):(E=i.stop)==null||E.call(i)},{threshold:.25}),s.observe(e))}catch{u()}},{timeoutMs:220});return()=>{var h;t=!0,c==null||c(),s==null||s.disconnect(),r==null||r.disconnect(),(h=i==null?void 0:i.destroy)==null||h.call(i),x.current=null}},[v,R,w]);const f=e=>{const n=d.current;if(!n)return{x:.5,y:.5};const t=n.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(e.clientX-t.left)/Math.max(1,t.width))),y:Math.max(0,Math.min(1,(e.clientY-t.top)/Math.max(1,t.height)))}},o=e=>{var t,i,r,s;if(g.current){g.current=!1;return}const n=e?f(e):{x:.5,y:.18};(i=(t=x.current)==null?void 0:t.toggleHangAt)==null||i.call(t,n.x,n.y),(s=(r=x.current)==null?void 0:r.start)==null||s.call(r)};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable","aria-label":"Rope light web art tile",disabled:p,onClick:p?void 0:o,onPointerDown:p?void 0:e=>{var n,t;a.current=e.pointerId,g.current=!1,C.current=f(e);try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}(t=(n=x.current)==null?void 0:n.setPointer)==null||t.call(n,C.current.x,C.current.y)},onPointerMove:p?void 0:e=>{var i,r;if(a.current!=null&&e.pointerId!==a.current)return;const n=f(e),t=C.current;t&&Math.hypot(n.x-t.x,n.y-t.y)>.025&&(g.current=!0),(r=(i=x.current)==null?void 0:i.setPointer)==null||r.call(i,n.x,n.y)},onPointerUp:p?void 0:e=>{var n,t;if(!(a.current!=null&&e.pointerId!==a.current)){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}a.current=null,C.current=null,(t=(n=x.current)==null?void 0:n.clearPointer)==null||t.call(n)}},onPointerCancel:p?void 0:(e=>{var n,t;try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}a.current=null,C.current=null,g.current=!1,(t=(n=x.current)==null?void 0:n.clearPointer)==null||t.call(n)}),onMouseMove:p?void 0:e=>{var t,i;const n=f(e);(i=(t=x.current)==null?void 0:t.setPointer)==null||i.call(t,n.x,n.y)},onMouseLeave:p?void 0:(()=>{var e,n;a.current=null,C.current=null,(n=(e=x.current)==null?void 0:e.clearPointer)==null||n.call(e)}),onBlur:p?void 0:(()=>{var e,n;a.current=null,C.current=null,g.current=!1,(n=(e=x.current)==null?void 0:e.clearPointer)==null||n.call(e)}),onKeyDown:p?void 0:(e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),o())}),children:[b.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Rope"})]})}const it=["rotateX(270deg) translateZ(0.5em)","rotateY(0deg) translateZ(0.5em)","rotateY(90deg) translateZ(0.5em)","rotateY(180deg) translateZ(0.5em)","rotateY(270deg) translateZ(0.5em)","rotateX(90deg) translateZ(0.5em)"],pe=Array.from({length:28},(w,p)=>p);function ot(){return b.jsx("div",{className:"article-web-art-soup-backdrop","aria-hidden":!0,children:pe.map(w=>b.jsx("div",{className:"article-web-art-soup-cube",style:{animationDelay:`${w*.06}s`,fontSize:`${w+1}em`,"--soup-cube-depth":`${w/Math.max(1,pe.length-1)}`},children:it.map((p,R)=>b.jsx("span",{className:"article-web-art-soup-face",style:{transform:p}},R))},w))})}function at({readyId:w,locked:p,onReady:R}){const d=l.useRef(null),M=l.useRef(null),x=l.useRef(null),P=l.useRef(!1),a=l.useRef(null),C=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),g=l.useMemo(()=>({reduceMotion:C}),[C]);l.useEffect(()=>{const v=d.current,f=M.current;if(!v||!f)return;let o=!1,e=null,n=null,t=null;const i=()=>{P.current||(P.current=!0,R==null||R(w))},r=$(async()=>{var s,u;try{const c=await B(()=>import("./soupShaderEngine-CnXoCkGj.js"),__vite__mapDeps([8,1]));if(o)return;e=c.createSoupShaderEngine(f,g),x.current=e;const h=()=>z(v,e,Math.min(1.5,window.devicePixelRatio||1));h(),(s=e.renderStatic)==null||s.call(e),(u=e.start)==null||u.call(e),i(),n=new ResizeObserver(()=>{h()}),n.observe(v),"IntersectionObserver"in window&&(t=new IntersectionObserver(m=>{var y,S;for(const I of m)I.isIntersecting?(y=e.start)==null||y.call(e):(S=e.stop)==null||S.call(e)},{threshold:.25}),t.observe(v))}catch{i()}},{timeoutMs:220});return()=>{var s;o=!0,r==null||r(),t==null||t.disconnect(),n==null||n.disconnect(),(s=e==null?void 0:e.destroy)==null||s.call(e),x.current=null}},[g,R,w]);const k=v=>{const f=d.current;if(!f)return{x:.5,y:.5};const o=f.getBoundingClientRect();return{x:Math.max(0,Math.min(1,(v.clientX-o.left)/Math.max(1,o.width))),y:Math.max(0,Math.min(1,(v.clientY-o.top)/Math.max(1,o.height)))}};return b.jsxs("button",{type:"button",ref:d,className:"article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile","aria-label":"Soup shader web art tile",disabled:p,onPointerDown:p?void 0:v=>{var o,e,n,t;a.current=v.pointerId;try{v.currentTarget.setPointerCapture(v.pointerId)}catch{}const f=k(v);(e=(o=x.current)==null?void 0:o.setPointer)==null||e.call(o,f.x,f.y),(t=(n=x.current)==null?void 0:n.setHeld)==null||t.call(n,!0)},onPointerMove:p?void 0:v=>{var o,e;if(a.current!=null&&v.pointerId!==a.current)return;const f=k(v);(e=(o=x.current)==null?void 0:o.setPointer)==null||e.call(o,f.x,f.y)},onPointerUp:p?void 0:v=>{var f,o;a.current!=null&&v.pointerId!==a.current||(a.current=null,(o=(f=x.current)==null?void 0:f.setHeld)==null||o.call(f,!1))},onPointerCancel:p?void 0:(()=>{var v,f;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1)}),onMouseMove:p?void 0:v=>{var o,e;const f=k(v);(e=(o=x.current)==null?void 0:o.setPointer)==null||e.call(o,f.x,f.y)},onMouseLeave:p?void 0:(()=>{var v,f,o,e;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)}),onBlur:p?void 0:(()=>{var v,f,o,e;a.current=null,(f=(v=x.current)==null?void 0:v.setHeld)==null||f.call(v,!1),(e=(o=x.current)==null?void 0:o.clearPointer)==null||e.call(o)}),children:[b.jsx(ot,{}),b.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),b.jsx("span",{className:"article-web-art-tile-label",children:"Soup"})]})}function ct({readyId:w,locked:p,onReady:R}){const d=l.useRef(null),M=l.useRef(null),x=l.useRef(null),P=l.useRef(!1),a=l.useRef(null),C=l.useRef(null),g=l.useRef(0),[k,v]=l.useState(!1),[f,o]=l.useState([]),e=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),n=l.useMemo(()=>({reduceMotion:e}),[e]);l.useEffect(()=>{const s=d.current,u=M.current;if(!s||!u)return;let c=!1,h=null,m=null,y=null;const S=()=>{P.current||(P.current=!0,R==null||R(w))},I=$(async()=>{var j,E;try{const _=await B(()=>import("./tardisWormholeEngine-BwhuWVx_.js"),__vite__mapDeps([9,1]));if(c)return;h=_.createTardisWormholeEngine(u,n),x.current=h;const T=()=>z(s,h,Math.min(1.5,window.devicePixelRatio||1));T(),(j=h.renderStatic)==null||j.call(h),(E=h.start)==null||E.call(h),S(),m=new ResizeObserver(()=>{T()}),m.observe(s),"IntersectionObserver"in window&&(y=new IntersectionObserver(D=>{var O,K;for(const Y of D)Y.isIntersecting?(O=h.start)==null||O.call(h):(K=h.stop)==null||K.call(h)},{threshold:.25}),y.observe(s))}catch{S()}},{timeoutMs:220});return()=>{var j;c=!0,I==null||I(),y==null||y.disconnect(),m==null||m.disconnect(),(j=h==null?void 0:h.destroy)==null||j.call(h),x.current=null}},[n,R,w]),l.useEffect(()=>{if(f.length===0)return;const s=window.setTimeout(()=>{o(u=>u.slice(1))},1e3);return()=>{window.clearTimeout(s)}},[f]),l.useEffect(()=>{var u,c,h;const s=x.current;if(s){if(p){v(!1),C.current=null,(u=s.clearPointer)==null||u.call(s),(c=s.stop)==null||c.call(s);return}(h=s.start)==null||h.call(s)}},[p]);const t=s=>{const u=d.current,c=M.current||u;if(!u||!c)return{x:.5,y:.5,px:0,py:0,dx:0,dy:0};const h=c.getBoundingClientRect(),m=u.getBoundingClientRect(),y=Math.max(0,Math.min(m.width,s.clientX-m.left)),S=Math.max(0,Math.min(m.height,s.clientY-m.top)),I=Math.max(0,Math.min(h.width,s.clientX-h.left)),j=Math.max(0,Math.min(h.height,s.clientY-h.top)),E=C.current,_=E?I-E.px:0,T=E?j-E.py:0;return C.current={px:I,py:j},{x:h.width>0?I/h.width:.5,y:h.height>0?j/h.height:.5,px:y,py:S,dx:_,dy:T}},i=(s,u)=>{const c=g.current++;o(h=>[...h,{id:c,x:s,y:u}])},r=s=>{var c,h,m,y;const u=t(s);i(u.px,u.py),(h=(c=x.current)==null?void 0:c.boost)==null||h.call(c),(y=(m=x.current)==null?void 0:m.start)==null||y.call(m),v(!0),window.setTimeout(()=>{v(!1)},650)};return b.jsxs("button",{type:"button",ref:d,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${k?"article-web-art-tile-tardis-boost":""}`,"aria-label":"Tardis wormhole web art tile",disabled:p,onClick:p?void 0:r,onContextMenu:p?void 0:(s=>{var c,h,m,y;s.preventDefault();const u=t(s);i(u.px,u.py),(h=(c=x.current)==null?void 0:c.reverseBurst)==null||h.call(c),(y=(m=x.current)==null?void 0:m.start)==null||y.call(m)}),onWheel:p?void 0:(s=>{var u,c;(c=(u=x.current)==null?void 0:u.addScrollBoost)==null||c.call(u,s.deltaY*.003)}),onPointerDown:p?void 0:s=>{var c,h;a.current=s.pointerId;try{s.currentTarget.setPointerCapture(s.pointerId)}catch{}const u=t(s);(h=(c=x.current)==null?void 0:c.setPointer)==null||h.call(c,u.x,u.y,u.dx,u.dy)},onPointerMove:p?void 0:s=>{var c,h,m,y;if(a.current!=null&&s.pointerId!==a.current)return;const u=t(s);(h=(c=x.current)==null?void 0:c.setPointer)==null||h.call(c,u.x,u.y,u.dx,u.dy),(s.buttons&1)===1&&((y=(m=x.current)==null?void 0:m.drag)==null||y.call(m,u.dx))},onPointerUp:p?void 0:s=>{a.current!=null&&s.pointerId!==a.current||(a.current=null)},onPointerCancel:p?void 0:(()=>{a.current=null}),onMouseMove:p?void 0:s=>{var c,h;const u=t(s);(h=(c=x.current)==null?void 0:c.setPointer)==null||h.call(c,u.x,u.y,u.dx,u.dy)},onMouseLeave:p?void 0:(()=>{var s,u;a.current=null,C.current=null,(u=(s=x.current)==null?void 0:s.clearPointer)==null||u.call(s)}),onBlur:p?void 0:(()=>{var s,u;a.current=null,C.current=null,(u=(s=x.current)==null?void 0:s.clearPointer)==null||u.call(s)}),onKeyDown:p?void 0:(s=>{var u,c,h,m;(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),(c=(u=x.current)==null?void 0:u.boost)==null||c.call(u),(m=(h=x.current)==null?void 0:h.start)==null||m.call(h))}),children:[b.jsx("canvas",{ref:M,className:"article-web-art-canvas"}),b.jsx("div",{className:"article-web-art-tardis-overlay","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-scanlines","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-grain","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-speed-lines","aria-hidden":!0}),b.jsx("div",{className:"article-web-art-tardis-boost-vignette","aria-hidden":!0}),f.map(s=>b.jsx("div",{className:"article-web-art-tardis-ripple",style:{left:`${s.x}px`,top:`${s.y}px`},"aria-hidden":!0},s.id)),b.jsx("span",{className:"article-web-art-tile-label",children:"Tardis"})]})}function lt({submitLabelTop:w,submitLabelBottom:p,previewRequested:R=!1}){const d=me(),M=l.useRef(null),[x,P]=l.useState(!1),[a,C]=l.useState(0),g=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),k=l.useCallback(()=>{C(Date.now()),P(!0)},[]),v=l.useCallback(()=>{d.navigateToSectionWithId("contact")},[d]),f=e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),k())},o=l.useMemo(()=>x?Ae({seed:`${a||Date.now()}:${w} ${p}`,reduceMotion:g}):"",[x,a,g,p,w]);return l.useEffect(()=>{let e=0,n=0;return R?(e=window.requestAnimationFrame(()=>{n=window.requestAnimationFrame(()=>{C(Date.now()),P(!0)})}),()=>{e&&window.cancelAnimationFrame(e),n&&window.cancelAnimationFrame(n)}):(P(!1),()=>{e&&window.cancelAnimationFrame(e),n&&window.cancelAnimationFrame(n)})},[R]),b.jsxs("div",{ref:M,role:"button",tabIndex:0,className:`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${x?"article-web-art-tile-cta-open":"article-web-art-tile-cta-closed"}`,"aria-label":x?"Kontakt preview":`${w} ${p}`,"aria-pressed":x,onClick:k,onKeyDown:f,children:[b.jsxs("div",{className:`article-web-art-tile-cta-preview ${x?"article-web-art-tile-cta-preview-visible":""}`,"aria-hidden":!0,children:[x&&b.jsx("iframe",{className:"article-web-art-tile-cta-preview-frame",title:"Send yours preview",srcDoc:o,sandbox:"allow-scripts"},`${a}-${w}-${p}`),b.jsx("div",{className:"article-web-art-tile-cta-preview-vignette"})]}),!x&&b.jsx("div",{className:`loader ${g?"loader-reduce-motion":""}`,"aria-hidden":!0,children:b.jsxs("div",{className:"loader-inner",children:[b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})}),b.jsx("div",{className:"loader-line-wrap",children:b.jsx("div",{className:"loader-line"})})]})}),b.jsxs("div",{className:`article-web-art-tile-cta-content ${x?"article-web-art-tile-cta-content-hidden":""}`,children:[b.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-top",children:w}),b.jsx("div",{className:"article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom",children:p})]}),x&&b.jsx("button",{type:"button",className:"article-web-art-tile-cta-contact-pill",onClick:e=>{e.stopPropagation(),v()},onKeyDown:e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),v())},children:"Kontakt"})]})}function ut({locked:w=!1}){const p=l.useRef(null),R=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]),d=l.useRef(!1),M=l.useRef(0),x=l.useRef(null),P=l.useRef(null),a=l.useRef(1),C=l.useRef(null),g=l.useRef(null),k=l.useRef(null);return l.useEffect(()=>{const v=p.current;if(!v)return;const f=m=>{const y=Math.max(0,Math.min(1,m));return y*y*(3-2*y)},o=()=>{const m=v.querySelectorAll(".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"),y=[];for(const S of m){const I=S.getAnimations?S.getAnimations():[];for(const j of I)y.push(j)}return y},e=m=>{const y=Math.max(1,Math.min(5.2,Number(m)||1));a.current=y;const S=o();for(const I of S)I.playbackRate=y},n=()=>{g.current!=null&&cancelAnimationFrame(g.current),k.current!=null&&window.clearTimeout(k.current),g.current=null,k.current=null},t=()=>{n(),e(5.2),k.current=window.setTimeout(()=>{const m=a.current,y=performance.now(),S=320,I=()=>{const j=(performance.now()-y)/S,E=f(j);e(m+(1-m)*E),j<1?g.current=requestAnimationFrame(I):g.current=null};g.current=requestAnimationFrame(I),k.current=null},2e3)},i=()=>{d.current=!1,x.current=null,v.classList.remove("article-web-art-tile-goldfish-held"),P.current!=null&&cancelAnimationFrame(P.current),P.current=null;const m=a.current,y=360,S=performance.now();C.current!=null&&cancelAnimationFrame(C.current);const I=()=>{const j=(performance.now()-S)/y,E=f(j);e(m+(1-m)*E),j<1?C.current=requestAnimationFrame(I):C.current=null};C.current=requestAnimationFrame(I)},r=()=>{if(!d.current)return;const m=performance.now()-M.current,y=1.2+4*f(m/2400);e(y),P.current=requestAnimationFrame(r)},s=m=>{if(!(R||w)&&!(m.button!=null&&m.button!==0)){n(),d.current=!0,M.current=performance.now(),x.current=m.pointerId,v.classList.add("article-web-art-tile-goldfish-held");try{v.setPointerCapture(m.pointerId)}catch{}C.current!=null&&(cancelAnimationFrame(C.current),C.current=null),P.current==null&&(P.current=requestAnimationFrame(r))}},u=()=>{const m=performance.now()-M.current;i(),m<220&&t()},c=()=>{i()},h=()=>{i()};return v.addEventListener("pointerdown",s),v.addEventListener("pointerup",u),v.addEventListener("pointercancel",c),v.addEventListener("lostpointercapture",h),()=>{v.removeEventListener("pointerdown",s),v.removeEventListener("pointerup",u),v.removeEventListener("pointercancel",c),v.removeEventListener("lostpointercapture",h),i(),n(),C.current!=null&&cancelAnimationFrame(C.current),C.current=null}},[w,R]),l.useEffect(()=>{const v=p.current;v&&v.classList.toggle("article-web-art-tile-goldfish-locked",w)},[w]),b.jsxs("div",{className:"article-web-art-tile article-web-art-tile-goldfish",ref:p,role:"img","aria-label":"Goldfish animation tile",children:[b.jsx("div",{className:"fish-stage",children:b.jsx("div",{className:"fish-wrapper",children:b.jsx("div",{className:"fish-container",children:b.jsxs("div",{className:"fish-parts",children:[b.jsx("div",{className:"fish-body front"}),b.jsx("div",{className:"fish-body back"}),b.jsx("div",{className:"fish-back-bottom-fin front"}),b.jsx("div",{className:"fish-back-bottom-fin back"}),b.jsx("div",{className:"fish-back-fin"}),b.jsx("div",{className:"fish-front-bottom-fin front"}),b.jsx("div",{className:"fish-front-bottom-fin back"}),b.jsx("div",{className:"fish-top-fin"})]})})})}),b.jsx("span",{className:"article-web-art-tile-label",children:"Fish"})]})}function dt({locked:w=!1}){const p=l.useRef(null),R=l.useRef([]),d=l.useRef(0),M=l.useRef(0),x=Ee,P=l.useMemo(()=>typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,[]);return l.useEffect(()=>{const a=p.current;if(!a)return;const C=R.current.filter(Boolean);if(!C.length)return;let g=!0,k=!1,v=null,f=null;const o=(m,y)=>{const S=(m-.5)*30;for(let I=0;I<C.length;I++){const j=C[I],E=I*18,_=I*8,T=(m-.5)*E,D=(y-.5)*_;j.style.transform=`translate3d(${T}px, ${D}px, 0) rotateY(${S}deg)`}},e=(m,y)=>{const S=Math.max(-.55,Math.min(.55,(m-.5)*1.1)),I=Math.max(-.35,Math.min(.35,(y-.5)*.7));o(.5+S,.5+I)},n=m=>{const y=a.getBoundingClientRect(),S=(m.clientX-y.left)/Math.max(1,y.width),I=(m.clientY-y.top)/Math.max(1,y.height);g=!0,M.current=performance.now()+650,e(Math.max(0,Math.min(1,S)),Math.max(0,Math.min(1,I)))},t=m=>{const y=a.getBoundingClientRect(),S=(m.clientX-y.left)/Math.max(1,y.width),I=(m.clientY-y.top)/Math.max(1,y.height);return{x:Math.max(0,Math.min(1,S)),y:Math.max(0,Math.min(1,I))}},i=m=>{if(m.pointerType==="mouse")return;k=!0,v=m.pointerId,g=!0,M.current=performance.now()+900;const y=t(m);e(y.x,y.y),!P&&f==null&&(f=requestAnimationFrame(h))},r=m=>{if(!k||v!=null&&m.pointerId!==v)return;g=!0,M.current=performance.now()+900;const y=t(m);e(y.x,y.y)},s=m=>{v!=null&&(m==null?void 0:m.pointerId)!=null&&m.pointerId!==v||(k=!1,v=null,g=!0,!P&&f==null&&(f=requestAnimationFrame(h)))},u=()=>{g=!0,!P&&f==null&&(f=requestAnimationFrame(h))},c=()=>{g=!0,!P&&f==null&&(f=requestAnimationFrame(h))},h=()=>{if(g){if(!P&&performance.now()>=M.current){d.current+=.008;const m=Math.sin(d.current)*.5+.5;e(m,.5)}f=requestAnimationFrame(h)}};return g=!w,a.addEventListener("mouseenter",u),a.addEventListener("mousemove",n),a.addEventListener("mouseleave",c),a.addEventListener("pointerdown",i),a.addEventListener("pointermove",r),a.addEventListener("pointerup",s),a.addEventListener("pointercancel",s),e(.5,.5),!P&&!w&&(f=requestAnimationFrame(h)),()=>{a.removeEventListener("mouseenter",u),a.removeEventListener("mousemove",n),a.removeEventListener("mouseleave",c),a.removeEventListener("pointerdown",i),a.removeEventListener("pointermove",r),a.removeEventListener("pointerup",s),a.removeEventListener("pointercancel",s),f!=null&&cancelAnimationFrame(f)}},[P]),b.jsxs("div",{ref:p,className:"article-web-art-tile article-web-art-tile-patronus",role:"img","aria-label":"Patronus parallax tile",children:[b.jsxs("div",{className:"patronus-card",children:[b.jsx("div",{className:"patronus-layer patronus-bg",ref:a=>{R.current[0]=a},children:b.jsx("img",{alt:"",src:x[0]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[1]=a},children:b.jsx("img",{alt:"",src:x[1]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[2]=a},children:b.jsx("img",{alt:"",src:x[2]})}),b.jsx("div",{className:"patronus-layer patronus-svg",ref:a=>{R.current[3]=a},dangerouslySetInnerHTML:{__html:Pe}}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[4]=a},children:b.jsx("img",{alt:"",src:x[3]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[5]=a},children:b.jsx("img",{alt:"",src:x[4]})}),b.jsx("div",{className:"patronus-layer",ref:a=>{R.current[6]=a},children:b.jsx("img",{alt:"",src:x[5]})})]}),b.jsx("span",{className:"article-web-art-tile-label",children:"Patronus"})]})}export{xt as default};
