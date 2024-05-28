<script setup lang="ts">
import { useLanguageStore } from '@/stores/language';
import { h, resolveComponent } from 'vue'
const languageStore = useLanguageStore()
const appBtnComponent = resolveComponent('app-btn')

const renderLanguageToggler = () => {
    return h(appBtnComponent, {
        onClick: () => {
            languageStore.toggleRtl()
        },
        icon: 'globe'
    })
}
</script>

<template>
    <component :is="renderLanguageToggler" />
</template>