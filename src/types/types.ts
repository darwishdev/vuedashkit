import { FilterMatchMode, type FilterMatchModeOptions } from "primevue/api"
import type { ColumnProps } from 'primevue/column'
import type { FormKitNode, FormKitSchemaNode , FormKitSchemaProps } from '@formkit/core'
import type { VNode } from "vue"
import type { DataTableFilterMetaData } from "primevue/datatable"
import type { DefaultConfigOptions } from '@formkit/vue'
import type { ImageProps } from "primevue/image"
import type { LocaleMessageObject } from 'vue-i18n/dist/vue-i18n.js'


// table types

export type TableRouter = {
    name: string,
    paramName: string,
    paramColumnName: string
}
export type FilterMatchModeValues = 'startsWith' | 'contains' | 'notContains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte' | 'between' | 'dateIs' | 'dateIsNot' | 'dateBefore' | 'dateAfter' | string | undefined
export type AppTableFilter = {
    matchMode: FilterMatchModeValues,
    input: FormKitSchemaNode
}
export type AppLogoProps = {
    disabled?: boolean
    iconOnly?: boolean
}
export type AppBtnProps = {
    label?: string
    icon?: string
    disabled?: boolean
}
export type ApiFormError = {
    globalErrors: string[]
    fieldErrors: Record<string, string>
}
export interface UserLoginRequest {
    userName: string
    userPassword: string
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

// export type AppLoadingProps = {
//     view
// }
export type AppPanelProps = {
    toggleable?: boolean
    collapsed?: boolean,
    header?: string,
    icon?: string
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
    title: string
    redirectRoute: string
    routeName: string
    endpoint: string
}



type UpdateHandler = {
    title: string
    redirectRoute: string
    routeName: string
    endpoint: string
    findEndpoint: string
    findRequestProperty: string
}

type DeleteRestoreHandler = {
    endpoint: string
    requestProperty: string
}

type ImportHandler = {
    endpoint: string
    importTemplateLink: string
}



export type ApiListOptions = {
    title: string
    description: string
    createHandler?: CreateHandler
    updateHandler?: UpdateHandler
    deleteRestoreHandler?: DeleteRestoreHandler
    importHandler?: ImportHandler
}



export type TableActionsProps = {
    options: ApiListOptions
    exportable?: boolean
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
    exportable?: boolean
    initiallySelectedItems?: any[],
    fetchFn?: tableFetchFn<TResp, TRecord>
    records: TRecord[]
    deletedRecords?: TRecord[]
    viewRouter?: TableRouter
    options: ApiListOptions
    displayType?: 'card' | 'table'
    headers: Record<string, ITableHeader>
}
export type TableHeaderFilter = {
    mode: string
    input: FormKitSchemaNode
} | undefined

export interface ITableHeaderProps {
    sortable: boolean,
    isGlobalFilter?: boolean
    filter?: AppTableFilter
    router?: TableRouter
}



export type InitTableParams<TResp, TRecord> = {
    records: Record<string, any>[]
    deletedRecords?: Record<string, any>[]
    dataKey: string
    initiallySelectedItems?: any[]
    tableFiltersRef?: Record<string, DataTableFilterMetaData>
    deletedFilter: boolean
    fetchFn?: tableFetchFn<TResp, TRecord>
}


export type SubmitHandler<TReq, TResp> = {
    endpoint: (req: TReq) => any
    mapFunction?: (formReq: any) => TReq
    callback?: (formResp: TResp) => any
    redirectRoute?: string
}

export type FindHandler<TReq, TResp> = {
    endpoint: (req: TReq) => any
    mapFunction?: (formReq: any) => TReq
    requestPropertyName?: keyof TReq,
    paramName?: string | 'id',
    callback?: (formResp: TResp) => any
}

export type AppFormSection = {
    inputs: FormKitSchemaNode[]
    isTitleHidden?: boolean
    isTransparent?: boolean
}

export type AppFormOptions = {
    isBulkCreateHidden?: boolean
    isHeaderSubmitHidden?: boolean
    successMessageSummary?: string
    successMessageDetail?: string
    isSuccessNotificationHidden?: boolean
    isFormTransparent?: boolean
}
export type AppFormProps<TReq, TResp> = {
    title: string
    options?: AppFormOptions

    submitHandler: SubmitHandler<TReq, TResp>,
    findHandler?: FindHandler<any, TReq>,
    sections: Record<string, (AppFormSection | FormKitSchemaNode[])>
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
        toggleable?: boolean
        groupCollapsed?: boolean
        inputCollapsed?: boolean
    },
    // permissions: any
}

export type SizeObj = { width: number, height?: number }
export type Size = SizeObj | number
export type InputImageProps = {
    context: {
        node: FormKitNode
        path: string
        size?: Size
    },
}
export type InputPickerProps = {
    context: {
        node: FormKitNode
    },
}

export type dependentDropdownProps = {
    context: {
        node: FormKitNode
        attrs: any
        apiEndpoint?: (req : any) => Promise<any>
        apiLevelsStructure? : Array<ApiLevelStructure> 
        dropdownsSchema? : Array<dropdownSchema> 
    },
}

export type dropdownSchema = {
    name : string
    dependsOn? : string
    dataKey?: string 
    optionsListFn : (req : any) => Promise<any>
    elementProps : FormKitSchemaNode | any
}
export type ApiLevelStructure = {
    levelNumber : number
    levelName : string
    parentLevelName? : string
    levelLabel?: string 
    levelPlaceholder?: string 
}

export type AppImageProps = {
    src: string
    imageProps?: ImageProps
    size?: Size
}


export type LoginInfo = {
    accessToken: string
    accessTokenExpiresAt?: { nanos: number, seconds: number }
}
export type SideBarItem = {
    key: string
    label: string
    icon: string
    to: string
    items: SideBarItem[]
}
export type User = {
    userId: number
    userName: string
    userImage: string
    userEmail: string
    userPhone: string
    createdAt: string
    updatedAt: string
}
export type UserLoginResponse = {
    userId: number
    userName: string
    userImage: string
    userEmail: string
    userPhone: string
    createdAt: string
    updatedAt: string
    permissions: string[]
    sideBar: SideBarItem[]
    loginInfo?: LoginInfo
}



export type LoginHandler<TResp> = {
    redirectRoute?: string | 'home_view'
    loginEndpoint: (req: {
        email: string
        password: string
    }
    ) => Promise<TResp>
    senedOTPEndpoint: (req: { email: string }) => Promise<void>
    sendResetLinkEndpoint: (req: { email: string }) => Promise<void>
}

export type UploadHandler = {
    uploadEndpoint: (file: File) => Promise<string>
}

export interface VueDashKitConfig {
    formKitConfig: DefaultConfigOptions
    translations: LocaleMessageObject
    uploadHandler?: UploadHandler
    baseImageUrl?: string
    baseImportDataUrl?: string
    fallBackImageUrl?: string
    loginHandler?: LoginHandler<any>
}

export type LoadingComponents = {
    table: any
    card: any
    form: any
    profile: any
}