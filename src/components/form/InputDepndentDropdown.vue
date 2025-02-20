
<script lang="ts">
const loadInputs = (t: Function, refs: object, levels: DependentDropdownLevels): Promise<any> => {
    return new Promise(async (resolve) => {
        const schema = [] as FormKitSchemaNode[]
        const keys = ObjectKeys(levels)
        for (let index = 0; index < keys.length; index++) {
            const currentKey = keys[index]
            const level = levels[currentKey]
            level.label = level.label ? t(level.label) : t(currentKey)
            level.placeholder = level.placeholder ? t(level.placeholder) : undefined
            const dependsOn = keys[index - 1]
            const node = {
                $cmp: 'FormKit',
                if: index == 0 ? `true` : `$get(${dependsOn}).value`,
                props: {
                    type: 'dropdown',
                    name: currentKey,
                    ref: (el: any) => refs[index] = el,
                    id: currentKey,
                    onInput: `$setInputValue`,
                    loadOnCreated: false,
                    alwaysLoadOnOpen: true,
                    selectionRemovable: true,
                    options: `$loadOptions`,
                    ...level
                }
            }
            schema.push(node)

        }
        resolve({ schema })
    })
} 
</script> 
<script setup lang="ts">
import type { FormKitNode, FormKitSchemaNode } from '@formkit/core'
import type { InputDependentDropdownProps, DependentDropdownLevels } from '@/types/types';
import { DependentDropdownMethodsNetwork, DependentDropdownMethodsLocal, type IDropDownInputMethods } from './DependetDropdown'
import { useI18n } from 'vue-i18n';
import { ref } from 'vue'
import { ObjectKeys } from '@/utils/object/object';
const props = defineProps<InputDependentDropdownProps>();
const { t } = useI18n()
const nodeElementsRef = ref<any>([])
const inputs = await loadInputs(t, nodeElementsRef.value, props.context.levels)
const dependentDropdownMethods: IDropDownInputMethods = props.context.data ? new DependentDropdownMethodsLocal(props) : new DependentDropdownMethodsNetwork(props)
const formData = ref({
    loadOptions: async (input: { id: string }) => {
        return dependentDropdownMethods.loadInputOptions(input.id)
    },
    setInputValue: async (value: any, node: FormKitNode) => {
        console.log(value)
        if (!value) return
        if (dependentDropdownMethods.activeInputs[node.name]) {
            if (dependentDropdownMethods.activeInputs[node.name].value == value) return
        }
        const { childInputName } = await dependentDropdownMethods.setInputValue(node.name, value, nodeElementsRef.value)
        if (!childInputName) props.context.node.input(value)
    },
})

</script>
<template>
    <FormKitSchema :data="formData" :schema="inputs.schema" />
</template> 