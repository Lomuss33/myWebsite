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
            card.style.setProperty('--profile-growth', budget >= 26 * rem ? '1.08' : '1')
            card.style.removeProperty('--avatar-size')
            rail.style.setProperty('--nav-extended-profile-height', `${budget}px`)
            card.dataset.profileLayout = 'compact'
            const header = card.querySelector('.nav-profile-card-header')
            const fits = () => {
                const box = header.getBoundingClientRect()
                const parts = [...header.querySelectorAll('.nav-profile-card-media, .nav-profile-card-info, .nav-profile-card-desktop-action-stack, .nav-profile-card-role')]
                    .filter(e => e.getClientRects().length && getComputedStyle(e).display !== 'none')
                const rects = parts.map(e => e.getBoundingClientRect()).filter(r => r.width && r.height)
                const inside = rects.every(r => r.left >= box.left - 0.1 && r.right <= box.right + 0.1 && r.top >= box.top - 0.1 && r.bottom <= box.bottom + 0.1)
                const separate = rects.every((a,i) => rects.slice(i+1).every(b => Math.min(a.right,b.right)-Math.max(a.left,b.left) <= 1 || Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top) <= 1))
                return inside && separate && name.scrollWidth <= name.clientWidth + 1 && name.scrollHeight <= name.clientHeight + 1
            }
            let chosen = 'hidden'
            if(width >= 4 * rem && budget >= 2.5 * rem) {
                const candidates = budget >= 20 * rem
                    ? ['stacked-column-role','stacked-role','paired-role','stacked','paired','compact-role','compact']
                    : budget >= 12.5 * rem
                        ? ['stacked-role','paired-role','stacked','paired','compact-role','compact']
                        : ['paired-role','paired','compact-role','compact']
                const paired = width >= 14 * rem ? ['paired-role','paired-column-role','paired','paired-column'] : ['paired-column-role','paired-role','paired-column','paired']
                const expanded = candidates.flatMap(candidate => candidate === 'paired-role' ? paired.slice(0,2) : candidate === 'paired' ? paired.slice(2) : [candidate])
                // Compact layouts form a strict progression as the height runs out.
                const layouts = [...expanded.filter(candidate => !candidate.startsWith('compact')), 'side-band', 'name-actions', 'name-only']
                for(const candidate of layouts) {
                    card.dataset.profileLayout = candidate
                    if(fits()) { chosen = candidate; break }
                }
            }
            card.dataset.profileLayout = chosen
            let usedHeight = 0
            if(chosen !== 'hidden') {
                // Freeze the selected portrait size before measuring intrinsic rows.
                // Otherwise cqh would shrink it again as the card gives space back.
                const avatar = card.querySelector('.nav-profile-card-avatar-switch')
                if(avatar?.getClientRects().length) card.style.setProperty('--avatar-size', getComputedStyle(avatar).width)
                header.style.height = 'auto'
                const chrome = getComputedStyle(card)
                const extra = ['paddingTop','paddingBottom','borderTopWidth','borderBottomWidth']
                    .reduce((sum,key) => sum + (parseFloat(chrome[key]) || 0), 0)
                usedHeight = Math.min(budget, Math.ceil(header.getBoundingClientRect().height + extra) + 1)
                header.style.removeProperty('height')
                rail.style.setProperty('--nav-extended-profile-height', usedHeight + 'px')
                // Keep the known-safe allocation if an intrinsic sizing edge case fails.
                if(!fits()) usedHeight = budget
            }
            rail.style.setProperty('--nav-extended-profile-height', usedHeight + 'px')
            const divider = rail.querySelector('.nav-link-list-shell')
            const dividerY = divider ? divider.getBoundingClientRect().top - rail.getBoundingClientRect().top + 2 : usedHeight
            rail.style.setProperty('--nav-sidebar-toggle-top', dividerY + 'px')
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
            card.style.removeProperty("--avatar-size")
            card.style.removeProperty("--profile-growth")
            delete card.dataset.profileLayout
            rail.style.removeProperty('--nav-extended-profile-height')
            rail.style.removeProperty('--nav-sidebar-toggle-top')
        }
    }, [wrapperRef, railMode, linkCount])
}
