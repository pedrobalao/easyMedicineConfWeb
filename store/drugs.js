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
    indications: [],
    variables: [],
    calculations: []
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
  },
  calculation: {
    Type: 'PED',
    Function: null,
    ResultDescription: null,
    ResultIdUnit: null,
    Description: null
  },
  categoryid: null,
  subcategoryid: null
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
  updatecategoryid(state, value) {
    state.categoryid = value
  },
  updatesubcategoryid(state, value) {
    state.subcategoryid = value
  },
  updateVariables(state, value) {
    state.drug.variables = value
  },
  updateCalculations(state, value) {
    state.drug.calculations = value
  },
  updatecalculationdescription(state, value) {
    state.calculation.Description = value
  },
  updatecalculationfunction(state, value) {
    state.calculation.Function = value
  },
  updatecalculationresultidunit(state, value) {
    state.calculation.ResultIdUnit = value
  },
  updatecalculationresultdescription(state, value) {
    state.calculation.ResultDescription = value
  },
  ADD_INDICATION_TO_DRUG(state, indication) {
    state.drug.indications.push(indication)
  },
  DEL_INDICATION(state, index) {
    // eslint-disable-next-line
    console.log('Del indication ' + index)
    state.drug.indications.splice(index, 1)
  },
  ADD_DOSE_TO_INDICATION(state, dose) {
    state.indication.doses.push(dose)
    state.drug.indications.forEach((element, index) => {
      if (
        (state.indication.Id != null && state.indication.Id === element.Id) ||
        (state.indication.Id == null &&
          state.indication.IndicationText === element.IndicationText)
      ) {
        state.drug.indications[index] = state.indication
      }
    })
  },
  ADD_CALCULATION_TO_DRUG(state, calculation) {
    state.drug.calculations.push(calculation)
  },
  DEL_CALCULATION(state, index) {
    // eslint-disable-next-line
    state.drug.calculations.splice(index, 1)
  },
  REPLACE_CALCULATION(state, { index, calculation }) {
    // eslint-disable-next-line
    state.drug.calculations[index] = calculation
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
  SET_CALCULATION(state, calculation) {
    state.calculation = calculation
  },
  SET_CALCULATION_NULL(state) {
    state.calculation = {
      Type: 'PED',
      Function: null,
      ResultDescription: null,
      ResultIdUnit: null,
      Description: null
    }
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
      indications: [],
      variables: [],
      calculations: []
    }
  },
  SET_DOSE_NULL(state) {
    state.dose = {
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
    }
  },
  DELETE_DOSE(state, { indication, dose, index }) {
    indication.doses.splice(index, 1)
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
  SET_DOSE_NULL({ commit }) {
    commit('SET_DOSE_NULL')
  },
  SET_CALCULATION_NULL({ commit }) {
    commit('SET_CALCULATION_NULL')
  },
  SET_CALCULATION({ commit }, calculcation) {
    commit('SET_CALCULATION', calculcation)
  },
  DEL_INDICATION({ commit }, index) {
    commit('DEL_INDICATION', index)
  },
  ADD_DOSE_TO_INDICATION({ commit }, dose) {
    commit('ADD_DOSE_TO_INDICATION', dose)
  },
  ADD_CALCULATION_TO_DRUG({ commit }, calculcation) {
    commit('ADD_CALCULATION_TO_DRUG', calculcation)
  },
  DELETE_DOSE({ commit }, { indication, dose, index }) {
    commit('DELETE_DOSE', { indication, dose, index })
  },
  async SAVE({ commit }, { drug, categoryid, subcategoryid, editmode }) {
    let baseUrl = '/drugs/'
    if (categoryid != null && subcategoryid != null) {
      baseUrl =
        '/categories/' +
        categoryid +
        '/subcategories/' +
        subcategoryid +
        baseUrl
    }
    if (editmode) {
      await this.$axios.put(baseUrl + drug.Id, drug)
    } else {
      const response = await this.$axios.post(baseUrl, drug)

      commit('SET_DRUG', response.data.drug)
    }
  }
}
