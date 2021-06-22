import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      keepAlive:true
     }
  },
  {
    path: '/Category',
    name: 'Category',
    component: () => import('../views/category/category.vue'),
    meta: { 
      keepAlive:true
     }
    
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: () => import('../views/cart/cart.vue'),
    meta: { 
      keepAlive:true
     }
  },
  {
    path: '/Uzer',
    name: 'Uzer',
    component: () => import('../views/uzer/uzer.vue'),
    meta: { 
      keepAlive:true
     }
  },
  {
    path: '/goodsList/:type',
    name: 'goodsList',
    component: () => import('../views/goodlist/homeGoodsList.vue'),
    props:true,
    meta: { 
      keepAlive:true
     }
  },
  {
    path:'/goodsDetail/:iid',
    name: 'goodsDetail',
    component: () => import('../views/goodsDetail/goodsDetail.vue'),
    props: true,
    meta: { 
      keepAlive:false
     }
  },
  {
    path:'/uzer/setuzer',
    name:'setuzer',
    component: ()=> import('../views/uzer/setuzer.vue'),
    props: true,
    meta: { 
      keepAlive:true
     }
  },
  {
    path:'/uzer/foot',
    name:'uzerfoot',
    component: ()=> import('../views/uzer/foot.vue'),
    props: true,
    meta: { 
      keepAlive:true
     }
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
