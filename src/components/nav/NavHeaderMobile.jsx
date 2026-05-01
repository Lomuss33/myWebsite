import "./NavHeaderMobile.scss"
import React from 'react'
import NavProfileCard from "./partials/NavProfileCard.jsx"
import NavToolLanguagePicker from "./tools/NavToolLanguagePicker.jsx"
import NavToolThemePicker from "./tools/NavToolThemePicker.jsx"
import NavToolResumeDownloader from "./tools/NavToolResumeDownloader.jsx"
import NavLinkPills from "./partials/NavLinkPills.jsx"
import AudioButton from "../buttons/AudioButton.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useTheme} from "../../providers/ThemeProvider.jsx"

function NavHeaderMobile({ profile, links }) {
    const language = useLanguage()
    const theme = useTheme()
    const safeProfile = profile || {}

    const namePronunciationIpa = language.getTranslation(safeProfile.locales, "name_pronunciation_ipa", null)
    const namePronunciationAudioUrl = language.getTranslation(safeProfile.locales, "name_pronunciation_audio_url", null)
    const namePronunciationButtonVisible = Boolean(namePronunciationIpa || namePronunciationAudioUrl)
    const resumeButtonVisible = Boolean(safeProfile.resumePdfUrl)
    const themeButtonVisible = Boolean(theme.supportsMultipleThemes)
    const languageButtonVisible = Boolean(language.supportsMultipleLanguages)

    const mobileActionStackBeforeInfo = (namePronunciationButtonVisible || resumeButtonVisible) ? (
        <>
            {namePronunciationButtonVisible && (
                <div className={`nav-profile-card-mobile-action nav-profile-card-mobile-action-audio`}>
                    <AudioButton url={namePronunciationAudioUrl}
                                 tooltip={namePronunciationIpa}
                                 tooltipLabel={namePronunciationIpa}
                                 size={AudioButton.Sizes.DEFAULT}/>
                </div>
            )}

            {resumeButtonVisible && (
                <div className={`nav-profile-card-mobile-action nav-profile-card-mobile-action-resume`}>
                    <NavToolResumeDownloader dropdownClassName={`nav-profile-card-mobile-resume-dropdown`}
                                             menuClassName={`nav-profile-card-mobile-resume-menu`}
                                             mobileTubeMenu={true}/>
                </div>
            )}
        </>
    ) : null

    const mobileActionStackAfterInfo = (themeButtonVisible || languageButtonVisible) ? (
        <>
            {themeButtonVisible && (
                <div className={`nav-profile-card-mobile-action nav-profile-card-mobile-action-theme`}>
                    <NavToolThemePicker/>
                </div>
            )}

            {languageButtonVisible && (
                <div className={`nav-profile-card-mobile-action nav-profile-card-mobile-action-language`}>
                    <NavToolLanguagePicker mobileTubeMenu={true}
                                           dropdownClassName={`nav-profile-card-mobile-language-dropdown`}
                                           menuClassName={`nav-profile-card-mobile-language-menu`}/>
                </div>
            )}
        </>
    ) : null

    return (
        <nav className={`nav-header-mobile`}>
            <div className={`nav-header-mobile-card-wrapper`}>
                <NavProfileCard profile={profile}
                                expanded={true}
                                mobileActionStackBeforeInfo={mobileActionStackBeforeInfo}
                                mobileActionStackAfterInfo={mobileActionStackAfterInfo}
                                showNameAudioButton={false}/>

                <NavLinkPills id={`nav-link-pills-menu`}
                              links={links}/>
            </div>
        </nav>
    )
}

export default NavHeaderMobile
