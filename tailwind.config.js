/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    extend: {
      colors: {
        neutral: {
          '100': '#f3f3f4',
          '200': '#e8e8e9',
          '300': '#dcddde',
          '400': '#c6c7c9',
          '500': '#a4a5a9',
          '600': '#979493'

        },
        primary: {
          '100': '#88acca',
          '200': '#6695bb',
          '300': '#457eac',
          '400': '#39688d',
          '500': '#2c516e'
        },
        smoke: {
          '100': 'rgba(0, 0, 0, 0.1)',
          '200': 'rgba(0, 0, 0, 0.25)',
          '300': 'rgba(0, 0, 0, 0.4)',
          '400': 'rgba(0, 0, 0, 0.5)',
          '500': 'rgba(0, 0, 0, 0.6)',
          '600': 'rgba(0, 0, 0, 0.75)',
          '700': 'rgba(0, 0, 0, 0.9)'

        },
        gunmetal: {
          '100': '#272838'
        },
        'black': 'black'
      }
    }
  },
  variants: {},
  plugins: []
}
