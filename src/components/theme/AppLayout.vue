<script lang="ts" setup>
import AppNav from './AppNav.vue'
import { useMenuStore } from '@/stores/menu';
import { useLanguageStore } from '@/stores/language';
import { useThemeStore } from '@/stores/theme';
import ProgressBar from 'primevue/progressbar';
import Sidebar from 'primevue/sidebar';
import { ref, inject } from 'vue'
import DynamicDialog from 'primevue/dynamicdialog';
import { useDialogStore } from '@/stores/dialog';
import type { Ref } from 'vue';
const menuStore = useMenuStore()
const dialogRef = inject('dialogRef') as Ref
const languageStore = useLanguageStore()
const themeStore = useThemeStore()
const dialogStore = useDialogStore()
dialogStore.init(dialogRef)
const routeResolved = () => {
    themeStore.stopProgressBar()
}

const closeDialog = () => {
    console.log(dialogRef.value.close())
    // console.log(dialogRef.value.close())
}
</script>

<template>
    <div class="app-layout" :class="{ 'rtl': languageStore.isRtl, 'dark': themeStore.isDark }">
        <ProgressBar v-if="themeStore.isProgressBarVisible" mode="indeterminate"></ProgressBar>
        <button @click="closeDialog">close dialog</button>

        <app-nav />
    </div>


    <RouterView v-slot="{ Component }">
        <Suspense @resolve="routeResolved" timeout="0">
            <template #default>
                <component :is="Component" />
            </template>
            <template #fallback>
                <h2>loading</h2>
            </template>
        </Suspense>
    </RouterView>
    <Sidebar class="p-sidebar-sm" v-model:visible="menuStore.sideBarVisible" :position="menuStore.sidebarPosition">
        <!-- <template #header>
            <app-logo class="all-logo" />
        </template> -->
        <KeepAlive>
            menu
        </KeepAlive>
    </Sidebar>
    <DynamicDialog />
</template>

<style>
.rtl {
    direction: rtl;
}
</style>