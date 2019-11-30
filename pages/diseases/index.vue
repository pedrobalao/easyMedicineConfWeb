<template>
  <div>
    <h1>Doenças</h1>
    <!-- Main table element -->
    <b-button :pressed="false" variant="success" @click="newDisease">
      Novo
    </b-button>

    <b-table show-empty stacked="md" :items="diseases" :fields="fields">
      <template slot="name" slot-scope="row">
        <span>{{ row.value.description }}</span>
      </template>
      <template slot="status" slot-scope="row">
        <b-badge :variant="row == null || row.item.status == 'draft' ? 'dark' : 'success' ">
          {{ row.item.status }}
        </b-badge>
      </template> 
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button
          size="sm"
          variant="secondary"
          @click.stop="edit(row.item, row.index, $event.target)"
        >
          Edit
        </b-button>
        <b-button size="sm" variant="danger" @click.stop>
          Apagar
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      align="center"
      size="md"
      :total-rows="total"
      :per-page="20"
      @input="changedPage()"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import cm from '~/assets/js/call-manager.js'

export default {
  async fetch({ store, params }) {
    await store.dispatch('diseases/GET_DISEASES')
  },
  data() {
    return {
      currentPage: 1,
      fields: [
        { key: 'description', label: 'Descrição', sortable: false },
        { key: 'status', label: 'Estado', sortable: false },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
  computed: {
    ...mapState({
      total: state => state.diseases.total,
      page: state => state.diseases.page,
      lastPage: state => state.diseases.lastPage,
      diseases: state => state.diseases.list
    })
  },
  methods: {
    changedPage() {
      // eslint-disable-next-line
      // console.log('new page ' + this.currentPage)
      this.$store.dispatch('diseases/SET_PAGE', this.currentPage)
    },
    edit(item, index, event) {
      const id = item.id
      // eslint-disable-next-line
      console.log('edit ' + id)
      // this.$router.push({ name: 'diseases', params: { id } })
      this.$router.push({ path: `/diseases/${id}` })
      // eslint-disable-next-line
      console.log('pushed ') 
    },
    newDisease() {
      this.$router.push({ path: `/diseases/new` })
    }
  }
}
</script>
