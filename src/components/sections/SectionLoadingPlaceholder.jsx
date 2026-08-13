import "./SectionLoadingPlaceholder.scss"
import React from "react"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"

function SectionLoadingPlaceholder({ section }) {
    const language = useLanguage()
    const navigation = useNavigation()
    const sectionLink = navigation.sectionLinks.find(({ id }) => id === section?.id)
    const title = sectionLink?.label || section?.id || ""
    const plainTitle = title.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
    const loadingLabel = language.getString("loading")

    return (
        <div className="section-loading-placeholder"
             role="status"
             aria-live="polite"
             aria-label={`${loadingLabel}: ${plainTitle}`}>
            <div className="section-loading-placeholder-status">
                <span className="section-loading-placeholder-icon" aria-hidden="true">
                    <i className={sectionLink?.faIcon || section?.faIcon || "fa-solid fa-layer-group"}/>
                </span>

                <span className="section-loading-placeholder-copy">
                    <span className="section-loading-placeholder-kicker">{loadingLabel}</span>
                    <strong dangerouslySetInnerHTML={{__html: title}}/>
                </span>
                <span className="section-loading-placeholder-pulse" aria-hidden="true"/>
            </div>
        </div>
    )
}

export default SectionLoadingPlaceholder
