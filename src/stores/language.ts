import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
export const useLanguageStore = defineStore('language', () => {
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
  };
  return {
    isRtl,
    toggleRtl,
    init
  };
})
