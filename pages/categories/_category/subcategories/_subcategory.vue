<template>
  <subcategory :editmode="true"/>
</template>
<script>
import subcategory from '~/components/SubCategory.vue'

export default {
  components: {
    subcategory
  },
  async fetch({ store, params }) {
    let categoryid = params.category
    let subcategoryid = params.subcategory
    // eslint-disable-next-line
    console.log('param '+ params)
    
    await store.dispatch('categories/SET_SUBCATEGORY', {categoryid, subcategoryid})
    // eslint-disable-next-line
    console.log('bef fetch '+ store.state.categories.subcategory.Description)
    
    // await store.dispatch('diseases/GET_DISEASE', params.id)    
    // eslint-disable-next-line
    console.log('after fetch ')
  },
  methods: {
    
  }
}
</script>

