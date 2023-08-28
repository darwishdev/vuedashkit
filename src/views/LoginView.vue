

<script setup lang="ts">
import type { LoginHandler } from '@/types/types';
import { useAuthStore } from '@/stores/auth';
import { ref, inject } from 'vue'
const loginHandler = inject('loginHandler') as LoginHandler
const submitted = ref(false)
const authStore = useAuthStore()

authStore.init(loginHandler)
const submitHandler = async (req: any) => {
    // Let's pretend this is an ajax request:
    await authStore.login(req)
    submitted.value = true
}
</script>

<template>
    <FormKit type="form" id="registration-example" :form-class="submitted ? 'hide' : 'show'" submit-label="Register"
        @submit="submitHandler" :actions="false" #default="{ value }">
        <h1>Login!</h1>
        <p>
            You can put any type of element inside a form, not just FormKit inputs
            (although only FormKit inputs are included with the submission).
        </p>
        <hr />
        <FormKit type="text" name="userName" label="Your email" placeholder="jane@example.com"
            help="What email should we use?" validation="required|email" />
        <div class="double">
            <FormKit type="password" name="userPassword" label="Password" validation="required|length:6|matches:/[^a-zA-Z]/"
                :validation-messages="{
                    matches: 'Please include at least one symbol',
                }" placeholder="Your password" help="Choose a password" />

        </div>

        <FormKit type="submit" label="Register" />
        <pre wrap>{{ value }}</pre>
    </FormKit>
    <div v-if="submitted">
        <h2>Submission successful!</h2>
    </div>
</template>