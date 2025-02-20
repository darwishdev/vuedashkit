import { ref } from 'vue'
import type { ToastServiceMethods } from 'primevue/toastservice';
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';

export const useNotificationStore = defineStore('notification', () => {
  type dialogService = { add: (severity?: any, options?: any, summary?: any, detail?: any, life?: any) => void }
  const toast = ref<dialogService>()
  const { t } = useI18n()
  const showSuccess = (summary: string, detail: string) => {

    console.log('showSuccess', toast)
    if (!toast.value) return
    toast.value.add({ severity: 'success', summary: t(summary), detail: t(detail), life: 3000 });
  }
  const showError = (summary: string, detail: string) => {
    if (!toast.value) return
    toast.value.add({ severity: 'error', summary: t(summary), detail: t(detail), life: 3000 });
  }
  const init = (toastRef: ToastServiceMethods) => {

    console.log('iniiting notification')
    toast.value = toastRef
  }
  return { showError, init, toast, showSuccess }
})
