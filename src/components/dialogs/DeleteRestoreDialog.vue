<script setup lang="ts">
import { inject } from "vue";
import { useTableNewStore } from "@/stores/tablenew";
import { useNotificationStore } from "@/stores/notification";
import apiClient from "@/api/ApiClient";


// const props = defineProps<TableHeaderProps>();
const dialogRef = inject("dialogRef") as any;
const tableStore = useTableNewStore()
const notificationStore = useNotificationStore()
const close = (e: any) => {
    dialogRef.value.close(e);
};
const confirm = () => {
    const func = apiClient['roleDeleteRestore']


    func({ roleIds: tableStore.selectedIds }).then((_) => {
        tableStore.deleteSelectedRows()
        dialogRef.value.close()
        notificationStore.showSuccess("deleted_summary", "deleted_detail")
    }).catch(e => {
        console.log("eerrror", e)
        notificationStore.showError("deleted_summary", e)

    })
};
</script>

<template>
    <div class="delete-restore-dialog">
        <i class="pi pi-trash"></i>
        <h2>{{ $t('delete_restore_dialog_title') }}</h2>
        <p>{{ $t(`${tableStore.deleteRestoreVaraints.label}_dialog_breif`) }}
        </p>
        <div class="actions">
            <app-btn icon="check" @click="confirm" :label="$t('confirm')" class="success"></app-btn>
            <app-btn icon="times" @click="close" :label="$t('canel')" class="danger"></app-btn>
        </div>
    </div>
</template>