import {useLayoutEffect} from 'react'

// Observe the allocated rail, never the card we resize: no resize feedback loop.
export function useSidebarProfileLayout(wrapperRef, railMode, linkCount) {
    useLayoutEffect(() => {
        const rail = wrapperRef.current
        if(!rail || railMode !== 'extended') return
        const card = rail.querySelector('.nav-profile-card')
        const name = card?.querySelector('.nav-profile-card-name')
        if(!card || !name) return
        let frame = 0
        let disposed = false
        const fit = () => {
            frame = 0
            const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
            const {width, height} = rail.getBoundingClientRect()
            const tools = Math.max(3.5 * rem, rail.querySelector('.nav-tools')?.getBoundingClientRect().height || 0)
            const budget = Math.max(0, Math.min(30 * rem, height * .25, height - linkCount * 2.75 * rem - tools - 12))
            rail.style.setProperty('--nav-extended-profile-height', `${budget}px`)
            card.dataset.profileLayout = 'compact'
            const header = card.querySelector('.nav-profile-card-header')
            const fits = () => {
                const box = header.getBoundingClientRect()
                const parts = [...header.querySelectorAll('.nav-profile-card-media, .nav-profile-card-info, .nav-profile-card-desktop-action-stack, .nav-profile-card-role')]
                    .filter(e => e.getClientRects().length && getComputedStyle(e).display !== 'none')
                const rects = parts.map(e => e.getBoundingClientRect()).filter(r => r.width && r.height)
                const inside = rects.every(r => r.left >= box.left - 1 && r.right <= box.right + 1 && r.top >= box.top - 1 && r.bottom <= box.bottom + 1)
                const separate = rects.every((a,i) => rects.slice(i+1).every(b => Math.min(a.right,b.right)-Math.max(a.left,b.left) <= 1 || Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top) <= 1))
                return inside && separate && name.scrollWidth <= name.clientWidth + 1 && name.scrollHeight <= name.clientHeight + 1
            }
            let chosen = 'hidden'
            if(width >= 7 * rem && budget >= 7.25 * rem) {
                const candidates = budget >= 20 * rem
                    ? ['stacked-column-role','stacked-role','paired-role','stacked','paired','compact-role','compact']
                    : budget >= 12.5 * rem
                        ? ['stacked-role','paired-role','stacked','paired','compact-role','compact']
                        : ['paired-role','paired','compact-role','compact']
                for(const candidate of candidates) {
                    card.dataset.profileLayout = candidate
                    if(fits()) { chosen = candidate; break }
                }
            }
            card.dataset.profileLayout = chosen
            if(chosen === 'hidden') rail.style.setProperty('--nav-extended-profile-height', '0px')
            rail.style.setProperty('--nav-sidebar-toggle-top', chosen === 'hidden' ? '8px' : `${Math.max(8,budget-16)}px`)
        }
        const schedule = () => { if(!disposed && !frame) frame = requestAnimationFrame(fit) }
        const resize = new ResizeObserver(schedule)
        resize.observe(rail)
        const text = new MutationObserver(schedule)
        text.observe(name, {childList:true, characterData:true, subtree:true})
        const root = new MutationObserver(schedule)
        root.observe(document.documentElement, {attributes:true, attributeFilter:['style','class']})
        document.fonts?.ready.then(schedule)
        document.fonts?.addEventListener('loadingdone', schedule)
        fit()
        return () => {
            disposed = true
            cancelAnimationFrame(frame)
            resize.disconnect()
            text.disconnect()
            root.disconnect()
            document.fonts?.removeEventListener('loadingdone', schedule)
            delete card.dataset.profileLayout
            rail.style.removeProperty('--nav-extended-profile-height')
            rail.style.removeProperty('--nav-sidebar-toggle-top')
        }
    }, [wrapperRef, railMode, linkCount])
}
