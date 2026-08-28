import "./NavLinkPillsFixed.scss"
import React from 'react'
import NavLinkPills from "./NavLinkPills.jsx"

function NavLinkPillsFixed({ links, className = "", id = "nav-link-pills-fixed", sticky = true }) {
    const hasNavigationLinks = links.length >= 2

    return (
        <div className={`nav-link-pills-sticky-slot nav-link-pills-sticky-slot-${sticky ? "sticky" : "static"}`}>
            <div className={`nav-link-pills-fixed-wrapper nav-link-pills-fixed-wrapper-${hasNavigationLinks ? "shown" : "hidden"}`}>
                {hasNavigationLinks ? (
                    <NavLinkPills id={id}
                                  className={`nav-link-pills-mobile ${className}`.trim()}
                                  links={links}/>
                ) : (
                    <div className={`nav-link-pills-placeholder`}
                         aria-hidden={true}>
                        <span className={`nav-link-pills-placeholder-line`}/>
                        <span className={`nav-link-pills-placeholder-mark`}/>
                        <span className={`nav-link-pills-placeholder-line nav-link-pills-placeholder-line-reverse`}/>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavLinkPillsFixed
