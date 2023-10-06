

<script  lang="ts">
function mockLoad() {
    return new Promise(r => setTimeout(r, 3000))
}
</script>

<script setup lang="ts">
await mockLoad()
</script>
<template>
    <h2>product update</h2>
</template>