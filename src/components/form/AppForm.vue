
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



const loadValue = (params: RouteParams, findHandler?: FindHandler<any, any>): Promise<Record<string, any> | null> => {
    return new Promise((resolve, reject) => {

        if (!findHandler) {
            resolve(null)
            return
        }
        const request: any = {}
        const requestValue = params[findHandler.paramName || 'id'] as string

        if (!requestValue) {
            resolve(null)
            return
        }

        if (isNaN(parseInt(requestValue))) {
            resolve(null)
            return
        }
        request[findHandler.requestPropertyName || 'recordId'] = parseInt(requestValue as string)
        findHandler.endpoint(request)
            .then((resp: any) => resolve(resp)).catch((e: any) => {
                reject(e)
            })
    })
}
</script>





<script setup lang="ts">
import { h, ref, resolveComponent } from 'vue';
import type { AppFormProps, AppFormSection, ApiFormError, FindHandler } from '@/types/types';
import { useI18n } from 'vue-i18n';
import { useNotificationStore } from "@/stores/notification";
import { useFormStore } from "@/stores/form";
import { useRouter, type RouteParams, type RouteParamsRaw } from 'vue-router';


const { push, currentRoute } = useRouter()
const { t } = useI18n()
const props = defineProps<AppFormProps<any, any>>();

const slots = defineSlots<{
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
const value = await loadValue(currentRoute.value.params, props.context.findHandler)

const renderFormSchema = () => {
    return h(formkitComp, {
        ref: (el) => formStore.formElementRef = el,
        type: "form",
        outerClass: "card",
        id: 'app-form',
        validationVisibility: "live",
        onSubmit: submitHandler,
        onSubmitInvalid: () => {
            console.log("error captured")
        },
        value: value,
        actions: formStore.showActions,
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
        class: 'primary',
        label: t('save'),
        onClick: () => {
            formStore.formElementRef.node.submit()
        }
    })
}
const renderTitle = () => {

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
    if (handler.mapFunction) {
        req = handler.mapFunction!(req)
    }
    if (findHandler) {
        // const request: any = {}
        const requestValue = currentRoute.value.params[findHandler.paramName || 'id'] as string
        req[findHandler.requestPropertyName || 'recordId'] = parseInt(requestValue as string)
    }
    await new Promise((resolve, reject) => {
        handler.endpoint(req)
            .then(async (res: any) => {
                console.log(res)
                if (handler.callback) await handler.callback!(res)
                if (props.context.options) {
                    if (!props.context.options.isSuccessNotificationHidden) {
                        notificationStore.showSuccess(props.context.options.successMessageSummary || "created_summary", props.context.options.successMessageDetail || "created_detail")
                    }
                } else {
                    notificationStore.showSuccess("created_summary", "created_detail")
                }

                if (!isBulkCreateRef.value) {
                    if (handler.redirectRoute != "") {
                        let params: RouteParamsRaw | undefined = {}
                        if (handler.redirectRouteParam) {
                            params[handler.redirectRouteParam.paramName] = res[handler.redirectRouteParam.responseValueKey]
                        }
                        push({ name: handler.redirectRoute, params })
                    }
                }
                node.clearErrors()
                try {
                    node.reset()
                } catch (e: any) {
                    console.log("reset form has error", e)
                }
                resolve(null)
            }).catch((error: any) => {
                console.log("from rof", error)
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