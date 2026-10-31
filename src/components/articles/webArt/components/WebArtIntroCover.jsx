import React from 'react'

function _renderGuideLineContent(line) {
    if(!Array.isArray(line)) return line

    return line.map((fragment, index) => {
        const toneClass = fragment?.tone ? ` article-web-art-intro-guide-fragment-${fragment.tone}` : ""
        return (
            <span key={`${fragment?.text || "fragment"}-${index}`}
                  className={`article-web-art-intro-guide-fragment${toneClass}`}>
                {fragment?.text}
            </span>
        )
    })
}

export default function WebArtIntroCover({
    guide,
    buttonLabel,
    hidden,
    onEnter,
    secondaryButtonLabel = null,
    onSecondaryAction = null,
    secondaryPressed = false
}) {
    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onEnter()
        }
    }

    return (
        <div className={`article-web-art-intro-cover ${hidden ? "article-web-art-intro-cover-hidden" : "article-web-art-intro-cover-open"}`}>
            <div className={`article-web-art-intro-cover-inner`}>
                <div className={`article-web-art-intro-cover-actions`}>
                    <div className={`article-web-art-intro-guide ${hidden ? "article-web-art-intro-guide-hidden" : "article-web-art-intro-guide-open"}`}>
                        <div className={`article-web-art-intro-guide-inner`}>
                            <div className={`article-web-art-intro-guide-top-row`}>
                                <div className={`article-web-art-intro-guide-lines`}>
                                    {guide.lines.slice(1).map((line, index) => {
                                        return (
                                            <p key={Array.isArray(line) ? line.map((fragment) => fragment?.text).join("") : line}
                                               className={`article-web-art-intro-guide-line article-web-art-intro-guide-line-${index + 2}`}>
                                                {_renderGuideLineContent(line)}
                                            </p>
                                        )
                                    })}
                                </div>

                                <div className={`article-web-art-intro-cover-buttons`}>
                                    {secondaryButtonLabel ? (
                                        <button type={"button"}
                                                className={`article-web-art-intro-cover-button article-web-art-intro-cover-button-secondary ${secondaryPressed ? "article-web-art-intro-cover-button-secondary-active" : ""}`}
                                                onClick={onSecondaryAction || undefined}
                                                aria-pressed={secondaryPressed}
                                                aria-label={secondaryButtonLabel}>
                                            {secondaryButtonLabel}
                                        </button>
                                    ) : null}

                                    <button type={"button"}
                                            className={`article-web-art-intro-cover-button article-web-art-intro-cover-button-primary`}
                                            onClick={onEnter}
                                            onKeyDown={onKeyDown}
                                            aria-label={buttonLabel}>
                                        <span className={`article-web-art-intro-glass-layer article-web-art-intro-glass-layer-blur`}
                                              aria-hidden={`true`}/>
                                        <span className={`article-web-art-intro-glass-layer article-web-art-intro-glass-layer-rim`}
                                              aria-hidden={`true`}/>
                                        <span className={`article-web-art-intro-cover-button-text`}>{buttonLabel}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
