import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const GENERATED_DIR = path.resolve(process.cwd(), 'public/generated')

const readGeneratedFragment = (fileName) => {
    const filePath = path.join(GENERATED_DIR, fileName)

    if(!fs.existsSync(filePath))
        return ''

    return fs.readFileSync(filePath, 'utf8')
}

const machineCvHtmlPlugin = () => ({
    name: 'machine-cv-html-injection',
    transformIndexHtml(html) {
        return html
            .replace('<!-- MACHINE_CV_HEAD -->', readGeneratedFragment('machine-cv-head.html'))
            .replace('<!-- MACHINE_CV_BODY -->', readGeneratedFragment('machine-cv-body.html'))
    }
})

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        react(),
        machineCvHtmlPlugin()
    ],
    build: {
        target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        {name: 'physics', test: /node_modules[\\/]matter-js[\\/]/, priority: 100},
                        {name: 'email', test: /node_modules[\\/]@emailjs[\\/]/, priority: 95},
                        {name: 'qrcode', test: /node_modules[\\/]qrcode[\\/]/, priority: 90},
                        {name: 'three', test: /node_modules[\\/]three[\\/]/, priority: 85},
                        {name: 'swiper', test: /node_modules[\\/]swiper[\\/]/, priority: 80},
                        {name: 'react-vendor', test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/, priority: 75},
                        {name: 'icons', test: /node_modules[\\/](?:@fortawesome|primeicons)[\\/]/, priority: 70},
                        {name: 'bootstrap', test: /node_modules[\\/](?:bootstrap|react-bootstrap)[\\/]/, priority: 65},
                        {name: 'motion', test: /node_modules[\\/](?:motion|framer-motion|motion-dom|motion-utils)[\\/]/, priority: 60},
                        {name: 'vendor', test: /node_modules[\\/]/, priority: 0}
                    ]
                }
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
                silenceDeprecations: ["import"],
            },
        },
    },
})
