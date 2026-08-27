import "./ArticleNameOrigins.scss"
import { useEffect, useState } from "react"
import Article from "./base/Article.jsx"
import PretextInteractiveText from "../generic/PretextInteractiveText.jsx"

const STORIES = [
    {
        id: "surname",
        name: "Musić",
        meta: "Surname · A line that reaches outward",
        trail: ["Musić", "Musa", "Moses"],
        blocks: [
            "Musić is a South Slavic surname built with the suffix -ić. The suffix began as a diminutive and developed a patronymic function, commonly marking a younger member or descendant of a family line. The base may be the personal name or nickname Musa, but surname etymology is rarely proved by spelling alone; several unrelated families can form the same surname independently.",
            "Musa is the Arabic form of Moses, one of the central figures shared by Judaism, Christianity, and Islam. This explains why names derived from Musa occur across different religious and ethnic communities in the Balkans. The surname therefore reflects a region where Slavic language, Ottoman-era naming, and several religious traditions interacted for centuries.",
            "Written records made such family names easier to trace. The Council of Trent required Catholic parishes to register baptisms and marriages in 1563, while later civil systems standardized inherited surnames more firmly. One notable bearer was the Catholic priest and vojvoda Don Ivan Musić, a leader in the Herzegovinian uprising against Ottoman rule from 1875 to 1878—an uprising that became part of the wider Eastern Crisis."
        ]
    },
    {
        id: "given",
        name: "Lovro",
        meta: "Given name · A line carried home",
        trail: ["Laurentius", "Lawrence", "Laurent", "Lorenzo", "Lorenz", "Lovre", "Lovro"],
        blocks: [
            "Lovro is a Croatian and Slovene form in the large European name family descended from the Latin Laurentius. Strictly translated, Laurentius meant “a person from Laurentum,” an ancient town near Rome. Laurentum itself was traditionally associated with laurus, the Latin word for laurel, which is why the name later acquired the familiar meaning “laurelled” or “crowned with laurel.”",
            "The evergreen bay laurel, Laurus nobilis, was both useful and symbolic. Its leaves were used in food and medicine, while Greek and Roman wreaths honoured athletic victors, military success, poets, and public achievement. That symbolism survives in words such as “laureate” and in the expression “resting on one’s laurels”: the plant became shorthand for distinction earned and publicly recognized.",
            "The name spread through Europe largely because of Saint Lawrence of Rome. Lawrence was a deacon responsible for charitable resources and support for the poor; he was martyred during Emperor Valerian’s persecution in 258. Latin Laurentius then developed into regional forms including Lawrence, Laurent, Lorenzo, Lorenz, Lovre, and Lovro. In my family, Lovro also passed through my grandfather and earlier generations, joining this wider history to a direct family tradition."
        ]
    }
]

function ArticleNameOrigins({ dataWrapper }) {
    const useInteractiveStories = useInteractiveStoryText()

    return (
        <Article id={dataWrapper.uniqueId} type={Article.Types.SPACING_SMALL}
                 dataWrapper={dataWrapper} className="article-name-origins" forceHideTitle={true}>
            <div className="article-name-origins-panel">
                {STORIES.map((story, index) => (
                    <NameOrigin key={story.id} story={story} index={index}
                                useInteractiveStories={useInteractiveStories}/>
                ))}
                <footer><span/>Easy to say. Impossible to separate from where I come from.</footer>
            </div>
        </Article>
    )
}

function NameOrigin({ story, index, useInteractiveStories }) {
    return (
        <section className={`name-origin name-origin-${story.id}`} aria-labelledby={`name-origin-${story.id}`}>
            <div className="name-origin-display">
                <div className="name-origin-meta"><b>0{index + 1}</b>{story.meta}</div>
                <h3 id={`name-origin-${story.id}`} className="visually-hidden">{story.name}</h3>
                <div aria-hidden="true">
                    <PretextInteractiveText html={story.name} className="name-origin-word"
                                            effectVariant="wave" terrainVariant="detailed"
                                            revealOnScroll={false} replayOnHover={false}
                                            widthMeasurementMode="self_only"/>
                </div>
            </div>
            <div className="name-origin-copy">
                <div className="name-origin-lineage" aria-label={story.trail.join(" evolves into ")}>
                    {story.trail.map((step, stepIndex) => (
                        <span key={step}>
                            {stepIndex > 0 && <i aria-hidden="true">→</i>}
                            <b>{step}</b>
                        </span>
                    ))}
                </div>
                {story.blocks.map((block, blockIndex) => (
                    useInteractiveStories ? (
                        <PretextInteractiveText html={`<p>${block}</p>`}
                                                key={`${story.id}-${blockIndex}`}
                                                className={`name-origin-story name-origin-story-${blockIndex + 1}`}
                                                effectVariant="wave"
                                                terrainVariant="standard"
                                                revealOnScroll={false}
                                                replayOnHover={false}
                                                widthMeasurementMode="self_only"/>
                    ) : (
                        <p key={`${story.id}-${blockIndex}`}
                           className={`name-origin-story-mobile name-origin-story-${blockIndex + 1}`}>
                            {block}
                        </p>
                    )
                ))}
            </div>
        </section>
    )
}

function useInteractiveStoryText() {
    const query = "(min-width: 1101px) and (hover: hover) and (pointer: fine)"
    const readQuery = () => {
        if(typeof window === "undefined" || !window.matchMedia) return true
        return window.matchMedia(query).matches
    }
    const [isInteractive, setIsInteractive] = useState(readQuery)

    useEffect(() => {
        if(!window.matchMedia) return undefined

        const mediaQuery = window.matchMedia(query)
        const updateMode = () => setIsInteractive(mediaQuery.matches)
        updateMode()
        mediaQuery.addEventListener("change", updateMode)
        return () => mediaQuery.removeEventListener("change", updateMode)
    }, [])

    return isInteractive
}

export default ArticleNameOrigins
