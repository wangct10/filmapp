<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <ul v-if="value">
      <li v-for="data in computedList" :key="data.cinemaId">
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
</template>
<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  computed: {
    // 过滤出影院名或者地址名
    computedList() {
      return this.$store.state.cinemaList.filter(
        (item) =>
          item.name.toUpperCase().includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase())
      );
    },
  },
  methods: {
    onSearch() {},
    onCancel() {
      this.$router.back();
    },
  },
  mounted() {
    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch("getCinemaData", this.$store.state.cityId);
    } else {
      console.log("缓存");
    }
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
</style>