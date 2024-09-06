/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,js,njk,md,liquid}"],
  theme: {
    extend: {
      colors: {
        "teafc-blue": "#0C95D4",
        "teafc-orange": "#FF8B00",
        "teafc-light-blue": "#EAFAFF",
        "teafc-light-blue-50-opacity": "#EAFAFF",
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
        "50%": "50%",
      },
      maxWidth: {
        "40%": "40%",
        "50%": "50%",
      },
      keyframes: {
        floatUp: {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
          },
          "10%": {
            transform: "translateY(-10%) rotate(3deg)",
          },
          "20%": {
            transform: "translateY(-20%) rotate(-3deg)",
          },
          "30%": {
            transform: "translateY(-30%) rotate(2deg)",
          },
          "40%": {
            transform: "translateY(-40%) rotate(-2deg)",
          },
          "50%": {
            transform: "translateY(-50%) rotate(1deg)",
          },
          "60%": {
            transform: "translateY(-60%) rotate(-1deg)",
          },
          "70%": {
            transform: "translateY(-70%) rotate(0deg)",
          },
          "80%": {
            transform: "translateY(-80%) rotate(-1deg)",
          },
          "90%": {
            transform: "translateY(-90%) rotate(1deg)",
          },
          "100%": {
            transform: "translateY(-150%) rotate(0deg)",
            visibility: "hidden",
          },
        },
        shrinkContainer: {
          "0%": {
            marginTop: "0%",
          },
          "10%": {
            marginTop: "-10%",
          },
          "20%": {
            marginTop: "-20%",
          },
          "30%": {
            marginTop: "-30%",
          },
          "40%": {
            marginTop: "-40%",
          },
          "50%": {
            marginTop: "-50%",
          },
          "60%": {
            marginTop: "-60%",
          },
          "70%": {
            marginTop: "-70%",
          },
          "80%": {
            marginTop: "-70%",
          },
          "90%": {
            marginTop: "-70%",
          },
          "100%": {
            marginTop: "-70%",
            visibility: "hidden",
          },
        },
      },
      animation: {
        "float-up": "floatUp 5s linear forwards 1s",
        "shrink-container": "shrinkContainer 5s linear forwards 1s",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
};
