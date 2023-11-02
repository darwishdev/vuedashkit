import type {
    DependentDropdownInutData, DependentDropdownActiveInputs, InputDependentDropdownProps, DependentDropdownLevels, DependentDropdownInut, DependentDropdownOptionsListFn
} from "@/types/types";
import { ObjectKeys } from "@/utils/object/object";

export interface IDropDownInputMethods {
    loadInputOptions: (inputName: string) => Promise<DependentDropdownInutData>
    setInputValue: (inputName: string, value: number, nodeElements: any) => Promise<void>
    resetChildInputs: (parentInputName: string, nodeElements: any[]) => void
    getIndexByValue: (options: any[], id: number) => number
    loadRootData: () => void
    setChildInputOptions: (inputName: string, nodeElements: any[]) => Promise<void>
    activeInputs: DependentDropdownActiveInputs
}


export class DependentDropdownMethodsBase {
    data?: DependentDropdownInut | DependentDropdownOptionsListFn
    rootData: DependentDropdownInut = { options: [] }
    activeInputs: DependentDropdownActiveInputs = {}
    levels: DependentDropdownLevels = {}
    levelsKeys: string[] = []

    constructor(props: InputDependentDropdownProps) {
        this.data = props.context.data;
        this.levels = props.context.levels;
        this.levelsKeys = ObjectKeys(props.context.levels);
        this.loadRootData()
    }
    loadRootData = async () => {
        if (!this.data) {
            return
        }
        if (typeof this.data == 'function') {
            const fetchedData = await this.data({})
            this.rootData = fetchedData
            return
        }
        this.rootData = this.data
    }
    loadInputOptions = async (inputName: string): Promise<DependentDropdownInutData> => {
        return new Promise(async (resolve: Function) => {
            resolve([])
        })
    }

    setChildInputOptions = async (inputName: string, nodeElements: any[]) => {
        console.log("setChildInputOptions", inputName)
        const levelIndex = this.levelsKeys.indexOf(inputName)
        // check if the index is more thant elements refs to retunr
        // this means this is first time we set the input and no need to explicitly set the
        // child options from here while it will load correctly from loadOptions
        if (levelIndex >= nodeElements.length || levelIndex == -1) return
        const childInputElementRef = nodeElements[levelIndex]
        if (!childInputElementRef) return
        const childInputOptions = await this.loadInputOptions(inputName)
        console.log("childInputOptions", childInputOptions)
        childInputElementRef.node.context.options = childInputOptions
    }
    resetChildInputs = (inputName: string, nodeElements: any[]) => {
        const levelIndex = this.levelsKeys.indexOf(inputName)
        for (let nodeIndex = levelIndex; nodeIndex < nodeElements.length; nodeIndex++) {
            const element = nodeElements[nodeIndex];
            if (element) {
                delete this.activeInputs[element.node.name]
                element.node.reset()
            }
        }
    }
    getIndexByValue = (options: any[], id: number) => {
        for (let i = 0; i < options.length; i++) {
            if (options[i].__original === id || options[i].value == id) {
                return i;
            }
        }
        return -1;
    }


}


export class DependentDropdownMethodsNetwork extends DependentDropdownMethodsBase implements IDropDownInputMethods {
    setInputValue = async (inputName: string, value: number, nodeElements: any[]) => {
        const levelIndex = this.levelsKeys.indexOf(inputName)
        const childInputName = this.levelsKeys[levelIndex + 1]
        this.activeInputs[inputName] = { value, children: [] }
        this.setChildInputOptions(childInputName, nodeElements)
        if (childInputName) this.resetChildInputs(childInputName, nodeElements)

    }
    loadInputOptions = async (inputName: string): Promise<DependentDropdownInutData> => {
        return new Promise(async (resolve: Function) => {
            const level = this.levels[inputName]
            if (!level) return []
            if (!level.optionsListFn) {
                return []
            }
            const levelIndex = this.levelsKeys.indexOf(inputName)
            const parentInputName = this.levelsKeys[levelIndex - 1]
            const req = {} as Record<string, any>
            if (level.requestPropertyName && this.activeInputs[parentInputName]) {
                req[level.requestPropertyName] = this.activeInputs[parentInputName].value
            }
            const data = await level.optionsListFn(req)
            resolve(data.options)
        })
    }
}


export class DependentDropdownMethodsLocal extends DependentDropdownMethodsBase implements IDropDownInputMethods {
    setInputValue = async (inputName: string, value: number, nodeElements: any[]) => {
        const levelIndex = this.levelsKeys.indexOf(inputName)
        const parentInputName = this.levelsKeys[levelIndex - 1]
        const childInputName = this.levelsKeys[levelIndex + 1]
        const searchableList = levelIndex == 0 ? this.rootData.options : this.activeInputs[parentInputName] ? this.activeInputs[parentInputName].children : undefined
        if (!searchableList) return
        const optionsIndex = this.getIndexByValue(searchableList, value)
        if (optionsIndex == -1) return
        const childInputOptions = searchableList[optionsIndex].children
        if (!childInputOptions) return
        this.activeInputs[inputName] = { value, children: childInputOptions }
        this.setChildInputOptions(childInputName, nodeElements)
        if (childInputName) this.resetChildInputs(childInputName, nodeElements)
    }
    loadInputOptions = async (inputName: string): Promise<DependentDropdownInutData> => {
        return new Promise(async (resolve: Function) => {
            const level = this.levels[inputName]
            if (!level) return []
            if (!this.data) {
                return []
            }
            const levelIndex = this.levelsKeys.indexOf(inputName)
            const parentInputName = this.levelsKeys[levelIndex - 1]
            const data = levelIndex == 0 ? this.rootData : { options: this.activeInputs[parentInputName].children }
            resolve(data.options)
        })
    }
}