import "./NavToolList.scss"
import React from 'react'
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {useTheme} from "../../../providers/ThemeProvider.jsx"
import NavToolLanguagePicker from "../tools/NavToolLanguagePicker.jsx"
import NavToolThemePicker from "../tools/NavToolThemePicker.jsx"
import NavToolSettings from "../tools/NavToolSettings.jsx"

function NavToolList({ expanded, compactRail = false }) {
    const language = useLanguage()
    const theme = useTheme()

    const shrinkClass = expanded ?
        `` :
        `nav-tools-shrink`
    const toggleCaptionLayout = expanded && !compactRail ?
        "inline" :
        "stack"

    const widgets = [
        ...(language.supportsMultipleLanguages ? ["language"] : []),
        ...(theme.supportsMultipleThemes ? [NavToolSettings.Options.THEME] : []),
    ]

    const orderedWidgets = [
        ...widgets.filter(item => item === "language"),
        ...widgets.filter(item =>
            item !== NavToolSettings.Options.THEME &&
            item !== "language"
        ),
        ...widgets.filter(item => item === NavToolSettings.Options.THEME),
    ]

    return (
        <div className={`nav-tools ${shrinkClass}`}>
            {orderedWidgets.map((item, key) => (
                <div className={`nav-tools-item ${item === "language" ? "nav-tools-item-language" : ""} ${item === NavToolSettings.Options.DOWNLOAD_RESUME ? "nav-tools-item-resume" : ""} ${item === NavToolSettings.Options.THEME ? "nav-tools-item-theme" : ""}`}
                     key={key}>
                    {item === "language" && (<NavToolLanguagePicker dropdownDrop={"up"}
                                                                    showTooltip={true}
                                                                    menuClassName={"nav-tools-popup-menu"}
                                                                    toggleCaptionLayout={toggleCaptionLayout}
                                                                    toggleCaption={expanded ? language.getString("nav_tool_language") : null}/>)}
                    {item === NavToolSettings.Options.THEME && (<NavToolThemePicker showTooltip={true}
                                                                                    toggleCaptionLayout={toggleCaptionLayout}
                                                                                    toggleCaption={expanded ? language.getString("nav_tool_theme") : null}/>)}
                </div>
            ))}
        </div>
    )
}

export default NavToolList
