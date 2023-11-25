
import { ComponentCustomProperties } from 'vue'
import { VueI18n } from 'vue-i18n'

import { FormKitInputs } from '@formkit/core';
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: VueI18n['t'],
        $formkit: any,
    }
}
export declare interface FormKitRuntimeProps<Props extends FormKitInputs<Props>> {

    modelValue: PropType<Props, 'value'> | number;
}
declare module 'formkit' {
    export interface FormKitRuntimeProps<Props> {
        modelValue: string | number; // Allowing both string and number types
    }
}