// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
export const useFormStore = defineStore('form', () => {
  const formData = reactive({} as Record<string, any>)
  const formElementRef = ref({
    default: {}
  })
  const formValueRef = ref<Record<string, any>>({})
  const isUploading = ref(false)
  const showActions = ref(true)
  const getFormValue = (storeKey: string) => {
    return formElementRef.value[storeKey].value || null
  }

  const setFormValue = (value: any) => {
    formValueRef.value = value
  }

  const defaultFormValue = computed(() => {
    return getFormValue('default')
  })

  return { formData, isUploading, showActions, formElementRef, getFormValue, formValueRef, defaultFormValue, setFormValue }
})
