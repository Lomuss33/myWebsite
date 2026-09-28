import "./Layout.scss"
import React from 'react'
import LayoutSaltShaker from "./LayoutSaltShaker.jsx"

function Layout({ id, children }) {
    return (
        <div id={id}
             className={`layout`}>
            <LayoutSaltShaker/>

            <div className={`layout-content`}>
                {children}
            </div>
        </div>
    )
}

export default Layout
