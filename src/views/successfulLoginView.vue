<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
const { push } = useRouter();

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

onMounted(() => {
    const url = new URL(window.location.href);
    const accessToken = url.hash.substr(1).split('&').reduce((result, item) => {
    const parts = item.split('=');
    if (parts[0] === 'access_token') {
        return decodeURIComponent(parts[1]);
    }
    return result;
    }, '');
    getUserData(accessToken);
})

const getUserData = async (accessToken : string) => {
    try {
        const { data, error } = await supabase.auth.getUser(accessToken);
        if (error) {
            console.error(error)
            push('/login')
        } 
        console.log('updated user:', data);
        // call userLogin api then push to the home page
      } catch (error : any) {
        console.error('updated user error:', error.message);
      }
}

</script>

<template>
    <div class="p-5">
        <h1 class="text-center my-2">Redirecting you to the home page </h1>
        <p class="text-center my-2">Please wait ... </p>
    </div>
</template>