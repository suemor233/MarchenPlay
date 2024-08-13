import './cssAsPlugin'

import { addDynamicIconSelectors } from '@iconify/tailwind'
import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    extend: {},
  },
  plugins: [addDynamicIconSelectors(), daisyui, require('./src/renderer/src/styles/tailwind-extend.css')],
  daisyui: {
    themes: ['cmyk', 'dark'],
  },
}
