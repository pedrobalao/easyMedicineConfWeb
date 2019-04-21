<template>
  <div>
    <b-button variant="success" @click="showModal('NEW',null)">Nova Variável</b-button>
    <b-modal ref="myModalRef" size="lg" hide-footer :title="modalTitle">
      <div>
        <variable @onsubmitted="variableSubmitted" :editmode="editmode"/>
      </div>
    </b-modal>

    <b-list-group>
      <b-list-group-item
        v-for="(element, index) in variables"
        :key="element.Id"
        class="d-flex justify-content-between align-items-center"
      >
        <div>
          <b>{{element.Id}}</b>
          - {{element.Description}}
        </div>

        <div>
          <b-button size="sm" @click.stop="showModal('EDIT', element)" variant="secondary">Editar</b-button>
          <b-button size="sm" @click.stop="removeTreatment(index)" variant="danger">Apagar</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import variable from '~/components/Variable.vue'
//import cm from '~/assets/js/call-manager.js'

export default {
  components: {
    // draggable,
    variable
  },
  data() {
    return {
      fields: [
        { key: 'Id', label: 'Variável', sortable: true },
        { key: 'Description', label: 'Descrição', sortable: false },
        { key: 'IdUnit', label: 'Unidade' },
        { key: 'Type', label: 'Tipo' }
      ],
      modalTitle: 'Nova Variável',
      editmode: false
    }
  },
  computed: {
    ...mapState({
      variables: state => state.variables.list
    })
  },
  methods: {
    showModal(action, element) {
      if (action === 'NEW') {
        this.modalTitle = 'Nova Variável'
        this.editmode = false
        this.$store.dispatch('variables/SET_VARIABLE_NULL')
      } else {
        this.modalTitle = 'Editar Variável'
        this.editmode = true
        // eslint-disable-next-line
        console.log('Element - ' + element)
        this.$store.dispatch('variables/SET_VARIABLE', element)
      }

      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    variableSubmitted() {
      // eslint-disable-next-line
      console.log('variableSubmitted')
      this.$store.dispatch('variables/SET_VARIABLE_NULL')
      this.hideModal()
    }
  }
}
</script>

<style>
</style>
