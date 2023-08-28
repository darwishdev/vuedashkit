import apiClient from '@/api/ApiClient'
import formKitConfig from './formkit.config'
import type { DashKitConfig, ErrorHandler, LoginHandler, UploadHandler } from '@/types/types'

const loginErrorHandler: ErrorHandler = {
    globalErrors: {
        "pass_loginApiCall": 'pass_loginApiCall',
    },
    fieldErrors: {
        'user_not_found': {
            userName: "user_not_found"
        },
        'user_name_invalid': {
            userName: "user_name_invalid"
        },
        'incorrect_password': {
            userPassword: "incorrect_password"
        }
    }
}

const loginHandler: LoginHandler = {
    submit: apiClient.userLogin,
    authorize: apiClient.userAuthorize,
    redirectRoute: "home_view",
    errorHandler: loginErrorHandler
}

const uploadHandler: UploadHandler = {
    fileUpload: apiClient.fileUpload,
    fileRestore: apiClient.fileRestore,
    baseImageUrl: import.meta.env.VITE_BASE_IMG,
    fileRemove: apiClient.fileRemove,
}

const config: DashKitConfig = {
    formKitConfig,
    loginHandler,
    uploadHandler,
    fallBackImageUrl: import.meta.env.VITE_FALLBACK_IMG,
    baseImageUrl: import.meta.env.VITE_BASE_IMG,
    translations: {
        en: {},
        ar: {},
    },
}
export default config