import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLanguageStore } from './language';

export const useMenuStore = defineStore('menu', () => {
  const languageStore = useLanguageStore()
  const sideBarVisible = ref(false)
  const isMenuOpened = ref(false)
  const sidebarPosition = computed(() => {
    const isRtl = languageStore.isRtl
    return isRtl ? "right" : "left"
  })
  function toggleMenu() {
    isMenuOpened.value = !isMenuOpened.value
    localStorage.setItem('asideOpened', isMenuOpened.value.toString())
  };
  function toggleSidebar() {
    sideBarVisible.value = !sideBarVisible.value;
  };
  function closeSidebar() {
    sideBarVisible.value = false
  };

  return { toggleMenu, closeSidebar, toggleSidebar, sideBarVisible, sidebarPosition }
})
