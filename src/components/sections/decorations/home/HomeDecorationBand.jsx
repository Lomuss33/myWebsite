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

// One coalesced check for all Home bands, including native pane scrolling.
// Intersection delivery can lag while a browser restores its rendering surface.
const visibilityChecks = new Set()
let visibilityCheckTimer = null
function scheduleVisibilityChecks() {
    if(visibilityCheckTimer !== null) return
    visibilityCheckTimer = window.setTimeout(() => {
        visibilityCheckTimer = null
        visibilityChecks.forEach(check => check())
    }, 32)
}

function watchVisibilityChanges(check) {
    if(visibilityChecks.size === 0) {
        window.addEventListener('scroll', scheduleVisibilityChecks, {capture: true, passive: true})
        window.addEventListener('resize', scheduleVisibilityChecks, {passive: true})
    }
    visibilityChecks.add(check)
    return () => {
        visibilityChecks.delete(check)
        if(visibilityChecks.size !== 0) return
        window.removeEventListener('scroll', scheduleVisibilityChecks, true)
        window.removeEventListener('resize', scheduleVisibilityChecks)
        window.clearTimeout(visibilityCheckTimer)
        visibilityCheckTimer = null
    }
}

function useBandActivity(ref) {
    useEffect(() => {
        const band = ref.current
        const section = band?.closest('section')
        if(!band || !section) return undefined
        const frame = band.closest('.section-decoration-band') || band
        const scrollport = band.closest('.scrollable')
        let visible = true
        let paused = false
        const update = () => {
            const running = String(visible && !paused && !document.hidden && section.classList.contains('section-shown'))
            if(band.dataset.running !== running) band.dataset.running = running
        }
        // Start from actual layout instead of waiting for the first observer
        // delivery. Recheck it on return, when cached intersections can be stale.
        const measure = () => {
            const rect = frame.getBoundingClientRect()
            const clip = scrollport?.getBoundingClientRect()
            visible = rect.width > 0 && rect.height > 0 &&
                rect.bottom > Math.max(-80, clip?.top ?? -80) &&
                rect.top < Math.min(window.innerHeight + 80, clip?.bottom ?? Infinity) &&
                rect.right > Math.max(0, clip?.left ?? 0) &&
                rect.left < Math.min(window.innerWidth, clip?.right ?? Infinity)
            update()
        }
        // Notifications may have queued before a resume or layout change.
        // Use current geometry instead of restoring an old intersection state.
        const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(measure, {rootMargin: '80px'})
        const sectionObserver = new MutationObserver(measure)
        const pause = () => {paused = true; update()}
        const resume = () => {paused = false; measure()}
        const onVisibilityChange = () => document.hidden ? pause() : resume()
        const stopWatchingVisibility = watchVisibilityChanges(measure)
        observer?.observe(frame)
        sectionObserver.observe(section, {attributes: true, attributeFilter: ['class']})
        document.addEventListener('visibilitychange', onVisibilityChange)
        document.addEventListener('freeze', pause)
        document.addEventListener('resume', resume)
        window.addEventListener('pagehide', pause)
        window.addEventListener('pageshow', resume)
        window.addEventListener('app:pause', pause)
        window.addEventListener('app:resume', resume)
        measure()
        return () => {
            stopWatchingVisibility()
            observer?.disconnect()
            sectionObserver.disconnect()
            document.removeEventListener('visibilitychange', onVisibilityChange)
            document.removeEventListener('freeze', pause)
            document.removeEventListener('resume', resume)
            window.removeEventListener('pagehide', pause)
            window.removeEventListener('pageshow', resume)
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
            scheduleVisibilityChecks()
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
            color: localIndex % 4 === 2 ? 'var(--home-band-secondary)' : undefined,
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
    const topRows = useMemo(() => Array.from({length: segments * 4}, (_, column) => ROWS[column * 5 % ROWS.length]), [segments])
    const seed = bandSeed(index, verticalSlot)
    const pattern = useMemo(() => createBandPattern(index, seed, width), [index, seed, width])
    const tileOrigin = (width - pattern.tileWidth) / 2
    const firstTile = -Math.ceil((pattern.repeats - 1) / 2)
    const tileCount = pattern.repeats + (pattern.repeats % 2 === 0 ? 1 : 0)
    const unit = bottom ? Math.max(3, Math.min(12, height / 27)) : height / 10.8
    const bottomHalfWidth = width / 2
    const topSpan = (topRows.length - 1) * TOP_ROW_STEP / Math.sin(TOP_TILT * Math.PI / 180) + 6
    const stretchX = bottom ? bottomHalfWidth * 1.2 / (34 * unit) : width * 1.08 / (topSpan * unit)
    const styles = {
        '--scene-unit': `${unit}px`,
        '--scene-stretch-x': stretchX,
        '--scene-stretch-y': bottom ? height * 0.9 / (30 * unit) : 1,
        '--scene-left': bottom ? `${-3 * unit * stretchX - bottomHalfWidth * 0.05}px` : `${2 * unit * stretchX - width * 0.04}px`,
        '--scene-top': bottom ? '37%' : '58%',
        '--scene-tilt': `${TOP_TILT}deg`,
        '--home-signal-duration': `${pattern.duration.toFixed(2)}s`,
        '--home-signal-phase': `${pattern.phase.toFixed(2)}s`,
    }
    return <div ref={ref} className={`home-decoration-art home-decoration-art--${middle ? 'middle' : bottom ? 'bottom' : 'top'}`}
                style={styles} data-running="false" data-variant={pattern.palette}
                data-top-groups={!middle && !bottom ? segments : undefined}
                data-pattern={middle ? pattern.family : undefined} data-seed={middle ? seed : undefined}
                data-vertical-slot={middle ? verticalSlot : undefined} aria-hidden="true">
        {middle ? <svg className="home-signal-pattern" viewBox={`0 0 ${width} 40`} preserveAspectRatio="none" focusable="false">
            <defs>
                <linearGradient id={`${id}-ink`} x1="0" x2="0" y1="0" y2="1">
                    <stop stopColor="var(--home-band-accent)"/>
                    <stop offset=".5" stopColor="var(--home-band-secondary)"/>
                    <stop offset="1" stopColor="var(--home-band-accent)"/>
                </linearGradient>
                {pattern.paths.map((path, line) => <path key={line} id={`${id}-path-${line}`} d={path}
                    fill="none" vectorEffect="non-scaling-stroke" pathLength="100"/>)}
                <pattern id={id} width={pattern.tileWidth} height="40" x={tileOrigin} patternUnits="userSpaceOnUse">
                    {pattern.paths.map((_, line) => <use key={line} href={`#${id}-path-${line}`}
                        className="home-signal-track" stroke={`url(#${id}-ink)`}/>)}
                </pattern>
            </defs>
            <rect width={width} height="40" fill={`url(#${id})`}/>
            {/* Keep animation on rendered instances, outside the pattern's tile cache. */}
            {Array.from({length: tileCount}, (_, tile) => <g key={tile}
                transform={`translate(${tileOrigin + (firstTile + tile) * pattern.tileWidth} 0)`}>
                {pattern.paths.map((_, line) => <use key={line} href={`#${id}-path-${line}`}
                    className="home-signal-pulse" stroke={`url(#${id}-ink)`}
                    style={{animationDelay: `${pattern.phase - line * 0.7}s`,
                        animationDirection: pattern.family >= 4 && line % 2 ? 'reverse' : undefined}}/>)}
            </g>)}
        </svg> : bottom ? <div className="home-roller-halves">
            {[false, true].map(mirror => <div className="home-roller-half" key={String(mirror)} data-mirror={mirror}>
                <RollerGroup rows={BOTTOM_ROWS} bottom/>
            </div>)}
        </div> : <RollerGroup rows={topRows}/>}
    </div>
}

export default HomeDecorationBand
