<script lang="ts">
import type { AppTableFilter, ITableHeader } from '@/types/newtypes'
import { ObjectKeys } from '@/utils/object/object';
import type { FormKitSchemaNode } from '@formkit/core';
import router from '@/router';
import type { DataTableFilterMetaData } from 'primevue/datatable';
import type { ColumnProps } from 'primevue/column';
import type { VNode } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { stringify } from 'querystring';



type ColumnSlots = { body: ({ data }) => VNode[] }
// this function called while the component is on loading 
const loadElements = (headers: Record<string, ITableHeader>, t: Function): Promise<{
    inputsSchema: FormKitSchemaNode[],
    tableFilters: Record<string, DataTableFilterMetaData>,
    activeFilters: Record<string, (string | number | Date)>,
    filterFormValue: Record<string, (string | number | undefined)>
    tableColumns: { props: ColumnProps, slots: ColumnSlots | null }[]
    deletedFilter: boolean,
    globalFilters: string[],
    searchKey: string,
}> => {
    return new Promise((resolve: Function) => {
        const filterFormStr: string | undefined = router.currentRoute.value.query.filterForm as string
        const filterForm = filterFormStr ? JSON.parse(filterFormStr) : {}
        const deletedFilterStr: string | undefined = router.currentRoute.value.query.showDeleted as string
        const searchKeyParam: string | undefined = router.currentRoute.value.query.search as string
        const keys = ObjectKeys(headers)
        const inputsSchema: FormKitSchemaNode[] = []
        const filterFormValue: Record<string, (string | number | null)> = {}
        const tableFilters: Record<string, DataTableFilterMetaData> = {}
        const tableColumns: { props: ColumnProps, slots: ColumnSlots | null }[] = []
        const activeFilters: Record<string, (string | number | Date)> = {}
        const deletedFilter = deletedFilterStr ? deletedFilterStr == 'true' : false
        const searchKey = searchKeyParam ? searchKeyParam : ""
        const globalFilters: string[] = []
        for (const key of keys) {
            const currentValue = headers[key]
            const inputFilter = currentValue.filter
            if (inputFilter) {
                inputsSchema.push(inputFilter.input)
                tableFilters[key] = {
                    value: filterForm[key] || null,
                    matchMode: inputFilter.matchMode
                }
                filterFormValue[key] = filterForm[key]
                if (filterForm[key]) {
                    activeFilters[key] = filterForm[key] || null
                }
            }

            if (currentValue.isGlobalFilter) {
                globalFilters.push(key)
            }
            let columnProps: ColumnProps = {
                field: key,
                header: t(key),
                filterField: key,
            }
            if (currentValue.columnProps) {
                columnProps = { ...columnProps, ...currentValue.columnProps }
            }
            let columnSlots: ColumnSlots | null = null
            if (typeof currentValue.renderHtml == 'function') {
                const renderFunc = currentValue.renderHtml as (row: any) => VNode
                columnSlots = {
                    body: (slotProps) => [renderFunc(slotProps.data)],
                }
            }
            tableColumns.push({ props: columnProps, slots: columnSlots })
        }


        const hasGlobalFilters = globalFilters.length > 0
        if (hasGlobalFilters) {
            tableFilters['global'] = {
                matchMode: FilterMatchMode.CONTAINS,
                value: null
            }
        }

        resolve({
            inputsSchema,
            filterFormValue,
            activeFilters,
            tableColumns,
            tableFilters,
            globalFilters,
            deletedFilter,
            searchKey
        })

    })
}
</script> 

<script setup lang="ts">
import TableActions from './TableActions.vue';
import TableHeader from './TableHeader.vue';
import TableFilter from './TableFilter.vue';
import { useDialogStore } from '@/stores/dialog';
import { useTableNewStore } from '@/stores/tablenew';
import Column from 'primevue/column';
import type { TRecordDefault, AppTableProps, ApiResponseList, InitTableParams } from '@/types/newtypes';
import DataTable from 'primevue/datatable';
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router';
import { h, resolveComponent, ref } from 'vue'
const appBtnComponent = resolveComponent('app-btn')

