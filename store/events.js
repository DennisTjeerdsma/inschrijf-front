import Vue from 'vue'
import moment from 'moment'

export const state = () => ({
  list: []
})

export const mutations = {
  setList (state, list) {
    state.list = list
  },
  setEnroll (state, item) {
    const index = state.list.map(i => i.id).indexOf(item.id)
    if (index === -1) { return }
    state.list.splice(index, 1, item)
  },
  deleteEvent (state, item) {
    const index = state.list.map(i => i.id).indexOf(item.id)
    if (index === -1) { return }
    state.list.splice(index, 1)
  },
  addEvent (state, item) {
    Vue.set(state.list, state.list.length, item)
  },
  editEvent (state, item) {
    const index = state.list.map(i => i.id).indexOf(item.id)
    if (index === -1) { return }
    state.list.splice(index, 1, item)
  }
}

export const actions = {
  async load ({ commit }, user = 0) {
    const response = await this.$axios.get(
      `api/eventlist/${user.id}`
    )
    commit('setList', response.data)
  },

  async edit ({ commit }, event = 0) {
    const response = await this.$axios.patch(
      `api/event/${event.id}`, {
        title: event.title,
        location: event.location,
        starttime: moment(event.starttime).format('YYYY-MM-DD HH:mm:ss'),
        enrolltime: moment(event.enrolltime).format('YYYY-MM-DD HH:mm:ss'),
        enroll: event.enroll,
        maxparticipants: event.maxparticipants
      }
    )
    commit('editEvent', response.data)
  },
  async participate ({ commit }, event = 0) {
    const response = await this.$axios.patch(
      `api/setenroll/${event.event.id}`
    )
    commit('editEvent', response.data)
  },

  async delete ({ commit }, event = 0) {
    if (event.starttime === '') {
      event.starttime = null
    } else {
      event.starttime = moment(event.starttime).format('YYYY-MM-DD HH:mm:ss')
    }
    if (event.enrolltime === '' | event.enrolltime === null) {
      event.enrolltime = null
    } else {
      event.enrolltime = moment(event.enrolltime).format('YYYY-MM-DD HH:mm:ss')
    }
    const response = await this.$axios.delete(
      `api/event/${event.id}`
    )
    commit('deleteEvent', response.data)
  },

  async add ({ commit }, event) {
    if (event.starttime === '') {
      event.starttime = null
    } else {
      event.starttime = moment(event.starttime).format('YYYY-MM-DD HH:mm:ss')
    }
    if (event.enrolltime === '' | event.enrolltime === null) {
      event.enrolltime = null
    } else {
      event.enrolltime = moment(event.enrolltime).format('YYYY-MM-DD HH:mm:ss')
    }
    const response = await this.$axios.post(
      'api/makeevent', {
        title: event.title,
        location: event.location,
        starttime: event.starttime,
        enrolltime: event.enrolltime,
        enroll: event.enroll,
        maxparticipants: event.maxparticipants
      }
    )
    commit('addEvent', response.data)
  }
}

export const getters = {
  list: state => state.list
}
