import "./LayoutNavigation.scss"
import React from 'react'
import NavSidebar from "../nav/NavSidebar.jsx"
import NavTabController from "../nav/NavTabController.jsx"
import NavHeaderMobile from "../nav/NavHeaderMobile.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"

function LayoutNavigation({ children, profile = null, sectionLinks = [], categoryLinks = [] }) {
    const viewport = useViewport()

    const isMobileLayout = viewport.isMobileLayout()
    const targetCategoryId = categoryLinks.find(link => link.active)?.id
    const currentCategorySectionLinks = sectionLinks.filter(link => link.categoryId === targetCategoryId)

    return (
        <div className={`layout-navigation-wrapper`}>
            {!isMobileLayout && (
                <NavSidebar profile={profile}
                            links={sectionLinks}/>
            )}

            {isMobileLayout && (
                <>
                    <NavHeaderMobile profile={profile}
                                     links={currentCategorySectionLinks}/>
                </>
            )}

            <div className={`layout-navigation-children-wrapper`}>
                {children}
            </div>

            {isMobileLayout && (
                <NavTabController links={categoryLinks}/>
            )}
        </div>
    )
}

export default LayoutNavigation
