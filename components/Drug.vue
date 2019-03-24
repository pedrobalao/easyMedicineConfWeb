<template>
  <div>
    <b-form>
      <b-form-group id="exampleInputGroup1" label="Nome:" label-for="exampleInput1">
        <b-form-input id="exampleInput1" type="text" v-model="name" required placeholder="Nome"></b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Contra-Indicações:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="conterindications"
          required
          placeholder="Contra-Indicações"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Efeitos Secundários:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="secondaryeffects"
          required
          placeholder="Efeitos Secundários"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Apresentação:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="presentation"
          required
          placeholder="Apresentação"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Marcas Comerciais:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="comercialbrands"
          required
          placeholder="Marcas Comerciais"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" label="Observações:" label-for="exampleInput3">
        <b-form-textarea
          id="exampleInput3"
          type="text"
          v-model="obs"
          required
          placeholder="Observações"
          :rows="rows"
          :max-rows="maxrows"
        ></b-form-textarea>
      </b-form-group>
    </b-form>
    <b-card-group deck>
      <b-card
        v-for="(indication) in indications"
        :key="indication.Id"
        :header="indication.IndicationText"
      >
        <b-list-group>
          <b-list-group-item v-for="(dose, index) in indication.doses" :key="index">
            <b-input-group prepend="Via" class="mt-3">
              <b-form-input v-model="dose.IdVia" readonly/>
            </b-input-group>
            <b-input-group prepend="Dose Pediátrica" class="mt-3">
              <b-form-input v-model="dose.PediatricDose" readonly/>
            </b-input-group>
            <b-input-group prepend="Unidade Dose Pediátrica" class="mt-3">
              <b-form-input v-model="dose.IdUnityPediatricDose" readonly/>
            </b-input-group>
            <b-input-group prepend="Dose Adulta" class="mt-3">
              <b-form-input v-model="dose.AdultDose" readonly/>
            </b-input-group>
            <b-input-group prepend="Unidade Dose Adulta" class="mt-3">
              <b-form-input v-model="dose.IdUnityAdultDose" readonly/>
            </b-input-group>
            <b-input-group prepend="Tomas Diárias" class="mt-3">
              <b-form-input v-model="dose.TakesPerDay" readonly/>
            </b-input-group>
            <b-input-group prepend="Dose Máxima por dia" class="mt-3">
              <b-form-input v-model="dose.MaxDosePerDay" readonly/>
            </b-input-group>
            <b-input-group prepend="Unidade Dose Máxima por dia" class="mt-3">
              <b-form-input v-model="dose.IdUnityMaxDosePerDay" readonly/>
            </b-input-group>
            <b-input-group prepend="Observações" class="mt-3">
              <b-form-input v-model="dose.obs" readonly/>
            </b-input-group>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  props: {
    editmode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    // eslint-disable-next-line
    console.log('drug data')
    return {
      loading: false,
      rows: 3,
      maxrows: 6
    }
  },
  computed: {
    ...mapState({}),
    name: {
      get() {
        return this.$store.state.drugs.drug.Name
      },
      set(value) {
        this.$store.commit('drugs/updateName', value)
      }
    },
    conterindications: {
      get() {
        return this.$store.state.drugs.drug.ConterIndications
      },
      set(value) {
        this.$store.commit('drugs/updateConterIndications', value)
      }
    },
    secondaryeffects: {
      get() {
        return this.$store.state.drugs.drug.SecondaryEfects
      },
      set(value) {
        this.$store.commit('drugs/updateSecondaryEfects', value)
      }
    },
    comercialbrands: {
      get() {
        return this.$store.state.drugs.drug.ComercialBrands
      },
      set(value) {
        this.$store.commit('drugs/updateComercialBrands', value)
      }
    },
    obs: {
      get() {
        return this.$store.state.drugs.drug.Obs
      },
      set(value) {
        this.$store.commit('drugs/updateObs', value)
      }
    },
    presentation: {
      get() {
        return this.$store.state.drugs.drug.Presentation
      },
      set(value) {
        this.$store.commit('drugs/updatePresentation', value)
      }
    },
    indications: {
      get() {
        return this.$store.state.drugs.drug.indications
      }
    }
  }
}
</script>
<style>
</style>

