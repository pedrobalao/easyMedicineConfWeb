<template>
  <div>
    <b-form-group id="viasGroup1" label="Via" label-for="tviasinput">
        <b-form-select v-model="idvia" class="mb-3" id="tviasinput">
          <option v-for="via in vias" :key="via.Id" :value="via.Id">{{via.Id}}</option>
        </b-form-select>
      </b-form-group>

    <b-form-group label="Dose Pediátrica" class="mb-3">
      <b-form-input v-model="pediatricdose"/>
    </b-form-group>

    <b-form-group label="Unidade Dose Pediátrica" class="mb-3">
      <b-form-select v-model="idunitypediatricdose" class="mb-3" id="unitnput">
        <option v-for="un in unities" :key="un.Id" :value="un.Id">{{un.Id}}</option>
      </b-form-select>
    </b-form-group>

    <b-form-group label="Dose Adulta" class="mb-3">
      <b-form-input v-model="adultdose"/>
    </b-form-group>

    <b-form-group label="Unidade Dose Adulta" class="mb-3">
      <b-form-select v-model="idunityadultdose" class="mb-3" id="unitnput">
        <option v-for="un in unities" :key="un.Id" :value="un.Id">{{un.Id}}</option>
      </b-form-select>
    </b-form-group>

    <b-form-group label="Tomas Diárias" class="mb-3">
      <b-form-input v-model="takesperday"/>
    </b-form-group>
    <b-form-group label="Dose Máxima por dia" class="mb-3">
      <b-form-input v-model="maxdoseperday"/>
    </b-form-group>

    <b-form-group label="Unidade Dose Máxima por dia" class="mb-3">
      <b-form-select v-model="idunitymaxdoseperday" class="mb-3" id="unitnput">
        <option v-for="un in unities" :key="un.Id" :value="un.Id">{{un.Id}}</option>
      </b-form-select>
    </b-form-group>

    <b-form-group label="Observações" class="mb-3">
      <b-form-textarea
        type="text"
        v-model="obs"
        required
        placeholder="Observações"
        :rows="rows"
        :max-rows="maxrows"
      ></b-form-textarea>
    </b-form-group>

    <b-button @click="save" variant="primary">Guardar</b-button>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  event: 'onsubmitted',
  props: {
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
        this.$store.commit('drugs/updatedoseIdVia', value)
      }
    },
    pediatricdose: {
      get() {
        return this.$store.state.drugs.dose.PediatricDose
      },
      set(value) {
        this.$store.commit('drugs/updatedosePediatricDose', value)
      }
    },
    idunitypediatricdose: {
      get() {
        return this.$store.state.drugs.dose.IdUnityPediatricDose
      },
      set(value) {
        this.$store.commit('drugs/updatedoseIdUnityPediatricDose', value)
      }
    },
    adultdose: {
      get() {
        return this.$store.state.drugs.dose.AdultDose
      },
      set(value) {
        this.$store.commit('drugs/updatedoseAdultDose', value)
      }
    },
    idunityadultdose: {
      get() {
        return this.$store.state.drugs.dose.IdUnityAdultDose
      },
      set(value) {
        this.$store.commit('drugs/updatedoseIdUnityAdultDose', value)
      }
    },
    takesperday: {
      get() {
        return this.$store.state.drugs.dose.TakesPerDay
      },
      set(value) {
        this.$store.commit('drugs/updatedoseTakesPerDay', value)
      }
    },
    maxdoseperday: {
      get() {
        return this.$store.state.drugs.dose.MaxDosePerDay
      },
      set(value) {
        this.$store.commit('drugs/updatedoseMaxDosePerDay', value)
      }
    },
    idunitymaxdoseperday: {
      get() {
        return this.$store.state.drugs.dose.IdUnityMaxDosePerDay
      },
      set(value) {
        this.$store.commit('drugs/updatedoseIdUnityMaxDosePerDay', value)
      }
    },
    obs: {
      get() {
        return this.$store.state.drugs.dose.obs
      },
      set(value) {
        this.$store.commit('drugs/updatedoseobs', value)
      }
    }
  },
  methods: {
    save (){
      this.$store.dispatch('drugs/ADD_DOSE_TO_INDICATION', this.$store.state.drugs.dose)
      this.$emit('onsubmitted')
    }
  }

}
</script>

<style>
</style>

