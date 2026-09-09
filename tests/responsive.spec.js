import {test, expect} from '@playwright/test'
import {resolveLayout} from '../src/config/responsiveLayout.js'

const routes = ['about','experience','education','my-software','my-hardware','my-writings','my-art','contact']
const modes = {mobile: [320,568], normal: [1366,768], ultrawide: [3440,1440]}
const smoke = process.env.RESPONSIVE_SMOKE === '1'

async function preferences(page, language = 'en', theme = 'dark') {
    await page.addInitScript(({language,theme}) => {
        localStorage.setItem('storage-preferences', JSON.stringify({preferredLanguage:language,preferredTheme:theme,preferredCursorMode:'system'}))
    }, {language,theme})
}
async function openSection(page, route) {
    await page.goto('/#'+route)
    await expect(page.locator('#section-'+route+'.section-shown article').first()).toBeVisible()
    await page.waitForFunction(() => document.fonts.status === "loaded")
    // Stop the decorative onboarding spotlight by normal pointer movement.
    await page.mouse.move(1,1)
    await page.mouse.move(200,1)
}

for(const language of smoke ? ['en'] : ['en','de','hr','tr']) {
    for(const theme of smoke ? ['dark'] : ['dark','light']) {
        for(const [mode,[width,height]] of Object.entries(modes)) {
            test(`${language}/${theme}/${mode}: all sections fit`, async ({page}) => {
                test.setTimeout(240000)
                await page.setViewportSize({width,height})
                await preferences(page,language,theme)
                const errors=[]
                page.on('pageerror',e=>errors.push(e.message))
                for(const route of routes) {
                    await openSection(page,route)
                    await expect(page.locator('html')).toHaveAttribute('data-layout',mode)
                    const wrapper=page.locator('section.section-shown .section-content-elements-wrapper')
                    await expect(wrapper).toHaveCSS('transform','none')
                    const geometry=await page.evaluate(()=>{
                        const active=document.querySelector('section.section-shown')
                        const title=active.querySelector('.section-header-title')
                        const range=document.createRange()
                        if(title) range.selectNodeContents(title)
                        const bounds=title?range.getBoundingClientRect():null
                        return {documentWidth:document.documentElement.scrollWidth,viewport:innerWidth,titleFits:!bounds||(bounds.left>=-1&&bounds.right<=innerWidth+1)}
                    })
                    expect(geometry.documentWidth,route+' document width').toBeLessThanOrEqual(geometry.viewport+1)
                    expect(geometry.titleFits,route+' title clipping').toBe(true)
                    const bodyFonts=await page.locator('section.section-shown .article-feature-item-text').evaluateAll(nodes=>nodes.map(e=>parseFloat(getComputedStyle(e).fontSize)))
                    for(const size of bodyFonts) {
                        expect(size,route+' body text minimum').toBeGreaterThanOrEqual(16)
                        expect(size,route+' body text maximum').toBeLessThanOrEqual(32)
                    }
                    if(route==='contact') {
                        await expect(page.locator('input.form-input').first()).toHaveCSS('font-size','16px')
                        const sizes=await page.locator('button.copy-button').evaluateAll(nodes=>nodes.map(e=>e.getBoundingClientRect().height).filter(Boolean))
                        expect(sizes.length).toBeGreaterThan(0)
                        // Desktop uses the stakeholder-approved 80% content zoom; mobile targets stay full size.
                        for(const size of sizes) expect(size).toBeGreaterThanOrEqual(mode === "mobile" ? 43.5 : 34.8)
                    }
                }
                expect(errors).toEqual([])
            })
        }
    }
}

test('resize keeps mode and navigation in agreement', async ({page})=>{
    await preferences(page)
    await openSection(page,'about')
    for(const [width,height] of [[280,653],[568,320],[767,1024],[768,1024],[959,768],[960,768],[1679,1050],[1680,1050],[1920,3840],[5120,1440],[7680,2160]]) {
        await page.setViewportSize({width,height})
        const mode=resolveLayout(width,height)
        await expect(page.locator('html')).toHaveAttribute('data-layout',mode)
        await expect(page.locator('nav.nav-sidebar')).toHaveCount(mode==='mobile'?0:1)
        await expect(page.locator('nav.nav-header-mobile')).toHaveCount(mode==='mobile'?1:0)
    }
})

test('font enlargement retains readable form text and scroll access', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:768,height:1366})
    await openSection(page,'contact')
    await page.addStyleTag({content:'html { font-size: 200% !important; }'})
    await page.evaluate(()=>window.dispatchEvent(new Event('resize')))
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    const input=page.locator('input.form-input').first()
    await expect(input).toHaveCSS('font-size','32px')
    await input.scrollIntoViewIfNeeded()
    await input.fill('Sizing check')
    await expect(input).toHaveValue('Sizing check')
})

test('gallery stays fullscreen and dismissible across mode changes', async ({page}) => {
    await preferences(page)
    await page.setViewportSize({width:768,height:1366})
    await openSection(page,'my-art')
    await page.locator('section.section-shown a[href="#gallery:open"]').first().click()
    const modal=page.locator('#gallery-modal')
    await expect(modal).toBeVisible()
    for(const [width,height] of [[3440,1440],[320,568],[568,320]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        await expect(modal.locator('.modal-dialog')).toHaveCSS('max-width','100%')
        const close=modal.locator('.modal-header button').first()
        await expect(close).toBeInViewport()
    }
    await modal.locator('.modal-header button').first().click()
    await expect(modal).toHaveCount(0)
})
