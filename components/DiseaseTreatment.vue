<template>
  <div>
    <b-form-group id="exampleInputGroup2" label="Condição:" label-for="exampleInput2">
      <b-form-input
        id="exampleInput2"
        v-model="conditionText" 
        type="text"
        required
        placeholder="Condição"
        @input="updated"
      />
    </b-form-group>
    <b-form-group id="exampleInputGroup3" label="1ª Linha:" label-for="exampleInput3">
      <b-form-textarea
        id="exampleInput3"
        v-model="firstline"
        type="text"
        required
        placeholder="Tratamento de primeira linha"
        :rows="rows"
        :max-rows="maxrows"
        @input="updated"
      />
    </b-form-group>
    <b-form-group id="exampleInputGroup3" label="2ª Linha:" label-for="exampleInput3">
      <b-form-textarea
        id="exampleInput4"
        v-model="secondline"
        type="text"
        required
        placeholder="Tratamento de segunda linha"
        :rows="rows"
        :max-rows="maxrows"
        @input="updated"
      />
    </b-form-group>
    <b-form-group id="exampleInputGroup3" label="3ª Linha:" label-for="exampleInput3">
      <b-form-textarea
        id="exampleInput5"
        v-model="thirdline"
        type="text"
        required
        placeholder="Tratamento de terceira linha"
        :rows="rows"
        :max-rows="maxrows"
        @input="updated"
      />
    </b-form-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    condition: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      conditionText: this.condition.condition,
      firstline: this.condition.firstline,
      secondline: this.condition.secondline,
      thirdline: this.condition.thirdline,
      rows: 3,
      maxrows: 6
    }
  },
  computed: {
    ...mapState({})
  },
  methods: {
    updated() {
      this.$store.commit('diseases/updatecondition', {
        id: this.condition.id,
        condition: this.conditionText,
        firstline: this.firstline,
        secondline: this.secondline,
        thirdline: this.thirdline
      })
    }
  }
}
</script>

<style>
</style>
