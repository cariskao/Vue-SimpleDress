<template>
  <div class="position-fixed w-100">
    <nav class="navbar navbar-expand-lg p-0 navbar-default" role="navigation">
      <button class="navbar-toggler ml-auto mr-4" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fas fa-bars text-white"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link pr-3" to="/login"><i class="fas fa-cog mr-2"></i>後台管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/cart"><i class="fas fa-cart-plus mr-2"></i>購物車 ( {{ cart.length }} )</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      cart: []
    }
  },
  methods: {
    getCart () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.cart = response.data.data.carts
      })
    }
  },
  created () {
    const vm = this
    vm.getCart() // 剛建立時讀取
    vm.$bus.$on('newCart', function () { // 當按下加到購物車，接收newCart資訊
      vm.getCart()
    })
    vm.$bus.$on('delete:cart', function () { // 接收刪除購物車資訊
      vm.getCart()
    })
    vm.$bus.$on('checkout', function () { // 接收付款完成資訊
      vm.getCart()
    })
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: rgb(218, 187, 62);
}

.position-fixed {
  z-index: 100;
}

.nav-link {
  color: gray;
  display: block;
  height: 100%;
  &:hover {
    color: rgb(235, 235, 235);
    background-color: rgba(0, 0, 0, 0.3)
  }
}
</style>
