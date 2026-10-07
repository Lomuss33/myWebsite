import {test, expect} from '@playwright/test'
import {resolveLayout} from '../src/config/responsiveLayout.js'

const routes = ['about','experience','education','my-software','my-hardware','my-writings','my-art','contact']
const modes = {mobile: [320,568], normal: [1366,768], ultrawide: [3440,1440]}
const smoke = process.env.RESPONSIVE_SMOKE === '1'
const smokeSectionFitScenarios = [
    ['en','dark','mobile'],
    ['en','light','normal'],
    ['de','dark','ultrawide'],
    ['de','light','mobile'],
    ['hr','dark','normal'],
    ['tr','light','ultrawide']
]
const hasVisibleHairline = width => parseFloat(width) > 0 && parseFloat(width) <= 1
const matrixTranslateY = transform => {
    if(transform === 'none') return 0
    const matrix3d = transform.match(/^matrix3d\(([^)]+)\)$/)?.[1].split(',')
    if(matrix3d) return Number(matrix3d[13])
    const matrix = transform.match(/^matrix\(([^)]+)\)$/)?.[1].split(',')
    return matrix ? Number(matrix[5]) : Number.NaN
}

async function expectHoverTranslateY(locator, expectedY) {
    await expect.poll(async()=>{
        const transform=await locator.evaluate(element=>getComputedStyle(element).transform)
        const translateY=matrixTranslateY(transform)
        return Number.isFinite(translateY) && Math.abs(translateY-expectedY)<=0.5
    },{timeout:3000,intervals:[50,100,150]}).toBe(true)
}

async function expectNoMotion(locator) {
    await expect.poll(async()=>{
        const {transform,duration}=await locator.evaluate(element=>{
            const style=getComputedStyle(element)
            return {transform:style.transform,duration:style.transitionDuration}
        })
        const durations=duration.split(',').map(value=>parseFloat(value.trim()))
        return Math.abs(matrixTranslateY(transform))<=0.01 && durations.every(value=>value===0)
    },{timeout:1500,intervals:[50,100]}).toBe(true)
}

async function preferences(page, language = 'en', theme = 'dark') {
    await page.addInitScript(({language,theme}) => {
        localStorage.setItem('storage-preferences', JSON.stringify({preferredLanguage:language,preferredTheme:theme,preferredCursorMode:'system'}))
    }, {language,theme})
}
async function openSection(page, route, {reuse = false} = {}) {
    if(!page.__responsiveConsoleErrors) {
        page.__responsiveConsoleErrors=[]
        page.on('console',message=>{
            if(message.type()==='error') page.__responsiveConsoleErrors.push(message.text())
        })
    }
    // The app's actual ready check below covers its lazy React sections;
    // don't also block on unrelated images and other load-event resources.
    if(reuse && page.url().startsWith(test.info().project.use.baseURL+'/')) {
        await page.evaluate(route=>{ location.hash=route },route)
    } else {
        await page.goto('/#'+route,{waitUntil:'domcontentloaded'})
    }
    const lazySectionReadyTimeout=45000

    // Readiness means the destination is active, its lazy content has resolved,
    // and its actual heading is rendered. Geometry assertions wait for their
    // own expected result instead of requiring every font to finish loading.
    const readiness=await page.waitForFunction(({route})=>{
        if(document.querySelector('.app-error-boundary')) return 'app-error'
        const activeSection=document.querySelector(`#section-${route}.section-shown`)
        const activeContent=activeSection?.querySelector('.section-content')
        if(!activeContent?.classList.contains('section-content-page-ready') ||
           activeContent.querySelector('.section-loading-placeholder')) return false
        const title=activeSection.querySelector(
            '.section-header-title, .section-content-hide-header .section-body > article:first-of-type > h4.article-title'
        )
        if(!title) return false
        const rect=title.getBoundingClientRect()
        const style=getComputedStyle(title)
        const visible=rect.width>0&&rect.height>0&&style.visibility!=='hidden'
        return visible?'ready':false
    },{route},{timeout:lazySectionReadyTimeout,polling:100})
    const readinessState=await readiness.jsonValue()
    if(readinessState==='app-error')
        throw new Error(`App error while opening #${route}: ${page.__responsiveConsoleErrors.slice(-3).join(' | ')}`)
    // Stop the decorative onboarding spotlight by normal pointer movement.
    await page.mouse.move(1,1)
    await page.mouse.move(200,1)
}

for(const [width,height,language,theme] of [
    [1366,768,'en','dark'],
    [390,844,'de','light'],
    [1440,2560,'hr','dark'],
    [280,653,'tr','light'],
    [797,788,'hr','light'],
    [3440,1440,'en','dark'],
]) {
    test(`${width}x${height} ${language}/${theme}: all page and article headings share the Home responsive type scale`, async ({page})=>{
        test.setTimeout(180000)
        await preferences(page,language,theme)
        await page.setViewportSize({width,height})
        let homeSize
        // Each viewport has its own time budget. Switch routes within the app so
        // this comparison does not rebuild the same page eight times.
        for(const route of routes) {
            await openSection(page,route,{reuse:true})
            await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
            const pageTitle=page.locator(
                '#section-'+route+' .section-header-title, '+
                '#section-'+route+' .section-content-hide-header .section-body > article:first-of-type > h4.article-title'
            ).first()
            await expect(pageTitle).toBeVisible()
            if(route==='about') homeSize=await pageTitle.evaluate(element=>parseFloat(getComputedStyle(element).fontSize))
            await expect.poll(async()=>{
                const size=await pageTitle.evaluate(element=>parseFloat(getComputedStyle(element).fontSize))
                return Math.abs(size-homeSize)
            },{message:width+'x'+height+' '+route+' heading matches Home'}).toBeLessThanOrEqual(0.1)
            const headings=page.locator('#section-'+route+' :is(.section-header-title, h4.article-title)')
            await expect.poll(()=>headings.evaluateAll((elements,expected)=>{
                const issues=[]
                for(const heading of elements) {
                    const rect=heading.getBoundingClientRect()
                    if(!rect.width || !rect.height) continue
                    const css=getComputedStyle(heading)
                    if(Math.abs(parseFloat(css.fontSize)-expected)>0.1)
                        issues.push(heading.textContent.trim()+': inconsistent size')
                    if(rect.left< -1 || rect.right>innerWidth+1)
                        issues.push(heading.textContent.trim()+': outside viewport')
                    const text=heading.querySelector('.article-title-text') || heading
                    const textCss=getComputedStyle(text)
                    if(Math.abs(parseFloat(textCss.paddingLeft)-parseFloat(textCss.paddingRight))>0.1)
                        issues.push(heading.textContent.trim()+': asymmetric decoration space')
                    const range=document.createRange()
                    range.selectNodeContents(text)
                    const ink=range.getBoundingClientRect()
                    if(ink.left<rect.left-1 || ink.right>rect.right+1)
                        issues.push(heading.textContent.trim()+': text overflow')
                    if(heading.matches('.article-title') && Math.abs(parseFloat(css.marginTop)-parseFloat(css.marginBottom))>0.1)
                        issues.push(heading.textContent.trim()+': asymmetric vertical spacing')
                }
                return issues
            },homeSize),{message:route+' titles keep a common size, symmetric spacing and contained text'}).toEqual([])
        }
    })
}

const sectionFitScenarios = smoke
    ? smokeSectionFitScenarios
    : ['en','de','hr','tr'].flatMap(language=>['dark','light'].flatMap(theme=>Object.keys(modes).map(mode=>[language,theme,mode])))

for(const [language,theme,mode] of sectionFitScenarios) {
    const [width,height]=modes[mode]
    test(`${language}/${theme}/${mode}: all sections fit`, async ({page}) => {
        test.setTimeout(240000)
        await page.setViewportSize({width,height})
        await preferences(page,language,theme)
        const errors=[]
        page.on('pageerror',e=>errors.push(e.message))
        for(const route of routes) {
            await openSection(page,route,{reuse:true})
            await expect(page.locator('html')).toHaveAttribute('data-layout',mode)
            const wrapper=page.locator('section.section-shown .section-content-elements-wrapper')
            await expect(wrapper).toHaveCSS('transform','none')
            await expect.poll(async()=>page.evaluate(()=>{
                const active=document.querySelector('section.section-shown')
                const title=active.querySelector('.section-header-title')
                const range=document.createRange()
                if(title) range.selectNodeContents(title)
                const bounds=title?range.getBoundingClientRect():null
                return document.documentElement.scrollWidth<=innerWidth+1&&(!bounds||(bounds.left>=-1&&bounds.right<=innerWidth+1))
            }),{message:route+' has no horizontal overflow or title clipping'}).toBe(true)
            const bodyFonts=await page.locator('section.section-shown .article-feature-item-text').evaluateAll(nodes=>nodes.map(e=>parseFloat(getComputedStyle(e).fontSize)))
            for(const size of bodyFonts) {
                expect(size,route+' body text minimum').toBeGreaterThanOrEqual(12.5)
                expect(size,route+' body text maximum').toBeLessThanOrEqual(32)
            }
            if(route==='contact') {
                await expect(page.locator('input.form-input').first()).toHaveCSS('font-size','16px')
                const sizes=await page.locator('button.copy-button').evaluateAll(nodes=>nodes.map(e=>e.getBoundingClientRect().height).filter(Boolean))
                expect(sizes.length).toBeGreaterThan(0)
                // Controls keep their real 44px hit area in every layout mode.
                for(const size of sizes) expect(size).toBeGreaterThanOrEqual(43.5)
            }
        }
        expect(errors).toEqual([])
    })
}

for(const route of ['my-software','my-hardware']) {
    test(`${route}: portfolio filters restore all projects`, async ({page})=>{
        await preferences(page)
        await page.setViewportSize({width:1366,height:768})
        await openSection(page,route)
        const article=page.locator(`#article-1-section-${route}`)
        const visibleProjects=article.locator('.article-portfolio-item:visible')
        const all=article.locator('button[data-category-id="category_all"]')
        const personal=article.locator('button[data-category-id="category_personal"]')
        const count=async button=>Number((await button.locator('.category-filter-button-count').innerText()).replace(/\D/g,''))
        const total=await count(all)
        const filtered=await count(personal)
        expect(filtered).toBeGreaterThan(0)
        expect(filtered).toBeLessThan(total)
        await expect(visibleProjects).toHaveCount(total)
        await personal.click()
        await expect(personal).toHaveAttribute('aria-pressed','true')
        await expect(visibleProjects).toHaveCount(filtered)
        await all.click()
        await expect(all).toHaveAttribute('aria-pressed','true')
        await expect(visibleProjects).toHaveCount(total)
        const actions=await article.locator('.article-portfolio-item-control-btn:visible').evaluateAll(nodes=>nodes.map(node=>node.getBoundingClientRect().height))
        expect(actions.length).toBeGreaterThan(0)
        expect(actions.every(height=>height>=43.5)).toBe(true)
    })
}

test('Education details and language popups open and close', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:390,height:844})
    await openSection(page,'education')
    const card=page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()
    const details=card.locator('.article-timeline-item-info-for-timelines-body-list')
    const toggle=card.locator('.article-timeline-item-info-for-timelines-body-expand-button')
    await expect(details).toBeHidden()
    await toggle.click()
    await expect(details).toBeVisible()
    await toggle.press('Enter')
    await expect(details).toBeHidden()
    const skills=page.locator('#article-3-section-education')
    const trigger=skills.locator('.article-skills-item-popup-trigger').first()
    const popup=skills.locator('.article-skills-item-popup-body.article-skills-item-popup-open')
    await trigger.click()
    await expect(popup).toBeVisible()
    await trigger.click()
    await expect(popup).toHaveCount(0)
})

test('Hardware probes unlock request controls', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:390,height:844})
    await openSection(page,'my-hardware')
    const probe=page.locator('#article-2-section-my-hardware')
    const unlock=probe.locator('.article-data-probe-unlock-btn')
    await expect(unlock).toBeVisible()
    await unlock.click()
    await expect(unlock).toBeHidden()
    const requests=probe.locator('.article-data-probe-grid-fixed-two')
    await expect(requests.locator('.article-data-probe-item').first()).toBeVisible()
    await expect(requests.getByRole('button',{name:/Request$/}).first()).toBeVisible()
})

test('Art WebArt and pearls reveal and close', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:1366,height:768})
    await openSection(page,'my-art')
    const webArt=page.locator('#article-3-section-my-art')
    await webArt.locator('.article-web-art-intro-cover-button-primary').click()
    await expect(webArt.locator('.article-web-art-intro-cover')).toHaveClass(/article-web-art-intro-cover-hidden/)
    await expect.poll(()=>webArt.locator('.article-web-art-stage').evaluate(element=>element.getBoundingClientRect().height)).toBeGreaterThan(1)
    const pearls=page.locator('#article-5-section-my-art')
    await pearls.getByRole('button',{name:'Reveal Secret pearls'}).click()
    await expect(pearls.locator('.article-secret-pearls-grid')).toBeVisible()
    await expect(pearls.locator('.article-secret-pearls-gated-tile').first()).toBeVisible()
    await pearls.getByRole('button',{name:'Show less'}).click()
    await expect(pearls.getByRole('button',{name:'Reveal Secret pearls'})).toBeVisible()
})

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

test('Education mobile navigation fills its grid cells without oversized bands', async ({page})=>{
    await preferences(page,'hr','dark')
    await page.setViewportSize({width:1813,height:2549})
    await openSection(page,'education')

    for(const [width,height] of [[1813,2549],[1920,3840],[1440,2560],[768,1024],[390,844]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
        await expect.poll(async()=>page.locator('#nav-link-pills-menu').evaluate(nav=>{
            const issues=[]
            const bounds=nav.getBoundingClientRect()
            const buttons=[...nav.querySelectorAll(':scope > button')]
            if(buttons.length!==2) issues.push('Education menu does not have both destinations')
            if(bounds.height>112.5) issues.push('navigation band grows beyond its bounded control height')
            for(const button of buttons) {
                const target=button.getBoundingClientRect()
                if(target.width<bounds.width*.48) issues.push('destination collapses inside its grid column')
                if(target.height<44) issues.push('destination loses its touch target')
                for(const child of button.querySelectorAll(':scope > i, :scope > span')) {
                    const content=child.getBoundingClientRect()
                    if(content.left<target.left-1 || content.right>target.right+1 || content.top<target.top-1 || content.bottom>target.bottom+1)
                        issues.push('destination icon or label overflows the button')
                }
            }
            const tabs=document.querySelector('nav.nav-tab-controller').getBoundingClientRect()
            if(tabs.height>112.5 || tabs.bottom>innerHeight+1) issues.push('bottom navigation grows or leaves the viewport')
            return issues
        }),{message:`${width}x${height}: Education destinations stay readable and usable`}).toEqual([])
    }

    await page.setViewportSize({width:1813,height:2549})
    await page.locator('#nav-link-pills-menu > button').first().click()
    await expect(page).toHaveURL(/#experience$/)
    await expect(page.locator('#section-experience')).toBeVisible()
    await page.locator('#nav-link-pills-menu > button').nth(1).click()
    await expect(page).toHaveURL(/#education$/)
    await expect(page.locator('#section-education')).toBeVisible()

    await openSection(page,'about',{reuse:true})
    const overview=page.locator('#nav-link-pills-menu')
    await expect(overview.locator(':scope > button')).toHaveCount(6)
    await expect.poll(()=>overview.evaluate(nav=>{
        const bounds=nav.getBoundingClientRect()
        return [...nav.children].flatMap(button=>{
            const target=button.getBoundingClientRect()
            return target.width>=bounds.width*.16 && target.left>=bounds.left-1 && target.right<=bounds.right+1 ? [] :
                [`${button.innerText}: button ${target.left},${target.right},${target.width}; nav ${bounds.left},${bounds.right},${bounds.width}; ${getComputedStyle(nav).gridTemplateColumns}`]
        })
    }),{message:'the six overview destinations also fill their grid cells'}).toEqual([])
})

test('desktop page uses a centered 72rem pane without CSS zoom', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:1366,height:768})
    await openSection(page,'about')

    for(const [width,height] of [[1366,768],[3440,1440],[5120,1440]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        const geometry=await page.evaluate(()=>{
            const page=document.querySelector('.layout-navigation-children-inner')
            const area=page.parentElement
            const rail=document.querySelector('nav.nav-sidebar')
            const pageRect=page.getBoundingClientRect()
            const areaRect=area.getBoundingClientRect()
            const railRect=rail.getBoundingClientRect()
            const rootFont=parseFloat(getComputedStyle(document.documentElement).fontSize)||16
            const availableLeft=railRect.right
            const availableWidth=areaRect.right-availableLeft
            const expectedLeft=availableLeft+(availableWidth-pageRect.width)/2
            return {
                zoom:getComputedStyle(page).zoom,
                width:pageRect.width,
                maxWidth:72*rootFont,
                left:pageRect.left,
                expectedLeft
            }
        })
        expect(geometry.zoom).toBe('1')
        expect(geometry.width).toBeLessThanOrEqual(geometry.maxWidth+1)
        expect(Math.abs(geometry.left-geometry.expectedLeft)).toBeLessThanOrEqual(1)
    }
})

test('Home desktop density stays compact while contact controls remain usable', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:1366,height:768})
    await openSection(page,'about')

    for(const [width,height] of [[900,768],[1366,768],[3440,1440]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        const metrics=await page.evaluate(()=>{
            const get=(selector)=>{
                const element=document.querySelector(selector)
                if(!element) return null
                const rect=element.getBoundingClientRect()
                return {font:parseFloat(getComputedStyle(element).fontSize),width:rect.width,height:rect.height}
            }
            return {
                heading:get('.section-header-home h2'),
                contact:get('#article-1-section-about .article-inline-list-item-control'),
                chip:get('#article-1-section-about .article-inline-list-item-pill'),
                intro:get('.article-feature-item-home-style-intro .article-feature-item-text'),
                introImage:get('.article-feature-item-home-style-intro .article-feature-item-image'),
                skillCard:get('#article-3-section-about .article-info-list-item-content'),
                skillTitle:get('#article-3-section-about .article-info-list-item-info-title'),
                skillBody:get('#article-3-section-about .article-info-list-item-info-text'),
                seeMore:get('#article-3-section-about .collapsable-menu > button.see-more-button-modern'),
                stackSeeMore:get('#article-7-section-about .collapsable-menu > button.see-more-button-modern'),
                name:get('#article-5-section-about .name-origin-word'),
                nameCopy:get('#article-5-section-about .name-origin-copy'),
                stackCard:get('#article-7-section-about .article-stack-item-home'),
                stackValue:get('#article-7-section-about .article-stack-item-title-main'),
                homeHeight:document.querySelector('#scrollable-about').scrollHeight
            }
        })
        expect(metrics.heading.font).toBeGreaterThanOrEqual(24)
        expect(metrics.heading.font).toBeLessThanOrEqual(27)
        expect(metrics.contact.height).toBeGreaterThanOrEqual(44)
        expect(metrics.chip.height).toBeLessThanOrEqual(31)
        expect(metrics.introImage.width).toBeLessThanOrEqual(180)
        expect(metrics.introImage.height).toBeLessThanOrEqual(180)
        expect(metrics.intro.font).toBeGreaterThanOrEqual(12.5)
        expect(metrics.intro.font).toBeLessThanOrEqual(14)
        expect(metrics.skillTitle.font).toBeGreaterThanOrEqual(12.5)
        expect(metrics.skillTitle.font).toBeLessThanOrEqual(13.5)
        expect(metrics.skillBody.font).toBeGreaterThanOrEqual(12)
        expect(metrics.skillBody.font).toBeLessThanOrEqual(13)
        expect(metrics.skillCard.height).toBeLessThanOrEqual(115)
        expect(metrics.seeMore.width).toBeLessThanOrEqual(170)
        expect(metrics.seeMore.height).toBe(44)
        expect(metrics.stackSeeMore.width).toBe(metrics.seeMore.width)
        expect(metrics.stackSeeMore.height).toBe(metrics.seeMore.height)
        expect(metrics.name.font).toBeGreaterThanOrEqual(54)
        expect(metrics.name.font).toBeLessThanOrEqual(72)
        expect(metrics.nameCopy.font).toBeGreaterThanOrEqual(12.5)
        expect(metrics.nameCopy.font).toBeLessThanOrEqual(13.5)
        expect(metrics.stackValue.font).toBeGreaterThanOrEqual(16)
        expect(metrics.stackValue.font).toBeLessThanOrEqual(18.5)
        expect(metrics.stackCard.height).toBeLessThanOrEqual(90)
        expect(metrics.homeHeight).toBeLessThan(2800)
    }
})

