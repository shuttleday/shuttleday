/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

const MyClass = plugin(function ({ addUtilities }) {
  addUtilities({
    '.my-rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
    '.preserve-3d': {
      transformStyle: 'preserve-3d',
    },
    '.perspective': {
      perspective: '1000px',
    },
    '.backface-hidden': {
      // perspective must be 0 to be supported in mac
      backfaceVisibility: 'hidden',
      perspective: 0,
    },
  });
});
module.exports = {
  content: ['./src/**/*.{jsx,js,tsx}'],
  important: '#root',
  theme: {
    extend: {
      fontFamily: {
        name: ['Saira'],
      },
      colors: {
        primary: '#22c55e',
        secondary: '#aaa6c3',
        'black-100': '#100d25',
        'black-200': '#090325',
        'white-100': '#f3f3f3',
      },
      boxShadow: {
        card: '0px 35px 120px -15px #211e35',
        mid: '0px 15px 20px #211e35',
      },
      animation: {
        text: 'text 5s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [MyClass],
};
