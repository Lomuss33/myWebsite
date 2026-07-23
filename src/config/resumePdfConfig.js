export const RESUME_PDF_LANGUAGE_IDS = ["en", "de", "hr"]
export const DEFAULT_RESUME_PDF_LANGUAGE_ID = "en"
export const RESUME_PDF_SOURCE_FOLDER = "/resumes"
export const LEGACY_RESUME_PDF_PATH = "/resume.pdf"

const RESUME_PDF_LANGUAGE_ID_SET = new Set(RESUME_PDF_LANGUAGE_IDS)

export const resolveResumePdfLanguageId = (languageId) => {
    const normalized = String(languageId || "").trim().toLowerCase()
    return RESUME_PDF_LANGUAGE_ID_SET.has(normalized) ?
        normalized :
        DEFAULT_RESUME_PDF_LANGUAGE_ID
}

export const getResumePdfPath = (languageId) => {
    const resolvedLanguageId = resolveResumePdfLanguageId(languageId)
    return `${RESUME_PDF_SOURCE_FOLDER}/resume-${resolvedLanguageId}.pdf`
}

export const getResumePdfAbsoluteUrl = (languageId, baseUrl) => {
    const rootUrl = new URL(baseUrl)
    return new URL(`.${getResumePdfPath(languageId)}`, rootUrl).toString()
}

export const getResumePdfUrlMap = (baseUrl) => {
    return RESUME_PDF_LANGUAGE_IDS.reduce((urls, languageId) => {
        urls[languageId] = getResumePdfAbsoluteUrl(languageId, baseUrl)
        return urls
    }, {})
}
