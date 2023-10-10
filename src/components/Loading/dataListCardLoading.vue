<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>
<template>
<div class="bg-card  p-4">
    <div class="mb-1 flex justify-content-between border-1 border-solid p-4 border-round">
        <Skeleton height="3rem" width="7rem" class=""></Skeleton>
        <Skeleton height="3rem" width="7rem" class=""></Skeleton>
    </div>
    <div class="mb-5 flex justify-content-between align-items-center p-4 border-round">
        <Skeleton width="10rem" height="1.5rem" class="mb-2"></Skeleton>
        <div class="flex align-items-center">
            <Skeleton height="2rem" width="3.5rem" class="mx-5" style="border-radius : 12px;"></Skeleton>
            <div class="bg-card" style="border-radius : 1px;">
                <Skeleton height="3rem" width="3rem" style="border-radius : 1px;"></Skeleton>
            </div>
            <Skeleton height="3rem" width="10rem" style="border-radius : 1px;" class=""></Skeleton>
        </div>
    </div>
    <div class="flex grid justify-content-center">
        <div class="m-2 col-12 sm:col-6 md:col-3 flex border-round bg-card my-3">
            <Skeleton size="10rem"></Skeleton>
            <div class="flex-grow-1 w-9  flex align-items-center justify-content-center">
                <div class="absolute top-0 right-0 p-2 flex">
                    <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                    <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                </div>
            </div>
        </div>
        <div class="app-card m-2 col-12 sm:col-6 md:col-3 flex border-round bg-card my-3">
            <Skeleton size="10rem"></Skeleton>
            <div class="flex-grow-1 w-9 flex align-items-center justify-content-center">
                <div class="absolute top-0 right-0 p-2 flex">
                    <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                    <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                </div>
            </div>
        </div>
        <div class="app-card m-2 col-12 sm:col-6 md:col-3 flex border-round bg-card my-3">
            <Skeleton size="10rem"></Skeleton>
            <div class="flex-grow-1 w-9 flex align-items-center justify-content-center">
                <div class="absolute top-0 right-0 p-2 flex">
                    <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                    <Skeleton shape="circle" size="2rem" class="mr-2"></Skeleton>
                </div>
            </div>
        </div>
    </div>
</div>
</template>