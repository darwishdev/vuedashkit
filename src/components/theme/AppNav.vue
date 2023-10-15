 


<script lang="ts" setup>
import Menu from 'primevue/menu';
import { useBreadcrumbStore } from '@/stores/breadcrumb';
import Breadcrumb from 'primevue/breadcrumb';
import { useMenuStore } from '@/stores/menu';
import { LocaleSetter } from '@/components/form'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import LanguageToggler from '@/components/base/LanguageToggler.vue';
import ThemeToggler from '@/components/base/ThemeToggler.vue';
const localSetterElementRef = ref()
const router = useRouter()
const menuStore = useMenuStore()
const breadcrumbStore = useBreadcrumbStore();
const profileMenu = ref();

const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push("/login")
}
const toggleProfileMenu = (event: Event) => {
    profileMenu.value.toggle(event)
}
</script>
<template>
    <nav class="app-nav">
        <LocaleSetter ref="localSetterElementRef" />
        <div class="start">
            <app-btn class="sidebar-toggler" @click="menuStore.toggleSidebar" icon="bars"></app-btn>
            <app-logo iconOnly />
            <Breadcrumb :home="breadcrumbStore.breadcrumbHome" :model="breadcrumbStore.breadcrumbs"
                v-if="breadcrumbStore.breadcrumbs.length > 0" />

        </div>

        <div class="end">
            <LanguageToggler />
            <ThemeToggler />
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