// import axios from '@nuxtjs/axios'

export const state = () => ({
  searchResult: [],
  drug: null
})

export const mutations = {
  SET_SEARCH_RESULT(state, result) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.searchResult = result
  },
  CLEAR_SEARCH_RESULT(state) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.searchResult = []
  },
  SET_DRUG(state, drug) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.drug = drug
  }
}

export const actions = {
  async SEARCH({ commit }, searchString) {
    // eslint-disable-next-line
    console.log("searching for "+searchString)
    const response = await this.$axios.get(
      '/drugs/search?drugname=' + searchString
    )
    // eslint-disable-next-line
    console.log(response.data)

    commit('SET_SEARCH_RESULT', response.data.drugs)
  },
  CLEAR_SEARCH_RESULT({ commit }) {
    // eslint-disable-next-line
    console.log('CLEAR_SEARCH_RESULT')
    commit('CLEAR_SEARCH_RESULT')
  },
  SET_DRUG({ commit }, drug) {
    // eslint-disable-next-line
    // console.log(diseases)
    commit('SET_DRUG', drug)
  }
}
