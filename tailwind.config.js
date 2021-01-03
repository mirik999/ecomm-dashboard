module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'content': 'calc(100% - 80px)',
      }
    },
  },
  variants: {
    backgroundColor: ['odd', 'even', 'disabled', 'hover'],
    borderColor: ['disabled', 'focus', 'hover'],
    extend: {},
  },
  plugins: [],
}
