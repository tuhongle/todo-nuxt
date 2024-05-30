// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser()
    // ...
    if (!user && to.path !== '/' && to.path !== '/login' && to.path !== '/signup' ) {
      return navigateTo({ path: '/' })
    }
  })