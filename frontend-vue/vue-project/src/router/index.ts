import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/newTemplate',
      name: 'newHomeView',
      component: () => import('../views/NewTemplateView.vue'),
    },
    {
      path: '/interval',
      name: 'interval',
      component: () => import('../views/IntervalView.vue'),
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import('../views/SubmitWorkoutView.vue'),
    },
    {
      path: '/startWorkout',
      name: 'startWorkout',
      component: () => import('../views/StartWorkoutView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
