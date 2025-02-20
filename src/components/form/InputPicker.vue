<script lang="ts" setup>

import type { InputPickerProps } from '@/types/types'


const props = defineProps<InputPickerProps>();

const onInputChange = async (value: any) => {
    props.context.node._value = new Date(value)
    props.context.node.input(props.context.node._value)
}

</script>

<template>
    <FormKit :ignore="true" outerClass="w-full" type="datepicker" name="custom-picker" @input="onInputChange" />
</template>