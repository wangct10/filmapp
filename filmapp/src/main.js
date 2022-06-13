import Vue from 'vue'//Es6导入方式
import App from './App.vue'//导入根组件App
import router from './router'//导入路由
import store from './store'///用store导入vuex

Vue.config.productionTip = false

new Vue({
  router: router,// this.$router===router
  store,// this.$store===store
  render: h => h(App)
}).$mount('#app')
