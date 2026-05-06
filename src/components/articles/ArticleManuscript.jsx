import "./ArticleManuscript.scss"
import React from "react"
import Article from "./base/Article.jsx"
import IllustratedManuscript from "../generic/IllustratedManuscript.jsx"

function ArticleManuscript({ dataWrapper }) {
    const manuscriptItem = dataWrapper?.orderedItems?.[0] || null

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-manuscript`}>
            <div className={`article-manuscript-stage`}>
                <IllustratedManuscript storyHtml={manuscriptItem?.locales?.text || ""}
                                       imageSrc={manuscriptItem?.img || null}
                                       imageAlt={manuscriptItem?.imageAlt || ""}/>
            </div>
        </Article>
    )
}

export default ArticleManuscript
