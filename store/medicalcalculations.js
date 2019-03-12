export const state = () => ({
  list: [],
  medicalcalculation: {
    Id: null,
    Description: null,
    ResultUnitId: 'NA',
    Formula: null,
    Observation: null,
    CalculationGroupId: null,
    ResultType: 'NUMBER',
    Precision: 2,
    Variables: []
  },
  types: ['NUMBER']
})

export const mutations = {
  SET_MEDICALCALCULATIONS(state, medicalcalculations) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.list = medicalcalculations
  },
  SET_MEDICALCALCULATION_NULL(state) {
    state.medicalcalculation = {
      Id: null,
      Description: null,
      ResultUnitId: 'NA',
      Formula: null,
      Observation: null,
      CalculationGroupId: null,
      ResultType: 'NUMBER',
      Precision: 2,
      Variables: []
    }
  },
  SET_MEDICALCALCULATION(state, medicalcalculation) {
    // eslint-disable-next-line
    // console.log(disease)
    state.medicalcalculation = medicalcalculation
  },
  ADD_MEDICALCALCULATION(state, medicalcalculation) {
    // eslint-disable-next-line
    // console.log(disease)
    state.list.push(medicalcalculation)
  },
  UPDATE_MEDICALCALCULATION(state, medicalcalculation) {
    // eslint-disable-next-line
    // console.log(disease)
    let idx
    state.list.forEach((element, index) => {
      if (element.Id === medicalcalculation.Id) {
        idx = index
      }
    })
    state.list[idx] = medicalcalculation
  },
  REMOVE_MEDICALCALCULATION(state, index) {
    // eslint-disable-next-line
    // console.log(disease)
    state.list.splice(index, 1)
  },

  updateDescription(state, value) {
    state.medicalcalculation.Description = value
  },
  updateResultUnitId(state, value) {
    state.medicalcalculation.ResultUnitId = value
  },
  updateFormula(state, value) {
    state.medicalcalculation.Formula = value
  },
  updateObservation(state, value) {
    state.medicalcalculation.Observation = value
  },
  updatePrecision(state, value) {
    state.medicalcalculation.Precision = value
  },
  updateVariables(state, value) {
    state.medicalcalculation.Variables = value
  },
  ADD_VARIABLE(state, value) {
    // eslint-disable-next-line
    // console.log(disease)
    state.medicalcalculation.Variables.push({
      Id: value
    })
  },
  REMOVE_VARIABLE(state, index) {
    // eslint-disable-next-line
    // console.log(disease)
    state.medicalcalculation.Variables.splice(index, 1)
  },
  SET_VALUES(state, values) {
    state.medicalcalculation.Values = values
  }
}

export const actions = {
  async GET_MEDICALCALCULATIONS({ commit }) {
    const response = await this.$axios.get('/medicalcalculations')
    // eslint-disable-next-line
    // console.log(response.data)
    commit('SET_MEDICALCALCULATIONS', response.data.medicalcalculations)
  },
  async SET_MEDICALCALCULATION({ commit }, medicalcalculation) {
    // eslint-disable-next-line
    console.log('var' + medicalcalculation.Id)

    const response = await this.$axios.get(
      '/medicalcalculations/' + medicalcalculation.Id
    )
    // eslint-disable-next-line
    console.log(response.data.medicalcalculation)
    commit('SET_MEDICALCALCULATION', response.data.medicalcalculation)
  },
  async SAVE({ commit }, { medicalcalculation, editmode }) {
    if (editmode) {
      await this.$axios.put(
        '/medicalcalculations/' + medicalcalculation.Id,
        medicalcalculation
      )
      commit('UPDATE_MEDICALCALCULATION', medicalcalculation)
    } else {
      const response = await this.$axios.post(
        '/medicalcalculations',
        medicalcalculation
      )
      commit('ADD_MEDICALCALCULATION', response.data.medicalcalculation)
    }
  },
  SET_MEDICALCALCULATION_NULL({ commit }) {
    // eslint-disable-next-line
    commit('SET_MEDICALCALCULATION_NULL')
  },
  ADD_VALUE({ commit }, value) {
    commit('ADD_VALUE', value)
  },
  REMOVE_VALUE({ commit }, index) {
    commit('REMOVE_VALUE', index)
  }
}
