<script setup lang="ts">
import Image, { type ImageSlots } from 'primevue/image';
import { h, ref, inject } from 'vue';
import { type AppImageProps, type SizeObj } from '@/types/types'


const props = defineProps<AppImageProps>();
const slots = defineSlots<ImageSlots>();
const defaultWidth = 150
// get needed urls provided by package config
const baseImageUrl = inject('baseImageUrl') as string
const fallBackImageUrl = inject('fallBackImageUrl') as string
const imageSrc = ref(`${baseImageUrl}${props.src}`)


const sizeObj: SizeObj | undefined = typeof props.size === 'number' ? { width: props.size } : props.size

// function to render the primevue image component
const renderImage = () => {
    // let src = fallBackImageUrl
    // if (props.src != "") src = baseImageUrl + props.src
    return h(Image, {
        src: imageSrc.value, onError: () => {
            imageSrc.value = fallBackImageUrl
        },
        width: sizeObj ? sizeObj.width : defaultWidth,
        height: sizeObj ? sizeObj.height : undefined
    }, () => slots)
}
const update = (src: string) => {
    imageSrc.value = `${baseImageUrl}${src}`
}

defineExpose({ update })
</script>

<template>
    <component :is="renderImage" />
</template>
<style>
img {
    background-color: var(--fk-bg-input);
    border-radius: 5px;
}
</style>