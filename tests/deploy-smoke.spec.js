import {test, expect} from '@playwright/test'

// Deployment contracts describe visitor actions and results, never styling.
test.setTimeout(60000)
test.use({viewport:{width:1366,height:768}})
test.beforeEach(async ({page})=>{
    page.__functionalErrors=[]
    page.on('pageerror',error=>page.__functionalErrors.push(error.message))
    await page.addInitScript(()=>{
        if(!localStorage.getItem('storage-preferences'))
            localStorage.setItem('storage-preferences',JSON.stringify({
                preferredLanguage:'en',preferredTheme:'dark',preferredCursorMode:'system'
            }))
    })
})
test.afterEach(async ({page})=>{
    expect(page.__functionalErrors,'uncaught application errors').toEqual([])
})

async function open(page,route) {
    await page.goto('/#'+route,{waitUntil:'domcontentloaded'})
    const section=page.locator(`#section-${route}.section-shown`)
    await expect(section.locator('.section-content-page-ready')).toBeVisible()
    await expect(section.locator('.section-loading-placeholder')).toHaveCount(0)
    await expect(section.locator('article').first()).toBeVisible()
    if(route==='about') await page.keyboard.press('Escape')
    return section
}

for(const [device,width,height] of [['mobile',390,844],['desktop',1366,768]]) {
    test(`${device}: navigation, Back and contact input work`, async ({page})=>{
        await page.setViewportSize({width,height})
        await open(page,'about')
        await page.getByRole('button',{name:'Contact',exact:true}).filter({visible:true}).first().click()
        await expect(page).toHaveURL(/#contact$/)
        const input=page.locator('#section-contact input.form-input').first()
        await input.fill('Smoke check')
        await expect(input).toHaveValue('Smoke check')
        await page.goBack()
        await expect(page).toHaveURL(/#about$/)
        await expect(page.locator('#section-about.section-shown')).toBeVisible()
    })
}

// Independent cases give failures a route name and avoid one long shared budget.
for(const route of ['experience','education','my-software','my-hardware','my-writings','my-art']) {
    test(`direct link loads ${route}`, async ({page})=>{
        await open(page,route)
        await expect(page.locator('.app-error-boundary')).toHaveCount(0)
        if(route === 'my-writings') {
            // Loading the article shell alone does not cover async manuscript
            // initialization, which previously locked the page in a layout loop.
            await expect(page.locator('.illustrated-manuscript')).toHaveAttribute('data-status','ready')
            await page.getByRole('button',{name:'Contact',exact:true}).filter({visible:true}).first().click()
            await expect(page.locator('#section-contact.section-shown input.form-input').first()).toBeVisible()
        }
    })
}

for(const route of ['my-software','my-hardware']) {
    test(`${route}: filtering and reset work`, async ({page})=>{
        const section=await open(page,route)
        const projects=section.locator('.article-portfolio-item:visible')
        const all=section.locator('button[data-category-id="category_all"]')
        const personal=section.locator('button[data-category-id="category_personal"]')
        const total=await projects.count()
        expect(total).toBeGreaterThan(0)
        await personal.click()
        await expect(personal).toHaveAttribute('aria-pressed','true')
        await expect.poll(()=>projects.count()).toBeLessThan(total)
        expect(await projects.count()).toBeGreaterThan(0)
        await all.click()
        await expect(projects).toHaveCount(total)
    })
}

test('Education details expand and collapse', async ({page})=>{
    await page.setViewportSize({width:390,height:844})
    const section=await open(page,'education')
    const card=section.locator('.article-timeline-item-info-for-timelines').first()
    const details=card.locator('.article-timeline-item-info-for-timelines-body-list')
    const toggle=card.locator('.article-timeline-item-info-for-timelines-body-expand-button')
    await expect(details).toBeHidden()
    await toggle.click()
    await expect(details).toBeVisible()
    await toggle.press('Enter')
    await expect(details).toBeHidden()
})

test('profile contact opens and closes by keyboard', async ({page})=>{
    await open(page,'about')
    await page.locator('.nav-profile-card-media:visible').first().click()
    const dialog=page.locator('.profile-contact-dialog')
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
})

test('gallery opens, advances and closes', async ({page})=>{
    const section=await open(page,'my-art')
    await section.locator('a[href="#gallery:open"]:visible').first().click()
    const gallery=page.locator('#gallery-modal')
    await expect(gallery).toBeVisible()
    const position=await gallery.locator('output').textContent()
    await page.keyboard.press('ArrowRight')
    await expect(gallery.locator('output')).not.toHaveText(position)
    await page.keyboard.press('Escape')
    await expect(gallery).toHaveCount(0)
})

test('Art secret content reveals and closes', async ({page})=>{
    const section=await open(page,'my-art')
    await section.getByRole('button',{name:'Reveal Secret pearls'}).click()
    await expect(section.locator('.article-secret-pearls-grid')).toBeVisible()
    await section.getByRole('button',{name:'Show less',exact:true}).click()
    await expect(section.getByRole('button',{name:'Reveal Secret pearls'})).toBeVisible()
})
