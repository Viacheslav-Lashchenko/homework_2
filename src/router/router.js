import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import CatalogWrapper from '@/components/CatalogWrapper.vue'
import Cart from '@/components/Cart.vue'

const routes = [
  {
    path: '/',
    name: 'catalogWrapper',
    component: CatalogWrapper,
    props: true,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
