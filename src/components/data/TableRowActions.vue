 

<script setup lang="ts">
import { h, resolveComponent, ref } from 'vue';
import type { TableRowActionsProps } from '@/types/types'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';
import { useDialogStore } from '@/stores/dialog';
import Menu from 'primevue/menu';
import Column from 'primevue/column';
import { useTableNewStore } from '@/stores/tablenew';

const slots = defineSlots<{
    prependActions(props: { data: any }): any
    appendActions(props: { data: any }): any
}>()
const tableStore = useTableNewStore()
const props = defineProps<TableRowActionsProps>();
const emit = defineEmits<{
    (e: 'export'): void
}>();
const menuElementsRefs = ref<Record<string, any>>({})
const appBtnComponent = resolveComponent('app-btn')
const router = useRouter()
const dialogStore = useDialogStore()
const { t } = useI18n()
const renderViewBtn = (data: any) => {
    if (!props.viewRouter) return
    const { name, paramColumnName, paramName } = props.viewRouter
    const params = {}
    params[paramName] = data[paramColumnName]
    return h(appBtnComponent, {
        class: "w-full transparent",
        icon: "eye",
        label: t("view"),
        onClick: () => {
            router.push({ name, params })
        }
    })
}

const renderUpdateBtn = (data: any) => {
    if (!props.options.updateHandler) return
    const { routeName } = props.options.updateHandler
    const params = { id: data[props.dataKey] }
    return h(appBtnComponent, {
        class: "w-full transparent",
        icon: "pencil",
        label: t("update"),

        onClick: () => {
            router.push({ name: routeName, params })
        }
    })
}
const renderDeleteRestoreBtn = (data: any) => {
    if (!props.options.deleteRestoreHandler) return
    return h(appBtnComponent, {
        icon: tableStore.deleteRestoreVaraints.icon,
        class: "w-full transparent",
        label: t(tableStore.deleteRestoreVaraints.label),
        onClick: () => {
            tableStore.modelSelectionRef = [data]
            dialogStore.openDeleteRestore()
        }
    })
}
const renderActionsColumn = () => {
    if (!props.options.updateHandler && !props.options.deleteRestoreHandler && !props.viewRouter) return


    const actionsColumn = h(Column, {
        header: 'actions',
        class: "actions-btns",
        headerStyle: {
            width: "3rem"
        },
    }, {
        body: ({ data }) => h('div', {
            class: "actions-wrapperr "
        }, [
            h(appBtnComponent, {
                icon: "ellipsis-v",
                class: "warning",
                onClick: (e: Event) => menuElementsRefs.value[data[props.dataKey]].toggle(e)
            }),
            h(Menu, {
                ref: (el) => {
                    if (el) {
                        menuElementsRefs.value[data[props.dataKey]] = el
                    }
                },
                class: "import-menu",
                popup: true
            },
                {
                    'start': () => h('div', [
                        slots.prependActions ? slots.prependActions(data) : null,
                        renderViewBtn(data),
                        renderUpdateBtn(data),
                        renderDeleteRestoreBtn(data),
                        slots.appendActions ? slots.appendActions(data) : null,
                    ]),
                }
            )
        ])
    })
    return actionsColumn
}
</script>
<template>
    <component :is="renderActionsColumn()" />
</template>


