
 
<script setup lang="ts">
import type { UnitPriceProps } from '@/types/types';
import { ref } from 'vue';
import { FormateCurrency } from '@/utils/currency/currency';
const props = defineProps<UnitPriceProps>();

</script>
<template>
    <div class="unit-qty-price ">
        <!-- {{ props.context }} -->
        <div class="top">
            <div class="header" v-for="(header, index ) in props.headers" :key="index"
                :style="`background: ${header.background}`">
                {{ $t(header.label) }}
            </div>

        </div>
        <div class="bottom">
            <div class="header" v-for="(header, index ) in props.headers" :key="index"
                :style="`background: ${header.background}`">
                {{ FormateCurrency(header.value, $t('currency')) }}
            </div>
        </div>
    </div>
</template> 

<style lang="scss">
.unit-qty-price {

    width: 100%;

    border-radius: 8px;
    padding: 0px;
    background: var(--color-card);

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


    &>div {
        display: flex;
        justify-content: space-around;
        gap: 2px;
    }

    & .top {


        &>div {
            display: flex;
            justify-content: center;
            padding: 5px 0;
            width: 100%;
            border-radius: var(--border-radius);
        }
    }

    & .bottom {
        &>div {
            width: 100%;
            text-align: center;
            height: 100%;
            border-radius: 6px;
            background: var(--color-card);
            padding: var(--fk-padding-input);

        }
    }

}
</style>