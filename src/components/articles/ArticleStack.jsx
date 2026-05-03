import "./ArticleStack.scss"
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import Article from "./base/Article.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import Transitionable from "../capabilities/Transitionable.jsx"
import Collapsable from "../capabilities/Collapsable.jsx"
import Link from "../generic/Link.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useTheme} from "../../providers/ThemeProvider.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"

const HOME_STACK_BREAKPOINTS = {
    0: { id: "home-stack-bp-0", columns: 1 },
    560: { id: "home-stack-bp-560", columns: 2 },
    980: { id: "home-stack-bp-980", columns: 3 }
}

const HOME_STACK_BUBBLE_DEFAULTS = {
    desktop: {
        fontSize: 1.02,
        paddingX: 16,
        paddingY: 14,
        lineHeight: 1.45
    },
    tablet: {
        fontSize: 0.96,
        paddingX: 14,
        paddingY: 12,
        lineHeight: 1.4
    },
    mobile: {
        fontSize: 0.9,
        paddingX: 13,
        paddingY: 12,
        lineHeight: 1.36
    }
}

const HOME_STACK_BUBBLE_FLOORS = {
    desktop: {
        fontSize: 0.86,
        paddingX: 10,
        paddingY: 8,
        lineHeight: 1.26
    },
    tablet: {
        fontSize: 0.78,
        paddingX: 8,
        paddingY: 7,
        lineHeight: 1.2
    },
    mobile: {
        fontSize: 0.72,
        paddingX: 7,
        paddingY: 6,
        lineHeight: 1.16
    }
}

const HOME_STACK_BUBBLE_FIT_VARIABLES = [
    "--home-stack-bubble-font-size",
    "--home-stack-bubble-padding-x",
    "--home-stack-bubble-padding-y",
    "--home-stack-bubble-line-height"
]

const roundToStep = (value, precision = 2) => {
    const multiplier = 10 ** precision
    return Math.round(value * multiplier) / multiplier
}

const getHomeStackBubbleDefaults = (innerWidth) => {
    if(innerWidth < 576)
        return { ...HOME_STACK_BUBBLE_DEFAULTS.mobile }
    if(innerWidth < 992)
        return { ...HOME_STACK_BUBBLE_DEFAULTS.tablet }
    return { ...HOME_STACK_BUBBLE_DEFAULTS.desktop }
}

const getHomeStackBubbleFloors = (innerWidth) => {
    if(innerWidth < 576)
        return { ...HOME_STACK_BUBBLE_FLOORS.mobile }
    if(innerWidth < 992)
        return { ...HOME_STACK_BUBBLE_FLOORS.tablet }
    return { ...HOME_STACK_BUBBLE_FLOORS.desktop }
}

const clearHomeStackBubbleFitVariables = (element) => {
    if(!element)
        return

    HOME_STACK_BUBBLE_FIT_VARIABLES.forEach(variableName => {
        element.style.removeProperty(variableName)
    })
}

const applyHomeStackBubbleFitVariables = (element, fitValues) => {
    if(!element)
        return

    element.style.setProperty("--home-stack-bubble-font-size", `${roundToStep(fitValues.fontSize)}rem`)
    element.style.setProperty("--home-stack-bubble-padding-x", `${Math.round(fitValues.paddingX)}px`)
    element.style.setProperty("--home-stack-bubble-padding-y", `${Math.round(fitValues.paddingY)}px`)
    element.style.setProperty("--home-stack-bubble-line-height", `${roundToStep(fitValues.lineHeight)}`)
}

