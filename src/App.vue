 

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { LocaleSetter } from '@/components/form'
import { useLanguageStore } from '@/stores/language';
import { useThemeStore } from '@/stores/theme';
import { ref, onMounted } from 'vue';
import { useDialogStore } from './stores/dialog';
import AppLayoutLoading from '@/components/loading/AppLayoutLoading.vue';
import { useDialog } from "primevue/usedialog";

const themeStore = useThemeStore()
const languageStore = useLanguageStore()
const dialogStore = useDialogStore()
themeStore.init()
languageStore.init()
const loading = ref(true)
const dialog = useDialog() as any
dialogStore.init(dialog)
onMounted(() => {

  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<template>
  <div class="app-wrapper" :class="{ 'rtl': languageStore.isRtl, 'dark': themeStore.isDark }">
    <LocaleSetter :ref="(el) => languageStore.localeSetterComponentRef = el" />
    <RouterView />
    <div class="app-loading" v-if="loading">
      <AppLayoutLoading></AppLayoutLoading>
    </div>
    <AppNotification />
  </div>
</template>

<style lang="scss">
.app-loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: var(--color-background);
  display: flex;
  z-index: 3;
  justify-content: center;
  align-items: center;
}
</style>
 