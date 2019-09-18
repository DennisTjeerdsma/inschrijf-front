
export const state = () => ({
  list: [],
  current_sort: 'name'
})

export const mutations = {
  setList (state, list) {
    state.list = list
  },
  deleteUser (state, item) {
    const index = state.list.map(i => i.id).indexOf(item.id)
    if (index === -1) { return }
    state.list.splice(index, 1)
  },
  multiDeleteUser (state, array) {
    array.forEach(function (item) {
      const index = state.list.map(i => i.id).indexOf(item)
      if (index === -1) { return }
      state.list.splice(index, 1)
    })
  },
  createUser (state, item) {
    state.list.push(item)
  }
}

export const actions = {
  async load ({ commit }) {
    const response = await this.$axios.get(
      'api/userlist'
    )
    commit('setList', response.data)
  },

  async delete ({ commit }, userId = 0) {
    const response = await this.$axios.delete(
      `/api/user/delete/${userId}`
    )
    commit('deleteUser', response.data)
  },

  async multiDelete ({ commit }, payload) {
    const response = await this.$axios.delete(
      `/api/user/delete`, { data: payload }
    )
    commit('multiDeleteUser', response.data)
  },

  async create ({ commit }, payload) {
    const response = await this.$axios.post(
      '/api/user/create', { data: payload }
    )
    commit('createUser', response.data)
  }
}

export const getters = {
  list: state => state.list
}
