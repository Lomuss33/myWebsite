import {test, expect} from '@playwright/test'

for(const theme of ['light','dark']) {
    test(`Decorative bands stay compact from phones through very wide screens: ${theme}`, async ({page}) => {
        test.setTimeout(120000)
        await page.addInitScript(theme => localStorage.setItem('storage-preferences', JSON.stringify({preferredTheme:theme,preferredLanguage:'en',preferredCursorMode:'system'})), theme)
        for(const route of ['about','experience','education','my-software','my-hardware','my-writings','my-art']) {
            await page.goto(`/#${route}`, {waitUntil:'domcontentloaded'})
            const section = page.locator(`#section-${route}.section-shown`)
            await expect(section).toBeVisible()
            await expect(section.locator('article').first()).toBeVisible()
            const bands = section.locator('.section-decoration-band')
            await expect(bands.first()).toBeVisible()
            if(route==='about') {
                await expect(section.locator('.section-decoration-boundary-between-articles[data-section-decoration-band-index="1"]')).toHaveCount(0)
                await expect(section.locator('.section-decoration-boundary-between-articles')).toHaveCount(5)
                expect(await section.locator('.section-decoration-boundary-between-articles').evaluateAll(elements => elements.map(e=>e.dataset.sectionDecorationBandIndex))).toEqual(['2','3','4','5','6'])
            }
            for(const [width,height] of [[240,568],[390,844],[1366,768],[3440,1440],[7680,2160],[1440,2560]]) {
                await page.setViewportSize({width,height})
                const mobile = width<height
                await expect(page.locator('html')).toHaveAttribute('data-layout',mobile ? 'mobile' : width>=1440 && width/height>=2.1 ? 'ultrawide' : 'normal')
                await expect.poll(() => section.evaluate(section => {
                    const mobile = document.documentElement.dataset.layout==='mobile'
                    const issues = []
                    for(const band of section.querySelectorAll('.section-decoration-band')) {
                        const size = band.getBoundingClientRect()
                        const bottom = band.classList.contains('section-decoration-band-page-bottom')
                        const baseHeight = size.height/(bottom ? 7 : 1)
                        if(baseHeight<23.9 || baseHeight>36.1) issues.push(`band height: ${size.height}`)
                        if(getComputedStyle(band).overflow!=='hidden') issues.push('unclipped artwork')
                    }
                    for(const line of section.querySelectorAll('.section-decoration-line')) {
                        if(getComputedStyle(line).display==='none') continue
                        if(Math.abs(line.getBoundingClientRect().height-(mobile ? 2 : 1))>0.1) issues.push('incorrect line thickness')
                    }
                    if(document.documentElement.scrollWidth>innerWidth+1) issues.push('horizontal overflow')
                    return issues
                }), {message:`${route} ${theme} ${width}x${height}`}).toEqual([])
                if(route==='about' && [390,3440].includes(width)) {
                    await section.locator('.section-decoration-boundary-between-articles').first().screenshot({path:`docs/tmp/band-${theme}-${width}.png`})
                }
            }
        }
    })
}
