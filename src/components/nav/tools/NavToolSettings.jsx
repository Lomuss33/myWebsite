import React, {useEffect, useState} from 'react'
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import OptionPickerButton from "../../buttons/OptionPickerButton.jsx"
import {useTheme} from "../../../providers/ThemeProvider.jsx"
import {useFeedbacks} from "../../../providers/FeedbacksProvider.jsx"
import {useData} from "../../../providers/DataProvider.jsx"
import {useUtils} from "../../../hooks/utils.js"

function NavToolSettings({ options }) {
    const theme = useTheme()
    const feedbacks = useFeedbacks()
    const language = useLanguage()
    const data = useData()
    const utils = useUtils()

    const displayOptions = [{
        id: "options",
        faIcon: "fa-solid fa-cog",
        label: language.getString("options")
    }]

    if(options.includes(NavToolSettings.Options.THEME)) {
        const selectedTheme = theme.getSelectedTheme()

        displayOptions.push({
            id: NavToolSettings.Options.THEME,
            faIcon: selectedTheme?.icon || "fa-solid fa-moon",
            label: language.getString("change_theme")
        })
    }

    if(options.includes(NavToolSettings.Options.CURSOR)) {
        const isMedievalMode = feedbacks.cursorMode === "medieval"

        displayOptions.push({
            id: NavToolSettings.Options.CURSOR,
            faIcon: isMedievalMode ? "fa-solid fa-wand-magic" : "fa-solid fa-wand-magic-sparkles",
            label: language.getString(isMedievalMode ? "switch_to_magic_cursor" : "switch_to_medieval_cursor")
        })
    }

    if(options.includes(NavToolSettings.Options.DOWNLOAD_RESUME)) {
        displayOptions.push({
            id: NavToolSettings.Options.DOWNLOAD_RESUME,
            faIcon: "fa-solid fa-file-arrow-down",
            label: language.getString("download_resume")
        })
    }

    const _onOptionClicked = (optionId) => {
        switch (optionId) {
            case NavToolSettings.Options.THEME:
                theme.toggle()
                break

            case NavToolSettings.Options.CURSOR:
                feedbacks.toggleCursorMode(true)
                break

            case NavToolSettings.Options.DOWNLOAD_RESUME: {
                const profile = data.getProfile()
                const resumeUrl = profile.resumePdfUrl
                utils.file.download(resumeUrl)
                break
            }
        }
    }

    return (
        <OptionPickerButton mode={OptionPickerButton.Modes.MODE_DROPDOWN}
                            options={displayOptions}
                            selectedOptionId={"options"}
                            onOptionSelected={_onOptionClicked}
                            tooltipLabel={displayOptions[0].label}/>
    )
}

NavToolSettings.Options = {
    CURSOR: "cursor",
    DOWNLOAD_RESUME: "download_resume",
    THEME: "theme"
}

export default NavToolSettings
