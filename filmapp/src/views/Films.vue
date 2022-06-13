<template>
  <div>
    <!-- 轮播图 -->
    <film-swiper :key="datalist.length">
      <film-swiper-item
        v-for="data in datalist"
        :key="data.id"
        class="filmswiperitem"
        ><img :src="data.imgUrl"
      /></film-swiper-item>
    </film-swiper>

    <!-- 电影头部 正在热映 即将上映 -->
    <film-header class="sticky"></film-header>
    <!-- 路由容器 根据嵌套路径,渲染嵌套组件-->
    <!-- 渲染film的chidlren的路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
//wepack
import filmSwiper from "@/components/films/FilmSwiper.vue";
import FilmHeader from "@/components/films/FilmHeader.vue";
import filmSwiperItem from "@/components/films/FilmSwiperItem.vue";
import axios from "axios";
export default {
  data() {
    return {
      datalist: [],
    };
  },
  mounted() {
    setTimeout(() => {
      // this.datalist = ["aaa", "bbb", "ccc"];
      axios.get("./banner.json").then((res) => {
        // console.log(res.data.banner);
        this.datalist = res.data.banner;
      });
    }, 1000);
  },
  components: {
    filmSwiper,
    filmSwiperItem,
    FilmHeader,
  },
};
</script>

<style lang="scss" scoped>
.filmswiperitem {
  img {
    width: 100%;
  }
}
.sticky {
  position: sticky;
  top: 0px;
  background: white;
  z-index: 2;
}
</style>
