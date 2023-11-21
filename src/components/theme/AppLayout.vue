 

<script lang="ts" setup>
import AppNav from './AppNav.vue'
import { useMenuStore } from '@/stores/menu';
// import { useLanguageStore } from '@/stores/language';
import "./AppLayout.scss"
import { useThemeStore } from '@/stores/theme';
import ProgressBar from 'primevue/progressbar';
import Sidebar from 'primevue/sidebar';
import AppMenu from './AppMenu.vue';
import DynamicDialog from 'primevue/dynamicdialog';
import { useAuthStore } from '@/stores/auth';
import AppLoading from '@/components/loading/AppLoading.vue';

const authStore = useAuthStore()
const menuStore = useMenuStore()
// const languageStore = useLanguageStore()
const themeStore = useThemeStore()
// themeStore.init()
authStore.init()
const routeResolved = () => {
    themeStore.stopProgressBar()
    menuStore.closeSidebar()
}
const toggleDesktopMenu = () => {
    themeStore.toggleDesktopMenu()
}

const handleErr = (e) => {
    console.log('errorCaptured')
    console.log(e)
}

</script>

<template>
    <div class="app-layout  " :class="{ 'active-menu': themeStore.isMenuOpened }">
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
            <RouterView v-slot="props">
                <Suspense @resolve="routeResolved" @errorCaptured="handleErr" , timeout="0">
                    <template #default>
                        <component :is="props.Component" />
                    </template>
                    <template #fallback>
                        <div class="loading">
                            <AppLoading :type="(props.route.meta.loadingType as string)" />
                        </div>
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
</template>
 
