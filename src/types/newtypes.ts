import { FilterMatchMode, type FilterMatchModeOptions } from "primevue/api"
import type { ColumnProps } from 'primevue/column'
import type { FormKitNode, FormKitSchemaNode } from '@formkit/core'
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
    deletedRecords?: TRecord[]
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
    displayType?: 'card' | 'table'
    searchKey: string,
    title: string,
    showGlobalSearchFilter: boolean
}

export type tableFetchFn<TResp, TRecord> =
    (req: any, options?: any) => Promise<
        TResp extends ApiResponseList<TRecord>
        ? TResp
        : undefined>

export interface DataListProps<TResp, TRecord> {
    title: string
    dataKey: keyof TRecord
    fetchFn?: tableFetchFn<TResp, TRecord>
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



export type InitTableParams<TResp, TRecord> = {
    records: Record<string, any>[]
    deletedRecords: Record<string, any>[]
    dataKey: string
    deletedFilter: boolean
    fetchFn?: tableFetchFn<TResp, TRecord>
}


export type SubmitHandler<TReq, TResp> = {
    endpoint: (req: TReq) => any
    mapFunction?: (formReq: any) => TReq
    callback?: (formResp: TResp) => any
    redirectRoute?: string
}
export type AppFormProps<TReq, TResp> = {
    title: string
    submitHandler: SubmitHandler<TReq, TResp>,
    sections: Record<string, FormKitSchemaNode[]>
}


export type Permission = {
    permissionName: string,
    permissionFunction: string,
    permissionId: number
    permissionDescription: string
}
export type PermissionGroup = {
    permissionGroup: string,
    permissions: Permission[]
}
export type InputPermissionsProps = {
    context: {
        node: FormKitNode
    },
    // permissions: any
}