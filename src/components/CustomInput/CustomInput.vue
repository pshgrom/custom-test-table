<template>
  <input
    :value="modelValue"
    @input="updateInput"
    :type="type"
  >
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    value: {
      type: [String, Number]
    },
    modelValue: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  setup (props, { emit }) {
    const updateInput = (e) => {
      emit('update:modelValue', e.target.value)
    }

    return {
      updateInput
    }
  }
}
</script>

<style scoped lang="scss">
  input {
    width: 100%;
    border: 1px solid #fff;
    padding: 10px 15px;
    border-radius: 5px;
    height: 40px;
    transition: border-color .15s ease-in;

    &:focus {
      border-color: black;
      outline: none;
    }
  }
</style>
