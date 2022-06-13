<template>
  <div class="city">
    <van-index-bar :index-list="computedList" @select="handleChange">
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell
          :title="item.name"
          v-for="item in data.list"
          :key="item.cityId"
          @click="handleClick(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import http from "@/util/http";
import { Toast } from "vant";
import obj from "@/util/mixinObj";
export default {
  mixins: [obj], //混入
  data() {
    return {
      cityList: [],
    };
  },
  computed: {
    computedList() {
      return this.cityList.map((item) => item.type);
    },
  },

  mounted() {
    http({
      url: `/gateway?k=9790825`,
      headers: {
        "X-Host": "mall.film-ticket.city.list",
      },
    }).then((res) => {
      // console.log(res.data.data.cities);
      this.cityList = this.renderCity(res.data.data.cities);
      console.log(this.cityList);
      // 1.316条==>A，B进行分组
      // 2.利用转换后的数组，结合组件库进行渲染页面
    });
  },
  methods: {
    handleChange(data) {
      // console.log("change", data);
      // 轻提示
      Toast(data);
    },
    renderCity(list) {
      // console.log(list);
      // 所有城市拼音开头按字母筛选好的城市
      var cityList = [];
      // 所有字母大写
      var letterList = [];
      // 利用ASCII码 65是A 97是a
      for (var i = 65; i < 91; i++) {
        // console.log(String.fromCharCode(i));
        // 设置所有26个字母
        letterList.push(String.fromCharCode(i));
      }
      // console.log(letterList);

      // 遍历所有26个字母
      letterList.forEach((Letter) => {
        // 过滤出符合每个字母开头的所有城市
        var newList = list.filter(
          // 把字符串的第一个字符换成大写
          (item) => item.pinyin.substring(0, 1).toUpperCase() === Letter
        );
        // console.log(newList);

        newList.length > 0 &&
          cityList.push({
            type: Letter,
            list: newList,
          });
      });
      // console.log(cityList);
      return cityList;
    },
    handleClick(item) {
      console.log(item.name, item.cityId);

      // 传统的多页面方案
      // 1.location.href = "#/cinemas?cityname=" + item.name;
      // 2.cookie,localStorage

      // 单页面方案，
      // 1.中间人模式
      // 2.bus事件总线 $on,s$emit

      // vuex-状态管理模式
      // console.log(this.$store.state); //原先this.$store.state默认为天津
      // this.$store.state.cityName = item.name;
      // console.log(this.$store.state.cityName);

      // 私有的字段，提供公开的属性
      this.$store.commit("changeCityName", item.name);
      this.$store.commit("changeCityId", item.cityId);
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" >
.van-toast--html,
.van-toast--text {
  min-width: 1.6667rem;
}
</style>