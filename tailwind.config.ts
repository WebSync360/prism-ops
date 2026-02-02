import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
// Inside your tailwind.config.ts 'extend' section:
extend: {
  colors: {
    prism: {
      navy: "#141E30",
      deepRed: "#2C0F12",
      earth: "#2E1F1B",
      clay: "#5E4B43",
    }
  }
},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config