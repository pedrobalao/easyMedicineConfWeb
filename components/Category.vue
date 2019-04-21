<template>
  <div>
    <h1>{{description}}</h1>

    <b-form>
      <b-input-group prepend="Nome" class="mt-3">
        <b-form-input
          id="exampleInput1"
          type="text"
          v-model="description"
          required
          placeholder="Nome da Categoria"
        ></b-form-input>
        <b-input-group-append>
          <b-button
            class="nomgr"
            variant="success"
            :disabled="description===''"
            @click="savecategory()"
          >{{editmode ? "Renomear":"Criar"}}</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>

    <div v-if="editmode">
      <h2>Sub-Categorias</h2>
      <b-form>
        <b-input-group prepend="Nome" class="mt-3">
          <b-form-input
            id="exampleInput1"
            type="text"
            v-model="subCatDescription"
            required
            placeholder="Nome da Sub-Categoria"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              class="nomgr"
              variant="success"
              :disabled="subCatDescription===''"
              @click="savesubcategory()"
            >Adicionar</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>
      <b-list-group>
        <b-list-group-item
          v-for="(element, index) in subcategories"
          :key="element.Id"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cm from '~/assets/js/call-manager.js'

export default {
  components: {
    // draggable,
  },
  props: {
    editmode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      subCatDescription: ''
    }
  },
  computed: {
    ...mapState({
      subcategories: state => state.categories.category.SubCategories
    }),
    description: {
      get() {
        return this.$store.state.categories.category.Description
      },
      set(value) {
        this.$store.commit('categories/updatedescription', value)
      }
    },
    id: {
      get() {
        // eslint-disable-next-line
        console.log('CCATID- ' + this.$store.state.categories.category.id)
        return this.$store.state.categories.category.id
      }
    }
  },
  methods: {
    async savecategory() {
      await cm(
        this,
        'categories/SAVE_CATEGORY',
        this.$store.state.categories.category,
        'Categoria gravada com sucesso',
        null
      )
      /* await this.$store.dispatch(
        'categories/SAVE_CATEGORY',
        this.$store.state.categories.category
      ) */
      if (!this.editmode) {
        this.$router.push({
          path: '/categories/' + this.$store.state.categories.category.id
        })
      }
    },
    edit(subcategory) {
      this.$router.push({
        path:
          '/categories/' +
          this.$store.state.categories.category.id +
          '/subcategories/' +
          subcategory.Id
      })
    },
    async savesubcategory (){
      let subcategory = {
        Id: null,
        Description: this.subCatDescription,
        CategoryId: this.$store.state.categories.category.id,
        drugs: []
      }

      await cm(
        this,
        'categories/SAVE_SUBCATEGORY',
        subcategory,
        'Sub-Categoria gravada com sucesso',
        null
      )

      this.$router.push({
        path:
          '/categories/' +
          this.$store.state.categories.category.id +
          '/subcategories/' +
          this.$store.state.categories.subcategory.Id
      })
    }
  }
}
</script>

<style>
</style>
