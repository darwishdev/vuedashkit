// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
export const useFormStore = defineStore('form', () => {
  const formData = reactive({} as Record<string, any>)
  const formElementRef = ref()
  const showActions = ref(true)
  const formValue = computed(() => {
    if(!formElementRef.value) return null
    if(!formElementRef.value.node) return null
    return formElementRef.value.node._value || null
  })

  return { formData, showActions, formElementRef, formValue }
})
