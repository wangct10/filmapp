// 底部选项代码逻辑
<template>
  <footer>
    <ul>
      <!-- vue-router(3之前，包括3) -1- 声明式导航<router-link> -->
      <!-- <router-link to="/films" active-class="wangactive" tag="li"
        >电影</router-link
      >
      <router-link to="/cinemas" active-class="wangactive" tag="li"
        >影院</router-link
      >
      <router-link to="/center" class="wangactive1" tag="li">中心</router-link> -->

      <!-- vue-router（4） -2- 声明式导航<router-link> -->
      <!-- 该v-slot在vue-router底层代码已写好 -->
      <router-link to="/films" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'wangactive' : ''">
          <i class="iconfont icon-all"></i>
          <span>电影</span>
        </li>
      </router-link>

      <router-link to="/cinemas" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'wangactive' : ''">
          <i class="iconfont icon-comments"></i>
          <span>影院</span>
        </li>
      </router-link>

      <router-link to="/center" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'wangactive' : ''">
          <i class="iconfont icon-account"></i>
          <span>我的</span>
        </li>
      </router-link>
    </ul>
  </footer>
</template>
<script>
import "../assets/iconfont/iconfont.css";
export default {};
</script>

<style lang="scss" scoped>
.wangactive {
  color: red;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2.7222rem;
  background: white;
  z-index: 2; //z轴视角延伸
  ul {
    display: flex;
    li {
      flex: 1;
      line-height: 1.3889rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      i {
        font-size: 1.1111rem;
      }
      span {
        font-size: 16px;
      }
    }
  }
}
</style>