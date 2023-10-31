<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { dependentDropdownProps , dropdownSchema , ApiLevelStructure } from '../../types/types';
import { useFormStore } from '@/stores/form';
const props = defineProps<dependentDropdownProps>();
const dropDownsModel = ref()
const DropDowmsSchema : any = ref([])
const formStore = useFormStore()
const dependentKeys : any = ref([])
const allOptions : any = ref()

const removeDependentValue = (Name : string) => {
    if(props.context.apiLevelsStructure){
        const dependentInput = props.context.apiLevelsStructure.filter(schema => schema.parentLevelName == Name);
        if(dependentInput.length > 0 && formStore.formValue[dependentInput[0].levelName]){
            const inputIndex = DropDowmsSchema.value.findIndex(obj => obj.props.name == dependentInput[0].levelName);
            formStore.formElementRef.node._value[dependentInput[0].levelName] = null
            DropDowmsSchema.value[inputIndex].props.help = 'please update the value of this field'
        }
    }
    else{
        const dependentInput = props.context.attrs.dropdownsSchema.filter(schema => schema.dependsOn == Name);
        if(dependentInput.length > 0 && formStore.formValue[dependentInput[0].name]){
            const inputIndex = DropDowmsSchema.value.findIndex(obj => obj.props.name == dependentInput[0].name);
            formStore.formElementRef.node._value[dependentInput[0].name] = null
            DropDowmsSchema.value[inputIndex].props.help = 'please update the value of this field'
        }
    }
}

const getOptions = async () => {
    return new Promise<any[]>((resolve) => {
        props.context.apiEndpoint!({}).then(res => {
            allOptions.value = res.options
            const updatedData = addLevelToObjects(allOptions.value);
            allOptions.value = updatedData
            console.log(allOptions.value , 'updated Data with levels');   
            resolve(res.options)
        })   
    })
}

function addLevelToObjects(data, levelNumber = 1, parentValue = null) {
  return data.map((item) => {
    const newItem = { ...item, level: levelNumber, parentValue };

    if (newItem.children && newItem.children.length > 0) {
      newItem.children = addLevelToObjects(newItem.children, levelNumber + 1, newItem.value);
    }

    return newItem;
  });
}

const getObjectsByLevelAndParentValue = async (data : any, level : number, parentValue : any, parentName: string | null = null) => {
  return new Promise<any[]>((resolve) => {
    const result: any[] = [];
    if (parentValue == -1) {
      parentValue = formStore.formElementRef.node._value[parentName as string];
    }
    for (const item of data) {
      if (item.level == level && item.parentValue == parentValue) {
        result.push(item);
      }
      if (item.children && item.children.length > 0) {
        getObjectsByLevelAndParentValue(item.children, level, parentValue)
          .then((childrenResult) => {
            result.push(...childrenResult);
          });
      }
    }
    // console.log(result , level);
    resolve(result);
  });
};

onMounted(async() => {
    if(props.context.apiLevelsStructure && props.context.apiEndpoint){
        await getOptions()
        props.context.apiLevelsStructure.forEach((level : ApiLevelStructure , index) => {
            if(!level.parentLevelName){
                const generateOptions = () => {
                    return new Promise<any[]>((resolve) => {
                        console.log('hii from primary');
                        getObjectsByLevelAndParentValue(allOptions.value , level.levelNumber , null).then(res => {
                            console.log(res , 'resultt');
                            resolve(res)
                        })  
                    })
                }
                const dropdown = {
                    $cmp: 'FormKit',
                    props: {
                        type: 'dropdown',
                        name : level.levelName,
                        id : level.levelName,
                        'always-load-on-open' : true,
                        closeOnSelect : true,
                        validation : 'required',
                        label : level.levelLabel ? level.levelLabel : level.levelName,
                        placeholder : level.levelPlaceholder ? level.levelPlaceholder : `choose your ${level.levelName}`,
                        options : generateOptions,
                        onInput: (req: any) => {
                            removeDependentValue(level.levelName);
                            console.log(formStore.formValue , 'frpm custom input')
                            console.log(props.context.node.input(dropDownsModel.value))
                            setTimeout(() => {
                                console.log(formStore.formElementRef.node._value[level.levelName])
                            }, 200);
                        },
                    }
                }
                DropDowmsSchema.value.push(dropdown)
                console.log(DropDowmsSchema.value);
            }
            else{
                const generateDependentOptions = () => {
                    return new Promise<any[]>((resolve) => {
                        console.log('hiiiii from dependent');
                        getObjectsByLevelAndParentValue(allOptions.value ,level.levelNumber , formStore.formElementRef.node._value[level.parentLevelName as string] ? formStore.formElementRef.node._value[level.parentLevelName as string] : -1 , level.parentLevelName ).then(res => {
                            console.log(res , 'resultt');
                            resolve(res)
                        })  
                    })
                }
                const dropdown = {
                    $cmp: 'FormKit',
                    if : `$get(${level.parentLevelName}).value`,
                    props: {
                        type: 'dropdown',
                        name : level.levelName,
                        id : level.levelName,
                        closeOnSelect : true,
                        'always-load-on-open' : true,
                        validation : 'required',
                        label : level.levelLabel ? level.levelLabel : level.levelName,
                        placeholder : level.levelPlaceholder ? level.levelPlaceholder : `choose your ${level.levelName}`,
                        options : generateDependentOptions,
                        onInput: (req: any) => {
                            removeDependentValue(level.levelName);
                            DropDowmsSchema.value[index].props.help = ''
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
                DropDowmsSchema.value.push(dropdown)
            }
        });
    }
    if(props.context.attrs.dropdownsSchema){
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
                        console.log('hii from dependent');
                        
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
    }
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