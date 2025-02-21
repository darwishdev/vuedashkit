<script setup lang="ts">
import AppForm from '@/components/form/AppForm.vue';
import type { AppFormProps, LoginHandler, UserLoginResponse } from '@/types/types';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import { useFormStore } from "@/stores/form";
import { onMounted, ref, inject } from 'vue'
import { RouteQueryAppend, RouteQueryRemove } from '@/utils/router/query';
import LanguageToggler from '@/components/base/LanguageToggler.vue';
import ThemeToggler from '@/components/base/ThemeToggler.vue';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/stores/notification';
const { t } = useI18n()
const loginHandler: LoginHandler<any> = inject('loginHandler') as LoginHandler<any>
const notificationStore = useNotificationStore()
const { currentRoute } = useRouter()
const authStore = useAuthStore()
const formStore = useFormStore()
const appFormElementRef = ref()

onMounted(() => {
    const isResetPasswordParam = currentRoute.value.query.isResetPassword
    const isResetPassword = (isResetPasswordParam && isResetPasswordParam == 'true') ? true : false
    formStore.showActions = !isResetPassword
    formStore.formData = { isResetPassword: isResetPassword }
})

const signInWithOTP = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        loginHandler.sendOTPEndpoint({ email: formStore.defaultFormValue.loginCode }).then(_ => {
            notificationStore.showSuccess("otp_email_sent", "otp_email_sent_detail")
            resolve()
        }).catch(e => {
            reject(e)
            notificationStore.showError("otp_email_failed", "otp_email_failed_detail")
            console.log("from authorize", e)
        })
    })
}

const resetPasswordForEmail = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        loginHandler.sendResetLinkEndpoint({ email: formStore.defaultFormValue.loginCode }).then(_ => {
            notificationStore.showSuccess("reset_email_sent", "reset_email_sent_detail")
            resolve()
        }).catch(e => {
            reject(e)
            notificationStore.showError("reset_email_failed", "reset_email_failed_detail")
            console.log("from authorize", e)
        })

    })
}
const handleLoginCallback = (resp: UserLoginResponse) => {
    authStore.saveLoginData(resp)

}

const toggleResetPasswordForm = () => {
    if (!formStore.formData.isResetPassword) {
        RouteQueryAppend('isResetPassword', "true")

        Object.assign(formStore.formData, { isResetPassword: true })
        formStore.showActions = false
        return
    } else {

        RouteQueryRemove('isResetPassword')
        Object.assign(formStore.formData, { isResetPassword: false })
        formStore.showActions = true
    }
}

const formProps: AppFormProps<any, any> = {
    context: {

        title: 'login',
        options: {
            isBulkCreateHidden: true,
            isFormTransparent: true,
            isSuccessNotificationHidden: false,
            successMessageSummary: 'logged_in',
            successMessageDetail: 'logged_in_details',
            isHeaderSubmitHidden: true,
            isFormHeaderHidden: true
        },
        submitHandler: {
            endpoint: loginHandler.loginEndpoint,
            callback: handleLoginCallback,
            redirectRoute: loginHandler.redirectRoute || "home_view"
        },
        sections: {
            'login': {
                isTitleHidden: true,
                isTransparent: true,
                inputs: [
                    {
                        $formkit: 'text',
                        prefixIcon: "email",
                        outerClass: "col-12",
                        validation: "required:email",
                        name: "loginCode",
                        placeholder: t("email"),
                        label: t("email")
                    },
                    {
                        $formkit: 'password',
                        prefixIcon: "password",
                        if: "$isResetPassword == false",
                        outerClass: "col-12",
                        validation: "required",
                        name: "userPassword",
                        placeholder: t("password"),
                        label: t("password")
                    },
                    {
                        $cmp: 'AppBtn',
                        if: "$isResetPassword == false",
                        props: {
                            class: "w-full forgot-password",
                            label: t('forgot_password'),
                            onClick: toggleResetPasswordForm
                        }
                    },
                    {
                        $cmp: 'AppBtn',
                        if: "$isResetPassword",
                        props: {
                            class: "mt-3 w-full success",
                            label: t('login_with_otp'),
                            onClick: signInWithOTP
                        }
                    },
                    {
                        $cmp: 'AppBtn',
                        if: "$isResetPassword",
                        props: {
                            class: "mt-3 w-full primary",
                            label: t('send_reset_link'),
                            onClick: resetPasswordForEmail
                        }
                    },

                    {
                        $cmp: 'AppBtn',
                        if: "$isResetPassword",
                        props: {
                            class: "mt-3 w-full danger",
                            label: t('back_to_login'),
                            onClick: toggleResetPasswordForm
                        }
                    }
                ]
            }
        }
    }
}

</script>

<template>
    <div class="login-wrapper">
        <div class="login-image"></div>
        <div class="login-form">
            <Suspense>
                <template #default>

                    <app-form ref="appFormElementRef" :context="formProps.context">
                        <template #prepend>
                            <div class="flex justify-content-center">
                                <LanguageToggler />
                                <ThemeToggler />
                            </div>
                            <app-logo class="all-logo" />

                        </template>
                    </app-form>
                </template>
                <template #fallback>
                    <h2>loading from login</h2>
                </template>
            </Suspense>

        </div>
        <footer>
            <app-logo iconOnly class="icon-logo" />
            | {{ t('copyrights') }} - {{ new Date().getFullYear() }}
        </footer>
    </div>
</template>
<style lang="scss">
.login-wrapper {
    width: 100vw;
    height: 100dvh;
    min-height: 12rem;

    & .login-image {
        width: 30%;
        height: 100%;
        position: absolute;
        left: 0;
        background-size: cover;
        background-image: url(http://localhost:54321/storage/v1/object/public/images/initial/login.webp );
    }

    & .login-form {
        width: 70%;
        margin-left: 30%;
        display: flex;
        padding-left: 10%;
        align-items: center;
        height: 100%;

        & .app-form {
            max-width: 600px;
            min-width: 400px;
        }

        & .forgot-password {
            cursor: pointer;
            background: transparent !important;
            margin: 20px 10px;

            &:hover {
                color: #fff;
            }
        }
    }

    & footer {
        position: absolute;
        bottom: 50px;
        left: 40%;
        display: flex;
        align-items: center;
        font-size: 2rem;
        color: var(--color-white);
    }


}
</style>