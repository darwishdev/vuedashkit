import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';



type buildObject = {
  dtsFile: string,
  entryFile: string,
  isTs2?: Boolean,
}

type buildResult = {
  ts2List: string[],
  dtsList: string[],
  entriesList: string[],
  fileNames: Record<string, string>,
}

const buildObjectMap: Record<string, buildObject> = {
  vdashkit: { dtsFile: 'src/vdashkit.ts', entryFile: "src/vdashkit.js", isTs2: true },
  types: { dtsFile: 'src/types/types.ts', entryFile: "src/types/types.js", isTs2: true },
  stores: { dtsFile: 'src/stores/stores.ts', entryFile: "src/stores/stores.js", isTs2: true },
  TableHeader: { dtsFile: 'src/utils/table/TableHeader.ts', entryFile: "src/utils/table/TableHeader.js", isTs2: true },
  object: { dtsFile: "src/utils/object/object.ts", entryFile: "src/utils/object/object.js", isTs2: true },
  AppLayout: { dtsFile: "src/components/theme/AppLayout.vue", entryFile: "src/components/theme/AppLayout.vue.js", isTs2: true },
  AppForm: { dtsFile: "src/components/form/AppForm.vue", entryFile: "src/components/form/AppForm.vue.js", isTs2: true },
  DataList: { dtsFile: "src/components/data/DataList.vue", entryFile: "src/components/data/DataList.vue.js", isTs2: true },
  LoginForm: { dtsFile: "src/components/form/LoginForm.vue", entryFile: "src/components/form/LoginForm.vue.js", isTs2: true },
  AppLayoutLoading: { dtsFile: "src/components/loading/AppLayoutLoading.vue", entryFile: "src/components/loading/AppLayoutLoading.vue.js", isTs2: true },
}


const getBuildElements = (): buildResult => {
  const keys = Object.keys(buildObjectMap)
  const ts2List = []
  const dtsList = []
  const entriesList = []
  const fileNames: Record<string, string> = {}
  for (const key of keys) {
    const currentValue: buildObject = buildObjectMap[key]
    if (currentValue.isTs2) {
      ts2List.push(currentValue.dtsFile)
    } else {
      dtsList.push(currentValue.dtsFile)
    }

    entriesList.push(currentValue.dtsFile)
    fileNames[key] = currentValue.entryFile
  }
  const result: buildResult = {
    ts2List,
    dtsList,
    entriesList,
    fileNames
  }
  return result
}

const {
  ts2List,
  dtsList,
  entriesList,
  fileNames
} = getBuildElements()

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: dtsList,
      exclude: ts2List,
      insertTypesEntry: true

    }),
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
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: entriesList,
      formats: ["es"],
      name: "v-dashkit",
      fileName: (_, entry) => {
        if (fileNames[entry]) return fileNames[entry]
        // if (entry == 'TableHeader') {
        //   return `utils/table/TableHeader.js`
        // }
        // if (entry == 'types') {
        //   return `types/types.js`
        // }
        // if (entry == 'stores') {
        //   return `stores/stores.js`
        // }

        // if (entry == 'AppLayout') {
        //   return `theme/AppLayout.vue.js`
        // }
        // if (entry == 'DataList') {
        //   return `data/DataList.vue.js`
        // }
        // console.log(fileNames[entry])
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
        "primevue/*",
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
