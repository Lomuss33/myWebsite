import {test, expect} from '@playwright/test'

test('profile reflows inside its allocated box and yields to navigation', async ({page}) => {
    await page.setViewportSize({width:1366,height:768})
    await page.goto('/#my-software')
    const rail=page.locator('.nav-sidebar-extended .nav-sidebar-card-wrapper')
    await expect(rail).toBeVisible()
    const states=new Set()
    for(const [width,height] of [[191,583],[191,620],[288,1200],[288,1440],[288,1920],[180,900],[340,700],[180,480],[130,768],[100,900],[288,300],[288,1440]]) {
        await rail.evaluate((e,{width,height})=>{
            e.style.setProperty('width',width+'px','important')
            e.style.setProperty('min-width',width+'px','important')
            e.style.setProperty('height',height+'px','important')
        },{width,height})
        await page.waitForTimeout(200)
        if(height<=480||width<112) await expect(rail.locator(".nav-profile-card")).toHaveAttribute("data-profile-layout","hidden")
        if(width===288 && height>=1200) {
            await expect(rail.locator('.nav-profile-card')).toHaveAttribute('data-profile-layout',height>=1440?'stacked-column-role':'stacked-role')
            await expect(rail.locator('.nav-profile-card-role')).toBeVisible()
            const shape=await rail.locator('.nav-profile-card-media').boundingBox()
            expect(Math.abs(shape.width-shape.height)).toBeLessThan(2)
        }
        const result=await rail.evaluate(e=>{
            const card=e.querySelector('.nav-profile-card')
            const box=card.getBoundingClientRect()
            const parts=[...card.querySelectorAll('.nav-profile-card-media,.nav-profile-card-info,.nav-profile-card-desktop-action-stack,.nav-profile-card-role')].map(n=>n.getBoundingClientRect()).filter(r=>r.width&&r.height)
            return {
                state:card.dataset.profileLayout,
                inside:parts.every(r=>r.left>=box.left-1&&r.right<=box.right+1&&r.top>=box.top-1&&r.bottom<=box.bottom+1),
                separate:parts.every((a,i)=>parts.slice(i+1).every(b=>Math.min(a.right,b.right)-Math.max(a.left,b.left)<=1||Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)<=1)),
                buttons:[...e.querySelectorAll('button.nav-link')].map(n=>n.getBoundingClientRect().height)
            }
        })
        states.add(result.state)
        expect(result.inside,`${width}x${height} containment`).toBe(true)
        expect(result.separate,`${width}x${height} overlap`).toBe(true)
        for(const h of result.buttons) expect(h).toBeGreaterThanOrEqual(43.5)
        if(height<=480||width<112) expect(result.state).toBe('hidden')
    }
    expect(states.has('hidden')).toBe(true)
    expect(states.size).toBeGreaterThanOrEqual(3)
})
