
<script setup lang="ts">
import type { AppBtnParams } from '@/types/types';
import { h, inject } from 'vue';
import Button from 'primevue/button';
const props = defineProps<AppBtnParams>();

const renderFunction = () => {
    return h(Button  , {
        label: props.label,
        icon: `pi pi-${ props.icon}`,
    })
}

</script>
<template>
   <component class="app-btn" :is="renderFunction"/>
</template>
