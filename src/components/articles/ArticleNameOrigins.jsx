import "./ArticleNameOrigins.scss"
import { useEffect, useState } from "react"
import Article from "./base/Article.jsx"
import PretextInteractiveText from "../generic/PretextInteractiveText.jsx"
import { useLanguage } from "../../providers/LanguageProvider.jsx"

const STORY_IDENTITIES = [
    {
        id: "surname",
        name: "Musić",
        trail: ["Musić", "Musa", "Moses"]
    },
    {
        id: "given",
        name: "Lovro",
        trail: ["Laurentius", "Lawrence", "Laurent", "Lorenzo", "Lorenz", "Lovre", "Lovro"]
    }
]

const COPY = {
    en: {
        surname: {
            meta: "Surname · A line that reaches outward",
            blocks: [
                "Musić is a South Slavic surname built with the suffix -ić. The suffix began as a diminutive and developed a patronymic function, commonly marking a younger member or descendant of a family line. The base may be the personal name or nickname Musa, but surname etymology is rarely proved by spelling alone; several unrelated families can form the same surname independently.",
                "Musa is the Arabic form of Moses, one of the central figures shared by Judaism, Christianity, and Islam. This explains why names derived from Musa occur across different religious and ethnic communities in the Balkans. The surname therefore reflects a region where Slavic language, Ottoman-era naming, and several religious traditions interacted for centuries.",
                "Written records made such family names easier to trace. The Council of Trent required Catholic parishes to register baptisms and marriages in 1563, while later civil systems standardized inherited surnames more firmly. One notable bearer was the Catholic priest and vojvoda Don Ivan Musić, a leader in the Herzegovinian uprising against Ottoman rule from 1875 to 1878—an uprising that became part of the wider Eastern Crisis."
            ]
        },
        given: {
            meta: "Given name · A line carried home",
            blocks: [
                "Lovro is a Croatian and Slovene form in the large European name family descended from the Latin Laurentius. Strictly translated, Laurentius meant “a person from Laurentum,” an ancient town near Rome. Laurentum itself was traditionally associated with laurus, the Latin word for laurel, which is why the name later acquired the familiar meaning “laurelled” or “crowned with laurel.”",
                "The evergreen bay laurel, Laurus nobilis, was both useful and symbolic. Its leaves were used in food and medicine, while Greek and Roman wreaths honoured athletic victors, military success, poets, and public achievement. That symbolism survives in words such as “laureate” and in the expression “resting on one’s laurels”: the plant became shorthand for distinction earned and publicly recognized.",
                "The name spread through Europe largely because of Saint Lawrence of Rome. Lawrence was a deacon responsible for charitable resources and support for the poor; he was martyred during Emperor Valerian’s persecution in 258. Latin Laurentius then developed into regional forms including Lawrence, Laurent, Lorenzo, Lorenz, Lovre, and Lovro. In my family, Lovro also passed through my grandfather and earlier generations, joining this wider history to a direct family tradition."
            ]
        },
        evolvesInto: " evolves into ",
        footer: "Easy to say. Impossible to separate from where I come from."
    },
    de: {
        surname: {
            meta: "Nachname · Eine Linie, die in die Welt reicht",
            blocks: [
                "Musić ist ein südslawischer Familienname, der mit dem Suffix -ić gebildet wird. Dieses Suffix diente ursprünglich der Verkleinerung und entwickelte später eine patronymische Funktion: Häufig bezeichnet es ein jüngeres Mitglied oder einen Nachkommen einer Familienlinie. Als Grundlage kommt der Personenname oder Beiname Musa infrage. Die Etymologie eines Familiennamens lässt sich jedoch selten allein anhand seiner Schreibweise belegen; mehrere nicht miteinander verwandte Familien können denselben Namen unabhängig voneinander gebildet haben.",
                "Musa ist die arabische Form von Moses, einer zentralen Gestalt, die Judentum, Christentum und Islam miteinander teilen. Das erklärt, warum von Musa abgeleitete Namen auf dem Balkan in unterschiedlichen religiösen und ethnischen Gemeinschaften vorkommen. Der Familienname spiegelt damit eine Region wider, in der die slawische Sprachwelt, die Namensgebung der osmanischen Zeit und mehrere religiöse Traditionen über Jahrhunderte ineinandergriffen.",
                "Schriftliche Aufzeichnungen machten solche Familiennamen leichter nachvollziehbar. Das Konzil von Trient verpflichtete katholische Pfarreien 1563 dazu, Taufen und Eheschließungen zu registrieren; spätere staatliche Systeme vereinheitlichten vererbte Nachnamen noch stärker. Ein bekannter Namensträger war der katholische Priester und Woiwode Don Ivan Musić, ein Anführer des herzegowinischen Aufstands gegen die osmanische Herrschaft von 1875 bis 1878 – eines Aufstands, der Teil der größeren Orientalischen Krise wurde."
            ]
        },
        given: {
            meta: "Vorname · Eine Linie, die nach Hause führt",
            blocks: [
                "Lovro ist die kroatische und slowenische Form einer großen europäischen Namensfamilie, die auf das lateinische Laurentius zurückgeht. Wörtlich bezeichnete Laurentius „eine Person aus Laurentum“, einer antiken Stadt nahe Rom. Laurentum selbst wurde traditionell mit laurus, dem lateinischen Wort für Lorbeer, verbunden; so erhielt der Name später die vertraute Bedeutung „lorbeerbekränzt“ oder „mit Lorbeer gekrönt“.",
                "Der immergrüne Echte Lorbeer, Laurus nobilis, war nützlich und symbolträchtig zugleich. Seine Blätter fanden in Küche und Medizin Verwendung; griechische und römische Kränze ehrten sportliche Sieger, militärische Erfolge, Dichter und öffentliche Verdienste. Diese Symbolik lebt in Wörtern wie „Laureat“ und in der Wendung „sich auf seinen Lorbeeren ausruhen“ fort: Die Pflanze wurde zum Sinnbild für erworbene und öffentlich anerkannte Auszeichnung.",
                "Seine Verbreitung in Europa verdankt der Name zu einem großen Teil dem heiligen Laurentius von Rom. Laurentius war als Diakon für die kirchliche Armenfürsorge und die Unterstützung Bedürftiger verantwortlich; während der Verfolgung unter Kaiser Valerian erlitt er 258 den Märtyrertod. Aus dem lateinischen Laurentius entstanden regionale Formen wie Lawrence, Laurent, Lorenzo, Lorenz, Lovre und Lovro. In meiner Familie wurde Lovro außerdem über meinen Großvater und frühere Generationen weitergegeben – so verbindet sich diese große Geschichte mit einer unmittelbaren Familientradition."
            ]
        },
        evolvesInto: " entwickelt sich zu ",
        footer: "Leicht auszusprechen. Untrennbar mit meiner Herkunft verbunden."
    },
    hr: {
        surname: {
            meta: "Prezime · Loza koja seže u svijet",
            blocks: [
                "Musić je južnoslavensko prezime tvoreno sufiksom -ić. Taj je sufiks isprva imao deminutivnu, a poslije je razvio patronimičku funkciju te je često označavao mlađeg člana ili potomka obiteljske loze. Osnova može biti osobno ime ili nadimak Musa, no etimologiju prezimena rijetko je moguće dokazati samo prema njegovu zapisu: više međusobno nepovezanih obitelji moglo je neovisno oblikovati isto prezime.",
                "Musa je arapski oblik imena Mojsije, jedne od središnjih osoba u judaizmu, kršćanstvu i islamu. To objašnjava zašto se imena izvedena od Muse pojavljuju u različitim vjerskim i etničkim zajednicama na Balkanu. Prezime stoga odražava prostor u kojem su se slavenski jezik, osmanska tradicija imenovanja i više vjerskih predaja stoljećima isprepletali.",
                "Pisani izvori olakšali su praćenje takvih obiteljskih imena. Tridentski sabor 1563. obvezao je katoličke župe na vođenje matica krštenih i vjenčanih, dok su kasniji građanski sustavi čvršće standardizirali nasljedna prezimena. Jedan od istaknutih nositelja bio je katolički svećenik i vojvoda don Ivan Musić, vođa Hercegovačkog ustanka protiv osmanske vlasti od 1875. do 1878. – ustanka koji je postao dijelom šire Istočne krize."
            ]
        },
        given: {
            meta: "Ime · Nit koja vodi kući",
            blocks: [
                "Lovro je hrvatski i slovenski oblik iz velike europske skupine srodnih imena koja potječu od latinskoga Laurentius. U doslovnom značenju Laurentius je bio „osoba iz Laurentuma“, drevnoga grada u blizini Rima. Sam Laurentum tradicionalno se povezivao s riječju laurus, latinskim nazivom za lovor, pa je ime poslije dobilo poznato značenje „ovjenčan lovorom“ ili „okrunjen lovorovim vijencem“.",
                "Zimzeleni pravi lovor, Laurus nobilis, bio je istodobno koristan i simboličan. Njegovo lišće upotrebljavalo se u prehrani i liječenju, dok su grčki i rimski vijenci odavali počast sportskim pobjednicima, vojnim uspjesima, pjesnicima i javnim postignućima. Ta simbolika živi u riječi „laureat“ i izrazu „počivati na lovorikama“: biljka je postala sažetim znakom zaslužene i javno priznate izvrsnosti.",
                "Ime se Europom proširilo ponajprije zahvaljujući svetom Lovri Rimskom. Lovro je bio đakon zadužen za crkvenu dobrotvornu skrb i pomoć siromašnima; mučenički je stradao tijekom progona cara Valerijana 258. godine. Latinski Laurentius zatim se razvio u regionalne oblike među kojima su Lawrence, Laurent, Lorenzo, Lorenz, Lovre i Lovro. U mojoj se obitelji Lovro prenosio i preko mojega djeda te ranijih naraštaja, spajajući tu širu povijest s izravnom obiteljskom predajom."
            ]
        },
        evolvesInto: " prelazi u ",
        footer: "Lako se izgovara. Nemoguće ga je odvojiti od mojih korijena."
    },
    tr: {
        surname: {
            meta: "Soyadı · Dünyaya uzanan bir çizgi",
            blocks: [
                "Musić, -ić ekiyle kurulmuş bir Güney Slav soyadıdır. Bu ek başlangıçta küçültme işlevi taşırken zamanla baba soyunu bildiren bir işleve kavuşmuş; çoğu kez bir aile kolunun genç üyesini ya da soyundan gelen kişiyi belirtmiştir. Kökünde Musa kişi adı veya lakabı bulunabilir. Ancak soyadı kökenleri yalnızca yazılış biçiminden hareketle nadiren kesin olarak kanıtlanabilir; birbiriyle akraba olmayan birkaç aile aynı soyadını bağımsız biçimde oluşturmuş olabilir.",
                "Musa, İngilizcede Moses olarak bilinen adın Arapça biçimidir ve Yahudilik, Hristiyanlık ile İslam'ın ortak kabul ettiği temel şahsiyetlerden biridir. Bu durum, Musa'dan türeyen adların Balkanlar'daki farklı dinî ve etnik topluluklarda görülmesini açıklar. Dolayısıyla bu soyadı; Slav dili, Osmanlı dönemi adlandırma geleneği ve çeşitli dinî geleneklerin yüzyıllar boyunca etkileşim içinde olduğu bir coğrafyayı yansıtır.",
                "Yazılı kayıtlar bu tür aile adlarının izini sürmeyi kolaylaştırdı. Trento Konsili 1563'te Katolik cemaatlerine vaftiz ve evlilik kayıtlarını tutma zorunluluğu getirirken, sonraki sivil sistemler kalıtsal soyadlarını daha sıkı biçimde standartlaştırdı. Bu soyadını taşıyan önemli kişilerden biri, 1875-1878 yıllarında Osmanlı yönetimine karşı gerçekleşen Hersek Ayaklanması'nın önderlerinden Katolik rahip ve voyvoda Don Ivan Musić'ti. Bu ayaklanma, daha geniş Doğu Krizi'nin bir parçası hâline geldi."
            ]
        },
        given: {
            meta: "Ad · Eve uzanan bir çizgi",
            blocks: [
                "Lovro, Latince Laurentius'tan türeyen geniş Avrupa ad ailesinin Hırvatça ve Slovence biçimidir. Laurentius kelimesi kelimesine “Laurentumlu kişi” anlamına geliyordu; Laurentum, Roma yakınlarında antik bir kentti. Kentin adı geleneksel olarak Latince defne anlamındaki laurus sözcüğüyle ilişkilendirildi; böylece ad zamanla “defneyle taçlandırılmış” biçimindeki tanıdık anlamını kazandı.",
                "Her dem yeşil defne, Laurus nobilis, hem yararlı hem de simgeseldi. Yaprakları yemeklerde ve tıpta kullanılırken, Yunan ve Roma çelenkleri spor galiplerini, askerî başarıları, şairleri ve kamusal başarıları onurlandırıyordu. Bu simgecilik, İngilizcedeki “laureate” sözcüğünde ve “resting on one's laurels” deyiminde yaşamayı sürdürüyor: Bitki, emekle kazanılmış ve toplumca tanınmış seçkinliğin kısa bir ifadesine dönüştü.",
                "Adın Avrupa'ya yayılmasında Romalı Aziz Laurentius belirleyici oldu. Laurentius, kilisenin hayır işlerinden ve yoksullara yardımdan sorumlu bir diyakozdu; İmparator Valerianus'un 258 yılındaki zulmü sırasında şehit edildi. Latince Laurentius daha sonra Lawrence, Laurent, Lorenzo, Lorenz, Lovre ve Lovro gibi bölgesel biçimlere dönüştü. Benim ailemde de Lovro, büyükbabam ve daha önceki kuşaklar aracılığıyla aktarıldı; böylece bu geniş tarih doğrudan bir aile geleneğiyle birleşti."
            ]
        },
        evolvesInto: " biçimine dönüşür: ",
        footer: "Söylemesi kolay. Geldiğim yerden ayırmak imkânsız."
    }
}

function ArticleNameOrigins({ dataWrapper }) {
    const language = useLanguage()
    const useInteractiveStories = useInteractiveStoryText()
    const copy = COPY[language.selectedLanguageId] || COPY.en
    const stories = STORY_IDENTITIES.map(story => ({...story, ...copy[story.id]}))

    return (
        <Article id={dataWrapper.uniqueId} type={Article.Types.SPACING_SMALL}
                 dataWrapper={dataWrapper} className="article-name-origins" forceHideTitle={true}>
            <div className="article-name-origins-panel">
                {stories.map((story, index) => (
                    <NameOrigin key={story.id} story={story} index={index}
                                evolvesInto={copy.evolvesInto}
                                useInteractiveStories={useInteractiveStories}/>
                ))}
                <footer><span/>{copy.footer}</footer>
            </div>
        </Article>
    )
}

function NameOrigin({ story, index, evolvesInto, useInteractiveStories }) {
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
                <div className="name-origin-lineage" aria-label={story.trail.join(evolvesInto)}>
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
