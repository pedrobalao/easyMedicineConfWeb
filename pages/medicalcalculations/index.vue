<template>
  <div>
    <h1>Cálculos Médicos</h1>
    <medicalcalculationlist/>

  </div>
</template>

<script>
// import { mapState } from 'vuex'
import medicalcalculationlist from '~/components/MedicalCalculationList.vue'

export default {
  components: {
    medicalcalculationlist
  },
  async fetch({ store, params }) {
    await store.dispatch('unities/GET_UNITIES')
    await store.dispatch('variables/GET_VARIABLES')
    await store.dispatch('medicalcalculations/GET_MEDICALCALCULATIONS')
  },
  data() {
    return {
    }
  }
}
</script>
