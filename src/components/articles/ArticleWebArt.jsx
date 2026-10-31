import "./ArticleWebArt.scss"
import React, { useMemo, useState } from 'react'
import Article from "./base/Article.jsx"
import LayeredCardCarousel from "../generic/LayeredCardCarousel.jsx"
import { useLanguage } from "../../providers/LanguageProvider.jsx"
import { useNavigation } from "../../providers/NavigationProvider.jsx"
import WebArtIntroCover from "./webArt/components/WebArtIntroCover.jsx"
import GatedWebArtTile from "./webArt/components/GatedWebArtTile.jsx"
import SendYourFunAnimationTile from "./webArt/tiles/SendYoursTile.jsx"
import {
    getWebArtCarouselLabels,
    getWebArtIntroCopy,
    resolveWebArtActionLabels
} from "./webArt/i18n/webArtCopy.js"
import {
    AMBIENT_TILE_SPECS,
    applyCarouselSlideSwaps,
    buildAllWebArtTileIds,
    getItemTileLabel,
    orderWebArtItems,
    resolveAmbientTileId
} from "./webArt/registry/webArtRegistryData.js"
import {
    buildAmbientTileDefinitions,
    WebArtTile
} from "./webArt/registry/WebArtTileRegistry.jsx"
import { useWebArtStage } from "./webArt/hooks/useWebArtStage.js"

