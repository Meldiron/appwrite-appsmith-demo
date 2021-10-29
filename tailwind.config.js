module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,jsx,ts,tsx,vue}",
    "./pages/*.{js,jsx,ts,tsx,vue}",
    "./store/**/*.{js,jsx,ts,tsx,vue}",
    "./store/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f02e65",
        pink: {
          DEFAULT: "#F02E65",
          50: "#FFFFFF",
          100: "#FEECF1",
          200: "#FABDCE",
          300: "#F78DAB",
          400: "#F35E88",
          500: "#F02E65",
          600: "#DB1049",
          700: "#AC0C39",
          800: "#7C092A",
          900: "#4D051A",
        },
      },
    },
  },
};
