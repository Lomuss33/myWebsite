import React from 'react'
import EducationDecorationCanvas from "./education/EducationDecorationCanvas.jsx"
import ExperienceDecorationCanvas from "./experience/ExperienceDecorationCanvas.jsx"
import HardwareDecorationCanvas from "./hardware/HardwareDecorationCanvas.jsx"
import SoftwareDecorationCanvases from "./software/SoftwareDecorationCanvases.jsx"
import WritingDecorationSvg from "./writing/WritingDecorationSvg.jsx"

function shouldThrottleDecorationsForPerformance() {
    if(typeof window === "undefined")
        return false

    const saveData = navigator?.connection?.saveData === true
    const lowPerfClass = document?.documentElement?.classList?.contains("low-perf") === true
    const lowCoreCount = (navigator?.hardwareConcurrency || 8) <= 4

    return saveData || lowPerfClass || lowCoreCount
}

function SectionDecorationLayer({ section }) {
    const lowFrameRateMode = shouldThrottleDecorationsForPerformance()

    if(section?.id === "education")
        return <EducationDecorationCanvas lowFrameRateMode={lowFrameRateMode}/>

    if(section?.id === "experience")
        return <ExperienceDecorationCanvas lowFrameRateMode={lowFrameRateMode}/>

    if(section?.id === "my-hardware")
        return <HardwareDecorationCanvas lowFrameRateMode={lowFrameRateMode}/>

    if(section?.id === "my-software")
        return <SoftwareDecorationCanvases lowFrameRateMode={lowFrameRateMode}/>

    if(section?.id === "my-writings")
        return <WritingDecorationSvg lowFrameRateMode={lowFrameRateMode}/>

    return null
}

export default SectionDecorationLayer
