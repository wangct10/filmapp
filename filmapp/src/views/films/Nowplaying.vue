<template>
  <div class="box">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)"
      >
        <img :src="data.poster" />
        <div class="box">
          <div class="title">{{ data.name }}</div>
          <div class="content">
            <!-- 没有评分就隐藏 -->
            <div :class="data.grade ? '' : 'hidden'">
              观众评分：<span style="color: orange">{{ data.grade }}</span>
            </div>
            <!-- 此处用过滤器 过滤出data.actors数组里的所有name-->
            <div class="actors">主演：{{ data.actors | actorsFilter }}</div>
            <div>{{ data.nation }} |{{ data.runtime }}分钟</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import http from "@/util/http";
import Vue from "vue";
Vue.filter("actorsFilter", (data) => {
  if (data === undefined) return "暂无主演";
  // (data)是指 data.actors
  // map映射后的新数组 映射出actors（item）里的数组的所有名字actors.name（item.name)
  // console.log(data.map((item) => item.name));
  return data.map((item) => item.name).join(" ");
});
export default {
  data() {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0,
    };
  },

  mounted() {
    //https://m.maizuo.com/gateway?cityId=120100&pageNum=1&pageSize=10&type=1&k=8111504
    // http已封装axios
    http({
      url: `gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=5196770`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      console.log(res.data.data);
      this.datalist = res.data.data.films;
      this.total = res.data.data.total;
    });
  },

  methods: {
    onLoad() {
      console.log("到底了");
      // 总长度匹配，禁用懒加载 所以要加 && this.total !== 0
      // 如果加载完毕的数组长度等于后端数组总长度，到底了！停止反复激发loading=true
      if (this.datalist.length === this.total && this.total !== 0) {
        console.log("没了");
        this.finished = true;
        return;
      }

      this.current++;
      http({
        url: `gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=5196770`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        // console.log(res.data.data.films);
        // ES6的展开运算符 合并数组有用
        this.datalist = [...this.datalist, ...res.data.data.films];
        console.log(this.datalist);

        //当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true
        // 数据更新完毕后，将 loading 设置成 false 即可
        this.loading = false;
      });
    },
    handleChangePage(id) {
      console.log(id);
      // 编程式导航
      // bom写法，判断不了路由模式
      // location.href = "#/detail";
      // push的意思 往一个历史记录栈 添加一条记录，回退的时候 就知道自己从哪来的，好返回 replace则不能
      // push replace 这些 vue router底层会识别路由模式
      // 通过路径跳转
      // this.$router.push(`/detail/${id}`);

      // 通过命名路由跳转
      this.$router.push({
        name: "wangDetail",
        params: {
          id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// .box {
//   border: 1px solid black;
// }
.van-list {
  .van-cell {
    overflow: hidden;
    padding: 0.8333rem;
    img {
      width: 3.6667rem;
      float: left;
      margin-right: 10px;
    }

    .titile {
      font-size: 16px;
      height: 1.2222rem;
    }
    .content {
      font-size: 13px;
      color: gray;

      line-height: 1.1111rem;
      .actors {
        white-space: nowrap;
        overflow: hidden;
        // 文本溢出省略号
        text-overflow: ellipsis;
        width: 11.1111rem;
      }
      .hidden {
        visibility: hidden;
      }
    }
  }
}
</style>