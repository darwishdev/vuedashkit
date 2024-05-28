import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { usePrimeVue } from 'primevue/config';
import { db } from '@/db/db';


export const useThemeStore = defineStore('theme', () => {
  const primevue = usePrimeVue()
  const isProgressBarVisible = ref(false)
  const apiClient = inject("apiClient") as any;
  const iconsListMethodName = inject("iconsListMethodName") as any;
  const isMenuOpened = ref(false)
  const isDark = ref(false)
  const isLoading = ref(true)
  const themes = {
    dark: 'soho-dark',
    light: 'soho-light'
  }
  const currentTheme = computed(() => isDark.value ? themes.dark : themes.light)
  const targetTheme = computed(() => isDark.value ? themes.light : themes.dark)
  const startProgressBar = () => {
    isProgressBarVisible.value = true
    setTimeout(stopProgressBar, 2000)
  }


  const fetchIcons = () => {
    apiClient[iconsListMethodName]().then((response: any) => {
      isLoading.value = false
      db.icons.clear()
      db.icons.bulkAdd(response.icons)
    }).catch((err) => {
      console.log('cannot load icons', err)
      isLoading.value = false
    })

  }

  const init = () => {
    const isDarkMode = localStorage.getItem('dark');
    const isMenuOpened = localStorage.getItem('menuOpened');
    if (isDarkMode == 'true') {
      changeTheme()
    }
    if (isMenuOpened == 'true') {
      toggleDesktopMenu()
    }
    db.icons.count().then(count => {
      isLoading.value = true
      if (count > 0) {
        isLoading.value = false
      } else {
        fetchIcons()
      }
    })
  }
  const stopProgressBar = () => {
    isProgressBarVisible.value = false
  }


  const toggleDesktopMenu = () => {
    isMenuOpened.value = !isMenuOpened.value
    localStorage.setItem('menuOpened', isMenuOpened.value.toString());
  }

  const changeTheme = () => {
    document.querySelector("body")?.classList.toggle("dark")
    primevue.changeTheme(currentTheme.value, targetTheme.value, 'theme-link', () => {
      isDark.value = !isDark.value
      localStorage.setItem("dark", isDark.value.toString())
    });
  }
  return {
    startProgressBar, toggleDesktopMenu, fetchIcons, isLoading, isMenuOpened, init, stopProgressBar, changeTheme, isDark, isProgressBarVisible
  }
})
