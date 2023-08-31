import { ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import type { MenuItem } from 'primevue/menuitem'
export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const breadcrumbsLoading = ref(false)
  const route = useRoute()
  const breadcrumbHome = {
    icon: 'pi pi-home',
    to: { name: "home_view" },
  }
  const breadcrumbs = computed(() => {
    if (!route.meta) return []
    if (!route.meta.breadcrumbs) return []
    return route.meta.breadcrumbs
  }) as ComputedRef<MenuItem[]>;

  // const breadcrumbs = ref<MenuItem[]>(route.meta.breadcrumbs);

  return { breadcrumbHome, breadcrumbsLoading, breadcrumbs }
})
