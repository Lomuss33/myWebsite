import "./InputFieldWrapper.scss"
import React, {useEffect, useState} from 'react'
import {InputGroup} from "react-bootstrap"
import InputGroupText from "react-bootstrap/InputGroupText"

function InputFieldWrapper({
    children,
    isFocused = false,
    faIconPrefix = "",
    wrapperClassName = "",
    wrapperStyle = null,
}) {
    const focusClass = isFocused ?
        "input-field-wrapper-focused" :
        ""

    const _getInnerField = (el) => {
        const wrapperEl = el?.closest?.(".input-field-wrapper") || el
        return wrapperEl?.querySelector?.("input, textarea, select") || null
    }

    const _focusInnerField = (e, { preventDefault = false } = {}) => {
        if(preventDefault) {
            e.preventDefault && e.preventDefault()
        }

        const fieldEl = _getInnerField(e.target)
        if(!fieldEl)
            return

        // If the user actually clicked the input itself, let the browser place the caret naturally.
        if(e.target === fieldEl)
            return

        try {
            fieldEl.focus({preventScroll: true})
        } catch {
            fieldEl.focus()
        }
    }

    return (
        <InputGroup className={`input-field-wrapper ${focusClass} ${wrapperClassName}`}
                    style={wrapperStyle || undefined}
                    onPointerDown={_focusInnerField}
                    onMouseDown={_focusInnerField}
                    onTouchStart={_focusInnerField}
                    onClick={_focusInnerField}>
            {faIconPrefix && (
                <InputFieldWrapperPrefixIcon isFocused={isFocused}
                                             onInteract={_focusInnerField}
                                             faIcon={faIconPrefix}/>
            )}

            {children}
        </InputGroup>
    )
}

function InputFieldWrapperPrefixIcon({ isFocused, faIcon, onInteract = null }) {
    const focusClass = isFocused ?
        "input-field-wrapper-attach-focused" :
        ""

    return (
        <InputGroupText className={`input-field-wrapper-attach ${focusClass}`}
                        onPointerDown={(e) => { onInteract && onInteract(e, {preventDefault: true}) }}
                        onMouseDown={(e) => { onInteract && onInteract(e, {preventDefault: true}) }}
                        onTouchStart={(e) => { onInteract && onInteract(e, {preventDefault: true}) }}
                        onClick={(e) => { onInteract && onInteract(e, {preventDefault: true}) }}>
            <i className={faIcon}/>
        </InputGroupText>
    )
}

export default InputFieldWrapper
