
<script lang="ts">
import { type FormKitSchemaNode, type FormKitNode } from '@formkit/core'
import type { PermissionGroup } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import { ObjectKeys } from '@/utils/object/object';


type searchablePermission = {
    searchPermissions: string
    permissionGroup: string,
    permissions: Permission[]
}
const loadElemetns = (groups: PermissionGroup[]): Promise<{ schema: Record<string, FormKitSchemaNode[]>, modelValues: Record<string, (number | undefined)[]>, searchablePermission: searchablePermission[] }> => {
    return new Promise(async (resolve) => {


        const schema: Record<string, FormKitSchemaNode[]> = {}
        const modelValues: Record<string, (number | undefined)[]> = {}
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

                modelValue.push(undefined)
            }
            searchablePermission.push({
                permissionGroup: group.permissionGroup,
                permissions: group.permissions,
                searchPermissions: JSON.stringify(group.permissions)

            })

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
        resolve({ schema, modelValues, searchablePermission })
    })
}
</script>



<script setup lang="ts">
import type { ITableHeader } from '@/types/types';
import DataList from '@/components/data/DataList.vue';
import type { PermissionsListResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import apiClient from '@/api/ApiClient';
import { resolveComponent, ref, watch } from 'vue'
import { TableHeaderText, TableHeaderHidden } from '@/utils/table/TableHeader'
import { useTableNewStore } from '@/stores/tablenew';
import { useI18n } from 'vue-i18n'
import type { DataListProps, InputPermissionsProps, Permission } from '@/types/newtypes';
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore()
const tableStore = useTableNewStore()
const formkitSchemaComp = resolveComponent('FormKitSchema')
const formkitComp = resolveComponent('FormKit')
const { t } = useI18n()
themeStore.startProgressBar()
const props = defineProps<InputPermissionsProps>();
const isModelSelectionBlocing = ref(false)
const isInputsFormBlocing = ref(false)

const { records } = await apiClient.permissionsList({})
const { schema, modelValues, searchablePermission } = await loadElemetns(records)
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
    title: "roles",
    dataKey: "permissionGroup",
    records: searchablePermission,
    deletedRecords: [],
    displayType: "table",
    options: {
        title: "permissions",
        description: "permissions_description"
    },
    headers
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

    setTimeout(() => isInputsFormBlocing.value = false, 100)

    console.log("updated group", selectedItems.length, data.permissions.length)
}
const modelSelectionRef = ref([])

watch(modelSelectionRef, async (newValue, oldValue) => {
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
})
// const permissionFormElementRef = ref({})


const onUpdateModelSelection = (v: any) => {
    if (isInputsFormBlocing.value) return

    isModelSelectionBlocing.value = true
    console.log("selection val", v)
    modelSelectionRef.value = v
    setTimeout(() => isModelSelectionBlocing.value = false, 100)

    // if (oldModelSelectionRef.value.length > v.length) {
    //     console.log("removing items")
    // } else {
    //     console.log("adding items")
    // }
    // oldModelSelectionRef.value = 
    // v.forEach((group: any) => {
    //     const permissions: any[] = []
    //     group.permissions.forEach((permission: any) => {
    //         permissions.push(permission.permissionId)
    //     });
    //     modelValuesRef.value[group.permissionGroup] = permissions
    // });
    // console.log("selection", ObjectKeys(v[0].permissions))
    // v.forEach((element: any) => {
    //     const ids: any[] = []
    //     element.permissions.forEach(permission => {
    //         ids.push(permission.permissionId)
    //     });

    //     console.log("element ", element)

    //     permissionFormElementRef.value[element.permissionGroup] = ids
    // });
}
</script>
<template>
    <Suspense timeout="0">
        <template #default>

            <DataList @update:selection="onUpdateModelSelection" class="sm-column" :displayType="tableProps.displayType"
                :fetchFn="tableProps.fetchFn" :viewRouter="tableProps.viewRouter" :title="tableProps.title"
                :dataKey="tableProps.dataKey" :records="tableProps.records" :options="tableProps.options"
                :deletedRecords="tableProps.deletedRecords" :headers="tableProps.headers">
                <template #expansion="{ data }">
                    <div class="p-3 grid">
                        <form-kit :id="data.permissionGroup" v-model="modelValuesRef[data.permissionGroup]"
                            @input="(v) => permissionGroupUpdated(v, data)" type="list" :name="data.permissionGroup">

                            <form-kit v-for="(permission, index) in data.permissions" :label="permission.permissionName"
                                :onValue="permission.permissionId" :key="index" type="toggle" @input="null"></form-kit>
                        </form-kit>

                    </div>
                </template>
            </DataList>


        </template>
        <template #fallback>
            <h2>loading table component from roles list</h2>
        </template>
    </Suspense>
</template>


<style   lang="scss">
.p-datatable,
.formkit-form {
    width: 100%;
}

.app-card .start {
    background-color: transparent !important;
}
</style>