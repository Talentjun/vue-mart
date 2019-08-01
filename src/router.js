import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'
import store from './store';

Vue.use(Router)

const router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/about',
      name: 'about',
      meta:{auth:true},//该路由是受保护的
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to,from,next)=>{
  console.log(to);
  console.log(from);
  console.log(next);
  if(to.meta.auth){//需要认证，则检查令牌
    if(store.state.token){//已登录
      next()
    }else{
      //去登录
      next({
        path:'/login',
        query:{redirect:to.path}
      })
    }
  }else{
    next();
  }
})

export default router;