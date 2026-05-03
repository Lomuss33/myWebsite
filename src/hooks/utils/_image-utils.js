/**
 * @author Lovro Music
 * @date 2026-05-03
 */

import {_fileUtils} from "./_file-utils.js"
import imageManifest from "../../data/generated/imageManifest.generated.js"

export const _imageUtils = {
    isRemoteSource: (src) => {
        if(typeof src !== "string")
            return false

        return /^https?:\/\//i.test(src.trim())
    },

    normalizeSource: (src) => {
        const descriptor = _imageUtils.resolveSourceDescriptor(src)
        if(!descriptor) {
            return {
                originalSrc: null,
                resolvedSrc: null,
                srcSet: null,
                sizes: null,
                width: null,
                height: null,
                isValid: false,
                isRemote: false
            }
        }

        const resolvedSrc = _fileUtils.resolvePath(descriptor.src)?.trim?.() || null
        if(!resolvedSrc) {
            return {
                originalSrc: descriptor.originalSrc,
                resolvedSrc: null,
                srcSet: null,
                sizes: descriptor.sizes || null,
                width: descriptor.width || null,
                height: descriptor.height || null,
                isValid: false,
                isRemote: false
            }
        }

        const srcSet = descriptor.srcSet ?
            descriptor.srcSet
                .split(",")
                .map(item => item.trim())
                .filter(Boolean)
                .map(item => {
                    const [candidateSrc, candidateSize] = item.split(/\s+/, 2)
                    const resolvedCandidateSrc = _fileUtils.resolvePath(candidateSrc)?.trim?.() || candidateSrc
                    return candidateSize ? `${resolvedCandidateSrc} ${candidateSize}` : resolvedCandidateSrc
                })
                .join(", ") :
            null

        return {
            originalSrc: descriptor.originalSrc,
            resolvedSrc,
            srcSet,
            sizes: descriptor.sizes || null,
            width: descriptor.width || null,
            height: descriptor.height || null,
            isValid: true,
            isRemote: _imageUtils.isRemoteSource(descriptor.originalSrc || descriptor.src)
        }
    },

    resolveSourceDescriptor: (src) => {
        if(typeof src === "string") {
            const trimmedSrc = src.trim()
            if(!trimmedSrc)
                return null

            const manifestEntry = _imageUtils.getManifestEntry(trimmedSrc)
            if(!manifestEntry) {
                return {
                    originalSrc: trimmedSrc,
                    src: trimmedSrc,
                    srcSet: null,
                    sizes: null,
                    width: null,
                    height: null
                }
            }

            return {
                originalSrc: trimmedSrc,
                src: manifestEntry.src || trimmedSrc,
                srcSet: manifestEntry.srcSet || null,
                sizes: manifestEntry.sizes || null,
                width: manifestEntry.width || null,
                height: manifestEntry.height || null
            }
        }

        if(src && typeof src === "object") {
            const baseSrc = typeof src.src === "string" ? src.src.trim() : ""
            if(!baseSrc)
                return null

            const manifestEntry = _imageUtils.getManifestEntry(baseSrc)
            return {
                originalSrc: baseSrc,
                src: src.src || manifestEntry?.src || baseSrc,
                srcSet: src.srcSet || manifestEntry?.srcSet || null,
                sizes: src.sizes || manifestEntry?.sizes || null,
                width: src.width || manifestEntry?.width || null,
                height: src.height || manifestEntry?.height || null
            }
        }

        return null
    },

    getManifestEntry: (src) => {
        if(typeof src !== "string")
            return null

        const trimmedSrc = src.trim()
        if(!trimmedSrc)
            return null

        const normalizedWithoutLeadingSlash = trimmedSrc.replace(/^\//, "")
        return (
            imageManifest[trimmedSrc] ||
            imageManifest[`/${normalizedWithoutLeadingSlash}`] ||
            imageManifest[normalizedWithoutLeadingSlash] ||
            null
        )
    }
}
