 
<script setup lang="ts">
import AppForm from '@/components/form/AppForm.vue';
import { createClient } from '@supabase/supabase-js'
import type { ApiFormError, AppFormProps } from '@/types/newtypes';
// import supabase from '@/api/Supabase';
import type { UserLoginResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_user_definitions_pb'
import { useI18n } from 'vue-i18n';
import type { SignInWithPasswordCredentials, AuthOtpResponse, SignInWithPasswordlessCredentials, AuthTokenResponse } from '@supabase/supabase-js';
import apiClient from '@/api/ApiClient';
import { useAuthStore } from '@/stores/auth';
import { useFormStore } from "@/stores/form";
import { onMounted, ref } from 'vue'
import { RouteQueryAppend, RouteQueryRemove } from '@/utils/router/query';
import LanguageToggler from '@/components/base/LanguageToggler.vue';
import ThemeToggler from '@/components/base/ThemeToggler.vue';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/stores/notification';
import { ObjectKeys } from '@/utils/object/object';
const { t } = useI18n()

const notificationStore = useNotificationStore()
const { currentRoute } = useRouter()

const authStore = useAuthStore()
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const formStore = useFormStore()


const appFormElementRef = ref()

onMounted(() => {
  const isResetPasswordParam = currentRoute.value.query.isResetPassword
  const isResetPassword = (isResetPasswordParam && isResetPasswordParam == 'true') ? true : false

  console.log(isResetPasswordParam)
  formStore.showActions = !isResetPassword
  formStore.formData = { isResetPassword: isResetPassword }
})


const signInWithPassword = async (req: SignInWithPasswordCredentials): Promise<AuthTokenResponse> => {
  return new Promise((resolve, reject) => {
    const request: { email: string, password: string } = { ...req } as { email: string, password: string }
    request.email = request.email.trim()
    supabase.auth.signInWithPassword(request).then(res => {
      console.log(res.error)
      if (!res.error) {
        resolve(res)
      } else {
        reject(new Error(t('login_invalid')))
      }

      // notificationStore.showSuccess("logged_in", "logged_in_detail")
    }).catch(e => {
      console.log("from authorize", e)
    })

  })
}


const signInWithOTP = async (): Promise<AuthOtpResponse> => {
  return new Promise((resolve, reject) => {

    reject(new Error("asd"))
    const req: SignInWithPasswordlessCredentials = {
      email: formStore.formValue.email
    }
    supabase.auth.signInWithOtp(req).then(res => {

      console.log("error ", res.error)
      reject("asd")
      return
      notificationStore.showSuccess("otp_email_sent", "otp_email_sent_detail")
      resolve(res)
    }).catch(e => {
      reject(e)
      console.log("from authorize", e)
    })

  })
}


const resetPasswordForEmail = async (): Promise<void> => {
  return new Promise((resolve) => {
    supabase.auth.resetPasswordForEmail(formStore.formValue.email).then(() => {
      notificationStore.showSuccess("reset_email_sent", "reset_email_sent_detail")
      resolve()
    }).catch(e => {
      console.log("from authorize", e)
    })

  })
}

const handleLoginCallback = async (resp: AuthTokenResponse) => {
  apiClient.userLogin({ authUserId: resp.data.user?.id }).then((res: UserLoginResponse) => {
    authStore.saveLoginData(res)
  }).catch(e => {
    console.log("from callback", e)
  })
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




const formProps: AppFormProps<SignInWithPasswordCredentials, AuthTokenResponse> = {
  title: "login",
  options: {
    isBulkCreateHidden: true,
    isFormTransparent: false,
    successMessageSummary: "logged_in",
    successMessageDetail: "logged_in_details",
    isHeaderSubmitHidden: true
  },
  submitHandler: {
    endpoint: signInWithPassword,
    callback: handleLoginCallback,
    redirectRoute: "home_view"
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
          name: "email",
          placeholder: t("email"),
          label: t("email")
        },
        {
          $formkit: 'password',
          prefixIcon: "password",
          if: "$isResetPassword == false",
          outerClass: "col-12",
          validation: "required",
          name: "password",
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

</script>

<template>
  <div class="login-wrapper">
    <div class="login-image"></div>
    <div class="login-form">
      <h2>
        <Suspense>
          <template #default>

            <app-form ref="appFormElementRef" :options="formProps.options" :title="formProps.title"
              :sections="formProps.sections" :submitHandler="formProps.submitHandler">
              <template #prepend>
                <div class="flex justify-content-center">
                  <LanguageToggler />
                  <ThemeToggler />
                </div>
              </template>
            </app-form>
          </template>
          <template #fallback>
            <h2>loading from login</h2>
          </template>
        </Suspense>

      </h2>
    </div>
  </div>
</template>
<style lang="scss">
.login-wrapper {
  width: 100vw;
  height: 100vh;

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
    justify-content: center;
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
        color: var(--color-secondary);
      }
    }
  }


}
</style>