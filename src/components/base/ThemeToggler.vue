<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { h, resolveComponent } from 'vue'
const themeStore = useThemeStore()
const appBtnComponent = resolveComponent('app-btn')

const renderThemeToggler = () => {
    return themeStore.isDark ? h(appBtnComponent, {
        onClick: () => {
            themeStore.changeTheme()
        },
        icon: 'sun'

    }) : h(appBtnComponent, {
        onClick: () => {
            themeStore.changeTheme()
        },
        icon: 'night'
    })
}
</script>

<template>
    <component :is="renderThemeToggler" />
</template>