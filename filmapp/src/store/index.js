import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/util/http";
import createPersistedState from "vuex-persistedstate";//引入持久化
Vue.use(Vuex)

export default new Vuex.Store({
  // vuex持久化
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  }
  )],

  // state公共状态
  state: {
    cityId: '120100',
    cityName: '天津',
    cinemaList: [],
    isTabbarShow: true
  },
  // 支持异步和同步
  actions: {
    getCinemaData(store, cityId) {
      // return能得到then
      return http({
        url: `gateway?cityId=${cityId}&ticketFlag=1&k=9956920`,
        headers: {
          "X-Host": "mall.film-ticket.cinema.list",
        },
      }).then((res) => {
        // console.log(res.data.data.cinemas);
        store.commit('changeCinemaData', res.data.data.cinemas)
      });
    }
  },
  //  mutations是唯一一种方式来修改state中的状态的;
  // 统一管理，被devtools记录状态的修改
  // 只能支持同步
  mutations: {
    // 第一个参数state为对象，第二个为cityName的value
    changeCityName(state, cityName) {
      // 接受存储的值，将值赋值给状态的数组
      state.cityName = cityName
      console.log(cityName);
    },
    changeCityId(state, cityId) {
      state.cityId = cityId
      console.log(state.cityId);
    },
    changeCinemaData(state, data) {
      state.cinemaList = data
      console.log(state.cinemaList);
    },
    clearCinema(state) {
      state.cinemaList = []
    },
    show(state) {
      state.isTabbarShow = true
    },
    hide(state) {
      state.isTabbarShow = false
    }
  },

  modules: {
  }
})

// vuex管理保存公共状态，（分散在各个组件内的状态，统一管理）

// 注意
// vuex 默认是管理在内存，一刷新页面，公共状态就丢失了。
// vuex 持久化-todo

// vuex项目应用
// 1.非父子的通信
// 2.后端数据的缓存快照，减少重复数据请求，减轻服务器压力，提高用户体验
