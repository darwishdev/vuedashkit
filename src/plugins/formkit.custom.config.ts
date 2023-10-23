
import { InputPicker, InputImage, InputPermissions , dependentDropdown } from "@/components/form/index"
import { createInput } from '@formkit/vue'
import type { DefaultConfigOptions } from '@formkit/vue'
import customPlugins from './formkitPlugins'
import { ar, en } from '@formkit/i18n'

const formKitConfigWrapper = (defaultConfig: DefaultConfigOptions) => {
    const permissionsInput = createInput(InputPermissions, {
        props: ['permissions', 'toggleable', 'groupCollapsed', 'inputCollapsed'],
    })
    const dependentDropdownInput = createInput(dependentDropdown, {
        props: ['dropDownSchema' , 'groupName'],
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
        'image': imageInput,
        'picker': pickerInput,
    }
    defaultConfig.inputs = defaultConfig.inputs ? { ...defaultConfig.inputs, ...inputs } : inputs
    defaultConfig.plugins = defaultConfig.plugins ? defaultConfig.plugins.concat(customPlugins as any) as typeof defaultConfig.plugins : customPlugins as any
    defaultConfig.locales = { ar, en }
    return defaultConfig

}


export default formKitConfigWrapper
