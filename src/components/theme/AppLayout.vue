<script lang="ts" setup>
import AppNav from './AppNav.vue'
import { useMenuStore } from '@/stores/menu';
import { useLanguageStore } from '@/stores/language';
import { useThemeStore } from '@/stores/theme';
import ProgressBar from 'primevue/progressbar';
import Sidebar from 'primevue/sidebar';
import AppMenu from './AppMenu.vue';
import DynamicDialog from 'primevue/dynamicdialog';


const menuStore = useMenuStore()
const languageStore = useLanguageStore()
const themeStore = useThemeStore()
languageStore.init()
themeStore.init()

const routeResolved = () => {
    themeStore.stopProgressBar()
}
const toggleDesktopMenu = () => {
    themeStore.toggleDesktopMenu()
}

</script>

<template>
    <div class="app-layout  "
        :class="{ 'rtl': languageStore.isRtl, 'dark': themeStore.isDark, ' active-menu': themeStore.isMenuOpened }">
        <ProgressBar v-if="themeStore.isProgressBarVisible" mode="indeterminate"></ProgressBar>
        <aside class="desktop-menu">
            <div class="desktop-menu-header">
                <app-logo class="all-logo" />
                <app-logo iconOnly class="icon-logo" />
                <app-btn class="desktop-menu-toggler" :icon="themeStore.isMenuOpened ? 'lock' : 'lock-open'"
                    @click.prevent="toggleDesktopMenu" />
            </div>
            <KeepAlive>
                <app-menu />
            </KeepAlive>
        </aside>
        <div class="pa-4">
            <app-nav />
        </div>
        <main class="page-content">
            <RouterView v-slot="{ Component }">
                <Suspense @resolve="routeResolved" timeout="0">
                    <template #default>
                        <component :is="Component" />
                    </template>
                    <template #fallback>
                        <h2>loading from layout</h2>
                    </template>
                </Suspense>
            </RouterView>
        </main>
        <Sidebar class="p-sidebar-sm" v-model:visible="menuStore.sideBarVisible" :position="menuStore.sidebarPosition">
            <template #header>
                <app-logo />
            </template>
            <KeepAlive>
                <app-menu />
            </KeepAlive>
        </Sidebar>
    </div>

    <DynamicDialog />
    <AppNotification />
</template>
 