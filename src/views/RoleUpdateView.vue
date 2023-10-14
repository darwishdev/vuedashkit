<script  lang="ts">
function mockLoad() {
    return new Promise(r => setTimeout(r, 1000))
}
</script>

<script setup lang="ts">
import AppForm from '@/components/form/AppForm.vue';
import type { RoleUpdateResponse, RoleFindForUpdateRequest, RoleUpdateRequest } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import type { AppFormProps, FindHandler } from '@/types/types';
import apiClient from '@/api/ApiClient';
import { useI18n } from 'vue-i18n';
import { ObjectKeys } from '@/utils/object/object';
const { t } = useI18n()
await mockLoad()

const findHandler: FindHandler<RoleFindForUpdateRequest, RoleUpdateRequest> = {
    endpoint: apiClient.roleFindForUpdate,
    requestPropertyName: 'roleId'
}

const formProps: AppFormProps<RoleUpdateRequest, RoleUpdateResponse> = {
    title: "role_update",
    findHandler: findHandler,
    submitHandler: {
        endpoint: apiClient.roleUpdate,
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
        'security': {
            isTitleHidden: true,
            isTransparent: true,
            inputs: [
                {
                    $cmp: 'FormKit',

                    props: {
                        outerClass: "w-full",
                        type: 'permissions',
                        name: 'permissions',
                        onInput: (req: any) => {
                            console.log('any', ObjectKeys(req), req, req[0])
                        },
                    }
                }
            ]
        }
    }
}
</script>
<template>
    <Suspense timeout="0">
        <template #default>
            <app-form :findHandler="formProps.findHandler" :title="formProps.title" :sections="formProps.sections"
                :submitHandler="formProps.submitHandler" />
        </template>
        <template #fallback>
            loading from role update
        </template>
    </Suspense>
</template>
 @/types/types