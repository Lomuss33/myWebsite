/**
 * @author Lovro Music
 * @date 2025-05-10
 * @description This provider is responsible for loading and providing the data for the application.
 */

import React, {createContext, useContext, useEffect, useState} from 'react'
import {useUtils} from "../hooks/utils.js"

function DataProvider({ children, settings }) {
    const utils = useUtils()

    const defaultJsonData = {
        strings: { locales: {} },
        profile: {},
        settings: settings || {
            developerSettings: {},
            preloaderSettings: {
                enabled: true,
                title: "",
                subtitle: "",
                logoOffset: {
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            templateSettings: {
                animatedCursorEnabled: true,
                backgroundStyle: "plain",
                defaultLanguageId: "en",
                defaultThemeId: "dark",
                fullscreenEnabled: true,
                showSpinnerOnThemeChange: false
            },
            supportedLanguages: [],
            supportedThemes: [],
            imagesToCache: []
        },
        sections: [],
        categories: []
    }

    const [jsonData, setJsonData] = useState(defaultJsonData)

    useEffect(() => {
        setJsonData(prev => ({
            ...prev,
            settings: settings || prev.settings || defaultJsonData.settings
        }))
    }, [settings])

    /** @constructs **/
    useEffect(() => {
        let didCancel = false

        const loadData = async () => {
            const [jStrings, jProfile, jCategories, jSections] = await Promise.all([
                utils.file.loadJSON("/data/strings.json"),
                utils.file.loadJSON("/data/profile.json"),
                utils.file.loadJSON("/data/categories.json"),
                utils.file.loadJSON("/data/sections.json")
            ])

            if(didCancel)
                return

            const categories = jCategories?.categories || []
            const sections = jSections?.sections || []

            _bindCategoriesAndSections(categories, sections)
            await _loadSectionsData(sections)

            if(didCancel)
                return

            setJsonData(prev => ({
                ...prev,
                strings: jStrings || { locales: {} },
                profile: jProfile || {},
                sections,
                categories
            }))

            const validation = _validateData(categories)
            if(!validation.success) {
                utils.log.throwError("DataProvider", validation.message)
            }
        }

        loadData().catch(error => {
            utils.log.throwError("DataProvider", `Failed to load application data: ${error?.message || error}`)
        })

        return () => {
            didCancel = true
        }
    }, [])

    const _bindCategoriesAndSections = (categories, sections) => {
        for(const category of categories) {
            category.sections = []
        }

        for(const section of sections) {
            const sectionCategoryId = section["categoryId"]
            const sectionCategory = categories.find(category => category.id === sectionCategoryId)
            if(!sectionCategory) {
                utils.log.throwError("DataProvider", `Section with id "${section.id}" has invalid category id "${sectionCategoryId}". Make sure the category exists within categories.json`)
                return
            }

            sectionCategory.sections.push(section)
            section.category = sectionCategory
        }
    }

    const _loadSectionsData = async (sections) => {
        await Promise.all(sections.map(async section => {
            const sectionJsonPath = section.jsonPath
            if(!sectionJsonPath)
                return

            let jSectionData = {}

            try {
                jSectionData = await utils.file.loadJSON(sectionJsonPath)
            }
            catch (e) {
                jSectionData = {}
            }

            section.data = jSectionData || {}
        }))
    }

    const _validateData = (categories) => {
        const emptyCategories = (categories || []).filter(category => category.sections.length === 0)
        const emptyCategoriesIds = emptyCategories.map(category => category.id)
        if(emptyCategories.length > 0) {
            return {
                success: false,
                message: `The following ${emptyCategories.length} categories are empty: "${emptyCategoriesIds}". Make sure all categories have at least one section.`
            }
        }

        return {success: true}
    }

    const getProfile = () => {
        return jsonData?.profile || {}
    }

    const getSettings = () => {
        return jsonData?.settings || {}
    }

    const getStrings = () => {
        return jsonData?.strings || {}
    }

    const getSections = () => {
        return jsonData?.sections || []
    }

    const getCategories = () => {
        return jsonData?.categories || []
    }

    const getResumeEmailConfig = () => {
        const sections = jsonData?.sections || []
        const contactSection = sections.find(section => section?.id === "contact")
        const articles = contactSection?.data?.articles
        const contactFormArticle = Array.isArray(articles) ?
            articles.find(article => article?.component === "ArticleContactForm") :
            null

        const settings = contactFormArticle?.settings || {}
        const publicKey = settings?.email_js_public_key
        const serviceId = settings?.email_js_service_id
        const templateId = settings?.email_js_resume_template_id

        if(!publicKey || !serviceId || !templateId)
            return null

        return {
            publicKey,
            serviceId,
            templateId
        }
    }

    return (
        <DataContext.Provider value={{
            getProfile,
            getSettings,
            getStrings,
            getSections,
            getCategories,
            getResumeEmailConfig
        }}>
            {children}
        </DataContext.Provider>
    )
}

const DataContext = createContext(null)
/**
 * @return {{
 *    getProfile: Function,
 *    getSettings: Function,
 *    getStrings: Function,
 *    getSections: Function,
 *    getCategories: Function,
 *    getResumeEmailConfig: Function
 * }}
 */
export const useData = () => useContext(DataContext)

export default DataProvider
