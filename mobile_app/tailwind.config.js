/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bgDeep: '#0B0A08',
        bgSurface: '#14120F',
        goldPrimary: '#D4AF37',
        goldMuted: '#8A7323',
        textPrimary: '#F7F5F0',
        textSecondary: '#A39E93',
      },
    },
  },
  plugins: [],
}
