/**
 * @author Lovro Music
 * @date 2025-05-10
 */

export const _urlUtils = {
    /**
     * @return {string}
     */
    getAbsoluteLocation: () => {
        const { protocol, host, pathname, search, hash } = window.location
        return `${protocol}//${host}${pathname}${search}${hash}`
    },

    /**
     * @return {string}
     */
    getRootLocation: () => {
        const { protocol, host } = window.location
        const basePath = import.meta.env.BASE_URL
        const path = `${protocol}//${host}${basePath}`
        return path.endsWith('/') ? path : `${path}/`
    },

    /**
     * @param {String} url
     * @param {String} target
     */
    open: (url, target = "_blank") => {
        const features = target === "_blank" ? "noopener,noreferrer" : undefined
        const targetWindow = window.open(url, target, features)

        if(targetWindow && target === "_blank")
            targetWindow.opener = null

        return targetWindow
    },

    /**
     * @param {String} youtubeRawUrl
     * @return {String}
     */
    toYoutubeEmbed: (youtubeRawUrl) => {
        const urlObj = new URL(youtubeRawUrl)
        const videoId = urlObj.searchParams.get('v')
        return `https://www.youtube.com/embed/${videoId}`
    }
}