for(const [language,theme] of [['hr','dark'],['de','light'],['en','light'],['tr','dark']]) {
    test(`Home skill proof panels stay readable and usable across sizes: ${language}`, async ({page})=>{
        test.setTimeout(90000)
        await preferences(page,language,theme)
        await page.setViewportSize({width:390,height:844})
        await openSection(page,'about')
        await page.evaluate(()=>document.fonts.ready)

        for(const [width,height] of [[280,653],[390,844],[768,1024],[1366,768],[2333,2364],[3440,1440]]) {
            await page.setViewportSize({width,height})
            await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
            for(const articleId of [3,4,6]) {
                const card=page.locator(`article#article-${articleId}-section-about .article-info-list-item-home`).first()
                const trigger=card.locator('.article-info-list-item-avatar-button')
                const panel=card.locator('.article-info-list-item-text-bubble')
                await card.locator('.article-info-list-item-content').hover()
                await expect(panel).toHaveAttribute('aria-hidden','true')
                // Let the hover action wait for the resized card to settle
                // before comparing its closed and open heights.
                const before=await card.evaluate(element=>element.offsetHeight)
                await trigger.hover()
                await expect(panel).toHaveAttribute('aria-hidden','false')
                await card.locator('.article-info-list-item-content').hover()
                await expect(panel).toHaveAttribute('aria-hidden','true')
                await trigger.click()
                await card.locator('.article-info-list-item-content').hover()
                await expect(panel).toHaveAttribute('aria-hidden','false')
                await expect.poll(()=>card.evaluate(card=>{
                    const pane=card.querySelector('.article-info-list-item-content').getBoundingClientRect()
                    const panel=card.querySelector('.article-info-list-item-text-bubble').getBoundingClientRect()
                    const inner=card.querySelector('.article-info-list-item-text-bubble-inner')
                    const copy=card.querySelector('.article-info-list-item-text-bubble-copy').getBoundingClientRect()
                    const bounds=inner.getBoundingClientRect()
                    const issues=[]
                    if(Math.abs(pane.top-panel.top)>1 || Math.abs(pane.height-panel.height)>1)
                        issues.push('proof does not fill the text pane')
                    if(inner.scrollWidth>inner.clientWidth+1 || copy.left<bounds.left-1 || copy.right>bounds.right+1)
                        issues.push('proof text overflows sideways')
                    if(getComputedStyle(inner).pointerEvents==='none') issues.push('proof cannot be scrolled')
                    if(inner.scrollHeight<=inner.clientHeight+1 && Math.abs((copy.top+copy.bottom-bounds.top-bounds.bottom)/2)>2)
                        issues.push('short proof is not centered vertically')
                    if(inner.scrollHeight>inner.clientHeight+1) {
                        inner.scrollTop=inner.scrollHeight
                        if(card.querySelector('.article-info-list-item-text-bubble-copy').getBoundingClientRect().bottom>bounds.bottom+1)
                            issues.push('the end of a long proof cannot be reached by scrolling')
                        inner.scrollTop=0
                    }
                    return issues
                }),{message:`${width}x${height}, article ${articleId}: proof fits or scrolls inside its stable card`}).toEqual([])
                const after=await card.evaluate(element=>element.offsetHeight)
                expect(Math.abs(after-before),`${width}x${height}, article ${articleId}: opening proof preserves card height`).toBeLessThanOrEqual(1)
                await trigger.click()
                await page.mouse.move(0,0)
                await expect(panel).toHaveAttribute('aria-hidden','false')
                const otherTrigger=page.locator(`article#article-${articleId}-section-about .article-info-list-item.article-info-list-item-home`).nth(1).locator('.article-info-list-item-avatar-button')
                await otherTrigger.click()
                await expect(panel).toHaveAttribute('aria-hidden','true')
                await page.keyboard.press('Escape')
                await expect(panel).toHaveAttribute('aria-hidden','true')
                await expect(otherTrigger).toHaveAttribute('aria-expanded','false')
            }
        }

        const trigger=page.locator('article#article-6-section-about .article-info-list-item-avatar-button').first()
        await trigger.evaluate(element=>element.blur())
        await trigger.focus()
        await expect(trigger).toHaveAttribute('aria-expanded','true')
        await page.keyboard.press('Tab')
        await expect(page.locator('article#article-6-section-about .article-info-list-item-text-bubble-inner').first()).toBeFocused()
        await expect(trigger).toHaveAttribute('aria-expanded','true')
        await page.keyboard.press('Escape')
        await expect(trigger).toHaveAttribute('aria-expanded','false')
    })
}

for(const [input,width,height] of [['wheel',390,844],['wheel',1366,768],['touch',390,844]]) {
    test(`Home popup edges let the whole page scroll: ${input} ${width}x${height}`, async ({browser})=>{
        test.skip(input==='touch' && browser.browserType().name()!=='chromium','Native touch gestures use Chromium CDP.')
        const context=await browser.newContext({viewport:{width,height},hasTouch:input==='touch',reducedMotion:'reduce'})
        const page=await context.newPage()
        try {
            await preferences(page)
            await openSection(page,'about')
            await page.evaluate(()=>document.fonts.ready)
            const session=input==='touch' ? await context.newCDPSession(page) : null
            if(session) await session.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1})
            const scrollPosition=()=>page.evaluate(()=>{
                const scroller=document.documentElement.dataset.layout==='mobile'
                    ? document.scrollingElement : document.querySelector('#scrollable-about')
                return scroller.scrollTop
            })
            const popupCases=[
                ...[3,4,6].flatMap(id=>[0,1].map(index=>({
                    card:`#article-${id}-section-about .article-info-list-item.article-info-list-item-home`,index,
                    trigger:'.article-info-list-item-avatar-button',panel:'.article-info-list-item-text-bubble',
                    inner:'.article-info-list-item-text-bubble-inner'
                }))),
                ...['.article-stack-item-home-bubble-button','.article-stack-item-home-unit-trigger'].flatMap(trigger=>
                    [0,1].map(index=>({card:'#article-7-section-about .article-stack-item-home',index,trigger,
                        panel:'.article-stack-item-home-bubble',inner:'.article-stack-item-home-bubble-inner'})))
            ]
            for(const popup of popupCases) {
                const card=page.locator(popup.card).nth(popup.index)
                await card.locator(popup.trigger).click()
                const panel=card.locator(popup.panel)
                await expect(panel).toHaveAttribute('aria-hidden','false')
                const inner=card.locator(popup.inner)
                await inner.evaluate(element=>{
                    element.scrollIntoView({block:'center',behavior:'instant'})
                    element.scrollTop=0
                })
                const before=await scrollPosition()
                const bounds=await inner.boundingBox()
                const x=bounds.x+bounds.width/2
                const y=bounds.y+bounds.height/2
                if(session) {
                    await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x,y}]})
                    for(let step=1;step<=8;step++) {
                        await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x,y:y+step*20}]})
                        await page.evaluate(()=>new Promise(requestAnimationFrame))
                    }
                    await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
                } else {
                    await page.mouse.move(x,y)
                    await page.mouse.wheel(0,-160)
                }
                await expect.poll(scrollPosition,{message:`${popup.card} ${popup.index}: scroll escapes ${popup.trigger}`}).toBeLessThan(before-20)
                // Stats overlays intentionally let pointer input pass through;
                // their existing outside-touch dismissal must not block scrolling.
                if(input==='wheel' || popup.trigger==='.article-info-list-item-avatar-button')
                    await expect(panel).toHaveAttribute('aria-hidden','false')
                await page.mouse.move(0,0)
                await page.keyboard.press('Escape')
                await expect(panel).toHaveAttribute('aria-hidden','true')
            }
            await session?.detach()
        } finally {
            await context.close()
        }
    })
}

test('Home intro remains readable in a narrow landscape desktop pane', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:568,height:320})
    await openSection(page,'about')
    await page.waitForTimeout(250)
    const metrics=await page.evaluate(()=>{
        const rect=(selector)=>{
            const element=document.querySelector(selector)
            if(!element) return null
            const bounds=element.getBoundingClientRect()
            return {x:bounds.x,y:bounds.y,width:bounds.width,height:bounds.height,font:parseFloat(getComputedStyle(element).fontSize)}
        }
        return {
            viewport:innerWidth,
            documentWidth:document.documentElement.scrollWidth,
            introText:rect('.article-feature-item-home-style-intro .article-feature-item-text'),
            introImage:rect('.article-feature-item-home-style-intro .article-feature-item-image'),
            nameDisplay:rect('#article-5-section-about .name-origin-word')
        }
    })
    expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewport+1)
    expect(metrics.introText.width).toBeGreaterThan(260)
    expect(metrics.introText.font).toBeGreaterThanOrEqual(16)
    expect(metrics.introImage.width).toBeGreaterThan(120)
    expect(metrics.nameDisplay.font).toBeGreaterThanOrEqual(36)
    expect(metrics.nameDisplay.font).toBeLessThanOrEqual(60)
})

test('Home density reduction reaches medium desktop widths', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:1024,height:768})
    await openSection(page,'about')
    const metrics=await page.evaluate(()=>{
        const measure=(selector)=>{
            const element=document.querySelector(selector)
            if(!element) return null
            const rect=element.getBoundingClientRect()
            return {width:rect.width,height:rect.height,font:parseFloat(getComputedStyle(element).fontSize)}
        }
        return {
            layout:document.documentElement.dataset.layout,
            heading:measure('.section-header-home h2'),
            intro:measure('.article-feature-item-home-style-intro .article-feature-item-text'),
            portrait:measure('.article-feature-item-home-style-intro .article-feature-item-image'),
            skill:measure('#article-3-section-about .article-info-list-item-content'),
            stack:measure('#article-7-section-about .article-stack-item-home'),
            homeHeight:document.querySelector('#scrollable-about').scrollHeight
        }
    })

    expect(metrics.layout).toBe('normal')
    expect(metrics.heading.font).toBeLessThanOrEqual(26)
    expect(metrics.intro.font).toBeLessThanOrEqual(13.5)
    expect(metrics.portrait.width).toBeLessThanOrEqual(140)
    expect(metrics.skill.height).toBeLessThanOrEqual(115)
    expect(metrics.stack.height).toBeLessThanOrEqual(90)
    expect(metrics.homeHeight).toBeLessThan(2250)
})

test('Home mobile scale stays compact from tiny phones to tall touch displays', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:320,height:568})
    await openSection(page,'about')

    for(const [width,height] of [[280,653],[320,568],[390,844],[1440,2560]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
        const metrics=await page.evaluate(()=>{
            const measure=(selector)=>{
                const element=document.querySelector(selector)
                if(!element) return null
                const rect=element.getBoundingClientRect()
                const style=getComputedStyle(element)
                return {width:rect.width,height:rect.height,font:parseFloat(style.fontSize),line:parseFloat(style.lineHeight)}
            }
            return {
                viewport:innerWidth,
                documentWidth:document.documentElement.scrollWidth,
                heading:measure('.section-header-home h2'),
                articleTitle:measure('#article-3-section-about > .article-title'),
                contact:measure('#article-1-section-about .article-inline-list-item-control'),
                chip:measure('#article-1-section-about .article-inline-list-item-pill'),
                intro:measure('.article-feature-item-home-style-intro .article-feature-item-text'),
                portrait:measure('.article-feature-item-home-style-intro .article-feature-item-image'),
                skill:measure('#article-3-section-about .article-info-list-item-content'),
                skillTitle:measure('#article-3-section-about .article-info-list-item-info-title'),
                skillBody:measure('#article-3-section-about .article-info-list-item-info-text'),
                seeMore:measure('#article-3-section-about .collapsable-menu > button.see-more-button-modern'),
                stackSeeMore:measure('#article-7-section-about .collapsable-menu > button.see-more-button-modern'),
                name:measure('#article-5-section-about .name-origin-word'),
                nameCopy:measure('#article-5-section-about .name-origin-copy'),
                stack:measure('#article-7-section-about .article-stack-item-home'),
                stackTitle:measure('#article-7-section-about .article-stack-item-title-main')
            }
        })

        expect(metrics.documentWidth,`${width}x${height} document width`).toBeLessThanOrEqual(width+1)
        expect(metrics.heading.font,`${width}x${height} welcome title`).toBeLessThanOrEqual(26)
        expect(metrics.articleTitle.font,`${width}x${height} article title`).toBeLessThanOrEqual(18)
        expect(metrics.contact.height,`${width}x${height} touch target`).toBeGreaterThanOrEqual(43.5)
        expect(metrics.chip.height,`${width}x${height} visible contact chip`).toBeLessThanOrEqual(32)
        expect(metrics.intro.font,`${width}x${height} intro copy`).toBeLessThanOrEqual(15)
        expect(metrics.portrait.width,`${width}x${height} intro portrait`).toBeLessThanOrEqual(196)
        expect(metrics.skillTitle.font,`${width}x${height} skill title`).toBeLessThanOrEqual(15)
        expect(metrics.skillBody.font,`${width}x${height} skill copy`).toBeLessThanOrEqual(14)
        expect(metrics.skill.height,`${width}x${height} skill row`).toBeLessThanOrEqual(112)
        expect(metrics.seeMore.width,`${width}x${height} show-more width`).toBeLessThanOrEqual(154)
        expect(metrics.seeMore.height,`${width}x${height} show-more hit height`).toBe(44)
        expect(metrics.stackSeeMore.width,`${width}x${height} stack show-more width`).toBe(metrics.seeMore.width)
        expect(metrics.stackSeeMore.height,`${width}x${height} stack show-more hit height`).toBe(metrics.seeMore.height)
        expect(metrics.name.font,`${width}x${height} name display`).toBeLessThanOrEqual(64)
        expect(metrics.nameCopy.font,`${width}x${height} name copy`).toBeLessThanOrEqual(15)
        expect(metrics.stackTitle.font,`${width}x${height} stack title`).toBeLessThanOrEqual(18)
        expect(metrics.stack.height,`${width}x${height} stack card`).toBeLessThanOrEqual(104)
    }
})

test('Experience desktop density keeps all three articles compact and readable', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:1366,height:768})
    await openSection(page,'experience')

    for(const [width,height] of [[1366,768],[3440,1440]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        const metrics=await page.evaluate(()=>{
            const measure=(selector)=>{
                const element=document.querySelector(selector)
                if(!element) return null
                const rect=element.getBoundingClientRect()
                return {width:rect.width,height:rect.height,font:parseFloat(getComputedStyle(element).fontSize)}
            }
            const closingHeadings=[...document.querySelectorAll('#article-3-section-experience .article-text-flow-card-heading')].map(element=>{
                const rect=element.getBoundingClientRect()
                const header=element.closest('.article-text-flow-card-header').getBoundingClientRect()
                const style=getComputedStyle(element)
                return {
                    width:rect.width,
                    headerWidth:header.width,
                    height:rect.height,
                    lineHeight:parseFloat(style.lineHeight),
                    font:parseFloat(style.fontSize)
                }
            })
            return {
                sectionTitle:measure('#section-experience .section-header-title'),
                timelineHeading:measure('#article-1-section-experience > h4.article-title'),
                timelineTitle:measure('#article-1-section-experience .article-timeline-item-info-for-timelines-header-main h5'),
                timelineBody:measure('#article-1-section-experience .article-timeline-item-info-for-timelines-body-text'),
                timelineCard:measure('#article-1-section-experience .article-timeline-item-info-for-timelines'),
                avatar:measure('#article-1-section-experience .article-timeline-item-avatar--experience'),
                flyerHeading:measure('#article-2-section-experience > h4.article-title'),
                book:measure('#article-2-section-experience .wood-project'),
                flyerPage:measure('#article-2-section-experience .wood-project-flyer'),
                bookPage:measure('#article-2-section-experience .wood-project-page'),
                closingHeading:measure('#article-3-section-experience > h4.article-title'),
                closingCardHeading:measure('#article-3-section-experience .article-text-flow-card-heading'),
                closingHeadings,
                closingCopy:measure('#article-3-section-experience .pretext-draggable-inline-icon-text-paragraph'),
                dragTarget:measure('#article-3-section-experience .pretext-draggable-inline-icon-text-rail-hit-area'),
                documentWidth:document.documentElement.scrollWidth
            }
        })
        expect(metrics.sectionTitle.font).toBeGreaterThanOrEqual(25)
        expect(metrics.sectionTitle.font).toBeLessThanOrEqual(27)
        expect(metrics.timelineHeading.font).toBeLessThanOrEqual(31)
        expect(metrics.timelineTitle.font).toBeLessThanOrEqual(19)
        if(metrics.timelineCard.width<=1152) {
            expect(metrics.timelineBody.font).toBeGreaterThanOrEqual(10.8)
            expect(metrics.timelineBody.font).toBeLessThanOrEqual(11.6)
        } else {
            expect(metrics.timelineBody.font).toBeGreaterThanOrEqual(14.5)
            expect(metrics.timelineBody.font).toBeLessThanOrEqual(15.5)
        }
        expect(metrics.timelineCard.height).toBeLessThan(350)
        expect(metrics.avatar.width).toBeLessThanOrEqual(171)
        expect(metrics.flyerHeading.font).toBeGreaterThanOrEqual(17)
        expect(metrics.flyerHeading.font).toBeLessThanOrEqual(19)
        expect(metrics.book.width).toBeLessThanOrEqual(705)
        expect(metrics.bookPage.font).toBeGreaterThanOrEqual(14)
        expect(Math.abs(metrics.flyerPage.width-metrics.bookPage.width)).toBeLessThanOrEqual(1)
        expect(Math.abs(metrics.flyerPage.height-metrics.bookPage.height)).toBeLessThanOrEqual(1)
        expect(metrics.closingHeadings.every(heading=>Math.abs(heading.width-heading.headerWidth)<1)).toBe(true)
        expect(metrics.closingHeadings.every(heading=>Math.ceil(heading.height/heading.lineHeight)<=2)).toBe(true)
        expect(metrics.closingHeading.font).toBeLessThanOrEqual(18.5)
        expect(metrics.closingCardHeading.font).toBeLessThanOrEqual(19)
        if(width<1024) {
            expect(metrics.closingCopy.font).toBeGreaterThanOrEqual(13)
            expect(metrics.closingCopy.font).toBeLessThanOrEqual(14.5)
        } else {
            expect(metrics.closingCopy.font).toBeGreaterThanOrEqual(14)
            expect(metrics.closingCopy.font).toBeLessThanOrEqual(15.2)
        }
        expect(metrics.dragTarget.height).toBeGreaterThanOrEqual(52)
        expect(metrics.documentWidth).toBeLessThanOrEqual(width+1)
    }
})

test('Experience desktop density does not leak into narrow landscape or mobile', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:568,height:320})
    await openSection(page,'experience')
    const landscape=await page.locator('#article-1-section-experience .article-timeline-item-info-for-timelines-body-text').first().evaluate(element=>parseFloat(getComputedStyle(element).fontSize))
    expect(landscape).toBeGreaterThanOrEqual(15.5)

    await page.setViewportSize({width:390,height:844})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-1-section-experience .article-timeline-item-info-for-timelines-body-text').first()).toBeVisible()
    await expect(page.locator('#article-2-section-experience .wood-project-page')).toBeVisible()
    await expect(page.locator('#article-3-section-experience .pretext-draggable-inline-icon-text-rail-hit-area').first()).toBeVisible()
})

test('Experience timeline text scales with narrow desktop cards', async ({page})=>{
    await preferences(page)
    for(const [width,height] of [[800,650],[900,768],[1024,768],[1092,922],[1120,768],[1180,768],[1366,768]]) {
        await page.setViewportSize({width,height})
        await openSection(page,'experience')
        await expect(page.locator('html')).toHaveAttribute('data-layout','normal')
        const sizes=await page.locator('#article-1-section-experience .article-timeline-item-info-for-timelines-body').first().evaluate(body=>{
            const selectors=[
                '.article-timeline-item-info-for-timelines-body-text',
                '.article-timeline-item-info-for-timelines-body-list',
                '.article-timeline-item-info-for-timelines-body-list-item'
            ]
            return {
                cardWidth:body.closest('.article-timeline-item-info-for-timelines').getBoundingClientRect().width,
                bodyFont:parseFloat(getComputedStyle(body).fontSize),
                content:selectors.map(selector=>{
                const element=body.querySelector(selector)
                return {width:element.getBoundingClientRect().width,font:parseFloat(getComputedStyle(element).fontSize)}
                })
            }
        })
        expect(sizes.content.every(size=>size.width>0)).toBe(true)
        if(sizes.cardWidth<=1152) {
            expect(sizes.bodyFont).toBeGreaterThanOrEqual(10.8)
            expect(sizes.bodyFont).toBeLessThanOrEqual(11.6)
            expect(sizes.content.every(size=>size.font>=10.8&&size.font<=11.6)).toBe(true)
        } else {
            expect(sizes.content.every(size=>size.font<=15.5)).toBe(true)
        }
    }
})

