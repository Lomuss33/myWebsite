import "./AvatarView.scss"
import React from 'react'
import ImageView from "/src/components/generic/ImageView.jsx"

function AvatarView({ src = "", alt = "", faIcon = "", iconText = "", className = "",  id = null, style = null }) {
    return (
        <div className={`avatar-view ${className}`}
             id={id}
             style={style}>
            {src && (
                <ImageView src={src}
                           alt={alt}
                           className={`avatar-view-image-view`}/>
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
