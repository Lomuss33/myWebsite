import React from 'react'
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import CircularButton from "../../buttons/CircularButton.jsx"

function NavToolShrinkToggle({ expanded, onToggle }) {
    const language = useLanguage()

    return (
        <CircularButton onClick={onToggle}
                        faIcon={"fa-solid fa-play"}
                        size={CircularButton.Sizes.DEFAULT}
                        variant={CircularButton.Variants.BLEND}
                        tooltip={language.getString("toggle_sidebar")}
                        className={`nav-sidebar-btn-toggle`}/>
    )
}

export default NavToolShrinkToggle
