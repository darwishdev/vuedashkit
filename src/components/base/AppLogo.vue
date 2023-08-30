
<script setup lang="ts">
import type { AppLogoParams } from '@/types/types';
import { RouterLink } from 'vue-router' 
import { h , resolveComponent } from 'vue';

const props = defineProps<AppLogoParams>();

const renderFunction = () => {
    // const logoComponentName = props.iconOnly ? 'LogoIcon' : 'Logo'
    const logoComponent = resolveComponent('Logo')
    console.log(logoComponent)
    if(props.disabled ){
        return h(logoComponent)
    } 
    return h(RouterLink ,{
        to:"/",
    } , "hello")
    // return h(RouterLink , {
    //     to: {
    //         name : "home_view"
    //     }
    // } , [logoComponent])
 
}

</script>
<template>
   <component class="logo-container" :is="renderFunction"/>
</template>
