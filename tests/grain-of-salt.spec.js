import {test, expect} from '@playwright/test'

test.setTimeout(60000)

test.beforeEach(async ({page}) => {
    page.__functionalErrors = []
    page.on('pageerror', (error) => page.__functionalErrors.push(error.message))
    await page.addInitScript(() => {
        if(!localStorage.getItem('storage-preferences')) {
            localStorage.setItem('storage-preferences', JSON.stringify({
                preferredLanguage: 'en',
                preferredTheme: 'dark',
                preferredCursorMode: 'magic'
            }))
        }
    })
})

test.afterEach(async ({page}) => {
    expect(page.__functionalErrors, 'uncaught application errors').toEqual([])
})

async function openSection(page, route) {
    await page.goto('/#' + route, {waitUntil: 'domcontentloaded'})
    const section = page.locator(`#section-${route}.section-shown`)
    await expect(section.locator('.section-content-page-ready')).toBeVisible()
    await expect(section.locator('.section-loading-placeholder')).toHaveCount(0)
    await expect(section.locator('article').first()).toBeVisible()
    if(route === 'about') {
        await page.keyboard.press('Escape')
    }
    return section
}

test('desktop salt shaker toggles cursor mode and navigates to Contact complaint box in bug report mode', async ({page}) => {
    await page.setViewportSize({width: 1366, height: 768})
    await openSection(page, 'about')

    const saltShaker = page.locator('button.layout-salt-shaker')
    await expect(saltShaker).toBeVisible()
    await expect(saltShaker).toHaveAttribute('aria-label', /Report a problem or complaint/i)

    await saltShaker.click()

    await expect(page).toHaveURL(/#contact$/)
    const contactSection = page.locator('#section-contact.section-shown')
    await expect(contactSection.locator('.section-content-page-ready')).toBeVisible()

    const complaintArticle = page.locator('#article-4-section-contact')
    await expect(complaintArticle).toBeVisible()

    // Verify bug-report mode was preselected on arrival from salt shaker
    const destinationTriggerValue = complaintArticle.locator('.article-complaint-form-select-value')
    await expect(destinationTriggerValue).toHaveText('Report a website bug')

    // Verify progressive disclosure drawer is visible and focus landed inside the complaint form
    const reportDrawer = complaintArticle.locator('.article-complaint-form-report-drawer')
    await expect(reportDrawer).toBeVisible()

    const storedPrefs = await page.evaluate(() => JSON.parse(localStorage.getItem('storage-preferences') || '{}'))
    expect(storedPrefs.preferredCursorMode).toBe('medieval')

    // Verify browser Back returns to #about cleanly
    await page.goBack()
    await expect(page).toHaveURL(/#about$/)
    await expect(page.locator('#section-about.section-shown')).toBeVisible()
})

test('mobile salt shaker tap navigates to Contact and scrolls complaint form into view above bottom nav', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844})
    await openSection(page, 'my-software')

    const saltShaker = page.locator('button.layout-salt-shaker')
    await expect(saltShaker).toBeVisible()
    await saltShaker.click()

    await expect(page).toHaveURL(/#contact$/)
    const complaintArticle = page.locator('#article-4-section-contact')
    await expect(complaintArticle).toBeVisible()

    await expect(complaintArticle.locator('.article-complaint-form-select-value')).toHaveText('Report a website bug')

    // Wait until scroll settles so the complaint textarea is visible inside the viewport
    await expect.poll(async () => {
        return complaintArticle.locator('#complaint-form-textarea').evaluate((el) => {
            const rect = el.getBoundingClientRect()
            return rect.top >= 0 && rect.bottom <= window.innerHeight
        })
    }).toBe(true)
})

test('already on Contact: clicking salt shaker scrolls to complaint box and preserves existing draft text', async ({page}) => {
    await page.setViewportSize({width: 1366, height: 768})
    await openSection(page, 'contact')

    const complaintArticle = page.locator('#article-4-section-contact')
    const textarea = complaintArticle.locator('#complaint-form-textarea')
    await textarea.fill('Draft started before clicking salt shaker')

    // Scroll back to top of Contact container first
    await page.evaluate(() => {
        const scroller = document.getElementById('scrollable-contact')
        if(scroller) scroller.scrollTop = 0
    })

    await page.locator('button.layout-salt-shaker').click()

    await expect(complaintArticle.locator('.article-complaint-form-select-value')).toHaveText('Report a website bug')
    await expect(textarea).toHaveValue('Draft started before clicking salt shaker')

    await expect.poll(async () => {
        return page.evaluate(() => {
            const scroller = document.getElementById('scrollable-contact')
            return scroller ? scroller.scrollTop : 0
        })
    }).toBeGreaterThan(50)
})

