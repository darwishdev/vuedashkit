// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/node_modules/vite/dist/node/index.js";
import vue from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///home/dev/darwishdev/private/packages/vue/dash-kit-project/v-dashkit/vite.config.ts";
var buildObjectMap = {
  vdashkit: { dtsFile: "src/vdashkit.ts", entryFile: "src/vdashkit.js", isTs2: true },
  types: { dtsFile: "src/types/types.ts", entryFile: "src/types/types.js", isTs2: true },
  stores: { dtsFile: "src/stores/stores.ts", entryFile: "src/stores/stores.js", isTs2: true },
  TableHeader: { dtsFile: "src/utils/table/TableHeader.ts", entryFile: "src/utils/table/TableHeader.js", isTs2: true },
  object: { dtsFile: "src/utils/object/object.ts", entryFile: "src/utils/object/object.js", isTs2: true },
  currency: { dtsFile: "src/utils/currency/currency.ts", entryFile: "src/utils/currency/currency.js", isTs2: true },
  date: { dtsFile: "src/utils/date/date.ts", entryFile: "src/utils/date/date.js", isTs2: true },
  AppLayout: { dtsFile: "src/components/theme/AppLayout.vue", entryFile: "src/components/theme/AppLayout.vue.js", isTs2: true },
  AppForm: { dtsFile: "src/components/form/AppForm.vue", entryFile: "src/components/form/AppForm.vue.js", isTs2: true },
  DataList: { dtsFile: "src/components/data/DataList.vue", entryFile: "src/components/data/DataList.vue.js", isTs2: true },
  LoginForm: { dtsFile: "src/components/form/LoginForm.vue", entryFile: "src/components/form/LoginForm.vue.js", isTs2: true },
  AppLayoutLoading: { dtsFile: "src/components/loading/AppLayoutLoading.vue", entryFile: "src/components/loading/AppLayoutLoading.vue.js", isTs2: true }
};
var getBuildElements = () => {
  const keys = Object.keys(buildObjectMap);
  const ts2List2 = [];
  const dtsList2 = [];
  const entriesList2 = [];
  const fileNames2 = {};
  for (const key of keys) {
    const currentValue = buildObjectMap[key];
    if (currentValue.isTs2) {
      ts2List2.push(currentValue.dtsFile);
    } else {
      dtsList2.push(currentValue.dtsFile);
    }
    entriesList2.push(currentValue.dtsFile);
    fileNames2[key] = currentValue.entryFile;
  }
  const result = {
    ts2List: ts2List2,
    dtsList: dtsList2,
    entriesList: entriesList2,
    fileNames: fileNames2
  };
  return result;
};
var {
  ts2List,
  dtsList,
  entriesList,
  fileNames
} = getBuildElements();
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      include: dtsList,
      exclude: ts2List,
      insertTypesEntry: true
    })
    // typescript2({
    //   check: false,
    //   include: ts2List,
    //   tsconfigOverride: {
    //     compilerOptions: {
    //       outDir: "dist",
    //       sourceMap: false,
    //       moduleResolution: 'nodenext',
    //       declaration: true,
    //       declarationMap: false,
    //     },
    //   },
    //   exclude: ["vite.config.ts"]
    // })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: entriesList,
      formats: ["es"],
      name: "v-dashkit",
      fileName: (_, entry) => {
        if (fileNames[entry])
          return fileNames[entry];
        return `${entry}.js`;
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
        "primevue/*",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kZXYvZGFyd2lzaGRldi9wcml2YXRlL3BhY2thZ2VzL3Z1ZS9kYXNoLWtpdC1wcm9qZWN0L3YtZGFzaGtpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZGV2L2Rhcndpc2hkZXYvcHJpdmF0ZS9wYWNrYWdlcy92dWUvZGFzaC1raXQtcHJvamVjdC92LWRhc2hraXQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZGV2L2Rhcndpc2hkZXYvcHJpdmF0ZS9wYWNrYWdlcy92dWUvZGFzaC1raXQtcHJvamVjdC92LWRhc2hraXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcblxuXG5cbnR5cGUgYnVpbGRPYmplY3QgPSB7XG4gIGR0c0ZpbGU6IHN0cmluZyxcbiAgZW50cnlGaWxlOiBzdHJpbmcsXG4gIGlzVHMyPzogQm9vbGVhbixcbn1cblxudHlwZSBidWlsZFJlc3VsdCA9IHtcbiAgdHMyTGlzdDogc3RyaW5nW10sXG4gIGR0c0xpc3Q6IHN0cmluZ1tdLFxuICBlbnRyaWVzTGlzdDogc3RyaW5nW10sXG4gIGZpbGVOYW1lczogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbn1cblxuY29uc3QgYnVpbGRPYmplY3RNYXA6IFJlY29yZDxzdHJpbmcsIGJ1aWxkT2JqZWN0PiA9IHtcbiAgdmRhc2hraXQ6IHsgZHRzRmlsZTogJ3NyYy92ZGFzaGtpdC50cycsIGVudHJ5RmlsZTogXCJzcmMvdmRhc2hraXQuanNcIiwgaXNUczI6IHRydWUgfSxcbiAgdHlwZXM6IHsgZHRzRmlsZTogJ3NyYy90eXBlcy90eXBlcy50cycsIGVudHJ5RmlsZTogXCJzcmMvdHlwZXMvdHlwZXMuanNcIiwgaXNUczI6IHRydWUgfSxcbiAgc3RvcmVzOiB7IGR0c0ZpbGU6ICdzcmMvc3RvcmVzL3N0b3Jlcy50cycsIGVudHJ5RmlsZTogXCJzcmMvc3RvcmVzL3N0b3Jlcy5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxuICBUYWJsZUhlYWRlcjogeyBkdHNGaWxlOiAnc3JjL3V0aWxzL3RhYmxlL1RhYmxlSGVhZGVyLnRzJywgZW50cnlGaWxlOiBcInNyYy91dGlscy90YWJsZS9UYWJsZUhlYWRlci5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxuICBvYmplY3Q6IHsgZHRzRmlsZTogXCJzcmMvdXRpbHMvb2JqZWN0L29iamVjdC50c1wiLCBlbnRyeUZpbGU6IFwic3JjL3V0aWxzL29iamVjdC9vYmplY3QuanNcIiwgaXNUczI6IHRydWUgfSxcbiAgY3VycmVuY3k6IHsgZHRzRmlsZTogXCJzcmMvdXRpbHMvY3VycmVuY3kvY3VycmVuY3kudHNcIiwgZW50cnlGaWxlOiBcInNyYy91dGlscy9jdXJyZW5jeS9jdXJyZW5jeS5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxuICBkYXRlOiB7IGR0c0ZpbGU6IFwic3JjL3V0aWxzL2RhdGUvZGF0ZS50c1wiLCBlbnRyeUZpbGU6IFwic3JjL3V0aWxzL2RhdGUvZGF0ZS5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxuICBBcHBMYXlvdXQ6IHsgZHRzRmlsZTogXCJzcmMvY29tcG9uZW50cy90aGVtZS9BcHBMYXlvdXQudnVlXCIsIGVudHJ5RmlsZTogXCJzcmMvY29tcG9uZW50cy90aGVtZS9BcHBMYXlvdXQudnVlLmpzXCIsIGlzVHMyOiB0cnVlIH0sXG4gIEFwcEZvcm06IHsgZHRzRmlsZTogXCJzcmMvY29tcG9uZW50cy9mb3JtL0FwcEZvcm0udnVlXCIsIGVudHJ5RmlsZTogXCJzcmMvY29tcG9uZW50cy9mb3JtL0FwcEZvcm0udnVlLmpzXCIsIGlzVHMyOiB0cnVlIH0sXG4gIERhdGFMaXN0OiB7IGR0c0ZpbGU6IFwic3JjL2NvbXBvbmVudHMvZGF0YS9EYXRhTGlzdC52dWVcIiwgZW50cnlGaWxlOiBcInNyYy9jb21wb25lbnRzL2RhdGEvRGF0YUxpc3QudnVlLmpzXCIsIGlzVHMyOiB0cnVlIH0sXG4gIExvZ2luRm9ybTogeyBkdHNGaWxlOiBcInNyYy9jb21wb25lbnRzL2Zvcm0vTG9naW5Gb3JtLnZ1ZVwiLCBlbnRyeUZpbGU6IFwic3JjL2NvbXBvbmVudHMvZm9ybS9Mb2dpbkZvcm0udnVlLmpzXCIsIGlzVHMyOiB0cnVlIH0sXG4gIEFwcExheW91dExvYWRpbmc6IHsgZHRzRmlsZTogXCJzcmMvY29tcG9uZW50cy9sb2FkaW5nL0FwcExheW91dExvYWRpbmcudnVlXCIsIGVudHJ5RmlsZTogXCJzcmMvY29tcG9uZW50cy9sb2FkaW5nL0FwcExheW91dExvYWRpbmcudnVlLmpzXCIsIGlzVHMyOiB0cnVlIH0sXG59XG5cblxuY29uc3QgZ2V0QnVpbGRFbGVtZW50cyA9ICgpOiBidWlsZFJlc3VsdCA9PiB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhidWlsZE9iamVjdE1hcClcbiAgY29uc3QgdHMyTGlzdCA9IFtdXG4gIGNvbnN0IGR0c0xpc3QgPSBbXVxuICBjb25zdCBlbnRyaWVzTGlzdCA9IFtdXG4gIGNvbnN0IGZpbGVOYW1lczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWU6IGJ1aWxkT2JqZWN0ID0gYnVpbGRPYmplY3RNYXBba2V5XVxuICAgIGlmIChjdXJyZW50VmFsdWUuaXNUczIpIHtcbiAgICAgIHRzMkxpc3QucHVzaChjdXJyZW50VmFsdWUuZHRzRmlsZSlcbiAgICB9IGVsc2Uge1xuICAgICAgZHRzTGlzdC5wdXNoKGN1cnJlbnRWYWx1ZS5kdHNGaWxlKVxuICAgIH1cblxuICAgIGVudHJpZXNMaXN0LnB1c2goY3VycmVudFZhbHVlLmR0c0ZpbGUpXG4gICAgZmlsZU5hbWVzW2tleV0gPSBjdXJyZW50VmFsdWUuZW50cnlGaWxlXG4gIH1cbiAgY29uc3QgcmVzdWx0OiBidWlsZFJlc3VsdCA9IHtcbiAgICB0czJMaXN0LFxuICAgIGR0c0xpc3QsXG4gICAgZW50cmllc0xpc3QsXG4gICAgZmlsZU5hbWVzXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCB7XG4gIHRzMkxpc3QsXG4gIGR0c0xpc3QsXG4gIGVudHJpZXNMaXN0LFxuICBmaWxlTmFtZXNcbn0gPSBnZXRCdWlsZEVsZW1lbnRzKClcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIGR0cyh7XG4gICAgICBpbmNsdWRlOiBkdHNMaXN0LFxuICAgICAgZXhjbHVkZTogdHMyTGlzdCxcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWVcblxuICAgIH0pLFxuICAgIC8vIHR5cGVzY3JpcHQyKHtcbiAgICAvLyAgIGNoZWNrOiBmYWxzZSxcbiAgICAvLyAgIGluY2x1ZGU6IHRzMkxpc3QsXG4gICAgLy8gICB0c2NvbmZpZ092ZXJyaWRlOiB7XG4gICAgLy8gICAgIGNvbXBpbGVyT3B0aW9uczoge1xuICAgIC8vICAgICAgIG91dERpcjogXCJkaXN0XCIsXG4gICAgLy8gICAgICAgc291cmNlTWFwOiBmYWxzZSxcbiAgICAvLyAgICAgICBtb2R1bGVSZXNvbHV0aW9uOiAnbm9kZW5leHQnLFxuICAgIC8vICAgICAgIGRlY2xhcmF0aW9uOiB0cnVlLFxuICAgIC8vICAgICAgIGRlY2xhcmF0aW9uTWFwOiBmYWxzZSxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgIH0sXG4gICAgLy8gICBleGNsdWRlOiBbXCJ2aXRlLmNvbmZpZy50c1wiXVxuICAgIC8vIH0pXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgY3NzQ29kZVNwbGl0OiBmYWxzZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBlbnRyaWVzTGlzdCxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCJdLFxuICAgICAgbmFtZTogXCJ2LWRhc2hraXRcIixcbiAgICAgIGZpbGVOYW1lOiAoXywgZW50cnkpID0+IHtcbiAgICAgICAgaWYgKGZpbGVOYW1lc1tlbnRyeV0pIHJldHVybiBmaWxlTmFtZXNbZW50cnldXG4gICAgICAgIC8vIGlmIChlbnRyeSA9PSAnVGFibGVIZWFkZXInKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIGB1dGlscy90YWJsZS9UYWJsZUhlYWRlci5qc2BcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZiAoZW50cnkgPT0gJ3R5cGVzJykge1xuICAgICAgICAvLyAgIHJldHVybiBgdHlwZXMvdHlwZXMuanNgXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKGVudHJ5ID09ICdzdG9yZXMnKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIGBzdG9yZXMvc3RvcmVzLmpzYFxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gaWYgKGVudHJ5ID09ICdBcHBMYXlvdXQnKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIGB0aGVtZS9BcHBMYXlvdXQudnVlLmpzYFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmIChlbnRyeSA9PSAnRGF0YUxpc3QnKSB7XG4gICAgICAgIC8vICAgcmV0dXJuIGBkYXRhL0RhdGFMaXN0LnZ1ZS5qc2BcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhmaWxlTmFtZXNbZW50cnldKVxuICAgICAgICByZXR1cm4gYCR7ZW50cnl9LmpzYFxuICAgICAgfVxuXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICBcIkBmb3Jta2l0L2FkZG9uc1wiLFxuICAgICAgICBcIkBmb3Jta2l0L2ljb25zXCIsXG4gICAgICAgIFwiQGZvcm1raXQvdnVlXCIsXG4gICAgICAgIFwicGluaWFcIixcbiAgICAgICAgXCJwcmltZWljb25zXCIsXG4gICAgICAgIFwicHJpbWV2dWVcIixcbiAgICAgICAgXCJwcmltZXZ1ZS8qXCIsXG4gICAgICAgIFwidnVlXCIsXG4gICAgICAgIFwidnVlLWkxOG5cIixcbiAgICAgICAgXCJ2dWUtcm91dGVyXCIsXG4gICAgICBdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAgIHByaW1ldnVlOiAncHJpbWV2dWUnLFxuICAgICAgICAgIGkxOG46ICdpMThuJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxuXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4WCxTQUFTLGVBQWUsV0FBVztBQUNqYSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxTQUFTO0FBSGdPLElBQU0sMkNBQTJDO0FBb0JqUyxJQUFNLGlCQUE4QztBQUFBLEVBQ2xELFVBQVUsRUFBRSxTQUFTLG1CQUFtQixXQUFXLG1CQUFtQixPQUFPLEtBQUs7QUFBQSxFQUNsRixPQUFPLEVBQUUsU0FBUyxzQkFBc0IsV0FBVyxzQkFBc0IsT0FBTyxLQUFLO0FBQUEsRUFDckYsUUFBUSxFQUFFLFNBQVMsd0JBQXdCLFdBQVcsd0JBQXdCLE9BQU8sS0FBSztBQUFBLEVBQzFGLGFBQWEsRUFBRSxTQUFTLGtDQUFrQyxXQUFXLGtDQUFrQyxPQUFPLEtBQUs7QUFBQSxFQUNuSCxRQUFRLEVBQUUsU0FBUyw4QkFBOEIsV0FBVyw4QkFBOEIsT0FBTyxLQUFLO0FBQUEsRUFDdEcsVUFBVSxFQUFF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
