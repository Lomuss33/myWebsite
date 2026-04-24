import "./NavHeaderMobile.scss"
import React from 'react'
import NavProfileCard from "./partials/NavProfileCard.jsx"
import NavToolLanguagePicker from "./tools/NavToolLanguagePicker.jsx"
import NavToolThemePicker from "./tools/NavToolThemePicker.jsx"
import NavLinkPills from "./partials/NavLinkPills.jsx"
import AudioButton from "../buttons/AudioButton.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

function NavHeaderMobile({ profile, links }) {
    const language = useLanguage()
    const safeProfile = profile || {}

    const namePronunciationIpa = language.getTranslation(safeProfile.locales, "name_pronunciation_ipa", null)
    const namePronunciationAudioUrl = language.getTranslation(safeProfile.locales, "name_pronunciation_audio_url", null)
    const namePronunciationButtonVisible = Boolean(namePronunciationIpa || namePronunciationAudioUrl)

    const mobileActionStack = (
        <>
            <div className={`nav-profile-card-mobile-action nav-profile-card-mobile-action-theme`}>
                <NavToolThemePicker/>
            </div>

            {namePronunciationButtonVisible && (
                <div className={`nav-profile-card-mobile-action nav-profile-card-mobile-action-audio`}>
                    <AudioButton url={namePronunciationAudioUrl}
                                 tooltip={namePronunciationIpa}
                                 tooltipLabel={namePronunciationIpa}
                                 size={AudioButton.Sizes.DEFAULT}/>
                </div>
            )}

            <div className={`nav-profile-card-mobile-action nav-profile-card-mobile-action-language`}>
                <NavToolLanguagePicker dropdownDrop={"start"}
                                       mobileTubeMenu={true}
                                       dropdownClassName={`nav-profile-card-mobile-language-dropdown`}
                                       menuClassName={`nav-profile-card-mobile-language-menu`}/>
            </div>
        </>
    )

    return (
        <nav className={`nav-header-mobile`}>
            <div className={`nav-header-mobile-card-wrapper`}>
                <NavProfileCard profile={profile}
                                expanded={true}
                                mobileActionStack={mobileActionStack}
                                showNameAudioButton={false}/>

                <NavLinkPills id={`nav-link-pills-menu`}
                              links={links}/>
            </div>
        </nav>
    )
}

export default NavHeaderMobile
