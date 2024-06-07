// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-vuefire"],
  vuefire: {
    config: {
      apiKey: 'AIzaSyCChuOQ3CQ8EvqLb_QqisBFb7YKbYbLGKc',
      authDomain: 'todo-nuxt-19dc8.firebaseapp.com',
      projectId: 'todo-nuxt-19dc8',
      appId: '1:704239583250:web:4fef73a33e16144b0ed8cb',
    }
  }
})