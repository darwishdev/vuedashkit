
<script setup lang="ts">
import { h, computed, resolveComponent, ref } from 'vue';
import type { TableFilterProps } from '@/types/newtypes'
import { useI18n } from 'vue-i18n'
import { Debounce } from '@/utils/debounce/debounce'
import { RouteQueryAppend, RouteQueryRemove } from '@/utils/router/query'
import { ObjectKeys } from '@/utils/object/object';
import Panel from 'primevue/panel';
import type { DataTableFilterMetaData } from 'primevue/datatable';
import type { VNode } from 'vue';
import { useTableNewStore } from '@/stores/tablenew';
const tableStore = useTableNewStore()
const props = defineProps<TableFilterProps>();
const emit = defineEmits<{
    (e: 'update:tableFilters', value: Record<string, DataTableFilterMetaData>): void
}>();

// global components
const formkitComp = resolveComponent('FormKit')
const formkitSchemaComp = resolveComponent('FormKitSchema')

// translations
const { t } = useI18n()

// all initial values needed
const { inputsSchema, tableFilters, activeFilters, filterFormValue } = props
// ref to access the form node to be able to reset or remove input value
const filterFormNodeRef = ref()

// ref  to show the active filters on the header
const activeFiltersRef = ref<Record<string, (string | number | Date)>>(activeFilters)
// computed  to toggle showing clear icon while no active filters
const hasActiveFilters = computed(() => ObjectKeys(activeFiltersRef.value).length > 0)

// debounced emit used here to add some delay on the emit that will apply the filter
// to avoid making unneccessary work
const debouncedTableFiltersEmit = Debounce((value: Record<string, DataTableFilterMetaData>) => {
    emit('update:tableFilters', value);
    // tableFiltersRef.value = { ...value }

}, 500);
// call the emit on initial load to notify the parent component about the table filters structure
debouncedTableFiltersEmit(tableFilters)
// function to clear all filters
const clearFilters = () => {
    const node = filterFormNodeRef.value.node
    node._value = {}
    node?.input(node?._value)
}
// function to remove only one filter 
const removeFilter = (filter: string) => {
    const node = filterFormNodeRef.value.node
    if (node?._value) {
        node._value[filter] = null
    }
    node.input(node?._value)
}
// the entry point for the component while we render the panel
const renderFiltersPanel = () => {
    return h(Panel, {
        class: "table-filters",
        toggleable: true,
    }, {
        header: () => h('div', {
            class: 'filters-header'
        }, [
            h('i', { class: 'pi pi-filter' }),
            h("span", t("filters")),
            renderActiveFilters()
        ]),
        icons: () => hasActiveFilters.value ? h("a", {
            class: "pi pi-filter-slash",
            title: "clear filters",
            onClick: () => clearFilters()
        }) : h('div'),

        togglericon: ({ collapsed }) => h('i', { class: collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up' }),
        default: () => renderFiltersFormSchema()
    })
}

// function to render active filters used inside header slot on renderFiltersPanel
const renderActiveFilters = () => {
    if (!hasActiveFilters) {
        return
    }
    const keys = ObjectKeys(activeFiltersRef.value)
    const activeFilters: VNode[] = []
    for (const key of keys) {
        activeFilters.push(h('div', {
            class: "active-filter",
            onClick: (e: Event) => {
                e.preventDefault();
                removeFilter(key)
            }
        }, [
            h("i", { class: 'pi pi-filter-slash' }),
            h("span", `${t(key)} : ${activeFiltersRef.value[key]}`),
            h("i", { class: 'pi pi-times' }),
        ]))
    }

    return h("div", {
        class: "active-filters",

    }, activeFilters);
}

// function to render the actual filter form and it's input called 
//on default [body] slot on panel from renderFiltersPanel function
const renderFiltersFormSchema = () => {
    return h(formkitComp, {
        id: "filter-form",
        ref: "filterFormNodeRef",
        type: "form",
        value: filterFormValue,
        actions: false,
        onInput: onFormInput
    },
        () => h(formkitSchemaComp, {
            schema: {
                $el: "div",
                attrs: {
                    class: "grid",
                },
                children: inputsSchema
            }
        })
    )
}

// the main business logic of the component 
// this function called every time use change formValue
// it's responsipe for 
// 1- update table filters to be emitted
// 2- update active filters based on the new form value
// 3- update url query params
// 4- fire the event to notify parent component
const onFormInput = async (formValue: Record<string, any>) => {
    const keys = ObjectKeys(formValue)
    const urlQuery = {}
    for (const key of keys) {
        const currentInputValue = formValue[key]
        tableFilters[key].value = currentInputValue
        if (currentInputValue) {
            activeFiltersRef.value[key] = currentInputValue
            urlQuery[key] = currentInputValue
        } else {
            delete activeFiltersRef.value[key]
        }
    }
    const formValueString = JSON.stringify(urlQuery)
    formValueString == "{}" ?
        RouteQueryRemove('filterForm') :
        RouteQueryAppend('filterForm', formValueString)


    debouncedTableFiltersEmit(tableFilters)

}
</script>
<template>
    <component :is="renderFiltersPanel()" />
</template>



<style scope deep lang="scss">
.table-filters {
    margin-top: 20px;

    & .p-panel-header,
    .p-panel-content {
        background-color: transparent;
        border: none;
    }

    & .p-panel-header {


        & span {
            font-size: 1.4rem;
        }

        & .filters-header {
            display: flex;
            align-items: center;
            z-index: 2;

            & .active-filters {
                margin-inline-start: 20px;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;

                & .active-filter {
                    background-color: var(--color-card);
                    cursor: pointer;
                    padding: 5px 20px;
                    border-radius: 25px;
                    margin-inline-end: 20px;
                }
            }
        }

        & .p-panel-icons {
            position: absolute;
            width: 100%;
            z-index: 1;
            transform: translateX(-20px);

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

                &:hover {
                    background-color: var(--color-card);
                    transition: all 0.3s;
                }
            }
        }

        & .pi-times {
            margin-inline: 10px;
        }

        & .pi-filter,
        .pi-filter-slash {
            margin-inline-end: 10px;
        }
    }
}
</style>