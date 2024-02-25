import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/actus'
  },
  {
    path: '/actus',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/to-read-later',
    component: () => import('@/views/ReadLaterView.vue')
  },
  {
    path: '/manage-rss-categories',
    component: () => import('@/views/ManageRSSCategories.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
