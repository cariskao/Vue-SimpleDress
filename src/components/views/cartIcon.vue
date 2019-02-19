<template>
  <div>
    <div class="dropdown ml-auto dropleft">
      <a class="btn btn-sm btn-cart" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-cart-plus text-dark fa-2x"></i>
        <span class="badge badge-pill badge-danger">{{ cart.length }}</span>
      </a>
      <div class="dropdown-menu  px-4 py-3 dropdown-media">
        <h6>購物車列表</h6>
        <div class="table-container">
          <table class="table table-sm">
            <tbody>
              <tr>
                <th colspan="2" class="text-center name-media">商品名稱</th>
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
                  <a class="btn btn-link" href="#" @click.prevent="productRoute(item.product_id)"><img class="small mr-3" :src="item.product.imageUrl" alt="">{{ item.product.title }}</a>
                </td>
                <td class="pt-2">{{ item.qty }} / {{ item.product.unit }}</td>
                <td class="pt-2 text-right text-danger">{{ item.total | currency }}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-right">合計</td>
                <td class="text-right text-danger">{{ finalTotal | currency }}</td>
             </tr>
            </tbody>
          </table>
        </div>
        <router-link to="/cart" class="text-white">
          <button class="btn btn-block btn-primary my-2">
            結帳去
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      cart: [],
      finalTotal: '',
      total: '',
      status: {
        loadingItem: ''
      }
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
        vm.isLoading = false
      })
    },
    removeCart (id) {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      vm.status.loadingItem = id
      vm.$http.delete(api).then((response) => {
        vm.isLoading = false
        vm.getCart()
        vm.status.loadingItem = id
      })
    },
    productRoute (id) {
      const vm = this
      vm.$router.push(`/product/${id}`)
    }
  },
  created () {
    const vm = this
    vm.getCart()
    vm.$bus.$on('newCart', function () {
      vm.getCart()
    })
    $(document).ready(function () {
      $('.dropdown-menu').click(function (e) {
        e.stopPropagation()
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";
* {
  @include ipad() {
    display: none;
  }
}
.btn-cart {
  position: fixed;
  right: 20px;
  top: 200px;
}
.btn-cart .badge {
  position: absolute;
  top: -4px;
  right: -4px;
}
.small {
  width: 50px;
}
.dropdown-menu {
  min-width: 300px;
  height: 400px;
  overflow: scroll;
}
.table-container {
  min-height: 250px;
}
</style>
