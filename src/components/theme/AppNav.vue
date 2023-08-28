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
            <button @click="menuStore.toggleSidebar">logout</button>
            <button @click="languageStore.toggleRtl">change language</button>
            <button @click="themeStore.changeTheme">change theme</button>
            <button @click="dialogStore.open">open dialog</button>
            <button @click="dialogStore.close">close dialog</button>
        </div>
    </nav>
</template>