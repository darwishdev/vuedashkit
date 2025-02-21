import { ref } from 'vue'
import { defineStore } from 'pinia'
// import type { UserLoginResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_user_definitions_pb'
import type { User, SideBarItem, UserLoginResponse, UserRole } from '@/types/types'

export const useAuthStore = defineStore('auth', () => {
  const loginHandler = ref<UserLoginResponse | null>(null)
  const userRef = ref<User | null>()
  const sidebarRef = ref<SideBarItem[]>([])
  const userRolesRef = ref<UserRole[]>([])

  const saveLoginData = (response?: UserLoginResponse) => {
    if (!response) return
    loginHandler.value = response
    sidebarRef.value = response.sideBar
    localStorage.setItem('user', JSON.stringify(response.user))
    localStorage.setItem('roles', JSON.stringify(response.roles))
    localStorage.setItem('sidebar', JSON.stringify(response.sideBar))
    localStorage.setItem('token', response.loginInfo.accessToken)
  }

  const processSideBar = (items: SideBarItem[]) => {
    return items.map(item => {
      if (item.items) {
        if (item.items.length) {
          item.items = processSideBar(item.items)
        } else {
          delete item['items']
        }
      }
      return item
    })
  }
  const init = () => {
    const user = localStorage.getItem('user') as string
    const sidebar = localStorage.getItem('sidebar') as string
    const roles = localStorage.getItem('roles') as string
    if (!user || !sidebar || !roles) return
    const userObj = JSON.parse(user) as User
    const sidebarObj = JSON.parse(sidebar) as SideBarItem[]
    const rolesObj = JSON.parse(roles) as UserRole[]
    sidebarRef.value = processSideBar(sidebarObj)
    userRef.value = userObj
    userRolesRef.value = rolesObj

  }

  return {
    loginHandler,
    sidebarRef,
    userRef,
    userRolesRef,
    saveLoginData,
    init,
  }
})
