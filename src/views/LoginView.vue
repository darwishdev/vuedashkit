

<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { ref , onMounted } from 'vue'
import { useRouter } from 'vue-router';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const { push , currentRoute } = useRouter();
const resetPw = ref(false)
const loginForm = ref(true)
const otpLoginForm = ref(false)
const loading = ref(false)
const emailRedirectUrl = ref()
const otpRedirectUrl = ref()
// const email = ref('')

onMounted(() => {
    let currentUrl = window.location.href;
    emailRedirectUrl.value = currentUrl.replace('/login', '/login/resetPassword');  
    otpRedirectUrl.value = currentUrl.replace('/login', '/login/successful');  
})

const handleLogin = async () => {
    try {
        loading.value = true
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
        })
        if (error) throw error
        alert('Check your email for the login link!')
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
        }
    } finally {
        loading.value = false
    }
}
const loginWithPassword = async (req) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: req.email,
          password: req.password
        });

        if (error) {
          console.error('Login error:', error.message);
          return;
        }
        console.log('Logged in user:', data);
      } catch (error : any) {
        console.error('Login error:', error.message);
      }
}
const loginWithOtp = async (req) => {
      try {
        const { data, error } = await supabase.auth.signInWithOtp({
        email: req.email,
        options: {
            emailRedirectTo: otpRedirectUrl.value,
        }
        })

        if (error) {
          console.error('Login error:', error.message);
          return;
        }
        console.log('Logged in user:', data);
      } catch (error : any) {
        console.error('Login error:', error.message);
      }
}
const sendResetPasswordEmail = async (req) => {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
          req.email,
          {
            redirectTo : emailRedirectUrl.value
          }
        );

        if (error) {
          console.error('reset pw error:', error.message);
          return;
        }

        console.log('reset pw:', data);
      } catch (error : any) {
        console.error('reset pw error:', error.message);
      }
} 
</script>

<template>
<!-- <form class="row flex-center flex" @submit.prevent="handleLogin">
        <div class="col-6 form-widget">
            <h1 class="header">Supabase + Vue 3</h1>
            <p class="description">Sign in via magic link with your email below</p>
            <div>
                <input class="inputField" required type="email" placeholder="Your email" v-model="email" />
            </div>
            <div>
                <input type="submit" class="button block" :value="loading ? 'Loading' : 'Send magic link'"
                    :disabled="loading" />
            </div>
        </div>
    </form> -->
    <div class="login py-5">
        <h1 class="text-center">Login</h1>
            <FormKit v-if="loginForm" type="form" :actions="true" @submit="loginWithPassword">
                <FormKit prefix-icon="email" outer-class="my-2" type="text" label="Email address" placeholder="Enter your email address" name="email" validation="required" />
                <FormKit type="password" outer-class="my-2" prefix-icon="password" id="pw" label="Password" placeholder="Enter your password" name="password" validation="required|password" />
                <h4 class="p-4 py-1 cursor-pointer hover:text-700" @click="resetPw = true; loginForm = false">Reset your password ?</h4>
                <h4 class="p-4 py-1 cursor-pointer hover:text-700" @click="otpLoginForm = true; loginForm = false; resetPw = false">Login using otp ?</h4>
            </FormKit>
            <FormKit v-if="resetPw" type="form" :actions="true" @submit="sendResetPasswordEmail">
                    <FormKit prefix-icon="email" type="text" label="Email address" placeholder="Enter your email address" name="email" validation="required" />
            </FormKit>
            <FormKit v-if="otpLoginForm" type="form" :actions="true" @submit="loginWithOtp">
                    <FormKit prefix-icon="email" type="text" label="Email address" placeholder="Enter your email address" name="email" validation="required" />
            </FormKit>
    </div>
</template>
<style>
.login .formkit-form{
    margin: 2vh auto;
    width: 30%;
}
.login .formkit-input{
    padding: 1.8vh;
    font-size: 13px;
    background-color: var(--fk-bg-input);
}
[data-type=submit] .formkit-input{
    margin: 2vh;
}

</style>