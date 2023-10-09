import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useThemeStore } from './theme'
import type { LoginHandler, LoginRequest, LoginResponse } from '@/types/types'

import { useRouter } from 'vue-router'
import type { PermissionGroup } from '@/types/newtypes'
export const useAuthStore = defineStore('auth', () => {
  const loginHandler = ref<LoginHandler | null>(null)
  const user = ref()
  const { push } = useRouter()
  const permissions = ref()
  const sidebar = ref()
  const accessToken = ref()
  const allPermissions = ref<{ records: PermissionGroup[] }>({
    records: [
      {
        permissions: [
          {
            permissionId: 1,
            permissionName: "view dashboard",
            permissionFunction: "DashboardView",
            permissionDescription: "permission to view the dashboard page inside backoffice application"
          }
        ],
        permissionGroup: "dashboard"
      },
      {
        permissions: [
          {
            permissionId: 7,
            permissionName: "create user",
            permissionFunction: "UserCreate",
            permissionDescription: "Permission to create a user"
          },
          {
            permissionId: 8,
            permissionName: "update user",
            permissionFunction: "UserUpdate",
            permissionDescription: "Permission to update a user"
          },
          {
            permissionId: 9,
            permissionName: "list users",
            permissionFunction: "UsersList",
            permissionDescription: "Permission to list users"
          },
          {
            permissionId: 10,
            permissionName: "find user",
            permissionFunction: "UserFind",
            permissionDescription: "Permission to find a user"
          },
          {
            permissionId: 11,
            permissionName: "delete/restore user",
            permissionFunction: "UserDeleteRestore",
            permissionDescription: "Permission to delete or restore a user"
          },
          {
            permissionId: 12,
            permissionName: "update user roles/permissions",
            permissionFunction: "UserRolesPermissionsUpdate",
            permissionDescription: "Permission to update user roles and permissions"
          }
        ],
        permissionGroup: "users"
      },
      {
        permissions: [
          {
            permissionId: 23,
            permissionName: "create table",
            permissionFunction: "TableCreate",
            permissionDescription: "Permission to create a table"
          },
          {
            permissionId: 24,
            permissionName: "update table",
            permissionFunction: "TableUpdate",
            permissionDescription: "Permission to update a table"
          },
          {
            permissionId: 25,
            permissionName: "list tables",
            permissionFunction: "TablesList",
            permissionDescription: "Permission to list tables"
          },
          {
            permissionId: 26,
            permissionName: "find table",
            permissionFunction: "TableFind",
            permissionDescription: "Permission to find a table"
          },
          {
            permissionId: 27,
            permissionName: "delete/restore table",
            permissionFunction: "TableDeleteRestore",
            permissionDescription: "Permission to delete or restore a table"
          }
        ],
        permissionGroup: "tables"
      },
      {
        permissions: [
          {
            permissionId: 2,
            permissionName: "create role",
            permissionFunction: "RoleCreate",
            permissionDescription: "Permission to create a role"
          },
          {
            permissionId: 3,
            permissionName: "update role",
            permissionFunction: "RoleUpdate",
            permissionDescription: "Permission to update a role"
          },
          {
            permissionId: 4,
            permissionName: "list roles",
            permissionFunction: "RolesList",
            permissionDescription: "Permission to list roles"
          },
          {
            permissionId: 5,
            permissionName: "find role",
            permissionFunction: "RoleFind",
            permissionDescription: "Permission to find a role"
          },
          {
            permissionId: 6,
            permissionName: "delete/restore role",
            permissionFunction: "RoleDeleteRestore",
            permissionDescription: "Permission to delete or restore a role"
          }
        ],
        permissionGroup: "roles"
      },
      {
        permissions: [
          {
            permissionId: 56,
            permissionName: "create combo",
            permissionFunction: "ComboCreate",
            permissionDescription: "Permission to create a combo"
          },
          {
            permissionId: 57,
            permissionName: "update combo",
            permissionFunction: "ComboUpdate",
            permissionDescription: "Permission to update a combo"
          },
          {
            permissionId: 58,
            permissionName: "list combos",
            permissionFunction: "CombosList",
            permissionDescription: "Permission to list combos"
          },
          {
            permissionId: 59,
            permissionName: "find combo",
            permissionFunction: "ComboFind",
            permissionDescription: "Permission to find a combo"
          },
          {
            permissionId: 60,
            permissionName: "delete/restore combo",
            permissionFunction: "ComboDeleteRestore",
            permissionDescription: "Permission to delete or restore a combo"
          }
        ],
        permissionGroup: "combos"
      },
      {
        permissions: [
          {
            permissionId: 13,
            permissionName: "create branch",
            permissionFunction: "BranchCreate",
            permissionDescription: "Permission to create a branch"
          },
          {
            permissionId: 14,
            permissionName: "update branch",
            permissionFunction: "BranchUpdate",
            permissionDescription: "Permission to update a branch"
          },
          {
            permissionId: 15,
            permissionName: "list branches",
            permissionFunction: "BranchesList",
            permissionDescription: "Permission to list branches"
          },
          {
            permissionId: 16,
            permissionName: "find branch",
            permissionFunction: "BranchFind",
            permissionDescription: "Permission to find a branch"
          },
          {
            permissionId: 17,
            permissionName: "delete/restore branch",
            permissionFunction: "BranchDeleteRestore",
            permissionDescription: "Permission to delete or restore a branch"
          }
        ],
        permissionGroup: "branches"
      },
      {
        permissions: [
          {
            permissionId: 28,
            permissionName: "create unit",
            permissionFunction: "UnitCreate",
            permissionDescription: "permission to create unit"
          },
          {
            permissionId: 29,
            permissionName: "update unit",
            permissionFunction: "UnitUpdate",
            permissionDescription: "permission to update unit"
          },
          {
            permissionId: 30,
            permissionName: "bulk create unit",
            permissionFunction: "UnitBulkCreate",
            permissionDescription: "permission to create multiple units"
          },
          {
            permissionId: 31,
            permissionName: "delete restore unit",
            permissionFunction: "UnitDeleteRestore",
            permissionDescription: "permission to delete restore unit"
          },
          {
            permissionId: 32,
            permissionName: "find unit",
            permissionFunction: "UnitFind",
            permissionDescription: "permission to fin unit"
          },
          {
            permissionId: 33,
            permissionName: "list units",
            permissionFunction: "UnitsList",
            permissionDescription: "permission to list units"
          }
        ],
        permissionGroup: "units"
      },
      {
        permissions: [
          {
            permissionId: 39,
            permissionName: "attach products to ingredient",
            permissionFunction: "IngredientAttachProducts",
            permissionDescription: "Permission to attach products to  ingredient"
          },
          {
            permissionId: 40,
            permissionName: "detach products from ingredient",
            permissionFunction: "IngredientDetachProducts",
            permissionDescription: "Permission to detach products from  ingredient"
          },
          {
            permissionId: 41,
            permissionName: "create ingredient",
            permissionFunction: "IngredientCreate",
            permissionDescription: "Permission to create a ingredient"
          },
          {
            permissionId: 42,
            permissionName: "update ingredient",
            permissionFunction: "IngredientUpdate",
            permissionDescription: "Permission to update a ingredient"
          },
          {
            permissionId: 43,
            permissionName: "list ingredients",
            permissionFunction: "IngredientsList",
            permissionDescription: "Permission to list ingredients"
          },
          {
            permissionId: 44,
            permissionName: "find ingredient",
            permissionFunction: "IngredientFind",
            permissionDescription: "Permission to find a ingredient"
          },
          {
            permissionId: 45,
            permissionName: "delete/restore ingredient",
            permissionFunction: "IngredientDeleteRestore",
            permissionDescription: "Permission to delete or restore a ingredient"
          }
        ],
        permissionGroup: "ingredients"
      },
      {
        permissions: [
          {
            permissionId: 34,
            permissionName: "create category",
            permissionFunction: "CategoryCreate",
            permissionDescription: "Permission to create a category"
          },
          {
            permissionId: 35,
            permissionName: "update category",
            permissionFunction: "CategoryUpdate",
            permissionDescription: "Permission to update a category"
          },
          {
            permissionId: 36,
            permissionName: "list categories",
            permissionFunction: "CategoriesList",
            permissionDescription: "Permission to list categories"
          },
          {
            permissionId: 37,
            permissionName: "find category",
            permissionFunction: "CategoryFind",
            permissionDescription: "Permission to find a category"
          },
          {
            permissionId: 38,
            permissionName: "delete/restore category",
            permissionFunction: "CategoryDeleteRestore",
            permissionDescription: "Permission to delete or restore a ingredient"
          }
        ],
        permissionGroup: "categories"
      },
      {
        permissions: [
          {
            permissionId: 46,
            permissionName: "create modifier",
            permissionFunction: "ModifierCreate",
            permissionDescription: "Permission to create a modifier"
          },
          {
            permissionId: 47,
            permissionName: "update modifier",
            permissionFunction: "ModifierUpdate",
            permissionDescription: "Permission to update a modifier"
          },
          {
            permissionId: 48,
            permissionName: "list modifiers",
            permissionFunction: "ModifiersList",
            permissionDescription: "Permission to list modifiers"
          },
          {
            permissionId: 49,
            permissionName: "find modifier",
            permissionFunction: "ModifierFind",
            permissionDescription: "Permission to find a modifier"
          },
          {
            permissionId: 50,
            permissionName: "delete/restore modifier",
            permissionFunction: "ModifierDeleteRestore",
            permissionDescription: "Permission to delete or restore a modifier"
          }
        ],
        permissionGroup: "modifiers"
      },
      {
        permissions: [
          {
            permissionId: 18,
            permissionName: "create hall",
            permissionFunction: "HallCreate",
            permissionDescription: "Permission to create a hall"
          },
          {
            permissionId: 19,
            permissionName: "update hall",
            permissionFunction: "HallUpdate",
            permissionDescription: "Permission to update a hall"
          },
          {
            permissionId: 20,
            permissionName: "list halls",
            permissionFunction: "HallsList",
            permissionDescription: "Permission to list halls"
          },
          {
            permissionId: 21,
            permissionName: "find hall",
            permissionFunction: "HallFind",
            permissionDescription: "Permission to find a hall"
          },
          {
            permissionId: 22,
            permissionName: "delete/restore hall",
            permissionFunction: "HallDeleteRestore",
            permissionDescription: "Permission to delete or restore a hall"
          }
        ],
        permissionGroup: "halls"
      },
      {
        permissions: [
          {
            permissionId: 51,
            permissionName: "create product",
            permissionFunction: "ProductCreate",
            permissionDescription: "Permission to create a product"
          },
          {
            permissionId: 52,
            permissionName: "update product",
            permissionFunction: "ProductUpdate",
            permissionDescription: "Permission to update a product"
          },
          {
            permissionId: 53,
            permissionName: "list products",
            permissionFunction: "ProductsList",
            permissionDescription: "Permission to list products"
          },
          {
            permissionId: 54,
            permissionName: "find product",
            permissionFunction: "ProductFind",
            permissionDescription: "Permission to find a product"
          },
          {
            permissionId: 55,
            permissionName: "delete/restore product",
            permissionFunction: "ProductDeleteRestore",
            permissionDescription: "Permission to delete or restore a product"
          }
        ],
        permissionGroup: "products"
      }
    ]
  })

  const permissionsFormValueRef = ref({})

  const themeStore = useThemeStore()
  const init = (handler: LoginHandler) => {
    loginHandler.value = handler
  }


  const getParsedSideBar = () => {
    const savedSidebar = JSON.parse(atob(localStorage.getItem('sideBar') as string))
    savedSidebar.map((item: any) => {
      if (item.items != '{}') {
        item.items = JSON.parse(item.items)
      } else {
        delete item.items
      }
      return item
    })

    sidebar.value = savedSidebar
  }
  const loadSavedAuthData = () => {
    getParsedSideBar()
    const savedToken = localStorage.getItem('token') as string
    const savePermissions = atob(localStorage.getItem('permissions') as string)
    const savedUser = atob(localStorage.getItem('user') as string)
    permissions.value = savePermissions
    accessToken.value = savedToken
    user.value = savedUser
  }
  const login = (request: LoginRequest) => {
    new Promise((resolve => {
      if (!loginHandler.value) {
        resolve(null)
        return
      }
      themeStore.startProgressBar()
      loginHandler.value?.submit(request).then((response: LoginResponse) => {
        user.value = response.user
        accessToken.value = response.loginInfo.accessToken
        sidebar.value = atob(response.sidebar)
        permissions.value = atob(response.permissions)
        localStorage.setItem('user', JSON.stringify(user.value))
        localStorage.setItem('token', response.loginInfo.accessToken)
        localStorage.setItem('permissions', response.permissions)
        localStorage.setItem('sideBar', response.sidebar)
        themeStore.stopProgressBar()
        push({ name: 'home_view' })

        resolve(response)
      }).catch((e: any) => {
        console.log("errorerrorerrorerror")
        console.log("code", e.code)
        console.log("message", e.message)
        console.log("details", e.findDetails)
        console.log("raw", e.rawMessage)
        console.log("meta", e.metadata)
      })
    }))
  }

  const filtersInputFormChanged = (group: string, v: any) => {
    console.log("from store", v)
    permissionsFormValueRef.value[group] = v

  }
  const logout = () => {
    themeStore.startProgressBar()
    localStorage.removeItem('token')
    localStorage.removeItem('permissions')
    localStorage.removeItem('sideBar')
    push({ name: 'login' })
  }
  return {
    loginHandler,
    user,
    permissions,
    sidebar,
    accessToken,
    login,
    allPermissions,
    filtersInputFormChanged,
    permissionsFormValueRef,
    logout,
    loadSavedAuthData,
    init,
  }
})
