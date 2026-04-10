import "./Textarea.scss"
import React, {useEffect, useState} from 'react'
import InputFieldWrapper from "../base/InputFieldWrapper.jsx"
import {useUtils} from "../../../hooks/utils.js"
import TextareaTunnelBackground from "./TextareaTunnelBackground.jsx"

function TextArea({
   id,
   name = "",
   model = "",
   setModel = null,
   required = false,
   className = "",
   placeholder = "",
   maxLength = 2048
}) {
    const utils = useUtils()

    const [isFocused, setIsFocused] = useState(false)
    const placeholderFull = `${placeholder}${utils.string.if(required, " *")}`
    const focusClass = utils.string.if(isFocused, "form-textarea-focused")
    const tunnelClass = "form-textarea-has-tunnel"

    // Prevent shrinking the resizable wrapper below its initial layout height
    // (keeps the border and inner field in sync, and avoids overlap with the left column).
    useEffect(() => {
        let attempts = 0
        let rafId = 0

        const apply = () => {
            const textareaEl = document.getElementById(id)
            const wrapperEl = textareaEl?.closest?.(".input-field-wrapper")
            if(!wrapperEl)
                return

            const rect = wrapperEl.getBoundingClientRect()
            if(rect.height > 0) {
                const px = Math.max(200, Math.round(rect.height))
                wrapperEl.style.minHeight = `${px}px`
                return
            }

            attempts += 1
            if(attempts < 20) {
                rafId = window.requestAnimationFrame(apply)
            }
        }

        rafId = window.requestAnimationFrame(apply)
        return () => {
            if(rafId) window.cancelAnimationFrame(rafId)
        }
    }, [id])

    return (
        <InputFieldWrapper isFocused={isFocused}
                          wrapperClassName={`input-field-wrapper-resizable`}>
            <TextareaTunnelBackground enabled={true}/>

            <textarea className={`form-control form-textarea ${tunnelClass} ${focusClass} ${className}`}
                      id={id}
                      name={name}
                      value={model}
                      placeholder={placeholderFull}
                      required={required}
                      maxLength={maxLength}
                      onChange={(e) => { setModel && setModel(e.target.value) }}
                      onFocus={(e) => { setIsFocused(true) }}
                      onBlur={(e) => { setIsFocused(false) }}/>
        </InputFieldWrapper>
    )
}

export default TextArea
