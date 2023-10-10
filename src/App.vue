<script setup lang="ts">
// import { useQueryProvider } from "vue-query";
import type { LoginHandler } from '@/types/types';
import { RouterView } from 'vue-router'
// import { useAuthStore } from '@/stores/auth';
import { ref, inject, onMounted } from 'vue';
// useQueryProvider();
const loginHandler = inject('loginHandler') as LoginHandler
// const authStore = useAuthStore()
// authStore.init(loginHandler)
// authStore.loadSavedAuthData()
const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <RouterView />
  <div class="app-loading" v-if="loading">loading</div>
</template>
 