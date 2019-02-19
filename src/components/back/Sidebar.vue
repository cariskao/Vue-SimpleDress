<template>
  <div>
    <nav class="col-md-2 d-md-block bg-light sidebar">
      <div class="sidebar-sticky" id="navbarNav">
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-md-column mb-2">
          <li class="nav-item d-md-inline-block">
            <router-link class="nav-link" to="/admin/products">
              <i class="fas fa-box-open"></i> 產品列表
            </router-link>
          </li>
          <li class="nav-item d-md-inline-block">
            <router-link class="nav-link" to="/admin/orders">
              <i class="fab fa-wpforms"></i> 訂單列表
            </router-link>
          </li>
          <li class="nav-item d-md-inline-block">
            <router-link class="nav-link" to="/admin/coupon">
              <i class="fas fa-ticket-alt"></i> 優惠卷
            </router-link>
          </li>
        </ul>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-md-column mb-2">
          <li class="nav-item d-md-inline-block">
            <router-link class="nav-link" to="/customer_order">
              <i class="fas fa-cart-plus"></i> 模擬訂單
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style>
.nav-link:hover {
  color:gray;
}
</style>
