
import { InputPicker, InputImage, InputPermissions } from "@/components/form/index"
import { createInput } from '@formkit/vue'
import type { DefaultConfigOptions } from '@formkit/vue'
import customPlugins from './formkitPlugins'

const formKitConfigWrapper = (defaultConfig: DefaultConfigOptions, options: { activateFileUpload: boolean }) => {
    const permissionsInput = createInput(InputPermissions, {
        props: ['permissions', 'toggleable', 'groupCollapsed', 'inputCollapsed'],
    })
    const imageInput = createInput(InputImage, {
        props: ['path', 'size'],
    })
    const pickerInput = createInput(InputPicker, {
        props: [],
    })
    // const typedNumberInput = createInput(InputNumberTyped, {
    //     props: ['isFloat'],
    // })
    // const fileUploadInput = createInput(InputUpload, {
    //     props: ['fileUpload'],
    // })
    // const numberRangeInput = createInput(InputNumberRange, {
    //     props: ['fileUpload'],
    // })
    const inputs = {
        'permissions': permissionsInput,
        'image': imageInput,
        'picker': pickerInput,
    }
    // if (options.activateFileUpload) inputs['fileUpload'] = fileUploadInput
    defaultConfig.inputs = defaultConfig.inputs ? { ...defaultConfig.inputs, ...inputs } : inputs
    defaultConfig.plugins = defaultConfig.plugins ? defaultConfig.plugins.concat(customPlugins) : customPlugins
    return defaultConfig

}


export default formKitConfigWrapper
