<template>
    <div class="card">
        <DataTable selectionMode="multiple" v-model:filters="filters" :value="customers" paginator showGridlines :rows="10"
            dataKey="id" filterDisplay="menu" :loading="loading" :globalFilterFields="[
                'name',
                'country.name',
                'representative.name',
                'balance',
                'status',
            ]">
            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                </div>
            </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { CustomerService } from "@/service/CustomerService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { useInfiniteQuery } from "@tanstack/vue-query";
import apiClient from "@/api/ApiClient";
const { data, isLoading, refetch, isFetching, isError, error, suspense } = useInfiniteQuery({
    queryKey: ['permissionsList'],
    queryFn: () => apiClient.permissionsList({})
});

await suspense();

const customers = ref();
const filters = ref();
const representatives = ref([
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
]);
const statuses = ref([
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal",
]);
const loading = ref(true);

onMounted(() => {
    CustomerService.getCustomersMedium().then((data: any) => {
        customers.value = getCustomers(data);
        loading.value = false;
    });
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        "country.name": {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
        },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        balance: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        status: {
            operator: FilterOperator.OR,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
};

initFilters();

const formatDate = (value: any) => {
    return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};
const formatCurrency = (value: any) => {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
const clearFilter = () => {
    initFilters();
};
const getCustomers = (data: any) => {
    return [...(data || [])].map((d) => {
        d.date = new Date(d.date);

        return d;
    });
};
const getSeverity = (status: any) => {
    switch (status) {
        case "unqualified":
            return "danger";

        case "qualified":
            return "success";

        case "new":
            return "info";

        case "negotiation":
            return "warning";

        case "renewal":
            return null;
    }
};
</script>