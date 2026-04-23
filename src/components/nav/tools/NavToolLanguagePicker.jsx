import React from 'react'
import {Dropdown} from "react-bootstrap"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import OptionPickerButton from "../../buttons/OptionPickerButton.jsx"
import {useUtils} from "../../../hooks/utils.js"

function NavToolLanguagePicker({
    dropdownDrop = "down",
    hideCaret = true,
    dropdownClassName = "",
    menuClassName = "",
    compactMenu = false,
    mobileTubeMenu = false
}) {
    const language = useLanguage()
    const utils = useUtils()

    const supportsMultipleLanguages = language.supportsMultipleLanguages
    const availableLanguages = language.getAvailableLanguages(false)
    const selectedLanguage = language.getSelectedLanguage()

    const options = availableLanguages.map(lang => {
        return {
            id: lang.id,
            label: lang.name,
            img: utils.file.resolvePath(lang.flagUrl)
        }
    })

    const _onOptionSelected = (optionId) => {
        const targetLanguage = availableLanguages.find(lang => lang.id === optionId)
        if(targetLanguage) {
            language.setSelectedLanguage(targetLanguage)
        }
    }

    if(supportsMultipleLanguages && mobileTubeMenu) {
        const mobileOptions = availableLanguages.filter(lang => lang.id !== selectedLanguage?.id)

        return (
            <Dropdown drop={dropdownDrop}
                      className={dropdownClassName}>
                <Dropdown.Toggle variant={`transparent`}
                                 className={`btn-option-picker-toggle`}
                                 data-tooltip={language.getString("select_language")}>
                    <span className={`btn-option-picker-toggle-row`}>
                        <div className={`btn-option-picker-icon btn-option-picker-icon-size-2`}>
                            <img src={utils.file.resolvePath(selectedLanguage?.flagUrl)}
                                 alt={selectedLanguage?.name}
                                 className={`img`}/>
                        </div>
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className={menuClassName}>
                    {mobileOptions.map((lang) => (
                        <button key={lang.id}
                                type={`button`}
                                className={`nav-profile-card-mobile-language-item`}
                                onClick={() => { _onOptionSelected(lang.id) }}>
                            <img src={utils.file.resolvePath(lang.flagUrl)}
                                 alt={lang.name}/>
                        </button>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    return (
        <>
            {supportsMultipleLanguages && (
                <OptionPickerButton mode={OptionPickerButton.Modes.MODE_DROPDOWN}
                                    options={options}
                                    selectedOptionId={selectedLanguage?.id}
                                    onOptionSelected={_onOptionSelected}
                                    dropdownDrop={dropdownDrop}
                                    hideCaret={hideCaret}
                                    dropdownClassName={dropdownClassName}
                                    menuClassName={menuClassName}
                                    compactMenu={compactMenu}
                                    tooltipLabel={language.getString("select_language")}/>
            )}
        </>
    )
}

export default NavToolLanguagePicker
