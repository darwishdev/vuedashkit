import { defineStore } from 'pinia'
import DeleteRestoreDialog from '@/components/dialogs/DeleteRestoreDialog.vue'
import DeleteDialog from '@/components/dialogs/DeleteDialog.vue'
import { ref, h, Suspense } from 'vue'
import type { AppFormDialogProps } from '@/types/types';
import AppFormDialog from '@/components/dialogs/AppFormDialog.vue'
import type { DynamicDialogInstance, DynamicDialogOptions } from 'primevue/dynamicdialogoptions';
export const useDialogStore = defineStore('dialog', () => {
  type dialogService = { open: (content: any, options?: DynamicDialogOptions) => DynamicDialogInstance; }
  const dialog = ref<dialogService>()

  const init = (dialogParam: dialogService) => {
    dialog.value = dialogParam
  }
  const openDeleteRestore = () => {

    if (!dialog.value) return
    dialog.value.open(DeleteRestoreDialog, {
      props: {
        dismissableMask: true,
        closable: false,
        modal: true,
      },
    })
  }
  const openDelete = () => {

    if (!dialog.value) return
    dialog.value.open(DeleteDialog, {
      props: {
        dismissableMask: true,
        closable: false,
        modal: true,
      },
    })
  }




  const openForm = (props: AppFormDialogProps) => {
    if (!dialog.value) return
    const comp = h(Suspense, null, {
      default: () => h(AppFormDialog, props)
    })

    dialog.value.open(comp, {
      props: {
        dismissableMask: true,
        closable: false,
        modal: true
      },
    })
  }

  return { dialog, openDelete, openDeleteRestore, openForm, init }
})
