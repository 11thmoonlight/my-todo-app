/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--sidebar-border)",
        ring: "var(--sidebar-ring)",
        background: "var(--sidebar-primary)",
        foreground: "var(--sidebar-primary-foreground)",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(text|bg)-(red|blue|green|yellow|amber|orange|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|gray|zinc|neutral|stone|slate)-(400|500|600|700)/,
    },
  ],
};
