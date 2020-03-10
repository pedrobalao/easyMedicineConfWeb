// import axios from '@nuxtjs/axios'

export const state = () => ({
  list: [],
  page: null,
  lastPage: null,
  total: null,
  disease: {
    id: null,
    description: null,
    author: null,
    indication: null,
    example: null,
    bibliography: null,
    observation: null,
    followup: null,
    treatment_description: null,
    status: null,
    treatment: {
      initial_evaluation: null,
      conditions: []
    }
  },
  treatmentsList: [],
  treatment: {
    treatmenttype: 'PHARMA',
    drug_id: null,
    description: null,
    via_id: null,
    use: null,
    order: null,
    duration: null,
    observation: null
  },
  treatmentTypes: [
    { id: 'PHARMA', description: 'Farmacológico' },
    { id: 'OTHER', description: 'Outro' }
  ],
  treatmentIndex: null,
  drug: null
})

export const mutations = {
  SET_DISEASES(state, diseases) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.list = diseases.data
    state.page = diseases.page
    state.lastPage = diseases.lastPage
    state.total = diseases.total
  },
  SET_TREATMENTS(state, treatments) {
    // eslint-disable-next-line
    // console.log(diseases)
    if (treatments === null) {
      state.treatmentsList = []
    } else state.treatmentsList = treatments
  },
  SET_TREATMENT(state, index) {
    // eslint-disable-next-line
    console.log('SET_TREATMENT ' + index)
    state.treatment = state.treatmentsList[index]
    state.treatmentIndex = index
  },
  SET_DISEASE_NULL(state) {
    state.disease = {
      id: null,
      description: null,
      author: null,
      indication: null,
      example: null,
      bibliography: null,
      observation: null,
      followup: null,
      treatment_description: null,
      treatment: {
        initial_evaluation: null,
        conditions: []
      }
    }
  },
  SET_TREATMENT_NULL(state) {
    state.treatment = {
      id: null,
      treatmenttype: 'PHARMA',
      drug_id: null,
      description: null,
      via_id: null,
      use: null,
      order: null,
      duration: null,
      observation: null
    }
    state.treatmentIndex = null
    state.drug = null
  },
  SET_DISEASE(state, disease) {
    state.disease = disease
  },
  UPDATE_DISEASE(state, disease) {
    // eslint-disable-next-line
    // console.log(disease)
    for (let index = 0; index < state.list.length; index++) {
      if (state.list[index].id === disease.id) {
        state.list[index] = disease
      }
    }
  },
  ADD_DISEASE(state, disease) {
    // eslint-disable-next-line
    // console.log(disease)
    state.list.push(disease)
  },
  ADD_TREATMENT(state, treatment) {
    // eslint-disable-next-line
    // console.log(disease)
    if (state.treatmentIndex != null) {
      state.treatmentsList[state.treatmentIndex] = treatment
    } else {
      state.treatmentsList.push(treatment)
    }
  },
  DELETE_TREATMENT(state, index) {
    // eslint-disable-next-line
    // console.log(disease)
    state.treatmentsList.splice(index, 1)
  },
  updatedescription(state, value) {
    state.disease.description = value
  },
  updatestatus(state, value) {
    state.disease.status = value
  },
  updateauthor(state, value) {
    state.disease.author = value
  },
  updateindication(state, value) {
    state.disease.indication = value
  },
  updatetreatment_description(state, value) {
    state.disease.treatment_description = value
  },
  updatefollowup(state, value) {
    state.disease.followup = value
  },
  updateexample(state, value) {
    state.disease.example = value
  },
  updatebibliography(state, value) {
    state.disease.bibliography = value
  },
  updateobservation(state, value) {
    state.disease.observation = value
  },
  updateinitialevaluation(state, value) {
    state.disease.treatment.initial_evaluation = value
  },
  updatetreatmenttreatmenttype(state, value) {
    state.treatment.treatmenttype = value
  },
  updatetreatmentdrug_id(state, value) {
    state.treatment.drug_id = value
  },
  updatetreatmentdescription(state, value) {
    state.treatment.description = value
  },
  updatetreatmentvia_id(state, value) {
    state.treatment.via_id = value
  },
  updatetreatmentuse(state, value) {
    state.treatment.use = value
  },
  updatetreatmentduration(state, value) {
    state.treatment.duration = value
  },
  updatetreatmentobservation(state, value) {
    state.treatment.observation = value
  },
  addemptycondition(state) {
    state.disease.treatment.conditions.push({
      id: new Date().getTime(),
      condition: null,
      firstline: null,
      secondline: null,
      thirdline: null
    })
  },
  deletecondition(state, value) {
    state.disease.treatment.conditions.splice(
      state.disease.treatment.conditions.findIndex(function(i) {
        return i.id === value.id
      }),
      1
    )
  },
  updatecondition(state, value) {
    const index = state.disease.treatment.conditions.findIndex(function(i) {
      return i.id === value.id
    })
    state.disease.treatment.conditions[index] = value
  },

  SET_DRUG(state, drug) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.drug = drug
    if (drug != null) {
      state.treatment.drug_id = drug.Id
    } else {
      state.treatment.drug_id = null
    }
  }
}

