
import { createApp } from 'vue'
import dashkitConfig from '@/plugins/vuedashkit.config'
import "@/assets/app.scss"
import App from './App.vue'
import router from './router'
import VueDashkit from './VueDashkit'
const app = createApp(App)

app.use(router).use(VueDashkit, dashkitConfig)

app.mount('#app')
