import {test, expect} from '@playwright/test'

for(const [mode, width, height] of [['desktop', 1440, 1000], ['short rail', 1920, 800], ['mobile', 390, 844], ['narrow', 240, 568]]) {
    test(`contact card opens and dismisses on ${mode}`, async ({page}) => {
        await page.setViewportSize({width, height})
        await page.goto('/#about')
        if(mode === 'short rail') await page.locator('.nav-sidebar-btn-toggle:visible').click()
        const avatar = page.locator('.nav-profile-card-media:visible').first()
        await avatar.click()
        const dialog = page.locator('.profile-contact-dialog')
        await expect(dialog).toBeVisible()
        await expect(dialog.locator('h2')).toHaveText('Lovro Musić')
        if(mode === 'desktop' || mode === 'mobile') {
            await expect(dialog.locator('.profile-contact-portrait img')).toHaveJSProperty('naturalWidth', 256)
            await page.screenshot({path: `docs/tmp/contact-${mode}.png`})
        }
        const box = await dialog.boundingBox()
        expect(Math.abs(box.x + box.width / 2 - width / 2)).toBeLessThan(2)
        expect(Math.abs(box.y + box.height / 2 - height / 2)).toBeLessThan(2)
        expect(box.height).toBeLessThan(height)
        expect(await dialog.evaluate(e => e.scrollHeight <= e.clientHeight + 1)).toBe(true)
        await expect(dialog.locator('.profile-contact-hint')).toHaveCount(0)
        expect(await dialog.evaluate(e => getComputedStyle(e, '::backdrop').backgroundColor)).toBe('rgba(0, 0, 0, 0.1)')
        await page.keyboard.press('Escape')
        await expect(dialog).toHaveCount(0)
        await expect(avatar).toBeFocused()
        await page.keyboard.press('Enter')
        await expect(dialog).toBeVisible()
        await page.mouse.click(2, 2)
        await expect(dialog).toHaveCount(0)
        await avatar.click()
        await dialog.locator('.profile-contact-close').click()
        await expect(dialog).toHaveCount(0)
    })
}

test('contact inactivity timer resets on interaction and links dismiss', async ({page}) => {
    await page.setViewportSize({width: 1440, height: 1000})
    await page.goto('/#about')
    const avatar = page.locator('.nav-profile-card-media:visible').first()
    await avatar.click()
    const dialog = page.locator('.profile-contact-dialog')
    await expect(dialog).toBeVisible()
    await page.clock.install()
    // Reopen after installing the clock so the timer is controlled.
    await page.keyboard.press('Escape')
    await avatar.click()
    await page.clock.fastForward(6000)
    await dialog.locator('h2').click()
    await page.clock.fastForward(6000)
    await expect(dialog).toBeVisible()
    await page.clock.fastForward(1001)
    await expect(dialog).toHaveCount(0)
    await avatar.click()
    await page.route('https://github.com/**', route => route.fulfill({body: 'Profile'}))
    await dialog.getByRole('link', {name: 'GitHub'}).click()
    await expect(dialog).toHaveCount(0)
})

test('contact card refits short screens without scrolling or clipped controls', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844})
    await page.goto('/#about')
    await page.clock.install()
    await page.clock.pauseAt(new Date(Date.now() + 1000))
    await page.locator('.nav-profile-card-media:visible').first().click()
    const dialog = page.locator('.profile-contact-dialog')
    for(const [width, height] of [[320, 568], [240, 568], [568, 320], [320, 320], [240, 320], [844, 390]]) {
        await page.setViewportSize({width, height})
        await expect.poll(() => dialog.evaluate(e => {
            const box = e.getBoundingClientRect()
            const controls = [...e.querySelectorAll('a, button')].map(el => el.getBoundingClientRect())
            return box.left >= 0 && box.right <= innerWidth && box.top >= 0 && box.bottom <= innerHeight &&
                e.scrollHeight <= e.clientHeight + 1 && e.scrollWidth <= e.clientWidth + 1 &&
                controls.every(r => r.left >= box.left && r.right <= box.right && r.top >= box.top && r.bottom <= box.bottom)
        })).toBe(true)
        await dialog.locator('h2').click()
    }
})
