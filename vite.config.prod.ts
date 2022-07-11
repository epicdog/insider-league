import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel([
            'resources/js/app.tsx',
        ]),
        react(),
    ],
    server: { 
        https: true, 
        host: '0.0.0.0',
        port: 5173,
    }, 
});
