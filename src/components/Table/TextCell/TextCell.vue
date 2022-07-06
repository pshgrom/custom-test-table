<template>
  <div class="custom-table-column-item">
    {{ text }}
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'TextCell',
  props: {
    column: Object,
    row: Object
  },
  setup (props) {
    const text = computed(() => props.row[props.column?.prop])
    return {
      text
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-table-column-item {
    color: #fff;
  }
</style>
