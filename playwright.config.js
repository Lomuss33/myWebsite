import {defineConfig} from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    timeout: 90000,
    expect: {timeout: 15000},
    workers: 2,
    reporter: [['list'], ['json', {outputFile: 'test-results/responsive.json'}]],
    use: {
        baseURL: 'http://localhost:5173',
        browserName: process.env.PLAYWRIGHT_BROWSER || 'chromium',
        reducedMotion: 'reduce',
        screenshot: 'only-on-failure',
        launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH ? {executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH} : {},
    },
    webServer: {command: 'npm run dev -- --host localhost', url: 'http://localhost:5173', reuseExistingServer: true, timeout: 120000},
})
