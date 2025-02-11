import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1FCCD1",
        danger: "#d63031",
        gray: "#C3C3C3",
        gray100: "#ACACAC",
        gray200: "#f1f3f4",
        light: "#FFFFFF",
        dark: "#212121"
      },
    },
  },
  plugins: [],
} satisfies Config;
