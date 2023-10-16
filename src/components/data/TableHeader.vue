<script setup lang="ts">
import { h, resolveComponent, ref } from 'vue';
import type { TableHeaderProps } from '@/types/types'
import { useI18n } from 'vue-i18n'
import { RouteQueryAppend, RouteQueryRemove } from '@/utils/router/query';
import { Debounce } from '@/utils/debounce/debounce'
import { useTableNewStore } from '@/stores/tablenew';
import { useNotificationStore } from '@/stores/notification';
const tableStore = useTableNewStore()
const notificationStore = useNotificationStore()


const props = defineProps<TableHeaderProps>();
const { deletedFilter, searchKey } = props
const formkitComp = resolveComponent('FormKit')
const emit = defineEmits<{
    (e: 'update:globalSearch', value: string): void
}>();
const { t } = useI18n()
// debounced emit used here to add some delay on the emit that will apply the filter
// to avoid making unneccessary work
const debouncedGlobalSearchEmit = Debounce((value: string) => {
    emit('update:globalSearch', value);
    // tableFiltersRef.value = { ...value }

}, 500);

const renderGlobalSearchFilter = () => {
    if (!props.showGlobalSearchFilter) {
        return
    }
    return h(formkitComp, {
        type: "text",
        value: searchKey,
        prefixIcon: 'search',
        onInput: (v: string) => {
            debouncedGlobalSearchEmit(v)
            if (!v) {
                RouteQueryRemove('search')
                return
            }
            RouteQueryAppend('search', v)
        },
        placeholder: t("search"),

    })

}
const renderDeletedFilter = () => {
    if (!tableStore.deletedRecords) return
    return h(formkitComp, {
        type: "toggle",
        value: deletedFilter,
        outerClass: "deleted-toggle",
        onInput: (v: boolean) => {
            console.log("updated", v)
            RouteQueryAppend('showDeleted', v)
            tableStore.showDeletedRef = v
            tableStore.modelSelectionRef = []
        },
        label: t("show_deleted_data"),

    })
}


const renderSelectAll = () => {
    if (!tableStore.data) return
    if (tableStore.data.length == 0 || props.displayType != 'card') return
    return h(formkitComp, {
        type: "toggle",
        modelValue: tableStore.isAllRecordsSelected,
        outerClass: "deleted-toggle",
        onInput: (v: boolean) => {
            if (v) {
                if (tableStore.data) {
                    tableStore.modelSelectionRef = tableStore.data
                } else {
                    notificationStore.showError('select_all_empty', 'select_all_detail')
                }
                return
            }
            if (tableStore.modelSelectionRef.length == tableStore.data?.length) {
                tableStore.modelSelectionRef = []

            }
        },
        label: t("select_all"),

    })
}
const renderHeader = () => {
    return h('div', {
        class: "table-header"
    }, [
        h('div', {
            class: 'start'
        }, [
            h('h1', t(props.title))
        ]),

        h('div', {
            class: 'end'
        }, [
            renderDeletedFilter(),
            renderSelectAll(),
            renderGlobalSearchFilter(),
        ])
    ])

}

</script>
<template>
    <component :is="renderHeader()" />
</template>



<style lang="scss">
.table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid var(--color-border);
    flex-wrap: wrap;

    @media (max-width : 676px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    & .start {
        flex: 1;
    }

    & .end {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;

        & .deleted-toggle {
            margin-inline-end: 30px !important;
        }

    }
}
</style>@/types/types