/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {
      scale: {
        95: "0.95",
      },
    },
    colors: {
      primary: "#05BFDBCC",
      secondary: "#0A4D68",
      white: "#fff",
      pink: "#883DCF",
      "light-pink": "#F4ECFB",
      carrot: "#F86624",
      "light-carrot": "#FFF0EA",
      green: "#1A9882",
      "light-green": "#22CAAD",
      "lighter-green": "#E9FAF7",
      red: "#EB3D4D",
      "light-red": "#FEECEE",
      gray: "#777980",
      "light-gray": "#858D9D",
      "lighter-gray": "#DFE2E9",
      danger: "#ED5151",
    },
  },
  plugins: [],
};
