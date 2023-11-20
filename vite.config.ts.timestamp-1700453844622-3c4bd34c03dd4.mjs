// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/node_modules/vite/dist/node/index.js";
import vue from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/vite.config.ts";
var listToBuildTs = [
  "src/vdashkit.ts",
  "src/types/types.ts",
  // "src/components/base/base.ts",
  "src/components/theme/AppLayout.vue",
  "src/stores/stores.ts",
  "src/utils/table/TableHeader.ts"
];
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    dts({ include: listToBuildTs })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: listToBuildTs,
      formats: ["es"],
      name: "vdashkit",
      fileName: (_, entry) => {
        if (entry == "types") {
          return `types/types.js`;
        }
        if (entry == "stores") {
          return `stores/stores.js`;
        }
        if (entry == "AppLayout") {
          return `components/theme/AppLayout.js`;
        }
        if (entry == "TableHeader") {
          return `utils/table/TableHeader.js`;
        }
        return `${entry}.js`;
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
        "vue-router"
      ],
      output: {
        globals: {
          vue: "Vue",
          primevue: "primevue",
          i18n: "i18n"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kZXYvZGFyd2lzaGRldi9wcml2YXRlL3BhY2thZ2VzL3Z1ZS9kYXNoLWtpdC1wcm9qZWN0L3YtZGFzaGtpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZGV2L2Rhcndpc2hkZXYvcHJpdmF0ZS9wYWNrYWdlcy92dWUvZGFzaC1raXQtcHJvamVjdC92LWRhc2hraXQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZGV2L2Rhcndpc2hkZXYvcHJpdmF0ZS9wYWNrYWdlcy92dWUvZGFzaC1raXQtcHJvamVjdC92LWRhc2hraXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcblxuXG5cblxuY29uc3QgbGlzdFRvQnVpbGRUcyA9IFtcbiAgXCJzcmMvdmRhc2hraXQudHNcIixcbiAgXCJzcmMvdHlwZXMvdHlwZXMudHNcIixcbiAgLy8gXCJzcmMvY29tcG9uZW50cy9iYXNlL2Jhc2UudHNcIixcbiAgXCJzcmMvY29tcG9uZW50cy90aGVtZS9BcHBMYXlvdXQudnVlXCIsXG4gIFwic3JjL3N0b3Jlcy9zdG9yZXMudHNcIixcbiAgJ3NyYy91dGlscy90YWJsZS9UYWJsZUhlYWRlci50cydcbl1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBkdHMoeyBpbmNsdWRlOiBsaXN0VG9CdWlsZFRzIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBidWlsZDoge1xuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBsaXN0VG9CdWlsZFRzLFxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXG4gICAgICBuYW1lOiBcInZkYXNoa2l0XCIsXG4gICAgICBmaWxlTmFtZTogKF8sIGVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChlbnRyeSA9PSAndHlwZXMnKSB7XG4gICAgICAgICAgcmV0dXJuIGB0eXBlcy90eXBlcy5qc2BcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50cnkgPT0gJ3N0b3JlcycpIHtcbiAgICAgICAgICByZXR1cm4gYHN0b3Jlcy9zdG9yZXMuanNgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkgPT0gJ0FwcExheW91dCcpIHtcbiAgICAgICAgICByZXR1cm4gYGNvbXBvbmVudHMvdGhlbWUvQXBwTGF5b3V0LmpzYFxuICAgICAgICB9XG4gICAgICAgIGlmIChlbnRyeSA9PSAnVGFibGVIZWFkZXInKSB7XG4gICAgICAgICAgcmV0dXJuIGB1dGlscy90YWJsZS9UYWJsZUhlYWRlci5qc2BcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgJHtlbnRyeX0uanNgXG4gICAgICB9XG5cbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXG4gICAgICAgIFwiQGZvcm1raXQvYWRkb25zXCIsXG4gICAgICAgIFwiQGZvcm1raXQvaWNvbnNcIixcbiAgICAgICAgXCJAZm9ybWtpdC9wcm9cIixcbiAgICAgICAgXCJAZm9ybWtpdC92dWVcIixcbiAgICAgICAgXCJwaW5pYVwiLFxuICAgICAgICBcInByaW1laWNvbnNcIixcbiAgICAgICAgXCJwcmltZXZ1ZVwiLFxuICAgICAgICBcInByaW1ldnVlL2RpYWxvZ3NlcnZpY2VcIixcbiAgICAgICAgXCJ2dWVcIixcbiAgICAgICAgXCJ2dWUtaTE4blwiLFxuICAgICAgICBcInZ1ZS1yb3V0ZXJcIixcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogJ1Z1ZScsXG4gICAgICAgICAgcHJpbWV2dWU6ICdwcmltZXZ1ZScsXG4gICAgICAgICAgaTE4bjogJ2kxOG4nLFxuXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cblxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFgsU0FBUyxlQUFlLFdBQVc7QUFDamEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUhnTyxJQUFNLDJDQUEyQztBQVFqUyxJQUFNLGdCQUFnQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFDQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixJQUFJLEVBQUUsU0FBUyxjQUFjLENBQUM7QUFBQSxFQUNoQztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGNBQWM7QUFBQSxJQUNkLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxNQUNQLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsR0FBRyxVQUFVO0FBQ3RCLFlBQUksU0FBUyxTQUFTO0FBQ3BCLGlCQUFPO0FBQUEsUUFDVDtBQUNBLFlBQUksU0FBUyxVQUFVO0FBQ3JCLGlCQUFPO0FBQUEsUUFDVDtBQUVBLFlBQUksU0FBUyxhQUFhO0FBQ3hCLGlCQUFPO0FBQUEsUUFDVDtBQUNBLFlBQUksU0FBUyxlQUFlO0FBQzFCLGlCQUFPO0FBQUEsUUFDVDtBQUVBLGVBQU8sR0FBRyxLQUFLO0FBQUEsTUFDakI7QUFBQSxJQUVGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsVUFDTCxVQUFVO0FBQUEsVUFDVixNQUFNO0FBQUEsUUFFUjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
