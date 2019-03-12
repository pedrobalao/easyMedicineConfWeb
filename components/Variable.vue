<template>
  <div>
    <b-form>
      <b-form-group id="varg" label="Variável" label-for="var">
        <b-form-input
          id="var"
          type="text"
          v-model="id"
          required
          placeholder="Variável"
          :readonly="editmode"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="descrg" label="Descrição" label-for="descr">
        <b-form-input id="descr" type="text" v-model="description" required placeholder="Descrição"></b-form-input>
      </b-form-group>

      <b-form-group id="unitGroup1" label="Unidade" label-for="unitnput">
        <b-form-select v-model="idunit" class="mb-3" id="unitnput">
          <option v-for="un in unities" :key="un.Id" :value="un.Id">{{un.Id}}</option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="typesGroup1" label="Tipo" label-for="tinput">
        <b-form-select v-model="type" class="mb-3" id="tinput">
          <option v-for="tp in types" :key="tp" :value="tp">{{tp}}</option>
        </b-form-select>
      </b-form-group>

      <b-form-group id="valsGroup1" label="Valores" label-for="tvalues" v-if="type=='LISTVALUES'">
        <div>
          <b-form-input id="var" type="text" v-model="value" required placeholder="Valor"></b-form-input>
          <b-button size="sm" @click="addValue" variant="primary">Adicionar</b-button>
        </div>
        <b-list-group>
          <b-list-group-item
            v-for="(element, index) in values"
            :key="element.Value"
            class="d-flex justify-content-between align-items-center"
          >
            <div>{{element.Value}}</div>
            <div>
              <b-button size="sm" @click.stop="removeValue(index)" variant="danger">Apagar</b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-form-group>

      <b-button @click="onSubmit" variant="primary">Gravar</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import Autocomplete from 'v-autocomplete'
// import 'v-autocomplete/dist/v-autocomplete.css'
import unitytemplate from '~/components/UnityTemplate'

export default {
  event: 'onsubmitted',
  // components: { 'v-autocomplete': Autocomplete },
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
      template: unitytemplate,
      value: null
    }
  },
  computed: {
    ...mapState({
      types: state => state.variables.types,
      unities: state => state.unities.list,
      values: state => state.variables.variable.Values
    }),
    description: {
      get() {
        return this.$store.state.variables.variable.Description
      },
      set(value) {
        this.$store.commit('variables/updateDescription', value)
      }
    },
    id: {
      get() {
        return this.$store.state.variables.variable.Id
      },
      set(value) {
        this.$store.commit('variables/updateId', value)
      }
    },
    idunit: {
      get() {
        return this.$store.state.variables.variable.IdUnit
      },
      set(value) {
        this.$store.commit('variables/updateIdUnit', value)
      }
    },
    type: {
      get() {
        return this.$store.state.variables.variable.Type
      },
      set(value) {
        this.$store.commit('variables/updateType', value)
      }
    },
    variable: {
      get() {
        return this.$store.state.variables.variable
      },
      set(value) {
        this.$store.commit('variables/SET_VARIABLE', value)
      }
    }
  },
  methods: {
    async onSubmit() {
    
      await this.$store.dispatch('variables/SAVE', { variable: this.variable, editmode: this.editmode })
      this.$emit('onsubmitted')
    },
    addValue(){
        if(this.value===null) {
            return
        }
        this.$store.dispatch('variables/ADD_VALUE', this.value)
        this.value = null
    },
    removeValue(index)
    {
         this.$store.dispatch('variables/REMOVE_VALUE', index)
    }

  }
}
</script>

<style>
</style>

