import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserLoginResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_user_definitions_pb'
import type { User, SideBarItem } from '@/types/types'

export const useAuthStore = defineStore('auth', () => {
  const loginHandler = ref<UserLoginResponse | null>(null)
  const user = ref<User | null>()
  const sidebar = ref<SideBarItem[]>([])


  const saveLoginData = (response?: UserLoginResponse) => {
    if (!response) return
    loginHandler.value = response
    sidebar.value = response.sideBar
    const strResponse = JSON.stringify(response)
    localStorage.setItem('user', strResponse)
    localStorage.setItem('token', response.loginInfo?.accessToken as string)
  }
  const init = () => {
    const userData = localStorage.getItem('user') as string
    if (!userData) return
    const userObj = JSON.parse(userData) as UserLoginResponse
    sidebar.value = userObj.sideBar
    user.value = userObj
  }

  return {
    loginHandler,
    user,
    sidebar,
    saveLoginData,
    init,
  }
})
