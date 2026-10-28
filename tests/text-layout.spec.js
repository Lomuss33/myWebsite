import {test, expect} from '@playwright/test'

// Focused regression coverage; the deployment gate remains the 14 smoke checks.
for(const {name,viewport,resized,theme,motion} of [
    {name:'desktop normal motion',viewport:{width:1366,height:768},resized:{width:1000,height:700},theme:'dark',motion:'no-preference'},
    {name:'mobile reduced motion',viewport:{width:390,height:844},resized:{width:568,height:800},theme:'light',motion:'reduce'}
]) {
    test(`${name}: manuscript and Contact survive resize and navigation`,async ({page})=>{
        const errors=[]
        page.on('pageerror',error=>errors.push(error.message))
        page.on('console',message=>{
            if(message.type()==='error' && message.text().startsWith('IllustratedManuscript'))
                errors.push(message.text())
        })
        await page.emulateMedia({reducedMotion:motion})
        await page.setViewportSize(viewport)
        await page.addInitScript(theme=>{
            localStorage.setItem('storage-preferences',JSON.stringify({
                preferredLanguage:'en',preferredTheme:theme,preferredCursorMode:'system'
            }))
        },theme)
        await page.goto('/#my-writings',{waitUntil:'domcontentloaded'})
        const manuscript=page.locator('.illustrated-manuscript')
        await expect(manuscript).toHaveAttribute('data-status','ready')
        await page.setViewportSize(resized)
        // Let ResizeObserver and the renderer process the new width. A stalled
        // line-layout loop prevents these animation frames from completing.
        await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
        await expect(manuscript).toHaveAttribute('data-status','ready')
        await expect(manuscript.getByRole('status')).toHaveCount(0)

        await page.getByRole('button',{name:'Contact',exact:true}).filter({visible:true}).first().click()
        const narrative=page.locator('#section-contact .location-compare-pretext')
        await expect(narrative).toHaveText(/\S/)
        await page.setViewportSize(viewport)
        await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))))
        await expect(narrative).toHaveText(/\S/)
        await page.goBack()
        await expect(manuscript).toHaveAttribute('data-status','ready')
        await page.goForward()
        const input=page.locator('#section-contact.section-shown input.form-input').first()
        await input.fill('Still usable after navigation')
        await expect(input).toHaveValue('Still usable after navigation')
        expect(errors).toEqual([])
    })
}
