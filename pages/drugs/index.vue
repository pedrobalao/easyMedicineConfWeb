<template>
  <div>
    <drugsearch />  
    <div>
        <nuxt-link to="/categories">Categorias</nuxt-link>
    </div>
  </div>
</template>

<script>
import drugsearch from '~/components/DrugSearch.vue'

export default {
  components: {
    drugsearch
  },
  async fetch({ store, params }) {
    // await store.dispatch('categories/GET_CATEGORIES')
  },
  data() {
    return {
    }
  }
}
</script>