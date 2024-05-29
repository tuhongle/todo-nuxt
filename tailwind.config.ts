/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{html,vue,js,ts}"],
    theme: {
      extend: {
        fontFamily: {
            Quicksand: 'Quicksand',
            Poppins: 'Poppins',
            Lexend: 'Lexend'
        },
        colors: {
          'iron': {
            '50': '#f6f6f7',
            '100': '#efeff0',
            '200': '#e2e2e3',
            '300': '#cfcfd2',
            '400': '#bababf',
            '500': '#adadad',
            '600': '#949398',
            '700': '#807e84',
            '800': '#69686b',
            '900': '#575659',
            '950': '#323234',
          },
        },
      },
    },
    plugins: [],
  }