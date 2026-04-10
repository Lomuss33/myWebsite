import "./SectionContent.scss"
import React from 'react'
import SectionHeader from "./SectionHeader.jsx"
import SectionBody from "./SectionBody.jsx"

function SectionContent({ section }) {
    return (
        <div className={`section-content`}>
            <div className={`section-content-border-decoration section-content-border-decoration-top-left`}/>

            <div className={`section-content-elements-wrapper`}>
                <SectionHeader section={section}/>
                <SectionBody section={section}/>
            </div>
        </div>
    )
}

export default SectionContent
