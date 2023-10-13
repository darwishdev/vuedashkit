
import { ComponentCustomProperties } from 'vue'
import { VueI18n } from 'vue-i18n'
import { FormKitVuePlugin } from '@formkit/vue'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: VueI18n['t'],

        $formkit: FormKitVuePlugin
    }
}