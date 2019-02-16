<template>
  <div>
    <h1>{{description}}</h1>
    <!-- Main table element -->
    <b-form>
      <b-form-group id="exampleInputGroup1" label="Título/Doença:" label-for="exampleInput1">
        <b-form-input
          id="exampleInput1"
          type="text"
          v-model="description"
          required
          placeholder="Título/Doença"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2" label="Autor:" label-for="exampleInput2">
        <b-form-input id="exampleInput2" type="text" v-model="author" required placeholder="Autor"></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Indicação:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="indication"
          required
          placeholder="Indicação"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="followupGroup" label="Followup:" label-for="followupInput">
        <b-form-textarea
          id="followupInput"
          type="text"
          v-model="followup"
          placeholder="Followup"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleGroup" label="Exemplo:" label-for="exampleInput">
        <b-form-textarea
          id="exampleInput"
          type="text"
          v-model="example"
          placeholder="Exemplo"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="bibliographyGroup" label="Bibliografia:" label-for="bibliographyInput">
        <b-form-textarea
          id="bibliographyInput"
          type="text"
          v-model="bibliography"
          placeholder="Bibliografia"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="observationGroup" label="Observações:" label-for="observationInput">
        <b-form-textarea
          id="observationInput"
          type="text"
          v-model="observation"
          placeholder="Observações"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <h2>Tratamentos</h2>

      <no-ssr placeholder="Loading...">
        <!-- this component will only be rendered on client-side -->
        <treatmentsList/>
      </no-ssr>
      <b-button @click="onSubmit" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import treatmentsList from '~/components/TreatmentsList.vue'

export default {
  components: {
    treatmentsList
  },
  async fetch({ store, params }) {
    // eslint-disable-next-line
    console.log('bef fetch '+params.id)
    await store.dispatch('diseases/GET_DISEASE', params.id)
    // eslint-disable-next-line
    console.log('after fetch ')
  },
  data() {
    return {
      rows: 3,
      maxrows: 6
    }
  },
  computed: {
    ...mapState({
      disease: state => state.diseases.disease
    }),
    description: {
      get() {
        return this.$store.state.diseases.disease.description
      },
      set(value) {
        this.$store.commit('diseases/updatedescription', value)
      }
    },
    author: {
      get() {
        return this.$store.state.diseases.disease.author
      },
      set(value) {
        this.$store.commit('diseases/updateauthor', value)
      }
    },
    indication: {
      get() {
        return this.$store.state.diseases.disease.indication
      },
      set(value) {
        this.$store.commit('diseases/updateindication', value)
      }
    },
    followup: {
      get() {
        return this.$store.state.diseases.disease.followup
      },
      set(value) {
        this.$store.commit('diseases/updatefollowup', value)
      }
    },
    example: {
      get() {
        return this.$store.state.diseases.disease.example
      },
      set(value) {
        this.$store.commit('diseases/updateexample', value)
      }
    },
    bibliography: {
      get() {
        return this.$store.state.diseases.disease.bibliography
      },
      set(value) {
        this.$store.commit('diseases/updatebibliography', value)
      }
    },
    observation: {
      get() {
        return this.$store.state.diseases.disease.observation
      },
      set(value) {
        this.$store.commit('diseases/updateobservation', value)
      }
    }
  },
  methods: {
    async onSubmit() {
      let disease = this.disease
      disease.treatments = this.$store.state.diseases.treatmentsList
      await this.$store.dispatch('diseases/SAVE', disease)
    }
  }
}
</script>
