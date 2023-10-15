
<script setup lang="ts">
import type { AppBtnProps } from '@/types/types';
import { h } from 'vue';
import Button from 'primevue/button';
const props = defineProps<AppBtnProps>();

const renderFunction = () => {
    return h(Button, {
        label: props.label,
        disabled: props.disabled,
        icon: `pi pi-${props.icon}`,
    })
}

</script>
<template>
    <component class="app-btn" :is="renderFunction" />
</template>

 

