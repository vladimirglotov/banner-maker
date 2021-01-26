import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'ImgBackground',
    meta: {layout: 'Image'},
    component: () => import('../components/background-image.vue'),
    },
  {
    path: '/1',
    name: 'ColorBackground',
    meta: {layout:'Color'},
    component: () => import('../components/background-color'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
