<template>
  <b-form>
    <b-form-group id="exampleInputGroup1" label="Unidade:" label-for="newUnityInput">
      <b-form-input id="newUnityInput" type="text" v-model="Id" required placeholder="ex. cm, kg"></b-form-input>
      <b-button @click="onSubmit" variant="primary" :disabled="isAddButtonDisabled">Adicionar</b-button>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  event: 'onsubmitted',
  fetch({ store, params }) {
    // eslint-disable-next-line
    store.dispatch('unities/SET_VIA_NULL')
  },
  data() {
    return {
      isAddButtonDisabled: true
    }
  },
  computed: {
    Id: {
      get() {
        return this.$store.state.unities.unity.Id
      },
      set(value) {
        this.$store.commit('unities/updateId', value)
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
        await this.$store.dispatch('unities/SAVE', this.$store.state.unities.unity)
        this.$emit('onsubmitted')
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        this.$root.error({
          statusCode: '500',
          message: 'Ups!! Não foi possível inserir a Unidade'
        })
      }
    }
  }
}
</script>

<style>
</style>
