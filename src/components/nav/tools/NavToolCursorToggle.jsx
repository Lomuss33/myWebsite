import React from 'react'
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {useFeedbacks} from "../../../providers/FeedbacksProvider.jsx"
import OptionPickerButton from "../../buttons/OptionPickerButton.jsx"

function NavToolCursorToggle() {
    const language = useLanguage()
    const feedbacks = useFeedbacks()

    if (!feedbacks.animatedCursorEnabled) {
        return null
    }

    const isActive = Boolean(feedbacks.animatedCursorActive)
    const selectedOptionId = isActive ? "cursor_on" : "cursor_off"
    const tooltipLabel = language.getString(
        isActive ? "deactivate_magic_cursor" : "activate_magic_cursor"
    )

    const options = [
        {
            id: "cursor_on",
            faIcon: "fa-solid fa-wand-magic-sparkles",
            label: language.getString("magic_cursor_on")
        },
        {
            id: "cursor_off",
            faIcon: "fa-solid fa-wand-magic",
            label: language.getString("magic_cursor_off")
        }
    ]

    const handleOptionSelected = () => {
        feedbacks.toggleAnimatedCursorActive(true)
    }

    return (
        <OptionPickerButton mode={OptionPickerButton.Modes.MODE_BUTTON}
                            options={options}
                            selectedOptionId={selectedOptionId}
                            onOptionSelected={handleOptionSelected}
                            tooltipLabel={tooltipLabel}/>
    )
}

export default NavToolCursorToggle
