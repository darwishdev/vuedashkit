<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { ref , onMounted } from 'vue'
import { useRouter } from 'vue-router';
const { push } = useRouter();
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)
const emailRedirectUrl = ref()

onMounted(() => {
    emailRedirectUrl.value = window.location.href;
    emailRedirectUrl.value = emailRedirectUrl.value.replace('/login/resetPassword', '/login');  
})

const updateUserPw = async (req) => {
    try {
        const { data, error } = await supabase.auth.updateUser({password: req.password} , {
            emailRedirectTo : emailRedirectUrl.value
          }
        );
        if (error) {
          console.error('update pw error:', error.message);
          push('/login')
          return;
        }
        console.log('updated user:', data);
      } catch (error : any) {
        push('/login')
        console.error('error:', error.message);
      }
} 
</script>

<template>
    <div class="resetPw"> 
    <FormKit type="form" :actions="true" @submit="updateUserPw">
            <FormKit type="password" prefix-icon="password" id="pw" label="New Password"
                placeholder="Enter your new password" name="password" validation="required|password|length:8"
            />
            <FormKit type="password" prefix-icon="password" id="pwConfirmation" label="New Password" 
            placeholder="Re-Enter your password" name="password_confirm" validation="required|confirm"
            />
    </FormKit>
    </div>
</template>
<style>
.resetPw .formkit-form{
    margin: 2vh auto;
    width: 30%;
}
.resetPw .formkit-input{
    padding: 1.8vh;
    font-size: 13px;
    background-color: var(--fk-bg-input);
}
[data-type=submit] .formkit-input{
    margin: 2vh;
}
</style>