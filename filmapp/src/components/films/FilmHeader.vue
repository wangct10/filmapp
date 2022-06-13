// 正在热映 即将上映选项代码逻辑
<template>
  <ul>
    <router-link to="/films/nowplaying" custom v-slot="{ navigate, isActive }">
      <li @click="navigate">
        <span :class="isActive ? 'wangactive' : ''">正在热映</span>
      </li>
    </router-link>

    <router-link to="/films/Comingsoon" custom v-slot="{ navigate, isActive }">
      <li @click="navigate">
        <span :class="isActive ? 'wangactive' : ''" s>即将上映</span>
      </li>
    </router-link>
  </ul>
</template>


 <style lang="scss" scoped>
ul {
  display: flex;
  height: 2.7222rem;
  line-height: 2.7222rem;
  li {
    flex: 1;
    text-align: center;
  }
}
.wangactive {
  color: red;
  border-bottom: 2px solid red;
}
</style>