<script lang="ts" setup>
import AppNav from './AppNav.vue'
import { useMenuStore } from '@/stores/menu';
import { useThemeStore } from '@/stores/theme';
import ProgressBar from 'primevue/progressbar';
import Sidebar from 'primevue/sidebar';
import AppMenu from './AppMenu.vue';
import { useAuthStore } from '@/stores/auth';
import AppLoading from '@/components/loading/AppLoading.vue';
import { onMounted } from 'vue'
const authStore = useAuthStore()
const menuStore = useMenuStore()
const themeStore = useThemeStore()
authStore.init()
// themeStore.init()
const routeResolved = () => {
    themeStore.stopProgressBar()
    menuStore.closeSidebar()
}
const toggleDesktopMenu = () => {
    themeStore.toggleDesktopMenu()
}

</script>

<template>
    <div class="app-layout  " :class="{ 'active-menu': themeStore.isMenuOpened }">
        <ProgressBar v-if="themeStore.isProgressBarVisible" mode="indeterminate"></ProgressBar>
        <aside class="desktop-menu">
            <div class="desktop-menu-header">
                <app-logo class="all-logo" />
                <app-logo iconOnly class="icon-logo" />
                <app-btn class="desktop-menu-toggler" v-if="themeStore.isMenuOpened" icon='padlock'
                    @click.prevent="toggleDesktopMenu" />
                <app-btn class="desktop-menu-toggler" v-else icon='unlock' @click.prevent="toggleDesktopMenu" />
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
                <Suspense @resolve="routeResolved" timeout="0">
                    <template #default>
                        <div class="wrap">
                            <component :is="props.Component" />
                        </div>
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
</template>

<style lang="scss">
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@mixin flex-center-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.desktop-menu {
    background: var(--color-background);
    z-index: 3;
    transition: width 0.2s;
    top: 0;
    left: 0;
    height: 100vh;

    @media (max-width: 676px) {
        display: none;
    }

    width: var(--menu-width);
    overflow-x: hidden;
    overflow-y: scroll;
    border-right: 1px solid var(--menu-border-color);
    position: fixed;
    border-radius: 0 15px 15px 0;

    & .p-panelmenu {
        margin-top: 30px;
        padding: 0 15px;

        & .p-panelmenu-panel {
            @include flex-center-column;

            & .p-toggleable-content {
                width: 100%;

                & .p-menuitem-content {
                    border-radius: 6px !important;
                }

                & .p-menuitem-link {
                    padding: 5px 0;
                }
            }

            & .p-panelmenu-header {
                width: 100%;

                &.p-highlight {
                    background: var(--color-primary) !important;
                    border-radius: 6px;

                    & span,
                    & svg {
                        color: #fff !important;
                    }
                }

                & .p-panelmenu-header-content {
                    @include flex-center;

                    & .p-panelmenu-header-action {
                        padding: 10px 0;
                        width: 100%;
                        @include flex-center;

                        & .material-symbols-outlined {
                            transition: all 0.3s;

                            margin: 0;
                            font-size: 30px;
                        }

                        & .p-menuitem-text,
                        & .p-submenu-icon {
                            margin-right: 20px;
                            transition: all 0.3s;
                            position: absolute;
                            opacity: 0;
                        }
                    }
                }
            }
        }
    }

    & .desktop-menu-header {
        margin: 20px 0;
        @include flex-between;

        & .all-logo {
            display: none !important;
        }

        & .logo-container {
            width: 100%;
            @include flex-center;
        }
    }

    & .desktop-menu-toggler {
        display: none;
    }
}

.material-symbols-outlined {
    font-size: 30px;
}

.app-layout {

    //handle global style
    @media (min-width: 676px) {
        padding-inline-start: var(--menu-width);
    }

    & .desktop-menu:hover,
    &.active-menu {
        --menu-width: var(--menu-width-opened);

        & .all-logo {
            display: flex !important;
        }

        & .desktop-menu-header {
            padding: 0 20px;
        }

        & .icon-logo {
            display: none !important;
        }

        & .desktop-menu-toggler {
            display: block !important;
        }

        & .material-symbols-outlined {
            margin: 0 20px !important;
            font-size: 30px;
        }

        & .p-menuitem-text,
        & .p-submenu-icon {
            position: relative !important;
            opacity: 1 !important;
            margin-right: 20px;
        }
    }
}
</style>