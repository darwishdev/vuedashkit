import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useLanguageStore = defineStore('language', () => {
  const isRtl = ref(false);

  const toggleRtl = () => {
    isRtl.value = !isRtl.value;
    localStorage.setItem('isRtl', isRtl.value.toString());
  };
  return {
    isRtl,
    toggleRtl,
  };
})
