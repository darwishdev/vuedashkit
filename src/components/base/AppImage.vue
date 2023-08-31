
<script setup lang="ts">
import Image, { type ImageSlots } from 'primevue/image';
import { h, ref } from 'vue';
import { type AppImageParams } from '@/types/types'


const props = defineProps<AppImageParams>();
const slots = defineSlots<ImageSlots>();

// get needed urls provided by package config
const baseImageUrl = import.meta.env.VITE_BASE_IMG
const fallBackImageUrl = import.meta.env.VITE_FALLBACK_IMG
const imageSrc = ref(`${baseImageUrl}${props.src}`)
// function to render the primevue image component
const renderImage = () => {
    // let src = fallBackImageUrl
    // if (props.src != "") src = baseImageUrl + props.src
    return h(Image, {
        src: imageSrc.value, onError: () => {
            imageSrc.value = fallBackImageUrl
            console.log("form image error")
        }
    }, slots)
}

</script>

<template>
    <component :is="renderImage" />
</template>
