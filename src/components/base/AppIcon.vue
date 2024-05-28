<script setup lang="ts">
import type { AppIconProps, AppIconSlots } from '@/types/types'
import AppIconIconInner from './AppIconInner.vue';
import Skeleton from 'primevue/skeleton';
import { useThemeStore } from '@/stores/theme';
const props = defineProps<AppIconProps>();
const slots = defineSlots<AppIconSlots>();
const themeStore = useThemeStore()
</script>

<template>
    <Suspense timeout="0" v-if="!themeStore.isLoading">
        <template #default>
            <div class="app-icon" v-if="typeof slots.top == 'function'">
                <div class="top">
                    <component :is="slots.top"></component>
                </div>
                <AppIconIconInner :icon="props.icon" :color="props.color" :size="props.size" />
            </div>
            <AppIconIconInner v-else :icon="props.icon" :color="props.color" :size="props.size" />
        </template>
        <template #fallback>
            <div class="loading">
                <Skeleton width="2rem" class="mb-2"></Skeleton>
            </div>
        </template>
    </Suspense>

</template>