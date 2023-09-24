
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import PanelMenu from 'primevue/panelmenu';
import { ref } from "vue"
const authStore = useAuthStore()

const expandedKeys = ref();
</script>
<template>
    <PanelMenu exact :model="authStore.sidebar" :expandedKeys="expandedKeys">
        <template #headericon="{ item }">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
        </template>
        <template #itemicon="{ item }">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
        </template>
    </PanelMenu>
</template>
