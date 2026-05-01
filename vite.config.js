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
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('three'))
                            return 'three';

                        if (id.includes('swiper'))
                            return 'swiper';

                        if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/'))
                            return 'react-vendor';

                        if (id.includes('@fortawesome') || id.includes('primeicons'))
                            return 'icons';

                        if (id.includes('bootstrap') || id.includes('react-bootstrap'))
                            return 'bootstrap';

                        if (id.includes('motion'))
                            return 'motion';

                        return 'vendor';
                    }
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
