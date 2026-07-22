import "./SectionBody.scss"
import React, {Suspense, lazy, useEffect, useMemo} from 'react'
import {useParser} from "../../hooks/parser.js"
import ArticleNotFound from "../articles/ArticleNotFound.jsx"
import SectionDecorationBand from "./SectionDecorationBand.jsx"

function _loadArticleCards() { return import("../articles/ArticleCards.jsx") }
function _loadArticleComplaintForm() { return import("../articles/ArticleComplaintForm.jsx") }
function _loadArticleContactForm() { return import("../articles/ArticleContactForm.jsx") }
function _loadArticleDataProbe() { return import("../articles/ArticleDataProbe.jsx") }
function _loadArticleFeature() { return import("../articles/ArticleFeature.jsx") }
function _loadArticleFacts() { return import("../articles/ArticleFacts.jsx") }
function _loadArticleFallingWords() { return import("../articles/ArticleFallingWords.jsx") }
function _loadArticleInfoList() { return import("../articles/ArticleInfoList.jsx") }
function _loadArticleInlineList() { return import("../articles/ArticleInlineList.jsx") }
function _loadArticleManuscript() { return import("../articles/ArticleManuscript.jsx") }
function _loadArticlePortfolio() { return import("../articles/ArticlePortfolio.jsx") }
function _loadArticleSkills() { return import("../articles/ArticleSkills.jsx") }
function _loadArticleStack() { return import("../articles/ArticleStack.jsx") }
function _loadArticleTestimonials() { return import("../articles/ArticleTestimonials.jsx") }
function _loadArticleText() { return import("../articles/ArticleText.jsx") }
function _loadArticleThread() { return import("../articles/ArticleThread.jsx") }
function _loadArticleTimeline() { return import("../articles/ArticleTimeline.jsx") }
function _loadArticleSecretPearls() { return import("../articles/ArticleSecretPearls.jsx") }
function _loadArticleWebArt() { return import("../articles/ArticleWebArt.jsx") }

const ARTICLE_LOADERS = {
    ArticleCards: _loadArticleCards,
    ArticleComplaintForm: _loadArticleComplaintForm,
    ArticleContactForm: _loadArticleContactForm,
    ArticleDataProbe: _loadArticleDataProbe,
    ArticleFeature: _loadArticleFeature,
    ArticleFacts: _loadArticleFacts,
    ArticleFallingWords: _loadArticleFallingWords,
    ArticleInfoList: _loadArticleInfoList,
    ArticleInlineList: _loadArticleInlineList,
    ArticleManuscript: _loadArticleManuscript,
    ArticlePortfolio: _loadArticlePortfolio,
    ArticleSkills: _loadArticleSkills,
    ArticleStack: _loadArticleStack,
    ArticleTestimonials: _loadArticleTestimonials,
    ArticleText: _loadArticleText,
    ArticleThread: _loadArticleThread,
    ArticleTimeline: _loadArticleTimeline,
    ArticleSecretPearls: _loadArticleSecretPearls,
    ArticleWebArt: _loadArticleWebArt
}

const ARTICLE_COMPONENTS = {
    ArticleCards: lazy(_loadArticleCards),
    ArticleComplaintForm: lazy(_loadArticleComplaintForm),
    ArticleContactForm: lazy(_loadArticleContactForm),
    ArticleDataProbe: lazy(_loadArticleDataProbe),
    ArticleFeature: lazy(_loadArticleFeature),
    ArticleFacts: lazy(_loadArticleFacts),
    ArticleFallingWords: lazy(_loadArticleFallingWords),
    ArticleInfoList: lazy(_loadArticleInfoList),
    ArticleInlineList: lazy(_loadArticleInlineList),
    ArticleManuscript: lazy(_loadArticleManuscript),
    ArticlePortfolio: lazy(_loadArticlePortfolio),
    ArticleSkills: lazy(_loadArticleSkills),
    ArticleStack: lazy(_loadArticleStack),
    ArticleTestimonials: lazy(_loadArticleTestimonials),
    ArticleText: lazy(_loadArticleText),
    ArticleThread: lazy(_loadArticleThread),
    ArticleTimeline: lazy(_loadArticleTimeline),
    ArticleSecretPearls: lazy(_loadArticleSecretPearls),
    ArticleWebArt: lazy(_loadArticleWebArt)
}

const preloadedArticleComponents = new Set()

function preloadArticleComponent(componentName) {
    const loader = ARTICLE_LOADERS[componentName]
    if(!loader || preloadedArticleComponents.has(componentName))
        return

    preloadedArticleComponents.add(componentName)
    loader().catch(() => {
        preloadedArticleComponents.delete(componentName)
    })
}

export function preloadSectionArticles(section) {
    const articles = Array.isArray(section?.data?.articles) ? section.data.articles : []
    for(const article of articles) {
        preloadArticleComponent(article?.component)
    }
}

function _scheduleIdleWork(work, timeoutMs = 900) {
    if(typeof window === "undefined") {
        work()
        return () => {}
    }

    if("requestIdleCallback" in window) {
        const idleId = window.requestIdleCallback(() => work(), { timeout: timeoutMs })
        return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = window.setTimeout(work, 120)
    return () => window.clearTimeout(timeoutId)
}

function SectionBodyFallbackArticle() {
    return (
        <article className={`article article-spacing-default article-section-body-fallback`}
                 aria-hidden={true}>
            <div className={`article-content article-section-body-fallback-content`}/>
        </article>
    )
}

function SectionBody({ section, showDecorationBands = true }) {
    const parser = useParser()
    const articleDataWrappers = useMemo(() => {
        return parser.parseSectionArticles(section)
    }, [parser.parseSectionArticles, section])
    const visibleArticleWrappers = articleDataWrappers

    useEffect(() => {
        if(visibleArticleWrappers.length <= 0) return

        const preloadVisibleArticleTypes = () => {
            for(const dataWrapper of visibleArticleWrappers) {
                preloadArticleComponent(dataWrapper?.component)
            }
        }

        const cancelIdlePreload = _scheduleIdleWork(preloadVisibleArticleTypes, 500)
        return () => {
            cancelIdlePreload?.()
        }
    }, [visibleArticleWrappers])

    return (
        <div className={`section-body`}>
            {visibleArticleWrappers && visibleArticleWrappers.map((dataWrapper, key) => {
                const Component = ARTICLE_COMPONENTS[dataWrapper.component] || ArticleNotFound
                return (
                    <React.Fragment key={dataWrapper.uniqueId}>
                        {showDecorationBands && key > 0 && (
                            <SectionDecorationBand type="between-articles"
                                                   sectionId={section?.id}
                                                   index={key}/>
                        )}

                        <Suspense fallback={<SectionBodyFallbackArticle />}>
                            <Component dataWrapper={dataWrapper}
                                       id={key}/>
                        </Suspense>
                    </React.Fragment>
                )
            })}
        </div>
    )
}

export default SectionBody
