import { ref, h, type VNode, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ApiResponseList, AppTableParams, ITableHeader } from '@/types/types'
import { type FormKitSchemaNode } from '@formkit/core'
import Column from 'primevue/column';
import type { ColumnProps } from 'primevue/column'
import { convertApiDate } from '@/utils/date/date'
import type { FilterMatchModeOptions } from 'primevue/api'
import { useI18n } from 'vue-i18n'

export const useTableStore = defineStore('table', () => {
  const filters = ref({})
  const showDeletedData = ref(false)
  const modelSelection = ref([])
  const { t } = useI18n()
  const filtersForm = ref<FormKitSchemaNode[]>([])
  const columns = ref<VNode[]>([])
  let apiResponse: ApiResponseList | undefined
  const data = computed(() => {
    if (!apiResponse) return []
    if (showDeletedData.value) return apiResponse.deletedRecords
    return apiResponse.records
  })
  const deleteRestoreBtn = computed(() => {
    if (showDeletedData.value) return { icon: 'replay', label: 'restore', empty: "empty_records_deleted" }
    return { icon: 'trash', label: 'delete', empty: "empty_records" }
  })
  const activeFilters = computed(() => {
    const active: Record<string, { input: string, value: any }> = {}
    for (const key of Object.keys(filters.value)) {
      const value = filters.value[key].value
      if (value != null && value != "") {
        active[key] = { input: key, value }
      } else {
        delete active[key]
      }
    }
    return active
  })
  const selectedIds = computed(() => {
    return modelSelection.value.map((row: any) => row.roleId)
  })
  const reset = () => {
    filters.value = {}
    filtersForm.value = []
    columns.value = []
    apiResponse = undefined
  }

  const generateColumns = (headers: Record<string, ITableHeader>) => {
    const columns: VNode[] = []
    const hederKeys = Object.keys(headers)

    const selectColumn = h(Column, {
      selectionMode: 'multiple',
      headerStyle: {
        width: "3rem"
      }
    })
    columns.push(selectColumn)

    for (const key of hederKeys) {
      const header = headers[key]
      const slots = {} as any
      let columnProps: ColumnProps = {
        field: key,
        header: t(key),
        filterField: key,
      }
      if (header.columnProps) {
        columnProps = { ...columnProps, ...header.columnProps }
      }
      if (header.filter) {
        appendFilter(key, header.filter.mode)
        filtersForm.value.push(header.filter.input)
      }
      if (header.renderHtml) {
        slots['body'] = (slotProps) => header.renderHtml!(slotProps.data)
      }
      const columnComp = h(Column, columnProps, slots)
      columns.push(columnComp)
    }
    return columns
  }
  const initTable: (params: AppTableParams) => Promise<boolean> = (params: AppTableParams) => {
    reset()
    return new Promise<boolean>((resolve: Function) => {
      columns.value = generateColumns(params.headers)
      apiResponse = params.apiResponse

      // data.value = params.data.map((row: any) => {
      //   for (const key of Object.keys(params.headers)) {
      //     const d = row[key]
      //     if (row[key].nanos) {
      //       row[key] = convertApiDate(row[key])
      //     }
      //   }

      //   return row
      // })
      resolve(true)
      // setTimeout(() => {
      // }, 4000)
    })
  }


  const appendFilter = (name: string, mode: FilterMatchModeOptions) => {
    filters.value[name] = { value: null, matchMode: mode }
  }

  const removeFilter = (name: string) => {
    filters.value[name].value = null
  }

  const clearFilters = () => {
    for (const key of Object.keys(filters.value)) {
      filters.value[key].value = null
    }
  }

  const bindFilterValue = (name: string, value: any) => {
    const date = new Date(value)
    console.log("data", date.getTime())
    // let timestamp = Date.parse('foo');

    if (typeof date.getTime != 'undefined') {
      if (!isNaN(date.getTime())) {
        filters.value[name].value = date
        return
      }
    }
    filters.value[name].value = value
  }


  return {
    initTable,
    filters,
    removeFilter,
    selectedIds,
    apiResponse,
    clearFilters,
    modelSelection,
    filtersForm,
    columns,
    deleteRestoreBtn,
    showDeletedData,
    activeFilters,
    bindFilterValue,
    data
  }
})
