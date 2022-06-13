<template>
  <!-- 如果filmInfo有内容 则动态创建 -->
  <div v-if="filmInfo">
    <!-- v-scroll v-指令 -->
    <detail-header v-scroll="50">
      {{ filmInfo.name }}
    </detail-header>
    <!-- <img :src="filmInfo.poster" /> -->
    <!-- 动态绑定后端动态数据 -->
    <!-- 字符串和变量之间用 "+"拼接 + filmInfo.poster +-->
    <div
      :style="{
        backgroundImage: 'url(' + filmInfo.poster + ')',
      }"
      class="poster"
    ></div>
    <div class="content">
      <div>{{ filmInfo.name }}</div>
      <div class="content-bottom">
        <div class="detail-text">{{ filmInfo.category }}</div>
        <div class="detail-text">
          {{ filmInfo.premiereAt | dateFilter }}上映
        </div>
        <!--filmInfo.premiereAt时间戳 -->
        <div class="detail-text">
          {{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟
        </div>
        <div
          class="detail-text"
          style="line-height: 15px"
          :class="isHidden ? 'hidden' : ''"
        >
          {{ filmInfo.synopsis }}
        </div>
        <div style="text-align: center">
          <!-- 在哪引入的iconfont？？ -->
          <!-- 在全局app页面引入了部件tabbar  tabbar里引入了iconfont.css 相当于全局引入iconfont.css -->
          <i
            class="iconfont"
            @click="isHidden = !isHidden"
            :class="isHidden ? 'icon-moreunfold' : 'icon-less'"
          ></i>
        </div>
      </div>

      <!-- 演职人员 -->
      <div>
        <div>演职人员</div>
        <detail-swiper :perview="3.5" name="actors">
          <detail-swiper-item
            v-for="(data, index) in filmInfo.actors"
            :key="index"
          >
            <div
              :style="{
                backgroundImage: 'url(' + data.avatarAddress + ')',
              }"
              class="avatar"
            ></div>

            <div style="text-align: center; font-size: 12px; padding-top: 10px">
              {{ data.name }}
            </div>
            <div
              style="
                text-align: center;
                font-size: 13px;
                color: gray;
                height: 1.3889rem;
                line-height: 1.3889rem;
              "
            >
              {{ data.role }}
            </div>
          </detail-swiper-item>
        </detail-swiper>
      </div>

      <!-- 剧照 -->
      <div>
        <div>剧照</div>
        <detail-swiper :perview="2" name="photos">
          <detail-swiper-item
            v-for="(data, index) in filmInfo.photos"
            :key="index"
          >
            <div
              :style="{
                backgroundImage: 'url(' + data + ')',
              }"
              class="avatar"
              @click="handlePreview(index)"
            ></div>

            <div style="text-align: center; font-size: 12px; padding-top: 10px">
              {{ data.name }}
            </div>
            <div
              style="
                text-align: center;
                font-size: 13px;
                color: gray;
                height: 1.3889rem;
                line-height: 1.3889rem;
              "
            >
              {{ data.role }}
            </div>
          </detail-swiper-item>
        </detail-swiper>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http";
// 时间戳转化格式 得下载安装npm i --save moment
import moment from "moment";
import Vue from "vue";
import detailSwiper from "@/components/detail/DetailSwiper";
import detailSwiperItem from "@/components/detail/DetailSwiperItem";
import detailHeader from "@/components/detail/DetailHeader";
import { ImagePreview } from "vant";
import obj from "@/util/mixinObj";

// 时间标准格式
// moment.locale("zh-cn"); //设置成中文
// console.log(moment().format("YYYY-MM-DD"));

Vue.filter("dateFilter", (date) => {
  //数据给的是秒 时间戳一般是以毫秒为单位 得date * 1000 秒转化毫秒
  return moment(date * 1000).format("YYYY-MM-DD");
});

// 指令操作底层dom
Vue.directive("scroll", {
  inserted(el, binding) {
    console.log(el);
    el.style.display = "none";

    window.onscroll = () => {
      console.log("scroll");
      if (
        //  window.onscroll=function(){
        //      console.log(document.documentElement.scrollTop)//有<!DOCTYPE html>使用该代码
        //  }

        //  window.onscroll=function(){
        //      console.log(document.body.scrollTop)//没有<!DOCTYPE html>使用该代码
        //  }
        (document.documentElement.scrollTop || document.body.scrollTop) >
        binding.value
      ) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    };
  },
  // 销毁执行的
  unbind() {
    window.onscroll = null;
  },
});

export default {
  mixins: [obj], //混入
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader,
  },
  data() {
    return {
      filmInfo: null,
      isHidden: true,
    };
  },
  methods: {
    handlePreview(index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true, //是否显示关闭图标
        closeIconPosition: "top-left", //关闭图标位置
      });
    },
  },
  mounted() {
    // 当前匹配的路由
    console.log("created", this.$route.params.id);
    //  $route，它是一条路由（可理解为当前页面的路由信息
    // console.log("created", this.$route);
    // $router，是一组路由。$router可以理解为一个容器，或者说一种机制，它管理了一组 $route，跳转路由用router。
    // console.log("created", this.$router);

    // axios利用id发请求到详情接口，获取详细数据，布局页面
    http({
      url: `gateway?filmId=${this.$route.params.id}&k=6826809`,
      headers: {
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      // console.log(res);
      this.filmInfo = res.data.data.film;
    });
  },
  // mounted() {
  //   // console.log();
  //   window.onscroll = () => {
  //     console.log("scroll");
  //     if (
  //       (document.documentElement.scrollTop || document.body.scrollTop) > 50
  //     ) {
  //       console.log("显示");
  //     } else {
  //       console.log("隐藏");
  //     }
  //   };
  // },
  // destroyed() {
  //   window.onscroll = null;
  // },
};
</script>
<style lang="scss" scoped>
.poster {
  width: 100%;
  height: 11.6667rem;
  background-position: center;
  // 用来调整背景图像的尺寸大小
  background-size: cover; // 会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。
}
.content {
  padding: 0.6667rem 0.8333rem 0.8333rem 0.8333rem;
  .detail-text {
    color: #797d82;
    font-size: 13px;
    margin-top: 0.2222rem;
  }
}
.hidden {
  overflow: hidden;
  height: 1.6667rem;
}
.avatar {
  width: 100%;
  height: 4.7222rem;
  background-position: center;
  background-size: cover;
}
</style>
