<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useLanguageStore } from '@/stores/language'
import PanelMenu from 'primevue/panelmenu';
import { ref } from "vue"
const authStore = useAuthStore()
const languageStore = useLanguageStore()
const expandedKeys = ref();
</script>
<template>
    <PanelMenu exact :model="authStore.sidebarRef" :expandedKeys="expandedKeys">
        <template #item="{ item }">
            <router-link v-slot="{ href, navigate }" class="link" :class="{ 'p-highlight': $route.path === item.route }"
                :to="item.route" custom>
                <a v-ripple class="flex w-full align-items-center justify-between cursor-pointer text-color px-3 py-2"
                    :href="href" @click="navigate">
                    <div class="flex align-items-center ">
                        <span class="sidebar-icon" v-html="item.iconContent"></span>
                        <span class="ml-2 sidebar-label">{{ item[languageStore.keyHelpers.label] }}</span>
                    </div>
                    <svg v-if="item.items" class="submenu-icon" xmlns="http://www.w3.org/2000/svg" width="25"
                        height="25" fill="none" viewBox="0 0 24 24">
                        <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                            d="m10 7 5 5-5 5" />
                    </svg>
                </a>
            </router-link>
        </template>

    </PanelMenu>
</template>

<style lang="scss">
.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action {
    color: var(--color-white);
}

.sidebar-icon {
    width: 25px;
    height: 25px;
}

.sidebar-label {
    color: var(--color-white);
}

.p-highlight .submenu-icon {
    transform: rotate(90deg) !important;
}

.submenu-icon {
    transform: .3s ease-in-out;
    margin-inline-start: auto;
}

.p-panelmenu .p-toggleable-content {
    background: var(--color-card);
}

.p-panelmenu .p-panelmenu-content {
    border: none !important;
    background: none;
}

.p-panelmenu .p-menuitem-link {
    color: var(--color-secondary);
}

.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action {
    padding: 8px 10px;
}

.p-menuitem {
    margin: 10px;
}

.p-submenu-icon {
    order: 2;
}

.p-menuitem-text {
    flex: 1;
}

.p-panelmenu .p-panelmenu-header .material-symbols-outlined {
    margin-inline-end: 20px;
}

.p-panelmenu .p-menuitem .material-symbols-outlined {
    margin-inline-end: 15px;
    font-size: 40px;
}

.p-panelmenu .p-panelmenu-header .p-panelmenu-header-content {
    border: none;
    outline: none !important;
    border-radius: 6px;
    box-shadow: none !important;
    background: transparent !important;
    transition: box-shadow 0.2s;
    border-radius: 6px;
}

.p-panelmenu-header-action {
    outline: none !important;
}
</style>
