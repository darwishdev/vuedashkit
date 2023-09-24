
import { createApp } from 'vue'
import dashkitConfig from '@/plugins/vuedashkit.config'
import App from './App.vue'
import router from './router'
import VueDashkit from './vdashkit'
import { VueQueryPlugin, type VueQueryPluginOptions } from "@tanstack/vue-query";
const app = createApp(App)
const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    },
}
app.use(router).use(VueDashkit, dashkitConfig).use(VueQueryPlugin, vueQueryPluginOptions)
    .mount('#app')
