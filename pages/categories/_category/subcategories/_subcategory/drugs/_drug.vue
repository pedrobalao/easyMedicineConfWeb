<template>
  <drug :editmode="true" @onsubmitted="submitted"/>
</template>
<script>
import drug from '~/components/Drug.vue'

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
    // eslint-disable-next-line
    console.log('after drug fetch ')
  },
  methods: {
    submitted() {
      if (this.categoryid != null && this.subcategoryid != null) {
        this.$router.push({
          path:
            'categories/' +
            this.categoryid +
            '/subcategories/' +
            this.subcategoryid +
            '/drugs/' +
            this.$store.state.drugs.drug.Id
        })
      } else {
        this.$router.push({ path: '/drugs/' + this.$store.state.drugs.drug.Id })
      }
    }
  }
}
</script>

