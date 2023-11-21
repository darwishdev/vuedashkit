<script  lang="ts">
const mockLoad = (): Promise<any> => {
    return new Promise(resolve => resolve(null))
}

</script>

<script setup lang="ts">
import AppForm from '@/components/form/AppForm.vue';
import type { RoleCreateRequest, RoleCreateResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import type { AppFormProps, ApiLevelStructure } from '@/types/types';

import apiClient from '@/api/ApiClient';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
await mockLoad()
const testFn = (req) => {
    console.log(req);
}

const formProps: AppFormProps<RoleCreateRequest, RoleCreateResponse> = {
    context: {
        title: "role_create",
        submitHandler: {
            endpoint: testFn,
            redirectRoute: "roles_list"
        },
        sections: {
            'role_info': [
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
                                // console.log('any', ObjectKeys(req), req, req[0])
                            },
                            toggleable: false

                        }
                    }
                ]
            }
        }
    }

}

</script>
<template>
    <app-form :context="formProps.context" />
</template> 