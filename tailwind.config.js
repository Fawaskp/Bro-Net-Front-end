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
      },
      height: {
        'screen-90':'90vh'
      }
    },
  },
  plugins: [],
});
