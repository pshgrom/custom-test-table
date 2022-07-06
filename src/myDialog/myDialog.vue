<template>
  <div class="dialog" v-if="show">
    <div class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(black, .5);
  display: flex;

  &__content {
    margin: auto;
    background: #fff;
    border-radius: 12px;
    min-height: 50px;
    padding: 15px;
  }
}

</style>
