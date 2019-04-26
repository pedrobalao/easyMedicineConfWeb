<template>
  <drug :editmode="true" @onsubmitted="submitted"/>
</template>
<script>
import drug from '~/components/Drug.vue'
// import cm from '~/assets/js/call-manager.js'

export default {
  components: {
    drug
  },
  data() {
    return {
    }
  },
  async fetch({ store, params }) {
    // eslint-disable-next-line
    console.log('drug fetch')

    let drugid = params.id
    // eslint-disable-next-line
    console.log(
      'param ' + drugid
    )

    await store.dispatch('drugs/SET_DRUG', drugid)
    await store.dispatch('variables/GET_VARIABLES')
    await store.dispatch('unities/GET_UNITIES')
    await store.dispatch('vias/GET_VIAS')
    // eslint-disable-next-line
    console.log('after drug fetch ')
  },
  methods: {
    submitted() {
    }
  }
}
</script>

