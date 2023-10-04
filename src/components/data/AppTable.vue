 

<script setup lang="ts">

import { useTableStore } from '@/stores/table'
import { h, onBeforeMount, ref, resolveComponent } from 'vue';
import type { FormKitSchemaNode } from '@formkit/core'
import type { AppTableParams } from '@/types/types';
import DataTable, { type DataTableFilterMetaData } from 'primevue/datatable';
import type { VNode } from 'vue';
import { useI18n } from 'vue-i18n'
import { RouteQueryAppend, RouteQueryRemove } from '@/utils/router/query'
import Panel from 'primevue/panel';
import Menu from 'primevue/menu';
import { saveAs } from 'file-saver';
import { useDialogStore } from '@/stores/dialog';
import { useRouter } from 'vue-router';
import { ObjectKeys } from '@/utils/object/object'
import TableFilter from '@/components/data/TableFilter.vue'
import TableActions from '@/components/data/TableActions.vue'
import TableHeader from '@/components/data/TableHeader.vue'
import { FilterMatchMode } from 'primevue/api';
import type { AppTableFilter, FilterMatchModeValues, TableHeaderProps } from '@/types/newtypes';
const { t } = useI18n()
const tableStore = useTableStore()
const props = defineProps<AppTableParams>();
const router = useRouter()
const tableRef = ref()
const formkitComp = resolveComponent('FormKit')
const appBtnComponent = resolveComponent('app-btn')
const formkitSchemaComp = resolveComponent('FormKitSchema')
const importMenuRef = ref();
const filterFormRef = ref()
const filterFormValue = ref<Record<string, any>>()
const dialogStore = useDialogStore()

await tableStore.initTable(props)
onBeforeMount(() => {
    if (typeof router.currentRoute.value.query!.filterForm == 'undefined') return
    const filterForm = JSON.parse(router.currentRoute.value.query!.filterForm as string)
    filterFormValue.value = filterForm
    const activeFilters = ObjectKeys(filterFormValue.value!)
    for (const filter of activeFilters) {
        tableStore.bindFilterValue(filter, filterFormValue.value![filter])
    }
})

const schema: FormKitSchemaNode = {
    $el: "div",
    attrs: {
        class: "grid",
    },
    children: tableStore.filtersForm

}
const removeFilter = (input: string) => {
    const node = filterFormRef.value.node
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
    const node = filterFormRef.value.node
    node._value = {}
    node?.input({})
    tableStore.clearFilters()
}
const onFormInput = async (formValue: any) => {
    const keys = Object.keys(formValue)
    const forValueString = JSON.stringify(formValue)
    if (forValueString == "{}") {
        RouteQueryRemove('filterForm')
    } else {
        await RouteQueryAppend('filterForm', JSON.stringify(formValue))
    }

    for (const input of keys) {
        let currentInputValue = formValue[input]
        if (currentInputValue) {
            setTimeout(() => tableStore.bindFilterValue(input, currentInputValue), 300)
        }
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
            ref: "filterFormRef",
            type: "form",
            value: filterFormValue.value,
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
    if (!props.apiResponse.options!.createHandler) {
        return
    }
    return h(appBtnComponent, {
        icon: "plus",
        class: "success",
        onClick: (e) => {
            router.push({ name: props.apiResponse.options!.createHandler!.routeName })
        },
        label: t("create")
    })
}

const renderImportMenu = () => {
    if (!props.apiResponse.options!.importHandler) {
        return
    }
    return h('div', {
        class: 'import-wrapper'
    }, [
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
                class: 'w-full no-margin  p-3 transparent',

                onClick: (e: Event) => {
                    saveAs(`http://192.168.1.40:3000/${props.apiResponse.options!.importHandler!.importTemplateLink}`)
                },
                icon: 'download'
            }),
            'end': () => h(formkitComp, {
                type: "file",
                label: t("upload"),
                accept: ".csv,.xls,.xlsx",
                onInput: (v: any) => {
                    const formData = new FormData();
                    formData.append('File', v[0].file);

                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://192.168.1.40:3000/users/roles/file', true);

                    // Set up event listeners for the XMLHttpRequest
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            // Handle success
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
    if (!props.apiResponse.options!.deleteRestoreHandler) {
        return
    }
    return h(appBtnComponent, {
        icon: tableStore.deleteRestoreVaraints.icon,
        class: "danger",
        disabled: tableStore.modelSelection.length == 0,
        onClick: (_e: Event) => {
            dialogStore.openDeleteRestore()
        },
        label: t(tableStore.deleteRestoreVaraints.label)
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
            h('h1', t(props.apiResponse.options!.title))
        ]),
        h('div', {
            class: 'end'
        }, [
            h(formkitComp, {
                type: "toggle",
                value: tableStore.showDeletedData,
                onInput: (v: boolean) => {
                    tableStore.showDeletedData = v
                    tableStore.modelSelection = []
                    RouteQueryAppend('deleted', v)
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
            onClick: (e: Event) => {
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
        currentPageReportTemplate: `${t('showing')} {first} ${t('to')} {last} ${t('of')} {totalRecords}`,
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
            // h(TableFilter, {
            //     props: {
            //         filters: {
            //             roleName: {
            //                 mode: FilterMatchMode.CONTAINS,
            //                 input: {
            //                     $formkit: 'text',
            //                     prefixIcon: "tools",
            //                     outerClass: "col-3",
            //                     name: "roleName",
            //                     placeholder: t("roleName")
            //                 }
            //             }
            //         }
            //     }
            // })
        ]),
        empty: () => h('div', {
            class: "empty-table"
        }, [
            h("h3", t(tableStore.deleteRestoreVaraints.empty)),
            h("p", t(`breif_${router.currentRoute.value.name as string}`)),
        ])
    });
}
const newFilters: Record<string, AppTableFilter> = {
    roleName: {
        matchMode: FilterMatchMode.STARTS_WITH,
        input: {
            $formkit: 'text',
            prefixIcon: "tools",
            outerClass: "col-3",
            name: "roleName",
            placeholder: t("roleName")
        }
    }
}

const tableFiltersRef = ref({})

const filtersUpdated = (val: Record<string, DataTableFilterMetaData>) => {
    tableFiltersRef.value = { ...val }
}

const tableHeader: TableHeaderProps = {
    title: "roles",
    showDeletedFilter: true,
    showGlobalSearchFilter: true
}
</script>




<template>
    <component class="app-table" :is="renderTable()" />
    <TableActions v-if="props.apiResponse.options" :options="props.apiResponse.options" />
    <Suspense timeout="0">
        <template #default>
            <div>
                <TableHeader :title="tableHeader.title" :showDeletedFilter="tableHeader.showDeletedFilter"
                    :showGlobalSearchFilter="tableHeader.showGlobalSearchFilter" />
                <pre>
                    {{ tableFiltersRef }}
                </pre>
            </div>
        </template>
        <template #fallback>
            <h2>loading filters from app table </h2>
        </template>
    </Suspense>
</template>

