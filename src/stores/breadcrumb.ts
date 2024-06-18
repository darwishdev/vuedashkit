import { ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import type { MenuItem } from 'primevue/menuitem'
import { useI18n } from 'vue-i18n'
export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const breadcrumbsLoading = ref(false)
  const route = useRoute()
  const { t } = useI18n()
  const breadcrumbHome = {
    icon: 'house',
    to: { name: "home_view" },
  }
  const breadcrumbs = computed(() => {
    if (!route.meta) return []
    if (!route.meta.breadcrumbs) return []

    const breacrumbs = route.meta.breadcrumbs as MenuItem[]

    console.log("bredstore", route.meta.breadcrumbs)
    return breacrumbs.map((item) => {
      console.log("bredstoreitem", item)
      item.label = t(item.label as string)
      return item
    })

  }) as ComputedRef<MenuItem[]>;

  // const breadcrumbs = ref<MenuItem[]>(route.meta.breadcrumbs);

  return { breadcrumbHome, breadcrumbsLoading, breadcrumbs }
})
