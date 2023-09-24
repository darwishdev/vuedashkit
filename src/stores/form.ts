// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { FormKitSchemaNode } from '@formkit/core'
import { useI18n } from 'vue-i18n'
import type { FormSeciton } from '@/types/types'
export const useFormStore = defineStore('form', () => {
  const schemas: Record<string, FormKitSchemaNode> = {}
  const { t } = useI18n()


  const withWrapperClass = (elements: FormKitSchemaNode[], className: string) => {
    return {
      $el: 'div',
      attrs: {
        class: className
      },
      children: elements
    } as FormKitSchemaNode
  }

  const generateSchemaFromSections = (sections: FormSeciton[]) => {

  }
  return {}
})
