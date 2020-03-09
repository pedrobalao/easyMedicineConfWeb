<template>
  <div>
    <b-button variant="success" @click="addCondition">
      Nova Condição
    </b-button>
    <b-list-group>
      <b-list-group-item v-for="cond in conditions" :key="cond.id" class="flex-column align-items-start">
        <b-button variant="danger" @click="deleteCondition(cond)">
          Apagar
        </b-button>  
        <diseaseTreatment :condition="cond" />
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import diseaseTreatment from '~/components/DiseaseTreatment.vue'

export default {
  components: {
    // draggable,
    diseaseTreatment
  },
  computed: {
    ...mapState({
      conditions: state => state.diseases.disease.treatment.conditions
    })
  },
  methods: {
    addCondition() {
      this.$store.commit('diseases/addemptycondition')
    },
    deleteCondition(condition) {
      this.$store.commit('diseases/deletecondition', condition)
    }
  }
}
</script>

<style>
</style>
