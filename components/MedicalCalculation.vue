<template>
  <div>
    <b-form>
      <b-form-group id="descrg" label="Descrição" label-for="descr">
        <b-form-input id="descr" type="text" v-model="description" required placeholder="Descrição"></b-form-input>
      </b-form-group>

      <b-form-group id="unitGroup1" label="Unidade" label-for="unitnput">
        <b-form-select v-model="resultUnitId" class="mb-3" id="unitnput">
          <option v-for="un in unities" :key="un.Id" :value="un.Id">{{un.Id}}</option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="precision" label="Precisão" label-for="precisionput">
        <b-form-input
          id="precisionput"
          type="number"
          min="0"
          max="4"
          v-model="precision"
          required
          placeholder="0"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="observationsGroup" label="Observações:" label-for="obs">
        <b-form-textarea
          id="obs"
          type="text"
          v-model="observation"
          placeholder="Observações"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="formula" label="Variáveis" label-for="formiput">
        <multiselect
          v-model="mcVariables"
          :options="variables"
          :multiple="true"
          :taggable="true"
          track-by="Id"
          label="Id"
        ></multiselect>
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

      <!--<b-form-group id="valsGroup1" label="Valores" label-for="tvalues" v-if="type=='LISTVALUES'">
        <div>
          <b-form-input id="var" type="text" v-model="value" required placeholder="Valor"></b-form-input>
          <b-button size="sm" @click="addValue" variant="primary">Adicionar</b-button>
        </div>
        <b-list-group>
          <b-list-group-item
            v-for="(element, index) in values"
            :key="element.Value"
            class="d-flex justify-content-between align-items-center"
          >
            <div>{{element.Value}}</div>
            <div>
              <b-button size="sm" @click.stop="removeValue(index)" variant="danger">Apagar</b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-form-group>-->
      <b-button @click="onSubmit" variant="primary">Gravar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  event: 'onsubmitted',
  props: {
    editmode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      debounce: 500,
      item: null,
      loading: false,
      value: null,
      rows: 3,
      maxrows: 6
    }
  },
  computed: {
    ...mapState({
      unities: state => state.unities.list,
      medicalcalculations: state => state.medicalcalculations.list,
      variables: state => state.variables.list
    }),
    description: {
      get() {
        return this.$store.state.medicalcalculations.medicalcalculation
          .Description
      },
      set(value) {
        this.$store.commit('medicalcalculations/updateDescription', value)
      }
    },
    resultUnitId: {
      get() {
        return this.$store.state.medicalcalculations.medicalcalculation
          .ResultUnitId
      },
      set(value) {
        this.$store.commit('medicalcalculations/updateResultUnitId', value)
      }
    },
    observation: {
      get() {
        return this.$store.state.medicalcalculations.medicalcalculation
          .Observation
      },
      set(value) {
        this.$store.commit('medicalcalculations/updateObservation', value)
      }
    },
    precision: {
      get() {
        return this.$store.state.medicalcalculations.medicalcalculation
          .Precision
      },
      set(value) {
        this.$store.commit('medicalcalculations/updatePrecision', value)
      }
    },
    formula: {
      get() {
        return this.$store.state.medicalcalculations.medicalcalculation.Formula
      },
      set(value) {
        this.$store.commit('medicalcalculations/updateFormula', value)
      }
    },
    mcVariables: {
      get() {
        return this.$store.state.medicalcalculations.medicalcalculation
          .Variables
      },
      set(value) {
        this.$store.commit('medicalcalculations/updateVariables', value)
      }
    }
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch('medicalcalculations/SAVE', {
        medicalcalculation: this.$store.state.medicalcalculations.medicalcalculation,
        editmode: this.editmode
      })
      this.$emit('onsubmitted')
    },
    addVariable() {
      if (this.value === null) {
        return
      }
      this.$store.dispatch('medicalcalculations/ADD_VARIABLE', this.value)
      this.value = null
    },
    removeValue(index) {
      this.$store.dispatch('medicalcalculations/REMOVE_VARIABLE', index)
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>

