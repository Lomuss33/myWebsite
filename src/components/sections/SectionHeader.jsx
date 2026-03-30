import "./SectionHeader.scss"
import React from 'react'
import {useParser} from "../../hooks/parser.js"

function SectionHeader({ section }) {
    const parser = useParser()

    const parsedTitle = parser.parseSectionTitle(section)

    return (
        <header className={`section-header`}>
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
