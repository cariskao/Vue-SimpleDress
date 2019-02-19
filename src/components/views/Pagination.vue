<template>
  <div>
    <nav aria-label="...">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pageData.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pageData.current_page - 1)">&laquo;</a>
          <span class="sr-only">Previous</span>
        </li>
        <li class="page-item" v-for="page in pageData.total_pages" :key="page" :class="{'active': pageData.current_page === page}">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pageData.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click="changePage(pageData.current_page + 1)">&raquo;</a>
          <span class="sr-only">Next</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data () {
    return {}
  },
  props: {
    pageData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    changePage (page) {
      this.$emit('changepage', page)
    }
  }
}
</script>

<style scoped lang="scss">
  .page-link {
    display: inline-block;
    border: 0;
    color: black;
  }
  .page-item.active .page-link {
    color: #555;
    background-color: #dcdcdc;
  }
</style>
