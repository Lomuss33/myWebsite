import React from 'react'
import Link from "./Link.jsx"

/** All albums open the same viewer; callers supply only images and a title. */
export default function GalleryLink({metadata, ...linkProps}) {
    const images = Array.isArray(metadata?.images) ?
        metadata.images.filter(image => typeof image === "string" && image.trim().length > 0) :
        []

    if(!images.length)
        return null

    return <Link {...linkProps}
                 href="#gallery:open"
                 metadata={{title: metadata?.title, images}}/>
}
