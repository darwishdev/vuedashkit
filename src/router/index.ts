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
          path: '/dashboard',
          name: 'home_view',
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
            breadcrumbs: [{ label: "roles_list", to: { name: 'roles_list' } }],
            
          },
          component: () => import('../views/RolesListView.vue')
        },
        {
          path: '/roles/create',
          name: 'role_create',
          meta: {
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
          path: '/appTable',
          name: 'app_table',
          meta: {
            breadcrumbs: [{ label: "AppTable Docs", to: { name: 'app_table' } }, { label: "Docs" }]
          },
          component: () => import('../views/appTableDocs.vue')
        },
        {
          path: '/products/:id',
          name: 'products_find',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'app_table' } }, { label: "view" }]
          },
          component: () => import('../views/productsView.vue')
        },
        {
          path: '/products/:id/update',
          name: 'products_update',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'app_table' } }, { label: "update" }]
          },
          component: () => import('../views/productsUpdate.vue')
        },
        {
          path: '/products/create',
          name: 'products_create',
          meta: {
            breadcrumbs: [{ label: "products", to: { name: 'app_table' } }, { label: "Create" }],
          },
          component: () => import('../views/productCreate.vue')
        },
        {
          path: '/roles/:id/update',
          name: 'role_update',
          meta: {
            breadcrumbs: [{ label: "roles", to: { name: 'roles_list' } }, { label: "update" }]
          },
          component: () => import('../views/UsersView.vue')
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
