import "./Tags.scss"
import React, {useEffect, useRef, useState} from 'react'
import {useTheme} from "../../providers/ThemeProvider.jsx"

function Tags({ children, className = "" }) {
    return (
        <ul className={`tags ${className}`}>
            {children}
        </ul>
    )
}

function Tag({ text, variant = "tag-default", className = "" }) {
    const theme = useTheme()
    const [transitionClass, setTransitionClass] = useState(``)
    const transitionTimeoutRef = useRef(null)

    useEffect(() => {
        setTransitionClass(`tag-no-transition`)
        if(transitionTimeoutRef.current !== null) {
            clearTimeout(transitionTimeoutRef.current)
        }

        transitionTimeoutRef.current = setTimeout(() => {
            setTransitionClass(``)
        }, 1000/30)

        return () => {
            if(transitionTimeoutRef.current !== null) {
                clearTimeout(transitionTimeoutRef.current)
                transitionTimeoutRef.current = null
            }
        }
    }, [theme.getSelectedTheme()?.id])

    return (
        <li className={`tag ${className} ${variant} ${transitionClass}`}
            dangerouslySetInnerHTML={{__html: text}}/>
    )
}

Tag.Variants = {
    DEFAULT: "tag-default",
    DARK: "tag-dark"
}

export {Tags, Tag}
