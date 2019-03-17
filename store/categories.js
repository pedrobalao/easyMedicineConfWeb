export const state = () => ({
  list: [],
  category: {
    id: null,
    Description: null,
    SubCategories: []
  },
  subcategory: {
    Id: null,
    Description: null,
    CategoryId: null,
    drugs: []
  }
})

export const mutations = {
  SET_CATEGORIES(state, categories) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.list = categories
  },
  SET_SUBCATEGORIES(state, subcategories) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.category.SubCategories = subcategories
  },

  SET_CATEGORY_NULL(state) {
    state.category = {
      id: null,
      Description: null,
      SubCategories: []
    }
  },
  SET_CATEGORY(state, category) {
    // eslint-disable-next-line
    // console.log(diseases)
    state.category = category
    let exists = false
    for (let index = 0; index < state.list.length; index++) {
      if (state.list[index].id === category.id) {
        state.list[index] = category
        exists = true
      }
    }
    if (!exists) {
      state.list.push(category)
    }
  },
  UPDATE_CATEGORY(state, category) {
    // eslint-disable-next-line
    // console.log(disease)
    for (let index = 0; index < state.list.length; index++) {
      if (state.list[index].id === category.id) {
        state.list[index] = category
        return
      }
    }
  },
  updatedescription(state, value) {
    state.category.Description = value
  }
}

export const actions = {
  async GET_CATEGORIES({ commit }) {
    const response = await this.$axios.get('/categories')
    // eslint-disable-next-line
    // console.log(response.data)
    commit('SET_CATEGORIES', response.data.categories)
  },

  async SAVE_CATEGORY({ commit }, category) {
    if (category.id != null) {
      await this.$axios.put('/categories/' + category.id, category)
      // eslint-disable-next-line
      // console.log(response.data)
      commit('UPDATE_CATEGORY', category)
    } else {
      const result = await this.$axios.post('/categories', category)
      // eslint-disable-next-line
      // console.log(response.data)
      commit('SET_CATEGORY', result.data.category)
    }
  },
  async SET_CATEGORY({ commit }, categoryid) {
    // eslint-disable-next-line
    console.log('catid - ' + categoryid)
    const resultcat = await this.$axios.get('/categories/' + categoryid)
    commit('SET_CATEGORY', resultcat.data.category)
    const result = await this.$axios.get(
      '/categories/' + categoryid + '/subcategories'
    )
    commit('SET_SUBCATEGORIES', result.data.subcategories)
  },
  SET_CATEGORY_NULL({ commit }) {
    commit('SET_CATEGORY_NULL')
  }
}
