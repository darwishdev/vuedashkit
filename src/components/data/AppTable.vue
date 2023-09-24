 

<script setup lang="ts">

import { useTableStore } from '@/stores/table'
import { h, ref, resolveComponent } from 'vue';
import type { FormKitSchemaNode } from '@formkit/core'
import type { AppTableParams } from '@/types/types';
import DataTable from 'primevue/datatable';
import type { VNode } from 'vue';
import { useI18n } from 'vue-i18n'
import DeleteRestoreDialog from '@/components/dialogs/DeleteRestoreDialog.vue'
import Panel from 'primevue/panel';
import Menu from 'primevue/menu';
const { t } = useI18n()
import { useDialogStore } from '@/stores/dialog';
import { useRouter } from 'vue-router';
const tableStore = useTableStore()
const props = defineProps<AppTableParams>();
const router = useRouter()
const tableRef = ref()
const loaded = await tableStore.initTable(props)
const formkitComp = resolveComponent('FormKit')
const appBtnComponent = resolveComponent('app-btn')
const formkitSchemaComp = resolveComponent('FormKitSchema')
const importMenuRef = ref();
const filterForm = ref()
const dialogStore = useDialogStore()



const schema: FormKitSchemaNode = {
    $el: 'div',
    attrs: {
        class: 'grid'
    },
    children: tableStore.filtersForm
}
const removeFilter = (input: string) => {
    const node = filterForm.value.node
    if (node?._value) {
        node._value[input] = undefined
    }
    node.input(node?._value)
    tableStore.removeFilter(input)
}

const toggleImportMenu = (event) => {
    importMenuRef.value.toggle(event);
};

const clearFilters = () => {
    const node = filterForm.value.node
    node._value = {}
    node?.input({})
    tableStore.clearFilters()
}
const onFormInput = (formValue: any) => {
    const keys = Object.keys(formValue)
    for (const input of keys) {
        let currentInputValue = formValue[input]
        setTimeout(() => tableStore.bindFilterValue(input, currentInputValue), 300)
    }
}

const renderFilterForm = () => {
    // Panel
    return h(Panel, {
        class: "table-filters",
        toggleable: true,
    }, {
        header: () => h('div', {
            class: 'filters-header'
        }, [
            h('i', { class: 'pi pi-filter' }),
            h("span", t("filters")),
            renderActiveFilters()
        ]),

        icons: () => renderClearFiltersButton(),
        togglericon: ({ collapsed }) => h('i', { class: collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up' }),

        default: () => h(formkitComp, {
            id: "filter-form",
            ref: "filterForm",
            type: "form",
            actions: false,
            onInput: onFormInput
        },
            () => h(formkitSchemaComp, {
                schema: schema
            })
        )
    })


}



const renderCreateBtn = () => {
    if (!props.apiResponse.options.createHandler) {
        return
    }
    return h(appBtnComponent, {
        icon: "plus",
        class: "success",
        onClick: (e) => {
            router.push({ name: props.apiResponse.options.createHandler.routeName })
        },
        label: t("create")
    })
}

// <Button type="button" label = "Toggle" @click="toggle" aria - haspopup="true" aria - controls="overlay_menu" />
//     <Menu ref="menu" id = "overlay_menu" : model = "items" : popup = "true" />
//         <Toast />

const getExtension = (name) => {
    return name.slice(name.lastIndexOf('.') + 1);
}
const createFileUploadRequest = (file, ext) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileData = new Uint8Array(event.target!.result as ArrayBuffer);
            const fileName = `${new Date().toLocaleString()}.${ext}`
            resolve({ fileName, fileData });
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsArrayBuffer(file);
    });
}
const renderImportMenu = () => {
    if (!props.apiResponse.options.importHandler) {
        return
    }
    return h('span', null, [
        h(appBtnComponent, {
            icon: "download",
            class: "warning",
            label: t("import"),
            onClick: toggleImportMenu
        }),
        h(Menu, {
            ref: "importMenuRef",
            class: "import-menu",
            popup: true
        }, {
            'start': () => h(appBtnComponent, {
                label: t("download_template"),
                class: 'w-full no-margin p-3 transparent',
                icon: 'download'
            }),
            'end': () => h(formkitComp, {
                type: "file",
                label: t("upload"),
                accept: ".csv,.xls,.xlsx",
                onInput: (v: any) => {
                    console.log(v)
                    const formData = new FormData();
                    formData.append('File', v[0].file);

                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://192.168.1.40:3000/users/roles/file', true);

                    // Set up event listeners for the XMLHttpRequest
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            // Handle success
                            console.log(xhr.responseText);
                        } else {
                            // Handle error
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
            })
        })
    ])
}

const renderDeleteRestoreBtn = () => {
    if (!props.apiResponse.options.deleteRestoreHandler) {
        return
    }
    return h(appBtnComponent, {
        icon: tableStore.deleteRestoreBtn.icon,
        class: "danger",
        disabled: tableStore.modelSelection.length == 0,
        onClick: (_e: Event) => {
            dialogStore.openDeleteRestore()
        },
        label: t(tableStore.deleteRestoreBtn.label)
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
            h(appBtnComponent, {
                icon: "download",
                class: "info",
                onClick: (e: Event) => {
                    console.log(tableRef)
                    tableRef.value.exportCSV()
                },
                label: t("export")
            }),
            renderImportMenu()

        ])
    ]
    );
}

