import "./SectionBody.scss"
import React, {Suspense, lazy, useEffect, useMemo, useState} from 'react'
import {useParser} from "../../hooks/parser.js"
import ArticleNotFound from "../articles/ArticleNotFound.jsx"

function _loadArticleCards() { return import("../articles/ArticleCards.jsx") }
function _loadArticleContactForm() { return import("../articles/ArticleContactForm.jsx") }
function _loadArticleDataProbe() { return import("../articles/ArticleDataProbe.jsx") }
function _loadArticleFeature() { return import("../articles/ArticleFeature.jsx") }
function _loadArticleFacts() { return import("../articles/ArticleFacts.jsx") }
function _loadArticleFallingWords() { return import("../articles/ArticleFallingWords.jsx") }
function _loadArticleInfoList() { return import("../articles/ArticleInfoList.jsx") }
function _loadArticleInlineList() { return import("../articles/ArticleInlineList.jsx") }
function _loadArticlePortfolio() { return import("../articles/ArticlePortfolio.jsx") }
function _loadArticleSkills() { return import("../articles/ArticleSkills.jsx") }
function _loadArticleStack() { return import("../articles/ArticleStack.jsx") }
function _loadArticleTestimonials() { return import("../articles/ArticleTestimonials.jsx") }
function _loadArticleText() { return import("../articles/ArticleText.jsx") }
function _loadArticleThread() { return import("../articles/ArticleThread.jsx") }
function _loadArticleTimeline() { return import("../articles/ArticleTimeline.jsx") }
function _loadArticleWebArt() { return import("../articles/ArticleWebArt.jsx") }

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

function SectionBody({ section }) {
    const parser = useParser()
    const articleDataWrappers = useMemo(() => {
        return parser.parseSectionArticles(section)
    }, [parser.parseSectionArticles, section])
    const [visibleArticlesCount, setVisibleArticlesCount] = useState(articleDataWrappers.length)

    useEffect(() => {
        const shouldDeferSecondaryArticles = section?.id === "my-software" || section?.id === "my-hardware"
        if(!shouldDeferSecondaryArticles || articleDataWrappers.length <= 1) {
            setVisibleArticlesCount(articleDataWrappers.length)
            return
        }

        setVisibleArticlesCount(1)

        let timeoutId = null
        let idleId = null
        const revealAll = () => setVisibleArticlesCount(articleDataWrappers.length)

        if(typeof window !== "undefined" && "requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(revealAll, { timeout: 500 })
        }
        else {
            timeoutId = window.setTimeout(revealAll, 180)
        }

        return () => {
            if(timeoutId !== null) window.clearTimeout(timeoutId)
            if(idleId !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId)
            }
        }
    }, [section?.id, articleDataWrappers.length])

    const visibleArticleWrappers = articleDataWrappers.slice(0, visibleArticlesCount)

    useEffect(() => {
        if(visibleArticleWrappers.length <= 0) return

        const preloadVisibleArticleTypes = () => {
            for(const dataWrapper of visibleArticleWrappers) {
                const loader = SectionBody.ARTICLE_LOADERS[dataWrapper?.component]
                loader?.()
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
                const Component = SectionBody.ARTICLES[dataWrapper.component] || ArticleNotFound
                return (
                    <Suspense key={dataWrapper.uniqueId}
                              fallback={<SectionBodyFallbackArticle />}>
                        <Component dataWrapper={dataWrapper}
                                   id={key}/>
                    </Suspense>
                )
            })}
        </div>
    )
}

SectionBody.ARTICLE_LOADERS = {
    ArticleCards: _loadArticleCards,
    ArticleContactForm: _loadArticleContactForm,
    ArticleDataProbe: _loadArticleDataProbe,
    ArticleFeature: _loadArticleFeature,
    ArticleFacts: _loadArticleFacts,
    ArticleFallingWords: _loadArticleFallingWords,
    ArticleInfoList: _loadArticleInfoList,
    ArticleInlineList: _loadArticleInlineList,
    ArticlePortfolio: _loadArticlePortfolio,
    ArticleSkills: _loadArticleSkills,
    ArticleStack: _loadArticleStack,
    ArticleTestimonials: _loadArticleTestimonials,
    ArticleText: _loadArticleText,
    ArticleThread: _loadArticleThread,
    ArticleTimeline: _loadArticleTimeline,
    ArticleWebArt: _loadArticleWebArt
}

SectionBody.ARTICLES = {
    ArticleCards: lazy(_loadArticleCards),
    ArticleContactForm: lazy(_loadArticleContactForm),
    ArticleDataProbe: lazy(_loadArticleDataProbe),
    ArticleFeature: lazy(_loadArticleFeature),
    ArticleFacts: lazy(_loadArticleFacts),
    ArticleFallingWords: lazy(_loadArticleFallingWords),
    ArticleInfoList: lazy(_loadArticleInfoList),
    ArticleInlineList: lazy(_loadArticleInlineList),
    ArticlePortfolio: lazy(_loadArticlePortfolio),
    ArticleSkills: lazy(_loadArticleSkills),
    ArticleStack: lazy(_loadArticleStack),
    ArticleTestimonials: lazy(_loadArticleTestimonials),
    ArticleText: lazy(_loadArticleText),
    ArticleThread: lazy(_loadArticleThread),
    ArticleTimeline: lazy(_loadArticleTimeline),
    ArticleWebArt: lazy(_loadArticleWebArt)
}

export default SectionBody
