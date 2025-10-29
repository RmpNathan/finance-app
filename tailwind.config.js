/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F7F5F9",
          text: "#201F24",
          primary: "#6C5CE7",
          muted: "#8D8BA7",
          ring: "#7C3AED",
        },
        success: "#22c55e",
        danger: "#ef4444",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
