import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films'
import Detail from '@/views/Detail'
import Nowplaying from '@/views/films/Nowplaying'
import Comingsoon from '@/views/films/Comingsoon'
import Cinemas from '@/views/Cinemas'
import Search from '@/mycomponents/cinemas/Search'
import Login from '@/views/Login'
import City from '@/views/City'
import Payforcinemas from '@/views/Payforcinemas'

// 注册路由组件  两个全局 router-view,router-link
Vue.use(VueRouter)

// 配置表
const routes = [
  // 重定向
  {
    path: '/films',
    component: Films,
    // 二级路由
    children: [
      {
        path: '/films/nowplaying',
        component: Nowplaying
      },
      {
        path: '/films/comingsoon',
        component: Comingsoon
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    // 命名路由
    name: 'liaojie',
    path: '/detail/:myid', // 动态路由
    component: Detail
  },
  {
    path: '/center',
    component: () => import('@/views/Center'), // 懒加载
    meta: {
      isliaojiequired: true
    }

  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/cinemas/',
    component: Cinemas
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/cinemas/search',
    component: Search
  },
  {
    path: '/payforcinemas',
    component: Payforcinemas
  },
  {
    path: '*',
    redirect: '/films'
  }

]

const router = new VueRouter({
  mode: 'hash',
  routes
})

// 全局拦截
router.beforeEach((to, from, next) => {
  // console.log(to)

  if (to.meta.isliaojiequired) {
    // 判断本地存储中是否token
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
