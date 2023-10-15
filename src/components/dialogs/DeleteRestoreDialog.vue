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

<style lang="scss">
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.p-dialog {
    background: var(--color-background);

    & .p-dialog-header {
        background: transparent;
    }

    & .p-dialog-content {
        background: transparent;
    }
}

.delete-restore-dialog {
    text-align: center;

    & i {
        font-size: 1.5rem;
    }

    & h2 {
        font-size: 1.8rem;
    }

    & p {
        font-size: 1rem;
        max-width: 350px;
        text-align: center;
        margin: 0 auto 20px auto;
    }

    & .actions {
        @include flex-center;
    }

    & button {
        min-width: 150px;

        &.success {
            margin-inline-end: 20px;
        }
    }
}
</style>