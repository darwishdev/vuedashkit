<script setup lang="ts">
import type { ITableHeader } from '../types/types';

import DataList from '../components/data/DataList.vue';
// import dataListCardLoading from '../components/Loading/dataListCardLoading.vue';
// import dataListTableLoading from '../components/Loading/dataListTableLoading.vue';
import apiClient from '../api/ApiMock';
import type { ProductListResponse, productsListRow } from '../api/ApiTypes';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate, TableHeaderImage } from '../utils/table/TableHeader'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter } from '../types/newtypes';
import { useThemeStore } from '../stores/theme';
const themeStore = useThemeStore()
const { t } = useI18n()

const dataKey = "productId"
const viewRouter: TableRouter = {
    name: "products_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'productId': new TableHeaderLink('productId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'productName': new TableHeaderText('roleName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "productName",
                placeholder: t("Product Name")
            }
        }
    }),
    'productImage': new TableHeaderImage('productImage', {
        sortable: true,
    }),
    'ingredientsCount': new TableHeaderCount('ingredientsCount', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                number: true,
                name: "ingredientsCount",
                validationVisibility: "live",
                placeholder: t("ingredients Count More Than")
            }
        }
    }),
    'modifiersCount': new TableHeaderCount('modifiersCount', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "modifiersCount",
                placeholder: t("modifiers Count More Than")
            }
        }
    }),
    'productCategory': new TableHeaderText('productCategory', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
}

const headers2: Record<string, ITableHeader> = {
    'productId': new TableHeaderLink('productId', {
        sortable: true,
        isGlobalFilter: false,
        router: viewRouter
    }),
    'productName': new TableHeaderText('roleName', {
        sortable: true,
        isGlobalFilter: false,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "productName",
                placeholder: t("Product Name")
            }
        }
    }),
    'ingredientsCount': new TableHeaderCount('ingredientsCount', {
        sortable: true,
        isGlobalFilter: false,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                number: true,
                name: "ingredientsCount",
                validationVisibility: "live",
                placeholder: t("ingredients Count More Than")
            }
        }
    }),
    'modifiersCount': new TableHeaderCount('modifiersCount', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "modifiersCount",
                placeholder: t("modifiers Count More Than")
            }
        }
    }),
    'productCategory': new TableHeaderText('productCategory', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
}
themeStore.startProgressBar()
const { records, deletedRecords, options } = await apiClient.productsList()
themeStore.stopProgressBar()



