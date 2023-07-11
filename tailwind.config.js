/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  content: [],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
