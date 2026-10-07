import React, {useEffect, useId, useMemo, useRef, useState} from 'react'
import {bandSeed, createBandPattern, topSegmentCount} from './homeBandPatterns.js'
import './HomeDecorationBand.scss'

// Scoped React/CSS adaptation of the roller geometry supplied by the user
// (Ana Tudor / thebabydino). No Compass, body perspective or GPU canvas needed.
const ROWS = Array.from({length: 14}, (_, index) => {
    const i = index + 1
    const sides = i + 1
    const angle = 360 / sides
    const halfAngle = Math.PI / sides
    const topLength = 4 * (i === 1 ? 2 : Math.tan(halfAngle))
    const topRadius = 2 / (i === 1 ? 0.5 : Math.cos(halfAngle))
    const bottomInset = 1.5 / (i === 1 ? 2 : Math.tan(halfAngle))
    const bottomRadius = 1.5 / (i === 1 ? 1 : Math.sin(halfAngle))
    return {i, sides, angle, topLength, topRadius, bottomInset, bottomRadius}
})
// Seven progressively larger polygon pairs on each half. Mirror the complete
// projected scene, including its animation, rather than just reversing sizes.
const BOTTOM_ROWS = ROWS.filter(row => row.i % 2 === 1)
const TOP_TILT = 65
const TOP_ROW_STEP = 5

function useBandActivity(ref) {
    useEffect(() => {
        const band = ref.current
        const section = band?.closest('section')
        if(!band || !section) return undefined
        let visible = false
        let paused = false
        const update = () => {
            band.dataset.running = String(visible && !paused && !document.hidden && section.classList.contains('section-shown'))
        }
        const observer = new IntersectionObserver(entries => {
            visible = entries.some(entry => entry.isIntersecting)
            update()
        }, {rootMargin: '80px'})
        const sectionObserver = new MutationObserver(update)
        const pause = () => {paused = true; update()}
        const resume = () => {paused = false; update()}
        observer.observe(band)
        sectionObserver.observe(section, {attributes: true, attributeFilter: ['class']})
        document.addEventListener('visibilitychange', update)
        window.addEventListener('app:pause', pause)
        window.addEventListener('app:resume', resume)
        update()
        return () => {
            observer.disconnect()
            sectionObserver.disconnect()
            document.removeEventListener('visibilitychange', update)
            window.removeEventListener('app:pause', pause)
            window.removeEventListener('app:resume', resume)
        }
    }, [ref])
}

function useBandLayout(ref, index) {
    const [layout, setLayout] = useState({width: 360, height: 28, verticalSlot: 0})
    useEffect(() => {
        const band = ref.current
        const content = band?.closest('.section-content')
        if(!band || !content) return undefined
        let frame = 0
        const measure = () => {
            frame = 0
            const rect = band.getBoundingClientRect()
            const contentRect = content.getBoundingClientRect()
            if(!rect.width || !rect.height) return
            // Content-relative coordinates ignore scrolling. Coarse slots keep
            // fractional reflows from constantly changing the seeded design.
            const next = {
                width: Math.round(band.clientWidth),
                height: band.clientHeight,
                verticalSlot: Math.round((rect.top - contentRect.top) / 24),
            }
            setLayout(previous => Object.keys(next).every(key => previous[key] === next[key]) ? previous : next)
        }
        const schedule = () => {
            if(!frame) frame = requestAnimationFrame(measure)
        }
        const observer = new ResizeObserver(schedule)
        observer.observe(band)
        observer.observe(content)
        schedule()
        return () => {
            observer.disconnect()
            cancelAnimationFrame(frame)
        }
    }, [ref, index])
    return layout
}

function Roller({row, bottom, trailing = false}) {
    const {i, sides, angle, topRadius, bottomRadius, topLength, bottomInset} = row
    const radius = bottom ? bottomRadius : topRadius
    const startAngle = trailing ? -angle / 2 : angle / 2
    const endAngle = -startAngle
    const spin = bottom && !trailing ? -angle * (1 + 0.5 * (i % 2)) : -angle / 2
    const depth = trailing ? -radius : radius
    const styles = {
        '--roller-start': `rotateY(${startAngle}deg) translateZ(${depth}em) rotateY(${spin}deg)`,
        '--roller-end': `rotateY(${endAngle}deg) translateZ(${depth}em) rotateY(${spin}deg)`,
    }
    return <div className={`home-roller${trailing ? ' home-roller-trailing' : ''}`} style={styles}>
        {Array.from({length: sides}, (_, face) => <div key={face} className="home-roller-side" style={{
            width: `${bottom ? 3 : topLength}em`,
            transform: `rotateY(${face * angle}deg)${i === 1 ? '' : ` translateZ(${bottom ? bottomInset : -2}em)`}`,
            '--face-inset': `${bottom && i > 2 ? bottomInset : 0.125}em`,
        }}/>) }
    </div>
}

