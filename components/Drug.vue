<template>
  <div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import drugIndicationViewer from '~/components/DrugIndicationViewer.vue'

export default {
  components: { drugIndicationViewer },
  props: {
    editmode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      rows: 3,
      maxrows: 6,
      newindication: ''
    }
  },
  computed: {
    ...mapState({}),
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
    }
  }
}
</script>
<style>
</style>

