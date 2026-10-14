import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#A6AC1A",
          "green-dark": "#767B12",
          "green-darker": "#565A0D",
          "green-tint": "#F1F2E1",
          "green-tint-2": "#E3E5C3",
          black: "#181614",
          ink: "#2B2926",
          gray: "#6B6A64",
          "gray-light": "#A8A69F",
          line: "#E4E2D8",
          cream: "#FAFAF6",
        },
      },
      fontFamily: {
        sans: [
          "'Google Sans Flex'",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      fontWeight: {
        bold: "600",
        extrabold: "600",
        black: "600",
      },
    },
  },
  plugins: [],
};
export default config;
