<template>
  <div>
    <!-- loading 元件 -->
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-5">
      <button class="btn btn-primary mt-4" @click.prevent="openModal(true)">建立新的優惠卷</button>
    </div>
    <table class="table mt-4">
    <thead>
      <!-- width 分配 -->
      <th>名稱</th>
      <th width="200">折扣百分比</th>
      <th width="200">到期日</th>
      <th width="200">是否啟用</th>
      <th width="100">編輯</th>
      <th width="80">刪除</th>
    </thead>
    <tbody>
    <!-- eslint ：若v-for的元素為使用到，未出現警告 -->
      <tr v-for="(item) in coupons" :key="item.id">
        <td >{{ item.title }}</td>
        <td>{{ item.percent }}</td>
        <td>{{ item.due_date }}</td>
        <td>
        <!-- 判斷is_enabled是否存在，本題未啟用，所以data沒有回傳 -->
          <span v-if="item['is_enabled']" class="text-success">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <button class="btn btn-outline-primary btn-sm" @click.prevent="openModal(false, item)">編輯</button>
        </td>
        <td>
          <button class="btn btn-danger btn-sm"  @click.prevent="openDelModal(item)">刪除</button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- Modal -->
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ modalHead }}優惠卷</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title">
            </div>
            <div class="form-group">
              <label for="code">優惠碼</label>
              <input type="text" class="form-control" id="code" v-model="tempCoupon.code">
            </div>
            <div class="form-group">
              <label for="due">到期日</label>
              <input type="text" class="form-control" id="due" v-model="tempCoupon.due_date">
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input type="text" class="form-control" id="percent" v-model="tempCoupon.percent">
            </div>
            <div class="form-group">
              <div class="form-check">
               <!-- :true/false-value -->
                <input class="form-check-input" type="checkbox"
                 id="is_enabled" v-model="tempCoupon['is_enabled']"
                 :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click.prevent="updateCoupon">確認</button>
        </div>
      </div>
    </div>
  </div>
    <!-- del modal -->
  <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog"
   aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除優惠卷</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempCoupon.title }}</strong>
          優惠卷(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click.prevent="deleteCoupon">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      // 接收外部資料
      coupons: [],
      // Edit product
      tempCoupon: {},
      // 判斷是否是新物件
      isNew: false,
      // modal 標題更改
      modalHead: '新增',
      // 全螢幕Loading Boolen
      isLoading: false,
      // 上傳圖片loading
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    // 從外部server取得data
    getCoupons (page = 1) { // ES6 參數預設
      let vm = this
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`
      console.log(api)
      // 啟動Loading畫面
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.coupons = response.data.coupons
        // pagination
        vm.$bus.$emit('page:data', response.data.pagination)
        // vm.pagination = response.data.pagination;
        // 停止loading畫面
        vm.isLoading = false
      })
    },
    // 透過method取得資料後,才開啟modal。
    openModal (isNew, item) {
      if (isNew) { // 新增
        this.tempCoupon = {}
        this.isNew = true
        this.modalHead = '新增'
      } else { // 編輯
        // ES6 寫法，將item元素寫入一個空的obj，避免tempCoupon和item有參考。
        this.tempCoupon = Object.assign({}, item)
        this.isNew = false
        this.modalHead = '編輯'
        console.log(this.tempCoupon)
      }
      $('#couponModal').modal('show')
    },
    // 新增 或 編輯 商品
    updateCoupon () {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`
      let vm = this
      let httpMethod = 'post'
      if (!vm.isNew) { // 如果是編輯，api,方法 變更
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      console.log(api)
      // {data: vm.tempCoupon}統一data樣式
      this.$http[httpMethod](api, {data: vm.tempCoupon}).then((response) => {
        console.log(response.data)
        if (response.data.success) { // 新增成功
          $('#couponModal').modal('hide')
          vm.getCoupons()
        } else { // 新增失敗
          $('#couponModal').modal('hide')
          alert('新增商品失敗')
        }
      })
    },
    // 刪除商品
    deleteCoupon () {
      let vm = this
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      console.log(api)
      this.$http.delete(api, {data: vm.tempCoupon.id}).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          $('#deleteModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#deleteModal').modal('hide')
          alert('刪除商品失敗')
        }
      })
    },
    openDelModal (item) {
      this.tempCoupon = Object.assign({}, item)
      $('#deleteModal').modal('show')
      console.log(this.tempCoupon)
    }
  },
  created () {
    this.getCoupons()
    // 註冊事件on==> 接收pagination變動
    this.$bus.$on('page:current', (currentPage) => {
      this.getCoupons(currentPage)
    })
  }
}
</script>
