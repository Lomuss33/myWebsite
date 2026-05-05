import "./HoverStaticTooltip.scss"
import React, {useEffect, useState} from 'react'
import Tooltip from "../generic/Tooltip.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {useUtils} from "../../hooks/utils.js"
import {useInput} from "../../providers/InputProvider.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"

function HoverStaticTooltip({
    id = "",
    targetId = "",
    label = "",
    className = "",
    onDesktopClick = null,
    forceResetFlag = null,
    forceVisible = false,
    toggleBehaviorOnTouchScreens = false,
    desktopClickShowsTooltip = true,
    forceTouchBehavior = null,
}) {
    const viewport = useViewport()
    const input = useInput()
    const utils = useUtils()
    const navigation = useNavigation()
    const shouldUseTouchBehavior = typeof forceTouchBehavior === "boolean"
        ? forceTouchBehavior
        : !utils.device.canHoverWithFinePointer()

    const [visible, setVisible] = useState(false)

    /** @constructs **/
    useEffect(() => {
        if(!targetId)
            return

        const targetEl = document.getElementById(targetId)
        if(!targetEl)
            return

        targetEl.addEventListener("mouseenter", _onTargetMouseEnter)
        targetEl.addEventListener("mouseleave", _onTargetMouseLeave)
        targetEl.addEventListener("click", _onTargetClick)

        return () => {
            targetEl.removeEventListener("mouseenter", _onTargetMouseEnter)
            targetEl.removeEventListener("mouseleave", _onTargetMouseLeave)
            targetEl.removeEventListener("click", _onTargetClick)
        }
    }, [targetId, shouldUseTouchBehavior, onDesktopClick, toggleBehaviorOnTouchScreens, desktopClickShowsTooltip])

    /** @listens viewport.innerWidth **/
    useEffect(() => {
        setVisible(false)
    }, [viewport.innerWidth, forceResetFlag])

    /** @listens navigation.targetSection **/
    useEffect(() => {
        if(!shouldUseTouchBehavior || !toggleBehaviorOnTouchScreens)
            return
        setVisible(false)
    }, [navigation.targetSection])

    /** @listens input.mouseUpStatus **/
    useEffect(() => {
        const lastMouseTargetId = input.lastMouseTarget?.getAttribute("id")
        if(lastMouseTargetId === targetId)
            return
        setVisible(false)
    }, [input.mouseUpStatus])

    const _onTargetMouseEnter = () => {
        if(shouldUseTouchBehavior)
            return
        setVisible(true)
    }

    const _onTargetMouseLeave = () => {
        if(shouldUseTouchBehavior)
            return
        setVisible(false)
    }

    const _onTargetClick = () => {
        if(!shouldUseTouchBehavior && onDesktopClick)
            onDesktopClick()

        if(shouldUseTouchBehavior && toggleBehaviorOnTouchScreens) {
            setVisible(visible => !visible)
        }
        else if(shouldUseTouchBehavior || desktopClickShowsTooltip) {
            setVisible(true)
        }
    }

    return (
        <>
            {(visible || forceVisible) && (
                <Tooltip label={label}
                         id={id}
                         className={`hover-static-tooltip ${className}`}/>
            )}
        </>
    )
}

export default HoverStaticTooltip
