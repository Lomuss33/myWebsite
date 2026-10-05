import React, {useEffect, useRef, useState} from 'react'
import {softwareStickerArt} from '../../../../data/generated/softwareStickerArt.generated.js'
import './softwareStickerPalettes.generated.css'
import './SoftwareProjectStickerLayer.scss'

// Image, rotation, horizontal offset and vertical offset (fractions of size).
const PROJECT_STICKERS = {
    1: [['01-language.svg', -8, -0.08, -0.24], ['02-practice.svg', 7, 0.05, -0.05]],
    2: [['03-cards.svg', 6, 0.16, -0.02], ['04-club.svg', -10, -0.18, -0.26]],
    3: [['05-pepper.svg', -6, 0.04, -0.28], ['06-dealing.svg', 9, 0.14, 0.02]],
    4: [['07-house.svg', 9, -0.04, 0.01], ['08-mountain.svg', -7, -0.12, -0.20]],
    5: [['09-family.svg', -10, 0.20, -0.18], ['10-privacy.svg', 5, 0.08, -0.02]],
    6: [['11-cv.svg', 5, 0.10, -0.04], ['12-type.svg', -9, -0.22, -0.24]],
    7: [['13-website.svg', -7, -0.06, -0.22], ['14-code.svg', 11, -0.03, 0.02]]
}

// Section-level cutouts follow card rectangles without affecting their layout.
function SoftwareProjectStickerLayer() {
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
            const body = sectionContent.querySelector('.section-body') || sectionContent
            const bodyOpacity = Number(getComputedStyle(body).opacity)

            for(const card of cards) {
                const id = card.dataset.softwareProjectId
                const rect = card.getBoundingClientRect()
                const width = rect.width / scale
                const left = (rect.left - sectionRect.left) / scale
                const top = (rect.top - sectionRect.top) / scale
                const revealWrapper = card.closest('.transitionable-item')
                const opacity = rect.width > 0 ? bodyOpacity * (revealWrapper ? Number(getComputedStyle(revealWrapper).opacity) : 1) : 0
                const size = Math.min(104, Math.max(40, width * 0.16))

                for(const [index, position] of ['top-left', 'top-right'].entries()) {
                    const sticker = stickerRefs.current.get(`${id}-${position}`)
                    if(!sticker) continue
                    const [, , offsetX, offsetY] = PROJECT_STICKERS[id][index]
                    const anchor = index === 0 ? left + size * 0.08 : left + width - size * 0.92
                    const x = Math.max(10, Math.min(pageWidth - size - 10, anchor + size * offsetX))
                    const y = Math.max(0, top + size * offsetY)

                    sticker.style.width = `${size}px`
                    sticker.style.height = `${size}px`
                    sticker.style.transform = `translate3d(${x}px, ${y}px, 0)`
                    sticker.style.opacity = String(opacity)
                }
            }
        }

        const follow = timestamp => {
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
            const nextCards = Array.from(sectionContent.querySelectorAll('[data-software-project-id]'))
                .filter(card => PROJECT_STICKERS[card.dataset.softwareProjectId])
            if(nextCards.length !== cards.length || nextCards.some((card, index) => card !== cards[index])) {
                cards = nextCards
                setVisibleProjects(cards.map(card => card.dataset.softwareProjectId))
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

        const onMotion = event => {
            if(layer.contains(event.target)) return
            if(event.target.closest?.('#article-1-section-my-software') || event.target.matches?.('.section-body, .section-content-elements-wrapper'))
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
        <div ref={layerRef} className="software-project-sticker-layer" aria-hidden="true">
            {visibleProjects.flatMap(id => ['top-left', 'top-right'].map((position, index) => {
                const [filename, rotation] = PROJECT_STICKERS[id][index]
                const artwork = softwareStickerArt[filename]
                const key = `${id}-${position}`
                return (
                    <div key={key}
                         ref={element => {
                             if(element) stickerRefs.current.set(key, element)
                             else stickerRefs.current.delete(key)
                         }}
                         className={`software-project-sticker software-project-sticker--${position}`}
                         data-sticker-project-id={id}
                         style={{'--sticker-rotation': `${rotation}deg`}}>
                        <svg width="256" height="256" viewBox="0 0 256 256"
                             aria-hidden="true" focusable="false"
                             dangerouslySetInnerHTML={{__html: artwork.markup}}/>
                    </div>
                )
            }))}
        </div>
    )
}

export default SoftwareProjectStickerLayer
