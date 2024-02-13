import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HotelDetail from '../views/HotelDetail.vue'
import TrendingView from '../views/TrendingView.vue'
import LocationView from '../views/LocationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path : '/login',
      name : 'login',
      component : () => import('../views/LoginRegister.vue')
    },
    {
      path : '/profile',
      name : 'profile',
      component : () => import('../views/UserProfile.vue')
    },
    {
      path : '/location/id=:id/:name',
      name : 'location',
      component : LocationView,
      props: true
    },
    {
      path : '/trending/id=:id/:name',
      name : 'trending',
      component : TrendingView,
      props: true
    },
    {
      path: '/hotel/id=:id',
      name: 'hotel-details',
      component: HotelDetail,
      props : true
    },
  ]
})

export default router
