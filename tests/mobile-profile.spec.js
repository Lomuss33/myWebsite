import {test,expect} from '@playwright/test'

test('mobile profile centers the portrait between names and reflows controls', async ({page})=>{
    await page.goto('/#about')
    for(const [width,height] of [[240,568],[320,568],[568,800],[768,1024],[1920,3840]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
        const nav=page.locator('nav.nav-header-mobile')
        await expect(nav).toBeVisible()
        await page.waitForFunction(()=>document.fonts.status==='loaded')
        await expect(nav.locator('.nav-profile-card-mobile-action-stack-middle > div').nth(0)).toHaveClass(/-theme/)
        await expect(nav.locator('.nav-profile-card-mobile-action-stack-middle > div').nth(1)).toHaveClass(/-resume/)
        await expect(nav.locator('.nav-profile-card-mobile-action-stack-right > div').nth(0)).toHaveClass(/-audio/)
        await expect(nav.locator('.nav-profile-card-mobile-action-stack-right > div').nth(1)).toHaveClass(/-language/)
        const row=nav.locator('.nav-profile-card-main-row')
        await expect(row).toHaveCSS('display','grid')
        const result=await row.evaluate(e=>{
            const box=e.getBoundingClientRect()
            const selectors=['.nav-profile-card-name-line-first','.nav-profile-card-media','.nav-profile-card-name-line-last','.nav-profile-card-mobile-action-stack-middle','.nav-profile-card-mobile-action-stack-right']
            const nodes=selectors.map(s=>e.querySelector(s))
            const r=nodes.map(n=>n.getBoundingClientRect())
            return {
                inside:r.every(b=>b.left>=box.left-1&&b.right<=box.right+1&&b.top>=box.top-1&&b.bottom<=box.bottom+1),
                separate:r.every((a,i)=>r.slice(i+1).every(b=>Math.min(a.right,b.right)-Math.max(a.left,b.left)<=1||Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)<=1)),
                ordered:r[0].right<=r[1].left+1&&r[1].right<=r[2].left+1,
                direction:getComputedStyle(nodes[3]).flexDirection,
                overflow:document.documentElement.scrollWidth>innerWidth
            }
        })
        expect(result.inside,`${width} containment`).toBe(true)
        expect(result.separate,`${width} overlap`).toBe(true)
        expect(result.ordered,`${width} name order`).toBe(true)
        expect(result.overflow).toBe(false)
        expect(result.direction).toBe(width>=512||width<=240?'row':'column')
        await expect(page.locator('.nav-tab-controller')).toBeInViewport()
    }
})
