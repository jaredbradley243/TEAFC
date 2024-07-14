/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,js,njk,md,liquid}"],
  theme: {
    extend: {
      colors: {
        "center-blue": "#0C95D4",
        "center-orange": "#FF8B00",
        "center-light-blue": "#EAFAFF",
        "center-light-orange": "#FFCD91",
      },
    },
  },
  plugins: [],
};
