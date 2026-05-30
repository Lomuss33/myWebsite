import "./OptionPickerButton.scss"
import React, {useEffect, useState} from 'react'
import {Dropdown} from "react-bootstrap"

function OptionPickerButton({
    mode,
    options,
    selectedOptionId,
    onOptionSelected,
    tooltipLabel,
    hideTooltipWhenOpen = false,
    showSelectedOptionOnDropdown = false,
    toggleCaption = null,
    toggleCaptionLayout = "stack",
    toggleClassName = "",
    dropdownDrop = "down",
    hideCaret = false,
    dropdownClassName = "",
    menuClassName = "",
    compactMenu = false,
    menuHeader = null
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
                                          activeTooltipHidden={false}
                                          toggleCaption={toggleCaption}
                                          toggleCaptionLayout={toggleCaptionLayout}
                                          toggleClassName={toggleClassName}
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
                                          activeTooltipHidden={hideTooltipWhenOpen && dropdownVisible}
                                          toggleCaption={toggleCaption}
                                          toggleCaptionLayout={toggleCaptionLayout}
                                          toggleClassName={toggleClassName}
                                          dropdownToggle={true}/>

                <OptionPickerButtonMenu availableOptions={availableOptions}
                                        selectedOptionId={selectedOptionId}
                                        onClick={_onDropdownOptionClicked}
                                        menuClassName={menuClassName}
                                        compactMenu={compactMenu}
                                        menuHeader={menuHeader}/>
            </Dropdown>
        </div>
    )
}

function OptionPickerButtonToggle({
    option,
    caretIcon,
    onClick,
    tooltipLabel,
    activeTooltipHidden = false,
    toggleCaption,
    toggleCaptionLayout,
    toggleClassName,
    dropdownToggle
}) {
    const captionClass = toggleCaption ? "btn-option-picker-toggle-with-caption" : ""
    const captionLayoutClass = toggleCaption && toggleCaptionLayout === "inline" ?
        "btn-option-picker-toggle-caption-inline" :
        ""
    const toggleClasses = `btn-option-picker-toggle ${captionClass} ${captionLayoutClass} ${toggleClassName}`.trim()
    const resolvedTooltipLabel = activeTooltipHidden ? "hidden" : tooltipLabel
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
                    className={`${toggleClasses} btn btn-transparent`}
                    onClick={onClick}
                    data-tooltip={resolvedTooltipLabel}>
                {toggleContent}
            </button>
        )
    }

    return (
        <Dropdown.Toggle variant={`transparent`}
                         className={toggleClasses}
                         data-tooltip={resolvedTooltipLabel}>
            {toggleContent}
        </Dropdown.Toggle>
    )
}

function OptionPickerButtonMenu({ availableOptions, selectedOptionId, onClick, menuClassName, compactMenu, menuHeader }) {
    const hasSelectedOption = availableOptions.some(option => option.id === selectedOptionId)
    const borderClass = hasSelectedOption ? 'dropdown-item-no-border' : ''
    const compactClass = compactMenu ? 'btn-option-picker-menu-item-compact' : ''

    return (
        <Dropdown.Menu className={menuClassName}>
            {menuHeader && (
                <div className={`btn-option-picker-menu-header`}>
                    {menuHeader}
                </div>
            )}

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
