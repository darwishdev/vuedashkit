
 
<script setup lang="ts">
import type { UnitHeaderProps } from '@/types/types';
import { h } from 'vue'
import { useI18n } from 'vue-i18n';
import { FormateCurrency } from '@/utils/currency/currency';
import type { VNode } from 'vue';
const props = defineProps<UnitHeaderProps>();
const { t } = useI18n()


const renderHeader = () => {
    if (props.headers.length == 0) return
    const topElements: VNode[] = []
    const bottomElements: VNode[] = []
    props.headers.forEach(header => {
        topElements.push(h('div', { style: `background: ${header.background}` }, t(header.label)))
        bottomElements.push(h('div', { style: `background: ${header.background}` }, header.is_currency ? FormateCurrency(header.value, t('currency')) : header.value))
    })
    return h('div', { class: `unit-header ${props.class}` }, [
        h('div', { class: 'top' }, topElements),
        h('div', { class: 'bottom' }, bottomElements)
    ])
}
</script>
<template>
    <component :is="renderHeader" />
</template> 

<style lang="scss">
.unit-header {
    width: 100%;
    border-radius: 8px;
    padding: 0px;
    background: var(--color-card);


    &.border,
    &.border .bottom>div {
        border: 1px solid var(--color-white);
    }

    &.danger-border {
        border-color: var(--color-danger);

        & .bottom {
            &>div {
                border-color: var(--color-danger);
            }
        }
    }

    &.success-border {
        border-color: var(--color-success);

        & .bottom {
            &>div {
                border-color: var(--color-success);
            }
        }
    }


    &>div {
        display: flex;
        justify-content: space-around;
        gap: 2px;
    }

    & .top {


        &>div {
            display: flex;
            justify-content: center;
            padding: 5px 0;
            width: 100%;
            border-radius: var(--border-radius);
        }
    }

    & .bottom {
        &>div {
            width: 100%;
            text-align: center;
            height: 100%;
            border-radius: 6px;
            background: var(--color-card);
            padding: var(--fk-padding-input);

        }
    }

}
</style>