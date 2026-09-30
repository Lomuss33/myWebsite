import React from 'react'
import Link from "./Link.jsx"

/** Opens the shared gallery modal with the images and presentation metadata supplied by a caller. */
export default function GalleryLink({metadata, ...linkProps}) {
    const images = Array.isArray(metadata?.images) ?
        metadata.images.filter(image => typeof image === "string" && image.trim().length > 0) :
        []

    if(!images.length)
        return null

    return <Link {...linkProps}
                 href="#gallery:open"
                 metadata={{...metadata, images}}/>
}
