// import axios from '@nuxtjs/axios'

export const state = () => ({
  list: [],
  page: null,
  lastPage: null,
  total: null
})

export const mutations = {
  SET_DISEASES(state, diseases) {
    // eslint-disable-next-line
    console.debug(diseases)
    state.list = diseases.data
    state.page = diseases.page
    state.lastPage = diseases.lastPage
    state.total = diseases.total
  }
}

export const actions = {
  async GET_DISEASES({ commit }) {
    const response = await this.$axios.get('/diseases')
    // eslint-disable-next-line
    console.debug(response.data)
    commit('SET_DISEASES', response.data.diseases)
  }
}
