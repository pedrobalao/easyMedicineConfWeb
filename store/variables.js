export const state = () => ({
  list: [],
  variable: {
    Id: null,
    Description: null,
    IdUnit: 'NA',
    Type: 'NUMBER',
    Values: []
  },
  types: ['NUMBER', 'LISTVALUES']
})

export const mutations = {
  SET_VARIABLES(state, variables) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.list = variables
  },
  SET_VARIABLE_NULL(state) {
    state.variable = {
      Id: null,
      Description: null,
      IdUnit: 'NA',
      Type: 'NUMBER',
      Values: []
    }
  },
  SET_VARIABLE(state, variable) {
    // eslint-disable-next-line
    // console.log(disease)
    state.variable = variable
  },
  ADD_VARIABLE(state, variable) {
    // eslint-disable-next-line
    // console.log(disease)
    state.list.push(variable)
  },
  UPDATE_VARIABLE(state, variable) {
    // eslint-disable-next-line
    // console.log(disease)
    let idx
    state.list.forEach((element, index) => {
      if (element.Id === variable.Id) {
        idx = index
      }
    })
    state.list[idx] = variable
  },
  REMOVE_VARIABLE(state, index) {
    // eslint-disable-next-line
    // console.log(disease)
    state.list.splice(index, 1)
  },
  updateId(state, value) {
    state.variable.Id = value
  },
  updateDescription(state, value) {
    state.variable.Description = value
  },
  updateIdUnit(state, value) {
    state.variable.IdUnit = value
  },
  updateType(state, value) {
    state.variable.Type = value
  },
  ADD_VALUE(state, value) {
    // eslint-disable-next-line
    // console.log(disease)
    state.variable.Values.push({ Id: null, Value: value, VariableId: null })
  },
  REMOVE_VALUE(state, index) {
    // eslint-disable-next-line
    // console.log(disease)
    state.variable.Values.splice(index, 1)
  },
  SET_VALUES(state, values) {
    state.variable.Values = values
  }
}

export const actions = {
  async GET_VARIABLES({ commit }) {
    const response = await this.$axios.get('/variables')
    // eslint-disable-next-line
    // console.log(response.data)
    commit('SET_VARIABLES', response.data.variables)
  },
  async SET_VARIABLE({ commit }, variable) {
    // eslint-disable-next-line
    console.log('var' + variable.Id)

    const response = await this.$axios.get('/variables/' + variable.Id)
    // eslint-disable-next-line
    console.log(response.data.variable)
    commit('SET_VARIABLE', response.data.variable)
  },
  async SAVE({ commit }, { variable, editmode }) {
    // eslint-disable-next-line
    console.log('SAVE VARIABLE')
    if (editmode) {
      await this.$axios.put('/variables/' + variable.Id, variable)
      // eslint-disable-next-line
      console.log('BEFORE ADD_VARIABLE - ' + variable)
      commit('UPDATE_VARIABLE', variable)
    } else {
      const response = await this.$axios.post('/variables', variable)
      commit('ADD_VARIABLE', response.data.variable)
    }
  },
  SET_VARIABLE_NULL({ commit }) {
    // eslint-disable-next-line
    commit('SET_VARIABLE_NULL')
  },
  ADD_VALUE({ commit }, value) {
    commit('ADD_VALUE', value)
  },
  REMOVE_VALUE({ commit }, index) {
    commit('REMOVE_VALUE', index)
  }
}
