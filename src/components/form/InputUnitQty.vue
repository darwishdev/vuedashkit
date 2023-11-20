
 
<script setup lang="ts">
import type { InputUnitQtyProps } from '@/types/types';
import { useI18n } from 'vue-i18n';
const props = defineProps<InputUnitQtyProps>();
const { t } = useI18n()
// const nodeElementsRef = ref<any>([])
// const dependentDropdownMethods: IDropDownInputMethods = props.context.data ? new DependentDropdownMethodsLocal(props) : new DependentDropdownMethodsNetwork(props)
// const formData = ref({
//     loadOptions: async (input: { id: string }) => {
//         return dependentDropdownMethods.loadInputOptions(input.id)
//     },
//     setInputValue: async (value: any, node: FormKitNode) => {
//         console.log(value)
//         if (!value) return
//         if (dependentDropdownMethods.activeInputs[node.name]) {
//             if (dependentDropdownMethods.activeInputs[node.name].value == value) return
//         }
//         return dependentDropdownMethods.setInputValue(node.name, value, nodeElementsRef.value)
//     },
// })

</script>
<template>
    <div class="unit-qty success-border  disabled">
        <!-- {{ props.context }} -->
        <div class="top">
            <div class="start">
                Shrink
            </div>
            <div class="end">
                Can
            </div>
        </div>
        <div class="bottom">
            <FormKit type="text" value="1" outerClass="start" />
            <FormKit type="text" value="2" outerClass="end" />
        </div>
    </div>
</template> 

<style lang="scss">
.unit-qty {


    &.disabled {
        &.danger-border {
            border-color: var(--color-danger);

            & .bottom {
                &>div {
                    border-color: var(--color-danger);
                }
            }
        }

        &.success-border {
            border-color: var(--color-success);

            & .bottom {
                &>div {
                    border-color: var(--color-success);
                }
            }
        }

        & .bottom {
            &>div {
                border: 1px solid #fff;

            }


        }

        cursor: not-allowed;
        border: 1px solid #fff;

    }

    width: 100%;
    max-width: 200px;
    border-radius: 8px;
    padding: 0px;
    background: var(--color-card);

    & .top {
        padding: 8px 0 5px 0;
    }

    & .bottom {
        &>div {
            width: 100%;
            max-width: 100px;
            text-align: center;
            height: 100%;

            border-radius: 6px;
            background: var(--color-card);

            & input {
                height: 100%;
                text-align: center;
            }
        }
    }

    &>div {
        display: flex;
        justify-content: space-around;
        gap: 2px;
    }
}
</style>