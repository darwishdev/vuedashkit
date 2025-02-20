import type { TableRouter, ITableHeaderProps, AppTableFilter, ITableHeader } from '@/types/types'
import { h, resolveComponent } from 'vue'
import Tag from 'primevue/tag';
import { type ColumnProps } from 'primevue/column';
import { convertDateRedable } from '@/utils/date/date';
import { UnitPriceParse } from '../currency/currency';
export class TableHeaderText implements ITableHeader {
    columnProps: ColumnProps = {}
    columnName: string
    tableRouter?: TableRouter
    isGlobalFilter: boolean
    filter?: AppTableFilter
    constructor(name: string, params: ITableHeaderProps) {
        this.columnName = name
        this.filter = params.filter
        this.columnProps.sortable = params.sortable
        this.isGlobalFilter = typeof params.isGlobalFilter == 'undefined' ? false : params.isGlobalFilter
        if (params.filter) {
            this.filter = params.filter
        }
        if (params.router) {
            this.tableRouter = params.router
        }
    }
}

export class TableHeaderCount extends TableHeaderText implements ITableHeader {

    renderHtml = (value: any) => {
        const data = value[this.columnName]
        const displayValue = !data || data == "" ? 0 : data
        return h(Tag, {
            value: displayValue
        })
    }
}
export class TableHeaderHidden extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {

        return h('div', null)
    }
}
export class TableHeaderTag extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        return h(Tag, {
            value: value[this.columnName]
        })
    }
}
export class TableHeaderLink extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        if (!this.tableRouter || !this.tableRouter) {
        }
        const ruterLink = resolveComponent('router-link')
        const params = {} as any
        params[this.tableRouter!.paramName] = value[this.tableRouter!.paramColumnName]
        return h(ruterLink, { to: { name: this.tableRouter!.name, params } }, () => [h('span', value[this.columnName])])
    }
}
export class TableHeaderImage extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const appImage = resolveComponent('app-image')
        return h(appImage, { src: value[this.columnName], size: 75, key: value[this.columnName] })
    }
}
export class TableHeaderDate extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const data = value[this.columnName]

        return h('div', convertDateRedable(data))
    }
}

export class TableHeaderUnitInput extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const formkitComp = resolveComponent('FormKit')
        return h(formkitComp, {
            type: "unitQty",
            innerClass: "justify-content-center",
            unitBuy: value['unitBuy'],
            unitSell: value['unitSell'],
            unitRatio: value['unitRatio'],
            onInput: (v: any) => {
                value.valuation = v * value['productCost']
            }
        })
    }
}


export class TableHeaderUnitPrice extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const unitPrice = resolveComponent('UnitPrice')

        return h(unitPrice, {
            headers: [
                {
                    label: value['unitBuy'],
                    value: value['unitRatio'] * value['productCost'],
                },
                {
                    label: value['unitSell'],
                    value: value['productCost'],

                }
            ]
        })
    }
}
export class TableHeaderUnitPriceTotal extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const unitPrice = resolveComponent('UnitPrice')
        const { unitBuyPrice, unitSellPrice, totalPrice } = UnitPriceParse(value['valuation'], value['transactionPrice'], value['unitRatio'])
        return h(unitPrice, {

            headers: [
                {
                    label: value['unitBuy'],
                    value: unitBuyPrice

                },
                {
                    label: value['unitSell'],
                    value: unitSellPrice

                },
                {
                    label: 'total',
                    value: totalPrice,
                    background: 'var(--color-background)'

                }
            ]
        })
    }
} 