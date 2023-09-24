// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/node_modules/vite/dist/node/index.js";
import vue from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    dts({ include: ["src/vdashkit.ts", "src/stores/*", "src/components/base/*", "src/types/types.ts"] })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: ["src/vdashkit.ts", "src/stores/stores.ts", "src/components/base/base.ts"],
      formats: ["es"],
      name: "vdashkit",
      fileName: (_, entry) => {
        if (entry == "stores") {
          return `stores/stores.js`;
        }
        if (entry == "base") {
          return `components/base/base.js`;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kZXYvZGFyd2lzaGRldi9wcml2YXRlL3BhY2thZ2VzL3Z1ZS9kYXNoLWtpdC1wcm9qZWN0L3YtZGFzaGtpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZGV2L2Rhcndpc2hkZXYvcHJpdmF0ZS9wYWNrYWdlcy92dWUvZGFzaC1raXQtcHJvamVjdC92LWRhc2hraXQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZGV2L2Rhcndpc2hkZXYvcHJpdmF0ZS9wYWNrYWdlcy92dWUvZGFzaC1raXQtcHJvamVjdC92LWRhc2hraXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbi8vIGltcG9ydCB0eXBlc2NyaXB0IGZyb20gJ3JvbGx1cC1wbHVnaW4tdHlwZXNjcmlwdDInO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIGR0cyh7IGluY2x1ZGU6IFtcInNyYy92ZGFzaGtpdC50c1wiLCBcInNyYy9zdG9yZXMvKlwiLCBcInNyYy9jb21wb25lbnRzL2Jhc2UvKlwiLCBcInNyYy90eXBlcy90eXBlcy50c1wiXSB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IFtcInNyYy92ZGFzaGtpdC50c1wiLCBcInNyYy9zdG9yZXMvc3RvcmVzLnRzXCIsIFwic3JjL2NvbXBvbmVudHMvYmFzZS9iYXNlLnRzXCJdLFxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXG4gICAgICBuYW1lOiBcInZkYXNoa2l0XCIsXG4gICAgICBmaWxlTmFtZTogKF8sIGVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChlbnRyeSA9PSAnc3RvcmVzJykge1xuICAgICAgICAgIHJldHVybiBgc3RvcmVzL3N0b3Jlcy5qc2BcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50cnkgPT0gJ2Jhc2UnKSB7XG4gICAgICAgICAgcmV0dXJuIGBjb21wb25lbnRzL2Jhc2UvYmFzZS5qc2BcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7ZW50cnl9LmpzYFxuICAgICAgfVxuXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICBcIkBmb3Jta2l0L2FkZG9uc1wiLFxuICAgICAgICBcIkBmb3Jta2l0L2ljb25zXCIsXG4gICAgICAgIFwiQGZvcm1raXQvcHJvXCIsXG4gICAgICAgIFwiQGZvcm1raXQvdnVlXCIsXG4gICAgICAgIFwicGluaWFcIixcbiAgICAgICAgXCJwcmltZWljb25zXCIsXG4gICAgICAgIFwicHJpbWV2dWVcIixcbiAgICAgICAgXCJ2dWVcIixcbiAgICAgICAgXCJ2dWUtaTE4blwiLFxuICAgICAgICBcInZ1ZS1yb3V0ZXJcIixcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogJ1Z1ZScsXG4gICAgICAgICAgcHJpbWV2dWU6ICdwcmltZXZ1ZScsXG4gICAgICAgICAgaTE4bjogJ2kxOG4nLFxuXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cblxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFgsU0FBUyxlQUFlLFdBQVc7QUFFamEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUpnTyxJQUFNLDJDQUEyQztBQU9qUyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixJQUFJLEVBQUUsU0FBUyxDQUFDLG1CQUFtQixnQkFBZ0IseUJBQXlCLG9CQUFvQixFQUFFLENBQUM7QUFBQSxFQUNyRztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGNBQWM7QUFBQSxJQUNkLEtBQUs7QUFBQSxNQUNILE9BQU8sQ0FBQyxtQkFBbUIsd0JBQXdCLDZCQUE2QjtBQUFBLE1BQ2hGLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsR0FBRyxVQUFVO0FBQ3RCLFlBQUksU0FBUyxVQUFVO0FBQ3JCLGlCQUFPO0FBQUEsUUFDVDtBQUNBLFlBQUksU0FBUyxRQUFRO0FBQ25CLGlCQUFPO0FBQUEsUUFDVDtBQUNBLGVBQU8sR0FBRyxLQUFLO0FBQUEsTUFDakI7QUFBQSxJQUVGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLFVBQVU7QUFBQSxVQUNWLE1BQU07QUFBQSxRQUVSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
