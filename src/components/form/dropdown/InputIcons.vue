<script lang="ts" setup>
import { onMounted, h, ref } from 'vue'
import type { InputIconsProps } from '@/types/types'
import Dropdown, { type DropdownSlots } from 'primevue/dropdown';
import { useI18n } from 'vue-i18n';
import { db } from '@/db/db';
import AppBtn from '@/components/base/AppBtn.vue';
import { useThemeStore } from '@/stores/theme';
import { useIconsOptionSlot, useIconsValueSlot } from './DropdownSlots';
const { t } = useI18n()
const props = defineProps<InputIconsProps>();
const slots = defineSlots<DropdownSlots>();
const optionsRef = ref<any[]>([])
const loadingRef = ref(true)
const valueRef = ref(props.context.node._value as number)
const themeStore = useThemeStore()


onMounted(() => {
    db.icons.toArray().then(icons => {
        optionsRef.value = icons
        loadingRef.value = false
    }).catch((err) => {
        console.log('error getting icons to input from local db', err)
        loadingRef.value = false
    })
})
const renderSelect = () => {
    let optionSlot = slots.option as any
    if (!optionSlot) {
        optionSlot = (val: any) => useIconsOptionSlot(val)
    }
    let valueSlot = slots.value as any
    if (!valueSlot) {
        valueSlot = (val: any) => useIconsValueSlot(val)
    }
    return h(Dropdown, {
        ...props.context.primeProps,
        loading: loadingRef.value,
        options: optionsRef.value,
        modelValue: valueRef.value,
        optionLabel: 'iconName',
        filter: true,
        filterPlaceholder: t('filter_the_list'),
        class: 'w-full flex align-items-center icons-input',
        'onUpdate:modelValue': (value: any) => {
            valueRef.value = value
            props.context.node.input(value)
        }

    }, {
        ...slots, option: optionSlot, value: valueSlot,
        header: (val: any) => h('div', {
            class: "flex gap-5"
        }, [
            h(AppBtn, { label: t('reload'), icon: 'reload', onClick: () => themeStore.fetchIcons() }),

        ]),
    })
}
</script>
<template>
    <component :is="renderSelect" />
</template>