import "./ArticleFeature.scss"
import React, {useState} from 'react'
import Article from "./base/Article.jsx"
import ImageView from "../generic/ImageView.jsx"

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
                <div className={`article-feature-item-text last-p-no-margin text-3`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text || itemWrapper.placeholder}}/>
            </div>
        </div>
    )
}

export default ArticleFeature