test('Education desktop density compacts the timeline, certificates, and skills while preserving interactions', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:1366,height:768})
    await openSection(page,'education')

    const metrics=await page.evaluate(()=>{
        const measure=(selector)=>{
            const element=document.querySelector(selector)
            if(!element) return null
            const rect=element.getBoundingClientRect()
            return {width:rect.width,height:rect.height,font:parseFloat(getComputedStyle(element).fontSize)}
        }
        return {
            sectionTitle:measure('#section-education .section-header-title'),
            articleTitle:measure('#article-1-section-education > h4.article-title'),
            timelineCard:measure('#article-1-section-education .article-timeline-item-info-for-timelines'),
            avatar:measure('#article-1-section-education .article-timeline-item-avatar'),
            timelineTitle:measure('#article-1-section-education .article-timeline-item-info-for-timelines-header-main h5'),
            metaRow:measure('#article-1-section-education .article-timeline-item-info-for-timelines-education-meta-row'),
            certification:measure('#article-2-section-education .article-cards-item-education-certification'),
            skill:measure('#article-3-section-education .article-skills-item'),
            skillTitle:measure('#article-3-section-education .article-skills-item-title-main'),
            skillDescription:measure('#article-3-section-education .article-skills-item-description'),
            skillTrigger:measure('#article-3-section-education .article-skills-item-popup-trigger'),
            documentWidth:document.documentElement.scrollWidth
        }
    })

    expect(metrics.sectionTitle.font).toBeLessThanOrEqual(34)
    // Education's larger desktop heading is bounded at 2.3rem.
    expect(metrics.articleTitle.font).toBeGreaterThanOrEqual(31)
    expect(metrics.articleTitle.font).toBeLessThanOrEqual(37)
    expect(metrics.timelineCard.height).toBeLessThan(225)
    expect(metrics.avatar.width).toBeLessThanOrEqual(160)
    expect(metrics.timelineTitle.font).toBeGreaterThanOrEqual(15.5)
    expect(metrics.timelineTitle.font).toBeLessThanOrEqual(17.5)
    expect(metrics.metaRow.height).toBeLessThanOrEqual(30)
    expect(metrics.certification.height).toBeLessThan(330)
    expect(metrics.skill.height).toBeLessThan(128)
    expect(metrics.skillTitle.font).toBeGreaterThanOrEqual(15.5)
    expect(metrics.skillDescription.font).toBeGreaterThanOrEqual(13.5)
    expect(metrics.skillTrigger.width).toBeGreaterThanOrEqual(43.5)
    expect(metrics.skillTrigger.height).toBeGreaterThanOrEqual(43.5)
    expect(metrics.documentWidth).toBeLessThanOrEqual(1367)

    const firstTimelineCard=page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()
    await expect(firstTimelineCard.locator('.article-timeline-item-info-for-timelines-education-meta-row')).toHaveCount(4)
    await expect(firstTimelineCard.locator('.article-timeline-item-info-for-timelines-body-list')).toBeHidden()
    await firstTimelineCard.locator('.article-timeline-item-info-for-timelines-body-expand-button').click()
    await expect(firstTimelineCard.locator('.article-timeline-item-info-for-timelines-body-list')).toBeVisible()

    const certifications=page.locator('#article-2-section-education .article-cards-item-education-certification')
    await expect(certifications).toHaveCount(2)
    await expect(certifications.nth(1).locator('.article-cards-item-education-certification-status')).toContainText(/incoming/i)
    const certificationHeights=await certifications.evaluateAll(elements=>elements.map(element=>element.getBoundingClientRect().height))
    expect(Math.abs(certificationHeights[0]-certificationHeights[1])).toBeLessThanOrEqual(1)

    const skillTrigger=page.locator('#article-3-section-education .article-skills-item-popup-trigger').first()
    await expect(skillTrigger).toHaveCSS('min-height','44px')
    await skillTrigger.click()
    await expect(page.locator('#article-3-section-education .article-skills-item-popup-body.article-skills-item-popup-open').first()).toBeVisible()
    await skillTrigger.click()

    await page.setViewportSize({width:3440,height:1440})
    await page.reload()
    await page.evaluate(()=>{ if(location.hash!=='#education') location.hash='#education' })
    await expect(page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('data-layout','ultrawide')
    const ultrawide=await page.evaluate(()=>({
        sectionTitle:parseFloat(getComputedStyle(document.querySelector('#section-education .section-header-title')).fontSize),
        timelineCard:document.querySelector('#article-1-section-education .article-timeline-item-info-for-timelines').getBoundingClientRect().height,
        certification:document.querySelector('#article-2-section-education .article-cards-item-education-certification').getBoundingClientRect().height,
        skill:document.querySelector('#article-3-section-education .article-skills-item').getBoundingClientRect().height,
        documentWidth:document.documentElement.scrollWidth
    }))
    expect(ultrawide.sectionTitle).toBeLessThanOrEqual(34)
    expect(ultrawide.timelineCard).toBeLessThan(225)
    expect(ultrawide.certification).toBeLessThan(330)
    expect(ultrawide.skill).toBeLessThan(128)
    expect(ultrawide.documentWidth).toBeLessThanOrEqual(3441)
})

test('Education cards center on the full timeline while the year rail overlays the fading edge', async ({page})=>{
    await preferences(page)

    for (const viewport of [
        {width:280,height:653},
        {width:390,height:844},
        {width:768,height:1024},
        {width:1366,height:768},
        {width:3440,height:1440}
    ]) {
        await page.setViewportSize(viewport)
        await openSection(page,'education')

        const avatarLinks=await page.locator('#article-1-section-education a.article-timeline-item-avatar-link').evaluateAll(links=>
            links.map(link=>({href:link.href,target:link.target,rel:link.rel}))
        )
        expect(avatarLinks.length).toBeGreaterThan(0)
        for(const link of avatarLinks) {
            expect(link.href).toMatch(/^https?:\/\//)
            expect(link.target).toBe('_blank')
            expect(link.rel).toContain('noopener')
            expect(link.rel).toContain('noreferrer')
        }
        const avatarLeftEdges=await page.locator('#article-1-section-education .article-timeline-item-avatar-wrapper').evaluateAll(avatars=>
            avatars.map(avatar=>avatar.getBoundingClientRect().left)
        )
        expect(Math.min(...avatarLeftEdges),`${viewport.width}x${viewport.height}: ${JSON.stringify(avatarLeftEdges)}`).toBeGreaterThanOrEqual(-0.5)

        const geometry=await page.evaluate(()=>{
            const article=document.querySelector('#article-1-section-education')
            const panel=article.querySelector('.article-timeline-item-info-for-timelines')
            const axis=article.querySelector('.article-timeline-year-axis')
            const articleRect=article.getBoundingClientRect()
            const panelRect=panel.getBoundingClientRect()
            const axisRect=axis.getBoundingClientRect()
            const tube=article.querySelector('.article-timeline-item-info-for-timelines-education-meta-row')
            return {
                centerOffset:Math.abs((panelRect.left+panelRect.width/2)-(articleRect.left+articleRect.width/2)),
                panelRight:panelRect.right,
                axisLeft:axisRect.left,
                mask:getComputedStyle(panel,'::before').maskImage,
                tubeMask:getComputedStyle(tube,'::before').maskImage,
                tubeRightRadius:getComputedStyle(tube,'::before').borderTopRightRadius,
                documentWidth:document.documentElement.scrollWidth
            }
        })

        expect(geometry.centerOffset).toBeLessThanOrEqual(2)
        expect(geometry.panelRight).toBeGreaterThan(geometry.axisLeft)
        expect(geometry.mask).toContain('rgba(0, 0, 0, 0)')
        expect(geometry.mask).toContain('0.8')
        expect(geometry.tubeMask).toContain('rgba(0, 0, 0, 0)')
        expect(geometry.tubeRightRadius).toBe('0px')
        expect(geometry.documentWidth).toBeLessThanOrEqual(viewport.width+1)

        const expandButton=page.locator('#article-1-section-education .article-timeline-item-info-for-timelines-body-expand-button').first()
        const assertExpandButtonPlacement=async()=>{
            const placement=await expandButton.evaluate(button=>{
                const buttonRect=button.getBoundingClientRect()
                const cardRect=button.closest('.article-timeline-item-info-for-timelines').getBoundingClientRect()
                const style=getComputedStyle(button)
                return {
                    centerOffset:Math.abs((buttonRect.left+buttonRect.width/2)-(cardRect.left+cardRect.width/2)),
                    bottomGap:cardRect.bottom-buttonRect.bottom,
                    borderTopColor:style.borderTopColor,
                    backgroundColor:style.backgroundColor
                }
            })

            expect(placement.centerOffset).toBeLessThanOrEqual(1)
            expect(placement.bottomGap).toBeGreaterThanOrEqual(0)
            expect(placement.bottomGap).toBeLessThanOrEqual(1)
            expect(placement.borderTopColor).toBe('rgba(0, 0, 0, 0)')
            expect(placement.backgroundColor).toBe('rgba(0, 0, 0, 0)')
        }

        await expandButton.hover()
        await expect(expandButton).toHaveCSS('background-color','rgba(0, 0, 0, 0)')
        await assertExpandButtonPlacement()
        const firstCard=page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()
        const firstAvatar=page.locator('#article-1-section-education .article-timeline-item-avatar-wrapper').first()
        const avatarOffsetBeforeExpansion=await firstAvatar.evaluate(avatar=>{
            const itemRect=avatar.closest('.article-timeline-item').getBoundingClientRect()
            return avatar.getBoundingClientRect().top-itemRect.top
        })
        const clickCardEdge=async()=>{
            const position=await firstCard.evaluate(card=>({
                x:Math.max(1,card.clientWidth-4),
                y:Math.max(1,card.clientHeight/2)
            }))
            await firstCard.click({position})
        }

        await clickCardEdge()
        await expect(expandButton).toHaveAttribute('aria-expanded','true')
        await assertExpandButtonPlacement()
        const expandedAvatarGeometry=await firstAvatar.evaluate(avatar=>{
            const itemRect=avatar.closest('.article-timeline-item').getBoundingClientRect()
            return {
                topOffset:avatar.getBoundingClientRect().top-itemRect.top,
                computedTop:getComputedStyle(avatar).top,
                transform:getComputedStyle(avatar).transform,
                itemClass:avatar.closest('.article-timeline-item').className
            }
        })
        expect(expandedAvatarGeometry.topOffset).toBeLessThan(avatarOffsetBeforeExpansion)
        expect(expandedAvatarGeometry.topOffset,`${viewport.width}px: ${JSON.stringify(expandedAvatarGeometry)}`).toBeGreaterThanOrEqual(0)
        const listStyles=await firstCard.locator('.article-timeline-item-info-for-timelines-body-list').evaluate(list=>({
            listStyle:getComputedStyle(list).listStyleType,
            alignment:getComputedStyle(list.firstElementChild).textAlign
        }))
        expect(listStyles.listStyle).toBe('none')
        expect(listStyles.alignment).toBe('center')

        await clickCardEdge()
        await expect(expandButton).toHaveAttribute('aria-expanded','false')
        await expandButton.click()
        await expect(expandButton).toHaveAttribute('aria-expanded','true')
        await expandButton.click()
        await expect(expandButton).toHaveAttribute('aria-expanded','false')
    }
})

test('Education titles use a consistent full-width text box in every viewport', async ({page})=>{
    await preferences(page,'hr')

    for (const viewport of [
        {width:280,height:653},
        {width:390,height:844},
        {width:768,height:1024},
        {width:1366,height:768},
        {width:3440,height:1440}
    ]) {
        await page.setViewportSize(viewport)
        await openSection(page,'education')

        const title=page.locator('#article-1-section-education li[data-education-item-id="2"] .article-timeline-item-info-for-timelines-header-main h5')
        await expect(title).toHaveText('Inženjerska informatika')
        const box=await title.evaluate(element=>({
            width:element.getBoundingClientRect().width,
            parentWidth:element.parentElement.getBoundingClientRect().width,
            clientWidth:element.clientWidth,
            scrollWidth:element.scrollWidth,
            alignment:getComputedStyle(element).textAlign
        }))
        expect(Math.abs(box.width-box.parentWidth),`${viewport.width}px title fills its header`).toBeLessThanOrEqual(1)
        expect(box.scrollWidth,`${viewport.width}px title text fits its box`).toBeLessThanOrEqual(box.clientWidth+1)
        expect(box.alignment).toBe('center')
    }
})

test('Education language labels use the requested CEFR levels', async ({page})=>{
    await preferences(page,'hr')

    for(const viewport of [
        {width:280,height:653},
        {width:390,height:844},
        {width:768,height:1024},
        {width:1366,height:768},
        {width:3440,height:1440}
    ]) {
        await page.setViewportSize(viewport)
        await openSection(page,'education')

        const ratings=await page.locator('#article-3-section-education .article-skills-item-title-rating').evaluateAll(items=>
            items.map(rating=>{
                const card=rating.closest('.article-skills-item-info')
                const info=rating.closest('.article-skills-item-info-education-language')
                const title=card.querySelector('.article-skills-item-title-main')
                const rank=rating.querySelector('.article-skills-item-title-suffix')
                const separator=rating.querySelector('.article-skills-item-title-rating-separator')
                const percentage=rating.querySelector('.article-skills-item-title-rating-percentage')
                const titleRect=title.getBoundingClientRect()
                const ratingRect=rating.getBoundingClientRect()
                const rankRect=rank.getBoundingClientRect()
                const separatorRect=separator.getBoundingClientRect()
                const percentageRect=percentage.getBoundingClientRect()
                return {
                    language:card.querySelector('.article-skills-item-title-main').textContent.trim(),
                    rank:rank.textContent.trim(),
                    width:rating.getBoundingClientRect().width,
                    cardWidth:card.getBoundingClientRect().width,
                    infoWidth:info.clientWidth,
                    titleRight:titleRect.right,
                    titleBottom:titleRect.bottom,
                    ratingLeft:ratingRect.left,
                    ratingTop:ratingRect.top,
                    rankRight:rankRect.right,
                    separatorLeft:separatorRect.left,
                    separatorRight:separatorRect.right,
                    separatorWidth:separatorRect.width,
                    separatorHeight:separatorRect.height,
                    percentageLeft:percentageRect.left,
                    percentageWidth:percentageRect.width
                }
            })
        )

        expect(ratings).toHaveLength(6)
        expect(Object.fromEntries(ratings.map(({language,rank})=>[language,rank]))).toMatchObject({
            Hrvatski:'C2',
            Engleski:'C2',
            Njemački:'C2',
            Makedonski:'A2',
            Turski:'A2',
            'Kineski (mandarinski)':'A1'
        })
        for(const rating of ratings) {
            expect(rating.width,`${viewport.width}px: rating fits its card`).toBeLessThan(rating.cardWidth)
            expect(rating.separatorWidth).toBe(1)
            expect(rating.separatorHeight).toBeGreaterThan(0)
            expect(rating.separatorLeft).toBeGreaterThanOrEqual(rating.rankRight)
            expect(rating.percentageLeft).toBeGreaterThan(rating.separatorRight)
            expect(rating.percentageWidth).toBeGreaterThan(0)
            if(rating.infoWidth<=256) {
                expect(rating.ratingTop,`${viewport.width}px: compact title stacks its rating`).toBeGreaterThanOrEqual(rating.titleBottom)
            } else {
                expect(rating.titleRight,`${viewport.width}px: title leaves room for its rating`).toBeLessThanOrEqual(rating.ratingLeft+1)
            }
        }
        expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width+1)
    }
})

test('Education language ratings keep strong contrast in light mode', async ({page})=>{
    await preferences(page,'hr','light')
    await page.setViewportSize({width:390,height:844})
    await openSection(page,'education')

    const rating=page.locator('#article-3-section-education .article-skills-item-title-rating').first()
    const styles=await rating.evaluate(element=>({
        rankColor:getComputedStyle(element.querySelector('.article-skills-item-title-suffix')).color,
        percentageColor:getComputedStyle(element.querySelector('.article-skills-item-title-rating-percentage')).color,
        percentageTextShadow:getComputedStyle(element.querySelector('.article-skills-item-title-rating-percentage')).textShadow,
        separatorColor:getComputedStyle(element.querySelector('.article-skills-item-title-rating-separator')).backgroundColor
    }))
    expect(styles.rankColor).toBe('rgb(146, 64, 14)')
    expect(styles.percentageColor).toBe('rgb(51, 65, 85)')
    expect(styles.percentageTextShadow).toBe('none')
    expect(styles.separatorColor).toBe('rgba(51, 65, 85, 0.48)')
})

test('Education language cards use a balanced frame and readable phrase rows in both themes', async ({page})=>{
    for(const theme of ['dark','light']) {
        const themePage=theme==='dark'?page:await page.context().newPage()
        await preferences(themePage,'hr',theme)
        await themePage.setViewportSize({width:390,height:844})
        await openSection(themePage,'education')

        const card=themePage.locator('#article-3-section-education .article-skills-item-education-language').first()
        const frame=await card.evaluate(element=>({
            width:element.getBoundingClientRect().width,
            decorationWidth:parseFloat(getComputedStyle(element,'::after').width),
            decorationLeft:getComputedStyle(element,'::after').left
        }))
        expect(frame.decorationWidth,`${theme} language card has a full-width frame`).toBeGreaterThanOrEqual(frame.width-2)
        expect(frame.decorationLeft).toBe('0px')

        await card.locator('.article-skills-item-popup-trigger').click()
        const popup=card.locator('.article-skills-item-popup-body-inner')
        await expect(popup).toBeVisible()
        const rows=await card.locator('.article-skills-item-popup-row').evaluateAll(elements=>elements.map(element=>({
            text:element.textContent.trim(),
            color:getComputedStyle(element).color,
            background:getComputedStyle(element).backgroundImage,
            radius:getComputedStyle(element).borderRadius,
            separator:getComputedStyle(element).borderBottomStyle,
            shadow:getComputedStyle(element).textShadow,
            height:element.getBoundingClientRect().height
        })))
        expect(rows.length).toBeGreaterThan(1)
        expect(rows.every((row,index)=>row.text && row.height>0 && row.background==='none' && row.radius==='0px' && row.separator===(index===rows.length-1?'none':'solid') && row.shadow==='none')).toBeTruthy()
        expect(rows.every(row=>row.color===(theme==='light'?'rgb(23, 36, 58)':'rgb(236, 244, 255)')),JSON.stringify({theme,rows})).toBeTruthy()

        if(themePage!==page)
            await themePage.close()
    }
})

test('Education language phrase popups expand in flow and push later cards down', async ({page})=>{
    await preferences(page,'hr')

    for(const [width,height] of [[390,844],[1366,768]]) {
        await page.setViewportSize({width,height})
        await openSection(page,'education')

        const firstCard=page.locator('#article-3-section-education .article-skills-column').first().locator('.article-skills-item-education-language').first()
        const nextCard=firstCard.locator('xpath=following-sibling::*[1]')
        await expect(firstCard).toBeVisible()
        await expect(nextCard).toBeVisible()
        const [firstBefore,nextBefore]=await Promise.all([firstCard.boundingBox(),nextCard.boundingBox()])

        const trigger=firstCard.locator('.article-skills-item-popup-trigger')
        if(width>=576)
            await trigger.hover()
        else
            await trigger.click()
        await expect(firstCard.locator('.article-skills-item-popup-body')).toBeVisible()
        const allRowsFit=await firstCard.locator('.article-skills-item-popup-body-inner').evaluate(inner=>{
            const bounds=inner.getBoundingClientRect()
            return [...inner.querySelectorAll('.article-skills-item-popup-row')].every(row=>{
                const rowBounds=row.getBoundingClientRect()
                return rowBounds.top>=bounds.top-1 && rowBounds.bottom<=bounds.bottom+1
            })
        })
        const [firstAfter,nextAfter]=await Promise.all([firstCard.boundingBox(),nextCard.boundingBox()])
        expect(allRowsFit,`${width}px: every phrase is visible inside the expanded popup`).toBe(true)
        expect(nextAfter.y-firstAfter.y,`${width}px: next card starts after expanded card`).toBeGreaterThanOrEqual(firstAfter.height-1)
        if(firstAfter.height>firstBefore.height+12)
            expect(nextAfter.y-firstAfter.y,`${width}px: following card moves down to make room`).toBeGreaterThan(nextBefore.y-firstBefore.y+12)
    }
})

test('Education avatar links open in a separate tab on click', async ({page,context})=>{
    await preferences(page)
    await page.setViewportSize({width:390,height:844})
    await openSection(page,'education')

    const avatarLink=page.locator('#article-1-section-education a.article-timeline-item-avatar-link').first()
    const destination=await avatarLink.getAttribute('href')
    const newPagePromise=context.waitForEvent('page')
    await avatarLink.click()
    const newPage=await newPagePromise
    await expect(newPage).toHaveURL(destination)
    await newPage.close()
})

test('Education desktop density stays off in narrow landscape and mobile modes', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:568,height:320})
    await openSection(page,'education')
    await expect(page.locator('html')).toHaveAttribute('data-layout','normal')
    await expect(page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()).toBeVisible()
    await expect(page.locator('#article-2-section-education .article-cards-item-education-certification')).toHaveCount(2)

    await page.setViewportSize({width:390,height:844})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()).toBeVisible()
    await expect(page.locator('#article-1-section-education .article-timeline-item-info-for-timelines-education-meta-row').first()).toBeVisible()
    await expect(page.locator('#article-3-section-education .article-skills-item-popup-trigger').first()).toBeVisible()
    const documentWidth=await page.evaluate(()=>document.documentElement.scrollWidth)
    expect(documentWidth).toBeLessThanOrEqual(391)

    await page.setViewportSize({width:1440,height:2560})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()).toBeVisible()
    await expect(page.locator('#article-3-section-education .article-skills-item-popup-trigger').first()).toBeVisible()
})

test('Headerless decorated pages keep the top band flush to the scroll pane', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:1440,height:2560})

    for(const route of ['my-software','my-hardware','my-writings','my-art']) {
        await openSection(page,route)
        await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
        const topGap=await page.locator('#scrollable-'+route).evaluate(scrollable=>{
            const band=scrollable.querySelector('.section-decoration-boundary-page-top')
            const wrapper=scrollable.closest('.scrollable-wrapper')
            return band.getBoundingClientRect().top-wrapper.getBoundingClientRect().top
        })
        expect(topGap,route+' top decoration band meets the scroll pane edge').toBeLessThanOrEqual(1)
    }
})