const dialogStore = useDialogStore()
const { t } = useI18n()
const route = useRoute()
const tableRefElement = ref()

const slots = defineSlots<{
    start(props: { data: any }): any
    end(props: { data: any }): any
}>()
const props = defineProps<AppTableProps<any, any>>();

const { inputsSchema,
    filterFormValue,
    activeFilters,
    tableColumns,
    globalFilters,
    tableFilters,
    deletedFilter,
    searchKey } = await loadElements(props.headers, t)



const exportCSV = () => {
    tableRefElement.value.exportCSV()()
}

const initTableParams: InitTableParams<ApiResponseList<TRecordDefault>, TRecordDefault> = {
    records: props.records,
    deletedRecords: props.deletedRecords,
    dataKey: props.dataKey as string,
    fetchFn: props.fetchFn,
    deletedFilter
}
const tableStore = useTableNewStore()
tableStore.initTable(initTableParams)
const tableFiltersRef = ref(tableFilters)


const renderViewBtn = (data: any) => {
    if (!props.viewRouter) return
    const { name, paramColumnName, paramName } = props.viewRouter
    const params = {}
    params[paramName] = data[paramColumnName]
    return h(appBtnComponent, {
        class: "info",
        icon: "eye",
        onClick: () => {
            router.push({ name, params })
        }
    })
}

const renderUpdateBtn = (data: any) => {
    if (!props.options.updateHandler) return
    const { routeName } = props.options.updateHandler
    const params = { id: data[props.dataKey] }
    return h(appBtnComponent, {
        class: "warning",
        icon: "pencil",
        onClick: () => {
            router.push({ name: routeName, params })
        }
    })
}
const renderDeleteRestoreBtn = (data: any) => {
    if (!props.options.deleteRestoreHandler) return
    return h(appBtnComponent, {
        icon: tableStore.deleteRestoreVaraints.icon,
        class: "danger",
        onClick: () => {
            tableStore.modelSelectionRef = [data]
            dialogStore.openDeleteRestore()
        }
    })
}


const renderCardColumns = () => {
    const selectAllColumn = renderSelectAllColumn()
    const startColumn = h(Column, { class: 'card-start' }, { body: (props) => slots.start(props) })
    const endColumn = h(Column, { class: 'card-end' }, { body: (props) => slots.end(props) })
    const columns: VNode[] = [
        startColumn,
        endColumn,
        selectAllColumn
    ]
    const actionsColumn = renderActionsColumn()
    if (actionsColumn) columns.push(actionsColumn)

    return columns
}


const renderSelectAllColumn = () => {
    return h(Column, {
        selectionMode: 'multiple',
        headerStyle: {
            width: "3rem"
        }
    })

}

const renderColumns = () => {
    if (props.displayType == 'card') return renderCardColumns()
    const selectAllColumn = renderSelectAllColumn()
    const columns: VNode[] = [
        selectAllColumn
    ]
    tableColumns.forEach((columnObj) => {
        const columnNode = h(Column, columnObj.props, columnObj.slots ? { body: columnObj.slots.body } : {})
        columns.push(columnNode)
    })
    const actionsColumn = renderActionsColumn()
    if (actionsColumn) columns.push(actionsColumn)

    return columns
}

