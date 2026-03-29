import "./ArticleFeature.scss"
import React, {useState} from 'react'
import Article from "./base/Article.jsx"
import ImageView from "../generic/ImageView.jsx"
import PretextInteractiveText from "../generic/PretextInteractiveText.jsx"

function ArticleFeature({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-feature`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleFeatureItems dataWrapper={dataWrapper}
                                 selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

function ArticleFeatureItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const sectionClass = dataWrapper.sectionId ?
        `article-feature-items-section-${dataWrapper.sectionId}` :
        ``

    const imageStyle = {
        ...(dataWrapper.settings.featureImageAspectRatio ? {
            "--article-feature-image-aspect-ratio": dataWrapper.settings.featureImageAspectRatio
        } : {}),
        ...(dataWrapper.settings.featureImageMobileAspectRatio ? {
            "--article-feature-image-mobile-aspect-ratio": dataWrapper.settings.featureImageMobileAspectRatio
        } : {})
    }

    return (
        <div className={`article-feature-items ${sectionClass}`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleFeatureItem itemWrapper={itemWrapper}
                                    imageStyle={imageStyle}
                                    key={key}/>
            ))}
        </div>
    )
}

function ArticleFeatureItem({ itemWrapper, imageStyle }) {
    const isAboutIntro = itemWrapper.articleWrapper.sectionId === "about" && itemWrapper.id === 1
    const isWritingIntro =
        itemWrapper.articleWrapper.sectionId === "my-writings" &&
        itemWrapper.articleWrapper.id === 2 &&
        itemWrapper.id === 1
    const html = itemWrapper.locales.text || itemWrapper.placeholder

    return (
        <div className={`article-feature-item`}>
            <div className={`article-feature-item-media`}>
                {itemWrapper.img ? (
                    <ImageView src={itemWrapper.img}
                               alt={itemWrapper.imageAlt}
                               className={`article-feature-item-image`}
                               style={imageStyle}
                               hideSpinner={true}/>
                ) : (
                    <div className={`article-feature-item-image article-feature-item-image-fallback`}
                         style={imageStyle}/>
                )}
            </div>

            <div className={`article-feature-item-content`}>
                <div className={`article-feature-item-text last-p-no-margin text-3`}>
                    {isAboutIntro ? (
                        <PretextInteractiveText html={html}
                                                revealOnScroll={true}/>
                    ) : isWritingIntro ? (
                        <PretextInteractiveText html={html}
                                                revealOnScroll={true}
                                                terrainVariant={"detailed"}/>
                    ) : (
                        <div dangerouslySetInnerHTML={{__html: html}}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArticleFeature
