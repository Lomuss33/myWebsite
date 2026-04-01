import "./IllustratedManuscript.scss"
import React, { useEffect, useRef, useState } from "react"
import createIllustratedManuscript from "./illustratedManuscript/createIllustratedManuscript.js"

function htmlToPlainText(html) {
    const parser = new DOMParser()
    const documentNode = parser.parseFromString(`<div>${html || ""}</div>`, "text/html")
    return (documentNode.body.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
}

function IllustratedManuscript({
    assetBasePath = "/images/writing/manuscript",
    className = "",
    storyHtml = "",
    imageSrc = null,
    imageAlt = ""
}) {
    const canvasRef = useRef(null)
    const [status, setStatus] = useState("loading")
    const storyText = htmlToPlainText(storyHtml)
    const canvasLabel = imageAlt && !/^item-\d+$/i.test(imageAlt) ?
        `Interactive illustrated manuscript with a dragon that follows the pointer, breathes fire on click or tap, and floats above ${imageAlt}.` :
        `Interactive illustrated manuscript with a dragon that follows the pointer and breathes fire on click or tap.`

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined

        setStatus("loading")

        const manuscript = createIllustratedManuscript({
            canvas,
            assetBasePath,
            storyText,
            illustrationSrc: imageSrc,
            onReady: () => setStatus("ready"),
            onError: () => setStatus("error")
        })

        return () => {
            manuscript?.destroy?.()
        }
    }, [assetBasePath, imageSrc, storyText])

    return (
        <div className={`illustrated-manuscript ${className}`.trim()}>
            {status === "error" && (
                <div className={`illustrated-manuscript-overlay`}
                     role={`status`}
                     aria-live={`polite`}>
                    Manuscript failed to load.
                </div>
            )}

            <canvas ref={canvasRef}
                    className={`illustrated-manuscript-canvas`}
                    aria-label={canvasLabel}/>
        </div>
    )
}

export default IllustratedManuscript
