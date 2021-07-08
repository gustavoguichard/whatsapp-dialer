module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  mode: 'jit',
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#F1F1F2',
          200: '#A8ADB3',
          700: '#273443',
          800: '#232F3C',
          900: '#131C21',
        },
        green: {
          200: '#77D7C8',
          400: '#1EBEA5',
          700: '#009788',
        },
        primary: '#09D261',
        secondary: '#34B7F2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
