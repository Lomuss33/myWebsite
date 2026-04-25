import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react()],
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