test('Education connector stays visible through card surfaces in both themes', async ({page})=>{
    await page.setViewportSize({width:390,height:844})

    for(const theme of ['dark','light']) {
        await page.goto('/#about')
        await page.evaluate(theme=>localStorage.setItem('storage-preferences',JSON.stringify({preferredLanguage:'en',preferredTheme:theme,preferredCursorMode:'system'})),theme)
        await page.reload()
        await openSection(page,'education')
        await expect(page.locator('html')).toHaveAttribute('data-theme',theme)
        const card=page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()
        await card.hover()

        const layers=await page.locator('#article-1-section-education').evaluate(article=>({
            theme:document.documentElement.dataset.theme,
            connector:getComputedStyle(article.querySelector('.article-timeline-education-snake')).zIndex,
            card:getComputedStyle(article.querySelector('.article-timeline-item-content')).zIndex,
            cardSurfaceOwner:getComputedStyle(article.querySelector('.article-timeline-item-info-for-timelines')).zIndex,
            content:getComputedStyle(article.querySelector('.article-timeline-item-info-for-timelines').firstElementChild).zIndex,
            contentPosition:getComputedStyle(article.querySelector('.article-timeline-item-info-for-timelines').firstElementChild).position,
            yearAxis:getComputedStyle(article.querySelector('.article-timeline-year-axis')).zIndex,
            yearAxisLine:getComputedStyle(article.querySelector('.article-timeline-year-axis'),'::before').zIndex,
            yearTick:getComputedStyle(article.querySelector('.article-timeline-year-axis-tick')).zIndex,
            metaPillSurface:getComputedStyle(article.querySelector('.article-timeline-item-info-for-timelines-education-meta-row'),'::before').backgroundColor,
            detailPillSurface:getComputedStyle(article.querySelector('.article-timeline-item-info-for-timelines-body-list-item'),'::before').backgroundColor,
            schoolFactPillSurfaces:[4,5].map(id=>{
                const text=article.querySelector(`li[data-education-item-id="${id}"] .article-timeline-item-info-for-timelines-body-text`)
                return getComputedStyle(text,'::before').backgroundColor
            }),
            cardSurface:getComputedStyle(article.querySelector('.article-timeline-item-info-for-timelines'),'::before').backgroundImage,
            cardSurfaceShadow:getComputedStyle(article.querySelector('.article-timeline-item-info-for-timelines'),'::before').boxShadow,
            connectorOpacity:getComputedStyle(article.querySelector('.article-timeline-education-snake path')).opacity,
            connectorFilter:getComputedStyle(article.querySelector('.article-timeline-education-snake path')).filter,
            transform:getComputedStyle(article.querySelector('.article-timeline-item-info-for-timelines')).transform,
            item:getComputedStyle(article.querySelector('.article-timeline-item')).zIndex,
            avatar:getComputedStyle(article.querySelector('.article-timeline-item-avatar-wrapper')).zIndex
        }))

        expect(layers.card).toBe('3')
        expect(Number(layers.cardSurfaceOwner)).toBeGreaterThan(Number(layers.connector))
        expect(Number(layers.content)).toBeGreaterThan(Number(layers.connector))
        expect(layers.contentPosition).toBe('relative')
        expect(layers.yearAxis).toBe('auto')
        expect(Number(layers.yearAxisLine)).toBeLessThan(Number(layers.cardSurfaceOwner))
        expect(Number(layers.yearTick)).toBeGreaterThan(Number(layers.cardSurfaceOwner))
        expect(layers.metaPillSurface).not.toBe('rgba(0, 0, 0, 0)')
        expect(layers.detailPillSurface).not.toBe('rgba(0, 0, 0, 0)')
        expect(layers.cardSurface).toBe('none')
        expect(layers.cardSurfaceShadow).toBe('none')
        if(theme==='light') {
            expect(layers.connectorOpacity,JSON.stringify(layers)).toBe('0.48')
            expect(layers.connectorFilter).toBe('none')
            expect(layers.metaPillSurface).toBe('rgba(255, 255, 255, 0.82)')
            expect(layers.detailPillSurface).toBe('rgba(255, 255, 255, 0.7)')
            expect(layers.schoolFactPillSurfaces).toEqual(['rgba(255, 255, 255, 0.7)','rgba(255, 255, 255, 0.7)'])
        } else {
            expect(layers.metaPillSurface).toBe('rgba(8, 15, 29, 0.82)')
            expect(layers.detailPillSurface).toBe('rgba(8, 15, 29, 0.7)')
            expect(layers.schoolFactPillSurfaces).toEqual(['rgba(8, 15, 29, 0.7)','rgba(8, 15, 29, 0.7)'])
        }
        expect(layers.transform).toBe('none')
        expect(layers.item).toBe('auto')
        expect(Number(layers.avatar)).toBeGreaterThan(Number(layers.connector))
    }

    const schoolFactAlignments=await page.locator('#article-1-section-education li[data-education-item-id="4"], #article-1-section-education li[data-education-item-id="5"]')
        .locator('.article-timeline-item-info-for-timelines-body-text')
        .evaluateAll(elements=>elements.map(element=>getComputedStyle(element).textAlign))
    expect(schoolFactAlignments).toEqual(['center','center'])
})

test('Education hover motion stays restrained and stops for reduced motion', async ({page})=>{
    await page.setViewportSize({width:1280,height:900})
    await page.emulateMedia({reducedMotion:'no-preference'})
    await preferences(page,'en','dark')
    await openSection(page,'education')

    const timelineCard=page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()
    await timelineCard.hover()
    expect(await timelineCard.evaluate(element=>getComputedStyle(element).transform)).toBe('none')

    const showMore=page.locator('#article-1-section-education button.article-timeline-see-more-button').first()
    if(await showMore.isVisible()) {
        await showMore.hover()
        await expectHoverTranslateY(showMore,-1)
    }

    const skillCard=page.locator('article.article-skills-article-3-section-education .article-skills-item').first()
    await skillCard.hover()
    await expectHoverTranslateY(skillCard,-1)

    const certification=page.locator('#article-2-section-education .article-cards-item-education-certification').first()
    await certification.hover()
    await expectHoverTranslateY(certification,-1)

    // Change the theme in-place so the second mode exercises the same mounted
    // cards instead of triggering another cold lazy-section load.
    const themeToggle=page.locator('.nav-tools-item-theme button.btn-option-picker-toggle').first()
    await themeToggle.click()
    await expect(page.locator('html')).toHaveAttribute('data-theme','light')
    const lightCertification=page.locator('#article-2-section-education .article-cards-item-education-certification').first()
    await lightCertification.hover()
    await expectHoverTranslateY(lightCertification,-1)

    await page.emulateMedia({reducedMotion:'reduce'})
    await timelineCard.hover()
    await expectNoMotion(timelineCard)
    await skillCard.hover()
    await expectNoMotion(skillCard)
    await certification.hover()
    await expectNoMotion(certification)
    if(await showMore.isVisible()) {
        await showMore.hover()
        await expectNoMotion(showMore)
    }
})

test('Education card copy is pure black in light mode over transparent surfaces', async ({page})=>{
    await page.setViewportSize({width:390,height:844})
    await preferences(page,'en','light')
    await openSection(page,'education')
    await expect(page.locator('html')).toHaveAttribute('data-theme','light')

    const firstCard=page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()
    await expect(firstCard).toBeVisible()

    const colors=await firstCard.evaluate(element=>[element,...element.querySelectorAll('*')].map(node=>getComputedStyle(node).color))
    expect(new Set(colors)).toEqual(new Set(['rgb(0, 0, 0)']))
    expect(await firstCard.evaluate(element=>getComputedStyle(element).backgroundColor)).toBe('rgba(0, 0, 0, 0)')

    const timelineShadows=await page.locator('#article-1-section-education .article-timeline-item-info-for-timelines-header-main h5').evaluateAll(elements=>elements.map(element=>getComputedStyle(element).textShadow))
    expect(timelineShadows.length).toBeGreaterThan(1)
    expect(timelineShadows.every(shadow=>shadow.includes('2px'))).toBeTruthy()
    expect(timelineShadows[0]).not.toBe(timelineShadows[1])

    const certificationShadows=await page.locator('#article-2-section-education .article-cards-item-education-certification-frame *').evaluateAll(elements=>elements.map(element=>getComputedStyle(element).textShadow))
    expect(certificationShadows.length).toBeGreaterThan(0)
    expect(certificationShadows.every(shadow=>shadow.includes('2px'))).toBeTruthy()

    const skillShadows=await page.locator('#article-3-section-education .article-skills-item-info .article-skills-item-title-main, #article-3-section-education .article-skills-item-info .article-skills-item-experience, #article-3-section-education .article-skills-item-info .article-skills-item-description').evaluateAll(elements=>elements.map(element=>getComputedStyle(element).textShadow))
    expect(skillShadows.length).toBeGreaterThan(0)
    expect(skillShadows.every(shadow=>shadow.includes('2px'))).toBeTruthy()
})

test('Education card copy is pure white in dark mode over transparent surfaces', async ({page})=>{
    await page.setViewportSize({width:390,height:844})
    await preferences(page,'en','dark')
    await openSection(page,'education')
    await expect(page.locator('html')).toHaveAttribute('data-theme','dark')

    const firstCard=page.locator('#article-1-section-education .article-timeline-item-info-for-timelines').first()
    await expect(firstCard).toBeVisible()

    const colors=await firstCard.evaluate(element=>[element,...element.querySelectorAll('*')].map(node=>getComputedStyle(node).color))
    expect(new Set(colors)).toEqual(new Set(['rgb(255, 255, 255)']))
    expect(await firstCard.evaluate(element=>getComputedStyle(element).backgroundColor)).toBe('rgba(0, 0, 0, 0)')

    const timelineShadows=await page.locator('#article-1-section-education .article-timeline-item-info-for-timelines-header-main h5').evaluateAll(elements=>elements.map(element=>getComputedStyle(element).textShadow))
    expect(timelineShadows.length).toBeGreaterThan(1)
    expect(timelineShadows.every(shadow=>shadow.includes('2px'))).toBeTruthy()
    expect(timelineShadows[0]).not.toBe(timelineShadows[1])

    const certificationShadows=await page.locator('#article-2-section-education .article-cards-item-education-certification-frame *').evaluateAll(elements=>elements.map(element=>getComputedStyle(element).textShadow))
    expect(certificationShadows.length).toBeGreaterThan(0)
    expect(certificationShadows.every(shadow=>shadow.includes('2px'))).toBeTruthy()

    const skillShadows=await page.locator('#article-3-section-education .article-skills-item-info .article-skills-item-title-main, #article-3-section-education .article-skills-item-info .article-skills-item-experience, #article-3-section-education .article-skills-item-info .article-skills-item-description').evaluateAll(elements=>elements.map(element=>getComputedStyle(element).textShadow))
    expect(skillShadows.length).toBeGreaterThan(0)
    expect(skillShadows.every(shadow=>shadow.includes('2px'))).toBeTruthy()
})

test('Portfolio project actions stay left and visit links stay right at every layout width', async ({page})=>{
    await preferences(page)

    for(const section of ['my-software','my-hardware']) {
        await page.setViewportSize({width:390,height:844})
        await openSection(page,section)

        const article=page.locator(`#article-1-section-${section}`)
        const card=article.locator('.article-portfolio-item:has(.article-portfolio-item-control-btn-visit)').first()
        await expect(card).toBeVisible()

        for(const [width,height] of [[280,653],[390,844],[568,320],[1366,768],[3440,1440]]) {
            await page.setViewportSize({width,height})
            const positions=await card.locator('.article-portfolio-item-controls').evaluate(controls=>{
                const box=element=>{
                    const {left,right}=element.getBoundingClientRect()
                    return {left,right}
                }
                const actions=controls.querySelector('.article-portfolio-item-actions')
                const visitDock=controls.querySelector('.article-portfolio-item-visit-dock')
                const visit=visitDock.querySelector('.article-portfolio-item-control-btn-visit')
                return {
                    controls:box(controls),
                    actions:actions?box(actions):null,
                    visitDock:box(visitDock),
                    visit:box(visit),
                    visitDockAlignment:getComputedStyle(visitDock).justifyContent
                }
            })

            expect(positions.visitDockAlignment,`${section} ${width}x${height} visit dock`).toBe('flex-end')
            if(positions.actions) {
                expect(positions.actions.left,`${section} ${width}x${height} action group`).toBeGreaterThanOrEqual(positions.controls.left-1)
                expect(positions.actions.left,`${section} ${width}x${height} action group`).toBeLessThan(positions.visit.left)
            }
            expect(Math.abs(positions.visit.right-positions.visitDock.right),`${section} ${width}x${height} visit link`).toBeLessThanOrEqual(1)
        }
    }
})

test('Software desktop density compacts project cards and testimonials without shrinking actions', async ({page})=>{
    await preferences(page)

    for(const [index,[width,height]] of [[1366,768],[3440,1440]].entries()) {
        await page.setViewportSize({width,height})
        if(index===0) await openSection(page,'my-software')
        else {
            await page.reload()
            await expect(page.locator('#article-1-section-my-software .article-portfolio-item').first()).toBeVisible()
        }
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))

        const metrics=await page.evaluate(()=>{
            const measure=(selector)=>{
                const element=document.querySelector(selector)
                if(!element) return null
                const rect=element.getBoundingClientRect()
                return {width:rect.width,height:rect.height,font:parseFloat(getComputedStyle(element).fontSize),lineHeight:parseFloat(getComputedStyle(element).lineHeight)}
            }
            return {
                portfolioHeading:measure('#article-1-section-my-software > h4.article-title'),
                project:measure('#article-1-section-my-software .article-portfolio-item'),
                projectTitle:measure('#article-1-section-my-software .article-portfolio-item-title-main'),
                projectCategory:measure('#article-1-section-my-software .article-portfolio-item-title-category'),
                projectCopy:measure('#article-1-section-my-software .article-portfolio-item-body-description'),
                projectAction:measure('#article-1-section-my-software .article-portfolio-item-control-btn'),
                filter:measure('#article-1-section-my-software .category-filter-button'),
                testimonialIntro:measure('#article-2-section-my-software .article-testimonials-intro'),
                testimonialHeading:measure('#article-2-section-my-software .article-testimonials-group-title'),
                testimonialQuote:measure('#article-2-section-my-software .article-testimonials-item-balloon'),
                testimonialCopy:measure('#article-2-section-my-software .balloon'),
                testimonialAvatar:measure('#article-2-section-my-software .article-testimonials-item-avatar'),
                testimonialName:measure('#article-2-section-my-software .article-testimonials-item-name'),
                testimonialRole:measure('#article-2-section-my-software .article-testimonials-item-role'),
                documentWidth:document.documentElement.scrollWidth
            }
        })

        expect(metrics.project.height).toBeLessThan(320)
        expect(metrics.portfolioHeading.font).toBeGreaterThanOrEqual(24)
        expect(metrics.portfolioHeading.font).toBeLessThanOrEqual(27)
        expect(metrics.projectTitle.font).toBeGreaterThanOrEqual(18)
        expect(metrics.projectTitle.font).toBeLessThanOrEqual(21)
        expect(metrics.projectCategory.font).toBeLessThanOrEqual(15)
        expect(metrics.projectCopy.font).toBeGreaterThanOrEqual(13.5)
        expect(metrics.projectCopy.font).toBeLessThanOrEqual(16)
        expect(metrics.projectAction.height).toBeGreaterThanOrEqual(44)
        expect(metrics.filter.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.testimonialIntro.font).toBeLessThanOrEqual(17)
        expect(metrics.testimonialHeading.font).toBeLessThanOrEqual(21)
        expect(metrics.testimonialCopy.font).toBeGreaterThanOrEqual(20)
        expect(metrics.testimonialCopy.font).toBeLessThanOrEqual(22)
        expect(metrics.testimonialAvatar.width).toBeLessThanOrEqual(86)
        expect(metrics.testimonialName.font).toBeLessThanOrEqual(17)
        expect(metrics.testimonialRole.font).toBeLessThanOrEqual(15)
        expect(metrics.documentWidth).toBeLessThanOrEqual(width+1)

        if(index===0) {
            const projects=page.locator('#article-1-section-my-software .article-portfolio-item')
            await expect(projects).toHaveCount(7)
            await page.getByRole('button',{name:/University/}).click()
            await expect(page.locator('#article-1-section-my-software .article-portfolio-item:visible')).toHaveCount(2)
            await page.getByRole('button',{name:/All Projects/}).click()
            await expect(page.locator('#article-1-section-my-software .article-portfolio-item:visible')).toHaveCount(7)
        }
    }
})

test('Software desktop density stays off in narrow landscape and mobile modes', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:568,height:320})
    await openSection(page,'my-software')
    await expect(page.locator('html')).toHaveAttribute('data-layout','normal')
    await expect(page.locator('#article-1-section-my-software .article-portfolio-item').first()).toBeVisible()
    await expect(page.locator('#article-2-section-my-software .article-testimonials-item-balloon').first()).toBeVisible()

    await page.setViewportSize({width:390,height:844})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-1-section-my-software .article-portfolio-item').first()).toBeVisible()
    expect(await page.locator('#article-1-section-my-software > h4.article-title').evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeLessThanOrEqual(20)
    await expect(page.locator('#article-2-section-my-software .article-testimonials-item-balloon').first()).toBeVisible()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391)

    await page.setViewportSize({width:1440,height:2560})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-1-section-my-software .article-portfolio-item').first()).toBeVisible()
    expect(await page.locator('#article-1-section-my-software > h4.article-title').evaluate(el=>parseFloat(getComputedStyle(el).fontSize))).toBeLessThanOrEqual(27)
    await expect(page.locator('#article-2-section-my-software .article-testimonials-item-balloon').first()).toBeVisible()
})

test('Software mobile filters and project cards use compact type with full-size targets', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:390,height:844})
    await openSection(page,'my-software')

    for(const [width,height] of [[280,653],[320,568],[390,844],[1440,2560]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('#article-1-section-my-software .article-portfolio-item').first()).toBeVisible()
        const metrics=await page.evaluate(()=>{
            const measure=(selector)=>{
                const element=document.querySelector(selector)
                if(!element) return null
                const rect=element.getBoundingClientRect()
                const style=getComputedStyle(element)
                return {width:rect.width,height:rect.height,font:parseFloat(style.fontSize),padding:style.padding}
            }
            return {
                viewport:innerWidth,
                documentWidth:document.documentElement.scrollWidth,
                filter:measure('#article-1-section-my-software .article-category-filter'),
                filterButton:measure('#article-1-section-my-software .article-category-filter button'),
                filterLabel:measure('#article-1-section-my-software .article-category-filter button .category-filter-button-label'),
                card:measure('#article-1-section-my-software .article-portfolio-item'),
                title:measure('#article-1-section-my-software .article-portfolio-item-title-main'),
                category:measure('#article-1-section-my-software .article-portfolio-item-title-category'),
                copy:measure('#article-1-section-my-software .article-portfolio-item-body-description'),
                action:measure('#article-1-section-my-software .article-portfolio-item-control-btn')
            }
        })
        expect(metrics.documentWidth,`${width}x${height} page width`).toBeLessThanOrEqual(width+1)
        expect(metrics.filter.height,`${width}x${height} filter frame`).toBeLessThanOrEqual(102)
        expect(metrics.filterButton.height,`${width}x${height} filter target`).toBeGreaterThanOrEqual(43.5)
        expect(metrics.filterLabel.font,`${width}x${height} filter label`).toBeLessThanOrEqual(13)
        expect(metrics.title.font,`${width}x${height} project title`).toBeLessThanOrEqual(19)
        expect(metrics.category.font,`${width}x${height} project category`).toBeLessThanOrEqual(14)
        expect(metrics.copy.font,`${width}x${height} project copy`).toBeLessThanOrEqual(15)
        expect(metrics.action.height,`${width}x${height} project action`).toBeGreaterThanOrEqual(43.5)
    }
})

test('Software and Hardware filters use only 2×2 or 1×4 layouts', async ({page})=>{
    await preferences(page)

    for(const section of ['my-software','my-hardware']) {
        for(const [width,height] of [[280,653],[390,844],[429,900],[600,900],[1366,768],[1440,2560]]) {
            await page.setViewportSize({width,height})
            await openSection(page,section)

            const filter=page.locator(`#article-1-section-${section} .article-category-filter`)
            await expect(filter).toBeVisible()
            const layout=await filter.evaluate(element=>{
                const style=getComputedStyle(element)
                return {
                    columns:style.gridTemplateColumns.split(' ').length,
                    rows:style.gridTemplateRows.split(' ').length,
                    contentWidth:element.closest('.article-content').getBoundingClientRect().width
                }
            })

            await expect(filter.locator('button')).toHaveCount(4)
            const expectedColumns=layout.contentWidth>=512?4:2
            expect(layout.columns,`${section} filter columns at ${width}×${height} (content ${layout.contentWidth}px)`).toBe(expectedColumns)
            expect(layout.rows,`${section} filter rows at ${width}×${height}`).toBe(expectedColumns===4?1:2)
        }
    }
})

