<template>
  <div class="mt-5">
    <loading :active.sync="isLoading"></loading>
    <h2 class="text-center">模擬選單</h2>
    <div class="row my-5">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
          :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text  text-truncate">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{item.origin_price}}</div>
              <del class="h6" v-if="item.price">{{item.origin_price}}</del>
              <div class="h5" v-if="item.price">{{item.price}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="getProduct(item.id)"
            data-toggle="modal" data-target="#productModal">
            <!-- v-if 確認 id相符合的，才有loading icon -->
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div style="height: 150px; background-size: cover; background-position: center"
              :style="{backgroundImage: `url(${product.imageUrl})`}">
              </div>
              <p class="card-text">{{product.content}}</p>
              <p class="text-right">__</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5" v-if="!product.price">{{product.origin_price}}</div>
                <del class="h6" v-if="product.price">{{product.origin_price}}</del>
                <div class="h5" v-if="product.price">{{product.price}}</div>
              </div>
              <!-- option設定 -->
              <select class="form-control" v-model="qtySelect">
                <option v-for="num in 10" :value="num" :key="num">
                  選購 {{ num }} {{product.unit}}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <span>小計 {{product.price * qtySelect }}</span>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(product.id, qtySelect)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>
                加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="row d-flex justify-content-center my-4" v-if="finalTotal">
      <div class="col-md-6">
        <h3 class="text-center mt-5">購物車清單</h3>
        <table class="table my-4">
          <thead>
          <!-- width 分配 -->
            <tr>
              <th width="50"></th>
              <th>產品名稱</th>
              <th width="120">數量</th>
              <th width="120">單價</th>
            </tr>
          </thead>
          <tbody>
          <!-- eslint ：若v-for的元素為使用到，未出現警告 -->
            <tr v-for="(item) in cart" :key="item.id">
              <td>
                <button class="btn btn-outline-danger btn-sm mt-2" @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td>
                <a href="#" class="btn btn-link text-info">
                  <img class="small mr-3 rounded" :src="item.product.imageUrl" alt="">
                  {{ item.product.title }}
                </a>
                <div class="text-success" v-if="item.coupon">
                  已套用優惠卷
                </div>
              </td>
              <td>
                <div class="mt-2">
                  {{ item.qty }} / {{item.product.unit}}
                </div>
              </td>
              <td class="text-right"><div class="mt-2">{{ item.product.price }}</div></td>
            </tr>
            <tr>
              <td class="text-right" colspan="4">總計：{{ total }}</td>
            </tr>
            <!-- 如果折扣價不等於總計才顯示 -->
            <tr v-if="finalTotal !== total ">
              <td colspan="2"></td>
              <td class="text-success">折扣價</td>
              <td class="text-success text-right">{{ Math.round(finalTotal) }}</td>
            </tr>
          </tbody>
        </table>
        <!-- 套用優惠卷 -->
        <div class="input-group mb-2">
          <input type="text" class="form-control" v-model="coupon_code">
          <div class="input-group-prepend">
            <button class="btn btn-outline-dark" @click="addCouponCode()">套用優惠卷</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 表單 -->
    <div class="row d-flex justify-content-center my-4">
      <div class="col-10">
        <h3 class="text-center mt-4">建立表單</h3>
        <div class="my-5 row justify-content-center">
          <form class="col-md-6" @submit.prevent="createOrder()">
            <div class="form-group">
              <label for="useremail">Email</label>
              <input type="email" class="form-control" name="email" id="useremail"
              v-model="form.user.email" placeholder="請輸入 Email" v-validate="'required|email'"
              :class="{'is-invalid':errors.first('email')}" >
              <span class="text-danger">
                {{ errors.first('email') }}
              </span>
            </div>
            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input type="text" class="form-control" name="name" id="username"
              v-model="form.user.name" placeholder="輸入姓名"  v-validate="'required'"
              :class="{'is-invalid':errors.has('name')}">
              <span class="text-danger" v-if="errors.has('name')">
                姓名欄位不得留空
              </span>
            </div>
            <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input type="tel" class="form-control" name="tel" id="usertel" v-model="form.user.tel" placeholder="請輸入電話"
               v-validate="'required'" maxlength="10" :class="{'is-invalid':errors.has('tel')}">
                <span class="text-danger" v-if="errors.has('address')">電話欄位不得留空</span>
            </div>
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input type="address" class="form-control" name="address" id="useraddress" v-model="form.user.address"
              placeholder="請輸入地址" v-validate="'required'" :class="{'is-invalid':errors.has('address')}">
              <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>
            <div class="form-group">
              <label for="useraddress">留言</label>
              <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 觸發modal 套件
import $ from 'jquery'

export default {
  data () {
    return {
      // 接收外部資料
      products: [],
      // 全螢幕Loading Boolen
      isLoading: false,
      // 取得產品資訊
      product: {},
      // 詳細資訊loading
      status: {
        loadingItem: ''
      },
      cart: [],
      finalTotal: '',
      total: '',
      // coupon
      coupon_code: '',
      // 表單
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: '這是留言'
      },
      qtySelect: 1
    }
  },
  methods: {
    getProducts (page = 1) { // ES6 參數預設
      let vm = this
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`
      // console.log(api);
      // 啟動Loading畫面
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        console.log('Products', response.data)
        vm.products = response.data.products
        // pagination
        vm.$bus.$emit('page:data', response.data.pagination)
        // vm.pagination = response.data.pagination;
        // 停止loading畫面
        vm.isLoading = false
      })
    },
    getProduct (id) {
      let vm = this
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`
      // console.log(api);
      // 開啟loading效果
      vm.status.loadingItem = id
      this.$http.get(api).then((response) => {
        console.log('product', response.data)
        vm.product = response.data.product
        // 設定num 等於1，不然預設是編號==>為了用於select
        // 開啟modal
        $('#productModal').modal('show')
        // 關閉loading效果
        vm.status.loadingItem = ''
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
      this.$http.post(api, {data: cart}).then((response) => {
        console.log('cart', response.data)
        // 關閉loading效果
        vm.status.loadingItem = ''
        // 購物車列表
        vm.getCart()
        $('#productModal').modal('hide')
      })
    },
    // 購物車清單
    getCart () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`
      console.log(api)
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.cart = response.data.data.carts
        vm.finalTotal = response.data.data.final_total
        vm.total = response.data.data.total
        console.log('getCart', response.data)
        vm.isLoading = false
      })
    },
    // 刪除購物車項目
    removeCartItem (id) {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
      console.log(api)
      vm.isLoading = true
      vm.$http.delete(api).then((response) => {
        console.log(response.data)
        vm.isLoading = false
        vm.getCart()
      })
    },
    // 套用優惠卷
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
    // 建立訂單
    createOrder () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      console.log(api)
      const order = {
        user: vm.form
      }
      vm.isLoading = true
      // 欄位不可為空
      this.$validator.validate().then(result => {
        if (result) {
          vm.$http.post(api, {data: order}).then((response) => {
            console.log(response.data)
            // 跳到checkout頁面
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`)
            }
          })
        } else {
          console.log('欄位不完整')
        }
        vm.isLoading = false
      })
    }
  },
  created () {
    this.getProducts()
    this.$bus.$on('page:current', (currentPage) => {
      this.getProducts(currentPage)
    })
    this.getCart()
  }
}
</script>

<style scoped>
.small {
  width: 50px;
}
</style>
