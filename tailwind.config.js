module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9a1c59',
        'light-primary': '#cd1c78',
      },
      fontFamily: {},
      boxShadow: {
        '3xl': '0 0 10px 3px rgba(0,0,0,0.08)',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
