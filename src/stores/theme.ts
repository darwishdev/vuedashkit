import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePrimeVue } from 'primevue/config';


export const useThemeStore = defineStore('theme', () => {
  const primevue = usePrimeVue()
  const isProgressBarVisible = ref(false)
  const isMenuOpened = ref(false)
  const isDark = ref(false)
  const themes = {
    dark: 'soho-dark',
    light: 'soho-light'
  }
  const currentTheme = computed(() => isDark.value ? themes.dark : themes.light)
  const targetTheme = computed(() => isDark.value ? themes.light : themes.dark)
  const startProgressBar = () => {
    isProgressBarVisible.value = true
    setTimeout(stopProgressBar, 20000)
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
    startProgressBar, toggleDesktopMenu, isMenuOpened, init, stopProgressBar, changeTheme, isDark, isProgressBarVisible
  }
})
