<script setup lang="ts">
import type { AppBtnProps } from '@/types/types';
import { h } from 'vue';
import Button from 'primevue/button';
import AppIcon from './AppIcon.vue';
const props = defineProps<AppBtnProps>();

const renderFunction = () => {
    const isPrimeVueIcon = props.iconType == 'primevue'
    return h(Button, {
        label: props.label,
        disabled: props.disabled,
        icon: isPrimeVueIcon ? `pi pi-${props.icon}` : undefined,
    }, {
        icon: () => !isPrimeVueIcon ? h(AppIcon, { icon: props.icon!, color: props.iconColor }) : undefined
    })
}

</script>
<template>
    <component class="app-btn" :is="renderFunction" />
</template>
