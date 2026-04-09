import "./SectionContent.scss"
import React, {useEffect, useState} from 'react'
import {createPortal} from "react-dom"
import SectionHeader from "./SectionHeader.jsx"
import SectionBody from "./SectionBody.jsx"
import FallingWords from "../generic/FallingWords.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

function SectionContent({ section }) {
    const language = useLanguage()
    const [scrollableWrapperEl, setScrollableWrapperEl] = useState(null)

    const sectionId = section?.id || null
    const wordPillsLocales = section?.id === "my-writings" ?
        section?.data?.wordPills?.locales :
        null
    const wordPillsText = wordPillsLocales ?
        language.getTranslation(wordPillsLocales, "text", null) :
        null

    useEffect(() => {
        if(!sectionId) {
            setScrollableWrapperEl(null)
            return
        }

        const scrollableEl = document.getElementById(`scrollable-${sectionId}`)
        setScrollableWrapperEl(scrollableEl?.parentElement || null)
    }, [sectionId])

    return (
        <div className={`section-content`}>
            <div className={`section-content-border-decoration section-content-border-decoration-top-left`}/>

            <div className={`section-content-elements-wrapper`}>
                <SectionHeader section={section}/>
                <SectionBody section={section}/>
            </div>

            {wordPillsText && scrollableWrapperEl && createPortal(
                <div className={`section-content-falling-words-overlay`}>
                    <FallingWords text={wordPillsText} height={`100%`}/>
                </div>,
                scrollableWrapperEl
            )}
        </div>
    )
}

export default SectionContent
