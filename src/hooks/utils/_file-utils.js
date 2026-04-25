/**
 * @author Lovro Music
 * @date 2025-05-10
 */

export const _fileUtils = {
    _jsonRequestCache: new Map(),

    /**
     * @string
     */
    BASE_URL: import.meta.env.BASE_URL,

    /**
     * @param {String} url
     */
    download: (url) => {
        window.open(_fileUtils.resolvePath(url), "_blank")
    },

    /**
     * @param {String} path
     * @param {RequestCache} cacheMode
     * @return {Promise<any>}
     */
    loadJSON: async (path, cacheMode = "default") => {
        const resolvedPath = _fileUtils.resolvePath(path)
        const cacheKey = `${cacheMode}:${resolvedPath}`

        if(_fileUtils._jsonRequestCache.has(cacheKey))
            return _fileUtils._jsonRequestCache.get(cacheKey)

        const request = (async () => {
            const response = await fetch(resolvedPath, {
                cache: cacheMode
            })
            const contentType = response.headers.get("content-type") || ""

            if (!response.ok || !contentType.includes("application/json")) {
                return null
            }

            return await response.json()
        })().catch(error => {
            _fileUtils._jsonRequestCache.delete(cacheKey)
            console.error(`Failed to load JSON from ${resolvedPath}:`, error)
            return null
        })

        _fileUtils._jsonRequestCache.set(cacheKey, request)
        return request
    },

    /**
     * @param {String} path
     * @return {String}
     */
    resolvePath: (path) => {
        if(!path) return path
        if(path.startsWith("http")) return path

        const baseUrl = _fileUtils.BASE_URL || ""
        const fullPath = baseUrl + path
        return fullPath.replace(/(^|[^:])\/\//g, "$1/")
    },
}
