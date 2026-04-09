/**
 * @author Lovro Music
 * @date 2025-05-10
 * @description This provider is responsible for managing the application's language settings and translations.
 */

import React, {createContext, useContext, useEffect, useState} from 'react'
import {useUtils} from "../hooks/utils.js"
import {useConstants} from "../hooks/constants.js"

function LanguageProvider({ children, supportedLanguages, defaultLanguageId, appStrings, selectedThemeId }) {
    const constants = useConstants()
    const utils = useUtils()

    const allLanguages = Array.isArray(supportedLanguages) && supportedLanguages.length > 0 ?
        supportedLanguages :
        []

    const defaultLanguage = allLanguages.find(lang => lang.id === defaultLanguageId)
        || allLanguages[0]

    const supportsMultipleLanguages = allLanguages.length >= 2

    const [selectedLanguageId, setSelectedLanguageId] = useState(null)

    const _normalizeLanguageTag = (tag) => {
        if(!tag) return null
        return String(tag).trim().toLowerCase().replaceAll('_', '-')
    }

    const _getNavigatorLanguageCandidates = () => {
        // Prefer the full list when available (Chrome/Firefox), fall back to a single tag (Safari).
        const rawTags = [
            ...(Array.isArray(navigator.languages) ? navigator.languages : []),
            navigator.language
        ]
            .map(_normalizeLanguageTag)
            .filter(Boolean)

        // Extract primary subtags: "de-DE" -> "de"
        const primary = rawTags
            .map(tag => tag.split('-')[0])
            .filter(Boolean)

        // Keep stable order, remove duplicates.
        const ordered = []
        for(const code of [...primary, ...rawTags]) {
            if(!code) continue
            if(!ordered.includes(code)) ordered.push(code)
        }
        return ordered
    }

    const _resolveAutoDetectedLanguageId = () => {
        const defaultId = defaultLanguage?.id || allLanguages[0]?.id
        if(!defaultId) return null

        const candidates = _getNavigatorLanguageCandidates()

        // 1) Direct match: if the browser language is explicitly supported, use it.
        const direct = allLanguages.find(language => candidates.includes(language.id))
        if(direct) return direct.id

        // 2) Alias pools: map "similar/understandable" languages to supported ones.
        // Note: these pools are intentionally opinionated per project requirement.
        const aliasPools = {
            // Ex-YU + nearby languages/regions that should default to Croatian.
            hr: ["hr", "bs", "sr", "sh", "me", "mk", "sq", "sl"],
            // German variants.
            de: ["de", "lb", "gsw"],
            // Turkish + closest common related locale.
            tr: ["tr", "az"],
            // English (kept mostly for completeness; direct match usually handles it).
            en: ["en"]
        }

        for(const supported of allLanguages) {
            const pool = aliasPools[supported.id]
            if(!pool) continue
            if(pool.some(code => candidates.includes(code)))
                return supported.id
        }

        return defaultId
    }

    /** @constructs **/
    useEffect(() => {
        if(allLanguages.length === 0) {
            utils.log.throwError("LanguageProvider", "The app must support at least one language. Make sure you filled the supportedLanguages property in the settings.json file.")
            return
        }

        // Load the preferred language from local storage.
        const savedLanguageId = utils.storage.getPreferredLanguage()
        const savedLanguage = allLanguages.find(lang => lang.id === savedLanguageId)
        if(savedLanguage) {
            setSelectedLanguageId(savedLanguageId)
            return
        }

        // If no preferred language is found, use the default language.
        const autoDetectedLanguageId = _resolveAutoDetectedLanguageId()
        setSelectedLanguageId(autoDetectedLanguageId || defaultLanguage?.id || allLanguages[0].id)
    }, [])

    /** @listens selectedLanguageId **/
    useEffect(() => {
        if(!selectedLanguageId)
            return
        utils.storage.setPreferredLanguage(selectedLanguageId)
    }, [selectedLanguageId])

    const getSelectedLanguage = () => {
        return allLanguages.find(language => language.id === selectedLanguageId)
    }

    const setSelectedLanguage = (language) => {
        setSelectedLanguageId(language.id)
    }

    const getAvailableLanguages = (excludeSelected) => {
        if(!allLanguages)
            return []

        if(!excludeSelected)
            return allLanguages
        return allLanguages.filter(language => language.id !== selectedLanguageId)
    }

    const getTranslation = (locales, key, customFallback) => {
        if(!selectedLanguageId || !locales)
            return "locale:" + key

        const selectedLanguageTranslation = _translate(locales[selectedLanguageId], key)
        if(selectedLanguageTranslation) return selectedLanguageTranslation

        const defaultLanguageTranslation = _translate(locales[defaultLanguageId], key)
        if(defaultLanguageTranslation) return defaultLanguageTranslation

        return customFallback !== undefined ?
            parseJsonText(customFallback) :
            "locale:" + key
    }

    const _translate = (locales, key) => {
        if(!locales) return null

        const field = locales[key]
        if(!field) return null

        if(Array.isArray(field)) {
            return field.length ? field : null
        }
        else {
            return parseJsonText(field)
        }
    }

    const parseJsonText = (text) => {
        if(typeof text !== 'string')
            return text

        return text.replace(/\{\{(.*?)\}\}/g, (match, value) => {
            const raw = String(value ?? "")
            const trimmed = raw.trim()
            const shouldLockForPretext = trimmed.endsWith(":")
            const extraClass = shouldLockForPretext ? " pretext-lock" : ""
            return `<span class="${constants.HTML_CLASSES.textHighlight}${extraClass}">${raw}</span>`
        })
            .replace(/\[\[(.*?)\]\]/g, '<strong>$1</strong>')
            .replace("{theme}", selectedThemeId || "default")
    }

    const getString = (key) => {
        const locales = appStrings && appStrings["locales"] ?
            appStrings["locales"] :
            {}

        return getTranslation(locales, key)
    }

    const getDateLocaleString = (date) => {
        if(!date) return `date.null`
        if(utils.date.isSameDay(date)) return `<strong>${getString("present")}</strong>`

        const localeString = date.toLocaleString(
            selectedLanguageId,
            {year: "numeric", month: "short"}
        )
        
        return localeString
            .replaceAll('.', '')
            .replace(/\d{4}/, (year) => `<strong>${year}</strong>`)
            .replace(/^./, (char) => char.toUpperCase())
    }

    const getExperienceTimeString = (date) => {
        if(!date) return null

        const yearsDiff = utils.date.getYearsPassedSince(date)
        const floorYearsDiff = Math.floor(yearsDiff)
        if(floorYearsDiff > 1)
            return getString("experience_year_count_plural").replace("{x}", floorYearsDiff + "+")
        else if(floorYearsDiff === 1)
            return getString("experience_year_count_singular").replace("{x}", floorYearsDiff.toString())
        else
            return getString("experience_year_count_less_than_one")
    }

    return (
        <LanguageContext.Provider value={{
            selectedLanguageId,
            supportsMultipleLanguages,
            setSelectedLanguage,
            getSelectedLanguage,
            getAvailableLanguages,
            getTranslation,
            getString,
            parseJsonText,
            getDateLocaleString,
            getExperienceTimeString
        }}>
            {selectedLanguageId && (
                <>{children}</>
            )}
        </LanguageContext.Provider>
    )
}

const LanguageContext = createContext(null)
/**
 * @return {{
 *    selectedLanguageId: string,
 *    supportsMultipleLanguages: boolean,
 *    setSelectedLanguage: Function,
 *    getSelectedLanguage: Function,
 *    getAvailableLanguages: Function,
 *    getTranslation: Function,
 *    getString: Function,
 *    parseJsonText: Function,
 *    getDateLocaleString: Function,
 *    getExperienceTimeString: Function,
 * }}
 */
export const useLanguage = () => useContext(LanguageContext)

export default LanguageProvider
