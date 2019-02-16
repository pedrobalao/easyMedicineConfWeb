export const state = () => ({
  list: [],
  via: {
    Id: null
  }
})

export const mutations = {
  SET_VIAS(state, vias) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.list = vias
  },
  SET_VIA_NULL(state) {
    state.via = {
      id: null
    }
  },
  SET_VIA(state, via) {
    // eslint-disable-next-line
    // console.log(disease)
    state.via = via
  },
  ADD_VIA(state, via) {
    // eslint-disable-next-line
    // console.log(disease)
    state.list.push(via)
  },
  updateId(state, value) {
    state.via.Id = value
  }
}

export const actions = {
  async GET_VIAS({ commit }) {
    const response = await this.$axios.get('/vias')
    // eslint-disable-next-line
    // console.log(response.data)
    commit('SET_VIAS', response.data.vias)
  },
  async GET_DISEASE({ commit }, id) {
    const response = await this.$axios.get('/vias/' + id)
    // eslint-disable-next-line
    // console.debug(response.data)
    commit('SET_VIA', response.data.via)
  },
  async SAVE({ commit }, newVia) {
    // eslint-disable-next-line
    console.log('SAVE VIA')
    const response = await this.$axios.post('/vias', newVia)
    commit('ADD_VIA', response.data.via)
  },
  SET_VIA_NULL({ commit }) {
    // eslint-disable-next-line
    commit('SET_VIA_NULL')
  }
}
