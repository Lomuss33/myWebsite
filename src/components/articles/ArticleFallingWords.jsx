import "./ArticleFallingWords.scss"
import React, {useMemo} from "react"
import Article from "./base/Article.jsx"
import FallingWords from "../generic/FallingWords.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

const DEFAULT_WORDS =
    "Psychology, Biology, Sociology, Theology, Anthropology, Ecology, Geology, Meteorology, Neurology, Oncology, Epidemiology, Archaeology, Etymology, Pharmacology, Cosmology, Astrology, Zoology, Botany, Criminology, Eschatology, Technology, Cryptology, Ontology, Terminology, Methodology, Epidemiology, Topology, Chronology, Genealogy, Numerology, Symbology, Typology, Phraseology, Morphology, Phonology, Lexicology, Graphology, Radiology, Neurology, Pathology, Cardiology, Dermatology, Endocrinology, Immunology, Microbiology, Virology, Paleontology, Oceanography, Hydrology, Seismology, Volcanology, Limnology, Ichthyology, Entomology, Mycology, Hematology, Nephrology, Urology, Rheumatology, Pathology, Radiology, Toxicology, Parasitology, Cytology, Histology, Phonology, Morphology, Lexicology, Semiology, Typology"

function ArticleFallingWords({ dataWrapper }) {
    const language = useLanguage()

    const entries = useMemo(() => {
        const orderedItems = dataWrapper?.orderedItems || []
        return orderedItems
            .map(item => ({
                word: item?.locales?.title || item?.placeholder || "",
                definition: item?.locales?.text || null
            }))
            .filter(entry => Boolean(entry.word))
    }, [dataWrapper, language.selectedLanguageId])

    const fallbackText = language.getString("definition_coming_soon")
    const hintText = language.getString("click_word_definition")

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

            <div className={`article-falling-words-stage`}>
                <FallingWords
                    entries={entries.length ? entries : undefined}
                    text={entries.length ? undefined : DEFAULT_WORDS}
                    splitRegex={/\s*,\s*/g}
                    height={360}
                    fontScale={0.66}
                    highlightPrefixes={[]}
                    definitionFallbackText={fallbackText}
                />
            </div>
        </Article>
    )
}

export default ArticleFallingWords
