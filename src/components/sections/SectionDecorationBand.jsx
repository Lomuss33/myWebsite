import React from 'react'
import ArtDecorationBandCanvas from "./decorations/art/ArtDecorationBandCanvas.jsx"

function SectionDecorationBand({ index = null, sectionId = null, type }) {
    const dataAttributes = index === null ? {} : { "data-section-decoration-band-index": index }
    const shouldRenderArtCanvas = sectionId === "my-art"
    const showLineBefore = type === "after-header" || type === "between-articles" || type === "page-bottom"
    const showLineAfter = type === "after-header" || type === "between-articles" || type === "page-top"

    return (
        <div className={`section-decoration-boundary section-decoration-boundary-${type}`}
             aria-hidden={true}
             {...dataAttributes}>
            {showLineBefore && (
                <div className="section-decoration-line section-decoration-line-before-band"/>
            )}

            <div
                className={`section-decoration-band section-decoration-band-${type}`}
                {...dataAttributes}
            >
                {shouldRenderArtCanvas && (
                    <ArtDecorationBandCanvas index={index}
                                             type={type}/>
                )}
            </div>

            {showLineAfter && (
                <div className="section-decoration-line section-decoration-line-after-band"/>
            )}
        </div>
    )
}

export default SectionDecorationBand
