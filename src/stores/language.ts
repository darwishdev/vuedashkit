import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
// import { usePrimeVue } from 'primevue/config';

export const useLanguageStore = defineStore('language', () => {
  // const primevue = usePrimeVue()
  const localeSetterComponentRef = ref()
  const isRtl = ref(false);
  const i18n = useI18n()


  const init = () => {
    const isRtl = localStorage.getItem('isRtl');
    if (isRtl == 'true') {
      toggleRtl()
    }

  }
  const toggleRtl = () => {
    document.querySelector("body")?.classList.toggle("rtl")
    isRtl.value = !isRtl.value;
    i18n.locale.value = isRtl.value ? 'ar' : "en"
    localStorage.setItem('isRtl', isRtl.value.toString());
    // primevue.config.locale = isRtl.value ? ar as any : en as any
    setTimeout(() => {
      if (localeSetterComponentRef.value) localeSetterComponentRef.value.setFormkitLocale(i18n.locale.value)
    }, 100)

  };
  return {
    isRtl,
    localeSetterComponentRef,
    toggleRtl,
    init
  };
})
