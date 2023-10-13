<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { h, resolveComponent } from 'vue'
const themeStore = useThemeStore()
const appBtnComponent = resolveComponent('app-btn')

const renderThemeToggler = () => {
    return h(appBtnComponent, {

        onClick: () => {
            themeStore.changeTheme()
        },
        icon: 'moon'

    })
}
</script>

<template>
    <component :is="renderThemeToggler" />
</template>