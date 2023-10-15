import { defineStore } from 'pinia'
import DeleteRestoreDialog from '@/components/dialogs/DeleteRestoreDialog.vue'
import type { DynamicDialogInstance, DynamicDialogOptions } from 'primevue/dynamicdialogoptions';
export const useDialogStore = defineStore('dialog', () => {
  let dialog: {
    open: (content: any, options?: DynamicDialogOptions) => DynamicDialogInstance;
  }

  const init = (dialogParam: { open: (content: any, options?: DynamicDialogOptions) => DynamicDialogInstance; }) => {
    dialog = dialogParam
  }
  const openDeleteRestore = (ids: number[] = []) => {
    if (!dialog) return
    dialog.open(DeleteRestoreDialog, {
      props: {
        dismissableMask: true,
        closable: false,
        modal: true,
      },
    })
  }




  return { openDeleteRestore, init }
})
