
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
            console.log(isAppFormSection(currentSection))
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

        console.log("requestValue", isNaN(parseInt('asd')))


        if (!requestValue) {
            resolve(null)
            return
        }

        if (isNaN(parseInt(requestValue))) {
            resolve(null)
            return
        }
        request[findHandler.requestPropertyName || 'rcordId'] = parseInt(requestValue as string)
        findHandler.endpoint(request)
            .then((resp: any) => resolve(resp)).catch((e: any) => {
                reject(e)
            })
    })
}
</script>





<script setup lang="ts">
import { h, ref, resolveComponent } from 'vue';
import type { AppFormProps, AppFormSection, ApiFormError, FindHandler } from '@/types/newtypes';
import { n, useI18n } from 'vue-i18n';
import { useNotificationStore } from "@/stores/notification";
import { useRouter, type RouteParams } from 'vue-router';


const { push, currentRoute } = useRouter()
const { t } = useI18n()
const props = defineProps<AppFormProps<any, any>>();
// global components
const formScehmaNodeRef = ref<{ node: FormKitNode }>()
const isBulkCreateRef = ref()
const notificationStore = useNotificationStore()
const formkitComp = resolveComponent('FormKit')
const appBtnComponent = resolveComponent('app-btn')
const formkitSchemaComp = resolveComponent('FormKitSchema')

const schema = await loadElemetnsPromise(props.sections, t)

const value = await loadValue(currentRoute.value.params, props.findHandler)
const renderFormSchema = () => {
    return h(formkitComp, {
        ref: "formScehmaNodeRef",
        type: "form",
        outerClass: "card",
        id: 'app-form',
        onSubmit: submitHandler,
        value: value,
        actions: true,
    },
        () => h(formkitSchemaComp, {
            schema: {
                $el: "div",
                attrs: {
                    class: "schema-wrapper",
                },
                children: schema
            }
        })
    )
}

const renderBulkCreateFilter = () => {
    return h(formkitComp, {
        type: "toggle",
        value: false,
        onInput: (v: boolean) => {
            isBulkCreateRef.value = v
        },
        label: t("bulk_create"),

    })
}

const renderTitle = () => {
    return h('div', {
        class: 'form-title'
    },
        [
            h('h1', t(props.title)),
            h('div', { class: 'end' }, [
                h(appBtnComponent, {
                    icon: 'plus',
                    class: 'primary',
                    label: t('save'),
                    onClick: () => {
                        formScehmaNodeRef.value!.node.submit()
                    }
                }),
                renderBulkCreateFilter()
            ])
        ]
    )
}

const submitHandler = async (req: any, node: FormKitNode) => {
    const handler = props.submitHandler

    if (handler.mapFunction) {
        req = handler.mapFunction!(req)
    }

    await new Promise((resolve, reject) => {

        handler.endpoint(req)
            .then(async (res: any) => {
                console.log(res)
                if (handler.callback) await handler.callback!(res)
                notificationStore.showSuccess("created_summary", "created_detail")
                if (!isBulkCreateRef.value) {
                    if (handler.redirectRoute != "") {
                        push({ name: handler.redirectRoute })
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
                const errorObject: ApiFormError = JSON.parse(error.rawMessage)
                node.setErrors(
                    errorObject.globalErrors,
                    errorObject.fieldErrors
                )
                console.log(errorObject)
                resolve(null)
            })
    })
}
const renderForm = () => {
    return h("div", {
        class: "card-dark"
    }, [
        renderTitle(),
        renderFormSchema()
    ])
}
</script>

<template>
    <component class="app-form " :is="renderForm()" />
</template>


<style lang="scss">
.app-form {
    & .formkit-outer {
        display: flex;
        align-items: center;

        & .formkit-wrapper {
            flex: 1;
        }


    }

    & .formkit-form {

        display: flex;
        flex-direction: column;
    }

    .formkit-messages {
        order: 1;

        & li {
            padding: 10px;
            background-color: var(--color-danger);
            color: #fff;
            border-radius: 6px;
            box-shadow: var(--shadow);
            margin-top: 20px;
        }
    }

    .schema-wrapper {
        order: 2;
    }

    .formkit-actions {
        order: 3;
    }

    & .form-title {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--color-border);
        margin-bottom: 20px;
        padding: 10px 0;

        & .end {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }

    & .form-section {
        margin: 20px 0;
        padding: 0 10px;

        & h2 {
            border-bottom: 1px solid var(--color-border);
            padding: 20px 10px;
            margin-bottom: 20px;
        }
    }
}
</style>