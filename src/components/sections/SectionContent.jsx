import "./SectionContent.scss"
import React, {useLayoutEffect, useRef, useState} from 'react'
import SectionHeader from "./SectionHeader.jsx"
import SectionBody from "./SectionBody.jsx"
import SectionDecorationBand from "./SectionDecorationBand.jsx"
import SectionDecorationLayer from "./decorations/SectionDecorationLayer.jsx"

function SectionContent({ section }) {
    const contentRef = useRef(null)
    const lastLayoutMetricsRef = useRef({
        bottomCollapse: null,
        renderedContentHeight: null
    })
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
            const sectionContentEl = contentEl.closest(".section-content")
            const bottomBandEl = contentEl.querySelector(".section-decoration-band-page-bottom")
            const contentVisualHeight = sectionContentEl && bottomBandEl ?
                bottomBandEl.getBoundingClientRect().bottom - sectionContentEl.getBoundingClientRect().top :
                renderedHeight

            const nextRenderedContentHeight = Math.max(0, Math.ceil(contentVisualHeight))
            const previousMetrics = lastLayoutMetricsRef.current

            if(previousMetrics.bottomCollapse !== collapse) {
                previousMetrics.bottomCollapse = collapse
                setBottomCollapse(collapse)
            }
            if(previousMetrics.renderedContentHeight !== nextRenderedContentHeight) {
                previousMetrics.renderedContentHeight = nextRenderedContentHeight
                setRenderedContentHeight(nextRenderedContentHeight)
            }
        }

        let animationFrameId = null
        let delayedUpdateId = null
        const scheduleBottomCollapseUpdate = () => {
            if(animationFrameId !== null)
                window.cancelAnimationFrame(animationFrameId)
            if(delayedUpdateId !== null)
                window.clearTimeout(delayedUpdateId)

            animationFrameId = window.requestAnimationFrame(() => {
                updateBottomCollapse()
                delayedUpdateId = window.setTimeout(updateBottomCollapse, 120)
            })
        }

        updateBottomCollapse()

        if(typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", scheduleBottomCollapseUpdate)
            return () => {
                window.removeEventListener("resize", scheduleBottomCollapseUpdate)
                if(animationFrameId !== null)
                    window.cancelAnimationFrame(animationFrameId)
                if(delayedUpdateId !== null)
                    window.clearTimeout(delayedUpdateId)
            }
        }

        const resizeObserver = new ResizeObserver(() => {
            scheduleBottomCollapseUpdate()
        })
        const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(scheduleBottomCollapseUpdate)

        resizeObserver.observe(contentEl)
        mutationObserver?.observe(contentEl, { childList: true })
        const sectionBodyEl = contentEl.querySelector(".section-body")
        if(sectionBodyEl)
            mutationObserver?.observe(sectionBodyEl, { childList: true })
        window.addEventListener("resize", scheduleBottomCollapseUpdate)

        return () => {
            resizeObserver.disconnect()
            mutationObserver?.disconnect()
            window.removeEventListener("resize", scheduleBottomCollapseUpdate)
            if(animationFrameId !== null)
                window.cancelAnimationFrame(animationFrameId)
            if(delayedUpdateId !== null)
                window.clearTimeout(delayedUpdateId)
        }
    }, [section?.id])

    const decorationClassName = [
        shouldShowDecorationBands ? "section-content-has-decoration-bands" : "",
        shouldHideHeader ? "section-content-hide-header" : ""
    ].filter(Boolean).join(" ")

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
                <SectionDecorationLayer section={section}/>

                {shouldShowDecorationBands && shouldHideHeader && (
                    <SectionDecorationBand type="page-top"
                                           sectionId={section?.id}/>
                )}

                {!shouldHideHeader && (
                    <>
                        <SectionHeader section={section}/>

                        {shouldShowDecorationBands && (
                            <SectionDecorationBand type="after-header"
                                                   sectionId={section?.id}/>
                        )}
                    </>
                )}

                <SectionBody section={section}
                             showDecorationBands={shouldShowDecorationBands}/>

                {shouldShowDecorationBands && (
                    <SectionDecorationBand type="page-bottom"
                                           sectionId={section?.id}/>
                )}
            </div>
        </div>
    )
}

export default SectionContent
