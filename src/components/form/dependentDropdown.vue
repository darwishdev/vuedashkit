<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { dependentDropdownProps , dropdownSchema } from '../../types/types';
import { useFormStore } from '@/stores/form';
const props = defineProps<dependentDropdownProps>();
const dropDownsModel = ref()
const DropDowmsSchema : any = ref([])
const formStore = useFormStore()
const dependentKeys : any = ref([])

const removeDependentValue = (Name : string) => {
    const dependentInput = props.context.attrs.dropdownsSchema.filter(schema => schema.dependsOn == Name);
    if(dependentInput.length > 0 && formStore.formValue[dependentInput[0].name]){
        const inputIndex = DropDowmsSchema.value.findIndex(obj => obj.props.name == dependentInput[0].name);
        formStore.formElementRef.node._value[dependentInput[0].name] = null
        DropDowmsSchema.value[inputIndex].props.help = 'please update the value of this field'
    }
}

onMounted(() => {
    props.context.attrs.dropdownsSchema.forEach((schema : dropdownSchema , index) => {
        if(!schema.dependsOn){
            const generateOptions = () => {
                return new Promise<any[]>((resolve) => {
                    schema.optionsListFn({}).then(res => resolve(res.options))  
                })
            }
            const dropdown = {
                $cmp: 'FormKit',
                props: {
                    type: 'dropdown',
                    name : schema.name,
                    id : schema.name,
                    closeOnSelect : true,
                    alwaysLoadOnOpen : true,
                    options : generateOptions,
                    onInput: (req: any) => {
                        removeDependentValue(schema.name);
                        console.log(formStore.formValue , 'frpm custom input')
                        console.log(formStore.formElementRef.node._value , 'frpm custom input')
                        setTimeout(() => {
                            console.log(props.context.node.input(dropDownsModel.value))
                            console.log(props.context.node._value)
                            console.log(req)
                        }, 200);
                    },
                }
            }
            dropdown.props = {
            ...dropdown.props,
            ...schema.elementProps
            };
            DropDowmsSchema.value.push(dropdown)
            console.log(DropDowmsSchema.value);
        }
        else{        
            dependentKeys.value.push(schema.name)
            const generateDependentOptions = () => {
                return new Promise<any[]>((resolve) => {
                    const req = {
                        [schema.dataKey? schema.dataKey : schema.name as string] : formStore.formValue[schema.dataKey ? schema.dataKey! : schema.name!]
                    }
                    schema.optionsListFn(req).then(res => resolve(res.options))  
                })
            }
            const dropdown = {
                $cmp: 'FormKit',
                if: `$get(${schema.dependsOn}).value`,
                props: {
                    type: 'dropdown',
                    name : schema.name,
                    id : schema.name,
                    closeOnSelect : true,
                    options : generateDependentOptions,
                    alwaysLoadOnOpen : true,
                    onInput: (req: any) => {
                        setTimeout(() => {
                            removeDependentValue(schema.name);
                            DropDowmsSchema.value[index].props.help = ''
                            console.log(props.context.node.input(dropDownsModel.value))
                            console.log(props.context.node._value)
                        }, 200);
                    },
                }
            }
            dropdown.props = {
            ...dropdown.props,
            ...schema.elementProps
            };
            DropDowmsSchema.value.push(dropdown)
            console.log(DropDowmsSchema.value);
        }
    });
})
</script>
<template>
    <div class="w-11 m-auto p-3 my-3 bg-card border-round dependentDropDown">
            <FormKitSchema :schema="DropDowmsSchema" />
    </div>
</template>

<style>
.dependentDropDown .formkit-help {
    padding: 10px;
    background-color: var(--color-danger);
    color: #fff;
    border-radius: 6px;
    width: 100%;
    font-size: 17px;
    box-shadow: var(--shadow);
    margin-top: 20px;
}
[data-type='dropdown'] .formkit-inner {
    background-color: var(--fk-bg-input);
}
.formkit-option{
    color: grey;
}
</style>