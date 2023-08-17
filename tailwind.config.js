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
      },
      minHeight: {
        '96': '26rem', // Adjust the value as needed
      },
      colors: {
        customColor: "#0C1E40",
        bgColor: "#F8F8F8",
      },
    },
  },
  plugins: [],
});
