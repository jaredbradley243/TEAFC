/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,js,njk,md,liquid}"],
  theme: {
    extend: {
      colors: {
        "teafc-blue": "#0C95D4",
        "teafc-orange": "#FF8B00",
        "teafc-light-blue": "#EAFAFF",
        "teafc-light-orange": "#FFCD91",
      },
      aspectRatio: {
        "16/9": "16 / 9",
      },
      spacing: {
        "40%": "40%",
        "50%": "50%",
        "60%": "60%",
      },
      minWidth: {
        "40%": "40%",
        "50%": "50%"
      },
      maxWidth: {
        "40%": "40%",
        "50%": "50%"
      },
    },
  },
  plugins: [],
};