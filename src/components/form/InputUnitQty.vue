
 
<script setup lang="ts">
import type { InputUnitQtyProps } from '@/types/types';
import { ref } from 'vue';
const props = defineProps<InputUnitQtyProps>();
const buyUnitElementRef = ref()
const onUnitSellInput = (e, node) => {
    if (!buyUnitElementRef.value.node.value && !e) return
    const { sellValue, ratio, buyValue } = emitUpdate(e, node)
    if (sellValue < ratio) {
        return
    }
    const increseAmount = Math.floor(sellValue / ratio)
    buyUnitElementRef.value.node.input(buyValue + increseAmount)
    node.input(sellValue - increseAmount * ratio)
}
const emitUpdate = (e, node) => {
    const buyValue = buyUnitElementRef.value.node.value ? parseFloat(buyUnitElementRef.value.node.value) : 0
    const sellValue = e ? parseFloat(e) : 0
    const ratio = props.context.unitRatio
    const totalQuantity = buyValue * ratio + sellValue
    props.context.node.input(totalQuantity)
    return { buyValue, sellValue, ratio }
}
const onUnitBuyInput = (e, node) => {
    if (!e) return
    emitUpdate(e, node)
}
</script>
<template>
    <div class="unit-qty ">
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
            <FormKit type="number" :onInput="onUnitBuyInput" ref="buyUnitElementRef" outerClass="start"
                :value="props.context.initialValues.unitBuy ? props.context.initialValues.unitBuy.toString() : undefined" />
            <FormKit type="number" :onInput="onUnitSellInput"
                :value="props.context.initialValues.unitSell ? props.context.initialValues.unitSell.toString() : undefined"
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