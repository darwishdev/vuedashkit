
<script lang="ts">
import { type FormKitSchemaNode, type FormKitNode } from '@formkit/core'
import { ObjectKeys } from '@/utils/object/object';
import type { Permission, PermissionGroup } from '@/types/newtypes'
import apiClient from '@/api/ApiClient';
const loadElemetns = (t: Function) => {
    return new Promise(async (resolve) => {
        const localStoragePermission = localStorage.getItem('permissions') as string
        if (!localStoragePermission) {
            resolve(null)
            return
        }
        const groups: PermissionGroup[] = (await apiClient.permissionsList({})).permissions


        console.log(groups)


        const schema: FormKitSchemaNode[] = []
        groups.forEach((group: PermissionGroup) => {
            const permissionsInputs: FormKitSchemaNode[] = []
            for (let i = 0; i < group.permissions.length; i++) {
                const permissions = group.permissions[i];
                permissionsInputs.push({
                    $formkit: "toggle",
                    label: permissions.permissionName
                })
            }
            schema.push({
                $el: "div",
                attrs: {
                    class: "permissions-group"
                },
                children: [
                    {
                        $el: 'h2',
                        children: group.permissionGroup
                    },
                    {
                        $el: 'div',
                        attrs: {
                            class: "grid"
                        },
                        children: permissionsInputs
                    },

                ]
            })

        })
        // const permissions = JSON.parse(atob(localStoragePermission)) as Record<string, Permission[]>
        // const keys = ObjectKeys(permissions)
        // for (const key of keys) {
        //     const currentGroup = permissions[key]


        //     const currentGroupSchema: FormKitSchemaNode[] = []
        //     currentGroup.forEach((group: Permission) => {
        //         currentGroupSchema.push({
        //             $formkit: "toggle",
        //             label: group.permissionName,

        //         })
        //     })

        //     const title = {
        //         $el: 'h2',
        //         children: t(key)
        //     }

        //     const inpustsWrapper = {
        //         $el: 'div',
        //         attrs: {
        //             class: 'grid'
        //         },
        //         children: currentGroupSchema
        //     }
        //     schema.push({
        //         $el: 'div',
        //         attrs: {
        //             class: 'card form-section',

        //         },
        //         props: {
        //         },
        //         children: [
        //             title,
        //             inpustsWrapper
        //         ]
        //     })

        // }
        resolve(schema)
    })
}
</script>





<script setup lang="ts">
import { h, ref, onMounted, resolveComponent } from 'vue';
import type { InputPermissionsProps } from '@/types/newtypes';
import { useI18n } from 'vue-i18n';
import { useNotificationStore } from "@/stores/notification";
import { useRouter } from 'vue-router';

import { useToast } from 'primevue/usetoast';
import Tag from 'primevue/tag';
import { ProductService } from '@/service/ProductService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const { push } = useRouter()
const { t } = useI18n()
const props = defineProps<InputPermissionsProps>();


// const schema = await loadElemetns(t)


const { permissions } = await apiClient.permissionsList({})

// global components
const formScehmaNodeRef = ref<{ node: FormKitNode }>()
const isBulkCreateRef = ref()
const notificationStore = useNotificationStore()
const formkitComp = resolveComponent('FormKit')
const appBtnComponent = resolveComponent('app-btn')
const formkitSchemaComp = resolveComponent('FormKitSchema')

const renderPermissionsGroup = () => {
    return h(formkitComp, {
        type: "form",
        id: "permissions"
    },
        () => h(formkitSchemaComp, {
            schema: schema
        })
    )
}


const renderSearchInput = () => {
    return h('div', {
        class: 'form-title'
    },
        [
            h('h1', 'search'),

        ]
    )
}


const renderSelectAllInput = () => {
    return h('div', {
        class: 'form-title'
    },
        [
            h('h1', 'search'),

        ]
    )
}

const onInput = async (e: any) => {
    props.context.node.input(e)
}
const renderInput = () => {
    return h("div", {
        class: "card"
    }, [
        renderSearchInput(),
        renderSelectAllInput(),
        renderPermissionsGroup()
    ])
}



const products = ref();
const expandedRows = ref([]);
const toast = useToast();

onMounted(() => {
    ProductService.getProductsWithOrdersSmall().then((data) => (products.value = data));
});

const onRowExpand = (event) => {
    toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
};
const onRowCollapse = (event) => {
    toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
};
const expandAll = () => {
    expandedRows.value = products.value.filter((p) => p.id);
};
const collapseAll = () => {
    // expandedRows.value = null;
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
};
const getOrderSeverity = (order) => {
    switch (order.status) {
        case 'DELIVERED':
            return 'success';

        case 'CANCELLED':
            return 'danger';

        case 'PENDING':
            return 'warning';

        case 'RETURNED':
            return 'info';

        default:
            return null;
    }
};


</script>

<template>
    <!-- <component class="input-permission" :is="renderInput()" /> -->
    <DataTable v-model:expandedRows="expandedRows" :value="permissions" dataKey="id">
        <template #header>
            <div class="flex flex-wrap justify-content-end gap-2">
                <app-btn text icon="pi pi-plus" label="Expand All" @click="expandAll" />
                <app-btn text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
            </div>
        </template>
        <Column expander style="width: 5rem" />
        <Column field="permissionGroup" header="permissionGroup"></Column>

        <template #expansion="slotProps">
            <div class="p-3">
                <h5>permissions for {{ slotProps.data.permissionGroup }}</h5>
                <DataTable :value="slotProps.data.permissions">
                    <Column field="permissionId" header="permissionId" sortable></Column>
                    <Column field="permissionName" header="permissionName" sortable></Column>
                    <Column field="permissionPermissionFunction" header="permissionPermissionFunction" sortable></Column>

                </DataTable>
            </div>
        </template>
    </DataTable>
</template>


<style lang="scss">
.input-permission {}
</style>