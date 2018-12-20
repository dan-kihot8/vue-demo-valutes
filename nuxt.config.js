const pkg = require('./package')
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

module.exports = {
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  store: true,
  router: {              // customize nuxt.js router (vue-router).
    // middleware: 'i18n'   // middleware all pages of the application
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
    // 'vuetify/dist/vuetify.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/vuetify'
    // { ssr: false, src: '~plugins/main' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  //   // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    ['nuxt-i18n', {

      locales: [
        {
          code: 'en',
          iso: 'en-US',
          name: 'English',
          file: 'en.js'
        },
        {
          code: 'ru',
          iso: 'ru-RU',
          name: 'Russian',
          file: 'ru.js'
        }
      ],
      vueI18n: {
        fallbackLocale: 'en'
      },
      loadLanguagesAsync: true,
      langDir: 'locales/',
      defaultLocale: 'en',
      rootRedirect: 'en',
      // baseUrl: 'en'
      lazy: true,
      noPrefixDefaultLocale: false,
      strategy: 'prefix',
      detectBrowserLanguage: true,
      redirectCookieKey: 'redirected',
      useRedirectCookie: true,
      redirectRootToLocale: 'en'
    }]

  ],
  /*
  ** Axios module configuration
  */
  // axios: {
    // See https://github.com/nuxt-community/axios-module#options
  // },

  /*
  ** Build configuration
  */
  build: {
    // vendor: ['axios'],
    /*
    ** You can extend webpack config here
    */
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    extend(config, ctx) {
      'axios';
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
  }
}
