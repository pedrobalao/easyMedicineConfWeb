<template>
  <div>

    <b-form-group label="Descrição" class="mb-3">
      <b-form-input v-model="description"/>
    </b-form-group>

    <b-form-group id="formula" label="Fórmula" label-for="formiput">
        <b-form-textarea
          id="formiput"
          type="text"
          v-model="formula"
          placeholder="Formula Javascript"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="Unidade Resultado" class="mb-3">
      <b-form-select v-model="resultIdUnit" class="mb-3" id="unitnput">
        <option v-for="un in unities" :key="un.Id" :value="un.Id">{{un.Id}}</option>
      </b-form-select>
    </b-form-group>

    <b-form-group id="infor" label="Informação Resultado" label-for="formiput">
        <b-form-textarea
          id="formiput"
          type="text"
          v-model="resultDescription"
          placeholder="Informação Relevante"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>

    <b-button @click="save" variant="primary">Guardar</b-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import cm from '~/assets/js/call-manager.js'

export default {
  event: 'onsubmitted',
  props: {
  },
  data() {
    return {
      rows: 3,
      maxrows: 6
    }
  },
  computed: {
    ...mapState({
      unities: state => state.unities.list
    }),

    description: {
      get() {
        return this.$store.state.drugs.calculation.Description
      },
      set(value) {
        this.$store.commit('drugs/updatecalculationdescription', value)
      }
    },
    formula: {
      get() {
        return this.$store.state.drugs.calculation.Function
      },
      set(value) {
        this.$store.commit('drugs/updatecalculationfunction', value)
      }
    },
    resultIdUnit: {
      get() {
        return this.$store.state.drugs.calculation.ResultIdUnit
      },
      set(value) {
        this.$store.commit('drugs/updatecalculationresultidunit', value)
      }
    },
    resultDescription: {
      get() {
        return this.$store.state.drugs.calculation.ResultDescription
      },
      set(value) {
        this.$store.commit('drugs/updatecalculationresultdescription', value)
      }
    }
  },
  methods: {
    save (){
      this.$store.dispatch('drugs/ADD_CALCULATION_TO_DRUG', this.$store.state.drugs.calculation)
      this.$emit('onsubmitted')
    }
  }

}
</script>

<style>
</style>

