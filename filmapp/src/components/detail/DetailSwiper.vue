// 详情页面轮播图
<template>
  <div class="swiper-container" :class="name">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  props: {
    perview: {
      type: Number,
      default: 1,
    },
    name: String,
    default: "wang",
  },
  mounted() {
    // console.log("mounted")
    new Swiper("." + this.name, {
      slidesPerView: this.perview,
      spaceBetween: 10,
      freeMode: true,
    });
  },
};
</script>
     