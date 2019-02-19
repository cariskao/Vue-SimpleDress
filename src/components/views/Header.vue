<template>
  <div>
    <div class="banner">
        <h1 class="display-4 text-center">
          <router-link class="title" to="/Home">
            <img src="../../assets/images/logo.svg" alt="logo">
            SIMPLE DRESS
          </router-link>
        </h1>
    </div>
    <div class="container">
      <ul class="nav d-flex justify-content-between">
        <li class="nav-item">
          <router-link class="nav-link topmenu" to="/productmenu">All</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link topmenu" to="/productmenu/men">MEN</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link topmenu" to="/productmenu/women">WOMEN</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link topmenu" to="/productmenu/kid">KIDS</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link topmenu" to="/productmenu/sale">SALE</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'banner',
  data () {
    return {
      category: ''
    }
  },
  methods: {},
  mounted () {
    $(document).ready(function () {
      $('.topmenu').each(function () {
        let originText = $(this).text()
        $(this).mouseenter(() => {
          $(this).text(() => {
            return $(this).text() === 'All' ? '全部' : $(this).text() === 'MEN' ? '男裝' : $(this).text() === 'WOMEN' ? '女裝' : $(this).text() === 'KIDS' ? '童裝' : '促銷'
          })
        })
        $(this).mouseleave(() => {
          $(this).text(() => {
            return originText
          })
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/mixin";
.banner {
  padding-top: 100px;
}
.nav-item {
  width: 18%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05)
  }
  // @include iphone8plus {
  // }
}
.nav-link {
  color: rgb(199, 171, 58);
  display: block;
  text-align: center;
  padding: 0 1%;
  font-size: 20px;
  @include iphone8plus {
    font-size: 14px;
  }
}
.title{
  text-indent: 101%;
  white-space: nowrap;
  overflow: hidden;
  display: block;
}
h1 {
  background-image: url('../../assets/images/logo.svg');
  background-size: cover;
  background-position: center center;
  &:hover {
    transition: all 0.5s;
    opacity: 0.5;
  }
}
</style>
