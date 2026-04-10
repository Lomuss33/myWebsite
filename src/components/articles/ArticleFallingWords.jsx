import "./ArticleFallingWords.scss"
import React, {useMemo} from "react"
import Article from "./base/Article.jsx"
import FallingWords from "../generic/FallingWords.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

const DEFAULT_WORDS =
    "Psychology, Biology, Sociology, Theology, Anthropology, Ecology, Geology, Meteorology, Neurology, Oncology, Epidemiology, Archaeology, Etymology, Pharmacology, Cosmology, Astrology, Zoology, Botany, Criminology, Eschatology, Technology, Cryptology, Ontology, Terminology, Methodology, Epidemiology, Topology, Chronology, Genealogy, Numerology, Symbology, Typology, Phraseology, Morphology, Phonology, Lexicology, Graphology, Radiology, Neurology, Pathology, Cardiology, Dermatology, Endocrinology, Immunology, Microbiology, Virology, Paleontology, Oceanography, Hydrology, Seismology, Volcanology, Limnology, Ichthyology, Entomology, Mycology, Hematology, Nephrology, Urology, Rheumatology, Pathology, Radiology, Toxicology, Parasitology, Cytology, Histology, Phonology, Morphology, Lexicology, Semiology, Typology"

const WORD_DEFINITIONS_EN = {
    Psychology: "The study of the mind and behavior.",
    Biology: "The study of living organisms.",
    Sociology: "The study of society and social behavior.",
    Theology: "The study of religious belief and the nature of God.",
    Anthropology: "The study of humans, cultures, and societies.",
    Ecology: "The study of how organisms interact with their environment.",
    Geology: "The study of Earth’s structure, rocks, and history.",
    Meteorology: "The study of weather and the atmosphere.",
    Neurology: "The branch of medicine dealing with the nervous system.",
    Oncology: "The branch of medicine dealing with cancer.",
    Epidemiology: "The study of how diseases spread and are controlled.",
    Archaeology: "The study of past human life through artifacts and sites.",
    Etymology: "The study of word origins and how meanings change.",
    Pharmacology: "The study of drugs and their effects on the body.",
    Cosmology: "The study of the origin and structure of the universe.",
    Astrology: "A belief system linking celestial positions to human affairs.",
    Zoology: "The study of animals.",
    Botany: "The study of plants.",
    Criminology: "The study of crime and criminal behavior.",
    Eschatology: "The study of “last things,” such as the end of the world.",
    Technology: "The practical use of science to solve problems.",
    Cryptology: "The study of codes, ciphers, and secure communication.",
    Ontology: "The study of being and what exists; a model of concepts in computing.",
    Terminology: "The set and study of specialized words in a field.",
    Methodology: "A system or study of methods used to do something.",
    Topology: "A branch of math about shapes and continuity under deformation.",
    Chronology: "The arrangement of events in the order they happened.",
    Genealogy: "The study of family lines and ancestry.",
    Numerology: "A belief that numbers have hidden or mystical meanings.",
    Symbology: "The study and use of symbols.",
    Typology: "The classification of things into types.",
    Phraseology: "A characteristic way of using words and phrases.",
    Morphology: "The study of form and structure (organisms or words).",
    Phonology: "The study of sound patterns in language.",
    Lexicology: "The study of words and vocabulary.",
    Graphology: "The study of handwriting.",
    Radiology: "A medical specialty using imaging to diagnose and treat disease.",
    Pathology: "The study of disease and its causes and effects.",
    Cardiology: "The branch of medicine dealing with the heart.",
    Dermatology: "The branch of medicine dealing with the skin.",
    Endocrinology: "The branch of medicine dealing with hormones and glands.",
    Immunology: "The study of the immune system.",
    Microbiology: "The study of microorganisms.",
    Virology: "The study of viruses.",
    Paleontology: "The study of ancient life through fossils.",
    Oceanography: "The study of the oceans.",
    Hydrology: "The study of water and its movement on Earth.",
    Seismology: "The study of earthquakes and seismic waves.",
    Volcanology: "The study of volcanoes and volcanic activity.",
    Limnology: "The study of inland waters like lakes and rivers.",
    Ichthyology: "The study of fish.",
    Entomology: "The study of insects.",
    Mycology: "The study of fungi.",
    Hematology: "The branch of medicine dealing with blood.",
    Nephrology: "The branch of medicine dealing with the kidneys.",
    Urology: "The branch of medicine dealing with the urinary tract.",
    Rheumatology: "The branch of medicine dealing with joints and autoimmune disease.",
    Toxicology: "The study of poisons and harmful effects of chemicals.",
    Parasitology: "The study of parasites and their hosts.",
    Cytology: "The study of cells.",
    Histology: "The study of tissues under the microscope.",
    Semiology: "The study of signs and symbols and what they mean."
}

function ArticleFallingWords({ dataWrapper }) {
    const language = useLanguage()

    const entries = useMemo(() => {
        const orderedItems = dataWrapper?.orderedItems || []
        return orderedItems
            .map(item => ({
                word: item?.locales?.title || item?.placeholder || "",
                definition: item?.locales?.text || WORD_DEFINITIONS_EN[item?.locales?.title] || null
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
