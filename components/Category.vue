<template>
  <div>
    <h1>{{description}}</h1>
    <b-form>
      <b-form-group id="exampleInputGroup1" label="Nome:" label-for="exampleInput1">
        <div>
          <b-form-input
            id="exampleInput1"
            type="text"
            v-model="description"
            required
            placeholder="Descrição"
          ></b-form-input>
          <b-button variant="success" :disabled="description===''" @click="savecategory()">{{editmode ? "Renomear":"Criar"}}</b-button>
        </div>
      </b-form-group>
    </b-form>

    <div v-if="editmode">
      <h2>Sub-Categorias</h2>
      <b-button variant="success" @click="savecategory()">Adicionar Sub-Categoria</b-button>
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
// import medicalcalculation from '~/components/MedicalCalculation.vue'

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
    return {}
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
      await this.$store.dispatch(
        'categories/SAVE_CATEGORY',
        this.$store.state.categories.category
      )
      if(!this.editmode)
      {
          this.$router.push({path:'/categories/'+this.$store.state.categories.category.id})
      }
    }
  }
}
</script>

<style>
</style>
