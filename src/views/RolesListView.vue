 

<script setup lang="ts">
import DataList from '@/components/data/DataList.vue';
import type { RolesListResponse, RolesListRow } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate, TableHeaderInput } from '@/utils/table/TableHeader'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { ITableHeader, DataListProps, TableRouter } from '@/types/types';
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore()
const { t } = useI18n()
themeStore.startProgressBar()

const { records, deletedRecords, options } = await apiClient.rolesList({})
themeStore.stopProgressBar()
const dataKey = "roleId"
const viewRouter: TableRouter = {
    name: "roles_find",
    paramName: "id",
    paramColumnName: dataKey
}

const formSections = {
    'role_info': {
        isTitleHidden: true,
        isTransparent: true,
        inputs: [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "roleName",
                validation: "required",
                placeholder: t("roleName"),
                label: t("roleName")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "text",
                outerClass: "col-12 sm:col-6 md:col-7",
                name: "roleDescription",
                placeholder: t("roleDescription"),
                label: t("roleDescription")
            },
        ]
    }
}
const headers: Record<string, ITableHeader> = {
    'roleId': new TableHeaderLink('roleId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'roleName': new TableHeaderText('roleName', {
        sortable: true,
        isGlobalFilter: true,

        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "roleName",
                placeholder: t("roleName")
            }
        }
    }),

    'permissionsCount': new TableHeaderInput('permissionsCount', {
        sortable: true,
        editInput: {
            type: 'unitQty',
            // prefixIcon: "tools",
            props: {
                buyUnit: "kg",
                sellUnit: "g",
                buyUnitValue: 100,
                sellUnitValue: 1,
            },
            outerClass: "col-12 ",
            name: "roleName",
            placeholder: t("roleName")
        },
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                numbmper: true,
                name: "permissionsCount",
                validationVisibility: "live",
                placeholder: t("permissionsCountMoreThan")
            }
        }
    }),
    'usersCount': new TableHeaderInput('usersCount', {
        sortable: true,

        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                number: true,
                name: "usersCount",
                placeholder: t("usersCountMoreThan")
            }
        }
    }),
    'createdAt': new TableHeaderDate('createdAt', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.DATE_AFTER,
            input: {
                $formkit: 'picker',
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "createdAt",
                placeholder: t("createdAt")
            }
        }
    }),
}


const tableProps: DataListProps<RolesListResponse, RolesListRow> = {
    context: {

        title: "roles",
        dataKey: "roleId",
        records: records,
        exportable: true,
        deletedRecords: deletedRecords,
        viewRouter: viewRouter,
        formSections,
        // displayType: "card",
        fetchFn: apiClient.rolesList,
        options: options!,
        headers
    }
}


</script>
<template>
    <Suspense timeout="0">
        <template #default>
            <DataList class="sm-column" :context="tableProps.context">
                <template #items.roleName="{ data }">
                    {{ data.roleName }}
                </template>
                <!-- <template #start="{ data }">
                    <div class="permissions">
                        <h3>{{ $t('permissions') }}</h3>
                        <h2>{{ data.permissionsCount }}</h2>
                    </div>
                    <div class="users">
                        <h3>{{ $t('users') }}</h3>
                        <h2>{{ data.usersCount }} </h2>

                    </div>
                </template>
                 
                <template #end="{ data }">
                    <h1>{{ data.roleName }} </h1>
                    <h4>{{ $t('createdAt') }} : </h4>
                    <span class="text-center"> {{ convertDateRedable(data.createdAt) }} </span>
                </template> -->
            </DataList>
        </template>
        <template #fallback>
            <h2>loading table component from roles list</h2>
        </template>
    </Suspense>
</template>


<style   lang="scss">
.card-start,
.card-end,
.card-start>div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card-start {
    background: var(--color-primary);
    gap: 5px;

    & h2,
    h3 {
        color: #fff !important;

    }

    & h2 {
        font-weight: 800;
        font-size: 32px;
    }
}
</style>