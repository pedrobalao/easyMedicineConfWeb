<template>
  <editDisease/>
</template>
<script>
import editDisease from '~/components/EditDisease.vue'

export default {
  components: {
    editDisease
  },
  async fetch({ store, params }) {
    // eslint-disable-next-line
    store.dispatch('diseases/SET_DISEASE_NULL'),
    await store.dispatch('vias/GET_VIAS')
  }
}
</script>

