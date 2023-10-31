<script  lang="ts">
function mockLoad() {
    return new Promise(r => setTimeout(r, 1))
}
</script>

<script setup lang="ts">
import AppForm from '@/components/form/AppForm.vue';
import type { RoleCreateRequest, RoleCreateResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import type { AppFormProps , dropdownSchema , ApiLevelStructure } from '@/types/types';
import type { FormKitSchemaNode } from '@formkit/core'
import { useFormStore } from '@/stores/form';
import apiClient from '@/api/ApiClient';
import { useI18n } from 'vue-i18n';
import { ObjectKeys } from '@/utils/object/object';
const { t } = useI18n()

const formStore = useFormStore()
await mockLoad()
// await setTimeout(() => { }, 20000)

const testFn = (req) => {
console.log(req);

}

const formProps: AppFormProps<RoleCreateRequest, RoleCreateResponse> = {
    title: "role_create",
    submitHandler: {
        endpoint: testFn,
        mapFunction : (req : any) => {
            console.log(req);
        },
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
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "roleDescription",
                placeholder: t("roleDescription"),
                label: t("roleDescription")
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
            },
            // {
            //     $cmp: 'FormKit',
            //     props: {
            //         outerClass: "w-full",
            //         type: 'dependentDropdown',
            //         name : 'Cities',
            //         groupName : 'Cities',
            //         dropdownsSchema : [
            //         {
            //             name : 'cityId',
            //             optionsListFn : apiClient.citiesInputList,
            //             elementProps : {
            //                 label : 'City',
            //                 placeholder : 'choose your city',
            //                 validation : 'required'
            //             }      
            //         },
            //         {
            //             name : 'roleId',
            //             optionsListFn : apiClient.rolesInputList,
            //             elementProps : {
            //                 label : 'Roles',
            //                 placeholder : 'choose your role',
            //                 validation : 'required',      
            //             }
            //         },
            //         {
            //             name : 'districtId',
            //             dataKey : 'cityId',
            //             dependsOn : 'cityId',
            //             optionsListFn : apiClient.districtsInputList,
            //             elementProps : {   
            //                 label : 'District',
            //                 placeholder : 'Choose your district',
            //                 validation : 'required',
            //             }
            //             // optionsListFn : apiClient.districtsInputList
            //         },
            //         {
            //             name : 'neighborhoodId',
            //             dataKey : 'districtId',
            //             elementProps : {   
            //                 label : 'Neighborhood',
            //                 placeholder : 'Choose your neighborhood',
            //                 validation : 'required',
            //             },
            //             dependsOn : 'districtId',
            //             optionsListFn : apiClient.neighbourhoodsInputList,
            //         }
            //     ] as Array<dropdownSchema>
            //     }
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "w-full",
                    type: 'dependentDropdown',
                    name : 'Cities',
                    apiEndpoint : apiClient.placesInputList,
                    apiLevelsStructure : [
                        {
                            levelNumber : 1,
                            levelName : 'cityId',
                            levelLabel : 'City',
                            levelPlaceholder : 'choose your city',
                        },
                        {
                            levelNumber : 2,
                            levelName : 'districtId',
                            levelLabel : 'Districts',
                            levelPlaceholder : 'Choose your district',
                            parentLevelName : 'cityId'
                        },
                        {
                            levelNumber : 3,
                            levelName : 'neighbourhoodId',
                            levelLabel : 'Neighbourhoods',
                            levelPlaceholder : 'Choose your Neighbourhood',
                            parentLevelName : 'districtId'
                        }
                    ] as Array<ApiLevelStructure>
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
                            // console.log('any', ObjectKeys(req), req, req[0])
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
     <app-form   :title="formProps.title" :sections="formProps.sections" :submitHandler="formProps.submitHandler" />
</template> 