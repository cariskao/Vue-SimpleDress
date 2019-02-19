<template>
  <div>
    <!-- loading 元件 -->
    <loading :active.sync="isLoading"></loading>
    <div class="content mt-5">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <!-- width 分配 -->
            <th width="200">購買時間</th>
            <th>E-mail</th>
            <th width="300">購買款項</th>
            <th width="150">應付金額</th>
            <th width="100" class="text-center">是否付款</th>
          </thead>
          <tbody>
            <!-- eslint ：若v-for的元素為使用到，未出現警告 -->
            <tr v-for="(item) in orders" :key="item.id">
              <td >{{ item.create_at | timeFormat }}</td>
              <td>{{ item.user.user.email }}</td>
              <td><div  v-for="obj in item.products" :key="obj.id">{{ obj.product.title }} | <span class="text-info">數量：{{ obj.qty}} {{obj.product.unit }}</span></div></td>
              <td class="text-right">{{ item.total | currency }}</td>
              <td class="text-center">
                 <!-- 判斷is_enabled是否存在，本題未啟用，所以data沒有回傳 -->
                <span v-if="item['is_paid']" class="text-success">已付款</span>
                <span v-else>尚未付款</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Pagination class="d-flex justify-content-center" :pageData="pagination" @changepage="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from '../../views/Pagination'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      orders: [],
      isLoading: false,
      pagination: {}
    }
  },
  methods: {
    // 從外部server取得data
    getOrders (page = 1) { // ES6 參數預設
      let vm = this
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`
      // 啟動Loading畫面
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        console.log('orderList', response.data)
        window.scrollTo(0, 0)
        vm.orders = response.data.orders
        // pagination
        vm.pagination = response.data.pagination
        // 停止loading畫面
        vm.isLoading = false
      })
    }
  },
  created () {
    const vm = this
    vm.getOrders()
    // 註冊事件on==> 接收pagination變動
    vm.$bus.$on('page:current', (currentPage) => {
      vm.getOrders(currentPage)
    })
  }
}
</script>
<style scoped>
.content {
  min-height: calc(100vh - (51px + 62px))
}
.table {
  min-width: 1000px;
}
</style>
