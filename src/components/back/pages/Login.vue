<template>
  <div class="container-fuild bg-light">
    <Alert></Alert>
    <div class="row mr-0 ml-0 min-vh-100 align-items-center">
      <div class="col-md-6 text-center">
        <router-link to="/Home"><img src="../../../assets/images/logo.svg" class="img-fluid" alt="logo"></router-link>
      </div>
      <div class="col-md-6">
        <form class="form-signin" @submit.prevent="signin">
          <div class="form-head text-center">
            <h1 class="h3 mb-3 font-weight-normal">管理員登入</h1>
          </div>
          <div class="form-group">
            <label for="inputEmail">E-mail</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="user.username" required autofocus>
          </div>
          <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password"  v-model="user.password" required >
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <p class="mt-5 mb-3 text-muted text-center">&copy; Simple Dress</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../AlertMessage'
export default {
  components: {
    Alert
  },
  name: 'HelloWorld',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const api = `${process.env.APIPATH}/admin/signin`
      let vm = this
      // API 伺服器路徑
      // 所申請的 APIPath
      // 因為可能路徑會修改，所以利用環境變數來傳路api位址
      // console.log(api);
      this.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          console.log(response.data)
          vm.$router.push('/admin/products')
        } else {
          console.log('fail', response.data)
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    }
  }
}
</script>
<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
