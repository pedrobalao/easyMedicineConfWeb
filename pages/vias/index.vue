<template>
  <div>
    <h1>Vias</h1>

    <newVia />
    <!-- Main table element -->
    <b-table show-empty stacked="md" :items="vias" :fields="fields">
      <template slot="name" slot-scope="row">{{row.value.description}}</template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button
          size="sm"
          @click.stop="delete(row.item, row.index, $event.target)"
          variant="danger">Apagar</b-button>
      </template>
    </b-table>
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
    delete(item, index, event) {}
  }
}
</script>
