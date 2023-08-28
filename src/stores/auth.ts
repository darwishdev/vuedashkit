import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useThemeStore } from './theme'
import type { LoginHandler, LoginRequest, LoginResponse } from '@/types/types'
import { ConnectError } from '@bufbuild/connect'
export const useAuthStore = defineStore('auth', () => {
  const loginHandler = ref<LoginHandler | null>(null)
  const user = ref()
  const permissions = ref()
  const sidebar = ref()
  const accessToken = ref()
  const themeStore = useThemeStore()
  const init = (handler: LoginHandler) => {
    loginHandler.value = handler
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
        localStorage.setItem('token', response.loginInfo.accessToken)
        localStorage.setItem('permissions', response.permissions)
        localStorage.setItem('sideBar', response.sidebar)
        themeStore.stopProgressBar()
        resolve(response)
      }).catch((e: ConnectError) => {
        console.log("errorerrorerrorerror")
        console.log("code", e.code)
        console.log("message", e.message)
        console.log("details", e.findDetails)
        console.log("raw", e.rawMessage)
        console.log("meta", e.metadata)
      })
    }))
  }

  return {
    loginHandler,
    user,
    permissions,
    sidebar,
    accessToken,
    login,
    init,
  }
})
