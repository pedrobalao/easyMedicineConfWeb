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
          <b-button variant="success" :disabled="description===''" @click="savesubcategory()">{{editmode ? "Renomear":"Criar"}}</b-button>
        </div>
      </b-form-group>
    </b-form>

    <div v-if="editmode">
      <h2>Drugs</h2>
      <b-list-group>
        <b-list-group-item
          v-for="(element, index) in drugs"
          :key="element.Id"
          class="d-flex justify-content-between align-items-center"
        >
          <div>{{element.Name}}</div>

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
      drugs: state => state.categories.subcategory.drugs
    }),
    description: {
      get() {
        return this.$store.state.categories.subcategory.Description
      },
      set(value) {
        this.$store.commit('categories/updatesubcatdescription', value)
      }
    }
  },
  methods: {
    async savesubcategory() {
      await this.$store.dispatch(
        'categories/SAVE_SUBCATEGORY',
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
