/** @type {import('tailwindcss').Config} */
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
  plugins: [],
};
