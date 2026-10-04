import { useLayoutEffect, useMemo, useRef, useState } from "react"
import { layoutDraggableInlineParagraphs } from "./pretextDraggableInlineFlow.js"

// The same line-slot exclusion approach as the illustrated manuscript, in DOM text.
export default function PretextObstacleText({ blocks, obstacle, className = "", paragraphClassName = "", externalRef }) {
    const rootRef = useRef(null)
    const sourceRef = useRef(null)
    const [metrics, setMetrics] = useState(null)
    useLayoutEffect(() => {
        const root = rootRef.current
        let live = true
        const measure = () => {
            if (!live) return
            const style = getComputedStyle(root)
            const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
            const config = { font, letterSpacing: parseFloat(style.letterSpacing) || 0 }
            setMetrics({ width: root.clientWidth, naturalHeight: sourceRef.current.offsetHeight, typography: {
                fonts: { body: config, strong: config, em: config, strongEm: config },
                lineHeight: parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.5,
                paragraphGap: parseFloat(style.rowGap) || 12
            } })
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(root)
        document.fonts?.ready.then(measure)
        window.addEventListener("resize", measure)
        return () => { live = false; observer.disconnect(); window.removeEventListener("resize", measure) }
    }, [blocks])

    const paragraphs = useMemo(() => blocks.map(text => ({ block: "p", runs: [{ text, marks: {} }] })), [blocks])
    const rect = rootRef.current?.getBoundingClientRect()
    const localObstacle = useMemo(() => obstacle && rect && obstacle.top + obstacle.height > rect.top && obstacle.top < rect.top + (metrics?.naturalHeight || 0)
        ? { ...obstacle, left: obstacle.left - rect.left, top: obstacle.top - rect.top, horizontalPadding: 8, verticalPadding: 5, minimumSlotWidth: 42, includeInHeight: false }
        : null, [obstacle, rect?.left, rect?.top, metrics?.naturalHeight])
    const layout = useMemo(() => metrics && localObstacle
        ? layoutDraggableInlineParagraphs(paragraphs, metrics.typography, metrics.width, localObstacle)
        : null, [metrics, localObstacle, paragraphs])
    return <div ref={element => { rootRef.current = element; if (externalRef) externalRef.current = element }} className={className} style={{ position: "relative", display: "block", minHeight: layout ? Math.max(metrics.naturalHeight, layout.totalHeight) : undefined }}>
        <div ref={sourceRef} style={{ display: "grid", rowGap: "inherit", ...(layout ? { position: "absolute", inset: "0 0 auto", visibility: "hidden" } : {}) }}>
            {blocks.map((text, index) => <p key={index} className={paragraphClassName}>{text}</p>)}
        </div>
        {layout && <>
            <div className="visually-hidden">{blocks.map((text, index) => <p key={index}>{text}</p>)}</div>
            <div aria-hidden="true">{layout.lines.map(line => <div key={line.key} style={{ position: "absolute", left: line.x, top: line.y, whiteSpace: "pre", lineHeight: `${metrics.typography.lineHeight}px` }}>
                {line.fragments.map(fragment => <span key={fragment.key} style={{ marginLeft: fragment.leadingGap || 0 }}>{fragment.text}</span>)}
            </div>)}</div>
        </>}
    </div>
}
