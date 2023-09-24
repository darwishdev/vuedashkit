import type { TableRouter, ITableHeaderParams, TableHeaderFilter, ITableHeader } from '@/types/types'
import { h, resolveComponent, type VNode } from 'vue'
import Tag from 'primevue/tag';
import { type FormKitSchemaNode } from '@formkit/core'
import { FormatCurrency } from '@/utils/currency/currency'
import { type ColumnProps } from 'primevue/column';
import type { FilterOperatorOptions } from 'primevue/api';
import { convertDateRedable, convertApiDate } from '@/utils/date/date';

export class TableHeaderText implements ITableHeader {
    columnProps: ColumnProps = {}
    columnName: string
    tableRouter?: TableRouter
    filter?: TableHeaderFilter
    constructor(name: string, params: ITableHeaderParams) {
        this.columnName = name
        this.filter = params.filter
        this.columnProps.sortable = params.sortable
        if (params.filter) {
            this.filter = params.filter
        }
        if (params.router) {
            this.tableRouter = params.router
        }
    }
}

// export class TableHeaderPrice implements ITableHeader {
//     columnProps: ColumnProps = {}
//     columnName: string
//     filter: TableHeaderFilter

//     constructor(name: string, params: ITableHeaderParams) {
//         this.columnProps.sortable = params.sortable
//         this.columnName = name
//         if (params.filterOption) {
//             this.filter = this.generateFilterInput(params.filterOption)
//         }
//     }
//     generateFilterInput(mode: FilterOperatorOptions): TableHeaderFilter {
//         return {
//             mode,
//             node: {
//                 $formkit: 'number',
//                 outerClass: "col-4",
//                 prefixIcon: "dollar",
//                 name: this.columnName,
//                 placeholder: this.columnName
//             },
//         }
//     }

//     renderHtml(value: any) {
//         return h('span', FormatCurrency(value[this.columnName]))
//     }
// }

export class TableHeaderTag extends TableHeaderText implements ITableHeader {
    renderHtml(value: any) {
        return h(Tag, {
            value: value[this.columnName]
        })
    }
}

export class TableHeaderLink extends TableHeaderText implements ITableHeader {
    renderHtml(value: any) {
        if (!this.tableRouter || !this.tableRouter) {
            return h("span", value[this.columnName])
        }
        const ruterLink = resolveComponent('router-link')
        const params = {} as any
        params[this.tableRouter!.paramName] = value[this.tableRouter!.paramColumnName]
        return h(ruterLink, { to: { name: this.tableRouter!.name, params } }, () => [h('span', value[this.columnName])])
    }
}


export class TableHeaderImage extends TableHeaderText implements ITableHeader {
    renderHtml(value: any) {
        const appImage = resolveComponent('app-image')
        return h(appImage, { src: value[this.columnName] })
    }
}


export class TableHeaderDate extends TableHeaderText implements ITableHeader {
    renderHtml(value: any) {
        const data = value[this.columnName]
        const date = convertApiDate(data)
        return h('div', convertDateRedable(date))
    }
}
// export class TableHeaderImage implements ITableHeader {
//     columnProps: ColumnProps = {}
//     columnName: string
//     constructor(name: string, sortable: boolean = false) {
//         this.columnProps.sortable = sortable
//         this.columnName = name
//     }

//     renderHtml(value: any) {
//         const appImage = resolveComponent('app-image')
//         return h(appImage, { src: value[this.columnName] })
//     }
// }


// export class TableHeaderDate implements ITableHeader {
//     columnProps: ColumnProps = {}
//     columnName: string
//     filter: TableHeaderFilter
//     constructor(name: string, params: ITableHeaderParams) {
//         this.columnName = name
//         if (params.filterOption) {
//             this.filter = this.generateFilterInput(params.filterOption)
//         }
//         this.columnProps.sortable = params.sortable
//     }

//     generateFilterInput(mode: FilterOperatorOptions): TableHeaderFilter {
//         return {
//             mode,
//             node: {
//                 $formkit: 'datepicker',
//                 outerClass: "col-4",
//                 name: this.columnName,
//                 placeholder: this.columnName
//             },
//         }
//     }

//     renderHtml(value: any) {
//         // const appImage = resolveComponent('app-image')
//         const data = value[this.columnName]
//         return h('div', convertDateRedable(data))
//     }
// }
