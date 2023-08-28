import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/components/theme/AppLayout.vue'
import { useThemeStore } from '@/stores/theme';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/LoginView.vue')
        }

      ]
    },
  ]
})



router.beforeEach((_, __, next) => {
  const themeStore = useThemeStore()
  themeStore.startProgressBar()
  // themeStore.stopProgressBar();
  next()
})
// router.afterEach(() => {
//   const themeStore = useThemeStore()
//   themeStore.stopProgressBar()
//   // themeStore.stopProgressBar();
// })
export default router
