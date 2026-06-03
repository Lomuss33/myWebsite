/**
 * @author Lovro Music
 * @date 2025-05-10
 * @description This hook provides methods to parse and validate data loaded from JSON files.
 */

import {useCallback} from "react"
import {useViewport} from "../providers/ViewportProvider.jsx"
import {useLanguage} from "../providers/LanguageProvider.jsx"
import {useTheme} from "../providers/ThemeProvider.jsx"
import ArticleDataWrapper from "./models/ArticleDataWrapper.js"

export const useParser = () => {
    const viewport = useViewport()
    const language = useLanguage()
    const theme = useTheme()

    const getThemedTitleTranslation = useCallback((locales, key) => {
        const selectedThemeId = theme.getSelectedTheme()?.id
        if(selectedThemeId) {
            const themedTranslation = language.getTranslation(locales, `${key}_${selectedThemeId}`, null)
            if(themedTranslation !== null)
                return themedTranslation
        }

        return language.getTranslation(locales, key)
    }, [language, theme])

    /**
     * @param {Object} section
     * @return {{prefix: String|null, title: String, navTitle: String}}
     */
    const parseSectionTitle = useCallback((section) => {
        const isLgOrHigher = viewport.isBreakpoint("lg")
        const titleLocales = section.data?.title?.locales || {}
        const isHomeSection = section?.id === "about"

        return {
            title:
                isHomeSection || isLgOrHigher ?
                getThemedTitleTranslation(titleLocales, "title_long") :
                getThemedTitleTranslation(titleLocales, "title_short"),

            prefix:
                (isHomeSection || isLgOrHigher) ?
                getThemedTitleTranslation(titleLocales, "title_long_prefix") :
                null,

            navTitle:
                getThemedTitleTranslation(titleLocales, "title_short_nav")
        }
    }, [viewport, getThemedTitleTranslation])

    /**
     * @param {Object} section
     * @return {ArticleDataWrapper[]}
     */
    const parseSectionArticles = useCallback((section) => {
        const articles = section.data?.articles || []
        return articles.map((article, key) => {
            return new ArticleDataWrapper(section, article, language, theme, key + 1)
        })
    }, [language, theme])

    return {
        parseSectionTitle,
        parseSectionArticles
    }
}
