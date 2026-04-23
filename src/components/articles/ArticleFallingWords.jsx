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
    const stageHeight = Math.max(400, Math.min(560, Math.round(viewport.innerHeight * 0.34)))
    const stageFontScale = 0.6

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
