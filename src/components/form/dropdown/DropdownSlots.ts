import { h } from 'vue'
import AppIcon from '@/components/base/AppIcon.vue';
import { useI18n } from 'vue-i18n';
const translateLable = (value: any, optionLabel: string, isTranslate: boolean, t: Function) => isTranslate ? t(value.value[optionLabel]) : value.value[optionLabel]
export const useOptionGroupSlot = (context: any) => {
    const optionGroupLabel = context.hasGroup ? 'groupName' : undefined
    const optionGroupIcon = context.hasGroup ? 'groupIcon' : undefined
    return h('div', {
        class: 'flex align-items-center gap-5',

    }, [
        optionGroupIcon ? h(AppIcon, { icon: optionGroupIcon }) : null,
        optionGroupLabel ? h('span', optionGroupLabel) : null
    ])
}

export const useValueSlot = (value: any, context: any, t: Function) => {
    const optionLabel = context.primeProps.optionLabel ? context.primeProps.optionLabel as string : 'label'
    // const optionValue = context.primeProps.optionValue ? context.primeProps.optionValue as string : ''
    return !value.value ? h('span', value.placeholder) : h('div', {
        class: 'flex align-items-center gap-3',
    }, [
        value.value.icon ? h(AppIcon, { icon: value.value.icon }) : null,
        value.value[optionLabel] ? h('span', translateLable(value, optionLabel, context.translateLabel, t)) : null,
    ])
}
export const useOptionSlot = (value: any, context: any, t: Function) => {
    const optionLabel = context.primeProps.optionLabel ? context.primeProps.optionLabel as string : 'label'
    const labelName = value.option[optionLabel]
    const translatedLabel = context.translateLabel ? t(labelName) : labelName

    const optionNote = value.option['note']
    const translatedNote = context.translateLabel ? t(optionNote) : optionNote
    return h('div', {
        class: 'flex align-items-center gap-5',
    }, [
        value.option.icon ? h(AppIcon, { icon: value.option.icon }) : null,
        value.option[optionLabel] ?
            h('span', translatedLabel) : null,
        optionNote ?
            h('small', translatedNote) : null,
    ])
}
export const useIconsOptionSlot = (value: any) => {
    return h('div', {
        class: 'flex flex-direction-column flex-column align-items-center gap-1',
    }, [
        value.option.iconName ? h(AppIcon, { icon: value.option.iconName }) : null,
        value.option.iconName ? h('span', value.option.iconName) : null,
    ])
}


export const useIconsValueSlot = (value: any) => {
    return !value.value ? h('span', value.placeholder) : h('div', {
        class: 'flex align-items-center gap-3',
    }, [
        value.value.icon ? h(AppIcon, { icon: value.value.icon }) : null,
        value.value.iconName ? h('span', value.value.iconName) : null,
    ])
}