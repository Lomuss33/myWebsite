import "./ArticleStack.scss"
import React, {useEffect, useState} from 'react'
import Article from "./base/Article.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import Transitionable from "../capabilities/Transitionable.jsx"
import Link from "../generic/Link.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useTheme} from "../../providers/ThemeProvider.jsx"

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
    const isSoftwareStack = dataWrapper.sectionId === "my-software"
    const homeClass = isHomeStack ? `article-stack-home` : ``
    const compactClass = isCompactStack ? `article-stack-compact` : ``

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-stack ${homeClass} ${compactClass}`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}
                 categoryFilterTitleStringKey={isSoftwareStack ? "software_hall_of_fame_title" : null}>
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
    const refreshFlag = selectedItemCategoryId + "::" + language.getSelectedLanguage()?.id + "-" + theme.getSelectedTheme()?.id
    const homeClass = isHomeStack ? `article-stack-items-home` : ``
    const compactClass = isCompactStack ? `article-stack-items-compact` : ``

    if(dataWrapper.categories?.length) {
        return (
            <Transitionable id={dataWrapper.uniqueId}
                            refreshFlag={refreshFlag}
                            delayBetweenItems={30}
                            animation={Transitionable.Animations.POP}
                            className={`article-stack-items ${homeClass} ${compactClass}`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticleStackItem itemWrapper={itemWrapper}
                                      isHomeStack={isHomeStack}
                                      isCompactStack={isCompactStack}
                                      key={key}/>
                ))}
            </Transitionable>
        )
    }
    else {
        return (
            <div className={`article-stack-items ${homeClass} ${compactClass}`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticleStackItem itemWrapper={itemWrapper}
                                      isHomeStack={isHomeStack}
                                      isCompactStack={isCompactStack}
                                      key={key}/>
                ))}
            </div>
        )
    }
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleStackItem({ itemWrapper, isHomeStack, isCompactStack }) {
    const title = itemWrapper.locales.title || itemWrapper.placeholder
    const segmentedTitle = _splitTitle(title)
    const homeClass = isHomeStack ? `article-stack-item-home` : ``
    const compactClass = isCompactStack ? `article-stack-item-compact` : ``
    const linkHref = itemWrapper.link?.href
    const linkTooltip = itemWrapper.link?.tooltip
    const isSoftwareStack = itemWrapper?.articleWrapper?.sectionId === "my-software"
    const emojiIconText = isSoftwareStack ?
        (itemWrapper.iconText || _emojiForSoftwareStack(title, itemWrapper.categoryId)) :
        itemWrapper.iconText

    const content = (
        <div className={`article-stack-item ${homeClass} ${compactClass}`}>
            <AvatarView src={itemWrapper.img}
                        faIcon={itemWrapper.faIconWithFallback}
                        iconText={emojiIconText}
                        style={itemWrapper.faIconStyle}
                        alt={itemWrapper.imageAlt}
                        className={`article-stack-item-avatar`}/>

            <div className={`article-stack-item-title`}>
                {segmentedTitle.prefix && (
                    <div className={`article-stack-item-title-prefix`}
                         dangerouslySetInnerHTML={{__html: segmentedTitle.prefix}}/>
                )}

                <div className={`article-stack-item-title-main`}
                     dangerouslySetInnerHTML={{__html: segmentedTitle.value}}/>
            </div>

            {itemWrapper.dateStartDisplayAsExperienceTime && (
                <div className={`article-stack-item-experience`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.dateStartDisplayAsExperienceTime}}/>
            )}

            {itemWrapper.locales.text && (
                <div className={`article-stack-item-experience`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
            )}
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

    return (
        content
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

function _emojiForSoftwareStack(rawTitle, categoryId) {
    const title = String(rawTitle || "").trim()
    const t = title.toLowerCase()

    // ---- High-confidence exact/keyword picks (fun + accurate) ----
    // Version control / dev
    if (t === "git") return "🔧"
    if (t.includes("github")) return "🐙"
    if (t.includes("gitlab")) return "🦊"

    // Editors / IDE
    if (t.includes("vs code") || t.includes("vscode")) return "🧩"
    if (t.includes("visual studio")) return "🟪"
    if (t.includes("intellij")) return "🧠"
    if (t.includes("pycharm")) return "🐍"

    // Shell / terminal
    if (t.includes("bash") || t.includes("zsh") || t.includes("terminal") || t.includes("powershell")) return "⌨️"

    // Containers / orchestration
    if (t.includes("docker")) return "🐳"
    if (t.includes("kubernetes") || t === "k8s") return "☸️"
    if (t.includes("helm")) return "⛵"

    // OS
    if (t.includes("linux")) return "🐧"
    if (t.includes("windows")) return "🪟"
    if (t.includes("android")) return "🤖"

    // Browsers
    if (t.includes("firefox")) return "🦊"
    if (t.includes("chrome")) return "🌐"
    if (t.includes("edge")) return "🌊"

    // Networking & security tools
    if (t.includes("wireshark")) return "🦈"
    if (t.includes("tcpdump")) return "🕵️"
    if (t.includes("ssh")) return "🔐"
    if (t.includes("tailscale")) return "🪢"
    if (t.includes("tailscale")) return "🪢"
    if (t.includes("owasp") || t.includes("zap")) return "🕷️"

    // Passwords / secrets
    if (t.includes("bitwarden")) return "🔑"
    if (t.includes("keepass")) return "🗝️"
    if (t.includes("vault")) return "🔒"

    // Web / infra / cloud
    if (t.includes("cloudflare")) return "☁️"
    if (t.includes("nginx")) return "🧱"
    if (t.includes("proxy")) return "🛰️"
    if (t.includes("vps") || t.includes("server")) return "🖥️"
    if (t.includes("uptime")) return "⏱️"
    if (t.includes("ssh")) return "🔐"

    // Databases / data / messaging
    if (t.includes("postgres")) return "🐘"
    if (t.includes("mysql")) return "🐬"
    if (t.includes("redis")) return "🧠"
    if (t.includes("kafka")) return "📨"
    if (t.includes("dbt")) return "🧱"

    // Languages / frameworks
    if (t.includes("typescript")) return "🟦"
    if (t.includes("javascript")) return "🟨"
    if (t.includes("react")) return "⚛️"
    if (t.includes("next.js") || t === "nextjs" || t.includes("nextjs")) return "⬛"
    if (t.includes("node")) return "🟩"
    if (t.includes("rust")) return "🦀"
    if (t === "go" || t.includes("golang")) return "🐹"
    if (t.includes("python")) return "🐍"
    if (t.includes("java")) return "☕"
    if (t.includes("c#") || t.includes(".net")) return "🟪"

    // ---- Smarter fallback: wider pool, deterministic but less repetitive ----
    const fallbackPool = [
        "🧰","🛠️","🔩","⚙️","🧪","🧠","📦","🗂️","🗄️","💾",
        "🌐","📡","🛰️","🔌","🔋","🧱","🪛","🧷","📎","🧾",
        "🔍","🧭","🗺️","📈","📉","🧮","🧬","🧫","🧯","🧲",
        "🎛️","🎚️","🔔","🕰️","⏳","🪄","✨","⭐","💠","🔹",
        "🧿","🔺","🔻","▪️","▫️","🔸","🪙","🧵","🪡","🧶"
    ]
    const index = _hashToIndex(`${categoryId || ""}::${title}`, fallbackPool.length)
    return fallbackPool[index]
}

function _hashToIndex(input, modulo) {
    const text = String(input || "")
    let hash = 2166136261
    for (let i = 0; i < text.length; i++) {
        hash ^= text.charCodeAt(i)
        hash = Math.imul(hash, 16777619)
    }
    const unsigned = hash >>> 0
    return modulo ? (unsigned % modulo) : 0
}

export default ArticleStack
