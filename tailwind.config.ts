import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-be-viet)', 'Be Vietnam Pro', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        // Bảng màu lá số: lấy cảm hứng từ giấy dó cổ + son vermilion
        parchment: {
          50:  '#fefaf0',
          100: '#fdf3d7',
          200: '#fae9b0',
          DEFAULT: '#f5deb3',
        },
        cinnabar:  '#c0392b',   // chính diệu đỏ
        jade:      '#27744a',   // cát tinh xanh lá
        cobalt:    '#1a4e8c',   // Hóa Kỵ xanh đậm
        gold:      '#b8860b',   // Lộc Tồn / Hóa Lộc
        ink:       '#1c1410',   // mực tàu
        inkLight:  '#3d2b1f',
        vermilion: '#cc2200',
        muted:     '#7a6a58',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
    },
  },
  plugins: [],
}

export default config
