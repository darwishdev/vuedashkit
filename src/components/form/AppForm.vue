<script lang="ts">
import { type FormKitSchemaNode, type FormKitNode } from '@formkit/core'
import { ObjectKeys } from '@/utils/object/object';


const isAppFormSection = (input: any): input is AppFormSection => {
    return (
        typeof input === 'object' &&
        Array.isArray(input.inputs)
    );
}
const loadElemetnsPromise = (sections: Record<string, (AppFormSection | FormKitSchemaNode[])>, t: Function) => {
    return new Promise((resolve) => {

        const keys = ObjectKeys(sections)
        const schema: FormKitSchemaNode[] = []

        for (const key of keys) {
            const currentSection = sections[key]
            const title = {
                $el: 'h2',
                children: t(key)
            }


            if (isAppFormSection(currentSection)) {
                const className = `form-section ${currentSection.isTransparent ? '' : 'card'}`
                const titleComponent = currentSection.isTitleHidden ? { $el: 'div' } : title
                schema.push({
                    $el: 'div',
                    attrs: {
                        class: className,

                    },

                    children: [
                        titleComponent,
                        {
                            $el: 'div',
                            attrs: {
                                class: 'grid'
                            },
                            children: currentSection.inputs
                        }
                    ]
                })
                continue
            }

            const inpustsWrapper = {
                $el: 'div',
                attrs: {
                    class: 'grid'
                },
                children: currentSection
            }
            if (isAppFormSection(currentSection)) {
                continue
            }

            schema.push({
                $el: 'div',
                attrs: {
                    class: 'card form-section',

                },
                props: {
                },
                children: [
                    title,
                    inpustsWrapper
                ]
            })

        }
        resolve(schema)
    })
}



const loadValue = (apiClient: any, params: RouteParams, findHandler?: FindHandler<any, any>): Promise<Record<string, any> | null> => {
    return new Promise((resolve, reject) => {

        if (!findHandler) {
            resolve(null)
            return
        }

        const request: any = {}
        let requestValue = 0
        console.log("recordId", findHandler.recordId)
        if (findHandler.recordId) {
            requestValue = findHandler.recordId
        } else {
            requestValue = parseInt(params[findHandler.paramName || 'id'] as string)
        }
        console.log("requestValue", requestValue)

        if (requestValue == 0 || isNaN(requestValue)) {
            resolve(null)
            return
        }
        request[findHandler.requestProperty || 'recordId'] = requestValue
        if (typeof findHandler.endpoint != 'string') {
            findHandler.endpoint(request)
                .then((resp: any) => resolve(resp)).catch((e: any) => {
                    reject(e)
                })
            return
        }

        const func = apiClient[findHandler.endpoint]
        console.log("func", func)
        if (typeof func == 'function') {
            func(request).then((resp: any) => resolve(resp)).catch((e: any) => reject(e))
        }


    })
}
</script>





<script setup lang="ts">
import { h, ref, resolveComponent, inject } from 'vue';
import type { AppFormProps, AppFormSection, ApiFormError, FindHandler } from '@/types/types';
import { useI18n } from 'vue-i18n';
import { useNotificationStore } from "@/stores/notification";
import { useFormStore } from "@/stores/form";
import { useRouter, type RouteParams, type RouteParamsRaw } from 'vue-router';
const apiClient = inject("apiClient") as any;
const { push, currentRoute } = useRouter()
const { t } = useI18n()
const props = defineProps<AppFormProps<any, any>>();

const slots = defineSlots<{
    title?(): any
    prepend?(): any
    append?(): any
}>()
// global components
const isBulkCreateRef = ref()
const notificationStore = useNotificationStore()
const formStore = useFormStore()
const formkitComp = resolveComponent('FormKit')
const appBtnComponent = resolveComponent('app-btn')
const formkitSchemaComp = resolveComponent('FormKitSchema')
const schema = await loadElemetnsPromise(props.context.sections, t)
const storeKey = props.context.storeKey ? props.context.storeKey : 'default'
const value = await loadValue(apiClient, currentRoute.value.params, props.context.findHandler)


const initFormStore = () => {
    if (value) {
        formStore.formValueRef[storeKey] = value
    }
}
initFormStore()

