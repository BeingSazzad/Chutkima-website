import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        // Chutkima brand green (sampled from app screens)
        brand: {
          50: "#e8f5f0",
          100: "#c6e7da",
          200: "#9bd5c1",
          300: "#66bfa1",
          400: "#34a481",
          500: "#108a66",
          600: "#0e7a5f", // primary
          700: "#0b6450",
          800: "#0a4f40",
          900: "#083f34",
          950: "#04261f",
        },
        ink: {
          DEFAULT: "#0f1b17",
          soft: "#3a4742",
          muted: "#6b7a73",
        },
        cream: "#f6f8f7",
        line: "#e7ece9",
      },
      boxShadow: {
        card: "0 2px 14px rgba(16, 40, 32, 0.06)",
        cardhover: "0 8px 28px rgba(16, 40, 32, 0.12)",
        nav: "0 1px 0 rgba(15, 27, 23, 0.06)",
        pop: "0 12px 40px rgba(16, 40, 32, 0.16)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
        "3xl": "28px",
      },
      maxWidth: {
        shell: "1280px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.35s ease-out both",
        "slide-in": "slide-in 0.25s ease-out both",
        pulseDot: "pulseDot 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
