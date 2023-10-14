<script setup lang="ts">
import TableLoading from '@/components/loading/TableLoading.vue'
import CardLoading from '@/components/loading/CardLoading.vue'
import FormLoading from './FormLoading.vue'
import AppLayoutLoading from './AppLayoutLoading.vue'

type loadingComponents = {
    table: any
    card: any
    form: any
    appLayout: any
}

const props = defineProps<{ type?: string | unknown }>()
const components: loadingComponents = {
    table: TableLoading,
    card: CardLoading,
    form: FormLoading,
    appLayout: AppLayoutLoading
}

const component = props.type && typeof props.type == 'string' && Object.keys(components).includes(props.type) ? components[props.type] : components.table
</script>


<template>
    <component :is="component" />
</template>