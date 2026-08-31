import "./SectionContent.scss"
import React, {Suspense, useLayoutEffect, useRef, useState} from 'react'
import SectionHeader from "./SectionHeader.jsx"
import SectionBody from "./SectionBody.jsx"
import SectionDecorationBand from "./SectionDecorationBand.jsx"
import SectionDecorationLayer from "./decorations/SectionDecorationLayer.jsx"
import SectionLoadingPlaceholder from "./SectionLoadingPlaceholder.jsx"

function SectionContent({ section, shouldRenderContent = true }) {
    const contentRef = useRef(null)
    const lastRenderedContentHeightRef = useRef(null)
    const [renderedContentHeight, setRenderedContentHeight] = useState(0)
    const shouldHideHeader = section?.hideHeader === true
    const shouldShowDecorationBands = section?.id !== "about" && section?.id !== "contact"

    useLayoutEffect(() => {
        const contentEl = contentRef.current
        if(!contentEl)
            return
        const sectionContentEl = contentEl.closest(".section-content")

        const updateRenderedContentHeight = () => {
            if(!sectionContentEl)
                return

            const measuredBoundaryEl =
                contentEl.querySelector(".section-decoration-boundary-page-bottom") ||
                contentEl.lastElementChild
            const fallbackBottom = contentEl.getBoundingClientRect().bottom
            const measuredBottom = measuredBoundaryEl?.getBoundingClientRect?.().bottom || fallbackBottom
            const contentVisualHeight = measuredBottom - sectionContentEl.getBoundingClientRect().top

            const nextRenderedContentHeight = Math.max(0, Math.ceil(contentVisualHeight))
            if(lastRenderedContentHeightRef.current !== nextRenderedContentHeight) {
                lastRenderedContentHeightRef.current = nextRenderedContentHeight
                setRenderedContentHeight(nextRenderedContentHeight)
            }
        }

        let animationFrameId = null
        let delayedUpdateId = null
        let isUpdateScheduled = false
        const scheduleRenderedHeightUpdate = () => {
            if(isUpdateScheduled)
                return

            if(delayedUpdateId !== null)
                window.clearTimeout(delayedUpdateId)

            isUpdateScheduled = true
            animationFrameId = window.requestAnimationFrame(() => {
                animationFrameId = null
                isUpdateScheduled = false
                updateRenderedContentHeight()
                delayedUpdateId = window.setTimeout(updateRenderedContentHeight, 120)
            })
        }

        updateRenderedContentHeight()

        if(typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", scheduleRenderedHeightUpdate)
            return () => {
                window.removeEventListener("resize", scheduleRenderedHeightUpdate)
                if(animationFrameId !== null)
                    window.cancelAnimationFrame(animationFrameId)
                if(delayedUpdateId !== null)
                    window.clearTimeout(delayedUpdateId)
            }
        }

        const resizeObserver = new ResizeObserver(() => {
            scheduleRenderedHeightUpdate()
        })
        const mutationObserver = typeof MutationObserver === "undefined" ? null :
            new MutationObserver(scheduleRenderedHeightUpdate)

        resizeObserver.observe(contentEl)
        resizeObserver.observe(sectionContentEl)
        mutationObserver?.observe(contentEl, {
            subtree: true,
            childList: true,
            attributes: true,
            characterData: true
        })
        window.addEventListener("resize", scheduleRenderedHeightUpdate)
        window.addEventListener("load", scheduleRenderedHeightUpdate)
        window.addEventListener("app:resume", scheduleRenderedHeightUpdate)
        document.fonts?.ready?.then?.(() => {
            scheduleRenderedHeightUpdate()
        })

        return () => {
            resizeObserver.disconnect()
            mutationObserver?.disconnect()
            window.removeEventListener("resize", scheduleRenderedHeightUpdate)
            window.removeEventListener("load", scheduleRenderedHeightUpdate)
            window.removeEventListener("app:resume", scheduleRenderedHeightUpdate)
            if(animationFrameId !== null)
                window.cancelAnimationFrame(animationFrameId)
            if(delayedUpdateId !== null)
                window.clearTimeout(delayedUpdateId)
        }
    }, [section?.id])

    const decorationClassName = [
        shouldShowDecorationBands ? "section-content-has-decoration-bands" : "",
        shouldHideHeader ? "section-content-hide-header" : "",
        shouldRenderContent ? "section-content-page-ready" : "section-content-page-loading"
    ].filter(Boolean).join(" ")

    const loadingPlaceholder = <SectionLoadingPlaceholder section={section}/>

    return (
        <div className={`section-content ${decorationClassName}`.trim()}
             style={{
                 "--section-content-rendered-height": `${renderedContentHeight}px`
             }}>
            <div className={`section-content-border-decoration section-content-border-decoration-top-left`}/>

            <div className={`section-content-elements-wrapper`}
                 ref={contentRef}>
                {shouldRenderContent ? (
                    <Suspense fallback={loadingPlaceholder}>
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
                    </Suspense>
                ) : loadingPlaceholder}
            </div>
        </div>
    )
}

export default SectionContent
