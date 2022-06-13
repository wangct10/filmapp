<template>
  <div><van-button type="primary">主要按钮</van-button></div>
</template>
<script>
export default {
  //路由生命周期 组件路由拦截
  // 在渲染该组件的对应路由被confirm前调用
  // 不能获取组件实例this
  // 因为当守卫执行前，组件示例还没被创建
  // beforeRouteEnter(to, from, next) {
  //   if (localStorage.getItem("token")) {
  //     next();
  //   } else {
  //     next({
  //       path: "/login",
  //       //localhost:8080/#/login?redirect=%2Fcenter
  //       //  多了query字段 ?redirect=%2Fcenter
  //       // to.fullPath ==='/center'
  //       query: { redirect: to.fullPath },
  //     });
  //   }
  // },
};
</script>