const renderActionsColumn = () => {
    if (!props.options.updateHandler && !props.options.deleteRestoreHandler && !props.viewRouter) return

    const actionsColumn = h(Column, {
        header: 'actions',
        class: "actions-btns",
        headerStyle: {
            width: "3rem"
        },
    }, {
        body: ({ data }) => h('div', {
            class: "flex "
        }, [
            renderViewBtn(data),
            renderUpdateBtn(data),
            renderDeleteRestoreBtn(data)
        ])
    })
    return actionsColumn
}
const renderTable = () => {
    return h(DataTable, {
        value: tableStore.data,
        rows: 10,
        maxHeight: 200,
        ref: "tableRefElement",
        // scrollable: false,
        paginator: true,
        selection: tableStore.modelSelectionRef,
        globalFilterFields: globalFilters,
        filters: tableFiltersRef.value,
        "onUpdate:selection": (e: any) => {
            tableStore.modelSelectionRef = e
        },
        "onUpdate:filters": (e: Event) => {
            console.log(e)
        },

        paginatorTemplate: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",
        currentPageReportTemplate: `${t('showing')} {first} ${t('to')} {last} ${t('of')} {totalRecords}`,
    }, {
        default: () => renderColumns(),
        header: () => h('div', null, [
            h(TableActions, {
                options: props.options, onExport: () => {
                    exportCSV()
                }
            }),
            h(TableHeader, {
                deletedFilter,
                searchKey,
                title: props.options.title,
                displayType: props.displayType,
                showGlobalSearchFilter: globalFilters.length > 0,
                "onUpdate:globalSearch": (val: any) => {
                    tableFiltersRef.value['global'].value = val ? val : null
                }
            }),
            h(TableFilter, {
                inputsSchema,
                tableFilters,
                activeFilters,
                filterFormValue,
                "onUpdate:tableFilters": (val: any) => {
                    tableFiltersRef.value = { ...val }
                }
            })
        ]),
        empty: () => h('div', {
            class: "empty-table"
        }, [
            h("h3", t(tableStore.deleteRestoreVaraints.empty)),
            h("p", t(`breif_${route.name as string}`)),
        ])

    })
}
</script>

<template>
    <component class="app-table" :class="{ 'table-card': props.displayType == 'card' }" :is="renderTable()" />
</template>


<style   lang="scss">
.app-table {
    & .p-paginator-bottom {
        background-color: var(--color-card);
        border-radius: 0 0 20px 20px;

        & .p-paginator {
            background-color: transparent;
            border: none;
        }
    }



    &.p-datatable {
        &>div {
            background-color: var(--color-card);
        }

        & .p-datatable-wrapper {
            padding: 0 20px;
        }

        & .p-datatable-tbody>tr {
            padding: 0 20px;
            background-color: transparent;
        }

        & .p-datatable-thead {
            background-color: transparent;
        }

        & .p-datatable-thead>tr {
            background-color: transparent;
        }

        & .p-datatable-thead>tr>th {
            background-color: transparent;
        }

        & .p-datatable-header {
            border-radius: 20px 20px 0 0;
            border: none;
        }


    }

    & .empty-table {
        text-align: center;

        & h3 {
            max-width: 500px;
            padding: 5px;
            background-color: var(--color-danger);
            margin: 20px auto;
            border-radius: 6px;
            text-transform: uppercase;
        }

        & p {
            max-width: 800px;
            padding: 25px;
            background-color: var(--color-card);
            margin: 20px auto;
            border-radius: 6px;
        }
    }


    &.table-card {

        width: 100%;

        & thead {
            display: none;
        }

        & table {
            display: flex;
            width: 100%;
        }

        & tbody {
            display: flex;
            width: 100% !important;
            flex-wrap: wrap;
            gap: 20px;

            & tr.p-datatable-emptymessage {
                display: flex;
                justify-content: center;
                width: 100%;

            }

            & tr:not(.p-datatable-emptymessage) {
                background: var(--color-card) !important;
                border-radius: 6px;
                display: flex;
                padding: 0 !important;
                width: calc(100% / 3 - 15px);





                & td {
                    position: relative;
                    border: none;

                    &.p-selection-column {
                        position: absolute !important;
                        top: 10px;
                        left: calc(30% + 10px);
                        padding: 0 !important;
                    }

                    &.actions-btns {
                        position: absolute;
                        top: 0;
                        right: 0;
                    }

                    &.card-start {
                        height: 100%;
                        width: 30%;
                        border-radius: 6px 0 0 6px;
                    }

                    &.card-end {
                        height: 100%;
                        padding-top: 3rem;
                        width: 70%;
                        border-radius: 0 6px 6px 0;

                        & h1 {
                            max-width: 80%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }




                }

            }
        }
    }
}

.p-datatable-table {
    width: 100%;
}
</style>


