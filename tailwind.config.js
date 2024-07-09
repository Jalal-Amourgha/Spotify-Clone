/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1ED760",
        gray: "#b3b3b3",
      },
      borderWidth: {
        1: "1px",
      },
      margin: {
        100: "100px",
      },
    },
  },
  plugins: [],
};
