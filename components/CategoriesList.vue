<template>
  <div>
    <b-button variant="success" @click="create()">Nova Categoria</b-button>

    <b-list-group>
      <b-list-group-item
        v-for="(element, index) in categories"
        :key="element.id"
        class="d-flex justify-content-between align-items-center"
      >
        <div>{{element.Description}}</div>

        <div>
          <b-button size="sm" @click.stop="edit(element)" variant="secondary">Editar</b-button>
          <b-button size="sm" @click.stop="remove(index)" variant="danger">Apagar</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//import cm from '~/assets/js/call-manager.js'

export default {
  components: {
    // draggable,
  },
  data() {
    return {
      editmode: false
    }
  },
  computed: {
    ...mapState({
      categories: state => state.categories.list
    })
  },
  methods: {
    edit(category) {
      this.$router.push({ path: '/categories/' + category.id })
    },
    create() {
      this.$store.dispatch('categories/SET_CATEGORY_NULL')
      this.$router.push({ path: '/categories/new' })
    }
  }
}
</script>

<style>
</style>
