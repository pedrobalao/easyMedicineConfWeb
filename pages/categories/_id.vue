<template>
  <category :editmode="true"/>
</template>
<script>
import category from '~/components/Category.vue'

export default {
  components: {
    category
  },
  async fetch({ store, params }) {
    let categoryid = params.id
    // eslint-disable-next-line
    console.log('param '+ categoryid)
    
    await store.dispatch('categories/SET_CATEGORY', categoryid)
    // eslint-disable-next-line
    console.log('bef fetch '+ store.state.categories.category.id)
    
    // await store.dispatch('diseases/GET_DISEASE', params.id)    
    // eslint-disable-next-line
    console.log('after fetch ')
  },
  methods: {
    
  }
}
</script>

