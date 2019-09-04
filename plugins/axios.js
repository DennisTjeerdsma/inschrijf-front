export default function ({ $axios, store, app }) {
  $axios.onError(error => {
    if (error.response.status === 401) {
      store.dispatch('logout')
      app.$router.push('/login')
    }
    if (error.response.status === 422) {
      store.dispatch('validation/setErrors', error.response.data.errors)
    } else if (error.response.status !== 404) {
      app.$toast.error('Something unexpected happened', { duration: 5000 })
    }
    return Promise.reject(error)
  })
  $axios.onRequest(() => {
    store.dispatch('validation/clearErrors')
  })
  app.router.afterEach((to, from) => {
    store.dispatch('validation/clearErrors')
  })
}
