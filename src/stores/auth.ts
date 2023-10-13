import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserLoginResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_user_definitions_pb'
import type { User, SideBarItem } from '@/types/newtypes'

import { useRouter } from 'vue-router'
export const useAuthStore = defineStore('auth', () => {
  const loginHandler = ref<UserLoginResponse | null>(null)
  const { push } = useRouter()
  const user = ref<User | null>()
  const sidebar = ref<SideBarItem[]>([])


  const saveLoginData = (response?: UserLoginResponse) => {
    if (!response) return
    console.log("init", response)
    loginHandler.value = response
    sidebar.value = response.sideBar
    const strResponse = JSON.stringify(response)
    localStorage.setItem('user', strResponse)
    localStorage.setItem('token', response.loginInfo?.accessToken as string)
  }
  const init = () => {
    const user = localStorage.getItem('user') as string
    if (!user) return
    const userObj = JSON.parse(user) as UserLoginResponse
    sidebar.value = userObj.sideBar
  }

  return {
    loginHandler,
    user,
    sidebar,
    saveLoginData,
    init,
  }
})
