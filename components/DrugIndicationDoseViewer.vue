<template>
  <div>
    <b-modal ref="doseModal" size="lg" hide-footer title="Editar Dose">
      <div>
        <drugIndicationDose @onsubmitted="hideDoseModal" />
      </div>
    </b-modal>
    <div>
      <b-button size="sm" @click.stop="editDose()" variant="secondary">Editar</b-button>
      <b-button size="sm" @click.stop="deleteDose()" variant="danger">Apagar</b-button>
    </div>
    <b-input-group id="viasGroup1" prepend="Via" class="mt-3">
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
      <b-form-textarea
        type="text"
        v-model="dose.obs"
        required
        placeholder="Observações"
        :rows="rows"
        :max-rows="maxrows"
        readonly
      ></b-form-textarea>
    </b-input-group>
  </div>
</template>
<script>
import drugIndicationDose from '~/components/DrugIndicationDose.vue'
// import cm from '~/assets/js/call-manager.js'

export default {
  components: { drugIndicationDose },
  props: {
    dose: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    indication: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rows: 3,
      maxrows: 6
    }
  },
  methods:
  {
    deleteDose() {
      this.$store.dispatch('drugs/DELETE_DOSE', {indication: this.indication, dose: this.dose, index: this.index})
    },
    editDose(indication) {
      this.$store.dispatch('drugs/SET_INDICATION', this.indication)
      this.$store.dispatch('drugs/SET_DOSE', this.dose)
      this.$refs.doseModal.show()
    },
    hideDoseModal() {
      this.$refs.doseModal.hide()
    }
  }
}
</script>

<style>
</style>

