import React, {useEffect, useRef, useState} from 'react'
import {_imageUtils} from '../../../../hooks/utils/_image-utils.js'
import './HardwareProjectStickerLayer.scss'

const ASSET_ROOT = '/images/stickers/hardware-experiments/'
// Images, rotations, then horizontal offsets as fractions of sticker width.
const PROJECT_STICKERS = {
    1: ['01-server-studio.png', '02-ethernet-holographic.png', -7, 8, -0.10, 0.48],
    4: ['03-conveyor-isometric.png', '04-sensor-cyanotype.png', 6, -8, -0.38, 0.20],
    5: ['05-oven-chrome.png', '06-carwash-enamel.png', -5, 7, 0.06, 0.62],
    7: ['07-flag-acrylic.png', '08-motors-risograph.png', 8, -6, -0.25, 0.34],
    8: ['09-curtain-paper.png', '10-sensor-ceramic.png', -6, 9, -0.16, 0.08],
    10: ['11-houses-frosted.png', '12-panel-retrofuture.png', 5, -7, -0.34, 0.55],
    11: ['13-ebike-airbrush.png', '14-drivetrain-titanium.png', -8, 6, -0.04, 0.28],
    22: ['15-pc-faceted.png', '16-gpu-linocut.png', 7, -9, -0.22, 0.44]
}

