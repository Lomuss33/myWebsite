import "./LayoutNavigation.scss"
import React from 'react'
import LayoutBufferGarden from "./LayoutBufferGarden.jsx"
import NavSidebar from "../nav/NavSidebar.jsx"
import NavTabController from "../nav/NavTabController.jsx"
import NavHeaderMobile from "../nav/NavHeaderMobile.jsx"
import NavLinkPillsFixed from "../nav/partials/NavLinkPillsFixed.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"

function LayoutNavigation({ children, profile = null, sectionLinks = [], categoryLinks = [] }) {
    const viewport = useViewport()

    const isNavigationMobileLayout = viewport.isMobileLayout()
    const targetCategoryId = categoryLinks.find(link => link.active)?.id
    const currentCategorySectionLinks = sectionLinks.filter(link => link.categoryId === targetCategoryId)
    const isOverviewCategory = targetCategoryId === "home" || targetCategoryId === "contact"
    const overviewSectionLinks = sectionLinks.filter(link =>
        link.categoryId !== "home" && link.categoryId !== "contact"
    )
    const mobilePillLinks = isOverviewCategory ? overviewSectionLinks : currentCategorySectionLinks
    const mobilePillClassName = isOverviewCategory ? "nav-link-pills-overview" : ""

    return (
        <div className={`layout-navigation-wrapper`}>
            <LayoutBufferGarden />

            {!isNavigationMobileLayout && (
                <NavSidebar profile={profile}
                            links={sectionLinks}/>
            )}

            {isNavigationMobileLayout && (
                <>
                    <NavHeaderMobile profile={profile}/>
                    <NavLinkPillsFixed id={`nav-link-pills-menu`}
                                       className={mobilePillClassName}
                                       sticky={!isOverviewCategory}
                                       links={mobilePillLinks}/>
                </>
            )}

            <div className={`layout-navigation-children-wrapper`}>
                <div className={`layout-navigation-children-inner`}>
                    {children}
                </div>
            </div>

            {isNavigationMobileLayout && (
                <NavTabController links={categoryLinks}/>
            )}
        </div>
    )
}

export default LayoutNavigation
