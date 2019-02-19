<template>
  <div class="mt-4">
    <loading :active.sync="isLoading"></loading>
    <h2 class="text-center">結帳</h2>
      <div class="row my-3">
        <div class="col-md-4 text-center">
          <div class="alert alert-white rounded-pill">Step 1:請填寫基本資料</div>
        </div>
        <div class="col-md-4 text-center">
          <div class="alert alert-white rounded-pill" :class="{'alert-success':order.is_paid === false}">Step 2:金流付款</div>
        </div>
        <div class="col-md-4 text-center">
          <div class="alert alert-white rounded-pill" :class="{'alert-success':order.is_paid === true}">Step 3:完成</div>
        </div>
      </div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-8" @submit.prevent="payOrder">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>品名</th>
                <th>數量</th>
                <th class="text-center">單價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle"><a href="#" class="btn btn-link text-info"><img class="small" :src="item.product.imageUrl" alt=""><div>{{ item.product.title }}</div></a></td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ Math.round(item.final_total) | currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="text-right" colspan="3">總計： <span>{{ Math.round(order.total) | currency }}</span></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <h3 class="text-center my-4">收件人資訊</h3>
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <tr>
                <th width="200">Email</th>
                <td>{{ order.user.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // route取得的訂單id
      orderId: '',
      isLoading: false,
      // 取得的訂單資訊
      order: {
        user: {
          user: {} // 因為有另一層，所以一開始讀取不到，會出錯。
        }
      }
    }
  },
  methods: {
  // 取得後端資料
    getOrder () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`
      // console.log(api);
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        console.log('oneOrder', response.data)
        vm.order = response.data.order
        vm.isLoading = false
      })
    },
    // 點擊付款
    payOrder () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      vm.$http.post(api).then((response) => {
        console.log(response.data)
        vm.isLoading = false
        vm.getOrder()
        // 付款完成，清除購物車資訊
        vm.$bus.$emit('checkout')
      })
    }
  },
  created () {
    const vm = this
    // 取得網址上的參數
    vm.orderId = vm.$route.params.orderId
    console.log(vm.orderId)
    // 取得該產品訂單
    vm.getOrder()
  }
}
</script>

<style scoped>
  .small {
    width: 50px;
  }
</style>
