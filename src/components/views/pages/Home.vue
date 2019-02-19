<template>
  <div class="my-4">
    <div class="shortCut">
      <a href="#news" class="scrollTop"><i class="fab fa-neos mr-3"></i>最新消息</a>
      <a href="#onSale" class="scrollTop"><i class="far fa-clock mr-3"></i>限時優惠</a>
      <a href="#brandStory" class="scrollTop"><i class="fas fa-info mr-4"></i>品牌故事</a>
    </div>
    <!-- carousel -->
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="true">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" id="news">
        <div class="carousel-item active">
          <img src="https://net.wimg.tw/files/1/adpics/20190201100132_67.jpg?v=19117" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://net.wimg.tw/files/1/adpics/20190130174951_43.jpg?v=19117" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://net.wimg.tw/files/1/adpics/20190130173419_59.jpg?v=19117" class="d-block w-100" alt="...">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    <section id="onSale">
      <img id="lookbook_1" class="img-fluid" src="https://net.wimg.tw/files/1/lookbooks/20190131142020_27.jpg?v=19117" alt="sale1">
      <img id="lookbook_2" class="img-fluid" src="https://net.wimg.tw/files/1/lookbooks/20190130114647_95.jpg?v=19117" alt="sale2">
    </section>
    <section class="brandStory my-4 bg-light" id="brandStory">
      <div class="row">
        <div class="col-md-6">
          <img class="img-fluid animated" src="../../../assets/images/logo.svg" alt="">
        </div>
        <div class="col-md-6 animated">
          <h3 class="text-center my-3">品牌故事 About SimpleDress</h3>
          <p>Simple Dress創立於1996年，隨著世界的脈動一起呼吸。</p>
          <p>如何滿足我們的客戶，是SIMPLE不段努力學習的目標。好的品質、合理的價格、貼心的服務，一直是SIMPLE的基本精神。近年來，奢侈品牌的平民化，使得一般人可以享受如貴族般的生活品味，以及所帶來的歡愉和滿足；時下年輕人更喜歡把平價商品及奢華商品混搭出不同的風格，許多有趣且富創意的街頭流行文化因此產生，這些創意更時常成為奢華品牌的設計靈感來源。</p>
        </div>
      </div>
    </section>
    <a class="scrollup" href="#">
      <i class="fas fa-arrow-circle-up fa-3x"></i>
    </a>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data () {
    return {
      isLoading: 'false'
    }
  },
  created () {
    $(document).ready(function (e) {
      $('.scrollTop').click(function (e) { // shortcut
        e.preventDefault()
        let target = $(this).attr('href')
        let targetPos = $(target).offset().top
        $('html, body').animate({ scrollTop: targetPos }, 1000)
      })
      $(window).scroll(function () {
        let scrollPos = $(window).scrollTop()
        let windowHeight = $(window).height()
        if (scrollPos > 300) { // goTop
          $('.scrollup').addClass('visible')
        } else {
          $('.scrollup').removeClass('visible')
        }
        $('.animated').each(function () { // BrandStory
          let thisPos = $(this).offset().top
          if ((scrollPos + windowHeight) >= thisPos) {
            $(this).addClass('fadeIn')
          }
        })
        $('.scrollTop').each(function () {
          let target = $(this).attr('href')
          let targetPos = $(target).offset().top
          console.log(targetPos)
          let targetHeight = $(target).outerHeight()
          if (targetPos - 200 < scrollPos && (targetPos + targetHeight) > scrollPos) {
            $('.scrollTop').removeClass('active')
            $(this).addClass('active')
          } else {
            $(this).removeClass('active')
          }
        })
      })
      $('.carousel').carousel({
        interval: 3000
      })
      $('.scrollup').click(function (e) {
        e.preventDefault()
        $('html, body').animate({
          scrollTop: 0
        }, 600)
      })
    })
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/mixin";
* {
  outline: none;
}
.shortCut {
  position: fixed;
  top: 80px;
  left: 10px;
  z-index: 10;
  a:hover {
    color: gray;
  }
  a.active {
    color: gray;
  }
  @include ipad() {
    display: none;
  }
}
.brandStory {
  padding: 20px;
}
.scrollTop {
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: rgb(199, 171, 58);
  margin-right: 10px;
}
.animated {
  opacity: 0;
  -webkit-transition: all 1.5s;
  -o-transition: all 1.5s;
  transition: all 1.5s;
  -webkit-transform: translateY(50px);
  -ms-transform: translateY(50px);
  transform: translateY(50px);
}
.fadeIn {
  opacity: 1;
  -webkit-transform: translateY(0px);
  -ms-transform: translateY(0px);
  transform: translateY(0px);
}
.scrollup {
  position: fixed;
  bottom: 50px;
  right: 10px;
  text-decoration: none;
  color: gray;
  display: block;
  opacity: 0;
  transition: opacity 1s ease-in;
}
.scrollup.visible {
  opacity: 1;
}
</style>