test('bug report flow shows deterministic weak-description hint, expands progressive details, and submits via transport', async ({page}) => {
    await page.setViewportSize({width: 1366, height: 768})
    await page.addInitScript(() => {
        window.__submittedBugReports = []
        window.__mockBugReportTransport = async (bundle) => {
            window.__submittedBugReports.push(bundle)
            return {
                success: true,
                reportId: 'GOS-TEST42',
                duplicate: false
            }
        }
    })

    await openSection(page, 'contact')
    await page.locator('button.layout-salt-shaker').click()

    const complaintArticle = page.locator('#article-4-section-contact')
    const textarea = complaintArticle.locator('#complaint-form-textarea')

    // 1. Type a vague bug description -> deterministic quality hint appears
    await textarea.fill("The button doesn't work.")
    const qualityHint = complaintArticle.locator('.article-complaint-form-quality-hint')
    await expect(qualityHint).toBeVisible()

    // 2. Expand optional reproduction details and fill them
    const detailsToggle = complaintArticle.locator('.article-complaint-form-details-toggle')
    await detailsToggle.click()
    await expect(detailsToggle).toHaveAttribute('aria-expanded', 'true')

    await complaintArticle.locator('select[name="affectedSection"]').selectOption('portfolio')
    await complaintArticle.locator('select[name="reproducibility"]').selectOption('always')
    await complaintArticle.locator('input[name="steps"]').fill('1. Open portfolio 2. Click project card')
    await complaintArticle.locator('input[name="expectedBehavior"]').fill('Modal should open cleanly')

    // With steps/expectedBehavior provided or detailed description, quality hint clears
    await textarea.fill('In the Portfolio section on desktop, clicking the project card button does not open the modal.')
    await expect(qualityHint).toHaveCount(0)

    // 3. Submit report and verify status confirmation + payload
    await complaintArticle.locator('button.article-complaint-form-send-button').click()
    const statusBanner = complaintArticle.locator('.article-complaint-form-status')
    await expect(statusBanner).toContainText('GOS-TEST42')

    const captured = await page.evaluate(() => window.__submittedBugReports)
    expect(captured).toHaveLength(1)
    expect(captured[0].type).toBe('bug_report')
    expect(captured[0].affectedSection).toBe('portfolio')
    expect(captured[0].reproducibility).toBe('always')
    expect(captured[0].diagnostics.source).toBe('salt-shaker')
})

test('existing playful complaint destinations (Nowhere and Chaos mode) continue working unchanged', async ({page}) => {
    await page.setViewportSize({width: 1366, height: 768})
    await openSection(page, 'contact')

    const complaintArticle = page.locator('#article-4-section-contact')
    const textarea = complaintArticle.locator('#complaint-form-textarea')
    const sendButton = complaintArticle.locator('button.article-complaint-form-send-button')

    // Default destination is Nowhere -> sparks burst and clears textarea
    await textarea.fill('Just venting into nowhere')
    await sendButton.click()
    await expect(textarea).toHaveValue('')
    await expect(page.locator('.article-complaint-form-burst').first()).toBeAttached()

    // Switch to Chaos mode -> opens complaint popups and Escape closes one
    await complaintArticle.locator('.article-complaint-form-select-trigger').click()
    await complaintArticle.getByRole('option', {name: 'Chaos mode'}).click()
    await sendButton.click()
    await expect(page.locator('.article-complaint-form-popup')).toHaveCount(30)
    await page.keyboard.press('Escape')
    await expect(page.locator('.article-complaint-form-popup')).toHaveCount(29)
})

test('bug report flow does not bypass security gateway via EmailJS when Worker returns 404 or 503 kill switch', async ({page}) => {
    await page.setViewportSize({width: 1366, height: 768})
    const emailJsCalls = []

    await page.route('**/api.emailjs.com/**', async (route) => {
        emailJsCalls.push(route.request().url())
        await route.fulfill({status: 200, body: 'OK'})
    })

    await page.route('**/api/grain-of-salt/report', async (route) => {
        await route.fulfill({
            status: 503,
            contentType: 'application/json',
            body: JSON.stringify({
                ok: false,
                errorCode: 'submissions_disabled',
                message: 'Automated reporting is temporarily paused.'
            })
        })
    })

    await openSection(page, 'contact')
    await page.locator('button.layout-salt-shaker').click()

    const complaintArticle = page.locator('#article-4-section-contact')
    const textarea = complaintArticle.locator('#complaint-form-textarea')
    await textarea.fill('In the Contact section on desktop, testing that 503 kill switch does not fall back to EmailJS.')

    await complaintArticle.locator('button.article-complaint-form-send-button').click()

    const errorBanner = complaintArticle.locator('.article-complaint-form-message-error')
    await expect(errorBanner).toBeVisible()
    await expect(errorBanner).toContainText('Automated bug reporting is not connected in this static preview yet')
    expect(emailJsCalls).toHaveLength(0)
})

