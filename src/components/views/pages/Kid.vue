<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <h2 class="subTitle">KIDS 童裝</h2>
    <div class="row mt-5">
      <div class="col-md-3 my-3 d-flex justify-content-center" v-for="item in products" :key="item.id">
        <div class="card border-0" style="width: 222px;">
          <img :src="item.imageUrl" class="card-img-top" alt="..." style="height: 309.3px" @click="getProduct(item.id)">
          <div class="card-body text-center">
            <p class="mb-0">{{ item.title }}</p>
            <div>
              <span class="text-center priceText" v-if="item.origin_price == item.price">NT.{{ item.origin_price }}</span>
              <span class="mr-2 priceText" v-if="item.origin_price !== item.price" style="text-decoration:line-through">NT.{{ item.origin_price }}</span>
              <span v-if="item.origin_price !== item.price" class="text-danger priceText">NT.{{ item.price }}</span>
            </div>
            <div class="color">
              <ul class="nav justify-content-center mt-1">
                <li class="nav-item mr-2"><div style="width:12px; height:12px; border-radius: 50%; background-color: black; border: 1px solid black;"></div></li>
                <li class="nav-item mr-2"><div style="width:12px; height:12px; border-radius: 50%; background-color: gray; border: 1px solid black;"></div></li>
                <li class="nav-item mr-2"><div style="width:12px; height:12px; border-radius: 50%; background-color: pink; border: 1px solid black;"></div></li>
                <li class="nav-item mr-2"><div style="width:12px; height:12px; border-radius: 50%; background-color: blue; border: 1px solid black;"></div></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Kid',
  data () {
    return {
      products: [],
      isLoading: false
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        console.log(response.data)
        response.data.products.forEach((item) => {
          if (item.category.includes('Kid')) vm.products.push(item)
        })
        vm.isLoading = false
      })
    },
    getProduct (productId) {
      const vm = this
      vm.$router.push({path: `/product/${productId}`})
    }
  },
  created () {
    const vm = this
    vm.getProducts()
  }
}
</script>
<style lang="scss" scoped>
.nav-item:hover {
  cursor: pointer
}
.priceText {
  font-weight: 400;
  font-size: 12px
}
.card-img-top {
  cursor: pointer;
}
.card {
  box-shadow: 1px 2px 10px gray;
  &:hover {
    box-shadow: 1px 2px 5px gray;
  }
}
.subTitle {
  text-align: center;
  margin: 30px 0px;
  color: rgb(199, 171, 58);
}
</style>
