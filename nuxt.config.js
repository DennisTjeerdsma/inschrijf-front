import pkg from './package'

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css', '@/assets/css/main.css'],
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/datetime.js',
    '~/plugins/validation.js',
    '~/plugins/axios.js',
    '~/plugins/filters.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    'nuxt-fontawesome',
    '@nuxtjs/moment'
  ],

  router: {
    middleware: ['auth'],
    base: '/'
  },
  fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faFutbol', 'faUser', 'faKey', 'faEyeSlash', 'faEye', 'faTachometerAlt', 'faSignOutAlt', 'faPlusCircle', 'faDotCircle', 'faEdit', 'faTimes', 'faTrash', 'faChevronDown']
      }
    ]
  },
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: 'http://localhost:80'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'api/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/auth/logout'
          },
          user: {
            url: 'api/auth/user',
            propertyName: false
          }
        }
      }
    },
    resetOnError: true,
    watchLoggedIn: true
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  server: {
    host: '0.0.0.0'
  }
}
