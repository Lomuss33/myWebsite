import React from 'react'
import EducationDecorationCanvas from "./education/EducationDecorationCanvas.jsx"
import ExperienceDecorationCanvas from "./experience/ExperienceDecorationCanvas.jsx"
import ArtDecorationCanvas from "./art/ArtDecorationCanvas.jsx"
import HardwareDecorationCanvas from "./hardware/HardwareDecorationCanvas.jsx"
import SoftwareDecorationCanvases from "./software/SoftwareDecorationCanvases.jsx"
import WritingDecorationSvg from "./writing/WritingDecorationSvg.jsx"

function SectionDecorationLayer({ section }) {
    if(section?.id === "education")
        return <EducationDecorationCanvas/>

    if(section?.id === "experience")
        return <ExperienceDecorationCanvas/>

    if(section?.id === "my-art")
        return <ArtDecorationCanvas/>

    if(section?.id === "my-hardware")
        return <HardwareDecorationCanvas/>

    if(section?.id === "my-software")
        return <SoftwareDecorationCanvases/>

    if(section?.id === "my-writings")
        return <WritingDecorationSvg/>

    return null
}

export default SectionDecorationLayer
