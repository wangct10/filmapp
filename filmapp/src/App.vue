<template>
  <div>
    <!--全局底部选项 -->
    <tabbar ref="mytabbar" v-show="$store.state.isTabbarShow"></tabbar>
    <!-- 路由容器  根据嵌套路径,渲染嵌套组件 渲染所有路由-->
    <!-- 设置section因为会被底部选项覆盖 设置底内边距 -->
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import tabbar from "@/components/Tabbar.vue";

Vue.use(Vant); //Vue.component(全局定义组件)
export default {
  data() {
    return {};
  },
  mounted() {
    //offsetHeight clientHeight表示网页的高度
    console.log(this.$refs.mytabbar.$el.offsetHeight);
  },
  components: {
    tabbar,
  },
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
ul {
  list-style: none;
}
section {
  padding-bottom: 2.7778rem;
}
</style>
