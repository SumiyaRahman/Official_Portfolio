/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8750f7',
        secondary: '#2a1454',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

// #8750f7 0, #2a1454 51%, #8750f7