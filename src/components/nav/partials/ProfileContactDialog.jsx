import React, {useCallback, useEffect, useId, useLayoutEffect, useRef} from "react"
import {createPortal} from "react-dom"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import "./ProfileContactDialog.scss"

export default function ProfileContactDialog({profile, onClose}) {
    const dialogRef = useRef(null)
    const cardRef = useRef(null)
    const timerRef = useRef(null)
    const titleId = useId()
    const language = useLanguage()
    const contact = profile.contactCard
    const label = (key) => language.getTranslation(profile.locales, `contact_${key}`)
    const restartTimer = useCallback(() => {
        window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(onClose, 10000)
    }, [onClose])

    useEffect(() => {
        const dialog = dialogRef.current
        const trigger = document.activeElement
        dialog.showModal()
        restartTimer()
        return () => {
            window.clearTimeout(timerRef.current)
            dialog.close()
            if(trigger?.isConnected) trigger.focus({preventScroll: true})
        }
    }, [restartTimer])

    useLayoutEffect(() => {
        const dialog = dialogRef.current
        const card = cardRef.current
        const fitCard = () => {
            const viewport = window.visualViewport
            const width = viewport?.width || window.innerWidth
            const height = viewport?.height || window.innerHeight
            const naturalWidth = Math.max(1, Math.min(512, width - 34))
            card.style.width = `${naturalWidth}px`
            const scale = Math.min(1, Math.max(1, height - 34) / Math.max(1, card.offsetHeight))
            card.style.zoom = String(scale)
            dialog.style.width = `${naturalWidth * scale + 2}px`
        }
        const observer = new ResizeObserver(fitCard)
        observer.observe(card)
        window.addEventListener('resize', fitCard)
        window.visualViewport?.addEventListener('resize', fitCard)
        fitCard()
        return () => {
            observer.disconnect()
            window.removeEventListener('resize', fitCard)
            window.visualViewport?.removeEventListener('resize', fitCard)
        }
    }, [])

    return createPortal(
        <dialog ref={dialogRef} className="profile-contact-dialog" aria-labelledby={titleId}
                onCancel={(event) => { event.preventDefault(); onClose() }}
                onClick={(event) => {
                    if(event.target === event.currentTarget) onClose()
                }}>
            <div ref={cardRef} className="profile-contact-card" onClick={restartTimer} onKeyDown={restartTimer}>
                <div className="profile-contact-cover" style={{backgroundImage: `url("${contact.coverUrl}")`}} />
                <button className="profile-contact-close" type="button" aria-label={label('close')} onClick={onClose}>×</button>
                <div className="profile-contact-content">
                    <a className="profile-contact-portrait" href={contact.profileUrl} target="_blank" rel="noopener noreferrer" onClick={onClose} aria-label={`${profile.name} · Gravatar`}>
                        <img src={contact.avatarUrl} alt={profile.name} width="104" height="104"
                             onError={(event) => {
                                 const img = event.currentTarget
                                 if(img.dataset.fallback) return
                                 img.dataset.fallback = 'true'
                                 img.src = language.parseJsonText(profile.profilePictureUrl)
                             }} />
                    </a>
                    <p className="profile-contact-eyebrow">{label('title')}</p>
                    <h2 id={titleId}>{profile.name}</h2>
                    <p className="profile-contact-job">{label('job')}</p>
                    <p className="profile-contact-location"><i className="fa-solid fa-location-dot" aria-hidden="true" /> {contact.location}</p>
                    <p className="profile-contact-description">{label('description')}</p>
                    <div className="profile-contact-links">
                        {contact.links.map(({name, url, icon}) => (
                            <a key={name} href={url} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                                <img src={icon} alt="" width="24" height="24" />
                                <span>{name}</span><span aria-hidden="true">↗︎</span>
                            </a>
                        ))}
                    </div>
                    <a className="profile-contact-primary" href={contact.profileUrl} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                        {label('view_profile')} <span aria-hidden="true">↗︎</span>
                    </a>
                </div>
            </div>
        </dialog>, document.body
    )
}
