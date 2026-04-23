import "./LayoutImageCache.scss"
import React, {useEffect, useRef} from 'react'
import {useUtils} from "../../hooks/utils.js"

function LayoutImageCache({ profile, settings, sections }) {
    const utils = useUtils()

    const imagesToCache = new Set([
        profile?.profilePictureUrl
    ])

    const settingsImagesToCache = settings?.imagesToCache || []
    for(const image of settingsImagesToCache) {
        imagesToCache.add(image)
    }

    for(const language of settings?.supportedLanguages || []) {
        if(language?.flagUrl) {
            imagesToCache.add(language.flagUrl)
        }
    }

    const heroSection = (sections || [])[0]
    let heroImageCount = 0
    for(const article of heroSection?.data?.articles || []) {
        for(const item of article.items || []) {
            if(item?.img) {
                imagesToCache.add(item.img)
                heroImageCount += 1
            }

            if(item?.imgAlt) {
                imagesToCache.add(item.imgAlt)
                heroImageCount += 1
            }

            if(heroImageCount >= 4)
                break
        }

        if(heroImageCount >= 4)
            break
    }

    const filtered = Array.from(imagesToCache)
        .filter(image => image && !image.includes('{theme}'))

    return (
        <div className={`layout-image-cache`}>
            {filtered.map((src, key) => (
                <LayoutImageCacheImage key={key}
                                       src={utils.file.resolvePath(src)}
                                       index={key}/>
            ))}
        </div>
    )
}

function LayoutImageCacheImage({ src, index }) {
    const imageRef = useRef(null)

    useEffect(() => {
        if(!imageRef.current)
            return

        imageRef.current.setAttribute("fetchpriority", "high")
    }, [])

    return (
        <img ref={imageRef}
             src={src}
             className={`cache-image`}
             alt={`Preloaded image ${index + 1}`}
             aria-hidden="true"
             loading="eager"
             decoding="async"/>
    )
}

export default LayoutImageCache
