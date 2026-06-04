import "./ArticleFallingWords.scss"
import React, {useMemo} from "react"
import Article from "./base/Article.jsx"
import FallingWords from "../generic/FallingWords.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {FALLING_WORDS_I18N} from "../../data/fallingWordsI18n.js"

const DEFAULT_WORDS =
    "Psychology, Biology, Sociology, Theology, Anthropology, Ecology, Geology, Meteorology, Neurology, Oncology, Epidemiology, Archaeology, Etymology, Pharmacology, Cosmology, Astrology, Zoology, Botany, Criminology, Eschatology, Technology, Cryptology, Ontology, Terminology, Methodology, Epidemiology, Topology, Chronology, Genealogy, Numerology, Symbology, Typology, Phraseology, Morphology, Phonology, Lexicology, Graphology, Radiology, Neurology, Pathology, Cardiology, Dermatology, Endocrinology, Immunology, Microbiology, Virology, Paleontology, Oceanography, Hydrology, Seismology, Volcanology, Limnology, Ichthyology, Entomology, Mycology, Hematology, Nephrology, Urology, Rheumatology, Pathology, Radiology, Toxicology, Parasitology, Cytology, Histology, Phonology, Morphology, Lexicology, Semiology, Typology"

function ArticleFallingWords({ dataWrapper }) {
    const language = useLanguage()
    const viewport = useViewport()
    const isMobileLayout = viewport.isMobileLayout()
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

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
    const stageHeight = isMobileLayout ?
        Math.max(280, Math.min(420, Math.round(viewport.innerHeight * 0.28))) :
        Math.max(400, Math.min(560, Math.round(viewport.innerHeight * 0.34)))
    const stageFontScale = useMemo(() => {
        const viewportWidth = viewport.innerWidth || 1280

        if(viewportWidth <= 480)
            return 0.48

        if(viewportWidth <= 768) {
            const progress = (viewportWidth - 480) / (768 - 480)
            return clamp(0.48 + progress * 0.08, 0.48, 0.56)
        }

        if(viewportWidth <= 1024) {
            const progress = (viewportWidth - 768) / (1024 - 768)
            return clamp(0.52 + progress * 0.08, 0.52, 0.6)
        }

        if(viewportWidth <= 1440) {
            const progress = (viewportWidth - 1024) / (1440 - 1024)
            return clamp(0.6 + progress * 0.12, 0.6, 0.72)
        }

        return 0.72
    }, [viewport.innerWidth])

    return (
        <Article
            id={dataWrapper.uniqueId}
            type={Article.Types.SPACING_DEFAULT}
            dataWrapper={dataWrapper}
            className={`article-falling-words`}
        >
            <div className={`article-falling-words-hint text-2`}>
                {hintText}
            </div>

            <FallingWords
                entries={entries.length ? entries : undefined}
                text={entries.length ? undefined : DEFAULT_WORDS}
                splitRegex={/\s*,\s*/g}
                height={stageHeight}
                fontScale={stageFontScale}
                highlightPrefixes={[]}
                definitionFallbackText={fallbackText}
                className={`article-falling-words-stage`}
            />
        </Article>
    )
}

export default ArticleFallingWords
