<template>
  <div>
    <b-input-group class="mb-3" prepend="Medicamento">
      <b-form-input v-model="searchText" @keydown.enter.native="search" />
      <b-input-group-append>
        <b-button
          text="Pesquisar"
          :disabled="searchText===''"
          variant="success"
          @click="search"
        >
          Pesquisar
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <b-list-group>
      <b-list-group-item
        v-for="element in searchResult"
        :key="element.Id"
        class="d-flex justify-content-between align-items-center"
      >
        <div>{{ element.Name }}</div>
        <b-button size="sm" variant="secondary" @click.stop="viewDrug(element.Id)">
          Editar
        </b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import cm from '~/assets/js/call-manager.js'

export default {
  data() {
    return {
      searchText: ''
    }
  },
  computed: {
    ...mapState({
      searchResult: state => state.drugs.searchResult
    })
  },
  methods: {
    async search() {
      // eslint-disable-next-line
      console.log('pressed search')

      if (this.searchText === '') {
        return
      }
      await cm(this, 'drugs/SEARCH', this.searchText, null, null)
    },
    viewDrug(drugid) {
      this.$router.push({
        path: '/drugs/' + drugid
      })
    }
  }
}
</script>
<style>
</style>
