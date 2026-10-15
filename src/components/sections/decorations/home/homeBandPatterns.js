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
    const repeats = Math.max(2, Math.min(24, Math.round(width / (130 + random() * 70))))
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
        const sweep = 9 + random() * 2
        const ripple = 3 + random() * 2
        for(const strength of [1, 0.67, 0.34]) {
            addPair(64, t => strength * (sweep * Math.cos(t * Math.PI * 2) +
                ripple * Math.cos(t * Math.PI * 2 * harmonic)))
        }
    } else if(family === 1) {
        // Offset crystal chains intersect into stars without separate badges.
        const folds = random() > 0.5 ? 1 : 2
        for(const [strength, phase] of [[1, 0], [0.64, 0.25]]) {
            addPair(folds * 8, t => strength * 17 * (1 - 4 * Math.abs(((t * folds + phase) % 1) - 0.5)))
        }
    } else if(family === 2) {
        // Linked ribbon loops: every strand traverses the whole tile. The
        // backtracking stays inside it, so neighboring repeats never clip a loop.
        const curl = 0.18 + random() * 0.09
        const inner = 0.5 + random() * 0.28
        for(const strength of [1, inner]) {
            for(const sign of [-1, 1]) {
                paths.push(sampledPath(96, t => [tileWidth * (t + curl * Math.sin(t * Math.PI * 2)),
                    20 + sign * strength * 16 * Math.sin(t * Math.PI * 2)]))
            }
        }
    } else if(family === 3) {
        // A swept silk lattice: strands fan out and cross in one continuous
        // weave, with matching horizontal tangents at every repeating seam.
        const bend = 0.12 + random() * 0.2
        const count = 4 + Math.floor(random() * 3)
        const spreads = Array.from({length: count}, (_, i) => 2.5 + i * 14 / (count - 1) + random() * 0.4)
        for(const spread of spreads) {
            for(const sign of [-1, 1]) {
                const from = 20 + sign * spread
                const to = 20 - sign * spread
                paths.push(`M${point(0, from)} C${point(tileWidth * bend, from)} ` +
                    `${point(tileWidth * (0.5 - bend), to)} ${point(tileWidth / 2, to)} ` +
                    `C${point(tileWidth * (0.5 + bend), to)} ${point(tileWidth * (1 - bend), from)} ${point(tileWidth, from)}`)
            }
        }
    } else if(family === 4) {
        // A folded prism web: uneven diagonal runs meet vertical ribs. Mirror
        // the seeded half-cell so its apparent chaos still joins and repeats.
        const halfCount = random() > 0.5 ? 3 : 4
        const halfWidths = Array.from({length: halfCount}, () => 0.7 + random() * 0.6)
        const widths = [...halfWidths, ...halfWidths.slice().reverse()]
        const total = widths.reduce((sum, value) => sum + value, 0)
        const knots = [0]
        widths.forEach(value => knots.push(knots.at(-1) + value / total * tileWidth))
        const halfNecks = [4, ...Array.from({length: halfCount - 1}, () => 3 + random() * 6), 5 + random() * 4]
        const necks = [...halfNecks, ...halfNecks.slice(0, -1).reverse()]
        for(const strength of [1, 0.5]) {
            for(const sign of [-1, 1]) {
                paths.push(knots.map((x, i) => `${i ? 'L' : 'M'}${point(x,
                    20 + sign * strength * (i % 2 ? -1 : 1) * (20 - necks[i]))}`).join(' '))
            }
        }
        knots.slice(1, -1).forEach((x, i) => paths.push(`M${point(x, necks[i + 1])} V${(40 - necks[i + 1]).toFixed(2)}`))
    } else {
        // Mirrored stepped circuits: a tiny repeatable sequence, never text.
        const half = [3, ...Array.from({length: 4 + Math.floor(random() * 3)}, () => 4 + Math.round(random() * 13))]
        const levels = [...half, ...half.slice().reverse()]
        for(const strength of [1, 0.55]) {
            for(const sign of [-1, 1]) {
                const points = [`M${point(0, 20 + sign * strength * levels[0])}`]
                levels.forEach((level, i) => {
                    if(i) points.push(`V${(20 + sign * strength * level).toFixed(2)}`)
                    points.push(`H${((i + 1) / levels.length * tileWidth).toFixed(2)}`)
                })
                paths.push(points.join(' '))
            }
        }
    }

    return {
        family, repeats, tileWidth, paths,
        palette: seed % 3,
        duration: family === 4 ? 4 + random() * 2 : 6 + random() * 4,
        phase: -random() * 10,
    }
}

export function topSegmentCount(width) {
    // Four columns per logical group share one continuous scene. Bound the
    // total geometry while retaining readable polygons in shallow bands.
    return Math.max(3, Math.min(24, Math.ceil(width / 190)))
}
