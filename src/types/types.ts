import type { ColumnProps } from 'primevue/column'
import type { FormKitNode, FormKitSchemaNode } from '@formkit/core'
import type { DataTableFilterMetaData } from "primevue/datatable"
import type { DefaultConfigOptions } from '@formkit/vue'
import type { ImageProps } from "primevue/image"
import type { LocaleMessageObject } from 'vue-i18n/dist/vue-i18n.js'
import type { VNode } from 'vue'
import type { DropdownProps } from 'primevue/dropdown'


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
    icon?: string | number
    iconColor?: string
    iconType?: 'svg' | 'primevue'
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
    unitAttributes?: {
        unitSellHeader: string,
        unitBuyHeader: string,
        unitValueHeader: string,
    }
    isGlobalFilter?: boolean
    renderHtml?: (value: any) => any
}


// table options types
export type UnitValues = {
    unitBuy: number
    unitSell: number
}
export type InputUnitQtyProps = {
    context: {
        node: FormKitNode
        unitBuy: string
        unitSell: string
        unitRatio: number,
        initialValues?: UnitValues
    },
}
export type UnitPriceProps = {
    headers: {
        label: string,
        value: string,
        background?: string
    }[],
}
export type UnitHeaderProps = {
    class?: string,
    headers: {
        label: string,
        is_currency: boolean,
        value: string,
        background?: string
    }[],
}
export type RedirectRouteParam = {
    paramName: string,
    responseValueKey: string,
}
type RouteQuery = {
    queryName: string
    queryValue: string
}
type CreateHandler = {
    title: string
    redirectRoute: string
    redirectRouteParam?: RedirectRouteParam,
    routeQuery?: RouteQuery[]
    routeName: string
    endpoint: string
}



type UpdateHandler = {
    title: string
    redirectRoute: string
    routeQuery?: RouteQuery[]
    routeName: string
    redirectRouteParam?: RedirectRouteParam,
    endpoint: string
    findEndpoint: string
    findRequestProperty: string
}

export type DeleteRestoreHandler = {
    endpoint: (req: any) => Promise<any> | string
    requestProperty: string
}
export type DeleteHandler = {
    endpoint: (req: any) => Promise<any> | string
    requestProperty: string
}
export type FindForUpdateHandler = {
    endpoint: (req: any) => Promise<any> | string
    requestProperty: string
}
type ImportHandler = {
    endpoint: string
    importTemplateLink: string
}



export type ApiListOptions = {
    title: string
    description: string
    hideSelectCheckbox?: boolean
    hideDeleteFilter?: boolean,
    createHandler?: CreateHandler
    updateHandler?: UpdateHandler
    findForUpdateHandler?: FindForUpdateHandler
    deleteRestoreHandler?: DeleteRestoreHandler
    deleteHandler?: DeleteHandler
    importHandler?: ImportHandler
}



export type TableActionsProps = {
    options: ApiListOptions
    formSections?: Record<string, (AppFormSection | FormKitSchemaNode[])>
    exportable?: boolean
}


export type TableHeaderProps = {
    deletedFilter: boolean,
    displayType?: 'card' | 'table'
    hideDeleteFilter?: boolean
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
    context: {
        title: string
        dataKey: keyof TRecord
        exportable?: boolean
        formSections?: Record<string, (AppFormSection | FormKitSchemaNode[])>
        createFormSections?: Record<string, (AppFormSection | FormKitSchemaNode[])>
        updateFormSections?: Record<string, (AppFormSection | FormKitSchemaNode[])>
        initiallySelectedItems?: any[],
        fetchFn?: tableFetchFn<TResp, TRecord>
        records: TRecord[]
        deletedRecords?: TRecord[]
        viewRouter?: TableRouter
        options: ApiListOptions
        paginationOptions?: {
            paginatorTemplate?: string,
            currentPageReportTemplate?: string,
            paginator: boolean,
        }

        displayType?: 'card' | 'table'
        headers: Record<string, ITableHeader>

    }
}
export type AppFormDialogProps = {
    sections: Record<string, (AppFormSection | FormKitSchemaNode[])>
    handler: CreateHandler | UpdateHandler
    findForUpdateHandler?: FindForUpdateHandler
    recordId?: number
    size?: Size
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
    deleteRestoreHandler?: DeleteRestoreHandler,
    deleteHandler?: DeleteHandler,
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
    redirectRouteParam?: {
        paramName: string,
        responseValueKey: string
    }
}

export type FindHandler<TReq, TResp> = {
    endpoint: (req: TReq) => any | string
    recordId?: number
    mapFunction?: (formReq: any) => TReq
    requestProperty?: keyof TReq,
    paramName?: string | 'id',
    callback?: (formResp: TResp) => any
}

export type AppFormSection = {
    inputs: FormKitSchemaNode[]
    isTitleHidden?: boolean
    isTransparent?: boolean
}

