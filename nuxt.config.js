export default {
  mode: 'universal',
  webfontloader: {
    google: {
      families: ['Roboto:300,400,500,600,700,800:cyrillic', 'Material+Icons', 'Open Sans', 'Questrial', 'Montserrat:400,500,600,700,800,900:cyrillic'],
    },
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: `%s - ${process.env.npm_package_name}`,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },


  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/main.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  buildModules: [
    ['@nuxtjs/vuetify', {
      assets: false,
      treeShake: true,
      customVariables: [
        '~/assets/style/variables.scss',
      ],
    }],
  ],

  vuetify: {
    theeShake: true,
  },


  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-webfontloader',
    'nuxt-sass-resources-loader',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  axios: {
    // proxyHeaders: false
    baseURL: 'https://evaluation.omd.ru',
    credentials: true,
    init(axios) {
      axios.defaults.withCredentials = true
    }
  },
  proxy: {
  '/api': {
    target: 'https://evaluation.omd.ru/test/user/token/',
    pathRewrite: {
      '^/api' : '/'
      }
    }
  },
  sassResources: [
    '~/assets/style/variables.scss'
  ],
  rules: [
    {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            fiber: require('fibers'),
            indentedSyntax: true // optional
          },
          // Requires sass-loader@^8.0.0
          options: {
            implementation: require('sass'),
            sassOptions: {
              fiber: require('fibers'),
              indentedSyntax: true // optional
            },
          },
        },
      ],
    },
  ],
};
