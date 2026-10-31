import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigation } from "../../../../providers/NavigationProvider.jsx"
import sendYoursHexLoopSource from "../sendYoursHexLoopEngine.js?raw"
import { prefersReducedMotion } from "../hooks/webArtDomUtils.js"

export function buildSendYoursHexLoopSrcDoc({ seed, reduceMotion }) {
    const engineSource = JSON.stringify(
        sendYoursHexLoopSource.split("</script>").join("<\\/script>")
    )
    const safeSeed = JSON.stringify(seed)
    const motionFlag = reduceMotion ? "true" : "false"

    return `<!doctype html>
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
const moduleSource = ${engineSource}
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
    reduceMotion: ${motionFlag},
    seed: ${safeSeed}
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
</script>
</body>
</html>`
}

export default function SendYourFunAnimationTile({ label, clickLabel, previewRequested = false }) {
    const navigation = useNavigation()
    const tileRef = useRef(null)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewSeed, setPreviewSeed] = useState(0)

    const reduceMotion = useMemo(() => prefersReducedMotion(), [])

    const openPreview = useCallback(() => {
        setPreviewSeed(Date.now())
        setPreviewOpen(true)
    }, [])

    const goToContact = useCallback(() => {
        navigation?.navigateToSectionWithId?.("contact")
    }, [navigation])

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            openPreview()
        }
    }

    const iframeSrcDoc = useMemo(() => {
        if(!previewOpen) return ""
        return buildSendYoursHexLoopSrcDoc({
            seed: `${previewSeed || Date.now()}:${label}`,
            reduceMotion
        })
    }, [label, previewOpen, previewSeed, reduceMotion])

    useEffect(() => {
        let frameOneId = 0
        let frameTwoId = 0

        if(previewRequested) {
            frameOneId = window.requestAnimationFrame(() => {
                frameTwoId = window.requestAnimationFrame(() => {
                    setPreviewSeed(Date.now())
                    setPreviewOpen(true)
                })
            })

            return () => {
                if(frameOneId) window.cancelAnimationFrame(frameOneId)
                if(frameTwoId) window.cancelAnimationFrame(frameTwoId)
            }
        }

        setPreviewOpen(false)
        return () => {
            if(frameOneId) window.cancelAnimationFrame(frameOneId)
            if(frameTwoId) window.cancelAnimationFrame(frameTwoId)
        }
    }, [previewRequested])

    return (
        <div ref={tileRef}
             role={"button"}
             tabIndex={0}
             className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta ${previewOpen ? "article-web-art-tile-cta-open" : "article-web-art-tile-cta-closed"}`}
             aria-label={previewOpen ? "Kontakt preview" : label}
             aria-pressed={previewOpen}
             onClick={openPreview}
             onKeyDown={onKeyDown}>
            <div className={`article-web-art-tile-cta-preview ${previewOpen ? "article-web-art-tile-cta-preview-visible" : ""}`}
                 aria-hidden={true}>
                {previewOpen && (
                    <iframe key={`${previewSeed}-${label}`}
                            className={`article-web-art-tile-cta-preview-frame`}
                            title={"Send yours preview"}
                            srcDoc={iframeSrcDoc}
                            sandbox={"allow-scripts"}/>
                )}
                <div className={`article-web-art-tile-cta-preview-vignette`}/>
            </div>

            {!previewOpen && (
                <div className={`loader ${reduceMotion ? "loader-reduce-motion" : ""}`}
                     aria-hidden={true}>
                    <div className={`loader-inner`}>
                        <div className={`loader-line-wrap`}>
                            <div className={`loader-line`}/>
                        </div>
                        <div className={`loader-line-wrap`}>
                            <div className={`loader-line`}/>
                        </div>
                        <div className={`loader-line-wrap`}>
                            <div className={`loader-line`}/>
                        </div>
                        <div className={`loader-line-wrap`}>
                            <div className={`loader-line`}/>
                        </div>
                        <div className={`loader-line-wrap`}>
                            <div className={`loader-line`}/>
                        </div>
                    </div>
                </div>
            )}

            <div className={`article-web-art-tile-cta-content ${previewOpen ? "article-web-art-tile-cta-content-hidden" : ""}`}>
                <div className={`article-web-art-tile-cta-title article-web-art-tile-cta-title-top`}>{label}</div>
                <div className={`article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom`}>{clickLabel}</div>
            </div>

            {previewOpen && (
                <button type={"button"}
                        className={`article-web-art-tile-cta-contact-pill`}
                        onClick={(event) => {
                            event.stopPropagation()
                            goToContact()
                        }}
                        onKeyDown={(event) => {
                            if(event.key === "Enter" || event.key === " ") {
                                event.preventDefault()
                                event.stopPropagation()
                                goToContact()
                            }
                        }}>
                    Kontakt
                </button>
            )}
        </div>
    )
}
