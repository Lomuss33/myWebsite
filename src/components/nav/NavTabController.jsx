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

function NavTabControllerLink({ link, active, data, onClick, onClickTimeout }) {
    const activeClass = active ?
        `nav-tab-controller-link-active` :
        ``

    return (
        <GestureAwareButton className={`nav-tab-controller-link ${activeClass}`}
                            onClick={onClick}>
            <i className={`${link.faIcon}`}/>
            <span dangerouslySetInnerHTML={{__html: link.label}}/>
        </GestureAwareButton>
    )
}

export default NavTabController
