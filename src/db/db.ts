import Dexie, { type Table } from 'dexie'
export interface Icon {
    id?: number
    iconId: number
    iconName: string
    iconContent: string
}
export interface InputOptionGroup {
    id?: number
    inputName: string
    groupName: string
    groupIcon?: string
    items: {
        value?: number
        label: string
        icon?: string
    }[]
    createdAt: Date
    expiredAt: Date
}
export interface InputOption {
    id?: number
    inputName: string
    value?: number
    label: string
    icon?: string
    createdAt: Date
    expiredAt: Date
}

export class VDashkitdDexie extends Dexie {
    icons!: Table<Icon>
    inputOptions!: Table<InputOption>
    inputOptionGroups!: Table<InputOptionGroup>
    constructor() {
        super('vDashkitDB')
        this.version(1).stores({
            icons: '++id ,iconId, iconName, iconContent',
            inputOptions: '++id, inputName, value,label,icon,createdAt,expiredAt',
            inputOptionGroups: '++id, inputName, groupName,groupIcon,items,createdAt,expiredAt',
        })

    }
}

export const db = new VDashkitdDexie()



