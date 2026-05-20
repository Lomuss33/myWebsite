import "./SectionContent.scss"
import React, {useLayoutEffect, useRef, useState} from 'react'
import SectionHeader from "./SectionHeader.jsx"
import SectionBody from "./SectionBody.jsx"
import SectionDecorationBand from "./SectionDecorationBand.jsx"

function SectionContent({ section }) {
    const contentRef = useRef(null)
    const [bottomCollapse, setBottomCollapse] = useState(0)
    const [renderedContentHeight, setRenderedContentHeight] = useState(0)
    const shouldHideHeader = section?.hideHeader === true
    const shouldShowDecorationBands = section?.id !== "about" && section?.id !== "contact"

    useLayoutEffect(() => {
        const contentEl = contentRef.current
        if(!contentEl)
            return

        const updateBottomCollapse = () => {
            const layoutHeight = contentEl.offsetHeight || 0
            const renderedHeight = contentEl.getBoundingClientRect().height || 0
            const collapse = Math.max(0, Math.ceil(layoutHeight - renderedHeight))
            setBottomCollapse(collapse)
            setRenderedContentHeight(Math.ceil(renderedHeight))
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

    const decorationClassName = shouldShowDecorationBands ? "section-content-has-decoration-bands" : ""

    return (
        <div className={`section-content ${decorationClassName}`.trim()}
             style={{
                 "--section-content-collapse": `${bottomCollapse}px`,
                 "--section-content-rendered-height": `${renderedContentHeight}px`
             }}>
            <div className={`section-content-border-decoration section-content-border-decoration-top-left`}/>

            <div className={`section-content-elements-wrapper`}
                 ref={contentRef}
                 style={{ "--section-content-collapse": `${bottomCollapse}px` }}>
                {!shouldHideHeader && (
                    <SectionHeader section={section}/>
                )}

                <SectionBody section={section}
                             showDecorationBands={shouldShowDecorationBands}/>

                {shouldShowDecorationBands && (
                    <SectionDecorationBand type="page-bottom"/>
                )}
            </div>
        </div>
    )
}

export default SectionContent
