<script setup lang="ts">
import TableLoading from '@/components/loading/TableLoading.vue'
import CardLoading from '@/components/loading/CardLoading.vue'
import FormLoading from './FormLoading.vue'
import ProfileLoading from './ProfileLoading.vue'
import { type LoadingComponents } from '@/types/types'
const props = defineProps<{ type?: string | unknown }>()
const components: LoadingComponents = {
    table: TableLoading,
    card: CardLoading,
    profile: ProfileLoading,
    form: FormLoading,
}

const component = props.type && typeof props.type == 'string' && Object.keys(components).includes(props.type) ? components[props.type] : components.table
</script>


<template>
    <component :is="component" />
</template>