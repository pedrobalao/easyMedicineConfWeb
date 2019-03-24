<template>
  <drug :editmode="true"/>
</template>
<script>
import drug from '~/components/Drug.vue'

export default {
  components: {
    drug
  },
  async fetch({ store, params }) {
    // eslint-disable-next-line
    console.log('drug fetch')

    let categoryid = params.category
    let subcategoryid = params.subcategory
    let drugid = params.drug
    // eslint-disable-next-line
    console.log('param '+ categoryid+ ': '+subcategoryid+ ': '+drugid)
    
    await store.dispatch('drugs/SET_DRUG', drugid)
    // eslint-disable-next-line
    console.log('after drug fetch ')
  },
  methods: {
    
  }
}
</script>

