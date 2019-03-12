<template>
  <div>
    <h1>Variáveis</h1>
    <variableslist/>

  </div>
</template>

<script>
// import { mapState } from 'vuex'
import variableslist from '~/components/VariablesList.vue'

export default {
  components: {
    variableslist
  },
  async fetch({ store, params }) {
    await store.dispatch('unities/GET_UNITIES')
    await store.dispatch('variables/GET_VARIABLES')
  },
  data() {
    return {
    }
  }
}
</script>
