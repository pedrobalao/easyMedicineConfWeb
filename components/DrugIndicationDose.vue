<template>
  <div>
    <b-form-group id="viasGroup1" label="Via" label-for="tviasinput">
        <b-form-select v-model="idvia" class="mb-3" id="tviasinput">
          <option v-for="via in vias" :key="via.Id" :value="via.Id">{{via.Id}}</option>
        </b-form-select>
      </b-form-group>

    <b-input-group prepend="Dose Pediátrica" class="mt-3">
      <b-form-input v-model="pediatricdose"/>
    </b-input-group>

    <b-input-group prepend="Unidade Dose Pediátrica" class="mt-3">
      <b-form-select v-model="idunitypediatricdose" class="mb-3" id="unitnput">
        <option v-for="un in unities" :key="un.Id" :value="un.Id">{{un.Id}}</option>
      </b-form-select>
    </b-input-group>

    <b-input-group prepend="Dose Adulta" class="mt-3">
      <b-form-input v-model="adultdose"/>
    </b-input-group>

    <b-input-group prepend="Unidade Dose Adulta" class="mt-3">
      <b-form-select v-model="idunityadultdose" class="mb-3" id="unitnput">
        <option v-for="un in unities" :key="un.Id" :value="un.Id">{{un.Id}}</option>
      </b-form-select>
    </b-input-group>

    <b-input-group prepend="Tomas Diárias" class="mt-3">
      <b-form-input v-model="takesperday"/>
    </b-input-group>
    <b-input-group prepend="Dose Máxima por dia" class="mt-3">
      <b-form-input v-model="maxdoseperday"/>
    </b-input-group>

    <b-input-group prepend="Unidade Dose Máxima por dia" class="mt-3">
      <b-form-select v-model="idunitymaxdoseperday" class="mb-3" id="unitnput">
        <option v-for="un in unities" :key="un.Id" :value="un.Id">{{un.Id}}</option>
      </b-form-select>
    </b-input-group>

    <b-input-group prepend="Observações" class="mt-3">
      <b-form-textarea
        type="text"
        v-model="obs"
        required
        placeholder="Observações"
        :rows="rows"
        :max-rows="maxrows"
      ></b-form-textarea>
    </b-input-group>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: {
    editmode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      rows: 3,
      maxrows: 6
    }
  },
  computed: {
    ...mapState({
      unities: state => state.unities.list,
      vias: state => state.vias.list
    }),
    idvia: {
      get() {
        return this.$store.state.drugs.dose.IdVia
      },
      set(value) {
        this.$store.commit('drugs/updateindicationIdVia', value)
      }
    },
    pediatricdose: {
      get() {
        return this.$store.state.drugs.dose.PediatricDose
      },
      set(value) {
        this.$store.commit('drugs/updateindicationPediatricDose', value)
      }
    },
    idunitypediatricdose: {
      get() {
        return this.$store.state.drugs.dose.IdUnityPediatricDose
      },
      set(value) {
        this.$store.commit('drugs/updateindicationIdUnityPediatricDose', value)
      }
    },
    adultdose: {
      get() {
        return this.$store.state.drugs.dose.AdultDose
      },
      set(value) {
        this.$store.commit('drugs/updateindicationAdultDose', value)
      }
    },
    idunityadultdose: {
      get() {
        return this.$store.state.drugs.dose.IdUnityAdultDose
      },
      set(value) {
        this.$store.commit('drugs/updateindicationIdUnityAdultDose', value)
      }
    },
    takesperday: {
      get() {
        return this.$store.state.drugs.dose.TakesPerDay
      },
      set(value) {
        this.$store.commit('drugs/updateindicationTakesPerDay', value)
      }
    },
    maxdoseperday: {
      get() {
        return this.$store.state.drugs.dose.MaxDosePerDay
      },
      set(value) {
        this.$store.commit('drugs/updateindicationMaxDosePerDay', value)
      }
    },
    idunitymaxdoseperday: {
      get() {
        return this.$store.state.drugs.dose.IdUnityMaxDosePerDay
      },
      set(value) {
        this.$store.commit('drugs/updateindicationIdUnityMaxDosePerDay', value)
      }
    },
    obs: {
      get() {
        return this.$store.state.drugs.dose.obs
      },
      set(value) {
        this.$store.commit('drugs/updateindicationobs', value)
      }
    }
  }
}
</script>

<style>
</style>

