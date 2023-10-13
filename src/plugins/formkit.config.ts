
import { genesisIcons } from "@formkit/icons"
import type { DefaultConfigOptions } from '@formkit/vue'
import { createProPlugin, inputs } from '@formkit/pro'
import { ar, en } from '@formkit/i18n'
const pro = createProPlugin(import.meta.env.VITE_FORMKIT_TOKEN, inputs)

const config: DefaultConfigOptions = {
    plugins: [pro],
    icons: { ...genesisIcons },
    locales: { ar, en },
    // Define the active locale
    locale: 'en',
    theme: 'genesis'

}

export default config
