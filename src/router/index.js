import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home"
import Home1 from "../views/Home1"
import store from "../store"

import axios from "../axios";
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: "首页"
        },
        component: () => import('@/views/Index.vue')
      },
      {
        path: '/list',
        name: 'List',
        meta: {
          title: "查看销售渠道列表"
        },
        component: () => import('@/views/module/List.vue')
      },
      {
        path: '/addRecord',
        name: 'AddRecord',
        meta: {
          title: "添加拜访信息"
        },
        component: () => import('@/views/module/AddRecord.vue')
      },
      {
        path: '/findPath',
        name: 'FindPath',
        meta: {
          title: "规划拜访路线"
        },
        component: () => import('@/views/module/FindPath.vue')
      },
      {
        path: '/watchRecord',
        name: 'WatchRecord',
        meta: {
          title: "查看自己的拜访记录"
        },
        component: () => import('@/views/module/WatchRecord.vue')
      },
      {
        path: '/addChannel',
        name: 'AddChannel',
        meta: {
          title: "添加销售渠道"
        },
        component: () => import('@/views/module/AddChannel.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Home1',
    component: Home1,
    children: [
      {
        path: '/index1',
        name: 'Index1',
        meta: {
          title: "首页"
        },
        component: () => import('@/views/Index1.vue')
      },
      {
        path: '/list1',
        name: 'List1',
        meta: {
          title: "查看销售渠道列表"
        },
        component: () => import('@/views/module/List.vue')
      },
      {
        path: '/statistic',
        name: 'Statistic',
        meta: {
          title: "查看统计信息"
        },
        component: () => import('@/views/module/Statistic.vue')
      },
      {
        path: '/rank',
        name: 'Rank',
        meta: {
          title: "查看排名"
        },
        component: () => import('@/views/module/Rank.vue')
      },
      {
        path: '/watchStaffsRecord',
        name: 'WatchStaffsRecord',
        meta: {
          title: "查看经理的拜访记录"
        },
        component: () => import('@/views/module/WatchStaffsRecord.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to, from, next) => {
//   let hasRoute = store.state.menus.hasRoute
//   let menus = store.state.menus.menuList
//   let token = localStorage.getItem("token")
//   if (to.path == '/login') {
//     console.log("login!!!!!!!!!!!")
//     next()
//   }
//   else if (!token) {
//     console.log("还没有token！！！")
//     next({path: "/login"})
//   }else if (token && !hasRoute) {
//     let newRoutes = router.options.routes;
//     axios.get("/sys/menu/nav", {headers:{
//         Authorization: localStorage.getItem("token")
//       }}).then(res => {
//       console.log(res.data.data)
//       store.commit("setMenuList", res.data.data.nav)
//       store.commit("setPermList", res.data.data.authoritys)
//       res.data.data.nav.forEach(menu => {
//             let route = menuToRoute(menu)
//             if(route) {
//               newRoutes[0].children.push(route)
//               // router.addRoute(route)
//             }
//       })
//       console.log("oldRoutes---------------")
//       // console.log(newRoutes)
//       router.addRoutes(newRoutes)
//
//       hasRoute = true
//       store.commit("changeRouteStatus", true)
//       // next({path:"index"})
//       next({path: to.path})
//       // next()
//     })
//   }else{
//     console.log("已经有路由了------------")
//     next()
//   }
// })
const menuToRoute = (menu) => {
  console.log("正在添加menu--》")
  console.log(menu)
  if (!menu.component) {
    return null
  }
  // 复制属性
  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }
  route.component = () => import('@/views/' + menu.component +'.vue')
  return route
}
export default router
