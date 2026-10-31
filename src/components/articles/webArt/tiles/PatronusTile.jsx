import React, { useEffect, useMemo, useRef } from 'react'
import patronusSvgMarkup from "../patronus.svg?raw"
import { prefersReducedMotion } from "../hooks/webArtDomUtils.js"

const PATRONUS_LAYER_SRCS = [
    "/images/web_art/patronus/bg.png",
    "/images/web_art/patronus/layer-1.png",
    "/images/web_art/patronus/layer-2.png",
    "/images/web_art/patronus/layer-4.png",
    "/images/web_art/patronus/layer-5.png",
    "/images/web_art/patronus/layer-6.png"
]

export default function PatronusTile({ locked = false }) {
    const tileRef = useRef(null)
    const layerRefs = useRef([])
    const progressRef = useRef(0)
    const manualUntilRef = useRef(0)
    const sceneLayerSrcs = PATRONUS_LAYER_SRCS

    const reduceMotion = useMemo(() => prefersReducedMotion(), [])

    useEffect(() => {
        const tile = tileRef.current
        if(!tile) return

        const layers = layerRefs.current.filter(Boolean)
        if(!layers.length) return

        let hovered = true
        let touchActive = false
        let touchPointerId = null
        let rafId = null

        const apply = (x, y) => {
            const tiltY = (x - 0.5) * 30
            for(let index = 0; index < layers.length; index++) {
                const layer = layers[index]
                const depthX = index * 18
                const depthY = index * 8
                const moveX = (x - 0.5) * depthX
                const moveY = (y - 0.5) * depthY
                layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateY(${tiltY}deg)`
            }
        }

        const applyLimited = (xRaw, yRaw) => {
            const dx = Math.max(-0.55, Math.min(0.55, (xRaw - 0.5) * 1.10))
            const dy = Math.max(-0.35, Math.min(0.35, (yRaw - 0.5) * 0.70))
            apply(0.5 + dx, 0.5 + dy)
        }

        const onMove = (e) => {
            const rect = tile.getBoundingClientRect()
            const x = (e.clientX - rect.left) / Math.max(1, rect.width)
            const y = (e.clientY - rect.top) / Math.max(1, rect.height)
            hovered = true
            manualUntilRef.current = performance.now() + 650
            applyLimited(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)))
        }

        const _posFromPointer = (e) => {
            const rect = tile.getBoundingClientRect()
            const x = (e.clientX - rect.left) / Math.max(1, rect.width)
            const y = (e.clientY - rect.top) / Math.max(1, rect.height)
            return {
                x: Math.max(0, Math.min(1, x)),
                y: Math.max(0, Math.min(1, y))
            }
        }

        const onPointerDown = (e) => {
            if(e.pointerType === "mouse") return
            touchActive = true
            touchPointerId = e.pointerId
            hovered = true
            manualUntilRef.current = performance.now() + 900
            const pos = _posFromPointer(e)
            applyLimited(pos.x, pos.y)
            if(reduceMotion) return
            if(rafId != null) return
            rafId = requestAnimationFrame(tick)
        }

        const onPointerMove = (e) => {
            if(!touchActive) return
            if(touchPointerId != null && e.pointerId !== touchPointerId) return
            hovered = true
            manualUntilRef.current = performance.now() + 900
            const pos = _posFromPointer(e)
            applyLimited(pos.x, pos.y)
        }

        const endTouch = (e) => {
            if(touchPointerId != null && e?.pointerId != null && e.pointerId !== touchPointerId) return
            touchActive = false
            touchPointerId = null
            hovered = true
            if(!reduceMotion && rafId == null) rafId = requestAnimationFrame(tick)
        }

        const onEnter = () => {
            hovered = true
            if(reduceMotion) return
            if(rafId != null) return
            rafId = requestAnimationFrame(tick)
        }

        const onLeave = () => {
            hovered = true
            if(!reduceMotion && rafId == null) rafId = requestAnimationFrame(tick)
        }

        const tick = () => {
            if(!hovered) return
            if(!reduceMotion && performance.now() >= manualUntilRef.current) {
                progressRef.current += 0.008
                const x = Math.sin(progressRef.current) * 0.5 + 0.5
                applyLimited(x, 0.5)
            }
            rafId = requestAnimationFrame(tick)
        }

        hovered = !locked

        tile.addEventListener("mouseenter", onEnter)
        tile.addEventListener("mousemove", onMove)
        tile.addEventListener("mouseleave", onLeave)
        tile.addEventListener("pointerdown", onPointerDown)
        tile.addEventListener("pointermove", onPointerMove)
        tile.addEventListener("pointerup", endTouch)
        tile.addEventListener("pointercancel", endTouch)
        applyLimited(0.5, 0.5)
        if(!reduceMotion && !locked) {
            rafId = requestAnimationFrame(tick)
        }

        return () => {
            tile.removeEventListener("mouseenter", onEnter)
            tile.removeEventListener("mousemove", onMove)
            tile.removeEventListener("mouseleave", onLeave)
            tile.removeEventListener("pointerdown", onPointerDown)
            tile.removeEventListener("pointermove", onPointerMove)
            tile.removeEventListener("pointerup", endTouch)
            tile.removeEventListener("pointercancel", endTouch)
            if(rafId != null) cancelAnimationFrame(rafId)
        }
    }, [locked, reduceMotion])

    return (
        <div ref={tileRef}
             className={`article-web-art-tile article-web-art-tile-patronus`}
             role={"img"}
             aria-label={`Patronus parallax tile`}>
            <div className={`patronus-card`}>
                <div className={`patronus-layer patronus-bg`}
                     ref={(el) => { layerRefs.current[0] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[0]}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[1] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[1]}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[2] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[2]}/>
                </div>
                <div className={`patronus-layer patronus-svg`}
                     ref={(el) => { layerRefs.current[3] = el }}
                     dangerouslySetInnerHTML={{
                         __html: patronusSvgMarkup
                     }}/>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[4] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[3]}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[5] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[4]}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[6] = el }}>
                    <img alt={""}
                         src={sceneLayerSrcs[5]}/>
                </div>
            </div>
            <span className={`article-web-art-tile-label`}>
                Patronus
            </span>
        </div>
    )
}
