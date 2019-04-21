<template>
  <div>
    <b-modal ref="modalCalculation" size="lg" hide-footer :title="modalTitle">
      <div>
        <drugCalculation @onsubmitted="calculationSubmitted"/>
      </div>
    </b-modal>

    <b-form>
      <b-form-group id="exampleInputGroup1" label="Nome:" label-for="exampleInput1">
        <b-form-input id="exampleInput1" type="text" v-model="name" required placeholder="Nome"></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Contra-Indicações:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="conterindications"
          required
          placeholder="Contra-Indicações"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Efeitos Secundários:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="secondaryeffects"
          required
          placeholder="Efeitos Secundários"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Apresentação:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="presentation"
          required
          placeholder="Apresentação"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Marcas Comerciais:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="comercialbrands"
          required
          placeholder="Marcas Comerciais"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Observações:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="obs"
          required
          placeholder="Observações"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
    </b-form>
    <h4>Indicações</h4>
    <b-form-group id="exampleInputGroup1" label="Nova Indicação:" label-for="exampleInput1">
      <b-form-input id="exampleInput1" type="text" v-model="newindication" placeholder="Indicação"></b-form-input>
    </b-form-group>
    <b-button
      @click="addIndication(newindication)"
      variant="primary"
      :disabled="newindication==''"
    >Adicionar Indicação</b-button>
    <b-card-group deck>
      <drugIndicationViewer
        v-for="(indication,i) in indications"
        :key="i"
        :indication="indication"
        :index="i"
      />
    </b-card-group>

    <h4>Cálculos de Doses</h4>
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

    <b-button @click="showModal('NEW', null)" variant="primary">Adicionar Cálculo</b-button>
    <b-list-group>
      <b-list-group-item
        v-for="(element, index) in calculations"
        :key="element.Id"
        class="d-flex justify-content-between align-items-center"
      >
        <div>{{element.Description}}</div>

        <div>
          <b-button size="sm" @click.stop="showModal('EDIT', element)" variant="secondary">Editar</b-button>
          <b-button size="sm" @click.stop="removeCalculation(index)" variant="danger">Apagar</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>

    <b-button @click="onSubmit" variant="primary">Gravar</b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import drugIndicationViewer from '~/components/DrugIndicationViewer.vue'
import drugCalculation from '~/components/DrugCalculation.vue'
import Multiselect from 'vue-multiselect'
import cm from '~/assets/js/call-manager.js'

export default {
  components: { drugIndicationViewer, Multiselect, drugCalculation },
  props: {
    editmode: {
      type: Boolean,
      required: true
    }
  },
  event: 'onsubmitted',
  data() {
    return {
      loading: false,
      rows: 3,
      maxrows: 6,
      newindication: '',
      modalTitle: null
    }
  },
  computed: {
    ...mapState({
      variables: state => state.variables.list,
      calculations: state => state.drugs.drug.calculations
    }),
    name: {
      get() {
        return this.$store.state.drugs.drug.Name
      },
      set(value) {
        this.$store.commit('drugs/updateName', value)
      }
    },
    conterindications: {
      get() {
        return this.$store.state.drugs.drug.ConterIndications
      },
      set(value) {
        this.$store.commit('drugs/updateConterIndications', value)
      }
    },
    secondaryeffects: {
      get() {
        return this.$store.state.drugs.drug.SecondaryEfects
      },
      set(value) {
        this.$store.commit('drugs/updateSecondaryEfects', value)
      }
    },
    comercialbrands: {
      get() {
        return this.$store.state.drugs.drug.ComercialBrands
      },
      set(value) {
        this.$store.commit('drugs/updateComercialBrands', value)
      }
    },
    obs: {
      get() {
        return this.$store.state.drugs.drug.Obs
      },
      set(value) {
        this.$store.commit('drugs/updateObs', value)
      }
    },
    presentation: {
      get() {
        return this.$store.state.drugs.drug.Presentation
      },
      set(value) {
        this.$store.commit('drugs/updatePresentation', value)
      }
    },
    indications: {
      get() {
        return this.$store.state.drugs.drug.indications
      }
    },
    mcVariables: {
      get() {
        return this.$store.state.drugs.drug.variables
      },
      set(value) {
        this.$store.commit('drugs/updateVariables', value)
      }
    }
  },
  methods: {
    addIndication(indicationText) {
      let indication = {
        Id: null,
        DrugId: this.$store.state.drugs.drug.Id,
        IndicationText: indicationText,
        doses: []
      }
      this.$store.dispatch('drugs/ADD_INDICATION_TO_DRUG', indication)
    },
    async onSubmit() {
      await cm(this, 'drugs/SAVE', {
        drug: this.$store.state.drugs.drug,
        categoryid: this.$store.state.drugs.categoryid,
        subcategoryid: this.$store.state.drugs.subcategoryid,
        editmode: this.editmode
      }, 'Medicamento gravado com sucesso', null)
      this.$emit('onsubmitted')
    },
    showModal(action, calculation) {
      if (action === 'NEW') {
        this.modalTitle = 'Novo Cálculo de Dose'
        this.$store.dispatch('drugs/SET_CALCULATION_NULL')
      } else {
        this.modalTitle = 'Editar Cálculo de Dose'
        this.$store.dispatch('drugs/SET_CALCULATION', calculation)
      }

      this.$refs.modalCalculation.show()
    },
    hideModal() {
      this.$refs.modalCalculation.hide()
    },
    calculationSubmitted() {
      this.hideModal()
    },
    removeTreatment(index) {
      this.$store.dispatch('diseases/DELETE_TREATMENT', index)
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
</style>

