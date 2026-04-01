import "./IllustratedManuscript.scss"
import React, { useEffect, useRef, useState } from "react"
import createIllustratedManuscript from "./illustratedManuscript/createIllustratedManuscript.js"

function IllustratedManuscript({
    assetBasePath = "/images/writing/manuscript",
    className = ""
}) {
    const canvasRef = useRef(null)
    const [status, setStatus] = useState("loading")

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined

        setStatus("loading")

        const manuscript = createIllustratedManuscript({
            canvas,
            assetBasePath,
            onReady: () => setStatus("ready"),
            onError: () => setStatus("error")
        })

        return () => {
            manuscript?.destroy?.()
        }
    }, [assetBasePath])

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
                    aria-label={`Interactive illustrated manuscript with a dragon that follows the pointer and breathes fire on click or tap.`}/>
        </div>
    )
}

export default IllustratedManuscript
