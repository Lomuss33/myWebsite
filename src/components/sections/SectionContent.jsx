import "./SectionContent.scss"
import React, {Suspense} from 'react'
import SectionHeader from "./SectionHeader.jsx"
import SectionBody from "./SectionBody.jsx"
import SectionDecorationBand from "./SectionDecorationBand.jsx"
import SectionDecorationLayer from "./decorations/SectionDecorationLayer.jsx"
import SectionLoadingPlaceholder from "./SectionLoadingPlaceholder.jsx"

function SectionContent({ section, shouldRenderContent = true }) {
    const shouldHideHeader = section?.hideHeader === true
    const shouldShowDecorationBands = section?.id !== "about" && section?.id !== "contact"

    const decorationClassName = [
        shouldShowDecorationBands ? "section-content-has-decoration-bands" : "",
        !shouldShowDecorationBands ? "section-content-no-decoration-bands" : "",
        shouldHideHeader ? "section-content-hide-header" : "",
        shouldRenderContent ? "section-content-page-ready" : "section-content-page-loading"
    ].filter(Boolean).join(" ")

    const loadingPlaceholder = <SectionLoadingPlaceholder section={section}/>

    return (
        <div className={`section-content ${decorationClassName}`.trim()}>
            <div className={`section-content-border-decoration section-content-border-decoration-top-left`}/>

            <div className={`section-content-elements-wrapper`}>
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
