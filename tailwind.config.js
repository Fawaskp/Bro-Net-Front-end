/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        white:'#ffffff'
      },
      borderRadius: {
        '10': '10px', 
      },
      height: {
        'screen-90':'90vh'
      },
      minHeight: {
        '96': '26rem', // Adjust the value as needed
      },
      maxHeight: {
        'screen-40rem': '40rem'
      },
    },
  },
  plugins: [],
});
