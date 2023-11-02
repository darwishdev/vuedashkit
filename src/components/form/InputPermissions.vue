
<script lang="ts">
import { type FormKitSchemaNode } from '@formkit/core'
import type { PermissionGroup } from '@/types/types'
import { ObjectKeys } from '@/utils/object/object';
type searchablePermission = {
    searchPermissions: string
    permissionGroup: string,
    permissions: Permission[]
}
const loadElemetns = (groups: PermissionGroup[], value: any): Promise<{ schema: Record<string, FormKitSchemaNode[]>, modelValues: Record<string, (number | undefined)[]>, searchablePermission: searchablePermission[], initiallySelectedItems: any[] }> => {
    return new Promise(async (resolve) => {


        const schema: Record<string, FormKitSchemaNode[]> = {}
        const modelValues: Record<string, (number | undefined)[]> = {}
        const initiallySelectedItems: any[] = []
        const searchablePermission: searchablePermission[] = []
        groups.forEach((group: PermissionGroup) => {
            const permissionsInputs: FormKitSchemaNode[] = []
            const modelValue: (number | undefined)[] = []
            for (let i = 0; i < group.permissions.length; i++) {
                const permission = group.permissions[i];
                permissionsInputs.push({
                    $formkit: "toggle",
                    label: permission.permissionName,
                    trueValue: permission.permissionId
                })
                if (value) {
                    if (value.includes(permission.permissionId)) {
                        modelValue.push(permission.permissionId)
                    } else {
                        modelValue.push(undefined)
                    }
                } else {
                    modelValue.push(undefined)
                }
            }
            const searchbleGroup = {
                permissionGroup: group.permissionGroup,
                permissions: group.permissions,
                searchPermissions: JSON.stringify(group.permissions)

            }
            const selectedItems = modelValue.filter(v => v)
            if (selectedItems.length == group.permissions.length) {
                // modelSelection.value = data
                initiallySelectedItems.push(searchbleGroup)
            }
            searchablePermission.push(searchbleGroup)

            schema[group.permissionGroup] = [
                {
                    $formkit: 'list',

                    children: [
                        {
                            $el: 'div',
                            attrs: {
                                class: "grid"
                            },
                            children: permissionsInputs
                        },
                    ]
                },
            ]
            modelValues[group.permissionGroup] = modelValue


        })

        resolve({ schema, modelValues, searchablePermission, initiallySelectedItems })
    })
}
</script>



<script setup lang="ts">
import type { ITableHeader, PermissionsListResponse } from '@/types/types';
import DataList from '@/components/data/DataList.vue';
import { ref, inject, watch } from 'vue'
import AppPanel from '../base/AppPanel.vue';
import { TableHeaderText, TableHeaderHidden } from '@/utils/table/TableHeader'
import { useTableNewStore } from '@/stores/tablenew';
import Column from 'primevue/column';
import type { DataListProps, InputPermissionsProps, Permission, PermissionsHandler } from '@/types/types';
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore()
const tableStore = useTableNewStore()
themeStore.startProgressBar()
const props = defineProps<InputPermissionsProps>();
const isModelSelectionBlocing = ref(false)
const isInputsFormBlocing = ref(false)
const permissionHandler = inject('permissionsHandler') as PermissionsHandler
const { records } = await permissionHandler.permissionsListAllEndpoint({})
const { modelValues, initiallySelectedItems, searchablePermission } = await loadElemetns(records, props.context.node._value)
const modelValuesRef = ref(modelValues)

themeStore.stopProgressBar()


const headers: Record<string, ITableHeader> = {
    'permissionGroup': new TableHeaderText('permissionGroup', {
        sortable: true,
        isGlobalFilter: true,
    }),
    'searchPermissions': new TableHeaderHidden('searchPermissions', {
        sortable: true,
        isGlobalFilter: true,
    }),

}


const tableProps: DataListProps<PermissionsListResponse, searchablePermission> = {
    title: "permissions",
    dataKey: "permissionGroup",
    records: searchablePermission,
    initiallySelectedItems: initiallySelectedItems,
    displayType: "table",
    options: {
        title: "permissions",
        description: "permissions_description"
    },
    headers
}
const emitEvent = () => {
    const keys = ObjectKeys(modelValuesRef.value)

    const permissions: number[] = []
    for (const key of keys) {
        const group = modelValuesRef.value[key]
        group.forEach(permission => {
            if (permission) permissions.push(permission)
            console.log('permission', permission)

        })
    }
    console.log("ana", modelValuesRef.value)
    props.context.node.input(permissions)
}
const permissionGroupUpdated = (v: any, data: any) => {
    if (isModelSelectionBlocing.value) return

    isInputsFormBlocing.value = true

    modelValuesRef.value[data.permissionGroup] = v
    const selectedItems = v.filter(v => v)
    if (selectedItems.length == data.permissions.length) {
        // modelSelection.value = data
        tableStore.modelSelectionRef.push(data)
    } else {
        const index = tableStore.modelSelectionRef.indexOf(data);
        if (index !== -1) {
            if (!tableStore.isAllRecordsSelected) {
                tableStore.modelSelectionRef.splice(index, 1);
            } else {
                const newModel = tableStore.modelSelectionRef.filter(res => res != data)
                tableStore.modelSelectionRef = newModel
            }
        }

    }

    // const filtered = modelValuesRef.value!.filter((v )=> v)
    emitEvent()
    setTimeout(() => isInputsFormBlocing.value = false, 100)

    console.log("updated group", selectedItems.length, data.permissions.length)
}
const modelSelectionRef = ref([])

