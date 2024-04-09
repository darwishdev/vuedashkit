<script setup lang="ts">
import { inject } from "vue";
import { useTableStore } from "@/stores/table";
import type { AppFormDialogProps, AppFormProps } from "@/types/types";
import AppForm from '@/components/form/AppForm.vue';
import { useI18n } from 'vue-i18n';
import AppLoading from '@/components/loading/AppLoading.vue';
const { t } = useI18n()
const props = defineProps<AppFormDialogProps>();
const apiClient = inject("apiClient") as any;
const tableStore = useTableStore()
type styleSizeObj = { width: string, minHeight?: string }
const defailSizeObj: styleSizeObj = { width: '500px', minHeight: 'auto' }
const sizeObj: styleSizeObj | undefined = typeof props.size == 'undefined' ? defailSizeObj : typeof props.size === 'number' ?
    { width: `${props.size}px`, minHeight: `${props.size}px` } :
    { width: `${props.size.width}px`, minHeight: `${props.size.height}px` }

const dialogRef = inject("dialogRef") as any;


const submitHandler = (req: any) => {
    return new Promise((resolve, reject) => {
        const func = apiClient[props.handler.endpoint]
        if (typeof func == 'function') {
            func(req).then((resp: any) => {
                dialogRef.value.close()
                tableStore.refetchData()
                resolve(resp)
            }).catch(e => {
                reject(e)
            })
        }
        else {
            reject('no api function with this endpoint')
        }
    })

};

const formProps: AppFormProps<any, any> = {
    context: {
        title: t(props.handler.title),
        options: {
            isBulkCreateHidden: true,
            isHeaderSubmitHidden: true,
            isFormTransparent: true,
        },
        submitHandler: {
            endpoint: submitHandler,
            redirectRoute: props.handler.redirectRoute,
            redirectRouteParam: props.handler.redirectRouteParam,
        },
        sections: props.sections
    }

}
</script>

<template>
    <div class="form-dialog" :style="sizeObj">
        <Suspense timeout="0">
            <template #default>
                <app-form :context="formProps.context" />
            </template>
            <template #fallback>
                <AppLoading type="form" />
            </template>
        </Suspense>
    </div>
</template>

<style lang="scss">
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.p-dialog {
    background: var(--color-background);

    & .p-dialog-header {
        background: transparent;
    }

    & .p-dialog-content {
        background: transparent;
    }
}

.delete-restore-dialog {
    text-align: center;

    & i {
        font-size: 1.5rem;
    }

    & h2 {
        font-size: 1.8rem;
    }

    & p {
        font-size: 1rem;
        max-width: 350px;
        text-align: center;
        margin: 0 auto 20px auto;
    }

    & .actions {
        @include flex-center;
    }

    & button {
        min-width: 150px;

        &.success {
            margin-inline-end: 20px;
        }
    }
}
</style>