
<script lang="ts">
import { type FormKitSchemaNode, type FormKitNode } from '@formkit/core'
import { ObjectKeys } from '@/utils/object/object';
const loadElemetnsPromise = (sections: Record<string, FormKitSchemaNode[]>, t: Function) => {
    return new Promise((resolve) => {

        const keys = ObjectKeys(sections)
        const schema: FormKitSchemaNode[] = []
        for (const key of keys) {
            const currentSection = sections[key]

            const title = {
                $el: 'h2',
                children: t(key)
            }

            const inpustsWrapper = {
                $el: 'div',
                attrs: {
                    class: 'grid'
                },
                children: currentSection
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
</script>





<script setup lang="ts">
import { h, ref, resolveComponent } from 'vue';
import type { AppFormProps } from '@/types/newtypes';
import { useI18n } from 'vue-i18n';
import { useNotificationStore } from "@/stores/notification";
import { useRouter } from 'vue-router';


const { push } = useRouter()
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
const renderFormSchema = () => {
    return h(formkitComp, {
        ref: "formScehmaNodeRef",
        type: "form",
        outerClass: "card",
        id: 'app-form',
        onSubmit: submitHandler,
        actions: true,
    },
        () => h(formkitSchemaComp, {
            schema: {
                $el: "div",
                attrs: {
                    // class: "card",
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
                notificationStore.showError("error", error)
                console.log(error)
                reject(null)
            })
    })
}
const renderForm = () => {
    return h("div", {
        class: "card"
    }, [
        renderTitle(),
        renderFormSchema()
    ])
}
</script>

<template>
    <component class="app-form app-card" :is="renderForm()" />
</template>


<style lang="scss">
.app-form {
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

        & h2 {
            border-bottom: 1px solid var(--color-border);
            padding-bottom: 20px;
            margin-bottom: 20px;
        }
    }
}
</style>