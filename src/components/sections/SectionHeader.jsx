import "./SectionHeader.scss"
import React, {useLayoutEffect, useRef} from 'react'
import {useParser} from "../../hooks/parser.js"

function SectionHeader({ section }) {
    const parser = useParser()

    const parsedTitle = parser.parseSectionTitle(section)
    const isHomeSection = section?.id === "about"

    const headerRef = useRef(null)
    useLayoutEffect(() => {
        if (!isHomeSection) return
        const header = headerRef.current
        let disposed = false
        const fit = () => {
            if (disposed || !header.clientWidth) return
            const available = Math.max(1, header.clientWidth - 2)
            for (const line of header.children) {
                line.style.removeProperty("font-size")
                for (let attempt = 0; attempt < 3; attempt++) {
                    const width = line.scrollWidth
                    if (width <= available) break
                    const size = parseFloat(getComputedStyle(line).fontSize)
                    line.style.setProperty("font-size", (size * available / width * 0.99) + "px", "important")
                }
            }
        }
        const observer = new ResizeObserver(fit)
        observer.observe(header)
        document.fonts.ready.then(fit)
        fit()
        return () => { disposed = true; observer.disconnect() }
    }, [isHomeSection, parsedTitle.prefix, parsedTitle.title])

    return (
        <header ref={headerRef} className={`section-header ${isHomeSection ? "section-header-home" : ""}`}>
            {parsedTitle.prefix && (
                <div className={`section-header-prefix`}>
                    <i className={`fa-solid fa-cubes`}/>
                    <span dangerouslySetInnerHTML={{__html: parsedTitle.prefix}}/>
                </div>
            )}

            <h2 className={`section-header-title`}
                dangerouslySetInnerHTML={{__html: parsedTitle.title}}/>
        </header>
    )
}

export default SectionHeader
