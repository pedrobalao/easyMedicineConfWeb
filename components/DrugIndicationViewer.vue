<template>
  <div>
    <b-modal ref="myModalRef" size="lg" hide-footer title="Editar Indicação">
      <div>
        <drugIndication @onsubmitted="hideModal"/>
      </div>
    </b-modal>

    <b-card>
      <b-card-header>
        {{indication.IndicationText}}
        <div>
          <b-button size="sm" @click.stop="editIndication(indication)" variant="secondary">Editar</b-button>
          <b-button size="sm" @click.stop="deleteIndication(indication, index)" variant="danger">Apagar</b-button>
          <b-button size="sm" @click.stop="addDose(indication)" variant="success">Adicionar Dose</b-button>
        </div>
      </b-card-header>
      <b-card-body>
        <div>
          <b-list-group>
            <b-list-group-item v-for="(dose, i) in indication.doses" :key="i">
              <drugIndicationDoseViewer :dose="dose"/>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import drugIndicationDoseViewer from '~/components/DrugIndicationDoseViewer.vue'
import drugIndication from '~/components/DrugIndication.vue'

export default {
  components: { drugIndicationDoseViewer, drugIndication },
  props: {
    indication: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {},
  methods: {
    editIndication(indication) {
      this.$store.dispatch('drugs/SET_INDICATION', this.indication)
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    deleteIndication (indication, index){
      this.$store.dispatch('drugs/DEL_INDICATION', index)
    }
  }

}
</script>

<style>
</style>
