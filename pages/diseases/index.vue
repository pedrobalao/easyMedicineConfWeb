<template>
  <div>
    <h1>Doenças</h1>
    <!-- Main table element -->
    <b-button @click="newDisease" :pressed="false" variant="success">Novo</b-button>

    <b-table show-empty stacked="md" :items="diseases" :fields="fields">
      <template slot="name" slot-scope="row">{{row.value.description}}</template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button
          size="sm"
          @click.stop="edit(row.item, row.index, $event.target)"
          variant="secondary"
        >Edit</b-button>
        <b-button size="sm" @click.stop variant="danger">Apagar</b-button>
      </template>
    </b-table>
    <b-pagination
      align="center"
      size="md"
      :total-rows="total"
      v-model="currentPage"
      :per-page="20"
      v-on:input="changedPage()"
    ></b-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store, params }) {
    await store.dispatch('diseases/GET_DISEASES')
  },
  data() {
    return {
      currentPage: 1,
      fields: [
        { key: 'description', label: 'Descrição', sortable: false },
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
      let id = item.id
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
