<template>
  <select
    v-model="value"
    @change="changeOption"
  >
    <option
      v-for="item in options"
      :key="item.value"
      :value="item.value"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CustomSelect',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const value = ref(props.modelValue)

    const changeOption = (e) => {
      emit('update:modelValue', e.target.value)
    }

    return {
      changeOption,
      value
    }
  }
}
</script>

<style scoped>

</style>
