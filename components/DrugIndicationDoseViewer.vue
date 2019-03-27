<template>
  <div>
    <div>
      <b-button size="sm" @click.stop="editdrug(element)" variant="secondary">Editar</b-button>
      <b-button size="sm" @click.stop="removedrug(element)" variant="danger">Apagar</b-button>
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
export default {
  props: {
    dose: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rows: 3,
      maxrows: 6
    }
  }
}
</script>

<style>
</style>

