import { createRouter, createWebHistory } from 'vue-router'
import { ferryRoutes } from '@/modules/ferry/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: ShopLayout,
    //   children: [
    //     {
    //       path: '',
    //       name: 'home',
    //       component: () => import('@/modules/shop/views/HomeView.vue'),
    //     },
    //   ],
    // },
    ferryRoutes,
  ],
})

export default router