test('Hardware wide cards remain readable and passive probe rows use their width', async ({page})=>{
    await preferences(page,'hr','dark')
    await page.setViewportSize({width:1801,height:2549})
    await openSection(page,'my-hardware')

    for(const [width,height] of [[1801,2549],[2333,2364],[3440,1440],[1366,768],[390,844]]) {
        await page.setViewportSize({width,height})
        await expect.poll(async()=>page.evaluate(()=>{
            const issues=[]
            const collection=document.querySelector('#article-1-section-my-hardware .article-portfolio-items')
            if(collection.clientWidth>=1536) {
                const card=collection.querySelector('.article-portfolio-item')
                if(card.getBoundingClientRect().width<440) issues.push('wide projects keep adding small columns')
                if(parseFloat(getComputedStyle(card.querySelector('.article-portfolio-item-title-main')).fontSize)<19)
                    issues.push('wide project title remains too small')
            }
            const workspace=document.querySelector('#article-2-section-my-hardware > .article-content')
            const style=getComputedStyle(workspace)
            const contentWidth=workspace.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight)
            if(contentWidth>=896) {
                const body=workspace.querySelector('.accent-passive .article-data-probe-item-body')
                const metadata=body.querySelector('.article-data-probe-item-meta').getBoundingClientRect()
                const value=body.querySelector('.article-data-probe-item-value').getBoundingClientRect()
                if(metadata.right>value.left+1) issues.push('wide passive readings still stack explanations and values')
                if(value.right>body.getBoundingClientRect().right+1) issues.push('probe value overflows its row')
            }
            if(document.documentElement.scrollWidth>innerWidth+1) issues.push('page overflows horizontally')
            return issues
        }),{message:`${width}x${height}: Hardware uses wide space without small cards or empty reading bands`}).toEqual([])
    }
})

test('Writings word stage fills large articles and scales its interactive cloud', async ({page})=>{
    await preferences(page,'hr','light')
    await page.setViewportSize({width:1801,height:2549})
    await openSection(page,'my-writings')
    await expect(page.locator('.article-falling-words-stage')).toHaveClass(/falling-words-ready/)

    for(const [width,height] of [[1801,2549],[2333,2364],[3440,1440],[1440,2560],[390,844]]) {
        await page.setViewportSize({width,height})
        await expect.poll(async()=>page.evaluate(()=>{
            const issues=[]
            const article=document.querySelector('.article-falling-words')
            const parent=article.parentElement.getBoundingClientRect()
            const bounds=article.getBoundingClientRect()
            const stage=article.querySelector('.article-falling-words-stage').getBoundingClientRect()
            if(bounds.width<parent.width*.95) issues.push('word article leaves unused page width')
            if(stage.left<bounds.left-1 || stage.right>bounds.right+1) issues.push('word stage overflows the article')
            if(article.clientWidth>=1536) {
                const word=article.querySelector('.falling-word')
                if(parseFloat(getComputedStyle(word).fontSize)<16) issues.push('wide word cloud retains phone type size')
                if(stage.height<460) issues.push('wide word stage remains too short')
            }
            return issues
        }),{message:`${width}x${height}: word stage uses its article width`}).toEqual([])
    }

    await page.setViewportSize({width:2333,height:2364})
    await page.locator('.article-falling-words-stage .falling-word').first().evaluate(element=>{
        const bounds=element.getBoundingClientRect()
        const pointer={bubbles:true,cancelable:true,pointerId:7,pointerType:'mouse',button:0,
            clientX:bounds.left+bounds.width/2,clientY:bounds.top+bounds.height/2}
        element.dispatchEvent(new PointerEvent('pointerdown',pointer))
        window.dispatchEvent(new PointerEvent('pointerup',pointer))
    })
    const definition=page.locator('.article-falling-words .falling-words-modal-card')
    await expect(definition).toBeVisible()
    await definition.getByRole('button',{name:/Close definition|Zatvori/}).click()
    await expect(definition).toHaveCount(0)
})

test('Hardware desktop density compacts project cards and DataProbe without shrinking controls', async ({page})=>{
    await preferences(page)

    for(const [index,[width,height]] of [[1366,768],[3440,1440]].entries()) {
        await page.setViewportSize({width,height})
        if(index===0) await openSection(page,'my-hardware')
        else {
            await page.reload()
            await expect(page.locator('#article-1-section-my-hardware .article-portfolio-item').first()).toBeVisible()
        }
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))

        const metrics=await page.evaluate(()=>{
            const measure=(selector)=>{
                const element=document.querySelector(selector)
                if(!element) return null
                const rect=element.getBoundingClientRect()
                return {width:rect.width,height:rect.height,font:parseFloat(getComputedStyle(element).fontSize),lineHeight:parseFloat(getComputedStyle(element).lineHeight)}
            }
            return {
                project:measure('#article-1-section-my-hardware .article-portfolio-item'),
                projectTitleBand:measure('#article-1-section-my-hardware .article-portfolio-item-title'),
                projectTitle:measure('#article-1-section-my-hardware .article-portfolio-item-title-main'),
                projectCategory:measure('#article-1-section-my-hardware .article-portfolio-item-title-category'),
                projectCopy:measure('#article-1-section-my-hardware .article-portfolio-item-body-description'),
                projectAction:measure('#article-1-section-my-hardware .article-portfolio-item-control-btn'),
                filter:measure('#article-1-section-my-hardware .category-filter-button'),
                summary:measure('#article-2-section-my-hardware .article-data-probe-summary'),
                probeBlock:measure('#article-2-section-my-hardware .article-data-probe-block'),
                probeItem:measure('#article-2-section-my-hardware .article-data-probe-item'),
                probeTitle:measure('#article-2-section-my-hardware .article-data-probe-item-title'),
                probeMeta:measure('#article-2-section-my-hardware .article-data-probe-item-meta'),
                probeValue:measure('#article-2-section-my-hardware .article-data-probe-item-value'),
                unlock:measure('#article-2-section-my-hardware .article-data-probe-unlock-btn'),
                documentWidth:document.documentElement.scrollWidth
            }
        })

        expect(metrics.project.height).toBeLessThan(390)
        expect(metrics.projectTitleBand.height).toBeLessThan(100)
        expect(metrics.projectTitle.font).toBeGreaterThanOrEqual(16)
        expect(metrics.projectTitle.font).toBeLessThanOrEqual(19)
        expect(metrics.projectCategory.font).toBeLessThanOrEqual(14)
        expect(metrics.projectCopy.font).toBeGreaterThanOrEqual(13.5)
        expect(metrics.projectCopy.font).toBeLessThanOrEqual(16)
        expect(metrics.projectAction.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.filter.height).toBeGreaterThanOrEqual(43.5)
        // The glass-workspace metrics have 54px rows plus summary padding.
        expect(metrics.summary.height).toBeGreaterThanOrEqual(54)
        expect(metrics.summary.height).toBeLessThanOrEqual(80)
        expect(metrics.probeBlock.height).toBeLessThan(470)
        expect(metrics.probeItem.height).toBeLessThan(365)
        expect(metrics.probeTitle.font).toBeGreaterThanOrEqual(15)
        expect(metrics.probeMeta.font).toBeGreaterThanOrEqual(13.5)
        expect(metrics.probeValue.font).toBeGreaterThanOrEqual(13.5)
        expect(metrics.unlock.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.documentWidth).toBeLessThanOrEqual(width+1)

        if(index===0) {
            const hardwareArticle=page.locator('#article-1-section-my-hardware')
            const projects=hardwareArticle.locator('.article-portfolio-item')
            const visibleProjects=hardwareArticle.locator('.article-portfolio-item:visible')
            const personalFilter=hardwareArticle.getByRole('button',{name:/Personal/})
            const allProjectsFilter=hardwareArticle.getByRole('button',{name:/All Projects/})
            await expect(projects).toHaveCount(8)
            await personalFilter.click()
            await expect(personalFilter).toHaveAttribute('aria-pressed','true')
            await expect(visibleProjects).toHaveCount(4)
            await allProjectsFilter.click()
            await expect(allProjectsFilter).toHaveAttribute('aria-pressed','true')
            await expect(visibleProjects).toHaveCount(8)

            const probe=page.locator('#article-2-section-my-hardware')
            const itemCountBefore=await probe.locator('.article-data-probe-item').count()
            const unlock=probe.locator('.article-data-probe-unlock-btn')
            await expect(unlock).toBeVisible()
            await unlock.click()
            await expect(unlock).toBeHidden()
            await expect(probe.locator('.article-data-probe-grid-fixed-two .article-data-probe-item').first()).toBeVisible()
            expect(await probe.locator('.article-data-probe-item').count()).toBeGreaterThan(itemCountBefore)
            const probeButtons=await probe.locator('button.article-data-probe-action-btn, button.article-data-probe-unlock-btn, button.copy-button.copy-button-pill').evaluateAll(buttons=>buttons.map(button=>Math.min(button.getBoundingClientRect().width,button.getBoundingClientRect().height)))
            expect(probeButtons.every(size=>size>=43.5)).toBe(true)
        }
    }
})

test('Hardware project title bands stay compact from tiny phones to tall mobile screens', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:390,height:844})
    await openSection(page,'my-hardware')

    for(const [width,height] of [[280,653],[390,844],[429,900],[1440,2560]]) {
        await page.setViewportSize({width,height})
        const title=page.locator('#article-1-section-my-hardware .article-portfolio-item-title').first()
        await expect(title).toBeVisible()
        const card=page.locator('#article-1-section-my-hardware .article-portfolio-item').first()
        const metrics=await title.evaluate(element=>({
            height:element.getBoundingClientRect().height,
            titleFont:parseFloat(getComputedStyle(element.querySelector('.article-portfolio-item-title-main')).fontSize),
            categoryFont:parseFloat(getComputedStyle(element.querySelector('.article-portfolio-item-title-category')).fontSize)
        }))
        const bodyFont=await card.locator('.article-portfolio-item-body-description').evaluate(element=>parseFloat(getComputedStyle(element).fontSize))
        const controlHeight=await card.locator('.article-portfolio-item-control-btn').first().evaluate(element=>element.getBoundingClientRect().height)
        expect(metrics.height,`${width}×${height} Hardware title band`).toBeLessThan(100)
        expect(metrics.titleFont,`${width}×${height} Hardware title`).toBeLessThanOrEqual(19)
        expect(metrics.categoryFont,`${width}×${height} Hardware category`).toBeLessThanOrEqual(14)
        expect(bodyFont,`${width}×${height} Hardware description`).toBeLessThanOrEqual(15)
        expect(controlHeight,`${width}×${height} Hardware action`).toBeGreaterThanOrEqual(43.5)
        expect(controlHeight,`${width}×${height} Hardware action`).toBeLessThanOrEqual(50)
        expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1)
    }
})

test('DataProbe typography stays compact on tiny, regular, and tall mobile screens', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:390,height:844})
    await openSection(page,'my-hardware')

    const probe=page.locator('#article-2-section-my-hardware')
    for(const [width,height] of [[280,653],[390,844],[429,900],[1440,2560]]) {
        await page.setViewportSize({width,height})
        await expect(probe.locator('.article-title-text')).toBeVisible()
        const metrics=await probe.evaluate(element=>{
            const font=selector=>{
                const target=element.querySelector(selector)
                return target?parseFloat(getComputedStyle(target).fontSize):null
            }
            const action=element.querySelector('button.article-data-probe-action-btn, button.article-data-probe-unlock-btn')
            return {
                title:font('.article-title-text'),
                intro:font('.article-data-probe-intro'),
                summaryValue:font('.article-data-probe-summary-value'),
                summaryLabel:font('.article-data-probe-summary-label'),
                blockTitle:font('.article-data-probe-block-title'),
                blockDescription:font('.article-data-probe-block-description'),
                itemTitle:font('.article-data-probe-item-title'),
                itemMeta:font('.article-data-probe-item-meta'),
                actionFont:action?parseFloat(getComputedStyle(action).fontSize):null,
                actionHeight:action?action.getBoundingClientRect().height:null,
                documentWidth:document.documentElement.scrollWidth
            }
        })
        expect(metrics.title,`${width}×${height} DataProbe title`).toBeLessThanOrEqual(22)
        expect(metrics.intro,`${width}×${height} DataProbe intro`).toBeLessThanOrEqual(15)
        expect(metrics.summaryValue,`${width}×${height} summary value`).toBeLessThanOrEqual(16)
        expect(metrics.summaryLabel,`${width}×${height} summary label`).toBeLessThanOrEqual(13.5)
        expect(metrics.blockTitle,`${width}×${height} block title`).toBeLessThanOrEqual(16)
        expect(metrics.blockDescription,`${width}×${height} block description`).toBeLessThanOrEqual(15)
        expect(metrics.itemTitle,`${width}×${height} item title`).toBeLessThanOrEqual(15.5)
        expect(metrics.itemMeta,`${width}×${height} item metadata`).toBeLessThanOrEqual(13.5)
        expect(metrics.actionFont,`${width}×${height} action text`).toBeLessThanOrEqual(14)
        expect(metrics.actionHeight,`${width}×${height} action target`).toBeGreaterThanOrEqual(43.5)
        expect(metrics.actionHeight,`${width}×${height} action target`).toBeLessThanOrEqual(50)
        expect(metrics.documentWidth,`${width}×${height} document width`).toBeLessThanOrEqual(width+1)
    }
})

test('DataProbe mobile vertical rhythm stays compact without shrinking controls', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:390,height:844})
    await openSection(page,'my-hardware')

    const probe=page.locator('#article-2-section-my-hardware')
    for(const [width,height] of [[280,653],[320,568],[390,844],[429,900],[1440,2560]]) {
        await page.setViewportSize({width,height})
        const metrics=await probe.evaluate(element=>{
            const style=selector=>getComputedStyle(element.querySelector(selector))
            const firstCard=element.querySelector('.accent-external .article-data-probe-item')
            const action=firstCard.querySelector('.article-data-probe-action-btn')
            return {
                contentWidth:element.querySelector('.article-content').getBoundingClientRect().width,
                introBottom:parseFloat(style('.article-data-probe-intro').marginBottom),
                sectionTop:parseFloat(style('.article-data-probe-block').marginTop),
                sectionPadding:parseFloat(style('.article-data-probe-block').paddingTop),
                cardPadding:parseFloat(getComputedStyle(firstCard).paddingTop),
                cardHeight:firstCard.getBoundingClientRect().height,
                metadataColumns:style('.article-data-probe-item-meta-row').gridTemplateColumns.split(' ').length,
                actionHeight:action.getBoundingClientRect().height
            }
        })
        expect(metrics.contentWidth,`${width}x${height} content fills the article`).toBeGreaterThan(width*.9)
        expect(metrics.introBottom,`${width}x${height} intro spacing`).toBeLessThanOrEqual(13)
        expect(metrics.sectionTop,`${width}x${height} section spacing`).toBeLessThanOrEqual(11)
        expect(metrics.sectionPadding,`${width}x${height} section padding`).toBeLessThanOrEqual(13)
        expect(metrics.cardPadding,`${width}x${height} reading-card padding`).toBeLessThanOrEqual(11)
        expect(metrics.metadataColumns,`${width}x${height} metadata columns`).toBe(2)
        expect(metrics.cardHeight,`${width}x${height} reading-card height`).toBeLessThan(400)
        expect(metrics.actionHeight,`${width}x${height} action target`).toBeGreaterThanOrEqual(43.5)
    }
})

test('DataProbe passive readings stay one item per row at every screen width', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:390,height:844})
    await openSection(page,'my-hardware')

    const passiveGrid=page.locator('#article-2-section-my-hardware .accent-passive .article-data-probe-grid-single-column')
    for(const [width,height] of [[280,653],[390,844],[429,900],[1366,768],[1440,2560],[3440,1440]]) {
        await page.setViewportSize({width,height})
        await expect(passiveGrid).toBeVisible()
        const layout=await passiveGrid.evaluate(element=>({
            columns:getComputedStyle(element).gridTemplateColumns.split(' ').length,
            rows:getComputedStyle(element).gridTemplateRows.split(' ').length,
            items:element.querySelectorAll('.article-data-probe-item').length
        }))
        expect(layout.columns,`${width}×${height} passive columns`).toBe(1)
        expect(layout.rows,`${width}×${height} passive rows`).toBe(layout.items)
    }
})

test('Hardware desktop density stays off in narrow landscape and mobile modes', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:568,height:320})
    await openSection(page,'my-hardware')
    await expect(page.locator('html')).toHaveAttribute('data-layout','normal')
    await expect(page.locator('#article-1-section-my-hardware .article-portfolio-item').first()).toBeVisible()
    await expect(page.locator('#article-2-section-my-hardware .article-data-probe-item').first()).toBeVisible()
    const narrowCardHeight=await page.locator('#article-1-section-my-hardware .article-portfolio-item').first().evaluate(element=>element.getBoundingClientRect().height)
    expect(narrowCardHeight).toBeGreaterThan(400)

    await page.setViewportSize({width:390,height:844})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-1-section-my-hardware .article-portfolio-item').first()).toBeVisible()
    await expect(page.locator('#article-2-section-my-hardware .article-data-probe-item').first()).toBeVisible()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391)

    await page.setViewportSize({width:1440,height:2560})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-1-section-my-hardware .article-portfolio-item').first()).toBeVisible()
    await expect(page.locator('#article-2-section-my-hardware .article-data-probe-item').first()).toBeVisible()
    const tallMobileFont=await page.locator('#article-1-section-my-hardware .article-portfolio-item-body-description').first().evaluate(element=>parseFloat(getComputedStyle(element).fontSize))
    expect(tallMobileFont).toBeLessThanOrEqual(15)
})

test('Writings desktop density compacts the timeline, interactive word stage, feature, skills, and manuscript', async ({page})=>{
    await preferences(page)

    for(const [index,[width,height]] of [[1366,768],[3440,1440]].entries()) {
        await page.setViewportSize({width,height})
        if(index===0) await openSection(page,'my-writings')
        else {
            await page.reload()
            await expect(page.locator('#article-1-section-my-writings .article-timeline-item-info-for-timelines').first()).toBeVisible()
        }
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))

        const metrics=await page.evaluate(()=>{
            const measure=(selector)=>{
                const element=document.querySelector(selector)
                if(!element) return null
                const rect=element.getBoundingClientRect()
                return {width:rect.width,height:rect.height,font:parseFloat(getComputedStyle(element).fontSize),lineHeight:parseFloat(getComputedStyle(element).lineHeight)}
            }
            return {
                timeline:measure('#article-1-section-my-writings .article-timeline-item-info-for-timelines'),
                timelineAvatar:measure('#article-1-section-my-writings .article-timeline-item-avatar'),
                timelineTitle:measure('#article-1-section-my-writings .article-timeline-item-info-for-timelines-header-main h5'),
                timelineCopy:measure('#article-1-section-my-writings .article-timeline-item-info-for-timelines-body-text'),
                fallingHint:measure('#article-2-section-my-writings .article-falling-words-hint'),
                fallingStage:measure('#article-2-section-my-writings .article-falling-words-stage'),
                feature:measure('#article-3-section-my-writings .article-feature-item'),
                featureText:measure('#article-3-section-my-writings .article-feature-item-text'),
                skill:measure('#article-4-section-my-writings .article-skills-item'),
                skillTitle:measure('#article-4-section-my-writings .article-skills-item-title-main'),
                manuscript:measure('#article-6-section-my-writings .illustrated-manuscript'),
                manuscriptCanvas:measure('#article-6-section-my-writings canvas.illustrated-manuscript-canvas'),
                documentWidth:document.documentElement.scrollWidth
            }
        })

        expect(metrics.timeline.height).toBeLessThan(230)
        expect(metrics.timelineAvatar.width).toBeGreaterThanOrEqual(100)
        expect(metrics.timelineAvatar.width).toBeLessThanOrEqual(120)
        expect(metrics.timelineTitle.font).toBeGreaterThanOrEqual(18)
        expect(metrics.timelineCopy.font).toBeGreaterThanOrEqual(16)
        expect(metrics.fallingHint.height).toBeLessThanOrEqual(72)
        expect(metrics.fallingStage.height).toBeGreaterThanOrEqual(379)
        expect(metrics.fallingStage.height).toBeLessThanOrEqual(441)
        expect(metrics.feature.height).toBeLessThan(550)
        expect(metrics.featureText.font).toBeGreaterThanOrEqual(17)
        expect(metrics.featureText.font).toBeLessThanOrEqual(20)
        expect(metrics.skill.height).toBeLessThan(70)
        expect(metrics.skillTitle.font).toBeGreaterThanOrEqual(16)
        expect(metrics.manuscript.width).toBeLessThanOrEqual(721)
        expect(metrics.manuscript.height).toBeLessThanOrEqual(810)
        expect(metrics.manuscriptCanvas.width).toBeGreaterThan(0)
        expect(metrics.manuscriptCanvas.height).toBeGreaterThan(0)
        expect(metrics.manuscript.height/metrics.manuscript.width).toBeGreaterThan(1.1)
        expect(metrics.documentWidth).toBeLessThanOrEqual(width+1)

        if(index===0) {
            await expect(page.locator('#article-1-section-my-writings .article-timeline-item-info-for-timelines')).toHaveCount(3)
            await expect(page.locator('#article-4-section-my-writings .article-skills-item')).toHaveCount(6)
            await expect(page.locator('#article-5-section-my-writings .article-skills-item')).toHaveCount(6)
            expect(await page.locator('#article-2-section-my-writings .falling-word').count()).toBeGreaterThan(100)

            await page.locator('#article-2-section-my-writings .falling-word').first().evaluate(element=>{
                const rect=element.getBoundingClientRect()
                const pointer={
                    bubbles:true,
                    cancelable:true,
                    pointerId:7,
                    pointerType:'mouse',
                    button:0,
                    clientX:rect.left+rect.width/2,
                    clientY:rect.top+rect.height/2
                }
                element.dispatchEvent(new PointerEvent('pointerdown',pointer))
                window.dispatchEvent(new PointerEvent('pointerup',pointer))
            })
            const definition=page.locator('#article-2-section-my-writings .falling-words-modal-card')
            await expect(definition).toBeVisible()
            await definition.getByRole('button',{name:'Close definition'}).click()
            await expect(definition).toHaveCount(0)

            const timelineActions=page.locator('#article-1-section-my-writings .article-timeline-item-info-preview-footer a:visible, #article-1-section-my-writings .article-timeline-item-info-preview-footer button:visible')
            const actionHeights=await timelineActions.evaluateAll(elements=>elements.map(element=>element.getBoundingClientRect().height))
            expect(actionHeights.every(height=>height>=43.5)).toBe(true)
        }
    }
})

