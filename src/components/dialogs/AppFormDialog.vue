<script setup lang="ts">
import { inject } from "vue";
import type { AppFormDialogProps, AppFormProps } from "@/types/types";
import AppForm from '@/components/form/AppForm.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const props = defineProps<AppFormDialogProps>();

const dialogRef = inject("dialogRef") as any;
const close = (e: any) => {
    dialogRef.value.close(e);
};

const testFn = (req) => {
    console.log(req);
    close(req)
}

const formProps: AppFormProps<any, any> = {
    context: {
        title: t(props.handler.title),
        options: {
            isBulkCreateHidden: true,
            isHeaderSubmitHidden: true,
            isFormTransparent: true,
        },
        submitHandler: {
            endpoint: testFn,
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
                <div class="loading">
                    loo
                </div>
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