<template>
  <div>
    <b-form>
      <!--<b-form-group id="tipoTratamentoGroup1" label="Tipo Tratamento" label-for="tipotratinput">
        <b-form-select v-model="treatmenttype" class="mb-3" id="tipotratinput">
          <option
            v-for="treat in treatmentTypes"
            :key="treat.id"
            :value="treat.id"
          >{{treat.description}}</option>
        </b-form-select>
      </b-form-group>-->

      <b-form-group id="drugsGroup1" label="Medicamento" label-for="medicamentoInput">
        <v-autocomplete
          v-model="drug"
          :items="searchResult"
          :get-label="getLabel"
          :component-item="template"
          @update-items="onSearch"
          @input="drugChanged"
        />
      </b-form-group>

      <b-form-group id="viasGroup1" label="Via" label-for="tviasinput">
        <b-form-select id="tviasinput" v-model="via_id" class="mb-3">
          <option v-for="via in vias" :key="via.Id" :value="via.Id">
            {{ via.Id }}
          </option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="descrg" label="Descrição" label-for="descr">
        <b-form-input
          id="descr"
          v-model="description"
          type="text"
          required
          placeholder="Descrição"
          readonly
        />
      </b-form-group>

      <b-form-group id="posologiag" label="Posologia" label-for="posologia">
        <b-form-input id="posologia" v-model="use" type="text" required placeholder="Posologia" />
      </b-form-group>

      <b-form-group id="duracaog" label="Duração" label-for="duracao">
        <b-form-input id="duracao" v-model="duration" type="text" required placeholder="Duração" />
      </b-form-group>

      <b-form-group id="observacoesg" label="Observações" label-for="observacoes">
        <b-form-input id="observacoes" v-model="observation" type="text" placeholder="Observações" />
      </b-form-group>
      <b-button variant="primary" @click="onSubmit">
        Gravar
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
import drugtemplate from '~/components/DrugTemplate'
import cm from '~/assets/js/call-manager.js'

export default {
  event: 'onsubmitted',
  components: { 'v-autocomplete': Autocomplete },
  data() {
    return {
      debounce: 500,
      item: null,
      loading: false,
      template: drugtemplate
    }
  },
  computed: {
    ...mapState({
      treatmentTypes: state => state.diseases.treatmentTypes,
      vias: state => state.vias.list,
      treatment: state => state.diseases.treatment,
      searchResult: state => state.drugs.searchResult
    }),
    drug: {
      get() {
        return this.$store.state.diseases.drug
      },
      set(value) {
        // eslint-disable-next-line
        console.log('drugid - ' + value)
        this.$store.commit('diseases/SET_DRUG', value)
        if (value != null) {
          this.description = value.Name
        } else {
          this.description = 'Selecione um medicamento válido'
        }
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
    onSubmit() {
      this.$store.dispatch('diseases/ADD_TREATMENT', this.treatment)
      this.$store.dispatch('diseases/SET_TREATMENT_NULL')
      this.$emit('onsubmitted')
    },
    async onSearch(text) {
      this.loading = true
      await cm(this, 'drugs/SEARCH', text, null, null)
      // await this.$store.dispatch('drugs/SEARCH', text)
      this.loading = false
    },
    getLabel(item) {
      if (item != null) return item.Name
      else return ''
    },
    drugChanged(item) {
      // eslint-disable-next-line
      console.log('Item changed')

      if (item != null) {
        // eslint-disable-next-line
        console.log('Item changed drugid - ' + item.Id)
        this.$store.commit('diseases/updatetreatmentdrug_id', item.Id)
      } else {
        // this.drug_id = null
        // eslint-disable-next-line
        console.log('Item changed drugid - null')
        this.$store.commit('diseases/updatetreatmentdrug_id', null)
      }
    }
  }
}
</script>

<style>
.v-autocomplete-input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.v-autocomplete-list {
  width: 100%;
  text-align: left;
  border: none;
  border-top: none;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid #ced4da;
}

.v-autocomplete-list-item {
  cursor: pointer;
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ced4da;
  border-left: 1px solid #ced4da;
  border-right: 1px solid #ced4da;
}
</style>
