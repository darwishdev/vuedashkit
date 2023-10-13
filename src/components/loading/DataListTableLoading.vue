<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const mockData = {
    exampleData: [
        {
            productId: 1,
            productName: "Cheese burger",
            productImage: "items/beef/Whopper.webp",
            productCategory: "beef",
            ingredientsCount: 6,
            modifiersCount: 5,
            isFinal: false,
            productDescription: "Melon cheese burger"
        },
        {
            productId: 2,
            productName: "whopper tripple burger",
            productImage: "items/beef/BBQ Bacon Whopper Jr..webp",
            productCategory: "burger",
            ingredientsCount: 8,
            modifiersCount: 4,
            isFinal: false,
            productDescription: "Melon whopper"
        },
        {
            productId: 2,
            productName: "whopper tripple burger",
            productImage: "items/beef/BBQ Bacon Whopper Jr..webp",
            productCategory: "burger",
            ingredientsCount: 8,
            modifiersCount: 4,
            isFinal: false,
            productDescription: "Melon whopper"
        },
        {
            productId: 2,
            productName: "whopper tripple burger",
            productImage: "items/beef/BBQ Bacon Whopper Jr..webp",
            productCategory: "burger",
            ingredientsCount: 8,
            modifiersCount: 4,
            isFinal: false,
            productDescription: "Melon whopper"
        },
    ]
}
</script>
<template>
    <div class="bg-card p-4">
        <div class="mb-1 flex justify-content-between border-1 border-solid p-4 border-round">
            <Skeleton height="3rem" width="7rem" class=""></Skeleton>
            <Skeleton height="3rem" width="7rem" class=""></Skeleton>
        </div>
        <div class="mb-5 flex justify-content-between align-items-center p-4 border-round">
            <Skeleton width="10rem" height="1.5rem" class="mb-2"></Skeleton>
            <div class="flex align-items-center">
                <Skeleton height="2rem" width="3.5rem" class="mx-5" style="border-radius : 12px;"></Skeleton>
                <div class="bg-card" style="border-radius : 1px;">
                    <Skeleton height="3rem" width="3rem" style="border-radius : 1px;"></Skeleton>
                </div>
                <Skeleton height="3rem" width="10rem" style="border-radius : 1px;" class=""></Skeleton>
            </div>
        </div>
        <DataTable class="tableLoading" :value="mockData.exampleData">
            <Column field="example">
                <template #body>
                    <Skeleton class="my-2"></Skeleton>
                </template>
            </Column>
            <Column field="example">
                <template #body>
                    <Skeleton class="my-2"></Skeleton>
                </template>
            </Column>
            <Column field="example">
                <template #body>
                    <Skeleton class="my-2"></Skeleton>
                </template>
            </Column>
            <Column field="example">
                <template #body>
                    <Skeleton class="my-2"></Skeleton>
                </template>
            </Column>
            <Column field="example">
                <template #body>
                    <Skeleton class="my-2"></Skeleton>
                </template>
            </Column>
            <Column field="example">
                <template #body>
                    <Skeleton class="my-2"></Skeleton>
                </template>
            </Column>
        </DataTable>

    </div>
</template>
<style>
.p-datatable .p-datatable-thead>tr>th,
.p-datatable .p-datatable-tbody>tr {
    background: rgba(255, 255, 255, 0.035);
}
</style>