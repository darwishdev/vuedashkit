import { defineStore } from 'pinia'
import { h } from 'vue'
import DeleteRestoreDialog from '@/components/dialogs/DeleteRestoreDialog.vue'
import AppFormDialog from '@/components/dialogs/AppFormDialog.vue'
import AppForm from '@/components/form/AppForm.vue';
import type { DynamicDialogInstance, DynamicDialogOptions } from 'primevue/dynamicdialogoptions';
import type { AppFormDialogProps } from '@/types/types';
export const useDialogStore = defineStore('dialog', () => {
  let dialog: {
    open: (content: any, options?: DynamicDialogOptions) => DynamicDialogInstance;
  }

  const init = (dialogParam: { open: (content: any, options?: DynamicDialogOptions) => DynamicDialogInstance; }) => {
    dialog = dialogParam
  }
  const openDeleteRestore = () => {
    if (!dialog) return
    dialog.open(DeleteRestoreDialog, {
      props: {
        dismissableMask: true,
        closable: false,
        modal: true,
      },
    })
  }


  const openForm = (props: AppFormDialogProps) => {
    if (!dialog) return
    const comp = h(AppFormDialog, props)

    dialog.open(comp, {
      props: {
        dismissableMask: true,
        closable: false,
        modal: true,
        ...props
      },
    })
  }




  return { openDeleteRestore, init, openForm }
})
