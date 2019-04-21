<template>
  <drug :editmode="true" @onsubmitted="submitted"/>
</template>
<script>
import drug from '~/components/Drug.vue'
// import cm from '~/assets/js/call-manager.js'

export default {
  components: {
    drug
  },
  data() {
    return {
      categoryid: null,
      subcategoryid: null
    }
  },
  async fetch({ store, params }) {
    // eslint-disable-next-line
    console.log('drug fetch')

    this.categoryid = params.category
    this.subcategoryid = params.subcategory
    store.commit('drugs/updatecategoryid', this.categoryid)
    store.commit('drugs/updatesubcategoryid', this.subcategoryid)

    let drugid = params.drug
    // eslint-disable-next-line
    console.log(
      'param ' + this.categoryid + ': ' + this.subcategoryid + ': ' + drugid
    )

    await store.dispatch('drugs/SET_DRUG', drugid)
    await store.dispatch('variables/GET_VARIABLES')
    await store.dispatch('unities/GET_UNITIES')
    await store.dispatch('vias/GET_VIAS')
    // eslint-disable-next-line
    console.log('after drug fetch ')
  },
  methods: {
    submitted() {
      this.$router.push({
        path:
          '/categories/' +
          this.$store.state.drugs.categoryid +
          '/subcategories/' +
          this.$store.state.drugs.subcategoryid
      })
    }
  }
}
</script>

