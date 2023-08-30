
import type { App } from "vue"
import { type DefaultConfigOptions } from '@formkit/vue'
import * as baseComponents from "@/components/base"
import type { DashKitConfig } from "@/types/types"
import PrimeVue from 'primevue/config'
import formKitConfigWrapper from "./plugins/formkit.custom.config"
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'

import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
export default {
    install: (app: App, config: DashKitConfig) => {
        const activateFileUpload = config && typeof config.uploadHandler != 'undefined'
        let formKitConfig: DefaultConfigOptions
        formKitConfig = formKitConfigWrapper(config.formKitConfig, { activateFileUpload })
        Object.keys(baseComponents).forEach((key: string) => {
            app.component(key, baseComponents[key as keyof typeof baseComponents])
        });
        app.use(PrimeVue)
            .use(ToastService)
            .use(DialogService)
            .use(plugin, defaultConfig(formKitConfig))
            .use(createPinia())

        app.provide("loginHandler", config.loginHandler)
    }
}