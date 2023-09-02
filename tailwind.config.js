/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateX(-25%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(0)' }, // 添加100%的状态
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
