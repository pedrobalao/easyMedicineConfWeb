<template>
  <div>
    <b-form>
      <b-form-group id="tipoTratamentoGroup1" label="Tipo Tratamento" label-for="tipotratinput">
        <b-form-select v-model="treatmenttype" class="mb-3" id="tipotratinput">
          <option
            v-for="item in treatmentTypes"
            :key="item.id"
            :value="item.id"
          >{{item.description}}</option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="viasGroup1" label="Via" label-for="tviasinput">
        <b-form-select v-model="via_id" class="mb-3" id="tviasinput">
          <option v-for="item in vias" :key="item.Id" :value="item.Id">{{item.Id}}</option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="descrg" label="Descrição" label-for="descr">
        <b-form-input
          id="descr"
          type="text"
          v-model="description"
          required
          placeholder="Descrição"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="posologiag" label="Posologia" label-for="posologia">
        <b-form-input id="posologia" type="text" v-model="use" required placeholder="Posologia"></b-form-input>
      </b-form-group>

      <b-form-group id="duracaog" label="Duração" label-for="duracao">
        <b-form-input
          id="duracao"
          type="text"
          v-model="duration"
          required
          placeholder="Duração"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="observacoesg" label="Observações" label-for="observacoes">
        <b-form-input
          id="observacoes"
          type="text"
          v-model="observation"
          placeholder="Observações"
        ></b-form-input>
      </b-form-group>
      <b-button @click="onSubmit" variant="primary">Adicionar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  event: 'onsubmitted',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState({
      treatmentTypes: state => state.diseases.treatmentTypes,
      vias: state => state.vias.list,
      treatment: state => state.diseases.treatment      
    }),
    treatmenttype: {
      get() {
        return this.$store.state.diseases.treatment.treatmenttype
      },
      set(value) {
        this.$store.commit('diseases/updatetreatmenttreatmenttype', value)
      }
    },
    drug_id: {
      get() {
        return this.$store.state.diseases.treatment.drug_id
      },
      set(value) {
        this.$store.commit('diseases/updatetreatmentdrug_id', value)
      }
    },
    description: {
      get() {
        return this.$store.state.diseases.treatment.description
      },
      set(value) {
        this.$store.commit('diseases/updatetreatmentdescription', value)
      }
    },
    via_id: {
      get() {
        return this.$store.state.diseases.treatment.via_id
      },
      set(value) {
        this.$store.commit('diseases/updatetreatmentvia_id', value)
      }
    },
    use: {
      get() {
        return this.$store.state.diseases.treatment.use
      },
      set(value) {
        this.$store.commit('diseases/updatetreatmentuse', value)
      }
    },
    duration: {
      get() {
        return this.$store.state.diseases.treatment.duration
      },
      set(value) {
        this.$store.commit('diseases/updatetreatmentduration', value)
      }
    },
    observation: {
      get() {
        return this.$store.state.diseases.treatment.observation
      },
      set(value) {
        this.$store.commit('diseases/updatetreatmentobservation', value)
      }
    }
  },
  methods: {
    async onSubmit (){
      await this.$store.dispatch('diseases/ADD_TREATMENT', this.treatment)
      this.$emit('onsubmitted')
    }
  }
}
</script>

<style>
</style>

