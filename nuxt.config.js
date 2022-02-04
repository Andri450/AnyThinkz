export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AnyThinkz',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/quill.js', ssr: false }
  ],
  ssr: true,
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'vue-toastification/nuxt',
    'nuxt-sweetalert2',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyDtdNS9WsEgCfifVmtb-BoX9iAB_2njWho',
          authDomain: 'anythinks-791e6.firebaseapp.com',
          databaseURL: 'https://anythinks-791e6-default-rtdb.asia-southeast1.firebasedatabase.app',
          projectId: 'anythinks-791e6',
          storageBucket: 'anythinks-791e6.appspot.com',
          messagingSenderId: '254114271500',
          appId: '1:254114271500:web:eb01efcb2b9bdc2f9ff929',
          measurementId: 'G-1DDMN05EYB'
        },
        services: {
          database: 'true'
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
