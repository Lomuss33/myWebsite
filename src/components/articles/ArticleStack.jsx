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

const HOME_STACK_POPUP_COPY = {
    en: {
        1: "Built tall, with a useful view over most rooms and a good reach for high shelves.",
        2: "Enough mass to stay grounded, keep momentum, and look like the hardware version of a software engineer.",
        3: "All structural parts accounted for. The chassis is complete and still ships in the original configuration.",
        4: "Well hydrated enough to keep the system running smoothly and the debugging patience intact.",
        5: "A solid circulation reserve, quietly keeping everything supplied and on schedule.",
        6: "Full manual input support. Handy for typing, wiring, fixing, and ambitious ideas.",
        7: "Close enough to sharp to catch details, patterns, and the tiny issue that breaks the nice-looking system.",
        8: "Thermally stable, pleasantly warm, and not prone to dramatic overheating under normal load.",
        9: "One upgrade in the chassis. Small number, but it keeps the system moving in the right direction.",
        10: "A lot of internal cabling, honestly. Respect to the original biological routing team.",
        11: "Generous storage, with the usual human indexing: brilliant connections, selective recall, and the occasional mystery.",
        12: "Quiet background maintenance. The body likes fast refresh cycles and shipping updates without a big announcement.",
        13: "A seriously industrial chemistry setup. Even the polite version comes with one committed processing plant.",
        14: "Proof that evolution enjoys remix culture. Under the polished exterior is a very collaborative codebase.",
        15: "Strong roots, clear current, and a sense of place that still travels with me.",
        16: "Rarely deployed, highly kinetic, and not to be underestimated. Edge cases only.",
        17: "Fast signaling helps reactions, decisions, and those satisfying moments when the answer appears before panic loads.",
        18: "Not bridge-building quantities, but enough for the small-but-critical logistics of staying human.",
        19: "Precious in trace amounts. Just enough sparkle to keep the legend reasonable.",
        20: "A serious internal defense department, working around the clock to keep the main mission safe.",
        21: "One of those beautiful details that makes biology feel like art direction with a lab budget.",
        22: "Even at rest, the machine is making useful energy. Efficient? Debatable. Alive and clearly online? Yes.",
        23: "A disciplined renewal schedule. The body understands maintenance windows and steady refreshes.",
        24: "An impressive processing line turning ordinary food into continued ambition. Slow magic, solid throughput."
    },
    de: {
        1: "Groß gewachsen, mit gutem Blick über die meisten Räume und Reichweite für die oberen Regale.",
        2: "Genug Masse zum geerdet bleiben, Schwung mitzunehmen und wie die Hardware-Version eines Softwaremenschen zu wirken.",
        3: "Alle tragenden Teile sind da. Das Chassis ist komplett und läuft noch in der Originalkonfiguration.",
        4: "Genug Wasser an Bord, damit das System sauber läuft und die Debugging-Geduld hält.",
        5: "Solide Reserve im Kreislauf, die alles unauffällig und pünktlich versorgt.",
        6: "Volle Hand-Eingabe vorhanden. Praktisch zum Tippen, Verdrahten, Reparieren und Anpacken.",
        7: "Nahe genug an scharf, um Details, Muster und den winzigen Fehler zu sehen, der alles kaputt macht.",
        8: "Thermisch stabil, angenehm warm und bei normaler Last nicht zu Drama-Neigung.",
        9: "Ein Upgrade im Chassis. Kleine Zahl, aber sie hält das System in die richtige Richtung.",
        10: "Ehrlich gesagt ziemlich viel interne Verkabelung. Respekt an das biologische Routing-Team.",
        11: "Großzügiger Speicher mit typischer Menschen-Indexierung: geniale Verknüpfungen, selektives Erinnern und gelegentliche Rätsel.",
        12: "Stille Hintergrundwartung. Der Körper mag schnelle Refresh-Zyklen und Updates ohne großes Tamtam.",
        13: "Eine ziemlich industrielle Chemieanlage. Selbst die höfliche Version hat ein sehr engagiertes Verarbeitungswerk.",
        14: "Beweis, dass Evolution Remix-Kultur liebt. Unter der glatten Oberfläche steckt eine sehr kollaborative Codebasis.",
        15: "Starke Wurzeln, klare Strömung und ein Heimatgefühl, das mich bis heute begleitet.",
        16: "Selten im Einsatz, sehr dynamisch und nicht zu unterschätzen. Nur für Grenzfälle.",
        17: "Schnelle Signale helfen bei Reaktion, Entscheidung und den schönen Momenten, in denen die Lösung vor der Panik auftaucht.",
        18: "Nicht genug für eine Brücke, aber genug für die kleinen, kritischen Logistikaufgaben des Menschseins.",
        19: "In Spuren wertvoll. Gerade genug Glanz, damit die Legende bezahlbar bleibt.",
        20: "Ein ernstes internes Verteidigungsministerium, das rund um die Uhr die Hauptmission schützt.",
        21: "Eines dieser schönen Details, die Biologie wie Art Direction mit Laborbudget wirken lassen.",
        22: "Schon im Leerlauf erzeugt die Maschine nützliche Energie. Effizient? Fraglich. Lebendig und online? Ganz klar.",
        23: "Ein disziplinierter Erneuerungsplan. Der Körper versteht Wartungsfenster und regelmäßige Auffrischung.",
        24: "Eine beeindruckende Verarbeitungskette, die normales Essen in anhaltenden Ehrgeiz verwandelt. Langsame Magie, solider Durchsatz."
    },
    hr: {
        1: "Visok sam, pa imam dobar pregled prostorije i dosežem gornje police bez pregovora.",
        2: "Dovoljno mase da ostanem prizemljen, zadržim zamah i izgledam kao hardverska verzija softveraša.",
        3: "Svi nosivi dijelovi su tu. Šasija je kompletna i još radi u originalnoj konfiguraciji.",
        4: "Dovoljno hidratacije da sustav radi glatko i da strpljenje za debug ostane netaknuto.",
        5: "Solidna cirkulacijska zaliha koja tiho drži sve opskrbljenim i na vrijeme.",
        6: "Puna ručna upravljačka podrška. Korisno za tipkanje, spajanje, popravljanje i velike ideje.",
        7: "Dovoljno oštro za detalje, uzorke i onaj sitni problem koji sruši lijepu cjelinu.",
        8: "Toplinski stabilan, ugodno topao i bez sklonosti drami pri normalnom opterećenju.",
        9: "Jedna nadogradnja u šasiji. Malo, ali dovoljno da sustav ide u pravom smjeru.",
        10: "Iskreno, ima dosta unutarnjeg kabliranja. Respect originalnom biološkom timu za routanje.",
        11: "Dosta memorije, uz uobičajeni ljudski indeks: genijalne veze, selektivno pamćenje i pokoja misterija.",
        12: "Tiho pozadinsko održavanje. Tijelo voli brze cikluse osvježavanja i ažuriranja bez pompe.",
        13: "Prilično industrijski kemijski pogon. Čak i uljudna verzija dolazi s jednim vrlo posvećenim postrojenjem.",
        14: "Dokaz da evolucija voli remix kulturu. Ispod uglađene površine stoji vrlo suradnički kod.",
        15: "Snažni korijeni, jasna struja i osjećaj mjesta koji i dalje putuje sa mnom.",
        16: "Rijetko aktivirano, vrlo kinetično i nikako za podcijeniti. Samo za rubne slučajeve.",
        17: "Brzi signali pomažu reakciji, odluci i onim lijepim trenucima kad rješenje stigne prije panike.",
        18: "Nije dovoljno za most, ali dovoljno za one male, kritične logistike ljudskog bića.",
        19: "Dragocjeno u tragovima. Tek toliko sjaja da legenda ostane razumna.",
        20: "Ozbiljno unutarnje obrambeno odjeljenje koje danonoćno čuva glavnu misiju.",
        21: "Jedan od onih lijepih detalja zbog kojih biologija izgleda kao art direction s laboratorijskim budžetom.",
        22: "Čak i u mirovanju stroj stvara korisnu energiju. Učinkovito? Upitno. Živo i online? Apsolutno.",
        23: "Disciplina obnove. Tijelo razumije servisne prozore i stalna osvježenja.",
        24: "Impresivna linija obrade koja običnu hranu pretvara u trajnu ambiciju. Spora magija, dobar protok."
    },
    tr: {
        1: "Uzun boy, çoğu odaya hakim bir görüş ve üst raflara uzanmak için iyi bir erişim.",
        2: "Ayakta tutan, ivmeyi koruyan ve yazılımcının donanım sürümü gibi duran bir ağırlık.",
        3: "Tüm taşıyıcı parçalar yerli yerinde. Şasi tam ve hâlâ orijinal ayarında çalışıyor.",
        4: "Sistem akışını ve debug sabrını koruyacak kadar iyi hidrate edilmiş.",
        5: "Her şeyi sessizce ve zamanında besleyen sağlam bir dolaşım rezervi.",
        6: "Tam el girişi desteği. Yazmak, kablolamak, tamir etmek ve büyük fikirler için kullanışlı.",
        7: "Detayları, kalıpları ve güzel görünen sistemi bozan minicik sorunu yakalayacak kadar keskin.",
        8: "Isıl olarak dengeli, hoş sıcak ve normal yükte dramatik ısınmaya meyilli değil.",
        9: "Şaside bir yükseltme. Sayı küçük ama sistemi doğru yönde tutmaya yetiyor.",
        10: "Dürüst olmak gerekirse bayağı iç kablolama var. Orijinal biyolojik yönlendirme ekibine saygı.",
        11: "Cömert bir bellek alanı; parlak bağlantılar, seçici hatırlama ve ara sıra gizemli geri çağırma.",
        12: "Sessiz arka plan bakımı. Vücut hızlı yenileme döngülerini ve duyuru yapmadan güncelleme çıkarmayı seviyor.",
        13: "Oldukça endüstriyel bir kimya düzeni. Nezaketli sürümde bile ciddi bir işleme tesisi var.",
        14: "Evrimin remix kültürünü sevdiğinin kanıtı. Parlak dış yüzeyin altında oldukça işbirlikçi bir kod tabanı var.",
        15: "Güçlü kökler, net bir akış ve hâlâ benimle gelen bir aidiyet hissi.",
        16: "Nadiren devreye girer, yüksek kinetiktir ve asla küçümsenmez. Sadece uç durumlar için.",
        17: "Hızlı sinyaller, tepkiyi ve kararları hızlandırır; bazen panik yüklenmeden çözüm gelir.",
        18: "Köprü kuracak kadar değil, ama insan olmanın küçük ve kritik lojistiği için yeterli.",
        19: "İz miktarında kıymetli. Efsaneyi bütçeyi bozmadan yaşatacak kadar parıltı.",
        20: "Ana görevi korumak için günün her saati çalışan ciddi bir iç savunma departmanı.",
        21: "Biyolojiyi laboratuvar bütçeli bir sanat yönetimi gibi hissettiren güzel ayrıntılardan biri.",
        22: "Dinlenirken bile makine yararlı enerji üretiyor. Verimli mi? Tartışılır. Canlı ve çevrimiçi mi? Kesinlikle.",
        23: "Disiplinli bir yenilenme takvimi. Vücut bakım pencerelerini ve düzenli tazelemeyi iyi biliyor.",
        24: "Sıradan yiyeceği sürdürülen hırsa çeviren etkileyici bir işleme hattı. Yavaş sihir, sağlam verim."
    }
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

const ART_STACK_INITIAL_ITEM_MOUNT_COUNT = 24

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

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const refreshSeed = selectedItemCategoryId + "::" + language.getSelectedLanguage()?.id + "-" + theme.getSelectedTheme()?.id
    const deferredItemsKey = `${dataWrapper.uniqueId}::${refreshSeed}::${filteredItems.length}`
    const shouldDeferCompactItems = isCompactStack && filteredItems.length > ART_STACK_INITIAL_ITEM_MOUNT_COUNT
    const [readyDeferredItemsKey, setReadyDeferredItemsKey] = useState(null)
    const deferredCompactItemsReady = !shouldDeferCompactItems || readyDeferredItemsKey === deferredItemsKey
    const visibleItems = shouldDeferCompactItems && !deferredCompactItemsReady ?
        filteredItems.slice(0, ART_STACK_INITIAL_ITEM_MOUNT_COUNT) :
        filteredItems
    const refreshFlag = `${refreshSeed}::${deferredCompactItemsReady ? "full" : "initial"}`
    const homeClass = isHomeStack ? `article-stack-items-home` : ``
    const compactClass = isCompactStack ? `article-stack-items-compact` : ``
    const stackClassName = `article-stack-items ${homeClass} ${compactClass}`.trim()
    const renderedItems = visibleItems.map((itemWrapper, key) => (
        <ArticleStackItem itemWrapper={itemWrapper}
                          isHomeStack={isHomeStack}
                          isCompactStack={isCompactStack}
                          key={key}/>
    ))

    useEffect(() => {
        if(!shouldDeferCompactItems) {
            setReadyDeferredItemsKey(deferredItemsKey)
            return undefined
        }

        if(typeof window === "undefined") {
            setReadyDeferredItemsKey(deferredItemsKey)
            return undefined
        }

        const revealDeferredItems = () => {
            setReadyDeferredItemsKey(deferredItemsKey)
        }

        if("requestIdleCallback" in window) {
            const idleId = window.requestIdleCallback(revealDeferredItems, { timeout: 1800 })
            return () => window.cancelIdleCallback(idleId)
        }

        const timeoutId = window.setTimeout(revealDeferredItems, 800)
        return () => window.clearTimeout(timeoutId)
    }, [deferredItemsKey, shouldDeferCompactItems])

    if(isHomeStack) {
        return (
            <Collapsable className={stackClassName}
                         id={dataWrapper.uniqueId}
                         initialVisibleRows={1}>
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
    const language = useLanguage()
    const viewport = useViewport()
    const selectedLanguageId = language.getSelectedLanguage()?.id || "en"
    const title = itemWrapper.locales.title || itemWrapper.placeholder
    const segmentedTitle = _splitTitle(title)
    const homeClass = isHomeStack ? `article-stack-item-home` : ``
    const compactClass = isCompactStack ? `article-stack-item-compact` : ``
    const linkHref = itemWrapper.link?.href
    const linkTooltip = itemWrapper.link?.tooltip
    const emojiIconText = itemWrapper.iconText
    const bubbleMarkup = itemWrapper.locales.proofBubble ||
        (isHomeStack ? HOME_STACK_POPUP_COPY[selectedLanguageId]?.[itemWrapper.id] || HOME_STACK_POPUP_COPY.en?.[itemWrapper.id] : null) ||
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
