

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore()
const submitHandler = async (req: any) => {
    authStore.login(req)
}
</script>

<template>
    <FormKit type="form" id="registration-example" :form-class="submitted ? 'hide' : 'show'" submit-label="Register"
        @submit="submitHandler" :actions="false" #default="{ value }">

        <FormKit type="text" name="userName" label="Your email" placeholder="jane@example.com"
            validation="required|email" />
        <div class="double">
            <FormKit type="password" name="userPassword" label="Password" validation="required|length:6|matches:/[^a-zA-Z]/"
                :validation-messages="{
                    matches: 'Please include at least one symbol',
                }" placeholder="Your password" />

        </div>

        <FormKit type="submit" :label="$t('login')" />
        <pre wrap>{{ value }}</pre>
    </FormKit>
</template>