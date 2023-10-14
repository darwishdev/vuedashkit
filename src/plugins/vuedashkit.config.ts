import formKitConfig from './formkit.config'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'
import type { UserLoginResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_user_definitions_pb'
import type { VueDashKitConfig, UploadHandler, LoginHandler } from '@/types/types'
import {
    signInWithPassword,
    sendOTPForEmail,
    uploadFile,
    sendResetPasswordForEmail,
} from "@/api/Supabase"

const loginHandler: LoginHandler<UserLoginResponse> = {
    loginEndpoint: signInWithPassword,
    senedOTPEndpoint: sendOTPForEmail,
    sendResetLinkEndpoint: sendResetPasswordForEmail
}

const uploadHandler: UploadHandler = {
    uploadEndpoint: uploadFile,
}

const config: VueDashKitConfig = {
    formKitConfig,
    loginHandler,
    uploadHandler,
    baseImportDataUrl: import.meta.env.VITE_BASE_IMPORT_URL,
    fallBackImageUrl: import.meta.env.VITE_FALLBACK_IMG,
    baseImageUrl: import.meta.env.VITE_BASE_IMG,
    translations: <any>{
        en,
        ar,
    },
}
export default config