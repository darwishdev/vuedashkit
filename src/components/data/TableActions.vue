 

<script setup lang="ts">
import { h, resolveComponent, inject, ref } from 'vue';
import type { TableActionsProps, AppFormDialogProps } from '@/types/types'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';
import { useDialogStore } from '@/stores/dialog';
import { saveAs } from 'file-saver';
import Menu from 'primevue/menu';
import { useNotificationStore } from "@/stores/notification";
import { useTableNewStore } from '@/stores/tablenew';
import { useThemeStore } from '@/stores/theme';
import { ObjectKeys } from '@/utils/object/object';
const themeStore = useThemeStore()

const tableStore = useTableNewStore()
const notificationStore = useNotificationStore()
const props = defineProps<TableActionsProps>();
const emit = defineEmits<{
    (e: 'export'): void
}>();
const importMenuRef = ref();
const appBtnComponent = resolveComponent('app-btn')
const router = useRouter()
const dialogStore = useDialogStore()
const formkitComp = resolveComponent('FormKit')
const baseImport = inject('baseImportDataUrl') || '' as string
const { t } = useI18n()
const renderCreateBtn = () => {
    if (!props.options!.createHandler) {
        return
    }
    return h(appBtnComponent, {
        icon: "plus",
        class: "success",
        onClick: (_e: Event) => {
            if (props.formSections) {
                console.log("hola")
                const params: AppFormDialogProps = {
                    sections: props.formSections,
                    handler: props.options.createHandler!
                }
                dialogStore.openForm(params)
                return
            }
            router.push({ name: props.options!.createHandler!.routeName })
        },
        label: t("create")
    })
}
const renderDeleteRestoreBtn = () => {
    if (!props.options.deleteRestoreHandler) {
        return
    }
    const variant = tableStore.deleteRestoreVaraints
    return h(appBtnComponent, {
        icon: variant.icon,
        class: "danger",
        disabled: tableStore.modelSelectionRef.length == 0,
        onClick: (_e: Event) => {
            dialogStore.openDeleteRestore()
        },
        label: t(variant.label)
    })
}


const importDataFromFile = (value: any) => {
    themeStore.startProgressBar()
    const formData = new FormData();
    formData.append('File', value[0].file);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${baseImport}${props.options.importHandler!.endpoint}`, true);
    // Set up event listeners for the XMLHttpRequest
    xhr.onload = async () => {
        if (xhr.status === 200) {
            // Handle success
            notificationStore.showSuccess("imported_summary", "imported_detail")
            await tableStore.refetchData()
            themeStore.stopProgressBar()

        } else {
            // Handle error

            notificationStore.showError("imported_error_summary", "imported_error_detail")
            console.error('File upload failed:', xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = function () {
        // Handle network errors
        console.error('Network error during file upload');
    };

    // Send the FormData with the file
    xhr.send(formData);

}

const renderImportMenu = () => {
    if (!props.options.importHandler) {
        return
    }
    return h('div', {
        class: 'import-wrapper'
    }, [
        h(appBtnComponent, {
            icon: "upload",
            class: "warning",
            label: t("import"),
            onClick: (e: Event) => importMenuRef.value.toggle(e)
        }),
        h(Menu, {
            ref: (el) => importMenuRef.value = el,
            class: "import-menu",
            popup: true
        }, {
            'start': () => h(appBtnComponent, {
                label: t("download_template"),
                class: 'w-full no-margin  p-3 transparent',
                onClick: (_e: Event) => saveAs(`${baseImport}${props.options.importHandler!.importTemplateLink}`),
                icon: 'download'
            }),
            'end': () => h(formkitComp, {
                type: "file",
                label: t("upload"),
                accept: ".csv,.xls,.xlsx",
                onInput: importDataFromFile
            })
        })
    ])
}

const renderExportBtn = () => {
    if ((typeof props.exportable != 'undefined' && props.exportable == false) || !tableStore.dataListElementRef) return
    return h(appBtnComponent, {
        icon: "download",
        class: "info",
        onClick: (e: Event) => {
            console.log('fromactions', tableStore.dataListElementRef.exportCSV, ObjectKeys(tableStore.dataListElementRef))
            tableStore.dataListElementRef.exportCSV()
        },
        label: t("export")
    })
}
const renderTableActions = () => {
    return h('div', {
        class: "table-actions"
    }, [
        h('div', {
            class: 'start'
        }, [
            renderCreateBtn(),
            renderDeleteRestoreBtn()
        ]),
        h('div', {
            class: 'end'
        }, [

            renderExportBtn(),

            renderImportMenu(),
        ])
    ])

}
</script>
<template>
    <component :is="renderTableActions()" />
</template>



<style scoped deep lang="scss">
.table-actions {
    border: 2px solid var(--color-card);
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    flex-wrap: wrap;
    gap: 10px;


    & .app-btn {
        color: #fff;
        width: 120px;
    }

    & .start {
        flex-wrap: wrap;
        display: flex;
        gap: 10px;

        @media (max-width : 676px) {
            flex: 1;
            justify-content: center;
        }
    }

    & .end {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;




        .import-wrapper {
            max-width: 120px;
        }
    }
}
</style>@/types/types