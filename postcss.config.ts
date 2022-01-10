const tailwindcss = require('tailwindcss');
const tailwindcssNesting = require('tailwindcss/nesting');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [tailwindcssNesting, tailwindcss, autoprefixer],
};
