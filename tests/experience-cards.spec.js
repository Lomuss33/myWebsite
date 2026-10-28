import {test, expect} from '@playwright/test'

const sizes = [[240,568],[280,653],[390,844],[568,320],[768,1024],[900,768],[1366,768],[1440,2560],[1920,1080],[3440,1440],[3840,2160]]

for(const language of ['en','de','hr','tr']) {
    for(const theme of ['light','dark']) {
        test(`Career cards keep full-width headers and clear descriptions: ${language}/${theme}`, async ({page}) => {
            await page.addInitScript(({language,theme}) => {
                localStorage.setItem('storage-preferences', JSON.stringify({preferredLanguage:language,preferredTheme:theme,preferredCursorMode:'system'}))
            }, {language,theme})
            await page.goto('/#experience', {waitUntil:'domcontentloaded'})
            const cards = page.locator('#article-1-section-experience .article-timeline-item--experience')
            await expect(cards.first()).toBeVisible()
            await page.evaluate(() => document.fonts.ready)
            const fontSamples = []
            for(const [width,height] of sizes) {
                await page.setViewportSize({width,height})
                // Verify actual text fragments, including wrapped translations,
                // against the floating image rather than just element widths.
                const inspect = () => cards.evaluateAll(items => items.map(item => {
                    const card = item.querySelector('.article-timeline-item-content--experience')
                    const avatar = item.querySelector('.article-timeline-item-avatar--experience').getBoundingClientRect()
                    const bounds = card.getBoundingClientRect()
                    const narrow = item.closest('article').clientWidth < 768
                    const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT)
                    let node
                    const problems = []
                    while((node = walker.nextNode())) {
                        if(!node.textContent.trim()) continue
                        const range = document.createRange()
                        range.selectNodeContents(node)
                        for(const rect of range.getClientRects()) {
                            if(rect.width < 1 || rect.height < 1) continue
                            if(rect.left < bounds.left-1 || rect.right > bounds.right+1 || rect.bottom > bounds.bottom+1)
                                problems.push(`clipped: ${node.textContent.trim()}`)
                            // Narrow cards retain their original side-overlap treatment.
                            // Desktop descriptions must clear the larger floating logo.
                            if(!narrow && rect.left < avatar.right-1 && rect.right > avatar.left+1 && rect.top < avatar.bottom-1 && rect.bottom > avatar.top+1)
                                problems.push(`logo overlap: ${node.textContent.trim()}`)
                        }
                    }
                    const body = card.querySelector('.article-timeline-item-info-for-timelines-body')
                    const bodySizes = [body,...body.querySelectorAll('p,li,.article-timeline-item-info-for-timelines-body-text')].map(e => parseFloat(getComputedStyle(e).fontSize))
                    const meta = card.querySelector('.article-timeline-item-info-for-timelines-header-meta-row--time')
                    const title = card.querySelector('h5')
                    const header = card.querySelector('.article-timeline-item-info-for-timelines-header')
                    const metadata = card.querySelector('.article-timeline-item-info-for-timelines-header-meta-grid')
                    const fullWidth = body.getBoundingClientRect().width
                    const wrapper = item.querySelector('.article-timeline-item-avatar-wrapper').getBoundingClientRect()
                    const paragraph = body.querySelector('.article-timeline-item-info-for-timelines-body-text')
                    const list = body.querySelector('.article-timeline-item-info-for-timelines-body-list')
                    const textGapCenter = paragraph && list ? (paragraph.getBoundingClientRect().bottom + list.getBoundingClientRect().top)/2 : null
                    return {problems,bodySizes,metaSize:parseFloat(getComputedStyle(meta).fontSize),
                        copyWidth:fullWidth,
                        originalMobilePlacement:!narrow || (parseFloat(getComputedStyle(item).paddingTop)===0 && (textGapCenter===null || Math.abs(wrapper.top+wrapper.height/2-textGapCenter)<2)),
                        titleSize:parseFloat(getComputedStyle(title).fontSize),
                        fullWidthHeader:[title,header,metadata].every(e=>Math.abs(e.getBoundingClientRect().width-fullWidth)<1) && getComputedStyle(title).textAlign==='center',
                        floating:avatar.left<bounds.right && avatar.right>bounds.right,
                        targetSize:item.querySelector('.article-timeline-item-avatar-wrapper').getBoundingClientRect().width}
                }))
                await expect.poll(async () => {
                    const results = await inspect()
                    return results.flatMap((r,i) => [
                        ...r.problems.map(p => `${i}: ${p}`),
                        ...(r.bodySizes.every(s=>s>=13 && s<=18.1) ? [] : [`${i}: body size ${r.bodySizes}`]),
                        ...(r.originalMobilePlacement ? [] : [`${i}: original mobile positioning changed`]),
                        ...(r.metaSize>=14 && r.titleSize>=18 ? [] : [`${i}: small heading/metadata`]),
                        ...(r.fullWidthHeader ? [] : [`${i}: header width/alignment changed`]),
                        ...(r.floating && r.targetSize>=44 ? [] : [`${i}: floating logo placement changed`])
                    ])
                }, {message:`${width}x${height} ${language}/${theme}`}).toEqual([])
                await expect.poll(() => page.locator('#article-1-section-experience ul.article-timeline-items').evaluate(list => {
                    const first = list.querySelector('.article-timeline-item-avatar-wrapper--experience').getBoundingClientRect()
                    const railTop = list.getBoundingClientRect().top + parseFloat(getComputedStyle(list, '::before').top)
                    return Math.abs(railTop - (first.top + first.height/2))
                }), {message:`${width}x${height}: rail starts at first avatar center`}).toBeLessThanOrEqual(1.5)
                fontSamples.push(await cards.first().locator('.article-timeline-item-info-for-timelines-body').evaluate(body=>({width:body.clientWidth,font:parseFloat(getComputedStyle(body).fontSize)})))
                expect(await page.evaluate(() => document.documentElement.scrollWidth), `${width}px document overflow`).toBeLessThanOrEqual(width+1)
                if(language==='en' && [390,1366,3440].includes(width)) {
                    await cards.first().scrollIntoViewIfNeeded()
                    await page.screenshot({path:`docs/tmp/career-${theme}-${width}.png`})
                }
            }
            fontSamples.sort((a,b)=>a.width-b.width)
            for(let i=1;i<fontSamples.length;i++)
                expect(fontSamples[i].font).toBeGreaterThanOrEqual(fontSamples[i-1].font-0.05)
            expect(fontSamples.at(-1).font-fontSamples[0].font).toBeGreaterThan(3)
            // The largest focus/hover state must also leave the copy clear.
            await page.emulateMedia({reducedMotion:'no-preference'})
            for(const width of [390,1366]) {
                await page.setViewportSize({width,height:width===390 ? 844 : 768})
                for(const card of await cards.all()) {
                    await card.locator('.article-timeline-item-avatar-link').focus()
                    await expect.poll(() => card.locator('.article-timeline-item-avatar--experience').evaluate(element =>
                        element.getAnimations().filter(animation => animation.playState==='running').length)).toBe(0)
                    if(width===1366)
                        await expect.poll(async () => (await inspectFocusedOverlap(card))).toEqual([])
                }
            }
        })
    }
}

async function inspectFocusedOverlap(card) {
    return card.evaluate(item => {
        const avatar = item.querySelector('.article-timeline-item-avatar--experience').getBoundingClientRect()
        const content = item.querySelector('.article-timeline-item-content--experience')
        const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT)
        const overlaps = []
        let node
        while((node=walker.nextNode())) {
            if(!node.textContent.trim()) continue
            const range = document.createRange()
            range.selectNodeContents(node)
            if([...range.getClientRects()].some(r=>r.right>avatar.left+1 && r.left<avatar.right-1 && r.top<avatar.bottom-1 && r.bottom>avatar.top+1))
                overlaps.push(node.textContent)
        }
        return overlaps
    })
}
