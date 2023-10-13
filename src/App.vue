 

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { LocaleSetter } from '@/components/form'
import { useLanguageStore } from '@/stores/language';
import { useThemeStore } from '@/stores/theme';
import { ref, onMounted } from 'vue';
const themeStore = useThemeStore()
const languageStore = useLanguageStore()
themeStore.init()
languageStore.init()
const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <div class="app-wrapper" :class="{ 'rtl': languageStore.isRtl, 'dark': themeStore.isDark }">
    <LocaleSetter :ref="(el) => languageStore.localeSetterComponentRef = el" />
    <RouterView />
    <div class="app-loading" v-if="loading">loading</div>
    <AppNotification />
  </div>
</template>
 