
import type { App } from "vue"
import { type DefaultConfigOptions } from '@formkit/vue'
import * as baseComponents from "@/components/base/base"
import type { VueDashKitConfig } from "@/types/types"
import PrimeVue from 'primevue/config'
import formKitConfigWrapper from "./plugins/formkit.custom.config"
import { plugin, defaultConfig } from '@formkit/vue'
import '@/assets/app.scss'
import { createPinia } from 'pinia'
import initI18n from '@/plugins/i18n'
export default {
    install: (app: App, config: VueDashKitConfig) => {
        let formKitConfig: DefaultConfigOptions
        formKitConfig = formKitConfigWrapper(config.formKitConfig)
        Object.keys(baseComponents).forEach((key: string) => {
            app.component(key, baseComponents[key as keyof typeof baseComponents])
        });
        const i18n = initI18n(config.translations)
        const pinia = createPinia()
        app.use(pinia).use(PrimeVue)
            .use(i18n)
            .use(plugin, defaultConfig(formKitConfig))


        app.provide("loginHandler", config.loginHandler)
        app.provide("uploadHandler", config.uploadHandler)
        app.provide("permissionsHandler", config.permissionsHandler)
        app.provide("baseImageUrl", config.baseImageUrl)
        app.provide("fallBackImageUrl", config.fallBackImageUrl)
    }
}