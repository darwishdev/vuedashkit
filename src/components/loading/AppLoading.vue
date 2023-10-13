<script setup lang="ts">
import TableLoading from '@/components/loading/TableLoading.vue'
import CardLoading from '@/components/loading/CardLoading.vue'
import FormLoading from './FormLoading.vue'

type loadingComponents = {
    table: any
    card: any
    form: any
}

const props = defineProps<{ type?: string }>()
const components: loadingComponents = {
    table: TableLoading,
    card: CardLoading,
    form: FormLoading
}

const component = props.type && Object.keys(components).includes(props.type) ? components[props.type] : components.table
</script>


<template>
    <component :is="component" />
</template>