export const actions = {
  async GET_DISEASES({ commit }) {
    const response = await this.$axios.get('/diseases')
    // eslint-disable-next-line
    // console.log(response.data)
    commit('SET_DISEASES', response.data.diseases)
  },
  async GET_DISEASE({ commit }, id) {
    const response = await this.$axios.get('/diseases/' + id)
    // eslint-disable-next-line
    // console.debug(response.data)
    const responsetreatments = await this.$axios.get(
      '/diseases/' + id + '/treatments'
    )

    const disease = response.data.disease
    if (disease.treatment == null || disease.treatment === undefined) {
      disease.treatment = {
        initial_evaluation: null,
        conditions: []
      }
    } else {
      disease.treatment = JSON.parse(disease.treatment)
    }

    // console.log('disease: ' + JSON.stringify(disease))
    commit('SET_DISEASE', disease)
    commit('SET_TREATMENTS', responsetreatments.data.treatments)
  },
  async SET_PAGE({ commit }, newPage) {
    // eslint-disable-next-line
    // console.log('get page ' + newPage)
    const response = await this.$axios.get('/diseases?page=' + newPage)
    commit('SET_DISEASES', response.data.diseases)
  },
  async SAVE({ commit }, newDisease) {
    // eslint-disable-next-line
    if (newDisease.id == null) {
      const response = await this.$axios.post('/diseases', newDisease)
      commit('ADD_DISEASE', response.data.disease)
    } else {
      await this.$axios.put('/diseases/' + newDisease.id, newDisease)
      commit('UPDATE_DISEASE', newDisease)
    }
  },
  SET_DISEASE_NULL({ commit }) {
    // eslint-disable-next-line
    commit('SET_DISEASE_NULL')
    commit('SET_TREATMENTS', null)
  },
  ADD_TREATMENT({ commit }, treatment) {
    // eslint-disable-next-line
    // console.log(disease)
    commit('ADD_TREATMENT', treatment)
  },
  SET_TREATMENT_NULL({ commit }) {
    // eslint-disable-next-line
    commit('SET_TREATMENT_NULL')
  },
  SET_TREATMENT({ commit }, index) {
    // eslint-disable-next-line
    console.log('ACTION treatment index - ' + index)
    commit('SET_TREATMENT', index)
  },
  async SET_DRUG_ID({ commit }, drugid) {
    if (drugid != null) {
      const response = await this.$axios.get('/drugs/' + drugid)
      commit('SET_DRUG', response.data.drug)
    } else {
      commit('SET_DRUG', null)
    }
  },
  SET_DRUG_NULL({ commit }) {
    commit('SET_DRUG', null)
  },

  DELETE_TREATMENT({ commit }, index) {
    // eslint-disable-next-line
    commit('DELETE_TREATMENT', index)
  },
  SET_DRUG({ commit }, drug) {
    // eslint-disable-next-line
    // console.log(diseases)
    commit('SET_DRUG', drug)
  }
}
