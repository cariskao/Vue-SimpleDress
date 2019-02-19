<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <router-link class="navbar-brand" to="/admin/products">
        <img src="../../assets/images/logo.svg" class="logo" alt="logo">
        Simple Dress
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">
              <i class="fas fa-box-open"></i> 產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">
              <i class="fab fa-wpforms"></i> 訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupon">
              <i class="fas fa-ticket-alt"></i> 優惠卷
            </router-link>
          </li>
          <li class="nav-item d-md-inline-block">
            <router-link class="nav-link" to="/customer_order">
              <i class="fas fa-cart-plus"></i> 模擬訂單
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    signout () {
      let api = `${process.env.APIPATH}/logout`
      let vm = this
      console.log(api)
      vm.isLoading = true
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          console.log(response.data)
          vm.isLoading = false
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 64px;
}
</style>
