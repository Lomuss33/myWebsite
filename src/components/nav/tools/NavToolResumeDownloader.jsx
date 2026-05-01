import React from 'react'
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {useUtils} from "../../../hooks/utils.js"
import OptionPickerButton from "../../buttons/OptionPickerButton.jsx"
import {useData} from "../../../providers/DataProvider.jsx"
import {useFeedbacks} from "../../../providers/FeedbacksProvider.jsx"

function NavToolResumeDownloader() {
    const language = useLanguage()
    const utils = useUtils()
    const data = useData()
    const feedbacks = useFeedbacks()

    const profile = data.getProfile()
    const resumeUrl = profile.resumePdfUrl
    const resumeEmailConfig = data.getResumeEmailConfig()
    const resumePdfUrlAbsolute = utils.file.toAbsoluteUrl(resumeUrl)
    const resumeCvUrlAbsolute = utils.file.toAbsoluteUrl("/cv/")
    const selectedOptionId = "resume"
    const tooltip = language.getString("resume_options")

    const options = [
        {
            id: selectedOptionId,
            faIcon: "fa-solid fa-file-arrow-down",
            label: language.getString("nav_tool_resume")
        },

        {
            id: "resume_view",
            faIcon: "fa-solid fa-eye",
            label: language.getString("view_resume")
        },

        {
            id: "resume_download",
            faIcon: "fa-solid fa-file-arrow-down",
            label: language.getString("download_resume")
        },

        ...(resumeEmailConfig ? [{
            id: "resume_email",
            faIcon: "fa-solid fa-envelope",
            label: language.getString("email_resume")
        }] : [])
    ]

    const _onOptionSelected = (optionId) => {
        if(!resumeUrl) {
            feedbacks.displayNotification(
                language.getString("error"),
                language.getString("error_file_not_found"),
                "error"
            )
            return
        }

        switch (optionId) {
            case "resume_download":
                utils.file.download(resumeUrl)
                break

            case "resume_view":
                if(!resumePdfUrlAbsolute)
                    return

                utils.url.open(resumePdfUrlAbsolute)
                break

            case "resume_email":
                if(!resumeEmailConfig || !resumePdfUrlAbsolute || !resumeCvUrlAbsolute)
                    return

                window.requestAnimationFrame(() => {
                    feedbacks.displayResumeEmail({
                        publicKey: resumeEmailConfig.publicKey,
                        serviceId: resumeEmailConfig.serviceId,
                        templateId: resumeEmailConfig.templateId,
                        resumePdfUrlAbsolute,
                        resumeCvUrlAbsolute
                    })
                })
                break
        }
    }

    return (
        <OptionPickerButton mode={OptionPickerButton.Modes.MODE_DROPDOWN}
                            options={options}
                            selectedOptionId={selectedOptionId}
                            onOptionSelected={_onOptionSelected}
                            tooltipLabel={tooltip}
                            dropdownDrop={"up"}/>
    )
}

export default NavToolResumeDownloader
