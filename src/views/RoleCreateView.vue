<script  lang="ts">
const mockLoad = (): Promise<any> => {
    return new Promise(resolve => {
        apiClient.placesInputList({}).then(res => resolve(res))
    })
}

</script>

<script setup lang="ts">
import AppForm from '@/components/form/AppForm.vue';
import type { RoleCreateRequest, RoleCreateResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import type { AppFormProps, DependentDropdownLevels, ApiLevelStructure } from '@/types/types';

import apiClient from '@/api/ApiClient';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const rootOptins = await mockLoad()
const testFn = (req) => {
    console.log(req);
}

const formProps: AppFormProps<RoleCreateRequest, RoleCreateResponse> = {
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

            // {
            //     $cmp: 'FormKit',
            //     props: {
            //         outerClass: "w-full",
            //         innerClass: "grid",
            //         type: 'dependentDropdownModified',
            //         name: 'neighbourhoodId',
            //         data: apiClient.placesInputList,
            //         levels: {
            //             city: {
            //                 label: "city",
            //                 placeholder: "city",
            //                 optionsListFn: apiClient.citiesInputList,
            //                 prefixIcon: "flag",
            //                 outerClass: 'col-12  md:col-4'
            //             },
            //             district: {
            //                 label: "district",
            //                 optionsListFn: apiClient.districtsInputList,
            //                 placeholder: "district",
            //                 requestPropertyName: "cityId",
            //                 outerClass: 'col-12 md:col-4'
            //             },
            //             neighbourhood: {
            //                 label: "Neighbourhood",
            //                 optionsListFn: apiClient.neighbourhoodsInputList,
            //                 requestPropertyName: "districtId",
            //                 placeholder: "Neighbourhood",
            //                 outerClass: 'col-12   md:col-4'
            //             },
            //         } as DependentDropdownLevels,
            //         groupName: 'neighbourhoodId',

            //     }
            // },
            // {
            //     $cmp: 'FormKit',
            //     props: {
            //         outerClass: "w-full",
            //         innerClass: "grid",
            //         type: 'dependentDropdownModified',
            //         name: 'neighbourhoodId',
            //         data: apiClient.placesInputList,
            //         levels: {
            //             city: {
            //                 label: "city",
            //                 placeholder: "city",
            //                 prefixIcon: "flag",
            //                 outerClass: 'col-12  md:col-4'
            //             },
            //             district: {
            //                 label: "district",
            //                 placeholder: "district",
            //                 outerClass: 'col-12 md:col-4'
            //             },
            //             neighbourhood: {
            //                 label: "Neighbourhood",
            //                 placeholder: "Neighbourhood",
            //                 outerClass: 'col-12   md:col-4'
            //             },
            //         } as DependentDropdownLevels,
            //         groupName: 'neighbourhoodId',

            //     }
            // },
            // {
            //     $cmp: 'FormKit',
            //     props: {
            //         outerClass: "w-full",
            //         innerClass: "grid",
            //         type: 'dependentDropdownModified',
            //         name: 'neighbourhoodId',
            //         data: rootOptins,
            //         levels: {
            //             city: {
            //                 label: "city",
            //                 placeholder: "city",
            //                 prefixIcon: "flag",
            //                 outerClass: 'col-12  md:col-4'
            //             },
            //             district: {
            //                 label: "district",
            //                 placeholder: "district",
            //                 outerClass: 'col-12 md:col-4'
            //             },
            //             neighbourhood: {
            //                 label: "Neighbourhood",
            //                 placeholder: "Neighbourhood",
            //                 outerClass: 'col-12   md:col-4'
            //             },
            //         } as DependentDropdownLevels,
            //         groupName: 'neighbourhoodId',

            //     }
            // },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "w-full",
                    type: 'dependentDropdown',
                    name: 'Cities',
                    apiEndpoint: apiClient.placesInputList,
                    apiLevelsStructure: [
                        {
                            levelNumber: 1,
                            levelName: 'cityId',
                            levelLabel: 'City',
                            levelPlaceholder: 'choose your city',
                        },
                        {
                            levelNumber: 2,
                            levelName: 'districtId',
                            levelLabel: 'Districts',
                            levelPlaceholder: 'Choose your district',
                            parentLevelName: 'cityId'
                        },
                        {
                            levelNumber: 3,
                            levelName: 'neighbourhoodId',
                            levelLabel: 'Neighbourhoods',
                            levelPlaceholder: 'Choose your Neighbourhood',
                            parentLevelName: 'districtId'
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
    <app-form :title="formProps.title" outerClass="grid" :sections="formProps.sections"
        :submitHandler="formProps.submitHandler" />
</template> 