// This is a direct SectionContent child, above the articles and their clipping
// wrappers. Card rectangles anchor the artwork without moving it into a card.
function HardwareProjectStickerLayer() {
    const layerRef = useRef(null)
    const stickerRefs = useRef(new Map())
    const [visibleProjects, setVisibleProjects] = useState([])

    useEffect(() => {
        const layer = layerRef.current
        const sectionContent = layer?.parentElement
        if(!sectionContent) return undefined

        let cards = []
        let frameId = null
        let followUntil = 0
        let disposed = false

        const measure = () => {
            const sectionRect = sectionContent.getBoundingClientRect()
            if(sectionRect.width <= 0 || sectionContent.offsetWidth <= 0) {
                layer.style.visibility = 'hidden'
                return
            }

            layer.style.visibility = 'visible'
            const scale = sectionRect.width / sectionContent.offsetWidth
            const pageWidth = sectionContent.offsetWidth
            const bodyOpacity = Number(getComputedStyle(sectionContent.querySelector('.section-body') || sectionContent).opacity)

            for(const card of cards) {
                const id = card.dataset.hardwareProjectId
                const rect = card.getBoundingClientRect()
                const width = rect.width / scale
                const height = rect.height / scale
                const left = (rect.left - sectionRect.left) / scale
                const top = (rect.top - sectionRect.top) / scale
                const revealWrapper = card.closest('.transitionable-item')
                const opacity = rect.width > 0 ? bodyOpacity * (revealWrapper ? Number(getComputedStyle(revealWrapper).opacity) : 1) : 0

                for(const position of ['top-right', 'bottom-left']) {
                    const sticker = stickerRefs.current.get(`${id}-${position}`)
                    if(!sticker) continue

                    const isTop = position === 'top-right'
                    const baseWidth = Math.min(isTop ? 240 : 210, Math.max(isTop ? 100 : 90, width * (isTop ? 0.35 : 0.30)))
                    const baseHeight = Math.min(baseWidth, height * (isTop ? 0.42 : 0.36), isTop ? 210 : 180)
                    const sizeScale = (id === '8' && isTop ? 0.5 : 1) * (1.4 / 3)
                    const stickerWidth = baseWidth * sizeScale
                    const stickerHeight = baseHeight * sizeScale
                    const horizontalOffset = PROJECT_STICKERS[id][isTop ? 4 : 5] * stickerWidth
                    const proposedLeft = (isTop ? left + width - stickerWidth * 0.88 : left - stickerWidth * 0.10) + horizontalOffset
                    const x = Math.max(16, Math.min(pageWidth - stickerWidth - 16, proposedLeft))
                    const y = Math.max(0, isTop ? top - stickerHeight * 0.15 : top + height - stickerHeight * 1.10)

                    sticker.style.width = `${stickerWidth}px`
                    sticker.style.height = `${stickerHeight}px`
                    sticker.style.transform = `translate3d(${x}px, ${y}px, 0)`
                    sticker.style.opacity = String(opacity)
                }
            }
        }

        const follow = (timestamp) => {
            frameId = null
            if(disposed) return
            measure()
            if(timestamp < followUntil) frameId = requestAnimationFrame(follow)
        }

        const scheduleMeasure = (duration = 0) => {
            if(disposed) return
            followUntil = Math.max(followUntil, performance.now() + duration)
            if(frameId === null) frameId = requestAnimationFrame(follow)
        }

        const resizeObserver = new ResizeObserver(() => scheduleMeasure())
        const syncCards = () => {
            const nextCards = Array.from(sectionContent.querySelectorAll('[data-hardware-project-id]'))
                .filter(card => PROJECT_STICKERS[card.dataset.hardwareProjectId])
            if(nextCards.length !== cards.length || nextCards.some((card, index) => card !== cards[index])) {
                cards = nextCards
                setVisibleProjects(cards.map(card => card.dataset.hardwareProjectId))
                resizeObserver.disconnect()
                resizeObserver.observe(sectionContent)
                for(const card of cards) resizeObserver.observe(card)
            }
            scheduleMeasure(750)
        }

        const mutationObserver = new MutationObserver(records => {
            if(records.every(record => layer.contains(record.target))) return
            syncCards()
        })
        mutationObserver.observe(sectionContent, {childList: true, subtree: true, attributes: true, attributeFilter: ['class']})
        resizeObserver.observe(sectionContent)

        // Follow entrance and hover transforms briefly; no permanent frame loop.
        const onMotion = event => {
            if(layer.contains(event.target)) return
            if(event.target.closest?.('#article-1-section-my-hardware') || event.target.matches?.('.section-body, .section-content-elements-wrapper'))
                scheduleMeasure(750)
        }
        const onResize = () => scheduleMeasure(750)
        const motionEvents = ['animationstart', 'animationend', 'animationcancel', 'transitionrun', 'transitionend', 'transitioncancel', 'pointerover', 'pointerout']
        for(const event of motionEvents) sectionContent.addEventListener(event, onMotion, true)
        window.addEventListener('resize', onResize)
        document.fonts?.ready.then(() => scheduleMeasure(250))
        syncCards()

        return () => {
            disposed = true
            if(frameId !== null) cancelAnimationFrame(frameId)
            resizeObserver.disconnect()
            mutationObserver.disconnect()
            for(const event of motionEvents) sectionContent.removeEventListener(event, onMotion, true)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <div ref={layerRef} className="hardware-project-sticker-layer" aria-hidden="true">
            {visibleProjects.flatMap(id => ['top-right', 'bottom-left'].map((position, index) => {
                const [topImage, bottomImage, topRotation, bottomRotation] = PROJECT_STICKERS[id]
                const source = _imageUtils.normalizeSource(ASSET_ROOT + (index === 0 ? topImage : bottomImage))
                const key = `${id}-${position}`
                return (
                    <div key={key}
                         ref={element => {
                             if(element) stickerRefs.current.set(key, element)
                             else stickerRefs.current.delete(key)
                         }}
                         className={`hardware-project-sticker hardware-project-sticker--${position}`}
                         data-sticker-project-id={id}
                         style={{'--sticker-rotation': `${index === 0 ? topRotation : bottomRotation}deg`}}>
                        <img src={source.resolvedSrc}
                             srcSet={source.srcSet || undefined}
                             sizes="(max-width: 600px) 160px, 240px"
                             width={source.width || undefined}
                             height={source.height || undefined}
                             alt=""
                             loading="lazy"
                             decoding="async"
                             draggable={false}/>
                    </div>
                )
            }))}
        </div>
    )
}

export default HardwareProjectStickerLayer
