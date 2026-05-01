import "./NavToolList.scss"
import React from 'react'
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {useTheme} from "../../../providers/ThemeProvider.jsx"
import {useFeedbacks} from "../../../providers/FeedbacksProvider.jsx"
import {useData} from "../../../providers/DataProvider.jsx"
import NavToolLanguagePicker from "../tools/NavToolLanguagePicker.jsx"
import NavToolThemePicker from "../tools/NavToolThemePicker.jsx"
import NavToolCursorToggle from "../tools/NavToolCursorToggle.jsx"
import NavToolResumeDownloader from "../tools/NavToolResumeDownloader.jsx"
import NavToolSettings from "../tools/NavToolSettings.jsx"

function NavToolList({ expanded }) {
    const language = useLanguage()
    const theme = useTheme()
    const feedbacks = useFeedbacks()
    const data = useData()

    const profile = data.getProfile()

    const shrinkClass = expanded ?
        `` :
        `nav-tools-shrink`

    const widgets = [
        ...(language.supportsMultipleLanguages ? ["language"] : []),
        ...(theme.supportsMultipleThemes ? [NavToolSettings.Options.THEME] : []),
        ...(feedbacks.animatedCursorEnabled ? [NavToolSettings.Options.CURSOR] : []),
        ...(profile.resumePdfUrl ? [NavToolSettings.Options.DOWNLOAD_RESUME] : []),
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
                <div className={`nav-tools-item ${item === "language" ? "nav-tools-item-language" : ""} ${item === NavToolSettings.Options.DOWNLOAD_RESUME ? "nav-tools-item-resume" : ""}`}
                     key={key}>
                    {item === "language" && (<NavToolLanguagePicker dropdownDrop={"up"} hideCaret={true}/>)}
                    {item === NavToolSettings.Options.THEME && (<NavToolThemePicker/>)}
                    {item === NavToolSettings.Options.CURSOR && (<NavToolCursorToggle/>)}
                    {item === NavToolSettings.Options.DOWNLOAD_RESUME && (<NavToolResumeDownloader/>)}
                </div>
            ))}
        </div>
    )
}

export default NavToolList
