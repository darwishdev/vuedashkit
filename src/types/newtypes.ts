import { FilterMatchMode, type FilterMatchModeOptions } from "primevue/api"
import type { ColumnProps } from 'primevue/column'
import { type FormKitSchemaNode } from '@formkit/core'
import type { VNode } from "vue"
import type { DataTableFilterMetaData } from "primevue/datatable"


// table types

export type TableRouter = {
    name: string,
    paramName: string,
    paramColumnName: string
}
export type FilterMatchModeValues = 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | string | undefined;
export type AppTableFilter = {
    matchMode: FilterMatchModeValues,
    input: FormKitSchemaNode
}



export type TRecordDefault = Record<string, unknown[]>

export type ApiResponseList<TRecord> = {
    records: TRecord[]
    deletedRecords: TRecord[]
    options?: ApiListOptions
}
export type AppTableFilterInputs = Record<string, FormKitSchemaNode>

export type TableFilterProps = {
    inputsSchema: FormKitSchemaNode[],
    tableFilters: Record<string, DataTableFilterMetaData>,
    activeFilters: Record<string, (string | number | Date)>,
    filterFormValue: Record<string, (string | number | undefined)>
}



export interface ITableHeader {
    columnProps?: ColumnProps
    filter?: AppTableFilter
    tableRouter?: TableRouter
    isGlobalFilter?: boolean
    renderHtml?: (value: any) => VNode
}


// table options types

type CreateHandler = {
    title: string;
    redirectRoute: string;
    routeName: string;
    endpoint: string;
}



type UpdateHandler = {
    title: string;
    redirectRoute: string;
    routeName: string;
    endpoint: string;
    findEndpoint: string;
    findRequestProperty: string;
}

type DeleteRestoreHandler = {
    endpoint: string;
    requestProperty: string;
}

type ImportHandler = {
    endpoint: string;
    importTemplateLink: string;
}



export type ApiListOptions = {
    title: string;
    description: string;
    createHandler?: CreateHandler;
    updateHandler?: UpdateHandler;
    deleteRestoreHandler?: DeleteRestoreHandler;
    importHandler?: ImportHandler;
}



export type TableActionsProps = {
    options: ApiListOptions
}


export type TableHeaderProps = {
    deletedFilter: boolean,
    searchKey: string,
    title: string,
    showGlobalSearchFilter: boolean
}

export type tableFetchFn<RolesListResponse, TRecord> =
    (req: any, options?: any) => Promise<
        RolesListResponse extends ApiResponseList<TRecord>
        ? RolesListResponse
        : undefined>

export interface AppTableProps<RolesListResponse, TRecord> {
    title: string
    dataKey: keyof TRecord
    fetchFn: tableFetchFn<RolesListResponse, TRecord>
    records: TRecord[]
    deletedRecords: TRecord[]
    viewRouter?: TableRouter
    options: ApiListOptions
    displayType?: 'card' | 'table'
    headers: Record<string, ITableHeader>;
}
export type TableHeaderFilter = { mode: string; input: FormKitSchemaNode; } | undefined

export interface ITableHeaderProps {
    sortable: boolean,
    isGlobalFilter?: boolean;
    filter?: AppTableFilter;
    router?: TableRouter;
}



export type InitTableParams<RolesListResponse, TRecord> = {
    records: Record<string, any>[]
    deletedRecords: Record<string, any>[]
    dataKey: string
    deletedFilter: boolean
    fetchFn: tableFetchFn<RolesListResponse, TRecord>
}

