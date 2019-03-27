<template>
  <div>
    <b-input-group prepend="Indicação" class="mt-3">
      <b-form-input v-model="indicationtext"/>
    </b-input-group>
    <!--<h2>Dose</h2>
    <b-list-group>
      <b-list-group-item v-for="(dose, index) in doses" :key="index">
        <drugIndicationDoseViewer :dose="dose"/>
      </b-list-group-item>
    </b-list-group>-->
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import drugIndicationDoseViewer from '~/components/DrugIndicationDoseViewer.vue'

export default {
  components: {  },
  props: {
    
  },
  data() {
    return {
      isAddButtonDisabled: true
    }
  },
  computed: {
    ...mapState({
      unities: state => state.unities.list,
      vias: state => state.vias.list,
      doses: state => state.indication.doses
    }),
    indicationtext: {
      get() {
        return this.$store.state.drugs.indication.IndicationText
      },
      set(value) {
        this.$store.commit('drugs/updateindicationIndicationText', value)
      }
    }
  }
}
</script>

<style>
</style>
