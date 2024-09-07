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
          "5%": {
            transform: "translateY(-2%) rotate(0.5deg)", // Minimal initial horizontal sway
          },
          "15%": {
            transform: "translateY(-10%) rotate(-0.5deg)", // Small counter-swing
          },
          "30%": {
            transform: "translateY(-25%) rotate(0.25deg)", // Reduced rotation as the vertical movement increases
          },
          "45%": {
            transform: "translateY(-45%) rotate(-0.25deg)", // Subtle pendulum effect
          },
          "60%": {
            transform: "translateY(-70%) rotate(0.15deg)", // Continuation of the pendulum motion, but very minor
          },
          "75%": {
            transform: "translateY(-100%) rotate(-0.15deg)", // Slight back swing
          },
          "85%": {
            transform: "translateY(-120%) rotate(0deg)", // Moving up towards the edge
          },
          "92%": {
            transform: "translateY(-135%) rotate(0deg)", // Approaching the offscreen position
          },
          "100%": {
            transform: "translateY(-150%) rotate(0deg)", // Fully offscreen
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
        "float-up-desktop": "floatUpDesktop 3s linear forwards 1s",
        "float-up-mobile": "floatUpMobile 8s linear forwards",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ preferredStrategy: "pseudoelements" }),
  ],
};
