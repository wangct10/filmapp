<template>
  <div>
    <van-nav-bar
      title="影院"
      ref="navbar"
      @click-left="handleLeft"
      @click-right="handleRight"
    >
      <template #left> {{ cityName }}<van-icon name="arrow-down" /> </template>
      <template #right>
        <van-icon name="search" size="32" color="black" />
      </template>
    </van-nav-bar>

    <div
      class="box"
      :style="{
        height: height,
      }"
    >
      <ul>
        <li v-for="data in cinemaList" :key="data.cinemaId">
          <div class="left">
            <div class="cinema_name">{{ data.name }}</div>
            <div class="cinema_address">{{ data.address }}</div>
          </div>

          <div class="right cinema_name">
            <div style="color: red">￥{{ data.lowPrice / 100 }}起</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BetterScroll from "better-scroll";
import { mapState, mapActions, mapMutations } from "vuex"; //export {mapstate}
console.log(mapState(["cinemaList"]));
export default {
  data() {
    return {
      height: "0px",
    };
  },
  computed: {
    // cinemaList: function () {
    //   return this.$store.state.cinemaList;
    // },
    // vuex的新写法 注意要引入import
    ...mapState(["cinemaList", "cityId", "cityName"]),
  },
  mounted() {
    // 获取顶部导航栏的高度
    console.log(this.$refs.navbar.$el.offsetHeight);
    //动态结算高度
    // 获取的可视区域的高度-顶部导航栏的高度-底部选项卡高度
    this.height =
      document.documentElement.clientHeight -
      this.$refs.navbar.$el.offsetHeight -
      document.querySelector("footer").offsetHeight +
      "px";
    // 获取切换城市后的新dom 避免底选项卡没有高度的bug
    this.$nextTick(() => {
      this.height =
        document.documentElement.clientHeight -
        this.$refs.navbar.$el.offsetHeight -
        document.querySelector("footer").offsetHeight +
        "px";
    });
    // vuex分发
    if (this.cinemaList.length === 0) {
      // 如果影院数组长度为0，就获取默认城市id，根据城市id获取影院列表，并且打开滑动数据功能
      this.getCinemaData(this.cityId)
        // 该res触发index.js中getCinemaData内函数
        .then((res) => {
          this.$nextTick(() => {
            // 在box范围内可以滑动数据
            new BetterScroll(".box", {
              // 显示滚动条
              scrollbar: {
                fade: true,
              },
            });
          });
        });
    } else {
      // 如果不为0，就获取缓存，打开滑动数据功能
      console.log("缓存");
      this.$nextTick(() => {
        // 在box范围内可以滑动数据
        new BetterScroll(".box", {
          // 显示滚动条
          scrollbar: {
            fade: true,
          },
        });
      });
    }

    // http({
    //   url: `gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=9956920`,
    //   headers: {
    //     "X-Host": "mall.film-ticket.cinema.list",
    //   },
    // }).then((res) => {
    //   console.log(res.data.data.cinemas);
    //   this.cinemasList = res.data.data.cinemas;

    //   // console.log(document.getElementsByTagName("li").length); //得出的是下面三个选项卡的长度
    //   // console.log(document.getElementsByTagName("li"));

    //   // $nextTick获取更新后的dom
    //   this.$nextTick(() => {
    //     // console.log(document.getElementsByTagName("li").length);//获取的更新后dom的115个长度

    //     // 在box范围内可以滑动数据
    //     new BetterScroll(".box", {
    //       // 显示滚动条
    //       scrollbar: {
    //         fade: true,
    //       },
    //     });
    //   });
    // });
  },
  methods: {
    // vuex新写法
    ...mapActions(["getCinemaData"]),
    ...mapMutations(["clearCinema"]),
    handleLeft() {
      // console.log("left");
      this.$router.push("/city");

      // 清空cinemaList 清除缓存
      // this.$store.commit("clearCinema");
      this.clearCinema();
    },
    handleRight() {
      this.$router.push("/cinemas/search");
    },
  },
};
</script>
<style lang="scss" scoped>
li {
  padding: 0.8333rem;
  display: flex;
  justify-content: space-between;
  .left {
    width: 11.7778rem;
  }
  .cinema_address {
    color: gray;
    font-size: 12px;
    margin-top: 0.2778rem;
    white-space: nowrap;
    overflow: hidden;
    // 文本溢出省略号
    text-overflow: ellipsis;
  }
  .cinema_name {
    font-size: 15px;
  }
}
.box {
  // height: 34.3333rem;
  overflow: hidden;
  position: relative; // 修正滚动条位置 滚动条只能在范围内拖动 不会超出范围
}
</style>