export type AppFormOptions = {
    isSubmitHidden?: boolean
    isFormHeaderHidden?: boolean
    isBulkCreateHidden?: boolean
    isHeaderSubmitHidden?: boolean
    isHeaderTitleHidden?: boolean
    successMessageSummary?: string
    successMessageDetail?: string
    isSuccessNotificationHidden?: boolean
    isFormTransparent?: boolean
    submitLabel?: string
    submitAttrs?: any
}
export type AppFormProps<TReq, TResp> = {
    context: {
        title: string
        keepStateAlive?: boolean
        storeKey?: string
        options?: AppFormOptions
        submitHandler: SubmitHandler<TReq, TResp>,
        findHandler?: FindHandler<any, TReq>,
        sections: Record<string, (AppFormSection | FormKitSchemaNode[])>
    }
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

export type PermissionsListResponse = {
    records: PermissionGroup[],
}


export type PermissionsHandler = {
    permissionsListAllEndpoint: (req: any) => Promise<PermissionsListResponse>,
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
        _value?: string
        bucketName?: string
        path: string
        multiple?: boolean
        size?: Size
    },
}
export type InputPickerProps = {
    context: {
        node: FormKitNode
    },
}


export type AppImageProps = {
    src: string
    imageProps?: ImageProps
    size?: Size
}

export type AppIconProps = {
    icon: number | string
    size?: 'small' | 'medium' | 'large'
    iconType?: 'primevue' | 'svg'
    color?: string
}


export type AppIconSlots = {
    top(): VNode;
}
export type LoginInfo = {
    accessToken: string
    accessTokenExpiresAt?: { nanos: number, seconds: number }
}
export type SideBarItem = {
    key: string
    label: string
    labelAr: string
    iconId: number
    route: string
    items?: SideBarItem[]
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

export type UserRole = {
    role_id: number
    role_name: string
}
export type UserLoginResponse = {
    user: User
    sideBar: SideBarItem[]
    roles: UserRole[]
    loginInfo: LoginInfo
}



export type LoginHandler<TResp> = {
    redirectRoute?: string | 'home_view'
    loginEndpoint: (req: {
        loginCode: string
        userPassword: string
    }
    ) => Promise<TResp>
    sendOTPEndpoint: (req: { email: string }) => Promise<void>
    sendResetLinkEndpoint: (req: { email: string }) => Promise<void>
}

export type UploadHandler = {
    uploadEndpoint: (file: File, bucketName: string) => Promise<string>
}


export interface VueDashKitConfig<TApi = any> {
    formKitConfig: DefaultConfigOptions
    translations: LocaleMessageObject
    apiClient?: TApi,
    uploadHandler?: UploadHandler
    permissionsHandler?: PermissionsHandler
    baseImageUrl?: string
    baseImportDataUrl?: string
    fallBackImageUrl?: string
    iconsListMethodName?: string
    loginHandler?: LoginHandler<any>
}

export type LoadingComponents = {
    table: any
    card: any
    form: any
}
export type DependentDropdownInutData = {
    value: string | number,
    label: string,
    children?: DependentDropdownInutData[],
}
export type DependentDropdownInut = {
    options: DependentDropdownInutData[]
}
export type DependentDropdownOptionsListFn = (req: any) => Promise<DependentDropdownInut>
export type DepndentDropdownSchema = FormKitSchemaNode & {
    dependsOn?: string
    requestPropertyName?: string
    optionsListFn?: DependentDropdownOptionsListFn
}
export type DependentDropdownLevel = {
    label: string,
    optionsListFn?: DependentDropdownOptionsListFn,
    requestPropertyName?: string
    placeholder?: string,
    outerClass?: string
    prefixIcon?: string,
    suffixIcon?: string,
    validation?: string,
    validationVisibility?: string,
    validationLabel?: string,

}
export type DependentDropdownActiveInput = {
    value: number,
    children: DependentDropdownInutData[]

}
export type DependentDropdownLevels = Record<string, DependentDropdownLevel>
export type DependentDropdownActiveInputs = Record<string, DependentDropdownActiveInput>

export type InputDependentDropdownProps = {
    context: {
        node: FormKitNode
        attrs: any
        groupName?: string
        data?: DependentDropdownInut | DependentDropdownOptionsListFn,
        levels: DependentDropdownLevels
    }
}



export type SelectOption = {
    value: number
    label: string
    note?: string
    icon?: string
}
export type SelectOptionWithGroup = {
    group_icon: string
    group_name?: string
    items: SelectOption[]
}

export type InputSelectOptionsResponseType = any[] | { options: any[] }
export type InputSelectOptionsPropType = string | Function | SelectOption[] | SelectOptionWithGroup[]
export type InputSelectProps = {
    context: {
        node: FormKitNode
        primeProps: DropdownProps
        customOptions: InputSelectOptionsPropType
        options: SelectOption[] | SelectOptionWithGroup[]
        translateLabel?: boolean,
        cacheKey?: string
        requestPropertyName?: string
        requestPropertyValue?: any
        convertToFlat?: boolean
        loading: boolean
        hasGroup?: boolean
        createRoute?: string
        isMultiple?: boolean
        requestPropertyParamName?: string
        filter?: boolean,
        cacheTimeout?: number
        lazyLoad?: boolean
        loadOptions: Function
        readCache: Function
    },
}
export type InputIconsProps = {
    context: {
        node: FormKitNode
        primeProps: DropdownProps
        loading: boolean
    },
}