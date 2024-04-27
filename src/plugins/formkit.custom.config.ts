
import { InputPicker, InputImage, InputPermissions, InputUnitQty, InputDependentDropdown } from "@/components/form/index"
import { createInput } from '@formkit/vue'
import type { DefaultConfigOptions } from '@formkit/vue'
import customPlugins from './formkitPlugins'
import { ar, en } from '@formkit/i18n'

const formKitConfigWrapper = (defaultConfig: DefaultConfigOptions) => {
    const permissionsInput = createInput(InputPermissions, {
        props: ['permissions', 'toggleable', 'groupCollapsed', 'inputCollapsed'],
    })
    const imageInput = createInput(InputImage, {
        props: ['path', 'size'],
    })
    const unitQtyInput = createInput(InputUnitQty, {
        props: ['unitBuy', 'unitSell', 'initialValues', 'unitRatio', 'sellUnitValue', 'rowIndex'],
    })
    const dependentDropdown = createInput(InputDependentDropdown, {
        props: ['dropDownSchema', 'data', 'groupName', 'levels'],
    })
    const pickerInput = createInput(InputPicker, {
        props: [],
    })
    const inputs = {
        'permissions': permissionsInput,
        'image': imageInput,
        'unitQty': unitQtyInput,
        'dependentDropdown': dependentDropdown,
        'picker': pickerInput,
    }
    defaultConfig.inputs = defaultConfig.inputs ? { ...defaultConfig.inputs, ...inputs } : inputs
    defaultConfig.plugins = defaultConfig.plugins ? defaultConfig.plugins.concat(customPlugins as any) as typeof defaultConfig.plugins : customPlugins as any
    defaultConfig.locales = { ar, en }
    defaultConfig.locale = 'en'
    return defaultConfig

}


export default formKitConfigWrapper
