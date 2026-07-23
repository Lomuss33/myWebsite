import React from 'react'
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {useUtils} from "../../../hooks/utils.js"
import OptionPickerButton from "../../buttons/OptionPickerButton.jsx"
import {useData} from "../../../providers/DataProvider.jsx"
import {useFeedbacks} from "../../../providers/FeedbacksProvider.jsx"
import MobileTubeMenu from "./MobileTubeMenu.jsx"
import {getResumePdfPath} from "../../../config/resumePdfConfig.js"

function NavToolResumeDownloader({
    dropdownDrop = "up",
    dropdownClassName = "",
    menuClassName = "",
    menuPopperConfig = undefined,
    compactMenu = false,
    mobileTubeMenu = false,
    showTooltip = true,
    toggleCaption = null,
    toggleCaptionLayout = "stack",
    toggleClassName = "",
    hideCaret = false
}) {
    const language = useLanguage()
    const utils = useUtils()
    const data = useData()
    const feedbacks = useFeedbacks()

    const resumeUrl = getResumePdfPath(language.selectedLanguageId)
    const resumeEmailConfig = data.getResumeEmailConfig()
    const resumePdfUrlAbsolute = utils.file.toAbsoluteUrl(resumeUrl)
    const resumeCvUrlAbsolute = utils.file.toAbsoluteUrl("/cv/")
    const selectedOptionId = "resume"
    const tooltip = language.getString("resume_options")
    const menuHeader = language.getString("resume_options")
    const resolvedMenuClassName = `${menuClassName} nav-resume-menu`.trim()

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
    const selectedOption = options.find(option => option.id === selectedOptionId) || options[0]
    const availableOptions = options.filter(option => option.id !== selectedOptionId)

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

                utils.file.open(resumePdfUrlAbsolute)
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

    if(mobileTubeMenu) {
        return (
            <MobileTubeMenu className={dropdownClassName}
                            menuClassName={resolvedMenuClassName}
                            tooltipLabel={tooltip}
                            ariaLabel={tooltip}
                            toggleContent={(
                                <div className={`btn-option-picker-icon btn-option-picker-icon-size-2`}>
                                    <i className={`fa-icon ${selectedOption?.faIcon}`}/>
                                </div>
                            )}>
                {({ closeMenu }) => (
                    <>
                        <div className={`nav-profile-card-mobile-resume-menu-header btn-option-picker-menu-header`}>
                            {menuHeader}
                        </div>

                        {availableOptions.map((option) => (
                            <button key={option.id}
                                    type={`button`}
                                    role={`menuitem`}
                                    className={`nav-profile-card-mobile-resume-item btn-option-picker-menu-item dropdown-item`}
                                    aria-label={option.label}
                                    onClick={() => {
                                        closeMenu()
                                        window.requestAnimationFrame(() => {
                                            _onOptionSelected(option.id)
                                        })
                                    }}>
                                <div className={`btn-option-picker-icon btn-option-picker-icon-size-1`}>
                                    <i className={`fa-icon ${option.faIcon}`}/>
                                </div>

                                <span className={`nav-profile-card-mobile-resume-item-label btn-option-picker-menu-item-label`}>
                                    {option.label}
                                </span>
                            </button>
                        ))}
                    </>
                )}
            </MobileTubeMenu>
        )
    }

    return (
        <OptionPickerButton mode={OptionPickerButton.Modes.MODE_DROPDOWN}
                            options={options}
                            selectedOptionId={selectedOptionId}
                            onOptionSelected={_onOptionSelected}
                            tooltipLabel={showTooltip ? tooltip : null}
                            hideTooltipWhenOpen={true}
                            dropdownDrop={dropdownDrop}
                            dropdownClassName={dropdownClassName}
                            menuClassName={resolvedMenuClassName}
                            menuPopperConfig={menuPopperConfig}
                            compactMenu={compactMenu}
                            toggleCaption={toggleCaption}
                            toggleCaptionLayout={toggleCaptionLayout}
                            toggleClassName={toggleClassName}
                            hideCaret={hideCaret}
                            menuHeader={menuHeader}/>
    )
}

export default NavToolResumeDownloader
