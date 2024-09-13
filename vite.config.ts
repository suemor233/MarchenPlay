import fs from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(fs.readFileSync(join(__dirname, 'package.json'), 'utf-8'))

const ROOT = './src/renderer'

const vite = () => defineConfig({
  build: {
    outDir: resolve(__dirname, 'out/web'),
    target: 'ES2022',
    rollupOptions: {
      input: {
        main: resolve(ROOT, '/index.html'),
      },
    },
  },
  root: ROOT,
  envDir: resolve(__dirname, '.'),
  resolve: {
    alias: {
      '@renderer': resolve('src/renderer/src'),
    },
  },
  base: '/',
  server: {
    port: 1106,
    host: true,
  },
  plugins: [
    react(),
    mkcert(),
  ],
  define: {
    APP_NAME: JSON.stringify(packageJson.name),
  },
})
export default vite
