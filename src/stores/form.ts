// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
export const useFormStore = defineStore('form', () => {
  const formData = reactive({} as Record<string, any>)
  const formElementRef = ref()
  const showActions = ref(true)
  const formValue = computed(() => {
    return formElementRef.value.node._value || null
  })

  return { formData, showActions, formElementRef, formValue }
})
