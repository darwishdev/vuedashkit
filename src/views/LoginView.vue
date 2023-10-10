

<script setup lang="ts">
// import { useAuthStore } from '@/stores/auth';
import { createClient } from '@supabase/supabase-js'
import { ref , onMounted } from 'vue'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)
// const authStore = useAuthStore()

const resetPw = ref(false)
const loading = ref(false)
const email = ref('')
const password = ref('')

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
const login = async (req) => {
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
const resetPassword = async (req) => {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
          req.email,
          {
            redirectTo : 'http://localhost:5174/login'
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
            <FormKit v-if="resetPw" type="form" :actions="true" @submit="resetPassword">
                    <div class="mt-3">
                        <FormKit prefix-icon="email" type="text" label="Email address" placeholder="Enter your email address" name="email" validation="required" />
                    </div>
            </FormKit>
            <FormKit v-else type="form" :actions="true" @submit="login">
                    <div class="mt-3">
                        <FormKit prefix-icon="email" type="text" label="Email address" placeholder="Enter your email address" name="email" validation="required" />
                    </div>
                    <div class="mt-3">
                        <FormKit type="password" prefix-icon="password" id="pw" label="Password" placeholder="Enter your password" name="password" validation="required|password" />
                    </div>
                    <h4 class="p-4 py-2 cursor-pointer hover:text-700" @click="resetPw = true">Reset your password ?</h4>
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
    margin: auto;
    border: none;
    border-radius: 3px;
    width: 100%;
    font-size: 13px;
    background-color: var(--fk-bg-input);
}
[data-type=submit] .formkit-input{
    margin: 2vh;
}

</style>