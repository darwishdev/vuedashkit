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
import { ObjectKeys } from '@/utils/object/object';
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
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "roleName",
                placeholder: t("roleName")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "text",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "roleDescription",
                placeholder: t("roleDescription")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'image',
                    onInput: (req: any) => {
                        console.log('any', ObjectKeys(req), req, req[0])
                    },
                    value: "0.701566374267176.png",
                    // size: 500
                }
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
                        label: 'image',
                        name: 'permissions',
                        onInput: (req: any) => {
                            console.log('any', ObjectKeys(req), req, req[0])
                        },
                        toggleable: false

                    }
                }
            ]
        }
    }
}
</script>
<template>
    <app-form :title="formProps.title" :sections="formProps.sections" :submitHandler="formProps.submitHandler" />
</template>
 