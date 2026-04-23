import React, {useEffect, useState} from 'react'
import Layout from "./layout/Layout.jsx"
import {useData} from "../providers/DataProvider.jsx"
import {useLanguage} from "../providers/LanguageProvider.jsx"
import {useLocation} from "../providers/LocationProvider.jsx"
import {useNavigation} from "../providers/NavigationProvider.jsx"
import LayoutNavigation from "./layout/LayoutNavigation.jsx"
import LayoutImageCache from "./layout/LayoutImageCache.jsx"
import LayoutSlideshow from "./layout/LayoutSlideshow.jsx"

function Portfolio() {
    const data = useData()
    const language = useLanguage()
    const location = useLocation()
    const navigation = useNavigation()

    useEffect(() => {
        if(typeof window === "undefined") return
        if(navigator?.connection?.saveData) return

        const prefetch = () => {
            void import("./articles/webArt/threeTunnelEngine.js")
            void import("./articles/webArt/threePolygonDemo5Engine.js")
        }

        if("requestIdleCallback" in window) {
            const id = window.requestIdleCallback(prefetch, { timeout: 2500 })
            return () => window.cancelIdleCallback(id)
        }

        const id = window.setTimeout(prefetch, 1500)
        return () => window.clearTimeout(id)
    }, [])

    if(!data || !language || !location || !navigation) {
        window.location.reload()
        return
    }

    const profile = data.getProfile()
    const settings = data.getSettings()
    const sections = data.getSections()

    const backgroundStyle = settings?.templateSettings?.backgroundStyle || "plain"

    const currentSection = navigation.targetSection
    const previousSection = navigation.previousSection
    const sectionLinks = navigation.sectionLinks
    const categoryLinks = navigation.categoryLinks

    return (
        <Layout id={"react-portfolio"}
                backgroundStyle={backgroundStyle}>
            <LayoutImageCache profile={profile}
                              settings={settings}
                              sections={sections}/>

            <LayoutNavigation profile={profile}
                              sectionLinks={sectionLinks}
                              categoryLinks={categoryLinks}>
                <LayoutSlideshow sections={sections}
                                 currentSection={currentSection}
                                 previousSection={previousSection}/>
            </LayoutNavigation>
        </Layout>
    )
}

export default Portfolio
