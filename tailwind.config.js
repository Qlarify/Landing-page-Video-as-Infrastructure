/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        ink: "#163460",
        "ink-2": "#0f2547",
        "ink-light": "#2c5f84",
        rust: "#E8835F",
        "rust-dk": "#d05a18",
        "rust-pale": "#fdeee5",
        cream: "#f5f5f5",
        "section-alt": "#e8eef3",
        border: "#c8d8e4",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
