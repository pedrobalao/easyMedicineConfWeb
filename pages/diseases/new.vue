<template>
  <editDisease @onsubmitted="close" />
</template>
<script>
import editDisease from '~/components/EditDisease.vue'
// import cm from '~/assets/js/call-manager.js'

export default {
  components: {
    editDisease
  },
  async fetch({ store, params }) {
    // eslint-disable-next-line
    store.dispatch('diseases/SET_DISEASE_NULL')
    await store.dispatch('vias/GET_VIAS')
    await store.dispatch('drugs/CLEAR_SEARCH_RESULT')
  },
  methods: {
    close() {
      this.$router.push({ path: `/diseases` })
    }
  }
}
</script>
