<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { dependentDropdownProps , dropdownSchema } from '../../types/types';
const props = defineProps<dependentDropdownProps>();
const dropDownsModel = ref()
const title = props.context.groupName
const DropDowmsSchema : any = ref([])
onMounted(() => {
    props.context.attrs.dropdownsSchema.forEach((schema: dropdownSchema) => {
        if(schema.isIndependent){
            const dropdown = {
                $cmp: 'FormKit',
                props: {
                    type: 'dropdown',
                    name : schema.name,
                    id : schema.name,
                    options : ['kimo' , 'test' , 'alex'],
                    closeOnSelect : true,
                    alwaysLoadOnOpen : true,
                    validation: schema.validation,
                    label : schema.label,
                    placeholder : schema.placeholder,
                    onInput: (req: any) => {
                        // dropDownsModel.value[schema.name] = req
                        setTimeout(() => {
                            console.log(props.context.node.input(dropDownsModel.value))
                            console.log(props.context.node._value)
                            console.log(req)
                        }, 200);
                    },
                }
            }
            DropDowmsSchema.value.push(dropdown)
            console.log(DropDowmsSchema.value);
        }
        else{
            const dropdown = {
                $cmp: 'FormKit',
                if: `$get(${schema.dependentOn}).value`,
                props: {
                    type: 'dropdown',
                    name : schema.name,
                    id : schema.name,
                    options : ['kimo' , 'test' , 'alex'],
                    closeOnSelect : true,
                    alwaysLoadOnOpen : true,
                    validation: schema.validation,
                    label : schema.label,
                    placeholder : schema.placeholder,
                    onInput: (req: any) => {
                        setTimeout(() => {
                            console.log(props.context.node.input(dropDownsModel.value))
                            console.log(props.context.node._value)
                            console.log(req)
                        }, 200);
                    },
                }
            }
            DropDowmsSchema.value.push(dropdown)
            console.log(DropDowmsSchema.value);
        }
    });
})
</script>
<template>
    <div class="w-11 m-auto p-3 my-3 bg-card border-round">
        <h1>{{ title }}</h1>
        <!-- {{ dropDownsModel }} -->
        <FormKit type="form" v-model="dropDownsModel" :actions="false">
            <FormKitSchema :schema="DropDowmsSchema" />
        </FormKit>
    </div>
</template>

<style>
[data-type='dropdown'] .formkit-inner {
    background-color: var(--fk-bg-input);
}
.formkit-option{
    color: grey;
}
</style>