test('Writings desktop density stays off in narrow landscape and mobile modes', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:568,height:320})
    await openSection(page,'my-writings')
    await expect(page.locator('html')).toHaveAttribute('data-layout','normal')
    await expect(page.locator('#article-1-section-my-writings .article-timeline-item-info-for-timelines').first()).toBeVisible()
    await expect(page.locator('#article-2-section-my-writings .article-falling-words-stage')).toBeVisible()
    const landscapeTimelineHeight=await page.locator('#article-1-section-my-writings .article-timeline-item-info-for-timelines').first().evaluate(element=>element.getBoundingClientRect().height)
    expect(landscapeTimelineHeight).toBeGreaterThan(250)

    await page.setViewportSize({width:390,height:844})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-3-section-my-writings .article-feature-item-text')).toBeVisible()
    await expect(page.locator('#article-4-section-my-writings .article-skills-item').first()).toBeVisible()
    await expect(page.locator('#article-6-section-my-writings canvas.illustrated-manuscript-canvas')).toBeVisible()
    const phoneWordFont=await page.locator('#article-2-section-my-writings .falling-word').first().evaluate(element=>parseFloat(getComputedStyle(element).fontSize))
    expect(phoneWordFont).toBeGreaterThanOrEqual(10)
    expect(phoneWordFont).toBeLessThanOrEqual(14.4)
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391)

    await page.setViewportSize({width:1440,height:2560})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-2-section-my-writings .article-falling-words-stage')).toBeVisible()
    const tallMobileWordFont=await page.locator('#article-2-section-my-writings .falling-word').first().evaluate(element=>parseFloat(getComputedStyle(element).fontSize))
    expect(tallMobileWordFont).toBeGreaterThanOrEqual(10)
    expect(tallMobileWordFont).toBeLessThanOrEqual(14.4)
    await expect(page.locator('#article-6-section-my-writings canvas.illustrated-manuscript-canvas')).toBeVisible()
})

test('FallingWords hint wraps inside a content-height card without spacing gaps', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:390,height:844})
    await openSection(page,'my-writings')

    const hint=page.locator('#article-2-section-my-writings .article-falling-words-hint')
    const stage=page.locator('#article-2-section-my-writings .article-falling-words-stage')
    for(const [width,height] of [[280,653],[390,844],[508,900],[1366,768],[1440,2560]]) {
        await page.setViewportSize({width,height})
        const geometry=await hint.evaluate(element=>{
            const style=getComputedStyle(element)
            const rect=element.getBoundingClientRect()
            const textRange=document.createRange()
            textRange.selectNodeContents(element)
            const text=textRange.getBoundingClientRect()
            const iconStyle=getComputedStyle(element,'::before')
            return {
                height:rect.height,
                textLeft:text.left-rect.left,
                textRight:rect.right-text.right,
                iconRight:parseFloat(iconStyle.left)+parseFloat(iconStyle.width),
                paddingLeft:parseFloat(style.paddingLeft),
                paddingRight:parseFloat(style.paddingRight),
                verticalSlack:rect.height-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom)-text.height,
                scrollHeight:element.scrollHeight,
                clientHeight:element.clientHeight
            }
        })
        const stageTop=await stage.evaluate(element=>element.getBoundingClientRect().top)
        const hintBottom=await hint.evaluate(element=>element.getBoundingClientRect().bottom)
        expect(geometry.height,`${width}x${height} hint height`).toBeLessThan(160)
        expect(geometry.textLeft,`${width}x${height} text clears the info icon`).toBeGreaterThanOrEqual(geometry.iconRight+8)
        expect(geometry.textLeft,`${width}x${height} text respects the reserved left padding`).toBeGreaterThanOrEqual(geometry.paddingLeft-1)
        expect(geometry.textRight,`${width}x${height} text respects right inset`).toBeGreaterThanOrEqual(geometry.paddingRight-1)
        expect(geometry.verticalSlack,`${width}x${height} unused vertical space`).toBeLessThanOrEqual(24)
        expect(geometry.scrollHeight,`${width}x${height} hint content`).toBeLessThanOrEqual(geometry.clientHeight+1)
        expect(stageTop,`${width}x${height} hint and stage do not overlap`).toBeGreaterThanOrEqual(hintBottom-1)
    }
})

test('Art spotlight fills its article and WebArt text shares the entry band when it fits', async ({page})=>{
    await preferences(page,'hr','dark')
    await page.setViewportSize({width:1366,height:768})
    await openSection(page,'my-art')
    const portraitSizes=[]

    for(const [width,height] of [[1366,768],[390,844],[768,1024],[1440,2560],[2333,2364],[3840,2160]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        await expect.poll(async()=>page.evaluate(()=>{
            const content=document.querySelector('.article-artist-spotlight > .article-content').getBoundingClientRect()
            const shell=document.querySelector('.artist-spotlight-shell').getBoundingClientRect()
            const row=document.querySelector('.article-web-art-intro-guide-top-row').getBoundingClientRect()
            const copy=document.querySelector('.article-web-art-intro-guide-lines').getBoundingClientRect()
            const actions=document.querySelector('.article-web-art-intro-cover-buttons').getBoundingClientRect()
            const issues=[]
            if(Math.abs(content.width-shell.width)>2) issues.push('spotlight leaves unused article width')
            if(copy.left<row.left-1 || copy.right>row.right+1 || actions.left<row.left-1 || actions.right>row.right+1)
                issues.push('guide text or actions overflow their band')
            if(row.width>=800 && (copy.right>actions.left+1 || copy.top>=actions.bottom || actions.top>=copy.bottom))
                issues.push('wide guide does not share one band')
            if(row.width>=800 && Math.abs(actions.right-row.right)>1) issues.push('wide actions are not right aligned')
            if(row.width<600 && actions.top<copy.bottom-1) issues.push('narrow guide actions overlap the text')
            return issues
        }),{message:`${width}x${height}: spotlight and WebArt adapt to their available width`}).toEqual([])
        portraitSizes.push(await page.locator('.artist-spotlight-shell').evaluate(shell=>({
            width:shell.getBoundingClientRect().width,
            portrait:shell.querySelector('.artist-spotlight-avatar-link').getBoundingClientRect().width
        })))
    }

    const medium=portraitSizes[0]
    const largest=portraitSizes.reduce((largest,size)=>size.width>largest.width?size:largest)
    expect(largest.portrait).toBeGreaterThan(medium.portrait*1.5)

    await page.locator('.article-web-art-intro-cover-button-primary').click()
    await expect(page.locator('.article-web-art-intro-cover-hidden')).toBeVisible()
    await expect.poll(async()=>page.locator('.article-web-art-intro-guide-top-row').evaluate(row=>{
        const band=row.getBoundingClientRect()
        const copy=row.querySelector('.article-web-art-intro-guide-lines').getBoundingClientRect()
        const actions=row.querySelector('.article-web-art-intro-cover-buttons').getBoundingClientRect()
        return copy.right<=actions.left+1 && Math.abs(actions.right-band.right)<=1 &&
            copy.top<actions.bottom && actions.top<copy.bottom
    }),{message:'open gallery keeps its actions beside the guide text'}).toBe(true)
})

test('Art wide layouts balance albums, digital cards, spotlight and educator icons', async ({page})=>{
    await preferences(page,'hr','light')
    await page.setViewportSize({width:2333,height:2364})
    await openSection(page,'my-art')
    await expect(page.locator('#article-4-section-my-art .article-stack-item-compact')).toHaveCount(71)

    for(const [width,height] of [[2333,2364],[1920,2560],[1801,2549],[3440,1440],[1440,2560],[1366,768],[768,1024],[390,844]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        await expect.poll(async()=>page.evaluate(()=>{
            const issues=[]
            const photo=document.querySelector('.article-timeline--art-photography')
            const albums=[...photo.querySelectorAll('li.article-timeline-item')].slice(0,3).map(item=>item.getBoundingClientRect())
            const digital=document.querySelector('.article-timeline--art-digital-expression .article-timeline-items')
            const cards=[...digital.children].map(item=>item.getBoundingClientRect())
            const columns=getComputedStyle(digital).gridTemplateColumns.split(' ').length
            if(cards.length!==4 || ![1,2,4].includes(columns)) issues.push('digital cards leave an orphan row')
            if(columns===4 && cards.some(card=>Math.abs(card.top-cards[0].top)>1)) issues.push('digital cards are not all on the same row')
            if(photo.clientWidth>=1536) {
                if(albums.some(album=>Math.abs(album.top-albums[0].top)>1)) issues.push('wide photo albums do not share one row')
                const hero=document.querySelector('.artist-spotlight-hero').getBoundingClientRect()
                const release=document.querySelector('.artist-spotlight-release').getBoundingClientRect()
                if(hero.right>release.left+1 || Math.abs(hero.top-release.top)>1) issues.push('wide spotlight does not balance hero and player side by side')
                const releaseElement=document.querySelector('.artist-spotlight-release')
                const releaseStyle=getComputedStyle(releaseElement)
                const main=releaseElement.querySelector('.artist-spotlight-release-main').getBoundingClientRect()
                const availableHeight=releaseElement.clientHeight-parseFloat(releaseStyle.paddingTop)-parseFloat(releaseStyle.paddingBottom)
                if(Math.abs(main.height-availableHeight)>2) issues.push('wide player leaves unused panel height')
                const record=releaseElement.querySelector('.artist-spotlight-turntable').getBoundingClientRect()
                if(record.width<main.width*0.35) issues.push('wide player record does not scale with its row')
                const seek=releaseElement.querySelector('.artist-spotlight-local-player input').getBoundingClientRect()
                if(record.right>seek.left+1 || seek.right>main.right+1 || seek.bottom>main.bottom+1)
                    issues.push('wide player controls overlap or overflow the row')
                const tile=document.querySelector('#article-4-section-my-art .article-stack-item-compact').getBoundingClientRect()
                const icon=document.querySelector('#article-4-section-my-art .article-stack-item-avatar').getBoundingClientRect()
                if(icon.width<tile.width*0.45) issues.push('educator icon remains too small for its tile')
            }
            return issues
        }),{message:`${width}x${height}: Art wide layouts remain balanced`}).toEqual([])
    }
})

test('Art photography actions fit their rows across large screens and mobile', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:1366,height:768})
    await openSection(page,'my-art')

    for(const [width,height] of [[1366,768],[1920,1080],[3440,1440],[3840,2160],[1440,2560],[2333,2364],[390,844]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        await expect.poll(async()=>page.locator('#article-1-section-my-art').evaluate(article=>{
            const bounds=article.getBoundingClientRect()
            return [...article.querySelectorAll('li.article-timeline-item')].flatMap((row,index)=>{
                const rowBounds=row.getBoundingClientRect()
                if(rowBounds.width===0) return []
                if(rowBounds.left<bounds.left-1 || rowBounds.right>bounds.right+1)
                    return [`row ${index}: extends past article`]
                const card=row.querySelector('.article-timeline-item-content').getBoundingClientRect()
                return [...row.querySelectorAll('.article-timeline-item-info-preview-footer')].flatMap(footer=>{
                    const rail=footer.getBoundingClientRect()
                    if(rail.width===0) return []
                    const links=[...footer.querySelectorAll('a.article-item-preview-menu-link')]
                    const first=links[0].getBoundingClientRect()
                    const last=links[links.length-1].getBoundingClientRect()
                    const outsideCard=rail.left>=card.right-1 || rail.right<=card.left+1
                    const issues=[]
                    if(outsideCard && Math.abs(rail.height-rowBounds.height)>1)
                        issues.push(`row ${index}: action rail does not fill the row height`)
                    if(Math.abs((first.top+last.bottom-rail.top-rail.bottom)/2)>1)
                        issues.push(`row ${index}: action stack is not centered vertically`)
                    return issues.concat(links.flatMap(link=>{
                        const action=link.getBoundingClientRect()
                        const button=link.querySelector('button').getBoundingClientRect()
                        const contained=action.left>=rowBounds.left-1 && action.right<=rowBounds.right+1 &&
                            action.top>=rowBounds.top-1 && action.bottom<=rowBounds.bottom+1
                        const framed=Math.abs(action.width-button.width)<=2 && Math.abs(action.height-button.height)<=2
                        const copy=row.querySelector('.article-timeline-item-info-for-timelines-body').getBoundingClientRect()
                        const issues=[]
                        if(!contained) issues.push(`row ${index}: action extends past row (${action.left},${action.right},${action.top},${action.bottom}) vs (${rowBounds.left},${rowBounds.right},${rowBounds.top},${rowBounds.bottom})`)
                        if(!framed) issues.push(`row ${index}: button does not fit frame`)
                        if(action.width<43.5 || action.height<43.5) issues.push(`row ${index}: action too small`)
                        if(!outsideCard && copy.right>rail.left+1) issues.push(`row ${index}: action overlaps copy`)
                        return issues
                    }))
                })
            })
        }),{message:`${width}x${height}: photography action frames stay inside the row and clear the story`}).toEqual([])
    }
})

test('Art desktop density compacts timelines, WebArt, stack cards, and SecretPearls', async ({page})=>{
    test.setTimeout(150000)
    await preferences(page)

    for(const [index,[width,height]] of [[1366,768],[3440,1440]].entries()) {
        await page.setViewportSize({width,height})
        if(index===0) await openSection(page,'my-art')
        else {
            await page.reload()
            await expect(page.locator('#article-1-section-my-art .article-timeline-item-info-for-timelines').first()).toBeVisible()
        }
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        await expect(page.locator('#article-4-section-my-art .article-stack-item-compact')).toHaveCount(71,{timeout:10000})

        const metrics=await page.evaluate(()=>{
            const measure=(selector)=>{
                const element=document.querySelector(selector)
                if(!element) return null
                const rect=element.getBoundingClientRect()
                return {width:rect.width,height:rect.height,font:parseFloat(getComputedStyle(element).fontSize)}
            }
            const stack=document.querySelector('#article-4-section-my-art .article-stack-items-compact')
            return {
                articleTitle:measure('#article-1-section-my-art h4.article-title'),
                photoCard:measure('#article-1-section-my-art .article-timeline-item-info-for-timelines'),
                photoAvatar:measure('#article-1-section-my-art .article-timeline-item-avatar'),
                photoCopy:measure('#article-1-section-my-art .article-timeline-item-info-for-timelines-body-text'),
                digitalCard:measure('#article-2-section-my-art .article-timeline-item-info-for-timelines'),
                digitalCopy:measure('#article-2-section-my-art .article-timeline-item-info-for-timelines-body-text'),
                webShell:measure('#article-3-section-my-art .article-web-art-shell'),
                webStage:measure('#article-3-section-my-art .article-web-art-stage'),
                webEnter:measure('#article-3-section-my-art .article-web-art-intro-cover-button-primary'),
                stackGrid:measure('#article-4-section-my-art .article-stack-items-compact'),
                stackCard:measure('#article-4-section-my-art .article-stack-item-compact'),
                stackColumns:stack?getComputedStyle(stack).gridTemplateColumns.split(' ').length:0,
                stackGap:stack?parseFloat(getComputedStyle(stack).columnGap):0,
                stackTitleOverflow:stack?[...stack.querySelectorAll('.article-stack-item-title-main')].filter(title=>title.scrollWidth>title.clientWidth+1||title.scrollHeight>title.clientHeight+1).length:-1,
                pearlGate:measure('#article-5-section-my-art .article-secret-pearls-gate-button'),
                docWidth:document.documentElement.scrollWidth
            }
        })

        expect(metrics.articleTitle.font).toBeGreaterThanOrEqual(20)
        expect(metrics.articleTitle.font).toBeLessThanOrEqual(27)
        expect(metrics.photoCard.height).toBeLessThan(190)
        expect(metrics.photoAvatar.width).toBeGreaterThanOrEqual(115)
        expect(metrics.photoAvatar.width).toBeLessThanOrEqual(150)
        expect(metrics.photoCopy.font).toBeGreaterThanOrEqual(15)
        expect(metrics.photoCopy.font).toBeLessThanOrEqual(17)
        // The card's authored text is content-sized; allow minor browser
        // line-box rounding while still catching a real density regression.
        expect(metrics.digitalCard.height).toBeLessThan(385)
        expect(metrics.digitalCopy.font).toBeGreaterThanOrEqual(12.5)
        expect(metrics.webStage.height).toBeGreaterThanOrEqual(1)
        expect(metrics.webStage.height).toBeLessThanOrEqual(380)
        expect(metrics.webEnter.height).toBeGreaterThanOrEqual(43.5)
        // The container-relative grid grows by adding tiles while bounding each one.
        expect(metrics.stackColumns).toBeGreaterThanOrEqual(5)
        expect(metrics.stackGap).toBeGreaterThanOrEqual(3)
        expect(metrics.stackGap).toBeLessThanOrEqual(8)
        expect(metrics.stackCard.width).toBeGreaterThanOrEqual(76)
        expect(metrics.stackCard.width).toBeLessThanOrEqual(160)
        expect(Math.abs(metrics.stackCard.height-metrics.stackCard.width)).toBeLessThanOrEqual(1)
        expect(metrics.stackTitleOverflow).toBe(0)
        expect(metrics.stackGrid.height).toBeLessThan(2000)
        expect(metrics.pearlGate.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.docWidth).toBeLessThanOrEqual(width+1)

        const pearls=page.locator('#article-5-section-my-art')
        await pearls.getByRole('button',{name:'Reveal Secret pearls'}).click()
        await expect(pearls.locator('.article-secret-pearls-grid')).toBeVisible()
        const pearlWidths=await pearls.evaluate(element=>({
            grid:element.querySelector('.article-secret-pearls-grid').getBoundingClientRect().width,
            description:element.querySelector('.article-secret-pearls-description').getBoundingClientRect().width
        }))
        expect(Math.abs(pearlWidths.grid-pearlWidths.description)).toBeLessThanOrEqual(1)
        await pearls.getByRole('button',{name:'Show less'}).click()

        if(index===0) {
            await expect(page.locator('#article-1-section-my-art .article-timeline-item-info-for-timelines')).toHaveCount(3)
            await expect(page.locator('#article-2-section-my-art .article-timeline-item-info-for-timelines')).toHaveCount(4)
            await expect(page.locator('#article-4-section-my-art .article-stack-item-compact')).toHaveCount(71,{timeout:10000})

            const webArt=page.locator('#article-3-section-my-art')
            await webArt.locator('.article-web-art-intro-cover-button-primary').click({force:true})
            await expect(webArt.locator('.article-web-art-intro-cover-hidden')).toBeVisible()

            const pearls=page.locator('#article-5-section-my-art')
            await pearls.getByRole('button',{name:'Reveal Secret pearls'}).click()
            await expect(pearls.locator('.article-secret-pearls-gated-tile')).toHaveCount(4)
            const tileControlHeights=await pearls.locator('.article-secret-pearls-gated-tile-pill').evaluateAll(buttons=>buttons.map(button=>button.getBoundingClientRect().height))
            expect(tileControlHeights.every(height=>height>=43.5)).toBe(true)
            await pearls.getByRole('button',{name:'Show less'}).click()
            await expect(pearls.getByRole('button',{name:'Reveal Secret pearls'})).toBeVisible()
        }
    }
})

