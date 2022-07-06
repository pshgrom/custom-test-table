<template>
  <div class="custom-table">
    <div class="custom-table-row custom-table-row_header">
      <div
        class="custom-table-column__title"
        v-for="column in columns"
        :key="column.id"
        :style="{'width': columnsWidth}"
      >
        {{ (column.title) }}
      </div>
    </div>
    <div
      class="custom-table-row"
      v-for="row in rows"
      :key="row.id"
    >
      <div
        class="custom-table-column"
        v-for="column in columns"
        :key="column.id"
        :style="{'width': columnsWidth}"
      >
        <component
          :is="getComponentByType(column)"
          :row="row"
          :column="column"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextCell from './TextCell/TextCell'
import { computed } from 'vue'

export default {
  name: 'Table',
  components: {
    TextCell
  },
  props: {
    rows: Array,
    columns: Array
  },
  setup (props) {
    const columnsWidth = computed(() => props.columns.map((item) => item.width))

    const getComponentByType = (column) => {
      const type = column?.type
      switch (type) {
        case 'text':
          return TextCell
      }
    }

    return {
      getComponentByType,
      columnsWidth
    }
  }
}

</script>

<style lang="scss" scoped>

.custom-table {
  max-width: 800px;
  min-height: 800px;
  width: 100%;
  margin: auto;

  &-row {
    display: flex;
    grid-gap: 20px;
    border-bottom: 1px solid #fff;
    padding: 0 40px;

    &:last-child {
      border-bottom: 0;
    }

    &_header {
      color: azure;
      border-radius: 4px 4px 0 0;
      margin-bottom: 6px;
      align-items: center;
      position: sticky;
      top: 0;
      background: rgba(green, 0.9);
      z-index: 5
    }

    &__pointer {
      cursor: pointer;
      transition: 0.3s;
    }

  }

  &-column {
    padding: 15px 0;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    position: relative;

    &__title {
      font-weight: bold;
      font-size: 16px;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      padding: 10px 0;
      color: #fff;
    }
  }
}

</style>
