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

    return (
        <InputFieldWrapper isFocused={isFocused}>
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
