import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppLayout from '@/components/theme/AppLayout.vue'
import { useThemeStore } from '@/stores/theme';
import apiClient from '@/api/ApiClient';


const authMiddleWare = async (_, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (from.name != 'login') {
    try {
      const user = await apiClient.userAuthorize({})
      localStorage.setItem('user', JSON.stringify(user))
      next()
      return true

    } catch (e: any) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      next('/login')
      return false
    }
  }
  next()
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      beforeEnter: authMiddleWare,
      children: [
        {
          path: '/dashboard',
          name: 'home_view',
          meta: {
            loadingType: 'appLayout',
          },
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/profile',
          name: 'profile_view',
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/roles',
          name: 'roles_list',
          meta: {
            loadingType: 'card',
            breadcrumbs: [{ label: "roles_list", to: { name: 'roles_list' } }],

          },
          component: () => import('../views/RolesListView.vue')
        },
        {
          path: '/roles/create',
          name: 'role_create',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "roles", to: { name: 'roles_list' } }, { label: "role_create" }],
          },
          component: () => import('../views/RoleCreateView.vue')
        },
        {
          path: '/roles/:id',
          name: 'roles_find',
          meta: {
            breadcrumbs: [{ label: "roles", to: { name: 'roles_list' } }, { label: "view" }]
          },
          component: () => import('../views/UsersView.vue')
        },
        {
          path: '/roles/:id/update',
          name: 'role_update',
          meta: {
            loadingType: 'form',
            breadcrumbs: [{ label: "roles", to: { name: 'roles_list' } }, { label: "update" }]
          },
          component: () => import('../views/RoleUpdateView.vue')
        },
        {
          path: '/appForm',
          name: 'app_form',
          meta: {
            breadcrumbs: [{ label: "AppForm Docs", to: { name: 'app_form' } }, { label: "Docs" }]
          },
          component: () => import('../views/appFormDocs.vue')
        },
        {
          path: '/dataList',
          name: 'data_list',
          meta: {
            breadcrumbs: [{ label: "DataList Docs", to: { name: 'data_list' } }, { label: "Docs" }]
          },
          component: () => import('../views/dataListDocs.vue')
        },
        {
          path: '/products/:id',
          name: 'products_find',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'data_list' } }, { label: "view" }]
          },
          component: () => import('../views/productsView.vue')
        },
        {
          path: '/products/:id/update',
          name: 'products_update',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'data_list' } }, { label: "update" }]
          },
          component: () => import('../views/productsUpdate.vue')
        },
        {
          path: '/products/create',
          name: 'products_create',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'data_list' } }, { label: "Create" }],
          },
          component: () => import('../views/productCreate.vue')
        },

        {
          path: '/users',
          name: 'users_list',
          meta: {
            breadcrumbs: [{ label: "users", to: { name: 'users_list' } }, { label: "view" }]
          },
          component: () => import('../views/UsersView.vue')
        },
        {
          path: '/units',
          name: 'units_list',
          meta: {
            breadcrumbs: [{ label: "units", to: { name: 'units_list' } }, { label: "view" }]
          },
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/categories',
          name: 'categories_list',
          meta: {
            breadcrumbs: [{ label: "categories", to: { name: 'categories_list' } }, { label: "view" }]
          },
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/ingredients',
          name: 'ingredients_list',
          meta: {
            breadcrumbs: [{ label: "ingredients", to: { name: 'ingredients_list' } }, { label: "view" }]
          },
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/modifiers',
          name: 'modifiers_list',
          meta: {
            breadcrumbs: [{ label: "modifiers", to: { name: 'modifiers_list' } }, { label: "view" }]
          },
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/products',
          name: 'products_list',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'products_list' } }, { label: "view" }]
          },
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/branches',
          name: 'branches_list',
          meta: {
            breadcrumbs: [{ label: "branches", to: { name: 'branches_list' } }, { label: "view" }]
          },
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/halls',
          name: 'halls_list',
          meta: {
            breadcrumbs: [{ label: "halls", to: { name: 'halls_list' } }, { label: "view" }]
          },
          component: () => import('../views/ProfileView.vue')
        },
        {
          path: '/tables',
          name: 'tables_list',
          meta: {
            breadcrumbs: [{ label: "tables", to: { name: 'tables_list' } }, { label: "view" }]
          },
          component: () => import('../views/ProfileView.vue')
        }


      ],

    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/login/resetPassword',
      name: 'reset_password',
      component: () => import('../views/resetPasswordView.vue')
    },
    {
      path: '/login/successful',
      name: 'successful_login',
      component: () => import('../views/successfulLoginView.vue')
    },
  ]
})



router.beforeEach((_, __, next) => {
  const themeStore = useThemeStore()
  themeStore.startProgressBar()
  next()

})
// router.afterEach(() => {
//   const themeStore = useThemeStore()
//   themeStore.stopProgressBar()
//   // themeStore.stopProgressBar();
// })
export default router
