import React from 'react'
import EducationDecorationCanvas from "./education/EducationDecorationCanvas.jsx"
import ExperienceDecorationCanvas from "./experience/ExperienceDecorationCanvas.jsx"
import HardwareDecorationCanvas from "./hardware/HardwareDecorationCanvas.jsx"
import SoftwareDecorationCanvases from "./software/SoftwareDecorationCanvases.jsx"
import WritingDecorationSvg from "./writing/WritingDecorationSvg.jsx"

function shouldSkipDecorationsForPerformance() {
    if(typeof window === "undefined")
        return false

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true
    const saveData = navigator?.connection?.saveData === true
    const lowPerfClass = document?.documentElement?.classList?.contains("low-perf") === true
    const lowCoreCount = (navigator?.hardwareConcurrency || 8) <= 4

    return reducedMotion || saveData || lowPerfClass || lowCoreCount
}

function SectionDecorationLayer({ section }) {
    if(shouldSkipDecorationsForPerformance())
        return null

    if(section?.id === "education")
        return <EducationDecorationCanvas/>

    if(section?.id === "experience")
        return <ExperienceDecorationCanvas/>

    if(section?.id === "my-hardware")
        return <HardwareDecorationCanvas/>

    if(section?.id === "my-software")
        return <SoftwareDecorationCanvases/>

    if(section?.id === "my-writings")
        return <WritingDecorationSvg/>

    return null
}

export default SectionDecorationLayer
