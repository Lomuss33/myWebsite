import "./ArticleFeature.scss"
import React, {useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import ImageView from "/src/components/generic/ImageView.jsx"

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

    return (
        <div className={`article-feature-items`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleFeatureItem itemWrapper={itemWrapper}
                                    key={key}/>
            ))}
        </div>
    )
}

function ArticleFeatureItem({ itemWrapper }) {
    return (
        <div className={`article-feature-item`}>
            <div className={`article-feature-item-media`}>
                {itemWrapper.img ? (
                    <ImageView src={itemWrapper.img}
                               alt={itemWrapper.imageAlt}
                               className={`article-feature-item-image`}
                               hideSpinner={true}/>
                ) : (
                    <div className={`article-feature-item-image article-feature-item-image-fallback`}/>
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
