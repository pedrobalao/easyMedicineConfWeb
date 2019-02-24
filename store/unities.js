export const state = () => ({
  list: [],
  unity: {
    Id: null
  }
})

export const mutations = {
  SET_UNITIES(state, unities) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.list = unities
  },
  SET_UNITY_NULL(state) {
    state.unity = {
      id: null
    }
  },
  SET_UNITY(state, unity) {
    // eslint-disable-next-line
    // console.log(disease)
    state.unity = unity
  },
  ADD_UNITY(state, unity) {
    // eslint-disable-next-line
    // console.log(disease)
    state.list.push(unity)
  },
  updateId(state, value) {
    state.unity.Id = value
  }
}

export const actions = {
  async GET_UNITIES({ commit }) {
    const response = await this.$axios.get('/unities')
    // eslint-disable-next-line
    // console.log(response.data)
    commit('SET_UNITIES', response.data.unities)
  },
  async GET_DISEASE({ commit }, id) {
    const response = await this.$axios.get('/unities/' + id)
    // eslint-disable-next-line
    // console.debug(response.data)
    commit('SET_UNITY', response.data.unity)
  },
  async SAVE({ commit }, newVia) {
    // eslint-disable-next-line
    console.log('SAVE UNITY')
    const response = await this.$axios.post('/unities', newVia)
    commit('ADD_UNITY', response.data.unity)
  },
  SET_UNITY_NULL({ commit }) {
    // eslint-disable-next-line
    commit('SET_UNITY_NULL')
  }
}
