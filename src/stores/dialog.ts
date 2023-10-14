import { defineStore } from 'pinia'
import { useDialog } from "primevue/usedialog";
import DeleteRestoreDialog from '@/components/dialogs/DeleteRestoreDialog.vue'
export const useDialogStore = defineStore('dialog', () => {
  const dialog = useDialog()
  const openDeleteRestore = (ids: number[] = []) => {
    dialog.open(DeleteRestoreDialog, {
      props: {
        dismissableMask: true,
        closable: false,
        modal: true,
      },
    })
  }




  return { openDeleteRestore }
})
