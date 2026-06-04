import React from 'react'
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import CircularButton from "../../buttons/CircularButton.jsx"

function NavToolShrinkToggle({ expanded, onToggle }) {
    const language = useLanguage()

    const faIcon = expanded ?
        "fa-solid fa-caret-left" :
        "fa-solid fa-caret-right"

    return (
        <CircularButton onClick={onToggle}
                        faIcon={faIcon}
                        size={CircularButton.Sizes.DEFAULT}
                        variant={CircularButton.Variants.BLEND}
                        tooltip={language.getString("toggle_sidebar")}
                        className={`nav-sidebar-btn-toggle`}/>
    )
}

export default NavToolShrinkToggle
