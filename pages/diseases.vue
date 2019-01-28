<template>
  <div><span >{{ total }}</span></div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  async fetch({ store, params }) {
    await store.dispatch('diseases/GET_DISEASES')
  },
  computed: {
    ...mapState({
      total: state => state.diseases.total
    })
  }
}
</script>
