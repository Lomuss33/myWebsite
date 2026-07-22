import React from 'react'
import ArtDecorationBandCanvas from "./decorations/art/ArtDecorationBandCanvas.jsx"

function SectionDecorationBand({ index = null, sectionId = null, type }) {
    const dataAttributes = index === null ? {} : { "data-section-decoration-band-index": index }
    const shouldRenderArtCanvas = sectionId === "my-art"

    return (
        <div
            className={`section-decoration-band section-decoration-band-${type}`}
            aria-hidden={true}
            {...dataAttributes}
        >
            {shouldRenderArtCanvas && (
                <ArtDecorationBandCanvas index={index}
                                         type={type}/>
            )}
        </div>
    )
}

export default SectionDecorationBand
