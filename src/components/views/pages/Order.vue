<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container my-5">
      <h2 class="text-center">結帳</h2>
      <div class="row my-3">
        <div class="col-md-4 text-center">
          <div class="alert alert-success rounded-pill">Step 1:請填寫基本資料</div>
        </div>
        <div class="col-md-4 text-center">
          <div class="alert alert-white rounded-pill">Step 2:金流付款</div>
        </div>
        <div class="col-md-4 text-center">
          <div class="alert alert-white rounded-pill">Step 3:完成</div>
        </div>
      </div>
      <div id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h3 class="mb-0">
              <button class="btn btn-link text-center" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                顯示購物車細節
              </button>
            </h3>
          </div>
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-sm table-striped">
                  <tbody>
                    <tr>
                      <th>商品名稱</th>
                      <th>數量</th>
                      <th class="text-center">小計</th>
                    </tr>
                    <tr v-for="item in cart" :key="item.id">
                      <td class="text-left">
                        <a href="#" @click.prevent="productRoute(item.product_id)" class="btn btn-link">
                          <img class="small mr-3" :src="item.product.imageUrl" alt="">
                          <div>{{ item.product.title }}</div>
                        </a>
                        <div class="text-success pl-3" v-if="item.coupon">
                          已套用優惠卷
                        </div>
                      </td>
                      <td class="pt-2">{{ item.qty }}{{ item.product.unit }}</td>
                      <td class="pt-2 text-right text-danger">{{ item.final_total | currency }}</td>
                    </tr>
                    <tr>
                      <td colspan="2" class="text-right">合計</td>
                      <td class="text-right text-danger">{{ finalTotal | currency }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 class="text-center mt-5">訂購人資訊</h3>
      <div class="row justify-content-center">
        <div class="col-md-8 border p-4">
          <form action=""  @submit.prevent="createOrder()">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="name">姓名 Name</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="請輸入真實姓名" v-model="form.user.name"
                v-validate="'required'" :class="{'is-invalid':errors.has('name')}">
                <div class="text-danger" v-if="errors.has('name')">姓名欄不得留空</div>
              </div>
              <div class="form-group col-md-6">
                <label for="tel">電話</label>
                <input type="text" class="form-control" name="tel" id="tel" placeholder="請輸入聯絡電話" v-model="form.user.tel"
                v-validate="'required'" :class="{'is-invalid':errors.has('tel')}">
                <div class="text-danger" v-if="errors.has('tel')">電話欄不得留空</div>
              </div>
              <div class="form-group col-md-12">
                <label for="email">E-mail</label>
                <input type="text" class="form-control" id="email" name="email" placeholder="請輸入電子信箱" v-model="form.user.email" v-validate="'required|email'"
                :class="{'is-invalid':errors.first('email')}">
                <div class="text-danger" v-if="errors.first('email')">{{ errors.first('email') }}</div>
              </div>
              <div class="form-group col-md">
                <label for="address">地址 Address</label>
                <input type="text" class="form-control" id="address" name="address" placeholder="請輸入地址" v-model="form.user.address" v-validate="'required'">
                <div class="text-danger" v-if="errors.has('address')">地址欄不得留空</div>
              </div>
            </div>
            <div class="text-right">
              <router-link class="btn btn-secondary" to="/productmenu">繼續選購</router-link>
              <button class="btn btn-primary">確認送出</button>
            </div>
          </form>
        </div>
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
      isLoading: false,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: '這是留言'
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
        vm.status.loadingItem = id
      })
    },
    // 建立訂單
    createOrder () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`
      console.log('checkout', api)
      const order = {
        user: vm.form
      }
      vm.isLoading = true
      // 欄位不可為空
      vm.$validator.validate().then(result => {
        console.log(result)
        if (result) {
          vm.$http.post(api, {data: order}).then((response) => {
            console.log(response.data)
            if (response.data.success) { // 跳到checkout頁面
              vm.$router.push(`/checkout/${response.data.orderId}`)
            }
          })
        } else {
          console.log('欄位不完整')
        }
        vm.isLoading = false
      })
    },
    productRoute (id) {
      const vm = this
      vm.$router.push(`/product/${id}`)
    }
  },
  computed: {
    cities () {
      let cityArr = []
      switch (this.country) {
        case '台灣(中華民國)':
          cityArr = ['台北', '高雄']
          break
        case '日本':
          cityArr = ['東京', '大阪']
          break
        case '韓國':
          cityArr = ['首爾', '釜山']
          break
        case '德國':
          cityArr = ['柏林', '都柏林']
          break
        default:
          cityArr = ['紐約', '洛杉磯']
          break
      }
      return cityArr
    }
  },
  created () {
    const vm = this
    vm.getCart()
    vm.$bus.$on('newCart', function () {
      vm.getCart()
    })
  }
}
</script>

<style scoped>
  .small {
    width: 50px;
  }
</style>
