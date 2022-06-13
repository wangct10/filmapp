import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films.vue'
import Nowplaying from '@/views/films/Nowplaying.vue'
import Comingsoon from '@/views/films/Comingsoon.vue'
import Cinemas from '@/views/Cinemas.vue'
import City from '@/views/City.vue'
import Search from '@/views/Search.vue'
// import Center from '@/views/Center.vue'
// import Order from '@/views/Order.vue'
import Detail from '@/views/Detail.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)//注册路由插件,两个全局router-view router-link

// 配置表
const routes = [
  {
    path: "/films",
    component: Films,
    // 嵌套路由
    children: [
      {
        path: "/films/nowplaying",
        component: Nowplaying
      },
      {
        path: "/films/comingsoon",
        component: Comingsoon
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    name: "wangDetail",//命名路由
    path: '/detail/:id',//动态二级路由
    component: Detail
  },
  {
    path: "/cinemas",
    component: Cinemas
  },
  {
    path: "/city",
    component: City
  },
  {
    path: "/cinemas/search",
    component: Search
  },
  {
    path: "/center",
    component: () => import("@/views/Center"),//懒加载 vue异步组件加载
    meta: {
      required: true
    },
    // 局部拦截 路由独享拦截
    // beforeEnter: (to, from, next) => {
    //   if (localStorage.getItem("token")) {
    //     next()
    //   } else {
    //     next({
    //       path: "/login",
    //       //localhost:8080/#/login?redirect=%2Fcenter
    //       //  多了query字段 ?redirect=%2Fcenter
    //       // to.fullPath ==='/center'
    //       query: { redirect: to.fullPath },
    //     });
    //   }
    // }
  },
  {
    path: "/order",
    component: () => import("@/views/Order"),//懒加载
    // meta路由元信息
    meta: {
      required: true
    }
  },
  {
    path: "/login",
    component: Login,

  },
  // 重定向
  {
    path: '*',
    redirect: '/films'
  },
]

const router = new VueRouter({
  mode: 'hash',
  // hash #/home
  // history /home
  // 路径url没有# 很干净好看
  // history.pushState 切换
  // window.onpopstate 监听路径的切换

  routes
  //routes相当于routes：routes 是个缩写
})

// 全局拦截（守卫）
router.beforeEach((to, from, next) => {
  // to是你已经进入页面的后端数据
  console.log(to);
  // from是你从哪里来的页面后端数据
  console.log(from);

  console.log(next);
  // to.meta.isWangRequired == true
  if (to.meta.required) {
    // 判断本地存储中是否有token 如果没有则跳转登录页面
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: "/login",
        //localhost:8080/#/login?redirect=%2Fcenter
        //  多了query字段 ?redirect=%2Fcenter
        // to.fullPath ==='/center'
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})
export default router
