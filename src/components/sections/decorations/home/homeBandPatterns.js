// Position-derived variation stays deterministic: scrolling and animation do
// not regenerate the artwork. Each separator gets its own geometric language.
export function bandSeed(index, verticalSlot) {
    let seed = Math.imul((index + 1) ^ Math.imul(verticalSlot + 1, 0x45d9f3b), 0x27d4eb2d)
    seed ^= seed >>> 16
    return seed >>> 0
}

function randomSequence(seed) {
    return () => {
        seed = (seed + 0x6d2b79f5) >>> 0
        let value = Math.imul(seed ^ seed >>> 15, 1 | seed)
        value ^= value + Math.imul(value ^ value >>> 7, 61 | value)
        return ((value ^ value >>> 14) >>> 0) / 4294967296
    }
}

const point = (x, y) => `${x.toFixed(2)} ${y.toFixed(2)}`

function sampledPath(samples, getPoint, close = false) {
    return Array.from({length: samples + 1}, (_, i) => {
        const [x, y] = getPoint(i / samples)
        return `${i ? 'L' : 'M'}${point(x, y)}`
    }).join(' ') + (close ? ' Z' : '')
}

export function createBandPattern(index, seed, width) {
    const random = randomSequence(seed)
    const family = ((index - 1) % 6 + 6) % 6
    const repeats = Math.max(2, Math.round(width / (130 + random() * 70)))
    const tileWidth = width / repeats
    const paths = []
    const addPair = (samples, amplitude) => {
        for(const sign of [-1, 1]) {
            paths.push(sampledPath(samples, t => [t * tileWidth, 20 + sign * amplitude(t)]))
        }
    }

    if(family === 0) {
        // Harmonic braid: smooth counterwoven strands with a shared axis.
        const harmonic = random() > 0.5 ? 3 : 5
        for(const strength of [1, 0.62]) {
            addPair(96, t => strength * (11 * Math.cos(t * Math.PI * 2) +
                5 * Math.cos(t * Math.PI * 2 * harmonic)))
        }
    } else if(family === 1) {
        // Nested folded diamonds: angular rhythms instead of sine waves.
        const folds = random() > 0.5 ? 2 : 3
        for(const strength of [1, 0.66, 0.32]) {
            addPair(folds * 4, t => strength * 17 * (1 - 4 * Math.abs((t * folds % 1) - 0.5)))
        }
    } else if(family === 2) {
        // Closed Lissajous orbits; odd/even frequencies mirror in both axes.
        const frequency = random() > 0.5 ? 3 : 5
        for(const size of [1, 0.7]) {
            paths.push(sampledPath(160, t => [tileWidth * (0.5 + 0.48 * size * Math.sin(t * Math.PI * 2 * frequency)),
                20 + 17 * size * Math.sin(t * Math.PI * 4)], true))
        }
    } else if(family === 3) {
        // Symmetric fan lattice: seeded spacing makes a repeated optical weave.
        const spokes = Array.from({length: 5}, () => 0.05 + random() * 0.4).sort((a, b) => a - b)
        for(const offset of spokes) {
            for(const mirror of [false, true]) {
                const x = tileWidth * (mirror ? 1 - offset : offset)
                paths.push(`M${point(x, 3)} Q${point(tileWidth / 2, 20)} ${point(tileWidth - x, 37)}`)
            }
        }
    } else if(family === 4) {
        // Standing-wave rosettes with a different envelope for each strand.
        const frequency = random() > 0.5 ? 2 : 4
        for(const strength of [1, 0.58]) {
            addPair(128, t => strength * 17 * Math.cos(t * Math.PI * 2) * Math.cos(t * Math.PI * 2 * frequency))
        }
    } else {
        // Mirrored stepped circuits: a tiny repeatable sequence, never text.
        const half = [3, ...Array.from({length: 5}, () => 4 + Math.round(random() * 13))]
        const levels = [...half, ...half.slice().reverse()]
        for(const sign of [-1, 1]) {
            const points = [`M${point(0, 20 + sign * levels[0])}`]
            levels.forEach((level, i) => {
                if(i) points.push(`V${(20 + sign * level).toFixed(2)}`)
                points.push(`H${((i + 1) / levels.length * tileWidth).toFixed(2)}`)
            })
            paths.push(points.join(' '))
        }
    }

    return {
        family, tileWidth, paths,
        palette: seed % 3,
        duration: 6 + random() * 4,
        phase: -random() * 10,
    }
}

export function topSegmentCount(width) {
    // Keep each roller group legible, including wide portrait layouts, while
    // bounding the number of 3D faces on unusually large screens.
    return Math.max(3, Math.min(24, Math.ceil(width / 190)))
}