const renderFormSchema = () => {
    return h(formkitComp, {
        ref: (el) => formStore.formElementRef[storeKey] = el,
        type: "form",
        outerClass: "card",
        id: 'app-form',
        validationVisibility: "live",
        onSubmit: submitHandler,
        onSubmitInvalid: () => {
            console.log("error captured")
        },
        value: formStore.formValueRef[storeKey],
        actions: formStore.showActions,
        'submit-label': props.context.options?.submitLabel ? props.context.options?.submitLabel : t('Submit'),
        'submit-attrs': props.context.options?.submitAttrs ? props.context.options?.submitAttrs : {}
    },
        () => h(formkitSchemaComp, {
            data: formStore.formData,
            schema: {
                $el: "div",
                attrs: {
                    class: "schema-wrapper",
                },
                children: schema
            }
        }),

    )
}

const renderBulkCreateFilter = () => {
    if (props.context.options) {
        if (props.context.options.isBulkCreateHidden) return

    }

    return h(formkitComp, {
        type: "toggle",
        value: false,
        onInput: (v: boolean) => {
            isBulkCreateRef.value = v
        },
        label: t("bulk_create"),

    })
}

const renderHeaderSubmitBtn = () => {
    if (props.context.options) {
        if (props.context.options.isBulkCreateHidden) return
    }
    return h(appBtnComponent, {
        icon: 'plus',
        iconColor: 'white',
        class: 'primary',
        label: t('save'),
        onClick: () => {
            formStore.formElementRef[storeKey].node.submit()
        }
    })
}
const renderTitle = () => {
    if (props.context.options) {
        if (props.context.options.isFormHeaderHidden) {
            return null
        }
    }
    return h('div', {
        class: 'form-title'
    },
        [
            h('h1', t(props.context.title)),
            h('div', { class: 'end' }, [
                renderHeaderSubmitBtn(),
                renderBulkCreateFilter()

            ])

        ]
    )
}

const handleError = (node: FormKitNode, error: any) => {
    try {
        const errorObject: ApiFormError = JSON.parse(error.rawMessage)
        if (errorObject.globalErrors.length > 0) {
            errorObject.globalErrors[0] = t(errorObject.globalErrors[0] as string)
            node.setErrors(
                errorObject.globalErrors,
                {}
            )

        }
        if (Object.keys(errorObject.fieldErrors).length > 0) {
            const key = Object.keys(errorObject.fieldErrors)[0]
            errorObject.fieldErrors[key] = t(errorObject.fieldErrors[key] as string)
            node.setErrors(
                [],
                errorObject.fieldErrors
            )
        }


    } catch (_err: any) {
        console.log('error captured', _err)
        node.setErrors(
            [error.message],
        )
    }
}


const submitHandler = async (req: any, node: FormKitNode) => {
    const handler = props.context.submitHandler
    const findHandler = props.context.findHandler
    formStore.isUploading = true
    if (handler.mapFunction) {
        req = handler.mapFunction!(req)
    }
    if (findHandler) {
        // const request: any = {}
        const requestValue = currentRoute.value.params[findHandler.paramName || 'id'] as string
        req[findHandler.requestProperty || 'recordId'] = parseInt(requestValue as string)
    }
    await new Promise((resolve, reject) => {
        handler.endpoint(req)
            .then(async (res: any) => {

                if (handler.callback) await handler.callback!(res)
                if (props.context.options) {
                    if (!props.context.options.isSuccessNotificationHidden) {
                        notificationStore.showSuccess(props.context.options.successMessageSummary || "created_summary", props.context.options.successMessageDetail || "created_detail")
                    }
                } else {
                    notificationStore.showSuccess("created_summary", "created_detail")
                }

                if (!isBulkCreateRef.value) {
                    formStore.isUploading = false
                    if (handler.redirectRoute != "") {
                        let params: RouteParamsRaw | undefined = {}
                        if (handler.redirectRouteParam) {
                            params[handler.redirectRouteParam.paramName] = res[handler.redirectRouteParam.responseValueKey]
                        }
                        push({ name: handler.redirectRoute, params })
                    }
                }
                node.clearErrors()

                if (!props.context.keepStateAlive) {
                    try {
                        node.reset()
                    } catch (e: any) {
                        console.log("reset form has error", e)
                    }
                }
                formStore.isUploading = false

                resolve(null)
            }).catch((error: any) => {
                formStore.isUploading = false
                handleError(node, error)
                resolve(null)
            })
    })
}
const renderForm = () => {
    let className = "card-dark"
    if (props.context.options) {
        if (props.context.options?.isFormTransparent) className = ""
    }
    return h("div", {
        class: className
    }, [
        slots.prepend ? slots.prepend() : null,
        renderTitle(),
        renderFormSchema(),
        slots.append ? slots.append() : null
    ])
}


</script>

<template>
    <component class="app-form " :is="renderForm()" />
</template>


<style lang="scss">
@import url("@/assets/form.scss");
</style>@/types/types