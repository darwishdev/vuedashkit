import { fileURLToPath, URL } from 'node:url'
// import typescript from 'rollup-plugin-typescript2';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({ include: ["src/vdashkit.ts", "src/types/types.ts", "src/stores/*", "src/components/base/*", "src/components/theme/*"] }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: ["src/vdashkit.ts", "src/stores/stores.ts", "src/components/base/base.ts", "src/components/theme/theme.ts", "src/types/types.ts"],
      formats: ["es"],
      name: "vdashkit",
      fileName: (_, entry) => {
        if (entry == 'types') {
          return `types/types.js`
        }
        if (entry == 'stores') {
          return `stores/stores.js`
        }
        if (entry == 'base') {
          return `components/base/base.js`
        }
        if (entry == 'theme') {
          return `components/theme/theme.js`
        }
        return `${entry}.js`
      }

    },
    rollupOptions: {
      external: [
        "@formkit/addons",
        "@formkit/icons",
        "@formkit/pro",
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
