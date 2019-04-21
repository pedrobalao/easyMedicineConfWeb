<template>
  <div>
    <h1>Categorias</h1>
    <categorieslist/>

  </div>
</template>

<script>
// import { mapState } from 'vuex'
import categorieslist from '~/components/CategoriesList.vue'
// import cm from '~/assets/js/call-manager.js'

export default {
  components: {
    categorieslist
  },
  async fetch({ store, params }) {
    await store.dispatch('categories/GET_CATEGORIES')
  },
  data() {
    return {
    }
  }
}
</script>
