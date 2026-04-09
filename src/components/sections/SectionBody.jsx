import "./SectionBody.scss"
import React, {useEffect, useState} from 'react'
import {useParser} from "../../hooks/parser.js"
import ArticleCards from "../articles/ArticleCards.jsx"
import ArticleContactForm from "../articles/ArticleContactForm.jsx"
import ArticleFeature from "../articles/ArticleFeature.jsx"
import ArticleFacts from "../articles/ArticleFacts.jsx"
import ArticleInfoList from "../articles/ArticleInfoList.jsx"
import ArticleInlineList from "../articles/ArticleInlineList.jsx"
import ArticleNotFound from "../articles/ArticleNotFound.jsx"
import ArticlePortfolio from "../articles/ArticlePortfolio.jsx"
import ArticleStack from "../articles/ArticleStack.jsx"
import ArticleSkills from "../articles/ArticleSkills.jsx"
import ArticleTestimonials from "../articles/ArticleTestimonials.jsx"
import ArticleText from "../articles/ArticleText.jsx"
import ArticleThread from "../articles/ArticleThread.jsx"
import ArticleTimeline from "../articles/ArticleTimeline.jsx"
import ArticleWebArt from "../articles/ArticleWebArt.jsx"

function SectionBody({ section }) {
    const parser = useParser()
    const articleDataWrappers = parser.parseSectionArticles(section)

    return (
        <div className={`section-body`}>
            {articleDataWrappers && articleDataWrappers.map((dataWrapper, key) => {
                const Component = SectionBody.ARTICLES[dataWrapper.component] || ArticleNotFound
                return <Component dataWrapper={dataWrapper}
                                  id={key}
                                  key={key}/>
            })}
        </div>
    )
}

SectionBody.ARTICLES = {
    ArticleCards,
    ArticleContactForm,
    ArticleFeature,
    ArticleFacts,
    ArticleInfoList,
    ArticleInlineList,
    ArticleNotFound,
    ArticlePortfolio,
    ArticleSkills,
    ArticleStack,
    ArticleTestimonials,
    ArticleText,
    ArticleThread,
    ArticleTimeline,
    ArticleWebArt
}

export default SectionBody
