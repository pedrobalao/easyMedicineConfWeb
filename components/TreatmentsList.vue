<template>
  <div>
    <b-button variant="success" @click="showModal('NEW',null)">Novo Fármaco</b-button>
    <b-modal ref="myModalRef" size="lg" hide-footer :title="modalTitle">
      <div>
        <treatment @onsubmitted='treatmentSubmitted'/>
      </div>
    </b-modal>

    <b-list-group>
      <b-list-group-item  v-for="(element, index) in treatments" :key="element.id"
      class="d-flex justify-content-between align-items-center">{{element.description}}
          <div><b-button
          size="sm"
          @click.stop="showModal('EDIT',index)"
          variant="secondary"
        >Editar</b-button>
        <b-button size="sm" @click.stop="removeTreatment(index)" variant="danger">Apagar</b-button>
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
      modalTitle: 'Novo Fármaco'
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
    async showModal(action, index) {
      if (action === 'NEW') {
        this.modalTitle = 'Novo Fármaco'
        this.$store.dispatch('diseases/SET_TREATMENT_NULL')
        await this.$store.dispatch('diseases/SET_DRUG_ID',null)
      }
      else {
          this.modalTitle = 'Editar Fármaco'
          // eslint-disable-next-line
          console.log('Editar treatment index - '+index)
          this.$store.dispatch('diseases/SET_TREATMENT',index)
          await this.$store.dispatch('diseases/SET_DRUG_ID',this.$store.state.diseases.treatmentsList[index].drug_id)
      }
      
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    treatmentSubmitted() {
      this.hideModal()
    },
    removeTreatment(index){
        this.$store.dispatch('diseases/DELETE_TREATMENT',index)
    }
  }
}
</script>

<style>
</style>
