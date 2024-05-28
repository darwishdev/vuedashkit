<script lang="ts" setup>
import { h, ref } from 'vue'
import type { InputSelectProps } from '@/types/types'
import Dropdown, { type DropdownSlots } from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import { useI18n } from 'vue-i18n';
import {
    useOptionSlot, useValueSlot, useOptionGroupSlot
} from './DropdownSlots'
import AppBtn from '@/components/base/AppBtn.vue';
import { useRouter } from 'vue-router';
const { t } = useI18n()
const props = defineProps<InputSelectProps>();
const slots = defineSlots<DropdownSlots>();
const isOptionsLoaded = ref(false)
const valueRef = ref(props.context.node._value as number)
const router = useRouter()
const renderSelect = () => {
    const optionValue = props.context.primeProps.optionValue ? props.context.primeProps.optionValue as string : ''

    let optionSlot = slots.option as any
    if (!optionSlot) {
        optionSlot = (val: any) => useOptionSlot(val, props.context, t)
    }
    let valueSlot = slots.value as any
    if (!valueSlot && !props.context.isMultiple) {
        valueSlot = (val: any) => useValueSlot(val, props.context, t)
    }
    let optionGroupSlot = slots.optiongroup as any
    if (!optionGroupSlot) {
        optionGroupSlot = (val: any) => useOptionGroupSlot(props.context)
    }

    const component = props.context.isMultiple ? MultiSelect : Dropdown

    return h(component, {
        ...props.context.primeProps,
        loading: props.context.loading,
        options: props.context.options,
        display: "chip",
        modelValue: valueRef.value,
        optionLabel: props.context.primeProps.optionLabel ? props.context.primeProps.optionLabel : 'label',
        filter: props.context.filter,
        optionGroupLabel: props.context.hasGroup ? 'groupName' : undefined,
        optionGroupChildren: props.context.hasGroup ? 'items' : undefined,
        filterPlaceholder: t('filter_the_list'),
        class: 'w-full flex align-items-center',
        onBeforeShow: async () => {
            if (props.context.lazyLoad) {
                if (!isOptionsLoaded.value) {
                    let isCacheFound = false
                    if (props.context.cacheKey) {
                        isCacheFound = await props.context.readCache()

                    }
                    if (!isCacheFound) {
                        await props.context.loadOptions()
                    }
                    isOptionsLoaded.value = true
                }
            }
        },
        'onUpdate:modelValue': (value: any) => {
            valueRef.value = value
            if (props.context.convertToFlat) {
                props.context.node.input(value)
            } else {
                if (value) {
                    props.context.node.input(value[optionValue])
                }
            }
        }

    }, {
        ...slots,
        option: optionSlot,
        value: valueSlot,
        optiongroup: optionGroupSlot,
        header: (val: any) => h('div', {
            class: "flex gap-5 dropdown-header"
        }, [
            h(AppBtn, { label: t('reload'), icon: 'reload', onClick: () => props.context.loadOptions() }),
            props.context.createRoute ? h(AppBtn, { label: t('create'), icon: 'plus', onClick: () => router.push(props.context.createRoute!) }) : null
        ]),
    })
}
</script>
<template>
    <component :is="renderSelect" />
</template>