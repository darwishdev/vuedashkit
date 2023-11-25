
 
<script setup lang="ts">
import type { InputUnitQtyProps, UnitValues } from '@/types/types';
import { UnitSellShift, UnitParseWholeQty } from '@/utils/currency/currency'
import { Debounce } from '@/utils/debounce/debounce';
import { ref } from 'vue';
const props = defineProps<InputUnitQtyProps>();
const { unitRatio } = props.context
const blockListners = ref(false)
const debounceDelay = 300
const buyUnitElementRef = ref()
const sellUnitElementRef = ref()
const emitUpdate = (values?: UnitValues) => {
    const unitValues = values ? values : parseValues()
    const totalQuantity = UnitParseWholeQty(unitValues, unitRatio)
    props.context.node.input(totalQuantity)
}
const parseValues = (): UnitValues => {
    const buyValue = buyUnitElementRef.value.node.value
    const sellValue = sellUnitElementRef.value.node.value
    const buyValueConverted = buyValue ? parseFloat(buyValue) : 0
    const sellValueConverted = sellValue ? parseFloat(sellValue) : 0
    return { unitBuy: buyValueConverted, unitSell: sellValueConverted }
}
const onUnitSellInput = (e: unknown, node: any) => {
    if ((!buyUnitElementRef.value.node.value && !e) || blockListners.value) return
    blockListners.value = true
    const values = parseValues()
    const { unitBuyQuantityIncreaseAmount, unitSellQuantity } = UnitSellShift(values, unitRatio)
    values.unitBuy = values.unitBuy + unitBuyQuantityIncreaseAmount
    buyUnitElementRef.value.node.input(values.unitBuy)
    node.input(unitSellQuantity)
    const debouncedEvent = Debounce(() => {
        console.log('debounces')
        emitUpdate(values)
        blockListners.value = false
    }, debounceDelay)
    debouncedEvent()
}
const onUnitBuyInput = () => {
    const debouncedEvent = Debounce(emitUpdate, debounceDelay)
    debouncedEvent()
}
</script>
<template>
    <div class="unit-qty">
        <!-- {{ props.context }} -->
        <div class="top">
            <div class="start">
                {{ props.context.unitBuy }}
            </div>
            <div class="end">
                {{ props.context.unitSell }}
            </div>
        </div>
        <div class="bottom">
            <FormKit type="number" ref="buyUnitElementRef" :onInput="onUnitBuyInput" outerClass="start"
                :value="props.context.initialValues ? props.context.initialValues.unitBuy.toString() : undefined" />
            <FormKit type="number" ref="sellUnitElementRef" :onInput="onUnitSellInput"
                :value="props.context.initialValues ? props.context.initialValues.unitSell.toString() : undefined"
                outerClass="end" />
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