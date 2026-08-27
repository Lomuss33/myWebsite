import "./ArticleFallingWords.scss"
import React, {useMemo} from "react"
import Article from "./base/Article.jsx"
import FallingWords from "../generic/FallingWords.jsx"
import PretextFitText from "../generic/PretextFitText.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {FALLING_WORDS_I18N} from "../../data/fallingWordsI18n.js"

const DEFAULT_WORDS =
    "Psychology, Biology, Sociology, Theology, Anthropology, Ecology, Geology, Meteorology, Neurology, Oncology, Epidemiology, Archaeology, Etymology, Pharmacology, Cosmology, Astrology, Zoology, Botany, Criminology, Eschatology, Technology, Cryptology, Ontology, Terminology, Methodology, Epidemiology, Topology, Chronology, Genealogy, Numerology, Symbology, Typology, Phraseology, Morphology, Phonology, Lexicology, Graphology, Radiology, Neurology, Pathology, Cardiology, Dermatology, Endocrinology, Immunology, Microbiology, Virology, Paleontology, Oceanography, Hydrology, Seismology, Volcanology, Limnology, Ichthyology, Entomology, Mycology, Hematology, Nephrology, Urology, Rheumatology, Pathology, Radiology, Toxicology, Parasitology, Cytology, Histology, Phonology, Morphology, Lexicology, Semiology, Typology"

const WORD_SEARCH_PREFIXES = {
    en: "how to learn",
    de: "wie lernen",
    hr: "kako naučiti",
    tr: "nasıl öğrenilir"
}

const WORD_FONT_SCALE_STOPS = [
    // The base word size already grows with viewport width. These multipliers
    // keep the resulting text comfortably readable without over-scaling it.
    [320, 0.75],
    [480, 0.76],
    [768, 0.78],
    [1024, 0.73],
    [1440, 0.71],
    [1920, 0.73],
    [2560, 0.77]
]

const interpolateScale = (width, stops) => {
    if(width <= stops[0][0]) return stops[0][1]

    for(let index = 1; index < stops.length; index += 1) {
        const [upperWidth, upperScale] = stops[index]
        const [lowerWidth, lowerScale] = stops[index - 1]
        if(width > upperWidth) continue

        const progress = (width - lowerWidth) / (upperWidth - lowerWidth)
        return lowerScale + (upperScale - lowerScale) * progress
    }

    return stops.at(-1)[1]
}

function ArticleFallingWords({ dataWrapper }) {
    const language = useLanguage()
    const viewport = useViewport()
    const isMobileLayout = viewport.isMobileLayout()

    const entries = useMemo(() => {
        const langId = language.selectedLanguageId || "en"
        const titles = FALLING_WORDS_I18N[langId]?.titles || FALLING_WORDS_I18N.en.titles
        const definitions = FALLING_WORDS_I18N[langId]?.definitions || FALLING_WORDS_I18N.en.definitions

        const orderedItems = dataWrapper?.orderedItems || []
        return orderedItems
            .map(item => {
                const canonical = item?.locales?.title || item?.placeholder || ""
                return {
                    word: titles[canonical] || canonical,
                    definition:
                        item?.locales?.text
                        || definitions[canonical]
                        || FALLING_WORDS_I18N.en.definitions[canonical]
                        || null
                }
            })
            .filter(entry => Boolean(entry.word))
    }, [dataWrapper, language.selectedLanguageId])

    const fallbackText = language.getString("definition_coming_soon")
    const hintText = language.getString("click_word_definition")
    const wordSearchPrefix = WORD_SEARCH_PREFIXES[language.selectedLanguageId] || WORD_SEARCH_PREFIXES.en
    const stageHeight = isMobileLayout ?
        Math.max(230, Math.min(300, Math.round(viewport.innerHeight * 0.24))) :
        Math.max(400, Math.min(560, Math.round(viewport.innerHeight * 0.34)))
    const stageFontScale = useMemo(
        () => interpolateScale(viewport.innerWidth || 1280, WORD_FONT_SCALE_STOPS),
        [viewport.innerWidth]
    )

    return (
        <Article
            id={dataWrapper.uniqueId}
            type={Article.Types.SPACING_DEFAULT}
            dataWrapper={dataWrapper}
            className={`article-falling-words`}
        >
            <PretextFitText
                text={hintText}
                className={`article-falling-words-hint text-2`}
                minFontSizePx={16}
                maxFontSizePx={24}
                lineHeightRatio={1.24}
            />

            <FallingWords
                entries={entries.length ? entries : undefined}
                text={entries.length ? undefined : DEFAULT_WORDS}
                splitRegex={/\s*,\s*/g}
                height={stageHeight}
                fontScale={stageFontScale}
                highlightPrefixes={[]}
                definitionFallbackText={fallbackText}
                wordSearchPrefix={wordSearchPrefix}
                className={`article-falling-words-stage`}
            />
        </Article>
    )
}

export default ArticleFallingWords
