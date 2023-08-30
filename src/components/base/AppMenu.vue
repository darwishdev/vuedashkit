
<script setup lang="ts">
import type { AppBtnParams } from '@/types/types';
 import {h} from 'vue'
const props = defineProps<AppBtnParams>();

const renderFunction = () => {
    return h('div'  , null , {default :'menu'})
}

</script>
<template>
   <component class="app-btn" :is="renderFunction"/>
</template>
