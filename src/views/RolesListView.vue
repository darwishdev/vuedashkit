 

<script setup lang="ts">
import type { ApiResponseList, ITableHeader } from '@/types/types';
import AppTable from '@/components/data/AppTable.vue';
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderTag, TableHeaderLink, TableHeaderDate } from '@/utils/table/TableHeader'
import { useInfiniteQuery } from "@tanstack/vue-query";
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { data, suspense } = useInfiniteQuery({
    queryKey: ['rolesList'],
    queryFn: () => apiClient.rolesList({})
});
await suspense();
const headers: Record<string, ITableHeader> = {
    'roleId': new TableHeaderLink('roleId', {
        sortable: true,
        router: {
            name: "roles_find",
            paramName: "id",
            paramColumnName: "roleId",
        }

    }),
    'roleName': new TableHeaderText('roleName', {
        sortable: true,
        filter: {
            mode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-3",
                name: "roleName",
                placeholder: t("roleName")
            }
        }
    }),
    'permissionsCount': new TableHeaderTag('permissionsCount', {
        sortable: true,
        filter: {
            mode: FilterMatchMode.BETWEEN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-3",
                name: "permissionsCount",
                placeholder: t("permissionsCountMoreThan")
            }
        }
    }),
    'usersCount': new TableHeaderTag('usersCount', {
        sortable: true,
        filter: {
            mode: FilterMatchMode.BETWEEN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-3",
                name: "usersCount",
                placeholder: t("usersCountMoreThan")
            }
        }
    }),
    'createdAt': new TableHeaderDate('createdAt', {
        sortable: true,
        filter: {
            mode: FilterMatchMode.DATE_AFTER,
            input: {
                $formkit: 'datepicker',
                outerClass: "col-3",
                name: "createdAt",
                placeholder: t("createdAt")
            }
        }
    }),

} 
</script>
<template>
    <Suspense timeout="0">
        <template #default>
            <AppTable data-key="roleId" :apiResponse="(data!.pages[0].toJson() as any)" :headers="headers">
            </AppTable>
        </template>
        <template #fallback>
            <h2>loading table component</h2>
        </template>
    </Suspense>
</template>
