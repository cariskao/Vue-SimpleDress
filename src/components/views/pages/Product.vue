<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="container my-5">
      <div class="row">
        <div class="col-md mb-3">
          <img :src="product.imageUrl" class="product-img" alt="">
        </div>
        <div class="col-md">
          <h2>{{ product.title }}</h2>
          <small>商品編號：{{ product.id }}</small>
          <hr>
          <p class="text-danger text-right" style="font-size:49px;" v-if="product.price == product.origin_price">NT.{{ product.price | currency }}</p>
          <p class="text-right" style="text-decoration: line-through" v-if="product.price !== product.origin_price">NT.{{ product.origin_price | currency }}</p>
          <p class="text-danger text-right" style="font-size:49px;" v-if="product.price !== product.origin_price">NT.{{ product.price | currency }}</p>
          <div>
            <div class="product-color bg-white"></div>
            <div class="product-color bg-secondary"></div>
            <div class="product-color bg-dark"></div>
            <div class="product-color bg-danger"></div>
          </div>
          <div class="d-flex justify-content-start my-3">
            <div class="product-size bg-secondary text-white rounded-circle">S</div>
            <div class="product-size bg-secondary text-white rounded-circle">M</div>
            <div class="product-size bg-secondary text-white rounded-circle">L</div>
            <div class="product-size bg-secondary text-white rounded-circle">XL</div>
          </div>
          <select class="form-control" v-model="qtySelect">
            <option v-for="num in 10" :value="num" :key="num">
              選購 {{ num }} {{product.unit}}
            </option>
          </select>
          <div class="mt-3 d-flex justify-content-between">
            <span class="text-danger">總計 NT. {{product.price * qtySelect | currency }}</span>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(product.id, qtySelect)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Product',
  data () {
    return {
      product: {},
      isLoading: false,
      qtySelect: 1,
      // 詳細資訊loading
      status: {
        loadingItem: ''
      },
      color: '',
      size: ''
    }
  },
  watch: {
    '$route': 'getProduct'
  },
  methods: {
    getProduct (id) {
      console.log('id', id)
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
      vm.isLoading = true
      window.scrollTo(0, 0)
      vm.$http.get(api).then((response) => {
        console.log(response.data)
        vm.product = response.data.product
        vm.isLoading = false
      })
    },
    addtoCart (id, qty = 1) {
      let vm = this
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      // 參數： id 和 qty
      const cart = {
        product_id: id,
        qty
      }
      // 開啟loading效果
      vm.status.loadingItem = id
      vm.$http.post(api, {data: cart}).then((response) => {
        console.log('cart', response.data)
        // 關閉loading效果
        vm.status.loadingItem = ''
        vm.$bus.$emit('newCart', response.data)
        vm.$bus.$emit('message:push', (response.data.message))
      })
    }
  },
  created () {
    const vm = this
    console.log(this.$route.params.productId)
    vm.getProduct(this.$route.params.productId)
  },
  mounted () {
    $(document).ready(function () {
      $('.product-color').click(function (e) {
        $(this).addClass('active').siblings().removeClass('active')
      })
      $('.product-size').click(function (e) {
        $(this).addClass('active').siblings().removeClass('active')
      })
    })
  }
}

</script>

<style lang="scss">
@import "../../../assets/mixin";
hr {
  background-color: black
}
.product-color {
  width: 36px;
  height: 36px;
  border: 0.5px solid black;
  display: inline-block;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
}
.product-size {
  width:36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
  }
}
.active {
  border-width: 3px;
}
.product-img {
  width:430px;
  @include ipad() {
    width: 100%;
    height: auto;
  }
}
</style>
