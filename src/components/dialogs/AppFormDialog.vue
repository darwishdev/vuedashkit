<script setup lang="ts">
import { inject } from "vue";
import type { AppFormDialogProps, AppFormProps } from "@/types/types";
import AppForm from '@/components/form/AppForm.vue';
import { useI18n } from 'vue-i18n';
import AppLoading from '@/components/loading/AppLoading.vue';
const { t } = useI18n()
const props = defineProps<AppFormDialogProps>();
const apiClient = inject("apiClient") as any;

const dialogRef = inject("dialogRef") as any;


const submitHandler = (req: any) => {
    return new Promise((resolve, reject) => {
        const func = apiClient[props.handler.endpoint]

        console.log('gunc', props.handler, apiClient[props.handler.endpoint])
        if (typeof func == 'function') {

            func(req).then((_) => {
                dialogRef.value.close()

            })
        }
        resolve(null)
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
        },
        sections: props.sections
    }

}
</script>

<template>
    <div class="form-dialog">
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