const pkg = require('./package')
require('dotenv').config()

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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
  ],
  auth: {
    // Options

    strategies: {
      local: {
        endpoints: {
          login: {
            url: process.env.API_URL + '/auth/login',
            method: 'post',
            propertyName: 'access_token.token'
          },
          logout: {
            url: process.env.API_URL + '/auth/logout',
            method: 'post'
          },
          user: {
            url: process.env.API_URL + '/auth/user',
            method: 'get',
            propertyName: 'user'
          }
        }
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    }
  },

  toast: {
    position: 'top-center',
    duration: 5000,
    register: [
      // Register custom toasts
      {
        name: 'easyerror',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
          duration: 5000
        }
      }
    ]
  },

  router: {
    middleware: ['auth']
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