function ArticleWebArt({ dataWrapper }) {
    const language = useLanguage()
    const navigation = useNavigation()
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    const useCarousel = dataWrapper.settings.webArtPresentation !== "grid"
    const rawItems = useMemo(() => dataWrapper.orderedItems, [dataWrapper.orderedItems])
    const items = useMemo(() => orderWebArtItems(rawItems), [rawItems])
    const allTileIds = useMemo(
        () => buildAllWebArtTileIds(dataWrapper.uniqueId, items),
        [dataWrapper.uniqueId, items]
    )
    const ambientJuliaReadyId = useMemo(
        () => resolveAmbientTileId(dataWrapper.uniqueId, { suffix: "ambient-julia" }),
        [dataWrapper.uniqueId]
    )

    const selectedLanguageId = language.selectedLanguageId || "en"
    const introCopy = useMemo(() => getWebArtIntroCopy(selectedLanguageId), [selectedLanguageId])
    const carouselLabels = useMemo(() => getWebArtCarouselLabels(selectedLanguageId), [selectedLanguageId])
    const {
        submitTileLabel,
        clickTileLabel,
        introHideLabel
    } = useMemo(() => resolveWebArtActionLabels(language, selectedLanguageId), [language, selectedLanguageId])

    const {
        locked,
        showIntroCover,
        tilesWrapperRef,
        stageRef,
        stagePhase,
        stageHeight,
        shouldMountTiles,
        activationIndex,
        openTileIds,
        mountedTileIds,
        pinnedSlides,
        stagedPinnedSlideIds,
        sendYoursPreviewOpen,
        areAllArtTilesOpen,
        onTileReady,
        openTile,
        closeTile,
        toggleAllArtTiles,
        onIntroEnter,
        onIntroHide,
        onStageTransitionEnd,
        onCarouselChange,
        createCarouselPinHandler,
        onCarouselUnpin,
        onCarouselReplacePinned,
        onCarouselWindowsSettled
    } = useWebArtStage({
        dataWrapper,
        navigation,
        useCarousel,
        items,
        allTileIds,
        firstCarouselTileId: ambientJuliaReadyId
    })

    const itemTiles = items.map((itemWrapper, index) => {
        if(!shouldMountTiles) {
            return (
                <div key={itemWrapper.uniqueId}
                     className={`article-web-art-tile article-web-art-tile-placeholder`}
                     aria-label={`Web art tile ${index + 1} loading`}/>
            )
        }

        const tileId = itemWrapper.uniqueId
        const isOpen = openTileIds.has(tileId)
        const isStaging = stagedPinnedSlideIds.has(tileId)
        const shouldRenderTile = mountedTileIds.has(tileId) || (isOpen && !isStaging)
        return (
            <GatedWebArtTile key={tileId}
                             label={getItemTileLabel(itemWrapper, index)}
                             isOpen={isOpen}
                             isStaging={isStaging}
                             onToggle={() => {
                                 if(isStaging) return
                                 if(isOpen) closeTile(tileId)
                                 else openTile(tileId)
                             }}
                             shouldRender={shouldRenderTile}>
                {shouldRenderTile && (
                    <WebArtTile itemWrapper={itemWrapper}
                                index={index}
                                locked={locked || !isOpen}
                                activate={index <= activationIndex}
                                onReady={onTileReady}/>
                )}
            </GatedWebArtTile>
        )
    })

    const ambientTileDefinitions = buildAmbientTileDefinitions({
        articleUniqueId: dataWrapper.uniqueId,
        locked,
        onTileReady
    })

    const ambientTiles = shouldMountTiles ? ambientTileDefinitions.map(({ key, tileId, label, render }) => {
        const isOpen = openTileIds.has(tileId)
        const isStaging = stagedPinnedSlideIds.has(key)
        const shouldRenderTile = mountedTileIds.has(tileId) || (isOpen && !isStaging)
        return (
            <GatedWebArtTile key={key}
                             label={label}
                             isOpen={isOpen}
                             isStaging={isStaging}
                             onToggle={() => {
                                 if(isStaging) return
                                 if(isOpen) closeTile(tileId)
                                 else openTile(tileId)
                             }}
                             shouldRender={shouldRenderTile}>
                {shouldRenderTile && render(isOpen)}
            </GatedWebArtTile>
        )
    }) : AMBIENT_TILE_SPECS
        .filter((spec) => spec.placeholderKey != null)
        .map((spec) => (
            <div key={spec.key}
                 className={`article-web-art-tile article-web-art-tile-placeholder`}
                 aria-label={`Web art ${spec.placeholderKey} tile loading`}/>
        ))

    const carouselSlides = applyCarouselSlideSwaps([
        ...items.map((item, index) => ({
            id: item.uniqueId,
            tileId: item.uniqueId,
            label: getItemTileLabel(item, index),
            transition: getItemTileLabel(item, index) === "Wave" ? "fade" : undefined,
            content: itemTiles[index]
        })),
        ...ambientTileDefinitions.slice(0, ambientTiles.length).map(({ key, tileId, label }, index) => ({
            id: key,
            tileId,
            label,
            content: ambientTiles[index]
        })),
        ...(shouldMountTiles ? [{
            id: "send-yours",
            tileId: null,
            pinnable: false,
            label: submitTileLabel,
            content: (
                <SendYourFunAnimationTile label={submitTileLabel}
                                          clickLabel={clickTileLabel}
                                          previewRequested={sendYoursPreviewOpen}/>
            )
        }] : [])
    ])

    const onCarouselPin = createCarouselPinHandler(carouselSlides)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-web-art`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <div className={`article-web-art-shell`}>
                <WebArtIntroCover guide={introCopy.guide}
                                  buttonLabel={showIntroCover ? introCopy.button : introHideLabel}
                                  hidden={!showIntroCover}
                                  onEnter={showIntroCover ? onIntroEnter : onIntroHide}
                                  secondaryButtonLabel={!showIntroCover && !useCarousel ? "promaja" : null}
                                  onSecondaryAction={!showIntroCover && !useCarousel ? toggleAllArtTiles : null}
                                  secondaryPressed={areAllArtTilesOpen}/>

                <div ref={stageRef}
                     className={[
                         "article-web-art-stage",
                         useCarousel ? "article-web-art-stage-carousel" : "",
                         showIntroCover ? "article-web-art-stage-preview" : "",
                         stageHeight !== null ? "article-web-art-stage-measured" : "",
                         `article-web-art-stage-${stagePhase}`
                     ].filter(Boolean).join(" ")}
                     style={stageHeight !== null ? { "--article-web-art-stage-height": `${stageHeight}px` } : undefined}
                     onTransitionEnd={onStageTransitionEnd}
                     aria-hidden={showIntroCover}
                     inert={showIntroCover || undefined}>
                    {useCarousel ? (
                        <LayeredCardCarousel key={showIntroCover ? "preview" : "open"}
                                             slides={carouselSlides}
                                             labels={carouselLabels}
                                             enabled={!showIntroCover}
                                             pinnedIds={pinnedSlides.map(({ id: slideId }) => slideId)}
                                             onChange={onCarouselChange}
                                             onPin={onCarouselPin}
                                             onUnpin={onCarouselUnpin}
                                             onReplacePinned={onCarouselReplacePinned}
                                             onWindowsSettled={onCarouselWindowsSettled}/>
                    ) : (
                        <div className={`article-web-art-items ${locked ? "article-web-art-items-locked" : ""}`}
                             ref={tilesWrapperRef}
                             aria-busy={showIntroCover}>
                            {itemTiles}
                            {ambientTiles}
                            {shouldMountTiles && (
                                <SendYourFunAnimationTile label={submitTileLabel}
                                                          clickLabel={clickTileLabel}
                                                          previewRequested={sendYoursPreviewOpen}/>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Article>
    )
}

export default ArticleWebArt
