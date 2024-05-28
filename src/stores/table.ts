
import type { InitTableParams, tableFetchFn, ApiResponseList, TRecordDefault, DeleteHandler, DeleteRestoreHandler } from '@/types/types'
import { defineStore } from 'pinia'
import type { DataTableFilterMetaData } from 'primevue/datatable'
import { ref, computed } from 'vue'

export const useTableStore = defineStore('table', () => {
  const showDeletedRef = ref<Boolean>(false)
  const dataListElementRef = ref()

  const modelSelectionRef = ref<any[]>([])
  const deleteRestoreHandler = ref<DeleteRestoreHandler | undefined>()
  const deleteHandler = ref<DeleteHandler | undefined>()
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
  const prepareRecords = async (records?: any[]): Promise<any[]> => {
    if (!records) return []
    const newRecords: any[] = []
    records.forEach(r => {
      if (r.createdAt) {
        r.createdAt = new Date(r.createdAt)
      }
      if (r.deletedAt) {
        r.deletedAt = new Date(r.deletedAt)
      }
      newRecords.push(r)
    })
    return newRecords
  }
  const refetchData = async () => {
    if (!fetchFn) return
    const response = await fetchFn({})
    const newRecords = await prepareRecords(response.records)
    const newDeletedRecords = await prepareRecords(response.records)
    records.value = newRecords
    deletedRecords.value = newDeletedRecords
  }
  const initTable = (params: InitTableParams<ApiResponseList<TRecordDefault>, TRecordDefault>) => {
    reset()
    if (params.initiallySelectedItems) modelSelectionRef.value = params.initiallySelectedItems
    records.value = params.records
    deletedRecords.value = params.deletedRecords
    deleteRestoreHandler.value = params.deleteRestoreHandler
    deleteHandler.value = params.deleteHandler
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
  const hardDeleteSelectedRows = () => {
    if (!deletedRecords.value) return

    deletedRecords.value = deletedRecords.value.filter(r => !modelSelectionRef.value.includes(r))

    modelSelectionRef.value = []
    return
  }




  const appendRow = (row: any) => {
    records.value.push(row)
  }

  const prependRow = (row: any) => {
    records.value.unshift(row)
  }

  return {
    initTable,
    data,
    appendRow,
    prependRow,
    records,
    deletedRecords,
    selectedIds,
    deleteSelectedRows,
    hardDeleteSelectedRows,
    refetchData,
    isAllRecordsSelected,
    modelSelectionRef,
    dataListElementRef,
    updateCellValue,
    deleteRestoreHandler,
    deleteHandler,
    fetchFn,
    tableFiltersRef,
    deleteRestoreVaraints,
    showDeletedRef,
  }
})
