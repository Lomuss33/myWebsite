import "./Article.scss"
import React, {useEffect, useState} from 'react'
import CategoryFilter from "../../generic/CategoryFilter.jsx"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"

/**
 * @param {*} children
 * @param {String} id
 * @param {Article.Types} type
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} className
 * @param {String} selectedItemCategoryId
 * @param {Function} setSelectedItemCategoryId
 * @param {Boolean} forceHideTitle
 * @param {String} categoryFilterTitleStringKey
 * @return {JSX.Element}
 * @constructor
 */
function Article({ children, id, type, dataWrapper, className = "", selectedItemCategoryId, setSelectedItemCategoryId, forceHideTitle = false, categoryFilterTitleStringKey = null }) {
    const language = useLanguage()
    useEffect(() => {
        const loadedState = _loadState()
        if (dataWrapper.categories.length > 0 && !selectedItemCategoryId) {
            setSelectedItemCategoryId(loadedState || dataWrapper.categories[0].id)
        }
    }, [null])

    useEffect(() => {
        if(!selectedItemCategoryId)
            return

        _saveState(selectedItemCategoryId)
    }, [selectedItemCategoryId])

    const _loadState = () => {
        window.articleStates = window.articleStates || {}
        return window.articleStates[id]
    }

    const _saveState = (categoryId) => {
        window.articleStates = window.articleStates || {}
        window.articleStates[id] = categoryId
    }

    return (
        <article id={id}
                 data-article-id={id}
                 className={`article ${type} ${className}`}>
            {(dataWrapper.locales.title && !forceHideTitle) && (
                <ArticleTitle title={dataWrapper.locales.title}/>
            )}

            <ArticleContent>
                {dataWrapper.categories.length > 0 && (
                    <>
                        {categoryFilterTitleStringKey && (
                            <h4 className={`article-title`}>
                                <span className={`article-title-prefix eq-h3 ms-1 me-2 pe-1`}>|</span>
                                <span className={`article-title-text mb-0`}
                                      dangerouslySetInnerHTML={{__html: language.getString(categoryFilterTitleStringKey)}}/>
                            </h4>
                        )}

                        <CategoryFilter categories={dataWrapper.categories}
                                        selectedCategoryId={selectedItemCategoryId}
                                        setSelectedCategoryId={setSelectedItemCategoryId}
                                        className={`article-category-filter`}/>
                    </>
                )}

                {children}
            </ArticleContent>
        </article>
    )
}

function ArticleTitle({ title }) {
    return (
        <h4 className={`article-title`}>
            <span className={`article-title-prefix eq-h3 ms-1 me-2 pe-1`}>|</span>
            <span className={`article-title-text mb-0`} dangerouslySetInnerHTML={{__html: title}}/>
        </h4>
    )
}

function ArticleContent({ children }) {
    return (
        <div className={`article-content text-4`}>
            {children}
        </div>
    )
}

/**
 * @enum
 */
Article.Types = {
    SPACING_DEFAULT: "article-spacing-default",
    SPACING_SMALL: "article-spacing-small"
}

export default Article
