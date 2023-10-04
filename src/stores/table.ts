import { ref, type Ref, h, type VNode, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ApiResponseList, AppTableParams, ITableHeader } from '@/types/types'
import { type FormKitSchemaNode } from '@formkit/core'
import Column from 'primevue/column';
import type { ColumnProps } from 'primevue/column'
import { convertApiDate } from '@/utils/date/date'
import type { FilterMatchModeOptions } from 'primevue/api'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export const useTableStore = defineStore('table', () => {
  const filters = ref({})
  const modelSelection = ref([])
  const { t } = useI18n()
  const router = useRouter()
  const showDeletedData = ref(router.currentRoute.value.query.deleted == "true")
  const filtersForm = ref<FormKitSchemaNode[]>([])
  const columns = ref<VNode[]>([])
  const showDeletedRef = ref<Boolean>(false)
  let apiResponse: Ref<ApiResponseList | undefined> = ref()
  const data = computed(() => {
    if (!apiResponse.value) return []
    if (showDeletedData.value) return apiResponse.value.deletedRecords
    return apiResponse.value.records
  })
  const deleteRestoreVaraints = computed(() => {
    if (showDeletedData.value) return { icon: 'replay', label: 'restore', empty: "empty_records_deleted" }
    return { icon: 'trash', label: 'delete', empty: "empty_records" }
  })
  const activeFilters = computed(() => {
    const active: Record<string, { input: string, value: any }> = {}
    const params: Record<string, string> = {}
    for (const key of Object.keys(filters.value)) {
      const value = filters.value[key].value
      if (value != null && value != "") {
        active[key] = { input: key, value }
        params[key] = value
      } else {
        delete active[key]
      }
    }
    // addParamsToLocation(params)
    return active
  })
  const selectedIds = computed(() => {
    return modelSelection.value.map((row: any) => row.roleId)
  })
  const reset = () => {
    filters.value = {}
    filtersForm.value = []
    columns.value = []
    apiResponse.value = undefined
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
      apiResponse.value = params.apiResponse
      columns.value = generateColumns(params.headers)
      resolve(true)

    })
  }

  const deleteSelectedRows = () => {
    if (!apiResponse.value) return


    if (!apiResponse.value.records) apiResponse.value.records = []
    if (!apiResponse.value.deletedRecords) apiResponse.value.deletedRecords = []

    if (showDeletedData.value) {
      apiResponse.value.records = apiResponse.value.records.concat(modelSelection.value)
      apiResponse.value.deletedRecords = apiResponse.value.deletedRecords.filter(r => !modelSelection.value.includes(r as never))
      modelSelection.value = []
      return
    }
    apiResponse.value.deletedRecords = apiResponse.value.deletedRecords.concat(modelSelection.value)
    apiResponse.value.records = apiResponse.value.records.filter(r => !modelSelection.value.includes(r as never))
    modelSelection.value = []
    return
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
    // addParamsToLocation,
    deleteSelectedRows,
    modelSelection,
    filtersForm,
    columns,
    deleteRestoreVaraints,
    showDeletedData,
    activeFilters,
    bindFilterValue,
    data
  }
})
