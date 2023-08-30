<script lang="ts" setup>
import { useDialogStore } from '@/stores/dialog';
import { useLanguageStore } from '@/stores/language';
import { useMenuStore } from '@/stores/menu';
import { useThemeStore } from '@/stores/theme';
const menuStore = useMenuStore()
const languageStore = useLanguageStore()
const themeStore = useThemeStore()
const dialogStore = useDialogStore()

</script>
<template>
    <nav class="app-nav">
        <div class="start">
            <button @click="menuStore.toggleSidebar">toggle sidebar</button>
            <h1>logo</h1>
        </div>
        <div class="end">
            <app-btn   @click="menuStore.toggleSidebar" label="menu" icon="bars"></app-btn >
            <app-btn   @click="languageStore.toggleRtl" icon="globe"></app-btn >
            <app-btn   @click="themeStore.changeTheme" icon="moon"></app-btn >
            <app-btn   @click="dialogStore.open" icon="user"></app-btn >
            <app-btn   @click="dialogStore.close" icon="user"></app-btn >
        </div>
    </nav>
</template>