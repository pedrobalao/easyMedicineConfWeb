<template>
  <editDisease  @onsubmitted="close"/>
</template>
<script>
import editDisease from '~/components/EditDisease.vue'

export default {
  components: {
    editDisease
  },
  async fetch({ store, params }) {
    // eslint-disable-next-line
    console.log('bef fetch ')
    await store.dispatch('diseases/GET_DISEASE', params.id)
    await store.dispatch('vias/GET_VIAS')
    await store.dispatch('drugs/CLEAR_SEARCH_RESULT')
    
    // eslint-disable-next-line
    console.log('after fetch ')
  },
  methods: {
    close () {
      this.$router.push({ path: `/diseases` }) 
    }
  }
}
</script>

<!--
<template>
  <div>
    <h1>{{description}}</h1>
    <b-form  >
      <b-form-group
        id="exampleInputGroup1"
        label="Título/Doença:"
        label-for="exampleInput1">
        <b-form-input
          id="exampleInput1"
          type="text"
          v-model="description"
          required
          placeholder="Título/Doença"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2" label="Autor:" label-for="exampleInput2">
        <b-form-input
          id="exampleInput2"
          type="text"
          v-model="author"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Indicação:" label-for="exampleInput3">
         <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="indication"
          required
          placeholder="Enter name"
          :rows="6"
          :max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="followupGroup" label="Followup:" label-for="followupInput">
         <b-form-textarea
          id="followupInput"
          type="text"
          v-model="followup"
          placeholder="Enter name"
          :rows="6"
          :max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleGroup" label="Exemplo:" label-for="exampleInput">
        <b-form-textarea
          id="exampleInput"
          type="text"
          v-model="example"
          placeholder="Enter name"
          :rows="6"
          :max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="bibliographyGroup" label="Bibliografia:" label-for="bibliographyInput">
        <b-form-textarea
          id="bibliographyInput"
          type="text"
          v-model="bibliography"        
          placeholder="Enter name"
          :rows="6"
          :max-rows="6"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="observationGroup" label="Observation:" label-for="observationInput">
        <b-form-textarea
          id="observationInput"
          type="text"
          v-model="observation"        
          placeholder="Enter name"
          :rows="6"
          :max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <b-button @click="onSubmit" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch({ store, params }) {
    // eslint-disable-next-line
    console.log('bef fetch ')
    await store.dispatch('diseases/GET_DISEASE', params.id)
    // eslint-disable-next-line
    console.log('after fetch ')
  },
  data() {
    return {}
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
      await this.$store.dispatch('diseases/SAVE', this.disease)
    }
  }
}
</script>-->
