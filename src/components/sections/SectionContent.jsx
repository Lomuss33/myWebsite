import "./SectionContent.scss"
import React, {useLayoutEffect, useRef, useState} from 'react'
import SectionHeader from "./SectionHeader.jsx"
import SectionBody from "./SectionBody.jsx"

function SectionContent({ section }) {
    const contentRef = useRef(null)
    const [bottomCollapse, setBottomCollapse] = useState(0)

    useLayoutEffect(() => {
        const contentEl = contentRef.current
        if(!contentEl)
            return

        const updateBottomCollapse = () => {
            const layoutHeight = contentEl.offsetHeight || 0
            const renderedHeight = contentEl.getBoundingClientRect().height || 0
            const collapse = Math.max(0, Math.ceil(layoutHeight - renderedHeight))
            setBottomCollapse(collapse)
        }

        updateBottomCollapse()

        if(typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", updateBottomCollapse)
            return () => {
                window.removeEventListener("resize", updateBottomCollapse)
            }
        }

        const resizeObserver = new ResizeObserver(() => {
            updateBottomCollapse()
        })

        resizeObserver.observe(contentEl)
        window.addEventListener("resize", updateBottomCollapse)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener("resize", updateBottomCollapse)
        }
    }, [section?.id])

    return (
        <div className={`section-content`}>
            <div className={`section-content-border-decoration section-content-border-decoration-top-left`}/>

            <div className={`section-content-elements-wrapper`}
                 ref={contentRef}
                 style={{ "--section-content-collapse": `${bottomCollapse}px` }}>
                <SectionHeader section={section}/>
                <SectionBody section={section}/>
            </div>
        </div>
    )
}

export default SectionContent
