<template>
  <div>
    <b-button variant="success" @click="showModal('NEW',null)">
      Novo Cálculo Médico
    </b-button>
    <b-modal ref="myModalRef" size="lg" hide-footer :title="modalTitle">
      <div>
        <medicalcalculation :editmode="editmode" @onsubmitted="variableSubmitted" />
      </div>
    </b-modal>

    <b-list-group>
      <b-list-group-item
        v-for="(element, index) in medicalcalculations"
        :key="element.Id"
        class="d-flex justify-content-between align-items-center"
      >
        <div>
          {{ element.Description }}
        </div>

        <div>
          <b-button size="sm" variant="secondary" @click.stop="showModal('EDIT', element)">
            Editar
          </b-button>
          <b-button size="sm" variant="danger" @click.stop="removeTreatment(index)">
            Apagar
          </b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import draggable from 'vuedraggable'
import medicalcalculation from '~/components/MedicalCalculation.vue'
// import cm from '~/assets/js/call-manager.js'

export default {
  components: {
    // draggable,
    medicalcalculation
  },
  data() {
    return {
      modalTitle: 'Novo Cálculo Médico',
      editmode: false
    }
  },
  computed: {
    ...mapState({
      medicalcalculations: state => state.medicalcalculations.list
    })
  },
  methods: {
    showModal(action, element) {
      if (action === 'NEW') {
        this.modalTitle = 'Novo Cálculo Médico'
        this.editmode = false
        this.$store.dispatch('medicalcalculations/SET_MEDICALCALCULATION_NULL')
      } else {
        this.modalTitle = 'Editar Cálculo Médico'
        this.editmode = true
        // eslint-disable-next-line
        console.log('Element - ' + element)
        this.$store.dispatch(
          'medicalcalculations/SET_MEDICALCALCULATION',
          element
        )
      }

      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    variableSubmitted() {
      // eslint-disable-next-line
      console.log('variableSubmitted')
      this.$store.dispatch('medicalcalculations/SET_MEDICALCALCULATION_NULL')
      this.hideModal()
    }
  }
}
</script>

<style>
</style>
