// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
export const useFormStore = defineStore('form', () => {
  const formData = reactive({} as Record<string, any>)
  const formElementRef = ref({
    default: {}
  })
  const formValueRef = ref<Record<string, any>>({
    step1: {
      roleName: "asd",
    },
    step2: {
      roleDescription: "asd",
    }
  })
  const showActions = ref(true)
  const getFormValue = (storeKey: string) => {
    return formElementRef.value[storeKey].node._value || null
  }


  const defaultFormValue = computed(() => {
    return getFormValue('default')
  })

  return { formData, showActions, formElementRef, getFormValue, formValueRef, defaultFormValue }
})
