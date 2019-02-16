<template>
  <div>
    <h1>Vias</h1>
    <div >
        <b-button variant="success" @click="showModal('NEW',null)" class="d-flex justify-content-between align-items-center">Nova Via</b-button>
    </div>
    
    <b-modal ref="myModalRef" size="lg" hide-footer title="Nova Via">
      <div>
        <newVia @onsubmitted="hideModal"/>
      </div>
    </b-modal>
    <b-list-group>
      <b-list-group-item
        v-for="element in vias"
        :key="element.Id"
        class="d-flex justify-content-between align-items-center"
      >
        {{element.Id}}
        <!--<div>
        <b-button size="sm" @click.stop="removeVia(index)" variant="danger">Apagar</b-button>
        </div>-->
      </b-list-group-item>
    </b-list-group>

    <!-- Main table element -->
    <!--<b-table show-empty stacked="md" :items="vias" :fields="fields">
      <template slot="name" slot-scope="row">{{row.value.description}}</template>
      <template slot="actions" slot-scope="row">
        <b-button
          size="sm"
          @click.stop="delete(row.item, row.index, $event.target)"
          variant="danger">Apagar</b-button>
      </template>
    </b-table>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import newVia from '~/components/NewVia.vue'

export default {
  components: {
    newVia
  },
  async fetch({ store, params }) {
    await store.dispatch('vias/GET_VIAS')
  },
  data() {
    return {
      currentPage: 1,
      fields: [{ key: 'Id', label: 'Via', sortable: false }]
    }
  },
  computed: {
    ...mapState({
      vias: state => state.vias.list
    })
  },
  methods: {
    delete(item, index, event) {},
    showModal(action, index) {
      this.$store.dispatch('vias/SET_VIA_NULL')
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    }
  }
}
</script>
