<script lang="ts" setup>
import { useDialogStore } from '@/stores/dialog';
import { useLanguageStore } from '@/stores/language';
import Menu from 'primevue/menu';
import { useBreadcrumbStore } from '@/stores/breadcrumb';
import Breadcrumb from 'primevue/breadcrumb';
import { useMenuStore } from '@/stores/menu';
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme';
import { useAuthStore } from '@/stores/auth';
const menuStore = useMenuStore()
const languageStore = useLanguageStore()
const themeStore = useThemeStore()
const dialogStore = useDialogStore()
const authStore = useAuthStore()
const breadcrumbStore = useBreadcrumbStore();
const profileMenu = ref();


const logout = () => {
    authStore.logout()
}
const toggleProfileMenu = (event: Event) => {
    profileMenu.value.toggle(event)
}
</script>
<template>
    <nav class="app-nav">
        <div class="start">
            <app-btn class="sidebar-toggler" @click="menuStore.toggleSidebar" icon="bars"></app-btn>
            <app-logo iconOnly />
            <Breadcrumb :home="breadcrumbStore.breadcrumbHome" :model="breadcrumbStore.breadcrumbs"
                v-if="breadcrumbStore.breadcrumbs.length > 0" />

        </div>

        <div class="end">
            <app-btn @click="languageStore.toggleRtl" icon="globe"></app-btn>
            <app-btn @click="themeStore.changeTheme" icon="moon"></app-btn>
            <app-btn @click="toggleProfileMenu" icon="user"></app-btn>
            <Menu v-if="!$slots['end']" ref="profileMenu" id="overlay-menu" :popup="true">
                <template #start>
                    <router-link :to="{ name: 'profile_view' }"
                        class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">

                        <div class="flex flex-column align">
                            <span class="text-sm">{{ $t('profile') }}</span>
                        </div>
                    </router-link>
                </template>
                <template #end>
                    <button @click="logout" id="logout-btn"
                        class="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround">
                        <i class="pi pi-sign-out" />
                        <span class="ml-2">{{ $t('logout') }}</span>
                    </button>
                </template>
            </Menu>
        </div>
    </nav>
</template>

<style lang="scss" scoped deep>
.app-nav {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border: 2px solid var(--color-border);
    border-radius: 10px;

    @media (max-width: 676px) {

        & .p-breadcrumb {
            display: none;
        }

        & .logo-container {
            margin: 0;
        }

        & .end {
            min-width: auto;
        }
    }

    & .start {
        margin-inline-start: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & .end {
        display: flex;
        justify-content: end;
        align-items: center;
        text-align: end;
        margin-inline-end: 20px;

        @media (min-width: 676px) {

            min-width: 200px;
        }
    }



    @media (min-width: 992px) {
        & .sidebar-toggler {
            display: none;
        }

        & .logo-container {
            display: none !important;
        }
    }
}
</style>