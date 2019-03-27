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
    // eslint-disable-next-line
    console.log('param '+ categoryid+ ': '+subcategoryid)
    
    await store.dispatch('drugs/SET_DRUG_NULL')
    // eslint-disable-next-line
    console.log('after drug fetch ')
  },
  methods: {
    
  }
}
</script>