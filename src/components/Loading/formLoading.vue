<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>
<template>
    <div class="bg-card p-4 border-round">
        <div style="border-bottom : 1px solid" class="mb-4 py-2 flex justify-content-between align-items-center">
            <Skeleton height="1.5rem" width="15rem" class="m-3"></Skeleton>
            <div class="flex align-items-center">
                <Skeleton height="2.7rem" width="8rem" class="mx-2"></Skeleton>
                <Skeleton height="1.5rem" width="3.5rem" style="border-radius : 12px;" class="mx-1"></Skeleton>
            </div>
            
        </div>
        
        <div class="flex flex-column justify-content-center">
            <div class="bg-card w-full">
                <div class="flex grid justify-content-center w-full" v-for="i in 3" :key="i">
                    <div class="flex align-items-center p-2 mx-0 md:mx-2 col-4">
                        <div class="bg-card" style="border-radius : 1px;">
                            <Skeleton height="3rem" class="w-2rem md:w-3rem" style="border-radius : 1px;"></Skeleton>
                        </div>
                        <Skeleton height="3rem" style="border-radius : 1px;" class="w-full"></Skeleton>
                    </div>
                    <div class="flex align-items-center p-2 mx-0 md:mx-2 col-7">
                        <div class="bg-card" style="border-radius : 1px;">
                            <Skeleton height="3rem" class="w-2rem md:w-3rem" style="border-radius : 1px;"></Skeleton>
                        </div>
                        <Skeleton height="3rem" style="border-radius : 1px;" class="my-3 w-full"></Skeleton>
                    </div>
                </div>
            </div>
            <Skeleton height="2.5rem" class="m-3 w-full"></Skeleton>
        </div>
    </div>
</template>