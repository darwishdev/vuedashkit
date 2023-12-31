
import { createApp } from 'vue'
import dashkitConfig from '@/plugins/vuedashkit.config'
import App from './App.vue'
import router from './router'
import VueDashkit from './vdashkit'
import { createPinia } from 'pinia'
import "@/assets/app.scss"
import "@/assets/primeflex.scss"
import "primeicons/primeicons.css"
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
const app = createApp(App)


app.use(ToastService)
    .use(DialogService).use(router).use(createPinia()).use(VueDashkit, dashkitConfig)
    .mount('#app')
