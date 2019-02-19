<template>
  <div>
    <Navbar></Navbar>
    <Alert></Alert>
    <Header></Header>
    <!-- <cart-icon v-if="['cart'].indexOf($route.name) == -1 && ['checkout'].indexOf($route.name) == -1 && ['order'].indexOf($route.name) == -1"></cart-icon> -->
    <div class="container">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'
// import CartIcon from './cartIcon'
import Alert from './Alertmessage'
export default {
  name: 'Dashboard',
  components: {Navbar, Header, Footer, Alert}
}
</script>

<style lang="scss">
  .cartIcon {
    width: 36px;
    height: 36px;
    background-image: url('https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/shopping_cart_empty-512.png');
    background-size: cover;
    background-position: center center;
    position: fixed;
    right: 20px;
    top: 200px;
  }
</style>
