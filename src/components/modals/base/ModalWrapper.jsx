import "./ModalWrapper.scss"
import React, {useEffect, useRef} from 'react'
import Modal from 'bootstrap/js/src/modal'
import CircularButton from "../../buttons/CircularButton.jsx"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {getViewportScrollPosition, useViewport} from "../../../providers/ViewportProvider.jsx"
import {useUtils} from "../../../hooks/utils.js"

function ModalWrapper({ children, id = "", shouldDismiss, onDismiss, className = "", dialogClassName = "" }) {
    const viewport = useViewport()
    const utils = useUtils()

    const elModalRef = useRef(null)
    const bsModalRef = useRef(null)
    const savedScrollYRef = useRef(null)
    const onDismissRef = useRef(onDismiss)

    useEffect(() => {
        onDismissRef.current = onDismiss
    }, [onDismiss])

    /** @constructs **/
    useEffect(() => {
        const elModal = document.getElementById(id)
        if(!elModal)
            return

        const config = {
            backdrop: onDismiss ? true : "static",
            keyboard: false
        }

        const bsModal = new Modal(elModal, config)
        elModalRef.current = elModal
        bsModalRef.current = bsModal

        elModal.addEventListener('hide.bs.modal', _onWillHide)
        elModal.addEventListener('hidden.bs.modal', _onHidden)
        bsModal.show()

        return () => {
            _dispose()
        }
    }, [id])

    /** @listens shouldDismiss - Scroll Adjustments **/
    useEffect(() => {
        if(!utils.device.isTouchDevice() || viewport.isDesktopLayout())
            return

        if(!shouldDismiss) {
            savedScrollYRef.current = getViewportScrollPosition().y
            utils.capabilities.scrollTo(0, false)
        }
        else {
            utils.capabilities.scrollTo(savedScrollYRef.current || 0, true)
        }
    }, [shouldDismiss])

    /** @listens shouldDismiss - Destroy Element **/
    useEffect(() => {
        if(!shouldDismiss)
            return

        bsModalRef.current?.hide()
    }, [shouldDismiss])

    const _dispose = () => {
        const elModal = elModalRef.current
        const bsModal = bsModalRef.current

        if(elModal) {
            elModal.removeEventListener('hide.bs.modal', _onWillHide)
            elModal.removeEventListener('hidden.bs.modal', _onHidden)
        }

        if(bsModal)
            bsModal.dispose()

        elModalRef.current = null
        bsModalRef.current = null
    }

    const _onWillHide = () => {
        if(!document.activeElement)
            return
        document.activeElement.blur()
    }

    const _onHidden = () => {
        _dispose()

        if(onDismissRef.current)
            onDismissRef.current()
    }

    return (
        <div id={id}
             className={`modal ${className}`}>
            <div className={`modal-dialog ${dialogClassName}`}>
                <div className={`modal-content`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

function ModalWrapperTitle({ title, faIcon, onClose, tooltip }) {
    const language = useLanguage()

    return (
        <div className={`modal-header`}>
            <h4 className={`modal-title fw-bold`}>
                <i className={`${faIcon} me-2 me-xl-3 text-primary`}/>
                <span dangerouslySetInnerHTML={{__html: title}}/>
            </h4>


            {onClose && (
                <CircularButton onClick={onClose}
                                faIcon={`fa-solid fa-xmark`}
                                size={CircularButton.Sizes.LARGE}
                                variant={CircularButton.Variants.DEFAULT}
                                tooltip={tooltip || language.getString("close_window")}/>
            )}
        </div>
    )
}

function ModalWrapperBody({ children, className }) {
    return (
        <div className={`modal-body ${className}`}>
            {children}
        </div>
    )
}

function ModalWrapperFooterDescription({ title, description, faIcon }) {
    return (
        <div className={`modal-footer`}>
            <h6 className={`modal-footer-title text-default`}>
                <i className={`${faIcon} text-primary me-2 eq-h5`}/>
                <span className={`fw-bold`} dangerouslySetInnerHTML={{__html: title}}/>
            </h6>

            <div className={`modal-footer-description text-1`}
                 dangerouslySetInnerHTML={{__html: description}}/>
        </div>
    )
}

export {ModalWrapper, ModalWrapperTitle, ModalWrapperBody, ModalWrapperFooterDescription}
