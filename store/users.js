
export const state = () => ({
  list: []
})

export const mutations = {
  setList (state, list) {
    state.list = list
  }
}

export const actions = {
  async load ({ commit }) {
    const response = await this.$axios.get(
      'http://localhost:5000/api/userlist'
    )
    commit('setList', response.data.users)
  }
}

export const getters = {
  list: state => state.list
}
