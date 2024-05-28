/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "black-primary": "#131110",
        "blue-primary": "#1f3e72",
        "blue-secondary": "#4066ff",
        "blue-tertiary": "#eeeeff",
        "orange-primary": "#ff922d",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
