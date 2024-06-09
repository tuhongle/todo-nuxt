/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    content: ["./src/**/*.{html,js,ts,vue}"],
    theme: {
      extend: {
        fontFamily: {
          main: ['"Nunito Sans"', 'sans-serif']
        },
        colors: {
          'royal-blue': {
            '50': '#eff5fe',
            '100': '#e2ebfd',
            '200': '#cbdafa',
            '300': '#abc2f6',
            '400': '#8aa0ef',
            '500': '#5e72e4',
            '600': '#525cd9',
            '700': '#434abf',
            '800': '#383f9b',
            '900': '#343a7b',
            '950': '#1f2247',
          },
        },
      },
    },
    plugins: [],
  }