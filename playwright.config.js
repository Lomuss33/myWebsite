import {defineConfig} from '@playwright/test'

const productionBuild = process.env.PLAYWRIGHT_TEST_BUILD === '1'
const port = productionBuild ? 4173 : 5173
const baseURL = `http://localhost:${port}`

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    timeout: 90000,
    expect: {timeout: 15000},
    workers: 2,
    retries: productionBuild ? 1 : 0,
    reporter: 'list',
    use: {
        baseURL,
        browserName: process.env.PLAYWRIGHT_BROWSER || 'chromium',
        reducedMotion: 'reduce',
        screenshot: 'only-on-failure',
        launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH ? {executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH} : {},
    },
    webServer: {
        command: productionBuild
            ? 'npm run preview -- --host localhost --port 4173 --strictPort'
            : 'npm run dev -- --host localhost --port 5173 --strictPort',
        url: baseURL,
        reuseExistingServer: !productionBuild && !process.env.CI,
        timeout: 120000,
    },
})
