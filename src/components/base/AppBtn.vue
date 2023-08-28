
<script setup lang="ts">
const props = defineProps<AppBtnParams>();

</script>
<template>
    <a class="icon-btn">
        <i :class="'pi pi-' + props.icon"></i>
    </a>
</template>
