// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas:  '#F7F6F2',
        ink:     '#141210',
        mid:     '#8A8680',
        teal: {
          DEFAULT: '#1C4A45',
          dark:    '#153835',
          light:   '#E8F0EF',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        btn: '3px',
      },
    },
  },
  plugins: [],
}

export default config
