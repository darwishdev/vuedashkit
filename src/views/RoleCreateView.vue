<script  lang="ts">
function mockLoad() {
    return new Promise(r => setTimeout(r, 1000))
}
</script>

<script setup lang="ts">
import AppForm from '@/components/form/AppForm.vue';
import type { RoleCreateRequest, RoleCreateResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import type { AppFormProps } from '@/types/newtypes';
import apiClient from '@/api/ApiClient';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
await mockLoad()


const formProps: AppFormProps<RoleCreateRequest, RoleCreateResponse> = {
    title: "role_create",
    submitHandler: {
        endpoint: apiClient.roleCreate,
        redirectRoute: "roles_list"
    },
    sections: {
        'role_info': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-4",
                name: "roleName",
                placeholder: t("roleName")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "text",
                outerClass: "col-12 sm:col-6 md:col-8",
                name: "roleDescription",
                placeholder: t("roleDescription")
            }

        ],
        'security': [
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "w-full",
                    type: 'permissions',
                    name: 'permissions',
                    permissions: [{ str: 1 }]
                }
            }
        ]
    }
}
</script>
<template>
    <Suspense timeout="0">
        <template #default>
            <app-form :title="formProps.title" :sections="formProps.sections" :submitHandler="formProps.submitHandler" />
        </template>
        <template #fallback>
            loading from role create
        </template>
    </Suspense>
</template>
 