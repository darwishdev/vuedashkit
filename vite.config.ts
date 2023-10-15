import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';




const listToBuildTs = [
  "src/vdashkit.ts",
  "src/types/types.ts",
  "src/components/theme/AppLayout.vue"
]
export default defineConfig({
  plugins: [
    vue(),
    dts({ include: listToBuildTs }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: listToBuildTs,
      formats: ["es"],
      name: "vdashkit",
      fileName: (_, entry) => {
        if (entry == 'types') {
          return `types/types.js`
        }
        if (entry == 'AppLayout') {
          return `components/theme/AppLayout.js`
        }
        return `${entry}.js`
      }

    },
    rollupOptions: {
      external: [
        "@formkit/addons",
        "@formkit/icons",
        "@formkit/vue",
        "pinia",
        "primeicons",
        "primevue",
        "primevue/dialogservice",
        "vue",
        "vue-i18n",
        "vue-router",
      ],
      output: {
        globals: {
          vue: 'Vue',
          primevue: 'primevue',
          i18n: 'i18n',
        },
      },
    },
  }

})
