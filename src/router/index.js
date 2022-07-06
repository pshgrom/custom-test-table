import { createRouter, createWebHistory } from 'vue-router'
import Posts from '../views/Posts.vue'

const routes = [
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
