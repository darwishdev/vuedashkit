import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast';
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';

export const useNotificationStore = defineStore('notification', () => {
  const toast = useToast()
  const { t } = useI18n()
  const showSuccess = (summary: string, detail: string) => {
    toast.add({ severity: 'success', summary: t(summary), detail: t(detail), life: 3000 });
  }
  const showError = (summary: string, detail: string) => {
    toast.add({ severity: 'error', summary: t(summary), detail: t(detail), life: 3000 });
  }

  return { showError, showSuccess }
})
