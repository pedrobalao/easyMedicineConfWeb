<template>
  <div>
    <b-button @click="showModal('NEW',null)">Novo Tratamento</b-button>
    <b-modal ref="myModalRef" size="lg" hide-footer :title="modalTitle">
      <div>
        <treatment @onsubmitted='treatmentSubmitted'/>
      </div>
      <b-btn class="mt-3" variant="danger" block @click="hideModal">Cancelar</b-btn>
    </b-modal>

    <b-list-group>
      <b-list-group-item  v-for="(element, index) in treatments" :key="element.id"
      class="d-flex justify-content-between align-items-center">{{element.description}}
          <div><b-button
          size="sm"
          @click.stop="showModal('EDIT',index)"
          variant="secondary"
        >Edit</b-button>
        <b-button size="sm" @click.stop variant="danger">Apagar</b-button>
          </div>
      </b-list-group-item>
    </b-list-group>

    <!--
    <draggable v-model="treatments">
      <transition-group name="no" class="list-group" tag="ul">
        <li
          class="list-group-item"
          v-for="element in treatments"
          :key="element.id"
        >{{element.description}}</li>
      </transition-group>
    </draggable>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import draggable from 'vuedraggable'
import treatment from '~/components/Treatment.vue'

export default {
  components: {
    // draggable,
    treatment
  },
  data() {
    return {
      fields: [
        { key: 'description', label: 'Descrição', sortable: false },
        { key: 'actions', label: 'Ações' }
      ],
      modalTitle: 'Novo tratamento'
    }
  },
  computed: {
    ...mapState({
      treatments: state => state.diseases.treatmentsList
    }),
    treatmentsList: {
      get() {
        return this.$store.state.diseases.treatmentsList
      },
      set(value) {
        this.$store.commit('diseases/SET_TREATMENTS', value)
      }
    }
  },
  methods: {
    showModal(action, index) {
      if (action === 'NEW') {
        this.modalTitle = 'Novo tratamento'
        this.$store.dispatch('diseases/SET_TREATMENT_NULL')
      }
      else {
          this.modalTitle = 'Editar tratamento'
          this.$store.dispatch('diseases/SET_TREATMENT', this.treatmentsList[index])
      }
      
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    treatmentSubmitted() {
      this.hideModal()
    },
    edit (treatment) {
        this.$store.dispatch('diseases/SET_TREATMENT',treatment)
    }
  }
}
</script>

<style>
</style>
