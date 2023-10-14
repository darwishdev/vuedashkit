
import type { App } from "vue"
import { type DefaultConfigOptions } from '@formkit/vue'
import * as baseComponents from "@/components/base/base"
import type { VueDashKitConfig } from "@/types/types"
import PrimeVue from 'primevue/config'
import formKitConfigWrapper from "./plugins/formkit.custom.config"
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import initI18n from '@/plugins/i18n'
import "@/assets/app.scss"

import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
export default {
    install: (app: App, config: VueDashKitConfig) => {
        let formKitConfig: DefaultConfigOptions
        formKitConfig = formKitConfigWrapper(config.formKitConfig)
        Object.keys(baseComponents).forEach((key: string) => {
            app.component(key, baseComponents[key as keyof typeof baseComponents])
        });
        const i18n = initI18n(config.translations)
        app.use(PrimeVue)
            .use(ToastService)
            .use(DialogService)
            .use(i18n)
            .use(plugin, defaultConfig(formKitConfig))
            .use(createPinia())

        app.provide("loginHandler", config.loginHandler)
        app.provide("uploadHandler", config.uploadHandler)
    }
}