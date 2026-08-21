import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#17181b",
          soft: "#232427",
          line: "#33343780",
        },
        warm: {
          DEFAULT: "#f4e9d8",
          dim: "#e9dac0",
        },
        beige: "#e9e2d6",
        wood: {
          DEFAULT: "#7c5a3a",
          dark: "#4a3524",
        },
        /* Sampled directly from the brand logo mark (public/brand/logo-mark.png) */
        teal: {
          DEFAULT: "#2B7089",
          dark: "#1F4A5E",
          soft: "#7FB3C4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        arabic: ["var(--font-arabic)", "sans-serif"],
        /** Script accent for tagline moments only — not applied in Arabic
            (no Latin-script cursive equivalent), falls back to the
            display serif for RTL. */
        script: ["var(--font-script)", "var(--font-display)", "cursive"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        content: "1440px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