test('Art desktop density stays off in narrow landscape and mobile modes', async ({page})=>{
    await preferences(page)
    await page.setViewportSize({width:568,height:320})
    await openSection(page,'my-art')
    await expect(page.locator('html')).toHaveAttribute('data-layout','normal')
    await expect(page.locator('#article-1-section-my-art .article-timeline-item-info-for-timelines').first()).toBeVisible()
    await expect(page.locator('#article-3-section-my-art .article-web-art-stage')).toBeVisible()
    await expect(page.locator('#article-4-section-my-art .article-stack-item-compact').first()).toBeVisible()
    const landscapeStack=await page.locator('#article-4-section-my-art .article-stack-items-compact').evaluate(stack=>({
        columns:getComputedStyle(stack).gridTemplateColumns.split(' ').length,
        gap:parseFloat(getComputedStyle(stack).columnGap),
        card:stack.querySelector('.article-stack-item-compact')?.getBoundingClientRect().width
    }))
    expect(landscapeStack.columns).toBeGreaterThanOrEqual(2)
    expect(landscapeStack.gap).toBeLessThanOrEqual(8)
    expect(landscapeStack.card).toBeGreaterThanOrEqual(76)
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(569)

    await page.setViewportSize({width:390,height:844})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-2-section-my-art .article-timeline-item-info-for-timelines').first()).toBeVisible()
    await expect(page.locator('#article-3-section-my-art .article-web-art-stage')).toBeVisible()
    await expect(page.locator('#article-5-section-my-art .article-secret-pearls-gate-button')).toBeVisible()
    const phonePearls=page.locator('#article-5-section-my-art')
    await phonePearls.getByRole('button',{name:'Reveal Secret pearls'}).click()
    await expect(phonePearls.locator('.article-secret-pearls-grid')).toBeVisible()
    const phonePearlWidths=await phonePearls.evaluate(element=>({
        grid:element.querySelector('.article-secret-pearls-grid').getBoundingClientRect().width,
        description:element.querySelector('.article-secret-pearls-description').getBoundingClientRect().width
    }))
    expect(Math.abs(phonePearlWidths.grid-phonePearlWidths.description)).toBeLessThanOrEqual(1)
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391)
    await phonePearls.getByRole('button',{name:'Show less'}).click()
    const phoneStack=await page.locator('#article-4-section-my-art .article-stack-items-compact').evaluate(stack=>({
        columns:getComputedStyle(stack).gridTemplateColumns.split(' ').length,
        gap:parseFloat(getComputedStyle(stack).columnGap),
        card:stack.querySelector('.article-stack-item-compact')?.getBoundingClientRect().width
    }))
    expect(phoneStack.columns).toBeGreaterThanOrEqual(2)
    expect(phoneStack.gap).toBeLessThanOrEqual(8)
    expect(phoneStack.card).toBeGreaterThanOrEqual(76)
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391)

    await page.setViewportSize({width:1440,height:2560})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    const mobileTitleSize=await page.locator('#article-1-section-my-art h4.article-title').evaluate(element=>parseFloat(getComputedStyle(element).fontSize))
    expect(mobileTitleSize).toBeGreaterThanOrEqual(24)
    await expect(page.locator('#article-4-section-my-art .article-stack-item-compact').first()).toBeVisible()
})

test('Contact desktop density compacts information, forms, and map panels without shrinking controls', async ({page})=>{
    test.setTimeout(150000)
    await preferences(page)

    for(const [index,[width,height]] of [[1366,900],[3440,1440]].entries()) {
        await page.setViewportSize({width,height})
        if(index===0) await openSection(page,'contact')
        else {
            await page.reload()
            await expect(page.locator('#article-1-section-contact .article-info-list-item').first()).toBeVisible()
        }
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        await expect(page.locator('#article-3-section-contact .location-compare-grid--ready')).toBeVisible()

        const metrics=await page.evaluate(()=>{
            const measure=(selector)=>{
                const element=document.querySelector(selector)
                if(!element) return null
                const rect=element.getBoundingClientRect()
                return {width:rect.width,height:rect.height,font:parseFloat(getComputedStyle(element).fontSize)}
            }
            return {
                infoCard:measure('#article-1-section-contact .article-info-list-item'),
                infoAvatar:measure('#article-1-section-contact .article-info-list-item-avatar'),
                copyButtons:[...document.querySelectorAll('#article-1-section-contact button.copy-button')].map(button=>button.getBoundingClientRect().height),
                completeContactText:[...document.querySelectorAll('#article-1-section-contact .article-info-list-item-info-title, #article-1-section-contact .copy-button-label')].every(element=>element.scrollWidth<=element.clientWidth+1&&element.scrollHeight<=element.clientHeight+1),
                centeredContactText:[...document.querySelectorAll('#article-1-section-contact .article-info-list-item-info-title, #article-1-section-contact .article-info-list-item-info-text > span')].every(element=>getComputedStyle(element).textAlign==='center'),
                rightAlignedCopyActions:[...document.querySelectorAll('#article-1-section-contact .copy-button-wrapper')].every(element=>{
                    const parent=element.parentElement.getBoundingClientRect()
                    return Math.abs(parent.right-element.getBoundingClientRect().right)<1
                }),
                copySurfaceHeights:[...document.querySelectorAll('#article-1-section-contact button.copy-button')].map(button=>parseFloat(getComputedStyle(button,'::before').height)),
                copyLayout:[...document.querySelectorAll('#article-1-section-contact .article-info-list-item-info-text:has(button.copy-button)')].map(row=>({
                    descriptionBottom:row.querySelector(':scope > span').getBoundingClientRect().bottom,
                    actionTop:row.querySelector(':scope > .copy-button-wrapper').getBoundingClientRect().top
                })),
                contactInput:measure('#article-2-section-contact input.form-input'),
                contactTextarea:measure('#article-2-section-contact textarea.form-textarea'),
                sendButton:measure('#article-2-section-contact button[type="submit"]'),
                locationArticle:measure('#article-3-section-contact'),
                mapCard:measure('#article-3-section-contact .location-compare-card'),
                mapCanvas:measure('#article-3-section-contact .location-compare-map'),
                mapControls:[...document.querySelectorAll('#article-3-section-contact .location-compare-preset, #article-3-section-contact .location-compare-actions button')].map(button=>button.getBoundingClientRect().height),
                complaintArticle:measure('#article-4-section-contact'),
                complaintPanel:measure('#article-4-section-contact .article-complaint-form-main'),
                complaintPanelStyle:(()=>{
                    const panel=document.querySelector('#article-4-section-contact .article-complaint-form-main')
                    const style=getComputedStyle(panel)
                    return {background:style.backgroundColor,border:style.borderTopWidth,parentWidth:panel.parentElement.getBoundingClientRect().width}
                })(),
                complaintTextarea:measure('#article-4-section-contact textarea.form-textarea'),
                complaintDestination:measure('#article-4-section-contact .article-complaint-form-select-trigger'),
                documentWidth:document.documentElement.scrollWidth
            }
        })

        expect(metrics.infoCard.height).toBeLessThan(150)
        expect(metrics.infoCard.width).toBeGreaterThanOrEqual(width < 768 ? width-48 : 280)
        expect(metrics.infoAvatar.width).toBeGreaterThanOrEqual(44)
        expect(metrics.copyButtons.length).toBeGreaterThan(0)
        expect(metrics.copyButtons.every(height=>height>=43.5)).toBe(true)
        expect(metrics.completeContactText).toBe(true)
        expect(metrics.centeredContactText).toBe(true)
        expect(metrics.rightAlignedCopyActions).toBe(true)
        expect(metrics.copySurfaceHeights.every(height=>height<=41)).toBe(true)
        expect(metrics.copyLayout.every(({descriptionBottom,actionTop})=>actionTop>=descriptionBottom)).toBe(true)
        expect(metrics.contactInput.height).toBeGreaterThanOrEqual(44)
        expect(metrics.contactTextarea.height).toBeLessThan(190)
        expect(metrics.sendButton.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.locationArticle.height).toBeLessThan(900)
        expect(metrics.mapCard.height).toBeLessThan(470)
        expect(metrics.mapCanvas.height).toBeGreaterThan(300)
        expect(metrics.mapControls.every(height=>height>=31.5)).toBe(true)
        expect(metrics.complaintPanel.height).toBeLessThan(250)
        expect(metrics.complaintPanelStyle.background).toBe('rgba(0, 0, 0, 0)')
        expect(metrics.complaintPanelStyle.border).toBe('0px')
        expect(metrics.complaintPanel.width).toBeCloseTo(metrics.complaintPanelStyle.parentWidth,0)
        expect(metrics.complaintTextarea.height).toBeGreaterThan(140)
        expect(metrics.complaintDestination.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.documentWidth).toBeLessThanOrEqual(width+1)

        if(index===0) {
            await expect(page.locator('#article-1-section-contact .article-info-list-item')).toHaveCount(6)
            const map=page.locator('#article-3-section-contact')
            await map.locator('.location-compare-preset').nth(1).click()
            await expect(map.locator('.location-compare-preset').nth(1)).toHaveClass(/is-active/)

            const complaint=page.locator('#article-4-section-contact')
            const destination=complaint.locator('.article-complaint-form-select-trigger')
            await destination.click()
            await expect(destination).toHaveAttribute('aria-expanded','true')
            await page.keyboard.press('Escape')
            await expect(destination).toHaveAttribute('aria-expanded','false')

            // Exercise only the invalid path: valid contact submissions send a real email.
            await page.locator('#article-2-section-contact button[type="submit"]').click()
            expect(await page.locator('#article-2-section-contact input[required]').first().evaluate(input=>input.validity.valid)).toBe(false)
        }
    }
})

test('Contact desktop density stays off in narrow landscape and mobile layouts', async ({page})=>{
    await preferences(page)
    for(const [width,height] of [[568,320],[390,844]]) {
        await page.setViewportSize({width,height})
        if(width===568) await openSection(page,'contact')
        else {
            await page.reload()
            await expect(page.locator('#article-1-section-contact .article-info-list-item').first()).toBeVisible()
        }
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        await expect(page.locator('#article-1-section-contact .article-info-list-item').first()).toBeVisible()
        await expect(page.locator('#article-2-section-contact textarea.form-textarea')).toBeVisible()
        await expect(page.locator('#article-3-section-contact .location-compare-grid--ready')).toBeVisible()
        await expect(page.locator('#article-4-section-contact .article-complaint-form-select-trigger')).toBeVisible()
        const contactTextFits=await page.locator('article.article-info-list-contact').evaluate(article=>[...article.querySelectorAll('.article-info-list-item-info-title, .copy-button-label')].every(element=>element.scrollWidth<=element.clientWidth+1&&element.scrollHeight<=element.clientHeight+1))
        expect(contactTextFits).toBe(true)
        const contactTextCentered=await page.locator('article.article-info-list-contact').evaluate(article=>[...article.querySelectorAll('.article-info-list-item-info-title, .article-info-list-item-info-text > span')].every(element=>getComputedStyle(element).textAlign==='center'))
        expect(contactTextCentered).toBe(true)
        const contactCopyTargets=await page.locator('#article-1-section-contact button.copy-button').evaluateAll(buttons=>buttons.map(button=>button.getBoundingClientRect().height))
        expect(contactCopyTargets.every(height=>height>=43.5)).toBe(true)
        expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1)
        expect(await page.locator('#article-2-section-contact textarea.form-textarea').evaluate(element=>getComputedStyle(element).getPropertyValue('--textarea-min-height').trim())).toBe('')
    }
})

test('Contact form fields share the message column height on two-column screens', async ({page})=>{
    await preferences(page)

    for(const [index,[width,height]] of [[768,1024],[900,900],[1366,900],[1920,1080]].entries()) {
        await page.setViewportSize({width,height})
        if(index===0) await openSection(page,'contact')
        else await page.reload()

        const form=page.locator('#contact-form')
        await expect(form.locator('.article-contact-form-left')).toBeVisible()
        const dimensions=await form.evaluate(element=>{
            const left=element.querySelector('.article-contact-form-left')
            const right=element.querySelector('.article-contact-form-right')
            const boxes=[...left.querySelectorAll('.input-field-wrapper')].map(wrapper=>wrapper.getBoundingClientRect().height)
            return {
                left:left.getBoundingClientRect().height,
                right:right.getBoundingClientRect().height,
                fields:boxes
            }
        })

        expect(dimensions.left).toBeCloseTo(dimensions.right,0)
        expect(dimensions.fields).toHaveLength(3)
        expect(Math.max(...dimensions.fields)-Math.min(...dimensions.fields)).toBeLessThanOrEqual(1)
    }
})

test('Contact location comparison stays compact and symmetrical across viewport widths', async ({page})=>{
    await preferences(page)

    for(const [width,height] of [[320,700],[390,844],[430,932],[480,900],[768,1024],[1024,768],[1920,1080],[3440,1440]]) {
        await page.setViewportSize({width,height})
        await openSection(page,'contact')
        const map=page.locator('#article-3-section-contact')
        await expect(map.locator('.location-compare-kicker')).toHaveCount(0)
        await expect(map.locator('.location-compare-footer > span')).toHaveCount(1)
        const wheelHint=map.locator('.location-compare-wheel-hint')
        const hasFinePointer=await page.evaluate(()=>matchMedia('(any-hover: hover) and (any-pointer: fine)').matches)
        if(hasFinePointer) await expect(wheelHint).toBeVisible()
        else await expect(wheelHint).toBeHidden()
        await expect(map.locator('.location-compare-control small, .location-compare-control-orbit, .location-compare-control-icon')).toHaveCount(0)
        await expect(map.locator('.location-compare-control--out > i')).toHaveClass(/fa-minus/)
        await expect(map.locator('.location-compare-control--in > i')).toHaveClass(/fa-plus/)
        const metrics=await map.evaluate(root=>{
            const rect=selector=>{
                const {x,y,width,height}=root.querySelector(selector).getBoundingClientRect()
                return {x,y,width,height,bottom:y+height}
            }
            const articleContent=root.querySelector('.article-content')
            const contentStyle=getComputedStyle(articleContent)
            const zoomControls=[...root.querySelectorAll('.location-compare-control')].map(element=>{
                const buttonRect=element.getBoundingClientRect()
                const iconRect=element.querySelector('i').getBoundingClientRect()
                return {
                width:buttonRect.width,
                height:buttonRect.height,
                background:getComputedStyle(element).backgroundColor,
                backgroundImage:getComputedStyle(element).backgroundImage,
                borderWidth:getComputedStyle(element).borderTopWidth,
                radius:getComputedStyle(element).borderTopLeftRadius,
                iconSize:iconRect.width,
                iconCenterOffset:Math.abs((iconRect.left+iconRect.width/2)-(buttonRect.left+buttonRect.width/2))
            }})
            return {
                contentFrame:{
                    padding:contentStyle.padding,
                    borderWidth:contentStyle.borderTopWidth,
                    background:contentStyle.backgroundColor,
                    width:articleContent.getBoundingClientRect().width,
                    parentWidth:articleContent.parentElement.getBoundingClientRect().width
                },
                attributionCenterOffset:(()=>{
                    const footer=root.querySelector('.location-compare-footer')
                    const attribution=footer.querySelector('span')
                    const footerRect=footer.getBoundingClientRect()
                    const attributionRect=attribution.getBoundingClientRect()
                    return Math.abs((attributionRect.left+attributionRect.width/2)-(footerRect.left+footerRect.width/2))
                })(),
                zoomControls,
                toolbar:rect('.location-compare-toolbar'),
                scaleReadout:rect('.location-compare-lock'),
                actionsRow:rect('.location-compare-actions'),
                presetsRow:rect('.location-compare-presets'),
                intro:rect('.location-compare-intro'),
                narrativeSpanDisplay:getComputedStyle(root.querySelector('.location-compare-pretext > span')).display,
                presets:[...root.querySelectorAll('.location-compare-preset')].map(element=>({
                    height:element.getBoundingClientRect().height,
                    top:element.getBoundingClientRect().top,
                    borderWidth:getComputedStyle(element).borderTopWidth,
                    radius:getComputedStyle(element).borderTopLeftRadius,
                    labelFontSize:getComputedStyle(element.querySelector('span')).fontSize,
                    valueFontSize:getComputedStyle(element.querySelector('em')).fontSize
                })),
                actions:[...root.querySelectorAll('.location-compare-actions button')].map(element=>({
                    width:element.getBoundingClientRect().width,
                    height:element.getBoundingClientRect().height,
                    borderWidth:getComputedStyle(element).borderTopWidth,
                    radius:getComputedStyle(element).borderTopLeftRadius,
                    iconCenterOffset:(()=>{
                        const buttonRect=element.getBoundingClientRect()
                        const iconRect=element.querySelector('i').getBoundingClientRect()
                        return Math.abs((iconRect.left+iconRect.width/2)-(buttonRect.left+buttonRect.width/2))
                    })()
                })),
                actionsWidth:root.querySelector('.location-compare-actions').getBoundingClientRect().width,
                actionLabels:[...root.querySelectorAll('.location-compare-pan-link, .location-compare-reset')].map(button=>({
                    width:button.getBoundingClientRect().width,
                    height:button.getBoundingClientRect().height,
                    fontSize:getComputedStyle(button).fontSize,
                    shortVisible:getComputedStyle(button.querySelector('.location-compare-action-label--short')).display!=='none',
                    longVisible:getComputedStyle(button.querySelector('.location-compare-action-label--long')).display!=='none'
                })),
                contactAvatarLinks:[...root.ownerDocument.querySelectorAll('#article-1-section-contact .article-info-list-item-avatar-link')].map(link=>{
                    const rect=link.getBoundingClientRect()
                    return {width:rect.width,height:rect.height}
                }),
                contactCopyButtons:[...root.ownerDocument.querySelectorAll('#article-1-section-contact .article-info-list-item-info-text:has(.article-info-list-item-inline-copy)')].map(row=>{
                    const rowRect=row.getBoundingClientRect()
                    const button=row.querySelector('.article-info-list-item-inline-copy button')
                    const buttonRect=button.getBoundingClientRect()
                    const avatar=row.closest('.article-info-list-item').querySelector('.article-info-list-item-avatar-link').getBoundingClientRect()
                    return {
                        rightGap:rowRect.right-buttonRect.right,
                        buttonHeight:buttonRect.height,
                        textFontSize:parseFloat(getComputedStyle(row).fontSize),
                        buttonFontSize:parseFloat(getComputedStyle(button).fontSize),
                        avatarWidth:avatar.width
                    }
                }),
                coarsePointer:matchMedia('(pointer: coarse)').matches,
                contactCardVerticalPadding:[...root.ownerDocument.querySelectorAll('#article-1-section-contact .article-info-list-item')].map(card=>{
                    const style=getComputedStyle(card)
                    return [parseFloat(style.paddingTop),parseFloat(style.paddingBottom)]
                }),
                contactLinkHint:(()=>{
                    const card=root.ownerDocument.querySelector('#article-1-section-contact .article-info-list-item:has(.article-info-list-item-avatar-link)')
                    return card?getComputedStyle(card,'::after').content:null
                })(),
                maps:[...root.querySelectorAll('.location-compare-map')].map(element=>({
                    x:element.getBoundingClientRect().left,
                    right:element.getBoundingClientRect().right,
                    width:element.getBoundingClientRect().width,
                    height:element.getBoundingClientRect().height,
                    y:element.getBoundingClientRect().top
                })),
                mapInsets:[...root.querySelectorAll('.location-compare-card')].map(card=>{
                    const viewport=card.querySelector('.location-compare-viewport').getBoundingClientRect()
                    const mapCanvas=card.querySelector('.location-compare-map').getBoundingClientRect()
                    const rails=[...card.querySelectorAll('.location-compare-place-rail')]
                    return {
                        mapAspect:mapCanvas.width/mapCanvas.height,
                        left:mapCanvas.left-viewport.left,
                        right:viewport.right-mapCanvas.right,
                        railWidths:rails.map(rail=>rail.getBoundingClientRect().width),
                        railDisplays:rails.map(rail=>getComputedStyle(rail).display),
                        railText:rails.map(rail=>rail.textContent.trim()),
                        writingModes:rails.map(rail=>getComputedStyle(rail.firstElementChild).writingMode)
                    }
                }),
                mapCards:[...root.querySelectorAll('.location-compare-card')].map(card=>{
                    const rect=card.getBoundingClientRect()
                    const label=card.querySelector('.location-compare-label').getBoundingClientRect()
                    const viewport=card.querySelector('.location-compare-viewport').getBoundingClientRect()
                    return {
                        left:rect.left,
                        right:rect.right,
                        top:rect.top,
                        bottom:rect.bottom,
                        labelTop:label.top,
                        labelBottom:label.bottom,
                        viewportTop:viewport.top,
                        viewportBottom:viewport.bottom
                    }
                })
            }
        })

        expect(metrics.toolbar.height).toBeLessThan(180)
        expect(metrics.scaleReadout.bottom).toBeLessThan(metrics.maps[0].y)
        expect(metrics.actionsRow.y).toBeLessThan(metrics.presetsRow.y)
        expect(metrics.contentFrame.padding).toBe('0px')
        expect(metrics.contentFrame.borderWidth).toBe('0px')
        expect(metrics.contentFrame.width).toBeCloseTo(metrics.contentFrame.parentWidth,0)
        expect(metrics.attributionCenterOffset).toBeLessThan(1)
        expect(metrics.zoomControls.every(control=>control.width>=(width<768?43.5:31) && control.height>=(width<768?43.5:31))).toBe(true)
        expect(metrics.zoomControls.every(control=>parseFloat(control.borderWidth)>0 && parseFloat(control.borderWidth)<=1)).toBe(true)
        expect(metrics.zoomControls.every(control=>control.background!=='rgba(0, 0, 0, 0)' || control.backgroundImage!=='none')).toBe(true)
        expect(metrics.zoomControls.every(control=>parseFloat(control.radius)>=12 && parseFloat(control.radius)<=16)).toBe(true)
        expect(metrics.zoomControls.every(control=>control.iconSize<control.width)).toBe(true)
        expect(metrics.zoomControls.every(control=>control.iconCenterOffset<1)).toBe(true)
        expect(metrics.intro.height).toBeLessThan(210)
        expect(metrics.narrativeSpanDisplay).toBe('inline')
        expect(metrics.presets).toHaveLength(3)
        expect(metrics.presets.every(preset=>preset.height>=(width<768?43.5:31))).toBe(true)
        expect(metrics.presets.every(preset=>hasVisibleHairline(preset.borderWidth) && preset.radius!=='0px')).toBe(true)
        const presetLabelMax=width>=1280?19:12
        const presetValueMax=width>=1280?17:11
        expect(metrics.presets.every(preset=>parseFloat(preset.labelFontSize)<=presetLabelMax && parseFloat(preset.valueFontSize)<=presetValueMax)).toBe(true)
        expect(Math.max(...metrics.presets.map(preset=>preset.top))-Math.min(...metrics.presets.map(preset=>preset.top))).toBeLessThan(1)
        expect(metrics.actions.every(action=>action.height>=(width<768?43.5:31) && hasVisibleHairline(action.borderWidth) && action.radius!=='0px')).toBe(true)
        expect(metrics.actions[0].width).toBeGreaterThan(metrics.actions[0].height)
        expect(metrics.actions[3].width).toBeGreaterThan(metrics.actions[3].height)
        expect(metrics.actions.slice(1,3).every(action=>action.width===action.height && action.iconCenterOffset<1)).toBe(true)
        expect(metrics.actionLabels.every(label=>label.shortVisible!==label.longVisible)).toBe(true)
        expect(metrics.actionLabels.every(label=>label.shortVisible===(label.width<184))).toBe(true)
        expect(metrics.actionLabels.every(label=>parseFloat(label.fontSize)>=12)).toBe(true)
        expect(metrics.contactAvatarLinks.length).toBeGreaterThan(0)
        expect(metrics.contactAvatarLinks.every(link=>Math.abs(link.width-link.height)<0.5)).toBe(true)
        expect(metrics.contactCopyButtons.length).toBeGreaterThan(0)
        expect(metrics.contactCopyButtons.every(button=>button.rightGap>=-1 && button.rightGap<1),JSON.stringify({width,copyButtons:metrics.contactCopyButtons})).toBe(true)
        expect(metrics.contactCopyButtons.every(button=>button.avatarWidth>=50),JSON.stringify({width,copyButtons:metrics.contactCopyButtons})).toBe(true)
        expect(metrics.contactCopyButtons.every(button=>button.textFontSize>=12.5 && button.textFontSize<=18)).toBe(true)
        expect(metrics.contactCopyButtons.every(button=>button.buttonFontSize>=11 && button.buttonFontSize<=16)).toBe(true)
        // Copy actions preserve the shared 44px target on desktop and touch layouts.
        expect(metrics.contactCopyButtons.every(button=>button.buttonHeight>=43.5 && button.buttonHeight<=45),JSON.stringify({width,copyButtons:metrics.contactCopyButtons})).toBe(true)
        if(width===1920) expect(metrics.contactCopyButtons[0].avatarWidth).toBeGreaterThan(metrics.contactCopyButtons[0].textFontSize*4)
        expect(metrics.contactCardVerticalPadding.length).toBeGreaterThan(0)
        expect(metrics.contactCardVerticalPadding.every(([top,bottom])=>top<=4 && bottom<=4),JSON.stringify({width,verticalPadding:metrics.contactCardVerticalPadding})).toBe(true)
        expect(metrics.contactLinkHint).toBe('none')
        if(width>=768) {
            if(width<1280) expect(metrics.presets.every(preset=>preset.height<=37)).toBe(true)
            expect(metrics.actions.every(action=>action.height<=37)).toBe(true)
            expect(metrics.zoomControls.every(control=>control.width<=37 && control.height<=37)).toBe(true)
            expect(metrics.toolbar.width).toBeCloseTo(metrics.contentFrame.width,0)
        }
        if(width>=1280) {
            expect(metrics.presets.every(preset=>preset.height>=42 && preset.height<=60),JSON.stringify({width,presets:metrics.presets})).toBe(true)
            expect(metrics.actions.every(action=>action.height<=33)).toBe(true)
            expect(metrics.zoomControls.every(control=>control.width<=33 && control.height<=33)).toBe(true)
        }
        expect(metrics.maps.every(mapSize=>mapSize.height>=140)).toBe(true)
        expect(metrics.mapInsets).toHaveLength(2)
        expect(metrics.mapInsets.every(inset=>Math.abs(inset.mapAspect-1)<=0.01),JSON.stringify({width,height,mapInsets:metrics.mapInsets})).toBe(true)
        expect(metrics.mapInsets.every(inset=>inset.railWidths.length===2)).toBe(true)
        expect(metrics.mapInsets.every(inset=>inset.railText.length===2 && inset.railText[0]===inset.railText[1])).toBe(true)
        expect(metrics.mapCards).toHaveLength(2)
        if(height>width || width<768) {
            // Stacked cards share a flush horizontal seam, and the lower
            // selector stays at the bottom of its card below the map.
            expect(metrics.mapInsets.every(inset=>inset.left>=59 && inset.right>=59)).toBe(true)
            expect(metrics.mapInsets.every(inset=>inset.railWidths.every(railWidth=>railWidth>=59))).toBe(true)
            expect(metrics.mapInsets.every(inset=>inset.railDisplays.every(display=>display!=='none'))).toBe(true)
            expect(metrics.mapInsets.every(inset=>inset.writingModes.every(mode=>mode==='vertical-rl'))).toBe(true)
            expect(Math.abs(metrics.mapCards[0].bottom-metrics.mapCards[1].top)).toBeLessThanOrEqual(1)
            expect(Math.abs(metrics.mapCards[1].labelBottom-metrics.mapCards[1].bottom)).toBeLessThanOrEqual(1)
            expect(Math.abs(metrics.mapCards[1].viewportBottom-metrics.mapCards[1].labelTop)).toBeLessThanOrEqual(1)

            if(width===768) {
                const lowerCard=map.locator('.location-compare-card').nth(1)
                await lowerCard.locator('.location-compare-label').click()
                const menu=lowerCard.locator('.location-compare-menu')
                await expect(menu).toHaveClass(/location-compare-menu--open/)
                await expect.poll(()=>menu.evaluate(element=>{
                    const menuRect=element.getBoundingClientRect()
                    const viewportRect=element.parentElement.getBoundingClientRect()
                    const triggerRect=element.closest('.location-compare-card').querySelector('.location-compare-label').getBoundingClientRect()
                    return Math.max(Math.abs(menuRect.bottom-viewportRect.bottom),Math.abs(menuRect.bottom-triggerRect.top))
                }),{timeout:1500}).toBeLessThanOrEqual(1)
            }
        } else {
            // Side-by-side maps meet directly; only the pair's outside rails remain.
            expect(metrics.mapInsets[0].left).toBeGreaterThanOrEqual(59)
            expect(metrics.mapInsets[0].right).toBeLessThanOrEqual(1)
            expect(metrics.mapInsets[1].left).toBeLessThanOrEqual(1)
            expect(metrics.mapInsets[1].right).toBeGreaterThanOrEqual(59)
            expect(metrics.mapInsets[0].railDisplays).toEqual(['grid','none'])
            expect(metrics.mapInsets[1].railDisplays).toEqual(['none','grid'])
            // The only separation is the two adjoining 1px card borders.
            expect(Math.abs(metrics.maps[0].right-metrics.maps[1].x)).toBeLessThanOrEqual(2)
            expect(Math.abs(metrics.mapCards[0].right-metrics.mapCards[1].left)).toBeLessThanOrEqual(1)
        }
        expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1)

        if(width===390) {
            const firstCard=page.locator('#article-1-section-contact .article-info-list-item').first()
            const widthBeforeHover=(await firstCard.boundingBox()).width
            await firstCard.hover()
            const hoverMetrics=await firstCard.evaluate(element=>({
                width:element.getBoundingClientRect().width,
                transform:getComputedStyle(element).transform,
                filter:getComputedStyle(element).filter,
                borderWidth:getComputedStyle(element).borderTopWidth
            }))
            expect(Math.abs(hoverMetrics.width-widthBeforeHover)).toBeLessThan(0.5)
            expect(hoverMetrics.transform).toBe('none')
            expect(hoverMetrics.filter).toBe('none')
            expect(hasVisibleHairline(hoverMetrics.borderWidth)).toBe(true)
        }

        if(width>=768)
            expect(Math.abs(metrics.maps[0].width-metrics.maps[1].width)).toBeLessThan(1)
    }
})

