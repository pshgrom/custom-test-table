<template>
  <div class="page-action">
    <div class="pagination">
      <div
        class="pagination__arrow pagination__arrow_left"
        :class="{'pagination__arrow_disabled': sectionPage <= 1}"
        @click="prevPage"
      >
        &#10140;
      </div>
      <div
        v-for="pageNumber in totalPage"
        :key="pageNumber"
        class="pagination__item"
        :class="{'pagination__item_active': pageNumber === page}"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
      <div
        class="pagination__arrow pagination__arrow_right"
        :class="{'pagination__arrow_disabled': sectionPage === totalPage }"
        @click="nextPage"
      >
        &#10140;
      </div>
    </div>
    <div class="choose-section">
      <CustomInput
      :value="sectionPage"
      :type="'number'"
      @keyup.enter="getValueFromSection($event)"
    />
    </div>
    <CustomSelect
      v-model="selectedLimit"
      :options="limitsAll"
    />
  </div>
</template>

<script>
import CustomInput from '../CustomInput/CustomInput'
import CustomSelect from '../CustomSelect/CustomSelect'
import { ref, watch } from 'vue'

export default {
  name: 'Pagination',
  components: {
    CustomInput,
    CustomSelect
  },
  props: {
    totalPage: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 0
    },
    limitsAll: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number
    }
  },
  setup (props, { emit }) {
    const selectedLimit = ref(props.limit)
    const sectionPage = ref(1)

    const prevPage = () => {
      if (sectionPage.value >= 1) {
        sectionPage.value--
        changePage(sectionPage.value)
      }
    }

    const nextPage = () => {
      if (sectionPage.value < props.totalPage) {
        sectionPage.value++
        changePage(sectionPage.value)
      }
    }

    const getValueFromSection = (e) => {
      const currentPage = +e.target.value
      changePage(currentPage)
    }

    const changePage = (page) => {
      sectionPage.value = page
      emit('changePage', page)
    }

    watch(
      () => selectedLimit.value,
      (val) => {
        emit('changePage', 1)
        emit('update:limit', val)
      }
    )

    return {
      changePage,
      sectionPage,
      getValueFromSection,
      prevPage,
      nextPage,
      selectedLimit
    }
  }
}
</script>

<style scoped lang="scss">
  .page-action {
    margin: 15px auto;
    position: sticky;
    bottom: 0;
    padding: 15px;
    background: rgba(green, .9);
    display: flex;
    justify-content: center;
  }

  .choose-section {
    margin-right: 15px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-right: 50px;
    user-select: none;

    &__arrow {
      font-size: 25px;
      color: #fff;
      display: flex;
      cursor: pointer;
      transition: opacity .15s ease-in;
      user-select: none;

      &_disabled {
        pointer-events: none;
        color: rgba(#fff, .5);
      }

      &:hover {
        opacity: .8;
      }

      &_left {
        transform: rotate(180deg);
      }
    }

    &__item {
      border: 1px solid #fff;
      border-radius: 5px;
      padding: 5px 10px;
      color: #fff;
      margin: 0 5px;
      cursor: pointer;

      &_active {
        border-color: red;
        border-width: 2px;
      }
    }
  }
</style>
