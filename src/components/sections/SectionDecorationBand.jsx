import React from 'react'

function SectionDecorationBand({ index = null, type }) {
    const dataAttributes = index === null ? {} : { "data-section-decoration-band-index": index }

    return (
        <div
            className={`section-decoration-band section-decoration-band-${type}`}
            aria-hidden={true}
            {...dataAttributes}
        />
    )
}

export default SectionDecorationBand
