import React from 'react'
import SoftwareSectionDecorationCanvas from "./software/SoftwareSectionDecorationCanvas.jsx"
import SoftwareBottomShaderCanvas from "./software/SoftwareBottomShaderCanvas.jsx"

function SectionDecorationLayer({ section }) {
    if(section?.id === "my-software")
        return (
            <>
                <SoftwareSectionDecorationCanvas/>
                <SoftwareBottomShaderCanvas/>
            </>
        )

    return null
}

export default SectionDecorationLayer
