 

<script setup lang="ts">
import type { ITableHeader, TableOptions } from '@/types/types';
import AppTable from '@/components/data/DataTable.vue';
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderImage, TableHeaderPrice, TableHeaderTag, TableHeaderLink } from '@/utils/table/TableHeader'
import { ref } from "vue"

const selectedItems = ref();
const data = await apiClient.ingredientsList({})
const headers: Record<string, ITableHeader> = {
    'ingredientId': new TableHeaderText('ingredientId'),
    'ingredientName': new TableHeaderLink('ingredientName', true, {
        name: "ingredient_find",
        paramName: 'id',
        paramColumnName: 'ingredientId'
    }),
    'ingredientImage': new TableHeaderImage('ingredientImage'),
    'ingredientCost': new TableHeaderPrice('ingredientCost'),
    'unitBuy': new TableHeaderTag('unitBuy'),
    'unitSell': new TableHeaderTag('unitSell'),
    'categoryName': new TableHeaderLink('categoryName', true, {
        name: "category_find",
        paramName: 'id',
        paramColumnName: 'categoryId'
    }),
}
const tableOptions: TableOptions = {
    showSelectAll: true,
    showActions: true
}
</script>

<template>
    <main>


        <AppTable scrollable :paginator="true" :rows="10"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" dataKey="ingredientId"
            v-model:selection="selectedItems" :options="tableOptions" :data="data.ingredients" :headers="headers">
        </AppTable>
    </main>
</template>
