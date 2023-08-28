<script lang="ts">

function roleDeleteRestore() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}
</script>


<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const themeStore = useThemeStore()
const r = await roleDeleteRestore()
themeStore.stopProgressBar()
</script>

<template>
  <main>


    {{ r }}
  </main>
</template>
