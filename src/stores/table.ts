
import type { InitTableParams, tableFetchFn, ApiResponseList, TRecordDefault, DeleteRestoreHandler } from '@/types/types'
import { defineStore } from 'pinia'
import type { DataTableFilterMetaData } from 'primevue/datatable'
import { ref, computed } from 'vue'

export const useTableStore = defineStore('table', () => {
  const showDeletedRef = ref<Boolean>(false)
  const dataListElementRef = ref()

  const modelSelectionRef = ref<any[]>([])
  const deleteRestoreHandler = ref<DeleteRestoreHandler | undefined>()
  const records = ref<any[]>([])
  const deletedRecords = ref<unknown[] | undefined>([])
  let fetchFn: tableFetchFn<ApiResponseList<TRecordDefault>, TRecordDefault> | undefined
  let dataKey: string = ""
  const tableFiltersRef = ref<Record<string, DataTableFilterMetaData> | undefined>()

  const data = computed(() => {
    if (showDeletedRef.value) return deletedRecords.value
    return records.value
  })
  const selectedIds = computed(() => {
    return modelSelectionRef.value.map((row: any) => {
      return row[dataKey]
    })
  })
  const isAllRecordsSelected = computed<boolean>(() => {
    if (modelSelectionRef.value.length == 0) return false
    if (showDeletedRef.value) {
      return modelSelectionRef.value === deletedRecords.value
    }
    return modelSelectionRef.value.length === records.value.length

  })
  const updateCellValue = (cellNumber: number, cellKey: string, cellValue: any) => {
    records.value[cellNumber][cellKey] = cellValue
  }
  const deleteRestoreVaraints = computed(() => {
    if (showDeletedRef.value) return { icon: 'replay', label: 'restore', empty: "empty_records_deleted" }
    return { icon: 'trash', label: 'delete', empty: "empty_records" }
  })
  const reset = () => {
    dataKey = ""
    showDeletedRef.value = false
    modelSelectionRef.value = []
    records.value = []
    deletedRecords.value = undefined
    fetchFn = undefined
  }

  const refetchData = async () => {
    if (!fetchFn) return
    fetchFn({}).then((response) => {
      records.value = response.records
      deletedRecords.value = response.deletedRecords
    })


  }
  const initTable = (params: InitTableParams<ApiResponseList<TRecordDefault>, TRecordDefault>) => {
    reset()
    if (params.initiallySelectedItems) modelSelectionRef.value = params.initiallySelectedItems
    records.value = params.records
    deletedRecords.value = params.deletedRecords
    deleteRestoreHandler.value = params.deleteRestoreHandler
    tableFiltersRef.value = params.tableFiltersRef
    showDeletedRef.value = params.deletedFilter
    fetchFn = params.fetchFn
    dataKey = params.dataKey
    console.log("init", params.initiallySelectedItems)
  }

  const deleteSelectedRows = () => {
    if (!deletedRecords.value) return
    if (showDeletedRef.value) {
      records.value = records.value.concat(modelSelectionRef.value)
      deletedRecords.value = deletedRecords.value.filter(r => !modelSelectionRef.value.includes(r))
    } else {
      deletedRecords.value = deletedRecords.value.concat(modelSelectionRef.value)
      records.value = records.value.filter(r => !modelSelectionRef.value.includes(r))
    }
    modelSelectionRef.value = []
    return
  }

  return {
    initTable,
    data,
    records,
    deletedRecords,
    selectedIds,
    deleteSelectedRows,
    refetchData,
    isAllRecordsSelected,
    modelSelectionRef,
    dataListElementRef,
    updateCellValue,
    deleteRestoreHandler,
    fetchFn,
    tableFiltersRef,
    deleteRestoreVaraints,
    showDeletedRef,
  }
})