watch(modelSelectionRef, async (newValue, oldValue) => {
    if (tableStore.isAllRecordsSelected) {
        newValue.forEach((group: any) => {
            const permissions: any[] = []
            group.permissions.forEach((permission: any) => {
                permissions.push(permission.permissionId)
            });
            modelValuesRef.value[group.permissionGroup] = permissions
        });
        emitEvent()
        return
    }
    if (newValue.length > oldValue.length) {
        console.log("attaching pemissions")
        newValue.forEach((group: any) => {
            const permissions: any[] = []
            group.permissions.forEach((permission: any) => {
                permissions.push(permission.permissionId)
            });
            modelValuesRef.value[group.permissionGroup] = permissions
        });
    } else {
        const removedItems = oldValue.filter((oldItem) => !newValue.includes(oldItem));
        removedItems.forEach((group: any) => {
            // Assuming modelValuesRef.value[group.permissionGroup] is an array of selected permissions
            modelValuesRef.value[group.permissionGroup] = [];
        });
    }
    emitEvent()
})
const dataListElementRef = ref()
const onUpdateModelSelection = (v: any) => {
    if (isInputsFormBlocing.value) return

    isModelSelectionBlocing.value = true
    console.log("selection val", v)
    modelSelectionRef.value = v
    setTimeout(() => isModelSelectionBlocing.value = false, 100)
}

const searchKey = ""
const onGlobalSearch = (v: any) => {
    console.log(Object.keys(dataListElementRef.value))
    if (!tableStore.tableFiltersRef) return
    tableStore.tableFiltersRef['global'].value = v ? v : null

    console.log("global search", v)
}
</script>
<template>
    <AppPanel class="input-permissions" header="Permissions" icon="shield"
        :toggleable="(props.context.toggleable as boolean)"
        :collapsed="props.context.toggleable && props.context.inputCollapsed">
        <template #headerEnd>
            <FormKit type="text" :placeholder="$t('search')" outerClass="global-search" :value="searchKey"
                prefixIcon="search" @input="onGlobalSearch" />

        </template>
        <DataList :initiallySelectedItems="tableProps.initiallySelectedItems" ref="dataListElementRef"
            @update:selection="onUpdateModelSelection" class="sm-column " :displayType="tableProps.displayType"
            :fetchFn="tableProps.fetchFn" :viewRouter="tableProps.viewRouter" :title="tableProps.title"
            :dataKey="tableProps.dataKey" :records="tableProps.records" :options="tableProps.options"
            :deletedRecords="tableProps.deletedRecords" :headers="tableProps.headers">
            <template #default>
                <Column style="width:100%;" header="permissionGroup" field="permissionGroup">

                    <template #body="{ data }">
                        <AppPanel :collapsed="props.context.groupCollapsed" class="permission-group-panel"
                            :header="data.permissionGroup" toggleable>
                            <div class=" permission-group grid">
                                <form-kit :id="data.permissionGroup" v-model="modelValuesRef[data.permissionGroup]"
                                    @input="(v) => permissionGroupUpdated(v, data)" type="list"
                                    :name="data.permissionGroup">

                                    <form-kit v-for="(permission, index) in data.permissions"
                                        :label="permission.permissionName" :onValue="permission.permissionId" :key="index"
                                        type="toggle" @input="null"></form-kit>
                                </form-kit>

                            </div>
                        </AppPanel>
                    </template>
                </Column>
                <Column :colspan="0" selectionMode="multiple" class="select-all">

                </Column>

            </template>

        </DataList>
    </AppPanel>
</template>


<style   lang="scss">
.input-permissions {
    width: 100%;

    &>.p-toggleable-content {
        & .p-panel-content {
            padding: 0;
            background: var(--color-card);
        }
    }


    & .permission-group-panel {
        & .p-panel-content {
            padding: 0;
            background: var(--color-card) !important;
            transform: translateY(9px);
        }
    }

    & .p-paginator-bottom {
        display: none;
    }

    & .p-datatable-header {
        display: none;
    }

    & .permission-group {
        gap: 20px;
        align-items: center;
        padding: 20px;
    }

    & .app-table.p-datatable .p-datatable-wrapper {
        padding: 0 !important;
    }

    .global-search {
        position: absolute;
        right: 100px;
        z-index: 2;
    }


    & .p-datatable-wrapper {
        background: transparent !important;
    }

    & .p-datatable-tbody td {
        border: none !important;
    }

    & .select-all {
        border: none !important;

        &.p-selection-column {
            padding: 0;
            width: 0;
            z-index: 3;
            position: absolute;
            right: 80px;
            top: 35px;
            display: flex;
            justify-content: center;
            align-content: center;
            align-items: center;
        }

    }

    & .p-datatable-thead tr {
        & td {
            border: none !important;
        }

        & th:first-child {
            display: none;
        }

        & th:last-child {

            width: 100%;
            position: relative;

            & .p-column-header-content {
                position: absolute;
                right: 70px;
            }

            & .select-all {
                text-align: right;
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
        }
    }

}

.p-datatable,
.formkit-form {
    width: 100%;
}


.app-card .start {
    background-color: transparent !important;
}
</style>@/types/types@/types/types