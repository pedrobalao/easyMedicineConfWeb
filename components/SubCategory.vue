<template>
  <div>
    <h1>{{ description }}</h1>

    <b-form>
      <b-input-group prepend="Nome" class="mt-3">
        <b-form-input
          id="exampleInput1"
          v-model="description"
          type="text"
          required
          placeholder="Descrição"
        />
        <b-input-group-append>
          <b-button
            class="nomgr"
            variant="success"
            :disabled="description===''"
            @click="savesubcategory()"
          >
            {{ editmode ? "Renomear":"Criar" }}
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>

    <div v-if="editmode">
      <h2>Drugs</h2>

      <div class="input-group mb-3">
        <v-autocomplete
          v-model="drug"
          :items="searchResult"
          :get-label="getLabel"
          :component-item="template"
          :input-attrs="{class: 'form-control'}"
          @update-items="onSearch"
          @input="drugChanged"
        />
        <b-button
          :disabled="drug==null"
          variant="secondary"
          class="btn btn-secondary nomgr"
          @click.stop="adddrug(drug)"
        >
          Adicionar
        </b-button>
        <b-button
          variant="secondary"
          class="btn btn-secondary nomgr"
          @click.stop="newdrug(drug)"
        >
          Criar Medicamento
        </b-button>
      </div>

      <b-list-group>
        <b-list-group-item
          v-for="(element, index) in drugs"
          :key="element.Id"
          class="d-flex justify-content-between align-items-center"
        >
          <div>{{ element.Name }}</div>

          <div>
            <b-button size="sm" variant="secondary" @click.stop="editdrug(element)">
              Editar
            </b-button>
            <b-button size="sm" variant="danger" @click.stop="removedrug(element, index)">
              Apagar
            </b-button>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
import drugtemplate from '~/components/DrugTemplate'
import cm from '~/assets/js/call-manager.js'

export default {
  components: {
    'v-autocomplete': Autocomplete
  },
  props: {
    editmode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      debounce: 500,
      item: null,
      loading: false,
      template: drugtemplate
    }
  },
  computed: {
    ...mapState({
      drugs: state => state.categories.subcategory.drugs,
      searchResult: state => state.drugs.searchResult
    }),
    description: {
      get() {
        return this.$store.state.categories.subcategory.Description
      },
      set(value) {
        this.$store.commit('categories/updatesubcatdescription', value)
      }
    },
    drug: {
      get() {
        return this.$store.state.diseases.drug
      },
      set(value) {
        // eslint-disable-next-line
        console.log('drugid - ' + value)
        this.$store.commit('diseases/SET_DRUG', value)
      }
    }
  },
  methods: {
    async savesubcategory() {
      await cm(
        this,
        'categories/SAVE_SUBCATEGORY',
        this.$store.state.categories.subcategory,
        'Sub-Categoria gravada com sucesso',
        null
      )

      // await this.$store.dispatch(
      //   'categories/SAVE_SUBCATEGORY',
      //   this.$store.state.categories.subcategory
      // )
      if (!this.editmode) {
        this.$router.push({
          path:
            '/categories/' +
            this.$store.state.categories.subcategory.CategoryId +
            '/subcategories/' +
            this.$store.state.categories.subcategory.Id
        })
      }
    },
    async onSearch(text) {
      this.loading = true
      await cm(this, 'drugs/SEARCH', text, null, null)

      // await this.$store.dispatch('drugs/SEARCH', text)
      this.loading = false
    },
    getLabel(item) {
      if (item != null) return item.Name
      else return ''
    },
    drugChanged(item) {
      // eslint-disable-next-line
      console.log('Item changed')

      if (item != null) {
        // eslint-disable-next-line
        console.log('Item changed drugid - ' + item.Id)
        this.$store.commit('diseases/updatetreatmentdrug_id', item.Id)
      } else {
        // this.drug_id = null
        // eslint-disable-next-line
        console.log('Item changed drugid - null')
        this.$store.commit('diseases/updatetreatmentdrug_id', null)
      }
    },
    async adddrug(drug) {
      await cm(
        this,
        'categories/ADD_DRUG_TO_SUBCATEGORY',
        {
          categoryid: this.$store.state.categories.subcategory.CategoryId,
          subcategoryid: this.$store.state.categories.subcategory.Id,
          drug: drug
        },
        'Medicamento adicionado com sucesso',
        null
      )
      // await this.$store.dispatch('categories/ADD_DRUG_TO_SUBCATEGORY', {
      //   categoryid: this.$store.state.categories.subcategory.CategoryId,
      //   subcategoryid: this.$store.state.categories.subcategory.Id,
      //   drug: drug
      // })
    },
    async removedrug(drug, index) {
      await cm(
        this,
        'categories/REMOVE_DRUG_FROM_SUBCATEGORY',
        {
          categoryid: this.$store.state.categories.subcategory.CategoryId,
          subcategoryid: this.$store.state.categories.subcategory.Id,
          drug: drug,
          index: index
        },
        'Medicamento removido com sucesso',
        null
      )

      // await this.$store.dispatch('categories/REMOVE_DRUG_FROM_SUBCATEGORY', {
      //   categoryid: this.$store.state.categories.subcategory.CategoryId,
      //   subcategoryid: this.$store.state.categories.subcategory.Id,
      //   drug: drug,
      //   index: index
      // })
    },
    editdrug(drug) {
      this.$router.push({
        path:
          '/categories/' +
          this.$store.state.categories.subcategory.CategoryId +
          '/subcategories/' +
          this.$store.state.categories.subcategory.Id +
          '/drugs/' +
          drug.Id
      })
    },
    newdrug() {
      this.$router.push({
        path:
          '/categories/' +
          this.$store.state.categories.subcategory.CategoryId +
          '/subcategories/' +
          this.$store.state.categories.subcategory.Id +
          '/drugs/create'
      })
    }
  }
}
</script>


<style>
.nomgr {
  margin-top: 0;
}

.input-group-text {
  height: calc(2.25rem + 2px);
}

.v-autocomplete-input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.v-autocomplete-list {
  width: 100%;
  text-align: left;
  border: none;
  border-top: none;
  max-height: 400px;
  overflow-y: auto;
  border-bottom: 1px solid #ced4da;
  z-index: 1;
}

.v-autocomplete-list-item {
  cursor: pointer;
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ced4da;
  border-left: 1px solid #ced4da;
  border-right: 1px solid #ced4da;
}
</style>
