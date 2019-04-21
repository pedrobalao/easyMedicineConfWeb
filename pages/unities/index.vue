<template>
  <div>
    <h1>Vias</h1>
    <div >
        <b-button variant="success" @click="showModal('NEW',null)" class="d-flex justify-content-between align-items-center">Nova Unidade</b-button>
    </div>
    
    <b-modal ref="myModalRef" size="lg" hide-footer title="Nova Unidade">
      <div>
        <newUnity @onsubmitted="hideModal"/>
      </div>
    </b-modal>
    <b-list-group>
      <b-list-group-item
        v-for="element in unities"
        :key="element.Id"
        class="d-flex justify-content-between align-items-center"
      >
        {{element.Id}}
      </b-list-group-item>
    </b-list-group>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import newUnity from '~/components/Unity.vue'
// import cm from '~/assets/js/call-manager.js'

export default {
  components: {
    newUnity
  },
  async fetch({ store, params }) {
    await store.dispatch('unities/GET_UNITIES')
  },
  data() {
    return {
      currentPage: 1,
      fields: [{ key: 'Id', label: 'Unidade', sortable: false }]
    }
  },
  computed: {
    ...mapState({
      unities: state => state.unities.list
    })
  },
  methods: {
    delete(item, index, event) {},
    showModal(action, index) {
      this.$store.dispatch('unities/SET_UNITY_NULL')
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    }
  }
}
</script>
