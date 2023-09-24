import { type FormKitSchemaNode } from '@formkit/core'
import type { ErrorMessages } from "@formkit/core"
import type { DefaultConfigOptions } from '@formkit/vue'
import type { FilterMatchModeOptions, FilterOperatorOptions } from 'primevue/api'
import type { ColumnProps } from 'primevue/column'
import type { DataTableFilterMeta } from 'primevue/datatable'
import type { ImageProps } from 'primevue/image'
import type { VNode } from 'vue'
import type { LocaleMessageObject } from 'vue-i18n/dist/vue-i18n.js'
export interface DashKitConfig {
    formKitConfig: DefaultConfigOptions
    translations: LocaleMessageObject
    uploadHandler?: UploadHandler
    baseImageUrl?: string
    baseImportDataUrl?: string
    fallBackImageUrl?: string
    loginHandler?: LoginHandler
}




export interface AppImageParams {
    src: string
    imageProps?: ImageProps
}
export interface TableRouter {
    name: string,
    paramName: string,
    paramColumnName: string
}
export interface TableOptions {
    showSelectAll?: boolean
    showActions?: boolean
}



interface ApiListOptions {
    title: string;
    description: string;
    createHandler: CreateHandler;
    updateHandler: UpdateHandler;
    deleteRestoreHandler: DeleteRestoreHandler;
    importHandler: ImportHandler;
}


export interface ApiResponseList {
    records: any[]
    deletedRecords: any[]
    options: ApiListOptions
}


export interface AppTableParams {
    dataKey: string
    apiResponse: ApiResponseList
    headers: Record<string, ITableHeader>;
}
export interface ITableHeader {
    columnProps?: ColumnProps;
    filter?: any;
    tableRouter?: TableRouter;
    renderHtml?: (value: any) => VNode;
}

// export type FilterMatchModeKey = keyof FilterMatchModeOptions;
export interface ITableHeaderParams {
    sortable: boolean,
    filter?: TableHeaderFilter;
    router?: TableRouter;
}

export type TableHeaderFilter = { mode: string; input: FormKitSchemaNode; } | undefined
export interface ToastHandler {
    hideToast?: boolean
    title?: String
    message?: String
}

export interface DialogUpdateParms {
    onConfirmed?: Function,
    dialog: any,
    form: FormUpdateParams,
    config?: {
        width?: string
        breakpoints?: Record<string, string>
    }
}
export interface DialogCreateParms {
    onConfirmed?: Function,
    form: FormCreateParams,
    dialog: any,
    config?: {
        width?: string
        breakpoints?: Record<string, string>
    }
}
export interface DialogDeleteRestoreParms {
    onConfirmed?: Function,
    deleteRestoreHandler: DeleteRestoreHandler,
    dialog: any,
    config?: {
        width?: string
        breakpoints?: Record<string, string>
    }
}

export interface DisplayValueParams {
    value: string,
    options?: any[]

}
export interface basicInputAttrs { name: string, value: any }
export interface filterFunctionParams {
    input: basicInputAttrs,
    data: any
}
export interface FilterInput {
    getDisplayValue(input: DisplayValueParams): string;
    filterFunction(parms: filterFunctionParams): boolean
    getEventType(input: { name: string, oldValue: string, newValue: string }): 'applyFilter' | "applyAllFilters"
}

export interface FindHandler<Request, Response, TargetResponse> {
    findFunction: (req: Request) => Promise<Response>;
    mapFunction?: (response: Response) => TargetResponse;
    requestPropertyName: string;
    requestValue?: number;
}
export interface FormUpdateParams {
    sections: Array<FormSeciton>
    options: FormOptions
    submitHandler: SubmitHandler<any, any, any>
    toastHandler: ToastHandler
    findHandler: FindHandler<any, any, any>
}


export interface FormFilterParams {
    inputs: FormKitSchemaNode[],
    filters: Record<string, FilterInput>,
    options?: FormFilterOptions,
    modelValue?: Record<string, any>
}
export interface FormCreateParams {
    sections: Array<FormSeciton>
    options: FormOptions
    submitHandler: SubmitHandler<any, any, any>
}

export type CrudOptions = {
    title: string
    feature: string
    loadingType?: 'card' | 'table'
    showBulkDeleteButton?: boolean
    showExportButton: boolean
    showCreateButton: boolean
    showDeletedFilter: boolean
}

// export interface DeleteRestoreHandler<Req> {
//     deleteRestore: (req: Req) => Promise<any>
//     callBack?: () => any;
//     requestPropertyName?: string;
//     errorHandler?: Record<string, string>
//     toastHandler?: ToastHandler
// }

export interface Permission {
    permissionId: number
    permissionName: string
    permissionFunction: string
    permissionDescription: string
}

export interface PermissionsListRow {
    group: string

    permissions: Permission[]

}
export interface PermissionsListResponse {
    permissions: PermissionsListRow[],
    permissionsIds: number[]

}
export type ErrorHandler = {
    globalErrors?: ErrorMessages
    fieldErrors?: Record<string, ErrorMessages>
}
export type ToastError = {
    summary?: string
    detail?: string
}
export interface SubmitHandler<Request, TargetRequest, Response> {
    submit: (req: TargetRequest) => Promise<Response>
    submitCallBack?: (response: Response) => any
    mapFunction?: (req: Request) => TargetRequest
    redirectRoute?: string
    requestPropertyName?: string
    errorHandler: ErrorHandler
}
export interface FormFilterOptions {
    showActiveFilters?: boolean
    showClearFilters?: boolean
}

export interface FormOptions {
    id: String
    title: string
    withBackground?: boolean
    withHeader?: boolean
    allowBulkCreate?: boolean
    showHeaderSubmit?: boolean
}

export type FormSeciton = Record<string, FormKitSchemaNode[]>
export type FileUploadRequest = {
    fileName: string
    fileData: Uint8Array
}
export type FileUploadResponse = {
    fileName: string
}


export type FileRemoveRequest = {
    fileName: string,
    isSoftDelete: boolean,
}
export type FileRemoveResponse = {}

export type FileRestoreRequest = {
    fileName: string,
}
export type FileRestoreResponse = {}

export type UploadHandler = {
    fileUpload: (reuest: FileUploadRequest) => Promise<FileUploadResponse>
    fileRemove: (reuest: FileRemoveRequest) => Promise<FileRemoveResponse>
    fileRestore: (reuest: FileRestoreRequest) => Promise<FileRestoreResponse>
    baseImageUrl: string
}

export interface AppLogoParams {
    disabled?: boolean
    iconOnly?: boolean
}
export interface AppBtnParams {
    label?: string
    icon?: string
    disabled?: boolean
}
export interface LoginRequest {
    userName: string;
    userPassword: string;
}

export interface LoginResponse {
    user: {
        userName: string
        userPhone: string
        userEmail: string
    },
    loginInfo: {
        accessToken: string
        refreshToken: string
    },
    permissions: string;
    sidebar: string;
}


export type LoginHandler = {
    submit: (req: any) => Promise<any>
    authorize: (req: any) => Promise<any>
    errorHandler: ErrorHandler
    redirectRoute: string
}





// mock the client definitions
interface CreateHandler {
    title: string;
    redirectRoute: string;
    routeName: string;
    endpoint: string;
}

interface UpdateHandler {
    title: string;
    redirect_route: string;
    route_name: string;
    endpoint: string;
    find_endpoint: string;
    find_request_property: string;
}

interface DeleteRestoreHandler {
    endpoint: string;
    request_property: string;
}

interface ImportHandler {
    endpoint: string;
    import_template_link: string;
}