test('Contact scale readout sits above both maps and actions precede presets in both themes', async ({page})=>{
    const themeLabelColors=[]
    const themeLabelBackgrounds=[]
    for(const theme of ['dark','light']) {
        const themedPage=theme==='dark'?page:await page.context().newPage()
        await preferences(themedPage,'en',theme)
        const snapshots=[]

        for(const [width,height] of [[390,844],[1366,768]]) {
            await themedPage.setViewportSize({width,height})
            await openSection(themedPage,'contact')
            const map=themedPage.locator('#article-3-section-contact')
            await expect(map.locator('.location-compare-live')).toHaveCount(0)
            if(width===390) {
                const label=map.locator('.location-compare-label').first()
                const menuId=await label.getAttribute('aria-controls')
                await expect(themedPage.locator(`#${menuId}`)).toHaveAttribute('role','listbox')
                await label.click()
                await expect(label).toHaveAttribute('aria-expanded','true')
                await expect(themedPage.locator(`#${menuId}`)).toHaveClass(/location-compare-menu--open/)
                const pickerMetrics=await themedPage.locator(`#${menuId}`).evaluate(menu=>({
                    height:menu.getBoundingClientRect().height,
                    borderWidth:getComputedStyle(menu).borderTopWidth,
                    padding:getComputedStyle(menu).padding,
                    optionHeights:[...menu.querySelectorAll('[role="option"]')].map(option=>option.getBoundingClientRect().height),
                    optionBorders:[...menu.querySelectorAll('[role="option"]')].map(option=>getComputedStyle(option).borderTopWidth)
                }))
                // Eight city choices still need four touch-friendly rows in a
                // two-column list; the old full-card menu was about 263px tall.
                expect(pickerMetrics.height).toBeLessThanOrEqual(235)
                expect(hasVisibleHairline(pickerMetrics.borderWidth)).toBe(true)
                expect(pickerMetrics.padding).toBe('8px')
                expect(pickerMetrics.optionHeights.every(height=>height>=43.5)).toBe(true)
                expect(pickerMetrics.optionBorders.every(border=>border==='0px')).toBe(true)
                await expect(themedPage.locator(`#${menuId} .fa-arrow-up-right-from-square`)).toHaveCount(0)
                await label.click()
            }
            const snapshot=await themedPage.locator('#article-3-section-contact').evaluate(root=>{
                const cards=[...root.querySelectorAll('.location-compare-card')]
                const toolbar=root.querySelector('.location-compare-toolbar')
                const scaleReadout=root.querySelector('.location-compare-lock')
                const readoutLabel=scaleReadout.querySelector('small')
                const readoutValue=scaleReadout.querySelector('strong')
                const labels=[...root.querySelectorAll('.location-compare-label')]
                const rect=element=>{
                    const {x,y,width,height}=element.getBoundingClientRect()
                    return {x,y,width,height,right:x+width,bottom:y+height}
                }
                return {
                    cards:cards.map(rect),
                    toolbar:rect(toolbar),
                    scaleReadout:rect(scaleReadout),
                    actions:rect(root.querySelector('.location-compare-actions')),
                    presets:rect(root.querySelector('.location-compare-presets')),
                    readoutLabel:rect(readoutLabel),
                    readoutValue:rect(readoutValue),
                    labels:labels.map(label=>({
                        color:getComputedStyle(label).color,
                        background:getComputedStyle(label).backgroundColor,
                        borderWidth:getComputedStyle(label).borderBottomWidth
                    }))
    }
})

            snapshots.push(snapshot)
        }

        const [mobile,desktop]=snapshots
        themeLabelColors.push(mobile.labels[0].color)
        themeLabelBackgrounds.push(mobile.labels[0].background)
        expect(mobile.scaleReadout.width).toBeCloseTo(mobile.toolbar.width,0)
        expect(mobile.toolbar.y).toBeGreaterThan(Math.max(...mobile.cards.map(card=>card.bottom)))
        expect(mobile.scaleReadout.bottom).toBeLessThan(Math.min(...mobile.cards.map(card=>card.y)))
        expect(mobile.actions.y).toBeLessThan(mobile.presets.y)
        expect(mobile.readoutLabel.y+mobile.readoutLabel.height/2).toBeCloseTo(mobile.readoutValue.y+mobile.readoutValue.height/2,0)
        expect(desktop.scaleReadout.width).toBeCloseTo(desktop.toolbar.width,0)
        expect(desktop.toolbar.y).toBeGreaterThan(Math.max(...desktop.cards.map(card=>card.bottom)))
        expect(desktop.scaleReadout.bottom).toBeLessThan(Math.min(...desktop.cards.map(card=>card.y)))
        expect(desktop.actions.y).toBeLessThan(desktop.presets.y)
        expect(desktop.readoutLabel.y+desktop.readoutLabel.height/2).toBeCloseTo(desktop.readoutValue.y+desktop.readoutValue.height/2,0)
        await expect(themedPage.locator('#article-3-section-contact .location-compare-scale-between-maps')).toHaveCount(0)
        await expect(themedPage.locator('#article-3-section-contact .location-compare-bridge-core')).toHaveCount(0)
        const actionTextColor=await themedPage.locator('#article-3-section-contact .location-compare-actions button').first().evaluate(element=>getComputedStyle(element).color)
        const secondaryTextColor=await themedPage.locator('#article-3-section-contact .location-compare-lock-copy small').evaluate(element=>getComputedStyle(element).color)
        await expect(themedPage.locator('#article-3-section-contact .location-compare-pan-link')).toHaveAttribute('title',/\S+/)
        await expect(themedPage.locator('#article-3-section-contact .location-compare-reset')).toHaveAttribute('title',/\S+/)
        for(const preset of await themedPage.locator('#article-3-section-contact .location-compare-preset').all()) {
            await expect(preset.locator('span')).toHaveCSS('color',actionTextColor)
            await expect(preset.locator('em')).toHaveCSS('color',secondaryTextColor)
        }
        for(const snapshot of snapshots) {
            expect(snapshot.labels[0].color).toBe(snapshot.labels[1].color)
            expect(snapshot.labels.every(label=>hasVisibleHairline(label.borderWidth))).toBe(true)
        }

        if(themedPage!==page)
            await themedPage.close()
    }
    expect(themeLabelColors[0]).not.toBe(themeLabelColors[1])
    expect(themeLabelBackgrounds[0]).not.toBe(themeLabelBackgrounds[1])
})

test('Contact location comparison keeps two-finger pinch zoom available on touch screens', async ({browser})=>{
    test.skip(browser.browserType().name()!=='chromium','The native touch-gesture probe uses Chromium CDP.')

    const context=await browser.newContext({
        viewport:{width:390,height:844},
        hasTouch:true,
        reducedMotion:'reduce'
    })
    const page=await context.newPage()
    try {
        await preferences(page)
        await openSection(page,'contact')
        const map=page.locator('#article-3-section-contact')
        const mapSurface=map.locator('.location-compare-map').first()
        const viewport=map.locator('.location-compare-viewport').first()
        const scaleReadout=map.locator('.location-compare-lock-copy strong')

        await mapSurface.scrollIntoViewIfNeeded()
        await expect(mapSurface).toHaveClass(/leaflet-touch-zoom/)
        await expect(mapSurface).toHaveClass(/leaflet-touch-drag/)
        await expect(viewport).toHaveCSS('touch-action','auto')
        await expect(map.locator('.location-compare-wheel-hint')).toBeHidden()
        const initialScale=await scaleReadout.textContent()
        const bounds=await mapSurface.boundingBox()
        const centerX=bounds.x+bounds.width/2
        const centerY=bounds.y+bounds.height/2
        const session=await context.newCDPSession(page)
        await session.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:2})
        await session.send('Input.dispatchTouchEvent',{
            type:'touchStart',
            touchPoints:[
                {id:1,x:centerX-35,y:centerY,radiusX:5,radiusY:5,force:1},
                {id:2,x:centerX+35,y:centerY,radiusX:5,radiusY:5,force:1}
            ]
        })
        await session.send('Input.dispatchTouchEvent',{
            type:'touchMove',
            touchPoints:[
                {id:1,x:centerX-80,y:centerY,radiusX:5,radiusY:5,force:1},
                {id:2,x:centerX+80,y:centerY,radiusX:5,radiusY:5,force:1}
            ]
        })
        await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
        await expect.poll(()=>scaleReadout.textContent(),{timeout:2500,intervals:[40,80,120]}).not.toBe(initialScale)
        await session.detach()
    } finally {
        await context.close()
    }
})

test('Contact keeps native wheel scrolling over maps and zooms only on a deliberate modified gesture', async ({page})=>{
    await page.setViewportSize({width:1366,height:768})
    await preferences(page)
    await openSection(page,'contact')
    const map=page.locator('#article-3-section-contact')
    const scrollable=page.locator('#scrollable-contact')
    const mapSurface=map.locator('.location-compare-map').first()
    const scaleReadout=map.locator('.location-compare-lock-copy strong')

    await scrollable.evaluate(element=>{element.scrollTop=0})
    const intro=map.locator('.location-compare-intro')
    await intro.scrollIntoViewIfNeeded()
    const introBounds=await intro.boundingBox()
    await page.mouse.move(introBounds.x+introBounds.width/2,introBounds.y+introBounds.height/2)
    await page.mouse.wheel(0,120)
    await expect.poll(()=>scrollable.evaluate(element=>element.scrollTop),{timeout:1000}).toBeGreaterThan(0)
    const initialScale=await scaleReadout.textContent()
    const pageScrollAfterOutsideStart=await scrollable.evaluate(element=>element.scrollTop)
    const pageWheelSequence=await page.evaluate(()=>{
        const intro=document.querySelector('#article-3-section-contact .location-compare-intro')
        const map=document.querySelector('#article-3-section-contact .location-compare-map')
        const scrollable=document.querySelector('#scrollable-contact')
        const first=new WheelEvent('wheel',{deltaY:120,bubbles:true,cancelable:true})
        const second=new WheelEvent('wheel',{deltaY:120,bubbles:true,cancelable:true})
        intro.dispatchEvent(first)
        map.dispatchEvent(second)
        return {firstPrevented:first.defaultPrevented,secondPrevented:second.defaultPrevented}
    })
    expect(pageWheelSequence.firstPrevented).toBe(false)
    expect(pageWheelSequence.secondPrevented).toBe(true)
    const scaleAfterPageGesture=await scaleReadout.textContent()
    expect(scaleAfterPageGesture).toBe(initialScale)
    expect(pageScrollAfterOutsideStart).toBeGreaterThan(0)

    const scaleBeforeZoom=await scaleReadout.textContent()
    await page.waitForTimeout(300)
    await mapSurface.scrollIntoViewIfNeeded()
    await scrollable.evaluate(element=>{element.scrollTop=Math.max(0,element.scrollTop-140)})
    await page.waitForTimeout(80)
    const refreshedMapBounds=await mapSurface.boundingBox()
    await page.mouse.move(refreshedMapBounds.x+refreshedMapBounds.width/2,refreshedMapBounds.y+refreshedMapBounds.height/2)
    const scrollBeforeMapWheel=await scrollable.evaluate(element=>element.scrollTop)
    await page.mouse.wheel(0,-120)
    await expect.poll(()=>scrollable.evaluate(element=>element.scrollTop),{timeout:1000}).toBeLessThan(scrollBeforeMapWheel)
    expect(await scaleReadout.textContent()).toBe(scaleBeforeZoom)

    const scrollBeforeZoom=await scrollable.evaluate(element=>element.scrollTop)
    const modifiedWheel=await mapSurface.evaluate(element=>{
        const event=new WheelEvent('wheel',{deltaY:-240,bubbles:true,cancelable:true,ctrlKey:true})
        element.dispatchEvent(event)
        return event.defaultPrevented
    })
    expect(modifiedWheel).toBe(true)
    await expect.poll(()=>scaleReadout.textContent(),{timeout:1000}).not.toBe(scaleBeforeZoom)
    const scaleAfterZoom=await scaleReadout.textContent()
    const scaleChangeRatio=parseFloat(scaleAfterZoom)/parseFloat(scaleBeforeZoom)
    expect(scaleChangeRatio).toBeGreaterThan(0.25)
    expect(scaleChangeRatio).toBeLessThan(0.45)
    expect(await scrollable.evaluate(element=>element.scrollTop)).toBeCloseTo(scrollBeforeZoom,0)

    const scaleBeforeButton=await scaleReadout.textContent()
    await map.locator('.location-compare-control--out').click()
    await expect.poll(()=>scaleReadout.textContent(),{timeout:1000}).not.toBe(scaleBeforeButton)

    const streetPreset=map.locator('.location-compare-preset').first()
    await streetPreset.click()
    await expect(streetPreset).toHaveAttribute('aria-pressed','true')
    await map.locator('.location-compare-reset').click()
    await expect(scaleReadout).toHaveText(scaleBeforeZoom)
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
    await page.locator('section.section-shown a[href="#gallery:open"]:visible').first().click()
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
