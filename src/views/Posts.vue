<template class="post">
  <Loader v-if="loader" />
  <div class="post__top">
    <div>
      <span class="post__label">Search by title</span>
      <CustomInput
        v-model="searchVal"
        style="width: 200px"
      />
    </div>
    <div>
      <span class="post__label">Sort by</span>
      <CustomSelect
        v-model="selectedSort"
        :options="sortingAll"
      />
    </div>
  </div>
  <Table
    v-if="!loader"
    :columns="columnsPosts"
    :rows="sortedPosts"
  />
  <Pagination
    v-show="!loader"
    :totalPage="totalPage"
    :page="page"
    v-model:limit="limit"
    :limitsAll="limitsAll"
    @changePage="changePage"
  />
<!--  <my-dialog :show="true"><input type="text"> </my-dialog>-->
</template>

<script>

import { computed, onMounted, ref, watch } from 'vue'
import Loader from '../components/Loader/Loader'
import axios from 'axios'
import columnsPosts from '../constants/headersPosts'
import Pagination from '../components/Pagination/Pagination'
import Table from '../components/Table/Table'
import CustomInput from '../components/CustomInput/CustomInput'
import limits from '../constants/limits'
import CustomSelect from '../components/CustomSelect/CustomSelect'
import sorting from '../constants/sorting'

export default {
  name: 'Posts',
  components: {
    CustomSelect,
    CustomInput,
    Loader,
    Table,
    Pagination
  },
  setup () {
    const loader = ref(false)
    const allPosts = ref([])
    const page = ref(1)
    const searchVal = ref('')
    const totalPage = ref(0)
    const limitsAll = ref(limits)
    const limit = ref(limits[0].value)
    const sortingAll = ref(sorting)
    const selectedSort = ref(sorting[0].value)

    const changePage = (currentPage) => {
      page.value = currentPage
    }

    watch(
      () => [page.value, limit.value],
      () => {
        fetchPosts()
      }
    )

    const fetchPosts = async () => {
      try {
        loader.value = true
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page.value}&_limit=${limit.value}`)
        totalPage.value = Math.ceil(response.headers['x-total-count'] / limit.value)
        allPosts.value = response.data
      } catch (e) {
        console.error(e)
      } finally {
        loader.value = false
      }
    }

    const filteredPosts = computed(() => allPosts.value.filter((post) => post.title.toLowerCase().includes(searchVal.value.toLowerCase())))

    const sortedPosts = computed(() => {
      return [...filteredPosts.value].sort((post1, post2) => {
        return post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
      })
    })

    onMounted(() => {
      fetchPosts()
    })

    return {
      loader,
      columnsPosts,
      allPosts,
      totalPage,
      page,
      changePage,
      searchVal,
      filteredPosts,
      limitsAll,
      limit,
      sortingAll,
      selectedSort,
      sortedPosts
    }
  }
}
</script>

<style lang="scss" scoped>
  .post {

    &__top {
      position: sticky;
      display: flex;
      justify-content: space-between;
      padding: 15px;
      top: 0;
    }

    &__label {
      color: #fff;
      padding: 10px;
    }
  }
</style>
