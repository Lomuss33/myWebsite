import React from 'react'
import {useUtils} from "../../../hooks/utils.js"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"

function NavToolFullscreenToggle() {
    const utils = useUtils()
    const language = useLanguage()

    const isFullscreen = utils.capabilities.isFullscreen()

    const tooltip = isFullscreen ?
        language.getString("full_screen_exit") :
        language.getString("full_screen_enter")

    const faIcon = isFullscreen ?
        "fa-solid fa-minimize" :
        "fa-solid fa-maximize"

    return (
        <button type="button"
                className="section-fullscreen-control"
                aria-label={tooltip}
                data-tooltip={tooltip}
                onClick={utils.capabilities.toggleFullscreen}>
            <i className={faIcon} aria-hidden="true"/>
        </button>
    )
}

export default NavToolFullscreenToggle
