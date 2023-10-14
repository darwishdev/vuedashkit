<script setup lang="ts">
import AppForm from '@/components/form/AppForm.vue';
import type { RoleCreateRequest, RoleCreateResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import type { AppFormProps } from '@/types/types';
import apiClient from '@/api/ApiClient';
import { useI18n } from 'vue-i18n';
import { ObjectKeys } from '@/utils/object/object';
const { t } = useI18n()

const formProps: AppFormProps<RoleCreateRequest, RoleCreateResponse> = {
    title: "role_create",
    submitHandler: {
        endpoint: apiClient.roleCreate,
        redirectRoute: "roles_list",
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
        // 'security': {
        //     isTitleHidden: true,
        //     isTransparent: true,
        //     inputs: [
        //         {
        //             $cmp: 'FormKit',

        //             props: {
        //                 outerClass: "w-full",
        //                 type: 'permissions',
        //                 name: 'permissions',
        //                 onInput: (req: any) => {
        //                     console.log('any', ObjectKeys(req), req, req[0])
        //                 },
        //                 toggleable: false,
        //             }
        //         }
        //     ]
        // }
    }
}
</script>

<template>
    <div>
        <h1 class="text-center">AppForm Component</h1>
        <p class="w-9 m-auto my-4 text-center">The AppForm component is a versatile form component designed to
            handle create and update features. It provides a flexible way to define form schemas and handle form
            submissions. This documentation will guide you through the usage and customization of the AppForm component.
        </p>
        <h2>Props</h2>
        <p>The AppForm component accepts the following props:</p>
        <div class="border-round p-5" style="background-color: var(--color-card);">
            <ol class="p-4">
                <li class="font-bold mt-1">
                    <h2>title (String, required):</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <h3 class="flex">Description: <p class="mx-2">The title to display above the form.</p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>sections (Object, required) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <h3 class="flex">Description: <p class="mx-2">The sections object defines the sections and
                                    fields of the form. Each section is represented by a key-value pair, where the key is
                                    the section name and the value is an array or an object representing the fields and the
                                    options for that section.</p>
                            </h3>
                            <p class="my-2 text-lg text-white">You can set some options for each section of inputs you
                                define : </p>
                            <ul>
                                <li>
                                    <h3>isTitleHidden (optiona; , boolean) :</h3>
                                    <p>Responsible for showing or hiding the section title</p>
                                </li>
                                <li>
                                    <h3>isTransparent (optiona; , boolean) :</h3>
                                    <p>Responsible for setting a background for the section or removing it</p>
                                </li>
                            </ul>

                        </li>
                        <li>
                            <h3 class="flex my-2">Example usage: <p class="mx-2 w-10">sections: {
                                    'security': {<br>
                                    isTitleHidden: true,<br>
                                    isTransparent: true,<br>
                                    inputs: [
                                    {
                                    $cmp: 'FormKit',<br>

                                    props: {<br>
                                    outerClass: "w-full",
                                    type: 'permissions',
                                    name: 'permissions',
                                    onInput: (req: any) => {
                                    console.log('any', ObjectKeys(req), req, req[0])
                                    },
                                    toggleable: false,
                                    }
                                    }<br>
                                    ]
                                    }
                                    }</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">Custom Component Field: <p class="mx-2 w-9">You can use custom components as
                                    form fields
                                    by specifying the $cmp property in the field object. The custom component should be
                                    registered
                                    and available within your project.</p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>submitHandler (Object, required) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <p>The submitHandler object configures the form submission behavior. It accepts the following
                            properties:</p>
                        <li class="my-2">
                            <h3>endpoint (Function, required) :<br>
                                <p class="mx-2 w-11">The function that will be
                                    called when the form is submitted. This function should handle the form data submission
                                    to your API or backend.</p>
                            </h3>
                            <h4 class="text-base m-2">example : <span class="font-bold text-white">endpoint:
                                    apiClient.roleCreate</span></h4>

                        </li>
                        <li class="my-2">
                            <h3>redirectRoute (String , optional) : <p class="mx-2">The name of the route to redirect
                                    to after successful form submission.
                                </p>
                            </h3>
                            <h4 class="text-base m-2">example : <span class="font-bold text-white">redirectRoute:
                                    "roles_list"</span></h4>

                        </li>
                        <li class="my-2">
                            <h3 class="">mapFunction (Optional,Function) : <p class="mx-2">This optional function allows
                                    for manipulation of the request that we got from the form data , enabling the
                                    reformatting
                                    of the request to align with specific requirements before executing the submit function
                                    so
                                    we can use the manipulated request in the submit funcion.
                                </p>
                            </h3>
                        </li>
                        <li class="my-2">
                            <h3 class="">callback (Optional,function) : <p class="mx-2">This optional property signifies an
                                    optional function that can be employed post the submit function (API) to manipulate the
                                    response or execute some logic.
                                </p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>findHandler (Object, optional) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <p class="my-2 text-white text-lg">The findHandler prop is a crucial property that determines
                                the
                                behavior of the AppForm component. It is used to differentiate between two scenarios:
                                creating a new entry and updating an existing entry.</p>
                        </li>
                        <li>
                            <p class="my-2 text-white text-lg">findHanlder contains the same properties of the submitHandler
                                except for a redirect route</p>
                        </li>
                        <li>
                            <p class="my-2 text-white text-lg">When the findHandler prop is omitted or not provided, the
                                AppForm component is used for the create feature. In this mode, the form is empty and ready
                                to accept input for the creation of a new entry.</p>
                        </li>
                        <li>
                            <p class="my-2 text-white text-lg">On the other hand, when the findHandler prop is included and
                                an endpoint is provided, the
                                AppForm component is used for updating an existing entry. The findHandler function plays a
                                vital
                                role in this scenario. It is responsible for retrieving the data associated with the entry
                                to be
                                updated. This data is then used to populate the form fields, providing a convenient way to
                                edit
                                and modify the existing entry.</p>
                        </li>
                    </div>
                </ul>
            </ol>
        </div>
        <h1 class="my-5">Example Usage : </h1>
        <AppForm :title="formProps.title" :sections="formProps.sections" :submitHandler="formProps.submitHandler" />
    </div>
</template>@/types/types