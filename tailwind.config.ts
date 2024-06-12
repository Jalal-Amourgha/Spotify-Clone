import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
export default config;
