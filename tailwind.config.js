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
        floatUpDesktop: {
          "10%": {
            transform: "translateY(-15vh) rotate(3deg)",
          },
          "20%": {
            transform: "translateY(-30vh) rotate(-3deg)",
          },
          "30%": {
            transform: "translateY(-45vh) rotate(2deg)",
          },
          "40%": {
            transform: "translateY(-60vh) rotate(-2deg)",
          },
          "50%": {
            transform: "translateY(-75vh) rotate(1deg)",
          },
          "60%": {
            transform: "translateY(-90vh) rotate(-1deg)",
          },
          "70%": {
            transform: "translateY(-105vh) rotate(0deg)",
          },
          "80%": {
            transform: "translateY(-120vh) rotate(-1deg)",
          },
          "90%": {
            transform: "translateY(-135vh) rotate(1deg)",
          },
          "100%": {
            transform: "translateY(-150vh) rotate(0deg)",
          },
        },

        floatUpMobile: {
          "10%": {
            transform: "translateY(-40%) rotate(3deg)",
          },
          "20%": {
            transform: "translateY(-80%) rotate(-3deg)",
          },
          "30%": {
            transform: "translateY(-120%) rotate(2deg)",
          },
          "40%": {
            transform: "translateY(-160%) rotate(-2deg)",
          },
          "50%": {
            transform: "translateY(-200%) rotate(1deg)",
          },
          "60%": {
            transform: "translateY(-240%) rotate(-1deg)",
          },
          "70%": {
            transform: "translateY(-280%) rotate(0deg)",
          },
          "80%": {
            transform: "translateY(-320%) rotate(-1deg)",
          },
          "90%": {
            transform: "translateY(-360%) rotate(1deg)",
          },
          "100%": {
            transform: "translateY(-400%) rotate(0deg)",
          },
        },
      },
      animation: {
        "float-up-desktop": "floatUpDesktop 5s linear forwards 1s",
        "float-up-mobile": "floatUpMobile 8s linear forwards",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
};
