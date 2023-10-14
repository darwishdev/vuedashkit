
<script setup lang="ts">
import type { AppLogoProps } from '@/types/types';
import { RouterLink } from 'vue-router'
import { h, resolveComponent } from 'vue';

const props = defineProps<AppLogoProps>();

const renderFunction = () => {
    const logoComponentName = props.iconOnly ? 'LogoIcon' : 'Logo'
    const logoComponent = resolveComponent(logoComponentName)

    if (props.disabled) {
        return h(logoComponent)
    }

    return h(RouterLink, {
        to: { name: 'home_view' },
    }, {

        default: () => h(logoComponent)
    }
    )

}

</script>
<template>
    <component class="logo-container" :is="renderFunction" />
</template>
@/types/types