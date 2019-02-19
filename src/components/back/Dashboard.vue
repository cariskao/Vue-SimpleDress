<template>
  <div>
  <!-- navbar -->
    <Navbar/>
    <Alert/>
    <div class="containe-fluid mt-5">
      <div class="row justify-content-center">
        <main role="main" class="col-10">
          <!-- //巢狀nest  -->
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Alert from './AlertMessage'
export default {
  components: { Navbar, Alert }
}
</script>
