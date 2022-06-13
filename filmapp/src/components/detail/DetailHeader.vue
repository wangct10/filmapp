<template>
  <div class="header">
    <i class="iconfont icon-back" @click="handleBack"></i>
    <slot></slot>
  </div>
</template>
<script>
export default {
  methods: {
    handleBack() {
      this.$router.back(); //返回上一个页面
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.4444rem;
  line-height: 2.4444rem;
  background: white;
  text-align: center;

  i {
    font-size: 1.6667rem;
    position: fixed;
    left: 0;
    top: 0;
    height: 2.4444rem;
    line-height: 2.4444rem;
  }
}
</style>