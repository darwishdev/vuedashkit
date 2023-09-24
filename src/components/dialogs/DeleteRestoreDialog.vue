<script setup lang="ts">
import { inject } from "vue";
import { useTableStore } from "@/stores/table";
import apiClient from "@/api/ApiClient";

const dialogRef = inject("dialogRef") as any;
const tableStore = useTableStore()
const close = (e: any) => {
    dialogRef.value.close(e);
};
const confirm = () => {
    const func = apiClient['roleDeleteRestore']


    func({ roleIds: tableStore.selectedIds }).then(res => {
        console.log("res", res)
    }).catch(e => {
        console.log("eerrror", e)
    })
    // console.log()
};
</script>

<template>
    <div class="delete-restore-dialog">
        <i class="pi pi-trash"></i>
        <h2>{{ $t('delete_dialog_title') }}</h2>
        <p>{{ $t('delete_dialog_breif') }}
        </p>
        <div class="actions">
            <app-btn icon="check" @click="confirm" :label="$t('confirm')" class="success"></app-btn>
            <app-btn icon="times" @click="close" :label="$t('canel')" class="danger"></app-btn>
        </div>
    </div>
</template>