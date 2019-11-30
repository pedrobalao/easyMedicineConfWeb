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
    console.log('bef fetch ')
    await store.dispatch('diseases/GET_DISEASE', params.id)
    await store.dispatch('vias/GET_VIAS')
    await store.dispatch('drugs/CLEAR_SEARCH_RESULT')

    // eslint-disable-next-line
    console.log('after fetch ')
  },
  methods: {
    close() {
      this.$router.push({ path: `/diseases` })
    }
  }
}
</script>
