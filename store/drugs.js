// import axios from '@nuxtjs/axios'

export const state = () => ({
  searchResult: [],
  drug: {
    Id: null,
    Name: null,
    ConterIndications: null,
    SecondaryEfects: null,
    ComercialBrands: null,
    Obs: null,
    Presentation: null,
    indications: []
  }
})

export const mutations = {
  updateName(state, value) {
    state.drug.Name = value
  },
  updateConterIndications(state, value) {
    state.drug.ConterIndications = value
  },
  updateSecondaryEfects(state, value) {
    state.drug.SecondaryEfects = value
  },
  updateComercialBrands(state, value) {
    state.drug.ComercialBrands = value
  },
  updateObs(state, value) {
    state.drug.Obs = value
  },
  updatePresentation(state, value) {
    state.drug.Presentation = value
  },
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
    console.log('searching for ' + searchString)
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
  async SET_DRUG({ commit }, drugid) {
    // eslint-disable-next-line
    // console.log(diseases)
    const response = await this.$axios.get('/drugs/' + drugid)
    // eslint-disable-next-line
    console.log(response.data.drug)
    commit('SET_DRUG', response.data.drug)
  }
}
