import { defineStore } from 'pinia'
import DeleteRestoreDialog from '@/components/dialogs/DeleteRestoreDialog.vue'
import { ref } from 'vue'
import type { DynamicDialogInstance, DynamicDialogOptions } from 'primevue/dynamicdialogoptions';
export const useDialogStore = defineStore('dialog', () => {
  type dialogService = { open: (content: any, options?: DynamicDialogOptions) => DynamicDialogInstance; }
  const dialog = ref<dialogService>()

  const init = (dialogParam: dialogService) => {
    dialog.value = dialogParam
  }
  const openDeleteRestore = (ids: number[] = []) => {
    console.log("ids", ids)
    console.log("ids", dialog.value)
    if (!dialog.value) return
    dialog.value.open(DeleteRestoreDialog, {
      props: {
        dismissableMask: true,
        closable: false,
        modal: true,
      },
    })
  }




  return { dialog, openDeleteRestore, init }
})
