<template>
  <b-form>
    <b-form-group id="exampleInputGroup1" label="Via:" label-for="newViaInput">
      <b-form-input id="newViaInput" type="text" v-model="Id" required placeholder="ex. Oral"></b-form-input>
      <b-button @click="onSubmit" variant="primary" :disabled="isAddButtonDisabled">Adicionar</b-button>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  event: 'onsubmitted',
  fetch({ store, params }) {
    // eslint-disable-next-line
    store.dispatch('vias/SET_VIA_NULL')
  },
  data() {
    return {
      isAddButtonDisabled: true
    }
  },
  computed: {
    Id: {
      get() {
        return this.$store.state.vias.via.Id
      },
      set(value) {
        this.$store.commit('vias/updateId', value)
        if (value === null || value === '') {
          this.isAddButtonDisabled = true
        } else {
          this.isAddButtonDisabled = false
        }
      }
    }
  },

  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('vias/SAVE', this.$store.state.vias.via)
        this.$emit('onsubmitted')
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        this.$root.error({
          statusCode: '500',
          message: 'Ups!! Não foi possível inserir a via'
        })
      }
    }
  }
}
</script>

<style>
</style>
