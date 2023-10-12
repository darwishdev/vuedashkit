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
    filtersInputFormChanged,
    permissionsFormValueRef,
    logout,
    loadSavedAuthData,
    init,
  }
})
