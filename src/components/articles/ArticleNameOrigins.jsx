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
            "Names once lived in memory: whose child, which household, which village. In Musić, the South Slavic suffix -ić carries the patronymic idea of “the young one” or “descendant of”; here, the line points back to Musa.",
            "After the Council of Trent mandated parish registers in 1563, baptisms and marriages gave family names a more durable paper trail. The council did not create Musić—record-keeping helped names like it remain traceable across centuries.",
            "That is the power I claim from it: a name linked to Moses and Musa—courage to begin, faith reaching across three world religions, and the resolve to step forward. Don Ivan Musić carried that resolve into the Herzegovinian uprising of 1875."
        ]
    },
    {
        id: "given",
        name: "Lovro",
        meta: "Given name · A line carried home",
        trail: ["Laurentius", "Laurenciji", "Lovrencij", "Lovrenc", "Lovren", "Lovre", "Lovro"],
        blocks: [
            "Laurus nobilis is the evergreen bay laurel: its aromatic leaves flavour food, while its branches were woven into wreaths for poets, commanders, and victors. A useful plant became a lasting Roman symbol of honour and achievement.",
            "Saint Laurentius gave the old Roman name a moral lineage. A deacon who served Rome’s poor, he was martyred under Valerian in 258. The name reaches me through another lineage too: my grandfather, his grandfather, and generations before them.",
            "In today’s English-shaped world, Lovro is unusual without being difficult: compact, phonetic, and confident on first contact. It belongs unmistakably to home, yet it does not need translation to travel."
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
