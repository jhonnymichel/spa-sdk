/* eslint-disable */
module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      spacing: {
        '1/3': '0.333rem',
        '2/3': '0.666rem',
        container: '15px',
      },
      borderRadius: {
        '1/3': '0.333rem',
        '2/3': '0.666rem',
      },
      cursor: {
        crosshair: 'crosshair',
        'zoom-in': 'zoom-in',
      },
    },
  },
  important: true,
  corePlugins: {
    container: false,
  },
  plugins: [require('tailwind-bootstrap-grid')()],
  variants: {},
};
