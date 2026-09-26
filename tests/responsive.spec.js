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
                        // Controls keep their real 44px hit area in every layout mode.
                        for(const size of sizes) expect(size).toBeGreaterThanOrEqual(43.5)
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

    for(const [width,height] of [[1366,768],[3440,1440]]) {
        await page.setViewportSize({width,height})
        await expect(page.locator('html')).toHaveAttribute('data-layout',resolveLayout(width,height))
        const metrics=await page.evaluate(()=>{
            const get=(selector)=>{
                const element=document.querySelector(selector)
                if(!element) return null
                const rect=element.getBoundingClientRect()
                return {font:parseFloat(getComputedStyle(element).fontSize),height:rect.height}
            }
            return {
                heading:get('.section-header-home h2'),
                contact:get('#article-1-section-about .article-inline-list-item-control'),
                chip:get('#article-1-section-about .article-inline-list-item-pill'),
                intro:get('.article-feature-item-home-style-intro .article-feature-item-text'),
                skillTitle:get('#article-3-section-about .article-info-list-item-info-title'),
                skillBody:get('#article-3-section-about .article-info-list-item-info-text'),
                name:get('#article-5-section-about .name-origin-word'),
                nameCopy:get('#article-5-section-about .name-origin-copy'),
                stackValue:get('#article-7-section-about .article-stack-item-title-main'),
                homeHeight:document.querySelector('#scrollable-about').scrollHeight
            }
        })
        expect(metrics.heading.font).toBeGreaterThanOrEqual(28)
        expect(metrics.heading.font).toBeLessThanOrEqual(33)
        expect(metrics.contact.height).toBeGreaterThanOrEqual(44)
        expect(metrics.chip.height).toBeLessThanOrEqual(38)
        expect(metrics.intro.font).toBeGreaterThanOrEqual(16)
        expect(metrics.intro.font).toBeLessThanOrEqual(17)
        expect(metrics.skillTitle.font).toBeGreaterThanOrEqual(14)
        expect(metrics.skillTitle.font).toBeLessThanOrEqual(16)
        expect(metrics.skillBody.font).toBeGreaterThanOrEqual(14)
        expect(metrics.skillBody.font).toBeLessThanOrEqual(15.5)
        expect(metrics.name.font).toBeGreaterThanOrEqual(80)
        expect(metrics.name.font).toBeLessThanOrEqual(92)
        expect(metrics.nameCopy.font).toBeGreaterThanOrEqual(14)
        expect(metrics.nameCopy.font).toBeLessThanOrEqual(16)
        expect(metrics.stackValue.font).toBeGreaterThanOrEqual(21)
        expect(metrics.stackValue.font).toBeLessThanOrEqual(24)
        expect(metrics.homeHeight).toBeLessThan(2800)
    }
})

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
                closingCopy:measure('#article-3-section-experience .pretext-draggable-inline-icon-text-paragraph'),
                dragTarget:measure('#article-3-section-experience .pretext-draggable-inline-icon-text-rail-hit-area'),
                documentWidth:document.documentElement.scrollWidth
            }
        })
        expect(metrics.sectionTitle.font).toBeGreaterThanOrEqual(28)
        expect(metrics.sectionTitle.font).toBeLessThanOrEqual(32)
        expect(metrics.timelineHeading.font).toBeLessThanOrEqual(31)
        expect(metrics.timelineTitle.font).toBeLessThanOrEqual(19)
        expect(metrics.timelineBody.font).toBeGreaterThanOrEqual(14.5)
        expect(metrics.timelineBody.font).toBeLessThanOrEqual(15.2)
        expect(metrics.timelineCard.height).toBeLessThan(350)
        expect(metrics.avatar.width).toBeLessThanOrEqual(171)
        expect(metrics.flyerHeading.font).toBeGreaterThanOrEqual(17)
        expect(metrics.flyerHeading.font).toBeLessThanOrEqual(19)
        expect(metrics.book.width).toBeLessThanOrEqual(705)
        expect(metrics.bookPage.font).toBeGreaterThanOrEqual(14)
        expect(Math.abs(metrics.flyerPage.width-metrics.bookPage.width)).toBeLessThanOrEqual(1)
        expect(Math.abs(metrics.flyerPage.height-metrics.bookPage.height)).toBeLessThanOrEqual(1)
        expect(metrics.closingCardHeading.width).toBeLessThanOrEqual(160)
        expect(metrics.closingHeading.font).toBeLessThanOrEqual(18.5)
        expect(metrics.closingCardHeading.font).toBeLessThanOrEqual(19)
        expect(metrics.closingCopy.font).toBeGreaterThanOrEqual(14)
        expect(metrics.closingCopy.font).toBeLessThanOrEqual(15.2)
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
    expect(metrics.articleTitle.font).toBeLessThanOrEqual(32)
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
    await expect(firstTimelineCard.locator('.article-timeline-item-info-for-timelines-education-meta-row')).toHaveCount(3)
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
        expect(metrics.projectTitle.font).toBeGreaterThanOrEqual(18)
        expect(metrics.projectTitle.font).toBeLessThanOrEqual(21)
        expect(metrics.projectCategory.font).toBeLessThanOrEqual(15)
        expect(metrics.projectCopy.font).toBeGreaterThanOrEqual(14)
        expect(metrics.projectCopy.font).toBeLessThanOrEqual(16)
        expect(metrics.projectAction.height).toBeGreaterThanOrEqual(43.5)
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
    await expect(page.locator('#article-2-section-my-software .article-testimonials-item-balloon').first()).toBeVisible()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391)

    await page.setViewportSize({width:1440,height:2560})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-1-section-my-software .article-portfolio-item').first()).toBeVisible()
    await expect(page.locator('#article-2-section-my-software .article-testimonials-item-balloon').first()).toBeVisible()
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
                projectTitle:measure('#article-1-section-my-hardware .article-portfolio-item-title-main'),
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
        expect(metrics.projectTitle.font).toBeGreaterThanOrEqual(18)
        expect(metrics.projectTitle.font).toBeLessThanOrEqual(21)
        expect(metrics.projectCopy.font).toBeGreaterThanOrEqual(14)
        expect(metrics.projectCopy.font).toBeLessThanOrEqual(16)
        expect(metrics.projectAction.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.filter.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.summary.height).toBeLessThanOrEqual(46)
        expect(metrics.probeBlock.height).toBeLessThan(470)
        expect(metrics.probeItem.height).toBeLessThan(365)
        expect(metrics.probeTitle.font).toBeGreaterThanOrEqual(15)
        expect(metrics.probeMeta.font).toBeGreaterThanOrEqual(13.5)
        expect(metrics.probeValue.font).toBeGreaterThanOrEqual(13.5)
        expect(metrics.unlock.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.documentWidth).toBeLessThanOrEqual(width+1)

        if(index===0) {
            const projects=page.locator('#article-1-section-my-hardware .article-portfolio-item')
            await expect(projects).toHaveCount(8)
            await page.getByRole('button',{name:/Personal/}).click()
            expect(await page.locator('#article-1-section-my-hardware .article-portfolio-item:visible').count()).toBeGreaterThan(0)
            await page.getByRole('button',{name:/All Projects/}).click()
            await expect(page.locator('#article-1-section-my-hardware .article-portfolio-item:visible')).toHaveCount(8)

            const probe=page.locator('#article-2-section-my-hardware')
            const itemCountBefore=await probe.locator('.article-data-probe-item').count()
            await expect(probe.locator('.article-data-probe-unlock-btn')).toBeVisible()
            await probe.locator('.article-data-probe-unlock-btn').click()
            expect(await probe.locator('.article-data-probe-item').count()).toBeGreaterThan(itemCountBefore)
            const probeButtons=await probe.locator('button.article-data-probe-action-btn, button.article-data-probe-unlock-btn, button.copy-button.copy-button-pill').evaluateAll(buttons=>buttons.map(button=>Math.min(button.getBoundingClientRect().width,button.getBoundingClientRect().height)))
            expect(probeButtons.every(size=>size>=43.5)).toBe(true)
        }
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
    expect(tallMobileFont).toBeGreaterThan(16)
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

            await page.locator('#article-2-section-my-writings .falling-word').first().click()
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
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391)

    await page.setViewportSize({width:1440,height:2560})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-2-section-my-writings .article-falling-words-stage')).toBeVisible()
    await expect(page.locator('#article-6-section-my-writings canvas.illustrated-manuscript-canvas')).toBeVisible()
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
                pearlGate:measure('#article-5-section-my-art .article-secret-pearls-gate-button'),
                docWidth:document.documentElement.scrollWidth
            }
        })

        expect(metrics.articleTitle.font).toBeGreaterThanOrEqual(20)
        expect(metrics.articleTitle.font).toBeLessThanOrEqual(23)
        expect(metrics.photoCard.height).toBeLessThan(190)
        expect(metrics.photoAvatar.width).toBeGreaterThanOrEqual(115)
        expect(metrics.photoAvatar.width).toBeLessThanOrEqual(150)
        expect(metrics.photoCopy.font).toBeGreaterThanOrEqual(15)
        expect(metrics.photoCopy.font).toBeLessThanOrEqual(17)
        expect(metrics.digitalCard.height).toBeLessThan(235)
        expect(metrics.digitalCopy.font).toBeGreaterThanOrEqual(15)
        expect(metrics.webStage.height).toBeGreaterThanOrEqual(207)
        expect(metrics.webStage.height).toBeLessThanOrEqual(233)
        expect(metrics.webEnter.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.stackColumns).toBe(6)
        expect(metrics.stackCard.width).toBeLessThan(190)
        expect(metrics.stackGrid.height).toBeLessThan(2800)
        expect(metrics.pearlGate.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.docWidth).toBeLessThanOrEqual(width+1)

        if(index===0) {
            await expect(page.locator('#article-1-section-my-art .article-timeline-item-info-for-timelines')).toHaveCount(3)
            await expect(page.locator('#article-2-section-my-art .article-timeline-item-info-for-timelines')).toHaveCount(3)
            await expect(page.locator('#article-4-section-my-art .article-stack-item-compact')).toHaveCount(71,{timeout:10000})

            const webArt=page.locator('#article-3-section-my-art')
            await webArt.locator('.article-web-art-intro-cover-button-primary').click({force:true})
            await expect(webArt.locator('.article-web-art-intro-cover-hidden')).toBeVisible()

            const pearls=page.locator('#article-5-section-my-art')
            await pearls.getByRole('button',{name:'Reveal Secret pearls'}).click()
            await expect(pearls.locator('.article-secret-pearls-grid')).toBeVisible()
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
    await expect(page.locator('#article-1-section-my-art .article-timeline-item-avatar').first()).toBeVisible()
    await expect(page.locator('#article-3-section-my-art .article-web-art-stage')).toBeVisible()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(569)

    await page.setViewportSize({width:390,height:844})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    await expect(page.locator('#article-2-section-my-art .article-timeline-item-info-for-timelines').first()).toBeVisible()
    await expect(page.locator('#article-3-section-my-art .article-web-art-stage')).toBeVisible()
    await expect(page.locator('#article-5-section-my-art .article-secret-pearls-gate-button')).toBeVisible()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391)

    await page.setViewportSize({width:1440,height:2560})
    await expect(page.locator('html')).toHaveAttribute('data-layout','mobile')
    const mobileTitleSize=await page.locator('#article-1-section-my-art h4.article-title').evaluate(element=>parseFloat(getComputedStyle(element).fontSize))
    expect(mobileTitleSize).toBeGreaterThan(28)
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
                contactInput:measure('#article-2-section-contact input.form-input'),
                contactTextarea:measure('#article-2-section-contact textarea.form-textarea'),
                sendButton:measure('#article-2-section-contact button[type="submit"]'),
                locationArticle:measure('#article-3-section-contact'),
                mapCard:measure('#article-3-section-contact .location-compare-card'),
                mapCanvas:measure('#article-3-section-contact .location-compare-map'),
                mapControls:[...document.querySelectorAll('#article-3-section-contact .location-compare-preset, #article-3-section-contact .location-compare-actions button')].map(button=>button.getBoundingClientRect().height),
                complaintArticle:measure('#article-4-section-contact'),
                complaintPanel:measure('#article-4-section-contact .article-complaint-form-main'),
                complaintTextarea:measure('#article-4-section-contact textarea.form-textarea'),
                complaintDestination:measure('#article-4-section-contact .article-complaint-form-select-trigger'),
                documentWidth:document.documentElement.scrollWidth
            }
        })

        expect(metrics.infoCard.height).toBeLessThan(150)
        expect(metrics.infoAvatar.width).toBeGreaterThanOrEqual(44)
        expect(metrics.copyButtons.length).toBeGreaterThan(0)
        expect(metrics.copyButtons.every(height=>height>=43.5)).toBe(true)
        expect(metrics.contactInput.height).toBeGreaterThanOrEqual(44)
        expect(metrics.contactTextarea.height).toBeLessThan(190)
        expect(metrics.sendButton.height).toBeGreaterThanOrEqual(43.5)
        expect(metrics.locationArticle.height).toBeLessThan(900)
        expect(metrics.mapCard.height).toBeLessThan(470)
        expect(metrics.mapCanvas.height).toBeGreaterThan(300)
        expect(metrics.mapControls.every(height=>height>=43.5)).toBe(true)
        expect(metrics.complaintPanel.height).toBeLessThan(250)
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
        expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1)
        expect(await page.locator('#article-2-section-contact textarea.form-textarea').evaluate(element=>getComputedStyle(element).getPropertyValue('--textarea-min-height').trim())).toBe('')
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
