// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-vuefire",
    '@pinia/nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        'Nunito Sans': {
          wght: [200, 300, 400, 500, 600, 700, 800, 900, 1000],
          ital: [200, 300, 400, 500, 600, 700, 800, 900, 1000]
        },
      }
  }],
  ],
  vuefire: {
    auth: {
      enabled: true,
      // enables the sessionCookie
      sessionCookie: true
    },
    config: {
      apiKey: 'AIzaSyCChuOQ3CQ8EvqLb_QqisBFb7YKbYbLGKc',
      authDomain: 'todo-nuxt-19dc8.firebaseapp.com',
      projectId: 'todo-nuxt-19dc8',
      appId: '1:704239583250:web:4fef73a33e16144b0ed8cb',
    }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  css: [
    '@/assets/css/main.css'
  ],
  colorMode: {
    preference: "light",
  }
})