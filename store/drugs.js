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
  },
  dose: {
    Id: null,
    IndicationId: null,
    IdVia: null,
    PediatricDose: null,
    IdUnityPediatricDose: null,
    AdultDose: null,
    IdUnityAdultDose: null,
    TakesPerDay: null,
    MaxDosePerDay: null,
    IdUnityMaxDosePerDay: null,
    obs: null
  },
  indication: {
    Id: null,
    DrugId: null,
    IndicationText: null,
    doses: []
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
  updateindicationIndicationText(state, value) {
    state.indication.IndicationText = value
  },
  updatedoseIdVia(state, value) {
    state.dose.IdVia = value
  },
  updatedosePediatricDose(state, value) {
    state.dose.PediatricDose = value
  },
  updatedoseIdUnityPediatricDose(state, value) {
    state.dose.IdUnityPediatricDose = value
  },
  updatedoseAdultDose(state, value) {
    state.dose.AdultDose = value
  },
  updatedoseIdUnityAdultDose(state, value) {
    state.dose.IdUnityAdultDose = value
  },
  updatedoseTakesPerDay(state, value) {
    state.dose.TakesPerDay = value
  },
  updatedoseMaxDosePerDay(state, value) {
    state.dose.MaxDosePerDay = value
  },
  updatedoseIdUnityMaxDosePerDay(state, value) {
    state.dose.IdUnityMaxDosePerDay = value
  },
  updatedoseobs(state, value) {
    state.dose.obs = value
  },
  ADD_INDICATION_TO_DRUG(state, indication) {
    state.drug.indications.push(indication)
  },
  DEL_INDICATION(state, index) {
    // eslint-disable-next-line
    console.log('Del indication '+index)
    state.drug.indications.splice(index, 1)
  },
  ADD_DOSE_TO_INDICATION(state, dose) {
    state.indication.doses.push(dose)
  },
  REMOVE_DOSE_FROM_INDICATION(state, index) {
    state.indication.doses.splice(index, 1)
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
  },
  SET_INDICATION(state, indication) {
    state.indication = indication
  },
  SET_DOSE(state, dose) {
    state.dose = dose
  },
  SET_DRUG_NULL(state) {
    state.drug = {
      Id: null,
      Name: null,
      ConterIndications: null,
      SecondaryEfects: null,
      ComercialBrands: null,
      Obs: null,
      Presentation: null,
      indications: []
    }
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
  },
  SET_INDICATION({ commit }, indication) {
    commit('SET_INDICATION', indication)
  },
  SET_DOSE({ commit }, dose) {
    commit('SET_DOSE', dose)
  },
  ADD_INDICATION_TO_DRUG({ commit }, indication) {
    commit('ADD_INDICATION_TO_DRUG', indication)
  },
  SET_DRUG_NULL({ commit }) {
    commit('SET_DRUG_NULL')
  },
  DEL_INDICATION({ commit }, index) {
    commit('DEL_INDICATION', index)
  }
}