const getBubbleAvailableBox = (element) => {
    if(!element)
        return { width: 0, height: 0 }

    const computedStyles = window.getComputedStyle(element)
    const horizontalPadding = parseFloat(computedStyles.paddingLeft || 0) + parseFloat(computedStyles.paddingRight || 0)
    const verticalPadding = parseFloat(computedStyles.paddingTop || 0) + parseFloat(computedStyles.paddingBottom || 0)

    return {
        width: Math.max(0, element.clientWidth - horizontalPadding),
        height: Math.max(0, element.clientHeight - verticalPadding)
    }
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleStack({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const isHomeStack = dataWrapper.sectionId === "about"
    const isCompactStack = dataWrapper.sectionId === "my-art"
    const homeClass = isHomeStack ? `article-stack-home` : ``
    const compactClass = isCompactStack ? `article-stack-compact` : ``

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-stack ${homeClass} ${compactClass}`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleStackItems dataWrapper={dataWrapper}
                               isHomeStack={isHomeStack}
                               isCompactStack={isCompactStack}
                               selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleStackItems({ dataWrapper, selectedItemCategoryId, isHomeStack, isCompactStack }) {
    const language = useLanguage()
    const theme = useTheme()
    const viewport = useViewport()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const refreshFlag = selectedItemCategoryId + "::" + language.getSelectedLanguage()?.id + "-" + theme.getSelectedTheme()?.id
    const homeClass = isHomeStack ? `article-stack-items-home` : ``
    const compactClass = isCompactStack ? `article-stack-items-compact` : ``
    const stackClassName = `article-stack-items ${homeClass} ${compactClass}`.trim()
    const homeBreakpoint = isHomeStack ?
        viewport.getCustomBreakpoint(HOME_STACK_BREAKPOINTS) || HOME_STACK_BREAKPOINTS[0] :
        null
    const initialVisibleItems = isHomeStack ?
        Math.min(filteredItems.length, homeBreakpoint?.columns || filteredItems.length) :
        filteredItems.length
    const renderedItems = filteredItems.map((itemWrapper, key) => (
        <ArticleStackItem itemWrapper={itemWrapper}
                          isHomeStack={isHomeStack}
                          isCompactStack={isCompactStack}
                          key={key}/>
    ))

    if(isHomeStack) {
        return (
            <Collapsable className={stackClassName}
                         id={dataWrapper.uniqueId}
                         breakpointId={homeBreakpoint.id}
                         initialVisibleItems={initialVisibleItems}>
                {renderedItems}
            </Collapsable>
        )
    }

    if(dataWrapper.categories?.length) {
        return (
            <Transitionable id={dataWrapper.uniqueId}
                            refreshFlag={refreshFlag}
                            delayBetweenItems={30}
                            animation={Transitionable.Animations.POP}
                            className={stackClassName}>
                {renderedItems}
            </Transitionable>
        )
    }

    return (
        <div className={stackClassName}>
            {renderedItems}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleStackItem({ itemWrapper, isHomeStack, isCompactStack }) {
    const viewport = useViewport()
    const title = itemWrapper.locales.title || itemWrapper.placeholder
    const segmentedTitle = _splitTitle(title)
    const homeClass = isHomeStack ? `article-stack-item-home` : ``
    const compactClass = isCompactStack ? `article-stack-item-compact` : ``
    const linkHref = itemWrapper.link?.href
    const linkTooltip = itemWrapper.link?.tooltip
    const emojiIconText = itemWrapper.iconText
    const bubbleMarkup = itemWrapper.locales.proofBubble ||
        itemWrapper.locales.text ||
        "Placeholder text for this item."
    const isHomeBubbleEnabled = Boolean(isHomeStack && bubbleMarkup)
    const [isBubbleOpen, setIsBubbleOpen] = useState(false)
    const [isBubblePinned, setIsBubblePinned] = useState(false)
    const bubbleRef = useRef(null)
    const bubbleToggleRef = useRef(null)
    const bubbleInnerRef = useRef(null)
    const bubbleCopyRef = useRef(null)
    const bubbleClass = isBubbleOpen ? `article-stack-item-home-bubble-open` : ``

    useEffect(() => {
        if(isBubbleOpen)
            return

        clearHomeStackBubbleFitVariables(bubbleInnerRef.current)
    }, [isBubbleOpen, bubbleMarkup])

    useLayoutEffect(() => {
        if(!isHomeBubbleEnabled || !isBubbleOpen)
            return

        let frameId = 0

        const fitBubbleText = () => {
            const bubbleInnerEl = bubbleInnerRef.current
            const bubbleCopyEl = bubbleCopyRef.current

            if(!bubbleInnerEl || !bubbleCopyEl)
                return

            const innerWidth = viewport.innerWidth || window.innerWidth
            const defaultFitValues = getHomeStackBubbleDefaults(innerWidth)
            const floorFitValues = getHomeStackBubbleFloors(innerWidth)
            const fitValues = { ...defaultFitValues }

            const doesOverflow = () => {
                const availableBox = getBubbleAvailableBox(bubbleInnerEl)
                if(!availableBox.width || !availableBox.height)
                    return false

                return bubbleCopyEl.scrollHeight > availableBox.height + 0.5 ||
                    bubbleCopyEl.scrollWidth > availableBox.width + 0.5
            }

            const applyCurrentFitValues = () => {
                applyHomeStackBubbleFitVariables(bubbleInnerEl, fitValues)
            }

            applyCurrentFitValues()

            while(doesOverflow() && fitValues.fontSize > floorFitValues.fontSize + 0.001) {
                fitValues.fontSize = Math.max(
                    floorFitValues.fontSize,
                    roundToStep(fitValues.fontSize - 0.02)
                )
                applyCurrentFitValues()
            }

            while(
                doesOverflow() &&
                (
                    fitValues.paddingX > floorFitValues.paddingX ||
                    fitValues.paddingY > floorFitValues.paddingY
                )
            ) {
                if(fitValues.paddingX > floorFitValues.paddingX)
                    fitValues.paddingX = Math.max(floorFitValues.paddingX, fitValues.paddingX - 1)
                if(fitValues.paddingY > floorFitValues.paddingY)
                    fitValues.paddingY = Math.max(floorFitValues.paddingY, fitValues.paddingY - 1)

                applyCurrentFitValues()
            }

            while(doesOverflow() && fitValues.lineHeight > floorFitValues.lineHeight + 0.001) {
                fitValues.lineHeight = Math.max(
                    floorFitValues.lineHeight,
                    roundToStep(fitValues.lineHeight - 0.02)
                )
                applyCurrentFitValues()
            }
        }

        frameId = window.requestAnimationFrame(fitBubbleText)

        return () => {
            window.cancelAnimationFrame(frameId)
        }
    }, [bubbleMarkup, isBubbleOpen, isHomeBubbleEnabled, viewport.innerWidth])

    useEffect(() => {
        if(!isHomeBubbleEnabled || !isBubblePinned)
            return

        const handlePointerDown = (event) => {
            const target = event.target

            if(bubbleRef.current?.contains(target) || bubbleToggleRef.current?.contains(target))
                return

            setIsBubblePinned(false)
            setIsBubbleOpen(false)
        }

        const handleKeyDown = (event) => {
            if(event.key !== "Escape")
                return

            setIsBubblePinned(false)
            setIsBubbleOpen(false)
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isHomeBubbleEnabled, isBubblePinned])

    const handleBubbleMouseEnter = () => {
        if(!isHomeBubbleEnabled)
            return

        setIsBubbleOpen(true)
    }

    const handleBubbleMouseLeave = () => {
        if(!isHomeBubbleEnabled || isBubblePinned)
            return

        setIsBubbleOpen(false)
    }

    const handleBubbleToggle = (event) => {
        event.preventDefault()
        event.stopPropagation()

        setIsBubblePinned((currentState) => {
            const nextState = !currentState
            setIsBubbleOpen(nextState)
            return nextState
        })
    }

    const avatar = (
        <AvatarView src={itemWrapper.img}
                    faIcon={itemWrapper.faIconWithFallback}
                    iconText={emojiIconText}
                    style={itemWrapper.faIconStyle}
                    alt={itemWrapper.imageAlt}
                    className={`article-stack-item-avatar`}/>
    )

    const popupBody = isHomeBubbleEnabled ? (
        <div className={`article-stack-item-home-bubble ${bubbleClass}`}
             role="note"
             aria-hidden={!isBubbleOpen}
             ref={bubbleRef}>
            <div className={`article-stack-item-home-bubble-inner`}
                 ref={bubbleInnerRef}>
                <div className={`article-stack-item-home-bubble-copy`}
                     ref={bubbleCopyRef}
                     dangerouslySetInnerHTML={{__html: bubbleMarkup}}/>
            </div>
        </div>
    ) : null

    const defaultBodyContent = (
        <>
            {itemWrapper.dateStartDisplayAsExperienceTime && (
                <div className={`article-stack-item-experience`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.dateStartDisplayAsExperienceTime}}/>
            )}

            {itemWrapper.locales.text && (
                <div className={`article-stack-item-experience`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
            )}
        </>
    )

    const content = isHomeStack ? (
        <div className={`article-stack-item ${homeClass} ${compactClass} ${bubbleClass}`.trim()}
             onMouseLeave={handleBubbleMouseLeave}>
            <div className={`article-stack-item-home-trigger`}>
                <ArticleStackHomeBubble itemWrapper={itemWrapper}
                                        isBubbleOpen={isBubbleOpen}
                                        onMouseEnter={handleBubbleMouseEnter}
                                        onToggle={handleBubbleToggle}
                                        bubbleToggleRef={bubbleToggleRef}>
                    {avatar}
                </ArticleStackHomeBubble>
            </div>

            <div className={`article-stack-item-home-content`}>
                <div className={`article-stack-item-title`}>
                    {segmentedTitle.prefix && (
                        <div className={`article-stack-item-title-prefix`}
                             dangerouslySetInnerHTML={{__html: segmentedTitle.prefix}}/>
                    )}

                    <div className={`article-stack-item-title-main`}
                         dangerouslySetInnerHTML={{__html: segmentedTitle.value}}/>
                </div>

                <div className={`article-stack-item-home-content-body ${bubbleClass}`.trim()}>
                    {defaultBodyContent}
                    {popupBody}
                </div>
            </div>
        </div>
    ) : (
        <div className={`article-stack-item ${homeClass} ${compactClass}`}>
            {avatar}

            <div className={`article-stack-item-title`}>
                {segmentedTitle.prefix && (
                    <div className={`article-stack-item-title-prefix`}
                         dangerouslySetInnerHTML={{__html: segmentedTitle.prefix}}/>
                )}

                <div className={`article-stack-item-title-main`}
                     dangerouslySetInnerHTML={{__html: segmentedTitle.value}}/>
            </div>

            {defaultBodyContent}
        </div>
    )

    if(linkHref) {
        return (
            <Link href={linkHref}
                  tooltip={linkTooltip}
                  className={`article-stack-item-link`}>
                {content}
            </Link>
        )
    }

    return content
}

function ArticleStackHomeBubble({ itemWrapper, children, isBubbleOpen, onMouseEnter, onToggle, bubbleToggleRef }) {
    const bubbleClass = isBubbleOpen ? `article-stack-item-home-bubble-open` : ``

    return (
        <div className={`article-stack-item-home-bubble-shell ${bubbleClass}`.trim()}>
            <button type="button"
                    className={`article-stack-item-home-bubble-button`}
                    aria-expanded={isBubbleOpen}
                    aria-label={`Show more details for ${itemWrapper.locales.title || itemWrapper.placeholder}`}
                    onMouseEnter={onMouseEnter}
                    onFocus={onMouseEnter}
                    onClick={onToggle}
                    ref={bubbleToggleRef}>
                {children}
            </button>
        </div>
    )
}

function _splitTitle(title) {
    const normalizedTitle = title || ""
    const separatorIndex = normalizedTitle.indexOf(":")
    if(separatorIndex === -1) {
        return {
            prefix: "",
            value: normalizedTitle
        }
    }

    return {
        prefix: normalizedTitle.slice(0, separatorIndex).trim(),
        value: normalizedTitle.slice(separatorIndex + 1).trim()
    }
}

export default ArticleStack
