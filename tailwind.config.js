/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      borderRadius: {
        '10': '10px', 
        'md': '0.375rem',
      },
    },
  },
  plugins: [],
});
