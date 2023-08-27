<script setup lang="ts">
import { useMenuStore } from "@/stores/menu"

const store = useMenuStore()
</script>

<template>
  <main>
    {{ store.count }}
    <button @click="store.increment">increment</button>
  </main>
</template>
