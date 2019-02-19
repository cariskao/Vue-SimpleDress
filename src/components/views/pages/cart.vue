<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="container my-4">
      <h2 class="text-center my-3">購物車列表</h2>
      <div class="table-responsive">
        <table class="table table-sm table-striped">
          <tbody>
            <tr class="bg-secondary text-white">
              <th class="text-center" width="10%">刪除</th>
              <th  class="text-left name-media">商品名稱</th>
              <th>數量</th>
              <th class="text-center">小計</th>
            </tr>
            <tr v-for="item in cart" :key="item.id">
              <td class="align-middle text-center" width="20%">
                <button class="btn" @click="removeCart(item.id)">
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                  <i class="far fa-trash-alt text-secondary"></i>
                </button>
              </td>
              <td class="text-left">
                <a href="#" class="btn btn-link" @click.prevent="productRoute(item.product_id)">
                  <img class="small mr-3" :src="item.product.imageUrl" alt="">
                  <div>{{ item.product.title }}</div>
                </a>
                <div class="text-success" v-if="item.coupon">
                  已套用優惠卷
                </div>
              </td>
              <td class="pt-2">{{ item.qty }} / {{ item.product.unit }}</td>
              <td class="pt-2 text-right text-danger">{{ item.final_total | currency }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-right">合計</td>
              <td class="text-right text-danger">{{ finalTotal | currency }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 套用優惠卷 -->
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="input-group mb-2">
            <input type="text" class="form-control" v-model="coupon_code">
            <div class="input-group-prepend">
              <button class="btn btn-outline-dark" @click="addCouponCode()">套用優惠卷</button>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <router-link to="order" class="btn btn-block btn-primary my-4 btn-checkout w-100">前往結帳</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cart: [],
      finalTotal: '',
      total: '',
      status: {
        loadingItem: ''
      },
      coupon_code: '',
      isLoading: false
    }
  },
  methods: {
    getCart () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.cart = response.data.data.carts
        vm.finalTotal = response.data.data.final_total
        vm.total = response.data.data.total
        console.log('getCart', response.data)
        vm.isLoading = false
      })
    },
    removeCart (id) {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      vm.status.loadingItem = id
      vm.$http.delete(api).then((response) => {
        console.log(response.data)
        vm.isLoading = false
        vm.getCart()
        vm.$bus.$emit('delete:cart')
        vm.status.loadingItem = id
      })
    },
    addCouponCode () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`
      // console.log(api);
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      // data和coupn都是obj
      vm.$http.post(api, { data: coupon }).then((response) => {
        console.log(response.data)
        vm.isLoading = false
        vm.getCart()
      })
      vm.coupon_code = ''
    },
    productRoute (id) { // 移動至產品頁面
      const vm = this
      vm.$router.push(`/product/${id}`)
    }
  },
  watch: {
    cart: function (val) {
      if (val.length === 0) {
        alert('目前購物車沒有任何商品!')
        this.$router.push('Home')
      }
    }
  },
  created () {
    const vm = this
    vm.getCart()
    vm.$bus.$on('newCart', function () {
      vm.getCart()
    })
  }
  // mounted () {
  //   const vm = this
  //   if (!vm.cart) {
  //     alert('目前購物車沒有任何商品!')
  //     vm.$router.push('/productmenu')
  //   }
  // }
}
</script>

<style lang="scss">
  .small {
    width: 50px;
  }
  .btn-checkout {
    width: 30%;
  }
</style>
