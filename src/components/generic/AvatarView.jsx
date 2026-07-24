import "./AvatarView.scss"
import React from 'react'
import ImageView from "./ImageView.jsx"
import {useFloatingFrame} from "../../hooks/floatingFrame.js"

const DEFAULT_AVATAR_SIZES = "(max-width: 575px) 64px, (max-width: 991px) 80px, 96px"

function AvatarView({ src = "", alt = "", faIcon = "", iconText = "", className = "",  id = null, style = null, sizes = null }) {
    const floatingFrame = useFloatingFrame()
    const imageSizes = sizes || DEFAULT_AVATAR_SIZES

    return (
        <div className={`avatar-view floating-frame ${className}`}
             id={id}
             style={style}
             onPointerEnter={floatingFrame.onPointerEnter}
             onPointerMove={floatingFrame.onPointerMove}
             onPointerLeave={floatingFrame.onPointerLeave}>
            {src && (
                <ImageView src={src}
                           alt={alt}
                           className={`avatar-view-image-view`}
                           sizes={imageSizes}/>
            )}

            {!src && (
                <div className={`avatar-icon-view`}>
                    {iconText ? (
                        <span className={`avatar-icon-text`}>{iconText}</span>
                    ) : (
                        <i className={`${faIcon}`}/>
                    )}
                </div>
            )}
        </div>
    )
}

export default AvatarView
