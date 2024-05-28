// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-vuefire",
    ["@nuxtjs/google-fonts", {
      families: {
        'Poppins': {
          wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
        'Lexend': {
          wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
        'Quicksand': {
          wght: [300, 400, 500, 600, 700],
        },
      }
    }],
    '@nuxt/ui',
  ],
  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: 'AIzaSyDMIAS9j-yXh-Kzf1u3z-b5rf1BPPn-8Pk',
      authDomain: 'todo-app-9862f.firebaseapp.com',
      projectId: 'todo-app-9862f',
      storageBucket: 'todo-app-9862f.appspot.com',
      messagingSenderId: '674270062242',
      appId: '1:674270062242:web:0b1dbf09ba2b91d30099fb'
    },
  },
  css: [
    '@/assets/css/main.scss',
    // 'bootstrap/dist/css/bootstrap.min.css',
    // '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/css/tailwind.css',
  ],
  colorMode: {
    preference: "light",
  }
})