function RollerGroup({rows, bottom = false}) {
    return <div className="home-roller-scene">
        {rows.map((row, localIndex) => <div key={localIndex} className="home-roller-assembly" style={{
            '--row-y': `${bottom ? -5 * (localIndex + 1) : -TOP_ROW_STEP * localIndex}em`,
            // Level the row centres while retaining the oblique polygon view.
            '--row-x': `${bottom ? 0 : TOP_ROW_STEP * localIndex / Math.tan(TOP_TILT * Math.PI / 180)}em`,
            '--travel': `${bottom ? 3 : row.topLength}em`,
            '--segment-width': `${bottom ? 3 : row.topLength}em`,
            '--phase': `${-row.i * 0.13 - (bottom ? 0 : localIndex * 0.08)}s`,
            zIndex: bottom ? 15 - row.i : undefined,
        }}>
            <div className="home-roller-strip"/>
            <Roller row={row} bottom={bottom}/>
            {bottom && <Roller row={row} bottom trailing/>}
        </div>)}
    </div>
}

function HomeDecorationBand({type, index = 0}) {
    const ref = useRef(null)
    const id = `home-signal-${useId().replaceAll(':', '')}`
    useBandActivity(ref)
    const {width, height, verticalSlot} = useBandLayout(ref, index)
    const bottom = type === 'page-bottom'
    const middle = type === 'between-articles'
    const segments = topSegmentCount(width)
    const topRows = useMemo(() => Array.from({length: segments * 4}, (_, column) => ROWS[column % ROWS.length]), [segments])
    const seed = bandSeed(index, verticalSlot)
    const pattern = useMemo(() => createBandPattern(index, seed, width), [index, seed, width])
    const unit = bottom ? Math.max(3, Math.min(12, height / 27)) : height / 6
    const bottomHalfWidth = width / 2
    const topSpan = (topRows.length - 1) * TOP_ROW_STEP / Math.sin(TOP_TILT * Math.PI / 180) + 6
    const stretchX = bottom ? bottomHalfWidth * 1.2 / (34 * unit) : width * 1.08 / (topSpan * unit)
    const styles = {
        '--scene-unit': `${unit}px`,
        '--scene-stretch-x': stretchX,
        '--scene-stretch-y': bottom ? height * 1.08 / (30 * unit) : 1,
        '--scene-left': bottom ? `${-3 * unit * stretchX - bottomHalfWidth * 0.05}px` : `${2 * unit * stretchX - width * 0.04}px`,
        '--scene-top': bottom ? '37%' : '70%',
        '--scene-tilt': `${TOP_TILT}deg`,
        '--home-top-segments': segments,
        '--home-signal-duration': `${pattern.duration.toFixed(2)}s`,
        '--home-signal-phase': `${pattern.phase.toFixed(2)}s`,
    }
    return <div ref={ref} className={`home-decoration-art home-decoration-art--${middle ? 'middle' : bottom ? 'bottom' : 'top'}`}
                style={styles} data-running="false" data-variant={pattern.palette}
                data-pattern={middle ? pattern.family : undefined} data-seed={middle ? seed : undefined}
                data-vertical-slot={middle ? verticalSlot : undefined} aria-hidden="true">
        {middle ? <svg className="home-signal-pattern" viewBox={`0 0 ${width} 40`} preserveAspectRatio="none" focusable="false">
            <defs>
                <linearGradient id={`${id}-ink`} x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="var(--home-band-accent)"/>
                    <stop offset=".5" stopColor="var(--home-band-secondary)"/>
                    <stop offset="1" stopColor="var(--home-band-accent)"/>
                </linearGradient>
                <pattern id={id} width={pattern.tileWidth} height="40" x={(width - pattern.tileWidth) / 2} patternUnits="userSpaceOnUse">
                    {pattern.paths.map((path, line) => <React.Fragment key={line}>
                        <path className="home-signal-track" d={path} stroke={`url(#${id}-ink)`}/>
                        <path className="home-signal-pulse" d={path} stroke={`url(#${id}-ink)`} pathLength="100"
                              style={{animationDelay: `${pattern.phase - line * 0.7}s`,
                                  animationDirection: pattern.family === 4 && line % 2 ? 'reverse' : undefined}}/>
                    </React.Fragment>)}
                </pattern>
            </defs>
            <rect width={width} height="40" fill={`url(#${id})`}/>
        </svg> : bottom ? <div className="home-roller-halves">
            {[false, true].map(mirror => <div className="home-roller-half" key={String(mirror)} data-mirror={mirror}>
                <RollerGroup rows={BOTTOM_ROWS} bottom/>
            </div>)}
        </div> : <RollerGroup rows={topRows}/>}
    </div>
}

export default HomeDecorationBand
