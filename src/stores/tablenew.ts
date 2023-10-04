
import type { InitTableParams, tableFetchFn, ApiResponseList, TRecordDefault } from '@/types/newtypes'
import { defineStore } from 'pinia'
import type { DataTableFilterMetaData } from 'primevue/datatable'
import { ref, computed } from 'vue'

export const useTableNewStore = defineStore('tablenew', () => {
  const showDeletedRef = ref<Boolean>(false)
  const modelSelectionRef = ref<any[]>([])
  const records = ref<unknown[]>([])
  const deletedRecords = ref<unknown[]>([])
  let fetchFn: tableFetchFn<ApiResponseList<TRecordDefault>, TRecordDefault> | undefined
  let dataKey: string = ""

  const data = computed(() => {
    if (showDeletedRef.value) return deletedRecords.value
    return records.value
  })
  const selectedIds = computed(() => {
    if (modelSelectionRef.value.length == 0 || !dataKey) return []
    if (!(dataKey in modelSelectionRef.value[0])) return []
    return modelSelectionRef.value.map((row: any) => {
      return row[dataKey]
    })
  })
  const deleteRestoreVaraints = computed(() => {
    if (showDeletedRef.value) return { icon: 'replay', label: 'restore', empty: "empty_records_deleted" }
    return { icon: 'trash', label: 'delete', empty: "empty_records" }
  })
  const reset = () => {
    dataKey = ""
    showDeletedRef.value = false
    modelSelectionRef.value = []
    records.value = []
    deletedRecords.value = []
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
    records.value = params.records
    deletedRecords.value = params.deletedRecords
    showDeletedRef.value = params.deletedFilter
    fetchFn = params.fetchFn
    dataKey = dataKey
  }


  const deleteSelectedRows = () => {
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
    modelSelectionRef,
    fetchFn,
    deleteRestoreVaraints,
    showDeletedRef,
  }
})
