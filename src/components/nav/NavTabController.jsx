import "./NavTabController.scss"
import React from 'react'
import Nav from "./base/Nav.jsx"
import GestureAwareButton from "../buttons/GestureAwareButton.jsx"

function NavTabController({ links }) {
    return (
        <div className={`nav-tab-controller-wrapper`}>
            <Nav links={links}
                 data={null}
                 tag={`nav-tab-controller`}
                 className={`nav-tab-controller`}
                 itemComponent={NavTabControllerLink}/>
        </div>
    )
}

function NavTabControllerLink({ link, active, onClick }) {
    const activeClass = active ?
        `nav-tab-controller-link-active` :
        ``

    return (
        <GestureAwareButton className={`nav-tab-controller-link ${activeClass}`}
                            ariaPressed={active}
                            onClick={onClick}>
            <i className={`${link.faIcon}`}/>
            <span dangerouslySetInnerHTML={{__html: link.label}}/>
        </GestureAwareButton>
    )
}

export default NavTabController