const renderTableHeader = () => {
    return h('div', {
        class: "table-title"
    }, [
        h('div', {
            class: 'start'
        }, [
            h('h1', t(props.apiResponse.options.title))
        ]),
        h('div', {
            class: 'end'
        }, [
            h(formkitComp, {
                type: "toggle",
                value: tableStore.showDeletedData,
                onInput: (v: boolean) => {
                    tableStore.showDeletedData = v
                },
                label: t("show_deleted_data"),

            }),
            h(formkitComp, {
                type: "text",
                prefixIcon: 'search',
                placeholder: t("search"),

            })
        ])
    ]
    );
}

const renderActiveFilters = () => {

    if (Object.keys(tableStore.activeFilters).length == 0) {
        return
    }
    const activeFilters: VNode[] = []


    for (const key of Object.keys(tableStore.activeFilters)) {
        activeFilters.push(h('div', {
            class: "active-filter",
            onClick: (e) => {
                e.preventDefault();

                removeFilter(key)
            }
        }, [
            h("i", { class: 'pi pi-filter-slash' }),
            h("span", `${t(key)} : ${tableStore.activeFilters[key].value}`),
            h("i", { class: 'pi pi-times' }),
        ]))
    }

    return h("div", {
        class: "active-filters",

    }, activeFilters);
}


const renderClearFiltersButton = () => {

    if (Object.keys(tableStore.activeFilters).length == 0) {
        return
    }

    return h("a", {
        class: "pi pi-filter-slash",
        title: "clear filters",
        onClick: () => clearFilters()
    });
}
const renderTable = () => {
    return h(DataTable, {
        // filterDisplay: "row",
        value: tableStore.data,
        filters: tableStore.filters,
        scrollable: true,
        paginator: true,
        maxHeight: 200,
        ref: "tableRef",
        selection: tableStore.modelSelection,
        rows: 10,
        paginatorTemplate: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",
        currentPageReportTemplate: "Showing {first} to {last} of {totalRecords}",
        "onUpdate:filters": (e: Event) => {
            console.log(e)
        },
        "onUpdate:selection": (e: any) => {
            tableStore.modelSelection = e

        },
    }, {
        default: () => tableStore.columns,
        header: () => h("div", null, [
            renderTableActions(),
            renderTableHeader(),
            h('hr'),
            renderFilterForm(),
        ]),
        empty: () => h('div', {
            class: "empty-table"
        }, [
            h("h3", t(tableStore.deleteRestoreBtn.empty)),
            h("p", t(`breif_${router.currentRoute.value.name as string}`)),
        ])
    });
}
</script>




<template>
    <component class="app-table" :is="renderTable()" />
</template>
