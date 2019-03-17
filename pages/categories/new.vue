<template>
  <category :editmode="false"/>
</template>
<script>
import category from '~/components/Category.vue'

export default {
  components: {
    category
  },
  async fetch({ store, params }) {
    // eslint-disable-next-line
  },
  methods: {
    
  }
}
</script>

