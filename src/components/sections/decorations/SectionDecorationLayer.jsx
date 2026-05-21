import React from 'react'
import SoftwareDecorationCanvases from "./software/SoftwareDecorationCanvases.jsx"

function SectionDecorationLayer({ section }) {
    if(section?.id === "my-software")
        return <SoftwareDecorationCanvases/>

    return null
}

export default SectionDecorationLayer
