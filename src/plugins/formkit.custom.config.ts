
import { InputPicker, InputImage, InputPermissions, dependentDropdown, InputUnitQty, InputDependentDropdown } from "@/components/form/index"
import { createInput } from '@formkit/vue'
import type { DefaultConfigOptions } from '@formkit/vue'
import customPlugins from './formkitPlugins'
import { ar, en } from '@formkit/i18n'

const formKitConfigWrapper = (defaultConfig: DefaultConfigOptions) => {
    const permissionsInput = createInput(InputPermissions, {
        props: ['permissions', 'toggleable', 'groupCollapsed', 'inputCollapsed'],
    })
    const unitQtyInput = createInput(InputUnitQty, {
        props: ['buyUnit', 'sellUnit', 'buyUnitValue', 'sellUnitValue'],
    })

    const dependentDropdownModified = createInput(InputDependentDropdown, {
        props: ['dropDownSchema', 'data', 'groupName', 'levels'],
    })
    const dependentDropdownInput = createInput(dependentDropdown, {
        props: ['dropDownSchema', 'apiEndpoint', 'apiLevelsStructure'],
    })
    const imageInput = createInput(InputImage, {
        props: ['path', 'size'],
    })
    const pickerInput = createInput(InputPicker, {
        props: [],
    })
    const inputs = {
        'permissions': permissionsInput,
        'dependentDropdown': dependentDropdownInput,
        'unitQty': unitQtyInput,
        'dependentDropdownModified': dependentDropdownModified,
        'image': imageInput,
        'picker': pickerInput,
    }
    defaultConfig.inputs = defaultConfig.inputs ? { ...defaultConfig.inputs, ...inputs } : inputs
    defaultConfig.plugins = defaultConfig.plugins ? defaultConfig.plugins.concat(customPlugins as any) as typeof defaultConfig.plugins : customPlugins as any
    defaultConfig.locales = { ar, en }
    return defaultConfig

}


export default formKitConfigWrapper
