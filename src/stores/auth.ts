import { ref } from 'vue'
import { defineStore } from 'pinia'
// import type { UserLoginResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_user_definitions_pb'
import type { User, SideBarItem, UserLoginResponse } from '@/types/types'
import { useI18n } from 'vue-i18n'

export const useAuthStore = defineStore('auth', () => {
  const loginHandler = ref<UserLoginResponse | null>(null)
  const user = ref<User | null>()
  const sidebar = ref<SideBarItem[]>([])
  const { t } = useI18n()

  const saveLoginData = (response?: UserLoginResponse) => {
    if (!response) return
    loginHandler.value = response
    sidebar.value = response.sideBar
    const strResponse = JSON.stringify(response)
    localStorage.setItem('user', strResponse)
    localStorage.setItem('token', response.loginInfo?.accessToken as string)
  }

  const translateSidebarLabel = (items: SideBarItem[]) => {
    return items.map(item => {
      item.label = t(item.label)
      if (item.items) {
        item.items = translateSidebarLabel(item.items)
      }
      return item
    })
  }
  const init = () => {
    const user = localStorage.getItem('user') as string
    if (!user) return
    const userObj = JSON.parse(user) as UserLoginResponse
    if (userObj.sideBar) {
      sidebar.value = translateSidebarLabel(userObj.sideBar)
    }
  }

  return {
    loginHandler,
    user,
    sidebar,
    saveLoginData,
    init,
  }
})
