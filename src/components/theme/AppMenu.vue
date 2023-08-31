
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import PanelMenu from 'primevue/panelmenu';
const authStore = useAuthStore()
</script>
<template>
    <PanelMenu :model="authStore.sidebar">
        <template #headericon="{ item }">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
        </template>
        <template #itemicon="{ item }">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
        </template>
    </PanelMenu>
</template>
