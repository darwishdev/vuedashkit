
<script setup lang="ts">
import { h, resolveComponent } from 'vue';
import type { AppTableParams } from '@/types/types';
import { type VNode, ref } from "vue";
import type { ColumnProps } from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useTableStore } from '@/stores/table'
const tableStore = useTableStore()

const columns = ref()
// const showDeletedData = ref(false)
const formkKitComponent = resolveComponent('form-kit-schema')
// const appIconBtn = resolveComponent('app-btn')

const props = defineProps<AppTableParams>();
// const generateActions = (data: any): VNode[] => {
//     const actions: VNode[] = []
//     const userCanUpdate = true
//     const userCanDeleteRestore = true
//     if (userCanUpdate) {
//         let updateFunc: () => void
//         if (props.dialogUpdate) {
//             updateFunc = () => {
//                 props.dialogUpdate?.openDialog(data[props.dataKey])
//             }
//         } else {
//             updateFunc = () => {
//                 // const routeName = getRouteVariation(currentRoute.value.name as string, 'update');
//                 // push({ name: routeName, params: { id: data[props.dataKey] } })
//             }
//         }
//         const updateBtn = h(appIconBtn, {
//             class: "edit-icon",
//             icon: 'pencil',
//             onClick: () => updateFunc()
//         })
//         actions.push(updateBtn)
//     }
//     if (userCanDeleteRestore && props.dialogDeleteRestore) {
//         const deleteRestoreFunc: () => void = () => {
//             props.dialogDeleteRestore?.openDialog([data[props.dataKey]])
//         }
//         const deleteBtn = h(appIconBtn, {
//             class: "remove-icon",
//             onClick: deleteRestoreFunc,
//             icon: 'trash',
//         })
//         const restoreBtn = h(appIconBtn, {
//             class: "restore-icon",
//             onClick: deleteRestoreFunc,
//             icon: 'refresh'
//         })
//         actions.push(deleteBtn, restoreBtn)
//     }
//     return actions
// }

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    roleName: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const prepareColumn = () => {
    
}

const generateColumns = () => {
    const columns: VNode[] = []
    const hederKeys = Object.keys(props.headers)
    for (const key of hederKeys) {
        const header = props.headers[key]
        const slots = {} as any
        if (header.filter.node) {
            slots['filter'] = () => {
                header.filter.node.onInput = (e: any) => {
                    filters.value.roleName.value = e
                }
                return h(formkKitComponent, { schema: header.filter.node })
            }
        }
        let columnProps: ColumnProps = {
            field: key,
            header: key,
            filterField: "roleName",
        }
        if (header.columnProps) {
            columnProps = { ...columnProps, ...header.columnProps }
        }
        const columnComp = h(Column, columnProps, slots)
        columns.push(columnComp)
    }
    return columns
}
const renderTable = () => {
    // first check for options to see if we want to show the checkbox column or not
    // if (props.options) {
    //     if (true) {
    //         const column = h(Column, {
    //             selectionMode: "multiple",
    //             exportable: false,
    //             style: "width: 3rem"
    //         })
    //         columns.push(column)
    //     }
    // }


    // if (true) {
    //     // const actions = 
    //     const column = h(Column, {
    //         exportable: false,
    //     }, {
    //         body: ({ data }: any) => h('div', { class: 'flex' }, generateActions(data)),
    //         header: () => h('th', `actions`)
    //     })
    //     columns.push(column)
    // }
    return h(DataTable, {
        filterDisplay: "row",
        value: props.data,
        filters: filters.value,
        "onUpdate:filters": (e) => {
            filters.value = e
            console.log(filters.value)
        }
    }, () => generateColumns());
}
</script>

<template>
    <component class="app-table" :is="renderTable()" />
    <!-- <div class="card app-table">
        <div class="table-actions">
            <div class="start">
                <app-btn icon="plus" class="success" label="create"></app-btn>
                <app-btn icon="trash" class="danger" label="delete"></app-btn>
            </div>
            <div class="end">
                <app-btn icon="download" class="info" label="export"></app-btn>
                <app-btn icon="upload" class="warning" label="import"></app-btn>
            </div>
        </div>
        <div class="table-title">
            <div class="start">
                <h1>
                    {{ $t(options.title) }}
                </h1>
            </div>
            <div class="end">
                <FormKit type="form" :actions="false" #default="{ value }">
                    <FormKit type="toggle" :label="$t('show_deleted_data')" v-model="showDeletedData" />
                </FormKit>
     </div>
    </div>
    <hr />
    <div class="table-filters">
        filters
    </div>
    </div> -->
</template>
