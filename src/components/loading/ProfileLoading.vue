<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>
<template>
    <div class="border-round border-1 surface-border p-4 surface-card">
        <div class="mb-3 absolute m-5">
            <Skeleton shape="circle" size="5rem" class="mx-3"></Skeleton>
            <Skeleton width="10rem" class="my-4"></Skeleton>
        </div>
        <Skeleton width="100%" height="180px"></Skeleton>
        <div class="relative mt-3">
            <Skeleton width="15rem" height="1rem" class="absolute m-5"></Skeleton>
            <Skeleton width="65rem" height="2rem" class="absolute m-5 top-50"></Skeleton>
            <Skeleton width="100%" height="250px" class="my-5"></Skeleton>
        </div>
        <div class="relative mt-3">
            <Skeleton width="15rem" height="1rem" class="absolute m-5"></Skeleton>
            <Skeleton width="65rem" height="2rem" class="absolute m-5 top-50"></Skeleton>
            <Skeleton width="100%" height="250px" class="my-5"></Skeleton>
        </div>
    </div>
</template>