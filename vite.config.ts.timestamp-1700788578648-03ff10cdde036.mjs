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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kZXYvZGFyd2lzaGRldi9wcml2YXRlL3BhY2thZ2VzL3Z1ZS9kYXNoLWtpdC1wcm9qZWN0L3YtZGFzaGtpdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZGV2L2Rhcndpc2hkZXYvcHJpdmF0ZS9wYWNrYWdlcy92dWUvZGFzaC1raXQtcHJvamVjdC92LWRhc2hraXQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZGV2L2Rhcndpc2hkZXYvcHJpdmF0ZS9wYWNrYWdlcy92dWUvZGFzaC1raXQtcHJvamVjdC92LWRhc2hraXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcblxuXG5cbnR5cGUgYnVpbGRPYmplY3QgPSB7XG4gIGR0c0ZpbGU6IHN0cmluZyxcbiAgZW50cnlGaWxlOiBzdHJpbmcsXG4gIGlzVHMyPzogQm9vbGVhbixcbn1cblxudHlwZSBidWlsZFJlc3VsdCA9IHtcbiAgdHMyTGlzdDogc3RyaW5nW10sXG4gIGR0c0xpc3Q6IHN0cmluZ1tdLFxuICBlbnRyaWVzTGlzdDogc3RyaW5nW10sXG4gIGZpbGVOYW1lczogUmVjb3JkPHN0cmluZywgc3RyaW5nPixcbn1cblxuY29uc3QgYnVpbGRPYmplY3RNYXA6IFJlY29yZDxzdHJpbmcsIGJ1aWxkT2JqZWN0PiA9IHtcbiAgdmRhc2hraXQ6IHsgZHRzRmlsZTogJ3NyYy92ZGFzaGtpdC50cycsIGVudHJ5RmlsZTogXCJzcmMvdmRhc2hraXQuanNcIiwgaXNUczI6IHRydWUgfSxcbiAgdHlwZXM6IHsgZHRzRmlsZTogJ3NyYy90eXBlcy90eXBlcy50cycsIGVudHJ5RmlsZTogXCJzcmMvdHlwZXMvdHlwZXMuanNcIiwgaXNUczI6IHRydWUgfSxcbiAgc3RvcmVzOiB7IGR0c0ZpbGU6ICdzcmMvc3RvcmVzL3N0b3Jlcy50cycsIGVudHJ5RmlsZTogXCJzcmMvc3RvcmVzL3N0b3Jlcy5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxuICBUYWJsZUhlYWRlcjogeyBkdHNGaWxlOiAnc3JjL3V0aWxzL3RhYmxlL1RhYmxlSGVhZGVyLnRzJywgZW50cnlGaWxlOiBcInNyYy91dGlscy90YWJsZS9UYWJsZUhlYWRlci5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxuICBvYmplY3Q6IHsgZHRzRmlsZTogXCJzcmMvdXRpbHMvb2JqZWN0L29iamVjdC50c1wiLCBlbnRyeUZpbGU6IFwic3JjL3V0aWxzL29iamVjdC9vYmplY3QuanNcIiwgaXNUczI6IHRydWUgfSxcbiAgQXBwTGF5b3V0OiB7IGR0c0ZpbGU6IFwic3JjL2NvbXBvbmVudHMvdGhlbWUvQXBwTGF5b3V0LnZ1ZVwiLCBlbnRyeUZpbGU6IFwic3JjL2NvbXBvbmVudHMvdGhlbWUvQXBwTGF5b3V0LnZ1ZS5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxuICBBcHBGb3JtOiB7IGR0c0ZpbGU6IFwic3JjL2NvbXBvbmVudHMvZm9ybS9BcHBGb3JtLnZ1ZVwiLCBlbnRyeUZpbGU6IFwic3JjL2NvbXBvbmVudHMvZm9ybS9BcHBGb3JtLnZ1ZS5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxuICBEYXRhTGlzdDogeyBkdHNGaWxlOiBcInNyYy9jb21wb25lbnRzL2RhdGEvRGF0YUxpc3QudnVlXCIsIGVudHJ5RmlsZTogXCJzcmMvY29tcG9uZW50cy9kYXRhL0RhdGFMaXN0LnZ1ZS5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxuICBMb2dpbkZvcm06IHsgZHRzRmlsZTogXCJzcmMvY29tcG9uZW50cy9mb3JtL0xvZ2luRm9ybS52dWVcIiwgZW50cnlGaWxlOiBcInNyYy9jb21wb25lbnRzL2Zvcm0vTG9naW5Gb3JtLnZ1ZS5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxuICBBcHBMYXlvdXRMb2FkaW5nOiB7IGR0c0ZpbGU6IFwic3JjL2NvbXBvbmVudHMvbG9hZGluZy9BcHBMYXlvdXRMb2FkaW5nLnZ1ZVwiLCBlbnRyeUZpbGU6IFwic3JjL2NvbXBvbmVudHMvbG9hZGluZy9BcHBMYXlvdXRMb2FkaW5nLnZ1ZS5qc1wiLCBpc1RzMjogdHJ1ZSB9LFxufVxuXG5cbmNvbnN0IGdldEJ1aWxkRWxlbWVudHMgPSAoKTogYnVpbGRSZXN1bHQgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYnVpbGRPYmplY3RNYXApXG4gIGNvbnN0IHRzMkxpc3QgPSBbXVxuICBjb25zdCBkdHNMaXN0ID0gW11cbiAgY29uc3QgZW50cmllc0xpc3QgPSBbXVxuICBjb25zdCBmaWxlTmFtZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fVxuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlOiBidWlsZE9iamVjdCA9IGJ1aWxkT2JqZWN0TWFwW2tleV1cbiAgICBpZiAoY3VycmVudFZhbHVlLmlzVHMyKSB7XG4gICAgICB0czJMaXN0LnB1c2goY3VycmVudFZhbHVlLmR0c0ZpbGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGR0c0xpc3QucHVzaChjdXJyZW50VmFsdWUuZHRzRmlsZSlcbiAgICB9XG5cbiAgICBlbnRyaWVzTGlzdC5wdXNoKGN1cnJlbnRWYWx1ZS5kdHNGaWxlKVxuICAgIGZpbGVOYW1lc1trZXldID0gY3VycmVudFZhbHVlLmVudHJ5RmlsZVxuICB9XG4gIGNvbnN0IHJlc3VsdDogYnVpbGRSZXN1bHQgPSB7XG4gICAgdHMyTGlzdCxcbiAgICBkdHNMaXN0LFxuICAgIGVudHJpZXNMaXN0LFxuICAgIGZpbGVOYW1lc1xuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3Qge1xuICB0czJMaXN0LFxuICBkdHNMaXN0LFxuICBlbnRyaWVzTGlzdCxcbiAgZmlsZU5hbWVzXG59ID0gZ2V0QnVpbGRFbGVtZW50cygpXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBkdHMoe1xuICAgICAgaW5jbHVkZTogZHRzTGlzdCxcbiAgICAgIGV4Y2x1ZGU6IHRzMkxpc3QsXG4gICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlXG5cbiAgICB9KSxcbiAgICAvLyB0eXBlc2NyaXB0Mih7XG4gICAgLy8gICBjaGVjazogZmFsc2UsXG4gICAgLy8gICBpbmNsdWRlOiB0czJMaXN0LFxuICAgIC8vICAgdHNjb25maWdPdmVycmlkZToge1xuICAgIC8vICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAvLyAgICAgICBvdXREaXI6IFwiZGlzdFwiLFxuICAgIC8vICAgICAgIHNvdXJjZU1hcDogZmFsc2UsXG4gICAgLy8gICAgICAgbW9kdWxlUmVzb2x1dGlvbjogJ25vZGVuZXh0JyxcbiAgICAvLyAgICAgICBkZWNsYXJhdGlvbjogdHJ1ZSxcbiAgICAvLyAgICAgICBkZWNsYXJhdGlvbk1hcDogZmFsc2UsXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICB9LFxuICAgIC8vICAgZXhjbHVkZTogW1widml0ZS5jb25maWcudHNcIl1cbiAgICAvLyB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBidWlsZDoge1xuICAgIGNzc0NvZGVTcGxpdDogZmFsc2UsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogZW50cmllc0xpc3QsXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcbiAgICAgIG5hbWU6IFwidi1kYXNoa2l0XCIsXG4gICAgICBmaWxlTmFtZTogKF8sIGVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChmaWxlTmFtZXNbZW50cnldKSByZXR1cm4gZmlsZU5hbWVzW2VudHJ5XVxuICAgICAgICAvLyBpZiAoZW50cnkgPT0gJ1RhYmxlSGVhZGVyJykge1xuICAgICAgICAvLyAgIHJldHVybiBgdXRpbHMvdGFibGUvVGFibGVIZWFkZXIuanNgXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKGVudHJ5ID09ICd0eXBlcycpIHtcbiAgICAgICAgLy8gICByZXR1cm4gYHR5cGVzL3R5cGVzLmpzYFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmIChlbnRyeSA9PSAnc3RvcmVzJykge1xuICAgICAgICAvLyAgIHJldHVybiBgc3RvcmVzL3N0b3Jlcy5qc2BcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGlmIChlbnRyeSA9PSAnQXBwTGF5b3V0Jykge1xuICAgICAgICAvLyAgIHJldHVybiBgdGhlbWUvQXBwTGF5b3V0LnZ1ZS5qc2BcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZiAoZW50cnkgPT0gJ0RhdGFMaXN0Jykge1xuICAgICAgICAvLyAgIHJldHVybiBgZGF0YS9EYXRhTGlzdC52dWUuanNgXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coZmlsZU5hbWVzW2VudHJ5XSlcbiAgICAgICAgcmV0dXJuIGAke2VudHJ5fS5qc2BcbiAgICAgIH1cblxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgXCJAZm9ybWtpdC9hZGRvbnNcIixcbiAgICAgICAgXCJAZm9ybWtpdC9pY29uc1wiLFxuICAgICAgICBcIkBmb3Jta2l0L3Z1ZVwiLFxuICAgICAgICBcInBpbmlhXCIsXG4gICAgICAgIFwicHJpbWVpY29uc1wiLFxuICAgICAgICBcInByaW1ldnVlXCIsXG4gICAgICAgIFwicHJpbWV2dWUvKlwiLFxuICAgICAgICBcInZ1ZVwiLFxuICAgICAgICBcInZ1ZS1pMThuXCIsXG4gICAgICAgIFwidnVlLXJvdXRlclwiLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgdnVlOiAnVnVlJyxcbiAgICAgICAgICBwcmltZXZ1ZTogJ3ByaW1ldnVlJyxcbiAgICAgICAgICBpMThuOiAnaTE4bicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cblxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFgsU0FBUyxlQUFlLFdBQVc7QUFDamEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUhnTyxJQUFNLDJDQUEyQztBQW9CalMsSUFBTSxpQkFBOEM7QUFBQSxFQUNsRCxVQUFVLEVBQUUsU0FBUyxtQkFBbUIsV0FBVyxtQkFBbUIsT0FBTyxLQUFLO0FBQUEsRUFDbEYsT0FBTyxFQUFFLFNBQVMsc0JBQXNCLFdBQVcsc0JBQXNCLE9BQU8sS0FBSztBQUFBLEVBQ3JGLFFBQVEsRUFBRSxTQUFTLHdCQUF3QixXQUFXLHdCQUF3QixPQUFPLEtBQUs7QUFBQSxFQUMxRixhQUFhLEVBQUUsU0FBUyxrQ0FBa0MsV0FBVyxrQ0FBa0MsT0FBTyxLQUFLO0FBQUEsRUFDbkgsUUFBUSxFQUFFLFNBQVMsOEJBQThCLFdBQVcsOEJBQThCLE9BQU8sS0FBSztBQUFBLEVBQ3RHLFdBQVcsRUFBRSxTQUFTLHNDQUFzQyxXQUFXLHlDQUF5QyxPQUFPLEtBQUs7QUFBQSxFQUM1SCxTQUFTLEVBQUUsU0FBUyxtQ0FBbUMsV0FBVyxzQ0FBc0MsT0FBTyxLQUFLO0FBQUEsRUFDcEgsVUFBVSxFQUFFLFNBQVMsb0NBQW9DLFdBQVcsdUNBQXVDLE9BQU8sS0FBSztBQUFBLEVBQ3ZILFdBQVcsRUFBRSxTQUFTLHFDQUFxQyxXQUFXLHdDQUF3QyxPQUFPLEtBQUs7QUFBQSxFQUMxSCxrQkFBa0IsRUFBRSxTQUFTLCtDQUErQyxXQUFXLGtEQUFrRCxPQUFPLEtBQUs7QUFDdko7QUFHQSxJQUFNLG1CQUFtQixNQUFtQjtBQUMxQyxRQUFNLE9BQU8sT0FBTyxLQUFLLGNBQWM7QUFDdkMsUUFBTUEsV0FBVSxDQUFDO0FBQ2pCLFFBQU1DLFdBQVUsQ0FBQztBQUNqQixRQUFNQyxlQUFjLENBQUM7QUFDckIsUUFBTUMsYUFBb0MsQ0FBQztBQUMzQyxhQUFXLE9BQU8sTUFBTTtBQUN0QixVQUFNLGVBQTRCLGVBQWUsR0FBRztBQUNwRCxRQUFJLGFBQWEsT0FBTztBQUN0QixNQUFBSCxTQUFRLEtBQUssYUFBYSxPQUFPO0FBQUEsSUFDbkMsT0FBTztBQUNMLE1BQUFDLFNBQVEsS0FBSyxhQUFhLE9BQU87QUFBQSxJQUNuQztBQUVBLElBQUFDLGFBQVksS0FBSyxhQUFhLE9BQU87QUFDckMsSUFBQUMsV0FBVSxHQUFHLElBQUksYUFBYTtBQUFBLEVBQ2hDO0FBQ0EsUUFBTSxTQUFzQjtBQUFBLElBQzFCLFNBQUFIO0FBQUEsSUFDQSxTQUFBQztBQUFBLElBQ0EsYUFBQUM7QUFBQSxJQUNBLFdBQUFDO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQUVBLElBQU07QUFBQSxFQUNKO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsSUFBSSxpQkFBaUI7QUFFckIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLE1BQ0YsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1Qsa0JBQWtCO0FBQUEsSUFFcEIsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWVIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsY0FBYztBQUFBLElBQ2QsS0FBSztBQUFBLE1BQ0gsT0FBTztBQUFBLE1BQ1AsU0FBUyxDQUFDLElBQUk7QUFBQSxNQUNkLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FBQyxHQUFHLFVBQVU7QUFDdEIsWUFBSSxVQUFVLEtBQUs7QUFBRyxpQkFBTyxVQUFVLEtBQUs7QUFrQjVDLGVBQU8sR0FBRyxLQUFLO0FBQUEsTUFDakI7QUFBQSxJQUVGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLFVBQVU7QUFBQSxVQUNWLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFsidHMyTGlzdCIsICJkdHNMaXN0IiwgImVudHJpZXNMaXN0IiwgImZpbGVOYW1lcyJdCn0K