const tableProps: DataListProps<ProductListResponse, productsListRow> = {
    title: "roles",
    dataKey,
    records: records,
    deletedRecords: deletedRecords,
    viewRouter: viewRouter,
    fetchFn: apiClient.productsList as any,
    options: options! as any,
    headers,
    displayType: 'card'
}
</script>
<template>
    <!-- <dataListCardLoading></dataListCardLoading>
    <dataListTableLoading></dataListTableLoading> -->
    <div>
        <h1 class="text-center">AppTable Component</h1>
        <p class="w-9 m-auto my-4 text-center">The DataList component is designed to display data in a table or cards view.
            It provides flexibility by allowing you to control its behavior through various props. This documentation will
            guide you on how to use the component and the props you need to pass to customize its functionality.
        </p>
        <h2>Props</h2>
        <p>The AppTable component accepts the following props:</p>
        <div class="border-round p-5" style="background-color: var(--color-card);">
            <ol class="p-4">
                <li class="font-bold mt-1">
                    <h2>title (String, required) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <h3 class="flex">Description: <p class="mx-2">The title to display above the table.</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">Example usage: <p class="mx-2"> title: "Products"</p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>dataKey (String, required) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <h3 class="flex">Description: <p class="mx-2">The key used to access or delete , restore the
                                    data in each record of the table.</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">Example usage: <p class="mx-2">dataKey: "id"</p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>fetchFn (Function, required) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <h3 class="flex">Description: <p class="mx-2">A function that fetches the data from api for the
                                    table to list.</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">Example usage: <p class="mx-2">fetchFn: apiClient.productsList</p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>records (Array, required) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <h3 class="flex">Description: <p class="mx-2">An array of records that was returned as a
                                    response from the api function to display in the table.</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">Example usage: <p class="mx-2">const { records, deletedRecords, options } =
                                    await apiClient.productsList({})</p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>viewRouter (Object, optional) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <h3 class="flex">Description: <p class="mx-2">An object that represents the router path to
                                    navigate when a record is clicked.</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">Example usage:- <p class="mx-2">viewRouter: const viewRouter: TableRouter = {
                                    name: "products_find",
                                    paramName: "id",
                                    paramColumnName: "productId"
                                    }</p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>deletedRecords (Array, required) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <h3 class="flex">Description: <p class="mx-2">An array of deleted records that was returned as a
                                    response from the api function to display separately in the table.</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">Example usage:- <p class="mx-2">const { records, deletedRecords, options } =
                                    await apiClient.productsList({})</p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>options (Object, required) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <h3 class="flex">Description: <p class="mx-2">Additional options that was returned as a response
                                    from the api function to customize the table's behavior depending on the role and the
                                    permissions of the logged in user.</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">Example usage:- <p class="mx-2">const { records, deletedRecords, options } =
                                    await apiClient.productsList({})</p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>displayType ( 'card' or 'table' , default : 'table' ) :</h2>
                </li>
                <ul class="my-2">
                    <div class="border-round p-4" style="background-color: var(--color-card);">
                        <li>
                            <h3 class="flex">Description: <p class="mx-2">This prop is used to define the type that the
                                    component will be displayed in. The displayType prop has two options : 'card' or 'table'
                                    <br>if you set the displayType to 'card' the data will be displayed in cards instead of
                                    being displayed in a table.
                                </p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">Example usage:- <p class="mx-2">displayType : 'card' .. we will show an example
                                    on using the card displayType </p>
                            </h3>
                        </li>
                    </div>
                </ul>
                <li class="font-bold mt-4">
                    <h2>headers (Object, required) :</h2>
                </li>
                <div class="border-round p-4 ml-5 my-2" style="background-color: var(--color-card);">
                    <h3>
                        <p class="">The headers prop is used to define the headers of the table that will be displayed to
                            show the data.
                            It allows you to customize the appearance and filtering behavior of each column. The headers
                            prop should
                            be defined as an object, where each key represents a column identifier and the value is an
                            instance of
                            the ITableHeader interface.</p>
                    </h3>
                    <h3 class="my-5">Here's an example that demonstrates the usage of the headers prop :</h3>
                    <div class="p-3 border-round my-3" style="background-color: var(--color-card);">
                        <h3 class="p-4">
                            <p>
                                const headers: Record &lt;string, ITableHeader&gt; = { <br>
                                'productId': new TableHeaderLink('productId', {
                                sortable: true,
                                isGlobalFilter: true,
                                router: viewRouter
                                }),<br>
                                'productName': new TableHeaderText('productName', {
                                sortable: true,
                                isGlobalFilter: true,<br>
                                filter: {
                                matchMode: FilterMatchMode.CONTAINS,<br>
                                input: {
                                $formkit: 'text',
                                prefixIcon: "tools",
                                outerClass: "col-3",
                                name: "roleName",
                                placeholder: t("roleName")
                                }
                                }
                                }),<br>
                                // ... Other header definitions
                                }
                            </p>
                        </h3>
                    </div>
                    <h3>
                        <p>In this example, the headers object contains multiple key-value pairs, where each key represents
                            a column
                            identifier (e.g., 'productId', 'productName', etc.), and the value is an instance of the
                            appropriate ITableHeader
                            implementation (e.g., TableHeaderLink, TableHeaderText, etc.).</p>
                    </h3>
                    <h3 class="mt-3 mb-5">
                        <p>Each ITableHeader implementation provides different options to customize the behavior and
                            appearance of the
                            corresponding column. The specific options available depend on the implementation.
                        </p>
                    </h3>
                    <h2>So now we should take a look on ITableHeader interface :</h2>
                    <h3 class="my-2">
                        <p>The ITableHeader interface defines the properties that can be used to customize the column
                            header.</p>
                    </h3>
                    <h3 class="my-2">
                        <p>The properties of the ITableHeader interface include :</p>
                    </h3>
                    <ul class=" py-2px-4">
                        <li>
                            <h3 class="flex">columnProps (Object, optional): <p class="mx-2">Additional properties to be
                                    passed to the column component.</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">filter (Any, optional) : <p class="mx-2">Configuration for applying filters to
                                    the column .. we will talk about it soon</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">tableRouter (Object, optional) : <p class="mx-2">Router configuration for
                                    navigating to a specific route when the column is clicked.</p>
                            </h3>
                        </li>
                        <li>
                            <h3 class="flex">renderHtml (Function, optional) : <p class="mx-2">A function that allows custom
                                    rendering of the column header content.</p>
                            </h3>
                        </li>
                    </ul>
                </div>

            </ol>
        </div>
        <h2 class="my-5">Here's a simple example for using the component with basic props and options</h2>

    </div>
    <DataList :fetchFn="tableProps.fetchFn" :viewRouter="tableProps.viewRouter" :title="tableProps.title"
        :dataKey="tableProps.dataKey" :records="records" :options="tableProps.options" :deletedRecords="deletedRecords"
        :headers="tableProps.headers" />

    <h2 class="my-5">Filtering Feature</h2>
    <div class="border-round p-4" style="background-color: var(--color-card);">
        <h3>
            <p>The DataList component in Vue.js provides a powerful filtering feature that allows you to filter data based
                on the
                fields you specify in the headers prop. This feature enables users to search and narrow down the displayed
                data according
                to their preferences.</p>
        </h3>
        <h2 class="my-3">Example Usage :</h2>
        <p>Here's an example that demonstrates the usage of the filtering feature and defining the filters schema inside the
            headers prop :</p>
        <div class="border-round p-4" style="background-color: var(--color-card);">
            <h3>
                <p>
                    const headers: Record&lt;string, ITableHeader&gt; = {<br>
                    'productId': new TableHeaderLink('productId', {<br>
                    sortable: true,
                    isGlobalFilter: true,
                    router: viewRouter
                    }),<br>
                    'productName': new TableHeaderText('roleName', {<br>
                    sortable: true,
                    isGlobalFilter: true,<br>
                    filter: {<br>
                    matchMode: FilterMatchMode.CONTAINS,<br>
                    input: {
                    $formkit: 'text',
                    prefixIcon: "tools",
                    outerClass: "col-3",
                    name: "productName",
                    placeholder: t("Product Name")
                    }<br>
                    }
                    }),<br>
                    'ingredientsCount': new TableHeaderCount('ingredientsCount', { <br>
                    sortable: true,
                    isGlobalFilter: true,<br>
                    filter: {<br>
                    matchMode: FilterMatchMode.GREATER_THAN,<br>
                    input: {<br>
                    $formkit: 'number',
                    prefixIcon: "number",
                    outerClass: "col-3",
                    number: true,
                    name: "ingredientsCount",
                    validationVisibility: "live",
                    placeholder: t("ingredients Count More Than")<br>
                    }
                    }<br>
                    }),
                    }
                </p>
            </h3>
        </div>
        <div class="my-5">
            <h3 class="my-3">
                <p>
                    In this example, the headers object contains multiple key-value pairs, where each key represents a
                    column identifier
                    (e.g., 'productId', 'productName', etc.), and the value is an instance of the appropriate ITableHeader
                    implementation
                    (e.g., TableHeaderLink, TableHeaderText, etc.).
                </p>
            </h3>
            <h3 class="my-3">isGlobalFilter property<p> is responsible for making the column globally accessible for
                    filtering from the data using
                    the global search bar of the component. By setting this property to true, users can search for specific
                    values across
                    this column rows.</p>
            </h3>
            <h3 class="my-3">filter property<p> allows you to define the specific filtering behavior for each column. Within
                    the filter object,
                    you can specify various options to customize the filtering experience.</p>
            </h3>
            <ul class="my-4">
                <div class="border-round p-4" style="background-color: var(--color-card);">
                    <li class="my-3">
                        <h3 class="flex">matchMode: <p class="mx-2">This property defines the filter mode to be used for the
                                column
                                data. You can import the FilterMatchMode function from PrimeVue, which provides multiple
                                options for matching
                                modes (e.g., CONTAINS, STARTS_WITH, ENDS_WITH, etc.). This determines how the filtering will
                                be applied to
                                the column values.</p>
                        </h3>
                    </li>
                    <li>
                        <h3 class="flex">input:<p class="mx-2"> The input object defines formkit schema for the input field
                                used to filter the column. It allows you to customize the appearance and behavior of the
                                input field.</p>
                        </h3>
                    </li>
                </div>
            </ul>
        </div>
    </div>
    <h2 class="my-5">Here's an example for using the appTable component with using the headers 'isGlobal' property to false
        except for the 'productCategory' column
        so the search bar will be filtering depending on the category name value
    </h2>
    <DataList :fetchFn="tableProps.fetchFn" :viewRouter="tableProps.viewRouter" :title="tableProps.title"
        :dataKey="tableProps.dataKey" :records="records" :options="tableProps.options" :deletedRecords="deletedRecords"
        :headers="headers2" />

    <h2 class="my-5">Here's an example for using the appTable component with setting the displayType property to 'card' :
    </h2>

    <DataList class="sm-column" :fetchFn="tableProps.fetchFn" :viewRouter="tableProps.viewRouter" :title="tableProps.title"
        :dataKey="tableProps.dataKey" :records="records" :options="tableProps.options" :deletedRecords="deletedRecords"
        :headers="headers2" :displayType="tableProps.displayType">
        <template #start="{ data }">
            <div class="flex-row md:flex-column">
                <div class="mx-3">
                    <h4>ingredients</h4>
                    <h3>{{ data.ingredientsCount }}</h3>
                </div>
                <div class="mx-3">
                    <h4>modifiers</h4>
                    <h3 class="">{{ data.modifiersCount }}</h3>
                </div>
            </div>
        </template>
        <template #end="{ data }">
            <div>
                <h3 class="my-1 text-center"> {{ data.productName }}</h3>
                <h5 class="text-center"> {{ data.productCategory }}</h5>
            </div>
        </template>
    </DataList>

    <h2 class="mt-4">Note :</h2>
    <h3 class="mt-2 mb-5">
        <p>we have toggled the <span class="text-xl font-bold">'sm-column'</span> class when using the appTable component
            displayed as cards to handle designing responsive cards</p>
    </h3>

    <h2 class="my-3">BreadCrumbs</h2>
    <div class="border-round p-4" style="background-color: var(--color-card);">
        <h3>Defining Breadcrumbs in the Router File :</h3>
        <h3 class="my-2">
            <p>To define breadcrumbs for a specific route, you need to add a breadcrumbs property to the meta object of that
                route.
                The breadcrumbs property should be an array of breadcrumb objects, where each object represents a step in
                the breadcrumb
                trail. Each breadcrumb object should include a label and a to property.
            </p>
        </h3>
        <h3>Here's an example of how to define breadcrumbs in the router file :</h3>
        <div class="border-round p-4 my-2" style="background-color: var(--color-card);">
            {
            path: '/appTable',<br>
            name: 'app_table',<br>
            meta: {<br>
            breadcrumbs: [<br>
            { label: "AppTable Docs", to: { name: 'app_table' } },<br>
            { label: "Docs" }<br>
            ]<br>
            },<br>
            component: () => import('../views/appTableDocs.vue')<br>
            },
        </div>
    </div>
</template>

<style lang="scss">
.p-image img {
    max-width: 140px !important;
}

.card-start,
.card-end,
.card-start>div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-start {
    background: var(--color-primary);
    gap: 5px;

    & h2 {
        font-weight: 800;
        font-size: 32px;
    }
}
</style>
