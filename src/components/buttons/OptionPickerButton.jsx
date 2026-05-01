import "./OptionPickerButton.scss"
import React, {useEffect, useState} from 'react'
import {Dropdown} from "react-bootstrap"

function OptionPickerButton({
    mode,
    options,
    selectedOptionId,
    onOptionSelected,
    tooltipLabel,
    showSelectedOptionOnDropdown = false,
    toggleCaption = null,
    dropdownDrop = "down",
    hideCaret = false,
    dropdownClassName = "",
    menuClassName = "",
    compactMenu = false
}) {
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const defaultOption = {
        id: "default",
        faIcon: "fa-solid fa-circle"
    }

    const selectedOption = options.find(option => option.id === selectedOptionId)
        || defaultOption

    const availableOptions = options.filter(option =>
        showSelectedOptionOnDropdown ||
        option.id !== selectedOption.id
    )

    const buttonBehaviorEnabled = mode === OptionPickerButton.Modes.MODE_BUTTON ||
        (mode === OptionPickerButton.Modes.MODE_AUTO && options.length <= 2)

    const caretIcon = !buttonBehaviorEnabled && selectedOption.img && !hideCaret ?
        `fa-solid fa-caret-down` :
        null

    useEffect(() => {
        setDropdownVisible(false)
    }, [buttonBehaviorEnabled, selectedOptionId, availableOptions.length])

    const _onToggleClicked = () => {
        if(!buttonBehaviorEnabled)
            return

        const optionIndex = options.indexOf(selectedOption)
        const targetIndex = optionIndex < options.length - 1 ?
            optionIndex + 1 :
            0

        onOptionSelected(options[targetIndex]?.id)
    }

    const _onDropdownOptionClicked = (option) => {
        if(!option || !option.id)
            return

        setDropdownVisible(false)

        if(document.activeElement instanceof HTMLElement)
            document.activeElement.blur()

        onOptionSelected(option.id)
    }

    if(buttonBehaviorEnabled) {
        return (
            <div className={`btn-option-picker`}>
                <OptionPickerButtonToggle option={selectedOption}
                                          caretIcon={caretIcon}
                                          onClick={_onToggleClicked}
                                          tooltipLabel={tooltipLabel}
                                          toggleCaption={toggleCaption}
                                          dropdownToggle={false}/>
            </div>
        )
    }

    return (
        <div className={`btn-option-picker`}>
            <Dropdown drop={dropdownDrop}
                      className={dropdownClassName}
                      show={dropdownVisible}
                      onToggle={(nextShow) => {
                          setDropdownVisible(nextShow)
                      }}>
                <OptionPickerButtonToggle option={selectedOption}
                                          caretIcon={caretIcon}
                                          tooltipLabel={tooltipLabel}
                                          toggleCaption={toggleCaption}
                                          dropdownToggle={true}/>

                <OptionPickerButtonMenu availableOptions={availableOptions}
                                        selectedOptionId={selectedOptionId}
                                        onClick={_onDropdownOptionClicked}
                                        menuClassName={menuClassName}
                                        compactMenu={compactMenu}/>
            </Dropdown>
        </div>
    )
}

function OptionPickerButtonToggle({ option, caretIcon, onClick, tooltipLabel, toggleCaption, dropdownToggle }) {
    const captionClass = toggleCaption ? "btn-option-picker-toggle-with-caption" : ""
    const toggleContent = (
        <>
            <span className={`btn-option-picker-toggle-row`}>
                <OptionPickerButtonPickerIcon option={option}
                                              size={2}/>

                {caretIcon && (
                    <i className={`fa-caret-icon ${caretIcon}`}/>
                )}
            </span>

            {toggleCaption && (
                <span className={`btn-option-picker-toggle-caption`}>
                    {toggleCaption}
                </span>
            )}
        </>
    )

    if(!dropdownToggle) {
        return (
            <button type={`button`}
                    className={`btn-option-picker-toggle btn btn-transparent ${captionClass}`}
                    onClick={onClick}
                    data-tooltip={tooltipLabel}>
                {toggleContent}
            </button>
        )
    }

    return (
        <Dropdown.Toggle variant={`transparent`}
                         className={`btn-option-picker-toggle ${captionClass}`}
                         data-tooltip={tooltipLabel}>
            {toggleContent}
        </Dropdown.Toggle>
    )
}

function OptionPickerButtonMenu({ availableOptions, selectedOptionId, onClick, menuClassName, compactMenu }) {
    const hasSelectedOption = availableOptions.some(option => option.id === selectedOptionId)
    const borderClass = hasSelectedOption ? 'dropdown-item-no-border' : ''
    const compactClass = compactMenu ? 'btn-option-picker-menu-item-compact' : ''

    return (
        <Dropdown.Menu className={menuClassName}>
            {availableOptions.map((option, key) => (
                <Dropdown.Item key={key}
                               as={`button`}
                               type={`button`}
                               className={`btn-option-picker-menu-item ${borderClass} ${compactClass} ${option.id === selectedOptionId ? 'btn-option-picker-menu-item-selected' : ''}`}
                               onClick={(e) => {
                                   e.preventDefault && e.preventDefault()
                                   e.stopPropagation && e.stopPropagation()
                                   onClick(option)
                               }}>
                    <OptionPickerButtonPickerIcon   option={option}
                                                    size={1}/>

                    {!compactMenu && (
                        <span className={`btn-option-picker-menu-item-label`}>
                            {option.label}
                        </span>
                    )}
                </Dropdown.Item>
            ))}
        </Dropdown.Menu>
    )
}

function OptionPickerButtonPickerIcon({ option, size }) {
    const sizeClass = `btn-option-picker-icon-size-${size}`
    const willRenderImage = option.img
    const willRenderFaIcon = !willRenderImage

    return (
        <div className={`btn-option-picker-icon ${sizeClass}`}>
            {willRenderImage && (
                <img src={option.img}
                     alt={option.label}
                     className={`img`}/>
            )}

            {willRenderFaIcon && (
                <i className={`fa-icon ${option.faIcon}`}/>
            )}
        </div>
    )
}

OptionPickerButton.Modes = {
    MODE_AUTO: "mode_auto",
    MODE_BUTTON: "mode_button",
    MODE_DROPDOWN: "mode_dropdown"
}

export default OptionPickerButton
