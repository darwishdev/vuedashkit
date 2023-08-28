import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import AppLayoutVue from '@/components/theme/AppLayout.vue'
import { useDialog } from "primevue/usedialog";
export const useDialogStore = defineStore('dialog', () => {
  const dialog = useDialog()
  let dialogRef

  const init = (dialog: Ref) => {
    dialogRef = dialog
  }
  const open = () => {
    dialog.open(AppLayoutVue, {})
  }

  const close = () => {
    dialogRef!.value.close()
  }

  return { open, dialogRef, close, init }
})
