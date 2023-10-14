import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
import type { AuthTokenResponse } from '@supabase/supabase-js';
import type { UserLoginResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_user_definitions_pb'
import apiClient from './ApiClient';

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const signInWithPassword = async (formValue: { email: string, password: string }): Promise<UserLoginResponse> => {
    return new Promise((resolve, reject) => {
        formValue.email = formValue.email.trim()
        supabase.auth.signInWithPassword(formValue).then((supabaseResponse: AuthTokenResponse) => {
            if (!supabaseResponse.error) {
                apiClient.userLogin({ authUserId: supabaseResponse.data.user?.id })
                    .then((apiClientResponse: UserLoginResponse) => {
                        resolve(apiClientResponse)
                    })
                    .catch((apiClientError: any) => reject(apiClientError))
            } else {
                reject(new Error('login_invalid'))
            }
        }).catch(e => {
            console.log("from authorize", e)
        })

    })
}
const pareseFileInfo = (file: File) => {
    const fileExt = file.name.split('.').pop()
    return `${Math.random()}.${fileExt}`
}
export const uploadFile = async (file: File): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const filePath = pareseFileInfo(file)
        let { error: uploadError } = await supabase.storage.from('images').upload(filePath, file)
        uploadError ? reject(uploadError) : resolve(filePath)
    })
}

export const sendOTPForEmail = async (formValue: { email: string }): Promise<void> => {
    return new Promise((resolve, reject) => {
        supabase.auth.signInWithOtp(formValue).then(_ => {
            resolve()
        }).catch(e => {
            reject(e)
            console.log("from authorize", e)
        })

    })
}


export const sendResetPasswordForEmail = async (formValue: { email: string }): Promise<void> => {
    return new Promise((resolve) => {
        supabase.auth.resetPasswordForEmail(formValue.email).then(() => {
            resolve()
        }).catch(e => {
            console.log("from authorize", e)
        })

    })
}

export default supabase


