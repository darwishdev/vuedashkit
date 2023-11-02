
<script setup lang="ts">
import { h } from 'vue';
import type { AppPanelProps } from '@/types/types'
import { useI18n } from 'vue-i18n'
import Panel from 'primevue/panel';
const props = defineProps<AppPanelProps>();
const emit = defineEmits<{
    (e: 'update:toggleable', value: boolean): void
}>();
const slots = defineSlots<{
    default(): any
    title(): any
    icon(): any
    header(): any
    togglericon({ collapsed }): any
    icons(): any
    headerStart(): any
    headerEnd(): any
}>()
// translations
const { t } = useI18n()


// the entry point for the component while we render the panel
const renderPanel = () => {

    return h(Panel, {
        class: "app-panel",
        toggleable: props.toggleable,
        collapsed: props.collapsed
    }, {
        header: slots.header ? slots.header() : () => h('div', {
            class: 'app-panel-header'
        }, [
            slots.icon ? slots.icon() : h('i', { class: `pi pi-${[props.icon]}` }),
            slots.title ? slots.title() : h("span", t(props.header || '')),
            slots.headerStart ? slots.headerStart() : null
        ]),
        icons: () => slots.headerEnd ? slots.headerEnd() : null,
        togglericon: slots.togglericon ? slots.togglericon : ({ collapsed }) => h('i', { class: collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up' }),
        default: () => slots.default()
    })
}

</script>
<template>
    <component :is="renderPanel()" />
</template>



<style scope deep lang="scss">
.app-panel {

    & .p-panel-header,
    .p-panel-content {
        background: var(--color-card);
        border: none;
    }

    & .p-panel-header {
        & .app-panel-header {
            display: flex;
            align-items: center;
            z-index: 2;
            gap: 10px;

        }

        & span {
            font-size: 1.4rem;
        }


        & .p-panel-icons {
            position: absolute;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            text-align: end;
            align-items: center;
            z-index: 1;
            transform: translateX(-20px);
            height: 100%;

            .pi-filter-slash {
                position: absolute;
                right: 50px;
                z-index: 3;
                cursor: pointer;
                top: 50%;
                transform: translateY(-50%);
            }

            & button {

                display: inline;
                text-align: end;
                width: 100%;
                padding: 0 20px;
                height: 100%;

                &:hover {
                    background: var(--color-card);
                    transition: all 0.3s;
                }
            }
        }

        & .pi-times {
            margin-inline: 10px;
        }


    }
}
</style>@/types/types