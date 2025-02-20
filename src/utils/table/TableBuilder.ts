// import type { ApiResponseList, DeleteRestoreHandler, DeleteRestoreVaraints, ITableBuilder, TRecordDefault, tableFetchFn } from "@/types/types"
// import type { DataTableFilterMetaData } from "primevue/datatable"
// import { ref, type Ref } from "vue"

// const deleteRestoreVaraints: Record<'true' | 'false', DeleteRestoreVaraints> = {
//     'true': {
//         icon: 'replay',
//         label: 'restore',
//         empty: "empty_records_deleted"
//     },
//     'false': {
//         icon: 'trash',
//         label: 'delete',
//         empty: "empty_records"
//     }
// }
// export class TableBuilder implements ITableBuilder {

//     elementRef: any = {}
//     showDeletedRef: boolean = false
//     dataKey: string = 're'
//     tableFiltersRef: Ref<Record<string, DataTableFilterMetaData> | undefined>
//     modelSelectionRef: any[]
//     records: Ref<any[]>
//     deletedRecords: Ref<any[]>
//     deleteRestoreHandler?: DeleteRestoreHandler | undefined


//     constructor(showDeletedRef: boolean, dataKey: string, tableFiltersRef: Record<string, DataTableFilterMetaData> | undefined, modelSelectionRef: any[], records: any[], deletedRecords: any[], deleteRestoreHandler?: DeleteRestoreHandler) {
//         // showDeletedRef: boolean, dataKey: string, tableFiltersRef: Record<string, DataTableFilterMetaData> | undefined, modelSelectionRef: any[], records: any[], deletedRecords: any[], deleteRestoreHandler ?: DeleteRestoreHandler
//         this.showDeletedRef = showDeletedRef
//         this.dataKey = dataKey
//         this.modelSelectionRef = modelSelectionRef
//         this.records = ref(records)
//         this.deletedRecords = ref(deletedRecords)
//         this.deleteRestoreHandler = deleteRestoreHandler
//         this.tableFiltersRef = ref(tableFiltersRef)

//     }
//     setElementRef = (elementRef: any) => this.elementRef = elementRef

//     fetchFn?: tableFetchFn<ApiResponseList<TRecordDefault>, TRecordDefault> | undefined
//     tableData: () => Ref<any[]> = () => {
//         if (this.showDeletedRef) {
//             return this.records
//         }
//         return this.deletedRecords
//     }
//     // currentDataKey: () => 'records' | 'deletedRecords' = () => this.tableState.showDeletedRef ? 'deletedRecords' : 'records'
//     // data: () => any[] = () => this.tableState.data[this.currentDataKey()]
//     selectedIds: () => any[] = () => this.modelSelectionRef.map((row: any) => {
//         return row[this.dataKey]
//     })
//     isAllRecordsSelected: () => boolean = () => this.modelSelectionRef.length === this.tableData().value.length

//     updateCellValue: (cellNumber: number, cellKey: string, cellValue: any) => void = (cellNumber: number, cellKey: string, cellValue: any) => {
//         if (this.showDeletedRef) {
//             this.deletedRecords[cellNumber][cellKey] = cellValue
//         }
//         this.records[cellNumber][cellKey] = cellValue
//     }
//     deleteRestoreVaraints: () => DeleteRestoreVaraints = () => {
//         return deleteRestoreVaraints[this.showDeletedRef.toString()]
//     }
//     reset: () => void = () => {
//         this.records.value = []
//         this.deletedRecords.value = []
//     }
//     refetchData: () => void = () => {
//         if (!this.fetchFn) return
//         this.fetchFn({}).then((response) => {
//             this.records.value = response.records
//             this.deletedRecords.value = response.deletedRecords || []
//         })
//     }

//     deleteSelectedRows: () => void = () => {
//         // let { showDeletedRef, deletedRecords, records, modelSelectionRef } = this.tableState
//         if (this.showDeletedRef) {
//             this.records.value = this.records.value.concat(this.modelSelectionRef)
//             this.deletedRecords.value = this.deletedRecords.value.filter(r => !this.modelSelectionRef.includes(r))
//         } else {
//             this.deletedRecords.value = this.deletedRecords.value.concat(this.modelSelectionRef)
//             this.records.value = this.records.value.filter(r => !this.modelSelectionRef.includes(r))
//         }
//         this.modelSelectionRef = []
//         return
//     }
//     appendRow: (row: any) => void = (row: any) => {
//         if (this.showDeletedRef) {
//             this.deletedRecords.value.push(row)
//             return
//         }
//         this.records.value.push(row)
//     }
//     prependRow: (row: any) => void = (row: any) => {
//         if (this.showDeletedRef) {
//             this.deletedRecords.value.unshift(row)
//             return
//         }
//         this.records.value.unshift(row)
//     }


// }