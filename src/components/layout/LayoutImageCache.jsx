import "./LayoutImageCache.scss"
import React, {useEffect, useMemo, useRef} from 'react'
import {useUtils} from "../../hooks/utils.js"

function LayoutImageCache({ profile, settings, sections }) {
    const utils = useUtils()

    const filtered = useMemo(() => {
        const imagesToCache = new Map()

        const addImage = (image, priority = "normal") => {
            const normalized = utils.image.normalizeSource(image)
            if(!normalized.isValid || !normalized.resolvedSrc || normalized.resolvedSrc.includes("{theme}"))
                return

            const existingPriority = imagesToCache.get(normalized.resolvedSrc)
            if(existingPriority === "high")
                return

            imagesToCache.set(normalized.resolvedSrc, priority)
        }

        addImage(profile?.profilePictureUrl, "high")

        const settingsImagesToCache = settings?.imagesToCache || []
        for(const image of settingsImagesToCache) {
            addImage(image)
        }

        for(const language of settings?.supportedLanguages || []) {
            if(language?.flagUrl) {
                addImage(language.flagUrl)
            }
        }

        const heroSection = (sections || [])[0]
        let heroImageCount = 0

        for(const article of heroSection?.data?.articles || []) {
            for(const item of article.items || []) {
                const primaryImage = item?.img
                const alternateImage = item?.imgAlt || item?.img_alt
                const alternateChance = Number(item?.imgAltDefaultChance ?? item?.img_alt_default_chance ?? 0)

                if(primaryImage) {
                    addImage(primaryImage, heroImageCount === 0 ? "high" : "normal")
                    heroImageCount += 1
                }

                if(alternateImage && alternateChance >= 0.5 && heroImageCount < 4) {
                    addImage(alternateImage)
                    heroImageCount += 1
                }

                if(heroImageCount >= 4)
                    break
            }

            if(heroImageCount >= 4)
                break
        }

        return Array.from(imagesToCache.entries()).map(([src, priority]) => ({
            src,
            priority
        }))
    }, [profile?.profilePictureUrl, settings, sections, utils.image])

    return (
        <div className={`layout-image-cache`}>
            {filtered.map(({src, priority}, key) => (
                <LayoutImageCacheImage key={key}
                                       src={src}
                                       index={key}
                                       priority={priority}/>
            ))}
        </div>
    )
}

function LayoutImageCacheImage({ src, index, priority = "normal" }) {
    const imageRef = useRef(null)
    const fetchPriority = priority === "high" ? "high" : "auto"
    const loading = "eager"

    useEffect(() => {
        if(!imageRef.current)
            return

        if(fetchPriority !== "auto") {
            imageRef.current.setAttribute("fetchpriority", fetchPriority)
        }
        else {
            imageRef.current.removeAttribute("fetchpriority")
        }
    }, [fetchPriority, src])

    return (
        <img ref={imageRef}
             src={src}
             className={`cache-image`}
             alt={`Preloaded image ${index + 1}`}
             aria-hidden="true"
             loading={loading}
             decoding="async"/>
    )
}

export default LayoutImageCache
