<template>
  <div>
    <!-- <b>#{{item.Id}}</b>-->
    <span>{{ item.Name }}</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    searchText: {
      type: String,
      required: true
    }
  }
}
</script>